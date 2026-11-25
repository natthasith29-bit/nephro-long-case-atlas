/* Lab work-up flows part 4 (Nov 2026): azotemia, nephrotic, nephritic and RPGN, hematuria, hypocomplementemia.
   Schema as data/lab1.js. */
window.LABTREES = window.LABTREES || {};

/* ===================== AZOTEMIA: AKI, AKD, CKD ===================== */
LABTREES.risingcr = {
  panel: [
    "Cr ย้อนหลัง (baseline) และ Cr ซ้ำ, urine output รายชั่วโมงถ้า admit",
    "Cystatin C ถ้าสงสัย pseudo-AKI หรือ muscle mass ผิดปกติ",
    "Urinalysis ด้วยตนเอง (fresh sediment) และ dipstick, UPCR, UACR",
    "Urine Na, Cr, urea, osm (FENa, FEurea) ก่อนให้ diuretic ถ้าทำได้",
    "Renal ultrasound ภายใน 24 ชั่วโมง (size, echogenicity, hydronephrosis), post-void residual",
    "CBC with smear, LDH, haptoglobin, CK, uric acid, PO4, Ca, eosinophil count",
    "ตามแขนง: C3, C4, ANCA, anti-GBM, ANA, SFLC, SPEP, blood culture, drug levels"
  ],
  pit: [
    "FENa < 1% พบได้ใน contrast AKI, pigment nephropathy, AGN และ early obstruction จึงไม่ได้แปลว่า prerenal เสมอ",
    "ผู้ป่วยที่ได้ diuretic ใช้ FEurea < 35% แทน FENa",
    "Dipstick protein ตรวจ light chain ไม่ได้ ดังนั้นถ้า UPCR สูงกว่าที่ dipstick บอกมากให้คิดถึง paraprotein และส่ง SFLC, SPEP, immunofixation",
    "Dipstick heme บวกแต่ไม่มี RBC ใน sediment ให้คิดถึง myoglobin หรือ free hemoglobin โดยต้องแยก RBC ที่ lyse ไปแล้วใน urine ที่เจือจางหรือ alkaline หรือเก็บไว้นาน",
    "Cr ขึ้นเล็กน้อย (ราว 0.3-0.5 mg/dL) ภายในไม่กี่วันหลังเริ่ม trimethoprim เกิดจาก tubular secretion ถูกยับยั้ง ไม่ใช่ AKI ถ้า cystatin C คงที่ ส่วน SGLT2i และ RAASi ทำให้ GFR ลดจริงแบบ hemodynamic (cystatin C เปลี่ยนตาม) ซึ่งยอมรับได้ถ้า Cr เพิ่มไม่เกิน 30%"
  ],
  tree: N("Azotemia: AKI, AKD and CKD", "root", {
    s: "ยืนยันว่า GFR ลดจริงและแบ่ง AKI, AKD, CKD ตาม KDIGO แล้วตัด obstruction ด้วย ultrasound จากนั้นใช้ urine sediment ร่วม urine indices และ lab เฉพาะแยกโรค",
    why: "KDIGO แนะนำให้หาสาเหตุทุกรายโดยเร็ว และ urine sediment เป็น test ที่ให้ข้อมูลมากที่สุดต่อเงินที่จ่าย",
    keys: ["AKI: Cr เพิ่ม ≥ 0.3 mg/dL ใน 48 ชั่วโมง หรือ ≥ 1.5 เท่าใน 7 วัน หรือ urine < 0.5 mL/kg/h นาน 6 ชั่วโมง", "AKD: ความผิดปกติ 7-90 วัน, CKD: > 3 เดือน", "Hydronephrosis ชี้ postrenal แต่ ultrasound ที่ไม่มี hydronephrosis ไม่ตัด obstruction (ช่วงแรก, volume depletion, retroperitoneal fibrosis หรือ tumor encasement)", "Sediment: bland, muddy brown cast, RBC cast, WBC cast, crystal, pigment"],
    ix: ["Ultrasound, sediment, FENa หรือ FEurea, UPCR"],
    std: "KDIGO 2012 AKI guideline, ADQI 2017 AKD consensus, KDIGO 2024 CKD guideline"
  }, [
    N("Cr rises but cystatin C or measured GFR stable: pseudo-AKI", "step", {
      s: "Cr เพิ่มโดย GFR ไม่ลด",
      keys: ["Cystatin C คงที่", "BUN ไม่เปลี่ยน", "Cr ขึ้นไม่เกินราว 0.3-0.5 mg/dL ทันทีหลังเริ่มยา"],
      ix: ["Cystatin C, enzymatic Cr assay"]
    }, [
      N("Inhibited tubular Cr secretion", "nephro", { s: "Trimethoprim, cimetidine, cobicistat, dolutegravir, bictegravir, ritonavir", keys: ["Cystatin C ปกติ"], ix: ["Cystatin C"] }),
      N("Increased Cr generation / assay interference", "nephro", { s: "Creatine supplement และ cooked meat เพิ่ม Cr generation ส่วน ketoacidosis (acetoacetate) และ cefoxitin รบกวน Jaffe assay ให้ค่า Cr สูงเกินจริง", keys: ["กรณี assay interference: enzymatic Cr ต่ำกว่า Jaffe"], ix: ["Enzymatic Cr, cystatin C"] })
    ]),
    N("Hydronephrosis or post-void residual > 200 mL: postrenal", "step", {
      s: "ต้องตัด obstruction ใน AKI ทุกรายที่สาเหตุยังไม่ชัด และในรายที่มีความเสี่ยง (ชายสูงอายุ, pelvic malignancy, solitary kidney, neurogenic bladder) แม้มีสาเหตุอื่นร่วม",
      keys: ["Hydronephrosis สองข้างหรือข้างเดียวใน solitary kidney", "PVR > 200 mL", "Obstruction ข้างเดียวในคนที่ไตอีกข้างปกติไม่ควรอธิบาย AKI ได้ ต้องหาสาเหตุอื่น"],
      ix: ["Bladder catheter, CT ถ้าคิด ureteric cause"],
      link: "hydro"
    }, [
      N("Bladder outlet obstruction", "nephro", { s: "BPH, urethral stricture, neurogenic bladder, anticholinergic", keys: ["PVR สูง, bladder distension"], ix: ["Catheter แล้ว Cr ลด"], link: "luts" }),
      N("Bilateral ureteric obstruction", "nephro", { s: "Pelvic malignancy, RPF, stones, papillary necrosis", keys: ["Hydroureter สองข้าง"], ix: ["CT abdomen pelvis, IgG4"], link: "hydro" })
    ]),
    N("Bland sediment, FENa < 1% or FEurea < 35%, urine Na < 20: prerenal or hemodynamic", "step", {
      s: "Tubule ยังทำงาน เก็บ Na ได้",
      keys: ["FENa < 1%", "FEurea < 35% เมื่อได้ diuretic", "BUN/Cr > 20", "Urine Na < 20 mmol/L, urine osm > 500 mOsm/kg", "FENa > 1% ไม่ตัด prerenal ในผู้ที่ได้ diuretic, CKD เดิม, bicarbonaturia หรือ salt wasting และ FENa < 1% พบได้ใน contrast, pigment, AGN, sepsis, early obstruction"],
      ix: ["Volume response, NT-proBNP, LFT, bladder pressure, renal Doppler"]
    }, [
      N("True volume depletion", "nephro", { s: "GI loss, bleeding, poor intake, over-diuresis", keys: ["Cr กลับเมื่อให้ volume"], ix: ["Fluid challenge"] }),
      N("Cardiorenal syndrome", "nephro", { s: "Venous congestion หรือ low output", keys: ["NT-proBNP สูง, IVC โป่ง"], ix: ["Echocardiogram, venous Doppler (VExUS)"] }),
      N("Hepatorenal syndrome (HRS-AKI)", "nephro", { s: "AKI ใน cirrhosis ที่มี ascites และไม่ตอบสนองต่อ volume resuscitation", keys: ["ICA-ADQI 2024: Cr หรือ urine output ไม่ดีขึ้นภายใน 24 ชั่วโมงหลัง volume resuscitation ที่เพียงพอ (เมื่อมีข้อบ่งชี้) และไม่มีหลักฐานชัดเจนของสาเหตุอื่นที่เป็นสาเหตุหลักของ AKI", "เกณฑ์เดิม ICA 2015: ไม่ดีขึ้นหลังหยุด diuretic และให้ albumin 1 g/kg/d 2 วัน, ไม่มี shock, nephrotoxin, structural kidney disease (proteinuria < 500 mg/d, RBC < 50/HPF, ultrasound ปกติ)"], ix: ["Urine Na < 20 สนับสนุน"], std: "ICA-ADQI 2024 HRS-AKI criteria (Nadim MK et al. J Hepatol 2024)" }),
      N("Renal hemodynamic drugs", "nephro", { s: "NSAID, ACEi/ARB, CNI, triple whammy (NSAID ร่วม RAASi ร่วม diuretic)", keys: ["FENa ต่ำ ร่วมประวัติยา"], ix: ["CNI trough"] }),
      N("Hemodynamic eGFR dip (ACEi, ARB, SGLT2i, finerenone)", "nephro", { s: "GFR ลดจริงแบบ hemodynamic ช่วงแรกหลังเริ่มยาหรือเพิ่มขนาด แล้วคงที่ ไม่ใช่ kidney injury", why: "KDIGO 2024: ให้ RASi ต่อได้ถ้า Cr เพิ่มไม่เกิน 30% ภายใน 4 สัปดาห์หลังเริ่มหรือเพิ่มขนาด และ eGFR dip ช่วงแรกจาก SGLT2i โดยทั่วไปไม่ใช่เหตุให้หยุดยา", keys: ["Cr เพิ่มไม่เกิน 30% แล้วคงที่", "ถ้าเพิ่ม > 30% หรือเพิ่มต่อเนื่อง ให้หา volume depletion, NSAID, renal artery stenosis"], ix: ["Cr และ K ซ้ำ 2-4 สัปดาห์หลังเริ่มหรือเพิ่มขนาด"], std: "KDIGO 2024 CKD guideline, practice points หมวด 3.6 (RASi) และ 3.7 (SGLT2i)" }),
      N("Abdominal compartment syndrome", "nephro", { s: "Oliguria กับ tense abdomen", keys: ["Intra-abdominal pressure > 20 mmHg ร่วม organ dysfunction ใหม่"], ix: ["Bladder pressure"], std: "WSACS 2013 consensus" }),
      N("Bilateral renal artery stenosis / solitary kidney RAS", "nephro", { s: "AKI หลังเริ่ม RAASi หรือ BP ลด", keys: ["Cr เพิ่ม > 30% หลังเริ่ม RAASi", "Kidney size ต่างกัน > 1.5 cm"], ix: ["Renal Doppler, CTA หรือ MRA"] })
    ]),
    N("Muddy brown granular casts, FENa > 2%, urine osm < 350: ATN", "step", {
      s: "Tubular injury ทำให้ไตเก็บ Na และ concentrate ไม่ได้",
      keys: ["Granular cast, renal tubular epithelial cell", "FENa > 2%, urine osm < 350"],
      ix: ["Drug levels, contrast history, perfusion assessment"]
    }, [
      N("Ischemic / septic ATN", "nephro", { s: "Sepsis, shock, major surgery", keys: ["Lactate สูง, hypotension"], ix: ["Source control"] }),
      N("Nephrotoxic ATN", "nephro", { s: "Aminoglycoside, vancomycin กับ piperacillin-tazobactam, amphotericin, cisplatin, tenofovir", keys: ["Trough level สูง", "Mg และ K ต่ำร่วม (aminoglycoside, amphotericin)"], ix: ["Vancomycin AUC, aminoglycoside level"] }),
      N("Contrast-associated AKI", "nephro", { s: "Cr ขึ้น 24-72 ชั่วโมงหลัง contrast", keys: ["Cr peak วันที่ 3-5", "FENa อาจต่ำช่วงแรก"], ix: ["ตัดสาเหตุอื่น (atheroembolism ถ้า arterial procedure)"] }),
      N("Osmotic nephrosis", "nephro", { s: "IVIG ที่มี sucrose, mannitol, HES, contrast", keys: ["Osmolal gap สูงเมื่อได้ mannitol"], ix: ["Biopsy: isometric vacuolization"] })
    ]),
    N("Dipstick heme positive without RBC in sediment: pigment", "step", {
      s: "Myoglobin หรือ free hemoglobin",
      keys: ["Dipstick heme บวก RBC < 5/HPF", "CK > 5,000 U/L หรือ hemolysis markers"],
      ix: ["CK, LDH, haptoglobin, plasma free Hb"],
      link: "pigmenturia"
    }, [
      N("Pigment nephropathy", "nephro", { s: "Rhabdomyolysis หรือ hemolysis", keys: ["CK > 5,000 U/L หรือ haptoglobin ต่ำ LDH สูง", "K, PO4, uric acid สูง Ca ต่ำ"], ix: ["CK trend, McMahon score"], link: "myalgia" })
    ]),
    N("Crystals in fresh sediment", "step", {
      s: "Crystal ตกตะกอนใน tubule",
      keys: ["Crystal รูปแบบตามยา", "Uric acid สูงมากใน TLS", "Calcium oxalate monohydrate ใน ethylene glycol"],
      ix: ["Drug review, uric acid, PO4, methotrexate level"]
    }, [
      N("Crystal nephropathy", "nephro", { s: "Acyclovir, methotrexate, sulfadiazine, indinavir, ciprofloxacin, oxalate, urate (TLS), phosphate", keys: ["Crystal ใน sediment", "Uric acid > 15 mg/dL ใน urate nephropathy"], ix: ["Drug level, urine uric acid/Cr > 1 ชี้ urate nephropathy"] })
    ]),
    N("Dipstick protein low but UPCR high, or abnormal SFLC: paraprotein", "step", {
      s: "Light chain ไม่ขึ้นใน dipstick",
      keys: ["UPCR สูงกว่าที่ dipstick บอกมาก", "UACR/UPCR < 0.3", "SFLC ratio ผิดปกติ"],
      ix: ["SFLC, SPEP, immunofixation"],
      link: "mspike"
    }, [
      N("Myeloma cast nephropathy", "nephro", { s: "AKI ใน myeloma", keys: ["Involved FLC > 1,500 mg/L ชี้ cast nephropathy", "Hypercalcemia, anemia"], ix: ["Bone marrow, kidney biopsy ถ้า FLC < 500 mg/L"], std: "IMWG 2016 kidney recommendations (Dimopoulos MA et al. J Clin Oncol 2016)" })
    ]),
    N("Sterile pyuria, WBC casts, eosinophilia: interstitial", "step", {
      s: "Interstitial inflammation",
      keys: ["WBC cast", "Sterile pyuria", "Tubular proteinuria (UACR/UPCR < 0.4)"],
      ix: ["Drug review, IgG4, ACE, anti-Ro, urine culture"],
      link: "pyuria"
    }, [
      N("Acute interstitial nephritis", "nephro", { s: "Drug, infection, autoimmune, ICI", keys: ["Urine eosinophil ไม่ช่วย (sensitivity และ specificity ต่ำ)", "Blood eosinophilia พบไม่ถึงครึ่งของผู้ป่วย และ triad ไข้ ผื่น eosinophilia ครบพบราว 10% จึงไม่มี triad ไม่ตัด AIN", "WBC cast และ pyuria อาจไม่มี โดยเฉพาะ NSAID และ ICI"], ix: ["Kidney biopsy เป็น gold standard"] })
    ]),
    N("Dysmorphic RBC, RBC casts, proteinuria: glomerular", "step", {
      s: "Glomerular injury",
      keys: ["Acanthocyte ≥ 5%", "RBC cast", "UPCR > 0.5 g/g"],
      ix: ["ANCA, anti-GBM, C3, C4, ANA, anti-dsDNA, ASO, hepatitis serology"],
      link: "rpgn"
    }, [
      N("Glomerulonephritis / RPGN", "nephro", { s: "Dysmorphic RBC, RBC cast, proteinuria", keys: ["Cr เพิ่มเป็นวันถึงสัปดาห์"], ix: ["ไปที่ approach RPGN, biopsy ด่วน"], link: "rpgn" })
    ]),
    N("Schistocytes, platelet low, LDH high, haptoglobin low: TMA", "step", {
      s: "Microangiopathic hemolysis ร่วม AKI",
      keys: ["Schistocyte > 1% ของ RBC", "Platelet < 150,000/µL หรือลด > 25% จาก baseline", "Renal-limited TMA (ยา, KT, malignant HTN) อาจไม่มี schistocyte หรือ platelet ต่ำ ต้องวินิจฉัยจาก biopsy"],
      ix: ["ADAMTS13 ก่อน plasma exchange, stool STEC"],
      link: "tma"
    }, [
      N("TMA", "nephro", { s: "MAHA, thrombocytopenia", keys: ["ADAMTS13 activity < 10% วินิจฉัย TTP"], ix: ["ไปที่ approach TMA"], link: "tma" })
    ]),
    N("Eosinophilia, low C3, after arterial procedure: atheroembolic", "step", {
      s: "Cholesterol crystal อุด arteriole",
      keys: ["Eosinophilia ช่วงแรก (ความถี่ในรายงานต่างกันมาก ตั้งแต่ราว 20% ถึง 80%)", "C3 ต่ำชั่วคราวในบางราย", "Stepwise Cr rise หลายสัปดาห์", "ไม่มี eosinophilia หรือ C3 ปกติ ไม่ตัดโรค"],
      ix: ["Fundoscopy (Hollenhorst plaque), skin หรือ kidney biopsy"],
      link: "bluetoe"
    }, [
      N("Atheroembolic disease", "nephro", { s: "Subacute stepwise AKI หลัง procedure", keys: ["Livedo, blue toe"], ix: ["Biopsy: biconvex cholesterol cleft"] })
    ]),
    N("LDH very high, hematuria, segmental perfusion defect: vascular occlusion", "step", {
      s: "Renal infarction หรือ RVT",
      keys: ["LDH สูงมากโดย ALT ปกติ", "Hematuria"],
      ix: ["Contrast CT, Doppler, ECG หา AF, thrombophilia, PLA2R ถ้า RVT"]
    }, [
      N("Renal infarction / RVT", "nephro", { s: "Flank pain, LDH สูง", keys: ["Wedge-shaped perfusion defect"], ix: ["CT angiography, echocardiogram"], link: "flank" })
    ]),
    N("Chronicity markers: small echogenic kidneys, prior Cr high > 3 months: acute on chronic or CKD", "step", {
      s: "ยืนยัน CKD ตาม KDIGO 2024 แล้วหาสาเหตุและ second hit",
      keys: ["Kidney < 9 cm echogenic", "Baseline eGFR < 60 mL/min/1.73 m² นาน > 3 เดือน", "Anemia, PTH สูง ร่วม (สนับสนุนแต่ไม่จำเพาะ)", "ไตขนาดปกติหรือโตไม่ตัด CKD: DKD, amyloidosis, HIVAN, ADPKD, myeloma, infiltrative disease"],
      ix: ["UACR, sediment, renal imaging, genetic testing ตามข้อบ่งชี้"],
      std: "KDIGO 2024 CKD: ระบุ cause, GFR และ albuminuria category"
    }, [
      N("Second hit in CKD", "nephro", { s: "Volume, drug, obstruction, infection, uncontrolled BP", keys: ["Cr เพิ่มเร็วกว่าการเสื่อมเดิม"], ix: ["ไล่ step AKI ซ้ำ"] }),
      N("CKD of unknown etiology (CKDu / Mesoamerican-type)", "nephro", { s: "เกษตรกรที่ทำงานกลางแดด ไม่มี DM หรือ HTN", keys: ["Bland sediment, low-grade proteinuria", "Hypokalemia, hyperuricemia"], ix: ["Biopsy: chronic TIN"] }),
      N("Genetic CKD (ADPKD, ADTKD, Alport, APOL1)", "nephro", { s: "Family history, onset อายุน้อย หรือ CKD ที่หาสาเหตุไม่ได้ (ไม่มี family history ไม่ตัด: de novo variant, APOL1 เป็น recessive)", keys: ["Cysts (ADPKD), bland sediment กับ hyperuricemia หรือ gout อายุน้อย (ADTKD-UMOD), hematuria กับ hearing loss (Alport)"], ix: ["Genetic panel ตาม KDIGO 2024"] }),
      N("Hypertensive / ischemic nephropathy", "nephro", { s: "Atherosclerosis, asymmetric kidneys", keys: ["UACR ต่ำ-ปานกลาง, bland sediment"], ix: ["Renal Doppler"] }),
      N("Chronic TIN: lithium, lead, aristolochic acid, analgesic, reflux", "nephro", { s: "Bland sediment, tubular proteinuria", keys: ["UACR/UPCR < 0.4", "Hyperkalemia, NAGMA"], ix: ["Lithium level, blood lead, EDTA mobilization test"] })
    ])
  ])
};

