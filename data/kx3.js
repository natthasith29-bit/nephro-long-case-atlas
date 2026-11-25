/* Extra clinical discriminators, part 3: syncope, hemoptysis, cough, nausea, diarrhea, abdominal pain, GI bleeding, jaundice, pruritus, cramps, myalgia, altered mental status. */
window.KEYX = window.KEYX || {};

KEYX.syncope = {
  "Excessive UF / dry weight too low": ["Post-dialysis orthostatic dizziness, cramps ระหว่างวัน", "Residual urine output ลดเร็ว", "BIA บอก fluid depletion (overhydration ติดลบ), lung US ไม่มี B-lines", "Cool dialysate, Na profiling, longer session ช่วย"],
  "Salt-wasting tubulopathy: Gitelman, Bartter": ["Renin และ aldosterone สูง, BP ปกติหรือต่ำ", "Hypomagnesemia เด่นใน Gitelman", "Bartter type 3 (CLCNKB) phenotype คล้าย Gitelman", "Genetic testing SLC12A3, CLCNKB"],
  "Diuretic / SGLT2 inhibitor / osmotic diuresis": ["Elderly ที่ได้ diuretic ร่วม ACEi และกินน้อย", "Hyperglycemic hyperosmolar state", "SGLT2i ระยะแรก volume contraction"],
  "Cerebral or renal salt wasting / mineralocorticoid deficiency": ["Cerebral salt wasting: SAH, volume depletion จริง (แยกจาก SIADH)", "FEurate สูงคงอยู่หลังแก้ Na ใน salt wasting", "Primary adrenal insufficiency: aldosterone ต่ำ renin สูง", "Cisplatin renal salt wasting"],
  "GI loss / poor intake": ["Urine Na < 20 mmol/L", "BUN:Cr > 20", "Elderly กินน้ำน้อยในอากาศร้อน"],
  "Diabetic autonomic neuropathy": ["HR ไม่เพิ่มเมื่อยืน (< 15 bpm)", "Supine hypertension กับ orthostatic hypotension", "Gastroparesis, ED, neurogenic bladder", "Resting tachycardia, loss of HR variability"],
  "AL amyloidosis": ["Autonomic neuropathy กับ cardiac amyloid", "Midodrine และ droxidopa", "Nephrotic syndrome ทำ volume ต่ำ"],
  "Uremic autonomic neuropathy": ["IDH ซ้ำ", "Baroreflex dysfunction", "ดีขึ้นหลัง KT"],
  "Parkinson disease / MSA / pure autonomic failure": ["MSA: cerebellar หรือ parkinsonian, stridor, autonomic failure เร็ว", "Neurogenic OH: ΔHR/ΔSBP < 0.5 bpm/mmHg", "Supine hypertension"],
  "Adrenal insufficiency": ["Hyponatremia, eosinophilia", "Steroid withdrawal", "Cosyntropin test"],
  "Hypoglycemia": ["Neuroglycopenic: confusion ก่อน loss of consciousness", "Glucose ณ ขณะมีอาการ", "Insulin หรือ sulfonylurea ใน CKD"],
  "Arrhythmia: brady or tachy": ["Syncope ขณะนอนหรือออกแรง, palpitation ก่อน", "Hyperkalemia, BRASH, QT prolongation", "การศึกษา implantable loop recorder ใน HD: bradyarrhythmia และ asystole เป็น terminal rhythm ของ sudden death บ่อยกว่า VT/VF", "ECG: bifascicular block, Mobitz II, QTc > 500"],
  "Aortic stenosis / HOCM / amyloid": ["Exertional syncope", "Slow-rising pulse, ejection murmur", "Echo"],
  "Pericardial tamponade": ["Uremic effusion", "Echo urgent"],
  "Pulmonary embolism": ["Massive PE, RV strain", "Hypoxemia, tachycardia", "Nephrotic MN"],
  "Antihypertensive overtreatment / alpha-blocker": ["Doxazosin, prazosin first-dose syncope", "คนที่มี IDH หรือ post-dialysis hypotension: พิจารณางดหรือเลื่อนยาลด BP ก่อนฟอกเป็นรายคน", "Ambulatory BP ช่วยปรับยา"],
  "Vasovagal / situational": ["Trigger: ยืนนาน, pain, micturition, cough", "Prodrome sweating, nausea, pallor", "Young, recurrent, ไม่มี structural heart disease", "Tilt table ถ้าไม่แน่ใจ"]
};

