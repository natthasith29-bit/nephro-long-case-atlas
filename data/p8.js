/* Phase 8 Kidney biopsy (Nov 2026): approach lines that start from a biopsy pattern.
   Same node schema as data/p1.js plus:
   bx: {lm, if, em, key} biopsy findings shown in the node card (key = the discriminator examiners want)
   TREES[id].tables: [{title, head, rows, note}] comparison tables shown under the map.
   Every line ends with an "In the transplant kidney" branch. The reading guide is data/bxguide.js (#n-bxread). */

const B = (lm, ifx, em, key) => ({lm, if: ifx, em, key});
const KTSTEP = (s, keys) => ({ s, keys, ix: ["Banff lesion scores, C4d, SV40, DSA, CNI level", "เทียบกับโรคเดิมของไตก่อน KT"] });

/* ===================== CRESCENTIC ===================== */
TREES["bx-crescent"] = {
  must: [
    "Serology ครบหรือยัง: ANCA (MPO, PR3), anti-GBM, C3, C4, ANA, anti-dsDNA, ASO, cryoglobulin",
    "ร้อยละของ glomeruli ที่มี crescent และชนิด (cellular, fibrocellular, fibrous)",
    "Crescent อยู่ระยะเดียวกันหรือหลายระยะ",
    "ร้อยละของ normal glomeruli (Berden, ANCA renal risk score)",
    "IF pattern: linear, granular หรือ pauci-immune",
    "IFTA เพื่อบอก chronicity และประโยชน์ของการกดภูมิ"
  ],
  tree: N("Crescentic and necrotizing GN", "root", {
    s: "นับ crescent และดูว่าอยู่ระยะเดียวกันหรือหลายระยะ แล้วใช้ IF แบ่งเป็น linear (anti-GBM), granular immune complex และ pauci-immune",
    why: "IF แบ่ง crescentic GN เป็นสามกลุ่มที่รักษาต่างกันทันที และระยะของ crescent บอกทั้งกลไกและสิ่งที่ยังช่วยได้",
    keys: ["Crescent คือ extracapillary hypercellularity ≥ 10% ของเส้นรอบวง Bowman capsule", "Crescentic GN เมื่อ ≥ 50% ของ glomeruli มี crescent", "Same-stage crescent เข้าได้กับ anti-GBM มากกว่า, multistage เข้าได้กับ ANCA มากกว่า แต่ไม่จำเพาะ ต้องตัดสินด้วย IF และ serology"],
    ix: ["IF pattern, serology, EM"],
    std: "ISN/RPS 2018 crescent definitions, Berden AE et al. JASN 2010, Brix SR et al. Kidney Int 2018, KDIGO 2024 ANCA vasculitis",
    bx: B("Cellular crescent: เซลล์และ fibrin > 75%, fibrocellular 25-75%, fibrous: matrix > 75%", "Linear, granular หรือ pauci-immune (ไม่มีหรือมี Ig และ complement เพียงเล็กน้อย โดยทั่วไป ≤ 1+ บางนิยามใช้ ≤ 2+ จากสเกล 0-4+)", "Deposit มีหรือไม่และอยู่ที่ใด, GBM gap", "ระยะของ crescent ร่วม IF pattern ช่วยบอกกลไกที่น่าจะเป็นได้ก่อนผล serology แต่ต้องยืนยันด้วย serology ทุกราย")
  }, [
    N("Linear IgG along GBM", "step", { s: "Anti-GBM หรือ mimic", keys: ["Crescent เกือบทั้งหมดอยู่ระยะเดียวกัน"], ix: ["Anti-GBM serum, ANCA ทุกราย"] }, [
      N("Anti-GBM disease (Goodpasture)", "nephro", { s: "Linear IgG, crescent ระยะเดียวกันทั้งชิ้น", keys: ["Serum anti-GBM บวกในส่วนใหญ่ ราว 10% ลบ ผลลบจึงไม่ตัดโรคถ้า linear IgG ชัดร่วม crescentic GN"], ix: ["PLEX ร่วม cyclophosphamide และ glucocorticoid ทันทีโดยไม่รอผล biopsy ถ้าสงสัยมาก (ยกเว้นรายที่ dialysis-dependent ตั้งแต่แรก ร่วมกับ crescent 100% หรือ global glomerulosclerosis > 50% ใน biopsy ที่ adequate และไม่มี pulmonary hemorrhage)"],
        bx: B("Crescent ระยะเดียวกัน (synchronous) ส่วนใหญ่มี crescent > 50% ของ glomeruli (เฉลี่ยราวสามในสี่), segmental fibrinoid necrosis, GBM และ Bowman capsule rupture บน silver, periglomerular inflammation, glomeruli ที่ไม่มี crescent มักปกติ", "Linear IgG ชัด 2-3+ ตาม GBM (บางรายมี IgA หรือ IgM), C3 granular หรือ linear ราวสองในสาม, อาจมี linear TBM", "ไม่มี immune deposit, GBM gap", "Same-stage crescent ร่วม linear IgG บ่งถึง insult ครั้งเดียวที่รุนแรง ทุกรายต้องตรวจ ANCA และถ้าเห็น crescent หลายระยะหรือ chronic lesion มากเกินระยะเวลาที่ป่วย ยิ่งต้องสงสัย double positive") }),
      N("Double positive (anti-GBM with MPO-ANCA)", "nephro", { s: "Anti-GBM ร่วม MPO-ANCA", keys: ["MPO บวกร่วม"], ix: ["ระยะแรกรักษาแบบ anti-GBM (รวม PLEX) แล้วให้ maintenance แบบ AAV เพราะ relapse ได้"],
        bx: B("Crescent หลายระยะ มี fibrous crescent และ global sclerosis มากกว่า anti-GBM เดี่ยว", "Linear IgG เหมือน anti-GBM", "ไม่มี deposit", "Chronic lesion ที่มากกว่าคาดเชื่อว่าเป็นร่องรอยของ ANCA GN ที่เป็นมาก่อน") }),
      N("Linear IgG mimics: DKD, MIDD, fibrillary", "nephro", { s: "Linear IgG ที่ไม่มี necrotizing crescentic GN และมีโรคอื่นอธิบาย (serum anti-GBM ลบอย่างเดียวยังไม่พอจะเรียก mimic เพราะมี seronegative และ atypical anti-GBM)", keys: ["Light chain restriction ใน MIDD", "Linear IgG ร่วม linear albumin ใน DKD"], ix: ["κ, λ, EM, DNAJB9"],
        bx: B("DKD: GBM หนา KW nodule, MIDD: nodular GS, fibrillary: mesangial expansion หรือ MPGN", "DKD: linear IgG ร่วม albumin (insudation), MIDD: linear light chain ชนิดเดียว (ส่วนใหญ่ κ) ตาม GBM และ TBM, fibrillary: smudgy pseudolinear IgG", "DKD: GBM หนา homogeneous, MIDD: powdery punctate deposit, fibrillary: fibril 12-24 nm", "Linear IgG ที่มี linear albumin ความเข้มใกล้เคียงกันคือ nonspecific insudation ไม่ใช่ anti-GBM antibody") })
    ]),
    N("Granular immune complex deposits", "step", { s: "Immune complex crescentic GN", keys: ["Full-house นึกถึง LN ก่อน (non-lupus full-house พบได้ เช่น endocarditis, HIV, IgAN)", "IgA dominant นึกถึง IgAN, IgAV และ staphylococcus-associated IRGN", "C3 dominant นึกถึง IRGN หรือ C3G", "IgM กับ IgG, C3 และ pseudothrombi นึกถึง cryo"], ix: ["Complement, ANA, ASO, cryoglobulin"] }, [
      N("Lupus nephritis", "nephro", { s: "Class III หรือ IV ที่มี crescent", keys: ["Full-house, C1q เด่น"], ix: ["Activity และ chronicity index"],
        bx: B("Endocapillary hypercellularity, wire loop, hyaline thrombi, karyorrhexis, crescent", "Full-house (IgG, IgA, IgM, C3, C1q) granular mesangial และ capillary wall, extraglomerular deposit ที่ TBM และ vessel", "Subendothelial และ mesangial deposit, tubuloreticular inclusion", "C1q เด่นร่วม full-house, extraglomerular deposit และ TRI สนับสนุน LN อย่างมาก แต่ต้องมี clinical และ serology ประกอบ (TRI พบใน HIV และภาวะ interferon สูงได้)") }),
      N("IgA nephropathy / IgA vasculitis", "nephro", { s: "IgAN หรือ IgAV ที่มี crescent (C1 หรือ C2)", keys: ["IgA dominant"], ix: ["MEST-C"],
        bx: B("Mesangial hypercellularity ร่วม crescent, C0 ไม่มี crescent, C1 มีอย่างน้อย 1 glomerulus แต่ < 25%, C2 ≥ 25% ของ glomeruli (นับ cellular และ fibrocellular crescent), IgAV มี endocapillary และ fibrin มากกว่า", "IgA dominant หรือ co-dominant mesangial ร่วม C3, λ มักมากกว่า κ", "Mesangial และ paramesangial deposit", "Crescentic IgAN ที่ crescent ≥ 50% และ eGFR ลดเร็วรักษาเหมือน RPGN") }),
      N("Infection-related GN", "nephro", { s: "Crescent ร่วม endocapillary และ hump", keys: ["C3 เด่น, hump บน EM"], ix: ["Culture, ASO"],
        bx: B("Diffuse endocapillary hypercellularity มี neutrophil, crescent พบไม่บ่อย", "C3 เด่น starry sky หรือ garland, IgG น้อยกว่า, IgA เด่นใน staphylococcal", "Subepithelial hump", "Crescent มากใน IRGN เป็น poor prognostic sign") }),
      N("C3 glomerulopathy (C3GN, DDD)", "nephro", { s: "Crescentic C3G", keys: ["C3 ≥ 2 orders"], ix: ["Complement work-up"],
        bx: B("MPGN หรือ proliferative pattern ร่วม crescent", "C3 ≥ 2 orders มากกว่า Ig", "DDD: intramembranous dense ribbon, C3GN: deposit หลายตำแหน่ง", "C3 ต่ำค้างนาน > 12 สัปดาห์ชี้ไปทาง C3G มากกว่า IRGN แต่ serum C3 ปกติไม่ตัด C3G") }),
      N("Cryoglobulinemic GN", "nephro", { s: "MPGN กับ pseudothrombi", keys: ["Curved microtubule บน EM"], ix: ["Cryoglobulin, HCV"],
        bx: B("MPGN pattern, intraluminal hyaline pseudothrombi, monocyte จำนวนมาก (CD68), crescent บางราย, vasculitis ของ small artery", "IgM ร่วม IgG และ C3, κ เด่นใน type II (IgM-κ)", "Curved microtubule 20-35 nm หรือ annular ใน deposit", "Pseudothrombi ร่วม monocyte จำนวนมากเป็นลักษณะเด่นของ cryo (hyaline thrombi พบใน LN ได้เช่นกัน)") })
    ]),
    N("Pauci-immune (Ig and complement ≤ 1+)", "step", { s: "ANCA vasculitis หรือ ANCA-negative", keys: ["Fibrinoid necrosis, fibrin ใน crescent", "ไม่มี deposit หรือมีน้อยมากบน EM"], ix: ["ANCA, Berden class, ANCA renal risk score"] }, [
      N("MPA / renal-limited vasculitis", "nephro", { s: "ส่วนใหญ่ MPO-ANCA", keys: ["Chronic lesion มากกว่า GPA"], ix: ["ANCA renal risk score"],
        bx: B("Crescent หลายระยะอยู่ด้วยกัน (cellular, fibrocellular, fibrous) เพราะ flare เป็นระลอก, segmental fibrinoid necrosis, GBM break, glomeruli ปกติแทรกระหว่าง, global sclerosis และ IFTA มากกว่า PR3, อาจมี necrotizing arteritis ของ interlobular artery", "Pauci-immune ≤ 1+, fibrinogen ใน crescent และ necrosis", "ไม่มี deposit หรือน้อยมาก", "Multistage crescent ต่างจาก anti-GBM ที่ same stage") }),
      N("GPA", "nephro", { s: "ส่วนใหญ่ PR3-ANCA", keys: ["Active lesion มากกว่า MPO", "แยก GPA จาก MPA ด้วย granulomatous disease ของ respiratory tract ไม่ใช่ด้วยชนิด ANCA หรือ biopsy ไต"], ix: ["ENT, CT chest"],
        bx: B("เหมือน MPA แต่ cellular crescent และ necrosis มากกว่า chronic lesion, บางรายมี granulomatous inflammation รอบ glomerulus หรือใน interstitium", "Pauci-immune", "ไม่มี deposit", "Granuloma ในไตพบไม่บ่อย ถ้าพบร่วม necrotizing crescentic GN จะสนับสนุน GPA (ต้องแยก drug, sarcoidosis และ TB)") }),
      N("ANCA-negative pauci-immune GN", "nephro", { s: "ANCA ลบ", keys: ["ภาพเหมือน AAV"], ix: ["รักษาแบบ AAV"],
        bx: B("Necrotizing crescentic GN เหมือน AAV", "Pauci-immune", "ไม่มี deposit", "ต้อง ANCA ลบซ้ำ (ทั้ง IIF และ ELISA) และตัด anti-GBM, infection เช่น endocarditis และยาก่อนรักษาแบบ AAV") })
    ]),
    N("In the transplant kidney", "step", KTSTEP("Crescent ใน graft ต้องแยก recurrence กับ alloimmune injury", ["Linear IgG ร่วม crescentic GN ในผู้รับที่เป็น Alport = post-KT anti-GBM nephritis (linear IgG อย่างเดียวโดยไม่มี GN พบได้บ่อยกว่าและไม่ใช่โรค)", "Pauci-immune crescent นึกถึง recurrent AAV ก่อน", "MVI กับ C4d = ABMR ไม่ใช่ GN"]), [
      N("Post-transplant anti-GBM nephritis in Alport syndrome", "nephro", { s: "Alloantibody ต่อ α5(IV) ของไตผู้บริจาค", keys: ["พบราว 3-5% ของผู้รับที่เป็น Alport มักในปีแรก เสี่ยงสูงสุดใน X-linked Alport เพศชายที่มี large deletion หรือ truncating variant"], ix: ["Anti-GBM (บาง assay ตรวจไม่พบ alloantibody)"],
        bx: B("Crescentic GN ใน graft", "Linear IgG ตาม GBM", "ไม่มี deposit", "Linear IgG ใน graft ของผู้ป่วย Alport คือ alloimmune ไม่ใช่ autoimmune") }),
      N("Recurrent ANCA GN or anti-GBM disease", "nephro", { s: "Recurrence ไม่บ่อย", keys: ["Anti-GBM ควรลบอย่างน้อย 6 เดือนก่อน KT (KDIGO)", "AAV ควรอยู่ใน complete clinical remission ≥ 6 เดือนก่อน KT ส่วน ANCA ที่ยังบวกอย่างเดียวไม่เป็นเหตุให้เลื่อน KT (KDIGO 2024)"], ix: ["ANCA, anti-GBM"],
        bx: B("Necrotizing crescentic GN เหมือนไตเดิม", "Pauci-immune หรือ linear IgG", "ไม่มี deposit", "ต้องแยกจาก TMA ของ ABMR และ CNI") })
    ])
  ]),
  tables: [
    { title: "ANCA GN vs anti-GBM vs immune complex crescentic GN", head: ["Feature","ANCA GN","Anti-GBM","Immune complex"], rows: [
      ["ระยะของ crescent","หลายระยะ (cellular, fibrocellular, fibrous ปนกัน)","ระยะเดียวกันเกือบทั้งชิ้น","หลากหลาย ร่วม proliferation"],
      ["Glomeruli ที่ไม่มี crescent","มักปกติ แทรกระหว่าง","มักปกติ แต่เหลือน้อย","มี endocapillary หรือ mesangial proliferation"],
      ["Necrosis","Segmental fibrinoid necrosis เด่น","เด่น ร่วม GBM rupture","พบได้ใน LN และ IgAV"],
      ["IF","≤ 1+ (pauci-immune), fibrinogen","Linear IgG 2-3+","Granular: full-house, IgA, C3 หรือ IgM"],
      ["EM","ไม่มี deposit","ไม่มี deposit, GBM gap","Deposit ตามโรค"],
      ["Chronic lesion","มากใน MPO","น้อย ถ้ามากคิด double positive","ตามโรค"],
      ["Extraglomerular ในชิ้นเนื้อ","Necrotizing arteritis, granuloma (GPA)","ไม่มี vasculitis","Vasculitis ใน cryo และ LN"]
    ]},
    { title: "Berden histopathologic classification and ANCA renal risk score", head: ["Berden class","Definition","ANCA renal risk score","Points"], rows: [
      ["Focal","≥ 50% normal glomeruli","Normal glomeruli > 25% / 10-25% / < 10%","0 / 4 / 6"],
      ["Crescentic","≥ 50% glomeruli มี cellular crescent","IFTA ≤ 25% / > 25%","0 / 2"],
      ["Mixed","ไม่เข้ากลุ่มใดชัด","eGFR > 15 / ≤ 15 mL/min/1.73 m² ตอนวินิจฉัย","0 / 3"],
      ["Sclerotic","≥ 50% globally sclerotic","รวม: low 0, medium 2-7, high 8-11","ทำนาย kidney failure ที่ 3 ปี"]
    ], note: "สองระบบวางคู่กันในตารางเดียว แต่ละแถวของ Berden ไม่ได้สัมพันธ์กับแถวของ ANCA renal risk score. Berden จัดตามลำดับ: sclerotic ก่อน แล้ว focal แล้ว crescentic ที่เหลือเป็น mixed. Prognosis ดีสุดใน focal แย่สุดใน sclerotic. ANCA renal risk score (Brix 2018) ทำนาย kidney failure ที่ 3 ปีได้ราว 0%, 26% และ 68% ใน low, medium และ high risk และแยกกลุ่มได้ดีกว่า Berden เพราะรวม eGFR และ IFTA" }
  ]
};