/* ===================== NEPHROTIC SYNDROME ===================== */
LABTREES.nephrotic = {
  panel: [
    "UPCR หรือ 24-h urine protein, UACR, urine sediment",
    "Serum albumin, Cr, eGFR, lipid profile, TSH",
    "Anti-PLA2R antibody (ELISA หรือ IIFT)",
    "ANA, anti-dsDNA, C3, C4",
    "SPEP, serum immunofixation, serum free light chain (ทุกรายอายุ > 40-50 ปี และอายุน้อยกว่านั้นเมื่อมีข้อบ่งชี้ เช่น C3G, MPGN pattern หรือ amyloid)",
    "HBsAg, anti-HCV, HIV, VDRL",
    "HbA1c และ fundoscopy หา diabetic retinopathy",
    "Age-appropriate cancer screening ใน MN ทุกราย ไม่ว่า anti-PLA2R บวกหรือลบ และค้นละเอียดขึ้นเมื่อ PLA2R ลบ, THSD7A หรือ NELL1 บวก, อายุมาก, น้ำหนักลด หรือสูบบุหรี่"
  ],
  pit: [
    "Serum anti-PLA2R ลบไม่ตัด primary MN เพราะราว 20-30% ของ primary MN มี serum anti-PLA2R ลบ จึงต้อง biopsy และย้อม tissue antigen (PLA2R, THSD7A, NELL1 และอื่นๆ)",
    "Albumin ต่ำมากทำให้ total Ca ต่ำโดย ionized Ca ปกติ และการเสีย thyroid-binding globulin ทางปัสสาวะทำให้ total T4 ต่ำ จึงให้ดู ionized Ca, free T4 และ TSH",
    "SFLC κ/λ ratio ใน CKD ใช้ renal reference range 0.37-3.1 (Freelite assay) ไม่ใช่ช่วงปกติ 0.26-1.65",
    "DM ที่ไม่มี retinopathy, proteinuria เกิดเร็วหรือเพิ่มเร็ว, DM type 1 ที่เป็นมา < 5 ปี, eGFR ลดเร็ว หรือ active sediment ให้คิดถึง NDKD และพิจารณา biopsy (ใน type 2 DM การไม่มี retinopathy ไม่ตัด DKD)"
  ],
  tree: N("Nephrotic syndrome", "root", {
    s: "ยืนยัน proteinuria > 3.5 g/d ร่วม albumin ต่ำ แล้วส่ง serology ชุดเดียวกัน (PLA2R, ANA, complement, SFLC, viral) ตาม KDIGO 2021 ถ้าไม่ได้คำตอบจึงใช้ biopsy pattern แยกโรค",
    why: "KDIGO 2021 ให้วินิจฉัย MN ได้โดยไม่ต้อง biopsy เมื่อ anti-PLA2R บวกและภาพเข้าได้ การส่ง serology ครบก่อนจึงลด biopsy ที่ไม่จำเป็น",
    keys: ["UPCR > 3.5 g/g (ผู้ใหญ่) ร่วม albumin < 3.0 g/dL", "Anti-PLA2R บวกร่วมภาพเข้าได้ วินิจฉัย MN ได้ แต่ยังต้องหา secondary cause และ cancer screening ตามอายุ", "Complement ต่ำ ชี้ immune complex GN หรือ C3G", "M-protein หรือ SFLC ผิดปกติ ชี้ paraprotein-related disease แต่ต้อง biopsy พิสูจน์ เพราะ MGUS พบร่วมโดยบังเอิญได้", "Serology ลบทั้งหมด ต้องอาศัย biopsy"],
    ix: ["Kidney biopsy: LM, IF, EM"],
    std: "KDIGO 2021 glomerular diseases guideline (Kidney Int 2021), KDIGO 2022 diabetes in CKD"
  }, [
    N("Diabetes with retinopathy, gradual albuminuria, bland sediment", "step", {
      s: "DKD เป็นไปได้มากที่สุด แต่ต้องมองหาสัญญาณ NDKD",
      keys: ["Retinopathy", "Albuminuria เพิ่มช้าๆ หลายปี", "ไม่มี active sediment (microscopic hematuria พบใน DKD ได้ แต่ RBC cast หรือ dysmorphic RBC เด่นให้คิดถึงโรคอื่น)"],
      ix: ["Biopsy เมื่อไม่มี retinopathy, proteinuria เพิ่มเร็ว, active sediment, eGFR ลดเร็ว"]
    }, [
      N("Diabetic kidney disease", "nephro", { s: "Progressive albuminuria กับ retinopathy", keys: ["DM นาน > 10 ปีใน type 1 ส่วน type 2 พบ DKD ได้ตั้งแต่แรกวินิจฉัย"], ix: ["UACR trend"] }),
      N("NDKD superimposed on DM", "nephro", { s: "MN, FSGS, IgAN, AIN หรือ amyloid ซ้อน", keys: ["ไม่มี retinopathy", "PLA2R บวก หรือ M-protein"], ix: ["Kidney biopsy"] }),
      N("Nodular glomerulosclerosis mimics", "nephro", { s: "Nodule ที่ไม่ใช่ diabetic: LCDD (κ, silver ลบ), AL amyloid (λ, Congo red บวก), idiopathic nodular GS (smoking, HTN), fibrillary GN", keys: ["SFLC ผิดปกติ", "Smoking, HTN โดยไม่มี DM"], ix: ["IF light chain staining, Congo red"] })
    ]),
    N("Anti-PLA2R positive", "step", {
      s: "Nephrotic syndrome ร่วม anti-PLA2R บวก วินิจฉัย MN ได้โดยไม่ต้อง biopsy แต่ควร biopsy เมื่อ eGFR ลดโดยไม่มีคำอธิบาย, ภาพไม่ตรงไปตรงมา, serology อื่นผิดปกติ (เช่น ANA บวก) หรือไม่ตอบสนองต่อการรักษา",
      keys: ["Anti-PLA2R ELISA บวก", "Anti-PLA2R บวกไม่ได้แปลว่าไม่มี secondary cause (พบร่วม HBV, sarcoidosis, malignancy ได้)"],
      ix: ["Titer ใช้ติดตาม immunologic remission", "ทุกรายยังต้องหา secondary cause (HBV, HCV, HIV, SLE, ยา) และทำ age-appropriate cancer screening แม้ anti-PLA2R บวก"],
      std: "KDIGO 2021 practice point 3.1.1: nephrotic syndrome ร่วม anti-PLA2R บวก ไม่จำเป็นต้อง biopsy เพื่อยืนยัน MN, practice point 3.1.2: ประเมิน associated conditions ทุกรายไม่ว่า antibody บวกหรือลบ"
    }, [
      N("Primary MN (PLA2R, THSD7A)", "nephro", { s: "Anti-PLA2R บวกหรือ tissue PLA2R บวก", keys: ["Anti-PLA2R titer สูง (KDIGO 2021 ใช้ > 50 RU/mL เป็น high-risk feature) สัมพันธ์กับ spontaneous remission น้อยลงและตอบสนองช้ากว่า"], ix: ["Risk stratification ตาม KDIGO"], std: "KDIGO 2021" })
    ]),
    N("ANA or anti-dsDNA positive, low C3 and C4", "step", {
      s: "ชี้ lupus nephritis และต้อง biopsy ยืนยัน (ANA บวกอย่างเดียวไม่จำเพาะ และ C3, C4 ปกติไม่ตัด LN โดยเฉพาะ class V)",
      keys: ["Anti-dsDNA บวก ร่วม C3 และ C4 ต่ำ"],
      ix: ["Biopsy เพื่อ ISN/RPS class"],
      std: "KDIGO 2024 lupus nephritis guideline"
    }, [
      N("Lupus MN (class V) and EXT1/EXT2, NCAM1", "nephro", { s: "MN ในหญิงอายุน้อย ANA บวก", keys: ["Full-house IF", "EXT1/EXT2 บวกราวหนึ่งในสามของ class V (ลบไม่ตัด lupus MN)"], ix: ["Tissue EXT1/EXT2 staining"] }),
      N("Lupus nephritis class III/IV with V", "nephro", { s: "Nephritic-nephrotic ใน SLE", keys: ["Active sediment, complement ต่ำ"], ix: ["Biopsy activity และ chronicity index"] })
    ]),
    N("M-protein or abnormal SFLC ratio", "step", {
      s: "Paraprotein-related kidney disease",
      keys: ["Immunofixation บวก หรือ FLC ratio ผิดปกติ (ใช้ renal reference range เมื่อ eGFR ลด)", "M-protein ในผู้สูงอายุอาจเป็น MGUS ที่ไม่เกี่ยวกับโรคไต ต้อง biopsy พิสูจน์ monotypic deposit ก่อนเรียก MGRS", "SPEP ลบอย่างเดียวไม่ตัด paraprotein ต้องมี immunofixation และ SFLC"],
      ix: ["Kidney biopsy กับ Congo red, light chain IF, EM", "Bone marrow"],
      std: "IKMG 2019 MGRS consensus",
      link: "mspike"
    }, [
      N("AL amyloidosis", "nephro", { s: "Nephrotic, macroglossia, cardiac, autonomic neuropathy", keys: ["Lambda เด่น", "NT-proBNP, troponin สูง"], ix: ["Congo red, mass spectrometry typing"] }),
      N("Monoclonal immunoglobulin deposition disease (LCDD)", "nephro", { s: "Nodular GS, CKD", keys: ["Kappa เด่น"], ix: ["Linear light chain IF"] }),
      N("PGNMID / C3G with monoclonal Ig / immunotactoid", "nephro", { s: "MPGN pattern กับ monoclonal IgG", keys: ["Serum M-protein ตรวจพบเพียงราวหนึ่งในสามใน PGNMID"], ix: ["IF IgG subclass และ light chain"] })
    ]),
    N("Serum amyloid A high with chronic inflammation", "step", {
      s: "AA หรือ amyloid ชนิดอื่นที่ไม่ใช่ AL",
      keys: ["SAA หรือ CRP สูงต่อเนื่อง", "M-protein ลบ"],
      ix: ["Congo red, mass spectrometry typing"]
    }, [
      N("AA amyloidosis and other amyloid (ALECT2, fibrinogen, TTR)", "nephro", { s: "AA ใน chronic inflammation (RA, FMF, TB, bronchiectasis, IVDU)", keys: ["SAA หรือ CRP สูงต่อเนื่องเฉพาะใน AA", "ALECT2 และ hereditary amyloid (fibrinogen, TTR) ไม่มี SAA สูง วินิจฉัยจาก amyloid typing"], ix: ["Amyloid typing by LC-MS/MS"] })
    ]),
    N("HBV, HCV, HIV or syphilis serology positive", "step", {
      s: "Infection-associated glomerular disease",
      keys: ["HBsAg, HBV DNA, anti-HCV, HCV RNA, HIV, VDRL"],
      ix: ["Biopsy pattern: MN, MPGN, collapsing"]
    }, [
      N("Infection-associated MN", "nephro", { s: "HBV (โดยเฉพาะในเอเชีย), HCV, syphilis, HIV", keys: ["Anti-PLA2R มักลบ แต่บวกได้ โดยเฉพาะ HBV-associated MN จึงใช้ PLA2R แยก primary กับ infection-associated ไม่ได้", "HBeAg อาจบวก"], ix: ["รักษาเชื้อก่อน"] }),
      N("Immune complex MPGN (HCV, cryo, chronic infection, autoimmune)", "nephro", { s: "Low C3 และ C4, hematuria, HTN", keys: ["HCV RNA, cryoglobulin, RF"], ix: ["Cryoglobulin (เก็บอุ่น 37 °C)"], link: "hypocomp" })
    ]),
    N("Low C3 with normal C4, serology otherwise negative", "step", {
      s: "ชี้ alternative pathway activation: ถ้าเพิ่งมีการติดเชื้อให้คิดถึง infection-related GN ก่อน ถ้า C3 ต่ำค้างให้คิดถึง C3G",
      keys: ["C3 ต่ำค้าง > 8-12 สัปดาห์ ชี้ C3G มากกว่า IRGN"],
      ix: ["C3NeF, factor H, sC5b-9, genetics, biopsy C3 dominant"]
    }, [
      N("C3 glomerulopathy", "nephro", { s: "C3 ต่ำ C4 ปกติ, C3 dominant IF", keys: ["IF: C3 staining เข้มกว่า immunoglobulin ทุกชนิด ≥ 2 orders of magnitude", "Serum C3 ปกติไม่ตัด C3G"], ix: ["Complement work-up", "SPEP, immunofixation, SFLC เมื่ออายุ ≥ 50 ปี"], std: "KDIGO 2021" })
    ]),
    N("Serology negative: kidney biopsy pattern", "step", {
      s: "LM, IF และ EM แยก podocytopathy, PLA2R-negative MN และ organized deposits",
      keys: ["EM diffuse foot process effacement = podocytopathy", "Subepithelial deposit = MN", "IgA dominant mesangial deposit ชี้ IgAN (แยก IgA-dominant infection-related GN และ lupus)", "Fibril ที่ DNAJB9 บวก = fibrillary GN"],
      ix: ["Tissue antigen staining ใน MN (THSD7A, NELL1, EXT1/2, SEMA3B)", "Genetic testing เมื่อ steroid-resistant หรือ family history"]
    }, [
      N("Minimal change disease", "nephro", { s: "LM ปกติ, EM diffuse effacement", keys: ["Abrupt onset, albumin ต่ำมาก", "Anti-nephrin antibody บวกราว 44% ของผู้ใหญ่ MCD และสูงขึ้นในโรค active ที่ยังไม่ได้รักษา (ลบไม่ตัด MCD)"], ix: ["Steroid response"] }),
      N("Primary FSGS", "nephro", { s: "Segmental sclerosis กับ diffuse effacement ≥ 80% และ full-blown nephrotic syndrome", keys: ["Albumin ต่ำ, full-blown nephrotic syndrome"], ix: ["ตัด genetic และ secondary ก่อน"], std: "KDIGO 2021 FSGS classification" }),
      N("Genetic FSGS / podocytopathy", "nephro", { s: "Steroid-resistant, family history, onset อายุน้อย, syndromic", keys: ["ไม่ตอบสนอง steroid"], ix: ["Podocytopathy gene panel, APOL1"] }),
      N("Maladaptive (secondary) FSGS", "nephro", { s: "Proteinuria ระดับ subnephrotic หรือ nephrotic-range ก็ได้ แต่ albumin ปกติและไม่บวม, segmental effacement", keys: ["Albumin ปกติแม้ proteinuria > 3.5 g/d", "Obesity, low nephron mass, reflux"], ix: ["Glomerulomegaly"] }),
      N("Collapsing glomerulopathy", "nephro", { s: "Severe nephrotic กับ rapid eGFR decline", keys: ["HIV, COVID-19, APOL1 high-risk, interferon, pamidronate"], ix: ["APOL1 genotype, HIV, SARS-CoV-2"] }),
      N("Drug or viral podocytopathy", "nephro", { s: "ยา: NSAID, lithium, interferon, pamidronate, VEGF inhibitor, ICI, anabolic steroid. ไวรัส: HIV, parvovirus B19, CMV, EBV, HCV, SARS-CoV-2", keys: ["Temporal relation กับยาหรือการติดเชื้อ"], ix: ["Drug review"] }),
      N("Malignancy-associated MN (NELL1, THSD7A)", "nephro", { s: "สงสัยมากขึ้นเมื่ออายุ > 65, anti-PLA2R ลบ, สูบบุหรี่ หรือน้ำหนักลด แต่ anti-PLA2R บวกไม่ตัด malignancy", keys: ["Tissue NELL1 หรือ THSD7A บวก (เพิ่มความสงสัย ไม่ได้ยืนยัน malignancy)", "IgG1 หรือ IgG2 dominant"], ix: ["Age-appropriate cancer screening ใน MN ทุกราย และค้นละเอียดขึ้นเมื่อ PLA2R ลบ หรือ THSD7A, NELL1 บวก"] }),
      N("Drug-associated MN", "nephro", { s: "NSAID, gold, penicillamine, ครีมที่มีปรอท (NELL1)", keys: ["NELL1 บวกในกลุ่ม mercury, lipoic acid และยาแผนโบราณ (ไม่ใช่ทุกยา)", "Urine mercury สูงในรายที่ใช้ครีมที่มีปรอท"], ix: ["Urine mercury"] }),
      N("Other secondary: sarcoid, IgG4-RD, thyroid, GVHD, post-KT de novo", "nephro", { s: "Autoimmune หรือ alloimmune MN", keys: ["IgG4 สูง", "ACE สูง"], ix: ["Tissue antigen panel"] }),
      N("IgA nephropathy with nephrotic syndrome", "nephro", { s: "IgAN ที่มี MCD-like podocytopathy ซ้อน", keys: ["IgA dominant ร่วม diffuse effacement"], ix: ["Oxford MEST-C"] }),
      N("Fibrillary GN", "nephro", { s: "Nephrotic กับ hematuria, Congo red ลบ", keys: ["DNAJB9 บวก", "Fibril 12-24 nm"], ix: ["DNAJB9 IHC"] })
    ]),
    N("Complication labs to check in every patient", "step", {
      s: "Lab ที่ต้องตามตาม KDIGO 2021 ไม่ว่าจะเป็นโรคใด",
      keys: ["Albumin < 2.5 g/dL (bromocresol green) หรือ < 2.0 g/dL (bromocresol purple) ใน MN เพิ่ม VTE risk", "Cr เพิ่มต้องไล่หา cause", "LDL, TSH, 25(OH)D"],
      ix: ["MN VTE risk tool, IgG level ถ้าติดเชื้อซ้ำ"]
    }, [
      N("Venous thromboembolism and RVT", "nephro", { s: "เสี่ยงสูงสุดใน MN แต่เกิดได้ใน nephrotic syndrome ทุกสาเหตุเมื่อ albumin ต่ำมาก", keys: ["Albumin < 2.5 g/dL (bromocresol green)"], ix: ["Doppler, CT venography"], link: "thrombosis" }),
      N("Infection", "nephro", { s: "Cellulitis, SBP (pneumococcus) และ opportunistic infection เช่น PJP เมื่อได้ immunosuppression", keys: ["IgG ต่ำจาก urinary loss"], ix: ["IgG level, culture"] }),
      N("AKI in nephrotic syndrome", "nephro", { s: "Prerenal, ATN ใน MCD, RVT, AIN จากยา (diuretic, NSAID), crescentic GN ซ้อน (anti-GBM หรือ ANCA ใน MN)", keys: ["FENa, sediment, Doppler"], ix: ["ไปที่ approach azotemia"], link: "risingcr" }),
      N("Hyperlipidemia, hypothyroidism, vitamin D loss", "nephro", { s: "Metabolic consequences", keys: ["LDL สูง, TSH สูง, 25(OH)D ต่ำ"], ix: ["Lipid, TSH, 25(OH)D"] })
    ])
  ])
};

