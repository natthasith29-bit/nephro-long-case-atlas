/* Extra clinical discriminators, part 4: seizure, thirst, hearing, eye, sicca, ENT, Raynaud, skin thickening, skin ulcer, blue toe, bleeding, thrombosis. */
window.KEYX = window.KEYX || {};

KEYX.seizure = {
  "Acute hyponatremia": ["Na < 120 mmol/L หรือลดเร็วภายใน 48 ชั่วโมง", "Thiazide, MDMA, marathon, beer potomania, post-op", "Seizure มักหยุดเมื่อ Na เพิ่มขึ้น 4-6 mmol/L หลัง 3% NaCl bolus 100-150 mL (ซ้ำได้ 2-3 ครั้ง)", "Cerebral edema บน CT"],
  "Hypocalcemia / hypomagnesemia": ["Ionized Ca < 0.8 mmol/L หรือ Mg < 1 mg/dL", "Post-parathyroidectomy hungry bone, post-thyroidectomy", "Prolonged QT", "Hypocalcemia ที่ไม่ตอบสนองต่อ calcium IV ให้ตรวจและแก้ hypomagnesemia ร่วม"],
  "Hypoglycemia / hyperosmolar state": ["Glucose < 45 mg/dL หรือ HHS (glucose ≥ 600 mg/dL ร่วมกับ effective osmolality > 300 mOsm/kg หรือ total serum osmolality > 320 mOsm/kg)", "Focal motor seizure (รวม epilepsia partialis continua) พบได้ใน HHS", "Hypoglycemia จาก insulin หรือ sulfonylurea ที่สะสมเมื่อ GFR ลด"],
  "Uremia / dialysis disequilibrium": ["BUN ก่อนฟอกสูงมาก (dialysis disequilibrium เสี่ยงสูงเมื่อ BUN > 175 mg/dL)", "Seizure ระหว่างหรือหลัง HD ครั้งแรกๆ ที่ลด urea เร็ว", "Uremic encephalopathy: asterixis และ myoclonus นำมาก่อน seizure"],
  "PRES / CNI neurotoxicity": ["CNI neurotoxicity พบจาก tacrolimus บ่อยกว่า cyclosporine และเกิดได้แม้ trough level อยู่ในเป้า", "Hypomagnesemia, hypertension, fluid overload", "อาการและ MRI มักดีขึ้นหลังคุม BP และลดขนาดหรือเปลี่ยน CNI"],
  "Eclampsia": ["Seizure หลังอายุครรภ์ 20 สัปดาห์ หรือ postpartum (ส่วนใหญ่ใน 48 ชั่วโมง แต่เกิดได้ถึง 6 สัปดาห์)", "MgSO4 4-6 g load, maintenance ลดใน AKI, monitor DTR", "Headache และ visual symptoms มักนำมาก่อน แต่ชักได้โดย BP ไม่สูงมากหรือไม่มี proteinuria"],
  "TTP / aHUS": ["Seizure และ focal deficit พบใน TTP บ่อยกว่า aHUS แต่ aHUS ก็มี CNS involvement ได้", "ADAMTS13 activity < 10% วินิจฉัย TTP, ถ้า ≥ 10% คิดถึง aHUS และ secondary TMA", "เก็บเลือดส่ง ADAMTS13 ก่อนเริ่ม plasma exchange และไม่รอผลถ้าสงสัย TTP"],
  "Stroke / hemorrhage / CVT": ["Seizure เกิดได้ทั้งช่วง acute stroke และเป็น late post-stroke epilepsy", "CVT: nephrotic syndrome (hypercoagulable state), headache, papilledema", "MRI ร่วมกับ MRV เมื่อสงสัย CVT"],
  "Beta-lactam neurotoxicity": ["Cefepime, imipenem, high-dose penicillin", "Myoclonus, encephalopathy และ nonconvulsive status epilepticus (ต้องใช้ EEG)", "ดีขึ้นใน 2-3 วันหลังหยุดยา, HD ช่วยกำจัด cefepime ได้"],
  "Tramadol / theophylline / bupropion / lithium": ["Tramadol metabolite สะสมใน CKD", "Theophylline toxicity (level > 20 µg/mL): hypokalemia, tachyarrhythmia, seizure มักเกิดที่ level สูงกว่านี้มาก", "Lithium toxicity: tremor, ataxia, confusion นำก่อน seizure, ข้อบ่งชี้ HD ตาม EXTRIP"],
  "Alcohol or benzodiazepine withdrawal": ["Tremor, autonomic hyperactivity", "Delirium tremens 48-96 ชั่วโมงหลังหยุด alcohol"],
  "CNS lupus / APS": ["Seizure ใน SLE ราว 10-20% แต่ต้องแยก infection, PRES, uremia, electrolyte และยาก่อนสรุปว่าเป็น NPSLE", "aPL positive เพิ่ม risk ของ seizure และ stroke", "MRI white matter lesions (ไม่จำเพาะ และ MRI ปกติได้)"],
  "Opportunistic CNS infection in KT": ["Toxoplasma: ring-enhancing lesions, เสี่ยงเมื่อ D+/R− หรือไม่ได้ TMP-SMX prophylaxis", "Nocardia: brain abscess กับ lung nodule", "HSV encephalitis: temporal lobe lesion, CSF HSV PCR"],
  "Meningitis / encephalitis": ["LP: CSF cell, glucose, protein", "Listeria ใน elderly และ immunosuppressed", "Eosinophilic meningitis (Angiostrongylus) ในไทย"],
  "Subtherapeutic anticonvulsant after dialysis": ["Levetiracetam: supplemental dose 250-500 mg หลัง HD", "Phenytoin: ดู free level เพราะ protein binding ลดใน uremia และ hypoalbuminemia (total level ต่ำหลอก)", "Valproate free fraction สูง"]
};

