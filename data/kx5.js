/* Extra clinical discriminators, part 5: stroke, back pain, lymph node, cushingoid, paroxysm, obesity, wasting, tremor, RLS, short stature. Also kxapply merges all KEYX into TREES. */
window.KEYX = window.KEYX || {};

KEYX.stroke = {
  "Ruptured intracranial aneurysm in ADPKD": ["Rupture อายุเฉลี่ยราว 40 ปี (น้อยกว่าคนทั่วไปราว 10 ปี)", "Screen MRA ถ้ามี family history aneurysm หรือ SAH, high-risk occupation, ก่อน major surgery", "Thunderclap headache, meningism"],
  "Hypertensive ICH": ["Chronic HT, LVH, retinopathy", "Deep microbleeds บน SWI", "Acute ICH: SBP เป้า 140 mmHg (ช่วง 130-150)"],
  "Anticoagulant / uremic bleeding / subdural": ["ESKD เพิ่ม ICH risk หลายเท่า", "Warfarin INR labile ใน HD", "Reversal: warfarin ใช้ PCC ร่วมกับ vitamin K, dabigatran ใช้ idarucizumab, factor Xa inhibitor ใช้ andexanet alfa หรือ PCC"],
  "Cerebral amyloid angiopathy / vasculitis / RCVS": ["CAA: lobar microbleeds, cortical superficial siderosis, elderly", "RCVS: thunderclap ซ้ำ, postpartum, serotonergic", "Boston criteria 2.0"],
  "Atrial fibrillation in CKD / dialysis": ["CHA2DS2-VA และ HAS-BLED (validate ใน dialysis ได้ไม่ดี)", "Warfarin calciphylaxis risk ใน dialysis", "Apixaban ใน ESKD: มีเพียง RCT ขนาดเล็ก (RENAL-AF, AXADIA) ยังสรุป efficacy เทียบ warfarin ไม่ได้"],
  "Infective endocarditis": ["Mycotic aneurysm", "ไม่ให้ IV thrombolysis ใน stroke จาก IE (hemorrhagic transformation สูง), anticoagulation ชั่งเป็นรายบุคคล", "TEE เมื่อ TTE ลบแต่ยังสงสัย"],
  "Libman-Sacks / marantic endocarditis": ["Libman-Sacks: SLE หรือ aPL บวก", "Marantic: mucin-producing adenocarcinoma"],
  "Fabry disease": ["Dolichoectasia ของ basilar artery", "Pulvinar sign บน T1", "Stroke อาจเป็นอาการแรกในผู้หญิง heterozygote", "Lyso-Gb3, GLA testing ใน young cryptogenic stroke"],
  "Antiphospholipid syndrome": ["aPL บวก 2 ครั้ง ห่างกัน ≥ 12 สัปดาห์", "Livedo, thrombocytopenia, recurrent miscarriage", "Warfarin INR 2-3 (ไม่ใช้ DOAC ใน arterial thrombosis หรือ triple positive)"],
  "TTP": ["ADAMTS13 activity < 10%", "Fluctuating deficit", "Troponin สูงบ่งชี้ cardiac involvement"],
  "CNS vasculitis / SLE / Behcet": ["Neuro-Behcet: brainstem, CVT", "Stroke ใน SLE ส่วนใหญ่มาจาก aPL, emboli หรือ atherosclerosis มากกว่า true vasculitis", "Angiography: beading (ไม่จำเพาะ พบใน RCVS ด้วย)"],
  "Moyamoya / fibromuscular dysplasia / dissection": ["FMD: young women, renal artery string of beads, carotid dissection, aneurysm", "Moyamoya: renovascular HT ร่วม (NF1, Asian)", "Dissection: neck pain, Horner"],
  "MELAS / mitochondrial": ["Stroke-like lesion ไม่ตาม vascular territory", "Lactate สูง, m.3243A>G", "Deafness, diabetes, short stature, FSGS"],
  "Atherosclerosis in CKD": ["Symptomatic carotid stenosis 70-99%: พิจารณา revascularization", "CKD เพิ่ม stroke risk และ outcome แย่", "Statin ลด ischemic stroke ใน non-dialysis CKD (SHARP) แต่เริ่มใหม่ใน dialysis ไม่เห็นประโยชน์ชัด (4D, AURORA)"],
  "Lacunar infarct / small vessel disease": ["Hypertension, DM, CKD", "Pure motor, pure sensory, ataxic hemiparesis", "White matter hyperintensity"],
  "Hypoglycemia / hyponatremia": ["ตรวจ capillary glucose ทุกรายที่มี acute focal deficit", "Deficit หายเมื่อแก้ glucose หรือ Na"],
  "PRES": ["Trigger: BP สูงเฉียบพลัน, CNI, eclampsia", "MRI FLAIR: vasogenic edema เด่นที่ parieto-occipital (พบตำแหน่งอื่นได้)"],
  "Todd paralysis / CNS infection / tumor": ["Todd paralysis: deficit หลังชัก หายภายใน 48 ชั่วโมง", "Brain abscess: Nocardia, Toxoplasma, Aspergillus ใน KT", "CNS PTLD: ส่วนใหญ่ EBV-positive"]
};

