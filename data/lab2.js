/* Lab work-up flows part 2 (Nov 2026): calcium, phosphate and magnesium. Schema as data/lab1.js. */
window.LABTREES = window.LABTREES || {};

/* ===================== HYPERCALCEMIA ===================== */
LABTREES.hyperca = {
  panel: [
    "Ca ซ้ำพร้อม albumin (corrected Ca = Ca + 0.8 × (4 − albumin)) หรือ ionized Ca",
    "Intact PTH ในตัวอย่างเดียวกับ Ca",
    "PO4, Mg, Cr, eGFR, ALP, HCO3, Cl",
    "25(OH)D ทุกราย, 1,25(OH)2D และ PTHrP เมื่อ PTH ถูกกด",
    "SPEP, immunofixation, serum free light chain",
    "Spot urine Ca และ Cr หรือ 24-h urine Ca เพื่อคำนวณ CCCR = (UCa × SCr)/(SCa × UCr)",
    "TSH, 8 AM cortisol, vitamin A level ตามประวัติ, chest imaging และ ACE ถ้าคิด granuloma"
  ],
  pit: [
    "PTH 20-65 pg/mL ขณะ Ca สูงคือ inappropriately normal และยังเป็น PTH-dependent",
    "CCCR แปลผิดได้เมื่อ vitamin D deficiency, eGFR < 60, ใช้ thiazide หรือ lithium ให้แก้หรือหยุดก่อนถ้าทำได้",
    "Corrected Ca ไม่แม่นใน CKD, critical illness และ paraprotein ให้ใช้ ionized Ca",
    "Thiazide ทำ Ca สูงได้เล็กน้อยและมักเผย PHPT ที่ซ่อนอยู่ ถ้า Ca ยังสูงหลังหยุดยา 2-3 เดือนให้ work-up เป็น PHPT"
  ],
  tree: N("Hypercalcemia (corrected Ca > 10.5 mg/dL or ionized Ca > 1.32 mmol/L)", "root", {
    s: "ยืนยันด้วย ionized Ca แล้วใช้ intact PTH แบ่ง PTH-dependent กับ PTH-independent จากนั้น CCCR หรือ PTHrP, 1,25(OH)2D, 25(OH)D และ protein study ไปสู่โรค",
    why: "PTH เป็น branch point ที่แยกโรคได้มากที่สุดและเป็นสิ่งที่ examiner คาดหวังให้พูดเป็นอย่างแรก",
    keys: ["PTH สูงหรือ inappropriately normal = PTH-dependent", "PTH < 20 pg/mL = PTH-independent", "PTH-dependent แยกด้วย CCCR, eGFR และยา", "PTH-independent แยกด้วย PTHrP, 1,25(OH)2D, 25(OH)D, SPEP"],
    ix: ["Ionized Ca, PTH, 25(OH)D, CCCR, PTHrP, 1,25(OH)2D, SPEP, FLC"],
    std: "Bilezikian JP et al. Fifth International Workshop on primary hyperparathyroidism, J Bone Miner Res 2022, Walker MD and Shane E. Hypercalcemia: a review, JAMA 2022"
  }, [
    N("Total Ca high but ionized Ca normal: pseudohypercalcemia", "step", {
      s: "Protein จับ Ca มากขึ้น ionized Ca ปกติ",
      keys: ["Ionized Ca ปกติ", "Total protein หรือ albumin สูงมาก"],
      ix: ["Ionized Ca, SPEP"]
    }, [
      N("Paraprotein binding", "nephro", {
        s: "Myeloma หรือ Waldenström ที่ IgG หรือ IgM จับ Ca",
        why: "ไม่ต้องรักษา hypercalcemia เมื่อ ionized Ca ปกติ แต่ต้อง work-up paraprotein และจำไว้ว่า Ca สูงใน myeloma ส่วนใหญ่เป็น true hypercalcemia จึงต้องวัด ionized Ca ก่อนสรุปว่าเป็น pseudohypercalcemia",
        keys: ["Ionized Ca ปกติ", "M-protein"],
        ix: ["SPEP, immunofixation, FLC"],
        link: "mspike"
      })
    ]),
    N("PTH high or inappropriately normal (> 20 pg/mL): PTH-dependent", "step", {
      s: "Parathyroid ไม่ถูกกดตาม Ca ใช้ CCCR, eGFR และยาแยกต่อ",
      why: "CCCR แยก FHH ออกจาก PHPT ก่อนส่งผ่าตัด เพราะ FHH ผ่าตัดไม่หาย",
      keys: ["CCCR < 0.01 ชี้ FHH แต่ราว 20% ของ FHH มีค่า > 0.01 และ PHPT ที่ขาด vitamin D, eGFR < 60 หรือใช้ thiazide ก็มีค่า < 0.01 ได้", "CCCR > 0.02 ชี้ PHPT (FHH พบน้อยมากที่ระดับนี้)", "CCCR 0.01-0.02 ก้ำกึ่ง ส่ง CASR genetics", "PO4 ต่ำหรือปกติต่ำ, Cl/PO4 > 33 สนับสนุน PHPT"],
      ix: ["CCCR, 25(OH)D, eGFR, lithium history"],
      std: "Bilezikian JP et al. J Bone Miner Res 2022"
    }, [
      N("CCCR < 0.01, family history or lifelong mild hypercalcemia", "step", {
        s: "CaSR ไวต่อ Ca ลดลง ทั้ง parathyroid และไต",
        keys: ["CCCR < 0.01", "Mg ปกติสูง", "PTH ปกติหรือสูงเล็กน้อย"],
        ix: ["CASR, GNA11, AP2S1 genetic test, Ca ของญาติสายตรง"]
      }, [
        N("Familial hypocalciuric hypercalcemia", "nephro", {
          s: "CASR loss-of-function (FHH1), GNA11 (FHH2), AP2S1 (FHH3)",
          why: "Benign ไม่ต้องผ่าตัด ต้องแยกก่อน parathyroidectomy",
          keys: ["CCCR < 0.01", "24-h urine Ca < 100 mg", "ญาติ Ca สูง"],
          ix: ["Genetic test"],
          std: "Bilezikian JP et al. J Bone Miner Res 2022"
        })
      ]),
      N("CCCR > 0.02, eGFR normal, no lithium", "step", {
        s: "Autonomous parathyroid secretion",
        keys: ["CCCR > 0.02", "PO4 ต่ำหรือปกติต่ำ", "Hypercalciuria"],
        ix: ["Neck ultrasound, 4D-CT, sestamibi, 18F-choline PET-CT เมื่อจะผ่าตัด (imaging ใช้ localize ไม่ใช้วินิจฉัย imaging negative ไม่ตัด PHPT)", "BMD ที่ lumbar spine, hip และ distal 1/3 radius, vertebral imaging, renal imaging หา stone"]
      }, [
        N("Primary hyperparathyroidism", "nephro", {
          s: "Single adenoma 80-85%, multigland hyperplasia, carcinoma",
          why: "Surgical criteria ใช้ Ca, BMD, fracture, stone, eGFR และ urine Ca",
          keys: ["Symptomatic PHPT ผ่าตัดทุกรายที่ผ่าได้ ส่วน asymptomatic PHPT ผ่าตัดเมื่อมีข้อใดข้อหนึ่ง: Ca > 1 mg/dL เหนือ upper limit of normal, eGFR < 60, T-score ≤ −2.5 ที่ตำแหน่งใดก็ได้หรือ vertebral fracture, stone หรือ nephrocalcinosis จาก imaging, 24-h urine Ca > 250 mg (หญิง) หรือ > 300 mg (ชาย), อายุ < 50 ปี", "Ca > 14 mg/dL ร่วม PTH สูงหลายเท่าและก้อนคลำได้ คิด carcinoma", "อายุ < 30 ปีหรือ multigland ให้คิด MEN1, MEN2A, CDC73"],
          ix: ["Localization imaging หลังตัดสินใจผ่าตัด", "Genetic test ถ้าอายุน้อย"],
          std: "Bilezikian JP et al. J Bone Miner Res 2022"
        })
      ]),
      N("PTH-dependent with lithium exposure", "step", {
        s: "Lithium เลื่อน set point ของ CaSR",
        keys: ["ใช้ lithium นาน", "CCCR อาจต่ำคล้าย FHH"],
        ix: ["Ca และ PTH ซ้ำหลังหยุด lithium ถ้าทำได้"]
      }, [
        N("Lithium-associated hyperparathyroidism", "nephro", {
          s: "Hyperplasia หรือ adenoma ที่เกิดระหว่างใช้ lithium",
          why: "Ca ไม่กลับปกติหลังหยุดยาชี้ว่ามี adenoma จริง",
          keys: ["Ca สูงคงที่ระหว่าง lithium", "อาจมี AVP resistance ร่วม"],
          ix: ["Neck imaging"]
        })
      ]),
      N("PTH-dependent in CKD 5D or after kidney transplant", "step", {
        s: "Parathyroid โตแบบ nodular ไม่ตอบสนอง feedback",
        keys: ["PTH สูงมากต่อเนื่อง", "Ca สูงหลัง KT หรือ dialysis ที่ไม่ได้ calcium load"],
        ix: ["ALP, PO4, neck ultrasound"]
      }, [
        N("Tertiary hyperparathyroidism", "nephro", {
          s: "Autonomous parathyroid หลัง CKD นาน",
          why: "Hypercalcemia ที่ยังอยู่เกินราว 1 ปีหลัง KT ร่วม PTH สูง เป็นเหตุให้พิจารณา parathyroidectomy (cinacalcet เป็นทางเลือกเมื่อผ่าตัดไม่ได้) ตามแนวปฏิบัติของ transplant center เพราะ KDIGO ไม่ได้กำหนดเกณฑ์ตายตัว",
          keys: ["Ca สูง PTH สูงมาก", "PO4 ต่ำหลัง KT"],
          ix: ["Neck imaging, BMD"],
          std: "KDIGO 2017 CKD-MBD update"
        })
      ])
    ]),
    N("PTH suppressed (< 20 pg/mL): PTH-independent", "step", {
      s: "Ca มาจากแหล่งอื่น ส่ง PTHrP, 1,25(OH)2D, 25(OH)D และ protein study พร้อมกัน",
      why: "Malignancy เป็นสาเหตุหลักในผู้ป่วยในโรงพยาบาล การส่ง lab ชุดนี้พร้อมกันแยกกลไกได้ในครั้งเดียว",
      keys: ["PTHrP สูง = humoral hypercalcemia of malignancy", "1,25(OH)2D สูง = granuloma หรือ lymphoma", "25(OH)D > 150 ng/mL = vitamin D intoxication", "ทั้งหมดปกติ = osteolysis หรือสาเหตุอื่น"],
      ix: ["PTHrP, 1,25(OH)2D, 25(OH)D, SPEP, FLC, TSH, ALP"]
    }, [
      N("PTHrP high", "step", {
        s: "Humoral hypercalcemia of malignancy",
        keys: ["PTHrP สูง", "PO4 ต่ำ, 1,25(OH)2D ต่ำ"],
        ix: ["CT chest abdomen pelvis, PET-CT"]
      }, [
        N("Squamous cell carcinoma and solid tumors", "adj", {
          s: "Lung SCC, head and neck, esophagus, renal cell, breast, ovary, bladder",
          why: "Prognosis แย่ มักพบเมื่อมะเร็งลุกลามแล้ว",
          keys: ["PTHrP สูง", "Ca มักสูงเร็วและมาก"],
          ix: ["Imaging หา primary"]
        }),
        N("HTLV-1 adult T-cell leukemia and lymphoma, NET", "adj", {
          s: "PTHrP จาก ATLL และ pancreatic NET",
          why: "HTLV-1 serology ในผู้ป่วยที่มี lymphocytosis และ flower cells",
          keys: ["Flower cells", "PTHrP สูง"],
          ix: ["HTLV-1 serology, flow cytometry, chromogranin A"]
        })
      ]),
      N("1,25(OH)2D high, 25(OH)D normal", "step", {
        s: "1α-hydroxylase นอกไตใน granuloma หรือ lymphoma หรือ 24-hydroxylase บกพร่อง",
        keys: ["1,25(OH)2D สูง", "PO4 ปกติหรือสูง", "Hypercalciuria", "ถามการได้ calcitriol หรือ alfacalcidol ก่อน เพราะทำ Ca สูงโดย PTH ถูกกดและ 25(OH)D ไม่สูง"],
        ix: ["CT chest, ACE, LDH, PET-CT", "25(OH)D/24,25(OH)2D ratio"]
      }, [
        N("Sarcoidosis", "adj", {
          s: "Hilar adenopathy, uveitis, skin lesion, granulomatous interstitial nephritis",
          why: "ตอบสนองดีต่อ glucocorticoid",
          keys: ["ACE สูงราว 60% ของผู้ป่วย ACE ปกติไม่ตัด sarcoidosis และ ACE สูงไม่จำเพาะ", "Bilateral hilar lymphadenopathy"],
          ix: ["Biopsy แสดง non-caseating granuloma"]
        }),
        N("Tuberculosis and fungal infection", "adj", {
          s: "TB, histoplasmosis, coccidioidomycosis, PJP",
          why: "ต้อง exclude ก่อนให้ steroid",
          keys: ["Granuloma with caseation"],
          ix: ["AFB, fungal culture, IGRA"]
        }),
        N("Lymphoma", "adj", {
          s: "Hodgkin และ non-Hodgkin lymphoma",
          why: "Lymphoma ทำ Ca สูงได้ทั้งผ่าน calcitriol, PTHrP และ osteolysis ดังนั้น 1,25(OH)2D ปกติไม่ตัด lymphoma",
          keys: ["LDH สูง", "Lymphadenopathy"],
          ix: ["PET-CT, tissue biopsy"],
          link: "lymphnode"
        }),
        N("CYP24A1 or SLC34A1 mutation", "nephro", {
          s: "24-hydroxylase deficiency หรือ NaPi-2a loss-of-function",
          why: "พบในผู้ใหญ่ที่เป็น stone และ nephrocalcinosis ซ้ำ Ca สูงขึ้นช่วงตั้งครรภ์หรือได้ vitamin D",
          keys: ["25(OH)D/24,25(OH)2D ratio > 80 ชี้ CYP24A1", "PO4 ต่ำและ FEPO4 สูงชี้ SLC34A1", "Nephrocalcinosis"],
          ix: ["CYP24A1, SLC34A1 genetic test"],
          std: "Kaufmann M et al. JCEM 2014: 25(OH)D/24,25(OH)2D ratio สูงชัดเจนใน CYP24A1 deficiency (cut-off ที่ใช้ทั่วไปราว 80)"
        })
      ]),
      N("25(OH)D > 150 ng/mL (> 375 nmol/L)", "step", {
        s: "Exogenous vitamin D เกิน",
        keys: ["25(OH)D สูงมาก"],
        ix: ["Supplement history, compounding product"]
      }, [
        N("Vitamin D intoxication", "adj", {
          s: "Ergocalciferol หรือ cholecalciferol ขนาดสูงมาก",
          why: "25(OH)D ครึ่งชีวิตยาว hypercalcemia อาจอยู่หลายสัปดาห์",
          keys: ["25(OH)D > 150 ng/mL", "PO4 สูง"],
          ix: ["Product analysis"]
        })
      ]),
      N("PTHrP and vitamin D metabolites low or normal", "step", {
        s: "Osteolysis, alkali, endocrine, immobilization, drug",
        keys: ["M-protein หรือ bone lesion", "HCO3 สูงและ AKI", "TSH ต่ำ, cortisol ต่ำ", "ALP สูง"],
        ix: ["SPEP, FLC, bone scan หรือ PET-CT, TSH, cortisol, vitamin A"]
      }, [
        N("Multiple myeloma and bone metastasis", "nephro", {
          s: "Local osteolysis ผ่าน RANKL และ cytokine",
          why: "Myeloma ทำ hypercalcemia ร่วม cast nephropathy และ AKI",
          keys: ["M-protein, FLC ratio ผิดปกติ", "Lytic lesion, ALP ปกติใน myeloma"],
          ix: ["Bone marrow biopsy, whole-body low-dose CT"],
          link: "mspike"
        }),
        N("Calcium-alkali syndrome", "nephro", {
          s: "Calcium carbonate ปริมาณมาก ร่วม thiazide หรือ volume depletion",
          why: "Triad hypercalcemia, metabolic alkalosis และ AKI",
          keys: ["HCO3 สูง", "AKI", "PTH และ 1,25(OH)2D ต่ำ"],
          ix: ["Supplement history"],
          link: "metalk"
        }),
        N("Thyrotoxicosis and adrenal insufficiency", "adj", {
          s: "Bone resorption เพิ่ม หรือ volume depletion",
          why: "Ca มักสูงไม่มาก",
          keys: ["TSH ต่ำ หรือ cortisol ต่ำ"],
          ix: ["TSH, free T4, cortisol"]
        }),
        N("Immobilization and Paget disease", "adj", {
          s: "Bed-ridden โดยเฉพาะ high bone turnover",
          why: "พบใน spinal cord injury และ Paget ที่ถูก immobilize",
          keys: ["ALP สูงใน Paget ส่วน immobilization อย่างเดียว ALP มักปกติ", "Bone resorption marker สูง, urine Ca สูง"],
          ix: ["Bone scan"],
          link: "alp"
        }),
        N("Drugs", "adj", {
          s: "Vitamin A, retinoid, teriparatide, abaloparatide, theophylline",
          why: "หยุดยาแล้ว Ca กลับปกติ",
          keys: ["Vitamin A level สูง"],
          ix: ["Drug review"]
        }),
        N("Recovery phase of rhabdomyolysis AKI", "nephro", {
          s: "กลไกหลักคือ Ca ที่ตกตะกอนในกล้ามเนื้อถูกปล่อยกลับ บางรายมี 1,25(OH)2D สูงชั่วคราวร่วมด้วย",
          why: "ช่วงแรกของ rhabdomyolysis ให้ Ca เฉพาะเมื่อ hypocalcemia มีอาการหรือมี hyperkalemia ที่ ECG เปลี่ยน",
          keys: ["Hypocalcemia ช่วงแรกแล้วกลับเป็น hypercalcemia ช่วง diuretic phase"],
          ix: ["CK trend"],
          link: "myalgia"
        })
      ])
    ])
  ])
};

