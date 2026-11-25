/* Phase 1 Symptomatology extension B: neurological and eye, ear, nose and throat. */
window.TREES = window.TREES || {};

/* ===================== DIZZINESS AND VERTIGO ===================== */
TREES.dizziness = {
  must: [
    "หมุน (vertigo), จะเป็นลม (presyncope), เดินเซ (disequilibrium) หรือมึน ๆ ไม่จำเพาะ",
    "Timing: วินาทีตามท่าทาง, นาทีถึงชั่วโมงเป็นพัก ๆ, ต่อเนื่องหลายวัน",
    "Trigger: เปลี่ยนท่าศีรษะ, ลุกยืน, ระหว่างหรือหลังฟอก",
    "หูอื้อ, เสียงในหู, การได้ยินลดลง",
    "Diplopia, dysarthria, dysphagia, อ่อนแรง, ชา (5D ของ posterior circulation)",
    "Aminoglycoside (รวม intraperitoneal gentamicin ใน PD), loop diuretic, cisplatin",
    "Antihypertensive, alpha-blocker, gabapentinoid, sedative"
  ],
  tree: N("Dizziness and vertigo", "root", {
    s: "ใช้ timing และ trigger (TiTrATE) มากกว่าคำบรรยายของผู้ป่วย, acute vestibular syndrome ต่อเนื่องให้ทำ HINTS เพื่อแยก stroke",
    why: "ผู้ป่วยไตมี presyncope จาก IDH และ orthostatic hypotension, ototoxicity จาก aminoglycoside ใน PD peritonitis, และ stroke risk สูงจาก CKD",
    keys: ["Triggered episodic (BPPV, orthostatic) vs spontaneous episodic (Meniere, vestibular migraine, TIA) vs acute continuous (neuritis vs stroke)", "HINTS (ใช้เฉพาะ acute vestibular syndrome ที่ยังมีอาการและมี nystagmus): พบข้อใดข้อหนึ่งใน head impulse ปกติ, direction-changing nystagmus หรือ skew deviation ให้ถือว่า central", "Orthostatic vitals", "Hearing loss ร่วม"],
    ix: ["Orthostatic BP", "Dix-Hallpike, HINTS", "MRI brain with DWI ถ้าสงสัย central (CT ไม่พอ)", "Audiometry"],
    std: "Bárány Society ICVD definitions, TiTrATE approach (Newman-Toker 2015)"
  }, [
    N("Presyncope", "step", {
      s: "จะเป็นลม ตาลาย หน้ามืด",
      keys: ["เกิดเมื่อยืน", "ระหว่างหรือหลังฟอก", "ใจสั่นนำ"]
    }, [
      N("Orthostatic and intradialytic hypotension", "nephro", {
        s: "Volume depletion, antihypertensive, autonomic neuropathy, post-HD",
        keys: ["SBP ลด ≥ 20 หรือ DBP ≥ 10 mmHg ใน 3 นาทีหลังยืน", "HR เพิ่ม < 15 bpm ทั้งที่ BP ตก ชี้ neurogenic (DM, amyloid) ถ้าไม่ได้ beta-blocker หรือ rate-limiting drug", "หน้ามืดหลังลงจากเครื่องฟอก", "IDH: ทบทวน dry weight, UF rate และเวลากินยาลดความดันก่อน, midodrine ก่อนฟอกเป็นทางเลือกเสริม (หลักฐานจำกัด)"],
        ix: ["Orthostatic vitals, review UF และ dry weight"],
        link: "syncope"
      }),
      N("Arrhythmia", "nephro", {
        s: "Brady หรือ tachyarrhythmia",
        keys: ["Dizziness ขณะนั่งหรือนอนก็เกิด", "ใจสั่นนำ หรือหมดสติทันทีโดยไม่มี prodrome", "ปัจจัยส่งเสริม: hyperkalemia, hypokalemia หลังฟอก, digoxin, beta-blocker", "Sudden cardiac death risk สูงใน HD หลัง long interdialytic interval"],
        ix: ["ECG, Holter, K, Mg"],
        link: "palpitation"
      }),
      N("Anemia and hypoglycemia", "nephro", {
        s: "O2 delivery หรือ glucose ไม่พอ",
        keys: ["Anemia มักมีอาการเมื่อ Hb < 8 g/dL หรือ Hb ลดเร็ว (หา bleeding)", "Hypoglycemia: sweating, tremor, insulin หรือ sulfonylurea ใน CKD", "อาการดีขึ้นทันทีหลังกินน้ำตาล"],
        ix: ["Hb, glucose ณ ขณะมีอาการ"],
        link: "hypoglycemia"
      })
    ]),
    N("Peripheral vertigo", "step", {
      s: "Horizontal-torsional nystagmus ทิศเดียว ถูกกดด้วย fixation",
      keys: ["Head impulse ผิดปกติใน vestibular neuritis (ใน BPPV และ Meniere head impulse ปกติ)", "อาจมี hearing loss ร่วม (แต่ AICA infarct ก็มี hearing loss ได้)", "ไม่มี neurological deficit อื่น"]
    }, [
      N("Benign paroxysmal positional vertigo", "adj", {
        s: "Otoconia หลุดเข้า semicircular canal (posterior canal บ่อยที่สุด, horizontal canal รองลงมา)",
        keys: ["Vertigo < 1 นาทีเมื่อหันหรือพลิกตัวบนเตียง", "Dix-Hallpike (posterior canal): latency, upbeat torsional nystagmus, fatigable", "ไม่มี hearing loss ใหม่", "Epley maneuver รักษา posterior canal BPPV"],
        ix: ["Dix-Hallpike, supine roll test"],
        std: "AAO-HNS 2017 BPPV guideline"
      }),
      N("Vestibular neuritis and labyrinthitis", "adj", {
        s: "Acute continuous vertigo อาจตามหลัง viral illness (ไม่จำเป็นต้องมี)",
        keys: ["Vertigo ต่อเนื่องหลายวัน คลื่นไส้มาก", "Head impulse ผิดปกติ (corrective saccade) ชี้ peripheral เมื่อ nystagmus ทิศเดียวและไม่มี skew ร่วมด้วย (AICA infarct ก็ head impulse ผิดปกติได้)", "Labyrinthitis มี hearing loss ร่วม", "เดินได้แม้เซ (stroke มักเดินไม่ได้)"],
        ix: ["HINTS, audiometry"]
      }),
      N("Meniere disease", "adj", {
        s: "Endolymphatic hydrops",
        keys: ["Vertigo 20 นาทีถึง 12 ชั่วโมง", "Fluctuating low-frequency sensorineural hearing loss", "Tinnitus และหูอื้อ", "Diuretic ที่ใช้รักษา Meniere (thiazide, acetazolamide) ต้องระวัง volume depletion, hypokalemia และ acidosis ใน CKD"],
        ix: ["Audiometry"],
        std: "Bárány Society 2015 Meniere criteria",
        link: "hearing"
      }),
      N("Bilateral vestibulopathy from ototoxic drugs", "nephro", {
        s: "Gentamicin และ streptomycin (vestibulotoxic เด่น), amikacin (cochleotoxic เด่นกว่า)",
        why: "Aminoglycoside สะสมใน CKD และ intraperitoneal gentamicin ใน PD peritonitis ทำ vestibulotoxicity ได้แม้ระดับไม่สูง",
        keys: ["Oscillopsia (ภาพสั่นเวลาเดิน) และเดินเซในที่มืด มากกว่า vertigo", "Bilateral abnormal head impulse", "อาจไม่มี hearing loss", "Cumulative dose และ duration > 7-10 วัน เพิ่ม risk", "Mitochondrial MT-RNR1 m.1555A>G เพิ่ม susceptibility ต่อ aminoglycoside hearing loss (cochleotoxicity)"],
        ix: ["Video head impulse test, caloric test, audiometry"],
        link: "hearing"
      })
    ]),
    N("Central vertigo", "step", {
      s: "Neurological red flags หรือ HINTS central",
      keys: ["Direction-changing หรือ vertical nystagmus", "Skew deviation", "Severe truncal ataxia"]
    }, [
      N("Posterior circulation stroke and TIA", "nephro", {
        s: "Cerebellar หรือ brainstem infarct",
        why: "CKD, AF, DM, hypertension เพิ่ม stroke risk และ CT แรกรับมักปกติ",
        keys: ["ใน acute vestibular syndrome HINTS โดยผู้ที่ฝึกแล้ว sensitive กว่า MRI DWI ในช่วง 48 ชั่วโมงแรก ดังนั้น MRI ปกติช่วงแรกไม่ได้ตัด posterior circulation stroke", "5D: dizziness, diplopia, dysarthria, dysphagia, dystaxia", "Vertigo กับ new headache หรือ neck pain ชี้ vertebral dissection", "AICA infarct มี hearing loss ร่วม (อย่าหลงว่า peripheral)"],
        ix: ["MRI DWI, CTA หรือ MRA"],
        std: "AHA/ASA 2026 acute ischemic stroke guideline",
        link: "stroke"
      }),
      N("Vestibular migraine", "adj", {
        s: "Episodic vertigo กับ migraine features",
        keys: ["Vertigo 5 นาทีถึง 72 ชั่วโมง", "History migraine, photophobia ระหว่าง episode", "Interictal exam ปกติ"],
        ix: ["Clinical diagnosis"],
        std: "Bárány Society/ICHD-3 vestibular migraine criteria",
        link: "headache"
      }),
      N("Wernicke encephalopathy and drug toxicity", "nephro", {
        s: "Thiamine deficiency, phenytoin, lithium, metronidazole",
        keys: ["Thiamine ถูก dialyze ออก, PEW และ alcohol เพิ่ม risk", "Triad: ophthalmoplegia, ataxia, confusion (ครบน้อยกว่าหนึ่งในสาม)", "Lithium toxicity: coarse tremor, ataxia, confusion, NDI", "Metronidazole encephalopathy: dentate nucleus hyperintensity บน MRI"],
        ix: ["IV thiamine ทันทีโดยไม่รอผล ให้ก่อนหรือพร้อม glucose (ถ้า hypoglycemia ไม่ชะลอการให้ glucose), lithium level, MRI"],
        link: "gait"
      }),
      N("Demyelination and posterior fossa mass", "adj", {
        s: "MS, cerebellar tumor, hemangioblastoma (VHL)",
        keys: ["Young adult กับ episode neurological deficit อื่น", "Internuclear ophthalmoplegia", "VHL: cerebellar hemangioblastoma, RCC, kidney cyst, pheochromocytoma, erythrocytosis"],
        ix: ["MRI with gadolinium (eGFR < 30 หรือ dialysis ใช้ group II agent), VHL genetic test"],
        link: "cysts"
      })
    ]),
    N("Disequilibrium", "step", {
      s: "ยืนเดินไม่มั่นคง ไม่หมุน",
      keys: ["Romberg", "Neuropathy", "Multiple drugs"]
    }, [
      N("Peripheral neuropathy and multifactorial imbalance", "nephro", {
        s: "Diabetic และ uremic neuropathy, visual impairment, elderly",
        keys: ["Romberg positive", "Vibration และ proprioception ลด", "Falls ในผู้สูงอายุ dialysis", "Polypharmacy"],
        ix: ["NCS, B12"],
        link: "numbness"
      }),
      N("Drug accumulation with reduced GFR", "nephro", {
        s: "Gabapentin, pregabalin, benzodiazepine, antihistamine",
        keys: ["Ataxia, somnolence, myoclonus", "Dose ไม่ได้ปรับตาม eGFR", "ดีขึ้นหลังหยุดยาหรือหลังฟอก (gabapentin dialyzable)"],
        ix: ["Drug review"],
        link: "ams"
      })
    ])
  ])
};

