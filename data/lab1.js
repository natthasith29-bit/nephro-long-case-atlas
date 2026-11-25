/* Lab work-up flows part 1 (Nov 2026): sodium and potassium.
   Second view of an approach page: start from the full electrolyte work-up and follow lab branch points
   to an individual diagnosis. Same node schema as data/p1.js. In this view keys = expected lab pattern,
   ix = next test and confirmation. Each LABTREES entry: panel (send together before treatment),
   pit (interpretation pitfalls), tree. */
window.LABTREES = window.LABTREES || {};

/* ===================== HYPONATREMIA ===================== */
LABTREES.hypona = {
  panel: [
    "Serum Na, K, Cl, HCO3, glucose, BUN, Cr, uric acid, albumin, total protein, triglyceride",
    "Measured serum osmolality (เทียบ calculated osm = 2Na + glucose/18 + BUN/2.8 เพื่อหา osmolal gap)",
    "Spot urine osm, Na, K, Cl, Cr, uric acid ส่งพร้อม serum ก่อนให้ saline หรือ diuretic",
    "TSH, free T4 และ 8 AM cortisol (cosyntropin test ถ้า cortisol ก้ำกึ่ง)",
    "ถ้าวัด Na ด้วย indirect ISE และ TG หรือ protein สูง ให้วัดซ้ำด้วย direct ISE (blood gas analyzer)",
    "Copeptin ถ้ามี ช่วยแยก primary polydipsia และ volume depletion แต่ไม่จำเป็นต่อการวินิจฉัย"
  ],
  pit: [
    "Urine Na แปลเป็น volume status ไม่ได้ถ้าได้ diuretic ภายใน 24-48 ชั่วโมงหรือมี CKD ในผู้ได้ diuretic ให้ใช้ FEurate แทน (> 12% ชี้ SIAD) แต่ใน CKD FEurate สูงขึ้นเองเมื่อ GFR ลด จึงใช้ cut-off นี้ใน CKD ไม่ได้",
    "การประเมิน volume ทางคลินิกมี sensitivity ราวครึ่งเดียว ESE 2014 จึงให้ urine osm และ urine Na นำก่อน volume status",
    "Urine osm > 100 ยังไม่ใช่ SIAD จนกว่าจะตัด diuretic, adrenal insufficiency, hypothyroidism และ CKD",
    "Urea และ ethanol เพิ่ม measured osm แต่ไม่ใช่ effective osmole จึงยังถือเป็น hypotonic",
    "ถ้าให้ 0.9% NaCl ไปแล้ว Na ลดลงอีก ให้นึกถึง SIAD ที่ urine osm สูงกว่า osm ของ 0.9% NaCl (308 mOsm/kg) หรือ urine (Na + K) > 154 mmol/L (desalination)"
  ],
  tree: N("Hyponatremia (Na < 135 mmol/L)", "root", {
    s: "Serum osm แยก hypotonic, urine osm แยก maximal dilution, urine Na แยก low effective volume จาก natriuresis แล้วจึงใช้ ECF, diuretic, cortisol, TSH ไปสู่ diagnosis",
    why: "ESE/ESICM/ERA-EDTA 2014 algorithm ใช้ lab นำทุก step เพราะ volume status ทางคลินิกไม่แม่น การเรียง lab ให้ครบจึงเป็นสิ่งที่ examiner ให้คะแนน",
    keys: ["Step 1 serum osm < 275 mOsm/kg = hypotonic", "Step 2 urine osm ≤ 100 = water excess with maximal dilution", "Step 3 urine Na ≤ 30 = low effective arterial volume", "Step 4 urine Na > 30 แยกด้วย diuretic or CKD, ECF, cortisol, TSH"],
    ix: ["Serum osm, glucose, urine osm, urine Na ก่อนการรักษา", "FEurate, BUN, uric acid ใช้ยืนยัน SIAD"],
    std: "Spasovski G et al. ESE/ESICM/ERA-EDTA clinical practice guideline on hyponatraemia, Eur J Endocrinol 2014, Verbalis JG et al. US expert panel, Am J Med 2013"
  }, [
    N("Serum osm ≥ 275 mOsm/kg: non-hypotonic", "step", {
      s: "Hypertonic หรือ isotonic hyponatremia รักษาที่สาเหตุ ไม่ใช้ fluid restriction หรือ hypertonic saline แบบ hypotonic hyponatremia ยกเว้น measured osm สูงจาก urea หรือ ethanol (ineffective osmole) ซึ่งยังเป็น hypotonic และต้องเดิน hypotonic branch",
      why: "Solute อื่นดึงน้ำออกจากเซลล์ (hypertonic) หรือ assay error (pseudo) การรักษาจึงต่างจาก hypotonic ทั้งหมด",
      keys: ["Glucose สูง", "Osmolal gap > 10 mOsm/kg โดย glucose ปกติ ชี้ exogenous osmole", "Direct ISE Na ปกติ ชี้ pseudohyponatremia"],
      ix: ["Measured serum osm", "Glucose, TG, total protein", "Direct ISE Na บน blood gas"]
    }, [
      N("Hyperglycemia (translocational shift of water)", "adj", {
        s: "Glucose ดึงน้ำออกจากเซลล์ Na ลดราว 2.4 mmol/L ต่อ glucose ที่เพิ่ม 100 mg/dL",
        why: "Corrected Na ที่สูงบอก free water deficit จริงที่จะเผยเมื่อ glucose ลด",
        keys: ["Measured osm > 295", "Corrected Na = Na + 2.4 × (glucose − 100)/100"],
        ix: ["Ketone, blood gas ถ้าคิด DKA หรือ HHS"],
        std: "Hillier TA et al. Am J Med 1999 (correction factor 2.4)"
      }),
      N("Exogenous osmoles: mannitol, contrast, IVIG with sucrose", "adj", {
        s: "Osmolal gap สูงโดย glucose และ ethanol ไม่อธิบาย",
        why: "Osmole ที่อยู่นอกเซลล์ทำ hypertonic hyponatremia ระวัง AKI จาก mannitol หรือ sucrose",
        keys: ["Osmolal gap > 10-15 mOsm/kg", "ประวัติได้ mannitol หรือ IVIG"],
        ix: ["Measured osm ซ้ำ, Cr"]
      }),
      N("Glycine and sorbitol irrigation (TURP, hysteroscopy)", "adj", {
        s: "ดูดซึม irrigant ระหว่างผ่าตัด osm อาจปกติหรือต่ำเล็กน้อย",
        why: "Glycine เมตาบอลิซึมได้ ammonia ทำ encephalopathy และ visual disturbance แม้ Na ไม่ต่ำมาก",
        keys: ["Osmolal gap สูงทันทีหลังผ่าตัด", "Ammonia สูง"],
        ix: ["Measured osm, ammonia"]
      }),
      N("Pseudohyponatremia", "adj", {
        s: "Indirect ISE ต่ำเท็จเมื่อ water fraction ของ plasma ลด",
        why: "ห้ามแก้ Na เพราะ tonicity ปกติ",
        keys: ["Measured osm ปกติ", "TG สูงมาก, paraprotein (total protein > 10 g/dL), lipoprotein X ใน cholestasis", "Direct ISE Na ปกติ"],
        ix: ["Direct ISE Na", "SPEP, immunofixation, serum FLC ถ้า protein สูง"],
        link: "mspike"
      }),
      N("Advanced azotemia and ethanol (ineffective osmoles)", "adj", {
        s: "Measured osm สูงจาก urea หรือ ethanol แต่ effective osm ต่ำ",
        why: "Urea และ ethanol ผ่านเยื่อเซลล์ได้ จึงต้องกลับไปเดิน algorithm ของ hypotonic",
        keys: ["Effective osm = 2Na + glucose/18 < 275", "BUN สูงมากหรือ ethanol level สูง"],
        ix: ["คำนวณ effective osm แล้วเดิน hypotonic branch"]
      })
    ]),
    N("Hypotonic, urine osm ≤ 100 mOsm/kg: maximal dilution", "step", {
      s: "ADH ถูกกดอย่างเหมาะสม ปัญหาคือ water intake เกิน solute excretion",
      why: "Free water excretion สูงสุดราว urine osmolar excretion หารด้วย urine osm ต่ำสุดที่ไตทำได้ (50-100 mOsm/kg) จึงต้องดู solute intake คู่กับปริมาณน้ำ",
      keys: ["Urine osm ≤ 100 mOsm/kg", "Urine osmolar excretion (urine osm × urine volume) แยก polydipsia กับ low solute"],
      ix: ["24-h urine volume และ urine osm", "BUN, uric acid ต่ำในทั้งสองกลุ่ม"],
      std: "ESE 2014: urine osm ≤ 100 mOsm/kg ชี้ excess water intake"
    }, [
      N("Primary polydipsia", "adj", {
        s: "ดื่มน้ำเกินความสามารถในการขับ solute ปกติ",
        why: "Urine osmolar excretion ปกติ (600-900 mOsm/d) แต่ปริมาณน้ำมากกว่า 12-15 L/d จึงเกินขีดขับน้ำ",
        keys: ["Urine volume สูงมาก", "Urine osmolar excretion ปกติ", "Copeptin ต่ำสุดในบรรดาสาเหตุ hyponatremia"],
        ix: ["Water intake diary, psychiatric drug review"],
        std: "Fenske W et al. JCEM 2009: copeptin ต่ำใน primary polydipsia"
      }),
      N("Inappropriate parenteral hypotonic fluid", "adj", {
        s: "ให้ 5% dextrose หรือ hypotonic saline ปริมาณมากเกินกว่าที่ขับได้",
        why: "ESE 2014 จัดไว้ในกลุ่ม relative excess water intake ร่วมกับ primary polydipsia และ low solute intake",
        keys: ["Urine osm ≤ 100", "Fluid chart มี hypotonic fluid มาก"],
        ix: ["Fluid balance, หยุด hypotonic fluid"]
      }),
      N("Low solute intake: beer potomania and tea and toast", "adj", {
        s: "Solute intake ต่ำมาก ขับน้ำได้น้อยแม้ปริมาณน้ำไม่มาก",
        why: "Urine osmolar excretion ราว 250 mOsm/d ขับน้ำได้เพียงราว 2.5-5 L/d เสี่ยง overcorrection เมื่อได้อาหารหรือ saline",
        keys: ["Urine osmolar excretion < 250-300 mOsm/d", "BUN ต่ำมาก (< 5-10 mg/dL)", "Urine osm 50-100"],
        ix: ["Nutritional history, K, PO4, Mg"]
      })
    ]),
    N("Urine osm > 100, urine Na ≤ 30 mmol/L: low effective arterial volume", "step", {
      s: "ไตเก็บ Na เพราะ effective arterial blood volume ต่ำ ADH หลั่งแบบ non-osmotic",
      why: "Urine Na ≤ 30 มี sensitivity และ specificity ดีที่สุดสำหรับ low effective volume (ESE 2014) แล้วจึงแยก ECF ขยายกับ ECF หด",
      keys: ["FENa < 0.5%", "FEurea < 35%", "BUN/Cr > 20, uric acid สูง", "Copeptin/urine Na > 30 pmol/mmol สนับสนุน volume depletion"],
      ix: ["NT-proBNP, albumin, LFT, UPCR", "Point-of-care ultrasound (IVC, lung B-lines)"],
      std: "Fenske W et al. JCEM 2009: copeptin to urine Na ratio > 30 pmol/mmol, sens 85%, spec 87%"
    }, [
      N("ECF expanded: edema, ascites or effusion", "step", {
        s: "Total body Na เกินแต่ effective volume ต่ำ",
        keys: ["Edema", "NT-proBNP สูงใน HF", "Albumin ต่ำและ UPCR สูงใน nephrotic"]
      }, [
        N("Heart failure", "adj", {
          s: "Low cardiac output กระตุ้น ADH และ RAAS",
          why: "Na < 130 เป็น prognostic marker ที่แย่",
          keys: ["NT-proBNP สูง", "Urine Na ต่ำถ้าไม่ได้ loop diuretic"],
          ix: ["Echocardiogram"]
        }),
        N("Cirrhosis", "adj", {
          s: "Splanchnic vasodilation ทำ effective volume ต่ำ",
          why: "Na < 130 สัมพันธ์กับ HRS และ refractory ascites, ใช้ MELD-Na",
          keys: ["Albumin ต่ำ, INR สูง, bilirubin สูง", "Urine Na < 10 มักพบ"],
          ix: ["Liver ultrasound, ascitic fluid SAAG"]
        }),
        N("Nephrotic syndrome", "nephro", {
          s: "Underfill ใน MCD ที่ albumin ต่ำมาก",
          why: "ผู้ใหญ่ส่วนใหญ่เป็น overfill จึงมัก Na ปกติ hyponatremia ชี้ albumin ต่ำมากหรือมี diuretic ร่วม",
          keys: ["UPCR > 3.5 g/g", "Albumin < 2 g/dL"],
          ix: ["Kidney biopsy ตามข้อบ่งชี้"],
          link: "nephrotic"
        })
      ]),
      N("ECF reduced: no edema, orthostasis", "step", {
        s: "เสีย Na และน้ำนอกไต หรือเสียทางไตที่หยุดไปแล้ว (remote diuretic) แล้วทดแทนด้วยน้ำเปล่า",
        keys: ["Urine Na < 20-30", "BUN/Cr > 20, Hct และ uric acid สูง"]
      }, [
        N("Extrarenal volume loss", "adj", {
          s: "Diarrhea, vomiting, third spacing (pancreatitis, burns, bowel obstruction), blood loss",
          why: "ไตตอบสนองอย่างเหมาะสม แก้ด้วย isotonic saline ระวัง overcorrection เมื่อ ADH หยุดหลั่ง",
          keys: ["Urine Na < 20", "ถ้ายังอาเจียนอยู่ (bicarbonaturia) urine Na อาจ > 30 ให้ดู urine Cl < 20 แทน"],
          ix: ["Stool volume, ติดตาม urine output และ Na ทุก 2-4 ชั่วโมงหลังให้ saline"]
        }),
        N("Remote diuretic use", "adj", {
          s: "Diuretic หยุดแล้ว urine Na กลับต่ำ",
          why: "ภาพ hypovolemic ร่วมกับ hypokalemia และ alkalosis ที่ urine Cl ต่ำ",
          keys: ["Urine Na และ Cl ต่ำ", "K ต่ำ HCO3 สูง"],
          ix: ["Urine diuretic screen"]
        })
      ])
    ]),
    N("Urine osm > 100, urine Na > 30, on diuretic or CKD", "step", {
      s: "Urine Na สูงอาจมาจากยาหรือไตเสื่อม จึงแปล volume จาก urine Na ไม่ได้",
      why: "ESE 2014 แยก branch นี้ออกก่อนเพราะ diuretic และ CKD ทำให้ urine Na สูงแม้ volume ต่ำ",
      keys: ["FEurate > 12% ชี้ SIAD ร่วม แม้ได้ diuretic", "FEurate ต่ำและ BUN สูงชี้ volume depletion", "Cut-off FEurate ได้จากผู้ใช้ diuretic ที่ไตปกติ ใน CKD FEurate สูงเองจึงแปลไม่ได้"],
      ix: ["FEurate, FEurea", "หยุด thiazide แล้วติดตาม Na"],
      std: "Fenske W et al. JCEM 2008: FEurate > 12% แยก SIAD ในผู้ใช้ diuretic (sens 86%, spec 100%)"
    }, [
      N("Thiazide-associated hyponatremia", "nephro", {
        s: "Thiazide กด diluting segment ที่ DCT และเพิ่ม ADH sensitivity",
        why: "เกิดได้สองแบบ: hypovolemic (urine osm สูง FEurate ต่ำ) หรือภาพเหมือน SIAD (FEurate สูง) ซึ่งการรักษาต่างกัน",
        keys: ["K ต่ำร่วม", "ผู้หญิงสูงอายุ น้ำหนักน้อย", "Recurrence เมื่อ rechallenge"],
        ix: ["FEurate, urine Na ก่อนและหลังหยุดยา"],
        std: "Filippone EJ et al. Thiazide-associated hyponatremia, Am J Med 2020"
      }),
      N("Kidney disease and mineralocorticoid deficiency", "nephro", {
        s: "Advanced CKD, salt-losing nephropathy, hyporeninemic state",
        why: "eGFR < 15-20 ขับ free water ได้น้อย urine osm ใกล้ plasma และ urine Na คงที่",
        keys: ["eGFR ต่ำมาก", "Urine osm 250-350 ไม่เปลี่ยนตามการดื่ม"],
        ix: ["Renin, aldosterone ถ้าคิด hypoaldosteronism"],
        link: "risingcr"
      })
    ]),
    N("Urine osm > 100, urine Na > 30, no diuretic or kidney disease: ECF reduced", "step", {
      s: "เสีย Na ทางไตจริงหรือ Na ถูกพาออกกับ anion อื่น",
      keys: ["Orthostasis, BUN สูง", "Urine Cl ต่ำแต่ urine Na สูงชี้ bicarbonaturia", "K สูงชี้ mineralocorticoid deficiency"],
      ix: ["Urine Cl, urine pH", "Cortisol, ACTH, renin, aldosterone", "FEurate และ FEPO4"]
    }, [
      N("Vomiting with bicarbonaturia", "adj", {
        s: "HCO3 ที่ถูกขับพา Na ออก urine Na สูงทั้งที่ volume ต่ำ",
        why: "ตัวอย่างคลาสสิกที่ urine Cl แม่นกว่า urine Na",
        keys: ["Urine Cl < 20", "Urine pH > 6.5", "HCO3 สูง K ต่ำ"],
        ix: ["Urine Cl, urine pH"]
      }),
      N("Primary adrenal insufficiency", "adj", {
        s: "ขาด aldosterone และ cortisol",
        why: "Hyponatremia ร่วม hyperkalemia ในผู้ป่วย volume ต่ำ ให้เก็บเลือดส่ง cortisol และ ACTH ก่อนให้ steroid แต่ถ้าสงสัย adrenal crisis ให้ hydrocortisone ทันทีโดยไม่รอผล",
        keys: ["K สูง, NAGMA เล็กน้อย", "8 AM cortisol < 5 µg/dL ร่วม ACTH สูง", "Renin สูง aldosterone ต่ำ"],
        ix: ["Cosyntropin 250 µg: peak cortisol < 18 µg/dL (500 nmol/L) ยืนยัน (ค่าจะต่ำลงราว 14-15 µg/dL กับ monoclonal assay)", "21-hydroxylase antibody, adrenal CT"],
        std: "Bornstein SR et al. Endocrine Society primary adrenal insufficiency guideline, JCEM 2016"
      }),
      N("Cerebral and renal salt wasting", "nephro", {
        s: "Natriuresis จริงหลัง SAH, neurosurgery หรือ cisplatin",
        why: "แยกจาก SIAD ด้วยหลักฐาน volume depletion จริงและ FEurate ที่ยังสูงหลังแก้ Na เพราะการรักษาตรงข้ามกัน",
        keys: ["Volume depletion จริง (weight ลด, Hct สูง, CVP ต่ำ)", "FEurate > 11% ที่ยังสูงหลัง Na กลับปกติ (SIAD จะกลับต่ำ)", "FEPO4 สูงร่วมใน renal salt wasting"],
        ix: ["FEurate ซ้ำหลังแก้ Na", "Fluid balance และ weight"],
        std: "Maesaka JK et al. renal salt wasting vs SIADH, Kidney Int 2009 and Am J Med Sci 2020"
      }),
      N("Occult diuretic use", "adj", {
        s: "ผู้ป่วยไม่บอกว่าใช้ diuretic",
        why: "Urine Na และ Cl สูงเป็นช่วงตามเวลาที่ใช้ยา",
        keys: ["Urine Cl ขึ้นลงในหลายตัวอย่าง", "K ต่ำ HCO3 สูง"],
        ix: ["Urine diuretic screen ซ้ำ"]
      })
    ]),
    N("Urine osm > 100, urine Na > 30, no diuretic or kidney disease: ECF normal", "step", {
      s: "Euvolemic hyponatremia: ต้องตัด cortisol deficiency และ hypothyroidism ก่อนสรุป SIAD",
      why: "Glucocorticoid deficiency เลียนแบบ SIAD ทุก lab และให้ผลร้ายแรงถ้าพลาด",
      keys: ["Uric acid < 4 mg/dL, BUN < 10 mg/dL (urea < 3.6 mmol/L หรือ 21.6 mg/dL)", "FENa > 0.5%, FEurea > 55%, FEurate > 12%", "TSH และ cortisol ปกติก่อนสรุป SIAD"],
      ix: ["8 AM cortisol, TSH, free T4", "ถ้าให้ 0.9% NaCl 2 L แล้ว Na ไม่ขึ้นสนับสนุน SIAD (เป็น supplemental criterion ใช้เมื่อ volume status ก้ำกึ่ง ต้องติดตาม Na ถี่เพราะใน SIAD Na อาจลดลง และใน hypovolemia Na อาจขึ้นเร็วเกิน)"]
    }, [
      N("Secondary adrenal insufficiency", "adj", {
        s: "Pituitary disease หรือหยุด glucocorticoid ทำ CRH และ ADH หลั่งมาก",
        why: "Aldosterone ปกติจึงไม่มี hyperkalemia ทำให้แยกจาก SIAD ด้วย lab อื่นไม่ได้",
        keys: ["K ปกติ", "8 AM cortisol < 3 µg/dL (83 nmol/L) วินิจฉัย, > 15 µg/dL น่าจะตัดออกได้, 3-15 µg/dL ต้องทำ stimulation test", "ACTH ต่ำหรือปกติ"],
        ix: ["Cosyntropin test (ปกติเท็จได้ใน 4-6 สัปดาห์แรกหลัง pituitary insult เพราะ adrenal ยังไม่ฝ่อ), pituitary MRI, other pituitary axes"],
        std: "Fleseriu M et al. Endocrine Society hypothalamic-pituitary hormone replacement guideline, JCEM 2016"
      }),
      N("Occult diuretic use (euvolemic presentation)", "adj", {
        s: "ESE 2014 ใส่ occult diuretics ไว้ทั้งใน ECF reduced และ ECF normal",
        why: "Thiazide ทำภาพ euvolemic เหมือน SIAD ได้ ต้องตัดก่อนสรุป",
        keys: ["K ต่ำ HCO3 สูง", "Urine Na และ Cl ขึ้นลงหลายตัวอย่าง"],
        ix: ["Urine diuretic screen"]
      }),
      N("Severe hypothyroidism", "adj", {
        s: "เป็นสาเหตุเฉพาะ myxedema ที่ TSH สูงมาก",
        why: "Hypothyroidism เล็กน้อยไม่ทำ hyponatremia อย่าหยุด work-up ที่ TSH สูงเล็กน้อย",
        keys: ["TSH สูงมาก free T4 ต่ำ", "CK สูง"],
        ix: ["TSH, free T4"]
      }),
      N("SIAD", "nephro", {
        s: "ADH หลั่งเกินโดยไม่มี osmotic หรือ volume stimulus",
        why: "เป็น diagnosis of exclusion ตาม essential criteria แล้วต้องหาสาเหตุต่อทุกครั้ง",
        keys: ["Essential: effective osm < 275, urine osm > 100, euvolemic, urine Na > 30 mmol/L ขณะกินเกลือและน้ำตามปกติ", "ไม่มี diuretic, adrenal, thyroid, pituitary หรือ renal insufficiency", "Supplemental: uric acid < 4 mg/dL, BUN < 10 mg/dL (urea < 21.6 mg/dL), FENa > 0.5%, FEurea > 55%, FEurate > 12%, Na ไม่ขึ้นหลัง 0.9% NaCl, Na ขึ้นเมื่อจำกัดน้ำ"],
        ix: ["Urine/serum electrolyte ratio (UNa + UK)/SNa > 1 ชี้ว่าจำกัดน้ำอย่างเดียวไม่พอ", "CT chest, brain imaging, drug review ตามสาเหตุ"],
        std: "Essential and supplemental SIAD criteria (Schwartz-Bartter, ESE 2014)"
      }, [
        N("Drug-induced SIAD", "adj", {
          s: "SSRI, carbamazepine, oxcarbazepine, cyclophosphamide, vincristine, MDMA, opioid, PPI",
          why: "สาเหตุที่แก้ได้ทันทีโดยหยุดยา",
          keys: ["เริ่มยาในช่วงที่ Na ลด"],
          ix: ["Drug review"]
        }),
        N("Paraneoplastic SIAD", "adj", {
          s: "Small cell lung cancer, head and neck, olfactory neuroblastoma",
          why: "Ectopic ADH ทำ hyponatremia เรื้อรังที่ urine osm สูงมาก",
          keys: ["Urine osm สูงคงที่ > 500", "Smoking, weight loss"],
          ix: ["CT chest, bronchoscopy"]
        }),
        N("CNS, pulmonary and postoperative SIAD", "adj", {
          s: "Meningitis, SAH, stroke, pneumonia, TB, positive pressure ventilation, nausea, pain",
          why: "Non-osmotic ADH stimulus ที่หายเมื่อโรคหลักดีขึ้น",
          keys: ["Onset ตามโรคหลัก"],
          ix: ["Brain imaging, chest imaging"]
        }),
          N("Nephrogenic SIAD and reset osmostat", "nephro", {
            s: "Nephrogenic SIAD จาก AVPR2 gain-of-function หรือ reset osmostat",
            why: "Nephrogenic SIAD มี copeptin ต่ำจนวัดไม่ได้ทั้งที่ภาพเหมือน SIAD, reset osmostat ไม่ต้องรักษา",
            keys: ["NSIAD: copeptin หรือ ADH ต่ำมาก", "Reset osmostat: Na คงที่ 125-130, ขับน้ำได้ปกติหลัง water load"],
            ix: ["Water load 20 mL/kg: reset osmostat ขับได้ > 80% ใน 4 ชั่วโมงและ urine osm < 100", "AVPR2 genetic test"]
          }),
          N("Exercise-associated hyponatremia", "adj", {
            s: "Marathon และ ultra-endurance ที่ดื่มน้ำเกินร่วมกับ non-osmotic ADH",
            why: "Acute hyponatremia เสี่ยง cerebral edema ให้ hypertonic saline ได้เร็ว",
            keys: ["น้ำหนักเพิ่มหลังแข่ง", "Onset ภายในชั่วโมง"],
            ix: ["Na ซ้ำ, ติดตามอาการทางสมอง"]
          })
      ])
    ])
  ])
};