KEYX.backpain = {
  "Multiple myeloma": ["Pathologic vertebral compression fracture", "Cord compression emergency", "Whole-body low-dose CT หรือ MRI", "Hypercalcemia"],
  "Vertebral metastasis / lymphoma": ["Night pain, weight loss", "RCC metastasis lytic, hypervascular", "MRI whole spine"],
  "Pyogenic spondylodiscitis / epidural abscess": ["S. aureus จาก HD catheter", "ESR และ CRP สูง, MRI spine (group II GBCA ใช้ได้เมื่อจำเป็นแม้ใน dialysis)", "Epidural abscess: ปวดหลัง ตามด้วย radicular pain แล้ว weakness (MRI ด่วน)"],
  "Spinal TB (Pott disease)": ["Paradiscal involvement, cold abscess, gibbus", "Constitutional symptoms", "CKD, dialysis และ KT เพิ่ม risk ของ extrapulmonary TB"],
  "Retroperitoneal fibrosis / IgG4-related disease": ["Medial deviation ของ ureter", "ราวครึ่งของ idiopathic RPF เป็น IgG4-related (serum IgG4 ปกติได้)", "Secondary: methysergide, malignancy, radiation"],
  "Aortic aneurysm / dissection": ["Inflammatory AAA กับ ureteral obstruction", "Rupture: shock", "CT angiography"],
  "Retroperitoneal hemorrhage / psoas abscess": ["Femoral access, heparin", "Psoas sign, hip flexion", "Flank ecchymosis (Grey Turner sign) พบช้าและไม่บ่อย"],
  "Osteoporotic vertebral fracture / renal osteodystrophy": ["Height loss, kyphosis", "Risk: steroid, CKD-MBD, หลัง KT", "DXA, vertebral X-ray"],
  "Destructive spondyloarthropathy (dialysis amyloid)": ["Dialysis vintage > 10 ปี", "Disc space narrowing โดยไม่มี osteophyte", "ต้องแยกจาก spondylodiscitis ด้วย MRI และ CRP"],
  "Osteomalacia": ["Looser zone", "ALP สูง, PO4 ต่ำ"],
  "Nephrolithiasis / obstruction": ["Hematuria (ไม่พบได้ราว 10-15% จึงไม่ใช้ exclude)", "CT KUB"],
  "Pyelonephritis / renal abscess": ["Fever, CVA tenderness", "CT ถ้าไม่ดีขึ้นใน 72 ชั่วโมง"],
  "ADPKD cyst complication / renal infarct / RVT": ["Cyst hemorrhage: self-limited", "Renal infarct: LDH สูงมาก, AF", "RVT: nephrotic syndrome โดยเฉพาะ MN"],
  "Axial spondyloarthritis": ["Onset อายุ < 45 ปี ปวดนาน > 3 เดือน, morning stiffness > 30 นาที, ดีขึ้นเมื่อออกกำลัง", "HLA-B27, MRI sacroiliitis", "ASAS criteria"],
  "Mechanical low back pain": ["ไม่มี red flag", "ดีขึ้นใน 4-6 สัปดาห์"]
};

