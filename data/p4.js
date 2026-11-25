/* Phase 4 Electrolyte, acid-base and hypertension trees. Same node schema as data/p1.js (N helper and window.TREES come from p1.js). */

/* ===================== HYPOKALEMIA ===================== */
TREES.hypok = {
  must: [
    "อ่อนแรงเป็นพักๆ หลังมื้อคาร์โบไฮเดรตสูง พักหลังออกกำลัง หรือตื่นนอนตอนเช้า (periodic paralysis)",
    "ใจสั่น น้ำหนักลด เหงื่อออก มือสั่น (thyrotoxicosis)",
    "อาเจียน ท้องเสีย ใช้ยาระบาย ยาขับปัสสาวะ ยาลดน้ำหนัก ซึ่งผู้ป่วยอาจปิดบัง",
    "ยา: diuretic, insulin, β2 agonist, theophylline, amphotericin B, aminoglycoside, cisplatin, foscarnet, penicillin ขนาดสูง, acetazolamide, topiramate, glucocorticoid",
    "ชะเอม ยาสมุนไพรจีน ยาลูกกลอน, ดมกาวหรือทินเนอร์ (toluene)",
    "ความดันสูงตั้งแต่อายุน้อย, ประวัติครอบครัว HTN, stroke อายุน้อย, hypokalemia",
    "ปัสสาวะมาก กระหายน้ำ ปวดกระดูก นิ่วในไต (dRTA)",
    "ตาแห้ง ปากแห้ง ข้อ ผื่น (Sjögren, SLE), อาการของ Cushing"
  ],
  tree: N("Hypokalemia", "root", {
    s: "ตัด pseudohypokalemia แล้วแยก transcellular shift กับ K depletion จากนั้นใช้ urine K excretion กับ acid-base และ BP แยกกลไก",
    why: "Hypokalemia เป็น electrolyte disorder ที่พบบ่อยที่สุดใน long case และมักเป็นประตูสู่ RTA, Gitelman, primary aldosteronism และ periodic paralysis",
    keys: ["อาการเฉียบพลันและ K ต่ำมากโดยไม่มีประวัติ loss ชี้ shift", "Urine K/Cr แยก renal กับ extrarenal loss", "Blood gas: acidosis หรือ alkalosis", "BP และ volume status", "Serum Mg", "Urine Cl ในผู้ที่มี alkalosis"],
    ix: ["Serum K ซ้ำ, Mg, Ca, PO4, glucose, Cr", "Venous blood gas, anion gap", "Spot urine K, Cr, Na, Cl, osmolality ก่อนให้ K", "Urine K/Cr > 13 mEq/g (> 1.5 mmol/mmol) หรือ 24-h urine K > 20-30 mEq/d ชี้ renal loss", "TSH, free T4 ถ้า paralysis", "Plasma renin และ aldosterone ถ้า HTN", "ECG: U wave, ST depression, QT prolong, arrhythmia"],
    std: "Urine K/Cr แทน TTKG (Kamel และ Halperin เลิกใช้ TTKG เพราะ urea recycling), KDIGO 2020 potassium controversies conference"
  }, [
    N("Pseudohypokalemia", "step", {
      s: "K ต่ำในหลอดเลือดแต่ K ในร่างกายปกติ",
      why: "ต้องตัดก่อนให้ K เพราะ K ในร่างกายไม่ได้ต่ำ การให้ K อาจทำให้เกิด hyperkalemia จริง",
      keys: ["WBC สูงมาก (> 75,000-100,000/µL) เช่น AML", "Sample ทิ้งไว้ที่อุณหภูมิห้องนาน", "ไม่มีอาการ ECG ปกติ"]
    }, [
      N("Leukocyte uptake in vitro", "adj", {
        s: "Leukemic blast ดูด K เข้าเซลล์ในหลอดเก็บเลือด",
        why: "พบใน AML ที่ WBC สูง แต่ AML M4 และ M5 มี renal K loss จริงจาก lysozymuria ร่วมได้ จึงต้องยืนยันด้วย K ที่แยก plasma ทันทีก่อนสรุปว่าเป็น pseudohypokalemia อย่างเดียว",
        keys: ["K ปกติเมื่อแยก plasma ทันทีหรือแช่เย็น", "Whole blood K บน blood gas ปกติ"],
        ix: ["ส่ง K ใหม่โดย separate plasma ทันที หรือ whole blood บน blood gas analyzer"],
        link: "cytopenia"
      })
    ]),
    N("Transcellular shift", "step", {
      s: "K เข้าเซลล์ ไม่มี K depletion จริง urine K ต่ำ acid-base มักปกติ",
      why: "แยกออกจาก depletion เพราะต้องให้ K น้อยกว่าปกติมากและเสี่ยง rebound hyperkalemia",
      keys: ["Onset เฉียบพลัน มัก paralysis", "Urine K/Cr < 2.0-2.5 mmol/mmol ระหว่าง attack (renal K wasting มี K/Cr สูงกว่านี้ชัด)", "Blood gas มักปกติ (ยกเว้น shift จาก alkalemia)", "PO4 มักต่ำร่วม"],
      ix: ["TSH, free T4", "Urine K/Cr ระหว่าง attack (งานของ Lin ใช้ TTKG < 3 ร่วมด้วย แต่ปัจจุบันไม่แนะนำ TTKG)", "Glucose, insulin history, drug screen"],
      std: "Lin SH Arch Intern Med 2004: spot urine K/Cr แยก hypokalemic periodic paralysis จาก non-HPP, urine Ca/PO4 > 1.7 mg/mg ชี้ TPP (Lin CCM 2006)"
    }, [
      N("Thyrotoxic periodic paralysis", "adj", {
        s: "ชายเอเชียอายุ 20-40 ปี อ่อนแรงขาหลังมื้อคาร์บหรือหลังออกกำลัง",
        why: "Thyroid hormone และ insulin เพิ่ม Na-K-ATPase, พบบ่อยในคนไทยและอาการ thyrotoxicosis อาจไม่ชัด",
        keys: ["Proximal weakness ขามากกว่าแขน", "Tachycardia, goiter, tremor", "PO4 ต่ำ, urine Ca/PO4 สูง (> 1.7 mg/mg) ระหว่าง attack", "ECG: sinus tachycardia, first-degree AV block, high QRS voltage"],
        ix: ["TSH ต่ำ, free T4 หรือ T3 สูง", "TRAb ถ้าคิด Graves"],
        std: "รักษาด้วย KCl ขนาดต่ำ (< 10 mEq/h, รวมไม่เกินราว 50 mEq) ร่วมกับ nonselective β-blocker (propranolol) เพื่อลด rebound hyperkalemia"
      }),
      N("Familial hypokalemic periodic paralysis", "adj", {
        s: "Autosomal dominant, attack แรกในวัยรุ่น thyroid ปกติ",
        why: "Channelopathy ของกล้ามเนื้อ (CACNA1S, SCN4A) ต้องแยกจาก TPP เพราะการรักษาระยะยาวต่างกัน",
        keys: ["Family history", "Thyroid function ปกติ", "Attack หลังมื้อคาร์บ ความเครียด ความเย็น"],
        ix: ["Genetic test CACNA1S, SCN4A", "Long exercise test บน EMG"],
        std: "รักษาป้องกันด้วย acetazolamide หรือ dichlorphenamide"
      }),
      N("Drug and insulin-related shift", "adj", {
        s: "Insulin, β2 agonist, theophylline, caffeine, refeeding",
        why: "การรักษา DKA และ refeeding ทำให้ K, PO4, Mg ลดพร้อมกัน",
        keys: ["หลังให้ insulin หรือ salbutamol ขนาดสูง", "Refeeding ร่วม hypophosphatemia"],
        ix: ["Drug review, PO4, Mg"],
        link: "phos"
      }),
      N("Toxin-related shift", "adj", {
        s: "Barium (ยาเบื่อหนู ดอกไม้ไฟ), chloroquine, cesium, risperidone และ quetiapine overdose",
        why: "Barium ปิด K channel ทำให้ K ติดในเซลล์ อาจ paralysis และ arrhythmia รุนแรง",
        keys: ["Paralysis หลังกินสารพิษ", "GI symptoms นำมาก่อน"],
        ix: ["Toxicology, serum barium level"]
      }),
      N("Other shifts", "adj", {
        s: "Alkalemia, hypothermia, เพิ่ม hematopoiesis (เริ่ม B12, G-CSF)",
        why: "K ต่ำชั่วคราวที่หายเองเมื่อแก้สาเหตุ",
        ix: ["Blood gas, CBC, reticulocyte"]
      })
    ]),
    N("Extrarenal K loss", "step", {
      s: "Urine K/Cr < 13 mEq/g (< 1.5 mmol/mmol) หรือ 24-h urine K < 20 mEq/d",
      why: "ไตตอบสนองถูกต้องโดยการเก็บ K จึงบอกว่า loss อยู่นอกไต หรือเคย renal loss แต่หยุดแล้ว (remote diuretic, remote vomiting)",
      keys: ["Acidosis ชี้ lower GI loss", "Acid-base ปกติชี้ poor intake หรือเหงื่อ", "Alkalosis ร่วม urine K ต่ำ ชี้ remote vomiting หรือ remote diuretic"],
      ix: ["Urine K/Cr, urine Na และ Cl", "Stool volume และ stool osmolal gap ถ้าท้องเสีย", "Laxative screen ในปัสสาวะหรืออุจจาระ"]
    }, [
      N("Diarrhea and laxative abuse", "adj", {
        s: "NAGMA กับ hypokalemia, urine NH4 สูง",
        why: "Stool K ราว 30-80 mEq/L, การใช้ยาระบายแอบแฝงเป็นสาเหตุ pseudo-RTA ที่ต้องถามตรงๆ",
        keys: ["Urine anion gap ลบ หรือ urine osmolal gap > 150 mOsm/kg", "Urine pH อาจ > 5.5 เพราะ NH3 ที่สร้างมากจับ H+ ใน lumen แต่ urine NH4 สูง จึงต่างจาก dRTA ที่ NH4 ต่ำ", "Laxative abuse เรื้อรังเป็น metabolic alkalosis ได้ (volume contraction และ K depletion) การไม่มี acidosis จึงไม่ตัด laxative abuse"],
        ix: ["Urine anion gap, urine osmolal gap", "Stool electrolyte, stool osmolal gap", "Bisacodyl, senna, phenolphthalein screen"],
        link: "diarrhea"
      }),
      N("Villous adenoma and secretory tumors", "adj", {
        s: "Mucus diarrhea ปริมาณมาก, VIPoma (WDHA)",
        why: "Villous adenoma ใหญ่เสีย K และ Cl มาก อาจมี metabolic alkalosis ได้, VIPoma ทำ watery diarrhea > 3 L/d",
        ix: ["Colonoscopy", "Serum VIP"]
      }),
      N("Poor intake and sweat loss", "adj", {
        s: "Intake < 25 mEq/d ร่วมกับ loss เล็กน้อย, ผู้สูงอายุ, alcohol, เหงื่อมากจากออกแรงในอากาศร้อน",
        why: "Poor intake อย่างเดียวไม่ค่อยทำ K ต่ำมาก ถ้าต่ำมากให้หา loss ร่วมเสมอ",
        ix: ["Dietary history, urine K ต่ำมาก", "Mg และ PO4 ร่วม"]
      })
    ]),
    N("Renal K loss with metabolic acidosis", "step", {
      s: "Urine K สูงร่วมกับ acidosis",
      why: "แยก AGMA กับ NAGMA ก่อน แล้วใช้ urine NH4 กับ urine pH แยก RTA",
      keys: ["AG สูง: DKA, toluene (hippurate)", "NAGMA ร่วม urine NH4 ต่ำ: dRTA", "Fanconi features: pRTA"],
      ix: ["Anion gap, delta ratio", "Urine pH, urine anion gap, urine osmolal gap", "Fractional excretion ของ HCO3, PO4, glucose"],
      link: "nagma"
    }, [
      N("Distal RTA (type 1)", "nephro", {
        s: "Urine pH > 5.5 ขณะ acidemia, urine NH4 ต่ำ, hypocitraturia, nephrocalcinosis",
        why: "K ต่ำมากพอที่จะทำ paralysis ได้ โดยเฉพาะใน Sjögren ของหญิงไทย และโรคแบบ endemic ในภาคอีสาน",
        keys: ["Nephrocalcinosis หรือ recurrent CaP stone", "Urine osmolal gap < 100 mOsm/kg", "ตาแห้งปากแห้ง (Sjögren)", "เด็ก growth failure หรือหูหนวก (ATP6V1B1)"],
        ix: ["Urine pH ด้วย pH meter", "Anti-Ro, anti-La, ANA, Schirmer test", "KUB หรือ ultrasound หา nephrocalcinosis", "Furosemide-fludrocortisone test ถ้าไม่ชัด"],
        std: "Furosemide-fludrocortisone test: urine pH ไม่ลดต่ำกว่า 5.3 = impaired distal acidification",
        link: "nagma"
      }),
      N("Proximal RTA (type 2) and Fanconi syndrome", "nephro", {
        s: "Bicarbonaturia ทำให้ distal K secretion สูง โดยเฉพาะเมื่อให้ alkali",
        why: "K ต่ำแย่ลงชัดเมื่อเริ่ม NaHCO3 และ Fanconi ในผู้ใหญ่ต้องหา light chain และ tenofovir",
        keys: ["Glucosuria ที่ glucose ปกติ, phosphaturia, uricosuria", "Urine pH < 5.5 เมื่อ HCO3 ต่ำกว่า threshold", "Osteomalacia"],
        ix: ["FE HCO3 > 15% ระหว่าง bicarbonate loading", "TmP/GFR, urine glucose, urine β2-microglobulin", "SPEP, serum FLC"],
        link: "mspike"
      }),
      N("DKA and osmotic diuresis", "adj", {
        s: "Total body K deficit 3-5 mEq/kg ทั้งที่ serum K แรกรับอาจปกติหรือสูง",
        why: "Insulin ทำให้ K ดิ่งลง ต้องให้ K ก่อนหรือพร้อม insulin เมื่อ K < 5.0-5.2 และเลื่อน insulin ถ้า K < 3.5",
        ix: ["β-hydroxybutyrate, glucose, blood gas"],
        std: "ADA, EASD, JBDS, AACE, DTS 2024 hyperglycemic crises consensus",
        link: "agma"
      }),
      N("Toluene and drug-induced tubular injury", "adj", {
        s: "Toluene (กาว ทินเนอร์), amphotericin B, ifosfamide, acetazolamide, topiramate",
        why: "Toluene ทำ AGMA ช่วงแรกแล้วกลายเป็น NAGMA เมื่อ hippurate ถูกขับออก ร่วม urine osmolal gap สูง",
        keys: ["Neurologic symptoms, ประวัติดมสาร", "Urine anion gap บวกทั้งที่ NH4 สูง (hippurate)"],
        ix: ["Urine osmolal gap, urine hippuric acid"]
      })
    ]),
    N("Renal K loss with alkalosis and hypertension", "step", {
      s: "Mineralocorticoid excess หรือ mineralocorticoid-like activity",
      why: "ใช้ plasma renin กับ aldosterone แยกเป็น 3 pattern ก่อนเลือก test ยืนยัน",
      keys: ["Renin สูง aldo สูง: ผู้ป่วย HTN ที่ได้ diuretic (พบบ่อยที่สุด), renovascular, renin-secreting tumor, malignant HTN", "Renin ต่ำ aldo สูง: primary aldosteronism", "Renin ต่ำ aldo ต่ำ: Liddle, AME, licorice, Cushing, CAH, DOC tumor"],
      ix: ["Plasma renin (PRA หรือ DRC), aldosterone, ARR", "24-h UFC หรือ 1-mg DST", "Renal artery imaging ถ้า renin สูง"],
      std: "Endocrine Society 2025 primary aldosteronism guideline",
      link: "htn-young"
    }, [
      N("Primary aldosteronism", "nephro", {
        s: "Renin ต่ำ aldosterone สูง, hypokalemia พบเพียงราวหนึ่งในสาม",
        why: "สาเหตุ endocrine ของ HTN ที่พบบ่อยที่สุด และ unilateral disease ผ่าตัดแล้ว biochemical cure เกือบทุกราย แต่ BP ปกติโดยไม่ใช้ยาเพียงราวหนึ่งในสาม (PASO 37%) ที่เหลือส่วนใหญ่ใช้ยาลดลง",
        keys: ["Spontaneous หรือ diuretic-induced hypokalemia", "Resistant HTN, adrenal incidentaloma, AF, OSA"],
        ix: ["ARR แล้วยืนยันด้วย saline infusion, oral salt loading, captopril หรือ fludrocortisone test", "CT adrenal แล้ว AVS เพื่อ subtype"],
        std: "Endocrine Society 2025 PA guideline",
        link: "htn-young"
      }),
      N("Apparent mineralocorticoid excess and licorice", "nephro", {
        s: "11β-HSD2 deficiency หรือถูกยับยั้ง ทำให้ cortisol กระตุ้น MR",
        why: "ชะเอมในยาจีน ลูกอม และยาสมุนไพรไทยเป็นสาเหตุที่ถามแล้วเจอ",
        keys: ["Renin ต่ำ aldo ต่ำ", "Urine cortisol/cortisone ratio สูง"],
        ix: ["Urinary free cortisol/cortisone ratio, HSD11B2 genetic"]
      }),
      N("Liddle syndrome", "nephro", {
        s: "ENaC gain-of-function (SCNN1B, SCNN1G), autosomal dominant",
        why: "ตอบสนอง amiloride หรือ triamterene แต่ไม่ตอบสนอง spironolactone",
        keys: ["HTN อายุน้อยกับ family history", "Renin ต่ำ aldo ต่ำ"],
        ix: ["Genetic test SCNN1B, SCNN1G"]
      }),
      N("Cushing syndrome and ectopic ACTH", "nephro", {
        s: "Cortisol สูงเกินความสามารถของ 11β-HSD2 จึงกระตุ้น MR, ectopic ACTH ทำ hypokalemia รุนแรง",
        why: "Ectopic ACTH จาก SCLC หรือ NET มักมี K ต่ำมาก น้ำหนักลด และอาจไม่มีรูปร่าง cushingoid โดยเฉพาะ SCLC ที่ดำเนินโรคเร็ว",
        ix: ["24-h UFC, late-night salivary cortisol, 1-mg DST, ACTH"],
        std: "Endocrine Society 2008 Cushing diagnosis guideline",
        link: "cushingoid"
      }),
      N("CAH (11β-hydroxylase, 17α-hydroxylase) and DOC-secreting tumor", "nephro", {
        s: "DOC สูงทำ mineralocorticoid effect",
        why: "11β-OH deficiency มี virilization, 17α-OH deficiency มี primary amenorrhea หรือ ambiguous genitalia",
        ix: ["11-deoxycortisol, DOC, sex steroid, genetic"]
      }),
      N("Renovascular hypertension and renin-secreting tumor", "nephro", {
        s: "Renin สูง aldo สูง (secondary hyperaldosteronism)",
        why: "Juxtaglomerular cell tumor พบในผู้ใหญ่อายุน้อยที่ HTN รุนแรงกับ K ต่ำ",
        ix: ["Renal artery duplex หรือ CTA, CT kidney หา JG tumor"],
        link: "htn-young"
      }),
      N("Renin-mediated hypertension from parenchymal disease (ADPKD, page kidney, segmental ischemia)", "nephro", {
        s: "Renin สูง aldo สูง K ต่ำ โดยไม่มี main renal artery stenosis",
        why: "Cyst ใน ADPKD กด intrarenal vessel ทำ segmental ischemia และ intrarenal RAAS activation, page kidney จาก subcapsular hematoma หรือ collection, reflux nephropathy, unilateral small kidney และ malignant HTN ก็ให้ pattern เดียวกัน ส่วน diuretic ทำ renin สูงเองได้ ถ้า ADPKD แต่ renin ต่ำ aldo สูง ให้คิด primary aldosteronism ซ้อน",
        keys: ["ADPKD กับ hypokalemia ต้องวัด renin และ aldosterone ก่อนสรุปว่าเป็นจาก cyst", "Renin ต่ำใน ADPKD ชี้ PA ร่วม เช่น adrenal adenoma", "Spironolactone, diuretic, ACEi รบกวน ARR ต้องหยุดหรือแปลผลตามยา", "Page kidney หลัง trauma, biopsy หรือ anticoagulant ให้ HTN ใหม่และ perirenal collection"],
        ix: ["Plasma renin, aldosterone, ARR ขณะ K ปกติ", "MRI หรือ CT ดู cyst, TKV, adrenal และ perirenal collection", "Doppler หรือ CTA ถ้า renin สูงมากเกินกว่า cyst burden"],
        std: "KDIGO 2025 ADPKD, Endocrine Society 2025 primary aldosteronism",
        link: "cysts"
      })
    ]),
    N("Renal K loss with alkalosis and normal or low BP", "step", {
      s: "ใช้ urine Cl แยก vomiting กับ diuretic, Bartter, Gitelman",
      why: "การแยก Gitelman จากการใช้ diuretic หรืออาเจียนแอบแฝงเป็นคำถามมาตรฐานของ long case",
      keys: ["Urine Cl < 20 mEq/L: vomiting, NG suction หรือ diuretic ที่หมดฤทธิ์แล้ว (remote diuretic)", "Urine Cl > 20 mEq/L: diuretic ที่ยังออกฤทธิ์, Bartter, Gitelman, Mg หรือ K depletion รุนแรง", "Urine Ca/Cr ต่ำ + Mg ต่ำ: Gitelman หรือ thiazide", "Urine Ca/Cr สูง: Bartter หรือ loop diuretic"],
      ix: ["Spot urine Na, K, Cl, Ca, Cr (วัดซ้ำหลายครั้ง)", "Serum Mg, FE Mg", "Urine diuretic screen", "Plasma renin, aldosterone"],
      std: "KDIGO 2017 Gitelman syndrome controversies conference (Blanchard 2017)",
      link: "metalk"
    }, [
      N("Gitelman syndrome", "nephro", {
        s: "SLC12A3 (NCC) loss-of-function, วัยรุ่นหรือผู้ใหญ่, ตะคริว อ่อนเพลีย",
        why: "Inherited tubulopathy ที่พบบ่อยที่สุด และเป็นสาเหตุของ chondrocalcinosis จาก Mg ต่ำ",
        keys: ["Urine K/Cr > 2.0 mmol/mmol", "Mg < 0.7 mmol/L ร่วม FE Mg > 4% (บางรายมี Mg ปกติ จึงไม่ใช้ Mg ปกติตัดโรค)", "Urine Ca/Cr < 0.2 mmol/mmol", "FE Cl > 0.5%, renin สูง, BP ต่ำหรือปกติต่ำ"],
        ix: ["Spot urine Ca/Cr, FE Mg, FE Cl", "Genetic test SLC12A3", "ECG หา QT prolongation"],
        std: "KDIGO 2017 Gitelman controversies conference",
        link: "mg"
      }),
      N("Bartter syndrome", "nephro", {
        s: "TAL defect (NKCC2, ROMK, ClC-Kb, barttin, MAGED2), มัก neonatal หรือ childhood",
        why: "Polyhydramnios, prematurity, polyuria, hypercalciuria และ nephrocalcinosis ต่างจาก Gitelman",
        keys: ["Urine Ca สูง", "Type 3 (CLCNKB) ซ้อนกับ Gitelman phenotype ได้", "Type 4 มี sensorineural deafness"],
        ix: ["Urine Ca/Cr, renal ultrasound", "Genetic panel"]
      }),
      N("Diuretic use or abuse", "adj", {
        s: "Thiazide ทำภาพเหมือน Gitelman, loop ทำภาพเหมือน Bartter",
        why: "พบในผู้ที่ต้องการลดน้ำหนักหรือบุคลากรทางการแพทย์ urine electrolyte ผันผวนตามเวลาที่ใช้ยา",
        keys: ["Urine Cl สูงเป็นช่วงๆ", "BMI ต่ำ, ความกังวลเรื่องรูปร่าง"],
        ix: ["Urine diuretic screen ซ้ำหลายครั้ง"]
      }),
      N("Vomiting and NG suction", "adj", {
        s: "Urine Cl < 20 mEq/L, urine Na และ K อาจสูงช่วงที่มี bicarbonaturia",
        why: "K ต่ำจาก renal loss ไม่ใช่จาก gastric fluid (gastric K ราว 5-10 mEq/L)",
        keys: ["Dental erosion, parotid enlargement, Russell sign ในผู้ที่แอบอาเจียน", "Urine pH > 6.5 ช่วง active vomiting"],
        ix: ["Urine Cl, urine pH"],
        link: "nausea"
      }),
      N("Hypomagnesemia and nephrotoxic drugs", "nephro", {
        s: "Mg ต่ำปลด ROMK ทำให้ K หลั่งมาก, aminoglycoside, cisplatin, amphotericin, foscarnet",
        why: "K มักแก้ไม่ขึ้น (refractory hypokalemia) จนกว่าจะแก้ Mg",
        ix: ["Serum Mg, FE Mg"],
        link: "mg"
      }),
      N("Hypercalcemia and CaSR activation", "nephro", {
        s: "Ca สูงกระตุ้น CaSR ใน TAL ทำ Bartter-like picture",
        why: "Autosomal dominant hypocalcemia type 1 (CaSR gain-of-function ซึ่ง Ca ต่ำ ไม่ใช่สูง) และ aminoglycoside ทำ Bartter-like picture แบบเดียวกัน",
        ix: ["Ca, PTH"],
        link: "hyperca"
      })
    ]),
    N("Renal K loss with variable acid-base", "step", {
      s: "Distal delivery สูงหรือ nonreabsorbable anion",
      keys: ["Polyuria", "ยากลุ่ม penicillin ขนาดสูง", "AML"]
    }, [
      N("Osmotic and post-obstructive diuresis", "nephro", {
        s: "Glucose, mannitol, urea, recovery phase ของ ATN หรือ obstruction",
        ix: ["Urine osmolality, urine output"],
        link: "polyuria"
      }),
      N("Nonreabsorbable anions", "adj", {
        s: "Piperacillin, high-dose penicillin, ketoanion, hippurate",
        why: "Anion ที่ดูดกลับไม่ได้เพิ่ม lumen electronegativity ทำ K secretion สูง",
        ix: ["Drug review, urine anion gap"]
      }),
      N("Lysozymuria in monocytic leukemia", "adj", {
        s: "AML M4 และ M5 ทำ tubular injury",
        ix: ["CBC, peripheral smear, urine lysozyme"],
        link: "cytopenia"
      })
    ])
  ])
};