KEYX.thirst = {
  "Hyperglycemia": ["Plasma glucose > 180-200 mg/dL เกิน renal threshold ทำให้ osmotic diuresis", "Polyuria, nocturia, weight loss", "HbA1c (เชื่อถือได้น้อยลงใน advanced CKD, dialysis และผู้ได้ ESA)"],
  "SGLT2 inhibitor / urea diuresis": ["SGLT2 inhibitor: urine glucose สูงทั้งที่ plasma glucose ปกติ", "Urea diuresis: high protein feeding, catabolism, recovery ATN", "Solute diuresis: urine osmolality > 300 mOsm/kg และ solute excretion > 1,000 mOsm/วัน"],
  "Sicca: Sjogren / anticholinergic": ["Dry mouth อย่างเดียวไม่ทำให้ polyuria (แต่ Sjögren มี nephrogenic DI จาก TIN ร่วมได้)", "Schirmer, anti-Ro", "Anticholinergic: urinary retention, constipation"],
  "Central DI": ["Pituitary surgery, trauma, craniopharyngioma, hypophysitis, sarcoid, LCH", "Hypotonic polyuria: urine > 3 L/วัน และ urine osmolality < 300 mOsm/kg (พบใน DI ทุกชนิดและ primary polydipsia)", "Hypertonic saline-stimulated copeptin ≤ 4.9 pmol/L", "หลัง water deprivation, desmopressin เพิ่ม urine osmolality > 50% ใน complete central DI (partial เพิ่ม 9-50%)"],
  "Nephrogenic DI: lithium": ["Concentrating defect เกิดได้ตั้งแต่สัปดาห์ถึงเดือนแรกของ lithium และอาจไม่หายถ้าใช้มานานหลายปี", "Amiloride ลด lithium entry ผ่าน ENaC", "Lithium นาน 10-20 ปี: chronic TIN, microcyst, interstitial fibrosis", "มี hypercalcemia จาก lithium-induced hyperparathyroidism ร่วมได้ (ซ้ำเติม NDI)"],
  "Nephrogenic DI: hypercalcemia / hypokalemia": ["Ca > 11 mg/dL", "K < 3.0 mmol/L นานหลายสัปดาห์", "Concentrating defect มัก reversible หลังแก้ electrolyte (ใช้เวลาเป็นสัปดาห์)"],
  "Nephrogenic DI: tubulointerstitial disease": ["Urine concentrating defect ทั้งที่ GFR ยังดี", "Sickle cell nephropathy: hyposthenuria", "Partial หรือ chronic obstruction และช่วงหลังแก้ obstruction ทำให้ concentrating defect"],
  "Congenital NDI (AVPR2, AQP2)": ["AVPR2: X-linked ราว 90% (เพศชาย), AQP2: autosomal recessive หรือ dominant (หญิงเป็นได้)", "Hypernatremic dehydration ในทารก", "Non-obstructive hydronephrosis และ bladder ใหญ่จาก urine flow สูง"],
  "Gestational DI": ["Third trimester", "Desmopressin ได้ผล เพราะไม่ถูก vasopressinase ทำลาย", "สัมพันธ์กับ preeclampsia และ AFLP"],
  "Primary polydipsia": ["Serum Na อยู่ช่วงล่างของค่าปกติ, urine osmolality ต่ำ", "Schizophrenia, anxiety", "Hyponatremia เมื่อดื่มมากเกิน excretion capacity"],
  "Dipsogenic: hypothalamic lesion, drug": ["Sarcoid, LCH", "Thirst threshold ต่ำผิดปกติ"],
  "Volume depletion / salt wasting": ["Orthostatic hypotension", "Urine Na < 20 mmol/L ใน extrarenal loss, สูงใน renal salt wasting หรือ diuretic"],
  "Hypernatremia": ["Elderly ที่ thirst ลดหรือเข้าถึงน้ำไม่ได้", "Na > 145 mmol/L"],
  "Hyperangiotensinemia: CHF, renovascular": ["Angiotensin II กระตุ้น thirst center", "Hyponatremia ใน HF เกิดจาก non-osmotic ADH release ร่วมกับ thirst ที่เพิ่ม"]
};

