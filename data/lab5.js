/* Lab work-up flows part 5 (Nov 2026): TMA, monoclonal gammopathy, anemia and cytopenias, polyuria, stones.
   Schema as data/lab1.js. */
window.LABTREES = window.LABTREES || {};

/* ===================== TMA ===================== */
LABTREES.tma = {
  panel: [
    "CBC, peripheral smear (schistocyte %), reticulocyte, LDH, haptoglobin, indirect bilirubin, DAT",
    "PT, aPTT, fibrinogen, D-dimer (แยก DIC)",
    "ADAMTS13 activity และ inhibitor เจาะก่อน plasma exchange หรือให้ plasma",
    "Stool Shiga toxin PCR หรือ culture ถ้ามี diarrhea",
    "Cr, urinalysis, troponin, BP และ fundoscopy",
    "Antiphospholipid antibodies, ANA, β-hCG, HIV, homocysteine และ methylmalonic acid",
    "C3, C4 และส่ง complement genetics กับ anti-CFH เมื่อคิด aHUS (ผลไม่ต้องรอก่อนเริ่มรักษา)"
  ],
  pit: [
    "ADAMTS13 ต้องเจาะก่อน plasma ทุกชนิด ไม่เช่นนั้นค่าจะสูงหลอก",
    "PLASMIC score ใช้ประเมิน pretest probability ระหว่างรอ ADAMTS13 ไม่ใช่ใช้วินิจฉัยแทน",
    "Complement ปกติไม่ตัด aHUS และ genetic test ไม่พบ variant ในราว 40-50% ของผู้ป่วย",
    "Coagulation ผิดปกติชัดชี้ DIC มากกว่า primary TMA",
    "Reticulocyte ต่ำร่วม LDH สูงมากให้คิด B12 deficiency (pseudo-microangiopathy)"
  ],
  tree: N("Thrombotic microangiopathy", "root", {
    s: "ยืนยัน MAHA และ thrombocytopenia แล้วตัด mimic ด้วย DAT, coagulation และ reticulocyte จากนั้น ADAMTS13 แยก TTP, stool Shiga toxin แยก STEC-HUS และ screen secondary cause ก่อนสรุป complement-mediated TMA",
    why: "ISTH 2020 ให้ ADAMTS13 เป็นจุดแยกหลัก และ aHUS เป็น diagnosis of exclusion",
    keys: ["Schistocyte > 1%, LDH สูง, haptoglobin ต่ำ, DAT ลบ, platelet ต่ำ", "ADAMTS13 activity < 10% วินิจฉัย TTP", "Stool Shiga toxin บวก ชี้ STEC-HUS", "มี secondary cause ชัดเจน ชี้ secondary TMA", "ไม่เข้าข้อใดเลย ให้คิดถึง complement-mediated TMA ซึ่งเป็น diagnosis of exclusion และ secondary trigger กับ complement dysregulation พบร่วมกันได้"],
    ix: ["ADAMTS13, stool STEC, aPL, BP, drug review"],
    std: "ISTH 2020 TTP guideline (Zheng XL et al. J Thromb Haemost 2020), KDIGO 2017 aHUS and C3G controversies conference (Goodship TH et al. Kidney Int 2017)"
  }, [
    N("DAT positive, coagulopathy, low reticulocyte or mechanical cause: TMA mimic", "step", {
      s: "Hemolysis และ thrombocytopenia ที่ไม่ใช่ primary TMA",
      keys: ["DAT บวก ชี้ autoimmune hemolysis (Evans syndrome เมื่อมี ITP ร่วม) ยกเว้น pneumococcal HUS ที่ DAT บวกได้", "INR สูงร่วม fibrinogen ต่ำ ชี้ DIC", "Reticulocyte ต่ำ, MCV สูง, B12 ต่ำ ชี้ pseudo-microangiopathy", "PF4 antibody บวกร่วม 4T score เข้าได้ ชี้ HIT"],
      ix: ["DAT, coagulation, B12, PF4 ELISA"]
    }, [
      N("Evans syndrome / SLE cytopenia", "nephro", { s: "DAT บวก กับ ITP", keys: ["DAT บวก", "ANA บวก"], ix: ["ANA, anti-dsDNA"] }),
      N("Vitamin B12 deficiency (pseudo-microangiopathy)", "adj", { s: "Ineffective erythropoiesis", keys: ["Reticulocyte ต่ำ, LDH สูงมาก", "B12 ต่ำ, MMA และ homocysteine สูง"], ix: ["B12, MMA"] }),
      N("Mechanical hemolysis / sepsis / HIT thrombocytopenia", "adj", { s: "Mechanical hemolysis จาก prosthetic valve หรือ ECMO และ sepsis ทำให้ anemia กับ thrombocytopenia ได้ ส่วน HIT มี thrombocytopenia ร่วมกับ thrombosis หลังได้ heparin โดยไม่มี hemolysis", keys: ["PF4 antibody บวกใน HIT"], ix: ["Echocardiogram, 4T score"] }),
      N("Metastatic cancer / DIC / severe infection", "adj", { s: "Marrow infiltration หรือ DIC", keys: ["Coagulation ผิดปกติ", "Leukoerythroblastic film"], ix: ["Bone marrow, imaging"] })
    ]),
    N("ADAMTS13 activity < 10%: TTP", "step", {
      s: "แยก immune กับ congenital ด้วย inhibitor และ anti-ADAMTS13 IgG",
      keys: ["PLASMIC ≥ 6 ชี้ high pretest probability", "Inhibitor หรือ anti-ADAMTS13 IgG บวก = immune"],
      ix: ["ADAMTS13 inhibitor, anti-ADAMTS13 IgG, ADAMTS13 gene"],
      std: "ISTH 2020 TTP guideline"
    }, [
      N("Immune TTP", "nephro", { s: "Anti-ADAMTS13 inhibitor", keys: ["Platelet มัก < 30,000/µL", "Cr มัก < 2 mg/dL แต่ AKI รุนแรงไม่ตัด TTP ต้องดู ADAMTS13 activity"], ix: ["PEX, steroid, caplacizumab, rituximab"] }),
      N("Congenital TTP (Upshaw-Schulman)", "nephro", { s: "Recurrent TMA, pregnancy-triggered", keys: ["ADAMTS13 ต่ำโดย inhibitor ลบ"], ix: ["ADAMTS13 gene, recombinant ADAMTS13"] })
    ]),
    N("ADAMTS13 ≥ 10%, stool Shiga toxin or infection marker positive", "step", {
      s: "Infection-associated HUS",
      keys: ["Stool Shiga toxin PCR บวก", "Invasive pneumococcal infection, DAT บวก (T-antigen)"],
      ix: ["Stool PCR, blood culture, viral PCR"]
    }, [
      N("STEC-HUS", "nephro", { s: "Bloody diarrhea 5-10 วันก่อน AKI", keys: ["Stool Shiga toxin บวก"], ix: ["Supportive care, โดยทั่วไปไม่แนะนำ antibiotic และ antimotility agent ในการติดเชื้อ STEC ทั้งเด็กและผู้ใหญ่ (หลักฐานว่าเพิ่มความเสี่ยง HUS ชัดที่สุดในเด็ก)"] }),
      N("Pneumococcal HUS", "nephro", { s: "Invasive pneumococcal infection ในเด็ก", keys: ["DAT บวก, T-antigen exposure"], ix: ["Blood culture"] }),
      N("HIV, CMV, influenza, COVID-19", "nephro", { s: "Virus-associated TMA", keys: ["Viral PCR บวก"], ix: ["HIV, CMV PCR"] })
    ]),
    N("ADAMTS13 ≥ 10% with a secondary cause on screening", "step", {
      s: "Secondary TMA แต่ไม่ตัด complement-mediated ที่ถูก trigger",
      keys: ["BP สูงมากร่วม retinopathy grade III-IV ชี้ malignant HTN", "Anti-RNA polymerase III บวก ชี้ scleroderma renal crisis", "aPL บวก ชี้ APS", "β-hCG บวกร่วม platelet ต่ำและ LFT สูง ชี้ HELLP", "Homocysteine และ MMA สูงโดย B12 ปกติ ชี้ cobalamin C deficiency", "Drug หรือ transplant exposure"],
      ix: ["Fundoscopy, aPL, anti-RNA polymerase III, homocysteine, drug review"]
    }, [
      N("Malignant hypertension", "nephro", { s: "Severe HTN, retinopathy grade III-IV", keys: ["TMA ดีขึ้นเมื่อคุม BP ถ้าไม่ดีขึ้นคิด aHUS"], ix: ["Fundoscopy"], link: "htn-emerg" }),
      N("Scleroderma renal crisis", "nephro", { s: "Diffuse SSc", keys: ["Anti-RNA polymerase III บวก"], ix: ["ACEi"] }),
      N("APS / CAPS / SLE", "nephro", { s: "aPL บวก", keys: ["LA, anticardiolipin หรือ anti-β2GPI บวก 2 ครั้งห่างกัน ≥ 12 สัปดาห์"], ix: ["aPL panel"] }),
      N("Drug-induced TMA", "nephro", { s: "Immune (quinine) หรือ dose-dependent (VEGF inhibitor, gemcitabine, mitomycin, CNI)", keys: ["Temporal relation"], ix: ["Drug-dependent antibody"] }),
      N("Transplant-associated TMA", "nephro", { s: "CNI, AMR, recurrent aHUS, HSCT-TMA", keys: ["DSA, CNI level"], ix: ["Graft biopsy"] }),
      N("Cobalamin C deficiency", "nephro", { s: "TMA ในเด็กหรือผู้ใหญ่อายุน้อย", keys: ["Homocysteine และ MMA สูง B12 ปกติ"], ix: ["MMACHC gene"] }),
      N("Pregnancy: preeclampsia, HELLP", "nephro", { s: "TMA ในไตรมาสที่ 3 ถึงช่วงแรกหลังคลอด", keys: ["sFlt-1/PlGF สูง, LFT สูง"], ix: ["มักดีขึ้นภายใน 48-72 ชั่วโมงหลังคลอด ถ้าไม่ดีขึ้นให้คิดถึง aHUS หรือ TTP และส่ง ADAMTS13"], link: "pregnancy" })
    ]),
    N("ADAMTS13 ≥ 10%, STEC negative, no secondary cause: complement-mediated TMA", "step", {
      s: "aHUS เป็น diagnosis of exclusion",
      keys: ["C3 ต่ำในผู้ป่วยเพียงราวครึ่งหนึ่ง", "Variant ใน CFH, CFI, CD46, C3, CFB, THBD พบในผู้ป่วยราว 50-60%"],
      ix: ["Complement genetics, anti-CFH, CFHR1 deletion", "เริ่ม C5 inhibitor (eculizumab หรือ ravulizumab) ได้เมื่อ ADAMTS13 activity ≥ 10% และ STEC ลบ โดยไม่ต้องรอผล genetics และให้ meningococcal vaccine ร่วม antibiotic prophylaxis"],
      std: "KDIGO 2017 aHUS controversies conference"
    }, [
      N("Genetic complement dysregulation", "nephro", { s: "CFH, CFI, MCP (CD46), C3, CFB, THBD", keys: ["Pathogenic variant"], ix: ["Genetic panel"] }),
      N("Anti-CFH antibody", "nephro", { s: "เด็กและวัยรุ่น สัมพันธ์กับ CFHR1 deletion", keys: ["Anti-CFH titer สูง"], ix: ["Anti-CFH ELISA"] }),
      N("Pregnancy-associated aHUS", "nephro", { s: "TMA หลังคลอดเป็นส่วนใหญ่", keys: ["ADAMTS13 activity ≥ 10% และไม่ดีขึ้นหลังคลอด"], ix: ["Complement genetics"] })
    ])
  ])
};