/* ===================== GAIT DISTURBANCE AND ATAXIA ===================== */
TREES.gait = {
  must: [
    "Onset: acute, subacute (สัปดาห์), chronic progressive",
    "เซไปด้านใด, แย่ลงในที่มืด (sensory)",
    "Urinary incontinence, memory ลดลง (NPH triad)",
    "Alcohol, nitrous oxide, bariatric surgery, zinc supplement",
    "ยา: lithium, phenytoin, metronidazole, gabapentinoid, metoclopramide",
    "Dialysis vintage ยาว, aluminum binder, ปวดคอ",
    "Sodium correction เร็วล่าสุด",
    "Family history"
  ],
  tree: N("Gait disturbance and ataxia", "root", {
    s: "แยก pattern ของ gait ก่อน: cerebellar (wide-based), sensory (Romberg+), frontal (magnetic), parkinsonian (shuffling), weakness (waddling, steppage), แล้วหา lesion level",
    why: "ผู้ป่วยไตมีสาเหตุเฉพาะ: drug toxicity จาก clearance ลด, thiamine และ copper deficiency, osmotic demyelination หลัง Na correction, dialysis-related amyloid spondyloarthropathy, aluminum",
    keys: ["Romberg positive = sensory ataxia (proprioceptive) หรือ bilateral vestibulopathy, ส่วน cerebellar ataxia เซทั้งลืมตาและหลับตา", "Heel-shin และ dysdiadochokinesia = cerebellar", "Magnetic gait กับ incontinence และ dementia = NPH", "Waddling = proximal myopathy", "Steppage = foot drop"],
    ix: ["MRI brain และ spine", "B12, copper, zinc, thiamine, TSH, vitamin E", "Drug levels", "NCS/EMG"],
    std: "Pattern-based gait classification (Nutt 1993)"
  }, [
    N("Cerebellar ataxia", "step", {
      s: "Wide-based, nystagmus, dysarthria, intention tremor",
      keys: ["Acute vs chronic", "Midline (truncal) vs hemispheric (limb)"]
    }, [
      N("Toxic and drug-induced cerebellar syndrome", "nephro", {
        s: "Lithium, phenytoin, metronidazole, carbamazepine, alcohol",
        why: "Lithium สะสมเมื่อ GFR ลด, metronidazole metabolite สะสมใน ESKD และ toxicity ขึ้นกับ cumulative dose, phenytoin free level สูงใน uremia เพราะ albumin binding ลด",
        keys: ["Lithium: ใน chronic toxicity อาการชัดได้แม้ level ไม่สูงมาก, มี NDI ร่วม, หลังหายอาจเหลือ cerebellar deficit ถาวร (SILENT syndrome)", "Phenytoin: nystagmus ที่ free level สูงทั้งที่ total ปกติ", "Metronidazole: dysarthria, ataxia, MRI dentate nucleus symmetric", "Alcohol: midline anterior vermis atrophy, truncal ataxia"],
        ix: ["Lithium level, free phenytoin, MRI"],
        std: "EXTRIP 2015 lithium recommendations",
        link: "tremor"
      }),
      N("Cerebellar stroke and hemorrhage", "nephro", {
        s: "Acute ataxia กับ vomiting และ headache",
        keys: ["เดินไม่ได้ทันที", "Hemorrhage: risk เพิ่มจาก hypertension, anticoagulant และ heparin ระหว่าง HD", "Hydrocephalus และ brainstem compression ต้อง decompress"],
        ix: ["CT แล้ว MRI"],
        link: "stroke"
      }),
      N("Wernicke encephalopathy", "nephro", {
        s: "Thiamine deficiency",
        keys: ["Dialysis (thiamine dialyzable), PEW, alcohol, hyperemesis, bariatric", "Ophthalmoplegia, nystagmus, ataxia, confusion", "Lactic acidosis ที่อธิบายไม่ได้", "MRI: T2/FLAIR hyperintensity ที่ mammillary bodies, medial thalami, periaqueductal (MRI ปกติไม่ได้ตัดออก sensitivity ราวครึ่งเดียว)"],
        ix: ["ให้ IV thiamine ทันทีโดยไม่รอผล thiamine level หรือ MRI"],
        link: "ams"
      }),
      N("Paraneoplastic, autoimmune and hereditary ataxia", "adj", {
        s: "Anti-Yo, anti-Hu, anti-GAD, gluten ataxia, SCA, Friedreich",
        keys: ["Subacute severe pancerebellar syndrome ที่ progress ภายในไม่กี่สัปดาห์ถึง 3 เดือน ชี้ paraneoplastic", "Anti-Yo กับ ovarian และ breast cancer", "Friedreich: young onset, areflexia, cardiomyopathy, diabetes", "SCA: autosomal dominant, slow progressive"],
        ix: ["Paraneoplastic panel, anti-GAD, anti-tTG, genetic testing"]
      })
    ]),
    N("Sensory ataxia", "step", {
      s: "Romberg positive, แย่ลงในที่มืด, proprioception ลด",
      keys: ["Large-fiber loss", "Dorsal column vs nerve vs ganglion"]
    }, [
      N("Vitamin B12 and copper deficiency myelopathy", "nephro", {
        s: "Subacute combined degeneration",
        keys: ["B12: PPI, metformin, pernicious anemia, nitrous oxide", "Copper: bariatric surgery, zinc excess (zinc supplement ใน dialysis), enteropathy", "Spastic paraparesis กับ dorsal column loss", "Copper deficiency: anemia และ neutropenia คล้าย MDS", "MRI: dorsal column T2 hyperintensity (inverted V)"],
        ix: ["B12, MMA, homocysteine (ทั้งสองค่าสูงจาก GFR ต่ำเองได้ แปลผลยากใน CKD), copper, ceruloplasmin, zinc"],
        link: "cytopenia"
      }),
      N("Diabetic and uremic polyneuropathy", "nephro", {
        s: "Length-dependent sensorimotor neuropathy",
        keys: ["Stocking-glove sensory loss, ankle reflex หาย", "Uremic: restless legs ร่วม, ดีขึ้นหลัง adequate dialysis หรือ KT", "Diabetic: มักมี retinopathy และ DKD ร่วม", "Charcot foot"],
        ix: ["NCS, HbA1c, B12"],
        link: "numbness"
      }),
      N("Sensory neuronopathy", "nephro", {
        s: "Sjögren, paraneoplastic (anti-Hu), cisplatin, pyridoxine excess",
        keys: ["Non-length-dependent asymmetric sensory loss รวมหน้าและลำตัว", "Pseudoathetosis", "Sjögren: TIN, dRTA, cryoglobulin ร่วม", "Cisplatin: ototoxicity และ hypomagnesemia ร่วม"],
        ix: ["NCS (absent SNAP), anti-Ro, anti-Hu"],
        link: "sicca"
      }),
      N("Tabes dorsalis", "adj", {
        s: "Late neurosyphilis",
        keys: ["Lightning pain, Argyll Robertson pupil", "HIV co-infection", "Syphilis เป็นสาเหตุ MN ได้"],
        ix: ["VDRL, TPHA, CSF VDRL (จำเพาะแต่ sensitivity ต่ำ ผลลบไม่ได้ตัด neurosyphilis ดู CSF cell และ protein ร่วม)"],
        link: "viral"
      })
    ]),
    N("Myelopathy and spinal", "step", {
      s: "Spastic gait, sensory level, bladder involvement",
      keys: ["UMN signs ขา", "Sensory level", "Neck pain"]
    }, [
      N("Dialysis-related amyloid and destructive spondyloarthropathy", "nephro", {
        s: "β2-microglobulin amyloid มักพบเมื่อ dialysis vintage > 10 ปี",
        keys: ["Carpal tunnel สองข้าง, shoulder pain, bone cyst", "Cervical myelopathy จาก destructive spondyloarthropathy", "Vintage ยาว, low-flux dialyzer ในอดีต", "หลัง KT อาการปวดดีขึ้นและโรคหยุด progress แต่ amyloid deposit และ bone cyst ไม่ยุบ"],
        ix: ["MRI cervical spine, X-ray bone cyst"],
        link: "bonepain"
      }),
      N("Cervical spondylotic myelopathy and spinal infection", "adj", {
        s: "Degenerative หรือ epidural abscess, TB spine",
        keys: ["Hand clumsiness, Hoffmann sign", "Epidural abscess: back pain, fever, neurological deficit (ครบ triad ส่วนน้อย ไม่มีไข้ไม่ได้ตัดออก), risk จาก HD catheter bacteremia", "Pott disease: gibbus, cold abscess"],
        ix: ["MRI spine with contrast"],
        link: "backpain"
      }),
      N("HTLV-1 and HIV myelopathy", "adj", {
        s: "Tropical spastic paraparesis",
        keys: ["Slowly progressive spastic paraparesis กับ bladder dysfunction", "HTLV-1 ติดจาก donor ใน KT หรือผู้ป่วยมาจาก endemic area", "HIV vacuolar myelopathy"],
        ix: ["HTLV-1, HIV serology"]
      })
    ]),
    N("Frontal and extrapyramidal", "step", {
      s: "Shuffling, freezing, magnetic gait",
      keys: ["Cognitive decline", "Rigidity", "Tremor"]
    }, [
      N("Normal pressure hydrocephalus", "adj", {
        s: "Triad: gait, cognition, incontinence",
        keys: ["Gait นำก่อน, magnetic broad-based", "Ventriculomegaly (Evans index > 0.3) ที่มากเกินสัดส่วนของ cortical atrophy", "Gait ดีขึ้นหลัง large-volume tap test (30-50 mL) ทำนาย shunt response แต่ tap test negative ไม่ได้ตัดออก"],
        ix: ["MRI, CSF tap test"],
        std: "International NPH guidelines 2005, Japanese 2021",
        link: "cognition"
      }),
      N("Vascular parkinsonism and small vessel disease", "nephro", {
        s: "Lower body parkinsonism",
        why: "CKD และ hypertension ทำ cerebral small vessel disease มาก",
        keys: ["Lower-body predominant, broad-based", "ไม่มี resting tremor, ตอบสนอง levodopa น้อย", "White matter hyperintensity กว้าง"],
        ix: ["MRI brain"],
        link: "cognition"
      }),
      N("Drug-induced parkinsonism and Parkinson disease", "nephro", {
        s: "Metoclopramide, antipsychotic, Parkinson disease",
        keys: ["Metoclopramide สะสมใน CKD ทำ parkinsonism และ tardive dyskinesia", "Drug-induced มัก symmetric", "Parkinson: asymmetric resting tremor, ตอบสนอง levodopa", "Levodopa และ dopamine agonist ทำ orthostatic hypotension ซ้ำเติม IDH"],
        ix: ["Drug review, DaTscan ถ้าไม่แน่ใจ"],
        link: "tremor"
      }),
      N("Osmotic demyelination syndrome", "nephro", {
        s: "Na correction เร็วเกินใน chronic hyponatremia",
        why: "เป็นภาวะ iatrogenic ที่ examiner มักถามคู่กับ hyponatremia",
        keys: ["Biphasic: ดีขึ้นก่อนแล้วแย่ลง 2-6 วันหลังแก้ Na", "Dysarthria, dysphagia, quadriparesis, locked-in", "High ODS risk: Na ≤ 105 mmol/L, alcohol, malnutrition, hypokalemia, liver disease", "Limit การแก้ Na: 10 mmol/L ใน 24 ชั่วโมงแรก และ 8 mmol/L ต่อ 24 ชั่วโมงถัดไป, high risk ไม่เกิน 8 mmol/L ต่อ 24 ชั่วโมง (ODS เกิดได้แม้แก้ไม่เกิน limit ใน high risk)", "Extrapontine: parkinsonism, ataxia"],
        ix: ["MRI (อาจปกติได้ถึง 2-4 สัปดาห์แรก ถ้ายังสงสัยให้ทำซ้ำ)", "Review Na timeline"],
        std: "European 2014 hyponatremia guideline, US expert panel 2013 (Verbalis)",
        link: "hypona"
      })
    ]),
    N("Neuromuscular weakness", "step", {
      s: "Waddling หรือ steppage gait",
      keys: ["Proximal weakness", "Foot drop"]
    }, [
      N("Myopathy and electrolyte weakness", "nephro", {
        s: "Steroid, statin, hypokalemia, osteomalacia",
        keys: ["Waddling, ลุกจากเก้าอี้ลำบาก", "Flaccid weakness จาก hypokalemia มักเกิดเมื่อ K < 2.5 mmol/L", "Osteomalacia: bone pain กับ proximal weakness, ALP สูง, PO4 ต่ำ", "Steroid myopathy: CK ปกติ"],
        ix: ["CK, K, PO4, Ca, ALP, 25(OH)D"],
        link: "weakness"
      }),
      N("Mononeuritis and foot drop", "nephro", {
        s: "ANCA vasculitis, polyarteritis nodosa, cryoglobulinemia, diabetic, peroneal compression",
        keys: ["Vasculitic: foot drop ฉับพลันกับปวด", "Asymmetric multiple nerves (mononeuritis multiplex)", "ถ้ามี hematuria หรือ RPGN ร่วม ชี้ ANCA vasculitis หรือ cryoglobulinemia (classic polyarteritis nodosa ไม่ทำ GN)", "Peroneal compression palsy: ไม่ปวด, จากนั่งไขว่ห้างหรือน้ำหนักลดเร็ว"],
        ix: ["NCS, ANCA, cryoglobulin, HBV, HCV, nerve biopsy"],
        link: "numbness"
      })
    ])
  ])
};