KEYX.lymphnode = {
  "Lymphoma": ["B symptoms, LDH สูง", "Excisional biopsy (FNA ไม่พอ)", "Kidney: MCD (Hodgkin), MPGN, cryoglobulinemia, parenchymal infiltration", "Tumor lysis risk"],
  "CLL / small lymphocytic lymphoma": ["Clonal B lymphocyte ≥ 5,000/µL", "Kidney: MPGN, cryoglobulinemic GN, MCD, interstitial infiltration ของ CLL cell", "Hypogammaglobulinemia"],
  "Metastatic carcinoma": ["Left supraclavicular (Virchow) node ชี้ไป abdominal malignancy เช่น gastric cancer", "Hard, fixed", "FNA เพียงพอสำหรับ carcinoma (ต่างจาก lymphoma)"],
  "Idiopathic multicentric Castleman / TAFRO": ["IL-6 สูง, polyclonal hypergammaglobulinemia (iMCD-NOS)", "TAFRO: IgG ไม่สูง, thrombocytopenia, AKI", "HHV-8 negative"],
  "IgG4-related disease": ["Lymph node histology ไม่จำเพาะ (เกณฑ์ IgG4+ plasma cell > 100/hpf) ควร biopsy อวัยวะอื่นประกอบ", "Storiform fibrosis และ obliterative phlebitis มักไม่พบใน lymph node"],
  "SLE": ["มากับ active SLE และ C3 ต่ำ, node ที่โตเร็ว แข็ง หรือไม่ยุบต้อง biopsy แยก lymphoma", "Histology คล้าย Kikuchi disease ได้"],
  "Kikuchi disease": ["Necrotizing histiocytic lymphadenitis", "Leukopenia, ESR สูง", "Self-limited, SLE ตามมาบางราย"],
  "Sarcoidosis": ["EBUS-TBNA", "Hypercalcemia", "Granulomatous TIN"],
  "Tuberculous lymphadenitis": ["Scrofula, sinus tract", "FNA AFB, GeneXpert", "ตรวจ HIV ทุกราย"],
  "HIV": ["Persistent generalized lymphadenopathy", "Kidney: HIVAN, HIV immune complex kidney disease"],
  "Secondary syphilis": ["Epitrochlear node", "Kidney: MN ที่หายหลังรักษา syphilis"],
  "EBV / CMV / toxoplasma": ["Atypical lymphocyte"],
  "Scrub typhus / melioidosis / cat scratch": ["Scrub typhus: eschar", "Bartonella: culture-negative IE กับ GN ที่ PR3-ANCA บวกได้"],
  "Post-transplant lymphoproliferative disorder": ["EBV viral load สูง (EBV-negative PTLD พบได้ โดยเฉพาะ late onset), PET-CT", "Graft PTLD คล้าย rejection"],
  "DRESS / phenytoin pseudolymphoma": ["Latency 2-8 สัปดาห์หลังเริ่มยา"],
  "Serum sickness (ATG, rituximab)": ["C3 และ C4 ต่ำ", "Self-limited ใน 1-2 สัปดาห์"]
};