/* ===================== HYPERNATREMIA ===================== */
LABTREES.hyperna = {
  panel: [
    "Serum Na, K, Ca, glucose, BUN, Cr, serum osm",
    "Urine osm, Na, K, urea, glucose ส่งพร้อมกัน",
    "Urine volume ต่อ 24 ชั่วโมง เพื่อคำนวณ urine osmolar excretion (urine osm × volume)",
    "Electrolyte-free water clearance = V × [1 − (UNa + UK)/SNa]",
    "Copeptin (ไม่ต้องอดน้ำเพราะผู้ป่วย hypernatremic อยู่แล้ว)",
    "Desmopressin challenge (1-2 µg IV หรือ SC) แล้ววัด urine osm ทุก 1-2 ชั่วโมง"
  ],
  pit: [
    "ผู้ป่วยที่ Na > 145 อยู่แล้วไม่ต้องทำ water deprivation test ให้ใช้ urine osm และ desmopressin ได้ทันที",
    "Partial AVP deficiency และ partial resistance อาจให้ urine osm 300-600 คล้าย solute diuresis จึงต้องคำนวณ osmolar excretion ก่อน",
    "Saline diuresis ทำ urine Na สูงแต่ถ้า (UNa + UK) < SNa ยังเสีย free water",
    "Hypercalcemia และ hypokalemia ต้องแก้ก่อนสรุป nephrogenic DI ถาวร"
  ],
  tree: N("Hypernatremia (Na > 145 mmol/L)", "root", {
    s: "Urine osm และ urine volume แยก renal concentrating ปกติกับ polyuria แล้วใช้ osmolar excretion, desmopressin และ copeptin แยก AVP deficiency, AVP resistance และ solute diuresis",
    why: "Hypernatremia เกิดเมื่อเสียน้ำร่วมกับเข้าถึงน้ำไม่ได้ lab บอกว่าน้ำเสียทางไหน",
    keys: ["Urine osm > 600-800 = ไตเก็บน้ำได้ ปัญหาอยู่นอกไต", "Urine osm < 300 ร่วม polyuria = AVP deficiency หรือ resistance", "Urine osm 300-600 ร่วม polyuria = solute diuresis หรือ partial DI"],
    ix: ["Urine osm, urine volume, osmolar excretion, desmopressin response, copeptin"],
    std: "Christ-Crain M et al. Diabetes insipidus, Nat Rev Dis Primers 2019, AVP deficiency and resistance nomenclature 2022"
  }, [
    N("Urine osm > 600-800 mOsm/kg, low urine volume: extrarenal loss or low intake", "step", {
      s: "ADH และไตทำงานปกติ ปัญหาคือ water intake ไม่พอกับ loss หรือ Na gain",
      why: "Urine Na แยก Na gain (สูง) จาก water loss (ต่ำ)",
      keys: ["Urine volume < 500 mL/d (ยกเว้น Na gain ที่ urine volume ไม่ต่ำเพราะมี natriuresis)", "Urine Na < 25 ชี้ water loss", "Urine Na > 100 ร่วม weight เพิ่ม ชี้ Na gain"],
      ix: ["Urine Na, fluid balance, weight"]
    }, [
      N("Impaired thirst or access", "adj", {
        s: "ผู้สูงอายุ dementia, stroke, intubated, adipsia จาก hypothalamic lesion",
        why: "สาเหตุที่พบบ่อยที่สุดในโรงพยาบาล adipsic hypernatremia ต้องหา hypothalamic lesion",
        keys: ["Urine osm สูง urine Na ต่ำ", "Adipsia: ไม่กระหายแม้ Na > 150"],
        ix: ["Brain MRI ถ้ารู้สึกตัวดีและเข้าถึงน้ำได้แต่ไม่กระหายทั้งที่ Na สูง (adipsia)"]
      }),
      N("GI loss of hypotonic fluid", "adj", {
        s: "Osmotic diarrhea (lactulose, viral), NG drainage",
        why: "Stool ของ osmotic diarrhea มี Na + K ต่ำกว่า plasma จึงเสีย free water",
        keys: ["Stool Na + K < 70-80 mmol/L", "Stool osm gap > 100"],
        ix: ["Stool electrolytes"]
      }),
      N("Skin and respiratory loss", "adj", {
        s: "ไข้ burns เหงื่อ hyperventilation",
        why: "Insensible loss เพิ่มราว 10% ต่ออุณหภูมิที่เพิ่ม 1 °C",
        keys: ["Urine osm สูง urine Na ต่ำ"],
        ix: ["Fluid balance"]
      }),
      N("Sodium gain", "adj", {
        s: "Hypertonic saline, NaHCO3, salt poisoning, dialysate error, primary aldosteronism",
        why: "Total body Na เกิน ต้องให้น้ำร่วมกับ loop diuretic หรือ dialysis",
        keys: ["Urine Na > 100 mmol/L", "Weight เพิ่ม edema", "FENa สูง"],
        ix: ["Urine Na, dialysate Na check"]
      })
    ]),
    N("Urine osm < 300 with polyuria: AVP deficiency or resistance", "step", {
      s: "Urine ไม่เข้มข้นทั้งที่ plasma hypertonic",
      why: "Desmopressin response และ copeptin แยก deficiency กับ resistance ได้โดยไม่ต้องอดน้ำ",
      keys: ["Urine volume > 3 L/d หรือ > 40-50 mL/kg/d", "Urine osm < 300 ขณะ Na > 145"],
      ix: ["Desmopressin 1-2 µg IV/SC แล้ววัด urine osm", "Copeptin baseline"],
      std: "Timper K et al. JCEM 2015: baseline copeptin > 21.4 pmol/L วินิจฉัย nephrogenic DI โดยไม่ต้องอดน้ำ"
    }, [
      N("Urine osm rises > 50% after desmopressin, copeptin low: AVP deficiency", "step", {
        s: "Posterior pituitary ไม่หลั่ง AVP แต่ไตตอบสนอง",
        keys: ["Urine osm เพิ่ม > 50% หลัง desmopressin", "Copeptin ต่ำเมื่อเทียบกับ Na"],
        ix: ["Pituitary MRI (bright spot หาย, stalk thickening)"]
      }, [
        N("AVP deficiency (central DI)", "adj", {
          s: "Idiopathic autoimmune, post-surgery (triphasic), trauma, craniopharyngioma, germinoma, LCH, sarcoid, IgG4, Sheehan",
          why: "Partial AVP deficiency อาจเพิ่มเพียง 10-50% ต้องใช้ hypertonic saline-stimulated copeptin ถ้าไม่ชัด",
          keys: ["Urine osm เพิ่ม > 50%", "Hypertonic saline-stimulated copeptin ≤ 4.9 pmol/L เมื่อ Na ≥ 150 mmol/L"],
          ix: ["Pituitary MRI, anterior pituitary hormones, β-hCG และ AFP ใน CSF ถ้าคิด germinoma"],
          std: "Fenske W et al. NEJM 2018: hypertonic saline-stimulated copeptin cut-off 4.9 pmol/L"
        }),
        N("Gestational DI", "adj", {
          s: "Placental vasopressinase ในไตรมาส 3",
          why: "Vasopressinase ทำลาย AVP แต่ไม่ทำลาย desmopressin จึงตอบสนองต่อ desmopressin",
          keys: ["ตั้งครรภ์ไตรมาส 3", "AST, ALT สูงถ้ามี AFLP หรือ HELLP"],
          ix: ["LFT, platelet"]
        })
      ]),
      N("Urine osm rises < 50% (often < 10-15%), copeptin > 21.4 pmol/L: AVP resistance", "step", {
        s: "AVP สูงแต่ไตไม่ตอบสนอง",
        keys: ["Copeptin baseline > 21.4 pmol/L", "Urine osm แทบไม่เปลี่ยนหลัง desmopressin (< 10% ใน complete resistance, ถ้าเพิ่ม 10-50% ทับซ้อนกับ partial AVP deficiency ต้องใช้ copeptin แยก)"],
        ix: ["Ca, K, lithium level, renal ultrasound"]
      }, [
        N("Lithium-induced AVP resistance", "nephro", {
          s: "Lithium เข้า principal cell ผ่าน ENaC ลด AQP2",
          why: "เกิดได้แม้ lithium level ปกติ และอาจไม่หายหลังหยุดยา",
          keys: ["ใช้ lithium นาน", "อาจมี hypercalcemia จาก lithium HPT ร่วม"],
          ix: ["Lithium level, Ca, PTH, eGFR"],
          std: "Amiloride ลด lithium entry"
        }),
        N("Electrolyte-induced AVP resistance", "nephro", {
          s: "Hypercalcemia (> 11 mg/dL) และ hypokalemia เรื้อรัง",
          why: "แก้ได้เมื่อแก้ Ca หรือ K",
          keys: ["Ca สูงหรือ K ต่ำต่อเนื่อง"],
          ix: ["ไปที่ approach hypercalcemia หรือ hypokalemia"],
          link: "hyperca"
        }),
        N("Tubulointerstitial and post-obstructive", "nephro", {
          s: "Sickle cell, amyloid, Sjögren, obstruction relief, recovery ATN, ifosfamide, foscarnet",
          why: "Medullary injury ทำลาย concentrating gradient",
          keys: ["Tubular proteinuria, NAGMA, hyperkalemia ร่วม", "หลังแก้ obstruction หรือ recovery ATN"],
          ix: ["Renal ultrasound, urine β2-microglobulin"]
        }),
        N("Congenital nephrogenic DI", "nephro", {
          s: "AVPR2 (X-linked, ชาย) หรือ AQP2 (AR และ AD)",
          why: "Polyuria ตั้งแต่ทารก, hydronephrosis และ megabladder จาก urine ปริมาณมาก",
          keys: ["Onset ทารก", "Copeptin สูงมาก"],
          ix: ["AVPR2, AQP2 genetic test, renal and bladder ultrasound"]
        })
      ])
    ]),
    N("Urine osm 300-600 with polyuria: solute diuresis or partial DI", "step", {
      s: "คำนวณ urine osmolar excretion ก่อนเสมอ",
      why: "Osmolar excretion > 1,000 mOsm/d ชี้ solute diuresis แล้วดูว่า solute คืออะไร ถ้าปกติให้คิด partial DI",
      keys: ["Urine osmolar excretion > 1,000 mOsm/d", "Urine glucose, urea, 2 × (Na + K) บอกว่า solute ใดเด่น"],
      ix: ["24-h urine volume, osm, Na, K, urea, glucose", "Electrolyte-free water clearance"]
    }, [
      N("Glucose and mannitol diuresis", "adj", {
        s: "Uncontrolled DM, HHS, SGLT2i, mannitol",
        why: "Glucose ใน urine ดึงน้ำออก ทำ hypernatremia เมื่อดื่มน้ำไม่พอ",
        keys: ["Urine glucose สูง", "Urine osm สูงกว่า 2 × (UNa + UK) + urea มาก แปลว่ามี solute อื่น (glucose หรือ mannitol)"],
        ix: ["Glucose, HbA1c"]
      }),
      N("Urea diuresis", "nephro", {
        s: "High-protein tube feed, steroid catabolism, GI bleed, recovery AKI",
        why: "Urea เป็น solute หลักของ urine ทำ water loss ที่มักถูกมองข้ามใน ICU",
        keys: ["Urine urea คิดเป็น > 50-60% ของ urine osm", "BUN เพิ่มขึ้น"],
        ix: ["Urine urea, BUN trend, protein intake"]
      }),
      N("Saline diuresis", "nephro", {
        s: "Normal saline ปริมาณมาก",
        why: "Urine Na สูงแต่ (UNa + UK) < SNa ทำให้ electrolyte-free water clearance เป็นบวก",
        keys: ["2 × (UNa + UK) อธิบาย urine osm ส่วนใหญ่", "EFWC > 0"],
        ix: ["คำนวณ EFWC"]
      }),
      N("Partial AVP deficiency or resistance", "step", {
        s: "Osmolar excretion ปกติแต่ urine osm ไม่สูงพอ",
        keys: ["Urine osmolar excretion < 1,000 mOsm/d"],
        ix: ["Desmopressin test, copeptin, กลับไปที่ branch urine osm < 300"]
      })
    ])
  ])
};