KEYX.hearing = {
  "Alport syndrome": ["Hearing loss ไม่ใช่ congenital, newborn hearing screen ปกติ", "Anterior lenticonus, dot-and-fleck retinopathy", "EM: GBM thinning ในระยะแรก ต่อมา thickening และ lamellation แบบ basket-weave"],
  "Maternally inherited diabetes and deafness (MIDD)": ["m.3243A>G", "Metformin หลีกเลี่ยง (lactic acidosis)"],
  "Fabry disease": ["High-frequency SNHL, sudden hearing loss", "Angiokeratoma, cornea verticillata", "ชาย: α-Gal A activity ต่ำ, หญิง: enzyme ปกติได้ ต้องตรวจ GLA gene ร่วมกับ lyso-Gb3"],
  "Distal RTA with deafness (ATP6V1B1, ATP6V0A4)": ["Autosomal recessive", "Enlarged vestibular aqueduct", "Nephrocalcinosis, growth failure"],
  "Branchio-oto-renal syndrome / CHARGE / Bartter type IV": ["BOR (EYA1): preauricular pit, branchial fistula, CAKUT", "Bartter IV (BSND): antenatal, SNHL", "CHARGE: coloboma, choanal atresia"],
  "Granulomatosis with polyangiitis": ["Conductive จาก otitis media, SNHL จาก vasculitis", "Mastoiditis", "PR3-ANCA บวกในส่วนใหญ่ แต่ limited ENT disease อาจ ANCA ลบ"],
  "Cogan syndrome": ["Interstitial keratitis กับ vestibuloauditory dysfunction", "Aortitis, aortic regurgitation", "Young adult"],
  "Relapsing polychondritis / SLE / sarcoid": ["Auricular chondritis ที่เว้น ear lobule"],
  "Aminoglycoside / vancomycin": ["Gentamicin เด่นที่ vestibulotoxicity, amikacin เด่นที่ cochleotoxicity", "MT-RNR1 m.1555A>G เพิ่ม susceptibility แม้ได้ aminoglycoside ขนาดปกติ", "Cumulative dose และ trough สูงใน CKD", "Aminoglycoside ototoxicity มัก irreversible, vancomycin เดี่ยวๆ ทำ ototoxicity น้อยมาก"],
  "Loop diuretic (IV bolus ขนาดสูง)": ["Rapid IV bolus furosemide > 4 mg/min", "Ethacrynic acid เสี่ยงสูงกว่า", "ให้ร่วมกับ aminoglycoside หรือ cisplatin เพิ่ม risk", "มักเป็น transient, ให้ช้าหรือ continuous infusion ลด peak level"],
  "Cisplatin": ["Bilateral high-frequency SNHL, tinnitus, ขึ้นกับ cumulative dose, มัก irreversible", "Children เสี่ยงสูง"],
  "Deferoxamine / salicylate": ["Deferoxamine ใน aluminum หรือ iron overload ใน dialysis", "Salicylate: reversible tinnitus"],
  "Uremic / dialysis-related SNHL": ["High-frequency SNHL ใน ESKD", "Sudden hearing loss ระหว่าง HD มีรายงาน", "ต้องแยก ototoxic drug (aminoglycoside, loop diuretic) ก่อนสรุปว่าเป็นจาก uremia"],
  "Syphilis / CMV / meningitis sequelae": ["Otosyphilis: serum RPR และ treponemal test (CSF ปกติได้), รักษาแบบ neurosyphilis", "Congenital CMV", "Bacterial meningitis"]
};

