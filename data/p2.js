/* Phase 2 Glomerular and AKI trees. Same node schema as data/p1.js (N helper and window.TREES come from p1.js). */

/* ===================== NEPHROTIC SYNDROME ===================== */
TREES.nephrotic = {
  must: [
    "Onset ของบวม (abrupt ใน MCD, insidious ใน MN), ฟองในปัสสาวะ, น้ำหนักขึ้น",
    "DM duration, retinopathy, neuropathy, HbA1c ย้อนหลัง",
    "ยา: NSAID, lithium, pamidronate, interferon, gold, penicillamine, anabolic steroid, VEGF inhibitor, ICI, ยาสมุนไพร, ครีมหน้าขาวที่มีปรอท",
    "Infection: HBV, HCV, HIV, syphilis, parvovirus, COVID",
    "มะเร็ง: อายุ > 50, สูบบุหรี่, น้ำหนักลด, cancer screening ล่าสุด",
    "Systemic: ผื่น, ปวดข้อ (SLE), macroglossia, orthostatic hypotension, carpal tunnel (amyloid), chronic inflammation (AA)",
    "Family history ของไตวาย, ของ nephrotic ในเด็ก, consanguinity",
    "Complications: ปวดขาหรือเอว (thrombosis), ไข้ (infection), ปัสสาวะออกน้อย (AKI)"
  ],
  tree: N("Nephrotic syndrome", "root", {
    s: "ยืนยัน nephrotic syndrome แล้วแยก diabetic, podocytopathy, MN, paraprotein-related, immune complex และ secondary cause ก่อนตัดสินใจ biopsy",
    why: "เป็น long case ที่พบบ่อยที่สุด examiner จะถามว่าแยก primary กับ secondary อย่างไร ใช้ serology อะไรแทน biopsy ได้ และ complication ที่ต้องป้องกัน",
    keys: ["Proteinuria > 3.5 g/วัน (UPCR > 3.5 g/g), albumin < 3.0 g/dL, edema, dyslipidemia", "Bland sediment ชี้ podocytopathy หรือ MN, active sediment ชี้ MPGN pattern หรือ LN", "Selective proteinuria (IgG/transferrin clearance < 0.1) ชี้ MCD", "Abrupt onset ชี้ MCD, insidious ชี้ MN หรือ amyloid"],
    ix: ["UA microscopy, UPCR, albumin, lipid, Cr", "Anti-PLA2R, ANA, anti-dsDNA, C3, C4", "HBsAg, anti-HCV, HIV, VDRL", "SPEP, serum IFE, sFLC (ทุกรายที่อายุ > 40-50 ปี และอายุน้อยกว่านั้นถ้ามี clue ของ paraprotein หรือ biopsy ชี้ไปทาง monoclonal deposit)", "Kidney US, kidney biopsy with LM, IF, EM"],
    std: "KDIGO 2021 GN guideline"
  }, [
    N("Diabetic background", "step", {
      s: "DM กับ nephrotic-range proteinuria",
      why: "ต้องตัดสินใจว่าเป็น DKD อย่างเดียวหรือมี NDKD ซ้อน ซึ่งพบได้ราวหนึ่งในสามของ diabetic patients ที่ได้ biopsy",
      keys: ["Retinopathy สนับสนุน DKD โดยเฉพาะ T1DM", "T1DM < 5 ปี, active sediment, proteinuria ขึ้นเร็ว, eGFR ลดเร็ว: biopsy", "ใน T2DM การไม่มี retinopathy ไม่ได้ตัด DKD และการมี retinopathy ไม่ได้ตัด NDKD ที่ซ้อน"]
    }, [
      N("Diabetic kidney disease", "nephro", {
        s: "Progressive albuminuria กับ retinopathy และ DM นาน",
        why: "SGLT2i, finerenone และ GLP-1 RA (semaglutide, FLOW) ลด risk ของ kidney disease progression บนพื้นฐาน RASi",
        keys: ["Serum albumin ลดน้อยกว่าที่คาดจากระดับ proteinuria", "Kidney size ปกติหรือโต"],
        ix: ["Biopsy: GBM thickening, mesangial expansion, Kimmelstiel-Wilson nodule (RPS class I-IV)"],
        std: "RPS 2010 DN classification, KDIGO 2022 diabetes in CKD, CREDENCE (n = 4,401) HR 0.70 (95% CI 0.59-0.82), FIDELIO-DKD (n = 5,734) HR 0.82",
        link: "proteinuria"
      }),
      N("NDKD superimposed on DM", "nephro", {
        s: "MN, FSGS, IgAN, AIN หรือ amyloid ซ้อนบน DKD",
        why: "เปลี่ยนการรักษาและ prognosis",
        keys: ["ไม่มี retinopathy", "Anti-PLA2R บวก", "Hematuria มี dysmorphic RBC", "Proteinuria หรือ eGFR เปลี่ยนเร็วกว่าที่คาด", "Active sediment หรือ systemic disease ใหม่", "T1DM ที่เป็นไม่ถึง 5 ปี", "Intravitreal anti-VEGF ที่ฉีดซ้ำ (renal-limited TMA)", "Paraprotein (PGNMID, MIDD, amyloid) ใน DM สูงอายุ"],
        ix: ["Anti-PLA2R, SPEP/sFLC, biopsy"]
      }),
      N("Nodular glomerulosclerosis mimics", "nephro", {
        s: "Nodule ที่ไม่ใช่ diabetic",
        why: "LCDD (linear κ, silver ลบหรืออ่อน), AL amyloid (λ เด่น, Congo red บวก), idiopathic nodular GS (smoking และ HTN ไม่มี DM, biopsy เหมือน DKD), fibrillary GN (DNAJB9)",
        ix: ["IF kappa/lambda, Congo red, EM"],
        link: "mspike"
      })
    ]),
    N("Podocytopathy: MCD and FSGS", "step", {
      s: "Bland sediment, IF negative หรือ IgM/C3 เล็กน้อย, diffuse foot process effacement",
      why: "KDIGO 2021 แยก FSGS เป็น primary, genetic, secondary (maladaptive, viral, drug) และ undetermined เพราะการรักษาต่างกันมาก",
      keys: ["Diffuse effacement (> 80%) กับ nephrotic syndrome ชี้ primary", "Segmental effacement กับ proteinuria ที่ albumin ยังปกติและไม่บวม (subnephrotic หรือ nephrotic-range ก็ได้) ชี้ maladaptive"],
      std: "Columbia classification of FSGS (NOS, perihilar, cellular, tip, collapsing)"
    }, [
      N("Minimal change disease", "nephro", {
        s: "Abrupt nephrotic, albumin ต่ำมาก, AKI ได้",
        why: "Steroid-sensitive ราว 80-90% ในผู้ใหญ่ แต่ตอบสนองช้ากว่าเด็ก, anti-nephrin antibody พบราว 29% ของผู้ป่วย MCD ทั้งเด็กและผู้ใหญ่ (Watts JASN 2022) และราว 69% ของผู้ใหญ่ MCD ที่ active และยังไม่ได้รักษา (Hengel NEJM 2024) ใช้ติดตาม disease activity ได้",
        keys: ["Secondary: NSAID, lithium, Hodgkin lymphoma, thymoma, allergy", "AKI ในผู้สูงอายุที่ albumin ต่ำมาก"],
        ix: ["Biopsy: LM ปกติ, EM diffuse effacement", "Anti-nephrin antibody (ถ้ามี)"],
        std: "KDIGO 2021: prednisolone 1 mg/kg/วัน (max 80 mg) จนถึง remission (high dose ไม่เกิน 16 สัปดาห์) แล้ว taper, frequently relapsing หรือ steroid-dependent ใช้ rituximab, CNI, cyclophosphamide หรือ MMF"
      }),
      N("Primary FSGS", "nephro", {
        s: "Full-blown nephrotic syndrome กับ diffuse foot process effacement",
        why: "Recurrence หลัง KT ราว 30-50% ใน primary FSGS และสูงกว่าในผู้ที่ progression เร็ว",
        keys: ["Tip lesion prognosis ดี", "Collapsing prognosis แย่"],
        ix: ["Biopsy, genetic testing ถ้า steroid resistant หรือ family history"],
        std: "KDIGO 2021, DUPLEX (n = 371) sparsentan ลด proteinuria มากกว่า irbesartan แต่ไม่ต่างใน eGFR slope ที่ 108 สัปดาห์"
      }),
      N("Genetic FSGS / podocytopathy", "nephro", {
        s: "Steroid-resistant, family history, onset อายุน้อย, syndromic",
        why: "ส่วนใหญ่ไม่ตอบสนองต่อ immunosuppression และ recurrence หลัง KT ต่ำ แต่ living related donor ต้องตรวจ genetic ก่อนเพราะอาจมี variant เดียวกัน",
        keys: ["NPHS1, NPHS2, WT1, INF2, TRPC6, ACTN4, COL4A3-5 (FSGS pattern จาก Alport spectrum)", "APOL1 high-risk genotype ในเชื้อสายแอฟริกัน"],
        ix: ["Genetic panel"],
        link: "shortstature"
      }),
      N("Maladaptive (secondary) FSGS", "nephro", {
        s: "Proteinuria (subnephrotic หรือ nephrotic-range) โดย albumin ปกติและไม่บวม, segmental effacement",
        why: "Obesity, reduced nephron mass (reflux nephropathy, solitary kidney, prematurity), sickle cell, high-protein diet, anabolic steroid",
        keys: ["Perihilar variant, glomerulomegaly", "ไม่ต้องให้ immunosuppression"],
        ix: ["Biopsy, kidney size, history of low birth weight"],
        link: "obesity"
      }),
      N("Collapsing glomerulopathy", "nephro", {
        s: "Severe nephrotic กับ rapid eGFR decline",
        why: "HIVAN, APOL1, COVID-19, parvovirus B19, CMV, pamidronate, interferon, SLE, HLH, TMA",
        keys: ["Microcystic tubular dilatation", "Kidney ขนาดโต echogenic ใน HIVAN"],
        ix: ["HIV, parvovirus PCR, APOL1, drug history"],
        link: "viral"
      }),
      N("Drug or viral podocytopathy", "nephro", {
        s: "NSAID (MCD กับ AIN), lithium, VEGF inhibitor, ICI, anabolic steroid",
        ix: ["Drug history"],
        link: "pyuria"
      })
    ]),
    N("Membranous nephropathy", "step", {
      s: "Insidious nephrotic, VTE risk สูง, subepithelial deposit, IgG4 dominant ใน primary",
      why: "Anti-PLA2R บวกในราว 70-80% ของ primary MN และ KDIGO 2021 ยอมให้วินิจฉัยโดยไม่ biopsy ถ้าเป็น nephrotic syndrome ที่ anti-PLA2R บวก eGFR ปกติและไม่มีข้อบ่งชี้อื่นของ biopsy",
      keys: ["Spontaneous remission ราวหนึ่งในสาม", "ใช้ anti-PLA2R titer ติดตาม immunologic remission", "MN ทุกรายต้อง screen secondary cause (HBV, HCV, HIV, syphilis, SLE, ยา, age-appropriate cancer screening) ไม่ว่า anti-PLA2R บวกหรือลบ", "Anti-PLA2R ลบไม่ได้ตัด primary MN (ราว 20-30% ลบ ให้ดู tissue PLA2R, THSD7A, NELL1) และ anti-PLA2R บวกไม่ได้ตัด secondary cause ที่พบร่วม"],
      std: "KDIGO 2021 MN risk categories (low, moderate, high, very high)"
    }, [
      N("Primary MN (PLA2R, THSD7A)", "nephro", {
        s: "Anti-PLA2R บวก หรือ tissue PLA2R บวก",
        why: "ทุกรายได้ supportive care (RASi), immunosuppression ให้เมื่อมี risk ของ progression ตาม KDIGO 2021: moderate risk ใช้ rituximab หรือ CNI (หรือ watch and wait), high risk ใช้ rituximab, cyclophosphamide ร่วม steroid หรือ CNI ร่วม rituximab, very high risk ใช้ cyclophosphamide ร่วม steroid",
        keys: ["Albumin < 2.5 g/dL (BCG) กับ thrombotic risk อื่นและ bleeding risk ต่ำ พิจารณา prophylactic anticoagulation (GN-Risk calculator)", "PLA2R บวกยังต้องตรวจ HBV, SLE และ age-appropriate cancer screening เหมือนทุกราย"],
        ix: ["Anti-PLA2R ELISA titer, tissue PLA2R stain"],
        std: "MENTOR (n = 130) remission ที่ 24 เดือน rituximab 60% vs cyclosporine 20%, STARMEN (n = 86) cyclical 84% vs tacrolimus-rituximab 58%"
      }),
      N("Lupus MN (class V) and EXT1/EXT2, NCAM1", "nephro", {
        s: "MN ในหญิงอายุน้อย ANA บวก",
        why: "Full-house IF, subendothelial และ mesangial deposit ร่วม, EXT1/2 สัมพันธ์กับ autoimmune",
        ix: ["ANA, anti-dsDNA, C3, C4, biopsy IF (C1q)"],
        std: "ISN/RPS 2018 LN classification",
        link: "rpgn"
      }),
      N("Malignancy-associated MN (NELL1, THSD7A)", "nephro", {
        s: "สงสัยมากขึ้นถ้าอายุ > 65, สูบบุหรี่, น้ำหนักลด, PLA2R ลบ, THSD7A หรือ NELL1 บวก แต่ PLA2R บวกไม่ได้ตัด malignancy",
        why: "IgG1/IgG2 dominant, inflammatory cell ใน glomeruli",
        ix: ["Age-appropriate cancer screening ใน MN ทุกรายไม่ว่า PLA2R บวกหรือลบ", "ค้นละเอียดขึ้น (เช่น CT chest-abdomen) ถ้า PLA2R ลบ, THSD7A หรือ NELL1 บวก, อายุมาก, สูบบุหรี่ หรือน้ำหนักลด"],
        link: "weightloss"
      }),
      N("Infection-associated MN", "nephro", {
        s: "HBV (โดยเฉพาะในเอเชีย), HCV, syphilis, HIV",
        why: "รักษา infection ก่อน immunosuppression, rituximab ทำให้ HBV reactivation ได้แม้ HBsAg ลบแต่ anti-HBc บวก จึงต้องตรวจทั้งสองอย่างและให้ antiviral prophylaxis",
        ix: ["HBsAg, HBV DNA, anti-HBc, VDRL"],
        link: "viral"
      }),
      N("Drug-associated MN", "nephro", {
        s: "NSAID, gold, penicillamine, ครีมที่มีปรอท (NELL1-associated)",
        why: "NELL1-MN สัมพันธ์กับ mercury-containing skin-lightening cream ในเอเชีย",
        ix: ["Blood และ urine mercury, drug history"]
      }),
      N("Other secondary: sarcoid, IgG4-RD, thyroid, GVHD, post-KT de novo", "nephro", {
        keys: ["SSc, RA, Sjögren, MCTD และ autoimmune thyroid ทำ secondary MN ได้ ดู antibody profile และ mesangial deposits บน biopsy"],
        s: "Autoimmune หรือ alloimmune MN",
        ix: ["IgG4, Ca, thyroid antibodies"],
        link: "sicca"
      })
    ]),
    N("Paraprotein and organized deposits", "step", {
      s: "อายุ > 50, monoclonal protein, Congo red หรือ fibril บน EM",
      why: "MGRS ต้องรักษา clone แม้ไม่ถึงเกณฑ์ myeloma",
      keys: ["sFLC ratio ผิดปกติ (ใน CKD ใช้ช่วงอ้างอิง 0.37-3.1)", "Light chain restriction บน IF", "พบ monoclonal protein ใน serum อย่างเดียวยังไม่ใช่ MGRS (ผู้สูงอายุมี MGUS ได้) ต้องพิสูจน์บน biopsy ว่า deposit เป็น monoclonal Ig ชนิดเดียวกัน และ SPEP ลบไม่ได้ตัดโรคถ้ายังไม่ได้ทำ IFE และ sFLC"],
      std: "IKMG 2019 MGRS consensus"
    }, [
      N("AL amyloidosis", "nephro", {
        s: "Nephrotic, macroglossia, cardiac, autonomic neuropathy",
        why: "Lambda มากกว่า kappa, cardiac staging กำหนด prognosis, ANDROMEDA (n = 388) daratumumab-CyBorD hematologic CR 53.3% vs 18.1%",
        ix: ["sFLC, IFE, fat pad หรือ kidney biopsy Congo red (fat pad ลบไม่ได้ตัด amyloid), mass spectrometry typing", "NT-proBNP, troponin"],
        std: "Mayo 2012 staging",
        link: "mspike"
      }),
      N("AA amyloidosis and other amyloid (ALECT2, fibrinogen, TTR)", "nephro", {
        s: "AA ใน chronic inflammation (RA, FMF, TB, bronchiectasis, IVDU)",
        why: "ต้องพิสูจน์ชนิดด้วย mass spectrometry ก่อนให้ chemotherapy",
        ix: ["SAA, CRP, mass spectrometry typing"],
        link: "arthralgia"
      }),
      N("Monoclonal immunoglobulin deposition disease (LCDD)", "nephro", {
        s: "Nodular GS, nephrotic, CKD",
        why: "LCDD (kappa) ส่วนใหญ่, linear deposit ตาม GBM และ TBM",
        ix: ["IF linear kappa, EM powdery deposit"],
        link: "mspike"
      }),
      N("PGNMID / C3G with monoclonal Ig / immunotactoid", "nephro", {
        s: "MPGN pattern กับ monoclonal IgG (IgG3 kappa บ่อย)",
        why: "Clone ตรวจพบใน serum เพียงส่วนน้อยใน PGNMID",
        ix: ["IF light chain restriction, EM, bone marrow"],
        link: "mspike"
      }),
      N("Fibrillary GN", "nephro", {
        s: "Nephrotic กับ hematuria, Congo red ลบในเกือบทุกราย (มี congophilic fibrillary GN ส่วนน้อย แยกจาก amyloid ด้วย DNAJB9)",
        why: "DNAJB9 เป็น marker, สัมพันธ์กับ malignancy, autoimmune และ HCV",
        ix: ["DNAJB9 immunostain, EM fibril 12-24 nm"]
      })
    ]),
    N("Immune complex with nephrotic features", "step", {
      s: "Nephrotic กับ active sediment หรือ low complement",
      keys: ["Low C3 ± C4", "Mixed nephritic-nephrotic"]
    }, [
      N("Lupus nephritis class III/IV with V", "nephro", {
        s: "Nephritic-nephrotic ใน SLE",
        ix: ["Biopsy ISN/RPS 2018"],
        link: "rpgn"
      }),
      N("Immune complex MPGN (HCV, cryo, chronic infection, autoimmune)", "nephro", {
        s: "Low C3 และ C4, hematuria, HTN",
        why: "MPGN ไม่ใช่โรคแต่เป็น pattern ต้องหา infection, autoimmune และ monoclonal",
        ix: ["Cryoglobulin, HCV RNA, RF, SPEP"],
        link: "viral"
      }),
      N("C3 glomerulopathy", "nephro", {
        s: "C3 ต่ำ C4 ปกติ (C3 ปกติได้ในส่วนหนึ่ง ไม่ได้ตัดโรค), C3 dominant IF",
        ix: ["C3 nephritic factor, complement genetics, SPEP ในอายุ > 50"],
        link: "rpgn"
      }),
      N("IgA nephropathy with nephrotic syndrome", "nephro", {
        s: "IgAN ที่มี MCD-like podocytopathy ซ้อน",
        why: "ตอบสนองต่อ steroid แบบ MCD",
        ix: ["Biopsy EM diffuse effacement"],
        link: "hematuria"
      })
    ]),
    N("Complications to address", "step", {
      s: "Complication ของ nephrotic syndrome ที่ต้องประเมินและป้องกันทุกราย (ไม่ใช่ differential ของสาเหตุ) examiner มักถามต่อหลังได้ diagnosis",
      keys: ["Thrombosis", "Infection", "AKI", "Lipid", "Bone"]
    }, [
      N("Venous thromboembolism and RVT", "nephro", {
        s: "Highest risk ใน MN และ albumin ต่ำ",
        ix: ["Doppler, CT venography"],
        std: "KDIGO 2021 GN (prophylaxis ตาม albumin และ bleeding risk)",
        link: "thrombosis"
      }),
      N("Infection", "nephro", {
        s: "Cellulitis, SBP (pneumococcus), PJP ใน immunosuppression",
        why: "IgG และ factor B loss ทางปัสสาวะ",
        ix: ["Pneumococcal และ influenza vaccine, PJP prophylaxis ตาม regimen"]
      }),
      N("AKI in nephrotic syndrome", "nephro", {
        s: "Prerenal จาก over-diuresis, ATN ใน MCD, RVT, AIN จากยา, crescent ซ้อน",
        ix: ["UA, Doppler, biopsy ซ้ำถ้าอธิบายสาเหตุไม่ได้"],
        link: "risingcr"
      }),
      N("Hyperlipidemia, hypothyroidism, vitamin D loss", "nephro", {
        s: "Metabolic consequences",
        why: "Statin ระวัง interaction กับ CNI, TBG และ vitamin D binding protein loss",
        ix: ["Lipid, TSH, 25-OH D"],
        link: "bonepain"
      })
    ])
  ])
};

