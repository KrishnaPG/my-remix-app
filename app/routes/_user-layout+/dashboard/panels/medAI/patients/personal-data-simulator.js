const DayJS = require('dayjs');
const ServicesDue = [
  {
    name: 'Colon Cancer Screening',
    dueDate: '01-Oct-2022',
    previousDate: '01-Oct-2012',
    location: 'Portland, Oregon VA Medical Center',
    actions: null
  },
  {
    name: 'Influenza Vaccine',
    dueDate: "Due Now",
    previousDate: 'Unknown',
    location: 'Portland, Oregon VA Medical Center',
    actions: null    
  },
  {
    name: 'Pneumonia Vaccine',
    dueDate: "Due Now",
    previousDate: 'Unknown',
    location: 'SPOKANE VAMC'
  },
  {
    name: 'Control of Your Cholesterol',
    dueDate: "Due Now",
    previousDate: 'Unknown',
    location: 'Portland, Oregon VA Medical Center'
  }
];

const MedicationHistory = [
  {
    name: 'Amoldipine Besylate 5MG Tab',
    url: 'https://www.webmd.com/drugs/2/drug-5891/amlodipine-oral/details',
    instructions: 'Half-tablet by mouth every day',
    status: 'Active',
    refillsRemaining: 2,
    lastFilledOn: DayJS().subtract(40, "days"),
    quantity: 45,
    daysSupply: 90,
    pharmacy: 'Portland Pharmacy',
    prescriptionNo: '11532047',
    prescriptionURL: 'https://res.cloudinary.com/cenacle-cdn/image/upload/w_480,c_limit/v1523353595/CenacleResearch/demos/images/personal-health-tracker/sample-prescription.jpg'
  },
  {
    name: 'Donepezil HCL 5MG Tab',
    url: 'https://www.webmd.com/drugs/2/drug-14334-9218/donepezil-oral/donepezil-oral/details',
    instructions: 'One tablet by mouth every morning',
    status: 'Expired',
    refillsRemaining: 10,
    lastFilledOn: DayJS().subtract(80, "days"),
    quantity: 30,
    daysSupply: 30,
    pharmacy: 'Portland Pharmacy',
    prescriptionNo: '11532044',
    prescriptionURL: 'https://res.cloudinary.com/cenacle-cdn/image/upload/w_480,c_limit/v1523353595/CenacleResearch/demos/images/personal-health-tracker/sample-prescription.jpg'    
  },
  {
    name: 'Fluoxetine HCL 10MG Cap',
    url: 'https://www.webmd.com/drugs/2/drug-1774-95/fluoxetine-oral/fluoxetine-oral/details',
    instructions: 'One capsule by mouth every morning',
    status: 'Discontinued',
    refillsRemaining: 3,
    lastFilledOn: DayJS().subtract(720, "days"),
    quantity: 45,
    daysSupply: 90,
    pharmacy: 'Portland Pharmacy',
    prescriptionNo: '11181487A',
    prescriptionURL: 'https://res.cloudinary.com/cenacle-cdn/image/upload/w_480,c_limit/v1523353595/CenacleResearch/demos/images/personal-health-tracker/sample-prescription.jpg'    
  },  
];

const Allergies = [
  {
    name: 'Imipramine',
    type: 'drug',
    reaction: 'Anaphylaxis',
    drugclass: 'Tricyclic Antidepressants',
    comments: 'severe'
  },
  {
    name: 'Trimethoprim',
    type: 'drug',
    drugclass: 'Anti-Infectives, Other',
    comments: 'mild'
  },
  {
    name: 'Tramadol',
    type: 'drug',
    reaction: 'Retention of Urine',
    drugclass: 'Non-opioid Analgesics',
    comments: 'gradually worsening'
  },
  {
    name: 'Terazosin',
    type: 'drug',
    reaction: 'dizziness',
    drugclass: 'Alpha blockers',
  }  
];

