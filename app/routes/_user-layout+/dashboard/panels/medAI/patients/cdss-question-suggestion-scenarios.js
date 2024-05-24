/**
 * In these scenarios, the CDSS uses targeted questions
 * to effectively differentiate between diseases with
 * similar presentations. Each answer provided by the patient
 * leads directly to a specific diagnosis, illustrating the
 * power of detailed clinical assessment in guiding the diagnostic process.
 * */
/**
 Prompt:
    Next, we need to showcase the ability of CDSS to ask more drill-down 
    followup questions about the symptoms to pinpoint the diagnosis. Create 
    few scenarios where the symptoms should be such that they point to multiple 
    diseases, and the CDSS needs to suggests two or three follow-up questions 
    that will definitely decide what exactly the problem is. Do not forget to 
    give detailed problem_description with enough case history that should make 
    it look like the diagnosis could not be pin-pointed without further followup questions. 
    For each followup question suggested by the CDSS, it should also specify the 
    possible answers and for each answer what the final diagnosis or disease would be. 
    Create such scenarios where the follow-up questions definitely swing the balance 
    towards one disease or the other. Take some scenarios where many symptoms are common 
    between two diseases, but one or two final questions will determine which of the two 
    diseases the patient is having. Create few scenarios like that. 
    Use the below JSON template to generate the scenarios. 
 */
export default [
  {
    patient_id: 0,
    demographics: {
      age: 30,
      sex: "female",
    },
    problem_description:
      "A 30-year-old female presents with joint pain, skin rash, and fatigue. The symptoms have been persistent for the past few months. Her joint pain is symmetrical and mostly affects her hands and wrists. The rash appears as red, scaly patches on her face and arms.",
    symptoms: ["joint pain", "skin rash", "fatigue"],
    allergies: ["none"],
    "pre-existing_conditions": ["none"],
    previous_medications: ["none"],
    CDSS_suggestions: {
      follow_up_questions: [
        {
          question: "Does exposure to sunlight worsen your skin rash?",
          answers: {
            "Yes, exposure to sunlight exacerbates the rash":
              "Suggestive of systemic lupus erythematosus (SLE), which often features photosensitivity.",
            "No, sunlight has no effect on my rash":
              "Indicative of rheumatoid arthritis (RA), where rashes are not typically photosensitive.",
          },
        },
        {
          question:
            "Are your joint symptoms accompanied by morning stiffness lasting more than one hour?",
          answers: {
            "Yes, significant morning stiffness is experienced":
              "Consistent with rheumatoid arthritis (RA), characterized by prolonged morning stiffness.",
            "No, there is minimal or no morning stiffness":
              "More likely systemic lupus erythematosus (SLE), where joint symptoms may not include prolonged stiffness.",
          },
        },
      ],
    },
  },
  {
    patient_id: 100,
    demographics: {
      age: 55,
      sex: "male",
    },
    problem_description:
      "A 55-year-old male presents with persistent cough, shortness of breath, and unexplained weight loss over the past three months. He is a smoker and has been experiencing occasional chest tightness.",
    symptoms: ["persistent cough", "shortness of breath", "weight loss", "chest tightness"],
    allergies: ["none"],
    "pre-existing_conditions": ["smoking history"],
    previous_medications: ["none"],
    CDSS_suggestions: {
      follow_up_questions: [
        {
          question:
            "Do you experience your cough and breathlessness more during the night or early morning?",
          answers: {
            "Yes, mainly at night or early morning":
              "Indicative of chronic obstructive pulmonary disease (COPD), often exacerbated at night.",
            "No, symptoms are consistent throughout the day":
              "Suggestive of lung cancer, where symptoms persist uniformly throughout the day.",
          },
        },
        {
          question:
            "Have you noticed any change in the pitch of your voice or difficulty swallowing?",
          answers: {
            "Yes, there is a noticeable change in voice and difficulty swallowing":
              "Possible lung cancer, indicating potential involvement of the laryngeal nerves or esophagus.",
            "No changes in voice or swallowing difficulties":
              "More likely chronic obstructive pulmonary disease (COPD), primarily affecting the lungs without esophageal involvement.",
          },
        },
      ],
    },
  },

  {
    patient_id: 1,
    demographics: {
      age: 45,
      sex: "female",
    },
    problem_description:
      "A 45-year-old female presents with nasal congestion, sneezing, and itchy eyes. She also complains of occasional wheezing and shortness of breath. She has a known allergy to pollen and has experienced these symptoms recurrently in the spring and fall.",
    symptoms: ["nasal congestion", "sneezing", "itchy eyes", "wheezing", "shortness of breath"],
    allergies: ["pollen"],
    "pre-existing_conditions": ["none"],
    previous_medications: ["antihistamines"],
    CDSS_suggestions: {
      follow_up_questions: [
        {
          question: "Do your symptoms improve with indoor stay and worsen with outdoor exposure?",
          answers: {
            "Yes, symptoms are better indoors and worsen outdoors":
              "Indicative of allergic rhinitis, likely exacerbated by pollen exposure.",
            "No, symptoms persist regardless of indoor or outdoor environment":
              "Suggestive of asthma, potentially triggered by an allergy but persistent in different environments.",
          },
        },
        {
          question:
            "Have you noticed any skin reactions or exacerbation of symptoms after taking new medications or consuming certain foods?",
          answers: {
            "Yes, symptoms worsen with new medications or certain foods":
              "Possible food or drug allergy, contributing to the exacerbation of respiratory symptoms.",
            "No, there is no correlation with medications or food intake":
              "Likely allergic rhinitis or asthma, with symptoms unrelated to food or drug allergens.",
          },
        },
      ],
    },
  },
  {
    patient_id: 101,
    demographics: {
      age: 35,
      sex: "male",
    },
    problem_description:
      "A 35-year-old male with a history of digestive issues presents with abdominal pain, bloating, and diarrhea. He has a known allergy to lactose and reports that his symptoms have recently intensified after meals.",
    symptoms: ["abdominal pain", "bloating", "diarrhea"],
    allergies: ["lactose"],
    "pre-existing_conditions": ["digestive issues"],
    previous_medications: ["lactase supplements"],
    CDSS_suggestions: {
      follow_up_questions: [
        {
          question:
            "Do your symptoms specifically worsen after consuming dairy products, even with lactase supplements?",
          answers: {
            "Yes, symptoms intensify after dairy intake despite lactase supplements":
              "Suggestive of a more severe lactose intolerance or possibly a dairy protein allergy, not just lactose intolerance.",
            "No, symptoms do not correlate directly with dairy consumption":
              "Indicative of irritable bowel syndrome (IBS), as symptoms are not exclusively triggered by lactose ingestion.",
          },
        },
        {
          question:
            "Have you noticed any improvement in your symptoms with specific dietary changes, excluding dairy?",
          answers: {
            "Yes, symptoms improve with certain dietary changes":
              "Consistent with irritable bowel syndrome (IBS), which often responds to varied dietary adjustments.",
            "No, dietary changes have no significant impact on symptoms":
              "Possible inflammatory bowel disease (IBD), where symptoms are less likely to resolve with dietary changes alone.",
          },
        },
      ],
    },
  },
];