/* ===================== MESANGIAL PROLIFERATIVE ===================== */
TREES["bx-mesangial"] = {
  must: [
    "Hematuria episode เกิดพร้อม URI ภายใน 1-3 วัน (synpharyngitic) หรือเกิดหลังติดเชื้อ 1-3 สัปดาห์ (pharyngitis) ถึง 3-6 สัปดาห์ (skin)",
    "Purpura, arthralgia, abdominal pain (IgAV)",
    "ANA, anti-dsDNA, C3, C4",
    "Cirrhosis, IBD, celiac, HIV (secondary IgA)",
    "UPCR และ eGFR เพื่อ IgAN prediction tool",
    "IF dominant reactant ซึ่งเป็นตัวตัดสินในกลุ่มนี้"
  ],
  tree: N("Mesangial proliferative GN", "root", {
    s: "Mesangial hypercellularity (≥ 4 เซลล์ใน mesangial area) โดย capillary loop ยังเปิด แล้วให้ IF dominant reactant ตัดสินโรค",
    why: "LM ของกลุ่มนี้เหมือนกันเกือบทั้งหมด IF จึงเป็นตัวแยกหลัก และ MEST-C ใช้ประเมิน prognosis ใน IgAN",
    keys: ["IgA เด่น = IgAN, IgAV, secondary IgA หรือ staphylococcus-associated IRGN", "IgG เด่นร่วม C3 และ C1q (full-house ได้แต่ไม่จำเป็น) = LN class II", "C1q เด่น ANA ลบ = C1q nephropathy", "IgM เด่น = IgM nephropathy", "C3 เด่น = resolving IRGN หรือ C3GN"],
    ix: ["IF panel ครบ, EM หา deposit"],
    std: "Oxford MEST-C 2016 (Trimarchi H et al. Kidney Int 2017), ISN/RPS 2018, KDIGO 2025 IgAN and IgAV, KDIGO 2021",
    bx: B("Mesangial hypercellularity ≥ 4 เซลล์ใน mesangial area ร่วม matrix expansion, capillary lumen เปิด", "Dominant reactant ตัดสินโรค", "Mesangial และ paramesangial deposit", "อย่าเรียกโรคจาก LM อย่างเดียว ต้องบอก IF ก่อนทุกครั้ง")
  }, [
    N("IgA dominant or co-dominant", "step", { s: "IgA deposition", keys: ["IgA ≥ Ig อื่น", "C3 ร่วมเกือบทุกราย"], ix: ["MEST-C, หา secondary cause"] }, [
      N("IgA nephropathy", "nephro", { s: "Primary IgAN", keys: ["Synpharyngitic hematuria"], ix: ["IgAN prediction tool"], std: "KDIGO 2025 IgAN",
        bx: B("Mesangial hypercellularity (M), endocapillary (E), segmental sclerosis (S), tubular atrophy (T), crescent (C)", "Mesangial IgA 2-3+ ร่วม C3, IgG และ IgM แปรผัน, λ มักมากกว่า κ, C1q มักลบ", "Paramesangial dense deposit", "C1q แรงใน IgA-dominant ให้นึกถึง LN") }),
      N("IgA vasculitis nephritis", "nephro", { s: "Purpura, arthritis, gut", keys: ["Skin biopsy IgA ใน vessel wall"], ix: ["Skin biopsy"],
        bx: B("เหมือน IgAN แต่ endocapillary, fibrin และ crescent มากกว่า", "IgA mesangial และ capillary wall ร่วม fibrinogen", "Mesangial และ subendothelial deposit", "แยกจาก IgAN ด้วย clinical ไม่ใช่ biopsy") }),
      N("Secondary IgA nephropathy (cirrhosis, IBD, celiac, HIV)", "nephro", { s: "IgA จาก clearance ลดหรือ mucosal immunity", keys: ["Cirrhosis, IBD, celiac serology"], ix: ["LFT, tTG-IgA, HIV"],
        bx: B("Mesangial proliferation มักเล็กน้อย", "IgA เด่นแต่ C3 อ่อนกว่า และอาจมี IgG IgM ร่วม", "Mesangial deposit, บางครั้งมี lipid", "Biopsy เหมือน IgAN ต้องใช้ clinical") }),
      N("Staphylococcus-associated IgA-dominant IRGN", "nephro", { s: "DM หรือผู้สูงอายุที่ติดเชื้อ staphylococcus อยู่", keys: ["Infection ยังไม่หาย"], ix: ["Blood culture"],
        bx: B("Endocapillary และ exudative มากกว่า mesangial อย่างเดียว, neutrophil", "IgA dominant หรือ co-dominant โดย C3 เข้มเท่ากับหรือมากกว่า IgA", "Subepithelial hump (พบได้ไม่ทุกราย) ร่วม mesangial deposit", "หลักคือรักษาเชื้อ ไม่ควรกดภูมิแบบ IgAN ขณะที่ infection ยัง active") })
    ]),
    N("IgG-dominant mesangial with C3 and C1q (full-house possible, not required)", "step", { s: "LN class II", keys: ["IgG เด่นร่วม C3 และ C1q", "Full-house พบได้แต่ไม่สม่ำเสมอเท่า class III-V", "Extraglomerular deposit, TRI และ serology ช่วยยืนยัน"], ix: ["ANA, anti-dsDNA, complement"] }, [
      N("Lupus nephritis class II", "nephro", { s: "Mesangial proliferative LN", keys: ["Proteinuria ไม่มาก"], ix: ["Repeat biopsy ถ้า proteinuria เพิ่ม"], std: "ISN/RPS 2018",
        bx: B("Mesangial hypercellularity ระดับใดก็ได้ ไม่มี endocapillary lesion หรือ subendothelial deposit บน LM", "Mesangial IgG เด่นร่วม C3 และมักมี C1q, IgA และ IgM แปรผัน full-house พบได้แต่ไม่ใช่ทุกราย และมักอ่อนกว่า class proliferative", "Mesangial deposit, อาจมี subepithelial หรือ subendothelial เล็กน้อยที่เห็นได้เฉพาะ EM หรือ IF, tubuloreticular inclusion", "IF ที่ไม่ full-house ไม่ตัด class II ให้ใช้ C1q, extraglomerular deposit, TRI และ serology ส่วนถ้าเห็น subendothelial deposit บน LM ต้องเป็น class III หรือ IV") })
    ]),
    N("C1q dominant, ANA negative", "step", { s: "C1q nephropathy", keys: ["C1q ≥ 2+ เด่น"], ix: ["ANA ซ้ำ"] }, [
      N("C1q nephropathy", "nephro", { s: "Phenotype เหมือน MCD หรือ FSGS", keys: ["ANA ลบ"], ix: ["รักษาตาม LM pattern"],
        bx: B("Mesangial proliferation, MCD-like หรือ FSGS-like", "C1q ≥ 2+ เด่นใน mesangium", "Mesangial deposit, ไม่มี TRI", "วินิจฉัยเมื่อไม่มี clinical และ serology ของ SLE และไม่มี TRI ควรติดตามเพราะบางรายแสดง SLE ภายหลัง") })
    ]),
    N("IgM dominant", "step", { s: "IgM nephropathy", keys: ["Mesangial IgM ± C3"], ix: ["Steroid response"] }, [
      N("IgM nephropathy", "nephro", { s: "Spectrum ของ MCD และ FSGS", keys: ["Steroid-dependent บ่อย"], ix: ["ติดตามว่าเป็น FSGS ภายหลังหรือไม่"],
        bx: B("Mesangial hypercellularity เล็กน้อย", "Diffuse mesangial IgM ≥ 2+ ± C3", "Mesangial deposit ไม่มากหรือไม่พบ", "IgM ใน sclerotic segment อย่างเดียวคือ trapping ไม่ใช่ IgM nephropathy") })
    ]),
    N("C3 dominant mesangial", "step", { s: "Resolving IRGN หรือ C3GN", keys: ["ประวัติ infection", "C3 ต่ำค้าง"], ix: ["ติดตาม C3, C3NeF, factor H"] }, [
      N("Resolving infection-related GN", "nephro", { s: "หลังระยะ acute ของ IRGN", keys: ["C3 กลับปกติใน 8-12 สัปดาห์"], ix: ["C3 ซ้ำ"],
        bx: B("Mesangial proliferation ที่เหลือหลัง endocapillary หาย", "C3 mesangial (mesangial pattern ของ IRGN)", "Hump ถูก resorb เหลือ mesangial deposit", "ภาพเหมือน C3GN ต้องใช้เวลาและ complement แยก") }),
      N("C3 glomerulopathy (C3GN, DDD)", "nephro", { s: "Mesangial form ของ C3GN", keys: ["C3 ต่ำค้าง"], ix: ["Complement genetics, SFLC"],
        bx: B("Mesangial proliferation", "C3 ≥ 2 orders มากกว่า Ig", "Mesangial deposit, DDD มี intramembranous ribbon", "ทำ pronase IF หา masked monoclonal Ig ในผู้ใหญ่") })
    ]),
    N("IF negative or nonspecific", "step", { s: "Mesangial hypercellularity ที่ไม่ใช่ immune complex", keys: ["Diffuse effacement = MCD variant", "Matrix expansion ไม่ใช่ cellular = DKD หรือ deposition"], ix: ["EM"] }, [
      N("Minimal change disease with mesangial hypercellularity", "nephro", { s: "MCD variant", keys: ["Nephrotic syndrome"], ix: ["Steroid response"],
        bx: B("Mesangial hypercellularity เล็กน้อย", "ลบ", "Diffuse foot process effacement", "ตอบสนอง steroid น้อยกว่าและเสี่ยงเป็น FSGS ภายหลัง") }),
      N("Diabetic kidney disease", "nephro", { s: "Mesangial matrix expansion (RPS IIa, IIb)", keys: ["DM, retinopathy"], ix: ["HbA1c"],
        bx: B("Mesangial matrix expansion มากกว่า cellularity, GBM หนา", "Linear IgG และ albumin", "GBM หนา homogeneous", "Expansion ไม่ใช่ hypercellularity") })
    ]),
    N("In the transplant kidney", "step", KTSTEP("Mesangial IgA ใน graft อาจเป็น recurrence หรือ donor-derived", ["IgAN recur ทาง histology บ่อยกว่าทาง clinical", "Latent mesangial IgA ในไตผู้บริจาคพบได้บ่อยกว่าในคนเอเชีย และส่วนใหญ่หายไปเองหลังปลูกถ่าย"]), [
      N("Recurrent IgA nephropathy", "nephro", { s: "Recurrence ทาง histology พบได้บ่อย ส่วนที่ทำ graft loss พบน้อยกว่า", keys: ["Hematuria, proteinuria หลัง KT หลายปี"], ix: ["Biopsy, UPCR"],
        bx: B("Mesangial proliferation ตาม MEST-C", "IgA เด่น", "Mesangial deposit", "ต้องแยกจาก donor-derived IgA ที่พบใน protocol biopsy ช่วงแรก") }),
      N("Donor-derived latent mesangial IgA", "adj", { s: "พบใน implantation หรือ protocol biopsy ช่วงแรก", keys: ["ไม่มี hematuria หรือ proteinuria"], ix: ["Protocol biopsy ซ้ำ"],
        bx: B("LM ปกติหรือ mesangial เล็กน้อย", "IgA mesangial ตั้งแต่ time-zero biopsy", "Mesangial deposit เล็กน้อย", "เห็นตั้งแต่ time-zero biopsy แปลว่ามาจากผู้บริจาค") })
    ])
  ]),
  tables: [
    { title: "IF decides the mesangial proliferative GN", head: ["IF pattern","โรค","LM เพิ่มเติม","EM","จุดแยก"], rows: [
      ["IgA ≥ Ig อื่น + C3","IgAN, IgAV, secondary IgA","MEST-C","Paramesangial deposit","C1q ลบหรืออ่อน, ANA ลบ"],
      ["IgA + C3 ที่เข้มเท่ากับหรือมากกว่า IgA","Staphylococcal IRGN","Endocapillary, neutrophil","Hump (ไม่ทุกราย)","Active infection, DM"],
      ["IgG เด่น + C3 + C1q (full-house ได้แต่ไม่จำเป็น)","LN class II","ไม่มี subendothelial deposit บน LM","Mesangial deposit, TRI","ANA, dsDNA บวก, extraglomerular deposit"],
      ["C1q ≥ 2+ เด่น","C1q nephropathy","MCD-like หรือ FSGS-like","Mesangial deposit ไม่มี TRI","ANA ลบ"],
      ["IgM ≥ 2+ diffuse","IgM nephropathy","Mesangial เล็กน้อย","Deposit น้อย","ไม่ใช่ trapping ใน sclerosis"],
      ["C3 ≥ 2 orders","Resolving IRGN หรือ C3GN","Mesangial หลัง endocapillary","Resorbed hump หรือ C3 deposit","C3 trajectory"],
      ["ลบ","MCD variant, DKD","Matrix expansion ใน DKD","Effacement หรือ GBM หนา","IF ลบ"]
    ]},
    { title: "Oxford MEST-C and what each score means", head: ["Score","Definition","ความหมายทางคลินิก"], rows: [
      ["M1","Mesangial hypercellularity ใน > 50% ของ glomeruli","ทำนาย kidney outcome แย่ลง"],
      ["E1","Endocapillary hypercellularity ใน glomerulus ใดก็ได้ (E0 คือไม่มีเลย)","Active lesion ที่อาจตอบสนองต่อ immunosuppression"],
      ["S1","Segmental sclerosis หรือ adhesion ใน glomerulus ใดก็ได้","Outcome แย่ลง, ให้รายงานด้วยว่ามี podocytopathy features (podocyte hypertrophy, tip lesion) หรือไม่"],
      ["T1, T2","Tubular atrophy หรือ interstitial fibrosis 26-50% (T1), > 50% (T2) ของ cortex, T0 คือ 0-25%","Predictor ที่แรงที่สุดของ kidney failure"],
      ["C1, C2","Cellular หรือ fibrocellular crescent ใน ≥ 1 glomerulus แต่ < 25% (C1), ≥ 25% ของ glomeruli (C2)","C1 เสี่ยงเมื่อไม่ได้กดภูมิ, C2 เสี่ยงแม้ได้กดภูมิ"]
    ], note: "ใช้ MEST-C ร่วม International IgAN Prediction Tool ไม่ใช้ตัดสินการรักษาจาก score เดี่ยว (KDIGO 2025)" }
  ]
};

