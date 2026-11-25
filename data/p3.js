/* Phase 3 Transplant and dialysis trees. Same node schema as data/p1.js. */

/* ===================== KT: IMMEDIATE GRAFT DYSFUNCTION ===================== */
TREES["kt-immediate"] = {
  must: [
    "Donor: living vs deceased (DBD, DCD), donor age, KDPI, terminal Cr, cold ischemia time, warm ischemia time",
    "Recipient: PRA, DSA ก่อนปลูกถ่าย, crossmatch (CDC, flow, virtual), ABO-incompatible, previous transplant, pregnancy, transfusion",
    "Intraoperative: vascular anastomosis, ปัสสาวะออกบนโต๊ะผ่าตัดไหม, BP ระหว่างผ่าตัด, hypotension",
    "Urine output ชั่วโมงต่อชั่วโมง, ปัสสาวะหยุดทันทีหลังเคยออก (vascular หรือ obstruction)",
    "Drain output และสี, ปวดหรือบวมที่ graft, hematuria",
    "Induction (ATG, basiliximab), CNI level, volume status",
    "Native disease: primary FSGS, aHUS, C3G, PH1",
    "Native urine output ก่อนปลูกถ่าย (แยก graft urine จาก native urine)"
  ],
  tree: N("Transplant: immediate graft dysfunction", "root", {
    s: "Graft dysfunction ในสัปดาห์แรก: เริ่มด้วยตรวจ catheter และทำ graft Doppler ภายในไม่กี่ชั่วโมง แล้วแยก vascular, urologic, DGF หรือ ATN, hyperacute rejection และ early recurrence",
    why: "Vascular thrombosis และ urine leak ต้องผ่าตัดเร่งด่วน ส่วน DGF เป็น diagnosis of exclusion ที่ต้อง biopsy ถ้าไม่ฟื้นใน 7-10 วัน",
    keys: ["Abrupt anuria หลังเคยมีปัสสาวะ: thrombosis หรือ obstruction", "นิยาม DGF ที่ใช้บ่อยที่สุด: ต้อง dialysis ภายใน 7 วันแรกหลัง KT", "Drain Cr สูงกว่า serum มาก: urine leak", "Absent diastolic flow หรือ reversed diastolic flow: ให้คิดถึง renal vein thrombosis ก่อน แต่ไม่จำเพาะ พบได้ใน severe rejection, severe ATN และ graft ถูกกดจาก collection"],
    ix: ["Bladder scan, flush catheter", "Graft US with Doppler (RI, flow, collection, hydronephrosis)", "Drain fluid Cr", "DSA, CNI trough, CBC, LDH, smear", "Graft biopsy ถ้า DGF > 7-10 วันหรือสงสัย rejection"],
    std: "Banff 2022 classification, KDIGO 2009 KT recipient care"
  }, [
    N("Vascular", "step", {
      s: "Doppler ไม่มี flow หรือ reversed diastolic flow",
      why: "โอกาส salvage graft มีเฉพาะเมื่อวินิจฉัยและผ่าตัดแก้ไขภายในไม่กี่ชั่วโมง",
      keys: ["Sudden anuria", "Graft tender บวม", "Hematuria ใน RVT"]
    }, [
      N("Renal artery thrombosis", "nephro", {
        s: "Anuria ทันที ไม่มี arterial flow",
        why: "Technical, multiple arteries, atherosclerotic donor, hypercoagulable, hypotension",
        ix: ["Doppler, urgent surgical exploration"]
      }),
      N("Renal vein thrombosis", "nephro", {
        s: "Graft บวมเจ็บ hematuria reversed diastolic flow",
        why: "Kinking, compression จาก collection, hypercoagulable (APS, nephrotic recipient)",
        ix: ["Doppler, aPL"],
        link: "thrombosis"
      }),
      N("Hyperacute / accelerated ABMR with vascular thrombosis", "nephro", {
        s: "Graft dysfunction ภายในนาทีถึงวันจาก preformed DSA",
        why: "พบน้อยมากในยุค crossmatch ปัจจุบัน แต่ยังเกิดได้จาก non-HLA antibody หรือการให้ ABO-incompatible graft โดยผิดพลาด crossmatch ลบจึงไม่ตัดภาวะนี้ทั้งหมด",
        ix: ["DSA, biopsy C4d, MVI"]
      })
    ]),
    N("Urologic / surgical", "step", {
      s: "Hydronephrosis, collection หรือ drain output ผิดปกติ",
      keys: ["Drain Cr", "Hydronephrosis", "Collection"]
    }, [
      N("Urine leak", "nephro", {
        s: "Drain output เพิ่ม, Cr ไม่ลด, ปวดท้อง",
        why: "Ureteric necrosis ที่ distal ureter จาก ischemia, serum Cr ไม่ลดหรือสูงขึ้นจากการดูดซึม urine ที่รั่วกลับเข้าร่างกาย (pseudo-AKI)",
        ix: ["Drain fluid Cr เทียบ serum, cystogram, nuclear scan"]
      }),
      N("Ureteric obstruction", "nephro", {
        s: "Hydronephrosis, Cr ไม่ลด",
        why: "Kink, clot, edema ที่ anastomosis, stent malposition",
        ix: ["US, nephrostogram"],
        link: "oliguria"
      }),
      N("Perigraft collection: hematoma, urinoma, lymphocele", "nephro", {
        s: "Collection กดทับ graft หรือ ureter",
        why: "ในสัปดาห์แรกมักเป็น hematoma หรือ urinoma ส่วน lymphocele มักเกิดหลัง 2 สัปดาห์ถึงหลายเดือน และพบมากขึ้นกับ mTOR inhibitor",
        ix: ["US, aspirate Cr, K, triglyceride และ cell count: urinoma Cr สูงกว่า serum มาก, lymphocele Cr และ K ใกล้ serum, chylous TG สูง, collection ติดเชื้อมี PMN และ culture บวก"]
      }),
      N("Catheter blockage / bleeding", "adj", {
        s: "Clot retention หรือ Hb ลดกับ hematoma",
        ix: ["Flush catheter, Hb, US"]
      })
    ]),
    N("Delayed graft function", "step", {
      s: "Parenchymal ATN จาก ischemia-reperfusion",
      why: "DGF สัมพันธ์กับ acute rejection ที่มากขึ้นและ long-term graft survival ที่ลดลง และบดบัง rejection ได้ จึงต้อง biopsy ถ้าไม่ฟื้น",
      keys: ["DCD, cold ischemia > 18-24 ชั่วโมง, donor อายุมาก, KDPI สูง", "Doppler flow ปกติ RI อาจสูง"]
    }, [
      N("Ischemic ATN", "nephro", {
        s: "Oliguric graft ที่ vascular และ urologic ปกติ",
        why: "หลีกเลี่ยง volume overload และ nephrotoxin, dialysis ตามข้อบ่งชี้",
        ix: ["Doppler, biopsy ถ้าไม่ฟื้นใน 7-10 วัน"]
      }),
      N("CNI vasoconstriction / thrombotic microangiopathy", "nephro", {
        s: "Graft dysfunction จาก CNI มักพบเมื่อ level สูง แต่ level ในช่วงเป้าหมายไม่ตัด CNI toxicity หรือ TMA",
        ix: ["CNI trough, smear, LDH, biopsy"],
        link: "tma"
      }),
      N("Hypovolemia / hypotension", "nephro", {
        s: "Prerenal graft dysfunction",
        ix: ["Volume assessment, BP target"]
      })
    ]),
    N("Early immunologic", "step", {
      s: "Rejection ในสัปดาห์แรก",
      keys: ["Sensitized recipient", "DSA ใหม่หรือเพิ่ม", "Biopsy"]
    }, [
      N("Early active ABMR", "nephro", {
        s: "Sensitized, previous transplant, pregnancy, memory response",
        why: "PLEX, IVIG, steroid เป็นการรักษาหลัก",
        ix: ["DSA MFI, biopsy MVI และ C4d"],
        std: "Banff 2022 ABMR criteria",
        link: "kt-early"
      }),
      N("Early TCMR", "nephro", {
        s: "Interstitial inflammation กับ tubulitis",
        ix: ["Biopsy Banff i และ t score"],
        link: "kt-early"
      })
    ]),
    N("Early recurrent disease", "step", {
      s: "Recurrence ภายในชั่วโมงถึงวัน",
      keys: ["Native disease", "Nephrotic proteinuria ใน graft ใหม่", "MAHA"]
    }, [
      N("Recurrent primary FSGS", "nephro", {
        s: "Massive proteinuria ภายในชั่วโมงถึงวัน",
        why: "Recurrence ราว 30-50% และสูงขึ้นมากถ้า graft แรกเสียจาก recurrence รักษาด้วย PLEX ร่วมหรือไม่ร่วม rituximab",
        ix: ["UPCR ทุกวันในสัปดาห์แรก, biopsy: ระยะแรก LM อาจปกติ ต้องดู foot process effacement บน EM"],
        link: "nephrotic"
      }),
      N("Recurrent aHUS", "nephro", {
        s: "TMA ใน graft",
        why: "CFH variant recurrence สูงมาก ต้อง C5 inhibitor prophylaxis",
        ix: ["Smear, LDH, complement genetics ก่อน KT"],
        std: "KDIGO 2017 aHUS",
        link: "tma"
      }),
      N("Primary hyperoxaluria / APRT deficiency", "nephro", {
        s: "Crystal nephropathy ใน graft ใหม่",
        ix: ["Plasma oxalate, biopsy crystal"],
        link: "stone"
      })
    ])
  ])
};

/* ===================== KT: EARLY GRAFT DYSFUNCTION ===================== */
TREES["kt-early"] = {
  must: [
    "เวลาหลัง KT, baseline Cr หลังผ่าตัด, tempo ของ Cr ที่ขึ้น",
    "IS: induction, tacrolimus trough trend, MMF dose, steroid, adherence",
    "Drug interaction: azole, macrolide, diltiazem, verapamil, rifampicin, phenytoin, carbamazepine, ยาสมุนไพร, grapefruit",
    "DSA ก่อนและหลัง KT, PRA, HLA mismatch",
    "Fever, dysuria, diarrhea (tacrolimus level ขึ้นเมื่อท้องเสีย)",
    "CMV และ BK monitoring ล่าสุด, prophylaxis ที่ได้",
    "BP ใหม่ที่สูง, edema, bruit เหนือ graft",
    "Volume: GI loss, diuretic, poor intake"
  ],
  tree: N("Transplant: early graft dysfunction", "root", {
    s: "Cr ขึ้นในช่วงหลังสัปดาห์แรกถึงราว 3-6 เดือนหลัง KT: แยก prerenal, CNI toxicity, rejection, infection และ surgical cause ด้วย CNI level, US Doppler, DSA, BK และ biopsy",
    why: "Rejection, CNI toxicity และ BK nephropathy แยกกันไม่ได้ด้วย clinical และ lab อย่างเดียว ต้องใช้ biopsy ตัดสิน และพบร่วมกันได้",
    keys: ["Cr ขึ้น > 20-25% จาก baseline ต้อง workup", "CNI level สูงไม่ได้ตัด rejection", "Hydronephrosis, collection, TRAS ดูจาก Doppler"],
    ix: ["CNI trough, UA, urine culture, UPCR", "Graft US Doppler", "DSA (MFI), BK plasma PCR, CMV QNAT", "Graft biopsy (Banff), รวม SV40 และ C4d"],
    std: "Banff 2022 classification, KDIGO 2009 KT recipient care"
  }, [
    N("Prerenal / hemodynamic", "step", {
      s: "Volume depletion หรือ vasoconstriction",
      keys: ["Diarrhea", "Diuretic", "CNI level สูง"]
    }, [
      N("Volume depletion", "nephro", {
        s: "Diarrhea (MMF, CMV, norovirus), poor intake, diuretic",
        why: "Diarrhea ยังทำให้ tacrolimus level สูงขึ้น เพราะ P-gp และ CYP3A4 ที่ผนังลำไส้ทำงานลดลง",
        ix: ["Volume status, tacrolimus level"],
        link: "diarrhea"
      }),
      N("Acute CNI nephrotoxicity", "nephro", {
        s: "Afferent vasoconstriction, dose-dependent, reversible",
        why: "Biopsy อาจปกติ (functional vasoconstriction) หรือพบ isometric vacuolization ของ tubule, arteriolar myocyte vacuolization หรือ TMA ซึ่งไม่จำเพาะต่อ CNI",
        keys: ["Tremor, hyperkalemia, hypomagnesemia, HTN ร่วม", "Drug interaction ที่เพิ่ม level"],
        ix: ["Tacrolimus trough, drug review, biopsy"],
        link: "tremor"
      }),
      N("Transplant renal artery stenosis", "nephro", {
        s: "HTN ใหม่ดื้อยา, fluid retention, Cr ขึ้นเมื่อได้ ACEi, bruit",
        why: "มักเกิด 3 เดือนถึง 2 ปี angioplasty กับ stent ได้ผลดี",
        ix: ["Doppler: PSV > 200-250 cm/s, tardus parvus distal", "CTA หรือ angiography"]
      })
    ]),
    N("Rejection", "step", {
      s: "Biopsy-proven TCMR หรือ ABMR",
      keys: ["Adherence", "IS level ต่ำ", "dnDSA"],
      std: "Banff 2022"
    }, [
      N("Acute TCMR", "nephro", {
        s: "Interstitial inflammation (i ≥ 2) กับ tubulitis (t ≥ 2) หรือ intimal arteritis (v)",
        why: "Grade IA-IB ให้ pulse methylprednisolone ก่อน ส่วนใหญ่ตอบสนอง ถ้า steroid-resistant ให้ ATG, grade II-III (v lesion) รักษาด้วย ATG โดยมักให้ร่วมกับ pulse steroid",
        ix: ["Biopsy, SV40 เพื่อแยก BKVAN ซึ่งมี tubulitis เลียนแบบ TCMR (SV40 ลบใน core เดียวไม่ตัด เพราะ lesion เป็น focal)"]
      }),
      N("Active ABMR", "nephro", {
        s: "MVI (g + ptc ≥ 2), C4d บน PTC, DSA โดย C4d ลบไม่ตัด ABMR (C4d-negative ABMR)",
        why: "Banff 2022 เพิ่ม category probable ABMR และ MVI ที่ DSA ลบ C4d ลบ, รักษาด้วย PLEX, IVIG และ steroid",
        ix: ["DSA MFI, biopsy C4d"]
      }),
      N("Mixed rejection / borderline", "nephro", {
        s: "Borderline changes หรือ TCMR ร่วม ABMR",
        ix: ["Biopsy, DSA"]
      })
    ]),
    N("Infection", "step", {
      s: "Infection ที่ทำให้ graft dysfunction",
      keys: ["BK", "CMV", "Graft pyelonephritis"]
    }, [
      N("BK polyomavirus nephropathy", "nephro", {
        s: "Cr ขึ้นช้าๆ ส่วนใหญ่ใน 3-12 เดือนแรก แต่เกิดหลังจากนั้นได้",
        why: "ลด IS เป็นการรักษาหลัก ไม่มี antiviral ที่ได้ผลชัด",
        keys: ["Plasma BK DNA > 1,000 copies/mL นานเกิน 2 สัปดาห์ = probable BKVAN, > 10,000 copies/mL = presumptive BKVAN", "Decoy cells ใน urine ใช้ screen: ไม่จำเพาะ (PPV ต่ำ พบใน JC virus ได้) ไม่ใช่การวินิจฉัย BKVAN"],
        ix: ["Plasma BK PCR ทุกเดือนถึงเดือนที่ 9 แล้วทุก 3 เดือนถึง 2 ปี", "Biopsy SV40 (lesion เป็น focal ควรได้อย่างน้อย 2 cores รวม medulla, SV40 ลบไม่ตัด BKVAN)"],
        std: "AST IDCOP 2019, 2024 Second International Consensus on BK polyomavirus"
      }),
      N("Graft pyelonephritis", "nephro", {
        s: "Fever, graft tenderness, pyuria",
        why: "VUR เข้า graft และ ureteric stent เพิ่ม risk",
        ix: ["Urine และ blood culture, US"],
        link: "kt-fever"
      }),
      N("CMV disease / adenovirus", "nephro", {
        s: "CMV nephritis พบน้อย แต่ CMV infection สัมพันธ์กับ rejection ที่มากขึ้น ส่วน adenovirus ทำ hemorrhagic cystitis และ tubulointerstitial nephritis",
        ix: ["CMV QNAT, adenovirus PCR"],
        link: "kt-fever"
      })
    ]),
    N("Surgical / urologic", "step", {
      s: "Hydronephrosis หรือ collection",
      keys: ["US", "Stent"]
    }, [
      N("Ureteric stenosis", "nephro", {
        s: "Hydronephrosis ช่วงสัปดาห์ถึงเดือน",
        why: "Ischemic distal ureter, BK ureteritis, rejection",
        ix: ["US, nephrostogram"],
        link: "kt-urine"
      }),
      N("Lymphocele", "nephro", {
        s: "Collection กด ureter หรือ iliac vein ทำให้ขาบวม",
        why: "พบมากขึ้นกับ sirolimus",
        ix: ["US, aspirate Cr ใกล้ serum"]
      })
    ]),
    N("Recurrent and de novo disease", "step", {
      s: "Proteinuria หรือ hematuria ใหม่",
      keys: ["Native disease"]
    }, [
      N("Recurrent GN", "nephro", {
        s: "FSGS, aHUS, C3G, MN, IgAN",
        ix: ["UPCR, biopsy with IF และ EM"],
        link: "kt-urine"
      }),
      N("Drug-induced: TMP-SMX AIN, crystal (acyclovir)", "nephro", {
        s: "Drug-related graft injury",
        why: "แยกจาก trimethoprim ที่ทำให้ serum Cr ขึ้นเล็กน้อยจากการยับยั้ง tubular secretion โดย GFR ไม่ลด",
        ix: ["Drug review, biopsy"],
        link: "pyuria"
      })
    ])
  ])
};