/* ===================== COGNITIVE IMPAIRMENT AND DEMENTIA ===================== */
TREES.cognition = {
  must: [
    "Onset และ time course: ฉับพลัน (delirium), subacute สัปดาห์ถึงเดือน (rapidly progressive), หลายปี",
    "Domain ที่เสีย: memory, executive, language, behavior, visuospatial",
    "ADL และ IADL, safety ในการใช้ยาและการฟอก",
    "ยา: anticholinergic, benzodiazepine, gabapentinoid, opioid, H2 blocker",
    "Fall และ anticoagulant (subdural)",
    "Depression, sleep apnea, hearing loss",
    "Dialysis vintage, aluminum binder, adequacy",
    "Alcohol, HIV, syphilis, family history"
  ],
  tree: N("Cognitive impairment and dementia", "root", {
    s: "แยก delirium ก่อน แล้วหา reversible cause ก่อนสรุป neurodegenerative, rapidly progressive dementia ใช้ approach แยก",
    why: "Cognitive impairment พบในผู้ป่วย HD ราวครึ่งหนึ่งถึงสองในสาม, กระทบ consent, adherence, การเลือก modality และ conservative kidney management",
    keys: ["Delirium: fluctuating attention (CAM)", "Reversible: B12, thyroid, depression, drugs, NPH, subdural, hypercalcemia", "Rapidly progressive (ถึง dementia ภายใน 1-2 ปี ส่วนใหญ่ภายในสัปดาห์ถึงเดือน): prion, autoimmune encephalitis, PML", "MoCA < 26 จาก 30 = screen positive (ไม่ใช่การวินิจฉัย ปรับตามการศึกษา และแปลผลไม่ได้ขณะ delirium)"],
    ix: ["MoCA หรือ MMSE", "B12, TSH, Ca, glucose, Na, syphilis, HIV", "MRI brain", "EEG, CSF ใน rapidly progressive"],
    std: "NIA-AA 2011 and Alzheimer's Association Workgroup 2024 revised Alzheimer criteria, DSM-5 major neurocognitive disorder, AAN 2001 reversible dementia screen"
  }, [
    N("Reversible and secondary", "step", {
      s: "ต้องหาก่อนเสมอ",
      keys: ["Labs screen", "Drug review", "Imaging"]
    }, [
      N("Drug-induced cognitive impairment", "nephro", {
        s: "Anticholinergic burden, benzodiazepine, gabapentinoid, opioid, baclofen",
        keys: ["Baclofen สะสมใน CKD ทำ encephalopathy รุนแรง", "Anticholinergic burden score ≥ 3", "มักดีขึ้นภายในวันถึง 1-2 สัปดาห์หลังหยุดยา (ช้ากว่าเมื่อ GFR ต่ำ)", "Acyclovir และ cefepime neurotoxicity ใน CKD ทำ acute encephalopathy ที่ซ้อนบน cognitive impairment เดิม"],
        ix: ["Medication reconciliation"],
        std: "AGS Beers Criteria 2023",
        link: "ams"
      }),
      N("Chronic subdural hematoma", "nephro", {
        s: "Fall, anticoagulant, heparin ระหว่าง HD, alcohol",
        keys: ["Fluctuating cognition, headache, subtle hemiparesis", "Fall เล็กน้อยหลายสัปดาห์ก่อน", "Uremic platelet dysfunction เพิ่ม risk", "Isodense ในสัปดาห์ที่ 2-3 อาจพลาดบน CT"],
        ix: ["CT brain, MRI"],
        link: "stroke"
      }),
      N("Hypothyroidism, B12 deficiency and hypercalcemia", "nephro", {
        s: "Metabolic reversible causes",
        keys: ["Hypothyroid: slowness, hyponatremia, CK สูง", "B12: macrocytosis, neuropathy, dorsal column", "Hypercalcemia จาก calcitriol, calcium binder, tertiary HPT", "Hyponatremia เรื้อรังแบบ mild ก็ทำ cognition และ fall"],
        ix: ["TSH, B12, Ca, Na"],
        link: "hyperca"
      }),
      N("Depression and pseudodementia", "nephro", {
        s: "Depression พบในผู้ป่วย dialysis ราวหนึ่งในสี่",
        keys: ["ตอบ 'ไม่รู้' แทนการพยายาม", "Mood ต่ำนำ cognitive complaint", "Sleep และ appetite เปลี่ยน", "ตอบสนองต่อการรักษา depression"],
        ix: ["PHQ-9, BDI"]
      }),
      N("Normal pressure hydrocephalus", "adj", {
        s: "Gait, cognition, incontinence",
        keys: ["Gait นำ", "Ventriculomegaly", "Tap test positive"],
        ix: ["MRI, tap test"],
        link: "gait"
      }),
      N("Obstructive sleep apnea and hearing loss", "adj", {
        s: "Modifiable risk factors",
        keys: ["Snoring, daytime sleepiness, resistant HT", "Hearing loss เป็น modifiable risk ใหญ่ของ dementia", "Nocturnal hypoxemia"],
        ix: ["Polysomnography, audiometry"],
        link: "obesity"
      }),
      N("Hepatic encephalopathy", "adj", {
        s: "Chronic liver disease",
        keys: ["Asterixis, sleep inversion", "Precipitant: GI bleed, infection, constipation, sedative", "Ammonia สูงอย่างเดียวไม่ได้วินิจฉัยหรือบอก stage แต่ถ้า ammonia ปกติควรทบทวนการวินิจฉัย"],
        ix: ["West Haven grade"],
        std: "AASLD/EASL 2014 hepatic encephalopathy",
        link: "jaundice"
      })
    ]),
    N("Kidney-related and vascular", "step", {
      s: "สาเหตุที่จำเพาะหรือพบบ่อยขึ้นในไตวาย (สาเหตุทั่วไปในสาขาอื่นของ tree ยังต้องหาเท่าเดิม)",
      keys: ["Adequacy", "Aluminum", "Thiamine", "Vascular"]
    }, [
      N("Uremic cognitive impairment", "nephro", {
        s: "Inadequate dialysis หรือ advanced CKD",
        keys: ["Asterixis, myoclonus, slowing", "Kt/V ต่ำ, missed sessions", "ดีขึ้นหลังเพิ่ม dialysis dose หรือหลัง KT", "EEG diffuse slowing"],
        ix: ["Kt/V, BUN, EEG"],
        link: "ams"
      }),
      N("Vascular cognitive impairment", "nephro", {
        s: "Small vessel disease และ silent infarct",
        why: "CKD เป็น independent risk factor ของ cerebral small vessel disease, IDH ซ้ำ ๆ ลด cerebral perfusion",
        keys: ["Executive dysfunction และ processing speed ช้า มากกว่า memory", "Stepwise decline", "White matter hyperintensity, lacunes, microbleeds", "IDH ซ้ำ ๆ"],
        ix: ["MRI brain"],
        std: "VASCOG 2014, VICCCS 2018",
        link: "stroke"
      }),
      N("Fabry disease and mitochondrial disease", "nephro", {
        s: "Genetic vasculopathy",
        keys: ["Fabry: young stroke, acroparesthesia, angiokeratoma, proteinuria, LVH, pulvinar sign", "MELAS: stroke-like episodes, lactic acidosis, diabetes, deafness, FSGS", "Family history matrilineal ใน mitochondrial"],
        ix: ["α-Gal A, lyso-Gb3, GLA gene, mtDNA m.3243A>G"],
        link: "stroke"
      }),
      N("Dialysis encephalopathy from aluminum", "nephro", {
        s: "Aluminum จาก binder หรือ water treatment",
        keys: ["Speech apraxia, stuttering, myoclonus, seizure, dementia", "Microcytic anemia ที่ไม่ตอบสนอง iron", "Adynamic bone และ osteomalacia", "Serum Al 60-200 µg/L ให้ทำ DFO test (เพิ่ม ≥ 50 µg/L = positive), > 200 µg/L ไม่ทำ DFO test เพราะเสี่ยง neurotoxicity"],
        ix: ["Serum aluminum, DFO test, water quality report"],
        std: "KDOQI 2003 bone metabolism (aluminum), AAMI/ISO 23500 water quality",
        link: "hd-water"
      }),
      N("Wernicke-Korsakoff", "nephro", {
        s: "Thiamine deficiency",
        keys: ["Anterograde amnesia กับ confabulation", "Dialysis, PEW, alcohol", "Ataxia และ ophthalmoplegia ก่อนหน้า"],
        ix: ["Thiamine, MRI"],
        link: "gait"
      })
    ]),
    N("Neurodegenerative", "step", {
      s: "Progressive หลายปี หลังตัด reversible",
      keys: ["Memory นำ", "Behavior นำ", "Visual hallucination"]
    }, [
      N("Alzheimer disease", "adj", {
        s: "Amnestic presentation",
        keys: ["Episodic memory ลดก่อน", "Hippocampal atrophy", "CSF Aβ42 ต่ำ, p-tau สูง, amyloid PET", "Plasma p-tau217 ระวังแปลผลใน CKD (สูงขึ้นจาก clearance ลด)"],
        ix: ["MRI, CSF biomarker, amyloid PET"],
        std: "Alzheimer's Association Workgroup 2024 revised criteria (Jack 2024)"
      }),
      N("Lewy body and frontotemporal dementia", "adj", {
        s: "Non-amnestic dementia",
        keys: ["DLB: fluctuation, visual hallucination, REM sleep behavior, parkinsonism, sensitivity ต่อ antipsychotic", "FTD: disinhibition, apathy, มัก onset อายุ < 65", "DLB orthostatic hypotension ทำ IDH แย่ลง"],
        ix: ["MRI, DaTscan, FDG-PET"],
        std: "McKeith 2017 DLB criteria, Rascovsky 2011 bvFTD criteria"
      })
    ]),
    N("Rapidly progressive and inflammatory", "step", {
      s: "Decline ภายในสัปดาห์ถึงเดือน",
      keys: ["Seizure", "Myoclonus", "Immunosuppression"]
    }, [
      N("Progressive multifocal leukoencephalopathy", "nephro", {
        s: "JC virus reactivation ใน immunosuppression: HIV, hematologic malignancy, KT, rituximab, natalizumab",
        keys: ["Subacute focal deficit และ cognitive decline", "Asymmetric subcortical white matter lesions ไม่มี mass effect, มักไม่ enhance", "ในผู้ป่วยไต: rituximab ใน GN และ LN, MMF, belatacept", "JC virus PCR ใน CSF (ผลลบครั้งเดียวไม่ได้ตัดออก ให้ส่งซ้ำหรือ biopsy)"],
        ix: ["MRI, CSF JCV PCR"],
        link: "kt-fever"
      }),
      N("Autoimmune encephalitis and CNS lupus", "nephro", {
        s: "Anti-NMDAR, anti-LGI1, NPSLE, Hashimoto encephalopathy",
        keys: ["Psychiatric, seizure, memory loss ที่ progress ภายใน 3 เดือน", "Anti-LGI1: faciobrachial dystonic seizure, hyponatremia", "NPSLE: มักมี lupus activity อื่นหรือ aPL ร่วม แต่เกิดเดี่ยวได้ และต้องตัด infection, drug, metabolic ก่อน", "Hashimoto encephalopathy: diagnosis of exclusion ที่ตอบสนอง steroid (anti-TPO สูงไม่จำเพาะ พบในคนปกติได้)"],
        ix: ["CSF, autoimmune encephalitis panel, MRI, EEG, aPL"],
        std: "Graus 2016 autoimmune encephalitis criteria",
        link: "seizure"
      }),
      N("Neurosyphilis and HIV-associated neurocognitive disorder", "adj", {
        s: "Infectious dementia",
        keys: ["General paresis: personality change, Argyll Robertson pupil", "HAND: รุนแรงเมื่อ viral load ไม่ suppress หรือ nadir CD4 ต่ำ แต่ form เบาพบได้แม้ suppress แล้ว", "Cryptococcal meningitis ใน KT: headache, confusion"],
        ix: ["Serum treponemal test และ VDRL, CSF VDRL (ผลลบไม่ได้ตัด neurosyphilis), HIV, CrAg"],
        link: "viral"
      }),
      N("Prion disease", "adj", {
        s: "Creutzfeldt-Jakob disease",
        keys: ["Rapidly progressive dementia กับ myoclonus ภายในไม่กี่เดือน", "Cortical ribboning, basal ganglia บน DWI", "RT-QuIC positive"],
        ix: ["MRI DWI, CSF RT-QuIC, EEG"]
      })
    ])
  ])
};