/* ===================== NEPHRITIC SYNDROME / RPGN ===================== */
LABTREES.rpgn = {
  panel: [
    "Urine sediment (dysmorphic RBC, RBC cast), UPCR, Cr ซ้ำทุก 24-48 ชั่วโมง",
    "ANCA: MPO และ PR3 ด้วย antigen-specific immunoassay",
    "Anti-GBM antibody",
    "C3, C4, ANA, anti-dsDNA",
    "ASO, anti-DNase B, throat และ skin culture ถ้าคิด IRGN, blood culture × 3 ถ้ามีไข้หรือ murmur",
    "Cryoglobulin (เก็บอุ่น), RF, HBV, HCV",
    "CBC with smear, LDH, haptoglobin, SFLC",
    "Kidney biopsy ด่วน แต่ไม่รอผลก่อนเริ่มรักษาถ้า serology ชัดและอาการรุนแรง"
  ],
  pit: [
    "ANCA ใช้ antigen-specific immunoassay ไม่ใช่ IIF อย่างเดียว (KDIGO 2024)",
    "ANCA บวกพบได้ใน endocarditis, ยา (hydralazine, PTU), cocaine ที่ปน levamisole, IBD และ LN จึงไม่ได้แปลว่า AAV เสมอ และ ANCA ลบก็ไม่ตัด pauci-immune GN (ราว 10% เป็น ANCA-negative)",
    "ราวหนึ่งในสามของผู้ป่วย anti-GBM disease มี ANCA บวกร่วมด้วย (ส่วนใหญ่ MPO) จึงต้องส่งทั้ง anti-GBM และ ANCA ทุกราย",
    "C3 ใน PSGN ต้องกลับปกติใน 8-12 สัปดาห์ ถ้าไม่กลับให้คิด C3G",
    "Biopsy ที่ไม่มี glomeruli พอ (น้อยกว่า 10) แปลผล pauci-immune ได้จำกัด"
  ],
  tree: N("Nephritic syndrome / RPGN", "root", {
    s: "ส่ง ANCA, anti-GBM, complement, ANA พร้อมกันทันทีตาม KDIGO แล้วใช้ serology ร่วม IF pattern ของ biopsy (linear, pauci-immune, granular) แยกโรค พร้อมตัด mimic ด้วย smear, SFLC และ blood culture",
    why: "RPGN เป็น emergency การส่ง serology ชุดเดียวครบทำให้เริ่มรักษาได้ก่อนผล biopsy",
    keys: ["Anti-GBM บวก ชี้ anti-GBM disease (IF linear IgG)", "ANCA บวกร่วม complement ปกติ ชี้ pauci-immune GN หลังตัด infection และยา", "Complement ต่ำ ชี้ immune complex GN หรือ C3G แต่ complement ปกติไม่ตัด immune complex GN (IgAN, LN บางราย)", "Serology ลบทั้งหมดไม่ตัด GN ต้อง biopsy และหา mimic"],
    ix: ["Serology panel, kidney biopsy with IF"],
    std: "KDIGO 2024 ANCA-associated vasculitis guideline, KDIGO 2021 glomerular diseases (anti-GBM, IRGN, IgAN, C3G), KDIGO 2024 lupus nephritis"
  }, [
    N("Anti-GBM positive or linear IgG on biopsy", "step", {
      s: "Anti-GBM disease หรือ mimic ของ linear staining",
      keys: ["Anti-GBM บวก", "MPO-ANCA บวกร่วม = double positive"],
      ix: ["ANCA, CXR หรือ CT หา DAH, DLCO"]
    }, [
      N("Anti-GBM disease (Goodpasture)", "nephro", { s: "RPGN ± DAH", keys: ["Anti-GBM บวก ANCA ลบ"], ix: ["เริ่ม plasma exchange ร่วม cyclophosphamide และ glucocorticoid โดยไม่รอผล biopsy เมื่อสงสัยมาก ยกเว้นรายที่ dialysis-dependent ตั้งแต่แรก ร่วม crescent 100% ใน biopsy ที่เพียงพอ และไม่มี DAH"], std: "KDIGO 2021 anti-GBM chapter (recommendation 12.1.1)" }),
      N("Double positive (anti-GBM with MPO-ANCA)", "nephro", { s: "ราว 1 ใน 3 ของ anti-GBM", keys: ["Anti-GBM และ MPO บวก"], ix: ["รักษาแบบ anti-GBM แล้ว maintenance แบบ AAV"] }),
      N("Atypical anti-GBM / post-KT anti-GBM in Alport", "nephro", { s: "Linear IgG แต่ circulating antibody ลบ", keys: ["Anti-GBM serum ลบ", "Alport หลัง KT"], ix: ["Biosensor หรือ western blot assay"] }),
      N("Linear IgG mimics: DKD, MIDD, fibrillary", "nephro", { s: "Linear staining ที่ไม่ใช่ anti-GBM", keys: ["Anti-GBM ลบ", "DM, M-protein"], ix: ["Light chain IF, EM"] })
    ]),
    N("ANCA positive, complement normal: pauci-immune", "step", {
      s: "AAV แยกด้วย antigen และอาการ ต้องตัด mimic ของ ANCA บวก",
      keys: ["PR3-ANCA ส่วนใหญ่เป็น GPA", "MPO-ANCA พบใน MPA, renal-limited vasculitis และ EGPA (GPA ที่ MPO บวกก็มี จึงใช้ antigen แยก phenotype ไม่ได้เด็ดขาด)", "ANCA titer สูงมากและบวกหลาย antigen ชี้ drug-induced", "C3 ต่ำพบได้ใน AAV ส่วนน้อย จึงไม่ตัด AAV"],
      ix: ["Blood culture ก่อนกดภูมิ", "Eosinophil count, IgE", "Anti-histone, anti-dsDNA"],
      std: "KDIGO 2024 ANCA vasculitis"
    }, [
      N("MPA / renal-limited vasculitis", "nephro", { s: "MPO-ANCA, ผู้สูงอายุ", keys: ["MPO บวก"], ix: ["Biopsy: pauci-immune necrotizing crescentic GN"] }),
      N("GPA", "nephro", { s: "PR3-ANCA, ENT, nodules", keys: ["PR3 บวก"], ix: ["CT chest, sinus"] }),
      N("EGPA", "nephro", { s: "Asthma, eosinophilia, neuropathy", keys: ["Eosinophil ≥ 1,000/µL", "MPO บวกราว 40%"], ix: ["IgE, echocardiogram"], std: "ACR/EULAR 2022 EGPA classification" }),
      N("Drug-induced ANCA vasculitis", "nephro", { s: "PTU, hydralazine, minocycline, levamisole-cocaine", keys: ["MPO titer สูงมาก, PR3 ร่วม, anti-histone บวก"], ix: ["Drug review, urine toxicology"] }),
      N("ANCA-positive kidney injury without GN on biopsy", "adj", { s: "Biopsy เป็น TIN, ATN หรือไม่มี crescent", keys: ["ANCA บวกแต่ sediment ไม่ active"], ix: ["Biopsy"] }),
      N("Lupus nephritis with ANCA positivity (overlap)", "nephro", { s: "LN ที่ MPO หรือ PR3 บวกจริง", keys: ["Anti-dsDNA บวก ร่วม ANCA", "C3, C4 ต่ำ"], ix: ["Biopsy: necrosis และ crescent มาก"] }),
      N("Infective endocarditis-associated GN vs vasculitis", "nephro", { s: "PR3-ANCA บวกใน endocarditis", keys: ["Blood culture บวก", "C3 ต่ำบ่อยกว่า AAV"], ix: ["Echocardiogram, blood culture × 3"] })
    ]),
    N("C3 and C4 low, anti-dsDNA positive", "step", {
      s: "ชี้ lupus nephritis ต้อง biopsy เพื่อยืนยันและจัด class",
      keys: ["Anti-dsDNA บวก ร่วม C3 และ C4 ต่ำ"],
      ix: ["Biopsy ISN/RPS class"],
      std: "KDIGO 2024 lupus nephritis"
    }, [
      N("Lupus nephritis", "nephro", { s: "Full-house IF, low C3/C4", keys: ["Anti-dsDNA สูง"], ix: ["Biopsy"] })
    ]),
    N("C4 very low, RF and cryoglobulin positive", "step", {
      s: "Cryoglobulinemia",
      keys: ["C4 ต่ำมาก", "RF บวก", "Cryocrit"],
      ix: ["HCV RNA, SFLC, immunofixation ของ cryoprecipitate"]
    }, [
      N("Cryoglobulinemic GN", "nephro", { s: "MPGN pattern, intraluminal thrombi", keys: ["Mixed cryoglobulinemia (type II) สาเหตุหลักคือ HCV", "ถ้า HCV ลบ ให้หา HBV, Sjögren, SLE และ B-cell lymphoproliferative disorder"], ix: ["HCV RNA, HBsAg, anti-Ro, SPEP กับ immunofixation"] })
    ]),
    N("Low C3 with normal C4, recent infection, ASO or anti-DNase B positive", "step", {
      s: "Infection-related GN หรือ C3G",
      keys: ["ASO หรือ anti-DNase B สูง (ASO มักไม่ขึ้นหลัง skin infection และไม่ขึ้นใน staphylococcal IRGN)", "C3 ต่ำแล้วกลับปกติใน 8-12 สัปดาห์ เข้าได้กับ IRGN", "C3 ต่ำค้างเกิน 8-12 สัปดาห์ ชี้ C3G ต้อง biopsy"],
      ix: ["Culture, ติดตาม C3 ที่ 8-12 สัปดาห์, C3NeF, factor H"],
      std: "KDIGO 2021 IRGN and C3G"
    }, [
      N("Infection-related GN", "nephro", { s: "Post-streptococcal หรือ concurrent staphylococcal IgA-dominant IRGN", keys: ["Staphylococcal IRGN มักใน DM และผู้สูงอายุ ขณะยังติดเชื้อ"], ix: ["Culture, biopsy hump"] }),
      N("C3 glomerulopathy (C3GN, DDD)", "nephro", { s: "IF: C3 staining เข้มกว่า immunoglobulin ทุกชนิด ≥ 2 orders of magnitude", keys: ["C3 ต่ำค้าง (serum C3 ปกติไม่ตัด C3G)"], ix: ["Complement genetics", "SPEP, immunofixation, SFLC เมื่ออายุ ≥ 50 ปี"] })
    ]),
    N("Complement normal, IgA dominant on biopsy", "step", {
      s: "IgA nephropathy หรือ IgA vasculitis",
      keys: ["Serum IgA สูงในบางราย ไม่ช่วยวินิจฉัย", "Purpura ใน IgAV", "IgA dominant ร่วม C3 ต่ำ, DM หรือ staphylococcal infection ที่ยัง active ให้แยก IgA-dominant IRGN ซึ่งห้ามให้ immunosuppression ก่อนคุมการติดเชื้อ"],
      ix: ["Biopsy: Oxford MEST-C, crescent %"],
      std: "KDIGO 2025 IgAN/IgAV guideline"
    }, [
      N("IgA nephropathy / IgA vasculitis", "nephro", { s: "Mesangial IgA dominant", keys: ["Synpharyngitic hematuria"], ix: ["MEST-C"] })
    ]),
    N("Serology negative, pauci-immune or organized deposits on biopsy", "step", {
      s: "ANCA-negative pauci-immune หรือ deposit พิเศษ",
      keys: ["ANCA ลบ", "EM: fibril หรือ microtubule", "Monoclonal IgG ใน IF"],
      ix: ["DNAJB9, IgG subclass, SFLC"]
    }, [
      N("ANCA-negative pauci-immune GN", "nephro", { s: "Pauci-immune crescentic GN ที่ ANCA ลบ", keys: ["ANCA ลบซ้ำด้วยหลาย assay"], ix: ["รักษาแบบ AAV"] }),
      N("Fibrillary GN / PGNMID with crescents", "nephro", { s: "Organized deposit หรือ monoclonal IgG", keys: ["DNAJB9 บวก หรือ monoclonal IgG3"], ix: ["SFLC, bone marrow ถ้า PGNMID"] })
    ]),
    N("Lab clue of an RPGN mimic", "step", {
      s: "ภาพเหมือน RPGN แต่กลไกต่าง",
      keys: ["Schistocyte ร่วม platelet ต่ำ ชี้ TMA", "WBC cast ร่วม eosinophilia ชี้ AIN", "Eosinophilia ร่วม C3 ต่ำหลัง arterial procedure ชี้ atheroemboli", "Involved FLC > 1,500 mg/L ชี้ cast nephropathy", "BP สูงมากร่วม anti-RNA polymerase III บวก ชี้ scleroderma renal crisis"],
      ix: ["Smear, LDH, SFLC, fundoscopy, anti-RNA polymerase III"]
    }, [
      N("Thrombotic microangiopathy", "nephro", { s: "MAHA, thrombocytopenia, AKI", keys: ["Schistocyte"], ix: ["ADAMTS13"], link: "tma" }),
      N("Acute interstitial nephritis", "nephro", { s: "Sterile pyuria, WBC cast", keys: ["Proteinuria มัก < 1 g/d (ยกเว้น NSAID ที่มี MCD ร่วม)"], ix: ["Biopsy"], link: "pyuria" }),
      N("Atheroembolic disease", "nephro", { s: "Eosinophilia, low complement หลัง angiography", keys: ["Eosinophilia"], ix: ["Fundoscopy, biopsy"], link: "bluetoe" }),
      N("Myeloma cast nephropathy", "nephro", { s: "AKI, bland sediment, UPCR สูงแต่ dipstick ลบ", keys: ["Involved FLC > 1,500 mg/L"], ix: ["Bone marrow"], link: "mspike" }),
      N("Malignant hypertension / scleroderma renal crisis", "nephro", { s: "Severe HTN, MAHA", keys: ["Anti-RNA polymerase III บวกใน SRC", "Grade III-IV retinopathy"], ix: ["Fundoscopy"], link: "htn-emerg" })
    ])
  ])
};