/* ===================== MONOCLONAL GAMMOPATHY ===================== */
LABTREES.mspike = {
  panel: [
    "SPEP, serum immunofixation, serum free light chain (κ, λ, ratio)",
    "Urine protein electrophoresis และ immunofixation (24-h)",
    "UPCR และ UACR (UACR/UPCR ต่ำชี้ light chain), urine sediment",
    "CBC, Ca, Cr, β2-microglobulin, LDH, albumin",
    "Whole-body low-dose CT หรือ PET-CT, bone marrow biopsy with FISH",
    "NT-proBNP, troponin, ALP ถ้าคิด AL amyloid",
    "Kidney biopsy กับ Congo red, light chain IF และ EM เมื่อมี kidney disease ที่ไม่อธิบายด้วย cast nephropathy"
  ],
  pit: [
    "SFLC κ/λ ratio ใน CKD ใช้ renal reference range 0.37-3.1 (Freelite assay) ไม่ใช่ช่วงปกติ 0.26-1.65",
    "SPEP อย่างเดียวพลาด light chain disease ต้องส่ง IFE และ SFLC ร่วม",
    "MGRS นิยามจาก kidney lesion ไม่ใช่จาก clone size และการพบ MGUS กับ CKD ไม่ได้แปลว่าเป็น MGRS จนกว่าจะ biopsy",
    "PGNMID ตรวจไม่พบ clone ในเลือดหรือไขกระดูกในราวสองในสามของผู้ป่วย จึงวินิจฉัยจาก biopsy"
  ],
  tree: N("Monoclonal gammopathy", "root", {
    s: "ยืนยัน clone ด้วย SPEP, IFE และ SFLC แล้วแยก myeloma ตาม IMWG และใช้ involved FLC กับ kidney biopsy แยก cast nephropathy, MGRS lesion และ MGUS ที่ไม่เกี่ยวกับไต",
    why: "IKMG 2019 ให้ kidney biopsy เป็นตัวตัดสินว่า clone ทำร้ายไตหรือไม่ ซึ่งเปลี่ยนการรักษาจากเฝ้าดูเป็น clone-directed therapy",
    keys: ["Involved FLC > 1,500 mg/L ร่วม AKI ชี้ cast nephropathy (biopsy เมื่อภาพไม่ตรง เช่น albuminuria มาก หรือ FLC < 500 mg/L)", "Clonal plasma cell ≥ 10% ร่วม SLiM-CRAB = myeloma", "Biopsy พบ monoclonal deposit = MGRS", "Biopsy ไม่พบ lesion ที่สัมพันธ์ = MGUS"],
    ix: ["SFLC, IFE, bone marrow, kidney biopsy"],
    std: "IKMG 2019 MGRS consensus (Leung N et al. Nat Rev Nephrol 2019), IMWG 2014 myeloma criteria (Rajkumar SV et al. Lancet Oncol 2014), IMWG 2016 kidney recommendations"
  }, [
    N("Polyclonal κ and λ both elevated, ratio within CKD range", "step", {
      s: "Polyclonal FLC สูงจาก clearance ลดลง ไม่ใช่ clone ถ้า IFE ลบด้วย",
      keys: ["κ/λ ratio 0.37-3.1 ใน CKD", "Serum และ urine IFE ลบ"],
      ix: ["ไม่ต้อง work-up clone ต่อเมื่อ ratio อยู่ใน renal range และ IFE ลบ (renal range ลด sensitivity ต่อ λ clone ขนาดเล็ก ถ้าภาพทางคลินิกสงสัย AL amyloid ให้ทำต่อ)"]
    }, [
      N("Polyclonal FLC elevation from CKD", "nephro", { s: "Kappa และ lambda สูงทั้งคู่", keys: ["Ratio อยู่ในช่วงของ CKD"], ix: ["ไม่ต้องทำ bone marrow"] })
    ]),
    N("AKI with involved FLC > 1,500 mg/L, or Ca high: myeloma kidney", "step", {
      s: "Cast nephropathy หรือ hypercalcemic AKI",
      keys: ["Involved FLC > 1,500 mg/L", "Ca สูง", "UACR/UPCR ต่ำ"],
      ix: ["Bone marrow, imaging, biopsy ถ้า FLC < 500 mg/L หรือมี albuminuria มาก"],
      std: "IMWG 2016 kidney recommendations"
    }, [
      N("Light chain cast nephropathy", "nephro", { s: "AKI ใน myeloma", keys: ["FLC สูงมาก, bland sediment"], ix: ["เป้าหมายคือลด involved FLC ให้เร็วที่สุดด้วย bortezomib-based regimen"] }),
      N("Hypercalcemic AKI", "nephro", { s: "Ca สูงจาก bone resorption", keys: ["Ca สูง PTH ต่ำ"], ix: ["ไปที่ approach hypercalcemia"], link: "hyperca" })
    ]),
    N("Kidney biopsy: glomerular monoclonal Ig deposits (MGRS)", "step", {
      s: "แยกด้วย Congo red, IF light chain และ EM",
      keys: ["Congo red บวก = amyloid ซึ่งต้อง typing ก่อนเรียก AL (light chain restriction บน IF หรือ mass spectrometry) เพราะ AA, ALECT2 และ hereditary amyloid พบร่วมกับ MGUS โดยบังเอิญได้", "Linear light chain ตาม GBM และ TBM = MIDD", "Monoclonal IgG granular = PGNMID", "Microtubule = immunotactoid หรือ cryo type I", "C3 dominant + M-protein = C3G with MG"],
      ix: ["Mass spectrometry typing, EM, cryoglobulin"],
      std: "IKMG 2019"
    }, [
      N("AL amyloidosis", "nephro", { s: "Nephrotic, cardiac, neuropathy", keys: ["Lambda เด่น", "NT-proBNP สูง"], ix: ["Mayo staging"] }),
      N("MIDD (LCDD, HCDD, LHCDD)", "nephro", { s: "Nodular GS, kappa เด่น", keys: ["Linear κ บน GBM และ TBM"], ix: ["Bone marrow"] }),
      N("PGNMID", "nephro", { s: "MPGN หรือ endocapillary pattern กับ IgG3 kappa", keys: ["Clone ในเลือดหรือไขกระดูกพบเพียงราวหนึ่งในสาม"], ix: ["Flow cytometry ไขกระดูก"] }),
      N("Immunotactoid GN / cryoglobulinemic GN type I", "nephro", { s: "Microtubular deposits ส่วนใหญ่ > 30 nm (14-60 nm)", keys: ["Type I cryo บวก"], ix: ["Cryoglobulin, EM"] }),
      N("C3 glomerulopathy with monoclonal gammopathy", "nephro", { s: "C3G อายุ > 50", keys: ["IFE หรือ SFLC ผิดปกติ"], ix: ["Pronase IF หา masked Ig"] }),
      N("TMA with monoclonal gammopathy / POEMS", "nephro", { s: "TMA หรือ endotheliosis กับ M-protein", keys: ["VEGF สูงใน POEMS", "λ เด่น"], ix: ["Serum VEGF"] })
    ]),
    N("Fanconi syndrome or crystals: tubular MGRS", "step", {
      s: "Light chain สะสมใน proximal tubule หรือ histiocyte",
      keys: ["Normoglycemic glucosuria, phosphaturia, LMW proteinuria", "Kappa เด่น"],
      ix: ["Biopsy with EM"],
      link: "tubulopathy"
    }, [
      N("Light chain proximal tubulopathy", "nephro", { s: "Fanconi syndrome, kappa เด่น", keys: ["κ restriction ใน PT"], ix: ["EM crystals"] }),
      N("Crystal-storing histiocytosis / crystalglobulinemia", "nephro", { s: "Crystal ใน histiocyte หรือ vascular lumen", keys: ["Crystalglobulin ใน serum"], ix: ["Biopsy"] })
    ]),
    N("Bone marrow or imaging meets a malignancy definition", "step", {
      s: "Myeloma หรือ lymphoproliferative disease",
      keys: ["Clonal plasma cell ≥ 10% ร่วม CRAB หรือ SLiM (plasma cell ≥ 60%, involved/uninvolved FLC ratio ≥ 100 โดย involved FLC ≥ 100 mg/L, > 1 focal lesion ขนาด ≥ 5 mm บน MRI)", "IgM M-protein + lymphoplasmacytic infiltrate = WM"],
      ix: ["Bone marrow FISH, PET-CT, MRI"],
      std: "IMWG 2014"
    }, [
      N("Multiple myeloma", "nephro", { s: "Clonal plasma cell ≥ 10% กับ CRAB หรือ SLiM", keys: ["FLC ratio ≥ 100"], ix: ["Bone marrow, imaging"] }),
      N("Waldenstrom macroglobulinemia / CLL / lymphoma", "nephro", { s: "IgM M-protein, hyperviscosity", keys: ["IgM สูง, MYD88 L265P"], ix: ["Serum viscosity, bone marrow"] })
    ]),
    N("M-protein without a related kidney lesion or malignancy", "step", {
      s: "MGUS ที่อยู่ร่วมกับ CKD",
      keys: ["Biopsy ไม่พบ monoclonal deposit", "Plasma cell < 10%, ไม่มี SLiM-CRAB"],
      ix: ["ติดตามตาม Mayo risk stratification"]
    }, [
      N("Coincidental MGUS", "adj", { s: "ติดตาม M-protein ตาม risk", keys: ["M-protein < 1.5 g/dL, IgG isotype และ FLC ratio ปกติ = low risk (Mayo)"], ix: ["SPEP ที่ 6 เดือน แล้วห่างตาม risk (low risk ทุก 2-3 ปี, กลุ่มอื่นทุกปี)", "ติดตาม Cr, UPCR และ sediment เพราะ MGRS เกิดภายหลังได้"] })
    ])
  ])
};