/* ===================== KT: LATE GRAFT DYSFUNCTION ===================== */
TREES["kt-late"] = {
  must: [
    "Adherence: missed dose, ค่ายา, refill, เปลี่ยนยี่ห้อ, tacrolimus level variability",
    "IS minimization หรือ withdrawal ที่ผ่านมา เพราะ infection, malignancy หรือ side effect",
    "DSA trend และ dnDSA",
    "Proteinuria เพิ่ม, HTN, edema",
    "Native disease และ recurrence risk",
    "Infection: BK ช่วงแรก, UTI ซ้ำ",
    "Lymphadenopathy, weight loss, fever (PTLD)",
    "Cardiovascular disease, PTDM, ยา nephrotoxic"
  ],
  tree: N("Transplant: late graft dysfunction", "root", {
    s: "Graft dysfunction หลังปีแรก: biopsy เพื่อแยก chronic active ABMR, late TCMR, BKVAN, recurrent GN, CNI toxicity และ IFTA จากสาเหตุอื่น",
    why: "Chronic active ABMR จาก dnDSA ซึ่งมักตามหลัง non-adherence หรือ under-immunosuppression เป็นสาเหตุหลักของ death-censored late graft loss (ถ้านับรวมทั้งหมด death with functioning graft ยังพบบ่อยที่สุด) คำว่า chronic allograft nephropathy เลิกใช้แล้ว",
    keys: ["dnDSA โดยเฉพาะ class II DQ", "Proteinuria > 1 g/วัน", "Tacrolimus intrapatient variability สูง (CV > 30%)", "Transplant glomerulopathy (cg) บน biopsy"],
    ix: ["CNI trough และ variability, DSA", "UPCR, UA, BK PCR", "Graft US Doppler", "Graft biopsy with EM"],
    std: "Banff 2022, KDIGO 2009 KT recipient care"
  }, [
    N("Immunologic", "step", {
      s: "Rejection ระยะยาว",
      keys: ["Adherence", "Under-immunosuppression"]
    }, [
      N("Chronic active ABMR", "nephro", {
        s: "Transplant glomerulopathy (cg), PTC multilayering, MVI, dnDSA",
        why: "ไม่มีการรักษาที่พิสูจน์ได้ชัด เน้น adherence และ optimize tacrolimus ส่วน felzartamab (anti-CD38) ยังอยู่ในการศึกษา phase 3 และ clazakizumab (anti-IL-6) ใน IMAGINE phase 3 ถูกหยุดก่อนกำหนดเพราะไม่เห็นประโยชน์ต่อ eGFR",
        keys: ["Proteinuria และ HTN", "Double contour บน LM, GBM multilayering บน EM", "cg ไม่จำเพาะต่อ ABMR: พบใน chronic TMA, HCV และ recurrent MPGN ได้ ต้องดู DSA, C4d และ MVI ประกอบ"],
        ix: ["DSA, biopsy EM"],
        std: "Banff 2022",
        link: "kt-urine"
      }),
      N("Late TCMR after IS minimization", "nephro", {
        s: "Rejection หลังลด IS หรือ non-adherence",
        ix: ["Biopsy, CNI level"]
      }),
      N("Non-adherence", "nephro", {
        s: "สาเหตุที่พบบ่อยที่สุดของ late rejection โดยเฉพาะในวัยรุ่น",
        why: "ถาม barrier: ค่าใช้จ่าย, side effect, complexity, depression, เปลี่ยน generic",
        ix: ["Tacrolimus level variability, pharmacy refill"]
      })
    ]),
    N("Infection and malignancy", "step", {
      s: "Over-immunosuppression",
      keys: ["BK", "PTLD"]
    }, [
      N("BK polyomavirus nephropathy", "nephro", {
        s: "BKVAN หลังปีแรกพบน้อยกว่าช่วงปีแรก แต่ยังเกิดได้ โดยเฉพาะหลังเพิ่ม IS หรือรักษา rejection",
        ix: ["BK plasma PCR, biopsy SV40"],
        link: "kt-early"
      }),
      N("PTLD involving graft", "nephro", {
        s: "Graft mass หรือ infiltration",
        ix: ["EBV PCR, PET/CT, biopsy"],
        link: "lymphnode"
      }),
      N("Recurrent pyelonephritis / VUR into graft", "nephro", {
        s: "Repeated UTI ทำ graft scarring",
        ix: ["VCUG, urine culture"],
        link: "stone"
      })
    ]),
    N("Recurrent and de novo glomerular disease", "step", {
      s: "Proteinuria หรือ hematuria กับ graft dysfunction",
      keys: ["Native disease"]
    }, [
      N("Recurrent IgAN / MN / C3G / LN / ANCA", "nephro", {
        s: "Recurrence ตามเวลาของแต่ละโรค",
        why: "IgAN recurrence ทาง histology พบบ่อย แต่ส่วนน้อยที่ทำให้ graft loss, MN ราว 30-40% สัมพันธ์กับ anti-PLA2R ก่อน KT, LN และ ANCA recurrence ต่ำ",
        ix: ["Biopsy IF, anti-PLA2R"],
        link: "kt-urine"
      }),
      N("De novo MN / DKD (PTDM) / TMA", "nephro", {
        s: "Disease ที่เกิดใหม่หลัง KT",
        why: "PTDM จาก tacrolimus และ steroid ทำ DKD ใน graft",
        ix: ["HbA1c, biopsy"],
        link: "nephrotic"
      })
    ]),
    N("Non-immunologic", "step", {
      s: "IFTA จากสาเหตุอื่น",
      keys: ["CNI", "Vascular", "Donor quality"]
    }, [
      N("Chronic CNI nephrotoxicity", "nephro", {
        s: "Nodular arteriolar hyalinosis, striped fibrosis",
        why: "พิจารณา convert เป็น belatacept ได้เฉพาะผู้ที่ EBV seropositive หลักฐานหลักมาจากการใช้แบบ de novo: BENEFIT (n = 666, belatacept เทียบ cyclosporine) ที่ 7 ปี eGFR สูงกว่า และ death or graft loss ลดลง 43% (HR 0.57) โดยมี early acute rejection มากกว่า",
        ix: ["Biopsy, CNI level"],
        std: "BENEFIT 7-year (NEJM 2016)"
      }),
      N("TRAS / atherosclerotic donor artery", "nephro", {
        s: "HTN ดื้อยา กับ Cr ขึ้น",
        ix: ["Doppler, CTA"],
        link: "kt-early"
      }),
      N("Donor-derived disease / hypertensive or diabetic injury", "nephro", {
        s: "Donor อายุมาก, HTN, KDPI สูง",
        ix: ["Implant biopsy เทียบ"]
      }),
      N("Obstruction: ureteric stricture, stone, BPH", "nephro", {
        s: "Late hydronephrosis",
        ix: ["US"],
        link: "kt-urine"
      })
    ])
  ])
};

/* ===================== KT: FEVER AND OPPORTUNISTIC INFECTION ===================== */
TREES["kt-fever"] = {
  must: [
    "เวลาหลัง KT, induction (ATG หรือ basiliximab), rejection treatment ล่าสุด",
    "CMV serostatus D/R, EBV D/R, prophylaxis ที่ได้และหยุดเมื่อไร (valganciclovir, TMP-SMX, isoniazid)",
    "Exposure: TB, ทำนาสวน (melioidosis, leptospirosis), สัตว์เลี้ยง, ดินและน้ำ (nocardia, fungus), เดินทาง",
    "อาการเฉพาะที่: ไอ, ท้องเสีย, ปวดศีรษะ, ปัสสาวะแสบ, แผลผ่าตัด, graft tenderness",
    "Donor-derived infection, donor หรือ organ เพิ่งมีปัญหา",
    "Strongyloides screen ก่อน KT",
    "Lymphadenopathy, LDH, weight loss (PTLD)",
    "ยาใหม่ (drug fever), ATG infusion"
  ],
  tree: N("Transplant: fever and opportunistic infection", "root", {
    s: "ใช้ timeline หลัง KT และ net state of immunosuppression ทำนายเชื้อ แล้วแยก infection, rejection, PTLD และ drug fever",
    why: "ผู้ป่วย KT ที่ติดเชื้ออาจมีไข้และอาการน้อยกว่าคนทั่วไปเพราะ IS ไม่มีไข้จึงไม่ตัด infection และการรักษา infection มักต้องลด IS ซึ่งเพิ่ม rejection risk เป็นสมดุลที่ examiner ชอบถาม",
    keys: ["< 1 เดือน: nosocomial, surgical, donor-derived", "1-12 เดือน: CMV, BK, PJP, TB, fungal, nocardia, toxoplasma", "> 12 เดือน: community-acquired, late CMV, PTLD, cryptococcus", "Timeline เป็นแนวโน้ม ไม่ใช่กฎ: prophylaxis เลื่อน CMV และ PJP ไปหลังหยุดยา หลังรักษา rejection ให้นับ timeline ใหม่ และ community-acquired infection กับ TB เกิดได้ทุกช่วง"],
    ix: ["Blood culture, urine culture, CXR หรือ CT chest", "CMV QNAT, EBV PCR, BK PCR", "Beta-D-glucan, galactomannan, cryptococcal antigen", "LDH, graft US, collection aspirate"],
    std: "Fishman timeline, AST IDCOP 2019"
  }, [
    N("Early (< 1 month)", "step", {
      s: "Infection ที่สัมพันธ์กับการผ่าตัดและ hospital",
      keys: ["Wound", "Line", "Collection"]
    }, [
      N("Surgical site / infected collection", "nephro", {
        s: "Wound infection, infected lymphocele หรือ urinoma",
        ix: ["US, aspirate culture"]
      }),
      N("Graft pyelonephritis / catheter-associated UTI", "nephro", {
        s: "Fever, graft tender, pyuria",
        why: "Ureteric stent และ Foley เพิ่ม risk, MDR organism พบบ่อย",
        ix: ["Urine และ blood culture"]
      }),
      N("Donor-derived infection", "nephro", {
        s: "Infection ที่ไม่คาดคิดในหลาย recipient จาก donor เดียวกัน",
        ix: ["ติดต่อ procurement organization"]
      }),
      N("C. difficile / line infection / pneumonia", "adj", {
        s: "Nosocomial infection",
        ix: ["Culture, toxin"]
      })
    ]),
    N("Intermediate (1-12 months): opportunistic", "step", {
      s: "Peak immunosuppression",
      keys: ["CMV", "PJP", "TB", "Fungal"]
    }, [
      N("CMV infection and disease", "nephro", {
        s: "Fever, leukopenia, thrombocytopenia, transaminitis, GI disease, pneumonitis",
        why: "D+/R- risk สูงสุด, valganciclovir prophylaxis 6 เดือนใน D+/R- และ 3 เดือนใน R+, ใน D+/R- letermovir non-inferior ต่อ valganciclovir และ leukopenia หรือ neutropenia น้อยกว่า (n = 589)",
        keys: ["CMV สัมพันธ์กับ rejection และ PTDM ที่มากขึ้น"],
        ix: ["CMV QNAT, tissue biopsy สำหรับ GI disease (plasma QNAT ลบหรือต่ำไม่ตัด tissue-invasive GI disease)"],
        std: "AST IDCOP 2019, Limaye JAMA 2023 letermovir"
      }),
      N("Pneumocystis jirovecii pneumonia", "nephro", {
        s: "Exertional hypoxemia, LDH สูง, ground-glass",
        why: "TMP-SMX prophylaxis 6-12 เดือน และหลังรักษา rejection",
        ix: ["Beta-D-glucan, BAL PCR"],
        link: "dyspnea"
      }),
      N("Tuberculosis", "nephro", {
        s: "พบ extrapulmonary และ disseminated TB บ่อยกว่าคนทั่วไป",
        why: "Rifampicin ลด tacrolimus level มาก ต้องเพิ่ม CNI dose พร้อมติดตาม level ถี่ หรือใช้ rifabutin และเมื่อหยุด rifampicin ต้องลด dose กลับ",
        ix: ["Xpert, culture, biopsy"],
        link: "fever"
      }),
      N("Nocardia / fungal / toxoplasma", "nephro", {
        s: "Lung nodule กับ brain abscess, invasive aspergillosis, cryptococcus",
        ix: ["CT chest และ brain, culture, galactomannan, cryptococcal antigen"],
        link: "cough"
      }),
      N("BK virus / adenovirus", "nephro", {
        s: "Adenovirus: ไข้ร่วมกับ hemorrhagic cystitis หรือ nephritis ส่วน BK โดยทั่วไปไม่ทำให้มีไข้ ถ้ามีไข้ร่วมกับ BK viremia ให้หาสาเหตุอื่นของไข้",
        ix: ["Adenovirus PCR (plasma และ urine), BK plasma PCR"],
        link: "kt-early"
      }),
      N("Strongyloides hyperinfection", "nephro", {
        s: "Gram-negative sepsis กับ pulmonary infiltrate ใน steroid ขนาดสูง",
        why: "ต้อง screen และให้ ivermectin ก่อน KT ในพื้นที่ระบาด",
        ix: ["Strongyloides serology (ลบได้ในผู้ที่ได้ IS), stool และ sputum หา larvae"],
        link: "diarrhea"
      })
    ]),
    N("Late (> 12 months)", "step", {
      s: "Community infection กับ late opportunistic",
      keys: ["Over-immunosuppressed", "Tropical"]
    }, [
      N("Community-acquired and tropical infection", "nephro", {
        s: "Pneumonia, UTI, melioidosis, scrub typhus, leptospirosis, dengue",
        why: "Melioidosis รุนแรงกว่าใน KT ที่มี DM",
        ix: ["Culture, serology"],
        link: "fever"
      }),
      N("Late CMV after prophylaxis", "nephro", {
        s: "CMV หลังหยุด prophylaxis โดยเฉพาะ D+/R- มักเกิดภายใน 3-6 เดือนหลังหยุดยา จึงพบได้ตั้งแต่ก่อนครบ 12 เดือน และเกิดซ้ำได้หลังเพิ่ม IS",
        ix: ["CMV QNAT"]
      }),
      N("Cryptococcosis / PML", "nephro", {
        s: "Headache, confusion",
        ix: ["Cryptococcal antigen, MRI, JC virus PCR"],
        link: "ams"
      })
    ]),
    N("Non-infectious fever", "step", {
      s: "Fever ที่ไม่ใช่ infection",
      keys: ["LDH", "Graft tenderness", "Drug"]
    }, [
      N("PTLD", "nephro", {
        s: "Fever, lymphadenopathy, graft mass, GI lesion",
        why: "EBV D+/R- กับ ATG เสี่ยงสูงสุด",
        ix: ["EBV PCR (ลบไม่ตัด PTLD โดยเฉพาะ late PTLD ที่มัก EBV-negative), PET/CT, tissue biopsy เพื่อวินิจฉัย"],
        std: "BSH 2021 PTLD guideline",
        link: "lymphnode"
      }),
      N("Acute rejection", "nephro", {
        s: "Fever ต่ำๆ กับ graft tenderness พบน้อยในยุค CNI คิดถึงเมื่อ non-adherence หรือเพิ่งลด IS และต้องหา infection ก่อนเสมอ",
        ix: ["Biopsy"],
        link: "kt-early"
      }),
      N("Drug fever / ATG cytokine release / serum sickness", "nephro", {
        s: "Fever หลังให้ ATG หรือยาใหม่",
        ix: ["Drug timeline, complement"],
        link: "lymphnode"
      }),
      N("Graft intolerance in failed graft", "nephro", {
        s: "Fever กับ hematuria หลังหยุด IS",
        ix: ["Graft US, CRP"],
        link: "failed-graft"
      })
    ])
  ])
};

