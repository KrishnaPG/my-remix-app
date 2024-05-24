import React, { Suspense, useCallback, useEffect, useState } from "react";
import LoadInProgress from "../../../../../../components/load-in-progress";

import styles from "./styles.QACards.module.css";

const ProCard = React.lazy(
  () => import(/* webpackChunkName: "antPCard", webpackPreload: true */ "@ant-design/pro-card"),
);
const ProCardTabs = React.lazy(() => import("../../../../../../components/pro-card-tabs/main"));

const AnswerTabs = ({ AnswerComp, newTabKey, onTabAddedRemoved, ...otherProps }) => {
  return (
    <Suspense fallback={<LoadInProgress tip="Preparing the Answer Tabs ..." />}>
      <ProCardTabs
        newTabKey={newTabKey}
        TabComponent={AnswerComp}
        onTabAddedRemoved={onTabAddedRemoved}
        size="small"
        {...otherProps}
      />
    </Suspense>
  );
};

const QA = ({ card, ...otherProps }) => {
  const [newTabKey, setNewTabKey] = useState(null);
  const [question, setQuestion] = useState({});

  const onQuestionChange = useCallback(({ question, questionKey }) => {
    setQuestion(question);
    setNewTabKey(questionKey);
  }, []);
  const onTabsEdited = useCallback((tabKey, action) => {
    setNewTabKey(null);
  }, []);

  const QuestionComp = card.QuestionComp;
  const AnswerComp = card.AnswerComp;
  if (!QuestionComp || !AnswerComp) return <div className={styles.comingSoon}>Coming Soon...</div>;

  return (
    <Suspense fallback={<LoadInProgress tip="Preparing the QA ..." />}>
      <QuestionComp onQuestionChange={onQuestionChange} className={styles.question} />
      <AnswerTabs
        AnswerComp={AnswerComp}
        newTabKey={newTabKey}
        onTabsEdited={onTabsEdited}
        question={question}
        {...otherProps}
      />
    </Suspense>
  );
};

export default ({ cards, ...otherProps }) => {
  return (
    <Suspense fallback={<LoadInProgress tip="Loading the Cards..." />}>
      {cards.map((card, index) => (
        <ProCard
          title={card.title}
          collapsible
          defaultCollapsed={index > 0}
          extra=""
          headerBordered
          key={index}
          split="horizontal"
          className={styles.QACard}
        >
          <QA card={card} {...otherProps} />
        </ProCard>
      ))}
    </Suspense>
  );
};

export { styles };