KEYX.hemoptysis = {
  "ANCA-associated vasculitis": ["Hb ลด, bilateral infiltrate, BAL bloody ขึ้นเรื่อย ๆ", "Biopsy kidney: pauci-immune crescentic", "KDIGO 2024: rituximab หรือ cyclophosphamide", "Avacopan เป็น steroid-sparing (ADVOCATE)"],
  "Anti-GBM disease (Goodpasture)": ["Smoker, inhaled hydrocarbon, cocaine", "Anti-GBM ELISA, linear IgG บน biopsy", "Plasma exchange"],
  "SLE / APS": ["Active LN class III/IV", "Low C3, dsDNA สูง", "Infection ต้องตัดก่อน"],
  "IgA vasculitis / cryoglobulinemia": ["IgAV DAH ในผู้ใหญ่", "Cryo: HCV, low C4"],
  "Leptospirosis": ["Severe pulmonary hemorrhage", "Thrombocytopenia, hypokalemia", "Penicillin หรือ ceftriaxone, early dialysis"],
  "Drug-induced ANCA vasculitis (PTU, hydralazine, levamisole)": ["Hydralazine: anti-histone, anti-elastase", "PTU: MPO-ANCA", "Levamisole: retiform purpura หู"],
  "Uremic platelet dysfunction / anticoagulation": ["Prolonged bleeding time, platelet ปกติ", "DDAVP, cryoprecipitate, intensify dialysis, estrogen", "Heparin-free dialysis"],
  "Pulmonary edema / mitral stenosis": ["Pink frothy sputum", "Orthopnea", "MS: opening snap, AF"],
  "Thrombocytopenia: TTP, ITP, DIC": ["HIT: heparin ใน HD, 4T score", "TTP: neurological, ADAMTS13"],
  "Tuberculosis": ["Cavity, tree-in-bud", "Sputum AFB, GeneXpert", "CKD และ KT risk สูง"],
  "GPA nodule / cavity": ["PR3-ANCA", "ENT: crusting, saddle nose", "Subglottic stenosis"],
  "Fungal / nocardia in immunosuppressed": ["Aspergillus: halo sign, galactomannan", "Mucormycosis: DKA, sinus, black eschar", "Nocardia: lung, brain abscess, TMP-SMX"],
  "Lung cancer": ["Paraneoplastic MN, SIADH, hypercalcemia", "สูบบุหรี่ อายุ > 40 ปี", "CT chest, bronchoscopy"],
  "Bronchiectasis / pneumonia / lung abscess": ["AA amyloid ใน chronic suppuration", "Copious sputum", "HRCT"],
  "Pulmonary embolism / infarct": ["Wedge-shaped infarct", "Nephrotic syndrome"],
  "Epistaxis from GPA or uremic bleeding": ["Posterior nasal blood ลงคอ", "ENT exam ก่อนสรุปว่า hemoptysis"],
  "Upper GI bleeding": ["Coffee ground, acidic", "Melena", "Endoscopy"]
};

KEYX.cough = {
  "ACE inhibitor cough": ["Bradykinin และ substance P", "เกิดได้ทุกเวลาหลังเริ่มยา (มักใน 1-2 สัปดาห์แรก)", "ARB แทนได้", "Dry tickling cough ตอนกลางคืน"],
  "Upper airway cough / asthma / GERD": ["Postnasal drip, throat clearing", "Cough-variant asthma: FeNO สูง", "GERD: heartburn, ตอนนอน"],
  "Granulomatosis with polyangiitis": ["Biopsy: necrotizing granulomatous inflammation", "Saddle nose", "Pulmonary nodule ที่ cavitate"],
  "Tuberculosis / NTM": ["IGRA, sputum AFB, GeneXpert", "NTM ใน bronchiectasis", "TB ใน dialysis เป็น extrapulmonary ในสัดส่วนสูง (ราวครึ่ง) แต่ pulmonary TB ก็ยังพบบ่อย"],
  "Fungal / nocardia": ["Galactomannan, beta-D-glucan", "Biopsy", "Azole interaction กับ tacrolimus"],
  "Septic emboli": ["S. aureus bacteremia", "Right-sided IE", "Multiple peripheral nodules feeding vessel sign"],
  "Rheumatoid nodules / sarcoid nodules": ["RA: seropositive, subcutaneous nodule", "Caplan syndrome: RA กับ pneumoconiosis"],
  "Sarcoidosis": ["Non-caseating granuloma บน EBUS-TBNA", "Hypercalciuria, nephrocalcinosis, granulomatous TIN", "Scadding stage"],
  "MPO-ANCA with ILD": ["UIP pattern", "ILD นำ GN หลายปี", "Prognosis แย่"],
  "Lymphoma / IgG4-RD": ["IgG4: mediastinal fibrosis, retroperitoneal fibrosis", "Lymphoma: B symptoms"],
  "Lung cancer with paraneoplastic renal syndrome": ["MN, MCD (Hodgkin), SIADH, PTHrP", "Ectopic ACTH ใน small cell"],
  "Metastatic RCC": ["Cannonball metastasis", "Hematuria, flank mass", "Paraneoplastic erythrocytosis หรือ hypercalcemia"],
  "mTOR inhibitor pneumonitis": ["Ground-glass หรือ organizing pneumonia", "Dose-dependent", "หายหลังหยุดยา, steroid ใน severe"],
  "PJP / CMV pneumonitis": ["PJP: LDH สูง, beta-D-glucan, BAL PCR", "CMV: ไข้, leukopenia, transaminitis", "มักเกิดหลังหยุด prophylaxis หรือหลังเพิ่ม immunosuppression รักษา rejection"]
};