KEYX.cushingoid = {
  "Prescribed steroid in GN, LN, KT": ["Prednisolone เกิน physiologic dose (ราว 5 mg/วัน) นาน > 3-4 สัปดาห์ เสี่ยง HPA axis suppression", "PTDM, cataract, glaucoma, AVN, myopathy"],
  "Hidden steroid: ยาสมุนไพร, ยาลูกกลอน, injection": ["Cortisol ต่ำและ ACTH ต่ำ (suppressed) แม้มีอาการ Cushing", "Adrenal crisis เมื่อหยุด", "ยาลูกกลอนพบ dexamethasone บ่อยในไทย"],
  "Drug interaction: ritonavir or cobicistat with fluticasone": ["Iatrogenic Cushing กับ adrenal suppression", "Itraconazole และ azole อื่นทำแบบเดียวกัน"],
  "Cushing disease (pituitary)": ["Microadenoma", "High-dose DST กด cortisol ได้ > 50% (ไม่แม่นพอ ต้องใช้ MRI pituitary)", "Inferior petrosal sinus sampling เมื่อ MRI ไม่เห็น lesion ชัด"],
  "Ectopic ACTH syndrome": ["Small cell lung, carcinoid, MTC, pheo", "ACTH สูงมาก", "Cortisol สูงมากเสี่ยง opportunistic infection เช่น PJP"],
  "Adrenal adenoma / mild autonomous cortisol secretion": ["ACTH suppressed", "HT, DM, osteoporosis", "CT adrenal"],
  "Adrenocortical carcinoma": ["Mass > 4-6 cm, heterogeneous", "Androgen co-secretion", "Hypokalemia"],
  "Bilateral macronodular / PPNAD (Carney)": ["PPNAD: young, Carney complex (myxoma, lentigines)", "PRKAR1A", "ARMC5 ใน macronodular"],
  "CKD and dialysis effect on testing": ["UFC เชื่อถือไม่ได้เมื่อ CrCl < 60 mL/min (ต่ำลวง)", "Late-night salivary cortisol สูงปลอมใน ESKD บางราย", "Endocrine Society แนะนำ 1 mg DST มากกว่า UFC ใน renal failure: ผลปกติช่วย exclude แต่ false positive พบบ่อย"],
  "Alcohol / depression / obesity / PCOS": ["Dex-CRH test"],
  "Cyclosporine / HIV lipodystrophy / Cushingoid look of nephrotic": ["HIV lipodystrophy จาก ART: central fat เพิ่ม แต่แขน ขา และแก้มตอบ"]
};

KEYX.paroxysm = {
  "Pheochromocytoma / paraganglioma": ["Plasma free metanephrines > 3 เท่าของ ULN แทบไม่เป็น false positive (ยกเว้น ESKD และยารบกวน)", "CT หรือ MRI adrenal, Ga-68 DOTATATE", "Alpha-blockade 7-14 วันก่อนผ่าตัด", "Germline testing ทุกราย"],
  "Von Hippel-Lindau disease": ["Bilateral multifocal RCC, kidney cyst", "Hemangioblastoma, retinal angioma"],
  "MEN2 / NF1": ["MEN2: RET, MTC, HPT", "NF1: café-au-lait, renal artery stenosis"],
  "Metanephrine interpretation in CKD / dialysis": ["Plasma free normetanephrine สูงขึ้นใน ESKD ใช้ upper reference ที่ปรับ", "Urine metanephrines ใช้ไม่ได้ใน anuria และเชื่อถือได้น้อยใน advanced CKD", "Plasma 3-methoxytyramine ใน HD ยังไม่มี cut-off เฉพาะ (ค่าสูงผิดปกติได้บ่อยและกระจายมาก) จึงแปลผลได้จำกัด"],
  "Drug interference: TCA, SNRI, levodopa, sympathomimetic": ["หยุดยา 2 สัปดาห์แล้วตรวจซ้ำ", "Phenoxybenzamine false positive", "Acetaminophen รบกวนบาง assay (HPLC-ECD)"],
  "Hypoglycemia": ["Whipple triad"],
  "Thyrotoxicosis": ["TSH ต่ำ", "อาการเป็นต่อเนื่อง ไม่ใช่ paroxysm"],
  "Carcinoid / mastocytosis / menopause": ["Carcinoid: 5-HIAA, liver metastasis, diarrhea", "Mastocytosis: tryptase, Darier sign", "Menopause: hot flush, FSH สูง"],
  "Clonidine or beta-blocker withdrawal": ["Rebound HTN ใน 24-72 ชั่วโมงหลังขาด clonidine (ลืมยา, NPO)", "Rebound tachycardia หลังหยุด beta-blocker"],
  "Cocaine / amphetamine / MAOI with tyramine": ["Urine toxicology"],
  "Panic disorder": ["Diagnosis of exclusion", "Hyperventilation", "Normal metanephrine"],
  "Baroreflex failure / autonomic seizure / PRES": ["Neck radiation, bilateral carotid endarterectomy", "Labile HT สลับ hypotension"]
};

