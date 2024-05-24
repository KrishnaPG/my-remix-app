/**
 * CDSS suggests alternates for doctor's prescription
 */
/**
  Prompt:
    We need to showcase Clinical Decision Support System use-cases to potential customers. In our product demo we need to demo below features:
    1. Based on the patient case notes, CDSS suggests lab tests to be conducted 
    2. Based on the patient case notes symptoms, CDSS identifies the disease and suggests the list of drugs and their dosage as prescription
    3. Based on the patient case notes, CDSS identifies if any drug prescribed by a doctor is not suitable for the patient (e.g. patient has allergic reaction to the drug, or the drug worsens the conditions of other symptoms etc.)
    4. Based on the Patient case notes, CDSS identifies  if any drug prescribed by a doctor will result in Adverse reactions
    5. Based on past medication history, CDSS suggests an alternative drug in the same class than the one prescribed  by a doctor
    6.  Based on past medication history, CDSS suggests an additional drug that enhances the effectiveness of a drug prescribed  by the doctor

    Create a dataset of  3 records in JSON format that captures the use-cases, where each data entry should have a patient case notes with problem description, symptoms, allergies, pre-existing conditions, previous medications etc., followed by CDSS suggestions for lab tests, drugs to prescribe etc. In cases where a drug prescribed by a doctor is needed, assume some reasonable drug and complete the scenario. For the patient's problem description assume a decent scenario that is suitable to demonstrate the use-case at hand.

    Be concise and consistent. The logic behind the CDSS reasoning should be based on authoritative  sources and evidence-based based on patient case notes. 

    Use the below JSON template.
  */
