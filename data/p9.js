/* Phase 1 Symptomatology extension A: cardiopulmonary and gastrointestinal.
   Same node schema as p1.js (t, tag, s, why, keys, ix, std, link, k). */
window.TREES = window.TREES || {};

/* ===================== SHOCK AND HYPOTENSION ===================== */
TREES.shock = {
  must: [
    "Onset: เฉียบพลันระหว่างฟอก, หลังให้ยาหรือ contrast, หลังหัตถการ, ค่อยเป็นค่อยไป",
    "Fluid loss: อาเจียน, ท้องเสีย, polyuria, เลือดออก, UF ที่ดึงไป",
    "ไข้, หนาวสั่น, แหล่งติดเชื้อ: catheter, PD fluid, ปัสสาวะ, ปอด, แผล",
    "เจ็บหน้าอก, หอบ, ใจสั่น, ขาบวมข้างเดียว",
    "Steroid ที่ใช้อยู่หรือเพิ่งหยุด (KT, GN, LN)",
    "ยา: antihypertensive, beta-blocker, CCB, nitrate, SGLT2i, metformin, insulin",
    "ผื่น, คัน, ปากบวม หลังได้ยาหรือเริ่มฟอก",
    "Anticoagulant, femoral puncture, kidney biopsy ล่าสุด"
  ],
  tree: N("Shock and hypotension", "root", {
    s: "ประเมิน perfusion ก่อน แล้วแบ่ง 4 กลไกด้วย skin temperature, JVP, POCUS (RUSH) และ lactate",
    why: "Shock ใน long case nephro มักซ่อนเป็น AKI แบบ prerenal หรือ ATN, ต้องบอกกลไกให้ได้เพราะการรักษาตรงข้ามกัน (fluid vs vasopressor vs inotrope vs relieve obstruction)",
    keys: ["Cold clammy vs warm flushed", "JVP สูงหรือต่ำ", "Pulse pressure แคบหรือกว้าง", "Lactate > 2 mmol/L", "POCUS: LV, RV, IVC, pericardium, lung B-lines", "Urine output < 0.5 mL/kg/h"],
    ix: ["Lactate, ABG, CBC, Cr, electrolytes, LFT", "Troponin, BNP, ECG", "POCUS RUSH protocol, echo", "Culture 2 sets ก่อน antibiotic", "Cortisol ถ้าสงสัย adrenal"],
    std: "Sepsis-3 (Singer, JAMA 2016), Surviving Sepsis Campaign 2021, SCAI shock classification 2022"
  }, [
    N("Hypovolemic", "step", {
      s: "Cold extremities, JVP ต่ำ, IVC collapse > 50%, pulse pressure แคบ",
      keys: ["Postural drop > 20 mmHg systolic", "Capillary refill > 3 วินาที", "BUN:Cr > 20", "FENa < 1% (เชื่อไม่ได้ถ้าได้ diuretic หรือมี CKD เดิม, และ FENa ต่ำพบได้ใน sepsis, contrast, rhabdomyolysis, AGN จึงไม่จำเพาะต่อ hypovolemia)"]
    }, [
      N("Hemorrhagic shock", "adj", {
        s: "GI bleed, retroperitoneal hematoma, post-biopsy bleed, ruptured AAA",
        why: "ผู้ป่วยไตได้ heparin ระหว่าง HD, มี uremic platelet dysfunction และทำ kidney biopsy หรือ femoral catheter บ่อย",
        keys: ["Hb ลดแต่ช่วงแรกอาจยังปกติเพราะยังไม่ hemodilute", "Melena, hematemesis หรือ flank ecchymosis (Grey Turner) และ groin ecchymosis (Fox sign) ใน retroperitoneal bleed", "ปวดเอวหรือปวดหลังหลัง kidney biopsy (bleeding ส่วนใหญ่เกิดใน 24 ชั่วโมงแรก แต่เกิดช้ากว่านั้นได้)", "Pulsatile abdominal mass กับปวดหลังในคนสูบบุหรี่สูงอายุ", "BUN ขึ้นไม่สัมพันธ์กับ Cr ใน upper GI bleed"],
        ix: ["Serial Hb, coagulation, platelet", "CT angiography abdomen", "Endoscopy ใน GI bleed"],
        link: "gibleed"
      }),
      N("GI and renal fluid loss", "nephro", {
        s: "อาเจียน, ท้องเสีย, diuretic, osmotic diuresis, salt-wasting, post-obstructive diuresis",
        why: "แยก renal loss กับ extrarenal loss ด้วย urine Na และ Cl ช่วยตอบ electrolyte ที่มากับ shock",
        keys: ["Urine Na < 20 mmol/L ใน extrarenal loss (ยกเว้น vomiting ช่วงที่มี bicarbonaturia urine Na สูงได้ ให้ดู urine Cl < 20 mmol/L แทน)", "Urine Na > 40 mmol/L ทั้งที่ volume depleted บ่งว่าเป็น renal loss: diuretic, osmotic diuresis, salt-wasting, adrenal insufficiency", "Polyuria ต่อเนื่องหลังแก้ obstruction หรือหลัง ATN recovery", "Hyperglycemia กับ glycosuria (osmotic diuresis)", "Metabolic alkalosis ใน vomiting, NAGMA ใน diarrhea"],
        ix: ["Urine Na, Cl, osmolality, glucose", "Serum K, HCO3"],
        link: "polyuria"
      }),
      N("Excess ultrafiltration and intradialytic hypotension", "nephro", {
        s: "ดึงน้ำเกิน dry weight หรือ UF rate สูง",
        why: "IDH เป็นปัญหาที่ examiner ถามบ่อยใน HD long case, ต้องแยกจาก sepsis, ischemia และ dialyzer reaction",
        keys: ["Nadir SBP < 90 mmHg ระหว่างฟอก", "UF rate > 10-13 mL/kg/h", "มักเกิดช่วงครึ่งหลังของการฟอกและไม่มีไข้ (ถ้าเกิดตั้งแต่ต้นชั่วโมงแรก หรือมีไข้ หนาวสั่น เจ็บอก ให้หาสาเหตุอื่นก่อน)", "ตะคริวและหาวนำมาก่อน", "Interdialytic weight gain สูงหรือ dry weight ประเมินต่ำเกิน"],
        ix: ["UF rate, IDWG, BIA หรือ lung US", "Echo ถ้าเป็นซ้ำ"],
        std: "KDOQI 2005 CV guideline, EBPG 2007",
        link: "hd-idh"
      }),
      N("Third spacing", "adj", {
        s: "Pancreatitis, burns, bowel obstruction, severe hypoalbuminemia",
        keys: ["Weight เพิ่มแต่ intravascular depleted", "Lipase > 3 เท่า ULN กับปวดท้องทะลุหลัง", "Hct สูง (hemoconcentration) ใน pancreatitis และ capillary leak", "Hypocalcemia ใน severe pancreatitis"],
        ix: ["Lipase, Hct, albumin, CT abdomen"],
        link: "abdpain"
      })
    ]),
    N("Distributive", "step", {
      s: "Warm extremities ช่วงแรก, pulse pressure กว้าง, diastolic BP ต่ำ, IVC แฟบหรือปกติ",
      keys: ["Bounding pulse", "Diastolic BP < 40-50 mmHg", "Cardiac output สูงบน echo (hyperdynamic LV)", "ให้ fluid แล้ว BP มักไม่ขึ้นพอ ต้องใช้ vasopressor ร่วม (ไม่ได้แปลว่าไม่ต้องให้ fluid)"]
    }, [
      N("Septic shock", "nephro", {
        s: "ไข้หรือ hypothermia กับ infection ที่ต้องใช้ vasopressor ให้ MAP ≥ 65 และ lactate > 2 แม้ได้ fluid แล้ว",
        why: "Sepsis เป็นสาเหตุ AKI ในไอซียูอันดับหนึ่ง และเป็นสาเหตุตายสำคัญใน HD (catheter), PD (peritonitis) และ KT (opportunistic)",
        keys: ["Source: HD catheter (rigor เมื่อเริ่มฟอก), PD effluent ขุ่น, graft pyelonephritis", "Hypothermia และไม่มีไข้พบได้ใน uremia, elderly และ immunosuppressed", "Procalcitonin baseline สูงใน CKD จึงต้องดู trend", "Melioidosis: DM, CKD, ชาวนาอีสาน, abscess ตับม้าม, ต่อม parotid", "Sepsis-3: SOFA เพิ่ม ≥ 2 จาก baseline เป็นเกณฑ์วินิจฉัย, qSOFA ≥ 2 เป็นเพียง bedside prompt ที่ sensitivity ต่ำ (SSC 2021 ไม่แนะนำให้ใช้ qSOFA เดี่ยว ๆ เป็น screening)"],
        ix: ["Blood culture 2 sets รวมจาก catheter", "Lactate ซ้ำใน 2-4 ชั่วโมง", "Source imaging"],
        std: "Sepsis-3, Surviving Sepsis Campaign 2021",
        link: "febrileaki"
      }),
      N("Anaphylaxis and dialyzer reaction", "nephro", {
        s: "Hypotension กับผื่น, หอบ, ปากบวม หลังได้ยา, contrast, iron IV หรือในนาทีแรกของ HD",
        why: "Type A dialyzer reaction (ethylene oxide, AN69 กับ ACEi) เกิดใน 5-30 นาทีแรก ต้องหยุดฟอกและห้ามคืนเลือด",
        keys: ["Onset นาทีถึง 2 ชั่วโมงหลัง exposure", "Urticaria, angioedema, wheeze, GI cramp", "ACEi ร่วมกับ AN69 membrane ทำให้ bradykinin สูง", "Type B reaction เบากว่า เกิด 20-40 นาที และหายเองระหว่างฟอก", "Tryptase สูง (peak 1-2 ชั่วโมงหลังเริ่มอาการ) สนับสนุน anaphylaxis แต่ค่าปกติไม่ตัดออก"],
        ix: ["Serum tryptase ภายใน 2 ชั่วโมง", "Review dialyzer membrane, sterilization method, heparin, iron"],
        std: "World Allergy Organization anaphylaxis guidance 2020",
        link: "rash"
      }),
      N("Adrenal crisis", "nephro", {
        s: "Shock ที่ดื้อต่อ fluid และ vasopressor ในคนที่เคยได้ steroid",
        why: "ผู้ป่วย GN, LN, KT ได้ prednisolone นาน เมื่อหยุดยา, อาเจียนกินยาไม่ได้ หรือมี sepsis จะเกิด crisis ได้",
        keys: ["Steroid ≥ 5 mg prednisolone นานกว่า 3-4 สัปดาห์", "Hyponatremia, hyperkalemia (ใน primary), hypoglycemia, eosinophilia", "ปวดท้อง อาเจียน ไข้ต่ำ ๆ คล้าย surgical abdomen", "Hyperpigmentation เฉพาะ primary adrenal insufficiency", "Adrenal hemorrhage จาก anticoagulant, APS, meningococcemia"],
        ix: ["Random cortisol ก่อนให้ hydrocortisone", "ACTH, renin", "ห้ามรอผล ให้ hydrocortisone 100 mg IV ทันที"],
        std: "Endocrine Society 2016 primary adrenal insufficiency guideline, ESE/Endocrine Society 2024 glucocorticoid-induced adrenal insufficiency guideline",
        link: "hypona"
      }),
      N("Drug and toxin vasodilation", "nephro", {
        s: "Antihypertensive สะสม, CCB หรือ beta-blocker overdose, metformin-associated lactic acidosis",
        why: "ยาหลายตัวสะสมเมื่อ GFR ลด, metformin ใน AKI ทำ lactic acidosis รุนแรงจนต้อง dialysis",
        keys: ["CCB overdose: hypotension กับ hyperglycemia", "Beta-blocker overdose: bradycardia กับ hypoglycemia", "MALA: lactate > 5 mmol/L กับ pH < 7.35 ในคนได้ metformin ร่วม AKI, รายรุนแรง lactate มักสูงเกิน 10-15 mmol/L (EXTRIP แนะนำ extracorporeal treatment เมื่อ lactate > 20 mmol/L, pH ≤ 7.0, shock หรือ supportive care ล้มเหลว)", "Atenolol และ sotalol สะสมใน CKD", "SGLT2i ร่วม diuretic ใน volume depleted"],
        ix: ["Lactate, metformin level ถ้ามี", "Glucose, ECG"],
        std: "EXTRIP workgroup metformin 2015",
        link: "agma"
      }),
      N("Liver failure and acute on chronic liver failure", "nephro", {
        s: "Vasodilation จาก cirrhosis ร่วม AKI-HRS",
        keys: ["MAP ต่ำ baseline ราว 65-70 mmHg ใน decompensated cirrhosis", "Ascites, jaundice, encephalopathy", "Urine Na มัก < 10-20 mmol/L ใน HRS-AKI (แยกจาก prerenal ไม่ได้ และถูกตัดออกจากเกณฑ์วินิจฉัยตั้งแต่ International Ascites Club 2007)", "Precipitant: spontaneous bacterial peritonitis, variceal bleed, alcohol-associated hepatitis"],
        ix: ["Ascitic fluid PMN ≥ 250 cells/µL (spontaneous bacterial peritonitis)", "INR, bilirubin, MELD"],
        std: "ICA-ADQI 2024 HRS-AKI",
        link: "jaundice"
      }),
      N("Capillary leak syndromes", "adj", {
        s: "Dengue shock, systemic capillary leak (Clarkson), cytokine release syndrome",
        why: "Dengue critical phase เป็นสาเหตุ AKI และ shock ที่พบบ่อยในไทย",
        keys: ["Dengue: ไข้ลดวันที่ 3-7 แล้ว shock, Hct ขึ้น ≥ 20%, platelet ≤ 100,000", "Pleural effusion และ ascites ร่วม hemoconcentration", "Clarkson: Hct สูง, albumin ต่ำมาก, monoclonal gammopathy ราวสามในสี่", "CRS หลัง CAR-T หรือ bispecific: ไข้สูงใน 1-14 วัน"],
        ix: ["Hct serial, NS1 หรือ dengue serology", "SPEP ใน Clarkson"],
        std: "WHO 2009 dengue case classification",
        link: "edema"
      }),
      N("Neurogenic shock", "adj", {
        s: "Spinal cord injury เหนือ T6",
        keys: ["Hypotension กับ bradycardia", "Warm dry skin", "Neurological deficit ชัด"],
        ix: ["MRI spine"]
      })
    ]),
    N("Cardiogenic", "step", {
      s: "Cold, JVP สูง, crepitation, LV หรือ RV function ลดบน echo",
      keys: ["Cardiac index < 2.2 L/min/m²", "Pulmonary edema กับ hypotension", "S3 gallop", "Lactate สูงกับ urine output ลด"]
    }, [
      N("Acute myocardial infarction", "adj", {
        s: "Chest pain อาจไม่มีใน DM, elderly และ dialysis",
        why: "CKD มี silent MI บ่อย, troponin baseline สูงใน CKD จึงต้องดู delta",
        keys: ["Dynamic troponin rise and fall เกิน 99th percentile (ไม่ใช่ค่าคงที่)", "ST change ใหม่ แต่ LVH strain ใน CKD ทำให้แปลยาก", "Regional wall motion abnormality บน echo", "Hypotension ขณะฟอกที่ไม่เคยเกิด อาจเป็น ACS"],
        ix: ["Serial hs-troponin 0/1-3 ชั่วโมง", "ECG ซ้ำ, echo, coronary angiography"],
        std: "Fourth Universal Definition of MI 2018, ESC 2023 ACS guideline",
        link: "chestpain"
      }),
      N("Acute decompensated heart failure and cardiomyopathy", "nephro", {
        s: "Ischemic, dilated, uremic cardiomyopathy, high-output จาก AV fistula, stress (Takotsubo)",
        keys: ["Low output: cold, narrow pulse pressure, confusion, oliguria", "Cardiorenal type 1: Cr ขึ้นพร้อม congestion", "AVF flow > 1.5-2 L/min หรือ Qa/CO > 0.3 เพิ่มความเสี่ยง high-output failure (ไม่ใช่ทุกรายที่ flow สูงจะเกิด)", "Takotsubo: apical ballooning หลัง stress, coronary ปกติ", "Peripartum cardiomyopathy: 1 เดือนก่อนถึง 5 เดือนหลังคลอด"],
        ix: ["Echo, BNP, lactate", "Access flow measurement"],
        std: "ESC 2021 HF guideline and 2023 focused update",
        link: "dyspnea"
      }),
      N("Arrhythmia and BRASH syndrome", "nephro", {
        s: "Bradycardia จาก hyperkalemia ร่วม AV nodal blocker, หรือ tachyarrhythmia",
        why: "BRASH (bradycardia, renal failure, AV nodal blockade, shock, hyperkalemia) เป็นวงจรที่ K ไม่สูงมากแต่ bradycardia รุนแรง",
        keys: ["K อาจเพียง 5.5-6.5 แต่ bradycardia รุนแรงเพราะ synergy กับ beta-blocker หรือ verapamil", "AF กับ rapid ventricular response ใน hyperthyroid, sepsis, post-HD hypokalemia", "QT ยาวจาก hypokalemia, hypomagnesemia, hypocalcemia ทำ torsades", "Digoxin toxicity: bidirectional VT, เห็นภาพสีเหลือง"],
        ix: ["ECG, K, Mg, Ca, digoxin level, TSH"],
        link: "palpitation"
      }),
      N("Acute myocarditis", "adj", {
        s: "Viral, immune checkpoint inhibitor, SLE, giant cell",
        keys: ["Troponin สูงมากกับ coronary ปกติ", "ICI myocarditis ส่วนใหญ่เกิดใน 3 เดือนแรกหลังเริ่มยา และบางรายมี myositis หรือ myasthenia gravis ร่วม (overlap syndrome, ควรตรวจ CK ทุกราย)", "LGE แบบ non-ischemic (subepicardial) บน cardiac MRI", "Viral prodrome 1-2 สัปดาห์"],
        ix: ["Cardiac MRI (Lake Louise 2018)", "CK, endomyocardial biopsy ใน fulminant"],
        std: "ESC 2025 myocarditis and pericarditis guideline",
        link: "onco"
      }),
      N("Acute valvular regurgitation", "adj", {
        s: "Infective endocarditis หรือ papillary muscle rupture",
        keys: ["Murmur ใหม่ (อาจเบาเพราะ pressure equalize เร็ว)", "Flash pulmonary edema", "Fever กับ HD catheter หรือ valve prosthesis", "Embolic phenomena และ immune complex GN"],
        ix: ["TTE แล้ว TEE", "Blood culture 3 sets"],
        std: "2023 Duke-ISCVID IE criteria",
        link: "murmur"
      })
    ]),
    N("Obstructive", "step", {
      s: "JVP สูง แต่ lung clear, RV dilate หรือ effusion บน POCUS",
      keys: ["Pulsus paradoxus > 10 mmHg", "Distended neck veins กับ clear lungs", "RV:LV ratio > 1", "Absent lung sliding"]
    }, [
      N("Cardiac tamponade (uremic and other)", "nephro", {
        s: "Uremic pericarditis, dialysis pericarditis, SLE, TB, malignancy",
        why: "Uremic pericardial effusion อาจไม่มี tachycardia เพราะ autonomic dysfunction และมักเกิด IDH ซ้ำ ๆ ก่อน",
        keys: ["Hypotension ระหว่างฟอกที่ใหม่และเป็นซ้ำ", "Pulsus paradoxus, Beck triad, electrical alternans", "Friction rub อาจหายไปเมื่อ effusion มาก (ไม่ได้ยิน rub ไม่ตัด pericarditis)", "Echo: RA collapse, RV diastolic collapse, plethoric IVC", "Uremic effusion มักเป็น serosanguinous หรือ hemorrhagic และ heparin ระหว่างฟอกเพิ่มความเสี่ยง hemorrhagic tamponade"],
        ix: ["Echo", "Pericardial fluid: cell, ADA, cytology, culture"],
        std: "ESC 2025 myocarditis and pericarditis guideline",
        link: "chestpain"
      }),
      N("Massive pulmonary embolism", "nephro", {
        s: "Nephrotic syndrome (MN, albumin < 2.5 g/dL), post-KT, malignancy, immobilization",
        keys: ["Sudden dyspnea, hypoxemia, syncope", "RV dilatation, McConnell sign, D-shaped septum", "S1Q3T3 และ right heart strain ไม่ sensitive", "DVT ขาข้างเดียวร่วม", "D-dimer baseline สูงใน CKD ลด specificity"],
        ix: ["CTPA หรือ V/Q ถ้าเลี่ยง contrast", "Leg compression ultrasound, echo"],
        std: "ESC 2019 acute PE guideline",
        link: "thrombosis"
      }),
      N("Tension pneumothorax", "adj", {
        s: "หลังใส่ central line, hemodialysis catheter ทาง subclavian หรือ jugular",
        keys: ["Absent breath sounds ข้างเดียว", "Tracheal deviation", "Absent lung sliding บน US", "เกิดทันทีหลังหัตถการ"],
        ix: ["Clinical diagnosis, CXR ถ้า stable"]
      })
    ]),
    N("Endocrine and metabolic", "step", {
      s: "Shock ที่ไม่เข้ากับ 4 กลไกหลัก หรือดื้อต่อการรักษา",
      keys: ["Hypoglycemia", "Hypothermia", "Severe acidemia pH < 7.1"]
    }, [
      N("Myxedema coma", "adj", {
        s: "Hypothyroid รุนแรง มี hypothermia, bradycardia, hyponatremia",
        keys: ["Hypothermia, delayed reflex relaxation", "Hyponatremia, hypoventilation กับ CO2 retention", "Pericardial effusion", "CK สูง และ Cr ขึ้นได้ (reversible)", "TSH สูงมากใน primary แต่ TSH ต่ำหรือปกติใน central"],
        ix: ["TSH, free T4, cortisol (ให้ hydrocortisone ก่อน levothyroxine)"],
        std: "ATA 2014 hypothyroidism guideline",
        link: "ams"
      }),
      N("Severe metabolic acidosis and electrolyte crisis", "nephro", {
        s: "pH < 7.1 ลด myocardial contractility, hypocalcemia, hypermagnesemia",
        keys: ["Lactic, ketoacidosis, toxic alcohol", "Ionized Ca < 0.9 mmol/L หลัง citrate (CRRT, plasma exchange, massive transfusion)", "Hypermagnesemia > 5 mg/dL: hypotension, loss of DTR", "Hypophosphatemia รุนแรงทำ myocardial dysfunction"],
        ix: ["ABG, anion gap, osmolal gap, ionized Ca, Mg, PO4"],
        link: "agma"
      })
    ])
  ])
};