/* ===================== NEPHRITIC SYNDROME / RPGN ===================== */
TREES.rpgn = {
  must: [
    "Tempo ของ Cr ที่ขึ้น (วัน, สัปดาห์, เดือน), ปัสสาวะสีโค้ก, oliguria",
    "Hemoptysis, ไซนัส, หู, ตาแดง, mononeuritis, purpura, ปวดข้อ",
    "SLE features: ผื่น, แผลในปาก, ผมร่วง, serositis",
    "Infection ก่อนหน้า: เจ็บคอ 1-3 สัปดาห์ หรือแผลผิวหนัง 3-6 สัปดาห์ก่อนมีอาการ, endocarditis, S. aureus ใน DM",
    "Synpharyngitic gross hematuria 1-3 วันหลังเจ็บคอ (IgAN)",
    "สูบบุหรี่ หรือสัมผัส hydrocarbon (anti-GBM)",
    "ยา: PTU, hydralazine, minocycline, levamisole-cocaine, ICI",
    "HCV, monoclonal gammopathy, อายุ > 50"
  ],
  tree: N("Nephritic syndrome / RPGN", "root", {
    s: "ส่ง ANCA, anti-GBM, complement พร้อมกันทันที แล้วจัดกลุ่มตาม IF pattern: linear, granular immune complex, pauci-immune",
    why: "RPGN เป็น nephrology emergency ที่ outcome ขึ้นกับเวลา และต้องแยก mimic (TMA, AIN, atheroemboli, cast nephropathy) ก่อนให้ immunosuppression",
    keys: ["Dysmorphic RBC, acanthocyte > 5%, RBC cast (ไม่พบ RBC cast ไม่ได้ตัด GN)", "eGFR ลดเกิน 50% ในวันถึงสัปดาห์", "Complement: low C3 ใน IRGN, C3G, LN, cryo (C4 ต่ำ), มักปกติใน ANCA และ anti-GBM (complement ปกติไม่ได้ตัด LN, IRGN หรือ C3G)", "Crescent > 50% บน biopsy"],
    ix: ["MPO-ANCA, PR3-ANCA (ELISA), anti-GBM", "C3, C4, ANA, anti-dsDNA, ASO, anti-DNase B, cryoglobulin, HBV, HCV, blood culture", "SPEP, sFLC", "Urgent kidney biopsy (ไม่ควรรอ biopsy ก่อนเริ่มรักษาถ้า serology ชัดและอาการรุนแรง)"],
    std: "KDIGO 2021 GN guideline, KDIGO 2024 ANCA vasculitis guideline"
  }, [
    N("Linear IgG: anti-GBM disease", "step", {
      s: "Linear IgG ตาม GBM, anti-GBM บวก",
      why: "Prognosis ขึ้นกับ Cr และ crescent ณ วันเริ่มรักษา",
      keys: ["Dialysis-dependent ที่ crescent 100% และไม่มี DAH โอกาสฟื้นต่ำมาก", "Circulating anti-GBM ลบได้ราว 10% จึงไม่ได้ตัดโรค ต้องอาศัย linear IgG บน biopsy", "สงสัยมากให้เริ่มรักษาเลยโดยไม่รอผล confirm"]
    }, [
      N("Anti-GBM disease (Goodpasture)", "nephro", {
        s: "RPGN ± DAH, bimodal age",
        why: "PLEX, cyclophosphamide และ steroid ทุกรายยกเว้น dialysis-dependent ที่ crescent 100% และไม่มี DAH, relapse น้อย",
        ix: ["Anti-GBM titer, biopsy linear IgG"],
        std: "KDIGO 2021 GN guideline (anti-GBM)",
        link: "hemoptysis"
      }),
      N("Double positive (anti-GBM with MPO-ANCA)", "nephro", {
        s: "ราว 1 ใน 3 ของ anti-GBM",
        why: "Acute course แบบ anti-GBM แต่ relapse แบบ ANCA ต้อง maintenance",
        ix: ["ANCA ทุกรายที่ anti-GBM บวก และกลับกัน"]
      }),
      N("Atypical anti-GBM / post-KT anti-GBM in Alport", "nephro", {
        s: "Linear IgG แต่ circulating antibody ลบ หรือหลัง KT ใน Alport",
        ix: ["Biopsy, collagen IV alpha 5"],
        link: "hearing"
      }),
      N("Linear IgG mimics: DKD, MIDD, fibrillary", "nephro", {
        s: "Linear staining ที่ไม่ใช่ anti-GBM",
        ix: ["Light chain IF, EM"],
        link: "nephrotic"
      })
    ]),
    N("Pauci-immune: ANCA-associated vasculitis", "step", {
      s: "Necrotizing crescentic GN, IF น้อยหรือไม่มี",
      why: "สาเหตุที่พบบ่อยที่สุดของ RPGN ในผู้สูงอายุ",
      keys: ["MPO-ANCA สัมพันธ์กับ renal-limited vasculitis, microscopic polyangiitis (MPA) และ ILD", "PR3-ANCA สัมพันธ์กับ GPA, ENT involvement และ relapse มากกว่า MPO", "Specificity ของ ANCA กับ phenotype ซ้อนกันได้ (GPA ที่ MPO บวก, MPA ที่ PR3 บวก) และ ANCA บวกอย่างเดียวไม่ได้ยืนยัน AAV ต้องตัด endocarditis, ยา และ levamisole-cocaine"],
      std: "Berden 2010 histopathologic classification (focal, crescentic, mixed, sclerotic), ANCA renal risk score"
    }, [
      N("MPA / renal-limited vasculitis", "nephro", {
        s: "MPO-ANCA, ผู้สูงอายุ, constitutional symptoms",
        why: "Rituximab หรือ cyclophosphamide induction, reduced-dose steroid, avacopan ลด steroid exposure",
        ix: ["MPO-ANCA, CT chest (ILD)"],
        std: "RAVE (n = 197) rituximab non-inferior, PEXIVAS (n = 704) PLEX ไม่ลด death or ESKD HR 0.86 (95% CI 0.65-1.13) แต่ KDIGO 2024 ยังให้พิจารณา PLEX ถ้า Cr > 3.4 mg/dL, ต้อง dialysis, Cr ขึ้นเร็ว, DAH ที่มี hypoxemia หรือมี anti-GBM ร่วม, ADVOCATE (n = 331) avacopan sustained remission ที่ 52 สัปดาห์ 65.7% vs 54.9%"
      }),
      N("ANCA-positive kidney injury without GN on biopsy", "adj", {
        s: "ANCA บวกแต่ biopsy เป็น TIN เด่น, ATN หรือไม่มี crescent",
        why: "เป็นได้ทั้ง ANCA-associated TIN, focal GN ที่ sample ไม่ติด หรือ ANCA บวกปลอม (endocarditis, drug, infection, IIF บวกจาก ANA) จึงต้องรวม clinical, titer และ biopsy adequacy ก่อนตัดสิน induction",
        keys: ["MPO หรือ PR3 titer สูงด้วย immunoassay ร่วมกับ extrarenal disease สนับสนุน AAV", "Endocarditis, Bartonella, HBV, HCV ทำ PR3 หรือ MPO บวกต่ำได้", "Hydralazine, PTU, levamisole-cocaine ทำ ANCA บวกหลาย specificity", "เมื่อไม่มี GN ก็ไม่มีข้อบ่งชี้ทางไตของ PLEX (ข้อบ่งชี้อื่นคือ DAH ที่มี hypoxemia หรือ anti-GBM ร่วม)"],
        ix: ["Blood culture และ echo ก่อน induction ถ้ามีไข้หรือ murmur", "Repeat biopsy ถ้า glomeruli น้อยและ clinical ไม่ตรง"],
        link: "pyuria"
      }),
      N("GPA", "nephro", {
        s: "PR3-ANCA, ENT, nodules",
        ix: ["PR3-ANCA, CT sinus and chest"],
        std: "MAINRITSAN (n = 115) rituximab maintenance major relapse 5% vs azathioprine 29% ที่ 28 เดือน",
        link: "ent"
      }),
      N("EGPA", "nephro", {
        s: "Asthma, eosinophilia, neuropathy, MPO บวกราว 40%",
        ix: ["Eosinophil, MPO-ANCA, echo"],
        link: "numbness"
      }),
      N("Drug-induced ANCA vasculitis", "nephro", {
        s: "PTU, hydralazine, minocycline, levamisole-cocaine",
        why: "หยุดยาอาจพอในรายที่ไม่รุนแรง",
        ix: ["MPO titer สูงมาก, ANA, anti-histone"],
        link: "ent"
      }),
      N("ANCA-negative pauci-immune GN", "nephro", {
        s: "Pauci-immune crescentic GN ที่ ANCA ลบ",
        why: "ราว 10% ของ pauci-immune GN, รักษาเหมือน ANCA vasculitis",
        ix: ["ANCA ซ้ำด้วยหลายวิธี, biopsy"]
      })
    ]),
    N("Granular immune complex GN", "step", {
      s: "Granular IgG, IgA, IgM หรือ C3 บน IF",
      keys: ["Complement pattern", "Dominant immunoglobulin"]
    }, [
      N("Lupus nephritis", "nephro", {
        s: "Full-house IF, low C3/C4, anti-dsDNA สูง",
        why: "Class III/IV (± V) ให้ glucocorticoid ร่วมกับตัวเลือกใดตัวเลือกหนึ่งตาม KDIGO 2024: MMF, low-dose IV cyclophosphamide, belimumab กับ MMF หรือ low-dose cyclophosphamide, หรือ MMF กับ CNI ส่วน obinutuzumab เพิ่มบน MMF เป็นทางเลือกใหม่หลัง REGENCY",
        keys: ["Activity และ chronicity index", "TMA ใน LN prognosis แย่"],
        ix: ["Biopsy ISN/RPS 2018 with NIH activity and chronicity", "UPCR, anti-dsDNA, C3, C4, aPL"],
        std: "KDIGO 2024 LN, BLISS-LN (n = 448) PERR 43% vs 32%, AURORA 1 (n = 357) CRR 41% vs 23%, REGENCY (n = 271) obinutuzumab CRR 46.4% vs 33.1%"
      }),
      N("Lupus nephritis with ANCA positivity (overlap)", "nephro", {
        s: "LN ที่ MPO หรือ PR3 บวกจริง มักมี necrotizing lesion และ crescent มากกว่า LN ทั่วไป",
        why: "Atypical pANCA บน IIF พบบ่อยใน SLE จาก ANA รบกวน จึงต้องยืนยันด้วย MPO หรือ PR3 immunoassay เมื่อบวกจริงร่วมกับ fibrinoid necrosis หรือ crescent มาก ให้มองเป็น overlap ที่ prognosis แย่กว่า ยังไม่มี RCT เฉพาะ จึงเลือก induction ที่คุมได้ทั้งสองโรค เช่น IV cyclophosphamide หรือ rituximab ร่วม steroid แล้ว maintenance ด้วย MMF",
        keys: ["Biopsy มี full-house immune deposits ร่วมกับ segmental necrosis หรือ crescent มาก", "Digital gangrene ใน SLE ให้คิด vasculitis, antiphospholipid syndrome, cryoglobulinemia และ overlap", "Drug-induced (hydralazine) ให้ทั้ง ANA, anti-histone และ MPO บวก", "RPGN ทุกรายส่ง ANCA อยู่แล้ว (รวม SLE) และให้สงสัย overlap มากขึ้นถ้าเป็นผู้ชาย สูบบุหรี่ หรืออายุมาก ที่เป็น SLE ครั้งแรกพร้อม RPGN"],
        ix: ["MPO, PR3 immunoassay, anti-histone", "aPL, cryoglobulin, C3, C4", "Biopsy ISN/RPS 2018 บันทึก necrosis และ crescent %"],
        std: "KDIGO 2024 LN, KDIGO 2024 AAV (overlap ใช้ expert practice)",
        link: "raynaud"
      }),
      N("IgA nephropathy / IgA vasculitis", "nephro", {
        s: "Mesangial IgA dominant, synpharyngitic hematuria",
        why: "Rapidly progressive IgAN (eGFR ลด ≥ 50% ใน ≤ 3 เดือน ร่วมกับ crescent จำนวนมากบน biopsy หลังตัดสาเหตุอื่นของ AKI) ให้ cyclophosphamide กับ steroid แบบ AAV แต่การพบ crescent อย่างเดียวโดย eGFR คงที่ไม่ใช่ข้อบ่งชี้",
        ix: ["Biopsy Oxford MEST-C, International IgAN prediction tool"],
        std: "KDIGO 2025 IgAN and IgAV guideline",
        link: "hematuria"
      }),
      N("Infection-related GN", "nephro", {
        s: "Post-streptococcal (latent 1-3 สัปดาห์หลังเจ็บคอ, 3-6 สัปดาห์หลัง skin infection) หรือ concurrent staphylococcal IgA-dominant IRGN ใน DM ผู้สูงอายุ",
        why: "ห้ามให้ immunosuppression ใน active infection, C3 กลับปกติใน 8-12 สัปดาห์ ถ้าไม่กลับให้คิด C3G",
        keys: ["Hump-shaped subepithelial deposit", "Endocapillary proliferation"],
        ix: ["ASO, anti-DNase B, blood culture, echo, C3"],
        std: "KDIGO 2021 GN (IRGN)"
      }),
      N("C3 glomerulopathy (C3GN, DDD)", "nephro", {
        s: "C3 dominant IF โดย C3 เด่นกว่า immune reactant อื่นอย่างน้อย 2 orders of magnitude",
        why: "Alternative pathway dysregulation, อายุ > 50 ให้หา monoclonal Ig, iptacopan และ pegcetacoplan เป็นทางเลือกใหม่",
        ix: ["C3, C3 nephritic factor, sC5b-9, CFH, genetics, SPEP, sFLC"],
        std: "C3G consensus 2013, APPEAR-C3G (n = 74) iptacopan ลด proteinuria 35% ที่ 6 เดือน"
      }),
      N("Cryoglobulinemic GN", "nephro", {
        s: "MPGN pattern, intraluminal thrombi, low C4",
        why: "HCV ส่วนใหญ่ใน type II, type I จาก clone",
        ix: ["Cryoglobulin, RF, C4, HCV RNA, IFE"],
        link: "arthralgia"
      }),
      N("Fibrillary GN / PGNMID with crescents", "nephro", {
        s: "Organized deposit หรือ monoclonal IgG",
        ix: ["DNAJB9, EM, IF light chain"],
        link: "nephrotic"
      })
    ]),
    N("RPGN mimics", "step", {
      s: "AKI กับ hematuria หรือ systemic features ที่ไม่ใช่ crescentic GN",
      why: "ให้ immunosuppression ผิดในกลุ่มนี้อันตราย",
      keys: ["Biopsy ช่วยแยกชัด"]
    }, [
      N("Thrombotic microangiopathy", "nephro", {
        s: "MAHA, thrombocytopenia, HTN, AKI",
        ix: ["Smear, LDH, ADAMTS13"],
        link: "tma"
      }),
      N("Acute interstitial nephritis", "nephro", {
        s: "Sterile pyuria, WBC cast, drug exposure",
        ix: ["Biopsy"],
        link: "pyuria"
      }),
      N("Atheroembolic disease", "nephro", {
        s: "Eosinophilia, low complement, livedo หลัง angiography",
        ix: ["Fundoscopy, biopsy"],
        link: "bluetoe"
      }),
      N("Myeloma cast nephropathy", "nephro", {
        s: "AKI, bland sediment, dipstick protein ลบแต่ UPCR สูง",
        ix: ["sFLC, SPEP"],
        link: "mspike"
      }),
      N("Malignant hypertension / scleroderma renal crisis", "nephro", {
        s: "Severe HTN, MAHA",
        ix: ["Fundoscopy, smear"],
        link: "htn-emerg"
      }),
      N("Infective endocarditis-associated GN vs vasculitis", "nephro", {
        s: "PR3-ANCA บวกใน endocarditis",
        why: "Immunosuppression ทำให้ endocarditis แย่ลง",
        ix: ["Blood culture, echo, biopsy (IgM, C3 dominant)"],
        link: "fever"
      })
    ])
  ])
};

