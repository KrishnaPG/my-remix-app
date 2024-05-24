import React from 'react';
import QACards, {styles as QAStyles} from './QACards';
import PatientsDiagnosedWith from "../cohorts/patientsDiagnosedWith/main";
import PatientsMultiDiagnosedWith from "../cohorts/patientsDiagnosedWith/index-multi";

const insightCards = [
  {
    title: (
      <>
        Q: How many patients have <span className={QAStyles.condition}>Atrial Fibrillation</span> in their{" "}
        <span className={QAStyles.keyword}>top 3</span> diagnoses?
      </>
    ),
    ...PatientsDiagnosedWith,
  },
  {
    title: (
      <>
        Q: How many diagnosed with <span className={QAStyles.condition}>Atrial Fibrillation</span> have also
        been diagnosed with <span className={QAStyles.condition}>Ischemic stroke</span>?
      </>
    ),
    ...PatientsMultiDiagnosedWith,
  },
  {
    title: (
      <>
        Q: What is the incidence rate of <span className={QAStyles.condition}>Pneumonia</span> in patients{" "}
        <span className={QAStyles.keyword}>over 65 years</span> old?
      </>
    ),
  },
  {
    title: "Q: What are the trends over time in ...?",
  },
];

export default React.memo((props) => {
  return (<QACards cards={insightCards}></QACards>);
}, () => true);
