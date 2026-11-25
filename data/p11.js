/* Phase 1 Symptomatology extension C: endocrine, reproductive, dermatological and hematological. */
window.TREES = window.TREES || {};

/* ===================== GOITER AND NECK MASS ===================== */
TREES.goiter = {
  must: [
    "Thyroid หรือ non-thyroid (เคลื่อนตามการกลืน), เจ็บหรือไม่เจ็บ, โตเร็วหรือช้า",
    "Hyperthyroid: ใจสั่น, น้ำหนักลด, เหงื่อออก, ท้องเสีย, ตาโปน",
    "Hypothyroid: เพลีย, บวม, ขี้หนาว, ท้องผูก",
    "Compressive: กลืนลำบาก, เสียงแหบ, หายใจลำบากเมื่อนอน",
    "ยา: lithium, amiodarone, interferon, immune checkpoint inhibitor, iodinated contrast",
    "Family history: medullary thyroid cancer, pheochromocytoma, hyperparathyroidism (MEN)",
    "Radiation ที่คอ, ไข้, ฟันผุ, URI ก่อนหน้า"
  ],
  tree: N("Goiter, thyroid nodule and neck mass", "root", {
    s: "แยก thyroid กับ non-thyroid mass ก่อน แล้ว TSH แยก function, nodule ใช้ ultrasound risk stratification",
    why: "Thyroid และ parathyroid เชื่อมกับไตทั้ง lithium, nephrotic syndrome, CKD-MBD และ MEN syndromes, ส่วน non-thyroid neck mass ต้องคิดถึง lymphoma, TB, IgG4-RD และ paraganglioma",
    keys: ["เคลื่อนขึ้นตามการกลืน: ส่วนใหญ่เป็น thyroid (thyroglossal cyst ก็เคลื่อนตามการกลืนและเคลื่อนเมื่อแลบลิ้น)", "Painful: คิดถึง subacute thyroiditis, hemorrhage into nodule, abscess และ malignancy ที่โตเร็ว (anaplastic, lymphoma)", "TSH ต่ำ: thyrotoxicosis, ทำ uptake scan แยก hyperfunction (uptake สูง) จาก destructive thyroiditis หรือ exogenous hormone (uptake ต่ำ)", "Hard fixed ร่วมกับ lymph node โต: สงสัย malignancy จนกว่าจะพิสูจน์ได้ (Riedel thyroiditis ก็ hard fixed ได้)"],
    ix: ["TSH, free T4, T3", "Neck ultrasound", "FNA ตาม TI-RADS", "Ca, PTH ถ้าสงสัย parathyroid"],
    std: "ATA 2016 hyperthyroidism, ATA 2015 thyroid nodule, ACR TI-RADS 2017"
  }, [
    N("Hyperthyroid goiter", "step", {
      s: "TSH ต่ำ free T4 หรือ T3 สูง",
      keys: ["Uptake สูงหรือต่ำ", "Eye signs", "Painful"]
    }, [
      N("Graves disease", "nephro", {
        s: "TRAb-mediated diffuse goiter",
        keys: ["Ophthalmopathy, pretibial myxedema, acropachy", "Diffuse goiter กับ bruit", "Hypokalemic periodic paralysis ในชายเอเชีย", "Antithyroid drug: agranulocytosis เกิดได้ทั้ง methimazole และ PTU, MPO-ANCA vasculitis พบกับ PTU บ่อยกว่า (methimazole ก็มีรายงาน)", "Hyperthyroid เพิ่ม GFR และลด muscle mass ทำให้ Cr ต่ำ แล้ว Cr กลับขึ้นสู่ baseline หลังรักษา (ไม่ใช่ AKI)"],
        ix: ["TRAb, uptake scan diffuse"],
        std: "ATA 2016 hyperthyroidism guideline",
        link: "hypok"
      }),
      N("Toxic nodular goiter and amiodarone thyrotoxicosis", "adj", {
        s: "Autonomous nodule หรือ iodine excess",
        keys: ["ผู้สูงอายุ AF, ไม่มี eye signs", "Jod-Basedow หลัง iodinated contrast", "AIT type 1 (iodine-induced hyperthyroidism บน thyroid ที่ผิดปกติเดิม, uptake ต่ำ ปกติ หรือสูงก็ได้) vs type 2 (destructive thyroiditis, uptake ต่ำมาก), mixed form พบได้", "Amiodarone ยังทำ corneal deposit และ pulmonary toxicity"],
        ix: ["Uptake scan, thyroid US Doppler"],
        link: "palpitation"
      }),
      N("Thyroiditis", "nephro", {
        s: "Subacute (de Quervain), painless, postpartum, ICI-induced",
        keys: ["Subacute: painful tender thyroid หลัง URI, ESR สูง, uptake ต่ำ", "Painless และ postpartum: ไม่เจ็บ, triphasic (hyper แล้ว hypo แล้วกลับปกติ)", "ICI thyroiditis: มักเกิด 4-12 สัปดาห์หลังเริ่ม anti-PD-1 หรือ anti-PD-L1 (เกิดช้ากว่านั้นได้)", "Lithium painless thyroiditis"],
        ix: ["ESR, uptake scan, TPO antibody"],
        link: "onco"
      })
    ]),
    N("Hypothyroid or euthyroid goiter", "step", {
      s: "TSH สูงหรือปกติ",
      keys: ["Antibody", "Drug", "Iodine"]
    }, [
      N("Hashimoto thyroiditis", "nephro", {
        s: "Autoimmune, anti-TPO",
        keys: ["Firm rubbery goiter", "MN และ IgAN มีรายงานร่วมกับ thyroid autoimmunity", "Hypothyroid ทำ Cr สูงขึ้น reversible, hyponatremia, CK สูง", "Thyroid lymphoma risk เพิ่ม (goiter โตเร็ว)"],
        ix: ["Anti-TPO, TSH, free T4"],
        std: "ATA 2014 hypothyroidism guideline",
        link: "nephrotic"
      }),
      N("Lithium-induced goiter", "nephro", {
        s: "Lithium ลด thyroid hormone release",
        why: "Lithium ทำ goiter, hypothyroid, hyperparathyroidism และ NDI พร้อมกัน เป็นแพ็กที่ examiner ชอบถาม",
        keys: ["Goiter ราวหนึ่งในสามของผู้ใช้ lithium นาน", "Hypercalcemia กับ PTH สูง (lithium-associated HPT)", "Polyuria จาก NDI และ microcyst ในไต", "Chronic tubulointerstitial nephropathy"],
        ix: ["TSH, Ca, PTH, urine osmolality, lithium level"],
        link: "polyuria"
      }),
      N("Thyroid dysfunction in kidney disease", "nephro", {
        s: "Nephrotic syndrome, CKD low T3, PD protein loss",
        keys: ["Nephrotic: เสีย TBG และ T4 ทางปัสสาวะ คนที่ thyroid ปกติส่วนใหญ่ยัง euthyroid แต่ผู้ที่กิน levothyroxine อยู่มักต้องเพิ่ม dose", "CKD: low T3 syndrome (euthyroid sick) โดย TSH ปกติ", "Iodine excess จาก povidone-iodine ใน PD หรือ contrast", "Free T4 สูงปลอมได้เมื่อเจาะหลังได้ heparin (เช่นหลัง HD)"],
        ix: ["TSH เป็นตัวหลัก, free T4"],
        link: "nephrotic"
      }),
      N("Riedel thyroiditis and IgG4-related disease", "nephro", {
        s: "Fibrosing thyroiditis",
        keys: ["Stony hard goiter fixed กับ compression", "IgG4-RD: retroperitoneal fibrosis, autoimmune pancreatitis, TIN, MN", "Serum IgG4 สูง, low complement ใน IgG4-TIN"],
        ix: ["IgG4, biopsy, CT"],
        std: "ACR/EULAR 2019 IgG4-RD classification",
        link: "backpain"
      })
    ]),
    N("Thyroid nodule and cancer", "step", {
      s: "Nodule ต้อง risk stratify",
      keys: ["TI-RADS", "Lymph node", "Calcitonin"]
    }, [
      N("Differentiated thyroid cancer", "adj", {
        s: "Papillary และ follicular",
        keys: ["Hypoechoic, microcalcification, taller-than-wide, irregular margin", "Cervical lymph node", "Radiation ในวัยเด็ก", "Lenvatinib และ VEGFR-TKI อื่น: proteinuria และ hypertension"],
        ix: ["US, FNA (Bethesda)"],
        std: "ATA 2015 differentiated thyroid cancer guideline",
        link: "onco"
      }),
      N("Medullary thyroid cancer and MEN2", "nephro", {
        s: "RET mutation",
        keys: ["Calcitonin และ CEA สูง", "MEN2A: MTC, pheochromocytoma, primary hyperparathyroidism", "ต้อง exclude pheo ก่อนผ่าตัด", "Diarrhea จาก calcitonin"],
        ix: ["Calcitonin, plasma metanephrines, Ca, RET testing"],
        std: "ATA 2015 medullary thyroid cancer guideline",
        link: "paroxysm"
      })
    ]),
    N("Parathyroid mass", "step", {
      s: "Hypercalcemia กับ neck mass",
      keys: ["Ca", "PTH"]
    }, [
      N("Parathyroid adenoma, hyperplasia and carcinoma", "nephro", {
        s: "Primary, tertiary hyperparathyroidism และ carcinoma",
        keys: ["Palpable mass ร่วมกับ Ca > 14 mg/dL และ PTH สูงมาก ให้สงสัย carcinoma (adenoma ส่วนใหญ่คลำไม่ได้)", "Tertiary HPT (เกิดใน ESKD ที่เป็น secondary HPT นาน และคงอยู่หลัง KT): hypercalcemia, หลัง KT มี hypophosphatemia ร่วม", "Nephrolithiasis, nephrocalcinosis, osteoporosis", "Jaw tumor ใน HPT-JT (CDC73)"],
        ix: ["Ca, PTH, PO4, sestamibi, 4D-CT, neck US"],
        std: "Fifth International Workshop on Primary Hyperparathyroidism 2022",
        link: "hyperca"
      })
    ]),
    N("Non-thyroid neck mass", "step", {
      s: "ไม่เคลื่อนตามการกลืน",
      keys: ["Lateral vs midline", "Pulsatile", "Inflammatory"]
    }, [
      N("Cervical lymphadenopathy", "nephro", {
        s: "Lymphoma, TB, metastatic SCC, Kikuchi",
        keys: ["TB lymphadenitis: matted, scrofula, fistula", "Lymphoma: rubbery, B symptoms", "Kikuchi: young woman, tender node, SLE overlap", "Metastatic SCC ในคนสูบบุหรี่"],
        ix: ["FNA หรือ excisional biopsy"],
        link: "lymphnode"
      }),
      N("Salivary gland enlargement", "nephro", {
        s: "Sjögren, IgG4 sialadenitis, sarcoid, parotitis",
        keys: ["Bilateral parotid: Sjögren, sarcoid, HIV, IgG4 (Mikulicz)", "Acute suppurative parotitis ใน dehydrated และ melioidosis", "Mumps: parotitis, orchitis, AIN และ GN มีรายงาน", "Uremic parotitis"],
        ix: ["Anti-Ro, IgG4, US"],
        link: "sicca"
      }),
      N("Carotid body tumor and paraganglioma", "nephro", {
        s: "SDHx-associated",
        keys: ["Pulsatile mass ขยับข้างได้แต่ขึ้นลงไม่ได้ (Fontaine sign)", "SDHB: เสี่ยง metastatic disease สูงกว่า SDHx อื่น และพบ renal cell carcinoma ร่วมได้", "Catecholamine-secreting ทำ paroxysmal HT"],
        ix: ["Metanephrines, MRI, SDH testing"],
        link: "paroxysm"
      })
    ])
  ])
};