/* ===================== HEMATURIA ===================== */
LABTREES.hematuria = {
  panel: [
    "Urine microscopy ยืนยัน ≥ 3 RBC/HPF (dipstick บวกอย่างเดียวไม่พอ)",
    "Phase-contrast microscopy หา dysmorphic RBC, acanthocyte, RBC cast",
    "UPCR หรือ UACR, Cr, eGFR",
    "Urine culture เมื่อสงสัย UTI (urine cytology และ urine-based tumor marker ไม่ใช้เป็น routine ในการประเมินเบื้องต้น)",
    "Coagulation profile, platelet ถ้าได้ anticoagulant",
    "Renal ultrasound หรือ CT urography ตาม AUA risk",
    "ตามแขนง: C3, C4, ASO, ANA, ANCA, hearing test, family urinalysis, 24-h urine Ca และ uric acid"
  ],
  pit: [
    "Dipstick บวกแต่ microscopy ไม่พบ RBC ให้คิด myoglobin หรือ hemoglobin",
    "ตรวจซ้ำหลังพ้นประจำเดือน ออกกำลัง หรือหลังรักษา UTI ก่อนเริ่ม work-up",
    "การได้ anticoagulant หรือ antiplatelet ไม่ใช่คำอธิบายของ hematuria ต้องประเมินเหมือนผู้ที่ไม่ได้ยา ไม่ว่ายาชนิดหรือระดับใด (AUA/SUFU 2020, คงเดิมใน 2025)",
    "Glomerular hematuria ไม่ตัดมะเร็ง ในผู้สูงอายุที่ high risk ยังต้องทำ cystoscopy"
  ],
  tree: N("Hematuria", "root", {
    s: "ยืนยันด้วย microscopy ตัด transient cause แล้วแยก glomerular กับ non-glomerular ด้วย RBC morphology, cast, proteinuria และ eGFR จากนั้นใช้ AUA risk stratification สำหรับ non-glomerular",
    why: "AUA/SUFU 2020 (amended 2025) กำหนด imaging และ cystoscopy ตาม risk ส่วน glomerular hematuria ส่งต่อ work-up ทาง nephrology",
    keys: ["≥ 3 RBC/HPF บน microscopy", "Acanthocyte ≥ 5% หรือ RBC cast หรือ UPCR > 0.5 g/g ชี้ glomerular", "Isomorphic RBC หรือ blood clot ชี้ non-glomerular แต่ isomorphic RBC ไม่ตัด glomerular disease เมื่อมี proteinuria หรือ eGFR ลด"],
    ix: ["Phase-contrast microscopy, UPCR, ultrasound หรือ CT urography, cystoscopy"],
    std: "AUA/SUFU microhematuria guideline 2020, amended 2025 (Barocas DA et al. J Urol 2020 และ 2025), KDIGO 2021 glomerular diseases"
  }, [
    N("Dipstick positive, no RBC on microscopy: pigmenturia", "step", {
      s: "Heme pigment ไม่ใช่ RBC",
      keys: ["Dipstick heme บวก RBC < 3/HPF"],
      ix: ["CK, LDH, haptoglobin"],
      link: "pigmenturia"
    }, [
      N("Hemoglobinuria / myoglobinuria", "nephro", { s: "Pigment nephropathy", keys: ["CK สูง หรือ haptoglobin ต่ำ"], ix: ["Urine myoglobin"], link: "pigmenturia" })
    ]),
    N("Transient: resolves on repeat after removing trigger", "step", {
      s: "Microhematuria ที่มี trigger ชัดเจนและตรวจซ้ำปกติหลังพ้น trigger ไม่ต้อง work-up ต่อ แต่ gross hematuria ต้องประเมินทาง urology ทุกรายแม้หายเอง",
      keys: ["Microscopy ซ้ำปกติ"],
      ix: ["Repeat urinalysis หลัง 48 ชั่วโมงถึง 6 สัปดาห์"]
    }, [
      N("Exercise, menstruation, trauma, catheter", "adj", { s: "Transient hematuria", keys: ["ตรวจซ้ำปกติ"], ix: ["Repeat UA"] }),
      N("Cystitis / prostatitis / BPH", "adj", { s: "Hematuria กับ infection หรือ prostate (BPH อย่างเดียวไม่ใช่เหตุให้งด risk-based evaluation)", keys: ["Urine culture บวก", "Hematuria หายหลังรักษา"], ix: ["Repeat UA หลังรักษา ถ้ายังมีให้ work-up"] })
    ]),
    N("Dysmorphic RBC, acanthocytes ≥ 5%, RBC casts or proteinuria: glomerular", "step", {
      s: "แยกต่อด้วย complement, proteinuria, family history และ hearing",
      keys: ["Complement ต่ำ ชี้ IRGN, LN, C3G, MPGN", "Complement ปกติร่วม synpharyngitic hematuria ชี้ IgAN (complement ปกติไม่ตัด GN ชนิดอื่น เช่น AAV, anti-GBM)", "Family history ร่วม hearing loss ชี้ Alport", "Isolated microhematuria ร่วม family history โดยไม่มี proteinuria ชี้ COL4A3 หรือ COL4A4 heterozygous"],
      ix: ["C3, C4, ASO, ANA, ANCA", "Audiogram, eye exam, family urinalysis, COL4A3/4/5 genetic test"]
    }, [
      N("IgA nephropathy", "nephro", { s: "Synpharyngitic gross hematuria หรือ asymptomatic microhematuria กับ proteinuria ซึ่งพบบ่อยกว่าในผู้ใหญ่", keys: ["Complement ปกติ", "Proteinuria เป็น prognostic factor"], ix: ["Biopsy ถ้า proteinuria ≥ 0.5 g/d หรือ eGFR ลด"], std: "KDIGO 2025 IgAN" }),
      N("Thin basement membrane / COL4A heterozygous", "nephro", { s: "Isolated microhematuria, family history", keys: ["UPCR ปกติ, hearing ปกติ", "ไม่ได้ benign ทุกราย บางรายเกิด proteinuria, FSGS และ CKD จึงต้องติดตาม UACR, BP และ eGFR"], ix: ["COL4A3/4 genetic test"] }),
      N("Alport syndrome", "nephro", { s: "Hematuria, proteinuria, SNHL, ocular lesion", keys: ["Audiogram ผิดปกติ", "ส่วนใหญ่เป็น X-linked (COL4A5): ชายรุนแรงกว่า แต่หญิง heterozygous ก็เกิด kidney failure ได้"], ix: ["COL4A5 genetic test หรือ skin biopsy α5 staining"], std: "Savige J et al. Alport expert guidelines, Pediatr Nephrol 2021" }),
      N("Post-infectious GN / IRGN", "nephro", { s: "Hematuria หลังติดเชื้อ, low C3", keys: ["C3 ต่ำ ASO สูง"], ix: ["C3 ซ้ำ 8-12 สัปดาห์"] }),
      N("LN, C3G, MPGN, ANCA, anti-GBM", "nephro", { s: "Hematuria กับ systemic disease หรือ low complement", keys: ["Serology บวก"], ix: ["ไปที่ approach RPGN"], link: "rpgn" }),
      N("Loin pain hematuria / nutcracker as glomerular mimic", "adj", { s: "Dysmorphic เล็กน้อย", keys: ["Left renal vein compression บน Doppler"], ix: ["Doppler, CT venography"] }),
      N("Cystic kidneys with glomerular hematuria: collagen IV or ADPKD", "adj", { s: "Cyst ร่วม dysmorphic RBC", keys: ["Proteinuria มากกว่าที่ ADPKD อธิบายได้"], ix: ["Genetic panel PKD1/2 และ COL4A"] })
    ]),
    N("Isomorphic RBC, no cast, normal UPCR: non-glomerular, AUA risk stratified", "step", {
      s: "Low หรือ negligible risk: ตรวจ UA ซ้ำภายใน 6 เดือน ถ้ายังมี hematuria ให้จัดกลุ่มใหม่เป็น intermediate หรือ high. Intermediate: cystoscopy ร่วม renal ultrasound. High: cystoscopy ร่วม CT urography",
      keys: ["High risk (มีข้อใดข้อหนึ่ง): ชายอายุ ≥ 60 ปี, smoking > 30 pack-year, > 25 RBC/HPF หรือเคยมี gross hematuria (หญิงไม่จัดเป็น high risk จากอายุอย่างเดียว)", "Intermediate (มีข้อใดข้อหนึ่ง): หญิงอายุ ≥ 60 ปี, ชายอายุ 40-59 ปี, smoking 10-30 pack-year, 11-25 RBC/HPF หรือมี urothelial cancer risk factor อื่น", "Low หรือ negligible (ต้องครบทุกข้อ): หญิง < 60 ปี, ชาย < 40 ปี, ไม่สูบหรือ < 10 pack-year, 3-10 RBC/HPF, ไม่มี risk factor อื่น", "Urine cytology หรือ urine-based tumor marker ไม่ใช้เป็น routine แต่เสนอได้ใน intermediate risk ที่ต้องการเลี่ยง cystoscopy หลัง counseling โดยยังต้องทำ ultrasound และตรวจ UA ซ้ำภายใน 12 เดือน"],
      ix: ["CT urography (MR urography ถ้า CT มีข้อห้าม), cystoscopy, renal ultrasound"],
      std: "AUA/SUFU microhematuria guideline 2020, amended 2025 (Barocas DA et al. J Urol 2025)"
    }, [
      N("Nephrolithiasis", "nephro", { s: "Colic กับ hematuria", keys: ["Stone บน CT"], ix: ["Metabolic work-up ถ้า recurrent"], link: "stone" }),
      N("Renal cell carcinoma / upper tract urothelial carcinoma", "nephro", { s: "Painless gross hematuria", keys: ["Mass บน CT urography", "Cytology บวกใน urothelial"], ix: ["CT urography, ureteroscopy"] }),
      N("ADPKD cyst hemorrhage", "nephro", { s: "Gross hematuria กับ flank pain", keys: ["Cyst ขยาย hyperdense"], ix: ["Ultrasound, MRI"], link: "cysts" }),
      N("Papillary necrosis", "nephro", { s: "Hematuria, colic, sloughed papilla", keys: ["Analgesic, DM, sickle, obstruction"], ix: ["CT urography: ring sign"] }),
      N("Vascular: nutcracker, AVM, renal infarct, RVT", "nephro", { s: "Hematuria จาก vascular lesion", keys: ["LDH สูงใน infarct"], ix: ["Doppler, CTA"] }),
      N("Infection: pyelonephritis, TB", "nephro", { s: "Pyuria กับ hematuria", keys: ["Sterile pyuria + hematuria ชี้ TB"], ix: ["Urine AFB culture × 3, TB PCR"], link: "pyuria" }),
      N("Bladder urothelial carcinoma", "nephro", { s: "Painless gross hematuria ในผู้สูงอายุที่สูบบุหรี่", keys: ["Cytology บวก"], ix: ["Cystoscopy"] }),
      N("Hemorrhagic cystitis: BK virus, cyclophosphamide, radiation", "nephro", { s: "Hematuria กับ LUTS", keys: ["Urine BK viral load สูงหลัง HSCT"], ix: ["BK PCR, cystoscopy"] }),
      N("Schistosomiasis haematobium", "adj", { s: "Terminal hematuria หลังเดินทาง", keys: ["Ova ในปัสสาวะที่เก็บช่วงเที่ยงถึงบ่าย", "Eosinophilia"], ix: ["Urine ova, serology"] })
    ]),
    N("Isomorphic hematuria with normal imaging and cystoscopy", "step", {
      s: "หา metabolic หรือ hematologic cause",
      keys: ["24-h urine Ca > 4 mg/kg/d", "Urine uric acid สูง", "Sickle screen, coagulation"],
      ix: ["24-h urine Ca และ uric acid, Hb electrophoresis"]
    }, [
      N("Hypercalciuria / hyperuricosuria", "nephro", { s: "Isolated microhematuria", keys: ["Urine Ca/Cr > 0.2 mg/mg"], ix: ["24-h urine"], link: "stone" }),
      N("Sickle cell trait / coagulopathy", "adj", { s: "Papillary necrosis ใน sickle", keys: ["Hb S บน electrophoresis", "INR สูง"], ix: ["Hb electrophoresis, coagulation"] })
    ])
  ])
};