/* ===================== HYPERKALEMIA ===================== */
TREES.hyperk = {
  must: [
    "อาการ: อ่อนแรง ใจสั่น เป็นลม, ECG ก่อนทุกอย่าง",
    "ยา: ACEi, ARB, ARNI, MRA, finerenone, K-sparing diuretic, trimethoprim, pentamidine, heparin, NSAID, CNI, β-blocker, digoxin, succinylcholine",
    "K supplement, salt substitute (KCl), น้ำมะพร้าว ผลไม้ เกลือโซเดียมต่ำ",
    "ปริมาณปัสสาวะ, CKD stage, dialysis ที่พลาด",
    "DM, HIV, SLE, sickle cell, obstructive uropathy (hyporeninemic hypoaldosteronism)",
    "อาการ adrenal insufficiency: อ่อนเพลีย คลื่นไส้ ผิวคล้ำ ความดันต่ำ",
    "Tissue breakdown: chemotherapy, rhabdomyolysis, GI bleed, hemolysis, burns",
    "เก็บเลือดยาก กำมือ tourniquet นาน, platelet หรือ WBC สูงมาก"
  ],
  tree: N("Hyperkalemia", "root", {
    s: "ทำ ECG และรักษาฉุกเฉินก่อน แล้วตัด pseudohyperkalemia แยก shift กับ impaired renal excretion ไล่ตาม GFR, distal delivery และ aldosterone axis",
    why: "Hyperkalemia ทำ arrhythmia ถึงตาย และเป็นตัวจำกัดการใช้ RAASi ซึ่งเป็นแกนของการรักษา CKD",
    keys: ["ECG: peaked T, PR prolong, P หาย, QRS กว้าง, sine wave", "GFR < 15-20 mL/min หรือ oliguria อธิบาย hyperK ได้เอง", "GFR ดีแต่ K สูงให้หา hypoaldosteronism หรือยา", "NAGMA ร่วม hyperK ชี้ type 4 RTA"],
    ix: ["ECG, K ซ้ำจาก plasma หรือ whole blood", "Cr, glucose, blood gas, CBC", "Urine K, Na, Cr, osmolality", "Plasma renin, aldosterone, AM cortisol ถ้า GFR ไม่อธิบาย", "CK, LDH, uric acid, PO4 ถ้าคิด tissue breakdown"],
    std: "UK Kidney Association acute hyperkalaemia guideline (mild 5.5-5.9, moderate 6.0-6.4, severe ≥ 6.5 mmol/L), KDIGO 2020 potassium controversies conference"
  }, [
    N("Emergency stabilization", "step", {
      s: "รักษาก่อนหาสาเหตุเมื่อ K ≥ 6.5 หรือมี ECG change",
      why: "ระดับ K กับ ECG change ไม่สัมพันธ์กันเสมอไป ECG ปกติจึงไม่ตัด hyperkalemia รุนแรง โดยเฉพาะใน CKD ที่ K สูงเรื้อรัง",
      keys: ["มี ECG change: calcium gluconate 10% 30 mL (หรือ CaCl 10% 10 mL) ทาง IV ซ้ำได้ถ้า ECG ไม่ดีขึ้น", "Insulin regular 10 units กับ glucose 25 g, ระวัง hypoglycemia ใน CKD", "Salbutamol nebulized 10-20 mg", "Binder: SZC หรือ patiromer, หลีกเลี่ยง SPS ระยะเฉียบพลัน", "Dialysis ถ้าดื้อหรือ oliguria"],
      ix: ["Cardiac monitor, K ซ้ำที่ 1, 2, 4, 6 ชั่วโมง, glucose ทุกชั่วโมงหลัง insulin"],
      std: "UK Kidney Association 2020 acute hyperkalaemia guideline"
    }, [
      N("Removal strategy", "nephro", {
        s: "Loop diuretic ถ้ามีปัสสาวะ, K binder, hemodialysis",
        why: "Insulin และ salbutamol เป็นแค่ shift ชั่วคราว 4-6 ชั่วโมง ต้องเอา K ออกจากร่างกายเสมอ",
        keys: ["NaHCO3 มีประโยชน์เฉพาะเมื่อมี metabolic acidosis"],
        ix: ["Urine output, Cr trend"]
      })
    ]),
    N("Pseudohyperkalemia", "step", {
      s: "K สูงในหลอดเก็บเลือดแต่ไม่สูงในร่างกาย",
      keys: ["ECG ปกติ", "ไม่มีเหตุทางคลินิก", "Hemolysis index สูง"],
      ix: ["ส่งซ้ำแบบ plasma heparin, เก็บไม่ใช้ tourniquet นาน", "Whole blood K บน blood gas"]
    }, [
      N("Hemolysis and sampling technique", "adj", {
        s: "กำมือ tourniquet นาน เข็มเล็ก ส่ง pneumatic tube",
        why: "สาเหตุที่พบบ่อยที่สุด กำมือซ้ำเพิ่ม K ได้ 1-2 mEq/L",
        ix: ["Hemolysis index, ส่งซ้ำ"]
      }),
      N("Thrombocytosis and leukocytosis", "adj", {
        s: "Platelet > 500,000-1,000,000/µL หรือ WBC สูงมาก ปล่อย K ระหว่าง clotting",
        why: "Serum K สูงกว่า plasma K > 0.4 mEq/L ยืนยัน, CLL ทำ reverse pseudohyperkalemia ใน heparin tube",
        ix: ["Paired serum กับ plasma K"],
        link: "cytopenia"
      }),
      N("Familial pseudohyperkalemia", "adj", {
        s: "RBC leak K เมื่อเย็น (ABCB6)",
        ix: ["K ปกติเมื่อแยก plasma ที่ 37°C"]
      })
    ]),
    N("Transcellular shift", "step", {
      s: "K ออกจากเซลล์ GFR อาจปกติ",
      keys: ["Hyperglycemia หรือ hyperosmolality", "Tissue breakdown มี PO4, uric acid, LDH สูงร่วม", "Mineral acidosis มากกว่า organic acidosis"]
    }, [
      N("Insulin deficiency and hypertonicity", "adj", {
        s: "DKA, HHS, mannitol, IVIG ที่มี sucrose, contrast",
        why: "Solvent drag พา K ออกนอกเซลล์ ทั้งที่ total body K พร่อง",
        ix: ["Glucose, serum osmolality"],
        link: "agma"
      }),
      N("Tissue breakdown", "nephro", {
        s: "Tumor lysis, rhabdomyolysis, hemolysis, GI bleed, burns, crush injury",
        why: "มัก AKI ร่วม ทำ K ขึ้นเร็วมาก ต้องเฝ้าระวังทุก 4-6 ชั่วโมง",
        keys: ["Cairo-Bishop: K ≥ 6.0 mmol/L หรือเพิ่ม 25%"],
        ix: ["CK, uric acid, PO4, Ca, LDH"],
        std: "Cairo-Bishop TLS criteria",
        link: "myalgia"
      }),
      N("Drugs causing shift", "adj", {
        s: "Nonselective β-blocker, digoxin toxicity, succinylcholine (burn, denervation, immobilization)",
        why: "Digoxin toxicity ยับยั้ง Na-K-ATPase, IV calcium ไม่ใช่ข้อห้ามและให้ได้เมื่อมีข้อบ่งชี้ (ความเชื่อเรื่อง stone heart ไม่มีหลักฐานรองรับ) ส่วนการรักษาจำเพาะคือ digoxin Fab",
        ix: ["Digoxin level, drug review"]
      }),
      N("Hyperkalemic periodic paralysis", "adj", {
        s: "SCN4A, attack หลังพักจากการออกกำลัง หรือกิน K",
        ix: ["Genetic test, EMG"],
        link: "weakness"
      }),
      N("Mineral (hyperchloremic) acidosis", "adj", {
        s: "NAGMA ทำ K shift มากกว่า lactic หรือ ketoacidosis",
        link: "nagma"
      })
    ]),
    N("Impaired renal excretion: low GFR or low distal flow", "step", {
      s: "GFR < 15-20 mL/min, AKI oliguric, หรือ effective volume ต่ำ",
      why: "Distal Na delivery และ flow เป็นตัวกำหนด K secretion พอๆ กับ aldosterone",
      keys: ["Oliguria", "Urine Na < 20 mEq/L", "CKD stage 4-5 ร่วม intake สูง"],
      ix: ["Cr, urine output, urine Na"]
    }, [
      N("Advanced CKD and AKI", "nephro", {
        s: "K ขึ้นเมื่อ GFR ต่ำมากหรือมี load เพิ่ม",
        why: "ถ้า CKD stage 3 ที่ K สูงชัดเจน ให้หา hypoaldosteronism หรือยาร่วมด้วย",
        ix: ["eGFR, dietary K, drug review"],
        std: "KDIGO 2024 CKD guideline: ใช้ binder เพื่อให้คง RAASi ได้",
        link: "risingcr"
      }),
      N("Low effective arterial volume", "adj", {
        s: "Heart failure, cirrhosis, volume depletion",
        why: "Distal delivery ต่ำร่วมกับยา RAASi และ MRA ที่ใช้ใน HF",
        ix: ["Urine Na, BNP"]
      })
    ]),
    N("Impaired renal excretion: hypoaldosteronism", "step", {
      s: "GFR ไม่ต่ำพอที่จะอธิบาย hyperK ใช้ renin และ aldosterone แยก",
      why: "ส่วนนี้คือหัวใจของ type 4 RTA ที่ออกสอบบ่อย",
      keys: ["Renin ต่ำ aldo ต่ำ: hyporeninemic hypoaldosteronism", "Renin สูง aldo ต่ำ: adrenal หรือ RAAS blocker", "Aldo สูง: aldosterone resistance"],
      ix: ["Plasma renin, aldosterone, AM cortisol, ACTH", "Urine pH, urine NH4 หรือ urine osmolal gap"],
      std: "Type 4 RTA: hyperkalemic NAGMA กับ NH4 excretion ต่ำ, urine pH มัก < 5.5 ใน hypoaldosteronism แต่ > 5.5 ได้ใน voltage-dependent defect"
    }, [
      N("Hyporeninemic hypoaldosteronism", "nephro", {
        s: "DM, CKD จาก interstitial disease, NSAID, CNI, HIV, ผู้สูงอายุ",
        why: "พบบ่อยที่สุดใน type 4 RTA กลไกคือ JG apparatus เสีย และ volume expansion กด renin",
        keys: ["DKD ที่ GFR 30-60 และ hyperK", "BP มักสูง volume มาก"],
        ix: ["Renin ต่ำ aldo ต่ำ"],
        link: "nagma"
      }),
      N("Primary adrenal insufficiency", "adj", {
        s: "Autoimmune, TB, CMV adrenalitis ในผู้ป่วย HIV, adrenal hemorrhage, metastasis",
        why: "Hyponatremia ร่วม hyperK ความดันต่ำ ผิวคล้ำ ต้องรักษาด้วย hydrocortisone ทันทีเมื่อสงสัย",
        keys: ["AM cortisol < 5 µg/dL ชี้ชัด", "ACTH สูง"],
        ix: ["AM cortisol, ACTH, cosyntropin test (peak < 18 µg/dL)"],
        std: "Endocrine Society 2016 primary adrenal insufficiency guideline"
      }),
      N("RAAS blockade and heparin", "adj", {
        s: "ACEi, ARB, ARNI, direct renin inhibitor, heparin ทั้ง UFH และ LMWH",
        why: "Heparin กด aldosterone synthase ภายในไม่กี่วัน",
        ix: ["Drug review"]
      }),
      N("Isolated hypoaldosteronism", "adj", {
        s: "Critical illness, aldosterone synthase deficiency, และ CAH 21-hydroxylase แบบ salt wasting (ขาด cortisol ร่วมด้วย จึงไม่ใช่ isolated จริง)",
        ix: ["17-OHP, aldosterone, genetic"]
      })
    ]),
    N("Impaired renal excretion: aldosterone resistance", "step", {
      s: "Aldosterone ปกติหรือสูงแต่ collecting duct ไม่ตอบสนอง",
      keys: ["ยาปิด ENaC หรือ MR", "Tubulointerstitial disease", "HTN ร่วม hyperK ที่ GFR ปกติ: Gordon"]
    }, [
      N("ENaC and MR blocking drugs", "adj", {
        s: "Amiloride, triamterene, trimethoprim, pentamidine, spironolactone, eplerenone, finerenone",
        why: "Trimethoprim ทำ K สูงได้แม้ขนาดปกติ โดยเฉพาะผู้สูงอายุ CKD หรือใช้ร่วมกับ RAASi และเด่นขึ้นเมื่อใช้ขนาดสูงรักษา PJP",
        ix: ["Drug review"]
      }),
      N("Calcineurin inhibitors", "nephro", {
        s: "Tacrolimus และ cyclosporine กระตุ้น NCC ผ่าน WNK และกด ROMK",
        why: "ทำภาพเหมือน Gordon คือ hyperK, NAGMA, HTN ที่ตอบสนอง thiazide พบได้ทั้งใน KT และผู้ที่ใช้ CNI ด้วยข้อบ่งชี้อื่น",
        ix: ["CNI trough level"],
        link: "kt-late"
      }),
      N("Tubulointerstitial disease", "nephro", {
        s: "Obstructive uropathy, SLE, sickle cell, amyloid, KT rejection",
        why: "Collecting duct damage ทำ hyperkalemic (voltage-dependent) dRTA ซึ่ง urine pH > 5.5 ได้ ต่างจาก hypoaldosteronism",
        ix: ["Ultrasound, ANA, urinalysis"],
        link: "nagma"
      }),
      N("Pseudohypoaldosteronism type 1", "nephro", {
        s: "MR (NR3C2, AD) หรือ ENaC (AR) loss-of-function",
        why: "Salt wasting ในทารก, renin และ aldo สูงมาก",
        ix: ["Genetic test"]
      }),
      N("Pseudohypoaldosteronism type 2 (Gordon syndrome)", "nephro", {
        s: "WNK1, WNK4, KLHL3, CUL3 ทำ NCC ทำงานมาก",
        why: "HTN, hyperK, NAGMA, hypercalciuria, renin ต่ำ ตอบสนอง thiazide ขนาดต่ำได้ดีมาก",
        keys: ["GFR ปกติ", "Family history ของ HTN"],
        ix: ["Renin ต่ำ, aldo ต่ำหรือปกติ, genetic"],
        link: "htn-young"
      })
    ])
  ])
};

/* ===================== HYPONATREMIA ===================== */
TREES.hypona = {
  must: [
    "อาการรุนแรง: อาเจียน ชัก ซึม GCS ลด, onset < 48 ชั่วโมงหรือไม่ทราบ",
    "ปริมาณน้ำและเกลือที่กิน: เบียร์, tea and toast, ดื่มน้ำมาก, ออกกำลังนาน (marathon)",
    "ยา: thiazide, SSRI, SNRI, TCA, carbamazepine, oxcarbazepine, antipsychotic, cyclophosphamide, vincristine, cisplatin, desmopressin, MDMA, PPI",
    "อาการของ HF, cirrhosis, nephrotic, CKD",
    "อาเจียน ท้องเสีย ดื่มน้ำเปล่าแทน",
    "อาการ adrenal insufficiency หรือ hypopituitarism: ใช้ steroid นาน หยุดเอง, ปวดศีรษะ ตามัว, postpartum hemorrhage",
    "ไอ น้ำหนักลด สูบบุหรี่ (SCLC), ประวัติ CNS: head injury, SAH, meningitis, surgery",
    "ปวด คลื่นไส้ หลังผ่าตัด, ได้ hypotonic fluid"
  ],
  tree: N("Hyponatremia", "root", {
    s: "ประเมินอาการเพื่อรักษาฉุกเฉินก่อน แล้ว serum osmolality, urine osmolality, urine Na และ volume status ตามลำดับ",
    why: "Hyponatremia พบบ่อยที่สุดในผู้ป่วยใน การรักษาผิดทาง (ทั้งช้าไปและเร็วไป) ทำให้เกิด cerebral edema หรือ ODS",
    keys: ["Severe symptoms ต้อง 3% saline ก่อนรอผล", "Serum osmolality แยก hypotonic", "Urine osm ≤ 100 mOsm/kg = ADH ถูกกดเหมาะสม (primary polydipsia หรือ low solute intake)", "Urine Na ≤ 30 mmol/L ชี้ low effective arterial volume แต่ใช้ไม่ได้เมื่อได้ diuretic, CKD หรือมี bicarbonaturia และ SIAD ที่กินเกลือน้อยก็มี urine Na ต่ำได้", "Volume status ทางคลินิกแม่นยำต่ำ ใช้ urine Na ช่วย"],
    ix: ["Serum osmolality (measured), glucose, urea, TG, protein", "Urine osmolality, urine Na, urine K", "TSH, AM cortisol", "Uric acid, FE urate, FE urea ถ้าคิด SIAD และใช้ diuretic", "CXR, CT brain ตามข้อบ่งชี้"],
    std: "European (ESE, ESICM, ERBP) 2014 hyponatraemia guideline, US expert panel 2013 (Verbalis)"
  }, [
    N("Severe or moderately severe symptoms", "step", {
      s: "อาเจียน ชัก ซึม หมดสติ, หรือ acute < 48 ชั่วโมง",
      why: "Cerebral edema ทำให้เสียชีวิตเร็วกว่า ODS ในรายที่มี severe symptoms ต้องเพิ่ม Na 5 mmol/L ใน 1 ชั่วโมงแรก",
      keys: ["Severe symptoms (อาเจียน ชัก ซึมมาก coma): 3% NaCl 150 mL IV 20 นาที ซ้ำได้อีก 2 ครั้งจน Na เพิ่ม 5 mmol/L", "Moderately severe symptoms (คลื่นไส้ไม่อาเจียน สับสน ปวดศีรษะ): 3% NaCl 150 mL ครั้งเดียว เป้า Na เพิ่ม 5 mmol/L ใน 24 ชั่วโมง", "เป้า Na เพิ่ม 5 mmol/L ในชั่วโมงแรก", "Limit 10 mmol/L ใน 24 ชั่วโมงแรก, 8 mmol/L ต่อ 24 ชั่วโมงถัดไป", "High ODS risk (Na ≤ 105, hypoK, alcohol, malnutrition, liver disease) ให้ limit 8 mmol/L ต่อ 24 ชั่วโมง"],
      ix: ["Na ทุก 20 นาทีระหว่าง bolus แล้วทุก 2-4 ชั่วโมง", "Urine output ทุกชั่วโมง (aquaresis เสี่ยง overcorrection)"],
      std: "European 2014, US expert panel 2013, SALSA trial (Baek, JAMA Intern Med 2021, n = 178) overcorrection 17.2% ใน rapid intermittent bolus เทียบ 24.2% ใน slow continuous infusion (p = 0.26) และ rapid intermittent bolus ต้อง re-lowering น้อยกว่า"
    }, [
      N("Overcorrection rescue", "nephro", {
        s: "Na เพิ่มเกิน limit ให้ desmopressin กับ D5W",
        why: "Re-lowering ลดความเสี่ยง ODS ได้ในสัตว์ทดลองและ case series",
        keys: ["Desmopressin 2-4 µg IV ทุก 6-8 ชั่วโมง ร่วม D5W 3 mL/kg/h", "Proactive DDAVP clamp ในผู้ที่ high risk"],
        ix: ["Na ทุก 2 ชั่วโมง"]
      })
    ]),
    N("Non-hypotonic hyponatremia", "step", {
      s: "Serum osmolality ≥ 275 mOsm/kg",
      why: "ไม่ต้องจำกัดน้ำหรือให้ saline ต้องแก้ตัวต้นเหตุ",
      keys: ["Measured osm ปกติ: pseudohyponatremia", "Measured osm สูง: glucose, mannitol, glycine", "Urea และ alcohol ทำ measured osm สูงแต่เป็น ineffective osmole: tonicity ยังต่ำ จึงต้องนับเป็น hypotonic hyponatremia"],
      ix: ["Measured osmolality, glucose, TG, total protein", "Direct ISE (blood gas analyzer) เทียบ indirect ISE"]
    }, [
      N("Hypertonic: hyperglycemia and osmotic agents", "adj", {
        s: "Glucose ดึงน้ำออกจากเซลล์",
        why: "Corrected Na เพิ่ม 1.6 mmol/L ทุก glucose 100 mg/dL ที่เกิน 100 (Katz) หรือ 2.4 mmol/L (Hillier) ซึ่งแม่นกว่าโดยเฉพาะเมื่อ glucose > 400 mg/dL",
        ix: ["Corrected Na, effective osmolality"],
        link: "agma"
      }),
      N("Isotonic: TURP and hysteroscopy irrigation", "adj", {
        s: "Glycine, sorbitol, mannitol irrigant",
        why: "Osmolal gap สูงช่วงแรก แล้ว glycine metabolize ทำ hypotonic ทีหลัง",
        ix: ["Osmolal gap, ammonia"]
      }),
      N("Pseudohyponatremia", "adj", {
        s: "TG สูงมาก, paraprotein, lipoprotein X ใน cholestasis, measured ด้วย indirect ISE",
        why: "Myeloma และ Waldenström ทำ protein สูงพร้อม AG ต่ำ",
        keys: ["Measured osm ปกติ", "Direct ISE Na ปกติ"],
        ix: ["Direct ISE Na, TG, total protein, SPEP"],
        link: "mspike"
      })
    ]),
    N("Hypotonic with urine osm ≤ 100 mOsm/kg", "step", {
      s: "ADH ถูกกดถูกต้อง ปัญหาคือ water intake เกินความสามารถขับ",
      why: "Water excretion ต่อวันราวเท่ากับ solute load หารด้วย urine osm ต่ำสุด ดังนั้น solute ต่ำทำให้ขับน้ำได้น้อย",
      keys: ["Urine osm < 100", "Urine Na ต่ำ", "Overcorrection เสี่ยงสูงมากเมื่อได้ solute (เริ่มกินอาหารหรือได้ saline) เพราะเกิด water diuresis ทันที"],
      ix: ["Dietary solute history, urine osm"]
    }, [
      N("Primary polydipsia", "adj", {
        s: "Psychiatric disease, antipsychotic, intake > 12-15 L/d",
        why: "แยกจาก DI ด้วย serum Na ที่ low-normal หรือต่ำ (DI มี Na high-normal หรือสูง) และ stimulated copeptin",
        ix: ["Urine osm, copeptin"],
        link: "thirst"
      }),
      N("Low solute intake: beer potomania and tea and toast", "adj", {
        s: "เบียร์มาก กินโปรตีนและเกลือน้อย, ผู้สูงอายุกินน้อย",
        why: "Solute 250 mOsm/d กับ urine osm 50 ขับน้ำได้เพียงราว 5 L/d",
        ix: ["Urine osm, urea, nutrition"]
      })
    ]),
    N("Hypotonic, urine osm > 100 and urine Na ≤ 30", "step", {
      s: "Low effective arterial blood volume, ADH หลั่งจาก baroreceptor",
      keys: ["Hypovolemic: GI loss, third space", "Hypervolemic: HF, cirrhosis, nephrotic", "FE urea < 35% ช่วยเมื่อได้ diuretic"],
      ix: ["Urine Na, FE urea, BNP, albumin, LFT, UPCR"]
    }, [
      N("Extrarenal volume loss", "adj", {
        s: "อาเจียน ท้องเสีย เสียเลือด ดื่มน้ำเปล่าทดแทน",
        why: "Vomiting ที่มี bicarbonaturia อาจมี urine Na สูง ให้ใช้ urine Cl < 20 แทน",
        ix: ["Urine Cl, response ต่อ 0.9% saline"]
      }),
      N("Heart failure", "adj", {
        s: "Na ต่ำเป็น prognostic marker",
        why: "รักษาด้วย fluid restriction, loop diuretic, GDMT รวม SGLT2i และ tolvaptan ในบางราย",
        ix: ["BNP, echo"],
        link: "dyspnea"
      }),
      N("Cirrhosis", "adj", {
        s: "Splanchnic vasodilation, Na < 130 สัมพันธ์กับ HRS",
        why: "เป็น high-risk ODS กลุ่มหลัก ต้อง limit correction 8 mmol/L/d",
        ix: ["MELD-Na, albumin"],
        link: "abdomen"
      }),
      N("Nephrotic syndrome", "nephro", {
        s: "พบไม่บ่อย มักเป็น underfill ใน MCD ที่ albumin ต่ำมาก หรือเกิดจาก diuretic",
        ix: ["Albumin, UPCR"],
        link: "nephrotic"
      })
    ]),
    N("Hypotonic, urine osm > 100 and urine Na > 30", "step", {
      s: "Diuretic, kidney disease, SIAD, adrenal, thyroid, salt wasting",
      why: "ถามยาขับปัสสาวะก่อน แล้วตัด adrenal และ hypothyroid ก่อนวินิจฉัย SIAD",
      keys: ["ใช้ diuretic อยู่: FE urate และ FE urea ช่วย", "Euvolemic ไม่มี diuretic: SIAD หลังตัด cortisol, TSH", "Hypovolemic: cerebral หรือ renal salt wasting, mineralocorticoid deficiency"],
      ix: ["AM cortisol, TSH", "Uric acid, FE urate > 12%, FE urea > 55% สนับสนุน SIAD", "Response ต่อ 0.9% saline 2 L"]
    }, [
      N("Thiazide-associated hyponatremia", "nephro", {
        s: "ผู้หญิงสูงอายุ น้ำหนักตัวน้อย ภายในสัปดาห์แรกถึงหลายเดือน",
        why: "Thiazide ไม่รบกวน medullary gradient จึงยัง concentrate ได้ และอาจเกิดซ้ำเมื่อ rechallenge",
        keys: ["K ต่ำร่วม", "Recurrence เมื่อให้ซ้ำ"],
        ix: ["Drug history, K, Mg"]
      }),
      N("SIAD", "nephro", {
        s: "Euvolemic, urine osm > 100, urine Na > 30 ขณะกินปกติ, ไม่มี diuretic, cortisol และ TSH ปกติ",
        why: "หา cause: malignancy (SCLC), CNS, pulmonary (pneumonia, TB), drug, pain, nausea, postoperative, HIV",
        keys: ["Uric acid < 4 mg/dL", "0.9% saline มักไม่ทำให้ Na ขึ้น และทำให้ Na ลดลงได้เมื่อ urine (Na + K) สูงกว่า 154 mmol/L", "Furst ratio (UNa + UK)/PNa > 1 = fluid restriction อย่างเดียวมักไม่ได้ผล"],
        ix: ["CT chest ถ้า risk, drug review", "Furst ratio"],
        std: "Schwartz-Bartter criteria, European 2014, รักษาด้วย fluid restriction, urea, tolvaptan, empagliflozin (Refardt JASN 2020, n = 88)"
      }),
      N("Secondary adrenal insufficiency", "adj", {
        s: "Glucocorticoid deficiency ทำให้ CRH และ ADH หลั่งมาก",
        why: "Exogenous steroid ที่หยุดเอง, pituitary apoplexy, Sheehan, ICI hypophysitis, K ปกติเพราะ aldosterone ยังอยู่",
        keys: ["Hypoglycemia, hypotension, eosinophilia"],
        ix: ["AM cortisol, ACTH, pituitary MRI"],
        link: "cushingoid"
      }),
      N("Primary adrenal insufficiency", "adj", {
        s: "Mineralocorticoid และ glucocorticoid deficiency",
        keys: ["HyperK, hyperpigmentation, hypotension"],
        ix: ["AM cortisol, ACTH, renin, cosyntropin test"],
        link: "hyperk"
      }),
      N("Severe hypothyroidism", "adj", {
        s: "Myxedema ที่ TSH สูงมาก",
        why: "Hypothyroidism เล็กน้อยไม่ทำ hyponatremia อย่าหยุดหาสาเหตุอื่น",
        ix: ["TSH, free T4"]
      }),
      N("Cerebral and renal salt wasting", "nephro", {
        s: "SAH, neurosurgery ที่มี volume depletion จริง, cisplatin",
        why: "แยกจาก SIAD ยาก FE urate ยังสูงหลังแก้ Na ใน salt wasting แต่ปกติใน SIAD",
        ix: ["Volume assessment, FE urate หลังแก้ Na"]
      }),
      N("Kidney disease and mineralocorticoid deficiency", "nephro", {
        s: "Advanced CKD, salt-losing nephropathy, hyporeninemic state",
        ix: ["eGFR, renin, aldosterone"],
        link: "risingcr"
      }),
      N("Nephrogenic SIAD and reset osmostat", "nephro", {
        s: "V2R gain-of-function (ADH ต่ำ), reset osmostat ที่ Na คงที่ 125-130",
        why: "Reset osmostat ขับ water load ได้ปกติ ไม่ต้องรักษา",
        ix: ["Copeptin ต่ำใน NSIAD, water load test"]
      }),
      N("Exercise-associated hyponatremia", "adj", {
        s: "Marathon, ultra-endurance ที่ดื่มน้ำเกิน",
        ix: ["Body weight เพิ่ม, Na ก่อนให้สารน้ำ"]
      })
    ])
  ])
};