KEYX.nausea = {
  "Uremia / inadequate dialysis": ["Morning nausea ดีขึ้นหลังฟอก", "อาการไม่ขึ้นกับระดับ BUN ตายตัว (มักชัดเมื่อ BUN > 100 mg/dL หรือ eGFR < 10-15)", "Uremic gastritis"],
  "Hypercalcemia": ["Ca > 12 mg/dL", "Pancreatitis, PUD ร่วม", "Calcitriol และ calcium binder"],
  "Hyponatremia": ["Na < 125-130 mmol/L หรือลดลงเร็ว", "Thiazide, SSRI, SIADH", "Acute vs chronic"],
  "DKA / AKA / toxic alcohol": ["Anion gap สูง, ketone", "Toxic alcohol: osmolal gap > 10 (มาช้า osmolal gap ปกติได้เพราะเปลี่ยนเป็น acid แล้ว), oxalate crystal ใน ethylene glycol", "Euglycemic DKA จาก SGLT2i"],
  "Drug toxicity": ["Digoxin: xanthopsia, bradycardia", "Colchicine: diarrhea, myopathy, pancytopenia", "MMF: GI intolerance, switch เป็น EC-MPS", "Theophylline: tachyarrhythmia, seizure"],
  "Diabetic or uremic gastroparesis": ["Gastric emptying scintigraphy: > 10% retention ที่ 4 ชั่วโมง", "Bezoar", "Metoclopramide ลด dose ใน CKD (tardive dyskinesia)", "Hyperglycemia ทำให้แย่ลง"],
  "PD-related: peritonitis, high fill volume, EPS": ["Fill volume สูงทำ early satiety", "Peritonitis: cloudy effluent", "EPS: bowel obstruction"],
  "Pancreatitis": ["Lipase > 3 เท่า ULN, CT", "Hypertriglyceridemia, hypercalcemia, drugs (azathioprine)", "CKD เพิ่ม lipase baseline"],
  "Hepatitis / biliary / PUD / obstruction": ["RUQ pain, jaundice", "Bowel obstruction: distension, vomiting bilious"],
  "CMV GI disease in KT": ["Tissue-invasive แม้ viremia ต่ำ", "Endoscopic biopsy", "Valganciclovir ปรับตาม eGFR"],
  "Raised ICP / PRES / hemorrhage": ["Morning headache, projectile vomiting", "Papilledema", "Cushing reflex"],
  "Dialysis disequilibrium syndrome": ["เสี่ยงเมื่อ BUN ตั้งต้นสูงมากและลดเร็ว (session แรกตั้งเป้า URR ไม่เกิน 40%)", "Cerebral edema จาก osmotic gradient", "ป้องกัน: short session, low blood flow, small dialyzer"],
  "Vestibular / migraine": ["Vertigo, HINTS", "Migraine photophobia"],
  "Adrenal insufficiency": ["Hyponatremia (ทั้ง primary และ secondary), hyperkalemia เฉพาะ primary adrenal insufficiency", "Abdominal pain, hypotension"],
  "Pregnancy / hyperemesis": ["β-hCG", "Hyperemesis: ketosis, hypokalemic alkalosis, AKI", "Wernicke risk"],
  "Hyperthyroidism / hypothyroidism": ["TSH", "Thyroid storm: vomiting, diarrhea"],
  "Chloride-responsive metabolic alkalosis": ["Hypokalemia จาก secondary hyperaldosteronism", "แก้ด้วย NaCl และ KCl", "Paradoxical aciduria ใน severe"],
  "Bulimia / surreptitious vomiting": ["Urine Cl < 20 แต่ urine Na และ K สูงจาก bicarbonaturia", "Amylase (salivary) สูง", "Hypokalemic nephropathy"]
};