const ProblemList = [
  {
    name: "Posttraumatic Stress Disorder",
    icd9: "ICD-9-CM 309.81",    
    icd9URL: "http://www.icd9data.com/2014/Volume1/290-319/300-316/309/309.81.htm",
    date: DayJS().subtract(45, "days"),
    provider: "Health Provider1",
    location: "Portland, Oregon VA Medical Center",
    status: "Active",
    notes: "Awaiting a Comp and Pen Exam",
    diagnosis:[
      `${DayJS().subtract(45, "days").format("DD MMM YYYY")}
<pre>Appearance/Behavior:
  This is a well developed and well nourished Caucasian seated in no apparent distress.

Thought Processing:
  Speech is regular rate and rhythm, normal volume with no thought disorder.

Thought Content:
  Patient thoughts marked by no evidence of psychotic symptoms, no evidence of SI or HI.
  
Comment: test patient  </pre>
${DayJS().subtract(40, "days").format("DD MMM YYYY")}
<pre>
PROVIDER EVALUATION 
 The results of the PHQ depression screen have been reviewed. I have personally evaluated the patient including inquiry about feelings of hopelessness, suicidal thoughts, suicide plan if thoughts are present, and prior suicide attempts. Based on the evaluation, the following disposition plan will be implemented:
 No mental health condition requiring further intervention.
</pre>
  `
    ],
    labResults: [
      {
        date: DayJS().subtract(42, "days"),
        data: [
          {
            name: 'S-Cholesterol',
            loinc: '2093-3',
            normalRange: {
              max: 200
            },
            value: 187,
            unit: 'mg/dL',
            time: '05:16'
          },
          {
            name: 'S-HDL-Cholesterol',
            loinc: '2085-9',
            normalRange: {
              min: 30,
              max: 150
            },
            value: 36,
            unit: 'mg/dL',
            time: '13:00'
          },  
          {
            name: 'S-CRP',
            loinc: '30522-7',
            normalRange: { max: 5 },
            value: 6,
            unit: 'mg/L',
            time: '10:01'
          }, 
          {
            name: 'S-CRP',
            loinc: '30522-7',
            normalRange: { max: 5 },
            value: 12,
            unit: 'mg/L',
            time: '01:19'
          },                             
        ]
      }    
    ]
  },
  {
    name: "Hyperlipidemia",
    icd9: "ICD-9-CM 272.4",
    icd9URL: "http://www.icd9data.com/2014/Volume1/240-279/270-279/272/272.4.htm",
    date: DayJS().subtract(90, "days"),
    provider: "Health Provider2",
    location: "Portland, Oregon VA Medical Center",
    status: "Active",
    notes: "",
    diagnosis: [
      `${DayJS().subtract(90, "days").format("DD MMM YYYY")}
<pre>*Annual OTC/Non-VA Med Review:
 Reviewed medication list with patient. New OTC/Non-VA medications to be added to list.
DM NEPHROPATHY SCREENING:
 Angiotensin II receptor blocker therapy is contraindicated.
Comment: test patient
</pre>
${DayJS().subtract(85, "days").format("DD MMM YYYY")}  
<pre>
Eval of Positive Depression Screen:
 Rescreen with PHQ-2 if most recent previous screen is &gt; 1 day old. A PHQ-2 screen was performed. The score was 0 which is a negative screen for depression.
 1. Little interest or pleasure in doing things Not at all
 2. Feeling down, depressed, or hopeless Not at all
 Are you feeling hopeless about the present or future? NO
 Have you had thoughts recently about taking your life? NO 
</pre>
${DayJS().subtract(80, "days").format("DD MMM YYYY")}  
<pre>
ASSESSMENT: Suicide risk screen is negative.
PROVIDER EVALUATION 
 The results of the PHQ depression screen have been reviewed. I have personally evaluated the patient including inquiry about feelings of hopelessness, suicidal thoughts, suicide plan if thoughts are present, and prior suicide attempts. Based on the evaluation, the following disposition plan will be implemented:
 No mental health condition requiring further intervention.
Comment: test patient
Evaluation of + PTSD Screen:
 Are you feeling hopeless about the present or future? NO
 Have you had thoughts recently about taking your life? NO 
</pre>
  `
    ],
    labResults: [
      {
        date: DayJS().subtract(88, "days"),
        data: [
          {
            name: 'S-Cholesterol',
            loinc: '2093-3',
            normalRange: {
              max: 200
            },
            value: 197,
            unit: 'mg/dL',
            time: '06:18'
          },
          {
            name: 'S-HDL-Cholesterol',
            loinc: '2085-9',
            normalRange: {
              min: 30,
              max: 150
            },
            value: 26,
            unit: 'mg/dL',
            time: '15:00'
          },
          {
            name: 'S-CRP',
            loinc: '30522-7',
            normalRange: { max: 5 },
            value: 4,
            unit: 'mg/L',
            time: '11:01'
          },
          {
            name: 'S-CRP',
            loinc: '30522-7',
            normalRange: { max: 5 },
            value: 8,
            unit: 'mg/L',
            time: '02:19'
          },
        ]
      }
    ]    
  },
  {
    name: "Mild Cognitive Impairment",
    icd9: "ICD-9-CM G31.84",
    icd9URL: "http://www.icd9data.com/2013/Volume1/320-389/330-337/331/331.83.htm",
    date: DayJS().subtract(800, "days"),
    provider: "Health Provider1",
    location: "Portland, Oregon VA Medical Center",
    status: "Closed",
    notes: "",
    diagnosis: [
      `${DayJS().subtract(800, "days").format("DD MMM YYYY")}
      <pre>
Past Cardiology History:Patient family history of cardiac stress and disease.

SUBJECTIVE:

OBJECTIVE:
Active Medications:
 1) Amlodipine besylate 5mg tab take one-half tablet by mouth every day for blood pressure
 2) Donepezil hcl 5mg tab take one tablet by mouth every morning
 3) Fluoxetine hcl 10mg cap take one capsule by mouth every morning
 4) Hctz 25/triamterene 37.5mg tab take one-half tablet (12.5/18.75 mg) by mouth every day

GEN -
NECK -
CV -
PULM -
EXT -

Lab Studies:
  Mixed dates for most recent tests of this panel
  No CBC in last year

PLAN: Order a series of test to include a stress test and a series of cardiac lab panels. Will also review patient's current medication history and revise accordingly.

FELLOW SUPERVISION: Staffed with Dr. Provider who agrees with my assessment and plan.  </pre>
      `      
    ],
    labResults: [
      {
        date: DayJS().subtract(795, "days"),
        data: [
          {
            name: 'S-Cholesterol',
            loinc: '2093-3',
            normalRange: {
              max: 200
            },
            value: 203,
            unit: 'mg/dL',
            time: '05:16'
          },
          {
            name: 'S-HDL-Cholesterol',
            loinc: '2085-9',
            normalRange: {
              min: 30,
              max: 150
            },
            value: 98,
            unit: 'mg/dL',
            time: '13:00'
          },
          {
            name: 'S-CRP',
            loinc: '30522-7',
            normalRange: { max: 5 },
            value: 4,
            unit: 'mg/L',
            time: '15:08'
          },
          {
            name: 'S-CRP',
            loinc: '30522-7',
            normalRange: { max: 5 },
            value: 2,
            unit: 'mg/L',
            time: '09:19'
          },
        ]
      }
    ]    
  },
];

