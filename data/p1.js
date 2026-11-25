/* Phase 1 Symptomatology trees.
   Node fields: t title, tag (root | step | nephro | adj), s one-line summary,
   why = เหตุผลที่อยู่ใน line นี้, keys = clinical discriminators, ix = tests with standard thresholds,
   std = criteria or guideline, link = approach node id, k = children */
const N = (t, tag, o, k) => Object.assign({t, tag, k: k || []}, o || {});

window.TREES = window.TREES || {};

/* ===================== EDEMA ===================== */
TREES.edema = {
  must: [
    "Pitting หรือ non-pitting, ข้างเดียวหรือสองข้าง, เริ่มที่ตาหรือเท้า",
    "Orthopnea, PND, exertional dyspnea",
    "ฟองในปัสสาวะ, เลือดในปัสสาวะ, ปริมาณปัสสาวะ",
    "ยาที่เริ่มในช่วงเดียวกัน: CCB, NSAID, steroid, TZD, gabapentin, pregabalin, estrogen",
    "ประวัติตับ: แอลกอฮอล์, HBV, HCV",
    "ท้องเสียเรื้อรัง, น้ำหนักลด, การกิน",
    "Thyroid symptoms, ตั้งครรภ์",
    "ประวัติ VTE, มะเร็ง, ผ่าตัดหรือฉายแสงต่อมน้ำเหลือง"
  ],
  tree: N("Edema", "root", {
    s: "แยก localized กับ generalized และ pitting กับ non-pitting ก่อน แล้วใช้ Starling forces แยกกลไกของ generalized pitting edema",
    why: "บวมเป็นอาการนำที่พบบ่อยที่สุดของ long case nephro แต่ครึ่งหนึ่งของ DDx อยู่นอกไต จึงต้องตัดโรคข้างเคียงให้เป็นระบบ",
    keys: ["Pitting vs non-pitting", "Symmetric vs asymmetric", "JVP", "Serum albumin", "Urine dipstick และ UPCR", "Drug list"],
    ix: ["UA with microscopy, UPCR", "Albumin, LFT, Cr", "NT-proBNP ± echo", "TSH"],
    std: "Starling forces: hydrostatic, oncotic, capillary permeability, lymphatic"
  }, [
    N("Localized / asymmetric", "step", {
      s: "ข้างเดียวหรือเฉพาะส่วน คิด venous, lymphatic, inflammatory ก่อน",
      keys: ["Unilateral leg", "Arm and face", "Erythema, warmth"],
      why: "ผู้ป่วยไตมี risk VTE (nephrotic) และ central vein stenosis (HD catheter) สูง ส่วน lymphedema ให้ถามประวัติมะเร็ง ผ่าตัดหรือฉายแสงต่อมน้ำเหลือง"
    }, [
      N("Deep vein thrombosis", "adj", {
        s: "ขาบวมข้างเดียว ปวด ร้อน",
        why: "Nephrotic syndrome เป็น hypercoagulable state โดยเฉพาะ MN และ albumin < 2.5 g/dL",
        keys: ["Calf circumference ต่างกัน ≥ 3 cm", "Pitting เฉพาะข้าง", "ถ้า nephrotic ร่วมกับปวดเอว ให้คิด RVT ด้วย"],
        ix: ["Wells score แล้วเลือก D-dimer (pretest ต่ำ) หรือ compression ultrasound", "D-dimer มักสูงอยู่แล้วใน CKD และ nephrotic (specificity ต่ำ) ผลบวกจึงไม่ช่วยวินิจฉัย ส่วนผลลบเมื่อ pretest ต่ำยังใช้ตัด DVT ได้"],
        std: "Wells score, ASH 2018 VTE diagnosis guideline"
      }),
      N("Central vein / SVC obstruction", "adj", {
        s: "แขนและหน้าบวม มี collateral ที่หน้าอก",
        why: "Central vein stenosis จาก HD catheter เดิม หรือ SVC syndrome จากมะเร็งปอดหรือเต้านม",
        keys: ["บวมแขนข้างเดียวกับ AVF", "Chest wall collaterals", "ประวัติ catheter ที่คอหรือ subclavian"],
        ix: ["CT venography หรือ fistulogram"],
        std: "KDOQI 2019 vascular access guideline"
      }),
      N("Chronic venous insufficiency", "adj", {
        s: "บวมช่วงเย็น มี hemosiderin staining",
        keys: ["Varicose veins", "Lipodermatosclerosis", "ยกขาแล้วยุบ"],
        ix: ["Venous duplex: reflux > 0.5 วินาทีใน superficial vein และ > 1 วินาทีใน femoral หรือ popliteal vein"],
        std: "CEAP classification"
      }),
      N("Lymphedema", "adj", {
        s: "บวมแข็ง non-pitting ในระยะหลัง",
        why: "หลังผ่าตัดหรือฉายแสงมะเร็ง (เต้านม, gynecologic) หรือ filariasis",
        keys: ["Stemmer sign positive", "Peau d'orange", "ไม่ยุบเมื่อยกขา"],
        ix: ["Lymphoscintigraphy"],
        std: "ISL lymphedema staging"
      }),
      N("Cellulitis / inflammatory", "adj", {
        s: "แดง ร้อน กดเจ็บ มีไข้",
        why: "ผู้ป่วย nephrotic, KT และ HD ติดเชื้อผิวหนังง่าย",
        keys: ["Erythema ขอบไม่ชัด (ขอบชัดและนูนคือ erysipelas)", "Fever, leukocytosis"],
        ix: ["Clinical diagnosis, US เพื่อตัด abscess และ DVT"]
      }),
      N("Paretic or dependent limb", "adj", {
        s: "บวมข้างที่อ่อนแรง",
        why: "ในข้อสอบเคย present DKD กับ old stroke ที่ขาบวมไม่เท่ากันจาก paresis แต่ต้องตัด DVT ก่อนทุกครั้ง เพราะแขนขาที่อ่อนแรงเป็น risk ของ DVT เอง",
        keys: ["บวมข้างเดียวกับ hemiparesis", "ไม่มีปวดหรือร้อน"]
      }),
      N("Ruptured Baker cyst", "adj", {
        s: "ปวดน่องทันที มีรอยช้ำใต้ตาตุ่ม",
        keys: ["OA หรือ RA ของเข่า", "Crescent sign", "อาการเหมือน DVT (pseudothrombophlebitis) และพบร่วมกับ DVT ได้"],
        ix: ["Ultrasound: เห็น cyst และต้องตัด DVT ในครั้งเดียวกัน"]
      }),
      N("Angioedema", "adj", {
        s: "Non-pitting ที่หน้า ปาก ไม่คัน",
        why: "ACE inhibitor เป็นสาเหตุสำคัญในผู้ป่วยไต",
        keys: ["ไม่มี urticaria ใน bradykinin-mediated", "ประวัติ ACEi"],
        ix: ["C4 ต่ำใน HAE, C1-INH level และ function"]
      })
    ]),
    N("Generalized pitting", "step", {
      s: "ใช้ JVP, albumin, UPCR แยก 3 กลไก",
      keys: ["JVP สูง: hydrostatic", "Albumin < 3 g/dL: oncotic", "ช็อก หรือ hemoconcentration: permeability", "ถ้า non-pitting ให้ไป branch Endocrine / non-pitting"]
    }, [
      N("↑ Hydrostatic (Na retention)", "step", {
        s: "JVP สูง, orthopnea, albumin ปกติหรือลดเล็กน้อย",
        keys: ["JVP สูง", "S3, crackles", "Hepatojugular reflux"]
      }, [
        N("Heart failure", "adj", {
          s: "Orthopnea, PND, JVP สูง, S3",
          why: "Cardiorenal syndrome และ CKD เพิ่ม HF ส่วน HF ทำให้ Cr ขึ้นได้ ต้องแยกว่าบวมจากหัวใจหรือไต",
          keys: ["Orthopnea, PND", "Displaced apex, S3", "UPCR ไม่ถึง nephrotic"],
          ix: ["NT-proBNP: < 125 pg/mL ใน non-acute setting ใช้ rule out HF ส่วนค่า ≥ 125 เพียงสนับสนุน ไม่ยืนยัน และสูงขึ้นเองใน CKD", "Echo: LVEF, diastolic function, RV"],
          std: "ESC 2021 HF guideline, Universal definition of HF 2021"
        }),
        N("Constrictive pericarditis / RV failure / PH", "adj", {
          s: "JVP สูงมากแต่ปอดใส",
          why: "Uremic หรือ TB pericarditis, PH จาก high-flow AVF หรือ chronic volume overload",
          keys: ["Kussmaul sign, pericardial knock", "Loud P2, RV heave", "Ascites เด่น"],
          ix: ["Echo: septal bounce, respiratory variation", "CT หรือ MRI: pericardial thickening", "RHC: mPAP > 20 mmHg"],
          std: "ESC 2022 pulmonary hypertension guideline"
        }),
        N("Nephritic syndrome", "nephro", {
          s: "บวม + HT ใหม่ + glomerular hematuria",
          why: "Primary renal Na retention (overfill) จึง JVP สูงได้ทั้งที่ albumin ใกล้ปกติ",
          keys: ["Dysmorphic RBC (acanthocytes ≥ 5% ของ RBC ในปัสสาวะ) หรือ RBC cast, ไม่พบ RBC cast ไม่ได้ตัด GN", "Cr ขึ้นเร็ว", "Rash, arthralgia, ENT symptoms"],
          ix: ["UA microscopy, UPCR", "C3, C4, ANA, ANCA, anti-GBM, ASO", "Biopsy"],
          std: "KDIGO 2021 glomerular diseases",
          link: "rpgn"
        }),
        N("AKI / advanced CKD", "nephro", {
          s: "บวมจาก GFR ลด",
          keys: ["Oliguria", "Cr trend", "Uremic symptoms"],
          ix: ["Cr trend, kidney size by ultrasound"],
          std: "KDIGO AKI and CKD definitions",
          link: "risingcr"
        }),
        N("Drug-induced edema", "adj", {
          s: "บวมหลังเริ่มยา",
          why: "DHP-CCB ทำ precapillary vasodilation จึงไม่ตอบสนองต่อ diuretic ส่วน NSAID, TZD, steroid, minoxidil ทำ Na retention",
          keys: ["Timeline ตรงกับยา", "CCB: dose-dependent ที่ข้อเท้า", "Gabapentin, pregabalin, estrogen"],
          ix: ["หยุดหรือลดยาแล้วดูผล"],
          std: "Naranjo adverse drug reaction probability scale"
        }),
        N("Preeclampsia", "nephro", {
          s: "บวม + HT + proteinuria หลัง 20 สัปดาห์",
          keys: ["GA ≥ 20 wk", "BP ≥ 140/90", "UPCR ≥ 0.3 g/g หรือ organ dysfunction"],
          ix: ["UPCR, platelet, LFT, Cr", "sFlt-1/PlGF ratio ถ้ามี"],
          std: "ISSHP 2021",
          link: "pregnancy"
        }),
        N("Refeeding / idiopathic edema", "adj", {
          s: "Idiopathic edema: หญิงวัยเจริญพันธุ์ บวมเป็นๆหายๆ ไม่สัมพันธ์กับรอบเดือน เป็น diagnosis of exclusion ส่วน refeeding edema: บวมหลังกลับมากินอาหารหลังอดหรือ malnutrition",
          keys: ["ประวัติใช้ diuretic หรือ laxative (หยุดแล้วบวมจาก rebound Na retention)", "Idiopathic edema: น้ำหนักเพิ่มจากเช้าถึงเย็นมากผิดปกติ บวมมากขึ้นเมื่อยืนนาน", "Refeeding: insulin ที่สูงขึ้นทำ Na retention"]
        })
      ]),
      N("↓ Oncotic (albumin ต่ำ)", "step", {
        s: "ดู UPCR ก่อนเพื่อแยกเสียทางปัสสาวะ ลำไส้ สร้างน้อย หรือกินน้อย",
        keys: ["Albumin < 3 g/dL", "UPCR สูง: kidney", "UPCR ปกติ: liver, gut, nutrition"]
      }, [
        N("Nephrotic syndrome", "nephro", {
          s: "Proteinuria > 3.5 g/d + albumin < 3.0 g/dL + edema",
          why: "สาเหตุหลักของบวมในข้อสอบ ต้องไล่ต่อถึง lesion และ secondary cause",
          keys: ["ปัสสาวะเป็นฟอง, หนังตาบวมตอนเช้า", "Lipiduria: oval fat body, Maltese cross", "Hyperlipidemia"],
          ix: ["UPCR > 3.5 g/g หรือ 24-h protein > 3.5 g", "Albumin, lipid profile"],
          std: "KDIGO 2021 glomerular diseases",
          link: "nephrotic"
        }, [
          N("MCD / FSGS", "nephro", {
            s: "Podocytopathy",
            keys: ["MCD: บวมเร็วภายในไม่กี่วัน, sediment มัก bland", "Secondary FSGS: obesity, NSAID, lithium, HIV, heroin, APOL1", "Primary FSGS: full-blown nephrotic syndrome"],
            ix: ["Biopsy: LM ปกติหรือ segmental sclerosis, EM diffuse effacement", "Anti-nephrin antibody ใน podocytopathy"],
            std: "KDIGO 2021, Columbia classification of FSGS"
          }),
          N("Membranous nephropathy", "nephro", {
            s: "พบบ่อยช่วงอายุ 40-60 ปี, thrombosis risk สูงสุดในกลุ่ม nephrotic syndrome",
            keys: ["Secondary: HBV, syphilis, SLE, NSAID, malignancy, SSc", "ทุกราย screen มะเร็งตามอายุไม่ว่า anti-PLA2R บวกหรือลบ และค้นละเอียดขึ้นถ้าอายุมาก น้ำหนักลด สูบบุหรี่ หรือ anti-PLA2R ลบ"],
            ix: ["Anti-PLA2R (บวกประมาณ 70% ของ primary, ผลลบไม่ตัด primary MN และผลบวกยังต้อง screen secondary cause)", "THSD7A, biopsy IgG subclass (IgG4 เด่นใน primary)"],
            std: "KDIGO 2021 MN risk categories"
          }),
          N("Diabetic kidney disease", "nephro", {
            s: "DM นาน + retinopathy + albuminuria ค่อยๆเพิ่ม",
            keys: ["T1DM มักเป็นหลังเป็นเบาหวาน ≥ 10 ปี ส่วน T2DM พบได้ตั้งแต่แรกวินิจฉัย", "มักมี retinopathy ร่วม แต่ใน T2DM การไม่มี retinopathy ไม่ได้ตัด DKD", "ไม่มี active sediment"],
            ix: ["UACR trend, fundus", "Biopsy เมื่อ atypical: proteinuria เพิ่มเร็ว, eGFR ลดเร็ว, active sediment, T1DM < 5 ปี, ไม่มี retinopathy (น้ำหนักมากใน T1DM)"],
            std: "KDIGO 2022 diabetes in CKD"
          }),
          N("Amyloidosis / MIDD", "nephro", {
            s: "อายุ > 50, น้ำหนักลด, ไตไม่เล็ก",
            keys: ["Macroglossia, periorbital purpura", "Orthostatic hypotension, HFpEF", "Carpal tunnel"],
            ix: ["SPEP + serum IFE + serum FLC (ใช้ร่วมกันจับ AL ได้เกือบทั้งหมด)", "Biopsy: amyloid ติด Congo red ให้ apple-green birefringence ส่วน MIDD Congo red negative และเห็น linear light chain staining ที่ GBM และ TBM"],
            std: "IMWG, Mayo AL staging",
            link: "mspike"
          }),
          N("Lupus nephritis class V", "nephro", {
            s: "หญิงอายุน้อย มี SLE features",
            ix: ["ANA, anti-dsDNA, C3, C4", "Biopsy ISN/RPS"],
            std: "KDIGO 2024 lupus nephritis"
          }),
          N("Infection-related MN / MPGN", "nephro", {
            s: "HBV, HCV, syphilis, HIV",
            keys: ["Risk behavior", "ผื่นฝ่ามือฝ่าเท้า (syphilis)"],
            ix: ["HBsAg, anti-HCV, HCV RNA, VDRL และ treponemal test, anti-HIV"]
          })
        ]),
        N("Liver cirrhosis", "adj", {
          s: "Ascites เด่นกว่าขาบวม มี stigmata",
          why: "Hypoalbuminemia + portal HT ทำให้บวม และเชื่อมกับไตผ่าน HRS-AKI, IgA nephropathy, HBV/HCV GN",
          keys: ["Spider nevi, palmar erythema, splenomegaly", "UPCR ปกติ"],
          ix: ["SAAG ≥ 1.1 g/dL = portal hypertension", "LFT, INR, ultrasound หรือ elastography"],
          std: "AASLD ascites guideline, ICA-ADQI HRS-AKI criteria"
        }),
        N("Protein-losing enteropathy", "adj", {
          s: "Albumin และ globulin ต่ำทั้งคู่ แต่ UPCR ปกติ",
          keys: ["ท้องเสียเรื้อรัง", "Lymphopenia (intestinal lymphangiectasia)"],
          ix: ["Stool alpha-1 antitrypsin clearance"]
        }),
        N("Malnutrition / malabsorption", "adj", {
          s: "BMI ต่ำ, cholesterol ต่ำ",
          keys: ["ไม่มี lipiduria หรือ hyperlipidemia"],
          ix: ["Nutritional assessment (SGA)"]
        })
      ]),
      N("↑ Capillary permeability", "step", {
        s: "บวมร่วมกับช็อกหรือภาวะอักเสบ",
        keys: ["Hemoconcentration", "Hypotension"]
      }, [
        N("Sepsis / systemic inflammation", "adj", {
          s: "ไข้ ช็อก CRP สูง",
          keys: ["Fluid responsive แต่บวมมาก"]
        }),
        N("Systemic capillary leak syndrome", "adj", {
          s: "Episodic: hypotension + hemoconcentration + hypoalbuminemia",
          why: "ราวสามในสี่ (76% ใน Mayo series) มี monoclonal gammopathy จึงอยู่ใน line เดียวกับ paraprotein",
          keys: ["Hct สูงขณะ attack", "ไม่มี proteinuria"],
          ix: ["SPEP และ IFE (monoclonal IgG)"]
        }),
        N("Drug-related capillary leak", "adj", {
          s: "IL-2, docetaxel, gemcitabine",
          keys: ["Timeline กับ chemotherapy"]
        })
      ])
    ]),
    N("Endocrine / non-pitting", "step", {
      s: "Non-pitting หรือบวมร่วมกับ endocrine features"
    }, [
      N("Hypothyroidism", "adj", {
        s: "Myxedema non-pitting, cold intolerance",
        why: "Hypothyroidism ลด GFR ทำ Cr ขึ้นและ hyponatremia ส่วน nephrotic syndrome ทำ total T4 ต่ำจากการเสีย TBG",
        keys: ["Delayed relaxation of reflexes", "Bradycardia"],
        ix: ["TSH, FT4"]
      }),
      N("Cushing / exogenous steroid", "adj", {
        s: "Moon face, purple striae",
        ix: ["1-mg overnight dexamethasone suppression test"],
        std: "Endocrine Society Cushing guideline"
      })
    ])
  ])
};

/* ===================== WEAKNESS ===================== */
TREES.weakness = {
  must: [
    "อ่อนแรงจริง หรือเพลีย หรือปวดจนขยับไม่ได้",
    "Proximal vs distal, symmetric vs asymmetric, onset และ tempo",
    "Episodic หรือ progressive, trigger: carbohydrate, exercise, ตื่นนอน",
    "Fatigability, ptosis, diplopia, dysphagia",
    "ชา, sphincter, back pain",
    "ยา: statin, colchicine, steroid, diuretic, laxative, CNI, cidofovir, tenofovir",
    "Thyroid symptoms, GI loss, ผื่น, ปวดกล้ามเนื้อ",
    "Family history ของ paralysis หรือ tubulopathy"
  ],
  tree: N("Weakness", "root", {
    s: "แยก true weakness ออกจาก fatigue และ pain-limited ก่อน แล้ว localize ตาม neuraxis",
    why: "อ่อนแรงเป็นทางเข้าของ electrolyte disorder, tubulopathy, myeloma, osteomalacia และ vasculitis ในข้อสอบ",
    keys: ["MRC power grading", "Reflexes: ต่ำใน LMN และ electrolyte, สูงใน UMN", "Sensory level", "Fatigability"],
    ix: ["K, Ca, PO4, Mg, venous blood gas", "CK", "TSH", "EMG/NCS, MRI ตาม localization"],
    std: "MRC scale, anatomical localization"
  }, [
    N("Not true weakness", "step", {
      s: "Power ปกติเมื่อตรวจ หรือ give-way จากปวด",
      keys: ["Fatigue", "Pain-limited", "Deconditioning"]
    }, [
      N("Fatigue / asthenia", "step", {
        s: "เพลีย ไม่มี objective weakness"
      }, [
        N("Anemia / uremia", "nephro", {
          s: "Hb ต่ำ, BUN สูง, CKD",
          keys: ["Pallor", "Uremic symptoms: anorexia, pruritus, asterixis"],
          ix: ["CBC, Cr, BUN, iron studies"],
          link: "cytopenia"
        }),
        N("Adrenal insufficiency", "adj", {
          s: "Hyponatremia ± hyperkalemia, hypotension",
          why: "ICI hypophysitis และการหยุด steroid ใน LN, KT เป็นสาเหตุที่ออกข้อสอบ",
          keys: ["Secondary AI: ไม่มี hyperpigmentation, K ปกติ", "Primary AI: hyperpigmentation, hyperkalemia"],
          ix: ["8 am cortisol < 3-5 mcg/dL สนับสนุน, > 15-18 ทำให้ AI unlikely, ค่าระหว่างนั้นต้องทำ cosyntropin test (total cortisol ต่ำลวงได้เมื่อ albumin หรือ CBG ต่ำ เช่น nephrotic)", "ACTH, cosyntropin test"],
          std: "Endocrine Society 2016 adrenal insufficiency guideline",
          link: "hypona"
        }),
        N("Hypothyroidism", "adj", {
          s: "เพลีย, cold intolerance, CK สูงได้",
          ix: ["TSH, FT4"]
        }),
        N("Depression / OSA / malignancy", "adj", {
          s: "Fatigue ที่ไม่มี lab ผิดปกติ",
          keys: ["Snoring, daytime sleepiness", "น้ำหนักลด"],
          ix: ["PHQ-9, STOP-BANG, age-appropriate cancer screen"],
          link: "weightloss"
        })
      ]),
      N("Pain-limited", "step", {
        s: "ขยับไม่ได้เพราะปวดกระดูกหรือข้อ",
        why: "ในข้อสอบ TIO และ myeloma มาด้วย 'อ่อนแรง' แต่ตรวจแล้วเป็น pain-limited"
      }, [
        N("Osteomalacia", "nephro", {
          s: "ปวดกระดูก, proximal weakness, waddling gait",
          why: "TIO, Fanconi syndrome, CKD-MBD, vitamin D deficiency",
          keys: ["Pseudofracture (Looser zone)", "ALP สูง, PO4 ต่ำ"],
          ix: ["PO4, ALP, PTH, 25-OH D, FEPO4 หรือ TmP/GFR, FGF23"],
          link: "bonepain"
        }),
        N("Myeloma bone disease", "nephro", {
          s: "ปวดกระดูก, anemia, Cr สูง",
          keys: ["Lytic lesions", "Hypercalcemia, globulin สูงหรือต่ำผิดปกติ"],
          ix: ["SPEP, serum IFE, sFLC, skeletal survey หรือ low-dose CT"],
          std: "IMWG 2014 myeloma criteria (CRAB + SLiM)",
          link: "mspike"
        }),
        N("Polymyalgia rheumatica / arthritis", "adj", {
          s: "ปวดตึงไหล่และสะโพกตอนเช้า, ESR สูง",
          ix: ["ESR, CRP"],
          std: "ACR/EULAR 2012 PMR classification"
        })
      ])
    ]),
    N("True weakness: UMN", "step", {
      s: "Hyperreflexia, spasticity, upgoing plantar",
      keys: ["Brain: hemiparesis, cortical signs", "Cord: sensory level, sphincter"]
    }, [
      N("Stroke / hemorrhage", "adj", {
        s: "Sudden hemiparesis",
        why: "ADPKD aneurysm rupture, hypertensive emergency, cardioembolic จาก AF ใน HD",
        keys: ["Thunderclap headache ใน SAH"],
        ix: ["CT หรือ MRI brain, CTA"],
        link: "headache"
      }),
      N("PRES / CNS lupus / vasculitis", "nephro", {
        s: "Encephalopathy, seizure, visual loss",
        why: "พบใน severe HT, CNI, SLE flare และ TMA",
        ix: ["MRI: posterior vasogenic edema ใน PRES", "CSF, MRA"]
      }),
      N("Osmotic demyelination", "nephro", {
        s: "Quadriparesis, dysarthria หลังแก้ Na เร็ว",
        why: "แก้ hyponatremia เร็วเกินโดยเฉพาะ high-risk (Na ≤ 105, alcohol, hypokalemia, malnutrition)",
        keys: ["อาการตามหลังแก้ Na 2-6 วัน"],
        ix: ["MRI brain: T2 และ DWI signal ที่ pons หรือ extrapontine, MRI ช่วงแรกปกติได้ ถ้ายังสงสัยให้ทำซ้ำใน 2 สัปดาห์"],
        std: "จำกัดการแก้ไม่เกิน 10 mmol/L ใน 24 ชั่วโมงแรกและ 8 mmol/L ต่อ 24 ชั่วโมงถัดไป (European 2014), ถ้า high-risk ODS ไม่เกิน 8 mmol/L ใน 24 ชั่วโมงใดๆ (US expert panel 2013)",
        link: "hypona"
      }),
      N("Spinal cord compression", "nephro", {
        s: "Paraparesis + sensory level + sphincter",
        why: "Brown tumor ใน HD (ออกข้อสอบ), epidural abscess จาก catheter bacteremia, myeloma, spinal TB",
        keys: ["Back pain, saddle anesthesia", "ไข้ในผู้มี catheter"],
        ix: ["MRI whole spine ทันที", "PTH, ALP, blood culture, SPEP"],
        link: "bonepain"
      }),
      N("Transverse myelitis", "adj", {
        s: "Myelopathy เฉียบพลัน",
        why: "SLE, Sjogren, NMOSD (anti-AQP4)",
        ix: ["MRI spine, anti-AQP4, ANA, anti-Ro"]
      })
    ]),
    N("True weakness: LMN / nerve", "step", {
      s: "Hyporeflexia, wasting, fasciculation หรือ sensory loss",
      keys: ["Symmetric ascending: polyneuropathy หรือ GBS", "Asymmetric multifocal: mononeuritis multiplex"]
    }, [
      N("Guillain-Barre syndrome", "adj", {
        s: "Ascending weakness + areflexia หลังติดเชื้อ",
        why: "รักษาด้วย PLEX (ASFA category I) หรือ IVIG โดย IVIG ชนิดที่มี sucrose ทำ osmotic nephrosis ได้",
        keys: ["Campylobacter, CMV นำมา", "Autonomic instability"],
        ix: ["CSF albuminocytologic dissociation (protein อาจยังปกติในสัปดาห์แรก)", "NCS: demyelination (AIDP) หรือ axonal (AMAN, AMSAN) และอาจปกติในช่วงแรก"],
        std: "Brighton criteria"
      }),
      N("CIDP / nodopathy", "adj", {
        s: "Progressive > 8 weeks",
        why: "Anti-contactin-1 nodopathy มีรายงานร่วมกับ membranous nephropathy",
        ix: ["NCS, anti-CNTN1, anti-NF155"],
        std: "EAN/PNS 2021 CIDP guideline"
      }),
      N("Mononeuritis multiplex", "nephro", {
        s: "Wrist drop หรือ foot drop หลายเส้น",
        why: "ANCA vasculitis, polyarteritis nodosa, cryoglobulinemia (ออกข้อสอบ) และ diabetes",
        ix: ["NCS: asymmetric axonal", "ANCA, cryoglobulin, HBsAg, nerve biopsy"],
        link: "numbness"
      }),
      N("Uremic / diabetic / amyloid neuropathy", "nephro", {
        s: "Distal symmetric sensorimotor",
        keys: ["Amyloid: autonomic + carpal tunnel", "POEMS: monoclonal lambda, organomegaly"],
        ix: ["NCS, SPEP/IFE/FLC, VEGF ใน POEMS"],
        link: "numbness"
      })
    ]),
    N("True weakness: NMJ", "step", {
      s: "Fatigability, ptosis, bulbar, sensory ปกติ, reflex ปกติใน MG แต่ลดใน Lambert-Eaton และ hypermagnesemia",
      keys: ["MG: อ่อนลงเมื่อใช้ซ้ำ ส่วน Lambert-Eaton ดีขึ้นชั่วครู่หลังออกแรง", "Ocular involvement"]
    }, [
      N("Myasthenia gravis", "adj", {
        s: "Fluctuating ptosis, diplopia, proximal weakness",
        why: "ยาที่ทำ MG แย่ลง: aminoglycoside, fluoroquinolone, Mg, beta-blocker และ MG crisis รักษาด้วย PLEX (ASFA category I) หรือ IVIG",
        ix: ["Anti-AChR, anti-MuSK", "Repetitive nerve stimulation, CT thymus"],
        std: "MGFA classification"
      }),
      N("Hypermagnesemia", "nephro", {
        s: "Hyporeflexia, hypotension, bradycardia",
        why: "CKD ร่วมกับ Mg-containing antacid หรือ laxative",
        keys: ["Hyporeflexia เริ่มเมื่อ Mg > 4.8 mg/dL และ DTR หายเมื่อเข้าใกล้ 12 mg/dL (5 mmol/L)"],
        ix: ["Serum Mg"],
        link: "mg"
      }),
      N("Lambert-Eaton", "adj", {
        s: "Proximal weakness ที่ดีขึ้นเมื่อออกแรง + autonomic",
        why: "ราว 50-60% เป็น paraneoplastic จาก SCLC ที่เหลือเป็น autoimmune",
        ix: ["Anti-VGCC (P/Q type), CT chest"]
      })
    ]),
    N("True weakness: muscle", "step", {
      s: "Proximal symmetric, reflex ปกติหรือลดเล็กน้อย, sensory ปกติ",
      keys: ["CK สูง: inflammatory, necrotizing, rhabdomyolysis, hypothyroid, hypokalemia", "CK ปกติ: steroid myopathy, Cushing, hyperthyroid, hyperparathyroid, periodic paralysis ช่วงแรก", "CK ปกติไม่ตัด inflammatory myopathy (เช่น dermatomyositis ชนิด anti-MDA5)"],
      ix: ["CK, electrolytes, TSH", "EMG, MRI muscle, biopsy"]
    }, [
      N("Electrolyte-induced", "step", {
        s: "ตรวจ K, PO4, Ca, Mg ทุกราย",
        why: "เป็นแกนของ nephro ที่ออกข้อสอบบ่อยที่สุดในกลุ่มนี้"
      }, [
        N("Hypokalemic paralysis", "step", {
          s: "K มักต่ำกว่า 2.5 mmol/L, แยก shift กับ renal loss และ extrarenal loss",
          keys: ["Shift: episodic, ไม่มี acid-base ผิดปกติ", "Renal loss: K ต่ำต่อเนื่อง, มี acid-base ผิดปกติ"],
          ix: ["Spot urine K/Cr < 13 mEq/g (ประมาณ 1.5 mmol/mmol) = shift หรือ extrarenal loss", "Venous blood gas, TSH"],
          std: "Kamel and Halperin approach to hypokalemia",
          link: "hypok"
        }, [
          N("Thyrotoxic periodic paralysis", "adj", {
            s: "ชายเอเชีย, attack หลังมื้อคาร์โบไฮเดรตมากหรือช่วงพักหลังออกกำลังหนัก มักเป็นกลางคืนถึงเช้ามืด",
            why: "เป็น shift ที่พบบ่อยในไทย ต้องแยกก่อนให้ K จำนวนมาก",
            keys: ["อาการ thyrotoxic อาจไม่ชัด", "Hypophosphatemia ร่วม, ไม่มี acidosis"],
            ix: ["TSH ต่ำ, FT4 สูง, urine K/Cr ต่ำ"],
            std: "ระวัง rebound hyperkalemia, nonselective beta-blocker ช่วย"
          }),
          N("Familial hypokalemic periodic paralysis", "adj", {
            s: "เริ่มวัยรุ่น, family history",
            ix: ["CACNA1S, SCN4A"]
          }),
          N("Distal RTA", "nephro", {
            s: "NAGMA + urine pH > 5.5",
            why: "Sjogren, SLE, amphotericin, hypercalciuria และ nephrocalcinosis (RTA ออกข้อสอบ 3 เคส) ส่วน cidofovir ทำ proximal tubulopathy ดู Proximal RTA / Fanconi",
            keys: ["Nephrocalcinosis, stones", "Sicca symptoms"],
            ix: ["Urine anion gap บวก หรือ urine osmolal gap < 100 mOsm/kg (NH4 ต่ำ)", "Bicarbonate loading: U-B pCO2 < 20 mmHg"],
            link: "nagma"
          }),
          N("Proximal RTA / Fanconi", "nephro", {
            s: "NAGMA + glycosuria ที่ glucose ปกติ",
            why: "Tenofovir, cidofovir, ifosfamide, myeloma (LCPT), Wilson",
            keys: ["Hypophosphatemia, hypouricemia"],
            ix: ["FEHCO3 > 15% เมื่อ loading", "FEPO4 สูง, beta2-microglobulin ในปัสสาวะสูง"],
            link: "nagma"
          }),
          N("Gitelman / Bartter / diuretic", "nephro", {
            s: "Metabolic alkalosis, BP ปกติ",
            keys: ["Gitelman: hypomagnesemia, hypocalciuria", "Bartter: hypercalciuria, nephrocalcinosis"],
            ix: ["Urine Cl > 40 mmol/L (ไม่ใช่ vomiting)", "Spot urine Ca/Cr < 0.2 mmol/mmol สนับสนุน Gitelman", "Urine diuretic screen, SLC12A3"],
            std: "KDIGO 2017 Gitelman consensus",
            link: "metalk"
          }),
          N("Mineralocorticoid excess and mineralocorticoid-like states", "nephro", {
            s: "Metabolic alkalosis + HT",
            why: "แยกด้วย renin และ aldosterone: aldosterone สูงจริง (primary aldosteronism, renovascular), aldosterone ต่ำแต่ MR หรือ ENaC ถูกกระตุ้น (licorice, AME, Cushing, CAH, Liddle)",
            ix: ["Aldosterone-renin ratio (PAC/PRA)"],
            std: "Endocrine Society primary aldosteronism guideline",
            link: "htn-young"
          }),
          N("GI loss / laxative", "adj", {
            s: "Diarrhea: NAGMA + UAG ลบ, vomiting: metabolic alkalosis + urine Cl < 20 mmol/L",
            ix: ["Urine anion gap, urine Cl"]
          })
        ]),
        N("Hyperkalemic weakness", "nephro", {
          s: "Ascending flaccid weakness, มักเมื่อ K > 7-8 mmol/L",
          why: "CKD, hypoaldosteronism, RAAS blocker, TMP, CNI, Gordon syndrome",
          keys: ["ECG changes มักนำมาก่อนอ่อนแรง แต่ ECG ปกติไม่ตัด hyperkalemia รุนแรง"],
          ix: ["ECG, K ซ้ำ (ตัด pseudohyperkalemia)"],
          link: "hyperk"
        }),
        N("Severe hypophosphatemia", "nephro", {
          s: "PO4 < 1 mg/dL, rhabdomyolysis, respiratory failure",
          why: "Refeeding, Fanconi, TIO, หลัง KT",
          ix: ["FEPO4 > 5% ขณะ PO4 ต่ำ = renal loss", "TmP/GFR, FGF23"],
          link: "phos"
        }),
        N("Hypercalcemia", "nephro", {
          s: "Proximal weakness, polyuria, constipation",
          why: "PHPT, myeloma, sarcoidosis, vitamin D",
          ix: ["Ionized Ca, PTH, PTHrP, 1,25-OH2 D"],
          link: "hyperca"
        }),
        N("Hypocalcemia / hypomagnesemia", "nephro", {
          s: "Cramp, tetany มากกว่าอ่อนแรง",
          keys: ["Chvostek, Trousseau"],
          ix: ["Ionized Ca, Mg, PTH"],
          link: "hypoca"
        })
      ]),
      N("Inflammatory myopathy", "adj", {
        s: "Subacute proximal weakness, CK สูง",
        why: "Lupus myositis (ออกข้อสอบ), overlap กับ SSc และ anti-synthetase ที่มี ILD",
        keys: ["Heliotrope, Gottron papules ใน dermatomyositis", "Mechanic's hands, ILD"],
        ix: ["CK, myositis antibodies (anti-Jo1, anti-MDA5, anti-HMGCR, anti-SRP)", "MRI muscle, EMG, biopsy", "Dermatomyositis ในผู้ใหญ่ทุกรายต้อง screen มะเร็ง และค้นละเอียดขึ้นถ้าอายุมาก หรือ anti-TIF1-gamma, anti-NXP2 บวก"],
        std: "EULAR/ACR 2017 idiopathic inflammatory myopathy criteria"
      }),
      N("Drug / toxic myopathy", "nephro", {
        s: "ยาเป็นสาเหตุที่แก้ได้",
        why: "Statin ร่วมกับ cyclosporine ใน KT, colchicine ที่ไม่ปรับขนาดใน CKD, steroid, zidovudine, hydroxychloroquine, alcohol",
        keys: ["Steroid myopathy: CK ปกติ", "Colchicine: myoneuropathy"],
        ix: ["CK, drug levels, หยุดยาแล้วดูผล", "Anti-HMGCR ถ้าไม่ดีขึ้นหลังหยุด statin"]
      }),
      N("Rhabdomyolysis", "nephro", {
        s: "ปวดกล้ามเนื้อ, ปัสสาวะสีโค้ก, CK > 5x ULN",
        why: "Pigment nephropathy ทำ AKI ได้ ส่วน hypokalemia และ hypophosphatemia เป็นทั้งสาเหตุและผล",
        keys: ["Dipstick blood บวกแต่ไม่มี RBC", "Trauma, exertion, heat, drugs, infection, genetic"],
        ix: ["CK, urine myoglobin, K, PO4, Ca, uric acid"],
        std: "McMahon score ประเมิน risk ของ AKI และ RRT",
        link: "risingcr"
      }),
      N("Endocrine myopathy", "adj", {
        s: "Thyroid, Cushing, PTH, vitamin D",
        ix: ["TSH, cortisol, PTH, 25-OH D"]
      }),
      N("Uremic myopathy / sarcopenia", "nephro", {
        s: "Muscle wasting ใน CKD และ dialysis",
        why: "สัมพันธ์กับ protein-energy wasting และ mortality",
        ix: ["Handgrip, muscle mass by BIA หรือ DXA, gait speed"],
        std: "AWGS 2019: grip < 28 kg ในชาย, < 18 kg ในหญิง"
      })
    ])
  ])
};

/* ===================== RASH ===================== */
TREES.rash = {
  must: [
    "Morphology: palpable หรือไม่, กดจางหรือไม่, ตำแหน่ง, คันหรือปวด",
    "Timeline เทียบกับยาใหม่ ไข้ และอาการไต",
    "Photosensitivity, oral ulcer, alopecia, Raynaud",
    "Sicca, arthralgia, ENT, hemoptysis, neuropathy",
    "Sexual history, genital ulcer, ประวัติ HBV และ HCV",
    "หัตถการหลอดเลือดหรือ anticoagulant ในช่วงก่อน (cholesterol emboli)",
    "Gadolinium exposure ใน CKD, ประวัติครอบครัวเรื่องผื่นและไต"
  ],
  tree: N("Rash with kidney disease", "root", {
    s: "แยกตาม morphology แล้วจับคู่ skin pattern กับ kidney lesion",
    why: "Dermatorenal syndrome เป็นแกนของ long case GN และ vasculitis ผื่นมักบอก diagnosis ได้ก่อน biopsy",
    keys: ["Palpable purpura ชี้ไปทาง small-vessel vasculitis", "Livedo ชี้ไปทาง APS, emboli, medium vessel", "Photosensitive rash ชี้ไปทาง SLE (แยก dermatomyositis และยา)", "Morbilliform + fever ชี้ไปทาง drug reaction และ AIN"],
    ix: ["Skin biopsy with DIF ภายใน 24-48 ชั่วโมงของผื่นใหม่", "UA microscopy, complement, ANA, ANCA, cryoglobulin, HBV/HCV"],
    std: "Chapel Hill 2012 vasculitis nomenclature"
  }, [
    N("Purpura", "step", {
      s: "กดไม่จาง แยก palpable กับ non-palpable",
      keys: ["Palpable: vasculitis", "Non-palpable: platelet, coagulation, vessel fragility"]
    }, [
      N("Palpable purpura", "step", {
        s: "Leukocytoclastic small-vessel vasculitis",
        keys: ["ขาและก้น, dependent areas", "ใช้ DIF แยก IgA, IgM/IgG, pauci-immune"]
      }, [
        N("IgA vasculitis", "nephro", {
          s: "Purpura + arthralgia + abdominal pain + nephritis",
          keys: ["ผู้ใหญ่ nephritis รุนแรงกว่าเด็ก", "มักตามหลัง URI"],
          ix: ["Skin DIF: IgA perivascular", "Kidney biopsy: mesangial IgA, MEST-C"],
          std: "EULAR/PRINTO/PRES (เด็ก), KDIGO 2025 IgAN/IgAV"
        }),
        N("Cryoglobulinemic vasculitis", "nephro", {
          s: "Purpura + arthralgia + weakness, C4 ต่ำมาก",
          why: "HCV, Sjogren, B-cell lymphoma (ออกข้อสอบ Sjogren + cryo)",
          keys: ["Neuropathy, Raynaud", "MPGN pattern"],
          ix: ["Cryocrit (เก็บ 37 องศา), RF, C4, HCV RNA, SPEP"],
          std: "Classification criteria for cryoglobulinemic vasculitis 2011"
        }),
        N("ANCA-associated vasculitis", "nephro", {
          s: "Purpura + RPGN + lung, ENT, nerve",
          keys: ["MPA: ส่วนใหญ่ MPO-ANCA, GPA: ส่วนใหญ่ PR3-ANCA และมี ENT, EGPA: asthma + eosinophilia (ANCA บวกเพียง 30-40%)", "Serotype กับ phenotype ไม่ตรงกันเสมอ เช่น GPA ที่เป็น MPO-ANCA"],
          ix: ["MPO, PR3 by ELISA (ANCA ลบไม่ตัด AAV และ ANCA บวกพบได้ใน endocarditis และยา)", "Biopsy: pauci-immune necrotizing crescentic GN"],
          std: "ACR/EULAR 2022 AAV classification, KDIGO 2024 ANCA vasculitis",
          link: "rpgn"
        }),
        N("Hypocomplementemic urticarial vasculitis", "nephro", {
          s: "Urticaria นาน > 24 ชั่วโมง ทิ้งรอยดำ",
          keys: ["Angioedema, ocular inflammation, COPD"],
          ix: ["Anti-C1q, C1q ต่ำ"]
        }),
        N("Drug-induced vasculitis", "nephro", {
          s: "PTU, hydralazine, levamisole-cocaine",
          keys: ["MPO titer สูงมาก, หลาย autoantibody"],
          ix: ["ANCA, ANA, anti-histone"]
        }),
        N("Infection-associated", "nephro", {
          s: "Endocarditis, HBV, HCV",
          why: "Infective endocarditis ทำ ANCA บวกได้ และให้ immune complex GN",
          ix: ["Blood culture x3, echo, HBsAg, anti-HCV"],
          std: "Duke-ISCVID 2023 criteria"
        })
      ]),
      N("Non-palpable purpura / petechiae", "step", {
        s: "Platelet ต่ำ, coagulopathy, vessel fragility"
      }, [
        N("TMA (TTP / HUS / CAPS)", "nephro", {
          s: "Petechiae + MAHA + AKI",
          ix: ["Smear schistocytes, LDH, haptoglobin, ADAMTS13, STEC, aPL"],
          std: "PLASMIC score, ISTH 2020 TTP",
          link: "tma"
        }),
        N("AL amyloidosis", "nephro", {
          s: "Periorbital หรือ pinch purpura",
          ix: ["SPEP, IFE, FLC, fat pad หรือ kidney biopsy"],
          link: "mspike"
        }),
        N("ITP / DIC / drug", "adj", {
          s: "Isolated thrombocytopenia หรือ coagulopathy",
          ix: ["CBC, PT, aPTT, fibrinogen"]
        }),
        N("Steroid / senile purpura, scurvy", "adj", {
          s: "Vessel fragility",
          keys: ["Scurvy: perifollicular hemorrhage, gum bleeding"]
        })
      ])
    ]),
    N("Livedo / ischemic", "step", {
      s: "Livedo racemosa, ulcer, gangrene",
      keys: ["Racemosa (broken pattern) มีความหมายมากกว่า reticularis"]
    }, [
      N("Antiphospholipid syndrome / CAPS", "nephro", {
        s: "Livedo + thrombosis + TMA",
        why: "APS nephropathy และ CAPS (ออกข้อสอบ triple positive)",
        keys: ["Pregnancy loss, VTE, stroke", "aPTT ปกติก็ไม่ตัด APS"],
        ix: ["Lupus anticoagulant, aCL, anti-beta2GPI ซ้ำห่าง ≥ 12 สัปดาห์"],
        std: "2023 ACR/EULAR APS classification criteria",
        link: "tma"
      }),
      N("Cholesterol embolization", "nephro", {
        s: "Blue toe + livedo หลังสวนหลอดเลือด",
        keys: ["AKI แบบ stepwise หลายสัปดาห์", "Eosinophilia, eosinophiluria, complement ต่ำ (พบเพียงบางราย ไม่มีก็ไม่ตัดโรค)"],
        ix: ["Fundus: Hollenhorst plaque", "Biopsy: cholesterol clefts"]
      }),
      N("Polyarteritis nodosa", "nephro", {
        s: "Livedo + nodules + mononeuritis + HT",
        why: "บางรายสัมพันธ์กับ HBV, ไตเป็น renal infarct และ microaneurysm ไม่ใช่ GN",
        ix: ["Angiography: microaneurysms", "ตรวจ HBsAg ทุกราย, ANCA มักให้ผลลบ"]
      }),
      N("Calciphylaxis", "nephro", {
        s: "Painful violaceous plaque ไปเป็น eschar",
        why: "ESKD, warfarin, high Ca x PO4, PTH ผิดปกติ",
        keys: ["Central (ต้นขา ท้อง) prognosis แย่กว่า distal"],
        ix: ["Clinical diagnosis เป็นหลัก, biopsy เมื่อไม่ชัด (เสี่ยงแผลลาม)"]
      }),
      N("Systemic sclerosis digital ischemia", "nephro", {
        s: "Raynaud, digital pitting scars, sclerodactyly",
        ix: ["Anti-Scl-70, anti-centromere, anti-RNA pol III"],
        link: "htn-emerg"
      })
    ]),
    N("Photosensitive / malar / discoid", "step", {
      s: "SLE และ mimics"
    }, [
      N("Systemic lupus erythematosus", "nephro", {
        s: "Malar, discoid, oral ulcer, alopecia",
        keys: ["Serositis, cytopenia, arthritis"],
        ix: ["ANA ≥ 1:80 เป็น entry criterion ของ classification (ANA บวกอย่างเดียวไม่ยืนยัน SLE)", "Anti-dsDNA, anti-Sm, C3, C4, UPCR"],
        std: "EULAR/ACR 2019 SLE classification, KDIGO 2024 LN"
      }),
      N("Dermatomyositis", "adj", {
        s: "Heliotrope, Gottron, shawl sign",
        why: "ต้องแยกจาก lupus rash และ overlap กันได้ ถ้า CK สูงมากเกิด pigment AKI ได้แต่พบน้อย",
        ix: ["CK, myositis antibodies"],
        std: "EULAR/ACR 2017 IIM criteria",
        link: "weakness"
      }),
      N("Drug-induced lupus", "nephro", {
        s: "Hydralazine, procainamide, anti-TNF",
        keys: ["Anti-histone บวกในยากลุ่มเดิม (hydralazine, procainamide) แต่ไม่ specific เพราะพบใน idiopathic SLE ได้ ส่วน anti-TNF มักเป็น anti-dsDNA บวกและ anti-histone ลบ", "Hydralazine ทำ ANCA GN ได้"],
        ix: ["Anti-histone, ANCA"]
      })
    ]),
    N("Morbilliform / maculopapular", "step", {
      s: "ผื่นแดงทั่วตัวร่วมไข้"
    }, [
      N("Drug hypersensitivity / DRESS", "nephro", {
        s: "ผื่น + ไข้ + eosinophilia + AIN",
        keys: ["DRESS: latency 2-8 สัปดาห์หลังยา", "Allopurinol, beta-lactam, sulfonamide, PPI, anticonvulsant", "Drug AIN ส่วนใหญ่ไม่มีผื่น (triad ไข้ ผื่น eosinophilia ครบไม่ถึง 10%) จึงไม่มีผื่นก็ไม่ตัด AIN"],
        ix: ["CBC eosinophil, LFT, UA (pyuria), biopsy เมื่อจำเป็น"],
        std: "RegiSCAR score",
        link: "risingcr"
      }),
      N("Secondary syphilis", "nephro", {
        s: "ผื่นฝ่ามือฝ่าเท้า",
        why: "Secondary MN จาก syphilis (ออกข้อสอบ)",
        ix: ["RPR หรือ VDRL + treponemal test"],
        std: "CDC 2021 STI guideline"
      }),
      N("Infective endocarditis", "nephro", {
        s: "Janeway lesions, Osler nodes, splinter hemorrhages",
        ix: ["Blood culture, echo"],
        std: "Duke-ISCVID 2023"
      }),
      N("Viral exanthem", "adj", {
        s: "HIV acute, parvovirus B19 (collapsing FSGS), HBV prodrome",
        ix: ["Viral serology หรือ PCR"]
      })
    ]),
    N("Papules / nodules / plaques", "step", {
      s: "รอยโรคเฉพาะที่ชี้โรค"
    }, [
      N("Sarcoidosis", "nephro", {
        s: "Erythema nodosum, lupus pernio",
        why: "Hypercalcemia จาก calcitriol และ granulomatous TIN",
        ix: ["Ca, 1,25-OH2 D, ACE, CT chest, biopsy"],
        link: "hyperca"
      }),
      N("Fabry disease", "nephro", {
        s: "Angiokeratoma, acroparesthesia, hypohidrosis",
        keys: ["Cornea verticillata, LVH, stroke อายุน้อย"],
        ix: ["Alpha-Gal A activity (ชาย), GLA genetics (หญิง)", "Biopsy: zebra bodies"]
      }),
      N("Tuberous sclerosis / BHD", "nephro", {
        s: "Facial angiofibroma, ash-leaf, fibrofolliculoma",
        why: "AML, renal cysts, RCC",
        ix: ["CT หรือ MRI kidney, genetics (TSC1/2, FLCN)"]
      }),
      N("Gout tophi", "nephro", {
        s: "Tophi ที่ข้อและหู",
        why: "Urate nephropathy, CKD, hypertension ในคนอายุน้อย",
        ix: ["Uric acid, joint aspiration"],
        link: "arthralgia"
      }),
      N("Xanthoma", "nephro", {
        s: "Eruptive xanthoma",
        why: "Hyperlipidemia รุนแรงใน nephrotic syndrome",
        ix: ["Lipid profile, UPCR"]
      }),
      N("Uremic pruritic dermatoses", "nephro", {
        s: "Prurigo nodularis, acquired perforating dermatosis",
        why: "Advanced CKD และ diabetes (ออกข้อสอบ)",
        ix: ["Clinical, skin biopsy เมื่อไม่ชัด"]
      })
    ]),
    N("Skin thickening", "step", {
      s: "ผิวแข็ง"
    }, [
      N("Systemic sclerosis", "nephro", {
        s: "Sclerodactyly, telangiectasia, Raynaud",
        why: "Scleroderma renal crisis โดยเฉพาะ diffuse SSc, anti-RNA pol III, steroid ขนาดสูง",
        ix: ["Autoantibodies, BP monitoring, UA"],
        std: "ACR/EULAR 2013 SSc classification",
        link: "htn-emerg"
      }),
      N("Nephrogenic systemic fibrosis", "nephro", {
        s: "ผิวแข็งที่แขนขาหลังได้ gadolinium",
        why: "เกิดในผู้ป่วย eGFR < 30, dialysis หรือ AKI ที่ได้ group I gadolinium",
        ix: ["Deep skin biopsy"],
        std: "ACR Manual on Contrast Media: group II agents risk ของ NSF ต่ำมาก ใช้ได้เมื่อจำเป็นแม้ eGFR < 30"
      })
    ]),
    N("Bullous / pigmentary / nail", "step", {
      s: "รอยโรคอื่นที่ช่วยบอก"
    }, [
      N("Bullous pemphigoid / PCT / pseudoporphyria", "nephro", {
        s: "ตุ่มน้ำพอง",
        why: "Pseudoporphyria และ PCT ใน HD, bullous pemphigoid กับ steroid ทำให้ติดเชื้อใน PD (ออกข้อสอบ)",
        ix: ["Skin biopsy + DIF, porphyrins"]
      }),
      N("Hyperpigmentation", "adj", {
        s: "Addison, uremia, hemochromatosis, drug",
        ix: ["Cortisol, ferritin"]
      }),
      N("Nail clues", "nephro", {
        s: "Half-and-half (Lindsay) nails, Muehrcke lines, absent patella",
        keys: ["Lindsay: CKD", "Muehrcke: hypoalbuminemia", "Nail-patella syndrome: LMX1B, iliac horns"],
        ix: ["X-ray pelvis และเข่าใน nail-patella"]
      }),
      N("Impetigo / skin infection", "nephro", {
        s: "แผลพุพองก่อน nephritis",
        why: "Post-streptococcal หรือ infection-related GN (ออกข้อสอบ)",
        ix: ["Anti-DNase B, ASO, C3 (หลัง skin infection ASO มักไม่ขึ้น ผล ASO ลบจึงไม่ตัด PSGN)"],
        link: "rpgn"
      })
    ])
  ])
};

/* ===================== FEVER / FUO ===================== */
TREES.fever = {
  must: [
    "ระยะเวลา, pattern ของไข้ (continuous, quotidian, intermittent), วัดจริงหรือรู้สึก",
    "Host: CKD, HD (ชนิด access), PD, KT (กี่เดือนหลังปลูกถ่าย, induction, IS ปัจจุบัน), steroid หรือ cyclophosphamide",
    "ไข้สัมพันธ์กับการฟอกเลือดหรือไม่, หนาวสั่นตอนต่อสาย, น้ำยา PD ขุ่น, แผล exit site",
    "Exposure: TB contact, ทำนา ลุยน้ำ (leptospirosis, melioidosis), เดินป่า (scrub typhus), สัตว์, เดินทาง",
    "ยาที่เริ่มใน 2-8 สัปดาห์: beta-lactam, allopurinol, anticonvulsant, sulfonamide, PPI",
    "ผื่น, ปวดข้อ, แผลในปาก, ผมร่วง, ไอเป็นเลือด, ไซนัส, ตาแดง",
    "น้ำหนักลด, เหงื่อออกกลางคืน, ต่อมน้ำเหลืองโต, ก้อน",
    "ลิ้นหัวใจผิดปกติ, IVDU, sexual risk สำหรับ HIV และ syphilis"
  ],
  tree: N("Prolonged fever / FUO", "root", {
    s: "แยกตาม host ก่อน (dialysis, KT, immunocompetent) แล้วไล่ infection, inflammatory, malignancy, drug และอื่นๆ",
    why: "ไข้เป็นจุดตัดของ infection ที่ทำให้เกิด GN, autoimmune ที่ทำให้เกิด LN หรือ vasculitis, lymphoma และ drug-induced AIN จึงเป็นทางเข้าที่ examiner ชอบใช้",
    keys: ["Classic FUO: T > 38.3 °C หลายครั้ง นานกว่า 3 สัปดาห์ และยังไม่ได้ diagnosis หลัง workup พื้นฐาน", "Host และ immunosuppression", "Localizing clue (potentially diagnostic clue)", "ไข้ในผู้ป่วย SLE ที่ CRP ปกติหรือสูงเล็กน้อยและไม่มี serositis ชี้ไปทาง flare มากกว่า infection แต่ไม่ตัด infection"],
    ix: ["CBC with smear, H/C 3 ชุดก่อนให้ antibiotic, UA with microscopy, CXR", "LFT, LDH, ESR, CRP, ferritin", "HIV, HBsAg, anti-HCV, VDRL", "ANA, RF, C3, C4 ตาม clue", "CT chest-abdomen-pelvis แล้วจึง FDG-PET/CT ถ้ายังไม่มี clue"],
    std: "Durack and Street FUO categories (classic, nosocomial, neutropenic, HIV-associated)"
  }, [
    N("Dialysis or transplant host", "step", {
      s: "เริ่มจาก device และ timeline ก่อนเสมอ",
      why: "ในผู้ป่วย HD, PD และ KT มีสาเหตุเฉพาะที่พบบ่อยและอันตรายเพิ่มขึ้นมา แต่สาเหตุทั่วไป (TB, IE, lymphoma, autoimmune, ยา) ยังต้องไล่ตาม line ถัดไปเหมือนเดิม",
      keys: ["HD catheter vs AVF", "PD effluent", "เวลาหลัง KT"]
    }, [
      N("Catheter-related bloodstream infection", "nephro", {
        s: "ไข้หนาวสั่นช่วงเริ่มฟอก ใน HD catheter",
        why: "สาเหตุอันดับต้นของ bacteremia ใน HD เชื้อหลักคือ S. aureus และ CoNS",
        keys: ["Rigor เมื่อต่อสาย", "Exit site หรือ tunnel แดง มีหนอง", "ไม่มีแหล่งติดเชื้ออื่น"],
        ix: ["Paired blood culture จาก catheter และ peripheral (หรือจาก bloodline ระหว่างฟอก)", "Differential time to positivity ≥ 2 ชั่วโมง หรือ colony count จาก catheter ≥ 3 เท่า สนับสนุน CRBSI", "S. aureus bacteremia ต้องทำ echocardiography ทุกราย"],
        std: "IDSA 2009 CRBSI guideline, KDOQI 2019 vascular access guideline",
        link: "hd-fever"
      }),
      N("Infective endocarditis in HD", "nephro", {
        s: "Bacteremia ซ้ำ หรือไม่ลงหลังเอา catheter ออก",
        why: "HD มี IE สูงกว่าประชากรทั่วไปมาก จาก access และ valvular calcification และยังทำให้เกิด infection-related GN",
        keys: ["Murmur ใหม่", "Embolic phenomena", "Persistent bacteremia > 72 ชั่วโมง"],
        ix: ["TTE แล้วตามด้วย TEE ถ้า pretest สูง", "H/C ซ้ำจนลบ"],
        std: "2023 Duke-ISCVID IE criteria"
      }),
      N("PD peritonitis / exit site / tunnel infection", "nephro", {
        s: "น้ำยาขุ่น ปวดท้อง ไข้",
        why: "ไข้ใน PD ต้องตัด peritonitis และ tunnel infection ก่อนเสมอ",
        keys: ["Cloudy effluent", "Exit site แดง มีหนอง", "Tunnel tender ตามแนวสาย"],
        ix: ["Effluent WBC > 100/µL และ PMN > 50% หลัง dwell ≥ 2 ชั่วโมง", "Effluent Gram stain และ culture ในขวด blood culture", "US tunnel ถ้าสงสัย"],
        std: "ISPD 2022 peritonitis recommendations (2 ใน 3: clinical, effluent WBC, culture), ISPD 2023 catheter-related infection",
        link: "pd-cloudy"
      }),
      N("Post-transplant infection by timeline", "nephro", {
        s: "ใช้เวลาหลัง KT ทำนายเชื้อ",
        why: "Net state of immunosuppression กำหนดชนิดเชื้อ และไข้ใน KT ต้องแยกจาก rejection และ PTLD",
        keys: ["< 1 เดือน: nosocomial, surgical site, UTI, donor-derived", "1-12 เดือน: CMV, BK, PJP, TB, fungal, EBV", "> 12 เดือน: community-acquired, late CMV ถ้าเคย prophylaxis, TB reactivation"],
        ix: ["CMV QNAT, BK plasma PCR", "UA, urine culture (graft pyelonephritis)", "CXR หรือ CT chest, beta-D-glucan, LDH ถ้าสงสัย PJP"],
        std: "Fishman timeline of post-transplant infection, AST IDCOP 2019, KDIGO 2009 KT recipient care",
        link: "kt-fever"
      }),
      N("PTLD", "nephro", {
        s: "ไข้ ต่อมน้ำเหลืองโต ก้อนที่ graft หรือ GI",
        why: "EBV-seronegative recipient ที่ได้ไตจาก EBV-seropositive donor และได้ T-cell depleting induction เสี่ยงสูงสุด",
        keys: ["มักเกิดในปีแรกหรือหลายปีหลัง KT", "LDH สูง", "Extranodal: graft, GI, CNS"],
        ix: ["EBV DNA PCR (EBV-negative PTLD พบได้โดยเฉพาะ late onset ผลลบหรือ viral load ต่ำจึงไม่ตัด PTLD)", "FDG-PET/CT", "Excisional หรือ core biopsy เป็นตัววินิจฉัย"],
        std: "WHO classification of PTLD",
        link: "lymphnode"
      }),
      N("Acute rejection with fever", "nephro", {
        s: "Graft tender, Cr ขึ้น ไข้ต่ำๆ",
        why: "พบน้อยในยุค CNI แต่ยังพบได้เมื่อ non-adherence หรือ IS ลดลง",
        keys: ["Non-adherence", "เพิ่งลดยาเพราะติดเชื้อ", "DSA ใหม่"],
        ix: ["Graft US with Doppler", "DSA", "Graft biopsy"],
        std: "Banff 2022 classification",
        link: "kt-early"
      })
    ]),
    N("Infection", "step", {
      s: "สาเหตุที่พบบ่อยที่สุดของ FUO ในประเทศไทย",
      keys: ["TB เป็นอันดับต้น", "Tropical infection ตามฤดูและอาชีพ", "Endocarditis และ abscess"]
    }, [
      N("Tuberculosis (pulmonary / extrapulmonary)", "nephro", {
        s: "ไข้ต่ำๆ ตอนเย็น น้ำหนักลด เหงื่อออกกลางคืน",
        why: "CKD, HD และ KT เสี่ยง TB สูงกว่าคนทั่วไปหลายเท่า renal TB ทำให้ sterile pyuria และ TB ยังทำให้เกิด AA amyloid และ granulomatous TIN",
        keys: ["Sterile pyuria", "Lymphocytic pleural หรือ peritoneal effusion", "Extrapulmonary พบบ่อยใน CKD"],
        ix: ["Sputum AFB และ Xpert MTB/RIF Ultra", "Early morning urine AFB culture และ PCR 3 วัน", "Tissue biopsy: caseating granuloma", "IGRA หรือ TST ช่วยน้อยใน active TB และ false negative บ่อยใน CKD"],
        std: "WHO consolidated TB guidelines, Thai National TB Programme guideline",
        link: "pyuria"
      }),
      N("Infective endocarditis", "nephro", {
        s: "ไข้ murmur embolic phenomena",
        why: "ทำให้เกิด infection-related GN (low C3), septic renal infarct, AIN จาก antibiotic และ PR3-ANCA ผลบวกใน Bartonella",
        keys: ["Hematuria กับ low C3", "Splinter hemorrhage, Janeway, Osler", "ANCA บวกไม่ได้แปลว่าเป็น vasculitis เสมอไป"],
        ix: ["H/C 3 ชุดก่อนให้ยา", "TTE แล้ว TEE", "C3, C4, ANCA, Bartonella serology ถ้า culture-negative"],
        std: "2023 Duke-ISCVID IE criteria",
        link: "rpgn"
      }),
      N("Deep abscess / complicated UTI", "nephro", {
        s: "Renal หรือ perinephric abscess, emphysematous pyelonephritis, liver abscess",
        why: "DM, stone, obstruction และ ADPKD cyst infection เป็น host ที่พบบ่อยในคลินิกไต",
        keys: ["ไข้ไม่ลงหลังให้ยา 72 ชั่วโมง", "Flank tenderness", "ADPKD: cyst infection ต้องใช้ยาที่ซึมเข้า cyst ได้"],
        ix: ["CT abdomen with contrast (ถ้า eGFR อนุญาต)", "FDG-PET/CT สำหรับ ADPKD cyst infection", "Urine และ blood culture"],
        link: "flank"
      }),
      N("Tropical: leptospirosis, melioidosis, scrub typhus", "nephro", {
        s: "ไข้เฉียบพลันถึงกึ่งเฉียบพลันกับ AKI ในพื้นที่ชนบท",
        why: "Leptospirosis ทำให้ non-oliguric hypokalemic AKI กับ pulmonary hemorrhage, melioidosis พบมากในอีสานใน DM, CKD และ thalassemia, scrub typhus ทำให้ AKI และ ATN",
        keys: ["Leptospirosis: conjunctival suffusion, calf tenderness, jaundice กับ AKI (Weil disease)", "Melioidosis: abscess หลายตำแหน่ง, pneumonia, bacteremia", "Scrub typhus: eschar, lymphadenopathy"],
        ix: ["Leptospirosis: MAT ≥ 1:400 ครั้งเดียวในพื้นที่ระบาด หรือ rise 4 เท่า, PCR ในสัปดาห์แรก", "Melioidosis: culture บน Ashdown medium จาก blood, pus, urine, throat", "Scrub typhus: IgM IFA หรือ rise 4 เท่า, PCR จาก eschar"],
        std: "WHO leptospirosis guidance, Thai Ministry of Public Health melioidosis guideline"
      }),
      N("HIV / HBV / HCV / syphilis", "nephro", {
        s: "Chronic viral infection ที่มากับ glomerular disease",
        why: "HIVAN (collapsing FSGS), HIV-ICGN, HBV-MN และ HBV-associated polyarteritis nodosa, HCV-cryoglobulinemic MPGN, secondary syphilis-MN",
        keys: ["Nephrotic proteinuria ในคนอายุน้อยที่มี risk", "Low C3/C4 กับ cryo", "ผื่นที่ฝ่ามือฝ่าเท้า"],
        ix: ["HIV Ag/Ab, HBsAg, HBV DNA, anti-HCV, HCV RNA, VDRL และ TPHA", "Cryoglobulin, RF, C4"],
        std: "KDIGO 2022 HCV in CKD guideline, KDIGO 2021 GN guideline",
        link: "viral"
      })
    ]),
    N("Non-infectious inflammatory", "step", {
      s: "Autoimmune, vasculitis และ autoinflammatory",
      keys: ["Multisystem involvement", "Active urine sediment", "Ferritin สูงมาก"]
    }, [
      N("Systemic lupus erythematosus", "nephro", {
        s: "ไข้ ผื่น ปวดข้อ serositis cytopenia",
        why: "ไข้เป็น domain หนึ่งใน classification และ LN เป็น major organ ที่กำหนดการรักษา",
        keys: ["Low C3/C4, anti-dsDNA สูง", "CRP มักปกติ ถ้าสูงมากให้หา infection หรือ serositis", "Proteinuria และ active sediment"],
        ix: ["ANA ≥ 1:80 เป็น entry criterion ของ classification (ANA บวกอย่างเดียวไม่ยืนยัน SLE)", "Anti-dsDNA, anti-Sm, C3, C4, CBC, UA, UPCR", "Kidney biopsy ถ้า UPCR ≥ 0.5 g/g, active sediment หรือ eGFR ลดโดยไม่มีสาเหตุอื่น"],
        std: "EULAR/ACR 2019 SLE classification (fever 2 คะแนน), KDIGO 2024 LN guideline",
        link: "rpgn"
      }),
      N("ANCA-associated vasculitis", "nephro", {
        s: "Constitutional symptoms นานหลายสัปดาห์ถึงเดือน ร่วมกับ ENT ปอด ไต",
        why: "MPA ในผู้สูงอายุมักมาด้วยไข้และน้ำหนักลดก่อน RPGN ชัด",
        keys: ["Sinusitis, nodules, alveolar hemorrhage", "Mononeuritis multiplex", "Dysmorphic RBC, RBC cast"],
        ix: ["MPO และ PR3-ANCA (antigen-specific ELISA), ผลลบไม่ตัด AAV", "Anti-GBM ทุกราย", "Kidney biopsy: pauci-immune crescentic GN"],
        std: "ACR/EULAR 2022 GPA, MPA, EGPA classification, KDIGO 2024 ANCA vasculitis guideline",
        link: "rpgn"
      }),
      N("Polyarteritis nodosa", "nephro", {
        s: "ไข้ ปวดกล้ามเนื้อ ปวดท้อง HTN ใหม่ ไม่มี GN",
        why: "Medium vessel vasculitis ทำให้ renal infarct และ microaneurysm บางรายสัมพันธ์กับ HBV",
        keys: ["Testicular pain, livedo, mononeuritis", "ANCA ลบ", "ไม่มี glomerulonephritis"],
        ix: ["HBsAg", "CTA หรือ conventional angiography: microaneurysm", "Biopsy เส้นประสาทหรือกล้ามเนื้อ"],
        std: "ACR 1990 PAN classification"
      }),
      N("Adult-onset Still disease", "adj", {
        s: "Quotidian spiking fever, salmon-colored evanescent rash, arthritis, sore throat",
        why: "ทำให้ AA amyloid, collapsing FSGS และ TMA ได้ และเป็น mimic สำคัญของ lymphoma และ SLE",
        keys: ["Ferritin สูงมาก มักหลายพัน", "Neutrophilic leukocytosis", "ANA และ RF ลบ"],
        ix: ["Ferritin, glycosylated ferritin < 20%", "ตัด infection และ lymphoma ก่อนเสมอ"],
        std: "Yamaguchi criteria"
      }),
      N("Sarcoidosis", "nephro", {
        s: "ไข้ต่ำๆ hilar lymphadenopathy, uveitis, hypercalcemia",
        why: "Granulomatous TIN, hypercalciuria, nephrocalcinosis จาก 1,25-(OH)2D ที่สร้างนอกไต",
        keys: ["Bilateral hilar lymphadenopathy", "PTH ถูก suppress กับ 1,25D สูง", "Erythema nodosum"],
        ix: ["Ca, 1,25-(OH)2D, 24-hour urine Ca", "CT chest", "Biopsy: non-caseating granuloma"],
        std: "ATS 2020 sarcoidosis diagnosis guideline",
        link: "hyperca"
      }),
      N("TINU syndrome", "nephro", {
        s: "ไข้ น้ำหนักลด ตาแดง กับ AIN",
        why: "Uveitis อาจมาก่อน พร้อม หรือหลัง AIN หลายเดือน",
        keys: ["Bilateral anterior uveitis", "Sterile pyuria, glycosuria, LMW proteinuria"],
        ix: ["Slit lamp examination", "Urine beta-2 microglobulin", "Kidney biopsy: AIN"],
        link: "eye"
      }),
      N("Giant cell arteritis", "adj", {
        s: "อายุ > 50 ปี ปวดศีรษะ jaw claudication ไข้",
        why: "FUO ในผู้สูงอายุ และต้องแยกจาก MPA ซึ่งพบในกลุ่มอายุเดียวกัน",
        keys: ["Temporal artery tender", "ESR สูงมาก", "Visual symptoms"],
        ix: ["Temporal artery US หรือ biopsy", "ESR, CRP"],
        std: "ACR/EULAR 2022 GCA classification"
      })
    ]),
    N("Malignancy", "step", {
      s: "Lymphoma เป็นมะเร็งที่ทำให้ FUO มากที่สุด",
      keys: ["B symptoms", "LDH สูง", "Lymphadenopathy หรือ splenomegaly"]
    }, [
      N("Lymphoma", "nephro", {
        s: "ไข้ เหงื่อออกกลางคืน น้ำหนักลด ต่อมน้ำเหลืองโต",
        why: "Hodgkin lymphoma สัมพันธ์กับ minimal change disease, NHL สัมพันธ์กับ MN, MPGN และ cryoglobulinemia ส่วน lymphomatous infiltration ทำให้ไตโตและ AKI",
        keys: ["Bilateral enlarged kidneys", "LDH สูง, hypercalcemia", "Nephrotic syndrome ที่ไม่มีสาเหตุ"],
        ix: ["FDG-PET/CT", "Excisional lymph node biopsy (FNA ไม่พอ)", "Bone marrow ตามข้อบ่งชี้"],
        std: "Lugano 2014 staging",
        link: "lymphnode"
      }),
      N("Idiopathic multicentric Castleman / TAFRO", "nephro", {
        s: "ไข้ anasarca thrombocytopenia AKI organomegaly",
        why: "TAFRO พบบ่อยในเอเชีย ทำให้ AKI แบบ MPGN-like หรือ TMA-like และเป็น DDx ของ lupus และ lymphoma",
        keys: ["Thrombocytopenia, anasarca, fever, reticulin fibrosis, organomegaly", "CRP สูง, IgG ไม่สูงมาก", "Lymph node เล็กกว่า lymphoma"],
        ix: ["Lymph node biopsy", "Bone marrow biopsy", "HHV-8 (LANA-1 stain หรือ PCR) เพื่อแยก HHV-8 associated multicentric Castleman disease"],
        std: "iMCD international consensus 2017, TAFRO criteria 2019",
        link: "lymphnode"
      }),
      N("Renal cell carcinoma", "nephro", {
        s: "ไข้ hematuria ปวดเอว ก้อน",
        why: "Paraneoplastic: fever, hypercalcemia (PTHrP), polycythemia, Stauffer syndrome และพบบ่อยขึ้นใน acquired cystic kidney disease ของผู้ป่วย dialysis",
        keys: ["Classic triad พบไม่ถึง 10%", "Dialysis vintage นาน", "ALP และ LFT ผิดปกติโดยไม่มี liver metastasis"],
        ix: ["CT หรือ MRI kidney", "Bosniak classification ถ้าเป็น cystic lesion"],
        std: "Bosniak 2019",
        link: "flank"
      }),
      N("Leukemia / other solid tumor", "adj", {
        s: "Cytopenia, blast หรือ tumor fever",
        why: "Leukemic infiltration และ tumor lysis ทำให้ AKI",
        ix: ["Peripheral smear, bone marrow", "Naproxen test มีข้อจำกัดและไม่ใช้วินิจฉัยแล้ว"]
      })
    ]),
    N("Drug, hematologic and others", "step", {
      s: "สาเหตุที่ถูกลืมบ่อยแต่มีผลต่อการรักษาทันที",
      keys: ["Timeline ของยา", "Cytopenia กับ ferritin สูง", "MAHA"]
    }, [
      N("Drug fever / DRESS / AIN", "nephro", {
        s: "ไข้หลังเริ่มยา 1-8 สัปดาห์ ± ผื่น eosinophilia AKI",
        why: "Beta-lactam, allopurinol, PPI และ anticonvulsant ทำให้ AIN และ DRESS โดย allopurinol สัมพันธ์กับ HLA-B*58:01 ที่พบบ่อยในคนไทย",
        keys: ["Classic triad fever, rash, eosinophilia พบไม่ถึง 10% ของ AIN", "Relative bradycardia", "Drug fever: ไข้ลงภายใน 72 ชั่วโมงหลังหยุดยา ส่วน DRESS ไข้และผื่นอยู่นานกว่าและ flare ได้หลังหยุดยา"],
        ix: ["CBC eosinophil, LFT, UA: sterile pyuria, WBC cast", "Urine eosinophil ไม่แนะนำแล้วเพราะ sensitivity และ specificity ต่ำ", "Kidney biopsy ยืนยัน AIN"],
        std: "RegiSCAR DRESS score",
        link: "pyuria"
      }),
      N("Hemophagocytic lymphohistiocytosis", "nephro", {
        s: "ไข้สูง cytopenia ferritin สูงมาก ตับม้ามโต",
        why: "Secondary HLH จาก infection (EBV), lymphoma, SLE (MAS) ทำให้ AKI, collapsing FSGS และ TMA",
        keys: ["Ferritin ≥ 500 ng/mL และมักสูงมาก", "Triglyceride สูง, fibrinogen ต่ำ", "LFT ผิดปกติ"],
        ix: ["HLH-2004: 5 ใน 8 ข้อ (fever, splenomegaly, cytopenia ≥ 2 lineages, TG ≥ 265 mg/dL หรือ fibrinogen ≤ 150 mg/dL, hemophagocytosis, NK activity ต่ำ, ferritin ≥ 500, sCD25 ≥ 2,400 U/mL)", "HScore > 169"],
        std: "HLH-2004 diagnostic criteria, HScore",
        link: "cytopenia"
      }),
      N("Thrombotic microangiopathy / TTP", "nephro", {
        s: "ไข้ MAHA thrombocytopenia อาการทางสมอง",
        why: "Classic pentad ครบพบน้อย ถ้ารอให้ครบจะวินิจฉัยช้า",
        keys: ["Schistocyte, LDH สูง, haptoglobin ต่ำ", "Cr มักสูงไม่มากใน TTP, สูงมากใน CM-HUS"],
        ix: ["PLASMIC score ≥ 6 risk สูง", "ADAMTS13 activity < 10% ยืนยัน TTP"],
        std: "ISTH 2020 TTP guideline",
        link: "tma"
      }),
      N("Venous thromboembolism", "adj", {
        s: "ไข้ต่ำๆ กับ DVT หรือ PE",
        why: "Nephrotic syndrome โดยเฉพาะ MN เป็น hypercoagulable state",
        ix: ["Compression US, CTPA หรือ V/Q scan"],
        link: "thrombosis"
      }),
      N("Endocrine: thyroiditis, adrenal insufficiency, pheochromocytoma", "adj", {
        s: "Subacute thyroiditis ทำให้ FUO ที่ ESR สูง",
        keys: ["Thyroid tender", "Hyponatremia, hyperkalemia ใน adrenal insufficiency"],
        ix: ["TSH, FT4, ESR", "8 am cortisol"],
        link: "hypona"
      }),
      N("Factitious / habitual hyperthermia", "adj", {
        s: "ไข้ไม่สอดคล้องกับ pulse และ clinical",
        keys: ["Temperature-pulse dissociation", "ไม่มี inflammatory marker สูง"],
        ix: ["วัดอุณหภูมิต่อหน้าผู้ตรวจ"]
      })
    ])
  ])
};

/* ===================== DYSPNEA / PLEURAL EFFUSION ===================== */
TREES.dyspnea = {
  must: [
    "Onset: acute (ชั่วโมง), subacute (วัน), chronic (สัปดาห์ถึงเดือน), เป็นซ้ำหรือไม่",
    "Orthopnea, PND, ขาบวม, ปัสสาวะออกน้อยลง, ฟองในปัสสาวะ",
    "เจ็บหน้าอก, ไอเป็นเลือด, ไข้, ไซนัส, ผื่น",
    "HD: ขาดฟอก, IDWG, dry weight, ตำแหน่งและ flow ของ AVF",
    "PD: ปริมาณ UF ต่อวัน, น้ำยาขุ่น, เริ่มเหนื่อยหลังเริ่ม PD กี่สัปดาห์, น้ำในช่องอกด้านไหน",
    "KT: IS ที่ใช้, PJP prophylaxis, mTOR inhibitor",
    "ยา: NSAID, TZD, steroid, CCB, mTOR inhibitor, nitrofurantoin, amiodarone",
    "Risk VTE: nephrotic, MN, immobilization, มะเร็ง"
  ],
  tree: N("Dyspnea / pleural effusion", "root", {
    s: "แยก volume หรือ cardiogenic, pulmonary-renal, pleural, parenchymal, pulmonary vascular และ non-cardiopulmonary",
    why: "ในผู้ป่วยไต dyspnea มักมีหลายกลไกซ้อนกัน เช่น volume overload, anemia และ acidosis จึงต้องแยกเป็นระบบและไม่หยุดที่ fluid overload",
    keys: ["SpO2, RR, JVP", "Crepitations vs wheeze vs ลด breath sound", "S3, murmur, pericardial rub, pulsus paradoxus", "Urine sediment: active หรือไม่"],
    ix: ["CXR, ECG, ABG หรือ VBG", "NT-proBNP: acute rule-out < 300 pg/mL, rule-in ตามอายุ 450/900/1,800 และสูงขึ้นใน eGFR < 60", "Troponin, CBC", "Lung US (B-lines), echocardiography", "UA with microscopy, UPCR"],
    std: "ESC 2021 HF guideline (2023 focused update), Light criteria"
  }, [
    N("Volume overload / cardiogenic", "step", {
      s: "JVP สูง, B-lines, edema",
      keys: ["Kidney salt retention vs cardiac pump failure", "ความเร็วของ onset", "BP ขณะเหนื่อย"]
    }, [
      N("Kidney salt and water retention", "nephro", {
        s: "Nephrotic, nephritic, AKI oliguric, advanced CKD",
        why: "Nephritic มี HTN กับ edema เพราะ primary Na retention ส่วน nephrotic มี overfill เป็นส่วนใหญ่",
        keys: ["Nephritic: HTN, hematuria, RBC cast", "Nephrotic: UPCR > 3.5 g/g, albumin < 3.0 g/dL", "Oliguria"],
        ix: ["UA, UPCR, Cr, albumin"],
        link: "nephrotic"
      }),
      N("Flash pulmonary edema from renovascular disease", "nephro", {
        s: "เหนื่อยเฉียบพลันซ้ำๆ BP สูงมาก LVEF ปกติ (Pickering syndrome)",
        why: "Bilateral RAS หรือ RAS ในไตข้างเดียวที่เหลือ เป็นข้อบ่งชี้ revascularization ที่ยังได้รับการยอมรับหลัง ASTRAL และ CORAL",
        keys: ["Cr ขึ้น > 30% หลังเริ่ม ACEi หรือ ARB", "ไตสองข้างขนาดต่างกัน > 1.5 cm", "Abdominal bruit, atherosclerosis หลายตำแหน่ง"],
        ix: ["Renal duplex: PSV > 200 cm/s และ renal-aortic ratio > 3.5 บ่งชี้ stenosis > 60%", "CTA หรือ MRA (ระวัง contrast และ gadolinium ตาม eGFR)"],
        std: "ASTRAL (n = 806) ไม่พบประโยชน์ต่อ kidney function, CORAL (n = 947) primary endpoint HR 0.94 (95% CI 0.76-1.17), AHA 2022 scientific statement on renovascular disease",
        link: "kidneysize"
      }),
      N("Hypertensive emergency", "nephro", {
        s: "BP สูงมากกับ acute pulmonary edema",
        why: "Scleroderma renal crisis, TMA, pheochromocytoma และ primary aldosteronism ต้องอยู่ใน DDx",
        keys: ["Retinopathy grade III-IV", "MAHA", "Skin thickening"],
        ix: ["Fundoscopy, smear, LDH, UA"],
        std: "ESH 2023 hypertension guideline",
        link: "htn-emerg"
      }),
      N("Heart failure / cardiorenal syndrome", "adj", {
        s: "HFrEF หรือ HFpEF ที่ทำให้ Cr สูง",
        why: "Cardiorenal type 1 และ 2 เป็น DDx สำคัญของ AKI กับ CKD และต้องแยก venous congestion ออกจาก low output",
        keys: ["S3, cardiomegaly", "Cr ขึ้นเมื่อ congestion มากขึ้น ดีขึ้นเมื่อ decongest", "ถ้า Cr ขึ้นเล็กน้อยระหว่าง decongest ที่ได้ผล ไม่ต้องหยุด diuretic"],
        ix: ["Echocardiography, NT-proBNP", "HFA-PEFF หรือ H2FPEF score สำหรับ HFpEF", "VExUS ประเมิน venous congestion"],
        std: "ESC 2021 HF guideline, ADQI cardiorenal classification"
      }),
      N("Cardiac amyloidosis", "nephro", {
        s: "HFpEF กับ low voltage ECG แต่ echo LV หนา",
        why: "AL amyloid ทำให้ nephrotic syndrome กับ HF พร้อมกัน และ ATTR พบในผู้สูงอายุ",
        keys: ["Low voltage ECG ไม่สัมพันธ์กับ LV wall thickness", "Apical sparing ใน strain imaging", "NT-proBNP และ troponin สูงเกินสัดส่วน", "Carpal tunnel, macroglossia, orthostatic hypotension"],
        ix: ["sFLC, SPEP และ serum/urine IFE ก่อนเสมอ", "Tc-99m PYP หรือ DPD scan ใช้วินิจฉัย ATTR เฉพาะเมื่อไม่มี monoclonal protein (Perugini grade 2-3)", "Fat pad หรือ kidney biopsy, Congo red apple-green birefringence"],
        std: "Mayo 2012 AL staging, ESC 2021 position statement on cardiac amyloidosis",
        link: "mspike"
      }),
      N("Dialysis-related: under-dialysis, high-flow AVF", "nephro", {
        s: "Volume overload ใน HD จาก IDWG สูง หรือ high-output HF จาก AVF",
        why: "Upper arm AVF ที่ flow สูงทำให้ high-output HF และ pulmonary hypertension",
        keys: ["IDWG > 4-4.5% ของ dry weight", "AVF thrill แรงมาก", "Nicoladoni-Branham sign: HR ลดเมื่อกด AVF"],
        ix: ["Access flow (Qa) > 1.5-2.0 L/min หรือ Qa/CO > 30%", "Echocardiography: cardiac index สูง"],
        std: "KDOQI 2019 vascular access guideline, KDOQI 2015 HD adequacy",
        link: "hd-access"
      }),
      N("Pericardial effusion / tamponade", "nephro", {
        s: "เหนื่อย นอนราบไม่ได้ BP ตกระหว่างฟอก",
        why: "Uremic pericarditis (ก่อนเริ่มฟอก) และ dialysis-associated pericarditis (ฟอกไม่พอ) และ lupus serositis",
        keys: ["Pericardial rub", "Pulsus paradoxus > 10 mmHg", "Uremic pericarditis มักไม่มี ST elevation แบบ diffuse เพราะการอักเสบไม่ลุกลามถึง myocardium ชั้น subepicardial ดังนั้น ECG ปกติไม่ตัด pericarditis"],
        ix: ["Echocardiography: RA และ RV diastolic collapse", "BUN"],
        std: "ESC 2025 myocarditis and pericarditis guideline",
        link: "chestpain"
      }),
      N("Valvular disease", "adj", {
        s: "Calcific AS หรือ MR",
        why: "CKD-MBD เร่ง valvular calcification ให้ AS เป็นเร็วกว่าคนทั่วไป",
        ix: ["Echocardiography"],
        std: "ESC/EACTS 2025 valvular heart disease guideline"
      })
    ]),
    N("Pulmonary-renal syndrome / DAH", "step", {
      s: "Alveolar hemorrhage ร่วมกับ GN",
      why: "Emergency ที่ต้องทำ ANCA และ anti-GBM ทันทีและพิจารณา PLEX",
      keys: ["Hemoptysis ไม่มีได้ถึง 1 ใน 3", "Hb ลดเร็วโดยไม่มี bleeding ที่อื่น", "Bilateral infiltrate กับ active sediment"]
    }, [
      N("ANCA vasculitis with DAH", "nephro", {
        s: "Hemoptysis, hypoxemia, RPGN",
        keys: ["ENT involvement ใน GPA", "MPO-ANCA สัมพันธ์กับ ILD"],
        ix: ["MPO และ PR3-ANCA", "BAL: progressively bloody return, hemosiderin-laden macrophage > 20%", "DLCO สูงขึ้นถ้าตรวจได้"],
        std: "ACR/EULAR 2022 classification, KDIGO 2024 ANCA vasculitis guideline",
        link: "hemoptysis"
      }),
      N("Anti-GBM disease", "nephro", {
        s: "ชายอายุน้อย สูบบุหรี่ หรือผู้สูงอายุ RPGN รุนแรง",
        why: "ราว 1 ใน 3 ของ anti-GBM มี MPO-ANCA ร่วม (double positive) ซึ่ง relapse ได้แบบ ANCA",
        keys: ["Linear IgG บน GBM", "สูบบุหรี่และ inhaled hydrocarbon เพิ่ม DAH"],
        ix: ["Anti-GBM antibody, ANCA", "Kidney biopsy (circulating anti-GBM ลบได้ส่วนน้อย ถ้าสงสัยสูงให้ยืนยันด้วย linear IgG ใน biopsy)"],
        std: "KDIGO 2021 GN guideline (anti-GBM)",
        link: "rpgn"
      }),
      N("SLE / APS / TMA", "nephro", {
        s: "DAH, acute lupus pneumonitis, shrinking lung, pulmonary embolism",
        keys: ["Low C3/C4", "aPL บวก", "MAHA"],
        ix: ["Anti-dsDNA, C3, C4, aPL, smear"],
        std: "EULAR/ACR 2019 SLE, 2023 ACR/EULAR APS classification",
        link: "tma"
      }),
      N("Leptospirosis pulmonary hemorrhage", "nephro", {
        s: "ไข้ jaundice AKI hemoptysis",
        why: "Pulmonary-renal syndrome จากการติดเชื้อที่สำคัญในประเทศไทย ต้องแยกจาก vasculitis ก่อนให้ immunosuppression",
        keys: ["Exposure น้ำท่วม ทำนา", "Hypokalemia, non-oliguric AKI", "Thrombocytopenia"],
        ix: ["MAT, leptospira PCR"],
        std: "WHO leptospirosis guidance"
      })
    ]),
    N("Pleural effusion", "step", {
      s: "เจาะ pleural fluid แยก transudate กับ exudate ด้วย Light criteria ยกเว้น bilateral effusion ที่ clinical ชัดว่าเป็น transudate ซึ่งรักษาก่อนได้ และเจาะเมื่อมี atypical feature หรือไม่ตอบสนอง",
      keys: ["Exudate ถ้ามีข้อใดข้อหนึ่ง: pleural/serum protein > 0.5, pleural/serum LDH > 0.6, pleural LDH > 2/3 ของ upper limit of normal ของ serum LDH", "หลังให้ diuretic ถ้าเข้าเกณฑ์ exudate แต่ serum-pleural albumin gradient > 1.2 g/dL ให้ถือเป็น transudate"],
      std: "Light criteria, BTS 2023 pleural disease guideline"
    }, [
      N("PD pleuroperitoneal leak (hydrothorax)", "nephro", {
        s: "Right-sided effusion หลังเริ่ม PD ไม่นาน UF ลดลง",
        why: "Diaphragmatic defect ทำให้น้ำยาผ่านเข้าช่องอก มักเกิดในช่วงเดือนแรกและพบด้านขวาเป็นส่วนใหญ่",
        keys: ["Effusion ข้างเดียวด้านขวา", "UF ลดลงทันที", "อาการดีขึ้นเมื่อหยุด PD หรือ dwell ท่านั่ง"],
        ix: ["Pleural fluid glucose สูงมาก (pleural-serum glucose gradient > 50 mg/dL)", "Protein < 1 g/dL, LDH ต่ำ", "Peritoneal scintigraphy หรือ CT peritoneography"],
        std: "ISPD recommendations on non-infectious complications",
        link: "pd-dyspnea"
      }),
      N("Transudate: nephrotic, CKD overload, HF, cirrhosis", "nephro", {
        s: "Bilateral effusion กับ edema",
        keys: ["Albumin ต่ำ", "JVP สูง", "Ascites"],
        ix: ["Pleural protein, LDH, albumin gradient"],
        link: "nephrotic"
      }),
      N("Uremic pleuritis", "nephro", {
        s: "Exudative, fibrinous หรือ hemorrhagic effusion ในคนที่ฟอกไม่พอ",
        why: "เป็น diagnosis of exclusion ต้องตัด TB และ infection ก่อน",
        keys: ["มี uremic pericarditis ร่วมได้", "ดีขึ้นเมื่อเพิ่ม dialysis"],
        ix: ["Pleural fluid lymphocyte หรือ PMN, culture, ADA"]
      }),
      N("Lupus or rheumatoid pleuritis", "nephro", {
        s: "Exudate ร่วมกับ serositis อื่น",
        keys: ["Lupus: glucose ปกติหรือต่ำเล็กน้อย", "RA: glucose < 60 mg/dL, pH ต่ำ, LDH สูงมาก"],
        ix: ["Pleural glucose, pH, LDH", "Serum ANA, anti-dsDNA, C3, C4"],
        link: "rpgn"
      }),
      N("Tuberculous pleuritis", "adj", {
        s: "Lymphocytic exudate ไข้ต่ำๆ",
        why: "CKD และ HD เสี่ยง TB และ TB pleuritis เลียนแบบ uremic pleuritis ได้",
        keys: ["Lymphocyte > 50%", "Mesothelial cell น้อย"],
        ix: ["ADA > 40 U/L", "Pleural biopsy: granuloma และ culture"],
        std: "WHO consolidated TB guidelines"
      }),
      N("Parapneumonic effusion / empyema", "adj", {
        s: "ไข้ pneumonia กับ effusion",
        keys: ["pH < 7.2 หรือ glucose < 60 mg/dL หรือ frank pus ต้อง drain"],
        ix: ["Pleural pH, glucose, Gram stain, culture"],
        std: "BTS 2023 pleural disease guideline"
      }),
      N("Malignant effusion / chylothorax", "adj", {
        s: "Recurrent exudate, ก้อน, น้ำหนักลด",
        why: "Sirolimus และ everolimus ใน KT ทำให้ effusion และ lymphocele ได้",
        keys: ["Chylothorax: TG > 110 mg/dL"],
        ix: ["Cytology (sensitivity ราว 60% ต่อครั้ง)", "Pleural TG, CT chest"]
      })
    ]),
    N("Parenchymal / infection", "step", {
      s: "Infiltrate บน CXR หรือ CT",
      keys: ["Host immunosuppressed หรือไม่", "Granuloma และ nodule", "Drug-related pneumonitis"]
    }, [
      N("Opportunistic pneumonia in KT or immunosuppressed GN", "nephro", {
        s: "PJP, CMV, TB, fungal ใน KT และผู้ป่วยที่ได้ cyclophosphamide หรือ rituximab",
        why: "PJP มักมาด้วย exertional desaturation ที่ CXR ดูไม่รุนแรง",
        keys: ["PJP: hypoxemia ไม่สัมพันธ์กับ CXR, LDH สูง", "CMV: ไข้ leukopenia LFT ผิดปกติ", "เวลาหลัง KT และ prophylaxis ที่ได้"],
        ix: ["HRCT: bilateral ground-glass", "Beta-D-glucan, BAL PJP PCR และ IF", "CMV QNAT, BAL", "Sputum AFB และ Xpert"],
        std: "AST IDCOP 2019 (PJP prophylaxis 6-12 เดือนหลัง KT), KDIGO 2009 KT recipient care",
        link: "kt-fever"
      }),
      N("Drug-induced pneumonitis", "nephro", {
        s: "Infiltrate ใหม่หลังเริ่มยา",
        why: "mTOR inhibitor ใน KT, cyclophosphamide, rituximab, nitrofurantoin และ amiodarone",
        keys: ["ไม่มีเชื้อก่อโรค", "ดีขึ้นเมื่อหยุดยา"],
        ix: ["HRCT", "BAL เพื่อตัด infection"]
      }),
      N("Interstitial lung disease with kidney involvement", "nephro", {
        s: "Chronic dyspnea, velcro crackles",
        why: "SSc (เสี่ยง scleroderma renal crisis), anti-synthetase syndrome และ MPO-ANCA ที่มาด้วย UIP ก่อน GN",
        keys: ["Raynaud, skin thickening", "Mechanic hands", "ANCA ในผู้ป่วย IPF"],
        ix: ["HRCT, PFT with DLCO", "ANA, anti-Scl-70, anti-RNA polymerase III, myositis panel, MPO-ANCA"],
        std: "ATS/ERS/JRS/ALAT 2022 IPF guideline, ACR/EULAR 2013 SSc classification",
        link: "skinthick"
      }),
      N("Granulomatous: GPA nodules, sarcoidosis", "nephro", {
        s: "Nodule หรือ cavity หรือ hilar node",
        keys: ["GPA: cavitating nodules กับ ENT", "Sarcoid: hilar node กับ hypercalcemia"],
        ix: ["CT chest, PR3-ANCA, ACE, Ca", "Biopsy"],
        link: "cough"
      }),
      N("Community-acquired pneumonia", "adj", {
        s: "ไข้ ไอ sputum consolidation",
        why: "Pneumonia ทำให้ prerenal AKI, ATN และ Legionella ทำให้ hyponatremia กับ AKI",
        ix: ["Sputum, blood culture, urine antigen"],
        std: "ATS/IDSA 2019 CAP guideline"
      })
    ]),
    N("Pulmonary vascular", "step", {
      s: "Lung field ปกติแต่ hypoxemia",
      keys: ["Pleuritic chest pain, tachycardia", "RV strain", "Risk VTE"]
    }, [
      N("Pulmonary embolism / renal vein thrombosis", "adj", {
        s: "เหนื่อยเฉียบพลัน tachycardia hypoxemia",
        why: "MN มี VTE risk สูงสุดในกลุ่ม nephrotic โดย risk เพิ่มชัดเมื่อ albumin < 2.8 g/dL (KDIGO 2021 พิจารณา prophylactic anticoagulation เมื่อ < 2.5 g/dL ด้วย BCG หรือ < 2.0 ด้วย BCP) และ RVT ทำให้ PE ได้",
        keys: ["Flank pain, hematuria, Cr ขึ้นใน RVT", "Unilateral leg swelling"],
        ix: ["Wells หรือ revised Geneva score", "CTPA หรือ V/Q scan ถ้าต้องเลี่ยง contrast", "D-dimer มักสูงอยู่แล้วใน CKD และ nephrotic (specificity ต่ำ) ผลบวกจึงไม่ช่วย ส่วนผลลบเมื่อ pretest ต่ำยังใช้ตัด PE ได้"],
        std: "ESC 2019 acute PE guideline, KDIGO 2021 GN guideline (anticoagulation ใน MN)",
        link: "thrombosis"
      }),
      N("Pulmonary HT in kidney failure and dialysis", "nephro", {
        s: "Chronic exertional dyspnea, RV failure",
        why: "Volume, high-flow AVF, LV disease, sleep apnea และ vascular calcification",
        keys: ["Loud P2, RV heave", "Edema ที่ไม่ดีขึ้นหลังลด dry weight"],
        ix: ["Echo: TR velocity > 2.8 m/s", "RHC: mPAP > 20 mmHg"],
        std: "ESC/ERS 2022 pulmonary hypertension guideline"
      })
    ]),
    N("Non-cardiopulmonary", "step", {
      s: "Lung และหัวใจปกติแต่ยังเหนื่อย",
      keys: ["Kussmaul breathing", "Pallor", "Respiratory muscle weakness"]
    }, [
      N("Metabolic acidosis", "nephro", {
        s: "Kussmaul breathing",
        why: "Uremic acidosis, DKA, toxic alcohol, lactic acidosis (รวม metformin-associated) และ dRTA",
        keys: ["Deep, rapid breathing โดย lung clear"],
        ix: ["VBG, anion gap, osmolal gap, lactate, ketone"],
        link: "agma"
      }),
      N("Anemia", "nephro", {
        s: "Exertional dyspnea, pallor",
        why: "CKD anemia, MAHA และ GI bleeding จาก angiodysplasia",
        ix: ["CBC, reticulocyte, iron studies, smear"],
        std: "KDIGO 2026 anemia in CKD guideline",
        link: "cytopenia"
      }),
      N("Respiratory muscle weakness", "nephro", {
        s: "Shallow breathing, paradoxical abdomen",
        why: "Severe hypokalemia, hypophosphatemia และ hypermagnesemia (hyporeflexia เมื่อ Mg > 4.8 mg/dL, DTR หายเมื่อเข้าใกล้ 12 mg/dL ร่วม respiratory depression)",
        keys: ["DTR", "Proximal weakness"],
        ix: ["K, PO4, Mg, CK", "Vital capacity"],
        link: "weakness"
      }),
      N("Thyrotoxicosis / deconditioning / anxiety", "adj", {
        s: "Dyspnea ที่ไม่มี objective finding",
        ix: ["TSH", "Exercise test ถ้ายังไม่ชัด"]
      })
    ])
  ])
};

/* ===================== BONE PAIN / FRACTURE ===================== */
TREES.bonepain = {
  must: [
    "Focal หรือ diffuse, ปวดกลางคืน, ปวดเมื่อลงน้ำหนัก",
    "Fracture จาก minimal trauma, ส่วนสูงลดลง",
    "Proximal weakness, waddling gait, ลุกจากเก้าอี้ลำบาก",
    "ยา: tenofovir (TDF), adefovir, ifosfamide, valproate, aminoglycoside, ferric carboxymaltose, steroid, PPI, anticonvulsant, lithium, aluminum binder",
    "CKD stage, dialysis vintage, ประวัติ parathyroidectomy, KT และ steroid ที่ได้",
    "Childhood rickets, short stature, family history, ปัญหาฟัน",
    "Malabsorption, bariatric surgery, ไม่โดนแดด",
    "ก้อนที่ใดก็ได้ (TIO), anemia, ปัสสาวะเป็นฟอง (myeloma)"
  ],
  tree: N("Bone pain / fracture", "root", {
    s: "แยก focal กับ diffuse แล้วใช้ pattern ของ Ca, PO4, ALP, PTH และ 25-OH D จัดกลุ่ม",
    why: "ปวดกระดูกเป็นทางเข้าของ tubulopathy (Fanconi), TIO, PHPT, CKD-MBD และ myeloma ซึ่งเป็นหัวข้อหลักของ nephro board",
    keys: ["PO4 ต่ำ + ALP สูง: osteomalacia", "Ca สูง + PTH สูง: PHPT", "ALP ปกติ + lytic lesion: myeloma", "ALP ต่ำ: hypophosphatasia หรือ adynamic bone"],
    ix: ["Ca (albumin-corrected หรือ ionized), PO4, Mg, ALP และ bone-specific ALP", "iPTH, 25-OH D, 1,25-(OH)2D", "Cr, venous HCO3, UA (glucose, protein)", "TmP/GFR หรือ FEPO4, urine Ca", "SPEP, sFLC", "X-ray ตำแหน่งที่ปวด, bone scan, MRI, DXA"],
    std: "KDIGO 2017 CKD-MBD guideline update"
  }, [
    N("Hypophosphatemic osteomalacia (renal PO4 wasting)", "step", {
      s: "PO4 ต่ำ, ALP สูง, TmP/GFR ต่ำ",
      why: "เมื่อ PO4 ต่ำ ไตควรเก็บ PO4 จน FEPO4 < 5% ถ้าสูงกว่านี้คือ renal wasting จากนั้นแยกด้วย FGF23",
      keys: ["FEPO4 > 5% ขณะ hypophosphatemia", "TmP/GFR ต่ำกว่าค่าปกติ (ราว 2.5-4.2 mg/dL ในผู้ใหญ่)", "Intact FGF23 > 30 pg/mL ขณะ PO4 ต่ำ ถือว่า inappropriately high"],
      ix: ["Fasting serum และ urine PO4, Cr", "Intact FGF23, 1,25-(OH)2D"],
      std: "Endocrine Society approach to hypophosphatemia"
    }, [
      N("Tumor-induced osteomalacia", "adj", {
        s: "ปวดกระดูกทั่วตัว proximal weakness fracture หลายตำแหน่งในผู้ใหญ่ที่ไม่มีประวัติตอนเด็ก",
        why: "Phosphaturic mesenchymal tumor หลั่ง FGF23 ออกข้อสอบบ่อยเพราะมาด้วยอ่อนแรงและ hypophosphatemia",
        keys: ["FGF23 สูง, 1,25D ต่ำหรือปกติต่ำ", "ไม่มี glycosuria หรือ aminoaciduria", "Tumor เล็กมาก อยู่ในกระดูกหรือ soft tissue"],
        ix: ["68Ga-DOTATATE PET/CT", "Selective venous sampling FGF23 ถ้าพบหลายจุด"],
        std: "Global TIO guidance (Jan de Beur, J Intern Med 2023), burosumab ถ้าผ่าตัดไม่ได้",
        link: "phos"
      }),
      N("Fanconi syndrome", "nephro", {
        s: "Hypophosphatemia, glycosuria ทั้งที่ glucose ปกติ, aminoaciduria, LMW proteinuria, NAGMA",
        why: "Tenofovir (TDF), light-chain proximal tubulopathy (มักเป็น kappa), ifosfamide, Wilson disease, cystinosis และ heavy metal",
        keys: ["Urine glucose บวกขณะ blood glucose ปกติ", "Hypouricemia กับ FEUA สูง", "Hypokalemia, pRTA"],
        ix: ["UA glucose, urine amino acid, urine beta-2 microglobulin", "FEPO4, FEUA", "sFLC และ IFE เพื่อหา LCPT", "Kidney biopsy ถ้าสงสัย LCPT"],
        std: "IMWG และ IKMG 2019 MGRS consensus (LCPT)",
        link: "nagma"
      }),
      N("Inherited FGF23-mediated (XLH, ADHR)", "adj", {
        s: "Rickets ตั้งแต่เด็ก short stature ขาโก่ง ฟันเป็น abscess enthesopathy",
        why: "XLH จาก PHEX mutation เป็น DDx ของ TIO และทำให้ nephrocalcinosis จากการรักษาด้วย phosphate กับ calcitriol",
        keys: ["Family history", "อาการตั้งแต่เด็ก"],
        ix: ["FGF23, genetic testing (PHEX, FGF23, DMP1)"],
        link: "shortstature"
      }),
      N("Iron infusion-induced hypophosphatemia", "adj", {
        s: "PO4 ต่ำหลังได้ ferric carboxymaltose",
        why: "FCM เพิ่ม intact FGF23 ใน PHOSPHARE-IDA พบ hypophosphatemia 74.4% กับ FCM เทียบ 8.0% กับ ferric derisomaltose และให้ซ้ำทำให้ osteomalacia",
        keys: ["ได้ FCM ซ้ำหลายครั้ง", "เกิดใน 1-2 สัปดาห์หลังให้"],
        ix: ["PO4 ก่อนและหลังให้ยา, FGF23"],
        std: "PHOSPHARE-IDA trials (JAMA 2020)"
      })
    ]),
    N("Vitamin D or calcium-deficient osteomalacia", "step", {
      s: "Ca ต่ำหรือปกติ, PO4 ต่ำ, PTH สูง, 25-OH D ต่ำ",
      keys: ["Secondary hyperparathyroidism ทำให้ PO4 ต่ำ", "Urine Ca ต่ำ", "Looser zone (pseudofracture)"]
    }, [
      N("Nutritional deficiency / malabsorption", "adj", {
        s: "ไม่โดนแดด, celiac, bariatric surgery, chronic pancreatitis, cholestasis",
        why: "Malabsorption เดียวกันทำให้ enteric hyperoxaluria และ oxalate nephropathy",
        keys: ["25-OH D มักต่ำกว่า 10-12 ng/mL", "Steatorrhea, น้ำหนักลด"],
        ix: ["25-OH D, PTH, Ca, urine Ca", "Celiac serology, fecal fat ตามข้อบ่งชี้", "24-hour urine oxalate"],
        std: "Global consensus 2016 on nutritional rickets (deficiency < 12 ng/mL)",
        link: "diarrhea"
      }),
      N("Nephrotic urinary loss of vitamin D binding protein", "nephro", {
        s: "25-OH D ต่ำใน nephrotic syndrome นาน",
        why: "Vitamin D binding protein หลุดทางปัสสาวะ ร่วมกับ steroid ทำให้กระดูกบาง",
        keys: ["Proteinuria หนักและนาน", "ได้ steroid", "Total 25-OH D ต่ำจากการเสีย binding protein โดย free 25-OH D อาจปกติ จึงดู Ca, PTH และ ALP ประกอบก่อนสรุปว่าขาดจริง"],
        ix: ["25-OH D, UPCR"],
        link: "nephrotic"
      }),
      N("Distal RTA", "nephro", {
        s: "Osteomalacia กับ nephrocalcinosis, stone, hypokalemia",
        why: "กลไกคือ chronic acidosis ดึง Ca จากกระดูกและเพิ่ม hypercalciuria ไม่ได้เกิดจากขาด vitamin D (25-OH D มักปกติ) พบใน Sjogren, SLE และ inherited dRTA",
        keys: ["NAGMA กับ urine pH > 5.5", "Positive urine anion gap", "Hypocitraturia"],
        ix: ["VBG, urine pH, urine anion gap หรือ osmolal gap", "Urine citrate, Ca", "Anti-Ro, anti-La"],
        std: "Expert consensus on dRTA diagnosis (Trepiccione 2021)",
        link: "nagma"
      }),
      N("Drug-induced: anticonvulsant", "adj", {
        s: "Phenytoin, phenobarbital, carbamazepine เร่ง vitamin D catabolism",
        ix: ["25-OH D"]
      })
    ]),
    N("Parathyroid and CKD-MBD", "step", {
      s: "ใช้ PTH, Ca, ALP และ dialysis history แยก turnover",
      keys: ["Ca สูง + PTH สูง ก่อน CKD: PHPT", "CKD G4-5D + PTH สูงมาก: high turnover", "PTH < 2 เท่า ULN + ALP ต่ำ: low turnover"],
      std: "KDIGO 2017 CKD-MBD (TMV classification)"
    }, [
      N("Primary hyperparathyroidism", "nephro", {
        s: "Hypercalcemia, stone, nephrocalcinosis, osteitis fibrosa cystica, brown tumor",
        why: "Kidney involvement เป็นข้อบ่งชี้ผ่าตัด",
        keys: ["Ca สูงกับ PTH สูงหรือปกติที่ไม่ถูก suppress", "Salt-and-pepper skull, subperiosteal resorption ที่ phalanx", "แยก FHH ด้วย urine Ca/Cr clearance ratio: < 0.01 ชี้ไปทาง FHH, > 0.02 ชี้ไปทาง PHPT (แปลผลไม่ได้เมื่อ vitamin D ต่ำหรือ eGFR ต่ำ)"],
        ix: ["Ca, PTH, 25-OH D, 24-hour urine Ca", "Neck US และ sestamibi หรือ 4D-CT เพื่อ localize (ไม่ใช้ในการวินิจฉัย)", "DXA รวม distal radius, imaging หา stone"],
        std: "Fifth International Workshop 2022 PHPT: ผ่าตัดเมื่อ Ca > 1 mg/dL เหนือ ULN, eGFR < 60, stone หรือ nephrocalcinosis, urine Ca > 250 mg/วัน (หญิง) หรือ > 300 (ชาย), T-score ≤ -2.5 หรือ fracture, อายุ < 50 ปี",
        link: "hyperca"
      }),
      N("Secondary / tertiary hyperparathyroidism (high-turnover ROD)", "nephro", {
        s: "ปวดกระดูก fracture brown tumor ใน CKD G4-5D หรือหลัง KT",
        why: "Tertiary HPT หลัง KT ทำให้ hypercalcemia กับ hypophosphatemia และ graft calcification",
        keys: ["PTH สูงมากต่อเนื่อง", "ALP และ bone-specific ALP สูง", "Ca สูงขึ้นเองใน tertiary HPT"],
        ix: ["iPTH trend (target 2-9 เท่า ULN ใน G5D), ALP, Ca, PO4", "Bone biopsy ถ้าผลจะเปลี่ยนการรักษา"],
        std: "KDIGO 2017 CKD-MBD",
        link: "hd-mbd"
      }),
      N("Adynamic bone disease", "nephro", {
        s: "Fracture ง่ายทั้งที่ PTH ต่ำ",
        why: "Over-suppression ด้วย calcitriol หรือ Ca-based binder, หลัง parathyroidectomy, DM, PD, ผู้สูงอายุ",
        keys: ["PTH < 2 เท่า ULN", "ALP ต่ำหรือปกติ", "Hypercalcemia เมื่อได้ Ca เพราะกระดูกไม่รับ Ca"],
        ix: ["PTH, bone-specific ALP", "Bone biopsy with tetracycline double labeling"],
        std: "KDIGO 2017 CKD-MBD",
        link: "hd-mbd"
      }),
      N("Aluminum bone disease", "nephro", {
        s: "Osteomalacia, microcytic anemia, encephalopathy ใน dialysis",
        why: "Aluminum binder หรือน้ำที่ใช้ฟอกปนเปื้อน เกี่ยวข้องกับมาตรฐานคุณภาพน้ำ dialysis",
        keys: ["Microcytic anemia ที่ iron ปกติ", "Dialysis dementia"],
        ix: ["Serum aluminum", "DFO test", "Bone biopsy: aluminum stain"],
        std: "KDOQI 2003 bone metabolism guideline, ISO 23500 dialysis water quality"
      }),
      N("Dialysis-related (beta-2 microglobulin) amyloidosis", "nephro", {
        s: "ปวดไหล่ carpal tunnel bone cyst ใน dialysis vintage นาน",
        why: "Beta-2 microglobulin สะสมเมื่อ clearance ต่ำ ลดลงด้วย high-flux หรือ HDF และหลัง KT",
        keys: ["Vintage > 5-10 ปี", "Bilateral carpal tunnel", "Destructive spondyloarthropathy, pathologic fracture ที่ femoral neck"],
        ix: ["X-ray: subchondral bone cyst", "Biopsy: Congo red, beta-2 microglobulin immunostain"],
        link: "hd-mbd"
      }),
      N("Post-transplant bone disease / osteonecrosis", "nephro", {
        s: "ปวดสะโพกหรือเข่าในปีแรกหลัง KT",
        why: "Steroid, persistent HPT และ CNI ทำให้ bone loss เร็วในปีแรกและเกิด avascular necrosis ที่ femoral head",
        keys: ["ปวดขาหนีบขณะลงน้ำหนัก", "ได้ pulse steroid สำหรับ rejection"],
        ix: ["MRI hip (ไวกว่า X-ray ในระยะแรก)", "DXA เมื่อมี risk factor ของ osteoporosis และผลจะเปลี่ยนการรักษา (KDIGO 2017 ไม่กำหนดช่วง 3 เดือนแรกแบบฉบับ 2009 แล้ว)"],
        std: "KDIGO 2017 CKD-MBD (post-KT bone section)",
        link: "kt-late"
      }),
      N("Primary hyperoxaluria / oxalate osteopathy", "nephro", {
        s: "Bone pain, refractory anemia, recurrent stone ใน dialysis หรือหลัง KT ที่ graft fail เร็ว",
        why: "Systemic oxalosis เมื่อ GFR ต่ำ ทำให้ oxalate สะสมในกระดูกและ graft",
        keys: ["Nephrocalcinosis และ stone ตั้งแต่อายุน้อย", "ESA-resistant anemia", "Recurrence หลัง KT"],
        ix: ["Plasma oxalate: เกิน supersaturation threshold ราว 30-45 µmol/L เสี่ยง systemic oxalosis แต่ผู้ป่วย dialysis ที่ไม่ใช่ PH ก็สูงได้ จึงใช้ค่านี้วินิจฉัย PH ไม่ได้", "Genetic testing AGXT, GRHPR, HOGA1", "Bone หรือ kidney biopsy: oxalate crystal"],
        std: "OxalEurope และ ERKNet 2023 PH1 guideline"
      })
    ]),
    N("Lytic or infiltrative lesion", "step", {
      s: "Focal pain, lesion บน imaging",
      keys: ["ALP ปกติ + lytic: myeloma", "ALP สูง + blastic: prostate, Paget", "Hypercalcemia กับ PTH ต่ำ"]
    }, [
      N("Multiple myeloma", "nephro", {
        s: "ปวดหลังหรือซี่โครง anemia Cr สูง hypercalcemia",
        why: "Cast nephropathy, LCDD, AL amyloid, LCPT และ hypercalcemic AKI",
        keys: ["Bone scan มักลบเพราะไม่มี osteoblastic activity", "Dipstick protein ลบแต่ UPCR สูง", "Anion gap ต่ำ, globulin สูง"],
        ix: ["SPEP, serum IFE, sFLC (involved/uninvolved ratio ≥ 100 กับ involved FLC ≥ 100 mg/L เป็น SLiM)", "Whole-body low-dose CT หรือ PET/CT", "Bone marrow: clonal plasma cell ≥ 10% (≥ 60% เป็น SLiM)", "Involved sFLC > 1,500 mg/L สนับสนุน cast nephropathy"],
        std: "IMWG 2014 myeloma criteria (CRAB + SLiM)",
        link: "mspike"
      }),
      N("Skeletal metastasis", "adj", {
        s: "Night pain, น้ำหนักลด, ก้อน",
        why: "RCC ทำ lytic lesion, PTHrP-mediated hypercalcemia ทำ AKI",
        keys: ["Breast, prostate, lung, kidney, thyroid", "PTH ถูก suppress, PTHrP สูง"],
        ix: ["Bone scan, CT, PTHrP", "Biopsy"],
        link: "hyperca"
      }),
      N("Paget disease of bone", "adj", {
        s: "ALP สูงอย่างเดียวในผู้สูงอายุ กระดูกโต hearing loss",
        why: "DDx ของ ALP สูงที่ Ca, PO4 ปกติ",
        keys: ["Ca, PO4, PTH ปกติ", "Skull หรือ tibia โต"],
        ix: ["Bone scan, X-ray"],
        std: "Endocrine Society 2014 Paget disease guideline",
        link: "alp"
      }),
      N("Lymphoma / leukemia / mastocytosis", "adj", {
        s: "Diffuse bone pain กับ cytopenia",
        ix: ["CBC, smear, LDH, bone marrow, tryptase"],
        link: "cytopenia"
      })
    ]),
    N("Fragility fracture / osteoporosis", "step", {
      s: "Fracture จาก minimal trauma โดย lab metabolic ไม่ชัด",
      keys: ["ใน CKD G4-5D ต้องตัด ROD ก่อนวินิจฉัย osteoporosis", "T-score ทำนาย fracture ได้ใน CKD"]
    }, [
      N("Osteoporosis in CKD", "nephro", {
        s: "Fracture ใน CKD ที่ PTH และ ALP ใกล้เคียงปกติ",
        why: "การเลือกยาขึ้นกับ eGFR: bisphosphonate เลี่ยงเมื่อ eGFR < 30-35 ส่วน denosumab ไม่ต้องปรับขนาดตามไตแต่ทำให้ severe hypocalcemia ใน advanced CKD โดยเฉพาะ dialysis (FDA boxed warning 2024)",
        keys: ["Hip และ vertebral fracture", "Rebound fracture หลังหยุด denosumab"],
        ix: ["DXA ใน G3a-G5D ถ้าผลจะเปลี่ยนการรักษา", "FRAX", "Ca ซ้ำใน 1-2 สัปดาห์หลังฉีด denosumab"],
        std: "KDIGO 2017 CKD-MBD"
      }),
      N("Glucocorticoid-induced osteoporosis", "nephro", {
        s: "Fracture ในผู้ป่วย LN, GN, KT ที่ได้ steroid",
        why: "Prednisolone ≥ 2.5 mg/วัน นานกว่า 3 เดือนเพิ่ม fracture risk",
        keys: ["Vertebral fracture แม้ BMD ไม่ต่ำมาก", "ได้ pulse methylprednisolone"],
        ix: ["DXA, FRAX ที่ปรับตามขนาด steroid", "Vertebral fracture assessment"],
        std: "ACR 2022 GIOP guideline"
      }),
      N("Endocrine: hyperthyroid, hypogonadism, Cushing", "adj", {
        s: "Secondary osteoporosis",
        ix: ["TSH, testosterone หรือ estradiol, cortisol"],
        link: "cushingoid"
      })
    ]),
    N("Low ALP pattern", "step", {
      s: "ALP ต่ำผิดปกติร่วมกับ fracture",
      keys: ["ก่อนให้ bisphosphonate ต้องตัด hypophosphatasia และ adynamic bone เพราะยาทำให้ทั้งสองภาวะแย่ลง"]
    }, [
      N("Hypophosphatasia", "adj", {
        s: "Fracture ที่หายช้า ฟันหลุดเร็ว chondrocalcinosis",
        why: "เป็น mimic ของ osteoporosis และ osteomalacia ที่ทำให้ nephrocalcinosis ได้ bisphosphonate ทำให้แย่ลง",
        keys: ["ALP ต่ำต่อเนื่อง", "Atypical femoral fracture"],
        ix: ["Pyridoxal 5-phosphate สูง", "ALPL genetic testing"],
        std: "International HPP Working Group 2024 diagnostic criteria"
      }),
      N("Adynamic bone / other low ALP causes", "nephro", {
        s: "Over-suppressed PTH, Wilson disease, malnutrition, Zn หรือ Mg deficiency",
        ix: ["PTH, Zn, Mg, ceruloplasmin"],
        link: "hd-mbd"
      })
    ]),
    N("Focal pain with fever", "step", {
      s: "Infection ของกระดูกในผู้ป่วยที่มี bacteremia risk",
      keys: ["Back pain กับไข้", "HD catheter"]
    }, [
      N("Vertebral osteomyelitis / spondylodiscitis", "nephro", {
        s: "ปวดหลังไข้ใน HD ที่มี S. aureus bacteremia",
        why: "Metastatic infection จาก CRBSI และ TB spine พบบ่อยใน CKD",
        keys: ["Percussion tenderness", "Neurologic deficit ต้อง emergency MRI"],
        ix: ["MRI spine with contrast", "Blood culture, CT-guided biopsy"],
        std: "IDSA 2015 native vertebral osteomyelitis guideline",
        link: "backpain"
      })
    ])
  ])
};

/* ===================== FATIGUE / WEIGHT LOSS ===================== */
TREES.weightloss = {
  must: [
    "น้ำหนักจริงที่ลดลง กี่ kg ในกี่เดือน (> 5% ใน 6-12 เดือน), ตั้งใจหรือไม่",
    "Appetite ลดลง หรือยังกินได้ปกติแต่น้ำหนักลด",
    "ไข้, เหงื่อออกกลางคืน, ต่อมน้ำเหลือง, ก้อน, ไอ",
    "GI: กลืนลำบาก, ปวดท้องหลังกิน, ท้องเสีย, ถ่ายดำ",
    "Polyuria, polydipsia, ใจสั่น, มือสั่น, ขาดประจำเดือน",
    "Dialysis: ฟอกพอไหม, Kt/V, ปริมาณโปรตีนที่กิน, ท้องอืดจาก PD dwell",
    "ยา: metformin, GLP-1 RA, SGLT2 inhibitor, digoxin, opioid, levothyroxine, laxative",
    "อารมณ์, การนอน, สังคม, ค่าใช้จ่าย, สุรา, บุหรี่, sexual risk"
  ],
  tree: N("Fatigue, anorexia, weight loss", "root", {
    s: "ยืนยันว่าน้ำหนักลดจริงก่อน แล้วแยกด้วย appetite ว่าคงเดิมหรือลดลง",
    why: "น้ำหนักลดเป็นทางเข้าของ paraprotein disease, vasculitis, TB, IgG4-RD และ PEW ในผู้ป่วย dialysis ซึ่งเป็น long case ที่ออกบ่อย",
    keys: ["Unintentional weight loss > 5% ใน 6-12 เดือน", "Appetite คงเดิม: hypermetabolic หรือ loss", "Appetite ลด: organic disease หรือ psychiatric", "Edema บดบังการลดน้ำหนักจริงในผู้ป่วยไต"],
    ix: ["CBC, ESR, CRP, Cr, electrolyte, Ca, LFT, albumin", "Glucose, HbA1c, TSH", "UA with microscopy", "HIV, HBsAg, anti-HCV", "CXR, FIT หรือ age-appropriate cancer screening", "CT chest-abdomen ถ้า baseline ผิดปกติ"],
    std: "GLIM 2019 malnutrition criteria, KDOQI 2020 nutrition in CKD guideline"
  }, [
    N("Appetite preserved", "step", {
      s: "กินได้หรือกินมากขึ้นแต่น้ำหนักลด",
      keys: ["Hypermetabolic", "Caloric loss ทางปัสสาวะ", "Malabsorption"]
    }, [
      N("Thyrotoxicosis", "adj", {
        s: "ใจสั่น มือสั่น เหงื่อออก",
        why: "Thyrotoxic periodic paralysis ในชายเอเชียทำให้ hypokalemia จาก shift",
        keys: ["Tachycardia, tremor", "Hypokalemia กับ urine K ต่ำ"],
        ix: ["TSH, FT4, FT3", "TRAb"],
        link: "weakness"
      }),
      N("Uncontrolled diabetes / glycosuria", "nephro", {
        s: "Polyuria polydipsia น้ำหนักลด",
        why: "Osmotic diuresis และ SGLT2 inhibitor ทำให้เสีย glucose ราว 60-80 g/วัน (240-320 kcal) เมื่อ GFR ปกติ และลดลงเมื่อ eGFR ต่ำ",
        keys: ["Glucose สูง", "Glycosuria ทั้งที่ glucose ปกติ ให้คิด SGLT2i หรือ Fanconi"],
        ix: ["Glucose, HbA1c, UA glucose, ketone"],
        link: "polyuria"
      }),
      N("Malabsorption", "nephro", {
        s: "Steatorrhea ท้องเสียเรื้อรัง",
        why: "Enteric hyperoxaluria ทำให้ oxalate nephropathy และ CKD หลัง bariatric surgery หรือ chronic pancreatitis",
        keys: ["Bariatric surgery (RYGB)", "Chronic pancreatitis", "Calcium oxalate stone"],
        ix: ["Fecal fat, fecal elastase, 24-hour urine oxalate", "Kidney biopsy: calcium oxalate crystal"],
        link: "diarrhea"
      }),
      N("Pheochromocytoma / paraganglioma", "adj", {
        s: "Paroxysmal headache, sweating, palpitation, HTN",
        ix: ["Plasma free metanephrine (ค่าสูงผิดพลาดได้ใน CKD)"],
        std: "Endocrine Society 2014 pheochromocytoma guideline",
        link: "paroxysm"
      })
    ]),
    N("Kidney-specific causes", "step", {
      s: "สาเหตุในผู้ป่วย CKD, dialysis และ KT",
      why: "ใน long case dialysis ต้องประเมิน adequacy, PEW และ inflammation ทุกครั้งที่มีน้ำหนักลด แต่สาเหตุทั่วไป (มะเร็ง, TB, endocrine, ยา) ยังต้องไล่ตาม branch อื่นเหมือนผู้ป่วยทั่วไป",
      keys: ["Uremic symptoms", "Albumin ต่ำโดยไม่มี proteinuria", "Dry weight ลดลงเรื่อยๆ"]
    }, [
      N("Uremia / inadequate dialysis", "nephro", {
        s: "เบื่ออาหาร คลื่นไส้ รับรสผิดปกติ คัน",
        why: "Uremic anorexia เป็นข้อบ่งชี้เริ่ม dialysis และเป็นสัญญาณว่า dialysis ไม่พอ",
        keys: ["Asterixis, pericardial rub", "BUN สูง, residual kidney function ลดลง"],
        ix: ["HD: spKt/V (เป้า 1.4, ต่ำสุด 1.2 สำหรับ 3 ครั้งต่อสัปดาห์), URR > 65%", "PD: weekly Kt/V urea ≥ 1.7 ร่วมกับประเมิน goal-directed", "Residual urine volume"],
        std: "KDOQI 2015 HD adequacy, ISPD 2020 prescribing high-quality goal-directed PD",
        link: "nausea"
      }),
      N("Protein-energy wasting / MIA syndrome", "nephro", {
        s: "Albumin ต่ำ muscle wasting ใน dialysis",
        why: "PEW ทำนาย mortality ใน dialysis และสัมพันธ์กับ inflammation และ atherosclerosis",
        keys: ["Serum chemistry: albumin < 3.8 g/dL (BCG), prealbumin < 30 mg/dL (HD), cholesterol < 100 mg/dL", "Body mass: BMI < 23, น้ำหนักลด 5% ใน 3 เดือนหรือ 10% ใน 6 เดือน", "Muscle mass: ลดลง 5% ใน 3 เดือนหรือ 10% ใน 6 เดือน, MAMC ต่ำ", "Intake: DPI < 0.8 g/kg/วัน (dialysis) หรือ < 0.6 (CKD 2-5), DEI < 25 kcal/kg/วัน นาน ≥ 2 เดือน"],
        ix: ["nPCR, SGA 7-point, MIS", "Handgrip strength, BIA", "CRP"],
        std: "ISRNM 2008 PEW criteria (≥ 3 ใน 4 กลุ่ม), KDOQI 2020 nutrition guideline (DPI 1.0-1.2 g/kg/วัน ใน dialysis)",
        link: "wasting"
      }),
      N("Metabolic acidosis", "nephro", {
        s: "Muscle catabolism และ bone loss",
        why: "Acidosis เพิ่ม protein degradation ผ่าน ubiquitin-proteasome",
        keys: ["HCO3 ต่ำต่อเนื่อง"],
        ix: ["Venous HCO3"],
        std: "KDIGO 2024 CKD (พิจารณารักษาเมื่อ HCO3 < 18 mmol/L), KDOQI 2020 nutrition (คง HCO3 24-26)",
        link: "nagma"
      }),
      N("PD-specific: early satiety, EPS", "nephro", {
        s: "อิ่มเร็วจาก dwell volume หรือ bowel obstruction ซ้ำๆ ใน PD นาน",
        why: "EPS เสี่ยงขึ้นเมื่อ PD vintage > 5 ปี และหลังหยุด PD หรือหลัง KT",
        keys: ["UF failure, ปวดท้อง, ถ่ายไม่ออกเป็นช่วงๆ", "ก้อนในท้อง, ascites ปนเลือด"],
        ix: ["CT: peritoneal thickening, calcification, bowel tethering (cocoon)", "Peritoneal equilibration test: high (fast) transporter พบบ่อยแต่ไม่จำเพาะ"],
        std: "ISPD 2017 EPS position paper",
        link: "abdomen"
      }),
      N("Transplant-specific: CMV, PTLD, graft failure", "nephro", {
        s: "น้ำหนักลด ท้องเสีย ไข้ ใน KT",
        why: "CMV GI disease, MMF-related diarrhea, PTLD และ failing graft ที่ uremia กลับมา",
        keys: ["Diarrhea กับ leukopenia", "LDH สูง, lymphadenopathy", "Cr ขึ้นช้าๆ"],
        ix: ["CMV QNAT, colonoscopy with biopsy", "EBV PCR, PET/CT", "Graft biopsy"],
        std: "AST IDCOP 2019",
        link: "kt-fever"
      })
    ]),
    N("Appetite reduced: malignancy and paraprotein", "step", {
      s: "สาเหตุ organic อันดับแรกที่ต้องหาในผู้สูงอายุ",
      keys: ["อายุ > 50 ปี, สูบบุหรี่", "Anemia, hypercalcemia", "Nephrotic syndrome ในผู้สูงอายุ"]
    }, [
      N("Solid tumor with paraneoplastic MN", "nephro", {
        s: "MN ในผู้สูงอายุ สูบบุหรี่ น้ำหนักลด โดยน่าจะเป็นมากขึ้นเมื่อ PLA2R ลบ",
        why: "MN ที่ไม่ใช่ PLA2R สัมพันธ์กับมะเร็งมากกว่า โดยเฉพาะ THSD7A และ NELL1",
        keys: ["MN ทุกราย screen มะเร็งตามอายุไม่ว่า PLA2R บวกหรือลบ เพราะ PLA2R บวกไม่ตัดมะเร็ง", "ค้นละเอียดขึ้นเมื่อ PLA2R ลบ, THSD7A หรือ NELL1 บวก, อายุมาก, สูบบุหรี่, น้ำหนักลด", "IgG1 และ IgG2 เด่นกว่า IgG4 บน IF", "Inflammatory cell ใน glomeruli (> 8 เซลล์ต่อ glomerulus)"],
        ix: ["Anti-PLA2R, tissue PLA2R stain, THSD7A, NELL1", "Age-appropriate cancer screening, CT chest-abdomen"],
        std: "KDIGO 2021 GN guideline (MN)",
        link: "nephrotic"
      }),
      N("AL amyloidosis", "nephro", {
        s: "น้ำหนักลด nephrotic orthostatic hypotension macroglossia",
        why: "Weight loss และ fatigue เป็นอาการที่พบบ่อยที่สุดของ AL",
        keys: ["Periorbital purpura", "Hepatomegaly กับ ALP สูง", "Cardiac involvement"],
        ix: ["sFLC, serum และ urine IFE", "Fat pad, bone marrow หรือ kidney biopsy: Congo red, mass spectrometry typing", "NT-proBNP, troponin สำหรับ staging"],
        std: "Mayo 2012 AL staging, IMWG",
        link: "mspike"
      }),
      N("Multiple myeloma", "nephro", {
        s: "Fatigue anemia ปวดกระดูก Cr สูง",
        keys: ["CRAB", "Globulin gap"],
        ix: ["SPEP, IFE, sFLC, skeletal imaging, bone marrow"],
        std: "IMWG 2014",
        link: "bonepain"
      }),
      N("Lymphoma", "nephro", {
        s: "B symptoms ต่อมน้ำเหลืองโต",
        keys: ["LDH สูง", "Minimal change disease ใน Hodgkin lymphoma"],
        ix: ["PET/CT, excisional biopsy"],
        std: "Lugano 2014",
        link: "lymphnode"
      }),
      N("GI and other malignancy", "adj", {
        s: "Gastric, colorectal, pancreatic, hepatocellular, cholangiocarcinoma",
        why: "Cholangiocarcinoma และ HCC พบบ่อยในภาคอีสาน",
        keys: ["Iron deficiency anemia", "Dysphagia, early satiety"],
        ix: ["EGD, colonoscopy, CT abdomen, AFP, CA 19-9 ตาม clue"]
      })
    ]),
    N("Appetite reduced: chronic infection", "step", {
      s: "Infection เรื้อรังที่ทำให้ GN หรือ amyloid",
      keys: ["ไข้ต่ำๆ", "Lymphadenopathy", "Risk exposure"]
    }, [
      N("Tuberculosis", "nephro", {
        s: "Constitutional symptoms นาน",
        why: "Sterile pyuria, granulomatous TIN, AA amyloid และ TB reactivation ใน CKD, HD และ KT",
        ix: ["CXR, sputum Xpert, urine AFB culture"],
        link: "fever"
      }),
      N("HIV / chronic viral hepatitis", "nephro", {
        s: "Wasting กับ proteinuria",
        why: "HIVAN, HIV-ICGN, HBV-MN, HCV-cryoglobulinemic GN",
        ix: ["HIV Ag/Ab, HBV, HCV serology และ viral load"],
        link: "viral"
      }),
      N("Subacute endocarditis / melioidosis / deep abscess", "nephro", {
        s: "ไข้ต่ำๆ น้ำหนักลดหลายสัปดาห์",
        why: "Infection-related GN และ AKI จาก sepsis",
        ix: ["Blood culture, echocardiography, CT"],
        link: "rpgn"
      })
    ]),
    N("Appetite reduced: autoimmune and vasculitis", "step", {
      s: "Multisystem disease ที่มี kidney involvement",
      keys: ["Active sediment", "ESR สูง", "Organ involvement หลายระบบ"]
    }, [
      N("ANCA vasculitis (MPA in the elderly)", "nephro", {
        s: "ไข้ น้ำหนักลด ปวดกล้ามเนื้อ นานหลายสัปดาห์ก่อน RPGN",
        keys: ["Microscopic hematuria ที่ยังไม่มีใครตรวจ", "Mononeuritis multiplex"],
        ix: ["MPO-ANCA, UA, Cr"],
        std: "ACR/EULAR 2022",
        link: "rpgn"
      }),
      N("IgG4-related disease", "nephro", {
        s: "Autoimmune pancreatitis, sialadenitis, retroperitoneal fibrosis, น้ำหนักลด",
        why: "IgG4-related TIN, MN และ obstructive uropathy จาก retroperitoneal fibrosis",
        keys: ["Low C3/C4", "Eosinophilia, IgE สูง", "ไตมี hypodense lesion บน CT"],
        ix: ["Serum IgG4 (> 135 mg/dL สนับสนุนแต่ไม่จำเพาะ)", "CT abdomen", "Biopsy: storiform fibrosis, IgG4/IgG > 40%"],
        std: "2019 ACR/EULAR IgG4-RD classification",
        link: "backpain"
      }),
      N("SLE / sarcoidosis / GCA", "nephro", {
        s: "Constitutional symptoms ร่วมกับ organ-specific clue",
        ix: ["ANA, C3, C4, Ca, ESR"],
        link: "fever"
      })
    ]),
    N("Appetite reduced: endocrine, GI, drug, psychosocial", "step", {
      s: "สาเหตุที่แก้ได้และถูกมองข้ามบ่อย",
      keys: ["Electrolyte clue", "Medication review", "Depression screen"]
    }, [
      N("Adrenal insufficiency", "adj", {
        s: "เพลีย เบื่ออาหาร hypotension hyponatremia",
        why: "Steroid withdrawal ใน GN และ KT, ICI hypophysitis และ adrenal TB",
        keys: ["Hyperkalemia และ hyperpigmentation ใน primary"],
        ix: ["8 am cortisol, ACTH, cosyntropin test"],
        std: "Endocrine Society 2016 adrenal insufficiency guideline",
        link: "hypona"
      }),
      N("Hypercalcemia", "nephro", {
        s: "เบื่ออาหาร ท้องผูก polyuria สับสน",
        why: "PTH-mediated vs non-PTH (PTHrP, granulomatous, myeloma, vitamin D)",
        ix: ["Ca, PTH, PTHrP, 1,25D, SPEP"],
        link: "hyperca"
      }),
      N("GI disease: gastroparesis, PUD, mesenteric ischemia, liver disease", "adj", {
        s: "อิ่มเร็ว ปวดท้องหลังกิน กลัวการกิน",
        why: "Diabetic gastroparesis, uremic gastritis, atheroembolic mesenteric ischemia และ cirrhosis ที่มี hepatorenal physiology",
        ix: ["EGD, gastric emptying study, CTA mesenteric ตาม clue"],
        link: "abdpain"
      }),
      N("Drug-related anorexia", "adj", {
        s: "Metformin, GLP-1 RA, digoxin toxicity, opioid, polypharmacy",
        why: "ใน CKD ยาที่ขับทางไตสะสมจนเกิด anorexia เช่น digoxin และ metformin",
        keys: ["เริ่มหลังเปลี่ยนยา", "Visual disturbance กับ bradyarrhythmia ใน digoxin toxicity"],
        ix: ["Digoxin level, medication reconciliation"]
      }),
      N("Depression / dementia / social", "adj", {
        s: "เบื่ออาหารร่วมกับอารมณ์เศร้า หรือเข้าถึงอาหารไม่ได้",
        why: "Depression พบบ่อยในผู้ป่วย dialysis และทำนาย mortality",
        ix: ["PHQ-9, Mini-Cog", "ประเมิน caregiver และค่าใช้จ่าย"]
      }),
      N("Sarcopenia / frailty in the elderly", "adj", {
        s: "น้ำหนักลดช้าๆ กล้ามเนื้อลีบ ล้มบ่อย",
        why: "CKD เร่ง sarcopenia ผ่าน acidosis, inflammation, inactivity และ protein restriction",
        keys: ["Handgrip < 28 kg (ชาย) หรือ < 18 kg (หญิง)", "Gait speed < 1.0 m/s หรือ 5-time chair stand ≥ 12 วินาที", "ASM/ht² จาก DXA < 7.0 kg/m² (ชาย) หรือ < 5.4 (หญิง), จาก BIA < 7.0 (ชาย) หรือ < 5.7 (หญิง)"],
        ix: ["Handgrip dynamometer, gait speed, BIA หรือ DXA"],
        std: "AWGS 2019 sarcopenia criteria",
        link: "elderly"
      })
    ]),
    N("No cause after baseline workup", "step", {
      s: "History, PE และ baseline lab ปกติทั้งหมด",
      why: "โอกาสเป็นมะเร็งต่ำเมื่อ baseline workup ปกติ การนัดติดตามดีกว่าการส่ง scan ทุกอย่าง",
      keys: ["ชั่งน้ำหนักซ้ำบนเครื่องเดียวกัน", "ทบทวนการกินกับนักโภชนาการ"],
      ix: ["Watchful waiting 3-6 เดือน", "FDG-PET/CT เฉพาะเมื่อมี clue ใหม่หรือ inflammatory marker สูง"]
    }, [])
  ])
};

/* ===================== HEADACHE / VISUAL ===================== */
TREES.headache = {
  must: [
    "Onset: thunderclap (ถึงจุดสูงสุดใน 1 นาที), subacute, chronic, เปลี่ยน pattern จากเดิม",
    "BP ที่บ้านและตอนมีอาการ, ตามัว, เห็นภาพซ้อน, ชัก, ซึม",
    "Family history ของ ADPKD, aneurysm, SAH",
    "ยา: CNI, ESA, steroid, NSAID overuse, ยาลดความดันที่หยุดเอง, decongestant",
    "ไข้, คอแข็ง, ผื่น, ไซนัส, ปวดข้อ (SLE, vasculitis)",
    "ตั้งครรภ์หรือหลังคลอด",
    "Polyuria, galactorrhea, ประจำเดือนผิดปกติ (pituitary)",
    "ICI หรือ chemotherapy, HIV, KT (CNS infection)"
  ],
  tree: N("Headache / visual disturbance", "root", {
    s: "หา red flag ก่อน (SNNOOP10) แล้วแยก hypertensive, vascular, inflammatory, infectious, pituitary และ ocular",
    why: "ปวดหัวตามัวเป็นทางเข้าของ hypertensive emergency, PRES, ADPKD aneurysm, CNS lupus, TMA และ hypophysitis ซึ่งล้วนเป็น long case nephro",
    keys: ["BP และ fundoscopy ทุกราย", "Thunderclap ต้องคิด SAH", "Focal neurological deficit", "Papilledema"],
    ix: ["BP ทั้งสองแขน, fundoscopy", "CT brain non-contrast แล้วตามด้วย MRI ตาม clue", "CBC, smear, LDH, Cr, UA", "LP ถ้าสงสัย SAH ที่ CT ลบ หรือ meningitis"],
    std: "SNNOOP10 red flags, ICHD-3 classification"
  }, [
    N("Hypertension-related", "step", {
      s: "BP สูงมากร่วมกับ target organ damage",
      keys: ["Retinopathy grade III-IV", "AKI, MAHA", "Encephalopathy"]
    }, [
      N("Hypertensive emergency / malignant HTN", "nephro", {
        s: "BP มักสูงกว่า 180/120 mmHg ร่วมกับ retinal hemorrhage, exudate หรือ papilledema",
        why: "Malignant nephrosclerosis และ TMA ที่ไต ต้องหาสาเหตุ secondary HTN ทุกรายหลัง stabilize",
        keys: ["Flame hemorrhage, cotton wool spot, papilledema", "MAHA กับ thrombocytopenia เล็กน้อย", "Hypokalemia จาก secondary hyperaldosteronism"],
        ix: ["Fundoscopy, smear, LDH, haptoglobin", "Cr, UA, troponin, ECG", "Renin, aldosterone หลังพ้นระยะเฉียบพลัน"],
        std: "ESH 2023 hypertension guideline",
        link: "htn-emerg"
      }),
      N("PRES", "nephro", {
        s: "ปวดหัว ตามัวหรือ cortical blindness ชัก ซึม",
        why: "CNI (tacrolimus, cyclosporine), LN, eclampsia, HUS, ESA และ chemotherapy",
        keys: ["อาจเกิดเมื่อ BP สูงไม่มาก", "Tacrolimus level อาจอยู่ใน therapeutic range", "Hypomagnesemia เพิ่ม risk"],
        ix: ["MRI FLAIR: parieto-occipital vasogenic edema", "Tacrolimus trough, Mg"],
        std: "Clinical-radiologic diagnosis",
        link: "seizure"
      }),
      N("Scleroderma renal crisis", "nephro", {
        s: "BP สูงใหม่ AKI ใน diffuse SSc",
        why: "Prednisolone ≥ 15 mg/วัน และ anti-RNA polymerase III เพิ่ม risk, ACEi คือการรักษาหลักเมื่อเกิด SRC แล้ว แต่ไม่แนะนำให้ ACEi เพื่อป้องกัน",
        keys: ["Skin thickening เร็วใน 4 ปีแรก", "MAHA", "Urine sediment มักไม่ active"],
        ix: ["Anti-RNA polymerase III, anti-Scl-70", "Smear, LDH, Cr"],
        std: "ACR/EULAR 2013 SSc classification",
        link: "skinthick"
      }),
      N("Pheochromocytoma / paraganglioma", "adj", {
        s: "Paroxysmal headache, palpitation, sweating",
        ix: ["Plasma free metanephrine"],
        std: "Endocrine Society 2014",
        link: "paroxysm"
      }),
      N("Preeclampsia / eclampsia", "nephro", {
        s: "BP สูงหลัง 20 สัปดาห์ ปวดหัว ตามัว",
        why: "Proteinuria, AKI, HELLP และ TMA ในครรภ์",
        keys: ["Proteinuria ≥ 300 mg/วัน หรือ UPCR ≥ 0.3 g/g", "Platelet ต่ำ LFT สูง"],
        ix: ["UPCR, CBC, LFT, LDH", "sFlt-1/PlGF ratio"],
        std: "ACOG 2020, ISSHP 2021",
        link: "pregnancy"
      })
    ]),
    N("Vascular / structural", "step", {
      s: "Thunderclap หรือ focal deficit",
      keys: ["Sudden onset", "Neck stiffness", "Focal sign"]
    }, [
      N("Ruptured intracranial aneurysm (ADPKD)", "nephro", {
        s: "Thunderclap headache คอแข็ง ซึม",
        why: "ADPKD มี IA ราว 9-12% เทียบกับราว 2-3% ในคนทั่วไป และสูงขึ้นถ้ามี family history ของ IA หรือ SAH",
        keys: ["Family history ของ SAH", "Bilateral enlarged kidneys", "PKD1 และ 5' mutation"],
        ix: ["CT brain non-contrast (sensitivity เกือบ 100% เมื่อทำภายใน 6 ชั่วโมงแรก และลดลงตามเวลา)", "LP หา xanthochromia เมื่อ CT ลบแต่ยังสงสัย โดยเฉพาะ CT ที่ทำหลัง 6 ชั่วโมง", "CTA หรือ MRA", "Screening MRA ใน ADPKD ที่มี family history หรือ high-risk occupation"],
        std: "KDIGO 2025 ADPKD guideline",
        link: "cysts"
      }),
      N("Hypertensive intracerebral hemorrhage / stroke", "adj", {
        s: "Focal deficit กับ BP สูง",
        why: "CKD และ HD มี stroke risk สูง และ AF ใน HD ทำให้ cardioembolism",
        ix: ["CT หรือ MRI brain"],
        link: "stroke"
      }),
      N("Cerebral venous sinus thrombosis", "nephro", {
        s: "Headache ที่แย่ลงเมื่อนอน papilledema ชัก",
        why: "Nephrotic syndrome, APS และ pregnancy เป็น hypercoagulable state",
        ix: ["MR venography หรือ CT venography"],
        std: "AHA 2024 CVT scientific statement",
        link: "thrombosis"
      }),
      N("Reversible cerebral vasoconstriction syndrome", "adj", {
        s: "Recurrent thunderclap ในหลายวัน",
        why: "Postpartum, vasoactive drug, และ overlap กับ PRES",
        ix: ["CTA หรือ MRA: segmental vasoconstriction ที่กลับปกติใน 12 สัปดาห์"]
      })
    ]),
    N("Inflammatory / autoimmune", "step", {
      s: "Headache ร่วมกับ systemic inflammation",
      keys: ["ESR สูง", "Multisystem involvement"]
    }, [
      N("CNS lupus / APS", "nephro", {
        s: "Headache, seizure, psychosis, stroke",
        why: "Neuropsychiatric SLE มักเกิดช่วงที่ SLE active ซึ่งอาจมี LN ร่วม แต่ไม่มี LN ก็เป็นได้ และต้องแยกจาก PRES, infection และผลของ steroid",
        keys: ["aPL บวก, livedo", "Low C3/C4"],
        ix: ["MRI brain, CSF, aPL"],
        std: "ACR 1999 NPSLE case definitions",
        link: "rpgn"
      }),
      N("GPA with ENT or pachymeningitis", "nephro", {
        s: "Chronic sinusitis, otitis, pachymeningitis",
        keys: ["Saddle nose, nasal crusting", "Cranial neuropathy"],
        ix: ["PR3-ANCA, MRI with gadolinium (ระวังใน eGFR < 30)"],
        std: "ACR/EULAR 2022 GPA",
        link: "ent"
      }),
      N("Giant cell arteritis", "adj", {
        s: "อายุ > 50 ปี temporal headache jaw claudication visual loss",
        ix: ["ESR, CRP, temporal artery US หรือ biopsy"],
        std: "ACR/EULAR 2022 GCA"
      }),
      N("TTP", "nephro", {
        s: "Headache, confusion, focal sign ที่มาๆ หายๆ กับ MAHA",
        ix: ["Smear, PLASMIC score, ADAMTS13"],
        std: "ISTH 2020 TTP",
        link: "tma"
      })
    ]),
    N("Infection", "step", {
      s: "ไข้ร่วมกับ headache",
      keys: ["Immunosuppressed host", "Meningism"]
    }, [
      N("CNS infection in KT or immunosuppressed", "nephro", {
        s: "Cryptococcus, Listeria, TB, toxoplasma, PML, nocardia",
        why: "Cryptococcal meningitis ใน KT มักหลังปีแรกและอาการไม่ชัด",
        keys: ["Headache นานหลายสัปดาห์ ไข้ต่ำๆ", "Raised ICP"],
        ix: ["Serum และ CSF cryptococcal antigen", "CSF opening pressure, culture, PCR panel", "MRI brain"],
        std: "AST IDCOP 2019",
        link: "kt-fever"
      }),
      N("Bacterial meningitis / sinusitis", "adj", {
        s: "ไข้ คอแข็ง ซึม",
        ix: ["Blood culture, LP"],
        std: "IDSA bacterial meningitis guideline"
      })
    ]),
    N("Pituitary / endocrine", "step", {
      s: "Headache กับ visual field defect หรือ hormone disturbance",
      keys: ["Bitemporal hemianopia", "Polyuria", "Hyponatremia"]
    }, [
      N("Hypophysitis (ICI, IgG4)", "nephro", {
        s: "Headache, fatigue, hyponatremia",
        why: "ICI hypophysitis ทำให้ secondary adrenal insufficiency และ hyponatremia, IgG4-RD ทำให้ central DI",
        keys: ["Ipilimumab", "Central DI ถ้า posterior pituitary"],
        ix: ["8 am cortisol, ACTH, TSH, FT4", "Urine osmolality", "MRI pituitary"],
        std: "ASCO 2021 irAE guideline",
        link: "hypona"
      }),
      N("Pituitary adenoma / apoplexy", "adj", {
        s: "Sudden headache, ophthalmoplegia, visual loss",
        why: "Acromegaly ทำให้ HTN และ kidney enlargement, Cushing disease ทำให้ HTN และ hypokalemia",
        ix: ["MRI pituitary, cortisol, prolactin, IGF-1"],
        link: "cushingoid"
      })
    ]),
    N("Ocular / metabolic", "step", {
      s: "ตามัวโดยไม่มี neurological deficit",
      keys: ["Red eye", "Diabetic retinopathy", "Uremia"]
    }, [
      N("Retinopathy: diabetic, hypertensive", "nephro", {
        s: "ตามัวช้าๆ",
        why: "Diabetic retinopathy สนับสนุน DKD แต่ไม่ตัด NDKD ที่ซ้อน ส่วน T2DM ที่ proteinuria มากแต่ไม่มี retinopathy ให้คิดถึง NDKD มากขึ้น โดยยังไม่ตัด DKD",
        keys: ["Proliferative retinopathy", "Duration ของ DM"],
        ix: ["Fundoscopy หรือ fundus photography"],
        std: "ADA Standards of Care in Diabetes 2026",
        link: "proteinuria"
      }),
      N("Uveitis / scleritis", "nephro", {
        s: "ตาแดง ปวด สู้แสงไม่ได้",
        why: "TINU, sarcoidosis, GPA, Behcet",
        ix: ["Slit lamp"],
        link: "eye"
      }),
      N("Uremia / dysnatremia / hypercalcemia", "nephro", {
        s: "Headache กับ nausea และ confusion",
        ix: ["BUN, Na, Ca, glucose"],
        link: "ams"
      }),
      N("Medication overuse / analgesic nephropathy", "nephro", {
        s: "Chronic daily headache ใช้ยาแก้ปวดทุกวัน",
        why: "NSAID และ combination analgesic ทำให้ CKD, papillary necrosis",
        keys: ["Papillary necrosis, sterile pyuria", "Bumpy contour, small kidney"],
        ix: ["UA, CT non-contrast: papillary calcification"],
        std: "ICHD-3 medication overuse headache"
      })
    ])
  ])
};

/* ===================== ARTHRALGIA / ARTHRITIS ===================== */
TREES.arthralgia = {
  must: [
    "จำนวนข้อ (mono, oligo, poly), symmetric หรือไม่, ข้อเล็กหรือข้อใหญ่",
    "Inflammatory: morning stiffness > 30 นาที, บวมแดงร้อน",
    "Acute attack ที่ big toe, tophi, ประวัติ gout ในครอบครัว",
    "ผื่น, photosensitivity, แผลในปาก, ผมร่วง, Raynaud",
    "Purpura, ปวดท้อง, hematuria (IgAV)",
    "Diarrhea, uveitis, psoriasis, urethritis (spondyloarthritis)",
    "ไข้, เจ็บคอนำมาก่อน, แผลติดเชื้อ (IRGN)",
    "ยา: diuretic, low-dose aspirin, CNI (gout), hydralazine (drug-induced lupus), PTU (ANCA)"
  ],
  tree: N("Arthralgia / arthritis", "root", {
    s: "แยก inflammatory กับ mechanical แล้วจัดตามจำนวนข้อและ crystal vs systemic",
    why: "ข้ออักเสบเป็นทางเข้าของ SLE, vasculitis, cryoglobulinemia, gout ที่เกี่ยวกับไต และ amyloid จาก chronic inflammation",
    keys: ["จำนวนและการกระจายของข้อ", "Effusion และ synovitis", "Extra-articular features", "UA และ urine sediment ทุกราย"],
    ix: ["Synovial fluid: cell count, crystal, Gram stain, culture", "ESR, CRP, uric acid", "ANA, RF, anti-CCP, C3, C4, ANCA, cryoglobulin ตาม clue", "UA with microscopy, UPCR, Cr"],
    std: "Arthrocentesis is the standard for monoarthritis"
  }, [
    N("Crystal arthritis", "step", {
      s: "Acute monoarthritis หรือ oligoarthritis ที่เป็นซ้ำ",
      keys: ["Podagra", "Tophi", "Chondrocalcinosis"]
    }, [
      N("Gout", "nephro", {
        s: "Acute monoarthritis, tophi",
        why: "CKD ลด urate excretion, diuretic และ CNI ทำให้ gout, chronic urate nephropathy ยังเป็นที่ถกเถียง และ uric acid stone",
        keys: ["Serum urate อาจปกติขณะ acute attack", "Tophi ที่หู ข้อศอก", "ประวัติ uric acid stone"],
        ix: ["Synovial fluid: negatively birefringent needle-shaped crystal", "Dual-energy CT", "Serum urate ซ้ำหลังพ้น acute 2 สัปดาห์"],
        std: "ACR/EULAR 2015 gout classification, ACR 2020 gout management guideline (target urate < 6 mg/dL)",
        link: "stone"
      }),
      N("Familial juvenile hyperuricemic nephropathy (ADTKD-UMOD)", "nephro", {
        s: "Gout อายุน้อย CKD ที่ proteinuria น้อย family history ของ CKD",
        why: "FEUA ต่ำมาก และ bland sediment",
        keys: ["Gout ในวัยรุ่นหรือหญิงก่อนหมดประจำเดือน", "Autosomal dominant"],
        ix: ["FEUA < 5%", "Genetic testing UMOD, REN, MUC1"],
        std: "KDIGO 2015 ADTKD consensus",
        link: "cysts"
      }),
      N("Lead nephropathy / saturnine gout", "nephro", {
        s: "Gout กับ CKD และ HTN ในผู้สัมผัสตะกั่ว",
        ix: ["Blood lead, EDTA mobilization test"]
      }),
      N("CPPD / pseudogout", "adj", {
        s: "ข้อเข่าหรือข้อมืออักเสบในผู้สูงอายุ",
        why: "Hyperparathyroidism, hypomagnesemia (Gitelman) และ hemochromatosis ทำให้ CPPD",
        keys: ["Chondrocalcinosis", "Gitelman ในคนอายุน้อยที่มี CPPD"],
        ix: ["Synovial fluid: positively birefringent rhomboid crystal", "Ca, PTH, Mg, ferritin"],
        std: "ACR/EULAR 2023 CPPD classification",
        link: "mg"
      })
    ]),
    N("Systemic autoimmune", "step", {
      s: "Inflammatory polyarthritis ร่วมกับ extra-articular features",
      keys: ["Non-erosive vs erosive", "Low complement", "Skin lesion"]
    }, [
      N("SLE", "nephro", {
        s: "Non-erosive symmetric polyarthritis, Jaccoud arthropathy",
        why: "Lupus nephritis ทุก class",
        keys: ["Malar rash, oral ulcer, alopecia", "Cytopenia", "Low C3/C4 กับ anti-dsDNA"],
        ix: ["ANA, anti-dsDNA, anti-Sm, C3, C4", "UA, UPCR, kidney biopsy"],
        std: "EULAR/ACR 2019 SLE, KDIGO 2024 LN",
        link: "rpgn"
      }),
      N("Rheumatoid arthritis", "nephro", {
        s: "Erosive symmetric small joint polyarthritis",
        why: "AA amyloid จาก chronic inflammation, NSAID nephropathy, MN จาก gold หรือ penicillamine, rheumatoid vasculitis",
        keys: ["Nephrotic ใน RA นาน ให้คิด AA amyloid", "Rheumatoid nodules"],
        ix: ["RF, anti-CCP", "Serum amyloid A, kidney biopsy Congo red"],
        std: "ACR/EULAR 2010 RA classification",
        link: "nephrotic"
      }),
      N("Sjogren syndrome", "nephro", {
        s: "Arthralgia กับ sicca",
        why: "TIN, dRTA, hypokalemic paralysis และ cryoglobulinemic GN",
        ix: ["Anti-Ro, anti-La, Schirmer test", "Urine pH, VBG"],
        std: "ACR/EULAR 2016 Sjogren classification",
        link: "sicca"
      }),
      N("Systemic sclerosis / MCTD", "nephro", {
        s: "Arthralgia, Raynaud, puffy fingers",
        ix: ["Anti-Scl-70, anti-RNA polymerase III, anti-U1 RNP"],
        link: "raynaud"
      })
    ]),
    N("Vasculitis", "step", {
      s: "Arthralgia ร่วมกับ purpura, neuropathy, active sediment",
      keys: ["Palpable purpura", "Mononeuritis multiplex", "Hematuria"]
    }, [
      N("IgA vasculitis (HSP)", "nephro", {
        s: "Purpura ที่ขา arthralgia ปวดท้อง hematuria",
        why: "IgAV nephritis ในผู้ใหญ่รุนแรงกว่าเด็ก",
        keys: ["Palpable purpura ที่ขาและก้น", "GI bleeding หรือ intussusception"],
        ix: ["UA, UPCR, Cr", "Skin biopsy: IgA deposit", "Kidney biopsy ถ้า proteinuria หรือ Cr สูง"],
        std: "EULAR/PRINTO/PRES 2010 criteria (เด็ก), KDIGO 2025 IgAN/IgAV",
        link: "hematuria"
      }),
      N("Cryoglobulinemic vasculitis", "nephro", {
        s: "Purpura, arthralgia, weakness (Meltzer triad), neuropathy",
        why: "Type II cryo กับ HCV ทำให้ MPGN",
        keys: ["C4 ต่ำมาก C3 ค่อนข้างปกติ", "RF บวก"],
        ix: ["Cryoglobulin (เก็บที่ 37 °C), RF, C4, HCV RNA"],
        std: "Classification criteria for cryoglobulinemic vasculitis 2011",
        link: "viral"
      }),
      N("ANCA vasculitis", "nephro", {
        s: "Migratory arthralgia, myalgia กับ constitutional symptoms",
        ix: ["MPO, PR3-ANCA"],
        std: "ACR/EULAR 2022",
        link: "rpgn"
      }),
      N("Behcet disease", "adj", {
        s: "Oral และ genital ulcer arthritis uveitis",
        why: "AA amyloid, IgA nephropathy และ renal artery aneurysm",
        ix: ["Pathergy test"],
        std: "ICBD 2014 criteria"
      })
    ]),
    N("Infection-related", "step", {
      s: "Arthritis หลังติดเชื้อ หรือติดเชื้อเรื้อรัง",
      keys: ["ไข้", "ประวัติเจ็บคอหรือแผลผิวหนัง", "Viral exposure"]
    }, [
      N("Post-streptococcal / infection-related GN", "nephro", {
        s: "Arthralgia, edema, hematuria หลังติดเชื้อ 1-3 สัปดาห์",
        keys: ["PSGN มี latent period แต่ IRGN ในผู้ใหญ่ (เช่น staphylococcal) มักเกิดขณะยังติดเชื้ออยู่", "Low C3 ที่กลับปกติใน 8-12 สัปดาห์ ถ้าต่ำนานกว่านั้นให้คิด C3G หรือ LN"],
        ix: ["ASO, anti-DNase B, C3"],
        std: "KDIGO 2021 GN (IRGN)",
        link: "rpgn"
      }),
      N("Infective endocarditis", "nephro", {
        s: "Arthralgia, ไข้, murmur",
        ix: ["Blood culture, echo"],
        std: "2023 Duke-ISCVID",
        link: "fever"
      }),
      N("Viral: HBV, HCV, parvovirus B19, HIV", "nephro", {
        s: "Acute symmetric polyarthritis",
        why: "Parvovirus B19 ทำให้ collapsing FSGS และ aplastic crisis, HBV ทำให้ MN และ polyarteritis nodosa",
        ix: ["HBsAg, anti-HCV, parvovirus B19 IgM หรือ PCR, HIV"],
        link: "viral"
      }),
      N("Septic arthritis", "adj", {
        s: "Acute hot monoarthritis",
        why: "ผู้ป่วย HD และ KT เสี่ยง bacteremia และ gout กับ septic arthritis อยู่ร่วมกันได้ การพบ crystal จึงไม่ตัด septic arthritis",
        ix: ["Synovial WBC มักมากกว่า 50,000/µL แต่ต่ำกว่านี้ได้ใน immunosuppressed, Gram stain และ culture ทุกราย"]
      })
    ]),
    N("Others", "step", {
      s: "Arthropathy ที่เกี่ยวกับไตโดยตรง",
      keys: ["Dialysis vintage", "Hilar node", "HLA-B27"]
    }, [
      N("Dialysis-related amyloid arthropathy", "nephro", {
        s: "ปวดไหล่ทั้งสองข้าง carpal tunnel ใน dialysis นาน",
        ix: ["X-ray: bone cyst, US: rotator cuff thickening"],
        link: "bonepain"
      }),
      N("Sarcoid arthritis (Lofgren)", "nephro", {
        s: "Ankle periarthritis, erythema nodosum, bilateral hilar node",
        ix: ["CXR, Ca, ACE"],
        link: "hyperca"
      }),
      N("Spondyloarthritis / IBD arthritis", "nephro", {
        s: "Inflammatory back pain, enthesitis, uveitis",
        why: "IgA nephropathy, AA amyloid, NSAID nephropathy และ 5-ASA interstitial nephritis",
        ix: ["HLA-B27, MRI sacroiliac joint"],
        std: "ASAS 2009 axial SpA classification"
      }),
      N("Hypertrophic osteoarthropathy / hemochromatosis", "adj", {
        s: "Clubbing กับ periostitis หรือ MCP 2-3 arthropathy",
        ix: ["CXR, ferritin, transferrin saturation"]
      })
    ])
  ])
};

/* ===================== PARESTHESIA / MONONEURITIS ===================== */
TREES.numbness = {
  must: [
    "Distribution: glove-stocking, เส้นประสาทเส้นเดียว, หลายเส้นไม่สมมาตร, perioral",
    "Tempo: acute (วัน), subacute (สัปดาห์), chronic (เดือนถึงปี)",
    "Foot drop หรือ wrist drop เฉียบพลัน",
    "ปวดแสบร้อน, autonomic symptoms (orthostatic, gastroparesis, impotence)",
    "DM duration, HbA1c, dialysis adequacy",
    "ผื่น purpura, ไซนัส, หอบหืด, eosinophilia",
    "Carpal tunnel ทั้งสองข้าง, macroglossia (amyloid)",
    "ยา: metronidazole, isoniazid, nitrofurantoin, bortezomib, colchicine, statin, CNI"
  ],
  tree: N("Paresthesia / mononeuritis multiplex", "root", {
    s: "แยก pattern ก่อน: mononeuritis multiplex, length-dependent polyneuropathy, entrapment, metabolic paresthesia",
    why: "Mononeuritis multiplex ต้องคิดถึง systemic vasculitis เป็นอันดับแรก (แต่ยังเกิดจาก DM, leprosy, sarcoidosis ได้) ส่วน length-dependent polyneuropathy สาเหตุที่พบบ่อยคือ DM, uremia, amyloid และ paraprotein",
    keys: ["Asymmetric multifocal vs symmetric distal", "Motor vs sensory vs autonomic", "Tempo"],
    ix: ["NCS/EMG: axonal vs demyelinating", "Glucose, HbA1c, B12, TSH, Cr", "SPEP, IFE, sFLC", "ANCA, cryoglobulin, HBV, HCV, C3, C4", "Nerve and muscle biopsy ใน mononeuritis multiplex"],
    std: "Electrodiagnostic classification"
  }, [
    N("Mononeuritis multiplex", "step", {
      s: "เส้นประสาทหลายเส้นเสียไม่สมมาตร เป็นแบบ stepwise",
      why: "Vasculitic neuropathy ต้องได้ immunosuppression เร็วเพื่อกัน axonal loss ถาวร แต่ต้องแยกสาเหตุติดเชื้อก่อน (leprosy, HBV, HCV, HIV)",
      keys: ["Foot drop, wrist drop เฉียบพลันและปวด", "Common peroneal nerve เป็นเส้นที่เป็นบ่อยที่สุด"]
    }, [
      N("ANCA vasculitis (MPA, EGPA, GPA)", "nephro", {
        s: "Mononeuritis กับ RPGN",
        why: "EGPA มี neuropathy มากที่สุด MPA รองลงมา",
        keys: ["EGPA: asthma, sinusitis หรือ nasal polyp, eosinophil ≥ 1,000/µL (ACR/EULAR 2022, เกณฑ์เดิม ACR 1990 ใช้ > 10%)", "EGPA มี ANCA บวกเพียงราว 30 ถึง 40% (ส่วนใหญ่ MPO) ดังนั้น ANCA ลบไม่ตัด EGPA ออก", "Pauci-immune GN"],
        ix: ["MPO, PR3-ANCA, eosinophil count", "Nerve biopsy: necrotizing vasculitis"],
        std: "ACR/EULAR 2022 EGPA, MPA, GPA",
        link: "rpgn"
      }),
      N("Polyarteritis nodosa", "nephro", {
        s: "Mononeuritis, testicular pain, HTN, renal infarct",
        keys: ["ตรวจ HBsAg ทุกราย (HBV-associated PAN ปัจจุบันเป็นส่วนน้อย ส่วนใหญ่ idiopathic)", "ANCA ลบ และไม่มี glomerulonephritis (medium vessel)", "Microaneurysm ที่ renal หรือ mesenteric artery"],
        ix: ["HBsAg, angiography"],
        std: "ACR 1990 PAN"
      }),
      N("Cryoglobulinemic vasculitis", "nephro", {
        s: "Painful sensory neuropathy กับ purpura",
        ix: ["Cryoglobulin, C4, RF, HCV RNA"],
        link: "viral"
      }),
      N("Rheumatoid / lupus / Sjogren vasculitis", "nephro", {
        s: "CTD-associated vasculitic neuropathy",
        ix: ["RF, anti-CCP, ANA, anti-Ro"],
        link: "arthralgia"
      }),
      N("Diabetic mononeuropathy / amyotrophy", "nephro", {
        s: "ปวดต้นขา, proximal weakness และ weight loss ใน DM (amyotrophy) หรือ cranial หรือ limb mononeuropathy",
        why: "เป็น DDx ที่ต้องแยกจาก vasculitic neuropathy ในผู้ป่วย DKD",
        ix: ["NCS/EMG, MRI lumbosacral plexus"]
      }),
      N("Leprosy / sarcoidosis / HIV", "adj", {
        s: "Mononeuritis กับ skin lesion หรือ granuloma",
        why: "Leprosy ยังพบในไทย ทำให้ AA amyloid และ GN",
        ix: ["Slit skin smear, skin biopsy"]
      })
    ]),
    N("Length-dependent polyneuropathy", "step", {
      s: "Glove-stocking สมมาตร เริ่มที่เท้า",
      keys: ["Axonal vs demyelinating", "Autonomic involvement", "Paraprotein"]
    }, [
      N("Diabetic polyneuropathy", "nephro", {
        s: "Distal symmetric sensory loss, autonomic neuropathy",
        why: "สัมพันธ์กับ retinopathy และ DKD, autonomic neuropathy ทำให้ IDH และ orthostatic hypotension",
        ix: ["Monofilament, vibration", "HbA1c"],
        std: "ADA 2017 diabetic neuropathy position statement"
      }),
      N("Uremic neuropathy", "nephro", {
        s: "Distal sensorimotor axonal neuropathy ใน CKD G5",
        why: "Adequate dialysis ส่วนใหญ่แค่หยุดหรือชะลอการดำเนินโรค (ดีขึ้นได้บ้างและช้า) ส่วน KT ทำให้ดีขึ้นชัดเจนที่สุด",
        keys: ["Restless legs", "Burning feet", "Neuropathy ที่ลุกลามเร็วหรือ motor เด่น ให้หาสาเหตุอื่นร่วมก่อนสรุปว่าเป็น uremic"],
        ix: ["NCS, Kt/V"],
        link: "rls"
      }),
      N("AL amyloid neuropathy", "nephro", {
        s: "Painful small fiber neuropathy, autonomic failure, carpal tunnel",
        why: "AL amyloid ทำให้ nephrotic syndrome ร่วมกับ neuropathy และ orthostatic hypotension",
        keys: ["Orthostatic hypotension", "Macroglossia, periorbital purpura"],
        ix: ["sFLC, serum และ urine IFE, fat pad biopsy (ผลลบไม่ตัด amyloid ออก ให้ biopsy อวัยวะที่เป็น)", "ทุกรายต้อง typing amyloid ในชิ้นเนื้อ (mass spectrometry หรือ IHC) เพราะพบ monoclonal protein ก็ยังเป็น ATTR ร่วมกับ MGUS ได้", "ถ้าไม่พบ monoclonal protein ให้ตรวจหา ATTR (TTR genetic testing, PYP scan)"],
        std: "Mayo 2012 AL staging",
        link: "mspike"
      }),
      N("POEMS syndrome", "nephro", {
        s: "Demyelinating polyneuropathy, organomegaly, endocrinopathy, M-protein (lambda), skin change",
        why: "Kidney: MPGN-like, endotheliosis และ AKI",
        keys: ["Lambda light chain เกือบทุกราย", "Sclerotic bone lesion, VEGF สูง"],
        ix: ["Serum VEGF, IFE, skeletal survey"],
        std: "Dispenzieri 2023 POEMS criteria",
        link: "mspike"
      }),
      N("Fabry disease", "nephro", {
        s: "Acroparesthesia ปลายมือปลายเท้าตั้งแต่เด็ก, hypohidrosis, angiokeratoma",
        why: "Proteinuria, CKD, LVH, stroke ในคนอายุน้อย",
        keys: ["X-linked (หญิง heterozygous มีอาการได้)", "Cornea verticillata", "Zebra body บน EM (พบใน phospholipidosis จาก hydroxychloroquine, amiodarone ได้เช่นกัน)"],
        ix: ["Alpha-galactosidase A activity: ชายต่ำชัดเจน ส่วนหญิงปกติได้จึงตัดโรคออกไม่ได้", "GLA genetic testing ยืนยันทุกราย และจำเป็นในหญิง, lyso-Gb3"],
        std: "Fabry expert consensus",
        link: "proteinuria"
      }),
      N("Drug and toxic neuropathy", "adj", {
        s: "Metronidazole, isoniazid, nitrofurantoin, bortezomib, colchicine, alcohol",
        why: "ยาสะสมเมื่อ GFR ต่ำ เช่น nitrofurantoin และ colchicine",
        ix: ["Drug review, B6 level"]
      }),
      N("B12 deficiency / hypothyroidism / HIV", "adj", {
        s: "Polyneuropathy ที่แก้ไขได้",
        why: "Metformin และ PPI ทำให้ B12 ต่ำ",
        ix: ["B12, MMA, TSH, HIV"]
      }),
      N("CIDP / GBS", "adj", {
        s: "Demyelinating, อ่อนแรงทั้ง proximal และ distal (ไม่ใช่ length-dependent), areflexia, CSF albumino-cytologic dissociation",
        why: "Autoimmune nodopathy ที่มี anti-contactin-1 สัมพันธ์กับ membranous nephropathy ส่วน anti-neurofascin ชนิด nodal (NF186/NF140) มีรายงาน nephrotic syndrome ร่วมเป็น case series (EAN/PNS 2021 แยกกลุ่มนี้ออกจาก CIDP)",
        ix: ["NCS, CSF protein", "Anti-contactin-1"],
        std: "EAN/PNS 2021 CIDP guideline"
      })
    ]),
    N("Mononeuropathy: entrapment and access-related", "step", {
      s: "Nerve เส้นเดียวที่ตำแหน่งกดทับ หรือ neuropathy ของแขนข้างที่มี AVF หรือ AVG ซึ่งเกิดจาก ischemia",
      keys: ["Carpal tunnel", "Ulnar"]
    }, [
      N("Carpal tunnel syndrome", "nephro", {
        s: "Median nerve, แย่ลงระหว่างฟอกหรือกลางคืน",
        why: "Beta-2 microglobulin amyloid ใน dialysis นาน, AL และ ATTR amyloid, hypothyroidism, ถ้าเป็นข้างเดียวกับ AVF เกิดจาก venous hypertension หรือ steal",
        keys: ["Bilateral CTS ในชายสูงอายุ ให้คิด ATTR", "ข้างเดียวกับ AVF"],
        ix: ["NCS, US median nerve"],
        link: "bonepain"
      }),
      N("Ischemic monomelic neuropathy", "nephro", {
        s: "ปวด ชา อ่อนแรงทั้งมือทันทีหลังทำ AVF",
        why: "Emergency มักเกิดหลังทำ brachial artery-based access ในผู้ป่วย DM ต้องแก้ไขทันที (ส่วนใหญ่คือปิดหรือ ligate access) ไม่เช่นนั้น deficit ถาวร",
        keys: ["มืออุ่น radial pulse มักคลำได้ ต่างจาก steal syndrome ที่มือเย็นซีด", "เกิดภายในนาทีถึงชั่วโมงหลังผ่าตัด"],
        ix: ["Clinical, NCS"],
        std: "KDOQI 2019 vascular access",
        link: "hd-access"
      })
    ]),
    N("Metabolic paresthesia", "step", {
      s: "Perioral และปลายมือชาเป็นพัก",
      keys: ["Chvostek, Trousseau", "Hyperventilation"]
    }, [
      N("Hypocalcemia / hypomagnesemia", "nephro", {
        s: "Perioral tingling, carpopedal spasm",
        why: "สาเหตุในผู้ป่วยไต: hungry bone หลัง parathyroidectomy, cinacalcet, denosumab ใน CKD (hypocalcemia) และ Gitelman, PPI, CNI (hypomagnesemia)",
        ix: ["Ionized Ca, Mg, PO4, PTH"],
        link: "hypoca"
      }),
      N("Alkalosis / hyperventilation", "adj", {
        s: "Respiratory alkalosis ลด ionized Ca",
        ix: ["Blood gas"],
        link: "cramps"
      }),
      N("Hyperkalemia", "nephro", {
        s: "Paresthesia แล้วตามด้วย ascending weakness",
        ix: ["K, ECG"],
        link: "hyperk"
      })
    ])
  ])
};

/* ===================== HEMOPTYSIS ===================== */
TREES.hemoptysis = {
  must: [
    "ปริมาณเลือด (massive นิยามต่างกันตั้งแต่ 100 ถึง 600 mL ต่อ 24 ชั่วโมง ที่สำคัญกว่าปริมาณคือ airway หรือ gas exchange ถูกคุกคาม), เลือดมาจากปอดจริงหรือมาจากจมูกหรือ GI",
    "ไข้, ไอเรื้อรัง, น้ำหนักลด, TB contact",
    "Hematuria, edema, ปัสสาวะออกน้อย (pulmonary-renal)",
    "ไซนัส, เลือดกำเดา, หูอื้อ, ข้อ, ผื่น",
    "สูบบุหรี่, สัมผัส hydrocarbon หรือสารระเหย",
    "Anticoagulant, antiplatelet, heparin ระหว่างฟอก",
    "Exposure น้ำท่วม ทำนา (leptospirosis)",
    "Leg swelling, nephrotic (PE)"
  ],
  tree: N("Hemoptysis", "root", {
    s: "ยืนยันว่าเลือดมาจากทางเดินหายใจ แล้วแยก DAH กับ focal bleeding",
    why: "Hemoptysis กับ AKI ต้องคิดถึง pulmonary-renal syndrome ก่อน และส่ง ANCA กับ anti-GBM แบบด่วน (ขอผลภายใน 24 ชั่วโมง) แต่ยังต้องแยก volume overload, infection เช่น leptospirosis และ PE",
    keys: ["Massive vs non-massive", "Diffuse alveolar infiltrate vs focal lesion", "Hb ลดลง", "Active urine sediment"],
    ix: ["CBC, coagulation, Cr, UA with microscopy", "CXR แล้ว CT chest", "MPO, PR3-ANCA, anti-GBM, ANA, C3, C4", "Bronchoscopy with BAL"],
    std: "Pulmonary-renal syndrome workup"
  }, [
    N("Diffuse alveolar hemorrhage with GN", "step", {
      s: "Bilateral infiltrate, Hb ลด, hypoxemia, active sediment",
      keys: ["ไม่มี hemoptysis ได้ถึง 1 ใน 3 ของ DAH จึงตัด DAH ออกไม่ได้", "BAL: return เป็นเลือดเข้มขึ้นใน aliquot ถัดไป"],
      ix: ["BAL hemosiderin-laden macrophage > 20%"]
    }, [
      N("ANCA-associated vasculitis", "nephro", {
        s: "สาเหตุที่พบบ่อยที่สุดของ pulmonary-renal syndrome",
        keys: ["MPO-ANCA เด่นใน MPA และ PR3-ANCA เด่นใน GPA แต่ไขว้กันได้", "ANCA ลบพบได้ราว 10% ของ pauci-immune GN จึงตัดโรคออกไม่ได้", "ENT, mononeuritis"],
        ix: ["Antigen-specific ANCA immunoassay (MPO, PR3)", "Kidney biopsy (ไม่รอผลถ้าอาการรุนแรงและ serology ชัด ให้เริ่มรักษาก่อนได้)"],
        std: "KDIGO 2024 ANCA vasculitis (PLEX พิจารณาใน DAH ที่ hypoxemia หรือ Cr > 3.4 mg/dL, dialysis-requiring หรือ Cr ขึ้นเร็ว)",
        link: "rpgn"
      }),
      N("Anti-GBM disease (Goodpasture)", "nephro", {
        s: "DAH กับ RPGN, สูบบุหรี่",
        keys: ["Linear IgG ตาม GBM", "Double positive กับ ANCA (ส่วนใหญ่ MPO) ราว 1 ใน 3"],
        ix: ["Anti-GBM immunoassay (ผลลบพบได้ในส่วนน้อย ราว 10% จึงไม่ตัดโรค) และ kidney biopsy"],
        std: "KDIGO 2021 GN guideline (anti-GBM) (PLEX ทุกรายยกเว้น dialysis-dependent ที่ crescent 100% และไม่มี DAH)",
        link: "rpgn"
      }),
      N("SLE / APS", "nephro", {
        s: "DAH ใน SLE มักเกิดร่วมกับ active LN (ส่วนใหญ่ class III หรือ IV) แต่ไม่มี LN ก็เกิดได้",
        ix: ["Anti-dsDNA, C3, C4, aPL"],
        link: "rpgn"
      }),
      N("IgA vasculitis / cryoglobulinemia", "nephro", {
        s: "DAH พบน้อยแต่รุนแรง",
        ix: ["Skin biopsy, cryoglobulin"],
        link: "arthralgia"
      }),
      N("Drug-induced ANCA vasculitis (PTU, hydralazine, levamisole)", "nephro", {
        s: "มักมี MPO-ANCA titer สูง มักมี ANA หรือ anti-histone บวกร่วม และดีขึ้นเมื่อหยุดยา",
        ix: ["MPO, ANA, anti-histone, drug history"],
        link: "ent"
      })
    ]),
    N("Hemoptysis or DAH without GN", "step", {
      s: "Alveolar hemorrhage หรือ hemoptysis ที่ไม่มี GN: infection, bleeding diathesis และ hemodynamic cause (AKI มีร่วมได้แต่ urine sediment ไม่ active)",
      keys: ["Coagulopathy", "Volume overload", "Infection"]
    }, [
      N("Leptospirosis", "nephro", {
        s: "ไข้, AKI, jaundice, pulmonary hemorrhage",
        why: "Pulmonary-renal mimic จาก infection ที่ต้องแยกก่อนให้ immunosuppression, AKI เป็น TIN หรือ ATN (มัก nonoliguric และ K ต่ำ) ไม่ใช่ GN",
        ix: ["PCR ในสัปดาห์แรก, MAT หรือ IgM หลังสัปดาห์แรก (ผลลบช่วงต้นไม่ตัดออก)"],
        link: "fever"
      }),
      N("Uremic platelet dysfunction / anticoagulation", "nephro", {
        s: "Bleeding ใน CKD ที่ได้ heparin หรือ antiplatelet",
        ix: ["Platelet count, coagulation"],
        link: "bleeding"
      }),
      N("Pulmonary edema / mitral stenosis", "adj", {
        s: "Pink frothy sputum",
        ix: ["Echo, NT-proBNP"],
        link: "dyspnea"
      }),
      N("Thrombocytopenia: TTP, ITP, DIC", "nephro", {
        s: "TTP, ITP และ DIC: platelet ต่ำมากและเลือดออก ส่วน HIT platelet ต่ำปานกลางและเด่นที่ thrombosis จึงทำให้ hemoptysis ผ่าน PE ไม่ใช่จากเลือดออกเอง",
        ix: ["Smear, PT, aPTT, fibrinogen, ADAMTS13, HIT antibody เมื่อสงสัย PE หลังได้ heparin"],
        link: "tma"
      })
    ]),
    N("Focal source", "step", {
      s: "Lesion ตำแหน่งเดียวบน CT",
      keys: ["Cavity", "Mass", "Bronchiectasis"]
    }, [
      N("Tuberculosis", "nephro", {
        s: "Cavity ที่ upper lobe, ไข้ต่ำๆ",
        why: "TB พบบ่อยในไทยอยู่แล้ว และพบมากขึ้นอีกใน CKD, HD และ KT ต้องแยกออกก่อนให้ immunosuppression",
        ix: ["Sputum AFB, Xpert MTB/RIF, culture (ผลลบไม่ตัดออก ถ้ายังสงสัยให้ทำ bronchoscopy)"],
        link: "cough"
      }),
      N("GPA nodule / cavity", "nephro", {
        s: "Multiple cavitating nodules กับ ENT",
        ix: ["PR3-ANCA, biopsy"],
        link: "cough"
      }),
      N("Fungal / nocardia in immunosuppressed", "nephro", {
        s: "Invasive aspergillosis, mucormycosis, nocardia ใน KT หรือผู้ได้ immunosuppression อื่น (steroid ขนาดสูง, cyclophosphamide, rituximab)",
        ix: ["Galactomannan, BAL culture, biopsy"],
        link: "kt-fever"
      }),
      N("Lung cancer", "adj", {
        s: "สูบบุหรี่, อายุมาก, mass บน imaging",
        why: "Paraneoplastic MN, SIADH, PTHrP hypercalcemia",
        ix: ["CT, bronchoscopy biopsy"],
        link: "hypona"
      }),
      N("Bronchiectasis / pneumonia / lung abscess", "adj", {
        s: "Chronic purulent sputum",
        why: "Bronchiectasis เรื้อรังทำให้เกิด AA amyloid ได้",
        ix: ["HRCT, sputum culture"]
      }),
      N("Pulmonary embolism / infarct", "adj", {
        s: "Pleuritic chest pain, hemoptysis ปริมาณน้อย",
        why: "Nephrotic syndrome โดยเฉพาะ MN เพิ่มความเสี่ยง VTE และ renal vein thrombosis เป็นแหล่งของ embolus ได้",
        ix: ["CTPA หรือ V/Q"],
        std: "ESC 2019 PE",
        link: "thrombosis"
      })
    ]),
    N("Pseudohemoptysis", "step", {
      s: "เลือดมาจากจมูกหรือ GI",
      keys: ["Epistaxis ไหลลงคอ", "Hematemesis: pH เป็นกรด สีคล้ำ มีเศษอาหาร ส่วน hemoptysis pH เป็นด่าง สีแดงสด เป็นฟอง"]
    }, [
      N("Epistaxis from GPA or uremic bleeding", "nephro", {
        s: "Nasal crusting, saddle nose",
        ix: ["ENT examination"],
        link: "ent"
      }),
      N("Upper GI bleeding", "adj", {
        s: "Coffee ground, melena",
        ix: ["EGD"],
        link: "gibleed"
      })
    ])
  ])
};

/* ===================== CHRONIC COUGH / NODULES ===================== */
TREES.cough = {
  must: [
    "ระยะเวลา (> 8 สัปดาห์ = chronic), sputum, เลือด",
    "ACEi ที่เริ่มเมื่อไร (cough เกิดได้ตั้งแต่สัปดาห์แรกถึงหลายเดือน)",
    "Post-nasal drip, GERD, asthma",
    "สูบบุหรี่, อาชีพ, สัตว์เลี้ยง, ฝุ่น",
    "ไข้, น้ำหนักลด, TB contact, HIV risk",
    "ไซนัส, หูอื้อ, ตาแดง, ผื่น, ปวดข้อ",
    "Immunosuppression: KT, cyclophosphamide, rituximab, steroid",
    "Hematuria, proteinuria, Cr สูง"
  ],
  tree: N("Chronic cough / pulmonary nodules", "root", {
    s: "แยก common causes ของ chronic cough ออกก่อน แล้วไล่ nodule หรือ cavity หรือ interstitial pattern ที่โยงกับไต",
    why: "Nodule ร่วมกับ kidney disease ให้คิดถึง GPA, sarcoidosis, TB, fungal infection และ malignancy ที่มี paraneoplastic GN",
    keys: ["CXR ปกติหรือผิดปกติ", "Nodule: solitary vs multiple, cavitating", "Hilar lymphadenopathy", "Host immunosuppression"],
    ix: ["CXR แล้ว CT chest", "Sputum AFB, Xpert, fungal culture", "ANCA, serum ACE, Ca", "PFT", "Bronchoscopy หรือ CT-guided biopsy"],
    std: "ACCP 2018 chronic cough guideline, Fleischner 2017 nodule guideline (ใช้กับ incidental nodule ในผู้ใหญ่อายุ 35 ปีขึ้นไปเท่านั้น ไม่ใช้กับผู้ป่วย immunosuppressed หรือมีมะเร็งอยู่เดิม)"
  }, [
    N("Common causes with normal CXR", "step", {
      s: "UACS, asthma, GERD, ACEi",
      keys: ["CXR ปกติ", "ไม่สูบบุหรี่"]
    }, [
      N("ACE inhibitor cough", "nephro", {
        s: "Dry cough หลังเริ่ม ACEi",
        why: "เกิดจาก bradykinin สะสม ไม่ขึ้นกับ dose เปลี่ยนเป็น ARB ได้ ส่วน angioedema จาก ACEi เป็นข้อห้ามใช้ ACEi ต่อ",
        keys: ["หายใน 1-4 สัปดาห์หลังหยุด (บางรายนานถึง 3 เดือน)", "พบมากในคนเอเชีย"],
        ix: ["Trial stop ACEi"],
        std: "ACCP 2006 cough guideline"
      }),
      N("Upper airway cough / asthma / GERD", "adj", {
        s: "Common triad ของ chronic cough",
        why: "Late-onset asthma ที่มี eosinophilia และ sinusitis ให้คิด EGPA",
        ix: ["Spirometry with bronchodilator, FeNO, eosinophil count"],
        link: "ent"
      })
    ]),
    N("Nodules / cavities", "step", {
      s: "Multiple หรือ cavitating nodules",
      keys: ["Cavity", "Halo sign", "Distribution"]
    }, [
      N("Granulomatosis with polyangiitis", "nephro", {
        s: "Multiple cavitating nodules, sinusitis, RPGN",
        keys: ["Saddle nose, otitis", "ANCA บวกราว 90% ใน generalized GPA ส่วนใหญ่เป็น PR3 (MPO พบได้ราว 1 ใน 5 และมากกว่านั้นในเอเชีย) ส่วน limited GPA ANCA ลบได้บ่อย จึงตัดโรคออกไม่ได้", "Subglottic stenosis"],
        ix: ["PR3-ANCA, MPO-ANCA", "CT chest, biopsy: necrotizing granulomatous inflammation"],
        std: "ACR/EULAR 2022 GPA, KDIGO 2024 ANCA vasculitis",
        link: "rpgn"
      }),
      N("Tuberculosis / NTM", "nephro", {
        s: "Upper lobe cavity, tree-in-bud",
        why: "TB reactivation ใน KT และ HD, และ AA amyloid จาก TB เรื้อรัง",
        ix: ["Sputum AFB x3, Xpert MTB/RIF Ultra, culture"],
        std: "WHO consolidated TB guidelines",
        link: "fever"
      }),
      N("Fungal / nocardia", "nephro", {
        s: "Nodule with halo sign ใน immunosuppressed",
        why: "Aspergillus, Cryptococcus, Nocardia ใน KT และหลัง rituximab",
        ix: ["Serum galactomannan (sensitivity ต่ำในผู้ป่วย non-neutropenic เช่น KT ผลลบไม่ตัดออก ให้ส่ง BAL galactomannan), cryptococcal antigen, BAL culture, biopsy"],
        link: "kt-fever"
      }),
      N("Septic emboli", "nephro", {
        s: "Multiple peripheral nodules ที่ cavitate จาก bacteremia เช่น HD catheter infection หรือ right-sided endocarditis",
        ix: ["Blood culture, echo"],
        link: "hd-fever"
      }),
      N("Rheumatoid nodules / sarcoid nodules", "adj", {
        s: "Nodule ใน RA หรือ sarcoidosis",
        ix: ["RF, anti-CCP, biopsy"]
      })
    ]),
    N("Hilar lymphadenopathy / interstitial", "step", {
      s: "Bilateral hilar node หรือ reticular pattern",
      keys: ["Hypercalcemia", "Uveitis", "Skin"]
    }, [
      N("Sarcoidosis", "nephro", {
        s: "Bilateral hilar lymphadenopathy, dry cough",
        why: "Granulomatous TIN, hypercalcemia, nephrocalcinosis",
        keys: ["PTH ต่ำ 1,25D สูง", "Uveitis, erythema nodosum"],
        ix: ["Ca, 24-h urine Ca, 1,25D, serum ACE (sensitivity และ specificity ต่ำ และถูกกดด้วย ACEi)", "EBUS-TBNA: non-caseating granuloma ซึ่งไม่จำเพาะ ต้องแยก TB และ fungal infection ก่อนวินิจฉัย"],
        std: "ATS 2020 sarcoidosis",
        link: "hyperca"
      }),
      N("MPO-ANCA with ILD", "nephro", {
        s: "UIP หรือ fibrotic ILD ก่อนหรือพร้อม GN",
        ix: ["ส่ง ANCA (MPO, PR3) ใน fibrotic ILD หรือ UIP ที่ยังไม่ทราบสาเหตุเมื่อมี hematuria, proteinuria, eGFR ลด หรืออาการ systemic (ATS/ERS/JRS/ALAT 2018 ให้ส่งเป็นรายกรณี ไม่ใช่ routine ทุกราย) และ MPO-ANCA บวกใน ILD ต้องติดตาม UA กับ creatinine ต่อเนื่องเพราะ MPA เกิดตามหลังได้", "HRCT"],
        link: "dyspnea"
      }),
      N("Lymphoma / IgG4-RD", "nephro", {
        s: "Mediastinal node กับ systemic disease",
        ix: ["PET/CT, biopsy, serum IgG4"],
        link: "lymphnode"
      })
    ]),
    N("Malignancy", "step", {
      s: "Solitary mass หรือ multiple metastasis",
      keys: ["สูบบุหรี่", "อายุ > 50", "Paraneoplastic"]
    }, [
      N("Lung cancer with paraneoplastic renal syndrome", "nephro", {
        s: "Mass กับ MN, SIADH, hypercalcemia หรือ ectopic ACTH",
        why: "Paraneoplastic: MN (พบบ่อยที่สุด), MCD (น้อย), SIADH และ ectopic ACTH ซึ่งทำให้ hypokalemic alkalosis (small cell), PTHrP hypercalcemia (squamous cell)",
        ix: ["CT, PET/CT, biopsy", "Na, urine osmolality, Ca, PTHrP"],
        std: "Fleischner 2017, NCCN",
        link: "hypona"
      }),
      N("Metastatic RCC", "nephro", {
        s: "Cannonball lung metastases กับ renal mass",
        ix: ["CT chest-abdomen"],
        link: "flank"
      })
    ]),
    N("Drug or KT-related", "step", {
      s: "Cough ใน KT หรือผู้ได้ immunosuppression: คิดสาเหตุกลุ่มนี้เพิ่มจากสาเหตุทั่วไปข้างต้นซึ่งยังพบได้เหมือนคนทั่วไป",
      keys: ["ได้ mTOR inhibitor หรือไม่", "ได้ PJP prophylaxis อยู่หรือหยุดไปแล้ว"]
    }, [
      N("mTOR inhibitor pneumonitis", "nephro", {
        s: "Dry cough, ไข้, ground-glass หรือ organizing pneumonia pattern หลังเริ่ม sirolimus หรือ everolimus (เกิดได้ตั้งแต่สัปดาห์ถึงหลายปี)",
        ix: ["HRCT, BAL เพื่อแยก infection ก่อน เพราะเป็น diagnosis of exclusion"],
        link: "kt-fever"
      }),
      N("PJP / CMV pneumonitis", "nephro", {
        s: "Dry cough, exertional hypoxemia",
        ix: ["Beta-D-glucan, BAL PCR, CMV QNAT"],
        std: "AST IDCOP 2019",
        link: "kt-fever"
      })
    ])
  ])
};

/* ===================== CHEST PAIN / PERICARDITIS ===================== */
TREES.chestpain = {
  must: [
    "ลักษณะปวด: pressure, pleuritic, positional (ดีขึ้นเมื่อนั่งโน้มตัวไปข้างหน้า), tearing ร้าวไปหลัง",
    "ระยะเวลา, exertional หรือ rest, สัมพันธ์กับการฟอกเลือด",
    "Dialysis adequacy, ขาดฟอก, BUN ก่อนเริ่มฟอก",
    "ไข้, ผื่น, ปวดข้อ, serositis อื่น",
    "BP ทั้งสองแขน, ประวัติ HTN ควบคุมไม่ได้, Marfan, ADPKD",
    "Leg swelling, nephrotic, immobilization",
    "TB contact, HIV, viral prodrome",
    "Cocaine หรือ amphetamine"
  ],
  tree: N("Chest pain / pericarditis", "root", {
    s: "ตัด life-threatening 5 อย่างก่อน (ACS, dissection, PE, tamponade, tension pneumothorax) แล้วแยก pericardial, pleural และ musculoskeletal",
    why: "ใน CKD ACS มักไม่มีอาการ typical และ troponin สูงเรื้อรัง ส่วน uremic pericarditis เป็นข้อบ่งชี้เริ่มหรือเพิ่ม dialysis",
    keys: ["ECG ทุกราย", "Pericardial rub, pulsus paradoxus", "BP ต่างกันสองแขน > 20 mmHg", "Troponin ต้องดู delta ไม่ใช่ค่าเดียว"],
    ix: ["ECG, hs-troponin serial", "CXR, echocardiography", "D-dimer และ CTPA ตาม pretest", "CTA aorta ถ้าสงสัย dissection"],
    std: "ESC 2023 ACS guideline, ESC 2025 myocarditis and pericarditis guideline"
  }, [
    N("Pericardial", "step", {
      s: "Positional pleuritic pain, rub, effusion",
      keys: ["Diffuse ST elevation กับ PR depression", "Effusion บน echo", "CRP สูง"],
      std: "ESC 2025 myocarditis and pericarditis guideline: clinical presentation ที่เข้าได้ (chest pain) ร่วมกับ additional criteria (rub, ECG change, CRP สูง, effusion ใหม่หรือเพิ่มขึ้น, CMR พบ pericardial edema หรือ LGE) มากกว่า 1 ข้อ = definite, 1 ข้อ = possible (เกณฑ์ 2 ใน 4 เป็นของ ESC 2015)"
    }, [
      N("Uremic pericarditis", "nephro", {
        s: "Pericarditis ก่อนเริ่ม dialysis หรือภายใน 8 สัปดาห์แรก",
        why: "เป็นข้อบ่งชี้เริ่ม dialysis ทันที",
        keys: ["BUN มักสูงกว่า 60 mg/dL", "ECG มักไม่มี diffuse ST elevation เพราะการอักเสบมักไม่ลุกลามถึง myocardium ใต้ epicardium ดังนั้น ECG ปกติไม่ตัด uremic pericarditis", "Hemorrhagic effusion"],
        ix: ["Echo, BUN"],
        std: "KDIGO 2024 CKD (indications for dialysis)"
      }),
      N("Dialysis-associated pericarditis", "nephro", {
        s: "Pericarditis ใน maintenance dialysis",
        why: "สะท้อน under-dialysis, volume overload หรือ infection ต้องเพิ่ม dialysis โดยไม่ใช้ heparin",
        keys: ["IDH ที่เพิ่งเกิดใหม่ให้สงสัย tamponade", "Kt/V ต่ำ, ขาดฟอก"],
        ix: ["Echo, Kt/V, TB workup"],
        link: "hd-idh"
      }),
      N("Lupus / autoimmune serositis", "nephro", {
        s: "Pericarditis ร่วมกับ pleuritis ผื่น arthritis",
        why: "Serositis เป็น domain ใน classification และอาจมาพร้อม LN จึงตรวจ UA และ UPCR ทุกราย",
        ix: ["ANA, anti-dsDNA, C3, C4"],
        link: "rpgn"
      }),
      N("Tuberculous pericarditis", "nephro", {
        s: "Subacute effusion ไข้ต่ำๆ constrictive physiology",
        why: "พบบ่อยใน HD, KT และ HIV ในประเทศไทย",
        keys: ["Large effusion", "Lymphocytic exudate"],
        ix: ["Pericardial fluid ADA ≥ 40 U/L, Xpert, culture (Xpert และ culture ลบไม่ตัด TB pericarditis)", "Pericardial biopsy"],
        std: "WHO TB guidelines"
      }),
      N("Viral / idiopathic / post-MI", "adj", {
        s: "Acute pericarditis หลัง viral prodrome",
        why: "สาเหตุที่พบบ่อยที่สุดในคนทั่วไป แต่ในไทยต้องตัด TB ก่อนสรุปว่า idiopathic, ใน CKD เลี่ยง NSAID และ colchicine ต้องลดขนาดตาม eGFR (dialysis ขับ colchicine ไม่ออก ใช้อย่างระวังมาก)",
        ix: ["CRP, troponin"],
        std: "ESC 2025 myocarditis and pericarditis guideline (colchicine dose adjustment ตาม eGFR)"
      }),
      N("Malignant / radiation / uremic hemorrhagic tamponade", "adj", {
        s: "Large effusion ที่ recurrent",
        ix: ["Pericardiocentesis cytology"],
        link: "dyspnea"
      })
    ]),
    N("Ischemic", "step", {
      s: "Pressure-like pain, exertional, ECG หรือ troponin dynamic",
      keys: ["CKD มี silent ischemia บ่อย", "Type 2 MI ระหว่าง IDH หรือ anemia"]
    }, [
      N("ACS in CKD", "nephro", {
        s: "CKD มี CAD risk สูง และอาการ atypical",
        why: "Contrast-associated AKI risk, ปรับยา antithrombotic ตาม eGFR, ISCHEMIA-CKD (n = 777) ไม่พบประโยชน์ของ invasive strategy ใน stable CAD กับ advanced CKD (ผลนี้ไม่ครอบคลุม ACS)",
        keys: ["Delta troponin > 20% จาก baseline สูงเรื้อรัง", "Dyspnea เป็น anginal equivalent"],
        ix: ["Serial hs-troponin, ECG, echo", "Coronary angiography ตามข้อบ่งชี้ ใช้ iso-osmolar หรือ low-osmolar contrast ปริมาณน้อยที่สุด"],
        std: "ESC 2023 ACS, ISCHEMIA-CKD (NEJM 2020)"
      }),
      N("Demand ischemia: IDH, anemia, tachyarrhythmia", "nephro", {
        s: "Chest pain ระหว่างฟอก",
        why: "Myocardial stunning จาก UF rate สูง",
        keys: ["UF rate > 10-13 mL/kg/h", "Hb ต่ำ"],
        ix: ["ECG ระหว่างอาการ, Hb"],
        std: "KDOQI 2015 HD adequacy",
        link: "hd-idh"
      }),
      N("Coronary vasculitis / Kawasaki / SLE / APS", "adj", {
        s: "MI ในคนอายุน้อยที่มี systemic disease",
        ix: ["aPL, ANA, coronary CTA"]
      })
    ]),
    N("Aortic / vascular", "step", {
      s: "Tearing pain ร้าวหลัง, pulse deficit",
      keys: ["BP แขนสองข้างต่างกัน", "Aortic regurgitation murmur ใหม่"]
    }, [
      N("Aortic dissection", "nephro", {
        s: "Tearing chest pain, AKI หรือ flank pain จาก renal artery involvement",
        why: "Risk factor: HTN ควบคุมไม่ได้, ADPKD, Marfan, pregnancy และ cocaine (ไม่มี risk factor ไม่ตัด dissection)",
        keys: ["Renal malperfusion (อาจเป็นข้างเดียว) ทำให้ AKI หรือ renal infarction", "Mediastinal widening (CXR ปกติหรือ BP สองแขนเท่ากันไม่ตัด dissection)"],
        ix: ["CTA aorta (ใช้แม้ eGFR ต่ำเพราะ life-threatening)", "TEE"],
        std: "ACC/AHA 2022 aortic disease guideline"
      }),
      N("Pulmonary embolism", "adj", {
        s: "Pleuritic pain, dyspnea, tachycardia",
        why: "Nephrotic syndrome ทุกสาเหตุเพิ่ม risk VTE (สูงสุดใน MN และเมื่อ albumin ต่ำมาก) และ RVT เป็นแหล่ง embolus ได้",
        ix: ["Wells, CTPA หรือ V/Q"],
        std: "ESC 2019 PE",
        link: "thrombosis"
      })
    ]),
    N("Pleural / chest wall / GI", "step", {
      s: "Pleuritic หรือ reproducible pain",
      keys: ["Point tenderness", "สัมพันธ์กับการกิน"]
    }, [
      N("Pleuritis: lupus, uremic, TB, parapneumonic", "nephro", {
        s: "Pleuritic pain กับ effusion",
        ix: ["Pleural fluid, Light criteria"],
        link: "dyspnea"
      }),
      N("Rib fracture / renal osteodystrophy / costochondritis", "nephro", {
        s: "ปวดเฉพาะจุดที่ซี่โครง",
        why: "Fragility fracture ใน CKD-MBD, osteomalacia และ myeloma",
        ix: ["X-ray, bone scan, SPEP"],
        link: "bonepain"
      }),
      N("Esophagitis / PUD / herpes zoster", "adj", {
        s: "Burning, dysphagia, dermatomal rash",
        why: "Zoster พบบ่อยใน KT และ CKD, CMV esophagitis ใน KT",
        ix: ["EGD, PCR จากแผล"]
      })
    ])
  ])
};

/* ===================== PALPITATIONS / ARRHYTHMIA ===================== */
TREES.palpitation = {
  must: [
    "Regular หรือ irregular, เร็วหรือช้า, onset และ offset ทันทีหรือค่อยๆ",
    "สัมพันธ์กับช่วงฟอกเลือด (ต้นรอบหลัง long interdialytic interval, ท้ายรอบ)",
    "Syncope, chest pain, dyspnea",
    "ยา: QT-prolonging, digoxin, K binder, diuretic, beta-agonist, thyroxine, decongestant",
    "Dialysate K และ Ca ที่ใช้",
    "Heat intolerance, tremor, weight loss",
    "Paroxysmal headache กับ sweating",
    "Family history ของ sudden death, Fabry, amyloid"
  ],
  tree: N("Palpitations / arrhythmia", "root", {
    s: "พยายามบันทึก ECG ขณะมีอาการให้ได้ แล้วแยกสาเหตุเป็น electrolyte, endocrine, structural และ drug",
    why: "ผู้ป่วย HD มี sudden cardiac death สูง โดยเฉพาะหลัง long interdialytic interval และช่วงที่ K เปลี่ยนเร็ว",
    keys: ["Heart rate และ rhythm", "QTc", "Electrolyte ณ เวลาที่มีอาการ", "Structural heart disease"],
    ix: ["12-lead ECG, Holter หรือ event monitor", "K, Mg, Ca, PO4, TSH", "Echocardiography", "Drug level: digoxin"],
    std: "EHRA 2011 palpitations position paper, ESC 2024 AF guideline"
  }, [
    N("Electrolyte-driven", "step", {
      s: "Arrhythmia ที่แก้ได้ด้วยการแก้ electrolyte",
      keys: ["Peaked T, wide QRS", "U wave", "Long QT"]
    }, [
      N("Hyperkalemia", "nephro", {
        s: "Bradycardia, heart block, wide QRS, sine wave",
        why: "ECG ไม่ได้สัมพันธ์กับระดับ K เสมอไป ผู้ป่วย CKD อาจไม่มี ECG change แม้ K สูง",
        keys: ["Peaked T, PR ยาว, P หาย, QRS กว้าง", "BRASH syndrome: bradycardia, renal failure, AV nodal blocker, shock, hyperkalemia"],
        ix: ["K (ตัด pseudohyperkalemia), ECG", "Drug: RAASi, beta-blocker, non-DHP CCB"],
        std: "KDIGO 2020 potassium controversies conference",
        link: "hyperk"
      }),
      N("Hypokalemia / hypomagnesemia", "nephro", {
        s: "PVC, VT, torsades",
        why: "K ต่ำจาก dialysate K ต่ำ, diuretic, Gitelman ส่วน Mg ต่ำจาก PPI, CNI, diuretic",
        keys: ["U wave, ST depression", "Refractory hypokalemia จนกว่าจะแก้ Mg"],
        ix: ["K, Mg, urine K และ Mg"],
        link: "hypok"
      }),
      N("Hypocalcemia / dialysate shifts", "nephro", {
        s: "Long QT จาก Ca ต่ำ",
        why: "Low Ca dialysate และ cinacalcet ทำให้ QT ยาว, dialysate K < 2 mEq/L สัมพันธ์กับ sudden death",
        ix: ["Ionized Ca, QTc, dialysate prescription"],
        std: "KDOQI 2015 HD adequacy",
        link: "hypoca"
      })
    ]),
    N("Endocrine / sympathetic", "step", {
      s: "Sinus tachycardia หรือ AF กับ hypermetabolism",
      keys: ["Tremor", "Paroxysmal symptoms", "Weight loss"]
    }, [
      N("Thyrotoxicosis", "adj", {
        s: "AF, sinus tachycardia",
        why: "แง่มุมทางไต: thyrotoxic periodic paralysis (hypokalemia จาก intracellular shift) และ hypercalciuria",
        ix: ["TSH, FT4, FT3"],
        link: "weakness"
      }),
      N("Pheochromocytoma / paraganglioma", "adj", {
        s: "Paroxysmal tachycardia, sweating, HTN",
        ix: ["Plasma free metanephrine"],
        link: "paroxysm"
      }),
      N("Hypoglycemia", "nephro", {
        s: "Adrenergic symptoms ใน DM ที่ eGFR ลดลง",
        why: "Insulin และ sulfonylurea clearance ลดลงใน CKD",
        ix: ["Capillary glucose"],
        link: "paroxysm"
      }),
      N("Anemia / volume depletion", "nephro", {
        s: "Compensatory sinus tachycardia",
        ix: ["CBC, orthostatic vital signs"],
        link: "syncope"
      })
    ]),
    N("Structural / infiltrative", "step", {
      s: "Arrhythmia กับ structural heart disease",
      keys: ["LVH", "Low voltage", "Conduction disease"]
    }, [
      N("Atrial fibrillation in CKD / HD", "nephro", {
        s: "AF พบบ่อยใน HD และเพิ่ม stroke และ bleeding",
        why: "Anticoagulation ใน dialysis ยังไม่มีข้อสรุป และ warfarin เป็น risk factor ของ calciphylaxis",
        keys: ["CHA2DS2-VA และ bleeding risk", "Warfarin-related nephropathy"],
        ix: ["ECG, echo, TSH"],
        std: "ESC 2024 AF guideline, KDIGO 2018 arrhythmia in CKD conference"
      }),
      N("Uremic cardiomyopathy / LVH", "nephro", {
        s: "LVH, fibrosis, ventricular arrhythmia",
        ix: ["Echo, cardiac MRI (native T1 ไม่ต้องใช้ contrast, ถ้าจำเป็นต้องใช้ gadolinium ใน eGFR < 30 หรือ dialysis ให้เลือก group II agent)"]
      }),
      N("Cardiac amyloidosis", "nephro", {
        s: "AF, conduction block กับ low voltage และ LV หนา",
        ix: ["sFLC, serum และ urine IFE ก่อน, Tc-PYP scan (แปลผลว่า ATTR ได้เมื่อไม่พบ monoclonal protein เท่านั้น, low voltage ไม่พบทุกราย)"],
        link: "mspike"
      }),
      N("Fabry cardiomyopathy", "nephro", {
        s: "Short PR, LVH, bradyarrhythmia ในคนอายุน้อยที่มี proteinuria",
        ix: ["Alpha-galactosidase A activity (ในผู้หญิง enzyme ปกติได้ ต้องตรวจ GLA gene), cardiac MRI พบ native T1 ต่ำ"],
        link: "numbness"
      }),
      N("Sarcoid / myocarditis / SLE", "adj", {
        s: "Heart block ในคนอายุน้อย",
        ix: ["Cardiac MRI, FDG-PET"],
        link: "hyperca"
      })
    ]),
    N("Drug-related", "step", {
      s: "Arrhythmia จากยาที่สะสมใน CKD",
      keys: ["QTc > 500 ms", "Bradycardia กับยาหลายตัว"]
    }, [
      N("Digoxin toxicity", "nephro", {
        s: "Bradycardia, bidirectional VT, nausea, visual change",
        why: "Digoxin ขับทางไต และ hypokalemia เพิ่ม toxicity",
        ix: ["Digoxin level (เจาะหลังให้ยาอย่างน้อย 6 ชั่วโมง), K"]
      }),
      N("QT-prolonging drugs", "adj", {
        s: "Fluoroquinolone, macrolide, ondansetron, antipsychotic, methadone",
        why: "Electrolyte ผิดปกติใน CKD เพิ่ม risk torsades",
        ix: ["QTc, K, Mg, Ca"]
      }),
      N("Beta-blocker / non-DHP CCB accumulation", "nephro", {
        s: "Bradycardia ใน CKD",
        why: "Atenolol และ sotalol สะสมใน CKD, BRASH syndrome",
        ix: ["ECG, K"]
      })
    ])
  ])
};

/* ===================== SYNCOPE / ORTHOSTATIC ===================== */
TREES.syncope = {
  must: [
    "Loss of consciousness จริงไหม, prodrome, ท่าทาง (ยืน, หลังปัสสาวะ, ไอ)",
    "เกิดระหว่างหรือหลังฟอก, UF volume, dry weight เปลี่ยน",
    "Palpitation, chest pain, exertional syncope",
    "Orthostatic dizziness, gastroparesis, constipation สลับท้องเสีย, impotence",
    "Polyuria, salt craving, ท้องเสีย, อาเจียน",
    "ยา: antihypertensive, alpha-blocker, diuretic, SGLT2i, nitrate, insulin",
    "Steroid ที่หยุดไป, ICI",
    "Family history ของ sudden death หรือ tubulopathy"
  ],
  tree: N("Syncope / orthostatic hypotension", "root", {
    s: "แยก reflex, orthostatic และ cardiac syncope แล้วไล่ orthostatic ต่อว่าเกิดจาก volume, autonomic, adrenal หรือ drug",
    why: "Orthostatic hypotension เป็นทางเข้าของ salt-wasting tubulopathy, AL amyloid, diabetic autonomic neuropathy และ adrenal insufficiency",
    keys: ["Orthostatic: SBP ลด ≥ 20 หรือ DBP ลด ≥ 10 mmHg ใน 3 นาที", "HR เพิ่มน้อย (< 15/นาที) ทั้งที่ BP ตก บ่งไปทาง neurogenic (แปลผลไม่ได้ถ้าได้ beta-blocker หรือมี pacemaker)", "HR เพิ่มมาก ชี้ hypovolemia", "Cardiac red flags: exertional, supine, palpitation, structural disease"],
    ix: ["Orthostatic vital signs, ECG", "Electrolyte, glucose, Cr, CBC", "Echo, Holter ตาม clue", "Urine Na, K, Cl ถ้าสงสัย renal salt wasting"],
    std: "ESC 2018 syncope guideline, consensus definition of orthostatic hypotension 2011"
  }, [
    N("Volume depletion", "step", {
      s: "HR ขึ้นมากเมื่อยืน, urine Na บอกต้นเหตุ",
      keys: ["Urine Na < 20 mmol/L: extrarenal loss", "Urine Na > 20 ขณะ volume depleted: renal loss (ยกเว้น vomiting ช่วง bicarbonaturia ที่ urine Na สูงได้ ให้ดู urine Cl)"]
    }, [
      N("Excessive UF / dry weight too low", "nephro", {
        s: "IDH และ post-dialysis orthostasis",
        why: "Dry weight ที่ไม่ได้ปรับเพิ่มเมื่อ lean mass หรือน้ำหนักตัวจริงเพิ่มขึ้น",
        keys: ["Cramp ช่วงท้ายฟอก", "UF rate > 13 mL/kg/h"],
        ix: ["BIA, lung US", "UF rate"],
        std: "KDOQI 2015 HD adequacy",
        link: "hd-idh"
      }),
      N("Salt-wasting tubulopathy: Gitelman, Bartter", "nephro", {
        s: "Hypokalemic metabolic alkalosis กับ BP ต่ำและ salt craving",
        why: "Gitelman มี hypomagnesemia และ hypocalciuria, Bartter มักมี hypercalciuria (type 3 จาก CLCNKB อาจมี hypocalciuria และ hypomagnesemia คล้าย Gitelman)",
        keys: ["Urine Cl สูงขณะ alkalosis", "Urine Ca/Cr < 0.2 mmol/mmol ใน Gitelman", "ต้องตัด diuretic abuse และ vomiting"],
        ix: ["Urine Na, K, Cl, Ca/Cr, Mg", "Urine diuretic screen", "Genetic testing SLC12A3, CLCNKB"],
        std: "KDIGO 2017 Gitelman syndrome consensus",
        link: "metalk"
      }),
      N("Diuretic / SGLT2 inhibitor / osmotic diuresis", "nephro", {
        s: "Volume depletion จากยา หรือ glycosuria",
        ix: ["Urine Na, glucose, drug history"],
        link: "polyuria"
      }),
      N("Cerebral or renal salt wasting / mineralocorticoid deficiency", "nephro", {
        s: "Hyponatremia กับ volume depletion",
        why: "Mineralocorticoid deficiency จาก primary adrenal insufficiency หรือ mineralocorticoid resistance จาก pseudohypoaldosteronism type 1 (ทั้งสองมักมี hyperkalemia ร่วม)",
        ix: ["Renin, aldosterone, cortisol"],
        link: "hypona"
      }),
      N("GI loss / poor intake", "adj", {
        s: "Diarrhea, vomiting",
        ix: ["Urine Na, Cl"],
        link: "diarrhea"
      })
    ]),
    N("Neurogenic orthostatic hypotension", "step", {
      s: "BP ตกแต่ HR ไม่ขึ้นหรือขึ้นน้อยกว่าที่ควร",
      keys: ["Supine hypertension", "Anhidrosis, gastroparesis, bladder dysfunction"]
    }, [
      N("Diabetic autonomic neuropathy", "nephro", {
        s: "DM นานที่มี retinopathy และ DKD",
        why: "ทำให้ IDH และ labile BP ใน dialysis",
        ix: ["HR variability, gastric emptying"],
        link: "numbness"
      }),
      N("AL amyloidosis", "nephro", {
        s: "Orthostatic hypotension กับ nephrotic syndrome และ neuropathy",
        why: "Autonomic neuropathy ร่วมกับ cardiac amyloid และ hypoalbuminemia",
        keys: ["BP ที่เคยสูงกลับต่ำลงเอง", "Macroglossia"],
        ix: ["sFLC, IFE, NT-proBNP, fat pad biopsy (ผลลบไม่ตัด amyloid ต้อง biopsy อวัยวะที่สงสัย)"],
        std: "Mayo 2012 AL staging",
        link: "mspike"
      }),
      N("Uremic autonomic neuropathy", "nephro", {
        s: "Autonomic dysfunction ใน CKD G5",
        ix: ["Orthostatic vitals, Kt/V"]
      }),
      N("Parkinson disease / MSA / pure autonomic failure", "adj", {
        s: "Neurodegenerative autonomic failure",
        ix: ["Neurological examination, autonomic testing"]
      })
    ]),
    N("Endocrine", "step", {
      s: "Hypotension กับ electrolyte clue",
      keys: ["Hyponatremia", "Hyperkalemia", "Hypoglycemia"]
    }, [
      N("Adrenal insufficiency", "adj", {
        s: "Hypotension ที่ไม่ตอบสนองต่อ fluid",
        why: "หยุด steroid หลังรักษา GN หรือ LN, ICI hypophysitis, adrenal TB หรือ hemorrhage",
        keys: ["Hyperkalemia พบใน primary เท่านั้น แต่ไม่พบทุกราย", "Hypoglycemia"],
        ix: ["8 am cortisol, ACTH, cosyntropin test"],
        std: "Endocrine Society 2016",
        link: "hypona"
      }),
      N("Hypoglycemia", "nephro", {
        s: "Syncope-like episode ใน DM กับ CKD",
        why: "Insulin และ sulfonylurea สะสม, gluconeogenesis จากไตลดลง",
        ix: ["Glucose ขณะมีอาการ"]
      })
    ]),
    N("Cardiac syncope", "step", {
      s: "Exertional, supine หรือไม่มี prodrome",
      keys: ["Structural disease", "ECG ผิดปกติ"]
    }, [
      N("Arrhythmia: brady or tachy", "nephro", {
        s: "Syncope ทันทีไม่มี prodrome",
        why: "Hyperkalemia, BRASH, VT จาก LVH และ hypokalemia",
        ix: ["ECG, Holter, implantable loop recorder"],
        link: "palpitation"
      }),
      N("Aortic stenosis / HOCM / amyloid", "adj", {
        s: "Exertional syncope",
        why: "Calcific AS progress เร็วกว่าคนทั่วไปใน dialysis",
        ix: ["Echo"]
      }),
      N("Pericardial tamponade", "nephro", {
        s: "Hypotension, JVP สูง, pulsus paradoxus",
        ix: ["Echo"],
        link: "chestpain"
      }),
      N("Pulmonary embolism", "adj", {
        s: "Syncope กับ hypoxemia",
        ix: ["CTPA"],
        link: "thrombosis"
      })
    ]),
    N("Reflex and drug-induced", "step", {
      s: "Prodrome ชัด หรือ trigger ชัด",
      keys: ["Micturition, cough, carotid sinus", "ยาลดความดันหลายตัว"]
    }, [
      N("Antihypertensive overtreatment / alpha-blocker", "nephro", {
        s: "Orthostatic ในผู้สูงอายุที่ได้ยาหลายตัว",
        why: "ให้ยาลดความดันก่อนฟอกอาจทำให้ IDH",
        ix: ["Drug review, home BP"]
      }),
      N("Vasovagal / situational", "adj", {
        s: "Prodrome คลื่นไส้ เหงื่อออก หน้ามืด",
        ix: ["Clinical, tilt test ถ้าจำเป็น"],
        std: "ESC 2018 syncope"
      })
    ])
  ])
};

/* ===================== NAUSEA / VOMITING / ANOREXIA ===================== */
TREES.nausea = {
  must: [
    "Acute หรือ chronic, สัมพันธ์กับอาหาร, ตอนเช้า, อาเจียนพุ่ง",
    "ปวดท้อง, ท้องผูก, ท้องอืด, early satiety",
    "Uremic symptoms: pruritus, dysgeusia, hiccups, ซึม",
    "Polyuria, ท้องผูก, สับสน (hypercalcemia)",
    "ปวดหัว, ตามัว (raised ICP, PRES)",
    "ยา: MMF, metformin, GLP-1 RA, opioid, digoxin, iron, phosphate binder, antibiotic",
    "Hypotension, hyperpigmentation, หยุด steroid",
    "PD: dwell volume, effluent ขุ่น"
  ],
  tree: N("Nausea / vomiting / anorexia", "root", {
    s: "แยกตาม mechanism: metabolic หรือ toxic, GI, CNS และ endocrine แล้วประเมินผลของการอาเจียนต่อ electrolyte",
    why: "ในผู้ป่วยไต อาการนี้เป็นทั้งสาเหตุ (uremia, hypercalcemia) และผลตามมา (metabolic alkalosis, hypokalemia, prerenal AKI)",
    keys: ["Uremic signs", "Volume status", "Metabolic alkalosis กับ urine Cl ต่ำ", "Neurological signs"],
    ix: ["BUN, Cr, Na, K, Cl, HCO3, Ca, glucose", "LFT, lipase, TSH, cortisol", "Urine Cl เพื่อแยก vomiting จาก tubulopathy", "Pregnancy test", "Imaging ตาม clue"],
    std: "AGA 2001 nausea and vomiting technical review"
  }, [
    N("Metabolic / toxic", "step", {
      s: "Lab ผิดปกติอธิบายอาการได้",
      keys: ["BUN สูง", "Ca สูง", "Na ต่ำ"]
    }, [
      N("Uremia / inadequate dialysis", "nephro", {
        s: "Anorexia, morning nausea, dysgeusia, hiccups",
        why: "Uremic symptoms เป็นข้อบ่งชี้เริ่ม dialysis มากกว่าการดูแค่ eGFR",
        keys: ["Asterixis, pericardial rub", "Residual kidney function ลด"],
        ix: ["BUN, Cr, Kt/V, residual urine"],
        std: "IDEAL trial (n = 828) early vs late start ไม่ต่างใน mortality, KDIGO 2024 CKD",
        link: "weightloss"
      }),
      N("Hypercalcemia", "nephro", {
        s: "Nausea, constipation, polyuria, confusion",
        why: "Myeloma, PHPT, granulomatous, vitamin D หรือ calcium-alkali syndrome",
        ix: ["Ca, PTH, PTHrP, 1,25D, SPEP"],
        link: "hyperca"
      }),
      N("Hyponatremia", "nephro", {
        s: "Nausea เป็นอาการแรกๆ ของ hyponatremia",
        why: "Nausea เองกระตุ้น ADH ทำให้ hyponatremia แย่ลง",
        ix: ["Serum osmolality, urine osmolality, urine Na"],
        link: "hypona"
      }),
      N("DKA / AKA / toxic alcohol", "nephro", {
        s: "Vomiting กับ high anion gap acidosis",
        ix: ["Ketone (beta-hydroxybutyrate), lactate, osmolal gap (ปกติไม่ตัด toxic alcohol ที่มาช้า)"],
        link: "agma"
      }),
      N("Drug toxicity", "nephro", {
        s: "Digoxin, lithium, metformin, theophylline, MMF, colchicine",
        why: "Digoxin, lithium, metformin และ colchicine ขับทางไตจึงสะสมเมื่อ eGFR ลด ส่วน theophylline (hepatic clearance) และ MMF ทำให้คลื่นไส้ได้แม้ไตปกติ",
        keys: ["Lithium: tremor, ataxia, nephrogenic DI", "Metformin: lactic acidosis"],
        ix: ["Drug level, lactate"]
      })
    ]),
    N("GI", "step", {
      s: "อาการสัมพันธ์กับอาหาร หรือมีปวดท้อง",
      keys: ["Early satiety", "Peritoneal sign", "Bowel obstruction"]
    }, [
      N("Diabetic or uremic gastroparesis", "nephro", {
        s: "Early satiety, postprandial fullness, อาเจียนอาหารเก่า",
        why: "Gastroparesis ทำให้ glucose และ drug absorption แปรปรวน",
        ix: ["Gastric emptying scintigraphy (4 ชั่วโมง > 10% retention)"],
        std: "ACG 2022 gastroparesis guideline"
      }),
      N("PD-related: peritonitis, high fill volume, EPS", "nephro", {
        s: "Nausea ร่วมกับปวดท้องและน้ำยาขุ่น (peritonitis) หรือ bowel obstruction เป็นๆ หายๆ ใน PD มานาน (EPS)",
        ix: ["Effluent cell count, culture", "CT ถ้าสงสัย EPS"],
        std: "ISPD 2022 peritonitis, ISPD 2017 EPS",
        link: "pd-cloudy"
      }),
      N("Pancreatitis", "nephro", {
        s: "Epigastric pain ร้าวหลัง",
        why: "Hypercalcemia, hypertriglyceridemia, drug (azathioprine) และ lipase สูงได้ใน CKD โดยไม่มี pancreatitis",
        ix: ["Lipase > 3 เท่า ULN, CT (วินิจฉัยเมื่อครบ 2 ใน 3: ปวดแบบ pancreatitis, lipase หรือ amylase > 3 เท่า ULN, imaging เข้าได้)"],
        std: "Revised Atlanta 2012",
        link: "abdpain"
      }),
      N("Hepatitis / biliary / PUD / obstruction", "adj", {
        s: "GI structural causes",
        ix: ["LFT, US, EGD, CT"],
        link: "jaundice"
      }),
      N("CMV GI disease in KT", "nephro", {
        s: "Nausea, odynophagia, diarrhea ใน KT",
        ix: ["CMV QNAT (plasma ลบได้ใน GI disease), endoscopic biopsy กับ IHC"],
        link: "kt-fever"
      })
    ]),
    N("CNS", "step", {
      s: "Vomiting กับปวดหัว หรือ neurological sign",
      keys: ["Projectile vomiting", "Papilledema"]
    }, [
      N("Raised ICP / PRES / hemorrhage", "nephro", {
        s: "Headache, vomiting, visual disturbance",
        why: "PRES จาก CNI, ADPKD aneurysm และ hypertensive emergency",
        ix: ["CT หรือ MRI brain"],
        link: "headache"
      }),
      N("Dialysis disequilibrium syndrome", "nephro", {
        s: "Nausea, headache, confusion ระหว่างหรือหลังฟอกครั้งแรกๆ",
        why: "BUN ลดเร็วทำให้ cerebral edema",
        keys: ["BUN สูงมากก่อนฟอก", "Large dialyzer, long session ในครั้งแรก"],
        ix: ["Clinical, ตัด subdural hematoma"],
        link: "ams"
      }),
      N("Vestibular / migraine", "adj", {
        s: "Vertigo หรือ migrainous headache",
        why: "Aminoglycoside vestibulotoxicity (เช่น gentamicin) เสี่ยงสูงขึ้นใน CKD และ dialysis",
        ix: ["Head impulse test"]
      })
    ]),
    N("Endocrine / pregnancy", "step", {
      s: "Nausea กับ hormonal clue",
      keys: ["Hypotension", "Amenorrhea"]
    }, [
      N("Adrenal insufficiency", "adj", {
        s: "Nausea, abdominal pain, hypotension, hyponatremia",
        ix: ["Cortisol, ACTH"],
        link: "hypona"
      }),
      N("Pregnancy / hyperemesis", "nephro", {
        s: "Nausea ไตรมาสแรก",
        why: "Hyperemesis ทำให้ prerenal AKI และ hypokalemic alkalosis, pregnancy ใน CKD และ KT ต้องวางแผน",
        ix: ["Beta-hCG"],
        link: "pregnancy"
      }),
      N("Hyperthyroidism / hypothyroidism", "adj", {
        s: "Thyroid disease",
        ix: ["TSH"]
      })
    ]),
    N("Consequence of vomiting", "step", {
      s: "ผลต่อไตที่ต้องประเมินในทุกรายที่อาเจียนมาก",
      keys: ["Metabolic alkalosis", "Hypokalemia", "Prerenal AKI"]
    }, [
      N("Chloride-responsive metabolic alkalosis", "nephro", {
        s: "Urine Cl < 20 mmol/L, urine Na อาจสูงช่วงแรกจาก bicarbonaturia",
        why: "ใช้ urine Cl แยก vomiting จาก Bartter, Gitelman และ diuretic ที่ยังออกฤทธิ์ (diuretic ที่หมดฤทธิ์แล้ว urine Cl ต่ำได้)",
        ix: ["Urine Cl, Na, K, pH"],
        link: "metalk"
      }),
      N("Bulimia / surreptitious vomiting", "adj", {
        s: "Hypokalemic alkalosis ที่ urine Cl ต่ำแต่ปฏิเสธการอาเจียน",
        keys: ["Russell sign, parotid enlargement, dental erosion"],
        ix: ["Urine Cl ต่ำซ้ำๆ"],
        link: "metalk"
      })
    ])
  ])
};

/* ===================== CHRONIC DIARRHEA ===================== */
TREES.diarrhea = {
  must: [
    "ระยะเวลา > 4 สัปดาห์, ปริมาณ, กลางคืน, ถ่ายเป็นเลือดหรือมัน",
    "Fasting แล้วหยุดไหม (osmotic vs secretory)",
    "น้ำหนักลด, ปวดท้อง, ไข้, ปวดข้อ, ตาแดง",
    "ผ่าตัดลำไส้, bariatric surgery (RYGB), short bowel, chronic pancreatitis",
    "ยา: MMF, colchicine, metformin, Mg antacid, laxative, PPI, antibiotic",
    "KT: IS ระดับเท่าไร, CMV status",
    "Stone ใหม่ หรือ Cr ขึ้น",
    "Flushing, wheeze (carcinoid)"
  ],
  tree: N("Chronic diarrhea", "root", {
    s: "แยก secretory, osmotic, inflammatory, fatty แล้วประเมินผลที่ไต (NAGMA, hypokalemia, prerenal AKI, oxalate)",
    why: "Diarrhea ทำให้ NAGMA กับ hypokalemia, enteric hyperoxaluria และ prerenal AKI ส่วนใน KT เป็นทางเข้าของ CMV และ MMF toxicity",
    keys: ["Stool osmotic gap = 290 - 2 x (stool Na + K): < 50 mOsm/kg secretory, > 125 mOsm/kg osmotic (บางตำราใช้ > 100), ค่าระหว่างนี้เป็น mixed", "Blood และ WBC ใน stool", "Steatorrhea", "Urine anion gap ลบ (ไตขับ NH4 ได้ดี) ใน diarrhea"],
    ix: ["Stool Na, K, osmotic gap, fecal calprotectin, fecal fat, elastase", "Stool culture, C. difficile, parasites, viral PCR", "VBG, K, Mg, Cr", "24-hour urine oxalate, citrate", "Colonoscopy with biopsy"],
    std: "AGA 2019 chronic diarrhea guideline, BSG 2018"
  }, [
    N("Kidney consequence", "step", {
      s: "สิ่งที่ examiner จะถามต่อเสมอ",
      keys: ["NAGMA", "Hypokalemia", "Stone", "Oxalate nephropathy"]
    }, [
      N("NAGMA with hypokalemia", "nephro", {
        s: "Bicarbonate loss ทางลำไส้",
        why: "แยกจาก dRTA ด้วย urine anion gap และ urine osmolal gap",
        keys: ["UAG ลบ (urine NH4 สูง) ใน diarrhea แต่ถ้า volume depletion จน urine Na < 20-25 mmol/L UAG บวกเทียมได้ ให้ใช้ urine osmolal gap", "UAG บวกใน dRTA", "Urine pH อาจ > 5.5 ใน diarrhea จาก NH3 buffering"],
        ix: ["Urine Na, K, Cl, osmolality, pH"],
        link: "nagma"
      }),
      N("Enteric hyperoxaluria / oxalate nephropathy", "nephro", {
        s: "Ca oxalate stone หรือ AKI หรือ CKD หลัง bariatric surgery หรือ fat malabsorption",
        why: "Fat จับ Ca ทำให้ oxalate อิสระดูดซึมมากขึ้น",
        keys: ["RYGB, short bowel, chronic pancreatitis, orlistat", "ต้องมี colon ต่อเนื่องอยู่ (oxalate ดูดซึมที่ colon) ผู้ป่วย ileostomy จึงไม่เกิด enteric hyperoxaluria แต่เกิด uric acid stone", "Hypocitraturia, low urine volume"],
        ix: ["24-hour urine oxalate > 45 mg/วัน", "Kidney biopsy: calcium oxalate crystal ใต้ polarized light"],
        std: "AUA 2014 kidney stone guideline",
        link: "stone"
      }),
      N("Uric acid stone / low urine volume", "nephro", {
        s: "Acidic urine กับ volume depletion",
        ix: ["Urine pH < 5.5, urine volume, stone analysis"],
        link: "stone"
      }),
      N("Prerenal AKI / hypomagnesemia", "nephro", {
        s: "Volume depletion และ Mg loss",
        ix: ["Urine Na, FENa, Mg"],
        link: "risingcr"
      })
    ]),
    N("Secretory", "step", {
      s: "Large volume ไม่หยุดเมื่อ fast, osmotic gap < 50",
      keys: ["Nocturnal diarrhea", "Hypokalemia รุนแรง"]
    }, [
      N("Laxative abuse (stimulant)", "nephro", {
        s: "Hypokalemia ที่ไม่มีคำอธิบาย",
        why: "ภาพคล้าย Bartter (pseudo-Bartter) แต่ urine K และ urine Cl ต่ำเพราะเป็น extrarenal loss และ hypokalemia เรื้อรังทำให้ hypokalemic nephropathy",
        ix: ["Stool และ urine laxative screen"],
        link: "hypok"
      }),
      N("VIPoma / villous adenoma / carcinoid", "nephro", {
        s: "WDHA (watery diarrhea, hypokalemia, achlorhydria)",
        why: "Villous adenoma (McKittrick-Wheelock) ทำให้ K loss และ prerenal AKI",
        ix: ["Serum VIP, colonoscopy, 5-HIAA"]
      }),
      N("Bile acid diarrhea / microscopic colitis", "adj", {
        s: "Bile acid diarrhea หลัง cholecystectomy หรือ ileal resection ส่วน microscopic colitis สัมพันธ์กับ PPI และ NSAID",
        ix: ["SeHCAT หรือ trial bile acid sequestrant, colon biopsy"]
      })
    ]),
    N("Osmotic / drug", "step", {
      s: "Osmotic: หยุดเมื่อ fast, osmotic gap > 125 mOsm/kg (ยาบางตัวในกลุ่มนี้ไม่ได้เป็น osmotic)",
      keys: ["ยาเป็นสาเหตุที่พบบ่อยและต้องทบทวนทุกรายในผู้ป่วยไต"]
    }, [
      N("MMF / mycophenolate", "nephro", {
        s: "Diarrhea ใน KT หรือ LN",
        why: "ลดขนาด MMF เพิ่ม rejection risk ต้องตัด CMV และ infection ก่อน",
        keys: ["Dose-dependent", "Erosive enterocolitis, GVHD-like histology"],
        ix: ["Colon biopsy, stool infection workup"]
      }),
      N("Magnesium, sorbitol, lactulose, metformin, colchicine", "nephro", {
        s: "Drug-induced diarrhea: Mg, sorbitol และ lactulose เป็น osmotic ส่วน metformin และ colchicine ไม่ใช่ osmotic",
        why: "Mg ที่เป็น laxative สะสมใน CKD ทำให้ hypermagnesemia, colchicine toxicity เกิดเมื่อ eGFR ต่ำหรือใช้ร่วมกับ CYP3A4 หรือ P-gp inhibitor (clarithromycin, cyclosporine)",
        ix: ["Drug review, Mg"]
      }),
      N("Lactose intolerance / carbohydrate malabsorption", "adj", {
        s: "Bloating, flatulence",
        ix: ["Hydrogen breath test"]
      })
    ]),
    N("Inflammatory", "step", {
      s: "Blood, fever, calprotectin สูง",
      keys: ["Extraintestinal manifestations"]
    }, [
      N("Inflammatory bowel disease", "nephro", {
        s: "Bloody diarrhea, uveitis, arthritis, erythema nodosum",
        why: "Kidney involvement ใน IBD: IgAN, AA amyloid, 5-ASA TIN, oxalate stone และ uric acid stone",
        keys: ["Crohn ileal disease ทำให้ enteric hyperoxaluria", "Cr ขึ้นหลังได้ mesalazine"],
        ix: ["Colonoscopy with biopsy, calprotectin", "Cr ทุก 3-6 เดือนใน 5-ASA"],
        std: "ECCO 2022 guideline",
        link: "pyuria"
      }),
      N("CMV colitis / C. difficile / norovirus in KT", "nephro", {
        s: "Diarrhea ใน KT",
        why: "Chronic norovirus ทำให้ diarrhea นานและ tacrolimus level ขึ้น",
        keys: ["Tacrolimus level สูงขึ้นเมื่อ diarrhea", "Leukopenia ใน CMV", "Plasma CMV QNAT ลบไม่ตัด CMV colitis ต้องอาศัย biopsy"],
        ix: ["CMV QNAT, colon biopsy IHC, C. difficile toxin, norovirus PCR"],
        std: "AST IDCOP 2019",
        link: "kt-fever"
      }),
      N("Vasculitis / ischemic colitis", "nephro", {
        s: "IgAV, PAN, cholesterol emboli",
        ix: ["Colonoscopy, CTA"],
        link: "abdpain"
      }),
      N("TB enterocolitis / amebiasis / strongyloides", "adj", {
        s: "Ileocecal disease หรือ hyperinfection",
        why: "Strongyloides hyperinfection ใน KT และผู้ได้ steroid ขนาดสูง ต้อง screen ก่อน IS",
        ix: ["Strongyloides serology, stool agar plate culture"]
      })
    ]),
    N("Fatty / malabsorptive", "step", {
      s: "Steatorrhea, weight loss",
      keys: ["Fecal fat สูง", "Fat-soluble vitamin deficiency"]
    }, [
      N("Chronic pancreatitis / exocrine insufficiency", "nephro", {
        s: "Steatorrhea ใน alcohol หรือ DM",
        why: "Fat malabsorption ทำให้ enteric hyperoxaluria และ oxalate nephropathy",
        ix: ["Fecal elastase < 200 µg/g"],
        link: "stone"
      }),
      N("Bariatric surgery / short bowel", "nephro", {
        s: "Malabsorption หลังผ่าตัด",
        ix: ["24-h urine oxalate, citrate, volume"],
        link: "stone"
      }),
      N("Celiac disease / small bowel disease", "adj", {
        s: "Iron deficiency, osteomalacia",
        why: "Celiac สัมพันธ์กับ IgAN",
        ix: ["Anti-tTG IgA, total IgA, duodenal biopsy"]
      }),
      N("AL amyloid GI involvement", "nephro", {
        s: "Diarrhea, weight loss กับ nephrotic syndrome",
        ix: ["GI biopsy Congo red, sFLC"],
        link: "mspike"
      })
    ])
  ])
};

/* ===================== ABDOMINAL DISTENSION / MASS ===================== */
TREES.abdomen = {
  must: [
    "ท้องโตช้าหรือเร็ว, เป็นน้ำ ลม หรือก้อน",
    "ประวัติตับ: alcohol, HBV, HCV, NASH",
    "Family history ของ ADPKD, ไตโต, cyst ในตับ",
    "PD: vintage, จำนวน peritonitis, หยุด PD หรือย้ายไป HD เมื่อไร",
    "ไข้, น้ำหนักลด, ต่อมน้ำเหลืองโต",
    "Edema, ปัสสาวะเป็นฟอง",
    "Early satiety, หายใจลำบาก, ปวดหลัง (mass effect)",
    "Hematuria, flank pain, ก้อนคลำได้ที่เอว"
  ],
  tree: N("Abdominal distension / mass", "root", {
    s: "แยก ascites, organomegaly และ discrete mass แล้วใช้ SAAG แยก ascites",
    why: "ท้องโตเป็นทางเข้าของ ADPKD, hepatorenal, lupus serositis, lymphoma, EPS และ nephrotic ascites",
    keys: ["Shifting dullness, fluid thrill", "Ballotable kidney vs hepatomegaly vs splenomegaly", "SAAG ≥ 1.1 g/dL: portal hypertension"],
    ix: ["US abdomen and kidney", "Paracentesis: SAAG, total protein, cell count, culture, cytology, ADA", "LFT, albumin, INR, UA, UPCR", "CT abdomen"],
    std: "AASLD 2021 ascites guideline"
  }, [
    N("Ascites: portal hypertension (SAAG ≥ 1.1)", "step", {
      s: "Cirrhosis, heart failure, hepatic vein obstruction",
      keys: ["Ascitic protein < 2.5 g/dL: cirrhosis", "Ascitic protein ≥ 2.5 g/dL: cardiac"]
    }, [
      N("Cirrhosis with hepatorenal syndrome (HRS-AKI)", "nephro", {
        s: "Cirrhosis ที่มี ascites กับ AKI ที่ไม่ดีขึ้นหลัง volume resuscitation",
        why: "HRS-AKI เป็น diagnosis of exclusion ต้องตัด ATN, prerenal และ glomerular disease",
        keys: ["Cr เพิ่ม ≥ 0.3 mg/dL ใน 48 ชั่วโมง หรือ ≥ 50% ใน 7 วัน หรือ urine output ≤ 0.5 mL/kg/h นาน ≥ 6 ชั่วโมง", "Cr หรือ urine output ไม่ดีขึ้นภายใน 24 ชั่วโมงหลัง volume resuscitation ที่เพียงพอ (เกณฑ์ 2024 ไม่บังคับให้ albumin 1 g/kg 2 วันแบบ ICA 2015 แล้ว)", "ไม่มีหลักฐานชัดเจนของสาเหตุอื่นที่เป็นสาเหตุหลักของ AKI (เกณฑ์ ICA 2015 ใช้ไม่มี shock, nephrotoxin, proteinuria > 500 mg/วัน, hematuria > 50 RBC/hpf)", "เกณฑ์ 2024: proteinuria หรือ CKD เดิมไม่ตัด HRS-AKI ที่ซ้อนขึ้นมา", "FENa มักต่ำกว่า 0.2%"],
        ix: ["Urine Na, FENa, UA, UPCR", "Urine NGAL ช่วยแยก ATN", "Kidney US"],
        std: "ICA-ADQI 2024 HRS-AKI criteria, CONFIRM trial (n = 300) terlipressin ได้ verified HRS reversal 32% vs 17% แต่ respiratory failure มากกว่า (ระวังใน volume overload และ ACLF grade 3)",
        link: "risingcr"
      }),
      N("Cirrhosis-related GN (IgAN, HCV-MPGN, HBV-MN)", "nephro", {
        s: "Ascites กับ hematuria หรือ proteinuria",
        why: "Secondary IgAN พบบ่อยใน cirrhosis จาก IgA clearance ลด",
        ix: ["UA, UPCR, C3, cryoglobulin, HBV, HCV"],
        link: "viral"
      }),
      N("Cardiac ascites / constrictive pericarditis", "nephro", {
        s: "JVP สูง ascitic protein สูง",
        why: "Constrictive pericarditis จาก TB หรือ uremic pericarditis เดิม",
        ix: ["Echo, cardiac MRI, NT-proBNP"],
        link: "chestpain"
      }),
      N("Budd-Chiari syndrome", "adj", {
        s: "ปวดท้อง, hepatomegaly และ ascites ที่เกิดเร็ว",
        why: "สาเหตุ: myeloproliferative neoplasm (พบบ่อยที่สุด), PNH, APS, nephrotic hypercoagulable state",
        ix: ["Doppler US hepatic vein"],
        link: "thrombosis"
      })
    ]),
    N("Ascites: non-portal (SAAG < 1.1)", "step", {
      s: "Peritoneal disease หรือ hypoalbuminemia",
      keys: ["Lymphocytic", "Malignant cytology", "Very low protein"]
    }, [
      N("Nephrotic ascites", "nephro", {
        s: "Anasarca, albumin ต่ำ, ascitic protein ต่ำ",
        why: "Nephrotic syndrome เกิด spontaneous bacterial peritonitis ได้ทั้งในเด็ก (บ่อยกว่า) และผู้ใหญ่",
        ix: ["UPCR, albumin, ascitic cell count"],
        link: "nephrotic"
      }),
      N("Lupus serositis / peritonitis", "nephro", {
        s: "Ascites กับ serositis อื่นและ active SLE",
        ix: ["ANA, C3, C4, ascitic fluid"],
        link: "rpgn"
      }),
      N("Tuberculous peritonitis", "nephro", {
        s: "Lymphocytic ascites ไข้ น้ำหนักลด",
        why: "พบบ่อยขึ้นใน CKD, HD และ PD, PD peritonitis ที่ culture ลบและไม่ตอบสนองต่อ antibiotic ให้คิดถึง TB (lymphocyte เด่นช่วยชี้ แต่ช่วงแรก PMN เด่นได้บ่อย)",
        keys: ["Ascitic lymphocyte สูง", "Omental cake"],
        ix: ["Ascitic ADA > 39 U/L, Xpert, culture", "Laparoscopic peritoneal biopsy"],
        std: "WHO TB guidelines"
      }),
      N("Nephrogenic ascites", "nephro", {
        s: "Refractory ascites ใน HD ที่ไม่มี liver disease",
        why: "Diagnosis of exclusion ใน long vintage HD ที่ volume overload",
        keys: ["Ascitic protein สูง", "ไม่มี portal hypertension"],
        ix: ["SAAG, ตัด TB, malignancy, cardiac"]
      }),
      N("Malignant ascites", "adj", {
        s: "Peritoneal carcinomatosis",
        ix: ["Cytology (ส่งซ้ำเพิ่ม yield), CT, CA-125 สูงได้ใน ascites ทุกสาเหตุจึงไม่ใช้แยก malignancy"]
      }),
      N("Chylous / pancreatic ascites", "adj", {
        s: "Milky ascites หรือ amylase สูง",
        why: "Lymphoma และ nephrotic ทำให้ chylous ascites ได้",
        ix: ["Ascitic TG > 200 mg/dL, amylase"]
      })
    ]),
    N("Kidney mass / nephromegaly", "step", {
      s: "Ballotable flank mass",
      keys: ["Bilateral vs unilateral", "Cystic vs solid"]
    }, [
      N("ADPKD", "nephro", {
        s: "Bilateral enlarged cystic kidneys และ liver cysts",
        why: "Total kidney volume ใช้ทำนาย progression และเลือก tolvaptan",
        keys: ["Family history", "HTN อายุน้อย, hematuria, flank pain", "Polycystic liver disease รุนแรงกว่าในผู้หญิง"],
        ix: ["US: Pei-Ravine criteria ตามอายุ (ใช้เมื่อมี family history, ถ้าไม่มีใช้เกณฑ์อื่นร่วมกับ genetic testing)", "MRI: htTKV, Mayo imaging class 1C-1E = rapid progressor", "PKD1, PKD2 genetic testing ถ้า imaging ไม่ชัด"],
        std: "KDIGO 2025 ADPKD guideline, TEMPO 3:4 (n = 1,445), REPRISE (n = 1,370)",
        link: "cysts"
      }),
      N("Bilateral enlarged kidneys, non-cystic", "nephro", {
        s: "DKD early, HIVAN, amyloid, lymphoma infiltration, acute GN, RVT",
        why: "CKD ที่ไตไม่เล็กให้คิดกลุ่มนี้",
        ix: ["US kidney size, biopsy"],
        link: "kidneysize"
      }),
      N("Renal cell carcinoma / angiomyolipoma", "nephro", {
        s: "Solid mass ข้างเดียว",
        why: "Tuberous sclerosis (AML และ cyst), VHL (RCC และ cyst), ACKD ใน dialysis",
        ix: ["CT หรือ MRI with contrast ตาม eGFR", "Bosniak 2019 สำหรับ cystic mass"],
        std: "Bosniak 2019",
        link: "flank"
      }),
      N("Hydronephrosis", "nephro", {
        s: "Obstructed enlarged kidney",
        why: "Retroperitoneal fibrosis, stone, pelvic malignancy, BPH",
        ix: ["US, CT urography"],
        link: "oliguria"
      })
    ]),
    N("Hepatosplenomegaly / other mass", "step", {
      s: "Organomegaly หรือ mass นอกไต",
      keys: ["Lymphadenopathy", "Cytopenia"]
    }, [
      N("Lymphoma / leukemia / Castleman", "nephro", {
        s: "Splenomegaly กับ lymphadenopathy",
        why: "Kidney involvement: minimal change disease, MN, cryoglobulinemic GN, kidney infiltration และ TAFRO",
        ix: ["CT, PET/CT, biopsy"],
        link: "lymphnode"
      }),
      N("AL / AA amyloidosis", "nephro", {
        s: "Hepatomegaly ALP สูง กับ nephrotic",
        ix: ["sFLC, IFE, SAA, fat pad"],
        link: "mspike"
      }),
      N("Polycystic liver disease", "nephro", {
        s: "Hepatomegaly ใน ADPKD หรือ ADPLD",
        ix: ["MRI liver volume"],
        link: "cysts"
      }),
      N("Infection: TB, melioidosis abscess, visceral leishmaniasis", "adj", {
        s: "Splenic microabscess และ hepatosplenomegaly",
        ix: ["US, culture"],
        link: "fever"
      })
    ]),
    N("PD-specific", "step", {
      s: "Distension หรือ hernia ใน PD",
      keys: ["Dwell volume", "Long vintage"]
    }, [
      N("Encapsulating peritoneal sclerosis", "nephro", {
        s: "Recurrent bowel obstruction, weight loss, hemoperitoneum ใน PD นาน",
        why: "Risk เพิ่มตาม PD vintage และมักแสดงอาการหลังหยุด PD ไปแล้ว (ย้ายไป HD หรือหลัง KT)",
        ix: ["CT: peritoneal thickening, calcification, cocoon"],
        std: "ISPD 2017 EPS position paper",
        link: "weightloss"
      }),
      N("Hernia / leak / hemoperitoneum", "nephro", {
        s: "Inguinal หรือ umbilical swelling, genital edema, bloody effluent",
        why: "Hernia และ leak เกิดจาก intra-abdominal pressure สูง ส่วน bloody effluent ในหญิงวัยเจริญพันธุ์มักมาจาก ovulation หรือ menstruation แต่ถ้าเลือดมาก ปวด หรือเป็นซ้ำต้องหาสาเหตุอื่น",
        ix: ["CT peritoneography"],
        link: "pd-catheter"
      })
    ])
  ])
};

/* ===================== ABDOMINAL PAIN ===================== */
TREES.abdpain = {
  must: [
    "ตำแหน่ง, onset, ลักษณะปวด, ร้าวไปไหน",
    "Purpura, arthralgia, hematuria (IgAV)",
    "Post-prandial pain, food fear, weight loss (mesenteric ischemia)",
    "หลังทำ angiography หรือเริ่ม anticoagulant (cholesterol emboli)",
    "PD: effluent ขุ่น, จำนวนครั้งของ peritonitis",
    "Neuropsychiatric symptoms, ปัสสาวะสีเข้ม, ยากระตุ้น (porphyria)",
    "Alcohol, TG, Ca, ยา azathioprine, valproate (pancreatitis)",
    "Flank pain, stone, ADPKD"
  ],
  tree: N("Abdominal pain", "root", {
    s: "ตัด surgical abdomen ก่อน แล้วแยกตามตำแหน่งและ systemic disease ที่ทำให้ทั้งปวดท้องและไตเสีย",
    why: "ปวดท้องกับ kidney disease ชี้ไปที่ vasculitis, ischemia, pancreatitis, PD peritonitis, porphyria และ stone",
    keys: ["Peritoneal sign", "Pain out of proportion to examination: mesenteric ischemia", "Purpura และ hematuria", "Flank vs diffuse"],
    ix: ["CBC, LFT, lipase, lactate, Ca, TG", "UA with microscopy, Cr", "CT abdomen (contrast ตาม eGFR และความรุนแรง)", "PD effluent cell count"],
    std: "Clinical localization approach"
  }, [
    N("Vasculitis / vascular", "step", {
      s: "Systemic vascular disease",
      keys: ["Purpura", "Livedo", "Atherosclerosis"]
    }, [
      N("IgA vasculitis", "nephro", {
        s: "Colicky abdominal pain, GI bleeding, purpura, arthritis",
        why: "Abdominal pain เกิดก่อน purpura ได้หลายวันถึงสัปดาห์ จึงไม่มี purpura ตอนแรกไม่ตัด IgAV, intussusception พบในเด็ก",
        ix: ["UA, UPCR, skin biopsy", "US หรือ CT bowel wall thickening"],
        std: "EULAR/PRINTO/PRES 2010",
        link: "hematuria"
      }),
      N("Polyarteritis nodosa", "nephro", {
        s: "Postprandial pain, bowel infarct, HTN, renal infarct",
        ix: ["Mesenteric and renal angiography: microaneurysm"],
        link: "fever"
      }),
      N("Mesenteric ischemia", "nephro", {
        s: "Pain out of proportion, lactate สูง",
        why: "Atherosclerosis ใน CKD, NOMI ระหว่าง HD ที่ IDH, AF embolism",
        keys: ["Post-dialysis abdominal pain กับ hypotension", "Vascular calcification"],
        ix: ["CTA mesenteric"],
        std: "ESVS 2017 mesenteric ischemia guideline"
      }),
      N("Cholesterol embolization", "nephro", {
        s: "Abdominal pain, livedo, blue toe, AKI หลัง catheterization",
        keys: ["Eosinophilia และ low complement พบได้เพียงบางราย (ไม่พบไม่ตัด)", "Subacute stepwise AKI"],
        ix: ["Fundoscopy: Hollenhorst plaque", "Skin หรือ kidney biopsy: cholesterol cleft"],
        link: "bluetoe"
      }),
      N("Renal infarction / renal vein thrombosis", "nephro", {
        s: "Flank หรือ abdominal pain, LDH สูงมาก, hematuria",
        why: "AF, endocarditis, APS, dissection, nephrotic (RVT)",
        keys: ["LDH สูงกับ AST ปกติ", "Hematuria"],
        ix: ["CT with contrast: wedge-shaped perfusion defect", "Echo, aPL"],
        link: "flank"
      })
    ]),
    N("Pancreatobiliary / hepatic", "step", {
      s: "Epigastric หรือ RUQ pain",
      keys: ["Lipase", "LFT pattern"]
    }, [
      N("Pancreatitis", "nephro", {
        s: "Epigastric pain ร้าวหลัง",
        why: "สาเหตุที่เกี่ยวกับไต: hypercalcemia (PHPT, myeloma), hypertriglyceridemia (nephrotic syndrome, lipoprotein lipase deficiency), azathioprine และ pancreatitis เองทำให้ AKI",
        keys: ["Lipase สูง 1-3 เท่าได้ใน CKD โดยไม่มี pancreatitis"],
        ix: ["Lipase > 3 เท่า ULN, Ca, TG, CT"],
        std: "Revised Atlanta 2012",
        link: "hyperca"
      }),
      N("Cholangitis / liver abscess / hepatitis", "adj", {
        s: "Fever, jaundice, RUQ pain",
        why: "Leptospirosis และ melioidosis ทำให้ hepatitis กับ AKI",
        ix: ["LFT, US, blood culture"],
        link: "jaundice"
      })
    ]),
    N("Peritoneal", "step", {
      s: "Diffuse pain กับ peritoneal sign",
      keys: ["PD", "Serositis"]
    }, [
      N("PD peritonitis", "nephro", {
        s: "Cloudy effluent, abdominal pain, fever",
        keys: ["Enteric organism หลายชนิด (โดยเฉพาะมี anaerobe) ให้คิด surgical cause ส่วน gram-positive หลายชนิดมักมาจาก contamination หรือ catheter infection", "Fungal peritonitis ต้องเอาสายออก"],
        ix: ["Effluent WBC > 100/µL (dwell ≥ 2 ชั่วโมง) และ PMN > 50%, culture", "วินิจฉัยเมื่อครบ 2 ใน 3: อาการ, cell count, culture หรือ Gram stain บวก (APD ที่ dwell สั้นให้ดู PMN > 50%)"],
        std: "ISPD 2022 peritonitis",
        link: "pd-cloudy"
      }),
      N("Lupus serositis / FMF", "nephro", {
        s: "Recurrent sterile peritonitis",
        why: "FMF ทำให้ AA amyloid",
        ix: ["ANA, C3, C4, MEFV genetic testing, SAA"],
        link: "rpgn"
      }),
      N("EPS", "nephro", {
        s: "Intermittent obstruction ใน long-term PD",
        ix: ["CT"],
        link: "abdomen"
      }),
      N("Perforation / surgical abdomen", "adj", {
        s: "Diverticulitis และ perforation พบบ่อยใน ADPKD และ KT",
        why: "Steroid บดบัง peritoneal sign ใน KT",
        ix: ["CT abdomen"]
      })
    ]),
    N("Metabolic / toxic", "step", {
      s: "ปวดท้องไม่มี localizing sign",
      keys: ["Neuropsychiatric", "Hyponatremia", "Acidosis"]
    }, [
      N("Acute hepatic porphyria", "nephro", {
        s: "Severe abdominal pain, autonomic, neuropathy, hyponatremia, ปัสสาวะสีเข้ม",
        why: "AHP ทำให้ CKD (porphyria-associated kidney disease) และ givosiran ทำให้ eGFR ลด",
        keys: ["Trigger: ยา, alcohol, fasting, menstruation", "Hyponatremia จาก SIADH"],
        ix: ["Spot urine PBG และ ALA ต่อ creatinine (ขณะ attack สูง ≥ 5 เท่า ULN)"],
        std: "AGA 2023 clinical practice update on acute hepatic porphyria",
        link: "pigmenturia"
      }),
      N("Lead nephropathy (lead poisoning)", "nephro", {
        s: "Colic, anemia กับ basophilic stippling, CKD, gout",
        ix: ["Blood lead (สะท้อน exposure ช่วงหลัง ค่าปกติไม่ตัด chronic lead nephropathy ซึ่งดู body burden ด้วย EDTA mobilization test หรือ bone XRF)"]
      }),
      N("DKA / uremia / hypercalcemia / adrenal crisis", "nephro", {
        s: "Metabolic abdominal pain",
        ix: ["Glucose, ketone, BUN, Ca, cortisol"],
        link: "agma"
      })
    ]),
    N("Kidney / urologic", "step", {
      s: "Flank pain ร้าวลงขาหนีบ",
      keys: ["Colicky", "Hematuria", "Fever"]
    }, [
      N("Nephrolithiasis / obstruction", "nephro", {
        s: "Renal colic",
        ix: ["Non-contrast CT KUB", "Stone analysis, 24-h urine metabolic profile"],
        std: "AUA 2014 kidney stone guideline",
        link: "stone"
      }),
      N("ADPKD cyst hemorrhage / infection", "nephro", {
        s: "Acute flank pain ใน ADPKD",
        ix: ["MRI, FDG-PET/CT สำหรับ cyst infection"],
        link: "cysts"
      }),
      N("Acute pyelonephritis / graft pyelonephritis", "nephro", {
        s: "Fever, flank pain และ pyuria (graft pyelonephritis ปวดหรือกดเจ็บที่ graft บริเวณ iliac fossa และอาการน้อยได้)",
        ix: ["Urine culture, US"],
        link: "kt-urine"
      }),
      N("Loin pain hematuria syndrome", "adj", {
        s: "Recurrent loin pain กับ hematuria โดยไม่มีสาเหตุอื่น",
        ix: ["Diagnosis of exclusion"],
        link: "hematuria"
      })
    ])
  ])
};

/* ===================== GI BLEEDING ===================== */
TREES.gibleed = {
  must: [
    "Hematemesis, melena, hematochezia, occult (anemia ที่ไม่มีสาเหตุ)",
    "Antiplatelet, anticoagulant, heparin ระหว่างฟอก, NSAID, steroid",
    "ESA resistance, iron deficiency ซ้ำๆ",
    "Aortic stenosis (Heyde syndrome)",
    "Purpura, ปวดท้อง (IgAV)",
    "KT: CMV status, MMF",
    "Liver disease, varices",
    "Uremic symptoms, Kt/V"
  ],
  tree: N("Gastrointestinal bleeding", "root", {
    s: "Resuscitate และประเมิน severity ก่อน แล้วแยก upper กับ lower และ bleeding diathesis ในผู้ป่วยไต",
    why: "CKD มี angiodysplasia, uremic platelet dysfunction และใช้ antithrombotic บ่อย ทำให้ GI bleeding เป็นปัญหาหลักและเป็นสาเหตุ ESA resistance",
    keys: ["Hemodynamic status", "BUN/Cr ratio สูงชี้ upper GI แต่ใช้ไม่ได้ดีใน CKD", "Melena vs hematochezia"],
    ix: ["CBC, coagulation, type and screen", "EGD ภายใน 24 ชั่วโมง, colonoscopy", "Capsule endoscopy ถ้า EGD และ colonoscopy ลบ", "CTA ถ้า active bleeding"],
    std: "Glasgow-Blatchford score, ACG 2021 upper GI bleeding guideline"
  }, [
    N("Bleeding diathesis in CKD", "step", {
      s: "ปัจจัยที่ทำให้เลือดออกง่ายในผู้ป่วยไต",
      keys: ["Platelet count ปกติแต่ function เสีย", "Anticoagulant"]
    }, [
      N("Uremic platelet dysfunction", "nephro", {
        s: "Bleeding ใน CKD G5 ที่ platelet count ปกติ",
        why: "แก้ด้วย dialysis, DDAVP 0.3 µg/kg, cryoprecipitate, estrogen และแก้ anemia",
        keys: ["Prolonged bleeding time", "ดีขึ้นเมื่อ Hct > 30%"],
        ix: ["Platelet count, PFA-100"],
        link: "bleeding"
      }),
      N("Heparin / anticoagulant / antiplatelet", "nephro", {
        s: "Bleeding ที่สัมพันธ์กับยา",
        why: "DOAC สะสมใน CKD ในระดับต่างกัน (dabigatran มากที่สุด), enoxaparin ต้องปรับขนาดเมื่อ CrCl < 30, ใช้ heparin-free dialysis ใน active bleeding",
        ix: ["aPTT, anti-Xa, INR"],
        link: "hd-bleed"
      })
    ]),
    N("Upper GI", "step", {
      s: "Hematemesis หรือ melena",
      keys: ["Epigastric pain", "NSAID"]
    }, [
      N("Peptic ulcer / uremic gastritis", "nephro", {
        s: "Ulcer ใน CKD, KT ที่ได้ steroid",
        why: "H. pylori, NSAID และ CMV ulcer ใน KT",
        ix: ["EGD, H. pylori test"],
        std: "ACG 2021 UGIB"
      }),
      N("Varices / portal hypertensive gastropathy", "adj", {
        s: "Cirrhosis",
        why: "Variceal bleeding เป็น precipitant ของ AKI ใน cirrhosis ทั้ง prerenal, ATN และ HRS-AKI",
        ix: ["EGD"],
        link: "abdomen"
      }),
      N("Calciphylaxis / lanthanum deposition / sevelamer injury", "nephro", {
        s: "Binder-associated mucosal injury และ GI calciphylaxis (พบน้อย)",
        why: "Sevelamer crystal ทำให้ ulcer และ bleeding ได้ทั้ง upper และ lower GI, lanthanum สะสมในเยื่อบุกระเพาะ (ส่วนใหญ่ไม่มีอาการ)",
        ix: ["Endoscopic biopsy"]
      })
    ]),
    N("Lower / small bowel / occult", "step", {
      s: "Hematochezia หรือ occult bleeding",
      keys: ["Iron deficiency anemia ที่ไม่มีสาเหตุ", "Recurrent"]
    }, [
      N("Angiodysplasia", "nephro", {
        s: "Recurrent occult bleeding ใน CKD และ HD",
        why: "พบบ่อยใน ESKD และ Heyde syndrome (AS กับ acquired von Willebrand)",
        keys: ["Small bowel", "Recurrent iron deficiency, ESA resistance"],
        ix: ["Capsule endoscopy, double balloon enteroscopy", "vWF multimer ถ้ามี AS"],
        std: "ACG 2015 small bowel bleeding guideline",
        link: "cytopenia"
      }),
      N("Colorectal cancer / diverticular bleeding", "adj", {
        s: "ผู้สูงอายุ, ADPKD ที่เป็น ESKD มีรายงาน diverticulosis และ diverticulitis มากขึ้น",
        ix: ["Colonoscopy"]
      }),
      N("Ischemic colitis", "nephro", {
        s: "Hematochezia กับปวดท้องหลัง IDH",
        ix: ["Colonoscopy, CT"],
        link: "abdpain"
      }),
      N("Kayexalate (SPS) colonic necrosis", "nephro", {
        s: "Bleeding หรือ perforation หลังได้ sodium polystyrene sulfonate",
        why: "Crystal ใน mucosa เสี่ยงสูงใน post-op, ileus และเมื่อให้ร่วมกับ sorbitol (แต่มีรายงานแม้ไม่มี sorbitol)",
        ix: ["Colon biopsy: basophilic crystal"]
      })
    ]),
    N("Systemic disease", "step", {
      s: "GI bleeding กับ multisystem disease",
      keys: ["Purpura", "Immunosuppression"]
    }, [
      N("IgA vasculitis / PAN / ANCA", "nephro", {
        s: "GI vasculitis",
        ix: ["Endoscopy, skin biopsy, ANCA"],
        link: "abdpain"
      }),
      N("CMV colitis / PTLD in KT", "nephro", {
        s: "Bleeding ulcer ใน KT",
        ix: ["Biopsy IHC CMV, EBV"],
        link: "kt-fever"
      }),
      N("AL amyloid GI involvement", "nephro", {
        s: "Bleeding จาก vascular fragility และ factor X deficiency",
        ix: ["GI biopsy Congo red, factor X"],
        link: "mspike"
      }),
      N("TMA / thrombocytopenia", "nephro", {
        s: "Bleeding กับ platelet ต่ำ",
        ix: ["Smear, ADAMTS13"],
        link: "tma"
      })
    ])
  ])
};

/* ===================== JAUNDICE ===================== */
TREES.jaundice = {
  must: [
    "Onset, ไข้, ปวดท้อง RUQ, ปัสสาวะสีเข้ม, อุจจาระสีซีด, คัน",
    "Exposure: ลุยน้ำ ทำนา (leptospirosis), เดินป่า, malaria endemic area",
    "Alcohol, HBV, HCV, ยาสมุนไพร",
    "ยา: paracetamol, antituberculous, amoxicillin-clavulanate, statin, CNI",
    "G6PD deficiency, ยา oxidant, ถั่วปากอ้า",
    "Anemia, schistocyte, ประวัติ autoimmune",
    "Urine output, Cr ขึ้นเมื่อไร",
    "KT: hepatitis reactivation, CMV, drug"
  ],
  tree: N("Jaundice", "root", {
    s: "แยก unconjugated (hemolysis) กับ conjugated (hepatocellular, cholestatic) แล้วหาโรคที่เสียทั้งตับและไต",
    why: "Jaundice กับ AKI ชี้ไปที่ leptospirosis, malaria, hemolysis, HRS, cholemic nephropathy และ viral hepatitis-GN",
    keys: ["Direct vs indirect bilirubin", "AST/ALT vs ALP pattern (R ratio)", "Hemolysis markers", "AKI pattern: prerenal vs ATN vs pigment"],
    ix: ["Total และ direct bilirubin, AST, ALT, ALP, GGT, INR, albumin", "CBC, smear, reticulocyte, LDH, haptoglobin, DAT, G6PD", "UA: bilirubin, heme บวกไม่มี RBC", "US abdomen"],
    std: "ACG 2017 abnormal liver chemistries guideline"
  }, [
    N("Unconjugated: hemolysis", "step", {
      s: "Indirect bilirubin สูง LDH สูง haptoglobin ต่ำ",
      keys: ["DAT", "Schistocyte", "Bite cell"]
    }, [
      N("TMA (TTP, HUS, CM-HUS)", "nephro", {
        s: "MAHA, thrombocytopenia, AKI",
        keys: ["Schistocyte > 1% (ไม่พบ schistocyte ไม่ตัด TMA ที่จำกัดอยู่ในไต)", "DAT ลบ (ยกเว้น pneumococcal HUS ที่ DAT บวกได้)"],
        ix: ["ADAMTS13, stool STEC, complement studies"],
        std: "ISTH 2020 TTP, KDIGO 2017 aHUS controversies",
        link: "tma"
      }),
      N("G6PD deficiency hemolysis", "nephro", {
        s: "Acute hemolysis หลังยา infection หรือถั่วปากอ้า",
        why: "Hemoglobinuria ทำให้ pigment nephropathy (ATN) พบบ่อยในชายไทย",
        keys: ["Bite cell, Heinz body", "G6PD level อาจปกติช่วง hemolysis"],
        ix: ["G6PD level ซ้ำหลัง 2-3 เดือน", "Urine heme บวกไม่มี RBC"],
        link: "pigmenturia"
      }),
      N("Autoimmune hemolytic anemia", "nephro", {
        s: "DAT บวก",
        why: "SLE, CLL, lymphoma และ drug",
        ix: ["DAT, cold agglutinin, ANA"],
        link: "cytopenia"
      }),
      N("Severe malaria (P. falciparum)", "nephro", {
        s: "Fever, jaundice, AKI, blackwater fever",
        why: "Malaria AKI จาก ATN, hemoglobinuria และ microvascular obstruction",
        ix: ["Thick and thin blood film, rapid antigen test"],
        std: "WHO 2023 malaria guideline (severe malaria criteria)"
      }),
      N("Thalassemia / PNH / mechanical valve", "adj", {
        s: "Chronic hemolysis",
        why: "PNH ทำให้ hemosiderosis ของไตและ CKD, thalassemia ทำให้ tubulopathy",
        ix: ["Hb typing, flow cytometry CD55/CD59"]
      })
    ]),
    N("Conjugated: hepatocellular", "step", {
      s: "AST, ALT สูงเด่น (ยกเว้น leptospirosis ที่ bilirubin สูงเด่นกว่า transaminase)",
      keys: ["Infection", "Drug", "Ischemic"]
    }, [
      N("Leptospirosis (Weil disease)", "nephro", {
        s: "Fever, jaundice, AKI, myalgia, conjunctival suffusion",
        why: "Bilirubin สูงมากโดย transaminase สูงเพียงเล็กน้อย และ AKI มักเป็น non-oliguric ร่วมกับ hypokalemia (รายรุนแรงเป็น oliguric และ hyperkalemia ได้)",
        keys: ["Bilirubin สูงแต่ AST, ALT สูงไม่มาก", "CK สูง", "Thrombocytopenia"],
        ix: ["PCR จากเลือดในสัปดาห์แรก, MAT แบบ paired serum (MAT ครั้งแรกลบไม่ตัดโรค ให้รักษาก่อนถ้าสงสัย)"],
        std: "WHO leptospirosis guidance",
        link: "fever"
      }),
      N("Viral hepatitis with kidney disease", "nephro", {
        s: "HBV-MN, HBV-associated polyarteritis nodosa, HCV-MPGN (cryoglobulinemic), HAV-AKI, HEV-GN",
        ix: ["HBsAg, HBV DNA, anti-HCV, HCV RNA, anti-HAV IgM, HEV"],
        link: "viral"
      }),
      N("Drug-induced liver injury", "nephro", {
        s: "Antituberculous, paracetamol, herbal",
        why: "Paracetamol overdose ทำให้ ATN และ DRESS ทำให้ hepatitis กับ AIN",
        keys: ["RUCAM causality", "Eosinophilia"],
        ix: ["Paracetamol level, drug review"],
        std: "ACG 2021 DILI guideline",
        link: "fever"
      }),
      N("Ischemic hepatitis / cardiorenal", "nephro", {
        s: "AST, ALT สูงมากหลัง shock",
        ix: ["Echo, lactate"],
        link: "dyspnea"
      }),
      N("Scrub typhus / dengue / rickettsia", "adj", {
        s: "Tropical fever กับ hepatitis และ AKI",
        ix: ["Scrub typhus IFA, dengue NS1 และ IgM"]
      })
    ]),
    N("Conjugated: cholestatic", "step", {
      s: "ALP และ GGT สูงเด่น",
      keys: ["Bile duct dilatation", "Infiltration"]
    }, [
      N("Obstruction: stone, cholangiocarcinoma, pancreatic cancer", "adj", {
        s: "Painless jaundice ในอีสานให้คิด cholangiocarcinoma",
        why: "Cholangiocarcinoma พบมากในภาคอีสานจาก liver fluke",
        ix: ["US, MRCP, CA 19-9"]
      }),
      N("Infiltrative: AL amyloid, sarcoidosis, TB, lymphoma", "nephro", {
        s: "ALP สูงมาก hepatomegaly",
        ix: ["sFLC, liver biopsy"],
        link: "alp"
      }),
      N("IgG4-related sclerosing cholangitis", "nephro", {
        s: "Obstructive jaundice กับ pancreas และ kidney involvement",
        ix: ["Serum IgG4 (ปกติไม่ตัดโรค และสูงได้ในโรคอื่น), MRCP, CT, biopsy"],
        link: "weightloss"
      }),
      N("Sepsis-associated cholestasis", "adj", {
        s: "Cholestasis ระหว่าง sepsis",
        ix: ["Culture"]
      })
    ]),
    N("Liver failure with AKI", "step", {
      s: "AKI ที่เป็นผลตามมาใน cirrhosis, acute liver failure หรือ severe hyperbilirubinemia (เป็นผลต่อไต ไม่ใช่สาเหตุของ jaundice)",
      keys: ["Ascites", "Encephalopathy"]
    }, [
      N("HRS-AKI", "nephro", {
        s: "AKI functional ใน cirrhosis",
        ix: ["Urine Na, FENa, UA, การตอบสนองต่อ volume resuscitation ใน 24 ชั่วโมง"],
        std: "ICA-ADQI 2024",
        link: "abdomen"
      }),
      N("Cholemic nephropathy (bile cast nephropathy)", "nephro", {
        s: "AKI ใน severe hyperbilirubinemia",
        why: "Bile cast ใน distal tubule ร่วมกับ direct tubular toxicity ของ bile acid ทำให้ ATN มักเกิดเมื่อ bilirubin > 20 mg/dL ทั้งใน obstructive jaundice และ liver failure",
        keys: ["Bilirubin สูงมาก", "UA: bile-stained granular cast"],
        ix: ["UA microscopy, kidney biopsy ถ้าจำเป็น"],
        link: "risingcr"
      }),
      N("ATN / bile cast / IgAN in cirrhosis", "nephro", {
        s: "Structural AKI ใน cirrhosis",
        ix: ["UA, urine NGAL, biopsy"],
        link: "risingcr"
      })
    ])
  ])
};

/* ===================== PRURITUS ===================== */
TREES.pruritus = {
  must: [
    "ระยะเวลา, ตำแหน่ง (generalized, back, legs), แย่ลงกลางคืนหรือระหว่างฟอก",
    "ผื่นนำมาก่อนหรือไม่ (primary skin disease vs secondary)",
    "Dialysis adequacy, PO4, Ca, PTH",
    "Jaundice, ปัสสาวะสีเข้ม, อุจจาระซีด",
    "ยาใหม่, allergy, ยาที่มี opioid",
    "Weight loss, ไข้, เหงื่อกลางคืน, lymphadenopathy",
    "อาบน้ำร้อน, ผิวแห้ง",
    "การนอน, quality of life, depression"
  ],
  tree: N("Pruritus", "root", {
    s: "แยก pruritus ที่มีผื่น primary กับไม่มีผื่น แล้วหาสาเหตุ systemic โดยเฉพาะ CKD-aP",
    why: "CKD-associated pruritus พบในผู้ป่วย HD ราว 40% และสัมพันธ์กับ mortality, depression และ sleep disturbance",
    keys: ["Primary lesion vs excoriation", "Distribution", "Uremic parameters"],
    ix: ["BUN, Kt/V, Ca, PO4, PTH, ferritin", "LFT, bilirubin, ALP", "CBC, TSH, glucose", "Skin biopsy ถ้ามี lesion ผิดปกติ"],
    std: "KDIGO 2024 CKD (symptom management), WI-NRS"
  }, [
    N("CKD-associated", "step", {
      s: "Pruritus ใน CKD G4-5D ที่ไม่มีสาเหตุอื่น",
      keys: ["มักสองข้างสมมาตร เด่นที่หลังและแขน แต่ generalized ได้", "มักแย่ลงกลางคืน บางรายแย่ลงระหว่างหรือหลังฟอก"]
    }, [
      N("CKD-associated pruritus (uremic pruritus)", "nephro", {
        s: "Immune dysregulation, opioid imbalance (mu มากกว่า kappa), xerosis",
        why: "Difelikefalin IV (kappa agonist) ลด itch ใน KALM-1 (n = 378, ผู้ป่วย HD ที่ itch moderate ถึง severe) WI-NRS ดีขึ้น ≥ 3 จุด 49.1% vs 27.9% ข้อมูลนี้ไม่ครอบคลุม non-dialysis CKD และ PD",
        keys: ["Xerosis", "Kt/V ต่ำเพิ่มอาการ"],
        ix: ["WI-NRS, 5-D itch scale", "Kt/V, URR"],
        std: "KALM-1 (NEJM 2020), KDIGO 2024 CKD"
      }),
      N("Hyperphosphatemia / secondary HPT", "nephro", {
        s: "Itch ที่อาจดีขึ้นเมื่อคุม PO4 และ PTH (หลักฐานความสัมพันธ์ไม่สม่ำเสมอ DOPPS ไม่พบความสัมพันธ์กับ Ca, PO4, PTH)",
        why: "Ca-PO4 product สูง และ parathyroidectomy ลดอาการได้ในบางราย",
        ix: ["PO4, Ca, PTH"],
        std: "KDIGO 2017 CKD-MBD",
        link: "hd-mbd"
      }),
      N("Inadequate dialysis / high-flux", "nephro", {
        s: "Pruritus ที่ดีขึ้นเมื่อเพิ่ม dialysis dose",
        ix: ["spKt/V (KDOQI: target 1.4, minimum delivered 1.2 สำหรับ HD 3 ครั้งต่อสัปดาห์)"],
        std: "KDOQI 2015 HD adequacy"
      }),
      N("Calciphylaxis prodrome / NSF", "nephro", {
        s: "Painful pruritic skin ก่อน necrotic ulcer",
        ix: ["Skin biopsy"],
        link: "skinulcer"
      })
    ]),
    N("Cholestatic", "step", {
      s: "Itch กับ ALP สูงหรือ jaundice",
      keys: ["Palms and soles", "Night itch"]
    }, [
      N("Cholestasis: PBC, PSC, drug, obstruction", "adj", {
        s: "ALP และ GGT สูง",
        why: "PBC สัมพันธ์กับ dRTA (มีรายงาน MN) ส่วน PSC สัมพันธ์กับ IBD และต้องแยกจาก IgG4-related sclerosing cholangitis",
        ix: ["AMA, US, MRCP"],
        link: "jaundice"
      }),
      N("HCV / HBV", "nephro", {
        s: "Chronic hepatitis",
        ix: ["HBV, HCV serology"],
        link: "viral"
      })
    ]),
    N("Hematologic / malignancy", "step", {
      s: "Itch โดยไม่มีผื่นในผู้สูงอายุหรือมี B symptoms",
      keys: ["Aquagenic pruritus", "Lymphadenopathy"]
    }, [
      N("Iron deficiency / polycythemia vera", "adj", {
        s: "Aquagenic pruritus ใน PV",
        why: "Erythrocytosis หลัง KT (post-transplant erythrocytosis) หรือจาก ESA ต้องแยกจาก PV",
        ix: ["Ferritin, JAK2 V617F"],
        link: "cytopenia"
      }),
      N("Lymphoma / myeloma / paraneoplastic", "nephro", {
        s: "Hodgkin lymphoma มี pruritus ได้นานก่อน diagnosis",
        why: "Hodgkin lymphoma สัมพันธ์กับ MCD (paraneoplastic)",
        ix: ["CBC, LDH, CT, SPEP"],
        link: "lymphnode"
      })
    ]),
    N("Endocrine / drug / skin", "step", {
      s: "สาเหตุอื่นที่แก้ได้",
      keys: ["ยาใหม่", "Primary skin lesion"]
    }, [
      N("Thyroid / diabetes", "adj", {
        s: "Hyperthyroidism หรือ xerosis จาก hypothyroidism",
        ix: ["TSH, glucose"]
      }),
      N("Drug: opioid, ACEi, hydroxyethyl starch, allergy to dialyzer", "nephro", {
        s: "Itch ระหว่างฟอกจาก dialyzer reaction หรือยา",
        why: "Type A (anaphylactic) dialyzer reaction มักเกิดใน 5 นาทีแรก (ช้าได้ถึง 30 นาที) มี itch, urticaria, bronchospasm ส่วน type B เกิดช้ากว่า อาการเด่นคือ chest pain และ back pain ไม่ใช่ itch",
        ix: ["Drug review, เปลี่ยน dialyzer membrane"]
      }),
      N("Scabies / dermatitis / bullous pemphigoid", "nephro", {
        s: "Primary skin disease",
        why: "Crusted scabies ใน KT, bullous pemphigoid กับ DPP-4 inhibitor",
        ix: ["Skin scraping, biopsy with DIF"],
        link: "rash"
      }),
      N("Neuropathic / psychogenic", "adj", {
        s: "Localized itch หรือ delusional parasitosis",
        ix: ["Diagnosis of exclusion"]
      })
    ])
  ])
};

/* ===================== CRAMPS / TETANY ===================== */
TREES.cramps = {
  must: [
    "Cramp (ปวดเกร็งกล้ามเนื้อ) หรือ tetany (มือจีบ, perioral tingling)",
    "เกิดระหว่างฟอก ช่วงไหนของรอบ, UF volume, dry weight",
    "Post-parathyroidectomy, thyroidectomy",
    "PPI, diuretic, cisplatin, aminoglycoside, amphotericin, CNI",
    "Diarrhea, alcohol, malabsorption",
    "Salt craving, nocturia, family history (Gitelman)",
    "Hyperventilation, anxiety",
    "Cramp กลางคืนที่น่อง, PAD, ยา statin"
  ],
  tree: N("Muscle cramps / tetany", "root", {
    s: "แยก true tetany (neuromuscular hyperexcitability จาก Ca, Mg, alkalosis) ออกจาก muscle cramp แล้วไล่สาเหตุตามบริบท",
    why: "Tetany นำไปสู่การวินิจฉัย hungry bone, hypomagnesemia, Gitelman และ alkalosis ส่วน intradialytic cramp ส่วนใหญ่เป็นปัญหา dry weight และ UF rate",
    keys: ["Chvostek และ Trousseau sign", "Carpopedal spasm", "Timing กับ dialysis"],
    ix: ["Ionized Ca, Mg, PO4, K, albumin", "Blood gas", "PTH, 25-OH D", "Urine Mg, Ca, Cl"],
    std: "Electrolyte-based approach"
  }, [
    N("Hypocalcemia", "step", {
      s: "Ionized Ca ต่ำ",
      keys: ["PTH ต่ำหรือปกติทั้งที่ Ca ต่ำ: hypoparathyroidism, Mg ต่ำ, hungry bone หลัง parathyroidectomy", "PTH สูง: vitamin D deficiency, CKD, ยา (denosumab, bisphosphonate), Ca ถูกจับในเนื้อเยื่อ"]
    }, [
      N("Hungry bone syndrome", "nephro", {
        s: "Ca และ PO4 ต่ำหลัง parathyroidectomy",
        why: "Pre-op ALP สูงและ PTH สูงมากทำนาย risk ต้องให้ Ca และ calcitriol ขนาดสูง",
        keys: ["เกิดภายใน 1 ถึง 4 วันหลัง parathyroidectomy และอยู่นานเป็นสัปดาห์ถึงเดือน", "Hypophosphatemia และ hypomagnesemia ร่วมด้วย"],
        ix: ["Ca ทุก 6 ชั่วโมงหลังผ่าตัด, PO4, Mg"],
        link: "hypoca"
      }),
      N("Hypoparathyroidism", "nephro", {
        s: "Post-thyroidectomy, autoimmune, infiltrative",
        why: "การรักษาด้วย Ca และ calcitriol ทำให้ hypercalciuria และ nephrocalcinosis",
        ix: ["PTH, urine Ca"],
        std: "International hypoparathyroidism guideline 2022",
        link: "hypoca"
      }),
      N("CKD-MBD / vitamin D deficiency", "nephro", {
        s: "Hypocalcemia ใน CKD",
        ix: ["25-OH D, PTH, PO4"],
        std: "KDIGO 2017 CKD-MBD",
        link: "hypoca"
      }),
      N("Drug: denosumab, bisphosphonate, cinacalcet, foscarnet", "nephro", {
        s: "Drug-induced hypocalcemia",
        why: "Denosumab ใน CKD G4 ถึง G5 และ dialysis ทำให้ severe hypocalcemia ได้บ่อย ต้องแก้ vitamin D และ monitor Ca หลังฉีด",
        ix: ["Drug review, Ca"],
        link: "bonepain"
      }),
      N("Rhabdomyolysis / tumor lysis / pancreatitis", "nephro", {
        s: "Ca ถูกจับกับ PO4 หรือ deposit ในเนื้อเยื่อ",
        why: "ใน rhabdomyolysis ให้ Ca เฉพาะเมื่อมีอาการหรือ hyperkalemia รุนแรง เพราะระยะฟื้นตัวเกิด rebound hypercalcemia ได้",
        ix: ["CK, PO4, urate, lipase"],
        link: "myalgia"
      })
    ]),
    N("Hypomagnesemia", "step", {
      s: "Mg ต่ำ แยก GI loss กับ renal loss",
      keys: ["FEMg > 2% ขณะ Mg ต่ำและ GFR ปกติ (บางตำราใช้ > 4%): renal loss", "FEMg < 2%: extrarenal loss (GI, PPI) หรือ redistribution"]
    }, [
      N("Gitelman syndrome", "nephro", {
        s: "Hypokalemic alkalosis, hypomagnesemia, hypocalciuria",
        keys: ["BP ปกติหรือต่ำ", "Urine Ca/Cr < 0.2 mmol/mmol", "CPPD และ chondrocalcinosis", "ต้องแยก thiazide use และ surreptitious vomiting หรือ laxative (urine Cl ต่ำ) ก่อนวินิจฉัย"],
        ix: ["Urine Mg, Ca, Cl", "SLC12A3 genetic testing"],
        std: "KDIGO 2017 Gitelman consensus",
        link: "metalk"
      }),
      N("PPI-induced hypomagnesemia", "nephro", {
        s: "Mg ต่ำมากใน PPI ระยะยาว",
        why: "PPI ลดการดูดซึม Mg ผ่าน TRPM6/7 ในลำไส้ ไตจึงเก็บ Mg เต็มที่และ FEMg ต่ำ",
        ix: ["FEMg"],
        link: "mg"
      }),
      N("Drug-induced renal Mg wasting", "nephro", {
        s: "CNI, cisplatin, amphotericin, aminoglycoside, EGFR inhibitor, loop diuretic",
        why: "CNI (tacrolimus มากกว่า cyclosporine) ลด TRPM6 ที่ DCT ทำให้ hypomagnesemia หลัง KT ซึ่งสัมพันธ์กับความเสี่ยง PTDM ที่สูงขึ้น",
        ix: ["FEMg, drug level"],
        link: "mg"
      }),
      N("GI loss / alcohol / malabsorption", "adj", {
        s: "Chronic diarrhea, alcohol",
        ix: ["FEMg ต่ำ"],
        link: "diarrhea"
      }),
      N("Familial hypomagnesemia with hypercalciuria and nephrocalcinosis", "nephro", {
        s: "Mg ต่ำ, hypercalciuria, nephrocalcinosis และ CKD ตั้งแต่เด็ก",
        ix: ["CLDN16, CLDN19 genetic testing"],
        link: "stone"
      })
    ]),
    N("Alkalosis", "step", {
      s: "Ionized Ca ลดเมื่อ pH สูง",
      keys: ["Total Ca ปกติแต่ ionized ต่ำ"]
    }, [
      N("Respiratory alkalosis / hyperventilation", "adj", {
        s: "Anxiety, pain, sepsis, salicylate",
        ix: ["ABG"]
      }),
      N("Metabolic alkalosis", "nephro", {
        s: "Vomiting, diuretic, Bartter, Gitelman, high bicarbonate dialysate",
        ix: ["Urine Cl"],
        link: "metalk"
      })
    ]),
    N("Intradialytic cramps", "step", {
      s: "Cramp ระหว่างฟอก โดยเฉพาะครึ่งหลังของรอบ",
      keys: ["UF rate สูง", "Dry weight ต่ำเกินไป"]
    }, [
      N("Excessive ultrafiltration / dry weight too low", "nephro", {
        s: "Cramp กับ IDH ช่วงท้ายฟอก",
        why: "Vasoconstriction และ muscle hypoperfusion",
        keys: ["UF rate สูง (> 13 mL/kg/h เป็นค่าที่สัมพันธ์กับ mortality ใน observational study ไม่ใช่ threshold ของ cramp โดยตรง)", "IDWG สูง"],
        ix: ["UF rate, BIA, IDWG"],
        std: "KDOQI 2015 HD adequacy",
        link: "hd-idh"
      }),
      N("Low dialysate Na / Mg / K, carnitine deficiency", "nephro", {
        s: "Dialysate prescription ที่ทำให้ cramp",
        ix: ["Dialysate prescription, pre-HD Mg"]
      })
    ]),
    N("Other muscle cramp", "step", {
      s: "Cramp ที่ไม่ได้เกิดจาก Ca, Mg, alkalosis หรือ dialysis",
      keys: ["Nocturnal leg cramp", "Exercise-related"]
    }, [
      N("Hypothyroidism / statin / diuretic", "adj", {
        s: "Myopathy หรือ cramp จาก hypothyroidism หรือจากยา (statin, diuretic)",
        ix: ["TSH, CK"],
        link: "myalgia"
      }),
      N("Volume depletion / hyponatremia", "nephro", {
        s: "Cramp ในผู้ได้ diuretic หรือเสียเหงื่อมากจากความร้อน",
        ix: ["Na, orthostatic vital signs"],
        link: "syncope"
      }),
      N("Peripheral arterial disease / neuropathy", "adj", {
        s: "Claudication หรือ neuropathic cramp",
        ix: ["ABI (สูงลวงได้จาก medial calcification ใน CKD และ DM ถ้า ABI > 1.4 หรือไม่เข้ากับอาการให้ใช้ TBI)"],
        link: "bluetoe"
      }),
      N("Hypokalemia", "nephro", {
        s: "Cramp, weakness",
        ix: ["K, urine K"],
        link: "hypok"
      })
    ])
  ])
};

/* ===================== MYALGIA / RHABDOMYOLYSIS ===================== */
TREES.myalgia = {
  must: [
    "Myalgia หรือ weakness, ปัสสาวะสีโค้ก",
    "Exercise หนัก, heat, ล้มนอนนาน, seizure, crush",
    "ยา: statin (โดยเฉพาะร่วมกับ CNI, fibrate, macrolide, azole), colchicine, daptomycin, zidovudine",
    "Alcohol, cocaine, amphetamine, herbal",
    "ไข้, ลุยน้ำ (leptospirosis), influenza, COVID",
    "Hypokalemia, hypophosphatemia (refeeding, DKA)",
    "Recurrent episode หลังออกกำลังหรืออดอาหาร (metabolic myopathy)",
    "ผื่น, dysphagia, ILD (inflammatory myopathy)"
  ],
  tree: N("Myalgia / rhabdomyolysis", "root", {
    s: "วัด CK ก่อน แล้วแยก traumatic, exertional, drug, infection, metabolic และ inflammatory",
    why: "Rhabdomyolysis เป็นสาเหตุ AKI จาก pigment nephropathy ที่ป้องกันได้ และ drug interaction กับ CNI เป็นจุดที่ออกสอบบ่อย",
    keys: ["CK > 5 เท่า ULN (มักใช้ > 1,000 U/L)", "Urine dipstick heme บวกแต่ไม่มี RBC (พบใน hemoglobinuria ได้เช่นกัน และ dipstick ลบไม่ตัด rhabdomyolysis ให้ยึด CK)", "Hyperkalemia, hyperphosphatemia, hypocalcemia, hyperuricemia"],
    ix: ["CK, myoglobin, K, PO4, Ca, urate, Cr", "UA dipstick และ microscopy", "TSH, drug screen", "Genetic หรือ muscle biopsy ใน recurrent"],
    std: "McMahon score (JAMA Intern Med 2013, ผู้ป่วย CK > 5,000 U/L: score < 5 เสี่ยง RRT หรือ in-hospital death ราว 3%, score > 10 ราว 59%, งาน validation ภายหลังใช้ ≥ 6 เป็น cutoff ทำนาย RRT)"
  }, [
    N("Traumatic / compressive / exertional", "step", {
      s: "สาเหตุ mechanical",
      keys: ["Immobilization", "Exercise หนัก", "Heat"]
    }, [
      N("Crush / prolonged immobilization", "nephro", {
        s: "ล้มนอนนาน, compartment syndrome",
        ix: ["CK, compartment pressure"]
      }),
      N("Exertional rhabdomyolysis / heat stroke", "nephro", {
        s: "Military training, marathon, heat",
        why: "Sickle trait และ hypokalemia เพิ่ม risk",
        ix: ["CK, core temperature"]
      }),
      N("Seizure / agitation / dystonia", "adj", {
        s: "Muscle hyperactivity",
        ix: ["CK, EEG"],
        link: "seizure"
      })
    ]),
    N("Drug / toxin", "step", {
      s: "กลุ่มสาเหตุที่พบบ่อยในผู้ป่วยไตและ KT เพราะ drug interaction ต้องทบทวนยาทุกราย",
      keys: ["Drug interaction", "Alcohol"]
    }, [
      N("Statin with interacting drug", "nephro", {
        s: "Statin ร่วมกับ cyclosporine, gemfibrozil, macrolide, azole",
        why: "Cyclosporine เพิ่ม exposure ของ statin เกือบทุกตัว (ยับยั้ง OATP1B1 และ CYP3A4) ต้องใช้ขนาดต่ำ และหลีกเลี่ยง simvastatin, lovastatin ซึ่งเสี่ยงสุด ส่วน tacrolimus มี interaction น้อยกว่ามาก",
        keys: ["เพิ่งเริ่มหรือเพิ่มขนาด statin หรือเพิ่งได้ยาที่มี interaction", "Proximal myalgia"],
        ix: ["CK, drug list"],
        std: "KDIGO 2013 lipid management in CKD"
      }),
      N("Colchicine myoneuropathy", "nephro", {
        s: "Proximal weakness, CK สูงใน CKD ที่ได้ colchicine",
        why: "Colchicine สะสมใน CKD และเมื่อใช้ร่วมกับ CYP3A4 หรือ P-gp inhibitor (clarithromycin, cyclosporine)",
        ix: ["CK, EMG, muscle biopsy: vacuolar myopathy"]
      }),
      N("Alcohol / cocaine / amphetamine / snake bite", "nephro", {
        s: "Toxin-induced rhabdomyolysis",
        why: "ในไทย sea snake (myotoxin) ทำให้ rhabdomyolysis เด่น ส่วน Russell viper ทำให้ coagulopathy, hemolysis, AKI และ TMA เด่น (rhabdomyolysis พบร่วมได้)",
        ix: ["Toxicology, 20-minute whole blood clotting test"]
      })
    ]),
    N("Infection", "step", {
      s: "Myalgia กับไข้",
      keys: ["Tropical", "Viral"]
    }, [
      N("Leptospirosis", "nephro", {
        s: "Calf tenderness, fever, AKI, jaundice",
        ix: ["MAT, PCR, CK"],
        link: "fever"
      }),
      N("Influenza / COVID-19 / dengue", "nephro", {
        s: "Viral myositis กับ AKI",
        ix: ["Viral PCR, NS1"]
      }),
      N("Pyomyositis / melioidosis", "adj", {
        s: "Focal muscle abscess",
        ix: ["MRI, culture"]
      }),
      N("Trichinosis / scrub typhus", "adj", {
        s: "Trichinosis: myalgia, periorbital edema, eosinophilia ส่วน scrub typhus: ไข้, eschar, myalgia (ไม่มี eosinophilia)",
        ix: ["Serology"]
      })
    ]),
    N("Metabolic / electrolyte", "step", {
      s: "Electrolyte หรือ endocrine ทำให้กล้ามเนื้อสลาย",
      keys: ["Recurrent", "Refeeding"]
    }, [
      N("Severe hypokalemia", "nephro", {
        s: "K < 2.5 mmol/L ทำให้เกิด rhabdomyolysis ได้",
        why: "Rhabdo ปล่อย K ทำให้ serum K ที่วัดได้ดูไม่ต่ำมาก",
        ix: ["K, urine K"],
        link: "hypok"
      }),
      N("Hypophosphatemia", "nephro", {
        s: "PO4 < 1 mg/dL ใน refeeding, alcohol, DKA",
        ix: ["PO4"],
        link: "phos"
      }),
      N("Hypothyroidism / hyperosmolar state", "adj", {
        s: "CK สูงเรื้อรังใน hypothyroidism และ rhabdomyolysis ใน HHS หรือ DKA",
        ix: ["TSH, osmolality"]
      }),
      N("Inherited metabolic myopathy", "nephro", {
        s: "Recurrent rhabdo หลังออกกำลังหรืออดอาหาร",
        why: "McArdle (glycogen), CPT II deficiency (fatty acid), mitochondrial",
        keys: ["Second wind phenomenon ใน McArdle", "Fasting หรือ infection trigger ใน CPT II"],
        ix: ["Acylcarnitine profile, forearm exercise test, genetic panel"]
      })
    ]),
    N("Inflammatory myopathy", "step", {
      s: "Subacute proximal weakness กับ CK สูง",
      keys: ["Rash", "ILD", "Dysphagia"]
    }, [
      N("Dermatomyositis / polymyositis / anti-synthetase", "nephro", {
        s: "Proximal weakness, heliotrope, Gottron, mechanic hands",
        why: "ผลต่อไตพบน้อย: myoglobinuric AKI และ GN เช่น MN และ dermatomyositis สัมพันธ์กับ malignancy จึงต้อง screen มะเร็ง",
        ix: ["Myositis-specific antibody, MRI muscle, biopsy"],
        std: "EULAR/ACR 2017 IIM classification",
        link: "weakness"
      }),
      N("SLE / MCTD / vasculitis myositis", "nephro", {
        s: "Myositis ใน CTD",
        ix: ["ANA, anti-U1 RNP"],
        link: "arthralgia"
      }),
      N("Statin-associated immune-mediated necrotizing myopathy", "nephro", {
        s: "CK สูงและ proximal weakness ที่ไม่ดีขึ้นหรือแย่ลงแม้หยุด statin แล้ว",
        ix: ["Anti-HMGCR antibody"]
      })
    ])
  ])
};

/* ===================== ALTERED MENTAL STATUS ===================== */
TREES.ams = {
  must: [
    "Onset และ fluctuation, baseline cognition",
    "ระหว่างหรือหลังฟอก, ฟอกครั้งแรก, ขาดฟอก",
    "ยาใหม่หรือขนาดเพิ่ม: gabapentin, pregabalin, acyclovir, cefepime, opioid, baclofen, metformin, lithium",
    "Tacrolimus หรือ cyclosporine level, BP",
    "Fever, คอแข็ง, ผื่น (CNS infection, TTP, SLE)",
    "Glucose ล่าสุด, insulin, sulfonylurea",
    "Liver disease, alcohol",
    "Fall, anticoagulant (subdural)"
  ],
  tree: N("Altered mental status / encephalopathy", "root", {
    s: "แยก structural จาก metabolic หรือ toxic encephalopathy แล้วคิดสาเหตุที่พบเพิ่มในผู้ป่วยไต โดยสาเหตุทั่วไป (stroke, sepsis, hypoglycemia) ยังต้องคิดเท่าคนทั่วไป",
    why: "ใน CKD encephalopathy มักเกิดจากยาสะสมและ metabolic มากกว่า uremia เอง และต้องตัด PRES, CNS infection และ TTP",
    keys: ["Focal sign", "Asterixis, myoclonus", "Meningism", "BP"],
    ix: ["Glucose, Na, Ca, Mg, PO4, BUN, ammonia, blood gas", "Drug level ที่ทำได้", "CT brain แล้ว MRI", "LP, EEG (non-convulsive status)"],
    std: "CAM-ICU for delirium"
  }, [
    N("Uremic and dialysis-related", "step", {
      s: "สัมพันธ์กับ uremia หรือการฟอก",
      keys: ["BUN สูง", "Timing กับ dialysis"]
    }, [
      N("Uremic encephalopathy", "nephro", {
        s: "Lethargy, asterixis, myoclonus, seizure ใน AKI หรือ CKD G5",
        why: "เป็นข้อบ่งชี้ dialysis และเป็น diagnosis of exclusion ต้องหาสาเหตุอื่นไปพร้อมกัน (ยาสะสม, metabolic, infection, structural) โดยไม่ทำให้การฟอกล่าช้า",
        keys: ["ดีขึ้นภายในไม่กี่วันหลังเริ่มฟอก ถ้าไม่ดีขึ้นต้องหาสาเหตุอื่น"],
        ix: ["BUN (ไม่มี cutoff ระดับ BUN สัมพันธ์กับอาการไม่ดี ใน AKI เกิดที่ระดับต่ำกว่าเพราะขึ้นเร็ว), EEG: diffuse slowing, triphasic wave (ไม่จำเพาะ)"],
        std: "KDIGO 2024 CKD"
      }),
      N("Dialysis disequilibrium syndrome", "nephro", {
        s: "Headache, nausea, confusion, seizure ระหว่างหรือหลังฟอกครั้งแรกๆ ในผู้ที่ BUN สูงมาก",
        why: "ป้องกันด้วยการตั้งเป้า urea reduction ในรอบแรกไม่เกินราว 40% โดยฟอกสั้น (ราว 2 ชั่วโมง) ใช้ dialyzer เล็กและ blood flow ต่ำ",
        ix: ["Pre-HD BUN, ตัด structural lesion"],
        link: "seizure"
      }),
      N("Wernicke / thiamine deficiency", "nephro", {
        s: "Confusion, ophthalmoplegia, ataxia ใน dialysis หรือ malnutrition",
        why: "Thiamine ละลายน้ำจึงถูก dialyze ออก ร่วมกับกินได้น้อย",
        keys: ["Triad ครบพบเพียงส่วนน้อย (ราว 1 ใน 6) ไม่ครบไม่ตัดออก"],
        ix: ["วินิจฉัยทาง clinical ให้ empiric IV thiamine ทันทีและให้ก่อนหรือพร้อม glucose ไม่ต้องรอผล level หรือ MRI"]
      })
    ]),
    N("Drug accumulation", "step", {
      s: "ยาหรือ active metabolite ที่ขับทางไต เกิดได้แม้ปรับขนาดแล้ว หรือเมื่อ GFR ลดลงขณะได้ขนาดเดิม",
      keys: ["เพิ่งเริ่มยาหรือเพิ่มขนาดภายในไม่กี่วัน หรือมี AKI ขณะได้ยาเดิม", "Myoclonus"]
    }, [
      N("Gabapentinoid / opioid / baclofen", "nephro", {
        s: "Somnolence, myoclonus",
        why: "Gabapentin และ pregabalin ขับทางไต, morphine metabolite (M6G) สะสม, baclofen toxicity รุนแรงใน CKD",
        ix: ["Drug review", "Gabapentin, pregabalin และ baclofen ถูก dialyze ออกได้ พิจารณา HD เมื่อ toxicity เกิดในผู้ป่วย kidney impairment และรุนแรง (coma ที่ต้องใช้ ventilator) ส่วน opioid ใช้ naloxone และหยุดยา"]
      }),
      N("Acyclovir / valacyclovir neurotoxicity", "nephro", {
        s: "Confusion, hallucination, dysarthria",
        why: "CMMG metabolite สะสมเมื่อ GFR ต่ำ และ acyclovir ทำให้ crystal nephropathy ซึ่งยิ่งทำให้ยาสะสม",
        keys: ["เกิดภายใน 1 ถึง 3 วันหลังเริ่มยา มักไม่มีไข้หรือ focal sign และ CSF ปกติ ใช้แยกจาก HSV หรือ VZV encephalitis", "ดีขึ้นหลังหยุดยาหรือ HD"],
        ix: ["Drug history, CMMG level ถ้ามี"]
      }),
      N("Cefepime / carbapenem / beta-lactam neurotoxicity", "nephro", {
        s: "Non-convulsive status epilepticus, myoclonus",
        ix: ["EEG"]
      }),
      N("Lithium / metformin / salicylate", "nephro", {
        s: "Tremor, ataxia, confusion หรือ lactic acidosis",
        why: "Lithium ทำให้ nephrogenic DI และ CKD, metformin-associated lactic acidosis",
        ix: ["Lithium level, lactate, salicylate level"],
        link: "tremor"
      })
    ]),
    N("Metabolic", "step", {
      s: "Electrolyte หรือ glucose ผิดปกติ",
      keys: ["Na", "Ca", "Glucose", "Ammonia"]
    }, [
      N("Dysnatremia / osmotic demyelination", "nephro", {
        s: "Hyponatremia เฉียบพลัน, hypernatremia รุนแรง หรือ ODS หลังแก้ chronic hyponatremia เร็วเกิน",
        why: "Chronic hyponatremia: จำกัดการเพิ่ม Na ไม่เกิน 10 mmol/L ใน 24 ชั่วโมงแรก และ 8 mmol/L ต่อ 24 ชั่วโมงถัดไป (European 2014) ถ้า high risk ต่อ ODS จำกัดไม่เกิน 8 mmol/L ต่อ 24 ชั่วโมง (US 2013)",
        ix: ["Na, osmolality, MRI pons (MRI ช่วงแรกปกติได้ ทำซ้ำใน 1 ถึง 2 สัปดาห์ถ้ายังสงสัย)"],
        std: "European 2014 hyponatremia guideline, US expert panel 2013",
        link: "hypona"
      }),
      N("Hypercalcemia / hypermagnesemia", "nephro", {
        s: "Lethargy, confusion",
        ix: ["Ca, Mg"],
        link: "hyperca"
      }),
      N("Hypoglycemia", "nephro", {
        s: "Insulin หรือ sulfonylurea ใน CKD",
        ix: ["Glucose"]
      }),
      N("Hepatic encephalopathy", "adj", {
        s: "Asterixis ใน cirrhosis",
        ix: ["Ammonia, LFT"],
        link: "jaundice"
      }),
      N("Hypercapnia / sepsis-associated encephalopathy", "adj", {
        s: "COPD, OSA, sepsis",
        ix: ["ABG, culture"]
      })
    ]),
    N("Vascular / immune / infection", "step", {
      s: "Structural หรือ inflammatory CNS disease",
      keys: ["BP สูง", "Fever", "MAHA"]
    }, [
      N("PRES / hypertensive encephalopathy", "nephro", {
        s: "Headache, visual disturbance, seizure",
        why: "สาเหตุ: hypertension รุนแรง, CNI, LN, HUS, eclampsia, AKI หรือ CKD",
        keys: ["BP ไม่สูงได้ราว 20 ถึง 30% โดยเฉพาะจาก CNI หรือ cytotoxic drug จึงตัดออกด้วย BP ไม่ได้"],
        ix: ["MRI FLAIR, CNI level (ระดับอยู่ในเป้าไม่ตัดออก)"],
        link: "headache"
      }),
      N("TTP / aHUS with CNS", "nephro", {
        s: "Fluctuating neurological signs กับ MAHA",
        ix: ["Smear, ADAMTS13"],
        link: "tma"
      }),
      N("CNS lupus / vasculitis", "nephro", {
        s: "Confusion, psychosis, seizure",
        ix: ["MRI, CSF, aPL, complement"],
        link: "rpgn"
      }),
      N("CNS infection in immunosuppressed", "nephro", {
        s: "Cryptococcus, Listeria, HSV, JC virus (PML), toxoplasma, TB (ไข้และ meningism ไม่ชัดได้ในผู้ได้ immunosuppression)",
        ix: ["LP, cryptococcal antigen, PCR, MRI"],
        std: "AST IDCOP 2019",
        link: "kt-fever"
      }),
      N("Subdural hematoma", "nephro", {
        s: "Fluctuating confusion ใน HD ที่ได้ heparin หรือ anticoagulant",
        ix: ["CT brain"],
        link: "stroke"
      }),
      N("Stroke / non-convulsive status", "adj", {
        s: "Focal deficit หรือ subtle seizure",
        ix: ["MRI, EEG"],
        link: "stroke"
      })
    ])
  ])
};

/* ===================== SEIZURE ===================== */
TREES.seizure = {
  must: [
    "Provoked หรือ unprovoked, focal หรือ generalized, ครั้งแรกหรือเป็นซ้ำ",
    "ระหว่างฟอก, ฟอกครั้งแรก",
    "Na, Ca, Mg, glucose ล่าสุด",
    "CNI level, BP ขณะชัก, ตามัว",
    "ยาที่ลด seizure threshold: cefepime, carbapenem, tramadol, bupropion, theophylline",
    "ยากันชักเดิมและการปรับขนาดตาม dialysis",
    "Fever, immunosuppression",
    "ตั้งครรภ์หรือหลังคลอด"
  ],
  tree: N("Seizure", "root", {
    s: "หา provoked cause ก่อน (metabolic, toxic, PRES, infection) แล้วจึงคิด structural และ epilepsy",
    why: "Seizure ในผู้ป่วยไตส่วนใหญ่เป็น provoked จาก electrolyte, PRES (จาก hypertension หรือ CNI) หรือยาสะสม แต่ first seizure ทุกรายยังต้องทำ brain imaging หา structural lesion",
    keys: ["Electrolyte ณ เวลาชัก", "BP", "Focality", "Fever"],
    ix: ["Glucose, Na, Ca, Mg, PO4, BUN", "CNI level", "CT แล้ว MRI brain", "EEG, LP ตาม clue"],
    std: "ILAE 2017 seizure classification"
  }, [
    N("Metabolic", "step", {
      s: "Electrolyte ผิดปกติรุนแรง",
      keys: ["Na < 120 mmol/L หรือ Na ลดลงเร็ว (acute hyponatremia ชักได้ที่ระดับสูงกว่านี้)", "Ionized Ca ต่ำ", "Glucose"]
    }, [
      N("Acute hyponatremia", "nephro", {
        s: "Na ลดเร็ว",
        why: "Seizure จาก hyponatremia ให้ 3% NaCl 150 mL IV ใน 20 นาที ซ้ำได้อีก 2 ครั้งจน Na เพิ่ม 5 mmol/L (European 2014) ส่วน US 2013 ใช้ 100 mL bolus ซ้ำได้ถึง 3 ครั้ง เป้าเพิ่ม 4 ถึง 6 mmol/L จากนั้นไม่เกิน limit ต่อ 24 ชั่วโมง",
        ix: ["Na, osmolality, urine osmolality"],
        std: "European 2014 hyponatremia guideline",
        link: "hypona"
      }),
      N("Hypocalcemia / hypomagnesemia", "nephro", {
        s: "มักมี tetany หรือ paresthesia นำมาก่อน แต่ชักได้โดยไม่มี tetany",
        ix: ["Ionized Ca, Mg"],
        link: "hypoca"
      }),
      N("Hypoglycemia / hyperosmolar state", "nephro", {
        s: "Glucose ต่ำหรือสูงมาก",
        ix: ["Glucose, osmolality"]
      }),
      N("Uremia / dialysis disequilibrium", "nephro", {
        s: "Seizure ใน uremia หรือหลังฟอกครั้งแรก",
        ix: ["BUN"],
        link: "ams"
      })
    ]),
    N("Hypertensive / vascular", "step", {
      s: "BP สูง ตามัว",
      keys: ["Posterior circulation", "Pregnancy"]
    }, [
      N("PRES / CNI neurotoxicity", "nephro", {
        s: "Seizure, cortical blindness, headache",
        why: "เกิดจาก tacrolimus หรือ cyclosporine ได้แม้ระดับยาอยู่ในเป้าและ BP ไม่สูง, hypomagnesemia เพิ่ม risk, การรักษาคือคุม BP แก้ Mg ลดขนาดหรือเปลี่ยน CNI และถ้าจำเป็นเปลี่ยนเป็น belatacept หรือ mTORi",
        ix: ["MRI FLAIR, CNI trough, Mg"],
        link: "headache"
      }),
      N("Eclampsia", "nephro", {
        s: "Seizure กับ preeclampsia ตั้งแต่ 20 สัปดาห์จนถึง 6 สัปดาห์หลังคลอด (บางรายไม่มี hypertension หรือ proteinuria นำมาก่อน)",
        ix: ["BP, UPCR, platelet, LFT"],
        std: "ISSHP 2021",
        link: "pregnancy"
      }),
      N("TTP / aHUS", "nephro", {
        s: "Seizure กับ MAHA",
        ix: ["Smear, ADAMTS13"],
        link: "tma"
      }),
      N("Stroke / hemorrhage / CVT", "adj", {
        s: "Focal seizure กับ structural lesion",
        ix: ["CT, MRI, MRV"],
        link: "stroke"
      })
    ]),
    N("Toxic", "step", {
      s: "ยาสะสมหรือ withdrawal",
      keys: ["Myoclonus", "เริ่มยาใหม่"]
    }, [
      N("Beta-lactam neurotoxicity", "nephro", {
        s: "Cefepime, imipenem ใน CKD หรือ AKI โดยเฉพาะเมื่อไม่ได้ปรับขนาด (เกิดได้แม้ปรับขนาดแล้ว) และอาจเป็น non-convulsive status",
        ix: ["EEG, drug level"],
        link: "ams"
      }),
      N("Tramadol / theophylline / bupropion / lithium", "nephro", {
        s: "Seizure threshold ต่ำลง",
        ix: ["Drug review, level"]
      }),
      N("Alcohol or benzodiazepine withdrawal", "adj", {
        s: "Alcohol: seizure 6 ถึง 48 ชั่วโมงหลังดื่มครั้งสุดท้าย ส่วน benzodiazepine: 1 ถึง 10 วันหลังหยุด ขึ้นกับ half-life ของยา",
        ix: ["History"]
      })
    ]),
    N("Inflammatory / infection", "step", {
      s: "Seizure กับไข้หรือ systemic disease",
      keys: ["Immunosuppression", "Active SLE"]
    }, [
      N("CNS lupus / APS", "nephro", {
        s: "Seizure ใน active SLE",
        ix: ["MRI, aPL, EEG"],
        std: "ACR 1999 NPSLE",
        link: "rpgn"
      }),
      N("Opportunistic CNS infection in KT", "nephro", {
        s: "Toxoplasma, nocardia, PML, HSV, cryptococcus",
        ix: ["MRI, LP, PCR"],
        link: "kt-fever"
      }),
      N("Meningitis / encephalitis", "adj", {
        s: "Fever, neck stiffness",
        ix: ["LP"]
      })
    ]),
    N("Epilepsy and anticonvulsant in CKD", "step", {
      s: "Known epilepsy ที่ระดับยาเปลี่ยนเพราะไตหรือ dialysis",
      keys: ["Dialyzable drug", "Protein binding เปลี่ยน", "ยากันชักที่ทำให้ชักซ้ำเอง: carbamazepine, oxcarbazepine ทำให้ hyponatremia", "ผลข้างเคียงทางไตที่ต้องติดตาม: topiramate, zonisamide (NAGMA, calcium phosphate stone), valproate (Fanconi)"]
    }, [
      N("Subtherapeutic anticonvulsant after dialysis", "nephro", {
        s: "Levetiracetam, gabapentin ถูก dialyze ออก",
        why: "ต้องให้ supplemental dose หลังฟอก ส่วน phenytoin ไม่ถูก dialyze แต่ใน uremia free fraction สูงขึ้นเพราะ albumin binding ลด ทำให้ total level ต่ำลวง จึงห้ามเพิ่มขนาดตาม total level ให้ใช้ free level",
        ix: ["Free phenytoin level, timing ของ dose เทียบกับเวลาฟอก"]
      })
    ])
  ])
};

/* ===================== THIRST / POLYDIPSIA ===================== */
TREES.thirst = {
  must: [
    "กระหายน้ำมากกว่าปกติ หรือปากแห้ง (sicca)",
    "Polyuria ปริมาณ > 3 L/วัน หรือแค่ nocturia",
    "Onset ทันที (ชี้ไปทาง central DI) หรือค่อยเป็นค่อยไป",
    "ชอบดื่มน้ำเย็น, ตื่นมาดื่มกลางคืน",
    "ยา: lithium, demeclocycline, amphotericin, diuretic, anticholinergic, SGLT2i",
    "Psychiatric history, antipsychotic",
    "Head trauma, pituitary surgery, IgG4, sarcoid, histiocytosis",
    "Glucose, Ca, K"
  ],
  tree: N("Thirst / polydipsia", "root", {
    s: "ยืนยัน polyuria ก่อน แล้วแยก osmotic กับ water diuresis โดยใช้ urine osmolality",
    why: "Thirst เป็นทางเข้าของ DM, DI (central vs nephrogenic), hypercalcemia, hypokalemia และ lithium nephropathy",
    keys: ["Polyuria > 3 L/วัน", "Urine osmolality < 300 mOsm/kg: water diuresis", "Urine osmolality > 300 mOsm/kg ร่วมกับ osmolar excretion > 1,000 mOsm/วัน: osmotic diuresis", "Serum Na ค่อนไปทางสูงชี้ไปทาง DI, ค่อนไปทางต่ำชี้ไปทาง primary polydipsia แต่ซ้อนทับกันมาก ใช้ Na อย่างเดียวแยกไม่ได้ ต้องยืนยันด้วย copeptin หรือ water deprivation test"],
    ix: ["Serum Na, osmolality, glucose, Ca, K", "24-hour urine volume, osmolality", "Water deprivation test หรือ hypertonic saline-stimulated copeptin", "MRI pituitary"],
    std: "Fenske NEJM 2018 (hypertonic saline copeptin), Refardt NEJM 2023 (hypertonic saline ดีกว่า arginine)"
  }, [
    N("Osmotic diuresis", "step", {
      s: "Polyuria จริงร่วมกับ urine osmolality > 300 mOsm/kg และ osmolar excretion > 1,000 mOsm/วัน",
      keys: ["Glucose", "Urea", "Mannitol"]
    }, [
      N("Hyperglycemia", "nephro", {
        s: "Polyuria, polydipsia ใน DM",
        ix: ["Glucose, HbA1c, urine glucose"],
        link: "polyuria"
      }),
      N("SGLT2 inhibitor / urea diuresis", "nephro", {
        s: "Glycosuria จาก SGLT2 inhibitor หรือ urea diuresis ในช่วง post-obstructive diuresis, recovery phase ของ ATN, high protein feeding หรือ catabolic state",
        ix: ["Urine glucose, urea"],
        link: "polyuria"
      })
    ]),
    N("Water diuresis: DI", "step", {
      s: "Urine osmolality < 300 mOsm/kg โดย serum Na ค่อนไปทางสูง",
      keys: ["Baseline copeptin > 21.4 pmol/L (ไม่ต้องอดน้ำ) วินิจฉัย nephrogenic DI, ถ้า < 21.4 ต้องทำ stimulated copeptin เพื่อแยก central DI จาก primary polydipsia"]
    }, [
      N("Central DI", "nephro", {
        s: "Sudden onset ชอบน้ำเย็น",
        why: "IgG4 hypophysitis, sarcoid, histiocytosis, metastasis และหลังผ่าตัด",
        keys: ["Hypotonic polyuria กับ serum Na ปกติสูง", "ตอบสนองต่อ desmopressin"],
        ix: ["Hypertonic saline-stimulated copeptin ≤ 4.9 pmol/L (arginine-stimulated ใช้ cut-off 3.8 pmol/L ที่ 60 นาที)", "MRI: absent posterior pituitary bright spot (ไม่ sensitive และไม่ specific, หายได้ในผู้สูงอายุปกติ, nephrogenic DI และ primary polydipsia บางราย) และดู stalk thickening หรือ mass"],
        std: "Fenske NEJM 2018, Refardt NEJM 2023",
        link: "hyperna"
      }),
      N("Nephrogenic DI: lithium", "nephro", {
        s: "Polyuria ใน lithium ระยะยาว",
        why: "Lithium เข้า principal cell ทาง ENaC ลด aquaporin-2, amiloride ช่วยได้, และ chronic lithium nephropathy (microcyst)",
        keys: ["Baseline copeptin > 21.4 pmol/L (ไม่ต้องอดน้ำ) วินิจฉัย nephrogenic DI", "Complete NDI ไม่ตอบสนองต่อ desmopressin, partial NDI ตอบสนองได้บางส่วน"],
        ix: ["Lithium level, copeptin, MRI kidney: microcysts"],
        link: "polyuria"
      }),
      N("Nephrogenic DI: hypercalcemia / hypokalemia", "nephro", {
        s: "Acquired NDI จาก electrolyte",
        ix: ["Ca, K"],
        link: "hyperca"
      }),
      N("Nephrogenic DI: tubulointerstitial disease", "nephro", {
        s: "Sickle cell, obstruction, amyloid, Sjogren, ADPKD",
        ix: ["Urine osmolality, imaging"],
        link: "pyuria"
      }),
      N("Congenital NDI (AVPR2, AQP2)", "nephro", {
        s: "Polyuria ตั้งแต่เกิด",
        ix: ["Genetic testing"],
        link: "shortstature"
      }),
      N("Gestational DI", "nephro", {
        s: "Placental vasopressinase ไตรมาสที่ 3",
        ix: ["ตอบสนองต่อ desmopressin"],
        link: "pregnancy"
      })
    ]),
    N("Water diuresis: primary polydipsia", "step", {
      s: "Urine osmolality ต่ำ serum Na ต่ำปกติ",
      keys: ["Psychiatric", "Habit"]
    }, [
      N("Primary polydipsia", "nephro", {
        s: "Psychogenic หรือ dipsogenic",
        why: "Hyponatremia เมื่อ intake เกิน excretion capacity หรือ solute intake ต่ำ (beer potomania)",
        keys: ["Copeptin > 4.9 pmol/L หลัง hypertonic saline", "Antipsychotic ทำให้ปากแห้ง"],
        ix: ["Hypertonic saline copeptin test"],
        link: "hypona"
      }),
      N("Dipsogenic: hypothalamic lesion, drug", "adj", {
        s: "Sarcoid หรือ lesion ที่ thirst center",
        ix: ["MRI"]
      })
    ]),
    N("Thirst from hypovolemia / hypernatremia", "step", {
      s: "Thirst เป็น physiologic response",
      keys: ["Volume depletion", "Na สูง"]
    }, [
      N("Volume depletion / salt wasting", "nephro", {
        s: "Thirst กับ orthostatic hypotension",
        ix: ["Urine Na"],
        link: "syncope"
      }),
      N("Hypernatremia", "nephro", {
        s: "Hypertonicity กระตุ้น thirst, hypernatremia คงอยู่ได้เมื่อผู้ป่วยเข้าถึงน้ำไม่ได้",
        ix: ["Na, urine osmolality"],
        link: "hyperna"
      }),
      N("Hyperangiotensinemia: CHF, renovascular", "adj", {
        s: "Angiotensin II กระตุ้น thirst",
        ix: ["Renin"]
      })
    ]),
    N("Dry mouth without true polyuria", "step", {
      s: "ปากแห้งที่ผู้ป่วยเล่าเป็นกระหายน้ำ โดย urine volume และ serum Na ปกติ",
      keys: ["Urine volume < 3 L/วัน", "Serum Na และ osmolality ปกติ"]
    }, [
      N("Sicca: Sjogren / anticholinergic", "nephro", {
        s: "Dry mouth ที่ไม่ใช่ thirst จริง",
        why: "Sjogren ทำให้เกิด dRTA, TIN และ nephrogenic DI ได้ (กรณีนั้นมี polyuria จริง), anticholinergic ทำให้ปากแห้งอย่างเดียว",
        ix: ["Schirmer, anti-Ro"],
        link: "sicca"
      })
    ])
  ])
};

/* ===================== HEARING LOSS ===================== */
TREES.hearing = {
  must: [
    "Sensorineural หรือ conductive, ข้างเดียวหรือสองข้าง, onset",
    "Family history ของ hearing loss กับ hematuria หรือ ESKD (Alport)",
    "Maternal inheritance ของ DM กับ deafness (MIDD)",
    "ยา: aminoglycoside, vancomycin, loop diuretic IV ขนาดสูง, cisplatin, deferoxamine",
    "Otitis media เรื้อรัง, sinusitis, nasal crust (GPA)",
    "Acroparesthesia, hypohidrosis (Fabry)",
    "Lenticonus, retinal flecks (Alport)",
    "Vertigo, tinnitus, ear pain"
  ],
  tree: N("Hearing loss", "root", {
    s: "แยก conductive กับ sensorineural ด้วย Rinne และ Weber แล้วจับคู่กับ kidney phenotype",
    why: "Deafness กับ kidney disease ชี้ไปที่ Alport, MIDD, GPA, Fabry, dRTA with deafness และ ototoxicity",
    keys: ["Rinne, Weber", "High-frequency SNHL", "Hematuria และ family history", "Ocular findings"],
    ix: ["Pure tone audiometry", "UA microscopy, UPCR, Cr", "ANCA ถ้ามี otitis หรือ sinus", "Genetic testing ตาม phenotype"],
    std: "Audiometric classification"
  }, [
    N("Hereditary SNHL with kidney disease", "step", {
      s: "Bilateral SNHL กับ family history",
      keys: ["Hematuria", "Diabetes", "Tubulopathy"]
    }, [
      N("Alport syndrome", "nephro", {
        s: "Persistent hematuria, proteinuria, bilateral high-frequency SNHL, anterior lenticonus, dot-and-fleck retinopathy",
        why: "X-linked (COL4A5) ชายที่ไม่ได้รักษาราว 90% เข้า ESKD ก่อนอายุ 40 (เร็วช้าตาม genotype), autosomal recessive รุนแรงทั้งสองเพศ, autosomal dominant (heterozygous COL4A3 หรือ COL4A4) ส่วนใหญ่มีแค่ hematuria กับ thin basement membrane แต่บางรายมี proteinuria, FSGS และเข้า ESKD เมื่ออายุมาก",
        keys: ["ชาย X-linked: hearing loss เริ่มในวัยเด็กตอนปลายถึงวัยรุ่น, การได้ยินปกติไม่ exclude Alport (หญิง, autosomal dominant, อายุน้อย)", "หญิง heterozygous X-linked มี ESKD ราว 12% ที่อายุ 40 และ 30% ที่อายุ 60", "Anti-GBM disease หลัง KT พบราว 3 ถึง 5% ของผู้ป่วย Alport ส่วนใหญ่เป็นชายที่มี large deletion หรือ truncating variant"],
        ix: ["Genetic testing COL4A3, COL4A4, COL4A5", "Biopsy EM: GBM thickening, lamellation, basket-weave", "Collagen IV alpha 5 staining"],
        std: "Alport syndrome classification 2018, EARLY PRO-TECT Alport 2020 (ramipril เริ่มเร็วปลอดภัย แนวโน้มชะลอ progression แต่ไม่ถึง statistical significance)",
        link: "hematuria"
      }),
      N("Maternally inherited diabetes and deafness (MIDD)", "nephro", {
        s: "DM อายุน้อย, SNHL, FSGS หรือ tubulointerstitial disease, maternal inheritance",
        why: "Mitochondrial m.3243A>G, ควรหลีกเลี่ยง metformin เพราะเสี่ยง lactic acidosis",
        keys: ["Macular pattern dystrophy", "Short stature, cardiomyopathy", "Proteinuria โดยไม่มี diabetic retinopathy (มักถูกวินิจฉัยผิดเป็น DKD)"],
        ix: ["m.3243A>G ใน urine sediment หรือ buccal cells (ไวกว่า blood)", "Lactate"],
        link: "proteinuria"
      }),
      N("Fabry disease", "nephro", {
        s: "SNHL, tinnitus, acroparesthesia, angiokeratoma, proteinuria",
        ix: ["Alpha-galactosidase A activity (หญิง heterozygous ค่าปกติได้ ต้องตรวจ GLA sequencing), lyso-Gb3"],
        link: "numbness"
      }),
      N("Distal RTA with deafness (ATP6V1B1, ATP6V0A4)", "nephro", {
        s: "dRTA ในเด็ก, nephrocalcinosis, SNHL (ATP6V1B1 เริ่มเร็วตั้งแต่เด็กเล็ก, ATP6V0A4 เริ่มช้าหรือไม่มี)",
        ix: ["Urine pH, UAG, genetic testing"],
        link: "nagma"
      }),
      N("Branchio-oto-renal syndrome / CHARGE / Bartter type IV", "nephro", {
        s: "CAKUT กับ ear anomaly, Bartter type IV (BSND) มี SNHL",
        why: "Ear pit, branchial cleft cyst กับ renal hypoplasia",
        ix: ["Kidney US, genetic testing EYA1, SIX1, BSND"],
        link: "shortstature"
      })
    ]),
    N("Inflammatory / vasculitis", "step", {
      s: "SNHL หรือ conductive ร่วมกับ systemic inflammation",
      keys: ["Otitis media", "Sinusitis", "Eye involvement"]
    }, [
      N("Granulomatosis with polyangiitis", "nephro", {
        s: "Serous otitis media, conductive หรือ SNHL, sinusitis",
        why: "Ear involvement อาจนำมาก่อน RPGN เป็นเดือน, ANCA negative ได้ใน GPA ที่จำกัดอยู่ที่ ENT",
        ix: ["PR3-ANCA, MPO-ANCA, UA"],
        std: "ACR/EULAR 2022 GPA classification criteria (ใช้ classify หลังวินิจฉัย vasculitis แล้ว ไม่ใช่ diagnostic criteria)",
        link: "ent"
      }),
      N("Cogan syndrome", "adj", {
        s: "Interstitial keratitis กับ audiovestibular dysfunction",
        why: "พบ aortitis และ GN ได้ในบางราย",
        ix: ["Ophthalmology, audiometry"]
      }),
      N("Relapsing polychondritis / SLE / sarcoid", "adj", {
        s: "Auricular chondritis, autoimmune inner ear disease",
        ix: ["ANA, ANCA, Ca"],
        link: "ent"
      })
    ]),
    N("Ototoxicity", "step", {
      s: "SNHL หลังได้ยา",
      keys: ["Cumulative dose", "Renal impairment ทำให้ยาสะสม"]
    }, [
      N("Aminoglycoside / vancomycin", "nephro", {
        s: "High-frequency SNHL, vestibular toxicity",
        why: "Aminoglycoside ทำให้ทั้ง ATN และ ototoxicity (cochlear และ vestibular มักถาวร) เสี่ยงขึ้นตาม cumulative dose, ระยะเวลาให้ยา และ trough สูง แต่เกิดได้แม้ level อยู่ในเป้าหมาย, mitochondrial m.1555A>G ทำให้หูหนวกได้แม้ได้ยาครั้งเดียว, vancomycin อย่างเดียวพบน้อยและหลักฐานไม่ชัด",
        ix: ["Drug level, audiometry"]
      }),
      N("Loop diuretic (IV bolus ขนาดสูง)", "nephro", {
        s: "Transient หรือ permanent SNHL",
        why: "เกิดเมื่อให้ furosemide IV เร็ว ขนาดสูงใน CKD หรือร่วมกับ aminoglycoside",
        ix: ["Furosemide IV ให้ช้าไม่เกิน 4 mg/min"]
      }),
      N("Cisplatin", "nephro", {
        s: "SNHL ร่วมกับ AKI, hypomagnesemia, salt wasting",
        ix: ["Mg, Cr, audiometry"],
        link: "onco"
      }),
      N("Deferoxamine / salicylate", "adj", {
        s: "Ototoxicity จาก chelator หรือ high-dose aspirin",
        ix: ["Drug review"]
      })
    ]),
    N("Other", "step", {
      s: "Hearing loss ในผู้ป่วยไตจากสาเหตุอื่น รวมถึง presbycusis, noise-induced และ chronic otitis media ซึ่งยังพบบ่อยที่สุดเหมือนประชากรทั่วไป",
      keys: ["Uremia", "Infection"]
    }, [
      N("Uremic / dialysis-related SNHL", "nephro", {
        s: "SNHL ใน CKD ระยะท้าย",
        ix: ["Audiometry"]
      }),
      N("Syphilis / CMV / meningitis sequelae", "adj", {
        s: "Infectious SNHL",
        why: "Syphilis ทำให้เกิด secondary MN ได้",
        ix: ["VDRL, TPHA"],
        link: "viral"
      })
    ])
  ])
};

/* ===================== RED EYE / UVEITIS ===================== */
TREES.eye = {
  must: [
    "ปวดตา, สู้แสงไม่ได้, ตามัว (uveitis หรือ scleritis) หรือแค่ระคายเคือง",
    "ข้างเดียวหรือสองข้าง, เป็นซ้ำหรือไม่",
    "ปัสสาวะผิดปกติ, glycosuria, Cr ขึ้นช่วงเดียวกัน (TINU)",
    "ไซนัส, หู, ไอเป็นเลือด (GPA)",
    "แผลในปากและอวัยวะเพศ (Behcet), back pain (SpA)",
    "Dry cough, hilar node, erythema nodosum (sarcoid)",
    "KT: CMV status, ตามัวหรือ floaters",
    "ยา: bisphosphonate, rifabutin, cidofovir, ICI"
  ],
  tree: N("Red eye / uveitis", "root", {
    s: "แยก conjunctivitis, scleritis และ uveitis (anterior, intermediate, posterior) แล้วจับคู่กับ kidney syndrome",
    why: "Ocular inflammation กับ kidney disease ชี้ไปที่ TINU, sarcoidosis, ANCA vasculitis, Behcet และ CMV retinitis ใน KT",
    keys: ["Ciliary flush กับ photophobia: uveitis", "Deep boring pain, violaceous: scleritis", "Sterile pyuria, glycosuria, LMW proteinuria: TINU"],
    ix: ["Slit lamp และ dilated fundus examination", "UA, urine beta-2 microglobulin, Cr", "ANCA, ACE, Ca, CXR, HLA-B27, VDRL, IGRA"],
    std: "SUN Working Group 2005 uveitis nomenclature"
  }, [
    N("Uveitis with tubulointerstitial disease", "step", {
      s: "Uveitis กับ AIN pattern",
      keys: ["Sterile pyuria", "Proximal tubular dysfunction"]
    }, [
      N("TINU syndrome", "nephro", {
        s: "Bilateral anterior uveitis กับ AIN มักในวัยรุ่นและหญิงอายุน้อย",
        why: "Uveitis เกิดได้ตั้งแต่ 2 เดือนก่อนจนถึง 12 เดือนหลัง AIN (ส่วนใหญ่ตามหลัง) จึงไม่มี uveitis ตอนวินิจฉัย AIN ไม่ exclude TINU และ uveitis มัก relapse",
        keys: ["Fever, weight loss, ESR สูง", "Urine beta-2 microglobulin สูงมาก", "Modified KL-6 อาจสูง"],
        ix: ["Kidney biopsy: AIN", "Slit lamp ทุกรายที่มี unexplained AIN"],
        std: "Mandeville 2001 TINU criteria",
        link: "pyuria"
      }),
      N("Sarcoidosis", "nephro", {
        s: "Granulomatous uveitis, mutton-fat keratic precipitates",
        why: "Granulomatous TIN และ hypercalcemia",
        ix: ["Ca, 1,25D, ACE, CT chest, biopsy"],
        std: "ATS 2020, IWOS 2019 ocular sarcoidosis criteria",
        link: "hyperca"
      }),
      N("Sjogren / IgG4-RD", "nephro", {
        s: "Red eye ที่ไม่ใช่ uveitis: keratoconjunctivitis sicca (Sjogren) หรือ dacryoadenitis, orbital inflammation (IgG4-RD) ร่วมกับ TIN",
        ix: ["Anti-Ro, IgG4"],
        link: "sicca"
      }),
      N("Drug-induced: bisphosphonate, rifabutin, ICI", "nephro", {
        s: "Bisphosphonate (uveitis, scleritis กับ ATN หรือ collapsing FSGS), rifabutin (uveitis), cidofovir (uveitis กับ proximal tubulopathy), ICI (uveitis กับ AIN)",
        why: "ICI ทำให้เกิดได้ทั้ง AIN และ uveitis ในผู้ป่วยรายเดียวกัน ไม่จำเป็นต้องเกิดพร้อมกัน",
        ix: ["Drug review"],
        link: "onco"
      })
    ]),
    N("Scleritis / vasculitis", "step", {
      s: "Scleritis หรือ peripheral ulcerative keratitis",
      keys: ["Scleritis และ PUK ต้อง work up systemic autoimmune disease ทุกราย (พบราว 1 ใน 3 ถึงครึ่งหนึ่ง โดย RA บ่อยที่สุด รองลงมาคือ GPA) และต้องแยก infection"]
    }, [
      N("ANCA vasculitis", "nephro", {
        s: "Scleritis, orbital mass, PUK",
        ix: ["PR3, MPO-ANCA, UA, Cr"],
        link: "ent"
      }),
      N("RA / SLE / relapsing polychondritis", "nephro", {
        s: "Scleritis ใน CTD",
        ix: ["RF, ANA, C3, C4"],
        link: "arthralgia"
      }),
      N("IgA vasculitis / PAN", "adj", {
        s: "Episcleritis พบได้",
        ix: ["Skin biopsy"]
      })
    ]),
    N("Uveitis with systemic inflammatory disease", "step", {
      s: "Recurrent uveitis กับ multisystem features",
      keys: ["Oral ulcer", "Back pain", "IBD"]
    }, [
      N("Behcet disease", "nephro", {
        s: "Posterior uveitis หรือ panuveitis, oral และ genital ulcer",
        why: "Kidney involvement พบไม่บ่อย ได้แก่ AA amyloid, GN (IgAN, crescentic) และ renal artery aneurysm",
        ix: ["Pathergy, HLA-B51"],
        std: "ICBD 2014",
        link: "arthralgia"
      }),
      N("Spondyloarthritis / IBD", "nephro", {
        s: "Acute anterior uveitis ข้างเดียว เป็นซ้ำ, HLA-B27",
        why: "Kidney involvement: IgAN, AA amyloid, interstitial nephritis จาก 5-ASA และ NSAID nephrotoxicity",
        ix: ["HLA-B27, MRI SI joint, colonoscopy"],
        link: "diarrhea"
      }),
      N("Vogt-Koyanagi-Harada", "adj", {
        s: "Bilateral panuveitis, hearing loss, vitiligo, meningism",
        why: "พบบ่อยในคนเอเชีย ไม่มี kidney involvement โดยตรง เป็น DDx ของ bilateral uveitis (TINU) และของ uveitis ร่วมกับ hearing loss (Cogan syndrome)",
        ix: ["OCT, LP"]
      })
    ]),
    N("Infection", "step", {
      s: "Uveitis หรือ retinitis จากเชื้อ",
      keys: ["Immunosuppressed", "Retinitis"]
    }, [
      N("CMV retinitis in KT", "nephro", {
        s: "Floaters, ตามัว, hemorrhagic retinitis",
        why: "พบไม่บ่อย มักเป็น late-onset CMV disease หลังหยุด prophylaxis เสี่ยงสูงสุดใน D+/R- แต่เกิดใน R+ ที่ได้ immunosuppression หนักได้",
        ix: ["Dilated fundoscopy เป็นตัววินิจฉัย", "CMV QNAT ใน blood (negative ไม่ exclude retinitis)"],
        std: "AST IDCOP 2019",
        link: "kt-fever"
      }),
      N("Tuberculosis / syphilis", "nephro", {
        s: "Granulomatous uveitis, choroiditis",
        why: "Syphilis ทำให้เกิด secondary MN ได้ และ TB ทำให้เกิด granulomatous TIN ได้",
        ix: ["IGRA, VDRL, TPHA, CXR"],
        link: "viral"
      }),
      N("Endophthalmitis / fungal", "adj", {
        s: "Endogenous endophthalmitis จาก candidemia เช่น จาก HD catheter",
        ix: ["Dilated fundoscopy ในทุก candidemia ตาม IDSA 2016 (AAO 2022 ไม่แนะนำ routine screening ในรายที่ไม่มีอาการทางตา)"],
        link: "hd-fever"
      }),
      N("Toxoplasma / HSV / VZV", "adj", {
        s: "Retinochoroiditis หรือ acute retinal necrosis",
        ix: ["Aqueous tap PCR"]
      })
    ]),
    N("Non-inflammatory red eye", "step", {
      s: "ไม่ปวดลึก ไม่มี photophobia การมองเห็นปกติ",
      keys: ["Discharge", "Itch", "Hemorrhage"]
    }, [
      N("Subconjunctival hemorrhage", "nephro", {
        s: "Bleeding ใน uremia, anticoagulant, HTN",
        ix: ["BP, coagulation"],
        link: "bleeding"
      }),
      N("Conjunctival calcification (red eye of renal failure)", "nephro", {
        s: "Calcium-phosphate deposition ใน CKD-MBD",
        why: "Ca x PO4 product สูง",
        ix: ["Ca, PO4, PTH"],
        link: "hd-mbd"
      }),
      N("Infectious or allergic conjunctivitis", "adj", {
        s: "Discharge หรือ itch",
        ix: ["Clinical"]
      })
    ])
  ])
};

/* ===================== SICCA / PAROTID ===================== */
TREES.sicca = {
  must: [
    "ตาแห้ง, ปากแห้ง, กลืนอาหารแห้งลำบาก, ฟันผุเร็ว",
    "Parotid บวมข้างเดียวหรือสองข้าง, เป็นๆ หายๆ หรือโตเรื้อรัง",
    "Arthralgia, Raynaud, purpura, neuropathy",
    "Hypokalemic paralysis, stone, nephrocalcinosis (dRTA)",
    "Pancreatitis, retroperitoneal fibrosis, jaundice (IgG4-RD)",
    "HCV, HIV risk",
    "ยา anticholinergic, antidepressant, antihistamine, diuretic",
    "Lymphadenopathy, B symptoms (lymphoma ใน Sjogren)"
  ],
  tree: N("Sicca symptoms / parotid enlargement", "root", {
    s: "ยืนยัน objective sicca แล้วแยก Sjogren, IgG4-RD, sarcoid, infection และ drug",
    why: "Sjogren ทำให้ TIN, dRTA, hypokalemic paralysis, nephrogenic DI และ cryoglobulinemic GN ส่วน IgG4-RD ทำให้ TIN และ retroperitoneal fibrosis",
    keys: ["Schirmer ≤ 5 mm ใน 5 นาที", "Unstimulated salivary flow ≤ 0.1 mL/min", "Bilateral parotid enlargement", "NAGMA กับ urine pH สูง"],
    ix: ["Anti-Ro (SSA), anti-La (SSB), RF, ANA, C3, C4", "Serum IgG4, IgG subclasses", "VBG, K, urine pH, UA", "Cryoglobulin", "Salivary gland US หรือ minor salivary gland biopsy"],
    std: "ACR/EULAR 2016 Sjogren classification"
  }, [
    N("Sjogren syndrome", "step", {
      s: "ACR/EULAR 2016 ต้องได้ ≥ 4 คะแนน: anti-Ro บวก (3 คะแนน) หรือ focal lymphocytic sialadenitis focus score ≥ 1 foci/4 mm² (3 คะแนน) ร่วมกับ objective sicca test อย่างน้อย 1 ข้อ, anti-Ro ลบไม่ exclude Sjogren",
      keys: ["Kidney: TIN มากกว่า GN", "Cryo และ low C4 บ่งชี้ lymphoma risk"]
    }, [
      N("Tubulointerstitial nephritis", "nephro", {
        s: "Kidney manifestation ที่พบบ่อยที่สุดของ Sjogren",
        keys: ["Bland sediment หรือ sterile pyuria", "LMW proteinuria"],
        ix: ["Kidney biopsy: lymphoplasmacytic TIN"],
        link: "pyuria"
      }),
      N("Distal RTA / hypokalemic paralysis", "nephro", {
        s: "Hypokalemic periodic paralysis, nephrocalcinosis, osteomalacia",
        why: "ขาด H+-ATPase ที่ alpha-intercalated cell จาก immune-mediated injury (พบ autoantibody ต่อ carbonic anhydrase II ในบางราย)",
        keys: ["Urine pH > 5.5 ขณะ acidemia", "Positive UAG", "Hypocitraturia"],
        ix: ["VBG, urine pH, UAG, urine citrate"],
        link: "nagma"
      }),
      N("Nephrogenic DI / Fanconi / Gitelman-like", "nephro", {
        s: "Tubular defect อื่นใน Sjogren",
        ix: ["Urine osmolality, glucose, Mg, Ca"],
        link: "thirst"
      }),
      N("Cryoglobulinemic MPGN / MN", "nephro", {
        s: "GN ใน Sjogren พบน้อยกว่า TIN และมักสัมพันธ์กับ cryoglobulinemia",
        ix: ["Cryoglobulin, C4, RF, kidney biopsy"],
        link: "arthralgia"
      }),
      N("MALT lymphoma", "adj", {
        s: "Persistent parotid enlargement, purpura, low C4",
        ix: ["Parotid biopsy, PET/CT"],
        link: "lymphnode"
      })
    ]),
    N("IgG4-related disease", "step", {
      s: "Bilateral parotid หรือ submandibular gland enlargement (Mikulicz) โดย sicca น้อยกว่า Sjogren เมื่อเทียบกับขนาด gland",
      keys: ["Anti-Ro ลบ", "Multi-organ: pancreas, bile duct, retroperitoneum, kidney"]
    }, [
      N("IgG4-related TIN / MN / RPF", "nephro", {
        s: "AKI หรือ renal mass หรือ hydronephrosis",
        keys: ["Low C3/C4", "Multiple hypodense cortical lesions บน CT", "Eosinophilia, IgE สูง"],
        ix: ["Serum IgG4 (ปกติได้แม้ biopsy-proven และสูงได้ในโรคอื่น ใช้ยืนยันหรือ exclude เดี่ยวๆ ไม่ได้)", "Kidney biopsy: storiform fibrosis, IgG4+ plasma cells > 10/hpf, IgG4/IgG > 40%", "CT abdomen"],
        std: "2019 ACR/EULAR IgG4-RD classification, Raissian 2011 IgG4-TIN criteria",
        link: "backpain"
      })
    ]),
    N("Granulomatous / infiltrative", "step", {
      s: "Parotid หรือ lacrimal enlargement กับ granuloma",
      keys: ["Hilar node", "Uveitis", "Facial palsy"]
    }, [
      N("Sarcoidosis (Heerfordt)", "nephro", {
        s: "Parotitis, uveitis, facial nerve palsy, fever",
        ix: ["Ca, 1,25D, CT chest"],
        link: "hyperca"
      }),
      N("Amyloidosis / lymphoma", "nephro", {
        s: "Gland infiltration",
        ix: ["Biopsy Congo red, sFLC"],
        link: "mspike"
      })
    ]),
    N("Infection", "step", {
      s: "Viral infection ที่ทำให้ sicca หรือ parotid โต",
      keys: ["HCV", "HIV"]
    }, [
      N("HCV", "nephro", {
        s: "Sicca กับ cryoglobulinemia",
        why: "Active HCV infection (HCV RNA บวก) เป็น exclusion criterion ของ ACR/EULAR 2016 Sjogren classification",
        ix: ["Anti-HCV, HCV RNA, cryoglobulin"],
        link: "viral"
      }),
      N("HIV (diffuse infiltrative lymphocytosis syndrome)", "nephro", {
        s: "Bilateral parotid enlargement, CD8 lymphocytosis",
        why: "DILS ทำให้เกิด lymphocytic TIN ได้ ส่วน HIVAN เป็น DDx ของ kidney disease ในผู้ป่วยกลุ่มนี้",
        ix: ["HIV, CD4, CD8"],
        link: "viral"
      }),
      N("Mumps / bacterial parotitis", "adj", {
        s: "Acute parotitis",
        why: "Mumps ทำให้ IRGN และ AKI ได้ในบางราย, bacterial parotitis ใน dehydrated elderly",
        ix: ["Amylase, mumps IgM"]
      })
    ]),
    N("Drug / dehydration / others", "step", {
      s: "Sicca ที่ไม่มี autoimmune",
      keys: ["Anticholinergic", "Uremia"]
    }, [
      N("Anticholinergic / antidepressant / diuretic", "adj", {
        s: "Drug-induced dryness",
        ix: ["Drug review"]
      }),
      N("Uremic xerostomia / fluid restriction in dialysis", "nephro", {
        s: "Dry mouth ใน HD ที่จำกัดน้ำ",
        why: "ทำให้ IDWG สูงเพราะกระหายน้ำ",
        ix: ["IDWG, Na intake"],
        link: "hd-idh"
      }),
      N("Diabetes / hypercalcemia", "nephro", {
        s: "Dry mouth จาก polyuria",
        ix: ["Glucose, Ca"],
        link: "thirst"
      }),
      N("Sialadenosis (alcohol, bulimia, DM)", "adj", {
        s: "Bilateral painless parotid hypertrophy",
        why: "Bulimia ทำให้ hypokalemic alkalosis",
        ix: ["Urine Cl ต่ำ (< 20 mEq/L) ใน vomiting"],
        link: "metalk"
      })
    ])
  ])
};

/* ===================== SINUSITIS / EPISTAXIS / ORAL ULCERS ===================== */
TREES.ent = {
  must: [
    "Chronic sinusitis ไม่ตอบสนองต่อยา, nasal crusting, เลือดกำเดา",
    "จมูกยุบ (saddle nose), หูอื้อ, otitis media, เสียงแหบ, stridor",
    "Oral ulcer: painless (SLE) หรือ painful (Behcet), genital ulcer",
    "หอบหืดอายุมาก, nasal polyp, eosinophilia (EGPA)",
    "Hemoptysis, hematuria, edema",
    "Cocaine (levamisole), PTU, hydralazine, minocycline",
    "DM, KT, neutropenia (invasive fungal)",
    "ใบหูอักเสบ, กระดูกอ่อนจมูก (relapsing polychondritis)"
  ],
  tree: N("Sinusitis, epistaxis, oral ulcers", "root", {
    s: "แยก destructive upper airway disease (granulomatous) ออกจาก sinusitis ธรรมดา แล้วหา kidney involvement ทุกราย",
    why: "Upper airway disease กับ kidney เป็น classic presentation ของ GPA และเป็นทางเข้าของ EGPA, SLE, Behcet และ drug-induced vasculitis",
    keys: ["Nasal crusting, septal perforation, saddle nose", "Subglottic stenosis", "Painless vs painful oral ulcer", "Active urine sediment"],
    ix: ["PR3-ANCA, MPO-ANCA (antigen-specific)", "UA microscopy, UPCR, Cr", "CT sinus, CT chest", "Nasal biopsy (มักไม่ diagnostic แต่ช่วยตัด lymphoma และ fungal)", "ANA, C3, C4, eosinophil count"],
    std: "ACR/EULAR 2022 GPA and EGPA classification criteria (ใช้ classify หลังวินิจฉัย vasculitis แล้ว ไม่ใช่ diagnostic criteria)"
  }, [
    N("Granulomatous / vasculitic", "step", {
      s: "Destructive sinonasal disease",
      keys: ["ANCA", "Eosinophilia", "Bone erosion"]
    }, [
      N("Granulomatosis with polyangiitis", "nephro", {
        s: "Bloody nasal discharge, crusting, saddle nose, otitis, subglottic stenosis, RPGN",
        why: "ENT มักนำมาก่อน kidney involvement หลายเดือน และ PR3-ANCA สัมพันธ์กับ relapse สูงกว่า MPO",
        keys: ["PR3-ANCA บวกในส่วนใหญ่ แต่ limited ENT disease อาจ ANCA ลบ", "Pulmonary nodules", "Orbital pseudotumor"],
        ix: ["PR3-ANCA, UA, CT chest", "Kidney biopsy: pauci-immune necrotizing crescentic GN"],
        std: "ACR/EULAR 2022 GPA, KDIGO 2024 ANCA vasculitis, RAVE (n = 197) rituximab non-inferior ต่อ cyclophosphamide สำหรับ remission induction",
        link: "rpgn"
      }),
      N("Eosinophilic granulomatosis with polyangiitis", "nephro", {
        s: "Late-onset asthma, nasal polyp, eosinophilia > 1,000/µL",
        why: "ANCA บวกเพียงราว 40% (เกือบทั้งหมดเป็น MPO), kidney involvement พบน้อยกว่า GPA และมักเกิดในรายที่ MPO-ANCA บวก, ANCA ลบจึงไม่ exclude EGPA",
        keys: ["Mononeuritis multiplex", "Cardiac involvement พบบ่อยกว่าในราย ANCA-negative"],
        ix: ["Eosinophil count, MPO-ANCA, IgE, echo, troponin"],
        std: "ACR/EULAR 2022 EGPA, MANDARA (n = 140) benralizumab non-inferior ต่อ mepolizumab",
        link: "numbness"
      }),
      N("Cocaine / levamisole-induced vasculitis", "nephro", {
        s: "Septal perforation, retiform purpura ที่หู, neutropenia",
        why: "Cocaine-induced midline destructive lesion เลียนแบบ GPA, levamisole ทำให้ ANCA หลาย specificity บวกพร้อมกัน (MPO, PR3, anti-HNE)",
        keys: ["Anti-HNE ANCA", "ANA และ antiphospholipid บวก"],
        ix: ["Urine toxicology, ANCA panel"],
        link: "skinulcer"
      }),
      N("Drug-induced ANCA vasculitis (PTU, hydralazine)", "nephro", {
        s: "ANCA vasculitis หลังได้ยา",
        keys: ["MPO titer สูงมาก", "ANA, anti-histone บวก", "Hydralazine: lupus-like กับ ANCA"],
        ix: ["MPO, PR3, ANA, anti-histone, anti-dsDNA"],
        link: "rpgn"
      }),
      N("Extranodal NK/T-cell lymphoma, nasal type", "adj", {
        s: "Midline destructive lesion ที่ ANCA ลบ",
        why: "พบบ่อยในเอเชีย สัมพันธ์กับ EBV",
        ix: ["Deep nasal biopsy with EBER"]
      })
    ]),
    N("Oral ulcer-predominant", "step", {
      s: "Mucosal ulcer เด่นกว่า sinus",
      keys: ["Painless vs painful", "Genital ulcer"]
    }, [
      N("SLE", "nephro", {
        s: "Oral ulcer ที่ hard palate มัก painless (แต่เจ็บได้)",
        ix: ["ANA, anti-dsDNA, C3, C4, UA"],
        std: "EULAR/ACR 2019 SLE",
        link: "rpgn"
      }),
      N("Behcet disease", "nephro", {
        s: "Recurrent painful oral และ genital ulcer, uveitis",
        ix: ["Pathergy, HLA-B51"],
        std: "ICBD 2014",
        link: "eye"
      }),
      N("Drug: MTX, mTOR inhibitor, MMF, NSAID", "nephro", {
        s: "Aphthous ulcer จาก sirolimus หรือ everolimus ใน KT, MTX toxicity เมื่อ eGFR ต่ำ",
        why: "MTX สะสมใน CKD ทำให้ mucositis และ pancytopenia",
        ix: ["MTX level, CBC"]
      }),
      N("Infection: HSV, CMV, histoplasmosis, syphilis", "nephro", {
        s: "Oral ulcer ใน immunosuppressed",
        ix: ["PCR, biopsy, VDRL"],
        link: "kt-fever"
      }),
      N("IBD / celiac / B12 deficiency", "adj", {
        s: "Aphthous ulcer กับ GI symptoms",
        ix: ["Calprotectin, anti-tTG, B12"],
        link: "diarrhea"
      })
    ]),
    N("Epistaxis-predominant", "step", {
      s: "Recurrent epistaxis",
      keys: ["Bleeding diathesis", "Telangiectasia", "HTN"]
    }, [
      N("Uremic bleeding / anticoagulation", "nephro", {
        s: "Epistaxis ใน CKD G5 หรือ HD",
        ix: ["Platelet, coagulation"],
        link: "bleeding"
      }),
      N("Hereditary hemorrhagic telangiectasia", "adj", {
        s: "Telangiectasia ที่ริมฝีปาก ปลายนิ้ว, family history",
        why: "มี pulmonary, hepatic และ cerebral AVM, GI bleeding และ high-output HF จาก hepatic AVM",
        ix: ["Curacao criteria"]
      }),
      N("Severe HTN / thrombocytopenia", "nephro", {
        s: "Epistaxis ร่วมกับ BP สูงมาก (เป็น association, epistaxis อย่างเดียวไม่นับเป็น acute target organ damage) หรือ thrombocytopenia จาก TMA",
        ix: ["BP, platelet, smear"],
        link: "htn-emerg"
      })
    ]),
    N("Infectious sinusitis in high-risk host", "step", {
      s: "Sinusitis ใน DM, KT หรือ neutropenic",
      keys: ["Black eschar", "Cranial neuropathy"]
    }, [
      N("Invasive fungal sinusitis (mucormycosis, aspergillosis)", "nephro", {
        s: "Facial pain, black eschar (late sign ไม่มีไม่ exclude) ใน DKA, KT, neutropenia หรือผู้ได้ deferoxamine",
        why: "Deferoxamine เป็น siderophore ให้ Rhizopus ใน dialysis",
        ix: ["Urgent ENT biopsy, CT หรือ MRI"],
        std: "ECMM/MSG ERC 2019 mucormycosis guideline",
        link: "kt-fever"
      }),
      N("Bacterial sinusitis", "adj", {
        s: "Acute sinusitis ธรรมดา",
        ix: ["Clinical"]
      })
    ]),
    N("Cartilage inflammation", "step", {
      s: "Auricular หรือ nasal chondritis",
      keys: ["Earlobe spared"]
    }, [
      N("Relapsing polychondritis", "nephro", {
        s: "Auricular chondritis, nasal chondritis, airway involvement",
        why: "Kidney involvement รายงานได้ถึงราว 22% ใน Mayo series (29 จาก 129 ราย, Chang-Miller 1987) แต่ biopsy-proven GN (mesangial proliferative หรือ segmental necrotizing crescentic) พบน้อยกว่านั้นและมัก overlap กับ systemic vasculitis, relapsing polychondritis ยังสัมพันธ์กับ MDS และ VEXAS",
        keys: ["VEXAS: ชายสูงอายุ, macrocytosis, UBA1"],
        ix: ["Clinical criteria, UBA1 genetic testing ในชายสูงอายุ"],
        std: "McAdam criteria"
      })
    ])
  ])
};

/* ===================== RAYNAUD / DIGITAL ISCHEMIA ===================== */
TREES.raynaud = {
  must: [
    "Triphasic color change (ซีด, เขียว, แดง), เกิดเมื่อเย็นหรือเครียด",
    "Digital ulcer, pitting scar, gangrene",
    "Skin thickening, puffy fingers, heartburn, dysphagia, dyspnea",
    "Arthralgia, rash, sicca",
    "Purpura, neuropathy, hepatitis C",
    "AVF ข้างเดียวกัน (steal syndrome)",
    "ยา: beta-blocker, ergot, vasopressor, cisplatin, bleomycin, interferon",
    "สูบบุหรี่, vibration tools, cold exposure"
  ],
  tree: N("Raynaud phenomenon / digital ischemia", "root", {
    s: "แยก primary Raynaud กับ secondary แล้วแยก vasospasm จาก fixed obstruction (embolic, thrombotic, vasculitic)",
    why: "Secondary Raynaud ชี้ไปที่ systemic sclerosis (scleroderma renal crisis), SLE, cryoglobulinemia, APS และ calciphylaxis",
    keys: ["Nailfold capillaroscopy ผิดปกติ ชี้ secondary", "Digital ulcer หรือ gangrene ไม่ใช่ primary", "Asymmetric involvement ชี้ embolic หรือ access-related"],
    ix: ["Nailfold capillaroscopy", "ANA, anti-Scl-70, anti-centromere, anti-RNA polymerase III", "Cryoglobulin, C4, RF, HCV", "aPL", "CBC, smear, UA, BP"],
    std: "LeRoy and Medsger 1992 criteria for primary Raynaud"
  }, [
    N("Connective tissue disease", "step", {
      s: "Secondary Raynaud ที่มี ANA บวก หรือ capillaroscopy ผิดปกติ",
      keys: ["Digital pitting scar", "Puffy fingers"]
    }, [
      N("Systemic sclerosis", "nephro", {
        s: "Raynaud, sclerodactyly, telangiectasia, ILD",
        why: "Scleroderma renal crisis ส่วนใหญ่เกิดใน diffuse SSc ช่วง 4 ปีแรก (limited SSc ก็เกิดได้) และ steroid ≥ 15 mg/วันเพิ่ม risk",
        keys: ["Anti-RNA polymerase III: SRC risk สูง", "Anti-Scl-70: ILD", "Anti-centromere: limited, PAH"],
        ix: ["Autoantibodies, home BP monitoring, Cr", "HRCT, echo"],
        std: "ACR/EULAR 2013 SSc classification",
        link: "skinthick"
      }),
      N("SLE / MCTD", "nephro", {
        keys: ["Digital gangrene ใน SLE: APS, vasculitis (รวม ANCA overlap), cryoglobulinemia, cholesterol emboli", "Ischemia รุนแรงตรวจ aPL, cryoglobulin, MPO, PR3, echo หา embolus", "Smoking cessation, CCB, prostacyclin หรือ PDE5 inhibitor ใน critical ischemia"],
        s: "Raynaud กับ arthritis rash serositis",
        ix: ["ANA, anti-dsDNA, anti-U1 RNP, C3, C4"],
        link: "rpgn"
      }),
      N("Sjogren / dermatomyositis / anti-synthetase", "adj", {
        s: "Raynaud ใน CTD อื่น",
        ix: ["Anti-Ro, myositis panel"],
        link: "sicca"
      })
    ]),
    N("Hyperviscosity / cold-precipitating protein", "step", {
      s: "Acrocyanosis, purpura เมื่อเย็น",
      keys: ["Low C4", "Monoclonal protein"]
    }, [
      N("Cryoglobulinemia", "nephro", {
        s: "Type I (monoclonal) ทำให้ hyperviscosity และ digital necrosis, type II และ III (mixed) ทำให้ immune-complex vasculitis",
        why: "Type I จาก myeloma หรือ Waldenström ทำให้ cryoglobulinemic GN, type II (mixed) ส่วนใหญ่จาก HCV แต่พบใน Sjogren, SLE, HBV และ B-cell lymphoma ได้ ทำให้ MPGN",
        ix: ["Cryoglobulin (เก็บและขนส่งที่ 37 °C), immunofixation ของ cryoprecipitate, C4, RF, HCV RNA"],
        link: "viral"
      }),
      N("Cold agglutinin disease / Waldenström", "nephro", {
        s: "Acrocyanosis กับ hemolysis",
        ix: ["DAT (C3d), cold agglutinin titer, IgM, SPEP"],
        link: "mspike"
      })
    ]),
    N("Fixed obstruction: thrombotic / embolic", "step", {
      s: "Persistent ischemia, gangrene, asymmetric",
      keys: ["ไม่ดีขึ้นเมื่ออุ่น", "Pulse deficit"]
    }, [
      N("Antiphospholipid syndrome", "nephro", {
        s: "Digital gangrene, livedo, thrombosis",
        why: "APS nephropathy (TMA, renal artery thrombosis), catastrophic APS ทำให้ AKI",
        ix: ["Lupus anticoagulant, anticardiolipin, anti-beta2GPI ซ้ำห่างอย่างน้อย 12 สัปดาห์"],
        std: "2023 ACR/EULAR APS classification",
        link: "thrombosis"
      }),
      N("Cholesterol emboli / endocarditis / cardioembolism", "nephro", {
        s: "Blue toe หรือ blue finger แบบ asymmetric: cholesterol emboli มักตามหลัง angiography หรือ vascular surgery (เกิดเองได้), endocarditis และ cardioembolism ต้องคิดถึงเมื่อมีไข้ murmur หรือ AF",
        ix: ["Eosinophil, complement, echo, blood culture"],
        link: "bluetoe"
      }),
      N("Calciphylaxis (distal)", "nephro", {
        s: "Painful digital ischemia ใน dialysis",
        why: "Distal calciphylaxis ของนิ้ว มีปัจจัยเสี่ยงคือ PTH สูง, warfarin และ Ca load",
        ix: ["Skin biopsy, X-ray: vascular calcification"],
        link: "skinulcer"
      }),
      N("Thromboangiitis obliterans / atherosclerosis", "adj", {
        s: "ชายอายุน้อยที่สูบบุหรี่ (thromboangiitis obliterans) หรือ atherosclerotic PAD ในผู้สูงอายุ DM หรือ CKD",
        ix: ["Angiography"]
      }),
      N("Vasculitis: PAN, ANCA", "nephro", {
        s: "Digital infarct กับ systemic vasculitis เช่น polyarteritis nodosa (PAN) หรือ ANCA-associated vasculitis",
        ix: ["ANCA, HBV, angiography"],
        link: "fever"
      })
    ]),
    N("Dialysis access-related", "step", {
      s: "Ischemia ข้างเดียวกับ AVF หรือ AVG",
      keys: ["อาการแย่ลงระหว่างฟอก", "Pulse distal ลดลงและกลับมาเมื่อกด access"]
    }, [
      N("Hemodialysis access-induced distal ischemia (HAIDI, steal syndrome)", "nephro", {
        s: "Pain, pallor, numbness ของมือข้าง access",
        why: "Brachial artery-based access, DM, PAD, ผู้สูงอายุ เสี่ยงสูง",
        keys: ["Fontaine-like staging 1-4", "Digital brachial index (DBI) < 0.6 สนับสนุน แต่ต้องแปลร่วมกับอาการ"],
        ix: ["Digital brachial index, duplex, angiography"],
        std: "KDOQI 2019 vascular access",
        link: "hd-access"
      }),
      N("Ischemic monomelic neuropathy", "nephro", {
        s: "Acute pain, weakness และชาทั้งมือภายในไม่กี่ชั่วโมงหลังทำ access (มักเป็น brachial-based ใน DM) โดยมือยังอุ่นและไม่มี tissue necrosis",
        ix: ["Clinical, NCS"],
        link: "numbness"
      })
    ]),
    N("Drug / occupational / primary", "step", {
      s: "Vasospasm จากยาหรือ primary Raynaud",
      keys: ["Symmetric, อายุน้อย, ไม่มี ulcer"]
    }, [
      N("Drug: beta-blocker, ergot, cisplatin, bleomycin, vasopressor, interferon", "nephro", {
        s: "Drug-induced vasospasm",
        why: "Cisplatin กับ bleomycin ทำให้ Raynaud และ TMA",
        ix: ["Drug review"],
        link: "onco"
      }),
      N("Primary Raynaud", "adj", {
        s: "Symmetric, onset อายุน้อย, capillaroscopy ปกติ, ANA ลบ, ไม่มี ulcer",
        ix: ["Capillaroscopy, ANA"],
        std: "LeRoy and Medsger 1992"
      }),
      N("Vibration white finger / hypothyroidism", "adj", {
        s: "Occupational หรือ endocrine",
        ix: ["TSH"]
      })
    ])
  ])
};

/* ===================== SKIN THICKENING ===================== */
TREES.skinthick = {
  must: [
    "ตำแหน่ง: นิ้วมือ (sclerodactyly), ลามเลย MCP joint ไปทาง proximal, หน้า, ลำตัว, ขาส่วน distal",
    "Raynaud, digital ulcer, heartburn, dysphagia",
    "เริ่มเมื่อไร (diffuse SSc ระยะแรกเสี่ยง SRC สูงสุด)",
    "BP ที่เพิ่งสูงขึ้นใหม่, ปวดหัว, Cr ขึ้น",
    "Gadolinium exposure ขณะ eGFR < 30 หรือ AKI",
    "Paraprotein, papules บนหน้า (scleromyxedema)",
    "Eosinophilia, ออกกำลังกายหนักก่อนเกิด (eosinophilic fasciitis)",
    "Steroid ที่ได้, ยา bleomycin, taxane"
  ],
  tree: N("Skin thickening", "root", {
    s: "แยก systemic sclerosis (มี Raynaud และ sclerodactyly) ออกจาก scleroderma mimics ที่มักไม่มี Raynaud และมักไม่เป็นที่นิ้ว",
    why: "Skin thickening ในผู้ป่วยไตต้องคิด SSc กับ scleroderma renal crisis และ nephrogenic systemic fibrosis หลัง gadolinium",
    keys: ["Raynaud และนิ้วมือ: SSc", "ไม่มี Raynaud และไม่เป็นที่นิ้ว (เช่น ขาและแขนส่วน distal ใน NSF, หลังและคอใน scleredema): คิดถึง mimic", "Modified Rodnan skin score"],
    ix: ["ANA, anti-Scl-70, anti-centromere, anti-RNA polymerase III", "Nailfold capillaroscopy", "BP, Cr, UA, smear", "SPEP, IFE, eosinophil count", "Full-thickness skin biopsy (deep) ถ้าเป็น mimic"],
    std: "ACR/EULAR 2013 SSc classification"
  }, [
    N("Systemic sclerosis", "step", {
      s: "Raynaud, sclerodactyly, autoantibody",
      keys: ["Diffuse vs limited cutaneous", "Autoantibody กำหนด organ risk"]
    }, [
      N("Scleroderma renal crisis", "nephro", {
        s: "BP สูงใหม่ฉับพลันร่วมกับ AKI, มี MAHA ได้ราวครึ่งหนึ่ง มักเกิดใน diffuse SSc ระยะแรก",
        why: "ACEi ขนาดเต็มเป็นการรักษาหลัก แต่ prophylactic ACEi ไม่แนะนำเพราะการได้ ACEi มาก่อนเกิด SRC สัมพันธ์กับ outcome ที่แย่ลง (ข้อมูล observational)",
        keys: ["Anti-RNA polymerase III", "Prednisolone ≥ 15 mg/วันใน 3 เดือนก่อน", "Normotensive SRC พบราว 10% ของ SRC และ prognosis แย่กว่า"],
        ix: ["BP, Cr, smear, LDH, platelet, UA", "Kidney biopsy: onion-skin, mucoid intimal thickening"],
        std: "International SRC Study criteria (Butler 2019)",
        link: "htn-emerg"
      }),
      N("ANCA-associated GN in SSc", "nephro", {
        s: "Normotensive AKI กับ active sediment ใน SSc",
        why: "MPO-ANCA vasculitis เกิดได้ใน SSc (มักเป็นโรคมานาน) และมีรายงานหลังได้ D-penicillamine",
        ix: ["MPO-ANCA, kidney biopsy"],
        link: "rpgn"
      }),
      N("Membranous nephropathy and other non-crisis GN in SSc", "nephro", {
        s: "Proteinuria หรือ nephrotic ใน SSc ที่ BP ปกติ ไม่มี MAHA",
        why: "ไตใน SSc ไม่ได้มีแค่ SRC: MN (ส่วนมาก PLA2R ลบ, จาก penicillamine หรือ overlap SLE class V), ANCA GN, FSGS, LN ใน overlap และ drug เช่น NSAID การแยกต้องอาศัย biopsy และต้องเลือก immunosuppression ที่ไม่เพิ่ม SRC risk",
        keys: ["Prednisolone ≥ 15 mg/วัน สัมพันธ์กับ SRC โดยเฉพาะ diffuse cutaneous และ anti-RNA polymerase III", "Anti-centromere หรือ limited cutaneous มี SRC risk ต่ำกว่า", "Proteinuria เล็กน้อยพบได้จาก vasculopathy แต่ nephrotic-range ต้อง biopsy", "CNI มีรายงานกระตุ้น TMA ใน SSc จึงต้องติดตาม BP และ smear ถ้าใช้"],
        ix: ["UPCR, sediment, anti-PLA2R, ANA panel (Scl-70, RNA pol III, centromere), C3, C4, MPO", "Smear, LDH, haptoglobin เพื่อหา MAHA ของ normotensive SRC (ผลปกติไม่ตัด SRC ออก)", "Biopsy: spikes, subepithelial deposits ร่วม mesangial deposits ชี้ secondary MN"],
        std: "KDIGO 2021 GN (MN chapter), EULAR 2023 SSc recommendations",
        link: "nephrotic"
      }),
      N("Limited cutaneous SSc (CREST) with PAH", "adj", {
        s: "Anti-centromere, calcinosis, telangiectasia",
        why: "PAH ทำให้ right heart failure และ cardiorenal syndrome",
        ix: ["Echo, NT-proBNP, DLCO"],
        link: "dyspnea"
      }),
      N("Overlap: SLE, myositis, Sjogren", "nephro", {
        s: "Anti-U1 RNP, anti-PM/Scl, anti-Ku",
        ix: ["Extended ENA panel"],
        link: "raynaud"
      })
    ]),
    N("Scleroderma mimics", "step", {
      s: "Thickening โดยไม่มี Raynaud หรือไม่มี sclerodactyly",
      keys: ["Distribution", "Paraprotein", "Gadolinium"]
    }, [
      N("Nephrogenic systemic fibrosis", "nephro", {
        s: "Woody induration ที่ขาและแขน joint contracture หลัง gadolinium",
        why: "Linear group I agent ใน eGFR < 30 หรือ AKI, group II (ส่วนใหญ่เป็น macrocyclic) risk ต่ำมาก",
        keys: ["Spares face", "Yellow scleral plaque", "ส่วนใหญ่เริ่มภายในวันถึงเดือนหลัง exposure (มีรายงานช้าเป็นปี)"],
        ix: ["Deep skin biopsy: CD34+ fibrocytes, mucin", "Gadolinium history"],
        std: "ACR Manual on Contrast Media 2024, ACR-NKF 2021 consensus on gadolinium in CKD"
      }),
      N("Scleromyxedema", "nephro", {
        s: "Waxy papules บนหน้าและคอ กับ monoclonal IgG lambda",
        why: "Monoclonal gammopathy ที่พบร่วมอาจก่อ kidney lesion (MGRS) จึงตรวจ UA, UPCR และ Cr",
        ix: ["SPEP, IFE, skin biopsy"],
        link: "mspike"
      }),
      N("Scleredema", "nephro", {
        s: "Thickening ที่หลังและคอใน DM ที่คุมไม่ดี",
        why: "Diabetic scleredema มักพบร่วมกับ DKD และ retinopathy",
        ix: ["Glucose, HbA1c, SPEP"]
      }),
      N("Eosinophilic fasciitis", "adj", {
        s: "Peau d'orange ที่แขนขา groove sign eosinophilia",
        ix: ["Full-thickness biopsy ถึง fascia, MRI"]
      }),
      N("AL amyloid / POEMS skin", "nephro", {
        s: "Waxy thickening, skin hyperpigmentation, hemangioma",
        ix: ["sFLC, VEGF"],
        link: "numbness"
      }),
      N("Chronic GVHD / drug (bleomycin, taxane) / porphyria cutanea tarda", "adj", {
        s: "Sclerodermoid change จากสาเหตุอื่น",
        why: "PCT พบบ่อยขึ้นใน HD และ HCV",
        ix: ["Porphyrin, HCV"],
        link: "rash"
      })
    ]),
    N("Localized", "step", {
      s: "Plaque หรือ linear lesion โดยไม่มี internal organ",
      keys: ["ไม่มี Raynaud"]
    }, [
      N("Morphea / localized scleroderma", "adj", {
        s: "Localized plaque",
        ix: ["Skin biopsy"]
      }),
      N("Calcinosis / calciphylaxis plaques", "nephro", {
        s: "Hard indurated plaque ใน dialysis",
        ix: ["Biopsy, X-ray"],
        link: "skinulcer"
      })
    ])
  ])
};

/* ===================== PAINFUL NODULES / ULCERS ===================== */
TREES.skinulcer = {
  must: [
    "ปวดมากเกินสัดส่วน, ตำแหน่ง (central fat: ท้อง ต้นขา vs distal: นิ้ว)",
    "Dialysis vintage, PTH, Ca, PO4, Ca-based binder, vitamin D",
    "Warfarin, iron dextran, steroid",
    "Livedo, purpura, Raynaud",
    "หลังทำ angiography หรือเริ่ม anticoagulant",
    "Fever, HCV, HBV",
    "IBD, myeloproliferative disease (pyoderma)",
    "DM, PAD, neuropathy, pressure"
  ],
  tree: N("Painful skin nodules / ulcers", "root", {
    s: "ใช้ morphology (retiform purpura, necrotic ulcer, nodule) และตำแหน่งแยก vasculopathy, vasculitis และ infection",
    why: "Painful necrotic ulcer ใน dialysis คือ calciphylaxis จนกว่าจะพิสูจน์ได้ว่าไม่ใช่ ซึ่ง 1-year mortality ราว 45-80%",
    keys: ["Retiform purpura: vessel occlusion", "Pain out of proportion", "Proximal fatty area vs distal acral"],
    ix: ["Skin biopsy (deep, incisional) จาก edge ของ lesion", "Ca, PO4, PTH, ALP, albumin", "Cryoglobulin, aPL, ANCA, protein C, protein S", "Wound culture, ABI, TBI"],
    std: "Morphologic approach to retiform purpura"
  }, [
    N("Vasculopathy / occlusive", "step", {
      s: "Retiform purpura แล้ว necrosis",
      keys: ["Calcification", "Thrombosis", "Emboli"]
    }, [
      N("Calciphylaxis (calcific uremic arteriolopathy)", "nephro", {
        s: "Painful indurated plaque, retiform purpura, necrotic eschar ที่ท้อง ต้นขา",
        why: "Risk: dialysis, female, obesity, DM, warfarin, Ca load, PTH สูงหรือต่ำมาก, hypoalbuminemia",
        keys: ["Central (proximal) prognosis แย่กว่า distal", "Pain มักนำมาก่อน skin change", "พบใน non-dialysis CKD, KT และ non-uremic ได้"],
        ix: ["Skin biopsy: medial calcification ของ arteriole, intimal hyperplasia, thrombosis (ระวังแผลไม่หาย)", "Bone scan หรือ X-ray: net-like vascular calcification"],
        std: "Nigwekar 2018 NEJM review, sodium thiosulfate ยังไม่มี RCT ยืนยันประโยชน์ (BEAT-Calci กำลังศึกษา)"
      }),
      N("Warfarin necrosis / protein C deficiency", "nephro", {
        s: "Necrosis ที่ fatty area มักเกิดใน 3-5 วันแรกของ warfarin (ภายใน 10 วัน)",
        ix: ["Protein C, INR"],
        link: "thrombosis"
      }),
      N("Antiphospholipid syndrome / livedoid vasculopathy", "nephro", {
        s: "Livedo racemosa, ulcer ที่ข้อเท้า",
        ix: ["aPL"],
        link: "thrombosis"
      }),
      N("Cholesterol emboli", "nephro", {
        s: "Livedo, blue toe, ulcer มักตามหลัง angiography หรือ vascular surgery (เกิดเองได้)",
        ix: ["Skin biopsy: cholesterol cleft"],
        link: "bluetoe"
      }),
      N("Type I cryoglobulinemia / cryofibrinogenemia", "nephro", {
        s: "Acral necrosis เมื่อเย็น",
        ix: ["Cryoglobulin, IFE"],
        link: "raynaud"
      }),
      N("Oxalosis / hyperviscosity", "nephro", {
        s: "Livedo และ ulcer ใน primary hyperoxaluria หรือ systemic oxalosis",
        ix: ["Plasma oxalate, skin biopsy: oxalate crystal"],
        link: "bonepain"
      })
    ]),
    N("Vasculitis", "step", {
      s: "Palpable purpura, nodule, ulcer กับ systemic disease",
      keys: ["Nodule ตาม vessel", "Neuropathy", "Active sediment"]
    }, [
      N("Polyarteritis nodosa (cutaneous or systemic)", "nephro", {
        s: "Painful subcutaneous nodule, livedo, ulcer",
        ix: ["Deep skin biopsy, HBV, angiography"],
        link: "fever"
      }),
      N("ANCA vasculitis", "nephro", {
        s: "Ulcer, nodule, purpura",
        ix: ["ANCA"],
        link: "rpgn"
      }),
      N("Mixed cryoglobulinemia / IgA vasculitis", "nephro", {
        s: "Purpura ที่กลายเป็น ulcer",
        ix: ["Cryoglobulin, C4, skin DIF"],
        link: "arthralgia"
      }),
      N("Levamisole-adulterated cocaine", "nephro", {
        s: "Retiform purpura ที่ใบหูและแก้ม",
        ix: ["Urine toxicology, ANCA panel"],
        link: "ent"
      })
    ]),
    N("Panniculitis / nodules", "step", {
      s: "Tender subcutaneous nodules",
      keys: ["หน้าแข้ง: erythema nodosum", "Oily discharge และ lipase สูง: pancreatic panniculitis", "Erythema nodosum ต้องหา sarcoidosis และ TB"]
    }, [
      N("Erythema nodosum", "nephro", {
        s: "Tender nodules ที่หน้าแข้ง",
        why: "สาเหตุ: sarcoidosis, TB, streptococcal infection, IBD, Behcet, ยา และ idiopathic",
        ix: ["CXR, ASO, IGRA"],
        link: "hyperca"
      }),
      N("Pancreatic panniculitis", "adj", {
        s: "Nodule ที่ ulcerate มี oily discharge",
        ix: ["Lipase"],
        link: "abdpain"
      }),
      N("Lupus panniculitis / erythema induratum", "adj", {
        s: "Lupus profundus หรือ TB-related",
        ix: ["Biopsy, IGRA"]
      })
    ]),
    N("Infection / neutrophilic / other", "step", {
      s: "Ulcer จาก infection หรือ inflammatory dermatosis",
      keys: ["Fever", "Pathergy", "Immunosuppression"]
    }, [
      N("Necrotizing infection / ecthyma / fungal", "nephro", {
        s: "Rapidly spreading necrosis ใน immunosuppressed หรือ DM",
        why: "Melioidosis, Vibrio vulnificus ใน cirrhosis, mucormycosis ใน DKA หรือ KT",
        ix: ["Culture, biopsy, surgical exploration"],
        link: "kt-fever"
      }),
      N("Pyoderma gangrenosum", "adj", {
        s: "Violaceous undermined border, pathergy",
        why: "พบร่วมกับ IBD, RA, hematologic malignancy และ IgA paraprotein (ราวครึ่งหนึ่งมีโรคร่วม)",
        ix: ["Diagnosis of exclusion, biopsy เพื่อตัด infection"],
        std: "PARACELSUS score",
        link: "diarrhea"
      }),
      N("Diabetic foot / PAD / pressure ulcer", "nephro", {
        s: "Ulcer ที่ pressure point ในผู้ป่วย DM หรือ PAD โดยเฉพาะผู้ที่ทำ dialysis",
        why: "Dialysis เพิ่ม amputation risk",
        ix: ["TBI (ABI สูงลวงจาก medial calcification), osteomyelitis workup"],
        std: "IWGDF 2023 guideline",
        link: "bluetoe"
      })
    ])
  ])
};

/* ===================== BLUE TOE / LIMB ISCHEMIA ===================== */
TREES.bluetoe = {
  must: [
    "Onset, หลังทำ angiography, PCI, cardiac surgery, endovascular procedure",
    "เพิ่งเริ่ม anticoagulant หรือ thrombolytic",
    "Pulse ปลายเท้าคลำได้หรือไม่",
    "AF, valve disease, fever (endocarditis)",
    "Livedo, ปวดท้อง, ตามัว, Cr ขึ้นช้าๆ",
    "Claudication, rest pain, smoking, DM",
    "Raynaud, CTD, aPL",
    "Warfarin, dialysis vintage (calciphylaxis)"
  ],
  tree: N("Blue toe / limb ischemia", "root", {
    s: "Blue toe ที่ pulse คลำได้ชี้ไปที่ microembolism หรือ small vessel disease ส่วน pulse ที่คลำไม่ได้ชี้ไปที่ macrovascular occlusion",
    why: "Atheroembolic disease หลัง angiography ทำให้ subacute AKI ที่มักฟื้นช้าหรือไม่ฟื้น และแยกจาก contrast-associated AKI ได้ด้วย timeline",
    keys: ["Palpable pedal pulse", "Livedo reticularis", "Timeline หลัง procedure: CA-AKI Cr ขึ้นใน 1-3 วันแล้วฟื้นใน 1-2 สัปดาห์ ส่วน atheroembolic Cr ขึ้นช้าแบบ stepwise เป็นสัปดาห์ถึงเดือนและมักไม่ฟื้น"],
    ix: ["CBC eosinophil, C3, C4, ESR", "UA (eosinophiluria มีข้อจำกัด), Cr trend", "Echo, blood culture", "ABI, TBI, duplex, CTA", "aPL, protein C, protein S"],
    std: "ESC 2024 peripheral arterial and aortic disease guideline"
  }, [
    N("Microembolism with palpable pulse", "step", {
      s: "Blue toe, livedo, pulse ปกติ",
      keys: ["Recent procedure", "Eosinophilia"]
    }, [
      N("Atheroembolic renal disease (cholesterol crystal embolism)", "nephro", {
        s: "Livedo, blue toe, subacute stepwise AKI, eosinophilia หลัง catheterization",
        why: "ส่วนใหญ่เกิดหลัง vascular procedure แต่เกิดเองได้ (ราว 1 ใน 4-5), anticoagulant และ thrombolytic เพิ่ม risk, AKI ฟื้นช้าหรือไม่ฟื้น ต้องแยกจาก CA-AKI",
        keys: ["Eosinophilia ราว 60-80% ช่วงแรก", "Low complement (พบเพียงบางราย)", "Hollenhorst plaque", "GI และ pancreatic involvement"],
        ix: ["Skin หรือ kidney biopsy: biconvex cholesterol cleft ใน arcuate และ interlobular artery", "Fundoscopy"],
        std: "Scolari 2010 Lancet review",
        link: "risingcr"
      }),
      N("Infective endocarditis", "nephro", {
        s: "Septic emboli, Janeway lesion, splinter hemorrhage",
        ix: ["Blood culture, echo"],
        std: "2023 Duke-ISCVID",
        link: "fever"
      }),
      N("Atrial myxoma / non-bacterial thrombotic endocarditis", "adj", {
        s: "Embolism กับ constitutional symptoms",
        why: "Libman-Sacks ใน SLE และ APS, marantic ใน malignancy",
        ix: ["Echo, TEE"]
      })
    ]),
    N("Small vessel thrombosis / vasculopathy", "step", {
      s: "Digital ischemia โดย proximal artery ปกติ",
      keys: ["Hypercoagulable", "Cold", "Calcification"]
    }, [
      N("Antiphospholipid syndrome", "nephro", {
        s: "Digital gangrene, livedo, recurrent thrombosis",
        ix: ["aPL x2 ห่างอย่างน้อย 12 สัปดาห์"],
        link: "thrombosis"
      }),
      N("Calciphylaxis (distal)", "nephro", {
        s: "Painful acral necrosis ใน dialysis",
        ix: ["Skin biopsy"],
        link: "skinulcer"
      }),
      N("Cryoglobulinemia / cold agglutinin", "nephro", {
        s: "Acrocyanosis เมื่อเย็น",
        ix: ["Cryoglobulin, IFE"],
        link: "raynaud"
      }),
      N("HIT / TTP / DIC", "nephro", {
        s: "Venous limb gangrene หรือ microvascular thrombosis",
        why: "HIT ใน HD ที่ได้ heparin ทำให้ access thrombosis",
        ix: ["4T score, HIT antibody, smear, ADAMTS13"],
        link: "tma"
      }),
      N("Vasculitis: PAN, ANCA, Buerger", "nephro", {
        s: "Digital infarct กับ systemic vasculitis",
        ix: ["ANCA, HBV, angiography"],
        link: "skinulcer"
      })
    ]),
    N("Macrovascular occlusion (pulse absent)", "step", {
      s: "Pulse ลดลงหรือไม่มี",
      keys: ["6P", "Chronic claudication vs acute"]
    }, [
      N("Peripheral arterial disease in CKD", "nephro", {
        s: "Claudication, rest pain, non-healing ulcer",
        why: "CKD และ dialysis มี prevalence ของ PAD สูง และ medial calcification ทำให้ ABI สูงลวง (falsely elevated)",
        keys: ["ABI > 1.4 = non-compressible", "ใช้ TBI < 0.7 วินิจฉัย"],
        ix: ["TBI, duplex, CTA (contrast ตาม eGFR) หรือ non-contrast MRA"],
        std: "ESC 2024 PAD guideline, KDIGO 2024 CKD"
      }),
      N("Acute limb ischemia (embolic or thrombotic)", "adj", {
        s: "Pain, pallor, pulseless, paresthesia, paralysis",
        why: "AF พบบ่อยใน HD และเป็น embolic source, reperfusion ทำให้ rhabdomyolysis, hyperkalemia และ AKI",
        ix: ["Urgent CTA, CK, K"],
        link: "myalgia"
      }),
      N("Aortic dissection / thrombosis", "nephro", {
        s: "Limb ischemia ข้างเดียวหรือสองข้างร่วมกับ AKI, pulse deficit หรือปวดอกปวดหลัง",
        ix: ["CTA aorta"],
        link: "chestpain"
      })
    ]),
    N("Vasospasm / drug", "step", {
      s: "Reversible ischemia",
      keys: ["Drug exposure", "Cold"]
    }, [
      N("Vasopressor / ergot / cocaine", "adj", {
        s: "Symmetric digital ischemia ใน shock ที่ได้ vasopressor หรือจากยา ergot, cocaine",
        ix: ["Drug review"]
      }),
      N("Raynaud / CTD", "nephro", {
        s: "Episodic color change",
        ix: ["ANA, capillaroscopy"],
        link: "raynaud"
      })
    ])
  ])
};

/* ===================== BLEEDING TENDENCY / BRUISING ===================== */
TREES.bleeding = {
  must: [
    "Mucocutaneous (petechiae, epistaxis, gum) หรือ deep (hemarthrosis, muscle hematoma)",
    "Bleeding หลังผ่าตัด ถอนฟัน, kidney biopsy, access cannulation",
    "Antiplatelet, anticoagulant, heparin ระหว่างฟอก, SSRI, herbal",
    "CKD stage, uremic symptoms, Hct",
    "Liver disease, malnutrition, antibiotic (vitamin K)",
    "Periorbital purpura, macroglossia (AL amyloid)",
    "Steroid ระยะยาว, Cushingoid",
    "Family history, ประจำเดือนมาก"
  ],
  tree: N("Bleeding tendency / bruising", "root", {
    s: "ใช้ platelet count, PT, aPTT แยก platelet number, platelet function, coagulation factor และ vascular fragility",
    why: "Bleeding ในผู้ป่วยไตส่วนใหญ่เกิดจาก uremic platelet dysfunction และยา แต่ต้องตัด TMA, AL amyloid และ liver disease",
    keys: ["Platelet count", "PT vs aPTT", "Mixing study", "Mucocutaneous vs deep bleeding"],
    ix: ["CBC, smear, PT/INR, aPTT, fibrinogen", "Mixing study ถ้า aPTT ยาว", "vWF antigen และ activity, factor assay", "LFT, Cr, BUN"],
    std: "ISTH bleeding assessment tool"
  }, [
    N("Platelet function defect (count normal)", "step", {
      s: "Mucocutaneous bleeding, platelet ปกติ, PT และ aPTT ปกติ",
      keys: ["Uremia", "Antiplatelet", "von Willebrand"]
    }, [
      N("Uremic platelet dysfunction", "nephro", {
        s: "Bleeding ใน CKD G4-5 หรือ dialysis",
        why: "GPIIb/IIIa dysfunction, NO เพิ่มขึ้น และ anemia ทำให้ platelet ไหลอยู่กลาง lumen ไม่ชิดผนังหลอดเลือด",
        keys: ["Bleeding time ยาว", "ดีขึ้นเมื่อ dialysis, Hct > 30%"],
        ix: ["PFA-100 (ไม่จำเป็นในทางปฏิบัติ)"],
        std: "DDAVP 0.3 µg/kg IV ออกฤทธิ์ภายใน 1 ชั่วโมง นาน 4-8 ชั่วโมง (tachyphylaxis หลัง 1-2 dose), conjugated estrogen 0.6 mg/kg/วัน x5 วัน ออกฤทธิ์นาน 2 สัปดาห์"
      }),
      N("Antiplatelet / SSRI / herbal", "nephro", {
        s: "Drug-induced platelet dysfunction",
        ix: ["Drug review"]
      }),
      N("Acquired von Willebrand (Heyde, hypothyroidism, MGUS)", "nephro", {
        s: "Heyde syndrome คือ GI bleeding จาก angiodysplasia ร่วมกับ aortic stenosis, สาเหตุอื่นของ acquired vWS ได้แก่ hypothyroidism, MGUS และ lymphoproliferative disease",
        ix: ["vWF activity/antigen ratio, multimer"],
        link: "gibleed"
      })
    ]),
    N("Thrombocytopenia", "step", {
      s: "Platelet ต่ำ",
      keys: ["Schistocyte", "Heparin exposure", "Splenomegaly"]
    }, [
      N("Thrombotic microangiopathy", "nephro", {
        s: "Platelet ต่ำ MAHA AKI",
        ix: ["Smear, LDH, haptoglobin, ADAMTS13, complement"],
        std: "ISTH 2020 TTP",
        link: "tma"
      }),
      N("Heparin-induced thrombocytopenia", "nephro", {
        s: "Platelet ลด > 50% ใน 5-10 วันหลังเริ่ม heparin, access thrombosis",
        why: "HD ใช้ heparin ทุกรอบ ต้องหยุด heparin ทุกรูปแบบ (รวม catheter lock และ LMWH) แล้วใช้ argatroban (ขับทางตับ), fondaparinux สะสมใน CKD จึงเลี่ยง",
        ix: ["4T score, anti-PF4 ELISA, functional assay (SRA)"],
        std: "ASH 2018 HIT guideline"
      }),
      N("Immune thrombocytopenia / SLE / drug", "nephro", {
        s: "Isolated thrombocytopenia",
        ix: ["ANA, HIV, HCV, H. pylori"],
        link: "cytopenia"
      }),
      N("Hypersplenism / marrow failure / HLH", "adj", {
        s: "Cirrhosis, lymphoma, marrow infiltration",
        ix: ["US spleen, bone marrow"],
        link: "cytopenia"
      }),
      N("Drug: linezolid, valganciclovir, MMF, azathioprine", "nephro", {
        s: "Drug-induced marrow suppression พบบ่อยใน KT (valganciclovir, MMF, azathioprine) แต่เกิดได้ในทุกคนที่ได้ยากลุ่มนี้ เช่น linezolid นานเกิน 2 สัปดาห์",
        why: "Azathioprine ร่วมกับ xanthine oxidase inhibitor (allopurinol หรือ febuxostat) ทำให้ severe myelosuppression, NUDT15 variant พบบ่อยในเอเชีย ส่วน TPMT variant พบน้อยกว่า",
        ix: ["Drug review, TPMT, NUDT15"]
      })
    ]),
    N("Coagulation factor defect", "step", {
      s: "PT หรือ aPTT ยาว",
      keys: ["Mixing corrects: deficiency", "Mixing ไม่ correct: inhibitor"]
    }, [
      N("Anticoagulant accumulation", "nephro", {
        s: "Warfarin, DOAC, LMWH ใน CKD",
        why: "Dabigatran ขับทางไต 80% ใช้ HD เอาออกได้, enoxaparin สะสมเมื่อ CrCl < 30",
        ix: ["INR, anti-Xa, dilute thrombin time"]
      }),
      N("Liver disease / vitamin K deficiency", "adj", {
        s: "PT ยาว",
        why: "Vitamin K deficiency เกิดจาก antibiotic ระยะยาวร่วมกับ poor intake ซึ่งพบได้ในผู้ป่วย dialysis",
        ix: ["Factor V ต่ำใน liver disease แต่ปกติใน vitamin K deficiency (factor VII ต่ำทั้งสองภาวะ), vitamin K trial"],
        link: "jaundice"
      }),
      N("AL amyloid with factor X deficiency", "nephro", {
        s: "Periorbital purpura (raccoon eyes), PT และ aPTT ยาว, nephrotic",
        why: "Factor X ถูกจับใน amyloid fibril, และ vascular fragility",
        ix: ["Factor X level, sFLC, IFE"],
        link: "mspike"
      }),
      N("Acquired hemophilia / LA / nephrotic factor loss", "nephro", {
        s: "aPTT ยาว: mixing ไม่ correct ใน inhibitor (acquired hemophilia, LA) แต่ correct ใน factor loss",
        why: "Nephrotic syndrome สูญเสีย factor IX, XI, XII และ antithrombin, lupus anticoagulant โดยทั่วไปทำให้ thrombosis ไม่ใช่ bleeding (ยกเว้นมี hypoprothrombinemia หรือ platelet ต่ำร่วม)",
        ix: ["Mixing study, factor VIII inhibitor, LA"],
        link: "thrombosis"
      }),
      N("DIC", "adj", {
        s: "Sepsis, malignancy, obstetric",
        ix: ["Fibrinogen, D-dimer, ISTH DIC score"]
      })
    ]),
    N("Vascular fragility", "step", {
      s: "Bruising โดย lab ปกติ",
      keys: ["Steroid", "Elderly", "Vitamin C"]
    }, [
      N("Glucocorticoid excess / senile purpura", "nephro", {
        s: "Ecchymosis ที่แขนจาก steroid ใน GN หรือ KT",
        ix: ["Clinical"],
        link: "cushingoid"
      }),
      N("Scurvy", "nephro", {
        s: "Perifollicular hemorrhage, gum bleeding",
        why: "Vitamin C หลุดระหว่างฟอกและจำกัดผลไม้เพราะ K",
        ix: ["Vitamin C level"]
      }),
      N("Amyloid vascular infiltration / Ehlers-Danlos", "adj", {
        s: "Pinch purpura",
        ix: ["Fat pad biopsy"],
        link: "mspike"
      }),
      N("IgA vasculitis / cryoglobulinemia", "nephro", {
        s: "Palpable purpura จาก vasculitis ไม่ใช่ bleeding disorder (platelet และ coagulation ปกติ)",
        ix: ["Skin biopsy"],
        link: "rash"
      })
    ])
  ])
};

/* ===================== VENOUS AND ARTERIAL THROMBOSIS ===================== */
TREES.thrombosis = {
  must: [
    "Venous, arterial หรือทั้งคู่, ตำแหน่งผิดปกติ (renal vein, mesenteric, cerebral, hepatic)",
    "Proteinuria, edema, albumin (nephrotic)",
    "Recurrent pregnancy loss, livedo, thrombocytopenia (APS)",
    "Heparin exposure, access thrombosis ซ้ำๆ",
    "Hemolysis, dark urine ตอนเช้า, cytopenia (PNH)",
    "Malignancy, น้ำหนักลด",
    "Estrogen, ESA ขนาดสูง, steroid, tranexamic acid",
    "Family history ของ VTE"
  ],
  tree: N("Venous and arterial thrombosis", "root", {
    s: "แยก provoked กับ unprovoked แล้วหา acquired (nephrotic, APS, PNH, HIT, malignancy) ก่อน inherited",
    why: "Nephrotic syndrome เป็น hypercoagulable state ที่ทำให้ RVT และ PE และ APS กับ PNH ทำให้ทั้ง thrombosis และ kidney injury",
    keys: ["Venous only vs arterial and venous", "Unusual site", "Thrombocytopenia ร่วมด้วย", "Proteinuria"],
    ix: ["UA, UPCR, albumin", "CBC, smear, LDH, haptoglobin", "aPL (LA, aCL, anti-beta2GPI)", "Flow cytometry for PNH (FLAER)", "Imaging ตามตำแหน่ง", "Age-appropriate cancer screening"],
    std: "ASH 2020 VTE treatment guideline, ISTH thrombophilia testing guidance"
  }, [
    N("Nephrotic syndrome", "step", {
      s: "Hypercoagulable จาก loss ของ antithrombin และ increase ของ fibrinogen และ factor V, VIII",
      keys: ["MN เสี่ยงสูงสุด", "Albumin ต่ำ = risk สูง"]
    }, [
      N("Renal vein thrombosis", "nephro", {
        s: "Flank pain, hematuria, Cr ขึ้น หรือไม่มีอาการ",
        why: "พบบ่อยที่สุดใน MN รองลงมาคือ MPGN, MCD และ amyloid โดยเฉพาะเมื่อ albumin < 2.5 g/dL (ใน MN risk เริ่มเพิ่มตั้งแต่ < 2.8 g/dL, Lionaki 2012)",
        keys: ["Left varicocele ในชาย", "PE โดยไม่มี DVT"],
        ix: ["CT venography หรือ Doppler US", "Anti-PLA2R"],
        std: "KDIGO 2021 GN: พิจารณา prophylactic anticoagulation ใน MN ที่ albumin < 2.5 g/dL (BCG, หรือ < 2.0 ถ้าวัดด้วย BCP) โดยชั่งกับ bleeding risk (GN tools bleed risk calculator)",
        link: "nephrotic"
      }),
      N("DVT / PE in nephrotic syndrome", "nephro", {
        s: "VTE เสี่ยงสูงสุดใน 6 เดือนแรกของ nephrotic syndrome",
        ix: ["Compression US, CTPA"],
        std: "ESC 2019 PE",
        link: "nephrotic"
      }),
      N("Arterial thrombosis in nephrotic", "nephro", {
        s: "Arterial event พบน้อยกว่าแต่เกิดได้ โดยเฉพาะในเด็กและ MN",
        ix: ["CTA"]
      })
    ]),
    N("Antiphospholipid syndrome", "step", {
      s: "Arterial และ venous thrombosis, pregnancy morbidity",
      keys: ["Triple positive risk สูงสุด", "Thrombocytopenia, livedo"]
    }, [
      N("APS nephropathy", "nephro", {
        s: "Acute TMA หรือ chronic lesion (fibrous intimal hyperplasia, focal cortical atrophy), HTN, proteinuria",
        why: "Primary หรือ secondary ใน SLE, warfarin ดีกว่า DOAC ใน triple positive (TRAPS n = 120 หยุดก่อนกำหนดเพราะ event สูงใน rivaroxaban)",
        keys: ["Lupus anticoagulant ทำให้ aPTT ยาว in vitro แต่เป็น prothrombotic", "Renal artery stenosis หรือ thrombosis"],
        ix: ["aPL ซ้ำห่างอย่างน้อย 12 สัปดาห์", "Kidney biopsy"],
        std: "2023 ACR/EULAR APS classification, EULAR 2019 APS management",
        link: "tma"
      }),
      N("Catastrophic APS", "nephro", {
        s: "Thrombosis ≥ 3 organs ภายใน 1 สัปดาห์ มักมี AKI",
        ix: ["aPL, smear, organ biopsy"],
        std: "Asherson 2003 CAPS criteria"
      })
    ]),
    N("Hematologic", "step", {
      s: "Thrombosis กับ cytopenia หรือ hemolysis",
      keys: ["Heparin", "Hemolysis", "High counts"]
    }, [
      N("Heparin-induced thrombocytopenia", "nephro", {
        s: "Thrombosis กับ platelet ลดหลัง heparin",
        why: "ใน HD ให้สงสัยเมื่อมี access thrombosis หรือ circuit clotting ซ้ำร่วมกับ platelet ลดหลังเริ่ม heparin",
        ix: ["4T score, anti-PF4, SRA"],
        std: "ASH 2018 HIT",
        link: "bleeding"
      }),
      N("Paroxysmal nocturnal hemoglobinuria", "nephro", {
        s: "Thrombosis ที่ตำแหน่งผิดปกติ (hepatic, mesenteric, cerebral), hemolysis, cytopenia",
        why: "Hemosiderosis ของ tubule ทำให้ CKD และ hemoglobinuria ทำให้ AKI",
        ix: ["Flow cytometry FLAER, CD59", "MRI kidney: cortical signal loss จาก hemosiderin"],
        link: "pigmenturia"
      }),
      N("Myeloproliferative neoplasm / post-transplant erythrocytosis", "nephro", {
        s: "Hct สูง: post-transplant erythrocytosis (Hb > 17 g/dL หรือ Hct > 51% หลัง KT) หรือ polycythemia vera (JAK2 บวก, EPO ต่ำ)",
        why: "PTE มักเกิดใน 2 ปีแรกหลัง KT รักษาด้วย ACEi หรือ ARB",
        ix: ["Hct, EPO, JAK2"]
      })
    ]),
    N("Malignancy / drug / access", "step", {
      s: "Provoked thrombosis",
      keys: ["Cancer", "ESA", "Catheter"]
    }, [
      N("Cancer-associated thrombosis", "nephro", {
        s: "Trousseau syndrome",
        why: "Paraneoplastic MN ร่วมกับ VTE, RCC ทำให้ IVC tumor thrombus",
        ix: ["CT, age-appropriate screening"],
        std: "ASCO 2023 VTE in cancer guideline",
        link: "weightloss"
      }),
      N("ESA / estrogen / tranexamic acid", "nephro", {
        s: "Thrombosis จากยา",
        why: "ESA เมื่อ Hb target สูง (TREAT n = 4,038 stroke เพิ่ม HR 1.92) และ access thrombosis",
        ix: ["Hb, drug review"],
        std: "KDIGO 2026 Anemia in CKD, TREAT (NEJM 2009)"
      }),
      N("Vascular access thrombosis / central vein stenosis", "nephro", {
        s: "AVF หรือ AVG thrombosis, catheter-related DVT",
        ix: ["Fistulogram, venography"],
        std: "KDOQI 2019 vascular access",
        link: "hd-access"
      })
    ]),
    N("Inherited thrombophilia / others", "step", {
      s: "Unprovoked VTE ในคนอายุน้อยหรือ family history",
      keys: ["ตรวจเมื่อผลจะเปลี่ยนการรักษา"]
    }, [
      N("Protein C, S, antithrombin deficiency / factor V Leiden", "adj", {
        s: "Inherited thrombophilia",
        why: "Antithrombin ต่ำจาก nephrotic ทำให้ผลตรวจแปลผลยาก ควรตรวจหลัง remission",
        ix: ["Activity assay ห่างจาก acute event และ anticoagulant"]
      }),
      N("Behcet / IBD / hyperhomocysteinemia", "nephro", {
        s: "Venous thrombosis ใน inflammatory disease",
        why: "Homocysteine สูงใน CKD แต่การให้ folate และ vitamin B ลด homocysteine โดยไม่ลด event (HOST n = 2,056)",
        ix: ["Homocysteine"],
        link: "eye"
      })
    ])
  ])
};

/* ===================== STROKE / FOCAL DEFICIT ===================== */
TREES.stroke = {
  must: [
    "Onset, thunderclap headache, focal deficit, seizure",
    "Age (young stroke < 50 ปี ต้องหาสาเหตุเฉพาะ)",
    "Family history ของ ADPKD, SAH, early stroke, Fabry",
    "AF, valve, endocarditis, PFO",
    "SLE, aPL, livedo, recurrent pregnancy loss",
    "BP control, hypertensive emergency",
    "Anticoagulant, heparin ระหว่างฟอก, fall",
    "MAHA, thrombocytopenia (TTP)"
  ],
  tree: N("Stroke / focal neurological deficit", "root", {
    s: "แยก ischemic กับ hemorrhagic ด้วย imaging แล้วหาสาเหตุที่เชื่อมกับไต",
    why: "สาเหตุที่พบบ่อยที่สุดในผู้ป่วยไตยังเป็น HTN, atherosclerosis และ AF เหมือนคนทั่วไป แต่ต้องหาสาเหตุที่เชื่อมกับไตด้วย ได้แก่ ADPKD aneurysm, Fabry, APS, TTP, vasculitis และ hypertensive emergency",
    keys: ["Hemorrhage vs infarct", "Young stroke", "Multiple territories (embolic)", "MAHA"],
    ix: ["CT brain, CTA, MRI with DWI", "ECG, Holter, echo (TTE แล้ว TEE)", "CBC, smear, LDH, aPL, ANA, ANCA", "UA, UPCR, Cr", "Alpha-galactosidase A activity ใน young cryptogenic stroke โดยเฉพาะเมื่อมี proteinuria, LVH หรือ acroparesthesia (หญิงต้องตรวจ GLA gene เพราะ enzyme ปกติได้)"],
    std: "AHA/ASA 2026 acute ischemic stroke guideline, TOAST classification"
  }, [
    N("Hemorrhagic", "step", {
      s: "ICH หรือ SAH บน CT",
      keys: ["Thunderclap", "BP สูง", "Anticoagulant"]
    }, [
      N("Ruptured intracranial aneurysm in ADPKD", "nephro", {
        s: "SAH อายุน้อยกว่าคนทั่วไป",
        why: "Screening MRA แนะนำเมื่อมี family history ของ IA หรือ SAH, high-risk occupation หรือก่อน major elective surgery",
        keys: ["Family history ของ SAH", "Bilateral cystic kidneys"],
        ix: ["CT, CTA, LP ถ้า CT ลบ"],
        std: "KDIGO 2025 ADPKD guideline",
        link: "headache"
      }),
      N("Hypertensive ICH", "nephro", {
        s: "Basal ganglia, thalamus, pons, cerebellum",
        why: "CKD และ HD มี HTN ควบคุมยาก และ uremic platelet dysfunction",
        ix: ["CT"],
        std: "AHA/ASA 2022 ICH guideline",
        link: "htn-emerg"
      }),
      N("Anticoagulant / uremic bleeding / subdural", "nephro", {
        s: "ICH หรือ subdural ใน dialysis ที่ได้ heparin หรือ warfarin",
        ix: ["CT, coagulation"],
        link: "bleeding"
      }),
      N("Cerebral amyloid angiopathy / vasculitis / RCVS", "adj", {
        s: "Lobar hemorrhage ในผู้สูงอายุ หรือ convexity SAH",
        ix: ["MRI SWI, angiography"]
      })
    ]),
    N("Ischemic: cardioembolic", "step", {
      s: "Multiple territories, cortical infarct",
      keys: ["AF", "Valve", "Endocarditis"]
    }, [
      N("Atrial fibrillation in CKD / dialysis", "nephro", {
        s: "AF พบมากใน HD",
        why: "Anticoagulation ใน dialysis ยังไม่มีข้อสรุป RENAL-AF (n = 154) และ AXADIA-AFNET 8 (n = 97) เล็กเกินจะสรุป",
        ix: ["ECG, Holter"],
        std: "ESC 2024 AF guideline",
        link: "palpitation"
      }),
      N("Infective endocarditis", "nephro", {
        s: "Septic emboli จาก infective endocarditis ซึ่งเสี่ยงสูงขึ้นใน HD catheter bacteremia",
        ix: ["Blood culture, TEE"],
        std: "2023 Duke-ISCVID",
        link: "fever"
      }),
      N("Libman-Sacks / marantic endocarditis", "nephro", {
        s: "Non-bacterial vegetation ใน SLE, APS, malignancy",
        ix: ["TEE, aPL"],
        link: "thrombosis"
      })
    ]),
    N("Ischemic: young or unusual", "step", {
      s: "Stroke อายุ < 50 ปี หรือไม่มี vascular risk factor",
      keys: ["Proteinuria", "aPL", "MAHA"]
    }, [
      N("Fabry disease", "nephro", {
        s: "Young stroke (posterior circulation), proteinuria, LVH, acroparesthesia",
        why: "Dolichoectasia ของ basilar artery, MRI pulvinar sign",
        ix: ["Alpha-galactosidase A (ชาย), GLA genetic (หญิง), lyso-Gb3"],
        link: "numbness"
      }),
      N("Antiphospholipid syndrome", "nephro", {
        s: "Arterial stroke ในคนอายุน้อย",
        ix: ["aPL x2 ห่างอย่างน้อย 12 สัปดาห์"],
        std: "2023 ACR/EULAR APS",
        link: "thrombosis"
      }),
      N("TTP", "nephro", {
        s: "Transient focal deficit กับ MAHA thrombocytopenia",
        ix: ["Smear, ADAMTS13"],
        link: "tma"
      }),
      N("CNS vasculitis / SLE / Behcet", "nephro", {
        s: "Multiple infarcts กับ systemic inflammation",
        ix: ["MRI, angiography, CSF, ANCA, ANA"],
        link: "rpgn"
      }),
      N("Moyamoya / fibromuscular dysplasia / dissection", "nephro", {
        s: "Stroke กับ renovascular HTN",
        why: "FMD มีทั้ง renal artery stenosis และ cervical artery dissection, moyamoya สัมพันธ์กับ renal artery stenosis ใน Asian",
        ix: ["CTA head-neck และ renal artery"],
        std: "International FMD consensus 2019",
        link: "htn-young"
      }),
      N("MELAS / mitochondrial", "nephro", {
        s: "Stroke-like episode, FSGS, deafness, DM",
        ix: ["Lactate, m.3243A>G"],
        link: "hearing"
      })
    ]),
    N("Ischemic: large and small artery", "step", {
      s: "Atherosclerotic หรือ lacunar",
      keys: ["Vascular risk factor", "CKD เป็น risk factor อิสระ"]
    }, [
      N("Atherosclerosis in CKD", "nephro", {
        s: "Carotid stenosis, intracranial atherosclerosis",
        why: "CKD เร่ง atherosclerosis และ vascular calcification",
        ix: ["Carotid duplex, CTA"]
      }),
      N("Lacunar infarct / small vessel disease", "nephro", {
        s: "Pure motor หรือ sensory stroke",
        why: "HTN และ DM, CADASIL เป็น DDx ใน familial",
        ix: ["MRI"]
      })
    ]),
    N("Stroke mimics", "step", {
      s: "Focal deficit ที่ไม่ใช่ stroke",
      keys: ["Glucose", "Seizure", "PRES"]
    }, [
      N("Hypoglycemia / hyponatremia", "nephro", {
        s: "Focal deficit จาก metabolic",
        ix: ["Glucose, Na"],
        link: "ams"
      }),
      N("PRES", "nephro", {
        s: "Visual loss, seizure, focal sign",
        ix: ["MRI FLAIR"],
        link: "headache"
      }),
      N("Todd paralysis / CNS infection / tumor", "adj", {
        s: "Post-ictal deficit, abscess, PTLD ใน CNS",
        ix: ["MRI, EEG, LP"],
        link: "seizure"
      })
    ])
  ])
};

/* ===================== BACK PAIN ===================== */
TREES.backpain = {
  must: [
    "Red flags: อายุ > 50, cancer history, น้ำหนักลด, night pain, fever, neurological deficit, saddle anesthesia",
    "Anemia, hypercalcemia, Cr สูง, ปัสสาวะเป็นฟอง (myeloma)",
    "HD catheter bacteremia, IVDU, fever (spinal infection)",
    "Flank pain ร้าวไปขาหนีบ, hematuria (stone, renal)",
    "Leg edema, hydronephrosis ทั้งสองข้าง (retroperitoneal fibrosis)",
    "Steroid ระยะยาว, osteoporosis, fracture",
    "Inflammatory back pain: อายุ < 40, morning stiffness, ดีขึ้นเมื่อขยับ",
    "Dialysis vintage (destructive spondyloarthropathy)"
  ],
  tree: N("Back pain", "root", {
    s: "คัด red flags ก่อน แล้วแยก malignant, infectious, metabolic bone, retroperitoneal และ referred renal pain",
    why: "Back pain เป็นทางเข้าของ myeloma, retroperitoneal fibrosis (IgG4-RD), spinal TB, renal osteodystrophy และ referred pain จากไต",
    keys: ["Red flags", "Spine tenderness vs flank tenderness", "Neurological deficit", "Hydronephrosis"],
    ix: ["CBC, ESR, CRP, Ca, Cr, ALP, SPEP, sFLC", "UA microscopy", "X-ray spine, MRI ถ้ามี red flag", "US kidney หรือ CT abdomen"],
    std: "ACP 2017 low back pain guideline"
  }, [
    N("Malignant", "step", {
      s: "Night pain, weight loss, อายุมาก",
      keys: ["Vertebral collapse", "Hypercalcemia"]
    }, [
      N("Multiple myeloma", "nephro", {
        s: "Back pain, vertebral fracture, anemia, Cr สูง",
        why: "Cast nephropathy เป็น AKI ที่ต้องลด light chain เร็ว",
        keys: ["Bone scan มักลบ", "Globulin gap, low anion gap (ไม่มีใน light chain myeloma จึงต้องตรวจ sFLC)"],
        ix: ["SPEP, IFE, sFLC, whole-body low-dose CT, bone marrow"],
        std: "IMWG 2014",
        link: "mspike"
      }),
      N("Vertebral metastasis / lymphoma", "adj", {
        s: "Breast, prostate, lung, kidney, thyroid",
        why: "RCC metastasis และ cord compression",
        ix: ["MRI whole spine, PSA, CT"],
        link: "bonepain"
      })
    ]),
    N("Infectious", "step", {
      s: "Fever, ESR สูง, risk bacteremia",
      keys: ["HD catheter", "Immunosuppression", "TB endemic"]
    }, [
      N("Pyogenic spondylodiscitis / epidural abscess", "nephro", {
        s: "Back pain กับไข้ (ไข้พบเพียงราวครึ่งหนึ่ง) เสี่ยงสูงใน HD ที่มี S. aureus bacteremia",
        why: "Metastatic infection จาก CRBSI",
        ix: ["MRI with contrast, blood culture, CT-guided biopsy"],
        std: "IDSA 2015 native vertebral osteomyelitis",
        link: "hd-fever"
      }),
      N("Spinal TB (Pott disease)", "nephro", {
        s: "Thoracolumbar, gibbus, paraspinal abscess",
        why: "พบบ่อยขึ้นใน CKD และ KT, renal TB ร่วมได้",
        ix: ["MRI, biopsy: Xpert, culture, histology"],
        link: "fever"
      }),
      N("Brucella / melioidosis", "adj", {
        s: "Spondylitis จากเชื้อเฉพาะถิ่น",
        ix: ["Culture, serology"]
      })
    ]),
    N("Retroperitoneal", "step", {
      s: "Dull back or flank pain กับ hydronephrosis",
      keys: ["Bilateral hydronephrosis", "ESR สูง", "Medial deviation ของ ureter"]
    }, [
      N("Retroperitoneal fibrosis / IgG4-related disease", "nephro", {
        s: "Back pain, bilateral obstructive uropathy, ESR สูง, leg edema",
        why: "ราวครึ่งหนึ่งของ idiopathic RPF เป็น IgG4-related, ตอบสนองต่อ steroid",
        keys: ["Periaortic soft tissue mass", "Varicocele, DVT จาก venous compression"],
        ix: ["CT หรือ MRI abdomen, PET/CT", "Serum IgG4, ESR, CRP", "Biopsy ถ้า atypical เพื่อตัด lymphoma"],
        std: "2019 ACR/EULAR IgG4-RD",
        link: "oliguria"
      }),
      N("Aortic aneurysm / dissection", "nephro", {
        s: "Back pain กับ pulsatile mass หรือ AKI",
        why: "Inflammatory AAA ทำให้ ureteric obstruction",
        ix: ["CTA aorta"],
        link: "chestpain"
      }),
      N("Retroperitoneal hemorrhage / psoas abscess", "nephro", {
        s: "Retroperitoneal hemorrhage: back pain กับ Hb ลดหลัง femoral catheterization หรือ anticoagulant, psoas abscess: ไข้และปวดเมื่อ extend hip",
        why: "Spontaneous bleed ใน uremia ที่ได้ heparin",
        ix: ["CT abdomen"],
        link: "bleeding"
      }),
      N("Pancreatitis / pancreatic cancer", "adj", {
        s: "Epigastric pain ร้าวหลัง",
        ix: ["Lipase, CT"],
        link: "abdpain"
      })
    ]),
    N("Metabolic bone", "step", {
      s: "Fragility fracture หรือ diffuse pain",
      keys: ["Osteoporosis", "CKD-MBD", "Long dialysis vintage"]
    }, [
      N("Osteoporotic vertebral fracture / renal osteodystrophy", "nephro", {
        s: "Acute back pain หลัง minimal trauma",
        why: "Steroid ใน GN และ KT, CKD-MBD",
        ix: ["X-ray, DXA, PTH, ALP"],
        std: "KDIGO 2017 CKD-MBD",
        link: "bonepain"
      }),
      N("Destructive spondyloarthropathy (dialysis amyloid)", "nephro", {
        s: "Cervical หรือ lumbar disc destruction ใน dialysis นาน",
        why: "Beta-2 microglobulin amyloid เลียนแบบ spondylodiscitis",
        ix: ["MRI (T2 ต่ำ ต่างจาก infection), biopsy"],
        link: "bonepain"
      }),
      N("Osteomalacia", "nephro", {
        s: "Diffuse bone pain, pseudofracture",
        ix: ["PO4, ALP, 25-OH D, FGF23"],
        link: "bonepain"
      })
    ]),
    N("Referred renal / urologic", "step", {
      s: "Costovertebral angle tenderness, ไม่ใช่ spine tenderness",
      keys: ["Hematuria", "Fever", "Colic"]
    }, [
      N("Nephrolithiasis / obstruction", "nephro", {
        s: "Colicky flank pain ร้าวลงขาหนีบ",
        ix: ["Non-contrast CT KUB"],
        std: "AUA 2014 kidney stone guideline",
        link: "stone"
      }),
      N("Pyelonephritis / renal abscess", "nephro", {
        s: "Fever flank pain",
        ix: ["Urine culture, CT"],
        link: "flank"
      }),
      N("ADPKD cyst complication / renal infarct / RVT", "nephro", {
        s: "Acute flank pain กับ hematuria หรือ LDH สูง",
        ix: ["CT, MRI"],
        link: "flank"
      })
    ]),
    N("Inflammatory / mechanical", "step", {
      s: "ไม่มี red flag",
      keys: ["Inflammatory back pain features"]
    }, [
      N("Axial spondyloarthritis", "nephro", {
        s: "Inflammatory back pain, uveitis, IBD",
        why: "ไตที่เกี่ยวข้อง: IgAN, AA amyloid และ NSAID nephropathy",
        ix: ["HLA-B27, MRI sacroiliac joint"],
        std: "ASAS 2009",
        link: "arthralgia"
      }),
      N("Mechanical low back pain", "adj", {
        s: "Non-specific, ส่วนใหญ่ดีขึ้นใน 4-6 สัปดาห์",
        why: "NSAID ใน CKD เป็นจุดที่ต้องให้คำแนะนำ",
        ix: ["ไม่ต้อง imaging ถ้าไม่มี red flag"],
        std: "ACP 2017"
      })
    ])
  ])
};

/* ===================== LYMPHADENOPATHY ===================== */
TREES.lymphnode = {
  must: [
    "Localized หรือ generalized, ขนาด (> 1 cm, supraclavicular ผิดปกติทุกขนาด), กดเจ็บ, แข็ง",
    "ระยะเวลา > 4-6 สัปดาห์",
    "Fever, night sweats, weight loss (B symptoms)",
    "Infection exposure: TB contact, HIV risk, cat scratch, travel",
    "Rash, arthralgia, sicca, hilar node",
    "KT: EBV status, induction, เวลาหลังปลูกถ่าย",
    "ยา: phenytoin, allopurinol (DRESS)",
    "Proteinuria, edema, Cr ขึ้น, organomegaly"
  ],
  tree: N("Lymphadenopathy", "root", {
    s: "แยก localized กับ generalized แล้วไล่ infection, malignancy, autoimmune, granulomatous และ drug โดยเน้นโรคที่มี kidney involvement",
    why: "Lymphadenopathy ร่วมกับ kidney disease ต้องคิดถึง lymphoma (minimal change disease, MN, kidney infiltration), Castleman disease, IgG4-RD, sarcoidosis, SLE, TB, HIV และ PTLD",
    keys: ["Size, consistency, tenderness", "Supraclavicular = high risk malignancy", "Hepatosplenomegaly", "B symptoms"],
    ix: ["CBC, smear, LDH, ESR, CRP", "HIV, EBV, CMV, VDRL, IGRA", "ANA, C3, C4, IgG4, ACE, Ca", "UA, UPCR", "CT neck-chest-abdomen หรือ PET/CT", "Excisional biopsy (FNA ไม่พอสำหรับ lymphoma)"],
    std: "Lugano 2014 classification"
  }, [
    N("Malignancy", "step", {
      s: "Hard, fixed, painless, progressive",
      keys: ["LDH สูง", "B symptoms"]
    }, [
      N("Lymphoma", "nephro", {
        s: "Painless lymphadenopathy",
        why: "Hodgkin lymphoma สัมพันธ์กับ minimal change disease, NHL สัมพันธ์กับ MN, MPGN, cryoglobulinemic GN และ kidney infiltration, ทั้งสองกลุ่มเสี่ยง TLS หลังเริ่มการรักษา",
        keys: ["Nephrotic ที่มี lymphadenopathy", "Bilateral nephromegaly"],
        ix: ["Excisional biopsy, PET/CT, bone marrow"],
        std: "Lugano 2014",
        link: "fever"
      }),
      N("CLL / small lymphocytic lymphoma", "nephro", {
        s: "Lymphocytosis กับ generalized node",
        why: "Kidney lesion ที่พบ: MPGN, cryoglobulinemic GN, MN และ kidney infiltration",
        ix: ["Flow cytometry"],
        link: "cytopenia"
      }),
      N("Metastatic carcinoma", "adj", {
        s: "Localized hard node",
        why: "Paraneoplastic MN",
        ix: ["Biopsy, CT"],
        link: "weightloss"
      })
    ]),
    N("Lymphoproliferative / immune", "step", {
      s: "Generalized node กับ systemic inflammation",
      keys: ["Polyclonal hypergammaglobulinemia", "Anasarca"]
    }, [
      N("Idiopathic multicentric Castleman / TAFRO", "nephro", {
        s: "Thrombocytopenia, anasarca, fever, renal dysfunction, organomegaly",
        why: "TMA-like และ MPGN-like lesion, IL-6 driven",
        ix: ["Lymph node biopsy, IL-6, HHV-8"],
        std: "iMCD consensus 2017, TAFRO criteria 2019",
        link: "fever"
      }),
      N("IgG4-related disease", "nephro", {
        s: "Lymphadenopathy กับ pancreas, salivary, kidney involvement",
        ix: ["Serum IgG4, biopsy"],
        std: "2019 ACR/EULAR IgG4-RD",
        link: "sicca"
      }),
      N("SLE", "nephro", {
        s: "Generalized lymphadenopathy ใน active SLE",
        ix: ["ANA, anti-dsDNA, C3, C4"],
        link: "rpgn"
      }),
      N("Kikuchi disease", "adj", {
        s: "Tender cervical node, fever ในหญิงอายุน้อย",
        why: "สัมพันธ์กับ SLE",
        ix: ["Excisional biopsy"]
      })
    ]),
    N("Granulomatous", "step", {
      s: "Hilar หรือ mediastinal node",
      keys: ["Hypercalcemia", "Caseation"]
    }, [
      N("Sarcoidosis", "nephro", {
        s: "Bilateral hilar lymphadenopathy",
        ix: ["Ca, 1,25D, EBUS-TBNA"],
        std: "ATS 2020",
        link: "hyperca"
      }),
      N("Tuberculous lymphadenitis", "nephro", {
        s: "Cervical node, matted, caseation",
        why: "Extrapulmonary TB พบบ่อยขึ้นใน CKD, dialysis และ KT",
        ix: ["FNA Xpert, culture, histology"],
        link: "fever"
      })
    ]),
    N("Infection", "step", {
      s: "Tender node หรือ generalized กับ viral illness",
      keys: ["HIV", "EBV", "Syphilis"]
    }, [
      N("HIV", "nephro", {
        s: "Generalized lymphadenopathy",
        why: "Kidney lesion: HIVAN, HIV immune complex kidney disease, HIV-TMA และ ART nephrotoxicity",
        ix: ["HIV Ag/Ab, viral load, CD4"],
        link: "viral"
      }),
      N("Secondary syphilis", "nephro", {
        s: "Generalized node, palmoplantar rash",
        why: "Kidney lesion: MN (พบบ่อยที่สุด) และ minimal change disease",
        ix: ["VDRL, TPHA"],
        link: "rash"
      }),
      N("EBV / CMV / toxoplasma", "adj", {
        s: "Mononucleosis syndrome",
        why: "EBV ทำให้ AIN และ HLH",
        ix: ["Serology, PCR"]
      }),
      N("Scrub typhus / melioidosis / cat scratch", "adj", {
        s: "Regional node ใกล้ eschar หรือ inoculation site",
        ix: ["Serology, culture"],
        link: "fever"
      })
    ]),
    N("Transplant / drug", "step", {
      s: "Node ใน KT หรือหลังได้ยา",
      keys: ["EBV mismatch", "DRESS"]
    }, [
      N("Post-transplant lymphoproliferative disorder", "nephro", {
        s: "Node, graft mass, GI หรือ CNS lesion ใน KT",
        why: "Risk factor: EBV D+/R- และ T-cell depleting induction, การรักษาขั้นแรกคือลด immunosuppression",
        ix: ["EBV DNA PCR (ผลลบไม่ตัด PTLD ออก โดยเฉพาะ late EBV-negative PTLD), PET/CT, biopsy"],
        std: "WHO PTLD classification, BSH 2021 PTLD guideline",
        link: "kt-fever"
      }),
      N("DRESS / phenytoin pseudolymphoma", "nephro", {
        s: "Lymphadenopathy กับ rash, eosinophilia, AIN, hepatitis",
        ix: ["RegiSCAR score"],
        link: "fever"
      }),
      N("Serum sickness (ATG, rituximab)", "nephro", {
        s: "Fever, rash, arthralgia, lymphadenopathy 7-14 วันหลัง ATG",
        ix: ["Low C3, C4"]
      })
    ])
  ])
};

/* ===================== CUSHINGOID FEATURES ===================== */
TREES.cushingoid = {
  must: [
    "Steroid ทุกรูปแบบ: oral, injection, inhaled, topical, ยาสมุนไพร ยาลูกกลอน",
    "Striae กว้าง > 1 cm สีม่วง, easy bruising, proximal weakness (ถ้ามีจำเพาะกว่า)",
    "HTN ใหม่หรือดื้อยา, hypokalemia",
    "Glucose intolerance, osteoporosis, fracture",
    "Hyperpigmentation, rapid onset, weight loss (ectopic ACTH)",
    "Alcohol, depression, obesity (pseudo-Cushing)",
    "Ritonavir หรือ cobicistat กับ inhaled fluticasone",
    "Cushingoid ใน KT ที่ได้ prednisolone"
  ],
  tree: N("Cushingoid features", "root", {
    s: "ตัด exogenous glucocorticoid ก่อน แล้วยืนยัน hypercortisolism ด้วย screening test 2 ใน 3 แล้วแยก ACTH-dependent กับ independent",
    why: "Cushing ทำให้ HTN, hypokalemic alkalosis, DM, osteoporosis และ nephrolithiasis และ exogenous steroid ใน GN หรือ KT เป็นสาเหตุที่พบบ่อยที่สุด",
    keys: ["Discriminating features: purple striae, proximal myopathy, easy bruising, facial plethora", "Hypokalemia รุนแรง: ectopic ACTH", "CKD ทำให้ screening test แปลผลยาก"],
    ix: ["1 mg overnight DST (cortisol > 1.8 µg/dL ผิดปกติ)", "Late-night salivary cortisol x2", "24-hour urine free cortisol (ต่ำลวงเมื่อ eGFR < 60)", "ACTH", "MRI pituitary, CT adrenal, IPSS"],
    std: "Endocrine Society 2008 Cushing diagnosis guideline, Pituitary Society 2021 consensus"
  }, [
    N("Exogenous glucocorticoid", "step", {
      s: "สาเหตุที่พบบ่อยที่สุด",
      keys: ["ACTH และ cortisol ต่ำ (ยกเว้นผู้ที่ได้ hydrocortisone ซึ่งคือ cortisol เอง และ prednisolone ที่ cross-react กับ cortisol immunoassay ทำให้ค่า cortisol ไม่ต่ำ)", "Risk adrenal insufficiency เมื่อหยุด"]
    }, [
      N("Prescribed steroid in GN, LN, KT", "nephro", {
        s: "Prednisolone ระยะยาว",
        why: "Reduced-dose glucocorticoid ลด toxicity: PEXIVAS (n = 704) reduced-dose non-inferior และ serious infection ปีแรกน้อยกว่า, TESTING (n = 503) low-dose 0.4 mg/kg/วัน มี serious adverse event น้อยกว่า full-dose แต่ยังมากกว่า placebo",
        keys: ["Infection, PTDM, osteoporosis, AVN"],
        ix: ["Glucose, DXA, BP"],
        std: "PEXIVAS (NEJM 2020), TESTING (JAMA 2022)",
        link: "bonepain"
      }),
      N("Hidden steroid: ยาสมุนไพร, ยาลูกกลอน, injection", "nephro", {
        s: "Cushingoid โดยไม่ได้รับ steroid จากแพทย์",
        why: "พบบ่อยในไทย และทำให้ adrenal crisis เมื่อหยุด, ยาสมุนไพรบางชนิดมี NSAID และ heavy metal ด้วย",
        ix: ["Morning cortisol ต่ำ, ตรวจยาที่ใช้"],
        link: "hypona"
      }),
      N("Drug interaction: ritonavir or cobicistat with fluticasone", "adj", {
        s: "Inhaled หรือ intranasal steroid ที่ระดับสูงขึ้นจาก CYP3A4 inhibition",
        ix: ["Drug review"]
      })
    ]),
    N("ACTH-dependent", "step", {
      s: "ACTH ปกติหรือสูง",
      keys: ["Pituitary vs ectopic", "Hypokalemia severity"]
    }, [
      N("Cushing disease (pituitary)", "nephro", {
        s: "Gradual onset, female predominance",
        why: "HTN, nephrolithiasis และ glucose intolerance",
        ix: ["MRI pituitary, high-dose DST, CRH หรือ desmopressin test, IPSS"],
        std: "Pituitary Society 2021"
      }),
      N("Ectopic ACTH syndrome", "nephro", {
        s: "Rapid onset, severe hypokalemic metabolic alkalosis, edema, hyperpigmentation, weight loss",
        why: "Cortisol สูงมากเกิน 11-beta-HSD2 capacity ทำให้ mineralocorticoid effect, สาเหตุได้แก่ SCLC, carcinoid, MTC และ pheochromocytoma",
        keys: ["K มักต่ำกว่า 3.0 mmol/L", "อาจไม่มี classic Cushingoid appearance เมื่อโรคดำเนินเร็ว (เช่น SCLC) ส่วน carcinoid มักมีครบ"],
        ix: ["ACTH สูงมาก, CT chest-abdomen, 68Ga-DOTATATE PET"],
        link: "metalk"
      })
    ]),
    N("ACTH-independent (adrenal)", "step", {
      s: "ACTH ถูก suppress",
      keys: ["Adrenal mass", "Androgen excess"]
    }, [
      N("Adrenal adenoma / mild autonomous cortisol secretion", "nephro", {
        s: "Incidentaloma ที่ cortisol หลัง 1 mg DST > 1.8 µg/dL โดยไม่มี overt Cushing features",
        why: "MACS สัมพันธ์กับ HTN, DM และ CV event",
        ix: ["CT adrenal (HU < 10 = lipid-rich adenoma), DHEAS"],
        std: "ESE/ENSAT 2023 adrenal incidentaloma guideline",
        link: "htn-young"
      }),
      N("Adrenocortical carcinoma", "adj", {
        s: "Rapid Cushing กับ virilization",
        ix: ["CT: mass > 4 cm, HU > 20, DHEAS สูง"]
      }),
      N("Bilateral macronodular / PPNAD (Carney)", "adj", {
        s: "Bilateral adrenal disease",
        ix: ["CT, genetic testing"]
      })
    ]),
    N("Pseudo-Cushing / mimics", "step", {
      s: "Hypercortisolism ที่ไม่ใช่ Cushing syndrome",
      keys: ["Alcohol", "Depression", "Obesity", "CKD"]
    }, [
      N("CKD and dialysis effect on testing", "nephro", {
        s: "Cortisol clearance ลด, UFC ต่ำลวง, DST false positive",
        why: "ใน ESKD ใช้ 1 mg DST หรือ late-night salivary cortisol แต่แปลผลระวัง",
        ix: ["Late-night salivary cortisol, DST"]
      }),
      N("Alcohol / depression / obesity / PCOS", "adj", {
        s: "Physiologic hypercortisolism",
        ix: ["DST-CRH หรือ desmopressin test, ติดตามหลังหยุด alcohol"],
        link: "obesity"
      }),
      N("Cyclosporine / HIV lipodystrophy / Cushingoid look of nephrotic", "nephro", {
        s: "Moon face จาก fluid หรือ fat redistribution",
        ix: ["Clinical"],
        link: "nephrotic"
      })
    ])
  ])
};

/* ===================== PAROXYSMAL HEADACHE / SWEATING / PALPITATIONS ===================== */
TREES.paroxysm = {
  must: [
    "Triad: episodic headache, sweating, palpitation (มีครบสาม specificity สูง)",
    "BP ขณะมีอาการและระหว่างอาการ, orthostatic hypotension",
    "Trigger: ยา (metoclopramide, glucocorticoid, beta-blocker ก่อน alpha), anesthesia, ปัสสาวะ (bladder paraganglioma)",
    "Family history: MEN2, VHL, NF1, SDH (paraganglioma)",
    "Glucose ขณะมีอาการ, insulin, sulfonylurea",
    "Weight loss, tremor, heat intolerance",
    "Sympathomimetic, cocaine, amphetamine, clonidine withdrawal, MAOI",
    "Anxiety, panic, ไม่มี BP สูงจริง"
  ],
  tree: N("Paroxysmal headache, sweating and palpitations", "root", {
    s: "วัด BP และ glucose ขณะมีอาการ แล้วตัด pheochromocytoma ด้วย plasma free metanephrine",
    why: "Paroxysmal HTN เป็นทางเข้าของ pheochromocytoma และ secondary HTN และ VHL ทำให้ทั้ง pheochromocytoma และ RCC กับ renal cysts",
    keys: ["Paroxysmal HTN vs sustained", "Glucose ขณะมีอาการ", "Hereditary syndrome features"],
    ix: ["Plasma free metanephrine (ท่านอน 30 นาที) หรือ 24-hour urine fractionated metanephrines", "TSH, glucose", "CT หรือ MRI adrenal ถ้า biochemistry บวก", "Genetic testing ในทุก PPGL"],
    std: "Endocrine Society 2014 pheochromocytoma guideline"
  }, [
    N("Catecholamine excess", "step", {
      s: "Metanephrines สูง",
      keys: ["> 3 เท่า ULN เกือบยืนยัน", "Borderline: ซ้ำหรือ clonidine suppression test"]
    }, [
      N("Pheochromocytoma / paraganglioma", "nephro", {
        s: "Paroxysmal HTN, headache, sweating, palpitation",
        why: "Hereditary ราว 30-40% (VHL, MEN2, NF1, SDHx), renal artery stenosis จาก compression, และ catecholamine cardiomyopathy",
        keys: ["Normetanephrine เด่น: VHL, SDH", "Metanephrine เด่น: MEN2, NF1"],
        ix: ["Plasma free metanephrine", "CT หรือ MRI, 68Ga-DOTATATE PET", "Genetic testing"],
        std: "Endocrine Society 2014, PRESSOR (n = 134) phenoxybenzamine เทียบกับ doxazosin ไม่ต่างกันใน primary endpoint (เวลาที่ BP อยู่นอก target ระหว่างผ่าตัด)"
      }),
      N("Von Hippel-Lindau disease", "nephro", {
        s: "Pheochromocytoma, clear cell RCC, renal และ pancreatic cyst, hemangioblastoma",
        why: "RCC หลายจุดทั้งสองข้าง ต้องเฝ้าระวังด้วย imaging, belzutifan รักษา VHL-RCC",
        ix: ["VHL genetic testing, MRI abdomen, brain และ spine"],
        link: "cysts"
      }),
      N("MEN2 / NF1", "adj", {
        s: "Pheochromocytoma กับ medullary thyroid cancer หรือ neurofibroma",
        why: "NF1 ทำให้ renal artery stenosis และ HTN ในเด็ก",
        ix: ["Calcitonin, RET, clinical NF1"],
        link: "htn-young"
      })
    ]),
    N("CKD-related false positive", "step", {
      s: "Metanephrine สูงเล็กน้อยโดยไม่มี PPGL จาก CKD หรือจากยา",
      keys: ["Plasma free metanephrine แม่นกว่า urine ใน CKD", "สูงไม่ถึง 3 เท่าของ ULN ให้ทบทวนยาและตรวจซ้ำก่อน imaging"]
    }, [
      N("Metanephrine interpretation in CKD / dialysis", "nephro", {
        s: "Plasma normetanephrine สูงขึ้นเล็กน้อยใน ESKD",
        why: "Urine metanephrine ใช้ไม่ได้ใน anuria, ใช้ plasma free metanephrine กับ reference ที่ปรับตาม CKD",
        ix: ["Plasma free metanephrine, ซ้ำหรือ clonidine test"]
      }),
      N("Drug interference: TCA, SNRI, levodopa, sympathomimetic", "adj", {
        s: "False positive จากยา",
        ix: ["Drug review, หยุดยาก่อนตรวจซ้ำ"]
      })
    ]),
    N("Endocrine / metabolic mimics", "step", {
      s: "Metanephrine ปกติ",
      keys: ["Glucose", "Thyroid", "Menopause"]
    }, [
      N("Hypoglycemia", "nephro", {
        s: "Adrenergic symptoms กับ glucose < 70 mg/dL",
        why: "Insulin และ sulfonylurea สะสมใน CKD, insulinoma",
        ix: ["Glucose, insulin, C-peptide ขณะมีอาการ"]
      }),
      N("Thyrotoxicosis", "adj", {
        s: "Sustained tachycardia, tremor, weight loss",
        ix: ["TSH, FT4"],
        link: "palpitation"
      }),
      N("Carcinoid / mastocytosis / menopause", "adj", {
        s: "Flushing episodes",
        ix: ["5-HIAA, tryptase, FSH"]
      })
    ]),
    N("Drug and withdrawal", "step", {
      s: "Sympathetic surge จากยา",
      keys: ["Clonidine withdrawal", "Stimulant"]
    }, [
      N("Clonidine or beta-blocker withdrawal", "nephro", {
        s: "Rebound HTN และ tachycardia หลังหยุด clonidine หรือ beta-blocker กะทันหัน",
        why: "พบในผู้ป่วย CKD ที่ได้ยาลดความดันหลายชนิดแล้วขาดยา",
        ix: ["Drug history"],
        link: "htn-emerg"
      }),
      N("Cocaine / amphetamine / MAOI with tyramine", "adj", {
        s: "Hyperadrenergic crisis",
        ix: ["Urine toxicology"]
      })
    ]),
    N("Neurologic / psychiatric", "step", {
      s: "Paroxysm ที่ไม่มี BP สูงจริง",
      keys: ["Anxiety", "Autonomic dysfunction"]
    }, [
      N("Panic disorder", "adj", {
        s: "Fear, hyperventilation, perioral tingling",
        ix: ["Diagnosis of exclusion"]
      }),
      N("Baroreflex failure / autonomic seizure / PRES", "nephro", {
        s: "Baroreflex failure: labile HTN หลัง neck irradiation หรือ carotid surgery, PRES: จาก hypertensive emergency, CNI, eclampsia หรือ cytotoxic drug",
        ix: ["Autonomic testing, MRI"],
        link: "headache"
      })
    ])
  ])
};

/* ===================== OBESITY / METABOLIC SYNDROME ===================== */
TREES.obesity = {
  must: [
    "BMI และ waist circumference (Asian cutoff: ชาย ≥ 90 cm, หญิง ≥ 80 cm)",
    "Weight trajectory, onset (rapid gain ให้คิด endocrine)",
    "Snoring, daytime sleepiness, witnessed apnea",
    "DM, HTN, dyslipidemia, gout, NAFLD",
    "Proteinuria ที่พบโดยบังเอิญ, edema น้อยเมื่อเทียบกับ proteinuria",
    "Striae ม่วง, proximal weakness, hypokalemia (Cushing)",
    "Cold intolerance, constipation (hypothyroid)",
    "ยา: steroid, antipsychotic, insulin, sulfonylurea, TZD"
  ],
  tree: N("Obesity / metabolic syndrome", "root", {
    s: "หา secondary obesity ก่อน แล้วประเมิน kidney consequences (ORG, DKD, stone, HTN) และ comorbidity ที่กระทบไต",
    why: "Obesity ทำให้ glomerular hyperfiltration, ORG, DKD, uric acid และ calcium oxalate stone, OSA กับ resistant HTN และเป็นอุปสรรคต่อ KT",
    keys: ["BMI ≥ 25 kg/m2 ในคนเอเชีย = obesity", "Proteinuria โดยไม่มี full nephrotic syndrome", "Resistant HTN", "Secondary causes"],
    ix: ["Glucose, HbA1c, lipid, urate, LFT", "UACR, UPCR, eGFR (ใช้ eGFRcr-cys เมื่อ body habitus ผิดปกติ เพราะ creatinine และ cystatin C ต่างถูกรบกวนจาก muscle และ fat mass)", "TSH, 1 mg DST ตาม clue", "STOP-BANG, polysomnography", "Kidney biopsy ถ้า proteinuria มากหรือ hematuria"],
    std: "WHO Asia-Pacific BMI classification, KDIGO 2024 CKD"
  }, [
    N("Kidney consequences", "step", {
      s: "Obesity-related kidney disease",
      keys: ["Hyperfiltration", "Proteinuria", "Stone"]
    }, [
      N("Obesity-related glomerulopathy", "nephro", {
        s: "Subnephrotic หรือ nephrotic-range proteinuria โดย albumin มักปกติ edema น้อย",
        why: "Glomerulomegaly กับ perihilar FSGS (secondary FSGS, adaptive) ตอบสนองต่อ weight loss และ RAASi",
        keys: ["Serum albumin ปกติแม้ proteinuria > 3.5 g", "Podocyte foot process effacement เป็น segmental"],
        ix: ["Kidney biopsy: glomerulomegaly, perihilar FSGS, partial effacement"],
        std: "KDIGO 2021 GN (adaptive FSGS), Columbia classification",
        link: "proteinuria"
      }),
      N("Diabetic kidney disease", "nephro", {
        s: "Albuminuria กับ T2DM",
        why: "SGLT2i และ GLP-1 RA ลด risk ของ kidney outcome, FLOW (n = 3,533) semaglutide HR 0.76 (95% CI 0.66-0.88)",
        ix: ["UACR, eGFR, retinopathy"],
        std: "KDIGO 2022 diabetes in CKD, FLOW (NEJM 2024)",
        link: "proteinuria"
      }),
      N("Nephrolithiasis", "nephro", {
        s: "Uric acid stone (urine pH ต่ำ) และ calcium oxalate",
        why: "Insulin resistance ลด ammoniagenesis ทำให้ urine pH ต่ำ และหลัง RYGB เกิด enteric hyperoxaluria",
        ix: ["24-hour urine profile, stone analysis"],
        link: "stone"
      }),
      N("Hyperfiltration and CKD progression", "nephro", {
        s: "Obesity เป็น independent risk factor ของ CKD",
        ix: ["eGFRcr-cys"]
      })
    ]),
    N("Secondary obesity", "step", {
      s: "Endocrine หรือ drug-induced",
      keys: ["Rapid gain", "Specific features"]
    }, [
      N("Cushing syndrome", "nephro", {
        s: "Central obesity กับ purple striae, proximal myopathy",
        ix: ["1 mg DST, late-night salivary cortisol"],
        link: "cushingoid"
      }),
      N("Hypothyroidism", "adj", {
        s: "Weight gain, fatigue, Cr สูงเล็กน้อย",
        why: "Hypothyroidism ลด GFR และเพิ่ม Cr แบบ reversible",
        ix: ["TSH"]
      }),
      N("Drug-induced: steroid, antipsychotic, insulin, TZD", "nephro", {
        s: "Weight gain จากยา",
        why: "Steroid หลัง KT ทำให้ weight gain และ PTDM",
        ix: ["Drug review"]
      }),
      N("Hypothalamic / genetic (Bardet-Biedl, Alstrom)", "nephro", {
        s: "Early-onset obesity, polydactyly, retinal dystrophy, CKD",
        why: "Ciliopathy ทำให้ cystic kidney disease และ CKD",
        ix: ["Genetic testing, kidney US"],
        link: "cysts"
      })
    ]),
    N("Cardiometabolic comorbidity", "step", {
      s: "สิ่งที่กระทบไตและการรักษา",
      keys: ["HTN", "OSA", "NAFLD"]
    }, [
      N("OSA and resistant HTN", "nephro", {
        s: "Snoring, nocturnal HTN, non-dipping",
        why: "OSA เพิ่ม aldosterone และ sympathetic tone, primary aldosteronism พบร่วมบ่อย",
        ix: ["Polysomnography, ABPM, aldosterone-renin ratio"],
        std: "ESH 2023",
        link: "htn-young"
      }),
      N("Metabolic dysfunction-associated steatotic liver disease", "adj", {
        s: "ALT สูง, steatosis",
        why: "MASLD สัมพันธ์กับ CKD อิสระจาก DM",
        ix: ["FIB-4, elastography"]
      }),
      N("Gout / hyperuricemia", "nephro", {
        s: "Insulin resistance ลด urate excretion",
        ix: ["Urate"],
        link: "arthralgia"
      })
    ]),
    N("Obesity in dialysis and transplant", "step", {
      s: "Obesity paradox และ transplant candidacy",
      keys: ["BMI ใช้แยก fat กับ muscle ไม่ได้"]
    }, [
      N("Transplant candidacy and outcomes", "nephro", {
        s: "BMI สูงเพิ่ม wound complication, DGF และ PTDM",
        why: "หลาย center กำหนด BMI cutoff และ bariatric surgery หรือ GLP-1 RA ก่อน KT เป็นทางเลือก",
        ix: ["BMI, waist, body composition"],
        std: "KDIGO 2020 kidney transplant candidate guideline",
        link: "donor"
      }),
      N("Sarcopenic obesity / obesity paradox in HD", "nephro", {
        s: "BMI สูงสัมพันธ์กับ survival ที่ดีกว่าใน HD (ข้อมูล observational ไม่ใช่เหตุผลให้เพิ่มน้ำหนัก) แต่ sarcopenic obesity มี outcome แย่",
        ix: ["BIA, handgrip"],
        link: "wasting"
      })
    ])
  ])
};

/* ===================== MUSCLE WASTING / FRAILTY ===================== */
TREES.wasting = {
  must: [
    "Muscle loss ที่ไหน (proximal, generalized), ช้าหรือเร็ว",
    "Weight loss, appetite, intake (โปรตีน, พลังงาน)",
    "Dialysis adequacy, inflammation, ติดเชื้อซ้ำ",
    "Steroid, statin, colchicine, zidovudine",
    "Endocrine: thyroid, hypogonadism, DM ควบคุมไม่ดี",
    "Falls, gait speed, ADL",
    "Rash, dysphagia (myositis)",
    "Malignancy, TB, HIV symptoms"
  ],
  tree: N("Muscle wasting / frailty", "root", {
    s: "แยก sarcopenia, cachexia และ myopathy แล้วหาตัวขับใน CKD (PEW, acidosis, inflammation, inactivity)",
    why: "Sarcopenia และ PEW พบบ่อยใน CKD และ dialysis และเป็น predictor ของ mortality, falls และ KT outcome",
    keys: ["Muscle strength (grip) ก่อน mass", "Weakness vs wasting", "CK", "Inflammation markers"],
    ix: ["Handgrip, gait speed, chair stand", "BIA หรือ DXA (ASM/ht2)", "Albumin, prealbumin, CRP, HCO3", "CK, TSH, testosterone, 25-OH D", "nPCR, Kt/V"],
    std: "AWGS 2019 sarcopenia, ISRNM 2008 PEW, Fried frailty phenotype"
  }, [
    N("CKD-specific wasting", "step", {
      s: "PEW และ uremic myopathy",
      keys: ["Albumin ต่ำ", "Intake ลด", "Inflammation"]
    }, [
      N("Protein-energy wasting", "nephro", {
        s: "Loss of body protein และ energy stores",
        why: "ISRNM ต้องมี ≥ 3 ใน 4 กลุ่ม (biochemistry, body mass, muscle mass, intake)",
        keys: ["Albumin < 3.8 g/dL", "BMI < 23", "Muscle mass ลด 5% ใน 3 เดือน", "DPI < 0.8 g/kg/วันใน dialysis"],
        ix: ["SGA 7-point, MIS, nPCR"],
        std: "ISRNM 2008, KDOQI 2020 nutrition",
        link: "weightloss"
      }),
      N("Metabolic acidosis", "nephro", {
        s: "Muscle proteolysis ผ่าน ubiquitin-proteasome",
        ix: ["Venous HCO3"],
        std: "KDIGO 2024 CKD",
        link: "nagma"
      }),
      N("Uremic myopathy / vitamin D deficiency", "nephro", {
        s: "Proximal weakness ใน CKD G5",
        why: "Vitamin D deficiency, hyperparathyroidism และ carnitine deficiency",
        ix: ["25-OH D, PTH, CK มักปกติ"],
        link: "weakness"
      }),
      N("Inflammation / dialysis-related", "nephro", {
        s: "Chronic inflammation จาก access, bioincompatibility, periodontitis",
        ix: ["CRP, IL-6, access infection"]
      }),
      N("Inappropriate protein restriction", "nephro", {
        s: "Very low protein diet โดยไม่ได้ติดตาม nutrition",
        why: "KDOQI 2020 แนะนำ 0.55-0.6 g/kg/วัน เฉพาะ CKD 3-5 ที่ไม่มี DM และ metabolically stable ภายใต้การดูแลของนักโภชนาการ (ถ้ามี DM ใช้ 0.6-0.8) ส่วน KDIGO 2024 แนะนำ protein intake 0.8 g/kg/วัน และให้พิจารณา protein target สูงขึ้นในผู้สูงอายุที่มี frailty หรือ sarcopenia",
        ix: ["Dietary recall, urea nitrogen appearance"],
        std: "KDOQI 2020 nutrition, KDIGO 2024 CKD"
      })
    ]),
    N("Drug / endocrine myopathy", "step", {
      s: "Weakness กับ wasting ที่แก้ได้",
      keys: ["Steroid", "Thyroid", "Hypogonadism"]
    }, [
      N("Glucocorticoid myopathy", "nephro", {
        s: "Proximal weakness, CK ปกติ ใน prednisolone ระยะยาว",
        why: "พบบ่อยใน GN, LN และ KT, fluorinated steroid เสี่ยงกว่า",
        ix: ["CK ปกติ, EMG อาจปกติ"],
        link: "cushingoid"
      }),
      N("Statin / colchicine myopathy", "nephro", {
        s: "Myopathy จากยาที่สะสมใน CKD หรือ drug interaction กับ CNI",
        ix: ["CK, drug review"],
        link: "myalgia"
      }),
      N("Thyroid / hypogonadism / GH deficiency", "adj", {
        s: "Endocrine sarcopenia",
        why: "Hypogonadism พบบ่อยในชาย CKD และ dialysis",
        ix: ["TSH, testosterone, LH"]
      })
    ]),
    N("Cachexia from systemic disease", "step", {
      s: "Wasting กับ weight loss และ inflammation",
      keys: ["Malignancy", "Infection", "Heart failure"]
    }, [
      N("Malignancy / paraprotein (AL amyloid)", "nephro", {
        s: "Cancer cachexia, AL amyloid myopathy (pseudohypertrophy)",
        ix: ["sFLC, IFE, imaging"],
        link: "mspike"
      }),
      N("Chronic infection: TB, HIV", "nephro", {
        s: "Wasting syndrome",
        ix: ["IGRA, CXR, HIV"],
        link: "fever"
      }),
      N("Cardiac cachexia / COPD", "adj", {
        s: "Advanced HF หรือ lung disease",
        ix: ["Echo, PFT"]
      })
    ]),
    N("Primary neuromuscular", "step", {
      s: "Wasting จาก nerve หรือ muscle disease",
      keys: ["Fasciculation", "Rash", "Distribution"]
    }, [
      N("Inflammatory myopathy", "nephro", {
        s: "Proximal weakness, rash, ILD, CK สูง",
        ix: ["Myositis antibody, MRI, biopsy"],
        std: "EULAR/ACR 2017 IIM",
        link: "myalgia"
      }),
      N("Neuropathy: diabetic amyotrophy, CIDP, uremic", "nephro", {
        s: "Diabetic amyotrophy: proximal thigh wasting ร่วมกับปวดและน้ำหนักลด, CIDP และ uremic neuropathy: distal wasting เด่น",
        ix: ["NCS/EMG"],
        link: "numbness"
      }),
      N("Motor neuron disease / inclusion body myositis", "adj", {
        s: "Progressive wasting ในผู้สูงอายุ",
        ix: ["EMG, biopsy"]
      })
    ]),
    N("Age-related sarcopenia / frailty", "step", {
      s: "Sarcopenia โดยไม่มีสาเหตุเฉพาะ",
      keys: ["Elderly", "Inactivity"]
    }, [
      N("Sarcopenia (AWGS 2019)", "nephro", {
        s: "Low muscle mass ร่วมกับ low muscle strength หรือ low physical performance (ครบทั้งสามคือ severe sarcopenia)",
        why: "CKD เร่ง sarcopenia และ resistance exercise กับ adequate protein เป็นการรักษาหลัก",
        keys: ["Grip < 28 kg (ชาย), < 18 kg (หญิง)", "Gait speed < 1.0 m/s", "ASM/ht2 DXA < 7.0 (ชาย), < 5.4 (หญิง)"],
        ix: ["Handgrip, DXA หรือ BIA, SPPB"],
        std: "AWGS 2019",
        link: "elderly"
      }),
      N("Frailty in CKD", "nephro", {
        s: "Fried phenotype ≥ 3 ใน 5 (weight loss, exhaustion, low activity, slow gait, weak grip)",
        why: "Frailty ทำนาย mortality, hospitalization และ KT outcome",
        ix: ["Fried frailty phenotype, Clinical Frailty Scale"],
        std: "Fried 2001 frailty phenotype"
      })
    ])
  ])
};

/* ===================== TREMOR / ASTERIXIS ===================== */
TREES.tremor = {
  must: [
    "Rest, postural หรือ intention tremor, หรือ asterixis (negative myoclonus), myoclonus",
    "Onset สัมพันธ์กับยาใหม่หรือขนาดเพิ่ม",
    "Tacrolimus หรือ cyclosporine trough",
    "Lithium, valproate, beta-agonist, theophylline, amiodarone, SSRI",
    "Uremic symptoms, BUN, dialysis adequacy",
    "Liver disease, ammonia",
    "Weight loss, heat intolerance, palpitation",
    "Alcohol, family history ของ tremor"
  ],
  tree: N("Tremor / asterixis", "root", {
    s: "แยก tremor (rhythmic) กับ asterixis หรือ myoclonus (metabolic encephalopathy) แล้วหายาและ metabolic causes ก่อน neurologic",
    why: "Tremor ในผู้ป่วยไตต้องหาสาเหตุที่แก้ได้ก่อน ได้แก่ CNI toxicity, uremia, hypomagnesemia, lithium และยาที่สะสมเมื่อ eGFR ลด",
    keys: ["Postural fine tremor: drug, thyroid, enhanced physiologic", "Asterixis: uremia, liver, CO2 retention, drug", "Myoclonus: gabapentinoid, opioid, cefepime"],
    ix: ["CNI trough, lithium level", "BUN, Na, Ca, Mg, glucose, ammonia, blood gas", "TSH", "Drug review"],
    std: "MDS 2018 tremor classification"
  }, [
    N("Drug-induced", "step", {
      s: "Postural tremor หลังเริ่มหรือเพิ่มยา",
      keys: ["Drug level", "Temporal relation"]
    }, [
      N("Calcineurin inhibitor neurotoxicity", "nephro", {
        s: "Fine postural tremor, paresthesia, headache, insomnia ในผู้ที่ได้ tacrolimus หรือ cyclosporine (KT และ GN)",
        why: "พบใน tacrolimus มากกว่า cyclosporine, hypomagnesemia เพิ่ม risk, Envarsus (LCP-tacrolimus) ลด peak level และ tremor",
        keys: ["Tremor อาจเกิดแม้ระดับปกติ", "PRES เป็น severe end"],
        ix: ["Tacrolimus trough, Mg"],
        std: "KDIGO 2009 KT recipient care",
        link: "seizure"
      }),
      N("Lithium toxicity", "nephro", {
        s: "Coarse tremor, ataxia, confusion, nephrogenic DI",
        why: "Toxicity เพิ่มเมื่อ eGFR ลด, volume depletion, NSAID, ACEi, thiazide, HD เอา lithium ออกได้",
        keys: ["Level > 1.5 mEq/L ร่วมกับ neurologic sign", "Chronic toxicity เกิดได้ที่ level ไม่สูงมาก"],
        ix: ["Lithium level, Cr, urine osmolality"],
        std: "EXTRIP 2015 lithium: แนะนำ HD เมื่อ level > 4.0 mEq/L ร่วมกับ impaired kidney function หรือเมื่อมี decreased consciousness, seizure หรือ life-threatening dysrhythmia ไม่ว่า level เท่าใด",
        link: "thirst"
      }),
      N("Beta-agonist / theophylline / valproate / amiodarone / SSRI", "adj", {
        s: "Enhanced physiologic tremor จากยา",
        ix: ["Drug level, review"]
      })
    ]),
    N("Metabolic", "step", {
      s: "Asterixis หรือ tremor จาก metabolic derangement",
      keys: ["BUN", "Mg", "Glucose"]
    }, [
      N("Uremic asterixis / myoclonus", "nephro", {
        s: "Asterixis, multifocal myoclonus ใน CKD G5",
        why: "เป็นอาการของ uremic encephalopathy ซึ่งเป็นข้อบ่งชี้ของ dialysis หลังตัดสาเหตุอื่นของ asterixis (ยา, hepatic encephalopathy, CO2 retention)",
        ix: ["BUN, EEG"],
        link: "ams"
      }),
      N("Hypomagnesemia / hypocalcemia", "nephro", {
        s: "Tremor, tetany, hyperreflexia",
        ix: ["Mg, ionized Ca"],
        link: "mg"
      }),
      N("Hypoglycemia / thyrotoxicosis", "nephro", {
        s: "Adrenergic tremor",
        why: "Insulin และ sulfonylurea สะสมใน CKD",
        ix: ["Glucose, TSH"],
        link: "paroxysm"
      }),
      N("Hepatic encephalopathy / hypercapnia", "adj", {
        s: "Asterixis กับ liver disease หรือ CO2 retention",
        ix: ["Ammonia, ABG"],
        link: "jaundice"
      })
    ]),
    N("Drug accumulation causing myoclonus", "step", {
      s: "Myoclonus หรือ asterixis จากยาที่ขับทางไต",
      keys: ["เริ่มยาใหม่", "ไม่ได้ปรับขนาด"]
    }, [
      N("Gabapentin / pregabalin / opioid / baclofen", "nephro", {
        s: "Myoclonus, somnolence",
        ix: ["Drug review"],
        link: "ams"
      }),
      N("Cefepime / acyclovir / metoclopramide", "nephro", {
        s: "Neurotoxicity ใน CKD",
        ix: ["EEG, drug review"],
        link: "ams"
      })
    ]),
    N("Neurologic", "step", {
      s: "Tremor ที่ไม่มี drug หรือ metabolic cause",
      keys: ["Rest tremor", "Family history", "Cerebellar sign"]
    }, [
      N("Essential tremor / Parkinson disease", "adj", {
        s: "Postural และ kinetic tremor หรือ rest tremor กับ bradykinesia",
        why: "Primidone (และ metabolite phenobarbital) สะสมเมื่อ eGFR ลดจึงต้องลดขนาด ส่วน propranolol ขับทางตับ ไม่ต้องปรับตาม eGFR",
        ix: ["Clinical, DaTscan ถ้าจำเป็น"]
      }),
      N("Wilson disease", "nephro", {
        s: "Tremor (wing-beating), liver disease, Fanconi syndrome ในคนอายุน้อย",
        ix: ["Ceruloplasmin, 24-h urine copper, Kayser-Fleischer ring"],
        std: "EASL 2025 Wilson disease guideline",
        link: "bonepain"
      }),
      N("Cerebellar: alcohol, lithium, stroke, PML", "nephro", {
        s: "Intention tremor",
        ix: ["MRI"],
        link: "stroke"
      }),
      N("Fragile X tremor ataxia / Fabry / mitochondrial", "adj", {
        s: "Genetic tremor syndromes",
        ix: ["Genetic testing"],
        link: "hearing"
      })
    ])
  ])
};

/* ===================== RESTLESS LEGS / INSOMNIA ===================== */
TREES.rls = {
  must: [
    "Urge to move ขา, แย่ลงตอนเย็นกลางคืน, ดีขึ้นเมื่อขยับ, เกิดขณะนั่งพักหรือนอน",
    "ระหว่างฟอก (ทำให้ต้องเลิกฟอกก่อนเวลา)",
    "Ferritin, TSAT, Hb",
    "Neuropathy, cramp, PAD",
    "Snoring, apnea, daytime sleepiness",
    "ยา: antidepressant (SSRI, TCA, mirtazapine), antihistamine, antipsychotic, metoclopramide",
    "Pruritus, pain, nocturia, depression",
    "Dialysis shift timing, caffeine"
  ],
  tree: N("Restless legs / insomnia", "root", {
    s: "วินิจฉัย RLS ด้วย 5 essential criteria แล้วหาตัวขับใน CKD (iron, uremia, drug) และแยก sleep disorders อื่น",
    why: "RLS พบใน dialysis ราว 20-30% และ sleep disturbance สัมพันธ์กับ mortality, depression และ quality of life",
    keys: ["IRLSSG 5 criteria", "Iron status", "OSA symptoms", "Drug list"],
    ix: ["Ferritin, TSAT, CBC", "BUN, Ca, PO4, PTH, Kt/V", "Polysomnography ถ้าสงสัย OSA หรือ PLMD", "IRLS severity scale"],
    std: "IRLSSG 2014 diagnostic criteria, IRLSSG 2018 iron treatment guideline"
  }, [
    N("Restless legs syndrome in CKD", "step", {
      s: "Secondary RLS",
      keys: ["Iron", "Uremia", "Drug"]
    }, [
      N("Iron deficiency", "nephro", {
        s: "Brain iron deficiency แม้ serum ferritin ไม่ต่ำมาก",
        why: "IV iron sucrose เมื่อ ferritin < 200 ng/mL และ TSAT < 20% ใน ESKD (AASM 2025), ส่วน ferritin < 300 และ TSAT < 45% เป็นเกณฑ์ IV FCM ในผู้ใหญ่ทั่วไป (IRLSSG 2018)",
        ix: ["Ferritin, TSAT"],
        std: "IRLSSG 2018 iron guideline",
        link: "cytopenia"
      }),
      N("Uremic RLS", "nephro", {
        s: "RLS ที่ดีขึ้นหลัง KT",
        why: "Gabapentin ขนาดต่ำหลังฟอกได้ผล (ปรับตาม eGFR ระวัง somnolence และ myoclonus) ส่วน dopamine agonist ต้องลดขนาดและเสี่ยง augmentation จึงไม่ใช่ตัวเลือกแรก",
        ix: ["Kt/V, BUN"],
        std: "AASM 2025 RLS guideline (Winkelman, JCSM 2025) (แนะนำ gabapentinoid และ IV iron มากกว่า dopamine agonist)"
      }),
      N("Drug-induced / exacerbated RLS", "nephro", {
        s: "SSRI, TCA, mirtazapine, antihistamine, antipsychotic, metoclopramide",
        ix: ["Drug review"]
      })
    ]),
    N("RLS mimics", "step", {
      s: "Leg discomfort ที่ไม่ใช่ RLS",
      keys: ["Cramp", "Neuropathy", "Positional"]
    }, [
      N("Uremic or diabetic neuropathy", "nephro", {
        s: "Burning feet ตลอดวัน ไม่สัมพันธ์กับการขยับ",
        ix: ["NCS"],
        link: "numbness"
      }),
      N("Nocturnal leg cramp", "nephro", {
        s: "Painful muscle contraction",
        ix: ["Mg, Ca, K"],
        link: "cramps"
      }),
      N("PAD / venous insufficiency / positional discomfort", "adj", {
        s: "Claudication หรือ heaviness",
        ix: ["TBI, venous duplex"],
        link: "bluetoe"
      }),
      N("Akathisia", "adj", {
        s: "Inner restlessness ทั้งตัวจาก antipsychotic",
        ix: ["Drug history"]
      })
    ]),
    N("Other sleep disorders in CKD", "step", {
      s: "Insomnia หรือ daytime sleepiness",
      keys: ["Apnea", "Nocturia", "Pruritus"]
    }, [
      N("Obstructive and central sleep apnea", "nephro", {
        s: "Snoring, apnea, resistant HTN",
        why: "Fluid overload ทำ rostral shift และ OSA แย่ลง, central apnea จาก acidosis และ HF",
        ix: ["STOP-BANG, polysomnography"],
        std: "AASM 2017 OSA diagnosis guideline",
        link: "obesity"
      }),
      N("Periodic limb movement disorder", "nephro", {
        s: "Repetitive leg jerks ระหว่างหลับ พบร่วมกับ RLS",
        ix: ["Polysomnography: PLM index"]
      }),
      N("Pruritus / pain / nocturia", "nephro", {
        s: "Symptom-driven insomnia",
        ix: ["WI-NRS, symptom assessment"],
        link: "pruritus"
      }),
      N("Depression / anxiety", "adj", {
        s: "Insomnia กับ low mood",
        why: "Depression พบบ่อยใน dialysis และทำนาย mortality",
        ix: ["PHQ-9"]
      }),
      N("Melatonin dysregulation / dialysis timing", "nephro", {
        s: "Circadian disruption จาก dialysis shift",
        ix: ["Sleep diary"]
      })
    ])
  ])
};

/* ===================== SHORT STATURE / SKELETAL DEFORMITY ===================== */
TREES.shortstature = {
  must: [
    "ส่วนสูงเทียบ mid-parental height, growth chart ในวัยเด็ก",
    "ขาโก่ง, rickets, fracture ตอนเด็ก, ปัญหาฟัน",
    "Polyuria, polydipsia, salt craving, dehydration ตอนเด็ก",
    "Childhood-onset CKD, dialysis หรือ KT ตอนเด็ก, steroid",
    "Family history: consanguinity, tubulopathy, rickets",
    "Photophobia (cystinosis), hearing loss (dRTA), eye problems",
    "Kidney stones, nephrocalcinosis",
    "Pubertal delay"
  ],
  tree: N("Short stature / skeletal deformity", "root", {
    s: "แยก proportionate กับ disproportionate แล้วใช้ Ca, PO4, ALP, PTH, acid-base และ urine studies หา tubulopathy หรือ CKD ตั้งแต่เด็ก",
    why: "Short stature กับ rickets ในผู้ใหญ่เป็นร่องรอยของ inherited tubulopathy (Fanconi, cystinosis, dRTA, Bartter), XLH และ childhood CKD",
    keys: ["Rickets features: bowing, widened wrist, rachitic rosary", "Acid-base", "PO4 และ TmP/GFR", "Polyuria ตั้งแต่เด็ก"],
    ix: ["Ca, PO4, Mg, ALP, PTH, 25-OH D, 1,25D", "VBG, K, urine pH, UAG", "Urine glucose, amino acid, beta-2 microglobulin", "TmP/GFR, urine Ca/Cr", "X-ray, kidney US (nephrocalcinosis)", "Genetic panel"],
    std: "Global consensus 2016 rickets, ERKNet tubulopathy guidance"
  }, [
    N("Hypophosphatemic rickets", "step", {
      s: "PO4 ต่ำ ALP สูง",
      keys: ["FGF23 สูง: XLH, ADHR, ARHR", "Hypercalciuria: HHRH"]
    }, [
      N("X-linked hypophosphatemia", "nephro", {
        s: "Bowing, short stature, dental abscess, enthesopathy",
        why: "PHEX mutation, การรักษาด้วย phosphate และ calcitriol เสี่ยง nephrocalcinosis และ tertiary HPT, burosumab ดีกว่า conventional therapy ในเด็ก (Imel 2019 Lancet, n = 61)",
        ix: ["FGF23, TmP/GFR, PHEX"],
        std: "International XLH guideline 2025",
        link: "phos"
      }),
      N("Hereditary hypophosphatemic rickets with hypercalciuria", "nephro", {
        s: "Rickets, nephrolithiasis, 1,25D สูง",
        why: "SLC34A3 (NaPi-IIc), รักษาด้วย phosphate อย่างเดียว ไม่ให้ calcitriol เพราะ 1,25D สูงอยู่แล้วและจะเพิ่ม hypercalciuria",
        ix: ["Urine Ca, 1,25D, FGF23 ต่ำ"],
        link: "stone"
      })
    ]),
    N("Inherited tubulopathy", "step", {
      s: "Growth failure จาก acidosis, salt wasting หรือ phosphate wasting",
      keys: ["Polyuria", "Acidosis", "Hypokalemia"]
    }, [
      N("Nephropathic cystinosis", "nephro", {
        s: "Fanconi syndrome ใน infancy, growth failure, photophobia, ESKD ใน 10 ปีแรกถ้าไม่รักษา",
        why: "CTNS mutation, cysteamine ชะลอโรค, โรคไม่ recur ใน graft หลัง KT แต่ extrarenal involvement ยังดำเนินต่อจึงต้องให้ cysteamine ต่อ",
        keys: ["Corneal cystine crystals", "Hypothyroidism"],
        ix: ["Leukocyte cystine level, slit lamp, CTNS"],
        link: "nagma"
      }),
      N("Distal RTA (inherited)", "nephro", {
        s: "Growth failure, nephrocalcinosis, rickets, hypokalemia ± SNHL",
        why: "Alkali therapy แก้ growth ได้ถ้าเริ่มเร็ว",
        ix: ["Urine pH, UAG, SLC4A1, ATP6V1B1, ATP6V0A4"],
        std: "ERKNet/ESPN 2021 dRTA consensus",
        link: "hearing"
      }),
      N("Bartter syndrome", "nephro", {
        s: "Polyhydramnios, prematurity, polyuria, growth failure, hypokalemic alkalosis, hypercalciuria",
        ix: ["Urine Cl, Ca, genetic testing"],
        link: "metalk"
      }),
      N("Dent disease / Lowe syndrome", "nephro", {
        s: "LMW proteinuria, hypercalciuria, nephrocalcinosis, rickets ในชาย",
        why: "CLCN5 (Dent 1), OCRL (Dent 2, Lowe: cataract, intellectual disability)",
        ix: ["Urine beta-2 microglobulin, Ca, genetic testing"],
        link: "proteinuria"
      }),
      N("Nephrogenic DI (congenital)", "nephro", {
        s: "Polyuria, dehydration, growth failure ตั้งแต่เกิด",
        ix: ["Urine osmolality, AVPR2, AQP2"],
        link: "thirst"
      })
    ]),
    N("Childhood-onset CKD", "step", {
      s: "Growth failure จาก CKD-MBD, acidosis, malnutrition และ GH resistance",
      keys: ["CAKUT", "Ciliopathy", "Glomerular disease ในเด็ก"]
    }, [
      N("CAKUT / reflux nephropathy", "nephro", {
        s: "Small kidneys, recurrent UTI ตอนเด็ก",
        why: "สาเหตุที่พบบ่อยที่สุดของ CKD ในเด็ก",
        ix: ["Kidney US, VCUG, DMSA"],
        link: "kidneysize"
      }),
      N("Nephronophthisis / ciliopathy", "nephro", {
        s: "Polyuria, anemia, small or normal kidneys with corticomedullary cysts, ESKD ในวัยรุ่น",
        why: "Retinal dystrophy (Senior-Loken), liver fibrosis",
        ix: ["Genetic panel NPHP"],
        link: "cysts"
      }),
      N("Renal osteodystrophy / steroid in childhood", "nephro", {
        s: "Growth retardation จาก high-turnover bone disease และ steroid",
        ix: ["PTH, ALP, bone age"],
        link: "bonepain"
      })
    ]),
    N("Syndromic / skeletal dysplasia", "step", {
      s: "Disproportionate short stature หรือ dysmorphic features",
      keys: ["Skeletal survey", "Syndrome features"]
    }, [
      N("Schimke immuno-osseous dysplasia", "nephro", {
        s: "Spondyloepiphyseal dysplasia, steroid-resistant FSGS, T-cell deficiency",
        ix: ["SMARCAL1"],
        link: "nephrotic"
      }),
      N("Turner syndrome", "nephro", {
        s: "Short stature, horseshoe kidney, HTN, coarctation",
        ix: ["Karyotype, kidney US"]
      }),
      N("Nail-patella / Galloway-Mowat / MIDD", "nephro", {
        s: "Syndromic nephropathy กับ skeletal หรือ growth abnormality (MIDD ในที่นี้คือ maternally inherited diabetes and deafness ไม่ใช่ monoclonal Ig deposition disease)",
        ix: ["Genetic testing"],
        link: "rash"
      }),
      N("Hypophosphatasia / osteogenesis imperfecta", "adj", {
        s: "Fracture และ deformity ตั้งแต่เด็ก",
        why: "Hypophosphatasia (ALP ต่ำ) ทำให้ hypercalciuria และ nephrocalcinosis",
        ix: ["ALP, PLP, COL1A1"],
        link: "bonepain"
      })
    ]),
    N("Endocrine / nutritional", "step", {
      s: "Proportionate short stature ไม่มี kidney phenotype",
      keys: ["GH", "Thyroid", "Celiac"]
    }, [
      N("GH deficiency / hypothyroidism / Cushing", "adj", {
        s: "Endocrine growth failure",
        ix: ["IGF-1, TSH, cortisol"]
      }),
      N("Nutritional rickets / celiac / chronic disease", "adj", {
        s: "Vitamin D deficiency, malabsorption",
        ix: ["25-OH D, anti-tTG"],
        link: "diarrhea"
      })
    ])
  ])
};

/* ===================== ANEMIA / CYTOPENIAS ===================== */
TREES.cytopenia = {
  must: [
    "Hb trend, onset, อาการ (เหนื่อย ใจสั่น angina)",
    "Bleeding: GI (melena), ประจำเดือน, access, blood loss จากการเจาะเลือดและ dialyzer",
    "ESA dose และการตอบสนอง, iron ที่ได้, ferritin และ TSAT ล่าสุด",
    "Infection, inflammation, access infection, hyperparathyroidism",
    "ยา: MMF, azathioprine (กับ allopurinol), valganciclovir, TMP-SMX, ACEi/ARB, linezolid, chemotherapy",
    "Jaundice, dark urine (hemolysis), thalassemia หรือ G6PD ในครอบครัว",
    "Bone pain, Cr สูง, hypercalcemia (myeloma)",
    "Splenomegaly, liver disease, lymphadenopathy"
  ],
  tree: N("Anemia and cytopenias", "root", {
    s: "ดูว่าเป็น single lineage หรือ multilineage แล้วใช้ MCV, reticulocyte index และ smear แยก production, destruction และ loss ก่อนสรุปว่าเป็น CKD anemia",
    why: "CKD anemia เป็น diagnosis of exclusion และ ESA hyporesponsiveness เป็นคำถามที่ examiner ชอบถาม ส่วน cytopenia ร่วมกับโรคไตต้องคิดถึง TMA, SLE, myeloma, HLH และ drug toxicity (พบบ่อยใน KT แต่ไม่จำกัดเฉพาะ KT)",
    keys: ["Anemia ใน CKD เมื่อ Hb < 13 (ชาย) หรือ < 12 g/dL (หญิง)", "Reticulocyte ต่ำ: production, สูง: hemolysis หรือ bleeding", "Multilineage: marrow, hypersplenism, SLE, HLH, drug", "ESA hyporesponsiveness: ต้องใช้ ESA ขนาดสูงโดย Hb ไม่ถึงเป้า"],
    ix: ["CBC, reticulocyte, smear, MCV", "Ferritin, TSAT, B12, folate", "LDH, haptoglobin, bilirubin, DAT", "PTH, CRP, Al ตามข้อบ่งชี้", "SPEP, sFLC, Hb typing", "Bone marrow ถ้า multilineage หรือไม่อธิบายได้"],
    std: "KDIGO 2026 anemia in CKD guideline"
  }, [
    N("Hypoproliferative: CKD-related", "step", {
      s: "Normocytic, reticulocyte ต่ำ, CKD G3b ขึ้นไป",
      keys: ["Relative EPO deficiency", "Hepcidin สูง", "Iron-restricted erythropoiesis"]
    }, [
      N("Anemia of CKD", "nephro", {
        s: "EPO deficiency กับ inflammation",
        why: "KDIGO 2026: หลังแก้สาเหตุที่แก้ได้ เริ่ม ESA เมื่อ Hb ≤ 9.0-10.0 g/dL ใน dialysis และที่ Hb 8.5-10.0 g/dL ใน non-dialysis CKD โดยตัดสินตามอาการและ risk รายบุคคล และคุม Hb ให้ต่ำกว่า 11.5 g/dL เพราะ target ราว 13 เพิ่ม event: TREAT (n = 4,038) stroke HR 1.92 และ CHOIR (n = 1,432) composite CV event เพิ่ม, แนะนำ ESA เป็น first-line มากกว่า HIF-PHI",
        ix: ["Hb, reticulocyte, ตัดสาเหตุอื่น"],
        std: "KDIGO 2026 anemia, TREAT (NEJM 2009), CHOIR (NEJM 2006)"
      }),
      N("Iron deficiency (absolute or functional)", "nephro", {
        s: "Systemic iron deficiency (เดิมเรียก absolute): TSAT < 20% ร่วมกับ ferritin < 100 ng/mL (non-dialysis, PD) หรือ < 200 ng/mL (HD), iron-restricted erythropoiesis (เดิมเรียก functional): TSAT < 20% โดย ferritin สูงกว่าเกณฑ์นี้",
        why: "PIVOTAL (n = 2,141) proactive high-dose IV iron ลด ESA dose และ composite ของ death, MI, stroke, HF hospitalization ใน HD (HR 0.85, 95% CI 0.73-1.00)",
        keys: ["เกณฑ์เริ่ม iron ตาม KDIGO 2026 กว้างกว่านิยาม deficiency: HD เมื่อ ferritin ≤ 500 ng/mL และ TSAT ≤ 30%, non-dialysis และ PD เมื่อ ferritin < 100 และ TSAT < 40% หรือ ferritin 100-299 และ TSAT < 25%", "Absolute iron deficiency ต้องหา blood loss โดยเฉพาะ GI (ใน HD มี obligatory loss จากการฟอกร่วมด้วย)"],
        ix: ["Ferritin, TSAT, reticulocyte Hb content"],
        std: "KDIGO 2026 anemia, PIVOTAL (NEJM 2019)",
        link: "gibleed"
      }),
      N("ESA hyporesponsiveness", "nephro", {
        s: "Hb ไม่ขึ้นแม้ ESA ขนาดสูง",
        why: "Iron deficiency, inflammation หรือ infection, inadequate dialysis, severe HPT, aluminum, B12 หรือ folate, hemoglobinopathy, ACEi, pure red cell aplasia (anti-EPO antibody)",
        keys: ["PRCA: Hb ลดเร็ว reticulocyte < 10,000/µL"],
        ix: ["Iron, CRP, PTH, Kt/V, B12, folate, Al, Hb typing, anti-EPO antibody, bone marrow"],
        link: "hd-mbd"
      })
    ]),
    N("Hypoproliferative: marrow and nutrient", "step", {
      s: "Reticulocyte ต่ำ ร่วมกับ MCV ผิดปกติหรือ cytopenia อื่น",
      keys: ["Microcytic", "Macrocytic", "Multilineage"]
    }, [
      N("Thalassemia trait / hemoglobinopathy", "nephro", {
        s: "Microcytosis ไม่สมกับ iron status พบบ่อยในไทย",
        why: "ESA response ต่ำกว่า และทำให้เข้าใจผิดว่าเป็น iron deficiency",
        ix: ["Hb typing, Mentzer index"]
      }),
      N("B12 / folate deficiency", "nephro", {
        s: "Macrocytic anemia",
        why: "B12 ต่ำจาก metformin และ PPI ระยะยาว, folate สูญเสียระหว่างฟอก",
        ix: ["B12, MMA, folate"]
      }),
      N("Myeloma / marrow infiltration", "nephro", {
        s: "Anemia ไม่สมกับ CKD stage, rouleaux, globulin สูง",
        ix: ["SPEP, sFLC, bone marrow"],
        link: "mspike"
      }),
      N("Drug-induced marrow suppression", "nephro", {
        s: "MMF, azathioprine (โดยเฉพาะร่วมกับ allopurinol หรือ febuxostat), valganciclovir, TMP-SMX, linezolid, cyclophosphamide",
        why: "NUDT15 variant พบบ่อยในคนเอเชีย (TPMT variant พบน้อยกว่า) ทำให้ azathioprine toxicity",
        ix: ["Drug review, TPMT, NUDT15, CMV PCR"]
      }),
      N("Parvovirus B19 PRCA in KT", "nephro", {
        s: "Severe anemia reticulocyte ต่ำมาก ใน KT",
        why: "รักษาด้วยการลด immunosuppression ร่วมกับ IVIG, parvovirus B19 ยังสัมพันธ์กับ collapsing FSGS",
        ix: ["Parvovirus B19 PCR, bone marrow: giant pronormoblast"],
        link: "kt-late"
      }),
      N("Hypothyroidism / aluminum / copper deficiency", "adj", {
        s: "Uncommon causes",
        why: "Copper deficiency จาก zinc excess หรือ bariatric surgery ทำ anemia และ neutropenia",
        ix: ["TSH, Al, copper, ceruloplasmin"]
      })
    ]),
    N("Hemolysis", "step", {
      s: "Reticulocyte สูง, LDH สูง, haptoglobin ต่ำ",
      keys: ["DAT", "Schistocyte", "Bite cell"]
    }, [
      N("Microangiopathic hemolytic anemia", "nephro", {
        s: "Schistocyte กับ thrombocytopenia",
        ix: ["Smear, ADAMTS13"],
        link: "tma"
      }),
      N("Autoimmune hemolytic anemia", "nephro", {
        s: "DAT บวก",
        why: "สาเหตุ: SLE, CLL และ lymphoma, ยา, post-transplant (passenger lymphocyte)",
        ix: ["DAT (IgG vs C3d), ANA"],
        link: "rpgn"
      }),
      N("G6PD / PNH / thalassemia / malaria", "nephro", {
        s: "Intravascular หรือ chronic hemolysis",
        ix: ["G6PD, flow cytometry, Hb typing, blood film"],
        link: "pigmenturia"
      }),
      N("Dialysis-associated hemolysis", "nephro", {
        s: "Chloramine, copper, formaldehyde ในน้ำ, dialysate overheated หรือ hypotonic, kinked bloodline",
        why: "เกี่ยวกับมาตรฐานคุณภาพน้ำ dialysis และอาจเกิดหลายรายพร้อมกันในหน่วยไตเทียม",
        ix: ["Water quality testing, check bloodline"],
        std: "ISO 23500 dialysis water quality"
      })
    ]),
    N("Multilineage cytopenia", "step", {
      s: "Anemia กับ leukopenia หรือ thrombocytopenia",
      keys: ["Splenomegaly", "Systemic inflammation", "Drug"]
    }, [
      N("SLE", "nephro", {
        s: "Leukopenia, lymphopenia, thrombocytopenia, AIHA",
        ix: ["ANA, anti-dsDNA, C3, C4"],
        std: "EULAR/ACR 2019 SLE (hematologic domain)",
        link: "rpgn"
      }),
      N("HLH / MAS", "nephro", {
        s: "Fever, ferritin สูงมาก, splenomegaly",
        ix: ["HLH-2004, HScore"],
        link: "fever"
      }),
      N("Hypersplenism", "adj", {
        s: "Cirrhosis, lymphoma, thalassemia",
        ix: ["US spleen"],
        link: "abdomen"
      }),
      N("Infection in KT: CMV, EBV, parvovirus", "nephro", {
        s: "Leukopenia กับไข้หลัง KT",
        ix: ["CMV QNAT, EBV PCR"],
        link: "kt-fever"
      }),
      N("Primary marrow disease: MDS, aplastic anemia, leukemia", "adj", {
        s: "Dysplasia หรือ blast",
        ix: ["Bone marrow"]
      })
    ]),
    N("Blood loss", "step", {
      s: "Iron deficiency จาก blood loss เรื้อรัง โดย reticulocyte ขึ้นได้เมื่อ iron ยังพอ",
      keys: ["GI", "Dialysis-related loss"]
    }, [
      N("GI bleeding", "nephro", {
        s: "Angiodysplasia, PUD, malignancy",
        ix: ["EGD, colonoscopy, capsule"],
        link: "gibleed"
      }),
      N("Dialysis-related blood loss", "nephro", {
        s: "Dialyzer clotting, phlebotomy, access bleeding",
        why: "HD สูญเสียเหล็กราว 1-2 g ต่อปี",
        ix: ["Review dialysis records"],
        link: "hd-bleed"
      }),
      N("Hematuria / menstrual loss", "adj", {
        s: "Urologic หรือ gynecologic loss",
        ix: ["UA, gynecologic evaluation"],
        link: "hematuria"
      })
    ])
  ])
};

/* ===================== ABNORMAL LIVER CHEMISTRY / RAISED ALP ===================== */
TREES.alp = {
  must: [
    "ALP สูงอย่างเดียว หรือร่วมกับ AST, ALT, GGT, bilirubin",
    "Bone pain, fracture, CKD stage, PTH, vitamin D",
    "ยา: allopurinol, TMP-SMX, azathioprine, statin, antituberculous, amoxicillin-clavulanate, herbal",
    "HBV, HCV, alcohol, fatty liver",
    "Hepatomegaly, macroglossia, nephrotic (amyloid)",
    "HF, hypotension (congestive หรือ ischemic hepatopathy)",
    "Pregnancy (placental ALP)",
    "Weight loss, lymphadenopathy, fever"
  ],
  tree: N("Abnormal liver chemistry and raised ALP", "root", {
    s: "ใช้ GGT หรือ bone-specific ALP แยก bone กับ liver ALP แล้วใช้ pattern (hepatocellular, cholestatic, infiltrative) หาสาเหตุ",
    why: "ALP สูงในคลินิกไตมักเป็น bone (CKD-MBD, osteomalacia, PHPT) แต่ถ้าเป็น liver ALP ต้องคิด AL amyloid, sarcoid, drug และ hepatitis ที่สัมพันธ์กับ GN",
    keys: ["GGT สูงร่วม: สนับสนุน liver ALP แต่ไม่ยืนยัน (GGT สูงได้จาก alcohol, ยา, obesity และ bone กับ liver source เกิดร่วมกันได้)", "GGT ปกติ: bone, placenta, intestine", "ALP สูงมาก ร่วมกับ hepatomegaly โดย bilirubin ปกติ: infiltrative", "R ratio (ALT/ULN หารด้วย ALP/ULN) ≥ 5 hepatocellular, ≤ 2 cholestatic, ระหว่าง 2 ถึง 5 mixed", "ALP ต่ำผิดปกติเป็นอีกโจทย์หนึ่ง: adynamic bone (bone-specific ALP ต่ำร่วมกับ PTH ต่ำ), hypophosphatasia, Wilson fulminant hepatitis, malnutrition หรือ zinc deficiency ดู bone pain tree"],
    ix: ["GGT, bone-specific ALP หรือ ALP isoenzyme", "AST, ALT, bilirubin, albumin, INR", "PTH, Ca, PO4, 25-OH D", "US abdomen, HBV, HCV", "sFLC, IFE ถ้า infiltrative"],
    std: "ACG 2017 abnormal liver chemistries guideline"
  }, [
    N("Bone ALP", "step", {
      s: "GGT ปกติ, bone-specific ALP สูง",
      keys: ["PTH", "PO4", "25-OH D"]
    }, [
      N("Secondary / tertiary hyperparathyroidism", "nephro", {
        s: "CKD G3a ถึง G5D หรือหลัง KT (persistent hyperparathyroidism)",
        why: "ALP ใช้ร่วมกับ PTH ประเมิน bone turnover ตาม KDIGO",
        ix: ["PTH, bone-specific ALP"],
        std: "KDIGO 2017 CKD-MBD",
        link: "hd-mbd"
      }),
      N("Osteomalacia", "nephro", {
        s: "Bone pain, proximal weakness ร่วมกับ PO4 ต่ำ หรือ 25-OH D ต่ำ (PO4 ปกติได้ใน vitamin D deficiency)",
        ix: ["PO4, TmP/GFR, FGF23, 25-OH D"],
        link: "bonepain"
      }),
      N("Primary hyperparathyroidism", "nephro", {
        s: "Hypercalcemia",
        ix: ["Ca, PTH"],
        link: "hyperca"
      }),
      N("Paget disease / metastasis / healing fracture", "adj", {
        s: "Focal bone lesion",
        ix: ["Bone scan"],
        link: "bonepain"
      }),
      N("Physiologic: growth, pregnancy (placental)", "adj", {
        s: "ALP สูงจาก source ปกติ",
        ix: ["ALP isoenzyme, pregnancy test"]
      })
    ]),
    N("Infiltrative liver disease", "step", {
      s: "ALP สูงมาก, hepatomegaly, bilirubin มักปกติ",
      keys: ["Amyloid", "Granuloma", "Malignancy"]
    }, [
      N("AL amyloidosis", "nephro", {
        s: "Hepatomegaly, ALP สูง, nephrotic, Howell-Jolly bodies (hyposplenism)",
        why: "Liver biopsy เสี่ยง bleeding ให้เริ่มจาก fat pad aspirate ร่วมกับ bone marrow biopsy (รวมกัน sensitivity ราว 85 ถึง 90%, negative ไม่ exclude) ถ้า negative จึง biopsy อวัยวะที่มีอาการ เช่น ไต",
        ix: ["sFLC, IFE, fat pad biopsy"],
        link: "mspike"
      }),
      N("Sarcoidosis / TB / granulomatous hepatitis", "nephro", {
        s: "Granulomatous liver กับ hypercalcemia หรือ TIN",
        ix: ["Ca, ACE, CT chest, liver biopsy"],
        link: "hyperca"
      }),
      N("Lymphoma / metastasis", "adj", {
        s: "Hepatic infiltration",
        ix: ["CT, PET/CT, biopsy"],
        link: "lymphnode"
      }),
      N("Polycystic liver disease", "nephro", {
        s: "ADPKD หรือ ADPLD, GGT และ ALP สูงเล็กน้อย",
        ix: ["MRI liver"],
        link: "cysts"
      })
    ]),
    N("Cholestatic", "step", {
      s: "ALP และ GGT สูง, bilirubin อาจสูง",
      keys: ["Duct dilatation", "Autoimmune markers", "Drug"]
    }, [
      N("Drug-induced cholestasis", "nephro", {
        s: "Amoxicillin-clavulanate, TMP-SMX, azathioprine, allopurinol (DRESS)",
        ix: ["RUCAM, drug review, eosinophil"],
        std: "ACG 2021 DILI",
        link: "fever"
      }),
      N("PBC / PSC / IgG4-sclerosing cholangitis", "nephro", {
        s: "Autoimmune cholestasis",
        why: "PBC สัมพันธ์กับ dRTA และ MN, IgG4-SC กับ IgG4-TIN",
        ix: ["AMA, MRCP, IgG4"],
        link: "sicca"
      }),
      N("Biliary obstruction", "adj", {
        s: "Stone, cholangiocarcinoma, pancreatic cancer",
        ix: ["US, MRCP"],
        link: "jaundice"
      }),
      N("Congestive hepatopathy", "nephro", {
        s: "Right HF, tricuspid regurgitation, constrictive pericarditis",
        why: "Cardiorenal ร่วมกับ congestive hepatopathy",
        ix: ["Echo, NT-proBNP"],
        link: "dyspnea"
      })
    ]),
    N("Hepatocellular", "step", {
      s: "AST และ ALT สูงเด่น",
      keys: ["Viral", "Ischemic", "Drug", "Muscle"]
    }, [
      N("Viral hepatitis flare (HBV reactivation)", "nephro", {
        s: "HBV reactivation หลัง rituximab, steroid หรือ KT",
        why: "Screen HBsAg และ anti-HBc ทุกรายก่อน immunosuppression, HBsAg บวกให้ antiviral prophylaxis ทุกราย, HBsAg ลบแต่ anti-HBc บวกให้ prophylaxis เมื่อได้ anti-CD20 ส่วน regimen อื่นเลือก prophylaxis หรือ monitor HBV DNA ตามระดับความเสี่ยง",
        ix: ["HBsAg, anti-HBc, HBV DNA, anti-HCV"],
        std: "AASLD 2018 HBV guidance",
        link: "viral"
      }),
      N("Ischemic hepatitis / CAPS", "nephro", {
        s: "AST และ ALT สูงมากหลัง shock หรือ thrombosis",
        why: "CAPS ทำให้ hepatic และ renal microthrombosis พร้อมกัน",
        ix: ["Lactate, echo, aPL"],
        link: "thrombosis"
      }),
      N("Rhabdomyolysis mimicking hepatitis", "nephro", {
        s: "AST > ALT กับ CK สูง",
        ix: ["CK"],
        link: "myalgia"
      }),
      N("MASLD / alcohol / herbal toxicity", "adj", {
        s: "Chronic mild transaminitis",
        why: "ยาสมุนไพรบางชนิดทำให้ทั้ง hepatitis และ AIN หรือ Fanconi",
        ix: ["US, FIB-4, herbal history"]
      })
    ])
  ])
};

/* ===================== MONOCLONAL GAMMOPATHY ===================== */
TREES.mspike = {
  must: [
    "M-protein ชนิดใด (IgG, IgA, IgM, light chain only), ปริมาณ, sFLC ratio",
    "CRAB: hypercalcemia, renal, anemia, bone pain หรือ fracture",
    "Nephrotic, macroglossia, orthostatic hypotension, carpal tunnel, periorbital purpura (AL)",
    "Neuropathy, organomegaly, skin change (POEMS)",
    "Purpura, Raynaud, acrocyanosis (cryo)",
    "Glycosuria, hypophosphatemia, hypouricemia (LCPT)",
    "Hyperviscosity: ตามัว, epistaxis, headache (IgM)",
    "อายุ, ประวัติ MGUS เดิม, recurrent infection"
  ],
  tree: N("Monoclonal gammopathy", "root", {
    s: "แยก myeloma หรือ lymphoproliferative disease ที่ต้องรักษาตามเกณฑ์ hematology, MGRS (clone เล็กแต่ทำให้ไตเสีย) และ MGUS ที่ไม่เกี่ยวกับไต โดยใช้ kidney biopsy เป็นตัวตัดสิน",
    why: "MGUS พบราว 3% ในคนอายุ > 50 จึงพบร่วมกับ CKD ได้บ่อยโดยไม่เกี่ยวกัน การ biopsy เท่านั้นที่ยืนยัน MGRS และเปลี่ยนการรักษาเป็น clone-directed",
    keys: ["sFLC kappa/lambda ratio ปกติ 0.26-1.65 (CKD ใช้ 0.37-3.1, ค่าของ Freelite assay)", "Involved sFLC > 1,500 mg/L สนับสนุน cast nephropathy, < 500 mg/L ไม่น่าใช่", "Dipstick ลบหรือ trace แต่ UPCR สูง: สงสัย light chain proteinuria, ถ้า albuminuria เด่นให้นึกถึง AL amyloid หรือ MIDD มากกว่า cast nephropathy", "Light chain restriction บน kidney IF"],
    ix: ["SPEP, serum IFE, sFLC (ใช้ร่วมกันให้ sensitivity สูงสุด)", "Urine IFE, 24-hour urine protein electrophoresis", "CBC, Ca, Cr, albumin, beta-2 microglobulin, LDH", "Whole-body low-dose CT หรือ PET/CT, bone marrow", "Kidney biopsy with IF light chain, EM, Congo red, mass spectrometry"],
    std: "IMWG 2014 myeloma criteria, IKMG 2019 MGRS consensus"
  }, [
    N("Myeloma cast nephropathy", "step", {
      s: "AKI กับ high involved sFLC, bland sediment",
      why: "Light chain รวมกับ uromodulin ใน distal tubule, การลด sFLC ได้เร็วและมากเป็นตัวกำหนด renal recovery",
      keys: ["Precipitant: dehydration, NSAID, contrast, hypercalcemia, loop diuretic"]
    }, [
      N("Light chain cast nephropathy", "nephro", {
        s: "AKI ใน myeloma",
        why: "เริ่ม bortezomib-based therapy ให้เร็วที่สุด, high-cutoff dialysis ไม่ได้ประโยชน์ชัด: MYRE (n = 98) HD independence ที่ 3 เดือน 41.3% vs 33.3% (p = 0.42, secondary ที่ 6 และ 12 เดือนดีกว่า), EuLITE (n = 90) dialysis independence ที่ 90 วัน 56% vs 51% ไม่ต่างกัน",
        ix: ["sFLC", "Kidney biopsy เมื่อ involved sFLC < 500 mg/L, albuminuria เด่น หรือสงสัย lesion อื่น (AL, MIDD), ถ้า sFLC > 1,500 mg/L กับ light chain proteinuria เด่น วินิจฉัย presumptive ได้โดยไม่ต้อง biopsy"],
        std: "IMWG 2016 renal impairment recommendations, IMWG 2023 update (Dimopoulos Lancet Oncol 2023)"
      })
    ]),
    N("MGRS: glomerular lesions with Ig deposits", "step", {
      s: "Proteinuria หรือ nephrotic กับ monoclonal deposit",
      keys: ["Organized vs non-organized deposits"]
    }, [
      N("AL amyloidosis", "nephro", {
        s: "Nephrotic, cardiac, neuropathy, lambda เด่น",
        why: "ต้อง type amyloid ทุกราย (mass spectrometry หรือ IHC) เพราะ M-protein พบร่วมกับ amyloid ชนิดอื่นได้ เช่น ATTR หรือ ALECT2 กับ MGUS",
        ix: ["Congo red, mass spectrometry, NT-proBNP, troponin"],
        std: "Mayo 2012 staging, ANDROMEDA (n = 388)",
        link: "nephrotic"
      }),
      N("MIDD (LCDD, HCDD, LHCDD)", "nephro", {
        s: "Nodular glomerulosclerosis (คล้าย DKD), CKD, kappa เด่น",
        ix: ["Linear IF ตาม GBM และ TBM, EM powdery deposit"],
        link: "nephrotic"
      }),
      N("PGNMID", "nephro", {
        s: "MPGN หรือ endocapillary pattern กับ monoclonal IgG deposit ส่วนใหญ่เป็น IgG3 kappa",
        why: "Clone ตรวจพบใน serum หรือ marrow เพียงราว 30%, recurrence หลัง KT สูง",
        ix: ["IF, bone marrow"],
        link: "nephrotic"
      }),
      N("Immunotactoid GN / cryoglobulinemic GN type I", "nephro", {
        s: "Microtubular deposits > 30 nm หรือ intracapillary pseudothrombi",
        ix: ["EM, cryoglobulin"],
        link: "raynaud"
      }),
      N("C3 glomerulopathy with monoclonal gammopathy", "nephro", {
        s: "C3G ในอายุ > 50 ต้องหา M-protein ทุกราย (พบร่วมได้มาก แต่การพบร่วมไม่ได้พิสูจน์ causality)",
        why: "Monoclonal Ig อาจทำหน้าที่เป็น C3 nephritic factor หรือ anti-CFH ทำให้ alternative pathway ทำงานเกิน",
        ix: ["SPEP, sFLC, complement studies"],
        link: "rpgn"
      }),
      N("TMA with monoclonal gammopathy / POEMS", "nephro", {
        s: "TMA หรือ endotheliosis กับ M-protein",
        ix: ["VEGF, IFE"],
        link: "numbness"
      })
    ]),
    N("MGRS: tubular lesions", "step", {
      s: "Tubular dysfunction กับ light chain",
      keys: ["Fanconi", "Crystals"]
    }, [
      N("Light chain proximal tubulopathy", "nephro", {
        s: "Fanconi syndrome, kappa เด่น, ± crystals",
        ix: ["Urine glucose, FEPO4, FEUA, biopsy EM"],
        link: "bonepain"
      }),
      N("Crystal-storing histiocytosis / crystalglobulinemia", "nephro", {
        s: "Crystal ใน histiocyte หรือ vascular lumen",
        ix: ["Biopsy EM"]
      })
    ]),
    N("Myeloma or lymphoproliferative disease without MGRS lesion", "step", {
      s: "Hematologic disease ที่ต้องรักษาตามเกณฑ์",
      keys: ["CRAB", "SLiM", "IgM"]
    }, [
      N("Multiple myeloma", "nephro", {
        s: "Clonal bone marrow plasma cell ≥ 10% หรือ biopsy-proven plasmacytoma ร่วมกับ CRAB หรือ SLiM อย่างน้อย 1 ข้อ, renal criterion (CrCl < 40 mL/min หรือ Cr > 2 mg/dL) นับเฉพาะ light chain cast nephropathy ไม่นับ AL, MIDD หรือ MGRS lesion อื่น",
        why: "SLiM: plasma cell ≥ 60%, FLC ratio ≥ 100 กับ involved FLC ≥ 100 mg/L, > 1 focal lesion บน MRI",
        ix: ["Bone marrow, imaging, sFLC"],
        std: "IMWG 2014",
        link: "bonepain"
      }),
      N("Hypercalcemic AKI", "nephro", {
        s: "AKI จาก hypercalcemia (bone resorption ใน myeloma) ผ่าน renal vasoconstriction, volume depletion และ nephrogenic DI และเป็น precipitant ของ cast nephropathy",
        ix: ["Ca, PTH ถูก suppress"],
        link: "hyperca"
      }),
      N("Waldenstrom macroglobulinemia / CLL / lymphoma", "nephro", {
        s: "IgM M-protein, hyperviscosity, lymphoma-related kidney lesions",
        why: "IgM ทำให้เกิด intracapillary thrombi, cryoglobulinemic GN, AL amyloid และพบ lymphoma infiltration ในไตได้",
        ix: ["MYD88 L265P, bone marrow, viscosity"],
        link: "lymphnode"
      })
    ]),
    N("MGUS unrelated to kidney disease", "step", {
      s: "M-protein เล็กน้อย, biopsy ไม่มี monoclonal lesion",
      why: "อย่าให้ chemotherapy เพียงเพราะเจอ MGUS ร่วมกับ CKD",
      keys: ["DKD หรือ hypertensive disease บน biopsy", "sFLC ratio สูงขึ้นจาก CKD เอง"]
    }, [
      N("Coincidental MGUS", "adj", {
        s: "ติดตาม M-protein ตาม risk stratification",
        ix: ["SPEP, sFLC, CBC, Ca, Cr ที่ 6 เดือน แล้วปีละครั้ง (low-risk MGUS ที่ stable ห่างเป็นทุก 2 ถึง 3 ปีได้)"],
        std: "Mayo MGUS risk stratification"
      }),
      N("Polyclonal FLC elevation from CKD", "nephro", {
        s: "Kappa และ lambda สูงทั้งคู่ ratio สูงเล็กน้อย",
        why: "ใช้ CKD-specific reference 0.37-3.1",
        ix: ["sFLC ratio, IFE"]
      })
    ])
  ])
};
