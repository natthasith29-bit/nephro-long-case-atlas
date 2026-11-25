/* Phase 6 Additional renal syndrome trees (Nov 2026): hypocomplementemia, febrile AKI,
   proximal tubulopathy, hydronephrosis. Same node schema as data/p1.js (N helper and window.TREES come from p1.js). */

/* ===================== HYPOCOMP ===================== */
TREES["hypocomp"] = {
  must: [
    "เจ็บคอหรือ skin infection ก่อนหน้า และนานเท่าไร (pharyngitis ราว 1-3 สัปดาห์, impetigo ราว 3-6 สัปดาห์)",
    "Infection ที่ยัง active ตอนนี้: endocarditis, abscess, diabetic foot, VA shunt",
    "Valve disease, IVDU, dental procedure, prosthetic material",
    "Purpura, Raynaud, ปวดข้อ, ชาปลายมือเท้า (cryoglobulinemia)",
    "HCV, HBV, HIV risk",
    "อาการ SLE: malar rash, photosensitivity, oral ulcer, serositis, alopecia",
    "ประวัติครอบครัวโรคไต, partial lipodystrophy, ตามัวจาก drusen",
    "อายุ > 50 ปี หรือมี monoclonal gammopathy",
    "Vascular procedure หรือ anticoagulant ล่าสุด, livedo, blue toe",
    "Urticaria เรื้อรัง, angioedema, ติดเชื้อซ้ำ ๆ ตั้งแต่เด็ก"
  ],
  tree: N("Hypocomplementemia with kidney disease", "root", {
    "s": "แยก pattern ก่อน: C3 ต่ำอย่างเดียว (alternative pathway) กับ C3 และ C4 ต่ำ (classical pathway) แล้วตามด้วย time course ว่า C3 กลับปกติภายใน 8 สัปดาห์หรือไม่",
    "why": "Hypocomplementemia ทำให้ DDx ของ GN แคบลงเหลือไม่กี่โรค และ C3 ที่ต่ำค้างเกิน 8-12 สัปดาห์เป็น clue สำคัญที่สุดที่แยก C3G ออกจาก PIGN ส่วน primary MN, IgAN, MCD, FSGS และ AAV มัก complement ปกติ ถ้าต่ำต้องหา secondary cause",
    "keys": [
      "C3 ต่ำ C4 ปกติ: alternative pathway (PIGN, C3G, aHUS)",
      "C3 และ C4 ต่ำ: classical pathway, immune complex (LN, IE, shunt nephritis, IC-MPGN)",
      "C4 ต่ำมากกับ C3 ปกติหรือต่ำเล็กน้อย: cryoglobulinemia",
      "CH50 ต่ำมากหรือ undetectable: inherited deficiency หรือ cryo (in vitro consumption)",
      "Serial C3 ที่ 8-12 สัปดาห์"
    ],
    "ix": [
      "C3, C4, CH50",
      "ANA, anti-dsDNA, anti-Sm, antiphospholipid antibody",
      "ASO, anti-DNase B, blood culture 3 ชุด, echocardiography",
      "Cryoglobulin (เก็บและปั่นที่ 37°C), RF, HCV RNA, HBsAg, HIV",
      "SPEP, serum free light chain, immunofixation",
      "Kidney biopsy with IF: C3 dominant คือ C3 เข้มกว่า immune reactant อื่น (IgG, IgA, IgM, C1q) อย่างน้อย 2 ระดับ"
    ],
    "std": "KDIGO 2021 GN guideline, C3 glomerulopathy consensus report (Pickering, Kidney Int 2013), KDIGO Controversies Conference on aHUS and C3G (Goodship, Kidney Int 2017), C3 glomerulopathy review (Smith, Nat Rev Nephrol 2019)"
  }, [
    N("Low C3, normal C4: alternative pathway", "step", {
      "s": "PIGN, C3G และ complement-mediated TMA",
      "why": "Alternative pathway ถูก activate ต่อเนื่องจาก infection หรือ dysregulation (C3 nephritic factor, factor H หรือ I) ทำให้ C3 ต่ำโดย C4 ปกติ",
      "keys": [
        "C3 กลับปกติภายใน 8-12 สัปดาห์: เข้าได้กับ PIGN",
        "C3 ต่ำค้างเกิน 8-12 สัปดาห์: สงสัย C3G ควร biopsy",
        "MAHA ร่วม: complement-mediated TMA"
      ],
      "ix": [
        "C3 ซ้ำที่ 8-12 สัปดาห์: กลับปกติเข้าได้กับ PIGN, ต่ำค้างให้สงสัย C3G และควร biopsy (C3 ปกติไม่ตัด C3G ออก)",
        "ASO หรือ anti-DNase B บวก สนับสนุน recent streptococcal infection (ไม่ได้ยืนยันว่าเป็นสาเหตุของ GN)",
        "Schistocyte, LDH สูง, platelet ต่ำ = TMA",
        "SPEP และ sFLC ผิดปกติในอายุ > 50 ปี ให้สงสัย MGRS-associated C3G (ต้องแยกจาก MGUS ที่พบร่วมโดยบังเอิญ)",
        "C3NeF, sC5b-9, factor H"
      ]
    }, [
      N("Post-infectious GN / IRGN", "nephro", {
        "s": "Nephritic syndrome หลัง streptococcal pharyngitis หรือ impetigo, C3 ต่ำแล้วกลับปกติภายใน 8 สัปดาห์",
        "why": "เด็กหายเกือบทั้งหมด แต่ผู้ใหญ่ โดยเฉพาะ DM, alcohol และผู้สูงอายุ มักเป็น staphylococcal IRGN ที่เกิดระหว่าง infection ยัง active และ IF อาจเด่น IgA ซึ่งพยากรณ์แย่กว่า",
        "keys": [
          "ASO ดีสำหรับ pharyngitis, anti-DNase B ดีกว่าสำหรับ skin infection",
          "Biopsy: diffuse endocapillary proliferation, starry sky หรือ garland C3, subepithelial hump",
          "Staph IRGN: IF อาจเป็น IgA dominant ต้องแยกจาก IgAN และ C3 ปกติได้ จึงไม่ตัดโรคออก",
          "C3 ไม่กลับใน 8-12 สัปดาห์ ให้คิด C3G ที่ infection เป็นตัว trigger (atypical PIGN)"
        ],
        "ix": [
          "ASO, anti-DNase B, throat และ skin culture",
          "Serial C3 ที่ 8-12 สัปดาห์",
          "Biopsy ถ้า course ไม่ typical"
        ],
        "std": "KDIGO 2021 GN guideline (infection-related GN)",
        "link": "rpgn"
      }),
      N("C3 glomerulopathy (C3GN, DDD)", "nephro", {
        "s": "C3 ต่ำค้าง, biopsy C3 dominant, EM แยก DDD (intramembranous dense deposit) กับ C3GN",
        "why": "เกิดจาก alternative pathway dysregulation (C3 nephritic factor ราวครึ่งหนึ่ง, factor H หรือ I variant) เกิดซ้ำหลัง KT ได้บ่อย ปัจจุบันมี complement inhibitor ที่มีข้อมูล RCT แล้ว",
        "keys": [
          "Partial lipodystrophy และ drusen ชี้ DDD",
          "ผู้ใหญ่ทุกรายควรตรวจ SPEP, sFLC และ immunofixation โดยอายุ ≥ 50 ปีต้องตรวจเสมอเพราะ monoclonal gammopathy พบบ่อย (KDIGO 2021)",
          "Proteinuria หรือ nephrotic ร่วมกับ hematuria"
        ],
        "ix": [
          "C3 nephritic factor, sC5b-9, factor H, factor I, anti-factor H antibody",
          "Genetic testing (CFH, CFI, CD46, C3, CFB, CFHR)",
          "SPEP, sFLC, immunofixation"
        ],
        "std": "KDIGO 2021, APPEAR-C3G (iptacopan, n = 74, UPCR ลด 35.1% เทียบ placebo ที่ 6 เดือน), VALIANT (pegcetacoplan ใน C3G และ primary IC-MPGN, n = 124, UPCR ลด 68% เทียบ placebo ที่ 26 สัปดาห์)",
        "link": "nephrotic"
      }),
      N("C3 glomerulopathy with monoclonal gammopathy", "nephro", {
        "s": "C3G ในผู้ป่วยอายุ > 50 ปีที่มี monoclonal protein จัดเป็น MGRS",
        "why": "Monoclonal Ig ทำหน้าที่เป็น C3 nephritic factor หรือ anti-factor H ได้ การรักษาต้องเป็น clone-directed therapy ไม่ใช่ immunosuppression ทั่วไป และ pronase IF อาจเผย masked monotypic deposit (MGRS-associated C3G)",
        "ix": [
          "SPEP, immunofixation, sFLC",
          "Pronase-digested paraffin IF",
          "Bone marrow biopsy"
        ],
        "std": "IKMG consensus on MGRS (Leung, Nat Rev Nephrol 2019)",
        "link": "mspike"
      }),
      N("Complement-mediated TMA (atypical HUS)", "nephro", {
        "s": "MAHA, thrombocytopenia, AKI โดย ADAMTS13 > 10%",
        "why": "C3 ต่ำได้ในบางราย (ราวหนึ่งในสาม) C3 ปกติไม่ตัด aHUS ออก ต้องตัด secondary TMA ก่อน (malignant HTN, pregnancy, drug, infection)",
        "keys": [
          "ADAMTS13 > 10%",
          "Stx ลบ",
          "Trigger: pregnancy, infection, surgery"
        ],
        "ix": [
          "Smear schistocyte, LDH, haptoglobin, ADAMTS13",
          "Complement genetics, anti-factor H"
        ],
        "std": "KDIGO Controversies Conference on aHUS and C3G (Goodship, Kidney Int 2017)",
        "link": "tma"
      })
    ]),
    N("Low C3 and low C4: classical pathway, immune complex", "step", {
      "s": "LN, cryoglobulinemia, IE-associated GN, shunt nephritis และ IC-MPGN",
      "why": "Immune complex activate classical pathway จึงใช้ C4 ด้วย ถ้า C4 ต่ำต้องหา SLE, infection เรื้อรัง และ cryoglobulin เป็นอันดับแรก",
      "keys": [
        "Anti-dsDNA สูงขึ้นพร้อม C3 C4 ต่ำ: LN flare",
        "RF บวกกับ C4 ต่ำมาก: cryo",
        "Infection active: IE หรือ shunt"
      ],
      "ix": [
        "Anti-dsDNA, anti-Sm บวก สนับสนุน SLE (LN ยืนยันด้วย urine sediment, proteinuria และ biopsy)",
        "RF บวกกับ C4 ต่ำมาก ชี้ cryoglobulinemia ยืนยันด้วย cryoglobulin หรือ cryocrit (ผลลบปลอมได้ถ้าเก็บไม่ถึง 37°C ควรตรวจซ้ำ)",
        "Blood culture บวก ชี้ IE หรือ shunt infection (culture ลบไม่ตัด IE ออก)",
        "PR3-ANCA บวกได้ใน IE จึงต้องแยกด้วย blood culture และ echocardiography ก่อนให้ immunosuppression",
        "HCV RNA หรือ HBsAg บวก ให้สงสัย IC-MPGN จาก infection"
      ]
    }, [
      N("Lupus nephritis", "nephro", {
        "s": "C3 และ C4 ต่ำร่วมกับ anti-dsDNA บวก ขึ้นลงตาม activity",
        "why": "Complement ต่ำเป็นทั้ง classification criterion และ marker ของ flare, biopsy full house IF กับ C1q เข้ม",
        "keys": [
          "EULAR/ACR 2019: C3 หรือ C4 ต่ำ 3 คะแนน, ต่ำทั้งคู่ 4 คะแนน",
          "Anti-C1q สัมพันธ์กับ LN activity",
          "Class V อาจ complement ปกติ"
        ],
        "ix": [
          "ANA, anti-dsDNA, anti-Sm, aPL, UPCR",
          "Biopsy: ISN/RPS 2018 class, activity และ chronicity index"
        ],
        "std": "EULAR/ACR 2019 SLE classification criteria, KDIGO 2024 LN guideline",
        "link": "rpgn"
      }),
      N("Cryoglobulinemic GN", "nephro", {
        "s": "C4 ต่ำมาก, C3 ปกติหรือต่ำเล็กน้อย, RF บวก, purpura, arthralgia, neuropathy",
        "why": "Mixed cryo (type II และ III) ส่วนใหญ่สัมพันธ์กับ HCV ที่เหลือคือ Sjogren, B-cell lymphoma และ HBV, biopsy เป็น MPGN กับ intraluminal hyaline thrombi",
        "keys": [
          "Cryocrit, เก็บเลือดที่ 37°C ไม่เช่นนั้นผลลบปลอม",
          "CH50 ต่ำมากจาก in vitro consumption",
          "Type I (monoclonal) สัมพันธ์กับ myeloma, WM"
        ],
        "ix": [
          "Cryoglobulin with immunofixation, RF",
          "HCV RNA, HBsAg, anti-Ro, SPEP"
        ],
        "std": "De Vita 2011 classification criteria for cryoglobulinemic vasculitis, KDIGO 2021 GN guideline",
        "link": "rash"
      }),
      N("Infective endocarditis-associated GN", "nephro", {
        "s": "Fever, murmur, AKI กับ hematuria และ complement ต่ำ, S. aureus เป็นเชื้อหลักในปัจจุบัน",
        "why": "ANCA บวกได้ราวหนึ่งในห้า (มักเป็น PR3) ทำให้ถูกวินิจฉัยผิดเป็น AAV และให้ immunosuppression ซึ่งอันตราย การรักษาหลักคือ antibiotic และ source control",
        "keys": [
          "Blood culture ก่อนให้ steroid ทุกราย",
          "Biopsy: crescentic หรือ endocapillary GN, C3 dominant",
          "ต้องแยกจาก septic emboli และ drug AIN"
        ],
        "ix": [
          "Blood culture 3 ชุด",
          "TTE ตามด้วย TEE",
          "PR3, MPO"
        ],
        "std": "Duke-ISCVID 2023 endocarditis criteria",
        "link": "fever"
      }),
      N("Shunt nephritis (ventriculoatrial shunt infection)", "nephro", {
        "s": "Low-grade fever, nephritic หรือ nephrotic syndrome ในผู้มี VA shunt, เชื้อ S. epidermidis หรือ Cutibacterium",
        "why": "Infection เรื้อรังที่ความรุนแรงต่ำทำให้เกิด IC-MPGN ที่หายได้หลังถอด shunt และให้ antibiotic ต้องถามประวัติ hydrocephalus เสมอ",
        "ix": [
          "Blood และ shunt fluid culture",
          "Biopsy: MPGN pattern"
        ],
        "link": "fever"
      }),
      N("Immune complex MPGN (IC-MPGN)", "nephro", {
        "s": "MPGN pattern ที่ IF มี Ig และ C3 ต้องหาสาเหตุ: infection (HCV, HBV, chronic bacterial), autoimmune, monoclonal Ig",
        "why": "KDIGO 2021 ถือ IC-MPGN เป็น pattern ไม่ใช่ disease ต้องหาสาเหตุก่อนเรียก idiopathic เสมอ PGNMID และ fibrillary GN อยู่ในกลุ่มนี้และมี complement ต่ำได้",
        "keys": [
          "Monotypic IgG3 kappa ใน PGNMID (monoclonal ใน serum พบไม่ถึงหนึ่งในสาม)",
          "DNAJB9 บวกใน fibrillary GN"
        ],
        "ix": [
          "HCV, HBV, HIV, SPEP, sFLC, ANA",
          "Biopsy IF with kappa และ lambda, IgG subclass, DNAJB9"
        ],
        "std": "KDIGO 2021 GN guideline (MPGN chapter)",
        "link": "nephrotic"
      })
    ]),
    N("Very low CH50: inherited or acquired deficiency", "step", {
      "s": "CH50 ต่ำมากกับ component เดี่ยวที่ไม่ตรวจพบ",
      "why": "Early classical component deficiency ทำให้ clearance ของ immune complex และ apoptotic cell เสีย จึงเป็น SLE-like disease ที่ ANA และ anti-dsDNA อาจไม่สูง",
      "keys": [
        "เริ่มอายุน้อย, ครอบครัวเป็น",
        "ติดเชื้อ encapsulated organism ซ้ำ"
      ],
      "ix": [
        "CH50 undetectable กับ C3 ปกติ ชี้ inherited component deficiency (early classical C1q, C2, C4 หรือ terminal C5-C9)",
        "Individual component C1q, C2, C4",
        "Anti-C1q บวกกับ C1q ต่ำ เข้าได้กับ HUVS (anti-C1q พบใน LN ได้เช่นกัน)"
      ]
    }, [
      N("Hereditary C1q, C2 or C4 deficiency with SLE-like disease", "nephro", {
        "s": "C1q deficiency เป็น SLE เกือบทุกราย, C4 deficiency ราวสามในสี่, C2 deficiency เป็น SLE น้อยกว่ามาก (ราว 10-20%) แม้เป็น deficiency ที่พบบ่อยที่สุดในกลุ่มนี้",
        "why": "เป็นสาเหตุที่หาได้ยากแต่ examiner ชอบถาม เพราะ C1q ต่ำในบริบทนี้ไม่ใช่จาก consumption",
        "ix": [
          "C1q, C2, C4 level และ functional assay",
          "Genetic testing"
        ],
        "link": "rash"
      }),
      N("Hypocomplementemic urticarial vasculitis (HUVS)", "nephro", {
        "s": "Urticaria นานกว่า 24 ชั่วโมงต่อรอยและเรื้อรัง, angioedema, uveitis, COPD กับ C1q ต่ำและ anti-C1q บวก",
        "why": "ไตเกี่ยวข้องได้เป็น MPGN หรือ LN-like GN และ overlap กับ SLE ได้มาก",
        "ix": [
          "C1q, anti-C1q, skin biopsy (leukocytoclastic vasculitis)"
        ],
        "link": "rash"
      })
    ]),
    N("Other causes and mimics", "step", {
      "s": "Complement ต่ำจาก consumption นอกไตหรือ synthesis ลดลง",
      "why": "ป้องกันการ over-interpret C3 ต่ำในผู้ป่วยที่ป่วยหนักหรือเป็นโรคตับ",
      "ix": [
        "Eosinophilia กับ C3 ต่ำหลัง vascular procedure ชี้ atheroembolic (พบเพียงบางราย และ AIN ก็มี eosinophilia ได้)",
        "Albumin ต่ำ, INR สูง = synthetic failure"
      ]
    }, [
      N("Atheroembolic disease (cholesterol emboli)", "nephro", {
        "s": "AKI แบบ stepwise หลัง vascular procedure หรือ anticoagulant, livedo, blue toe, eosinophilia",
        "why": "Cholesterol crystal activate complement จึงพบ C3 ต่ำและ eosinophilia ได้ในบางราย ทำให้ดูคล้าย GN หรือ AIN",
        "ix": [
          "Fundoscopy (Hollenhorst plaque), eosinophil count",
          "Skin หรือ kidney biopsy: biconvex cholesterol cleft"
        ],
        "link": "bluetoe"
      }),
      N("Sepsis, liver failure and malnutrition", "adj", {
        "s": "C3 และ C4 ต่ำจาก consumption หรือ hepatic synthesis ลดลง",
        "why": "Cirrhosis ทำให้ complement ต่ำได้เองโดยไม่มี GN จึงต้องตีความร่วมกับ sediment และ serial level",
        "ix": [
          "C3 และ C4 ต่ำทั้งคู่โดย sediment ไม่ active",
          "Albumin ต่ำ, INR และ bilirubin สูงตามโรคตับ",
          "CH50 ต่ำตามสัดส่วน ไม่ถึงกับ undetectable"
        ],
        "link": "jaundice"
      })
    ])
  ])
};

