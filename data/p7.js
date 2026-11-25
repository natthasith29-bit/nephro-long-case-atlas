/* Phase 7 Imaging (Nov 2026): how to read nephrology imaging plus finding-based approach trees.
   Same node schema as data/p1.js. */

TREES.imgread = {
  must: [
    "คำถามทางคลินิกที่ภาพต้องตอบ (CKD หรือ AKI, obstruction, mass, vascular, ก่อน biopsy)",
    "Modality และ phase ที่ทำ (non-contrast, corticomedullary, nephrographic, excretory)",
    "eGFR, AKI, dialysis status และ allergy ก่อนให้ iodinated contrast หรือ gadolinium",
    "ภาพเก่าเพื่อเทียบขนาดไต cyst และ calcification",
    "Solitary kidney, transplant, ประวัติผ่าตัดหรือฉายแสง",
    "ส่วนสูงและ body habitus เพราะความยาวไตขึ้นกับขนาดตัว"
  ],
  tree: N("How to read nephrology imaging", "root", {
    s: "อ่านด้วยลำดับเดียวกันทุกครั้ง: ขนาดและรูปร่าง, parenchyma (echogenicity, cortical thickness, corticomedullary differentiation), collecting system, focal lesion, vessel, bladder และอวัยวะรอบข้าง แล้วตอบคำถามทางคลินิกที่ส่งตรวจ",
    why: "ใน long case examiner มักยื่นผล imaging แล้วถามว่าเป็น acute หรือ chronic, obstruct หรือไม่, biopsy ได้หรือไม่ การอ่านเป็นระบบป้องกันการพลาด finding ที่เปลี่ยนการวินิจฉัย",
    keys: ["Ultrasound เป็น first-line ทุก AKI และ CKD ที่ไม่ทราบสาเหตุ", "Non-contrast CT สำหรับนิ่ว", "Contrast CT หรือ MRI สำหรับ mass และ complex cyst", "Doppler สำหรับ vascular", "Nuclear medicine สำหรับ split function, scar และ obstruction"],
    ix: ["เลือก modality ตามคำถาม", "ทบทวน eGFR ก่อน contrast"],
    std: "ACR Appropriateness Criteria (renal failure, hematuria, renovascular hypertension), ACR-NKF consensus on iodinated contrast in kidney disease 2020, ACR-NKF consensus on gadolinium in kidney disease 2021"
  }, [
    N("Kidney ultrasound: systematic read", "step", {
      s: "Length, cortex, echogenicity, corticomedullary differentiation, collecting system, lesion, bladder",
      why: "ทำได้ข้างเตียง ไม่มี contrast และตอบได้ทันทีว่าเป็น chronic หรือมี obstruction",
      keys: ["วัดทั้งสองข้างตามแนวยาวที่สุด", "เทียบ echogenicity ของ cortex กับตับ (ขวา) และม้าม (ซ้าย)", "ดู bladder และ PVR ทุกครั้งที่ AKI"],
      ix: ["ความยาวไตผู้ใหญ่ปกติราว 10-12 cm", "ต่างกัน > 1.5 cm ถือว่า asymmetric", "PVR > 200 mL มีนัยสำคัญ"]
    }, [
      N("Kidney length and symmetry", "nephro", {
        s: "เล็กสองข้างชี้ chronic disease, ใหญ่สองข้างชี้ infiltrative, cystic หรือ acute process, ไม่สมมาตรชี้ unilateral disease",
        why: "ความยาวไตขึ้นกับส่วนสูง ไตยาวราว 9-10 cm อาจปกติในคนตัวเล็ก แต่ไตที่ปกติหรือใหญ่ไม่ตัด CKD ออก (DKD, amyloid, ADPKD, HIVAN)",
        keys: ["Bilateral small: CKD ระยะยาว, bilateral RAS", "Bilateral large: ADPKD, DKD ระยะแรก, amyloid, HIVAN, lymphoma, acute GN, RVT", "Asymmetric: unilateral RAS, reflux nephropathy, hypoplasia, unilateral obstruction หรือ RVT"],
        ix: ["ไตเล็กสองข้าง (< 9 cm ในคนขนาดตัวปกติ) ร่วม cortex บางและ echogenic เป็น relative contraindication ของ biopsy เพราะได้ข้อมูลน้อยและเสี่ยงเลือดออกมากกว่า ไม่ใช่ข้อห้ามเด็ดขาด ตัดสินจากคำถามทางคลินิก"],
        link: "kidneysize"
      }),
      N("Cortical thickness and parenchymal echogenicity", "nephro", {
        s: "Cortex ปกติ hypoechoic หรือ isoechoic กับตับ ถ้าสว่างกว่าตับถือว่า echogenicity เพิ่ม",
        why: "Echogenicity สะท้อน interstitial fibrosis และ glomerulosclerosis จึงบอกได้ว่ามี medical renal disease แต่ไม่บอกสาเหตุ cortical thinning สัมพันธ์กับ chronicity ดีกว่าความยาวในคนตัวใหญ่",
        keys: ["Grade 1 เท่าตับ (พบในไตปกติได้), grade 2 สว่างกว่าตับ, grade 3 เท่า renal sinus", "Fatty liver ทำให้เทียบผิด ให้เทียบกับม้ามแทน"],
        ix: ["อ่านร่วมกับ sediment, UPCR และ eGFR"],
        link: "img-echo"
      }),
      N("Corticomedullary differentiation", "nephro", {
        s: "Medulla (pyramid) ปกติ hypoechoic กว่า cortex, การแยกไม่ออกส่วนใหญ่พบใน chronic parenchymal disease แต่ไม่จำเพาะ",
        why: "Medulla ที่สว่างกว่า cortex ส่วนใหญ่คือ medullary nephrocalcinosis และพบได้ใน medullary sponge kidney, gout หรือ papillary necrosis ส่วน pyramid ที่เด่นในเด็กเล็กเป็นภาวะปกติ",
        keys: ["Loss of differentiation: ส่วนใหญ่ CKD แต่พบใน acute parenchymal disease ได้", "Medulla สว่าง: นึกถึง nephrocalcinosis ก่อน", "Pyramid เด่นในเด็กหรือภาวะ volume ลด: ปกติ"],
        link: "img-calc"
      }),
      N("Collecting system", "nephro", {
        s: "Grade hydronephrosis, หาระดับของการอุดตัน, ดู ureteric jet และ bladder",
        why: "Hydronephrosis ไม่เท่ากับ obstruction (pregnancy, VUR, extrarenal pelvis, parapelvic cyst) และ obstruction ระยะแรกหรือ RPF อาจไม่มี hydronephrosis",
        keys: ["SFU grade 0-4", "Parapelvic cyst แยกจาก hydronephrosis ด้วยการที่ cyst ไม่เชื่อมกัน", "Bladder เต็มทำให้ pelvis ขยายได้ ให้ scan ซ้ำหลังปัสสาวะ"],
        link: "hydro"
      }),
      N("Focal lesion: cyst, solid mass, stone", "nephro", {
        s: "Simple cyst: anechoic, ผนังบาง, posterior acoustic enhancement, Complex cyst หรือ solid lesion ต้องทำ contrast CT หรือ MRI",
        why: "Ultrasound แยก simple cyst ได้ดี แต่ประเมิน enhancement ไม่ได้ hyperechoic lesion เล็กอาจเป็น AML หรือ RCC จึงต้องยืนยัน fat ด้วย CT",
        keys: ["Stone: echogenic focus กับ acoustic shadow และ twinkling artifact", "AML: hyperechoic ต้องยืนยัน fat", "หลาย cyst: Pei criteria (ตามอายุ) ใช้วินิจฉัย ADPKD ในผู้ที่มี family history เท่านั้น ถ้าไม่มี family history ใช้จำนวน cyst ขนาดไต และ genetic testing"],
        link: "cysts"
      }),
      N("Bladder and post-void residual", "nephro", {
        s: "Bladder wall หนา trabeculation diverticulum ชี้ outlet obstruction หรือ neurogenic bladder",
        why: "Postrenal AKI จาก bladder outlet แก้ได้ทันทีด้วย Foley catheter",
        ix: ["PVR > 200 mL", "Ureteric jet ที่ไม่เห็นข้างเดียว (สังเกตนานพอและผู้ป่วยได้น้ำเพียงพอ) สนับสนุน obstruction ข้างนั้น ส่วน jet ที่ยังเห็นไม่ตัด partial obstruction"],
        link: "luts"
      })
    ]),
    N("Renal Doppler", "step", {
      s: "Resistive index, renal artery velocity, intrarenal waveform, venous flow",
      why: "ประเมิน renovascular disease, thrombosis และ graft perfusion ได้โดยไม่มี contrast แต่ขึ้นกับผู้ตรวจมาก",
      keys: ["RI = (PSV − EDV) / PSV", "Main renal artery และ intrarenal segmental artery", "Venous flow ทุกครั้งที่สงสัย RVT"],
      ix: ["RI ปกติ < 0.7", "RAS: PSV > 180-200 cm/s, renal-aortic ratio > 3.5", "Tardus-parvus: acceleration time > 70 ms"]
    }, [
      N("Resistive index", "nephro", {
        s: "RI สูงสะท้อนทั้ง intrarenal resistance และ systemic arterial stiffness จึงไม่จำเพาะต่อโรคไต",
        why: "RI สูงขึ้นตามอายุ, HR ช้า, arterial stiffness และ intra-abdominal pressure จึงต้องแปลผลร่วมกับ clinical",
        keys: ["RI ≥ 0.80 ทำนายผลไม่ดีหลัง revascularization ใน RAS", "RI ใน graft สะท้อน recipient มากกว่า graft"],
        std: "Radermacher (NEJM 2001, n = 138): RI ≥ 0.80 ทำนาย kidney function ไม่ดีขึ้นหลัง revascularization",
        link: "img-doppler"
      }),
      N("Renal artery stenosis criteria", "nephro", {
        s: "Direct sign ที่ stenosis (PSV สูง, turbulence) และ indirect sign ใน intrarenal artery (tardus-parvus)",
        why: "Atherosclerotic RAS อยู่ที่ ostium ส่วน FMD อยู่ช่วงกลางถึงปลาย ทำให้ direct sign ตรวจยากใน FMD",
        ix: ["PSV > 180-200 cm/s", "Renal-aortic ratio > 3.5 ชี้ stenosis ≥ 60%", "Acceleration time > 70 ms"],
        link: "img-doppler"
      }),
      N("Venous flow and thrombosis", "nephro", {
        s: "ไม่มี venous flow ร่วมกับ reversed diastolic arterial flow ชี้ renal vein thrombosis ใน graft, reversed diastolic flow อย่างเดียวพบได้ใน severe rejection, ATN รุนแรง หรือ graft ถูกกด",
        why: "ใน native kidney Doppler ไวน้อยเพราะมี collateral ผล Doppler ปกติจึงไม่ตัด RVT ต้องใช้ CT หรือ MR venography, RVT ใน native kidney สัมพันธ์กับ nephrotic syndrome โดยเฉพาะ MN ส่วนใน graft เป็นภาวะฉุกเฉินในสัปดาห์แรก",
        link: "img-doppler"
      })
    ]),
    N("CT", "step", {
      s: "เลือก phase ตามคำถาม: non-contrast สำหรับนิ่วและ calcification, contrast phases สำหรับ mass และ urothelium",
      why: "Phase ที่ผิดทำให้ตอบคำถามไม่ได้ เช่น mass ที่ไม่มี non-contrast phase จะวัด enhancement ไม่ได้",
      keys: ["Non-contrast", "Corticomedullary ราว 25-40 วินาที", "Nephrographic ราว 80-120 วินาที", "Excretory ราว 5-15 นาที"],
      ix: ["Enhancement ≥ 20 HU = enhancing, 10-19 HU = equivocal", "Macroscopic fat (< −10 HU) ใน mass ที่ไม่มี calcification แทบวินิจฉัย AML ได้ แต่ไม่พบ fat ไม่ตัด AML (fat-poor AML)", "eGFR ก่อนให้ contrast"]
    }, [
      N("Non-contrast CT KUB", "nephro", {
        s: "Standard สำหรับ renal colic เห็นนิ่วเกือบทุกชนิด ยกเว้น pure indinavir stone และนิ่วจากยาบางชนิด (atazanavir มองไม่เห็นได้ในบางราย) ให้ดู secondary sign",
        why: "Stone attenuation ช่วยเดาชนิด uric acid stone มี HU ต่ำกว่า calcium stone ชัดเจน และ dual-energy CT แยกได้ ใช้วางแผน urine alkalinization",
        keys: ["Low-dose protocol", "Secondary sign: hydronephrosis, perinephric stranding"],
        std: "EAU Guidelines on Urolithiasis 2025",
        link: "stone"
      }),
      N("Contrast phases and renal mass", "nephro", {
        s: "Nephrographic phase ดีที่สุดสำหรับ mass, corticomedullary สำหรับ vessel, excretory สำหรับ urothelium (CT urography)",
        why: "Bosniak 2019 ใช้ enhancement, ผนัง และ septa แบ่ง cyst เป็น I ถึง IV ซึ่งกำหนดการ follow-up หรือผ่าตัด",
        keys: ["Bosniak I-II: benign ไม่ต้อง follow-up", "IIF: follow-up ด้วย imaging", "III (malignancy ราว 50%) และ IV (ราว 90%): พิจารณาผ่าตัดหรือ active surveillance ตามขนาดและ comorbidity"],
        std: "Bosniak classification version 2019 (Silverman, Radiology 2019)",
        link: "flank"
      }),
      N("Iodinated contrast and kidney function", "nephro", {
        s: "ให้ IV isotonic saline prophylaxis เมื่อ eGFR < 30 mL/min/1.73m² ที่ไม่ได้ maintenance dialysis หรือมี AKI (ถ้าไม่มี volume overload), eGFR 30-44 พิจารณาเป็นรายบุคคลเมื่อมี risk factor หลายอย่าง, risk ใกล้ศูนย์เมื่อ eGFR ≥ 45 และราว 0-2% ที่ eGFR 30-44",
        why: "Contrast-associated AKI ส่วนใหญ่ที่เห็นในอดีตเป็น AKI จากสาเหตุอื่น ไม่ควรเลื่อน CT ที่จำเป็นเพราะกลัว contrast, ผู้ป่วย dialysis ไม่ต้องทำ HD ฉุกเฉินหลังได้ contrast ถ้าไม่มี volume overload",
        keys: ["Metformin: eGFR ≥ 30 และไม่มี AKI ไม่ต้องหยุด, ถ้า eGFR < 30, มี AKI หรือฉีด intra-arterial ที่ contrast ถึงไตแบบ first-pass ให้งดตั้งแต่วันฉีดและอีก 48 ชั่วโมง แล้วเริ่มใหม่เมื่อ kidney function คงที่", "ผู้ป่วย PD และ HD ที่มี residual function ควรเลี่ยง contrast ที่ไม่จำเป็น"],
        std: "ACR-NKF consensus statement 2020 (Davenport, Radiology 2020), AMACING และ PRESERVE",
        link: "risingcr"
      })
    ]),
    N("MRI and gadolinium", "step", {
      s: "MRI สำหรับ complex cyst, mass ที่ CT ไม่ชัด, TKV ใน ADPKD, non-contrast MRA สำหรับ RAS",
      why: "Group II gadolinium agent มี NSF risk ต่ำมากแม้ใน eGFR < 30 และ dialysis จึงไม่ควรงด MRI ที่จำเป็น",
      keys: ["Group II: gadobutrol, gadoterate, gadoteridol, gadobenate", "Non-contrast MRA: time-of-flight หรือ balanced SSFP"],
      ix: ["eGFR และ dialysis status"]
    }, [
      N("Gadolinium in advanced CKD and dialysis", "nephro", {
        s: "ใช้ group II agent ขนาดต่ำสุดที่ได้ภาพ ไม่จำเป็นต้องได้ consent พิเศษเรื่อง NSF",
        why: "NSF เกือบทั้งหมดเกิดจาก group I agent ในผู้ป่วย eGFR < 30 หรือ AKI",
        std: "ACR-NKF consensus on gadolinium 2021 (Weinreb, Radiology 2021)",
        link: "skinthick"
      }),
      N("Total kidney volume in ADPKD", "nephro", {
        s: "Height-adjusted TKV ใช้จัด Mayo imaging class 1A ถึง 1E เพื่อทำนาย progression และเลือกผู้ป่วยรับ tolvaptan",
        why: "Class 1C-1E มี progression เร็ว ส่วน class 2 (atypical morphology เช่น cyst ข้างเดียวหรือเป็นกลุ่มเฉพาะที่) ใช้ HtTKV ทำนาย progression ไม่ได้",
        std: "KDIGO 2025 ADPKD guideline",
        link: "cysts"
      })
    ]),
    N("Nuclear medicine", "step", {
      s: "DMSA สำหรับ cortical scar และ split function, MAG3 สำหรับ obstruction และ graft, DTPA สำหรับ measured GFR",
      why: "ให้ข้อมูลการทำงานแยกข้าง ซึ่งเป็นคำถามที่ examiner ถามก่อน nephrectomy หรือ living donation",
      keys: ["Split function < 40% ข้างหนึ่งถือว่าลดลงชัดเจน"],
      ix: ["MAG3 diuretic T½ > 20 นาที ชี้ obstruction, < 10 นาที ไม่ obstruct, 10-20 นาที equivocal, แปลผลไม่ได้ถ้า function ข้างนั้นต่ำมากหรือผู้ป่วยขาดน้ำ"]
    }, [
      N("DMSA scan", "nephro", {
        s: "Cortical defect จาก acute pyelonephritis หรือ scar, split function",
        why: "ต้องรอราว 6 เดือนหลังติดเชื้อจึงจะบอกได้ว่าเป็น scar ถาวร",
        link: "kidneysize"
      }),
      N("MAG3 diuretic renogram", "nephro", {
        s: "แยก obstructive จาก non-obstructive dilatation และดู split function, ใช้ใน graft ดู perfusion และ urine leak",
        why: "Function ข้างที่ต่ำมากทำให้ washout ช้าเองจนแปลผลเป็น obstruction ผิดได้",
        std: "SNMMI/EANM consensus on diuretic renography",
        link: "hydro"
      })
    ]),
    N("Plain radiograph", "step", {
      s: "KUB, lateral abdomen, hand, chest",
      why: "ราคาถูก ใช้ติดตาม stone, nephrocalcinosis, catheter และ vascular calcification",
      keys: ["Radio-opaque stone และ nephrocalcinosis", "PD catheter tip ควรอยู่ใน true pelvis", "HD catheter tip: non-tunneled ที่ lower SVC ถึง cavoatrial junction, tunneled cuffed ที่ mid right atrium"]
    }, [
      N("Bone and vascular calcification films", "nephro", {
        s: "Hand X-ray สำหรับ subperiosteal resorption และ vascular calcification, lateral abdominal X-ray สำหรับ aortic calcification",
        link: "img-bone"
      }),
      N("Chest X-ray in nephrology", "nephro", {
        s: "Cardiomegaly, effusion, pulmonary edema, catheter position, right-sided effusion ใน PD (hydrothorax)",
        why: "Pericardial effusion ปริมาณมากใน uremia ทำให้เงาหัวใจโตแบบ water-bottle ส่วน effusion น้อยถึงปานกลาง CXR ปกติได้ ต้องใช้ echocardiography",
        link: "dyspnea"
      }),
      N("Catheter and access imaging", "nephro", {
        s: "PD catheter migration, HD catheter tip, central vein stenosis",
        link: "img-access"
      })
    ])
  ])
};