KEYX.diarrhea = {
  "NAGMA with hypokalemia": ["Urine Cl > Na + K (UAG negative) จาก NH4 excretion", "Urine osmolal gap > 400 mOsm/kg ใน diarrhea (NH4 excretion เหมาะสม), < 150 ชี้ RTA", "Hypokalemia จาก stool K loss", "Volume depletion และ prerenal AKI"],
  "Enteric hyperoxaluria / oxalate nephropathy": ["Urine oxalate > 40-45 mg/วัน", "Oxalate crystal บน biopsy, birefringent", "Low-oxalate low-fat diet, calcium citrate กับอาหาร", "Vitamin C megadose, star fruit (มะเฟือง), juicing ก็เป็นสาเหตุ"],
  "Uric acid stone / low urine volume": ["Urine pH < 5.5", "Radiolucent stone", "Ileostomy"],
  "Prerenal AKI / hypomagnesemia": ["Mg < 1.2 mg/dL", "BUN:Cr > 20", "Urine Na ต่ำ"],
  "Laxative abuse (stimulant)": ["Stool Mg หรือ phenolphthalein screen", "Melanosis coli", "Stool osmotic gap < 50 = secretory"],
  "VIPoma / villous adenoma / carcinoid": ["VIP > 75 pg/mL", "Stool volume > 3 L/วัน แม้อดอาหาร", "Carcinoid: flushing, 5-HIAA", "Villous adenoma: hypokalemia, mucus"],
  "Bile acid diarrhea / microscopic colitis": ["Microscopic colitis: elderly women, PPI, NSAID, SSRI", "Colon biopsy: collagenous หรือ lymphocytic", "Bile acid: SeHCAT, cholestyramine response"],
  "MMF / mycophenolate": ["Switch เป็น enteric-coated MPS หรือ split dose", "Exclude CMV, C. diff, norovirus ก่อน", "Diarrhea ทำ tacrolimus level สูง (P-gp)"],
  "Magnesium, sorbitol, lactulose, metformin, colchicine": ["Stool osmotic gap > 125", "Colchicine toxicity: diarrhea นำ myopathy และ pancytopenia", "Mg laxative ทำ hypermagnesemia ใน CKD"],
  "Lactose intolerance / carbohydrate malabsorption": ["Hydrogen breath test", "หายเมื่องด lactose"],
  "Inflammatory bowel disease": ["Fecal calprotectin สูง", "IgAN, AA amyloid, TIN จาก 5-ASA", "Oxalate stone ใน Crohn ileal"],
  "CMV colitis / C. difficile / norovirus in KT": ["Norovirus chronic ใน KT นานหลายเดือน", "C. diff: antibiotic, toxin PCR", "CMV: biopsy inclusion"],
  "Vasculitis / ischemic colitis": ["IgAV: abdominal pain, GI bleed", "Ischemic colitis หลัง IDH ใน HD", "Thumbprinting บน imaging"],
  "TB enterocolitis / amebiasis / strongyloides": ["TB: ileocecal, ascites", "Amebic liver abscess", "Strongyloides hyperinfection ใน steroid"],
  "Chronic pancreatitis / exocrine insufficiency": ["Fecal elastase < 200 µg/g", "Calcification บน CT", "Enteric hyperoxaluria"],
  "Bariatric surgery / short bowel": ["Oxalate nephropathy หลัง RYGB", "Hypocitraturia, low urine volume", "Hypomagnesemia, vitamin deficiency"],
  "Celiac disease / small bowel disease": ["Anti-tTG IgA", "IgAN association", "Dermatitis herpetiformis"],
  "AL amyloid GI involvement": ["Pseudo-obstruction, malabsorption", "Macroglossia, nephrotic", "Rectal biopsy Congo red"]
};

KEYX.abdpain = {
  "IgA vasculitis": ["Intussusception, bowel ischemia", "Abdominal pain นำ purpura ได้ใน 10-20%", "IgA บน skin biopsy"],
  "Polyarteritis nodosa": ["Mesenteric microaneurysm บน angiography", "HBV", "Kidney infarct, HT"],
  "Mesenteric ischemia": ["Non-occlusive (NOMI) ใน HD ระหว่างหรือหลังฟอกที่ IDH", "AF embolic", "Lactate ขึ้นช้า (ค่าปกติช่วงแรกไม่ exclude), CT angiography", "Mortality สูงมากใน dialysis"],
  "Cholesterol embolization": ["Pancreatitis, bowel ischemia", "Retinal emboli"],
  "Renal infarction / renal vein thrombosis": ["Infarct: AF, endocarditis, dissection, FMD, APS", "LDH สูงมาก, hematuria", "CT: wedge-shaped perfusion defect", "RVT: MN, flank pain, kidney ใหญ่"],
  "Pancreatitis": ["Hypercalcemia, hypertriglyceridemia, azathioprine, steroid", "CT เมื่อไม่ดีขึ้นหลัง 48-72 ชั่วโมงหรือ diagnosis ไม่ชัด", "AKI เป็น severity marker"],
  "Cholangitis / liver abscess / hepatitis": ["Charcot triad", "Klebsiella liver abscess ใน DM", "Melioidosis liver abscess"],
  "PD peritonitis": ["Effluent WBC > 100 กับ PMN > 50%", "Culture-negative ควร < 15% ของ episode ทั้งหมด (ISPD 2022 benchmark), culture negative ไม่ exclude peritonitis", "Exit site infection preceding"],
  "Lupus serositis / FMF": ["FMF: recurrent fever 1-3 วัน, MEFV, AA amyloid, colchicine", "Lupus: active SLE"],
  "EPS": ["Bloody effluent", "Weight loss, malnutrition", "Peritoneal calcification"],
  "Perforation / surgical abdomen": ["Steroid บังอาการ", "Free air", "Colonic diverticulitis ใน ADPKD"],
  "Acute hepatic porphyria": ["Spot urine PBG สูงมากระหว่าง attack", "Neurovisceral: tachycardia, HT, neuropathy, psychiatric", "Hemin และ givosiran", "CKD risk ระยะยาว (porphyria-associated kidney disease)"],
  "Lead nephropathy (lead poisoning)": ["Blood lead", "Basophilic stippling", "Gout, HT, CKD"],
  "DKA / uremia / hypercalcemia / adrenal crisis": ["DKA: abdominal pain สัมพันธ์กับ acidosis รุนแรง ถ้า acidosis ไม่มากหรือปวดไม่หายหลังแก้ ให้หาสาเหตุ intra-abdominal", "Adrenal crisis: abdominal pain, fever, hypotension"],
  "Nephrolithiasis / obstruction": ["Non-contrast CT KUB", "Hematuria", "Obstructed infected kidney: emergency drainage"],
  "ADPKD cyst hemorrhage / infection": ["Hemorrhage: ปวดเฉียบพลัน มักไม่มีไข้หรือไข้ต่ำ ๆ, gross hematuria ถ้าแตกเข้า collecting system", "Infection: fever, CRP, PET-CT", "Lipophilic antibiotic"],
  "Acute pyelonephritis / graft pyelonephritis": ["Graft tenderness, Cr ขึ้น", "Vesicoureteral reflux ของ graft", "Bacteremia"],
  "Loin pain hematuria syndrome": ["Diagnosis of exclusion", "Glomerular hematuria, thin GBM บางราย", "Chronic pain, opioid dependence"]
};