/* ===================== KT: PROTEINURIA AND HEMATURIA ===================== */
TREES["kt-urine"] = {
  must: [
    "เวลาหลัง KT, proteinuria baseline, native urine output (proteinuria อาจมาจากไตเดิม)",
    "Native disease และ recurrence risk",
    "IS: mTOR inhibitor, CNI level, adherence",
    "DSA, rejection history",
    "PTDM, BP, weight",
    "Gross hematuria, LUTS, BK history, smoking, cyclophosphamide หรือ aristolochic acid เดิม",
    "Stone, UTI ซ้ำ, ureteric stent",
    "Native kidney cyst หรือ mass (ACKD, ADPKD)"
  ],
  tree: N("Transplant: proteinuria and hematuria", "root", {
    s: "แยก proteinuria จาก native kidney ในช่วงแรก แล้วไล่ chronic ABMR, recurrent หรือ de novo GN, mTOR inhibitor และ hemodynamic ส่วน hematuria ไล่ urologic, BK และ malignancy",
    why: "Proteinuria หลัง KT ทำนาย graft loss และ mortality และเป็นทางเข้าของ transplant glomerulopathy กับ recurrent disease",
    keys: ["Proteinuria > 0.5-1 g/วัน ที่ persistent ควร biopsy", "Native proteinuria ลดลงเร็วภายในราวเดือนแรกหลัง KT ถ้ายังสูงหรือเพิ่มขึ้นหลังจากนั้นให้ถือว่ามาจาก graft", "Hematuria ที่ dysmorphic ชี้ไปทาง GN, isomorphic ชี้ไปทาง urologic แต่ isomorphic ไม่ตัด GN และผู้ป่วย KT ต้องหา malignancy ด้วย"],
    ix: ["UPCR, UACR, UA microscopy", "DSA, BK PCR, CNI level", "Graft US และ native kidney imaging", "Graft biopsy with IF และ EM", "Cystoscopy, CT urography สำหรับ hematuria"],
    std: "KDIGO 2009 KT recipient care, Banff 2022"
  }, [
    N("Proteinuria: immunologic", "step", {
      s: "Chronic ABMR",
      keys: ["dnDSA", "cg lesion"]
    }, [
      N("Transplant glomerulopathy / chronic active ABMR", "nephro", {
        s: "Proteinuria, HTN, Cr ขึ้นช้าๆ",
        ix: ["DSA, biopsy EM GBM duplication"],
        link: "kt-late"
      })
    ]),
    N("Proteinuria: recurrent or de novo GN", "step", {
      s: "IF และ EM เป็นตัวแยก",
      keys: ["Native disease", "Timing"]
    }, [
      N("Recurrent FSGS", "nephro", {
        s: "Early massive proteinuria",
        ix: ["EM effacement"],
        link: "kt-immediate"
      }),
      N("Recurrent MN", "nephro", {
        s: "Proteinuria หลังเดือนถึงปี",
        why: "Anti-PLA2R titer สูงก่อน KT เพิ่ม risk แต่ anti-PLA2R ลบไม่ตัด recurrence, รักษาด้วย rituximab ได้ผลดี",
        ix: ["Anti-PLA2R, biopsy"],
        link: "nephrotic"
      }),
      N("Recurrent IgAN / C3G / LN", "nephro", {
        s: "Hematuria กับ proteinuria",
        why: "C3G โดยเฉพาะ DDD recurrence สูง",
        ix: ["Biopsy, complement"],
        link: "rpgn"
      }),
      N("De novo MN / DKD / FSGS / TMA", "nephro", {
        s: "Disease ใหม่ใน graft",
        ix: ["Biopsy, HbA1c"],
        link: "kt-late"
      })
    ]),
    N("Proteinuria: drug and hemodynamic", "step", {
      s: "Non-immunologic proteinuria",
      keys: ["mTOR inhibitor", "Hyperfiltration"]
    }, [
      N("mTOR inhibitor-associated proteinuria", "nephro", {
        s: "Proteinuria หลังเปลี่ยนเป็น sirolimus หรือ everolimus",
        why: "Podocyte injury และ FSGS, เสี่ยงเมื่อ proteinuria เดิม > 0.5 g/วัน หรือ eGFR < 40 mL/min/1.73 m2 ก่อน conversion",
        ix: ["UPCR ก่อนและหลัง conversion"]
      }),
      N("Hyperfiltration / obesity / reduced nephron mass", "nephro", {
        s: "Small donor kidney ใน large recipient",
        ix: ["Biopsy: maladaptive FSGS"],
        link: "obesity"
      }),
      N("Native kidney proteinuria", "nephro", {
        s: "Proteinuria ในช่วงแรกจากไตเดิมที่ยังทำงาน",
        ix: ["Trend UPCR ช่วง 1-3 เดือน"]
      })
    ]),
    N("Hematuria", "step", {
      s: "Hematuria หลัง KT",
      keys: ["Gross", "LUTS", "Malignancy risk สูง"]
    }, [
      N("BK hemorrhagic cystitis / BK ureteritis", "nephro", {
        s: "Hematuria กับ ureteric stenosis",
        why: "ใน KT BK มักทำ BKVAN (ไม่มี gross hematuria) และ ureteric stenosis ส่วน hemorrhagic cystitis พบใน HSCT บ่อยกว่ามาก BK viruria หรือ viremia บวกจึงไม่ใช่เหตุให้หยุดหาสาเหตุอื่นของ hematuria",
        ix: ["Urine และ plasma BK PCR"],
        link: "kt-early"
      }),
      N("Urothelial carcinoma (native or graft)", "nephro", {
        s: "Gross hematuria, risk สูงใน aristolochic acid และ BK",
        why: "BK-associated urothelial carcinoma ใน graft มีรายงาน",
        ix: ["Cystoscopy, CT urography, cytology"],
        link: "hematuria"
      }),
      N("Native RCC / ACKD / ADPKD", "nephro", {
        s: "Native kidney bleeding หรือ mass",
        ix: ["US หรือ CT native kidneys"],
        link: "hd-bleed"
      }),
      N("Stone in graft / graft pyelonephritis / stent", "nephro", {
        s: "Hematuria กับ colic หรือไข้",
        why: "Graft ไม่มี innervation ทำให้ไม่ปวด colic ชัด",
        ix: ["US, CT"],
        link: "stone"
      }),
      N("Post-biopsy AVF / pseudoaneurysm", "nephro", {
        s: "Gross hematuria หลัง graft biopsy",
        ix: ["Doppler, angiography with embolization"]
      })
    ])
  ])
};

