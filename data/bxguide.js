/* How to read a kidney biopsy for the long case (Nov 2026). Rendered by index.html guideView() on #n-bxread.
   Block types as data/imgguide.js: p, ul, ol, table {head, rows}, note, svg, model {title, text, why}, qa [[q,a]], sims [codes]. */
window.BXGUIDE = {
  title: "How to read a kidney biopsy",
  intro: "บทนี้สอนอ่านผล kidney biopsy ให้ครบทั้ง light microscopy ทุก stain, immunofluorescence, electron microscopy และ special stain ตั้งแต่ความพอเพียงของชิ้นเนื้อ ศัพท์ที่ต้องใช้ให้ถูก classification ที่ examiner ถาม ไปจนถึงประโยคตอบสอบที่ได้คะแนนเต็ม ให้อ่านด้วยลำดับเดียวกันทุกครั้ง: adequacy, LM ทีละ compartment, IF, EM แล้วจึงสรุปเป็น pattern, diagnosis, activity และ chronicity",
  sections: [

  {id:"principles", title:"1. Principles and the reading order", blocks:[
    {p:"Biopsy ไม่ได้ให้ diagnosis ด้วยตัวเอง แต่ให้ pattern of injury ที่ต้องรวมกับ clinical, serology และ IF/EM จึงจะได้ diagnosis ที่สมบูรณ์ รายงานที่ดีจึงมีสี่ส่วนเสมอ: diagnosis (โรค), pattern (ลักษณะทาง LM), activity (สิ่งที่ยังรักษาได้) และ chronicity (สิ่งที่แก้ไม่ได้แล้ว)"},
    {ol:[
      "Adequacy: cortex หรือ medulla, จำนวน glomeruli, จำนวน artery, มี tissue สำหรับ IF และ EM ครบหรือไม่",
      "Glomeruli: จำนวนทั้งหมด, จำนวนที่เป็น global sclerosis, segmental sclerosis, cellularity (mesangial, endocapillary), crescent ชนิดและจำนวน, necrosis, GBM (thickening, spike, double contour), deposit ที่เห็นบน LM",
      "Tubules: acute tubular injury, cast, crystal, tubulitis, inclusion, atrophy เป็นร้อยละ",
      "Interstitium: inflammation ชนิดของเซลล์ (lymphocyte, eosinophil, neutrophil, plasma cell, granuloma), edema, fibrosis เป็นร้อยละ",
      "Vessels: arteriosclerosis, arteriolar hyalinosis, vasculitis, thrombus, cholesterol cleft, onion skin, amyloid",
      "IF: แต่ละ reactant (IgG, IgA, IgM, C3, C1q, κ, λ, fibrinogen, albumin) ด้วย intensity 0-3+, pattern (granular หรือ linear) และ location",
      "EM: deposit (ตำแหน่ง, ขนาด, มี substructure หรือไม่), foot process effacement เป็นร้อยละ, GBM thickness และ texture, endothelium, inclusion",
      "สรุป: diagnosis, pattern, activity, chronicity และสิ่งที่ตัดออก"
    ]},
    {note:"ประโยคที่ examiner อยากได้ยินเสมอ: biopsy นี้ adequate หรือไม่, active lesion คืออะไรที่ตอบสนองต่อการรักษา, chronic lesion มากแค่ไหนที่บอก prognosis และควรหยุดกดภูมิหรือไม่"},
    {sims:["GN-02","GN-03"]}
  ]},

  {id:"adequacy", title:"2. Adequacy and the biopsy core", blocks:[
    {p:"ชิ้นเนื้อปกติแบ่งเป็นสามส่วน: ส่วนใหญ่ fix ใน formalin สำหรับ LM, ส่วนหนึ่งแช่แข็ง (หรือ Michel medium) สำหรับ IF และชิ้นเล็กมากใน glutaraldehyde สำหรับ EM ต้องมี glomeruli ในทุกส่วน มิฉะนั้นต้องทำ IF บน paraffin หรือ EM จาก paraffin ซึ่งแย่กว่า"},
    {table:{head:["Setting","Adequate","เหตุผล"], rows:[
      ["Native biopsy ทั่วไป","≥ 10 glomeruli และมี artery","ถ้า lesion อยู่ใน 10% ของ glomeruli ชิ้นที่มี 10 glomeruli มีโอกาสไม่เห็นเลยราว 35% (0.9^10)"],
      ["Focal lesion (FSGS, focal crescent)","≥ 20-25 glomeruli","20 glomeruli ลดโอกาสพลาดเหลือราว 12% (0.9^20)"],
      ["Lupus nephritis","≥ 10 glomeruli ตาม ISN/RPS","Class III กับ IV แยกที่ร้อยละ 50 ของ glomeruli ต้องมีจำนวนพอ"],
      ["Transplant (Banff)","≥ 10 glomeruli และ ≥ 2 arteries (minimum 7 และ 1)","Intimal arteritis (v) เป็น lesion ที่เปลี่ยน grade ของ TCMR"],
      ["Medulla only","ไม่ adequate สำหรับ GN","ใช้ได้กับ AIN, cast, papillary lesion"]
    ]}},
    {note:"เมื่อชิ้นเนื้อน้อย ให้พูดว่า 'ชิ้นเนื้อมี 6 glomeruli จึงตัด focal lesion เช่น FSGS ไม่ได้' นี่คือการตอบที่ได้คะแนนแม้ไม่มี diagnosis"}
  ]},

  {id:"lm", title:"3. Light microscopy: every routine stain", blocks:[
    {p:"Kidney biopsy ใช้ section บาง 2-3 µm ซึ่งบางกว่าชิ้นเนื้ออวัยวะอื่น จึงนับเซลล์ใน mesangium และดู GBM ได้ ทุกรายต้องมีอย่างน้อย H&E, PAS, silver (Jones หรือ PASM) และ trichrome หลายระดับ (serial sections)"},
    {table:{head:["Stain","ย้อมอะไร","ใช้ดูอะไรเป็นหลัก","Finding คลาสสิก"], rows:[
      ["H&E","Nuclei สีม่วง, cytoplasm และ matrix สีชมพู","ภาพรวม, inflammatory cell type (eosinophil, neutrophil, plasma cell), necrosis, tubular injury, viral inclusion","Eosinophil ใน AIN, karyorrhexis ใน necrotizing GN, hyaline thrombi ใน LN, cast ใน myeloma"],
      ["PAS (periodic acid-Schiff)","Glycoprotein และ basement membrane สีม่วงแดง, mesangial matrix","GBM และ TBM, mesangial matrix, hyalinosis, segmental sclerosis, brush border, tubular atrophy","Kimmelstiel-Wilson nodule PAS บวก, arteriolar hyalinosis, FSGS segmental lesion, loss of brush border ใน ATN, Tamm-Horsfall cast PAS บวก"],
      ["Jones methenamine silver (PASM)","Basement membrane และ collagen type IV สีดำ, deposit ไม่ติดสี","รายละเอียดของ GBM: spike, double contour, rupture ของ GBM และ Bowman capsule","Spike และ hole ใน MN, double contour (tram-track) ใน MPGN และ TMA, break ของ GBM ใน crescentic GN, KW nodule ติด silver แบบ lamellated ส่วน amyloid ลบ (มี spicule บน GBM) และ LCDD ลบหรือติดอ่อน"],
      ["Masson trichrome","Collagen สีน้ำเงินหรือเขียว, fibrin และ immune deposit สีแดง (fuchsinophilic)","Interstitial fibrosis, fibrinoid necrosis, fibrin ใน crescent, deposit ขนาดใหญ่","IFTA เป็นร้อยละ, fibrinoid necrosis ใน vasculitis และ TMA, subepithelial hump สีแดงใน IRGN, fibrous crescent สีน้ำเงิน"]
    ]}},
    {p:"วิธีจำ: H&E ดูเซลล์, PAS ดู matrix และ hyaline, silver ดู membrane, trichrome ดู fibrosis และ fibrin"},
    {table:{head:["Lesion","Definition ที่ถูกต้อง","ความหมาย"], rows:[
      ["Focal กับ diffuse","Focal < 50% ของ glomeruli, diffuse ≥ 50%","ใช้แยก LN class III กับ IV"],
      ["Segmental กับ global","Segmental < 50% ของ tuft, global ≥ 50%","Global sclerosis เพิ่มตามอายุ ราว (อายุ/2 − 10)% ยังถือว่าปกติ"],
      ["Mesangial hypercellularity","≥ 4 เซลล์ใน mesangial area เดียว (Oxford)","IgAN, LN class II, resolving IRGN"],
      ["Endocapillary hypercellularity","เซลล์ใน capillary lumen เพิ่มจนลูเมนแคบ (leukocyte, endothelial, mesangial)","Active lesion: IRGN, LN III/IV, MPGN, IgAN E1"],
      ["Crescent","Extracapillary proliferation > 10% ของเส้นรอบ Bowman capsule","Cellular > 75% เซลล์และ fibrin, fibrocellular 25-75%, fibrous > 75% matrix (ISN/RPS 2018)"],
      ["Fibrinoid necrosis","Fibrin ร่วม GBM rupture หรือ karyorrhexis","Active lesion ใน AAV, anti-GBM, LN"],
      ["Wire loop และ hyaline thrombi","Subendothelial deposit ขนาดใหญ่ (wire loop) และ intraluminal immune deposit (hyaline thrombi ซึ่งไม่ใช่ thrombus จริง)","LN class III และ IV (นับเป็น active lesion) และ cryoglobulinemic GN (pseudothrombi)"],
      ["Double contour","GBM สองชั้นจาก subendothelial new matrix","MPGN pattern, chronic TMA, transplant glomerulopathy"],
      ["Spike","GBM ยื่นระหว่าง subepithelial deposits บน silver","MN stage II"],
      ["Nodule","Mesangial nodule PAS บวก","DKD (KW), idiopathic nodular GS, MIDD, amyloid, fibrillary GN, fibronectin glomerulopathy (lobular MPGN ไม่นับเป็น nodule)"],
      ["Collapse","Tuft ยุบพร้อม podocyte hyperplasia (pseudocrescent)","Collapsing glomerulopathy (HIV, COVID-19, APOL1, interferon)"],
      ["Tip lesion","Segmental lesion ที่ tubular pole","FSGS tip variant ตอบสนอง steroid ดีที่สุด"],
      ["Tubulitis","Mononuclear cell อยู่ใน tubular epithelium (ด้านในของ TBM)","AIN และ TCMR (Banff t score) แต่ไม่จำเพาะ พบใน BK nephropathy และ pyelonephritis (neutrophil) ได้"],
      ["IFTA","Interstitial fibrosis ร่วม tubular atrophy เป็นร้อยละของ cortex","Prognosis: minimal < 10%, mild 10-25%, moderate 26-50%, severe > 50%"]
    ]}},
    {sims:["GN-02","GN-07"]}
  ]},

  {id:"if", title:"4. Immunofluorescence", blocks:[
    {p:"IF ทำบน frozen tissue ด้วย panel มาตรฐาน IgG, IgA, IgM, C3, C1q, κ, λ, fibrinogen และ albumin ใน transplant เพิ่ม C4d รายงานสามมิติทุกครั้ง: intensity (0, trace, 1+ ถึง 3+), pattern (granular หรือ linear) และ location (mesangial, capillary wall, TBM, vessel)"},
    {svg:"bxdep"},
    {table:{head:["IF pattern","นึกถึง","จุดยืนยัน"], rows:[
      ["Linear IgG ตาม GBM","Anti-GBM disease","Serum anti-GBM (ลบได้ในส่วนน้อย จึงไม่ใช้ผลลบตัดโรค), crescent อยู่ระยะเดียวกันทั้งหมด, linear IgG ยังพบได้ใน DKD (ติดร่วมกับ albumin ไม่ใช่ antibody) และ MIDD (มี light chain restriction)"],
      ["Granular capillary wall IgG กับ C3","MN","IgG4 dominant และ PLA2R บวกสนับสนุน primary MN แต่ทุกรายยังต้อง screen secondary cause และมะเร็งตามอายุ, IgG1-3 เด่น ร่วม C1q หรือมี mesangial และ subendothelial deposit ทำให้สงสัย secondary MN (lupus class V, malignancy) มากขึ้น"],
      ["Full-house (IgG, IgA, IgM, C3, C1q ทั้งหมด)","Lupus nephritis","เด่นใน class III, IV, V ส่วน class I-II อาจมีเพียง mesangial IgG, C3 และ C1q, พบได้ใน HIV-ICGN, IRGN บางราย และ full-house nephropathy ที่ ANA ลบ"],
      ["IgA dominant หรือ co-dominant mesangial","IgAN, IgAV","ต้องแยก IgA-dominant IRGN จาก Staphylococcus (C3 เด่นเท่าหรือมากกว่า IgA, มี hump, serum C3 ต่ำได้) และ secondary IgAN จาก liver cirrhosis, celiac disease"],
      ["C3 dominant: intensity ของ C3 มากกว่า Ig อื่น ≥ 2 orders of magnitude (เช่น C3 3+ กับ IgG ≤ 1+)","C3 glomerulopathy หรือ IRGN","Serum C3 ใน IRGN กลับปกติภายใน 8-12 สัปดาห์ ถ้ายังต่ำหรือโรคไม่หายให้คิด C3G, ทำ pronase IF หา masked monoclonal Ig โดยเฉพาะอายุ ≥ 50 ปี"],
      ["C1q dominant","C1q nephropathy, LN","เรียก C1q nephropathy ได้เมื่อไม่มีหลักฐาน SLE ทั้ง clinical และ serology (ANA ลบอย่างเดียวไม่พอ)"],
      ["Light chain restriction","AL amyloid (λ บ่อยกว่า κ ราว 3-4 เท่า), LCDD (κ ราว 80%), LCPT crystalline (κ เกือบทั้งหมด), PGNMID (IgG3κ บ่อยที่สุด), cast nephropathy (κ และ λ ใกล้เคียงกัน)","Linear κ ตาม GBM และ TBM ใน LCDD, amyloid ทุกรายควรยืนยันชนิดด้วย typing เพราะ IF light chain มีทั้งลบปลอมและบวกปลอม"],
      ["Pauci-immune (≤ 1+)","ANCA vasculitis, ANCA-negative pauci-immune GN","Fibrinogen บวกใน crescent และ necrosis"],
      ["Negative หรือ nonspecific IgM และ C3 ใน sclerosis","MCD, FSGS, TMA, DKD","Segmental IgM กับ C3 ใน sclerotic area คือ trapping ไม่ใช่ immune complex"],
      ["Granular TBM deposit","LN, IgG4-related TIN, anti-LRP2 nephropathy (ABBA disease), BK nephropathy บางราย","พบ TBM deposit ในส่วนใหญ่ของ IgG4-TIN, ส่วน anti-TBM nephritis ให้ linear IgG ตาม TBM ไม่ใช่ granular"],
      ["Linear albumin และ IgG ใน DKD","Nonspecific trapping ของ plasma protein ใน GBM และ TBM ที่หนา","Albumin ติดเข้มพอกับ IgG, ไม่มี crescent และ serum anti-GBM ลบ จึงไม่ใช่ anti-GBM disease"],
      ["C4d บน peritubular capillary","ABMR ใน transplant","บวกตาม Banff เมื่อ C4d2-3 บน IF (≥ 10% ของ PTC) หรือ C4d > 0 บน IHC, C4d ลบไม่ตัด ABMR และ C4d บวกโดยไม่มี injury พบได้ใน ABO-incompatible graft"]
    ]}},
    {table:{head:["Technique เสริม","เมื่อไรใช้","ผลที่ช่วย"], rows:[
      ["Paraffin IF หลัง pronase digestion","Frozen ไม่มี glomeruli หรือคิด masked deposit","เผย monoclonal Ig ใน C3G with MG และ MGRS"],
      ["IgG subclass (IgG1-4)","MN, PGNMID, monoclonal","IgG4 ใน PLA2R MN, IgG3 ใน PGNMID, IgG1 และ IgG3 ใน LN"],
      ["Tissue antigen ใน MN","MN ทุกราย โดยเฉพาะ PLA2R serum ลบ","PLA2R, THSD7A (malignancy), NELL1 (malignancy, mercury, lipoic acid), EXT1/EXT2 (lupus), SEMA3B (เด็ก), NCAM1 (lupus), PCDH7"],
      ["DNAJB9","สงสัย fibrillary GN","บวกเกือบทุกรายของ fibrillary GN จึงแทน EM ได้ในหลายกรณี"],
      ["Collagen IV α5 staining","สงสัย Alport","X-linked ชาย: α5 หายจาก GBM, Bowman capsule และ distal TBM. X-linked หญิง: mosaic. AR: α5 หายจาก GBM แต่ยังติดที่ Bowman capsule. ผลปกติไม่ตัด Alport แบบใดเลย (missense variant และ AD ติดสีปกติได้) จึงต้องทำ genetic test"]
    ]}},
    {sims:["GN-02","GN-06","GN-11"]}
  ]},

  {id:"em", title:"5. Electron microscopy", blocks:[
    {p:"EM ตอบสี่คำถาม: มี deposit หรือไม่และอยู่ตรงไหน, deposit มี substructure หรือไม่และขนาดเท่าไร, foot process effacement มากแค่ไหน และ GBM ปกติหรือไม่ บางโรคต้องอาศัย EM เป็นหลักในการวินิจฉัยทาง pathology เช่น thin GBM, Alport, DDD, MCD (ยืนยัน diffuse effacement โดยไม่มี deposit) และ fibrillary GN ก่อนยุค DNAJB9"},
    {table:{head:["ตำแหน่ง deposit","โรคที่พบ","ความหมาย"], rows:[
      ["Mesangial","IgAN, LN class I-II, resolving IRGN, C3G","Mesangial inflammation, proteinuria ไม่มาก"],
      ["Subendothelial","LN III-IV, MPGN, cryo, C3GN, PGNMID","อยู่ด้านเลือด กระตุ้น inflammation และ leukocyte จึงเป็น nephritic"],
      ["Subepithelial","MN, IRGN (hump), LN class V","อยู่ด้าน urinary space ทำลาย podocyte จึงเป็น nephrotic โดยไม่มี leukocyte infiltration (inflammation ใน IRGN มาจาก subendothelial และ mesangial deposit ที่อยู่ร่วมกับ hump)"],
      ["Intramembranous dense ribbon","Dense deposit disease","Osmiophilic transformation ของ lamina densa"],
      ["ไม่มี deposit","MCD, FSGS, TMA, DKD, Alport, anti-GBM disease, pauci-immune GN","ดู podocyte, GBM และ endothelium แทน"]
    ]}},
    {table:{head:["Feature อื่น","Finding","โรค"], rows:[
      ["Foot process effacement","Diffuse ≥ 80% ร่วม full-blown nephrotic syndrome","MCD และ primary FSGS (primary podocytopathy)"],
      ["Foot process effacement","Segmental (ส่วนใหญ่ < 50% ของ capillary surface) ร่วม serum albumin ปกติ","สนับสนุน secondary (maladaptive) FSGS แต่ overlap กับ primary และ genetic FSGS ได้ จึงไม่ใช้ EM อย่างเดียวตัดสิน"],
      ["GBM thickness","ผู้ใหญ่ปกติราว 300-450 nm, thin < 250 nm แบบ diffuse (เด็กใช้ cut-off ต่ำกว่านี้ตามอายุ)","Thin basement membrane nephropathy จาก COL4A3 หรือ COL4A4 heterozygous variant, พบใน early Alport และ X-linked carrier ได้"],
      ["GBM texture","Basket-weave lamellation, splitting, scalloping","Alport syndrome"],
      ["GBM thickening แบบ homogeneous","> 430 nm ชาย, > 395 nm หญิง","DKD class I (RPS)"],
      ["Endothelium","Subendothelial lucent widening, loss of fenestration","TMA, preeclampsia (endotheliosis)"],
      ["Tubuloreticular inclusion","Inclusion ใน endothelial cytoplasm","Interferon effect: SLE, HIV, interferon therapy"],
      ["MN staging (Ehrenreich-Churg)","I subepithelial deposit เล็ก, II spike, III deposit ถูก GBM ล้อม, IV deposit ถูก resorb","Stage บอกระยะเวลาโรค ไม่ใช่ prognosis โดยตรง"],
      ["Hump","Subepithelial deposit ขนาดใหญ่รูปโดม","IRGN, C3GN"],
      ["Viral particles","Polyomavirus ราว 40 nm (ช่วง 30-50 nm) ใน tubular nuclei","BK nephropathy"]
    ]}},
    {svg:"bxruler"},
    {table:{head:["Organized deposit","ขนาด","ลักษณะ","Stain ที่ยืนยัน"], rows:[
      ["Amyloid","8-12 nm","Fibril ตรง ไม่แตกแขนง เรียงแบบสุ่ม","Congo red บวก, AL ส่วนใหญ่เป็น λ, typing ด้วย LC-MS/MS ทุกราย"],
      ["Fibrillary GN","12-24 nm (หนากว่า amyloid)","Fibril เรียงแบบสุ่ม, Congo red ลบ (congophilic variant ส่วนน้อย)","DNAJB9 บวก, polyclonal IgG (IgG4 ร่วม IgG1 บ่อย)"],
      ["Immunotactoid GN","ส่วนใหญ่ > 30 nm (ช่วงที่รายงาน 14-60 nm)","Microtubule กลวงเรียงขนาน","IgG ที่ light chain restricted ราวสองในสาม (อีกหนึ่งในสาม polyclonal), หา CLL, lymphoma และ plasma cell clone"],
      ["Cryoglobulinemic GN","20-35 nm","Curved microtubule หรือ annular (หลายรายไม่เห็น substructure), intraluminal pseudothrombi","Serum cryoglobulin (ผลลบครั้งเดียวไม่ตัดโรค), หา HCV, HBV, autoimmune disease, lymphoma"],
      ["Fibronectin glomerulopathy","12-16 nm หรือ granular","Mesangial และ subendothelial deposit ขนาดใหญ่","Fibronectin IHC บวก, Ig ลบ"],
      ["Collagenofibrotic glomerulopathy","Banded collagen type III","Curved banded fibril","Collagen III staining"],
      ["Crystal","ไม่มีขนาดคงที่","Rhomboid หรือ needle ใน PT, podocyte หรือ histiocyte","LCPT, crystal-storing histiocytosis (κ เด่น)"]
    ]}},
    {sims:["GN-04","GN-11"]}
  ]},

  {id:"special", title:"6. Special stains and immunohistochemistry", blocks:[
    {table:{head:["Stain","ใช้เมื่อ","ผลบวกหมายถึง"], rows:[
      ["Congo red (section หนา 8-10 µm)","Nodule ที่ silver ลบ, nephrotic ผู้สูงอายุ, M-protein","Salmon-pink บน bright field และ apple-green birefringence ใต้ polarized light คือ amyloid"],
      ["Thioflavin T หรือ S","Screen amyloid","Fluorescence บวก ไวกว่าแต่จำเพาะน้อยกว่า Congo red"],
      ["Amyloid typing: LC-MS/MS หรือ immunogold","Congo red บวกทุกราย","แยก AL, AA, ALECT2, fibrinogen, TTR ซึ่งการรักษาต่างกันทั้งหมด"],
      ["Von Kossa และ alizarin red","Calcification ใน tubule","Calcium phosphate: acute phosphate nephropathy, nephrocalcinosis"],
      ["Polarized light","Crystal ใน tubule","Calcium oxalate birefringent (EG, enteric, primary hyperoxaluria), Ca phosphate ไม่ birefringent"],
      ["SV40 large T antigen IHC","Transplant ที่ Cr ขึ้น","Polyomavirus nephropathy (ส่วนใหญ่ BK, stain นี้ cross-react กับ JC virus) ยืนยันได้แม้ inclusion ไม่ชัด แต่ผลลบไม่ตัดโรคเพราะ lesion เป็นหย่อมและเด่นที่ medulla"],
      ["CMV และ adenovirus IHC","Inclusion ใน tubule","Viral nephritis"],
      ["EBER in situ hybridization, CD20, CD3","Infiltrate หนาแน่นใน transplant","PTLD ถ้า infiltrate เป็น B cell (CD20) เด่น atypical และ EBER บวก, TCMR เป็น T cell (CD3) เด่น, EBER ลบไม่ตัด PTLD (EBV-negative PTLD)"],
      ["C4d IHC หรือ IF","Transplant biopsy ทุกราย","C4d linear บน PTC = หลักฐาน antibody interaction ซึ่งเป็น 1 ใน 3 เกณฑ์ของ ABMR ไม่ใช่ ABMR โดยลำพัง และ C4d ลบไม่ตัด ABMR"],
      ["IgG4 IHC","Plasma cell-rich TIN, storiform fibrosis","สนับสนุน IgG4-TIN: IgG4+ plasma cell > 10 ต่อ HPF ใน field ที่หนาแน่นที่สุด ร่วมสัดส่วน IgG4+ ต่อ IgG+ plasma cell > 40% แต่ไม่จำเพาะ (พบใน AAV, Sjögren, lupus ได้) ต้องแปลร่วม histology, serology และ imaging"],
      ["Myoglobin และ hemoglobin IHC","Pigment cast","แยก rhabdomyolysis กับ hemolysis"],
      ["κ และ λ IHC หรือ ISH บน cast","Cast ไม่ปกติ fractured และมี giant cell","Light chain cast nephropathy (restricted)"],
      ["PLA2R, THSD7A, NELL1, EXT1 IHC","MN","ระบุ antigen และชี้ทาง secondary cause"],
      ["Elastic stain (EVG)","Vessel","Fibroelastic intimal thickening, แยก vasculitis เก่ากับ arteriosclerosis"],
      ["Prussian blue","Tubular pigment","Hemosiderin จาก chronic hemolysis หรือ PNH"],
      ["Ziehl-Neelsen, GMS, PAS-D","Granuloma","TB, fungal infection ก่อนสรุป sarcoid หรือ drug"],
      ["CD68","Glomerular hypercellularity","Monocyte-macrophage ใน cryoglobulinemic GN และ DKD foam cell"]
    ]}},
    {sims:["GN-04","KT-05","KT-06"]}
  ]},

  {id:"class", title:"7. Classifications and scores examiners ask", blocks:[
    {p:"Lupus nephritis: ISN/RPS 2003 classification ที่ปรับในปี 2018 (Bajema 2018) ร่วมกับ modified NIH activity และ chronicity index"},
    {table:{head:["Class","Definition"], rows:[
      ["I","Minimal mesangial: LM ปกติ, mesangial deposit บน IF หรือ EM"],
      ["II","Mesangial proliferative: mesangial hypercellularity กับ mesangial deposit"],
      ["III","Focal: endocapillary หรือ extracapillary lesion < 50% ของ glomeruli"],
      ["IV","Diffuse: ≥ 50% ของ glomeruli (ยกเลิก IV-S และ IV-G ในปี 2018)"],
      ["V","Membranous: subepithelial deposit แบบ global หรือ segmental, รวมกับ III หรือ IV ได้"],
      ["VI","Advanced sclerosing: ≥ 90% ของ glomeruli global sclerosis โดยไม่มี activity"]
    ]}},
    {table:{head:["Modified NIH activity index (0-24)","Score","Modified NIH chronicity index (0-12)","Score"], rows:[
      ["Endocapillary hypercellularity","0-3","Global หรือ segmental sclerosis","0-3"],
      ["Neutrophils และ karyorrhexis","0-3","Fibrous crescents","0-3"],
      ["Fibrinoid necrosis","0-3 × 2","Tubular atrophy","0-3"],
      ["Hyaline deposits (wire loop, hyaline thrombi)","0-3","Interstitial fibrosis","0-3"],
      ["Cellular หรือ fibrocellular crescents","0-3 × 2","",""],
      ["Interstitial inflammation","0-3","",""]
    ]}},
    {p:"IgA nephropathy: Oxford MEST-C 2016 (Trimarchi 2017) ใช้ร่วมกับ International IgAN Prediction Tool"},
    {table:{head:["Score","Definition"], rows:[
      ["M1","Mesangial hypercellularity ใน > 50% ของ glomeruli"],
      ["E1","Endocapillary hypercellularity ใน glomerulus ใดก็ได้"],
      ["S1","Segmental sclerosis หรือ adhesion ใน glomerulus ใดก็ได้ (บอก podocytopathy features ด้วย)"],
      ["T0, T1, T2","Tubular atrophy หรือ interstitial fibrosis ≤ 25%, 26-50%, > 50% ของ cortex"],
      ["C0, C1, C2","Cellular หรือ fibrocellular crescent (ไม่นับ fibrous): ไม่มี, อย่างน้อย 1 แต่ < 25%, ≥ 25% ของ glomeruli"]
    ]}},
    {table:{head:["Classification","Categories"], rows:[
      ["ANCA GN (Berden 2010)","Focal (≥ 50% normal glomeruli), crescentic (≥ 50% cellular crescents), mixed, sclerotic (≥ 50% global sclerosis) และ ANCA renal risk score (Brix 2018) ใช้ normal glomeruli, IFTA และ eGFR"],
      ["FSGS (Columbia 2004)","Collapsing, tip, cellular, perihilar, NOS และแบ่งตามสาเหตุ primary, genetic, secondary (maladaptive, viral, drug) และ FSGS of undetermined cause ตาม KDIGO 2021"],
      ["DKD (RPS, Tervaert 2010)","Class I GBM thickening, IIa mild และ IIb severe mesangial expansion, III nodular (KW อย่างน้อย 1), IV advanced (> 50% global sclerosis)"],
      ["MPGN และ C3G (2015 consensus)","แบ่งตาม IF: Ig-mediated (หา infection, autoimmune, monoclonal), complement-mediated (C3G: DDD และ C3GN) และ IF ลบ (chronic TMA ซึ่งเป็น endothelial injury ไม่ใช่ immune deposit)"],
      ["Mayo chronicity score (Sethi 2017)","Global sclerosis 0-3, tubular atrophy 0-3, interstitial fibrosis 0-3, arteriosclerosis 0-1 รวม 0-10: minimal 0-1, mild 2-4, moderate 5-7, severe 8-10"],
      ["Transplant (Banff 2022)","TCMR (i, t, v), active และ chronic active ABMR (g, ptc, C4d, DSA, cg), probable AMR, MVI DSA-negative C4d-negative, borderline, BK, chronic (ci, ct, cv, ah)"]
    ]}},
    {sims:["GN-08","GN-09","GN-10","KT-05"]}
  ]},

  {id:"patterns", title:"8. From pattern to diagnosis", blocks:[
    {p:"รวม LM, IF และ EM เป็น pattern แล้วแปลเป็นโรค ตารางนี้คือแกนที่ใช้ตอบทุก biopsy ใน long case"},
    {table:{head:["Disease","LM","IF","EM"], rows:[
      ["MCD","ปกติ","ลบ","Diffuse effacement ≥ 80%, ไม่มี deposit"],
      ["Primary FSGS","Segmental sclerosis (variant)","ลบ หรือ IgM และ C3 ใน sclerosis","Diffuse effacement"],
      ["MN","GBM หนา, spike บน silver","Granular IgG (IgG4 เด่น) และ C3 ตาม capillary wall, PLA2R บวกราว 70-80% ของ primary MN","Subepithelial deposit stage I-IV"],
      ["IgAN","Mesangial proliferation, MEST-C","IgA dominant mesangial","Mesangial deposit"],
      ["LN class IV","Endocapillary hypercellularity, wire loop หรือ crescent ใน ≥ 50% ของ glomeruli","Full-house, C1q เด่น","Subendothelial, mesangial, tubuloreticular inclusion"],
      ["ANCA GN","Necrotizing crescentic, fibrinoid necrosis","Pauci-immune","ไม่มี deposit หรือน้อยมาก"],
      ["Anti-GBM","Crescent ระยะเดียวกัน (same age) ในเกือบทุก glomerulus","Linear IgG","ไม่มี deposit, GBM break"],
      ["IRGN","Diffuse endocapillary, neutrophil","C3 เด่น (starry sky, garland), IgA ใน staph","Subepithelial hump"],
      ["C3G","MPGN หรือ mesangial proliferative","C3 เข้มกว่า Ig อื่น ≥ 2 orders of magnitude","DDD: intramembranous ribbon, C3GN: mesangial, subendothelial, subepithelial"],
      ["DKD","GBM หนา, mesangial expansion, KW nodule, hyalinosis","Linear IgG และ albumin (insudation)","GBM หนา homogeneous"],
      ["AL amyloidosis","Amorphous acellular, silver ลบ, Congo red บวก","Light chain restriction โดย λ บ่อยกว่า κ ราว 3-4 เท่า","Fibril 8-12 nm"],
      ["LCDD","Nodule PAS บวกแรงแต่ silver ลบหรืออ่อน, TBM หนา","Linear κ (ราว 80%) ตาม GBM, TBM และ vessel","Powdery punctate deposit ตาม inner GBM และ outer TBM"],
      ["Idiopathic nodular GS","เหมือน DKD (silver บวก lamellated) ในคนไม่มี DM","Linear IgG และ albumin, ไม่มี restriction","GBM หนา"],
      ["TMA","Thrombi, mesangiolysis, double contour, onion skin","ลบหรือ fibrin","Subendothelial lucent widening"],
      ["AIN","Interstitial inflammation, eosinophil, tubulitis","ลบ (ยกเว้น anti-TBM, LN)","ไม่จำเป็น"],
      ["Cast nephropathy","Fractured cast กับ giant cell reaction","Restricted κ หรือ λ ใน cast","ไม่จำเป็น"]
    ]}}
  ]},

  {id:"present", title:"9. How to present a biopsy in the long case", blocks:[
    {ol:[
      "Adequacy: จำนวน glomeruli, global sclerosis, artery",
      "LM ทีละ compartment ด้วยศัพท์ที่ถูก (focal หรือ diffuse, segmental หรือ global, crescent ชนิดใด)",
      "IF: reactant, intensity, pattern, location",
      "EM: deposit, effacement, GBM",
      "Diagnosis พร้อม classification หรือ score",
      "Activity กับ chronicity และความหมายต่อการรักษา",
      "สิ่งที่ตัดออกและ test ต่อที่ต้องการ"
    ]},
    {model:{title:"Membranous nephropathy", text:"ชิ้นเนื้อ adequate มี 18 glomeruli ไม่มี global sclerosis, LM พบ glomerular basement membrane หนาขึ้นแบบ diffuse และ silver stain เห็น spike โดยไม่มี hypercellularity หรือ crescent, IFTA น้อยกว่า 10% และ arteriosclerosis เล็กน้อย, IF เป็น granular IgG 3+ และ C3 2+ ตาม capillary wall โดย IgG4 เด่นและ PLA2R บวก, C1q ลบ, EM พบ subepithelial deposit stage II พร้อม diffuse foot process effacement ไม่มี subendothelial deposit หรือ tubuloreticular inclusion จึงสรุปเป็น PLA2R-associated primary membranous nephropathy, chronicity minimal แปลว่ายังมี parenchyma ที่รักษาไว้ได้มาก ส่วนจะให้ immunosuppression หรือไม่ตัดสินตาม risk stratification ของ KDIGO 2021 และ histology ไม่สนับสนุน lupus class V เพราะไม่มี full-house, C1q หรือ tubuloreticular inclusion ทั้งนี้ยังต้อง screen secondary cause และมะเร็งตามอายุแม้ PLA2R บวก", why:["บอก adequacy ก่อน","ใช้ stain ที่ถูกต้อง (spike บน silver)","ระบุ IgG subclass และ antigen ซึ่งช่วยแยก primary กับ secondary","สรุป chronicity และความหมายต่อการรักษา","บอกสิ่งที่ตัดออกพร้อมเหตุผล"]}},
    {model:{title:"ANCA-associated crescentic GN", text:"ชิ้นเนื้อมี 22 glomeruli, global sclerosis 2, normal glomeruli 6, cellular crescent ใน 12 glomeruli และ fibrous crescent ใน 2 glomeruli ร่วม segmental fibrinoid necrosis และ GBM rupture บน silver, interstitial inflammation ปานกลางร่วม IFTA ราว 15%, IF เป็น pauci-immune คือ Ig และ complement ไม่เกิน 1+ มี fibrinogen ใน crescent, EM ไม่พบ immune deposit จึงสรุปเป็น pauci-immune necrotizing and crescentic GN เข้าได้กับ ANCA-associated vasculitis (biopsy แยก MPO กับ PR3 ไม่ได้ ต้องดู serology), Berden class crescentic, lesion ส่วนใหญ่ active และ chronicity mild ซึ่งบอกว่ามีโอกาส recovery ถ้ารักษาเร็ว", why:["นับ normal glomeruli เพราะใช้ใน Berden และ ANCA renal risk score","แยก cellular กับ fibrous crescent เพื่อบอก activity","ยืนยัน pauci-immune ด้วยตัวเลข ≤ 1+"]}},
    {model:{title:"Lupus nephritis class IV with V", text:"มี 25 glomeruli, endocapillary hypercellularity ใน 15 glomeruli (60%) ร่วม wire loop, hyaline thrombi และ cellular crescent ใน 3 glomeruli, IF full-house โดย C1q 3+, EM พบ subendothelial และ subepithelial deposit ร่วม tubuloreticular inclusion จึงเป็น ISN/RPS class IV ร่วม V, modified NIH activity index 12 จาก 24 และ chronicity index 2 จาก 12 แปลว่า active สูง chronicity ต่ำ ควรได้ induction therapy เต็มที่", why:["คำนวณร้อยละของ glomeruli ก่อนให้ class","บอกทั้ง activity และ chronicity index","เชื่อม biopsy เข้ากับการตัดสินใจรักษา"]}},
    {model:{title:"Light chain cast nephropathy", text:"ชิ้นเนื้อมี 14 glomeruli ไม่มี glomerular lesion, tubule มี fractured eosinophilic cast ที่ PAS ลบหรือติดอ่อน ล้อมด้วย multinucleated giant cell และ acute tubular injury, IF บน cast แสดง κ restriction โดย λ ลบ, Congo red ลบ จึงเป็น κ light chain cast nephropathy ซึ่งเป็น myeloma-defining event และต้องเริ่ม clone-directed therapy เร็วเพื่อลด involved FLC", why:["แยก cast ปกติ (Tamm-Horsfall PAS บวก) กับ light chain cast","ยืนยัน restriction และตัด amyloid"]}}
  ]},

  {id:"pitfalls", title:"10. Pitfalls", blocks:[
    {ul:[
      "IgM และ C3 ใน segmental sclerosis คือ trapping ไม่ใช่ immune complex disease",
      "Linear IgG ใน DKD และ MIDD ไม่ใช่ anti-GBM ต้องดู light chain และ serology",
      "C3 dominant ไม่ได้แปลว่า C3G เสมอ IRGN ระยะท้ายและ masked monoclonal deposit ทำภาพเดียวกันได้ ต้องทำ pronase IF และติดตาม serum C3",
      "Global sclerosis จำนวนหนึ่งเป็นไปตามอายุ อย่าแปลเป็นโรคเมื่อไม่เกินที่คาด",
      "MCD กับ FSGS แยกกันไม่ได้ทุกครั้งเพราะ sampling error ชิ้นเนื้อที่มี glomeruli น้อยหรือไม่มี juxtamedullary glomeruli ตัด FSGS ไม่ได้",
      "Congo red ต้องดูใต้ polarized light และตัดหนา 8-10 µm เพราะ section ที่บางเกินให้ผลลบปลอม",
      "Tubular injury อย่างเดียวไม่ได้อธิบาย nephrotic syndrome ต้องหา glomerular lesion",
      "Biopsy ที่เป็น medulla อย่างเดียวห้ามสรุปว่าไม่มี GN"
    ]}
  ]},

  {id:"kt", title:"11. Transplant biopsy", blocks:[
    {p:"Biopsy ของไตปลูกถ่ายอ่านด้วยลำดับเดียวกับ native แต่ต้องให้คะแนน Banff lesion ทุกข้อ ย้อม C4d และ SV40 ทุกราย และตอบให้ได้ว่าเป็น rejection ชนิดใด หรือเป็นสาเหตุอื่นที่ต้องลดยากดภูมิแทนการเพิ่ม"},
    {ol:[
      "Adequacy ตาม Banff: ≥ 10 glomeruli และ ≥ 2 arteries (minimum 7 และ 1)",
      "Antibody-mediated: g, ptc, C4d, v, TMA, cg และ PTC multilayering บน EM",
      "T cell-mediated: i และ t ใน non-scarred cortex, v ใน artery แล้วดู ti (inflammation ทั้ง cortex), i-IFTA และ t-IFTA ใน scarred cortex",
      "Infection: SV40 (BK), neutrophil cast (pyelonephritis), CMV และ adenovirus inclusion",
      "Drug: isometric vacuolization, arteriolar myocyte necrosis, nodular arteriolar hyalinosis (CNI), eosinophil (drug AIN)",
      "Glomerular disease: IF และ EM หา recurrent หรือ de novo GN",
      "Chronic: ci, ct, cv, ah และ IFTA grade",
      "สรุปเป็น Banff category พร้อม score ทุกข้อและ DSA"
    ]},
    {table:{head:["Arteriolar hyalinosis","ตำแหน่งของ hyaline","ลักษณะ","สาเหตุ"], rows:[
      ["CNI","Peripheral (outer media) แทนที่ myocyte","Nodular beaded","Chronic CNI nephrotoxicity"],
      ["Hypertension และ aging","Subendothelial","Circumferential ต่อเนื่อง","Donor หรือ recipient HTN"],
      ["Diabetes","Afferent และ efferent arteriole","Subendothelial, hyalinosis ของ efferent arteriole ค่อนข้างจำเพาะต่อ DM","Recurrent หรือ de novo DKD ใน graft"]
    ]}},
    {table:{head:["คำถาม","Lesion ที่ตอบ","Score"], rows:[
      ["มี antibody ทำร้าย endothelium หรือไม่","Glomerulitis, peritubular capillaritis, C4d","g, ptc, C4d"],
      ["มี T cell rejection หรือไม่","Interstitial inflammation, tubulitis","i, t"],
      ["Rejection รุนแรงถึง artery หรือไม่","Intimal หรือ transmural arteritis","v"],
      ["Chronic antibody injury หรือไม่","Double contour, PTC multilayering","cg, ptcml"],
      ["เหลือ nephron เท่าไร","Fibrosis และ atrophy","ci, ct, IFTA grade"]
    ]}},
    {model:{title:"Active antibody-mediated rejection", text:"ชิ้นเนื้อ adequate มี 16 glomeruli และ 3 arteries, พบ glomerulitis g2 และ peritubular capillaritis ptc2 รวม MVI 4, ไม่มี interstitial inflammation หรือ tubulitis ที่มีนัยสำคัญ (i0 t0), ไม่มี arteritis (v0), C4d บน IF เป็น C4d3 แบบ linear ตาม PTC, SV40 ลบ, ci1 ct1 cv0 cg0 และ EM ยังไม่มี GBM double contour ร่วมกับ class II DSA MFI 8,000 จึงเข้าเกณฑ์ Banff active ABMR ครบทั้งสามข้อ คือ histologic injury, antibody interaction และ DSA", why:["บอก score ทุกข้อเป็นตัวเลข","บอกว่าครบเกณฑ์สามข้อของ Banff อย่างไร","ระบุว่าตัด BK และ chronic lesion แล้ว"]}},
    {model:{title:"Acute TCMR grade IIA", text:"มี 12 glomeruli และ 2 arteries, interstitial inflammation 40% ของ non-scarred cortex (i2), tubulitis 6 เซลล์ต่อ tubular cross-section (t2) และ intimal arteritis ที่ทำให้ lumen เสียไปน้อยกว่า 25% ใน 1 artery (v1), g0 ptc0, C4d0, DSA ลบ, SV40 ลบ, ci0 ct1 จึงเป็น acute TCMR Banff grade IIA เพราะ arteritis กำหนด grade เหนือ i และ t ซึ่งบอกว่าควรได้ ATG โดยมักให้ร่วมกับ steroid pulse", why:["อธิบายว่าทำไม v1 ทำให้เป็น grade II","ตัด BK ก่อนสรุป rejection","เชื่อม grade กับการรักษา"]}},
    {note:"Approach line 'Transplant biopsy (Banff)' ในหมวดนี้มีตาราง Banff lesion score, TCMR grade, ABMR criteria, BK class และ recurrence ครบ ส่วนทุก pattern line มี branch 'In the transplant kidney' ที่บอกว่า pattern เดียวกันในไตปลูกถ่ายต้องคิดอะไรเพิ่ม"},
    {sims:["KT-05","KT-06","KT-08","KT-12"]}
  ]},

  {id:"viva", title:"12. Examiner questions and full-mark answers", blocks:[
    {qa:[
      ["ทำไม kidney biopsy ต้องมีทั้ง LM, IF และ EM","LM บอก pattern of injury, IF บอกชนิดของ immune reactant และ EM บอกตำแหน่งของ deposit และ ultrastructure หลายโรคต้องใช้ทั้งสาม เช่น MCD ที่ LM และ IF ปกติ ต้องอาศัย EM ยืนยัน diffuse effacement โดยไม่มี deposit และ fibrillary GN แยกจาก amyloid ด้วยขนาด fibril, Congo red และ DNAJB9"],
      ["Silver stain ใช้ดูอะไร","Silver ย้อม basement membrane เป็นสีดำโดย deposit ไม่ติดสี จึงเห็น spike และ hole ใน MN, double contour ใน MPGN และ TMA และ GBM rupture ใน crescentic GN และช่วยแยก nodule ได้: KW nodule ของ DKD และ idiopathic nodular GS ติด silver แบบ lamellated ส่วน amyloid ไม่ติด (เห็น spicule บน GBM) และ LCDD ไม่ติดหรือติดอ่อน"],
      ["Trichrome ใช้ดูอะไร","ดู interstitial fibrosis (สีน้ำเงินหรือเขียว) เพื่อให้คะแนน IFTA และดู fibrin หรือ deposit ขนาดใหญ่ที่เป็นสีแดง เช่น fibrinoid necrosis และ subepithelial hump"],
      ["แยก cellular, fibrocellular และ fibrous crescent อย่างไร และสำคัญอย่างไร","ตาม ISN/RPS 2018 cellular มีเซลล์และ fibrin > 75%, fibrocellular 25-75%, fibrous มี matrix > 75% โดย cellular crescent เป็น active lesion ที่ตอบสนองต่อการรักษา fibrous crescent เป็น chronic lesion ที่ไม่กลับคืน"],
      ["Subendothelial กับ subepithelial deposit ให้ clinical ต่างกันอย่างไร","Subendothelial อยู่ด้านเลือด กระตุ้น complement และ leukocyte จึงทำ nephritic syndrome ส่วน subepithelial อยู่ด้าน urinary space ไม่สัมผัสเซลล์อักเสบ ทำลาย podocyte จึงทำ nephrotic syndrome"],
      ["Full-house IF แต่ ANA ลบ คิดอะไร","Full-house nephropathy ที่ ANA ลบ ให้คิด seronegative lupus ที่อาจแสดงอาการภายหลัง, HIV-associated immune complex GN, IRGN, HCV และ drug ควรติดตาม ANA ซ้ำ"],
      ["Amyloid กับ fibrillary GN แยกอย่างไร","Amyloid fibril 8-12 nm, Congo red บวก มี apple-green birefringence และต้อง typing ด้วย LC-MS/MS ส่วน fibrillary GN fibril 12-24 nm, Congo red ลบเกือบทุกราย (congophilic variant ส่วนน้อย) และ DNAJB9 บวก ซึ่งเป็นตัวตัดสินเมื่อขนาด fibril ซ้อนทับกัน"],
      ["Biopsy ใน transplant ต่างจาก native อย่างไร","อ่านตาม Banff ด้วย lesion score (i, t, v, g, ptc, cg, ci, ct, cv, ah) ต้องมี C4d และ SV40 ทุกราย และต้องมีอย่างน้อย 10 glomeruli กับ 2 arteries จึงจะ adequate"],
      ["IFTA 60% หมายความว่าอย่างไรต่อการรักษา","เป็น chronicity ระดับ severe ซึ่งบอก prognosis แย่และ eGFR ไม่น่ากลับมามาก การกดภูมิเพิ่มให้ประโยชน์น้อยและเสี่ยงมาก ยกเว้นยังมี active lesion ชัด เช่น cellular crescent หรือ necrosis"],
      ["Tubulitis ใน graft แต่ SV40 บวก จะรักษาแบบ TCMR หรือไม่","ไม่ควรรักษาเป็น TCMR ก่อน เพราะ inflammation ส่วนใหญ่มาจาก BK nephropathy การเพิ่ม steroid จะทำให้ไวรัสลามมากขึ้น ให้ลด immunosuppression ตาม plasma BK load และพิจารณา TCMR ร่วมเฉพาะเมื่อมี intimal arteritis หรือ inflammation ในบริเวณที่ไม่มี viral cytopathic change"],
      ["แยก transplant glomerulopathy กับ recurrent MPGN อย่างไร","ทั้งคู่มี double contour แต่ transplant glomerulopathy ไม่มี immune deposit บน IF และ EM มี PTC basement membrane multilayering และมักมี DSA ส่วน recurrent MPGN มี electron-dense deposit และ IF แสดง Ig หรือ C3"],
      ["ทำไม MN ต้องย้อม IgG subclass และ PLA2R ใน tissue","IgG4 dominant ร่วม PLA2R บวกสนับสนุน primary MN แต่ทุกรายยังต้อง screen secondary cause และมะเร็งตามอายุ ส่วน IgG1-3 dominant, C1q บวก หรือ antigen อื่น เช่น NELL1 และ THSD7A (สัมพันธ์กับ malignancy), EXT1 และ EXT2 (lupus) ทำให้ต้องค้นหา secondary cause ละเอียดขึ้น ซึ่งเปลี่ยน work-up และการรักษา"]
    ]}
  ]}

  ],
  sources: "ISN/RPS lupus nephritis classification revision (Bajema IM et al. Kidney Int 2018), Oxford MEST-C update (Trimarchi H et al. Kidney Int 2017), Berden AE et al. JASN 2010, Brix SR et al. Kidney Int 2018, Columbia FSGS classification (D'Agati VD et al. AJKD 2004), RPS DKD classification (Tervaert TW et al. JASN 2010), C3 glomerulopathy consensus (Pickering MC et al. Kidney Int 2013), MPGN and C3G classification (Sethi S et al. Kidney Int 2015), Mayo chronicity score (Sethi S et al. JASN 2017), Banff 2022 (Naesens M et al. Am J Transplant 2024), Banff BK nephropathy classification (Nickeleit V et al. JASN 2018), IKMG 2019 MGRS consensus, KDIGO 2021 glomerular diseases guideline, Raissian Y et al. JASN 2011 (IgG4-TIN)"
};