KEYX.gibleed = {
  "Uremic platelet dysfunction": ["vWF-GPIb dysfunction", "DDAVP 0.3 µg/kg", "Conjugated estrogen สำหรับ prolonged effect"],
  "Heparin / anticoagulant / antiplatelet": ["Heparin-free HD หรือ citrate", "Apixaban dose ใน ESKD", "PPI prophylaxis"],
  "Peptic ulcer / uremic gastritis": ["H. pylori", "Steroid + NSAID", "Dialysis ไม่เพิ่ม H. pylori"],
  "Varices / portal hypertensive gastropathy": ["Cirrhosis stigmata", "Terlipressin, band ligation"],
  "Calciphylaxis / lanthanum deposition / sevelamer injury": ["Sevelamer crystal: rusty brown fish-scale บน biopsy", "Lanthanum deposition ใน gastric mucosa", "GI calciphylaxis rare"],
  "Angiodysplasia": ["Capsule endoscopy", "Heyde: AS กับ acquired vWD", "Octreotide หรือ thalidomide ใน refractory"],
  "Colorectal cancer / diverticular bleeding": ["Painless massive hematochezia ใน diverticular", "Colonoscopy"],
  "Ischemic colitis": ["Left colon watershed", "Post-IDH", "CT bowel wall thickening"],
  "Kayexalate (SPS) colonic necrosis": ["SPS crystal (basophilic, fish-scale) บน biopsy", "Post-op, ileus, uremia", "Patiromer หรือ SZC แทน"],
  "IgA vasculitis / PAN / ANCA": ["Purpura, nephritis", "Mesenteric aneurysm ใน PAN"],
  "CMV colitis / PTLD in KT": ["Biopsy", "EBV PCR, PET-CT"],
  "AL amyloid GI involvement": ["Factor X deficiency", "Vascular fragility"],
  "TMA / thrombocytopenia": ["Platelet < 20,000", "Schistocyte"]
};

KEYX.jaundice = {
  "TMA (TTP, HUS, CM-HUS)": ["Indirect bilirubin และ LDH สูง, haptoglobin ต่ำ", "Reticulocyte สูง", "ADAMTS13, STEC, complement"],
  "G6PD deficiency hemolysis": ["Trigger: primaquine, dapsone, rasburicase, sulfa, infection, fava", "Hemoglobinuria, pigment AKI", "Male, Thailand prevalence สูง", "G6PD ระหว่าง acute hemolysis ปกติปลอมได้ ให้ตรวจซ้ำหลัง 2-3 เดือน"],
  "Autoimmune hemolytic anemia": ["Warm (IgG): SLE, CLL, drug", "Cold (IgM): Mycoplasma, EBV, lymphoproliferative", "Spherocyte"],
  "Severe malaria (P. falciparum)": ["Parasitemia > 5% หรือ > 250,000/µL", "Hypoglycemia, acidosis, AKI", "Artesunate IV"],
  "Thalassemia / PNH / mechanical valve": ["PNH: hemoglobinuria ตอนเช้า, thrombosis, flow cytometry CD55/CD59", "PNH kidney: hemosiderosis, AKI, CKD", "Mechanical valve: schistocyte, paravalvular leak"],
  "Leptospirosis (Weil disease)": ["MAT ≥ 1:400 หรือ PCR", "Hypokalemia, nonoliguric", "Pulmonary hemorrhage"],
  "Viral hepatitis with kidney disease": ["HAV AKI: ATN หรือ ICGN", "HEV ใน KT: chronic hepatitis E", "HBV: tenofovir alafenamide ปลอดภัยกว่า TDF"],
  "Drug-induced liver injury": ["Hepatocellular vs cholestatic (R ratio)", "Isoniazid, rifampicin, pyrazinamide", "Amoxicillin-clavulanate cholestatic"],
  "Ischemic hepatitis / cardiorenal": ["AST > 1000 IU/L ภายใน 24-48 ชั่วโมงหลัง shock", "LDH สูงมาก", "Rapid fall"],
  "Scrub typhus / dengue / rickettsia": ["Eschar", "Dengue: Hct rise, platelet drop", "Doxycycline"],
  "Cholemic nephropathy (bile cast nephropathy)": ["มักเกิดเมื่อ bilirubin > 20 mg/dL", "Bile cast บน biopsy", "Reversible เมื่อ bilirubin ลด"],
  "Obstruction: stone, cholangiocarcinoma, pancreatic cancer": ["Courvoisier sign", "CA19-9", "Opisthorchis viverrini history"],
  "Infiltrative: AL amyloid, sarcoidosis, TB, lymphoma": ["ALP สูงไม่สัมพันธ์กับ bilirubin", "Hepatomegaly", "Biopsy"],
  "IgG4-related sclerosing cholangitis": ["IgG4 สูง", "Autoimmune pancreatitis sausage-shaped", "Kidney: TIN, hypodense lesion"],
  "Sepsis-associated cholestasis": ["Conjugated bilirubin สูงใน sepsis", "Gram-negative"],
  "HRS-AKI": ["Cr ไม่ดีขึ้นภายใน 24 ชั่วโมงหลัง volume resuscitation ที่เพียงพอ (ADQI-ICA 2024)"],
  "ATN / bile cast / IgAN in cirrhosis": ["Urine sediment: granular cast ใน ATN", "NGAL ช่วยแยก ATN จาก HRS", "FENa > 1-2% ชี้ ATN แต่ใน cirrhosis FENa < 1% พบได้แม้เป็น ATN จึงไม่ใช้แยกเดี่ยว ๆ"]
};