/* ===================== HYPERNATREMIA ===================== */
TREES.hyperna = {
  must: [
    "เข้าถึงน้ำได้ไหม: ผู้สูงอายุติดเตียง, dementia, ICU, intubated, ทารก",
    "Polyuria, nocturia, กระหายน้ำ, ชอบดื่มน้ำเย็น (central DI)",
    "Head trauma, pituitary surgery, Sheehan, sarcoidosis, histiocytosis, metastasis",
    "ยา: lithium, demeclocycline, amphotericin, foscarnet, ifosfamide, cidofovir",
    "Hypercalcemia, hypokalemia, obstruction relief",
    "เหงื่อ ท้องเสียเป็นน้ำ (osmotic: lactulose), NG drainage",
    "Hypertonic saline, NaHCO3, enteral feeding ที่มีโปรตีนสูงโดยไม่ได้น้ำเพิ่ม",
    "Glucose สูง, mannitol, urea จาก recovery ของ AKI"
  ],
  tree: N("Hypernatremia", "root", {
    s: "เกือบทุกรายคือ water deficit ที่ thirst หรือการเข้าถึงน้ำเสีย ใช้ urine osmolality แยก renal water loss, solute diuresis และ extrarenal loss",
    why: "Hypernatremia ใน long case มักเป็นประตูสู่ DI จาก lithium, hypercalcemia หรือ pituitary disease",
    keys: ["Urine osm < 300 mOsm/kg (หรือ < serum osm) = DI", "Urine osm 300-600 = partial DI หรือ solute diuresis", "Urine osm > 600-800 = ไตทำงานถูกต้อง loss อยู่นอกไต หรือ intake ไม่พอ", "Urine output > 3 L/d หรือ > 50 mL/kg/d = polyuria"],
    ix: ["Serum osmolality, glucose, Ca, K, urea", "Urine osmolality, urine Na, K, urine volume 24 ชั่วโมง", "Electrolyte-free water clearance", "Desmopressin response, copeptin"],
    std: "International consensus 2022 เปลี่ยนชื่อเป็น AVP deficiency (central) และ AVP resistance (nephrogenic)"
  }, [
    N("Correction principles", "step", {
      s: "Chronic (> 48 ชั่วโมง) ลด Na ไม่เกิน 10-12 mmol/L ต่อวัน, acute แก้เร็วได้",
      why: "Chronic hypernatremia ที่ลดเร็วทำ cerebral edema ในเด็ก แต่ข้อมูลผู้ใหญ่ชี้ว่าเร็วเกินไม่สัมพันธ์กับ harm ชัด และช้าไปสัมพันธ์กับ mortality",
      keys: ["Water deficit = TBW × (Na/140 − 1)", "เติม ongoing loss และ insensible loss", "D5W, enteral free water, หรือ hypotonic saline ถ้า volume depleted"],
      ix: ["Na ทุก 4-6 ชั่วโมง"],
      std: "Adrogué-Madias formula: Na ที่เปลี่ยนต่อ infusate 1 L = (infusate Na + K − serum Na) / (TBW + 1) ใช้ประมาณเท่านั้น ต้องวัด Na ซ้ำเสมอ"
    }),
    N("Urine osm low: AVP deficiency or resistance", "step", {
      s: "Urine osm < 300 mOsm/kg ขณะ hypernatremia",
      why: "Desmopressin test แยก central กับ nephrogenic",
      keys: ["Urine osm เพิ่ม > 50% หลัง desmopressin: central", "เพิ่ม < 10-15%: nephrogenic", "Baseline copeptin > 21.4 pmol/L: nephrogenic"],
      ix: ["Desmopressin 1-4 µg IV หรือ SC แล้ววัด urine osm 1-2 ชั่วโมง", "Copeptin, pituitary MRI (bright spot)"],
      std: "Fenske NEJM 2018: hypertonic saline-stimulated copeptin > 4.9 pmol/L แยก primary polydipsia จาก AVP deficiency (accuracy 96.5%), Refardt NEJM 2023: hypertonic saline ถูกต้อง 95.6% เทียบ arginine 74.4% จึงใช้ hypertonic saline เป็นมาตรฐาน",
      link: "polyuria"
    }, [
      N("AVP deficiency (central DI)", "adj", {
        s: "Idiopathic หรือ autoimmune, post-surgery (triphasic), trauma, tumor (craniopharyngioma, germinoma), infiltrative (LCH, sarcoid, IgG4), Sheehan",
        why: "ถ้า thirst center เสียร่วม (adipsic DI) เสี่ยง hypernatremia รุนแรง",
        keys: ["Onset ฉับพลัน, ชอบน้ำเย็น", "Pituitary bright spot หาย", "Anterior pituitary deficiency ร่วม"],
        ix: ["Pituitary MRI, anterior pituitary hormones, ACE, IgG4, hCG และ AFP ใน CSF"],
        link: "headache"
      }),
      N("Lithium-induced AVP resistance", "nephro", {
        s: "Lithium เข้า principal cell ผ่าน ENaC ลด AQP2",
        why: "พบราว 20-40% ของผู้ใช้ระยะยาว อาจคงอยู่หลังหยุดยา, amiloride ลดการเข้าเซลล์",
        keys: ["CKD จาก chronic tubulointerstitial nephritis และ microcysts", "Hypercalcemia จาก PHPT ร่วม"],
        ix: ["Lithium level, Ca, PTH, MRI kidney หา microcysts"]
      }),
      N("Electrolyte-induced AVP resistance", "nephro", {
        s: "Hypercalcemia (> 11 mg/dL) และ hypokalemia เรื้อรัง",
        why: "Ca กระตุ้น CaSR ลด AQP2 และ NKCC2, hypoK ลด AQP2",
        ix: ["Ca, K"],
        link: "hyperca"
      }),
      N("Tubulointerstitial and post-obstructive", "nephro", {
        s: "Sickle cell, amyloid, Sjögren, obstruction relief, recovery ATN, ifosfamide, foscarnet",
        ix: ["Ultrasound, urinalysis"]
      }),
      N("Congenital nephrogenic DI", "nephro", {
        s: "AVPR2 (X-linked) หรือ AQP2",
        why: "เริ่มในวัยทารก hydronephrosis จาก polyuria รักษาด้วย thiazide, amiloride, NSAID, low solute",
        ix: ["Genetic test"]
      }),
      N("Gestational DI", "adj", {
        s: "Placental vasopressinase ในไตรมาส 3 พบร่วมกับ AFLP หรือ HELLP ได้ เพราะตับทำลาย vasopressinase ลดลง",
        why: "ตอบสนอง desmopressin ซึ่งไม่ถูกทำลายโดย vasopressinase",
        link: "pregnancy"
      })
    ]),
    N("Urine osm intermediate: solute diuresis", "step", {
      s: "Urine osm 300-600 กับ urine output สูง, total solute excretion > 1,000 mOsm/d",
      why: "Total solute excretion (urine osm × urine volume) แยก solute diuresis จาก water diuresis",
      keys: ["Glucose สูง", "Urea สูงจาก high-protein feeding หรือ catabolism", "Saline load"],
      ix: ["24-h urine osm × volume", "Urine glucose, urine urea, urine Na"]
    }, [
      N("Glucose and mannitol diuresis", "adj", {
        s: "Uncontrolled DM, HHS, SGLT2i, mannitol",
        why: "HHS มี free water deficit ราว 100-220 mL/kg",
        ix: ["Glucose, effective osmolality"],
        std: "ADA 2024 hyperglycemic crises consensus"
      }),
      N("Urea diuresis", "nephro", {
        s: "High-protein tube feed, steroid catabolism, GI bleed, recovery AKI",
        why: "พบบ่อยใน ICU และ neuro ward",
        ix: ["Urine urea > 50% ของ urine osm"]
      }),
      N("Saline diuresis", "nephro", {
        s: "Normal saline ปริมาณมาก ทำให้ urine Na สูงแต่ electrolyte-free water clearance บวก",
        ix: ["Urine Na + K เทียบ serum Na"]
      })
    ]),
    N("Urine osm high: extrarenal loss or inadequate intake", "step", {
      s: "Urine osm > 600-800 mOsm/kg, urine volume ต่ำ",
      why: "ไตทำงานถูกต้อง ปัญหาคือ thirst หรือการเข้าถึงน้ำ",
      keys: ["Urine Na < 20 mmol/L ชี้ volume loss ร่วม", "Urine Na > 100 mmol/L ร่วม volume overload ให้คิด Na gain (ดู node Sodium gain)"]
    }, [
      N("Impaired thirst or access", "adj", {
        s: "ผู้สูงอายุ dementia, stroke, intubated, adipsia จาก hypothalamic lesion",
        why: "เป็นสาเหตุที่พบบ่อยที่สุด และ hypernatremia ที่เกิดขึ้นระหว่างนอนโรงพยาบาลสะท้อนการให้น้ำไม่พอ",
        ix: ["Fluid balance chart"],
        link: "ams"
      }),
      N("GI loss of hypotonic fluid", "adj", {
        s: "Osmotic diarrhea (lactulose, viral), NG drainage",
        why: "Secretory diarrhea isotonic จึงไม่ค่อยทำ hypernatremia",
        ix: ["Stool osmolal gap"],
        link: "diarrhea"
      }),
      N("Skin and respiratory loss", "adj", {
        s: "ไข้, burns, เหงื่อ, hyperventilation",
        ix: ["Clinical"]
      })
    ]),
    N("Sodium gain", "step", {
      s: "Hypertonic saline, NaHCO3, salt poisoning, dialysate error, primary aldosteronism (Na สูงเล็กน้อย)",
      why: "Urine osm สูงเหมือน extrarenal water loss แต่ urine Na สูงมากและมี volume overload",
      keys: ["Volume overload", "Urine Na > 100 mmol/L"],
      ix: ["Urine Na, drug and fluid review"]
    })
  ])
};

/* ===================== HYPERCALCEMIA ===================== */
TREES.hyperca = {
  must: [
    "อาการ: กระหายน้ำ ปัสสาวะมาก ท้องผูก คลื่นไส้ ซึม สับสน (stones, bones, groans, moans)",
    "นิ่วไต, กระดูกหัก, ปวดกระดูก, peptic ulcer, pancreatitis",
    "Ca เคยตรวจย้อนหลัง, ประวัติครอบครัว hypercalcemia หรือผ่าตัด parathyroid ไม่หาย (FHH, MEN1, MEN2A)",
    "ยา: thiazide, lithium, vitamin D, calcitriol, calcium carbonate กับ antacid, vitamin A, teriparatide, abaloparatide, theophylline",
    "น้ำหนักลด ไอ ไอเป็นเลือด ก้อนที่เต้านม ปวดหลัง (malignancy, myeloma)",
    "ไข้เรื้อรัง ต่อมน้ำเหลืองโต ไอ (TB, sarcoid, lymphoma, fungal)",
    "Immobilization, thyrotoxicosis, adrenal insufficiency",
    "AKI ที่กำลัง recovery จาก rhabdomyolysis"
  ],
  tree: N("Hypercalcemia", "root", {
    s: "ยืนยัน true hypercalcemia ด้วย ionized Ca แล้วแยก PTH-dependent กับ PTH-independent จากนั้นใช้ PTHrP, 25(OH)D, 1,25(OH)2D และ SPEP แยกกลไก",
    why: "PTH เป็นจุดแยกเดียวที่ตัด DDx ได้ครึ่งหนึ่งทันที และ hypercalcemia มีผลต่อไตโดยตรง (AKI, nephrogenic DI, nephrocalcinosis, stones)",
    keys: ["PTH สูงหรือปกติสูงไม่เหมาะสม (> 20-25 pg/mL ขณะ Ca สูง) = PTH-dependent", "PTH ต่ำ (< 20 pg/mL) = PTH-independent", "Ca > 14 mg/dL มักเป็น malignancy, vitamin D หรือ milk-alkali", "PHPT มัก Ca < 12 mg/dL และเป็นเรื้อรัง"],
    ix: ["Ionized Ca หรือ albumin-corrected Ca, PO4, Mg, Cr", "Intact PTH", "PTHrP, 25(OH)D, 1,25(OH)2D", "SPEP, serum FLC, ALP", "24-h urine Ca และ Cr (CaCrCR)", "TSH, AM cortisol, CXR"],
    std: "Fifth International Workshop on PHPT 2022, Endocrine Society 2023 hypercalcemia of malignancy guideline"
  }, [
    N("Acute management", "step", {
      s: "Ca > 14 mg/dL หรือมีอาการ ต้องรักษาก่อนรอผล",
      why: "Volume depletion จาก nephrogenic DI ทำ GFR ลด Ca ยิ่งขึ้น เป็นวงจร",
      keys: ["Isotonic saline เป้า urine output 100-150 mL/h", "Calcitonin 4 IU/kg ทำงานใน 4-6 ชั่วโมง แต่ tachyphylaxis 48 ชั่วโมง", "Zoledronic acid 4 mg (ปรับตาม Cr) หรือ denosumab 120 mg", "Glucocorticoid สำหรับ 1,25D-mediated", "Hemodialysis (low-Ca dialysate) ถ้า Ca > 18 mg/dL ร่วมอาการทางระบบประสาท หรือมี AKI หรือ HF ที่ทำให้ให้ saline ไม่ได้"],
      ix: ["Ca ทุก 6-12 ชั่วโมง, urine output, Cr"],
      std: "Endocrine Society 2023 hypercalcemia of malignancy guideline"
    }),
    N("Pseudohypercalcemia", "step", {
      s: "Total Ca สูงแต่ ionized Ca ปกติ",
      keys: ["Albumin สูงจาก dehydration", "Paraprotein ที่จับ Ca (myeloma)"],
      ix: ["Ionized Ca"]
    }, [
      N("Paraprotein binding", "nephro", {
        s: "Myeloma หรือ Waldenström ที่ IgG หรือ IgM จับ Ca",
        why: "เกิดร่วมกับ hypercalcemia จริงจาก osteolysis ได้ จึงต้องวัด ionized Ca",
        ix: ["Ionized Ca, SPEP"],
        link: "mspike"
      })
    ]),
    N("PTH-dependent", "step", {
      s: "PTH สูงหรือปกติสูงขณะ Ca สูง",
      why: "แยก PHPT กับ FHH ด้วย CaCrCR ก่อนส่งผ่าตัด",
      keys: ["CaCrCR < 0.01 ชี้ FHH", "CaCrCR > 0.02 ชี้ PHPT", "CaCrCR 0.01-0.02 เป็น gray zone และ PHPT ที่มี vitamin D deficiency, CKD, Ca intake ต่ำ หรือได้ thiazide ก็มี CaCrCR < 0.01 ได้ จึงแก้ vitamin D แล้ววัดซ้ำ หรือส่ง genetic ก่อนสรุป", "ประวัติ lithium หรือ CKD ระยะท้าย"],
      ix: ["24-h urine Ca, CaCrCR = (UCa × SCr)/(SCa × UCr)", "Sestamibi และ neck ultrasound หรือ 4D-CT เพื่อ localize เมื่อจะผ่าตัด", "DXA ที่ distal radius, hip, spine"],
      std: "Fifth International Workshop on PHPT 2022"
    }, [
      N("Primary hyperparathyroidism", "nephro", {
        s: "Single adenoma 80-85%, multigland hyperplasia, carcinoma (Ca และ PTH สูงมาก)",
        why: "Surgery indications ตาม Workshop 2022: Ca > 1 mg/dL เหนือ ULN, T-score ≤ −2.5 หรือ vertebral fracture, eGFR < 60, hypercalciuria > 250 mg/d (หญิง) หรือ > 300 mg/d (ชาย), stone หรือ nephrocalcinosis, อายุ < 50",
        keys: ["Nephrolithiasis, nephrocalcinosis", "Hypophosphatemia, hyperchloremic acidosis เล็กน้อย", "Normocalcemic PHPT ต้องตัด vitamin D deficiency และ CKD ก่อน"],
        ix: ["Imaging เพื่อ localize ไม่ใช่เพื่อวินิจฉัย", "MEN1 หรือ CDC73 genetic ถ้าอายุ < 30, multigland หรือ family history"],
        std: "Fifth International Workshop on PHPT 2022",
        link: "stone"
      }),
      N("Familial hypocalciuric hypercalcemia", "nephro", {
        s: "CaSR loss-of-function (FHH1), GNA11 (FHH2), AP2S1 (FHH3)",
        why: "ไม่ต้องผ่าตัด ผ่าตัดแล้วไม่หาย ต้องแยกให้ได้ก่อนเสมอ",
        keys: ["CaCrCR < 0.01", "Ca สูงตลอดชีวิต มักไม่มี complication", "Family history"],
        ix: ["CaSR genetic, Ca ในญาติสายตรง"]
      }),
      N("Tertiary hyperparathyroidism", "nephro", {
        s: "Autonomous parathyroid หลัง CKD นาน โดยเฉพาะหลัง KT",
        why: "Hypercalcemia หลัง KT พบบ่อยในปีแรก และทำ graft dysfunction ได้",
        ix: ["PTH, PO4, parathyroid imaging"],
        std: "KDIGO 2017 CKD-MBD",
        link: "kt-late"
      }),
      N("Lithium-associated hyperparathyroidism", "nephro", {
        s: "Lithium เปลี่ยน set point ของ CaSR",
        why: "ร่วม nephrogenic DI และ CKD จาก lithium ใน case เดียวกันได้",
        ix: ["Lithium level"],
        link: "hyperna"
      })
    ]),
    N("PTH-independent: PTHrP-mediated", "step", {
      s: "Humoral hypercalcemia of malignancy",
      keys: ["PTH ต่ำ, PTHrP สูง", "PO4 ต่ำ", "Malignancy มักชัดเจนแล้ว"],
      ix: ["PTHrP, CT chest abdomen"]
    }, [
      N("Squamous cell carcinoma and solid tumors", "adj", {
        s: "Lung SCC, head and neck, esophagus, renal cell, breast, ovary, bladder",
        why: "สาเหตุที่พบบ่อยที่สุดของ hypercalcemia ในผู้ป่วยใน prognosis มักไม่ดี",
        ix: ["Imaging, biopsy"],
        link: "onco"
      }),
      N("HTLV-1 adult T-cell leukemia and lymphoma, NET", "adj", {
        s: "PTHrP จาก hematologic malignancy และ pancreatic NET",
        ix: ["HTLV-1 serology, peripheral smear"],
        link: "lymphnode"
      })
    ]),
    N("PTH-independent: 1,25(OH)2D-mediated", "step", {
      s: "1,25D สูง จาก extrarenal 1α-hydroxylase หรือ CYP24A1 deficiency",
      why: "Granulomatous disease และ lymphoma ตอบสนอง glucocorticoid ดี และ sunlight หรือ vitamin D supplement ทำให้ทุกสาเหตุในกลุ่มนี้แย่ลง",
      keys: ["1,25D สูง, 25D ปกติ", "PO4 ปกติหรือสูง", "Hypercalciuria เด่น"],
      ix: ["1,25(OH)2D, ACE, CT chest, tissue biopsy"]
    }, [
      N("Sarcoidosis", "adj", {
        s: "Hilar adenopathy, uveitis, skin lesion, granulomatous interstitial nephritis",
        why: "ไตเกี่ยวได้ทั้ง nephrocalcinosis และ granulomatous TIN",
        ix: ["CT chest, ACE, biopsy non-caseating granuloma"],
        link: "pyuria"
      }),
      N("Tuberculosis and fungal infection", "adj", {
        s: "TB, histoplasmosis, coccidioidomycosis, PJP",
        why: "ต้องตัด TB ก่อนให้ steroid โดยเฉพาะในประเทศไทย",
        ix: ["AFB, IGRA, tissue biopsy"],
        link: "fever"
      }),
      N("Lymphoma", "adj", {
        s: "Hodgkin และ non-Hodgkin lymphoma",
        ix: ["CT, LDH, biopsy"],
        link: "lymphnode"
      }),
      N("CYP24A1 or SLC34A1 mutation", "nephro", {
        s: "ลด 1,25D catabolism, idiopathic infantile hypercalcemia หรือผู้ใหญ่ที่ stone ซ้ำ",
        why: "อาการแย่ลงเมื่อตั้งครรภ์หรือได้ vitamin D",
        ix: ["24,25(OH)2D ต่ำ, 25D/24,25D ratio สูง, genetic"],
        link: "stone"
      })
    ]),
    N("PTH-independent: osteolytic and others", "step", {
      s: "PTHrP และ 1,25D ไม่สูง",
      keys: ["Bone pain, anemia, AKI ชี้ myeloma", "25D > 150 ng/mL ชี้ vitamin D intoxication", "Metabolic alkalosis กับ AKI ชี้ milk-alkali"]
    }, [
      N("Multiple myeloma and bone metastasis", "nephro", {
        s: "Local osteolysis ผ่าน RANKL และ cytokine",
        why: "Hypercalcemia ร่วม cast nephropathy เป็น CRAB ที่ออกสอบบ่อย",
        keys: ["Anemia, AKI, lytic lesion", "AG ต่ำ"],
        ix: ["SPEP, immunofixation, serum FLC, whole-body low-dose CT"],
        std: "IMWG 2014 myeloma criteria",
        link: "mspike"
      }),
      N("Vitamin D intoxication", "adj", {
        s: "Ergocalciferol หรือ cholecalciferol ขนาดสูงมาก, compounding error",
        why: "25D มี half-life ยาว hypercalcemia อาจอยู่นานหลายสัปดาห์",
        ix: ["25(OH)D > 150 ng/mL"]
      }),
      N("Calcium-alkali syndrome", "nephro", {
        s: "Calcium carbonate ปริมาณมาก ร่วม thiazide หรือ volume depletion",
        why: "Triad hypercalcemia, metabolic alkalosis, AKI ที่ PTH ถูกกด พบบ่อยขึ้นจากการใช้ calcium เพื่อกระดูก",
        ix: ["HCO3, PTH ต่ำ, drug history"],
        link: "metalk"
      }),
      N("Thyrotoxicosis and adrenal insufficiency", "adj", {
        s: "Bone resorption เพิ่ม หรือ volume depletion",
        ix: ["TSH, AM cortisol"]
      }),
      N("Immobilization and Paget disease", "adj", {
        s: "Bed-ridden โดยเฉพาะ high bone turnover",
        ix: ["ALP, bone scan"],
        link: "bonepain"
      }),
      N("Drugs", "adj", {
        s: "Thiazide (unmask PHPT), vitamin A, retinoid, teriparatide, abaloparatide, theophylline",
        why: "Thiazide ทำ Ca สูงเล็กน้อย ถ้าหยุดแล้วยังสูงใน 3 เดือนให้คิด PHPT",
        ix: ["Ca ซ้ำหลังหยุด thiazide"]
      }),
      N("Recovery phase of rhabdomyolysis AKI", "nephro", {
        s: "Ca ที่ตกตะกอนในกล้ามเนื้อถูกปล่อยกลับ ร่วม 1,25D สูงขึ้น",
        why: "ไม่ให้ Ca แก้ hypocalcemia ระยะแรก ยกเว้นมีอาการหรือ hyperkalemia ที่มี ECG change เพราะ Ca ที่ให้ไปเพิ่ม rebound hypercalcemia ระยะ recovery",
        ix: ["CK, Ca trend"],
        link: "myalgia"
      })
    ])
  ])
};