TREES["img-echo"] = {
  must: [
    "ขนาดไตทั้งสองข้างและ cortical thickness",
    "ภาพเก่าเพื่อดูว่าเปลี่ยนเร็วหรือช้า",
    "Proteinuria, hematuria, sediment",
    "HIV, DM, monoclonal gammopathy, lithium",
    "ประวัติครอบครัวโรคไต, อายุเริ่มมีอาการ (เด็กหรือผู้ใหญ่)",
    "ยาและ toxin, ประวัติ UTI ในวัยเด็ก"
  ],
  tree: N("Increased renal echogenicity", "root", {
    s: "Echogenicity ที่เพิ่มขึ้นบอกว่ามี medical renal disease แต่ไม่บอกสาเหตุ แยกต่อด้วยขนาดไต (เล็ก กับ ปกติหรือใหญ่), pattern (cortex, medulla) และ lesion ร่วม เช่น microcyst หรือ calcification",
    why: "เป็นผล ultrasound ที่พบบ่อยที่สุดใน CKD ถ้าแปลว่า chronic ทุกครั้งจะพลาด acute หรือ infiltrative disease ที่รักษาได้ เช่น RPGN, AIN, lymphoma, HIVAN",
    keys: ["เล็กและ echogenic: chronic, biopsy ได้ประโยชน์น้อย", "ใหญ่หรือปกติและ echogenic: acute หรือ infiltrative ต้องหาสาเหตุ", "Medulla สว่าง: nephrocalcinosis", "Microcyst: lithium, ADTKD, ACKD"],
    ix: ["UA with microscopy, UPCR, eGFR trend", "HIV, HbA1c, SPEP, sFLC", "Kidney biopsy ถ้าขนาดไตปกติและสาเหตุไม่ชัด"],
    std: "KDIGO 2024 CKD guideline"
  }, [
    N("Normal-sized or large echogenic kidneys", "step", {
      s: "Acute, infiltrative หรือ early diabetic disease",
      why: "ขนาดไตที่ยังไม่เล็กบอกว่ายังมีโอกาสฟื้นหรือรักษาได้ และ biopsy ได้ประโยชน์",
      keys: ["AKI หรือ eGFR ลดเร็ว", "Nephrotic range proteinuria", "Systemic disease"],
      ix: ["Active sediment, RBC cast: ชี้ GN", "WBC cast, eosinophilia: ชี้ AIN (ไม่พบก็ไม่ตัด)", "HIV บวกกับ heavy proteinuria: นึกถึง HIVAN แต่ต้องแยก HIVICK, DKD และยา ด้วย biopsy", "M-protein หรือ FLC ratio ผิดปกติ: นึกถึง amyloid หรือ MIDD ยืนยันด้วย biopsy เพราะอาจเป็นเพียง MGUS", "LDH สูง ไตโตมาก: นึกถึง lymphoma infiltration"]
    }, [
      N("Acute GN and RPGN", "nephro", {
        s: "ไตขนาดปกติหรือโตเล็กน้อย echogenic กับ active sediment",
        link: "rpgn"
      }),
      N("Acute interstitial nephritis and ATN", "nephro", {
        s: "AIN ทำไตบวมและ echogenic, ATN มักปกติหรือบวมเล็กน้อย",
        link: "risingcr"
      }),
      N("HIV-associated nephropathy", "nephro", {
        s: "ไตใหญ่และ echogenic มากแม้ eGFR ต่ำ ร่วมกับ nephrotic proteinuria",
        why: "Collapsing FSGS กับ microcystic tubular dilatation ทำให้ไตไม่เล็กลง",
        link: "viral"
      }),
      N("Amyloidosis and MIDD", "nephro", {
        s: "ไตปกติหรือใหญ่แม้ CKD ระยะท้าย, nephrotic proteinuria",
        link: "mspike"
      }),
      N("Diabetic kidney disease", "nephro", {
        s: "ไตปกติหรือใหญ่ในระยะแรก ไตเล็กลงช้ากว่าโรคอื่นเมื่อ eGFR ลด",
        link: "proteinuria"
      }),
      N("Lymphoma and leukemia infiltration", "nephro", {
        s: "ไตโตสองข้าง echogenic หรือ hypoechoic mass หลายก้อน",
        link: "onco"
      }),
      N("ARPKD and early ADPKD in children", "nephro", {
        s: "ไตใหญ่ echogenic มากในทารกหรือเด็ก, cyst เล็กจนเห็นเป็น echogenic",
        link: "cysts"
      })
    ]),
    N("Small echogenic kidneys", "step", {
      s: "Chronic disease ระยะยาว",
      why: "Fibrosis ทำให้ไตเล็กและสว่าง การหาสาเหตุเฉพาะมักทำไม่ได้และ biopsy ได้ประโยชน์น้อย",
      keys: ["ไต < 9 cm", "Cortex บาง", "Corticomedullary differentiation หาย"],
      ix: ["Asymmetry > 1.5 cm: นึกถึง unilateral RAS, reflux nephropathy, unilateral obstruction เรื้อรัง หรือ hypoplasia", "Cortical scar ที่ขั้วไต = reflux nephropathy", "Medullary cyst ในไตขนาดปกติหรือเล็ก = ADTKD หรือ nephronophthisis"]
    }, [
      N("CKD from any cause", "nephro", {
        s: "Chronic GN, hypertensive nephrosclerosis, chronic TIN",
        link: "risingcr"
      }),
      N("Bilateral renovascular disease", "nephro", {
        s: "ไตเล็กไม่เท่ากัน, flash pulmonary edema, Cr ขึ้นหลัง RAASi",
        link: "img-doppler"
      }),
      N("Reflux nephropathy", "nephro", {
        s: "Focal cortical scar ที่ขั้วไต, ไม่สมมาตร",
        link: "kidneysize"
      }),
      N("ADTKD and nephronophthisis", "nephro", {
        s: "ไตขนาดปกติหรือเล็ก, cyst เล็กที่ corticomedullary junction, bland sediment",
        link: "cysts"
      })
    ]),
    N("Echogenicity with a specific pattern", "step", {
      s: "Pattern ที่ช่วยบอกสาเหตุ",
      why: "Medullary echogenicity, microcyst หรือ cortical rim มีสาเหตุจำกัดกว่า diffuse echogenicity",
      keys: ["Medulla สว่างกว่า cortex", "Punctate microcyst", "Cortical rim สว่าง"],
      ix: ["Urine Ca, citrate, oxalate, pH, PTH = nephrocalcinosis", "Lithium level และระยะเวลาที่ใช้", "Ca และ PO4 สำหรับ cortical calcification"]
    }, [
      N("Medullary nephrocalcinosis", "nephro", {
        s: "Pyramid สว่างกว่า cortex มี shadow หรือไม่ก็ได้",
        link: "img-calc"
      }),
      N("Lithium nephropathy", "nephro", {
        s: "Microcyst จำนวนมากขนาด 1-2 mm ทั่วไตร่วมกับ nephrogenic DI",
        link: "polyuria"
      }),
      N("Acquired cystic kidney disease", "nephro", {
        s: "ไตเล็กกับ multiple cysts ใน CKD ระยะท้ายและ dialysis ระยะยาว, เสี่ยง RCC",
        link: "cysts"
      }),
      N("Cortical necrosis", "nephro", {
        s: "Hypoechoic cortical rim ระยะแรก ตามด้วย cortical calcification",
        link: "img-calc"
      })
    ])
  ])
};

