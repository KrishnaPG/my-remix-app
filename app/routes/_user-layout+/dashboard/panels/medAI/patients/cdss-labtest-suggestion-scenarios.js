/**
 * In these scenarios, the CDSS leverages specific lab tests
 * and their results to distinguish between diseases with similar
 * presentations. The expected outcomes from these tests are directly
 * linked to the potential diagnoses, enabling a more accurate and
 * evidence-based decision-making process.
 */
/**
 Prompt:
    Next, we need to showcase the ability of CDSS to ask for lab tests to 
    pinpoint the diagnosis. Create few scenarios where the symptoms should 
    be such that they point to multiple diseases, and the CDSS needs to suggests 
    two or three lab tests that will definitely decide what exactly the problem is. 
    Do not forget to give detailed problem_description with enough case history 
    that should make it look like the diagnosis could not be pin-pointed without 
    further followup lab tests. The symptoms should point to two different possible 
    diseases, and the CDSS suggests lab tests, with the possible expected LOINC values 
    to determine the exact disease. For each lab test suggested by the CDSS, it should 
    also specify the expected results and for each expected result what the final diagnosis 
    or disease would be. Create such scenarios where the lab tests definitely swing the balance 
    towards one disease or the other. Take some scenarios where many symptoms are common between 
    two diseases, but one or two final questions will determine which of the two diseases the 
    patient is having. Create only the scenarios where valid and authentic LOINC values can be used. 
    Use the below JSON template to generate the scenarios. 
 */