/* ===================== HYPOGLYCEMIA ===================== */
TREES.hypoglycemia = {
  must: [
    "Whipple triad: อาการ, glucose ต่ำขณะมีอาการ, ดีขึ้นเมื่อให้ glucose",
    "Fasting หรือ postprandial",
    "Insulin, sulfonylurea (glibenclamide, glimepiride, gliclazide), meglitinide",
    "eGFR ล่าสุด, การเปลี่ยน dialysis prescription, glucose-free dialysate",
    "ยา: quinine, pentamidine, fluoroquinolone, TMP-SMX, beta-blocker, methimazole, alpha-lipoic acid",
    "Alcohol, เบื่ออาหาร, sepsis, liver disease",
    "Bariatric surgery, น้ำหนักลด, ก้อนในท้องหรือปอด",
    "เข้าถึงยาเบาหวานของคนในครอบครัว"
  ],
  tree: N("Hypoglycemia", "root", {
    s: "ยืนยัน Whipple triad ก่อน แล้วแบ่งเป็นคนที่เป็นเบาหวาน, คนที่ป่วยหนักหรือได้ยา, และคนที่ดูแข็งแรง (เจาะ insulin, C-peptide, proinsulin, β-hydroxybutyrate ขณะ glucose < 55)",
    why: "ไตปล่อย glucose จาก gluconeogenesis ราวหนึ่งในห้าของ endogenous glucose production ตอนอดอาหารและเป็นที่กำจัด insulin, CKD จึงเพิ่ม hypoglycemia จาก insulin และ sulfonylurea และเกิด burnt-out diabetes",
    keys: ["Glucose < 70 mg/dL alert (level 1), < 54 clinically significant (level 2) ในเบาหวาน", "Non-diabetic: < 55 mg/dL กับ Whipple triad", "Insulin สูง C-peptide ต่ำ = exogenous insulin", "Insulin สูง C-peptide สูง: insulinoma, sulfonylurea หรือ meglitinide, insulin autoimmune syndrome, post-bariatric (C-peptide และ proinsulin สะสมเมื่อ GFR ต่ำ แปลผลใน CKD ต้องระวัง)", "Neuroglycopenic vs adrenergic (beta-blocker บังอาการ)"],
    ix: ["Critical sample ขณะ glucose < 55: insulin, C-peptide, proinsulin, BHB, sulfonylurea screen", "72-hour fast", "Cortisol, IGF-2:IGF-1"],
    std: "Endocrine Society 2009 adult hypoglycemic disorders, ADA Standards of Care 2025"
  }, [
    N("Diabetes treatment-related", "step", {
      s: "สาเหตุบ่อยที่สุด",
      keys: ["Drug clearance ลด", "Intake ลด", "Dialysis day"]
    }, [
      N("Insulin accumulation with reduced GFR", "nephro", {
        s: "Insulin clearance ลดชัดเมื่อ GFR < 20-30 mL/min/1.73 m²",
        keys: ["Hypoglycemia เพิ่มขึ้นทั้งที่ dose เท่าเดิม", "Rule of thumb: ลด insulin dose ราว 25% เมื่อ GFR 10-50 และราว 50% เมื่อ GFR < 10 mL/min แล้วปรับตาม glucose monitoring", "HbA1c ต่ำปลอมจาก ESA, transfusion, RBC lifespan สั้น", "Burnt-out diabetes: ESKD บางรายลดหรือหยุดยาเบาหวานได้ (ต้อง monitor glucose ต่อ)"],
        ix: ["SMBG หรือ CGM, glycated albumin"],
        std: "KDIGO 2022 Diabetes in CKD",
        link: "obesity"
      }),
      N("Sulfonylurea and meglitinide", "nephro", {
        s: "Glibenclamide, glimepiride สะสม, repaglinide น้อยกว่า",
        keys: ["Prolonged หรือ recurrent hypoglycemia นานหลายวัน", "Glibenclamide ควรหลีกเลี่ยงใน CKD (active metabolite สะสม)", "Glipizide และ gliclazide ปลอดภัยกว่า", "Sulfonylurea-induced ที่เป็นซ้ำหลังให้ dextrose: ให้ octreotide ร่วมกับ dextrose", "Accidental ingestion: insulin และ C-peptide สูง ต้อง screen drug"],
        ix: ["Sulfonylurea screen, insulin, C-peptide"]
      }),
      N("Dialysis-related hypoglycemia", "nephro", {
        s: "Glucose-free dialysate, insulin ก่อนฟอก, ไม่ได้กินอาหาร",
        keys: ["เกิดระหว่างฟอก หรือในช่วง 2-4 ชั่วโมงหลังฟอก", "Glucose ถูกดึงออกทาง dialyzer", "PD: hyperglycemia ระหว่าง dwell และ hypoglycemia เมื่อเปลี่ยนเป็น icodextrin หรือหยุด PD โดยไม่ลด insulin", "Icodextrin ทำ glucose meter (GDH-PQQ) อ่านสูงปลอม ปิดบัง hypoglycemia"],
        ix: ["Glucose ระหว่างฟอก, ตรวจ meter type ใน PD icodextrin"]
      })
    ]),
    N("Ill or medicated", "step", {
      s: "Critical illness หรือยาที่ไม่ใช่เบาหวาน",
      keys: ["Sepsis", "Organ failure", "Drug"]
    }, [
      N("Sepsis, liver and kidney failure", "nephro", {
        s: "ลด gluconeogenesis และเพิ่ม glucose utilization",
        keys: ["Sepsis: hypoglycemia เป็น poor prognostic sign", "Fulminant liver failure: glycogen หมด", "AKI และ ESKD: ลด renal gluconeogenesis", "Malaria รุนแรง: hypoglycemia จากตัวโรคเองและจาก quinine (กระตุ้น insulin secretion)"],
        ix: ["Lactate, LFT, culture"],
        link: "shock"
      }),
      N("Drug-induced non-diabetic hypoglycemia", "nephro", {
        s: "Quinine, pentamidine, fluoroquinolone, TMP-SMX, beta-blocker, indomethacin",
        keys: ["TMP-SMX dose สูงใน CKD (PJP) กระตุ้น insulin secretion", "Pentamidine: hypoglycemia ช่วงแรกแล้วตามด้วย diabetes", "Levofloxacin และ gatifloxacin ในผู้สูงอายุ CKD", "Quinine ใน malaria และ leg cramps"],
        ix: ["Drug review, insulin และ C-peptide สูงในยาที่กระตุ้น secretion"],
        link: "kt-fever"
      }),
      N("Adrenal insufficiency and hypopituitarism", "nephro", {
        s: "Cortisol และ GH deficiency",
        keys: ["Steroid withdrawal ในผู้ป่วย GN และ KT", "Hyponatremia, eosinophilia, hypotension", "Hypopituitarism: ICI hypophysitis, Sheehan", "Hypoglycemia ตอนเช้ามืด"],
        ix: ["Cortisol ตอนเช้า, ACTH stimulation"],
        std: "Endocrine Society 2016 adrenal insufficiency",
        link: "hypona"
      }),
      N("Alcohol and starvation", "adj", {
        s: "Glycogen depletion",
        keys: ["Binge drinking โดยไม่กินอาหาร", "Alcoholic ketoacidosis ร่วม", "PEW และ cachexia"],
        ix: ["BHB, ethanol"],
        link: "agma"
      }),
      N("Non-islet cell tumor hypoglycemia", "adj", {
        s: "IGF-2-secreting tumor (mesothelioma, solitary fibrous tumor, HCC)",
        keys: ["Large mesenchymal tumor", "Insulin และ C-peptide ต่ำ", "IGF-2:IGF-1 ratio > 10", "Doege-Potter: pleural SFT กับ hypoglycemia"],
        ix: ["IGF-1, IGF-2, CT"],
        link: "onco"
      })
    ]),
    N("Seemingly well individual", "step", {
      s: "Endogenous hyperinsulinism",
      keys: ["72-hour fast", "Postprandial", "Antibodies"]
    }, [
      N("Insulinoma", "adj", {
        s: "Pancreatic neuroendocrine tumor",
        keys: ["Fasting hypoglycemia, น้ำหนักเพิ่ม", "72-h fast: glucose < 55 กับ insulin ≥ 3 µU/mL, C-peptide ≥ 0.6 ng/mL, proinsulin ≥ 5 pmol/L, BHB ≤ 2.7 mmol/L", "Sulfonylurea screen negative", "MEN1: PHPT, pituitary, pancreatic NET"],
        ix: ["72-hour fast, EUS, CT, Ga-68 exendin หรือ DOTATATE PET"],
        std: "Endocrine Society 2009"
      }),
      N("Autoimmune insulin syndrome (Hirata disease)", "adj", {
        s: "Insulin autoantibody, พบบ่อยในเอเชียตะวันออก",
        keys: ["Postprandial แล้ว late hypoglycemia", "Insulin สูงมาก (> 1000 µU/mL) ไม่สมกับ C-peptide", "Trigger: methimazole, alpha-lipoic acid, clopidogrel, sulfhydryl drugs", "HLA-DR4 (DRB1*04:06)"],
        ix: ["Insulin autoantibody, PEG precipitation"]
      }),
      N("Factitious hypoglycemia", "adj", {
        s: "Surreptitious insulin หรือ sulfonylurea",
        keys: ["บุคลากรการแพทย์หรือญาติของผู้ป่วยเบาหวาน", "Insulin สูง C-peptide ต่ำ (insulin)", "Sulfonylurea level positive"],
        ix: ["Insulin, C-peptide, sulfonylurea screen"]
      }),
      N("Post-bariatric hypoglycemia", "adj", {
        s: "Post-Roux-en-Y, nesidioblastosis",
        keys: ["เกิด 1-3 ชั่วโมงหลังอาหาร เริ่มมีอาการราว 1 ปีขึ้นไปหลังผ่าตัด", "หลัง Roux-en-Y พบ enteric hyperoxaluria และ oxalate nephropathy ร่วมได้", "Mixed meal test"],
        ix: ["Mixed meal test, CGM"],
        link: "diarrhea"
      })
    ])
  ])
};

/* ===================== GYNECOMASTIA ===================== */
TREES.gynecomastia = {
  must: [
    "ข้างเดียวหรือสองข้าง, เจ็บ, โตเร็ว, แข็ง eccentric (cancer)",
    "ยา: spironolactone, cimetidine, ketoconazole, digoxin, finasteride, antiandrogen, GnRH agonist, efavirenz, isoniazid",
    "Anabolic steroid, marijuana, alcohol, herbal (lavender, tea tree)",
    "เพิ่งเริ่ม dialysis หรือกลับมากินได้หลังป่วยหนัก",
    "Libido ลด, erectile dysfunction, ขนาดอัณฑะ",
    "Liver disease, hyperthyroid symptoms",
    "ก้อนที่อัณฑะ"
  ],
  tree: N("Gynecomastia", "root", {
    s: "แยก true glandular tissue จาก pseudogynecomastia และ breast cancer ก่อน แล้วหาสมดุล estrogen กับ androgen ที่เสียไป",
    why: "Spironolactone และ CKD hypogonadism เป็นสาเหตุที่ nephrologist ต้องจัดการเอง, refeeding gynecomastia หลังเริ่ม dialysis เป็นข้อสอบคลาสสิก",
    keys: ["Rubbery concentric disc ใต้ areola = glandular", "Hard eccentric fixed ร่วมกับ nipple discharge: สงสัย cancer ต้อง imaging และ biopsy", "อัณฑะเล็ก: hypogonadism (primary เช่น Klinefelter หรือ secondary), cirrhosis, anabolic steroid", "Recent onset เจ็บ = active proliferative phase"],
    ix: ["Testosterone, LH, FSH, estradiol, hCG, prolactin, TSH, LFT, Cr", "Testicular US ถ้า hCG หรือ estradiol สูง", "Mammogram ถ้าสงสัย cancer"],
    std: "European Academy of Andrology 2019 gynecomastia guideline, Endocrine Society 2018 testosterone therapy in men with hypogonadism"
  }, [
    N("Drug-induced", "step", {
      s: "สาเหตุที่แก้ได้บ่อยที่สุด",
      keys: ["Temporal relation", "Dose-dependent"]
    }, [
      N("Spironolactone and aldosterone antagonists", "nephro", {
        s: "Androgen receptor antagonism",
        keys: ["Dose-dependent, ราว 10% ใน dose ทั่วไปและมากขึ้นใน dose สูง", "Eplerenone และ finerenone แทบไม่มี", "ใช้ใน resistant HT, HF, ascites", "มักดีขึ้นภายในไม่กี่เดือนหลังหยุดหรือเปลี่ยนยา (ถ้าเป็นนานเกิน 1 ปีจน fibrosis มักไม่ยุบ)"],
        ix: ["Drug review"],
        link: "htn-young"
      }),
      N("Other gynecomastia drugs", "nephro", {
        s: "Cimetidine, ketoconazole, digoxin, 5-ARI, bicalutamide, GnRH agonist, efavirenz, isoniazid, omeprazole",
        keys: ["Antiandrogen และ ADT ใน prostate cancer เป็นสาเหตุใหญ่", "Efavirenz ใน HIV", "Anabolic steroid: testicular atrophy, erythrocytosis, FSGS", "Marijuana และ alcohol"],
        ix: ["Drug review"]
      })
    ]),
    N("Decreased androgen", "step", {
      s: "Hypogonadism",
      keys: ["Testosterone ต่ำ", "LH สูงหรือต่ำ"]
    }, [
      N("CKD and dialysis hypogonadism", "nephro", {
        s: "Primary gonadal failure ร่วม hyperprolactinemia",
        keys: ["Testosterone ต่ำพบบ่อยในชาย dialysis (รายงานราว 26-66%)", "LH สูงแต่ pulsatility ผิดปกติ, prolactin สูง", "Erectile dysfunction, infertility, anemia ที่ดื้อ ESA", "ดีขึ้นหลัง KT"],
        ix: ["Testosterone ตอนเช้า, LH, FSH, prolactin"],
        link: "sexual"
      }),
      N("Refeeding gynecomastia", "nephro", {
        s: "หลังเริ่ม dialysis, หลังหายจาก illness หรือ starvation",
        keys: ["เกิดไม่กี่เดือนหลังเริ่ม dialysis หรือกลับมากินได้", "เมื่อกลับมากินได้ gonadotropin และ gonadal function ฟื้นคล้าย second puberty ทำให้ estrogen เด่นกว่า androgen ชั่วคราว", "มักหายเองใน 1-2 ปี"],
        ix: ["Clinical diagnosis"]
      }),
      N("Primary and secondary hypogonadism", "adj", {
        s: "Klinefelter, orchitis, pituitary disease",
        keys: ["Klinefelter: small firm testes < 4 mL, tall, 47,XXY", "Mumps orchitis, testicular trauma, chemotherapy (cyclophosphamide)", "Secondary: LH ต่ำ, prolactinoma, hemochromatosis, opioid"],
        ix: ["Karyotype, MRI pituitary, ferritin"]
      })
    ]),
    N("Increased estrogen", "step", {
      s: "Estrogen production หรือ conversion เพิ่ม",
      keys: ["Estradiol สูง", "hCG สูง"]
    }, [
      N("Cirrhosis and hyperthyroidism", "nephro", {
        s: "Aromatization เพิ่มและ SHBG สูง",
        keys: ["Cirrhosis: spider nevi, testicular atrophy, spironolactone ร่วม", "Hyperthyroid: SHBG สูง, free testosterone ต่ำ"],
        ix: ["LFT, TSH, SHBG"],
        link: "jaundice"
      }),
      N("hCG and estrogen-secreting tumor", "adj", {
        s: "Testicular germ cell, Leydig หรือ Sertoli cell tumor, hCG-secreting lung, adrenal carcinoma",
        keys: ["Testicular mass, hCG สูง", "Rapid progressive gynecomastia", "Adrenal carcinoma: estradiol สูง, DHEAS สูง, Cushing features", "Large cell lung cancer ทำ hCG"],
        ix: ["hCG, estradiol, testicular US, CT adrenal"]
      })
    ]),
    N("Physiological and mimics", "step", {
      s: "Pubertal, aging, obesity",
      keys: ["Age", "Bilateral soft"]
    }, [
      N("Physiological and obesity-related", "adj", {
        s: "Puberty, aging, aromatase ใน adipose",
        keys: ["Pubertal ส่วนใหญ่หายเองใน 1-2 ปี", "Pseudogynecomastia: fat ไม่มี glandular disc", "Aging: testosterone ลด, aromatization เพิ่ม"],
        ix: ["Clinical exam"],
        link: "obesity"
      }),
      N("Male breast cancer", "adj", {
        s: "BRCA2, Klinefelter",
        keys: ["Unilateral hard eccentric, fixed, skin dimpling", "Nipple retraction, bloody discharge, axillary node", "Klinefelter risk สูงขึ้นมาก"],
        ix: ["Mammogram, US, biopsy"],
        link: "onco"
      })
    ])
  ])
};