/* ===================== HEMATURIA ===================== */
TREES.hematuria = {
  must: [
    "Gross หรือ microscopic, ตลอดสายหรือต้นหรือปลาย, มีลิ่มเลือดไหม (ลิ่มเลือดชี้ non-glomerular)",
    "Timing กับ URI: synpharyngitic 1-3 วัน (IgAN) vs latent 1-3 สัปดาห์ (PSGN)",
    "Flank pain, colic, dysuria, ไข้",
    "Family history ของ hematuria, deafness, ESKD (Alport, TBMN), ADPKD",
    "Smoking, aristolochic acid, aniline dye, cyclophosphamide, pelvic radiation (urothelial cancer)",
    "Anticoagulant (ยังต้อง workup เพราะไม่ใช่สาเหตุโดยตรง), sickle trait",
    "ประจำเดือน, exercise หนัก, trauma, catheter",
    "KT: นอกจากสาเหตุทั่วไปทั้งหมด (stone, urothelial cancer รวม native kidney, GN) ให้เพิ่ม BK virus, graft rejection และ recurrent GN"
  ],
  tree: N("Hematuria", "root", {
    s: "ยืนยัน true hematuria ด้วย microscopy แล้วแยก glomerular กับ non-glomerular และ risk-stratify urologic malignancy",
    why: "Glomerular hematuria เป็นทางเข้าของ IgAN, Alport และ GN อื่น ส่วน non-glomerular ต้องตัด malignancy ตาม risk",
    keys: ["Microhematuria ≥ 3 RBC/hpf ใน microscopy", "Dipstick บวกแต่ไม่มี RBC: hemoglobin หรือ myoglobin", "Dysmorphic RBC > 40% หรือ acanthocyte > 5%, RBC cast, proteinuria ชี้ glomerular แต่ isomorphic RBC หรือไม่พบ RBC cast ไม่ได้ตัด glomerular disease", "Clot ชี้ non-glomerular"],
    ix: ["UA microscopy (phase contrast), UPCR, Cr", "Urine culture", "Kidney US หรือ CT urography ตาม risk", "Cystoscopy ใน intermediate-high risk", "Biopsy ถ้า glomerular กับ proteinuria หรือ eGFR ลด"],
    std: "AUA/SUFU 2020 microhematuria guideline, amended 2025 (low, intermediate, high risk)"
  }, [
    N("Glomerular hematuria", "step", {
      s: "Dysmorphic RBC, RBC cast, proteinuria",
      keys: ["Isolated vs with proteinuria", "Family history", "Complement"]
    }, [
      N("IgA nephropathy", "nephro", {
        s: "Synpharyngitic gross hematuria, persistent microhematuria",
        why: "Primary GN ที่พบบ่อยที่สุดในเอเชีย เป้า proteinuria < 0.5 g/วัน (ideally < 0.3), supportive care รวม SGLT2i และ endothelin antagonist",
        keys: ["Proteinuria ≥ 0.5 g/วันถือว่ามี risk ของ progression แล้ว (KDIGO 2025) ยิ่งมากยิ่งเสี่ยง", "MEST-C: M, E, S, T, C"],
        ix: ["Biopsy, International IgAN prediction tool"],
        std: "KDIGO 2025 IgAN, TESTING (n = 503) methylprednisolone HR 0.53 (95% CI 0.39-0.72), NefIgArd (n = 364) Nefecon, PROTECT (n = 404) sparsentan, DAPA-CKD IgAN subgroup (n = 270) HR 0.29"
      }),
      N("Thin basement membrane / COL4A heterozygous", "nephro", {
        s: "Isolated microhematuria, family history, ไม่มี deafness",
        why: "Heterozygous COL4A3/COL4A4 ไม่ benign เสมอ บางรายเกิด proteinuria, FSGS และ CKD",
        keys: ["GBM thickness บาง < 250 nm ในผู้ใหญ่"],
        ix: ["EM, genetic testing"],
        link: "hearing"
      }),
      N("Alport syndrome", "nephro", {
        s: "Hematuria, proteinuria, SNHL, ocular lesion",
        ix: ["COL4A3-5, EM"],
        link: "hearing"
      }),
      N("Post-infectious GN / IRGN", "nephro", {
        s: "Hematuria หลังติดเชื้อ, low C3",
        ix: ["ASO, C3 ติดตาม 8-12 สัปดาห์"],
        link: "rpgn"
      }),
      N("LN, C3G, MPGN, ANCA, anti-GBM", "nephro", {
        s: "Hematuria กับ systemic disease หรือ low complement",
        ix: ["Serology panel"],
        link: "rpgn"
      }),
      N("Loin pain hematuria / nutcracker as glomerular mimic", "adj", {
        s: "Loin pain กับ hematuria ที่มี dysmorphic RBC เพียงส่วนน้อย ไม่มี proteinuria หรือ RBC cast",
        ix: ["Doppler left renal vein"],
        link: "flank"
      })
    ]),
    N("Non-glomerular: upper tract", "step", {
      s: "Isomorphic RBC, clot, flank pain",
      keys: ["Imaging", "Infection", "Cystic"]
    }, [
      N("Nephrolithiasis", "nephro", {
        s: "Colic กับ hematuria",
        ix: ["Non-contrast CT"],
        link: "stone"
      }),
      N("Renal cell carcinoma / upper tract urothelial carcinoma", "nephro", {
        s: "Painless gross hematuria",
        why: "Aristolochic acid nephropathy เพิ่ม risk ของ upper tract urothelial carcinoma อย่างมาก จึงต้อง surveillance แม้เข้า ESKD หรือหลัง KT",
        ix: ["CT urography, ureteroscopy, cytology"],
        link: "flank"
      }),
      N("ADPKD cyst hemorrhage", "nephro", {
        s: "Gross hematuria กับ flank pain ใน ADPKD",
        ix: ["US, MRI"],
        link: "cysts"
      }),
      N("Cystic kidneys with glomerular hematuria: collagen IV or ADPKD", "adj", {
        s: "Cyst หลายใบร่วมกับ dysmorphic RBC หรือ proteinuria มากกว่าที่ ADPKD อธิบายได้",
        why: "Collagen IV nephropathy มี cyst ได้ และ ADPKD ซ้อน glomerular disease ได้ จึงไม่ควรสรุปว่า hematuria ทุกครั้งเป็น cyst hemorrhage",
        keys: ["Cyst hemorrhage: non-dysmorphic RBC, ปวดเอวตรงกับตำแหน่ง hyperdense cyst บน CT", "Glomerular: dysmorphic RBC, RBC cast, proteinuria"],
        ix: ["Urine microscopy, UPCR, gene panel"],
        link: "cysts"
      }),
      N("Papillary necrosis", "nephro", {
        s: "Hematuria, colic, sloughed papilla",
        why: "POSTCARDS: pyelonephritis, obstruction, sickle cell, TB, cirrhosis, analgesic, renal vein thrombosis, DM, systemic vasculitis",
        ix: ["CT urography: ring sign"]
      }),
      N("Vascular: nutcracker, AVM, renal infarct, RVT", "nephro", {
        s: "Hematuria จาก vascular lesion",
        ix: ["Doppler, CTA"],
        link: "flank"
      }),
      N("Infection: pyelonephritis, TB", "nephro", {
        s: "Pyuria กับ hematuria",
        ix: ["Urine culture, AFB"],
        link: "pyuria"
      })
    ]),
    N("Non-glomerular: lower tract", "step", {
      s: "Bladder, prostate, urethra",
      keys: ["Age > 35-40", "Smoking", "LUTS"]
    }, [
      N("Bladder urothelial carcinoma", "nephro", {
        s: "Painless gross hematuria ในผู้สูงอายุที่สูบบุหรี่",
        why: "Cyclophosphamide และ aristolochic acid เพิ่ม risk ซึ่งเกี่ยวกับผู้ป่วย GN และ CKD",
        ix: ["Cystoscopy, CT urography, cytology"],
        std: "AUA/SUFU 2020, amended 2025",
        link: "luts"
      }),
      N("Hemorrhagic cystitis: BK virus, cyclophosphamide, radiation", "nephro", {
        s: "Hematuria กับ LUTS หลังได้ cyclophosphamide หรือ HSCT",
        why: "Acrolein จาก cyclophosphamide ป้องกันด้วย mesna และ hydration",
        ix: ["BK urine PCR, cystoscopy"],
        link: "luts"
      }),
      N("Cystitis / prostatitis / BPH", "adj", {
        s: "Hematuria กับ infection หรือ prostate enlargement",
        ix: ["Urine culture, PSA"],
        link: "luts"
      }),
      N("Schistosomiasis haematobium", "adj", {
        s: "Terminal hematuria ในผู้ที่มาจากแอฟริกาหรือตะวันออกกลาง",
        ix: ["Urine ova"]
      })
    ]),
    N("Transient / benign / systemic", "step", {
      s: "Hematuria ที่หายเองหรือมีสาเหตุชัด",
      keys: ["Repeat UA", "Exercise", "Menses"]
    }, [
      N("Exercise, menstruation, trauma, catheter", "adj", {
        s: "Transient hematuria",
        ix: ["Repeat UA หลัง 48-72 ชั่วโมง"]
      }),
      N("Sickle cell trait / coagulopathy", "adj", {
        s: "Papillary necrosis ใน sickle, anticoagulant unmask lesion",
        why: "Hematuria บน anticoagulant ยังต้อง workup",
        ix: ["Hb typing, INR"]
      }),
      N("Hypercalciuria / hyperuricosuria", "nephro", {
        s: "Isolated microhematuria ในเด็กและผู้ใหญ่อายุน้อย",
        ix: ["24-hour urine Ca, urate"],
        link: "stone"
      })
    ]),
    N("Pigmenturia mimic", "step", {
      s: "Dipstick heme บวก ไม่มี RBC",
      keys: ["Hemoglobin vs myoglobin"]
    }, [
      N("Hemoglobinuria / myoglobinuria", "nephro", {
        s: "Pigment nephropathy",
        ix: ["Serum color, CK, LDH, haptoglobin"],
        link: "pigmenturia"
      })
    ])
  ])
};

/* ===================== ISOLATED PROTEINURIA ===================== */
TREES.proteinuria = {
  must: [
    "พบครั้งแรกเมื่อไร, ตรวจซ้ำแล้วยังมีไหม, ขณะไข้หรือออกกำลังหรือเปล่า",
    "DM, HTN, obesity, ประวัติ preeclampsia, คลอดก่อนกำหนดหรือน้ำหนักแรกเกิดน้อย",
    "Hematuria, edema, ฟองในปัสสาวะ",
    "Bone pain, anemia, hypercalcemia (light chain)",
    "Family history ของ CKD, deafness",
    "ยา: NSAID, lithium, tenofovir, bisphosphonate, VEGF inhibitor, ยาสมุนไพร",
    "Glycosuria, hypophosphatemia, hypouricemia (Fanconi)",
    "Orthostatic: อายุน้อย < 30, สูง ผอม"
  ],
  tree: N("Isolated proteinuria", "root", {
    s: "ยืนยัน persistent proteinuria แล้วแยก albuminuric (glomerular), tubular และ overflow ด้วย UACR/UPCR ratio และ urine protein electrophoresis",
    why: "Dipstick ตรวจ albumin เป็นหลัก จึงพลาด light chain และ tubular protein ซึ่งเป็นจุดที่ examiner ถามบ่อย",
    keys: ["UACR/UPCR < 0.4 ชี้ non-albumin (tubular หรือ overflow)", "Dipstick ลบแต่ UPCR สูง ชี้ non-albumin protein ซึ่งต้องตัด light chain ก่อน (อีกกลุ่มคือ LMW tubular protein)", "Persistent: 2 ใน 3 ครั้งใน 3-6 เดือน", "Stage A1 < 30, A2 30-300, A3 > 300 mg/g"],
    ix: ["UACR และ UPCR คู่กัน", "Urine protein electrophoresis และ IFE, sFLC", "Urine beta-2 microglobulin หรือ alpha-1 microglobulin", "Split collection (supine และ upright)", "UA microscopy, eGFR, kidney US"],
    std: "KDIGO 2024 CKD guideline (CGA staging)"
  }, [
    N("Benign / functional", "step", {
      s: "Proteinuria ที่หายไปหรือขึ้นกับท่า",
      keys: ["Repeat ในภาวะปกติ", "อายุน้อย"]
    }, [
      N("Transient proteinuria", "adj", {
        s: "Fever, exercise, CHF, seizure, acute illness",
        ix: ["Repeat UACR เมื่อหายป่วย"]
      }),
      N("Orthostatic proteinuria", "nephro", {
        s: "อายุ < 30, proteinuria หายเมื่อนอน, มักน้อยกว่า 1 g/วัน",
        why: "Prognosis ดี ไม่ต้อง biopsy, nutcracker อาจเป็นกลไกในบางราย",
        ix: ["First-morning UPCR ปกติ (< 0.2 g/g) แต่ daytime สูง"]
      })
    ]),
    N("Glomerular (albuminuric)", "step", {
      s: "UACR/UPCR > 0.4, albumin เด่น",
      keys: ["DM", "HTN", "Obesity", "Early GN"]
    }, [
      N("Diabetic kidney disease", "nephro", {
        s: "Albuminuria ใน DM",
        why: "Albuminuria เป็น CV risk marker ด้วย",
        ix: ["UACR ซ้ำ, retinopathy screen"],
        std: "KDIGO 2022 diabetes in CKD",
        link: "nephrotic"
      }),
      N("Hypertensive nephrosclerosis", "nephro", {
        s: "Low-grade proteinuria, long-standing HTN, LVH",
        why: "เป็น diagnosis of exclusion ถ้า proteinuria สูง (> 1 g/วัน) หรือมี hematuria ต้องหา GN ก่อน",
        ix: ["Echo, fundoscopy"]
      }),
      N("Maladaptive FSGS: obesity, reduced nephron mass", "nephro", {
        s: "Proteinuria ใน obesity, solitary kidney, reflux nephropathy, prematurity",
        ix: ["Kidney size, history"],
        link: "obesity"
      }),
      N("Early primary GN: MN, IgAN, FSGS, Fabry", "nephro", {
        s: "Proteinuria > 0.5-1 g/วัน persistent",
        why: "Biopsy เมื่อ proteinuria > 0.5-1 g/วัน ที่อธิบายไม่ได้หรือมี hematuria",
        ix: ["Anti-PLA2R, alpha-galactosidase A, biopsy"],
        link: "nephrotic"
      }),
      N("Preeclampsia history / pregnancy", "nephro", {
        s: "Proteinuria ใหม่ในครรภ์หรือหลังคลอด",
        ix: ["UPCR, BP, sFlt-1/PlGF"],
        link: "pregnancy"
      })
    ]),
    N("Tubular proteinuria", "step", {
      s: "LMW protein เด่น, UACR/UPCR ต่ำ",
      keys: ["Beta-2 microglobulin สูง", "Fanconi features"]
    }, [
      N("Tubulointerstitial disease", "nephro", {
        s: "AIN, chronic TIN, Sjogren, sarcoid, lithium, lead, aristolochic acid",
        ix: ["Urine beta-2 microglobulin, biopsy"],
        link: "pyuria"
      }),
      N("Fanconi syndrome", "nephro", {
        s: "Glycosuria, aminoaciduria, phosphaturia, uricosuria",
        why: "Tenofovir, LCPT, ifosfamide, Wilson, cystinosis",
        ix: ["Urine glucose, FEPO4, FEUA"],
        link: "bonepain"
      }),
      N("Dent disease", "nephro", {
        s: "LMW proteinuria มาก (อาจถึง nephrotic range โดย albumin ปกติ), hypercalciuria ในชาย",
        ix: ["CLCN5, OCRL"],
        link: "shortstature"
      })
    ]),
    N("Overflow proteinuria", "step", {
      s: "Filtered protein เกิน tubular reabsorption",
      keys: ["Light chain", "Myoglobin", "Lysozyme"]
    }, [
      N("Light chain (Bence Jones) proteinuria", "nephro", {
        s: "Dipstick ลบหรือน้อย แต่ UPCR สูง",
        why: "Myeloma, cast nephropathy, LCPT, MGRS",
        ix: ["sFLC, urine IFE, SPEP"],
        std: "IMWG 2014, IKMG 2019",
        link: "mspike"
      }),
      N("Myoglobinuria / hemoglobinuria", "nephro", {
        s: "Pigment overflow",
        ix: ["CK, LDH"],
        link: "pigmenturia"
      }),
      N("Lysozymuria (CMML, AML M4/M5)", "nephro", {
        s: "Hypokalemia กับ AKI จาก lysozyme tubulopathy",
        ix: ["Serum lysozyme, smear"]
      })
    ]),
    N("Drug-related proteinuria", "step", {
      s: "Proteinuria หลังเริ่มยา",
      keys: ["Timing", "Pattern"]
    }, [
      N("VEGF inhibitor / TKI", "nephro", {
        s: "Proteinuria กับ HTN, TMA",
        ix: ["UPCR, BP, smear"],
        link: "onco"
      }),
      N("NSAID, lithium, bisphosphonate, mTOR inhibitor", "nephro", {
        s: "Podocytopathy หรือ FSGS จากยา",
        why: "Sirolimus ทำให้ proteinuria เพิ่มขึ้นเมื่อเปลี่ยนจาก CNI โดยเฉพาะ KT ที่มี proteinuria อยู่เดิม",
        ix: ["Drug review, biopsy"],
        link: "nephrotic"
      })
    ])
  ])
};