/* ===================== ENDOCAPILLARY ===================== */
TREES["bx-endocap"] = {
  must: [
    "Infection ปัจจุบันหรือ 1-3 สัปดาห์ก่อน, DM, alcohol",
    "C3, C4, ASO, anti-DNase B, blood culture",
    "ANA, anti-dsDNA, cryoglobulin, HCV",
    "IF dominant reactant",
    "EM: hump, subendothelial deposit",
    "Murmur หรือ shunt"
  ],
  tree: N("Endocapillary proliferative and exudative GN", "root", {
    s: "Capillary lumen ถูกอุดด้วย leukocyte และเซลล์ แล้วใช้ IF dominant reactant และ EM แยก IRGN, LN, C3G, cryo และ endocarditis",
    why: "Pattern เดียวกันเกิดจาก IRGN ที่ไม่ควรกดภูมิ และ LN หรือ C3G ที่ต้องกดภูมิ การแยกจึงสำคัญมาก",
    keys: ["C3 เด่น + hump นึกถึง IRGN ก่อน (hump พบใน C3G ได้)", "Full-house + subendothelial deposit นึกถึง LN ก่อน", "C3 ≥ 2 orders ร่วม serum C3 ต่ำค้าง นึกถึง C3G", "IgM-κ + pseudothrombi นึกถึง cryo"],
    ix: ["IF, EM, complement, ASO, ANA, cryo"],
    std: "KDIGO 2021, ISN/RPS 2018",
    bx: B("Endocapillary hypercellularity, neutrophil (exudative), capillary lumen แคบ", "แยกด้วย dominant reactant", "แยกด้วยตำแหน่ง deposit", "Neutrophil เด่น (exudative) นึกถึง infection-related ก่อน แต่พบใน LN, C3G และ cryo ได้")
  }, [
    N("Diffuse exudative with neutrophils, C3 dominant, humps", "step", { s: "IRGN", keys: ["Starry sky หรือ garland C3"], ix: ["Culture, ASO"] }, [
      N("Infection-related GN", "nephro", { s: "Post-streptococcal หรือ staphylococcal", keys: ["IgA ร่วมใน staph IRGN"], ix: ["รักษาเชื้อ"],
        bx: B("Diffuse global endocapillary hypercellularity ร่วม neutrophil จำนวนมาก, crescent พบได้", "C3 granular เด่น: starry sky (ช่วงแรก), garland (capillary wall ชิดกัน สัมพันธ์กับ proteinuria มาก), mesangial (ระยะหาย)", "Subepithelial hump รูปโดม ร่วม subendothelial และ mesangial deposit", "Hump ร่วม neutrophil และ C3 เด่นเข้าได้กับ IRGN มากที่สุด แต่ C3G ให้ภาพเดียวกันได้ จึงต้องติดตาม C3") }),
      N("C3 glomerulopathy (C3GN, DDD)", "nephro", { s: "Serum C3 ต่ำค้างนาน > 12 สัปดาห์ หรือ GN ไม่หาย", keys: ["ประวัติ infection นำมาก่อนไม่ตัด C3G เพราะ infection เป็น trigger ได้"], ix: ["Complement work-up"],
        bx: B("Endocapillary หรือ MPGN pattern", "C3 ≥ 2 orders", "C3GN: deposit หลายตำแหน่ง, DDD: dense ribbon", "C3G กับ IRGN ใช้ biopsy แยกไม่ได้เสมอ ต้องติดตาม C3") })
    ]),
    N("Full-house with subendothelial deposits", "step", { s: "LN class III หรือ IV", keys: ["Active หรือ chronic lesion ใน < 50% ของ glomeruli = class III, ≥ 50% = class IV"], ix: ["Activity และ chronicity index"] }, [
      N("Lupus nephritis", "nephro", { s: "Proliferative LN", keys: ["Wire loop"], ix: ["Activity index"],
        bx: B("Endocapillary hypercellularity, wire loop, hyaline thrombi, karyorrhexis, fibrinoid necrosis", "Full-house, C1q เด่น", "Subendothelial และ mesangial deposit, tubuloreticular inclusion", "Class ตามร้อยละของ glomeruli ที่มี lesion") })
    ]),
    N("IgM-κ with intraluminal pseudothrombi", "step", { s: "Cryoglobulinemic GN", keys: ["Monocyte เด่น"], ix: ["Cryoglobulin, HCV RNA"] }, [
      N("Cryoglobulinemic GN", "nephro", { s: "Type II mixed cryo", keys: ["C4 ต่ำมาก"], ix: ["HCV RNA"],
        bx: B("Endocapillary ด้วย monocyte, intraluminal hyaline pseudothrombi, MPGN", "IgM, IgG, C3, κ เด่น", "Curved microtubule 20-35 nm", "Monocyte (CD68) แทน neutrophil") })
    ]),
    N("Focal segmental necrotizing with C3 and fever", "step", { s: "Endocarditis หรือ shunt", keys: ["Blood culture บวกในส่วนใหญ่ ถ้าลบให้หา culture-negative endocarditis (Bartonella, Coxiella) ด้วย serology หรือ PCR"], ix: ["Echocardiogram"] }, [
      N("Infective endocarditis-associated GN", "nephro", { s: "S. aureus, Bartonella", keys: ["ANCA (PR3 หรือ MPO) บวกได้ราวหนึ่งในสี่ จึงไม่ใช่หลักฐานของ AAV"], ix: ["Echocardiogram"],
        bx: B("Focal segmental necrotizing และ crescent, endocapillary ร่วม", "C3 เด่น บางรายเกือบ pauci-immune", "Deposit น้อยหรือ hump", "ต้องแยกจาก AAV ก่อนเสมอ เพราะการกดภูมิโดยยังไม่ได้รักษาเชื้ออันตรายถึงชีวิต") })
    ]),
    N("In the transplant kidney", "step", KTSTEP("Endocapillary ใน graft ต้องแยก recurrence, IRGN และ glomerulitis ของ ABMR", ["Glomerulitis (g) ของ ABMR มี mononuclear cell ไม่มี deposit", "C3G recurrence สูง"]), [
      N("Recurrent C3 glomerulopathy", "nephro", { s: "DDD และ C3GN recur มากกว่าครึ่ง", keys: ["C3 ต่ำ"], ix: ["Complement genetics"],
        bx: B("Endocapillary หรือ MPGN", "C3 ≥ 2 orders", "Deposit ตาม subtype", "Recurrence เร็วภายในเดือนถึงปี") }),
      N("Glomerulitis of ABMR (mimic)", "nephro", { s: "Microvascular inflammation", keys: ["DSA บวกในส่วนใหญ่ ถ้า DSA และ C4d ลบ Banff 2022 เรียก MVI, DSA-negative and C4d-negative"], ix: ["C4d, DSA"],
        bx: B("Mononuclear cell ใน glomerular capillary (Banff g)", "ไม่มี immune deposit, C4d บน PTC อาจบวก", "Endothelial swelling ไม่มี deposit", "ไม่มี deposit จึงไม่ใช่ immune complex GN") })
    ])
  ]),
  tables: [
    { title: "IRGN vs C3 glomerulopathy vs lupus nephritis vs cryoglobulinemic GN", head: ["Feature","IRGN","C3G","LN III/IV","Cryo GN"], rows: [
      ["เซลล์ใน capillary","Neutrophil","แปรผัน","Mixed, karyorrhexis","Monocyte (CD68)"],
      ["IF","C3 เด่น, IgA ใน staph","C3 ≥ 2 orders","Full-house, C1q","IgM, IgG, C3, κ"],
      ["EM","Hump","Ribbon (DDD) หรือหลายตำแหน่ง","Subendothelial, TRI","Curved microtubule"],
      ["Serum C3","ต่ำแล้วกลับปกติใน 8-12 สัปดาห์","ต่ำค้าง (ปกติได้ในบางราย)","ต่ำพร้อม C4","C4 ต่ำมาก, C3 ปกติหรือต่ำเล็กน้อย"],
      ["การรักษา","รักษาเชื้อ โดยทั่วไปไม่กดภูมิ","Complement-directed, MMF","Induction","HCV treatment, rituximab"]
    ]}
  ]
};

/* ===================== MPGN ===================== */
TREES["bx-mpgn"] = {
  must: [
    "IF pattern: Ig กับ C3, C3 dominant หรือ negative",
    "Serum C3, C4, cryoglobulin, HCV, HBV, ANA",
    "SPEP, IFE, SFLC ในผู้ใหญ่ทุกราย (yield สูงสุดเมื่ออายุ ≥ 50) และทุกอายุถ้า IF มี light chain restriction",
    "EM: ตำแหน่ง deposit, substructure, intramembranous ribbon",
    "Chronic infection (endocarditis, shunt, osteomyelitis)",
    "Chronic TMA history: malignant HTN, CNI, radiation, APS, transplant"
  ],
  tree: N("MPGN (membranoproliferative) pattern", "root", {
    s: "Mesangial และ endocapillary proliferation, lobular accentuation, double contour บน silver แล้วแบ่งด้วย IF (Sethi and Fervenza 2012)",
    why: "MPGN เป็น pattern ไม่ใช่โรค IF แบ่งเป็น Ig-mediated, complement-mediated และ negative IF ซึ่งชี้ทาง work-up ต่างกัน",
    keys: ["Ig + C3 = immune complex หรือ monoclonal Ig-mediated", "C3 ≥ 2 orders มากกว่า Ig = C3G (ต้องตัด IRGN และ masked monoclonal Ig)", "IF ลบ = chronic endothelial injury เช่น chronic TMA"],
    ix: ["IF, EM, complement, SFLC, HCV"],
    std: "Sethi S, Fervenza FC. MPGN, a new look at an old entity, N Engl J Med 2012, Pickering MC et al. C3 glomerulopathy consensus report, Kidney Int 2013, KDIGO 2021",
    bx: B("Lobular accentuation, mesangial interposition, double contour (tram-track) บน silver", "แบ่งสามกลุ่ม", "Subendothelial deposit หรือ lucent widening", "Double contour มีทั้งที่มี deposit (MPGN) และไม่มี deposit (TMA)")
  }, [
    N("Ig and C3 positive: immune complex MPGN", "step", { s: "หา infection, autoimmune, monoclonal", keys: ["Polyclonal = infection หรือ autoimmune", "Monoclonal = PGNMID หรือ cryo type I"], ix: ["HCV RNA, cryo, ANA, SFLC"] }, [
      N("Immune complex MPGN (HCV, cryo, chronic infection, autoimmune)", "nephro", { s: "Polyclonal Ig", keys: ["C3 และ C4 ต่ำ"], ix: ["HCV, blood culture"],
        bx: B("MPGN pattern", "IgG, IgM และ C3 polyclonal (κ และ λ เท่ากัน)", "Subendothelial และ mesangial deposit", "Polyclonal บอกว่าต้องหา infection หรือ autoimmune") }),
      N("Cryoglobulinemic GN", "nephro", { s: "IgM-κ กับ polyclonal IgG", keys: ["Pseudothrombi, monocyte"], ix: ["Cryocrit"],
        bx: B("MPGN, intraluminal pseudothrombi, monocyte", "IgM, IgG, C3, κ เด่น", "Curved microtubule", "Pseudothrombi") }),
      N("PGNMID", "nephro", { s: "Monoclonal IgG ส่วนใหญ่ IgG3κ", keys: ["Light chain restriction ร่วม IgG subclass เดียว"], ix: ["Clone ในไขกระดูก (พบส่วนน้อย)"],
        bx: B("MPGN หรือ endocapillary", "Monoclonal IgG (IgG3 เด่น) ส่วนใหญ่เป็น κ", "Granular non-organized deposit", "Light chain restriction ร่วม IgG subclass เดียว และ deposit แบบ granular ไม่มี substructure คือ PGNMID ต้องใช้ EM และ cryoglobulin แยก cryo type I และ immunotactoid") })
    ]),
    N("C3 dominant (≥ 2 orders more than Ig)", "step", { s: "Complement-mediated", keys: ["EM แยก DDD กับ C3GN"], ix: ["C3NeF, factor H, genetics, pronase IF, SFLC"] }, [
      N("C3 glomerulopathy (C3GN, DDD)", "nephro", { s: "DDD: intramembranous ribbon, C3GN: deposit หลายตำแหน่ง", keys: ["C3 ต่ำค้าง"], ix: ["Complement genetics"],
        bx: B("MPGN หรือ proliferative", "C3 ≥ 2 orders", "DDD: osmiophilic ribbon ใน lamina densa, C3GN: mesangial, subendothelial, subepithelial", "ต้องใช้ EM เท่านั้นจึงแยก DDD จาก C3GN ได้") }),
      N("C3 glomerulopathy with monoclonal gammopathy", "nephro", { s: "Masked monoclonal Ig", keys: ["Pronase IF เผย Ig"], ix: ["SFLC, bone marrow"],
        bx: B("MPGN", "C3 เด่นบน frozen แต่ Ig โผล่บน pronase paraffin IF", "Deposit เหมือน C3GN", "ผู้ใหญ่ที่เป็น C3G ควรหา monoclonal gammopathy ทุกราย โดยเฉพาะอายุ ≥ 50 และทำ pronase IF หา masked Ig") }),
      N("Infection-related GN", "nephro", { s: "Resolving IRGN ที่เหลือ C3", keys: ["C3 กลับปกติใน 8-12 สัปดาห์"], ix: ["ติดตาม C3"],
        bx: B("Proliferative หรือ MPGN-like", "C3 เด่น", "Hump กำลังหาย", "เวลาเป็นตัวแยก") })
    ]),
    N("IF negative: chronic endothelial injury", "step", { s: "MPGN-like จาก chronic TMA", keys: ["ไม่มี deposit", "Subendothelial lucency"], ix: ["ADAMTS13, aPL, drug review"] }, [
      N("Thrombotic microangiopathy", "nephro", { s: "Chronic TMA", keys: ["Double contour ไม่มี deposit"], ix: ["ไปที่ approach TMA"], link: "tma",
        bx: B("Double contour, mesangiolysis, arteriolar onion skin", "ลบหรือ fibrin, IgM trapping", "Subendothelial lucent widening ไม่มี electron-dense deposit", "Double contour ไม่มี deposit") })
    ]),
    N("In the transplant kidney", "step", KTSTEP("Double contour ใน graft ส่วนใหญ่คือ transplant glomerulopathy ไม่ใช่ MPGN", ["cg ร่วม PTC multilayering และ DSA = chronic active ABMR", "Immune deposit จริง = recurrent หรือ de novo MPGN"]), [
      N("Transplant glomerulopathy", "nephro", { s: "cg ส่วนใหญ่จาก chronic (active) ABMR สาเหตุอื่นคือ chronic TMA และ HCV", keys: ["DSA, C4d"], ix: ["Banff, EM ของ PTC"], link: "kt-late",
        bx: B("Double contour ของ GBM (Banff cg1b-cg3) ร่วม glomerulitis", "ไม่มี immune deposit หรือมีเพียง IgM trapping, C4d บน PTC แปรผัน", "Subendothelial widening, new GBM, PTC basement membrane multilayering (ptcml1: ≥ 7 ชั้นใน 1 PTC และ ≥ 5 ชั้นในอีก 2)", "cg1a เห็นได้เฉพาะ EM จึงต้องทำ EM ใน biopsy ที่มี DSA") }),
      N("Recurrent immune complex MPGN or C3G", "nephro", { s: "Recurrence ของโรคเดิม", keys: ["IF แสดง Ig หรือ C3"], ix: ["HCV, complement"],
        bx: B("MPGN", "Ig และ C3 หรือ C3 เด่น", "Electron-dense deposit", "Deposit จริงแยกจาก transplant glomerulopathy") })
    ])
  ]),
  tables: [
    { title: "MPGN classification by IF (Sethi and Fervenza 2012)", head: ["IF","Mechanism","สาเหตุที่ต้องหา","Test ต่อ"], rows: [
      ["Ig + C3, polyclonal","Immune complex","HCV, HBV, endocarditis, shunt, SLE, Sjögren","HCV RNA, blood culture, ANA, cryo"],
      ["Ig + C3, monoclonal","Monoclonal Ig","PGNMID, cryo type I, MGRS","SFLC, IFE, bone marrow"],
      ["C3 ≥ 2 orders","Alternative pathway","C3G (DDD, C3GN), IRGN ระยะหาย, masked MG","C3NeF, factor H, genetics, pronase IF"],
      ["ลบ","Endothelial injury","Chronic TMA, transplant glomerulopathy, radiation","ADAMTS13, aPL, DSA"]
    ]},
    { title: "Transplant glomerulopathy vs recurrent MPGN vs chronic TMA", head: ["Feature","Transplant glomerulopathy","Recurrent MPGN","Chronic TMA"], rows: [
      ["Double contour","มี","มี","มี"],
      ["Immune deposit","ไม่มี","มี","ไม่มี"],
      ["PTC multilayering","มี (ptcml)","ไม่มี","อาจมีเล็กน้อย"],
      ["Glomerulitis และ ptc","มี","ไม่เด่น","ไม่เด่น"],
      ["DSA","มักบวก","ไม่เกี่ยว","อาจเกี่ยวถ้าเป็น ABMR"],
      ["Arteriolar lesion","ไม่เด่น","ไม่เด่น","Onion skin, thrombi"]
    ]}
  ]
};