/* ===================== HYPOKALEMIA ===================== */
LABTREES.hypok = {
  panel: [
    "Serum K ซ้ำ (plasma แยกทันที), Mg, Ca, PO4, glucose, Cr, CK",
    "Venous blood gas, Na, Cl, HCO3, anion gap",
    "Spot urine K, Cr, Na, Cl, osm, pH, Ca ส่งก่อนให้ K หรือ diuretic",
    "Urine anion gap และ urine osmolal gap ถ้ามี metabolic acidosis",
    "Plasma renin และ aldosterone (เก็บตอนเช้า หลังนั่ง 5-15 นาที, K ต้องแก้ก่อน) ถ้ามี HTN หรือ renal loss ร่วม alkalosis",
    "TSH, free T4 ถ้ามี paralysis, urine diuretic screen ถ้า alkalosis ไม่ทราบสาเหตุ"
  ],
  pit: [
    "Urine K/Cr แปลได้เฉพาะก่อนให้ K และขณะไม่มี diuretic ฤทธิ์อยู่",
    "TTKG ไม่ใช้แล้วเพราะ urea recycling ใน medulla ทำให้ assumption ผิด (Kamel และ Halperin)",
    "Urine K/Cr ระหว่าง periodic paralysis ต่ำแม้ K ต่ำมาก อย่าแปลว่า GI loss",
    "Hypomagnesemia ทำให้แก้ K ไม่ขึ้น ต้องวัด Mg ทุกราย",
    "Hypokalemia กด aldosterone และทำ ARR ต่ำเท็จ ให้แก้ K ก่อนตรวจ renin และ aldosterone"
  ],
  tree: N("Hypokalemia (K < 3.5 mmol/L)", "root", {
    s: "ตัด spurious แล้วใช้ urine K/Cr แยก renal กับ non-renal จากนั้น acid-base, urine NH4, BP, renin-aldosterone, urine Cl, urine Ca และ Mg ไปสู่โรคเฉพาะ",
    why: "Urine K/Cr เป็น branch point แรกที่สำคัญที่สุด ไตปกติขับ K น้อยกว่า 15-20 mmol/d เมื่อ K ต่ำจากสาเหตุนอกไต",
    keys: ["Urine K/Cr < 1.5 mmol/mmol (< 13 mEq/g) = ไตเก็บ K", "Urine K/Cr > 1.5 mmol/mmol = renal K wasting", "แล้วแยกด้วย acid-base", "Alkalosis แยกด้วย BP และ renin-aldosterone หรือ urine Cl"],
    ix: ["24-h urine K > 20-30 mmol/d ใช้แทน spot ได้"],
    std: "Halperin ML, Afr J Nephrol 2017: urine K/Cr < 1.5 mmol/mmol คือการตอบสนองที่เหมาะสมต่อ hypokalemia จากนอกไต, KDIGO 2020 potassium controversies"
  }, [
    N("Spurious: K normal when plasma separated promptly", "step", {
      s: "K ต่ำในหลอดเลือดแต่ไม่มี K deficit",
      keys: ["WBC > 75,000-100,000/µL", "ECG ปกติ ไม่มีอาการ"],
      ix: ["Whole blood K บน blood gas หรือแยก plasma ทันที"]
    }, [
      N("Leukocyte uptake in vitro", "adj", {
        s: "Blast ดูด K ในหลอดเก็บเลือด",
        why: "AML M4 และ M5 อาจมี lysozymuria ที่ทำ renal loss จริงร่วมด้วย",
        keys: ["K ปกติเมื่อแยก plasma ทันที"],
        ix: ["Repeat K แช่เย็นและแยกทันที"],
        link: "cytopenia"
      })
    ]),
    N("Urine K/Cr < 1.5 mmol/mmol (< 13 mEq/g): kidney conserving K", "step", {
      s: "ไตตอบสนองอย่างเหมาะสม สาเหตุคือ shift, GI loss, intake ต่ำ หรือ renal loss ที่หยุดแล้ว",
      keys: ["Acid-base ปกติร่วม paralysis เฉียบพลัน ชี้ shift", "Acidosis ชี้ lower GI loss", "Alkalosis ชี้ remote vomiting หรือ remote diuretic"],
      ix: ["Blood gas, urine Cl, urine NH4 (UAG, UOG)"]
    }, [
      N("Acute paralysis, acid-base normal: transcellular shift", "step", {
        s: "K ย้ายเข้าเซลล์โดยไม่มี deficit จริง",
        why: "ไม่มี K deficit จริง จึงให้ KCl ขนาดต่ำ อัตราช้า และวัด K ถี่ เพราะเสี่ยง rebound hyperkalemia เมื่อ K ย้ายกลับออกจากเซลล์",
        keys: ["Urine K/Cr < 2.0-2.5 mmol/mmol ขณะมี attack (cut-off ของ Lin 2004 ในผู้ป่วย hypokalemic paralysis ซึ่งสูงกว่า 1.5 ของ Halperin ที่ใช้ตั้ง branch นี้)", "PO4 ต่ำร่วม"],
        ix: ["TSH, free T4, urine Ca/PO4"],
        std: "Lin SH et al. Arch Intern Med 2004: urine K/Cr แยก hypokalemic periodic paralysis"
      }, [
        N("Thyrotoxic periodic paralysis", "adj", {
          s: "TSH ต่ำ free T4 หรือ T3 สูง",
          why: "Thyroid hormone เพิ่ม Na-K-ATPase พบบ่อยในชายเอเชีย",
          keys: ["TSH ต่ำ", "Urine Ca/PO4 > 1.7 mg/mg ระหว่าง attack"],
          ix: ["TRAb, thyroid ultrasound"],
          std: "Lin SH et al. Crit Care Med 2006: urine Ca/PO4 cut-off 1.7 mg/mg (sens 100%, spec 96%)"
        }),
        N("Familial hypokalemic periodic paralysis", "adj", {
          s: "Thyroid ปกติ มีประวัติครอบครัว",
          why: "Channelopathy CACNA1S, SCN4A",
          keys: ["TSH ปกติ", "Attack แรกในวัยรุ่น"],
          ix: ["CACNA1S, SCN4A genetic test, long exercise test"]
        }),
        N("Drug and insulin-related shift", "adj", {
          s: "Insulin, β2 agonist, theophylline, caffeine, refeeding",
          why: "K, PO4, Mg ลดพร้อมกัน",
          keys: ["PO4 และ Mg ต่ำร่วม"],
          ix: ["Drug review"],
          link: "phos"
        }),
        N("Toxin-related shift", "adj", {
          s: "Barium, chloroquine, cesium, antipsychotic overdose",
          why: "Barium ปิด K channel ทำ paralysis และ arrhythmia",
          keys: ["GI symptoms นำ"],
          ix: ["Serum barium level, toxicology"]
        }),
        N("Other shifts", "adj", {
          s: "Alkalemia, hypothermia, hematopoiesis เพิ่ม (B12, G-CSF)",
          why: "หายเองเมื่อแก้สาเหตุ",
          ix: ["Blood gas, CBC, reticulocyte"]
        })
      ]),
      N("Metabolic acidosis, urine NH4 high (UAG negative, UOG > 150 mOsm/kg): lower GI loss", "step", {
        s: "เสีย HCO3 และ K ทางลำไส้ ไตเพิ่มการขับ NH4 อย่างเหมาะสม",
        keys: ["NAGMA", "UAG ติดลบ (เชื่อได้เมื่อ urine Na > 25 mmol/L ถ้า volume depletion มาก distal Na delivery ต่ำ UAG อาจเป็นบวกเท็จ ให้ใช้ UOG)", "Stool osm gap แยก secretory กับ osmotic"],
        ix: ["Stool volume, stool Na, K, osm", "Laxative screen ในปัสสาวะหรืออุจจาระ"],
        link: "nagma"
      }, [
        N("Diarrhea and laxative abuse", "adj", {
          s: "Infectious, IBD, laxative ที่ผู้ป่วยปิดบัง",
          why: "Laxative abuse ทำ NAGMA ร่วม hypokalemia เรื้อรัง ต้องส่ง screen",
          keys: ["Stool osm gap > 100 ชี้ osmotic, < 50 ชี้ secretory", "Urine K/Cr ต่ำ"],
          ix: ["Laxative screen (bisacodyl, senna, phenolphthalein, Mg)"]
        }),
        N("Villous adenoma and secretory tumors", "adj", {
          s: "Mucus diarrhea ปริมาณมาก, VIPoma",
          why: "Villous adenoma ขนาดใหญ่ (McKittrick-Wheelock) เสีย K มาก และอาจมี alkalosis แทน acidosis",
          keys: ["Stool osm gap < 50", "Stool K สูง"],
          ix: ["Colonoscopy, VIP level, CT abdomen"]
        })
      ]),
      N("Acid-base normal: poor intake or sweat loss", "step", {
        s: "Intake น้อยกว่า 25 mmol/d ร่วม loss เล็กน้อย",
        keys: ["Urine K/Cr ต่ำ", "Blood gas ปกติ"],
        ix: ["Dietary history"]
      }, [
        N("Poor intake and sweat loss", "adj", {
          s: "ผู้สูงอายุ alcohol anorexia เหงื่อมาก",
          why: "Intake ต่ำอย่างเดียวไม่ค่อยทำ K ต่ำมาก มักมี loss อื่นร่วม",
          keys: ["Urine K/Cr < 1.5", "PO4 และ Mg อาจต่ำร่วม"],
          ix: ["Nutritional assessment"]
        })
      ]),
      N("Metabolic alkalosis, urine Cl < 20: remote vomiting or remote diuretic", "step", {
        s: "Renal loss หยุดแล้ว ไตกลับมาเก็บ K",
        keys: ["Urine Cl < 20", "Urine K/Cr ต่ำเพราะไม่มี bicarbonaturia แล้ว"],
        ix: ["Urine diuretic screen"],
        link: "metalk"
      }, [
        N("Vomiting and NG suction", "adj", {
          s: "เสีย HCl และ volume ตรวจพบในระยะหลังหยุดอาเจียนแล้ว",
          why: "ช่วงอาเจียนใหม่ urine K สูงจาก bicarbonaturia แต่เมื่อหยุดอาเจียน urine K ต่ำ",
          keys: ["Urine Cl < 20"],
          ix: ["Eating disorder screen, endoscopy"]
        }),
        N("Diuretic use or abuse", "adj", {
          s: "Diuretic ที่หมดฤทธิ์แล้ว",
          why: "ใช้ urine screen ซ้ำหลายครั้งเพราะ urine Cl ขึ้นลงตามเวลาใช้ยา",
          keys: ["Urine Cl ต่ำในตัวอย่างนี้ อาจสูงในตัวอย่างอื่น"],
          ix: ["Urine diuretic screen ซ้ำ"]
        })
      ])
    ]),
    N("Urine K/Cr > 1.5 mmol/mmol: renal K wasting", "step", {
      s: "ไตขับ K มากทั้งที่ K ต่ำ แยกต่อด้วย acid-base",
      keys: ["Metabolic acidosis: RTA, ketoanion, toluene", "Alkalosis ร่วม HTN: mineralocorticoid excess", "Alkalosis ร่วม BP ปกติหรือต่ำ: diuretic, vomiting, Gitelman, Bartter"],
      ix: ["Blood gas, BP, renin, aldosterone, urine Cl, urine Ca/Cr, Mg"]
    }, [
      N("Metabolic acidosis", "step", {
        s: "Renal K loss ร่วม acidosis",
        keys: ["UAG บวกและ UOG < 150 = NH4 ต่ำ (RTA)", "UAG บวกแต่ UOG > 150 = NH4 สูงจับกับ anion ที่วัดไม่ได้ (hippurate, ketoanion)"],
        ix: ["Urine pH (pH meter, ตัวอย่างใหม่), UAG, UOG, urine glucose, PO4"],
        link: "nagma"
      }, [
        N("Distal RTA (type 1)", "nephro", {
          s: "Urine pH > 5.5 ขณะ acidemia, urine NH4 ต่ำ",
          why: "Distal acidification ล้มเหลว ร่วม hypocitraturia, hypercalciuria และ nephrocalcinosis",
          keys: ["Urine pH > 5.5 ขณะ HCO3 ต่ำ", "UOG < 150 mOsm/kg", "Urine citrate ต่ำ, nephrocalcinosis"],
          ix: ["Furosemide-fludrocortisone test: urine pH ไม่ลดต่ำกว่า 5.3", "Anti-Ro/SSA, anti-La/SSB, renal ultrasound"],
          std: "Walsh SB et al. Kidney Int 2007: furosemide-fludrocortisone test, Trepiccione F et al. European expert consensus on dRTA, Nephrol Dial Transplant 2021"
        }),
        N("Proximal RTA (type 2) and Fanconi syndrome", "nephro", {
          s: "Bicarbonaturia ทำ distal K secretion สูง โดยเฉพาะเมื่อให้ alkali",
          why: "Urine pH < 5.5 เมื่อ HCO3 ต่ำกว่า threshold แต่ FEHCO3 > 15% เมื่อแก้ HCO3",
          keys: ["Urine pH < 5.5 ที่ steady state", "Normoglycemic glucosuria, phosphaturia, LMW proteinuria"],
          ix: ["FEHCO3 หลังให้ NaHCO3", "Serum FLC, urine β2M, tenofovir history"],
          link: "tubulopathy"
        }),
        N("DKA and osmotic diuresis", "adj", {
          s: "Ketoanion และ glucose ดึง K ออก",
          why: "Total K deficit 3-5 mmol/kg แม้ K แรกรับสูง",
          keys: ["β-OHB สูง, glucose สูง", "UAG บวกจาก ketoanion แม้ NH4 สูง"],
          ix: ["β-OHB, glucose"],
          link: "agma"
        }),
        N("Toluene and drug-induced tubular injury", "adj", {
          s: "Toluene, amphotericin B, ifosfamide, acetazolamide, topiramate",
          why: "Toluene ได้ hippurate ที่ขับเร็ว UAG บวกแต่ UOG สูง ทำให้ดูเหมือน dRTA",
          keys: ["UAG บวก UOG สูง (toluene)", "ประวัติดมกาว"],
          ix: ["Urine hippurate, drug review"]
        })
      ]),
      N("Metabolic alkalosis with hypertension", "step", {
        s: "Mineralocorticoid receptor หรือ ENaC ถูกกระตุ้น แยกด้วย renin และ aldosterone",
        why: "Renin และ aldosterone แบ่ง primary aldosteronism, MR activation อื่น และ secondary hyperaldosteronism ออกจากกันเป็นกลุ่มได้ แต่ต้องแปลคู่กับยาที่ใช้อยู่ (MRA, diuretic, ACEi, ARB, β-blocker) และหลังแก้ K",
        keys: ["Renin ต่ำ aldosterone สูง: primary aldosteronism", "Renin ต่ำ aldosterone ต่ำ: non-aldosterone MR activation หรือ Liddle", "Renin สูง aldosterone สูง: secondary hyperaldosteronism"],
        ix: ["Plasma renin activity หรือ direct renin concentration, aldosterone, ARR"],
        std: "Adler GK et al. Endocrine Society primary aldosteronism guideline, JCEM 2025"
      }, [
        N("Renin suppressed, aldosterone high", "step", {
          s: "PRA ≤ 1 ng/mL/h หรือ DRC ≤ 8.2 mU/L, aldosterone ≥ 10 ng/dL (immunoassay) หรือ ≥ 7.5 ng/dL (LC-MS/MS), ARR > 20 (PRA)",
          why: "ES 2025 ให้ตัดสินตาม cut-off ของ assay และไม่ต้องทำ suppression test ถ้า renin ถูกกดชัด aldosterone สูงมาก ร่วม spontaneous hypokalemia",
          keys: ["ARR สูง", "Hypokalemia พบเพียงราวหนึ่งในสามของ PA"],
          ix: ["Saline suppression หรือ captopril challenge test ตามข้อบ่งชี้", "Adrenal CT แล้ว adrenal vein sampling ถ้าจะผ่าตัด"]
        }, [
          N("Primary aldosteronism", "nephro", {
            s: "Aldosterone-producing adenoma หรือ bilateral adrenal hyperplasia",
            why: "Lateralization เปลี่ยนการรักษาจาก MRA เป็น adrenalectomy",
            keys: ["Renin ต่ำ aldosterone สูง", "Saline infusion (recumbent): aldosterone หลังให้ > 10 ng/dL ยืนยัน, < 5 ng/dL ไม่น่าใช่, 5-10 ก้ำกึ่ง (seated: > 6 ng/dL ยืนยัน)"],
            ix: ["Adrenal CT, adrenal vein sampling", "Familial hyperaldosteronism (CYP11B1/2 chimeric gene) ถ้า onset < 20 ปี"],
            std: "Adler GK et al. JCEM 2025"
          })
        ]),
        N("Renin suppressed, aldosterone low", "step", {
          s: "MR ถูกกระตุ้นด้วย cortisol หรือ steroid อื่น หรือ ENaC ทำงานเอง",
          keys: ["Cortisol สูง: Cushing", "Urine cortisol/cortisone สูง: AME หรือ licorice", "DOC สูง: CAH หรือ DOC tumor", "Steroid ปกติ: Liddle"],
          ix: ["24-h urine free cortisol, 1 mg DST, ACTH", "Urinary free cortisol/cortisone ratio", "DOC, 11-deoxycortisol, 17-OH progesterone"]
        }, [
          N("Cushing syndrome and ectopic ACTH", "nephro", {
            s: "Cortisol ล้นความสามารถของ 11β-HSD2",
            why: "Ectopic ACTH ทำ hypokalemia รุนแรงมากกว่า pituitary Cushing",
            keys: ["Urine free cortisol สูง, 1 mg DST ไม่กด", "ACTH > 20 pg/mL = ACTH-dependent (ทั้ง Cushing disease และ ectopic), ถ้า ACTH และ cortisol สูงมากร่วม hypokalemia รุนแรงให้น้ำหนักไปทาง ectopic ACTH แต่ต้องยืนยันด้วย imaging และ IPSS"],
            ix: ["Late-night salivary cortisol, high-dose DST, IPSS, CT chest"],
            link: "cushingoid"
          }),
          N("Apparent mineralocorticoid excess and licorice", "nephro", {
            s: "11β-HSD2 deficiency (HSD11B2) หรือถูกยับยั้งด้วย glycyrrhetinic acid",
            why: "Cortisol จับ MR เพราะไม่ถูกเปลี่ยนเป็น cortisone",
            keys: ["Urinary free cortisol/cortisone ratio สูง", "Plasma cortisol ปกติ"],
            ix: ["Licorice, ยาจีนและยาลูกกลอน history", "HSD11B2 genetic test ถ้า onset เด็ก"]
          }),
          N("Liddle syndrome", "nephro", {
            s: "ENaC gain-of-function (SCNN1B, SCNN1G)",
            why: "Steroid ทุกชนิดปกติ ตอบสนองต่อ amiloride ไม่ตอบสนองต่อ spironolactone",
            keys: ["Renin และ aldosterone ต่ำ", "Cortisol, DOC ปกติ", "Family history HTN"],
            ix: ["SCNN1B, SCNN1G genetic test", "Trial amiloride"]
          }),
          N("CAH (11β-hydroxylase, 17α-hydroxylase) and DOC-secreting tumor", "nephro", {
            s: "DOC สูงทำ mineralocorticoid effect",
            why: "11β-OH deficiency มี virilization, 17α-OH deficiency มี hypogonadism",
            keys: ["DOC สูง", "11-deoxycortisol สูง (11β-OH)", "Sex steroid ต่ำ (17α-OH)"],
            ix: ["Adrenal CT ถ้า DOC สูงมากในผู้ใหญ่"]
          })
        ]),
        N("Renin high, aldosterone high", "step", {
          s: "Secondary hyperaldosteronism จาก renal ischemia หรือ renin tumor โดยต้องตัดสาเหตุที่พบบ่อยกว่าก่อนคือ essential HTN ที่ได้ diuretic และ malignant HTN",
          keys: ["ARR ปกติ ทั้งสองค่าสูง"],
          ix: ["Renal artery Doppler หรือ CTA, MRA"]
        }, [
          N("Renovascular hypertension and renin-secreting tumor", "nephro", {
            s: "RAS (atherosclerotic, FMD) หรือ juxtaglomerular cell tumor",
            why: "Renin-secreting tumor ให้ renin สูงมากในคนอายุน้อยที่ HTN รุนแรง",
            keys: ["Kidney size ต่างกัน > 1.5 cm", "Doppler PSV > 200 cm/s, tardus-parvus"],
            ix: ["CTA หรือ MRA, renal CT สำหรับ JG tumor"]
          }),
          N("Renin-mediated hypertension from parenchymal disease (ADPKD, page kidney, segmental ischemia)", "nephro", {
            s: "Renin สูงโดยไม่มี main renal artery stenosis",
            why: "Segmental ischemia จากถุงน้ำหรือ hematoma กระตุ้น renin",
            keys: ["Renal imaging ผิดปกติ"],
            ix: ["Renal ultrasound หรือ CT"]
          })
        ])
      ]),
      N("Metabolic alkalosis with normal or low BP", "step", {
        s: "Distal Na delivery สูงร่วม secondary aldosterone แยกด้วย urine Cl, diuretic screen, urine Ca และ Mg",
        keys: ["Urine Cl < 20 = vomiting", "Urine Cl > 20 + diuretic screen บวก = diuretic", "Urine Cl > 20 + screen ลบ: urine Ca/Cr แยก Gitelman กับ Bartter"],
        ix: ["Urine Cl, urine diuretic screen, urine Ca/Cr, serum Mg, serum Ca"],
        std: "Blanchard A et al. KDIGO Gitelman syndrome controversies conference, Kidney Int 2017"
      }, [
        N("Vomiting and NG suction", "adj", {
          s: "อาเจียนช่วงปัจจุบัน",
          why: "Bicarbonaturia พา K และ Na ออก urine K สูงแต่ urine Cl < 20",
          keys: ["Urine Cl < 20", "Urine Na อาจสูง", "Urine pH > 6.5"],
          ix: ["Urine Cl"]
        }),
        N("Diuretic use or abuse", "adj", {
          s: "Thiazide ทำภาพเหมือน Gitelman, loop ทำภาพเหมือน Bartter",
          why: "ต้องตัดก่อนวินิจฉัย inherited tubulopathy ทุกครั้ง",
          keys: ["Urine Cl > 20", "Urine diuretic screen บวก"],
          ix: ["Urine diuretic screen อย่างน้อย 2 ครั้ง"]
        }),
        N("Gitelman syndrome", "nephro", {
          s: "SLC12A3 (NCC) loss-of-function",
          why: "Hypocalciuria และ hypomagnesemia แยกจาก Bartter",
          keys: ["Urine K/Cr > 2.0 mmol/mmol", "Mg < 0.7 mmol/L", "Urine Ca/Cr < 0.2 mmol/mmol", "FECl > 0.5%", "Renin สูง BP ต่ำหรือปกติ"],
          ix: ["SLC12A3 genetic test", "Diuretic screen ลบ"],
          std: "Blanchard A et al. Kidney Int 2017"
        }),
        N("Bartter syndrome", "nephro", {
          s: "TAL defect (SLC12A1, KCNJ1, CLCNKB, BSND, MAGED2)",
          why: "Urine Ca ปกติหรือสูง, onset ทารกหรือเด็ก, polyuria และ nephrocalcinosis",
          keys: ["Urine Ca/Cr ปกติหรือสูง", "Mg ปกติหรือต่ำเล็กน้อย (type 3 CLCNKB อาจมี hypomagnesemia และ hypocalciuria เลียนแบบ Gitelman จึงแยกได้แน่ด้วย genetic test)", "Polyuria, hyposthenuria"],
          ix: ["Bartter gene panel, renal ultrasound"]
        }),
        N("Hypomagnesemia and nephrotoxic drugs", "nephro", {
          s: "Mg ในเซลล์ต่ำทำให้ ROMK ไม่ถูก Mg ปิดกั้น จึงขับ K เพิ่ม, ยา: aminoglycoside, cisplatin, amphotericin, foscarnet",
          why: "แก้ K ไม่ขึ้นจนกว่าจะแก้ Mg",
          keys: ["Mg ต่ำ, FEMg > 4%", "ประวัติยา"],
          ix: ["FEMg"],
          link: "mg"
        }),
        N("Hypercalcemia and CaSR activation", "nephro", {
          s: "Ca สูงหรือ CaSR gain-of-function กระตุ้น CaSR ใน TAL",
          why: "ทำภาพเหมือน Bartter (autosomal dominant hypocalcemia type 1 จาก CASR gain-of-function เคยเรียก Bartter type 5)",
          keys: ["Ca สูง หรือ Ca ต่ำร่วม hypercalciuria และ PTH ต่ำ (autosomal dominant hypocalcemia type 1)"],
          ix: ["PTH, CASR genetic test"],
          link: "hyperca"
        })
      ]),
      N("Variable acid-base: polyuria or unmeasured anions", "step", {
        s: "Distal flow สูงหรือ anion ที่ไม่ถูก reabsorb",
        keys: ["Urine osmolar excretion > 1,000 mOsm/d", "UAG บวกมากโดยไม่มี acidosis"],
        ix: ["Urine osm และ volume, drug review, urine lysozyme"]
      }, [
        N("Osmotic and post-obstructive diuresis", "nephro", {
          s: "Glucose, mannitol, urea, recovery ATN หรือ obstruction",
          why: "Flow สูงที่ distal nephron เพิ่ม K secretion",
          keys: ["Urine osmolar excretion > 1,000 mOsm/d"],
          ix: ["Urine glucose, urea"]
        }),
        N("Nonreabsorbable anions", "adj", {
          s: "Piperacillin, high-dose penicillin, ketoanion, hippurate",
          why: "Anion ใน lumen เพิ่ม lumen-negative voltage",
          keys: ["UAG บวกมาก"],
          ix: ["Drug review"]
        }),
        N("Lysozymuria in monocytic leukemia", "adj", {
          s: "AML M4 และ M5 ทำ tubular injury",
          why: "อาจร่วมกับ spurious hypokalemia จาก leukocyte uptake",
          keys: ["WBC สูง monocytosis"],
          ix: ["Urine และ serum lysozyme"],
          link: "cytopenia"
        })
      ])
    ])
  ])
};