const Persons = {
  male: [
    {
      name: "John Reese",
      age: 40,
      gender: "male",
      bloodgroup: "AB-",
      avatar: "/data/avatars/john-reese.jpg",
      location: "San Francisco, California, USA",
      occupation: "Special Forces soldier (formerly)",
      height: 6.1,
      weight: 70,
      emergencyContact: {
        name: "Harold Finch",
        phone: "000-555-1458",
        email: "harold@finch.com",
      },
      allergies: Allergies,
      servicesDue: ServicesDue,
      medicationHistory: MedicationHistory,
      problemList: ProblemList,
    },
    {
      name: "Harold Finch",
      age: 48,
      gender: "male",
      bloodgroup: "O+",
      avatar: "/data/avatars/harold-finch.jpg",
      occupation: "Software Engineer",
      height: "5.7",
      weight: "68",
      emergencyContact: {
        name: "Grace Hendricks",
        phone: "000-555-5000",
        email: "grace@finch.com",
      },
      allergies: Allergies,
      servicesDue: ServicesDue,
      medicationHistory: MedicationHistory,
      problemList: ProblemList,
    },
    {
      name: "Hannibal Lecter",
      age: 65,
      gender: "male",
      bloodgroup: "AB+",
      avatar: "/data/avatars/70y-male.jpg",
      occupation: "Doctor",
      height: "5.7",
      weight: "68",
      emergencyContact: {
        name: "Grace Hendricks",
        phone: "000-555-5000",
        email: "grace@finch.com",
      },
      allergies: Allergies,
      servicesDue: ServicesDue,
      medicationHistory: MedicationHistory,
      problemList: ProblemList,
    },
    {
      name: "John Doe",
      age: 75,
      gender: "male",
      bloodgroup: "AB-",
      avatar: "/data/avatars/70y-male2.jpg",
      occupation: "Athlete",
      height: "5.7",
      weight: "68",
      emergencyContact: {
        name: "John Reese",
        phone: "000-555-5000",
        email: "john@reese.com",
      },
      allergies: Allergies,
      servicesDue: ServicesDue,
      medicationHistory: MedicationHistory,
      problemList: ProblemList,
    },
  ],
  female: [
    {
      name: "Root",
      age: 28,
      gender: "female",
      bloodgroup: "B-",
      avatar: "/data/avatars/root.jpg",
      location: "Silicon Valley, USA",
      occupation: "Hacker",
      height: "5.6", // feet
      weight: "54", // kg
      emergencyContact: {
        name: "Harold Finch",
        phone: "000-555-1458",
        email: "harold@finch.com",
      },
      allergies: Allergies,
      servicesDue: ServicesDue,
      medicationHistory: MedicationHistory,
      problemList: ProblemList,
    },
    {
      name: "Jane Doe",
      age: 65,
      gender: "female",
      bloodgroup: "O-",
      avatar: "/data/avatars/60y-female.jpg",
      location: "Texas, USA",
      occupation: "Housewife",
      height: "5.6", // feet
      weight: "54", // kg
      emergencyContact: {
        name: "Harold Finch",
        phone: "000-555-1458",
        email: "harold@finch.com",
      },
      allergies: Allergies,
      servicesDue: ServicesDue,
      medicationHistory: MedicationHistory,
      problemList: ProblemList,
    },
    {
      name: "Jane Reese",
      age: 70,
      gender: "female",
      bloodgroup: "B+",
      avatar: "/data/avatars/60y-female2.jpg",
      location: "Colarado, USA",
      occupation: "Teacher",
      height: "5.6", // feet
      weight: "54", // kg
      emergencyContact: {
        name: "John Reese",
        phone: "000-555-1458",
        email: "john@reese.com",
      },
      allergies: Allergies,
      servicesDue: ServicesDue,
      medicationHistory: MedicationHistory,
      problemList: ProblemList,
    },
  ],
};

export default {
  getPersonForScenario: function (scenario) {
    const array = Persons[scenario.demographics.sex];
    return array[scenario.patient_id % array.length];
  },
  getRandomPerson: function(sex) {
    const array =  Persons[sex];
    return array[Math.round(Math.random() * (array.length - 1))];
  },
  getNextValue: function(currentVal, {mean, variance}) {
    const randVal = Math.random();
    if(randVal > variance) return currentVal;
    let newRelative = randVal * mean;
    if(currentVal > mean) return currentVal - newRelative;
    return currentVal + newRelative;
  },
  getRandomValues: function({mean, variance, maxCount}) {
    let values = [mean];
    for(let i=1; i < maxCount; ++i)
      values.push(this.getNextValue(values[i-1], {mean, variance}));
    return values;
  }
}