KEYX.eye = {
  "TINU syndrome": ["Uveitis เกิดก่อน AIN (ไม่เกิน 2 เดือน) พร้อมกัน หรือตามหลัง AIN ได้ถึง 12 เดือน", "Nephritis ตอบสนองต่อ steroid ดี แต่ uveitis เป็นซ้ำได้บ่อย", "Exclude sarcoid, Sjögren, TB, syphilis"],
  "Sarcoidosis": ["Granulomatous uveitis, vitreous snowball", "Hypercalcemia, nephrocalcinosis, granulomatous TIN", "ACE และ lysozyme สูงได้ แต่ sensitivity และ specificity ต่ำ (ค่าปกติไม่ exclude)"],
  "Sjogren / IgG4-RD": ["Dry eye, Schirmer ≤ 5 mm ใน 5 นาที", "IgG4: orbital pseudotumor, lacrimal gland enlargement"],
  "Drug-induced: bisphosphonate, rifabutin, ICI": ["Bisphosphonate: scleritis, uveitis", "Rifabutin uveitis: เสี่ยงเพิ่มเมื่อให้ร่วม clarithromycin หรือ azole (rifabutin level สูงขึ้น)", "ICI uveitis และ AIN"],
  "ANCA vasculitis": ["Necrotizing scleritis, PUK", "Orbital pseudotumor ใน GPA", "Retinal vasculitis"],
  "RA / SLE / relapsing polychondritis": ["RA: scleromalacia perforans", "SLE: retinal vasculopathy, cotton wool"],
  "Behcet disease": ["Hypopyon uveitis, occlusive retinal vasculitis", "Oral ulcer, pathergy", "Kidney involvement: AA amyloidosis (พบน้อย)"],
  "Spondyloarthritis / IBD": ["Unilateral acute anterior uveitis, photophobia", "HLA-B27", "Kidney involvement: IgAN และ AA amyloidosis"],
  "Vogt-Koyanagi-Harada": ["Asian, pigmented skin", "Serous retinal detachment", "Poliosis, alopecia, vitiligo"],
  "CMV retinitis in KT": ["Pizza pie, painless", "D+/R−", "Blood CMV PCR ลบหรือต่ำได้ใน retinitis จึงต้องวินิจฉัยด้วย dilated fundoscopy"],
  "Tuberculosis / syphilis": ["TB choroiditis, serpiginous", "Ocular syphilis เลียนแบบ uveitis ได้ทุกชนิด: ตรวจ RPR และ treponemal test, รักษาแบบ neurosyphilis"],
  "Endophthalmitis / fungal": ["Candidemia ต้อง dilated fundoscopy", "Pain, vision loss, hypopyon"],
  "Toxoplasma / HSV / VZV": ["Toxoplasma: headlight in fog", "ARN: VZV หรือ HSV, rapid necrosis"],
  "Subconjunctival hemorrhage": ["Painless, vision ปกติ", "Uremic bleeding, HTN, anticoagulation"],
  "Conjunctival calcification (red eye of renal failure)": ["Ca x PO4 สูง", "Band keratopathy", "Gritty eye"],
  "Infectious or allergic conjunctivitis": ["Discharge, itch", "Adenovirus"]
};

KEYX.sicca = {
  "Tubulointerstitial nephritis": ["Lymphoplasmacytic infiltrate บน biopsy", "Cr ขึ้นช้า, tubular proteinuria", "ตอบสนองต่อ steroid ถ้า interstitial fibrosis ยังน้อย"],
  "Distal RTA / hypokalemic paralysis": ["Hypokalemia รุนแรงจน paralysis", "Nephrocalcinosis, stone"],
  "Nephrogenic DI / Fanconi / Gitelman-like": ["Polyuria, low urine osmolality", "Glycosuria, phosphaturia", "Hypokalemia, hypomagnesemia"],
  "Cryoglobulinemic MPGN / MN": ["C4 ต่ำ, RF บวก", "Purpura"],
  "IgG4-related TIN / MN / RPF": ["Serum IgG4 > 135 mg/dL (ไม่จำเพาะ และค่าปกติไม่ exclude)", "Storiform fibrosis, IgG4+ plasma cell > 10/hpf", "ตอบสนองต่อ steroid เร็ว แต่ relapse บ่อย"],
  "Sarcoidosis (Heerfordt)": ["Uveoparotid fever", "Facial palsy", "Hypercalcemia"],
  "Amyloidosis / lymphoma": ["Salivary gland infiltration", "Serum FLC และ immunofixation"],
  "HCV": ["Sicca จาก HCV มัก anti-Ro และ anti-La ลบ", "Cryoglobulinemia, MPGN"],
  "HIV (diffuse infiltrative lymphocytosis syndrome)": ["CD8 lymphocytosis", "Parotid enlargement", "Interstitial nephritis"],
  "Mumps / bacterial parotitis": ["Bacterial: ผู้สูงอายุที่ dehydrated, หนองจาก Stensen duct, S. aureus"],
  "Anticholinergic / antidepressant / diuretic": ["Drug review"],
  "Diabetes / hypercalcemia": ["ตรวจ plasma glucose และ serum Ca เมื่อ dry mouth มากับ polyuria"]
};

