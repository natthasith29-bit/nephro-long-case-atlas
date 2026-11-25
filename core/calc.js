/* CORE-03 Calc engine (v1.0.0)
   Every formula returns a result object with worked steps, so a sim can show the MEQ-style working.
   Rule: backward-compatible changes only (add functions, never change existing signatures).

   Result shape:
     { value: Number, unit: "mL/min", label: "spKt/V", steps: [{t:"ขั้น", f:"สูตรพร้อมตัวเลข"}],
       flag: "flag"|"ok"|null, note: "แปลผล", ...extra fields }
   Usage:
     <script src="../core/calc.js"></script>
     var r = Calc.spKtV({pre:70, post:21, t:4, uf:3, w:70});
     Sim.ro("roKtV", Calc.f(r.value,2), r.flag);
     Calc.renderSteps(document.getElementById("steps"), r);   // <ol class="steps">

   Units (default): BUN, creatinine, glucose, urea mg/dL; electrolytes mmol/L; osmolality mOsm/kg;
   weight kg; height cm; time h unless the parameter name ends in Min; flows mL/min (Qb) or mL/h (CRRT fluids).
   Thresholds are teaching defaults with the guideline named in each function's comment. */
(function(root){
"use strict";
var Calc = root.Calc = root.Calc || {};
Calc.version = "1.0.0";

/* ---------------- helpers ---------------- */
/* f(x,d): fixed decimals, thousands separator, "-" for invalid */
Calc.f = function(n, d){
  if(n===null || n===undefined || !isFinite(n)) return "-";
  var s = Number(n).toFixed(d===undefined?2:d), p = s.split(".");
  p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return p.join(".");
};
var f = Calc.f;
/* n(x): input echo in steps, up to 3 decimals, trailing zeros trimmed, non-numbers pass through */
function n(x){ if(typeof x!=="number" || !isFinite(x)) return x; var a = Math.abs(x), d = a>=100?1:a>=1?2:3; return String(+x.toFixed(d)); }
Calc.n = n;
function pct(x, d){ return f(x*100, d===undefined?1:d) + "%"; }
function res(label, value, unit, steps, extra){
  var o = {label:label, value:value, unit:unit||"", steps:steps||[], flag:null, note:""};
  if(extra) for(var k in extra) o[k] = extra[k];
  return o;
}
function S(t, fx){ return {t:t, f:fx}; }
Calc.clamp = function(x,a,b){ return Math.max(a, Math.min(b, x)); };
/* linear interpolation in sorted [[x,y],...] */
Calc.interp = function(data, x){
  if(!data || !data.length) return NaN;
  if(x<=data[0][0]) return data[0][1];
  for(var i=1;i<data.length;i++){
    if(x<=data[i][0]){ var a=data[i-1], b=data[i], u=(x-a[0])/((b[0]-a[0])||1); return a[1]+u*(b[1]-a[1]); }
  }
  return data[data.length-1][1];
};
/* sample(fn, x0, x1, n) -> [[x, fn(x)], ...] */
Calc.sample = function(fn, x0, x1, n){
  n = n || 200; var out = [];
  for(var i=0;i<=n;i++){ var x = x0 + (x1-x0)*i/n; out.push([x, fn(x)]); }
  return out;
};
/* rk4(deriv(t,y[]) -> dy[], y0[], t0, t1, dt, every) -> [{t, y:[...]}] */
Calc.rk4 = function(deriv, y0, t0, t1, dt, every){
  var y = y0.slice(), t = t0, out = [{t:t, y:y.slice()}], n = 0; every = every || 1;
  function add(a,b,s){ return a.map(function(v,i){ return v + b[i]*s; }); }
  while(t < t1 - 1e-9){
    var h = Math.min(dt, t1-t);
    var k1 = deriv(t, y), k2 = deriv(t+h/2, add(y,k1,h/2)), k3 = deriv(t+h/2, add(y,k2,h/2)), k4 = deriv(t+h, add(y,k3,h));
    y = y.map(function(v,i){ return v + h/6*(k1[i]+2*k2[i]+2*k3[i]+k4[i]); });
    t += h; n++;
    if(n % every === 0 || t >= t1 - 1e-9) out.push({t:t, y:y.slice()});
  }
  return out;
};

/* Render worked steps into a container as <ol class="steps"> (styled by core.css).
   opts: {title, showResult:true} */
Calc.renderSteps = function(el, r, opts){
  if(typeof el === "string") el = document.getElementById(el);
  if(!el || !r) return;
  opts = opts || {};
  el.innerHTML = "";
  if(opts.title){ var h = document.createElement("h3"); h.textContent = opts.title; el.appendChild(h); }
  var ol = document.createElement("ol"); ol.className = "steps";
  (r.steps||[]).forEach(function(s){
    var li = document.createElement("li");
    if(s.t){ li.appendChild(document.createTextNode(s.t + (s.f ? " " : ""))); }
    if(s.f){ var c = document.createElement("code"); c.textContent = s.f; li.appendChild(c); }
    ol.appendChild(li);
  });
  el.appendChild(ol);
  if(opts.showResult !== false && r.note){
    var p = document.createElement("p"); p.className = "hint " + (r.flag==="flag" ? "flag-txt" : r.flag==="ok" ? "ok-txt" : "");
    p.textContent = r.note; el.appendChild(p);
  }
};
/* Steps as plain text lines (for quiz explanations or console) */
Calc.stepsText = function(r){ return (r.steps||[]).map(function(s,i){ return (i+1)+". "+(s.t||"")+(s.f?" "+s.f:""); }).join("\n"); };

/* ---------------- body size ---------------- */
/* BSA DuBois: 0.007184 × W^0.425 × H^0.725 */
Calc.bsa = function(o){
  var v = 0.007184*Math.pow(o.w,0.425)*Math.pow(o.h,0.725);
  return res("BSA", v, "m²", [S("DuBois","0.007184 × "+n(o.w)+"^0.425 × "+n(o.h)+"^0.725 = "+f(v,2)+" m²")]);
};
/* Watson total body water (urea V). o: {sex:"M"|"F", age, h, w} */
Calc.watson = function(o){
  var v = o.sex==="F" ? -2.097 + 0.1069*o.h + 0.2466*o.w : 2.447 - 0.09516*o.age + 0.1074*o.h + 0.3362*o.w;
  var fx = o.sex==="F" ? "−2.097 + 0.1069×"+n(o.h)+" + 0.2466×"+n(o.w) : "2.447 − 0.09516×"+n(o.age)+" + 0.1074×"+n(o.h)+" + 0.3362×"+o.w;
  return res("V (Watson)", v, "L", [S("Watson "+(o.sex==="F"?"หญิง":"ชาย"), fx+" = "+f(v,1)+" L")]);
};
/* TBW by fraction: 0.6 man, 0.5 woman, 0.5 elderly man, 0.45 elderly woman (child 0.6) */
Calc.tbw = function(o){
  var fr = o.fraction || (o.sex==="F" ? (o.elderly?0.45:0.5) : (o.elderly?0.5:0.6));
  var v = o.w*fr;
  return res("TBW", v, "L", [S("TBW = น้ำหนัก × fraction", n(o.w)+" × "+fr+" = "+f(v,1)+" L")], {fraction:fr});
};

/* ---------------- kidney function ---------------- */
/* CKD-EPI 2021 creatinine (race-free). Inker NEJM 2021 */
Calc.ckdEpiCr = function(o){
  var F = o.sex==="F", k = F?0.7:0.9, a = F?-0.241:-0.302, r = o.cr/k;
  var v = 142*Math.pow(Math.min(r,1),a)*Math.pow(Math.max(r,1),-1.2)*Math.pow(0.9938,o.age)*(F?1.012:1);
  var out = res("eGFR CKD-EPI 2021 (Cr)", v, "mL/min/1.73 m²", [
    S("κ, α ตามเพศ", "κ = "+k+", α = "+a),
    S("Scr/κ", n(o.cr)+" / "+k+" = "+f(r,3)),
    S("eGFR", "142 × min("+f(r,3)+",1)^"+a+" × max("+f(r,3)+",1)^−1.200 × 0.9938^"+n(o.age)+(F?" × 1.012":"")+" = "+f(v,0))
  ]);
  out.stage = Calc.gStage(v); return out;
};
/* CKD-EPI 2012 cystatin C */
Calc.ckdEpiCys = function(o){
  var F = o.sex==="F", r = o.cys/0.8;
  var v = 133*Math.pow(Math.min(r,1),-0.499)*Math.pow(Math.max(r,1),-1.328)*Math.pow(0.996,o.age)*(F?0.932:1);
  var out = res("eGFR CKD-EPI 2012 (CysC)", v, "mL/min/1.73 m²", [
    S("Scys/0.8", n(o.cys)+" / 0.8 = "+f(r,3)),
    S("eGFR", "133 × min("+f(r,3)+",1)^−0.499 × max("+f(r,3)+",1)^−1.328 × 0.996^"+n(o.age)+(F?" × 0.932":"")+" = "+f(v,0))
  ]);
  out.stage = Calc.gStage(v); return out;
};
/* CKD-EPI 2021 creatinine-cystatin C */
Calc.ckdEpiCrCys = function(o){
  var F = o.sex==="F", k = F?0.7:0.9, a = F?-0.219:-0.144, r = o.cr/k, c = o.cys/0.8;
  var v = 135*Math.pow(Math.min(r,1),a)*Math.pow(Math.max(r,1),-0.544)*Math.pow(Math.min(c,1),-0.323)*Math.pow(Math.max(c,1),-0.778)*Math.pow(0.9961,o.age)*(F?0.963:1);
  var out = res("eGFR CKD-EPI 2021 (Cr-CysC)", v, "mL/min/1.73 m²", [
    S("Scr/κ และ Scys/0.8", f(r,3)+" และ "+f(c,3)+" (κ "+k+", α "+a+")"),
    S("eGFR", "135 × min(Scr/κ,1)^"+a+" × max(Scr/κ,1)^−0.544 × min(Scys/0.8,1)^−0.323 × max(Scys/0.8,1)^−0.778 × 0.9961^"+n(o.age)+(F?" × 0.963":"")+" = "+f(v,0))
  ]);
  out.stage = Calc.gStage(v); return out;
};
/* KDIGO G stage */
Calc.gStage = function(g){ return g>=90?"G1":g>=60?"G2":g>=45?"G3a":g>=30?"G3b":g>=15?"G4":"G5"; };
Calc.aStage = function(acr){ return acr<30?"A1":acr<=300?"A2":"A3"; };
/* Cockcroft-Gault (mL/min, not indexed). o:{age,w,cr,sex} */
Calc.cockcroftGault = function(o){
  var v = (140-o.age)*o.w/(72*o.cr)*(o.sex==="F"?0.85:1);
  return res("CrCl Cockcroft-Gault", v, "mL/min", [S("CrCl", "(140 − "+n(o.age)+") × "+n(o.w)+" / (72 × "+n(o.cr)+")"+(o.sex==="F"?" × 0.85":"")+" = "+f(v,0)+" mL/min")]);
};
/* KFRE 4-variable, Tangri JAMA 2016. o:{age, sex, egfr, acr (mg/g), region:"nonNA"|"NA"}
   Baseline survival non-North America 0.9832 (2 y), 0.9365 (5 y). North America 0.9750, 0.9240 */
Calc.kfre = function(o){
  var NA = o.region==="NA", s2 = NA?0.9750:0.9832, s5 = NA?0.9240:0.9365, male = o.sex==="F"?0:1;
  var L = -0.2201*(o.age/10-7.036) + 0.2467*(male-0.5642) - 0.5567*(o.egfr/5-7.222) + 0.4510*(Math.log(Math.max(o.acr,0.1))-5.137);
  var r2 = 1-Math.pow(s2,Math.exp(L)), r5 = 1-Math.pow(s5,Math.exp(L));
  var out = res("KFRE 5-year", r5*100, "%", [
    S("Linear predictor", "−0.2201×("+n(o.age)+"/10 − 7.036) + 0.2467×("+male+" − 0.5642) − 0.5567×("+n(o.egfr)+"/5 − 7.222) + 0.4510×(ln "+n(o.acr)+" − 5.137) = "+f(L,3)),
    S("2-year risk", "1 − "+s2+"^exp("+f(L,3)+") = "+pct(r2)),
    S("5-year risk", "1 − "+s5+"^exp("+f(L,3)+") = "+pct(r5))
  ], {risk2:r2*100, risk5:r5*100, lp:L});
  out.flag = r2>0.1 ? "flag" : r5>=0.03 ? null : "ok";
  out.note = "5-year risk "+pct(r5)+" และ 2-year "+pct(r2)+" (KDIGO 2024: 5-year 3 ถึง 5% ส่งต่อ nephrologist, 2-year >10% เริ่ม multidisciplinary care, 2-year >40% modality education และเตรียม KRT รวม access)";
  return out;
};
/* KDIGO AKI stage. o:{base, cr, rise48h (mg/dL, optional), uo (mL/kg/h, optional), uoHours, anuriaHours, rrt} */
Calc.kdigoAki = function(o){
  var ratio = o.cr/o.base, sCr = 0, steps = [S("Cr ratio", n(o.cr)+" / "+n(o.base)+" = "+f(ratio,2)+" เท่า")];
  if(o.rrt || ratio>=3 || (o.cr>=4 && (ratio>=1.5 || (o.rise48h||0)>=0.3))) sCr = 3;
  else if(ratio>=2) sCr = 2;
  else if(ratio>=1.5 || (o.rise48h||0)>=0.3) sCr = 1;
  if(o.rise48h!==undefined) steps.push(S("Absolute rise ใน 48 h", f(o.rise48h,2)+" mg/dL"+(o.rise48h>=0.3?" (≥0.3 เข้า stage 1)":"")));
  var sUO = 0;
  if(o.uo!==undefined){
    var h = o.uoHours||0;
    if((o.uo<0.3 && h>=24) || (o.anuriaHours||0)>=12) sUO = 3;
    else if(o.uo<0.5 && h>=12) sUO = 2;
    else if(o.uo<0.5 && h>=6) sUO = 1;
    steps.push(S("Urine output", f(o.uo,2)+" mL/kg/h นาน "+h+" h → stage "+sUO));
  }
  var st = Math.max(sCr,sUO);
  steps.push(S("Stage = ค่าสูงสุดของเกณฑ์ Cr และ UO", "Cr stage "+sCr+", UO stage "+sUO+" → stage "+st));
  var out = res("KDIGO AKI stage", st, "", steps, {byCr:sCr, byUO:sUO});
  out.flag = st>=2 ? "flag" : st===1 ? null : "ok";
  out.note = st ? "AKI stage "+st : "ไม่เข้าเกณฑ์ AKI";
  return out;
};
/* Fractional excretion (generic). o:{ux, px, ucr, pcr, name} result in % */
Calc.fe = function(o){
  var v = (o.ux*o.pcr)/(o.px*o.ucr)*100, nm = o.name||"x";
  return res("FE"+nm, v, "%", [S("FE"+nm+" = (U"+nm+" × PCr)/(P"+nm+" × UCr) × 100", "("+n(o.ux)+" × "+n(o.pcr)+")/("+n(o.px)+" × "+n(o.ucr)+") × 100 = "+f(v,2)+"%")]);
};
Calc.fena = function(o){
  var r = Calc.fe({ux:o.una, px:o.pna, ucr:o.ucr, pcr:o.pcr, name:"Na"});
  r.flag = r.value<1 ? "ok" : r.value>2 ? "flag" : null;
  r.note = r.value<1 ? "FENa <1% เข้าได้กับ prerenal แต่ไม่จำเพาะ พบได้ใน contrast nephropathy, pigment nephropathy, early obstruction, acute GN, sepsis และ HRS ด้วย" : r.value>2 ? "FENa >2% เข้าได้กับ ATN แต่ prerenal ที่ได้ diuretic, มี CKD เดิม, bicarbonaturia หรือ salt wasting ก็สูงได้ (ใช้ FEUrea ช่วย)" : "FENa 1 ถึง 2% แปลผลไม่ชัด";
  return r;
};
Calc.feurea = function(o){
  var r = Calc.fe({ux:o.uurea, px:o.bun, ucr:o.ucr, pcr:o.pcr, name:"Urea"});
  r.flag = r.value<35 ? "ok" : r.value>50 ? "flag" : null;
  r.note = r.value<35 ? "FEUrea <35% เข้าได้กับ prerenal แม้ได้ diuretic" : r.value>50 ? "FEUrea >50% เข้าได้กับ ATN" : "FEUrea 35 ถึง 50% ก้ำกึ่ง";
  return r;
};
Calc.feurate = function(o){
  var r = Calc.fe({ux:o.uua, px:o.pua, ucr:o.ucr, pcr:o.pcr, name:"Urate"});
  r.flag = r.value>12 ? "flag" : null;
  r.note = r.value>12 ? "FE urate >12% พบใน SIAD และ CSW ดูซ้ำหลังแก้ Na: ยังสูงชี้ CSW, กลับปกติชี้ SIAD" : r.value<4 ? "FE urate <4% ชี้ volume depletion" : "FE urate ปกติ 4 ถึง 11%";
  return r;
};
/* Creatinine kinetics (single pool). o:{v (L), gcr (mg/day), gfr (mL/min, number or fn(tDays)), cr0, days, dt}
   returns series [[day, Cr]] in value, plus steps for steady state */
Calc.creatKinetics = function(o){
  var dt = o.dt || 0.05, V = o.v;
  var gfrAt = typeof o.gfr==="function" ? o.gfr : function(){ return o.gfr; };
  var sim = Calc.rk4(function(t,y){ var g = gfrAt(t)*1.44; return [(o.gcr - g*y[0]*10)/(V*10)]; }, [o.cr0], 0, o.days, dt, Math.max(1,Math.round(0.25/dt)));
  var series = sim.map(function(p){ return [p.t, p.y[0]]; });
  var gEnd = gfrAt(o.days), css = o.gcr/(gEnd*1.44*10);
  return res("Cr ที่วันที่ "+n(o.days), series[series.length-1][1], "mg/dL", [
    S("Mass balance", "d(Cr×V)/dt = G − GFR×Cr"),
    S("Steady state", "Css = G / GFR = "+n(o.gcr)+" mg/d / ("+gEnd+" mL/min × 14.4 dL/d) = "+f(css,2)+" mg/dL"),
    S("Time constant", "τ = V/GFR = "+V+" L / "+f(gEnd*1.44,2)+" L/d = "+f(V/(gEnd*1.44),1)+" วัน (ใช้ราว 3 ถึง 5 τ จึงถึง steady state)")
  ], {series:series, css:css});
};

/* ---------------- hemodialysis ---------------- */
/* URR = 1 − post/pre. Target ≥65% (KDOQI 2015) */
Calc.urr = function(o){
  var R = o.post/o.pre, v = (1-R)*100;
  var out = res("URR", v, "%", [S("R = post/pre", n(o.post)+" / "+n(o.pre)+" = "+f(R,3)), S("URR = (1 − R) × 100", "(1 − "+f(R,3)+") × 100 = "+f(v,1)+"%")], {R:R});
  out.flag = v<65 ? "flag" : "ok"; out.note = v<65 ? "URR ต่ำกว่าเป้า 65%" : "URR ผ่านเป้า ≥65%";
  return out;
};
/* Daugirdas II spKt/V = −ln(R − 0.008t) + (4 − 3.5R) × UF/W. o:{pre, post, t (h), uf (L), w (post kg)}
   Target spKt/V ≥1.4 thrice weekly, minimum delivered 1.2 (KDOQI 2015) */
Calc.spKtV = function(o){
  var R = o.post/o.pre, a = R-0.008*o.t, v = -Math.log(a) + (4-3.5*R)*o.uf/o.w;
  var out = res("spKt/V", v, "", [
    S("R = post/pre", n(o.post)+" / "+n(o.pre)+" = "+f(R,3)),
    S("R − 0.008t", f(R,3)+" − 0.008×"+n(o.t)+" = "+f(a,3)),
    S("−ln(R − 0.008t)", "−ln("+f(a,3)+") = "+f(-Math.log(a),3)),
    S("(4 − 3.5R) × UF/W", "(4 − 3.5×"+f(R,3)+") × "+n(o.uf)+"/"+n(o.w)+" = "+f((4-3.5*R)*o.uf/o.w,3)),
    S("spKt/V", f(-Math.log(a),3)+" + "+f((4-3.5*R)*o.uf/o.w,3)+" = "+f(v,2))
  ], {R:R});
  out.flag = v<1.2 ? "flag" : v<1.4 ? null : "ok";
  out.note = v<1.2 ? "ต่ำกว่า minimum delivered 1.2" : v<1.4 ? "ผ่าน minimum 1.2 แต่ต่ำกว่า target 1.4" : "ผ่าน target spKt/V 1.4";
  return out;
};
/* Equilibrated Kt/V (Tattersall-Daugirdas rate equation). o:{sp, t (h), access:"av"|"cvc"} */
Calc.eKtV = function(o){
  var cvc = o.access==="cvc", a = cvc?0.47:0.6, b = cvc?0.02:0.03, v = o.sp*(1-a/o.t)+b;
  return res("eKt/V", v, "", [S("eKt/V = spKt/V × (1 − "+a+"/t) + "+b+(cvc?" (venous catheter)":" (AV access)"), f(o.sp,2)+" × (1 − "+a+"/"+n(o.t)+") + "+b+" = "+f(v,2))]);
};
/* Standard Kt/V (FHN / KDOQI 2015 appendix). o:{ekt, tMin (min per session), n (sessions/wk), ufw (L/wk), v (L), kru (mL/min, optional)}
   Target stdKt/V 2.3 (minimum delivered 2.1) */
Calc.stdKtV = function(o){
  var e = o.ekt, t = o.tMin, N = o.n, x = 1-Math.exp(-e);
  var Sx = (10080*x/t)/(x/e + 10080/(N*t) - 1);
  var corr = o.ufw && o.v ? 1-(0.74/N)*(o.ufw/o.v) : 1, v = Sx/corr;
  var steps = [
    S("S = [10080 × (1 − e^−eKt/V)/t] / [(1 − e^−eKt/V)/eKt/V + 10080/(N×t) − 1]", "[10080 × "+f(x,3)+"/"+t+"] / ["+f(x,3)+"/"+f(e,2)+" + 10080/("+N+"×"+t+") − 1] = "+f(Sx,2)),
    S("UF correction S / [1 − (0.74/N) × UFw/V]", f(Sx,2)+" / [1 − (0.74/"+N+") × "+n(o.ufw||0)+"/"+(o.v||"V")+"] = "+f(v,2))
  ];
  var renal = 0;
  if(o.kru && o.v){ renal = o.kru*10.08/o.v; steps.push(S("Renal weekly Kt/V = Kru × 10.08 / V", n(o.kru)+" × 10.08 / "+n(o.v)+" = "+f(renal,2))); steps.push(S("รวม", f(v,2)+" + "+f(renal,2)+" = "+f(v+renal,2))); }
  var out = res("stdKt/V", v+renal, "/wk", steps, {dialytic:v, renal:renal});
  out.flag = v+renal<2.1 ? "flag" : v+renal<2.3 ? null : "ok";
  out.note = v+renal<2.1 ? "ต่ำกว่า minimum stdKt/V 2.1" : v+renal<2.3 ? "ผ่าน minimum 2.1 ต่ำกว่า target 2.3" : "ผ่าน target stdKt/V 2.3";
  return out;
};
/* Urea recirculation (low-flow method). o:{a (arterial line), v (venous line), p (systemic sample)} >10% abnormal */
Calc.recirculation = function(o){
  var v = (o.p-o.a)/(o.p-o.v)*100;
  var out = res("Recirculation", v, "%", [S("R = (S − A)/(S − V) × 100", "("+n(o.p)+" − "+n(o.a)+")/("+n(o.p)+" − "+n(o.v)+") × 100 = "+f(v,1)+"%")]);
  out.flag = v>10 ? "flag" : "ok";
  out.note = v>10 ? "Recirculation >10% (urea method) หา cause: needle กลับด้าน, Qa < Qb, outflow stenosis" : "Recirculation ≤10% ยอมรับได้";
  return out;
};
/* Residual urea clearance Kru. o:{uun (mg/dL), uvol (mL), tMin (collection min), bunPost (end of prior HD), bunPre (start of next HD), bsa (optional)} */
Calc.kru = function(o){
  var mean = (o.bunPost+o.bunPre)/2, v = o.uun*o.uvol/o.tMin/mean;
  var steps = [
    S("Mean interdialytic BUN", "("+n(o.bunPost)+" + "+n(o.bunPre)+")/2 = "+f(mean,1)+" mg/dL"),
    S("Kru = UUN × Vurine / t / mean BUN", n(o.uun)+" × "+n(o.uvol)+" / "+n(o.tMin)+" / "+f(mean,1)+" = "+f(v,2)+" mL/min")
  ];
  var idx = v;
  if(o.bsa){ idx = v*1.73/o.bsa; steps.push(S("Normalize 1.73 m²", f(v,2)+" × 1.73/"+n(o.bsa)+" = "+f(idx,2)+" mL/min/1.73 m²")); }
  var out = res("Kru", v, "mL/min", steps, {indexed:idx});
  out.flag = idx>=3 ? "ok" : idx<2 ? "flag" : null;
  out.note = idx>=3 ? "Kru ≥3 mL/min/1.73 m² พอพิจารณา incremental หรือ twice-weekly HD (KDOQI 2015)" : "Kru ต่ำ ไม่ควรลดเหลือ twice-weekly";
  return out;
};
/* nPCR from interdialytic urea generation (Borah). o:{bunPost, bunPre (next session), v (post L), idwg (kg), tMin (interdialytic), uun, uvol (mL, optional)} */
Calc.npcr = function(o){
  var V1 = o.v, V2 = o.v+o.idwg;
  var gDial = (o.bunPre*V2 - o.bunPost*V1)*10/o.tMin, gRen = o.uun && o.uvol ? o.uun*o.uvol/100/o.tMin : 0, G = gDial+gRen;
  var pcr = 9.35*G + 0.294*V1, np = pcr/(V1/0.58);
  var out = res("nPCR", np, "g/kg/d", [
    S("G = (C2V2 − C1V1)/T", "("+n(o.bunPre)+"×"+f(V2,1)+" − "+n(o.bunPost)+"×"+f(V1,1)+") × 10 / "+n(o.tMin)+" = "+f(gDial,2)+" mg/min"),
    S("บวก renal urea loss", f(gRen,2)+" mg/min → G = "+f(G,2)+" mg/min"),
    S("PCR = 9.35G + 0.294V", "9.35×"+f(G,2)+" + 0.294×"+V1+" = "+f(pcr,1)+" g/d"),
    S("nPCR = PCR / (V/0.58)", f(pcr,1)+" / "+f(V1/0.58,1)+" = "+f(np,2)+" g/kg/d")
  ], {G:G, pcr:pcr});
  out.flag = np<1.0 ? "flag" : "ok";
  out.note = np<1.0 ? "nPCR <1.0 g/kg/d ระวัง PEW (เป้า DPI 1.0 ถึง 1.2 g/kg/d, KDOQI Nutrition 2020)" : "nPCR ≥1.0 g/kg/d";
  return out;
};
/* Single-pool variable-volume urea sawtooth over one week at steady state.
   o:{k (mL/min dialyzer), kru (mL/min), g (mg/min), v (post L), idwg (kg per interval avg), tMin, days:[0,2,4] (session start day), startHour:8, weeks:3, stepMin:5}
   returns {value: pre BUN of first session, series:[[hour, BUN]], sessions:[[h0,h1]], pre:[], post:[], tac} */
Calc.ureaSawtooth = function(o){
  var days = o.days || [0,2,4], sh = o.startHour===undefined?8:o.startHour, T = o.tMin, dt = o.stepMin||5;
  var weeks = o.weeks||3, Vpost = o.v, kr = o.kru||0, G = o.g;
  var starts = days.map(function(d){ return (d*24+sh)*60; });
  var gapMin = 10080/starts.length, ufRateDia = (o.idwg||0)*1000/T, gainRate = (o.idwg||0)*1000*starts.length/(10080 - starts.length*T);  // mL/min
  var V = Vpost*1000 + (o.idwg||0)*1000, C = 60;   // mL, mg/dL
  var M = C*V/100;   // mg
  var series = [], sessions = [], pre = [], post = [], sumC = 0, nC = 0;
  for(var w=0; w<weeks; w++){
    for(var m=0; m<10080; m+=dt){
      var inHD = false, i;
      for(i=0;i<starts.length;i++){ if(m>=starts[i] && m<starts[i]+T){ inHD = true; break; } }
      var last = w===weeks-1;
      if(last){
        for(i=0;i<starts.length;i++){ if(starts[i]>=m && starts[i]<m+dt){ pre.push(C); } if(starts[i]+T>=m && starts[i]+T<m+dt){ post.push(C); } }
        if(m % 30 === 0) series.push([m/60, C]);
        sumC += C; nC++;
      }
      var clear = (inHD ? o.k : 0) + kr;
      M += (G - clear*C/100)*dt;
      V += (inHD ? -ufRateDia : gainRate)*dt;
      if(V < Vpost*1000*0.8) V = Vpost*1000*0.8;
      C = M*100/V;
    }
  }
  starts.forEach(function(s){ sessions.push([s/60, (s+T)/60]); });
  var tac = sumC/nC;
  return res("Pre BUN (session 1)", pre[0], "mg/dL", [
    S("Mass balance", "d(C×V)/dt = G − (K + Kru) × C"),
    S("Parameters", "K "+n(o.k)+" mL/min, Kru "+kr+" mL/min, G "+G+" mg/min, V "+Vpost+" L, t "+T+" min, "+starts.length+" ครั้ง/สัปดาห์"),
    S("TAC (time-averaged BUN)", f(tac,1)+" mg/dL")
  ], {series:series, sessions:sessions, pre:pre, post:post, tac:tac});
};

/* ---------------- peritoneal dialysis ---------------- */
/* Weekly Kt/V. o:{dpUrea (D/P urea of 24 h effluent), drainL (L/day), upUrea (U/P urea), urineL (L/day), v (L), target:1.7}
   ISPD: total weekly Kt/V ≥1.7. Acute PD in AKI target 3.5 (ISPD 2020 AKI) */
Calc.pdKtV = function(o){
  var pd = o.dpUrea*o.drainL*7/o.v, rn = (o.upUrea||0)*(o.urineL||0)*7/o.v, v = pd+rn, tg = o.target||1.7;
  var out = res("Weekly Kt/V", v, "/wk", [
    S("Peritoneal = D/P urea × drain × 7 / V", n(o.dpUrea)+" × "+n(o.drainL)+" × 7 / "+n(o.v)+" = "+f(pd,2)),
    S("Renal = U/P urea × urine × 7 / V", (o.upUrea||0)+" × "+n(o.urineL||0)+" × 7 / "+n(o.v)+" = "+f(rn,2)),
    S("Total", f(pd,2)+" + "+f(rn,2)+" = "+f(v,2))
  ], {pd:pd, renal:rn});
  out.flag = v<tg ? "flag" : "ok"; out.note = v<tg ? "ต่ำกว่าเป้า "+tg : "ผ่านเป้า "+tg;
  return out;
};
/* Weekly CCr normalised. o:{dpCr, drainL, ucr, pcr, uurea, bun, urineL, bsa}
   Renal = mean of urea and creatinine clearance. Historic targets: CAPD ≥60 L/wk/1.73 m² (high/high-average), ≥50 (low/low-average) NKF-DOQI 1997, APD ≥45 ISPD 2006 */
Calc.pdCCr = function(o){
  var pd = o.dpCr*o.drainL*7, crCl = o.urineL ? o.ucr/o.pcr*o.urineL*7 : 0, urCl = o.urineL ? o.uurea/o.bun*o.urineL*7 : 0;
  var rn = (crCl+urCl)/2, raw = pd+rn, v = raw*1.73/o.bsa;
  return res("Weekly CCr", v, "L/wk/1.73 m²", [
    S("Peritoneal = D/P Cr × drain × 7", n(o.dpCr)+" × "+n(o.drainL)+" × 7 = "+f(pd,1)+" L/wk"),
    S("Renal = (CrCl + urea Cl)/2", "("+f(crCl,1)+" + "+f(urCl,1)+")/2 = "+f(rn,1)+" L/wk"),
    S("Normalize", f(raw,1)+" × 1.73/"+n(o.bsa)+" = "+f(v,1)+" L/wk/1.73 m²")
  ], {pd:pd, renal:rn});
};
/* PET interpretation. o:{dpCr4 (D/P Cr 4 h), dd0Glu (D/D0 glucose 4 h), na0, na60 (dialysate Na, 4.25% PET), uf (mL net at 4 h, 4.25%)}
   Twardowski categories, ISPD 2021 UF failure: net UF <400 mL in 4 h with 4.25% glucose. Na dip <5 mmol/L = aquaporin dysfunction */
Calc.pet = function(o){
  var d = o.dpCr4, cls = d>=0.82?"Fast (high)":d>=0.65?"Fast-average (high-average)":d>=0.50?"Slow-average (low-average)":"Slow (low)";
  var steps = [S("D/P Cr 4 h", f(d,2)+" → "+cls+" (≥0.82, 0.65 ถึง 0.81, 0.50 ถึง 0.64, <0.50)")];
  if(o.dd0Glu!==undefined){ var g = o.dd0Glu; steps.push(S("D/D0 glucose 4 h", f(g,2)+" → "+(g<0.26?"fast":g<0.39?"fast-average":g<0.50?"slow-average":"slow"))); }
  var dip = null;
  if(o.na0!==undefined && o.na60!==undefined){ dip = o.na0-o.na60; steps.push(S("Na dipping = Na0 − Na60", n(o.na0)+" − "+n(o.na60)+" = "+dip+" mmol/L"+(dip<5?" (dip น้อย ชี้ aquaporin dysfunction)":""))); }
  var uff = o.uf!==undefined && o.uf<400;
  if(o.uf!==undefined) steps.push(S("Net UF 4 h (4.25%)", n(o.uf)+" mL"+(uff?" <400 mL เข้าเกณฑ์ UF failure":"")));
  var type = !uff ? "" : d>=0.82 ? "Type I (fast transport)" : (dip!==null && dip<5) ? "Type II (aquaporin dysfunction)" : "Type III (lymphatic/ low effective surface)";
  var out = res("PET", d, "D/P Cr", steps, {category:cls, dip:dip, ufFailure:uff, ufType:type});
  out.flag = uff ? "flag" : d>=0.82 ? null : "ok";
  out.note = uff ? "UF failure: "+type : cls;
  return out;
};

/* ---------------- CRRT ---------------- */
/* o:{qb (mL/min), hct (0-1), qd, qpre, qpost, qnet (all mL/h), w (kg)}
   Delivered dose target 20 to 25 mL/kg/h (KDIGO AKI 2012), FF ≤20 to 25% */
Calc.crrtDose = function(o){
  var qp = o.qb*60*(1-o.hct), eff = (o.qd||0)+(o.qpre||0)+(o.qpost||0)+(o.qnet||0);
  var dil = qp/(qp+(o.qpre||0)), dose = eff/o.w, corr = dose*dil;
  var ff = ((o.qpre||0)+(o.qpost||0)+(o.qnet||0))/(qp+(o.qpre||0));
  var out = res("Delivered dose", corr, "mL/kg/h", [
    S("Qp = Qb × 60 × (1 − Hct)", n(o.qb)+" × 60 × (1 − "+n(o.hct)+") = "+f(qp,0)+" mL/h"),
    S("Effluent = Qd + Qrep pre + Qrep post + net UF", (o.qd||0)+" + "+n(o.qpre||0)+" + "+n(o.qpost||0)+" + "+n(o.qnet||0)+" = "+f(eff,0)+" mL/h"),
    S("Dose (uncorrected)", f(eff,0)+" / "+n(o.w)+" = "+f(dose,1)+" mL/kg/h"),
    S("Predilution factor = Qp/(Qp + Qrep pre)", f(qp,0)+"/("+f(qp,0)+" + "+n(o.qpre||0)+") = "+f(dil,3)),
    S("Delivered dose", f(dose,1)+" × "+f(dil,3)+" = "+f(corr,1)+" mL/kg/h"),
    S("FF = (Qrep + net UF)/(Qp + Qrep pre)", "("+((o.qpre||0)+(o.qpost||0)+(o.qnet||0))+")/("+f(qp+(o.qpre||0),0)+") = "+pct(ff))
  ], {effluent:eff, ff:ff*100, dil:dil, uncorrected:dose});
  out.flag = (ff>0.25 || corr<20) ? "flag" : "ok";
  out.note = (corr<20?"Dose ต่ำกว่า 20 mL/kg/h ":"")+(ff>0.25?"FF >25% เสี่ยง filter clotting ":"")+((ff<=0.25 && corr>=20)?"Dose และ FF อยู่ในเป้า":"");
  return out;
};
/* Hourly net fluid balance. o:{intake (mL/h, all infusions + feeds), qnet (mL/h machine net UF), otherOut (mL/h)} */
Calc.crrtBalance = function(o){
  var v = o.intake - o.qnet - (o.otherOut||0);
  return res("Net balance", v, "mL/h", [S("Balance = intake − net UF − other output", n(o.intake)+" − "+n(o.qnet)+" − "+n(o.otherOut||0)+" = "+f(v,0)+" mL/h ("+f(v*24/1000,2)+" L/day)")]);
};

/* ---------------- sodium and water ---------------- */
/* Corrected Na for glucose. o:{na, glu, factor:2.4 (Hillier) or 1.6 (Katz)} */
Calc.correctedNa = function(o){
  var k = o.factor||2.4, v = o.na + k*(o.glu-100)/100;
  return res("Corrected Na", v, "mmol/L", [S("Na + "+k+" × (glucose − 100)/100", n(o.na)+" + "+k+" × ("+n(o.glu)+" − 100)/100 = "+f(v,1))]);
};
/* Adrogue-Madias change in serum Na per 1 L infusate. o:{na, infNa, infK, tbw} */
Calc.adrogueMadias = function(o){
  var v = ((o.infNa||0)+(o.infK||0)-o.na)/(o.tbw+1);
  return res("ΔNa ต่อ 1 L", v, "mmol/L", [S("ΔNa = (infusate Na + K − serum Na)/(TBW + 1)", "("+n(o.infNa||0)+" + "+n(o.infK||0)+" − "+n(o.na)+")/("+f(o.tbw,1)+" + 1) = "+f(v,2)+" mmol/L")]);
};
/* Free water deficit. o:{na, tbw, target:140} */
Calc.freeWaterDeficit = function(o){
  var t = o.target||140, v = o.tbw*(o.na/t-1);
  return res("Free water deficit", v, "L", [S("TBW × (Na/"+t+" − 1)", f(o.tbw,1)+" × ("+n(o.na)+"/"+t+" − 1) = "+f(v,2)+" L")]);
};
/* Electrolyte-free water clearance. o:{v (L/day urine), una, uk, pna} */
Calc.efwc = function(o){
  var v = o.v*(1-(o.una+o.uk)/o.pna);
  var out = res("EFWC", v, "L/day", [S("EFWC = V × [1 − (UNa + UK)/PNa]", n(o.v)+" × [1 − ("+n(o.una)+" + "+n(o.uk)+")/"+n(o.pna)+"] = "+f(v,2)+" L/day")]);
  out.flag = v<0 ? "flag" : null;
  out.note = v<0 ? "EFWC ติดลบ ไตเก็บน้ำอิสระ Na จะต่ำลงถ้าไม่จำกัดน้ำ" : "EFWC บวก ไตขับน้ำอิสระ "+f(v,2)+" L/day";
  return out;
};
/* ---------------- potassium and urine anions ---------------- */
/* TTKG. Valid when Uosm > Posm and UNa >25 mmol/L */
Calc.ttkg = function(o){
  var v = (o.uk/o.pk)/(o.uosm/o.posm), valid = o.uosm>o.posm && (o.una===undefined || o.una>25);
  var out = res("TTKG", v, "", [S("TTKG = (UK/PK)/(Uosm/Posm)", "("+n(o.uk)+"/"+n(o.pk)+")/("+n(o.uosm)+"/"+n(o.posm)+") = "+f(v,1))], {valid:valid});
  out.note = (valid?"":"ใช้ไม่ได้ (Uosm ต้อง > Posm และ UNa >25) ")+(o.pk<3.5 ? (v>3?"hypoK + TTKG >3 ชี้ renal K loss":"TTKG <3 ชี้ extrarenal loss") : o.pk>5 ? (v<7?"hyperK + TTKG <7 ชี้ hypoaldosteronism หรือ aldosterone resistance":"TTKG ≥7 ตอบสนองเหมาะสม") : "");
  out.flag = valid ? null : "flag";
  return out;
};
/* Urine anion gap (net charge) = UNa + UK − UCl */
Calc.urineAG = function(o){
  var v = o.una+o.uk-o.ucl;
  var out = res("Urine AG", v, "mmol/L", [S("UAG = UNa + UK − UCl", n(o.una)+" + "+n(o.uk)+" − "+n(o.ucl)+" = "+v)]);
  out.note = v<0 ? "UAG ติดลบ NH4+ ขับได้ดี (GI loss, proximal RTA)" : "UAG บวก NH4+ ขับน้อย (distal RTA, type 4) หรือมี unmeasured anion เช่น ketone, hippurate";
  return out;
};
/* Urine osmolal gap. o:{uosm, una, uk, uurea (mg/dL), uglu (mg/dL)} NH4 ≈ UOG/2 */
Calc.urineOsmGap = function(o){
  var calc = 2*(o.una+o.uk) + o.uurea/2.8 + (o.uglu||0)/18, v = o.uosm-calc;
  var out = res("Urine osmolal gap", v, "mOsm/kg", [
    S("Calculated Uosm = 2(UNa + UK) + Uurea/2.8 + Uglu/18", "2("+n(o.una)+" + "+n(o.uk)+") + "+n(o.uurea)+"/2.8 + "+n(o.uglu||0)+"/18 = "+f(calc,0)),
    S("UOG = measured − calculated", n(o.uosm)+" − "+f(calc,0)+" = "+f(v,0)),
    S("Urine NH4+ ≈ UOG/2", f(v/2,0)+" mmol/L")
  ], {nh4:v/2});
  out.note = v<150 ? "UOG <150 mOsm/kg ขณะมี acidosis แสดงว่า NH4+ ขับน้อย เข้าได้กับ distal RTA, type 4 RTA หรือ CKD" : "UOG ≥150 NH4+ ขับเพียงพอ";
  out.flag = v<150 ? "flag" : "ok";
  return out;
};
/* ---------------- acid-base ---------------- */
/* Anion gap with albumin correction. o:{na, cl, hco3, alb (g/dL), k (optional, add if given)} */
Calc.anionGap = function(o){
  var v = o.na + (o.k||0) - o.cl - o.hco3, c = o.alb!==undefined ? v + 2.5*(4-o.alb) : v;
  var steps = [S("AG = Na"+(o.k?" + K":"")+" − Cl − HCO3", o.na+(o.k?" + "+n(o.k):"")+" − "+n(o.cl)+" − "+n(o.hco3)+" = "+f(v,1))];
  if(o.alb!==undefined) steps.push(S("Albumin-corrected AG = AG + 2.5 × (4 − albumin)", f(v,1)+" + 2.5 × (4 − "+n(o.alb)+") = "+f(c,1)));
  var out = res("Anion gap", c, "mmol/L", steps, {raw:v});
  var cut = o.k ? 16 : 12;   /* reference range shifts up by about 4 when K is included */
  out.flag = c>cut ? "flag" : "ok"; out.note = (c>cut ? "High AG" : "Normal AG")+" (cut-off "+cut+(o.k?" เมื่อรวม K":"")+")";
  return out;
};
/* Serum osmolal gap. o:{osm, na, glu, bun, etoh (mg/dL, optional)} >10 abnormal */
Calc.osmolalGap = function(o){
  var calc = 2*o.na + o.glu/18 + o.bun/2.8 + (o.etoh||0)/3.7, v = o.osm-calc;
  var out = res("Osmolal gap", v, "mOsm/kg", [
    S("Calculated = 2Na + glucose/18 + BUN/2.8"+(o.etoh?" + EtOH/3.7":""), "2×"+n(o.na)+" + "+n(o.glu)+"/18 + "+n(o.bun)+"/2.8"+(o.etoh?" + "+n(o.etoh)+"/3.7":"")+" = "+f(calc,0)),
    S("Gap = measured − calculated", n(o.osm)+" − "+f(calc,0)+" = "+f(v,0))
  ], {calc:calc});
  out.flag = v>10 ? "flag" : "ok";
  out.note = v>10 ? "Osmolal gap >10 สงสัย toxic alcohol (ช่วงหลัง gap ลดลงขณะ AG สูงขึ้น)" : "Osmolal gap ปกติ ไม่ตัด toxic alcohol ระยะท้าย";
  return out;
};
/* Stepwise ABG interpretation. o:{ph, pco2, hco3, na, cl, alb, chronic (bool for respiratory)} */
Calc.acidBase = function(o){
  var steps = [], prim = "", dx = [];
  var acidemia = o.ph<7.35, alkalemia = o.ph>7.45;
  steps.push(S("pH", o.ph+(acidemia?" acidemia":alkalemia?" alkalemia":" ปกติ (อาจเป็น mixed)")));
  if(acidemia) prim = o.hco3<22 ? "metabolic acidosis" : "respiratory acidosis";
  else if(alkalemia) prim = o.hco3>26 ? "metabolic alkalosis" : "respiratory alkalosis";
  else prim = (o.hco3<22 && o.pco2<35) ? "metabolic acidosis" : (o.hco3>26 && o.pco2>45) ? "metabolic alkalosis" : "";
  if(prim) steps.push(S("Primary disorder", prim));
  var exp, lo, hi;
  if(prim==="metabolic acidosis"){
    exp = 1.5*o.hco3+8; lo = exp-2; hi = exp+2;
    steps.push(S("Winter: expected pCO2 = 1.5 × HCO3 + 8 ± 2", "1.5×"+n(o.hco3)+" + 8 = "+f(exp,1)+" (ช่วง "+f(lo,0)+" ถึง "+f(hi,0)+")"));
  } else if(prim==="metabolic alkalosis"){
    exp = 40+0.7*(o.hco3-24); lo = exp-5; hi = exp+5;
    steps.push(S("Expected pCO2 = 40 + 0.7 × (HCO3 − 24) ± 5", "40 + 0.7×("+n(o.hco3)+" − 24) = "+f(exp,1)));
  } else if(prim==="respiratory acidosis"){
    var kA = o.chronic?0.35:0.1; exp = 24+kA*(o.pco2-40); lo = exp-2; hi = exp+2;
    steps.push(S("Expected HCO3 ("+(o.chronic?"chronic":"acute")+") = 24 + "+kA+" × (pCO2 − 40)", "24 + "+kA+"×("+n(o.pco2)+" − 40) = "+f(exp,1)));
  } else if(prim==="respiratory alkalosis"){
    var kB = o.chronic?0.4:0.2; exp = 24-kB*(40-o.pco2); lo = exp-2; hi = exp+2;
    steps.push(S("Expected HCO3 ("+(o.chronic?"chronic":"acute")+") = 24 − "+kB+" × (40 − pCO2)", "24 − "+kB+"×(40 − "+n(o.pco2)+") = "+f(exp,1)));
  }
  if(prim) dx.push(prim);
  if(prim.indexOf("metabolic")===0){
    if(o.pco2>hi) dx.push("concomitant respiratory acidosis"); else if(o.pco2<lo) dx.push("concomitant respiratory alkalosis");
  } else if(prim){
    if(o.hco3>hi) dx.push("concomitant metabolic alkalosis"); else if(o.hco3<lo) dx.push("concomitant metabolic acidosis");
  }
  var ag = null, dd = null;
  if(o.na!==undefined && o.cl!==undefined){
    ag = o.na-o.cl-o.hco3; var agc = o.alb!==undefined ? ag+2.5*(4-o.alb) : ag;
    steps.push(S("AG"+(o.alb!==undefined?" (albumin-corrected)":""), n(o.na)+" − "+n(o.cl)+" − "+n(o.hco3)+(o.alb!==undefined?" + 2.5×(4 − "+n(o.alb)+")":"")+" = "+f(agc,1)));
    if(agc>12){
      if(dx.indexOf("metabolic acidosis")<0 && prim!=="metabolic acidosis") dx.push("high AG metabolic acidosis");
      dd = (24-o.hco3)>0 ? (agc-12)/(24-o.hco3) : Infinity;   /* HCO3 ≥24 with high AG means coexisting metabolic alkalosis */
      steps.push(S("Delta ratio = (AG − 12)/(24 − HCO3)", "("+f(agc,1)+" − 12)/(24 − "+n(o.hco3)+") = "+f(dd,2)+(dd<1?" มี normal AG acidosis ร่วม":dd>2?" มี metabolic alkalosis ร่วม":" HAGMA อย่างเดียว")));
      if(dd<1) dx.push("concomitant normal AG metabolic acidosis"); else if(dd>2) dx.push("concomitant metabolic alkalosis");
    }
    ag = agc;
    var mi = dx.indexOf("metabolic acidosis");
    if(mi>=0) dx[mi] = agc>12 ? "high AG metabolic acidosis" : "normal AG metabolic acidosis";
    var hi2 = dx.indexOf("high AG metabolic acidosis"), hi3 = dx.lastIndexOf("high AG metabolic acidosis");
    if(hi3>hi2) dx.splice(hi3,1);
  }
  var uniq = dx.filter(function(x,i){ return dx.indexOf(x)===i; });
  var out = res("Acid-base", uniq.length, "", steps, {primary:prim, disorders:uniq, ag:ag, deltaRatio:dd, expected:exp});
  out.note = uniq.join(" + ") || "ไม่พบ disorder ชัดเจน";
  out.flag = uniq.length>1 ? "flag" : null;
  return out;
};
/* HCO3 deficit. o:{w, hco3, target:22, vd:0.5 (or "dynamic" = 0.4 + 2.6/HCO3)} */
Calc.hco3Deficit = function(o){
  var tg = o.target||22, vd = o.vd==="dynamic" ? 0.4+2.6/o.hco3 : (o.vd||0.5), v = vd*o.w*(tg-o.hco3);
  return res("HCO3 deficit", v, "mmol", [
    S("Vd", o.vd==="dynamic" ? "0.4 + 2.6/"+n(o.hco3)+" = "+f(vd,2) : String(vd)),
    S("Deficit = Vd × weight × (target − HCO3)", f(vd,2)+" × "+n(o.w)+" × ("+tg+" − "+n(o.hco3)+") = "+f(v,0)+" mmol"),
    S("ให้ครึ่งหนึ่งก่อนแล้วตรวจซ้ำ", f(v/2,0)+" mmol (7.5% NaHCO3 50 mL มี HCO3 ราว 44.6 mmol)")
  ]);
};
/* ---------------- calcium and phosphate ---------------- */
Calc.correctedCa = function(o){
  var v = o.ca + 0.8*(4-o.alb);
  return res("Corrected Ca", v, "mg/dL", [S("Ca + 0.8 × (4 − albumin)", n(o.ca)+" + 0.8 × (4 − "+n(o.alb)+") = "+f(v,2))]);
};
/* TmP/GFR (Kenny and Glen / Payne). o:{up, pp, ucr, pcr} all mg/dL. Adult normal approx 2.5 to 4.2 mg/dL */
Calc.tmpGfr = function(o){
  var trp = 1 - (o.up*o.pcr)/(o.pp*o.ucr), v, steps = [S("TRP = 1 − (UP × PCr)/(PP × UCr)", "1 − ("+n(o.up)+" × "+n(o.pcr)+")/("+n(o.pp)+" × "+n(o.ucr)+") = "+f(trp,3))];
  if(trp<=0.86){ v = trp*o.pp; steps.push(S("TRP ≤0.86 → TmP/GFR = TRP × PP", f(trp,3)+" × "+n(o.pp)+" = "+f(v,2)+" mg/dL")); }
  else { var a = 0.3*trp/(1-0.8*trp); v = a*o.pp; steps.push(S("TRP >0.86 → α = 0.3 × TRP/(1 − 0.8 × TRP)", f(a,3))); steps.push(S("TmP/GFR = α × PP", f(a,3)+" × "+n(o.pp)+" = "+f(v,2)+" mg/dL")); }
  var out = res("TmP/GFR", v, "mg/dL", steps, {trp:trp, mmol:v*0.3229});
  out.flag = v<2.5 ? "flag" : "ok";
  out.note = v<2.5 ? "TmP/GFR ต่ำ ร่วมกับ hypophosphatemia ชี้ renal phosphate wasting (FGF23-mediated, Fanconi, PTH)" : "TmP/GFR อยู่ในช่วงปกติ";
  return out;
};
/* ---------------- nutrition ---------------- */
/* Maroni DPI (non-dialysis CKD). o:{uunG (g/day urine urea N), w, protG (g/day proteinuria, add if >5)} */
Calc.maroniDPI = function(o){
  var base = 6.25*(o.uunG+0.031*o.w), pr = (o.protG||0)>5 ? o.protG : 0, v = base+pr;
  return res("DPI (Maroni)", v/o.w, "g/kg/d", [
    S("DPI = 6.25 × (UUN + 0.031 × weight)", "6.25 × ("+n(o.uunG)+" + 0.031×"+n(o.w)+") = "+f(base,1)+" g/d"),
    S("บวก proteinuria ถ้า >5 g/d", "+ "+pr+" = "+f(v,1)+" g/d"),
    S("ต่อ kg", f(v,1)+" / "+n(o.w)+" = "+f(v/o.w,2)+" g/kg/d")
  ], {gPerDay:v});
};
/* Bergström PNA for PD. o:{unaG (g/day urea N appearance = urine + dialysate), lossG (g/day dialysate + urine protein), v (L)} */
Calc.pdPNA = function(o){
  var pna = 15.1 + 6.95*o.unaG + (o.lossG||0), np = pna/(o.v/0.58);
  var out = res("nPNA (PD)", np, "g/kg/d", [
    S("PNA = 15.1 + 6.95 × UNA + protein losses", "15.1 + 6.95×"+n(o.unaG)+" + "+n(o.lossG||0)+" = "+f(pna,1)+" g/d"),
    S("nPNA = PNA / (V/0.58)", f(pna,1)+" / "+f(o.v/0.58,1)+" = "+f(np,2)+" g/kg/d")
  ], {pna:pna});
  out.flag = np<1.0 ? "flag" : "ok";
  return out;
};
/* IDPN per session. o:{aaG, dexG, lipidG, tMin, w, sessions:3} energy aa 4, dextrose 3.4, lipid 9 kcal/g */
Calc.idpn = function(o){
  var ns = o.sessions||3, kcal = o.aaG*4 + o.dexG*3.4 + (o.lipidG||0)*9, gir = o.dexG*1000/(o.w*o.tMin);
  var protDay = o.aaG*ns/7/o.w, kcalDay = kcal*ns/7/o.w;
  var out = res("IDPN energy ต่อครั้ง", kcal, "kcal", [
    S("Energy = AA×4 + dextrose×3.4 + lipid×9", n(o.aaG)+"×4 + "+n(o.dexG)+"×3.4 + "+n(o.lipidG||0)+"×9 = "+f(kcal,0)+" kcal"),
    S("Glucose infusion rate", n(o.dexG)+" g × 1000 / ("+n(o.w)+" kg × "+n(o.tMin)+" min) = "+f(gir,1)+" mg/kg/min"),
    S("เฉลี่ยต่อวัน ("+ns+" ครั้ง/สัปดาห์)", "protein "+f(protDay,2)+" g/kg/d และ energy "+f(kcalDay,1)+" kcal/kg/d")
  ], {gir:gir, protPerKgDay:protDay, kcalPerKgDay:kcalDay});
  out.flag = gir>5 ? "flag" : null;
  out.note = gir>5 ? "GIR >5 mg/kg/min เสี่ยง hyperglycemia ติดตาม glucose และพิจารณา insulin" : "IDPN ให้ได้เฉลี่ยราว "+f(protDay,2)+" g/kg/d เสริม oral intake";
  return out;
};
/* ---------------- stats ---------------- */
/* Diagnostic 2x2. o:{sens, spec, prev} (0-1) or {tp, fp, fn, tn}; n for display (default 1000) */
Calc.dx2x2 = function(o){
  var tp, fp, fn, tn, N = o.n||1000;
  if(o.tp!==undefined){ tp=o.tp; fp=o.fp; fn=o.fn; tn=o.tn; N = tp+fp+fn+tn; }
  else { var dis = N*o.prev; tp = dis*o.sens; fn = dis-tp; tn = (N-dis)*o.spec; fp = N-dis-tn; }
  var sens = tp/(tp+fn), spec = tn/(tn+fp), ppv = tp/(tp+fp), npv = tn/(tn+fn), prev = (tp+fn)/N;
  var lrp = sens/(1-spec), lrn = (1-sens)/spec;
  var out = res("PPV", ppv*100, "%", [
    S("2x2 (N "+f(N,0)+")", "TP "+f(tp,0)+", FP "+f(fp,0)+", FN "+f(fn,0)+", TN "+f(tn,0)),
    S("Sens = TP/(TP+FN), Spec = TN/(TN+FP)", pct(sens)+" และ "+pct(spec)),
    S("PPV = TP/(TP+FP)", f(tp,0)+"/("+f(tp,0)+" + "+f(fp,0)+") = "+pct(ppv)),
    S("NPV = TN/(TN+FN)", f(tn,0)+"/("+f(tn,0)+" + "+f(fn,0)+") = "+pct(npv)),
    S("LR+ = sens/(1 − spec), LR− = (1 − sens)/spec", f(lrp,2)+" และ "+f(lrn,2))
  ], {tp:tp, fp:fp, fn:fn, tn:tn, sens:sens, spec:spec, ppv:ppv, npv:npv, prev:prev, lrPos:lrp, lrNeg:lrn});
  out.note = "Prevalence "+pct(prev)+" ทำให้ PPV "+pct(ppv)+" (PPV ขึ้นกับ prevalence ส่วน sens และ spec ไม่ขึ้น)";
  return out;
};
/* Post-test probability. o:{pre (0-1), lr} */
Calc.postTest = function(o){
  var oddsPre = o.pre/(1-o.pre), oddsPost = oddsPre*o.lr, v = oddsPost/(1+oddsPost);
  return res("Post-test probability", v*100, "%", [
    S("Pre-test odds = p/(1 − p)", f(o.pre,3)+"/(1 − "+f(o.pre,3)+") = "+f(oddsPre,3)),
    S("Post-test odds = pre-test odds × LR", f(oddsPre,3)+" × "+f(o.lr,2)+" = "+f(oddsPost,3)),
    S("Probability = odds/(1 + odds)", f(oddsPost,3)+"/(1 + "+f(oddsPost,3)+") = "+pct(v))
  ]);
};
/* NNT. o:{cer, eer} event rates (0-1) */
Calc.nnt = function(o){
  var arr = o.cer-o.eer, rr = o.eer/o.cer, rrr = 1-rr, v = 1/arr;
  var out = res(arr>=0?"NNT":"NNH", Math.abs(v), "", [
    S("ARR = CER − EER", pct(o.cer)+" − "+pct(o.eer)+" = "+pct(arr)),
    S("RR = EER/CER, RRR = 1 − RR", f(rr,2)+" และ "+pct(rrr)),
    S((arr>=0?"NNT":"NNH")+" = 1/|ARR|", isFinite(v)?"1/"+f(Math.abs(arr),4)+" = "+f(Math.abs(v),1)+" → ปัดขึ้น "+Math.ceil(Math.abs(v)):"ARR = 0 จึงหาค่าไม่ได้ (∞)")
  ], {arr:arr*100, rr:rr, rrr:rrr*100, ceil:Math.ceil(Math.abs(v))});
  return out;
};

if(typeof module!=="undefined" && module.exports) module.exports = Calc;
})(typeof window!=="undefined" ? window : globalThis);