/* ===================== HYPOCALCEMIA ===================== */
LABTREES.hypoca = {
  panel: [
    "Ionized Ca (หรือ corrected Ca), albumin, blood gas",
    "Mg, PO4, Cr, eGFR, ALP",
    "Intact PTH ในตัวอย่างเดียวกับ Ca",
    "25(OH)D, 1,25(OH)2D เมื่อ 25(OH)D ปกติ",
    "Lipase, CK, uric acid, LDH ตามบริบท",
    "Spot urine Ca/Cr และ Mg",
    "Total Ca/ionized Ca ratio ถ้าได้ citrate (CRRT, massive transfusion)"
  ],
  pit: [
    "แก้ Mg ก่อนแปล PTH เพราะ Mg < 1 mg/dL กด PTH และทำ PTH resistance",
    "Corrected Ca ไม่แม่นใน critical illness และ CKD ให้ใช้ ionized Ca",
    "PTH ปกติขณะ Ca ต่ำ (หลังแก้ Mg แล้ว) คือ hypoparathyroidism (inappropriately normal)",
    "ADH1 มี urine Ca สูงเทียบกับ serum Ca ให้ Ca และ calcitriol มากจะเกิด nephrocalcinosis"
  ],
  tree: N("Hypocalcemia (ionized Ca < 1.15 mmol/L)", "root", {
    s: "ยืนยัน ionized Ca แล้วแก้ Mg จากนั้นใช้ PTH แบ่ง hypoparathyroidism กับ secondary hyperparathyroidism และใช้ PO4, eGFR, 25(OH)D, 1,25(OH)2D แยกต่อ",
    why: "PTH และ PO4 คู่กันแบ่งกลุ่มโรคได้ เป็นโครงที่ examiner คาดหวัง",
    keys: ["PTH ต่ำหรือปกติ + PO4 สูง = hypoparathyroidism", "PTH สูง + PO4 สูง = CKD, PHP, phosphate load", "PTH สูง + PO4 ต่ำหรือปกติ = vitamin D axis, hungry bone, pancreatitis, drug"],
    ix: ["Ionized Ca, Mg, PTH, PO4, 25(OH)D, 1,25(OH)2D"],
    std: "Bilezikian JP et al. Second International Workshop on hypoparathyroidism, J Bone Miner Res 2022, Fong J and Khan A. Hypocalcemia, Can Fam Physician 2012"
  }, [
    N("Ionized Ca normal or citrate-related", "step", {
      s: "Total Ca ต่ำจาก albumin หรือ ionized Ca ต่ำจาก citrate และ alkalemia",
      keys: ["Ionized Ca ปกติแต่ albumin ต่ำ", "Total/ionized Ca ratio > 2.5 ชี้ citrate accumulation"],
      ix: ["Ionized Ca, blood gas"]
    }, [
      N("Hypoalbuminemia", "adj", {
        s: "Nephrotic, cirrhosis, critical illness",
        why: "ไม่ต้องให้ Ca ถ้า ionized Ca ปกติ",
        keys: ["Ionized Ca ปกติ"],
        ix: ["Albumin, UPCR"]
      }),
      N("Citrate and alkalemia", "adj", {
        s: "Massive transfusion, citrate anticoagulation ใน CRRT, hyperventilation",
        why: "Citrate จับ Ca ionized ต่ำแต่ total ปกติหรือสูง",
        keys: ["Total/ionized Ca ratio > 2.5", "pH สูง"],
        ix: ["Post-filter ionized Ca, lactate ใน liver failure"]
      })
    ]),
    N("Mg < 1 mg/dL (0.4 mmol/L) or severe hypermagnesemia", "step", {
      s: "Mg ผิดปกติกด PTH secretion และทำ end-organ resistance",
      keys: ["Mg ต่ำมาก", "PTH ต่ำหรือปกติไม่เหมาะสม"],
      ix: ["ให้ Mg แล้ววัด Ca และ PTH ซ้ำ"]
    }, [
      N("Magnesium disorders", "nephro", {
        s: "Hypomagnesemia จาก PPI, diarrhea, Gitelman, cisplatin, CNI",
        why: "Hypocalcemia ไม่หายจนกว่าจะแก้ Mg",
        keys: ["Mg < 1 mg/dL", "K ต่ำร่วม"],
        ix: ["FEMg"],
        link: "mg"
      })
    ]),
    N("PTH low or inappropriately normal: hypoparathyroidism", "step", {
      s: "PO4 สูงหรือปกติสูง ไม่ใช่ CKD",
      keys: ["PTH < 15-20 pg/mL หรือปกติขณะ Ca ต่ำ", "PO4 สูง", "Urine Ca/Cr สูงเทียบกับ serum Ca ชี้ ADH1"],
      ix: ["Neck surgery history, anti-CaSR antibody, CASR genetic test, 22q11 FISH, ferritin, ceruloplasmin"],
      std: "Bilezikian JP et al. J Bone Miner Res 2022"
    }, [
      N("Post-surgical hypoparathyroidism", "adj", {
        s: "Thyroidectomy หรือ parathyroidectomy, chronic ถ้าเกิน 12 เดือน",
        why: "สาเหตุพบบ่อยที่สุด ราว 75% ของ hypoparathyroidism",
        keys: ["PTH ต่ำวันแรกหลังผ่าตัด", "PO4 สูง"],
        ix: ["PTH 12-24 ชั่วโมงหลังผ่าตัด"]
      }),
      N("Autoimmune and APECED (autoimmune polyendocrine syndrome type 1)", "adj", {
        s: "AIRE mutation: hypoparathyroidism, Addison, mucocutaneous candidiasis",
        why: "ต้องคัดกรอง adrenal insufficiency ทุกราย",
        keys: ["Candidiasis, adrenal insufficiency"],
        ix: ["Interferon-ω antibody, AIRE genetic test, cortisol"]
      }),
      N("Genetic: 22q11, ADH1, GCM2, HDR", "nephro", {
        s: "DiGeorge, CaSR gain-of-function (ADH1), HDR syndrome (GATA3)",
        why: "ADH1 มี hypercalciuria และ hypomagnesemia, HDR มี renal dysplasia และ deafness",
        keys: ["ADH1: urine Ca/Cr สูงขณะ Ca ต่ำ, family history", "HDR: renal dysplasia, sensorineural deafness"],
        ix: ["CASR, GATA3, GCM2 genetic test, 22q11 FISH, renal ultrasound, audiogram"]
      }),
      N("Infiltration and radiation", "adj", {
        s: "Hemochromatosis, Wilson, thalassemia iron overload, metastasis",
        why: "Iron overload จากการให้เลือดซ้ำ",
        keys: ["Ferritin สูงมาก"],
        ix: ["Ferritin, transferrin saturation, ceruloplasmin"]
      })
    ]),
    N("PTH high: secondary hyperparathyroidism", "step", {
      s: "Parathyroid ตอบสนองอย่างเหมาะสม หาว่าทำไม Ca ต่ำ",
      keys: ["PO4 สูง + eGFR ต่ำ = CKD", "PO4 สูง + eGFR ปกติ = PHP หรือ phosphate load", "PO4 ต่ำหรือปกติ = vitamin D axis หรือ Ca deposition"],
      ix: ["PO4, eGFR, 25(OH)D, 1,25(OH)2D, CK, uric acid, lipase"]
    }, [
      N("PO4 high, eGFR low", "step", {
        s: "PO4 คั่ง 1,25(OH)2D ต่ำ FGF23 สูง",
        keys: ["eGFR < 30", "ALP และ PTH สูงตาม CKD stage"],
        ix: ["KDIGO CKD-MBD monitoring"]
      }, [
        N("CKD-MBD", "nephro", {
          s: "1,25(OH)2D ต่ำ, PO4 คั่ง, FGF23 สูง, skeletal PTH resistance",
          why: "เป้าหมายคือลด PO4 และคุม PTH ไม่ใช่ทำ Ca ให้ปกติด้วย Ca load",
          keys: ["PO4 สูง PTH สูง eGFR ต่ำ"],
          ix: ["25(OH)D, ALP, PTH trend"],
          std: "KDIGO 2017 CKD-MBD update"
        })
      ]),
      N("PO4 high, eGFR normal, no tissue breakdown", "step", {
        s: "PTH resistance ที่ไต",
        keys: ["PTH สูง PO4 สูง eGFR ปกติ", "AHO phenotype ใน PHP1A"],
        ix: ["GNAS methylation และ sequencing, urinary cAMP response (Ellsworth-Howard)"]
      }, [
        N("Pseudohypoparathyroidism", "nephro", {
          s: "GNAS (PHP1A, AHO: short stature, brachydactyly, obesity), PHP1B",
          why: "PHP1A มี TSH resistance และ obesity ร่วม",
          keys: ["PTH สูง Ca ต่ำ PO4 สูง", "TSH สูงเล็กน้อยใน PHP1A"],
          ix: ["GNAS genetic and methylation test"],
          std: "Mantovani G et al. First international consensus on pseudohypoparathyroidism, Nat Rev Endocrinol 2018"
        })
      ]),
      N("PO4 high with CK, uric acid or LDH high", "step", {
        s: "PO4 load ตกตะกอนกับ Ca",
        keys: ["CK สูง, uric acid สูง, LDH สูง"],
        ix: ["CK, uric acid, LDH, K"]
      }, [
        N("Phosphate load and tissue breakdown", "nephro", {
          s: "TLS, rhabdomyolysis ระยะแรก, phosphate enema",
          why: "ให้ Ca เฉพาะเมื่อมีอาการเพราะเสี่ยง Ca-PO4 deposition",
          keys: ["PO4 สูงมาก", "Cairo-Bishop laboratory TLS"],
          ix: ["Uric acid, K, CK"],
          link: "phos"
        })
      ]),
      N("PO4 low or normal, 25(OH)D < 12 ng/mL (30 nmol/L)", "step", {
        s: "Vitamin D deficiency กระตุ้น PTH ทำ renal PO4 loss",
        keys: ["25(OH)D < 12 ng/mL", "ALP สูง, PO4 ต่ำ"],
        ix: ["Celiac serology, malabsorption work-up"],
        std: "Munns CF et al. Global consensus on nutritional rickets, JCEM 2016: deficiency 25(OH)D < 12 ng/mL"
      }, [
        N("Vitamin D deficiency and malabsorption", "adj", {
          s: "Bariatric surgery, celiac, pancreatic insufficiency, ขาดแสงแดด",
          why: "Osteomalacia มี ALP สูง PO4 ต่ำ Looser zone",
          keys: ["25(OH)D ต่ำ ALP สูง"],
          ix: ["Celiac serology, fecal elastase"],
          link: "bonepain"
        })
      ]),
      N("25(OH)D normal, 1,25(OH)2D abnormal, eGFR normal", "step", {
        s: "ความผิดปกติของการสร้างหรือการออกฤทธิ์ของ calcitriol",
        keys: ["1,25(OH)2D ต่ำ: CYP27B1 (VDDR1A)", "1,25(OH)2D สูงมาก: VDR (VDDR2) มี alopecia"],
        ix: ["CYP27B1, CYP2R1, VDR genetic test"]
      }, [
        N("Vitamin D-dependent rickets", "nephro", {
          s: "CYP27B1 (VDDR1A), VDR (VDDR2) ส่วน CYP2R1 (VDDR1B) ต่างออกไปคือ 25(OH)D ต่ำและไม่ขึ้นด้วย vitamin D ขนาดปกติ",
          why: "VDDR2 ตอบสนองต่อ calcitriol น้อย รายรุนแรงต้องใช้ Ca ขนาดสูงหรือ IV Ca ระยะยาว",
          keys: ["Onset เด็ก", "1,25(OH)2D ต่ำหรือสูงมาก"],
          ix: ["Genetic test"]
        })
      ]),
      N("Lipase high or sepsis", "step", {
        s: "Ca deposition หรือ PTH resistance จาก cytokine",
        keys: ["Lipase สูง", "Sepsis"],
        ix: ["Lipase, CT abdomen"]
      }, [
        N("Acute pancreatitis and sepsis", "adj", {
          s: "Saponification, PTH resistance, cytokine",
          why: "Hypocalcemia ใน pancreatitis เป็น marker ความรุนแรง",
          keys: ["Lipase สูง", "Ca ต่ำร่วม Mg ต่ำ"],
          ix: ["TG, Ca ก่อนป่วย (hypercalcemia เป็นสาเหตุ pancreatitis ได้)"],
          link: "abdpain"
        })
      ])
    ]),
    N("PTH variable: recent surgery or drug", "step", {
      s: "ดูประวัติก่อนแปล PTH: PTH ต่ำหรือปกติช่วงแรกหลัง parathyroidectomy, ลดลงจากเดิมเมื่อได้ calcimimetic และสูงขึ้นเมื่อได้ antiresorptive",
      keys: ["ประวัติ parathyroidectomy หรือ thyroidectomy ล่าสุด", "ประวัติ denosumab, zoledronate, cinacalcet, etelcalcetide, foscarnet"]
    }, [
      N("Recent parathyroidectomy or thyroidectomy, PO4 and Mg low", "step", {
        s: "Bone ดึง Ca, PO4, Mg อย่างรวดเร็ว",
        keys: ["ALP สูงก่อนผ่าตัด", "PO4 และ Mg ต่ำ (ต่างจาก post-surgical hypoparathyroidism ที่ PO4 สูง)", "PTH หลัง parathyroidectomy ช่วงแรกมักต่ำหรือปกติ แล้วสูงขึ้นภายหลัง จึงใช้ PO4 แยก ไม่ใช้ PTH"],
        ix: ["Ca, PO4, Mg ทุก 6-12 ชั่วโมงหลังผ่าตัด"]
      }, [
        N("Hungry bone syndrome", "nephro", {
          s: "หลัง parathyroidectomy (โดยเฉพาะ tertiary หรือ ALP สูง) หรือ thyroidectomy ใน thyrotoxicosis",
          why: "ต้องการ Ca IV ปริมาณมากและนาน",
          keys: ["ALP สูงก่อนผ่าตัด", "PO4 และ Mg ต่ำ"],
          ix: ["ALP ก่อนผ่าตัดใช้ทำนาย"]
        })
      ]),
      N("Recent antiresorptive or calcimimetic", "step", {
        s: "ยาที่ลด bone resorption (PTH สูงตอบสนอง) ส่วน calcimimetic ทำให้ PTH ลดลงจากเดิม และ foscarnet จับ ionized Ca โดย total Ca อาจปกติ",
        keys: ["ประวัติ denosumab, zoledronate, cinacalcet, etelcalcetide, foscarnet"],
        ix: ["25(OH)D และ Ca ก่อนให้ denosumab"]
      }, [
        N("Antiresorptive and calcimimetic drugs", "nephro", {
          s: "Denosumab (โดยเฉพาะ eGFR < 30 และ dialysis), zoledronate, cinacalcet, etelcalcetide, foscarnet",
          why: "Denosumab 60 mg ในผู้ป่วย dialysis เกิด severe hypocalcemia (Ca < 7.5 mg/dL หรือต้องรักษาฉุกเฉิน) 41.1% ใน 12 สัปดาห์ เทียบกับ 2.0% ใน oral bisphosphonate",
          keys: ["ส่วนใหญ่เกิด 2-10 สัปดาห์หลังฉีด denosumab เสี่ยงสูงสุดสัปดาห์ที่ 2-5"],
          ix: ["Ca weekly หลังให้ยาในผู้ป่วย CKD 4-5"],
          std: "Bird ST et al. JAMA 2024, FDA boxed warning 2024"
        })
      ])
    ])
  ])
};

