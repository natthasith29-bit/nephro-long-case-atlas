/* core/nephron.js v1.3.0  CORE-02 Nephron transporter map
   ใช้ใน EL-05, EL-07, EL-09, EL-11, EL-14, EL-15, AKI-04, AKI-07, CKD-03, HT-04, MX-06, MX-11
   ทุกข้อความในภาพเป็นภาษาอังกฤษ (content rule 5)

   Data
     Nephron.SEG   [{id, name, zone, fNa, roles}]    ลำดับ PT, tDL, tAL, TAL, DCT, CNT, CCD, OMCD, IMCD
     Nephron.T     [{id, seg, side:"a"|"b"|"p", label, ions:[[ion, dir]], gene, drugs:[], dz:[], note}]
                   side a = apical, b = basolateral, p = paracellular  dir "in" = lumen → blood, "out" = blood → lumen
     Nephron.find(q)  ค้น transporter ตาม id, label, gene, drug หรือ disease (ไม่สนตัวพิมพ์) คืน array
     Nephron.bySeg(seg)  transporters ของ segment

   Map (ภาพ nephron ทั้งเส้น)
     var m = Nephron.map(container, {onSelect(segId), selected, flux:true|false, compact})
     m.select(segId)            เลือก segment (เส้นหนาขึ้น + outline)
     m.highlight([segId], color) เน้นหลาย segment (null = ล้าง)
     m.block([transporterId])   ใส่ป้าย ✕ สีแดงที่ segment ของ transporter ที่ถูกยับยั้ง (ยา, gene loss)
     m.gain([transporterId])    ป้าย ▲ สี teal สำหรับ gain-of-function
     m.setFlux({PT:65, TAL:25, ...}, {unit:"%", label:"Na"})  ลูกศรออกจากท่อหนาตามค่า (null = ซ่อน)
     m.setDelivery(fraction 0..1) ความหนาของท่อปลายน้ำตาม distal delivery (ภาพเท่านั้น)
     m.svg, m.selected()

   Cell (ภาพเซลล์ของ segment เดียว)
     var c = Nephron.cell(container, segId, {blocked:[], gain:[], highlight:[], flows:{id:multiplier}})
     c.update(segId, opts)
     v1.1.0: ion particles วิ่งผ่าน transporter แบบ real time (สีตามชนิด ion, จำนวนตาม stoichiometry, ความเร็วตาม flows,
       blocked = ion ติดค้างที่ membrane, gain = เร็วขึ้น) toolbar ▶/❚❚, Basic/Full (นศพ เห็นเฉพาะตัวหลัก fellow เห็นครบ + gene),
       legend ion, tooltip (gene, drug, disease) เมื่อแตะ transporter
       opts เพิ่ม (v1.2): focus:[ids] เน้นและวิ่งเฉพาะตัวที่เลือก ที่เหลือจาง, caption:"English text" แถบคำอธิบายล่างภาพ (2 บรรทัด), badges:{lumen,cell,blood} ป้ายค่า เช่น "Lumen +8 mV"
       opts เพิ่ม: animate (default true), level "basic"|"full" (default "full"), toolbar (default true เมื่อ container เป็น div), onPick(t)
       c.play(), c.pause(), c.setLevel(l)  reduced motion หรือ ?capture=1 แสดง ion นิ่งกลางทาง
     v1.3.0: side "e" = enzyme หรือ reaction (ไม่ใช่ channel) วาดเป็นแถวใต้ transporter
       rx:{lumen:{label,rx:[..],kind:"enzyme"|"buffer"}, cell:{label,rx:[..]}, link:{ion,text} (lumen → cell diffusion),
           up:{ion,text} (cell → apical), down:{ion,text} (cell → blood), fromBlood:{ion,text}}
       enzyme = hexagon สีเขียว (CA IV เกาะ brush border ด้าน lumen, CA II อยู่ใน cytosol) buffer = pill สีฟ้าในลูเมน
       blocked ใส่ ✕ ที่ hexagon และ ion ค้างกลางทาง  CA เดิมที่เคยวาดเป็น apical channel เปลี่ยนเป็น enzyme แล้ว
*/
(function(root){
"use strict";
var N = {version:"1.3.0"};
var NS = "http://www.w3.org/2000/svg";
var F = "IBM Plex Sans Thai, sans-serif", M = "Geist Mono, monospace";
var COL = {PT:"#5B4BFF", tDL:"#8C82FF", tAL:"#8C82FF", TAL:"#19C8E6", DCT:"#1F7A72", CNT:"#A8842C", CCD:"#C9862E", OMCD:"#C9862E", IMCD:"#C9862E", glom:"#B4232A"};

N.SEG = [
  {id:"PT",   name:"Proximal tubule",           zone:"cortex", fNa:65, roles:"Na 65%, HCO3 80–90%, glucose and amino acids ~100%, phosphate 80%, Ca 60–70%, K 65%, Mg 15–20%, water 65%, urate handling, organic anion/cation secretion, NH4+ genesis"},
  {id:"tDL",  name:"Thin descending limb",      zone:"medulla", fNa:0, roles:"Water reabsorption via AQP1, concentrates tubular fluid"},
  {id:"tAL",  name:"Thin ascending limb",       zone:"medulla", fNa:0, roles:"Passive NaCl exit, water impermeable"},
  {id:"TAL",  name:"Thick ascending limb",      zone:"medulla", fNa:25, roles:"Na 25%, K, Mg 60–70% and Ca 20% paracellular, diluting segment, countercurrent multiplier, macula densa (TGF), uromodulin"},
  {id:"DCT",  name:"Distal convoluted tubule",  zone:"cortex", fNa:6, roles:"Na 5–7% via NCC, Mg fine-tuning via TRPM6, active Ca reabsorption (TRPV5), WNK-regulated"},
  {id:"CNT",  name:"Connecting tubule",         zone:"cortex", fNa:2, roles:"ENaC and ROMK begin, Ca reabsorption, flow-dependent K secretion"},
  {id:"CCD",  name:"Cortical collecting duct",  zone:"cortex", fNa:2, roles:"Principal cell: ENaC, ROMK, AQP2 (aldosterone, vasopressin)  Intercalated cells: H+ secretion (α), HCO3 secretion via pendrin (β)"},
  {id:"OMCD", name:"Outer medullary CD",        zone:"medulla", fNa:0.5, roles:"α-intercalated H+ secretion, NH3 trapping, K reabsorption via H+/K+-ATPase"},
  {id:"IMCD", name:"Inner medullary CD",        zone:"medulla", fNa:0.5, roles:"Urea recycling via UT-A1, AQP2 water reabsorption, final urine concentration, ANP effect"}
];

function T(id,seg,side,label,ions,gene,drugs,dz,note){ return {id:id,seg:seg,side:side,label:label,ions:ions,gene:gene||"",drugs:drugs||[],dz:dz||[],note:note||""}; }
function E(id,seg,label,gene,drugs,dz,note,rx){ var t=T(id,seg,"e",label,[],gene,drugs,dz,note); t.rx=rx; return t; }
N.T = [
  /* PT */
  T("NHE3","PT","a","NHE3",[["Na+","in"],["H+","out"]],"SLC9A3",[],[],"Main apical Na entry, about 2/3 of proximal H secretion, also secretes NH4+ in place of H+"),
  T("HATP_PT","PT","a","H+-ATPase",[["H+","out"]],"ATP6V1B2",[],[],"About 1/3 of proximal H secretion"),
  T("SGLT2","PT","a","SGLT2",[["Na+","in"],["Glucose","in"]],"SLC5A2",["Empagliflozin","Dapagliflozin","Canagliflozin"],["Familial renal glycosuria"],"S1–S2, ~90% of filtered glucose, natriuresis activates TGF"),
  T("NaPi","PT","a","NaPi-IIa/IIc",[["Na+","in"],["HPO4","in"]],"SLC34A1/SLC34A3",[],["HHRH (SLC34A3)","Idiopathic infantile hypercalcemia (SLC34A1)"],"Down-regulated by PTH and FGF23"),
  E("CA","PT","Carbonic anhydrase","CA4/CA2",["Acetazolamide"],["CA II deficiency (mixed RTA + osteopetrosis)"],"Enzyme, not a channel: CA IV is anchored on the brush border facing the lumen, CA II is in the cytosol",
    {lumen:{label:"CA IV",rx:["H+ + HCO3 → H2CO3","→ CO2 + H2O"]},link:{ion:"CO2",text:"CO2 diffuses in"},cell:{label:"CA II",rx:["CO2 + H2O → H2CO3","→ H+ + HCO3"]},up:{ion:"H+",text:"H+ reused"},down:{ion:"HCO3",text:"HCO3 to NBCe1"}}),
  E("GLN","PT","Ammoniagenesis","GLS/GLUD1/PCK1",[],["Type 4 RTA (hyperK suppresses)"],"Glutamine → 2 NH4+ + 2 HCO3, rises in acidosis and hypoK, falls in hyperK",
    {cell:{label:"PDG",rx:["Gln → 2 NH4+ + α-KG","α-KG → 2 HCO3"]},fromBlood:{ion:"Glutamine",text:"Gln uptake"},up:{ion:"NH4+",text:"NH4+ via NHE3"},down:{ion:"HCO3",text:"New HCO3"}}),
  T("CFEX","PT","a","CFEX (SLC26A6)",[["Cl−","in"],["Anions","out"]],"SLC26A6",[],[],"Cl–oxalate/formate exchange, transcellular Cl uptake in late PT, oxalate secretion"),
  T("CLDN2","PT","p","Claudin-2",[["Na+","in"],["Ca2+","in"],["K+","in"]],"CLDN2",[],[],"Leaky tight junction: paracellular Na, Ca, K and water"),
  T("URAT1","PT","a","URAT1",[["Urate","in"]],"SLC22A12",["Lesinurad","Probenecid","Losartan"],["Renal hypouricemia type 1"],"Exercise-induced AKI in hypouricemia"),
  T("AA","PT","a","b0,+AT/rBAT",[["Cystine","in"],["Lys Arg Orn","in"]],"SLC3A1/SLC7A9",[],["Cystinuria"]),
  T("MEG","PT","a","Megalin/cubilin + ClC-5",[["LMW protein","in"]],"LRP2/CLCN5/OCRL",[],["Dent disease (CLCN5, OCRL)","Lowe syndrome (OCRL)"],"Endocytosis of filtered proteins"),
  T("AQP1","PT","a","AQP1",[["H2O","in"]],"AQP1",[],[]),
  T("OCT2","PT","b","OCT2",[["Creatinine","out"],["Cations","out"]],"SLC22A2",["Trimethoprim","Cimetidine","Dolutegravir","Cobicistat (apical MATE1)"],[],"Block of basolateral OCT2 or apical MATE1 raises serum creatinine without GFR change"),
  T("OAT","PT","b","OAT1/OAT3",[["Anions","out"]],"SLC22A6/A8",["Probenecid","Tenofovir (uptake)"],[],"Secretion of drugs and uremic toxins"),
  T("NBC","PT","b","NBCe1",[["Na+","in"],["3HCO3","in"]],"SLC4A4",[],["Proximal RTA with ocular abnormalities"]),
  T("GLUT2","PT","b","GLUT2",[["Glucose","in"]],"SLC2A2",[],["Fanconi–Bickel syndrome"]),
  T("NKA_PT","PT","b","Na/K-ATPase",[["3Na+","in"],["2K+","out"]],"ATP1A1",[],[]),
  /* tDL, tAL */
  T("AQP1d","tDL","a","AQP1",[["H2O","in"]],"AQP1",[],[]),
  T("ClCKa","tAL","b","ClC-Ka",[["Cl−","in"]],"CLCNKA",[],["Bartter type 4b (with ClC-Kb)"]),
  /* TAL */
  T("NKCC2","TAL","a","NKCC2",[["Na+","in"],["K+","in"],["2Cl−","in"]],"SLC12A1",["Furosemide","Bumetanide","Torsemide"],["Bartter type 1"],"Target of loop diuretics, NH4+ can take the K site"),
  T("NHE3_T","TAL","a","NHE3",[["Na+","in"],["H+","out"]],"SLC9A3",[],[],"Reclaims 10–15% of filtered HCO3"),
  T("ROMK_T","TAL","a","ROMK",[["K+","out"]],"KCNJ1",[],["Bartter type 2 (transient neonatal hyperkalemia)"],"K recycling creates lumen-positive voltage"),
  T("ClCKb","TAL","b","ClC-Kb + barttin",[["Cl−","in"]],"CLCNKB/BSND",[],["Bartter type 3 (CLCNKB)","Bartter type 4a with deafness (BSND)"]),
  T("CaSR","TAL","b","CaSR",[["Ca2+ sensor","in"]],"CASR",["Cinacalcet","Etelcalcetide"],["ADH1 (activating, Bartter-like if severe)","FHH1 (inactivating)"],"Activation inhibits ROMK and paracellular Ca/Mg"),
  T("CLDN","TAL","p","Claudin-16/19",[["Mg2+","in"],["Ca2+","in"]],"CLDN16/CLDN19",[],["FHHNC"],"Paracellular cation pathway driven by lumen-positive voltage"),
  T("UMOD","TAL","a","Uromodulin",[["(secreted)","out"]],"UMOD",[],["ADTKD-UMOD"]),
  T("NKA_T","TAL","b","Na/K-ATPase",[["3Na+","in"],["2K+","out"]],"ATP1A1",[],[]),
  /* DCT */
  T("NCC","DCT","a","NCC",[["Na+","in"],["Cl−","in"]],"SLC12A3",["Hydrochlorothiazide","Chlorthalidone","Indapamide"],["Gitelman syndrome"],"Thiazide target, regulated by WNK–SPAK"),
  T("WNK","DCT","a","WNK1/4, KLHL3, CUL3",[["(regulator)","in"]],"WNK1/WNK4/KLHL3/CUL3",["Tacrolimus (activates NCC)"],["Gordon syndrome (PHA2)"],"Gain of NCC activity → hypertension, hyperK, acidosis, low renin"),
  T("TRPM6","DCT","a","TRPM6",[["Mg2+","in"]],"TRPM6",["Omeprazole (long-term, intestinal TRPM6/7, urine Mg stays low)","Cetuximab via EGFR"],["Hypomagnesemia with secondary hypocalcemia"]),
  T("TRPV5","DCT","a","TRPV5",[["Ca2+","in"]],"TRPV5",[],[],"Thiazide increases Ca reabsorption here and in PT"),
  T("Kir41","DCT","b","Kir4.1/5.1",[["K+","in"]],"KCNJ10",[],["EAST/SeSAME syndrome"]),
  T("ClCKb_D","DCT","b","ClC-Kb",[["Cl−","in"]],"CLCNKB",[],["Bartter type 3 (Gitelman-like)"]),
  T("NCX1","DCT","b","NCX1 + PMCA",[["Ca2+","in"]],"SLC8A1",[],[]),
  T("NKA_D","DCT","b","Na/K-ATPase",[["3Na+","in"],["2K+","out"]],"ATP1A1",[],[],"FXYD2 (γ subunit) mutation causes isolated hypomagnesemia"),
  /* CNT and CCD principal */
  T("ENaC","CCD","a","ENaC",[["Na+","in"]],"SCNN1A/B/G",["Amiloride","Triamterene","Trimethoprim","Pentamidine"],["Liddle syndrome (gain)","PHA1 systemic (loss)"],"Lumen-negative voltage drives K and H secretion"),
  T("ROMK","CCD","a","ROMK + BK",[["K+","out"]],"KCNJ1/KCNMA1",[],[],"BK channels mediate flow-induced K secretion"),
  T("MR","CCD","b","MR (nuclear)",[["Aldosterone","in"]],"NR3C2",["Spironolactone","Eplerenone","Finerenone"],["PHA1 renal AD (loss)","Geller syndrome (MR S810L, pregnancy HT)"]),
  T("HSD2","CCD","b","11β-HSD2",[["Cortisol","in"]],"HSD11B2",["Liquorice (glycyrrhetinic acid)","Posaconazole","Itraconazole"],["Apparent mineralocorticoid excess"],"Protects MR from cortisol"),
  T("AQP2","CCD","a","AQP2",[["H2O","in"]],"AQP2",["Lithium (down-regulates)"],["Nephrogenic DI (AQP2, AR or AD)"]),
  T("V2R","CCD","b","V2R",[["Vasopressin","in"]],"AVPR2",["Tolvaptan","Desmopressin (agonist)"],["X-linked nephrogenic DI (loss)","NSIAD (gain)"]),
  T("AQP34","CCD","b","AQP3/AQP4",[["H2O","in"]],"AQP3/AQP4",[],[],"Basolateral water exit"),
  T("NKA_C","CCD","b","Na/K-ATPase",[["3Na+","in"],["2K+","out"]],"ATP1A1",["Digoxin"],[]),
  /* intercalated cells */
  T("HATP","OMCD","a","H+-ATPase (α-IC)",[["H+","out"]],"ATP6V1B1/ATP6V0A4",[],["dRTA with or without deafness"],"Also in CCD α-intercalated cells"),
  T("HKATP","OMCD","a","H+/K+-ATPase",[["H+","out"],["K+","in"]],"ATP4A/ATP12A",[],[],"K reabsorption in K depletion"),
  T("AE1","OMCD","b","AE1 (α-IC)",[["HCO3","in"],["Cl−","out"]],"SLC4A1",[],["dRTA AD/AR, Southeast Asian ovalocytosis"]),
  T("PDS","CCD","a","Pendrin (β-IC)",[["HCO3","out"],["Cl−","in"]],"SLC26A4",[],["Pendred syndrome"],"HCO3 secretion in metabolic alkalosis"),
  T("RHCG","OMCD","a","Rhcg",[["NH3","out"]],"RHCG",[],[],"NH3 trapping as NH4+"),
  T("RHBG","OMCD","b","Rhbg/Rhcg",[["NH3","out"]],"RHBG/RHCG",[],[],"Basolateral NH3 uptake from the medullary interstitium"),
  E("CA2_IC","OMCD","Carbonic anhydrase II","CA2",["Acetazolamide"],["CA II deficiency (mixed RTA + osteopetrosis)"],"Cytosolic enzyme: supplies H+ to the pumps and leaves one new HCO3 behind",
    {cell:{label:"CA II",rx:["CO2 + H2O → H2CO3","→ H+ + HCO3"]},up:{ion:"H+",text:"H+ to pumps"},down:{ion:"HCO3",text:"New HCO3 to AE1"}}),
  E("BUF","OMCD","Urine buffers","",[],[],"Free H+ is tiny at any urine pH, so H+ must be carried by NH3 (about 2/3) and phosphate (titratable acid, about 1/3)",
    {lumen:{label:"Buffers",kind:"buffer",rx:["NH3 + H+ → NH4+","HPO4 + H+ → H2PO4"]}}),
  /* IMCD */
  T("UTA1","IMCD","a","UT-A1",[["Urea","in"]],"SLC14A2",[],[],"Vasopressin-regulated urea recycling"),
  T("AQP2i","IMCD","a","AQP2",[["H2O","in"]],"AQP2",[],[])
];

N.bySeg = function(seg){ return N.T.filter(function(t){ return t.seg===seg || (seg==="CNT"&&(t.id==="ENaC"||t.id==="ROMK"||t.id==="TRPV5")); }); };
N.find = function(q){
  q=String(q||"").toLowerCase(); if(!q) return [];
  return N.T.filter(function(t){
    return t.id.toLowerCase()===q || t.label.toLowerCase().indexOf(q)>=0 || t.gene.toLowerCase().indexOf(q)>=0 ||
      t.drugs.some(function(d){ return d.toLowerCase().indexOf(q)>=0; }) || t.dz.some(function(d){ return d.toLowerCase().indexOf(q)>=0; });
  });
};
N.seg = function(id){ for(var i=0;i<N.SEG.length;i++) if(N.SEG[i].id===id) return N.SEG[i]; return null; };

function el(tag,a,p){ var e=document.createElementNS(NS,tag); for(var k in a){ if(k==="text") e.textContent=a[k]; else e.setAttribute(k,a[k]); } if(p) p.appendChild(e); return e; }
function holder(c){ if(typeof c==="string") c=document.getElementById(c); if(c.tagName&&c.tagName.toLowerCase()==="svg") return c; var s=el("svg",{}); c.appendChild(s); return s; }

/* ---------- geometry of the map (viewBox 520 x 560) ---------- */
var PATH = {
  PT:  "M118 92 C150 70 172 46 198 60 C226 76 214 104 188 112 C166 120 168 150 196 158 C222 166 222 196 212 214 L212 236",
  tDL: "M212 236 L218 466",
  tAL: "M218 466 C222 494 256 494 260 466 L262 392",
  TAL: "M262 392 L268 150",
  DCT: "M268 150 C278 116 312 136 322 108 C330 86 352 76 370 86",
  CNT: "M370 86 C390 96 404 98 420 104",
  CCD: "M420 104 L424 226",
  OMCD:"M424 226 L428 404",
  IMCD:"M428 404 L432 540"
};
var MID = {PT:[196,160],tDL:[215,350],tAL:[240,486],TAL:[265,270],DCT:[322,110],CNT:[396,97],CCD:[422,165],OMCD:[426,315],IMCD:[430,472]};
var OUT = {PT:[-1,0],tDL:[-1,0],tAL:[0,1],TAL:[1,0],DCT:[0,-1],CNT:[0,-1],CCD:[1,0],OMCD:[1,0],IMCD:[1,0]};

N.map = function(container, opts){
  opts=opts||{};
  var svg=holder(container);
  svg.setAttribute("viewBox","0 0 520 560"); svg.setAttribute("role","group"); svg.setAttribute("aria-label","Nephron segments, select a segment");
  svg.style.width="100%"; svg.style.height="auto"; svg.style.display="block";
  while(svg.firstChild) svg.removeChild(svg.firstChild);
  el("rect",{x:0,y:0,width:520,height:226,fill:"#FAFAFC"},svg);
  el("rect",{x:0,y:226,width:520,height:178,fill:"#F4F2FB"},svg);
  el("rect",{x:0,y:404,width:520,height:156,fill:"#EEEBF8"},svg);
  [["Cortex",20],["Outer medulla",244],["Inner medulla",422]].forEach(function(z){ el("text",{x:12,y:z[1],"font-size":12,fill:"#9A9CB2","font-family":F,text:z[0]},svg); });
  /* glomerulus */
  el("circle",{cx:90,cy:96,r:30,fill:"#FFF",stroke:"#D3D5E2","stroke-width":2},svg);
  for(var i=0;i<7;i++) el("circle",{cx:90+Math.cos(i)*13,cy:96+Math.sin(i*1.3)*12,r:7,fill:"none",stroke:COL.glom,"stroke-width":2.2,opacity:0.7},svg);
  el("text",{x:90,y:146,"text-anchor":"middle","font-size":11.5,fill:"#5E6075","font-family":F,text:"Glomerulus"},svg);
  var gFlux=el("g",{},svg), gSeg=el("g",{},svg), gBadge=el("g",{},svg), gLbl=el("g",{},svg);
  var nodes={}, sel=opts.selected||null, delivery=1;
  N.SEG.forEach(function(s){
    var g=el("g",{tabindex:0,role:"button","aria-label":s.name,style:"cursor:pointer;outline:none"},gSeg);
    var hit=el("path",{d:PATH[s.id],fill:"none",stroke:"transparent","stroke-width":26,"stroke-linecap":"round"},g);
    var ring=el("path",{d:PATH[s.id],fill:"none",stroke:"#0B0B1F","stroke-width":0,"stroke-linecap":"round",opacity:0.9},g);
    var p=el("path",{d:PATH[s.id],fill:"none",stroke:COL[s.id],"stroke-width":s.id[0]==="t"?7:11,"stroke-linecap":"round"},g);
    function pick(){ select(s.id); if(opts.onSelect) opts.onSelect(s.id); }
    g.addEventListener("click",pick);
    g.addEventListener("keydown",function(e){ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); pick(); } });
    g.addEventListener("focus",function(){ ring.setAttribute("stroke","#FFDE59"); ring.setAttribute("stroke-width",(s.id[0]==="t"?7:11)+8); });
    g.addEventListener("blur",function(){ paint(); });
    nodes[s.id]={g:g,p:p,ring:ring,base:s.id[0]==="t"?7:11};
  });
  var LBL={PT:[150,186,"PT"],tDL:[190,360,"tDL"],tAL:[226,512,"tAL"],TAL:[282,300,"TAL"],DCT:[300,92,"DCT"],CNT:[386,78,"CNT"],CCD:[408,170,"CCD"],OMCD:[412,320,"OMCD"],IMCD:[416,480,"IMCD"]};
  Object.keys(LBL).forEach(function(k){ var l=LBL[k]; el("text",{x:l[0],y:l[1],"text-anchor":/CD$/.test(k)?"end":"start","font-size":12.5,"font-weight":600,fill:"#0B0B1F","font-family":F,text:l[2],"pointer-events":"none"},gLbl); });
  el("circle",{cx:268,cy:156,r:5,fill:"#0B0B1F"},gLbl);
  el("text",{x:280,y:176,"font-size":10.5,fill:"#5E6075","font-family":F,text:"macula densa","pointer-events":"none"},gLbl);
  var hl={};
  function paint(){
    N.SEG.forEach(function(s){ var n=nodes[s.id], on=s.id===sel, w=n.base*(["DCT","CNT","CCD","OMCD","IMCD"].indexOf(s.id)>=0?(0.55+0.45*delivery):1);
      n.p.setAttribute("stroke-width",on?w+3:w); n.ring.setAttribute("stroke",hl[s.id]||"#0B0B1F"); n.ring.setAttribute("stroke-width",on?w+9:(hl[s.id]?w+7:0));
      n.g.setAttribute("aria-pressed",on?"true":"false"); });
  }
  function select(id){ sel=id; paint(); }
  function badges(ids,kind){
    var segs={}; ids.forEach(function(id){ var t=N.T.filter(function(x){ return x.id===id; })[0]; if(t) segs[t.id==="ENaC"||t.id==="ROMK"?"CCD":t.seg]=1; });
    Object.keys(segs).forEach(function(s){ var m=MID[s], o=OUT[s], x=m[0]-o[0]*24, y=m[1]-o[1]*24-(o[0]!==0?24:0);
      el("circle",{cx:x,cy:y,r:10,fill:kind==="gain"?"#1F7A72":"#B4232A",stroke:"#fff","stroke-width":2,"class":"nb-"+kind},gBadge);
      el("text",{x:x,y:y+4.5,"text-anchor":"middle","font-size":12,"font-weight":700,fill:"#fff","font-family":M,text:kind==="gain"?"▲":"✕","class":"nb-"+kind},gBadge); });
  }
  function clearKind(kind){ Array.prototype.slice.call(gBadge.querySelectorAll(".nb-"+kind)).forEach(function(e){ gBadge.removeChild(e); }); }
  var api={svg:svg,
    select:function(id){ select(id); return api; },
    selected:function(){ return sel; },
    highlight:function(ids,color){ hl={}; (ids||[]).forEach(function(id){ hl[id]=color||"#FFDE59"; }); paint(); return api; },
    block:function(ids){ clearKind("block"); if(ids&&ids.length) badges(ids,"block"); return api; },
    gain:function(ids){ clearKind("gain"); if(ids&&ids.length) badges(ids,"gain"); return api; },
    setDelivery:function(f){ delivery=Math.max(0,Math.min(1.5,f)); paint(); return api; },
    setFlux:function(vals,o){
      while(gFlux.firstChild) gFlux.removeChild(gFlux.firstChild);
      if(!vals) return api; o=o||{};
      Object.keys(vals).forEach(function(s){ var v=vals[s]; if(v==null||!MID[s]) return;
        var m=MID[s], d=OUT[s], len=26+Math.min(40,Math.abs(v)*0.6), w=Math.max(2,Math.min(16,Math.abs(v)*0.22));
        var x1=m[0]+d[0]*12, y1=m[1]+d[1]*12, x2=m[0]+d[0]*len, y2=m[1]+d[1]*len;
        el("line",{x1:x1,y1:y1,x2:x2,y2:y2,stroke:o.color||"#5B4BFF","stroke-width":w,opacity:0.45,"stroke-linecap":"round"},gFlux);
        el("text",{x:x2+d[0]*6+(d[0]===0?0:0),y:y2+d[1]*12+4,"text-anchor":d[0]<0?"end":d[0]>0?"start":"middle","font-size":12,"font-weight":600,fill:o.color||"#5B4BFF","font-family":M,text:(Math.round(v*10)/10)+(o.unit===undefined?"%":o.unit)},gFlux); });
      if(o.label) el("text",{x:508,y:20,"text-anchor":"end","font-size":12,fill:o.color||"#5B4BFF","font-family":F,text:o.label},gFlux);
      return api; }
  };
  if(opts.flux) api.setFlux(N.SEG.reduce(function(a,s){ if(s.fNa) a[s.id]=s.fNa; return a; },{}),{label:"Fraction of filtered Na reabsorbed"});
  paint();
  return api;
};

