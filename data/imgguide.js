/* How to read nephrology imaging: teaching guide (Nov 2026). Rendered by index.html guideView() on #n-imgread.
   Block types: p (paragraph), ul (list), ol (ordered steps), table {head, rows}, note (callout), svg (inline diagram key), qa [[q,a]]. */
window.IMGGUIDE = {
  title: "How to read nephrology imaging",
  intro: "บทนี้สอนอ่านภาพทางไตตั้งแต่หลักการ การอ่านแต่ละ modality ค่าปกติ จุดหลอก ไปจนถึงวิธีรายงานผลใน long case ให้อ่านตามลำดับเดียวกันทุกครั้ง แล้วจบด้วยการตอบคำถามทางคลินิกที่ส่งตรวจ",
  sections: [

  {id:"principles", title:"1. Principles", blocks:[
    {p:"เริ่มจากคำถามทางคลินิกเสมอ ภาพเดียวกันอ่านต่างกันได้ตามคำถาม เช่น AKI ต้องตอบว่า obstruct หรือไม่และ chronic หรือไม่ ส่วน hematuria ต้องตอบว่ามี mass หรือ urothelial lesion หรือไม่"},
    {ol:[
      "ระบุ modality, phase และคุณภาพของภาพ",
      "ขนาดและรูปร่างของไตทั้งสองข้าง เทียบกัน",
      "Parenchyma: cortical thickness, echogenicity หรือ attenuation, corticomedullary differentiation",
      "Collecting system: hydronephrosis, stone, filling defect",
      "Focal lesion: cyst หรือ solid, จำนวน, ลักษณะ",
      "Vessel: artery, vein, flow",
      "Bladder, ureter และอวัยวะรอบข้าง (ตับ ม้าม ต่อมหมวกไต retroperitoneum)",
      "เทียบกับภาพเก่า",
      "สรุปตอบคำถามทางคลินิก และบอกว่าต้องตรวจอะไรต่อ"
    ]},
    {note:"กฎสามข้อที่ examiner ชอบถาม: hydronephrosis ไม่เท่ากับ obstruction, ไตขนาดปกติไม่ตัด CKD ออก, echogenicity ที่เพิ่มขึ้นบอกว่ามี medical renal disease แต่ไม่บอกสาเหตุ"}
  ]},

  {id:"choose", title:"2. Choosing the modality", blocks:[
    {table:{head:["คำถามทางคลินิก","First-line","ตรวจต่อเมื่อ"],rows:[
      ["AKI หรือ CKD ไม่ทราบสาเหตุ","Kidney and bladder ultrasound","Doppler ถ้าสงสัย vascular, CT ถ้าสงสัย retroperitoneal process"],
      ["Renal colic","Non-contrast CT KUB (low dose), ultrasound ในหญิงตั้งครรภ์และเด็ก","CT urography ถ้าหานิ่วไม่เจอ"],
      ["Visible hematuria","CT urography","Cystoscopy ร่วมด้วยในผู้ใหญ่ทุกราย เพราะ visible hematuria จัดเป็น high risk อยู่แล้ว (หลังตัด UTI และสาเหตุ glomerular)"],
      ["Renal mass หรือ complex cyst","Contrast CT (non-contrast + nephrographic) หรือ MRI","MRI เมื่อ CT ไม่ชัดหรือ eGFR ต่ำ"],
      ["Renovascular hypertension","Duplex Doppler ultrasound","CTA หรือ MRA, catheter angiography เมื่อจะ intervene"],
      ["Renal vein thrombosis","Doppler ultrasound","CT venography หรือ MR venography"],
      ["ADPKD diagnosis และ prognosis","Ultrasound (Pei criteria)","MRI สำหรับ TKV และ Mayo class"],
      ["Pyelonephritis ที่ไม่ดีขึ้น","Contrast CT","Ultrasound ถ้าเลี่ยง contrast"],
      ["Split function หรือ scar","DMSA","MAG3 ถ้าสงสัย obstruction ร่วม"],
      ["Graft dysfunction","Graft ultrasound with Doppler","MAG3, CTA, biopsy"],
      ["Pre-biopsy","Ultrasound","CT ถ้ากายวิภาคไม่ชัด"]
    ]}}
  ]},

  {id:"us", title:"3. Kidney ultrasound", blocks:[
    {p:"ใช้ curvilinear probe ราว 2-5 MHz ผู้ป่วยนอนหงายหรือตะแคง ไตขวาใช้ตับเป็น acoustic window ไตซ้ายใช้ม้าม ให้ผู้ป่วยหายใจเข้าลึกค้างไว้เพื่อให้ไตเลื่อนลงต่ำกว่าซี่โครง วัดความยาวในแนว longitudinal ที่ยาวที่สุดเสมอ เพราะการวัดเฉียงทำให้ได้ค่าสั้นกว่าจริง"},
    {table:{head:["Parameter","ค่าปกติในผู้ใหญ่","ความหมายเมื่อผิดปกติ"],rows:[
      ["Kidney length","ราว 10-12 cm ขึ้นกับส่วนสูง","< 9 cm ชี้ chronic disease (ปรับตามส่วนสูง), > 13 cm ชี้ cystic, infiltrative หรือ acute process. ขนาดปกติหรือโตไม่ตัด CKD (DM, amyloid, HIVAN, myeloma, ADPKD)"],
      ["ความต่างสองข้าง","< 1.5 cm","> 1.5 cm: unilateral RAS, reflux nephropathy, hypoplasia, unilateral obstruction หรือ RVT"],
      ["Parenchymal thickness","ราว 15-20 mm","บางลงในโรคเรื้อรัง สัมพันธ์กับ eGFR ดีกว่าความยาวในคนตัวใหญ่"],
      ["Cortical echogenicity","Hypoechoic หรือ isoechoic กับตับ","สว่างกว่าตับชี้ medical renal disease แต่ไม่บอกสาเหตุหรือ chronicity และ echogenicity ปกติไม่ตัดโรคไต"],
      ["Corticomedullary differentiation","เห็น pyramid hypoechoic ชัด","แยกไม่ออกในโรคเรื้อรัง, medulla สว่างใน nephrocalcinosis"],
      ["Renal sinus","Echogenic จาก fat","Sinus lipomatosis ในผู้สูงอายุหรือไตฝ่อ"],
      ["Bladder PVR","< 50-100 mL","> 200 mL มีนัยสำคัญ"]
    ]}},
    {p:"Echogenicity grading: grade 0 cortex น้อยกว่าตับ, grade I เท่าตับ (พบในคนปกติได้ โดยเฉพาะผู้สูงอายุ), grade II มากกว่าตับ, grade III เท่า renal sinus ถ้าผู้ป่วยมี fatty liver ตับจะสว่างกว่าปกติ ให้เทียบไตซ้ายกับม้ามแทน"},
    {svg:"echo"},
    {p:"Hydronephrosis ใช้ SFU grading (ออกแบบและ validate ในเด็ก ในผู้ใหญ่นิยมรายงานเป็น mild, moderate, severe ซึ่งเทียบได้กับ SFU 1-2, 3 และ 4) ระดับของ dilatation ไม่ได้บอกความรุนแรงหรือการมีอยู่ของ obstruction"},
    {table:{head:["SFU grade","ลักษณะ"],rows:[
      ["0","ไม่มี dilatation"],
      ["1","Renal pelvis ขยายเล็กน้อย calyx ปกติ"],
      ["2","Pelvis ขยายและเห็น major calyx ขยายบางส่วน"],
      ["3","Pelvis และ calyx ทั้งหมดขยาย parenchyma ปกติ"],
      ["4","เหมือน grade 3 ร่วมกับ parenchyma บาง"]
    ]}},
    {svg:"hydro"},
    {p:"Cyst: simple cyst ต้องครบสามข้อ คือ anechoic, ผนังบางเรียบ และ posterior acoustic enhancement ถ้ามี septa หนา ผนังหนา solid component หรือ calcification ให้ส่ง contrast CT หรือ MRI เพื่อจัด Bosniak เพราะ ultrasound วัด enhancement ไม่ได้"},
    {table:{head:["Pei unified ultrasound criteria (ผู้มีประวัติครอบครัว ADPKD)","Diagnosis","Exclusion"],rows:[
      ["อายุ 15-39 ปี","≥ 3 cyst (ข้างเดียวหรือรวมสองข้าง)","Ultrasound ยัง exclude ไม่ได้: อายุ 30-39 ปีไม่มี cyst มี NPV ราว 98% แต่อายุ < 30 ปีต่ำกว่านั้น ถ้าต้องการ exclude (เช่น living donor) ใช้ MRI หรือ genetic"],
      ["อายุ 40-59 ปี","≥ 2 cyst ในแต่ละข้าง","< 2 cyst (0 หรือ 1 cyst)"],
      ["อายุ ≥ 60 ปี","≥ 4 cyst ในแต่ละข้าง","< 2 cyst (0 หรือ 1 cyst)"]
    ]}},
    {p:"Stone: echogenic focus มี posterior acoustic shadow และ twinkling artifact บน color Doppler นิ่วในท่อไตส่วนกลางมักมองไม่เห็น ให้ดู hydroureter และ ureteric jet ช่วย"},
    {p:"Bladder volume (mL) ประมาณจาก ยาว × กว้าง × สูง (cm) × 0.52 ดู wall thickness, trabeculation, diverticulum, mass และ ureteric jet ทั้งสองข้าง"},
    {ul:[
      "Pitfall: column of Bertin คือ cortex ที่ยื่นเข้า sinus echogenicity เท่า cortex ไม่ใช่ mass",
      "Pitfall: dromedary hump ที่ไตซ้ายจากการกดของม้าม",
      "Pitfall: fetal lobulation ทำให้ขอบไตเป็นลอนโดยไม่มี scar (scar อยู่ตรงข้าม calyx ส่วน lobulation อยู่ระหว่าง calyx)",
      "Pitfall: extrarenal pelvis และ parapelvic cyst ดูคล้าย hydronephrosis",
      "Pitfall: horseshoe kidney และ ectopic kidney ทำให้วัดขนาดผิดหรือหาไตไม่เจอ",
      "Pitfall: bladder เต็มทำให้ pelvis ขยาย ให้ scan ซ้ำหลังปัสสาวะ"
    ]},
    {note:"ก่อน biopsy ต้องดู: ไตสองข้าง, ขนาด (< 9 cm เป็น relative contraindication), cortical thickness, cyst หรือ mass, hydronephrosis, ตำแหน่งขั้วล่างและความลึกจากผิว"},
    {model:{"title": "AKI with obstruction", "text": "Ultrasound of the kidneys and bladder: right kidney 11.8 cm and left 11.5 cm with preserved cortical thickness and normal echogenicity. Bilateral moderate hydronephrosis, SFU grade 3, with dilated ureters down to the pelvis. No stone or mass. The bladder is distended at about 850 mL with a thickened, trabeculated wall and an enlarged prostate. Impression: bilateral hydroureteronephrosis from bladder outlet obstruction. The parenchyma is preserved, so recovery after decompression is likely. I would insert a urethral catheter and watch for post-obstructive diuresis.", "why": ["เริ่มจากขนาดและ cortex ซึ่งบอกว่าไตยังฟื้นได้", "ระบุระดับของการอุดตันจาก bladder ที่โป่งและ ureter ที่ขยายสองข้าง", "บอก negative finding ที่สำคัญ (no stone, no mass)", "Impression ตอบคำถาม AKI และบอก next step กับ complication ที่ต้องเฝ้าระวัง"]}}
  ]},

  {id:"doppler", title:"4. Renal Doppler", blocks:[
    {p:"Doppler ต้องตั้ง angle of insonation ≤ 60 องศาและใช้ sample volume เล็กในหลอดเลือด ตรวจ main renal artery ตั้งแต่ ostium ถึง hilum และ segmental หรือ interlobar artery ที่ขั้วบน กลาง ล่าง"},
    {table:{head:["Measurement","สูตรหรือค่า","การแปลผล"],rows:[
      ["PSV","Peak systolic velocity","> 180-200 cm/s ใน main renal artery ชี้ RAS"],
      ["Renal-aortic ratio (RAR)","PSV renal / PSV aorta","> 3.5 ชี้ stenosis ≥ 60%"],
      ["Resistive index (RI)","(PSV − EDV) / PSV","ปกติ < 0.7"],
      ["Acceleration time","เวลาจากเริ่ม systole ถึง peak","> 70 ms = tardus-parvus"],
      ["Side-to-side RI difference","RI ข้างหนึ่งลบอีกข้าง","> 0.05 สนับสนุน unilateral RAS"]
    ]}},
    {svg:"wave"},
    {p:"RI สูงพบทั้งใน intrarenal disease (ATN, acute interstitial nephritis, GN, chronic disease, acute obstruction) และปัจจัยนอกไต (อายุมาก, HR ช้า, arterial stiffness, intra-abdominal hypertension, perinephric compression) จึงต้องเทียบสองข้างและแปลร่วมกับ clinical"},
    {p:"Radermacher (NEJM 2001, n = 138): RI ≥ 0.80 ก่อน revascularization ทำนายว่า kidney function และ BP จะไม่ดีขึ้นหลังรักษา RAS แต่เป็น single-center study ที่การศึกษาต่อมายืนยันได้ไม่สม่ำเสมอ จึงใช้ประกอบการตัดสินใจ ไม่ใช้ RI ตัวเดียวตัดสินว่าไม่ revascularize"},
    {ul:[
      "Renal vein thrombosis: ไม่มี venous flow, ไตบวม, ใน graft จะเห็น reversed diastolic arterial flow (ไม่จำเพาะ พบใน severe rejection, ATN รุนแรง และ perigraft compression ได้) ส่วนไต native ที่มี collateral อาจยังเห็น venous flow จึงตัด RVT ไม่ได้",
      "Renal infarction: ไม่มี flow เป็นบริเวณรูปลิ่ม",
      "Post-biopsy AV fistula: turbulent high-velocity flow, color aliasing, vein มี arterial waveform",
      "Pseudoaneurysm: cystic structure กับ yin-yang flow",
      "Nutcracker: left renal vein ขยายก่อนถึง aortomesenteric angle และ velocity ที่ตีบสูงกว่าส่วนต้นมาก"
    ]},
    {note:"RI ใน graft สัมพันธ์กับอายุและ vascular status ของ recipient มากกว่า histology ของ graft (Naesens, NEJM 2013, n = 321) จึงใช้วินิจฉัย rejection ไม่ได้"},
    {model:{"title": "Suspected renovascular hypertension", "text": "Renal duplex ultrasound: the right main renal artery has a peak systolic velocity of 320 cm/s at the ostium with post-stenotic turbulence, and the renal-aortic ratio is 4.6. Right intrarenal waveforms are tardus-parvus, with an acceleration time of 110 ms and RI 0.52. The left side is normal, with RI 0.68. The right kidney measures 8.9 cm and the left 10.8 cm. Impression: hemodynamically significant (at least 60%) right ostial renal artery stenosis, most likely atherosclerotic. The right kidney is smaller, but its RI is below 0.80, so it may still respond if revascularization is indicated, for example for flash pulmonary edema, refractory hypertension or a rapid decline in GFR. Otherwise medical therapy remains first line. I would confirm the anatomy with CTA only if intervention is planned.", "why": ["ให้ทั้ง direct sign (PSV, RAR) และ indirect sign (tardus-parvus)", "เทียบสองข้างทั้ง RI และขนาด", "ใช้ RI < 0.80 สนับสนุนว่าไตข้างนั้นอาจยังตอบสนองต่อ revascularization (ไม่ใช่ตัวตัดสินตัวเดียว)", "บอกข้อบ่งชี้ของ revascularization แทนการส่ง stent ทุกราย ซึ่งตรงกับหลักฐานจาก CORAL และ ASTRAL"]}}
  ]},

  {id:"ct", title:"5. CT", blocks:[
    {table:{head:["Tissue","Attenuation (HU) โดยประมาณ"],rows:[
      ["Fat","−100 ถึง −50"],
      ["Simple fluid","−10 ถึง 20"],
      ["Kidney parenchyma (non-contrast)","30-50"],
      ["Acute blood","50-80"],
      ["Calcification และนิ่ว","Calcification มากกว่า 130, นิ่วส่วนใหญ่มากกว่า 200 (uric acid ราว 200-500, calcium มักมากกว่า 700)"]
    ]}},
    {table:{head:["Phase","เวลาหลังฉีด","ใช้ดู"],rows:[
      ["Non-contrast","ก่อนฉีด","นิ่ว, calcification, baseline HU ของ mass, hemorrhage"],
      ["Arterial หรือ corticomedullary","ราว 25-40 วินาที","Renal artery, cortex enhance เด่น, hypervascular tumor"],
      ["Nephrographic","ราว 80-120 วินาที","Parenchyma enhance สม่ำเสมอ ดีที่สุดสำหรับหา mass"],
      ["Excretory","ราว 5-15 นาที","Collecting system, ureter, urothelial lesion, urine leak"]
    ]}},
    {p:"Renal mass: วัด HU ใน non-contrast และ nephrographic phase ที่ตำแหน่งเดียวกัน ถ้าเพิ่ม ≥ 20 HU ถือว่า enhancing, 10-19 HU เป็น equivocal ถ้ามี fat ใน mass (< −10 HU) และไม่มี calcification เกือบทั้งหมดคือ angiomyolipoma"},
    {table:{head:["Bosniak 2019","ลักษณะหลัก","การดูแล"],rows:[
      ["I","ผนังบางเรียบ ≤ 2 mm, simple fluid (−9 ถึง 20 HU), ไม่มี septa","ไม่ต้องติดตาม"],
      ["II","Septa บาง 1-3 อัน หรือ homogeneous hyperattenuating cyst (≥ 70 HU ใน non-contrast) และกลุ่ม benign อื่น","ไม่ต้องติดตาม"],
      ["IIF","ผนังหรือ septa หนาเล็กน้อย 3 mm หรือ septa บางจำนวนมาก (≥ 4)","ติดตามด้วย imaging"],
      ["III","ผนังหรือ septa หนา ≥ 4 mm หรือไม่เรียบ และ enhance","Malignant ราวครึ่งหนึ่ง พิจารณาผ่าตัดหรือ active surveillance"],
      ["IV","มี enhancing nodule","Malignant ราว 90% รักษาแบบ RCC: ผ่าตัดเป็นหลัก, ablation หรือ active surveillance ในรายที่เลือก"]
    ]}},
    {ul:[
      "Non-contrast CT KUB เห็นนิ่วเกือบทุกชนิด ยกเว้นนิ่วจาก protease inhibitor (indinavir มองไม่เห็น, atazanavir อาจมองไม่เห็น) CT ปกติจึงไม่ตัดนิ่วจากยา",
      "Uric acid stone มี HU ต่ำกว่า calcium stone ชัดเจน dual-energy CT แยกชนิดได้",
      "Secondary sign ของ obstruction: hydronephrosis, hydroureter, perinephric stranding, ไตบวม",
      "Emphysematous pyelonephritis: gas ใน parenchyma แบ่ง class ตาม Huang-Tseng เพื่อเลือก PCN หรือ nephrectomy",
      "Retroperitoneal fibrosis: periaortic soft tissue ที่ encase ureter และดึง ureter เข้าด้านใน",
      "Wunderlich syndrome: spontaneous perirenal hemorrhage จาก AML, RCC หรือ vasculitis (polyarteritis nodosa)"
    ]},
    {note:"Iodinated contrast (ACR-NKF 2020): ไม่งด contrast CT ที่จำเป็นเพราะ eGFR ต่ำ. IV isotonic saline prophylaxis เมื่อ eGFR < 30 ที่ไม่ได้ maintenance dialysis หรือมี AKI (ถ้าไม่มี volume overload) และพิจารณาเป็นรายบุคคลที่ eGFR 30-44 ถ้ามี risk factor หลายอย่าง. ความเสี่ยง CI-AKI แทบไม่มีเมื่อ eGFR ≥ 45 และต่ำมากที่ 30-44. Metformin งดเมื่อ eGFR < 30 หรือ AKI โดยงดวันตรวจและ 48 ชั่วโมงหลังตรวจ เริ่มใหม่เมื่อ kidney function คงที่. ผู้ป่วย dialysis ที่ anuric ให้ contrast ได้ และไม่ต้องทำ HD ฉุกเฉินหลังได้ contrast ถ้าไม่มี volume overload. ผู้ป่วย PD หรือ HD ที่ยังมี residual kidney function ให้ชั่งประโยชน์กับความเสี่ยงต่อ residual function แบบเดียวกับกลุ่ม eGFR < 30 (ไม่ใช่ข้อห้าม)"},
    {model:{"title": "Incidental renal mass", "text": "Contrast-enhanced CT with non-contrast and nephrographic phases: there is a 3.2 cm exophytic solid lesion at the lower pole of the left kidney. It measures 28 HU before contrast and 85 HU after, an enhancement of 57 HU. It is heterogeneous with no macroscopic fat and no calcification. The left renal vein and IVC are patent and there is no retroperitoneal lymphadenopathy. The right kidney has two simple cysts, Bosniak I. Impression: an enhancing solid renal mass without fat, most consistent with renal cell carcinoma, clinical T1a. Because his eGFR is 38, I would favor nephron-sparing surgery or ablation over radical nephrectomy.", "why": ["บอก phase ที่ทำ เพราะต้องใช้ทั้ง non-contrast และ nephrographic ในการวัด enhancement", "ให้ตัวเลข HU และ enhancement ≥ 20 HU", "ตัด AML ด้วยการบอกว่าไม่มี fat", "Staging ที่สำคัญ (renal vein, IVC, node) และเชื่อมกับ eGFR ในการเลือกการรักษา"]}}
  ]},

  {id:"mri", title:"6. MRI", blocks:[
    {table:{head:["Sequence","ใช้ดู"],rows:[
      ["T2-weighted","Fluid สว่าง ใช้ดู cyst, TKV และ collecting system"],
      ["T1 in-phase และ opposed-phase","Intracellular fat ใน clear cell RCC และ lipid-poor AML (signal ลดใน opposed-phase)"],
      ["T1 fat-saturated","Macroscopic fat ใน AML, hemorrhagic หรือ proteinaceous cyst สว่างใน T1"],
      ["Diffusion-weighted","Restricted diffusion ใน tumor, abscess, pyelonephritis"],
      ["Post-gadolinium subtraction","Enhancement ของ mass แม้ cyst สว่างใน T1 เดิม"],
      ["Non-contrast MRA","Renal artery โดยไม่ใช้ gadolinium"]
    ]}},
    {p:"ADPKD: TKV คำนวณจาก ellipsoid formula (π/6 × length × width × depth ของไตแต่ละข้าง) แล้วหารด้วยส่วนสูง (htTKV) เพื่อจัด Mayo imaging class 1A ถึง 1E ซึ่ง class 1C ถึง 1E มี progression เร็วและเป็นกลุ่มที่พิจารณา tolvaptan ส่วน class 2 (atypical เช่น unilateral, segmental, asymmetric) ใช้ htTKV ตามอายุทำนาย progression ไม่ได้"},
    {note:"Gadolinium (ACR-NKF 2021): group II agent (เช่น gadobutrol, gadoterate, gadoteridol) มี NSF risk ต่ำมากแม้ eGFR < 30 หรือ dialysis จึงไม่ควรงด MRI ที่จำเป็น ใช้ขนาดต่ำสุดที่ได้ภาพ ส่วน group I agent (gadodiamide, gadopentetate, gadoversetamide) ห้ามใช้เมื่อ eGFR < 30, AKI หรือ dialysis. ไม่ต้องเริ่ม HD เพื่อขับ gadolinium ในผู้ที่ไม่ได้ฟอก ส่วนผู้ป่วย HD นิยมนัดตรวจก่อนรอบ HD ถัดไป"},
    {model:{"title": "ADPKD prognosis", "text": "MRI of the kidneys, T2-weighted without contrast: both kidneys are enlarged and replaced by innumerable cysts, the right measuring 17.5 cm and the left 18.2 cm. Total kidney volume is 1,620 mL, giving a height-adjusted TKV of 950 mL/m at age 34, which is Mayo imaging class 1D on the Mayo calculator. A few cysts are T1-hyperintense, consistent with hemorrhage, and there is no solid lesion. The liver contains multiple cysts. Impression: typical (class 1) ADPKD at high risk of rapid progression, which supports tolvaptan if his eGFR and liver function allow.", "why": ["บอก sequence และว่าไม่ได้ใช้ contrast", "ให้ TKV, htTKV, อายุ และ Mayo class ซึ่งเป็นตัวตัดสินการรักษา", "แยก hemorrhagic cyst จาก solid lesion", "บอก extrarenal finding (liver cyst) และเชื่อม impression กับการตัดสินใจเรื่อง tolvaptan"]}}
  ]},

  {id:"nuc", title:"7. Nuclear medicine", blocks:[
    {table:{head:["Study","กลไก","ใช้ตอบคำถาม"],rows:[
      ["Tc-99m DMSA","จับที่ proximal tubule (cortical agent)","Scar, acute pyelonephritis, split function, ectopic kidney"],
      ["Tc-99m MAG3","Tubular secretion","Obstruction (diuretic renogram), split function, graft perfusion, urine leak"],
      ["Tc-99m DTPA","Glomerular filtration","Measured GFR และ split GFR"]
    ]}},
    {p:"MAG3 renogram curve มีสามช่วง: perfusion ใน 1 นาทีแรก, uptake ที่ peak ราว 2-5 นาที และ excretion หลังจากนั้น ให้ furosemide แล้ววัด T½ ของ washout: < 10 นาทีไม่ obstruct, 10-20 นาที equivocal, > 20 นาที obstruction"},
    {svg:"reno"},
    {ul:[
      "Split function ปกติราว 45-55% ต่อข้าง, < 40% ถือว่าลดลงชัดเจน",
      "ข้างที่ function ต่ำมากจะ washout ช้าเองจนแปลผลผิดเป็น obstruction",
      "Bladder เต็มหรือ dehydration ทำให้ washout ช้า ควรใส่สายหรือให้ปัสสาวะก่อน",
      "DMSA ต้องรอราว 6 เดือนหลังติดเชื้อจึงสรุปว่าเป็น scar ถาวร",
      "Captopril renography ใช้น้อยลงมากแล้วเพราะ Doppler และ CTA แทนได้"
    ]},
    {model:{"title": "Unilateral hydronephrosis", "text": "MAG3 diuretic renogram, performed with adequate hydration and the bladder drained: perfusion is prompt and symmetrical. Split function is 18% on the left and 82% on the right. The left kidney shows progressive tracer accumulation in a dilated pelvis with no washout after furosemide, a T½ of more than 20 minutes. The right kidney drains normally. Impression: left pelviureteric junction obstruction with significantly reduced but salvageable function. I would refer for pyeloplasty rather than nephrectomy.", "why": ["บอกเงื่อนไขการตรวจ (hydration, bladder drainage) ที่ทำให้แปลผล washout ได้", "ให้ split function เป็นตัวเลข", "ใช้ T½ ยืนยันว่าเป็น obstruction ไม่ใช่แค่ dilatation", "เชื่อม function กับการเลือกผ่าตัด"]}}
  ]},

  {id:"xray", title:"8. Plain radiographs", blocks:[
    {p:"KUB: ดู renal outline, radio-opaque stone ตามแนว ureter (ข้าง transverse process ข้ามหน้า sacroiliac joint ลงสู่ pelvis), nephrocalcinosis, vascular calcification และตำแหน่ง catheter นิ่ว calcium เห็นชัด cystine เห็นจาง uric acid และ indinavir มองไม่เห็น phlebolith ในอุ้งเชิงกรานกลมมี center โปร่งต่างจากนิ่ว"},
    {p:"Chest X-ray ใน long case: cardiothoracic ratio > 0.5, water-bottle heart จาก pericardial effusion, pulmonary edema (upper lobe diversion, Kerley B line, bat-wing opacity), pleural effusion (right-sided ใน PD hydrothorax), ตำแหน่ง HD catheter tip ควรอยู่ที่ cavoatrial junction หรือ right atrium, calcified valve และ aortic knob"},
    {table:{head:["Bone and soft-tissue finding","ความหมาย"],rows:[
      ["Subperiosteal resorption ด้าน radial ของ middle phalanx นิ้วชี้และนิ้วกลาง","Hyperparathyroidism (จำเพาะที่สุด แทบ pathognomonic แต่ไม่พบไม่ได้ตัด HPT)"],
      ["Salt-and-pepper skull, acro-osteolysis, brown tumor","Severe hyperparathyroidism"],
      ["Rugger jersey spine","Endplate sclerosis จาก renal osteodystrophy"],
      ["Looser zone (pseudofracture)","Osteomalacia"],
      ["Pipe-stem arterial calcification","Medial calcification ใน CKD"],
      ["Periarticular calcified mass","Tumoral calcinosis จาก PO4 สูง"],
      ["Carpal และ femoral head bone cyst","Dialysis-related β2M amyloidosis"],
      ["Net-like subcutaneous vessel calcification","สนับสนุน calciphylaxis แต่ไม่ใช่การวินิจฉัย"]
    ]}},
    {note:"KDIGO 2017 (2C): ในผู้ป่วย CKD G3a-G5D ใช้ lateral abdominal X-ray (Kauppila score) หา vascular calcification และ echocardiography หา valvular calcification ได้แทน CT ผู้ที่พบ calcification ถือเป็น highest cardiovascular risk และใช้ผลประกอบการดูแล CKD-MBD ทั้งนี้การจำกัดขนาด calcium-based binder แนะนำในผู้ใหญ่ทุกรายที่ต้องใช้ binder ไม่ได้ขึ้นกับว่าพบ calcification หรือไม่"},
    {model:{"title": "CKD-MBD in a long-term hemodialysis patient", "text": "Hand radiograph: subperiosteal bone resorption along the radial aspects of the middle phalanges of the index and middle fingers, with tuft resorption and calcification of the digital arteries. Lateral lumbar radiograph: linear calcification of the anterior and posterior aortic walls from L1 to L4, Kauppila score 14 out of 24. Impression: radiological hyperparathyroid bone disease with extensive vascular calcification, consistent with his PTH of 1,650 pg/mL. This supports a non-calcium-based phosphate binder and considering a calcimimetic or parathyroidectomy.", "why": ["ใช้ตำแหน่งที่จำเพาะที่สุดของ HPT (radial aspect ของ middle phalanx)", "ให้คะแนน vascular calcification เป็นตัวเลขตามที่ KDIGO แนะนำ", "เชื่อมภาพกับ PTH", "Impression นำไปสู่การเลือก binder และการรักษา HPT"]}}
  ]},

  {id:"other", title:"9. Contrast studies and access imaging", blocks:[
    {table:{head:["Study","ใช้เมื่อ","สิ่งที่ต้องอ่าน"],rows:[
      ["VCUG","VUR ในเด็กหรือ UTI ซ้ำ","VUR grade I-V, posterior urethral valve, bladder trabeculation"],
      ["Retrograde และ antegrade pyelogram","Obstruction ที่ CT ไม่ชัด, graft ureteric stenosis","ตำแหน่งตีบ filling defect leak"],
      ["Fistulography","AVF หรือ AVG dysfunction","Juxta-anastomotic stenosis, outflow stenosis, central vein stenosis"],
      ["CT peritoneography","PD leak","Contrast ออกนอก peritoneum เข้า abdominal wall, scrotum หรือ pleura"],
      ["AVF Doppler","Maturation และ dysfunction","Diameter, depth, flow (rule of 6s), PSV ratio ≥ 2 ที่ stenosis"]
    ]}},
    {model:{"title": "AVF dysfunction", "text": "Fistulogram of a left brachiocephalic AVF: the arterial anastomosis and the forearm segment are normal. There is an 80% stenosis of the cephalic arch over 2 cm, with a patent outflow beyond it. The central veins are patent and there are no collaterals. Impression: cephalic arch stenosis, which explains his high venous pressures and prolonged bleeding after needle removal. This is suitable for angioplasty, with a high chance of restenosis.", "why": ["ไล่จาก inflow ไป outflow และ central vein ตามลำดับ", "ระบุตำแหน่งและความรุนแรงของ stenosis", "เชื่อมกับอาการทางคลินิกที่ส่งตรวจ", "บอกการรักษาและ prognosis"]}}
  ]},

  {id:"present", title:"10. Presenting imaging in the long case", blocks:[
    {p:"รายงานเป็นลำดับเดียวกับการอ่าน ตัวอย่าง:"},
    {note:"Ultrasound of the kidneys: right kidney 9.2 cm and left 9.0 cm with thin cortex, cortical echogenicity greater than the liver (grade II) and loss of corticomedullary differentiation. No hydronephrosis, stone or mass. Bladder normal with post-void residual 30 mL. Impression: bilateral small echogenic kidneys with thin cortex, consistent with chronic kidney disease, and no obstruction. A biopsy would carry a higher risk and a low diagnostic yield, so I would reserve it for a situation where the result could change management."},
    {ul:[
      "บอก impression ที่ตอบคำถามทางคลินิก ไม่ใช่แค่บรรยาย",
      "บอกสิ่งที่ไม่พบที่สำคัญ เช่น no hydronephrosis",
      "เชื่อมกับ clinical: เช่น ไตใหญ่ echogenic กับ nephrotic proteinuria ใน HIV ทำให้คิด HIVAN",
      "บอก next step: Doppler, CT phase ไหน, biopsy ได้หรือไม่"
    ]}
  ]},

  {id:"qa", title:"11. Examiner questions", blocks:[
    {qa:[
      ["ไตขนาดปกติแต่ eGFR 15 นึกถึงอะไร","DKD, amyloidosis, myeloma และ monoclonal immunoglobulin deposition disease, HIVAN, ADPKD, infiltrative disease (lymphoma) หรือ AKI ที่ซ้อนบน CKD หรือ AKI ล้วนที่ยังไม่ทันฝ่อ"],
      ["Hydronephrosis ไม่มี obstruction ได้อย่างไร และ obstruction ไม่มี hydronephrosis ได้อย่างไร","Dilatation without obstruction: pregnancy, VUR, extrarenal pelvis, high urine flow, residual dilatation หลังแก้ obstruction. Obstruction without dilatation: ช่วงแรก 24-48 ชั่วโมง, volume depletion, retroperitoneal fibrosis, tumor encasement"],
      ["RI 0.85 ในไต native แปลว่าอะไร","บอกได้ว่า resistance สูงแต่ไม่บอกสาเหตุ ต้องคิดทั้ง parenchymal disease และปัจจัยนอกไต ใน RAS ค่า RI ≥ 0.80 สัมพันธ์กับผลหลัง revascularization ที่ไม่ดี (Radermacher 2001, single-center) แต่ไม่ใช้ตัวเดียวตัดสิน"],
      ["ผู้ป่วย eGFR 25 ต้องทำ contrast CT เพื่อหา malignancy จะทำอย่างไร","ทำได้เมื่อจำเป็น ให้ IV isotonic fluid prophylaxis ใช้ contrast ขนาดต่ำสุด หยุด NSAID และ metformin และติดตาม Cr หรือพิจารณา MRI ด้วย group II gadolinium"],
      ["ทำไม ADPKD อายุ 25 ปีที่ ultrasound ไม่พบ cyst ยังตัดโรคไม่ได้","Ultrasound ไวน้อยในคนอายุน้อยและ PKD2 ใช้ MRI (อายุ 16-40 ปี: > 10 cyst วินิจฉัยได้, < 5 cyst exclude ได้) หรือ genetic testing โดยเฉพาะเมื่อจะเป็น living donor"],
      ["Medullary nephrocalcinosis ใน hypokalemic NAGMA คิดอะไร","Distal RTA จะตรวจ urine pH, urine anion gap, Sjogren และ genetic"],
      ["Perigraft collection สัปดาห์ที่ 6 หลัง KT แยกอย่างไร","เวลาบอกว่าเป็น lymphocele มากที่สุด เจาะ fluid ดู Cr: ใกล้ serum ชี้ lymphocele (หรือ seroma), สูงกว่า serum มากชี้ urinoma, เลือดเก่าคือ hematoma, มีไข้และ culture บวกคือ abscess และทุกชนิดต้องดูว่ากด ureter หรือหลอดเลือดของ graft หรือไม่"]
    ]}
  ]}

  ],
  sources: "ACR Appropriateness Criteria, ACR-NKF consensus on iodinated contrast 2020 (Davenport, Radiology 2020), ACR-NKF consensus on gadolinium 2021 (Weinreb, Radiology 2021), Bosniak classification 2019 (Silverman, Radiology 2019), Pei unified ultrasound criteria (JASN 2009), Pei MRI criteria (JASN 2015), Mayo imaging classification (Irazabal, JASN 2015), KDIGO 2017 CKD-MBD update, KDIGO 2025 ADPKD guideline, SFU hydronephrosis grading, SNMMI/EANM diuretic renography consensus, Radermacher NEJM 2001, Naesens NEJM 2013"
};