/* ===================== MEMBRANOUS ===================== */
TREES["bx-mn"] = {
  must: [
    "Anti-PLA2R serum และ tissue",
    "IgG subclass และ C1q",
    "ANA, anti-dsDNA, complement",
    "HBV, HCV, HIV, syphilis",
    "Age-appropriate cancer screening ทุกราย (ค้นละเอียดขึ้นถ้าอายุมาก, smoking, น้ำหนักลด, PLA2R ลบ, NELL1 หรือ THSD7A บวก)",
    "Drug: NSAID, ครีมที่มีปรอท, lipoic acid, gold"
  ],
  tree: N("Subepithelial deposits: membranous pattern", "root", {
    s: "Spike บน silver, granular IgG ตาม capillary wall และ subepithelial deposit บน EM แล้วแยก primary กับ secondary ด้วย antigen, IgG subclass และ feature ของ lupus",
    why: "ทุกรายต้อง screen secondary cause และ cancer ตามอายุไม่ว่า antigen ใด ส่วน antigen ใน tissue ปรับความเข้มของ work-up: NELL1 และ THSD7A ให้ค้น malignancy ละเอียดขึ้น, EXT1/EXT2 ชี้ไปทาง autoimmune โดยเฉพาะ lupus",
    keys: ["IgG4 dominant, PLA2R บวก เข้าได้กับ primary MN แต่ทุกรายยังต้อง screen HBV, HCV, HIV, syphilis, ANA และ cancer ตามอายุ", "Full-house, C1q, TRI, mesangial หรือ subendothelial deposit นึกถึง lupus ก่อน", "IgG1, IgG2 หรือ IgG3 dominant ให้ค้น secondary cause ละเอียดขึ้น (ไม่จำเพาะ ระยะแรกของ PLA2R MN เป็น IgG1 ได้)"],
    ix: ["Tissue antigen panel, IgG subclass, serology"],
    std: "KDIGO 2021 MN, Sethi S. MN antigens review, JASN 2021",
    bx: B("GBM หนา, spike และ hole บน silver, ไม่มี hypercellularity", "Granular IgG และ C3 ตาม capillary wall", "Subepithelial deposit (Ehrenreich-Churg stage I-IV)", "Mesangial หรือ subendothelial deposit ร่วมชี้ secondary MN")
  }, [
    N("PLA2R or THSD7A positive, IgG4 dominant", "step", { s: "Primary MN", keys: ["Subepithelial deposit อย่างเดียว"], ix: ["Anti-PLA2R titer"] }, [
      N("Primary MN (PLA2R, THSD7A)", "nephro", { s: "Primary", keys: ["IgG4", "PLA2R บวกไม่ได้ยกเว้น secondary screen และ cancer screening ตามอายุ, THSD7A สัมพันธ์กับ malignancy ในบางราย"], ix: ["KDIGO risk"],
        bx: B("GBM หนา, spike, ไม่มี proliferation", "Granular IgG 2-3+ (IgG4 เด่น), C3, PLA2R บวก, C1q ลบหรืออ่อน", "Subepithelial deposit อย่างเดียว ไม่มี TRI", "IgG4 ร่วม PLA2R และไม่มี C1q") })
    ]),
    N("Full-house, C1q, mesangial or subendothelial deposits, tubuloreticular inclusions", "step", { s: "Lupus MN", keys: ["EXT1/EXT2 หรือ NCAM1 บวกได้ในบางส่วน (EXT1/EXT2 ราวหนึ่งในสาม) ผลลบไม่ตัด lupus MN"], ix: ["ANA, dsDNA"] }, [
      N("Lupus MN (class V) and EXT1/EXT2, NCAM1", "nephro", { s: "Class V", keys: ["Full-house"], ix: ["Biopsy class"],
        bx: B("MN ร่วม mesangial hypercellularity", "Full-house, C1q, IgG1 และ IgG3, EXT1/EXT2 หรือ NCAM1", "Subepithelial ร่วม mesangial deposit, TRI", "Mesangial deposit ร่วม TRI แยกจาก primary") })
    ]),
    N("NELL1, THSD7A or other antigen with secondary features", "step", { s: "Secondary MN", keys: ["IgG1 dominant"], ix: ["Cancer screening, drug, infection"] }, [
      N("Malignancy-associated MN (NELL1, THSD7A)", "nephro", { s: "Solid tumor", keys: ["อายุมาก", "NELL1 ไม่ได้แปลว่ามี malignancy ทุกราย ส่วนใหญ่ไม่พบสาเหตุ และยังพบจากปรอท, lipoic acid และ NSAID"], ix: ["Cancer screening ละเอียดกว่าตามอายุ"],
        bx: B("MN บางรายมี segmental distribution", "NELL1: IgG1 เด่น, THSD7A: IgG4 เด่นแต่สัมพันธ์กับ malignancy ในบางราย", "Subepithelial deposit มัก segmental (NELL1)", "Segmental subepithelial deposit ชี้ NELL1") }),
      N("Drug-associated MN", "nephro", { s: "NSAID, mercury (NELL1)", keys: ["Urine mercury"], ix: ["หยุดสาเหตุ"],
        bx: B("MN stage ต้น", "IgG1, NELL1 ในปรอท", "Subepithelial deposit", "Stage I ร่วม NELL1 และประวัติครีม") }),
      N("Infection-associated MN", "nephro", { s: "HBV, HCV, syphilis", keys: ["Serology"], ix: ["รักษาเชื้อ"],
        bx: B("MN ร่วม mesangial proliferation", "IgG ร่วม C1q, HBeAg ใน deposit (HBV)", "Subepithelial ร่วม mesangial และ subendothelial", "Deposit หลายตำแหน่งชี้ secondary") })
    ]),
    N("Large subepithelial humps with endocapillary proliferation", "step", { s: "IRGN ไม่ใช่ MN", keys: ["C3 เด่น"], ix: ["ASO, culture"] }, [
      N("Infection-related GN", "nephro", { s: "Hump", keys: ["Neutrophil"], ix: ["Culture"],
        bx: B("Endocapillary, neutrophil", "C3 เด่น", "Hump ใหญ่ห่างกัน ไม่มี spike", "Hump ไม่มี spike และมี proliferation") })
    ]),
    N("In the transplant kidney", "step", KTSTEP("MN ใน graft แยก recurrent กับ de novo", ["Recurrent: มักเร็วในปีแรก ส่วนใหญ่ PLA2R บวก", "De novo: มักช้าหลายปี ส่วนใหญ่ PLA2R ลบ และสัมพันธ์กับ alloimmune injury"]), [
      N("Recurrent MN", "nephro", { s: "PLA2R-associated recur ได้บ่อย", keys: ["Anti-PLA2R สูงตอน KT เพิ่มความเสี่ยง"], ix: ["Anti-PLA2R หลัง KT"],
        bx: B("LM อาจปกติในระยะแรก", "Granular IgG4, PLA2R บวก", "Subepithelial deposit stage I", "PLA2R tissue บวกในผู้ที่โรคเดิมเป็น PLA2R MN สนับสนุน recurrence มากกว่า de novo") }),
      N("De novo MN after transplant", "nephro", { s: "หลัง KT หลายปี", keys: ["PLA2R ลบ"], ix: ["DSA, C4d"],
        bx: B("MN มักร่วม ABMR หรือ transplant glomerulopathy", "IgG1 เด่น, PLA2R ลบ", "Subepithelial segmental", "ร่วม microvascular inflammation บ่อย") })
    ])
  ]),
  tables: [
    { title: "Primary vs secondary MN on biopsy", head: ["Feature","Primary (PLA2R)","Lupus (class V)","Malignancy","Infection (HBV)"], rows: [
      ["IgG subclass","IgG4","IgG1, IgG3","IgG1 หรือ IgG2 (ยกเว้น THSD7A)","IgG1"],
      ["C1q","ลบหรืออ่อน","บวกแรง","อ่อน","บวก"],
      ["Antigen","PLA2R, THSD7A","EXT1/EXT2, NCAM1","NELL1 (IgG1), THSD7A (IgG4)","PLA2R ลบ, HBeAg"],
      ["Deposit ที่อื่น","ไม่มี","Mesangial, subendothelial, TBM","Segmental","Mesangial, subendothelial"],
      ["TRI","ไม่มี","มี","ไม่มี","ไม่มี (มีใน HIV)"],
      ["Proliferation","ไม่มี","Mesangial","ไม่มี","Mesangial"]
    ]},
    { title: "Ehrenreich-Churg stages", head: ["Stage","EM","Silver"], rows: [
      ["I","Subepithelial deposit เล็ก ไม่มี GBM reaction","ปกติ"],
      ["II","GBM ยื่นระหว่าง deposit","Spike"],
      ["III","Deposit ถูก GBM ใหม่ล้อม","GBM หนา, chain-like"],
      ["IV","Deposit ถูก resorb เหลือ lucent hole","GBM หนาไม่สม่ำเสมอ"]
    ], note: "Stage บอกว่าโรคเป็นมานานเท่าใด ไม่ได้ทำนาย response โดยตรง" }
  ]
};

/* ===================== PODOCYTOPATHY ===================== */
TREES["bx-podo"] = {
  must: [
    "Albumin และ UPCR: full nephrotic หรือ subnephrotic",
    "Onset abrupt หรือค่อยเป็นค่อยไป",
    "Family history, onset อายุน้อย, syndromic features",
    "BMI, birth weight, solitary kidney, reflux",
    "Drug (NSAID, lithium, interferon, pamidronate, anabolic steroid) และ viral (HIV, COVID-19)",
    "จำนวน glomeruli พอที่จะตัด FSGS หรือไม่"
  ],
  tree: N("Podocytopathy: normal LM or FSGS lesion", "root", {
    s: "IF ลบหรือ IgM และ C3 ใน sclerosis, EM ไม่มี deposit แล้วแยกด้วย extent ของ effacement ร่วม clinical",
    why: "KDIGO 2021 แบ่ง FSGS ตามสาเหตุ: primary, genetic, secondary และ undetermined ไม่ใช่แค่ variant บน LM",
    keys: ["Diffuse effacement ≥ 80% + full nephrotic syndrome เข้าได้กับ primary podocytopathy (ต้องตัด genetic, drug และ viral ซึ่ง effacement diffuse ได้เช่นกัน)", "Segmental effacement + albumin ปกติ = maladaptive", "Collapse = viral, APOL1, drug"],
    ix: ["EM effacement, albumin, genetic testing, viral screen"],
    std: "KDIGO 2021 FSGS and MCD, Columbia classification (D'Agati VD et al. AJKD 2004)",
    bx: B("ปกติ หรือ segmental sclerosis ตาม Columbia variant", "ลบ หรือ IgM และ C3 ใน sclerotic segment", "ไม่มี deposit, วัด foot process effacement เป็นร้อยละ", "Extent ของ effacement บน EM ร่วม serum albumin ช่วยแยก primary จาก maladaptive แต่ค่าซ้อนทับกันได้")
  }, [
    N("Normal LM, diffuse effacement", "step", { s: "MCD", keys: ["ไม่พบ segmental sclerosis ในชิ้นเนื้อที่มี glomeruli เพียงพอ (FSGS เป็น focal จึงพลาดได้ โดยเฉพาะถ้าไม่ได้ juxtamedullary glomeruli)"], ix: ["Anti-nephrin antibody, steroid response"] }, [
      N("Minimal change disease", "nephro", { s: "Primary podocytopathy", keys: ["Abrupt nephrotic"], ix: ["Steroid"],
        bx: B("Glomeruli ปกติ, proximal tubule มี lipid droplet และ protein resorption droplet, อาจมี ATN ใน AKI", "ลบ, anti-nephrin ใน podocyte เป็น punctate IgG ในบางราย", "Diffuse effacement เกือบทั้งหมด, microvillous transformation", "LM ปกติแต่ effacement diffuse") }),
      N("Drug or viral podocytopathy", "nephro", { s: "NSAID (ร่วม AIN), lithium, ICI", keys: ["Temporal relation"], ix: ["Drug review"],
        bx: B("MCD ร่วม interstitial nephritis ใน NSAID", "ลบ", "Diffuse effacement", "MCD ร่วม AIN ชี้ NSAID") })
    ]),
    N("Segmental sclerosis with diffuse effacement and full nephrotic syndrome", "step", { s: "Primary FSGS", keys: ["Albumin ต่ำ", "Effacement ≥ 80%"], ix: ["Genetic testing ถ้า steroid-resistant, มี family history, onset อายุน้อย หรือ syndromic features"] }, [
      N("Primary FSGS", "nephro", { s: "Tip, cellular, NOS", keys: ["Tip ตอบสนอง steroid ดี"], ix: ["Steroid หรือ CNI"],
        bx: B("Segmental sclerosis, hyalinosis, adhesion กับ Bowman capsule, variant ตาม Columbia", "IgM และ C3 ใน sclerotic segment (trapping)", "Diffuse effacement ≥ 80%", "Diffuse effacement ร่วม segmental lesion") }),
      N("Genetic FSGS / podocytopathy", "nephro", { s: "NPHS1, NPHS2, WT1, INF2, COL4A", keys: ["Steroid-resistant, family history"], ix: ["Gene panel"],
        bx: B("FSGS หรือ diffuse mesangial sclerosis ในทารก", "ลบ", "Effacement แปรผัน, GBM ผิดปกติใน COL4A", "GBM lamellation ชี้ COL4A") })
    ]),
    N("Segmental sclerosis with segmental effacement, albumin normal", "step", { s: "Maladaptive", keys: ["Perihilar variant, glomerulomegaly"], ix: ["BMI, nephron mass"] }, [
      N("Maladaptive (secondary) FSGS", "nephro", { s: "Obesity, low nephron mass, reflux, sickle", keys: ["Subnephrotic"], ix: ["RAASi, SGLT2i"],
        bx: B("Perihilar sclerosis และ hyalinosis, glomerulomegaly, global sclerosis และ IFTA มาก", "IgM และ C3 ใน sclerosis", "Segmental effacement โดยทั่วไป < 50% ของ capillary surface (primary มัก ≥ 80% ช่วงระหว่างนั้นใช้ EM แยกไม่ได้)", "Glomerulomegaly ร่วม perihilar") })
    ]),
    N("Collapse with podocyte hyperplasia", "step", { s: "Collapsing glomerulopathy", keys: ["Severe nephrotic, eGFR ลดเร็ว"], ix: ["HIV, SARS-CoV-2, APOL1, drug"] }, [
      N("Collapsing glomerulopathy", "nephro", { s: "HIV, COVID-19, APOL1, interferon, pamidronate", keys: ["Microcystic tubules"], ix: ["APOL1 genotype"],
        bx: B("Tuft ยุบ ร่วม podocyte hypertrophy และ hyperplasia (pseudocrescent), microcystic tubular dilatation", "ลบ หรือ IgM และ C3", "Diffuse effacement, TRI ใน HIV และ interferon", "TRI ร่วม collapse ให้หา HIV, SLE และ interferon") })
    ]),
    N("In the transplant kidney", "step", KTSTEP("Proteinuria มากตั้งแต่ช่วงแรกหลัง KT ในผู้ที่โรคเดิมเป็น primary FSGS ให้คิด recurrent FSGS ก่อน โดยต้องแยก proteinuria จาก native kidney", ["EM effacement เกิดก่อน sclerosis บน LM", "Genetic FSGS แทบไม่ recur"]), [
      N("Recurrent primary FSGS", "nephro", { s: "Recurrence ได้ภายในชั่วโมงถึงวัน", keys: ["Proteinuria มากในสัปดาห์แรก"], ix: ["PLEX, rituximab"],
        bx: B("LM ปกติในช่วงแรก segmental lesion ตามมาภายหลัง", "ลบ", "Diffuse effacement ตั้งแต่ระยะแรก", "EM เป็น test แรกที่เห็น recurrence") }),
      N("CNI- or mTOR inhibitor-associated podocyte injury", "nephro", { s: "Sirolimus และ everolimus ทำ proteinuria", keys: ["เริ่ม mTOR inhibitor"], ix: ["Drug review"],
        bx: B("FSGS ไม่จำเพาะ", "ลบ", "Segmental effacement", "สัมพันธ์กับเวลาที่เริ่มยา") })
    ])
  ]),
  tables: [
    { title: "Columbia FSGS variants", head: ["Variant","Definition","สัมพันธ์กับ","Prognosis"], rows: [
      ["Collapsing","≥ 1 glomerulus collapse ร่วม podocyte hyperplasia","HIV, COVID-19, APOL1, interferon","แย่ที่สุด"],
      ["Tip","Segmental lesion ที่ tubular pole","Primary","ดีที่สุด ตอบสนอง steroid"],
      ["Cellular","Endocapillary hypercellularity อุด lumen","Primary","ปานกลาง"],
      ["Perihilar","Perihilar sclerosis และ hyalinosis ใน > 50% ของ glomeruli ที่มี lesion","Maladaptive (ไม่จำเพาะ)","ลุกลามช้า"],
      ["NOS","ไม่เข้ากลุ่มอื่น","ทุกสาเหตุ","ปานกลาง"]
    ]},
    { title: "Primary vs maladaptive FSGS", head: ["Feature","Primary","Maladaptive"], rows: [
      ["Albumin","ต่ำ, full nephrotic","ปกติหรือต่ำเล็กน้อย"],
      ["EM effacement","Diffuse ≥ 80%","Segmental"],
      ["Glomerular size","ปกติ","Glomerulomegaly"],
      ["Variant","Tip, cellular, NOS","Perihilar"],
      ["การรักษา","Immunosuppression","RAASi, SGLT2i, ลดน้ำหนัก"]
    ]}
  ]
};