/* ===================== HIRSUTISM AND VIRILIZATION ===================== */
TREES.hirsutism = {
  must: [
    "Terminal hair แบบชาย (androgen-dependent) หรือ fine hair ทั่วตัว (hypertrichosis)",
    "Onset และความเร็ว: ช้าตั้งแต่วัยรุ่น vs เร็วใน 6-12 เดือน",
    "Virilization: เสียงห้าว, clitoromegaly, กล้ามเนื้อมากขึ้น, temporal balding",
    "ประจำเดือนไม่สม่ำเสมอ, infertility, acne",
    "ยา: cyclosporine, minoxidil, phenytoin, diazoxide, danazol, testosterone, valproate",
    "Cushingoid features, galactorrhea",
    "Family history และเชื้อชาติ"
  ],
  tree: N("Hirsutism and virilization", "root", {
    s: "แยก hypertrichosis จาก hirsutism ก่อน แล้ว hirsutism ที่โตเร็วหรือมี virilization ต้อง exclude androgen-secreting tumor",
    why: "Cyclosporine และ minoxidil ทำ hypertrichosis ซึ่งเป็นปัญหาความร่วมมือใน KT และ resistant HT, PCOS และ Cushing เชื่อมกับ metabolic และ kidney risk",
    keys: ["Modified Ferriman-Gallwey ≥ 8 (cut-off ต่ำกว่าในคนเอเชีย ราว ≥ 4-6)", "Hypertrichosis: ไม่ขึ้นกับ androgen, ทั่วตัว, ขนนุ่ม", "Rapid onset หรือ virilization: ต้อง exclude androgen-secreting tumor", "Total testosterone > 150-200 ng/dL หรือ DHEAS > 700 µg/dL: สงสัย tumor ต้อง imaging (ไม่จำเพาะ, hyperthecosis ก็สูงได้ และค่าต่ำกว่านี้ไม่ตัด tumor ถ้า clinical เร็ว)"],
    ix: ["Total testosterone (ตอนเช้า, follicular phase), SHBG", "DHEAS, 17-OHP, prolactin, TSH", "Pelvic US, adrenal CT ตามผล"],
    std: "Endocrine Society 2018 hirsutism guideline, International PCOS guideline 2023"
  }, [
    N("Hypertrichosis", "step", {
      s: "Non-androgenic hair",
      keys: ["Drug", "Paraneoplastic", "Porphyria"]
    }, [
      N("Drug-induced hypertrichosis", "nephro", {
        s: "Cyclosporine, minoxidil, phenytoin, diazoxide",
        why: "Cyclosporine ทำ hypertrichosis และ gingival hyperplasia ซึ่งเป็นเหตุผลเปลี่ยนเป็น tacrolimus โดยเฉพาะในผู้หญิงและเด็ก",
        keys: ["ขนนุ่มทั่วหน้า แขน หลัง ไม่ใช่ pattern ชาย", "Cyclosporine: gingival hyperplasia, hyperuricemia, hypertension ร่วม", "Minoxidil: pericardial effusion และ fluid retention", "Testosterone ปกติ"],
        ix: ["Drug review, testosterone ปกติ"],
        link: "kt-late"
      }),
      N("Porphyria cutanea tarda and anorexia", "nephro", {
        s: "Metabolic hypertrichosis",
        keys: ["PCT: hypertrichosis บนโหนกแก้ม, blister มือ, HCV, iron, dialysis", "Anorexia nervosa: lanugo", "Paraneoplastic hypertrichosis lanuginosa acquisita"],
        ix: ["Plasma porphyrin, HCV, ferritin"],
        link: "hyperpig"
      })
    ]),
    N("Hyperandrogenism, gradual", "step", {
      s: "เริ่มวัยรุ่น ค่อยเป็นค่อยไป",
      keys: ["Oligomenorrhea", "Insulin resistance"]
    }, [
      N("Polycystic ovary syndrome", "nephro", {
        s: "Hyperandrogenism, ovulatory dysfunction, polycystic ovarian morphology",
        keys: ["Rotterdam 2 ใน 3 หลัง exclude สาเหตุอื่น", "Acanthosis nigricans, obesity, insulin resistance", "AMH สูงใช้แทน ovarian morphology ได้ในผู้ใหญ่ (2023)", "Risk T2DM, OSA, metabolic syndrome และ obesity-related glomerulopathy"],
        ix: ["Testosterone, SHBG, AMH, pelvic US, OGTT, lipid"],
        std: "International PCOS guideline 2023",
        link: "obesity"
      }),
      N("Non-classic congenital adrenal hyperplasia", "nephro", {
        s: "21-hydroxylase deficiency (CYP21A2)",
        keys: ["Early morning follicular 17-OHP > 200 ng/dL ต้อง ACTH stimulation", "Stimulated 17-OHP > 1000 ng/dL ยืนยัน", "11β-hydroxylase deficiency ทำ virilization ร่วมกับ hypertension และ hypokalemia (DOC excess), ส่วน 17α-hydroxylase deficiency ทำ hypertension กับ hypokalemia แต่ androgen ต่ำจึงไม่มี hirsutism"],
        ix: ["17-OHP, ACTH stimulation, CYP21A2 genotyping"],
        std: "Endocrine Society 2018 CAH guideline",
        link: "htn-young"
      }),
      N("Idiopathic hirsutism and hyperprolactinemia", "adj", {
        s: "Androgen ปกติ หรือ prolactin สูง",
        keys: ["Ovulatory cycle ปกติ, androgen ปกติ", "Hyperprolactinemia: galactorrhea, amenorrhea, prolactin สูงใน CKD", "Hypothyroid ทำ prolactin สูง"],
        ix: ["Prolactin, TSH"]
      })
    ]),
    N("Hyperandrogenism, rapid or virilizing", "step", {
      s: "ต้อง exclude tumor",
      keys: ["Virilization", "Testosterone สูงมาก"]
    }, [
      N("Androgen-secreting ovarian and adrenal tumor", "adj", {
        s: "Sertoli-Leydig, adrenocortical carcinoma",
        keys: ["Virilization progress ภายในไม่กี่เดือน", "Total testosterone > 150-200 ng/dL: สงสัย tumor (ovarian บ่อยกว่า แต่ adrenal ก็ทำได้)", "DHEAS > 700 µg/dL ชี้ไปทาง adrenal source", "Adrenal carcinoma: Cushing features, hypokalemia, mass > 4-6 cm"],
        ix: ["Testosterone, DHEAS, transvaginal US, CT adrenal"],
        link: "cushingoid"
      }),
      N("Cushing syndrome", "nephro", {
        s: "Cortisol excess, ACTH-dependent adrenal androgen",
        keys: ["Purple striae > 1 cm, proximal myopathy, easy bruising", "Hypokalemia และ hypertension โดยเฉพาะ ectopic ACTH", "Hirsutism มากใน adrenal carcinoma และ Cushing disease", "Exogenous glucocorticoid กด adrenal androgen จึงมักไม่ทำ true hirsutism (ทำ hypertrichosis ขนอ่อนได้)"],
        ix: ["Late-night salivary cortisol, 1 mg DST, 24-h UFC (UFC ต่ำปลอมเมื่อ GFR < 60)"],
        std: "Endocrine Society 2008 Cushing diagnosis, Pituitary Society 2021 consensus",
        link: "cushingoid"
      }),
      N("Ovarian hyperthecosis", "adj", {
        s: "Postmenopausal hyperandrogenism",
        keys: ["Postmenopausal progressive virilization", "Bilateral solid ovarian enlargement", "Insulin resistance"],
        ix: ["Testosterone, GnRH agonist suppression test, MRI"]
      })
    ])
  ])
};