/* ===================== FEBRILEAKI ===================== */
TREES["febrileaki"] = {
  must: [
    "ไข้มากี่วัน และ AKI เกิดวันที่เท่าไรของไข้ (dengue critical phase ราววันที่ 3-7)",
    "Exposure: ลุยน้ำท่วม ทำนา หนู (leptospirosis), ดินและน้ำช่วงฤดูฝน (melioidosis), เดินป่า (scrub typhus, malaria), ชายแดนหรือป่าเขา (malaria)",
    "DM, alcohol, CKD, thalassemia, steroid (risk melioidosis และ sepsis)",
    "ปวดน่อง, ตาแดงแบบ conjunctival suffusion, ตัวเหลือง, ไอเป็นเลือด",
    "ผื่น, petechiae, eschar ที่ขาหนีบ รักแร้ ใต้ราวนม",
    "ปัสสาวะสีโคล่าหรือสีดำ, ปัสสาวะน้อยหรือมาก",
    "ยา: NSAID, aminoglycoside, colistin, vancomycin กับ piperacillin-tazobactam, acyclovir, สมุนไพร",
    "G6PD deficiency, ยาที่ได้ก่อน hemolysis (primaquine, dapsone)",
    "เจ็บคอ 1-3 สัปดาห์ก่อน หรือ skin infection 3-6 สัปดาห์ก่อน, อาการ SLE หรือ vasculitis",
    "ออกกำลังหนักกลางแดด (heat stroke)"
  ],
  tree: N("Acute febrile illness with AKI", "root", {
    "s": "ตอบสามคำถาม: AKI มาจาก sepsis และ hemodynamic หรือจากเชื้อเข้าทำลายไตโดยตรง, มี clue ของ tropical infection โรคใด, และเป็น non-infectious mimic ที่มาด้วยไข้หรือไม่ (vasculitis, SLE, TMA, drug, HLH)",
    "why": "ไข้ร่วมกับ AKI เป็นโจทย์ long case ที่พบบ่อยในบริบทไทย การวินิจฉัยต้องอาศัย exposure history และ pattern ของ organ involvement เพราะ serology มักกลับช้ากว่าเวลาที่ต้องตัดสินใจรักษา จึงต้อง empirical cover ตาม syndrome ก่อน",
    "keys": [
      "Jaundice, AKI และ bleeding: leptospirosis, falciparum malaria, scrub typhus, severe dengue, sepsis",
      "Non-oliguric AKI กับ hypokalemia ชี้ leptospirosis",
      "Eschar ชี้ scrub typhus",
      "Hemoglobinuria ชี้ falciparum malaria หรือ G6PD hemolysis",
      "CK สูงมาก: rhabdomyolysis จาก leptospirosis, influenza, dengue, heat stroke",
      "Thrombocytopenia พบเกือบทุกโรคในกลุ่มนี้ ไม่ช่วยแยก",
      "RBC cast ชี้ GN (IE, IRGN, vasculitis) มากกว่า tropical infection"
    ],
    "ix": [
      "CBC, thick และ thin blood smear หรือ malaria RDT",
      "LFT, CK, LDH, haptoglobin, PT, aPTT",
      "Blood culture (แจ้ง lab ถ้าสงสัย melioidosis), urine culture",
      "Leptospirosis: MAT paired serum, IgM, PCR ในเลือดสัปดาห์แรก",
      "Scrub typhus IgM, PCR จาก eschar หรือ buffy coat",
      "Dengue NS1 (วันที่ 1-5), IgM",
      "UA with microscopy, UPCR",
      "Ultrasound ไตและช่องท้อง (abscess)"
    ],
    "std": "KDIGO 2012 AKI, WHO Guidelines for malaria 2023 (severe malaria: Cr > 3 mg/dL หรือ urea > 20 mmol/L), WHO dengue guideline 2009 และ WHO guidelines for clinical management of arboviral diseases 2025"
  }, [
    N("Sepsis and hemodynamic AKI", "step", {
      "s": "Septic shock, ATN, nephrotoxic antimicrobial, abdominal compartment",
      "why": "สาเหตุที่พบบ่อยที่สุด แต่ต้องไม่หยุดคิดแค่ septic ATN ถ้ามี clue เฉพาะโรค",
      "keys": [
        "Hypotension และ lactate สูง",
        "Muddy brown cast",
        "AKI เกิดหลังเริ่มยา"
      ],
      "ix": [
        "Lactate > 2 mmol/L, procalcitonin สูง",
        "Muddy brown granular cast",
        "Drug level, Mg ต่ำ (aminoglycoside), crystal"
      ]
    }, [
      N("Septic ATN", "nephro", {
        "s": "AKI ในบริบท septic shock, FENa ไม่ช่วยแยกได้ดีใน sepsis",
        "why": "Septic AKI มีกลไกทั้ง microcirculatory dysfunction และ inflammation ไม่ใช่ ischemia อย่างเดียว การให้น้ำเกินทำให้ outcome แย่ลง",
        "ix": [
          "Lactate, urine microscopy",
          "Balanced crystalloid มากกว่า saline (SMART)"
        ],
        "std": "Surviving Sepsis Campaign 2021, KDIGO 2012 AKI",
        "link": "risingcr"
      }),
      N("Melioidosis", "nephro", {
        "s": "Burkholderia pseudomallei, sepsis กับ pneumonia หรือ abscess ที่ตับ ม้าม ต่อมลูกหมาก ในผู้ป่วย DM ช่วงฤดูฝน",
        "why": "เป็น sepsis ที่ mortality สูงในภาคอีสาน เชื้อดื้อ aminoglycoside และ colistin ตามธรรมชาติ ถ้าเพาะเชื้อได้ gram-negative ที่ดื้อ gentamicin ต้องนึกถึงเสมอ",
        "keys": [
          "DM เป็น risk factor หลัก, CKD และ thalassemia ด้วย",
          "Prostatic และ splenic abscess",
          "ต้องปรับขนาด ceftazidime หรือ meropenem ตาม CrCl"
        ],
        "ix": [
          "Blood, urine, sputum, pus culture (Ashdown medium)",
          "Ultrasound ตับ ม้าม ต่อมลูกหมาก"
        ],
        "std": "Darwin melioidosis treatment guideline 2020 (Sullivan, PLoS Negl Trop Dis 2020)",
        "link": "fever"
      }),
      N("Nephrotoxic antimicrobial AKI", "nephro", {
        "s": "Aminoglycoside, colistin, amphotericin B, vancomycin กับ piperacillin-tazobactam, acyclovir crystal",
        "why": "Aminoglycoside ทำ non-oliguric AKI หลังได้ยาราว 5-7 วันร่วมกับ hypomagnesemia, vancomycin กับ piperacillin-tazobactam สัมพันธ์กับ Cr สูงขึ้นบ่อยกว่า vancomycin คู่กับ cefepime หรือ meropenem แต่ส่วนหนึ่งอาจเป็น pseudo-AKI จากการยับยั้ง Cr secretion",
        "keys": [
          "Trough level",
          "Mg และ K wasting",
          "Crystal ใน urine sediment"
        ],
        "ix": [
          "Drug level, Mg, K",
          "Cystatin C ถ้าสงสัย pseudo-AKI"
        ],
        "link": "risingcr"
      })
    ]),
    N("Spirochetal and rickettsial infection", "step", {
      "s": "Leptospirosis และ scrub typhus",
      "why": "รักษาได้ด้วย antibiotic ราคาถูกถ้าคิดถึงเร็ว และ serology กลับช้า จึงควรให้ empirical therapy ตาม syndrome โดย doxycycline ครอบคลุมทั้ง leptospirosis และ scrub typhus ส่วน ceftriaxone ครอบคลุม leptospirosis แต่ไม่ครอบคลุม rickettsia",
      "keys": [
        "Calf pain, conjunctival suffusion",
        "Eschar, lymphadenopathy"
      ],
      "ix": [
        "K ต่ำกับ AKI, CK สูง, bilirubin สูงเด่นกว่า AST/ALT ชี้ leptospirosis",
        "Lepto MAT หรือ PCR",
        "Scrub typhus IgM หรือ PCR จาก eschar",
        "AST/ALT สูงปานกลาง, lymphocytosis เข้าได้กับ rickettsia (ไม่จำเพาะ)"
      ]
    }, [
      N("Leptospirosis", "nephro", {
        "s": "Non-oliguric hypokalemic AKI กับ jaundice (Weil disease), calf pain, conjunctival suffusion, pulmonary hemorrhage",
        "why": "Leptospira ทำลาย proximal tubule โดยตรง ลด NHE3 และเพิ่ม distal K secretion จึงได้ polyuric AKI กับ hypokalemia ซึ่งต่างจาก ATN ทั่วไป Pulmonary hemorrhage เป็นสาเหตุตายหลัก",
        "keys": [
          "Hypokalemia และ FEK สูงตั้งแต่แรก (ไม่พบทุกราย รายรุนแรงเป็น oliguric hyperkalemic AKI ได้)",
          "Bilirubin สูงมากเทียบกับ transaminase ที่สูงไม่มาก",
          "Thrombocytopenia, CK สูง"
        ],
        "ix": [
          "MAT fourfold rise หรือ single titer สูง (พื้นที่ระบาดมักใช้ ≥ 1:400)",
          "Leptospira PCR ในเลือดช่วงสัปดาห์แรก",
          "IgM ELISA หรือ rapid test"
        ],
        "std": "WHO Human leptospirosis guidance 2003, prompt และ daily dialysis สัมพันธ์กับ mortality ที่ต่ำลงใน severe leptospirosis (Andrade, CJASN 2007, การศึกษาขนาดเล็ก n = 33)",
        "link": "jaundice"
      }),
      N("Scrub typhus", "nephro", {
        "s": "Orientia tsutsugamushi, ไข้ ปวดศีรษะ eschar lymphadenopathy, AKI ร่วมกับ ARDS, myocarditis หรือ meningoencephalitis ในรายรุนแรง",
        "why": "AKI เกิดจาก ATN, vasculitis ของ capillary และ rhabdomyolysis ตอบสนองต่อ doxycycline เร็วมาก ถ้าไข้ไม่ลงใน 48 ชั่วโมงหลังให้ยาควรทบทวน diagnosis",
        "keys": [
          "Eschar พบในบริเวณที่ผ้าอับชื้น ต้องตรวจหาทั่วตัว ไม่พบ eschar ไม่ตัดโรคออก",
          "AST ALT สูงปานกลาง",
          "Azithromycin ใช้ในหญิงตั้งครรภ์"
        ],
        "ix": [
          "IgM ELISA หรือ IFA, PCR จาก eschar"
        ],
        "std": "INTREST trial (NEJM 2023, n = 794): IV doxycycline ร่วม azithromycin ลด composite outcome ใน severe scrub typhus เทียบ doxycycline เดี่ยว (33% vs 47%)",
        "link": "fever"
      }),
      N("Murine typhus and spotted fever rickettsiosis", "adj", {
        "s": "ไข้ ผื่น จากหมัดหนูหรือเห็บ, AKI พบน้อยกว่า scrub typhus",
        "ix": [
          "Rickettsia serology"
        ],
        "link": "rash"
      })
    ]),
    N("Parasitic and viral infection", "step", {
      "s": "Malaria, dengue, hantavirus และ viral myositis",
      "why": "แต่ละโรคมี mechanism ของ AKI ต่างกัน: hemoglobinuria และ microvascular obstruction (malaria), plasma leakage และ rhabdomyolysis (dengue), interstitial nephritis (hantavirus)",
      "keys": [
        "Travel และ forest exposure",
        "วันของไข้"
      ],
      "ix": [
        "Smear หรือ RDT บวก (smear ลบครั้งเดียวไม่ตัด malaria ให้ซ้ำทุก 12-24 ชั่วโมง), hyperparasitemia (WHO severe criterion: P. falciparum > 10%, P. knowlesi > 100,000/µL)",
        "Urine dipstick heme บวกโดยไม่มี RBC = hemoglobinuria หรือ myoglobinuria",
        "Hct สูงขึ้น ≥ 20% (plasma leakage), NS1 บวก = dengue (NS1 ลบหลังวันที่ 5 ไม่ตัดออก ให้ใช้ IgM)",
        "CK > 5,000 U/L = rhabdomyolysis ระดับที่เสี่ยง AKI (เกณฑ์วินิจฉัยทั่วไปใช้ CK > 5 เท่าของ ULN)"
      ]
    }, [
      N("Malaria AKI", "nephro", {
        "s": "Severe falciparum หรือ knowlesi malaria, AKI ร่วมกับ jaundice, hemoglobinuria (blackwater fever), acidosis",
        "why": "AKI เป็น independent predictor ของ mortality เกิดจาก ATN จาก cytoadherence และ cell-free hemoglobin, P. knowlesi พบในภาคใต้และชายแดนมาเลเซีย และทำ AKI ได้บ่อยในผู้ใหญ่",
        "keys": [
          "Cr > 3 mg/dL เข้าเกณฑ์ severe malaria",
          "Hemoglobinuria: แยกว่าเป็น blackwater fever จาก malaria เอง หรือเป็น hemolysis จาก primaquine ในผู้ป่วย G6PD deficiency",
          "หลีกเลี่ยง fluid overload เพราะเสี่ยง ARDS"
        ],
        "ix": [
          "Thick และ thin smear, parasitemia, RDT",
          "Hb, LDH, haptoglobin, urine Hb",
          "G6PD"
        ],
        "std": "WHO Guidelines for malaria 2023 (IV artesunate), paracetamol อาจลด kidney injury จาก cell-free Hb ในรายที่มี hemolysis มาก (Plewes, Clin Infect Dis 2018 ใน severe falciparum malaria และ PACKNOW 2022 ใน P. knowlesi malaria, n = 396: primary endpoint คือ creatinine ที่ 72 ชั่วโมงไม่ต่างกัน P = 0.81, ได้ประโยชน์ใน subgroup AKI ที่มี hemolysis, creatinine ลด 34.5% vs 25.9%, P = 0.041) ยังไม่ใช่ standard of care",
        "link": "jaundice"
      }),
      N("Dengue-associated AKI", "nephro", {
        "s": "AKI ในช่วง critical phase จาก shock และ plasma leakage, rhabdomyolysis, hemolysis ใน G6PD deficiency, GN พบน้อย",
        "why": "AKI พบไม่บ่อยแต่เพิ่ม mortality ชัดเจน ต้องระวัง fluid overload ในช่วง recovery phase ที่ plasma กลับเข้าหลอดเลือด",
        "keys": [
          "Hematocrit สูงขึ้นพร้อม platelet ต่ำ",
          "CK สูง",
          "Pleural effusion และ ascites"
        ],
        "ix": [
          "NS1, IgM, Hct ซ้ำ",
          "CK, LFT"
        ],
        "std": "WHO dengue guideline 2009, WHO guidelines for clinical management of arboviral diseases 2025",
        "link": "myalgia"
      }),
      N("Hantavirus (HFRS)", "adj", {
        "s": "ไข้ thrombocytopenia AKI แบบ tubulointerstitial nephritis, พบในยุโรปและเอเชียตะวันออก",
        "why": "ถามประวัติเดินทาง, proteinuria สูงชั่วคราวและ transient myopia เป็น clue",
        "ix": [
          "Hantavirus IgM"
        ],
        "link": "pyuria"
      }),
      N("Influenza and COVID-19 with rhabdomyolysis", "adj", {
        "s": "Viral myositis ทำ CK สูงมากและ pigment AKI",
        "ix": [
          "CK, urine myoglobin"
        ],
        "link": "myalgia"
      })
    ]),
    N("Bacterial infection with kidney-specific lesion", "step", {
      "s": "Pyelonephritis, active infection GN, legionella",
      "why": "ต้องหา lesion ในไตเพราะการรักษาเปลี่ยน เช่น drainage, nephrectomy หรือหยุด immunosuppression",
      "keys": [
        "Flank pain, pyuria",
        "RBC cast ระหว่างที่ยังติดเชื้อ"
      ],
      "ix": [
        "Pyuria, WBC cast ชี้ pyelonephritis และ gas ใน parenchyma บน CT คือ emphysematous pyelonephritis",
        "RBC cast, C3 ต่ำ, blood culture บวก ชี้ IRGN หรือ IE (C3 ปกติและ culture ลบไม่ตัดออก)",
        "Na ต่ำ, CK สูง, urine Legionella antigen บวก ชี้ legionella (antigen ตรวจได้เฉพาะ L. pneumophila serogroup 1 ผลลบจึงไม่ตัดออก)"
      ]
    }, [
      N("Emphysematous pyelonephritis", "nephro", {
        "s": "Pyelonephritis กับ gas ใน parenchyma, DM ควบคุมไม่ได้, E. coli และ Klebsiella",
        "why": "ต้องทำ CT ในผู้ป่วย DM ที่ pyelonephritis ไม่ดีขึ้นใน 48-72 ชั่วโมง, class ตาม Huang-Tseng ใช้เลือก PCN หรือ nephrectomy",
        "ix": [
          "CT abdomen",
          "Blood และ urine culture"
        ],
        "std": "Huang-Tseng classification (Arch Intern Med 2000)",
        "link": "flank"
      }),
      N("Infection-related GN (staphylococcal)", "nephro", {
        "s": "GN ที่เกิดระหว่าง infection ยัง active, ผู้สูงอายุ DM, diabetic foot หรือ bacteremia, IF อาจเป็น IgA dominant",
        "why": "ต่างจาก PSGN ที่มี latent period และต้องแยกจาก IgAN กับ AAV ก่อนให้ immunosuppression",
        "ix": [
          "Blood culture, C3, biopsy"
        ],
        "link": "hypocomp"
      }),
      N("Infective endocarditis-associated GN", "nephro", {
        "s": "Fever, murmur, hematuria, complement ต่ำ, ANCA อาจบวก",
        "ix": [
          "Blood culture, echocardiography"
        ],
        "link": "hypocomp"
      }),
      N("Legionella pneumonia", "adj", {
        "s": "Pneumonia กับ hyponatremia, rhabdomyolysis, AIN และ AKI",
        "ix": [
          "Urine Legionella antigen"
        ],
        "link": "hypona"
      })
    ]),
    N("Non-infectious mimics with fever", "step", {
      "s": "Vasculitis, SLE, TMA, drug AIN, HLH, heat stroke, lymphoma",
      "why": "ทั้งหมดมาด้วยไข้กับ AKI ได้ และการรักษาเป็น immunosuppression หรือ plasma exchange ซึ่งตรงข้ามกับ infection จึงต้องแยกให้ได้ก่อน",
      "keys": [
        "Culture ลบ, ไม่ตอบสนอง antibiotic",
        "RBC cast, ANCA, ANA",
        "MAHA"
      ],
      "ix": [
        "ANCA, anti-GBM, ANA, anti-dsDNA, C3, C4",
        "Schistocyte, ADAMTS13",
        "Eosinophilia",
        "Ferritin สูงมาก (HLH-2004 ใช้ ≥ 500 ng/mL, ยิ่งสูงยิ่งจำเพาะ), TG สูง, fibrinogen ต่ำ ให้สงสัย HLH และคำนวณ HScore",
        "Uric acid, PO4, K สูง = TLS"
      ]
    }, [
      N("ANCA-associated vasculitis and anti-GBM disease", "nephro", {
        "s": "Fever, weight loss, RPGN, pulmonary hemorrhage",
        "ix": [
          "MPO หรือ PR3 ANCA, anti-GBM",
          "Complement มักปกติ (ต่างจาก LN, IE, cryo) แต่ C3 ต่ำพบได้ส่วนน้อยใน AAV จึงไม่ใช้ตัดโรค",
          "RBC cast, dysmorphic RBC, UPCR มักไม่ถึง nephrotic"
        ],
        "link": "rpgn"
      }),
      N("SLE flare with lupus nephritis", "nephro", {
        "s": "Fever, serositis, C3 C4 ต่ำ, anti-dsDNA สูง",
        "ix": [
          "C3, C4 ต่ำ, anti-dsDNA สูงขึ้น",
          "Lymphopenia, Coombs บวก",
          "Procalcitonin มักไม่สูง ช่วยแยกจาก infection แต่ไม่แน่นอน"
        ],
        "link": "hypocomp"
      }),
      N("Drug-induced AIN and DRESS", "nephro", {
        "s": "Fever, rash, eosinophilia หลังเริ่มยา 1-3 สัปดาห์ (DRESS 2-8 สัปดาห์) แต่ triad ครบพบเพียงราว 10% ของ drug AIN ไม่ครบไม่ตัดโรคออก",
        "ix": [
          "Eosinophil > 1,500/µL, atypical lymphocyte, transaminase สูง (DRESS)",
          "WBC cast, sterile pyuria, UPCR ระดับ tubular",
          "Complement ปกติ, ANCA ลบ"
        ],
        "link": "pyuria"
      }),
      N("Thrombotic microangiopathy (TTP, STEC-HUS)", "nephro", {
        "s": "Fever, MAHA, thrombocytopenia, neuro, AKI",
        "ix": [
          "Schistocyte, LDH สูง, haptoglobin ต่ำ, Coombs ลบ",
          "ADAMTS13 < 10% คือ TTP",
          "Stool Shiga toxin PCR (STEC)",
          "PT, aPTT, fibrinogen ปกติ (ต่างจาก DIC)"
        ],
        "link": "tma"
      }),
      N("Hemophagocytic lymphohistiocytosis", "nephro", {
        "s": "Fever, cytopenia, splenomegaly, ferritin สูงมาก, triglyceride สูง, fibrinogen ต่ำ",
        "why": "AKI ใน HLH เกิดจาก ATN, TMA และ collapsing glomerulopathy, trigger ที่พบบ่อยคือ EBV, lymphoma และ autoimmune disease",
        "ix": [
          "Ferritin, TG, fibrinogen, sIL-2R, bone marrow",
          "HScore"
        ],
        "std": "HLH-2004 diagnostic criteria",
        "link": "cytopenia"
      }),
      N("Exertional heat stroke", "adj", {
        "s": "Core temperature > 40°C กับ CNS dysfunction, rhabdomyolysis, DIC, AKI",
        "ix": [
          "CK, coagulation"
        ],
        "link": "myalgia"
      }),
      N("Lymphoma with kidney infiltration or TLS", "nephro", {
        "s": "B symptoms, ไตโตสองข้าง, uric acid และ phosphate สูง",
        "ix": [
          "Uric acid, K, PO4 สูง, Ca ต่ำ (Cairo-Bishop)",
          "LDH สูงมาก",
          "Urine sediment bland, ไตโตสองข้างบน US"
        ],
        "link": "onco"
      })
    ])
  ])
};