/* ===================== ANEMIA AND CYTOPENIAS ===================== */
LABTREES.cytopenia = {
  panel: [
    "CBC with indices (MCV, RDW), reticulocyte count และ reticulocyte production index, peripheral smear",
    "Ferritin, TSAT (serum iron/TIBC), B12, folate",
    "LDH, haptoglobin, indirect bilirubin, DAT ถ้า reticulocyte สูง",
    "CRP, TSH, SPEP และ SFLC ถ้า anemia ไม่สมกับ CKD stage",
    "Hb typing (Hb electrophoresis) ในคนไทยที่ microcytosis ไม่สมกับ iron",
    "Stool occult blood หรือ endoscopy ตามข้อบ่งชี้",
    "ตามแขนง: ANA, ferritin และ TG สำหรับ HLH, CMV, EBV, parvovirus B19 PCR, bone marrow"
  ],
  pit: [
    "Ferritin เป็น acute-phase reactant อาจสูงทั้งที่ iron store ต่ำ ใช้ TSAT ร่วมเสมอ",
    "Thalassemia trait ทำให้ MCV ต่ำโดย ferritin ปกติ จึงไม่ควรให้ iron เพียงเพราะ MCV ต่ำ ถ้าไม่มีหลักฐาน iron deficiency",
    "Anemia ที่ไม่สมกับ eGFR (Hb ต่ำมากเมื่อ eGFR > 30) ต้องหาสาเหตุอื่นก่อนสรุป anemia of CKD",
    "Reticulocyte ต่ำใน KT ร่วม Hb ลดเร็วให้คิด parvovirus B19 PRCA"
  ],
  tree: N("Anemia and cytopenias", "root", {
    s: "ใช้ reticulocyte แยก hypoproliferative กับ hemolysis หรือ blood loss แล้วใช้ iron indices ตาม KDIGO 2026, MCV, smear และ lineage ที่ลดไปสู่ diagnosis",
    why: "KDIGO 2026 กำหนด initial work-up ของ anemia ใน CKD และเกณฑ์ iron ที่ใช้ตัดสินใจรักษา",
    keys: ["Anemia: Hb < 13 g/dL ในชาย, < 12 g/dL ในหญิง", "Reticulocyte ต่ำ ชี้ hypoproliferative", "Reticulocyte สูงร่วม LDH สูงและ haptoglobin ต่ำ ชี้ hemolysis (reticulocyte สูงโดย hemolysis markers ปกติ ชี้ blood loss)", "ลดหลาย lineage ชี้ marrow disease หรือ systemic disease"],
    ix: ["Reticulocyte, ferritin, TSAT, B12, folate, smear"],
    std: "KDIGO 2026 Anemia in CKD guideline"
  }, [
    N("Reticulocyte low, iron indices low: iron deficiency", "step", {
      s: "Absolute หรือ functional iron deficiency",
      keys: ["KDIGO 2026: CKD ที่ไม่ได้ HD ให้ iron เมื่อ ferritin < 100 ng/mL ร่วม TSAT < 40% หรือ ferritin 100-300 ng/mL ร่วม TSAT < 25%", "HD: ให้ iron เมื่อ ferritin ≤ 500 ng/mL และ TSAT ≤ 30%", "งด iron เมื่อ ferritin > 700 ng/mL หรือ TSAT ≥ 40%", "เกณฑ์เหล่านี้เป็นเกณฑ์ตัดสินใจให้ iron ไม่ใช่นิยามของ iron deficiency"],
      ix: ["หา GI blood loss ใน absolute iron deficiency"],
      std: "KDIGO 2026 Anemia in CKD"
    }, [
      N("Iron deficiency (absolute or functional)", "nephro", { s: "Absolute หรือ functional", keys: ["TSAT < 20% เป็นสัญญาณชัด"], ix: ["Endoscopy ถ้า absolute"] }),
      N("GI bleeding", "nephro", { s: "Angiodysplasia, PUD, malignancy", keys: ["FOBT บวก, BUN/Cr สูง"], ix: ["Endoscopy"], link: "gibleed" }),
      N("Dialysis-related blood loss", "nephro", { s: "Dialyzer clotting, phlebotomy, access bleeding", keys: ["Hb ลดค่อยเป็นค่อยไปใน HD"], ix: ["Review circuit clotting"] }),
      N("Hematuria / menstrual loss", "adj", { s: "Urologic หรือ gynecologic loss", keys: ["Gross hematuria, menorrhagia"], ix: ["Urinalysis, gynecologic exam"] })
    ]),
    N("Reticulocyte low, iron replete, MCV normal: CKD-related hypoproliferation", "step", {
      s: "Anemia of CKD ถ้า eGFR สมกับความรุนแรง",
      keys: ["eGFR < 30 mL/min/1.73 m² ร่วม Hb ต่ำ (anemia of CKD เกิดได้ตั้งแต่ eGFR < 60 แต่ Hb ต่ำมากขณะ eGFR > 30 ต้องหาสาเหตุอื่น)", "CRP ปกติหรือสูงเล็กน้อย", "เป็น diagnosis of exclusion"],
      ix: ["ตัด B12, folate, hypothyroidism, myeloma ก่อนเริ่ม ESA"]
    }, [
      N("Anemia of CKD", "nephro", { s: "EPO deficiency กับ inflammation", keys: ["KDIGO 2026: หลังแก้ iron deficiency และสาเหตุที่แก้ได้ เริ่ม ESA ที่ Hb ≤ 9-10 g/dL (dialysis) หรือ 8.5-10 g/dL (ไม่ได้ dialysis, ปรับตามผู้ป่วยแต่ละราย)", "Target Hb ≤ 11.5 g/dL โดยทั่วไป 10-11.5 g/dL"], ix: ["ESA เป็นตัวเลือกแรก ส่วน HIF-PHI เป็นทางเลือกเมื่อต้องการยากิน, ทน ESA ไม่ได้ หรือเก็บยาเย็นไม่ได้"], std: "KDIGO 2026" }),
      N("ESA hyporesponsiveness", "nephro", { s: "Hb ไม่ขึ้นแม้ ESA ขนาดสูง", keys: ["Iron deficiency, inflammation, inadequate dialysis, hyperparathyroidism, aluminum, PRCA"], ix: ["Iron indices, CRP, PTH, Kt/V, anti-EPO antibody"] }),
      N("Hypothyroidism / aluminum / copper deficiency", "adj", { s: "Uncommon causes", keys: ["TSH สูง", "Copper ต่ำหลัง bariatric หรือ zinc excess"], ix: ["TSH, aluminum, copper"] })
    ]),
    N("Reticulocyte low with abnormal MCV or out of proportion to eGFR", "step", {
      s: "Nutrient, hemoglobinopathy, marrow หรือ drug",
      keys: ["MCV ต่ำโดย ferritin ปกติ ชี้ thalassemia trait (แยก anemia of inflammation)", "MCV สูง ชี้ B12 หรือ folate deficiency, ยา, hypothyroidism, MDS", "Rouleaux ร่วม globulin สูง ชี้ myeloma", "Reticulocyte เกือบศูนย์ ชี้ PRCA"],
      ix: ["Hb typing, B12, folate, SPEP, SFLC, parvovirus PCR, drug review"]
    }, [
      N("Thalassemia trait / hemoglobinopathy", "nephro", { s: "Microcytosis ไม่สมกับ iron status พบบ่อยในไทย", keys: ["MCV < 80 ferritin ปกติ, RBC count สูง"], ix: ["Hb typing, DNA analysis"] }),
      N("B12 / folate deficiency", "nephro", { s: "Macrocytic anemia", keys: ["B12 < 200 pg/mL หรือ MMA สูง (MMA และ homocysteine สูงได้จาก CKD เอง จึงแปลผลร่วม B12 level)"], ix: ["B12, folate, MMA"] }),
      N("Myeloma / marrow infiltration", "nephro", { s: "Anemia ไม่สมกับ CKD stage", keys: ["Rouleaux, M-protein"], ix: ["SPEP, SFLC, bone marrow"], link: "mspike" }),
      N("Drug-induced marrow suppression", "nephro", { s: "MMF, azathioprine (ร่วม allopurinol), valganciclovir, TMP-SMX", keys: ["Leukopenia ร่วม"], ix: ["Drug review, TPMT และ NUDT15 genotype (NUDT15 สำคัญกว่าในคนเอเชีย)"] }),
      N("Parvovirus B19 PRCA in KT", "nephro", { s: "Reticulocyte ต่ำมากใน KT", keys: ["Reticulocyte < 1%", "Parvovirus PCR บวก (IgM อาจลบในผู้กดภูมิ)"], ix: ["Parvovirus B19 PCR, IVIG"] })
    ]),
    N("Reticulocyte high, LDH high, haptoglobin low: hemolysis", "step", {
      s: "แยกด้วย smear และ DAT",
      keys: ["Schistocyte ชี้ MAHA", "DAT บวก ชี้ AIHA", "Spherocyte โดย DAT ลบ, bite cell หรือพบ malaria บน film ชี้ intrinsic RBC defect หรือ infection", "Hemolysis ที่เกิดพร้อมกันหลายรายระหว่าง HD ชี้ dialysis-associated hemolysis"],
      ix: ["Smear, DAT, G6PD, flow cytometry (PNH), malaria film, Hb typing"]
    }, [
      N("Microangiopathic hemolytic anemia", "nephro", { s: "Schistocyte กับ thrombocytopenia", keys: ["Schistocyte > 1%"], ix: ["ADAMTS13"], link: "tma" }),
      N("Autoimmune hemolytic anemia", "nephro", { s: "DAT บวก", keys: ["Spherocyte, DAT บวก"], ix: ["ANA, lymphoma work-up"] }),
      N("G6PD / PNH / thalassemia / malaria", "nephro", { s: "Intravascular หรือ chronic hemolysis", keys: ["G6PD activity ต่ำ (วัดหลัง hemolysis หาย)", "CD55 และ CD59 ต่ำ (PNH)"], ix: ["G6PD, flow cytometry, malaria film"] }),
      N("Dialysis-associated hemolysis", "nephro", { s: "Chloramine, copper, formaldehyde, dialysate overheated หรือ hypotonic, kinked bloodline", keys: ["หลายรายพร้อมกันในหน่วยเดียว"], ix: ["Water quality testing ตาม AAMI"], link: "hd-water" })
    ]),
    N("Two or three lineages low", "step", {
      s: "Systemic disease หรือ primary marrow disease",
      keys: ["ANA บวกร่วม anti-dsDNA หรือ complement ต่ำ ชี้ SLE (ANA บวกอย่างเดียวไม่จำเพาะ)", "Ferritin > 3,000 ng/mL ร่วม fever, TG สูง, fibrinogen ต่ำ ชี้ HLH", "Splenomegaly ชี้ hypersplenism", "KT ร่วมไข้ ชี้ viral infection (CMV, EBV, parvovirus) โดยต้องแยกยา (MMF, valganciclovir, TMP-SMX)", "Blast หรือ dysplasia ชี้ primary marrow disease"],
      ix: ["ANA, ferritin, TG, fibrinogen, HScore, CMV/EBV PCR, bone marrow"]
    }, [
      N("SLE", "nephro", { s: "Leukopenia, lymphopenia, thrombocytopenia, AIHA", keys: ["ANA, anti-dsDNA บวก, C3 C4 ต่ำ"], ix: ["ไปที่ approach RPGN ถ้ามี nephritis"] }),
      N("HLH / MAS", "nephro", { s: "Fever, ferritin สูงมาก, splenomegaly", keys: ["HLH-2004 ≥ 5 ใน 8 criteria หรือ HScore ≥ 169"], ix: ["sCD25, bone marrow"], std: "HLH-2004 criteria (Henter JI et al. Pediatr Blood Cancer 2007)" }),
      N("Hypersplenism", "adj", { s: "Cirrhosis, lymphoma, thalassemia", keys: ["Splenomegaly บน imaging"], ix: ["Ultrasound"] }),
      N("Infection in KT: CMV, EBV, parvovirus", "nephro", { s: "Leukopenia กับไข้หลัง KT", keys: ["CMV PCR บวก"], ix: ["CMV, EBV, parvovirus PCR"], link: "kt-fever" }),
      N("Primary marrow disease: MDS, aplastic anemia, leukemia", "adj", { s: "Dysplasia หรือ blast", keys: ["Blast บน smear"], ix: ["Bone marrow"] })
    ])
  ])
};