/* ===================== HYPERKALEMIA ===================== */
LABTREES.hyperk = {
  panel: [
    "ECG ทันที และ K ซ้ำด้วย plasma (lithium heparin) หรือ whole blood บน blood gas โดยไม่กำมือ",
    "CBC (platelet, WBC), hemolysis index",
    "Glucose, serum osm, Cr, eGFR, venous blood gas, Na, Cl, HCO3",
    "CK, uric acid, PO4, Ca, LDH ถ้าคิด tissue breakdown",
    "Spot urine K, Cr, Na, osm ก่อนให้ loop diuretic",
    "Plasma renin, aldosterone, 8 AM cortisol (± ACTH, cosyntropin) เมื่อ hyperkalemia เรื้อรังที่ eGFR ไม่ต่ำมาก",
    "Digoxin level, tacrolimus หรือ cyclosporine level ตามยาที่ใช้"
  ],
  pit: [
    "Serum K สูงกว่า plasma K ปกติราว 0.1-0.4 mmol/L ถ้าต่างมากกว่านี้ให้คิด thrombocytosis หรือ leukocytosis",
    "Urine K/Cr แปลหลังให้ loop diuretic ไม่ได้",
    "ถ้า eGFR ยังสูงกว่า 20-30 mL/min/1.73 m² GFR ที่ลดลงเพียงอย่างเดียวไม่ควรอธิบาย hyperkalemia เรื้อรังได้ ต้องหา hypoaldosteronism หรือยาร่วม",
    "ACEi, ARB และ heparin ทำ renin สูง aldosterone ต่ำ ต้องหยุดยาก่อนแปล renin-aldosterone ถ้าทำได้"
  ],
  tree: N("Hyperkalemia (K > 5.0-5.5 mmol/L)", "root", {
    s: "ตัด pseudohyperkalemia แล้วหา shift ด้วย glucose, acid-base และ tissue marker จากนั้น urine K/Cr, eGFR, urine Na, renin, aldosterone และ cortisol แยกกลไกการขับ",
    why: "Hyperkalemia เรื้อรังเกือบทั้งหมดเป็นปัญหาการขับทางไต การไล่ lab ตามสามกลไก (GFR และ distal flow, aldosterone, collecting duct) ทำให้ได้ diagnosis",
    keys: ["Plasma หรือ whole-blood K ปกติ = pseudo", "Shift: glucose, osm, acid-base, CK", "Urine K/Cr < 20 mmol/mmol = ไตขับ K ไม่พอ", "Renin และ aldosterone แยก hyporeninemic, adrenal และ resistance"],
    ix: ["ECG, repeat K, urine K/Cr, renin, aldosterone, cortisol"],
    std: "Halperin ML, Afr J Nephrol 2017: urine K/Cr > 20 mmol/mmol คือการตอบสนองที่เหมาะสมต่อ hyperkalemia, Clase CM et al. KDIGO potassium controversies conference, Kidney Int 2020"
  }, [
    N("Plasma or whole-blood K normal: pseudohyperkalemia", "step", {
      s: "K หลุดจากเซลล์หลังเก็บเลือด",
      why: "K สูงที่ไม่เข้ากับคลินิก (ไม่มี CKD หรือยาเสี่ยง, ECG ปกติ) ให้คิดถึง pseudohyperkalemia แต่ ECG ปกติไม่ตัด true hyperkalemia ถ้า K สูงมากหรือยืนยันไม่ได้เร็วให้รักษาไปก่อน",
      keys: ["Serum K − plasma K > 0.4 mmol/L", "Hemolysis index สูง", "ECG ปกติ"],
      ix: ["Plasma K, whole-blood K"]
    }, [
      N("Hemolysis and sampling technique", "adj", {
        s: "กำมือ tourniquet นาน เข็มเล็ก pneumatic tube",
        why: "สาเหตุพบบ่อยที่สุดของ K สูงที่ไม่มีอาการ",
        keys: ["Hemolysis index สูง, LDH สูง"],
        ix: ["เก็บเลือดใหม่โดยไม่กำมือ"]
      }),
      N("Thrombocytosis and leukocytosis", "adj", {
        s: "Platelet > 500,000-1,000,000/µL หรือ WBC สูงมาก",
        why: "Serum สูง plasma ปกติ, CLL อาจมี reverse pseudohyperkalemia ใน plasma",
        keys: ["Serum K สูง plasma K ปกติ"],
        ix: ["Plasma K, whole blood K"]
      }),
      N("Familial pseudohyperkalemia", "adj", {
        s: "RBC leak K เมื่อเย็น (ABCB6)",
        why: "K สูงเมื่อเก็บตัวอย่างไว้ในที่เย็น",
        keys: ["K สูงขึ้นตามเวลาและอุณหภูมิ"],
        ix: ["วัด K ทันทีที่อุณหภูมิ 37 °C"]
      })
    ]),
    N("True hyperkalemia with shift markers: glucose, osm, acid-base or tissue injury", "step", {
      s: "K ออกจากเซลล์ ต้องมี lab สนับสนุน",
      keys: ["Glucose หรือ osm สูง", "NAGMA", "CK, uric acid, PO4, LDH สูง"],
      ix: ["Glucose, osm, blood gas, CK, uric acid, PO4, LDH, digoxin level"]
    }, [
      N("Insulin deficiency and hypertonicity", "adj", {
        s: "DKA, HHS, mannitol, IVIG ที่มี sucrose, contrast",
        why: "Total body K ต่ำแม้ serum K สูง",
        keys: ["Glucose หรือ osm สูง"],
        ix: ["β-OHB, serum osm"]
      }),
      N("Tissue breakdown", "nephro", {
        s: "Tumor lysis, rhabdomyolysis, hemolysis, GI bleed, burns, crush",
        why: "Cairo-Bishop laboratory TLS ใช้ K, uric acid, PO4 และ Ca ร่วมกัน",
        keys: ["Laboratory TLS: ≥ 2 ข้อใน K ≥ 6.0, uric acid ≥ 8 mg/dL, PO4 ≥ 4.5 mg/dL, Ca ≤ 7 mg/dL (หรือเปลี่ยน ≥ 25% จาก baseline, เกณฑ์ PO4 ของผู้ใหญ่) ใน 3 วันก่อนถึง 7 วันหลังเริ่มการรักษา", "CK > 5 เท่าของค่าปกติใน rhabdomyolysis"],
        ix: ["CK, uric acid, PO4, Ca, LDH"],
        std: "Cairo MS, Bishop M. Br J Haematol 2004"
      }),
      N("Drugs causing shift", "adj", {
        s: "Nonselective β-blocker, digoxin toxicity, succinylcholine",
        why: "Digoxin ยับยั้ง Na-K-ATPase ใน acute toxicity K สูงบอกความรุนแรง รักษาด้วย digoxin-specific Fab",
        keys: ["Digoxin level > 2 ng/mL (เจาะหลัง dose อย่างน้อย 6 ชั่วโมง, chronic toxicity เกิดได้ที่ระดับต่ำกว่านี้)"],
        ix: ["Digoxin level, drug review"]
      }),
      N("Hyperkalemic periodic paralysis", "adj", {
        s: "SCN4A attack หลังพักจากการออกกำลังหรือกิน K",
        why: "K ปกติในช่วงที่ไม่มี attack และขณะมี attack อาจสูงเพียงเล็กน้อยหรือยังอยู่ในเกณฑ์ปกติได้",
        keys: ["K สูงเฉพาะขณะมี attack (บางรายไม่เกินค่าปกติ)"],
        ix: ["SCN4A genetic test"]
      }),
      N("Mineral (hyperchloremic) acidosis", "adj", {
        s: "NAGMA ทำ K shift มากกว่า organic acidosis",
        why: "แก้ acidosis แล้ว K ลดตาม แต่ถ้า K สูงเรื้อรังร่วม NAGMA ให้คิด type 4 RTA ก่อน (K สูงเป็นเหตุของ acidosis ไม่ใช่ผล)",
        keys: ["NAGMA, pH ต่ำ"],
        ix: ["Blood gas, UAG"],
        link: "nagma"
      })
    ]),
    N("Sustained hyperkalemia, urine K/Cr < 20 mmol/mmol: impaired renal excretion", "step", {
      s: "ไตขับ K น้อยกว่าที่ควร แยกเป็น GFR และ distal flow, aldosterone, collecting duct",
      keys: ["eGFR < 15-20 หรือ oliguria = GFR ต่ำอธิบายได้เอง", "Urine Na < 25 = distal Na delivery ต่ำ", "eGFR และ urine Na พอ: ตรวจ renin, aldosterone, cortisol"],
      ix: ["eGFR, urine Na, renin, aldosterone, cortisol"]
    }, [
      N("eGFR < 15-20 or oliguric AKI", "step", {
        s: "GFR ต่ำพออธิบาย K สูงได้เอง แต่ยังต้องหา K load, ยา และ acidosis ที่ซ้ำเติมทุกราย",
        keys: ["eGFR < 15-20", "Oliguria"],
        ix: ["Urine output, ประเมิน K intake และยา"]
      }, [
        N("Advanced CKD and AKI", "nephro", {
          s: "K ขึ้นเมื่อ GFR ต่ำมากหรือมี load เพิ่ม",
          why: "ถ้า eGFR > 20-30 แต่ K สูง ต้องหาสาเหตุร่วมเสมอ",
          keys: ["eGFR ต่ำมาก"],
          ix: ["Dietary K, drug review, metabolic acidosis"],
          link: "risingcr"
        })
      ]),
      N("Urine Na < 25 mmol/L: low distal Na delivery", "step", {
        s: "Distal flow ต่ำทำให้ secretion ไม่พอ",
        keys: ["Urine Na < 25", "FENa < 1%"],
        ix: ["Volume assessment"]
      }, [
        N("Low effective arterial volume", "adj", {
          s: "Heart failure, cirrhosis, volume depletion",
          why: "แก้ volume หรือให้ loop diuretic เพิ่ม distal delivery",
          keys: ["Urine Na ต่ำ, BUN/Cr สูง"],
          ix: ["NT-proBNP, LFT"]
        })
      ]),
      N("Adequate GFR and distal Na: renin and aldosterone low", "step", {
        s: "Renin ต่ำ aldosterone ต่ำ หรือ NCC ทำงานมาก",
        why: "Hyporeninemic hypoaldosteronism เป็นสาเหตุพบบ่อยที่สุดของ type 4 RTA ในผู้ใหญ่",
        keys: ["Renin ต่ำ", "Aldosterone ต่ำหรือปกติไม่เหมาะสมกับ K", "NAGMA ร่วม (type 4 RTA)"],
        ix: ["Renin, aldosterone, urine pH, CNI level"]
      }, [
        N("Hyporeninemic hypoaldosteronism", "nephro", {
          s: "DKD, interstitial CKD, NSAID, CNI, HIV, ผู้สูงอายุ",
          why: "Volume expansion กด renin, hyperkalemia ทำ NH4 ลด เกิด NAGMA",
          keys: ["Renin ต่ำ aldosterone ต่ำ", "Urine pH < 5.5"],
          ix: ["HbA1c, drug review"],
          link: "nagma"
        }),
        N("Pseudohypoaldosteronism type 2 (Gordon syndrome)", "nephro", {
          s: "WNK1, WNK4, KLHL3, CUL3 ทำ NCC ทำงานมาก",
          why: "HTN, hyperkalemia, NAGMA, renin ถูกกด และตอบสนองดีต่อ thiazide",
          keys: ["HTN, renin ต่ำ aldosterone ปกติหรือสูงเล็กน้อย", "eGFR ปกติ", "Hypercalciuria"],
          ix: ["WNK1, WNK4, KLHL3, CUL3 genetic test"]
        }),
        N("Calcineurin inhibitors", "nephro", {
          s: "Tacrolimus และ cyclosporine กระตุ้น NCC ผ่าน WNK และกด ROMK",
          why: "ภาพเหมือน Gordon ในผู้ป่วย KT ตอบสนองต่อ thiazide",
          keys: ["เกิดได้แม้ CNI level อยู่ใน target ยิ่ง level สูงยิ่งเสี่ยง", "Renin ต่ำ HTN, NAGMA, hypercalciuria"],
          ix: ["Tacrolimus หรือ cyclosporine trough"]
        })
      ]),
      N("Adequate GFR and distal Na: renin high, aldosterone low", "step", {
        s: "Adrenal ผลิต aldosterone ไม่ได้หรือถูกยายับยั้ง",
        keys: ["Cortisol ต่ำ = primary adrenal insufficiency", "Cortisol ปกติ = drug หรือ isolated hypoaldosteronism"],
        ix: ["8 AM cortisol, ACTH, cosyntropin test", "17-OH progesterone"]
      }, [
        N("Primary adrenal insufficiency", "adj", {
          s: "Autoimmune, TB, HIV, CMV adrenalitis, adrenal hemorrhage, metastasis",
          why: "Hyponatremia ร่วม hyperkalemia และ hypotension ต้องให้ hydrocortisone ทันทีถ้าไม่คงที่",
          keys: ["Cortisol ต่ำ ACTH สูง", "Renin สูง aldosterone ต่ำ", "Na ต่ำ"],
          ix: ["Cosyntropin peak < 18 µg/dL (500 nmol/L)", "21-hydroxylase antibody, adrenal CT"],
          std: "Bornstein SR et al. JCEM 2016"
        }),
        N("RAAS blockade and heparin", "adj", {
          s: "ACEi, ARB, ARNI, direct renin inhibitor, UFH และ LMWH",
          why: "Heparin กด aldosterone synthase แม้ใช้ขนาด prophylaxis",
          keys: ["Renin สูง aldosterone ต่ำ cortisol ปกติ", "ประวัติยา"],
          ix: ["Drug review"]
        }),
        N("Isolated hypoaldosteronism", "adj", {
          s: "Critical illness, aldosterone synthase deficiency (CYP11B2), CAH 21-hydroxylase แบบ salt wasting",
          why: "CAH 21-OH ในทารกมี salt wasting และ ambiguous genitalia",
          keys: ["Cortisol ปกติ (ยกเว้น CAH 21-hydroxylase ที่ cortisol ต่ำร่วมด้วย จึงไม่ใช่ isolated)", "17-OH progesterone สูงใน CAH"],
          ix: ["17-OH progesterone, CYP11B2 genetic test"]
        })
      ]),
      N("Adequate GFR and distal Na: renin and aldosterone high (aldosterone resistance)", "step", {
        s: "Collecting duct ไม่ตอบสนองต่อ aldosterone",
        keys: ["Renin สูง aldosterone สูง", "Fludrocortisone ไม่เพิ่ม K excretion"],
        ix: ["Drug review, urine pH, renal ultrasound"]
      }, [
        N("ENaC and MR blocking drugs", "adj", {
          s: "Amiloride, triamterene, trimethoprim, pentamidine, spironolactone, eplerenone, finerenone",
          why: "Trimethoprim ขนาดสูงใน PJP ทำ K ขึ้นภายในไม่กี่วัน",
          keys: ["ประวัติยา"],
          ix: ["Drug review"]
        }),
        N("Tubulointerstitial disease", "nephro", {
          s: "Obstructive uropathy, SLE, sickle cell, amyloid, KT rejection",
          why: "Voltage-dependent defect ทำ hyperkalemic distal RTA ที่ urine pH > 5.5",
          keys: ["Urine pH > 5.5 ร่วม hyperkalemia (voltage defect)"],
          ix: ["Renal ultrasound, ANA, kidney biopsy ตามข้อบ่งชี้"]
        }),
        N("Pseudohypoaldosteronism type 1", "nephro", {
          s: "MR (NR3C2, AD) หรือ ENaC (SCNN1A/B/G, AR) loss-of-function",
          why: "ENaC form มี salt wasting รุนแรงในทารกและปอดอักเสบซ้ำ",
          keys: ["Renin และ aldosterone สูงมาก", "Salt wasting, hyponatremia ในทารก"],
          ix: ["NR3C2, SCNN1A/B/G genetic test, sweat Na สูงใน ENaC form"]
        })
      ])
    ])
  ])
};