/* ===================== AMENORRHEA AND MENSTRUAL DISTURBANCE ===================== */
TREES.menstrual = {
  must: [
    "Exclude ตั้งครรภ์ก่อนเสมอ",
    "Primary (ไม่เคยมี) vs secondary (หยุด ≥ 3 เดือนถ้าเดิมสม่ำเสมอ หรือ ≥ 6 เดือนถ้าเดิมไม่สม่ำเสมอ)",
    "Menorrhagia: ระยะเวลา, ผ้าอนามัยต่อวัน, ซีด",
    "Cyclophosphamide cumulative dose (LN, AAV), radiation",
    "Dialysis modality, eGFR, KT (fertility กลับมาเร็ว)",
    "Galactorrhea, hirsutism, น้ำหนักเปลี่ยน, ออกกำลังมาก",
    "Anticoagulant, antiplatelet, heparin ระหว่างฟอก",
    "Contraception และแผนมีบุตร (MMF, ACEi, warfarin teratogenic)"
  ],
  tree: N("Amenorrhea, menstrual disturbance and infertility", "root", {
    s: "Exclude pregnancy แล้วใช้ prolactin, TSH, FSH, estradiol แบ่งเป็น hypothalamic-pituitary, ovarian และ uterine outflow",
    why: "CKD ทำ HPO axis dysfunction และ hyperprolactinemia, cyclophosphamide ทำ premature ovarian insufficiency, menorrhagia ใน dialysis เพิ่ม ESA requirement และ fertility กลับมาหลัง KT จึงต้องคุมกำเนิด",
    keys: ["β-hCG ต้องตรวจทุกราย (ESKD มี hCG สูงเล็กน้อยได้โดยไม่ตั้งครรภ์ จาก clearance ลด ให้ดู trend และ ultrasound)", "FSH สูง: ovarian insufficiency, FSH ต่ำหรือปกติ: hypothalamic-pituitary, PCOS หรือ uterine outflow", "Prolactin สูงใน CKD ราวหนึ่งในสามถึงครึ่ง", "Estrogen status ผ่าน endometrial thickness"],
    ix: ["β-hCG, prolactin, TSH, FSH, LH, estradiol, AMH", "Testosterone ถ้ามี hyperandrogenism", "Pelvic US, MRI pituitary"],
    std: "ASRM 2008 amenorrhea practice committee, ESHRE 2024 POI guideline, FIGO 2018 AUB system (PALM-COEIN)"
  }, [
    N("Hypothalamic-pituitary", "step", {
      s: "FSH ต่ำหรือปกติ estradiol ต่ำ",
      keys: ["Prolactin", "Weight", "Illness"]
    }, [
      N("CKD-associated amenorrhea", "nephro", {
        s: "Loss of LH surge, hyperprolactinemia, anovulation",
        keys: ["Amenorrhea หรือ oligomenorrhea พบในผู้หญิงวัยเจริญพันธุ์ที่ dialysis ส่วนใหญ่", "Menorrhagia ใน dialysis ก็พบ (anovulatory bleeding กับ heparin)", "Pregnancy ระหว่าง dialysis เกิดได้และมี risk สูง (amenorrhea ไม่ใช่การคุมกำเนิด)", "Fertility กลับมาภายใน 1-6 เดือนหลัง KT"],
        ix: ["Prolactin, LH, FSH, estradiol, β-hCG"],
        std: "KDIGO 2009 care of KT recipients (sexual function and fertility)",
        link: "pregnancy"
      }),
      N("Functional hypothalamic amenorrhea", "adj", {
        s: "Weight loss, exercise, stress, critical illness",
        keys: ["Low energy availability", "LH ต่ำ, estradiol ต่ำ", "Bone loss"],
        ix: ["LH, FSH, estradiol, DXA"],
        std: "Endocrine Society 2017 FHA guideline"
      }),
      N("Hyperprolactinemia and pituitary disease", "nephro", {
        s: "Prolactinoma, drug, CKD, hypothyroid, Sheehan, hypophysitis",
        keys: ["Galactorrhea, headache, visual field", "Drug: metoclopramide, domperidone, antipsychotic", "CKD: prolactin สูง 2-3 เท่า จาก clearance ลดและ dopamine ผิดปกติ", "Sheehan: PPH แล้ว lactation failure และ amenorrhea", "Macroprolactin ทำ prolactin สูงปลอม"],
        ix: ["Prolactin, macroprolactin, MRI pituitary"],
        std: "Endocrine Society 2011 hyperprolactinemia",
        link: "vision"
      })
    ]),
    N("Ovarian", "step", {
      s: "FSH สูงหรือ hyperandrogenism",
      keys: ["FSH > 25 IU/L", "Androgen"]
    }, [
      N("Premature ovarian insufficiency from cyclophosphamide", "nephro", {
        s: "Gonadotoxicity ใน LN และ AAV",
        why: "Risk ขึ้นกับอายุและ cumulative dose, Euro-Lupus low dose ลด risk และ ACR 2020 แนะนำแบบ conditional ให้ GnRH agonist ร่วมระหว่างได้ cyclophosphamide",
        keys: ["ก่อนอายุ 40: amenorrhea หรือประจำเดือนไม่สม่ำเสมอ ≥ 4 เดือน ร่วมกับ FSH > 25 IU/L หนึ่งครั้ง (ตรวจซ้ำหลัง 4-6 สัปดาห์เฉพาะเมื่อไม่แน่ใจ)", "Risk สูงในอายุ > 30 และ cumulative dose สูง", "AMH ต่ำ", "Hot flush, osteoporosis"],
        ix: ["FSH, estradiol, AMH"],
        std: "ESHRE 2024 POI guideline, ACR 2020 reproductive health",
        link: "rpgn"
      }),
      N("Autoimmune and genetic POI", "nephro", {
        s: "APS-2 (autoimmune adrenal), Turner, FMR1 premutation, galactosemia",
        keys: ["Autoimmune: adrenal insufficiency และ thyroid ร่วม", "Turner: short stature, horseshoe kidney, coarctation, webbed neck", "FMR1 premutation: family history fragile X"],
        ix: ["Karyotype, FMR1, 21-hydroxylase antibody"],
        link: "shortstature"
      }),
      N("Polycystic ovary syndrome", "nephro", {
        s: "Oligo-anovulation กับ hyperandrogenism",
        keys: ["Oligomenorrhea ตั้งแต่วัยรุ่น", "Hirsutism, acne, obesity", "Insulin resistance"],
        ix: ["Testosterone, AMH, pelvic US"],
        std: "International PCOS guideline 2023",
        link: "hirsutism"
      })
    ]),
    N("Uterine and outflow", "step", {
      s: "Hormone ปกติ",
      keys: ["Previous instrumentation", "Congenital"]
    }, [
      N("Müllerian anomaly with renal agenesis", "nephro", {
        s: "MRKH, HNF1B, OHVIRA",
        keys: ["MRKH: primary amenorrhea, absent uterus, normal secondary sex characteristics", "MURCS: Müllerian, renal agenesis, cervicothoracic somite", "HNF1B: MODY5, kidney cyst, hypomagnesemia, uterine anomaly", "OHVIRA: obstructed hemivagina กับ ipsilateral renal agenesis"],
        ix: ["Pelvic MRI, kidney US, HNF1B testing"],
        link: "kidneysize"
      }),
      N("Asherman syndrome", "adj", {
        s: "Intrauterine adhesion หลัง curettage",
        keys: ["Secondary amenorrhea หลัง D&C", "Hormone ปกติ, ไม่มีเลือดออกหลัง estrogen-progestin challenge"],
        ix: ["Hysteroscopy"]
      })
    ]),
    N("Heavy menstrual bleeding", "step", {
      s: "Menorrhagia",
      keys: ["Coagulopathy", "Structural", "Endocrine"]
    }, [
      N("Bleeding disorder and anticoagulation", "nephro", {
        s: "Uremic platelet dysfunction, heparin, warfarin, von Willebrand",
        keys: ["Menorrhagia ตั้งแต่ menarche: ตรวจหา inherited bleeding disorder โดยเฉพาะ von Willebrand disease", "Heparin ระหว่างฟอก ทำเลือดออกมากขึ้น", "ESA requirement สูงขึ้นจาก iron loss", "Acquired vWD ใน hypothyroid และ AS (Heyde)"],
        ix: ["CBC, ferritin, vWF panel, PT, aPTT"],
        link: "bleeding"
      }),
      N("Structural and endometrial disease", "adj", {
        s: "Fibroid, polyp, adenomyosis, endometrial hyperplasia or cancer",
        keys: ["PALM: polyp, adenomyosis, leiomyoma, malignancy", "Endometrial cancer risk: obesity, anovulation, tamoxifen", "Fibroid ใหญ่กดท่อไตได้ (hydronephrosis)"],
        ix: ["Transvaginal US, endometrial biopsy เมื่ออายุ ≥ 45 หรืออายุน้อยกว่าที่มี risk (obesity, chronic anovulation, ไม่ตอบสนองต่อยา)"],
        std: "FIGO 2018 AUB classification",
        link: "hydro"
      }),
      N("Hypothyroidism", "adj", {
        s: "Menorrhagia และ anovulation",
        keys: ["TSH สูง", "Hyperprolactinemia ร่วม"],
        ix: ["TSH"],
        link: "goiter"
      })
    ])
  ])
};

/* ===================== ERECTILE AND SEXUAL DYSFUNCTION ===================== */
TREES.sexual = {
  must: [
    "Erectile dysfunction, libido ลด, ejaculatory dysfunction หรือ infertility",
    "Onset ทันทีหรือค่อยเป็น, morning erection ยังมีหรือไม่",
    "Vascular risk: DM, HT, smoking, CKD, CAD",
    "ยา: thiazide, beta-blocker, spironolactone, SSRI, antipsychotic, opioid, 5-ARI, mTOR inhibitor",
    "Dialysis vintage, Hb, PTH, KT surgery (internal iliac anastomosis)",
    "Nitrate use (ห้ามใช้ PDE5 inhibitor)",
    "Depression, relationship"
  ],
  tree: N("Erectile and sexual dysfunction", "root", {
    s: "แยก psychogenic (ฉับพลัน situational, nocturnal erection ปกติ) จาก organic (ค่อยเป็น ทุกสถานการณ์) แล้วหา vascular, neurogenic, endocrine และ drug",
    why: "ED พบในชาย dialysis ส่วนใหญ่, เป็น marker ของ CV disease และสัมพันธ์กับ hypogonadism, anemia, hyperparathyroidism, ยา antihypertensive และ mTOR inhibitor",
    keys: ["Morning erection ปกติ ชี้ไปทาง psychogenic (ไม่ตัด organic ระยะแรก)", "Libido ลดเด่น: หา hypogonadism, hyperprolactinemia และ depression", "Vasculogenic ED มักนำหน้า CAD event ราว 2-5 ปี จึงต้องประเมิน CV risk", "IIEF-5 score"],
    ix: ["Morning total testosterone, LH, prolactin", "HbA1c, lipid, TSH", "Hb, PTH ใน CKD"],
    std: "AUA 2018 erectile dysfunction guideline, EAU 2024 sexual and reproductive health guideline"
  }, [
    N("Vascular", "step", {
      s: "Arteriogenic และ venous leak",
      keys: ["Atherosclerosis", "Gradual onset"]
    }, [
      N("Atherosclerotic and diabetic vasculogenic ED", "nephro", {
        s: "Penile endothelial dysfunction",
        keys: ["DM, HT, smoking, dyslipidemia, CKD", "Gradual onset, ทุกสถานการณ์", "Coronary disease ตามมา (ED เป็น early marker)", "PDE5 inhibitor ลด dose ใน dialysis, ห้ามใช้ร่วม nitrate"],
        ix: ["HbA1c, lipid, CV risk assessment"]
      }),
      N("Post-transplant pelvic steal", "nephro", {
        s: "Internal iliac anastomosis โดยเฉพาะ bilateral ใน second KT",
        keys: ["ED หลัง KT ที่ใช้ internal iliac artery end-to-end", "Bilateral internal iliac ligation เสี่ยงสูง", "Buttock claudication ร่วม"],
        ix: ["Operative note, penile Doppler"],
        link: "kt-late"
      }),
      N("Peyronie disease and priapism", "adj", {
        s: "Structural penile disease ทำ veno-occlusive dysfunction",
        keys: ["Peyronie: penile curvature ร่วมกับ plaque", "ED ตามหลัง ischemic priapism (corporal fibrosis): sickle cell, trazodone, intracavernosal injection, มีรายงานจาก heparin ระหว่าง HD"],
        ix: ["Penile US"]
      })
    ]),
    N("Endocrine", "step", {
      s: "Hypogonadism และ hormone",
      keys: ["Libido ลด", "Testosterone ต่ำ"]
    }, [
      N("Uremic hypogonadism and hyperprolactinemia", "nephro", {
        s: "CKD stage 4-5 และ dialysis",
        keys: ["Testosterone ต่ำ, LH สูง, prolactin สูง", "Anemia และ secondary HPT ร่วม", "Zinc deficiency มีส่วน", "ดีขึ้นบางส่วนหลัง KT"],
        ix: ["Testosterone, LH, FSH, prolactin, zinc"],
        link: "gynecomastia"
      }),
      N("mTOR inhibitor-induced hypogonadism", "nephro", {
        s: "Sirolimus, everolimus",
        keys: ["Testosterone ลด, LH และ FSH สูง", "Oligospermia และ infertility (มักดีขึ้นหลังหยุดยา)", "Proteinuria, edema, mouth ulcer ร่วม"],
        ix: ["Testosterone, semen analysis"],
        link: "kt-late"
      }),
      N("Hypothyroidism, diabetes and pituitary disease", "adj", {
        s: "Endocrine causes อื่น",
        keys: ["Prolactinoma: libido ลด, headache, field defect", "ทั้ง hypothyroid และ hyperthyroid ทำ ED ได้", "Hemochromatosis: hypogonadotropic hypogonadism"],
        ix: ["TSH, prolactin, ferritin, MRI pituitary"],
        link: "goiter"
      })
    ]),
    N("Neurogenic", "step", {
      s: "Autonomic หรือ spinal",
      keys: ["Neuropathy", "Bladder dysfunction"]
    }, [
      N("Autonomic neuropathy", "nephro", {
        s: "Diabetes, AL amyloidosis, uremic",
        keys: ["Orthostatic hypotension, gastroparesis, bladder", "AL amyloid: ED เป็นอาการแรก ๆ ของ autonomic neuropathy ร่วม nephrotic", "Retrograde ejaculation ใน DM"],
        ix: ["Autonomic testing, FLC"],
        link: "syncope"
      }),
      N("Spinal cord, pelvic surgery and MS", "adj", {
        s: "Radical prostatectomy, cystectomy, spinal injury",
        keys: ["Onset หลังผ่าตัด", "Neurogenic bladder ร่วม", "MS: young, relapsing neurological deficit"],
        ix: ["Neurological exam"],
        link: "luts"
      })
    ]),
    N("Drug and psychogenic", "step", {
      s: "Reversible",
      keys: ["Temporal relationship", "Situational"]
    }, [
      N("Drug-induced sexual dysfunction", "nephro", {
        s: "Thiazide, beta-blocker, spironolactone, SSRI, antipsychotic, opioid, 5-ARI",
        keys: ["Thiazide และ non-vasodilating beta-blocker มากกว่า ACEi และ ARB", "Spironolactone: libido ลด และ gynecomastia", "SSRI: delayed ejaculation, anorgasmia", "Nebivolol ทำ ED น้อยกว่า"],
        ix: ["Drug review"]
      }),
      N("Psychogenic and depression", "adj", {
        s: "Performance anxiety, depression, relationship",
        keys: ["Sudden onset, situational", "Morning และ nocturnal erection ปกติ", "Depression พบบ่อยใน dialysis"],
        ix: ["PHQ-9"],
        link: "cognition"
      })
    ])
  ])
};