/* ---------- cell view (viewBox 600 x H) with live ion particles ---------- */
var ION={
  "Na+":{c:"#F2A900",g:"Na",tc:"#2B2100"},"K+":{c:"#8E5BD9",g:"K"},"Cl−":{c:"#2FA36B",g:"Cl"},"H+":{c:"#E5484D",g:"H"},
  "HCO3":{c:"#2D7FF9",g:"HCO3",r:9},"Ca2+":{c:"#F07B2C",g:"Ca"},"Mg2+":{c:"#12A6A0",g:"Mg"},"Glucose":{c:"#C9A227",g:"Glu",tc:"#2B2100"},
  "H2O":{c:"#7BC3EA",g:"H2O",tc:"#0B2B3F"},"HPO4":{c:"#B05B8C",g:"P"},"Urate":{c:"#9C7A54",g:"Ur"},"NH3":{c:"#6E7F2E",g:"NH3",r:9},
  "Urea":{c:"#8A8FA8",g:"Urea",r:9},"Creatinine":{c:"#6B6F86",g:"Cr"},"Cations":{c:"#6B6F86",g:"OC+"},"Anions":{c:"#6B6F86",g:"OA−"},
  "Cystine":{c:"#A0522D",g:"Cys"},"CO2":{c:"#7C8798",g:"CO2",r:9},"NH4+":{c:"#4E7A1F",g:"NH4",r:9},"Glutamine":{c:"#B07A2A",g:"Gln"},"Lys Arg Orn":{c:"#A0522D",g:"AA"},"LMW protein":{c:"#7D5BA6",g:"Pr"}
};
function parseIon(s){ var m=/^(\d)(.+)$/.exec(s), n=1, name=s; if(m&&ION[m[2]]){ n=+m[1]; name=m[2]; } return ION[name]?{n:n,name:name,k:ION[name]}:null; }
var BASIC={PT:["NHE3","SGLT2","AQP1","NKA_PT","NBC","CA"],TAL:["NKCC2","ROMK_T","ClCKb","NKA_T","CLDN"],DCT:["NCC","TRPV5","NKA_D","ClCKb_D","NCX1"],CNT:["ENaC","ROMK","TRPV5"],CCD:["ENaC","ROMK","NKA_C","AQP2","PDS"],OMCD:["HATP","AE1","HKATP","CA2_IC"],IMCD:["UTA1","AQP2i"]};
var CELLCSS=".nc-bar{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin:0 0 6px;font-size:12px}.nc-bar button{border:1px solid var(--line-strong,#D3D5E2);background:var(--card,#fff);border-radius:999px;height:26px;padding:0 10px;font:inherit;cursor:pointer;color:var(--ink,#0B0B1F)}"+
".nc-bar button[aria-pressed=true]{background:var(--ink,#0B0B1F);color:#fff;border-color:var(--ink,#0B0B1F)}.nc-leg{display:flex;flex-wrap:wrap;gap:4px 8px;margin-left:auto}.nc-leg span{display:inline-flex;align-items:center;gap:4px;font-family:var(--mono,monospace);font-size:11px;color:var(--muted,#5E6075)}"+
".nc-leg i{width:10px;height:10px;border-radius:50%;display:inline-block}body.capture .nc-bar button{display:none}.nc-tip{font-size:12.5px;margin-top:6px;padding:8px 10px;border-radius:10px;background:var(--canvas,#F4F5F9);display:none}.nc-tip.on{display:block}body.present .nc-tip{display:none!important}";
N.cell = function(container, segId, opts){
  if(typeof container==="string") container=document.getElementById(container);
  var isSvg=container.tagName&&container.tagName.toLowerCase()==="svg";
  var wantBar=!isSvg&&(!opts||opts.toolbar!==false)&&typeof document!=="undefined";
  var bar=null, btnPlay=null, btnLv={}, leg=null, tip=null;
  if(wantBar){
    if(!document.getElementById("nc-css")){ var st=document.createElement("style"); st.id="nc-css"; st.textContent=CELLCSS; document.head.appendChild(st); }
    bar=document.createElement("div"); bar.className="nc-bar";
    btnPlay=document.createElement("button"); btnPlay.type="button"; btnPlay.setAttribute("aria-label","Play or pause ion flow"); bar.appendChild(btnPlay);
    (opts&&opts.levelButtons===false?[]:["basic","full"]).forEach(function(l){ var b=document.createElement("button"); b.type="button"; b.textContent=l==="basic"?"Basic":"Full"; b.title=l==="basic"?"เฉพาะ transporter หลัก (นศพ)":"ครบทุกตัว + gene (resident/fellow)"; b.addEventListener("click",function(){ api.setLevel(l); }); bar.appendChild(b); btnLv[l]=b; });
    leg=document.createElement("div"); leg.className="nc-leg"; bar.appendChild(leg);
    container.appendChild(bar);
  }
  var svg=holder(container);
  svg.style.width="100%"; svg.style.height="auto"; svg.style.display="block";
  if(wantBar){ tip=document.createElement("div"); tip.className="nc-tip"; container.appendChild(tip); }
  var reduce=typeof window!=="undefined"&&window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var still=reduce||(typeof location!=="undefined"&&/capture=1/.test(location.search));
  var cur={seg:segId,o:opts||{}}, level=(opts&&opts.level)||"full", running=!(opts&&opts.animate===false)&&!still;
  var streams=[], parts=[], gP=null, raf=null, last=null, clock=0, visible=true;
  function draw(seg, o){
    o=o||{}; cur={seg:seg,o:o};
    var blocked=o.blocked||[], gain=o.gain||[], hi=o.highlight||[], flows=o.flows||{}, focus=o.focus||[];
    var dim=function(id){ return focus.length&&focus.indexOf(id)<0; };
    while(svg.firstChild) svg.removeChild(svg.firstChild);
    streams=[]; parts=[];
    var list=N.bySeg(seg);
    if(level==="basic"&&BASIC[seg]){ var keep=BASIC[seg].concat(blocked,gain,hi,focus); list=list.filter(function(t){ return keep.indexOf(t.id)>=0; }); }
    var ap=list.filter(function(t){ return t.side==="a"; }), bl=list.filter(function(t){ return t.side==="b"; }), pa=list.filter(function(t){ return t.side==="p"; }), ev=list.filter(function(t){ return t.side==="e"; });
    var rows=Math.max(ap.length,bl.length,2), capH=o.caption?52:0, top=o.badges?18:0, eH=ev.length?ev.length*64+6:0, H=Math.max(240,70+top+rows*44+(pa.length?40:0)+eH)+capH;
    svg.setAttribute("viewBox","0 0 600 "+H); svg.setAttribute("role","img");
    var s=N.seg(seg); svg.setAttribute("aria-label",(s?s.name:seg)+" cell transport with moving ions");
    el("rect",{x:0,y:0,width:150,height:H,fill:"#EEF6FB"},svg);
    el("rect",{x:150,y:0,width:300,height:H,fill:"#FBFBFE"},svg);
    el("rect",{x:450,y:0,width:150,height:H,fill:"#FBEDEE"},svg);
    el("line",{x1:150,y1:0,x2:150,y2:H,stroke:"#5E6075","stroke-width":2},svg);
    el("line",{x1:450,y1:0,x2:450,y2:H,stroke:"#5E6075","stroke-width":2},svg);
    el("text",{x:14,y:22,"font-size":12,"font-weight":600,fill:"#3E7891","font-family":F,text:"Lumen"},svg);
    el("text",{x:586,y:22,"text-anchor":"end","font-size":12,"font-weight":600,fill:"#9A3A40","font-family":F,text:"Blood"},svg);
    el("text",{x:300,y:22,"text-anchor":"middle","font-size":13,"font-weight":600,fill:"#0B0B1F","font-family":F,text:(s?s.name:seg)},svg);
    var used={};
    function tr(t,x,y,apical){
      var off=blocked.indexOf(t.id)>=0, up=gain.indexOf(t.id)>=0, hot=hi.indexOf(t.id)>=0, mult=flows[t.id]===undefined?1:flows[t.id];
      var dm=dim(t.id), g=el("g",{opacity:dm?0.18:off?0.55:1,style:"cursor:pointer"},svg);
      el("title",{text:t.label+(t.gene?" ("+t.gene+")":"")+(t.drugs.length?"\nDrugs: "+t.drugs.join(", "):"")+(t.dz.length?"\nDisease: "+t.dz.join(", "):"")+(t.note?"\n"+t.note:"")},g);
      el("ellipse",{cx:x,cy:y,rx:16,ry:13,fill:hot||(focus.length&&!dm)?"#FFF3B0":"#FFFFFF",stroke:off?"#B4232A":up?"#1F7A72":"#5B4BFF","stroke-width":hot||up||off?3:2},g);
      var lx=apical?x+24:x-24, anchor=apical?"start":"end";
      el("text",{x:lx,y:level==="basic"?y+4:y-3,"text-anchor":anchor,"font-size":12,"font-weight":600,fill:"#0B0B1F","font-family":F,text:t.label},g);
      if(level!=="basic") el("text",{x:lx,y:y+12,"text-anchor":anchor,"font-size":10.5,fill:"#5E6075","font-family":M,text:t.gene.length>18?t.gene.slice(0,18)+"…":t.gene},g);
      var ions=[];
      t.ions.forEach(function(io,i){
        var dirIn=io[1]==="in", yy=y-8+i*12, len=34*Math.max(0.3,Math.min(1.8,mult)), w=off?1:(1.2+Math.min(2,mult*0.8));
        var xs, xe; if(apical){ xs=dirIn?x-18-len:x-18; xe=dirIn?x-18:x-18-len; } else { xs=dirIn?x+18:x+18+len; xe=dirIn?x+18+len:x+18; }
        el("line",{x1:xs,y1:yy,x2:xe,y2:yy,stroke:off?"#B4232A":"#9A9CB2","stroke-width":w},g);
        el("path",{d:"M"+xe+" "+yy+" l"+(xe>xs?-6:6)+" -3.5 l0 7 z",fill:off?"#B4232A":"#9A9CB2"},g);
        el("text",{x:apical?Math.min(xs,xe)-4:Math.max(xs,xe)+4,y:yy+4,"text-anchor":apical?"end":"start","font-size":11,fill:"#0B0B1F","font-family":M,text:io[0]},g);
        var pi=parseIon(io[0]); if(pi){ used[pi.name]=pi.k;
          /* path: dir in = left→right */
          var x0, x1; if(apical){ x0=x-78; x1=x+58; } else { x0=x-58; x1=x+78; }
          if(!dirIn){ var tmp=x0; x0=x1; x1=tmp; }
          ions.push({pi:pi,y:yy,x0:x0,x1:x1,xm:x}); }
      });
      if(off){ el("line",{x1:x-12,y1:y-12,x2:x+12,y2:y+12,stroke:"#B4232A","stroke-width":3},g); el("line",{x1:x+12,y1:y-12,x2:x-12,y2:y+12,stroke:"#B4232A","stroke-width":3},g); }
      if(up) el("text",{x:x,y:y+4,"text-anchor":"middle","font-size":12,"font-weight":700,fill:"#1F7A72","font-family":M,text:"▲"},g);
      if(ions.length&&!dm){ var rate=off?0.35:Math.max(0.15,Math.min(3,mult))*(up?2:1); streams.push({ions:ions,period:2.2/rate,phase:Math.random()*2,off:off,next:0}); }
      g.addEventListener("click",function(){ if(cur.o.onPick) cur.o.onPick(t); if(tip){ tip.className="nc-tip on"; tip.innerHTML="<b>"+t.label+"</b>"+(t.gene?" <span style='font-family:var(--mono,monospace);color:var(--muted)'>"+t.gene+"</span>":"")+(t.note?"<br>"+t.note:"")+(t.drugs.length?"<br>ยา: "+t.drugs.join(", "):"")+(t.dz.length?"<br>โรค: "+t.dz.join(", "):""); } });
    }
    ap.forEach(function(t,i){ tr(t,150,60+top+i*44,true); });
    bl.forEach(function(t,i){ tr(t,450,60+top+i*44,false); });
    /* enzyme and reaction rows (v1.3) */
    function rxRow(t,y){
      var R=t.rx||{}, off=blocked.indexOf(t.id)>=0, dm=dim(t.id), hot=hi.indexOf(t.id)>=0||(focus.length&&!dm), mult=flows[t.id]===undefined?1:flows[t.id];
      var g=el("g",{opacity:dm?0.18:1,style:"cursor:pointer"},svg), col=off?"#B4232A":"#2FA36B", fillE=hot?"#FFF3B0":"#EAF6EE";
      el("title",{text:t.label+(t.gene?" ("+t.gene+")":"")+(t.drugs.length?"\nDrugs: "+t.drugs.join(", "):"")+(t.dz.length?"\nDisease: "+t.dz.join(", "):"")+(t.note?"\n"+t.note:"")},g);
      function hex(cx,w,label){ var h=24, a=8;
        el("path",{d:"M"+(cx-w/2)+" "+y+" L"+(cx-w/2+a)+" "+(y-h/2)+" L"+(cx+w/2-a)+" "+(y-h/2)+" L"+(cx+w/2)+" "+y+" L"+(cx+w/2-a)+" "+(y+h/2)+" L"+(cx-w/2+a)+" "+(y+h/2)+" Z",fill:fillE,stroke:col,"stroke-width":hot||off?2.6:1.8},g);
        el("text",{x:cx,y:y+4,"text-anchor":"middle","font-size":11,"font-weight":700,fill:"#14532D","font-family":F,text:label},g);
        if(off){ el("line",{x1:cx-9,y1:y-9,x2:cx+9,y2:y+9,stroke:"#B4232A","stroke-width":2.6},g); el("line",{x1:cx+9,y1:y-9,x2:cx-9,y2:y+9,stroke:"#B4232A","stroke-width":2.6},g); } }
      function rxText(cx,lines){ (lines||[]).forEach(function(l,k){ el("text",{x:cx,y:y+25+k*11,"text-anchor":"middle","font-size":9.5,fill:"#3E5566","font-family":M,text:l},g); }); }
      function arrow(x1,yy,x2,label,lx,ly,dash){ el("line",{x1:x1,y1:yy,x2:x2,y2:yy,stroke:off?"#B4232A":"#9A9CB2","stroke-width":1.4,"stroke-dasharray":dash?"4 3":"none"},g);
        el("path",{d:"M"+x2+" "+yy+" l"+(x2>x1?-6:6)+" -3.5 l0 7 z",fill:off?"#B4232A":"#9A9CB2"},g);
        if(label) el("text",{x:lx,y:ly,"text-anchor":"middle","font-size":9.5,fill:"#5E6075","font-family":F,text:label},g); }
      if(R.lumen){ if(R.lumen.kind==="buffer"){ el("rect",{x:27,y:y-12,width:96,height:24,rx:12,fill:hot?"#FFF3B0":"#E6F0FC",stroke:"#2D7FF9","stroke-width":1.6},g); el("text",{x:75,y:y+4,"text-anchor":"middle","font-size":11,"font-weight":700,fill:"#123B6B","font-family":F,text:R.lumen.label},g); rxText(75,R.lumen.rx); }
        else { el("line",{x1:134,y1:y,x2:150,y2:y,stroke:col,"stroke-width":2},g); hex(111,46,R.lumen.label); rxText(72,R.lumen.rx); } }
      if(R.cell){ hex(300,52,R.cell.label); rxText(300,R.cell.rx); }
      var s1=[], s2=[], ph=Math.random()*1.5;
      function ion(name,yy,x0,x1){ var pi=parseIon(name); if(!pi) return null; used[pi.name]=pi.k; return {pi:pi,y:yy,x0:x0,x1:x1,xm:(x0+x1)/2}; }
      if(R.link){ arrow(136,y,272,R.link.text,204,y+13,true); var a1=ion(R.link.ion,y,104,280); if(a1) s1.push(a1); }
      if(R.fromBlood){ arrow(444,y-14,328,R.fromBlood.text,386,y-19,false); var a2=ion(R.fromBlood.ion,y-14,470,304); if(a2) s1.push(a2); }
      if(R.up){ arrow(274,y-14,156,R.up.text,215,y-19,false); var a3=ion(R.up.ion,y-14,296,150); if(a3) s2.push(a3); }
      if(R.down){ arrow(328,y,444,R.down.text,386,y-6,false); var a4=ion(R.down.ion,y,304,470); if(a4) s2.push(a4); }
      if(!dm){ var rate=off?0.35:Math.max(0.15,Math.min(3,mult));
        if(s1.length) streams.push({ions:s1,period:2.6/rate,phase:ph,off:off,next:0});
        if(s2.length) streams.push({ions:s2,period:2.6/rate,phase:ph+(s1.length?1.1:0),off:off,next:0}); }
      g.addEventListener("click",function(){ if(cur.o.onPick) cur.o.onPick(t); if(tip){ tip.className="nc-tip on"; tip.innerHTML="<b>"+t.label+"</b>"+(t.gene?" <span style='font-family:var(--mono,monospace);color:var(--muted)'>"+t.gene+"</span>":"")+(t.note?"<br>"+t.note:"")+(t.drugs.length?"<br>ยา: "+t.drugs.join(", "):"")+(t.dz.length?"<br>โรค: "+t.dz.join(", "):""); } });
    }
    ev.forEach(function(t,i){ rxRow(t,60+top+rows*44+22+i*64); });
    if(o.badges){ [["lumen",75],["cell",300],["blood",525]].forEach(function(b){ var tx=o.badges[b[0]]; if(!tx) return; var w=tx.length*6.4+16;
      el("rect",{x:b[1]-w/2,y:30,width:w,height:18,rx:9,fill:b[0]==="lumen"?"#D9ECF6":b[0]==="blood"?"#F6DCDE":"#ECEBFF"},svg);
      el("text",{x:b[1],y:43,"text-anchor":"middle","font-size":11,"font-weight":600,fill:"#0B0B1F","font-family":M,text:tx},svg); }); }
    if(o.caption){ var cy=H-capH; el("rect",{x:0,y:cy,width:600,height:capH,fill:"#0B0B1F"},svg);
      var words=String(o.caption).split(" "), lines=[""]; words.forEach(function(w){ if((lines[lines.length-1]+" "+w).length>76&&lines.length<2) lines.push(w); else lines[lines.length-1]=(lines[lines.length-1]?lines[lines.length-1]+" ":"")+w; });
      lines.forEach(function(l,i){ el("text",{x:300,y:cy+(lines.length===1?31:21+i*18),"text-anchor":"middle","font-size":13,"font-weight":600,fill:"#FFFFFF","font-family":F,text:l},svg); }); }
    if(pa.length){ var y=H-capH-28; el("line",{x1:150,y1:y,x2:450,y2:y,stroke:"#D3D5E2","stroke-width":8},svg);
      pa.forEach(function(t){ var off=blocked.indexOf(t.id)>=0; if(dim(t.id)) el("rect",{x:150,y:y-26,width:300,height:34,fill:"#FBFBFE",opacity:0.75},svg); el("text",{x:300,y:y-12,opacity:dim(t.id)?0.25:1,"text-anchor":"middle","font-size":11.5,fill:off?"#B4232A":"#5E6075","font-family":F,text:t.label+" (paracellular): "+t.ions.map(function(i){ return i[0]; }).join(" ")+(off?"  ✕":"")},svg);
        var pop=dim(t.id)?0.2:1; el("path",{d:"M154 "+y+" L446 "+y,stroke:off?"#B4232A":"#1F7A72","stroke-width":2,"stroke-dasharray":off?"3 5":"none",opacity:pop},svg); el("path",{d:"M446 "+y+" l-7 -4 l0 8 z",fill:off?"#B4232A":"#1F7A72",opacity:pop},svg);
        var ions=[]; t.ions.forEach(function(io,i){ var pi=parseIon(io[0]); if(pi){ used[pi.name]=pi.k; ions.push({pi:pi,y:y,x0:110+i*14,x1:490,xm:300,para:true}); } });
        if(ions.length&&!dim(t.id)){ var mult=flows[t.id]===undefined?1:flows[t.id]; streams.push({ions:ions,period:2.6/Math.max(0.15,mult),phase:Math.random()*2,off:off,next:0}); } }); }
    if(!list.length) el("text",{x:300,y:H/2,"text-anchor":"middle","font-size":12,fill:"#9A9CB2","font-family":F,text:"No major transporters listed"},svg);
    gP=el("g",{"pointer-events":"none"},svg);
    if(leg){ leg.innerHTML=""; Object.keys(used).forEach(function(n){ var sp=document.createElement("span"); var i=document.createElement("i"); i.style.background=used[n].c; sp.appendChild(i); sp.appendChild(document.createTextNode(n)); leg.appendChild(sp); }); }
    if(bar&&btnLv.basic){ btnLv.basic.setAttribute("aria-pressed",level==="basic"?"true":"false"); btnLv.full.setAttribute("aria-pressed",level==="full"?"true":"false"); }
    if(btnPlay) btnPlay.textContent=running?"❚❚ Ion flow":"▶ Ion flow";
    if(tip) tip.className="nc-tip";
    clock=0; streams.forEach(function(st){ st.next=st.phase; });
    if(!running) snapshot();
  }
  function spawn(st){
    st.ions.forEach(function(io){
      for(var j=0;j<Math.min(io.pi.n,3);j++){
        var r=io.pi.k.r||7.5, g=el("g",{},gP);
        el("circle",{r:r,fill:io.pi.k.c,stroke:"#fff","stroke-width":1.2},g);
        var gl=io.pi.k.g; el("text",{"text-anchor":"middle",y:2.6,"font-size":gl.length>2?5.6:7.2,"font-weight":700,fill:io.pi.k.tc||"#fff","font-family":M,text:gl},g);
        var dir=io.x1>io.x0?1:-1;
        parts.push({g:g,x0:io.x0-dir*j*13,x1:io.x1,xm:io.xm,y:io.y+(io.para?(j-1)*4:0),t:0,dur:io.para?3.2:1.9,stuck:st.off,seed:Math.random()*6});
      }
    });
  }
  function place(p){
    var u=p.t/p.dur, x, op=1;
    if(p.stuck){ var dir=p.x1>p.x0?1:-1, stop=p.xm-dir*20; x=p.x0+(stop-p.x0)*Math.min(1,u*1.6); if(u*1.6>1) x+=Math.sin((p.t+p.seed)*14)*2.5; op=u<0.1?u/0.1:u>0.8?Math.max(0,(1-u)/0.2):1; }
    else { x=p.x0+(p.x1-p.x0)*u; op=u<0.12?u/0.12:u>0.85?Math.max(0,(1-u)/0.15):1; }
    p.g.setAttribute("transform","translate("+x.toFixed(1)+" "+p.y.toFixed(1)+")"); p.g.setAttribute("opacity",op.toFixed(2));
  }
  function step(dt){
    clock+=dt;
    streams.forEach(function(st){ while(clock>=st.next){ spawn(st); st.next+=st.period; } });
    for(var i=parts.length-1;i>=0;i--){ var p=parts[i]; p.t+=dt; if(p.t>=p.dur){ p.g.remove(); parts.splice(i,1); } else place(p); }
  }
  function snapshot(){ /* static frame: ion อยู่กลางทาง ใช้กับ capture และ reduced motion */
    while(gP.firstChild) gP.removeChild(gP.firstChild); parts=[];
    streams.forEach(function(st){ spawn(st); });
    parts.forEach(function(p){ p.t=p.dur*(p.stuck?0.55:0.45); place(p); });
  }
  function loop(ts){ if(!running) return; if(last===null) last=ts; var dt=Math.min(0.1,(ts-last)/1000); last=ts; if(visible) step(dt); raf=requestAnimationFrame(loop); }
  function start(){ if(still) return; running=true; last=null; cancelAnimationFrame(raf); raf=requestAnimationFrame(loop); if(btnPlay) btnPlay.textContent="❚❚ Ion flow"; }
  function stop(){ running=false; cancelAnimationFrame(raf); if(btnPlay) btnPlay.textContent="▶ Ion flow"; }
  if(btnPlay) btnPlay.addEventListener("click",function(){ running?stop():start(); });
  if(typeof IntersectionObserver!=="undefined") new IntersectionObserver(function(e){ visible=e[0].isIntersecting; }).observe(svg);
  if(typeof document!=="undefined") document.addEventListener("visibilitychange",function(){ if(document.hidden) last=null; });
  var api={svg:svg,
    update:function(seg,o){ draw(seg,o); return api; },
    play:function(){ start(); return api; }, pause:function(){ stop(); return api; },
    setLevel:function(l){ level=l; draw(cur.seg,cur.o); return api; }, level:function(){ return level; }};
  draw(segId, opts);
  if(running) start();
  return api;
};

if(typeof module!=="undefined"&&module.exports) module.exports=N;
root.Nephron=N;
})(typeof window!=="undefined"?window:this);