KEYX.ent = {
  "Granulomatosis with polyangiitis": ["Biopsy: granuloma, vasculitis, necrosis (nasal biopsy yield ต่ำ)", "Chronic otitis media ไม่ตอบสนอง antibiotic"],
  "Eosinophilic granulomatosis with polyangiitis": ["MPO-ANCA บวกเพียงราว 30-40% (ANCA ลบไม่ exclude), กลุ่ม ANCA บวกมี GN บ่อยกว่า"],
  "Cocaine / levamisole-induced vasculitis": ["Urine toxicology", "Neutropenia, agranulocytosis", "Lesion ดีขึ้นเมื่อหยุด cocaine และเป็นซ้ำเมื่อใช้ใหม่"],
  "Drug-induced ANCA vasculitis (PTU, hydralazine)": ["ส่วนใหญ่ดีขึ้นหลังหยุดยา แต่ organ-threatening disease ต้องให้ immunosuppression"],
  "Extranodal NK/T-cell lymphoma, nasal type": ["EBER in situ hybridization บวก, plasma EBV DNA สูง", "Asia", "ต้อง biopsy ลึกและอาจต้องซ้ำ เพราะ necrosis มาก"],
  "SLE": ["Oral ulcer มักมาพร้อม active SLE"],
  "Behcet disease": ["Oral aphthous ulcer ≥ 3 ครั้งต่อปี (ISG criteria)", "Genital ulcer ที่หายแล้วเหลือ scar"],
  "Drug: MTX, mTOR inhibitor, MMF, NSAID": ["mTOR inhibitor stomatitis มักเกิดช่วงเดือนแรกๆ หลังเริ่มยา และขึ้นกับ dose", "MTX toxicity เมื่อ GFR ลด: mucositis ร่วมกับ pancytopenia"],
  "Uremic bleeding / anticoagulation": ["Epistaxis ระหว่างหรือหลัง HD ที่ได้ heparin"],
  "Severe HTN / thrombocytopenia": ["BP > 180/120 mmHg", "Platelet < 20,000/µL"],
  "Invasive fungal sinusitis (mucormycosis, aspergillosis)": ["Black necrotic turbinate", "DKA, deferoxamine, KT, neutropenia", "Biopsy ด่วน: Mucorales เป็น broad pauciseptate hyphae กับ angioinvasion, Aspergillus เป็น septate hyphae แตกแขนงมุมแหลม"],
  "Relapsing polychondritis": ["Airway collapse", "Saddle nose", "GN พบน้อย"]
};

KEYX.raynaud = {
  "Systemic sclerosis": ["Digital pitting scar, ulcer", "Nailfold capillaroscopy abnormal", "Puffy fingers", "Calcinosis"],
  "SLE / MCTD": ["Anti-U1 RNP titer สูงใน MCTD", "Raynaud ใน SLE ราวหนึ่งในสาม"],
  "Cryoglobulinemia": ["Type I: Waldenström, myeloma, hyperviscosity", "Type II และ III: HCV, low C4, purpura", "เก็บและส่งเลือดที่ 37 °C ตลอด ไม่เช่นนั้น false negative"],
  "Cold agglutinin disease / Waldenström": ["Acrocyanosis และ hemolysis เมื่อสัมผัสความเย็น", "IgM kappa", "DAT บวกต่อ C3d (IgG ลบ)"],
  "Cholesterol emboli / endocarditis / cardioembolism": ["Cholesterol emboli: pulse ยังคลำได้ (อุดระดับ small artery)", "Cholesterol emboli: eosinophilia, complement ต่ำได้"],
  "Thromboangiitis obliterans / atherosclerosis": ["Buerger: young male smoker, superficial thrombophlebitis, corkscrew collaterals"],
  "Vasculitis: PAN, ANCA": ["ตรวจ ANCA และ HBsAg (HBV-associated PAN)", "Biopsy"],
  "Hemodialysis access-induced distal ischemia (HAIDI, steal syndrome)": ["Brachial artery-based access, DM, PAD", "Pain เป็นมากขึ้นระหว่างฟอก", "กด access ชั่วคราวแล้ว distal pulse และอาการดีขึ้น"],
  "Ischemic monomelic neuropathy": ["Risk: DM, PAD", "มืออุ่น คลำ radial pulse ได้ (ต่างจาก steal ที่มือเย็นซีด)"],
  "Primary Raynaud": ["Onset < 30 ปี", "Symmetric, ไม่มี ulcer", "LeRoy and Medsger 1992 criteria"]
};

