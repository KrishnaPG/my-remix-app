import React from 'react';
import QACards, { styles as QAStyles } from "./QACards";

const insightCards = [
  {
    title: (
      <>
        Q: Does the causal effect of <span className={QAStyles.drug}>Metformin</span> on{' '}
        <span className={QAStyles.condition}>Diarrhea</span> vary by age?
      </>
    ),
    comp: () => <></>,
  },
  {
    title: (
      <>
        Q: Patients newly diagnosed with <span className={QAStyles.condition}>Atrial fibrillation</span>, in
        the first year after therapy initiation, does <span className={QAStyles.drug}>Warfarin</span> cause
        more major bleeds than <span className={QAStyles.drug}>Dabigatran</span>?
      </>
    ),
    comp: () => <></>,
  },
];

export default React.memo(
  (props) => {
    return <QACards cards={insightCards}></QACards>;
  },
  () => true,
);