/* ===================== SKIN HYPERPIGMENTATION ===================== */
TREES.hyperpig = {
  must: [
    "Diffuse หรือ localized, sun-exposed, mucosa, palmar crease, scar",
    "Onset และ progression",
    "ยา: minocycline, amiodarone, hydroxychloroquine, chemotherapy, zidovudine",
    "Steroid ที่เพิ่งหยุด, เพลีย, เบื่ออาหาร, หน้ามืด",
    "Blister ที่หลังมือ, HCV, alcohol, iron",
    "DM, liver disease, joint pain (hemochromatosis)",
    "Dialysis vintage, adequacy"
  ],
  tree: N("Skin hyperpigmentation", "root", {
    s: "แยก diffuse กับ localized ก่อน, diffuse ต้องคิด endocrine (ACTH), metabolic (iron, uremia), drug แล้วจึงคิด dermatologic",
    why: "Uremic hyperpigmentation, PCT และ pseudoporphyria ใน dialysis, Addison และ hemochromatosis เป็นสาเหตุที่เชื่อมกับไตและ electrolyte โดยตรง",
    keys: ["Mucosal และ palmar crease pigment ที่เพิ่งเป็น ชี้ไปทาง ACTH excess (ต้องแยก racial pigmentation และ drug)", "Sun-exposed: คิดถึง photosensitizing drug, PCT, pellagra", "Blue-gray = drug (amiodarone, minocycline) หรือ argyria", "Bronze ร่วมกับ diabetes: สงสัย hemochromatosis ตรวจ TSAT และ ferritin"],
    ix: ["Cortisol, ACTH, electrolytes", "TSAT, ferritin", "Plasma porphyrins", "Skin biopsy"],
    std: "Etiologic classification of hypermelanosis: endocrine, metabolic, drug, nutritional, inflammatory"
  }, [
    N("Endocrine", "step", {
      s: "ACTH และ MSH excess",
      keys: ["Mucosa", "Palmar crease", "Scar"]
    }, [
      N("Primary adrenal insufficiency (Addison)", "nephro", {
        s: "Autoimmune, TB, adrenal hemorrhage, metastasis, HIV",
        keys: ["Buccal mucosa, gum, palmar crease, knuckle, scar ใหม่ pigment", "Hyponatremia, hyperkalemia, NAGMA, hypoglycemia", "Salt craving, postural hypotension", "TB adrenal: calcified adrenal บน CT", "ACTH สูง, renin สูง"],
        ix: ["Cortisol 8 am, ACTH, renin, aldosterone, cosyntropin test"],
        std: "Endocrine Society 2016 primary adrenal insufficiency guideline",
        link: "hyperk"
      }),
      N("Ectopic ACTH and Nelson syndrome", "nephro", {
        s: "Small cell lung cancer, carcinoid, post-adrenalectomy",
        keys: ["Severe hypokalemic metabolic alkalosis", "Hypertension, edema, proximal weakness อย่างรวดเร็ว", "Pigmentation จาก ACTH สูงมาก", "Nelson: หลัง bilateral adrenalectomy"],
        ix: ["ACTH, cortisol, CT chest"],
        link: "hypok"
      })
    ]),
    N("Metabolic and kidney-related", "step", {
      s: "Iron, porphyrin, uremic pigment",
      keys: ["Dialysis", "Liver", "Iron"]
    }, [
      N("Uremic hyperpigmentation", "nephro", {
        s: "Retained urochromes, carotenoids และ β-MSH",
        keys: ["Sallow yellow-brown บน sun-exposed skin", "Dialysis vintage ยาวและ adequacy ต่ำ", "Uremic frost ใน BUN สูงมากที่ไม่ได้ฟอก", "Pruritus และ xerosis ร่วม"],
        ix: ["BUN, Kt/V"],
        link: "pruritus"
      }),
      N("Porphyria cutanea tarda and pseudoporphyria", "nephro", {
        s: "Blistering photosensitivity บนหลังมือ",
        why: "Conventional HD กำจัด uroporphyrin ได้น้อย (high-flux ดีกว่า) และ ESKD เป็น risk factor, pseudoporphyria จาก furosemide หรือ naproxen มี porphyrin ปกติ",
        keys: ["Bullae, erosion, milia, scarring บนหลังมือ", "Hypertrichosis โหนกแก้ม", "PCT: plasma porphyrin สูงมาก, HCV, iron overload, alcohol", "Pseudoporphyria: furosemide dose สูง, NSAID, porphyrin ปกติ", "รักษา PCT ใน dialysis ด้วย ESA ร่วมกับ small-volume phlebotomy และ high-flux HD, รักษา HCV ถ้ามี, หยุด IV iron และ alcohol"],
        ix: ["Plasma porphyrin fluorescence scan, HCV, ferritin"],
        link: "hirsutism"
      }),
      N("Hemochromatosis and transfusional iron overload", "nephro", {
        s: "HFE C282Y, thalassemia",
        keys: ["Bronze skin, diabetes, cardiomyopathy, arthropathy (MCP 2-3)", "TSAT > 45% ร่วมกับ ferritin สูง (ferritin > 1000 ng/mL เสี่ยง cirrhosis)", "IV iron ใน dialysis ทำ ferritin สูงแต่ไม่ใช่ hemochromatosis", "Hypogonadism"],
        ix: ["TSAT, ferritin, HFE, MRI T2*"],
        link: "hsm"
      })
    ]),
    N("Drug-induced", "step", {
      s: "Pigment deposition",
      keys: ["Blue-gray", "Sun-exposed", "Nail"]
    }, [
      N("Drug-induced pigmentation", "nephro", {
        s: "Minocycline, amiodarone, hydroxychloroquine, busulfan, cyclophosphamide, zidovudine, bleomycin",
        keys: ["Amiodarone: blue-gray sun-exposed face", "Minocycline: blue-black ในแผลเป็นและ shin", "HCQ: blue-gray shin และ hard palate", "Cyclophosphamide และ zidovudine: nail pigmentation", "Bleomycin: flagellate pigmentation"],
        ix: ["Drug review"]
      })
    ]),
    N("Nutritional and systemic", "step", {
      s: "Vitamin deficiency และ systemic disease",
      keys: ["Malnutrition", "Diarrhea"]
    }, [
      N("B12 deficiency and pellagra", "nephro", {
        s: "Nutritional hypermelanosis",
        keys: ["B12: knuckle pigmentation, macrocytosis, neuropathy", "Pellagra (niacin): photosensitive dermatitis, Casal necklace, diarrhea, dementia", "Isoniazid และ carcinoid ทำ pellagra", "Dialysis ทำเสีย water-soluble vitamin"],
        ix: ["B12, niacin metabolites"],
        link: "diarrhea"
      }),
      N("POEMS syndrome", "nephro", {
        s: "Polyneuropathy, organomegaly, endocrinopathy, M-protein, skin change",
        keys: ["Hyperpigmentation, hemangioma, hypertrichosis, white nail", "Polyneuropathy demyelinating", "Lambda monoclonal, VEGF สูงมาก", "Sclerotic bone lesion, papilledema", "Kidney: MPGN-like, endotheliosis"],
        ix: ["VEGF, SPEP/IFE, skeletal survey"],
        std: "Dispenzieri 2023 POEMS criteria",
        link: "mspike"
      }),
      N("Systemic sclerosis and PBC", "nephro", {
        s: "Salt-and-pepper และ cholestatic pigment",
        keys: ["SSc: salt-and-pepper dyspigmentation, sclerodactyly, SRC risk", "PBC: pruritus, AMA, ALP สูง, dRTA ร่วม"],
        ix: ["ANA panel, AMA"],
        link: "skinthick"
      })
    ]),
    N("Localized", "step", {
      s: "Patch หรือ plaque เฉพาะที่",
      keys: ["Café-au-lait", "Velvety flexural"]
    }, [
      N("Acanthosis nigricans", "nephro", {
        s: "Insulin resistance, malignancy",
        keys: ["Velvety plaque ที่คอ รักแร้", "Obesity, T2DM, PCOS", "Malignant AN: เร็ว, กว้าง, tripe palms, gastric adenocarcinoma", "HAIR-AN syndrome"],
        ix: ["HbA1c, insulin, endoscopy ถ้า malignant pattern"],
        link: "obesity"
      }),
      N("Café-au-lait and genetic pigment syndromes", "nephro", {
        s: "NF1, tuberous sclerosis (hypomelanotic), Peutz-Jeghers",
        keys: ["NF1: ≥ 6 café-au-lait (> 5 mm ก่อน puberty, > 15 mm หลัง puberty), axillary freckling, neurofibroma, renal artery stenosis, pheochromocytoma", "TSC: ash-leaf macule, angiofibroma, AML, kidney cyst", "Peutz-Jeghers: lip pigment, hamartomatous polyp"],
        ix: ["Renal artery imaging ใน NF1 HT, kidney MRI ใน TSC"],
        std: "NF1 revised diagnostic criteria 2021, TSC 2021 consensus",
        link: "htn-young"
      }),
      N("Melasma and post-inflammatory hyperpigmentation", "adj", {
        s: "Common benign causes",
        keys: ["Melasma: symmetric face, pregnancy, OCP", "PIH หลัง inflammation หรือ excoriation จาก pruritus"],
        ix: ["Clinical diagnosis"]
      })
    ])
  ])
};

/* ===================== ALOPECIA ===================== */
TREES.alopecia = {
  must: [
    "Diffuse หรือ patchy, scarring หรือ non-scarring",
    "Shedding (ผมร่วงจากราก) หรือ breakage (หักกลางเส้น)",
    "Trigger 2-4 เดือนก่อน: ไข้สูง, ผ่าตัด, KT, คลอด, น้ำหนักลดเร็ว",
    "ยา: tacrolimus, cyclophosphamide, MMF, heparin, warfarin, beta-blocker, retinoid, lithium, valproate",
    "Rash บนหน้า, photosensitivity, oral ulcer, arthritis",
    "Thyroid symptoms, iron deficiency, PEW",
    "Sexual exposure (syphilis)"
  ],
  tree: N("Alopecia", "root", {
    s: "แยก scarring จาก non-scarring ก่อน แล้ว non-scarring แบ่ง diffuse (telogen effluvium, drug, systemic) กับ patchy (areata, tinea, syphilis, trichotillomania)",
    why: "Tacrolimus alopecia, cyclophosphamide anagen effluvium, telogen effluvium หลัง KT, lupus alopecia และ zinc deficiency ใน dialysis เป็นสาเหตุที่ nephrologist ต้องแยก",
    keys: ["Follicular ostia หายไป = scarring", "Positive pull test > 10% = active shedding", "Exclamation mark hair ชี้ไปทาง alopecia areata", "Lupus hair: frontal short broken hair"],
    ix: ["TSH, ferritin, zinc, CBC", "ANA, VDRL", "Trichoscopy, scalp biopsy"],
    std: "Clinical classification: scarring vs non-scarring alopecia"
  }, [
    N("Diffuse non-scarring", "step", {
      s: "ผมบางทั่วศีรษะ",
      keys: ["Trigger 2-4 เดือนก่อน", "Drug", "Labs"]
    }, [
      N("Telogen effluvium", "nephro", {
        s: "หลัง major illness, KT surgery, คลอด, น้ำหนักลด, iron deficiency",
        keys: ["เริ่ม 2-4 เดือนหลัง trigger", "Club-shaped telogen hair ร่วงมาก", "ส่วนใหญ่หายเองใน 6-12 เดือนเมื่อ trigger หมดไป", "Chronic TE: iron deficiency, thyroid, PEW"],
        ix: ["Ferritin, TSH, albumin"]
      }),
      N("Calcineurin inhibitor and immunosuppressant alopecia", "nephro", {
        s: "Tacrolimus, MMF, azathioprine",
        why: "Tacrolimus alopecia พบในผู้หญิง KT ได้บ่อยและสวนทางกับ cyclosporine ที่ทำ hypertrichosis",
        keys: ["Tacrolimus: diffuse alopecia ในผู้หญิงหลัง KT หลายเดือน", "อาจดีขึ้นเมื่อลด trough หรือเปลี่ยนเป็น cyclosporine", "Azathioprine ใน TPMT/NUDT15 deficiency ทำ alopecia กับ cytopenia", "ต้อง rule out thyroid disease, iron deficiency และ telogen effluvium หลังผ่าตัดก่อนสรุปว่าเป็นจากยา"],
        ix: ["Tacrolimus trough, ferritin, TSH, TPMT/NUDT15"],
        link: "kt-late"
      }),
      N("Anagen effluvium from chemotherapy", "nephro", {
        s: "Cyclophosphamide, doxorubicin, taxane",
        keys: ["ร่วงภายใน 1-3 สัปดาห์หลังให้ยา", "Dystrophic tapered hair", "Cyclophosphamide IV ใน LN และ AAV"],
        ix: ["Drug review"],
        link: "rpgn"
      }),
      N("Systemic and nutritional alopecia", "nephro", {
        s: "Hypothyroid, iron, zinc, protein deficiency, SLE, secondary syphilis",
        keys: ["Zinc deficiency ใน dialysis และ nephrotic: alopecia กับ periorificial dermatitis", "Heparin และ warfarin ทำ diffuse alopecia", "Hypothyroid: lateral eyebrow loss", "Secondary syphilis: moth-eaten alopecia, palmar rash, MN ได้", "สาเหตุพบน้อย: biotin deficiency และ hereditary vitamin D-resistant rickets (VDR mutation)"],
        ix: ["Zinc, ferritin, TSH, VDRL, ANA"],
        link: "smelltaste"
      })
    ]),
    N("Patchy non-scarring", "step", {
      s: "เป็นหย่อม",
      keys: ["Exclamation mark hair", "Scaling", "Broken hair"]
    }, [
      N("Alopecia areata", "adj", {
        s: "Autoimmune T cell",
        keys: ["Round smooth patch, exclamation mark hair", "Nail pitting", "Thyroid autoimmunity, vitiligo ร่วม", "Severe alopecia areata: JAK inhibitor (baricitinib, ritlecitinib)"],
        ix: ["Trichoscopy, TSH"]
      }),
      N("Tinea capitis and secondary syphilis", "nephro", {
        s: "Infectious patchy alopecia",
        keys: ["Tinea: scaling, broken hair, lymphadenopathy, immunosuppressed", "Syphilis: moth-eaten patches, condyloma lata", "Syphilis เป็นสาเหตุ MN และ nephrotic"],
        ix: ["KOH, culture, VDRL, TPHA"],
        link: "viral"
      }),
      N("Trichotillomania and traction", "adj", {
        s: "Mechanical",
        keys: ["Broken hair ยาวต่างกัน รูปไม่สม่ำเสมอ", "Psychiatric comorbidity", "Traction: ผมดึงตึง ตามขอบไรผม"],
        ix: ["Clinical, trichoscopy"]
      })
    ]),
    N("Scarring alopecia", "step", {
      s: "Follicle ถูกทำลายถาวร",
      keys: ["Follicular ostia หาย", "Atrophy", "Biopsy required"]
    }, [
      N("Discoid lupus and SLE", "nephro", {
        s: "Chronic cutaneous lupus",
        keys: ["Discoid plaque, follicular plugging, central atrophy, dyspigmentation", "DLE ที่ศีรษะ เกิด scarring ถาวร", "SLE: non-scarring lupus alopecia ก็พบ", "DLE ราว 5-10% progress เป็น SLE"],
        ix: ["Scalp biopsy with DIF, ANA, dsDNA, C3, C4, UA"],
        std: "EULAR/ACR 2019 SLE classification",
        link: "rash"
      }),
      N("Lichen planopilaris, sarcoid and morphea", "nephro", {
        s: "Other scarring causes",
        keys: ["Lichen planopilaris: perifollicular erythema กับ scale, HCV", "Sarcoid: granulomatous scalp lesion, hypercalcemia, TIN", "Morphea en coup de sabre", "Frontal fibrosing alopecia ในหญิงวัยหมดประจำเดือน"],
        ix: ["Scalp biopsy, ACE, Ca, HCV"],
        link: "hyperca"
      })
    ])
  ])
};