/* ===================== POLYURIA ===================== */
LABTREES.polyuria = {
  panel: [
    "24-h urine volume หรือ frequency-volume chart 3 วัน",
    "Serum Na, glucose, Ca, K, Cr, serum osm",
    "Urine osm, Na, K, urea, glucose",
    "Baseline plasma copeptin (ไม่ต้องอดน้ำ)",
    "Arginine-stimulated หรือ hypertonic saline-stimulated copeptin เมื่อ baseline copeptin ไม่ชี้ AVP resistance",
    "Lithium level, PTH ถ้า Ca สูง, pituitary MRI ถ้า AVP deficiency"
  ],
  pit: [
    "Water deprivation test แบบดั้งเดิมแม่นยำ 76.6% เทียบกับ hypertonic saline-stimulated copeptin 96.5% (Fenske NEJM 2018)",
    "Nocturia ไม่ใช่ polyuria จนกว่าจะยืนยันปริมาณรวม > 3 L/d",
    "แก้ hypercalcemia และ hypokalemia ก่อนแปลว่าเป็น AVP resistance ถาวร",
    "Hypertonic saline test ต้องวัด Na ทุก 30 นาทีและหยุดเมื่อ Na ≥ 150 mmol/L", "Arginine-stimulated copeptin แม่นยำน้อยกว่า hypertonic saline-stimulated copeptin (74.4% เทียบกับ 95.6%, Refardt NEJM 2023) จึงใช้ hypertonic saline เป็น test หลักเมื่อทำได้"
  ],
  tree: N("Polyuria and nocturia", "root", {
    s: "ยืนยัน polyuria แล้วใช้ urine osm แยก solute กับ water diuresis จากนั้น plasma Na และ copeptin (baseline แล้ว stimulated) แยก AVP deficiency, AVP resistance และ primary polydipsia",
    why: "Copeptin-based algorithm แม่นกว่า water deprivation test และใช้ในแนวทางปัจจุบัน",
    keys: ["Polyuria > 3 L/d หรือ > 40-50 mL/kg/d", "Urine osm > 300 mOsm/kg ร่วม osmolar excretion > 1,000 mOsm/d = solute diuresis", "Urine osm < 300 mOsm/kg ชี้ water diuresis (partial AVP deficiency หรือ resistance อาจมี urine osm 300-800)", "Baseline copeptin > 21.4 pmol/L โดยไม่ต้องอดน้ำ วินิจฉัย AVP resistance", "Stimulated copeptin แยก AVP deficiency กับ primary polydipsia"],
    ix: ["24-h volume, urine osm, copeptin"],
    std: "Christ-Crain M et al. Nat Rev Dis Primers 2019, Timper K et al. JCEM 2015, Fenske W et al. NEJM 2018, Winzeler B et al. Lancet 2019, Refardt J et al. NEJM 2023, AVP deficiency and resistance nomenclature 2022"
  }, [
    N("24-h volume normal, nocturnal fraction high or small voided volumes: nocturia without polyuria", "step", {
      s: "Nocturnal polyuria หรือ bladder capacity ลด",
      keys: ["Nocturnal polyuria index > 33% ในผู้สูงอายุ (> 20% ในคนอายุน้อย)", "Voided volume น้อยแต่ถ่ายบ่อย ชี้ bladder capacity ลด"],
      ix: ["Frequency-volume chart, PVR, NT-proBNP, sleep study"],
      std: "ICS 2019 nocturia terminology"
    }, [
      N("Nocturnal polyuria", "nephro", { s: "HF, edema mobilization, OSA, evening diuretic, CKD", keys: ["Nocturnal volume > 33% ของ 24 ชั่วโมง"], ix: ["NT-proBNP, sleep study"] }),
      N("Reduced bladder capacity / LUTS", "nephro", { s: "BPH, overactive bladder, cystitis, bladder cancer", keys: ["Voided volume < 200 mL บ่อย", "PVR สูง"], ix: ["PVR, urinalysis, cystoscopy"], link: "luts" })
    ]),
    N("Urine osm > 300 with osmolar excretion > 1,000 mOsm/d: solute diuresis", "step", {
      s: "ระบุ solute หลักจาก urine composition",
      keys: ["Urine glucose สูง = glucose", "Urine urea > 50-60% ของ osm = urea", "2 × (UNa + UK) อธิบาย osm ส่วนใหญ่ = saline", "Osmolal gap ใน urine = exogenous osmole"],
      ix: ["Urine glucose, urea, Na, K, osm"]
    }, [
      N("Glucose diuresis", "nephro", { s: "Uncontrolled DM หรือ SGLT2 inhibitor", keys: ["Glucosuria"], ix: ["HbA1c"] }),
      N("Urea diuresis", "nephro", { s: "Recovery ATN, post-obstructive, high-protein feeding, catabolic state", keys: ["Urine urea excretion สูง"], ix: ["BUN trend"] }),
      N("Saline diuresis", "nephro", { s: "Large-volume saline, edema mobilization, diuretic, salt-wasting", keys: ["Urine Na สูง"], ix: ["Fluid balance"] }),
      N("Mannitol / contrast / IVIG", "adj", { s: "Exogenous osmole", keys: ["Urine osmolal gap"], ix: ["Drug history"] }),
      N("Post-obstructive diuresis", "nephro", { s: "หลังใส่ catheter หรือ nephrostomy", keys: ["> 200 mL/h ติดกัน 2 ชั่วโมง หรือ > 3 L/24 ชั่วโมง"], ix: ["Urine Na, osm, monitor electrolytes"], link: "hydro" }),
      N("Recovery phase of ATN / post-transplant diuresis", "nephro", { s: "Polyuria ช่วง graft ทำงานหรือ ATN กำลังหาย", keys: ["Urine osm ใกล้ plasma"], ix: ["Replace ตาม output บางส่วน"] })
    ]),
    N("Urine osm < 300, baseline copeptin > 21.4 pmol/L: AVP resistance", "step", {
      s: "Nephrogenic DI",
      keys: ["Copeptin baseline > 21.4 pmol/L", "Desmopressin แทบไม่เพิ่ม urine osm"],
      ix: ["Ca, K, lithium level, drug review, renal ultrasound, AVPR2 และ AQP2 genetics"],
      std: "Timper K et al. JCEM 2015"
    }, [
      N("Lithium-induced NDI", "nephro", { s: "Lithium ระยะยาว", keys: ["Lithium use"], ix: ["Lithium level, eGFR"] }),
      N("Hypercalcemia", "nephro", { s: "Ca > 11 mg/dL", keys: ["Ca สูง"], ix: ["PTH"], link: "hyperca" }),
      N("Hypokalemia", "nephro", { s: "Chronic hypokalemia ลด AQP2", keys: ["K ต่ำต่อเนื่อง"], ix: ["Urine K/Cr"], link: "hypok" }),
      N("Tubulointerstitial disease", "nephro", { s: "Sickle cell, Sjögren, amyloid, obstruction, ADPKD, chronic TIN", keys: ["Tubular proteinuria, NAGMA"], ix: ["Renal ultrasound"] }),
      N("Drug-induced: demeclocycline, amphotericin, foscarnet, ifosfamide, cidofovir, tolvaptan", "nephro", { s: "Drug ที่ทำ NDI", keys: ["Temporal relation"], ix: ["Drug review"] }),
      N("Congenital NDI (AVPR2, AQP2)", "nephro", { s: "Polyuria ตั้งแต่เกิด", keys: ["Copeptin สูงมาก"], ix: ["Genetic test"] })
    ]),
    N("Urine osm < 300, baseline copeptin ≤ 21.4 pmol/L, stimulated copeptin low: AVP deficiency", "step", {
      s: "Central DI",
      keys: ["Hypertonic saline-stimulated copeptin ≤ 4.9 pmol/L เมื่อ Na ≥ 150 mmol/L", "หรือ arginine-stimulated copeptin ≤ 3.8 pmol/L ที่ 60 นาที (แม่นยำน้อยกว่า)", "Plasma Na มักอยู่ช่วง high-normal"],
      ix: ["Pituitary MRI, anterior pituitary function, ACE, IgG4, β-hCG และ AFP"],
      std: "Fenske W et al. NEJM 2018, Winzeler B et al. Lancet 2019"
    }, [
      N("Post-surgical / traumatic central DI", "nephro", { s: "หลัง pituitary surgery หรือ head trauma", keys: ["Triphasic response"], ix: ["Na ทุก 6-8 ชั่วโมงหลังผ่าตัด"] }),
      N("Infiltrative / inflammatory: IgG4, sarcoid, LCH, lymphocytic hypophysitis, ICI", "nephro", { s: "Central DI กับ systemic disease", keys: ["Stalk thickening"], ix: ["IgG4, ACE, PET-CT"] }),
      N("Neoplastic: craniopharyngioma, germinoma, metastasis", "adj", { s: "Central DI กับ mass", keys: ["Mass บน MRI", "β-hCG หรือ AFP ใน CSF สูง (germinoma)"], ix: ["MRI, CSF tumor markers"] }),
      N("Idiopathic / familial (AVP gene)", "adj", { s: "ไม่มี lesion", keys: ["MRI ปกติ"], ix: ["AVP gene, MRI ซ้ำ"] }),
      N("Gestational DI", "nephro", { s: "Placental vasopressinase ในไตรมาส 3", keys: ["ตอบสนองต่อ desmopressin"], ix: ["LFT"] })
    ]),
    N("Urine osm < 300, plasma Na low-normal, stimulated copeptin high: primary polydipsia", "step", {
      s: "ดื่มน้ำเกิน ทำให้ AVP ถูกกดอย่างเหมาะสม (physiologic suppression)",
      keys: ["Stimulated copeptin > 4.9 pmol/L (hypertonic saline) หรือ > 3.8 pmol/L (arginine)", "Plasma Na มักอยู่ช่วง low-normal"],
      ix: ["Psychiatric history, drug review"]
    }, [
      N("Psychogenic polydipsia", "nephro", { s: "Schizophrenia, antipsychotic", keys: ["Na ต่ำเป็นครั้งคราว"], ix: ["Water intake monitoring"] }),
      N("Dipsogenic / habitual polydipsia", "adj", { s: "Thirst lesion หรือดื่มเพราะเชื่อว่าดี", keys: ["Copeptin ตอบสนองปกติ"], ix: ["Behavioral counseling"] })
    ])
  ])
};