/* ===================== HYPOCALCEMIA ===================== */
TREES.hypoca = {
  must: [
    "ชารอบปาก ปลายมือปลายเท้า ตะคริว เกร็ง ชัก, Chvostek และ Trousseau sign",
    "ผ่าตัดคอ: thyroidectomy, parathyroidectomy, radical neck dissection",
    "Autoimmune disease อื่น, mucocutaneous candidiasis, Addison (autoimmune polyendocrine syndrome type 1)",
    "ยา: bisphosphonate, denosumab (โดยเฉพาะใน CKD), cinacalcet, etelcalcetide, foscarnet, cisplatin, PPI นาน, phenytoin",
    "Diarrhea เรื้อรัง malabsorption, bariatric surgery, ไม่โดนแดด",
    "ปวดท้องรุนแรง (pancreatitis), sepsis, massive transfusion",
    "Chemotherapy (TLS), rhabdomyolysis",
    "ประวัติครอบครัว hypocalcemia, ภาวะผิดรูปของหน้า หัวใจพิการแต่กำเนิด (22q11)"
  ],
  tree: N("Hypocalcemia", "root", {
    s: "ยืนยันด้วย ionized Ca แล้วแก้ Mg ก่อน จากนั้นแยกด้วย PTH: ต่ำ (hypoparathyroidism) หรือสูง (secondary response) และใช้ PO4 กับ 25D แยกต่อ",
    why: "Hypocalcemia ในผู้ป่วยไตมักเกิดจาก CKD-MBD หรือ denosumab แต่ต้องแยกจาก hypoparathyroidism และ hungry bone ที่รักษาต่างกัน",
    keys: ["Corrected Ca = Ca + 0.8 × (4 − albumin), ใช้ ionized Ca เมื่อ albumin ต่ำหรือ acid-base ผิดปกติ", "Mg < 1 mg/dL ทำทั้ง PTH secretion และ action เสีย", "PTH ต่ำหรือปกติต่ำ + PO4 สูง = hypoparathyroidism", "PTH สูง + PO4 ต่ำ = vitamin D deficiency", "PTH สูง + PO4 สูง = CKD หรือ PTH resistance"],
    ix: ["Ionized Ca, albumin, Mg, PO4, Cr", "Intact PTH", "25(OH)D, 1,25(OH)2D", "24-h urine Ca", "ALP, amylase, lipase, CK", "ECG: QT prolongation"],
    std: "Second International Workshop on hypoparathyroidism 2022, KDIGO 2017 CKD-MBD"
  }, [
    N("Acute management", "step", {
      s: "Tetany, seizure, laryngospasm, QT prolong หรือ ionized Ca < 0.8 mmol/L",
      keys: ["Calcium gluconate 10% 10-20 mL IV 10-20 นาที", "ตามด้วย infusion 0.5-1.5 mg elemental Ca/kg/h", "แก้ Mg ร่วมเสมอ", "ระวัง bicarbonate ตกตะกอนกับ Ca ใน line เดียวกัน"],
      ix: ["Ionized Ca ทุก 4-6 ชั่วโมง, ECG"],
      std: "Society for Endocrinology emergency guidance for acute hypocalcaemia"
    }),
    N("Pseudohypocalcemia and redistribution", "step", {
      s: "Total Ca ต่ำแต่ ionized Ca ปกติ หรือ ionized Ca ต่ำจาก binding",
      keys: ["Hypoalbuminemia", "Alkalosis เพิ่ม Ca binding", "Citrate, EDTA contamination, gadolinium บางชนิด"]
    }, [
      N("Hypoalbuminemia", "adj", {
        s: "Nephrotic, cirrhosis, critical illness",
        why: "สาเหตุที่พบบ่อยที่สุดของ total Ca ต่ำ และไม่ต้องรักษา",
        ix: ["Ionized Ca"],
        link: "nephrotic"
      }),
      N("Citrate and alkalemia", "adj", {
        s: "Massive transfusion, citrate anticoagulation ใน CRRT, hyperventilation",
        why: "Citrate accumulation ใน liver failure ให้ total/ionized Ca ratio > 2.5",
        ix: ["Total/ionized Ca ratio, blood gas"]
      })
    ]),
    N("Low PTH: hypoparathyroidism", "step", {
      s: "PTH ต่ำหรือปกติต่ำขณะ Ca ต่ำ, PO4 สูง",
      why: "ต้องระวัง hypercalciuria และ nephrocalcinosis เมื่อให้ Ca กับ calcitriol เพราะไม่มี PTH ช่วย reabsorb Ca ที่ไต",
      keys: ["Post-surgical พบบ่อยที่สุด (> 75%)", "Hypercalciuria ขณะ Ca ต่ำก่อนรักษาชี้ autosomal dominant hypocalcemia type 1 (ADH1)", "Autoimmune features"],
      ix: ["PTH, PO4, Mg, 24-h urine Ca", "Anti-CaSR, AIRE genetic, CaSR genetic"],
      std: "Second International Workshop on hypoparathyroidism 2022: เป้า Ca ปกติต่ำ, urine Ca ปกติ, PO4 ปกติ, PTH replacement ในรายที่คุมด้วย conventional therapy ไม่ได้ ปัจจุบันคือ palopegteriparatide (FDA 2024) ส่วน rhPTH(1-84) เลิกผลิตปลายปี 2024"
    }, [
      N("Post-surgical hypoparathyroidism", "adj", {
        s: "Thyroidectomy หรือ parathyroidectomy, chronic ถ้าเกิน 12 เดือน",
        why: "สาเหตุที่พบบ่อยที่สุด",
        ix: ["PTH หลังผ่าตัด"]
      }),
      N("Autoimmune and APECED (autoimmune polyendocrine syndrome type 1)", "adj", {
        s: "AIRE mutation: hypoparathyroidism, Addison, mucocutaneous candidiasis",
        ix: ["AIRE genetic, adrenal antibody"]
      }),
      N("Genetic: 22q11, ADH1, GCM2, HDR", "nephro", {
        s: "DiGeorge, CaSR gain-of-function (ADH1), HDR syndrome (GATA3: deafness, renal dysplasia)",
        why: "ADH1 ทำ hypercalciuria และ Bartter-like, การให้ calcitriol ทำ nephrocalcinosis",
        ix: ["Genetic panel, renal ultrasound, audiometry"],
        link: "hearing"
      }),
      N("Infiltration and radiation", "adj", {
        s: "Hemochromatosis, Wilson, thalassemia iron overload, metastasis, และหลัง radioactive iodine หรือ neck irradiation (พบน้อย)",
        ix: ["Ferritin, ceruloplasmin"]
      }),
      N("Magnesium disorders", "nephro", {
        s: "Mg < 1 mg/dL กด PTH secretion และทำ PTH resistance, Mg สูงมากก็กด PTH",
        why: "Ca มักแก้ไม่ขึ้นจนกว่าจะแก้ Mg",
        ix: ["Serum Mg, FE Mg"],
        link: "mg"
      })
    ]),
    N("High PTH: secondary response", "step", {
      s: "PTH สูงขณะ Ca ต่ำ ใช้ PO4 และ 25D แยกต่อ",
      keys: ["PO4 ต่ำ: vitamin D deficiency หรือ resistance", "PO4 สูง: CKD, PTH resistance, PO4 load", "Drug หรือ acute illness"]
    }, [
      N("Vitamin D deficiency and malabsorption", "adj", {
        s: "25(OH)D < 12 ng/mL, bariatric surgery, celiac, pancreatic insufficiency",
        why: "ทำ osteomalacia: bone pain, proximal myopathy, Looser zone, ALP สูง",
        ix: ["25(OH)D, ALP, urine Ca ต่ำ"],
        link: "bonepain"
      }),
      N("CKD-MBD", "nephro", {
        s: "1,25D ต่ำ, PO4 คั่ง, FGF23 สูง, skeletal PTH resistance",
        why: "KDIGO 2017 ไม่ได้ให้แก้ hypocalcemia ทุกราย: mild asymptomatic hypocalcemia (เช่นจาก calcimimetic) ยอมรับได้เพื่อเลี่ยง calcium load ส่วนรายที่มีอาการหรือรุนแรงต้องแก้",
        ix: ["PO4, PTH trend, 25D, ALP"],
        std: "KDIGO 2017 CKD-MBD update",
        link: "hd-mbd"
      }),
      N("Pseudohypoparathyroidism", "nephro", {
        s: "GNAS (PHP1A, AHO: short stature, brachydactyly, obesity), PHP1B",
        why: "PTH สูง PO4 สูงเหมือน CKD แต่ GFR ปกติ",
        ix: ["GNAS methylation และ genetic"],
        link: "shortstature"
      }),
      N("Vitamin D-dependent rickets", "nephro", {
        s: "CYP27B1 (VDDR1A), CYP2R1, VDR (VDDR2, alopecia)",
        ix: ["1,25D ต่ำใน 1A, สูงมากใน 2"]
      }),
      N("Phosphate load and tissue breakdown", "nephro", {
        s: "TLS, rhabdomyolysis ระยะแรก, phosphate enema",
        why: "Ca ต่ำจาก Ca-PO4 precipitation ไม่ให้ Ca ในรายที่ไม่มีอาการเพราะเพิ่ม metastatic calcification ให้เฉพาะเมื่อมี tetany, ชัก หรือ arrhythmia ในขนาดต่ำที่สุดที่คุมอาการได้",
        std: "Cairo-Bishop TLS: Ca ≤ 7 mg/dL หรือลด 25%",
        link: "phos"
      }),
      N("Acute pancreatitis and sepsis", "adj", {
        s: "Saponification, PTH resistance, cytokine",
        ix: ["Lipase, procalcitonin"],
        link: "abdpain"
      })
    ]),
    N("PTH variable: recent surgery or drug", "step", {
      s: "ดูประวัติก่อนแปล PTH: PTH ต่ำหรือปกติช่วงแรกหลัง parathyroidectomy, ลดลงจากเดิมเมื่อได้ calcimimetic และสูงขึ้นเมื่อได้ antiresorptive",
      keys: ["ประวัติ parathyroidectomy หรือ thyroidectomy ล่าสุด", "ประวัติ denosumab, zoledronate, cinacalcet, etelcalcetide, foscarnet"]
    }, [
      N("Hungry bone syndrome", "nephro", {
        s: "หลัง parathyroidectomy (โดยเฉพาะ tertiary หรือ ALP สูงก่อนผ่าตัด) หรือ thyroidectomy ใน thyrotoxicosis",
        why: "Ca, PO4, Mg ต่ำพร้อมกัน อาจนานหลายสัปดาห์ ต้องให้ Ca IV ปริมาณมาก",
        keys: ["ALP สูงก่อนผ่าตัดเป็น predictor", "ต่างจาก post-surgical hypoparathyroidism ที่ PO4 ต่ำ (hypoparathyroidism มี PO4 สูง) ส่วน PTH หลัง total parathyroidectomy ต่ำได้ทั้งสองภาวะ จึงไม่ใช้ PTH อย่างเดียวแยก"],
        ix: ["Ca, PO4, Mg ทุก 6-12 ชั่วโมงหลังผ่าตัด"],
        link: "hd-mbd"
      }),
      N("Antiresorptive and calcimimetic drugs", "nephro", {
        s: "Denosumab (โดยเฉพาะ eGFR < 30 และ dialysis), zoledronate, cinacalcet, etelcalcetide, foscarnet",
        why: "Denosumab ใน dialysis ทำ severe hypocalcemia 41.1% ใน 12 สัปดาห์ เทียบ 2.0% ใน oral bisphosphonate (Bird JAMA 2024, หญิงอายุ ≥ 65 ปีที่ dialysis) และ FDA ใส่ boxed warning ปี 2024 ต้อง check 25D ก่อนให้และ monitor ใน 2 สัปดาห์แรก",
        ix: ["Ca ก่อนให้และ 1-2 สัปดาห์หลังให้"]
      })
    ])
  ])
};