/* ===================== KT: LIVING DONOR EVALUATION ===================== */
TREES.donor = {
  must: [
    "ความสัมพันธ์กับผู้รับ, แรงจูงใจ, coercion หรือ financial incentive, ประเมินโดยทีมที่เป็นอิสระจากผู้รับ",
    "อายุ, BMI, BP (office และ ABPM), glucose และ HbA1c, lipid, smoking",
    "Family history ของ CKD, DM, ADPKD, Alport, APOL1-associated disease, aHUS, cancer",
    "Stone history, gout, pregnancy plan, preeclampsia ที่ผ่านมา",
    "Infection risk: HBV, HCV, HIV, syphilis, TB, CMV, EBV, endemic infection",
    "Cancer screening ตามอายุ",
    "Psychosocial, mental health, ความเข้าใจ risk ระยะยาว",
    "ABO, HLA, crossmatch, anatomy (vessel และ ureter)"
  ],
  tree: N("Transplant: living donor evaluation", "root", {
    s: "ประเมินตามลำดับ: eligibility ตามกฎหมาย, immunologic compatibility, kidney function และ anatomy, metabolic risk, inherited disease ที่ร่วมกับผู้รับ, infection และ cancer แล้วประมาณ lifetime ESKD risk",
    why: "Donor ต้องได้ประโยชน์สูงกว่าความเสี่ยงที่ยอมรับได้ และ examiner ถามเกณฑ์ GFR, proteinuria, BP และการ screen โรคพันธุกรรมใน related donor",
    keys: ["ESKD risk หลังบริจาค 30.8 ต่อ 10,000 vs 3.9 ใน matched healthy non-donor ที่ 15 ปี (Muzaale JAMA 2014)", "Lifetime risk ใช้ calculator ก่อนบริจาค (Grams NEJM 2016)", "GFR ที่ยอมรับได้ขึ้นกับอายุ"],
    ix: ["Measured หรือ estimated GFR (eGFRcr-cys, mGFR ถ้าไม่ชัด)", "UACR, UA microscopy", "ABPM, OGTT ถ้าเสี่ยง", "CT angiography kidney", "Infection serology, age-appropriate cancer screening", "ABO, HLA typing, crossmatch, DSA"],
    std: "KDIGO 2017 living kidney donor guideline"
  }, [
    N("Legal and ethical eligibility", "step", {
      s: "กฎหมายและข้อบังคับในประเทศไทย",
      why: "ห้ามซื้อขายอวัยวะ และต้องมี informed consent ที่เป็นอิสระ",
      keys: ["Independent donor advocate", "อายุบรรลุนิติภาวะ"]
    }, [
      N("Thai living donor rules", "nephro", {
        s: "Donor ต้องเป็นญาติทางสายเลือดหรือคู่สมรสตามเงื่อนไขของข้อบังคับแพทยสภา",
        why: "คู่สมรสโดยชอบด้วยกฎหมาย หรืออยู่กินฉันสามีภรรยาโดยเปิดเผย มาแล้วอย่างน้อย 3 ปี (ยกเว้นมีบุตรร่วมกันซึ่งพิสูจน์ด้วย HLA หรือ DNA ได้) กรณีอื่นให้ศูนย์รับบริจาคอวัยวะ สภากาชาดไทย พิจารณาตามระเบียบที่แพทยสภาเห็นชอบ",
        ix: ["เอกสารยืนยันความสัมพันธ์, HLA เพื่อยืนยันความเป็นญาติ"],
        std: "ข้อบังคับแพทยสภาว่าด้วยการรักษาจริยธรรมแห่งวิชาชีพเวชกรรม (ฉบับที่ 5) พ.ศ. 2560 ข้อ 52, ศูนย์รับบริจาคอวัยวะ สภากาชาดไทย"
      }),
      N("Psychosocial evaluation", "adj", {
        s: "Coercion, financial gain, mental health, social support",
        ix: ["Psychiatric และ social work assessment"]
      })
    ]),
    N("Immunologic compatibility", "step", {
      s: "ABO, HLA, crossmatch",
      keys: ["ABO-incompatible ทำได้ด้วย desensitization", "Positive crossmatch: paired exchange"]
    }, [
      N("ABO compatibility / ABO-incompatible KT", "nephro", {
        s: "Anti-A หรือ anti-B titer",
        why: "Desensitization ด้วย rituximab และ PLEX หรือ immunoadsorption ให้ titer ต่ำกว่าเกณฑ์ก่อนผ่าตัด, A2 donor มี antigen น้อย",
        ix: ["ABO, isoagglutinin titer"]
      }),
      N("HLA crossmatch and DSA", "nephro", {
        s: "CDC, flow crossmatch, virtual crossmatch",
        why: "Positive T-cell CDC crossmatch จาก HLA DSA ชนิด IgG เป็น contraindication ต่อการปลูกถ่ายจาก donor คู่นั้นโดยตรง (ต้องแยกผลบวกลวงจาก IgM autoantibody และ B-cell crossmatch ที่บวกจาก rituximab) ส่วน CDC ลบแต่มี DSA (flow crossmatch บวก หรือพบเฉพาะใน single antigen bead) ให้ชั่ง risk เป็นรายๆ ระหว่าง desensitization กับ paired kidney exchange",
        ix: ["Single antigen bead, MFI"]
      })
    ]),
    N("Kidney function and anatomy", "step", {
      s: "GFR, albuminuria, hematuria, imaging",
      keys: ["GFR threshold ตามอายุ", "Albuminuria", "Hematuria"]
    }, [
      N("GFR", "nephro", {
        s: "GFR ≥ 90 mL/min/1.73 m2 ยอมรับได้, < 60 ไม่ควรบริจาค, 60-89 พิจารณาตามอายุและ risk",
        ix: ["eGFRcr-cys, measured GFR"],
        std: "KDIGO 2017 living donor"
      }),
      N("Albuminuria", "nephro", {
        s: "AER < 30 mg/วัน ยอมรับได้, > 100 mg/วัน ไม่ควรบริจาค, 30-100 mg/วัน พิจารณาเป็นรายๆ ตามอายุและ risk อื่น",
        ix: ["UACR ซ้ำ, timed urine"]
      }),
      N("Microscopic hematuria", "nephro", {
        s: "ต้องหาสาเหตุก่อน (IgAN, thin GBM, Alport, stone, malignancy)",
        why: "Thin GBM หรือ COL4A heterozygous ใน related donor ของผู้รับที่เป็น Alport มี risk CKD",
        ix: ["UA microscopy, cystoscopy ตามอายุ, kidney biopsy ถ้าจำเป็น, genetic testing"],
        link: "hematuria"
      }),
      N("Anatomy: vessels, cysts, stones, size asymmetry", "nephro", {
        s: "Multiple arteries, FMD, small kidney, complex cyst",
        why: "ถ้าไตสองข้างต่างกัน ให้นำข้างที่ function น้อยกว่าหรือมี abnormality เล็กน้อยไปบริจาค และเก็บข้างที่ดีกว่าไว้กับ donor",
        ix: ["CT angiography, split function (DMSA) ถ้าขนาดต่าง"]
      })
    ]),
    N("Metabolic and cardiovascular risk", "step", {
      s: "Risk factor ที่ทำให้ donor เกิด CKD ภายหลัง",
      keys: ["HTN", "Obesity", "DM", "Stone"]
    }, [
      N("Hypertension", "nephro", {
        s: "HTN ที่คุมได้ < 140/90 mmHg ด้วยยา 1-2 ตัวโดยไม่มี target organ damage อาจยอมรับได้",
        ix: ["ABPM, echo, UACR, fundoscopy"]
      }),
      N("Obesity / prediabetes / diabetes", "nephro", {
        s: "BMI > 30 kg/m2 พิจารณาเป็นรายๆ (หลายศูนย์ไม่รับเมื่อ BMI > 35), T1DM ไม่ควรบริจาค, prediabetes และ T2DM พิจารณาเป็นรายๆ ตาม lifetime risk",
        ix: ["OGTT, HbA1c, BMI"],
        link: "obesity"
      }),
      N("Kidney stone", "nephro", {
        s: "Stone เดียวในอดีตที่ไม่มี metabolic abnormality อาจยอมรับได้",
        ix: ["24-hour urine profile, CT"],
        link: "stone"
      }),
      N("Pregnancy after donation", "nephro", {
        s: "Gestational HTN หรือ preeclampsia เพิ่มขึ้นในผู้บริจาค (11% vs 5%, OR 2.4, Garg NEJM 2015) แต่ maternal และ fetal outcome อื่นไม่ต่างกัน การบริจาคจึงไม่ใช่ข้อห้ามของการตั้งครรภ์ภายหลัง",
        ix: ["Counseling ก่อนบริจาค"],
        link: "pregnancy"
      })
    ]),
    N("Inherited disease shared with recipient", "step", {
      s: "Related donor ของผู้รับที่มีโรคพันธุกรรม",
      why: "ต้อง exclude โรคเดียวกันใน donor ก่อน",
      keys: ["ADPKD", "Alport", "aHUS", "APOL1"]
    }, [
      N("ADPKD in the family", "nephro", {
        s: "Related donor อายุ ≥ 40 ปีที่ US ไม่พบ cyst หรือพบเพียง 1 cyst ตัด ADPKD ได้ (Pei criteria), อายุน้อยกว่า 40 ปี US ปกติยังไม่ตัดโรค ให้ใช้ MRI (cyst รวม < 5 ในอายุ 16-40 ปีตัดโรคได้) หรือ genetic testing",
        ix: ["MRI, PKD1 และ PKD2 testing ถ้ารู้ variant ของผู้รับ"],
        std: "KDIGO 2025 ADPKD",
        link: "cysts"
      }),
      N("Alport / COL4A", "nephro", {
        s: "ผู้ชายที่เป็น X-linked Alport และผู้ที่มี biallelic COL4A3 หรือ COL4A4 variant ไม่บริจาค, หญิง heterozygous COL4A5 เป็น donor of last resort เท่านั้น เมื่ออายุ > 45 ปี ไม่มี proteinuria ไม่มี hearing loss และ kidney function ปกติ หลัง counseling (Kashtan 2018), ญาติที่มี heterozygous COL4A3 หรือ COL4A4 variant เดียวกับผู้รับที่เป็น autosomal dominant Alport ไม่ควรบริจาค ส่วน heterozygous carrier ในครอบครัว autosomal recessive Alport ประเมินเฉพาะราย โดยไม่ควรบริจาคถ้ามี hematuria, proteinuria หรือ HTN และแม้ไม่มีทั้งสามอย่างก็ยังมี risk CKD ระยะยาว",
        ix: ["COL4A3-5 testing"],
        link: "hearing"
      }),
      N("aHUS / C3G / APOL1 / ADTKD / Fabry", "nephro", {
        s: "Genetic testing ของ donor ถ้ารู้ variant ของผู้รับ",
        why: "Related donor ของผู้รับ aHUS อาจเกิด aHUS หลังบริจาค",
        ix: ["Targeted genetic testing"],
        link: "tma"
      })
    ]),
    N("Infection and malignancy", "step", {
      s: "Transmission risk ไปสู่ผู้รับ",
      keys: ["Window period", "Endemic infection"]
    }, [
      N("Viral and bacterial transmission risk", "nephro", {
        s: "HBV, HCV, HIV, syphilis, TB, CMV, EBV, strongyloides",
        why: "Living donor ที่ HCV NAT บวกควรได้ DAA จน SVR ก่อนบริจาค (การปลูกถ่ายจาก HCV-viremic donor ให้ HCV-negative recipient แล้วให้ DAA เป็นข้อมูลจาก deceased donor เป็นหลัก), CMV และ EBV mismatch กำหนด prophylaxis และ monitoring ของผู้รับ",
        ix: ["Serology, NAT, IGRA"],
        link: "kt-fever"
      }),
      N("Cancer screening", "nephro", {
        s: "Age-appropriate screening ทั้งหมด",
        ix: ["Colonoscopy, mammogram, Pap, PSA ตามอายุ, CT จะเห็น incidental lesion"]
      })
    ])
  ])
};

/* ===================== KT: FAILING ALLOGRAFT ===================== */
TREES["failed-graft"] = {
  must: [
    "eGFR trend, สาเหตุที่ graft เสีย (rejection, recurrence, BK, non-adherence)",
    "IS ที่ใช้อยู่และแผนลด, infection และ malignancy ที่เกิดขึ้น",
    "Graft pain, hematuria, fever, malaise หลังหยุด IS (graft intolerance)",
    "Anemia ที่ดื้อ ESA, CRP สูง, hypoalbuminemia",
    "PRA และ DSA ปัจจุบัน, ความต้องการ re-transplant, living donor ใหม่",
    "Dialysis access plan, PD หรือ HD",
    "Residual urine output",
    "Adrenal insufficiency risk เมื่อหยุด steroid"
  ],
  tree: N("Transplant: failing allograft", "root", {
    s: "วางแผนตั้งแต่ eGFR < 30 mL/min/1.73 m2 และต้องพร้อมเมื่อ eGFR ≤ 20: dialysis access, re-transplant listing, การลด IS อย่างมีแผน และจัดการ graft intolerance",
    why: "ผู้ป่วยที่ graft เสียมี mortality สูงกว่า incident dialysis patients และการตัดสินใจเรื่อง IS กับ nephrectomy เปลี่ยน sensitization และ infection risk",
    keys: ["Refer เพื่อ re-transplant evaluation เมื่อ GFR < 30 (KDIGO 2020 candidate) และเริ่มประสาน dialysis team เมื่อ eGFR ≤ 20 (KDIGO 2023 controversies conference on the failing allograft)", "Pre-emptive re-transplant ดีที่สุดถ้าทำได้", "หยุด IS เร็วลด infection แต่เพิ่ม sensitization และ intolerance"],
    ix: ["eGFR, UPCR, DSA, PRA", "CRP, Hb, ferritin, albumin", "Graft US", "Morning cortisol ก่อนหยุด steroid"],
    std: "KDIGO 2020 kidney transplant candidate guideline, KDIGO 2023 controversies conference on the failing allograft"
  }, [
    N("Graft intolerance syndrome", "step", {
      s: "Inflammation จาก graft ที่ถูก reject หลังลด IS",
      keys: ["Fever, graft tenderness, hematuria", "ESA resistance, CRP สูง, hypoalbuminemia"]
    }, [
      N("Graft intolerance", "nephro", {
        s: "Fever, malaise, graft pain, gross hematuria หลังหยุด IS",
        why: "เป็น diagnosis of exclusion: ต้องตัด infection (รวม graft pyelonephritis และ CMV) ก่อน แล้วจึงรักษาด้วย steroid ชั่วคราว, graft embolization หรือ transplant nephrectomy",
        ix: ["Graft US, CRP, cultures เพื่อตัด infection"]
      }),
      N("Transplant nephrectomy or embolization", "nephro", {
        s: "Indication: intolerance, infection, malignancy, space สำหรับ re-transplant",
        why: "Nephrectomy อาจเพิ่ม sensitization และมี surgical morbidity",
        ix: ["Surgical evaluation"]
      })
    ]),
    N("Immunosuppression weaning", "step", {
      s: "Balance ระหว่าง infection กับ sensitization และ residual function",
      keys: ["Re-transplant plan", "Residual urine"]
    }, [
      N("Planned IS minimization", "nephro", {
        s: "หยุด antimetabolite ก่อน คง low-dose CNI ถ้าวางแผน re-transplant ใน 1 ปี หรือยังมี urine output ลำดับการหยุดตาม KDIGO 2023 controversies report: antimetabolite ก่อน ตามด้วย CNI และ steroid เป็นลำดับสุดท้ายโดย taper",
        why: "ช่วยลด dnDSA และรักษา residual function แต่ถ้ามี severe infection หรือ malignancy ให้ลดหรือหยุด IS เร็วกว่าแผน (ยกเว้น steroid ที่ต้อง taper) หลักฐานเป็น observational และ expert opinion",
        ix: ["DSA trend"]
      }),
      N("Adrenal insufficiency after steroid withdrawal", "nephro", {
        s: "Hypotension, fatigue, hyponatremia หลังหยุด prednisolone",
        ix: ["8 am cortisol, cosyntropin test"],
        link: "hypona"
      })
    ]),
    N("Complications of the failing graft", "step", {
      s: "ปัญหาจาก CKD และ prior IS",
      keys: ["Infection", "Malignancy", "CKD complications"]
    }, [
      N("Infection and PTLD", "nephro", {
        s: "Over-immunosuppression ร่วมกับ uremia",
        ix: ["CMV, EBV, cultures"],
        link: "kt-fever"
      }),
      N("Skin cancer and other malignancy", "nephro", {
        s: "SCC ของผิวหนังสูงขึ้นหลายเท่าใน KT",
        ix: ["Skin examination, age-appropriate screening"]
      }),
      N("Anemia, CKD-MBD, acidosis, CV risk", "nephro", {
        s: "Complications เหมือน CKD ทั่วไปแต่มักถูก under-treat",
        ix: ["Hb, PTH, HCO3"],
        link: "cytopenia"
      })
    ]),
    N("Planning after graft failure: re-transplant and dialysis", "step", {
      s: "Re-listing, desensitization และการวางแผน dialysis modality กับ access",
      keys: ["PRA", "Repeat mismatch", "Recurrence risk"]
    }, [
      N("Sensitization and repeat mismatch", "nephro", {
        s: "PRA สูงหลัง graft failure",
        why: "หลีกเลี่ยง repeat HLA mismatch ของ donor เดิม",
        ix: ["Single antigen bead, cPRA"]
      }),
      N("Recurrence risk assessment", "nephro", {
        s: "Graft แรกเสียจาก recurrence (FSGS, aHUS, C3G, PH1)",
        why: "Recurrence ใน graft ที่สองสูงขึ้นมาก ต้องวางแผน prophylaxis",
        ix: ["Genetic testing, complement studies"],
        link: "kt-immediate"
      }),
      N("Dialysis modality and access", "nephro", {
        s: "PD หรือ HD หลัง graft failure",
        why: "Survival ของ PD และ HD หลัง graft failure ไม่ต่างกันชัดเจน เลือกตามความเหมาะสมของผู้ป่วย และวาง access ล่วงหน้าเพื่อไม่ต้องเริ่มด้วย CVC",
        ix: ["Access planning"],
        link: "hd-access"
      })
    ])
  ])
};