/* ===================== NEPHROLITHIASIS AND RECURRENT UTI ===================== */
LABTREES.stone = {
  panel: [
    "Stone analysis ด้วย infrared spectroscopy หรือ X-ray diffraction ทุกครั้งที่มีนิ่ว",
    "Serum Cr, Ca, PO4, uric acid, HCO3, K, intact PTH ถ้า Ca สูงหรือสูงปกติ",
    "Urinalysis, urine pH (pH meter), urine culture, cyanide-nitroprusside screen ถ้าคิด cystine",
    "24-h urine 2 ครั้ง (high-risk หรือ recurrent): volume, Ca, oxalate, citrate, uric acid, Na, Cr, pH",
    "Non-contrast low-dose CT"
  ],
  pit: [
    "เก็บ 24-h urine หลังพ้นช่วง acute อย่างน้อย 3-4 สัปดาห์และขณะกินอาหารตามปกติ",
    "ตรวจความครบของการเก็บด้วย urine Cr (ราว 15-20 mg/kg/d ในหญิง 20-25 mg/kg/d ในชาย)",
    "Urine pH > 7.0 ร่วม urease-producing organism ชี้ infection stone (struvite) และในภาวะนี้ใช้ urine pH วินิจฉัย dRTA ไม่ได้",
    "Oxalate > 0.7 mmol/1.73 m²/d ซ้ำอย่างน้อย 2 ครั้งหลังตัด enteric cause (ปกติ < 0.46, ถ้า > 1.0 ชี้ PH ชัดเจน) ในเด็กหรือผู้ใหญ่อายุน้อยต้องส่ง genetic test หา primary hyperoxaluria"
  ],
  tree: N("Nephrolithiasis and recurrent UTI", "root", {
    s: "Stone analysis บอกชนิดนิ่วเป็นอย่างแรก แล้วใช้ serum chemistry และ 24-h urine ตามชนิดนิ่ว (Ca, oxalate, citrate, uric acid, pH, cystine) ไปสู่ metabolic diagnosis",
    why: "EAU และ AUA ให้ stone analysis และ metabolic evaluation ตาม risk group เป็นฐานของ recurrence prevention",
    keys: ["Ca oxalate: urine Ca, oxalate, citrate, uric acid", "Ca phosphate: urine pH สูง, HCO3, citrate, PTH", "Uric acid: urine pH < 5.5, uric acid excretion", "Struvite: urease organism", "Cystine: nitroprusside screen, 24-h cystine"],
    ix: ["Stone analysis, 24-h urine, serum Ca, PTH, uric acid, HCO3"],
    std: "EAU urolithiasis guideline 2024, AUA medical management of kidney stones (Pearle MS et al. J Urol 2014, validity confirmed 2019)"
  }, [
    N("Calcium oxalate stone", "step", {
      s: "24-h urine แยก hypercalciuria, hyperoxaluria และ risk อื่น",
      keys: ["Urine Ca > 300 mg/d (ชาย) หรือ > 250 mg/d (หญิง) หรือ > 4 mg/kg/d", "Oxalate > 40-45 mg/d, > 80 mg/d ชี้ enteric หรือ primary", "Citrate < 320 mg/d", "Uric acid > 800 mg/d (ชาย) หรือ > 750 mg/d (หญิง)", "Volume < 2 L/d"],
      ix: ["Serum Ca และ PTH ถ้า hypercalciuria", "Fat malabsorption history ถ้า oxalate สูง"]
    }, [
      N("Primary hyperparathyroidism", "nephro", { s: "Hypercalcemia กับ stone", keys: ["Ca สูงร่วม PTH สูงหรือ inappropriately normal"], ix: ["ไปที่ approach hypercalcemia"], link: "hyperca" }),
      N("Idiopathic hypercalciuria", "nephro", { s: "Normocalcemic hypercalciuria", keys: ["Serum Ca และ PTH ปกติ", "Urine Ca สูง"], ix: ["Thiazide, Na restriction"] }),
      N("Enteric hyperoxaluria", "nephro", { s: "Fat malabsorption, RYGB, short bowel", keys: ["Oxalate > 80 mg/d", "Citrate ต่ำ volume ต่ำ"], ix: ["Fecal fat"] }),
      N("Dietary and ingestion-related hyperoxaluria", "nephro", { s: "Juicing, มะเฟือง, ตะลิงปลิง, ถั่ว, cocoa, ผักโขม, vitamin C ขนาดสูง", keys: ["Oxalate สูงลดลงเมื่อหยุดอาหาร"], ix: ["Dietary history"] }),
      N("Primary hyperoxaluria", "nephro", { s: "Recurrent stone ตั้งแต่เด็ก, nephrocalcinosis", keys: ["Oxalate > 0.7 mmol/1.73 m²/d ซ้ำอย่างน้อย 2 ครั้งหลังตัด enteric cause (ปกติ < 0.46, ถ้า > 1.0 ชี้ PH ชัดเจน)", "Glycolate หรือ glycerate สูง"], ix: ["AGXT, GRHPR, HOGA1 genetic test"] }),
      N("Hypocitraturia / hyperuricosuria / low volume", "nephro", { s: "Metabolic risk ที่แก้ได้", keys: ["Citrate < 320 mg/d, uric acid สูง, volume < 2 L"], ix: ["Potassium citrate, ดื่มน้ำให้ได้ urine volume ≥ 2.5 L/d"] })
    ]),
    N("Calcium phosphate stone or nephrocalcinosis with urine pH > 6.0", "step", {
      s: "Urine pH สูงและ citrate ต่ำ",
      keys: ["HCO3 ต่ำร่วม urine pH > 5.5 ชี้ dRTA", "HCO3 ปกติไม่ตัด incomplete dRTA ซึ่งต้องทำ acid loading test (NH4Cl หรือ furosemide กับ fludrocortisone)", "Topiramate หรือ acetazolamide", "Ca หรือ PTH สูง, 1,25(OH)2D สูง"],
      ix: ["Blood gas, urine citrate, PTH, 1,25(OH)2D, ACE"]
    }, [
      N("Distal RTA", "nephro", { s: "CaP stone, nephrocalcinosis, hypocitraturia", keys: ["Urine pH > 5.5 ขณะ HCO3 ต่ำ"], ix: ["ไปที่ approach NAGMA"], link: "nagma" }),
      N("Carbonic anhydrase inhibitor: topiramate, acetazolamide, zonisamide", "nephro", { s: "Drug-induced CaP stone", keys: ["Citrate ต่ำมาก"], ix: ["Drug review"] }),
      N("Medullary sponge kidney", "nephro", { s: "Nephrocalcinosis, paintbrush appearance", keys: ["Hypercalciuria, hypocitraturia"], ix: ["CT urography"] }),
      N("Hypercalciuric states: sarcoid, vitamin D, Dent, milk-alkali", "nephro", { s: "Hypercalciuria จาก systemic cause", keys: ["1,25(OH)2D สูง หรือ LMW proteinuria (Dent)"], ix: ["ACE, 1,25(OH)2D, urine β2M"] })
    ]),
    N("Uric acid stone", "step", {
      s: "Urine pH ต่ำเป็นปัจจัยหลัก",
      keys: ["Urine pH < 5.5 ตลอดวัน", "Uric acid excretion สูงใน overproduction"],
      ix: ["24-h urine pH และ uric acid, HbA1c"]
    }, [
      N("Low urine pH: insulin resistance, ileostomy, chronic diarrhea", "nephro", { s: "Uric acid stone แม้ urate ปกติ", keys: ["Urine pH < 5.5, urate ปกติ"], ix: ["Alkalinization pH 6.0-6.5"] }),
      N("Hyperuricosuria: gout, TLS, myeloproliferative", "nephro", { s: "Urate overproduction", keys: ["Uric acid > 800 mg/d"], ix: ["CBC, uric acid"] })
    ]),
    N("Struvite stone, urine pH > 7.0, urease-producing organism", "step", {
      s: "Infection stone",
      keys: ["Proteus, Klebsiella, Ureaplasma", "Staghorn"],
      ix: ["Urine และ stone culture, imaging หา structural cause, PVR"]
    }, [
      N("Struvite stone (infection stone)", "nephro", { s: "Staghorn calculus", keys: ["Urine pH > 7.0, urease organism"], ix: ["Complete stone removal"] }),
      N("Underlying recurrent UTI: structural or functional cause", "nephro", { s: "≥ 2 ครั้งใน 6 เดือนหรือ ≥ 3 ครั้งใน 12 เดือน", keys: ["Culture ยืนยันทุกครั้ง"], ix: ["Renal ultrasound, PVR, VCUG ตามข้อบ่งชี้"] })
    ]),
    N("Cystine, 2,8-DHA or drug stone on analysis", "step", {
      s: "ชนิดนิ่วระบุโรคได้โดยตรง",
      keys: ["Hexagonal crystal, nitroprusside บวก = cystinuria", "2,8-DHA = APRT deficiency", "Drug component บน IR"],
      ix: ["24-h urine cystine, APRT activity, drug review"]
    }, [
      N("Cystinuria", "nephro", { s: "Recurrent cystine stone ตั้งแต่เด็ก", keys: ["Cystine concentration > 250 mg/L ตกผลึก เป้าหมายคือให้ต่ำกว่านี้"], ix: ["SLC3A1, SLC7A9 genetic test"] }),
      N("APRT deficiency (2,8-dihydroxyadenine)", "nephro", { s: "Radiolucent stone หรือ crystal nephropathy", keys: ["Round brown crystal with Maltese cross"], ix: ["APRT activity, genetic test, allopurinol"] }),
      N("Drug stones", "nephro", { s: "Indinavir, atazanavir, sulfadiazine, triamterene, ceftriaxone", keys: ["Drug component บน stone analysis"], ix: ["Drug review"] })
    ]),
    N("Nephrocalcinosis on imaging", "step", {
      s: "แยก medullary กับ cortical แล้วทำ metabolic work-up",
      keys: ["Medullary: Ca, PTH, blood gas, urine Ca, Mg", "Cortical: history ของ cortical necrosis, oxalosis"],
      ix: ["Ultrasound grading, metabolic panel"]
    }, [
      N("Medullary nephrocalcinosis", "nephro", { s: "dRTA, primary hyperparathyroidism, medullary sponge kidney, hypercalciuria, Bartter, FHHNC", keys: ["Hypercalciuria, hypocitraturia"], ix: ["Blood gas, PTH, Mg, genetic panel"] }),
      N("Cortical nephrocalcinosis", "nephro", { s: "Cortical necrosis, chronic GN, oxalosis", keys: ["Oxalate สูงมากใน oxalosis"], ix: ["Plasma oxalate"] })
    ])
  ])
};