/* ===================== PHOSPHATE DISORDERS ===================== */
TREES.phos = {
  must: [
    "Hypo: อ่อนแรง หายใจล้มเหลว wean ventilator ไม่ได้, ปวดกระดูก กระดูกหัก (osteomalacia)",
    "Refeeding: ผู้ป่วยกินน้อยนาน alcohol, anorexia, เริ่ม feeding หรือ TPN",
    "Alcohol, DKA ระหว่างรักษา, respiratory alkalosis, sepsis",
    "IV iron (ferric carboxymaltose), tenofovir, ifosfamide, cisplatin, deferasirox, aminoglycoside, valproate",
    "Antacid aluminum หรือ magnesium, phosphate binder ใน CKD",
    "ก้อนเนื้อตามตัว (TIO), ขาโก่งในเด็ก ฟันมีหนองบ่อย (XLH), ประวัติครอบครัว",
    "Hyper: CKD, chemotherapy, rhabdo, phosphate enema หรือ bowel prep (Fleet), vitamin D",
    "Calcification ที่ผิวหนัง ข้อ หลอดเลือด, calciphylaxis"
  ],
  tree: N("Phosphate disorders", "root", {
    s: "Hypophosphatemia แยก shift, intake หรือ GI loss กับ renal wasting ด้วย TmP/GFR และ FE PO4 แล้วใช้ FGF23 แยกต่อ ส่วน hyperphosphatemia แยก pseudo, load เฉียบพลัน และ impaired excretion",
    why: "Renal phosphate wasting เป็นจุดตัดของ FGF23 disorders, Fanconi, light chain และ IV iron ซึ่งเป็นคำถามระดับ fellow",
    keys: ["FE PO4 > 5% หรือ TmP/GFR < 0.8 mmol/L ขณะ PO4 ต่ำ = renal wasting", "FE PO4 < 5% หรือ 24-h urine PO4 < 100 mg/d = ไตเก็บถูกต้อง", "FGF23 สูงหรือปกติไม่เหมาะสม (inappropriately normal) = FGF23-mediated", "1,25D ต่ำใน FGF23 excess, สูงใน HHRH"],
    ix: ["PO4 fasting, Ca, Mg, Cr, ALP, PTH, 25D, 1,25D", "Spot fasting urine PO4 และ Cr, คำนวณ TmP/GFR", "Intact หรือ C-terminal FGF23", "Urine glucose, uric acid, β2-microglobulin, HCO3 (Fanconi)"],
    std: "Bijvoet nomogram หรือ Payne formula สำหรับ TmP/GFR"
  }, [
    N("Hypophosphatemia: transcellular shift", "step", {
      s: "PO4 เข้าเซลล์ urine PO4 ต่ำ",
      why: "พบบ่อยที่สุดในโรงพยาบาล และ refeeding ทำ PO4 ต่ำร่วม K และ Mg",
      keys: ["Refeeding", "Respiratory alkalosis", "Insulin, catecholamine"],
      ix: ["Urine PO4, blood gas, nutrition history"]
    }, [
      N("Refeeding syndrome", "adj", {
        s: "เริ่มอาหารหรือ glucose หลัง starvation",
        why: "PO4 < 1 mg/dL ทำ rhabdomyolysis, hemolysis, respiratory muscle failure, HF",
        keys: ["BMI ต่ำ, กินน้อย > 5-10 วัน, alcohol", "K และ Mg ต่ำร่วม"],
        ix: ["PO4, K, Mg ทุกวันในสัปดาห์แรก"],
        std: "NICE CG32 nutrition support, ASPEN 2020 refeeding syndrome consensus"
      }),
      N("Respiratory alkalosis and sepsis", "adj", {
        s: "Intracellular alkalosis กระตุ้น glycolysis (phosphofructokinase) ดึง PO4 เข้าเซลล์",
        ix: ["Blood gas"]
      }),
      N("DKA treatment and hungry bone", "adj", {
        s: "Insulin ระหว่างรักษา DKA, หลัง parathyroidectomy",
        ix: ["PO4 trend"],
        link: "hypoca"
      })
    ]),
    N("Hypophosphatemia: low intake or GI loss", "step", {
      s: "FE PO4 < 5%, urine PO4 ต่ำ",
      keys: ["Phosphate binder หรือ antacid", "Malabsorption, chronic diarrhea", "Vitamin D deficiency"]
    }, [
      N("Binders and antacids", "adj", {
        s: "Aluminum, magnesium, calcium, sevelamer, lanthanum",
        why: "Overtreatment ใน dialysis หรือผู้ที่กิน antacid นาน",
        ix: ["Drug history"],
        link: "hd-mbd"
      }),
      N("Vitamin D deficiency and malabsorption", "adj", {
        s: "Secondary hyperparathyroidism ทำ renal PO4 loss ร่วมด้วย",
        why: "FE PO4 อาจสูงจาก PTH ทำให้สับสนกับ renal wasting",
        ix: ["25D, PTH"],
        link: "diarrhea"
      }),
      N("Alcohol use disorder", "adj", {
        s: "Intake ต่ำ, Mg ต่ำ, tubular dysfunction, refeeding",
        ix: ["Mg, nutrition"]
      })
    ]),
    N("Hypophosphatemia: renal wasting, FGF23-mediated", "step", {
      s: "TmP/GFR ต่ำ, FGF23 สูง, 1,25D ต่ำหรือปกติต่ำ",
      why: "FGF23 กด NaPi-2a, NaPi-2c และ 1α-hydroxylase จึง 1,25D ไม่ขึ้นตาม PO4 ที่ต่ำ",
      keys: ["Onset ในเด็ก + family history: XLH", "Onset ในผู้ใหญ่ไม่มีประวัติครอบครัว: TIO", "หลังให้ IV iron: FCM-induced"],
      ix: ["FGF23", "Ga-68 DOTATATE PET-CT หา tumor ใน TIO", "PHEX genetic"],
      std: "International XLH clinical practice recommendations 2025 (Haffner, Nat Rev Nephrol), burosumab"
    }, [
      N("X-linked hypophosphatemia", "nephro", {
        s: "PHEX, rickets, ขาโก่ง, dental abscess, enthesopathy ในผู้ใหญ่",
        why: "Burosumab (anti-FGF23) แก้ PO4 ได้ดีกว่า conventional phosphate กับ calcitriol ในเด็ก",
        ix: ["PHEX genetic, FGF23"],
        link: "shortstature"
      }),
      N("Tumor-induced osteomalacia", "nephro", {
        s: "Phosphaturic mesenchymal tumor ขนาดเล็ก ซ่อนในกระดูกหรือเนื้อเยื่อ",
        why: "ตัด tumor ออกหมดแล้วหาย จึงต้องค้นหา tumor ทุกรายที่เป็น adult-onset FGF23-mediated hypophosphatemia ที่ไม่มีประวัติครอบครัวและไม่ได้ IV iron",
        keys: ["Bone pain, multiple fracture, proximal weakness"],
        ix: ["FGF23, Ga-68 DOTATATE PET-CT, venous sampling FGF23"],
        link: "bonepain"
      }),
      N("Ferric carboxymaltose-induced", "nephro", {
        s: "Carbohydrate moiety ยับยั้ง FGF23 cleavage ทำ intact FGF23 สูง",
        why: "PHOSPHARE-IDA (n = 245): hypophosphatemia 74% กับ FCM เทียบ 8% กับ ferric derisomaltose, ซ้ำหลายครั้งทำ osteomalacia",
        ix: ["PO4 ก่อนและหลัง IV iron 2 สัปดาห์"],
        std: "PHOSPHARE-IDA trials (Wolf JAMA 2020)"
      }),
      N("ADHR, ARHR and post-KT", "nephro", {
        s: "FGF23 R176/R179 (ADHR, iron deficiency trigger), DMP1, ENPP1, post-transplant (FGF23 ค้าง ร่วม tertiary HPT)",
        why: "Hypophosphatemia หลัง KT พบบ่อยในเดือนแรก",
        ix: ["FGF23, PTH, iron studies"],
        link: "kt-early"
      })
    ]),
    N("Hypophosphatemia: renal wasting, non-FGF23", "step", {
      s: "TmP/GFR ต่ำ, FGF23 ต่ำหรือปกติ",
      keys: ["Generalized proximal dysfunction: Fanconi", "Isolated กับ 1,25D สูงและ hypercalciuria: HHRH", "PTH สูง: PHPT"]
    }, [
      N("Fanconi syndrome", "nephro", {
        s: "Light chain proximal tubulopathy, tenofovir (TDF), ifosfamide, cisplatin, deferasirox, valproate, Dent, cystinosis, Wilson, heavy metal",
        why: "ในผู้ใหญ่ต้องหา MGRS เสมอ และ TDF ใน HIV หรือ HBV",
        keys: ["Normoglycemic glucosuria, uricosuria, aminoaciduria, LMW proteinuria", "pRTA"],
        ix: ["SPEP, FLC, urine immunofixation", "Urine β2-microglobulin, glucose"],
        link: "mspike"
      }),
      N("Hereditary hypophosphatemic rickets with hypercalciuria", "nephro", {
        s: "SLC34A3 (NaPi-2c), SLC34A1",
        why: "1,25D สูงอยู่แล้ว จึงรักษาด้วย phosphate อย่างเดียวและไม่ให้ calcitriol (จะเพิ่ม hypercalciuria และ nephrocalcinosis) ซึ่งต่างจาก XLH",
        ix: ["1,25D สูง, urine Ca สูง, genetic"],
        link: "stone"
      }),
      N("Primary hyperparathyroidism", "nephro", {
        s: "PTH ลด NaPi-2a",
        ix: ["Ca, PTH"],
        link: "hyperca"
      }),
      N("Osmotic diuresis and volume expansion", "adj", {
        s: "Glucosuria, acetazolamide, saline infusion",
        ix: ["Urine glucose"]
      })
    ]),
    N("Hyperphosphatemia", "step", {
      s: "ตัด pseudo ก่อน แล้วแยก acute load กับ impaired excretion",
      why: "Acute PO4 load ทำ hypocalcemia และ AKI จาก CaPO4 deposition",
      keys: ["Pseudohyperphosphatemia จาก paraprotein, bilirubin, lipid, liposomal amphotericin, heparin, tPA", "Acute load: TLS, rhabdo, enema", "Chronic: CKD, hypoparathyroidism, tumoral calcinosis"],
      ix: ["PO4 ด้วย method อื่น", "Cr, Ca, PTH, uric acid, CK", "TmP/GFR สูงใน hypoparathyroidism และ tumoral calcinosis"],
      std: "KDIGO 2017 CKD-MBD: ลด PO4 เข้าหาปกติ จำกัด calcium-based binder"
    }, [
      N("Chronic kidney disease", "nephro", {
        s: "PO4 มักเริ่มสูงเมื่อ eGFR < 30 mL/min/1.73 m², FGF23 และ PTH ขึ้นก่อนตั้งแต่ CKD G2-G3",
        why: "สัมพันธ์กับ vascular calcification และ mortality",
        ix: ["PO4, Ca, PTH, ALP trend"],
        std: "KDIGO 2017 CKD-MBD update",
        link: "hd-mbd"
      }),
      N("Tumor lysis syndrome", "nephro", {
        s: "Burkitt, ALL, AML ที่ WBC สูง, bulky lymphoma หลังเริ่มยา",
        why: "PO4 ใน blast สูงกว่าเซลล์ปกติ 4 เท่า ทำ AKI ทั้งจาก CaPO4 และ uric acid",
        ix: ["PO4, uric acid, K, Ca, LDH, Cr ทุก 6-8 ชั่วโมง"],
        std: "Cairo-Bishop: PO4 ≥ 4.5 mg/dL ในผู้ใหญ่ (≥ 6.5 mg/dL ในเด็ก) หรือเพิ่ม 25%",
        link: "onco"
      }),
      N("Acute phosphate nephropathy", "nephro", {
        s: "Oral sodium phosphate bowel prep หรือ phosphate enema",
        why: "AKI แบบ insidious หลัง bowel prep หลายวันถึงหลายสัปดาห์ ปัจจัยเสี่ยงคือ CKD, ผู้สูงอายุ, volume depletion, ใช้ RAASi, diuretic หรือ NSAID, biopsy มี CaPO4 deposit ใน tubule",
        ix: ["Kidney biopsy: von Kossa positive"],
        link: "risingcr"
      }),
      N("Rhabdomyolysis and hemolysis", "nephro", {
        s: "PO4 จาก cell breakdown",
        link: "myalgia"
      }),
      N("Hypoparathyroidism and PTH resistance", "nephro", {
        s: "TmP/GFR สูง Ca ต่ำ",
        link: "hypoca"
      }),
      N("Familial tumoral calcinosis and acromegaly", "nephro", {
        s: "GALNT3, FGF23, KL loss-of-function, GH excess เพิ่ม TmP",
        why: "Periarticular calcified mass ร่วม PO4 สูง GFR ปกติ",
        ix: ["Intact FGF23 ต่ำแต่ C-terminal FGF23 สูงใน GALNT3 และ FGF23 mutation (KL mutation มี intact FGF23 สูง), IGF-1"]
      }),
      N("Vitamin D intoxication", "adj", {
        s: "PO4 สูงพร้อม Ca สูง",
        link: "hyperca"
      })
    ])
  ])
};

/* ===================== MAGNESIUM DISORDERS ===================== */
TREES.mg = {
  must: [
    "ตะคริว เกร็ง ชัก ใจสั่น, K หรือ Ca ต่ำที่แก้ไม่ขึ้น",
    "ยา: PPI นาน, loop หรือ thiazide, CNI, cisplatin, carboplatin, aminoglycoside, amphotericin B, pentamidine, foscarnet, EGFR inhibitor (cetuximab, panitumumab)",
    "Diarrhea เรื้อรัง, short bowel, ileostomy, pancreatitis, alcohol",
    "DM ที่คุมไม่ได้, หลัง KT",
    "ประวัติครอบครัว hypomagnesemia, nephrocalcinosis, ตาผิดปกติ (CLDN19), ชัก ataxia หูหนวก (EAST)",
    "Renal cysts, DM อายุน้อย, gout, genital tract anomaly (HNF1B)",
    "Hyper: ยาระบาย Mg, antacid, enema ใน CKD, MgSO4 ใน preeclampsia, lithium"
  ],
  tree: N("Magnesium disorders", "root", {
    s: "Hypomagnesemia ใช้ FE Mg หรือ 24-h urine Mg แยก GI กับ renal loss แล้วใช้ urine Ca กับ phenotype แยก tubulopathy ส่วน hypermagnesemia เกือบทั้งหมดคือ Mg load ในคนที่ GFR ต่ำ",
    why: "Mg ต่ำเป็นสาเหตุที่ทำให้ hypoK และ hypoCa แก้ไม่ขึ้น และเป็น phenotype หลักของ Gitelman, FHHNC, HNF1B และ CNI toxicity หลัง KT",
    keys: ["FE Mg > 4% (eGFR ปกติ) = renal loss", "FE Mg < 2% หรือ 24-h urine Mg < 10-30 mg/d = GI loss", "Urine Ca ต่ำ: Gitelman, thiazide", "Urine Ca สูง + nephrocalcinosis: FHHNC, loop diuretic, autosomal dominant hypocalcemia type 1 (ADH1)"],
    ix: ["Serum Mg, K, Ca, PO4, Cr", "FE Mg = (UMg × PCr)/(0.7 × PMg × UCr) × 100", "Spot urine Ca/Cr", "Blood gas", "ECG: QT, torsades"],
    std: "FE Mg ใช้ 0.7 × serum Mg เพราะ Mg ราว 70% filterable"
  }, [
    N("Hypomagnesemia: GI loss", "step", {
      s: "Urine Mg ต่ำ ไตเก็บถูกต้อง",
      keys: ["PPI นานหลายเดือน", "Diarrhea, short bowel, steatorrhea", "Urine K ต่ำร่วม"],
      ix: ["FE Mg, 24-h urine Mg"]
    }, [
      N("PPI-induced hypomagnesemia", "adj", {
        s: "ลด intestinal TRPM6 และ TRPM7 absorption",
        why: "Class effect หายใน 1-2 สัปดาห์หลังหยุด กลับมาเมื่อ rechallenge, เพิ่มความเสี่ยงเมื่อใช้ร่วม diuretic",
        ix: ["Urine Mg ต่ำ, Mg หลังหยุด PPI"],
        std: "US FDA 2011 drug safety communication"
      }),
      N("Diarrhea and malabsorption", "adj", {
        s: "Lower GI fluid Mg สูงถึง 15 mEq/L, short bowel, ileostomy, celiac",
        ix: ["Stool volume"],
        link: "diarrhea"
      }),
      N("Acute pancreatitis and hungry bone", "adj", {
        s: "ไม่ใช่ GI loss แต่เป็น sequestration: saponification ใน necrotic fat และ deposition ในกระดูก ซึ่ง urine Mg ต่ำเช่นเดียวกับ GI loss",
        link: "hypoca"
      }),
      N("Familial hypomagnesemia with secondary hypocalcemia", "nephro", {
        s: "TRPM6, ทารกชักใน 2-8 สัปดาห์แรก",
        why: "Defect ทั้ง gut และ DCT, Mg < 0.4 mmol/L, ต้องให้ Mg ขนาดสูงตลอดชีวิต",
        ix: ["TRPM6 genetic"]
      })
    ]),
    N("Hypomagnesemia: renal loss with low urine Ca", "step", {
      s: "DCT defect",
      keys: ["Hypokalemic metabolic alkalosis", "Urine Ca/Cr < 0.2 mmol/mmol"],
      link: "hypok"
    }, [
      N("Gitelman syndrome", "nephro", {
        s: "SLC12A3, chondrocalcinosis, ตะคริว, QT prolong",
        why: "ต้องให้ Mg และ K ตลอดชีวิต Mg ต่ำทำ K แก้ยาก",
        ix: ["Urine Ca/Cr, FE Mg, genetic"],
        std: "KDIGO 2017 Gitelman controversies",
        link: "hypok"
      }),
      N("Thiazide diuretics", "adj", {
        s: "ลด TRPM6 ใน DCT",
        ix: ["Drug review"]
      }),
      N("EAST/SeSAME syndrome", "nephro", {
        s: "KCNJ10: epilepsy, ataxia, sensorineural deafness, tubulopathy",
        ix: ["Genetic"],
        link: "seizure"
      }),
      N("Isolated dominant and recessive hypomagnesemia", "nephro", {
        s: "FXYD2, EGF, CNNM2, KCNA1",
        ix: ["Genetic panel"]
      })
    ]),
    N("Hypomagnesemia: renal loss with high urine Ca", "step", {
      s: "TAL paracellular หรือ CaSR defect",
      keys: ["Nephrocalcinosis", "Recurrent stone", "CKD progression ในวัยหนุ่มสาว"]
    }, [
      N("FHHNC (CLDN16, CLDN19)", "nephro", {
        s: "Hypomagnesemia, hypercalciuria, nephrocalcinosis",
        why: "Progress เป็น ESKD ในวัย 20-30 ปี, CLDN19 มี myopia และ nystagmus",
        keys: ["PTH สูงก่อน GFR ลด", "Incomplete dRTA และ hypocitraturia"],
        ix: ["Renal ultrasound, ophthalmology, genetic"],
        link: "stone"
      }),
      N("Loop diuretics and Bartter", "adj", {
        s: "ลด lumen-positive voltage ใน TAL",
        ix: ["Drug review, urine Ca"],
        link: "hypok"
      }),
      N("ADH1 and hypercalcemia", "nephro", {
        s: "Autosomal dominant hypocalcemia type 1 (CaSR gain-of-function, Ca ต่ำ) และ hypercalcemia ต่างกระตุ้น CaSR ใน TAL ทำให้ paracellular Mg และ Ca reabsorption ลด",
        link: "hypoca"
      })
    ]),
    N("Hypomagnesemia: renal loss, variable urine Ca", "step", {
      s: "Drug toxicity และ tubular injury",
      why: "สาเหตุที่พบบ่อยในผู้ป่วยไต โดยเฉพาะ CNI หลัง KT และ cisplatin ในผู้ป่วยมะเร็ง",
      keys: ["Drug exposure ชัด", "Renal cysts กับ DM: HNF1B"]
    }, [
      N("Calcineurin inhibitors", "nephro", {
        s: "Tacrolimus ลด TRPM6 และ EGF",
        why: "Mg ต่ำหลัง KT สัมพันธ์กับ post-transplant diabetes mellitus (PTDM) แต่ยังไม่พิสูจน์ว่าการให้ Mg ป้องกันได้",
        ix: ["Tacrolimus level, Mg"],
        link: "kt-early"
      }),
      N("Platinum and EGFR inhibitors", "nephro", {
        s: "Cisplatin (cumulative, ถาวรได้), cetuximab, panitumumab",
        why: "EGFR blockade ลด TRPM6 trafficking",
        ix: ["Mg ก่อนทุก cycle"],
        link: "onco"
      }),
      N("Aminoglycoside, amphotericin B, pentamidine, foscarnet", "nephro", {
        s: "Tubular toxin, อาจเกิดหลังหยุดยาหลายสัปดาห์",
        ix: ["Drug review, FE Mg"]
      }),
      N("HNF1B nephropathy", "nephro", {
        s: "Renal cysts หรือ hypoplasia, MODY5, hypomagnesemia, hyperuricemia, LFT ผิดปกติ, genital anomaly",
        why: "ADTKD ที่ถาม phenotype นอกไตครบ",
        ix: ["Genetic, renal imaging"],
        link: "cysts"
      }),
      N("Uncontrolled diabetes and alcohol", "adj", {
        s: "Glucosuria, insulin resistance, alcohol tubular effect",
        ix: ["HbA1c"]
      }),
      N("Volume expansion and recovery ATN", "nephro", {
        s: "Saline infusion, post-obstructive diuresis",
        link: "polyuria"
      })
    ]),
    N("Hypermagnesemia", "step", {
      s: "Mg > 2.6 mg/dL, เกือบทั้งหมดคือ Mg load ร่วม GFR ต่ำ",
      why: "อาการตามระดับ: 4.8-7.2 mg/dL คลื่นไส้ หน้าแดง ง่วง hyporeflexia, 7.2-12 hypotension bradycardia PR และ QRS ยาว, DTR หายเมื่อเข้าใกล้ 12 mg/dL (5 mmol/L), > 12 paralysis apnea heart block",
      keys: ["DTR หายเป็นสัญญาณเตือนแรกของ toxicity รุนแรง ก่อน respiratory depression", "Ca IV ต้าน neuromuscular และ cardiac effect ได้ทันทีแต่ชั่วคราว", "Saline กับ loop ถ้ามีปัสสาวะ, dialysis ถ้า GFR ต่ำ"],
      ix: ["Mg, Ca, Cr, ECG"]
    }, [
      N("Mg-containing laxatives, antacids and enemas in CKD", "nephro", {
        s: "Milk of magnesia, MgSO4 enema, Mg citrate bowel prep",
        why: "พบบ่อยในผู้สูงอายุที่ท้องผูกและ CKD",
        ix: ["Drug review"]
      }),
      N("MgSO4 therapy in preeclampsia", "adj", {
        s: "Therapeutic range 4.8-8.4 mg/dL",
        why: "Patellar reflex ต้องตรวจทุกชั่วโมง, ลดขนาดเมื่อ Cr สูงหรือ oliguria",
        ix: ["Mg level, DTR, urine output, RR"],
        link: "pregnancy"
      }),
      N("Other causes", "adj", {
        s: "Lithium, FHH, adrenal insufficiency, hypothyroidism, TLS",
        why: "มักขึ้นเพียงเล็กน้อย",
        ix: ["Ca, PTH, TSH, cortisol"]
      })
    ])
  ])
};