/* ===================== HYPOXEMIA AND CYANOSIS ===================== */
TREES.cyanosis = {
  must: [
    "Central (ลิ้น ริมฝีปาก) หรือ peripheral (ปลายมือเท้าเท่านั้น)",
    "SpO2 เทียบ PaO2 (saturation gap)",
    "ยาใหม่: dapsone, primaquine, rasburicase, nitrate, local anesthetic, metoclopramide",
    "Opioid, gabapentinoid, benzodiazepine ที่สะสมใน CKD",
    "ระหว่างฟอก: ช่วง 15-60 นาทีแรก",
    "Platypnea (หอบตอนนั่ง), clubbing, spider nevi",
    "Congenital heart disease, Eisenmenger, HHT (เลือดกำเดาซ้ำ)",
    "ควันจากเตา, เครื่องยนต์ในที่ปิด (CO)"
  ],
  tree: N("Hypoxemia and cyanosis", "root", {
    s: "ยืนยันว่า hypoxemia จริงด้วย ABG แล้วแบ่งด้วย A-a gradient และการตอบสนองต่อ O2, ถ้า SpO2 กับ PaO2 ไม่ตรงกันให้คิด abnormal hemoglobin",
    why: "ผู้ป่วยไตได้ยาที่ทำ methemoglobinemia (dapsone สำหรับ PJP prophylaxis ใน KT, rasburicase), ยากดการหายใจสะสม และมี pulmonary edema หรือ pulmonary-renal syndrome",
    keys: ["A-a gradient = (FiO2 x 713) − PaCO2/0.8 − PaO2, ปกติ < 4 + อายุ/4", "Shunt ไม่ตอบสนองต่อ 100% O2", "PaCO2 สูงชี้ hypoventilation", "Saturation gap > 5% ชี้ dyshemoglobin", "Central cyanosis เห็นเมื่อ deoxyHb > 5 g/dL (ซีดมากอาจไม่เห็น)"],
    ix: ["ABG กับ co-oximetry", "CXR, lung US, CT chest", "Echo กับ agitated saline contrast"],
    std: "Physiological classification: low FiO2, hypoventilation, V/Q mismatch, shunt, diffusion limitation"
  }, [
    N("Normal A-a gradient", "step", {
      s: "Hypoventilation หรือ FiO2 ต่ำ",
      keys: ["PaCO2 > 45 mmHg ใน hypoventilation (ถ้าเป็นจาก FiO2 ต่ำ เช่นที่สูง PaCO2 จะต่ำจาก hyperventilation)", "Lung field ปกติ", "Hypoventilation แก้ได้ด้วยการช่วย ventilation"]
    }, [
      N("Drug-induced hypoventilation (renally cleared opioids and sedatives)", "nephro", {
        s: "Morphine (M6G สะสม), codeine, tramadol, gabapentin, pregabalin, benzodiazepine",
        why: "Active metabolite สะสมเมื่อ GFR ลด เป็น iatrogenic cause ที่ examiner ชอบให้บอกเรื่องการปรับยา",
        keys: ["RR < 10, pinpoint pupils (เฉพาะ opioid, ไม่พบใน gabapentinoid หรือ benzodiazepine)", "เพิ่งเริ่มยาหรือเพิ่ม dose หรือ GFR ลดลงฉับพลัน", "ซึมก่อนหายใจช้า, myoclonus ใน gabapentinoid", "Opioid ตอบสนอง naloxone (อาจต้องให้ซ้ำหรือ infusion เพราะ M6G half-life ยาวใน CKD), gabapentinoid ไม่มี antidote แต่ขจัดได้ด้วย HD"],
        ix: ["ABG, drug review"],
        link: "ams"
      }),
      N("Neuromuscular respiratory failure", "adj", {
        s: "Myasthenia crisis, GBS, severe hypokalemia หรือ hypophosphatemia",
        keys: ["Paradoxical breathing, single-breath count < 20", "FVC < 20 mL/kg, MIP อ่อนกว่า −30 cmH2O, MEP < 40 cmH2O (20/30/40 rule) ให้พิจารณา intubate ร่วมกับ clinical", "K < 2.0 mmol/L หรือ PO4 < 1.0 mg/dL ทำกล้ามเนื้อหายใจอ่อนแรง", "Ptosis, diplopia ที่เป็นมากตอนเย็นใน MG"],
        ix: ["FVC, NIF, K, PO4, Mg, anti-AChR"],
        link: "weakness"
      }),
      N("Obesity hypoventilation and central causes", "adj", {
        s: "BMI ≥ 30 kg/m² กับ awake daytime PaCO2 > 45 mmHg หลังตัดสาเหตุอื่นของ hypoventilation",
        keys: ["Serum HCO3 ≥ 27 mmol/L จาก metabolic compensation (HCO3 < 27 ทำให้ OHS น่าจะเป็นน้อยมาก แต่ใช้ไม่ได้ถ้ามี metabolic acidosis จาก CKD)", "OSA ร่วมราว 90%", "Polycythemia และ cor pulmonale", "Resistant hypertension"],
        ix: ["ABG ตอนตื่น, polysomnography"],
        std: "ATS 2019 OHS guideline",
        link: "obesity"
      })
    ]),
    N("High A-a gradient", "step", {
      s: "V/Q mismatch, shunt หรือ diffusion",
      keys: ["Lung abnormal บน imaging", "Shunt ไม่ตอบสนองต่อ O2", "Desaturation เมื่อออกแรงใน diffusion defect"]
    }, [
      N("Pulmonary edema (cardiogenic and volume)", "nephro", {
        s: "Volume overload, flash pulmonary edema จาก bilateral RAS, missed dialysis",
        keys: ["Orthopnea, crepitation, B-lines บน lung US", "Hypertension ขณะมี edema ชี้ volume หรือ RAS", "IDWG สูง หรือขาดฟอก", "ดีขึ้นเร็วหลัง UF"],
        ix: ["CXR, BNP (แปลผลระวังใน CKD), lung US, echo"],
        link: "dyspnea"
      }),
      N("Diffuse alveolar hemorrhage", "nephro", {
        s: "ANCA vasculitis, anti-GBM, SLE, APS",
        why: "Pulmonary-renal syndrome เป็น emergency ที่ต้องรู้ทั้ง lung และ kidney",
        keys: ["Hb ลดโดยไม่มี external bleeding", "Hemoptysis ไม่มีได้ราวหนึ่งในสาม", "Bilateral ground glass", "BAL เลือดเข้มขึ้นเรื่อย ๆ ใน sequential aliquot, hemosiderin-laden macrophage > 20%", "DLCO สูงขึ้น (เลือดใน alveoli จับ CO)"],
        ix: ["ANCA, anti-GBM, ANA, dsDNA, C3, C4", "Bronchoscopy BAL"],
        link: "hemoptysis"
      }),
      N("Pneumonia and ARDS", "adj", {
        s: "Bacterial, viral, PJP ใน KT และ steroid",
        keys: ["PJP: hypoxemia เกินภาพ CXR, LDH สูง, desaturate เมื่อออกแรง", "PJP พบมากช่วง 1-6 เดือนหลัง KT ถ้าไม่ได้ prophylaxis, และเกิดช้าได้หลังหยุด prophylaxis, หลังรักษา rejection หรือร่วมกับ CMV", "ARDS: PaO2/FiO2 ≤ 300 mmHg กับ bilateral opacity ภายใน 1 สัปดาห์หลัง insult และไม่อธิบายได้ทั้งหมดด้วย heart failure หรือ volume overload", "Fever, productive sputum, consolidation ใน bacterial"],
        ix: ["Sputum, BAL PCR PJP, beta-D-glucan, CT chest"],
        std: "Berlin ARDS definition 2012 และ global definition 2024",
        link: "kt-fever"
      }),
      N("Pulmonary embolism", "nephro", {
        s: "Hypoxemia กับ clear CXR",
        keys: ["Tachycardia, pleuritic pain", "Nephrotic syndrome โดยเฉพาะ MN", "Wells score ประเมิน pretest probability, PERC ใช้ rule out ได้เฉพาะ low pretest probability และอายุ < 50 ปี", "RV strain"],
        ix: ["CTPA หรือ V/Q"],
        std: "ESC 2019 PE guideline",
        link: "thrombosis"
      }),
      N("Interstitial lung disease", "adj", {
        s: "SSc-ILD, myositis (anti-synthetase, anti-MDA5), sarcoid, drug (nitrofurantoin, amiodarone, mTORi)",
        keys: ["Velcro crackles, clubbing", "Desaturation เมื่อเดิน 6 นาที", "DLCO ลดมากกว่า FVC", "Sirolimus หรือ everolimus pneumonitis: ไอแห้ง ไข้ ส่วนใหญ่ในปีแรก มักดีขึ้นเมื่อหยุดหรือลดยา (ต้องตัด infection ก่อน)", "Anti-MDA5: rapidly progressive ILD กับ skin ulcer"],
        ix: ["HRCT, PFT with DLCO, myositis panel"],
        link: "cough"
      }),
      N("Intradialytic hypoxemia", "nephro", {
        s: "PaO2 ลด 5-30 mmHg ใน 15-60 นาทีแรกของ HD",
        keys: ["Leukocyte sequestration ในปอดกับ membrane ที่ bioincompatible", "Hypoventilation จาก CO2 loss ทางตัวกรอง (เด่นใน acetate dialysate) หรือจาก alkalemia ที่ลด ventilatory drive (bicarbonate dialysate)", "มักมีอาการเฉพาะคนที่มีโรคปอดหรือโรคหัวใจเดิม", "หายหลังจบฟอก"],
        ix: ["SpO2 ระหว่างฟอก, ABG"],
        link: "hd-idh"
      })
    ]),
    N("Right-to-left shunt and vascular", "step", {
      s: "Hypoxemia ที่ดีขึ้นน้อยด้วย 100% O2 และ lung parenchyma ปกติ (HPS ยังตอบสนองต่อ O2 ได้บางส่วน)",
      keys: ["Platypnea-orthodeoxia", "Agitated saline bubble ปรากฏฝั่งซ้าย", "Clubbing"]
    }, [
      N("Hepatopulmonary syndrome", "adj", {
        s: "Intrapulmonary vascular dilatation ใน cirrhosis",
        keys: ["Platypnea-orthodeoxia (PaO2 ลด > 4 mmHg หรือลด > 5% จากค่าท่านอนเมื่อลุกนั่ง)", "Bubble ปรากฏฝั่งซ้ายหลัง 3-6 cardiac cycles (intracardiac shunt เห็นภายใน 3)", "Spider nevi, clubbing", "A-a gradient ≥ 15 mmHg (≥ 20 ถ้าอายุ > 64 ปี) ร่วมกับ liver disease และ intrapulmonary vascular dilatation"],
        ix: ["Contrast echo, ABG ท่านั่งและนอน"],
        std: "ERS/EASL 2004 and ILTS 2016 criteria",
        link: "jaundice"
      }),
      N("Intracardiac shunt and Eisenmenger", "adj", {
        s: "VSD, ASD, PDA ที่ reverse shunt",
        why: "Cyanotic congenital heart disease ทำ cyanotic nephropathy: glomerulomegaly, FSGS, proteinuria, hyperuricemia",
        keys: ["Cyanosis กับ clubbing ตั้งแต่เด็ก", "Secondary erythrocytosis (Hct > 65% เสี่ยง hyperviscosity)", "Loud P2, RV heave", "Differential cyanosis (เท้าเขียวกว่ามือ) ใน PDA reversal", "Proteinuria และ hyperuricemia"],
        ix: ["Echo, cardiac MRI", "UPCR"],
        link: "clubbing"
      }),
      N("Pulmonary arteriovenous malformation", "adj", {
        s: "HHT (ENG, ACVRL1), post-Glenn",
        keys: ["Epistaxis ซ้ำ, mucocutaneous telangiectasia", "Paradoxical embolism: stroke, brain abscess", "Bruit ที่ปอด", "Curaçao criteria ≥ 3 ข้อ"],
        ix: ["Contrast echo, CT chest angiography"],
        std: "Second International HHT Guidelines 2020"
      })
    ]),
    N("Abnormal hemoglobin", "step", {
      s: "PaO2 ปกติแต่ SpO2 ต่ำ (methemoglobin) หรือ SpO2 ปกติแต่เนื้อเยื่อขาด O2 (CO)",
      keys: ["Saturation gap", "เลือดสีช็อกโกแลตใน methemoglobinemia", "Cyanosis จาก MetHb ไม่ดีขึ้นด้วย O2 (ต่างจาก CO ที่รักษาด้วย 100% O2)"]
    }, [
      N("Methemoglobinemia", "nephro", {
        s: "Dapsone, primaquine, rasburicase, nitrite, benzocaine, lidocaine, metoclopramide",
        why: "Dapsone ใช้เป็น PJP prophylaxis ใน KT ที่แพ้ sulfa และยิ่งสะสมใน CKD, rasburicase ใน G6PD deficiency ทำทั้ง hemolysis และ methemoglobinemia",
        keys: ["SpO2 ติดที่ราว 85% ไม่ว่า PaO2 เท่าไร", "Cyanosis กับ PaO2 ปกติ", "MetHb > 10-15% เริ่มเห็น cyanosis, > 20-30% มีอาการ, > 50% arrhythmia ชัก coma, > 70% ถึงตายได้ (ซีดหรือโรคหัวใจมีอาการที่ระดับต่ำกว่า)", "Hemolysis ร่วมใน G6PD deficiency", "ห้ามให้ methylene blue ใน G6PD deficiency (ใช้ ascorbic acid หรือ exchange transfusion)"],
        ix: ["Co-oximetry MetHb %", "G6PD level ก่อน methylene blue"],
        link: "cytopenia"
      }),
      N("Carbon monoxide toxicity", "adj", {
        s: "Smoke, เตาถ่าน, เครื่องยนต์ในที่ปิด",
        keys: ["SpO2 ปกติปลอม", "Headache, nausea ในคนหลายคนในบ้านเดียวกัน", "COHb > 3-4% ในคนไม่สูบบุหรี่ หรือ > 10% ในคนสูบบุหรี่ (ระดับไม่สัมพันธ์กับความรุนแรง)", "Rhabdomyolysis และ AKI ได้", "Delayed neuropsychiatric sequelae 2-40 วัน"],
        ix: ["COHb by co-oximetry, CK, troponin"]
      }),
      N("Sulfhemoglobinemia and low-affinity hemoglobin", "adj", {
        s: "Sulfonamide, metoclopramide, phenazopyridine, Hb variants",
        keys: ["ไม่ตอบสนอง methylene blue", "ต้องรอ RBC turnover", "Familial cyanosis ตั้งแต่เกิดใน Hb variant"],
        ix: ["Co-oximetry spectral, Hb electrophoresis"]
      })
    ]),
    N("Peripheral cyanosis", "step", {
      s: "Central SaO2 ปกติ แต่ O2 extraction ปลายมือเท้าสูง",
      keys: ["ลิ้นไม่เขียว", "ปลายมือเย็น", "ดีขึ้นเมื่ออุ่นหรือนวด"]
    }, [
      N("Low cardiac output and shock", "adj", {
        s: "Vasoconstriction จาก low output",
        keys: ["Cold, mottled skin", "Capillary refill ช้า", "Lactate สูง"],
        ix: ["Echo, lactate"],
        link: "shock"
      }),
      N("Cold exposure, Raynaud and cryoglobulin", "nephro", {
        s: "Vasospasm หรือ cold agglutinin",
        keys: ["Triphasic color change ใน Raynaud", "Purpura ขาและ low C4 ใน cryoglobulinemia", "Acrocyanosis ที่ไม่ปวด", "Cold agglutinin: hemolysis เมื่อเย็น"],
        ix: ["Cryoglobulin (เก็บที่ 37 °C), cold agglutinin titer"],
        link: "raynaud"
      }),
      N("Arterial or venous obstruction", "adj", {
        s: "Embolism, DVT แบบ phlegmasia, central vein stenosis ใน HD",
        keys: ["Cyanosis ข้างเดียว", "Pulse หายใน arterial", "แขนบวมเขียวข้างที่มี AVF กับ central vein stenosis"],
        ix: ["Doppler, venography"],
        link: "bluetoe"
      })
    ])
  ])
};