TREES["img-calc"] = {
  must: [
    "Ca, PO4, PTH, 25(OH)D, 1,25(OH)2D",
    "Urine Ca, citrate, oxalate, pH, volume",
    "HCO3, K, Mg ในเลือด",
    "ยา: vitamin D, calcium, acetazolamide, topiramate, loop diuretic, phosphate, ยาระบาย",
    "Bowel resection, bariatric surgery",
    "ประวัติครอบครัว, นิ่วตั้งแต่เด็ก",
    "อาการ sicca, sarcoidosis"
  ],
  tree: N("Nephrocalcinosis and renal calcification", "root", {
    s: "แยกตำแหน่งก่อน: medullary nephrocalcinosis, cortical nephrocalcinosis, นิ่วใน collecting system หรือ vascular calcification แล้วใช้ blood และ urine chemistry หาสาเหตุ",
    why: "Medullary nephrocalcinosis ส่วนใหญ่เกิดจาก hypercalciuria, hypocitraturia, hyperoxaluria หรือ distal RTA ที่รักษาได้ ส่วน cortical nephrocalcinosis มักเป็นผลจาก cortical necrosis หรือ chronic disease",
    keys: ["Medullary พบบ่อยกว่า cortical มาก", "Medullary sponge kidney ให้ภาพ calcification ใน ectatic duct", "Vascular calcification เป็นเส้นคู่ตามแนวหลอดเลือด"],
    ix: ["Serum Ca, PO4, PTH, 1,25(OH)2D, HCO3, K, Mg", "24-hour urine Ca, citrate, oxalate, uric acid, pH, volume", "Urine pH ขณะ acidosis (> 5.5 ชี้ distal RTA)", "Genetic testing ในเด็กหรือครอบครัว"],
    std: "EAU Guidelines on Urolithiasis 2025"
  }, [
    N("Medullary: hypercalcemia or hypercalciuria", "step", {
      s: "Ca ในเลือดหรือในปัสสาวะสูง",
      why: "Ca ที่ถูกขับมากตกตะกอนใน interstitium ของ medulla",
      keys: ["PTH บอกทิศทาง"],
      ix: ["Ca สูงกับ PTH สูงหรือปกติผิดสัดส่วน = primary HPT (แยก FHH ซึ่ง urine Ca ต่ำ, Ca/Cr clearance ratio < 0.01)", "Ca สูงกับ PTH ต่ำและ 1,25(OH)2D สูง = sarcoid, granulomatous disease", "Ca ปกติกับ urine Ca สูง และ Mg ต่ำ = FHHNC", "Ca ต่ำกับ PTH ต่ำ และ urine Ca สูง = autosomal dominant hypocalcemia (CASR gain-of-function)", "LMW proteinuria มาก = Dent disease", "K ต่ำ alkalosis urine Ca สูง = Bartter"]
    }, [
      N("Primary hyperparathyroidism", "nephro", {
        s: "Hypercalcemia กับ PTH สูงหรือปกติผิดสัดส่วน",
        link: "hyperca"
      }),
      N("Sarcoidosis and vitamin D excess", "nephro", {
        s: "1,25(OH)2D สูงจาก granuloma หรือได้ vitamin D และ calcium เกิน",
        link: "hyperca"
      }),
      N("Idiopathic hypercalciuria", "nephro", {
        s: "Ca ในเลือดปกติ urine Ca สูง ร่วมกับนิ่ว",
        link: "stone"
      }),
      N("Genetic tubulopathy with hypercalciuria", "nephro", {
        s: "Bartter, FHHNC, Dent disease, autosomal dominant hypocalcemia (CASR gain-of-function)",
        link: "tubulopathy"
      })
    ]),
    N("Medullary: acidosis or hypocitraturia", "step", {
      s: "Distal RTA และภาวะที่ citrate ต่ำ",
      why: "Acidosis เพิ่ม Ca release จากกระดูกและลด citrate ส่วน urine pH ที่สูงทำให้ calcium phosphate ตกตะกอน",
      keys: ["Calcium phosphate stone"],
      ix: ["NAGMA, K ต่ำ, urine pH > 5.5, urine anion gap บวก = distal RTA", "Anti-Ro บวก: หา Sjogren เป็นสาเหตุของ distal RTA (anti-Ro ลบไม่ตัด)", "Urine citrate ต่ำ"]
    }, [
      N("Distal RTA", "nephro", {
        s: "Primary (genetic) หรือ secondary (Sjogren, SLE, amphotericin B, toluene, ifosfamide)",
        link: "nagma"
      }),
      N("Medullary sponge kidney", "nephro", {
        s: "Ectatic collecting duct กับ calcification ใน pyramid, paintbrush pattern ใน excretory phase",
        why: "ภาพคล้าย nephrocalcinosis แต่ calcification อยู่ใน duct ที่ขยาย มักมี hypocitraturia และ hypercalciuria ร่วม",
        link: "stone"
      })
    ]),
    N("Medullary or diffuse: oxalate and phosphate", "step", {
      s: "Hyperoxaluria และ phosphate load",
      why: "Oxalate ทำได้ทั้ง medullary และ cortical เมื่อ GFR ลด ส่วน phosphate load เฉียบพลันทำ acute phosphate nephropathy",
      keys: ["Bowel resection", "Phosphate enema"],
      ix: ["Urine oxalate > 0.7 mmol/1.73 m²/วัน โดยไม่มี enteric cause: สงสัย primary hyperoxaluria ยืนยันด้วย genetic testing (enteric hyperoxaluria ก็สูงถึงระดับนี้ได้)", "Steatorrhea, bowel surgery: enteric hyperoxaluria", "ประวัติได้ oral sodium phosphate ก่อน Cr ขึ้นหลายวันถึงหลายสัปดาห์: acute phosphate nephropathy (serum PO4 และ Ca มักกลับปกติแล้วตอนตรวจ วินิจฉัยด้วย biopsy)"]
    }, [
      N("Primary hyperoxaluria", "nephro", {
        s: "Nephrocalcinosis และนิ่วตั้งแต่เด็ก, ESKD อายุน้อย",
        link: "stone"
      }),
      N("Enteric hyperoxaluria", "nephro", {
        s: "Bariatric surgery, short bowel, pancreatic insufficiency, orlistat",
        link: "stone"
      }),
      N("Acute phosphate nephropathy and treated hypophosphatemia", "nephro", {
        s: "Oral sodium phosphate bowel prep, phosphate และ calcitriol ใน XLH",
        link: "phos"
      })
    ]),
    N("Cortical nephrocalcinosis", "step", {
      s: "Calcification ที่ cortex เป็นแถบหรือ tramline",
      why: "เป็นผลของ cortical injury ที่รุนแรงมากกว่าความผิดปกติของ mineral metabolism",
      keys: ["Bilateral", "ประวัติ AKI รุนแรง"],
      ix: ["ประวัติ obstetric hemorrhage, sepsis, snakebite = cortical necrosis", "Plasma oxalate สูงได้ใน ESKD ทุกสาเหตุ ค่าที่สูงมากร่วมกับ nephrocalcinosis หรือนิ่วตั้งแต่อายุน้อย: สงสัย systemic oxalosis จาก primary hyperoxaluria ยืนยันด้วย genetic testing", "HIV กับ opportunistic infection"]
    }, [
      N("Bilateral renal cortical necrosis", "nephro", {
        s: "Calcification ของ cortex ตามหลัง cortical necrosis ภายในหลายสัปดาห์ถึงเดือน",
        link: "oliguria"
      }),
      N("Chronic GN, chronic rejection and oxalosis", "nephro", {
        s: "Cortical calcification ใน chronic disease หรือ systemic oxalosis",
        link: "risingcr"
      }),
      N("HIV-associated infection", "adj", {
        s: "Pneumocystis, MAC, CMV ทำ punctate cortical calcification",
        link: "viral"
      })
    ]),
    N("Mimics of nephrocalcinosis", "step", {
      s: "Calcification ที่ไม่ใช่ nephrocalcinosis",
      why: "การรักษาต่างกันมาก",
      keys: ["ตำแหน่งและรูปร่าง"],
      ix: ["Sterile pyuria, urine AFB = TB", "CT ดู calcified mass หรือ cyst wall"]
    }, [
      N("Papillary necrosis with calcified papillae", "nephro", {
        s: "Calcified papilla, DM, analgesic, sickle cell",
        link: "hydro"
      }),
      N("Renal tuberculosis", "nephro", {
        s: "Putty kidney, autonephrectomy, calcification เป็นก้อน",
        link: "pyuria"
      }),
      N("Vascular and cyst wall calcification", "adj", {
        s: "Arterial calcification เป็นเส้นคู่, calcified cyst หรือ RCC",
        link: "flank"
      })
    ])
  ])
};

