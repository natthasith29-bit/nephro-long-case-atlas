/* Links to the Nephrology Simulator Hub (separate artifact).
   The hub page is simulators.html at the site root, each sim lives at sims/CODE.html. */
window.SIM_HUB = "simulators.html";
window.SIMS = {
 "AKI-01":"Creatinine kinetics และ KDIGO/AKD staging","AKI-02":"Glomerular hemodynamics และ autoregulation","AKI-03":"Urine indices prerenal vs ATN",
 "AKI-04":"Cardiorenal และ diuretic resistance","AKI-05":"Cirrhosis AKI, HRS และ IAP","AKI-06":"TLS และ myeloma cast","AKI-07":"Drug และ crystal nephrotoxicity map",
 "AKI-08":"AIN, TINU, ICI-AIN timeline","AKI-09":"Rhabdomyolysis และ pigment nephropathy","AKI-10":"KRT timing และ modality chooser","AKI-11":"Obstructive uropathy",
 "AKI-12":"Biomarker และ furosemide stress test","AKI-13":"Drug-induced kidney disease: กลไกตาม phenotype",
 "CKD-01":"eGFR equation lab","CKD-02":"Progression, KFRE และ eGFR slope","CKD-03":"DKD drug pillars","CKD-04":"CKD-MBD loop: FGF23, Klotho, PTH",
 "CKD-05":"Renal osteodystrophy (TMV) และ calciphylaxis","CKD-06":"Anemia: EPO, iron, hepcidin","CKD-07":"Metabolic acidosis ใน CKD","CKD-08":"Hyperkalemia ใน CKD และ K binder",
 "CKD-09":"Protein metabolism และ nutrition","CKD-10":"CV risk: lipid และ anticoagulation","CKD-11":"Dialysis หรือ conservative kidney management",
 "HT-01":"RAAS cascade และ blockade","HT-02":"Pressure natriuresis และ salt sensitivity","HT-03":"BP measurement, ABPM และ HBPM patterns","HT-04":"Renin x aldosterone matrix",
 "HT-05":"Renovascular HT","HT-06":"Resistant HT stepwise","HT-07":"Secondary HT navigator","HT-08":"HT emergency และ pregnancy HT",
 "GN-01":"Glomerular filtration barrier และ proteinuria","GN-02":"Deposit location explorer (LM/IF/EM)","GN-03":"Nephritic vs nephrotic pattern + serology",
 "GN-04":"Organized deposits และ paraprotein (EM ruler)","GN-05":"Complement pathways และ TMA","GN-06":"Membranous และ anti-PLA2R trajectory","GN-07":"FSGS/MCD spectrum",
 "GN-08":"IgAN multi-hit และ MEST-C","GN-09":"Lupus nephritis class และ response","GN-10":"ANCA vasculitis และ anti-GBM","GN-11":"C3G/MPGN/MGRS navigator",
 "GN-12":"Nephrotic syndrome complications","GN-13":"Hereditary GN","GN-14":"Immunosuppressant mechanism map","GN-15":"Infection-related GN",
 "EL-01":"Tubular physiology: ion flow ทุก segment","EL-02":"Body water compartments และ osmolality","EL-03":"Hyponatremia mechanism และ correction","EL-04":"Hypernatremia และ polyuria",
 "EL-05":"Potassium handling","EL-06":"Hyperkalemia ECG และ treatment timeline","EL-07":"Tubulopathy genetics บน nephron","EL-08":"Acid-base stepwise","EL-09":"RTA lab",
 "EL-10":"Toxic alcohol และ osmolal gap","EL-11":"Metabolic alkalosis","EL-12":"Calcium และ PTH axis","EL-13":"Phosphate","EL-14":"Magnesium handling","EL-15":"Diuretic pharmacology","EL-16":"IV fluid composition",
 "HD-01":"AV access PE และ Doppler","HD-02":"Access complications: steal, high flow, central stenosis","HD-03":"Solute transport","HD-04":"Urea kinetics และ adequacy","HD-05":"Recirculation และ access flow",
 "HD-06":"HD circuit และ pressure alarms","HD-07":"Water treatment plant","HD-08":"Volume: BVM/RBV, dry weight, IDH","HD-09":"Dialysate prescription","HD-10":"Dialysis disequilibrium",
 "HD-11":"Dialyzer reaction และ HD emergency","HD-12":"Anticoagulation","HD-13":"CRRT modality และ dose","HD-14":"CRRT citrate RCA","HD-15":"Extracorporeal toxin removal","HD-16":"Nutrition ใน HD และ IDPN","HD-17":"Plasma exchange",
 "PD-01":"Peritoneal membrane three-pore model","PD-02":"PET","PD-03":"Dwell และ UF curve","PD-04":"PD prescription CAPD vs APD","PD-05":"Acute และ urgent-start PD","PD-06":"Incremental PD และ RKF",
 "PD-07":"UF failure work-up","PD-08":"Catheter และ mechanical problems","PD-09":"Peritonitis และ cloudy effluent","PD-10":"Exit-site และ tunnel infection","PD-11":"PD solutions และ metabolic effect",
 "KT-01":"HLA และ immunologic risk","KT-02":"Crossmatch และ DSA","KT-03":"Alloimmune response และ IS targets","KT-04":"Tacrolimus PK และ drug interaction","KT-05":"Banff rejection explorer",
 "KT-06":"BK virus","KT-07":"Post-KT infection timeline","KT-08":"Graft dysfunction by time","KT-09":"Donor evaluation และ KDPI/KDRI","KT-10":"Desensitization และ ABOi","KT-11":"PTLD และ malignancy","KT-12":"Recurrent disease risk",
 "MX-01":"Diagnostic test lab (Bayes)","MX-02":"Trial reading lab","MX-03":"Kidney stone lab","MX-04":"ADPKD","MX-05":"Drug dosing ใน CKD/HD","MX-06":"Onconephrology map",
 "MX-07":"Pregnancy และ kidney","MX-08":"Tropical nephrology และ toxins","MX-09":"Urine sediment atlas","MX-10":"Kidney imaging pattern atlas","MX-11":"Renal clearance basics","MX-12":"Nephron mass และ hyperfiltration"
};
/* Approach complaint id -> simulators that build understanding for that line */
window.APPROACH_SIMS = {
 bxread:["GN-02","GN-04","GN-11","GN-08","GN-09","KT-05"], "bx-crescent":["GN-10","GN-09","GN-03"], "bx-mpgn":["GN-11","GN-05","GN-02"], "bx-nodular":["GN-04","CKD-03","MX-06"], "bx-podo":["GN-07","GN-01","MX-12"], "bx-mn":["GN-06","GN-02"], "bx-endocap":["GN-15","GN-08","GN-09"], "bx-mesangial":["GN-08","GN-02","GN-09"], "bx-tma":["GN-05","HT-08"], "bx-tin":["AKI-08","AKI-06","AKI-07","KT-06"], "bx-organized":["GN-04","GN-11"], "bx-graft":["KT-05","KT-06","KT-08","KT-02"],
 nephrotic:["GN-01","GN-07","GN-06","GN-12"], hematuria:["GN-03","GN-08","MX-09","GN-13"], rpgn:["GN-03","GN-10","GN-09","HD-17"], proteinuria:["GN-01","MX-12","CKD-02"],
 polyuria:["EL-04","EL-02","EL-01"], flank:["MX-10","MX-04","MX-03"], stone:["MX-03","EL-09","EL-12"], oliguria:["AKI-01","AKI-03","AKI-11","AKI-10"],
 pigmenturia:["AKI-09","MX-09"], luts:["AKI-11"], pyuria:["MX-09","AKI-08","MX-08"], cysts:["MX-04","MX-10"], kidneysize:["MX-10","HT-05","MX-12"],
 edema:["GN-12","AKI-04","EL-15","GN-01"], weakness:["EL-05","EL-09","EL-14"], bonepain:["CKD-05","EL-12","EL-13","AKI-06"], weightloss:["MX-06","GN-04"],
 fever:["KT-07","GN-15","MX-08"], dyspnea:["AKI-04","HD-08","PD-07"], headache:["HT-08","HT-07"], rash:["GN-10","GN-08","GN-09"], arthralgia:["GN-09","GN-10"],
 numbness:["GN-10","EL-12"], abdomen:["MX-04","PD-07"], chestpain:["HD-04","GN-09"], palpitation:["EL-06","EL-05","HT-07"], syncope:["HD-08","EL-15"],
 hemoptysis:["GN-10","HD-17"], cough:["GN-10"], nausea:["HD-04","EL-03"], diarrhea:["EL-08","EL-05"], abdpain:["MX-03","GN-08"], gibleed:["CKD-06"], jaundice:["AKI-05"],
 pruritus:["CKD-04","HD-04"], cramps:["EL-14","EL-12","HD-08"], myalgia:["AKI-09","EL-05","EL-13"], ams:["EL-03","HD-10","EL-10"], seizure:["EL-03","HT-08","HD-10"],
 thirst:["EL-04","EL-02"], hearing:["GN-13"], eye:["AKI-08","GN-10"], sicca:["EL-09","AKI-08"], ent:["GN-10"], raynaud:["HT-08","GN-11"], skinthick:["HT-08"],
 skinulcer:["CKD-05","GN-11"], bluetoe:["AKI-01","MX-10"], bleeding:["HD-12","CKD-06"], thrombosis:["GN-12","GN-05"], stroke:["HT-08","GN-13"], backpain:["AKI-06","MX-04"],
 lymphnode:["MX-06","KT-11"], cushingoid:["HT-07","HT-04"], paroxysm:["HT-07"], obesity:["MX-12","CKD-03"], wasting:["CKD-09","HD-16"], tremor:["KT-04","EL-14"], rls:["HD-04","CKD-06"],
 shortstature:["EL-07","EL-09","GN-13"], risingcr:["AKI-01","CKD-01","CKD-02","AKI-03","AKI-02"], tma:["GN-05","HD-17"], cytopenia:["CKD-06"],
 hypok:["EL-05","EL-07","HT-04","EL-09"], hyperk:["EL-06","EL-05","CKD-08"], hypona:["EL-03","EL-02","EL-16"], hyperna:["EL-04","EL-02"], hyperca:["EL-12","AKI-06"],
 hypoca:["EL-12","EL-14"], phos:["EL-13","CKD-04"], mg:["EL-14"], nagma:["EL-09","EL-08","CKD-07"], agma:["EL-08","EL-10"], metalk:["EL-11","EL-07","EL-15"],
 alp:["CKD-05","EL-13"], mspike:["GN-04","AKI-06","MX-06"], "htn-young":["HT-07","HT-04","HT-05","HT-06","HT-03"], "htn-emerg":["HT-08","GN-05"],
 "kt-immediate":["KT-08","KT-02","KT-09"], "kt-early":["KT-08","KT-05","KT-04","KT-06"], "kt-late":["KT-08","KT-05","KT-12","KT-04"], "kt-fever":["KT-07","KT-06"],
 "kt-urine":["KT-12","KT-05","GN-01"], donor:["KT-09","KT-01","MX-12"], "failed-graft":["KT-01","KT-10","CKD-11"],
 "hd-idh":["HD-08","HD-09"], "hd-fever":["HD-02","HD-11","HD-07"], "hd-access":["HD-01","HD-02","HD-05","HD-04"], "hd-mbd":["CKD-04","CKD-05","EL-13"], "hd-bleed":["HD-12","CKD-06"],
 "pd-cloudy":["PD-09","PD-10"], "pd-dyspnea":["PD-07","PD-02","PD-03","PD-01"], "pd-catheter":["PD-08","PD-10"],
 pregnancy:["MX-07","HT-08"], onco:["MX-06","AKI-06","AKI-13"], viral:["GN-15","GN-07"], elderly:["CKD-11","CKD-02","MX-05"]
};
/* Present section index (0-based) -> simulators */
window.TPL_SIMS = {
 3:["HD-01","HD-08"],
 5:["MX-01","GN-03"],
 6:["MX-09","MX-10","AKI-03","EL-08","GN-02"],
 8:["MX-05","GN-14","KT-04","CKD-03"],
 9:["CKD-02","MX-02"]
};