/* ===================== HEART MURMUR ===================== */
TREES.murmur = {
  must: [
    "Murmur ใหม่หรือเดิม, มีไข้ร่วมหรือไม่",
    "Rheumatic fever ในวัยเด็ก, IV drug use",
    "HD catheter, pacemaker หรือ ICD lead, prosthetic valve",
    "Syncope, angina, dyspnea เมื่อออกแรง",
    "AV fistula: ตำแหน่ง, flow, thrill",
    "Anemia, pregnancy, thyrotoxicosis",
    "Marfan habitus, family history sudden death",
    "Carcinoid flushing และท้องเสีย"
  ],
  tree: N("Heart murmur", "root", {
    s: "บอก timing (systolic vs diastolic), ตำแหน่ง, radiation, dynamic maneuver แล้วยืนยันด้วย echo, murmur diastolic ผิดปกติเสมอ",
    why: "Valve calcification เร่งขึ้นใน CKD และ dialysis, IE เป็นสาเหตุ GN และ AKI, murmur ใน long case มักเชื่อมกับ GN จาก IE หรือ high-output state จาก AVF",
    keys: ["Systolic ejection vs holosystolic", "Diastolic murmur ผิดปกติทุกกรณี", "Valsalva: HOCM ดังขึ้น, MVP click และ murmur มาเร็วขึ้นและยาวขึ้น, murmur อื่นส่วนใหญ่เบาลง", "Inspiration: right-sided ดังขึ้น (Carvallo)", "Thrill = grade ≥ 4"],
    ix: ["TTE", "TEE ใน IE หรือ prosthetic valve", "ECG, CXR"],
    std: "ACC/AHA 2020 valvular heart disease guideline, ESC/EACTS 2025 valvular guideline"
  }, [
    N("Systolic ejection murmur", "step", {
      s: "Crescendo-decrescendo, เริ่มหลัง S1",
      keys: ["Right upper sternal border", "Radiation ไป carotid", "Flow murmur ไม่มี symptom และ S2 ปกติ"]
    }, [
      N("Calcific aortic stenosis", "nephro", {
        s: "Progression เร็วกว่าคนทั่วไปใน dialysis และ CKD-MBD",
        why: "Ca x PO4 สูงและ hyperparathyroidism เร่ง valve calcification, เป็นเหตุ IDH, syncope และ angina ใน HD",
        keys: ["Slow rising pulse (pulsus parvus et tardus)", "S2 เบาหรือ single, murmur peak ช้า = severe", "Triad: angina, syncope, HF", "Severe: Vmax ≥ 4 m/s, mean gradient ≥ 40 mmHg, AVA < 1.0 cm²", "Heyde syndrome: AS กับ GI angiodysplasia bleeding"],
        ix: ["Echo, CT calcium score ถ้า low-flow low-gradient"],
        std: "ACC/AHA 2020 valvular guideline",
        link: "syncope"
      }),
      N("Hypertrophic obstructive cardiomyopathy", "adj", {
        s: "Dynamic LVOT obstruction",
        keys: ["ดังขึ้นเมื่อ Valsalva หรือยืน, เบาลงเมื่อ squat", "Bisferiens pulse", "Family history sudden death", "Septal ≥ 15 mm", "แยกจาก Fabry cardiomyopathy (LVH กับ proteinuria และ angiokeratoma)"],
        ix: ["Echo, cardiac MRI, alpha-galactosidase A activity ในชาย (หญิง enzyme ปกติได้ ต้องตรวจ GLA gene)"],
        std: "ESC 2023 cardiomyopathy guideline",
        link: "stroke"
      }),
      N("High-output flow murmur", "nephro", {
        s: "Anemia, high-flow AV fistula, pregnancy, thyrotoxicosis, fever",
        keys: ["Grade ≤ 2/6, early peaking, S2 ปกติ", "Wide pulse pressure, warm extremities", "Nicoladoni-Branham sign: HR ลดเมื่อกด AVF", "Hb < 8 g/dL"],
        ix: ["Hb, TSH, access flow (Qa)"],
        link: "cytopenia"
      }),
      N("Pulmonary stenosis and carcinoid heart disease", "adj", {
        s: "Congenital PS หรือ carcinoid ที่ทำ TR และ PS",
        keys: ["Left upper sternal border, ดังขึ้นเมื่อหายใจเข้า", "Flushing, diarrhea, liver metastasis ใน carcinoid", "Urine 5-HIAA สูง"],
        ix: ["Echo, urine 5-HIAA"],
        link: "diarrhea"
      })
    ]),
    N("Holosystolic murmur", "step", {
      s: "เริ่มพร้อม S1 ถึง S2",
      keys: ["Apex ไป axilla (MR)", "Left lower sternal border ดังขึ้นเมื่อหายใจเข้า (TR)", "Parasternal พร้อม thrill (VSD)"]
    }, [
      N("Mitral regurgitation", "nephro", {
        s: "Primary (prolapse, rheumatic, IE) หรือ functional จาก LV dilatation และ volume overload",
        keys: ["Functional MR เบาลงเมื่อ UF ลด volume", "Mitral annular calcification พบบ่อยใน dialysis", "S3 ใน severe MR", "Acute MR: pulmonary edema ฉับพลัน"],
        ix: ["Echo: EROA ≥ 0.4 cm² = severe primary"],
        std: "ACC/AHA 2020 valvular guideline",
        link: "dyspnea"
      }),
      N("Tricuspid regurgitation", "nephro", {
        s: "Lead-related (pacemaker, HD catheter), pulmonary hypertension, IE ใน IVDU และ catheter",
        keys: ["Giant cv wave ใน JVP, pulsatile liver", "Peripheral edema และ ascites", "Catheter-related right-sided IE: septic pulmonary emboli", "Pulmonary HT จาก AVF, volume, LV disease"],
        ix: ["Echo, RVSP"],
        link: "edema"
      }),
      N("Ventricular septal defect", "adj", {
        s: "Congenital หรือ post-MI rupture",
        keys: ["Harsh, thrill ที่ LLSB", "Post-MI 3-5 วัน กับ shock", "Small VSD ดังมาก"],
        ix: ["Echo"]
      })
    ]),
    N("Diastolic murmur", "step", {
      s: "ผิดปกติเสมอ ต้อง echo",
      keys: ["Early decrescendo ที่ LSB (AR)", "Mid-diastolic rumble ที่ apex (MS)", "Opening snap"]
    }, [
      N("Aortic regurgitation", "adj", {
        s: "Bicuspid valve, aortitis (Takayasu, GCA, syphilis), IE, Marfan, ankylosing spondylitis",
        keys: ["Wide pulse pressure, collapsing pulse, de Musset", "Austin Flint murmur ใน severe", "Takayasu: young woman, pulse deficit, arm SBP ต่างกัน ≥ 20 mmHg (ACR/EULAR 2022, เกณฑ์เดิม ACR 1990 ใช้ > 10), renovascular HT", "Acute AR จาก IE หรือ dissection: pulmonary edema และ shock"],
        ix: ["Echo, CT aorta, syphilis serology, ESR"],
        std: "ACR/EULAR 2022 Takayasu classification",
        link: "htn-young"
      }),
      N("Mitral stenosis", "adj", {
        s: "Rheumatic heart disease, severe MAC ใน dialysis",
        keys: ["Opening snap, loud S1", "AF กับ embolic stroke", "Hemoptysis และ pulmonary edema ในตั้งครรภ์", "MAC-related MS ในผู้สูงอายุ dialysis"],
        ix: ["Echo: MVA ≤ 1.5 cm² = severe"],
        link: "hemoptysis"
      })
    ]),
    N("Murmur with fever", "step", {
      s: "IE ต้องคิดก่อนเสมอ",
      keys: ["Murmur ใหม่", "Embolic phenomena", "Blood culture positive"]
    }, [
      N("Infective endocarditis", "nephro", {
        s: "HD catheter, prosthetic valve, IVDU, rheumatic valve",
        why: "IE ทำ kidney injury หลายกลไก: immune complex GN (low C3), septic emboli infarct, AIN จาก antibiotic, vancomycin หรือ aminoglycoside toxicity",
        keys: ["S. aureus บ่อยสุดทั้งโดยรวมและใน HD (catheter), viridans streptococci ใน community-acquired native valve, Enterococcus ในผู้สูงอายุและ healthcare-associated", "Janeway lesion, Osler node, splinter hemorrhage, Roth spot", "Splenomegaly, clubbing ใน subacute", "IE-associated GN: hematuria, RBC cast, C3 ต่ำราวครึ่งหนึ่ง (C3 ปกติไม่ตัดออก), ANCA positive ได้ราวหนึ่งในสี่ (PR3 หรือ MPO) โดยไม่ใช่ AAV จึงต้อง exclude IE ก่อนให้ immunosuppression", "Renal infarct (flank pain, LDH สูง)"],
        ix: ["Blood culture 3 sets ก่อน antibiotic", "TEE", "C3, C4, UA, ANCA"],
        std: "2023 Duke-ISCVID IE criteria, ESC 2023 endocarditis guideline",
        link: "hypocomp"
      }),
      N("Rheumatic fever and Libman-Sacks", "adj", {
        s: "Post-streptococcal carditis หรือ SLE-APS valvulopathy",
        keys: ["Jones criteria: carditis, arthritis, chorea, erythema marginatum, nodule", "Libman-Sacks: sterile vegetation ใน SLE กับ aPL", "Embolic stroke ใน APS"],
        ix: ["ASO, echo, aPL"],
        std: "AHA 2015 revised Jones criteria",
        link: "thrombosis"
      })
    ])
  ])
};