KEYX.pruritus = {
  "CKD-associated pruritus (uremic pruritus)": ["Generalized หรือ back, symmetric", "แย่ลงตอนกลางคืน, หลังฟอก", "Difelikefalin (kappa agonist) ใน HD", "Gabapentin low dose หลังฟอก, UVB"],
  "Hyperphosphatemia / secondary HPT": ["PO4 > 5.5 mg/dL, PTH สูงมาก (ความสัมพันธ์กับ pruritus ไม่สม่ำเสมอ, DOPPS 2012-2015 ไม่พบ association กับ phosphorus)", "Calcium deposition ใน skin", "Parathyroidectomy ช่วยใน severe HPT"],
  "Inadequate dialysis / high-flux": ["Kt/V < 1.2", "High-flux หรือ hemodiafiltration อาจลด pruritus (หลักฐานไม่สม่ำเสมอ)"],
  "Calciphylaxis prodrome / NSF": ["Painful indurated plaque", "Gadolinium exposure ใน NSF"],
  "Cholestasis: PBC, PSC, drug, obstruction": ["AMA ใน PBC", "Palm และ sole itch", "Cholestyramine, rifampicin"],
  "HCV / HBV": ["Lichen planus กับ HCV", "PCT กับ HCV"],
  "Iron deficiency / polycythemia vera": ["Aquagenic pruritus หลังอาบน้ำ", "JAK2", "Iron deficiency ใน dialysis"],
  "Lymphoma / myeloma / paraneoplastic": ["Hodgkin pruritus ก่อน diagnosis หลายเดือน", "Night sweats"],
  "Thyroid / diabetes": ["Hyperthyroid: warm moist skin", "DM: localized genital pruritus (candida)"],
  "Drug: opioid, ACEi, hydroxyethyl starch, allergy to dialyzer": ["HES: delayed pruritus หลายสัปดาห์", "Dialyzer reaction"],
  "Scabies / dermatitis / bullous pemphigoid": ["Scabies: burrow, web spaces, family contacts", "BP: urticarial prodrome ก่อน bullae", "Crusted scabies ใน KT"],
  "Neuropathic / psychogenic": ["Brachioradial pruritus, notalgia paresthetica", "Delusional parasitosis"]
};

