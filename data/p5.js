/* Phase 5 Special settings trees. Same node schema as data/p1.js (N helper and window.TREES come from p1.js). */

/* ===================== PREGNANCY-ASSOCIATED KIDNEY DISEASE ===================== */
TREES.pregnancy = {
  must: [
    "อายุครรภ์ตอนเริ่มมีอาการ (ก่อนหรือหลัง 20 สัปดาห์), หลังคลอดกี่วัน",
    "BP และ proteinuria ก่อนตั้งครรภ์หรือในไตรมาสแรก, Cr baseline",
    "ประวัติ SLE, APS, CKD, KT, DM, HTN, preeclampsia ครรภ์ก่อน",
    "ปวดศีรษะ ตามัว ปวดชายโครงขวา บวมเร็ว ชัก",
    "คลื่นไส้อาเจียนมาก, ตกเลือด, รกลอกตัว, น้ำคร่ำอุดตัน",
    "ไข้ ปวดเอว ปัสสาวะแสบขัด",
    "ยาที่ใช้: ACEi, ARB, MMF, warfarin, statin, NSAID, aspirin, HCQ",
    "ทารก: FGR, oligohydramnios, IUFD, LCHAD ในบุตรคนก่อน"
  ],
  tree: N("Pregnancy-associated kidney disease", "root", {
    s: "ตีความค่าตามสรีรวิทยาการตั้งครรภ์ก่อน แล้วแยกตามอายุครรภ์: ไตรมาสแรก, หลัง 20 สัปดาห์ (preeclampsia spectrum, TMA, AFLP), หลังคลอด และโรคไตเดิมที่กำเริบ",
    why: "Cr ที่ปกติในคนทั่วไปอาจผิดปกติแล้วในหญิงตั้งครรภ์ และการแยก preeclampsia จาก LN flare หรือ TMA เปลี่ยนการรักษาตั้งแต่การคลอดจนถึง PLEX หรือ C5 inhibitor",
    keys: ["GFR เพิ่ม 40-50%, Cr > 0.8-0.9 mg/dL ถือว่าผิดปกติ", "HCO3 18-22 mmol/L เป็นค่าปกติในครรภ์ (compensation ของ chronic respiratory alkalosis จาก progesterone)", "Na ต่ำลงราว 4-5 mmol/L จาก osmostat reset", "Hydronephrosis เล็กน้อยถึงปานกลาง ข้างขวาเด่น ส่วนใหญ่เป็น physiologic แต่ถ้าปวด มีไข้ หรือ Cr ขึ้น ต้องแยก obstruction จริง", "Proteinuria < 300 mg/d ปกติ"],
    ix: ["Cr, electrolyte, uric acid, LFT, LDH, CBC, smear, coagulation", "UPCR, urinalysis with microscopy", "sFlt-1/PlGF ratio", "ADAMTS13, complement, C3, C4, anti-dsDNA ตามข้อบ่งชี้", "Urine culture, renal ultrasound"],
    std: "ISSHP 2021 classification and management of hypertensive disorders of pregnancy, ACOG 2020"
  }, [
    N("Physiologic changes and interpretation", "step", {
      s: "เปลี่ยนเกณฑ์อ่านค่าก่อนเรียกว่าผิดปกติ",
      why: "eGFR equations ไม่ validate ในการตั้งครรภ์ ใช้ Cr trend หรือ 24-h CrCl แทน",
      keys: ["eGFR ใช้ไม่ได้", "BP ลดในไตรมาส 2", "Glucosuria เล็กน้อยปกติ"],
      ix: ["Cr trend, 24-h CrCl ถ้าจำเป็น"]
    }, [
      N("Physiologic hydronephrosis", "adj", {
        s: "Progesterone และการกดของมดลูก ข้างขวาเด่น",
        why: "ต้องแยกจาก obstruction จริงด้วยอาการและ RI หรือ ureteric jet",
        ix: ["Ultrasound with Doppler"],
        link: "flank"
      }),
      N("Gestational diabetes insipidus", "nephro", {
        s: "Placental vasopressinase ในไตรมาส 3",
        why: "สัมพันธ์กับ AFLP, HELLP และ preeclampsia เพราะตับที่ทำงานลดลงทำลาย vasopressinase ได้น้อยลง, ตอบสนองต่อ desmopressin ซึ่งทน vasopressinase",
        ix: ["Serum Na, urine osm, desmopressin response"],
        link: "hyperna"
      })
    ]),
    N("Before 20 weeks", "step", {
      s: "AKI ก่อน 20 สัปดาห์ มัก prerenal หรือ septic",
      keys: ["Hyperemesis", "Septic abortion", "Preexisting CKD ที่เพิ่งพบ (ดู Preexisting kidney disease in pregnancy)"]
    }, [
      N("Hyperemesis gravidarum", "adj", {
        s: "Volume depletion, hypokalemia, metabolic alkalosis",
        why: "เสี่ยง Wernicke encephalopathy จาก thiamine deficiency อยู่แล้ว และการให้ glucose ก่อน thiamine กระตุ้นให้เกิดได้ จึงให้ thiamine ก่อน",
        ix: ["Electrolyte, ketone, urine Cl"],
        link: "metalk"
      }),
      N("Septic abortion", "adj", {
        s: "Sepsis, DIC, cortical necrosis",
        ix: ["Blood culture, coagulation"],
        link: "fever"
      })
    ]),
    N("Preeclampsia spectrum (≥ 20 weeks)", "step", {
      s: "New HTN ≥ 140/90 หลัง 20 สัปดาห์ ร่วม proteinuria หรือ maternal organ dysfunction หรือ uteroplacental dysfunction",
      why: "Antiangiogenic imbalance (sFlt-1 สูง, PlGF ต่ำ) ทำ glomerular endotheliosis",
      keys: ["UPCR ≥ 30 mg/mmol (0.3 mg/mg)", "Organ dysfunction ตาม ISSHP 2021: Cr ≥ 90 µmol/L (≈ 1.0 mg/dL), platelet < 150,000/µL, ALT หรือ AST > 40 IU/L, neurologic, pulmonary edema (ACOG 2020 ใช้ Cr > 1.1 mg/dL หรือเพิ่ม 2 เท่า, platelet < 100,000/µL, transaminase > 2 เท่าของ upper normal)", "โดยทั่วไป complement ปกติและ sediment ไม่ active ถ้าผิดปกติให้หาโรคไตอื่นร่วม"],
      ix: ["UPCR, Cr, LFT, platelet, LDH, uric acid", "ในผู้ที่สงสัย preeclampsia อายุครรภ์ 24 ถึง 36+6 สัปดาห์ sFlt-1/PlGF ≤ 38 บอกว่าไม่น่าเกิด preeclampsia ภายใน 1 สัปดาห์ (PROGNOSIS, Zeisler NEJM 2016, NPV 99.3%) ไม่ได้ตัดโรคหลังจากนั้น"],
      std: "ISSHP 2021, ACOG 2020, ASPRE (n = 1,776, high-risk จาก first-trimester screening) aspirin 150 mg ก่อนนอนเริ่มที่ 11-14 สัปดาห์ถึง 36 สัปดาห์ ลด preterm preeclampsia (1.6% เทียบ 4.3%, OR 0.38, 95% CI 0.20-0.74), CHAP (n = 2,408, mild chronic HTN) รักษาให้ BP < 140/90 ลด composite adverse outcome (30.2% เทียบ 37.0%, RR 0.82, 95% CI 0.74-0.92) โดย SGA ไม่เพิ่ม"
    }, [
      N("Preeclampsia with severe features", "nephro", {
        s: "BP ≥ 160/110 หรือมี organ dysfunction อย่างใดอย่างหนึ่ง (severe features ตาม ACOG 2020)",
        why: "AKI มักไม่รุนแรงและหายหลังคลอด ถ้า Cr, proteinuria หรือ HTN ยังผิดปกติหลังคลอด 12 สัปดาห์ให้หา CKD หรือ GN ที่มีอยู่เดิม",
        keys: ["การรักษาจำเพาะคือการคลอด เวลาคลอดขึ้นกับอายุครรภ์และความรุนแรง", "MgSO4 ป้องกันชัก ถ้ามี AKI หรือ oliguria ให้ลด maintenance dose และติดตาม Mg level, reflex, respiratory rate", "ยาลด BP: labetalol, nifedipine, hydralazine"],
        ix: ["Fundoscopy, neuro exam"],
        link: "htn-emerg"
      }),
      N("HELLP syndrome", "nephro", {
        s: "Hemolysis, elevated liver enzymes, low platelets",
        why: "ดีขึ้นภายใน 48-72 ชั่วโมงหลังคลอด ถ้าไม่ดีขึ้นให้คิด TTP หรือ aHUS",
        keys: ["Tennessee: platelet ≤ 100,000/µL, AST ≥ 70 U/L, LDH ≥ 600 U/L", "ปวดชายโครงขวา"],
        ix: ["Smear, LDH, AST, platelet, haptoglobin"],
        std: "Tennessee classification"
      }),
      N("Superimposed preeclampsia on CKD or LN", "nephro", {
        s: "Proteinuria หรือ BP เพิ่มเร็วใน CKD เดิม",
        why: "sFlt-1/PlGF ช่วยแยกจาก CKD progression หรือ LN flare",
        ix: ["sFlt-1/PlGF, C3, C4, dsDNA, sediment"]
      })
    ]),
    N("TMA and liver disease of late pregnancy", "step", {
      s: "TMA หรือ liver failure ที่เลียนแบบ HELLP",
      why: "แต่ละโรครักษาต่างกันสิ้นเชิง: คลอด, PLEX หรือ C5 inhibitor",
      keys: ["Platelet ต่ำมาก (มัก < 30,000/µL) ร่วมอาการ neurologic โดย AKI ไม่เด่น: นึกถึง TTP ก่อน", "AKI เด่น โดยเฉพาะเกิดหรือแย่ลงหลังคลอด: นึกถึง aHUS", "Hypoglycemia กับ coagulopathy และ ammonia สูง: นึกถึง AFLP", "PT และ aPTT ยาว fibrinogen ต่ำ: DIC", "ลักษณะเหล่านี้ซ้อนกันได้ ไม่มีข้อใดแยกโรคได้เด็ดขาด ใช้ ADAMTS13 และการตอบสนองหลังคลอด 48-72 ชั่วโมงประกอบ"],
      ix: ["ส่ง ADAMTS13 ก่อนให้ plasma หรือ PLEX", "Glucose, ammonia, PT, fibrinogen", "Complement study"],
      link: "tma"
    }, [
      N("Thrombotic thrombocytopenic purpura", "nephro", {
        s: "ADAMTS13 activity < 10%, พบบ่อยในไตรมาส 2-3 และหลังคลอด, congenital TTP มักแสดงอาการครั้งแรกตอนตั้งครรภ์",
        why: "PLEX ทันที คลอดไม่ได้แก้ TTP",
        ix: ["ADAMTS13 activity, inhibitor"],
        std: "ISTH 2020 TTP guideline",
        link: "tma"
      }),
      N("Pregnancy-associated aHUS", "nephro", {
        s: "AKI รุนแรงร่วม MAHA ส่วนใหญ่เกิดหลังคลอด (ราว 3 ใน 4) แต่เกิดระหว่างตั้งครรภ์ได้",
        why: "พบ pathogenic complement variant ราวครึ่งหนึ่ง การไม่พบ variant หรือ C3 ปกติไม่ตัด aHUS และไม่ต้องรอผล genetics ก่อนเริ่ม C5 inhibitor",
        ix: ["Complement genetics, CFH, CFI, MCP"],
        std: "KDIGO 2017 aHUS controversies",
        link: "tma"
      }),
      N("Acute fatty liver of pregnancy", "adj", {
        s: "ไตรมาส 3, คลื่นไส้ ปวดท้อง jaundice, hypoglycemia, coagulopathy, AKI",
        why: "ส่วนหนึ่ง (ราว 1 ใน 5) สัมพันธ์กับ fetal LCHAD deficiency, รักษาโดย stabilize แม่ (glucose, แก้ coagulopathy) แล้วให้คลอดโดยเร็ว",
        keys: ["Swansea criteria ≥ 6 ข้อ", "Ammonia สูง, polydipsia (DI)"],
        ix: ["Glucose, ammonia, PT, uric acid, ultrasound liver"],
        std: "Swansea criteria",
        link: "jaundice"
      }),
      N("DIC from obstetric catastrophe", "adj", {
        s: "Placental abruption, amniotic fluid embolism, IUFD นาน",
        ix: ["Fibrinogen, PT, aPTT, D-dimer"],
        link: "bleeding"
      })
    ]),
    N("Infection and obstruction", "step", {
      s: "พบได้ทุกไตรมาส",
      keys: ["Asymptomatic bacteriuria ต้องรักษาในหญิงตั้งครรภ์", "Polyhydramnios หรือครรภ์แฝดทำ obstruction จริงจนเกิด AKI ได้ (พบน้อย)"]
    }, [
      N("Acute pyelonephritis", "nephro", {
        s: "ไข้ ปวดเอว, เสี่ยง sepsis และ ARDS สูงกว่าคนทั่วไป",
        why: "Screen และรักษา asymptomatic bacteriuria ลดความเสี่ยง",
        ix: ["Urine culture, blood culture"],
        std: "IDSA 2019 asymptomatic bacteriuria guideline",
        link: "flank"
      }),
      N("Obstructive uropathy and stone", "nephro", {
        s: "Stone, polyhydramnios, uterine fibroid",
        ix: ["Ultrasound เป็นอันดับแรก ถ้าไม่ชัดทำ MRI แบบไม่ฉีด gadolinium (MR urography)"],
        link: "stone"
      })
    ]),
    N("Postpartum AKI", "step", {
      s: "หลังคลอด",
      keys: ["Hemorrhage", "TMA", "NSAID สำหรับแก้ปวด"]
    }, [
      N("Bilateral renal cortical necrosis", "nephro", {
        s: "Placental abruption, postpartum hemorrhage, amniotic fluid embolism, septic abortion ทำ anuria หรือ oliguria ที่ไม่ฟื้นตามเวลาของ ATN",
        why: "การตั้งครรภ์เป็นสาเหตุ cortical necrosis ที่พบบ่อยที่สุดในประเทศกำลังพัฒนา",
        ix: ["CT contrast: cortex ไม่ enhance แต่ medulla และ subcapsular rim บาง ๆ ยัง enhance (reverse rim sign), biopsy"],
        link: "oliguria"
      }),
      N("Postpartum preeclampsia and NSAID", "nephro", {
        s: "Preeclampsia เกิดใหม่หลังคลอดได้ (ส่วนใหญ่ใน 7-10 วันแรก แต่พบได้ถึง 6 สัปดาห์), NSAID แก้ปวดหลังคลอดทำให้ BP และ Cr แย่ลงได้ ควรเลี่ยงในรายที่มี AKI",
        ix: ["BP, Cr"]
      })
    ]),
    N("Preexisting kidney disease in pregnancy", "step", {
      s: "CKD, LN, KT, dialysis",
      why: "ความเสี่ยงต่อแม่ ทารก และไต เพิ่มตาม CKD stage, proteinuria และ HTN",
      keys: ["Cr > 1.5 mg/dL หรือ proteinuria > 1 g/d เพิ่มเสี่ยง GFR ลดถาวร", "LN ควร quiescent ≥ 6 เดือนก่อนตั้งครรภ์", "KT ควรรอ ≥ 1 ปีหลังปลูกถ่ายและ graft คงที่"],
      ix: ["Pre-conception counseling, medication review"],
      std: "KDIGO 2024 lupus nephritis guideline, AST 2005 consensus on reproduction after transplantation"
    }, [
      N("Early-onset hypertension or proteinuria", "nephro", {
        s: "HTN หรือ proteinuria ก่อน 20 สัปดาห์ ส่วนใหญ่เป็น chronic HTN หรือโรคไตเดิม (CKD, GN) มากกว่า preeclampsia",
        why: "ข้อยกเว้นที่ preeclampsia เกิดก่อน 20 สัปดาห์ได้คือ molar pregnancy (และมีรายงานใน fetal triploidy, severe APS)",
        ix: ["UPCR, urinalysis, hCG, ultrasound"],
        link: "proteinuria"
      }),
      N("Lupus nephritis flare vs preeclampsia", "nephro", {
        s: "Flare: C3 และ C4 ต่ำหรือลดลงจากเดิม (complement ปกติจะสูงขึ้นในครรภ์ ค่าที่ยังอยู่ในช่วงปกติจึงไม่ตัด flare), dsDNA ขึ้น, active sediment, เกิดได้ทุกอายุครรภ์รวมก่อน 20 สัปดาห์ ขณะที่ preeclampsia เกิดหลัง 20 สัปดาห์",
        why: "Preeclampsia: complement ปกติ, sediment bland, sFlt-1/PlGF สูง, aPL ร่วมเพิ่มความเสี่ยงทั้งคู่",
        ix: ["C3, C4, dsDNA, sediment, sFlt-1/PlGF, aPL", "Biopsy ทำเมื่อผลจะเปลี่ยนการรักษา โดยทั่วไปทำก่อนราว 20-22 สัปดาห์ Piccoli 2013 (systematic review, 243 biopsies ระหว่างตั้งครรภ์ เทียบ 1,236 หลังคลอด): complication 7% เทียบ 1% และ major bleeding ทั้ง 4 รายเกิดที่ 23-26 สัปดาห์ หลังจากนั้นมักเลื่อนไปทำหลังคลอด"],
        std: "KDIGO 2024 LN, HCQ ต่อตลอด, หยุด MMF อย่างน้อย 6 สัปดาห์ก่อนตั้งครรภ์ (MPA washout) โดยเปลี่ยนเป็น azathioprine ล่วงหน้าราว 3-6 เดือนเพื่อยืนยันว่าโรคยัง quiescent ก่อนตั้งครรภ์",
        link: "rpgn"
      }),
      N("Kidney transplant recipient", "nephro", {
        s: "Tacrolimus level ลดจาก volume ที่เพิ่ม, เสี่ยง preeclampsia และ preterm",
        why: "MMF teratogenic ต้องหยุดอย่างน้อย 6 สัปดาห์ก่อนตั้งครรภ์ (MPA washout) โดยเปลี่ยนเป็น azathioprine ล่วงหน้าราว 3-6 เดือนเพื่อยืนยันว่า graft function ยัง stable ก่อนตั้งครรภ์, mTORi หลีกเลี่ยง, CNI, azathioprine และ prednisolone ใช้ต่อได้",
        ix: ["CNI trough บ่อยขึ้น, Cr"],
        link: "kt-late"
      }),
      N("Pregnancy on dialysis", "nephro", {
        s: "Intensive HD เป้าหมาย ≥ 36 ชั่วโมงต่อสัปดาห์ (ลดได้ถ้ายังมี residual kidney function)",
        why: "Hladunewich JASN 2014 (observational): live birth 86.4% ใน Toronto cohort (HD เฉลี่ย 43 ชั่วโมงต่อสัปดาห์) เทียบ 61.4% ใน US cohort (17 ชั่วโมงต่อสัปดาห์) และมี dose-response ตามชั่วโมง HD",
        ix: ["Pre-dialysis urea, Hb, BP"],
        std: "Hladunewich 2014 Toronto vs US cohort"
      })
    ])
  ])
};