/* ===================== AZOTEMIA: AKI, AKD, CKD ===================== */
TREES.risingcr = {
  must: [
    "Baseline Cr ย้อนหลัง 3-12 เดือน, tempo ของการขึ้น",
    "Urine output, ปัสสาวะสีผิดปกติ, ฟอง, เลือด",
    "Volume: อาเจียน ท้องเสีย intake น้อย, diuretic, SGLT2i, BP ต่ำ",
    "Nephrotoxin ใน 2-4 สัปดาห์: NSAID, aminoglycoside, vancomycin, amphotericin, contrast, PPI, beta-lactam, ICI, acyclovir, methotrexate, ยาสมุนไพร",
    "ACEi/ARB, CNI, trimethoprim, cimetidine, creatine supplement (Cr ขึ้นโดย GFR ไม่ลด)",
    "Systemic: ผื่น ไข้ ปวดข้อ hemoptysis livedo, หลังทำ angiography",
    "LUTS, BPH, pelvic malignancy, retroperitoneal disease",
    "Rhabdomyolysis, hemolysis, tumor lysis, myeloma symptoms"
  ],
  tree: N("Azotemia: AKI, AKD and CKD", "root", {
    s: "ระบุเวลา (AKI ≤ 7 วัน, AKD 7-90 วัน, CKD > 3 เดือน) ตัด pseudo-AKI แล้วแยก prerenal, intrinsic และ postrenal และหา second hit ใน acute on chronic",
    why: "เป็นทางเข้าที่พบบ่อยที่สุดของ long case และ examiner จะถามถึง urine indices, sediment, indication ของ biopsy และ RRT",
    keys: ["KDIGO AKI: Cr เพิ่ม ≥ 0.3 mg/dL ใน 48 ชั่วโมง หรือ ≥ 1.5 เท่าใน 7 วัน หรือ UO < 0.5 mL/kg/h นาน 6 ชั่วโมง", "Small echogenic kidneys ชี้ chronic แต่ขนาดปกติหรือโตไม่ได้ตัด CKD (DM, amyloid, HIVAN, ADPKD, myeloma)", "Urine sediment เป็น liquid biopsy", "Anemia, PTH สูง, PO4 สูง แยก AKI กับ CKD ไม่ได้ชัด"],
    ix: ["UA microscopy (ดูเอง), UPCR, UACR", "Urine Na, FENa (FEUrea ถ้าได้ diuretic)", "Kidney US with Doppler", "CBC, smear, CK, urate, PO4, Ca", "Serology ตาม sediment, sFLC", "Kidney biopsy ถ้าสาเหตุไม่ชัด"],
    std: "KDIGO 2012 AKI guideline, ADQI 16 AKD definition (2017), KDIGO 2024 CKD"
  }, [
    N("Pseudo-AKI (Cr up without GFR fall)", "step", {
      s: "Cr ขึ้นโดย GFR จริงไม่ลด",
      why: "หลีกเลี่ยงการหยุดยาที่มีประโยชน์โดยไม่จำเป็น",
      keys: ["Cr มักขึ้นไม่เกิน 0.3-0.5 mg/dL แล้วคงที่ ถ้าขึ้นต่อเนื่องให้หา AKI จริง", "BUN และ cystatin C ไม่ขึ้นตาม"]
    }, [
      N("Inhibited tubular Cr secretion", "nephro", {
        s: "Trimethoprim, cimetidine, cobicistat, dolutegravir, bictegravir, ritonavir, pyrimethamine",
        ix: ["Cystatin C-based eGFR"]
      }),
      N("Increased Cr generation / assay interference", "nephro", {
        s: "Creatine supplement, cooked meat, muscle mass สูง, ketoacidosis และ cefoxitin รบกวน Jaffe method",
        ix: ["Enzymatic Cr, cystatin C"]
      })
    ]),
    N("Prerenal / hemodynamic", "step", {
      s: "Bland sediment, FENa < 1%, BUN/Cr > 20, ดีขึ้นเร็วเมื่อแก้สาเหตุ",
      keys: ["FENa ใช้ไม่ได้ใน diuretic ให้ใช้ FEUrea < 35%", "FENa < 1% ไม่ได้ยืนยัน prerenal เพราะต่ำได้ใน contrast, pigment, AGN, HRS, sepsis ระยะแรก และ early obstruction", "FENa > 1% ไม่ได้ตัด prerenal ถ้าได้ diuretic, มี CKD เดิม หรือมี bicarbonaturia"]
    }, [
      N("True volume depletion", "nephro", {
        s: "GI loss, bleeding, poor intake, over-diuresis",
        ix: ["Orthostatic vitals, urine Na < 20 mmol/L"],
        link: "syncope"
      }),
      N("Cardiorenal syndrome", "nephro", {
        s: "Venous congestion หรือ low output",
        why: "Decongestion มักทำให้ไตดีขึ้น",
        ix: ["Echo, NT-proBNP, VExUS"],
        std: "ADQI cardiorenal classification",
        link: "dyspnea"
      }),
      N("Hepatorenal syndrome (HRS-AKI)", "nephro", {
        s: "Cirrhosis กับ ascites, Cr ไม่ดีขึ้นภายใน 24 ชั่วโมงหลัง volume resuscitation ที่เพียงพอ (ADQI-ICA 2024)",
        ix: ["Urine Na, ประเมิน Cr ซ้ำที่ 24 ชั่วโมงหลัง volume resuscitation ที่เพียงพอ"],
        std: "ICA-ADQI 2024",
        link: "abdomen"
      }),
      N("Renal hemodynamic drugs", "nephro", {
        s: "NSAID, ACEi/ARB, CNI vasoconstriction, triple whammy (NSAID กับ RAASi กับ diuretic)",
        ix: ["Drug review, CNI trough"]
      }),
      N("Hemodynamic eGFR dip (ACEi, ARB, SGLT2i, finerenone)", "nephro", {
        s: "GFR ลดจริงแต่เป็น functional และ reversible: eGFR ลดช่วงแรก < 30% จาก baseline ภายใน 2-4 สัปดาห์หลังเริ่มยาหรือเพิ่ม dose แล้วคงที่",
        why: "Expected hemodynamic effect ไม่ต้องหยุดยา ถ้า eGFR ลด > 30% ให้หา renal artery stenosis, volume depletion หรือ NSAID ร่วม แล้วจึงพิจารณาลดหรือหยุดยา",
        ix: ["Cr และ K ซ้ำ 2-4 สัปดาห์หลังเริ่มยา"],
        std: "KDIGO 2024 CKD",
        link: "kidneysize"
      }),
      N("Abdominal compartment syndrome", "nephro", {
        s: "Oliguria กับ tense abdomen หลังผ่าตัดหรือ massive resuscitation",
        ix: ["Bladder pressure > 20 mmHg กับ new organ dysfunction"],
        std: "WSACS 2013 consensus"
      }),
      N("Bilateral renal artery stenosis / solitary kidney RAS", "nephro", {
        s: "AKI หลังเริ่ม RAASi หรือ BP ลด",
        ix: ["Duplex, CTA หรือ MRA"],
        link: "kidneysize"
      })
    ]),
    N("Intrinsic: tubular", "step", {
      s: "Muddy brown granular cast, RTE cell, FENa > 2% (FENa < 1% ได้ใน contrast, pigment และ septic ATN ระยะแรก และไม่พบ cast ไม่ได้ตัด ATN)",
      keys: ["Ischemic vs nephrotoxic", "Crystal", "Pigment"]
    }, [
      N("Ischemic / septic ATN", "nephro", {
        s: "Sepsis, shock, major surgery",
        why: "Balanced crystalloid ลด MAKE30 เล็กน้อย, ถ้าไม่มี emergency indication (refractory hyperkalemia, acidosis, volume overload, uremic complication) ไม่ต้องเร่งเริ่ม RRT แต่ไม่ควรเลื่อนนานเกินไป",
        keys: ["Granular cast score สูง ทำนาย progression"],
        ix: ["Urine microscopy, furosemide stress test (< 200 mL ใน 2 ชั่วโมงหลัง 1 mg/kg ทำนาย stage 3)", "Biomarker: TIMP-2 x IGFBP7 > 0.3, NGAL"],
        std: "SMART (n = 15,802) MAKE30 14.3% vs 15.4%, STARRT-AKI (n = 3,019) 90-day mortality 43.9% vs 43.7%, AKIKI 2 (n = 278) more-delayed strategy ไม่มีประโยชน์และอาจเพิ่ม 60-day mortality (HR 1.65, 95% CI 1.09-2.50 ใน multivariable analysis)"
      }),
      N("Nephrotoxic ATN", "nephro", {
        s: "Aminoglycoside, vancomycin (กับ piperacillin-tazobactam), amphotericin, cisplatin, tenofovir, ifosfamide",
        why: "Aminoglycoside AKI มักเกิดหลัง 5-7 วัน non-oliguric กับ hypomagnesemia",
        ix: ["Drug level, urine Mg, FEMg"]
      }),
      N("Contrast-associated AKI", "nephro", {
        s: "Cr ขึ้น 24-72 ชั่วโมงหลัง contrast",
        why: "Risk จริงต่ำกว่าที่เคยเชื่อ ไม่ควรเลี่ยง contrast ที่จำเป็น",
        ix: ["Timeline, แยกจาก atheroemboli"],
        std: "ACR-NKF 2020 consensus (prophylaxis ด้วย IV saline เมื่อ eGFR < 30), PRESERVE (n = 5,177) bicarbonate และ NAC ไม่มีประโยชน์"
      }),
      N("Pigment nephropathy", "nephro", {
        s: "Rhabdomyolysis หรือ hemolysis",
        ix: ["CK, LDH, haptoglobin, urine heme"],
        link: "pigmenturia"
      }),
      N("Crystal nephropathy", "nephro", {
        keys: ["Oxalate: อาหาร (smoothie ผักโขม, มะเฟือง, ตะลิงปลิง), enteric, primary, vitamin C, ethylene glycol"],
        s: "Acyclovir, methotrexate, sulfadiazine, indinavir, ciprofloxacin, oxalate, urate (TLS), phosphate (OSP)",
        why: "Urine crystal morphology ช่วยวินิจฉัย",
        ix: ["UA microscopy (polarized), urate, PO4, oxalate"],
        std: "Cairo-Bishop TLS criteria",
        link: "stone"
      }),
      N("Osmotic nephrosis", "nephro", {
        s: "IVIG ที่มี sucrose, mannitol, hydroxyethyl starch, contrast",
        ix: ["Drug history, biopsy: isometric vacuolization"]
      }),
      N("Myeloma cast nephropathy", "nephro", {
        s: "AKI ใน myeloma",
        ix: ["sFLC (involved FLC > 1,500 mg/L สนับสนุน, < 500 mg/L ทำให้ cast nephropathy เป็นไปได้น้อย ให้หาสาเหตุอื่นและพิจารณา biopsy)", "Urine protein ส่วนใหญ่เป็น light chain (UACR ต่ำเมื่อเทียบกับ UPCR)"],
        link: "mspike"
      })
    ]),
    N("Intrinsic: interstitial, glomerular, vascular", "step", {
      s: "Sediment หรือ systemic clue ชี้กลุ่มนี้",
      keys: ["Sterile pyuria", "RBC cast", "MAHA, livedo"]
    }, [
      N("Acute interstitial nephritis", "nephro", {
        s: "Drug, infection, autoimmune (Sjögren, IgG4-RD, sarcoid, ANCA-associated TIN), ICI",
        ix: ["Biopsy"],
        link: "pyuria"
      }),
      N("Glomerulonephritis / RPGN", "nephro", {
        s: "Dysmorphic RBC, RBC cast, proteinuria",
        ix: ["ANCA, anti-GBM, complement"],
        link: "rpgn"
      }),
      N("TMA", "nephro", {
        s: "MAHA, thrombocytopenia",
        ix: ["Smear, ADAMTS13"],
        link: "tma"
      }),
      N("Atheroembolic disease", "nephro", {
        s: "Subacute stepwise AKI หลัง procedure",
        ix: ["Eosinophil, complement, fundoscopy"],
        link: "bluetoe"
      }),
      N("Renal infarction / RVT", "nephro", {
        s: "Flank pain, LDH สูง",
        ix: ["CT with contrast, Doppler"],
        link: "flank"
      })
    ]),
    N("Postrenal", "step", {
      s: "Hydronephrosis, LUTS, residual urine",
      why: "Hydronephrosis อาจไม่มีใน early obstruction, volume depletion หรือ retroperitoneal encasement",
      keys: ["PVR > 200 mL", "Single functioning kidney"]
    }, [
      N("Bladder outlet obstruction", "nephro", {
        s: "BPH, urethral stricture, neurogenic bladder, anticholinergic",
        ix: ["Bladder scan, US"],
        link: "luts"
      }),
      N("Bilateral ureteric obstruction", "nephro", {
        s: "Pelvic malignancy, RPF, stones, papillary necrosis",
        ix: ["CT"],
        link: "oliguria"
      })
    ]),
    N("Acute on chronic / CKD", "step", {
      s: "CKD ที่มี second hit หรือ CKD ที่ไม่รู้สาเหตุ",
      keys: ["Small kidneys", "Find the reversible hit", "Diagnose the underlying CKD"]
    }, [
      N("Second hit in CKD", "nephro", {
        s: "Volume, drug, obstruction, infection, uncontrolled BP",
        ix: ["Review ทุกข้อด้านบน"]
      }),
      N("CKD of unknown etiology (CKDu / Mesoamerican-type)", "nephro", {
        s: "CKD ในเกษตรกรที่ทำงานกลางแดด ไม่มี DM หรือ HTN",
        why: "Chronic TIN, low proteinuria, heat stress และ agrochemical สงสัยเป็นสาเหตุ พบในอีสานด้วย",
        ix: ["Urine beta-2 microglobulin, biopsy"]
      }),
      N("Genetic CKD (ADPKD, ADTKD, Alport, APOL1)", "nephro", {
        s: "Family history, bland sediment",
        ix: ["Genetic panel"],
        link: "cysts"
      }),
      N("Hypertensive / ischemic nephropathy", "nephro", {
        s: "Atherosclerosis, asymmetric kidneys",
        ix: ["Duplex"],
        link: "kidneysize"
      }),
      N("Chronic TIN: lithium, lead, aristolochic acid, analgesic, reflux", "nephro", {
        s: "Bland sediment, tubular proteinuria",
        ix: ["Drug and herbal history, imaging"],
        link: "pyuria"
      })
    ])
  ])
};

/* ===================== THROMBOTIC MICROANGIOPATHY ===================== */
TREES.tma = {
  must: [
    "Diarrhea โดยเฉพาะ bloody ในสัปดาห์ก่อน (STEC)",
    "Neurologic symptoms: confusion, focal deficit, seizure, headache",
    "BP สูงมาก, retinopathy, skin thickening",
    "ตั้งครรภ์หรือหลังคลอด",
    "ยา: gemcitabine, mitomycin, VEGF inhibitor, CNI, mTORi, quinine, clopidogrel, ticlopidine, interferon, cocaine",
    "SLE, antiphospholipid syndrome (aPL, thrombosis, recurrent pregnancy loss)",
    "Cancer, HSCT, KT (AMR, de novo TMA)",
    "Family history ของ HUS, recurrent episode, เด็กเล็ก"
  ],
  tree: N("Thrombotic microangiopathy", "root", {
    s: "ยืนยัน MAHA (schistocyte, LDH สูง, haptoglobin ต่ำ, DAT ลบ) กับ thrombocytopenia แล้วส่ง ADAMTS13 ก่อน plasma ทันที แยก TTP, STEC-HUS, complement-mediated และ secondary TMA",
    why: "TTP ต้อง PLEX ภายในชั่วโมง และ complement-mediated TMA ต้อง C5 inhibitor ส่วน secondary TMA ต้องแก้ต้นเหตุ การแยกจึงเปลี่ยนการรักษาทันที",
    keys: ["Platelet < 30,000/µL และ Cr ไม่สูงมาก (< 2.3 mg/dL) ชี้ TTP", "Cr สูงมาก platelet > 30,000 ชี้ HUS แต่ทั้งสองข้อเป็นเพียง pretest probability ไม่แทน ADAMTS13", "TMA บน biopsy อาจไม่มี MAHA ใน circulation (renal-limited TMA)"],
    ix: ["Smear (schistocyte > 1%), LDH, haptoglobin, reticulocyte, DAT, bilirubin", "ADAMTS13 activity และ inhibitor ก่อนให้ plasma", "Stool STEC culture และ Shiga toxin PCR", "C3, C4, CFH, CFI, MCP, anti-CFH antibody, complement genetics", "aPL, ANA, HIV, pregnancy test, homocysteine และ MMA", "Kidney biopsy ถ้า platelet และ BP ปลอดภัยพอ"],
    std: "ISTH 2020 TTP guideline, KDIGO 2017 aHUS and C3G controversies conference"
  }, [
    N("TTP (ADAMTS13 < 10%)", "step", {
      s: "Severe ADAMTS13 deficiency",
      keys: ["PLASMIC score ≥ 6 = high risk", "Neurologic involvement"],
      std: "PLASMIC score"
    }, [
      N("Immune TTP", "nephro", {
        s: "Anti-ADAMTS13 inhibitor, platelet ต่ำมาก, neurologic",
        why: "PLEX, steroid, rituximab และ caplacizumab ลดเวลาจน platelet ปกติและ exacerbation",
        keys: ["AKI มักไม่รุนแรง", "Troponin สูงจาก cardiac microthrombi"],
        ix: ["ADAMTS13 activity, inhibitor titer"],
        std: "ISTH 2020, HERCULES (n = 145) caplacizumab"
      }),
      N("Congenital TTP (Upshaw-Schulman)", "nephro", {
        s: "Recurrent TMA, pregnancy-triggered",
        ix: ["ADAMTS13 ต่ำโดยไม่มี inhibitor, ADAMTS13 genetic"]
      })
    ]),
    N("Infection-associated HUS", "step", {
      s: "TMA หลัง infection",
      keys: ["Bloody diarrhea ชี้ STEC แต่ diarrhea พบใน complement-mediated TMA ได้ราว 30% จึงต้องยืนยันด้วย Shiga toxin และ STEC-HUS ที่ไม่มี diarrhea ก็พบได้", "Pneumococcus ในเด็ก"]
    }, [
      N("STEC-HUS", "nephro", {
        s: "Bloody diarrhea 5-10 วันก่อน AKI",
        why: "Antibiotic อาจเพิ่ม toxin release, supportive care เป็นหลัก",
        ix: ["Stool Shiga toxin PCR, E. coli O157:H7"]
      }),
      N("Pneumococcal HUS", "nephro", {
        s: "Invasive pneumococcal infection ในเด็ก",
        why: "T-antigen exposure, DAT อาจบวก ต้องเลี่ยง plasma ที่มี anti-T",
        ix: ["Blood culture, DAT"]
      }),
      N("HIV, CMV, influenza, COVID-19", "nephro", {
        s: "Virus-associated TMA",
        ix: ["HIV, viral PCR"],
        link: "viral"
      })
    ]),
    N("Complement-mediated TMA (aHUS)", "step", {
      s: "ADAMTS13 > 10%, STEC ลบ, ไม่มี secondary cause ชัด หรือ secondary trigger ที่ไม่ดีขึ้นเมื่อแก้",
      why: "Pathogenic complement variant พบราว 50-60% และ trigger เช่น pregnancy หรือ infection unmask โรค",
      keys: ["C3 ต่ำพบเพียงบางส่วน ดังนั้น C3 ปกติหรือ genetic testing ไม่พบ variant ก็ไม่ได้ตัด aHUS", "Recurrence หลัง KT สูงหรือต่ำขึ้นกับ variant (CFH สูง, isolated MCP ต่ำ)", "รักษาด้วย C5 inhibitor (eculizumab หรือ ravulizumab) โดยไม่รอผล genetics, ต้องให้ meningococcal vaccine ร่วมกับ antibiotic prophylaxis และติดตาม LDH, platelet, Cr"]
    }, [
      N("Genetic complement dysregulation", "nephro", {
        s: "CFH, CFI, MCP (CD46), C3, CFB, THBD variants",
        why: "Isolated MCP variant มี recurrence หลัง KT ต่ำเพราะ MCP เป็น membrane-bound protein ที่มากับ graft, CFH recurrence สูง",
        ix: ["Complement genetics, CFHR1-3 deletion"],
        std: "KDIGO 2017 aHUS controversies"
      }),
      N("Anti-CFH antibody", "nephro", {
        s: "aHUS ในเด็กและวัยรุ่น สัมพันธ์กับ CFHR1 deletion",
        ix: ["Anti-CFH antibody titer"]
      }),
      N("Pregnancy-associated aHUS", "nephro", {
        s: "TMA ช่วงตั้งครรภ์หรือหลังคลอด ส่วนใหญ่เกิด postpartum",
        why: "แยกจาก HELLP ที่ดีขึ้นหลังคลอดภายใน 48-72 ชั่วโมง",
        ix: ["LFT, ADAMTS13, complement"],
        link: "pregnancy"
      })
    ]),
    N("Secondary TMA", "step", {
      s: "TMA ที่มี underlying condition ชัด",
      keys: ["แก้สาเหตุแล้วดีขึ้น", "ถ้าไม่ดีขึ้นให้คิด complement"]
    }, [
      N("Malignant hypertension", "nephro", {
        s: "Severe HTN, retinopathy grade III-IV",
        why: "ต้องแยกว่า HTN เป็นเหตุหรือผลของ aHUS",
        ix: ["Fundoscopy, ADAMTS13, complement"],
        link: "htn-emerg"
      }),
      N("Scleroderma renal crisis", "nephro", {
        s: "Diffuse SSc, anti-RNA polymerase III",
        ix: ["Autoantibodies"],
        link: "skinthick"
      }),
      N("APS / CAPS / SLE", "nephro", {
        s: "aPL บวก, LN with TMA",
        ix: ["aPL, ANA"],
        link: "thrombosis"
      }),
      N("Drug-induced TMA", "nephro", {
        s: "Immune (quinine, gemcitabine บางราย) หรือ dose-dependent toxic (VEGF inhibitor, gemcitabine, mitomycin, CNI, mTORi, cocaine)",
        why: "VEGF inhibitor ทำ renal-limited TMA กับ HTN และ proteinuria",
        ix: ["Drug review, biopsy"],
        link: "onco"
      }),
      N("Transplant-associated TMA", "nephro", {
        s: "De novo TMA จาก CNI, AMR, recurrent aHUS, HSCT-TMA",
        ix: ["DSA, biopsy C4d, CNI level"],
        link: "kt-early"
      }),
      N("Cobalamin C deficiency", "nephro", {
        s: "TMA ในเด็กหรือผู้ใหญ่อายุน้อยกับ neurologic",
        why: "แก้ได้ด้วย hydroxocobalamin",
        ix: ["Homocysteine และ MMA สูง, MMACHC"]
      }),
      N("Pregnancy: preeclampsia, HELLP", "nephro", {
        s: "TMA หลังอายุครรภ์ 20 สัปดาห์ ส่วนใหญ่ไตรมาสที่ 3 และ HELLP เกิดใน 48-72 ชั่วโมงหลังคลอดได้ ควรดีขึ้นหลังคลอด ถ้าไม่ดีขึ้นให้คิด TTP หรือ aHUS",
        ix: ["BP, UPCR, LFT"],
        link: "pregnancy"
      }),
      N("Metastatic cancer / DIC / severe infection", "adj", {
        s: "Marrow infiltration หรือ DIC",
        why: "DIC มี PT และ aPTT ยาว fibrinogen ต่ำ ต่างจาก TMA",
        ix: ["Coagulation, bone marrow"]
      })
    ]),
    N("TMA mimics", "step", {
      s: "Anemia กับ thrombocytopenia ที่ไม่ใช่ TMA",
      keys: ["Schistocyte น้อย", "DAT บวก"]
    }, [
      N("Evans syndrome / SLE cytopenia", "nephro", {
        s: "DAT บวก กับ ITP",
        ix: ["DAT, ANA"],
        link: "cytopenia"
      }),
      N("Vitamin B12 deficiency (pseudo-microangiopathy)", "adj", {
        s: "Ineffective erythropoiesis, LDH สูงมาก, reticulocyte ต่ำ",
        ix: ["B12, reticulocyte"]
      }),
      N("Mechanical hemolysis / sepsis / HIT thrombocytopenia", "adj", {
        s: "Mechanical hemolysis จาก prosthetic valve หรือ ECMO และ sepsis ทำให้ anemia กับ thrombocytopenia ได้ ส่วน HIT มี thrombocytopenia ร่วมกับ thrombosis หลังได้ heparin โดยไม่มี hemolysis",
        ix: ["Echo, 4T score"],
        link: "bleeding"
      })
    ])
  ])
};

