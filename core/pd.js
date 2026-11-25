/* core/pd.js v1.2.1  CORE-09 Peritoneal transport engine (three-pore model)
   ใช้ร่วมกันใน PD-01 ถึง PD-07 (และ PD-11) โหลดได้ทั้งใน browser และ Node (require)

   Model เพื่อการสอน อิง Rippe three-pore model:
   - LpS รวม 0.062 ml/min/mmHg x area  แบ่ง aquaporin (ultrasmall) 2%, small pore 90%, large pore 8%
   - Jv(pore) = alpha x LpS x [ dP − sigma_prot x (pi_plasma − pi_dial) + RT x sum(sigma_s x (Cd − Cp)) + sigma_ico x pi_ico ]
     ค่าบวก = น้ำเข้าช่องท้อง  RT = 19.3 mmHg ต่อ mOsm/kg
   - Aquaporin: sigma = 1 ทุก solute (free water ไม่มี Na) จึงทำให้เกิด sodium sieving
   - Small pore: sigma glucose 0.03, crystalloid อื่น 0.015, protein 0.99, icodextrin 1 (colloid)
   - Large pore: sigma 0 (convective protein leak)
   - Solute: dM/dt = MTAC x (Cp − Cd) + convection ผ่าน small/large pore − L x Cd
   - Fluid absorption L (lymphatic + tissue) ml/min ค่าเริ่มต้น 0.3 (รวมกับ small-pore back-filtration ได้ fluid absorption ราว 1–1.3 ml/min ตอนท้าย dwell)
   API
   PD.dwell({fluid, fillMl, residualMl, dwellMin, init (state ตั้งต้นจาก R.final ของ dwell ก่อนหน้า), area, aqp (aquaporin function 0..1.5), lps (osmotic conductance multiplier เช่น fibrosis), L, alb, pGlu, pNa, bun, cr, dt})
     คืน {t:[], V:[], uf:[], glu:[], na:[], dpUrea:[], dpCr:[], dd0:[], jAqp:[], jSmall:[], jLarge:[], cumAqp:[], cumSmall:[], ...,
          at(min) คืน snapshot, fluid, p (params ที่ใช้)}
   PD.at(res, min)  snapshot ที่นาทีนั้น {t,V,uf,na,naDip,glu,dd0,dpUrea,dpCr,jAqp,jSmall,jLarge,jL,cumAqp,cumSmall,fwFrac,naRemoved,gluAbsorbedG,ureaRemovedG,crClearedL}
   PD.peak(res)  {t, uf} จุด UF สูงสุด
   PD.FLUIDS  ชนิดน้ำยา  PD.TRANSPORT  ค่า area ตัวอย่างตาม PET category
*/
(function(root){
"use strict";
var PD = {version:"1.2.1"};
var RT = 19.3;

PD.FLUIDS = {
  g15:{key:"g15", name:"Glucose 1.5% (1.36%)", short:"1.5%", glu:75.5, osm:346, na:132, ico:0, aa:0},
  g25:{key:"g25", name:"Glucose 2.5% (2.27%)", short:"2.5%", glu:126, osm:396, na:132, ico:0, aa:0},
  g425:{key:"g425", name:"Glucose 4.25% (3.86%)", short:"4.25%", glu:214, osm:485, na:132, ico:0, aa:0},
  ico:{key:"ico", name:"Icodextrin 7.5%", short:"Icodextrin", glu:0, osm:284, na:133, ico:1, aa:0},
  aa:{key:"aa", name:"Amino acid 1.1%", short:"Amino acid", glu:0, osm:365, na:132, ico:0, aa:87}
};
/* area ตัวอย่างที่ให้ D/P Cr 4 h ตาม category (ตรวจด้วย PD.dwell 4.25% 2 L) */
PD.TRANSPORT = {slow:0.55, slowAvg:0.85, fastAvg:1.25, fast:1.9};

PD.BASE = {
  LpS:0.062, aAqp:0.02, aSmall:0.90, aLarge:0.08,
  sgSmallGlu:0.03, sgSmallCryst:0.015, sgSmallAA:0.026, sgSmallProt:0.99,
  mtac:{glu:7.5, na:5.5, urea:17, cr:10, aa:9},
  lpsExp:0.1,        /* LpS เพิ่มตาม area น้อยกว่า MTAC (osmotic conductance ไม่เพิ่มตาม vascular surface area) */   /* ml/min ที่ area 1 */
  icoPi:54,          /* mmHg effective colloid osmotic pressure ของ icodextrin 7.5% ตอนเริ่ม */
  icoExtraClear:0.6  /* ml/min การดูดกลับ icodextrin เพิ่มจาก L */
};

function num(x,d){ return (typeof x==="number" && isFinite(x)) ? x : d; }

PD.dwell = function(o){
  o = o || {};
  var B = PD.BASE;
  var fl = typeof o.fluid==="string" ? PD.FLUIDS[o.fluid] : (o.fluid || PD.FLUIDS.g25);
  var p = {
    fillMl:num(o.fillMl,2000), residualMl:num(o.residualMl,250), dwellMin:num(o.dwellMin,240),
    area:num(o.area,1), aqp:num(o.aqp,1), lps:num(o.lps,1), L:num(o.L,0.3), alb:num(o.alb,3.8),
    pGlu:num(o.pGlu,6), pNa:num(o.pNa,140), bun:num(o.bun,60), cr:num(o.cr,9), dt:num(o.dt,1)
  };
  var area=p.area, LpS=B.LpS*Math.pow(area,B.lpsExp)*p.lps;
  var mt={glu:B.mtac.glu*Math.pow(area,1.15), na:B.mtac.na*area, urea:B.mtac.urea*area, cr:B.mtac.cr*area, aa:B.mtac.aa*area};
  /* plasma (mmol/L ยกเว้น cr ใช้ mg/dL ตรงๆ เพราะดูแค่ D/P) */
  var pUrea=p.bun/2.8, pAA=2.5;
  var pOsm=2*p.pNa+p.pGlu+pUrea;
  var piP=6.3*p.alb;  /* oncotic pressure mmHg (alb 3.8 ราว 24) */
  /* initial mix: fill + residual (residual ถือว่า equilibrate กับ plasma บางส่วน) */
  var V=p.fillMl+p.residualMl, fr=p.fillMl/V, rr=p.residualMl/V;
  var cGlu=fl.glu*fr+p.pGlu*0.9*rr, cNa=fl.na*fr+(p.pNa-4)*rr, cUrea=pUrea*0.9*rr, cCr=p.cr*0.75*rr, cAA=fl.aa*fr+pAA*rr, cIco=fl.ico*fr;
  var other=fl.osm-fl.glu-2*fl.na-fl.aa;  /* osmolyte อื่น (lactate/bicarb anion ที่ไม่นับใน 2Na, Mg, Ca) */
  var cOther=other*fr+0*rr;
  if(o.init){ var I=o.init; V=I.V; cGlu=I.glu; cNa=I.na; cUrea=I.urea; cCr=I.cr; cAA=I.aa; cOther=I.other; cIco=I.ico; }
  var V0=V, glu0=cGlu, na0=cNa, M0glu=cGlu*V, M0na=cNa*V;
  var R={t:[],V:[],uf:[],glu:[],na:[],dpUrea:[],dpCr:[],dd0:[],jAqp:[],jSmall:[],jLarge:[],jL:[],cumAqp:[],cumSmall:[],cumLarge:[],cumL:[],ureaOut:[],crOut:[],naOut:[],gluAbs:[]};
  var cumA=0,cumS=0,cumLg=0,cumL=0, dt=p.dt;
  var steps=Math.round(p.dwellMin/dt);
  for(var i=0;i<=steps;i++){
    var t=i*dt;
    var dOsm=2*cNa+cGlu+cUrea+cAA+cOther;
    var ipp=1.3*V/1000;         /* intraperitoneal pressure rise with volume */
    var dP=12-ipp;
    var piIco=B.icoPi*cIco;     /* cIco = fraction ของความเข้มข้นตั้งต้น */
    /* aquaporin: sigma 1 ทุกตัว */
    var drvA=dP-piP+RT*(dOsm-pOsm)+piIco;
    /* small pore */
    var drvS=dP-B.sgSmallProt*piP+RT*(B.sgSmallGlu*(cGlu-p.pGlu)+B.sgSmallCryst*(2*(cNa-p.pNa)+(cUrea-pUrea)+cOther)+B.sgSmallAA*(cAA-pAA))+piIco;
    var drvL=dP;
    var jA=B.aAqp*LpS*p.aqp*drvA, jS=B.aSmall*LpS*drvS, jLg=B.aLarge*LpS*drvL, jLy=p.L;
    R.t.push(t); R.V.push(V); R.uf.push(V-V0); R.glu.push(cGlu); R.na.push(cNa);
    R.dpUrea.push(cUrea/pUrea); R.dpCr.push(cCr/p.cr); R.dd0.push(cGlu/glu0);
    R.jAqp.push(jA); R.jSmall.push(jS); R.jLarge.push(jLg); R.jL.push(jLy);
    R.cumAqp.push(cumA); R.cumSmall.push(cumS); R.cumLarge.push(cumLg); R.cumL.push(cumL);
    R.naOut.push((V*cNa-M0na)/1000); R.gluAbs.push((M0glu-V*cGlu)*180/1e6);
    R.ureaOut.push(V*cUrea*28/1e6); R.crOut.push(V*cCr/100/1000);
    if(i===steps) break;
    /* solute fluxes (mmol per min x 1000 เพราะ V เป็น ml และ C เป็น mmol/L => ใช้ ml x mmol/L = umol) */
    function conv(J, sig, cp, cd){ return J>0 ? J*(1-sig)*cp : J*(1-sig)*cd; }
    var dMglu=mt.glu*(p.pGlu-cGlu)+conv(jS,B.sgSmallGlu,p.pGlu,cGlu)+conv(jLg,0,p.pGlu,cGlu)-jLy*cGlu;
    var dMna=mt.na*(p.pNa-cNa)+conv(jS,B.sgSmallCryst,p.pNa,cNa)+conv(jLg,0,p.pNa,cNa)-jLy*cNa;
    var dMurea=mt.urea*(pUrea-cUrea)+conv(jS,B.sgSmallCryst,pUrea,cUrea)+conv(jLg,0,pUrea,cUrea)-jLy*cUrea;
    var dMcr=mt.cr*(p.cr-cCr)+conv(jS,B.sgSmallCryst,p.cr,cCr)+conv(jLg,0,p.cr,cCr)-jLy*cCr;
    var dMaa=mt.aa*(pAA-cAA)+conv(jS,B.sgSmallAA,pAA,cAA)-jLy*cAA;
    var dMoth=mt.na*(0-cOther)+conv(jS,B.sgSmallCryst,0,cOther)-jLy*cOther;  /* buffer anion แลกกับ plasma */
    var dMico=-(jLy+B.icoExtraClear)*cIco;
    var dV=jA+jS+jLg-jLy;
    var Vn=Math.max(200,V+dV*dt);
    cGlu=Math.max(0,(cGlu*V+dMglu*dt)/Vn); cNa=(cNa*V+dMna*dt)/Vn; cUrea=Math.max(0,(cUrea*V+dMurea*dt)/Vn);
    cCr=Math.max(0,(cCr*V+dMcr*dt)/Vn); cAA=Math.max(0,(cAA*V+dMaa*dt)/Vn); cOther=Math.max(0,(cOther*V+dMoth*dt)/Vn);
    cIco=Math.max(0,(cIco*V+dMico*dt)/Vn);
    cumA+=jA*dt; cumS+=jS*dt; cumLg+=jLg*dt; cumL+=jLy*dt;
    V=Vn;
  }
  R.final={V:V, glu:cGlu, na:cNa, urea:cUrea, cr:cCr, aa:cAA, other:cOther, ico:cIco, pUrea:pUrea};
  R.fresh={glu:fl.glu, na:fl.na, urea:0, cr:0, aa:fl.aa, other:other, ico:fl.ico};
  R.p=p; R.fluid=fl; R.V0=V0; R.na0=na0; R.glu0=glu0; R.dt=dt;
  R.at=function(m){ return PD.at(R,m); };
  return R;
};

PD.at = function(R, m){
  var i=Math.max(0,Math.min(R.t.length-1,Math.round(m/R.dt)));
  var i60=Math.min(R.t.length-1,Math.round(60/R.dt));
  var ufGross=R.cumAqp[i]+R.cumSmall[i]+R.cumLarge[i];
  return {
    t:R.t[i], V:R.V[i], uf:R.uf[i], na:R.na[i], na0:R.na0, naDip:R.na0-R.na[i60], naMin:Math.min.apply(null,R.na.slice(0,i+1)),
    glu:R.glu[i], dd0:R.dd0[i], dpUrea:R.dpUrea[i], dpCr:R.dpCr[i],
    jAqp:R.jAqp[i], jSmall:R.jSmall[i], jLarge:R.jLarge[i], jL:R.jL[i], jNet:R.jAqp[i]+R.jSmall[i]+R.jLarge[i]-R.jL[i],
    cumAqp:R.cumAqp[i], cumSmall:R.cumSmall[i], cumLarge:R.cumLarge[i], cumL:R.cumL[i],
    fwFrac: ufGross>1 ? R.cumAqp[i]/ufGross : 0,
    fw60:R.cumAqp[i60],
    naRemoved:R.naOut[i], gluAbsorbedG:R.gluAbs[i], ureaRemovedG:R.ureaOut[i],
    crClearedL:R.dpCr[i]*R.V[i]/1000, ureaClearedL:R.dpUrea[i]*R.V[i]/1000
  };
};

PD.peak = function(R){
  var b=0; for(var i=1;i<R.uf.length;i++) if(R.uf[i]>R.uf[b]) b=i;
  return {t:R.t[b], uf:R.uf[b]};
};

/* series helper สำหรับ Plot: [[min หรือ h, value]] */
PD.series = function(R, key, o){
  o=o||{}; var every=o.every||5, div=o.hours?60:1, sc=o.scale||1, out=[];
  for(var i=0;i<R.t.length;i+=every) out.push([R.t[i]/div, R[key][i]*sc]);
  var last=R.t.length-1; if(last%every) out.push([R.t[last]/div, R[key][last]*sc]);
  return out;
};

/* จัด category จาก D/P Cr 4 h (ใช้ threshold เดียวกับ Calc.pet) */
PD.category = function(dpCr){ return dpCr>=0.82?"Fast":dpCr>=0.65?"Fast-average":dpCr>=0.50?"Slow-average":"Slow"; };

/* ---------- daily regimen (v1.1.0) ----------
   PD.capd({n, fillMl, dayFluid, nightFluid, nightMin}) และ PD.apd({cycles, fillMl, cyclerMin, cyclerFluid, exchMin, day:"dry"|"wet"|"wet+mid", dayFluid, dayFillMl, midFluid})
   คืน schedule [{start, dwellMin, fluid, fillMl, label}]
   PD.regimen(schedule, membrane) จำลองทุก exchange (เริ่มใหม่ทุกครั้ง) คืน {ex:[...], drainL, ufMl, ureaL, crL, naMmol, gluG, series:[[h,V]]}
   หมายเหตุ: exchange ที่ dwell สั้นกว่า 15 นาทีไม่นับ  APD เสียเวลา drain/fill ต่อ cycle = exchMin (ค่าเริ่มต้น 20 นาที) */
PD.capd = function(o){
  o=o||{}; var n=o.n||4, night=o.nightMin||600, fill=o.fillMl||2000, day=(1440-night)/(n-1), out=[], t=0;
  for(var i=0;i<n-1;i++){ out.push({start:t, dwellMin:day, fluid:o.dayFluid||"g15", fillMl:fill, label:"Day "+(i+1)}); t+=day; }
  out.push({start:t, dwellMin:night, fluid:o.nightFluid||"g25", fillMl:o.nightFillMl||fill, label:"Night"});
  return out;
};
PD.apd = function(o){
  o=o||{}; var cyc=o.cycles||5, tot=o.cyclerMin||540, ex=o.exchMin===undefined?20:o.exchMin, fill=o.fillMl||2000;
  var per=tot/cyc, dw=Math.max(15,per-ex), out=[], t=0, day=o.day||"wet";
  for(var i=0;i<cyc;i++){ out.push({start:t+ex/2, dwellMin:dw, fluid:o.cyclerFluid||"g15", fillMl:fill, label:"Cycle "+(i+1)}); t+=per; }
  var rest=1440-tot;
  if(day==="dry") return out;
  if(day==="wet+mid"){
    var h=rest/2;
    out.push({start:t, dwellMin:h, fluid:o.dayFluid||"g25", fillMl:o.dayFillMl||fill, label:"Last fill"});
    out.push({start:t+h, dwellMin:rest-h, fluid:o.midFluid||o.dayFluid||"g25", fillMl:o.dayFillMl||fill, label:"Mid-day"});
  } else out.push({start:t, dwellMin:rest, fluid:o.dayFluid||"ico", fillMl:o.dayFillMl||fill, label:"Last fill"});
  return out;
};
PD.regimen = function(sched, m){
  m=m||{}; var ex=[], tot={drainL:0,ufMl:0,ureaL:0,crL:0,naMmol:0,gluG:0,fillL:0}, series=[];
  sched.forEach(function(e){
    if(e.dwellMin<15) return;
    var R=PD.dwell({fluid:e.fluid, fillMl:e.fillMl, dwellMin:Math.round(e.dwellMin), area:m.area, aqp:m.aqp, L:m.L, lps:m.lps, alb:m.alb, bun:m.bun, cr:m.cr, residualMl:m.residualMl, dt:e.dwellMin>360?2:1});
    var a=R.at(e.dwellMin), drain=(a.V)/1000;
    var r={label:e.label, start:e.start, dwellMin:e.dwellMin, fluid:e.fluid, fillMl:e.fillMl, uf:a.uf, drainL:drain, dpUrea:a.dpUrea, dpCr:a.dpCr, ureaL:a.dpUrea*drain, crL:a.dpCr*drain, naMmol:a.naRemoved, gluG:PD.FLUIDS[e.fluid].glu?a.gluAbsorbedG:0};
    ex.push(r);
    tot.drainL+=drain; tot.fillL+=e.fillMl/1000; tot.ufMl+=a.uf; tot.ureaL+=r.ureaL; tot.crL+=r.crL; tot.naMmol+=r.naMmol; tot.gluG+=r.gluG;
    var step=Math.max(1,Math.round(e.dwellMin/40/R.dt));
    series.push([e.start/60,0]);
    for(var i=0;i<R.t.length;i+=step) series.push([(e.start+R.t[i])/60, R.V[i]]);
    series.push([(e.start+e.dwellMin)/60, a.V]); series.push([(e.start+e.dwellMin)/60+0.001, 0]);
  });
  tot.ex=ex; tot.series=series; tot.dpUrea=tot.drainL?tot.ureaL/tot.drainL:0; tot.dpCr=tot.drainL?tot.crL/tot.drainL:0;
  return tot;
};

/* ---------- tidal / continuous cycling (v1.2.0) ----------
   PD.tidal({fluid, fillMl, tidalPct (50..100), cycles, cycleMin, exchMin (เวลา drain+fill ต่อ cycle, ค่าเริ่มต้น 10), residualMl, ...membrane})
   reserve = (1 − tidal) x fill + residual คงไว้ในท้อง ทุก cycle drain (V − reserve) แล้วเติม tidal x fill ใหม่
   คืน {cycles:[{t, drainMl, uf, dpUrea}], fillL, drainL, ufMl, ureaL, crL, naMmol, gluG, series:[[h, V]], hours} */
PD.tidal = function(o){
  o=o||{}; var fill=o.fillMl||2000, tp=Math.max(0.3,Math.min(1,(o.tidalPct||100)/100)), n=o.cycles||10, cyc=o.cycleMin||120, exm=o.exchMin===undefined?10:o.exchMin;
  var resid=o.residualMl===undefined?250:o.residualMl, reserve=(1-tp)*fill+resid, dw=Math.max(5,cyc-exm);
  var m={fluid:o.fluid||"g15", area:o.area, aqp:o.aqp, L:o.L, lps:o.lps, alb:o.alb, bun:o.bun, cr:o.cr, pGlu:o.pGlu, residualMl:resid};
  var out={cycles:[], fillL:fill/1000, drainL:0, ufMl:0, ureaL:0, crL:0, naMmol:0, gluG:0, series:[[0,0]]};
  var init=null, t=0, fl=PD.FLUIDS[m.fluid];
  var fillIn=fill, Mglu0=0, Mna0=0;
  for(var i=0;i<n;i++){
    var R=PD.dwell({fluid:m.fluid, fillMl:i===0?fill:fill, residualMl:resid, dwellMin:Math.round(dw), area:m.area, aqp:m.aqp, L:m.L, lps:m.lps, alb:m.alb, bun:m.bun, cr:m.cr, pGlu:m.pGlu, init:init, dt:1});
    if(i===0){ Mglu0+=R.V0*R.glu0; Mna0+=R.V0*R.na0; }
    var F=R.final, step=Math.max(1,Math.round(dw/12));
    for(var k=0;k<R.t.length;k+=step) out.series.push([(t+exm/2+R.t[k])/60, R.V[k]]);
    var drain=Math.max(0,F.V-reserve);
    out.drainL+=drain/1000; out.ureaL+=drain/1000*F.urea/F.pUrea; out.crL+=drain/1000*F.cr/R.p.cr;
    out.naMmol+=drain*F.na/1000; out.gluG+=0;
    out.cycles.push({t:t, drainMl:drain, dpUrea:F.urea/F.pUrea, V:F.V});
    t+=cyc;
    out.series.push([(t-exm/4)/60, reserve]);
    /* refill */
    var add=tp*fill, nv=reserve+add;
    if(i<n-1){
      out.fillL+=add/1000; fillIn+=add;
      init={V:nv, glu:(reserve*F.glu+add*R.fresh.glu)/nv, na:(reserve*F.na+add*R.fresh.na)/nv, urea:reserve*F.urea/nv, cr:reserve*F.cr/nv,
            aa:(reserve*F.aa+add*R.fresh.aa)/nv, other:(reserve*F.other+add*R.fresh.other)/nv, ico:(reserve*F.ico+add*R.fresh.ico)/nv};
      Mglu0+=add*R.fresh.glu; Mna0+=add*R.fresh.na;
      var gl=init.glu; out.lastGlu=gl;
    } else {
      /* final full drain */
      out.drainL+=reserve/1000; out.ureaL+=reserve/1000*F.urea/F.pUrea; out.naMmol+=reserve*F.na/1000;
      out.series.push([t/60,0]);
      /* glucose ที่ดูดซึม = ใส่เข้า − ออกมา (ประมาณจากความเข้มข้นตอน drain) */
    }
    out.gluOutMmol=(out.gluOutMmol||0)+drain*F.glu/1000+(i===n-1?reserve*F.glu/1000:0);
  }
  out.gluG=fl.glu?Math.max(0,(Mglu0/1000-out.gluOutMmol)*180/1000):0;
  out.naMmol=out.naMmol-Mna0/1000;
  out.ufMl=out.drainL*1000-fillIn-resid;
  out.hours=t/60; out.reserveMl=reserve;
  return out;
};

if(typeof module!=="undefined" && module.exports) module.exports=PD;
root.PD=PD;
})(typeof window!=="undefined"?window:this);
