/* Lab work-up flows part 3 (Nov 2026): acid-base. Schema as data/lab1.js. */
window.LABTREES = window.LABTREES || {};

/* ===================== NAGMA ===================== */
LABTREES.nagma = {
  panel: [
    "ABG หรือ VBG, Na, K, Cl, HCO3, albumin (albumin-corrected AG), glucose, Cr, Ca, PO4, uric acid",
    "Expected pCO2 (Winter) = 1.5 × HCO3 + 8 ± 2 เพื่อหา respiratory disorder ร่วม",
    "Urine pH (ตัวอย่างใหม่ วัดด้วย pH meter), urine Na, K, Cl, osm, urea, glucose, Cr",
    "Urine NH4 วัดตรงถ้าห้องแล็บทำได้ (dRTA consensus 2021 แนะนำ) ถ้าไม่ได้ใช้ urine osmolal gap ก่อน UAG",
    "Urine anion gap = UNa + UK − UCl และ urine osmolal gap = measured − [2(UNa + UK) + urine urea nitrogen/2.8 + urine glucose/18] (urea nitrogen และ glucose หน่วย mg/dL)",
    "Urine citrate, urine Ca/Cr, renal ultrasound (nephrocalcinosis)",
    "Renin, aldosterone ถ้า K สูง, serum FLC, anti-Ro/SSA, anti-La/SSB ตามแขนง"
  ],
  pit: [
    "UAG แปลไม่ได้เมื่อ urine Na < 20 mmol/L, มี ketoanion, hippurate, penicillin หรือ bicarbonaturia ให้ใช้ UOG แทน",
    "Urine pH ต้องวัดจากตัวอย่างใหม่ด้วย pH meter, UTI จาก urea-splitting organism ทำ pH สูงเท็จ",
    "Urine pH > 5.5 พบได้ใน diarrhea ที่ NH4 สูงมาก (NH3 buffer H+) หรือเมื่อ volume depletion ทำ distal Na delivery ต่ำ จึงไม่ได้แปลว่า dRTA ต้องดู urine NH4 และ urine Na คู่กัน",
    "pRTA ที่ steady state มี urine pH < 5.5 และ NH4 อาจดูเพียงพอ ต้องทดสอบ FEHCO3 เมื่อให้ alkali",
    "Albumin ต่ำทำให้ AG ดูปกติทั้งที่มี AGMA ซ่อนอยู่ ต้อง correct ทุกครั้ง"
  ],
  tree: N("Normal anion gap metabolic acidosis", "root", {
    s: "ยืนยัน primary metabolic acidosis และ AG ที่ correct albumin แล้ว ใช้ urine NH4 (UAG หรือ UOG) แยก extrarenal กับ renal จากนั้น serum K และ urine pH แยกชนิดของ RTA",
    why: "Urine NH4 คือคำถามหลักว่าไตตอบสนองต่อ acidosis ถูกหรือไม่ และ K กับ urine pH แบ่ง RTA ได้ครบสามชนิด",
    keys: ["Albumin-corrected AG ปกติ", "UAG ติดลบหรือ UOG > 150 mOsm/kg = NH4 สูง (extrarenal หรือ acid load, pRTA ที่ steady state ก็ให้ผลแบบนี้ได้)", "UAG บวกและ UOG < 150 = NH4 ต่ำ (renal) แปลได้เมื่อ urine Na > 20 mmol/L เท่านั้น", "เมื่อ NH4 ต่ำ: K ต่ำ + urine pH > 5.5 ชี้ dRTA, K สูง + urine pH < 5.5 ชี้ type 4"],
    ix: ["Blood gas, UAG, UOG, urine pH, K, FEHCO3, urine citrate"],
    std: "Kraut JA, Madias NE. Differential diagnosis of NAGMA, Clin J Am Soc Nephrol 2012, Trepiccione F et al. dRTA European expert consensus, Nephrol Dial Transplant 2021"
  }, [
    N("pH > 7.40 or pCO2 low out of proportion: compensation for chronic respiratory alkalosis", "step", {
      s: "HCO3 ต่ำจาก renal compensation ไม่ใช่ primary acidosis",
      keys: ["pH ปกติสูงหรือสูง", "pCO2 ต่ำกว่าที่ Winter formula คาด"],
      ix: ["ABG"]
    }, [
      N("Chronic respiratory alkalosis", "adj", {
        s: "Pregnancy, cirrhosis, sepsis, high altitude, salicylate",
        why: "ไม่ควรให้ HCO3 เพราะ HCO3 ที่ต่ำเป็น compensation ไม่ใช่ primary acidosis",
        keys: ["HCO3 ลดราว 4-5 mmol/L ต่อ pCO2 ที่ลด 10 mmHg"],
        ix: ["หาสาเหตุ hyperventilation"]
      })
    ]),
    N("Urine NH4 high (UAG negative, UOG > 150 mOsm/kg): extrarenal HCO3 loss or acid load", "step", {
      s: "ไตเพิ่ม NH4 ถูกต้อง สาเหตุอยู่นอกไตหรือเป็น load",
      keys: ["UAG ติดลบ", "UOG > 150", "K ต่ำใน GI loss"],
      ix: ["Stool volume, fistula output, fluid history"]
    }, [
      N("Diarrhea and laxative abuse", "adj", {
        s: "Lower GI fluid HCO3 สูง",
        why: "สาเหตุพบบ่อยที่สุดของ NAGMA ร่วม hypokalemia",
        keys: ["UAG ติดลบ", "Urine pH อาจ > 5.5 เพราะ NH4 buffer มาก"],
        ix: ["Stool osm gap, laxative screen"],
        link: "diarrhea"
      }),
      N("Pancreatic, biliary and small bowel fistula", "adj", {
        s: "Pancreatic juice HCO3 ราว 100 mmol/L, pancreas-bladder drained transplant",
        why: "Pancreas-bladder drainage ทำ HCO3 loss ทางปัสสาวะ",
        keys: ["Fistula output สูง"],
        ix: ["Drain output volume"]
      }),
      N("Urinary diversion", "nephro", {
        s: "Ureterosigmoidostomy, ileal conduit หรือ neobladder ที่ยาวหรือ stasis",
        why: "Bowel segment แลก Cl กับ HCO3 และดูด NH4Cl กลับ ส่วน urine ที่เก็บจาก conduit นำมาแปล UAG ไม่ได้",
        keys: ["ประวัติ cystectomy", "K ต่ำ"],
        ix: ["Loopogram, residual volume"]
      }),
      N("Saline-induced hyperchloremic acidosis", "adj", {
        s: "0.9% NaCl ปริมาณมาก Cl 154 mmol/L",
        why: "Dilution ของ HCO3 และ strong ion difference ลด",
        keys: ["Cl สูง ประวัติ saline หลายลิตร"],
        ix: ["Fluid balance"]
      }),
      N("Exogenous acid", "adj", {
        s: "NH4Cl, arginine HCl, lysine HCl ใน TPN, cholestyramine",
        why: "Acid load ที่ไตขับไม่ทัน",
        keys: ["ประวัติได้ยาหรือ TPN ที่มี cationic amino acid"],
        ix: ["TPN composition"]
      })
    ]),
    N("Urine NH4 high but UAG positive (UOG > 150): unmeasured urine anion", "step", {
      s: "NH4 ถูกขับคู่กับ anion อื่นแทน Cl ทำให้ UAG หลอก",
      why: "ตัวอย่างที่ UOG ช่วยไม่ให้วินิจฉัย dRTA ผิด",
      keys: ["UAG บวก", "UOG > 150 mOsm/kg"],
      ix: ["Urine ketone, urine hippurate, drug review"]
    }, [
      N("Recovery phase of DKA", "adj", {
        s: "Ketoanion ถูกขับทิ้งทางปัสสาวะก่อนเปลี่ยนกลับเป็น HCO3",
        why: "ภาพเปลี่ยนจาก AGMA เป็น NAGMA ระหว่างการรักษา",
        keys: ["Ketonuria", "AG ลดแต่ HCO3 ยังต่ำ"],
        ix: ["β-OHB trend"]
      }),
      N("Toluene and hippurate", "adj", {
        s: "Hippurate ถูกขับเร็วทาง secretion",
        why: "เคยถูกจัดเป็น dRTA แต่ NH4 จริงสูง",
        keys: ["UAG บวก UOG สูง", "K ต่ำมาก, rhabdomyolysis"],
        ix: ["Urine hippurate, toluene exposure history"]
      })
    ]),
    N("Urine NH4 low (UAG positive, UOG < 150 mOsm/kg): renal acidification defect", "step", {
      s: "ไตสร้างหรือขับ NH4 ไม่พอ แยกด้วย serum K และ urine pH",
      keys: ["K ต่ำหรือปกติ + urine pH > 5.5 = classic dRTA", "K สูง + urine pH < 5.5 = type 4 RTA", "K สูง + urine pH > 5.5 = voltage-dependent dRTA", "eGFR < 20-30 = acidosis of CKD"],
      ix: ["Serum K, urine pH, eGFR, renin, aldosterone"]
    }, [
      N("K low or normal, urine pH > 5.5: classic distal RTA", "step", {
        s: "α-intercalated cell หลั่ง H+ ไม่ได้",
        why: "Urine citrate ต่ำ, hypercalciuria และ nephrocalcinosis สนับสนุน แล้วแยกสาเหตุด้วย autoimmune, genetic และยา",
        keys: ["Urine pH > 5.5 ขณะ HCO3 ต่ำ", "Urine citrate ต่ำ", "Nephrocalcinosis"],
        ix: ["Furosemide-fludrocortisone test (หรือ NH4Cl loading): urine pH ไม่ลดต่ำกว่า 5.3 ใช้ยืนยัน incomplete dRTA ที่ HCO3 ยังปกติ ไม่จำเป็นเมื่อมี acidosis ชัดอยู่แล้ว", "U-B pCO2 < 20 mmHg หลังให้ NaHCO3 จน urine alkaline ชี้ secretory defect (ปกติได้ใน gradient defect เช่น amphotericin)", "Anti-Ro/SSA, anti-La/SSB, SPEP, urine Ca/Cr"],
        std: "Walsh SB et al. Kidney Int 2007, Trepiccione F et al. NDT 2021"
      }, [
        N("Autoimmune dRTA", "nephro", {
          s: "Sjögren (พบบ่อยที่สุดในผู้ใหญ่), SLE, autoimmune hepatitis, PBC, autoimmune thyroiditis",
          why: "H+-ATPase ที่ α-intercalated cell หายไปจาก autoimmune tubulointerstitial injury (ยังไม่พบ autoantibody ที่จำเพาะชัดเจน) และ dRTA อาจนำมาก่อนอาการ sicca",
          keys: ["Anti-Ro/SSA บวก", "Hypergammaglobulinemia"],
          ix: ["Anti-Ro, anti-La, Schirmer test, salivary gland biopsy"],
          link: "sicca"
        }),
        N("Hereditary dRTA", "nephro", {
          s: "SLC4A1 (AD หรือ AR ใน SAO), ATP6V1B1 (หูหนวกเร็ว), ATP6V0A4 (หูหนวกช้า), FOXI1, WDR72",
          why: "Onset เด็ก growth failure, rickets และ nephrocalcinosis",
          keys: ["Onset เด็ก", "Sensorineural deafness ใน ATP6V1B1", "Southeast Asian ovalocytosis ใน SLC4A1 AR"],
          ix: ["dRTA gene panel, audiogram, blood film"]
        }),
        N("Hypercalciuria and nephrocalcinosis", "nephro", {
          s: "Medullary sponge kidney, PHPT, vitamin D excess, FHHNC",
          why: "Nephrocalcinosis ทำลาย medullary acidification เป็นได้ทั้งเหตุและผล",
          keys: ["Urine Ca/Cr สูง", "Ca สูงหรือ PTH สูงใน PHPT"],
          ix: ["PTH, 25(OH)D, CT urography"]
        }),
        N("Drug and toxin dRTA", "nephro", {
          s: "Amphotericin B (H+ back-leak), lithium, ifosfamide, ibuprofen",
          why: "Amphotericin ทำ gradient defect ไม่ใช่ pump defect",
          keys: ["ประวัติยา", "Mg และ K ต่ำร่วม (amphotericin)"],
          ix: ["Drug review"]
        }),
        N("Dysproteinemia and other systemic causes", "nephro", {
          s: "Hypergammaglobulinemia, cryoglobulinemia, amyloid, KT rejection (sickle cell และ obstructive uropathy มักเป็นชนิด hyperkalemic ดูแขนง K high, urine pH > 5.5)",
          why: "Interstitial injury ทำ distal acidification ล้มเหลว",
          keys: ["Globulin สูง, M-protein"],
          ix: ["SPEP, FLC, renal ultrasound"],
          link: "mspike"
        })
      ]),
      N("K high, urine pH < 5.5: type 4 RTA (hypoaldosteronism)", "step", {
        s: "Hyperkalemia กด ammoniagenesis, distal H+ secretion ยังพอ",
        keys: ["Urine pH < 5.5", "Renin และ aldosterone ต่ำหรือ aldosterone resistance", "HCO3 มักไม่ต่ำกว่า 15-17"],
        ix: ["Renin, aldosterone, cortisol, drug review"],
        link: "hyperk"
      }, [
        N("Type 4 RTA (hypoaldosteronism)", "nephro", {
          s: "DKD, NSAID, RAASi, heparin, CNI, adrenal insufficiency",
          why: "แก้ K แล้ว NH4 production เพิ่ม acidosis ดีขึ้น",
          keys: ["Renin ต่ำ aldosterone ต่ำใน DKD, NSAID, CNI (hyporeninemic) แต่ renin สูงใน RAASi, heparin และ adrenal insufficiency", "Urine pH < 5.5"],
          ix: ["Renin, aldosterone"]
        }),
        N("PHA type 2 (Gordon syndrome) and CNI", "nephro", {
          s: "HTN, hyperK, NAGMA, renin ต่ำ ตอบสนอง thiazide",
          why: "NCC ทำงานมาก ลด distal Na delivery",
          keys: ["HTN", "Renin ต่ำ eGFR ปกติ", "CNI level สูงใน KT"],
          ix: ["WNK/KLHL3/CUL3 genetic test, CNI trough"]
        })
      ]),
      N("K high, urine pH > 5.5: hyperkalemic distal RTA", "step", {
        s: "Voltage defect: Na reabsorption ที่ principal cell ลด ทำให้ทั้ง H+ และ K ขับไม่ได้",
        keys: ["Urine pH > 5.5 ร่วม hyperkalemia", "Aldosterone ปกติหรือสูง"],
        ix: ["Renal ultrasound, drug review, ANA"]
      }, [
        N("Voltage-dependent dRTA", "nephro", {
          s: "Obstructive uropathy, sickle cell, SLE, amiloride, trimethoprim",
          why: "ต่างจาก type 4 ตรงที่ urine pH สูงและแก้ด้วย fludrocortisone ไม่ได้",
          keys: ["Urine pH > 5.5", "K สูง"],
          ix: ["Renal ultrasound หา obstruction"]
        })
      ]),
      N("eGFR < 20-30: acidosis of CKD", "step", {
        s: "NH4 production ลดตาม nephron mass, AG สูงขึ้นเมื่อ eGFR < 15-20",
        keys: ["eGFR ต่ำ", "HCO3 12-20", "AG อาจสูงเล็กน้อย"],
        ix: ["KDIGO 2024: พิจารณา alkali เมื่อ HCO3 < 18 mmol/L และไม่ให้เกินค่าปกติ"],
        std: "KDIGO 2024 CKD guideline practice point 3.10.1-3.10.2"
      }, [
        N("Metabolic acidosis in CKD", "nephro", {
          s: "Ammoniagenesis ไม่พอเมื่อ nephron ลด",
          why: "Acidosis เร่ง bone loss, muscle wasting และ CKD progression",
          keys: ["eGFR < 30", "UAG บวก"],
          ix: ["HCO3 trend, dietary acid load"]
        })
      ])
    ]),
    N("Renal HCO3 wasting: urine pH < 5.5 at steady state, FEHCO3 > 15% when HCO3 corrected", "step", {
      s: "Proximal RTA: threshold ของ HCO3 reabsorption ต่ำลง",
      why: "Steady state ดู distal acidification ปกติ ต้องทดสอบด้วยการให้ alkali และหา Fanconi features",
      keys: ["Urine pH < 5.5 เมื่อ HCO3 ต่ำกว่า threshold", "FEHCO3 > 15% เมื่อให้ NaHCO3 จน HCO3 ปกติ", "Glucosuria ขณะ glucose ปกติ, phosphaturia, LMW proteinuria, hypouricemia"],
      ix: ["NaHCO3 loading แล้ววัด FEHCO3", "Serum FLC, drug review, urine cystine, genetic panel"],
      link: "tubulopathy"
    }, [
      N("Light chain proximal tubulopathy", "nephro", {
        s: "κ light chain สะสมใน proximal tubule, crystal หรือ non-crystal",
        why: "ผู้ใหญ่ที่เป็น Fanconi syndrome ควรตรวจ serum FLC และ immunofixation หา MGRS ทุกราย ยิ่งจำเป็นเมื่อไม่มียาที่อธิบายได้",
        keys: ["FLC ratio ผิดปกติ", "Fanconi features"],
        ix: ["Serum FLC, immunofixation, kidney biopsy with EM"],
        link: "mspike"
      }),
      N("Drugs", "nephro", {
        s: "Tenofovir disoproxil, ifosfamide, cisplatin, aminoglycoside, deferasirox, valproate, topiramate และ acetazolamide",
        why: "Acetazolamide และ topiramate ยับยั้ง carbonic anhydrase ทำ isolated pRTA",
        keys: ["ประวัติยา"],
        ix: ["Drug review, ติดตามหลังหยุดยา"]
      }),
      N("Inherited Fanconi", "nephro", {
        s: "Cystinosis, Dent disease (CLCN5, OCRL), Wilson, Lowe, galactosemia, tyrosinemia",
        why: "Dent disease มี hypercalciuria, nephrocalcinosis และ LMW proteinuria มาก",
        keys: ["Onset เด็ก", "Leukocyte cystine สูง (cystinosis)"],
        ix: ["Leukocyte cystine, ceruloplasmin, genetic panel"]
      }),
      N("Other acquired causes", "nephro", {
        s: "Heavy metals (lead, cadmium), Sjögren, post-KT, vitamin D deficiency",
        why: "Cadmium และ lead พบในอาชีพเสี่ยง",
        keys: ["Occupational exposure"],
        ix: ["Blood lead, urine cadmium"]
      })
    ])
  ])
};