/* ===================== TUBULOPATHY ===================== */
TREES["tubulopathy"] = {
  must: [
    "ยา: tenofovir disoproxil (TDF), adefovir, cidofovir, ifosfamide, cisplatin, aminoglycoside, deferasirox, valproate, tetracycline หมดอายุ, สมุนไพร",
    "ปวดกระดูก, กระดูกหัก, เดินแบบ waddling (osteomalacia), เด็กเตี้ยหรือขาโก่ง (rickets)",
    "ปัสสาวะมาก, กระหายน้ำ, อ่อนแรง (hypokalemia)",
    "อายุ > 50 ปี, ปวดหลัง, anemia, monoclonal gammopathy",
    "ครอบครัว, consanguinity, เพศชายที่เป็นนิ่วหรือ nephrocalcinosis",
    "ตา: photophobia (cystinosis), cataract (Lowe), KF ring (Wilson)",
    "โรคตับ, tremor, อาการทางจิต (Wilson)",
    "สัมผัสโลหะหนัก: cadmium (แหล่งปนเปื้อน เช่น อ.แม่สอด), lead จากอาชีพ",
    "ตาแห้ง ปากแห้ง (Sjogren)",
    "HIV, HBV ที่ได้ยามานาน"
  ],
  tree: N("Proximal tubulopathy and Fanconi syndrome", "root", {
    "s": "ยืนยันว่าเป็น generalized proximal dysfunction (euglycemic glucosuria, phosphaturia, aminoaciduria, LMW proteinuria, bicarbonaturia, uric acid wasting อย่างน้อย 2-3 ข้อ) แล้วแยก acquired (drug, paraprotein, toxin, autoimmune) จาก inherited",
    "why": "Fanconi syndrome เป็นทางเข้าที่ examiner ชอบใช้ซ่อน multiple myeloma (LCPT), tenofovir toxicity และ inherited disease เพราะผู้ป่วยมักมาด้วย bone pain, weakness หรือ NAGMA ไม่ใช่ Cr สูง ผู้ใหญ่ที่เป็น Fanconi ทุกรายควรตรวจ monoclonal protein (SPEP, sFLC, immunofixation) แม้มียาที่อธิบายได้ และยิ่งจำเป็นเมื่อไม่พบสาเหตุจากยา",
    "keys": [
      "Glucosuria ทั้งที่ plasma glucose ปกติและไม่ได้ SGLT2i",
      "TmP/GFR ต่ำร่วมกับ hypophosphatemia",
      "Urine β2-microglobulin หรือ α1-microglobulin สูง, UACR/UPCR < 0.4 ชี้ tubular proteinuria",
      "Proximal RTA: urine pH < 5.5 ได้เมื่อ HCO3 ต่ำ แต่ FEHCO3 > 15% เมื่อ HCO3 ถูกแก้ขึ้น",
      "Hypouricemia กับ FEurate > 10%"
    ],
    "ix": [
      "Plasma HCO3, K, PO4, uric acid, glucose, Cr",
      "Urine glucose, PO4 (TmP/GFR), uric acid (FEurate), pH, UPCR, UACR, β2M หรือ α1M, amino acid",
      "SPEP, sFLC, serum และ urine immunofixation",
      "Drug history, HBV, HIV, urine และ blood cadmium, lead",
      "Kidney biopsy ถ้าสงสัย LCPT หรือมี CKD ที่ไม่ทราบสาเหตุ"
    ],
    "std": "IKMG consensus on MGRS (Leung, Nat Rev Nephrol 2019), TmP/GFR (Walton-Bijvoet nomogram)"
  }, [
    N("Partial defects that are not full Fanconi", "step", {
      "s": "Defect เดี่ยวที่ทำให้วินิจฉัยผิดเป็น Fanconi",
      "why": "ต้องแยกก่อนเพราะสาเหตุและการรักษาต่างกันมาก",
      "keys": [
        "มีความผิดปกติข้อเดียว",
        "ส่วนใหญ่ไม่มี LMW proteinuria (ยกเว้น isolated tubular proteinuria จาก chronic interstitial disease)"
      ],
      "ix": [
        "นับจำนวน defect: glucose, PO4, uric acid, HCO3, LMW protein, amino acid",
        "Defect เดียว = isolated defect, หลายข้อพร้อมกัน (อย่างน้อย 2-3 ข้อ) = generalized proximal dysfunction (Fanconi)",
        "FGF23 สูง = phosphate wasting จาก FGF23"
      ]
    }, [
      N("Familial renal glucosuria and SGLT2 inhibitor", "adj", {
        "s": "Glucosuria อย่างเดียว, SLC5A2 variant หรือได้ SGLT2i",
        "why": "Benign ไม่ต้องรักษา และ SGLT2i ทำให้ urine glucose บวกตลอดในผู้ป่วยที่ได้ยา",
        "ix": [
          "Urine glucose บวก, plasma glucose และ HbA1c ปกติ",
          "PO4, uric acid, HCO3, β2M ปกติ"
        ],
        "link": "polyuria"
      }),
      N("Isolated phosphate wasting (FGF23-mediated)", "adj", {
        "s": "XLH, tumor-induced osteomalacia, IV ferric carboxymaltose: PO4 wasting โดย tubule ส่วนอื่นปกติ",
        "why": "FGF23 สูงร่วมกับ 1,25(OH)2D ต่ำหรือปกติผิดสัดส่วน แยกจาก Fanconi ได้ด้วย glucose, uric acid และ LMW protein ปกติ",
        "ix": [
          "Intact FGF23, 1,25(OH)2D"
        ],
        "link": "phos"
      }),
      N("Isolated proximal RTA", "adj", {
        "s": "Carbonic anhydrase inhibitor (acetazolamide, topiramate), SLC4A4 variant",
        "ix": [
          "HCO3 คงที่ราว 12-20 mmol/L, urine pH < 5.5 เมื่อ acidosis เต็มที่",
          "FEHCO3 > 15% เมื่อแก้ HCO3 ขึ้น",
          "Urine glucose, PO4, uric acid ปกติ"
        ],
        "link": "nagma"
      }),
      N("Tubular proteinuria from chronic interstitial disease", "adj", {
        "s": "LMW proteinuria จาก CKD, TIN หรือ obstruction โดยไม่มี glucosuria หรือ phosphaturia",
        "ix": [
          "UACR/UPCR < 0.4, urine β2M หรือ α1M สูง",
          "Urine glucose และ TmP/GFR ปกติ"
        ],
        "link": "proteinuria"
      })
    ]),
    N("Drug-induced", "step", {
      "s": "สาเหตุที่พบบ่อยที่สุดในผู้ใหญ่ ส่วนใหญ่ฟื้นได้บางส่วนหลังหยุดยา",
      "why": "ยาถูกขนเข้า proximal tubule ผ่าน OAT1, OAT3 หรือ megalin แล้วทำลาย mitochondria ทำให้ transport ทุกตัวเสียพร้อมกัน",
      "keys": [
        "Temporal relationship กับยา",
        "Mitochondrial toxicity"
      ],
      "ix": [
        "Defect เกิดหลังเริ่มยาและดีขึ้นหลังหยุด",
        "Mg ต่ำร่วม ชี้ cisplatin หรือ aminoglycoside (ไม่จำเพาะ)",
        "Plasma tenofovir level (บางศูนย์)"
      ]
    }, [
      N("Tenofovir nephrotoxicity (TDF)", "nephro", {
        "s": "Fanconi, AKI หรือ CKD ใน HIV หรือ HBV ที่ได้ TDF นาน, risk สูงขึ้นเมื่อได้ boosted PI, น้ำหนักน้อย, CKD เดิม",
        "why": "TDF เข้า tubule ผ่าน OAT1 และสะสมเมื่อ efflux ผ่าน MRP2 หรือ MRP4 บกพร่อง, TAF ให้ plasma tenofovir ต่ำกว่ามาก จึงเปลี่ยนเป็น TAF หรือ regimen อื่นเมื่อมี tubulopathy",
        "keys": [
          "Hypophosphatemia กับ euglycemic glucosuria",
          "Osteomalacia และ fracture",
          "ฟื้นไม่สมบูรณ์ได้ถ้าหยุดยาช้า"
        ],
        "ix": [
          "Urine glucose, PO4, β2M, UPCR, Cr ทุก 3-6 เดือน"
        ],
        "std": "EACS guidelines 2023 (kidney toxicity of ART)",
        "link": "viral"
      }),
      N("Ifosfamide and cisplatin", "nephro", {
        "s": "Ifosfamide ทำ Fanconi ผ่าน chloroacetaldehyde โดยเฉพาะ cumulative dose สูงในเด็ก, cisplatin ทำ Mg และ K wasting",
        "why": "Tubulopathy อาจถาวรและปรากฏหลังจบ chemotherapy หลายปี",
        "ix": [
          "Mg, PO4, HCO3, urine glucose"
        ],
        "link": "onco"
      }),
      N("Deferasirox, valproate, aminoglycoside and nucleotide antivirals", "nephro", {
        "s": "Deferasirox ในผู้ป่วย thalassemia, valproate ในเด็กพิการทางสมอง, aminoglycoside, cidofovir และ adefovir",
        "why": "Deferasirox เป็นสาเหตุสำคัญในบริบทไทยเพราะ thalassemia พบบ่อย มักฟื้นหลังลดขนาดหรือเปลี่ยนเป็น chelator อื่น",
        "ix": [
          "Urine glucose, PO4, UPCR ระหว่างได้ยา"
        ],
        "link": "cytopenia"
      }),
      N("Aristolochic acid and expired tetracycline", "adj", {
        "s": "Aristolochic acid จากสมุนไพรจีนทำ Fanconi, progressive TIN และ urothelial cancer ส่วน tetracycline หมดอายุ (degradation product) ทำ Fanconi ที่ reversible หลังหยุดยา",
        "why": "ผู้ป่วยมักไม่บอกว่ากินสมุนไพร ต้องถามตรง ๆ และ screen urothelial cancer ระยะยาว",
        "ix": [
          "Glucosuria, LMW proteinuria, eGFR ลดเร็ว",
          "Urine cytology, CT urography (urothelial cancer)",
          "Aristolactam-DNA adduct ในเนื้อเยื่อ (research)"
        ],
        "link": "hematuria"
      })
    ]),
    N("Paraprotein-related", "step", {
      "s": "Light chain proximal tubulopathy, ต้องคิดในผู้ใหญ่ทุกรายที่เป็น Fanconi แม้มียาที่อธิบายได้ และยิ่งต้องหาเมื่อไม่พบสาเหตุจากยา",
      "why": "Light chain บางชนิด (มักเป็น kappa จาก Vκ1) ทน proteolysis ใน lysosome จึงสะสมเป็น crystal ใน proximal tubule",
      "keys": [
        "อายุ > 50 ปี",
        "Slowly progressive CKD กับ osteomalacia"
      ],
      "ix": [
        "sFLC ratio ผิดปกติ (kappa เด่น), immunofixation บวก",
        "Urine immunofixation (Bence Jones)",
        "Biopsy: crystal ใน proximal tubule บน EM, kappa restriction"
      ]
    }, [
      N("Light chain proximal tubulopathy (LCPT)", "nephro", {
        "s": "Fanconi ในผู้ใหญ่ร่วมกับ monoclonal light chain (kappa ราว 95%), ราวครึ่งหนึ่งเป็น MGRS ที่เหลือเป็น myeloma, smoldering myeloma หรือ lymphoma",
        "why": "การรักษาคือ clone-directed therapy เพื่อหยุดการเสื่อมของไต แม้ hematologic disease จะไม่ถึงเกณฑ์รักษา จัดเป็น MGRS ตาม IKMG",
        "keys": [
          "Crystalline หรือ non-crystalline form บน EM",
          "Kappa มากกว่า lambda ชัดเจน",
          "Crystal-storing histiocytosis ร่วมได้"
        ],
        "ix": [
          "SPEP, sFLC, immunofixation",
          "Kidney biopsy with EM และ kappa lambda IF",
          "Bone marrow biopsy"
        ],
        "std": "IKMG consensus on MGRS (Leung, Nat Rev Nephrol 2019)",
        "link": "mspike"
      })
    ]),
    N("Toxin and autoimmune", "step", {
      "s": "Heavy metal และ autoimmune tubulointerstitial disease",
      "why": "สาเหตุที่หาได้ถ้าถามอาชีพ ที่อยู่ และอาการ sicca",
      "keys": [
        "อาชีพและแหล่งน้ำหรืออาหาร",
        "Sicca symptoms"
      ],
      "ix": [
        "Urine cadmium สูงร่วมกับ β2M สูง",
        "Blood lead สูง, uric acid สูง",
        "Anti-Ro, anti-La บวก, hypergammaglobulinemia สนับสนุน Sjogren (anti-Ro ลบไม่ตัดออก)"
      ]
    }, [
      N("Cadmium and lead nephropathy", "nephro", {
        "s": "Cadmium จากข้าวในพื้นที่ปนเปื้อนทำ β2-microglobulinuria, osteomalacia และนิ่ว, lead ทำ aminoaciduria, gout และ hypertension",
        "why": "Cadmium half-life ในไตยาว 10-30 ปี tubular dysfunction จึงคงอยู่หรือแย่ลงต่อได้แม้หยุด exposure แล้ว ในประเทศไทย มีข้อมูลจากพื้นที่ อ.แม่สอด จ.ตาก",
        "ix": [
          "Urine cadmium (µg/g creatinine), urine β2M",
          "Blood lead, EDTA mobilization test"
        ],
        "link": "bonepain"
      }),
      N("Sjogren syndrome tubulointerstitial nephritis", "nephro", {
        "s": "Sjogren ทำ TIN กับ distal RTA เป็นหลัก แต่ proximal dysfunction และ Fanconi พบได้",
        "why": "ถ้าพบ hypokalemic NAGMA กับ tubular proteinuria ในหญิงวัยกลางคนต้องถาม sicca และตรวจ anti-Ro",
        "ix": [
          "Anti-Ro, anti-La, Schirmer test, salivary gland biopsy"
        ],
        "link": "sicca"
      })
    ]),
    N("Inherited", "step", {
      "s": "Cystinosis, Dent disease, Lowe syndrome, Wilson disease และ metabolic disease อื่น",
      "why": "เด็กหรือผู้ใหญ่ตอนต้นที่มี Fanconi กับ extrarenal feature เฉพาะ เป็นโจทย์ genetic ที่ board ชอบถาม",
      "keys": [
        "เริ่มในวัยเด็ก",
        "ครอบครัว, X-linked pattern",
        "Extrarenal: ตา ตับ สมอง"
      ],
      "ix": [
        "Leukocyte cystine สูง = cystinosis",
        "LMW proteinuria มาก กับ urine Ca สูงในเพศชาย ชี้ Dent disease (ยืนยันด้วย genetic testing)",
        "Ceruloplasmin < 20 mg/dL, urine Cu > 100 µg/24 ชั่วโมง ชี้ Wilson (ceruloplasmin ปกติไม่ตัดออก ให้ใช้ Leipzig score)",
        "Lactate สูง ให้สงสัย mitochondrial cytopathy (ไม่จำเพาะ)",
        "Genetic panel (CTNS, CLCN5, OCRL, ATP7B, HNF4A, SLC2A2)"
      ]
    }, [
      N("Cystinosis", "nephro", {
        "s": "CTNS mutation, inherited Fanconi ที่พบบ่อยที่สุดในเด็ก, corneal cystine crystal, hypothyroidism, ESKD ตั้งแต่วัยเด็กถ้าไม่รักษา",
        "why": "Cysteamine ชะลอการเสื่อมของไตและอวัยวะอื่นได้มาก, juvenile form มาตอนวัยรุ่นด้วย proteinuria",
        "ix": [
          "Leukocyte cystine level, slit lamp, CTNS genetic testing"
        ],
        "link": "shortstature"
      }),
      N("Dent disease", "nephro", {
        "s": "X-linked (CLCN5 หรือ OCRL), LMW proteinuria มาก, hypercalciuria, nephrocalcinosis และนิ่วในเพศชาย",
        "why": "LMW proteinuria มักอยู่ในระดับ nephrotic range แต่ albumin ปกติและไม่บวม ทำให้ถูกวินิจฉัยผิดเป็น FSGS ได้ ผู้ป่วยชายส่วนหนึ่งเข้าสู่ ESKD ในวัย 30-50 ปี",
        "keys": [
          "UPCR สูงมากแต่ UACR ไม่สูงตาม",
          "Mother เป็น carrier"
        ],
        "ix": [
          "Urine β2M หรือ α1M, urine Ca",
          "CLCN5 และ OCRL genetic testing"
        ],
        "link": "stone"
      }),
      N("Lowe syndrome", "nephro", {
        "s": "OCRL mutation, congenital cataract, hypotonia, intellectual disability ร่วมกับ Fanconi",
        "why": "เป็น allelic disease กับ Dent type 2 แต่มี ocular และ neurological involvement",
        "ix": [
          "Slit lamp, OCRL genetic testing"
        ],
        "link": "eye"
      }),
      N("Wilson disease", "nephro", {
        "s": "ATP7B, liver disease, neuropsychiatric symptom, KF ring ร่วมกับ Fanconi และ hypercalciuria",
        "why": "Copper สะสมใน proximal tubule ทำ Fanconi, distal RTA และนิ่วได้ ต้องคิดในผู้ป่วยอายุน้อยที่มี liver disease กับ tubulopathy",
        "ix": [
          "Ceruloplasmin, 24-hour urine copper, slit lamp",
          "Leipzig score"
        ],
        "std": "EASL-ERN Wilson disease guideline 2025",
        "link": "jaundice"
      }),
      N("Other metabolic causes", "nephro", {
        "s": "Mitochondrial cytopathy, galactosemia, tyrosinemia type 1, Fanconi-Bickel (GLUT2), HNF4A-MODY",
        "why": "Mitochondrial disease มาพร้อม deafness, diabetes, myopathy, HNF4A มาพร้อม neonatal hyperinsulinism ตามด้วย MODY",
        "ix": [
          "Lactate และ pyruvate สูง (mitochondrial)",
          "Urine reducing substance, galactose-1-phosphate uridyltransferase (galactosemia)",
          "Urine succinylacetone (tyrosinemia type 1)",
          "Genetic panel"
        ],
        "link": "hearing"
      })
    ]),
    N("Consequences and management", "step", {
      "s": "ผลแทรกซ้อนที่ทำให้ผู้ป่วยมาโรงพยาบาล และหลักการทดแทน",
      "why": "Examiner มักถามต่อว่าจะให้ alkali, phosphate และ vitamin D อย่างไร และต้องระวัง hypokalemia เมื่อแก้ acidosis",
      "keys": [
        "Proximal RTA ต้องใช้ alkali ขนาดสูง (10-15 mEq/kg/วัน) เพราะ bicarbonate ถูกขับทิ้ง",
        "แก้ HCO3 แล้ว K wasting มากขึ้น จึงควรใช้ potassium citrate",
        "Phosphate ร่วมกับ calcitriol สำหรับ osteomalacia"
      ],
      "ix": [
        "PO4, ALP, PTH, 25(OH)D",
        "K, HCO3 ก่อนและหลังให้ alkali",
        "Urine Ca ระหว่างให้ calcitriol (ระวัง nephrocalcinosis)"
      ]
    }, [
      N("Hypophosphatemic osteomalacia", "adj", {
        "s": "ปวดกระดูก, pseudofracture (Looser zone), ALP สูง",
        "ix": [
          "PO4 ต่ำ, TmP/GFR ต่ำ, ALP สูง",
          "PTH ปกติหรือสูงเล็กน้อย, 25(OH)D ปกติ"
        ],
        "link": "bonepain"
      }),
      N("Hypokalemia from proximal and distal K wasting", "adj", {
        "s": "Distal Na delivery สูงและ aldosterone สูงจาก volume contraction",
        "ix": [
          "TTKG > 3 หรือ urine K/Cr > 13 mEq/g ขณะ K ต่ำ (renal K loss)",
          "Urine Na สูง, renin และ aldosterone สูง"
        ],
        "link": "hypok"
      }),
      N("Normal anion gap metabolic acidosis (proximal RTA)", "adj", {
        "s": "HCO3 มักคงที่ราว 12-20 mmol/L ตาม threshold ใหม่",
        "ix": [
          "Urine anion gap อาจลบเพราะ NH4 ปกติ",
          "Urine osmolal gap ไม่ต่ำ (≥ 150 mOsm/kg)",
          "FEHCO3 > 15% เมื่อแก้ HCO3"
        ],
        "link": "nagma"
      })
    ])
  ])
};