TREES["img-doppler"] = {
  must: [
    "BP, resistant HTN, flash pulmonary edema, Cr ขึ้นหลังเริ่ม RAASi",
    "Abdominal bruit, PAD, smoking",
    "หญิงอายุน้อยที่ HTN (FMD)",
    "Nephrotic syndrome, hypercoagulable state (RVT)",
    "AF, endocarditis, flank pain กับ LDH สูง (infarction)",
    "Biopsy หรือ procedure ล่าสุด",
    "Transplant: วันหลังผ่าตัด, Cr trend, tacrolimus level"
  ],
  tree: N("Abnormal renal Doppler", "root", {
    s: "แยก 5 pattern: RI สูง, tardus-parvus หรือ RI ต่ำ, PSV สูงเฉพาะจุด, venous flow ผิดปกติ และ arterial flow หาย แล้วอ่านร่วมกับ clinical",
    why: "Doppler บอกได้ทั้ง vascular cause ของ AKI และ HTN แต่ RI สูงเพียงอย่างเดียวไม่จำเพาะ examiner มักถามว่า RI บอกอะไรได้และบอกอะไรไม่ได้",
    keys: ["RI ปกติ < 0.7", "Main renal artery PSV > 180-200 cm/s ชี้ RAS", "Renal-aortic ratio > 3.5", "Acceleration time > 70 ms = tardus-parvus"],
    ix: ["Duplex ultrasound เป็น first-line", "CTA หรือ MRA เมื่อ ultrasound ไม่ชัด", "Catheter angiography เมื่อจะ intervene"],
    std: "ACR Appropriateness Criteria renovascular hypertension, ESC 2024 peripheral arterial and aortic diseases guideline"
  }, [
    N("High resistive index", "step", {
      s: "RI ≥ 0.7 ทั้งสองข้างหรือข้างเดียว",
      why: "RI สะท้อน downstream resistance และ arterial compliance จึงสูงทั้งจากโรคไตและปัจจัยนอกไต",
      keys: ["ทั้งสองข้าง: intrarenal disease หรือ systemic factor", "ข้างเดียว: obstruction หรือ compression ข้างนั้น"],
      ix: ["RI สูงข้างที่มี hydronephrosis: สนับสนุน obstruction (hydronephrosis อย่างเดียวไม่เท่ากับ obstruction)", "Perinephric หรือ subcapsular collection: Page kidney", "HR ช้า, อายุมาก, arterial stiffness = systemic factor", "Bladder pressure สูง = intra-abdominal hypertension"]
    }, [
      N("Intrarenal parenchymal disease", "nephro", {
        s: "ATN, AIN, GN, vasculitis, chronic parenchymal disease",
        link: "risingcr"
      }),
      N("Extrarenal factors", "adj", {
        s: "Bradycardia, aortic stiffness, อายุ, intra-abdominal hypertension",
        why: "ทำให้ RI สูงโดยไตไม่ได้ผิดปกติ จึงต้องเทียบสองข้างเสมอ"
      }),
      N("Page kidney", "nephro", {
        s: "Subcapsular หรือ perinephric hematoma กดไตทำ HTN และ RI สูงข้างนั้น",
        link: "htn-young"
      })
    ]),
    N("Tardus-parvus or low RI", "step", {
      s: "Intrarenal waveform ขึ้นช้าและ peak ต่ำ",
      why: "เป็น indirect sign ของ stenosis ที่อยู่ proximal กว่าจุดตรวจ",
      keys: ["ข้างเดียว: RAS ข้างนั้น", "สองข้าง: bilateral RAS, aortic coarctation หรือ severe AS"],
      ix: ["RI ต่างกันสองข้าง > 0.05 สนับสนุน unilateral RAS", "Echocardiography สำหรับ AS"]
    }, [
      N("Atherosclerotic renal artery stenosis", "nephro", {
        s: "Ostial lesion, ผู้สูงอายุที่มี atherosclerosis",
        link: "htn-young"
      }),
      N("Aortic stenosis and coarctation", "adj", {
        s: "Tardus-parvus สองข้างโดยไม่มี RAS",
        link: "htn-young"
      })
    ]),
    N("Focal high peak systolic velocity", "step", {
      s: "PSV สูงและ aliasing ที่จุดเดียว",
      why: "เป็น direct sign ของ stenosis หรือ AV fistula",
      keys: ["Ostium: atherosclerosis", "Mid-distal: FMD", "หลัง biopsy: AV fistula"],
      ix: ["PSV > 180-200 cm/s และ RAR > 3.5", "String of beads บน CTA = FMD", "Arterialized venous flow กับ RI ต่ำ = AV fistula"]
    }, [
      N("Fibromuscular dysplasia", "nephro", {
        s: "หญิงอายุน้อยที่ HTN, mid-distal lesion, string of beads",
        why: "ตอบสนองดีต่อ angioplasty โดยไม่ต้อง stent และต้อง screen หลอดเลือดสมองและ carotid",
        link: "htn-young"
      }),
      N("Post-biopsy AV fistula and pseudoaneurysm", "nephro", {
        s: "Hematuria หรือ HTN หลัง biopsy, high-velocity turbulent flow",
        why: "ส่วนใหญ่ปิดเอง ถ้ามีเลือดออกต่อหรือ high-output ให้ embolization",
        link: "hematuria"
      })
    ]),
    N("Abnormal venous flow", "step", {
      s: "Venous flow หาย, reversed diastolic arterial flow หรือ left renal vein compression",
      why: "RVT ทำไตบวม hematuria และ AKI ส่วน nutcracker ทำ hematuria และ varicocele",
      keys: ["Nephrotic syndrome", "Hematuria ข้างซ้าย"],
      ix: ["UPCR สูงมาก, albumin < 2.0-2.5 g/dL ใน MN = เสี่ยง RVT", "Left renal vein velocity ratio สูงที่ aortomesenteric angle = nutcracker", "CT venography ยืนยัน"]
    }, [
      N("Renal vein thrombosis", "nephro", {
        s: "Nephrotic syndrome (MN มากที่สุด), malignancy, hypercoagulable state",
        link: "nephrotic"
      }),
      N("Nutcracker syndrome", "nephro", {
        s: "Left renal vein ถูกกดระหว่าง aorta และ SMA ทำ hematuria, flank pain, varicocele, orthostatic proteinuria",
        link: "hematuria"
      })
    ]),
    N("Absent arterial flow", "step", {
      s: "ไม่มี flow ทั้งไตหรือบางส่วน",
      why: "Renal infarction หรือ arterial thrombosis ต้องรักษาเร็ว",
      keys: ["Flank pain, LDH สูงมาก, hematuria"],
      ix: ["LDH สูงมากโดย transaminase ปกติหรือขึ้นเพียงเล็กน้อย", "ECG, echocardiography หา source", "CT ยืนยัน wedge-shaped defect, cortical rim sign"]
    }, [
      N("Renal infarction", "nephro", {
        s: "AF, endocarditis, dissection, hypercoagulable state, FMD",
        link: "flank"
      }),
      N("Graft arterial or venous thrombosis", "nephro", {
        s: "Anuria หรือ urine output ลดเฉียบพลันในสัปดาห์แรกหลัง KT, arterial thrombosis: ไม่มี arterial flow ทั้ง graft, venous thrombosis: ไม่มี venous flow ร่วมกับ reversed diastolic arterial flow และ graft บวม",
        link: "img-graft"
      })
    ])
  ])
};