/* ===================== NORMAL ANION GAP METABOLIC ACIDOSIS ===================== */
TREES.nagma = {
  must: [
    "ท้องเสีย ยาระบาย fistula, ileal conduit หรือ ureterosigmoidostomy",
    "อ่อนแรงเป็นพักๆ, นิ่วไต nephrocalcinosis, ปวดกระดูก, growth failure ในเด็ก",
    "ตาแห้ง ปากแห้ง ผื่น ปวดข้อ (Sjögren, SLE), ตับอักเสบเรื้อรัง (autoimmune hepatitis, PBC)",
    "ยา: acetazolamide, topiramate, zonisamide, amphotericin B, lithium, ifosfamide, tenofovir, trimethoprim, ACEi, ARB, MRA, CNI",
    "ดมกาว ทินเนอร์ (toluene)",
    "ได้ 0.9% NaCl ปริมาณมาก หรือ TPN ที่มี chloride สูง",
    "ภูมิลำเนา ภาคอีสาน, ประวัติครอบครัว RTA, หูหนวก, รูปร่าง RBC ผิดปกติ (SAO)",
    "DM, CKD, obstructive uropathy, KT"
  ],
  tree: N("Normal anion gap metabolic acidosis", "root", {
    s: "ยืนยัน primary metabolic acidosis และ AG ปกติหลังแก้ albumin แล้วใช้ urine NH4 (ผ่าน urine osmolal gap หรือ urine anion gap) แยก GI loss กับ renal acidification defect จากนั้นใช้ serum K และ urine pH แยกชนิด RTA",
    why: "NAGMA คือภาษากลางของ RTA ที่ออกสอบทุกปี และเชื่อม Sjögren, myeloma, Gitelman-like tubulopathy และ type 4 RTA ใน DKD เข้าด้วยกัน",
    keys: ["Winter formula: expected pCO2 = 1.5 × HCO3 + 8 ± 2", "AG ปกติราว 8-12 mmol/L (ISE), แก้ AG + 2.5 ต่อ albumin ที่ลดลงทุก 1 g/dL จาก 4 g/dL", "Urine osmolal gap (UOG) ราว 2 เท่าของ urine NH4: ใน chronic metabolic acidosis ที่ไตตอบสนองปกติ UOG มัก > 400 mOsm/kg (extrarenal loss เช่น GI loss หรือ acid load เช่น toluene, ketoacid)", "UOG < 150 mOsm/kg ขณะ acidosis = urine NH4 ต่ำไม่เหมาะสม (renal: RTA, CKD), ช่วง 150-400 เป็น gray zone ต้องแปลร่วมกับ clinical", "K ต่ำ: dRTA type 1, pRTA, GI loss", "K สูง: type 4 หรือ hyperkalemic dRTA"],
    ix: ["Blood gas, electrolyte, albumin, Cr", "Urine pH (pH meter, fresh sample), urine Na, K, Cl, urea, glucose, osmolality", "Urine anion gap = UNa + UK − UCl", "Urine osmolal gap = measured Uosm − [2 × (UNa + UK) + urine urea nitrogen (mg/dL)/2.8 + urine glucose (mg/dL)/18]", "Urine citrate, Ca, ultrasound หา nephrocalcinosis"],
    std: "UAG แปลผลไม่ได้เมื่อมี unmeasured anion ในปัสสาวะ (ketone, hippurate, D-lactate) หรือ urine pH > 6.5 (มี HCO3) ให้ใช้ urine osmolal gap แทน, ถ้า urine Na < 20-25 mmol/L distal Na delivery ต่ำทำให้ NH4 excretion ต่ำได้เองโดยไม่ใช่ RTA ต้องแก้ volume ก่อนแปลผลทั้ง UAG และ UOG"
  }, [
    N("Exclude compensation and mixed disorder", "step", {
      s: "HCO3 ต่ำอาจเป็น compensation ของ chronic respiratory alkalosis",
      why: "pH ช่วยแยก: pH < 7.40 เข้ากับ primary metabolic acidosis, pH ≥ 7.40 (ปกติค่อนด่างหรือ alkalemia) ร่วมกับ pCO2 ต่ำกว่าที่ Winter formula คาด เข้ากับ chronic respiratory alkalosis ที่ไต compensate หรือ mixed disorder",
      keys: ["pH", "Winter formula", "Hypoalbuminemia ซ่อน AGMA"],
      ix: ["ABG, albumin-corrected AG, delta ratio"],
      link: "agma"
    }, [
      N("Chronic respiratory alkalosis", "adj", {
        s: "Pregnancy, cirrhosis, sepsis, high altitude, salicylate",
        why: "HCO3 ลด 4-5 mmol/L ต่อ pCO2 ที่ลดลงทุก 10 mmHg",
        ix: ["ABG, pH"]
      })
    ]),
    N("Extrarenal HCO3 loss (urine NH4 high)", "step", {
      s: "UAG ลบ (ราว −20 ถึง −50 mmol/L), urine osmolal gap สูง (มัก > 400 mOsm/kg), ไตเพิ่ม NH4 excretion ได้เหมาะสม",
      why: "Urine pH อาจ > 5.5 จาก NH3 buffering ใน hypokalemia ซึ่งทำให้เข้าใจผิดว่าเป็น dRTA",
      keys: ["Diarrhea ชัดหรือแอบใช้ยาระบาย", "K ต่ำ"],
      ix: ["Urine osmolal gap, stool electrolyte"]
    }, [
      N("Diarrhea and laxative abuse", "adj", {
        s: "Lower GI fluid HCO3 สูง",
        why: "สาเหตุ NAGMA ที่พบบ่อยที่สุด, ข้อควรระวัง: laxative abuse เรื้อรังพบเป็น metabolic alkalosis ได้เช่นกัน (hypokalemia และ volume contraction) จึงไม่ใช่ NAGMA ทุกราย",
        ix: ["Stool volume, laxative screen"],
        link: "diarrhea"
      }),
      N("Pancreatic, biliary and small bowel fistula", "adj", {
        s: "Pancreatic juice HCO3 ราว 100 mmol/L, รวม pancreas transplant แบบ bladder drainage ที่เสีย HCO3 ทางปัสสาวะ",
        ix: ["Drain output"]
      }),
      N("Urinary diversion", "nephro", {
        s: "Ureterosigmoidostomy (เกิด acidosis บ่อยที่สุด), ileal conduit ที่ยาวเกินหรือมี stasis จาก stomal stenosis, neobladder",
        why: "เยื่อบุลำไส้ดูดซึม NH4Cl จากปัสสาวะกลับ และหลั่ง HCO3 แลกกับ Cl, urine NH4 UAG และ UOG จากปัสสาวะที่ผ่านลำไส้แล้วจึงแปลผลไม่ได้",
        ix: ["Surgical history, loopogram"]
      })
    ]),
    N("Renal: hypokalemic, urine pH > 5.5 (distal RTA)", "step", {
      s: "Urine NH4 ต่ำ, urine pH > 5.5 ขณะ acidemia, hypocitraturia",
      why: "Classic dRTA ทำ nephrocalcinosis, CaP stone, osteomalacia และ hypokalemic paralysis",
      keys: ["Urine osmolal gap < 150 mOsm/kg", "Nephrocalcinosis", "Urine citrate ต่ำ"],
      ix: ["Urine pH, urine osmolal gap, urine citrate, KUB", "Furosemide-fludrocortisone test หรือ NH4Cl loading ใน incomplete dRTA"],
      std: "Incomplete dRTA: HCO3 ปกติ แต่ urine pH ไม่ลดต่ำกว่า 5.3 หลัง furosemide-fludrocortisone"
    }, [
      N("Autoimmune dRTA", "nephro", {
        s: "Sjögren (พบบ่อยที่สุดในผู้ใหญ่), SLE, autoimmune hepatitis, PBC, autoimmune thyroiditis",
        why: "TIN ร่วมกับการขาด H+-ATPase ใน intercalated cell (มีรายงาน antibody ต่อ carbonic anhydrase II), dRTA อาจนำมาก่อนอาการ sicca หลายปี จึงต้องตรวจหา Sjögren แม้ไม่มี sicca",
        keys: ["หญิงวัยกลางคน hypokalemic paralysis", "Hypergammaglobulinemia"],
        ix: ["Anti-Ro, anti-La, RF, Schirmer, lip biopsy, kidney biopsy หา TIN"],
        std: "ACR/EULAR 2016 Sjögren classification",
        link: "sicca"
      }),
      N("Hereditary dRTA", "nephro", {
        s: "SLC4A1 (AD ในชาวตะวันตก, AR ในเอเชียตะวันออกเฉียงใต้ซึ่งพบร่วม SAO ได้), ATP6V1B1 (AR, sensorineural hearing loss ตั้งแต่เด็ก), ATP6V0A4 (AR, hearing loss เริ่มช้าหรือการได้ยินปกติ), FOXI1, WDR72",
        why: "Endemic dRTA ภาคอีสานสัมพันธ์กับ SLC4A1 และ Southeast Asian ovalocytosis ซึ่งเป็นบริบทเฉพาะของไทย",
        keys: ["อายุน้อย, growth failure, rickets", "Sensorineural hearing loss", "Ovalocyte ใน blood smear"],
        ix: ["Genetic panel, audiometry, peripheral smear"],
        link: "hearing"
      }),
      N("Hypercalciuria and nephrocalcinosis", "nephro", {
        s: "Medullary sponge kidney, PHPT, vitamin D excess, FHHNC",
        why: "Nephrocalcinosis เป็นได้ทั้งเหตุและผลของ dRTA",
        ix: ["24-h urine Ca, PTH, imaging"],
        link: "stone"
      }),
      N("Drug and toxin dRTA", "nephro", {
        s: "Amphotericin B (H+ back-leak), lithium, ifosfamide, ibuprofen, toluene",
        why: "Toluene: มีรายงาน dRTA แต่กลไกหลักคือ hippuric acid load (ดู branch Acid or chloride load), hippurate เป็น unmeasured anion ทำให้ UAG บวกหลอกทั้งที่ urine NH4 สูง (urine osmolal gap สูง) จึงห้ามวินิจฉัย dRTA จาก UAG อย่างเดียว",
        ix: ["Drug history, urine hippurate"]
      }),
      N("Dysproteinemia and other systemic causes", "nephro", {
        s: "Hypergammaglobulinemia, cryoglobulinemia, amyloid, KT rejection (sickle cell และ obstructive uropathy มักเป็น hyperkalemic dRTA ดู branch hyperkalemic RTA)",
        ix: ["SPEP, ultrasound"],
        link: "mspike"
      })
    ]),
    N("Renal: hypokalemic, urine pH < 5.5 (proximal RTA)", "step", {
      s: "Proximal HCO3 reabsorptive threshold ต่ำลง serum HCO3 จึงคงที่ที่ระดับใหม่ราว 12-20 mmol/L (self-limited)",
      why: "Urine pH จะ < 5.5 เมื่อ HCO3 ต่ำกว่า threshold และ > 7.5 เมื่อ load bicarbonate",
      keys: ["FE HCO3 > 15% ระหว่าง bicarbonate loading", "Fanconi: glucosuria, phosphaturia, uricosuria, aminoaciduria", "Isolated pRTA พบน้อย"],
      ix: ["FE HCO3 หลังให้ NaHCO3", "Urine glucose, TmP/GFR, urine β2-microglobulin", "SPEP, serum FLC"],
      link: "phos"
    }, [
      N("Light chain proximal tubulopathy", "nephro", {
        s: "κ light chain สะสมใน proximal tubule, crystal หรือ non-crystal",
        why: "Adult Fanconi syndrome ทุกรายต้องตรวจหา monoclonal gammopathy ควบคู่กับการทบทวนยา (ยาเช่น tenofovir เป็นสาเหตุที่พบบ่อยกว่า)",
        ix: ["Serum FLC, urine immunofixation, biopsy"],
        std: "IKMG 2019 MGRS consensus",
        link: "mspike"
      }),
      N("Drugs", "nephro", {
        s: "Tenofovir disoproxil, ifosfamide, cisplatin, aminoglycoside, deferasirox, valproate, topiramate และ acetazolamide (CA inhibition)",
        why: "Topiramate ทำ mixed proximal และ distal RTA ร่วม CaP stone",
        ix: ["Drug history"],
        link: "viral"
      }),
      N("Inherited Fanconi", "nephro", {
        s: "Cystinosis, Wilson, Lowe (OCRL), galactosemia, tyrosinemia, Dent disease (CLCN5, OCRL) เป็น incomplete Fanconi ที่เด่นด้วย LMW proteinuria และ hypercalciuria มักไม่มี acidosis",
        ix: ["Genetic, leukocyte cystine, ceruloplasmin"]
      }),
      N("Other acquired causes", "nephro", {
        s: "Heavy metals (lead, cadmium), Sjögren, post-KT, vitamin D deficiency",
        ix: ["Heavy metal screen"]
      })
    ]),
    N("Renal: hyperkalemic RTA", "step", {
      s: "Urine pH ช่วยแยก type 4 กับ voltage-dependent dRTA เป็นแนวโน้ม ไม่ใช่เกณฑ์ตัดขาด เพราะสาเหตุซ้อนกันได้ (เช่น obstructive uropathy เป็นได้ทั้งสองแบบ)",
      keys: ["Urine pH < 5.5: type 4 (hypoaldosteronism)", "Urine pH > 5.5: hyperkalemic dRTA (voltage defect)"],
      ix: ["Renin, aldosterone, urine pH"],
      link: "hyperk"
    }, [
      N("Type 4 RTA (hypoaldosteronism)", "nephro", {
        s: "DKD, NSAID, RAASi, heparin, CNI, adrenal insufficiency",
        why: "RTA ที่พบบ่อยที่สุดในผู้ใหญ่ HyperK กด ammoniagenesis ทำ NH4 ต่ำ",
        keys: ["HCO3 มักไม่ต่ำกว่า 17", "Urine pH < 5.5", "Renin ต่ำ aldo ต่ำ ใน DKD"],
        ix: ["Renin, aldosterone, AM cortisol"],
        link: "hyperk"
      }),
      N("Voltage-dependent dRTA", "nephro", {
        s: "Obstructive uropathy, sickle cell, SLE, amiloride, trimethoprim",
        why: "Na reabsorption ใน collecting duct เสีย ทำ H+ และ K+ secretion เสียพร้อมกัน",
        ix: ["Ultrasound, ANA"]
      }),
      N("PHA type 2 (Gordon syndrome) and CNI", "nephro", {
        s: "HTN, hyperK, NAGMA, renin ต่ำ ตอบสนอง thiazide",
        link: "htn-young"
      })
    ]),
    N("Acidosis of CKD", "step", {
      s: "NH4 production ลดตาม nephron mass, ระยะแรกเป็น NAGMA และ AG สูงขึ้นเมื่อ eGFR < 15-20",
      why: "Chronic acidosis สัมพันธ์กับ CKD progression, muscle wasting และ bone disease",
      keys: ["ส่วนใหญ่พบเมื่อ eGFR < 30 ถ้า acidosis รุนแรงขณะ eGFR ยังสูงกว่านี้ให้หา RTA หรือสาเหตุอื่น", "K มักปกติหรือสูง"],
      ix: ["Serum HCO3 trend"],
      std: "KDIGO 2024 CKD guideline: พิจารณา alkali เมื่อ HCO3 < 18 mmol/L, BiCARB (n = 300, อายุ ≥ 60 ปี eGFR < 30, HCO3 < 22) ไม่พบประโยชน์ต่อ physical function และ kidney outcome",
      link: "risingcr"
    }),
    N("Acid or chloride load and anion loss", "step", {
      s: "Exogenous HCl equivalent หรือสูญเสีย ketoanion ทางปัสสาวะ",
      keys: ["Large volume 0.9% NaCl", "Recovery phase ของ DKA", "UAG บวกหลอกจาก unmeasured anion"]
    }, [
      N("Saline-induced hyperchloremic acidosis", "adj", {
        s: "0.9% NaCl ปริมาณมาก Cl 154 mmol/L",
        why: "SMART (n = 15,802 ผู้ป่วย ICU) balanced crystalloid ลด MAKE30 เทียบ saline 14.3% vs 15.4% (OR 0.90, 95% CI 0.82-0.99)",
        ix: ["Fluid balance, Cl"],
        std: "SMART trial (Semler NEJM 2018)"
      }),
      N("Recovery phase of DKA", "adj", {
        s: "Ketoanion ถูกขับทิ้งทางปัสสาวะก่อนเปลี่ยนกลับเป็น HCO3",
        why: "AGMA เปลี่ยนเป็น NAGMA ระหว่างรักษาเป็นเรื่องปกติ ไม่ใช่ treatment failure",
        ix: ["β-hydroxybutyrate, AG trend"],
        link: "agma"
      }),
      N("Toluene and hippurate", "adj", {
        s: "Toluene ถูก metabolize เป็น hippuric acid, hippurate ถูกขับออกเร็วทาง tubular secretion พร้อม Na K และ NH4 จึงเหลือ acidosis แบบ AG ปกติร่วม hypokalemia, ช่วงแรกหรือเมื่อ GFR ลดลงเป็น AGMA ได้",
        ix: ["Urine osmolal gap สูง ขณะที่ UAG บวกหลอก"]
      }),
      N("Exogenous acid", "adj", {
        s: "NH4Cl, arginine HCl, lysine HCl ใน TPN, cholestyramine",
        ix: ["Drug review"]
      })
    ])
  ])
};

/* ===================== HIGH ANION GAP METABOLIC ACIDOSIS ===================== */
TREES.agma = {
  must: [
    "Shock, sepsis, hypoxia, ปวดท้องมากกว่าที่ตรวจพบ (mesenteric ischemia)",
    "DM: insulin ที่หยุด, SGLT2i, อาเจียน กินน้อย ผ่าตัด",
    "Alcohol: ดื่มหนักแล้วหยุดกะทันหัน อาเจียน กินไม่ได้",
    "เหล้าเถื่อน เหล้าขาวปลอม (methanol), น้ำยาหม้อน้ำ (ethylene glycol), ตามัว หลังดื่ม",
    "Aspirin, ยาแก้ปวดปริมาณมาก, น้ำมันระกำ (methyl salicylate)",
    "Paracetamol ใช้ต่อเนื่องในผู้หญิงที่ขาดอาหาร sepsis CKD (5-oxoproline)",
    "ยา: metformin ร่วม AKI, linezolid, NRTI, propofol, isoniazid, iron, lorazepam infusion (propylene glycol)",
    "Short bowel หรือ jejunoileal bypass แล้วสับสนหลังกินคาร์บ (D-lactate)"
  ],
  tree: N("High anion gap metabolic acidosis", "root", {
    s: "คำนวณ AG แก้ albumin, หา compensation และ delta ratio แล้วตรวจ lactate, ketone, Cr, osmolal gap และ salicylate ให้ครบในชุดเดียว",
    why: "AGMA แต่ละกลุ่มมี antidote หรือ extracorporeal treatment เฉพาะ ความล่าช้าใน toxic alcohol หรือ salicylate ทำให้ตายหรือตาบอด",
    keys: ["AG = Na − (Cl + HCO3), แก้ + 2.5 ต่อ albumin ที่ลดลงทุก 1 g/dL จาก 4 g/dL", "Delta ratio (ΔAG/ΔHCO3) เป็นค่าประมาณ ต้องแปลร่วมกับ clinical: < 1 เข้ากับ NAGMA ร่วม (หรือ ketoacidosis ที่เสีย ketoanion ทางปัสสาวะ), 1-2 เข้ากับ pure AGMA (lactic acidosis ราว 1.6, ketoacidosis ราว 1), > 2 เข้ากับ metabolic alkalosis ร่วม หรือ HCO3 สูงเดิมจาก chronic respiratory acidosis", "Osmolal gap > 10 mOsm/kg หลังหัก ethanol ให้สงสัย toxic alcohol (ยิ่ง > 20-25 ยิ่งน่าเชื่อ) แต่สูงเล็กน้อยได้ใน ketoacidosis, lactic acidosis และ CKD และ osmolal gap ปกติไม่ exclude", "pCO2 ต่ำกว่า Winter มาก = respiratory alkalosis ร่วม (salicylate, sepsis)"],
    ix: ["Blood gas, electrolyte, albumin", "Lactate, β-hydroxybutyrate, glucose", "Cr, urea, CK", "Measured serum osmolality, ethanol level", "Salicylate, acetaminophen level", "Urinalysis หา oxalate crystal", "Urine 5-oxoproline ถ้าสงสัย"],
    std: "EXTRIP workgroup recommendations สำหรับ toxic alcohol, salicylate และ metformin"
  }, [
    N("Lactic acidosis", "step", {
      s: "Lactate > 4 mmol/L หรือ > 2 ร่วม acidemia",
      why: "Type A คือ tissue hypoperfusion, type B คือ mitochondrial หรือ metabolic โดยไม่มี hypoxia",
      keys: ["Shock หรือ hypoxemia เข้ากับ type A", "Lactate สูงแต่ systemic hemodynamics ดี: ต้อง exclude regional ischemia (mesenteric, limb) ก่อน แล้วจึงคิดถึง type B"],
      ix: ["Lactate ซ้ำ, ScvO2, CT angiography ถ้าคิด mesenteric ischemia"],
      std: "Surviving Sepsis Campaign 2021"
    }, [
      N("Type A: shock and tissue hypoxia", "adj", {
        s: "Septic, cardiogenic, hypovolemic shock, mesenteric ischemia, CO และ cyanide poisoning, severe anemia",
        why: "Cyanide (fire smoke, nitroprusside) ทำให้เซลล์ใช้ O2 ไม่ได้ (histotoxic hypoxia บางตำราจัดเป็น type B) lactate จึงสูงมากร่วมกับ venous O2 saturation สูง",
        ix: ["Lactate, COHb, cyanide"]
      }),
      N("Metformin-associated lactic acidosis", "nephro", {
        s: "Metformin สะสมเมื่อ AKI หรือ eGFR < 30",
        why: "EXTRIP 2015: recommend ECTR เมื่อ lactate > 20 mmol/L, pH ≤ 7.0 หรือ standard therapy ล้มเหลว, suggest เมื่อ lactate 15-20 mmol/L หรือ pH 7.0-7.1, และให้ลด threshold ลงเมื่อมี shock, kidney function ลด, liver failure หรือ consciousness ลด",
        keys: ["Lactate สูงมาก", "AKI ร่วม"],
        ix: ["Metformin level, lactate"],
        std: "EXTRIP 2015 metformin"
      }),
      N("Drug and nutritional type B", "adj", {
        s: "Linezolid, NRTI (stavudine, didanosine), propofol infusion syndrome, epinephrine, β2 agonist, thiamine deficiency, isoniazid seizure",
        why: "Lactic acidosis จาก thiamine deficiency (alcohol, malnutrition, dialysis, TPN ที่ไม่มี vitamin) ดีขึ้นภายในไม่กี่ชั่วโมงหลังให้ IV thiamine",
        ix: ["Drug review, thiamine trial"]
      }),
      N("Malignancy and liver failure", "adj", {
        s: "Warburg effect ใน lymphoma หรือ leukemia, liver failure ลด lactate clearance",
        ix: ["LDH, LFT, imaging"],
        link: "onco"
      }),
      N("D-lactic acidosis", "adj", {
        s: "Short bowel, jejunoileal bypass, ataxia และ encephalopathy หลังมื้อคาร์บ",
        why: "L-lactate ปกติ ต้องสั่ง D-lactate เฉพาะ",
        ix: ["D-lactate"]
      })
    ]),
    N("Ketoacidosis", "step", {
      s: "β-hydroxybutyrate ≥ 3.0 mmol/L",
      keys: ["Glucose ≥ 200 mg/dL หรือมี DM เดิม: DKA", "Glucose < 200 mg/dL ในคนเป็น DM: euglycemic DKA (SGLT2i, pregnancy, กินน้อย, ได้ insulin มาบางส่วน)", "ไม่มี DM และ glucose ปกติหรือต่ำ: alcoholic หรือ starvation ketoacidosis", "Nitroprusside dipstick วัดแค่ acetoacetate จึงต่ำหลอกใน alcoholic ketoacidosis"],
      ix: ["β-hydroxybutyrate, glucose, ethanol, lipase"],
      std: "ADA, EASD, JBDS, AACE, DTS 2024 hyperglycemic crises consensus"
    }, [
      N("Diabetic ketoacidosis", "adj", {
        s: "Glucose ≥ 200 mg/dL หรือมีประวัติ DM, β-OHB ≥ 3.0 mmol/L, pH < 7.3 หรือ HCO3 < 18 mmol/L",
        why: "K แรกรับอาจปกติหรือสูงทั้งที่ total body K ขาด, ต้องรู้ค่า K ก่อนเริ่ม insulin: ถ้า K < 3.5 mmol/L ให้แก้ K ก่อนและชะลอ insulin, ถ้า K 3.5-5.0 ให้ K ไปพร้อม insulin",
        ix: ["β-OHB, glucose, blood gas, K, PO4"],
        std: "2024 hyperglycemic crises consensus",
        link: "hypok"
      }),
      N("Euglycemic DKA with SGLT2 inhibitor", "adj", {
        s: "Glucose < 200 mg/dL (เกณฑ์ 2024, เดิมใช้ < 250), ตัวกระตุ้น: ผ่าตัด อดอาหาร ลดหรือหยุด insulin, acute illness",
        why: "FDA แนะนำหยุด SGLT2i อย่างน้อย 3 วันก่อน elective surgery (ertugliflozin 4 วัน) และตรวจ ketone ทุกครั้งที่ป่วยแม้ glucose ไม่สูง",
        ix: ["β-OHB, drug history"]
      }),
      N("Alcoholic and starvation ketoacidosis", "adj", {
        s: "ดื่มหนักแล้วอาเจียน กินไม่ได้ หรืออดอาหารนาน",
        why: "พบ mixed disorder ได้บ่อย: AGMA ร่วม metabolic alkalosis จากการอาเจียน (delta ratio > 2) และ respiratory alkalosis จาก withdrawal หรือ liver disease, pH จึงอาจปกติหรือสูงได้",
        ix: ["β-OHB, glucose, lipase, ethanol"],
        link: "metalk"
      })
    ]),
    N("Toxic alcohols", "step", {
      s: "Osmolal gap สูงช่วงแรก แล้ว AG สูงขึ้นเมื่อ metabolize",
      why: "Osmolal gap ปกติไม่ exclude toxic alcohol เพราะช่วงท้าย parent alcohol ถูกเปลี่ยนเป็น acid metabolite ที่ไม่เพิ่ม osmolal gap, กลับกัน AG ปกติช่วงแรกก็ไม่ exclude โดยเฉพาะเมื่อดื่ม ethanol ร่วมซึ่งชะลอ metabolism",
      keys: ["Osmolal gap = measured Sosm − (2 × Na + glucose/18 + BUN/2.8 + ethanol/3.7) โดย glucose, BUN, ethanol หน่วย mg/dL", "เหล้าเถื่อนระบาดเป็นกลุ่ม", "Visual symptoms ชี้ methanol", "AKI กับ oxalate crystal ชี้ ethylene glycol"],
      ix: ["Measured osmolality, ethanol, methanol และ ethylene glycol level ถ้ามี", "Urinalysis หา calcium oxalate monohydrate", "Fundoscopy"],
      std: "EXTRIP 2015 methanol, EXTRIP 2023 ethylene glycol, AACT practice guidelines (methanol 2002, ethylene glycol 1999)"
    }, [
      N("Methanol", "adj", {
        s: "Formic acid ทำ optic neuropathy และ putaminal necrosis",
        why: "Fomepizole หรือ ethanol ร่วม hemodialysis, EXTRIP แนะนำ ECTR เมื่อ coma, seizure, visual deficit ใหม่, pH ≤ 7.15, AG > 24 mmol/L หรือ methanol > 700 mg/L ขณะได้ fomepizole (> 600 กับ ethanol, > 500 ถ้าไม่มี ADH blocker)",
        keys: ["ตามัว เห็นเหมือนหิมะตก (snowfield vision) หลัง latent period 12-24 ชั่วโมง", "Severe AGMA"],
        ix: ["Methanol level, MRI brain"],
        std: "EXTRIP 2015 methanol"
      }),
      N("Ethylene glycol", "nephro", {
        s: "Glycolate ทำ acidosis, oxalate ทำ AKI",
        why: "Calcium oxalate monohydrate crystal กับ hypocalcemia เป็นจุดแยก",
        keys: ["AKI, hypocalcemia", "Wood lamp fluorescence ของปัสสาวะไม่ไวและไม่จำเพาะ ไม่ใช้ตัดสิน"],
        ix: ["Urinalysis, ethylene glycol level, glycolate"],
        link: "oliguria"
      }),
      N("Diethylene glycol and propylene glycol", "adj", {
        s: "DEG ในยาน้ำปนเปื้อน ทำ AKI และ neuropathy, PG จาก lorazepam หรือ diazepam infusion",
        ix: ["Osmolal gap, lactate (PG ทำ L และ D-lactate)"]
      })
    ]),
    N("Salicylate and 5-oxoproline", "step", {
      s: "Drug-related AGMA ที่ต้องสั่ง level เฉพาะ",
      keys: ["Mixed respiratory alkalosis + AGMA ในผู้ใหญ่: ต้องส่ง salicylate level ทุกราย (ddx sepsis, liver failure)", "AGMA ที่หาสาเหตุไม่ได้ + paracetamol ต่อเนื่อง + หญิง, malnutrition, sepsis หรือ CKD: สงสัย 5-oxoproline"]
    }, [
      N("Salicylate poisoning", "adj", {
        s: "Tinnitus, hyperventilation, noncardiogenic pulmonary edema, AMS",
        why: "EXTRIP: ECTR เมื่อ level > 7.2 mmol/L (100 mg/dL), > 6.5 mmol/L (90 mg/dL) เมื่อ kidney function ลด, AMS, hypoxemia ใหม่ที่ต้องให้ O2, standard therapy ล้มเหลว และ suggest เมื่อ pH ≤ 7.20",
        keys: ["เลี่ยง intubation ถ้าทำได้ ถ้าจำเป็นต้องตั้ง minute ventilation สูงให้ pCO2 ต่ำเท่าก่อน intubate เพราะ pH ที่ลดลงทำให้ salicylate เข้าสมองมากขึ้น", "Urinary alkalinization ด้วย NaHCO3 เป้า urine pH 7.5-8 และแก้ hypokalemia ร่วม"],
        ix: ["Salicylate level ซ้ำทุก 2 ชั่วโมง (bezoar)"],
        std: "EXTRIP 2015 salicylate"
      }),
      N("Pyroglutamic acidosis (5-oxoproline)", "adj", {
        s: "Glutathione depletion จาก paracetamol ร่วม sepsis, malnutrition, CKD, flucloxacillin, vigabatrin",
        why: "ให้คิดถึงเมื่อ AGMA หาสาเหตุไม่ได้ (lactate, ketone, toxic alcohol, salicylate ปกติ) ในผู้ป่วยใน ward ที่ได้ paracetamol ต่อเนื่องแม้ขนาดรักษา ส่วนใหญ่เป็นหญิงที่มี malnutrition, sepsis หรือ CKD",
        ix: ["Urine organic acid (5-oxoproline)"],
        std: "รักษาด้วยหยุด paracetamol และยาที่เป็นเหตุ, N-acetylcysteine มีหลักฐานระดับ case report"
      })
    ]),
    N("Kidney failure and others", "step", {
      s: "Uremic acidosis และ AG จาก organic anion อื่น",
      keys: ["eGFR < 15-20", "CK สูงมาก", "Iron หรือ isoniazid overdose"]
    }, [
      N("Uremic acidosis", "nephro", {
        s: "PO4, sulfate, urate คั่ง AG มักไม่เกิน 20-24",
        why: "AG > 24 ใน CKD ควรหาสาเหตุอื่นร่วม",
        ix: ["Cr, PO4"],
        link: "risingcr"
      }),
      N("Rhabdomyolysis", "nephro", {
        s: "Organic anion และ PO4 จากกล้ามเนื้อ",
        ix: ["CK, myoglobin"],
        link: "myalgia"
      }),
      N("Other toxins", "adj", {
        s: "Iron, isoniazid, cyanide, toluene ช่วงแรก, paraldehyde",
        ix: ["Toxicology"]
      })
    ])
  ])
};