/* ===================== ONCONEPHROLOGY ===================== */
TREES.onco = {
  must: [
    "ชนิดมะเร็ง ระยะ, chemotherapy ทุกตัวพร้อมวันที่ (cycle และ cumulative dose), immunotherapy, targeted therapy, CAR-T, HSCT",
    "Contrast, bisphosphonate, NSAID, PPI, antibiotic (vancomycin, aminoglycoside), antiviral (acyclovir, foscarnet)",
    "คลื่นไส้อาเจียน mucositis ท้องเสีย กินไม่ได้",
    "ผื่น ไข้ ปวดข้อ ร่วมกับ ICI (immune-related adverse event อื่น)",
    "Bone pain, anemia, hypercalcemia (myeloma)",
    "ก้อนในอุ้งเชิงกราน retroperitoneum ที่อาจกด ureter",
    "BP และ proteinuria ก่อนเริ่มยา",
    "Nephrectomy, radiation ที่ไต, prior AKI"
  ],
  tree: N("Onconephrology", "root", {
    s: "แยกจาก timeline ของยาและตำแหน่งที่ไตเสีย: prerenal, drug-induced tubular หรือ interstitial, glomerular และ TMA, crystal และ TLS, paraprotein, infiltration และ obstruction และระวัง pseudo-AKI จากการยับยั้ง Cr secretion",
    why: "Kidney injury จำกัดการให้ยามะเร็ง การหยุดยาโดยไม่จำเป็นเสียโอกาสรักษามะเร็ง การหาสาเหตุให้ตรงจึงสำคัญเท่าการรักษาไต",
    keys: ["Timeline ของยาเทียบกับ Cr", "Cr ขึ้นแต่ cystatin C ปกติ ชี้ pseudo-AKI", "Sterile pyuria, WBC cast ชี้ AIN (ICI, PPI)", "HTN กับ proteinuria และ schistocyte ชี้ VEGF TMA", "Hypercalcemia กับ anemia ชี้ myeloma"],
    ix: ["Cr, cystatin C, electrolyte, Mg, PO4, uric acid", "Urinalysis with microscopy, UPCR, UACR", "Smear, LDH, haptoglobin", "SPEP, FLC", "Ultrasound", "Kidney biopsy เมื่อผลจะเปลี่ยนการรักษา"],
    std: "ASCO 2021 immune-related adverse events guideline, ASN onconephrology curriculum"
  }, [
    N("Pseudo-AKI", "step", {
      s: "Cr ขึ้นจากการยับยั้ง tubular secretion ไม่ใช่ GFR ลด",
      why: "หยุดยามะเร็งโดยไม่จำเป็นถ้าไม่รู้จัก",
      keys: ["Cr ขึ้น 10-30% ภายใน 1-2 สัปดาห์แรก แล้วคงที่", "Cystatin C ไม่เปลี่ยนจากเดิม", "Urinalysis ปกติ", "ยากลุ่มนี้ทำ AKI จริงได้ด้วย ถ้า Cr ขึ้นต่อเนื่อง, cystatin C ขึ้นตาม หรือ urinalysis ผิดปกติ ให้หาสาเหตุอื่น"],
      ix: ["Cystatin C, measured GFR"]
    }, [
      N("OCT2 and MATE inhibitors", "adj", {
        s: "CDK4/6 inhibitor (abemaciclib, ribociclib), tucatinib, imatinib, crizotinib, cobicistat, trimethoprim",
        why: "Crizotinib ทำได้ทั้ง pseudo-AKI และ renal cyst จริง",
        ix: ["Cystatin C"]
      })
    ]),
    N("Prerenal and hemodynamic", "step", {
      s: "Volume depletion, hypercalcemia, capillary leak",
      keys: ["Vomiting, diarrhea, mucositis", "CAR-T CRS", "IL-2 capillary leak"]
    }, [
      N("Chemotherapy GI toxicity", "adj", {
        s: "Irinotecan, 5-FU, capecitabine diarrhea",
        ix: ["Volume assessment"],
        link: "diarrhea"
      }),
      N("CAR-T cell therapy and cytokine release syndrome", "nephro", {
        s: "CRS, hypotension, capillary leak, TLS",
        why: "AKI ส่วนใหญ่ prerenal หรือ ATN หายได้",
        ix: ["IL-6, ferritin, CRP, uric acid"],
        std: "ASTCT 2019 CRS grading"
      }),
      N("Hypercalcemia of malignancy", "nephro", {
        s: "PTHrP, osteolysis, 1,25D",
        link: "hyperca"
      }),
      N("ICI hypophysitis and adrenalitis", "adj", {
        s: "Adrenal insufficiency จาก hypophysitis (พบบ่อยสุดกับ anti-CTLA-4 แต่ anti-PD-1 และ anti-PD-L1 ก็ทำได้) หรือ primary adrenalitis ทำ hypotension, hyponatremia และ prerenal AKI",
        why: "Hyponatremia หรือ hypotension ที่อธิบายไม่ได้ในผู้ได้ ICI ให้ตรวจ cortisol ก่อนสรุปว่าเป็น SIAD",
        ix: ["AM cortisol, ACTH, TSH, free T4"],
        link: "hypona"
      })
    ]),
    N("Immune checkpoint inhibitor nephritis", "step", {
      s: "AIN เป็นหลัก median ราว 14 สัปดาห์ (IQR 6-37) หลังเริ่ม anti-PD-1, anti-PD-L1 หรือ anti-CTLA-4 แต่เกิดได้ตั้งแต่สัปดาห์แรก ๆ จนเกิน 1 ปี",
      why: "พบ AKI ราว 2-5% ร่วม PPI หรือ NSAID เพิ่มความเสี่ยง, รักษาด้วย prednisone 0.5-1 mg/kg และ rechallenge ได้ในบางราย",
      keys: ["Sterile pyuria, WBC cast (pyuria พบเพียงราวครึ่งหนึ่ง ไม่มี pyuria จึงไม่ตัด AIN)", "Extrarenal irAE ร่วมหรือนำมาก่อนในราว 40%: colitis, hepatitis, thyroiditis", "Rechallenge แล้ว recurrence ราว 20%"],
      ix: ["Urinalysis, UPCR, biopsy ถ้าไม่ชัด", "Urine RBP/Cr, serum CXCL9 (research)"],
      std: "ASCO 2021 irAE guideline, Cortazar JASN 2020 multicenter ICI-AKI (n = 138)",
      link: "pyuria"
    }, [
      N("Acute interstitial nephritis", "nephro", {
        s: "> 90% ของ ICI kidney biopsy",
        why: "หยุด PPI และ NSAID ที่ใช้ร่วม, ถ้าให้ steroid แล้ว Cr ไม่ดีขึ้นในราว 1 สัปดาห์ พิจารณา infliximab หรือ MMF",
        ix: ["Biopsy"],
        link: "pyuria"
      }),
      N("Glomerular lesions", "nephro", {
        s: "Pauci-immune GN, MCD, C3G, IgAN, TMA",
        why: "พบน้อยกว่า AIN มาก แต่ถ้ามี proteinuria ชัด (> 1 g/d) หรือ hematuria ควร biopsy เพราะการรักษาต่างจาก AIN",
        ix: ["ANCA, complement, biopsy"],
        link: "rpgn"
      })
    ]),
    N("Drug-induced tubular and interstitial injury", "step", {
      s: "Dose-dependent tubular toxin",
      keys: ["Mg ต่ำ", "Fanconi", "NDI"],
      ix: ["Mg, PO4, urine glucose, urine osm"]
    }, [
      N("Cisplatin", "nephro", {
        s: "Proximal ATN, renal Mg wasting ที่อาจคงอยู่นานเป็นปีหลังหยุดยา, salt wasting, Fanconi",
        why: "Prevention: hydration และ Mg supplementation",
        ix: ["Mg, Cr ก่อนทุก cycle"],
        link: "mg"
      }),
      N("Ifosfamide", "nephro", {
        s: "Fanconi, pRTA, NDI, CKD ระยะยาว เสี่ยงสูงในเด็กเล็กและ cumulative dose > 60 g/m²",
        link: "phos"
      }),
      N("High-dose methotrexate", "nephro", {
        s: "Crystal nephropathy ใน acidic urine",
        why: "ป้องกันด้วย hydration และ urinary alkalinization (urine pH ≥ 7), leucovorin rescue, เลี่ยงยาที่ลด MTX clearance (NSAID, PPI, TMP-SMX, penicillin), ให้ glucarpidase เมื่อ MTX level สูงเกิน nomogram ร่วมกับ AKI",
        ix: ["MTX level ตาม nomogram"],
        std: "Ramsey 2018 consensus glucarpidase"
      }),
      N("Targeted agents", "nephro", {
        s: "BRAF inhibitor (vemurafenib AIN), ALK inhibitor (crizotinib cyst), anti-EGFR antibody เช่น cetuximab, panitumumab (renal Mg wasting), และยาอื่นที่พบบ่อย: pemetrexed (ATN, NDI), zoledronate (ATN)",
        ix: ["Drug timeline"]
      })
    ]),
    N("Glomerular disease and TMA", "step", {
      s: "Proteinuria, HTN, hematuria",
      keys: ["VEGF pathway: HTN, proteinuria, TMA", "Paraneoplastic GN", "Bisphosphonate FSGS"]
    }, [
      N("VEGF pathway inhibitor", "nephro", {
        keys: ["รวม intravitreal anti-VEGF (bevacizumab, ranibizumab, aflibercept, faricimab) ที่ดูดซึมเข้า systemic ได้ มีรายงาน (case series, ยังไม่พิสูจน์ causation) ว่า proteinuria เพิ่ม, HTN แย่ลง และ renal-limited TMA โดยเฉพาะใน DKD ที่ฉีดซ้ำ", "ถามการฉีดยาเข้าตาเสมอใน DM หรือ AMD ที่ proteinuria เพิ่มเร็ว", "Biopsy: GBM double contour, endothelial swelling, mesangiolysis โดย smear, platelet และ LDH อาจปกติ", "ระดับยาใน systemic ต่างกันตามชนิดยา ปรึกษาจักษุแพทย์เรื่องเปลี่ยนยาหรือยืดระยะฉีด"],
        s: "Bevacizumab, ramucirumab, aflibercept, sunitinib, pazopanib, lenvatinib",
        why: "Renal-limited TMA ที่ไม่มี MAHA ใน blood ได้ ลดขนาดหรือหยุดยาเมื่อ proteinuria nephrotic หรือ TMA",
        ix: ["BP, UPCR, smear, biopsy"],
        link: "tma"
      }),
      N("Chemotherapy-associated TMA", "nephro", {
        s: "Gemcitabine, mitomycin C (dose-dependent), proteasome inhibitor",
        ix: ["Smear, LDH, ADAMTS13"],
        link: "tma"
      }),
      N("Paraneoplastic glomerulonephritis", "nephro", {
        s: "MN กับ solid tumor (THSD7A, NELL1), MCD กับ Hodgkin, MPGN กับ CLL, AA amyloid กับ RCC",
        why: "MN ทุกรายตรวจ cancer screening ตามอายุและเพศ ไม่ว่า PLA2R บวกหรือลบ, ค้นละเอียดขึ้นเมื่อ PLA2R ลบ, THSD7A หรือ NELL1 บวก, อายุมาก, น้ำหนักลด หรือสูบบุหรี่",
        ix: ["PLA2R, THSD7A, NELL1, age-appropriate cancer screening ทุกราย"],
        link: "nephrotic"
      }),
      N("Bisphosphonate and interferon podocytopathy", "nephro", {
        s: "Pamidronate collapsing FSGS, interferon MCD หรือ FSGS",
        link: "nephrotic"
      })
    ]),
    N("Tumor lysis and crystal nephropathy", "step", {
      s: "Uric acid, PO4, xanthine",
      keys: ["Cairo-Bishop laboratory และ clinical TLS", "High-risk tumor: Burkitt, ALL, AML ที่ WBC สูง, venetoclax ใน CLL"],
      ix: ["Uric acid, K, PO4, Ca, LDH, Cr"],
      std: "Cairo-Bishop 2004, rasburicase ห้ามใช้ใน G6PD deficiency (hemolysis, methemoglobinemia) ตรวจ G6PD ก่อนถ้าทำได้"
    }, [
      N("Tumor lysis syndrome", "nephro", {
        s: "AKI จาก uric acid และ CaPO4",
        why: "ทุกรายให้ hydration, กลุ่ม high risk หรือ uric acid สูงแล้วใช้ rasburicase, allopurinol ใช้ป้องกันใน low ถึง intermediate risk แต่ไม่ลด uric acid ที่มีอยู่และทำให้ xanthine สะสม, ไม่ให้ calcium ใน hypocalcemia ที่ไม่มีอาการ",
        link: "phos"
      }),
      N("Drug crystal", "nephro", {
        s: "Methotrexate, acyclovir IV, sulfonamide",
        ix: ["Urine microscopy"]
      })
    ]),
    N("Paraprotein-related kidney disease", "step", {
      s: "Myeloma และ MGRS",
      keys: ["Cast nephropathy: involved serum FLC มักสูงกว่า 1,500 mg/L และพบน้อยมากถ้า < 500 mg/L", "Cast nephropathy: proteinuria ส่วนใหญ่เป็น light chain (UPCR สูงแต่ UACR ต่ำ, dipstick อาจ negative) ถ้า albuminuria เด่นให้คิดถึง AL amyloidosis หรือ MIDD", "M-protein ในผู้สูงอายุอาจเป็นเพียง MGUS การสรุปว่าเป็น MGRS ต้องมี biopsy ยืนยัน"],
      ix: ["SPEP, immunofixation, serum FLC, biopsy"],
      std: "IMWG 2014, IKMG 2019 MGRS",
      link: "mspike"
    }, [
      N("Light chain cast nephropathy", "nephro", {
        s: "AKI ใน myeloma",
        why: "ลด FLC เร็วด้วย bortezomib-based regimen สัมพันธ์กับ kidney recovery",
        link: "mspike"
      }),
      N("AL amyloidosis, MIDD, LCPT", "nephro", {
        s: "AL amyloidosis และ MIDD มาด้วย nephrotic syndrome หรือ albuminuria เด่น, LCPT (light chain proximal tubulopathy) มาด้วย Fanconi syndrome",
        link: "mspike"
      })
    ]),
    N("Infiltration, obstruction and HSCT", "step", {
      s: "Structural causes",
      keys: ["ไตโตสองข้าง: lymphoma infiltration", "Hydronephrosis: pelvic tumor, retroperitoneal fibrosis", "HSCT: SOS, TA-TMA, BK, CNI"]
    }, [
      N("Lymphomatous infiltration", "nephro", {
        s: "ไตโตสองข้าง AKI ที่ตอบสนอง chemotherapy",
        ix: ["Ultrasound, CT, biopsy"],
        link: "kidneysize"
      }),
      N("Malignant obstruction", "nephro", {
        s: "Cervix, bladder, prostate, colon, lymph node",
        why: "Nephrostomy หรือ stent ต้องตัดสินพร้อม prognosis",
        ix: ["Ultrasound"],
        link: "oliguria"
      }),
      N("HSCT-associated kidney injury", "nephro", {
        s: "Sinusoidal obstruction syndrome, TA-TMA, BK nephropathy, CNI",
        why: "SOS ทำภาพเหมือน hepatorenal (น้ำหนักขึ้น ascites bilirubin สูง urine Na ต่ำ) ส่วนใหญ่ใน 3 สัปดาห์แรกหลัง HSCT",
        ix: ["Bilirubin, weight gain, Doppler, BK PCR"],
        std: "EBMT 2016 SOS criteria"
      })
    ])
  ])
};