/* ===================== NODULAR ===================== */
TREES["bx-nodular"] = {
  must: [
    "DM duration, retinopathy, HbA1c และ OGTT ถ้า HbA1c ปกติ",
    "Smoking (pack-year), long-standing HTN, obesity",
    "SPEP, IFE, SFLC และ NT-proBNP, troponin",
    "Silver ของ nodule: บวกแบบ lamellated หรือลบ",
    "Congo red ใต้ polarized light",
    "IF: κ และ λ ตาม GBM, TBM และ vessel, linear IgG ที่มี albumin เท่ากันหรือไม่",
    "EM: fibril (ขนาด nm), powdery punctate deposit หรือ GBM หนาอย่างเดียว"
  ],
  tree: N("Nodular glomerulosclerosis", "root", {
    s: "เริ่มจาก silver และ Congo red ของ nodule แล้วยืนยันด้วย IF light chain และ EM สามคำถาม: nodule ติด silver แบบ lamellated หรือไม่, Congo red บวกหรือไม่, มี light chain restriction หรือไม่",
    why: "DKD ไม่ใช่ทุก nodule การพลาด AL amyloid หรือ LCDD ทำให้ผู้ป่วยไม่ได้รักษา clone และการพลาด idiopathic nodular GS ทำให้ไม่ได้หา risk factor ที่แก้ได้",
    keys: ["Silver บวก lamellated + Congo red ลบ + ไม่มี restriction = DKD หรือ idiopathic nodular GS", "Silver ลบ + Congo red บวก = amyloid (AL เป็น λ เด่น)", "Silver ลบหรืออ่อน + Congo red ลบ + linear light chain ชนิดเดียว (ส่วนใหญ่ κ) ที่ GBM และ TBM = LCDD", "Silver ลบ + smudgy IgG + fibril 12-24 nm = fibrillary GN"],
    ix: ["Silver, Congo red, κ/λ IF, EM, DNAJB9, fibronectin IHC"],
    std: "Tervaert TW et al. JASN 2010, Markowitz GS et al. Hum Pathol 2002 (idiopathic nodular GS), IKMG 2019",
    bx: B("Mesangial nodule PAS บวก, ดู silver ของ nodule และ arteriole", "Linear IgG กับ albumin (insudation) หรือ light chain restriction", "GBM หนา homogeneous, fibril หรือ punctate deposit", "Silver แยกได้เร็วที่สุด: KW nodule ติด silver แบบ lamellated ส่วน amyloid และ LCDD ไม่ติดหรือติดอ่อน")
  }, [
    N("Silver strongly positive lamellated, Congo red negative, linear IgG with albumin, no restriction", "step", {
      s: "Nodule จาก matrix expansion ไม่ใช่ deposit แยกด้วย DM",
      keys: ["Linear IgG และ albumin ความเข้มใกล้กัน (insudation)", "κ และ λ เท่ากัน", "Arteriolar hyalinosis รุนแรง"],
      ix: ["HbA1c, OGTT, fundoscopy, smoking history"]
    }, [
      N("Diabetic kidney disease", "nephro", { s: "RPS class III", keys: ["DM นาน, retinopathy"], ix: ["UACR"],
        bx: B("KW nodule ที่ lamellated และติด silver แรง, mesangial expansion ทั่วไป, GBM หนา, hyalinosis ของทั้ง afferent และ efferent arteriole, capsular drop, fibrin cap, microaneurysm", "Linear IgG และ albumin ตาม GBM และ TBM ไม่มี light chain restriction", "GBM หนา homogeneous (> 430 nm ชาย, > 395 nm หญิง) ไม่มี deposit", "Hyalinosis ของ efferent arteriole และ capsular drop ค่อนข้างจำเพาะต่อ diabetic pattern (พบใน idiopathic nodular GS ได้) ส่วน fibrin cap ไม่จำเพาะ") }),
      N("Idiopathic nodular glomerulosclerosis", "nephro", { s: "ภาพเหมือน DKD แต่ไม่มี DM", keys: ["Smoking หนักเกือบทุกราย, HTN นาน, obesity, ชายสูงอายุ", "HbA1c และ OGTT ปกติ"], ix: ["OGTT เพราะ HbA1c อาจพลาด prediabetes", "IF และ Congo red ต้องลบเพื่อตัด MIDD และ amyloid"], std: "Markowitz GS et al. Hum Pathol 2002, Nasr SH, D'Agati VD. Nephron Clin Pract 2007",
        why: "เป็น diagnosis of exclusion ที่ต้องพูดให้ครบสามข้อ: ไม่มี DM, ไม่มี paraprotein, ไม่มี amyloid แล้วชี้ risk factor ที่แก้ได้คือหยุดบุหรี่และคุม BP",
        bx: B("KW-like nodule ที่ติด silver แบบ lamellated เหมือน DKD, GBM หนา, arteriolosclerosis และ arteriolar hyalinosis รุนแรง, global sclerosis และ IFTA มาก", "Linear IgG และ albumin (insudation) ไม่มี restriction", "GBM หนา homogeneous ไม่มี organized deposit", "แยกจาก DKD ด้วย clinical เท่านั้น biopsy เหมือนกันทุกอย่าง") })
    ]),
    N("Silver negative, Congo red positive (apple-green birefringence)", "step", {
      s: "Congo red บวกที่มี apple-green birefringence คือ amyloid และทุกรายต้อง typing (IF หรือ IHC ก่อน ส่วน LC-MS/MS เป็น gold standard เมื่อผลไม่ชัด)",
      keys: ["Nodule acellular, PAS อ่อน, silver ลบ, อาจเห็น spicule ยื่นจาก GBM บน silver", "Amyloid ใน vessel wall"],
      ix: ["LC-MS/MS typing, SFLC, bone marrow, NT-proBNP"]
    }, [
      N("AL amyloidosis", "nephro", { s: "λ เด่นชัด ราว 3 ใน 4 ของ AL เป็น λ", keys: ["λ FLC สูง, ratio ต่ำ", "Cardiac involvement บอก prognosis"], ix: ["Mayo staging, bone marrow"],
        bx: B("Amorphous acellular eosinophilic material ใน mesangium, GBM และ vessel wall, PAS อ่อน, silver ลบ, spicule บน GBM", "λ restriction เด่น (λ ต่อ κ ราว 3 ต่อ 1), บางรายย้อมไม่ติดทั้งคู่จึงต้อง LC-MS/MS", "Random non-branching fibril 8-12 nm", "Congo red บวกร่วม λ คือ AL จนกว่า typing จะบอกอื่น") }),
      N("AA amyloidosis and other amyloid (ALECT2, fibrinogen, TTR)", "nephro", { s: "Typing แยกชนิด", keys: ["AA: chronic inflammation, SAA สูง", "ALECT2: interstitium เด่น", "Fibrinogen Aα: glomeruli อุดเกือบทั้งหมด vessel ไม่ค่อยมี"], ix: ["LC-MS/MS, SAA, genetics"],
        bx: B("AA: glomerular และ vascular, ALECT2: interstitium และ vessel เด่น glomeruli น้อย, AFib: glomerular obliteration", "κ และ λ ลบ, AA บวกด้วย SAA IHC", "Fibril 8-12 nm", "Distribution ใน compartment ช่วยเดาชนิดก่อนผล typing") })
    ]),
    N("Silver negative or weak, Congo red negative, linear light chain along GBM, TBM and vessels", "step", {
      s: "Monoclonal immunoglobulin deposition disease",
      keys: ["κ เด่นชัด ราว 4 ใน 5 ของ LCDD", "TBM หนาและ linear staining ที่ TBM ชัดกว่า GBM ได้"],
      ix: ["SFLC, bone marrow, C3 ใน HCDD"]
    }, [
      N("MIDD (LCDD, HCDD, LHCDD)", "nephro", { s: "LCDD พบบ่อยสุด", keys: ["κ เด่น", "HCDD มักเป็น γ heavy chain และ serum C3 ต่ำได้ (γ1, γ3)"], ix: ["Clone-directed therapy"], link: "mspike",
        bx: B("Nodule PAS บวกแรงแต่ silver ลบหรือติดอ่อนและไม่ lamellated, TBM หนาเป็นริบบิ้น, nodule ขนาดไม่เท่ากัน", "Linear light chain ชนิดเดียว (κ ราว 80%) ตาม GBM, TBM และ arteriolar wall โดยอีกชนิดลบ, HCDD: linear heavy chain ไม่มี light chain", "Powdery punctate electron-dense deposit ตาม inner GBM (lamina rara interna) และ outer TBM", "Linear light chain ชนิดเดียวที่ทั้ง GBM และ TBM แยกจาก linear IgG ของ DKD ซึ่งมี κ และ λ เท่ากัน") })
    ]),
    N("Silver negative, Congo red negative, smudgy polyclonal IgG with C3", "step", {
      s: "Fibrillary GN ที่มาเป็น nodule",
      keys: ["DNAJB9 บวก", "Fibril 12-24 nm"],
      ix: ["DNAJB9 IHC, malignancy, autoimmune, HCV screen"]
    }, [
      N("Fibrillary GN", "nephro", { s: "DNAJB9 บวก", keys: ["Congo red ลบในเกือบทุกราย (congophilic fibrillary GN พบน้อย ใช้ DNAJB9 แยกจาก amyloid)"], ix: ["Screen malignancy, autoimmune disease, HCV และ monoclonal gammopathy"],
        bx: B("Mesangial expansion ที่ silver ลบ, nodular หรือ MPGN หรือ crescent", "Smudgy IgG (IgG4 ร่วม IgG1 พบบ่อย) และ C3, κ และ λ ทั้งคู่ (polyclonal)", "Random fibril 12-24 nm หนากว่า amyloid", "Congo red ลบและ fibril หนากว่า amyloid") })
    ]),
    N("Silver negative, Congo red negative, IF negative or weak with huge deposits", "step", {
      s: "Glomerulopathy จาก non-immunoglobulin deposit",
      keys: ["Fibronectin IHC บวก = fibronectin glomerulopathy", "Banded collagen type III บน EM = collagenofibrotic"],
      ix: ["Fibronectin IHC, collagen III, family history"]
    }, [
      N("Fibronectin glomerulopathy", "nephro", { s: "AD (FN1), HTN, proteinuria, hematuria", keys: ["Family history"], ix: ["FN1 genetic test"],
        bx: B("Lobular glomeruli กับ mesangial และ subendothelial deposit ขนาดใหญ่ PAS บวก silver ลบ", "Ig ลบหรืออ่อน, fibronectin IHC บวกแรง", "Granular หรือ fibrillar deposit 12-16 nm", "Deposit มหาศาลแต่ IF เกือบลบ") }),
      N("Collagenofibrotic glomerulopathy", "nephro", { s: "Type III collagen สะสม", keys: ["Serum procollagen III peptide สูง"], ix: ["Collagen III IHC"],
        bx: B("Mesangial expansion และ subendothelial widening", "Ig ลบ, collagen III บวก", "Curved banded collagen fibril", "Banded fibril บน EM") })
    ]),
    N("In the transplant kidney", "step", KTSTEP("Nodule ใน graft: recurrent หรือ de novo", ["PTDM ทำ DKD ใน graft", "AL amyloid และ LCDD recur ถ้า clone ไม่สงบ"]), [
      N("Recurrent or de novo diabetic kidney disease", "nephro", { s: "DKD ใน graft ใช้เวลาหลายปี", keys: ["PTDM หรือ DM เดิม"], ix: ["HbA1c"],
        bx: B("GBM หนา, mesangial expansion, arteriolar hyalinosis", "Linear IgG และ albumin", "GBM หนา", "Hyalinosis ของ DKD เป็น subendothelial ส่วนของ CNI เป็น nodular peripheral") }),
      N("Recurrent amyloidosis or MIDD", "nephro", { s: "Clone ยังไม่สงบ", keys: ["FLC สูง"], ix: ["SFLC"],
        bx: B("Nodule หรือ amorphous material", "λ ใน AL, linear κ ใน LCDD เหมือนไตเดิม", "Fibril หรือ punctate deposit", "ควรได้ deep hematologic response (CR หรือ VGPR) ก่อน KT") })
    ])
  ]),
  tables: [
    { title: "Nodule differential at a glance", head: ["Feature","DKD","Idiopathic nodular GS","AL amyloid","LCDD","Fibrillary GN"], rows: [
      ["PAS","บวกแรง lamellated","บวกแรง lamellated","อ่อน, pale","บวกแรง","บวก"],
      ["Silver","บวกแรง lamellated","บวกแรง lamellated","ลบ, spicule บน GBM","ลบหรืออ่อน ไม่ lamellated","ลบ"],
      ["Congo red","ลบ","ลบ","บวก apple-green","ลบ","ลบ"],
      ["IF","Linear IgG + albumin, κ = λ","Linear IgG + albumin, κ = λ","λ เด่น (ราว 3:1)","Linear κ เด่น (ราว 80%) ที่ GBM และ TBM","Smudgy polyclonal IgG + C3, κ = λ, DNAJB9"],
      ["EM","GBM หนา homogeneous","GBM หนา homogeneous","Fibril 8-12 nm","Powdery punctate deposit","Fibril 12-24 nm"],
      ["Vessel","Afferent และ efferent hyalinosis","Arteriolosclerosis และ hyalinosis รุนแรง","Amyloid ใน vessel wall","Linear κ ใน arteriolar wall","ไม่จำเพาะ"],
      ["Clinical clue","DM นาน, retinopathy","Smoking, HTN, obesity, ไม่มี DM","NT-proBNP, macroglossia, λ FLC","κ FLC สูง, CKD นำ","Malignancy, autoimmune, HCV"]
    ], note: "Lobular accentuation ของ chronic MPGN ไม่ใช่ nodular glomerulosclerosis: เป็น lobule ที่ hypercellular ร่วม double contour และ immune deposit จึงอยู่ใน line MPGN" },
    { title: "Which light chain dominates", head: ["Disease","Light chain ที่เด่น","ความหมาย"], rows: [
      ["AL amyloidosis","λ (ราว 3 ต่อ 1)","κ ใน amyloid ให้ยืนยันด้วย typing"],
      ["LCDD","κ (ราว 80%)","λ-LCDD พบน้อย"],
      ["Light chain proximal tubulopathy (crystalline)","κ","Crystal ใน PT เกือบทั้งหมดเป็น κ"],
      ["PGNMID","IgG3κ","ตรวจพบ clone ในเลือดหรือไขกระดูกได้ส่วนน้อย"],
      ["Cryoglobulinemia type II","IgM-κ","Monoclonal IgM-κ กับ polyclonal IgG"],
      ["Light chain cast nephropathy","κ และ λ พบใกล้เคียงกัน","ดู involved FLC มากกว่าชนิด"]
    ]},
    { title: "RPS classification of diabetic nephropathy (Tervaert 2010)", head: ["Class","Definition"], rows: [
      ["I","GBM thickening อย่างเดียว (EM)"],
      ["IIa","Mild mesangial expansion ใน > 25% ของ mesangium (mesangial area เล็กกว่า capillary lumen)"],
      ["IIb","Severe mesangial expansion ใน > 25% ของ mesangium (mesangial area ใหญ่กว่า capillary lumen)"],
      ["III","Nodular sclerosis (KW lesion) อย่างน้อย 1 nodule และ global sclerosis ไม่เกิน 50%"],
      ["IV","Advanced: global sclerosis > 50% ของ glomeruli"]
    ]}
  ]
};