/* ===================== OLIGURIA / ANURIA ===================== */
TREES.oliguria = {
  must: [
    "Urine output จริง (catheter ไหม, catheter อุดตันไหม), anuria ทันทีหรือค่อยๆ",
    "LUTS, BPH, ยา anticholinergic, opioid, spinal anesthesia",
    "Single functioning kidney, KT, ประวัติผ่าตัด pelvic",
    "Flank pain, hematuria, AF หรือ embolic source (renal infarct)",
    "Aortic dissection, abdominal aortic surgery",
    "ตั้งครรภ์ (placental abruption, PPH), snake bite, sepsis, DIC (cortical necrosis)",
    "Hypotension, shock, sepsis",
    "RPGN features"
  ],
  tree: N("Oliguria and anuria", "root", {
    s: "Oliguria < 0.5 mL/kg/h นาน 6 ชั่วโมงหรือ < 400 mL/วัน, anuria < 100 mL/วัน ทุกรายเริ่มที่ bladder scan หรือ catheter แล้ว US ตาม",
    why: "Complete anuria มี DDx แคบ คือ obstruction, bilateral vascular occlusion, cortical necrosis, severe RPGN และ severe ATN ซึ่งต้องหาให้เจอเร็ว",
    keys: ["Complete anuria เฉียบพลัน: obstruction หรือ vascular จนกว่าจะพิสูจน์ได้ว่าไม่ใช่", "Intermittent anuria สลับ polyuria: intermittent obstruction", "Oliguria กับ urine Na ต่ำชี้ prerenal แต่พบได้ใน AGN, HRS, contrast และ early obstruction ด้วย"],
    ix: ["Bladder scan, flush หรือเปลี่ยน catheter", "Kidney US และ Doppler", "CT non-contrast หรือ CTA ตามสงสัย", "UA, urine Na, FENa", "Biopsy ถ้า imaging ไม่พบ obstruction หรือ vascular occlusion และ sediment หรือ serology ชี้ parenchymal disease ที่สาเหตุยังไม่ชัด"],
    std: "KDIGO 2012 AKI"
  }, [
    N("Obstruction", "step", {
      s: "Hydronephrosis หรือ bladder distension",
      keys: ["Anuria จาก obstruction ต้องเป็น bilateral, bladder outlet หรือ single functioning kidney", "Hydronephrosis อาจยังไม่เห็นใน 48 ชั่วโมงแรก, ใน volume depletion หรือใน retroperitoneal fibrosis (RPF) ดังนั้น US ปกติไม่ได้ตัด obstruction ถ้ายังสงสัย", "หลังแก้ obstruction ให้เฝ้าระวัง post-obstructive diuresis (urine > 200 mL/h ต่อเนื่อง) โดยวัด urine รายชั่วโมงและ electrolyte ทุก 6-12 ชั่วโมง"]
    }, [
      N("Bladder outlet obstruction", "nephro", {
        s: "BPH, clot retention, urethral stricture, neurogenic bladder, drugs",
        ix: ["Bladder scan, catheter"],
        link: "luts"
      }),
      N("Bilateral ureteric obstruction", "nephro", {
        s: "Cervical หรือ prostate cancer, RPF, bilateral stones, sloughed papilla",
        ix: ["CT, nephrostomy หรือ DJ stent"],
        link: "backpain"
      }),
      N("Obstruction of a solitary or transplanted kidney", "nephro", {
        s: "Solitary kidney: unilateral stone, clot หรือ tumor ก็ทำ anuria ได้, KT: ureteric stricture, lymphocele, stone, clot",
        ix: ["Graft US"],
        link: "kt-early"
      })
    ]),
    N("Bilateral vascular occlusion", "step", {
      s: "Anuria เฉียบพลันกับ flank pain หรือ aortic disease",
      keys: ["LDH สูง", "AF", "Dissection"]
    }, [
      N("Bilateral renal artery thrombosis or embolism", "nephro", {
        s: "AF, endocarditis, antiphospholipid syndrome, atherosclerosis, trauma",
        ix: ["CTA, Doppler, LDH"],
        link: "flank"
      }),
      N("Aortic dissection or aortic occlusion", "nephro", {
        s: "Chest หรือ back pain กับ anuria",
        ix: ["CTA aorta"],
        link: "chestpain"
      }),
      N("Bilateral renal vein thrombosis", "nephro", {
        s: "Nephrotic syndrome, MN, hypercoagulable",
        ix: ["Doppler, CT venography"],
        link: "thrombosis"
      })
    ]),
    N("Severe parenchymal disease", "step", {
      s: "Imaging ไม่มี obstruction หรือ vascular occlusion",
      keys: ["Sediment", "Obstetric or snake bite history"]
    }, [
      N("Bilateral cortical necrosis", "nephro", {
        s: "Placental abruption, PPH, septic abortion, snake bite (Russell viper), sepsis กับ DIC, HUS",
        why: "Partial recovery ได้บ้าง ส่วนใหญ่ dialysis-dependent",
        ix: ["CT with contrast: reverse rim sign (cortex ไม่ enhance แต่ medulla และ subcapsular rim บาง ๆ ยัง enhance), biopsy"]
      }),
      N("Severe RPGN", "nephro", {
        s: "Anuria กับ active sediment",
        ix: ["ANCA, anti-GBM, biopsy"],
        link: "rpgn"
      }),
      N("Severe ATN", "nephro", {
        s: "Shock, sepsis, rhabdomyolysis, snake bite",
        ix: ["Urine microscopy"],
        link: "risingcr"
      }),
      N("TMA / malignant HTN", "nephro", {
        s: "MAHA กับ anuria",
        ix: ["Smear"],
        link: "tma"
      })
    ]),
    N("Prerenal / functional oliguria", "step", {
      s: "Oliguria ไม่ใช่ anuria, urine Na ต่ำ",
      keys: ["Volume", "Cardiac output", "Cirrhosis"]
    }, [
      N("Hypovolemia / shock", "nephro", {
        s: "Fluid responsive",
        ix: ["Dynamic fluid responsiveness"],
        link: "syncope"
      }),
      N("HRS-AKI / cardiorenal / abdominal compartment", "nephro", {
        s: "Functional oliguria ที่ไม่ตอบสนองต่อ fluid",
        ix: ["Bladder pressure, echo, ประเมิน Cr ซ้ำที่ 24 ชั่วโมงหลัง volume resuscitation ที่เพียงพอ (HRS-AKI)"],
        link: "risingcr"
      })
    ]),
    N("Catheter and measurement issues", "step", {
      s: "Oliguria ปลอม",
      keys: ["Blocked catheter", "Leak"]
    }, [
      N("Blocked catheter / urine leak", "adj", {
        s: "Catheter อุดตัน หรือ urine leak หลังผ่าตัด (KT anastomosis)",
        why: "Urine leak ใน KT ทำให้ serum Cr สูงจากการดูดซึม urine ที่รั่วกลับเข้าร่างกาย",
        ix: ["Flush catheter, drain fluid Cr เทียบ serum"],
        link: "kt-early"
      })
    ])
  ])
};

/* ===================== STERILE PYURIA / WBC CASTS ===================== */
TREES.pyuria = {
  must: [
    "ยาใน 1-4 สัปดาห์ (แต่ PPI และ NSAID เกิดได้หลังเป็นเดือน): beta-lactam, PPI, NSAID, rifampicin, sulfonamide, allopurinol, ICI, 5-ASA",
    "ไข้, ผื่น, ปวดข้อ, ตาแดง (TINU), sicca, hilar node",
    "TB contact, ไอเรื้อรัง, น้ำหนักลด, epididymitis",
    "Antibiotic ที่ได้ก่อนเก็บปัสสาวะ",
    "Sexual history, urethral discharge",
    "Stone, analgesic use ระยะยาว",
    "KT: UTI และสาเหตุทั่วไปยังพบบ่อยที่สุด ให้เพิ่ม rejection และ BK virus เข้าไปใน differential",
    "ICI: เริ่มกี่เดือน, PPI ร่วม"
  ],
  tree: N("Sterile pyuria / WBC casts", "root", {
    s: "Pyuria (≥ 10 WBC/µL หรือ ≥ 5 WBC/hpf) กับ culture ลบ แยก renal (WBC cast, AKI, tubular proteinuria) กับ lower tract แล้วหา AIN, TB และ atypical organism",
    why: "Sterile pyuria เป็นทางเข้าของ drug-induced AIN, ICI nephritis, TINU, sarcoid, Sjogren และ GU TB ซึ่งเป็นหัวข้อหลักของ board",
    keys: ["WBC cast บอกว่า WBC มาจากไต (AIN, pyelonephritis, proliferative GN) แต่ไม่พบ WBC cast ไม่ได้ตัดสาเหตุจากไต", "Squamous cell มากหมายถึง contamination", "Urine eosinophil ไม่แนะนำแล้ว (sensitivity และ specificity ต่ำ ผลลบไม่ตัด AIN ผลบวกไม่ยืนยัน)", "AIN triad (fever, rash, eosinophilia) พบไม่ถึง 10%"],
    ix: ["UA microscopy, urine culture ซ้ำโดยไม่มี antibiotic", "Early morning urine AFB culture และ PCR 3 วัน", "NAAT สำหรับ Chlamydia, gonorrhea, Mycoplasma genitalium", "UPCR, urine beta-2 microglobulin, glucose", "Kidney US, CT urography", "Kidney biopsy ถ้ามี AKI ที่สงสัย AIN หรืออธิบายสาเหตุไม่ได้"],
    std: "Clinical approach to sterile pyuria (Wise NEJM 2015)"
  }, [
    N("Acute interstitial nephritis", "step", {
      s: "AKI กับ pyuria, WBC cast, LMW proteinuria",
      why: "Biopsy เป็น gold standard, หยุดยาต้นเหตุเป็นหลัก ส่วน steroid อาจช่วยถ้าเริ่มเร็ว (ภายในราว 7 วันหลังหยุดยา) โดยหลักฐานเป็น observational และยังขัดแย้งกัน",
      keys: ["Drug ราวสองในสามของ AIN", "Urine TNF-alpha และ IL-9 เป็น biomarker ใหม่", "ไม่มี pyuria, ไม่มี eosinophilia หรือ UA ปกติ ไม่ได้ตัด AIN โดยเฉพาะจาก NSAID และ PPI"],
      std: "KDIGO 2012 AKI (biopsy-guided)"
    }, [
      N("Drug-induced AIN", "nephro", {
        s: "Beta-lactam, PPI, NSAID, rifampicin, sulfonamide, allopurinol, 5-ASA",
        why: "NSAID ทำให้ AIN ร่วมกับ MCD หรือ MN ได้, PPI AIN onset ช้าและอาการน้อย",
        ix: ["Biopsy: interstitial infiltrate กับ tubulitis, eosinophil พบได้แต่ไม่จำเป็นต้องมี (มักไม่เด่นใน NSAID)"],
        link: "fever"
      }),
      N("Immune checkpoint inhibitor AIN", "nephro", {
        s: "AKI ราว 2-5% ของผู้ได้ ICI, median ราว 3 เดือนหลังเริ่ม",
        why: "PPI ร่วมเพิ่ม risk, steroid ได้ผลดีและ rechallenge ได้ในบางราย",
        ix: ["Biopsy, extrarenal irAE"],
        std: "ASCO 2021 irAE guideline, Cortazar 2020 (n = 138 ICI-AKI)",
        link: "onco"
      }),
      N("TINU / sarcoidosis / Sjogren / IgG4-RD", "nephro", {
        s: "Autoimmune AIN",
        ix: ["Slit lamp, Ca, 1,25D, anti-Ro, IgG4"],
        link: "eye"
      }),
      N("ANCA-associated tubulointerstitial nephritis", "nephro", {
        s: "AKI กับ sterile pyuria หรือ WBC cast, ANCA บวก (ส่วนใหญ่ MPO) แต่ biopsy ไม่มี crescent หรือ necrotizing GN",
        why: "ANCA ทำ peritubular capillaritis, interstitial inflammation และบางรายเป็น granulomatous TIN ได้โดยตรง จึงถือเป็น kidney involvement ของ AAV ไม่ใช่ drug AIN ธรรมดา ต้องคิดเสมอว่าอาจเป็น focal GN ที่ sample ไม่ติด จึงดูจำนวน glomeruli, RBC cast และ extrarenal disease ประกอบ",
        keys: ["Sediment เด่น WBC มากกว่า RBC, dysmorphic RBC น้อยหรือไม่มี, proteinuria ระดับ tubular", "Extrarenal clue: epistaxis, nasal crust, sinusitis, ILD, mononeuritis, purpura, constitutional symptoms", "ไม่มียาที่สัมพันธ์กับเวลา และไม่ดีขึ้นหลังหยุดยาที่สงสัย", "Low C3 หรือ globulin สูงไม่ตัด AAV ออก แต่ต้องแยก Sjögren, IgG4-RD, sarcoid และ lupus ด้วย serology และ IHC"],
        ix: ["MPO และ PR3 ด้วย antigen-specific immunoassay ไม่ใช้ IIF อย่างเดียว", "Biopsy: interstitial infiltrate, tubulitis, peritubular capillaritis, granuloma, glomeruli ควร ≥ 10 และทำ serial sections หา segmental necrosis", "IgG4 IHC, AFB และ fungal stain, TB PCR ใน granuloma ก่อนให้ immunosuppression", "CT chest, ENT exam, nerve conduction ตามอาการ"],
        std: "KDIGO 2024 ANCA-associated vasculitis guideline (รักษาแบบ AAV with kidney involvement)",
        link: "rpgn"
      }),
      N("Granulomatous interstitial nephritis", "nephro", {
        s: "Granuloma ใน interstitium: drug, sarcoid, TB, fungal, GPA หรือ ANCA, Crohn, TINU, BK และ xanthogranulomatous pyelonephritis",
        why: "Drug เป็นสาเหตุอันดับต้นในหลาย series รองลงมาคือ sarcoidosis ส่วน infection ต้องแยกให้ได้ก่อนให้ steroid เพราะการรักษาตรงข้ามกัน",
        keys: ["Hypercalcemia หรือ 1,25(OH)2D สูง ชี้ sarcoid", "Necrotizing granuloma ชี้ TB, fungal หรือ GPA", "ประวัติ NSAID, PPI, beta-lactam, allopurinol, sulfonamide", "Uveitis ร่วม: TINU หรือ sarcoid"],
        ix: ["Ca, 1,25(OH)2D, ACE, chest imaging", "AFB, GMS stain, TB PCR, IGRA", "MPO, PR3, ANA, anti-Ro, IgG4"],
        link: "fever"
      }),
      N("Infection-related AIN", "nephro", {
        s: "Leptospirosis, legionella, EBV, CMV, hantavirus, BK, TB",
        ix: ["Serology, PCR"],
        link: "fever"
      }),
      N("Allograft rejection / BK nephropathy", "nephro", {
        s: "Sterile pyuria ใน KT หลังตัด UTI ซึ่งพบบ่อยที่สุดแล้ว",
        why: "BK nephropathy และ T-cell mediated rejection คล้ายกันบน LM และพบร่วมกันได้ ต้องใช้ SV40 stain ร่วมกับ BK plasma PCR",
        ix: ["BK plasma PCR, biopsy SV40"],
        link: "kt-urine"
      })
    ]),
    N("Infection with negative routine culture", "step", {
      s: "Organism ที่ไม่ขึ้นใน routine culture",
      keys: ["Partially treated", "Fastidious", "TB"]
    }, [
      N("Genitourinary tuberculosis", "nephro", {
        s: "Sterile pyuria, hematuria, ureteric stricture, calcified kidney (autonephrectomy)",
        why: "พบบ่อยในไทย และอาจไม่มี pulmonary TB",
        keys: ["Acid urine กับ pyuria", "Epididymitis, infertility"],
        ix: ["Early morning urine AFB culture และ Xpert 3 วัน", "CT urography: papillary necrosis, stricture, putty kidney"],
        std: "WHO TB guidelines"
      }),
      N("Partially treated UTI", "adj", {
        s: "Antibiotic ก่อนเก็บปัสสาวะ",
        ix: ["Repeat culture หลังหยุดยา"]
      }),
      N("Atypical organisms: Chlamydia, gonorrhea, Ureaplasma, Mycoplasma, fungal", "adj", {
        s: "Urethritis, sexual exposure",
        ix: ["NAAT, fungal culture"]
      })
    ]),
    N("Structural / chronic", "step", {
      s: "Chronic pyuria ไม่มี AKI เฉียบพลัน",
      keys: ["Stone", "Papillary necrosis", "Malignancy"]
    }, [
      N("Nephrolithiasis", "nephro", {
        s: "Stone ทำ pyuria โดยไม่มี infection",
        ix: ["CT"],
        link: "stone"
      }),
      N("Analgesic nephropathy / papillary necrosis", "nephro", {
        s: "Long-term analgesic, sloughed papilla",
        ix: ["CT: papillary calcification"],
        link: "hematuria"
      }),
      N("Chronic TIN: lithium, lead, aristolochic acid, reflux", "nephro", {
        s: "CKD กับ bland หรือ pyuric sediment",
        ix: ["History, imaging"],
        link: "risingcr"
      }),
      N("Urothelial carcinoma in situ / interstitial cystitis", "adj", {
        s: "Sterile pyuria กับ LUTS",
        ix: ["Cytology, cystoscopy"],
        link: "luts"
      })
    ]),
    N("Glomerular disease with pyuria", "step", {
      s: "Pyuria ร่วมกับ hematuria และ proteinuria",
      keys: ["RBC cast", "Proliferative GN"]
    }, [
      N("Proliferative GN: LN, IRGN, ANCA", "nephro", {
        s: "Leukocyturia ใน proliferative GN",
        ix: ["Serology, biopsy"],
        link: "rpgn"
      })
    ]),
    N("Systemic / other", "step", {
      s: "Pyuria เป็นส่วนหนึ่งของ systemic disease",
      keys: ["Fever", "Child", "Instrumentation", "Intra-abdominal inflammation"]
    }, [
      N("Kawasaki disease / reactive arthritis", "adj", {
        s: "Sterile pyuria เป็น minor feature",
        ix: ["Clinical criteria"]
      }),
      N("Catheter / recent instrumentation", "adj", {
        s: "Pyuria จาก foreign body",
        ix: ["History"]
      }),
      N("Adjacent inflammation: appendicitis, diverticulitis", "adj", {
        s: "Pyuria จากการอักเสบนอก urinary tract ที่อยู่ติด ureter หรือ bladder โดย urine culture ลบ",
        ix: ["CT abdomen"]
      })
    ])
  ])
};