/* ===================== DIGITAL CLUBBING ===================== */
TREES.clubbing = {
  must: [
    "เริ่มเมื่อไร, เป็นสองข้างหรือข้างเดียว",
    "Smoking, น้ำหนักลด, ไอเรื้อรัง",
    "Cyanosis, murmur, ไข้",
    "ท้องเสียเรื้อรัง, liver disease",
    "Thyroid eye disease",
    "AV fistula หรือ aneurysm ข้างเดียวกัน",
    "ปวดข้อและกระดูกยาว (HPOA)"
  ],
  tree: N("Digital clubbing", "root", {
    s: "ยืนยันด้วย Lovibond angle > 180°, Schamroth window หาย, phalangeal depth ratio > 1 แล้วแบ่งตามระบบ",
    why: "Clubbing เป็น clue ไปหา lung cancer (paraneoplastic MN), IE (GN), cyanotic heart disease (FSGS) และ IBD (IgAN, AA amyloid)",
    keys: ["Bilateral vs unilateral", "Acquired ใหม่ vs ตั้งแต่เด็ก", "HPOA: periostitis กับ arthralgia", "Cyanosis ร่วม"],
    ix: ["CXR หรือ CT chest", "Echo", "LFT, stool calprotectin"],
    std: "Clinical: Lovibond angle, Schamroth sign, phalangeal depth ratio (DPD/IPD > 1)"
  }, [
    N("Pulmonary", "step", {
      s: "สาเหตุบ่อยที่สุด",
      keys: ["Smoking", "Chronic sputum", "Crackles"]
    }, [
      N("Lung cancer and mesothelioma", "nephro", {
        s: "Non-small cell บ่อยสุด",
        why: "Lung cancer เป็น solid tumor ที่สัมพันธ์กับ secondary MN มากที่สุด, small cell ทำ SIADH, squamous ทำ PTHrP hypercalcemia",
        keys: ["Clubbing ใหม่ในคนสูบบุหรี่อายุ > 50", "HPOA: ปวดข้อมือข้อเท้า periostitis", "MN ทุกรายตรวจ cancer screening ตามอายุไม่ว่า PLA2R เป็นอย่างไร, ค้นละเอียดขึ้นถ้า PLA2R negative, THSD7A หรือ NELL1 positive, IgG1/IgG2 dominant, อายุมาก สูบบุหรี่ หรือน้ำหนักลด", "Hyponatremia, hypercalcemia", "Hemoptysis, น้ำหนักลด"],
        ix: ["CT chest, bronchoscopy", "Anti-PLA2R, kidney biopsy IgG subclass"],
        link: "cough"
      }),
      N("Bronchiectasis, lung abscess and empyema", "nephro", {
        s: "Chronic suppurative lung disease",
        why: "Chronic suppuration ทำ AA amyloidosis และ nephrotic syndrome",
        keys: ["Copious purulent sputum ทุกวัน", "Coarse crackles", "Nephrotic syndrome กับ chronic infection ชี้ AA amyloid", "CF ใน young adult กับ pancreatic insufficiency"],
        ix: ["HRCT, sputum culture, SAA"],
        link: "nephrotic"
      }),
      N("Interstitial lung disease", "adj", {
        s: "IPF, asbestosis, SSc-ILD (clubbing น้อยใน SSc)",
        keys: ["Velcro crackles ที่ฐานปอด", "Restrictive PFT, DLCO ลด", "UIP pattern บน HRCT"],
        ix: ["HRCT, PFT"],
        link: "cyanosis"
      })
    ]),
    N("Cardiac", "step", {
      s: "Cyanotic heart disease และ IE",
      keys: ["Cyanosis", "Murmur", "Fever"]
    }, [
      N("Cyanotic congenital heart disease", "nephro", {
        s: "Tetralogy, Eisenmenger, transposition",
        why: "Cyanotic nephropathy: glomerulomegaly, mesangial expansion, FSGS lesion, proteinuria และ hyperuricemia",
        keys: ["Clubbing กับ cyanosis ตั้งแต่เด็ก", "Erythrocytosis และ hyperviscosity", "Proteinuria สัมพันธ์กับระยะเวลาและ Hct", "Contrast nephropathy risk สูงหลัง angiography"],
        ix: ["Echo, UPCR, uric acid"],
        link: "proteinuria"
      }),
      N("Subacute infective endocarditis", "nephro", {
        s: "Strep viridans, Bartonella, culture-negative",
        keys: ["Clubbing หลังเป็นนานหลายสัปดาห์", "Splenomegaly, anemia, low C3", "Bartonella IE: culture-negative, ANCA (มัก PR3) positive ได้, necrotizing crescentic GN ที่เลียนแบบ AAV", "Embolic phenomena"],
        ix: ["Blood culture, Bartonella serology, TEE"],
        std: "2023 Duke-ISCVID criteria",
        link: "murmur"
      })
    ]),
    N("Gastrointestinal and hepatic", "step", {
      s: "IBD, cirrhosis, celiac",
      keys: ["Chronic diarrhea", "Stigmata of chronic liver disease"]
    }, [
      N("Inflammatory bowel disease", "nephro", {
        s: "Crohn มากกว่า UC",
        why: "IBD สัมพันธ์กับ IgAN, AA amyloid, oxalate stone, TIN จาก 5-ASA",
        keys: ["Bloody diarrhea หรือ perianal fistula", "Enteric hyperoxaluria และ calcium oxalate stone ใน ileal disease", "Mesalazine TIN: Cr ขึ้นช้า ๆ ส่วนใหญ่ในปีแรก แต่เกิดได้ทุกช่วงของการใช้ยา", "Episcleritis, erythema nodosum, arthritis"],
        ix: ["Calprotectin, colonoscopy", "Urine oxalate 24 h, Cr ทุก 3-6 เดือนใน 5-ASA"],
        link: "diarrhea"
      }),
      N("Cirrhosis and hepatopulmonary syndrome", "adj", {
        s: "Chronic liver disease, PBC",
        keys: ["Spider nevi, palmar erythema", "Platypnea-orthodeoxia ใน HPS", "HBV, HCV: GN ร่วม (MN, MPGN, cryo)"],
        ix: ["LFT, contrast echo"],
        link: "jaundice"
      }),
      N("Celiac disease", "adj", {
        s: "Malabsorption",
        keys: ["Iron deficiency, osteomalacia", "IgAN ร่วมได้", "Anti-tTG IgA"],
        ix: ["Anti-tTG IgA, total IgA, duodenal biopsy"]
      })
    ]),
    N("Other and unilateral", "step", {
      s: "Endocrine, primary HPOA และ vascular",
      keys: ["Unilateral clubbing ชี้ vascular cause"]
    }, [
      N("Thyroid acropachy", "adj", {
        s: "Graves disease หลังรักษา",
        keys: ["Graves ophthalmopathy และ pretibial myxedema (triad)", "TRAb สูงมาก", "Periosteal new bone ที่มือ"],
        ix: ["TRAb, TSH, hand X-ray"],
        link: "goiter"
      }),
      N("Primary hypertrophic osteoarthropathy", "adj", {
        s: "Pachydermoperiostosis (HPGD, SLCO2A1)",
        keys: ["Young male, familial", "Thick facial skin, furrowing", "Periostitis ไม่มี underlying disease"],
        ix: ["X-ray long bones, urine PGE2"]
      }),
      N("Unilateral vascular clubbing", "nephro", {
        s: "AV fistula, subclavian aneurysm, Pancoast tumor",
        keys: ["Clubbing เฉพาะแขนที่มี AVF โดยเฉพาะ high flow หรือ steal", "Horner syndrome กับ Pancoast", "ดีขึ้นได้หลังแก้ไขหรือ ligate fistula"],
        ix: ["Access Doppler, CT apex"],
        link: "hd-access"
      })
    ])
  ])
};