/* ===================== PHOSPHATE ===================== */
LABTREES.phos = {
  panel: [
    "Serum PO4 ซ้ำ (fasting เช้า), Ca, Mg, K, HCO3, glucose, Cr, ALP",
    "Intact PTH, 25(OH)D, 1,25(OH)2D, intact FGF23",
    "Second-morning fasting urine PO4 และ Cr เพื่อคำนวณ FEPO4 และ TmP/GFR (Walton-Bijvoet หรือ Kenny-Glen)",
    "Urine glucose, uric acid, amino acids, β2-microglobulin หรือ α1-microglobulin, urine Ca/Cr",
    "Serum free light chain, drug review (tenofovir, ifosfamide, ferric carboxymaltose)",
    "สำหรับ hyperphosphatemia: CK, uric acid, LDH, K, Ca, IGF-1"
  ],
  pit: [
    "TmP/GFR ปกติในผู้ใหญ่ราว 0.8-1.35 mmol/L (2.5-4.2 mg/dL) และสูงกว่าในเด็ก",
    "FEPO4 > 5% ขณะ PO4 ต่ำคือ renal wasting แต่ต้องแปลขณะ fasting และไม่ได้เสริม PO4",
    "Intact FGF23 ที่อยู่ในช่วง reference แต่ > 27 pg/mL ขณะ PO4 ต่ำยังถือว่าไม่เหมาะสม (cut-off นี้มาจาก cohort เดียวและขึ้นกับ assay ที่ใช้)",
    "Pseudohyperphosphatemia จาก paraprotein, hyperlipidemia, hemolysis, liposomal amphotericin B, heparin, tPA"
  ],
  tree: N("Phosphate disorders", "root", {
    s: "แบ่ง hypo กับ hyper แล้วใช้ FEPO4 และ TmP/GFR แยกไตกับนอกไต จากนั้น PTH, FGF23, 1,25(OH)2D และ proximal tubular markers ไปสู่โรค",
    why: "TmP/GFR เป็นตัวเดียวที่บอกว่าไตตั้ง threshold ของ PO4 ไว้ที่ใด จึงเป็นแกนของ algorithm ทั้ง hypo และ hyper",
    keys: ["Hypo: FEPO4 < 5% = shift หรือ GI, FEPO4 > 5% = renal wasting", "Renal wasting: Fanconi features, PTH, FGF23, 1,25(OH)2D", "Hyper: eGFR ต่ำ, load (FEPO4 สูง), TmP/GFR สูง (PTH ต่ำ, FGF23 ต่ำ, GH)"],
    ix: ["FEPO4, TmP/GFR, PTH, FGF23, 1,25(OH)2D"],
    std: "Walton RJ, Bijvoet OL. Lancet 1975 (TmP/GFR nomogram), Hartley IR et al. J Bone Miner Res 2022 (intact FGF23 cut point 27 pg/mL)"
  }, [
    N("Hypophosphatemia (PO4 < 2.5 mg/dL)", "step", {
      s: "FEPO4 และ 24-h urine PO4 แยกไตกับนอกไต",
      keys: ["FEPO4 < 5% หรือ 24-h urine PO4 < 100 mg = ไตเก็บ PO4", "FEPO4 > 5% หรือ TmP/GFR ต่ำ = renal wasting"],
      ix: ["Fasting urine PO4 และ Cr"]
    }, [
      N("FEPO4 < 5%, urine PO4 < 100 mg/d: kidney conserving", "step", {
        s: "Shift หรือ intake และ absorption ต่ำ",
        keys: ["Acute ร่วม insulin หรือ alkalosis = shift", "Chronic ร่วม binder หรือ malabsorption = GI"],
        ix: ["Blood gas, nutritional history, 25(OH)D"]
      }, [
        N("Acute fall with feeding, insulin or alkalosis: shift", "step", {
          s: "PO4 ย้ายเข้าเซลล์",
          keys: ["K และ Mg ลดพร้อมกัน", "pH สูงใน respiratory alkalosis"],
          ix: ["K, Mg, blood gas"]
        }, [
          N("Refeeding syndrome", "adj", {
            s: "เริ่มอาหารหรือ glucose หลัง starvation",
            why: "PO4 < 1 mg/dL ทำ respiratory failure, heart failure และ rhabdomyolysis",
            keys: ["PO4, K, Mg ลดภายใน 5 วันหลังเริ่มให้พลังงาน ส่วนใหญ่ใน 72 ชั่วโมงแรก"],
            ix: ["NICE หรือ ASPEN refeeding risk criteria"],
            std: "da Silva JSV et al. ASPEN consensus recommendations for refeeding syndrome, Nutr Clin Pract 2020"
          }),
          N("Respiratory alkalosis and sepsis", "adj", {
            s: "Alkalosis กระตุ้น glycolysis ดึง PO4",
            why: "พบบ่อยใน sepsis และ alcohol withdrawal",
            keys: ["pCO2 ต่ำ pH สูง"],
            ix: ["Blood gas"]
          }),
          N("DKA treatment and hungry bone", "adj", {
            s: "Insulin ระหว่างรักษา DKA, หลัง parathyroidectomy",
            why: "Hungry bone มี Ca และ Mg ต่ำร่วม",
            keys: ["PO4 ลดหลังให้ insulin หรือหลังผ่าตัด"],
            ix: ["Ca, Mg"]
          })
        ]),
        N("Chronic, low intake or GI loss", "step", {
          s: "Absorption ลด ไตตอบสนองถูกต้อง",
          keys: ["Urine PO4 ต่ำ", "25(OH)D ต่ำหรือ binder use"],
          ix: ["Drug history, 25(OH)D, celiac serology"]
        }, [
          N("Binders and antacids", "adj", {
            s: "Aluminum, magnesium, calcium, sevelamer, lanthanum",
            why: "Antacid ปริมาณมากทำ osteomalacia",
            keys: ["Urine PO4 ต่ำมาก", "Ca อาจสูงจาก calcium antacid"],
            ix: ["Drug history"]
          }),
          N("Vitamin D deficiency and malabsorption", "adj", {
            s: "Secondary hyperparathyroidism ทำ renal PO4 loss ร่วม",
            why: "ระยะหลัง FEPO4 อาจสูงจาก PTH จึงต้องดู 25(OH)D และ PTH ร่วมกัน",
            keys: ["25(OH)D ต่ำ PTH สูง ALP สูง"],
            ix: ["25(OH)D, PTH, celiac serology"],
            link: "bonepain"
          }),
          N("Alcohol use disorder", "adj", {
            s: "Intake ต่ำ, Mg ต่ำ, tubular dysfunction, refeeding",
            why: "มักมีหลายกลไกร่วม FEPO4 อาจสูงจาก tubular toxicity",
            keys: ["Mg ต่ำ, K ต่ำ"],
            ix: ["Mg, ethanol history"]
          })
        ])
      ]),
      N("FEPO4 > 5% or TmP/GFR low: renal phosphate wasting", "step", {
        s: "ไตตั้ง threshold PO4 ต่ำ แยกด้วย proximal defect อื่น, PTH, FGF23 และ 1,25(OH)2D",
        keys: ["ลำดับตาม Florenzano 2020: PTH ก่อน แล้ว FGF23", "PTH สูง = hyperparathyroidism", "PTH ปกติ + FGF23 > 27 pg/mL, 1,25(OH)2D ต่ำหรือปกติ = FGF23-mediated", "FGF23 ต่ำ + proximal defect หลายอย่าง = Fanconi", "FGF23 ต่ำ + isolated, 1,25(OH)2D สูง, hypercalciuria = NaPi-2c หรือ NaPi-2a defect"],
        ix: ["Urine glucose, amino acids, β2M, PTH, intact FGF23, 1,25(OH)2D, urine Ca"]
      }, [
        N("PTH high", "step", {
          s: "PTH ลด NaPi-2a",
          keys: ["Ca สูง = primary", "Ca ต่ำหรือปกติและ 25(OH)D ต่ำ = secondary", "PTH สูงไม่ตัด FGF23-mediated เพราะ XLH และ TIO มัก PTH สูงเล็กน้อยจาก 1,25(OH)2D ต่ำ ถ้า Ca ไม่สูงและ 25(OH)D เพียงพอให้วัด FGF23 ต่อ"],
          ix: ["Ca, 25(OH)D, intact FGF23 เมื่อ PTH อธิบายไม่ได้ทั้งหมด"]
        }, [
          N("Primary hyperparathyroidism", "nephro", {
            s: "Ca สูง PTH สูง PO4 ต่ำหรือปกติต่ำ",
            why: "Cl/PO4 ratio > 33 สนับสนุน",
            keys: ["Ca สูง PTH สูง"],
            ix: ["CCCR, neck imaging"],
            link: "hyperca"
          }),
          N("Vitamin D deficiency with PTH-driven phosphaturia", "adj", {
            s: "25(OH)D ต่ำทำ PTH สูงและ PO4 wasting",
            why: "แก้ vitamin D แล้ว PO4 กลับปกติ",
            keys: ["25(OH)D < 12-20 ng/mL", "Ca ปกติต่ำ"],
            ix: ["25(OH)D"]
          })
        ]),
        N("PTH normal, intact FGF23 > 27 pg/mL: FGF23-mediated", "step", {
          s: "FGF23 ลด NaPi-2a, NaPi-2c และกด 1α-hydroxylase",
          why: "1,25(OH)2D ต่ำหรือปกติไม่เหมาะสมเป็นลายเซ็นของ FGF23 excess",
          keys: ["Intact FGF23 > 27 pg/mL ขณะ PO4 ต่ำ", "1,25(OH)2D ต่ำหรือปกติ", "Urine Ca ต่ำหรือปกติ"],
          ix: ["Family history, onset age, IV iron history, Ga-68 DOTATATE PET-CT"],
          std: "Hartley IR et al. J Bone Miner Res 2022: intact FGF23 > 27 pg/mL ขณะ PO4 ต่ำ แยก FGF23-mediated ได้ด้วย sensitivity และ specificity 100% ใน cohort ของผู้วิจัย (assay เดียว ยังต้อง validate กับ assay อื่น)"
        }, [
          N("X-linked hypophosphatemia", "nephro", {
            s: "PHEX, rickets, ขาโก่ง, dental abscess, enthesopathy ในผู้ใหญ่",
            why: "Burosumab เป็นการรักษาที่ตรงกลไก",
            keys: ["Onset เด็ก", "Family history (X-linked dominant) แต่ราว 20-30% เป็น de novo จึงไม่มีประวัติครอบครัวก็ไม่ตัด XLH"],
            ix: ["PHEX genetic test"],
            std: "Haffner D et al. International XLH clinical practice recommendations, Nat Rev Nephrol 2025"
          }),
          N("Tumor-induced osteomalacia", "nephro", {
            s: "Phosphaturic mesenchymal tumor ขนาดเล็ก",
            why: "Adult-onset ไม่มีประวัติครอบครัว ถ้าหาก้อนพบและตัดออกได้หมดจะหายขาด",
            keys: ["Onset ผู้ใหญ่, ปวดกระดูก, fracture", "FGF23 สูงมาก"],
            ix: ["Ga-68 DOTATATE PET-CT, selective venous sampling FGF23"],
            link: "bonepain"
          }),
          N("Ferric carboxymaltose-induced", "nephro", {
            s: "Carbohydrate moiety ยับยั้ง FGF23 cleavage",
            why: "Hypophosphatemia (PO4 < 2 mg/dL) พบราว 74% หลัง FCM ใน PHOSPHARE-IDA และทำ osteomalacia ได้เมื่อให้ซ้ำหลายครั้ง",
            keys: ["IV iron ภายใน 2-8 สัปดาห์"],
            ix: ["Iron infusion history"],
            std: "Wolf M et al. PHOSPHARE-IDA trials, JAMA 2020: hypophosphatemia ราว 74% (FCM) vs 8% (ferric derisomaltose)"
          }),
          N("ADHR, ARHR and post-KT", "nephro", {
            s: "FGF23 R176/R179 (ADHR), DMP1, ENPP1, post-transplant",
            why: "ADHR กำเริบเมื่อ iron deficiency, post-KT มี FGF23 ค้างร่วม tertiary HPT",
            keys: ["ADHR: iron deficiency trigger", "Post-KT: PO4 ต่ำมากสุดในช่วง 3 เดือนแรก ส่วนใหญ่ดีขึ้นภายใน 1 ปี"],
            ix: ["Ferritin, genetic test, PTH"]
          })
        ]),
        N("PTH normal, FGF23 low, generalized proximal defect", "step", {
          s: "Glucosuria ขณะ glucose ปกติ, aminoaciduria, LMW proteinuria, uricosuria, pRTA",
          keys: ["≥ 2 proximal defects"],
          ix: ["Serum FLC, tenofovir history, urine cystine, genetic panel"],
          link: "tubulopathy"
        }, [
          N("Fanconi syndrome", "nephro", {
            s: "Light chain proximal tubulopathy, tenofovir (TDF), ifosfamide, cisplatin, deferasirox, valproate, Dent, cystinosis, Wilson, heavy metal",
            why: "ผู้ใหญ่ที่เป็น Fanconi ให้ตรวจ serum FLC และ immunofixation โดยค้นละเอียดขึ้นเมื่อไม่มียาอธิบายหรือหยุดยาแล้วไม่ดีขึ้น",
            keys: ["Normoglycemic glucosuria", "LMW proteinuria", "Hypouricemia, pRTA"],
            ix: ["Serum FLC, bone marrow, kidney biopsy ตามข้อบ่งชี้"],
            link: "tubulopathy"
          })
        ]),
        N("PTH normal, FGF23 low, isolated PO4 wasting with high 1,25(OH)2D and hypercalciuria", "step", {
          s: "Primary NaPi-2c หรือ NaPi-2a defect, FGF23 ถูกกดถูกต้อง",
          keys: ["1,25(OH)2D สูง", "Hypercalciuria, nephrocalcinosis"],
          ix: ["SLC34A3, SLC34A1 genetic test"]
        }, [
          N("Hereditary hypophosphatemic rickets with hypercalciuria", "nephro", {
            s: "SLC34A3 (NaPi-2c), SLC34A1",
            why: "ห้ามให้ calcitriol เพราะเพิ่ม hypercalciuria ให้ PO4 อย่างเดียว",
            keys: ["Urine Ca สูง", "PTH ต่ำหรือปกติต่ำ (ถูกกดจาก 1,25(OH)2D สูง)"],
            ix: ["Genetic test"]
          })
        ]),
        N("Osmotic diuresis and volume expansion", "adj", {
          s: "Glucosuria, acetazolamide, saline infusion",
          why: "Proximal reabsorption ลดชั่วคราว",
          keys: ["Glucose สูงหรือได้ saline มาก"],
          ix: ["Glucose, fluid history"]
        })
      ])
    ]),
    N("Hyperphosphatemia (PO4 > 4.5 mg/dL)", "step", {
      s: "ตัด assay interference แล้วดู eGFR, FEPO4 และ TmP/GFR",
      keys: ["eGFR ต่ำ = ขับไม่ได้", "FEPO4 สูง = load", "TmP/GFR สูง FEPO4 ต่ำ = reabsorption เพิ่ม"],
      ix: ["Cr, FEPO4, TmP/GFR, PTH, Ca, CK, uric acid"]
    }, [
      N("Pseudohyperphosphatemia", "adj", {
        s: "Paraprotein, hyperlipidemia, hemolysis, liposomal amphotericin B, heparin, tPA",
        why: "ไม่มี Ca ต่ำหรือ calcification ตาม",
        keys: ["PO4 สูงโดยไม่มีสาเหตุ", "Ca ปกติ"],
        ix: ["วัดด้วยวิธีอื่นหรือหลัง deproteinization, SPEP"],
        link: "mspike"
      }),
      N("eGFR < 30 or AKI: reduced excretion", "step", {
        s: "PO4 สูงเมื่อ eGFR < 30 แม้ FEPO4 สูงขึ้นชดเชย",
        keys: ["eGFR ต่ำ", "FGF23 และ PTH สูง"],
        ix: ["KDIGO CKD-MBD lab"]
      }, [
        N("Chronic kidney disease", "nephro", {
          s: "PO4 สูงเมื่อ eGFR < 30, FGF23 ขึ้นก่อนตั้งแต่ CKD 2-3",
          why: "ลด PO4 ด้วย diet, binder และ dialysis",
          keys: ["eGFR < 30"],
          ix: ["PTH, Ca, ALP"],
          std: "KDIGO 2017 CKD-MBD update"
        })
      ]),
      N("FEPO4 high with acute load", "step", {
        s: "PO4 เข้าเลือดเร็วกว่าที่ไตขับทัน",
        keys: ["FEPO4 > 15-20%", "CK, uric acid, LDH สูง หรือประวัติ phosphate prep"],
        ix: ["CK, uric acid, LDH, K, drug history"]
      }, [
        N("Tumor lysis syndrome", "nephro", {
          s: "Burkitt, ALL, AML ที่ WBC สูง, bulky lymphoma หลังเริ่มยา",
          why: "Laboratory TLS ต้องมีอย่างน้อย 2 ข้อภายใน 3 วันก่อนถึง 7 วันหลังเริ่ม chemotherapy: PO4 ≥ 4.5 mg/dL ในผู้ใหญ่ (เด็ก ≥ 6.5), K ≥ 6 mEq/L, uric acid ≥ 8 mg/dL, Ca ≤ 7 mg/dL หรือเปลี่ยน 25% จาก baseline",
          keys: ["PO4, K, uric acid สูง Ca ต่ำ"],
          ix: ["LDH, uric acid"],
          std: "Cairo MS, Bishop M. Br J Haematol 2004"
        }),
        N("Acute phosphate nephropathy", "nephro", {
          s: "Oral sodium phosphate bowel prep หรือ phosphate enema",
          why: "Ca-PO4 ตกตะกอนใน tubule ส่วนใหญ่เหลือ CKD ถาวร",
          keys: ["AKI หลัง bowel prep หลายวันถึงหลายเดือน", "PO4 สูง Ca ต่ำเฉพาะช่วงแรก เมื่อตรวจพบ AKI ภายหลัง PO4 และ Ca มักกลับปกติแล้ว จึงไม่ใช้ PO4 ปกติตัดโรค"],
          ix: ["Kidney biopsy: von Kossa-positive Ca-PO4 deposits"]
        }),
        N("Rhabdomyolysis and hemolysis", "nephro", {
          s: "PO4 จาก cell breakdown",
          why: "ร่วม K สูง และ Ca ต่ำช่วงแรก",
          keys: ["CK สูง หรือ LDH, bilirubin สูง haptoglobin ต่ำ"],
          ix: ["CK, hemolysis screen"],
          link: "myalgia"
        }),
        N("Vitamin D intoxication", "adj", {
          s: "PO4 สูงพร้อม Ca สูง",
          why: "Vitamin D เพิ่ม gut absorption ของ PO4",
          keys: ["25(OH)D > 150 ng/mL", "PTH ต่ำ"],
          ix: ["25(OH)D"],
          link: "hyperca"
        })
      ]),
      N("TmP/GFR high, FEPO4 low: increased tubular reabsorption", "step", {
        s: "ไตเก็บ PO4 มากเกิน แยกด้วย PTH, Ca, FGF23 และ IGF-1",
        keys: ["PTH ต่ำ Ca ต่ำ = hypoparathyroidism", "PTH สูง Ca ต่ำ = PHP", "Ca และ PTH ปกติ = FGF23 deficiency หรือ GH excess"],
        ix: ["PTH, Ca, intact และ C-terminal FGF23, IGF-1"]
      }, [
        N("Hypoparathyroidism and PTH resistance", "nephro", {
          s: "TmP/GFR สูง Ca ต่ำ",
          why: "PTH ต่ำหรือ PTH สูงแต่ไตไม่ตอบสนอง",
          keys: ["Ca ต่ำ PO4 สูง"],
          ix: ["ไปที่ approach hypocalcemia"],
          link: "hypoca"
        }),
        N("Familial tumoral calcinosis and acromegaly", "nephro", {
          s: "GALNT3, FGF23, KL loss-of-function, GH excess",
          why: "Intact FGF23 ต่ำแต่ C-terminal FGF23 สูงมากใน GALNT3 และ FGF23 mutation",
          keys: ["Ca และ PTH ปกติ", "Periarticular calcified mass", "IGF-1 สูงใน acromegaly"],
          ix: ["Intact และ C-terminal FGF23, genetic test, IGF-1"]
        })
      ])
    ])
  ])
};