/* ===================== HAGMA ===================== */
LABTREES.agma = {
  panel: [
    "ABG, Na, K, Cl, HCO3, albumin (corrected AG = AG + 2.5 × (4 − albumin))",
    "Lactate, β-hydroxybutyrate, glucose, BUN, Cr, CK, PO4",
    "Measured serum osm และ ethanol level เพื่อคำนวณ osmolal gap = measured − (2Na + glucose/18 + BUN/2.8 + ethanol/3.7)",
    "Salicylate และ paracetamol level",
    "Urinalysis หา crystal (calcium oxalate), methanol และ ethylene glycol level ถ้ามี",
    "Urine organic acids (5-oxoproline), D-lactate, metformin level ตามบริบท",
    "Delta ratio = (AG − 12)/(24 − HCO3) เพื่อหา disorder ร่วม"
  ],
  pit: [
    "Albumin ต่ำ 1 g/dL ลด AG ราว 2.5 mmol/L ถ้าไม่ correct จะพลาด AGMA",
    "Osmolal gap > 10 ผิดปกติ แต่ lactic และ ketoacidosis ทำ gap สูงเล็กน้อยได้ gap > 20-25 จึงชี้ toxic alcohol มากกว่า",
    "Toxic alcohol ระยะหลัง osmolal gap กลับปกติขณะ AG สูงสุด ต้องดูเวลาที่กิน",
    "Glycolate จาก ethylene glycol ทำ lactate สูงเท็จในบาง analyzer (lactate gap ระหว่าง blood gas กับ lab)",
    "Nitroprusside urine ketone ตรวจไม่พบ β-OHB ต้องวัด β-OHB ใน serum",
    "Standard lactate assay วัดเฉพาะ L-lactate จึงพลาด D-lactic acidosis"
  ],
  tree: N("High anion gap metabolic acidosis", "root", {
    s: "Correct AG ด้วย albumin แล้วตรวจ lactate, β-OHB, osmolal gap, salicylate และ creatinine พร้อมกัน แต่ละผลชี้กลุ่มโรคโดยตรง แต่สาเหตุซ้อนกันได้บ่อย (เช่น DKA ร่วม lactic acidosis จาก sepsis) ผลหนึ่งบวกจึงไม่ตัดสาเหตุอื่น",
    why: "AGMA มีกลุ่มสาเหตุจำกัด lab ชุดเดียวแยกได้เกือบหมด และ delta ratio บอก disorder ที่ซ่อนอยู่",
    keys: ["Lactate > 4 mmol/L = lactic acidosis", "β-OHB ≥ 3.0 mmol/L = ketoacidosis", "Osmolal gap > 10-20 ชี้ toxic alcohol (gap ปกติไม่ตัดออกถ้ามาช้า)", "Salicylate สูงหรือ respiratory alkalosis ร่วม", "eGFR ต่ำมากและ AG ≤ 20-24 = uremia", "Delta ratio < 1 มี NAGMA ร่วม, > 2 มี metabolic alkalosis ร่วม"],
    ix: ["Lactate, β-OHB, osm gap, salicylate, Cr, CK"],
    std: "Kraut JA, Madias NE. Serum anion gap, Clin J Am Soc Nephrol 2007, Kraut JA, Madias NE. Lactic acidosis, NEJM 2014"
  }, [
    N("Lactate > 4 mmol/L: lactic acidosis", "step", {
      s: "Type A จาก hypoperfusion หรือ hypoxia, type B เมื่อ perfusion ปกติ",
      keys: ["Hypotension, ScvO2 ต่ำ, capillary refill ช้า = type A", "Perfusion ปกติ = type B"],
      ix: ["Perfusion assessment, drug review, metformin level, thiamine"]
    }, [
      N("Type A: shock and tissue hypoxia", "adj", {
        s: "Septic, cardiogenic, hypovolemic shock, mesenteric ischemia, CO และ cyanide poisoning, severe anemia",
        why: "Lactate clearance เป็นเป้าหมาย resuscitation",
        keys: ["Hypoperfusion ชัด", "Cyanide: lactate > 8-10 mmol/L ร่วม smoke inhalation"],
        ix: ["Source control, CT angiography ถ้าคิด mesenteric ischemia, carboxyhemoglobin"]
      }),
      N("Metformin-associated lactic acidosis", "nephro", {
        s: "Metformin สะสมเมื่อ AKI หรือ eGFR < 30",
        why: "Lactate สูงมากและ pH ต่ำมาก dialysis ขจัดทั้ง metformin และ lactate",
        keys: ["Lactate > 5 mmol/L, pH < 7.35 ร่วม metformin", "AKI"],
        ix: ["Metformin level"],
        std: "EXTRIP 2015 (Calello DP et al. Crit Care Med 2015): แนะนำ ECTR ถ้า lactate > 20 mmol/L, pH ≤ 7.0, shock หรือ standard supportive care ล้มเหลว และ suggest ถ้าซึมลง"
      }),
      N("Drug and nutritional type B", "adj", {
        s: "Linezolid, NRTI, propofol infusion syndrome, epinephrine, β2 agonist, thiamine deficiency, isoniazid seizure",
        why: "Thiamine deficiency ใน alcohol และ malnutrition แก้ได้ทันที",
        keys: ["Perfusion ปกติ", "ประวัติยา"],
        ix: ["Thiamine level หรือ trial thiamine"]
      }),
      N("Malignancy and liver failure", "adj", {
        s: "Warburg effect ใน lymphoma หรือ leukemia, liver failure ลด lactate clearance",
        why: "Type B lactic acidosis ใน hematologic malignancy อาจมี hypoglycemia ร่วม และบ่งพยากรณ์โรคไม่ดี",
        keys: ["LDH สูง, hypoglycemia", "INR สูงใน liver failure"],
        ix: ["Imaging, LFT"]
      }),
      N("D-lactic acidosis", "adj", {
        s: "Short bowel, jejunoileal bypass, ataxia และ encephalopathy หลังมื้อที่มี carbohydrate สูง",
        why: "Standard lactate ปกติ ต้องสั่ง D-lactate โดยเฉพาะ",
        keys: ["L-lactate ปกติ AG สูง", "Short bowel"],
        ix: ["D-lactate assay"]
      })
    ]),
    N("β-OHB ≥ 3.0 mmol/L: ketoacidosis", "step", {
      s: "แยกด้วย glucose, insulin history, SGLT2i และ ethanol",
      keys: ["Glucose ≥ 200 mg/dL หรือมีประวัติ DM = DKA", "Glucose < 200 mg/dL ร่วม SGLT2i, ตั้งครรภ์, อดอาหาร หรือได้ insulin มาก่อน = euglycemic DKA", "Glucose ปกติหรือต่ำร่วม ethanol หรืออดอาหาร = AKA หรือ starvation"],
      ix: ["Glucose, HbA1c, ethanol, lipase"],
      std: "Umpierrez GE et al. ADA/EASD/JBDS/AACE/DTS hyperglycemic crises consensus, Diabetes Care 2024"
    }, [
      N("Diabetic ketoacidosis", "adj", {
        s: "Glucose ≥ 200 mg/dL หรือมีประวัติ DM, β-OHB ≥ 3.0 mmol/L, pH < 7.3 หรือ HCO3 < 18 mmol/L",
        why: "K แรกรับปกติหรือสูงแต่ total K ต่ำ เริ่ม insulin เมื่อ K ≥ 3.5",
        keys: ["Glucose สูง β-OHB สูง"],
        ix: ["Precipitant: infection, insulin omission, MI"],
        std: "ADA/EASD consensus 2024"
      }),
      N("Euglycemic DKA with SGLT2 inhibitor", "adj", {
        s: "Glucose < 200 mg/dL (ADA/EASD 2024, เกณฑ์เดิม < 250), หลังผ่าตัด อดอาหาร ลด insulin",
        why: "Glucose ไม่สูงจึงพลาดง่าย ต้องวัด β-OHB ในผู้ใช้ SGLT2i ที่ป่วย",
        keys: ["β-OHB สูง glucose < 200 mg/dL", "ใช้ SGLT2i"],
        ix: ["หยุด SGLT2i ก่อนผ่าตัด 3-4 วัน"]
      }),
      N("Alcoholic and starvation ketoacidosis", "adj", {
        s: "ดื่มหนักแล้วอาเจียน กินไม่ได้ หรืออดอาหารนาน",
        why: "AKA มักมี metabolic alkalosis และ lactic acidosis ร่วม, starvation ketosis HCO3 ไม่ค่อยต่ำกว่า 18",
        keys: ["Glucose ปกติหรือต่ำ", "Ethanol level ต่ำหรือตรวจไม่พบตอนมาถึง", "Delta ratio > 2 ถ้าอาเจียนร่วม"],
        ix: ["Lipase, thiamine"]
      })
    ]),
    N("Osmolal gap > 10-20 mOsm/kg not explained by ethanol, ketones or lactate: toxic alcohol", "step", {
      s: "Parent alcohol เพิ่ม osm gap, metabolite ที่เป็นกรดเพิ่ม AG",
      why: "ให้ fomepizole ก่อนได้ผล level เมื่อสงสัย และพิจารณา hemodialysis ตาม EXTRIP",
      keys: ["Osm gap > 20-25 ชี้ toxic alcohol ชัด", "Osm gap สูงแต่ AG ปกติ: isopropanol (ketosis ไม่มี acidosis) หรือ methanol และ ethylene glycol ระยะแรกที่ยังไม่ถูก metabolize", "Osm gap ปกติแต่ AG สูง: ยังเป็น toxic alcohol ระยะหลังได้", "Calcium oxalate crystal, hypocalcemia = ethylene glycol", "Visual disturbance = methanol"],
      ix: ["Methanol, ethylene glycol level", "Urinalysis หา crystal, Ca"],
      std: "EXTRIP methanol (Roberts DM et al. Crit Care Med 2015), EXTRIP ethylene glycol (Ghannoum M et al. Crit Care 2023), AACT fomepizole guidance"
    }, [
      N("Methanol", "adj", {
        s: "Formic acid ทำ optic neuropathy และ putaminal necrosis",
        why: "เหล้าเถื่อนปนเปื้อนเป็นสาเหตุ outbreak ในไทยและเอเชีย",
        keys: ["Visual disturbance, AG สูงมาก", "Osm gap สูง"],
        ix: ["Methanol level, brain CT หรือ MRI"]
      }),
      N("Ethylene glycol", "nephro", {
        s: "Glycolate ทำ acidosis, oxalate ทำ AKI",
        why: "Calcium oxalate monohydrate crystal ในปัสสาวะและ AKI เป็นลักษณะเด่น",
        keys: ["Calcium oxalate crystal (ไม่พบไม่ตัดออก)", "Hypocalcemia", "Lactate gap (glycolate interference)"],
        ix: ["Ethylene glycol level, urinalysis"]
      }),
      N("Diethylene glycol and propylene glycol", "adj", {
        s: "DEG ในยาน้ำปนเปื้อน ทำ AKI และ neuropathy, PG จาก lorazepam หรือ diazepam infusion",
        why: "PG สะสมใน ICU ที่ได้ benzodiazepine IV ขนาดสูง ทำ lactic acidosis และ osm gap",
        keys: ["Osm gap สูงใน ICU ที่ได้ lorazepam drip"],
        ix: ["Drug review, PG level"]
      })
    ]),
    N("Salicylate level high or mixed respiratory alkalosis with AGMA", "step", {
      s: "Salicylate กระตุ้น respiratory center และ uncouple oxidative phosphorylation",
      keys: ["pCO2 ต่ำกว่า Winter คาด", "Salicylate level สูง"],
      ix: ["Salicylate level ซ้ำทุก 2 ชั่วโมงจนลดลง (enteric-coated ดูดซึมช้า)"]
    }, [
      N("Salicylate poisoning", "adj", {
        s: "Tinnitus, hyperventilation, noncardiogenic pulmonary edema, AMS",
        why: "Chronic toxicity ในผู้สูงอายุมี level ไม่สูงมากแต่อาการรุนแรง",
        keys: ["Mixed respiratory alkalosis และ AGMA"],
        ix: ["Salicylate level"],
        std: "Juurlink DN et al. EXTRIP salicylate recommendations, Ann Emerg Med 2015"
      })
    ]),
    N("Lactate, ketone, osm gap and salicylate unremarkable", "step", {
      s: "หาสาเหตุที่เหลือด้วย Cr, CK, urine organic acids และ toxin",
      keys: ["eGFR ต่ำมาก = uremia", "CK สูง = rhabdomyolysis", "Paracetamol ร่วม sepsis หรือ malnutrition = 5-oxoproline", "Osm gap ปกติไม่ตัด toxic alcohol ที่มาช้า ถ้าประวัติเข้าได้ให้ส่ง level"],
      ix: ["Cr, CK, urine 5-oxoproline, iron level"]
    }, [
      N("Uremic acidosis", "nephro", {
        s: "PO4, sulfate, urate คั่ง AG มักไม่เกิน 20-24",
        why: "ถ้า AG สูงกว่านี้ต้องหาสาเหตุอื่นร่วม",
        keys: ["eGFR < 15-20", "AG ≤ 20-24"],
        ix: ["PO4, sulfate"],
        link: "risingcr"
      }),
      N("Rhabdomyolysis", "nephro", {
        s: "Organic anion และ PO4 จากกล้ามเนื้อ",
        why: "ร่วม K สูง PO4 สูง Ca ต่ำ",
        keys: ["CK > 5 เท่าของ ULN", "Dipstick heme บวกโดยไม่มี RBC"],
        ix: ["CK, myoglobin"],
        link: "myalgia"
      }),
      N("Pyroglutamic acidosis (5-oxoproline)", "adj", {
        s: "Glutathione depletion จาก paracetamol ร่วม sepsis, malnutrition, CKD, flucloxacillin, vigabatrin",
        why: "พบบ่อยในผู้หญิงสูงอายุที่ได้ paracetamol ขนาดปกติต่อเนื่อง",
        keys: ["AG สูงมากโดยไม่มี lactate หรือ ketone", "Paracetamol ใช้ต่อเนื่อง"],
        ix: ["Urine organic acids (5-oxoproline)"]
      }),
      N("Other toxins", "adj", {
        s: "Iron, isoniazid, cyanide, toluene ช่วงแรก, paraldehyde",
        why: "Iron overdose มี GI bleed และ shock, isoniazid มี refractory seizure ตอบสนอง pyridoxine",
        keys: ["ประวัติ ingestion"],
        ix: ["Serum iron, toxicology"]
      })
    ])
  ])
};