/* ===================== HYPOCOMPLEMENTEMIA ===================== */
LABTREES.hypocomp = {
  panel: [
    "C3, C4, CH50 (และ AH50 ถ้ามี)",
    "Urine sediment, UPCR, Cr",
    "ANA, anti-dsDNA, anti-C1q",
    "ASO, anti-DNase B, blood culture × 3",
    "Cryoglobulin (เก็บอุ่น 37 °C), RF, HCV RNA, HBV",
    "SFLC และ immunofixation (อายุ > 50)",
    "CBC with smear, LDH, haptoglobin, ADAMTS13 ถ้ามี MAHA",
    "C3NeF, factor H, factor B, sC5b-9 และ complement genetics เมื่อคิด C3G หรือ aHUS"
  ],
  pit: [
    "Cryoglobulin ต้องเก็บและขนส่งที่ 37 °C ไม่เช่นนั้นลบเท็จ และ C4 อาจต่ำเท็จในหลอดเย็น",
    "C3 ใน PSGN กลับปกติใน 8-12 สัปดาห์ ถ้าค้างนานกว่านี้ให้คิด C3G",
    "Complement ปกติไม่ตัด aHUS เพราะ C3 ต่ำในผู้ป่วยเพียงราวครึ่งหนึ่งหรือน้อยกว่า",
    "Liver failure และ malnutrition ทำให้ C3 และ C4 ต่ำจากการสร้างลดลง ไม่ใช่ consumption"
  ],
  tree: N("Hypocomplementemia with kidney disease", "root", {
    s: "C3, C4 และ CH50 บอก pathway ที่ถูก activate แล้วใช้ serology เฉพาะแยกโรคในแต่ละ pathway",
    why: "Pattern ของ complement ลด DDx ของ GN ลงเหลือไม่กี่โรคทันที",
    keys: ["C3 ต่ำ C4 ปกติ ชี้ alternative pathway", "C3 และ C4 ต่ำ ชี้ classical pathway (immune complex)", "CH50 ต่ำมากเกือบศูนย์ทั้งที่ C3 และ C4 ไม่ต่ำตาม ชี้ inherited component deficiency (ตัด sample ที่เก็บหรือขนส่งผิดวิธีก่อน)", "Complement ปกติไม่ตัด GN: IgAN, AAV, anti-GBM และ LN บางราย complement ปกติ"],
    ix: ["C3, C4, CH50, pathway-specific serology"],
    std: "KDIGO 2021 glomerular diseases (IRGN, C3G, MPGN) และ KDIGO 2024 lupus nephritis, ไม่มี guideline เฉพาะสำหรับ hypocomplementemia"
  }, [
    N("Low C3, normal C4: alternative pathway", "step", {
      s: "IRGN, C3G, complement-mediated TMA",
      keys: ["ASO สูงและ C3 กลับปกติใน 8-12 สัปดาห์ เข้าได้กับ IRGN", "C3 ต่ำค้าง ชี้ C3G ต้อง biopsy", "MAHA ร่วม ชี้ complement-mediated TMA หลังตัด TTP และ STEC-HUS", "ไม่ใช่กฎตายตัว: LN และ cryoglobulinemia บางรายมี C4 ปกติ และ IRGN บางรายมี C4 ต่ำเล็กน้อย"],
      ix: ["ASO, C3 ซ้ำ, C3NeF, factor H, SFLC, smear"]
    }, [
      N("Post-infectious GN / IRGN", "nephro", { s: "C3 ต่ำแล้วกลับปกติภายใน 8-12 สัปดาห์", keys: ["ASO หรือ anti-DNase B สูง"], ix: ["C3 ซ้ำ"] }),
      N("C3 glomerulopathy (C3GN, DDD)", "nephro", { s: "C3 ต่ำค้าง, C3 dominant IF", keys: ["C3NeF บวก", "sC5b-9 สูงใน C3GN"], ix: ["Biopsy EM, complement genetics"] }),
      N("C3 glomerulopathy with monoclonal gammopathy", "nephro", { s: "C3G อายุ > 50 กับ M-protein", keys: ["SFLC หรือ IFE ผิดปกติ"], ix: ["Bone marrow"], link: "mspike" }),
      N("Complement-mediated TMA (atypical HUS)", "nephro", { s: "MAHA, thrombocytopenia, AKI", keys: ["ADAMTS13 activity > 10%", "STEC ลบ", "C3 ปกติได้ราวครึ่งหนึ่งของผู้ป่วย และ genetic testing ไม่พบ variant ราว 40-50% จึงไม่ใช้ตัดโรค"], ix: ["Complement genetics, anti-CFH"], link: "tma" })
    ]),
    N("Low C3 and low C4: classical pathway", "step", {
      s: "Immune complex disease",
      keys: ["Anti-dsDNA บวก ชี้ LN", "C4 ต่ำมากร่วม RF และ cryoglobulin บวก ชี้ cryoglobulinemic GN", "Blood culture บวก ชี้ endocarditis หรือ shunt nephritis", "Urticaria นาน > 24 ชั่วโมงร่วม C1q ต่ำและ anti-C1q บวก ชี้ HUVS"],
      ix: ["Anti-dsDNA, cryoglobulin, RF, HCV, blood culture, echocardiogram"]
    }, [
      N("Lupus nephritis", "nephro", { s: "C3 และ C4 ต่ำร่วม anti-dsDNA บวก", keys: ["Anti-C1q บวกสัมพันธ์กับ active LN"], ix: ["Biopsy"], link: "rpgn" }),
      N("Cryoglobulinemic GN", "nephro", { s: "C4 ต่ำมาก, RF บวก", keys: ["Cryocrit บวก", "HCV RNA บวก"], ix: ["HCV RNA, SFLC"] }),
      N("Infective endocarditis-associated GN", "nephro", { s: "Fever, murmur, AKI", keys: ["Blood culture บวก (S. aureus พบบ่อยที่สุด)", "Blood culture ลบไม่ตัด: Bartonella และ Coxiella ต้องส่ง serology", "PR3-ANCA อาจบวก"], ix: ["Echocardiogram, Bartonella และ Coxiella serology เมื่อ culture ลบ"] }),
      N("Shunt nephritis (ventriculoatrial shunt infection)", "nephro", { s: "Low-grade fever ในผู้มี VA shunt", keys: ["Blood หรือ CSF culture: S. epidermidis"], ix: ["Shunt culture"] }),
      N("Immune complex MPGN (IC-MPGN)", "nephro", { s: "MPGN pattern ที่มี Ig และ C3", keys: ["หา infection, autoimmune, monoclonal"], ix: ["HCV, HBV, ANA, SFLC"] }),
      N("Hypocomplementemic urticarial vasculitis (HUVS)", "nephro", { s: "Urticaria นาน > 24 ชั่วโมง, angioedema, uveitis", keys: ["C1q ต่ำ anti-C1q บวก"], ix: ["Skin biopsy: leukocytoclastic vasculitis"] })
    ]),
    N("CH50 very low or undetectable", "step", {
      s: "Inherited early classical component deficiency (C1q, C2, C4)",
      keys: ["CH50 เกือบศูนย์ C3 C4 ปกติหรือต่ำเล็กน้อย"],
      ix: ["C1q, C2, C4 level, anti-C1q"]
    }, [
      N("Hereditary C1q, C2 or C4 deficiency with SLE-like disease", "nephro", { s: "C1q deficiency เกิด SLE หรือ SLE-like disease ราว 90%", keys: ["C1q ต่ำมาก anti-C1q ลบ"], ix: ["Complement component levels, genetics"] })
    ]),
    N("Low complement with eosinophilia, liver failure or sepsis: other causes", "step", {
      s: "Consumption หรือ synthesis ลด",
      keys: ["Eosinophilia หลัง procedure", "INR สูง albumin ต่ำ"],
      ix: ["Eosinophil, LFT, INR"]
    }, [
      N("Atheroembolic disease (cholesterol emboli)", "nephro", { s: "AKI stepwise หลัง vascular procedure", keys: ["Eosinophilia, C3 ต่ำ"], ix: ["Fundoscopy, biopsy"], link: "bluetoe" }),
      N("Sepsis, liver failure and malnutrition", "adj", { s: "C3 และ C4 ต่ำจาก consumption หรือ synthesis ลด", keys: ["Albumin ต่ำ, INR สูง"], ix: ["LFT"] })
    ])
  ])
};
