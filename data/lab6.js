/* Lab work-up flows part 6 (Nov 2026): secondary hypertension, transplant graft dysfunction, PD cloudy effluent.
   Schema as data/lab1.js. */
window.LABTREES = window.LABTREES || {};

/* ===================== SECONDARY AND RESISTANT HYPERTENSION ===================== */
LABTREES["htn-young"] = {
  panel: [
    "ABPM หรือ home BP ยืนยันก่อนเรียก resistant hypertension",
    "Na, K, Cr, eGFR, glucose, lipid, Ca, TSH, urinalysis, UACR",
    "Plasma aldosterone และ renin (PRA หรือ DRC) ตอนเช้า หลังลุกจากเตียง 2 ชั่วโมงและนั่ง 5-15 นาที",
    "Plasma free metanephrines (หรือ 24-h urine fractionated metanephrines)",
    "1 mg overnight dexamethasone suppression test หรือ late-night salivary cortisol ถ้ามี clinical clue",
    "Renal Doppler หรือ CTA/MRA ตามแขนง, echocardiogram, sleep study",
    "Urine หรือ serum drug screen (LC-MS/MS) เมื่อสงสัย non-adherence"
  ],
  pit: [
    "Hypokalemia กด aldosterone (ARR ลบเท็จ) จึงให้แก้ K ก่อนตรวจ ARR",
    "MRA, ENaC blocker, diuretic ขนาดสูง, ACEi และ ARB ทำให้ renin สูงขึ้น (ARR ลบเท็จ) โดย ES 2025 อนุญาตให้ screen ขณะใช้ยาส่วนใหญ่ แต่ถ้า renin ไม่ถูกกดขณะได้ MRA ให้หยุดยาแล้วตรวจซ้ำ",
    "β-blocker และ central α2-agonist ทำให้ renin ต่ำลง (ARR บวกเท็จ)",
    "Plasma metanephrines เจาะในท่านอนหลังพัก 30 นาทีลด false positive, และ tricyclic antidepressant กับ SNRI ทำให้ normetanephrine สูงเท็จ"
  ],
  tree: N("Secondary and resistant hypertension", "root", {
    s: "ยืนยันด้วย ABPM และตัด pseudoresistance ตาม ESH 2023 แล้วใช้ basic chemistry หา renal parenchymal disease จากนั้น renin และ aldosterone เป็นแกนแยกกลไก ต่อด้วย metanephrines, cortisol และ imaging",
    why: "Renin กับ aldosterone แบ่ง secondary HTN ได้เกือบทุกกลุ่ม และ ES 2025 แนะนำให้ screen PA ในผู้ป่วยความดันสูงทุกราย",
    keys: ["ABPM daytime ≥ 135/85 ยืนยัน", "Cr, UACR หรือ sediment ผิดปกติ ชี้ renal parenchymal disease", "Renin ต่ำร่วม aldosterone สูง ชี้ primary aldosteronism", "Renin ต่ำร่วม aldosterone ต่ำ ชี้ non-aldosterone MR activation หรือ ENaC overactivity (Liddle)", "Renin สูงร่วม aldosterone สูง ชี้ secondary aldosteronism: renovascular disease, diuretic, malignant HTN, renin-secreting tumor", "Metanephrines, cortisol, TSH, IGF-1 ตาม clue"],
    ix: ["ABPM, renin, aldosterone, metanephrines, DST, renal imaging"],
    std: "ESH 2023 hypertension guideline (Mancia G et al. J Hypertens 2023), Endocrine Society primary aldosteronism 2025, pheochromocytoma 2014 (Lenders JW et al. JCEM 2014), Cushing syndrome 2008 (Nieman LK et al. JCEM 2008)"
  }, [
    N("ABPM normal or adherence screen negative: pseudoresistance", "step", {
      s: "ไม่ใช่ resistant HTN จริง",
      keys: ["ABPM daytime < 135/85 (ESH)", "Drug screen ไม่พบยาที่สั่ง", "Urine Na > 200 mmol/d"],
      ix: ["ABPM, LC-MS/MS drug screen, 24-h urine Na"]
    }, [
      N("White-coat effect", "adj", { s: "Office สูง ABPM ปกติ", keys: ["ABPM daytime < 135/85"], ix: ["ABPM ซ้ำทุก 1-2 ปี"] }),
      N("Nonadherence and suboptimal regimen", "adj", { s: "ยาไม่ครบหรือ regimen ไม่เหมาะ", keys: ["Drug screen ไม่พบยาที่สั่ง", "Thiazide ขนาดต่ำหรือ HCTZ ใน eGFR ต่ำ"], ix: ["Chlorthalidone ใน CKD 4 (CLICK)"] }),
      N("Lifestyle contributors", "adj", { s: "Na, alcohol, obesity", keys: ["24-h urine Na > 200 mmol/d"], ix: ["24-h urine Na"] })
    ]),
    N("eGFR low, UACR high or abnormal sediment or imaging: renal parenchymal", "step", {
      s: "ไตเป็นสาเหตุของความดัน",
      keys: ["UACR > 30 mg/g, hematuria", "Cysts หรือ scar บน ultrasound"],
      ix: ["Renal ultrasound, serology ตาม sediment"]
    }, [
      N("Glomerular disease and CKD", "nephro", { s: "GN, DKD, IgAN, LN", keys: ["Proteinuria, hematuria"], ix: ["ไปที่ approach nephrotic หรือ RPGN"], link: "nephrotic" }),
      N("ADPKD", "nephro", { s: "HTN ก่อน GFR ลด", keys: ["Enlarged cystic kidneys"], ix: ["Ultrasound, MRI TKV"], link: "cysts" }),
      N("Reflux nephropathy and obstruction", "nephro", { s: "Renal scar ทำให้ renin สูง", keys: ["Cortical scar, proteinuria"], ix: ["DMSA, VCUG"] })
    ]),
    N("Renin suppressed, aldosterone high", "step", {
      s: "Screen บวกสำหรับ primary aldosteronism",
      keys: ["PRA ≤ 1 ng/mL/h หรือ DRC ≤ 8.2 mU/L", "Aldosterone ≥ 10 ng/dL (immunoassay) หรือ ≥ 7.5 ng/dL (LC-MS/MS)", "ARR > 20 (ng/dL per ng/mL/h)", "K ปกติไม่ตัด PA เพราะ hypokalemia พบเพียงส่วนน้อยของผู้ป่วย"],
      ix: ["Saline หรือ captopril suppression ตามข้อบ่งชี้", "Adrenal CT, AVS ถ้าจะผ่าตัด", "Genetic test (chimeric CYP11B1/2) ถ้า onset < 20 ปีหรือครอบครัว stroke อายุน้อย"],
      std: "Endocrine Society 2025 primary aldosteronism"
    }, [
      N("Primary aldosteronism", "nephro", { s: "APA, BAH, familial", keys: ["ARR สูง"], ix: ["AVS แยก lateralization"] }),
      N("Glucocorticoid-remediable aldosteronism (FH-I)", "nephro", { s: "Chimeric gene ทำให้ aldosterone synthase ตอบ ACTH", keys: ["Onset เด็ก, family stroke อายุน้อย", "Aldosterone ถูกกดด้วย dexamethasone"], ix: ["Long-PCR chimeric gene"] })
    ]),
    N("Renin suppressed, aldosterone low, K low", "step", {
      s: "MR ถูกกระตุ้นด้วยสารอื่นหรือ ENaC ทำงานเอง",
      keys: ["Urine cortisol/cortisone ratio สูง ชี้ AME หรือ licorice (severe hypercortisolism จาก ectopic ACTH ให้ภาพเดียวกันได้)", "DOC สูง ชี้ CAH หรือ DOC-secreting tumor", "Steroid profile ปกติ ชี้ Liddle หรือ Geller syndrome"],
      ix: ["Urinary cortisol/cortisone ratio, DOC, 11-deoxycortisol, SCNN1B/G, NR3C2"]
    }, [
      N("Apparent mineralocorticoid excess and licorice", "nephro", { s: "11β-HSD2 deficiency หรือถูกยับยั้ง", keys: ["Cortisol/cortisone ratio สูง"], ix: ["Licorice history, HSD11B2"] }),
      N("CAH (11β-hydroxylase, 17α-hydroxylase) and DOC-secreting tumor", "nephro", { s: "DOC สูงกระตุ้น MR", keys: ["DOC สูง"], ix: ["Adrenal CT"] }),
      N("Liddle syndrome", "nephro", { s: "ENaC gain-of-function", keys: ["Steroid ปกติ, ตอบสนอง amiloride"], ix: ["SCNN1B, SCNN1G"] }),
      N("Geller syndrome", "nephro", { s: "MR S810L activating mutation", keys: ["HTN แย่ลงมากช่วงตั้งครรภ์", "Spironolactone ทำให้แย่ลง"], ix: ["NR3C2 genetic test"] })
    ]),
    N("Renin suppressed, K high, NAGMA, eGFR normal", "step", {
      s: "NCC ทำงานมาก",
      keys: ["Hyperkalemia, hyperchloremic acidosis", "Aldosterone ปกติหรือสูงเล็กน้อย"],
      ix: ["WNK1, WNK4, KLHL3, CUL3 genetic test, thiazide trial"],
      link: "hyperk"
    }, [
      N("Gordon syndrome (PHA2)", "nephro", { s: "HyperK, NAGMA, renin ต่ำ, thiazide-responsive", keys: ["eGFR ปกติ"], ix: ["Genetic test"] })
    ]),
    N("Renin high, aldosterone high: renovascular", "step", {
      s: "Renal hypoperfusion กระตุ้น renin",
      keys: ["Kidney size ต่างกัน > 1.5 cm", "Doppler PSV > 200 cm/s, renal-aortic ratio > 3.5", "ESR และ CRP สูงใน Takayasu", "Renin และ aldosterone สูงทั้งคู่ไม่จำเพาะต่อ renovascular: diuretic, malignant HTN และ renin-secreting tumor ให้ภาพเดียวกัน และ renin ปกติไม่ตัด renal artery stenosis"],
      ix: ["Renal Doppler, CTA หรือ MRA, catheter angiography ใน FMD"],
      std: "ESC 2024 peripheral arterial and aortic diseases guideline, European/International FMD consensus 2019"
    }, [
      N("Atherosclerotic renal artery stenosis", "nephro", { s: "Ostial lesion ร่วม atherosclerosis ที่อื่น", keys: ["Cr เพิ่ม > 30% หลังเริ่ม RAASi"], ix: ["CTA"] }),
      N("Fibromuscular dysplasia", "nephro", { s: "String-of-beads mid-distal renal artery", keys: ["หญิงอายุ 15-50 ปี"], ix: ["CTA head to pelvis หา aneurysm"] }),
      N("Takayasu arteritis and middle aortic syndrome", "nephro", { s: "หญิงเอเชียอายุ < 40", keys: ["ESR, CRP สูง", "BP แขนต่างกัน > 10 mmHg"], ix: ["CTA หรือ MRA aorta, PET-CT"] }),
      N("Other renovascular lesions", "nephro", { s: "Dissection, embolism, aneurysm, Page kidney, NF1", keys: ["Imaging ผิดปกติเฉพาะ"], ix: ["CTA"] })
    ]),
    N("Renin and aldosterone not diagnostic: endocrine screens", "step", {
      s: "Catecholamine, cortisol, thyroid, Ca, GH",
      keys: ["Plasma free metanephrines > 3-4 เท่าของ upper reference limit แทบวินิจฉัย PPGL ได้ ส่วนค่าที่สูงก้ำกึ่งให้ตรวจซ้ำหลังหยุดยารบกวนหรือทำ clonidine suppression test", "Cortisol หลัง 1 mg DST > 1.8 µg/dL (50 nmol/L) ผิดปกติ", "TSH ผิดปกติ, Ca และ PTH สูง", "IGF-1 สูงตามอายุ"],
      ix: ["Metanephrines, DST, TSH, Ca, PTH, IGF-1"],
      std: "Lenders JW et al. JCEM 2014, Nieman LK et al. JCEM 2008"
    }, [
      N("Pheochromocytoma and paraganglioma", "adj", { s: "Paroxysmal หรือ sustained HTN", keys: ["Metanephrines สูงมาก"], ix: ["CT หรือ MRI adrenal, Ga-68 DOTATATE, germline genetic test ทุกราย"] }),
      N("Cushing syndrome", "adj", { s: "Endogenous hypercortisolism", keys: ["DST ไม่กด, UFC สูง, late-night salivary cortisol สูง"], ix: ["ACTH แยก dependent กับ independent"], link: "cushingoid" }),
      N("Thyroid disease and PHPT", "adj", { s: "Hyperthyroidism systolic HTN, hypothyroidism diastolic HTN, PHPT", keys: ["TSH, Ca, PTH"], ix: ["Thyroid function, PTH"] }),
      N("Acromegaly", "adj", { s: "GH excess", keys: ["IGF-1 สูง", "GH nadir หลัง OGTT ≥ 1 µg/L (ไม่ถูกกด)"], ix: ["Pituitary MRI"] })
    ]),
    N("Labs unremarkable: structural, sleep, drug or pregnancy cause", "step", {
      s: "หาสาเหตุที่ไม่ได้ขึ้นกับ lab",
      keys: ["Arm-leg systolic BP gradient > 20 mmHg ชี้ coarctation", "AHI ≥ 15 /ชั่วโมง ชี้ moderate ถึง severe OSA", "β-hCG บวก"],
      ix: ["Echocardiogram, CTA aorta, polysomnography, drug review, β-hCG"]
    }, [
      N("Coarctation of the aorta", "adj", { s: "HTN แขนสูงกว่าขา", keys: ["Arm-leg gradient"], ix: ["Echocardiogram, CTA"] }),
      N("Obstructive sleep apnea", "adj", { s: "พบบ่อยที่สุดใน resistant HTN", keys: ["AHI ≥ 15, nondipping"], ix: ["Polysomnography"] }),
      N("Common prescribed drugs", "adj", { s: "NSAID, estrogen OCP, glucocorticoid, ESA, decongestant, SNRI", keys: ["Temporal relation"], ix: ["Drug review"] }),
      N("Immunosuppressants and anticancer drugs", "nephro", { s: "CNI, VEGF inhibitor และ TKI", keys: ["CNI level"], ix: ["Drug review"] }),
      N("Licorice, herbal and recreational", "adj", { s: "ชะเอม, ephedra, amphetamine, cocaine, alcohol", keys: ["Urine toxicology"], ix: ["Toxicology screen"] }),
      N("Hypertensive disorders of pregnancy", "adj", { s: "Chronic HTN, gestational HTN, preeclampsia, HELLP", keys: ["sFlt-1/PlGF ratio ≤ 38 ในหญิงที่สงสัย preeclampsia อายุครรภ์ 24 ถึง 36 สัปดาห์ 6 วัน ช่วยตัดการเกิด preeclampsia ภายใน 1 สัปดาห์ (NPV 99.3%, PROGNOSIS)"], ix: ["UPCR, platelet, LFT, sFlt-1/PlGF"], link: "pregnancy" })
    ])
  ])
};