/* ===================== MAGNESIUM ===================== */
LABTREES.mg = {
  panel: [
    "Serum Mg, K, Ca, PO4, HCO3, glucose, Cr",
    "Spot urine Mg และ Cr เพื่อคำนวณ FEMg = (UMg × SCr)/(0.7 × SMg × UCr) × 100 หรือ 24-h urine Mg",
    "Spot urine Ca/Cr และ K/Cr",
    "Blood gas, renin ถ้าคิด salt-losing tubulopathy",
    "Renal ultrasound (nephrocalcinosis, cysts), uric acid, LFT, HbA1c ถ้าคิด HNF1B",
    "Drug review: PPI, thiazide, loop, CNI, cisplatin, EGFR inhibitor, aminoglycoside, amphotericin, foscarnet"
  ],
  pit: [
    "Serum Mg ปกติไม่ตัด Mg deficiency เพราะ Mg ส่วนใหญ่อยู่ในเซลล์และกระดูก",
    "FEMg ต้องวัดก่อนให้ Mg เพราะ Mg ที่ให้ถูกขับทางไตราวครึ่ง",
    "FEMg ใช้ factor 0.7 เพราะ Mg ใน plasma ที่ filter ได้ราว 70%",
    "FEMg 2-4% เป็นช่วงก้ำกึ่ง ให้ดูบริบทและ 24-h urine Mg ร่วม", "Cut-off ของ FEMg ใช้ได้เมื่อ serum Mg ต่ำและ eGFR ปกติ ใน CKD FEMg สูงขึ้นเองตามจำนวน nephron ที่ลดลง"
  ],
  tree: N("Magnesium disorders", "root", {
    s: "FEMg แยก renal กับ extrarenal hypomagnesemia แล้วใช้ urine Ca/Cr แยก DCT defect กับ TAL defect จากนั้นยา, renal imaging และ genetics ไปสู่โรค",
    why: "Urine Ca เปลี่ยนตรงข้ามกันระหว่าง TAL (สูง) กับ DCT (ต่ำ) ทำให้ระบุตำแหน่งของ defect ได้จาก lab สองตัว",
    keys: ["FEMg < 2% = extrarenal", "FEMg > 4% = renal wasting", "Urine Ca/Cr ต่ำ = DCT (Gitelman, thiazide)", "Urine Ca/Cr สูง = TAL (FHHNC, loop, Bartter, ADH1)"],
    ix: ["FEMg, urine Ca/Cr, K, HCO3, renal ultrasound"],
    std: "Elisaf M et al. Magnes Res 1997 (FEMg > 4% renal wasting, < 2% extrarenal), Viering DHHM et al. Genetic causes of hypomagnesemia, Pediatr Nephrol 2017"
  }, [
    N("Hypomagnesemia (Mg < 1.7 mg/dL, 0.7 mmol/L)", "step", {
      s: "FEMg หรือ 24-h urine Mg ก่อนให้ Mg",
      keys: ["FEMg < 2% หรือ 24-h urine Mg < 10 mg = extrarenal", "FEMg > 4% หรือ 24-h urine Mg > 24-30 mg = renal"],
      ix: ["FEMg"]
    }, [
      N("FEMg < 2%, 24-h urine Mg < 10 mg: extrarenal", "step", {
        s: "ไตเก็บ Mg ถูกต้อง",
        keys: ["Urine Mg ต่ำ", "PPI หรือ diarrhea history"],
        ix: ["Drug review, stool volume, lipase"]
      }, [
        N("PPI-induced hypomagnesemia", "adj", {
          s: "ลด intestinal TRPM6 และ TRPM7 absorption",
          why: "ส่วนใหญ่พบหลังใช้ PPI นานกว่า 1 ปี แต่เกิดได้ตั้งแต่ 3 เดือน Mg มักกลับปกติภายใน 1-2 สัปดาห์หลังหยุดยา",
          keys: ["FEMg < 2%", "Hypocalcemia และ hypokalemia ร่วม"],
          ix: ["หยุดหรือเปลี่ยนเป็น H2 blocker แล้ววัดซ้ำ"]
        }),
        N("Diarrhea and malabsorption", "adj", {
          s: "Lower GI fluid Mg สูงถึง 15 mEq/L, short bowel, ileostomy, celiac",
          why: "Steatorrhea ทำ Mg saponification ในลำไส้",
          keys: ["FEMg < 2%", "NAGMA ร่วม"],
          ix: ["Stool fat, celiac serology"],
          link: "diarrhea"
        }),
        N("Acute pancreatitis and hungry bone", "adj", {
          s: "Saponification และ deposition ในกระดูก",
          why: "Ca และ PO4 ต่ำร่วม",
          keys: ["Lipase สูง หรือหลัง parathyroidectomy"],
          ix: ["Lipase, ALP"]
        }),
        N("Familial hypomagnesemia with secondary hypocalcemia", "nephro", {
          s: "TRPM6 ทารกชักใน 2-8 สัปดาห์แรก",
          why: "Defect หลักที่ลำไส้ ร่วม renal leak เล็กน้อย FEMg จึงอาจไม่ต่ำกว่า 2% อย่างที่คาดใน extrarenal loss ต้องให้ Mg ขนาดสูงตลอดชีวิต",
          keys: ["Mg < 0.5 mg/dL ในทารก", "Ca ต่ำ PTH ต่ำ"],
          ix: ["TRPM6 genetic test"]
        })
      ]),
      N("FEMg > 4%, 24-h urine Mg > 24-30 mg: renal wasting", "step", {
        s: "แยกต่อด้วย urine Ca/Cr",
        keys: ["Urine Ca/Cr < 0.2 mmol/mmol = DCT", "Urine Ca/Cr สูง = TAL", "ยาหรือโรคระบบที่ทำ tubular toxicity"],
        ix: ["Urine Ca/Cr, K, HCO3, renal ultrasound"]
      }, [
        N("Urine Ca/Cr low (< 0.2 mmol/mmol): DCT defect", "step", {
          s: "NCC หรือ Kir4.1 หรือ TRPM6 pathway บกพร่อง",
          keys: ["Hypocalciuria", "Hypokalemic alkalosis ใน Gitelman และ EAST"],
          ix: ["Urine diuretic screen, SLC12A3, KCNJ10 genetic test"]
        }, [
          N("Gitelman syndrome", "nephro", {
            s: "SLC12A3, chondrocalcinosis, ตะคริว, QT prolong",
            why: "Hypokalemic alkalosis ร่วม hypocalciuria และ hypomagnesemia",
            keys: ["Urine Ca/Cr < 0.2", "K ต่ำ HCO3 สูง", "Renin สูง BP ปกติหรือต่ำ"],
            ix: ["SLC12A3 genetic test"],
            std: "Blanchard A et al. Kidney Int 2017"
          }),
          N("Thiazide diuretics", "adj", {
            s: "ลด TRPM6 ใน DCT",
            why: "ทำภาพเหมือน Gitelman ก่อนวินิจฉัย Gitelman ต้องซักประวัติยาทุกรายและส่ง urine diuretic screen เมื่อสงสัย surreptitious use",
            keys: ["Urine diuretic screen บวก แต่ผลลบครั้งเดียวไม่ตัดการใช้ยาเป็นช่วงๆ"],
            ix: ["Urine diuretic screen"]
          }),
          N("EAST/SeSAME syndrome", "nephro", {
            s: "KCNJ10: epilepsy, ataxia, sensorineural deafness, tubulopathy",
            why: "Gitelman-like tubulopathy ร่วม neurological features",
            keys: ["Seizure ตั้งแต่ทารก, ataxia, deafness"],
            ix: ["KCNJ10 genetic test"]
          }),
          N("Isolated dominant and recessive hypomagnesemia", "nephro", {
            s: "FXYD2, EGF, CNNM2, KCNA1",
            why: "FXYD2 มี hypocalciuria ส่วน EGF, CNNM2 และ KCNA1 urine Ca ปกติ, CNNM2 มี seizure และ intellectual disability",
            keys: ["Hypomagnesemia เดี่ยว", "Family history"],
            ix: ["Hypomagnesemia gene panel"]
          })
        ]),
        N("Urine Ca/Cr high, nephrocalcinosis: TAL defect", "step", {
          s: "Paracellular Mg และ Ca reabsorption ใน TAL ลด",
          keys: ["Hypercalciuria", "Nephrocalcinosis ใน FHHNC", "Serum Ca ต่ำ + urine Ca สูง = ADH1"],
          ix: ["Renal ultrasound, serum Ca, PTH, CLDN16, CLDN19, CASR genetic test"]
        }, [
          N("FHHNC (CLDN16, CLDN19)", "nephro", {
            s: "Hypomagnesemia, hypercalciuria, nephrocalcinosis",
            why: "eGFR ลดสู่ kidney failure ในวัยรุ่นหรือผู้ใหญ่ตอนต้น, CLDN19 มี ocular defect",
            keys: ["Nephrocalcinosis, eGFR ลดลง", "Serum Ca ปกติ PTH สูงตาม CKD"],
            ix: ["CLDN16, CLDN19 genetic test, eye exam"]
          }),
          N("Loop diuretics and Bartter", "adj", {
            s: "ลด lumen-positive voltage ใน TAL",
            why: "Bartter type 3 (CLCNKB) มี hypomagnesemia ได้ แต่ urine Ca มักปกติหรือต่ำคล้าย Gitelman ส่วน type 1 และ 2 มี hypercalciuria และ Mg มักปกติ",
            keys: ["Hypokalemic alkalosis", "Diuretic screen"],
            ix: ["Urine diuretic screen, Bartter gene panel"]
          }),
          N("ADH1 and hypercalcemia", "nephro", {
            s: "CaSR activation ใน TAL",
            why: "ADH1 มี Ca ต่ำแต่ urine Ca สูง, hypercalcemia ใดๆ ก็ทำ Mg wasting ได้",
            keys: ["ADH1: Ca ต่ำ PTH ต่ำ urine Ca สูง", "Hypercalcemia: Ca สูง"],
            ix: ["CASR genetic test, PTH"],
            link: "hypoca"
          })
        ]),
        N("Variable urine Ca with drug or systemic clue", "step", {
          s: "Tubular toxicity หรือ developmental defect",
          keys: ["ประวัติยา", "Renal cysts, MODY, hyperuricemia, LFT ผิดปกติ ชี้ HNF1B", "Glucosuria หรือ volume expansion"],
          ix: ["Drug review, CNI level, renal ultrasound, HNF1B genetic test"]
        }, [
          N("Calcineurin inhibitors", "nephro", {
            s: "Tacrolimus ลด TRPM6 และ EGF",
            why: "พบบ่อยหลัง KT และสัมพันธ์กับ post-transplant diabetes mellitus (PTDM)",
            keys: ["FEMg สูง", "Tacrolimus level"],
            ix: ["CNI trough"]
          }),
          N("Platinum and EGFR inhibitors", "nephro", {
            s: "Cisplatin (cumulative, ถาวรได้), cetuximab, panitumumab",
            why: "EGFR inhibitor ยับยั้ง EGF ที่กระตุ้น TRPM6",
            keys: ["Onset ระหว่างการรักษามะเร็ง"],
            ix: ["Drug history"]
          }),
          N("Aminoglycoside, amphotericin B, pentamidine, foscarnet", "nephro", {
            s: "Tubular toxin",
            why: "อาจเกิดหลังหยุดยาหลายสัปดาห์",
            keys: ["K และ Ca ต่ำร่วม"],
            ix: ["Drug history"]
          }),
          N("HNF1B nephropathy", "nephro", {
            s: "Renal cysts หรือ hypoplasia, MODY5, hypomagnesemia, hyperuricemia, LFT ผิดปกติ, genital anomaly",
            why: "Hypomagnesemia ร่วม cysts และ diabetes เป็นลายเซ็นที่ควรส่ง genetics",
            keys: ["Renal cysts", "HbA1c สูง, uric acid สูง"],
            ix: ["HNF1B genetic test รวม deletion analysis"]
          }),
          N("Uncontrolled diabetes and alcohol", "adj", {
            s: "Glucosuria, insulin resistance, alcohol tubular effect",
            why: "Mg ต่ำทำ insulin resistance แย่ลง",
            keys: ["Glucose สูง", "Ethanol history"],
            ix: ["HbA1c"]
          }),
          N("Volume expansion and recovery ATN", "nephro", {
            s: "Saline infusion, diuretic phase ของ ATN, post-obstructive diuresis",
            why: "Proximal และ TAL reabsorption ลดชั่วคราว",
            keys: ["Polyuria"],
            ix: ["Fluid balance"]
          })
        ])
      ])
    ]),
    N("Hypermagnesemia (Mg > 2.6 mg/dL)", "step", {
      s: "ส่วนใหญ่มี Mg load ร่วมกับ eGFR ต่ำ แต่ load ปริมาณมาก (MgSO4 IV, Epsom salt, ยาระบาย Mg ในผู้ที่ท้องผูกหรือ bowel obstruction) ทำ Mg สูงได้แม้ eGFR ปกติ",
      keys: ["eGFR ต่ำ", "Mg load", "CCCR ต่ำและ Mg ปกติสูงชี้ FHH"],
      ix: ["Cr, drug history, Ca, CCCR"]
    }, [
      N("Mg-containing laxatives, antacids and enemas in CKD", "nephro", {
        s: "Milk of magnesia, MgSO4 enema, Mg citrate bowel prep",
        why: "Mg 4.8-7.2 mg/dL (4-6 mEq/L) คลื่นไส้ flushing reflex ลดลง, 7.2-12 mg/dL (6-10 mEq/L) reflex หาย hypotension bradycardia ซึม, > 12 mg/dL (> 10 mEq/L) respiratory paralysis และ complete heart block",
        keys: ["eGFR ต่ำ", "ประวัติยาระบาย"],
        ix: ["Drug history, ECG"]
      }),
      N("MgSO4 therapy in preeclampsia", "adj", {
        s: "Therapeutic range 4.8-8.4 mg/dL",
        why: "ติดตาม patellar reflex และ urine output",
        keys: ["Toxicity เสี่ยงเมื่อ preeclampsia มี AKI หรือ oliguria ร่วม"],
        ix: ["Mg level ตาม protocol"]
      }),
      N("Other causes", "adj", {
        s: "Lithium, FHH, adrenal insufficiency, hypothyroidism, TLS",
        why: "มักทำ Mg สูงเล็กน้อย",
        keys: ["Mg สูงเล็กน้อย"],
        ix: ["Lithium level, CCCR, cortisol, TSH"]
      })
    ])
  ])
};