/* ===================== DYSPHAGIA ===================== */
TREES.dysphagia = {
  must: [
    "Oropharyngeal (เริ่มกลืนลำบาก, สำลัก, ไอขณะกลืน) หรือ esophageal (ติดที่อก)",
    "Solid อย่างเดียว (mechanical) หรือ solid และ liquid ตั้งแต่แรก (motility)",
    "Progressive หรือ intermittent, น้ำหนักลด",
    "Raynaud, sclerodactyly, heartburn",
    "เจ็บเวลากลืน (odynophagia), immunosuppression",
    "ยาเม็ดที่กินโดยไม่ดื่มน้ำ: doxycycline, bisphosphonate, KCl, iron, NSAID",
    "อ่อนแรงกล้ามเนื้อ, ptosis, เสียงขึ้นจมูก"
  ],
  tree: N("Dysphagia and odynophagia", "root", {
    s: "แยก oropharyngeal กับ esophageal ก่อน แล้วแยก mechanical กับ motility ด้วยชนิดอาหารและ time course",
    why: "Systemic sclerosis (SRC), myositis, infectious esophagitis ใน KT, pill esophagitis จาก KCl และ phosphate binder เชื่อมกับไตโดยตรง, น้ำหนักลดทำ PEW",
    keys: ["Solid อย่างเดียวแบบ progressive บ่งไปทาง mechanical obstruction (stricture, cancer)", "Solid และ liquid ตั้งแต่แรกบ่งไปทาง motility disorder (achalasia, SSc)", "Nasal regurgitation, aspiration บ่งไปทาง oropharyngeal", "Odynophagia บ่งไปทาง infection, pill, ulcer (cancer ระยะลุกลามก็เจ็บได้)"],
    ix: ["Upper endoscopy with biopsy", "Barium swallow", "High-resolution manometry", "Videofluoroscopic swallow ใน oropharyngeal"],
    std: "Canadian Association of Gastroenterology 2018 guideline on uninvestigated esophageal dysphagia, Chicago Classification v4.0 (2021)"
  }, [
    N("Oropharyngeal", "step", {
      s: "กลืนไม่ลง, สำลัก, เสียงเปลี่ยน",
      keys: ["Neurological deficit", "Muscle weakness", "Aspiration pneumonia ซ้ำ"]
    }, [
      N("Stroke and neurodegenerative disease", "adj", {
        s: "Stroke, Parkinson, ALS, MS",
        keys: ["Dysarthria กับ focal deficit", "Fasciculation และ UMN และ LMN signs ใน ALS", "Bradykinesia, rigidity ใน Parkinson", "Aspiration ซ้ำ"],
        ix: ["MRI brain, EMG"],
        link: "stroke"
      }),
      N("Inflammatory myopathy", "nephro", {
        s: "Dermatomyositis, polymyositis, inclusion body myositis",
        why: "Myositis ทำ rhabdomyolysis, AKI, และ anti-synthetase อาจมี GN ร่วม, IBM เป็นสาเหตุ dysphagia ในผู้สูงอายุ",
        keys: ["Proximal weakness, CK สูง", "Heliotrope rash, Gottron papules", "IBM: finger flexor และ quadriceps weakness, อายุ > 50", "Malignancy-associated DM (anti-TIF1γ, anti-NXP2)"],
        ix: ["CK, myositis antibody panel, EMG, MRI muscle, muscle biopsy"],
        std: "EULAR/ACR 2017 IIM classification",
        link: "weakness"
      }),
      N("Myasthenia gravis", "adj", {
        s: "Fatigable weakness",
        keys: ["Ptosis, diplopia มากขึ้นตอนเย็น", "Nasal speech, choking", "Anti-AChR หรือ anti-MuSK", "ยาที่ทำให้แย่ลง: aminoglycoside, fluoroquinolone, Mg IV"],
        ix: ["Anti-AChR, repetitive nerve stimulation, CT thymus"],
        link: "weakness"
      }),
      N("Zenker diverticulum", "adj", {
        s: "ผู้สูงอายุ, regurgitate อาหารไม่ย่อย",
        keys: ["Halitosis", "Gurgling ที่คอ", "Regurgitation หลังกินหลายชั่วโมง"],
        ix: ["Barium swallow"]
      })
    ]),
    N("Esophageal mechanical", "step", {
      s: "Solid มากกว่า liquid",
      keys: ["Progressive", "Weight loss", "Food impaction"]
    }, [
      N("Esophageal cancer", "adj", {
        s: "Squamous (smoking, alcohol) หรือ adenocarcinoma (Barrett)",
        keys: ["Progressive solid dysphagia ภายในไม่กี่สัปดาห์ถึงไม่กี่เดือน", "Weight loss เกิน 10%", "Hoarseness จาก recurrent laryngeal nerve", "Hypercalcemia (PTHrP) ใน squamous"],
        ix: ["Endoscopy with biopsy, CT staging"],
        link: "weightloss"
      }),
      N("Peptic stricture and Schatzki ring", "adj", {
        s: "Long-standing GERD",
        keys: ["Heartburn หลายปี", "Intermittent solid dysphagia ใน ring (steakhouse syndrome)", "มักไม่มี weight loss (ถ้ามีต้อง exclude cancer)"],
        ix: ["Endoscopy"]
      }),
      N("Eosinophilic esophagitis", "adj", {
        s: "Young male atopic",
        keys: ["Food impaction ซ้ำ", "Trachealization (rings) และ furrows", "≥ 15 eosinophils/hpf", "Asthma, allergic rhinitis"],
        ix: ["Endoscopy with ≥ 6 biopsies"],
        std: "AGA/JTF 2020 EoE guideline, ACG 2025 EoE guideline",
        link: "eosinophilia"
      }),
      N("Extrinsic compression", "adj", {
        s: "Mediastinal lymphadenopathy, aortic aneurysm, aberrant subclavian, enlarged LA",
        keys: ["Lymphoma, TB, sarcoid lymph node", "Goiter ลงช่องอก", "Dysphagia lusoria"],
        ix: ["CT chest"],
        link: "lymphnode"
      })
    ]),
    N("Esophageal motility", "step", {
      s: "Solid และ liquid ตั้งแต่แรก",
      keys: ["Chest pain", "Regurgitation", "Heartburn"]
    }, [
      N("Systemic sclerosis esophagus", "nephro", {
        s: "Distal hypomotility กับ LES incompetent",
        why: "Esophageal involvement พบเกือบ 90% ของ SSc และเป็น clue ให้คิด scleroderma renal crisis เมื่อ BP ขึ้นและ Cr ขึ้น",
        keys: ["Raynaud, sclerodactyly, digital pitting scar", "Severe GERD และ stricture", "Anti-RNA polymerase III: diffuse skin และ risk SRC สูงสุด", "Prednisolone ≥ 15 mg/วัน ในช่วง 3-6 เดือนก่อนหน้า เพิ่ม risk SRC"],
        ix: ["Manometry: absent contractility, ANA, anti-Scl-70, anti-RNAP III, anti-centromere"],
        std: "ACR/EULAR 2013 SSc classification",
        link: "skinthick"
      }),
      N("Achalasia", "adj", {
        s: "Loss of inhibitory neurons ที่ LES",
        keys: ["Dysphagia ทั้ง solid และ liquid", "Regurgitation อาหารไม่ย่อยตอนนอน", "Bird beak บน barium", "Pseudoachalasia จาก cancer ในคนอายุ > 60 น้ำหนักลดเร็ว", "Chagas disease ในผู้ที่มาจาก Latin America"],
        ix: ["High-resolution manometry (IRP สูง), endoscopy"],
        std: "Chicago Classification v4.0"
      }),
      N("Distal esophageal spasm and hypercontractile", "adj", {
        s: "Chest pain คล้าย angina",
        keys: ["Intermittent chest pain กับ dysphagia", "Corkscrew esophagus", "ต้อง exclude cardiac ischemia ก่อน"],
        ix: ["Manometry, ECG, troponin"],
        link: "chestpain"
      })
    ]),
    N("Odynophagia", "step", {
      s: "เจ็บขณะกลืน",
      keys: ["Immunosuppression", "Pill ingestion", "Radiation"]
    }, [
      N("Infectious esophagitis", "nephro", {
        s: "Candida, CMV, HSV ใน KT และผู้ใช้ steroid",
        why: "CMV disease ใน KT เกิดบ่อยใน 1-6 เดือนแรก โดยเฉพาะ D+/R−, หลัง ATG หรือหลังหยุด prophylaxis",
        keys: ["Oral thrush ร่วมใน Candida (แต่ไม่มีก็ไม่ exclude)", "CMV: ulcer ใหญ่ตื้น linear, ร่วม leukopenia และไข้", "HSV: ulcer เล็กหลายจุด volcano-like", "CMV viremia อาจต่ำหรือ negative ใน tissue-invasive GI disease จึงต้องยืนยันด้วย biopsy"],
        ix: ["Endoscopy with biopsy, CMV PCR blood, immunohistochemistry"],
        std: "Fourth International Consensus Guidelines on CMV in SOT (Kotton, Transplantation 2025)",
        link: "kt-fever"
      }),
      N("Pill esophagitis", "nephro", {
        s: "Doxycycline, bisphosphonate, KCl, ferrous sulfate, NSAID, sevelamer",
        keys: ["เจ็บอกทันทีหลังกินยาโดยไม่ดื่มน้ำหรือนอนทันที", "Ulcer เดี่ยวที่ระดับ aortic arch", "ส่วนใหญ่หายใน 1-2 สัปดาห์เมื่อหยุดยา", "KCl slow release ทำ stricture ได้"],
        ix: ["Endoscopy ถ้าไม่ดีขึ้น"]
      }),
      N("Radiation and caustic injury", "adj", {
        s: "Mediastinal radiation, corrosive ingestion",
        keys: ["Radiation esophagitis 2-3 สัปดาห์หลังเริ่ม", "Stricture ช้าหลังหลายเดือน"],
        ix: ["Endoscopy"]
      })
    ])
  ])
};