/* ===================== VISUAL LOSS ===================== */
TREES.vision = {
  must: [
    "ข้างเดียวหรือสองข้าง, ฉับพลันหรือค่อยเป็น, transient หรือถาวร",
    "ปวดตา, ตาแดง, ปวดหัว, เคี้ยวแล้วปวดกราม (GCA)",
    "BP ขณะเกิด, หลังฟอกที่ BP ต่ำ",
    "ยา: steroid, hydroxychloroquine, ethambutol, amiodarone, sildenafil, tacrolimus",
    "DM duration, HbA1c, retinopathy screening ล่าสุด",
    "Immunosuppression, CMV status",
    "Hearing loss และ family history ไต (Alport)"
  ],
  tree: N("Visual loss", "root", {
    s: "แบ่ง transient vs persistent, monocular vs binocular, painful vs painless แล้วระบุ lesion: media, retina, optic nerve, chiasm, cortex",
    why: "ตาเป็นหน้าต่างของ systemic vascular disease: hypertensive และ diabetic retinopathy, PRES, NAION หลัง IDH, ยาที่ต้องปรับตามไต และ oculo-renal syndromes ที่เป็น clue ทาง genetic",
    keys: ["Monocular = anterior to chiasm, binocular homonymous = retrochiasmal", "RAPD = optic nerve หรือ extensive retina", "ตาบอดสองข้างที่ pupil reactive และ fundus ปกติ = cortical blindness", "Fundoscopy"],
    ix: ["Visual acuity, fields, pupil, fundoscopy", "ESR, CRP ในอายุ > 50", "MRI brain และ orbit", "OCT, fluorescein angiography"],
    std: "Anatomical localization: ocular media, retina, optic nerve, chiasm, retrochiasmal pathway"
  }, [
    N("Acute painless monocular", "step", {
      s: "Vascular retinal หรือ optic nerve",
      keys: ["Transient vs persistent", "RAPD", "Fundus finding"]
    }, [
      N("Central retinal artery occlusion and amaurosis fugax", "nephro", {
        s: "Carotid embolism, cholesterol emboli, GCA",
        why: "Hollenhorst plaque เป็น clue ของ atheroembolic disease ที่ทำ AKI หลัง angiography",
        keys: ["Cherry-red spot กับ pale retina", "Hollenhorst plaque (cholesterol embolus) ที่ arteriolar bifurcation", "Amaurosis fugax: curtain นาทีแล้วหาย = TIA equivalent", "อายุ > 50 ต้อง exclude GCA ทันที"],
        ix: ["Carotid Doppler, ESR, CRP, echo, MRI DWI"],
        std: "AHA 2021 CRAO scientific statement",
        link: "bluetoe"
      }),
      N("Central retinal vein occlusion", "nephro", {
        s: "Hypertension, DM, hyperviscosity, thrombophilia",
        keys: ["Blood and thunder fundus (hemorrhage ทุก quadrant)", "Hypertension เป็น risk สำคัญ", "Hyperviscosity: Waldenström, myeloma, polycythemia", "อายุน้อย: หา antiphospholipid syndrome, nephrotic syndrome และ thrombophilia อื่น"],
        ix: ["BP, glucose, SPEP, viscosity, aPL"],
        link: "thrombosis"
      }),
      N("Anterior ischemic optic neuropathy", "nephro", {
        s: "Arteritic (GCA) หรือ non-arteritic (NAION)",
        why: "NAION มีรายงานหลัง IDH, hypotension, severe anemia ในผู้ป่วย dialysis และสัมพันธ์กับ PDE5 inhibitor แต่ผู้ป่วย dialysis อายุ > 50 ยังต้องตัด GCA ก่อนเท่าผู้ป่วยทั่วไป",
        keys: ["Painless monocular, altitudinal field defect, RAPD", "Swollen optic disc (pale swelling ใน arteritic)", "GCA: headache, jaw claudication, ESR และ CRP สูง, อายุ > 50 (ESR ปกติอย่างเดียวไม่ได้ตัด GCA)", "NAION: disc at risk (small cup), nocturnal hypotension, IDH", "PDE5 inhibitor ร่วม"],
        ix: ["ESR, CRP, temporal artery US หรือ biopsy (ถ้าสงสัย GCA ให้ high-dose glucocorticoid ทันทีโดยไม่รอผล)"],
        std: "ACR/EULAR 2022 GCA classification, ACR/VF 2021 GCA management",
        link: "hd-idh"
      }),
      N("Vitreous hemorrhage and retinal detachment", "nephro", {
        s: "Proliferative diabetic retinopathy",
        keys: ["Floaters, shower ของจุดดำ", "Curtain ใน detachment, photopsia", "PDR มักพบร่วมกับ DKD ระยะท้าย", "Vitreous hemorrhage ไม่ใช่ข้อห้ามเด็ดขาดของ heparin ระหว่าง HD แต่ช่วงเลือดออกใหม่ให้พิจารณา heparin-free หรือลดขนาดร่วมกับจักษุแพทย์"],
        ix: ["Fundoscopy, ocular ultrasound"],
        link: "kidneysize"
      })
    ]),
    N("Acute binocular or cortical", "step", {
      s: "Hypertensive หรือ posterior circulation",
      keys: ["Pupils reactive", "Headache", "Seizure"]
    }, [
      N("PRES and cortical blindness", "nephro", {
        s: "Hypertensive emergency, CNI, eclampsia, SLE, chemotherapy",
        keys: ["Cortical blindness กับ pupil reactive", "Headache, seizure, encephalopathy", "Parieto-occipital vasogenic edema บน FLAIR", "Tacrolimus แม้ระดับปกติ, hypomagnesemia", "BP ไม่สูงก็เป็น PRES ได้ โดยเฉพาะจาก CNI หรือ chemotherapy", "ส่วนใหญ่ reversible ภายในวันถึงสัปดาห์ แต่เหลือ deficit ถาวรได้ถ้ามี infarct หรือ hemorrhage"],
        ix: ["MRI FLAIR, CNI trough, Mg, BP"],
        link: "headache"
      }),
      N("Malignant hypertensive retinopathy and choroidopathy", "nephro", {
        s: "Grade 4 retinopathy: papilledema, flame hemorrhage, cotton wool",
        why: "Fundoscopy แยก malignant hypertension จาก hypertensive urgency และเตือนให้หา TMA ที่ไต",
        keys: ["Bilateral flame hemorrhage, cotton wool spot, papilledema", "Elschnig spot (choroidal infarct) ใน preeclampsia และ malignant HT", "Serous retinal detachment ใน preeclampsia", "Macular star"],
        ix: ["Fundoscopy, LDH, haptoglobin, smear, UPCR"],
        std: "Keith-Wagener-Barker และ Wong-Mitchell classification",
        link: "htn-emerg"
      }),
      N("Occipital stroke and pituitary apoplexy", "adj", {
        s: "Homonymous hemianopia หรือ bitemporal",
        keys: ["Homonymous hemianopia กับ macular sparing", "Pituitary apoplexy: sudden headache, ophthalmoplegia, hypotension, hyponatremia", "Bitemporal hemianopia จาก macroadenoma"],
        ix: ["MRI, cortisol"],
        link: "stroke"
      })
    ]),
    N("Painful visual loss", "step", {
      s: "Inflammatory หรือ pressure",
      keys: ["Red eye", "Pain with eye movement", "Halo"]
    }, [
      N("Optic neuritis", "adj", {
        s: "MS, NMOSD, MOGAD, SLE",
        keys: ["Pain เมื่อกลอกตา, color desaturation, RAPD", "NMOSD (AQP4): มักรุนแรง อาจ bilateral, longitudinally extensive transverse myelitis (≥ 3 vertebral segments), พบ SLE หรือ Sjögren ร่วมได้", "Typical MS optic neuritis เริ่ม recover ภายใน 2-4 สัปดาห์"],
        ix: ["MRI orbit and brain, AQP4-IgG, MOG-IgG"],
        std: "International NMOSD criteria 2015"
      }),
      N("Acute angle-closure glaucoma", "adj", {
        s: "Mid-dilated pupil, halo, red eye",
        keys: ["Severe pain, vomiting, halo", "Mid-dilated nonreactive pupil, cloudy cornea", "Anticholinergic, topiramate trigger", "IOP มัก > 40 mmHg"],
        ix: ["IOP, gonioscopy"],
        link: "eye"
      }),
      N("Endophthalmitis and uveitis", "nephro", {
        s: "Candida จาก line, bacterial, TINU, sarcoid",
        keys: ["Candida endophthalmitis จาก catheter หรือ candidemia", "Hypopyon", "TINU: acute TIN กับ bilateral anterior uveitis พบบ่อยในวัยรุ่นและหญิง แต่เป็นได้ทุกอายุและเพศ และ uveitis อาจตามหลัง TIN หลายเดือน", "CMV retinitis มัก painless (ดูใน Chronic progressive)"],
        ix: ["Dilated fundoscopy ใน candidemia ทุกราย (IDSA 2016), vitreous tap"],
        link: "eye"
      })
    ]),
    N("Chronic progressive", "step", {
      s: "Gradual loss เดือนถึงปี",
      keys: ["Drug history", "DM duration", "Steroid use"]
    }, [
      N("Diabetic retinopathy and macular edema", "nephro", {
        s: "Microvascular disease คู่กับ DKD",
        why: "Retinopathy ช่วยแยก DKD จาก non-diabetic kidney disease: T2DM ที่ไม่มี retinopathy และมี hematuria ควรคิด biopsy",
        keys: ["Microaneurysm, dot-blot hemorrhage, hard exudate", "NPDR vs PDR (neovascularization)", "T1DM ที่มี DKD เกือบทุกรายมี retinopathy ถ้าไม่มีให้หาโรคไตอื่น", "T2DM ที่ไม่มี retinopathy เพิ่มโอกาส NDKD แต่ไม่ได้ตัด DKD และการมี retinopathy ไม่ได้ตัด NDKD ที่ซ้อน", "Anti-VEGF intravitreal: มีรายงาน proteinuria และ TMA"],
        ix: ["Dilated fundus exam, OCT"],
        std: "ADA Standards of Care 2026 (retinopathy), ICO 2017 DR guideline",
        link: "proteinuria"
      }),
      N("Steroid cataract and glaucoma", "nephro", {
        s: "Posterior subcapsular cataract, steroid-induced glaucoma",
        keys: ["Prednisolone นานหลายเดือน (KT, GN)", "Glare, ขับรถตอนกลางคืนลำบาก", "IOP สูงโดยไม่มีอาการ", "DM และ hypocalcemia ก็ทำ cataract"],
        ix: ["Slit lamp, IOP"],
        link: "cushingoid"
      }),
      N("Drug toxic retinopathy and optic neuropathy", "nephro", {
        s: "Hydroxychloroquine, ethambutol, amiodarone, linezolid",
        why: "CKD เป็น risk factor ของ hydroxychloroquine retinopathy และ ethambutol optic neuropathy เพราะยาสะสม",
        keys: ["HCQ: bull's eye maculopathy (ระยะท้าย), risk เพิ่มเมื่อ dose > 5 mg/kg real body weight ต่อวัน, eGFR < 60, tamoxifen, ใช้นาน. Baseline eye exam ภายในปีแรก แล้ว screen ทุกปีหลังปีที่ 5 แต่เริ่มเร็วกว่านั้นถ้ามี major risk เช่น kidney disease", "Ethambutol: color vision (red-green) และ central scotoma, CrCl < 30 mL/min หรือ dialysis ให้ 20-25 mg/kg ต่อครั้ง สัปดาห์ละ 3 ครั้ง (ไม่ให้ทุกวัน, ผู้ป่วย HD ให้หลังฟอก)", "Linezolid: optic neuropathy หลังใช้นาน > 28 วัน", "Amiodarone: corneal verticillata และ optic neuropathy"],
        ix: ["OCT, visual field 10-2, color vision"],
        std: "AAO 2016 hydroxychloroquine screening recommendations"
      }),
      N("Pituitary and chiasmal lesion", "adj", {
        s: "Macroadenoma, craniopharyngioma, hypophysitis",
        keys: ["Bitemporal hemianopia", "Hypopituitarism: hyponatremia จาก cortisol deficiency, central DI", "Prolactin สูง (stalk effect หรือ prolactinoma)", "ICI hypophysitis"],
        ix: ["MRI pituitary, pituitary hormone panel"],
        link: "thirst"
      }),
      N("CMV retinitis", "nephro", {
        s: "KT, HIV with CD4 < 50",
        keys: ["Pizza pie fundus (hemorrhage กับ necrosis)", "Floaters, field loss painless", "D+/R− หลังหยุด prophylaxis"],
        ix: ["Dilated fundoscopy โดยจักษุแพทย์เป็นตัววินิจฉัย, blood CMV PCR (ผลลบไม่ได้ตัด retinitis)"],
        link: "kt-fever"
      })
    ]),
    N("Oculo-renal syndromes", "step", {
      s: "Eye finding ที่ชี้โรคไต genetic หรือ systemic",
      keys: ["Young age", "Family history", "Hearing loss"]
    }, [
      N("Alport syndrome", "nephro", {
        s: "COL4A5, COL4A3, COL4A4",
        keys: ["Anterior lenticonus (จำเพาะสูงมากต่อ Alport แต่พบเพียงส่วนหนึ่ง ไม่พบไม่ได้ตัดออก) ทำ progressive myopia", "Dot-and-fleck retinopathy, temporal retinal thinning", "Sensorineural hearing loss high-frequency", "Hematuria ตั้งแต่เด็ก, X-linked (COL4A5) รุนแรงในชาย แต่หญิง heterozygous ก็เป็นโรคและถึง ESKD ได้"],
        ix: ["Slit lamp, OCT, audiometry, genetic testing"],
        std: "Expert guideline Alport 2020 (Kashtan), ADAS nomenclature 2023",
        link: "hearing"
      }),
      N("Fabry disease and cystinosis", "nephro", {
        s: "Corneal deposits",
        keys: ["Fabry: cornea verticillata (whorl) ไม่กระทบสายตา, tortuous conjunctival vessel", "Cystinosis: corneal cystine crystals, photophobia, Fanconi syndrome", "Amiodarone และ chloroquine ทำ whorl คล้าย Fabry"],
        ix: ["Slit lamp, α-Gal A, leukocyte cystine"],
        link: "tubulopathy"
      }),
      N("C3 glomerulopathy drusen and renal-coloboma", "nephro", {
        s: "Drusen ใน C3G, optic nerve coloboma ใน PAX2",
        keys: ["C3G (dense deposit disease): drusen ก่อนวัยและ partial lipodystrophy", "PAX2: optic disc coloboma กับ kidney hypoplasia, CAKUT, FSGS", "Senior-Løken: nephronophthisis กับ retinitis pigmentosa", "Bardet-Biedl: rod-cone dystrophy, obesity, polydactyly, kidney"],
        ix: ["Fundoscopy, complement panel, genetic panel"],
        link: "hypocomp"
      })
    ])
  ])
};

