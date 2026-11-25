/* Extra clinical discriminators, part 6: second pass for nodes that still had fewer than three discriminators. */
window.KEYX = window.KEYX || {};
const KX6 = {
  headache: {
    "Uveitis / scleritis": ["Scleritis: ปวดลึกปลุกตื่นกลางคืน, ตาแดงม่วงไม่จางด้วย phenylephrine", "Anterior uveitis: ciliary flush, photophobia, cells ใน anterior chamber", "Uveitis ให้หา TINU, sarcoid, HLA-B27 spondyloarthritis, Behçet"]
  },
  arthralgia: {
    "Infective endocarditis": ["Arthralgia ร่วมกับ fever และ murmur ต้องเก็บ blood culture 3 ชุดก่อนให้ antibiotic", "IE-associated GN: C3 ต่ำ, ANCA หรือ RF บวกได้"],
    "Hypertrophic osteoarthropathy / hemochromatosis": ["HPOA: ปวดตาม long bone, bone scan เห็น periosteal uptake", "Hemochromatosis: TSAT > 45%, ferritin สูง"]
  },
  abdomen: {
    "Infection: TB, melioidosis abscess, visceral leishmaniasis": ["Melioidosis: risk คือ DM, CKD, ชาวนา (สัมผัสดินและน้ำ)", "TB: hypodense splenic lesion, lymphocytic ascites", "Leishmaniasis: polyclonal hypergammaglobulinemia"]
  },
  palpitation: {
    "Anemia / volume depletion": ["Hb < 8 g/dL หรือลดเร็ว", "HR เพิ่ม > 30 bpm เมื่อลุกยืน", "เกิดหลัง UF มาก หรือมี GI bleed"]
  },
  syncope: {
    "Pericardial tamponade": ["Intradialytic hypotension ที่เกิดใหม่ซ้ำ ๆ ใน HD", "Uremic effusion อาจไม่มี tachycardia", "Echo: RA และ RV collapse, plethoric IVC"]
  },
  hemoptysis: {
    "IgA vasculitis / cryoglobulinemia": ["IgAV DAH มักในผู้ใหญ่ร่วม nephritis รุนแรง", "Cryoglobulinemia: RF บวก", "Skin purpura ร่วม"],
    "Thrombocytopenia: TTP, ITP, DIC": ["TTP: platelet มัก < 20,000/µL", "HIT: platelet ลด > 50% หลัง heparin 5-10 วัน, thrombosis มากกว่า bleeding", "TTP: schistocyte, ADAMTS13 < 10%"],
    "Pulmonary embolism / infarct": ["Wedge-shaped peripheral opacity (Hampton hump)", "Risk: nephrotic syndrome (โดยเฉพาะ MN), post-op, malignancy", "CTPA (V/Q scan เมื่อต้องเลี่ยง contrast)"],
    "Epistaxis from GPA or uremic bleeding": ["เลือดไหลลงคอตอนนอน ทำให้สับสนกับ hemoptysis", "Anterior rhinoscopy: crusting, septal perforation", "Uremic bleeding ดีขึ้นด้วย dialysis และ DDAVP"]
  },
  cough: {
    "Rheumatoid nodules / sarcoid nodules": ["RA nodule: cavitate ได้ และแตกทำ pneumothorax ได้", "Accelerated nodulosis หลังได้ methotrexate", "Sarcoid: perilymphatic nodule, hilar node"],
    "Lymphoma / IgG4-RD": ["Lymphoma: LDH สูง, mediastinal mass", "IgG4: autoimmune pancreatitis, TIN, retroperitoneal fibrosis", "ต้อง biopsy แยก เพราะ IgG4-RD และ lymphoma เลียนแบบกันได้"]
  },
  nausea: {
    "Hepatitis / biliary / PUD / obstruction": ["Hepatobiliary: transaminase หรือ ALP สูง", "PUD: epigastric pain สัมพันธ์กับอาหาร, ประวัติ NSAID (steroid เพิ่ม risk เมื่อใช้ร่วมกับ NSAID)"],
    "Vestibular / migraine": ["Vertigo กับ nystagmus", "Migraine: photophobia, phonophobia, aura", "HINTS exam แยก posterior circulation stroke ออกจาก peripheral vertigo"],
    "Adrenal insufficiency": ["Eosinophilia, hypoglycemia", "ประวัติหยุด steroid กะทันหัน หรือได้ ICI (hypophysitis, adrenalitis)"],
    "Hyperthyroidism / hypothyroidism": ["Hyperthyroid: weight loss, tremor, diarrhea", "Hypothyroid: constipation, hyponatremia"]
  },
  diarrhea: {
    "Lactose intolerance / carbohydrate malabsorption": ["Stool osmotic gap > 125 mOsm/kg", "Fructose และ sorbitol (sugar-free product) ทำอาการแบบเดียวกัน"]
  },
  abdpain: {
    "Lupus serositis / FMF": ["Lupus serositis: complement ต่ำ, ascites, ต้องแยก mesenteric vasculitis และ infection ก่อน"],
    "DKA / uremia / hypercalcemia / adrenal crisis": ["Hypercalcemia: pancreatitis, PUD", "Adrenal crisis: hyponatremia, hypoglycemia, hyperkalemia (เฉพาะ primary)"]
  },
  gibleed: {
    "Varices / portal hypertensive gastropathy": ["Splenomegaly, thrombocytopenia", "AKI (prerenal, ATN, HRS-AKI) ตามหลัง variceal bleed ได้บ่อย"],
    "Colorectal cancer / diverticular bleeding": ["CRC: iron deficiency, change in bowel habit"],
    "IgA vasculitis / PAN / ANCA": ["IgAV: purpura, abdominal pain, intussusception", "PAN: mesenteric ischemia, bowel infarction", "ANCA: GI ulcer, perforation"],
    "CMV colitis / PTLD in KT": ["CMV: diarrhea, ulcer, blood CMV PCR ต่ำหรือลบได้ จึงต้อง biopsy", "PTLD: GI mass หรือ ulcer"],
    "AL amyloid GI involvement": ["PT และ aPTT ยาว", "Macroglossia, nephrotic syndrome", "GI biopsy ย้อม Congo red"],
    "TMA / thrombocytopenia": ["Schistocyte, LDH สูง", "เลี่ยง platelet transfusion ใน TTP ยกเว้น life-threatening bleeding"]
  },
  jaundice: {
    "Sepsis-associated cholestasis": ["Conjugated bilirubin สูง, ALP ปกติถึงสูงเล็กน้อย", "ดีขึ้นเมื่อ sepsis หาย"],
    "HRS-AKI": ["AKI ใน cirrhosis กับ ascites ที่ Cr ไม่ดีขึ้นหลังหยุด diuretic และ volume resuscitation (ICA 2015: albumin 1 g/kg/วัน 2 วัน, ADQI-ICA 2024: 24 ชั่วโมงหลัง volume resuscitation ที่เพียงพอ ไม่บังคับ albumin 48 ชั่วโมง)", "Urine Na ต่ำและ bland sediment สนับสนุน แต่ไม่จำเพาะ (ATN ใน cirrhosis ก็ urine Na ต่ำได้)"]
  },
  pruritus: {
    "Inadequate dialysis / high-flux": ["ถ้า Kt/V ถึงเป้าแล้วยังคัน ให้หาสาเหตุอื่น (การเพิ่ม dose เกินเป้าไม่ช่วย CKD-aP)"],
    "Calciphylaxis prodrome / NSF": ["NSF: ได้ group I GBCA ขณะ eGFR < 30, AKI หรือ dialysis"],
    "HCV / HBV": ["Pruritus เด่นเมื่อมี cholestasis (ALP, GGT สูง)", "Mixed cryoglobulinemia ใน HCV"],
    "Lymphoma / myeloma / paraneoplastic": ["Hodgkin: alcohol-induced pain ที่ lymph node", "Night sweats, lymphadenopathy", "Polycythemia vera: aquagenic pruritus"],
    "Thyroid / diabetes": ["Hypothyroid: xerosis", "DM: candida intertrigo"],
    "Drug: opioid, ACEi, hydroxyethyl starch, allergy to dialyzer": ["Opioid: คันผ่าน mu receptor (ไม่ใช่ allergy)", "HES: pruritus เริ่มช้าหลายสัปดาห์หลังได้ และคงอยู่นานหลายเดือน", "Dialyzer reaction: คันเริ่มในนาทีแรกๆ ของการฟอก"],
    "Neuropathic / psychogenic": ["Brachioradial pruritus: forearm, cervical spine", "Notalgia paresthetica: interscapular"]
  },
  cramps: {
    "Rhabdomyolysis / tumor lysis / pancreatitis": ["ไม่ให้ Ca IV ใน hypocalcemia ช่วงแรกของ rhabdomyolysis ยกเว้นมีอาการหรือ hyperkalemia รุนแรง"],
    "GI loss / alcohol / malabsorption": ["Refeeding syndrome"],
    "Respiratory alkalosis / hyperventilation": ["Salicylate: respiratory alkalosis ร่วมกับ HAGMA"],
    "Metabolic alkalosis": ["Ionized Ca ลดเมื่อ pH สูง โดย total Ca ปกติ", "Urine Cl < 20 mmol/L ใน vomiting, > 20 mmol/L ใน diuretic ที่ยังออกฤทธิ์, Bartter, Gitelman"],
    "Hypothyroidism / statin / diuretic": ["Thiazide: hypokalemia, hypomagnesemia"],
    "Volume depletion / hyponatremia": ["Heat cramps ในนักกีฬา", "Serum Na ต่ำร่วม"],
    "Peripheral arterial disease / neuropathy": ["TBI < 0.7 เมื่อ ABI แปลผลไม่ได้", "Neuropathy: burning, sensory loss", "Claudication: ปวดเมื่อเดิน หายเมื่อพัก (ต่างจาก cramp ที่เป็นตอนพักหรือกลางคืน)"],
    "Hypokalemia": ["Diuretic, diarrhea", "U wave"]
  },
  myalgia: {
    "Seizure / agitation / dystonia": ["CK สูงหลัง seizure", "NMS: rigidity, hyperthermia, antipsychotic", "Serotonin syndrome: clonus, hyperreflexia"],
    "Influenza / COVID-19 / dengue": ["COVID-19: มีรายงาน rhabdomyolysis", "Dengue: rhabdomyolysis กับ AKI"],
    "Trichinosis / scrub typhus": ["Trichinella: หมูดิบ, periorbital edema, eosinophilia, CK สูง", "Scrub typhus: eschar, ไข้ลงใน 48 ชั่วโมงหลัง doxycycline"],
    "Severe hypokalemia": ["Diuretic, licorice, RTA"],
    "Hypophosphatemia": ["Refeeding, alcohol, DKA treatment, CRRT", "PO4 < 1 mg/dL: hemolysis และ respiratory muscle weakness ร่วม"],
    "Hypothyroidism / hyperosmolar state": ["Hypothyroid: CK สูง chronic, Cr สูง"],
    "SLE / MCTD / vasculitis myositis": ["SLE myositis: CK สูงเล็กน้อย", "Vasculitis (เช่น PAN): muscle biopsy ช่วยวินิจฉัย"]
  },
  thirst: {
    "Dipsogenic: hypothalamic lesion, drug": ["เกิด hyponatremia ได้เมื่อดื่มเกิน excretion capacity"],
    "Volume depletion / salt wasting": ["Thirst หายเมื่อแก้ volume"],
    "Hypernatremia": ["ผู้ที่ขอน้ำเองไม่ได้: dementia, intubated, ทารก", "Urine osmolality > 600 mOsm/kg ชี้ extrarenal loss หรือ intake ไม่พอ, < 300 mOsm/kg ชี้ DI"],
    "Hyperangiotensinemia: CHF, renovascular": ["มีรายงานว่า RAAS blockade ลด thirst ได้ (หลักฐานจำกัด)"]
  },
  hearing: {
    "Relapsing polychondritis / SLE / sarcoid": ["VEXAS: ชายสูงอายุ, macrocytosis, UBA1 mutation", "Autoimmune inner ear disease: bilateral rapidly progressive SNHL ที่ตอบสนองต่อ steroid"],
    "Deferoxamine / salicylate": ["Deferoxamine: ototoxicity และ retinal toxicity ขึ้นกับ dose ควรมี baseline audiometry"]
  },
  eye: {
    "Sjogren / IgG4-RD": ["Sjögren: anti-Ro (SSA) บวก"],
    "RA / SLE / relapsing polychondritis": ["Relapsing polychondritis: scleritis ร่วมกับ auricular chondritis"],
    "Tuberculosis / syphilis": ["ตรวจ IGRA และ chest imaging ก่อนให้ steroid หรือ immunosuppression"],
    "Toxoplasma / HSV / VZV": ["ใน immunosuppressed lesion กว้าง เป็นสองตา และลามเร็วได้"]
  },
  sicca: {
    "MALT lymphoma": ["Lymphoma risk สูงขึ้นราว 10-15 เท่าใน Sjögren", "Predictor: parotid โตต่อเนื่อง, palpable purpura, C4 ต่ำ, cryoglobulinemia, lymphopenia", "Monoclonal gammopathy, β2-microglobulin สูง", "Parotid biopsy หรือ US-guided core biopsy"],
    "Amyloidosis / lymphoma": ["AL: macroglossia, submandibular enlargement, nephrotic syndrome", "FLC ratio ผิดปกติ, salivary gland biopsy Congo red", "Lymphoma: B symptoms, LDH สูง"],
    "HCV": ["Mixed cryoglobulinemia: purpura, low C4, RF positive", "ตรวจ anti-HCV และ HCV RNA"],
    "Mumps / bacterial parotitis": ["Mumps: bilateral parotitis, orchitis, pancreatitis, AIN และ IgA-like GN มีรายงาน", "Bacterial: มักเป็นข้างเดียว", "Melioidosis parotid abscess ในเด็กไทย"],
    "Anticholinergic / antidepressant / diuretic": ["TCA, antihistamine, oxybutynin, antipsychotic", "Urinary retention และ constipation ร่วม", "Anti-Ro และ anti-La ลบ (Schirmer ต่ำได้จากยา)"],
    "Uremic xerostomia / fluid restriction in dialysis": ["Salivary flow ลด, uremic stomatitis", "Thirst ทำให้ interdialytic weight gain สูง ต้อง UF มากและเกิด intradialytic hypotension", "Dialysate Na สูงและ dietary Na สูงทำให้ thirst เพิ่ม"],
    "Diabetes / hypercalcemia": ["Dry mouth หายเมื่อแก้ hyperglycemia หรือ hypercalcemia"],
    "Sialadenosis (alcohol, bulimia, DM)": ["Painless bilateral soft parotid hypertrophy", "Bulimia: Russell sign, dental erosion, hypokalemic alkalosis", "Alcohol, cirrhosis, DM"]
  },
  ent: {
    "SLE": ["Ulcer ที่ hard palate และ buccal mucosa มัก painless (เจ็บได้)", "Oral ulcer เป็น criterion ใน EULAR/ACR 2019 (2 คะแนน)", "Nasal septal perforation พบน้อย"],
    "Drug: MTX, mTOR inhibitor, MMF, NSAID": ["MTX ไม่ควรใช้เมื่อ eGFR < 30 mL/min/1.73 m2 และต้องลดขนาดเมื่อ eGFR ต่ำกว่า 60"],
    "Infection: HSV, CMV, histoplasmosis, syphilis": ["HSV ใน immunosuppressed: chronic ulcer", "CMV oral ulcer ใน KT: biopsy เห็น inclusion body", "Histoplasmosis: oral ulcer, adrenal insufficiency, pancytopenia", "Syphilis: chancre, mucous patch"],
    "IBD / celiac / B12 deficiency": ["Crohn: cobblestoning, pyostomatitis vegetans", "Celiac: aphthous, enamel defect", "B12: glossitis, angular cheilitis"],
    "Uremic bleeding / anticoagulation": ["Platelet count ปกติ แต่ bleeding time ยาว"],
    "Hereditary hemorrhagic telangiectasia": ["Curaçao criteria: epistaxis, telangiectasia, visceral AVM, family history", "Pulmonary AVM: paradoxical stroke, brain abscess", "GI bleeding และ iron deficiency"],
    "Severe HTN / thrombocytopenia": ["Epistaxis ไม่ได้บอก hypertensive emergency โดยตัวเอง ต้องหา target organ damage", "TMA: schistocyte"],
    "Bacterial sinusitis": ["อาการนาน > 10 วันไม่ดีขึ้น, double worsening หรือ severe onset (ไข้ ≥ 39 °C ร่วมกับ purulent discharge 3-4 วัน)", "Purulent nasal discharge, facial pain", "DM, KT หรือ neutropenia ที่มี necrosis หรือ eschar ให้คิดถึง invasive fungal sinusitis"]
  },
  raynaud: {
    "Sjogren / dermatomyositis / anti-synthetase": ["Anti-synthetase: mechanic's hands, ILD, arthritis, fever", "DM: periungual erythema, ragged cuticle, Gottron", "Sjögren: Raynaud ราวหนึ่งในสาม, cryoglobulin"],
    "Antiphospholipid syndrome": ["aPL (LA, aCL, anti-β2GPI) บวก 2 ครั้ง ห่างกัน ≥ 12 สัปดาห์", "Livedo racemosa, recurrent thrombosis, pregnancy loss"],
    "Cholesterol emboli / endocarditis / cardioembolism": ["Echo หา vegetation หรือ intracardiac thrombus"],
    "Calciphylaxis (distal)": ["Risk: dialysis, warfarin, Ca x PO4 สูง", "Retiform purpura, extreme pain", "Distal prognosis ดีกว่า central"],
    "Thromboangiitis obliterans / atherosclerosis": ["Buerger: โรคกำเริบตามการสูบบุหรี่ และสงบเมื่อหยุดสูบ", "PAD: ABI, claudication"],
    "Vasculitis: PAN, ANCA": ["Mononeuritis, purpura, RPGN ร่วม"],
    "Ischemic monomelic neuropathy": ["เป็น emergency: ต้องแก้ access ทันที (ligation) ไม่เช่นนั้น deficit ถาวร"],
    "Drug: beta-blocker, ergot, cisplatin, bleomycin, vasopressor, interferon": ["Cisplatin-bleomycin ใน testicular cancer ทำ Raynaud ที่คงอยู่นานหลายปีได้", "Vasopressor ทำ symmetric digital necrosis", "Non-selective beta-blocker"],
    "Vibration white finger / hypothyroidism": ["ใช้เครื่องมือสั่นนานหลายปี", "Hypothyroid: TSH สูง, cold intolerance"]
  },
  skinthick: {
    "Overlap: SLE, myositis, Sjogren": ["Anti-PM/Scl: myositis overlap, ILD, mechanic's hands", "Anti-Ku: arthritis, myositis", "Anti-U1 RNP: MCTD, PAH"],
    "AL amyloid / POEMS skin": ["AL: waxy papule, pinch purpura, macroglossia", "POEMS: glomeruloid hemangioma, hyperpigmentation, hypertrichosis", "ตรวจ SPEP, immunofixation และ serum FLC"],
    "Chronic GVHD / drug (bleomycin, taxane) / porphyria cutanea tarda": ["Taxane: sclerodermoid edema", "PCT: blister บนหลังมือ, plasma porphyrin สูง"],
    "Morphea / localized scleroderma": ["ไม่มี Raynaud และ sclerodactyly", "ไม่มี internal organ involvement จึงไม่เกิด SRC", "En coup de sabre"],
    "Calcinosis / calciphylaxis plaques": ["Calcinosis cutis ใน limited SSc", "Calciphylaxis: painful indurated plaque ใน dialysis", "X-ray เห็น soft tissue calcification"]
  },
  skinulcer: {
    "Antiphospholipid syndrome / livedoid vasculopathy": ["Atrophie blanche scar สีขาวรูปดาว", "ตรวจ aPL และ hypercoagulable workup"],
    "Cholesterol emboli": ["Subacute หรือ stepwise AKI ร่วม"],
    "Polyarteritis nodosa (cutaneous or systemic)": ["Systemic PAN: renal infarct, renovascular hypertension, ไม่มี GN"],
    "ANCA vasculitis": ["มี RPGN หรือ lung involvement ร่วม", "Skin biopsy: leukocytoclastic vasculitis, DIF pauci-immune"],
    "Mixed cryoglobulinemia / IgA vasculitis": ["Mixed cryoglobulinemia: HCV, leg ulcer"],
    "Levamisole-adulterated cocaine": ["Neutropenia, ANCA บวก (MPO ร่วมกับ PR3 หรือ anti-HNE)", "Urine toxicology"],
    "Erythema nodosum": ["Sarcoid (Löfgren), TB, strep, IBD, drug, pregnancy", "Non-ulcerating, หายเองใน 3-6 สัปดาห์โดยไม่มี scar", "Septal panniculitis บน biopsy"],
    "Pancreatic panniculitis": ["Arthritis และ polyserositis ร่วม"],
    "Lupus panniculitis / erythema induratum": ["Lupus profundus: lipoatrophy ที่หน้าและแขน", "Erythema induratum: ulcer ที่น่อง, TB (IGRA)"],
    "Pyoderma gangrenosum": ["IBD, RA, myeloma, MDS", "Diagnosis of exclusion: ต้อง biopsy และ culture แยก infection และ vasculitis ก่อน"]
  },
  bluetoe: {
    "Atrial myxoma / non-bacterial thrombotic endocarditis": ["Myxoma: fever, weight loss, ESR สูง, tumor plop, LA mass", "NBTE: adenocarcinoma, SLE (Libman-Sacks), APS", "Echo (TEE ไวกว่าสำหรับ vegetation ขนาดเล็ก)"],
    "Calciphylaxis (distal)": ["Penile และ digital calciphylaxis", "Risk: dialysis, warfarin"],
    "Cryoglobulinemia / cold agglutinin": ["Type I cryoglobulinemia: monoclonal, hyperviscosity, acral necrosis", "Cold agglutinin disease: acrocyanosis ร่วมกับ hemolysis"],
    "HIT / TTP / DIC": ["เริ่ม warfarin ช่วง acute HIT ทำให้ venous limb gangrene จาก protein C depletion", "4T score, anti-PF4", "DIC: fibrinogen ต่ำ, D-dimer สูง, symmetric peripheral gangrene"],
    "Aortic dissection / thrombosis": ["AKI จาก renal artery involvement"],
    "Vasopressor / ergot / cocaine": ["เกิดใน shock ที่ได้ vasopressor ขนาดสูง มักมี DIC ร่วม"],
    "Raynaud / CTD": ["Episodic triphasic color change", "Nailfold capillaroscopy ผิดปกติบ่งถึง secondary Raynaud"]
  },
  bleeding: {
    "Antiplatelet / SSRI / herbal": ["Aspirin, clopidogrel, ticagrelor", "SSRI ลด platelet serotonin", "Ginkgo, fish oil, garlic", "PFA-100 closure time ยาว (ไม่ไวต่อ clopidogrel)"],
    "Acquired von Willebrand (Heyde, hypothyroidism, MGUS)": ["สาเหตุอื่น: MGUS, Waldenström, Wilms tumor, hypothyroidism, LVAD หรือ ECMO"],
    "Thrombotic microangiopathy": ["Schistocyte, LDH สูง, haptoglobin ต่ำ", "Work-up: ADAMTS13 activity, complement, STEC", "TMA ทำ thrombosis มากกว่า bleeding แม้ platelet ต่ำ"],
    "Immune thrombocytopenia / SLE / drug": ["ITP: isolated thrombocytopenia, ไม่มี splenomegaly, เป็น diagnosis of exclusion", "SLE: thrombocytopenia จาก immune destruction, APS หรือ TMA", "Drug: vancomycin, TMP-SMX, quinine, heparin"],
    "Hypersplenism / marrow failure / HLH": ["Pancytopenia"],
    "Liver disease / vitamin K deficiency": ["Vitamin K deficiency: PT ยาว, แก้ได้ด้วย vitamin K", "Malnutrition, antibiotic, cholestasis", "Liver disease: factor V ต่ำด้วย (vitamin K deficiency factor V ปกติ)"],
    "AL amyloid with factor X deficiency": ["เสี่ยง bleeding หลัง kidney หรือ liver biopsy"],
    "DIC": ["Fibrinogen ต่ำ, D-dimer สูง, PT ยาว, platelet ต่ำ"],
    "Glucocorticoid excess / senile purpura": ["Thin skin, ecchymosis ที่ forearm และหลังมือ", "Platelet count และ coagulation ปกติ"],
    "Scurvy": ["Corkscrew hair, gingival hemorrhage", "Vitamin C level ต่ำ"],
    "Amyloid vascular infiltration / Ehlers-Danlos": ["EDS: joint hypermobility, skin hyperextensibility"]
  },
  thrombosis: {
    "Arterial thrombosis in nephrotic": ["Stroke, MI, limb ischemia, renal artery"],
    "Cancer-associated thrombosis": ["พบบ่อยใน pancreas, stomach, lung, brain cancer", "Trousseau: migratory superficial thrombophlebitis"],
    "ESA / estrogen / tranexamic acid": ["Tranexamic acid สะสมใน CKD (ต้องลดขนาด) มีรายงาน thrombosis และ seizure"],
    "Behcet / IBD / hyperhomocysteinemia": ["Behçet: Budd-Chiari, pulmonary artery aneurysm, CVT", "IBD: VTE risk สูงช่วง flare"]
  },
  stroke: {
  },
  backpain: {
    "Brucella / melioidosis": ["Brucella: raw milk, sacroiliitis, undulant fever", "Melioidosis: DM, rice farmer, spinal abscess"],
    "Pancreatitis / pancreatic cancer": ["Lipase > 3 เท่าของ ULN ใน acute pancreatitis (CKD ทำ lipase สูงได้เองถึง 2-3 เท่า)", "Weight loss, new DM, painless jaundice ใน cancer"]
  },
  lymphnode: {
    "IgG4-related disease": ["Serum IgG4 > 135 mg/dL (ไม่จำเพาะ และค่าปกติไม่ exclude)", "Kidney: IgG4-related TIN กับ C3 และ C4 ต่ำ"],
    "HIV": ["ตรวจ HIV Ag/Ab (4th generation)"],
    "Secondary syphilis": ["RPR หรือ VDRL titer สูง ร่วมกับ treponemal test บวก"],
    "EBV / CMV / toxoplasma": ["Posterior cervical node", "Serology: EBV VCA IgM, CMV IgM, Toxoplasma IgM"],
    "DRESS / phenytoin pseudolymphoma": ["Eosinophilia, AIN"]
  },
  cushingoid: {
    "Drug interaction: ritonavir or cobicistat with fluticasone": ["Serum cortisol และ ACTH ต่ำ (suppressed) ทั้งที่ดู Cushingoid"]
  },
  paroxysm: {
    "MEN2 / NF1": ["Bilateral pheochromocytoma พบบ่อยใน MEN2"],
    "Hypoglycemia": ["Insulin หรือ sulfonylurea ที่สะสมใน CKD"]
  },
  obesity: {
  },
  wasting: {
    "Motor neuron disease / inclusion body myositis": ["IBM: finger flexor และ quadriceps weakness แบบ asymmetric"]
  },
  tremor: {
  },
  rls: {
  },
  shortstature: {
  }
};
Object.keys(KX6).forEach(t => { KEYX[t] = KEYX[t] || {}; Object.keys(KX6[t]).forEach(n => { KEYX[t][n] = (KEYX[t][n] || []).concat(KX6[t][n]); }); });