/* ===================== TMA ===================== */
TREES["bx-tma"] = {
  must: [
    "Platelet, LDH, haptoglobin, schistocyte ในวันที่ biopsy",
    "BP และ fundoscopy",
    "ADAMTS13, stool STEC, aPL, complement",
    "Drug: VEGF inhibitor, gemcitabine, CNI, mitomycin",
    "Pregnancy และ postpartum",
    "Transplant และ DSA"
  ],
  tree: N("Thrombotic microangiopathy on biopsy", "root", {
    s: "แยก acute กับ chronic lesion และดูว่า lesion เด่นที่ glomerulus หรือ arteriole แล้วกลับไปใช้ lab algorithm ของ TMA หาสาเหตุ",
    why: "Biopsy บอกว่าเป็น TMA แต่ไม่บอกสาเหตุ ตำแหน่ง lesion ช่วยชี้ เช่น arteriolar เด่นใน malignant HTN และ SRC",
    keys: ["Acute: thrombi, mesangiolysis, fragmented RBC ในผนัง", "Chronic: double contour, onion skin", "IF ไม่มี immune deposit"],
    ix: ["ADAMTS13, STEC, complement, aPL"],
    std: "ISTH 2020 TTP guideline, KDIGO 2017 aHUS controversies",
    bx: B("Acute: fibrin thrombi, endothelial swelling, mesangiolysis, fragmented RBC ใน vessel wall, arteriolar fibrinoid necrosis. Chronic: double contour, onion-skin intimal proliferation", "ลบ หรือ fibrin ใน thrombi, IgM trapping", "Subendothelial lucent widening (flocculent material) ไม่มี electron-dense deposit, loss of fenestration", "IF ลบร่วม double contour แยกจาก MPGN")
  }, [
    N("Acute glomerular and arteriolar thrombi", "step", { s: "Active TMA", keys: ["Fibrin thrombi"], ix: ["ADAMTS13"] }, [
      N("TMA", "nephro", { s: "หาสาเหตุ", keys: ["ADAMTS13 activity < 10% = TTP"], ix: ["ไปที่ approach TMA"], link: "tma",
        bx: B("Glomerular และ arteriolar thrombi", "Fibrin", "Subendothelial lucency", "TTP มักมี lesion ในไตน้อยกว่า aHUS") }),
      N("Malignant hypertension", "nephro", { s: "Onion skin, fibrinoid necrosis ของ arteriole", keys: ["Grade III-IV retinopathy"], ix: ["คุม BP"],
        bx: B("Arteriolar fibrinoid necrosis, onion-skin intimal hyperplasia ของ interlobular artery, glomerular ischemia", "Fibrin ใน arteriole", "Endothelial injury", "Lesion เด่นที่ arteriole มากกว่า glomerulus") }),
      N("Scleroderma renal crisis", "nephro", { s: "Mucoid intimal thickening ของ interlobular artery", keys: ["Anti-RNA polymerase III"], ix: ["ACEi"],
        bx: B("Mucoid (myxoid) intimal thickening ของ arcuate และ interlobular artery, thrombi, glomerular ischemic collapse", "Fibrin, C4d บน PTC ได้", "Endothelial injury", "Mucoid intima ในผู้ป่วย SSc") })
    ]),
    N("TMA with IF or EM features of another disease", "step", { s: "TMA ซ้อนโรคอื่น", keys: ["Full-house = LN with TMA", "aPL บวกซ้ำห่าง ≥ 12 สัปดาห์ = APS nephropathy", "C4d และ DSA = ABMR"], ix: ["aPL, ANA, DSA"] }, [
      N("APS / CAPS / SLE", "nephro", { s: "APS nephropathy", keys: ["aPL บวกซ้ำ"], ix: ["Anticoagulation"],
        bx: B("Acute TMA หรือ chronic: fibrous intimal hyperplasia, organized thrombi, focal cortical atrophy", "ลบ หรือ full-house ถ้ามี LN ร่วม", "Endothelial injury", "Focal cortical atrophy ร่วม arterial fibrous intimal hyperplasia") })
    ]),
    N("In the transplant kidney", "step", KTSTEP("TMA ใน graft แยก CNI, ABMR และ recurrent aHUS", ["MVI, C4d และ DSA = ABMR-associated TMA", "ไม่มี MVI, C4d และ DSA ในผู้ที่ได้ CNI หรือ mTOR inhibitor = นึกถึง drug-associated TMA (level ไม่จำเป็นต้องสูง)", "aHUS เดิมที่ไม่ได้ C5 inhibitor = recurrence"]), [
      N("Transplant-associated TMA", "nephro", { s: "CNI, ABMR, recurrent aHUS, viral", keys: ["DSA, CNI level"], ix: ["Banff"],
        bx: B("Glomerular หรือ arteriolar thrombi, arteriolar myocyte necrosis ใน CNI", "Fibrin, C4d บน PTC ใน ABMR", "Subendothelial lucency", "C4d และ MVI ชี้ ABMR") }),
      N("Recurrent atypical HUS", "nephro", { s: "Recurrence สูงในผู้ที่มี complement variant โดยไม่ได้ C5 inhibitor", keys: ["CFH หรือ C3 variant"], ix: ["C5 inhibitor"],
        bx: B("Acute TMA ส่วนใหญ่ในปีแรก มักเร็วในเดือนแรกๆ", "Fibrin", "Subendothelial lucency", "Prophylactic C5 inhibitor ลด recurrence ได้มากในกลุ่มเสี่ยงสูง") })
    ])
  ]),
  tables: [
    { title: "Acute vs chronic TMA lesions", head: ["Compartment","Acute","Chronic"], rows: [
      ["Glomerulus","Fibrin thrombi, endothelial swelling, mesangiolysis, bloodless glomeruli","Double contour, ischemic wrinkling"],
      ["Arteriole","Fibrinoid necrosis, thrombi, fragmented RBC ใน wall","Hyaline หรือ fibrous occlusion"],
      ["Artery","Mucoid intimal edema","Onion-skin fibrous intimal hyperplasia"],
      ["EM","Subendothelial flocculent lucency","New GBM, mesangial interposition"]
    ]},
    { title: "TMA in the transplant kidney", head: ["Feature","CNI TMA","ABMR-associated TMA","Recurrent aHUS"], rows: [
      ["เวลา","มักช่วงแรกหลัง KT โดย level ไม่จำเป็นต้องสูง","ช่วงใดก็ได้","ส่วนใหญ่ในปีแรก มักเดือนแรกๆ"],
      ["MVI (g + ptc)","ไม่เด่น","≥ 2","ไม่เด่น"],
      ["C4d บน PTC","ลบ","มักบวก","ลบ"],
      ["DSA","ลบ","บวก","ลบ"],
      ["Arteriole","Myocyte necrosis, nodular hyalinosis","Arteritis (v) ได้","Thrombi"],
      ["การรักษา","ลดหรือเปลี่ยน CNI","Treat ABMR","C5 inhibitor"]
    ]}
  ]
};

/* ===================== TUBULOINTERSTITIAL ===================== */
TREES["bx-tin"] = {
  must: [
    "Drug exposure ทั้งหมดใน 6 เดือน (PPI, NSAID, antibiotic, ICI)",
    "Uveitis (TINU), sicca, IgG4, ACE, calcium",
    "SFLC และ SPEP",
    "CK, uric acid, PO4, ethylene glycol, drug crystal",
    "Infection (pyelonephritis, BK ใน KT, TB)",
    "Glomeruli ปกติหรือไม่ เพื่อแยก primary tubulointerstitial"
  ],
  tree: N("Tubulointerstitial pattern", "root", {
    s: "Glomeruli ปกติหรือเกือบปกติ แล้วดูชนิดของ infiltrate, cast, crystal และ tubular injury",
    why: "Infiltrate และ cast บอกสาเหตุได้มากกว่า clinical และเปลี่ยนการรักษา",
    keys: ["Eosinophil เด่น นึกถึง drug AIN ก่อน (ไม่จำเพาะ และไม่มี eosinophil ก็ไม่ตัด)", "Granuloma = sarcoid, TB, drug", "Plasma cell + storiform fibrosis = IgG4", "Fractured cast + giant cell = light chain", "Crystal = drug, oxalate, phosphate, urate"],
    ix: ["Special stains, IgG4 IHC, κ/λ, polarized light"],
    std: "Raissian Y et al. JASN 2011, IMWG 2016",
    bx: B("Interstitial infiltrate, tubulitis, cast, crystal, tubular injury", "ส่วนใหญ่ลบ ยกเว้น anti-TBM, IgG4 TBM deposit, light chain ใน cast", "ไม่จำเป็นในส่วนใหญ่", "ชนิดของเซลล์และสิ่งใน lumen บอกสาเหตุ")
  }, [
    N("Interstitial inflammation with tubulitis", "step", { s: "AIN", keys: ["Eosinophil, edema"], ix: ["Drug review, IgG4, ACE"] }, [
      N("Acute interstitial nephritis", "nephro", { s: "Drug, infection, autoimmune, ICI", keys: ["Eosinophil เด่นใน drug"], ix: ["Steroid ถ้าไม่ดีขึ้นหลังหยุดยา"],
        bx: B("Interstitial edema, lymphocyte, monocyte, eosinophil, tubulitis, glomeruli ปกติ", "ลบ", "ไม่จำเป็น", "Eosinophil ไม่มีไม่ตัด drug AIN (PPI และ ICI มี eosinophil น้อย)") }),
      N("Granulomatous interstitial nephritis", "nephro", { s: "Sarcoid, TB, drug, GPA", keys: ["Non-caseating granuloma"], ix: ["AFB, GMS, ACE, Ca"],
        bx: B("Granuloma ใน interstitium", "ลบ", "ไม่จำเป็น", "ต้องย้อม AFB และ GMS ก่อนสรุป sarcoid") }),
      N("IgG4-related tubulointerstitial nephritis", "nephro", { s: "Plasma cell-rich, storiform fibrosis, TBM deposit", keys: ["IgG4+ > 10/HPF, IgG4/IgG > 40%"], ix: ["Serum IgG4, complement ต่ำ"],
        bx: B("Plasma cell-rich infiltrate, storiform (bird's-eye) fibrosis, ขอบเขตชัด", "Granular IgG และ C3 ที่ TBM", "TBM deposit", "Storiform fibrosis ร่วม TBM deposit") })
    ]),
    N("Abnormal casts", "step", { s: "Cast nephropathy หรือ pigment", keys: ["Fractured cast, giant cell = light chain", "Pigmented cast = myoglobin หรือ hemoglobin"], ix: ["κ/λ, myoglobin IHC"] }, [
      N("Light chain cast nephropathy", "nephro", { s: "κ หรือ λ restriction (พบใกล้เคียงกัน)", keys: ["Giant cell reaction"], ix: ["SFLC, bone marrow"], link: "mspike",
        bx: B("Fractured waxy cast PAS ลบหรืออ่อน ใน distal tubule ล้อมด้วย giant cell และ neutrophil", "κ หรือ λ เดียวใน cast", "ไม่จำเป็น", "Tamm-Horsfall cast ปกติ PAS บวกและไม่มี giant cell") }),
      N("Pigment nephropathy", "nephro", { s: "Rhabdomyolysis หรือ hemolysis", keys: ["Myoglobin IHC บวก"], ix: ["CK"],
        bx: B("Granular pigmented (red-brown) cast, ATN", "ลบ", "ไม่จำเป็น", "Myoglobin และ hemoglobin IHC แยกสาเหตุ") })
    ]),
    N("Crystals in tubules", "step", { s: "Crystal nephropathy", keys: ["ใส รูปพัด และ birefringent = calcium oxalate (urate, 2,8-DHA และ drug crystal ก็ birefringent)", "Von Kossa บวก ไม่ birefringent = calcium phosphate"], ix: ["Polarized light, von Kossa"] }, [
      N("Crystal nephropathy", "nephro", { s: "Oxalate, phosphate, urate, drug", keys: ["Polarization"], ix: ["Plasma oxalate, drug review"],
        bx: B("Oxalate: translucent birefringent fan-shaped, phosphate: purple basophilic non-birefringent, urate: needle-shaped tophus", "ลบ", "ไม่จำเป็น", "Polarized light และ von Kossa แยกชนิด") }),
      N("Light chain proximal tubulopathy", "nephro", { s: "Crystal ใน proximal tubule", keys: ["κ เด่น"], ix: ["EM"],
        bx: B("Proximal tubule บวม vacuolated มี crystal หรือไม่มี crystal", "κ เด่นมากใน crystalline form (มักต้อง pronase IF)", "Rhomboid crystal ใน PT lysosome", "Fanconi ร่วม κ") })
    ]),
    N("Acute tubular injury without inflammation", "step", { s: "ATN", keys: ["Loss of brush border, epithelial flattening, sloughing"], ix: ["Drug level, perfusion"] }, [
      N("Ischemic / septic ATN", "nephro", { s: "Ischemia", keys: ["Patchy"], ix: ["Supportive"],
        bx: B("Loss of brush border, flattening, sloughing, mitosis (regeneration)", "ลบ", "ไม่จำเป็น", "Regeneration บอกว่ากำลังฟื้น") }),
      N("Nephrotoxic ATN", "nephro", { s: "Toxin", keys: ["Isometric vacuolization ใน osmotic nephrosis หรือ CNI"], ix: ["Drug review"],
        bx: B("Isometric vacuolization (sucrose, mannitol, CNI), myeloid body (aminoglycoside)", "ลบ", "Myeloid body ใน lysosome", "Vacuole ขนาดเท่ากัน (isometric) นึกถึง osmotic nephrosis หรือ CNI toxicity") })
    ]),
    N("Viral inclusions or infection", "step", { s: "Infection", keys: ["SV40 บวก = BK", "Neutrophil cast = pyelonephritis"], ix: ["SV40, CMV, culture"] }, [
      N("BK polyomavirus nephropathy", "nephro", { s: "SV40 บวก", keys: ["Intranuclear inclusion"], ix: ["Plasma BK PCR"],
        bx: B("Ground-glass intranuclear inclusion ใน tubular epithelium (medulla เด่น), tubular injury, interstitial inflammation ร่วม plasma cell", "SV40 IHC บวก", "Viral particle 30-50 nm ใน nucleus", "ต้องย้อม SV40 ทุก graft biopsy ก่อนให้ steroid") }),
      N("Acute pyelonephritis", "nephro", { s: "Neutrophil, WBC cast", keys: ["Culture บวก"], ix: ["Antibiotic"],
        bx: B("Neutrophil ใน interstitium และ tubular lumen (neutrophil cast), abscess", "ลบ", "ไม่จำเป็น", "Neutrophil cast แยกจาก TCMR") })
    ]),
    N("In the transplant kidney", "step", KTSTEP("Interstitial inflammation ใน graft แยก TCMR, BK, drug AIN และ pyelonephritis", ["SV40 บวก = polyomavirus nephropathy แม้มี tubulitis (TCMR เกิดร่วมได้ ให้ดู arteritis และ inflammation นอกบริเวณที่ SV40 บวก)", "Neutrophil cast นึกถึง pyelonephritis ก่อน", "Eosinophil เด่นร่วมยาใหม่ นึกถึง drug AIN (eosinophil พบใน TCMR ได้)"]), [
      N("Acute TCMR", "nephro", { s: "Banff i ≥ 2 กับ t ≥ 2", keys: ["SV40 ลบ"], ix: ["Grade I: pulse steroid ก่อน, grade II ขึ้นไป: ATG โดยมักให้ร่วมกับ pulse steroid"], link: "kt-early",
        bx: B("Mononuclear infiltrate ใน cortex, tubulitis, intimal arteritis ใน grade II-III", "C4d ลบ (ถ้าไม่มี ABMR ร่วม)", "ไม่จำเป็น", "Infiltrate ใน cortex และ arteritis ชี้ rejection") }),
      N("Drug-induced: TMP-SMX AIN, crystal (acyclovir)", "nephro", { s: "Drug AIN ใน graft", keys: ["ยาใหม่"], ix: ["Drug review"],
        bx: B("Interstitial eosinophil เด่น", "ลบ", "ไม่จำเป็น", "แยกจาก TCMR ยาก ต้องอาศัยยาและ eosinophil") })
    ])
  ]),
  tables: [
    { title: "Interstitial inflammation in the graft: TCMR vs BK vs drug AIN vs pyelonephritis", head: ["Feature","TCMR","BK nephropathy","Drug AIN","Pyelonephritis"], rows: [
      ["ตำแหน่ง","Cortex","Medulla เด่น แล้วลาม","Diffuse","Patchy, medulla"],
      ["เซลล์","Lymphocyte, monocyte","Lymphocyte ร่วม plasma cell","Eosinophil เด่น","Neutrophil"],
      ["Tubular lumen","Tubulitis","Inclusion, cell shedding","Tubulitis","Neutrophil cast"],
      ["Arteritis (v)","มีใน grade II-III","ไม่มี","ไม่มี","ไม่มี"],
      ["Stain","SV40 ลบ","SV40 บวก","SV40 ลบ","Culture บวก"],
      ["Blood test","Tacrolimus มักต่ำหรือ nonadherence","Plasma BK DNA มัก > 10^4 copies/mL","มียาใหม่","Urine culture บวก"],
      ["การรักษา","เพิ่ม IS","ลด IS","หยุดยา","Antibiotic"]
    ]},
    { title: "Crystals and casts", head: ["สิ่งที่เห็น","ลักษณะ","Stain","โรค"], rows: [
      ["Calcium oxalate","Translucent fan-shaped","Birefringent ใต้ polarized","EG, enteric, primary hyperoxaluria, vitamin C"],
      ["Calcium phosphate","Purple basophilic","Von Kossa บวก ไม่ birefringent","Acute phosphate nephropathy"],
      ["Urate","Needle ใน medulla","Birefringent (ล้างหายใน formalin)","TLS, gout"],
      ["Light chain cast","Fractured waxy ร่วม giant cell","κ หรือ λ restricted","Myeloma"],
      ["Myoglobin cast","Red-brown granular","Myoglobin IHC","Rhabdomyolysis"],
      ["2,8-DHA","Brown round crystal","Birefringent","APRT deficiency"]
    ]}
  ]
};