/* ===================== CONSTIPATION ===================== */
TREES.constipation = {
  must: [
    "ความถี่ < 3 ครั้งต่อสัปดาห์, เบ่ง, อุจจาระแข็ง, ถ่ายไม่สุด",
    "อาการใหม่ในคนอายุ > 50, เลือดออก, น้ำหนักลด, ซีด (alarm features)",
    "ยา: phosphate binder, K binder, iron, opioid, verapamil, anticholinergic, ondansetron",
    "Fluid restriction, low-fiber diet (low K diet)",
    "PD: drain ช้า, catheter malfunction",
    "Thyroid, Ca, K, glucose",
    "Neurological disease, autonomic neuropathy"
  ],
  tree: N("Constipation", "root", {
    s: "หา alarm features ก่อน แล้วหา secondary cause (drug, metabolic, structural) ก่อนสรุปว่า functional",
    why: "Constipation พบในราวครึ่งของผู้ป่วย dialysis, ทำให้ hyperkalemia (ลด colonic K secretion), PD outflow failure และ enteric peritonitis, ส่วน SPS ที่ใช้รักษา hyperkalemia เสี่ยง colonic necrosis (พบน้อยแต่รุนแรง)",
    keys: ["Alarm: อายุ > 50 อาการใหม่, rectal bleeding, iron deficiency, weight loss, family history CRC", "Drug list โดยเฉพาะ binder", "Metabolic: Ca, K, TSH, glucose", "Defecatory disorder: digital maneuver ช่วย", "ใน PD: constipation ทำ catheter migration และ outflow failure (drain ไม่ออกแต่ infuse ได้, catheter tip อยู่สูงบน X-ray) และเพิ่มความเสี่ยง enteric peritonitis, มักดีขึ้นหลังให้ laxative"],
    ix: ["CBC, Ca, K, TSH, glucose", "Colonoscopy ถ้ามี alarm features", "Anorectal manometry, balloon expulsion test"],
    std: "Rome IV functional constipation criteria (2016), AGA/ACG 2023 chronic idiopathic constipation guideline"
  }, [
    N("Drug-induced", "step", {
      s: "สาเหตุ secondary ที่แก้ได้บ่อยที่สุดใน CKD",
      keys: ["เริ่มหลังยาใหม่", "หลายยาร่วมกัน"]
    }, [
      N("Phosphate binders", "nephro", {
        s: "Calcium carbonate และ acetate, sevelamer, lanthanum, aluminum",
        why: "Binder เป็นยาที่ pill burden สูงที่สุดใน dialysis และมีผลต่อ adherence",
        keys: ["Sevelamer: ท้องผูกบ่อย, ส่วน bowel obstruction, mucosal ulcer และ perforation พบน้อย (sevelamer crystal บน colonic biopsy)", "Lanthanum: chewable, radio-opaque บน X-ray", "Calcium: constipation กับ hypercalcemia", "Iron-based (sucroferric oxyhydroxide) ทำอุจจาระดำ ไม่ใช่ melena", "Aluminum: constipation กับ encephalopathy และ osteomalacia"],
        ix: ["Drug review, abdominal X-ray"],
        link: "hd-mbd"
      }),
      N("Potassium binders", "nephro", {
        s: "Sodium polystyrene sulfonate, calcium polystyrene, patiromer",
        why: "SPS เสี่ยง colonic necrosis (พบน้อยแต่รุนแรง) โดยเฉพาะเมื่อให้ร่วม sorbitol, post-op, ileus หรือ uremia",
        keys: ["SPS: ปวดท้อง, bleeding per rectum, crystal บน biopsy (FDA warning)", "Patiromer: constipation และ hypomagnesemia", "Sodium zirconium cyclosilicate: edema จาก Na load มากกว่า constipation", "ใช้ร่วมกับ opioid เพิ่ม risk"],
        ix: ["Mg level, colonoscopy ถ้ามีเลือดออก"],
        link: "hyperk"
      }),
      N("Opioid, CCB, anticholinergic and iron", "nephro", {
        s: "Opioid-induced constipation, verapamil, tricyclic, oral iron, ondansetron",
        keys: ["Opioid ต่อเนื่อง: ควรได้ laxative ป้องกันทุกราย (ใน CKD เลี่ยง laxative ที่มี Mg หรือ phosphate)", "Verapamil มากกว่า dihydropyridine", "Oral iron ทำทั้ง constipation และอุจจาระดำ", "Anticholinergic: dry mouth, urinary retention"],
        ix: ["Drug review"]
      })
    ]),
    N("Metabolic and endocrine", "step", {
      s: "ลด colonic motility",
      keys: ["Hypercalcemia", "Hypokalemia", "Hypothyroidism"]
    }, [
      N("Hypercalcemia", "nephro", {
        s: "PTH, PTHrP, vitamin D, milk-alkali",
        keys: ["Stones, bones, groans, moans", "Polyuria และ AKI จาก NDI และ vasoconstriction", "Ca > 12 mg/dL มีอาการชัด", "Short QT"],
        ix: ["Ca, albumin, PTH, PTHrP, 25(OH)D, 1,25(OH)2D"],
        link: "hyperca"
      }),
      N("Hypokalemia", "nephro", {
        s: "Ileus จาก K ต่ำ",
        keys: ["K < 3.0 mmol/L", "Weakness, cramps", "U wave", "วงจร: laxative abuse ทำ hypokalemia ที่ทำให้ท้องผูกยิ่งขึ้น"],
        ix: ["K, urine K, Mg"],
        link: "hypok"
      }),
      N("Hypothyroidism", "adj", {
        s: "Slow transit",
        keys: ["Cold intolerance, weight gain, delayed reflex relaxation", "Cr สูงขึ้น reversible และ hyponatremia", "CK สูง", "Nephrotic syndrome ทำ hypothyroid เพราะเสีย TBG และ T4"],
        ix: ["TSH, free T4"],
        link: "goiter"
      }),
      N("Diabetic autonomic neuropathy", "nephro", {
        s: "Diabetic gastroenteropathy",
        keys: ["Alternating diarrhea และ constipation", "Orthostatic hypotension, gastroparesis", "Retinopathy และ DKD ร่วม", "Resting tachycardia"],
        ix: ["HbA1c, autonomic testing"],
        link: "syncope"
      })
    ]),
    N("Structural and obstructive", "step", {
      s: "ต้อง exclude เมื่อมี alarm features",
      keys: ["Alarm features", "Distension", "Absolute constipation"]
    }, [
      N("Colorectal cancer", "adj", {
        s: "Change in bowel habit อายุ > 45-50",
        keys: ["Iron deficiency anemia", "Pencil-thin stool, hematochezia", "Weight loss", "Strep gallolyticus (S. bovis biotype I) bacteremia หรือ IE ต้องทำ colonoscopy หา CRC"],
        ix: ["Colonoscopy, CEA"],
        std: "USPSTF 2021 CRC screening",
        link: "gibleed"
      }),
      N("Colonic pseudo-obstruction and ileus", "nephro", {
        s: "Ogilvie syndrome ใน post-op, electrolyte, opioid",
        keys: ["Massive distension, cecum > 12 cm เสี่ยง perforation", "Hypokalemia, hypomagnesemia, hypercalcemia", "Post-KT surgery และ opioid"],
        ix: ["Abdominal X-ray, CT, electrolytes"]
      }),
      N("Stricture and volvulus", "adj", {
        s: "Diverticular, ischemic, post-radiation stricture",
        keys: ["Ischemic colitis ใน dialysis หลัง IDH", "Sigmoid volvulus ในผู้สูงอายุ ติดเตียง"],
        ix: ["CT abdomen, colonoscopy"],
        link: "abdpain"
      })
    ]),
    N("Neurological and systemic", "step", {
      s: "Enteric neuropathy หรือ myopathy",
      keys: ["Neurological signs", "Systemic disease"]
    }, [
      N("Parkinson, spinal cord and MS", "adj", {
        s: "Autonomic และ neurogenic bowel",
        keys: ["Constipation นำ motor sign หลายปีใน Parkinson", "Neurogenic bladder ร่วม", "Saddle anesthesia ใน cauda equina"],
        ix: ["Neurological exam, MRI spine"],
        link: "luts"
      }),
      N("Systemic sclerosis and amyloidosis", "nephro", {
        s: "Enteric myopathy และ neuropathy",
        keys: ["SSc: pseudo-obstruction, SIBO, wide-mouth diverticula", "AL amyloid: macroglossia, autonomic neuropathy, nephrotic syndrome", "Alternating diarrhea"],
        ix: ["Fat pad biopsy, FLC, SSc antibodies"],
        link: "mspike"
      }),
      N("Lead poisoning and acute porphyria", "nephro", {
        s: "Colicky abdominal pain กับ constipation",
        keys: ["Lead: gout, hypertension, CKD, Burton line, basophilic stippling", "Porphyria: ปวดท้องรุนแรง, hyponatremia, ปัสสาวะสีเข้มเมื่อตั้งทิ้ง, neuropathy", "Porphyria precipitant: ยา, alcohol, fasting, menstruation"],
        ix: ["Blood lead, urine PBG (spot)"],
        link: "abdpain"
      })
    ]),
    N("Functional", "step", {
      s: "หลังตัด secondary cause แล้ว",
      keys: ["Rome IV criteria อย่างน้อย 3 เดือน", "เริ่มอาการ ≥ 6 เดือนก่อน"]
    }, [
      N("Normal and slow transit constipation", "adj", {
        s: "Functional constipation และ IBS-C",
        keys: ["IBS-C: ปวดท้องดีขึ้นหลังถ่าย", "Slow transit: ไม่มีความรู้สึกอยากถ่าย", "Fluid และ fiber restriction ใน dialysis มีส่วน"],
        ix: ["Radiopaque marker transit study"]
      }),
      N("Dyssynergic defecation", "adj", {
        s: "Pelvic floor dysfunction",
        keys: ["เบ่งนาน, ต้องใช้นิ้วช่วย", "Balloon expulsion > 1 นาที", "ตอบสนอง biofeedback"],
        ix: ["Anorectal manometry, balloon expulsion test"]
      })
    ])
  ])
};