/* ===================== PIGMENTURIA ===================== */
TREES.pigmenturia = {
  must: [
    "สีจริง: แดง ชมพู โค้ก น้ำตาลเข้ม ส้ม เขียว ดำ, เข้มขึ้นเมื่อตั้งทิ้งไว้ไหม",
    "Exercise หนัก, heat, ล้มนอนนาน, seizure, statin, alcohol (myoglobin)",
    "ซีด เหลือง ปัสสาวะเข้มตอนเช้า, ยา oxidant, ถั่วปากอ้า, transfusion, malaria (hemoglobin)",
    "Jaundice, อุจจาระซีด (bilirubin)",
    "ยาและอาหาร: rifampicin, phenazopyridine, metronidazole, nitrofurantoin, propofol, methylene blue, beetroot, senna",
    "ปวดท้อง neuropathy hyponatremia (porphyria)",
    "Snake bite, wasp sting",
    "Cardiac surgery, mechanical valve, ECMO"
  ],
  tree: N("Pigmenturia", "root", {
    s: "ใช้ dipstick heme กับ microscopy แยก hematuria, hemoglobinuria, myoglobinuria และ non-heme pigment",
    why: "Heme pigment ทำให้ AKI จาก tubular obstruction, direct toxicity และ vasoconstriction ซึ่งป้องกันได้ด้วย early volume expansion",
    keys: ["Heme บวก มี RBC: hematuria", "Heme บวก ไม่มี RBC: hemoglobin หรือ myoglobin", "Serum สีชมพูและ haptoglobin ต่ำ: hemoglobin", "Serum ใส CK สูง: myoglobin", "Heme ลบ: bilirubin, porphyrin, drug, food"],
    ix: ["UA dipstick และ microscopy", "CK, LDH, haptoglobin, bilirubin, reticulocyte, smear, DAT", "Urine myoglobin, urine bilirubin", "Spot urine PBG ถ้าสงสัย porphyria", "K, PO4, Ca, urate, Cr"],
    std: "Heme pigment nephropathy approach"
  }, [
    N("Myoglobinuria", "step", {
      s: "CK สูง, serum ใส",
      keys: ["CK > 5,000 U/L เพิ่ม AKI risk", "Hyperkalemia และ hypocalcemia ช่วงแรก"],
      std: "McMahon score"
    }, [
      N("Rhabdomyolysis", "nephro", {
        s: "Trauma, exertion, drugs, infection, metabolic",
        why: "Early isotonic fluid เป้า urine output ราว 200-300 mL/h, bicarbonate และ mannitol ไม่มีหลักฐานชัด",
        ix: ["CK, K, PO4, Ca, Cr"],
        link: "myalgia"
      }),
      N("Snake bite / wasp sting", "nephro", {
        s: "Sea snake ทำ rhabdomyolysis เด่น, Russell viper ทำ intravascular hemolysis, DIC และ AKI เป็นหลัก (rhabdomyolysis พบร่วมได้), ถูก wasp ต่อยจำนวนมากทำให้ทั้ง rhabdomyolysis และ hemolysis",
        ix: ["20WBCT, CK, LDH"]
      })
    ]),
    N("Hemoglobinuria", "step", {
      s: "Intravascular hemolysis",
      keys: ["Haptoglobin ต่ำ", "LDH สูงมาก", "Hemosiderinuria ใน chronic"]
    }, [
      N("G6PD deficiency", "nephro", {
        s: "Acute hemolysis หลัง oxidant drug, infection, fava bean",
        why: "พบบ่อยในชายไทย, rasburicase ห้ามใช้ และต้องตรวจ G6PD ก่อนให้ primaquine",
        ix: ["G6PD level (ช่วง acute hemolysis อาจปกติปลอมเพราะ reticulocyte สูง ให้ตรวจซ้ำหลัง 2-3 เดือน), bite cell"],
        link: "jaundice"
      }),
      N("Paroxysmal nocturnal hemoglobinuria", "nephro", {
        s: "Dark urine ตอนเช้า, thrombosis, cytopenia",
        why: "Chronic hemosiderosis ของ tubule ทำให้ CKD, C5 inhibitor ลด hemolysis",
        ix: ["Flow cytometry FLAER, CD59"],
        link: "thrombosis"
      }),
      N("Malaria / blackwater fever", "nephro", {
        s: "P. falciparum กับ hemoglobinuria",
        ix: ["Blood film"],
        std: "WHO 2023 malaria"
      }),
      N("Transfusion reaction / AIHA / mechanical", "nephro", {
        s: "ABO mismatch, cold agglutinin, mechanical valve, cardiopulmonary bypass, ECMO",
        ix: ["DAT, transfusion workup"],
        link: "cytopenia"
      }),
      N("TMA", "nephro", {
        s: "MAHA กับ thrombocytopenia",
        ix: ["Smear"],
        link: "tma"
      })
    ]),
    N("Non-heme pigment", "step", {
      s: "Dipstick heme ลบ",
      keys: ["Bilirubin", "Porphyrin", "Drug", "Food"]
    }, [
      N("Bilirubinuria / bile cast nephropathy", "nephro", {
        s: "Conjugated hyperbilirubinemia",
        ix: ["Urine bilirubin, LFT"],
        link: "jaundice"
      }),
      N("Acute hepatic porphyria", "nephro", {
        s: "ปัสสาวะสีแดงเข้มเมื่อตั้งทิ้ง, ปวดท้อง, hyponatremia",
        ix: ["Spot urine PBG และ ALA"],
        std: "AGA 2023 acute hepatic porphyria",
        link: "abdpain"
      }),
      N("Drug and food pigment", "adj", {
        s: "Rifampicin ส้ม, phenazopyridine ส้มแดง, metronidazole และ nitrofurantoin น้ำตาล, propofol เขียว, methylene blue น้ำเงินเขียว, beetroot แดง",
        ix: ["History"]
      }),
      N("Alkaptonuria / melanuria / homogentisic acid", "adj", {
        s: "ปัสสาวะดำเมื่อตั้งทิ้ง",
        why: "Melanuria ใน metastatic melanoma",
        ix: ["Urine homogentisic acid"]
      })
    ]),
    N("Hematuria", "step", {
      s: "RBC บน microscopy",
      keys: ["Glomerular vs non-glomerular"]
    }, [
      N("Glomerular or urologic hematuria", "nephro", {
        s: "Cola-colored urine ใน GN, red urine ใน urologic",
        ix: ["RBC morphology"],
        link: "hematuria"
      })
    ])
  ])
};

/* ===================== FLANK PAIN / RENAL MASS ===================== */
TREES.flank = {
  must: [
    "Colicky หรือ constant, ร้าวไปขาหนีบ, ไข้, hematuria",
    "AF, valve, endocarditis, hypercoagulable (infarct)",
    "Nephrotic, MN (RVT)",
    "ADPKD, family history",
    "Analgesic use, DM, sickle cell (papillary necrosis)",
    "Tuberous sclerosis, VHL features",
    "Weight loss, hematuria, paraneoplastic (RCC)",
    "Anticoagulant (bleeding into AML หรือ cyst)"
  ],
  tree: N("Flank pain and renal mass", "root", {
    s: "แยกด้วย fever, hematuria, LDH และ imaging ระหว่าง obstruction, infection, vascular, cystic และ neoplastic",
    why: "Flank pain เป็นทางเข้าของ ADPKD complication, renal infarct, RVT ใน nephrotic และ RCC",
    keys: ["Colic: stone หรือ clot หรือ papilla", "Fever: pyelonephritis, abscess, infected cyst", "LDH สูงมาก AST ปกติ: infarct", "Palpable mass: ADPKD, RCC, hydronephrosis"],
    ix: ["UA, urine culture, CBC, LDH, Cr", "Non-contrast CT KUB สำหรับ colic", "CT with contrast หรือ MRI สำหรับ mass, infarct, abscess", "Doppler สำหรับ RVT"],
    std: "Bosniak 2019, AUA 2014 kidney stone"
  }, [
    N("Obstruction", "step", {
      s: "Colic กับ hydronephrosis",
      keys: ["Stone", "Clot", "Papilla", "UPJ"]
    }, [
      N("Nephrolithiasis", "nephro", {
        s: "Renal colic",
        ix: ["Non-contrast CT"],
        link: "stone"
      }),
      N("Papillary necrosis", "nephro", {
        s: "Colic กับ sloughed papilla",
        ix: ["CT urography"],
        link: "hematuria"
      }),
      N("UPJ obstruction (Dietl crisis)", "adj", {
        s: "Intermittent flank pain หลังดื่มน้ำมาก",
        ix: ["Diuretic renogram (MAG3)"]
      })
    ]),
    N("Infection", "step", {
      s: "Fever กับ flank tenderness",
      keys: ["DM", "Obstruction", "ADPKD"]
    }, [
      N("Acute pyelonephritis / renal abscess", "nephro", {
        s: "Fever, CVA tenderness, pyuria",
        ix: ["Urine และ blood culture, CT ถ้าไม่ดีขึ้น 72 ชั่วโมง"]
      }),
      N("Emphysematous pyelonephritis", "nephro", {
        s: "DM ที่คุมไม่ได้, gas ใน parenchyma",
        ix: ["CT: Huang-Tseng classification"]
      }),
      N("ADPKD cyst infection", "nephro", {
        s: "Fever, focal pain, CRP สูง, urine culture อาจลบ",
        why: "ใช้ lipophilic antibiotic (fluoroquinolone) ที่ซึมเข้า cyst",
        ix: ["FDG-PET/CT, MRI DWI"],
        link: "cysts"
      }),
      N("Xanthogranulomatous pyelonephritis / renal TB", "nephro", {
        s: "Chronic infection กับ staghorn หรือ calcified kidney",
        ix: ["CT: bear paw sign, AFB"],
        link: "pyuria"
      })
    ]),
    N("Vascular", "step", {
      s: "Constant pain, LDH สูง, hematuria",
      keys: ["Embolic source", "Nephrotic"]
    }, [
      N("Renal infarction", "nephro", {
        s: "Acute flank pain, LDH สูงมาก, HTN, hematuria",
        why: "Cardioembolic (AF) พบบ่อยที่สุด รองลงมาคือ renal artery dissection, FMD, antiphospholipid syndrome และ hypercoagulable state อื่น ราวหนึ่งในสามไม่พบสาเหตุ",
        ix: ["CT with contrast: wedge-shaped defect", "Echo, Holter, aPL"],
        link: "bluetoe"
      }),
      N("Renal vein thrombosis", "nephro", {
        s: "Flank pain, hematuria, AKI, kidney โต",
        ix: ["Doppler, CT venography"],
        link: "thrombosis"
      }),
      N("Nutcracker syndrome", "adj", {
        s: "Left flank pain, hematuria, varicocele, orthostatic proteinuria",
        ix: ["Doppler left renal vein, CT"]
      }),
      N("Loin pain hematuria syndrome", "adj", {
        s: "Recurrent severe loin pain, hematuria โดยไม่มีสาเหตุอื่น",
        ix: ["Diagnosis of exclusion"]
      })
    ]),
    N("Cystic / hemorrhagic", "step", {
      s: "Cyst rupture หรือ bleeding",
      keys: ["ADPKD", "AML", "Anticoagulant"]
    }, [
      N("ADPKD cyst hemorrhage", "nephro", {
        s: "Acute pain, gross hematuria ใน ADPKD",
        ix: ["MRI: hemorrhagic cyst"],
        link: "cysts"
      }),
      N("Angiomyolipoma bleeding (Wunderlich syndrome)", "nephro", {
        s: "Acute flank pain, hypovolemia, mass",
        why: "AML > 4 cm หรือ aneurysm > 5 mm เสี่ยง bleed, TSC มี AML หลายจุด, everolimus ลดขนาด",
        ix: ["CT: fat density"],
        std: "International TSC consensus 2021"
      })
    ]),
    N("Neoplastic mass", "step", {
      s: "Solid หรือ complex cystic mass",
      keys: ["Bosniak", "Paraneoplastic", "Hereditary"]
    }, [
      N("Renal cell carcinoma", "nephro", {
        s: "Mass, hematuria, paraneoplastic",
        why: "ACKD ใน dialysis, VHL, TSC, hereditary leiomyomatosis (FH), BHD เพิ่ม risk",
        ix: ["CT หรือ MRI, Bosniak 2019 สำหรับ cystic"],
        std: "Bosniak 2019, AUA 2021 renal mass guideline"
      }),
      N("Renal lymphoma / leukemic infiltration", "nephro", {
        s: "Multiple masses หรือ bilateral nephromegaly",
        ix: ["Biopsy"],
        link: "lymphnode"
      }),
      N("Upper tract urothelial carcinoma", "nephro", {
        s: "Filling defect, hematuria",
        why: "Aristolochic acid และ Balkan nephropathy",
        ix: ["CT urography, ureteroscopy"],
        link: "hematuria"
      })
    ]),
    N("Extrarenal mimics", "step", {
      s: "Pain ที่ไม่ใช่ไต",
      keys: ["Dermatome", "Musculoskeletal", "GI"]
    }, [
      N("Herpes zoster / radiculopathy / musculoskeletal pain", "adj", {
        s: "Dermatomal pain ก่อนผื่น หรือ positional pain",
        why: "Zoster พบบ่อยขึ้นในผู้ได้ immunosuppression (KT, GN ที่ได้ steroid หรือ cyclophosphamide) และผู้สูงอายุ",
        ix: ["Clinical"]
      }),
      N("Biliary, pancreatic, aortic, retroperitoneal", "adj", {
        s: "Referred pain",
        ix: ["CT abdomen"],
        link: "backpain"
      })
    ])
  ])
};