/* ===================== ORGANIZED DEPOSITS ===================== */
TREES["bx-organized"] = {
  must: [
    "Congo red และ DNAJB9",
    "IF light chain และ IgG subclass",
    "Serum cryoglobulin, HCV",
    "SPEP, IFE, SFLC",
    "CLL หรือ lymphoma",
    "Fibril size บน EM เป็น nm"
  ],
  tree: N("Organized deposits on EM", "root", {
    s: "วัดขนาดและดูโครงสร้างของ deposit แล้วยืนยันด้วย Congo red, DNAJB9, IF และ serum",
    why: "ขนาดและการเรียงตัวของ fibril ช่วยแยกโรคได้มาก แต่ช่วงขนาดซ้อนทับกัน จึงต้องยืนยันด้วย Congo red, DNAJB9 และ IF และแต่ละโรคมี clone หรือสาเหตุที่ต้องหาต่อ",
    keys: ["8-12 nm random = amyloid", "12-24 nm random = fibrillary", "Parallel hollow microtubule ส่วนใหญ่ > 30 nm (ช่วง 14-60 nm) = immunotactoid", "20-35 nm curved or annular = cryoglobulin"],
    ix: ["Congo red, DNAJB9, κ/λ, cryoglobulin, SFLC"],
    std: "IKMG 2019, DNAJB9 in fibrillary GN: Dasari S et al. JASN 2018 และ Nasr SH et al. Kidney Int Rep 2018",
    bx: B("Mesangial expansion, MPGN หรือ amorphous material", "ตามโรค", "Substructure และขนาด", "ขนาดของ fibril เป็นข้อมูลที่ต้องพูดเป็นตัวเลข")
  }, [
    N("8-12 nm random fibrils, Congo red positive", "step", { s: "Amyloid", keys: ["Congo red บวกร่วม apple-green birefringence ใต้ polarized light (ต้องตัด section หนา 8-10 µm)", "ทุกรายต้อง typing เพราะ IF light chain มีทั้งผลลบปลอมและบวกปลอม"], ix: ["Typing ด้วย LC-MS/MS (หรือ IHC, immunogold ถ้าไม่มี)"] }, [
      N("AL amyloidosis", "nephro", { s: "Light chain amyloid", keys: ["Light chain restriction เป็น λ บ่อยกว่า κ ราว 3-4 เท่า (κ ก็เป็น AL ได้)"], ix: ["SPEP, serum และ urine IFE, SFLC", "Bone marrow", "Cardiac biomarker (NT-proBNP, troponin) เพื่อ staging"],
        bx: B("Amorphous material ที่ PAS จางและ silver ลบ ใน mesangium, GBM และผนังหลอดเลือด", "λ restriction ราวสามในสี่ของราย ที่เหลือเป็น κ, IF ลบหรือแปลผลไม่ได้พบได้ จึงต้อง typing", "Fibril 8-12 nm เรียงแบบ random ไม่แตกแขนง", "Congo red บวกร่วม light chain restriction (ส่วนใหญ่ λ), monoclonal protein ใน serum อย่างเดียวไม่ยืนยันว่าเป็น AL") }),
      N("AA amyloidosis and other amyloid (ALECT2, fibrinogen, TTR)", "nephro", { s: "Non-AL", keys: ["แยกจาก AL ด้วย typing ไม่ใช่ด้วย morphology"], ix: ["Amyloid A IHC, LC-MS/MS", "Genetic test เมื่อสงสัย hereditary (fibrinogen Aα, TTR, ApoA-I)", "หา chronic inflammation ใน AA"],
        bx: B("Distribution ต่างตามชนิด เช่น ALECT2 เด่นที่ cortical interstitium, fibrinogen Aα เด่นที่ glomerulus", "ไม่มี light chain restriction (ระวังการติดสี light chain แบบบวกปลอม)", "Fibril 8-12 nm", "Typing กำหนดการรักษา") })
    ]),
    N("12-24 nm random fibrils, Congo red negative, DNAJB9 positive", "step", { s: "Fibrillary GN", keys: ["Polyclonal IgG (IgG4 ร่วม IgG1 บ่อย)", "Congo red ลบเกือบทุกราย แต่มี congophilic fibrillary GN ส่วนน้อย ซึ่งแยกจาก amyloid ด้วย DNAJB9"], ix: ["Screen malignancy, autoimmune disease, HCV และ monoclonal gammopathy"] }, [
      N("Fibrillary GN", "nephro", { s: "DNAJB9 IHC หรือ mass spectrometry บวก (sensitivity ราว 98%, specificity > 99%)", keys: ["Congo red ลบ (congophilic variant ส่วนน้อย)"], ix: ["Screen malignancy, autoimmune disease, HCV, SPEP, IFE, SFLC"],
        bx: B("Mesangial expansion, MPGN, crescent ได้", "Smudgy IgG และ C3, ส่วนใหญ่ติดทั้ง κ และ λ (polyclonal), ส่วนน้อย light chain restricted", "Fibril 12-24 nm เรียงแบบ random", "DNAJB9 บวก") })
    ]),
    N("Microtubules mostly > 30 nm or curved microtubules", "step", { s: "Immunotactoid หรือ cryo", keys: ["Parallel = immunotactoid", "Curved annular = cryo"], ix: ["Cryoglobulin, SFLC, CLL"] }, [
      N("Immunotactoid GN / cryoglobulinemic GN type I", "nephro", { s: "สองโรคนี้สัมพันธ์กับ monoclonal Ig แยกกันด้วย serum cryoglobulin", keys: ["Immunotactoid GN: IgG ที่มี light chain restriction ราวสองในสามของราย อีกหนึ่งในสามเป็น polyclonal", "Type I cryoglobulin: monoclonal IgG หรือ IgM"], ix: ["Serum cryoglobulin, SPEP, IFE, SFLC", "ส่ง hematology หา CLL, lymphoma, plasma cell clone"], link: "mspike",
        bx: B("MPGN, endocapillary proliferative หรือ MN-like, type I cryo มี pseudothrombi", "IgG เด่น, light chain restricted ราวสองในสามของ immunotactoid GN", "Immunotactoid: hollow microtubule เรียงขนาน ส่วนใหญ่ > 30 nm (ช่วงที่รายงาน 14-60 nm)", "ราวสองในสามมี hematologic disorder โดย CLL หรือ lymphoma บ่อยสุด") }),
      N("Cryoglobulinemic GN", "nephro", { s: "Mixed cryoglobulin (type II และ III)", keys: ["HCV เป็นสาเหตุที่พบบ่อยที่สุด ที่เหลือคือ HBV, Sjögren, SLE และ B-cell lymphoma", "RF บวก และ C4 ต่ำกว่า C3 อย่างชัดเจน"], ix: ["Serum cryoglobulin (เก็บและส่งที่ 37°C, ผลลบครั้งเดียวไม่ตัดโรค)", "HCV RNA, HBsAg, ANA, anti-Ro, SPEP, IFE"],
        bx: B("MPGN ร่วม intraluminal pseudothrombi (PAS บวก) และ macrophage จำนวนมาก", "IgM, IgG, C3 (type II: IgM-κ เด่น)", "Curved หรือ annular microtubule 20-35 nm, หลายรายไม่เห็น substructure", "Pseudothrombi ใน capillary lumen") })
    ]),
    N("Crystals or punctate deposits", "step", { s: "Light chain crystal หรือ MIDD (MIDD เป็น non-organized deposit ตาม IKMG ใส่ไว้ที่นี่เพื่อเทียบกับ organized deposit)", keys: ["Crystal ใน proximal tubule หรือ histiocyte = organized (crystalline) deposit", "Powdery deposit ตาม GBM และ TBM = MIDD (non-organized)"], ix: ["IF κ และ λ (ถ้า frozen ลบให้ทำ paraffin IF หลัง pronase digestion)"] }, [
      N("Light chain proximal tubulopathy", "nephro", { s: "Crystal ใน proximal tubular cell", keys: ["Crystalline type เป็น κ เกือบทั้งหมด"], ix: ["SPEP, IFE, SFLC", "Urine glucose, phosphate, uric acid, amino acid หา Fanconi syndrome"],
        bx: B("Proximal tubular injury, cytoplasm บวมหรือเห็น crystal", "κ restricted ใน PT cell, frozen IF มักลบปลอม ต้องทำ paraffin IF หลัง pronase", "Rhomboid หรือ needle-shaped crystal ใน cytoplasm ของ PT", "Fanconi syndrome ทั้งแบบครบและไม่ครบ ร่วม monoclonal κ") }),
      N("MIDD (LCDD, HCDD, LHCDD)", "nephro", { s: "Punctate powdery deposit ที่ไม่มี substructure", keys: ["LCDD: linear light chain ตาม GBM และ TBM โดยเป็น κ ราว 80%", "HCDD: linear heavy chain (ส่วนใหญ่ γ) โดยไม่มี light chain"], ix: ["SPEP, IFE, SFLC, bone marrow"],
        bx: B("Nodular glomerulosclerosis พบได้บ่อยแต่ไม่ทุกราย ระยะแรก LM อาจเกือบปกติ", "LCDD: linear κ (ราว 80%) หรือ λ ตาม GBM และ TBM, HCDD: heavy chain อย่างเดียว", "Powdery punctate deposit ตาม inner aspect ของ GBM และ outer aspect ของ TBM", "Linear staining ตาม TBM ร่วมกับ GBM, Congo red ลบ") })
    ]),
    N("In the transplant kidney", "step", KTSTEP("Organized deposit ใน graft ส่วนใหญ่เป็น recurrence ของโรคเดิม แต่ de novo ก็เกิดได้ (เช่น cryoglobulinemic GN, AL amyloid) จึงต้องเทียบกับ native biopsy", ["Recurrence เร็วกว่าเมื่อ clone ยัง active คือยังไม่ได้ hematologic response ก่อน KT"]), [
      N("Recurrent paraprotein-related disease", "nephro", { s: "AL, MIDD, PGNMID (สองโรคหลังเป็น non-organized deposit) และ fibrillary GN ซึ่งส่วนใหญ่ไม่ใช่ paraprotein disease", keys: ["AL และ MIDD: SFLC ที่สูงขึ้นคือ hematologic relapse ซึ่งนำหน้า recurrence ใน graft", "PGNMID ส่วนใหญ่ตรวจไม่พบ clone ใน serum จึงใช้ SFLC ติดตามไม่ได้ ต้องอาศัย biopsy"], ix: ["SPEP, IFE, SFLC และส่ง hematology ประเมิน clone"],
        bx: B("ตามโรคเดิม", "Restriction เดียวกับไตเดิม", "Substructure เดียวกับไตเดิม", "PGNMID recur บ่อยและเร็ว") })
    ])
  ]),
  tables: [
    { title: "Organized deposits", head: ["Disease","Size (nm)","Arrangement","Congo red","IF","ต้องหาต่อ"], rows: [
      ["AL amyloid","8-12","Random fibril","บวก","λ บ่อยกว่า κ, บางราย IF ลบ","Typing (LC-MS/MS), clone, cardiac involvement"],
      ["Fibrillary GN","12-24","Random fibril","ลบ (congophilic ส่วนน้อย)","Polyclonal IgG (IgG4, IgG1), DNAJB9 บวก","Malignancy, autoimmune, HCV, monoclonal gammopathy"],
      ["Cryoglobulinemic GN","20-35 (หลายรายไม่เห็น substructure)","Curved หรือ annular microtubule","ลบ","Type II: IgM-κ ร่วม polyclonal IgG และ C3","HCV, HBV, autoimmune disease, lymphoma"],
      ["Immunotactoid GN","ส่วนใหญ่ > 30 (14-60)","Parallel hollow microtubule","ลบ","IgG, light chain restricted ราวสองในสาม","CLL, lymphoma, plasma cell clone"],
      ["Fibronectin glomerulopathy","12-16","ส่วนใหญ่ granular, บางรายเห็น fibril","ลบ","Ig ลบหรือจาง, fibronectin บวก","Family history, FN1 variant (พบราว 40%)"]
    ]}
  ]
};