TREES["img-bone"] = {
  must: [
    "Dialysis vintage, PTH, ALP, Ca, PO4 trend",
    "Binder ที่ใช้ทั้งปัจจุบันและอดีต (aluminum)",
    "Steroid, parathyroidectomy, KT",
    "ปวดกระดูก, กระดูกหัก, ปวดไหล่, carpal tunnel",
    "Skin lesion ที่เจ็บ (calciphylaxis)",
    "ไข้กับปวดหลัง (spondylodiscitis)"
  ],
  tree: N("Bone and soft-tissue imaging in CKD", "root", {
    s: "แยก imaging finding เป็น 5 กลุ่ม: hyperparathyroid bone disease, osteomalacia หรือ low turnover, vascular และ soft-tissue calcification, dialysis-related amyloidosis และ infection หรือ osteonecrosis แล้วยืนยันด้วย biochemistry",
    why: "ภาพรังสีบอก pattern ได้แต่บอก turnover ไม่แม่น ต้องอ่านร่วมกับ PTH และ ALP และ bone biopsy ในรายที่การตัดสินใจรักษาขึ้นกับ turnover",
    keys: ["Subperiosteal resorption = high PTH", "Looser zone = osteomalacia", "Vascular calcification ทำนาย CV event", "Bone cyst ที่ carpal และ femoral head ใน dialysis นาน = β2M amyloid"],
    ix: ["PTH, ALP (bone-specific), Ca, PO4, 25(OH)D", "Serum aluminum ถ้าสงสัย", "DXA เมื่อผลจะเปลี่ยนการรักษา", "Bone biopsy with tetracycline labeling"],
    std: "KDIGO 2017 CKD-MBD guideline update"
  }, [
    N("Hyperparathyroid bone disease", "step", {
      s: "Osteitis fibrosa cystica",
      why: "PTH สูงเรื้อรังเพิ่ม osteoclast activity",
      keys: ["Subperiosteal resorption ที่ด้าน radial ของ middle phalanx นิ้วชี้และนิ้วกลาง", "Salt-and-pepper skull", "Brown tumor", "Rugger jersey spine"],
      ix: ["PTH สูงมาก, ALP สูง", "Sestamibi หรือ ultrasound ก่อน parathyroidectomy"]
    }, [
      N("Severe secondary or tertiary hyperparathyroidism", "nephro", {
        s: "Subperiosteal resorption, brown tumor, ปวดกระดูก, pruritus",
        link: "hd-mbd"
      })
    ]),
    N("Osteomalacia and low-turnover disease", "step", {
      s: "Mineralization defect หรือ turnover ต่ำ",
      why: "Fracture risk สูงแม้ PTH ไม่สูง",
      keys: ["Looser zone (pseudofracture)", "Fracture ที่ไม่สมเหตุ"],
      ix: ["PTH ต่ำ, bone-specific ALP ปกติหรือต่ำ: ชี้ adynamic bone disease (ยืนยัน turnover ได้ด้วย bone biopsy เท่านั้น)", "Serum Al สูง, DFO test บวก = aluminum", "PO4 ต่ำ, ALP สูง = hypophosphatemic osteomalacia หลัง KT หรือ Fanconi"]
    }, [
      N("Adynamic bone disease", "nephro", {
        s: "PTH ต่ำจาก calcium load, calcitriol เกิน, หลัง parathyroidectomy, PD",
        link: "bonepain"
      }),
      N("Aluminum bone disease", "nephro", {
        s: "Osteomalacia กับ microcytic anemia และ encephalopathy",
        link: "hd-water"
      }),
      N("Hypophosphatemic osteomalacia", "nephro", {
        s: "Fanconi syndrome, tenofovir, หลัง KT",
        link: "tubulopathy"
      })
    ]),
    N("Vascular and soft-tissue calcification", "step", {
      s: "Medial arterial calcification, tumoral calcinosis, calciphylaxis",
      why: "KDIGO 2017 ระบุว่า lateral abdominal X-ray ใช้ตรวจ vascular calcification และ echocardiography ใช้ตรวจ valvular calcification ได้ เป็นทางเลือกแทน CT (suggestion ระดับ 2C ไม่ใช่ให้ screen ทุกราย) ผู้ที่พบ calcification ถือว่า CV risk สูงสุด และใช้ประกอบการจำกัด calcium-based binder",
      keys: ["Kauppila score จาก lateral abdominal X-ray", "Adragao score จาก hand และ pelvis X-ray", "Pipe-stem calcification ของ medial layer"],
      ix: ["Ca x PO4, PTH, warfarin, calcium-based binder", "Skin biopsy สำหรับ calciphylaxis (ระวังแผลไม่หาย)"]
    }, [
      N("Medial arterial calcification", "nephro", {
        s: "Tram-track calcification ของหลอดเลือดแดงขนาดกลาง",
        link: "hd-mbd"
      }),
      N("Tumoral calcinosis", "nephro", {
        s: "ก้อน calcification รอบข้อใหญ่ใน PO4 สูงเรื้อรัง",
        link: "hd-mbd"
      }),
      N("Calciphylaxis", "nephro", {
        s: "Net-like calcification ของหลอดเลือดเล็กใต้ผิวหนัง ช่วยสนับสนุนแต่ไม่ใช่การวินิจฉัย",
        link: "skinulcer"
      })
    ]),
    N("Dialysis-related amyloidosis", "step", {
      s: "β2-microglobulin amyloid ใน dialysis ระยะยาว",
      why: "พบน้อยลงเพราะ high-flux และ HDF แต่ยังเป็นคำถาม classic",
      keys: ["Carpal bone cyst", "Femoral head และ acetabular cyst", "Destructive spondyloarthropathy ของ cervical spine", "Shoulder pain"],
      ix: ["Dialysis vintage ยาว", "β2-microglobulin สูง"]
    }, [
      N("Dialysis-related amyloid arthropathy and bone cysts", "nephro", {
        s: "Carpal tunnel, shoulder pain, pathological fracture",
        link: "arthralgia"
      })
    ]),
    N("Infection and osteonecrosis", "step", {
      s: "MRI เมื่อสงสัย infection หรือ osteonecrosis",
      why: "Plain film ปกติในระยะแรก",
      keys: ["HD catheter bacteremia", "Steroid หลัง KT"],
      ix: ["Blood culture, CRP", "MRI spine หรือ hip"]
    }, [
      N("Spondylodiscitis and epidural abscess", "nephro", {
        s: "ปวดหลังกับไข้ใน HD, S. aureus bacteremia",
        link: "backpain"
      }),
      N("Osteonecrosis of the femoral head", "nephro", {
        s: "ปวดสะโพกหลัง KT จาก steroid",
        link: "bonepain"
      })
    ])
  ])
};