/* Third pass: nodes still under three discriminators, and terse entries expanded. */
const KX7 = {
  eye: { "IgA vasculitis / PAN": ["IgAV: episcleritis พบน้อย, purpura และ nephritis นำ", "PAN: retinal vasculitis, cotton wool spot, HBV", "Scleritis ไม่ค่อยพบ ต่างจาก ANCA vasculitis"] },
  backpain: {
    "Osteomalacia": ["Diffuse bone pain กดเจ็บ sternum, rib, tibia", "Hypophosphatemia จาก renal wasting (TmP/GFR ต่ำ) หรือ vitamin D deficiency", "Proximal weakness และ waddling gait"],
    "Mechanical low back pain": ["Red flags: อายุ > 50 กับอาการใหม่, cancer history, fever, weight loss, neurological deficit, steroid, IV drug use, HD catheter bacteremia", "ปวดสัมพันธ์กับท่าทาง ดีขึ้นเมื่อพัก", "ไม่ต้อง imaging ใน 6 สัปดาห์แรกถ้าไม่มี red flag"]
  },
  cushingoid: {
    "Alcohol / depression / obesity / PCOS": ["Alcohol: hypercortisolism หายภายในไม่กี่สัปดาห์หลังหยุดดื่ม", "Late-night salivary cortisol มักปกติหรือสูงไม่มาก", "Proximal myopathy และ thin skin พบน้อยกว่า true Cushing"],
    "Cyclosporine / HIV lipodystrophy / Cushingoid look of nephrotic": ["Nephrotic: periorbital และ facial edema ตอนเช้า, pitting edema ร่วม, albumin ต่ำ", "Cyclosporine: hypertrichosis, gingival hyperplasia ทำหน้าดูกลม", "Cortisol testing ปกติ"]
  },
  paroxysm: { "Cocaine / amphetamine / MAOI with tyramine": ["Hyperthermia, mydriasis, agitation", "MAOI กับอาหารที่มี tyramine (cheese, cured meat) ทำ hypertensive crisis ภายใน 1-2 ชั่วโมงหลังกิน", "Cocaine: chest pain, MI, aortic dissection, rhabdomyolysis, AKI"] },
  obesity: {
    "Diabetic kidney disease": ["Albuminuria ค่อยเพิ่มหลายปี", "T2DM ที่ไม่มี retinopathy ไม่ได้ exclude DKD แต่ควรหา non-diabetic kidney disease ร่วมด้วย", "FLOW: semaglutide ลด major kidney disease events 24% (HR 0.76, 95% CI 0.66-0.88) ใน T2DM ที่มี CKD"],
    "Hypothyroidism": ["Weight gain ส่วนใหญ่จาก fluid ไม่ใช่ fat (ราว 2-4 kg)", "Cold intolerance, constipation, delayed reflex", "Cr สูงขึ้นเล็กน้อยและกลับเป็นปกติหลังรักษา"],
    "Drug-induced: steroid, antipsychotic, insulin, TZD": ["Olanzapine และ clozapine ทำ weight gain และ diabetes", "TZD: weight gain จาก fluid และ fat, HF exacerbation", "Insulin: น้ำหนักขึ้นเมื่อเริ่มหรือเพิ่ม dose ใน T2DM"],
    "Gout / hyperuricemia": ["SGLT2i ลด urate และ gout flare", "Uric acid stone ร่วม"]
  },
  wasting: {
    "Metabolic acidosis": ["HCO3 < 18 mmol/L ต่อเนื่อง", "Muscle protein breakdown ผ่าน ubiquitin-proteasome และ glucocorticoid", "KDIGO 2024: พิจารณาให้ alkali หรือปรับอาหารเพื่อไม่ให้ serum HCO3 < 18 mmol/L ในผู้ใหญ่ (practice point)"],
    "Uremic myopathy / vitamin D deficiency": ["Proximal weakness โดย CK ปกติ", "25(OH)D ต่ำ, PTH สูง", "ดีขึ้นด้วย exercise, vitamin D, adequate dialysis"],
    "Thyroid / hypogonadism / GH deficiency": ["Testosterone ต่ำในชาย dialysis ส่วนใหญ่", "GH resistance ใน CKD", "Hyperthyroid และ hypothyroid myopathy"],
    "Cardiac cachexia / COPD": ["Cardiac cachexia: non-edematous weight loss ≥ 6% ภายใน 6-12 เดือน", "COPD: low BMI predict mortality", "Inflammatory cytokines (TNF-α)"],
    "Neuropathy: diabetic amyotrophy, CIDP, uremic": ["Distal symmetric wasting ใน uremic", "Diabetic amyotrophy: proximal thigh wasting และ pain มักเริ่มข้างเดียวแล้วลามอีกข้างได้", "NCS แยก axonal กับ demyelinating"]
  },
  tremor: {
    "Hypomagnesemia / hypocalcemia": ["Mg < 1.2 mg/dL ทำ tremor, tetany, seizure", "สาเหตุ: CNI, PPI, cisplatin, diuretic", "Hypocalcemia และ hypokalemia refractory จนกว่าจะแก้ Mg"],
    "Hypoglycemia / thyrotoxicosis": ["Hypoglycemia: tremor, sweating, palpitation ดีขึ้นทันทีหลังได้ glucose", "Thyrotoxicosis: fine postural tremor, weight loss, TSH ต่ำ", "Beta-blocker บังอาการ adrenergic ของ hypoglycemia"]
  },
  rls: {
    "Drug-induced / exacerbated RLS": ["Diphenhydramine และ sedating antihistamine, metoclopramide, SSRI, mirtazapine, antipsychotic", "อาการแย่ลงหลังเริ่มยา", "Bupropion เป็น antidepressant ที่ไม่ทำให้ RLS แย่ลง"],
    "Uremic or diabetic neuropathy": ["Burning, numbness ตลอดวันไม่ขึ้นกับเวลาหรือการขยับ", "Sensory loss บน exam", "ไม่ดีขึ้นเมื่อขยับขา (ต่างจาก RLS)"],
    "PAD / venous insufficiency / positional discomfort": ["Claudication เกิดตอนเดิน ไม่ใช่ตอนพัก", "Venous: heaviness ตอนเย็น ดีขึ้นเมื่อยกขา", "ABI หรือ TBI"],
    "Akathisia": ["Inner restlessness ทั้งตัว ไม่ใช่เฉพาะขา", "ไม่มี circadian pattern", "Antipsychotic หรือ metoclopramide"],
    "Depression / anxiety": ["Early morning awakening ใน depression", "PHQ-9 ≥ 10", "Insomnia ใน dialysis พบได้มากกว่าครึ่ง"]
  },
  shortstature: { "GH deficiency / hypothyroidism / Cushing": ["IGF-1 ต่ำใน GH deficiency (ใน CKD เป็น GH resistance, IGF-1 แปลผลยาก)", "Hypothyroid: growth velocity ลด, delayed bone age", "Cushing ในเด็ก: weight gain กับ growth arrest", "Bone age delayed ใน endocrine cause (ต่างจาก familial short stature ที่ bone age ปกติ)"] },
  dysphagia: { "Radiation and caustic injury": ["Mediastinal หรือ head-neck radiation", "Caustic: alkali ทำลายรุนแรงกว่า acid, endoscopy ใน 24-48 ชั่วโมง", "Esophageal cancer risk ระยะยาวหลัง caustic"] },
  constipation: { "Stricture and volvulus": ["Sigmoid volvulus: coffee bean sign บน X-ray", "Diverticular stricture ต้องแยก cancer ด้วย biopsy", "Radiation proctitis และ stricture"] },
  hsm: { "Sarcoidosis and Gaucher disease": ["Sarcoid: hepatic granuloma, ALP สูง, hypercalciuria", "Gaucher: glucocerebrosidase ต่ำ, chitotriosidase สูง, พบในชาว Ashkenazi มากกว่า"] },
  smelltaste: {
    "Hypothyroidism and B12 deficiency": ["B12: glossitis, macrocytosis, neuropathy", "Iron deficiency: atrophic glossitis, angular cheilitis", "Hypothyroid: hypogeusia ที่ดีขึ้นหลังรักษา"],
    "Neurodegenerative and head trauma": ["Parkinson และ Lewy body: hyposmia เป็น prodromal", "Head trauma: anosmia ถาวรได้", "Smell identification test ช่วยสนับสนุน prodromal Parkinson แต่ไม่จำเพาะ"]
  },
  gynecomastia: { "Cirrhosis and hyperthyroidism": ["Cirrhosis: aromatization เพิ่ม, SHBG สูง, spironolactone ทำแย่ลง", "Hyperthyroid: gynecomastia ราวหนึ่งในสี่ของชาย Graves", "Gynecomastia จาก hyperthyroidism หายหลังกลับเป็น euthyroid"] },
  menstrual: {
    "Asherman syndrome": ["Hypomenorrhea หรือ amenorrhea หลัง D&C หลังคลอดหรือแท้ง", "Infertility และ recurrent miscarriage", "Hysteroscopy เป็น gold standard ในการวินิจฉัย"],
    "Hypothyroidism": ["Menorrhagia ใน hypothyroid, amenorrhea ใน severe", "TRH กระตุ้น prolactin", "ประจำเดือนกลับปกติหลังให้ levothyroxine"]
  },
  sexual: { "Peyronie disease and priapism": ["Peyronie: palpable plaque, painful erection, curvature", "Priapism ischemic > 4 ชั่วโมงเป็น emergency"] },
  hyperpig: {
    "Systemic sclerosis and PBC": ["SSc salt-and-pepper: vitiligo-like depigmentation กับ perifollicular pigment", "PBC: generalized hyperpigmentation จาก melanin, pruritus, xanthelasma", "PBC กับ dRTA และ Sjögren overlap"],
    "Melasma and post-inflammatory hyperpigmentation": ["Melasma: cheek, forehead, upper lip, pregnancy หรือ OCP, sun exposure", "PIH: หลัง acne, eczema, excoriation จาก uremic pruritus", "Wood lamp แยก epidermal กับ dermal"]
  }
};
Object.keys(KX7).forEach(t => { KEYX[t] = KEYX[t] || {}; Object.keys(KX7[t]).forEach(n => { KEYX[t][n] = (KEYX[t][n] || []).concat(KX7[t][n]); }); });