/* ===================== METABOLIC ALKALOSIS ===================== */
LABTREES.metalk = {
  panel: [
    "ABG (expected pCO2 = 0.7 × HCO3 + 21 ± 2 หรือ pCO2 เพิ่ม 0.7 ต่อ HCO3 ที่เพิ่ม 1)",
    "Na, K, Cl, Mg, Ca, Cr, glucose",
    "Spot urine Cl, Na, K, pH, Ca, Cr",
    "BP และ volume assessment",
    "Plasma renin และ aldosterone (และ cortisol, DOC) ถ้ามี HTN",
    "Urine diuretic screen ถ้า urine Cl สูงโดยไม่มี HTN"
  ],
  pit: [
    "Urine Cl แม่นกว่า urine Na เพราะ bicarbonaturia พา Na ออกในช่วงอาเจียน",
    "Urine Cl สูงชั่วคราวหลังกิน diuretic ทำให้ดูเหมือน chloride-resistant ต้องตรวจซ้ำ",
    "Hypokalemia รุนแรงเองทำ alkalosis ไม่ตอบสนองต่อ saline จนกว่าจะแก้ K",
    "ใน CKD ขั้นสูงหรือ dialysis urine Cl ใช้แบ่งไม่ได้"
  ],
  tree: N("Metabolic alkalosis", "root", {
    s: "ยืนยัน compensation ด้วย pCO2 แล้วใช้ urine Cl แบ่ง chloride-responsive กับ resistant จากนั้น BP, renin, aldosterone, diuretic screen, urine Ca และ Mg ไปสู่โรค",
    why: "Urine Cl บอกว่า Cl และ volume depletion เป็นตัว maintain alkalosis หรือไม่ ซึ่งกำหนดการรักษาทันที",
    keys: ["Urine Cl < 20 = chloride-responsive", "Urine Cl > 20 + HTN ชี้ mineralocorticoid excess (ตัด diuretic ที่ใช้รักษา HTN ก่อน)", "Urine Cl > 20 + BP ปกติหรือต่ำ = diuretic, Gitelman, Bartter, K หรือ Mg ต่ำมาก"],
    ix: ["Urine Cl, BP, renin, aldosterone, diuretic screen, urine Ca/Cr, Mg"],
    std: "Luke RG, Galla JH. It is chloride depletion alkalosis, not contraction alkalosis, J Am Soc Nephrol 2012, Emmett M. Metabolic alkalosis: a brief pathophysiologic review, Clin J Am Soc Nephrol 2020"
  }, [
    N("Urine Cl < 20 mmol/L: chloride-responsive", "step", {
      s: "Cl และ volume depletion maintain alkalosis แก้ด้วย NaCl และ KCl",
      keys: ["Urine Cl < 20", "Urine Na อาจสูงช่วงที่มี bicarbonaturia"],
      ix: ["ประวัติอาเจียน, NG suction, diuretic และ pCO2 เดิมใน COPD"]
    }, [
      N("Vomiting and NG suction", "adj", {
        s: "เสีย HCl ทำ generation, volume depletion ทำ maintenance",
        why: "Urine pH > 6.5 และ urine Na สูงในช่วงที่ยังอาเจียน",
        keys: ["Urine Cl < 20", "K ต่ำ"],
        ix: ["Eating disorder screen"]
      }),
      N("Remote diuretic use", "adj", {
        s: "Urine Cl ต่ำเมื่อยาหมดฤทธิ์",
        why: "ตรวจ urine screen ซ้ำ",
        keys: ["Urine Cl ต่ำ ณ ตอนนี้ แต่สูงในตัวอย่างก่อน"],
        ix: ["Urine diuretic screen"]
      }),
      N("Post-hypercapnic alkalosis", "adj", {
        s: "COPD ที่ HCO3 สูงเพื่อ compensate แล้ว pCO2 ถูกลดเร็วด้วย ventilator",
        why: "ไตขับ HCO3 ไม่ทันเพราะ Cl depletion",
        keys: ["HCO3 สูงหลังแก้ pCO2"],
        ix: ["ABG trend"]
      }),
      N("GI chloride loss", "adj", {
        s: "Congenital chloride diarrhea (SLC26A3), villous adenoma และ cystic fibrosis (เสีย Cl ทางเหงื่อ ไม่ใช่ทาง GI แต่ urine Cl ต่ำแบบเดียวกัน)",
        why: "Diarrhea ที่ทำ alkalosis เป็นเบาะแสของ chloride diarrhea",
        keys: ["Stool Cl > 90 mmol/L ใน congenital chloride diarrhea"],
        ix: ["Stool Cl, sweat chloride test"]
      })
    ]),
    N("Urine Cl > 20 with hypertension: mineralocorticoid excess", "step", {
      s: "แยกด้วย renin และ aldosterone",
      keys: ["ตัด diuretic ที่ใช้รักษา HTN ก่อน (สาเหตุพบบ่อยที่สุดของ urine Cl สูงใน HTN)", "Renin ต่ำ aldosterone สูง = primary aldosteronism", "Renin ต่ำ aldosterone ต่ำ = pseudohyperaldosteronism", "Renin สูง aldosterone สูง = secondary"],
      ix: ["Renin, aldosterone, ARR, cortisol, DOC"],
      std: "Adler GK et al. JCEM 2025",
      link: "htn-young"
    }, [
      N("Primary aldosteronism", "nephro", {
        s: "Renin ต่ำ aldo สูง",
        why: "Endocrine Society 2025 suggest (conditional recommendation) ให้ screen ผู้ป่วยความดันสูงทุกรายด้วย aldosterone, renin และ K",
        keys: ["PRA ≤ 1 ng/mL/h หรือ DRC ≤ 8.2 mU/L", "Aldosterone ≥ 10 ng/dL (immunoassay, ≥ 7.5 ถ้า LC-MS/MS) และ ARR > 20 (ng/dL ต่อ ng/mL/h, cut-off ต่างไปถ้าใช้ DRC) แก้ K ให้ปกติก่อนตรวจเพราะ hypokalemia กด aldosterone"],
        ix: ["Suppression test ตามข้อบ่งชี้, adrenal CT, AVS"]
      }),
      N("Low-aldosterone states (pseudohyperaldosteronism)", "nephro", {
        s: "AME, licorice, Cushing, CAH, DOC tumor หรือ Liddle",
        why: "แยกต่อด้วย cortisol, urinary cortisol/cortisone ratio, DOC และ genetic",
        keys: ["Renin ต่ำ aldosterone ต่ำ"],
        ix: ["Urine free cortisol, cortisol/cortisone ratio, DOC, SCNN1B/G"],
        link: "hypok"
      }),
      N("Secondary hyperaldosteronism", "nephro", {
        s: "Renovascular, renin-secreting tumor, malignant HTN",
        why: "Renin และ aldosterone สูงทั้งคู่",
        keys: ["Renin สูง aldosterone สูง"],
        ix: ["Renal artery imaging, fundoscopy"]
      })
    ]),
    N("Urine Cl > 20 with normal or low BP", "step", {
      s: "Distal Na และ Cl delivery สูงจากยา หรือ tubular defect",
      keys: ["Diuretic screen บวก = diuretic", "Urine Ca/Cr ต่ำและ Mg ต่ำ = Gitelman", "Urine Ca/Cr ปกติหรือสูงชี้ Bartter (แยกจาก Gitelman ไม่ขาด ยืนยันด้วย genetic test)", "K < 2 mmol/L หรือ Mg ต่ำมาก = hypokalemia หรือ hypomagnesemia เองเป็นตัว maintain alkalosis", "Ca สูงร่วม PTH ต่ำ = hypercalcemia หรือ calcium-alkali syndrome"],
      ix: ["Urine diuretic screen, urine Ca/Cr, Mg, Ca"],
      std: "Blanchard A et al. Kidney Int 2017"
    }, [
      N("Current diuretic use", "adj", {
        s: "Loop หรือ thiazide",
        why: "ต้องตัดก่อน inherited tubulopathy",
        keys: ["Urine diuretic screen บวก"],
        ix: ["Urine diuretic screen"]
      }),
      N("Gitelman syndrome", "nephro", {
        s: "Urine Ca ต่ำ, Mg ต่ำ",
        why: "Diagnosis ยืนยันด้วย biallelic SLC12A3, Bartter type 3 (CLCNKB) ให้ phenotype แบบ Gitelman ได้ urine Ca อย่างเดียวจึงแยกไม่ขาด",
        keys: ["Urine Ca/Cr < 0.2 mmol/mmol", "Mg < 0.7 mmol/L", "FECl > 0.5%"],
        ix: ["SLC12A3 genetic test"]
      }),
      N("Bartter syndrome", "nephro", {
        s: "Urine Ca สูง, onset เด็ก",
        why: "Polyuria และ nephrocalcinosis",
        keys: ["Urine Ca/Cr ปกติหรือสูง"],
        ix: ["Bartter gene panel"]
      }),
      N("Severe hypokalemia and hypomagnesemia", "nephro", {
        s: "K < 2 mmol/L กระตุ้น H+-K+-ATPase และ ammoniagenesis",
        why: "Alkalosis ไม่หายจนกว่าจะแก้ K และ Mg",
        keys: ["K < 2", "Mg ต่ำ"],
        ix: ["FEMg"],
        link: "mg"
      }),
      N("Hypercalcemia and calcium-alkali syndrome", "nephro", {
        s: "Ca carbonate กับ AKI, CaSR activation",
        why: "PTH ต่ำ ร่วม AKI",
        keys: ["Ca สูง", "PTH ต่ำ"],
        ix: ["PTH, supplement history"],
        link: "hyperca"
      })
    ]),
    N("Alkali intake with reduced GFR (urine Cl variable)", "step", {
      s: "Alkali load ที่ไตขับไม่ทัน",
      keys: ["eGFR ต่ำ", "ประวัติ alkali, citrate หรือ dialysate HCO3 สูง"],
      ix: ["Drug review, dialysis prescription"]
    }, [
      N("Exogenous bicarbonate, citrate and acetate", "adj", {
        s: "NaHCO3, massive transfusion, regional citrate ใน CRRT, plasma exchange, acetate ใน TPN",
        why: "Citrate 1 mmol ให้ HCO3 3 mmol",
        keys: ["ประวัติได้ citrate หรือ HCO3"],
        ix: ["Total/ionized Ca ratio ใน citrate"]
      }),
      N("Dialysis-related alkalosis", "nephro", {
        s: "Dialysate HCO3 สูง ร่วมกับกินน้อยและ PPI",
        why: "Dialysate HCO3 ที่สูงกว่าสัมพันธ์กับ mortality สูงขึ้นใน DOPPS (Tentori F et al. AJKD 2013)",
        keys: ["Pre-dialysis HCO3 สูง"],
        ix: ["Dialysate HCO3 prescription"]
      }),
      N("Nonreabsorbable anions and refeeding", "adj", {
        s: "Penicillin ขนาดสูง, refeeding หลัง starvation",
        why: "Anion ใน lumen เพิ่ม H+ และ K secretion",
        keys: ["Urine anion gap บวกมาก"],
        ix: ["Drug review"]
      })
    ])
  ])
};