/* ===================== HD: INTRADIALYTIC HYPOTENSION ===================== */
TREES["hd-idh"] = {
  must: [
    "Timing ในรอบฟอก: ต้นรอบ (dialyzer reaction, sepsis, cardiac) หรือท้ายรอบ (UF)",
    "IDWG, UF rate, dry weight ล่าสุด, การเปลี่ยนน้ำหนักจริง",
    "ยาลดความดันก่อนฟอก, กินอาหารระหว่างฟอก",
    "Chest pain, palpitation, dyspnea",
    "Fever, rigor, catheter",
    "Itching, urticaria, bronchospasm ในนาทีแรก (dialyzer reaction)",
    "Dialysate temperature, Na, Ca, glucose-free",
    "DM autonomic neuropathy, amyloid, LVH, AS, pericardial effusion"
  ],
  tree: N("Hemodialysis: intradialytic hypotension", "root", {
    s: "แยก timing และ acuity: UF-related (ท้ายรอบ), cardiac, sepsis และ dialysis-specific emergency (reaction, air, hemolysis, bleeding)",
    why: "IDH สัมพันธ์กับ myocardial stunning, loss of residual function, access thrombosis และ mortality การแก้ที่ต้นเหตุสำคัญกว่าให้ saline",
    keys: ["นิยาม: SBP ลด ≥ 20 mmHg หรือ MAP ลด ≥ 10 mmHg ร่วมกับอาการ (KDOQI 2005) หรือ nadir SBP < 90 mmHg ซึ่งสัมพันธ์กับ mortality ชัดที่สุด (Flythe JASN 2015)", "UF rate > 13 mL/kg/h สัมพันธ์กับ mortality และ risk เริ่มเพิ่มตั้งแต่ > 10 mL/kg/h (Flythe KI 2011)", "Sudden collapse ใน 5-15 นาทีแรก: นึกถึง dialyzer reaction, air embolism, hemolysis เพิ่มจาก ACS, arrhythmia, tamponade และ sepsis ที่เกิดได้ทุกช่วงของรอบ"],
    ix: ["UF rate, IDWG, BIA หรือ lung US", "ECG, troponin, echo", "Blood culture", "Hb, LDH, haptoglobin, K", "Dialysate prescription, water test"],
    std: "KDOQI 2015 HD adequacy, KDOQI 2005 cardiovascular disease in dialysis"
  }, [
    N("Volume and UF-related", "step", {
      s: "Hypotension ครึ่งหลังของรอบ",
      keys: ["UF rate สูง", "Dry weight ต่ำเกิน"]
    }, [
      N("Excessive UF rate", "nephro", {
        s: "IDWG สูง, session สั้น",
        why: "UF rate > 13 mL/kg/h สัมพันธ์กับ mortality ให้เพิ่มเวลาหรือจำนวนรอบ จำกัด Na intake",
        ix: ["UF rate, IDWG, dietary sodium"]
      }),
      N("Dry weight set too low", "nephro", {
        s: "Cramp, post-dialysis fatigue, hypotension แม้ IDWG ปกติ",
        why: "Lean mass เพิ่มขึ้นหลังกินดีขึ้นแต่ dry weight ไม่ได้ปรับ",
        ix: ["BIA, lung US, IVC"]
      }),
      N("Dialysate factors", "nephro", {
        s: "Dialysate Na ต่ำ, Ca ต่ำ, temperature สูง, acetate",
        why: "Cool dialysate ลด IDH ใน trial ขนาดเล็กและ meta-analysis แต่ MyTEMP (cluster RCT, n = 15,413) ที่ใช้ personalized cooler dialysate ไม่ลด composite CV death หรือ hospitalization (HR 1.00, 96% CI 0.89-1.11) และไม่ลด intradialytic SBP drop",
        ix: ["Dialysate prescription"],
        std: "MyTEMP (Lancet 2022)"
      }),
      N("Antihypertensive before dialysis / eating during HD / autonomic failure", "nephro", {
        s: "Impaired vascular response",
        why: "Midodrine ก่อนฟอกใช้ได้ในรายที่ autonomic dysfunction",
        ix: ["Drug review"],
        link: "syncope"
      })
    ]),
    N("Cardiac", "step", {
      s: "Hypotension กับ chest pain, arrhythmia หรือ low output",
      keys: ["ECG", "Echo"]
    }, [
      N("Myocardial ischemia / stunning", "nephro", {
        s: "Chest pain ระหว่าง UF แต่ myocardial stunning ส่วนใหญ่ไม่มี chest pain ไม่มีอาการจึงไม่ตัด ischemia",
        ix: ["ECG, troponin แบบ serial เทียบกับ baseline (troponin สูงเรื้อรังได้ใน HD)"],
        link: "chestpain"
      }),
      N("Arrhythmia", "nephro", {
        s: "AF, VT, bradycardia จาก K shift",
        ix: ["ECG, K, dialysate K"],
        link: "palpitation"
      }),
      N("Pericardial tamponade", "nephro", {
        s: "Hypotension ที่แย่ลงเรื่อยๆ ทุกรอบ, JVP สูง",
        ix: ["Echo"],
        link: "chestpain"
      }),
      N("Diastolic dysfunction / AS / cardiac amyloid", "nephro", {
        s: "Preload-dependent heart",
        ix: ["Echo"],
        link: "dyspnea"
      })
    ]),
    N("Sepsis", "step", {
      s: "Hypotension กับไข้ หรือ rigor แต่ผู้ป่วย HD ที่ sepsis อาจไม่มีไข้",
      keys: ["Catheter", "Endocarditis"]
    }, [
      N("CRBSI / access infection", "nephro", {
        s: "Rigor เมื่อเริ่มฟอก",
        ix: ["Paired blood culture"],
        link: "hd-fever"
      }),
      N("Non-access sepsis", "adj", {
        s: "Pneumonia, UTI, diabetic foot",
        ix: ["Culture"]
      })
    ]),
    N("Dialysis-specific emergency", "step", {
      s: "Sudden collapse ที่ต้องหยุดฟอกทันที",
      keys: ["Clamp lines", "ไม่คืนเลือดถ้าสงสัย type A dialyzer reaction, hemolysis หรือ air embolism"]
    }, [
      N("Dialyzer reaction type A (anaphylactic)", "nephro", {
        s: "Dyspnea, urticaria, bronchospasm, hypotension ภายใน 5-30 นาที",
        why: "Ethylene oxide sterilization, AN69 membrane ร่วมกับ ACEi (bradykinin), heparin contamination",
        ix: ["Stop dialysis, ไม่คืนเลือด, tryptase"]
      }),
      N("Dialyzer reaction type B", "nephro", {
        s: "Chest หรือ back pain ไม่รุนแรงในช่วงแรกของรอบ",
        why: "Complement activation, มักดีขึ้นเองเมื่อฟอกต่อ แต่เป็น diagnosis of exclusion ต้องตัด ACS, hemolysis และ air embolism ก่อน",
        ix: ["Clinical"]
      }),
      N("Air embolism", "nephro", {
        s: "Sudden dyspnea, chest pain, neurologic deficit, churning murmur",
        why: "Clamp venous line, left lateral decubitus Trendelenburg, 100% O2",
        ix: ["Clinical, echo"]
      }),
      N("Acute hemolysis", "nephro", {
        s: "Chest pain, back pain, port-wine blood ใน line, hyperkalemia",
        why: "Overheated หรือ hypotonic dialysate, chloramine, copper, formaldehyde, kinked line, ห้ามคืนเลือด",
        ix: ["Hb, LDH, K, plasma color, water test"],
        std: "ISO 23500 dialysis water quality",
        link: "hd-water"
      }),
      N("Bleeding: access, retroperitoneal, GI", "nephro", {
        s: "Hypotension กับ Hb ลด",
        why: "Heparin ระหว่างฟอก",
        ix: ["Hb, CT"],
        link: "hd-bleed"
      }),
      N("Hypoglycemia / adrenal insufficiency", "nephro", {
        s: "Glucose-free dialysate ใน DM ที่ได้ insulin, steroid withdrawal",
        ix: ["Glucose, cortisol"]
      })
    ])
  ])
};

/* ===================== HD: INTRADIALYTIC FEVER ===================== */
TREES["hd-fever"] = {
  must: [
    "Fever ก่อนเริ่มฟอก หรือเกิดระหว่างฟอก, rigor ตอนต่อสาย",
    "Access type: tunneled catheter, non-tunneled, AVG (รวม AVG เก่าที่ thrombosed), AVF",
    "Exit site หรือ tunnel แดง หนอง, AVG แดงเจ็บ",
    "ผู้ป่วยรายอื่นในหน่วยมีอาการเดียวกันในวันเดียวกันไหม (outbreak)",
    "Water treatment: ผลตรวจ bacteria และ endotoxin ล่าสุด, การล้างระบบ, dialyzer reuse",
    "Back pain, joint pain, murmur (metastatic infection)",
    "อาการนอกการฟอก: ไอ, ปัสสาวะ, แผลเท้า",
    "Transfusion หรือยาระหว่างฟอก (iron, antibiotic)"
  ],
  tree: N("Hemodialysis: intradialytic fever", "root", {
    s: "แยก access-related bacteremia, pyrogenic reaction จากน้ำหรือ dialysate และ infection อื่น ด้วย timing, culture และการดูว่ามีหลายรายพร้อมกันหรือไม่",
    why: "CRBSI เป็นสาเหตุหลักของ bacteremia ใน HD และ pyrogenic reaction เป็นสัญญาณว่าระบบน้ำมีปัญหา ซึ่งต้องจัดการระดับหน่วยไตเทียม",
    keys: ["Rigor ภายในชั่วโมงแรกและหายหลังหยุดฟอก กับ culture ลบ: เข้าได้กับ pyrogenic reaction แต่เป็น diagnosis of exclusion เพราะ CRBSI ก็มี rigor ตอนเริ่มฟอกได้ จึงเก็บ blood culture ทุกราย และถ้ามี catheter ให้ empirical antibiotic ไปก่อนจนผล culture ออก", "Persistent fever กับ culture บวก: bacteremia", "หลายรายพร้อมกัน: water หรือ reuse contamination"],
    ix: ["Paired blood culture (catheter หรือ bloodline และ peripheral)", "Exit site swab", "Echo ใน S. aureus bacteremia ทุกราย (TEE ถ้าทำได้)", "Water culture และ endotoxin, dialysate culture", "Tagged WBC scan หรือ US สำหรับ old AVG"],
    std: "IDSA 2009 CRBSI guideline, KDOQI 2019 vascular access, ISO 23500 dialysis water quality"
  }, [
    N("Access infection", "step", {
      s: "สาเหตุที่พบบ่อยที่สุด",
      why: "Catheter มี bacteremia risk สูงกว่า AVF หลายเท่า",
      keys: ["Tunneled catheter", "AVG", "AVF infection พบน้อย"]
    }, [
      N("Catheter-related bloodstream infection", "nephro", {
        s: "Rigor เมื่อเริ่มฟอก, culture บวก",
        why: "S. aureus, Pseudomonas, Candida ต้องเอา catheter ออก และเชื้ออื่นก็ต้องเอาออกถ้ามี severe sepsis, ไข้หรือ bacteremia ไม่หายใน 48-72 ชั่วโมง, metastatic infection หรือ tunnel infection ส่วน CoNS และ gram-negative อื่นที่อาการดีขึ้นเร็วอาจ salvage ด้วย systemic antibiotic ร่วมกับ antibiotic lock หรือ guidewire exchange",
        keys: ["Differential time to positivity: culture จาก catheter บวกก่อน peripheral ≥ 2 ชั่วโมง สนับสนุน CRBSI (ใน HD มักเก็บ peripheral ไม่ได้ จึงใช้ culture จาก bloodline ร่วมกับ clinical)", "Bacteremia หรือไข้ที่ไม่หาย > 72 ชั่วโมงหลังให้ antibiotic ที่เหมาะสม: ต้องหา metastatic infection"],
        ix: ["Paired culture, echo"],
        std: "IDSA 2009, KDOQI 2019"
      }),
      N("Exit site / tunnel infection", "nephro", {
        s: "Erythema, purulence ที่ exit site หรือตาม tunnel",
        why: "Exit site infection ที่ไม่มี bacteremia หรือ systemic sign รักษาด้วย antibiotic ก่อนได้โดยยังไม่เอา catheter ออก ส่วน tunnel infection ต้องเอา catheter ออก",
        ix: ["Swab culture"]
      }),
      N("AV graft infection (including old thrombosed graft)", "nephro", {
        s: "Occult fever, ESA resistance, CRP สูง",
        why: "AVG เก่าที่ไม่ใช้เป็นแหล่ง infection ที่ซ่อนอยู่",
        ix: ["US, tagged WBC scan"]
      }),
      N("Metastatic infection", "nephro", {
        s: "Endocarditis, spondylodiscitis, septic arthritis, epidural abscess",
        ix: ["Echo, MRI"],
        link: "backpain"
      })
    ]),
    N("Water and dialysate", "step", {
      s: "Pyrogenic reaction หรือ bacteremia จาก contamination",
      link: "hd-water",
      keys: ["Cluster", "Blood culture ลบใน pyrogenic reaction แต่บวกได้ถ้า contamination ทำให้เกิด gram-negative bacteremia", "Reuse"]
    }, [
      N("Pyrogenic reaction (endotoxin)", "nephro", {
        s: "Chills และ fever ระหว่างฟอก, blood culture ลบ",
        why: "Endotoxin ผ่าน high-flux membrane โดย backfiltration",
        keys: ["Standard dialysis water: bacteria < 100 CFU/mL (action 50), endotoxin < 0.25 EU/mL (action 0.125)", "Ultrapure dialysis fluid: < 0.1 CFU/mL, < 0.03 EU/mL"],
        ix: ["Water และ dialysate culture, endotoxin (LAL)"],
        std: "ISO 23500 dialysis water quality"
      }),
      N("Dialyzer reuse contamination", "nephro", {
        s: "Gram-negative bacteremia หรือ pyrogenic reaction cluster",
        ix: ["Reprocessing audit, dialyzer culture"]
      }),
      N("Cluster of pyrogenic reactions or bacteremia (unit outbreak)", "nephro", {
        s: "Unusual organism หลายราย (Burkholderia, Ralstonia, NTM)",
        ix: ["Infection control, water system audit"],
        link: "hd-water"
      })
    ]),
    N("Non-access infection", "step", {
      s: "Infection จากแหล่งอื่น",
      keys: ["Lung", "Urine", "Foot"]
    }, [
      N("Pneumonia / UTI / diabetic foot / TB", "nephro", {
        s: "Common infection ใน HD",
        why: "TB ใน HD พบบ่อยกว่าประชากรทั่วไป เป็น extrapulmonary บ่อย และมักมาด้วย fever ต่ำๆ กับอาการไม่จำเพาะ",
        ix: ["CXR, culture, Xpert"],
        link: "fever"
      }),
      N("Infected native kidney cyst (ADPKD, ACKD)", "nephro", {
        s: "Fever กับ flank pain",
        ix: ["Blood culture, CT หรือ MRI, FDG-PET/CT ถ้า imaging ทั่วไปไม่พบ cyst ที่ติดเชื้อ"],
        link: "cysts"
      })
    ]),
    N("Non-infectious", "step", {
      s: "Fever ที่ไม่ใช่ infection",
      keys: ["Transfusion", "Drug", "Overheated dialysate"]
    }, [
      N("Transfusion reaction / drug reaction", "nephro", {
        s: "Febrile non-hemolytic reaction, iron หรือ antibiotic",
        ix: ["Transfusion workup"]
      }),
      N("Overheated dialysate", "nephro", {
        s: "Fever กับ hemolysis",
        ix: ["Temperature monitor, LDH"],
        link: "hd-idh"
      }),
      N("Graft intolerance in failed KT", "nephro", {
        s: "Fever ใน HD ที่มี failed graft โดยเฉพาะหลังลดหรือหยุด IS ร่วมกับ graft tenderness หรือ hematuria เป็น diagnosis of exclusion หลังตัด infection แล้ว",
        ix: ["Graft US, cultures"],
        link: "failed-graft"
      })
    ])
  ])
};