KEYX.obesity = {
  "Obesity-related glomerulopathy": ["Glomerulomegaly กับ perihilar FSGS", "BMI ≥ 30 kg/m² (คนเอเชียเกิดได้ที่ BMI ต่ำกว่านี้)", "Weight loss และ RAASi, SGLT2i, GLP-1 RA ลด proteinuria", "Bariatric surgery ลด proteinuria แต่ malabsorptive procedure (Roux-en-Y) เพิ่ม enteric hyperoxaluria และ oxalate stone"],
  "Nephrolithiasis": ["Uric acid stone: low urine pH (insulin resistance ลด ammoniagenesis)", "Hypercalciuria, hyperoxaluria"],
  "Hyperfiltration and CKD progression": ["eGFR ที่ index ต่อ BSA 1.73 m² ต่ำกว่า absolute GFR จริงใน obesity (ปรับขนาดยาใช้ค่า de-indexed)", "Cystatin C สูงขึ้นตาม fat mass ทำให้ eGFRcys ต่ำกว่าจริงได้"],
  "Cushing syndrome": ["Purple striae > 1 cm", "Proximal myopathy", "1 mg overnight DST"],
  "Hypothyroidism": ["TSH สูง"],
  "Hypothalamic / genetic (Bardet-Biedl, Alstrom)": ["BBS: polydactyly, rod-cone dystrophy, hypogonadism, kidney cysts หรือ dysplasia", "Alström: cardiomyopathy, deafness, no polydactyly", "MC4R deficiency"],
  "OSA and resistant HTN": ["Polysomnography: AHI ≥ 5 ร่วมกับอาการ หรือ AHI ≥ 15", "Aldosterone excess ร่วม", "CPAP ลด BP ได้เพียงเล็กน้อย (ราว 2-3 mmHg)"],
  "Metabolic dysfunction-associated steatotic liver disease": ["FIB-4 แล้วตามด้วย transient elastography", "CKD risk สูงขึ้น"],
  "Gout / hyperuricemia": ["Asymptomatic hyperuricemia: urate-lowering ไม่ชะลอ CKD progression (CKD-FIX, PERL)"],
  "Transplant candidacy and outcomes": ["BMI > 35-40 kg/m² ถูกจำกัดในหลายศูนย์ (ไม่ใช่ข้อห้ามเด็ดขาด)", "Wound dehiscence, lymphocele", "PTDM"],
  "Sarcopenic obesity / obesity paradox in HD": ["Waist circumference และ muscle mass ดีกว่า BMI", "Reverse epidemiology"]
};