/* ===================== HEPATOMEGALY AND SPLENOMEGALY ===================== */
TREES.hsm = {
  must: [
    "ตับโตอย่างเดียว, ม้ามโตอย่างเดียว หรือทั้งสอง",
    "Alcohol, HBV, HCV, fatty liver, DM",
    "ไข้, ไปป่า, กลับจาก endemic area (malaria, melioidosis, leishmania)",
    "น้ำหนักลด, night sweats, lymph node",
    "Family history ซีด (thalassemia), ถุงน้ำในไตและตับ",
    "JVP สูง, ขาบวม, ascites",
    "Arthritis, rash, serositis",
    "Transfusion, chelation"
  ],
  tree: N("Hepatomegaly and splenomegaly", "root", {
    s: "แบ่งเป็น congestive, infective, infiltrative, hematologic-malignant และ inflammatory, ขนาดม้ามช่วยแยก (massive > 8 cm ใต้ชายโครง)",
    why: "HSM เป็น clue ของ IE, HCV-cryoglobulinemia, amyloid, lymphoma, thalassemia และ ADPKD-polycystic liver ที่เชื่อมกับไตโดยตรง",
    keys: ["Massive splenomegaly: CML, myelofibrosis, thalassemia major, visceral leishmaniasis, malaria (hyperreactive)", "Hepatomegaly ร่วมกับ JVP สูง บ่งไปทาง congestive hepatopathy", "Lymphadenopathy ร่วม", "Liver surface nodular vs smooth"],
    ix: ["CBC with smear, LFT, US abdomen with Doppler", "HBV, HCV, HIV", "Echo ถ้า JVP สูง"],
    std: "Etiologic classification: congestive, infective, infiltrative, hematologic-neoplastic, inflammatory"
  }, [
    N("Congestive and portal hypertension", "step", {
      s: "Venous outflow obstruction หรือ portal hypertension",
      keys: ["JVP", "Ascites", "Varices"]
    }, [
      N("Cirrhosis and portal hypertension", "nephro", {
        s: "Splenomegaly กับ small nodular liver",
        why: "Cirrhosis ทำ HRS-AKI, IgA nephropathy (secondary), HBV และ HCV GN",
        keys: ["Thrombocytopenia จาก hypersplenism", "Spider nevi, caput medusae", "Ascites SAAG ≥ 1.1 g/dL", "Secondary IgAN ใน cirrhosis: ส่วนใหญ่เป็น microscopic hematuria หรือ proteinuria เล็กน้อยที่ไม่มีอาการ"],
        ix: ["Fibroscan, US Doppler, endoscopy"],
        std: "Baveno VII 2022",
        link: "abdomen"
      }),
      N("Right heart failure and constrictive pericarditis", "nephro", {
        s: "Congestive hepatopathy",
        keys: ["JVP สูง, Kussmaul sign", "Pericardial knock, pericardial calcification ใน constriction (TB, post-radiation, uremic)", "Pulsatile liver ใน TR", "Ascites: SAAG ≥ 1.1 g/dL ร่วมกับ ascitic fluid protein > 2.5 g/dL (cirrhosis มัก < 2.5)"],
        ix: ["Echo, cardiac MRI, CT pericardium"],
        link: "dyspnea"
      }),
      N("Budd-Chiari and portal vein thrombosis", "nephro", {
        s: "Hepatic vein thrombosis",
        keys: ["Triad: ปวดท้อง, ascites, hepatomegaly", "Underlying: MPN (JAK2), PNH, APS, nephrotic syndrome", "Caudate lobe hypertrophy"],
        ix: ["Doppler US, CT venogram, JAK2, flow cytometry PNH"],
        link: "thrombosis"
      })
    ]),
    N("Infective", "step", {
      s: "ไข้ร่วมกับ HSM",
      keys: ["Travel และ occupational exposure", "Fever pattern"]
    }, [
      N("Malaria", "nephro", {
        s: "P. falciparum, P. knowlesi (ชายแดนไทย)",
        keys: ["ไข้หนาวสั่นเป็นรอบ, กลับจากป่าชายแดน", "Severe malaria: AKI (Cr > 3 mg/dL), jaundice, hypoglycemia, acidosis", "Blackwater fever: hemoglobinuria", "Hyperreactive malarial splenomegaly ใน endemic"],
        ix: ["Thick and thin smear ซ้ำ 3 ครั้ง, rapid antigen"],
        std: "WHO Guidelines for malaria 2023",
        link: "febrileaki"
      }),
      N("Melioidosis", "nephro", {
        s: "Burkholderia pseudomallei, endemic อีสาน",
        why: "DM และ CKD เป็น risk factor หลัก, splenic และ liver abscess แบบ honeycomb เป็นลักษณะเฉพาะ",
        keys: ["ชาวนา, ฤดูฝน, DM, CKD, thalassemia", "Multiple small abscesses ในตับและม้าม (Swiss cheese)", "Pneumonia, parotid abscess (เด็ก), prostatic abscess", "Septic shock กับ bacteremia"],
        ix: ["Culture ทุก site รวม throat และ urine, US abdomen"],
        link: "fever"
      }),
      N("Infective endocarditis", "nephro", {
        s: "Splenomegaly ใน subacute IE",
        keys: ["Murmur, embolic phenomena", "Splenic infarct (LUQ pain) หรือ abscess", "Low C3 GN"],
        ix: ["Blood culture, TEE, CT abdomen"],
        std: "2023 Duke-ISCVID criteria",
        link: "murmur"
      }),
      N("Viral (EBV, CMV, hepatitis, HIV)", "nephro", {
        s: "Mononucleosis, viral hepatitis",
        keys: ["EBV: pharyngitis, lymphadenopathy, atypical lymphocyte, AIN ได้", "CMV ใน KT: leukopenia, hepatitis", "HBV: MN และ polyarteritis nodosa, ส่วน HCV: cryoglobulinemic MPGN", "HIV: HIVAN และ HIV immune complex kidney disease"],
        ix: ["EBV VCA IgM, CMV PCR, HBsAg, anti-HCV, HIV"],
        link: "viral"
      }),
      N("Typhoid, scrub typhus and leptospirosis", "nephro", {
        s: "Tropical fever กับ HSM",
        keys: ["Typhoid: relative bradycardia, rose spot, constipation ก่อน diarrhea", "Scrub typhus: eschar, lymphadenopathy", "Leptospirosis: conjunctival suffusion, calf tenderness, hypokalemic polyuric AKI", "ทั้งสามทำ AKI ได้"],
        ix: ["Hemoculture, scrub typhus IgM, lepto MAT หรือ PCR"],
        link: "febrileaki"
      }),
      N("Tuberculosis and visceral leishmaniasis", "adj", {
        s: "Disseminated TB, kala-azar",
        keys: ["Miliary TB: ไข้นาน, hepatosplenic granuloma, AA amyloid ใน chronic", "Leishmaniasis: massive splenomegaly, pancytopenia, hypergammaglobulinemia (มีรายงานในไทย)", "Night sweats และ weight loss"],
        ix: ["Bone marrow, liver biopsy, rK39 test"],
        link: "fever"
      }),
      N("Hepatosplenic schistosomiasis and opisthorchiasis", "adj", {
        s: "S. mekongi (ลาว, กัมพูชา), Opisthorchis viverrini (อีสาน)",
        keys: ["Schistosoma: periportal fibrosis, portal HT, splenomegaly, mesangioproliferative GN ใน S. mansoni", "Opisthorchis: กินปลาดิบ (ก้อยปลา), cholangitis, cholangiocarcinoma", "Eosinophilia"],
        ix: ["Stool exam, serology, US"],
        link: "eosinophilia"
      })
    ]),
    N("Infiltrative and storage", "step", {
      s: "ตับโตแข็ง LFT ALP เด่น",
      keys: ["ALP สูงไม่สัมพันธ์กับ bilirubin", "Massive hepatomegaly"]
    }, [
      N("Amyloidosis", "nephro", {
        s: "AL หรือ AA amyloid",
        keys: ["Hepatomegaly กับ ALP สูง, bilirubin ปกติ", "Nephrotic syndrome, macroglossia, periorbital purpura", "Howell-Jolly bodies จาก functional hyposplenism", "Spontaneous splenic rupture ได้"],
        ix: ["FLC, IFE, fat pad biopsy, kidney biopsy Congo red"],
        link: "mspike"
      }),
      N("Polycystic liver disease", "nephro", {
        s: "ADPKD (PKD1, PKD2), ADPLD (PRKCSH, SEC63)",
        why: "Liver cyst พบใน ADPKD มากกว่า 80% เมื่ออายุ 30 ขึ้นไป, รุนแรงกว่าในผู้หญิง โดยเฉพาะตั้งครรภ์หลายครั้งหรือได้ estrogen",
        keys: ["Massive hepatomegaly แต่ LFT ปกติ", "Early satiety, dyspnea, ascites ใน severe PLD", "Cyst infection: ไข้, RUQ pain, CA19-9 สูง", "Kidney cyst หลายใบ, family history"],
        ix: ["US หรือ MRI, total liver volume", "PET-CT ใน cyst infection"],
        std: "KDIGO 2025 ADPKD guideline",
        link: "cysts"
      }),
      N("Fatty liver and glycogen storage", "nephro", {
        s: "MASLD, GSD type I",
        keys: ["MASLD: obesity, DM, ALT สูงเล็กน้อย", "GSD Ia: hypoglycemia, lactic acidosis, hyperuricemia, FSGS, stone, kidney ใหญ่", "Hepatic adenoma ใน GSD"],
        ix: ["US, Fibroscan, genetic test ใน GSD"],
        std: "AASLD 2023 MASLD practice guidance",
        link: "obesity"
      }),
      N("Hemochromatosis and iron overload", "adj", {
        s: "HFE หรือ transfusional (thalassemia)",
        keys: ["Transferrin saturation > 45%, ferritin > 1000 µg/L", "Bronze diabetes, cardiomyopathy, arthropathy MCP 2-3", "Hypogonadism"],
        ix: ["TSAT, ferritin, MRI T2*"],
        link: "hyperpig"
      }),
      N("Sarcoidosis and Gaucher disease", "adj", {
        s: "Granulomatous และ lysosomal",
        keys: ["Sarcoid: hypercalcemia (1,25D สูง), granulomatous TIN, ALP สูง", "Gaucher: massive splenomegaly, bone crisis, Erlenmeyer flask"],
        ix: ["ACE, 1,25D, biopsy, glucocerebrosidase activity"],
        link: "hyperca"
      })
    ]),
    N("Hematologic and neoplastic", "step", {
      s: "Abnormal CBC หรือ smear",
      keys: ["Cytopenia", "Leukocytosis", "Teardrop cell"]
    }, [
      N("Thalassemia and hemolytic anemia", "nephro", {
        s: "β-thal/HbE, HbH (พบบ่อยในไทย)",
        why: "Thalassemia ทำ tubulopathy, hypercalciuria, stone, glomerular hyperfiltration และ deferasirox ทำ Fanconi syndrome",
        keys: ["Splenomegaly, frontal bossing, extramedullary hematopoiesis", "Iron overload จาก transfusion", "Deferasirox: proximal tubulopathy, AKI", "Pigment stone และ hyperbilirubinemia"],
        ix: ["Hb typing, ferritin, smear", "Urine glucose, PO4, LMW protein"],
        link: "tubulopathy"
      }),
      N("Lymphoma and leukemia", "nephro", {
        s: "Lymphoma, CLL, hairy cell, CML",
        keys: ["B symptoms, lymphadenopathy", "Kidney infiltration: kidney ใหญ่สองข้าง", "Tumor lysis เมื่อเริ่ม chemotherapy", "CLL: MPGN, MCD, cryo", "Hodgkin: MCD, AA amyloid"],
        ix: ["Smear, flow cytometry, CT, lymph node biopsy"],
        link: "lymphnode"
      }),
      N("Myeloproliferative neoplasm", "adj", {
        s: "Myelofibrosis, PV, CML",
        keys: ["Massive splenomegaly", "Teardrop cell, leukoerythroblastic smear ใน MF", "JAK2, CALR, MPL, BCR-ABL", "MPN-related glomerulopathy (FSGS-like, mesangial sclerosis)"],
        ix: ["BCR-ABL, JAK2, bone marrow"],
        link: "erythrocytosis"
      }),
      N("Hepatocellular carcinoma and metastasis", "adj", {
        s: "Hard nodular liver",
        keys: ["Cirrhosis หรือ HBV carrier", "AFP สูง", "Erythrocytosis หรือ hypoglycemia จาก paraneoplastic"],
        ix: ["Multiphase CT หรือ MRI, AFP"],
        std: "AASLD 2023 HCC guidance"
      })
    ]),
    N("Inflammatory", "step", {
      s: "Systemic autoimmune",
      keys: ["Arthritis", "Fever", "Rash"]
    }, [
      N("SLE and Felty syndrome", "nephro", {
        s: "Splenomegaly ใน SLE, RA กับ neutropenia",
        keys: ["SLE: lymphadenopathy, splenomegaly, low complement, nephritis", "Felty: RA seropositive, neutropenia, splenomegaly", "LGL leukemia overlap ใน Felty"],
        ix: ["ANA, dsDNA, C3, C4, RF, anti-CCP"],
        link: "rash"
      }),
      N("Adult-onset Still disease and HLH", "adj", {
        s: "Hyperferritinemic syndrome",
        keys: ["Still: quotidian fever, salmon rash, arthritis, ferritin สูงมาก", "HLH: cytopenia, ferritin ≥ 500 µg/L ตามเกณฑ์ HLH-2004 (ค่า > 10,000 ชวนสงสัยมากขึ้น แต่ในผู้ใหญ่ยังพบได้ใน sepsis, liver failure, malignancy), triglyceride สูง, fibrinogen ต่ำ, ใช้ HScore ช่วย", "HLH trigger: EBV, lymphoma, SLE (MAS)", "AKI และ collapsing FSGS ใน HLH"],
        ix: ["Ferritin, glycosylated ferritin, triglyceride, fibrinogen, soluble IL-2R, bone marrow"],
        std: "Yamaguchi 1992 criteria, HLH-2004 criteria, HScore",
        link: "fever"
      })
    ])
  ])
};