/* ===================== HD: ACCESS DYSFUNCTION AND INADEQUACY ===================== */
TREES["hd-access"] = {
  must: [
    "Access type, อายุของ access, intervention ที่ผ่านมา",
    "Thrill และ bruit: continuous หรือ pulsatile, ห้อยแขนแล้ว collapse ไหม",
    "Bleeding นานหลังถอดเข็ม (outflow stenosis)",
    "แขนบวม, collateral ที่หน้าอก (central vein stenosis)",
    "Blood flow ที่ได้จริง, arterial และ venous pressure, alarm",
    "Kt/V หรือ URR trend, session time จริง, ขาดฟอกหรือเลิกก่อนเวลา",
    "มือเย็นซีดชา (steal), aneurysm, ผิวบาง",
    "Catheter: flow ลดลง, ต้องสลับสาย, ใช้ tPA บ่อย"
  ],
  tree: N("Hemodialysis: access dysfunction and inadequacy", "root", {
    s: "แยก inadequate dialysis จาก access (stenosis, recirculation, low flow) กับ prescription และ adherence แล้ว localize stenosis ด้วย physical examination",
    why: "Under-dialysis เป็นสาเหตุที่แก้ได้ของ uremic symptoms, ESA resistance, hyperphosphatemia และ volume overload",
    keys: ["spKt/V เป้า 1.4 ต่ำสุด 1.2 สำหรับ 3 ครั้งต่อสัปดาห์, URR ≥ 65%", "Inflow stenosis: weak pulse, flat access, poor augmentation", "Outflow stenosis: hyperpulsatile, ไม่ collapse เมื่อยกแขน, prolonged bleeding (แขนบวมทั้งแขนให้คิดถึง central vein stenosis)", "Recirculation > 10% (two-needle urea method, slow-flow systemic sample จาก arterial line) หรือ > 5% (dilution method) ผิดปกติ"],
    ix: ["Physical examination (arm elevation, pulse augmentation test)", "Kt/V, URR, recirculation study", "Access flow (Qa) ถ้ามี", "Duplex US, fistulogram"],
    std: "KDOQI 2019 vascular access guideline, KDOQI 2015 HD adequacy"
  }, [
    N("AV access stenosis", "step", {
      s: "Clinical monitoring ผิดปกติ",
      why: "KDOQI 2019 ให้ clinical monitoring (physical examination) สม่ำเสมอเป็นหลัก ไม่แนะนำ routine surveillance ด้วย Qa, pressure หรือ duplex เพิ่มเติมเพื่อ patency และไม่แนะนำ pre-emptive angioplasty ของ stenosis ที่ไม่มี clinical indicator",
      keys: ["Physical examination เป็นหลัก"]
    }, [
      N("Inflow (juxta-anastomotic) stenosis", "nephro", {
        s: "Weak thrill, flat vein, arterial pressure ลบมาก, poor blood flow",
        why: "พบบ่อยใน AVF ที่ไม่ mature",
        ix: ["Duplex, fistulogram, angioplasty"]
      }),
      N("Outflow stenosis", "nephro", {
        s: "Pulsatile access, venous pressure สูง, bleeding นานหลังถอดเข็ม",
        why: "AVG มักตีบที่ venous anastomosis",
        ix: ["Fistulogram, angioplasty"]
      }),
      N("Central vein stenosis", "nephro", {
        s: "แขน หน้า หรือ breast บวมข้างเดียวกับ access, chest wall collaterals",
        why: "ประวัติ catheter ที่ subclavian หรือ internal jugular, pacemaker lead",
        ix: ["Venography"],
        link: "edema"
      }),
      N("Access thrombosis", "nephro", {
        s: "ไม่มี thrill ไม่มี bruit",
        why: "ส่วนใหญ่มี stenosis อยู่เบื้องหลัง ต้องหาและแก้พร้อมกับ thrombectomy ปัจจัยเสริมคือ IDH, hypercoagulable state, compression, HIT",
        ix: ["Thrombectomy โดยเร็ว (ทั่วไปภายใน 24-48 ชั่วโมง) พร้อม fistulogram หา stenosis"],
        link: "thrombosis"
      })
    ]),
    N("Catheter dysfunction", "step", {
      s: "นิยามเดิม (KDOQI 2006): Qb < 300 mL/min ที่ pre-pump arterial pressure ลบกว่า -250 mmHg ส่วน KDOQI 2019 นิยามว่าไม่สามารถคง Qb ตาม prescription ให้ฟอกได้เพียงพอโดยไม่ต้องยืดเวลา",
      keys: ["Early: malposition, kink", "Late: thrombus, fibrin sheath"]
    }, [
      N("Intraluminal thrombus / fibrin sheath", "nephro", {
        s: "Flow ค่อยๆ ลด, ต้องสลับสาย",
        why: "Alteplase lock, catheter exchange with sheath disruption",
        ix: ["Catheter function, venography"],
        std: "KDOQI 2019"
      }),
      N("Malposition / kink / migration", "nephro", {
        s: "Dysfunction ทันทีหรือตามท่า",
        ix: ["CXR tip position (tunneled catheter: cavoatrial junction ถึง mid right atrium)"]
      })
    ]),
    N("Recirculation and measurement errors", "step", {
      s: "Kt/V ต่ำโดย prescription เพียงพอ",
      keys: ["Access recirculation", "Sampling error"]
    }, [
      N("Access recirculation", "nephro", {
        s: "Needle ใกล้กันเกินไป, reversed needle, stenosis, Qb > Qa",
        ix: ["Urea recirculation (two-needle, slow-flow technique)"]
      }),
      N("Cardiopulmonary recirculation / sampling error", "nephro", {
        s: "Sampling error ทำ Kt/V คลาดเคลื่อนได้สองทิศ: pre-dialysis BUN ที่ปน saline หรือ heparin หรือเจาะหลังเริ่มฟอกแล้ว ทำให้ Kt/V ต่ำลวง ส่วน post-dialysis BUN ที่เจาะโดยไม่ slow flow (ปน recirculated blood) หรือเจาะก่อน urea rebound ทำให้ Kt/V สูงลวงและบดบัง under-dialysis",
        ix: ["Slow-flow sampling technique"]
      })
    ]),
    N("Prescription and adherence", "step", {
      s: "Dose ที่ได้รับจริงน้อยกว่าที่สั่ง",
      keys: ["Session time", "Blood flow", "Dialyzer"]
    }, [
      N("Shortened or missed sessions", "nephro", {
        s: "Treatment time จริงสั้นกว่า prescription",
        why: "Missed session สัมพันธ์กับ hospitalization และ mortality",
        ix: ["Treatment records"]
      }),
      N("Inadequate blood flow / dialyzer / clotting", "nephro", {
        s: "Qb ต่ำ, dialyzer เล็ก, dialyzer clotting",
        ix: ["Prescription review, heparin dose"]
      }),
      N("Large body size / loss of residual kidney function", "nephro", {
        s: "Body size ใหญ่ต้องการ dose มากขึ้น, residual function ลด",
        ix: ["Residual urea clearance"]
      })
    ]),
    N("Other access complications", "step", {
      s: "Complications ที่ไม่ใช่ inadequacy",
      keys: ["Steal", "Aneurysm", "High output"]
    }, [
      N("Access-induced distal ischemia (steal syndrome)", "nephro", {
        s: "Hand ischemia ข้าง access",
        ix: ["Digital pressure, duplex"],
        link: "raynaud"
      }),
      N("Aneurysm / pseudoaneurysm with skin thinning", "nephro", {
        s: "Shiny skin, ulceration, spontaneous bleeding risk",
        why: "Skin ulcer บน aneurysm เป็น emergency",
        ix: ["US, surgical revision"]
      }),
      N("High-output heart failure", "nephro", {
        s: "สงสัยเมื่อ Qa > 2 L/min (risk เริ่มตั้งแต่ > 1.5 L/min) หรือ Qa/CO > 30% ร่วมกับอาการ HF และ cardiac output สูง ตัวเลข Qa อย่างเดียวไม่ใช่เกณฑ์วินิจฉัย",
        ix: ["Access flow, echo"],
        link: "dyspnea"
      })
    ])
  ])
};

/* ===================== HD: CKD-MBD COMPLICATIONS ===================== */
TREES["hd-mbd"] = {
  must: [
    "PTH, Ca, PO4, ALP trend ย้อนหลัง, 25-OH D",
    "Phosphate binder (Ca-based, sevelamer, lanthanum, iron-based), calcitriol หรือ vitamin D analog, cinacalcet, etelcalcetide",
    "Diet PO4, adherence ต่อ binder, dialysis dose",
    "Bone pain, fracture, ส่วนสูงลด, deformity",
    "Pruritus, red eye, tendon rupture",
    "Painful skin lesion, warfarin (calciphylaxis)",
    "Parathyroidectomy ที่ผ่านมา",
    "Aluminum exposure: binder เก่า, water treatment"
  ],
  tree: N("Hemodialysis: CKD-MBD complications", "root", {
    s: "ใช้ trend ของ PTH, ALP, Ca, PO4 แยก high-turnover, low-turnover และ mixed bone disease แล้วจัดการ vascular calcification และ calciphylaxis",
    why: "CKD-MBD สัมพันธ์กับ fracture, vascular calcification และ CV mortality ใน dialysis และเป็นหัวข้อที่ออกข้อสอบทุกปี",
    keys: ["PTH target 2-9 เท่า ULN ใน G5D และดู trend", "PO4 ลดลงหาค่าปกติ เลี่ยง hypercalcemia", "ALP สูงกับ PTH สูงมาก: สนับสนุน high turnover", "PTH < 2 เท่า ULN กับ ALP ต่ำ: สนับสนุน low turnover", "PTH ในช่วง 2-9 เท่า ULN ทำนาย turnover ได้ไม่แม่น ถ้าผลจะเปลี่ยนการรักษาให้ยืนยันด้วย bone biopsy", "PO4 สูงต่อเนื่อง: ทบทวน diet, binder adherence และ dialysis adequacy (Kt/V) ก่อนเพิ่มยา"],
    ix: ["Ca, PO4, PTH, ALP, bone-specific ALP, 25-OH D", "Lateral abdominal X-ray หรือ echo สำหรับ vascular calcification", "DXA ถ้าผลจะเปลี่ยนการรักษา", "Bone biopsy ถ้าไม่ชัด", "Neck US, sestamibi ก่อน parathyroidectomy"],
    std: "KDIGO 2017 CKD-MBD guideline update"
  }, [
    N("High-turnover bone disease", "step", {
      s: "Severe secondary หรือ tertiary HPT",
      keys: ["PTH สูงมาก", "ALP สูง", "Ca สูงขึ้นเองใน tertiary"]
    }, [
      N("Severe secondary hyperparathyroidism", "nephro", {
        s: "PTH > 9 เท่า ULN ต่อเนื่อง, bone pain, pruritus",
        why: "รักษาด้วย calcimimetic, calcitriol หรือ vitamin D analog อย่างใดอย่างหนึ่งหรือใช้ร่วมกัน (KDIGO 2017 ไม่จัดลำดับ) พร้อมคุม PO4, EVOLVE (n = 3,883) cinacalcet ไม่ลด primary endpoint ใน ITT HR 0.93 (95% CI 0.85-1.02)",
        ix: ["PTH, Ca, PO4, ALP"],
        std: "KDIGO 2017, EVOLVE (NEJM 2012)"
      }),
      N("Tertiary hyperparathyroidism", "nephro", {
        s: "Hypercalcemia กับ PTH สูงแม้หยุด calcitriol และ Ca แล้ว หรือ hypercalcemia กับ PTH สูงที่คงอยู่หลัง KT",
        why: "Autonomous nodular hyperplasia การรักษาหลักคือ parathyroidectomy ส่วน calcimimetic เป็นทางเลือกเมื่อผ่าตัดไม่ได้หรือรอผ่าตัด",
        ix: ["Ca, PTH, imaging parathyroid"]
      }),
      N("Brown tumor / osteitis fibrosa cystica", "nephro", {
        s: "Lytic lesion ในกระดูก jaw, rib, pelvis",
        why: "DDx กับ metastasis และ myeloma ต้องดู PTH",
        ix: ["X-ray: subperiosteal resorption, salt-and-pepper skull, biopsy ถ้าไม่ชัด"],
        link: "bonepain"
      }),
      N("Parathyroidectomy and hungry bone", "nephro", {
        s: "Indication: severe HPT ที่ดื้อต่อการรักษา, calciphylaxis กับ PTH สูง, tertiary HPT",
        why: "Hungry bone syndrome หลังผ่าตัด เสี่ยงสูงเมื่อ ALP ก่อนผ่าตัดสูง",
        ix: ["Ca ทุก 6 ชั่วโมงหลังผ่าตัด"],
        link: "cramps"
      })
    ]),
    N("Low-turnover bone disease", "step", {
      s: "PTH ต่ำ ALP ต่ำ",
      keys: ["Over-suppression", "Aluminum", "DM"]
    }, [
      N("Adynamic bone disease", "nephro", {
        s: "Fracture, hypercalcemia เมื่อได้ Ca",
        why: "ลด calcitriol, Ca binder และ calcimimetic เพื่อให้ PTH ขึ้น",
        ix: ["PTH, bone-specific ALP, bone biopsy"],
        link: "bonepain"
      }),
      N("Aluminum bone disease", "nephro", {
        s: "Osteomalacia, microcytic anemia, encephalopathy",
        ix: ["Serum Al, DFO test, bone biopsy"],
        std: "KDOQI 2003",
        link: "bonepain"
      })
    ]),
    N("Calcification", "step", {
      s: "Vascular และ soft tissue calcification",
      keys: ["Ca load", "PO4 สูง", "Warfarin"]
    }, [
      N("Calciphylaxis", "nephro", {
        s: "Painful plaque และ necrotic ulcer",
        why: "หยุด warfarin (ถ้าหยุดได้) รวมทั้ง Ca และ vitamin D, optimize PTH และ PO4, sodium thiosulfate (off-label หลักฐานเป็น observational), wound care, pain control ทั้งนี้ Ca, PO4 และ PTH ปกติไม่ตัด calciphylaxis",
        ix: ["วินิจฉัยด้วย clinical เป็นหลัก, skin biopsy เมื่อไม่ชัด (เสี่ยงแผลไม่หาย และผลลบไม่ตัดโรค), bone scan ช่วยได้"],
        link: "skinulcer"
      }),
      N("Vascular and valvular calcification", "nephro", {
        s: "Medial calcification, AS, PAD",
        ix: ["Lateral abdominal X-ray (Kauppila score), echo"],
        std: "KDIGO 2017",
        link: "bluetoe"
      }),
      N("Tumoral calcinosis / conjunctival calcification", "nephro", {
        s: "Periarticular calcified mass, red eye",
        why: "Ca x PO4 product สูง",
        ix: ["X-ray, Ca, PO4"],
        link: "eye"
      })
    ]),
    N("Other bone disease in dialysis", "step", {
      s: "Bone disease ที่ไม่ใช่ renal osteodystrophy แบบ classic",
      keys: ["Vintage", "Steroid", "Osteoporosis"]
    }, [
      N("Dialysis-related amyloidosis", "nephro", {
        s: "Carpal tunnel, shoulder pain, bone cyst ใน vintage > 5-10 ปี",
        ix: ["X-ray, biopsy"],
        link: "bonepain"
      }),
      N("Osteoporosis / fragility fracture in dialysis", "nephro", {
        s: "Fracture โดย PTH ไม่ผิดปกติชัด",
        why: "Denosumab ทำ severe hypocalcemia ใน dialysis, bisphosphonate ใช้ด้วยความระวัง",
        ix: ["DXA, FRAX"],
        link: "bonepain"
      })
    ])
  ])
};