/* ===================== TRANSPLANT: EARLY GRAFT DYSFUNCTION ===================== */
LABTREES["kt-early"] = {
  panel: [
    "Cr ซ้ำ, urine output, BP, volume status",
    "Tacrolimus หรือ cyclosporine trough (เจาะก่อนยามื้อถัดไป)",
    "Urinalysis, UPCR, urine culture",
    "Graft ultrasound with Doppler (hydronephrosis, collection, RI, PSV ที่ anastomosis)",
    "Plasma BK virus PCR และ CMV PCR",
    "Donor-specific antibody (Luminex single antigen)",
    "Graft biopsy ถ้ายังไม่อธิบายได้หลังข้างต้น"
  ],
  pit: [
    "Cr เพิ่ม ≥ 10-20% จาก baseline ถือว่ามีนัยสำคัญใน KT ต้อง work-up",
    "CNI level ปกติไม่ตัด CNI toxicity และ level สูงไม่ตัด rejection",
    "DSA ลบไม่ตัด ABMR (DSA-negative ABMR พบได้) ต้องดู MVI บน biopsy",
    "Plasma BK DNAemia > 10,000 copies/mL (ครั้งเดียวก็พอ) = presumptive BKVAN ส่วน > 1,000 copies/mL ที่คงอยู่ > 2 สัปดาห์ (ตรวจซ้ำ 2 ครั้งภายใน 2-3 สัปดาห์) = probable BKVAN ทั้งสองกรณีให้ลด IS และค่าต่ำกว่านี้ให้ติดตาม PCR ต่อ"
  ],
  tree: N("Transplant: early graft dysfunction", "root", {
    s: "ไล่จากเร็วไปช้า: volume และ CNI level, urine และ culture, Doppler ultrasound, BK และ CMV PCR, DSA แล้วจึง biopsy อ่านตาม Banff",
    why: "KDIGO แนะนำให้ตัดสาเหตุที่ไม่ต้อง biopsy ก่อน และใช้ biopsy ตาม Banff เมื่อยังไม่อธิบายได้",
    keys: ["FENa ต่ำและ Cr กลับเมื่อให้ volume ชี้ prerenal", "CNI trough สูงกว่า target ชี้ CNI toxicity (level ปกติไม่ตัด)", "Hydronephrosis ที่เพิ่มขึ้นหรือ peri-graft collection ชี้ surgical cause (pelvicalyceal dilatation เล็กน้อยคงที่พบได้ใน graft ปกติ)", "BK DNAemia > 10^4 copies/mL", "DSA บวก, MVI, C4d = ABMR", "i ≥ 2 กับ t ≥ 2 หรือ v = TCMR"],
    ix: ["CNI level, ultrasound Doppler, BK PCR, DSA, biopsy"],
    std: "KDIGO 2009 transplant recipient care, Banff 2022 classification (Naesens M et al. Am J Transplant 2024), 2024 BK polyomavirus international consensus (Kotton CN et al. Transplantation 2024)"
  }, [
    N("FENa low, Cr improves with volume or drug adjustment", "step", {
      s: "Hemodynamic cause",
      keys: ["FENa < 1%", "CNI trough สูงกว่า target", "PSV ที่ anastomosis สูงมาก"],
      ix: ["CNI trough, Doppler"]
    }, [
      N("Volume depletion", "nephro", { s: "Diarrhea (MMF, CMV, norovirus), poor intake, diuretic", keys: ["FENa ต่ำ"], ix: ["Stool PCR, CMV PCR"] }),
      N("Acute CNI nephrotoxicity", "nephro", { s: "Afferent vasoconstriction, dose-dependent", keys: ["Trough สูง, Cr ลดเมื่อลดยา", "Mg ต่ำ K สูง"], ix: ["ปรับ dose แล้วติดตาม Cr"] }),
      N("Transplant renal artery stenosis", "nephro", { s: "HTN ดื้อยา, fluid retention", keys: ["Anastomotic PSV > 200-250 cm/s, tardus-parvus distal"], ix: ["CTA หรือ angiography"] })
    ]),
    N("Hydronephrosis or peri-graft collection on ultrasound", "step", {
      s: "Surgical หรือ urologic",
      keys: ["Hydronephrosis ใหม่", "Fluid Cr ใกล้เคียง serum Cr ชี้ lymphocele ส่วน fluid Cr สูงกว่า serum Cr มาก ชี้ urine leak"],
      ix: ["Aspirate collection Cr, nephrostogram"]
    }, [
      N("Ureteric stenosis", "nephro", { s: "Hydronephrosis สัปดาห์ถึงเดือน", keys: ["Hydronephrosis เพิ่ม Cr เพิ่ม"], ix: ["Nephrostomy, antegrade pyelogram"] }),
      N("Lymphocele", "nephro", { s: "Collection กด ureter หรือ iliac vein", keys: ["Fluid Cr เท่า serum"], ix: ["Drainage, fenestration"] })
    ]),
    N("Pyuria with positive culture, or viral PCR positive", "step", {
      s: "Infection",
      keys: ["Urine culture บวก, fever", "Plasma BK DNAemia > 10^4 copies/mL = presumptive BKVAN", "CMV PCR สูง"],
      ix: ["Urine และ blood culture, BK PCR, CMV PCR, biopsy SV40 staining"],
      std: "Kotton CN et al. Transplantation 2024 (BK consensus)"
    }, [
      N("Graft pyelonephritis", "nephro", { s: "Fever, graft tenderness, pyuria", keys: ["Culture บวก"], ix: ["Ultrasound, VCUG ถ้า recurrent"] }),
      N("BK polyomavirus nephropathy", "nephro", { s: "Cr ขึ้นช้าใน 3-12 เดือนแรก", keys: ["BK DNAemia > 10^4 copies/mL", "SV40 บวกบน biopsy = proven", "Biopsy ลบไม่ตัด BKVAN เพราะ lesion เป็น focal ควรได้ ≥ 2 cores ที่มี medulla"], ix: ["ลด IS"] }),
      N("CMV disease / adenovirus", "nephro", { s: "CMV เพิ่ม rejection risk", keys: ["CMV PCR สูง, leukopenia"], ix: ["Adenovirus PCR ถ้า hemorrhagic cystitis"] })
    ]),
    N("Unexplained: DSA and graft biopsy (Banff)", "step", {
      s: "Rejection, recurrent disease หรือ drug injury",
      keys: ["TCMR: i ≥ 2 และ t ≥ 2 หรือ v ≥ 1", "Active ABMR: MVI (g + ptc ≥ 2) ร่วม DSA หรือ C4d", "Borderline (suspicious for TCMR): i1 ร่วม t1-3 หรือ i2-3 ร่วม t1", "IF หรือ EM พบ immune deposit ชี้ recurrent หรือ de novo GN"],
      ix: ["DSA, biopsy with C4d, IF, EM"],
      std: "Banff 2022"
    }, [
      N("Acute TCMR", "nephro", { s: "Interstitial inflammation กับ tubulitis หรือ arteritis", keys: ["i ≥ 2, t ≥ 2"], ix: ["Grade I: pulse methylprednisolone ก่อน และ ATG เมื่อ steroid-resistant, grade II ขึ้นไป (v ≥ 1): ATG โดยมักให้ร่วมกับ pulse steroid"] }),
      N("Active ABMR", "nephro", { s: "MVI, C4d, DSA", keys: ["g + ptc ≥ 2, DSA บวก"], ix: ["PLEX, IVIG"] }),
      N("Mixed rejection / borderline", "nephro", { s: "Borderline หรือ TCMR ร่วม ABMR", keys: ["Banff lesion score"], ix: ["Repeat biopsy ตาม response"] }),
      N("Recurrent GN", "nephro", { s: "FSGS, aHUS, C3G, MN, IgAN", keys: ["Proteinuria เร็วหลัง KT ใน FSGS", "PLA2R กลับบวกใน MN"], ix: ["Biopsy IF, EM, anti-PLA2R"] }),
      N("Drug-induced: TMP-SMX AIN, crystal (acyclovir)", "nephro", { s: "Drug-related graft injury", keys: ["Eosinophil, crystal"], ix: ["Drug review, biopsy"] })
    ])
  ])
};