/* ===================== METABOLIC ALKALOSIS ===================== */
TREES.metalk = {
  must: [
    "อาเจียน NG suction, bulimia, ใส่ใจรูปร่างและน้ำหนักมาก",
    "ยาขับปัสสาวะ ยาลดน้ำหนัก ยาระบาย (ถามตรงๆ)",
    "HTN, hypokalemia, ประวัติครอบครัว (mineralocorticoid excess)",
    "Calcium carbonate, antacid, NaHCO3, citrate, massive transfusion, CRRT citrate",
    "ชะเอม ยาสมุนไพร, glucocorticoid ขนาดสูง",
    "ตะคริว อ่อนเพลีย ปัสสาวะมาก ตั้งแต่เด็ก (Bartter, Gitelman)",
    "COPD ที่ได้ ventilator แล้ว pCO2 ลดเร็ว (post-hypercapnia)",
    "Diarrhea เป็นน้ำตั้งแต่เกิด (congenital chloride diarrhea), villous adenoma"
  ],
  tree: N("Metabolic alkalosis", "root", {
    s: "แยก generation กับ maintenance แล้วใช้ urine Cl กับ BP แยก chloride-responsive, mineralocorticoid excess และ tubular disorder",
    why: "Maintenance ต้องมี volume หรือ Cl depletion, hypokalemia, GFR ต่ำ หรือ mineralocorticoid excess เสมอ ไม่เช่นนั้นไตจะขับ HCO3 ทิ้งได้เอง",
    keys: ["Expected pCO2 = 0.7 × HCO3 + 20 ± 5", "Urine Cl < 20 mEq/L = chloride-responsive", "Urine Cl > 20 + HTN = mineralocorticoid excess หรือ mineralocorticoid-like state (ต้อง exclude ผู้ป่วย HTN ที่กิน diuretic อยู่ก่อน)", "Urine Cl > 20 + BP ปกติหรือต่ำ = current diuretic, Bartter, Gitelman, severe hypoK", "Urine Na ไม่น่าเชื่อถือเพราะ bicarbonaturia พา Na ออก"],
    ix: ["Blood gas, electrolyte, Mg, Ca", "Spot urine Na, K, Cl, Ca, Cr, pH", "Urine diuretic screen", "Plasma renin, aldosterone"],
    std: "Urine Cl เป็นตัวแยกหลัก (Seldin และ Rector classification)"
  }, [
    N("Chloride-responsive (urine Cl < 20)", "step", {
      s: "Cl และ volume depletion ตอบสนองต่อ NaCl และ KCl",
      why: "แก้ด้วย 0.9% NaCl ร่วม KCl, PPI ช่วยลด loss ใน NG suction",
      keys: ["Volume depletion", "Urine Cl ต่ำ", "Urine pH > 6.5 ช่วง active vomiting"],
      ix: ["Urine Cl, volume assessment"]
    }, [
      N("Vomiting and NG suction", "adj", {
        s: "เสีย HCl ทำ generation, volume depletion ทำ maintenance",
        why: "Surreptitious vomiting ใน eating disorder: dental erosion, parotid enlargement, Russell sign",
        ix: ["Urine Cl"],
        link: "nausea"
      }),
      N("Remote diuretic use", "adj", {
        s: "Urine Cl ต่ำเมื่อยาหมดฤทธิ์",
        why: "Urine Cl ที่สลับสูงต่ำชี้การใช้ยาเป็นช่วงๆ",
        ix: ["Diuretic screen ซ้ำ"]
      }),
      N("Post-hypercapnic alkalosis", "adj", {
        s: "COPD ที่ HCO3 สูงเพื่อ compensate แล้ว pCO2 ถูกลดเร็วด้วย ventilator",
        why: "Alkalemia รุนแรงเสี่ยง seizure และ arrhythmia, ป้องกันด้วยลด pCO2 ช้าๆ, รักษาด้วยการให้ Cl (NaCl, KCl) และใช้ acetazolamide เมื่อมี volume overload ให้ saline ไม่ได้",
        ix: ["ABG trend"]
      }),
      N("GI chloride loss", "adj", {
        s: "Congenital chloride diarrhea (SLC26A3), villous adenoma, laxative abuse เรื้อรัง, และ cystic fibrosis (เสีย Cl ทางเหงื่อ ไม่ใช่ทาง GI)",
        ix: ["Stool Cl > 90 mmol/L, sweat chloride"],
        link: "diarrhea"
      })
    ]),
    N("Chloride-resistant with hypertension", "step", {
      s: "Mineralocorticoid excess หรือ mineralocorticoid-like activity, volume expanded",
      keys: ["Renin กับ aldosterone แยก 3 pattern", "Renin ต่ำร่วม aldosterone ต่ำ = ไม่ใช่ aldosterone excess แต่เป็น mineralocorticoid ตัวอื่นหรือ ENaC ทำงานเกิน (pseudohyperaldosteronism) ซึ่งภาพทางคลินิกเหมือน primary aldosteronism"],
      ix: ["Renin, aldosterone, ARR, cortisol"],
      link: "htn-young"
    }, [
      N("Primary aldosteronism", "nephro", {
        s: "Renin ต่ำ ร่วมกับ aldosterone สูงหรือไม่ถูกกดอย่างเหมาะสม (ค่า aldosterone อยู่ในช่วงปกติได้), hypokalemia และ alkalosis พบเพียงส่วนน้อยของ PA",
        ix: ["ARR, confirmatory test, AVS"],
        std: "Endocrine Society 2025",
        link: "htn-young"
      }),
      N("Low-aldosterone states (pseudohyperaldosteronism)", "nephro", {
        s: "MR ถูกกระตุ้นด้วย steroid อื่น (AME, licorice, Cushing, CAH, DOC tumor) หรือ ENaC ทำงานเกินเองโดยไม่ขึ้นกับ MR (Liddle)",
        why: "Renin ต่ำ aldo ต่ำ, แยกด้วยการตอบสนองต่อยา: spironolactone ได้ผลเมื่อ MR ถูกกระตุ้น แต่ Liddle ต้องใช้ amiloride",
        ix: ["Cortisol, cortisol/cortisone ratio, genetic"],
        link: "hypok"
      }),
      N("Secondary hyperaldosteronism", "nephro", {
        s: "Renin สูง aldosterone สูง: renovascular HTN, renin-secreting tumor, malignant HTN",
        ix: ["Renal artery imaging"],
        link: "htn-emerg"
      })
    ]),
    N("Chloride-resistant with normal or low BP", "step", {
      s: "Tubular salt wasting หรือ current diuretic",
      keys: ["Urine Ca ช่วยแยก Bartter (ปกติหรือสูง) กับ Gitelman (ต่ำ) แต่ Bartter type 3 ซ้อนกับ Gitelman ได้ ยืนยันด้วย genetic test", "Severe hypoK < 2 mmol/L ทำ maintenance เอง"],
      ix: ["Urine Ca/Cr, Mg, diuretic screen"],
      link: "hypok"
    }, [
      N("Current diuretic use", "adj", {
        s: "Loop หรือ thiazide",
        ix: ["Urine diuretic screen"]
      }),
      N("Gitelman syndrome", "nephro", {
        s: "Hypocalciuria ร่วม hypomagnesemia (serum Mg ปกติได้ในบางราย), SLC12A3, onset วัยรุ่นหรือผู้ใหญ่",
        std: "KDIGO 2017 Gitelman controversies",
        link: "mg"
      }),
      N("Bartter syndrome", "nephro", {
        s: "Urine Ca ปกติหรือสูง, onset antenatal หรือวัยเด็ก, ข้อยกเว้น type 3 (CLCNKB) เริ่มช้าและ phenotype คล้าย Gitelman ได้",
        link: "hypok"
      }),
      N("Severe hypokalemia and hypomagnesemia", "nephro", {
        s: "K < 2 mmol/L กระตุ้น H+-K+-ATPase และ ammoniagenesis",
        ix: ["K, Mg"]
      }),
      N("Hypercalcemia and calcium-alkali syndrome", "nephro", {
        s: "Ca carbonate (alkali load) ร่วม AKI, hypercalcemia กระตุ้น CaSR ที่ TAL ทำ salt wasting คล้าย loop diuretic และ GFR ที่ลดลงทำให้ขับ HCO3 ไม่ได้",
        link: "hyperca"
      }),
      N("Nonreabsorbable anions and refeeding", "adj", {
        s: "Penicillin หรือ carbenicillin ขนาดสูง (nonreabsorbable anion เพิ่ม distal H+ และ K+ secretion ไม่ใช่ alkali load โดยตรง), refeeding หลัง starvation (ketoanion ที่ค้างถูก metabolize เป็น HCO3)",
        ix: ["Drug review"]
      })
    ]),
    N("Alkali load with reduced GFR", "step", {
      s: "ไตปกติขับ alkali load ได้มาก alkalosis คงอยู่ได้เมื่อ GFR ต่ำ",
      keys: ["CKD หรือ AKI", "Citrate หรือ bicarbonate exposure"]
    }, [
      N("Exogenous bicarbonate, citrate and acetate", "adj", {
        s: "NaHCO3, massive transfusion, regional citrate ใน CRRT, plasma exchange, acetate ใน TPN",
        why: "Citrate 1 mmol ให้ HCO3 3 mmol",
        ix: ["Fluid and blood product review, total/ionized Ca ratio"]
      }),
      N("Dialysis-related alkalosis", "nephro", {
        s: "Dialysate HCO3 สูง ร่วมกับกินน้อยและ PPI",
        ix: ["Pre-dialysis HCO3 trend"],
        link: "hd-mbd"
      })
    ])
  ])
};

/* ===================== SECONDARY AND RESISTANT HYPERTENSION ===================== */
TREES["htn-young"] = {
  must: [
    "อายุที่เริ่ม HTN (< 30-40 ปี), ความรุนแรง, เริ่มเร็วหรือแย่ลงเร็ว, ยาที่ใช้ครบ 3 ตัวรวม diuretic ไหม",
    "วัดความดันที่บ้านอย่างไร, ABPM, การกินยาจริง, ขนาดยา",
    "ยา: NSAID, OCP, glucocorticoid, CNI, VEGF inhibitor และ TKI, ESA, decongestant, amphetamine, methylphenidate, venlafaxine, ชะเอม ยาสมุนไพร, cocaine",
    "เกลือ alcohol, กรน หลับไม่สนิท ง่วงกลางวัน (OSA)",
    "Paroxysm: ปวดศีรษะ เหงื่อ ใจสั่น (pheochromocytoma)",
    "อ่อนแรง ตะคริว ปัสสาวะมาก (hypokalemia), รูปร่าง cushingoid, thyroid symptoms",
    "Claudication ปวดขาเวลาเดิน, ชีพจรแขนขาต่างกัน, ปวดศีรษะในหญิงสาว (FMD, Takayasu, coarctation)",
    "ประวัติครอบครัว HTN อายุน้อย, stroke อายุน้อย, hypokalemia, ADPKD"
  ],
  tree: N("Secondary and resistant hypertension", "root", {
    s: "ยืนยันว่าเป็น true resistant หรือ secondary HTN ด้วย out-of-office BP และ adherence ก่อน แล้วหาสาเหตุตามกลุ่ม renal parenchymal, renovascular, mineralocorticoid excess, catecholamine และ endocrine อื่น, vascular, drug และ OSA",
    why: "Secondary HTN พบราว 10% ของผู้ป่วย HTN และมากกว่านั้นมากในคนอายุน้อยหรือ resistant หลายสาเหตุมีการรักษาจำเพาะ และบางส่วนหายขาดได้เมื่อวินิจฉัยเร็ว",
    keys: ["Resistant HTN: BP ไม่ถึงเป้าแม้ใช้ 3 ยาขนาดเต็มรวม diuretic หรือคุมได้ด้วย ≥ 4 ยา", "Hypokalemia, onset < 30 ปี, target organ damage ไม่สมสัดส่วน, เป็นเร็ว", "Renin และ aldosterone เป็นตัวแยกกลุ่ม mineralocorticoid", "Cr ขึ้น > 30% หลังเริ่ม ACEi หรือ ARB: ให้สงสัย bilateral RAS หรือ RAS ของ solitary kidney หลัง exclude volume depletion, NSAID และ heart failure"],
    ix: ["ABPM หรือ HBPM", "Cr, eGFR, UACR, urinalysis", "Electrolyte, aldosterone, renin, ARR", "TSH, Ca", "Plasma free metanephrines หรือ 24-h urine fractionated metanephrines ตามข้อบ่งชี้", "1-mg DST หรือ late-night salivary cortisol ตามข้อบ่งชี้", "Renal artery duplex, CTA หรือ MRA", "Sleep study"],
    std: "AHA 2018 resistant hypertension scientific statement, 2025 AHA/ACC hypertension guideline, ESC 2024, ESH 2023, Thai Hypertension Society 2019 guideline"
  }, [
    N("Pseudoresistance", "step", {
      s: "ตัดก่อนตรวจหาสาเหตุ",
      why: "ราวครึ่งหนึ่งของ apparent resistant HTN เป็น pseudoresistance",
      keys: ["White-coat effect บน ABPM", "Cuff เล็กเกินไป ไม่พักก่อนวัด", "Nonadherence", "Regimen ไม่เหมาะสม (ไม่มี diuretic, ขนาดต่ำ, short-acting)"],
      ix: ["ABPM 24 ชั่วโมง", "Pill count, drug level ในปัสสาวะถ้ามี"],
      std: "AHA 2018 resistant hypertension"
    }, [
      N("White-coat effect", "adj", {
        s: "Office BP สูงแต่ out-of-office BP ปกติ: 24-h ABPM < 130/80 (daytime < 135/85 ตาม ESC/ESH, < 130/80 ตาม AHA/ACC)",
        ix: ["ABPM"]
      }),
      N("Nonadherence and suboptimal regimen", "adj", {
        s: "Regimen ที่เหมาะสมต้องมี long-acting thiazide-like diuretic (chlorthalidone หรือ indapamide แทน HCTZ), ใน advanced CKD ยังได้ผล: CLICK (n = 160, eGFR 15-29) chlorthalidone ลด 24-h SBP มากกว่า placebo 10.5 mmHg (95% CI 6.4-14.6) โดยไม่ได้เทียบกับ HCTZ",
        why: "เพิ่ม spironolactone เป็นยาตัวที่ 4 ตาม PATHWAY-2 (n = 335, eGFR ≥ 45) ซึ่งลด home SBP ได้มากกว่า placebo 8.7 mmHg และมากกว่า bisoprolol กับ doxazosin, ใน CKD ต้องติดตาม K",
        ix: ["Medication review"],
        std: "PATHWAY-2, CLICK"
      }),
      N("Lifestyle contributors", "adj", {
        s: "Sodium > 2 g/d, alcohol, obesity, physical inactivity",
        ix: ["24-h urine Na"],
        link: "obesity"
      })
    ]),
    N("Renal parenchymal disease", "step", {
      s: "CKD ทุกสาเหตุ สาเหตุ secondary HTN ที่พบบ่อยที่สุด",
      keys: ["eGFR ลด, UACR สูง, active sediment", "ไตใหญ่มีถุงน้ำ: ADPKD"],
      ix: ["UA, UACR, ultrasound"],
      std: "KDIGO 2021 BP in CKD: SBP < 120 ถ้าทนได้ (standardized office BP)"
    }, [
      N("Glomerular disease and CKD", "nephro", {
        s: "GN, DKD, IgAN, LN",
        ix: ["UA sediment, UPCR"],
        link: "proteinuria"
      }),
      N("ADPKD", "nephro", {
        keys: ["Hypokalemia ใน ADPKD ไม่ใช่ลักษณะปกติ ให้หา PA ร่วมหรือ diuretic", "Renin สูง aldo สูงจาก cyst compression ได้", "Young HTN ที่คลำไตได้หรือมี liver cyst ให้ทำ US แม้ไม่มี family history ชัด (de novo หรือ family history ไม่ทราบราว 10-25%)"],
        s: "HTN ก่อน GFR ลด จาก RAAS activation",
        why: "HALT-PKD study A: เป้า BP 95/60-110/75 เทียบ 120/70-130/80 ในอายุ 15-49 ปีที่ eGFR > 60 ชะลอการเพิ่ม TKV (5.6% vs 6.6% ต่อปี) แต่ eGFR decline โดยรวมไม่ต่างกัน",
        ix: ["Ultrasound หรือ MRI, TKV"],
        std: "HALT-PKD study A (n = 558)",
        link: "cysts"
      }),
      N("Reflux nephropathy and obstruction", "nephro", {
        s: "Scar ทำ renin สูง",
        ix: ["DMSA, VCUG"],
        link: "kidneysize"
      })
    ]),
    N("Renovascular hypertension", "step", {
      s: "Atherosclerotic RAS ในผู้สูงอายุ, FMD และ Takayasu ในหญิงสาว",
      why: "Revascularization ได้ประโยชน์ชัดใน FMD แต่ไม่ใช่ใน atherosclerotic RAS ส่วนใหญ่",
      keys: ["Abdominal bruit", "Asymmetric kidney > 1.5 cm", "Flash pulmonary edema", "Cr ขึ้นหลัง RAASi"],
      ix: ["Duplex (PSV > 200 cm/s, renal-aortic ratio > 3.5)", "CTA หรือ MRA", "Catheter angiography ถ้าจะ intervene"],
      std: "CORAL (n = 947) และ ASTRAL (n = 806): stenting ไม่ดีกว่า medical therapy ใน atherosclerotic RAS",
      link: "kidneysize"
    }, [
      N("Atherosclerotic renal artery stenosis", "nephro", {
        s: "Ostial lesion ในผู้ที่มี atherosclerosis ที่อื่น",
        why: "Medical therapy เป็นหลักทุกราย, พิจารณา revascularization เฉพาะ high-risk phenotype ที่ stenosis มีนัยสำคัญทาง hemodynamics: flash pulmonary edema, kidney function ลดลงเร็ว (รวม AKI หลัง RAASi ใน bilateral RAS) หรือ refractory HTN",
        ix: ["Duplex, CTA"],
        std: "CORAL, ASTRAL, ESH 2023"
      }),
      N("Fibromuscular dysplasia", "nephro", {
        s: "Multifocal string-of-beads ที่ mid-distal renal artery, หญิงอายุ 15-50 ปี",
        why: "PTA โดยไม่ต้องใส่ stent ได้ผลดีใน multifocal FMD, ต้องตรวจ cerebrovascular bed ด้วย (aneurysm, dissection, SCAD)",
        keys: ["Pulsatile tinnitus, headache", "ประวัติ SCAD หรือ cervical artery dissection"],
        ix: ["CTA head to pelvis"],
        std: "First international consensus on FMD 2019 (ESH, SVM)"
      }),
      N("Takayasu arteritis and middle aortic syndrome", "nephro", {
        s: "หญิงเอเชียอายุ < 40, claudication แขน, ชีพจรเบา, BP แขนต่างกัน > 10 mmHg",
        why: "Subclavian stenosis ทำให้ BP ที่แขนต่ำกว่า central BP จริง ต้องวัด BP ทั้ง 4 extremities และใช้ค่าสูงสุด",
        keys: ["ESR, CRP สูง", "Bruit ที่ subclavian หรือ aorta"],
        ix: ["CTA หรือ MRA aorta, PET-CT"],
        std: "ACR/EULAR 2022 Takayasu classification",
        link: "bluetoe"
      }),
      N("Other renovascular lesions", "nephro", {
        s: "Renal artery dissection, embolism, aneurysm, Page kidney, NF1",
        ix: ["CTA"],
        link: "flank"
      })
    ]),
    N("Low-renin hypertension", "step", {
      s: "Renin ถูกกด ใช้ aldosterone แยกต่อเป็น 3 กลไก: aldosterone สูงจริง (mineralocorticoid excess), steroid อื่นหรือ receptor ทำงานเกินโดย aldosterone ต่ำ (mineralocorticoid-like activity) และ Na reabsorption เกินที่ไม่ผ่าน MR",
      why: "PA เป็นสาเหตุ endocrine ที่พบบ่อยที่สุด พบราว 5-14% ของ HTN และถึง 29% ของ resistant HTN แต่ Liddle, AME และ Gordon ไม่ใช่ aldosterone excess (aldosterone ต่ำหรือไม่สูง) จึงต้องแยกด้วย aldosterone ก่อนเลือกยา",
      keys: ["Endocrine Society 2025: screen ทุกคนที่ HTN", "2025 AHA/ACC: screen ทุกคนที่ resistant HTN แม้ K ปกติ", "Screen ครั้งแรกทำได้โดยไม่ต้องหยุดยา (Endocrine Society 2025 รวมถึง MRA, ส่วน AHA/ACC 2025 ให้ยกเว้น MRA), ถ้าผลไม่เข้ากับ clinical ให้ตรวจซ้ำหลังปรับยา: β-blocker และ central α2-agonist กด renin ทำ false positive ส่วน MRA, diuretic, ACEi, ARB เพิ่ม renin ทำ false negative (ถ้า renin ยังถูกกดขณะกินยากลุ่มหลัง ผลบวกเชื่อถือได้)", "Renin ต่ำไม่ได้แปลว่าเป็นโรคในกลุ่มนี้เสมอ: low-renin essential HTN (ผู้สูงอายุ, salt-sensitive) พบบ่อยกว่า", "K ต่ำและ alkalosis เข้ากับ ENaC หรือ MR activation ส่วน K สูงกับ NAGMA เข้ากับ Gordon, แต่ K ปกติไม่ exclude PA เพราะ PA ส่วนใหญ่ K ปกติ"],
      ix: ["Plasma renin (PRA หรือ DRC), aldosterone, ARR, K, HCO3", "Screen บวก = renin ถูกกด (PRA ≤ 1 ng/mL/h หรือ DRC ≤ 8.2 mU/L) ร่วมกับ aldosterone ≥ 10 ng/dL (immunoassay) และ ARR > 20 ng/dL ต่อ ng/mL/h", "Endocrine Society 2025: aldosterone suppression test (seated saline infusion, oral salt loading, captopril challenge, fludrocortisone suppression) ทำเฉพาะกลุ่ม intermediate probability ที่ต้องการผ่าตัด, จากนั้น CT adrenal และ AVS ในผู้ที่จะผ่าตัด, ผู้ที่ไม่ผ่าตัดเริ่ม MRA ได้โดยไม่ต้องทำ", "Aldosterone ต่ำ: urine cortisol/cortisone ratio, 24-h UFC, DOC, 11-deoxycortisol, genetic testing", "การตอบสนองต่อยา: spironolactone (MR), amiloride (ENaC), thiazide (NCC), dexamethasone (FH-I)"],
      std: "Endocrine Society 2025 PA guideline, 2025 AHA/ACC guideline"
    }, [
      N("High aldosterone: true mineralocorticoid excess", "step", {
        s: "Aldosterone สูงโดย renin ถูกกด",
        why: "Aldosterone หลั่งเองโดยไม่ขึ้นกับ angiotensin II",
        keys: ["ARR สูงต้องมาพร้อม aldosterone ≥ 10 ng/dL (immunoassay) เพราะ renin ที่ต่ำมากอย่างเดียวทำให้ ARR สูงได้ทั้งที่ aldosterone ต่ำ"],
        ix: ["Confirmatory test, CT adrenal, AVS", "Chimeric gene test ในเด็กหรือครอบครัว"]
      }, [
        N("Primary aldosteronism", "nephro", {
          s: "Aldosterone-producing adenoma, bilateral adrenal hyperplasia, familial (FH-II ถึง IV), carcinoma",
          why: "Unilateral disease ที่ lateralize ได้ใน surgical candidate: adrenalectomy, bilateral disease หรือไม่ผ่าตัด: MRA (spironolactone เป็นตัวแรก) titrate จน BP คุมได้และ renin ไม่ถูกกด",
          keys: ["ข้าม aldosterone suppression test ได้เมื่อ spontaneous hypoK ร่วมกับ renin ถูกกดจนวัดไม่ได้และ aldosterone > 20 ng/dL", "AVS ก่อนผ่าตัดเกือบทุกราย เพราะ CT อย่างเดียว lateralize ผิดได้ ยกเว้นอายุ < 35 ปีที่มี spontaneous hypoK, aldosterone สูงมาก (> 30 ng/dL) และ unilateral adenoma > 1 cm โดย adrenal อีกข้างปกติ", "PA ที่มี adrenal adenoma ให้ทำ 1-mg DST หา cortisol co-secretion"],
          ix: ["ARR, confirmatory test, CT, AVS"],
          std: "Endocrine Society 2025"
        }),
        N("Glucocorticoid-remediable aldosteronism (FH-I)", "nephro", {
          s: "CYP11B1/CYP11B2 chimeric gene ทำให้ aldosterone synthase ถูกควบคุมด้วย ACTH, HTN ในเด็ก, stroke จาก intracranial aneurysm",
          why: "Aldosterone สูงจริงแต่ถูกกดได้ด้วย glucocorticoid ขนาดต่ำ",
          ix: ["Chimeric gene test, aldosterone ลดลงหลัง dexamethasone suppression"]
        })
      ]),
      N("Low aldosterone with hypokalemia: mineralocorticoid-like activity", "step", {
        s: "Renin ต่ำ aldosterone ต่ำ (pseudohyperaldosteronism) ภาพเหมือน aldosterone สูงแต่ไม่ใช่ aldosterone",
        why: "MR ถูกกระตุ้นด้วยสารอื่น (cortisol, DOC, progesterone) หรือ ENaC ทำงานเกินเองโดยไม่ขึ้นกับ MR, volume ที่ขยายกดทั้ง renin และ aldosterone",
        keys: ["ตอบสนอง spironolactone: AME, licorice, CAH, DOC tumor, Cushing", "ไม่ตอบสนอง spironolactone แต่ตอบสนอง amiloride: Liddle (defect อยู่ downstream ของ MR)", "Spironolactone ทำให้แย่ลง: Geller"],
        ix: ["Urine cortisol/cortisone ratio สูง: AME, licorice, ectopic ACTH", "DOC และ 11-deoxycortisol สูง: CAH (11β-OH, 17α-OH), DOC tumor", "24-h UFC, ACTH: Cushing", "Genetic: SCNN1B, SCNN1G (Liddle), HSD11B2 (AME), NR3C2 (Geller)"]
      }, [
        N("Apparent mineralocorticoid excess and licorice", "nephro", {
          s: "11β-HSD2 deficiency หรือถูกยับยั้งด้วย glycyrrhetinic acid ทำให้ cortisol กระตุ้น MR",
          why: "MR ถูกกระตุ้นจริงแต่ด้วย cortisol ไม่ใช่ aldosterone จึงเรียก apparent, ชะเอมในยาจีน ลูกอม และยาสมุนไพรไทยเป็นสาเหตุที่ถามแล้วเจอ",
          ix: ["Urinary free cortisol/cortisone ratio, HSD11B2 genetic"],
          link: "hypok"
        }),
        N("CAH (11β-hydroxylase, 17α-hydroxylase) and DOC-secreting tumor", "nephro", {
          s: "DOC สูงกระตุ้น MR",
          why: "11β-OH deficiency มี virilization, 17α-OH deficiency มี primary amenorrhea หรือ ambiguous genitalia",
          ix: ["11-deoxycortisol, DOC, sex steroid, genetic"],
          link: "hypok"
        }),
        N("Liddle syndrome", "nephro", {
          s: "ENaC gain-of-function (SCNN1B, SCNN1G) ทำงานเองโดยไม่ผ่าน MR, autosomal dominant",
          why: "Defect อยู่ downstream ของ MR จึงไม่ใช่ mineralocorticoid excess และไม่ตอบสนอง spironolactone แต่ตอบสนอง amiloride หรือ triamterene",
          keys: ["HTN อายุน้อยกับ family history", "Renin ต่ำ aldo ต่ำ"],
          ix: ["Genetic test SCNN1B, SCNN1G"],
          link: "hypok"
        }),
        N("Geller syndrome", "nephro", {
          s: "MR S810L activating mutation ที่ progesterone และ spironolactone กลับกระตุ้น MR",
          why: "HTN แย่ลงมากเมื่อตั้งครรภ์ เพราะ progesterone สูง",
          ix: ["Genetic NR3C2"],
          link: "pregnancy"
        })
      ]),
      N("Low or normal aldosterone with hyperkalemia: NCC overactivity", "step", {
        s: "Renin ต่ำ, K สูง, NAGMA, GFR ปกติ",
        why: "ไม่ใช่ mineralocorticoid excess แต่เป็น Na-Cl reabsorption เกินที่ DCT จาก WNK pathway volume จึงขยาย renin ถูกกด และ K secretion ลดลง",
        keys: ["Hyperkalemia กับ HTN และ GFR ปกติ", "ตอบสนอง thiazide ขนาดต่ำ"],
        ix: ["K, HCO3, urine Ca (มักสูง), renin, aldosterone", "Genetic: WNK1, WNK4, KLHL3, CUL3"]
      }, [
        N("Gordon syndrome (PHA2)", "nephro", {
          s: "HyperK, NAGMA, renin ต่ำ, thiazide-responsive",
          why: "ภาพตรงข้ามกับ Gitelman, CUL3 รุนแรงที่สุดและเริ่มในเด็ก",
          ix: ["Genetic WNK1, WNK4, KLHL3, CUL3"],
          link: "hyperk"
        })
      ])
    ]),
    N("Catecholamine and other endocrine causes", "step", {
      s: "Pheochromocytoma และ paraganglioma, Cushing, thyroid, PHPT, acromegaly",
      keys: ["Paroxysm triad: headache, sweating, palpitation", "Cushingoid features", "Hypercalcemia"],
      ix: ["Plasma free หรือ 24-h urine fractionated metanephrines", "1-mg DST, late-night salivary cortisol, 24-h UFC", "TSH, Ca, PTH, IGF-1"]
    }, [
      N("Pheochromocytoma and paraganglioma", "adj", {
        s: "Paroxysmal หรือ sustained HTN, orthostatic hypotension",
        why: "Metanephrines > 3 เท่าของ ULN โอกาสเป็น PPGL สูงมาก ส่วนค่าสูงเล็กน้อยมี false positive ได้บ่อย (TCA, SNRI, levodopa, เจาะท่านั่ง, acute illness) ให้ตรวจซ้ำ, ต้อง α-blockade ก่อน β-blockade และก่อนผ่าตัด, genetic testing ทุกราย (ราว 30-40% germline)",
        keys: ["Adrenal incidentaloma ที่ unenhanced CT > 10 HU (ถ้า ≤ 10 HU โอกาสเป็น pheochromocytoma ต่ำมาก)", "MEN2, VHL, NF1, SDHx"],
        ix: ["Plasma free metanephrines (supine), CT หรือ MRI, Ga-68 DOTATATE PET", "Germline genetic panel"],
        std: "Endocrine Society 2014 pheochromocytoma and paraganglioma guideline",
        link: "paroxysm"
      }),
      N("Cushing syndrome", "adj", {
        s: "Endogenous hypercortisolism",
        ix: ["Exclude exogenous glucocorticoid ก่อน แล้วต้องมี screening test ผิดปกติ 2 ใน 3 ชนิด: 1-mg DST, late-night salivary cortisol, 24-h UFC"],
        std: "Endocrine Society 2008 Cushing diagnosis guideline",
        link: "cushingoid"
      }),
      N("Thyroid disease and PHPT", "adj", {
        s: "Hyperthyroidism ทำ systolic HTN, hypothyroidism ทำ diastolic HTN, PHPT",
        ix: ["TSH, Ca, PTH"],
        link: "hyperca"
      }),
      N("Acromegaly", "adj", {
        s: "GH และ IGF-1 excess ทำ Na retention และ volume expansion",
        ix: ["IGF-1, OGTT GH suppression"]
      })
    ]),
    N("Other causes: coarctation and OSA", "step", {
      s: "Coarctation และ obstructive sleep apnea",
      keys: ["BP แขนสูงกว่าขา > 20 mmHg, radio-femoral delay", "กรน ง่วงกลางวัน คอใหญ่"]
    }, [
      N("Coarctation of the aorta", "adj", {
        s: "HTN ในเด็กหรือผู้ใหญ่อายุน้อย, bicuspid aortic valve, Turner",
        why: "Rib notching บน CXR, HTN อาจคงอยู่หลังซ่อม",
        ix: ["Echo, CTA หรือ MRA aorta"]
      }),
      N("Obstructive sleep apnea", "adj", {
        s: "ภาวะร่วมที่พบบ่อยที่สุดใน resistant HTN (รายงานสูงถึง 70-90%), nondipping หรือ nocturnal HTN บน ABPM",
        why: "CPAP ลด BP ได้เพียงเล็กน้อย (ราว 2-5 mmHg) จึงยังต้องใช้ยา, OSA พบร่วมกับ PA ได้บ่อย การพบ OSA จึงไม่ใช่เหตุให้หยุดหาสาเหตุอื่น",
        ix: ["STOP-BANG, polysomnography"],
        link: "obesity"
      })
    ]),
    N("Drug and substance-induced", "step", {
      s: "ทบทวนยาทุกตัว รวมยานอกใบสั่ง",
      keys: ["เริ่มยาใหม่ก่อน BP ขึ้น", "หยุดยาแล้ว BP ลด"],
      ix: ["Medication reconciliation, urine drug screen"]
    }, [
      N("Common prescribed drugs", "adj", {
        s: "NSAID, OCP ที่มี estrogen, glucocorticoid, ESA, decongestant, SNRI, MAOI",
        ix: ["Drug review"]
      }),
      N("Immunosuppressants and anticancer drugs", "nephro", {
        s: "CNI (cyclosporine มากกว่า tacrolimus), VEGF inhibitor และ TKI (bevacizumab, sunitinib, lenvatinib)",
        why: "VEGF inhibitor ทำ HTN, proteinuria และ renal-limited TMA",
        ix: ["UPCR, smear"],
        link: "onco"
      }),
      N("Licorice, herbal and recreational", "adj", {
        s: "ชะเอม ยาจีน, ma huang (ephedra), amphetamine, cocaine, alcohol",
        ix: ["History, urine drug screen"],
        link: "hypok"
      })
    ]),
    N("Pregnancy-related hypertension", "step", {
      s: "Chronic HTN, gestational HTN, preeclampsia, HELLP",
      why: "แยก preeclampsia จาก LN flare หรือ CKD progression ในหญิงตั้งครรภ์ที่เป็นโรคไต",
      keys: ["HTN ก่อน 20 สัปดาห์ = chronic HTN (ต้องหา secondary cause), เริ่มหลัง 20 สัปดาห์ = gestational HTN หรือ preeclampsia, และ superimposed preeclampsia เกิดบน chronic HTN หรือ CKD ได้", "sFlt-1/PlGF ratio ≤ 38 ช่วย rule out preeclampsia ใน 1 สัปดาห์ถัดไป (PROGNOSIS, NPV 99.3%)"],
      ix: ["UPCR, platelet, LFT, sFlt-1/PlGF"],
      std: "ISSHP 2021, CHAP trial (n = 2,408, mild chronic HTN ในครรภ์): รักษาเมื่อ BP ≥ 140/90 ลด composite outcome 30.2% vs 37.0% (RR 0.82, 95% CI 0.74-0.92) โดย SGA ไม่เพิ่ม",
      link: "pregnancy"
    })
  ])
};