KEYX.wasting = {
  "Protein-energy wasting": ["ISRNM 2008: ต้องมี ≥ 3 ใน 4 categories", "SGA, MIS", "Inflammation (CRP)"],
  "Inflammation / dialysis-related": ["CRP สูง", "Catheter, failed graft in situ, periodontitis"],
  "Inappropriate protein restriction": ["DPI < 0.6 g/kg/วัน โดยไม่มี ketoanalog หรือ energy intake ไม่พอ", "nPCR ต่ำ", "KDOQI 2020 nutrition: 0.55-0.6 g/kg/วัน ใน CKD G3-5 ที่ไม่มี DM, metabolically stable และมีการติดตามใกล้ชิด"],
  "Glucocorticoid myopathy": ["Hip flexor weakness", "CK ปกติ", "Fluorinated steroid เสี่ยงกว่า"],
  "Statin / colchicine myopathy": ["CK สูง", "Cyclosporine เพิ่มระดับ statin และ colchicine"],
  "Thyroid / hypogonadism / GH deficiency": ["TSH"],
  "Malignancy / paraprotein (AL amyloid)": ["Amyloid myopathy: pseudohypertrophy, macroglossia", "Cancer cachexia: inflammation"],
  "Chronic infection: TB, HIV": ["Constitutional symptoms", "HIV wasting"],
  "Inflammatory myopathy": ["CK สูง, MRI", "IBM: finger flexor และ quadriceps"],
  "Motor neuron disease / inclusion body myositis": ["ALS: UMN และ LMN, fasciculation", "IBM: elderly, dysphagia"],
  "Sarcopenia (AWGS 2019)": ["5-time chair stand ≥ 12 วินาที", "BIA ASM/ht2 < 7.0 kg/m2 (ชาย), < 5.7 kg/m2 (หญิง)"],
  "Frailty in CKD": ["Clinical Frailty Scale", "Frailty ทำนาย mortality และ falls"]
};

KEYX.tremor = {
  "Calcineurin inhibitor neurotoxicity": ["พบจาก tacrolimus บ่อยกว่า cyclosporine", "Hypomagnesemia ทำให้ tremor เป็นมากขึ้น", "Tremor สัมพันธ์กับ peak level จึงดีขึ้นเมื่อลด dose หรือเปลี่ยนเป็น extended-release tacrolimus"],
  "Lithium toxicity": ["NDI, hypercalcemia, hypothyroid ร่วม", "Interaction: thiazide, ACEi, NSAID เพิ่ม level", "EXTRIP: extracorporeal removal เมื่อ level > 4 mEq/L ร่วมกับ kidney impairment หรือมี decreased consciousness, seizure, dysrhythmia"],
  "Beta-agonist / theophylline / valproate / amiodarone / SSRI": ["Enhanced physiologic tremor, postural", "Valproate: hyperammonemia"],
  "Uremic asterixis / myoclonus": ["Negative myoclonus", "ดีขึ้นหลังเริ่มหรือเพิ่ม dialysis"],
  "Hepatic encephalopathy / hypercapnia": ["Asterixis", "Ammonia, PaCO2"],
  "Gabapentin / pregabalin / opioid / baclofen": ["Myoclonus", "เกิดเมื่อไม่ปรับขนาดตาม GFR, gabapentin, pregabalin และ baclofen กำจัดได้ด้วย HD"],
  "Cefepime / acyclovir / metoclopramide": ["Cefepime: myoclonus, nonconvulsive status epilepticus", "Metoclopramide: extrapyramidal"],
  "Essential tremor / Parkinson disease": ["Essential: bilateral postural tremor, family history, ดีขึ้นหลังดื่ม alcohol", "Parkinson: rest tremor, asymmetric, bradykinesia"],
  "Wilson disease": ["Kayser-Fleischer ring", "Ceruloplasmin ต่ำ, urine copper สูง", "Fanconi, nephrocalcinosis, hematuria"],
  "Cerebellar: alcohol, lithium, stroke, PML": ["Intention tremor, dysmetria", "MRI"],
  "Fragile X tremor ataxia / Fabry / mitochondrial": ["FXTAS: ชายสูงอายุ, middle cerebellar peduncle sign บน MRI", "Mitochondrial: multisystem"]
};