/* ===================== NEPHROLITHIASIS / RECURRENT UTI ===================== */
TREES.stone = {
  must: [
    "จำนวนครั้ง, อายุที่เป็นครั้งแรก (< 20 ปี ให้คิด genetic), ชนิดนิ่วที่เคยวิเคราะห์",
    "Fluid intake, urine volume, อาหาร: salt, animal protein, oxalate, fructose, vitamin C",
    "Bowel disease, bariatric surgery, chronic diarrhea",
    "Gout, DM, obesity, metabolic syndrome",
    "PHPT symptoms, sarcoid, vitamin D หรือ Ca supplement",
    "ยา: topiramate, acetazolamide, indinavir, atazanavir, sulfadiazine, triamterene, ceftriaxone",
    "Family history ของนิ่วหรือ CKD (PH, cystinuria, Dent, APRT)",
    "Recurrent UTI: urease organism, neurogenic bladder, catheter"
  ],
  tree: N("Nephrolithiasis and recurrent UTI", "root", {
    s: "วิเคราะห์ชนิดนิ่วทุกครั้งที่เก็บนิ่วได้ (อย่างน้อยหนึ่งครั้ง) แล้วทำ metabolic workup (24-hour urine 2 ชุด) ใน recurrent, อายุน้อย หรือ high-risk แยก calcium, struvite, uric acid, cystine และ drug stone",
    why: "Stone disease ใน nephrology board เน้น metabolic cause ที่รักษาได้ เช่น PHPT, dRTA, enteric hyperoxaluria, primary hyperoxaluria, cystinuria และ ADPKD",
    keys: ["Hypercalciuria > 250 mg/วัน (หญิง) หรือ > 300 (ชาย) หรือ > 4 mg/kg/วัน", "Hyperoxaluria > 40-45 mg/วัน", "Hypocitraturia < 320 mg/วัน", "Urine volume < 2 L/วัน", "Urine pH < 5.5 (uric acid), > 6.5-7 (CaP, struvite)"],
    ix: ["Stone analysis (infrared spectroscopy)", "24-hour urine x2: volume, Ca, oxalate, citrate, urate, Na, Cr, pH, cystine screen", "Serum Ca, PTH, PO4, urate, HCO3, K", "Non-contrast CT"],
    std: "AUA 2014 medical management of kidney stones (validity confirmed 2019), EAU 2024 urolithiasis guideline"
  }, [
    N("Calcium oxalate", "step", {
      s: "นิ่วที่พบบ่อยที่สุด",
      keys: ["Hypercalciuria", "Hyperoxaluria", "Hypocitraturia", "Low volume"]
    }, [
      N("Idiopathic hypercalciuria", "nephro", {
        s: "Normocalcemic hypercalciuria",
        why: "Thiazide ลด urine Ca แต่ NOSTONE (n = 416) hydrochlorothiazide ไม่ลด recurrence ในทุกขนาด",
        ix: ["24-hour urine Ca, serum Ca, PTH"],
        std: "NOSTONE (NEJM 2023), AUA 2019"
      }),
      N("Primary hyperparathyroidism", "nephro", {
        s: "Hypercalcemia กับ stone",
        ix: ["Ca, PTH"],
        std: "Fifth International Workshop 2022",
        link: "hyperca"
      }),
      N("Enteric hyperoxaluria", "nephro", {
        s: "Fat malabsorption, RYGB, short bowel, chronic pancreatitis",
        ix: ["24-hour urine oxalate, fecal fat"],
        link: "diarrhea"
      }),
      N("Dietary and ingestion-related hyperoxaluria", "nephro", {
        s: "Juicing หรือ green smoothie (ผักโขม, ใบชะพลู, beet), มะเฟือง, ตะลิงปลิง, ถั่วและ cocoa ปริมาณมาก, ชาเข้มข้น, vitamin C > 1 g/วัน, ethylene glycol",
        why: "Oxalate load เฉียบพลันทำ acute oxalate nephropathy โดยเฉพาะเมื่อมี CKD เดิม, volume depletion, low calcium diet หรือ DM ที่ไม่ได้คุม มะเฟืองยังมี caramboxin ที่ทำ neurotoxicity (สะอึก, สับสน, ชัก) ใน CKD",
        keys: ["AKI ที่ไม่มีคำอธิบายกับ bland sediment ให้ถามอาหารและอาหารเสริมเป็นรายข้อ", "Polarized microscopy เห็น birefringent fan-shaped หรือ sheaf crystal ใน tubule", "มะเฟืองกับ hiccup หรือ seizure ใน CKD ต้องคิด star fruit intoxication และพิจารณา HD"],
        ix: ["24-hour urine oxalate (> 45 mg/วัน หรือ > 0.5 mmol/วัน), plasma oxalate ใน CKD", "UA crystal, biopsy ใต้ polarized light", "ตัด enteric cause: fecal fat, ประวัติ bariatric, orlistat"],
        std: "Expert review (Rosenstock 2022, Glew 2014)",
        link: "risingcr"
      }),
      N("Primary hyperoxaluria", "nephro", {
        s: "Recurrent stone ตั้งแต่เด็ก, nephrocalcinosis, CKD, oxalate > 0.7 mmol/1.73 m2/วัน",
        why: "Lumasiran และ nedosiran (RNAi) ลด hepatic oxalate production ใน PH1, pyridoxine ลองในทุกรายของ PH1, isolated KT โดยไม่แก้ metabolic defect มี oxalate recurrence ใน graft สูง จึงต้องทำ liver-kidney transplant หรือคุม oxalate ด้วย RNAi ให้ได้ก่อนและหลัง KT (หลักฐานของ kidney-alone ภายใต้ RNAi ยังจำกัด)",
        ix: ["Urine oxalate, glycolate, plasma oxalate, AGXT, GRHPR, HOGA1"],
        std: "OxalEurope และ ERKNet 2023 PH1 guideline",
        link: "bonepain"
      }),
      N("Hypocitraturia / hyperuricosuria / low volume", "nephro", {
        s: "Metabolic risk ที่แก้ได้",
        why: "Allopurinol ลด recurrence ใน hyperuricosuric CaOx stone ที่ urine Ca ปกติ (Ettinger 1986) ส่วน potassium citrate ใช้เมื่อมี hypocitraturia ร่วม",
        ix: ["24-hour urine citrate, urate"]
      })
    ]),
    N("Calcium phosphate", "step", {
      s: "Urine pH สูง",
      keys: ["dRTA", "PHPT", "Drug"]
    }, [
      N("Distal RTA", "nephro", {
        s: "CaP stone, nephrocalcinosis, hypocitraturia, urine pH > 5.5",
        ix: ["VBG, UAG, urine citrate"],
        link: "nagma"
      }),
      N("Carbonic anhydrase inhibitor: topiramate, acetazolamide, zonisamide", "nephro", {
        s: "Drug-induced RTA (mixed proximal และ distal) ทำ urine pH สูงและ hypocitraturia จึงเกิด CaP stone",
        ix: ["Drug review, urine citrate"]
      }),
      N("Medullary sponge kidney", "nephro", {
        s: "Nephrocalcinosis, recurrent stone, paintbrush appearance",
        ix: ["CT urography"],
        link: "cysts"
      }),
      N("Hypercalciuric states: sarcoid, vitamin D, Dent, milk-alkali", "nephro", {
        s: "Hypercalciuria จาก systemic cause",
        ix: ["1,25D, PTH, urine LMW protein"],
        link: "hyperca"
      })
    ]),
    N("Uric acid", "step", {
      s: "Radiolucent บน X-ray แต่เห็นบน CT, urine pH < 5.5",
      keys: ["Metabolic syndrome", "Gout", "Ileostomy"]
    }, [
      N("Low urine pH: insulin resistance, ileostomy, chronic diarrhea", "nephro", {
        s: "Uric acid stone แม้ urate ปกติ",
        why: "Alkalinization ด้วย potassium citrate ละลายนิ่วได้",
        ix: ["Urine pH, 24-hour urine"],
        link: "obesity"
      }),
      N("Hyperuricosuria: gout, TLS, myeloproliferative", "nephro", {
        s: "Urate overproduction",
        ix: ["Urate, 24-hour urine urate"],
        link: "arthralgia"
      })
    ]),
    N("Struvite and recurrent UTI", "step", {
      s: "Staghorn, urease-producing organism",
      keys: ["Proteus, Klebsiella", "Urine pH > 7"]
    }, [
      N("Struvite stone (infection stone)", "nephro", {
        s: "Staghorn calculus, recurrent UTI",
        why: "ต้องเอานิ่วออกทั้งหมด (PCNL), xanthogranulomatous pyelonephritis เป็น complication",
        ix: ["Urine culture, CT"],
        std: "AUA 2016 surgical management of stones"
      }),
      N("Underlying recurrent UTI: structural or functional cause", "nephro", {
        s: "≥ 2 ครั้งใน 6 เดือนหรือ ≥ 3 ครั้งใน 12 เดือน",
        why: "Obstruction, reflux, neurogenic bladder, stone, DM, postmenopause (vaginal estrogen), KT, ADPKD",
        ix: ["US, PVR, CT urography ถ้า atypical, VCUG"],
        std: "AUA/CUA/SUFU 2019 recurrent uncomplicated UTI in women guideline (amended 2022, updated 2025)",
        link: "luts"
      })
    ]),
    N("Cystine and rare stones", "step", {
      s: "นิ่วตั้งแต่อายุน้อย, family history",
      keys: ["Hexagonal crystal", "Round brown crystal"]
    }, [
      N("Cystinuria", "nephro", {
        s: "Recurrent cystine stone ตั้งแต่เด็ก",
        why: "เป้า urine cystine < 250 mg/L ด้วยน้ำมาก, alkalinization (pH > 7) และ tiopronin",
        ix: ["Hexagonal crystal, cyanide-nitroprusside test, 24-hour urine cystine, SLC3A1, SLC7A9"]
      }),
      N("APRT deficiency (2,8-dihydroxyadenine)", "nephro", {
        s: "Radiolucent stone หรือ crystal nephropathy, recurrence หลัง KT",
        why: "รักษาได้ด้วย allopurinol หรือ febuxostat",
        ix: ["Round brown crystal with Maltese cross, APRT activity"]
      }),
      N("Drug stones", "nephro", {
        s: "Indinavir, atazanavir, sulfadiazine, triamterene, ceftriaxone, guaifenesin",
        ix: ["Stone analysis, drug history"]
      })
    ]),
    N("Nephrocalcinosis", "step", {
      s: "Calcification ใน parenchyma",
      keys: ["Medullary vs cortical"]
    }, [
      N("Medullary nephrocalcinosis", "nephro", {
        s: "dRTA, PHPT, medullary sponge kidney, hypercalciuria, Bartter, FHHNC, vitamin D excess",
        ix: ["US, CT, Ca, PTH, VBG"],
        link: "cramps"
      }),
      N("Cortical nephrocalcinosis", "nephro", {
        s: "Cortical necrosis, chronic GN, oxalosis, AIDS-related infection",
        ix: ["CT"],
        link: "oliguria"
      })
    ])
  ])
};

/* ===================== RENAL CYSTS ===================== */
TREES.cysts = {
  must: [
    "จำนวน cyst, ข้างเดียวหรือสองข้าง, ขนาดไต, cyst ที่ตับหรือ pancreas",
    "Family history ของ ADPKD, ESKD, aneurysm, SAH, early-onset DM (HNF1B)",
    "HTN อายุน้อย, hematuria, flank pain, UTI",
    "Dialysis vintage (ACKD)",
    "Skin: facial angiofibroma, ash-leaf macule, shagreen patch (TSC)",
    "Hemangioblastoma, pheochromocytoma, pancreatic cyst (VHL)",
    "Gout อายุน้อย, anemia, hypomagnesemia (ADTKD)",
    "Lithium ระยะยาว"
  ],
  tree: N("Renal cysts", "root", {
    s: "แยก simple หรือ complex cyst ด้วย Bosniak ก่อน แล้วใช้จำนวน ขนาดไต family history และ extrarenal feature แยก inherited cystic disease",
    why: "ADPKD เป็นโรคไตพันธุกรรมที่พบบ่อยที่สุด และ examiner ถาม diagnosis criteria, risk stratification และ tolvaptan",
    keys: ["Bosniak I-II benign ไม่ต้องติดตาม, IIF ติดตามด้วย imaging, III (malignant ราวครึ่งหนึ่ง) และ IV (malignant ส่วนใหญ่) ส่ง urology เพื่อ surgery หรือ active surveillance ในรายที่เหมาะ", "Bilateral enlarged kidneys กับ cyst หลายใบ: ADPKD", "Small หรือ normal kidneys กับ cyst: ADTKD, NPHP, ACKD", "Extrarenal: liver cyst, aneurysm, angiofibroma"],
    ix: ["US, MRI kidney (htTKV)", "Genetic testing เมื่อ imaging ไม่ชัด หรือ living donor", "UA, Cr, urate, Mg"],
    std: "Bosniak 2019, KDIGO 2025 ADPKD guideline"
  }, [
    N("Simple and complex sporadic cysts", "step", {
      s: "Cyst จำนวนน้อย ไม่มี family history",
      keys: ["Age-related"]
    }, [
      N("Simple cysts", "adj", {
        s: "พบมากขึ้นตามอายุ",
        ix: ["US: anechoic, thin wall"],
        std: "Bosniak I-II"
      }),
      N("Complex cystic mass (Bosniak IIF-IV)", "nephro", {
        s: "Septation หนา, enhancing nodule",
        ix: ["CT หรือ MRI with contrast"],
        std: "Bosniak 2019",
        link: "flank"
      })
    ]),
    N("Autosomal dominant polycystic kidney disease", "step", {
      s: "Bilateral enlarged cystic kidneys",
      why: "PKD1 รุนแรงกว่า PKD2 (ESKD เฉลี่ยราว 55 ปี vs 75 ปี)",
      keys: ["Liver cysts", "IA", "HTN อายุน้อย"]
    }, [
      N("ADPKD diagnosis", "nephro", {
        s: "Pei-Ravine US criteria ในผู้ที่มี family history",
        why: "อายุ 15-39: ≥ 3 cysts รวม, 40-59: ≥ 2 cysts แต่ละข้าง, ≥ 60: ≥ 4 cysts แต่ละข้าง, MRI > 10 cysts รวมในอายุ 16-40 ใช้วินิจฉัยได้",
        ix: ["US, MRI", "Genetic testing (PKD1, PKD2 และ gene อื่นใน panel) เมื่อไม่มี family history, imaging atypical, โรครุนแรงเร็วหรือไม่เข้ากับครอบครัว, ต้องการ prognosis หรือประเมิน living related donor อายุน้อย"],
        std: "Pei-Ravine 2009 unified criteria"
      }),
      N("Rapid progressor and tolvaptan", "nephro", {
        s: "Mayo imaging class 1C-1E, PROPKD score > 6, eGFR decline เร็ว",
        why: "Tolvaptan ชะลอ TKV growth และ eGFR decline ต้องติดตาม LFT",
        ix: ["MRI htTKV, LFT ทุกเดือน 18 เดือนแรก"],
        std: "TEMPO 3:4 (n = 1,445), REPRISE (n = 1,370), KDIGO 2025 ADPKD"
      }),
      N("ADPKD complications", "nephro", {
        s: "Cyst hemorrhage, infection, stone, IA, liver cysts, valvular disease, hernia, diverticulosis",
        ix: ["MRI, PET/CT, MRA screening ตามข้อบ่งชี้"],
        link: "flank"
      })
    ]),
    N("Other inherited cystic disease", "step", {
      s: "Cystic disease ที่ไม่ใช่ ADPKD",
      keys: ["Kidney size", "Extrarenal feature", "Inheritance"]
    }, [
      N("ADTKD (UMOD, MUC1, REN, HNF1B, SEC61A1)", "nephro", {
        s: "CKD ที่ bland sediment, proteinuria น้อย, kidney ขนาดปกติหรือเล็ก",
        why: "UMOD: gout อายุน้อย, REN: anemia และ hyperkalemia, HNF1B: MODY5, hypomagnesemia, genital tract anomaly, pancreatic hypoplasia",
        ix: ["Genetic testing, urate, FEUA, Mg"],
        std: "KDIGO 2015 ADTKD consensus",
        link: "arthralgia"
      }),
      N("Collagen IV nephropathy with renal cysts (Alport spectrum)", "nephro", {
        s: "Cyst หลายใบในไตขนาดปกติ ร่วมกับ glomerular hematuria, proteinuria และ CKD ที่ไม่สัมพันธ์กับ TKV",
        why: "COL4A3, COL4A4, COL4A5 variant มี renal cyst ได้บ่อยกว่าคนทั่วไปและเพิ่มตามอายุ จึงอาจเข้า Pei criteria ทั้งที่ไม่ใช่ ADPKD และ ADPKD กับ collagen IV variant ซ้อนกันได้ การแยกสำคัญต่อ tolvaptan, donor selection และ post-KT anti-GBM",
        keys: ["Hematuria ตั้งแต่เด็กหรือ dysmorphic RBC เด่นกว่าใน ADPKD", "Kidney ไม่โตและ CKD ก้าวหน้าเร็วกว่าที่ TKV ทำนาย", "Sensorineural hearing loss, lenticonus, dot-and-fleck retinopathy, family history hematuria", "Gross hematuria กับ flank pain เป็นๆหายๆ ทำให้หลงว่าเป็น cyst hemorrhage"],
        ix: ["Gene panel ที่รวม PKD1, PKD2, COL4A3-5, HNF1B, UMOD, MUC1", "Biopsy ถ้ายังไม่ชัด: GBM thinning หรือ lamellation, collagen IV alpha chain staining", "Audiometry, slit lamp"],
        std: "Savige 2022 Alport genetic testing guideline, Pei 2009 ultrasound criteria (ใช้เมื่อรู้ว่ามี ADPKD ในครอบครัว)",
        link: "hematuria"
      }),
      N("Tuberous sclerosis complex", "nephro", {
        s: "Cysts และ AML หลายจุด, angiofibroma, seizure",
        why: "TSC2/PKD1 contiguous gene deletion ทำให้ severe early polycystic disease",
        ix: ["MRI, TSC1, TSC2"],
        std: "International TSC consensus 2021",
        link: "flank"
      }),
      N("Von Hippel-Lindau disease", "nephro", {
        s: "Cysts กับ clear cell RCC หลายจุด, pheochromocytoma",
        ix: ["VHL testing, MRI surveillance"],
        link: "paroxysm"
      }),
      N("Nephronophthisis / ciliopathy", "nephro", {
        s: "Polyuria, CKD ในเด็กหรือวัยรุ่น, corticomedullary cysts",
        ix: ["NPHP genetic panel"],
        link: "shortstature"
      }),
      N("ARPKD / OFD1 / glomerulocystic", "nephro", {
        s: "Enlarged echogenic kidneys ในเด็ก กับ hepatic fibrosis",
        ix: ["PKHD1, OFD1 genetic testing"]
      })
    ]),
    N("Acquired cystic disease", "step", {
      s: "Cyst ที่เกิดภายหลัง และกลุ่ม developmental ที่ไม่ถ่ายทอดทางพันธุกรรม (medullary sponge kidney, multicystic dysplastic kidney)",
      keys: ["Dialysis", "Drug", "Developmental, non-inherited"]
    }, [
      N("Acquired cystic kidney disease of dialysis", "nephro", {
        s: "Cyst ≥ 3-4 ต่อข้างในไตที่เล็ก พบมากขึ้นตาม dialysis vintage แต่เริ่มได้ตั้งแต่ CKD ระยะท้ายก่อน dialysis และ native kidney หลัง KT ยังมี risk",
        why: "RCC risk เพิ่มหลายเท่า (ACKD-associated RCC)",
        ix: ["US หรือ CT surveillance ตาม vintage"]
      }),
      N("Lithium-induced microcysts", "nephro", {
        s: "Microcysts 1-2 mm ทั่วไต ใน lithium ระยะยาว",
        ix: ["MRI T2"],
        link: "thirst"
      }),
      N("Medullary sponge kidney", "nephro", {
        s: "Dilated collecting duct, nephrocalcinosis, stone",
        ix: ["CT urography"],
        link: "stone"
      }),
      N("Localized cystic disease / multicystic dysplastic kidney", "adj", {
        s: "Unilateral, ไม่มี family history",
        ix: ["MRI"]
      })
    ])
  ])
};

/* ===================== ABNORMAL KIDNEY SIZE / ASYMMETRY ===================== */
TREES.kidneysize = {
  must: [
    "ขนาดไตเดิมย้อนหลัง, ความยาวสองข้าง (ปกติราว 10-12 cm)",
    "HTN เริ่มอายุน้อยหรือ > 55 ปี, resistant HTN, flash pulmonary edema",
    "Cr ขึ้น > 30% หลังเริ่ม ACEi หรือ ARB",
    "UTI ในวัยเด็ก, reflux, ผ่าตัดทางเดินปัสสาวะ",
    "DM, HIV, amyloid features, lymphoma",
    "Flank pain, hematuria (RVT, obstruction)",
    "Atherosclerosis, smoking, PAD",
    "Family history ของ cystic disease"
  ],
  tree: N("Abnormal kidney size and asymmetry", "root", {
    s: "แยก bilateral small, bilateral large และ asymmetric (> 1.5 cm) แล้วจับคู่กับ clinical context",
    why: "ขนาดไตบอก chronicity และชี้ไปที่ renovascular disease, reflux nephropathy, infiltrative disease หรือ obstruction",
    keys: ["Bilateral small echogenic: chronic kidney disease (ยกเว้นกลุ่มที่ไตไม่เล็กแม้ CKD)", "Large kidneys กับ CKD: DM, HIVAN, amyloid, ADPKD, infiltration", "Asymmetry > 1.5 cm: RAS, reflux, unilateral hypoplasia"],
    ix: ["Kidney US with Doppler (resistive index)", "CTA หรือ MRA, renal scintigraphy (DMSA, MAG3)", "UA, UPCR, Cr"],
    std: "AHA 2022 renovascular disease scientific statement"
  }, [
    N("Bilateral small kidneys", "step", {
      s: "CKD ระยะยาว",
      keys: ["Cortical thinning", "Echogenic"]
    }, [
      N("Chronic glomerular or hypertensive disease", "nephro", {
        s: "Symmetric small kidneys",
        why: "ไตเล็ก (ราว < 8-9 cm) และ cortex บาง biopsy มักไม่เปลี่ยนการรักษาและ bleeding risk สูงขึ้น แต่เป็น relative contraindication ไม่ใช่ข้อห้ามเด็ดขาด ถ้าขนาดยังพอและมี active sediment, AKI ซ้อน หรือสงสัยโรคที่รักษาได้ ให้ชั่งเป็นรายไป",
        ix: ["US, history"],
        link: "risingcr"
      }),
      N("Bilateral atherosclerotic renal artery stenosis", "nephro", {
        s: "Ischemic nephropathy, flash pulmonary edema",
        ix: ["Duplex"],
        std: "ASTRAL (n = 806), CORAL (n = 947)",
        link: "dyspnea"
      }),
      N("Chronic TIN / reflux nephropathy bilateral / NPHP", "nephro", {
        s: "Irregular contour, cortical scar",
        ix: ["DMSA scan"],
        link: "pyuria"
      })
    ]),
    N("Bilateral large kidneys", "step", {
      s: "Kidney ใหญ่ทั้งสองข้าง",
      keys: ["Infiltration", "Cystic", "Acute inflammation"]
    }, [
      N("Diabetic kidney disease (early)", "nephro", {
        s: "Hyperfiltration กับ kidney hypertrophy",
        ix: ["UACR"],
        link: "nephrotic"
      }),
      N("HIVAN / amyloidosis", "nephro", {
        s: "Large echogenic kidneys กับ heavy proteinuria",
        ix: ["HIV, sFLC, biopsy"],
        link: "nephrotic"
      }),
      N("ADPKD / ARPKD / TSC", "nephro", {
        s: "Cystic enlargement",
        ix: ["MRI"],
        link: "cysts"
      }),
      N("Lymphoma or leukemic infiltration", "nephro", {
        s: "Bilateral nephromegaly กับ AKI",
        ix: ["CT, biopsy"],
        link: "lymphnode"
      }),
      N("Acute GN, AIN, bilateral RVT, acromegaly", "nephro", {
        s: "Edematous enlargement",
        ix: ["UA, Doppler, IGF-1"],
        link: "rpgn"
      })
    ]),
    N("Asymmetric kidneys", "step", {
      s: "Length difference > 1.5 cm",
      keys: ["Small side", "Large side"]
    }, [
      N("Renal artery stenosis: atherosclerotic or FMD", "nephro", {
        s: "Small kidney ข้างที่ stenosis",
        why: "FMD ในหญิงอายุน้อยตอบสนองต่อ angioplasty ดี ต่างจาก atherosclerotic RAS",
        keys: ["String of beads ใน FMD", "Duplex PSV > 200 cm/s, RAR > 3.5"],
        ix: ["Duplex, CTA, MRA"],
        std: "International FMD consensus 2019",
        link: "htn-young"
      }),
      N("Reflux nephropathy / chronic pyelonephritis", "nephro", {
        s: "Unilateral small scarred kidney, proteinuria, HTN",
        ix: ["DMSA, VCUG"],
        link: "stone"
      }),
      N("Congenital hypoplasia / dysplasia / solitary kidney", "nephro", {
        s: "Compensatory hypertrophy ของข้างตรงข้าม",
        why: "Reduced nephron mass ทำให้ maladaptive FSGS",
        ix: ["US, DMSA"],
        link: "proteinuria"
      }),
      N("Unilateral large: obstruction, RVT, tumor, duplex system", "nephro", {
        s: "Acute enlargement ข้างเดียว",
        ix: ["US, Doppler, CT"],
        link: "flank"
      })
    ])
  ])
};