/* ===================== HIV AND VIRAL HEPATITIS ===================== */
TREES.viral = {
  must: [
    "HIV: CD4, viral load, ART regimen ปัจจุบันและเดิม (TDF, atazanavir, cobicistat, dolutegravir)",
    "HBV: HBsAg, HBeAg, HBV DNA, ประวัติ antiviral",
    "HCV: anti-HCV, HCV RNA, DAA ที่เคยได้, SVR",
    "ผื่น purpura ปวดข้อ ชาปลายมือปลายเท้า (cryoglobulinemia)",
    "ปวดท้อง testicular pain, mononeuritis multiplex, HTN ใหม่ (HBV-PAN)",
    "Risk factor: IVDU, MSM, transfusion, tattoo, dialysis",
    "ไข้ ปวดกล้ามเนื้อ ตาแดง ลุยน้ำหรือโคลน (leptospirosis), ไข้เลือดออก, ประวัติเดินป่า (scrub typhus)",
    "Rituximab หรือ steroid ที่กำลังจะเริ่ม (HBV reactivation)"
  ],
  tree: N("HIV and viral hepatitis", "root", {
    s: "แยกตาม virus แล้วไล่ direct viral injury, immune complex GN, drug toxicity และโรคที่เกี่ยวกับ treatment หรือ reactivation โดยไม่ลืม tropical infection ที่ทำ AKI ในบริบทไทย",
    why: "โรคไตใน viral infection เป็นทั้ง long case GN และ AKI ที่ต้องเลือกยา antiviral ให้ปลอดภัยต่อไต และการให้ immunosuppression โดยไม่คุม virus ทำให้แย่ลง",
    keys: ["Collapsing FSGS กับ viral load สูง: HIVAN", "MN ในผู้ที่ HBsAg บวก โดยเฉพาะ HBeAg บวกหรือ HBV DNA สูง: คิดถึง HBV-MN (PLA2R บวกไม่ตัด HBV-MN และ MN ทุกรายตรวจ HBsAg)", "MPGN กับ low C4 และ RF บวก: HCV cryoglobulinemic GN", "Cr ขึ้นเล็กน้อยแล้วคงที่หลังเริ่ม dolutegravir หรือ cobicistat โดย urinalysis ปกติ: pseudo-AKI"],
    ix: ["HIV Ag/Ab, CD4, viral load", "HBsAg, anti-HBc, HBeAg, HBV DNA", "Anti-HCV, HCV RNA", "Cryoglobulin, RF, C3, C4", "UA, UPCR, urine glucose, PO4 (TDF)", "Kidney biopsy"],
    std: "KDIGO 2018 HIV-related kidney disease controversies, KDIGO 2022 HCV in CKD guideline, KDIGO 2021 glomerular diseases guideline"
  }, [
    N("HIV: direct and immune-mediated", "step", {
      s: "HIVAN, HIVICK, TMA",
      keys: ["APOL1 high-risk genotype", "Viral load สูง CD4 ต่ำ", "ไตโต echogenic"],
      ix: ["Viral load, CD4, biopsy"]
    }, [
      N("HIV-associated nephropathy", "nephro", {
        s: "Collapsing FSGS, tubular microcysts, nephrotic-range proteinuria, ไตโต",
        why: "ART เป็นการรักษาหลักร่วม RAASi, พบน้อยในคนเอเชียเพราะ APOL1 high-risk variant พบเกือบเฉพาะในคนเชื้อสาย African แต่ยังพบ HIVAN ได้ เชื้อชาติจึงไม่ใช้ตัดโรค",
        ix: ["Biopsy, viral load"],
        std: "KDIGO 2018 HIV controversies",
        link: "nephrotic"
      }),
      N("HIV immune complex kidney disease", "nephro", {
        s: "IgAN, lupus-like GN, MPGN, MN",
        ix: ["Biopsy, complement"],
        link: "rpgn"
      }),
      N("HIV-associated TMA", "nephro", {
        s: "TMA (ภาพ TTP-like หรือ HUS-like) ใน advanced HIV ที่ CD4 ต่ำและ viral load สูง, ตรวจ ADAMTS13 เพื่อแยก TTP จริงและหา opportunistic infection หรือยาที่เป็นเหตุร่วม",
        link: "tma"
      })
    ]),
    N("HIV: antiretroviral and drug toxicity", "step", {
      s: "ในยุค ART ยาเป็นสาเหตุสำคัญของ AKI และ CKD ที่ต้องทบทวนทุกครั้ง ควบคู่กับ comorbidity (DM, HTN, HCV coinfection)",
      keys: ["Fanconi: glucosuria ที่ glucose ปกติ, phosphaturia", "Crystal และ stone", "Pseudo-AKI"],
      ix: ["Urine glucose, FE PO4, urine β2-microglobulin, drug level"]
    }, [
      N("Tenofovir nephrotoxicity (TDF)", "nephro", {
        s: "Proximal tubulopathy, Fanconi, AKI, NDI",
        why: "เปลี่ยนเป็น TAF ซึ่งมี plasma tenofovir ต่ำกว่าราว 90%, เสี่ยงเพิ่มเมื่อใช้ร่วม boosted PI",
        ix: ["Urine glucose, PO4, RBP"],
        link: "phos"
      }),
      N("Atazanavir and indinavir", "nephro", {
        s: "Crystal nephropathy, nephrolithiasis, AIN",
        ix: ["Urine microscopy, CT KUB"],
        link: "stone"
      }),
      N("Creatinine secretion inhibitors", "adj", {
        s: "Dolutegravir, bictegravir, rilpivirine, cobicistat, ritonavir, trimethoprim",
        why: "Cr ขึ้นราว 0.1-0.2 mg/dL ใน 2-4 สัปดาห์แรกแล้วคงที่ ไม่ใช่ GFR ลดจริง, ถ้าขึ้น ≥ 0.4 mg/dL ขึ้นต่อเนื่อง หรือมี proteinuria, glucosuria ใหม่ ให้หา true kidney injury (เช่น TDF tubulopathy)",
        ix: ["Cystatin C"],
        link: "onco"
      }),
      N("Opportunistic infection treatment", "adj", {
        s: "Trimethoprim-sulfamethoxazole (hyperkalemia, AIN, crystal), amphotericin B (ATN, hypokalemia, hypomagnesemia, dRTA), foscarnet (ATN, crystal, hypocalcemia), pentamidine (ATN, hyperkalemia), rifampicin (AIN)",
        ix: ["K, Mg, drug review"],
        link: "hyperk"
      })
    ]),
    N("Hepatitis B", "step", {
      s: "Immune complex GN และ vasculitis",
      why: "รักษาด้วย antiviral (entecavir, TAF) ไม่ใช่ immunosuppression เดี่ยว",
      keys: ["MN ในเด็กหรือผู้ใหญ่ HBeAg บวก", "Medium-vessel vasculitis ไม่มี GN"],
      ix: ["HBV DNA, HBeAg, biopsy (HBeAg ใน deposit)"],
      std: "KDIGO 2021 glomerular diseases, AASLD 2018 HBV guidance"
    }, [
      N("HBV-associated membranous nephropathy", "nephro", {
        s: "Subepithelial deposit มักร่วมกับ mesangial หรือ subendothelial deposit, PLA2R ลบบ่อยกว่า primary MN แต่บวกได้ในสัดส่วนไม่น้อย จึงใช้ PLA2R ตัด HBV-MN ไม่ได้",
        why: "ในเด็กส่วนใหญ่หายเองเมื่อ HBeAg seroconvert ส่วนผู้ใหญ่มัก progress จึงรักษาด้วย antiviral",
        ix: ["PLA2R, HBeAg"],
        link: "nephrotic"
      }),
      N("HBV-associated MPGN and IgAN", "nephro", {
        s: "Immune complex MPGN, IgA deposition",
        link: "hematuria"
      }),
      N("HBV-associated polyarteritis nodosa", "adj", {
        s: "Renal infarct, microaneurysm, HTN, mononeuritis multiplex, orchitis",
        why: "ไม่มี GN และ ANCA ลบ, รักษาด้วย antiviral ร่วม short-course steroid และ PLEX",
        ix: ["CTA หรือ angiography หา microaneurysm"],
        std: "Chapel Hill 2012 nomenclature, ACR 1990 PAN classification criteria (ACR/EULAR 2022 ไม่ได้ออกเกณฑ์ PAN)",
        link: "numbness"
      }),
      N("HBV reactivation with immunosuppression", "adj", {
        s: "Rituximab, high-dose steroid, cyclophosphamide",
        why: "ก่อนเริ่ม rituximab ผู้ที่ HBsAg บวก หรือ HBsAg ลบแต่ anti-HBc บวก ให้ prophylaxis ด้วย entecavir หรือ TAF และให้ต่ออย่างน้อย 12 เดือนหลัง rituximab dose สุดท้าย, immunosuppression อื่น: HBsAg บวกให้ prophylaxis ทุกราย ส่วน HBsAg ลบ anti-HBc บวก เลือก prophylaxis หรือ monitor HBV DNA และ ALT ตามระดับความเสี่ยงของยา",
        ix: ["HBsAg, anti-HBc, HBV DNA ก่อนเริ่มยา"],
        std: "AASLD 2018, KDIGO 2021"
      })
    ]),
    N("Hepatitis C", "step", {
      s: "Cryoglobulinemic GN, MPGN, MN",
      why: "DAA ทำ SVR ได้มากกว่า 95% ทุกระดับ GFR, ถ้า GN รุนแรงหรือ RPGN ใช้ rituximab ร่วม",
      keys: ["Palpable purpura, arthralgia, neuropathy", "C4 ต่ำมาก, RF บวก", "Type II mixed cryoglobulin"],
      ix: ["HCV RNA, cryoglobulin (เก็บและส่งที่ 37°C, ผลลบครั้งเดียวไม่ตัดโรคเพราะ false negative พบบ่อย ให้ส่งซ้ำ), RF, C3, C4, biopsy"],
      std: "KDIGO 2022 HCV in CKD guideline"
    }, [
      N("Cryoglobulinemic GN", "nephro", {
        s: "MPGN pattern, intraluminal hyaline thrombi, monocyte infiltration",
        ix: ["Biopsy"],
        link: "rash"
      }),
      N("HCV-associated MN and FSGS", "nephro", {
        s: "พบน้อยกว่า MPGN",
        link: "nephrotic"
      }),
      N("HCV in dialysis and KT", "nephro", {
        s: "ให้ DAA ได้ทั้งก่อนหรือหลัง KT โดยเลือกเวลาตาม waiting time และชนิด donor, รับไตจาก HCV-viremic donor ได้ทั้งใน recipient ที่ HCV บวกและลบ ถ้ามี DAA พร้อมเริ่มทันทีหลังปลูกถ่ายและผู้ป่วยให้ consent",
        ix: ["HCV RNA"],
        std: "KDIGO 2022 HCV",
        link: "donor"
      })
    ]),
    N("Liver disease and AKI overlap", "step", {
      s: "Hepatorenal และ bile cast",
      keys: ["HRS-AKI: cirrhosis ร่วม ascites", "Bile cast nephropathy: bilirubin มัก > 20 mg/dL"],
      link: "jaundice"
    }, [
      N("Hepatorenal syndrome-AKI", "nephro", {
        s: "Cirrhosis ร่วม ascites, AKI ตาม KDIGO ที่ Cr หรือ urine output ไม่ดีขึ้นภายใน 24 ชั่วโมงหลัง volume resuscitation ที่เพียงพอ (ADQI-ICA 2024, เกณฑ์ ICA 2015 เดิมใช้ albumin 1 g/kg ต่อวัน 2 วัน) และไม่มีหลักฐานชัดของสาเหตุอื่น (shock, nephrotoxin, structural kidney disease)",
        why: "Terlipressin ร่วม albumin, CONFIRM (n = 300) verified HRS reversal 32% เทียบ 17% (p = 0.006) แต่ respiratory failure พบบ่อยกว่า placebo จึงต้องติดตาม volume status, albumin load และ SpO2 และหลีกเลี่ยงใน ACLF grade 3 หรือ SpO2 < 90%",
        ix: ["Urine Na, FE Na, UA, ultrasound"],
        std: "ICA-ADQI 2024 HRS-AKI criteria"
      }),
      N("Bile cast nephropathy", "nephro", {
        s: "Severe cholestasis, bilirubin มาก",
        ix: ["Urine microscopy bile-stained cast"]
      })
    ]),
    N("Tropical and other infection-associated AKI", "step", {
      s: "บริบทไทยที่ต้องแยกจาก viral GN",
      why: "Leptospirosis และ scrub typhus ทำ AKI กับไข้ที่พบบ่อยกว่า HIV หรือ HBV GN ในหลายพื้นที่ของไทย",
      keys: ["Non-oliguric AKI กับ hypokalemia: ชี้ไปทาง leptospirosis (oliguria หรือ hyperkalemia ในรายรุนแรงไม่ตัดโรค)", "Eschar: scrub typhus (ไม่พบ eschar ไม่ตัดโรค)", "Plasma leakage, hemoconcentration: dengue"]
    }, [
      N("Leptospirosis", "adj", {
        s: "AKI non-oliguric, hypokalemia, jaundice, thrombocytopenia, pulmonary hemorrhage",
        why: "Weil disease ให้ antibiotic เร็ว (penicillin, ceftriaxone หรือ doxycycline) และถ้ามีข้อบ่งชี้ dialysis ให้เริ่มเร็วและทำทุกวัน ซึ่งสัมพันธ์กับ mortality ที่ต่ำลง",
        ix: ["Lepto PCR, MAT, IgM"],
        link: "fever"
      }),
      N("Dengue", "adj", {
        s: "AKI จาก shock, rhabdomyolysis, GN",
        ix: ["NS1, IgM, hematocrit"]
      }),
      N("Scrub typhus and melioidosis", "adj", {
        s: "Eschar, AKI กับ multiorgan failure, melioidosis ใน DM และ CKD",
        ix: ["Scrub IgM, PCR, blood culture"]
      }),
      N("SARS-CoV-2 and other viruses", "nephro", {
        s: "COVID collapsing glomerulopathy (APOL1), parvovirus B19 (collapsing FSGS), CMV, BK, hantavirus",
        ix: ["Viral PCR, biopsy"],
        link: "kt-fever"
      })
    ])
  ])
};