/* ===================== TRANSPLANT (BANFF) ===================== */
TREES["bx-graft"] = {
  must: [
    "เวลาหลัง KT และ IS ปัจจุบัน, tacrolimus level และ CV",
    "DSA (class, MFI) และ C4d",
    "Plasma BK PCR",
    "Indication หรือ protocol biopsy",
    "โรคเดิมของไต (recurrence risk)",
    "Adequacy: ≥ 10 glomeruli และ ≥ 2 arteries"
  ],
  tree: N("Transplant biopsy (Banff)", "root", {
    s: "ให้คะแนน Banff lesion ทุกข้อแล้วจัด category: AMR, TCMR, borderline, BK, CNI, recurrent disease, IFTA และ other",
    why: "Banff category กำหนดการรักษาโดยตรงและเป็นภาษาที่ examiner ใช้",
    keys: ["Active AMR ต้องครบ 3 เกณฑ์: histologic injury, antibody interaction (C4d บวก หรือ MVI g + ptc ≥ 2) และ DSA (C4d บวกใช้แทน DSA ได้)", "TCMR IA: i ≥ 2 ร่วม t2, IB: i ≥ 2 ร่วม t3, IIA: v1, IIB: v2, III: v3 (grade II-III ไม่ขึ้นกับ i และ t)", "Borderline: t ≥ 1 ร่วม i1 หรือ i ≥ 2 ร่วม t1 โดย v0", "Chronic active AMR: cg > 0 หรือ severe PTC basement membrane multilayering (EM) ร่วมกับ antibody interaction และ DSA"],
    ix: ["C4d, SV40, DSA, EM ถ้าคิด cg"],
    std: "Banff 2022 (Naesens M et al. Am J Transplant 2024), Banff BK nephropathy classification (Nickeleit V et al. JASN 2018)",
    bx: B("Score ทุก lesion: i, t, v, g, ptc, ci, ct, cv, cg, ah, ti, i-IFTA, t-IFTA", "C4d บน PTC (IF C4d0-3 หรือ IHC), immune deposit ถ้าคิด recurrence", "cg1a, PTC multilayering, recurrent GN", "รายงานเป็น score ทุกครั้ง เช่น i2 t2 v0 g0 ptc0 C4d0")
  }, [
    N("Microvascular inflammation, C4d or DSA", "step", { s: "Antibody-mediated changes", keys: ["MVI ถึงเกณฑ์เมื่อ g + ptc ≥ 2 (ถ้ามี TCMR, borderline หรือ infection ร่วม ต้องมี g ≥ 1)", "C4d บวก = C4d2-3 บน IF (frozen) หรือ C4d > 0 บน IHC (paraffin)", "C4d ลบไม่ตัด AMR และ DSA ลบไม่ตัด MVI"], ix: ["DSA (HLA class I และ II, ถ้าลบพิจารณา non-HLA antibody)"] }, [
      N("Active ABMR", "nephro", { s: "MVI, C4d (บวกหรือลบก็ได้), DSA", keys: ["ไม่มี chronic lesion (cg0, ไม่มี severe PTC multilayering)"], ix: ["DSA", "การรักษาที่ใช้ทั่วไปคือ PLEX ร่วม IVIG และ steroid (หลักฐานระดับต่ำ)"],
        bx: B("Glomerulitis (g), peritubular capillaritis (ptc), intimal หรือ transmural arteritis (v) ได้, acute TMA หรือ ATN ที่ไม่มีสาเหตุอื่น", "C4d linear บน PTC (C4d2-3 IF), C4d ลบได้ถ้า MVI g + ptc ≥ 2 ร่วม DSA (C4d-negative AMR)", "Endothelial swelling, ยังไม่มี multilayering", "ครบ 3 เกณฑ์: histologic injury, antibody interaction (C4d หรือ MVI ≥ 2) และ DSA โดย C4d ไม่จำเป็นต้องบวก") }),
      N("Chronic active ABMR", "nephro", { s: "cg, PTC multilayering", keys: ["de novo DSA (ส่วนใหญ่ class II โดยเฉพาะ DQ) มักตามหลัง nonadherence หรือ under-immunosuppression", "ต้องตัด chronic TMA และ recurrent หรือ de novo GN ที่ทำให้เกิด double contour"], ix: ["DSA, ประเมิน adherence และ tacrolimus level ย้อนหลัง"],
        bx: B("Transplant glomerulopathy (cg), arterial intimal fibrosis ที่เกิดใหม่, MVI มักยังมีอยู่", "C4d บวกหรือลบก็ได้", "GBM double contour (cg1a เห็นเฉพาะ EM), severe PTC basement membrane multilayering (ptcml1: ≥ 7 ชั้นใน 1 PTC และ ≥ 5 ชั้นในอีก 2 PTC)", "Chronic lesion ร่วมหลักฐาน antibody interaction ปัจจุบัน (C4d หรือ MVI ≥ 2) และ DSA, ถ้ามี chronic lesion แต่ไม่มี MVI และ C4d ในผู้ที่เคยมี DSA หรือ AMR เรียก chronic (inactive) AMR") }),
      N("Probable AMR / MVI DSA-negative C4d-negative", "nephro", { s: "Banff 2022 categories ใหม่", keys: ["Probable AMR: DSA บวก ร่วม MVI ที่ต่ำกว่าเกณฑ์ (g + ptc < 2) โดย C4d ลบ", "MVI, DSA-negative, C4d-negative: g + ptc ≥ 2 โดย DSA และ C4d ลบ ซึ่งยังไม่ทราบสาเหตุแน่ชัด และไม่ได้แปลว่าไม่มี rejection"], ix: ["ตรวจ DSA ซ้ำและติดตาม, พิจารณา non-HLA antibody"],
        bx: B("Probable AMR: MVI ต่ำกว่าเกณฑ์, อีก phenotype: MVI g + ptc ≥ 2", "C4d ลบทั้งสอง phenotype", "อาจมี endothelial change", "สอง phenotype ใหม่ใน Banff 2022 ที่ยังไม่มี treatment มาตรฐาน") })
    ]),
    N("Interstitial inflammation, tubulitis or arteritis", "step", { s: "T cell-mediated", keys: ["Grade ด้วย i, t, v score", "v lesion (intimal arteritis) พบได้ทั้งใน TCMR และ ABMR จึงต้องดู MVI, C4d และ DSA ร่วมทุกครั้ง", "Interstitial inflammation ร่วม tubulitis ไม่จำเพาะต่อ TCMR ต้องตัด BK nephropathy, pyelonephritis และ drug-induced AIN"], ix: ["SV40 ทุกครั้งก่อนสรุปว่าเป็น TCMR"] }, [
      N("Acute TCMR", "nephro", { s: "Grade ตาม i, t, v", keys: ["v ≥ 1 = grade II ขึ้นไป โดยไม่ขึ้นกับ i และ t"], ix: ["การรักษา: grade I ให้ pulse methylprednisolone ก่อน และ ATG เมื่อ steroid-resistant, grade II ขึ้นไป (v ≥ 1) ให้ ATG โดยมักให้ร่วมกับ pulse steroid"],
        bx: B("Mononuclear infiltrate ใน non-scarred cortex (i), tubulitis (t), intimal arteritis (v)", "C4d ลบใน pure TCMR (ถ้าบวกให้หา mixed rejection)", "ไม่จำเป็น", "ต้องเห็น SV40 ลบก่อนเรียก TCMR แต่ BK nephropathy กับ TCMR พบร่วมกันได้") }),
      N("Chronic active TCMR", "nephro", { s: "Inflammation ใน scarred cortex", keys: ["Grade I: ต้องครบ ti ≥ 2, i-IFTA ≥ 2 และ t ≥ 2 หลังตัดสาเหตุอื่นของ i-IFTA แล้ว", "Grade II: chronic allograft arteriopathy"], ix: ["SV40, DSA, ทบทวน adherence และระดับ IS"],
        bx: B("Inflammation ใน area ที่เป็น IFTA (i-IFTA), tubulitis ใน tubule ที่ยังไม่ atrophic รุนแรง (t ที่ใช้ grade), mononuclear cell ใน arterial intimal fibrosis", "C4d ลบ ถ้าไม่มี AMR ร่วม", "ไม่จำเป็น", "i-IFTA สัมพันธ์กับ graft survival ที่แย่ลง แต่ไม่จำเพาะต่อ TCMR เพราะพบใน BK nephropathy, pyelonephritis, AMR และ recurrent GN ได้") }),
      N("Mixed rejection / borderline", "nephro", { s: "Borderline (suspicious for acute TCMR) และ mixed rejection เป็นสองภาวะที่ต่างกัน", keys: ["Borderline: t1-3 ร่วม i1 หรือ i2-3 ร่วม t1 โดย v0", "Mixed rejection: ครบเกณฑ์ทั้ง TCMR และ ABMR ใน biopsy เดียวกัน"], ix: ["SV40, DSA, C4d"],
        bx: B("Borderline: i และ t ไม่ถึงเกณฑ์ TCMR IA. Mixed: มี lesion ของ TCMR ร่วมกับ MVI", "Borderline: C4d ลบ. Mixed: C4d บวกหรือลบ", "ไม่จำเป็น", "Borderline ใน indication biopsy ที่ creatinine ขึ้นมักรักษาแบบ TCMR ส่วนใน protocol biopsy ที่ graft function คงที่ยังไม่มีข้อสรุปว่าต้องรักษา") })
    ]),
    N("SV40 positive inclusions", "step", { s: "BK polyomavirus nephropathy", keys: ["SV40 large T antigen บวกที่ nucleus ของ tubular epithelium (stain นี้ cross-react กับ JC virus)", "SV40 ลบไม่ตัดโรคเพราะ lesion เป็นหย่อมและเด่นที่ medulla ควรมี 2 cores ที่มี medulla"], ix: ["Plasma BK PCR"] }, [
      N("BK polyomavirus nephropathy", "nephro", { s: "Banff BK class 1-3", keys: ["การรักษาหลักคือลด IS"], ix: ["Plasma BK PCR ติดตามการตอบสนอง"],
        bx: B("Intranuclear inclusion, tubular injury, interstitial inflammation ที่ medulla เด่น", "SV40 บวก, C4d บน PTC ลบ", "Viral particle ราว 40 nm (ช่วง 30-50 nm) ใน nucleus", "Class ตาม pvl และ ci") })
    ]),
    N("Arteriolar hyalinosis, IFTA, isometric vacuolization", "step", { s: "CNI และ chronic injury", keys: ["Nodular arteriolar hyalinosis"], ix: ["CNI level"] }, [
      N("Acute CNI nephrotoxicity", "nephro", { s: "Functional (hemodynamic, biopsy ปกติได้) หรือ structural", keys: ["Trough สูงสนับสนุน แต่ trough ในเป้าไม่ตัด CNI toxicity"], ix: ["CNI trough, creatinine หลังลด dose"],
        bx: B("Isometric vacuolization ของ proximal tubule, arteriolar myocyte vacuolization หรือ necrosis, TMA ได้", "ลบ", "Giant mitochondria", "Isometric vacuolization ไม่จำเพาะ (พบใน osmotic nephrosis จาก IVIG, mannitol, contrast ได้) จึงแปลผลร่วมกับ CNI level และประวัติยา") }),
      N("Chronic CNI nephrotoxicity", "nephro", { s: "ah และ aah score", keys: ["Striped fibrosis (ไม่จำเพาะ)", "ไม่มี lesion ใดที่ pathognomonic ต้องตัด HTN, DM และ donor-derived lesion โดยเทียบกับ time-zero biopsy"], ix: ["CNI exposure ย้อนหลัง, time-zero biopsy"],
        bx: B("Nodular hyaline ที่ peripheral ของ arteriole (beaded) แทนที่ myocyte, striped fibrosis, tubular microcalcification", "ลบ", "ไม่จำเป็น", "Nodular peripheral hyaline ต่างจาก subendothelial hyaline ของ HTN และ DM") }),
      N("IFTA without specific etiology", "nephro", { s: "Banff IFTA grade I, II, III", keys: ["ci และ ct"], ix: ["ทบทวนสาเหตุ"],
        bx: B("Interstitial fibrosis และ tubular atrophy", "ลบ", "ไม่จำเป็น", "Grade I 6-25%, II 26-50%, III > 50% ของ cortex") })
    ]),
    N("Glomerular disease on IF or EM", "step", { s: "Recurrent หรือ de novo", keys: ["ต้องเทียบกับ native biopsy ถ้าไม่มีจะแยก recurrent จาก de novo ไม่ได้แน่นอน", "De novo MN ส่วนใหญ่ PLA2R ลบ และสัมพันธ์กับ AMR", "Double contour ที่ไม่มี immune deposit คือ transplant glomerulopathy ไม่ใช่ MPGN"], ix: ["Serology ตามโรค (anti-PLA2R, complement, ANCA, anti-GBM)"] }, [
      N("Recurrent GN", "nephro", { s: "FSGS, aHUS, C3G, MN, IgAN", keys: ["IF และ EM"], ix: ["Recurrence risk"],
        bx: B("ตามโรคเดิม", "ตามโรคเดิม", "ตามโรคเดิม", "ดู recurrence table สำหรับความเสี่ยงและเวลา") })
    ]),
    N("Other findings", "step", { s: "สาเหตุอื่นของ graft dysfunction", keys: ["Neutrophil cast ใน tubule ชี้ไปทาง acute pyelonephritis ให้ยืนยันด้วย urine culture", "Infiltrate ที่ atypical, expansile, มี B cell (CD20) เด่น ร่วม EBER บวก = PTLD โดย EBER ลบไม่ตัด PTLD", "Donor lesion บน time-zero biopsy"], ix: ["EBER, CD20, culture"] }, [
      N("PTLD involving graft", "nephro", { s: "Lymphoproliferation ที่ส่วนใหญ่เป็น B cell และ EBV-driven", keys: ["EBV PCR สูงสนับสนุน แต่ EBV-negative PTLD พบได้โดยเฉพาะช่วง late หลัง KT"], ix: ["EBV PCR, LDH", "PET-CT เพื่อ staging"], link: "kt-late",
        bx: B("Dense expansile infiltrate ทั้งแบบ monomorphic และ polymorphic, necrosis, atypical cell", "CD20 บวกเด่น (B cell) ต่างจาก TCMR ที่ T cell เด่น, EBER บวกในส่วนใหญ่", "ไม่จำเป็น", "Infiltrate ที่ดูเหมือน TCMR แต่ atypical, B cell เด่น และ EBER บวก") }),
      N("Delayed graft function and ATN", "nephro", { s: "ปัจจัยหลักคือ donor และ ischemia time", keys: ["Deceased donor โดยเฉพาะ DCD, cold ischemia นาน"], ix: ["Biopsy ถ้า DGF นานเกิน 7-10 วัน และทำซ้ำทุก 7-10 วันระหว่างที่ยัง DGF"],
        bx: B("Acute tubular injury ต้องหา rejection ที่เกิดร่วมทุกครั้ง เพราะ DGF สัมพันธ์กับ acute rejection มากขึ้น", "C4d ลบ", "ไม่จำเป็น", "Biopsy ใน DGF ที่นานเพื่อหา rejection ที่ซ่อนอยู่") })
    ])
  ]),
  tables: [
    { title: "Banff lesion scores", head: ["Score","Lesion","0","1","2","3"], rows: [
      ["i","Inflammation ใน non-scarred cortex","< 10%","10-25%","26-50%","> 50%"],
      ["t","Mononuclear cell ต่อ tubular cross-section ใน tubule ที่เป็นมากที่สุด","ไม่มี","1-4","5-10","> 10 หรือ TBM destruction"],
      ["v","Intimal arteritis (ใน artery ที่เป็นมากที่สุด)","ไม่มี","Lumen เสียไป < 25%","Lumen เสียไป ≥ 25%","Transmural arteritis หรือ fibrinoid necrosis"],
      ["g","Glomerulitis (% ของ glomeruli ที่มี glomerulitis)","ไม่มี","< 25%","25-75%","> 75%"],
      ["ptc","Peritubular capillaritis (ต้องมี ≥ 10% ของ cortical PTC ที่มี capillaritis แล้วนับ leukocyte ใน PTC ที่เป็นมากที่สุด)","< 10% ของ PTC หรือสูงสุด < 3 เซลล์","สูงสุด 3-4 เซลล์","สูงสุด 5-10 เซลล์","สูงสุด > 10 เซลล์"],
      ["cg","GBM double contour (% ของ capillary loop ใน glomerulus ที่เป็นมากที่สุด)","ไม่มี","1a: EM เท่านั้น, 1b: 1-25%","26-50%","> 50%"],
      ["ci, ct","Interstitial fibrosis, tubular atrophy (% ของ cortex)","ci ≤ 5%, ct ไม่มี","ci 6-25%, ct ≤ 25%","26-50%","> 50%"],
      ["cv","Arterial intimal fibrosis (lumen narrowing)","ไม่มี","≤ 25%","26-50%","> 50%"],
      ["C4d","C4d บน PTC (IF)","0%","< 10%","10-50%","> 50%"]
    ], note: "C4d บน IHC ให้ถือว่าบวกเมื่อ > 0 ส่วน IF บวกเมื่อ C4d2-3" },
    { title: "Banff TCMR grading", head: ["Grade","Criteria"], rows: [
      ["Borderline","t1-3 ร่วม i1 หรือ i2-3 ร่วม t1 โดย v0"],
      ["IA","i2-3 ร่วม t2"],
      ["IB","i2-3 ร่วม t3"],
      ["IIA","v1"],
      ["IIB","v2"],
      ["III","v3 (transmural arteritis หรือ fibrinoid necrosis)"],
      ["Chronic active IA, IB","ti2-3 และ i-IFTA2-3 (ตัดสาเหตุอื่นของ i-IFTA แล้ว) ร่วม t2 (IA) หรือ t3 (IB) โดยไม่นับ tubulitis ใน severely atrophic tubule"],
      ["Chronic active II","Chronic allograft arteriopathy ที่มี mononuclear cell ใน intimal fibrosis"]
    ]},
    { title: "Banff active ABMR criteria (all three needed)", head: ["Criterion","สิ่งที่นับได้"], rows: [
      ["1. Histologic injury (อย่างน้อย 1 ข้อ)","MVI (g > 0 หรือ ptc > 0 โดยไม่มี recurrent หรือ de novo GN, ถ้ามี TCMR, borderline หรือ infection ร่วม ptc อย่างเดียวไม่พอ ต้องมี g ≥ 1), v > 0, acute TMA ที่ไม่มีสาเหตุอื่น, acute tubular injury ที่ไม่มีสาเหตุอื่น"],
      ["2. Antibody interaction with endothelium","C4d2-3 บน IF หรือ C4d > 0 บน IHC, หรือ MVI อย่างน้อยปานกลาง (g + ptc ≥ 2 โดยไม่มี GN, ถ้ามี TCMR, borderline หรือ infection ร่วม ptc ≥ 2 อย่างเดียวไม่พอ ต้องมี g ≥ 1), หรือ validated molecular classifier"],
      ["3. Serologic evidence","DSA (HLA หรือ non-HLA), ถ้าตรวจไม่พบ DSA ใช้ C4d บวกหรือ validated molecular classifier แทนได้ แต่ควรตรวจ DSA ให้ครบรวม non-HLA"],
      ["Chronic active ABMR","Chronic lesion อย่างน้อย 1 ข้อ คือ cg > 0 (ไม่มี chronic TMA หรือ recurrent, de novo GN เป็นสาเหตุ), severe PTC multilayering (ptcml1 บน EM) หรือ arterial intimal fibrosis ที่เกิดใหม่โดยไม่มีสาเหตุอื่น ร่วมกับเกณฑ์ข้อ 2 และ 3"]
    ]},
    { title: "Banff BK nephropathy class (Nickeleit 2018)", head: ["Class","pvl (tubules with viral replication)","ci"], rows: [
      ["1","pvl1 (≤ 1%)","0-1"],
      ["2","pvl1 กับ ci2-3, หรือ pvl2 (> 1-10%) ทุก ci, หรือ pvl3 (> 10%) กับ ci0-1","ตามเงื่อนไข"],
      ["3","pvl3 (> 10%)","2-3"]
    ], note: "Class สูงขึ้นสัมพันธ์กับ graft loss มากขึ้น" },
    { title: "Recurrence after kidney transplantation", head: ["โรคเดิม","Recurrence","เวลา","Biopsy ที่เห็นก่อน"], rows: [
      ["Primary FSGS","สูง (ราว 30-50% ใน graft แรก, สูงกว่านี้มากถ้าเคยเสีย graft จาก recurrence)","เกิดได้ตั้งแต่ชั่วโมงแรกถึงหลายเดือน ส่วนใหญ่เกิดเร็ว (TANGO: median 1.5 เดือน, IQR 0-11 เดือน)","EM diffuse foot process effacement โดย LM ยังปกติ"],
      ["aHUS (complement variant)","สูงมากถ้าไม่ได้ C5 inhibitor ใน CFH, CFB, C3 variant แต่ต่ำใน MCP variant เดี่ยว","สัปดาห์ถึงเดือนแรก","Acute TMA"],
      ["C3G (DDD, C3GN)","สูง","เดือนถึงปี","C3 dominant IF"],
      ["MN (PLA2R)","ปานกลาง","ปีแรก","Granular IgG4, PLA2R"],
      ["IgAN","Histologic บ่อย clinical น้อยกว่า","หลายปี","Mesangial IgA"],
      ["LN, ANCA GN, anti-GBM","ต่ำ","แปรผัน","ตามโรคเดิม"],
      ["Genetic FSGS, Alport","แทบไม่ recur (Alport เกิด post-KT anti-GBM nephritis ได้ราว 3-5%)","Anti-GBM มักเกิดในปีแรก","Linear IgG ร่วม crescentic GN (linear IgG อย่างเดียวไม่ใช่โรค)"]
    ]}
  ]
};