/* ===================== HD: HEMATURIA AND BLEEDING ===================== */
TREES["hd-bleed"] = {
  must: [
    "ตำแหน่ง: hematuria, access, GI, epistaxis, retroperitoneal, intracranial",
    "Heparin dose ระหว่างฟอก, anticoagulant, antiplatelet",
    "Dialysis vintage (ACKD), ADPKD",
    "Flank pain, weight loss, mass",
    "Stone, UTI",
    "Anemia trend, ESA dose ที่เพิ่ม",
    "Recent biopsy, catheter insertion, femoral access",
    "Uremic symptoms, Kt/V"
  ],
  tree: N("Hemodialysis: hematuria and bleeding", "root", {
    s: "แยก hematuria จาก native kidney (cyst, RCC, stone) ออกจาก systemic bleeding tendency (heparin, uremic platelet) และ bleeding ตำแหน่งอื่นที่ต้องหาในผู้ป่วย HD",
    why: "Hematuria ใน dialysis ต้องหาสาเหตุเหมือนคนทั่วไป (urothelial cancer, stone, infection) และคิดเพิ่มถึง ACKD กับ RCC และ ADPKD cyst hemorrhage ที่พบมากขึ้นในกลุ่มนี้ ส่วน bleeding ทั่วไปต้องปรับ heparin และ dialysis",
    keys: ["Anuric patient ที่มี hematuria ต้องหา lesion", "Acquired cystic kidney disease เพิ่ม RCC risk", "Heparin-free dialysis ใน active bleeding"],
    ix: ["CBC, coagulation, platelet", "US หรือ CT native kidneys", "Cystoscopy, urine culture, cytology", "CT สำหรับ retroperitoneal bleed"],
    std: "KDOQI 2015 HD adequacy"
  }, [
    N("Native kidney source", "step", {
      s: "Hematuria จากไตเดิม",
      keys: ["Cyst", "Tumor", "Stone"]
    }, [
      N("ADPKD cyst hemorrhage", "nephro", {
        s: "Flank pain กับ gross hematuria",
        ix: ["CT หรือ MRI"],
        link: "cysts"
      }),
      N("Acquired cystic kidney disease with hemorrhage", "nephro", {
        s: "Cyst rupture, perinephric hematoma",
        ix: ["CT"],
        link: "cysts"
      }),
      N("Renal cell carcinoma", "nephro", {
        s: "Mass ใน ACKD, papillary RCC พบบ่อย",
        why: "Risk เพิ่มตาม dialysis vintage ไม่มี guideline ให้ screen ทุกราย พิจารณา imaging ในผู้ที่ vintage นานและ life expectancy ดี เช่น KT candidate",
        ix: ["CT หรือ MRI"],
        link: "flank"
      }),
      N("Stone / infection / papillary necrosis", "nephro", {
        s: "Stone, pyelonephritis หรือ infected cyst, papillary necrosis (DM, analgesic)",
        ix: ["US หรือ CT, culture"],
        link: "stone"
      })
    ]),
    N("Lower urinary tract source", "step", {
      s: "Bladder หรือ prostate",
      keys: ["Age", "Smoking", "Cyclophosphamide หรือ aristolochic acid"]
    }, [
      N("Bladder cancer / urothelial carcinoma", "nephro", {
        s: "Painless hematuria ใน dialysis",
        why: "Risk factor ทั่วไปคืออายุและ smoking และ risk สูงขึ้นมากใน aristolochic acid nephropathy, analgesic nephropathy และผู้ที่เคยได้ cyclophosphamide",
        ix: ["Cystoscopy, CT urography"],
        link: "hematuria"
      }),
      N("Pyocystis / BPH", "adj", {
        s: "Infected anuric bladder หรือ prostate bleeding",
        ix: ["Bladder washout culture"]
      })
    ]),
    N("Systemic bleeding tendency", "step", {
      s: "Bleeding หลายตำแหน่ง",
      keys: ["Heparin", "Platelet function", "Anticoagulant"]
    }, [
      N("Heparin-related bleeding", "nephro", {
        s: "Bleeding ระหว่างหรือหลังฟอก",
        why: "Low-dose heparin, regional citrate หรือ heparin-free dialysis with saline flush",
        ix: ["aPTT, heparin dose review"]
      }),
      N("Uremic platelet dysfunction", "nephro", {
        s: "Mucocutaneous bleeding",
        ix: ["Hct, dialysis adequacy"],
        link: "bleeding"
      }),
      N("Thrombocytopenia (drug, sepsis, DIC, HIT)", "nephro", {
        s: "Thrombocytopenia จากยา, sepsis, DIC หรือ hypersplenism ทำให้ bleeding ส่วน HIT (platelet ลด 5-10 วันหลังเริ่ม heparin) เด่นที่ thrombosis รวม circuit และ access clotting ไม่ใช่ bleeding แต่ต้องวินิจฉัยเพราะต้องหยุด heparin ทุกรูปแบบ",
        ix: ["CBC, smear, 4T score, anti-PF4"],
        link: "bleeding"
      }),
      N("Anticoagulant / antiplatelet for AF or access", "nephro", {
        s: "Warfarin, DOAC, clopidogrel",
        ix: ["INR, drug review"]
      })
    ]),
    N("Other bleeding sites in HD", "step", {
      s: "Bleeding ที่ต้องหาเมื่อ Hb ลดโดยไม่มี hematuria",
      keys: ["GI", "Access", "Retroperitoneal", "Intracranial"]
    }, [
      N("GI bleeding: angiodysplasia, PUD", "nephro", {
        s: "Occult หรือ overt GI bleed",
        ix: ["EGD, colonoscopy, capsule"],
        link: "gibleed"
      }),
      N("Access bleeding / aneurysm rupture", "nephro", {
        s: "Prolonged bleeding หลังถอดเข็ม, skin ulcer บน aneurysm",
        ix: ["Fistulogram"],
        link: "hd-access"
      }),
      N("Retroperitoneal / subdural / hemorrhagic pericarditis", "nephro", {
        s: "Occult bleeding ที่อันตราย",
        ix: ["CT abdomen, CT brain, echo"],
        link: "ams"
      })
    ])
  ])
};

/* ===================== PD: CLOUDY EFFLUENT ===================== */
TREES["pd-cloudy"] = {
  must: [
    "ปวดท้อง, ไข้, ท้องเสีย, ท้องผูก, คลื่นไส้",
    "Touch contamination, ต่อสายผิด technique, ถุงรั่ว",
    "Exit site หรือ tunnel infection ร่วม",
    "Peritonitis ครั้งก่อน: organism และ timing (relapsing, recurrent, repeat)",
    "Antibiotic ที่เพิ่งได้ (fungal risk)",
    "ยา: CCB (lercanidipine, manidipine ทำ chylous-appearing effluent), icodextrin",
    "เพิ่งใส่สาย (eosinophilic), ประจำเดือน (hemoperitoneum)",
    "Colonoscopy, gynecologic procedure ล่าสุด"
  ],
  tree: N("Peritoneal dialysis: cloudy effluent", "root", {
    s: "Cloudy effluent คือ peritonitis จนกว่าจะพิสูจน์ได้ว่าไม่ใช่ ส่ง cell count และ culture แล้วเริ่ม empirical IP antibiotic ทันที ถ้า differential ไม่ใช่ PMN เด่นให้คิดถึง TB, fungal และ non-infectious cause ส่วน culture ลบอย่างเดียวไม่ตัด infectious peritonitis ให้รักษาต่อแบบ culture-negative peritonitis",
    why: "Peritonitis เป็นสาเหตุหลักของ technique failure และ examiner ถาม definition, empirical regimen, indication of catheter removal และ non-infectious cloudy effluent",
    keys: ["Peritonitis: 2 ใน 3 (clinical, effluent WBC > 100/µL กับ PMN > 50% หลัง dwell ≥ 2 ชั่วโมง, culture บวก)", "Polymicrobial enteric: ต้องหา surgical cause ในช่องท้อง", "Fungal: เอาสายออกทันที", "Refractory: effluent ไม่ใสหลัง appropriate antibiotic 5 วัน ให้เอาสายออก (ถ้า effluent WBC ลดลงต่อเนื่องเข้าหาปกติ สังเกตต่อเกิน 5 วันได้)"],
    ix: ["Effluent cell count with differential", "Effluent culture ในขวด blood culture, Gram stain", "Exit site swab", "Effluent TG, cytology, AFB ตาม clue", "CT ถ้า polymicrobial หรือไม่ดีขึ้น"],
    std: "ISPD 2022 peritonitis recommendations"
  }, [
    N("Bacterial peritonitis", "step", {
      s: "PMN-predominant, culture บวกเป็นส่วนใหญ่",
      why: "Empirical IP: vancomycin หรือ first-generation cephalosporin ร่วมกับ third-generation cephalosporin (ceftazidime) หรือ aminoglycoside, cefepime monotherapy เป็นทางเลือก เลือกตาม antibiogram ของศูนย์ เป้า peritonitis rate ไม่เกิน 0.40 episode ต่อ patient-year",
      keys: ["Relapsing: organism เดิมภายใน 4 สัปดาห์หลังจบการรักษา", "Recurrent: organism ต่างชนิดภายใน 4 สัปดาห์", "Repeat: organism เดิมหลัง 4 สัปดาห์"]
    }, [
      N("Gram-positive (CoNS, S. aureus, Streptococcus)", "nephro", {
        s: "Touch contamination หรือ exit site infection",
        why: "S. aureus ร่วมกับ exit site หรือ tunnel infection มักต้องเอาสายออก",
        ix: ["Culture, exit site examination"]
      }),
      N("Enterococcus and VRE PD peritonitis", "nephro", {
        s: "Gram-positive cocci ที่มักมาจาก enteric source และไม่ตอบสนองต่อ cefazolin เพราะ intrinsically resistant ต่อ cephalosporin",
        why: "Empiric cefazolin ร่วม ceftazidime ไม่ครอบคลุม Enterococcus ทำให้ cell count ไม่ลดใน 48-72 ชั่วโมง ต้องเปลี่ยนเป็น oral amoxicillin ถ้า ampicillin-susceptible หรือ IP vancomycin และรักษา 3 สัปดาห์ พร้อมหา enteric source เช่น constipation, colitis, diverticulitis, hernia",
        keys: ["Day 3 cell count ไม่ลด ให้คิดถึง inadequate coverage ก่อน และถ้ากลับเพิ่มหลังเปลี่ยนเป็นยากินให้ทบทวน susceptibility และ adherence", "VRE: linezolid หรือ daptomycin ตาม susceptibility และปรึกษา ID", "Enterococcus ร่วมเชื้ออื่นหรือ anaerobe ให้คิด surgical peritonitis"],
        ix: ["Culture ใน blood culture bottle, susceptibility ต่อ ampicillin และ vancomycin", "Effluent cell count วันที่ 3 และ 5", "CT abdomen ถ้าหลายเชื้อหรือมี peritoneal sign"],
        std: "ISPD 2022 peritonitis recommendations (Enterococcus 3 สัปดาห์)"
      }),
      N("Gram-negative (Pseudomonas, enteric)", "nephro", {
        s: "Enteric source, constipation, colitis, Pseudomonas exit site",
        why: "Pseudomonas ต้องใช้ antibiotic 2 ตัว และมักต้องเอาสายออกถ้ามี tunnel infection",
        ix: ["Culture, CT ถ้า polymicrobial"]
      }),
      N("Polymicrobial / surgical peritonitis", "nephro", {
        s: "Multiple enteric organisms หรือ anaerobe",
        why: "Diverticulitis, perforation, cholecystitis, ischemic bowel ส่วน polymicrobial ที่เป็น gram-positive ล้วนมักมาจาก contamination หรือ catheter infection และ prognosis ดีกว่า",
        ix: ["CT abdomen, surgical consult"],
        link: "abdpain"
      }),
      N("Culture-negative peritonitis", "nephro", {
        s: "Culture ลบ ราว 10-20% (ISPD เป้า < 15% ของ episode) ยังถือเป็น infectious peritonitis และรักษาต่อ",
        why: "Prior antibiotic, culture technique, fastidious organism, mycobacteria, fungus ถ้าอาการและ cell count ดีขึ้นในวันที่ 3 ให้หยุด aminoglycoside และคง gram-positive cover ต่อจนครบ 2 สัปดาห์ ถ้าไม่ดีขึ้นให้ส่ง special culture และพิจารณาเอาสายออกเมื่อครบ 5 วัน",
        ix: ["Repeat culture, AFB, fungal culture"]
      }),
      N("Antibiotic duration and response by organism", "adj", {
        s: "ISPD 2022: CoNS, Streptococcus, Corynebacterium และ culture-negative 2 สัปดาห์ ส่วน S. aureus, Enterococcus, Pseudomonas และ Gram-negative อื่น 3 สัปดาห์",
        why: "Refractory คือ effluent ไม่ใสหลังได้ยาที่เหมาะสม 5 วัน ให้เอาสายออกไม่ควรรอนาน (ยกเว้น effluent WBC กำลังลดลงเข้าหาปกติ) relapsing คือเชื้อเดิมภายใน 4 สัปดาห์หลังจบยา",
        keys: ["IP ดีกว่า IV และ intermittent IP ต้องให้ dwell อย่างน้อย 6 ชั่วโมง", "ผู้ที่ยังมี residual urine > 100 mL/วัน อาจต้องเพิ่ม dose ของยาที่ขับทางไตราว 25% (ISPD 2022 Table 5 footnote, หลักฐานจาก cephalosporin: cefazolin, ceftazidime, cefepime) และปรับตาม drug level กับ clinical response", "Antifungal prophylaxis (nystatin หรือ fluconazole) ทุกครั้งที่ได้ antibiotic", "ไม่เปลี่ยนเป็นยากินจนกว่า cell count ลดชัด"],
        ix: ["Cell count วันที่ 1, 3, 5", "Vancomycin level ก่อนให้ซ้ำ รักษาระดับ > 15 mg/L"],
        std: "ISPD 2022 peritonitis recommendations"
      })
    ]),
    N("Fungal and mycobacterial", "step", {
      s: "Culture หรือ cell pattern ไม่ปกติ",
      keys: ["Recent antibiotic", "Lymphocytic effluent"]
    }, [
      N("Fungal peritonitis", "nephro", {
        s: "Candida หลังได้ antibiotic",
        why: "ต้องเอาสายออกทันที และให้ antifungal ต่ออย่างน้อย 2 สัปดาห์หลังเอาสายออก ป้องกันได้ด้วย antifungal prophylaxis (nystatin หรือ fluconazole) ทุกครั้งที่ผู้ป่วย PD ได้ antibiotic",
        ix: ["Fungal culture, Gram stain yeast"],
        std: "ISPD 2022"
      }),
      N("Tuberculous / NTM peritonitis", "nephro", {
        s: "Culture-negative peritonitis ที่ไม่ดีขึ้น effluent เป็น lymphocytic หรือ mixed ได้ แต่ส่วนใหญ่ PMN เด่นเหมือน bacterial peritonitis จึงใช้ differential ตัด TB ไม่ได้",
        why: "พบได้ในไทย และ NTM สัมพันธ์กับ exit site infection, TB peritonitis รักษาด้วย anti-TB เป็นหลักโดยไม่จำเป็นต้องเอาสายออกทุกราย ส่วน NTM มักต้องเอาสายออกร่วมกับ antibiotic",
        ix: ["Effluent AFB, Xpert, mycobacterial culture, laparoscopic biopsy"],
        link: "abdomen"
      })
    ]),
    N("Non-infectious cloudy effluent", "step", {
      s: "Culture ลบร่วมกับ cell type ไม่ใช่ PMN หรือ cell น้อย (culture ลบอย่างเดียวไม่พอจะบอกว่า non-infectious)",
      keys: ["Eosinophil", "Chyle", "RBC", "Malignant"]
    }, [
      N("Eosinophilic peritonitis", "nephro", {
        s: "Eosinophil > 10% ในช่วงแรกหลังใส่สาย",
        why: "Air, plasticizer, icodextrin, vancomycin, fungal หรือ parasitic",
        ix: ["Effluent differential, Wright stain"]
      }),
      N("Chylous effluent", "nephro", {
        s: "Milky effluent, TG สูง",
        why: "Lymphoma, trauma, SVC thrombosis, CCB (lercanidipine, manidipine) ทำให้ effluent ขุ่นโดยไม่มี cell",
        ix: ["Effluent TG > 110 mg/dL, CT"],
        link: "lymphnode"
      }),
      N("Hemoperitoneum", "nephro", {
        s: "Bloody effluent",
        why: "Menstruation, ovulation, ovarian cyst rupture, ADPKD cyst, EPS, splenic หรือ liver lesion",
        ix: ["Effluent Hct, US pelvis"],
        link: "abdomen"
      }),
      N("Malignant ascites / chemical peritonitis / icodextrin sterile peritonitis", "nephro", {
        s: "Cytology หรือ drug exposure",
        ix: ["Cytology, drug history"]
      }),
      N("Specimen from dry abdomen", "adj", {
        s: "Dry abdomen หรือ dwell นานมาก: WBC สูงหลอกได้โดย PMN ไม่เด่น ส่วน dwell สั้น (APD): WBC ต่ำกว่า 100/µL ได้แม้เป็น peritonitis",
        why: "ใช้ PMN > 50% แทน absolute count เมื่อ dwell สั้น",
        ix: ["Repeat หลัง dwell ≥ 2 ชั่วโมง"]
      })
    ]),
    N("Indications for catheter removal", "step", {
      s: "Examiner ถามต่อเสมอ",
      keys: ["Refractory", "Relapsing", "Fungal", "Refractory exit site and tunnel", "Peritonitis รุนแรงหรือซ้ำหลายครั้งใน long vintage เพิ่ม risk encapsulating peritoneal sclerosis ภายหลัง"]
    }, [
      N("Catheter removal and transfer to HD", "nephro", {
        s: "เอาสายออก: refractory peritonitis, fungal, refractory exit site หรือ tunnel infection, NTM พิจารณาเอาออก: relapsing, recurrent, repeat peritonitis และ multiple enteric organisms",
        why: "Simultaneous removal และ re-insertion พิจารณาได้ใน relapsing, recurrent หรือ repeat peritonitis เมื่อ effluent culture ลบและ WBC < 100/µL โดยไม่มี exit site หรือ tunnel infection ส่วน refractory และ fungal ไม่ทำ simultaneous ให้รออย่างน้อย 2 สัปดาห์หลังเอาสายออกและอาการหายสนิท",
        ix: ["Clinical review"],
        std: "ISPD 2022"
      })
    ])
  ])
};