export default [
  {
    patient_id: 102,
    demographics: {
      age: 65,
      sex: "male",
    },
    problem_description:
      "A 65-year-old male presents with chronic abdominal pain, unintentional weight loss, and jaundice. These symptoms could be indicative of either pancreatic cancer or chronic pancreatitis.",
    symptoms: ["chronic abdominal pain", "unintentional weight loss", "jaundice"],
    allergies: [],
    "pre-existing_conditions": [],
    previous_medications: [],
    CDSS_suggestions: {
      lab_tests: [
        {
          name: "CA 19-9",
          LOINC: "8121-7",
          expected_results: {
            "Pancreatic cancer": "Significantly elevated",
            "Chronic pancreatitis": "Normal or slightly elevated",
          },
        },
        {
          name: "Abdominal CT scan",
          LOINC: "74150-4",
          expected_results: {
            "Pancreatic cancer": "Mass or irregularity in the pancreas, possible metastases",
            "Chronic pancreatitis": "Calcification, ductal dilatation or stranding in the pancreas",
          },
        },
        {
          name: "Amylase",
          LOINC: "1798-8",
          expected_results: {
            "Pancreatic cancer": "Normal or slightly elevated",
            "Chronic pancreatitis": "Significantly elevated during acute episodes",
          },
        },
      ],
    },
  },
  {
    patient_id: 2,
    demographics: {
      age: 35,
      sex: "female",
    },
    problem_description:
      "A 35-year-old female presents with fatigue, joint pain, and skin rash. These symptoms could be indicative of either systemic lupus erythematosus (SLE) or rheumatoid arthritis (RA).",
    symptoms: ["fatigue", "joint pain", "skin rash"],
    allergies: [],
    "pre-existing_conditions": [],
    previous_medications: [],
    CDSS_suggestions: {
      lab_tests: [
        {
          name: "Antinuclear antibody (ANA) test",
          LOINC: "33762-6",
          expected_results: {
            SLE: "Positive with high titer",
            RA: "Positive with low titer or negative",
          },
        },
        {
          name: "Anti-double-stranded DNA (anti-dsDNA) antibody",
          LOINC: "35659-2",
          expected_results: {
            SLE: "Positive",
            RA: "Negative",
          },
        },
        {
          name: "Rheumatoid factor (RF)",
          LOINC: "71426-1",
          expected_results: {
            SLE: "Negative or low positive",
            RA: "High positive",
          },
        },
      ],
    },
  },

  {
    patient_id: 3,
    demographics: {
      age: 50,
      sex: "female",
    },
    problem_description:
      "A 50-year-old female has been experiencing progressive shortness of breath, dry cough, and occasional chest pain over the last six months. She has a history of smoking and exposure to industrial chemicals. Despite quitting smoking and avoiding exposure, her symptoms have persisted and worsened, leading to a decrease in her exercise tolerance and affecting her daily activities.",
    symptoms: ["progressive shortness of breath", "dry cough", "occasional chest pain"],
    allergies: [],
    "pre-existing_conditions": ["history of smoking", "industrial chemical exposure"],
    previous_medications: [],
    CDSS_suggestions: {
      lab_tests: [
        {
          name: "High-resolution computed tomography (HRCT) of the chest",
          LOINC: "24331-1",
          expected_results: {
            "Idiopathic Pulmonary Fibrosis (IPF)":
              "Reticular abnormalities, honeycombing, and traction bronchiectasis",
            "Chronic Obstructive Pulmonary Disease (COPD)": "Emphysema and air trapping",
          },
        },
        {
          name: "Pulmonary function tests (PFTs)",
          LOINC: "65759-7",
          expected_results: {
            "Idiopathic Pulmonary Fibrosis (IPF)": "Reduced lung volumes and impaired gas exchange",
            "Chronic Obstructive Pulmonary Disease (COPD)":
              "Obstructive pattern with decreased FEV1/FVC ratio",
          },
        },
        {
          name: "Bronchoalveolar lavage (BAL)",
          LOINC: "3167-4",
          expected_results: {
            "Idiopathic Pulmonary Fibrosis (IPF)":
              "Lymphocytosis with occasional neutrophils and eosinophils",
            "Chronic Obstructive Pulmonary Disease (COPD)":
              "Neutrophilic inflammation without significant lymphocytosis",
          },
        },
      ],
    },
  },
  {
    patient_id: 103,
    demographics: {
      age: 60,
      sex: "male",
    },
    problem_description:
      "A 60-year-old male with a long-standing history of hypertension and recent episodes of severe headaches, palpitations, and episodic sweating. The patient has noted these symptoms to occur sporadically, often lasting for a few hours before resolving spontaneously. Despite adherence to antihypertensive therapy, his blood pressure has shown fluctuations, with some readings significantly higher than usual.",
    symptoms: [
      "severe headaches",
      "palpitations",
      "episodic sweating",
      "blood pressure fluctuations",
    ],
    allergies: [],
    "pre-existing_conditions": ["hypertension"],
    previous_medications: ["antihypertensive drugs"],
    CDSS_suggestions: {
      lab_tests: [
        {
          name: "Plasma metanephrines",
          LOINC: "21482-5",
          expected_results: {
            Pheochromocytoma: "Elevated levels",
            "Essential hypertension": "Normal levels",
          },
        },
        {
          name: "24-hour urinary catecholamines",
          LOINC: "8313-4",
          expected_results: {
            Pheochromocytoma: "Elevated levels of catecholamines",
            "Essential hypertension": "Normal catecholamine levels",
          },
        },
        {
          name: "Abdominal MRI",
          LOINC: "46589-5",
          expected_results: {
            Pheochromocytoma: "Adrenal mass present",
            "Essential hypertension": "No adrenal or renal mass",
          },
        },
      ],
    },
  },

  {
    patient_id: 104,
    demographics: {
      age: 40,
      sex: "male",
    },
    problem_description:
      "A 40-year-old male reports chronic digestive issues characterized by abdominal pain, bloating, and alternating periods of diarrhea and constipation. He has a known allergy to shellfish and reports that his symptoms sometimes worsen after eating. Despite avoiding shellfish and following a gluten-free diet for several weeks, he has seen no significant improvement. He mentions a family history of autoimmune disorders and is concerned about the possibility of an underlying condition causing his symptoms.",
    symptoms: ["abdominal pain", "bloating", "diarrhea", "constipation"],
    allergies: ["shellfish"],
    "pre-existing_conditions": [],
    previous_medications: [],
    CDSS_suggestions: {
      lab_tests: [
        {
          name: "Serum Immunoglobulin A (IgA) anti-tissue transglutaminase (tTG) antibody",
          LOINC: "31013-7",
          expected_results: {
            "Celiac disease": "Elevated levels",
            "Non-celiac gluten sensitivity": "Normal levels",
            "Possible influence of shellfish allergy":
              "Elevated IgA can sometimes be seen in allergic reactions, necessitating further differential testing to confirm celiac disease versus a chronic allergic response.",
          },
        },
        {
          name: "Total serum IgE",
          LOINC: "2465-3",
          expected_results: {
            "Allergic response":
              "Elevated IgE levels, indicating an allergic process, potentially exacerbated by dietary factors or other allergens besides shellfish.",
            "Celiac disease": "Normal IgE levels, as celiac disease is not mediated by IgE.",
          },
        },
        {
          name: "Endoscopic biopsy of the small intestine",
          LOINC: "44781-2",
          expected_results: {
            "Celiac disease": "Villous atrophy and crypt hyperplasia",
            "Non-celiac gluten sensitivity or other gastrointestinal disorders":
              "Normal intestinal morphology",
          },
        },
      ],
    },
    scenario:
      "In this scenario, the patient's shellfish allergy and symptoms point to multiple possible conditions, prompting the CDSS to recommend specific lab tests to differentiate between celiac disease, non-celiac gluten sensitivity, and chronic allergic responses. The tests include markers for autoimmune and allergic reactions, with detailed expected results to guide the diagnosis.",
  },
];