/* ===================== TASTE AND SMELL DISTURBANCE ===================== */
TREES.smelltaste = {
  must: [
    "รสชาติเปลี่ยน (dysgeusia) หรือรับรสไม่ได้, ได้กลิ่นลดลงหรือผิดเพี้ยน",
    "รสโลหะ, กลิ่นแอมโมเนียในปาก",
    "ยาใหม่: ACEi, metformin, metronidazole, clarithromycin, terbinafine, lithium",
    "เบื่ออาหาร, น้ำหนักลด, albumin ต่ำ",
    "COVID หรือไข้หวัดก่อนหน้า, คัดจมูกเรื้อรัง, เลือดกำเดา",
    "ปากแห้ง, ตาแห้ง",
    "Tremor, constipation, memory loss (neurodegenerative)"
  ],
  tree: N("Taste and smell disturbance", "root", {
    s: "แยก taste จริงกับ smell (flavor ส่วนใหญ่มาจากกลิ่น) แล้วหา conductive (nasal), sensorineural, central และ metabolic-drug cause",
    why: "Uremic dysgeusia เป็นอาการหนึ่งของ uremia หรือ dialysis inadequacy (ไม่จำเพาะ ต้องตัดยาและสาเหตุอื่นด้วย) และเป็นส่วนหนึ่งของต้นเหตุ anorexia และ PEW, ยาที่ใช้บ่อยในไตเป็น cause ที่แก้ได้",
    keys: ["Metallic taste ใน uremia", "Anosmia sudden หลัง viral", "Unilateral nasal obstruction หรือ bloody crust เป็น red flag ให้หา sinonasal tumor และ GPA", "Smell loss เกิดนำ motor หรือ cognitive symptom ใน neurodegenerative disease ได้หลายปี"],
    ix: ["BUN, Kt/V, zinc", "Nasal endoscopy, CT sinus", "Smell identification test (UPSIT)"],
    std: "Position paper on olfactory dysfunction 2023 (Rhinology)"
  }, [
    N("Metabolic and kidney-related", "step", {
      s: "Systemic metabolic",
      keys: ["Uremia", "Zinc", "Malnutrition"]
    }, [
      N("Uremic dysgeusia and fetor", "nephro", {
        s: "Urea ใน saliva เปลี่ยนเป็น ammonia",
        keys: ["Metallic หรือ ammonia taste, uremic fetor", "Anorexia, nausea ตอนเช้า, น้ำหนักลด", "BUN สูง, Kt/V ไม่ถึงเป้า", "ดีขึ้นหลังเริ่มหรือเพิ่ม dialysis"],
        ix: ["BUN, Kt/V, nPCR"],
        std: "KDOQI 2015 HD adequacy, KDIGO 2024 CKD (indication to start KRT)",
        link: "nausea"
      }),
      N("Zinc deficiency", "nephro", {
        s: "Dialysis loss, poor intake, enteropathy",
        keys: ["Hypogeusia, poor wound healing, alopecia, dermatitis periorificial", "Zinc ต่ำพบบ่อยใน HD และ nephrotic (urinary loss)", "ALP ต่ำ (zinc-dependent enzyme)", "Zinc supplement นานทำ copper deficiency"],
        ix: ["Serum zinc (ตอนเช้า fasting, ค่าต่ำเทียมได้จาก hypoalbuminemia และ inflammation), ALP"],
        link: "alopecia"
      }),
      N("Hypothyroidism and B12 deficiency", "adj", {
        s: "Endocrine และ nutritional",
        keys: ["Smooth tongue (glossitis) ใน B12 และ iron", "Hypothyroid: hoarseness, cold intolerance"],
        ix: ["TSH, B12, ferritin"],
        link: "goiter"
      }),
      N("Sjögren syndrome and xerostomia", "nephro", {
        s: "ลด saliva ทำ taste ลด",
        keys: ["Dry mouth, dry eye, parotid enlargement", "TIN และ dRTA ร่วม", "Anti-Ro, anti-La"],
        ix: ["Schirmer, anti-Ro, salivary flow"],
        link: "sicca"
      })
    ]),
    N("Drug-induced", "step", {
      s: "สาเหตุที่แก้ได้บ่อย",
      keys: ["Temporal relationship", "Polypharmacy"]
    }, [
      N("Antihypertensive and diabetes drugs", "nephro", {
        s: "ACEi (captopril), ARB, metformin, CCB",
        keys: ["Captopril (sulfhydryl group) ทำ taste loss และ metallic taste", "Metformin: metallic taste ช่วงแรก", "มักดีขึ้นภายใน 2-4 สัปดาห์หลังหยุดยา"],
        ix: ["Drug review"]
      }),
      N("Antimicrobial and others", "nephro", {
        s: "Metronidazole, clarithromycin, terbinafine, lithium, penicillamine, chemotherapy",
        keys: ["Metronidazole: metallic taste ระหว่างใช้ยา", "Clarithromycin: bitter taste และ interaction กับ tacrolimus", "Terbinafine: taste loss นานหลายเดือน", "Penicillamine (cystinuria): dysgeusia กับ MN"],
        ix: ["Drug review"],
        link: "stone"
      })
    ]),
    N("Nasal and sinus", "step", {
      s: "Conductive olfactory loss",
      keys: ["Nasal obstruction", "Discharge", "Polyp"]
    }, [
      N("Chronic rhinosinusitis and nasal polyp", "adj", {
        s: "With หรือ without polyp, aspirin-exacerbated",
        keys: ["Nasal obstruction, discharge > 12 สัปดาห์", "Polyp กับ asthma และ eosinophilia: คิด EGPA", "ดีขึ้นด้วย intranasal steroid"],
        ix: ["Nasal endoscopy, CT sinus, eosinophil"],
        std: "EPOS 2020",
        link: "eosinophilia"
      }),
      N("Granulomatosis with polyangiitis", "nephro", {
        s: "Sinonasal destruction",
        keys: ["Bloody nasal crust, septal perforation, saddle nose", "Anosmia จาก mucosal destruction", "PR3-ANCA, pulmonary nodule, RPGN (ANCA negative ไม่ได้ตัด GPA โดยเฉพาะ disease ที่จำกัดอยู่ ENT)", "Serous otitis media และ conductive hearing loss"],
        ix: ["PR3-ANCA และ MPO-ANCA, nasal biopsy (yield ต่ำ ผลไม่จำเพาะไม่ได้ตัดออก), CT chest, UA"],
        std: "ACR/EULAR 2022 GPA classification",
        link: "ent"
      })
    ]),
    N("Sensorineural and central", "step", {
      s: "Nerve หรือ brain",
      keys: ["Post-viral", "Trauma", "Neurological signs"]
    }, [
      N("Post-viral olfactory dysfunction", "adj", {
        s: "COVID-19, influenza",
        keys: ["Sudden anosmia หลัง URI", "Parosmia ช่วงฟื้น", "ฟื้นตัวส่วนใหญ่ใน 6-12 เดือน", "Olfactory training ช่วย"],
        ix: ["Smell test"]
      }),
      N("Neurodegenerative and head trauma", "adj", {
        s: "Parkinson, Alzheimer, Lewy body, traumatic shearing",
        keys: ["Hyposmia นำ motor symptoms ใน Parkinson หลายปี", "Frontal or occipital trauma ทำ olfactory nerve shearing"],
        ix: ["MRI, neurological exam"],
        link: "cognition"
      }),
      N("Kallmann syndrome", "nephro", {
        s: "Congenital hypogonadotropic hypogonadism กับ anosmia",
        why: "ANOS1 (KAL1) X-linked มี unilateral renal agenesis ร่วมราวหนึ่งในสาม",
        keys: ["Anosmia ตั้งแต่เกิด, delayed puberty", "Low LH, FSH, testosterone", "Unilateral renal agenesis, synkinesia (mirror movement)", "Cleft lip, dental agenesis"],
        ix: ["LH, FSH, testosterone, kidney US, MRI olfactory bulb, genetic panel"],
        link: "kidneysize"
      })
    ])
  ])
};