KEYX.cramps = {
  "Hungry bone syndrome": ["Severe HPT preop (ALP สูงมาก, brown tumor) เพิ่ม risk", "Ca IV และ calcitriol dose สูง", "หลายสัปดาห์ถึงเดือน"],
  "Hypoparathyroidism": ["PTH ต่ำกับ Ca ต่ำ PO4 สูง", "Basal ganglia calcification", "Autoimmune polyendocrine", "Hypomagnesemia ทำ functional hypoparathyroidism"],
  "CKD-MBD / vitamin D deficiency": ["PTH สูง, PO4 สูง", "Calcitriol deficiency", "Calcimimetic เพิ่ม hypocalcemia"],
  "Drug: denosumab, bisphosphonate, cinacalcet, foscarnet": ["Denosumab ใน dialysis: severe hypocalcemia ราว 41% ใน 12 สัปดาห์", "Foscarnet: chelation, hypomagnesemia", "Cinacalcet และ etelcalcetide"],
  "Rhabdomyolysis / tumor lysis / pancreatitis": ["Hyperphosphatemia ทำ CaPO4 deposition", "Rebound hypercalcemia ในระยะฟื้นของ rhabdo"],
  "Gitelman syndrome": ["Salt craving", "Hypokalemia, hypomagnesemia", "SLC12A3"],
  "PPI-induced hypomagnesemia": ["TRPM6/7 inhibition", "Mg < 1.0 mg/dL ได้", "Hypocalcemia และ hypokalemia ร่วม", "หายหลังหยุด PPI"],
  "Drug-induced renal Mg wasting": ["FEMg > 2-4% ขณะ hypomagnesemia", "CNI: hypomagnesemia หลัง KT", "Cisplatin: permanent ได้", "Cetuximab"],
  "GI loss / alcohol / malabsorption": ["FEMg < 2%", "Alcoholic: hypokalemia, hypophosphatemia ร่วม"],
  "Familial hypomagnesemia with hypercalciuria and nephrocalcinosis": ["CLDN16, CLDN19 (ocular abnormality ใน CLDN19)", "Progressive CKD ตั้งแต่วัยรุ่น", "Hypercalciuria"],
  "Respiratory alkalosis / hyperventilation": ["Ionized Ca ลด", "Perioral และ carpopedal"],
  "Metabolic alkalosis": ["Ionized Ca ลด", "Bicarbonate dialysate สูง"],
  "Excessive ultrafiltration / dry weight too low": ["Cramp ช่วงท้ายฟอก", "BIA", "Hypertonic saline หรือ glucose ขณะ cramp"],
  "Low dialysate Na / Mg / K, carnitine deficiency": ["Dialysate Mg < 0.5 mmol/L", "Carnitine deficiency ใน long-term HD", "Na profiling"],
  "Hypothyroidism / statin / diuretic": ["CK สูง", "Statin myalgia"],
  "Volume depletion / hyponatremia": ["Heat cramps", "Thiazide"],
  "Peripheral arterial disease / neuropathy": ["Claudication, ABI < 0.9 (ABI สูงปลอมใน calcified vessel ใน CKD, ใช้ TBI)", "Neuropathic cramps"],
  "Hypokalemia": ["K < 3.0", "Diuretic"]
};

KEYX.myalgia = {
  "Crush / prolonged immobilization": ["Compartment pressure > 30 mmHg", "Hyperkalemia ทันทีหลัง reperfusion", "Fasciotomy"],
  "Exertional rhabdomyolysis / heat stroke": ["Sickle trait", "Core temp > 40 °C, CNS dysfunction ใน heat stroke", "Hyperuricemia"],
  "Seizure / agitation / dystonia": ["Neuroleptic malignant syndrome: rigidity, hyperthermia", "Serotonin syndrome: clonus"],
  "Statin with interacting drug": ["Cyclosporine เพิ่ม statin level หลายเท่า", "Clarithromycin, azole, gemfibrozil", "CK > 10 เท่า ULN"],
  "Colchicine myoneuropathy": ["CK สูง, vacuolar myopathy", "Clarithromycin หรือ cyclosporine ร่วม", "Axonal neuropathy"],
  "Alcohol / cocaine / amphetamine / snake bite": ["Russell viper (ไทย): AKI, DIC, rhabdo", "Sea snake: myotoxic", "Cocaine: vasospasm"],
  "Leptospirosis": ["Calf tenderness", "CK สูง", "Hypokalemia"],
  "Influenza / COVID-19 / dengue": ["Influenza: เด็กเป็น benign acute childhood myositis ที่น่อง, ผู้ใหญ่เป็น rhabdomyolysis ได้", "Dengue myositis"],
  "Pyomyositis / melioidosis": ["S. aureus", "DM, HIV", "MRI"],
  "Trichinosis / scrub typhus": ["Raw pork, periorbital edema, eosinophilia", "Scrub typhus myositis"],
  "Severe hypokalemia": ["Diuretic, diarrhea, RTA", "Rhabdo masks hypokalemia (K release)"],
  "Hypophosphatemia": ["Refeeding", "CRRT"],
  "Hypothyroidism / hyperosmolar state": ["CK สูง chronic", "HHS: rhabdo"],
  "Inherited metabolic myopathy": ["McArdle (PYGM): second wind, flat lactate", "CPT2: prolonged exercise, fasting", "Mitochondrial", "Genetic panel"],
  "Dermatomyositis / polymyositis / anti-synthetase": ["Myositis antibodies", "MRI muscle", "Malignancy screening"],
  "SLE / MCTD / vasculitis myositis": ["MCTD: anti-RNP", "Vasculitis: muscle infarct"],
  "Statin-associated immune-mediated necrotizing myopathy": ["Anti-HMGCR", "Necrotizing biopsy", "IVIG, immunosuppression"]
};