KEYX.skinthick = {
  "Scleroderma renal crisis": ["Hypertension ใหม่ > 150/85 mmHg หรือ SBP เพิ่ม ≥ 30 mmHg จาก baseline", "MAHA, thrombocytopenia", "Cr ขึ้น ≥ 50% จาก baseline", "Biopsy: onion-skin, mucoid intimal thickening", "รักษาด้วย ACEi titrate เร็ว แต่การให้ ACEi ป้องกันล่วงหน้าไม่ลดการเกิด SRC"],
  "ANCA-associated GN in SSc": ["MPO-ANCA เป็นส่วนใหญ่", "Crescentic GN", "BP มักปกติและไม่มี MAHA ต่างจาก SRC"],
  "Membranous nephropathy and other non-crisis GN in SSc": ["MN จาก D-penicillamine (ยาที่เคยใช้รักษา SSc)"],
  "Limited cutaneous SSc (CREST) with PAH": ["PAH screening ทุกปี (DETECT)", "DLCO ลด", "Digital ulcer"],
  "Nephrogenic systemic fibrosis": ["eGFR < 30, AKI หรือ dialysis ที่ได้ group I (linear) GBCA, group II เสี่ยงต่ำมาก", "Deep skin biopsy: CD34+ fibrocytes", "บางรายดีขึ้นเมื่อ kidney function ฟื้นหรือหลัง KT"],
  "Scleromyxedema": ["IgG lambda paraprotein", "Dermato-neuro syndrome"],
  "Scleredema": ["DM type 1 หรือ 2 คุมไม่ดี", "Post-streptococcal", "Monoclonal gammopathy"],
  "Eosinophilic fasciitis": ["Groove sign, peau d'orange", "Hands และ feet spared", "Eosinophilia, hypergammaglobulinemia, MRI fascia"],
  "AL amyloid / POEMS skin": ["POEMS: VEGF สูง, polyneuropathy, monoclonal lambda plasma cell disorder"],
  "Chronic GVHD / drug (bleomycin, taxane) / porphyria cutanea tarda": ["Chronic GVHD หลัง HSCT มี nephrotic syndrome (MN) ร่วมได้", "PCT: sclerodermoid plaque ที่ sun-exposed area, พบใน HD และ HCV"]
};

KEYX.skinulcer = {
  "Calciphylaxis (calcific uremic arteriolopathy)": ["Risk: female, obesity, warfarin, DM, hypoalbuminemia, Ca x PO4 สูง, PTH ผิดปกติ", "Bone scan uptake ใน soft tissue", "Skin biopsy (ทำเมื่อ diagnosis ไม่ชัด เพราะเสี่ยงแผลใหม่): medial calcification ของ arteriole, intimal fibrosis, thrombosis", "Mortality 1 ปีราวครึ่ง"],
  "Warfarin necrosis / protein C deficiency": ["Breast, thigh, buttock", "Protein C deficiency", "มักเกิดเมื่อเริ่ม warfarin ขนาดสูงโดยไม่ได้ bridge ด้วย heparin"],
  "Antiphospholipid syndrome / livedoid vasculopathy": ["Painful punched-out ulcer ที่ข้อเท้า"],
  "Cholesterol emboli": ["Eosinophilia, complement ต่ำ (พบเพียงบางราย)", "Biopsy cholesterol cleft"],
  "Type I cryoglobulinemia / cryofibrinogenemia": ["Monoclonal IgG หรือ IgM", "Cold-induced acral necrosis", "Hyperviscosity"],
  "Oxalosis / hyperviscosity": ["Plasma oxalate สูง", "PH1 ใน ESKD", "Livedo"],
  "Polyarteritis nodosa (cutaneous or systemic)": ["Deep skin biopsy ให้ถึง medium-sized artery: fibrinoid necrosis", "ตรวจ HBsAg, ANCA มักลบ"],
  "ANCA vasculitis": ["Purpura, nodule", "ANCA บวก (ANCA ลบไม่ exclude)"],
  "Mixed cryoglobulinemia / IgA vasculitis": ["Mixed cryoglobulinemia: C4 ต่ำ, RF บวก", "IgA vasculitis: IgA deposit ที่ผนังหลอดเลือดบน DIF ของ skin biopsy"],
  "Levamisole-adulterated cocaine": ["Retiform purpura ที่ใบหู"],
  "Pancreatic panniculitis": ["Lipase สูง", "Pancreatitis หรือ acinar cell carcinoma"],
  "Necrotizing infection / ecthyma / fungal": ["Ecthyma gangrenosum: Pseudomonas", "Mucormycosis"],
  "Pyoderma gangrenosum": ["Pathergy, ไม่ควร debride"],
  "Diabetic foot / PAD / pressure ulcer": ["Neuropathic plantar ulcer", "Probe-to-bone (osteomyelitis)", "Toe-brachial index (ABI สูงปลอมจาก medial calcification)"]
};