/* ===================== HYDRO ===================== */
TREES["hydro"] = {
  must: [
    "LUTS: ปัสสาวะไม่พุ่ง, ปัสสาวะไม่สุด, กลั้นไม่อยู่, ปัสสาวะคั่ง",
    "DM neuropathy, spinal cord injury, multiple sclerosis",
    "ปวดเอวร้าวลงขาหนีบ, ปัสสาวะเป็นเลือด, นิ่ว",
    "มะเร็ง: ปากมดลูก, ต่อมลูกหมาก, กระเพาะปัสสาวะ, ลำไส้ใหญ่, lymphoma และประวัติฉายแสงอุ้งเชิงกราน",
    "ผ่าตัดในอุ้งเชิงกราน เช่น hysterectomy หรือ colorectal surgery",
    "ยา: anticholinergic, opioid, ergot (retroperitoneal fibrosis)",
    "ตั้งครรภ์",
    "ติดเชื้อทางเดินปัสสาวะซ้ำ, TB, ติดเชื้อในวัยเด็ก, VUR",
    "น้ำหนักลด, ปวดหลัง, AAA, อาการ IgG4-related disease (ต่อมน้ำลาย, pancreatitis)",
    "ปัสสาวะออกมากผิดปกติ (lithium, DI)"
  ],
  tree: N("Hydronephrosis and obstructive uropathy", "root", {
    "s": "ยืนยันว่า hydronephrosis มี obstruction จริง (ไม่ใช่ VUR, pregnancy, extrarenal pelvis หรือ residual dilatation) แล้วแยก bilateral หรือ solitary kidney (ทำให้ AKI) กับ unilateral แล้วหาตำแหน่ง infravesical, intraluminal, intramural หรือ extrinsic",
    "why": "Obstruction เป็น AKI ที่ reversible ที่สุด examiner จะถามเสมอว่าทำ ultrasound หรือยัง ประเด็นสำคัญคือ hydronephrosis ไม่เท่ากับ obstruction และ obstruction ไม่จำเป็นต้องมี hydronephrosis",
    "keys": [
      "AKI ชัดเจนเกิดเมื่อ obstruction เป็น bilateral, เกิดใน solitary functioning kidney หรือไตอีกข้างมีโรคอยู่เดิม",
      "Non-dilated obstruction: retroperitoneal fibrosis, tumor encasement, volume depletion, ช่วง 24-48 ชั่วโมงแรก",
      "Bladder distension บอกว่าปัญหาอยู่ที่ bladder outlet หรือต่ำกว่า หรือเป็น neurogenic bladder",
      "Post-void residual > 200 mL มักถือว่ามี retention ที่มีนัยสำคัญ (ไม่มี cutoff สากล, AUA นิยาม chronic urinary retention ที่ PVR > 300 mL)",
      "Cortex บาง บอกโอกาสฟื้นน้อย",
      "Polyuria สลับ anuria ชี้ intermittent หรือ partial obstruction"
    ],
    "ix": [
      "Kidney และ bladder ultrasound with PVR",
      "Foley catheter trial",
      "Non-contrast CT KUB (stone), CT urography หรือ MR urography",
      "MAG3 diuretic renogram: T½ > 20 นาทีชี้ obstruction, < 10 นาทีไม่ obstruct, และดู split function",
      "PSA, urine cytology, cystoscopy ตามข้อบ่งชี้",
      "IgG4, ESR, CRP ถ้าสงสัย retroperitoneal fibrosis"
    ],
    "std": "SFU hydronephrosis grading, EAU Guidelines on Urolithiasis 2025, SNMMI/EANM consensus on diuretic renography"
  }, [
    N("Dilatation without obstruction", "step", {
      "s": "Hydronephrosis ที่ไม่ใช่ obstruction",
      "why": "ป้องกันการทำหัตถการโดยไม่จำเป็น, diuretic renogram ช่วยแยกเมื่อไม่แน่ใจ",
      "keys": [
        "Renogram washout ปกติ",
        "ไม่มีการเปลี่ยนแปลงของ Cr"
      ],
      "ix": [
        "MAG3 T½ < 10 นาที",
        "Cr คงที่, split function คงที่",
        "VCUG บวก = VUR",
        "Urine osm ต่ำกับ urine volume สูง = high-flow"
      ]
    }, [
      N("Physiologic urinary tract dilatation of pregnancy", "adj", {
        "s": "ขวามากกว่าซ้าย จาก progesterone และการกดของมดลูก, หายหลังคลอด 6-12 สัปดาห์",
        "ix": [
          "Cr ต่ำกว่าคนไม่ตั้งครรภ์ (GFR สูงขึ้น), Cr > 0.8 mg/dL ในการตั้งครรภ์ถือว่าผิดปกติ",
          "Ureter ขวาขยายถึงระดับ pelvic brim แล้วตีบเรียว"
        ],
        "link": "pregnancy"
      }),
      N("Vesicoureteral reflux and reflux nephropathy", "nephro", {
        "s": "Hydronephrosis จาก reflux, ประวัติ febrile UTI ในเด็ก, cortical scar",
        "why": "เป็นสาเหตุสำคัญของ CKD ในผู้ใหญ่ตอนต้นที่มี proteinuria และ secondary FSGS",
        "ix": [
          "VCUG, DMSA scan"
        ],
        "link": "kidneysize"
      }),
      N("Extrarenal pelvis, parapelvic cyst and residual dilatation", "adj", {
        "s": "Anatomic variant หรือ dilatation ที่ค้างหลังแก้ obstruction แล้ว",
        "ix": [
          "Cr และ split function คงที่",
          "MAG3 washout ปกติ (T½ < 10 นาที)"
        ],
        "link": "cysts"
      }),
      N("High urine flow (nephrogenic DI, lithium)", "adj", {
        "s": "Polyuria มากต่อเนื่องทำให้ทางเดินปัสสาวะขยายสองข้างได้",
        "ix": [
          "Urine osm < 300 mOsm/kg กับ urine volume > 3 L/วัน",
          "Serum Na สูงหรือปกติสูง, ไม่ตอบสนองต่อ desmopressin (urine osm เพิ่ม < 50%)",
          "Lithium level"
        ],
        "link": "polyuria"
      })
    ]),
    N("Infravesical: bladder outlet", "step", {
      "s": "Bladder distension กับ hydronephrosis สองข้าง",
      "why": "สาเหตุที่พบบ่อยที่สุดของ postrenal AKI ในผู้ชายสูงอายุ แก้ได้ทันทีด้วย Foley catheter",
      "keys": [
        "PVR สูง",
        "Bladder wall หนา, trabeculation"
      ],
      "ix": [
        "PVR > 200 mL, Cr ลดลงหลังใส่ Foley",
        "PSA",
        "Urodynamics: detrusor pressure สูงกับ flow ต่ำ = bladder outlet obstruction ส่วน detrusor underactivity หรือ detrusor-sphincter dyssynergia ชี้ neurogenic bladder"
      ]
    }, [
      N("BPH and prostate cancer", "nephro", {
        "s": "LUTS, ต่อมลูกหมากโต, PSA",
        "ix": [
          "PSA (แปลผลตามอายุและขนาดต่อม)",
          "PVR > 200 mL",
          "Urine culture ถ้ามี retention"
        ],
        "link": "luts"
      }),
      N("Neurogenic bladder", "nephro", {
        "s": "DM autonomic neuropathy, spinal cord injury, MS, spina bifida",
        "why": "High-pressure bladder ทำลายไตแบบเงียบ ต้องใช้ urodynamics และ clean intermittent catheterization",
        "ix": [
          "Urodynamic study"
        ],
        "link": "luts"
      }),
      N("Urethral stricture, posterior urethral valve and drug-induced retention", "nephro", {
        "s": "ประวัติ urethritis หรือ instrumentation, PUV ในเด็กชาย, anticholinergic และ opioid",
        "ix": [
          "Uroflowmetry Qmax ต่ำ, retrograde urethrogram",
          "PVR สูง, Cr ลดลงหลังใส่สาย"
        ],
        "link": "luts"
      })
    ]),
    N("Intraluminal ureteric", "step", {
      "s": "สิ่งอุดตันในท่อไต",
      "why": "Unilateral ทำ AKI เฉพาะใน solitary kidney หรือ CKD เดิม แต่ obstructed infected kidney เป็นภาวะฉุกเฉิน",
      "keys": [
        "Renal colic",
        "Hematuria",
        "Fever กับ obstruction ต้อง decompress ทันที"
      ],
      "ix": [
        "Non-contrast CT KUB: stone",
        "Urine crystal, fungal culture",
        "Hematuria รุนแรงกับ coagulopathy ชี้ clot obstruction"
      ]
    }, [
      N("Nephrolithiasis with obstruction", "nephro", {
        "s": "Colic, hematuria, stone บน CT",
        "why": "Obstructing stone กับ infection หรือ sepsis ต้อง emergency decompression ด้วย PCN หรือ retrograde stent ก่อนรักษานิ่ว",
        "ix": [
          "Non-contrast CT KUB",
          "WBC, CRP, urine culture และ blood culture ถ้ามีไข้",
          "Urine pH, Ca, uric acid, stone analysis หลังผ่าน"
        ],
        "std": "EAU Guidelines on Urolithiasis 2025",
        "link": "stone"
      }),
      N("Papillary necrosis", "nephro", {
        "s": "DM, analgesic, sickle cell, obstruction, pyelonephritis, papilla หลุดอุดท่อไต",
        "why": "CT urography เห็น ring sign หรือ ball-on-tee, ต้องคิดเมื่อ DM มี colic และ pyelonephritis",
        "ix": [
          "CT urography"
        ],
        "link": "flank"
      }),
      N("Blood clot, fungal ball and drug crystal", "nephro", {
        "s": "Clot จาก hematuria รุนแรง, Candida ใน DM หรือ immunosuppressed, acyclovir, sulfadiazine, indinavir crystal",
        "ix": [
          "Urine microscopy: crystal รูปเข็ม (acyclovir), sheaf of wheat (sulfadiazine)",
          "Urine fungal culture, Candida",
          "Hb, platelet, coagulation"
        ],
        "link": "oliguria"
      })
    ]),
    N("Intramural: ureteric or bladder wall", "step", {
      "s": "Stricture หรือ tumor ที่ผนัง",
      "why": "สาเหตุที่ต้องการ tissue diagnosis หรือ urological reconstruction",
      "keys": [
        "Painless hematuria",
        "Sterile pyuria"
      ],
      "ix": [
        "Urine cytology บวก ชี้ urothelial carcinoma (sensitivity ต่ำใน low-grade tumor ผลลบไม่ตัดออก)",
        "Sterile pyuria, urine AFB PCR บวก = TB",
        "BK PCR บวกในผู้ป่วย KT",
        "Urine ova = schistosomiasis"
      ]
    }, [
      N("Urothelial carcinoma", "nephro", {
        "s": "Painless gross hematuria, สูบบุหรี่, aristolochic acid, cyclophosphamide",
        "ix": [
          "Urine cytology, CT urography",
          "Cystoscopy, ureteroscopy with biopsy"
        ],
        "link": "hematuria"
      }),
      N("Genitourinary tuberculosis stricture", "nephro", {
        "s": "Sterile pyuria, ureteric stricture หลายตำแหน่ง, thimble bladder, autonephrectomy",
        "why": "Stricture อาจแย่ลงในช่วงแรกของการรักษา TB จึงต้องติดตามด้วย imaging",
        "ix": [
          "Early morning urine AFB culture และ PCR 3 วัน",
          "CT urography"
        ],
        "link": "pyuria"
      }),
      N("UPJ obstruction and other CAKUT", "nephro", {
        "s": "UPJ obstruction, megaureter, ureterocele, duplex system",
        "why": "UPJ obstruction อาจมาตอนผู้ใหญ่ด้วย flank pain หลังดื่มน้ำมาก (Dietl crisis)",
        "ix": [
          "MAG3 diuretic renogram"
        ],
        "link": "kidneysize"
      }),
      N("Transplant ureteric stenosis and BK virus", "nephro", {
        "s": "Hydronephrosis ของ graft, ischemia ของ distal ureter หรือ BK virus",
        "ix": [
          "Plasma BK PCR (> 10^4 copies/mL = presumptive BK nephropathy, ureteric stenosis เกิดได้โดยไม่ต้องถึงระดับนี้)",
          "Graft ultrasound, antegrade pyelogram"
        ],
        "link": "kt-early"
      }),
      N("Schistosomiasis (S. haematobium)", "adj", {
        "s": "ประวัติเดินทางหรือว่ายน้ำในแหล่งน้ำจืดแอฟริกาหรือตะวันออกกลาง, bladder calcification",
        "ix": [
          "Urine terminal-void microscopy หา ova (เก็บช่วงเที่ยง)",
          "Eosinophilia, schistosoma serology"
        ],
        "link": "hematuria"
      })
    ]),
    N("Extrinsic compression", "step", {
      "s": "Malignancy, retroperitoneal fibrosis, iatrogenic",
      "why": "มักเป็น bilateral และ insidious, อาจไม่มี hydronephrosis มากแม้ obstruction รุนแรง",
      "keys": [
        "Medial deviation ของ ureter",
        "Mass หรือ encasement รอบ aorta",
        "ประวัติผ่าตัดหรือฉายแสง"
      ],
      "ix": [
        "ESR, CRP สูง, IgG4 > 135 mg/dL (สูงเพียงราวครึ่งหนึ่ง) สนับสนุน RPF แต่ไม่จำเพาะ",
        "LDH สูง ให้สงสัย lymphoma (LDH ปกติไม่ตัดออก)",
        "Biopsy เมื่อ imaging ไม่ typical"
      ]
    }, [
      N("Pelvic malignancy and lymphoma", "nephro", {
        "s": "Cervical cancer เป็นสาเหตุสำคัญของ bilateral obstruction ในหญิงไทย, prostate, bladder, colorectal cancer และ lymphoma",
        "why": "การ decompress ต้องพิจารณา prognosis และเป้าหมายการรักษาร่วมกับผู้ป่วย",
        "ix": [
          "CT หรือ MRI pelvis, tissue biopsy",
          "LDH, PSA, CEA ตาม primary"
        ],
        "link": "onco"
      }),
      N("Retroperitoneal fibrosis (IgG4-related)", "nephro", {
        "s": "Periaortic soft tissue mass ที่ encase ureter, ปวดหลัง, ESR สูง, idiopathic หรือ IgG4-related, secondary จาก drug, malignancy, infection",
        "why": "IgG4 ในเลือดสูงเพียงราวครึ่งหนึ่ง ต้องตัด lymphoma และ malignancy ก่อนให้ steroid, steroid ได้ผลดีและใส่ stent ร่วม",
        "keys": [
          "Medial deviation ของ ureter สองข้าง",
          "อาจไม่มี hydronephrosis ชัด",
          "Extrarenal IgG4: pancreatitis, sialadenitis"
        ],
        "ix": [
          "CT หรือ MRI, PET-CT",
          "IgG4, biopsy ถ้า atypical"
        ],
        "std": "2019 ACR/EULAR IgG4-RD classification criteria, Vaglio (Lancet 2011, n = 40): cumulative relapse ที่ 26 เดือน 17% กับ prednisone vs 50% กับ tamoxifen",
        "link": "backpain"
      }),
      N("Iatrogenic ureteral injury and radiation fibrosis", "nephro", {
        "s": "หลัง hysterectomy, colorectal หรือ vascular surgery, ฉายแสงอุ้งเชิงกรานหลายปีก่อน",
        "ix": [
          "Drain fluid Cr สูงกว่า serum (urine leak)",
          "CT urography, retrograde pyelogram"
        ],
        "link": "abdpain"
      }),
      N("Aneurysm, endometriosis and pelvic mass", "adj", {
        "s": "AAA หรือ iliac aneurysm, endometriosis, uterine fibroid ขนาดใหญ่",
        "ix": [
          "CT angiography (AAA)",
          "CA-125, pelvic MRI (endometriosis)"
        ],
        "link": "abdomen"
      })
    ]),
    N("After relief of obstruction", "step", {
      "s": "สิ่งที่ examiner ถามต่อ: เลือกวิธี decompress และภาวะที่ต้องเฝ้าระวังหลังแก้ obstruction (กลุ่มนี้ไม่ใช่สาเหตุของ hydronephrosis)",
      "why": "ภาวะแทรกซ้อนหลังแก้ obstruction เป็นคำถามมาตรฐานของ long case",
      "keys": [
        "Urine output ทุกชั่วโมง",
        "Na, K, Mg, PO4 ซ้ำ"
      ],
      "ix": [
        "Urine output รายชั่วโมง",
        "Serum และ urine Na, osm, K, Mg ทุก 6-12 ชั่วโมงในช่วงแรก",
        "Urine osm ต่ำต่อเนื่อง = concentrating defect"
      ]
    }, [
      N("Post-obstructive diuresis", "nephro", {
        "s": "Urine > 200 mL/ชั่วโมง ติดกัน 2 ชั่วโมง หรือ > 3 L/วัน หลังแก้ bilateral obstruction หรือ obstruction ของ solitary kidney",
        "why": "ส่วนใหญ่เป็น physiologic diuresis ขับ urea และน้ำที่คั่ง แต่บางรายมี tubular concentrating defect ทำให้ dehydration, hyponatremia หรือ hypernatremia, hypokalemia, hypomagnesemia ไม่ควรทดแทน urine output ทั้งหมด",
        "keys": [
          "ดู volume status, ไม่ replace 1:1",
          "มักทดแทนราวครึ่งถึงสามในสี่ของ urine output ถ้ามี volume depletion"
        ],
        "ix": [
          "Urine output, urine และ serum Na, osmolality, K, Mg"
        ],
        "link": "polyuria"
      }),
      N("Type 4 RTA and voltage defect after chronic obstruction", "nephro", {
        "s": "Voltage-dependent dRTA หรือ hyporeninemic hypoaldosteronism จากความเสียหายของ collecting duct",
        "ix": [
          "K สูง, NAGMA, urine pH > 5.5 ใน voltage defect หรือ < 5.5 ใน hypoaldosteronism",
          "Renin และ aldosterone ต่ำ (hyporeninemic)",
          "TTKG < 5 ขณะ K สูง (ใช้ด้วยความระวัง)"
        ],
        "link": "hyperk"
      }),
      N("Acquired nephrogenic DI after obstruction", "nephro", {
        "s": "AQP2 downregulation ทำ concentrating defect ที่ฟื้นช้าหลายสัปดาห์",
        "ix": [
          "Urine osm ต่ำ, ไม่ตอบสนอง desmopressin",
          "Serum Na สูงขึ้นถ้าดื่มน้ำไม่พอ"
        ],
        "link": "polyuria"
      }),
      N("Choice of decompression", "adj", {
        "s": "PCN หรือ retrograde ureteral stent, ทั้งสองวิธีได้ผลใกล้เคียงกันใน obstructed infected kidney",
        "why": "Stent ไม่เหมาะเมื่อมี extrinsic malignant compression ที่แน่น ส่วน PCN ไม่เหมาะเมื่อมี coagulopathy",
        "ix": [
          "Coagulation และ platelet ก่อน PCN",
          "Blood และ urine culture ก่อน antibiotic"
        ],
        "std": "EAU Guidelines on Urolithiasis 2025 (emergency decompression)"
      })
    ])
  ])
};