/* ===================== PD: DYSPNEA AND UF FAILURE ===================== */
TREES["pd-dyspnea"] = {
  must: [
    "Daily UF ต่อ exchange และต่อวัน, ใช้ dextrose ความเข้มข้นสูงบ่อยขึ้น",
    "Residual urine output trend, ยาที่ทำร้าย RKF (NSAID, aminoglycoside, contrast)",
    "Salt และ fluid intake, adherence ต่อ exchange",
    "Drain volume ต่ำกว่า fill volume, drain ช้า, ท้องผูก",
    "Effusion ข้างไหน (right hydrothorax), เกิดเร็วหลังเริ่ม PD",
    "Genital หรือ abdominal wall edema (leak)",
    "Peritonitis หลายครั้ง, PD vintage",
    "Chest pain, orthopnea, HF, glucose control"
  ],
  tree: N("Peritoneal dialysis: dyspnea and UF failure", "root", {
    s: "แยก fluid overload จาก UF failure จริง, mechanical problem, leak, loss of residual function และ adherence แล้วใช้ PET แยก membrane type",
    why: "Volume overload เป็นสาเหตุหลักของ technique failure และ CV mortality ใน PD และ examiner ถาม PET, UF failure type และ hydrothorax",
    keys: ["UF failure: net UF < 400 mL หลัง dwell 4 ชั่วโมงด้วย 4.25% (3.86%) dextrose", "PET D/P Cr 4 ชั่วโมง: high > 0.81, high-average 0.65-0.81, low-average 0.50-0.64, low < 0.50", "Sodium dip ที่ 1 ชั่วโมง ≤ 5 mmol/L บน 3.86% (4.25%) dextrose: free water transport ลด (aquaporin pathway หรือ osmotic conductance ลด) แต่ sodium dip ลดได้ใน fast transporter ด้วย ต้องแปลผลร่วมกับ D/P Cr", "Drain volume น้อยกว่า fill volume โดย PET ปกติ: mechanical problem หรือ leak"],
    ix: ["Fluid balance, residual urine volume และ Kt/V", "Modified PET ด้วย 4.25% dextrose", "Abdominal X-ray (catheter position, stool)", "CXR, pleural fluid glucose", "CT peritoneography หรือ scintigraphy ถ้าสงสัย leak", "Echo, NT-proBNP"],
    std: "ISPD 2021 recommendations for evaluation of peritoneal membrane dysfunction, ISPD 2020 prescribing high-quality goal-directed PD"
  }, [
    N("Membrane UF failure", "step", {
      s: "Net UF ต่ำบน modified PET",
      keys: ["Transport type", "Sodium sieving"]
    }, [
      N("Type I: fast peritoneal solute transfer rate (high transport)", "nephro", {
        s: "Glucose gradient หายเร็ว, D/P Cr สูง",
        why: "สาเหตุ: inflammation, peritonitis ซ้ำ, long vintage การจัดการ: short dwell (APD) และ icodextrin สำหรับ long dwell",
        ix: ["PET D/P Cr > 0.81"]
      }),
      N("Type II: low transport / reduced surface area", "nephro", {
        s: "Adhesion หลัง peritonitis หรือ surgery",
        ix: ["PET D/P Cr ต่ำ, CT"]
      }),
      N("Type III: low osmotic conductance to glucose (aquaporin dysfunction)", "nephro", {
        s: "Free water transport ลด, sodium dip หายไป",
        why: "ใน long vintage เป็น risk marker ของ EPS ที่ต้องเฝ้าระวัง แต่ไม่ได้แปลว่าเป็น EPS ทุกราย",
        ix: ["Sodium sieving, free water transport"],
        link: "abdomen"
      }),
      N("Type IV: high lymphatic reabsorption", "nephro", {
        s: "UF ต่ำโดย transport ปกติ",
        ix: ["Diagnosis of exclusion"]
      })
    ]),
    N("Mechanical and leak", "step", {
      s: "Drain ไม่ดีหรือน้ำยาไปผิดที่",
      keys: ["Drain < fill", "Edema ผิดตำแหน่ง", "Effusion"]
    }, [
      N("Pleuroperitoneal leak (hydrothorax)", "nephro", {
        s: "Effusion ข้างขวาเป็นส่วนใหญ่ (ราว 90%) มักเกิดช่วงแรกหลังเริ่ม PD แต่เกิดหลังทำมานานได้ ร่วมกับ drain volume ลดลง",
        ix: ["Pleural glucose สูง (pleural-serum gradient > 50 mg/dL), protein < 1 g/dL แต่ gradient ไม่สูงไม่ตัด leak", "Scintigraphy หรือ CT peritoneography"],
        link: "dyspnea"
      }),
      N("Abdominal wall / genital leak / hernia", "nephro", {
        s: "Abdominal wall edema, genital swelling, apparent UF failure",
        ix: ["CT peritoneography"],
        link: "pd-catheter"
      }),
      N("Catheter malposition / omental wrap / constipation", "nephro", {
        s: "Outflow failure, drain ช้า",
        ix: ["Abdominal X-ray"],
        link: "pd-catheter"
      }),
      N("Diaphragmatic splinting from large fill volume", "nephro", {
        s: "Dyspnea ขณะท้องเต็ม โดยไม่มี volume overload",
        ix: ["Reduce fill volume, supine APD"]
      })
    ]),
    N("Patient and prescription factors", "step", {
      s: "UF เพียงพอแต่ volume ยังเกิน",
      keys: ["Salt intake", "RKF", "Adherence"]
    }, [
      N("Loss of residual kidney function", "nephro", {
        s: "Urine output ลดลง",
        why: "RKF สำคัญต่อ survival ใน PD, หลีกเลี่ยง nephrotoxin และใช้ loop diuretic dose สูงเพื่อเพิ่ม urine volume (ไม่ได้ชะลอการเสื่อมของ RKF)",
        ix: ["24-hour urine volume และ urea clearance"]
      }),
      N("Excess salt and water intake", "nephro", {
        s: "Thirst จาก Na intake หรือ hyperglycemia",
        ix: ["Dietary review, glucose"]
      }),
      N("Non-adherence / inappropriate prescription", "nephro", {
        s: "Skipped exchange หรือ long dwell reabsorption",
        why: "Icodextrin สำหรับ long dwell ลด reabsorption",
        ix: ["Exchange log, APD record"]
      })
    ]),
    N("Non-PD cause of dyspnea", "step", {
      s: "Dyspnea จากหัวใจหรือปอด",
      keys: ["HF", "Ischemia", "Infection"]
    }, [
      N("Heart failure / ischemia / valvular disease", "nephro", {
        s: "Cardiac cause ใน PD",
        ix: ["Echo, troponin"],
        link: "dyspnea"
      }),
      N("Pneumonia / PE / anemia", "adj", {
        s: "Other causes",
        ix: ["CXR, CTPA, Hb"],
        link: "dyspnea"
      })
    ])
  ])
};

/* ===================== PD: CATHETER AND EXIT-SITE PROBLEMS ===================== */
TREES["pd-catheter"] = {
  must: [
    "Exit site: แดง หนอง crust granulation, ปวดตามแนว tunnel",
    "Drain ไม่ออกหรือช้า (outflow) หรือเติมไม่เข้า (inflow)",
    "Constipation, bladder distension",
    "Leak รอบสาย, ท้องบวมเฉพาะที่, ถุงอัณฑะหรือ labia บวม",
    "Cuff โผล่, สายเลื่อน",
    "Exit site care routine, topical prophylaxis (mupirocin, gentamicin)",
    "S. aureus nasal carriage, Pseudomonas exit site ครั้งก่อน",
    "เวลาหลังใส่สาย, เทคนิคการใส่"
  ],
  tree: N("Peritoneal dialysis: catheter and exit-site problems", "root", {
    s: "แยก infectious (exit site, tunnel) กับ mechanical (malposition, obstruction, leak, hernia, cuff extrusion) แล้วตัดสินใจว่าต้อง revise หรือเปลี่ยนสาย",
    why: "Exit site และ tunnel infection นำไปสู่ peritonitis และ catheter loss ส่วน mechanical problem เป็นสาเหตุ technique failure ช่วงแรก",
    keys: ["Exit site infection: purulent drainage ± erythema", "Tunnel infection: erythema, edema, tenderness ตาม tunnel หรือ collection บน US", "Outflow failure โดย inflow ปกติ: malposition, constipation, omental wrap"],
    ix: ["Exit site swab culture", "Tunnel US", "Abdominal X-ray", "CT peritoneography สำหรับ leak และ hernia"],
    std: "ISPD 2023 catheter-related infection recommendations, ISPD 2019 catheter access guideline"
  }, [
    N("Exit-site and tunnel infection", "step", {
      s: "Purulent drainage หรือ tunnel inflammation",
      keys: ["S. aureus", "Pseudomonas", "Tunnel US"]
    }, [
      N("Exit-site infection", "nephro", {
        s: "Purulent discharge ที่ exit site",
        why: "Oral antibiotic 2 สัปดาห์ ลดเหลือ 7-10 วันได้ถ้าหายชัดที่ราว 1 สัปดาห์ (Pseudomonas และ tunnel infection อย่างน้อย 3 สัปดาห์), prophylaxis topical mupirocin หรือ gentamicin",
        ix: ["Swab culture"],
        std: "ISPD 2023"
      }),
      N("Tunnel infection", "nephro", {
        s: "Erythema และ tenderness ตาม tunnel, collection บน US",
        why: "Antibiotic อย่างน้อย 3 สัปดาห์ เอาสายออกถ้าเกิดร่วมกับ peritonitis จากเชื้อเดียวกัน ถ้า refractory (ไม่ตอบสนองหลัง effective antibiotic 2 สัปดาห์ หรือ 3 สัปดาห์ใน Pseudomonas) โดยไม่มี peritonitis ให้ทำ simultaneous removal และ re-insertion ส่วน cuff shaving เป็นทางเลือกเมื่อ external cuff extrusion",
        ix: ["Tunnel US"]
      }),
      N("Exit-site infection progressing to peritonitis", "nephro", {
        s: "Organism เดียวกันทั้ง exit site และ effluent",
        why: "เป็น indication ของการเอาสายออก และไม่ทำ simultaneous re-insertion ขณะ peritonitis ยังไม่หาย ให้รออย่างน้อย 2 สัปดาห์",
        ix: ["Effluent culture"],
        link: "pd-cloudy"
      }),
      N("NTM / fungal exit-site infection", "nephro", {
        s: "Exit-site infection ที่ไม่ตอบสนองต่อ standard therapy หรือ culture ทั่วไปไม่ขึ้น",
        why: "มีรายงาน (observational) ว่า gentamicin cream ระยะยาวสัมพันธ์กับ NTM และ fungal แต่เกิดได้ในผู้ที่ไม่เคยใช้ด้วย",
        ix: ["AFB และ fungal culture"]
      })
    ]),
    N("Flow problems", "step", {
      s: "Inflow หรือ outflow failure",
      keys: ["Outflow only", "Both inflow and outflow"]
    }, [
      N("Constipation / bladder distension", "nephro", {
        s: "สาเหตุของ outflow failure ที่พบบ่อยที่สุด",
        ix: ["Abdominal X-ray, bladder scan"]
      }),
      N("Catheter malposition / migration", "nephro", {
        s: "Catheter tip ออกนอก pelvis ร่วมกับ outflow failure (tip นอก pelvis ที่ flow ยังดีไม่ต้องแก้)",
        ix: ["Abdominal X-ray"]
      }),
      N("Omental wrap / adhesion", "nephro", {
        s: "Outflow failure ที่ไม่แก้ด้วย laxative",
        ix: ["Laparoscopic revision, omentopexy"]
      }),
      N("Intraluminal fibrin / clot", "nephro", {
        s: "Inflow และ outflow failure",
        why: "Heparin ใน dialysate หรือ alteplase",
        ix: ["Flush test"]
      })
    ]),
    N("Leaks and hernia", "step", {
      s: "Fluid ออกนอก peritoneal cavity",
      keys: ["Early vs late", "Intra-abdominal pressure"]
    }, [
      N("Pericatheter leak", "nephro", {
        s: "Clear fluid ออกที่ exit site ช่วง 30 วันแรก",
        why: "เริ่ม PD เร็วเกิน หรือ fill volume มาก, ใช้ low-volume supine APD หรือพักชั่วคราว",
        ix: ["Dipstick glucose ของ fluid"]
      }),
      N("Abdominal wall and genital leak", "nephro", {
        s: "Localized edema, scrotal หรือ labial swelling",
        ix: ["CT peritoneography"]
      }),
      N("Hernia (inguinal, umbilical, incisional)", "nephro", {
        s: "Bulge ที่เพิ่มเมื่อ fill",
        why: "Repair แล้วกลับมาทำ PD ด้วย low volume ได้",
        ix: ["Clinical, US"]
      })
    ]),
    N("Structural catheter problems", "step", {
      s: "ปัญหาของตัวสาย",
      keys: ["Cuff", "Damage"]
    }, [
      N("Cuff extrusion", "nephro", {
        s: "Superficial cuff โผล่ที่ exit site",
        why: "เพิ่ม exit site infection risk, cuff shaving หรือ replacement",
        ix: ["Clinical"]
      }),
      N("Catheter damage / disconnection", "nephro", {
        s: "Crack หรือ leak ของสาย, disconnection",
        why: "Clamp สาย เปลี่ยน transfer set ถ้าเป็น wet contamination (น้ำยาไหลผ่านขณะสายเปิด) ให้ prophylactic antibiotic และส่ง effluent cell count กับ culture ส่วน dry contamination ไม่จำเป็นต้องให้",
        ix: ["Inspect catheter"]
      })
    ])
  ])
};