KEYX.bluetoe = {
  "Atheroembolic renal disease (cholesterol crystal embolism)": ["Onset เป็นวันถึงหลายสัปดาห์หลังหัตถการ (ช้ากว่า contrast nephropathy)", "Biopsy: biconvex clefts ใน arcuate และ interlobular arteries", "มีรายงาน anticoagulant และ thrombolytic เป็น trigger (ถามประวัติเริ่มยาก่อนมีอาการ)", "Spontaneous ได้ในคน atherosclerosis รุนแรง"],
  "Infective endocarditis": ["Blood culture", "Murmur", "Splenomegaly"],
  "Antiphospholipid syndrome": ["aPL บวก 2 ครั้ง ห่างกัน ≥ 12 สัปดาห์", "Kidney: TMA (APS nephropathy)"],
  "Cryoglobulinemia / cold agglutinin": ["ตรวจ cryoglobulin (เก็บเลือดที่ 37 °C) และ cold agglutinin titer"],
  "Vasculitis: PAN, ANCA, Buerger": ["ตรวจ ANCA และ HBsAg", "Buerger: ชายอายุน้อยที่สูบบุหรี่"],
  "Peripheral arterial disease in CKD": ["Medial calcification ทำ ABI สูงปลอม", "Toe pressure < 30 mmHg เข้าเกณฑ์ chronic limb-threatening ischemia", "Amputation risk สูงใน dialysis"],
  "Acute limb ischemia (embolic or thrombotic)": ["6P", "แหล่ง emboli: AF, mural thrombus"],
  "Aortic dissection / thrombosis": ["Saddle embolus ที่ aortic bifurcation: ขาสองข้างขาดเลือดเฉียบพลัน", "Leriche syndrome: claudication ที่สะโพก, erectile dysfunction, femoral pulse เบา"],
  "Vasopressor / ergot / cocaine": ["Symmetric acral ischemia โดย proximal pulse ปกติ"]
};

KEYX.bleeding = {
  "Uremic platelet dysfunction": ["Bleeding time สั้นลงหลัง DDAVP 0.3 µg/kg IV (ออกฤทธิ์ใน 1 ชั่วโมง นาน 4-8 ชั่วโมง, ให้ซ้ำเกิด tachyphylaxis)", "Conjugated estrogen 0.6 mg/kg/วัน IV 5 วัน ออกฤทธิ์ช้าแต่อยู่นานราว 2 สัปดาห์"],
  "Acquired von Willebrand (Heyde, hypothyroidism, MGUS)": ["Loss of high-molecular-weight multimers", "Heyde syndrome หายหลังแก้ aortic stenosis (AVR หรือ TAVR)"],
  "Heparin-induced thrombocytopenia": ["4T score 0-3 โอกาสเป็น HIT ต่ำมาก, 4 ขึ้นไปส่ง anti-PF4", "Anti-PF4 ELISA, SRA", "HIT ทำให้เกิด thrombosis มากกว่า bleeding แม้ platelet ต่ำ"],
  "Hypersplenism / marrow failure / HLH": ["Splenomegaly", "HLH: ferritin สูงมาก, cytopenia, triglyceride สูง, fibrinogen ต่ำ"],
  "Drug: linezolid, valganciclovir, MMF, azathioprine": ["Linezolid > 14 วัน", "Valganciclovir ที่ไม่ได้ปรับขนาดตาม GFR", "Azathioprine: TPMT หรือ NUDT15 variant (NUDT15 พบบ่อยในเอเชีย) หรือได้ร่วมกับ allopurinol, febuxostat"],
  "Anticoagulant accumulation": ["Enoxaparin สะสมเมื่อ CrCl < 30 mL/min (ติดตามด้วย anti-Xa)", "Dabigatran ขับทางไตราว 80% จึงสะสมมากที่สุดในกลุ่ม DOAC, dialyzable", "Warfarin: INR แกว่งและ bleeding risk สูงขึ้นใน advanced CKD"],
  "AL amyloid with factor X deficiency": ["Factor X binding to amyloid fibril in spleen", "Factor X level < 50%"],
  "Acquired hemophilia / LA / nephrotic factor loss": ["Acquired hemophilia A: elderly, postpartum, factor VIII inhibitor", "Nephrotic: เสีย factor IX, XI, XII ทาง urine ทำ aPTT ยาว แต่ bleeding จริงพบน้อย", "Lupus anticoagulant ทำ thrombosis ไม่ใช่ bleeding ยกเว้นมี hypoprothrombinemia หรือ thrombocytopenia ร่วม"],
  "DIC": ["ISTH score ≥ 5"],
  "Glucocorticoid excess / senile purpura": ["Cushingoid"],
  "Scurvy": ["Vitamin C deficiency ใน dialysis (เสียทาง dialysate และจำกัดผักผลไม้)"],
  "Amyloid vascular infiltration / Ehlers-Danlos": ["Pinch purpura"],
  "IgA vasculitis / cryoglobulinemia": ["Palpable purpura ที่ขาและก้น"]
};