export default [
  {
    patient_id: 105,
    demographics: {
      age: 43,
      sex: "male",
    },
    problem_description:
      "43-year-old male with a recent diagnosis of type 2 diabetes, presenting with polyuria, polydipsia, and unexplained weight loss. The patient has a history of chronic kidney disease (CKD) stage 3, but blood sugar levels have been poorly controlled with diet and exercise alone.",
    symptoms: ["polyuria", "polydipsia", "weight loss"],
    allergies: [],
    "pre-existing_conditions": ["chronic kidney disease stage 3"],
    previous_medications: [],
    prescription: [{ drug: "metformin", dosage: "500 mg orally twice a day" }],
    lab_tests: {
      serum_creatinine: {
        name: "Serum Creatinine",
        result: "2.1 mg/dL",
        LOINC: "2160-0",
      },
      HbA1c: {
        name: "Hemoglobin A1c",
        result: "8.5%",
        LOINC: "4548-4",
      },
    },
    CDSS_suggestions: {
      diagnosis: "Type 2 Diabetes Mellitus",
      alerts: {
        unsuitable_drugs:
          "Metformin due to existing CKD stage 3, as it can increase the risk of lactic acidosis",
        adverse_reactions: "Potential risk of lactic acidosis with metformin in patients with CKD",
      },
      alternative_drug_suggestions: {
        current_drug: "metformin",
        alternative_drug: "linagliptin",
        reason:
          "Linagliptin is safer in patients with CKD as it does not require renal dose adjustment",
      },
    },
  },
  {
    patient_id: 4,
    demographics: {
      age: 59,
      sex: "female",
    },
    problem_description:
      "59-year-old female with a history of osteoporosis and recent diagnosis of breast cancer. She is experiencing severe back pain and needs opioids for pain management. The patient also has a history of peptic ulcer disease.",
    symptoms: ["severe back pain"],
    allergies: ["codeine"],
    "pre-existing_conditions": ["osteoporosis", "peptic ulcer disease", "breast cancer"],
    previous_medications: ["alendronate", "omeprazole"],
    prescription: [
      {
        drug: "oxycodone",
        dosage: "10 mg orally every 6 hours as needed for pain",
      },
    ],
    lab_tests: {
      calcium: {
        name: "Calcium",
        result: "9.2 mg/dL",
        LOINC: "17861-6",
      },
      vitamin_D: {
        name: "25-Hydroxyvitamin D",
        result: "30 ng/mL",
        LOINC: "6224-2",
      },
    },
    CDSS_suggestions: {
      diagnosis: "Breast Cancer with Metastatic Bone Pain",
      alerts: {
        unsuitable_drugs:
          "Oxycodone due to high risk of gastrointestinal side effects, exacerbating peptic ulcer disease",
        adverse_reactions:
          "Increased risk of GI bleeding with NSAIDs, and opioids may exacerbate ulcer disease",
      },
      alternative_drug_suggestions: {
        current_drug: "oxycodone",
        alternative_drug: "transdermal fentanyl",
        reason:
          "Transdermal fentanyl provides effective pain relief with lower risk of gastrointestinal side effects",
      },
    },
  },
  {
    patient_id: 106,
    demographics: {
      age: 67,
      sex: "male",
    },
    problem_description:
      "67-year-old male with Parkinson's disease experiencing worsening tremors and bradykinesia. The patient also has a history of glaucoma.",
    symptoms: ["tremors", "bradykinesia"],
    allergies: ["amantadine"],
    "pre-existing_conditions": ["Parkinson's disease", "glaucoma"],
    previous_medications: ["levodopa/carbidopa"],
    prescription: [
      { drug: "levodopa/carbidopa", dosage: "100/25 mg three times a day" },
      { drug: "bromocriptine", dosage: "2.5 mg daily" },
    ],
    lab_tests: {
      intraocular_pressure: {
        name: "Intraocular Pressure",
        result: "24 mmHg",
        LOINC: "LP19355-9",
      },
    },
    CDSS_suggestions: {
      diagnosis: "Parkinson's Disease with Complicated Glaucoma",
      alerts: {
        unsuitable_drugs:
          "Bromocriptine due to potential for increasing intraocular pressure in glaucoma patients",
        adverse_reactions: "Worsening of glaucoma with certain Parkinson's disease medications",
      },
      alternative_drug_suggestions: {
        current_drug: "bromocriptine",
        alternative_drug: "ropinirole",
        reason:
          "Ropinirole is less likely to affect intraocular pressure and is effective in managing Parkinson's symptoms",
      },
    },
    scenario:
      "The prescribed medication aims to improve motor symptoms but can increase intraocular pressure, potentially worsening the glaucoma.",
  },

  /**
   * CDSS suggests alternates based on previous medication
   */
  {
    patient_id: 107,
    demographics: {
      age: 38,
      sex: "male",
    },
    problem_description:
      "38-year-old male with a recent diagnosis of hypertension and a history of depression. The patient has been experiencing headaches and occasional chest pain. He has been on sertraline for depression for the past year.",
    symptoms: ["headaches", "occasional chest pain"],
    allergies: [],
    "pre-existing_conditions": ["depression"],
    previous_medications: ["sertraline"],
    prescription: [{ drug: "amlodipine", dosage: "5 mg orally daily" }],
    lab_tests: {
      blood_pressure: {
        name: "Blood Pressure",
        result: "140/90 mmHg",
        LOINC: "85354-9",
      },
    },
    CDSS_suggestions: {
      diagnosis: "Hypertension",
      alerts: {
        unsuitable_drugs:
          "Amlodipine may cause edema which can exacerbate sertraline-induced hyponatremia",
        adverse_reactions:
          "Risk of increased edema and hyponatremia with the combination of sertraline and amlodipine",
      },
      alternative_drug_suggestions: {
        current_drug: "amlodipine",
        alternative_drug: "losartan",
        reason: "Losartan is less likely to cause edema and does not interact with sertraline",
      },
    },
  },
  {
    patient_id: 5,
    demographics: {
      age: 52,
      sex: "female",
    },
    problem_description:
      "A 52-year-old female with a history of type 2 diabetes and chronic back pain, which has been managed with metformin and ibuprofen for the past five years. Recently, she has been experiencing worsening symptoms of diabetic neuropathy, including tingling, numbness, and sharp, shooting pains in her lower extremities. These symptoms have progressively intensified, affecting her sleep and daily activities. Her current regimen includes metformin for diabetes management, but she now requires additional medication specifically targeting the neuropathic pain. Given her allergy to codeine, the treatment options are limited. She has a steady HbA1c level of 7.2%, indicating relatively good glycemic control, yet the neuropathic pain remains a significant concern.",
    symptoms: ["chronic back pain", "diabetic neuropathy symptoms"],
    allergies: ["codeine"],
    "pre-existing_conditions": ["type 2 diabetes"],
    previous_medications: ["metformin", "ibuprofen"],
    prescription: [{ drug: "pregabalin", dosage: "75 mg twice daily" }],
    lab_tests: {
      HbA1c: {
        name: "Hemoglobin A1c",
        result: "7.2%",
        LOINC: "4548-4",
      },
    },
    CDSS_suggestions: {
      diagnosis: "Diabetic Neuropathy",
      alerts: {
        unsuitable_drugs:
          "Long-term ibuprofen use with pregabalin may increase the risk of renal impairment",
        adverse_reactions:
          "Risk of renal dysfunction with the concurrent use of NSAIDs and pregabalin in patients with diabetes",
      },
      alternative_drug_suggestions: {
        current_drug: "ibuprofen",
        alternative_drug: "acetaminophen",
        reason:
          "Acetaminophen is a safer alternative for pain management in diabetic neuropathy patients to reduce the risk of renal impairment",
      },
    },
  },

  /**
   * Create three scenarios where the doctor prescribed medication 
      looks fine on the surface but fails to take the lab test results into account. 
      CDSS should point that out and give the suggestions to fix that issue.
      Give scenarios with valid LOINC code only. The lab tests should have 
      meaningful values with authentic LOINC codes. Do not use lab tests where the LOINC code is not known. 
   */
  {
    patient_id: 108,
    demographics: {
      age: 56,
      sex: "male",
    },
    problem_description:
      "A 56-year-old male patient presents with progressive weakness, nocturnal leg cramps, and polyuria. He has a history of hypertension and is currently on hydrochlorothiazide. The patient's blood pressure has been well-controlled on this regimen.",
    symptoms: ["progressive weakness", "nocturnal leg cramps", "polyuria"],
    allergies: [],
    "pre-existing_conditions": ["hypertension"],
    previous_medications: ["hydrochlorothiazide"],
    prescription: [{ drug: "hydrochlorothiazide", dosage: "25 mg orally daily" }],
    lab_tests: {
      serum_potassium: {
        name: "Serum Potassium",
        result: "3.2 mmol/L",
        LOINC: "2823-3",
      },
      serum_sodium: {
        name: "Serum Sodium",
        result: "147 mmol/L",
        LOINC: "2951-2",
      },
    },
    CDSS_suggestions: {
      diagnosis: "Hypokalemia secondary to hydrochlorothiazide use",
      alerts: {
        unsuitable_drugs:
          "Continued use of hydrochlorothiazide without addressing hypokalemia can lead to severe electrolyte imbalance.",
        adverse_reactions: "Risk of cardiac arrhythmias and muscle weakness due to hypokalemia",
      },
      alternative_drug_suggestions: {
        current_drug: "hydrochlorothiazide",
        alternative_drug: "potassium-sparing diuretic like spironolactone",
        reason:
          "Spironolactone can help in managing hypertension while also preventing potassium loss",
      },
    },
  },
  {
    patient_id: 6,
    demographics: {
      age: 48,
      sex: "female",
    },
    problem_description:
      "A 48-year-old female with complaints of fatigue, pallor, and shortness of breath on exertion. She has a history of heavy menstrual bleeding and has been taking oral iron supplements.",
    symptoms: ["fatigue", "pallor", "shortness of breath on exertion"],
    allergies: [],
    "pre-existing_conditions": ["menorrhagia"],
    previous_medications: ["oral iron supplements"],
    prescription: [{ drug: "ferrous sulfate", dosage: "325 mg orally three times a day" }],
    lab_tests: {
      hemoglobin: {
        name: "Hemoglobin",
        result: "7.8 g/dL",
        LOINC: "718-7",
      },
      ferritin: {
        name: "Ferritin",
        result: "500 ng/mL",
        LOINC: "2276-4",
      },
    },
    CDSS_suggestions: {
      diagnosis: "Iron overload with anemia of chronic disease, rather than iron deficiency anemia",
      alerts: {
        unsuitable_drugs:
          "Oral iron supplementation can exacerbate iron overload and should be avoided in the presence of high ferritin levels.",
        adverse_reactions: "Risk of worsening iron overload and potential organ damage",
      },
      alternative_drug_suggestions: {
        current_drug: "ferrous sulfate",
        alternative_drug:
          "Evaluation for sources of chronic blood loss and appropriate management of anemia of chronic disease",
        reason:
          "Treatment should focus on the underlying cause of the anemia and avoid excess iron supplementation",
      },
    },
  },
  {
    patient_id: 109,
    demographics: {
      age: 65,
      sex: "male",
    },
    problem_description:
      "A 65-year-old male with type 2 diabetes and peripheral neuropathy presents with numbness and tingling in his feet. He needs to be prescribed a drug for neuropathic pain relief.",
    symptoms: ["numbness", "tingling in feet"],
    allergies: [],
    "pre-existing_conditions": ["type 2 diabetes", "peripheral neuropathy"],
    previous_medications: ["metformin"],
    prescription: [{ drug: "pregabalin", dosage: "75 mg twice daily" }],
    lab_tests: {
      HbA1c: {
        name: "Hemoglobin A1c",
        result: "9.0%",
        LOINC: "4548-4",
      },
      serum_creatinine: {
        name: "Serum Creatinine",
        result: "1.9 mg/dL",
        LOINC: "2160-0",
      },
    },
    CDSS_suggestions: {
      diagnosis: "Worsening diabetic neuropathy with inadequate glycemic control",
      alerts: {
        unsuitable_drugs:
          "Pregabalin requires dose adjustment in renal impairment, which may not have been considered.",
        adverse_reactions: "Risk of pregabalin toxicity due to decreased renal clearance",
      },
      alternative_drug_suggestions: {
        current_drug: "pregabalin",
        alternative_drug:
          "Dose-adjusted pregabalin or alternative neuropathic pain management suitable for renal function",
        reason: "To prevent drug accumulation and toxicity due to reduced kidney function",
      },
    },
  },
  /**
   * scenarios where an additional drug is required alongside the doctor's prescribed medication to effectively manage the patient's condition. Give scenarios with authenticated source and has valid doi only.
   */
  {
    patient_id: 7,
    demographics: {
      age: 65,
      sex: "female",
    },
    problem_description:
      "A 65-year-old female with type 2 diabetes is currently on metformin 625 mg. She has persistent hyperglycemia and a recent HbA1c of 8.5%. Despite lifestyle changes and metformin, her glucose levels remain above target.",
    symptoms: ["persistent hyperglycemia"],
    allergies: [],
    "pre-existing_conditions": ["type 2 diabetes"],
    previous_medications: ["metformin"],
    prescription: [{ drug: "metformin", dosage: "1000 mg twice daily" }],
    lab_tests: {
      HbA1c: {
        name: "Hemoglobin A1c",
        result: "8.5%",
        LOINC: "4548-4",
      },
    },
    CDSS_suggestions: {
      diagnosis: "Uncontrolled Type 2 Diabetes",
      alerts: {
        unsuitable_drugs: null,
        adverse_reactions: null,
        additional_drugs:
          "Combining metformin with an SGLT2 inhibitor like empagliflozin has been shown to significantly improve glycemic control, reduce body weight, and offer cardiovascular benefits in patients with type 2 diabetes.",
      },
      alternative_drug_suggestions: null,
      additional_drug_suggestions: {
        name: "empagliflozin",
        dosage: "10 mg daily",
        source:
          "Empagliflozin, Cardiovascular Outcomes, and Mortality in Type 2 Diabetes, New England Journal of Medicine",
        doi: "10.1056/NEJMoa1504720",
      },
    },
  },
];