/* ===================== SORE THROAT, PHARYNGITIS AND HOARSENESS ===================== */
TREES.throat = {
  must: [
    "เจ็บคอเฉียบพลันหรือเรื้อรัง, ไข้, ไอ (ไอมากชี้ viral)",
    "ระยะเวลาจากเจ็บคอถึง hematuria หรือบวม (1-3 วัน vs 1-3 สัปดาห์)",
    "แผลในปาก, ผื่น, lymph node",
    "ยาที่ทำ agranulocytosis: methimazole, PTU, clozapine, sulfasalazine, MMF, valganciclovir",
    "Hoarseness นานกว่า 2-4 สัปดาห์, smoking",
    "Stridor, กลืนลำบาก, น้ำลายไหล (deep neck infection)",
    "Inhaled steroid, ACEi, recent intubation"
  ],
  tree: N("Sore throat, pharyngitis and hoarseness", "root", {
    s: "Pharyngitis: ใช้ Centor/McIsaac เลือกผู้ที่ควรตรวจ GAS (score ไม่ได้วินิจฉัย) แล้วหา red flags ของ deep neck infection, hoarseness > 4 สัปดาห์ต้อง laryngoscopy",
    why: "เจ็บคอเป็นจุดเริ่มต้นของ PSGN และ synpharyngitic IgAN ที่แยกกันด้วย latency, agranulocytosis จากยาและ GPA subglottic stenosis เป็น clue ที่สำคัญ",
    keys: ["Centor: tonsillar exudate, tender anterior cervical node, fever, ไม่มีไอ", "Latency จากเจ็บคอถึง hematuria: 1-3 วัน (synpharyngitic) ชี้ IgAN, 1-3 สัปดาห์ชี้ PSGN แต่ latency อย่างเดียวไม่วินิจฉัย ต้องดู C3 และ course (C3G และ infection-related GN ขณะติดเชื้อก็ synpharyngitic ได้)", "Red flags: trismus, drooling, stridor, unilateral swelling", "Hoarseness > 4 สัปดาห์ = laryngoscopy และทำเร็วกว่านั้นถ้ามี red flag (smoking, neck mass, hemoptysis, stridor, หลังผ่าตัดคอหรือ intubation)"],
    ix: ["Rapid antigen detection test หรือ throat culture", "CBC with ANC", "Laryngoscopy", "ASO, anti-DNase B, C3 เมื่อมี hematuria"],
    std: "IDSA 2012 GAS pharyngitis guideline, AAO-HNS 2018 hoarseness guideline"
  }, [
    N("Infectious pharyngitis", "step", {
      s: "ไข้ เจ็บคอเฉียบพลัน",
      keys: ["Exudate", "Lymph node", "Cough"]
    }, [
      N("Group A streptococcal pharyngitis", "nephro", {
        s: "Streptococcus pyogenes",
        why: "PSGN เกิดหลัง pharyngitis จาก nephritogenic strain 1-3 สัปดาห์ (หลัง impetigo 3-6 สัปดาห์), low C3 กลับปกติภายใน 8-12 สัปดาห์",
        keys: ["Centor/McIsaac ≥ 3 ควรตรวจ RADT", "Palatal petechiae, scarlatiniform rash", "PSGN: hematuria, edema, HT, low C3 หลัง 1-3 สัปดาห์", "C3 ต่ำค้างเกิน 8-12 สัปดาห์ ให้หา C3G, LN, cryoglobulinemia หรือ infection ที่ยังไม่หาย และพิจารณา biopsy", "Antibiotic ป้องกัน rheumatic fever แต่ไม่มีหลักฐานชัดว่าป้องกัน PSGN"],
        ix: ["RADT, culture", "ASO, anti-DNase B, C3, UA"],
        std: "IDSA 2012 GAS pharyngitis guideline",
        link: "hypocomp"
      }),
      N("Viral pharyngitis and synpharyngitic IgA nephropathy", "nephro", {
        s: "Adenovirus, rhinovirus, influenza, COVID",
        keys: ["Cough, coryza, conjunctivitis ชี้ viral", "Gross hematuria ภายใน 1-3 วันของ URI ชี้ IgAN (ยืนยันด้วย biopsy)", "C3 มักปกติใน IgAN", "Recurrent gross hematuria ทุกครั้งที่เป็นหวัด"],
        ix: ["UA, UPCR, C3"],
        std: "KDIGO 2025 IgAN guideline",
        link: "hematuria"
      }),
      N("Infectious mononucleosis", "nephro", {
        s: "EBV, CMV",
        keys: ["Exudative tonsillitis, posterior cervical node, splenomegaly", "Atypical lymphocytosis > 10%, transaminase สูง", "Amoxicillin rash", "EBV ทำ acute interstitial nephritis และ rhabdomyolysis ได้", "PTLD: risk สูงสุดใน KT ที่ EBV D+/R− แต่เกิดในผู้ที่ seropositive ได้"],
        ix: ["Monospot, EBV VCA IgM, EBV PCR ใน KT"],
        link: "lymphnode"
      }),
      N("Acute HIV, gonococcal and diphtheria", "adj", {
        s: "Less common but important",
        keys: ["Acute HIV: fever, rash, oral ulcer, lymphadenopathy 2-4 สัปดาห์หลัง exposure", "Gonococcal: sexual exposure, ไม่ตอบสนอง standard antibiotic", "Diphtheria: gray pseudomembrane, bull neck, unvaccinated"],
        ix: ["HIV Ag/Ab และ RNA, NAAT gonorrhea, culture"],
        link: "viral"
      })
    ]),
    N("Red flag and severe", "step", {
      s: "Airway และ deep neck",
      keys: ["Trismus", "Drooling", "Stridor", "Neutropenia"]
    }, [
      N("Deep neck infection and Lemierre syndrome", "adj", {
        s: "Peritonsillar, retropharyngeal abscess, Fusobacterium",
        keys: ["Trismus, hot potato voice, uvula deviation ใน peritonsillar", "Lemierre: sore throat แล้ว septic jugular thrombophlebitis และ septic lung emboli", "Neck swelling ข้างเดียว", "DM เพิ่ม risk"],
        ix: ["CT neck with contrast, blood culture"]
      }),
      N("Drug-induced agranulocytosis", "nephro", {
        s: "Methimazole, PTU, clozapine, sulfasalazine, valganciclovir, MMF, TMP-SMX",
        why: "ผู้ป่วย KT ได้ valganciclovir, MMF, TMP-SMX ร่วมกัน, methimazole และ PTU ยังทำ ANCA vasculitis",
        keys: ["Sore throat กับไข้ใน ANC < 500", "Methimazole agranulocytosis มักเกิดใน 3 เดือนแรก", "PTU: MPO-ANCA vasculitis และ GN", "อาจไม่มี exudate หรือหนองแม้ติดเชื้อรุนแรง"],
        ix: ["ANC, drug review, ANCA ถ้าได้ PTU หรือ methimazole และมีอาการ vasculitis"],
        link: "cytopenia"
      }),
      N("Epiglottitis and angioedema", "nephro", {
        s: "Airway emergency",
        keys: ["Stridor, tripod position, drooling", "ACEi angioedema ไม่มี urticaria และเกิดได้แม้ใช้ยามานานหลายปี", "ห้ามตรวจคอด้วย tongue depressor ใน epiglottitis"],
        ix: ["Flexible laryngoscopy ในห้องที่พร้อม intubate"],
        link: "urticaria"
      })
    ]),
    N("Oral ulcer with sore throat", "step", {
      s: "Mucocutaneous",
      keys: ["Recurrent", "Genital ulcer", "Rash"]
    }, [
      N("SLE and Behçet disease", "nephro", {
        s: "Painless palatal ulcer (SLE) vs painful recurrent aphthae (Behçet)",
        keys: ["SLE: มัก painless hard palate ulcer, nephritis, low C3/C4", "Behçet: oral ulcer ≥ 3 ครั้งต่อปี, genital ulcer, uveitis, pathergy", "Behçet: kidney involvement พบน้อย ได้แก่ AA amyloid, GN (รวม IgAN) และ renal vascular disease"],
        ix: ["ANA, dsDNA, complement, HLA-B51, pathergy"],
        std: "EULAR/ACR 2019 SLE, ICBD 2014 Behçet criteria",
        link: "ent"
      }),
      N("Stevens-Johnson syndrome and herpetic stomatitis", "nephro", {
        s: "Mucositis จากยา หรือ HSV",
        keys: ["SJS: mucositis ≥ 2 sites กับ target lesion, 4-28 วันหลังยา (allopurinol, sulfa, NSAID, anticonvulsant)", "Allopurinol HLA-B*58:01 พบบ่อยในไทย, risk สูงขึ้นใน CKD", "HSV gingivostomatitis ใน immunosuppressed"],
        ix: ["Skin biopsy, HSV PCR, HLA-B*58:01 ก่อนเริ่ม allopurinol"],
        link: "rash"
      })
    ]),
    N("Hoarseness", "step", {
      s: "Laryngeal หรือ recurrent laryngeal nerve",
      keys: ["Duration > 4 สัปดาห์", "Smoking", "Stridor"]
    }, [
      N("Laryngeal cancer and vocal cord paralysis", "adj", {
        s: "Smoking, lung cancer, aortic aneurysm (Ortner), thyroid surgery",
        keys: ["Progressive hoarseness ในคนสูบบุหรี่", "Left recurrent laryngeal nerve: lung apex, mediastinal node, aortic arch", "Post-thyroidectomy หรือ parathyroidectomy", "Hemoptysis และ weight loss"],
        ix: ["Laryngoscopy, CT neck and chest"],
        link: "cough"
      }),
      N("Subglottic stenosis and relapsing polychondritis", "nephro", {
        s: "GPA, relapsing polychondritis",
        keys: ["Stridor กับ hoarseness ใน GPA พบบ่อยในผู้ป่วยอายุน้อยและหญิง (ANCA negative ได้)", "Subglottic stenosis เกิดได้แม้ disease อื่นสงบ", "Relapsing polychondritis: auricular chondritis (ไม่รวม lobule), saddle nose, GN บางราย"],
        ix: ["Laryngoscopy, CT airway, PR3-ANCA"],
        link: "ent"
      }),
      N("Hypothyroidism, amyloid and laryngitis", "nephro", {
        s: "Infiltrative และ inflammatory",
        keys: ["Hypothyroid: deep coarse voice", "AL amyloid: hoarseness, macroglossia, nephrotic", "Inhaled steroid ทำ laryngeal candidiasis", "Laryngopharyngeal reflux: throat clearing, globus"],
        ix: ["TSH, serum FLC กับ SPEP และ immunofixation, laryngoscopy"],
        link: "mspike"
      })
    ])
  ])
};