KEYX.thrombosis = {
  "Renal vein thrombosis": ["Doppler, CT venography", "MN เสี่ยงสูงสุด โดยเฉพาะ albumin < 2.5 g/dL (BCG) หรือ < 2.0 g/dL (BCP)", "Acute: flank pain, kidney ใหญ่, hematuria, Cr ขึ้น"],
  "DVT / PE in nephrotic syndrome": ["Albumin < 2.5 g/dL (BCG) หรือ < 2.0 g/dL (BCP) ใน MN เพิ่ม VTE risk ชัดเจน", "Antithrombin loss ทาง urine ทำ heparin resistance", "Prophylactic anticoagulation ตาม albumin และ bleeding risk (GN-risk tool)"],
  "Arterial thrombosis in nephrotic": ["Children, MN"],
  "APS nephropathy": ["Revised Sapporo 2006, ACR/EULAR 2023", "TMA ใน kidney biopsy", "Warfarin (ไม่ใช่ DOAC) ใน triple positive"],
  "Catastrophic APS": ["Mortality ราวหนึ่งในสามแม้ได้รับการรักษา", "Triple therapy: anticoagulation, steroid, plasma exchange หรือ IVIG", "Eculizumab ใน refractory"],
  "Heparin-induced thrombocytopenia": ["Access thrombosis", "Venous thrombosis บ่อยกว่า arterial", "หยุด heparin ทุกรูปแบบ รวม catheter lock และ flush"],
  "Paroxysmal nocturnal hemoglobinuria": ["Flow cytometry: ขาด CD55 และ CD59 (หรือ FLAER) บน granulocyte และ RBC", "Hemosiderinuria"],
  "Myeloproliferative neoplasm / post-transplant erythrocytosis": ["JAK2 V617F บวกใน polycythemia vera", "Post-transplant erythrocytosis มักเกิดใน 8-24 เดือนหลัง KT และตอบสนองต่อ ACEi หรือ ARB"],
  "Cancer-associated thrombosis": ["LMWH หรือ DOAC (ปรับตาม eGFR)"],
  "ESA / estrogen / tranexamic acid": ["ESA ที่ตั้งเป้า Hb ≥ 13 g/dL เพิ่ม thrombosis และ stroke (CHOIR, TREAT)", "Estrogen-containing OCP ใน nephrotic syndrome เพิ่ม VTE risk"],
  "Vascular access thrombosis / central vein stenosis": ["Venous outflow stenosis เป็นสาเหตุหลักของ AVF และ AVG thrombosis", "ปัจจัยร่วม: hypotension หลังฟอก, กด access นานเกิน, hypercoagulable state", "Thrill และ bruit หายไป"],
  "Protein C, S, antithrombin deficiency / factor V Leiden": ["ระดับ protein C, S, antithrombin แปลผลไม่ได้ช่วง acute thrombosis หรือขณะได้ anticoagulant (warfarin ลด protein C และ S, heparin ลด antithrombin)", "Nephrotic syndrome ทำให้ antithrombin ต่ำแบบ acquired จากการเสียทาง urine (ไม่ใช่ inherited)", "Factor V Leiden และ prothrombin G20210A พบน้อยมากในคนไทย ที่พบบ่อยกว่าคือ protein C, protein S, antithrombin deficiency"],
  "Behcet / IBD / hyperhomocysteinemia": ["Homocysteine สูงพบบ่อยใน CKD (เป็น association, การให้ folate ไม่ลด event)"]
};