/* ===================== GERIATRIC AND FRAIL KIDNEY FAILURE ===================== */
TREES.elderly = {
  must: [
    "Functional status: ADL, IADL, การเดิน, ล้ม, ใครดูแล",
    "Cognition, mood, การรับรู้เป้าหมายชีวิตของผู้ป่วยและครอบครัว",
    "Comorbidity: heart failure, PVD, dementia, cancer, COPD",
    "ยาทั้งหมด รวม OTC และสมุนไพร, NSAID, ยาที่ต้องปรับตาม GFR",
    "Cr baseline และ trend ย้อนหลังหลายปี",
    "ปัสสาวะลำบาก ปัสสาวะไม่สุด (BPH, neurogenic bladder)",
    "น้ำหนักลด กินน้อย กล้ามเนื้อลีบ",
    "Advance directive, ความต้องการ dialysis, สถานที่ที่อยากอยู่ช่วงท้าย"
  ],
  tree: N("Geriatric and frail kidney failure", "root", {
    s: "ยืนยันว่าเป็น CKD จริงและหา reversible factor ก่อน แล้วประเมิน prognosis ทั้งด้านไตและด้านชีวิต (frailty, comorbidity) เพื่อทำ shared decision ระหว่าง KRT, time-limited trial และ conservative kidney management",
    why: "ในผู้สูงอายุที่ frail หรือมี comorbidity มาก dialysis อาจไม่เพิ่มอายุมากนักแต่เพิ่มเวลาที่อยู่ในโรงพยาบาล การวางแผนจึงต้องอิงเป้าหมายของผู้ป่วย",
    keys: ["eGFR ลดตามอายุเฉลี่ยราว 1 mL/min/1.73m² ต่อปีหลังอายุ 30-40 ปี ถ้าลดเร็วกว่านี้ชัดเจนหรือมี albuminuria ให้หาโรคไต", "Sarcopenia ทำ Cr ต่ำหลอก ใช้ cystatin C ช่วย", "KFRE บอกความเสี่ยงไตวาย 2 และ 5 ปี แต่ไม่คิด competing risk of death จึงประเมินสูงเกินในผู้สูงอายุมาก", "Competing risk of death สูงกว่า risk of kidney failure ในหลายราย"],
    ix: ["eGFR Cr และ cystatin C (CKD-EPI 2021)", "UACR", "Ultrasound kidney และ bladder", "SPEP, FLC, Ca", "Clinical Frailty Scale, Fried phenotype", "Cognitive screen (MoCA), depression screen", "KFRE, Charlson comorbidity index"],
    std: "KDIGO 2024 CKD guideline, KDIGO 2015 conservative kidney management controversies (Davison), RPA 2010 shared decision-making guideline"
  }, [
    N("Confirm CKD and estimate GFR correctly", "step", {
      s: "Cr ต่ำจาก muscle mass น้อย ทำให้ eGFR สูงเกินจริง",
      why: "ยาและการตัดสินใจ dialysis ผิดพลาดถ้า eGFR ไม่ตรง",
      keys: ["eGFRcr-cys แม่นกว่า", "Albuminuria ช่วยแยก CKD จาก aging"],
      ix: ["Cystatin C, UACR"],
      std: "KDIGO 2024 CKD: ใช้ eGFRcr-cys เมื่อ eGFRcr อาจคลาดเคลื่อน"
    }, [
      N("Sarcopenia and low creatinine generation", "adj", {
        s: "Cr ปกติแต่ GFR ต่ำจริง",
        link: "wasting"
      })
    ]),
    N("Reversible and treatable factors", "step", {
      s: "หาก่อนสรุปว่าเป็น progressive CKD",
      why: "ผู้สูงอายุมักมี reversible factor ซ้อนอยู่ (ยา, obstruction, volume depletion) ซึ่งแก้ได้",
      keys: ["Polypharmacy", "Obstruction", "Volume และ BP ต่ำเกิน", "Myeloma"],
      ix: ["Medication review, bladder scan, SPEP"]
    }, [
      N("Drugs and polypharmacy", "adj", {
        s: "NSAID, RAASi ร่วม diuretic, aminoglycoside, PPI (AIN), lithium",
        why: "ใช้ AGS Beers 2023 และ STOPP/START ทบทวน, sick-day rule",
        ix: ["Medication reconciliation"],
        std: "AGS Beers Criteria 2023"
      }),
      N("Bladder outlet obstruction", "nephro", {
        s: "BPH, neurogenic bladder, constipation",
        ix: ["Post-void residual, ultrasound"],
        link: "luts"
      }),
      N("Renovascular disease and overtreated hypertension", "nephro", {
        s: "Atherosclerotic RAS, BP ต่ำเกินในผู้สูงอายุ",
        ix: ["Orthostatic BP, duplex"],
        link: "htn-young"
      }),
      N("Paraprotein and hypercalcemia", "nephro", {
        s: "Myeloma พบบ่อยขึ้นตามอายุ แต่ MGUS ก็พบบ่อยขึ้นเช่นกัน (ราว 3% ที่อายุ ≥ 50 ปี และ 5% ที่ ≥ 70 ปี) การพบ M-protein จึงยังไม่ยืนยันว่าเป็นสาเหตุของโรคไต ต้องดู FLC ratio, proteinuria pattern และ biopsy",
        link: "mspike"
      }),
      N("Hyponatremia and volume depletion", "adj", {
        s: "Thiazide, กินน้อย, SIAD",
        link: "hypona"
      })
    ]),
    N("Prognosis and frailty assessment", "step", {
      s: "ชั่งน้ำหนักระหว่าง kidney prognosis กับ life expectancy",
      keys: ["Clinical Frailty Scale ≥ 5 ถือว่า frail", "Surprise question: แปลกใจไหมถ้าผู้ป่วยเสียชีวิตใน 12 เดือน", "Dementia, ADL dependence, malnutrition"],
      ix: ["Comprehensive geriatric assessment", "KFRE 2 และ 5 ปี", "Albumin, nutrition"],
      std: "Rockwood Clinical Frailty Scale, KFRE (Tangri)"
    }, [
      N("Frailty and functional decline", "adj", {
        s: "ADL ลดลงอย่างมากหลังเริ่ม dialysis ใน nursing home resident",
        why: "Kurella Tamura NEJM 2009 (n = 3,702): functional status ลดลงหรือเสียชีวิต 61% ใน 3 เดือนหลังเริ่ม dialysis และที่ 12 เดือนเสียชีวิต 58% โดยคง functional status เดิมได้เพียง 13% (เป็น nursing home resident ในสหรัฐฯ ไม่ใช่ผู้สูงอายุทั่วไป)",
        ix: ["ADL, gait speed"],
        link: "wasting"
      }),
      N("Cognitive impairment", "adj", {
        s: "พบบ่อยมากใน CKD stage 4-5 และ dialysis",
        why: "กระทบ decision capacity และการทำ PD เอง",
        ix: ["MoCA"],
        link: "ams"
      })
    ]),
    N("Kidney replacement therapy options", "step", {
      s: "เลือกวิธีที่เข้ากับเป้าหมายและบริบท",
      keys: ["Assisted PD ที่บ้าน", "Incremental HD", "Time-limited trial", "KT ในผู้สูงอายุที่คัดเลือกแล้ว"]
    }, [
      N("Assisted PD and incremental dialysis", "nephro", {
        s: "PD ที่มีผู้ดูแลช่วย, HD 2 ครั้งต่อสัปดาห์เมื่อ residual function ดี",
        why: "ลดภาระการเดินทางและเก็บ residual kidney function",
        ix: ["Residual urine output, Kru"],
        link: "pd-dyspnea"
      }),
      N("Time-limited trial of dialysis", "nephro", {
        s: "ตกลงเป้าหมายและเวลาประเมินไว้ล่วงหน้า",
        why: "เปิดทางให้หยุด dialysis อย่างมีแผนถ้าไม่บรรลุเป้า",
        std: "RPA 2010 guideline"
      }),
      N("Kidney transplantation in older adults", "nephro", {
        s: "อายุอย่างเดียวไม่ใช่ข้อห้าม",
        why: "ประเมิน frailty และ cardiovascular risk, ใช้ older donor kidney ได้",
        std: "KDIGO 2020 transplant candidate evaluation guideline",
        link: "donor"
      })
    ]),
    N("Conservative kidney management", "step", {
      s: "Active care ที่ไม่ใช้ dialysis: ชะลอโรค จัดการอาการ วางแผนล่วงหน้า",
      why: "ในอายุ > 80 หรือมี comorbidity สูง (โดยเฉพาะ ischemic heart disease) survival ของ dialysis เทียบ CKM ต่างกันน้อย ข้อมูลทั้งหมดเป็น observational ที่มี selection และ lead-time bias",
      keys: ["Symptom burden: pruritus, fatigue, dyspnea, pain", "Anemia และ volume management ต่อเนื่อง", "Advance care planning"],
      ix: ["IPOS-Renal symptom score"],
      std: "KDIGO 2015 CKM controversies, ISN conservative kidney management framework"
    }, [
      N("Symptom management", "nephro", {
        s: "Uremic pruritus (gabapentin หรือ pregabalin ขนาดต่ำปรับตาม GFR, difelikefalin IV มีข้อบ่งชี้เฉพาะผู้ป่วย HD จึงไม่ใช่ตัวเลือกใน CKM), anorexia, sleep",
        ix: ["Symptom score"],
        link: "pruritus"
      }),
      N("Advance care planning and dialysis withdrawal", "nephro", {
        s: "บันทึก advance directive, ระบุผู้ตัดสินใจแทน, palliative care referral",
        why: "การหยุด dialysis ตามความประสงค์เป็นทางเลือกที่ถูกต้องตามจริยธรรม",
        std: "RPA 2010 shared decision-making in the appropriate initiation of and withdrawal from dialysis"
      })
    ])
  ])
};
