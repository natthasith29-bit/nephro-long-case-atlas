/* KRT stratification overlay (Nov 2026): key "tree|node title" -> ["hd:s,pd:u,kt:u", note]. s = specific to that status, u = more likely or interpretation changes. Population trees (hd-, pd-, kt-, donor, failed-graft) are not tagged. */
window.KRT = {
"edema|Central vein / SVC obstruction": [
"hd:u",
"ประวัติ HD catheter หรือ pacemaker, arm swelling ฝั่ง AVF"
],
"weakness|Anemia / uremia": [
"hd:u,pd:u",
""
],
"weakness|Adrenal insufficiency": [
"kt:u",
"ผู้ป่วย KT ที่ได้ steroid นานเสี่ยง secondary adrenal insufficiency เมื่อหยุดหรือลดยาเร็ว หรือเมื่อเจ็บป่วยเฉียบพลัน"
],
"weakness|PRES / CNS lupus / vasculitis": [
"kt:u",
"ใน KT ให้คิด CNI เพิ่มจากสาเหตุทั่วไป (hypertension ยังเป็นสาเหตุหลักเช่นเดิม) และเกิดได้แม้ระดับยาปกติ"
],
"weakness|Uremic / diabetic / amyloid neuropathy": [
"hd:u,pd:u",
""
],
"weakness|Severe hypophosphatemia": [
"kt:u",
"หลัง KT ที่ graft ทำงานดี PTH และ FGF23 ที่ยังสูงทำ phosphate wasting"
],
"weakness|Drug / toxic myopathy": [
"kt:u",
""
],
"weakness|Uremic myopathy / sarcopenia": [
"hd:u,pd:u",
""
],
"rash|Calciphylaxis": [
"hd:u,pd:u",
"พบมากที่สุดใน dialysis โดยเฉพาะ HD แต่เกิดใน CKD ที่ยังไม่ dialysis และหลัง KT ได้"
],
"rash|Infective endocarditis": [
"hd:u",
"HD มี IE risk สูงจาก catheter และ cannulation, เชื้อที่พบบ่อยสุดคือ S. aureus และมักเป็น left-sided valve (mitral หรือ aortic) มากกว่า tricuspid"
],
"rash|Uremic pruritic dermatoses": [
"hd:u,pd:u",
""
],
"fever|Dialysis or transplant host": [
"hd:s,pd:s,kt:s",
""
],
"fever|Catheter-related bloodstream infection": [
"hd:s",
""
],
"fever|Infective endocarditis in HD": [
"hd:s",
""
],
"fever|PD peritonitis / exit site / tunnel infection": [
"pd:s",
""
],
"fever|Post-transplant infection by timeline": [
"kt:s",
""
],
"fever|PTLD": [
"kt:s",
""
],
"fever|Acute rejection with fever": [
"kt:s",
""
],
"fever|Tuberculosis (pulmonary / extrapulmonary)": [
"hd:u,pd:u,kt:u",
"Dialysis และ KT มี TB risk สูงกว่าประชากรทั่วไปหลายเท่า และ extrapulmonary TB พบบ่อย IGRA และ TST ไวลดลง ผลลบจึงไม่ตัด TB"
],
"fever|Infective endocarditis": [
"hd:u",
"HD มี IE risk สูงจาก catheter และ cannulation, เชื้อที่พบบ่อยสุดคือ S. aureus และมักเป็น left-sided valve (mitral หรือ aortic) มากกว่า tricuspid"
],
"fever|Renal cell carcinoma": [
"hd:u,pd:u,kt:u",
"Risk สูงใน acquired cystic kidney disease ตาม dialysis vintage และในไตเดิมของผู้ป่วย KT"
],
"dyspnea|Dialysis-related: under-dialysis, high-flow AVF": [
"hd:s,pd:s",
""
],
"dyspnea|Pericardial effusion / tamponade": [
"hd:u,pd:u",
"แยก uremic pericarditis (ก่อนหรือช่วงเริ่ม dialysis) กับ dialysis-associated pericarditis (inadequate dialysis หลังเริ่ม 8 สัปดาห์)"
],
"dyspnea|PD pleuroperitoneal leak (hydrothorax)": [
"pd:s",
""
],
"dyspnea|Uremic pleuritis": [
"hd:u,pd:u",
""
],
"dyspnea|Tuberculous pleuritis": [
"hd:u,pd:u,kt:u",
"Dialysis และ KT มี TB risk สูงกว่าประชากรทั่วไปหลายเท่า และ extrapulmonary TB พบบ่อย IGRA และ TST ไวลดลง ผลลบจึงไม่ตัด TB"
],
"dyspnea|Opportunistic pneumonia in KT or immunosuppressed GN": [
"kt:u",
"ไล่ตาม timeline หลัง KT และ prophylaxis ที่ได้"
],
"dyspnea|Drug-induced pneumonitis": [
"kt:u",
""
],
"dyspnea|Pulmonary HT in kidney failure and dialysis": [
"hd:u,pd:u",
""
],
"bonepain|Secondary / tertiary hyperparathyroidism (high-turnover ROD)": [
"hd:u,pd:u,kt:u",
"Dialysis: secondary HPT, หลัง KT: tertiary HPT กับ hypercalcemia"
],
"bonepain|Adynamic bone disease": [
"hd:u,pd:u",
""
],
"bonepain|Aluminum bone disease": [
"hd:u,pd:u",
"Dialysis: aluminum จากน้ำหรือ binder เก่า ดู tree water and dialysate-related complications"
],
"bonepain|Dialysis-related (beta-2 microglobulin) amyloidosis": [
"hd:s,pd:s",
""
],
"bonepain|Post-transplant bone disease / osteonecrosis": [
"kt:s",
""
],
"bonepain|Primary hyperoxaluria / oxalate osteopathy": [
"kt:u,hd:u,pd:u",
"Systemic oxalosis เกิดเมื่อ GFR ลดลง HD ปกติเอา oxalate ออกไม่พอ"
],
"bonepain|Osteoporosis in CKD": [
"hd:u,pd:u",
""
],
"bonepain|Glucocorticoid-induced osteoporosis": [
"kt:u",
"Bone loss เร็วที่สุดในปีแรกหลัง KT"
],
"bonepain|Vertebral osteomyelitis / spondylodiscitis": [
"hd:u",
"HD catheter bacteremia (S. aureus) เป็นแหล่งที่พบบ่อย"
],
"weightloss|Uremia / inadequate dialysis": [
"hd:s,pd:s",
""
],
"weightloss|Protein-energy wasting / MIA syndrome": [
"hd:u,pd:u",
""
],
"weightloss|PD-specific: early satiety, EPS": [
"pd:s",
""
],
"weightloss|Transplant-specific: CMV, PTLD, graft failure": [
"kt:s",
""
],
"weightloss|Tuberculosis": [
"hd:u,pd:u,kt:u",
"Dialysis และ KT มี TB risk สูงกว่าประชากรทั่วไปหลายเท่า และ extrapulmonary TB พบบ่อย IGRA และ TST ไวลดลง ผลลบจึงไม่ตัด TB"
],
"weightloss|Adrenal insufficiency": [
"kt:u",
"ผู้ป่วย KT ที่ได้ steroid นานเสี่ยง secondary adrenal insufficiency เมื่อหยุดหรือลดยาเร็ว หรือเมื่อเจ็บป่วยเฉียบพลัน"
],
"headache|PRES": [
"kt:u",
"ใน KT ให้คิด CNI เพิ่มจากสาเหตุทั่วไป (hypertension ยังเป็นสาเหตุหลักเช่นเดิม) และเกิดได้แม้ระดับยาปกติ"
],
"headache|CNS infection in KT or immunosuppressed": [
"kt:u",
""
],
"headache|Uremia / dysnatremia / hypercalcemia": [
"hd:u,pd:u",
""
],
"arthralgia|Gout": [
"kt:u",
"CNI (โดยเฉพาะ cyclosporine) และ diuretic ทำ hyperuricemia หลัง KT, เลี่ยง allopurinol หรือ febuxostat ร่วมกับ azathioprine เพราะทำ myelosuppression รุนแรง"
],
"arthralgia|Infective endocarditis": [
"hd:u",
"HD มี IE risk สูงจาก catheter และ cannulation, เชื้อที่พบบ่อยสุดคือ S. aureus และมักเป็น left-sided valve (mitral หรือ aortic) มากกว่า tricuspid"
],
"arthralgia|Dialysis-related amyloid arthropathy": [
"hd:s,pd:s",
""
],
"numbness|Uremic neuropathy": [
"hd:u,pd:u",
""
],
"numbness|Carpal tunnel syndrome": [
"hd:u,pd:u",
""
],
"numbness|Ischemic monomelic neuropathy": [
"hd:s",
""
],
"hemoptysis|Uremic platelet dysfunction / anticoagulation": [
"hd:u,pd:u",
""
],
"hemoptysis|Tuberculosis": [
"hd:u,pd:u,kt:u",
"Dialysis และ KT มี TB risk สูงกว่าประชากรทั่วไปหลายเท่า และ extrapulmonary TB พบบ่อย IGRA และ TST ไวลดลง ผลลบจึงไม่ตัด TB"
],
"hemoptysis|Fungal / nocardia in immunosuppressed": [
"kt:u",
""
],
"hemoptysis|Epistaxis from GPA or uremic bleeding": [
"hd:u,pd:u",
""
],
"cough|Tuberculosis / NTM": [
"hd:u,pd:u,kt:u",
"Dialysis และ KT มี TB risk สูงกว่าประชากรทั่วไปหลายเท่า และ extrapulmonary TB พบบ่อย IGRA และ TST ไวลดลง ผลลบจึงไม่ตัด TB"
],
"cough|Fungal / nocardia": [
"kt:u",
""
],
"cough|Septic emboli": [
"hd:u",
""
],
"cough|Drug or KT-related": [
"kt:u",
""
],
"cough|PJP / CMV pneumonitis": [
"kt:u",
"PJP มักเกิดหลังหยุด prophylaxis, หลังรักษา rejection หรือหลัง CMV infection แต่ไม่จำกัดเฉพาะช่วงนั้น"
],
"chestpain|Uremic pericarditis": [
"hd:u,pd:u",
"เกิดก่อนหรือภายใน 8 สัปดาห์หลังเริ่ม dialysis"
],
"chestpain|Dialysis-associated pericarditis": [
"hd:s,pd:s",
"เกิดหลังเริ่ม dialysis นานกว่า 8 สัปดาห์ สะท้อน inadequate dialysis หรือ volume overload แต่ยังต้องตัด infection, TB, SLE และ malignancy เหมือนผู้ป่วยทั่วไป"
],
"chestpain|Tuberculous pericarditis": [
"hd:u,pd:u,kt:u",
"Dialysis และ KT มี TB risk สูงกว่าประชากรทั่วไปหลายเท่า และ extrapulmonary TB พบบ่อย IGRA และ TST ไวลดลง ผลลบจึงไม่ตัด TB"
],
"chestpain|Malignant / radiation / uremic hemorrhagic tamponade": [
"hd:u,pd:u",
""
],
"chestpain|Pleuritis: lupus, uremic, TB, parapneumonic": [
"hd:u,pd:u,kt:u",
""
],
"chestpain|Esophagitis / PUD / herpes zoster": [
"kt:u",
"KT: CMV, HSV และ Candida esophagitis"
],
"palpitation|Hypocalcemia / dialysate shifts": [
"hd:u",
""
],
"palpitation|Atrial fibrillation in CKD / HD": [
"hd:u,pd:u",
""
],
"palpitation|Uremic cardiomyopathy / LVH": [
"hd:u,pd:u",
""
],
"syncope|Excessive UF / dry weight too low": [
"hd:s,pd:u",
""
],
"syncope|Uremic autonomic neuropathy": [
"hd:u,pd:u",
""
],
"syncope|Adrenal insufficiency": [
"kt:u",
"ผู้ป่วย KT ที่ได้ steroid นานเสี่ยง secondary adrenal insufficiency เมื่อหยุดหรือลดยาเร็ว หรือเมื่อเจ็บป่วยเฉียบพลัน"
],
"syncope|Aortic stenosis / HOCM / amyloid": [
"hd:u,pd:u",
"Calcific AS ใน dialysis ดำเนินโรคเร็วกว่าคนทั่วไป และทำ IDH"
],
"nausea|Uremia / inadequate dialysis": [
"hd:s,pd:s",
""
],
"nausea|Drug toxicity": [
"kt:u",
""
],
"nausea|Diabetic or uremic gastroparesis": [
"hd:u,pd:u",
""
],
"nausea|PD-related: peritonitis, high fill volume, EPS": [
"pd:s",
""
],
"nausea|CMV GI disease in KT": [
"kt:s",
""
],
"nausea|Raised ICP / PRES / hemorrhage": [
"kt:u",
""
],
"nausea|Dialysis disequilibrium syndrome": [
"hd:s",
""
],
"nausea|Adrenal insufficiency": [
"kt:u",
"ผู้ป่วย KT ที่ได้ steroid นานเสี่ยง secondary adrenal insufficiency เมื่อหยุดหรือลดยาเร็ว หรือเมื่อเจ็บป่วยเฉียบพลัน"
],
"diarrhea|MMF / mycophenolate": [
"kt:u",
""
],
"diarrhea|CMV colitis / C. difficile / norovirus in KT": [
"kt:s",
""
],
"diarrhea|TB enterocolitis / amebiasis / strongyloides": [
"kt:u",
"Strongyloides hyperinfection เกิดใน KT ที่ได้ steroid จึงควร screen ผู้ที่อยู่ใน endemic area (รวมไทย) ก่อน KT"
],
"abdomen|Tuberculous peritonitis": [
"pd:u,hd:u",
"ใน PD ต้องแยกจาก culture-negative peritonitis, effluent อาจเด่น lymphocyte หรือ PMN ก็ได้"
],
"abdomen|Nephrogenic ascites": [
"hd:s",
""
],
"abdomen|Renal cell carcinoma / angiomyolipoma": [
"hd:u,pd:u,kt:u",
"Risk RCC สูงใน ACKD และในไตเดิมหลัง KT"
],
"abdomen|Infection: TB, melioidosis abscess, visceral leishmaniasis": [
"hd:u,pd:u,kt:u",
""
],
"abdomen|PD-specific": [
"pd:s",
""
],
"abdomen|Encapsulating peritoneal sclerosis": [
"pd:s",
""
],
"abdomen|Hernia / leak / hemoperitoneum": [
"pd:u",
""
],
"abdpain|Mesenteric ischemia": [
"hd:u",
"HD เพิ่ม non-occlusive mesenteric ischemia หลัง IDH เข้ามาอีกสาเหตุหนึ่ง ส่วน embolic (AF) และ thrombotic cause ยังต้องคิดเท่าผู้ป่วยทั่วไป"
],
"abdpain|PD peritonitis": [
"pd:s",
""
],
"abdpain|EPS": [
"pd:s",
""
],
"abdpain|Perforation / surgical abdomen": [
"kt:u",
"Steroid กลบอาการและ sign ของ peritonitis ใน KT จึงต้อง imaging เร็วแม้ตรวจท้องไม่ชัด"
],
"abdpain|DKA / uremia / hypercalcemia / adrenal crisis": [
"hd:u,pd:u",
""
],
"abdpain|Acute pyelonephritis / graft pyelonephritis": [
"kt:u",
""
],
"gibleed|Uremic platelet dysfunction": [
"hd:u,pd:u",
""
],
"gibleed|Heparin / anticoagulant / antiplatelet": [
"hd:u",
""
],
"gibleed|Peptic ulcer / uremic gastritis": [
"hd:u,pd:u",
""
],
"gibleed|Calciphylaxis / lanthanum deposition / sevelamer injury": [
"hd:u,pd:u",
""
],
"gibleed|Angiodysplasia": [
"hd:u,pd:u",
""
],
"gibleed|CMV colitis / PTLD in KT": [
"kt:s",
""
],
"jaundice|Infiltrative: AL amyloid, sarcoidosis, TB, lymphoma": [
"hd:u,pd:u,kt:u",
""
],
"pruritus|CKD-associated pruritus (uremic pruritus)": [
"hd:u,pd:u",
""
],
"pruritus|Inadequate dialysis / high-flux": [
"hd:s,pd:s",
""
],
"pruritus|Calciphylaxis prodrome / NSF": [
"hd:u,pd:u",
""
],
"pruritus|Drug: opioid, ACEi, hydroxyethyl starch, allergy to dialyzer": [
"hd:u",
""
],
"cramps|Drug: denosumab, bisphosphonate, cinacalcet, foscarnet": [
"hd:u,pd:u",
"Denosumab ใน dialysis ทำ severe hypocalcemia ราว 41% ใน 12 สัปดาห์ (FDA boxed warning 2024)"
],
"cramps|Drug-induced renal Mg wasting": [
"kt:u",
""
],
"cramps|Intradialytic cramps": [
"hd:s",
""
],
"cramps|Low dialysate Na / Mg / K, carnitine deficiency": [
"hd:s",
""
],
"myalgia|Statin with interacting drug": [
"kt:u",
"Cyclosporine เพิ่มระดับ statin หลายเท่า"
],
"myalgia|Colchicine myoneuropathy": [
"kt:u",
"Cyclosporine (P-gp inhibitor) เพิ่มระดับ colchicine ชัดเจน, tacrolimus มีรายงานน้อยกว่า และ GFR ต่ำเพิ่ม toxicity อีกทางหนึ่ง"
],
"ams|Uremic and dialysis-related": [
"hd:u,pd:u",
""
],
"ams|Uremic encephalopathy": [
"hd:u,pd:u",
""
],
"ams|Dialysis disequilibrium syndrome": [
"hd:s",
""
],
"ams|Wernicke / thiamine deficiency": [
"hd:u,pd:u",
"Water-soluble vitamin ถูก dialyze ออก ร่วมกับกินน้อย"
],
"ams|Subdural hematoma": [
"hd:u",
"Heparin ระหว่าง HD, uremic platelet dysfunction และ fall"
],
"ams|PRES / hypertensive encephalopathy": [
"kt:u",
""
],
"ams|CNS infection in immunosuppressed": [
"kt:u",
""
],
"seizure|Uremia / dialysis disequilibrium": [
"hd:u,pd:u",
""
],
"seizure|PRES / CNI neurotoxicity": [
"kt:u",
"Tacrolimus (เกิดได้แม้ level ปกติ) หรือ BP สูงหลัง KT"
],
"seizure|Opportunistic CNS infection in KT": [
"kt:s",
""
],
"seizure|Subtherapeutic anticonvulsant after dialysis": [
"hd:s,pd:u",
""
],
"hearing|Uremic / dialysis-related SNHL": [
"hd:u,pd:u",
""
],
"eye|CMV retinitis in KT": [
"kt:s",
""
],
"eye|Tuberculosis / syphilis": [
"hd:u,pd:u,kt:u",
""
],
"eye|Endophthalmitis / fungal": [
"hd:u",
""
],
"sicca|Uremic xerostomia / fluid restriction in dialysis": [
"hd:u,pd:u",
""
],
"ent|Drug: MTX, mTOR inhibitor, MMF, NSAID": [
"kt:u",
""
],
"ent|Infection: HSV, CMV, histoplasmosis, syphilis": [
"kt:u",
""
],
"ent|Uremic bleeding / anticoagulation": [
"hd:u,pd:u",
""
],
"ent|Infectious sinusitis in high-risk host": [
"kt:u",
""
],
"ent|Invasive fungal sinusitis (mucormycosis, aspergillosis)": [
"kt:u,hd:u",
"Dialysis: deferoxamine (aluminum หรือ iron chelation) เพิ่ม risk mucormycosis, KT: immunosuppression และ PTDM"
],
"raynaud|Calciphylaxis (distal)": [
"hd:u,pd:u",
"พบมากที่สุดใน dialysis โดยเฉพาะ HD แต่เกิดใน CKD ที่ยังไม่ dialysis และหลัง KT ได้"
],
"raynaud|Dialysis access-related": [
"hd:s",
""
],
"raynaud|Hemodialysis access-induced distal ischemia (HAIDI, steal syndrome)": [
"hd:s",
""
],
"raynaud|Ischemic monomelic neuropathy": [
"hd:s",
""
],
"skinthick|Calcinosis / calciphylaxis plaques": [
"hd:u,pd:u",
"พบมากที่สุดใน dialysis โดยเฉพาะ HD แต่เกิดใน CKD ที่ยังไม่ dialysis และหลัง KT ได้"
],
"skinulcer|Calciphylaxis (calcific uremic arteriolopathy)": [
"hd:u,pd:u",
"พบมากที่สุดใน dialysis โดยเฉพาะ HD แต่เกิดใน CKD ที่ยังไม่ dialysis และหลัง KT ได้"
],
"skinulcer|Necrotizing infection / ecthyma / fungal": [
"kt:u",
""
],
"skinulcer|Diabetic foot / PAD / pressure ulcer": [
"hd:u,pd:u",
""
],
"bluetoe|Infective endocarditis": [
"hd:u",
"HD มี IE risk สูงจาก catheter และ cannulation, เชื้อที่พบบ่อยสุดคือ S. aureus และมักเป็น left-sided valve (mitral หรือ aortic) มากกว่า tricuspid"
],
"bluetoe|Calciphylaxis (distal)": [
"hd:u,pd:u",
"พบมากที่สุดใน dialysis โดยเฉพาะ HD แต่เกิดใน CKD ที่ยังไม่ dialysis และหลัง KT ได้"
],
"bluetoe|HIT / TTP / DIC": [
"hd:u",
"HD ได้ heparin ทุกรอบ"
],
"bluetoe|Peripheral arterial disease in CKD": [
"hd:u,pd:u",
""
],
"bleeding|Uremic platelet dysfunction": [
"hd:u,pd:u",
""
],
"bleeding|Heparin-induced thrombocytopenia": [
"hd:u",
"HD ได้ heparin ทุกรอบ ต้องคิดเมื่อ platelet ลดลงหรือ access และ circuit clot บ่อย"
],
"bleeding|Drug: linezolid, valganciclovir, MMF, azathioprine": [
"kt:u",
""
],
"bleeding|Anticoagulant accumulation": [
"hd:u,pd:u",
"Enoxaparin และ DOAC ที่ขับทางไต (dabigatran มากที่สุด, apixaban น้อยที่สุด) สะสมเมื่อ GFR ต่ำ"
],
"bleeding|Glucocorticoid excess / senile purpura": [
"kt:u",
""
],
"thrombosis|Heparin-induced thrombocytopenia": [
"hd:u",
"HD ได้ heparin ทุกรอบ ต้องคิดเมื่อ platelet ลดลงหรือ access และ circuit clot บ่อย"
],
"thrombosis|Myeloproliferative neoplasm / post-transplant erythrocytosis": [
"kt:u",
""
],
"thrombosis|Vascular access thrombosis / central vein stenosis": [
"hd:s",
""
],
"stroke|Anticoagulant / uremic bleeding / subdural": [
"hd:u,pd:u",
""
],
"stroke|Atrial fibrillation in CKD / dialysis": [
"hd:u,pd:u",
""
],
"stroke|Infective endocarditis": [
"hd:u",
"HD มี IE risk สูงจาก catheter และ cannulation, เชื้อที่พบบ่อยสุดคือ S. aureus และมักเป็น left-sided valve (mitral หรือ aortic) มากกว่า tricuspid"
],
"stroke|PRES": [
"kt:u",
"ใน KT ให้คิด CNI เพิ่มจากสาเหตุทั่วไป (hypertension ยังเป็นสาเหตุหลักเช่นเดิม) และเกิดได้แม้ระดับยาปกติ"
],
"backpain|Pyogenic spondylodiscitis / epidural abscess": [
"hd:u",
"HD catheter bacteremia (S. aureus) เป็นแหล่งที่พบบ่อย"
],
"backpain|Spinal TB (Pott disease)": [
"hd:u,pd:u,kt:u",
"Dialysis และ KT มี TB risk สูงกว่าประชากรทั่วไปหลายเท่า และ extrapulmonary TB พบบ่อย IGRA และ TST ไวลดลง ผลลบจึงไม่ตัด TB"
],
"backpain|Retroperitoneal hemorrhage / psoas abscess": [
"hd:u",
""
],
"backpain|Osteoporotic vertebral fracture / renal osteodystrophy": [
"kt:u,hd:u,pd:u",
""
],
"backpain|Destructive spondyloarthropathy (dialysis amyloid)": [
"hd:s,pd:s",
""
],
"lymphnode|Tuberculous lymphadenitis": [
"hd:u,pd:u,kt:u",
"Dialysis และ KT มี TB risk สูงกว่าประชากรทั่วไปหลายเท่า และ extrapulmonary TB พบบ่อย IGRA และ TST ไวลดลง ผลลบจึงไม่ตัด TB"
],
"lymphnode|EBV / CMV / toxoplasma": [
"kt:u",
""
],
"lymphnode|Transplant / drug": [
"kt:u",
""
],
"lymphnode|Post-transplant lymphoproliferative disorder": [
"kt:s",
""
],
"lymphnode|Serum sickness (ATG, rituximab)": [
"kt:u",
""
],
"cushingoid|Prescribed steroid in GN, LN, KT": [
"kt:u",
""
],
"cushingoid|CKD and dialysis effect on testing": [
"hd:u,pd:u",
"Dexamethasone suppression test และ 24-h UFC แปลผลยากใน dialysis, late-night salivary cortisol ใช้ได้ดีกว่า"
],
"cushingoid|Cyclosporine / HIV lipodystrophy / Cushingoid look of nephrotic": [
"kt:u",
""
],
"paroxysm|Metanephrine interpretation in CKD / dialysis": [
"hd:u,pd:u",
"Plasma free metanephrines สูงปลอมได้ใน CKD และ dialysis ใช้ cutoff สูงขึ้น หรือ plasma methoxytyramine ร่วม"
],
"paroxysm|Baroreflex failure / autonomic seizure / PRES": [
"kt:u",
""
],
"obesity|Drug-induced: steroid, antipsychotic, insulin, TZD": [
"kt:u",
""
],
"obesity|Obesity in dialysis and transplant": [
"hd:u,pd:u,kt:u",
""
],
"obesity|Transplant candidacy and outcomes": [
"kt:u,hd:u,pd:u",
""
],
"obesity|Sarcopenic obesity / obesity paradox in HD": [
"hd:u",
""
],
"wasting|Protein-energy wasting": [
"hd:u,pd:u",
""
],
"wasting|Uremic myopathy / vitamin D deficiency": [
"hd:u,pd:u",
""
],
"wasting|Inflammation / dialysis-related": [
"hd:u,pd:u",
""
],
"wasting|Glucocorticoid myopathy": [
"kt:u",
""
],
"wasting|Statin / colchicine myopathy": [
"kt:u",
""
],
"wasting|Chronic infection: TB, HIV": [
"hd:u,pd:u,kt:u",
""
],
"wasting|Neuropathy: diabetic amyotrophy, CIDP, uremic": [
"hd:u,pd:u",
""
],
"tremor|Calcineurin inhibitor neurotoxicity": [
"kt:u",
"Tremor มักสัมพันธ์กับ tacrolimus trough แต่เกิดได้ที่ระดับ therapeutic"
],
"tremor|Uremic asterixis / myoclonus": [
"hd:u,pd:u",
""
],
"rls|Iron deficiency": [
"hd:u,pd:u",
""
],
"rls|Uremic RLS": [
"hd:u,pd:u",
""
],
"rls|Uremic or diabetic neuropathy": [
"hd:u,pd:u",
""
],
"rls|Melatonin dysregulation / dialysis timing": [
"hd:u,pd:u",
""
],
"cytopenia|Iron deficiency (absolute or functional)": [
"hd:u,pd:u",
"HD เสียเลือดจาก circuit และ phlebotomy, functional iron deficiency จาก hepcidin สูง"
],
"cytopenia|ESA hyporesponsiveness": [
"hd:u,pd:u",
"ไล่ iron, inflammation, inadequate dialysis, hyperparathyroidism, aluminum, PRCA"
],
"cytopenia|Drug-induced marrow suppression": [
"kt:u",
""
],
"cytopenia|Parvovirus B19 PRCA in KT": [
"kt:s",
""
],
"cytopenia|Hypothyroidism / aluminum / copper deficiency": [
"hd:u,pd:u",
""
],
"cytopenia|Dialysis-associated hemolysis": [
"hd:s",
""
],
"cytopenia|Infection in KT: CMV, EBV, parvovirus": [
"kt:s",
""
],
"cytopenia|Dialysis-related blood loss": [
"hd:s",
""
],
"alp|Secondary / tertiary hyperparathyroidism": [
"hd:u,pd:u,kt:u",
"Dialysis: secondary HPT, หลัง KT: tertiary HPT กับ hypercalcemia"
],
"alp|Sarcoidosis / TB / granulomatous hepatitis": [
"hd:u,pd:u,kt:u",
""
],
"alp|Viral hepatitis flare (HBV reactivation)": [
"kt:u",
"HBsAg บวกต้องให้ antiviral prophylaxis ทุกราย ส่วน HBsAg ลบแต่ anti-HBc บวกให้ prophylaxis เมื่อได้ anti-CD20 หรือ regimen ที่ risk สูง นอกนั้น monitor HBV DNA, HBsAg และ ALT"
],
"nephrotic|Primary FSGS": [
"kt:u",
"Recurrence หลัง KT ราวหนึ่งในสาม อาจเกิดภายในวันแรก ๆ ต้องวางแผน plasma exchange"
],
"nephrotic|Genetic FSGS / podocytopathy": [
"kt:u",
"แทบไม่ recur หลัง KT ต่างจาก primary FSGS (ข้อยกเว้น: NPHS1 ที่เกิด anti-nephrin antibody หลัง KT และ NPHS2 บางราย)"
],
"nephrotic|Other secondary: sarcoid, IgG4-RD, thyroid, GVHD, post-KT de novo": [
"kt:u",
""
],
"rpgn|Atypical anti-GBM / post-KT anti-GBM in Alport": [
"kt:u",
""
],
"rpgn|C3 glomerulopathy (C3GN, DDD)": [
"kt:u",
"Recurrence หลัง KT พบบ่อยและเป็นสาเหตุ graft loss"
],
"hematuria|Infection: pyelonephritis, TB": [
"hd:u,pd:u,kt:u",
""
],
"hematuria|Hemorrhagic cystitis: BK virus, cyclophosphamide, radiation": [
"kt:u",
""
],
"proteinuria|NSAID, lithium, bisphosphonate, mTOR inhibitor": [
"kt:u",
""
],
"risingcr|Renal hemodynamic drugs": [
"kt:u",
"KT: CNI vasoconstriction ทำ Cr ขึ้นแบบ hemodynamic"
],
"tma|HIV, CMV, influenza, COVID-19": [
"kt:u",
""
],
"tma|Genetic complement dysregulation": [
"kt:u",
"aHUS recur หลัง KT สูงใน CFH variant ต้องวางแผน eculizumab หรือ ravulizumab"
],
"tma|Drug-induced TMA": [
"kt:u",
"KT: CNI และ mTOR inhibitor ทำ de novo TMA"
],
"tma|Transplant-associated TMA": [
"kt:u",
"คำนี้ใช้ทั้งกับ HSCT และ solid organ transplant ใน KT ต้องแยก AMR, CNI หรือ mTOR inhibitor TMA, recurrent หรือ de novo aHUS และ infection"
],
"oliguria|Obstruction of a solitary or transplanted kidney": [
"kt:u",
""
],
"pyuria|Allograft rejection / BK nephropathy": [
"kt:s",
""
],
"pyuria|Genitourinary tuberculosis": [
"hd:u,pd:u,kt:u",
"Dialysis และ KT มี TB risk สูงกว่าประชากรทั่วไปหลายเท่า และ extrapulmonary TB พบบ่อย IGRA และ TST ไวลดลง ผลลบจึงไม่ตัด TB"
],
"flank|Xanthogranulomatous pyelonephritis / renal TB": [
"hd:u,pd:u,kt:u",
""
],
"flank|Renal cell carcinoma": [
"hd:u,pd:u,kt:u",
"Risk สูงใน acquired cystic kidney disease ตาม dialysis vintage และในไตเดิมของผู้ป่วย KT"
],
"stone|Primary hyperoxaluria": [
"kt:u",
"Isolated KT ใน PH1 ทำให้ oxalate deposit ใน graft เร็ว ต้องพิจารณา liver-kidney หรือ RNAi"
],
"stone|APRT deficiency (2,8-dihydroxyadenine)": [
"kt:u",
"Crystal nephropathy recur ใน graft ถ้าไม่ได้ xanthine oxidase inhibitor (allopurinol หรือ febuxostat) ต่อเนื่อง"
],
"cysts|Acquired cystic disease": [
"hd:u,pd:u",
"พบมากขึ้นตาม dialysis vintage และเสี่ยง RCC"
],
"cysts|Acquired cystic kidney disease of dialysis": [
"hd:u,pd:u",
"พบมากขึ้นตาม dialysis vintage และเสี่ยง RCC"
],
"luts|GU tuberculosis": [
"hd:u,pd:u,kt:u",
"Dialysis และ KT มี TB risk สูงกว่าประชากรทั่วไปหลายเท่า และ extrapulmonary TB พบบ่อย IGRA และ TST ไวลดลง ผลลบจึงไม่ตัด TB"
],
"luts|BK virus hemorrhagic cystitis": [
"kt:u",
""
],
"luts|Transplant-specific": [
"kt:s",
""
],
"luts|Ureteric stricture / stent / lymphocele": [
"kt:u",
""
],
"luts|Defunctionalized bladder": [
"kt:u",
""
],
"polyuria|Recovery phase of ATN / post-transplant diuresis": [
"kt:u",
""
],
"hyperk|ENaC and MR blocking drugs": [
"kt:u",
"KT: TMP-SMX prophylaxis (ENaC block) ร่วมกับ CNI เป็นสาเหตุ hyperkalemia ที่พบบ่อย"
],
"hyperk|Calcineurin inhibitors": [
"kt:u",
"Tacrolimus และ cyclosporine ทำ hyperkalemia และ type 4 RTA ผ่าน NCC activation และ hypoaldosteronism และทำ renal Mg wasting ผ่านการลด TRPM6"
],
"hyperna|Sodium gain": [
"hd:u",
""
],
"hyperca|Tertiary hyperparathyroidism": [
"kt:u",
"Hypercalcemia ต่อเนื่องหลัง KT จาก autonomous parathyroid"
],
"hyperca|Tuberculosis and fungal infection": [
"hd:u,pd:u,kt:u",
""
],
"hypoca|Antiresorptive and calcimimetic drugs": [
"hd:u,pd:u",
"Denosumab ใน dialysis เสี่ยง severe hypocalcemia ต้องเฝ้า Ca ใกล้ชิด"
],
"phos|Binders and antacids": [
"hd:u,pd:u",
""
],
"phos|ADHR, ARHR and post-KT": [
"kt:u",
""
],
"mg|Calcineurin inhibitors": [
"kt:u",
"Tacrolimus และ cyclosporine ทำ hyperkalemia และ type 4 RTA ผ่าน NCC activation และ hypoaldosteronism และทำ renal Mg wasting ผ่านการลด TRPM6"
],
"nagma|Type 4 RTA (hypoaldosteronism)": [
"kt:u",
"ใน KT ให้คิด CNI และ TMP-SMX เพิ่มเป็นสาเหตุที่พบบ่อย ส่วนสาเหตุทั่วไป (DM, RAAS inhibitor, NSAID, heparin, obstruction) ยังต้องหาเช่นเดิม"
],
"nagma|PHA type 2 (Gordon syndrome) and CNI": [
"kt:u",
"CNI กระตุ้น NCC ทำภาพเหมือน Gordon ตอบสนอง thiazide"
],
"agma|Kidney failure and others": [
"hd:u,pd:u",
""
],
"agma|Uremic acidosis": [
"hd:u,pd:u",
""
],
"metalk|Dialysis-related alkalosis": [
"hd:s,pd:s",
""
],
"htn-young|Immunosuppressants and anticancer drugs": [
"kt:u",
""
],
"htn-emerg|Hypertensive encephalopathy and PRES": [
"kt:u",
""
],
"pregnancy|Kidney transplant recipient": [
"kt:s",
""
],
"pregnancy|Pregnancy on dialysis": [
"hd:s,pd:s",
""
],
"viral|HBV reactivation with immunosuppression": [
"kt:u",
"Anti-HBc บวกเสี่ยง reactivation โดยเฉพาะหลัง rituximab"
],
"viral|HCV in dialysis and KT": [
"hd:u,pd:u,kt:u",
"HD เป็นกลุ่มเสี่ยง HCV transmission ในหน่วย, DAA ใช้ได้ทุก stage และเปิดโอกาสรับไตจาก HCV-positive donor"
],
"elderly|Frailty and functional decline": [
"hd:u,pd:u",
"ผู้สูงอายุใน nursing home ที่เริ่ม dialysis (n = 3,702): ที่ 3 เดือน 61% เสียชีวิตหรือ functional status ลดลง และที่ 12 เดือนเสียชีวิต 58% คง function เดิมได้เพียง 13% (Kurella Tamura NEJM 2009)"
],
"elderly|Assisted PD and incremental dialysis": [
"pd:s,hd:u",
""
],
"elderly|Time-limited trial of dialysis": [
"hd:u,pd:u",
""
],
"elderly|Kidney transplantation in older adults": [
"kt:u",
""
],
"elderly|Advance care planning and dialysis withdrawal": [
"hd:u,pd:u",
""
],
"hypocomp|C3 glomerulopathy (C3GN, DDD)": [
"kt:u",
"Recurrence หลัง KT พบบ่อยและเป็นสาเหตุ graft loss"
],
"hydro|Genitourinary tuberculosis stricture": [
"hd:u,pd:u,kt:u",
"Dialysis และ KT มี TB risk สูงกว่าประชากรทั่วไปหลายเท่า และ extrapulmonary TB พบบ่อย IGRA และ TST ไวลดลง ผลลบจึงไม่ตัด TB"
],
"hydro|Transplant ureteric stenosis and BK virus": [
"kt:s",
""
]
};