TREES["img-access"] = {
  must: [
    "ชนิด access, ตำแหน่ง, อายุของ access",
    "ปัญหา: ไหลไม่ดี, pressure สูง, เลือดหยุดช้าหลังถอดเข็ม, แขนบวม, มือเย็น",
    "ประวัติ catheter และ pacemaker ฝั่งเดียวกัน",
    "PD: drain ไม่ออก, ท้องผูก, น้ำรั่ว, เหนื่อยหลังเติมน้ำยา",
    "PD vintage และ peritonitis ซ้ำ (EPS)"
  ],
  tree: N("Dialysis access and catheter imaging", "root", {
    s: "แยกตาม access: AVF และ AVG (Doppler ultrasound, fistulography), central vein, HD catheter (chest X-ray) และ PD catheter และ peritoneum (X-ray, CT peritoneography, CT abdomen)",
    why: "Access dysfunction เป็นปัญหาที่พบบ่อยและเป็นสาเหตุสำคัญของการนอนโรงพยาบาลในผู้ป่วย dialysis และ imaging บอกตำแหน่งที่ต้องแก้",
    keys: ["Clinical monitoring (physical exam) ก่อน imaging", "Doppler ultrasound ดู anatomy และ flow", "Fistulography เมื่อจะ intervene"],
    ix: ["Access flow (Qa), venous pressure, recirculation", "Physical exam: thrill, bruit, arm elevation, augmentation"],
    std: "KDOQI 2019 vascular access guideline, ISPD 2019 PD access guideline"
  }, [
    N("AVF maturation and stenosis", "step", {
      s: "Doppler ultrasound ประเมินขนาด ความลึก flow และ stenosis",
      why: "Juxta-anastomotic stenosis เป็นสาเหตุหลักของ AVF ไม่ mature ส่วน AVG มักตีบที่ venous anastomosis",
      keys: ["Rule of 6s: diameter ≥ 6 mm, ลึก < 6 mm, flow ≥ 600 mL/min ที่ 6 สัปดาห์", "Stenosis: PSV ratio ≥ 2 เทียบกับส่วนก่อนตีบ"],
      ix: ["Qa ลดลง > 25% หรือ Qa < 600 mL/min ใน AVG (< 400-500 mL/min ใน AVF) ชี้ stenosis แต่ KDOQI 2019 ไม่แนะนำ pre-emptive angioplasty จาก surveillance อย่างเดียวถ้าไม่มี clinical indicator", "Qa > 1.5-2 L/min หรือ Qa/CO > 0.3 = high-flow"]
    }, [
      N("Failure to mature", "nephro", {
        s: "Juxta-anastomotic stenosis, accessory vein, เส้นลึกเกิน",
        link: "hd-access"
      }),
      N("Venous outflow stenosis and thrombosis", "nephro", {
        s: "Venous pressure สูง, เลือดหยุดช้าหลังถอดเข็ม, thrill หายกลายเป็น pulsatile (water-hammer pulse)",
        link: "hd-access"
      }),
      N("High-flow access and steal", "nephro", {
        s: "High-output heart failure หรือ distal ischemia",
        link: "hd-access"
      }),
      N("Aneurysm and pseudoaneurysm", "nephro", {
        s: "ผิวบางเป็นมัน แผลที่ผิว เลือดออก",
        link: "hd-access"
      })
    ]),
    N("Central vein stenosis", "step", {
      s: "แขน หน้า หรือเต้านมบวมฝั่ง access, collateral ที่หน้าอก",
      why: "สัมพันธ์กับ catheter หรือ pacemaker เดิม ultrasound มองไม่เห็น central vein",
      keys: ["Arm swelling ฝั่งเดียว", "Venous collateral"],
      ix: ["Fistulography หรือ CT venography", "ประวัติ catheter ที่ subclavian"]
    }, [
      N("Catheter- or pacemaker-related central vein stenosis", "nephro", {
        s: "Subclavian หรือ brachiocephalic stenosis",
        link: "edema"
      })
    ]),
    N("HD catheter position and dysfunction", "step", {
      s: "Chest X-ray ดู tip และ kink",
      why: "Tip ที่สั้นเกินทำให้ flow ไม่ดีและ thrombosis มากขึ้น",
      keys: ["Tip: non-tunneled ที่ lower SVC ถึง cavoatrial junction, tunneled cuffed ที่ mid right atrium", "Kink ที่ tunnel"],
      ix: ["Flow ยังไม่ดีหลัง thrombolytic lock: สงสัย fibrin sheath หรือ malposition ยืนยันด้วย catheterogram", "Blood culture ถ้ามีไข้"]
    }, [
      N("Malposition, kink and fibrin sheath", "nephro", {
        s: "Flow ลดลงหรือ pressure สูงตั้งแต่ต้นหรือค่อยเป็น",
        link: "hd-access"
      })
    ]),
    N("PD catheter and peritoneum", "step", {
      s: "Abdominal X-ray, CT peritoneography, CT abdomen",
      why: "แยก mechanical outflow failure, leak และ EPS",
      keys: ["Tip ควรอยู่ใน true pelvis", "Constipation เป็นสาเหตุที่พบบ่อยที่สุดของ outflow failure"],
      ix: ["Pleural fluid glucose สูงกว่า serum ชัดเจน (gradient > 50 mg/dL): pleuroperitoneal leak, ถ้าไม่สูงไม่ตัด ให้ทำ peritoneal scintigraphy หรือ CT peritoneography", "Effluent RBC: hemoperitoneum", "CT พบ peritoneal thickening, calcification, bowel tethering หรือ cocoon ร่วมกับอาการ bowel obstruction: EPS (วินิจฉัยต้องมีทั้งอาการและ imaging, CT ระยะแรกปกติได้)"]
    }, [
      N("Catheter migration, omental wrap and constipation", "nephro", {
        s: "Drain ออกน้อย เติมได้ปกติ",
        link: "pd-catheter"
      }),
      N("Peritoneal leak and hydrothorax", "nephro", {
        s: "บวมผนังท้องหรืออวัยวะเพศ, right-sided effusion",
        link: "pd-dyspnea"
      }),
      N("Encapsulating peritoneal sclerosis", "nephro", {
        s: "Peritoneal thickening, calcification, loculated ascites, bowel tethering",
        link: "abdpain"
      })
    ])
  ])
};