/* ===================== LOWER URINARY TRACT SYMPTOMS ===================== */
TREES.luts = {
  must: [
    "Storage (frequency, urgency, nocturia) vs voiding (hesitancy, weak stream, straining, incomplete emptying)",
    "Dysuria, hematuria, ไข้",
    "DM, stroke, spinal disease, MS (neurogenic)",
    "ยา: anticholinergic, opioid, decongestant, diuretic, SGLT2i",
    "Smoking, cyclophosphamide, pelvic radiation (bladder cancer)",
    "KT: native bladder function ก่อนปลูกถ่าย, ureteric stent",
    "HSCT, BK virus",
    "Sexual history, ประวัติ urethral instrumentation"
  ],
  tree: N("Lower urinary tract symptoms", "root", {
    s: "แยก storage กับ voiding symptoms วัด PVR แล้วหา obstruction, neurogenic bladder, infection และ malignancy",
    why: "LUTS ทำให้ obstructive uropathy และ CKD, recurrent UTI และเป็นปัญหาสำคัญก่อนและหลัง KT",
    keys: ["PVR > 200-300 mL ผิดปกติ", "Hydronephrosis ทั้งสองข้าง", "Hematuria ต้อง workup malignancy"],
    ix: ["UA, urine culture", "Bladder scan PVR, uroflowmetry, IPSS", "Kidney และ bladder US", "PSA, cystoscopy, urodynamics ตามข้อบ่งชี้"],
    std: "AUA 2021 BPH guideline (IPSS)"
  }, [
    N("Bladder outlet obstruction", "step", {
      s: "Voiding symptoms, PVR สูง",
      keys: ["Male", "Stricture"]
    }, [
      N("Benign prostatic hyperplasia", "nephro", {
        s: "ชายสูงอายุ, weak stream, nocturia",
        why: "Chronic retention ทำให้ obstructive CKD และ hydronephrosis",
        ix: ["PSA, US prostate, PVR"],
        std: "AUA 2021 BPH",
        link: "oliguria"
      }),
      N("Urethral stricture / meatal stenosis", "adj", {
        s: "Instrumentation, STI, trauma",
        ix: ["Uroflowmetry, urethrogram"]
      }),
      N("Drug-induced retention", "nephro", {
        s: "Alpha-agonist (decongestant) เพิ่ม outlet resistance, anticholinergic และ opioid ลด detrusor contractility ทำให้ retention โดยเฉพาะในผู้ที่มี BPH เดิม",
        ix: ["Drug review"]
      })
    ]),
    N("Neurogenic bladder", "step", {
      s: "Neurologic disease กับ bladder dysfunction",
      keys: ["DM", "Spinal", "MS"]
    }, [
      N("Diabetic cystopathy", "nephro", {
        s: "Reduced sensation, large capacity, high PVR",
        why: "Recurrent UTI และ obstructive uropathy ใน DM",
        ix: ["PVR, urodynamics"],
        link: "numbness"
      }),
      N("Spinal cord injury / myelomeningocele / MS", "nephro", {
        s: "Detrusor-sphincter dyssynergia, high bladder pressure",
        why: "สาเหตุ CKD ที่ป้องกันได้ด้วย clean intermittent catheterization",
        ix: ["Urodynamics, US"]
      })
    ]),
    N("Infection / inflammation", "step", {
      s: "Dysuria กับ pyuria",
      keys: ["Culture", "Sterile pyuria"]
    }, [
      N("Bacterial cystitis / prostatitis", "adj", {
        s: "Dysuria, frequency",
        ix: ["Urine culture"],
        link: "stone"
      }),
      N("GU tuberculosis", "nephro", {
        s: "Sterile pyuria, small contracted bladder",
        ix: ["Urine AFB"],
        link: "pyuria"
      }),
      N("Interstitial cystitis / ketamine cystitis", "adj", {
        s: "Bladder pain, frequency",
        why: "Ketamine uropathy ทำให้ contracted bladder และ hydronephrosis",
        ix: ["Cystoscopy, drug history"]
      })
    ]),
    N("Hemorrhagic cystitis and malignancy", "step", {
      s: "LUTS กับ hematuria",
      keys: ["Smoking", "Cyclophosphamide", "Immunosuppression"]
    }, [
      N("Bladder cancer", "nephro", {
        s: "Hematuria, irritative symptoms",
        why: "Cyclophosphamide และ aristolochic acid เพิ่ม risk",
        ix: ["Cystoscopy, cytology"],
        link: "hematuria"
      }),
      N("BK virus hemorrhagic cystitis", "nephro", {
        s: "Hematuria และ dysuria พบหลัง HSCT เป็นหลัก ส่วนใน KT BK virus มักทำ nephropathy มากกว่า hemorrhagic cystitis",
        ix: ["Urine และ plasma BK PCR"],
        link: "kt-urine"
      }),
      N("Cyclophosphamide or radiation cystitis", "nephro", {
        s: "Hemorrhagic cystitis หลังได้ยาหรือฉายแสง",
        ix: ["Cystoscopy"]
      })
    ]),
    N("Transplant-specific", "step", {
      s: "สาเหตุที่เพิ่มเข้ามาใน KT โดยสาเหตุทั่วไปทุกกลุ่มข้างต้น (UTI, BPH, neurogenic, malignancy) ยังต้องคิดเหมือนเดิม",
      keys: ["Stent", "Native bladder"]
    }, [
      N("Ureteric stricture / stent / lymphocele", "nephro", {
        s: "Stent ทำ irritative LUTS, lymphocele กด bladder ทำ frequency, ureteric stricture มาด้วย graft hydronephrosis และ Cr ขึ้นมากกว่า LUTS",
        ix: ["Graft US"],
        link: "kt-urine"
      }),
      N("Defunctionalized bladder", "nephro", {
        s: "Small capacity bladder หลัง anuria นาน",
        why: "ต้องประเมินก่อน KT และ bladder จะขยายเองหลังปลูกถ่ายในส่วนใหญ่",
        ix: ["VCUG, urodynamics ก่อน KT"],
        link: "donor"
      })
    ]),
    N("Storage symptoms from polyuria", "step", {
      s: "Frequency จาก urine volume มาก",
      keys: ["24-hour volume > 3 L", "Nocturnal polyuria"]
    }, [
      N("Polyuria / nocturnal polyuria", "nephro", {
        s: "DI, DM, diuretic, edema mobilization, OSA",
        ix: ["Frequency-volume chart"],
        link: "polyuria"
      })
    ])
  ])
};

/* ===================== POLYURIA / NOCTURIA ===================== */
TREES.polyuria = {
  must: [
    "ปริมาณจริงจาก 24-hour collection หรือ frequency-volume chart (polyuria > 3 L/วัน หรือ > 40-50 mL/kg/วัน)",
    "Polyuria จริง vs frequency จาก LUTS, nocturia เฉพาะกลางคืนหรือทั้งวัน",
    "Onset: ทันที (central DI) หรือค่อยๆ, ชอบน้ำเย็น, ตื่นมาดื่มกลางคืน",
    "ยา: lithium, SGLT2i, diuretic, demeclocycline, amphotericin, foscarnet, ifosfamide, cidofovir, mannitol",
    "Glucose, Ca, K ล่าสุด, ประวัติ psychiatric",
    "Head trauma, pituitary surgery, IgG4, sarcoid, histiocytosis, metastasis",
    "เพิ่งแก้ obstruction, recovery phase ของ ATN, หลัง KT",
    "Edema ที่กำลังยุบ, HF, OSA (nocturnal polyuria)"
  ],
  tree: N("Polyuria and nocturia", "root", {
    s: "ยืนยัน polyuria แล้วใช้ urine osmolality และ osmolar excretion แยก water diuresis, solute diuresis และ mixed แล้วจึงแยก central DI, nephrogenic DI และ primary polydipsia",
    why: "Polyuria เป็นทางเข้าของ DI, lithium nephropathy, hypercalcemia, hypokalemic nephropathy, tubulointerstitial disease และ post-obstructive diuresis ซึ่งออกข้อสอบบ่อย",
    keys: ["Urine osmolality < 300 mOsm/kg: water diuresis", "Urine osmolality > 300 และ osmolar excretion > 1,000 mOsm/วัน: solute diuresis (osmolar excretion = urine osm x volume)", "Urine osm 300-600 กับ volume สูง: mixed หรือ partial DI", "Serum Na สูงปกติชี้ DI, ต่ำปกติชี้ primary polydipsia"],
    ix: ["24-hour urine volume, osmolality, Na, K, urea, glucose", "Serum Na, osmolality, glucose, Ca, K, urea, Cr", "Hypertonic saline-stimulated copeptin หรือ water deprivation test with desmopressin", "MRI pituitary ถ้าเป็น central DI"],
    std: "Fenske NEJM 2018 (hypertonic saline copeptin), Refardt NEJM 2023 (hypertonic saline ดีกว่า arginine), 2022 consensus เปลี่ยนชื่อเป็น AVP deficiency และ AVP resistance"
  }, [
    N("Solute (osmotic) diuresis", "step", {
      s: "Urine osm > 300, osmolar excretion > 1,000 mOsm/วัน",
      why: "แยกด้วยชนิดของ solute ที่ออกมาในปัสสาวะ",
      keys: ["Glucose", "Urea", "Na และ Cl"]
    }, [
      N("Glucose diuresis", "nephro", {
        s: "Uncontrolled DM หรือ SGLT2 inhibitor",
        why: "SGLT2i ทำให้ glucose ออกราว 60-80 g/วัน ขณะ glucose ปกติ, Fanconi ทำให้ glycosuria แต่ไม่ค่อย polyuria มาก",
        ix: ["Blood glucose, urine glucose"],
        link: "thirst"
      }),
      N("Urea diuresis", "nephro", {
        s: "Recovery phase ของ ATN, post-obstructive, high-protein tube feeding, catabolic state, steroid",
        why: "Urea diuresis ทำให้ hypernatremia ใน ICU ที่ได้ high-protein feeding",
        ix: ["Urine urea x volume (> 500-600 mmol/วัน), BUN"],
        link: "hyperna"
      }),
      N("Saline diuresis", "nephro", {
        s: "Large-volume saline, mobilization ของ edema, diuretic, salt-wasting nephropathy",
        why: "Salt-wasting พบใน tubulointerstitial disease, cisplatin, cerebral salt wasting และ post-obstructive",
        ix: ["Urine Na x volume, volume status"],
        link: "syncope"
      }),
      N("Mannitol / contrast / IVIG", "adj", {
        s: "Exogenous osmole",
        ix: ["Osmolal gap, drug history"]
      })
    ]),
    N("Water diuresis: AVP deficiency (central DI)", "step", {
      s: "Hypotonic polyuria กับ copeptin ต่ำ ตอบสนองต่อ desmopressin จาก AVP ที่สร้างหรือหลั่งไม่พอ (central) หรือถูกทำลายเร็ว (gestational)",
      keys: ["Sudden onset", "Stimulated copeptin ≤ 4.9 pmol/L หลัง hypertonic saline"]
    }, [
      N("Post-surgical / traumatic central DI", "nephro", {
        s: "หลัง pituitary surgery หรือ head trauma",
        why: "Triphasic response: DI, SIADH แล้ว permanent DI",
        ix: ["Na ทุก 6-12 ชั่วโมง, urine osm"],
        link: "hyperna"
      }),
      N("Infiltrative / inflammatory: IgG4, sarcoid, LCH, lymphocytic hypophysitis, ICI", "nephro", {
        s: "Central DI กับ systemic disease",
        why: "IgG4-RD และ sarcoid มี kidney involvement ร่วม (TIN, hypercalcemia)",
        ix: ["MRI pituitary stalk thickening, IgG4, Ca, ACE"],
        link: "sicca"
      }),
      N("Neoplastic: craniopharyngioma, germinoma, metastasis", "adj", {
        s: "Central DI กับ mass",
        ix: ["MRI, beta-hCG และ AFP ใน CSF"]
      }),
      N("Idiopathic / familial (AVP gene)", "adj", {
        s: "Central DI โดยไม่มี lesion",
        ix: ["MRI ซ้ำ, genetic testing"]
      }),
      N("Gestational DI", "nephro", {
        s: "AVP ถูก placental vasopressinase ทำลายในไตรมาสที่ 3 (เป็น AVP deficiency แบบ peripheral ไม่ใช่ pituitary lesion และไม่ใช่ AVP resistance) พบมากขึ้นใน twin pregnancy, preeclampsia, HELLP และ acute fatty liver",
        why: "Desmopressin ไม่ถูก vasopressinase ทำลาย จึงรักษาได้ และหายเองหลังคลอดภายในไม่กี่สัปดาห์",
        ix: ["Urine osm, ตอบสนองต่อ desmopressin, LFT"],
        link: "pregnancy"
      })
    ]),
    N("Water diuresis: AVP resistance (nephrogenic DI)", "step", {
      s: "Hypotonic polyuria, baseline copeptin สูง (> 21.4 pmol/L) และไม่ตอบสนองต่อ desmopressin",
      why: "Acquired NDI พบบ่อยกว่า congenital มากในผู้ใหญ่",
      keys: ["Drug", "Electrolyte", "Tubulointerstitial disease"]
    }, [
      N("Lithium-induced NDI", "nephro", {
        s: "Polyuria ใน lithium ระยะยาว",
        why: "Lithium เข้า principal cell ทาง ENaC ลด aquaporin-2, amiloride ช่วยลด polyuria, ต่อเนื่องเป็น chronic TIN กับ microcysts",
        keys: ["NDI อาจคงอยู่หลังหยุดยา", "Hypercalcemia จาก lithium-associated hyperparathyroidism"],
        ix: ["Lithium level, urine osm, Ca, PTH, MRI microcysts"],
        link: "tremor"
      }),
      N("Hypercalcemia", "nephro", {
        s: "Ca > 11 mg/dL ทำให้ concentrating defect",
        why: "CaSR ใน TAL ลด NaCl reabsorption และลด AQP2",
        ix: ["Ca, PTH, PTHrP, 1,25D"],
        link: "hyperca"
      }),
      N("Hypokalemia", "nephro", {
        s: "Chronic hypokalemia ลด AQP2 และกระตุ้น thirst",
        why: "Hypokalemic nephropathy ทำให้ vacuolization ของ proximal tubule และ cyst",
        ix: ["K, urine K"],
        link: "hypok"
      }),
      N("Tubulointerstitial disease", "nephro", {
        s: "Sickle cell nephropathy, Sjogren, amyloid, obstruction, ADPKD, chronic TIN, nephronophthisis",
        why: "Medullary damage ทำให้ concentrating defect ก่อน GFR ลด",
        ix: ["Urine beta-2 microglobulin, imaging"],
        link: "pyuria"
      }),
      N("Drug-induced: demeclocycline, amphotericin, foscarnet, ifosfamide, cidofovir, tolvaptan", "nephro", {
        s: "Drug ที่ทำ NDI",
        why: "Tolvaptan ใน ADPKD ทำ aquaresis ราว 5-6 L/วันเป็น expected effect",
        ix: ["Drug review"],
        link: "cysts"
      }),
      N("Congenital NDI (AVPR2, AQP2)", "nephro", {
        s: "Polyuria ตั้งแต่เกิด, hypernatremic dehydration, growth failure",
        why: "AVPR2 X-linked พบในชาย, ในผู้ใหญ่ทำให้ megacystis และ hydronephrosis",
        ix: ["AVPR2, AQP2 genetic testing"],
        link: "shortstature"
      })
    ]),
    N("Water diuresis: primary polydipsia", "step", {
      s: "Hypotonic polyuria, serum Na ต่ำปกติ, stimulated copeptin > 4.9 pmol/L",
      keys: ["Psychiatric", "Habit", "Dry mouth"]
    }, [
      N("Psychogenic polydipsia", "nephro", {
        s: "Schizophrenia, antipsychotic ที่ทำปากแห้ง",
        why: "Hyponatremia เมื่อ intake เกิน excretion capacity",
        ix: ["Serum Na, urine osm"],
        link: "hypona"
      }),
      N("Dipsogenic / habitual polydipsia", "adj", {
        s: "Thirst center lesion หรือดื่มน้ำมากเพราะเชื่อว่าดีต่อสุขภาพ",
        why: "Medullary washout ทำให้ water deprivation test แปลผลยาก",
        ix: ["Hypertonic saline copeptin test"]
      })
    ]),
    N("Nocturia without true polyuria", "step", {
      s: "24-hour volume ปกติ แต่กลางคืนมาก",
      keys: ["Nocturnal volume > 33% ของทั้งวันในผู้สูงอายุ", "Bladder capacity ลด"]
    }, [
      N("Nocturnal polyuria", "nephro", {
        s: "HF, edema mobilization เมื่อนอน, OSA, evening diuretic, CKD (loss of concentrating ability)",
        why: "OSA เพิ่ม ANP ทำให้ natriuresis กลางคืน, CKD ระยะแรกมี nocturia จาก isosthenuria",
        ix: ["Frequency-volume chart, STOP-BANG, NT-proBNP"],
        link: "rls"
      }),
      N("Reduced bladder capacity / LUTS", "nephro", {
        s: "BPH, overactive bladder, cystitis, bladder cancer",
        ix: ["PVR, UA"],
        link: "luts"
      })
    ]),
    N("Post-obstructive and recovery diuresis", "step", {
      s: "Polyuria หลังแก้ obstruction หรือช่วงไตฟื้นจาก ATN หรือหลัง KT",
      why: "ต้องแยก physiologic diuresis (ขับน้ำที่คั่ง) กับ pathologic (salt และ concentrating defect)",
      keys: ["Urine > 200 mL/h นาน > 2 ชั่วโมง", "Volume status"]
    }, [
      N("Post-obstructive diuresis", "nephro", {
        s: "หลังใส่ catheter หรือ nephrostomy",
        why: "เสี่ยง hypovolemia, hypokalemia, hypomagnesemia, dysnatremia ถ้าให้ fluid ตามทุก mL จะทำให้ diuresis ยืดออกไป",
        ix: ["Hourly urine, electrolyte ทุก 6-12 ชั่วโมง, urine Na และ osm"],
        link: "oliguria"
      }),
      N("Recovery phase of ATN / post-transplant diuresis", "nephro", {
        s: "Polyuria ในช่วง graft ทำงานทันทีหลัง KT หรือ ATN กำลังหาย",
        why: "Solute diuresis จาก urea ที่คั่งกับ concentrating defect ชั่วคราว",
        ix: ["Urine output, electrolyte, Cr trend"],
        link: "kt-immediate"
      })
    ])
  ])
};
