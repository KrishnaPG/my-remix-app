import React from "react";
import QACards, { styles as QAStyles } from "./QACards";
import PatientPrediction  from "../patients/prediction";

const insightCards = [
  {
    title: (
      <>
        Q: After diagnosed with <span className={QAStyles.condition}>major depressive disorder</span>, how
        likely this patient will attempt <span className={QAStyles.keyword}>suicide</span> in the first year?
      </>
    ),
    ...PatientPrediction,
  },
  {
    title: (
      <>
        Q: Diagnosed with <span className={QAStyles.condition}>Atrial fibrillation</span>, in the first year
        after therapy initiation with <span className={QAStyles.drug}>Warfarin</span>, what is the
        probability the patient will suffer an <span className={QAStyles.condition}>Ischemic stroke</span>?
      </>
    ),
  },
];

export default React.memo(
  (props) => {
    return <QACards cards={insightCards}></QACards>;
  },
  () => true,
);