TREES["img-graft"] = {
  must: [
    "วันหลัง KT, Cr trend, urine output",
    "Tacrolimus level, DSA, ประวัติ rejection",
    "Drain output และ fluid Cr",
    "Ureteric stent ยังอยู่หรือถอดแล้ว",
    "BK viremia",
    "Biopsy ล่าสุด"
  ],
  tree: N("Kidney transplant imaging", "root", {
    s: "Graft ultrasound with Doppler อ่าน 4 ส่วน: perigraft collection, collecting system, vessel (artery, vein, anastomosis) และ parenchyma แล้วเทียบกับระยะเวลาหลัง KT",
    why: "Graft อยู่ตื้นใน iliac fossa จึงตรวจได้ดี แต่ RI และ echogenicity ไม่จำเพาะ ภาวะที่ imaging วินิจฉัยได้คือ surgical และ vascular complication ส่วน rejection ต้อง biopsy",
    keys: ["สัปดาห์แรก: vascular thrombosis, urine leak, hematoma", "สัปดาห์ถึงเดือน: lymphocele, ureteric stenosis", "เดือนที่ 3 ถึง 2 ปี: TRAS, ระยะยาว: native kidney RCC, PTLD (PTLD พบได้ตั้งแต่ปีแรก)"],
    ix: ["Graft ultrasound with Doppler", "Aspirate fluid Cr เทียบ serum", "MAG3 สำหรับ urine leak", "CTA หรือ angiography สำหรับ TRAS"],
    std: "KDIGO 2009 clinical practice guideline for the care of kidney transplant recipients"
  }, [
    N("Perigraft fluid collection", "step", {
      s: "แยกตามเวลาและ fluid chemistry",
      why: "การรักษาต่างกัน: urinoma ต้องแก้ ureter, lymphocele ที่กด graft ต้อง drain หรือ fenestration",
      keys: ["Hematoma: ทันทีหลังผ่าตัด", "Urinoma: วันถึงสัปดาห์", "Lymphocele: สัปดาห์ถึงเดือน พบบ่อยที่สุด", "Abscess: มีไข้"],
      ix: ["Fluid Cr สูงกว่า serum มาก = urinoma", "Fluid Cr ใกล้ serum, lymphocyte เด่น = lymphocele", "Hb ลดลง = hematoma", "Fluid culture = abscess"]
    }, [
      N("Lymphocele", "nephro", {
        s: "Anechoic collection ที่มี septa กด ureter หรือ iliac vein ทำ hydronephrosis และขาบวม",
        link: "kt-early"
      }),
      N("Urine leak and urinoma", "nephro", {
        s: "Drain output มาก, Cr ใน drain สูง, urine output ลดลง",
        link: "kt-immediate"
      }),
      N("Perigraft hematoma and abscess", "nephro", {
        s: "Hb ลดหลังผ่าตัดหรือ biopsy, ไข้กับ collection",
        link: "kt-fever"
      })
    ]),
    N("Graft hydronephrosis", "step", {
      s: "Mild pelvicaliectasis พบได้บ่อยและไม่สำคัญถ้า Cr คงที่",
      why: "Graft ไม่มี innervation จึงไม่มี colic ต้องอาศัย Cr และ serial ultrasound",
      keys: ["Scan ซ้ำหลังปัสสาวะ", "เทียบกับภาพก่อนหน้า"],
      ix: ["Hydronephrosis มากขึ้นกับ Cr ขึ้น = obstruction", "BK viremia ร่วมกับ ureteric stricture: นึกถึง BK-associated ureteric stenosis (BK viremia อย่างเดียวไม่ได้บอกสาเหตุของ hydronephrosis)", "PVR สูง = bladder dysfunction", "Antegrade pyelogram ยืนยัน"]
    }, [
      N("Ureteric stenosis", "nephro", {
        s: "Distal ureter ischemia, BK virus, rejection",
        link: "kt-urine"
      }),
      N("External compression by lymphocele", "nephro", {
        s: "Collection ใกล้ ureter กับ hydronephrosis",
        link: "kt-early"
      }),
      N("Bladder outlet and dysfunction", "nephro", {
        s: "Defunctionalized bladder, BPH, neurogenic bladder",
        link: "luts"
      })
    ]),
    N("Graft vascular complications", "step", {
      s: "Thrombosis ในสัปดาห์แรก, stenosis หลังเดือนแรก",
      why: "Thrombosis ต้องผ่าตัดทันทีเพื่อเก็บ graft ส่วน TRAS แก้ได้ด้วย angioplasty",
      keys: ["Anuria เฉียบพลัน", "HTN ดื้อยา กับ Cr ขึ้นหลัง RAASi", "Hematuria หลัง biopsy"],
      ix: ["Arterial flow หาย = renal artery thrombosis", "Venous flow หาย กับ reversed diastolic flow = renal vein thrombosis (reversed diastolic flow อย่างเดียวพบใน severe rejection, ATN รุนแรง หรือ graft ถูกกดได้)", "PSV สูงที่ anastomosis กับ tardus-parvus distal = TRAS", "Arterialized vein หลัง biopsy = AV fistula"]
    }, [
      N("Graft artery thrombosis", "nephro", {
        s: "Anuria เฉียบพลัน ไม่มี flow ในไต",
        link: "kt-immediate"
      }),
      N("Graft renal vein thrombosis", "nephro", {
        s: "Graft บวม ปวด hematuria ในสัปดาห์แรก",
        link: "kt-immediate"
      }),
      N("Transplant renal artery stenosis", "nephro", {
        s: "HTN ดื้อยา, fluid overload, Cr ขึ้น",
        link: "kt-late"
      }),
      N("Post-biopsy AV fistula", "nephro", {
        s: "Hematuria หรือ high-output หลัง biopsy",
        link: "kt-late"
      })
    ]),
    N("Graft parenchyma", "step", {
      s: "RI และ echogenicity ไม่จำเพาะ",
      why: "RI ใน graft สัมพันธ์กับอายุ recipient และ arterial stiffness มากกว่า histology ของ graft",
      keys: ["RI สูงไม่จำเพาะต่อ rejection และ RI ปกติไม่ตัด rejection", "Biopsy เป็นวิธีวินิจฉัย"],
      ix: ["Biopsy กับ Banff classification", "DSA, tacrolimus level, BK PCR"],
      std: "Naesens (NEJM 2013, n = 321): graft RI สัมพันธ์กับอายุ recipient ไม่ใช่ histology ของ graft"
    }, [
      N("Rejection, ATN and CNI toxicity", "nephro", {
        s: "Imaging แยกไม่ได้ ต้อง biopsy",
        link: "kt-early"
      })
    ]),
    N("Native kidneys and malignancy", "step", {
      s: "ไตเดิม และ mass ที่ graft hilum",
      why: "RCC ในไตเดิมพบมากขึ้นหลัง KT โดยเฉพาะในรายที่มี ACKD, ส่วน PTLD เกิดที่ graft หรือบริเวณ hilum ได้โดยเฉพาะในปีแรก แต่พบนอก graft ได้เช่นกัน (lymph node, GI tract, CNS)",
      keys: ["Native kidney cyst ที่ซับซ้อน", "Mass ที่ graft hilum"],
      ix: ["CT หรือ MRI", "EBV PCR, LDH สำหรับ PTLD"]
    }, [
      N("Native kidney RCC", "nephro", {
        s: "Hematuria หรือ incidental mass ในไตเดิม",
        link: "flank"
      }),
      N("PTLD involving the graft", "nephro", {
        s: "Hypoechoic mass ที่ hilum หรือ graft โตแบบ infiltrative",
        link: "kt-fever"
      })
    ])
  ])
};