KEYX.ams = {
  "Uremic encephalopathy": ["BUN สูงมาก, eGFR < 10-15 หรือ underdialysis", "Asterixis, multifocal myoclonus, slurred speech, ซึมสลับกระสับกระส่าย", "EEG: diffuse slowing, triphasic waves", "Absolute indication เริ่ม dialysis และดีขึ้นในวันถึงสัปดาห์"],
  "Dialysis disequilibrium syndrome": ["BUN ลดเร็วเกิน 30-40% ใน session แรก ทำ osmotic gradient และ cerebral edema", "Risk: BUN ก่อนฟอกสูงมาก, เด็ก, elderly, pre-existing CNS disease, severe metabolic acidosis", "ป้องกัน: short session 2 ชั่วโมง, Qb ต่ำ, dialyzer เล็ก, ฟอกทุกวัน", "Severe: seizure, coma, ใช้ mannitol หรือ hypertonic saline"],
  "Wernicke / thiamine deficiency": ["Thiamine ถูก dialyze ออกและ PEW ลด intake", "Ophthalmoplegia (nystagmus, lateral rectus palsy), ataxia, confusion", "Unexplained lactic acidosis, high-output HF (wet beriberi)", "ให้ thiamine IV ก่อนหรือพร้อม glucose (ไม่เลื่อน glucose ถ้า hypoglycemia), MRI mammillary bodies และ periaqueductal"],
  "Subdural hematoma": ["Fluctuating confusion, headache, subtle hemiparesis หลายวันถึงสัปดาห์", "Heparin ระหว่าง HD, anticoagulant, uremic platelet, fall, alcohol", "Chronic SDH isodense บน CT ในสัปดาห์ที่ 2-3"],
  "Gabapentinoid / opioid / baclofen": ["Gabapentin และ pregabalin: somnolence, ataxia, myoclonus เมื่อ dose ไม่ปรับตาม eGFR", "Morphine (M6G) และ codeine สะสม, hydromorphone และ fentanyl ปลอดภัยกว่า", "Baclofen: coma, seizure, bradycardia แม้ dose ต่ำใน CKD", "Gabapentin และ baclofen dialyzable"],
  "Acyclovir / valacyclovir neurotoxicity": ["Onset 1-3 วันหลังเริ่มยาใน CKD หรือ dialysis", "Agitation, hallucination, dysarthria, tremor, myoclonus", "Metabolite CMMG สะสม", "HD กำจัดได้ดีและอาการดีขึ้นเร็ว"],
  "Cefepime / carbapenem / beta-lactam neurotoxicity": ["Cefepime trough สูงใน CKD ทำ encephalopathy และ myoclonus", "Non-convulsive status epilepticus บน EEG", "Imipenem ทำ seizure มากกว่า meropenem", "HD กำจัดยาได้"],
  "Lithium / metformin / salicylate": ["Lithium chronic toxicity: coarse tremor, ataxia, confusion แม้ level 1.5-2.5 mmol/L, EXTRIP แนะนำ ECTR ใน decreased consciousness หรือ level > 4.0 กับ eGFR ต่ำ", "Salicylate: tinnitus, hyperventilation, respiratory alkalosis ร่วม HAGMA, non-cardiogenic pulmonary edema", "Metformin: lactic acidosis รุนแรงใน AKI", "SILENT: cerebellar dysfunction ถาวรหลัง lithium toxicity"],
  "Dysnatremia / osmotic demyelination": ["Acute hyponatremia < 48 ชั่วโมง เสี่ยง cerebral edema และ herniation", "Symptomatic: 3% NaCl 150 mL ใน 20 นาที (European 2014) หรือ 100 mL bolus ซ้ำได้ถึง 3 ครั้ง (US 2013)", "ODS: biphasic หลังแก้ Na เร็ว", "Hypernatremia ใน elderly ที่เข้าถึงน้ำไม่ได้"],
  "Hypercalcemia / hypermagnesemia": ["Ca > 14 mg/dL: confusion, coma", "Calcitriol, calcium binder, tertiary HPT, malignancy", "Mg > 6 mg/dL: somnolence, loss of DTR, hypotension", "Mg laxative ใน CKD"],
  "Hypoglycemia": ["Glucose < 54 mg/dL", "Sulfonylurea ทำ prolonged recurrent hypoglycemia", "Insulin clearance ลดใน CKD", "Focal deficit คล้าย stroke ได้"],
  "Hepatic encephalopathy": ["Asterixis, fetor hepaticus, sleep inversion", "Precipitant: GI bleed, infection, constipation, sedative, hypokalemia", "Lactulose, rifaximin", "Ammonia ไม่จำเป็นในการวินิจฉัย"],
  "Hypercapnia / sepsis-associated encephalopathy": ["PaCO2 > 60 mmHg, COPD, OHS, opioid", "Sepsis-associated: delirium ก่อน organ dysfunction อื่น", "Asterixis ใน hypercapnia"],
  "PRES / hypertensive encephalopathy": ["Headache, visual disturbance, seizure, encephalopathy", "MRI FLAIR parieto-occipital", "CNI แม้ระดับปกติ, hypomagnesemia"],
  "TTP / aHUS with CNS": ["Fluctuating focal deficit, confusion", "Schistocyte, platelet < 30,000, ADAMTS13 < 10%", "Plasma exchange ทันทีถ้า PLASMIC สูง"],
  "CNS lupus / vasculitis": ["Psychosis, seizure, cognitive dysfunction ใน active SLE", "aPL positive: stroke, white matter lesion", "ต้องตัด infection และ drug ก่อน attribution"],
  "CNS infection in immunosuppressed": ["Cryptococcus: headache นาน, opening pressure สูง, CrAg", "Listeria: rhombencephalitis", "HSV: temporal lobe", "PML: JC virus, subacute focal deficit"],
  "Stroke / non-convulsive status": ["NCSE: EEG จำเป็นใน unexplained coma", "Stroke ในผู้ป่วย CKD risk สูง", "MRI DWI"]
};