KEYX.rls = {
  "Iron deficiency": ["คนทั่วไป: ferritin ≤ 75 ng/mL หรือ TSAT < 20% ให้ iron, ใน ESKD ใช้ ferritin < 200 ng/mL ร่วมกับ TSAT < 20% (AASM 2025)", "IRLSSG diagnostic criteria"],
  "Uremic RLS": ["Prevalence สูงใน dialysis", "หลัง KT ดีขึ้นเร็ว", "Gabapentin low dose หลังฟอก, dopamine agonist (augmentation risk)"],
  "Drug-induced / exacerbated RLS": ["ดีขึ้นเมื่อหยุดยาที่เป็นสาเหตุ"],
  "Nocturnal leg cramp": ["Palpable muscle contraction", "เป็น cramp ที่เจ็บ ไม่ใช่ urge to move"],
  "Obstructive and central sleep apnea": ["Polysomnography: AHI", "Central apnea พบใน HF, fluid overload และ ESKD"],
  "Periodic limb movement disorder": ["Polysomnography PLMS index", "RLS ร่วม"],
  "Pruritus / pain / nocturia": ["Nocturia ใน CKD", "CKD-associated pruritus"],
  "Melatonin dysregulation / dialysis timing": ["Morning shift, daytime nap", "มีรายงานว่าเปลี่ยนเป็น nocturnal HD ทำให้ sleep ดีขึ้น"]
};

KEYX.shortstature = {
  "X-linked hypophosphatemia": ["PHEX", "TmP/GFR ต่ำ, FGF23 สูง, 1,25(OH)2D ต่ำหรือปกติ (ต่ำเกินควรเมื่อเทียบกับ PO4)"],
  "Hereditary hypophosphatemic rickets with hypercalciuria": ["SLC34A3", "1,25(OH)2D สูง และ FGF23 ต่ำ (แยกจาก XLH)", "รักษาด้วย phosphate อย่างเดียว ไม่ให้ calcitriol (ทำให้ hypercalciuria แย่ลง)"],
  "Nephropathic cystinosis": ["CTNS", "Leukocyte cystine สูง"],
  "Distal RTA (inherited)": ["SLC4A1 (dominant เป็นส่วนใหญ่), ATP6V1B1 และ ATP6V0A4 (recessive)", "Growth กลับมาดีเมื่อแก้ acidosis ด้วย alkali", "Nephrocalcinosis"],
  "Bartter syndrome": ["Antenatal Bartter (type I, II)", "Hypercalciuria, nephrocalcinosis"],
  "Dent disease / Lowe syndrome": ["CLCN5 (Dent 1), OCRL (Dent 2, Lowe)", "Lowe: cataract, intellectual disability", "Progressive CKD"],
  "Nephrogenic DI (congenital)": ["AVPR2, AQP2", "Failure to thrive"],
  "CAKUT / reflux nephropathy": ["PAX2, HNF1B", "Small scarred kidneys", "Recurrent febrile UTI"],
  "Nephronophthisis / ciliopathy": ["NPHP1", "Polyuria, anemia ก่อน CKD", "Senior-Løken, Joubert"],
  "Renal osteodystrophy / steroid in childhood": ["Growth failure ในเด็ก CKD: แก้ nutrition, acidosis และ CKD-MBD ก่อนพิจารณา rhGH"],
  "Schimke immuno-osseous dysplasia": ["SMARCAL1", "Lentigines, T-cell deficiency", "SRNS ไม่ตอบสนอง immunosuppression"],
  "Turner syndrome": ["45,X", "Horseshoe kidney, coarctation, bicuspid aortic valve", "Primary ovarian insufficiency"],
  "Nail-patella / Galloway-Mowat / MIDD": ["Nail-patella: LMX1B", "Galloway-Mowat: microcephaly, SRNS", "MIDD: m.3243A>G"],
  "Hypophosphatasia / osteogenesis imperfecta": ["Hypophosphatasia: ALP ต่ำ", "OI: blue sclera, deafness"],
  "GH deficiency / hypothyroidism / Cushing": ["TSH"],
  "Nutritional rickets / celiac / chronic disease": ["25(OH)D ต่ำ", "Anti-tTG"]
};