/* ===================== HYPERTENSIVE EMERGENCY ===================== */
TREES["htn-emerg"] = {
  must: [
    "อาการ target organ: ปวดศีรษะ ตามัว สับสน ชัก, เจ็บหน้าอก หอบ, ปวดหลังทะลุ (dissection), ปัสสาวะน้อย หรือเป็นเลือด",
    "หยุดยาเอง โดยเฉพาะ clonidine หรือ β-blocker (rebound)",
    "Cocaine, amphetamine, MAOI ร่วมอาหาร tyramine, decongestant",
    "ตั้งครรภ์หรือหลังคลอดภายใน 6 สัปดาห์",
    "Paroxysm ของปวดศีรษะ เหงื่อ ใจสั่น",
    "SSc ผิวหนังหนาเร็ว ใช้ steroid ขนาดสูง (scleroderma renal crisis)",
    "CKD, GN, KT, ใช้ CNI หรือ VEGF inhibitor",
    "ปวดมาก วิตกกังวล ปัสสาวะคั่ง (pseudocrisis)"
  ],
  tree: N("Hypertensive emergency", "root", {
    s: "BP มักสูงกว่า 180/120 mmHg ร่วมกับ acute hypertension-mediated organ damage แยกจาก urgency ด้วยการหา organ damage ไม่ใช่ตัวเลข BP แล้วเลือกเป้าและยาตามอวัยวะที่เสีย",
    why: "เป้าและความเร็วในการลด BP ต่างกันมากตามอวัยวะที่เสีย การลดเร็วเกินทำ ischemic injury ที่สมอง หัวใจ และไตได้ เพราะ autoregulation เลื่อนไปทางขวา",
    keys: ["ถ้าไม่มี compelling condition: ลด SBP ไม่เกิน 25% ในชั่วโมงแรก, ถ้า stable ลดต่อถึง 160/100 ใน 2-6 ชั่วโมง แล้วค่อยลดสู่ปกติใน 24-48 ชั่วโมง (ACC/AHA 2017)", "Fundoscopy: hemorrhage, exudate, papilledema", "Neurologic exam", "Troponin, ECG, CXR", "Cr, UA, smear หา schistocyte, LDH, platelet", "Compelling condition: aortic dissection, preeclampsia, pheochromocytoma crisis"],
    ix: ["Fundoscopy", "Cr, electrolyte, UA, UPCR", "CBC, smear, LDH, haptoglobin", "Troponin, ECG, CXR, echo", "CT หรือ MRI brain ตามอาการ", "CTA aorta ถ้าคิด dissection", "Pregnancy test"],
    std: "ESC 2024 elevated BP and hypertension guideline, ESH 2023, ACC/AHA 2017 (เป้าลด BP ที่ 2025 AHA/ACC ยังใช้ตาม)"
  }, [
    N("Hypertensive urgency and pseudocrisis", "step", {
      s: "BP สูงมากแต่ไม่มี acute organ damage (2025 AHA/ACC เลิกใช้คำว่า hypertensive urgency เปลี่ยนเป็น severe hypertension ที่ไม่มี acute target-organ damage รักษาด้วยยากินและนัดติดตาม ไม่ใช้ยา IV)",
      why: "รักษาด้วยยากินและติดตามใน 1 สัปดาห์ ไม่ต้องลดเร็วด้วยยาฉีด",
      keys: ["ไม่มี acute organ damage หลังตรวจหาครบแล้ว", "หาตัวกระตุ้น: ปวด วิตกกังวล ปัสสาวะคั่ง หยุดยาเอง"],
      ix: ["Fundoscopy, Cr, UA, ECG ปกติ"]
    }, [
      N("Pain, anxiety and urinary retention", "adj", {
        s: "Sympathetic surge",
        ix: ["Bladder scan, pain score"]
      }),
      N("Drug withdrawal and nonadherence", "adj", {
        s: "Clonidine หรือ β-blocker rebound",
        why: "Clonidine withdrawal รักษาด้วยการให้ clonidine กลับ ถ้ารุนแรงใช้ labetalol หรือ phentolamine และไม่ให้ β-blocker เดี่ยว (unopposed α)",
        ix: ["Drug history"]
      })
    ]),
    N("Malignant hypertension with kidney injury", "step", {
      s: "Grade III-IV retinopathy ร่วม AKI, proteinuria, หรือ TMA",
      why: "เป็น hypertensive emergency ที่พบบ่อยในผู้ป่วยโรคไต และต้องแยกว่า HTN เป็นเหตุหรือผลของ aHUS หรือ GN",
      keys: ["ลด MAP 20-25% ในหลายชั่วโมง", "Renin สูงมาก volume อาจ depleted จาก pressure natriuresis", "ถ้า TMA ไม่หายหลังคุม BP ให้คิด complement"],
      ix: ["Smear, LDH, haptoglobin, platelet, ADAMTS13 ถ้า TMA", "Complement study, biopsy เมื่อปลอดภัย"],
      std: "ESC 2024, labetalol หรือ nicardipine",
      link: "tma"
    }, [
      N("Primary malignant hypertension", "nephro", {
        s: "Essential HTN ที่ไม่ได้รักษา เป็น diagnosis of exclusion หลังหา secondary cause (GN, renovascular, endocrine, TMA) แล้ว",
        why: "Kidney recovery อาจใช้หลายเดือน บางรายเลิก dialysis ได้",
        ix: ["Biopsy: onion-skin arteriolar thickening, fibrinoid necrosis"]
      }),
      N("Complement-mediated TMA presenting with severe HTN", "nephro", {
        s: "aHUS ทำ HTN รุนแรงได้",
        why: "ส่วนหนึ่งของ malignant HTN ที่มี TMA ตรวจพบ complement variant และมีรายงานตอบสนองต่อ C5 inhibitor, ให้สงสัยเมื่อ TMA หรือ kidney function ไม่ดีขึ้นหลังคุม BP ได้แล้ว",
        ix: ["Complement genetics, C3, CFH"],
        std: "KDIGO 2017 aHUS controversies",
        link: "tma"
      }),
      N("Glomerulonephritis and IgA nephropathy", "nephro", {
        s: "IgAN เป็น GN ที่พบใน malignant HTN บ่อยที่สุดในเอเชีย",
        ix: ["UA sediment, biopsy"],
        link: "rpgn"
      }),
      N("Scleroderma renal crisis", "nephro", {
        s: "Early diffuse SSc, anti-RNA polymerase III, prednisolone ≥ 15 mg/d",
        why: "ACEi (captopril) titrate ทุกวันและให้ต่อแม้ Cr ขึ้นหรือต้อง dialysis, ไม่แนะนำ ACEi เพื่อป้องกัน SRC เพราะข้อมูล observational พบ outcome แย่กว่า",
        keys: ["BP อาจปกติใน 10%", "TMA ร่วม"],
        ix: ["Anti-RNA polymerase III, smear"],
        link: "skinthick"
      }),
      N("Renovascular and renin-secreting causes", "nephro", {
        s: "Bilateral RAS, Takayasu, renin-secreting tumor",
        link: "htn-young"
      })
    ]),
    N("Neurologic emergencies", "step", {
      s: "Hypertensive encephalopathy, PRES, ischemic stroke, ICH",
      why: "เป้า BP ต่างกันตามชนิดของ stroke",
      keys: ["Hypertensive encephalopathy: ลด MAP 20-25% ทันที (ภายในชั่วโมงแรก) ไม่ลดมากกว่านี้", "Ischemic stroke + thrombolysis: < 185/110 ก่อน และ < 180/105 ใน 24 ชั่วโมง", "Ischemic stroke ไม่ได้ thrombolysis: ลด 15% ใน 24 ชั่วโมงเมื่อ > 220/120", "ICH ขนาดเล็กถึงปานกลางที่ SBP แรกรับ 150-220: เป้า SBP 140 (ช่วง 130-150) และหลีกเลี่ยง < 130, ใน ICH ขนาดใหญ่หรือต้องผ่าตัดยังไม่มีข้อมูลความปลอดภัยของการลดเข้ม"],
      ix: ["CT หรือ MRI brain"],
      std: "AHA/ASA 2026 acute ischemic stroke, AHA/ASA 2022 spontaneous ICH guideline"
    }, [
      N("Hypertensive encephalopathy and PRES", "nephro", {
        s: "Parieto-occipital vasogenic edema บน MRI",
        why: "PRES สัมพันธ์กับ CNI, LN, eclampsia, chemotherapy และ CKD และเกิดได้แม้ BP ไม่สูงมาก (ราว 20-30% BP ปกติหรือสูงเล็กน้อย)",
        ix: ["MRI FLAIR"],
        link: "headache"
      }),
      N("Acute stroke", "adj", {
        s: "Ischemic หรือ hemorrhagic",
        link: "stroke"
      })
    ]),
    N("Cardiovascular emergencies", "step", {
      s: "Aortic dissection, acute pulmonary edema, ACS",
      keys: ["Aortic dissection: SBP < 120 และ HR < 60 ภายใน 20 นาที", "Pulmonary edema: nitroglycerin หรือ nitroprusside ร่วม loop, SBP < 140", "ACS: nitroglycerin, β-blocker"],
      ix: ["CTA aorta, troponin, echo"],
      std: "ESC 2024, ACC/AHA 2022 aortic disease guideline"
    }, [
      N("Acute aortic dissection", "adj", {
        s: "ปวดหลังเหมือนฉีกขาด ชีพจรต่างกัน",
        why: "ให้ IV β-blocker (esmolol, labetalol) ก่อน vasodilator เพื่อลด shear stress และกัน reflex tachycardia",
        ix: ["CTA aorta"],
        link: "chestpain"
      }),
      N("Flash pulmonary edema", "nephro", {
        s: "Pulmonary edema ซ้ำๆ ที่ EF ปกติ",
        why: "ถ้าเป็นซ้ำโดยไม่มีสาเหตุทางหัวใจอธิบาย (ischemia, acute MR, arrhythmia) ให้หา bilateral RAS หรือ RAS ของ solitary kidney ซึ่งเป็นกลุ่มที่พิจารณา revascularization",
        ix: ["Renal duplex"],
        link: "htn-young"
      }),
      N("Acute coronary syndrome", "adj", {
        s: "Afterload ที่สูงเพิ่ม myocardial O2 demand ทำ ischemia, เป้า SBP < 140 ทันที",
        link: "chestpain"
      })
    ]),
    N("Catecholamine excess", "step", {
      s: "Pheochromocytoma crisis, cocaine, amphetamine, MAOI ร่วม tyramine, clonidine withdrawal",
      why: "ห้ามให้ β-blocker ก่อนได้ α-blockade เพราะ unopposed α-stimulation ทำ BP สูงขึ้น",
      keys: ["SBP < 140 ในชั่วโมงแรกสำหรับ pheochromocytoma crisis", "Pheochromocytoma crisis: phentolamine, cocaine หรือ amphetamine: benzodiazepine เป็นยาตัวแรก แล้วจึง phentolamine หรือ nitroglycerin"],
      ix: ["Plasma metanephrines หลังผ่านช่วงวิกฤต, urine drug screen"],
      std: "ACC/AHA 2017"
    }, [
      N("Pheochromocytoma crisis", "adj", {
        s: "Hemodynamic instability, cardiomyopathy, multiorgan failure",
        link: "paroxysm"
      }),
      N("Sympathomimetic drugs", "adj", {
        s: "Cocaine, methamphetamine (ยาบ้า), MDMA",
        why: "Rhabdomyolysis และ AKI ร่วม",
        ix: ["Urine drug screen, CK"],
        link: "myalgia"
      })
    ]),
    N("Pregnancy: severe preeclampsia and eclampsia", "step", {
      s: "BP ≥ 160/110 ที่คงอยู่ ≥ 15 นาทีในครรภ์ > 20 สัปดาห์หรือหลังคลอด ต้องรักษาเร่งด่วนแม้ยังไม่มี organ dysfunction, รวม preeclampsia with severe features และ eclampsia",
      why: "ลดภายใน 30-60 นาทีด้วย labetalol, hydralazine หรือ nifedipine และ MgSO4 ป้องกันชัก, คลอดคือการรักษาที่แท้จริง",
      keys: ["SBP < 140 ในชั่วโมงแรกตาม ACC/AHA 2017, ACOG ใช้เป้า 140-150/90-100", "หลีกเลี่ยง ACEi, ARB, nitroprusside"],
      ix: ["Platelet, LFT, Cr, UPCR, sFlt-1/PlGF"],
      std: "ACOG 2020 gestational hypertension and preeclampsia, ISSHP 2021",
      link: "pregnancy"
    })
  ])
};