/* ===================== NAIL CHANGES ===================== */
TREES.nails = {
  must: [
    "เล็บมือหรือเล็บเท้า, กี่เล็บ, เคลื่อนตามการงอกของเล็บหรือไม่",
    "สีและตำแหน่ง: proximal, distal, transverse band, longitudinal",
    "Clubbing, splinter hemorrhage",
    "Albumin, Cr, liver disease, iron",
    "Chemotherapy, arsenic, heavy metal, ยาใหม่",
    "Skin psoriasis, joint pain",
    "ลูกสะบ้าเล็กหรือไม่มี, ข้อศอกเหยียดไม่สุด (nail-patella)"
  ],
  tree: N("Nail changes", "root", {
    s: "ดูว่า lesion อยู่ที่ nail plate (เคลื่อนตามการงอก) หรือ nail bed vascular (ไม่เคลื่อน, กดแล้วจาง) แล้วอ่าน pattern ที่ชี้ systemic disease",
    why: "เล็บเป็น clue ข้างเตียงที่ examiner ชอบ: Lindsay nails ใน CKD, Muehrcke lines ใน nephrotic, splinter ใน IE, nailfold capillaries ใน SSc และ nail-patella syndrome ที่เป็น genetic kidney disease",
    keys: ["Apparent leukonychia (nail bed): จางเมื่อกด, ไม่เคลื่อน = Muehrcke, Terry, Lindsay", "True leukonychia (nail plate): เคลื่อนตามการงอก = Mees", "Beau line: ระยะจาก proximal nail fold บอก timing ของ illness (เล็บมือโต ~3 mm ต่อเดือน) ส่วนความลึกบอก severity", "Nailfold capillaroscopy"],
    ix: ["Albumin, Cr, LFT, ferritin", "Echo และ blood culture ถ้ามี splinter กับไข้", "Nailfold capillaroscopy"],
    std: "Clinical nail signs of systemic disease"
  }, [
    N("Apparent leukonychia (nail bed)", "step", {
      s: "สีขาวจาก nail bed edema หรือ vascular",
      keys: ["ไม่เคลื่อนตามการงอก", "จางเมื่อกด"]
    }, [
      N("Lindsay (half-and-half) nails", "nephro", {
        s: "CKD และ dialysis",
        keys: ["Proximal ขาว, distal 20-60% แดงน้ำตาล มีเส้นแบ่งชัด", "พบในผู้ป่วย CKD ราวหนึ่งในห้าถึงครึ่ง", "ไม่สัมพันธ์กับ severity ของ CKD", "อาจหายหลัง KT"],
        ix: ["Cr, eGFR"],
        link: "risingcr"
      }),
      N("Muehrcke lines", "nephro", {
        s: "Hypoalbuminemia (nephrotic, liver, malnutrition), chemotherapy",
        keys: ["Paired white transverse bands ขนานกับ lunula", "ไม่เคลื่อนตามการงอก, จางเมื่อกด", "Albumin < 2.2 g/dL", "หายเมื่อ albumin กลับปกติ (remission ของ nephrotic)"],
        ix: ["Albumin, UPCR"],
        link: "nephrotic"
      }),
      N("Terry nails", "adj", {
        s: "Cirrhosis, CHF, DM, aging",
        keys: ["เกือบทั้งเล็บขาวขุ่น เหลือ distal แดงแคบ 1-2 mm", "Lunula หาย", "Cirrhosis และ hypoalbuminemia"],
        ix: ["LFT, albumin"],
        link: "jaundice"
      })
    ]),
    N("Nail plate changes", "step", {
      s: "Lesion เคลื่อนตามการงอกของเล็บ",
      keys: ["Transverse line", "Timing", "Toxin"]
    }, [
      N("Mees lines and true leukonychia", "nephro", {
        s: "Arsenic, thallium, chemotherapy, severe illness",
        keys: ["White transverse band เคลื่อนตามการงอก ไม่จางเมื่อกด", "Arsenic: hyperkeratosis palm, neuropathy, AKI", "Thallium: alopecia, painful neuropathy", "Chemotherapy cycle-related"],
        ix: ["Urine arsenic, thallium"]
      }),
      N("Beau lines and onychomadesis", "nephro", {
        s: "Severe systemic illness, chemotherapy, high fever",
        keys: ["Transverse groove หลายเล็บหรือทุกเล็บพร้อมกัน (เล็บเดียวมักเป็น local trauma)", "ระยะจาก cuticle บอกเวลาที่ป่วย (ราว 3 mm ต่อเดือนในเล็บมือ)", "Sepsis, AKI, KT perioperative", "Onychomadesis: เล็บหลุดจาก proximal เช่นหลัง hand-foot-mouth disease"],
        ix: ["Clinical"]
      }),
      N("Koilonychia", "nephro", {
        s: "Iron deficiency, hemochromatosis",
        keys: ["Spoon-shaped nail", "Iron deficiency จาก blood loss ใน HD, GI bleed, menorrhagia", "Plummer-Vinson: dysphagia กับ esophageal web"],
        ix: ["Ferritin, TSAT"],
        link: "cytopenia"
      }),
      N("Nail pigmentation", "nephro", {
        s: "Drug, Addison, melanoma",
        keys: ["Longitudinal melanonychia หลายเล็บ: zidovudine, hydroxyurea, cyclophosphamide, Addison", "Single band ที่กว้าง เข้มไม่สม่ำเสมอ หรือมี Hutchinson sign: ต้อง biopsy exclude subungual melanoma", "Blue lunula: Wilson, argyria", "Azure lunula ใน hemochromatosis"],
        ix: ["Drug review, biopsy ถ้า single band"],
        link: "hyperpig"
      })
    ]),
    N("Vascular and nailfold", "step", {
      s: "Vasculitis และ connective tissue disease",
      keys: ["Splinter", "Periungual erythema", "Capillary dropout"]
    }, [
      N("Splinter hemorrhage and nailfold infarct", "nephro", {
        s: "Infective endocarditis, vasculitis, APS, trauma",
        keys: ["Proximal splinter หลายเล็บ ชี้ systemic (distal มักเป็น trauma)", "IE กับ murmur, fever, low C3", "Nailfold infarct ใน ANCA vasculitis, RA vasculitis, cryo", "APS: splinter กับ livedo"],
        ix: ["Blood culture, echo, ANCA, aPL, cryo"],
        link: "murmur"
      }),
      N("Nailfold capillary changes", "nephro", {
        s: "Systemic sclerosis, dermatomyositis, SLE",
        keys: ["SSc: giant capillaries, hemorrhage, dropout (scleroderma pattern)", "Dermatomyositis: periungual erythema, ragged cuticle", "SLE: tortuous capillary, periungual erythema", "Capillaroscopy แยก primary จาก secondary Raynaud"],
        ix: ["Nailfold capillaroscopy, ANA panel"],
        std: "ACR/EULAR 2013 SSc classification",
        link: "raynaud"
      })
    ]),
    N("Structural and genetic", "step", {
      s: "Dystrophy และ congenital",
      keys: ["Absent nail", "Pitting", "Lymphedema"]
    }, [
      N("Nail-patella syndrome", "nephro", {
        s: "LMX1B, autosomal dominant",
        why: "Kidney involvement ราวครึ่งหนึ่ง: proteinuria, hematuria, FSGS-like, EM เห็น collagen fibril ใน GBM",
        keys: ["Triangular lunula, absent หรือ hypoplastic nail ที่นิ้วโป้งเด่น", "Absent หรือ hypoplastic patella, iliac horns (pathognomonic)", "Elbow dysplasia, extension จำกัด", "Glaucoma", "Proteinuria ใน family"],
        ix: ["Pelvis X-ray (iliac horn), knee X-ray, UPCR, LMX1B testing"],
        link: "proteinuria"
      }),
      N("Psoriatic nail and onycholysis", "nephro", {
        s: "Psoriasis, thyroid, photo-onycholysis",
        keys: ["Pitting, oil drop, onycholysis, subungual hyperkeratosis", "Psoriatic arthritis ร่วม, IgAN มีรายงานร่วม psoriasis", "Methotrexate: ลด dose เมื่อ eGFR 30-59 และหลีกเลี่ยงเมื่อ eGFR < 30 หรือ dialysis", "Photo-onycholysis จาก doxycycline"],
        ix: ["Clinical, TSH"],
        link: "arthralgia"
      }),
      N("Yellow nail syndrome and onychomycosis", "nephro", {
        s: "Lymphatic disorder และ fungal infection",
        keys: ["Yellow nail syndrome: yellow slow-growing nail, lymphedema, pleural effusion", "Onychomycosis พบบ่อยใน DM และ KT", "Terbinafine ลด dose หรือหลีกเลี่ยงเมื่อ CrCl < 50 mL/min, itraconazole เพิ่มระดับ tacrolimus และ cyclosporine (CYP3A4 inhibition)"],
        ix: ["KOH, fungal culture, chest imaging"],
        link: "edema"
      })
    ])
  ])
};