/* ===================== TRANSPLANT: LATE GRAFT DYSFUNCTION ===================== */
LABTREES["kt-late"] = {
  panel: [
    "Cr trend, UPCR, urinalysis, urine culture",
    "Tacrolimus trough และ intrapatient variability (CV) จากค่าย้อนหลัง",
    "De novo DSA (Luminex single antigen)",
    "Plasma BK PCR, EBV PCR",
    "HbA1c, lipid, BP",
    "Graft ultrasound with Doppler",
    "Graft biopsy with C4d, IF, EM (Banff)"
  ],
  pit: [
    "Tacrolimus CV สูงสะท้อน non-adherence และสัมพันธ์กับ dnDSA และ graft loss",
    "Transplant glomerulopathy (cg) ไม่ได้แปลว่า ABMR เสมอ ต้องตัด TMA, HCV และ recurrent MPGN",
    "Proteinuria ใหม่ใน late KT ให้คิด cg, recurrent หรือ de novo GN และ mTOR inhibitor",
    "PTLD ที่ graft อาจดูเหมือน rejection บน biopsy ต้องย้อม CD20 และ EBER"
  ],
  tree: N("Transplant: late graft dysfunction", "root", {
    s: "เริ่มจาก adherence และ CNI level, dnDSA, urinalysis และ culture, BK และ EBV PCR, ultrasound Doppler แล้ว biopsy ตาม Banff แยก immunologic กับ non-immunologic",
    why: "Chronic active ABMR จาก non-adherence เป็นสาเหตุหลักของ late graft loss การไล่ lab ชุดนี้ทำให้จับได้ก่อน fibrosis",
    keys: ["Tacrolimus CV สูงหรือ level ต่ำ ชี้ non-adherence", "dnDSA ร่วม cg หรือ MVI ชี้ chronic active ABMR", "UPCR สูง ชี้ transplant glomerulopathy หรือ recurrent หรือ de novo GN", "BK หรือ EBV PCR สูง", "Hydronephrosis, TRAS บน Doppler"],
    ix: ["Tacrolimus, dnDSA, UPCR, BK, EBV, Doppler, biopsy"],
    std: "Banff 2022 classification, KDIGO 2009 transplant recipient care, 2024 BK polyomavirus international consensus"
  }, [
    N("Low or erratic tacrolimus, dnDSA positive, Banff ABMR or TCMR", "step", {
      s: "Immunologic injury",
      keys: ["Tacrolimus ต่ำหรือ CV สูง", "dnDSA บวก", "Chronic active ABMR: cg > 0 หรือ PTC multilayering ร่วม MVI และ DSA"],
      ix: ["dnDSA, biopsy, adherence assessment"],
      std: "Banff 2022"
    }, [
      N("Chronic active ABMR", "nephro", { s: "Transplant glomerulopathy, PTC multilayering, MVI, dnDSA", keys: ["cg > 0, dnDSA"], ix: ["Biopsy EM"] }),
      N("Late TCMR after IS minimization", "nephro", { s: "Rejection หลังลด IS", keys: ["Tacrolimus ต่ำ, i และ t สูง"], ix: ["Biopsy"] }),
      N("Non-adherence", "nephro", { s: "สาเหตุหลักของ late rejection", keys: ["Tacrolimus CV > 30-40%, level ต่ำ"], ix: ["Pill count, pharmacy refill"] })
    ]),
    N("Viral PCR positive or graft mass", "step", {
      s: "Infection หรือ malignancy",
      keys: ["BK DNAemia > 10^4 copies/mL", "EBV DNAemia สูงขึ้น, mass บน imaging", "Recurrent culture-positive UTI"],
      ix: ["BK PCR, EBV PCR, CT หรือ PET-CT, biopsy CD20 และ EBER, VCUG"]
    }, [
      N("BK polyomavirus nephropathy", "nephro", { s: "Late BKVAN", keys: ["BK DNAemia สูง, SV40 บวก"], ix: ["ลด IS"] }),
      N("PTLD involving graft", "nephro", { s: "Graft mass หรือ infiltration", keys: ["EBV PCR สูง, LDH สูง"], ix: ["Biopsy CD20, EBER, PET-CT"], link: "lymphnode" }),
      N("Recurrent pyelonephritis / VUR into graft", "nephro", { s: "UTI ซ้ำทำให้เกิด graft scarring", keys: ["Culture บวกซ้ำ"], ix: ["VCUG"] })
    ]),
    N("Proteinuria with biopsy IF or EM showing glomerular disease", "step", {
      s: "Recurrent หรือ de novo GN",
      keys: ["UPCR สูง", "IF แสดง pattern ของโรคเดิม", "HbA1c สูง (PTDM)"],
      ix: ["Biopsy IF, EM, PLA2R, C3, SFLC, HbA1c"]
    }, [
      N("Recurrent IgAN / MN / C3G / LN / ANCA", "nephro", { s: "Recurrence ตามเวลาของแต่ละโรค", keys: ["Serology ของโรคเดิมกลับบวกสนับสนุน แต่ serology ลบไม่ตัด recurrence ต้องอาศัย biopsy"], ix: ["Biopsy"], link: "kt-urine" }),
      N("De novo MN / DKD (PTDM) / TMA", "nephro", { s: "Disease ที่เกิดใหม่หลัง KT", keys: ["PLA2R มักลบใน de novo MN (มักสัมพันธ์กับ ABMR)", "HbA1c สูงใน PTDM"], ix: ["Biopsy"] })
    ]),
    N("Non-immunologic: biopsy chronic CNI lesions, Doppler or obstruction findings", "step", {
      s: "Chronic injury ที่ไม่ใช่ rejection",
      keys: ["Nodular arteriolar hyalinosis", "PSV สูงที่ graft artery", "Hydronephrosis", "Donor-derived chronic lesion บน implantation biopsy"],
      ix: ["Biopsy, Doppler, ultrasound, PVR"]
    }, [
      N("Chronic CNI nephrotoxicity", "nephro", { s: "Arteriolar hyalinosis, striped fibrosis", keys: ["ไม่มี DSA, MVI ต่ำ", "Arteriolar hyalinosis ไม่จำเพาะ (พบใน DM, HTN และ donor-derived lesion) จึงเป็น diagnosis of exclusion"], ix: ["ลด CNI หรือ conversion หลังตัด rejection แล้ว"] }),
      N("TRAS / atherosclerotic donor artery", "nephro", { s: "HTN ดื้อยากับ Cr ขึ้น", keys: ["PSV > 200-250 cm/s"], ix: ["CTA, angioplasty"] }),
      N("Donor-derived disease / hypertensive or diabetic injury", "nephro", { s: "Donor อายุมาก, KDPI สูง", keys: ["Implantation biopsy มี chronic lesion"], ix: ["Compare implantation biopsy"] }),
      N("Obstruction: ureteric stricture, stone, BPH", "nephro", { s: "Late hydronephrosis", keys: ["Hydronephrosis ใหม่"], ix: ["Nephrostogram, PVR"] })
    ])
  ])
};