/* ===================== HD-WATER ===================== */
TREES["hd-water"] = {
  must: [
    "ผู้ป่วยกี่รายมีอาการในรอบเดียวกัน, เครื่องเดียวกัน, โซนหรือ loop เดียวกัน (cluster คือ water หรือ dialysate จนกว่าจะพิสูจน์ได้ว่าไม่ใช่)",
    "อาการเริ่มเมื่อไรในรอบฟอก: ภายใน 30-60 นาที (pyrogen, hemolysis, dialyzer reaction) หรือเรื้อรังหลายเดือน (aluminum, microinflammation)",
    "Water treatment log: total chlorine ก่อนทุก shift, conductivity, temperature, RO rejection, การเปลี่ยน carbon และ softener regeneration",
    "เหตุการณ์ล่าสุด: น้ำประปาเปลี่ยนแหล่งหรือเปลี่ยนสารฆ่าเชื้อ, น้ำท่วม, ซ่อมท่อ, ล้างระบบด้วย disinfectant, เปลี่ยน concentrate หรือวิธีผสม",
    "ผลเพาะเชื้อ bacteria และ endotoxin เดือนล่าสุด, ผล chemical analysis ประจำปี",
    "Dialyzer reuse และสาร reprocessing",
    "อาการ: ไข้หนาวสั่น, ปวดหลังและแน่นหน้าอก, เลือดสีคล้ำในสาย, คลื่นไส้อาเจียน, ปวดศีรษะ, คัน, ชัก, สับสน, ปวดกระดูก",
    "Hb ลดลงหรือ ESA dose เพิ่มขึ้นทั้งหน่วยโดยไม่มีสาเหตุ"
  ],
  tree: N("Hemodialysis: water and dialysate-related complications", "root", {
    s: "ผู้ป่วยสัมผัสน้ำราว 300-600 ลิตรต่อสัปดาห์ผ่าน dialyzer ให้แยกตาม contaminant: microbiological (bacteria, endotoxin), oxidant (chlorine, chloramine), trace element สะสม (aluminum, fluoride, copper), hard water และ dialysate preparation error แล้วตัด dialyzer reaction กับปัญหาของผู้ป่วยรายเดียวออก",
    why: "โรคกลุ่มนี้มักเกิดเป็น cluster ในหน่วยเดียวกัน ถ้าจับได้ช้าจะมีผู้ป่วยหลายรายเสียชีวิต examiner มักถามว่าจะทำอะไรทันทีและจะตรวจน้ำอะไร",
    keys: ["Cluster ในรอบเดียวกันชี้ water หรือ dialysate", "ไข้หนาวสั่นใน 30-60 นาทีกับ blood culture ลบ: endotoxin", "Hemolysis หลายราย: chloramine, copper, nitrate, overheated หรือ hypotonic dialysate, residual disinfectant", "Encephalopathy, osteomalacia, microcytic anemia เรื้อรัง: aluminum", "คลื่นไส้อาเจียน ปวดศีรษะ BP สูง ผิวร้อน ทันทีหลังเริ่ม: hard water (Ca และ Mg สูง)", "Pruritus, nausea, VF ทันที: fluoride"],
    ix: ["หยุดฟอกในรายที่มีอาการ ถ้าสงสัย hemolysis ห้ามคืนเลือดในวงจร", "เก็บตัวอย่างน้ำและ dialysate ก่อน flush ระบบ: product water, จุดหลัง carbon, inlet ของเครื่อง, dialysate", "Total chlorine, conductivity, temperature, hardness ที่หน้างานทันที", "ผู้ป่วย: CBC, plasma free Hb, LDH, haptoglobin, K, Na, Ca, Mg, methemoglobin, blood culture", "Bacteria culture (TGEA หรือ R2A ที่ 17-23°C นาน 7 วัน) และ endotoxin (LAL)", "Chemical analysis: Al, F, Cu, Zn, NO3, SO4, Ca, Mg และ heavy metal"],
    std: "ISO 23500 series (dialysis water and dialysate quality, ฉบับปัจจุบัน 2024 แทนฉบับ 2019), AAMI water standards, European Best Practice Guidelines on dialysis fluid purity"
  }, [
    N("Microbiological contamination", "step", {
      s: "Bacteria, endotoxin และ toxin จาก biofilm ในท่อ, RO, storage tank หรือ bicarbonate concentrate",
      why: "Endotoxin และ fragment ผ่าน high-flux membrane ได้ด้วย backfiltration แม้ตัวแบคทีเรียผ่านไม่ได้ จึงทำได้ทั้ง pyrogenic reaction เฉียบพลันและ inflammation เรื้อรัง",
      keys: ["Water: bacteria < 100 CFU/mL (action 50), endotoxin < 0.25 EU/mL (action 0.125)", "Ultrapure dialysate: < 0.1 CFU/mL และ < 0.03 EU/mL", "Bicarbonate concentrate เป็นแหล่งเชื้อเจริญได้ดี ต้องผสมใหม่และไม่เก็บค้าง"],
      ix: ["ไข้ใน 30-60 นาที blood culture ลบ, หลายราย = pyrogenic reaction", "Blood culture บวกด้วย water organism (Burkholderia, Ralstonia, Pseudomonas, Stenotrophomonas, NTM) = bacteremia จาก water หรือ reuse", "CRP สูงเรื้อรังทั้งหน่วย, ESA dose เพิ่ม = microinflammation", "LFT สูงมากหลายรายพร้อมกัน = cyanotoxin"]
    }, [
      N("Pyrogenic reaction (endotoxin)", "nephro", {
        s: "Chills, fever, hypotension ภายใน 30-60 นาทีหลังเริ่มฟอก ดีขึ้นหลังหยุด, blood culture ลบ",
        why: "Endotoxin กระตุ้น cytokine ผ่าน membrane เกิดในหลายรายพร้อมกันเมื่อระบบน้ำหรือ concentrate ปนเปื้อน",
        keys: ["อาการหายภายในไม่กี่ชั่วโมงหลังหยุดฟอก", "ไม่มีไข้ก่อนเริ่มฟอก ต่างจาก CRBSI ที่มักมีไข้ก่อนฟอกหรือไข้ต่อเนื่องหลังฟอก แต่ CRBSI ก็มาด้วยไข้หนาวสั่นระหว่างฟอกได้ จึงต้อง blood culture ทุกรายก่อนสรุป"],
        ix: ["Paired blood culture (ต้องได้ผลลบจึงสรุปว่าเป็น pyrogenic reaction)", "Dialysate และ water culture, endotoxin (LAL)"],
        std: "ISO 23500 series",
        link: "hd-fever"
      }),
      N("Bacteremia from contaminated water, dialysate or reuse", "nephro", {
        s: "Gram-negative water organism หรือ NTM ในเลือดหลายราย",
        why: "เกิดจาก biofilm, dialyzer reprocessing ผิดวิธี หรือ waste handling option (WHO port) ปนเปื้อน ต้องทำ outbreak investigation",
        keys: ["เชื้อที่ไม่ใช่ skin flora", "หลายรายในเครื่องหรือ shift เดียวกัน"],
        ix: ["Blood culture, environmental culture, molecular typing ของเชื้อจากผู้ป่วยและระบบน้ำ"],
        link: "hd-fever"
      }),
      N("Chronic microinflammation from non-ultrapure dialysate", "nephro", {
        s: "CRP และ IL-6 สูง, ESA hyporesponsiveness, malnutrition, β2-microglobulin amyloid",
        why: "Endotoxin fragment ขนาดเล็กผ่าน high-flux membrane ทุกรอบ ultrapure dialysate จึงแนะนำสำหรับ high-flux HD และจำเป็นสำหรับ online HDF",
        ix: ["CRP, albumin, ESA resistance index", "Dialysate endotoxin"],
        std: "European Best Practice Guidelines (ultrapure dialysate)",
        link: "cytopenia"
      }),
      N("Cyanobacterial toxin (microcystin)", "adj", {
        s: "Visual disturbance, nausea, vomiting, acute hepatic failure หลังใช้น้ำจากแหล่งที่มี algal bloom",
        why: "เหตุการณ์ Caruaru ประเทศบราซิล 1996 มีผู้ป่วย HD เสียชีวิตหลายสิบราย เพราะน้ำดิบขนส่งด้วยรถบรรทุกและไม่ผ่าน carbon ที่เพียงพอ",
        ix: ["LFT, microcystin ในน้ำและเลือด"],
        link: "jaundice"
      })
    ]),
    N("Oxidant and chemical hemolysis", "step", {
      s: "Hemolysis หรือ methemoglobinemia หลายรายในรอบเดียวกัน",
      why: "Oxidant ใน dialysate ทำลาย RBC โดยตรง ผู้ป่วยได้รับน้ำปริมาณมากจึงเกิดพิษที่ระดับต่ำกว่าน้ำดื่มมาก",
      keys: ["ปวดหลัง แน่นหน้าอก หายใจลำบาก เลือดในสายสีคล้ำหรือ plasma สีชมพู", "Hyperkalemia จาก hemolysis เป็นสาเหตุตาย", "Pancreatitis ตามมาได้"],
      ix: ["Total chlorine > 0.1 mg/L หลัง carbon = chloramine หรือ chlorine breakthrough", "Heinz body และ methemoglobin สูง = oxidant (chloramine, nitrate, copper)", "Copper ในน้ำ > 0.1 mg/L, น้ำเป็นกรด, ท่อทองแดง = copper", "Nitrate (as N) > 2 mg/L, ใช้น้ำบาดาล = nitrate", "Residual peroxide, peracetic acid หรือ formaldehyde หลังล้างระบบ = disinfectant", "Plasma free Hb, LDH, haptoglobin, K ในผู้ป่วย"]
    }, [
      N("Chloramine and chlorine toxicity", "nephro", {
        s: "Hemolysis เฉียบพลัน หรือ anemia เรื้อรังกับ ESA resistance ทั้งหน่วย",
        why: "Chloramine ไม่ถูกกำจัดด้วย RO และต้องใช้ carbon adsorption ที่ contact time เพียงพอ ถ้า carbon อิ่มตัวหรือการประปาเปลี่ยนจาก chlorine เป็น chloramine จะ breakthrough",
        keys: ["Total chlorine ใน product water ≤ 0.1 mg/L", "ตรวจก่อนทุก shift และใช้ carbon สองถังต่อกัน (worker และ polisher)", "Heinz body anemia"],
        ix: ["Total chlorine หลัง carbon ถังแรกและถังที่สอง", "Methemoglobin, Heinz body, haptoglobin"],
        std: "ISO 23500 series (total chlorine ≤ 0.1 mg/L)",
        link: "cytopenia"
      }),
      N("Copper, nitrate and zinc", "nephro", {
        s: "Copper: hemolysis, liver injury, ไข้, Nitrate: methemoglobinemia และ hemolysis, Zinc: anemia, nausea, fever",
        why: "Copper ละลายจากท่อหรืออุปกรณ์เมื่อน้ำเป็นกรด (เช่น หลัง deionizer exhaustion), nitrate มาจากน้ำบาดาลที่ปนเปื้อนปุ๋ย, zinc มาจากท่อ galvanized",
        ix: ["Copper ≤ 0.1, nitrate (as N) ≤ 2, zinc ≤ 0.1 mg/L ใน product water", "Methemoglobin, serum copper, ceruloplasmin"],
        std: "ISO 23500 series"
      }),
      N("Residual disinfectant", "nephro", {
        s: "Hemolysis หรือ dialyzer reaction-like symptoms ในรอบแรกหลังล้างระบบน้ำหรือเครื่อง",
        why: "Peracetic acid, hydrogen peroxide, formaldehyde หรือ hypochlorite ตกค้างเพราะ rinse ไม่พอหรือไม่ได้ทดสอบ residual ก่อนใช้",
        ix: ["Residual test strip ก่อนเริ่มฟอก", "ตรวจขั้นตอนล้างและ log"],
        link: "hd-idh"
      })
    ]),
    N("Trace element accumulation", "step", {
      s: "พิษสะสมเรื้อรังหรือเฉียบพลันจาก element ที่ RO หรือ deionizer กำจัดไม่ได้เมื่อระบบเสีย",
      why: "ไตไม่ขับ element เหล่านี้ และ dialysate ทำให้เกิด diffusion เข้าสู่ร่างกายต่อเนื่อง อาการจึงเรื้อรังและสับสนกับ uremia",
      keys: ["Aluminum: encephalopathy, osteomalacia, microcytic anemia", "Fluoride: pruritus, nausea, VF เฉียบพลันหลายราย", "Lead, arsenic, cadmium: anemia, neuropathy, ปวดท้อง"],
      ix: ["Serum aluminum, DFO test", "Serum fluoride, K", "Blood lead, heavy metal screen", "Chemical analysis ของ product water: Al ≤ 0.01, F ≤ 0.2, Pb ≤ 0.005 mg/L"]
    }, [
      N("Aluminum toxicity", "nephro", {
        s: "Dialysis encephalopathy (speech disturbance, myoclonus, seizure, dementia), aluminum bone disease (osteomalacia, fracture), microcytic anemia ที่ไม่ตอบสนองต่อ iron",
        why: "มาจากน้ำที่ใช้ aluminum sulfate (alum) ในการตกตะกอนและผ่าน RO ไม่ดี หรือจาก aluminum-containing binder และ citrate ที่ได้ร่วมกันเพิ่มการดูดซึม aluminum ทางลำไส้",
        keys: ["PTH ต่ำ, ALP ปกติ, hypercalcemia หลังให้ Ca หรือ vitamin D", "Microcytosis โดย ferritin ปกติ", "หลายรายในหน่วยเดียวกัน"],
        ix: ["Serum Al (เป้า < 20 µg/L, > 60 µg/L ชี้ body burden สูง)", "DFO test: Al เพิ่ม ≥ 50 µg/L (ไม่ทำ DFO test ถ้า serum Al > 200 µg/L เพราะเสี่ยง neurotoxicity)", "Bone biopsy: aluminum stain ที่ mineralization front", "EEG ใน encephalopathy"],
        std: "KDOQI 2003 bone metabolism and disease in CKD, ISO 23500 series (Al ≤ 0.01 mg/L)",
        link: "hd-mbd"
      }),
      N("Fluoride intoxication", "nephro", {
        s: "Pruritus, nausea, vomiting, headache แล้วตามด้วย VF และ cardiac arrest ในหลายรายระหว่างฟอก",
        why: "Fluoride ในน้ำประปาถูกปล่อยออกจาก deionizer ที่อิ่มตัวในปริมาณมาก ทำ hypocalcemia และ hyperkalemia จากการเปิด K channel ของเซลล์",
        keys: ["หลายรายพร้อมกันทันทีหลังเริ่ม", "K สูงและ Ca ต่ำ"],
        ix: ["Serum fluoride, K, ionized Ca", "Fluoride ใน product water ≤ 0.2 mg/L"],
        std: "ISO 23500 series",
        link: "hyperk"
      }),
      N("Lead, arsenic and other heavy metals", "adj", {
        s: "Anemia, neuropathy, abdominal pain, encephalopathy",
        why: "มาจากท่อเก่า บัดกรี หรือน้ำบาดาล ปกติ RO กำจัดได้ ถ้าเกิดต้องหาจุดที่ระบบล้มเหลว",
        ix: ["Blood lead, arsenic, heavy metal ใน product water"],
        link: "abdpain"
      })
    ]),
    N("Hardness and dialysate preparation error", "step", {
      s: "ความผิดพลาดของ softener, proportioning, concentrate หรือ heater",
      why: "อาการเกิดทันทีหลังเริ่มฟอก และมักเกิดในเครื่องเดียวหรือรอบเดียว ขึ้นกับว่าจุดผิดพลาดอยู่ที่ระบบกลางหรือเครื่อง",
      keys: ["คลื่นไส้ อาเจียน ปวดศีรษะ BP สูง ผิวร้อนแดง อ่อนแรง: hard water", "Hemolysis หรือชักเมื่อ Na ผิด", "อาการเฉพาะเครื่องเดียว: proportioning หรือ heater ของเครื่องนั้น"],
      ix: ["Ca และ Mg ในผู้ป่วยสูง, product water Ca > 2 หรือ Mg > 4 mg/L = hard water", "Serum Na, dialysate conductivity = concentrate หรือ proportioning error", "Dialysate temperature > 42°C = overheated", "HCO3 ในผู้ป่วยผิดปกติมาก = bicarbonate หรือ acid concentrate ผิด", "K ผิดปกติ = K bath ผิด"]
    }, [
      N("Hard water syndrome", "nephro", {
        s: "Nausea, vomiting, headache, burning skin, flushing, hypertension, weakness จาก hypercalcemia และ hypermagnesemia เฉียบพลัน",
        why: "Softener ไม่ได้ regenerate หรือ brine หมด Ca และ Mg ผ่านไปยัง RO จนเกินความสามารถ",
        ix: ["Serum Ca, Mg ระหว่างฟอก", "Hardness test ของน้ำหลัง softener"],
        std: "ISO 23500 series (Ca ≤ 2, Mg ≤ 4 mg/L)",
        link: "hyperca"
      }),
      N("Dialysate sodium error (hypotonic or hypertonic)", "nephro", {
        s: "Hypotonic dialysate: hemolysis, cramp, seizure, Hypertonic dialysate: thirst, headache, hypertension, hypernatremia",
        why: "Concentrate หมด ต่อผิด หรือ proportioning และ conductivity monitor เสีย",
        ix: ["Serum Na, plasma free Hb", "Dialysate conductivity และ Na"],
        link: "hypona"
      }),
      N("Overheated dialysate", "nephro", {
        s: "Hemolysis เฉียบพลันเมื่อ dialysate อุ่นเกินราว 42°C",
        why: "Heater หรือ temperature alarm เสีย มักเป็นเครื่องเดียว",
        ix: ["Dialysate temperature log, plasma free Hb"],
        link: "hd-idh"
      }),
      N("Bicarbonate, acid concentrate and potassium bath errors", "nephro", {
        s: "Severe alkalosis หรือ acidosis, arrhythmia จาก K bath ผิด, bacterial growth ใน bicarbonate concentrate",
        why: "ผสมผิดสัดส่วน ใช้ concentrate ผิดชนิด หรือเก็บ bicarbonate ไว้นานจน CO2 หายไปและเชื้อเจริญ",
        ix: ["Blood gas, K ระหว่างและหลังฟอก", "ตรวจ label และ lot ของ concentrate"],
        link: "metalk"
      })
    ]),
    N("Not the water: patient and dialyzer causes", "step", {
      s: "สาเหตุที่ให้อาการคล้ายกันแต่เกิดเฉพาะผู้ป่วยรายเดียว",
      why: "ถ้าเกิดรายเดียวและระบบน้ำปกติ ให้คิดถึง dialyzer, circuit หรือผู้ป่วยก่อน",
      keys: ["รายเดียว", "Water และ dialysate test ปกติ"],
      ix: ["Tryptase (type A reaction)", "Blood culture (CRBSI)", "ตรวจ bloodline หัก พับ หรือ needle เล็กเกิน (mechanical hemolysis)"]
    }, [
      N("Dialyzer reaction type A and type B", "adj", {
        s: "Type A ใน 5-30 นาทีแรก anaphylaxis, type B อาการน้อยกว่าและดีขึ้นแม้ฟอกต่อ",
        ix: ["Tryptase, เปลี่ยนชนิด dialyzer หรือวิธี sterilization"],
        link: "hd-idh"
      }),
      N("Mechanical hemolysis from the blood circuit", "adj", {
        s: "Bloodline หักพับ, needle เล็ก, blood pump ผิดปกติ, เกิดรายเดียว",
        ix: ["ตรวจ circuit และ arterial pressure"],
        link: "hd-idh"
      }),
      N("Catheter-related bloodstream infection", "adj", {
        s: "ไข้ก่อนหรือหลังฟอกต่อเนื่อง, blood culture บวก, มี catheter",
        ix: ["Paired blood culture"],
        link: "hd-fever"
      })
    ])
  ])
};