/* ===================== URTICARIA AND ANGIOEDEMA ===================== */
TREES.urticaria = {
  must: [
    "Wheal อย่างเดียว, angioedema อย่างเดียว หรือทั้งสอง",
    "แต่ละผื่นอยู่นานกี่ชั่วโมง, หายแล้วทิ้งรอยช้ำหรือไม่ (> 24 ชั่วโมง ให้สงสัย urticarial vasculitis)",
    "ACEi, ARNI (sacubitril), DPP4i, mTOR inhibitor, NSAID",
    "Family history angioedema, ปวดท้องซ้ำ ๆ",
    "ไข้, ปวดข้อ, ผื่นหลังได้ ATG, rituximab, antibiotic 1-2 สัปดาห์",
    "Hematuria, proteinuria, low complement",
    "ระหว่าง HD: dialyzer, heparin, iron IV",
    "Hoarseness, stridor"
  ],
  tree: N("Urticaria and angioedema", "root", {
    s: "แยก angioedema ที่ไม่มี urticaria (bradykinin: ACEi, HAE, AAE) จาก mast cell-mediated, และ urticaria ที่อยู่นาน > 24 ชั่วโมงทิ้งรอยให้คิด urticarial vasculitis",
    why: "ACEi เป็นยาที่ nephrologist สั่งบ่อย จึงต้องรู้จัก ACEi angioedema, mTOR inhibitor ร่วม ACEi เพิ่ม risk, HUVS และ serum sickness หลัง ATG ทำ GN และ low complement",
    keys: ["Angioedema ที่ไม่มี urticaria และไม่ตอบสนอง antihistamine ชี้ไปทาง bradykinin-mediated", "Lesion > 24 ชั่วโมง, burning, residual purpura: สงสัย urticarial vasculitis ต้อง skin biopsy", "Acute < 6 สัปดาห์ vs chronic ≥ 6 สัปดาห์", "Angioedema ที่ C4 ต่ำ: คิดถึง HAE type I-II หรือ AAE, ถ้า C1q ต่ำร่วมด้วยชี้ไปทาง AAE (HUVS ก็ C1q ต่ำแต่มี urticarial lesion), C4 ต่ำยังพบใน SLE และ cryoglobulinemia"],
    ix: ["C4, C1-INH level และ function, C1q", "C3, CH50, anti-C1q", "Skin biopsy ใน lesion > 24 ชั่วโมง", "Tryptase ใน anaphylaxis"],
    std: "EAACI/GA2LEN/EuroGuiDerm/APAAACI 2022 urticaria guideline, WAO/EAACI 2021 HAE guideline"
  }, [
    N("Angioedema without urticaria", "step", {
      s: "Bradykinin-mediated",
      keys: ["ไม่คัน", "นาน 2-5 วัน", "ไม่ตอบสนอง antihistamine หรือ steroid"]
    }, [
      N("ACE inhibitor and related drug angioedema", "nephro", {
        s: "ACEi, sacubitril-valsartan, DPP4i, mTOR inhibitor, tPA",
        why: "ACEi ยับยั้งการสลาย bradykinin, DPP4i ลดการสลาย bradykinin และ substance P อีกทางหนึ่ง ส่วน mTOR inhibitor เพิ่ม risk เมื่อใช้ร่วมกับ ACEi (กลไกยังไม่ชัด) จึงต้องระวังในผู้ป่วย KT ที่ได้ ACEi ร่วมกับ mTOR inhibitor",
        keys: ["Lip, tongue, face, upper airway, intestinal angioedema", "เกิดบ่อยสุดในเดือนแรก แต่เกิดได้ทุกเวลาแม้ใช้มาหลายปี", "Risk สูงใน African ancestry, smoker, ผู้หญิง, อายุ > 65", "ARB ส่วนน้อยมี cross-reaction", "C4 และ C1-INH ปกติ"],
        ix: ["Drug review, C4 ปกติ"],
        std: "WAO/EAACI 2021 HAE and bradykinin angioedema",
        link: "htn-young"
      }),
      N("Hereditary angioedema", "adj", {
        s: "SERPING1 (type I-II), normal C1-INH (FXII, PLG)",
        keys: ["Onset วัยเด็กหรือวัยรุ่น, family history", "Recurrent abdominal pain จาก bowel wall edema", "Trigger: trauma, dental procedure, estrogen, ACEi", "Type I: C1-INH level ต่ำ, type II: function ต่ำ, C4 ต่ำทั้งสอง", "HAE-nC1-INH: C4 ปกติ, estrogen-dependent"],
        ix: ["C4, C1-INH level และ function, genetic testing"],
        std: "WAO/EAACI 2021 HAE guideline"
      }),
      N("Acquired C1-inhibitor deficiency", "nephro", {
        s: "Lymphoproliferative disease, MGUS, SLE",
        keys: ["Onset อายุ > 40 ไม่มี family history", "C1q ต่ำ (แยกจาก HAE)", "Anti-C1-INH antibody", "B-cell lymphoma, MGUS ต้องหา"],
        ix: ["C4, C1q, C1-INH, SPEP/IFE, CT"],
        link: "mspike"
      })
    ]),
    N("Acute urticaria", "step", {
      s: "< 6 สัปดาห์, ผื่นแต่ละจุดหายภายใน 24 ชั่วโมง",
      keys: ["Trigger ชัด", "Anaphylaxis signs"]
    }, [
      N("Drug, contrast and dialysis-related allergy", "nephro", {
        s: "Antibiotic, NSAID, contrast, iron IV, heparin, dialyzer",
        keys: ["Onset นาทีถึงชั่วโมงหลัง exposure", "Iron dextran risk สูงกว่า iron sucrose หรือ ferric carboxymaltose", "Ethylene oxide sterilized dialyzer type A reaction", "NSAID: pseudoallergy ไม่ผ่าน IgE", "Anaphylaxis: hypotension, wheeze, GI symptoms"],
        ix: ["Tryptase, drug review"],
        std: "WAO anaphylaxis guidance 2020",
        link: "shock"
      }),
      N("Infection-associated urticaria", "adj", {
        s: "Viral URI, hepatitis B prodrome, parasite",
        keys: ["เด็กและผู้ใหญ่หลัง viral infection", "HBV prodrome: urticaria, arthralgia ก่อน jaundice", "Strongyloides และ helminth กับ eosinophilia"],
        ix: ["HBsAg, eosinophil count, stool"],
        link: "eosinophilia"
      })
    ]),
    N("Chronic urticaria", "step", {
      s: "≥ 6 สัปดาห์",
      keys: ["Spontaneous vs inducible", "Autoimmune"]
    }, [
      N("Chronic spontaneous urticaria", "adj", {
        s: "Autoimmune (anti-FcεRI, anti-IgE), idiopathic",
        keys: ["Daily wheal > 6 สัปดาห์ โดยไม่มี trigger", "Thyroid autoimmunity ร่วม (anti-TPO)", "Angioedema ร่วมราวครึ่ง", "ตอบสนอง antihistamine dose สูง และ omalizumab"],
        ix: ["CBC, CRP, total IgE, anti-TPO"],
        std: "EAACI 2022 urticaria guideline",
        link: "goiter"
      }),
      N("Chronic inducible urticaria", "adj", {
        s: "Dermographism, cold, cholinergic, pressure",
        keys: ["Trigger ชัดเจนและ reproducible", "Cold urticaria: cryoglobulin, cold agglutinin", "Cholinergic: เหงื่อออก ออกกำลัง"],
        ix: ["Provocation test, cryoglobulin"]
      })
    ]),
    N("Urticarial lesions with systemic disease", "step", {
      s: "Fever, arthralgia, low complement, kidney involvement",
      keys: ["Lesion > 24 ชั่วโมง", "Systemic symptoms", "Low complement"]
    }, [
      N("Hypocomplementemic urticarial vasculitis", "nephro", {
        s: "Anti-C1q vasculitis (McDuffie)",
        why: "HUVS ทำ GN (MPGN, mesangial หรือ crescentic) ราวครึ่ง และ overlap กับ SLE",
        keys: ["Urticaria > 24 ชั่วโมง, burning มากกว่าคัน, residual purpura", "Low C1q, C3, C4 และ anti-C1q antibody", "Angioedema, arthritis, uveitis, COPD ในคนสูบบุหรี่", "Hematuria, proteinuria, LN-like biopsy"],
        ix: ["C1q, anti-C1q, C3, C4, skin biopsy (LCV), UA, kidney biopsy"],
        std: "Schwartz 1982 HUVS criteria, Chapel Hill 2012 (anti-C1q vasculitis)",
        link: "hypocomp"
      }),
      N("Serum sickness and serum sickness-like reaction", "nephro", {
        s: "ATG, rituximab, antivenom, antibiotic (cefaclor, amoxicillin)",
        keys: ["7-14 วันหลังได้ ATG หรือ rituximab", "Fever, urticaria หรือ serpiginous rash ที่ขอบฝ่ามือฝ่าเท้า, arthralgia", "Low C3 และ C4, proteinuria และ hematuria ชั่วคราว", "Serum sickness-like (antibiotic) ไม่มี immune complex และ complement ปกติ"],
        ix: ["C3, C4, CH50, UA"],
        link: "kt-early"
      }),
      N("Autoinflammatory and Schnitzler syndrome", "nephro", {
        s: "CAPS (NLRP3), Schnitzler (IgM monoclonal)",
        why: "CAPS ที่ไม่ได้รักษาทำ AA amyloidosis และ nephrotic syndrome",
        keys: ["CAPS: urticaria-like rash ตั้งแต่เด็ก, cold trigger, sensorineural hearing loss, conjunctivitis", "Schnitzler: chronic urticaria, IgM kappa, fever, bone pain, อายุ > 50", "ไม่ตอบสนอง antihistamine, ตอบสนอง IL-1 blockade", "CRP และ SAA สูงตลอด"],
        ix: ["CRP, SAA, SPEP/IFE, NLRP3 genetic testing, UPCR"],
        std: "Strasbourg criteria (Schnitzler) 2013",
        link: "nephrotic"
      }),
      N("SLE and adult-onset Still disease", "nephro", {
        s: "Urticarial rash ใน systemic autoimmune",
        keys: ["SLE: urticarial vasculitis, low complement, nephritis", "Still: evanescent salmon rash กับ fever spike, ferritin สูงมาก", "ต้องแยก mastocytosis ด้วย: urticaria pigmentosa, Darier sign, baseline tryptase > 20 ng/mL"],
        ix: ["ANA, dsDNA, C3, C4, ferritin, tryptase"],
        link: "rash"
      })
    ])
  ])
};

/* ===================== ERYTHROCYTOSIS ===================== */
TREES.erythrocytosis = {
  must: [
    "Hb หรือ Hct สูงซ้ำ ≥ 2 ครั้ง, volume status (diuretic, dehydration)",
    "Smoking, OSA, COPD, high altitude, cyanotic heart disease",
    "ยา: testosterone, ESA, HIF-PHI, SGLT2 inhibitor",
    "KT เมื่อไร, native kidney cyst, graft artery stenosis",
    "Aquagenic pruritus, erythromelalgia, thrombosis, splenomegaly",
    "Hematuria, flank mass, kidney cyst, family history VHL",
    "Headache, plethora, hyperviscosity"
  ],
  tree: N("Erythrocytosis", "root", {
    s: "ยืนยัน absolute erythrocytosis (ไม่ใช่ hemoconcentration) แล้วใช้ EPO และ JAK2 แยก primary (EPO ต่ำ) จาก secondary (EPO ปกติหรือสูง), secondary แบ่ง hypoxic กับ EPO-secreting lesion",
    why: "ไตเป็นแหล่ง EPO หลัก จึงมี nephro causes เฉพาะ: post-transplant erythrocytosis, ADPKD, RCC, hydronephrosis, renal artery stenosis และยา SGLT2i, HIF-PHI, ESA เกินขนาด",
    keys: ["Hb > 16.5 g/dL ชาย หรือ > 16.0 ผู้หญิง, Hct > 49% หรือ > 48%", "EPO ต่ำ + JAK2 positive = polycythemia vera", "EPO สูงโดย SpO2 กลางวันปกติ: หา EPO-secreting lesion หรือ drug หลัง exclude OSA, COHb และ high-affinity Hb", "EPO ปกติไม่ตัดทั้ง PV และ secondary cause", "Splenomegaly, leukocytosis, thrombocytosis ชี้ไปทาง MPN"],
    ix: ["Repeat CBC, serum EPO, JAK2 V617F และ exon 12", "SpO2, ABG, sleep study, COHb", "Kidney US หรือ CT, liver imaging"],
    std: "WHO 2022 classification (PV criteria), BSH 2019 erythrocytosis guideline"
  }, [
    N("Relative and drug-related", "step", {
      s: "Plasma volume ลด หรือ exogenous stimulation",
      keys: ["Diuretic", "Drug history"]
    }, [
      N("Relative erythrocytosis", "nephro", {
        s: "Dehydration, diuretic, Gaisböck (stress)",
        keys: ["Hct กลับปกติเมื่อแก้ volume", "Diuretic และ SGLT2i ร่วม", "Red cell mass ปกติ", "Obese hypertensive smoker ชาย (Gaisböck)"],
        ix: ["Repeat CBC หลังแก้ volume"]
      }),
      N("Drug-induced erythrocytosis", "nephro", {
        s: "Testosterone, ESA, HIF-PHI, SGLT2 inhibitor",
        keys: ["Testosterone replacement: Hct > 54% ต้องหยุดหรือลด dose", "SGLT2i: Hct เพิ่มราว 2-4 percentage point จาก EPO ที่เพิ่มขึ้นและ hemoconcentration, สัมพันธ์กับ cardiorenal benefit ใน mediation analysis จึงไม่ต้องหยุดยา (ถ้า Hct สูงมากให้หาสาเหตุอื่นร่วม)", "ESA หรือ HIF-PHI: ไม่ควรรักษาให้ Hb เกิน 11.5 g/dL, การตั้งเป้า Hb ราว 13 g/dL เพิ่ม stroke และ thrombosis (CHOIR, TREAT)", "Anabolic steroid ใน athlete"],
        ix: ["Drug review, EPO"],
        std: "KDIGO 2026 Anemia in CKD, Endocrine Society 2018 testosterone",
        link: "cytopenia"
      })
    ]),
    N("Primary (EPO low)", "step", {
      s: "Clonal หรือ EPO receptor",
      keys: ["EPO ต่ำ", "JAK2"]
    }, [
      N("Polycythemia vera", "nephro", {
        s: "JAK2 V617F หรือ exon 12",
        keys: ["Aquagenic pruritus, erythromelalgia, splenomegaly", "Leukocytosis และ thrombocytosis ร่วม", "Arterial และ venous thrombosis รวม Budd-Chiari", "Hyperuricemia และ gout", "MPN-related glomerulopathy: proteinuria, mesangial sclerosis"],
        ix: ["JAK2, EPO, bone marrow"],
        std: "WHO 2022 PV criteria, ELN 2018 PV management",
        link: "pruritus"
      }),
      N("Primary familial congenital polycythemia", "adj", {
        s: "EPOR mutation",
        keys: ["Family history, onset ตั้งแต่เด็ก", "EPO ต่ำ, JAK2 negative", "ไม่มี splenomegaly"],
        ix: ["EPOR gene testing"]
      })
    ]),
    N("Secondary hypoxic (EPO high, SpO2 low)", "step", {
      s: "Appropriate EPO response",
      keys: ["SpO2 ต่ำหรือ nocturnal desaturation", "Smoking"]
    }, [
      N("Chronic lung disease and sleep apnea", "adj", {
        s: "COPD, OSA, obesity hypoventilation",
        keys: ["Nocturnal hypoxemia แม้ SpO2 กลางวันปกติ", "Cor pulmonale", "Resistant hypertension ใน OSA"],
        ix: ["SpO2, ABG, polysomnography"],
        link: "cyanosis"
      }),
      N("Cyanotic heart disease and high altitude", "nephro", {
        s: "Right-to-left shunt",
        keys: ["Hct > 65% ทำ hyperviscosity: headache, visual disturbance", "Cyanotic nephropathy: proteinuria, FSGS", "Gout และ hyperuricemia"],
        ix: ["Echo, UPCR, uric acid"],
        link: "clubbing"
      }),
      N("Smoking and carbon monoxide", "adj", {
        s: "Smoker's erythrocytosis",
        keys: ["COHb 5-15% ใน heavy smoker", "Pulse oximetry อ่าน SpO2 ปกติปลอม ต้องวัด COHb ด้วย co-oximetry", "ดีขึ้นหลังเลิกบุหรี่ภายในไม่กี่สัปดาห์ถึงไม่กี่เดือน"],
        ix: ["COHb"]
      })
    ]),
    N("Secondary non-hypoxic (EPO high, SpO2 normal)", "step", {
      s: "Inappropriate EPO production",
      keys: ["Kidney imaging", "KT", "Tumor"]
    }, [
      N("Post-transplant erythrocytosis", "nephro", {
        s: "Persistent Hct > 51% หรือ Hb > 17 g/dL หลัง KT",
        why: "เกิดราว 10-15% ของ KT ใน 8-24 เดือนแรก, เพิ่ม thromboembolic risk, first-line คือ ACEi หรือ ARB และเป็น diagnosis of exclusion",
        keys: ["ชาย, smoker, ไม่มี rejection, graft function ดี", "Native polycystic kidneys หรือ hydronephrosis", "Transplant renal artery stenosis", "กลไก: EPO, angiotensin II และ IGF-1 ร่วมกัน", "ก่อนสรุปว่าเป็น PTE ต้อง exclude สาเหตุทั่วไปเหมือนคนไม่ได้ KT: RCC ใน native kidney หรือ graft, OSA, smoking, PV", "ตอบสนองดีต่อ ACEi หรือ ARB, theophylline, phlebotomy"],
        ix: ["EPO, graft Doppler, native kidney US"],
        std: "KDIGO 2009 care of KT recipient (PTE)",
        link: "kt-late"
      }),
      N("Renal cell carcinoma and other EPO-secreting tumor", "nephro", {
        s: "RCC, HCC, cerebellar hemangioblastoma, uterine fibroid, pheochromocytoma",
        keys: ["Classic triad: hematuria, flank pain, mass (พบน้อย)", "Paraneoplastic: hypercalcemia, fever, hepatic dysfunction (Stauffer), hypertension", "VHL: hemangioblastoma, RCC, kidney cyst, pheo", "Acquired cystic kidney disease ใน dialysis เพิ่ม RCC"],
        ix: ["CT abdomen with contrast หรือ MRI, VHL testing"],
        link: "flank"
      }),
      N("ADPKD and benign kidney lesions", "nephro", {
        s: "ADPKD, simple cyst, hydronephrosis, renal artery stenosis",
        keys: ["ADPKD: Hb สูงกว่าคาดเทียบกับ eGFR, ESA ต้องการน้อย", "Local renal ischemia จาก cyst compression กระตุ้น EPO", "Hydronephrosis และ renal artery stenosis", "Bartter syndrome มีรายงาน"],
        ix: ["Kidney US, Doppler"],
        link: "cysts"
      }),
      N("High-affinity hemoglobin and 2,3-BPG deficiency", "adj", {
        s: "Congenital secondary erythrocytosis",
        keys: ["P50 ต่ำ", "Family history", "EPO ปกติหรือสูงเล็กน้อย"],
        ix: ["P50, Hb electrophoresis, genetic testing"]
      })
    ])
  ])
};