/* ===================== PD CLOUDY EFFLUENT ===================== */
LABTREES["pd-cloudy"] = {
  panel: [
    "Effluent cell count กับ differential (dwell ≥ 2 ชั่วโมง)",
    "Effluent Gram stain และ culture ใส่ blood culture bottles",
    "Effluent TG ถ้า milky, RBC ถ้า bloody, cytology ถ้าคิด malignancy",
    "Effluent AFB smear, culture, TB PCR และ fungal culture เมื่อ culture-negative ไม่ดีขึ้น",
    "Exit site และ tunnel swab culture, ultrasound tunnel",
    "CBC, CRP, blood culture ถ้า systemic"
  ],
  pit: [
    "APD หรือ dwell สั้นทำให้ WBC ต่ำ จึงให้ใช้ PMN > 50% เป็นหลักแม้ WBC < 100/µL",
    "Culture-negative ควรต่ำกว่า 15% ถ้าสูงกว่านี้ให้ทบทวนเทคนิค culture",
    "ตัวอย่างจาก dry abdomen ให้เติม 1 L dwell 1-2 ชั่วโมงก่อนส่ง",
    "Icodextrin sterile peritonitis มี monocyte เด่นและ culture ลบ"
  ],
  tree: N("Peritoneal dialysis: cloudy effluent", "root", {
    s: "Effluent WBC และ PMN ยืนยัน peritonitis ตาม ISPD 2022 แล้วใช้ Gram stain และ culture ระบุเชื้อ ถ้า culture ลบหรือ differential ไม่ใช่ PMN ให้ใช้ eosinophil, lymphocyte, TG, RBC และ cytology แยก non-infectious cause",
    why: "ISPD 2022 ให้วินิจฉัยเมื่อมีอย่างน้อย 2 ใน 3 ข้อ และเชื้อที่ได้กำหนดยาและระยะเวลารักษา",
    keys: ["Peritonitis: ≥ 2 ใน 3 ของ อาการปวดท้องหรือ cloudy, WBC > 100/µL กับ PMN > 50% (dwell ≥ 2 ชั่วโมง), culture บวก", "Cloudy effluent ให้ถือว่าเป็น peritonitis และรักษาไปก่อนจนกว่าจะยืนยันหรือตัดได้ และ effluent ใสไม่ตัด peritonitis ในผู้ที่ปวดท้อง", "Eosinophil > 10% ของ WBC = eosinophilic effluent (ตัด fungal และ parasite ก่อน)", "Effluent TG > 110 mg/dL = chylous", "Lymphocyte เด่นร่วม culture ลบ ให้คิดถึง TB แต่ TB peritonitis ช่วงแรกมี PMN เด่นได้ จึง PMN เด่นไม่ตัด TB"],
    ix: ["Cell count, Gram stain, blood culture bottles, TG, AFB"],
    std: "ISPD peritonitis guideline 2022 (Li PK et al. Perit Dial Int 2022)"
  }, [
    N("WBC > 100/µL with PMN > 50%, culture positive: bacterial peritonitis", "step", {
      s: "แยกตาม Gram stain และ culture",
      keys: ["Gram-positive cocci ชี้ touch contamination หรือ catheter infection", "Gram-negative ชี้ enteric source หรือ Pseudomonas (มักร่วม exit site infection)", "หลาย enteric organism หรือ anaerobe ชี้ intra-abdominal pathology ต้องประเมินทาง surgery", "Gram stain ลบไม่ตัด bacterial peritonitis"],
      ix: ["Culture sensitivity, CT abdomen ถ้า polymicrobial", "Effluent cell count ซ้ำวันที่ 3-5 เพื่อดู response (refractory = ไม่ใสหลัง 5 วันของ antibiotic ที่เหมาะสม สังเกตต่อได้ถ้า effluent WBC กำลังลดลงเข้าหาปกติ)"],
      std: "ISPD 2022"
    }, [
      N("Gram-positive (CoNS, S. aureus, Streptococcus)", "nephro", { s: "Touch contamination หรือ exit site", keys: ["CoNS 2 สัปดาห์, S. aureus 3 สัปดาห์"], ix: ["Retraining"] }),
      N("Enterococcus and VRE PD peritonitis", "nephro", { s: "Enteric source, ไม่ตอบสนอง cefazolin", keys: ["Enterococcus บน culture"], ix: ["3 สัปดาห์: oral amoxicillin ถ้า ampicillin-susceptible หรือ IP vancomycin, VRE ที่ดื้อ ampicillin ใช้ linezolid หรือ IP daptomycin"] }),
      N("Gram-negative (Pseudomonas, enteric)", "nephro", { s: "Enteric source หรือ Pseudomonas exit site", keys: ["Pseudomonas 3 สัปดาห์ สองยา"], ix: ["Exit site culture"] }),
      N("Polymicrobial / surgical peritonitis", "nephro", { s: "Multiple enteric organisms หรือ anaerobe", keys: ["หลาย enteric organism (หลาย Gram-positive organism มักเป็น contamination และ prognosis ดีกว่า)"], ix: ["CT abdomen, surgical consult"] })
    ]),
    N("WBC > 100/µL with PMN > 50%, culture negative", "step", {
      s: "Culture-negative peritonitis",
      keys: ["Culture ลบที่ 3 วัน"],
      ix: ["Repeat culture, AFB, fungal culture"]
    }, [
      N("Culture-negative peritonitis", "nephro", { s: "Culture ลบราว 10-20%", keys: ["ดีขึ้นใน 3-5 วัน"], ix: ["2 สัปดาห์ถ้าดีขึ้น"] })
    ]),
    N("Fungal on smear or culture, or lymphocytic effluent not improving", "step", {
      s: "Fungal หรือ mycobacterial",
      keys: ["Yeast บน Gram stain", "Lymphocyte เด่น, AFB หรือ TB PCR บวก"],
      ix: ["Fungal culture, AFB, TB PCR, mycobacterial culture"]
    }, [
      N("Fungal peritonitis", "nephro", { s: "Candida มักเกิดหลังได้ antibiotic", keys: ["Yeast บน smear หรือ culture"], ix: ["ถอดสายทันที ร่วม antifungal ต่ออย่างน้อย 2 สัปดาห์หลังถอดสาย"] }),
      N("Tuberculous / NTM peritonitis", "nephro", { s: "Culture-negative ไม่ดีขึ้น", keys: ["Lymphocytic หรือ mixed"], ix: ["TB PCR, culture, laparoscopic biopsy"] })
    ]),
    N("Differential not PMN-dominant, or milky or bloody: non-infectious", "step", {
      s: "Eosinophil, TG, RBC, cytology และ drug history",
      keys: ["Eosinophil > 10%", "TG > 110 mg/dL", "Effluent RBC สูงหรือวัด effluent Hct ได้", "Atypical cell บน cytology", "Monocyte เด่นกับ icodextrin"],
      ix: ["Eosinophil count, effluent TG, Hct, cytology"]
    }, [
      N("Eosinophilic peritonitis", "nephro", { s: "Eosinophil > 10% หลังใส่สายช่วงแรก", keys: ["Culture ลบ"], ix: ["ตัด fungal ก่อน"] }),
      N("Chylous effluent", "nephro", { s: "Milky effluent", keys: ["TG > 110 mg/dL"], ix: ["CT หา lymphoma, CCB history"] }),
      N("Hemoperitoneum", "nephro", { s: "Bloody effluent", keys: ["Menstruation, ovulation, cyst rupture", "เลือดออกมาก ต่อเนื่อง หรือมีปวดท้อง ต้องหา intra-abdominal pathology (ruptured cyst หรือ tumor, EPS, pancreatitis)"], ix: ["Ultrasound pelvis, CT abdomen ถ้าไม่ใช่ menstruation-related"] }),
      N("Malignant ascites / chemical peritonitis / icodextrin sterile peritonitis", "nephro", { s: "Cytology หรือ drug exposure", keys: ["Atypical cell หรือ icodextrin ใหม่"], ix: ["Cytology, หยุด icodextrin"] }),
      N("Specimen from dry abdomen", "adj", { s: "Cell count และ differential แปลผลไม่ได้", keys: ["Residual fluid ปริมาณน้อยทำให้ cell เข้มข้นขึ้นและ mononuclear เด่น ส่วน dwell สั้นกลับทำให้ WBC ต่ำ"], ix: ["ส่งใหม่หลัง dwell 1-2 ชั่วโมง"] })
    ]),
    N("Refractory, relapsing, fungal or catheter-related: removal criteria", "step", {
      s: "ISPD 2022 indications for catheter removal",
      keys: ["Refractory: ไม่ใสหลัง 5 วันของ antibiotic ที่เหมาะสม (สังเกตต่อได้ถ้า effluent WBC กำลังลดลงเข้าหาปกติ)", "Relapsing: เชื้อเดิม (หรือ culture ลบ 1 ครั้ง) ภายใน 4 สัปดาห์หลังครบ course ของ episode ก่อน", "Fungal, refractory exit site หรือ tunnel infection"],
      ix: ["Effluent count ซ้ำวันที่ 5", "เมื่อต้องถอด catheter ให้ temporary HD ระหว่างพัก peritoneum"],
      std: "ISPD 2022"
    })
  ])
};