/* ===================== EOSINOPHILIA ===================== */
TREES.eosinophilia = {
  must: [
    "Absolute eosinophil count และ trend, ระยะเวลา",
    "ยาใหม่ 2-8 สัปดาห์: allopurinol, anticonvulsant, sulfa, vancomycin, beta-lactam, PPI",
    "Angiography หรือ anticoagulant ล่าสุด (cholesterol emboli)",
    "Asthma, sinusitis, polyp, mononeuritis",
    "Raw food: ปลาน้ำจืด (ก้อยปลา), หอยโข่ง, กบ, หมูดิบ, ผักน้ำ",
    "เดินเท้าเปล่า, endemic area, ก่อน KT หรือก่อนเริ่ม steroid",
    "Rash, fever, lymph node, liver enzyme",
    "PD effluent ขุ่นหลังใส่ catheter ใหม่"
  ],
  tree: N("Eosinophilia", "root", {
    s: "Grade ด้วย AEC แล้วแบ่ง reactive (drug, parasite, allergic, autoimmune, kidney-related) กับ clonal หรือ idiopathic, AEC ≥ 1.5 x10⁹/L ต้องประเมิน organ damage",
    why: "Eosinophilia เป็น clue ของ AIN, DRESS, cholesterol emboli, EGPA, IgG4-RD, adrenal insufficiency, eosinophilic peritonitis ใน PD และ Strongyloides ที่ต้อง exclude ก่อนให้ immunosuppression",
    keys: ["Mild 0.5-1.5, hypereosinophilia ≥ 1.5 x10⁹/L", "Drug ภายใน 2-8 สัปดาห์", "Strongyloides ต้อง exclude ก่อน steroid ในคนที่มาจาก endemic", "Organ damage: heart, lung, skin, nerve, kidney"],
    ix: ["CBC with smear, LFT, Cr, UA", "Strongyloides serology, stool exam x3", "ANCA, IgG4, cortisol, tryptase", "Troponin และ echo ใน HES"],
    std: "ICOG-EO 2011 consensus, WHO 2022 eosinophilic disorders"
  }, [
    N("Drug and allergic", "step", {
      s: "Reactive จากยาและ atopy",
      keys: ["Drug latency", "Rash", "Organ involvement"]
    }, [
      N("DRESS syndrome", "nephro", {
        s: "Allopurinol, carbamazepine, phenytoin, sulfa, vancomycin, minocycline",
        why: "Allopurinol DRESS พบบ่อยในคนไทย (HLA-B*58:01) และ risk สูงขึ้นมากใน CKD, kidney involvement พบบ่อยที่สุดใน allopurinol DRESS",
        keys: ["Latency 2-8 สัปดาห์หลังเริ่มยา", "Fever, facial edema, morbilliform rash, lymphadenopathy", "Hepatitis, AIN, myocarditis, pneumonitis", "Atypical lymphocyte, eosinophilia (RegiSCAR ให้คะแนนตั้งแต่ ≥ 0.7 และสูงสุดที่ ≥ 1.5 x10⁹/L)", "HHV-6 reactivation และ late autoimmune thyroiditis"],
        ix: ["RegiSCAR score, LFT, Cr, UA, troponin, HLA-B*58:01 ก่อนเริ่ม allopurinol"],
        std: "RegiSCAR scoring system",
        link: "rash"
      }),
      N("Drug-induced acute interstitial nephritis", "nephro", {
        s: "Beta-lactam, PPI, NSAID, rifampicin, ICI",
        keys: ["Triad ไข้ ผื่น eosinophilia พบน้อยกว่า 10%", "Sterile pyuria, WBC cast, subnephrotic proteinuria", "PPI และ NSAID มักไม่มี eosinophilia (ไม่มี eosinophilia จึงไม่ตัด AIN)", "Urine eosinophil sensitivity และ specificity ต่ำ ไม่ควรใช้"],
        ix: ["UA, UPCR, kidney biopsy"],
        link: "pyuria"
      }),
      N("Atopic disease and eosinophilic organ disease", "adj", {
        s: "Asthma, allergic rhinitis, EoE, eosinophilic pneumonia, ABPA",
        keys: ["Mild eosinophilia < 1.5 ใน atopy", "ABPA: asthma, total IgE ≥ 500 IU/mL (ISHAM 2024, เกณฑ์เดิม > 1000), Aspergillus fumigatus-specific IgE", "Chronic eosinophilic pneumonia: photographic negative of pulmonary edema"],
        ix: ["IgE, CXR, Aspergillus IgE"]
      })
    ]),
    N("Kidney-related", "step", {
      s: "Eosinophilia ที่พบในบริบทโรคไต dialysis และ electrolyte (รวม adrenal insufficiency)",
      keys: ["Angiography", "Dialysis", "PD"]
    }, [
      N("Atheroembolic kidney disease", "nephro", {
        s: "Cholesterol crystal embolism หลัง angiography, vascular surgery, anticoagulant",
        keys: ["Eosinophilia พบได้ไม่ทุกราย (รายงานตั้งแต่ไม่ถึง 20% จนถึง 80% แล้วแต่ series) และมักชั่วคราวในช่วงแรก ไม่มี eosinophilia จึงไม่ตัดโรค", "Blue toe, livedo reticularis, Hollenhorst plaque", "Subacute stepwise AKI 1-6 สัปดาห์หลังหัตถการ (ไม่ใช่ 24-72 ชั่วโมงแบบ contrast)", "Low complement บางราย, ESR สูง", "Biconvex cleft บน kidney หรือ skin biopsy"],
        ix: ["Eosinophil, C3, skin biopsy, kidney biopsy"],
        link: "bluetoe"
      }),
      N("Eosinophilic peritonitis in PD", "nephro", {
        s: "Early หลังใส่ catheter, icodextrin, air, antibiotic",
        keys: ["Cloudy effluent, culture negative, ไม่มีปวดท้องหรือไข้", "Eosinophil > 10% ของ effluent WBC และ absolute eosinophil > 100 cells/µL", "มักเกิดภายใน 2-6 สัปดาห์หลังเริ่ม PD", "หายเองหรือตอบสนอง antihistamine, intraperitoneal steroid", "ต้องแยกจาก infectious peritonitis ก่อนเสมอ (culture ทุกราย, fungal และ mycobacterial ก็มี eosinophil ได้)"],
        ix: ["Effluent cell count with Wright stain, culture"],
        std: "ISPD 2022 peritonitis recommendations",
        link: "pd-cloudy"
      }),
      N("Hemodialysis-associated eosinophilia", "nephro", {
        s: "Dialyzer membrane, ethylene oxide, heparin",
        keys: ["Eosinophilia พบบ่อยใน HD โดยไม่มีอาการ", "Ethylene oxide sensitization: type A reaction, IgE anti-EtO", "ดีขึ้นเมื่อเปลี่ยนเป็น steam หรือ gamma sterilized membrane"],
        ix: ["Review dialyzer sterilization"],
        link: "hd-idh"
      }),
      N("Adrenal insufficiency", "nephro", {
        s: "Cortisol deficiency ทำ eosinophilia",
        keys: ["Eosinophilia กับ hyponatremia และ hyperkalemia", "Septic patient ที่มี eosinophilia คิด relative adrenal insufficiency", "Steroid withdrawal ใน GN และ KT"],
        ix: ["Cortisol, ACTH"],
        link: "hyperpig"
      })
    ]),
    N("Autoimmune and vasculitic", "step", {
      s: "Systemic inflammatory",
      keys: ["Asthma", "Neuropathy", "IgG4"]
    }, [
      N("Eosinophilic granulomatosis with polyangiitis", "nephro", {
        s: "Asthma, eosinophilia, vasculitis",
        keys: ["Late-onset asthma และ nasal polyp นำหลายปี", "Mononeuritis multiplex, cardiomyopathy (สาเหตุตายหลัก), purpura", "MPO-ANCA positive ราวหนึ่งในสามถึงครึ่ง, GN มักใน ANCA positive", "Eosinophil > 1 x10⁹/L ได้คะแนนสูงสุดใน classification"],
        ix: ["MPO-ANCA, troponin, echo, cardiac MRI, NCS, UA"],
        std: "ACR/EULAR 2022 EGPA classification, EULAR 2022 AAV management",
        link: "numbness"
      }),
      N("IgG4-related disease", "nephro", {
        s: "Fibroinflammatory multi-organ disease",
        keys: ["Autoimmune pancreatitis, sialadenitis, retroperitoneal fibrosis", "IgG4-TIN: low C3 และ C4, kidney mass หรือ wedge lesion บน CT", "Eosinophilia และ IgE สูงในราวหนึ่งในสาม", "MN ร่วมได้"],
        ix: ["IgG4, C3, C4, CT, biopsy"],
        std: "ACR/EULAR 2019 IgG4-RD classification",
        link: "backpain"
      })
    ]),
    N("Parasitic", "step", {
      s: "Tissue-invasive helminth",
      keys: ["Raw food", "Endemic exposure", "Before immunosuppression"]
    }, [
      N("Strongyloidiasis", "nephro", {
        s: "Strongyloides stercoralis endemic ในไทยโดยเฉพาะอีสาน",
        why: "Steroid หรือ immunosuppression ก่อน KT, GN หรือ LN treatment ทำ hyperinfection syndrome ที่ตายสูง",
        keys: ["Larva currens (serpiginous rash เคลื่อนเร็ว), GI symptom, eosinophilia ไม่สูงมาก", "Hyperinfection: gram-negative sepsis และ meningitis, eosinophilia อาจหายไป", "Risk: steroid, HTLV-1, KT, alcohol", "Screen ด้วย serology ก่อน KT และก่อนให้ steroid dose สูง"],
        ix: ["Strongyloides serology, stool agar plate culture"],
        std: "KDIGO 2020 KT candidate guideline (screening)",
        link: "kt-fever"
      }),
      N("Gnathostomiasis and angiostrongyliasis", "adj", {
        s: "Gnathostoma spinigerum, Angiostrongylus cantonensis",
        keys: ["Gnathostoma: ปลาน้ำจืด, กบ, ไก่ดิบ, migratory swelling, eosinophilic myeloencephalitis", "Angiostrongylus: หอยโข่ง, eosinophilic meningitis (CSF eos > 10%)", "พบบ่อยในไทย"],
        ix: ["Serology, CSF"],
        link: "headache"
      }),
      N("Opisthorchiasis, trichinellosis and other helminths", "nephro", {
        s: "Opisthorchis viverrini (อีสาน), Trichinella, hookworm, filaria, schistosoma, toxocara",
        keys: ["Opisthorchis: ก้อยปลาดิบ, cholangitis, cholangiocarcinoma", "Trichinella: หมูดิบ, myositis, periorbital edema, CK สูง, AKI", "Schistosoma haematobium (แอฟริกา): hematuria, bladder calcification, glomerulopathy", "Filaria: chyluria, nephrotic syndrome", "Hookworm: iron deficiency"],
        ix: ["Stool exam x3, serology, urine for ova"],
        link: "hsm"
      })
    ]),
    N("Neoplastic and idiopathic", "step", {
      s: "Clonal หรือ cytokine-driven",
      keys: ["AEC > 1.5 ต่อเนื่อง", "Organ damage", "Splenomegaly"]
    }, [
      N("Hypereosinophilic syndrome and myeloid neoplasm", "adj", {
        s: "FIP1L1-PDGFRA, PDGFRB, idiopathic HES",
        keys: ["AEC ≥ 1.5 สองครั้งห่าง ≥ 1 เดือนกับ organ damage", "Endomyocardial fibrosis, mural thrombus", "FIP1L1-PDGFRA: ชาย, splenomegaly, tryptase สูง, ตอบสนอง imatinib ดีมาก", "Thromboembolism"],
        ix: ["FIP1L1-PDGFRA FISH, bone marrow, tryptase, troponin, echo"],
        std: "ICOG-EO 2011, WHO 2022"
      }),
      N("Lymphoma and solid tumor", "nephro", {
        s: "Hodgkin, T-cell lymphoma, lung, GI cancer",
        keys: ["Hodgkin: eosinophilia, pruritus, MCD", "T-cell lymphoma: lymphocytic-variant HES (aberrant T cell, IL-5)", "Solid tumor eosinophilia พยากรณ์ไม่ดี"],
        ix: ["CT, flow cytometry T-cell clonality, biopsy"],
        link: "lymphnode"
      })
    ])
  ])
};
