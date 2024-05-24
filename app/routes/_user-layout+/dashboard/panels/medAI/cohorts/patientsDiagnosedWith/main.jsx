import React, { useRef, useState, Suspense } from "react";
import { Button, Radio, InputNumber, Row, Col } from "antd";
import { useEventListener, useRequest, useUnmount } from "ahooks";
import { getPatientsDiagnosedWith } from "../../mimic3";
import LoadInProgress, { LoadError } from "../../../../../../../components/load-in-progress";
import ICD9Lookup from "./icd9-lookup";

import styles from "../styles.module.css";

const DCDashboard = React.lazy(
  () => import(/* webpackChunkName: "dcDash", webpackPreload: true */ "./DCDashboard"),
);

const FilterCond = React.memo(
  ({ seqNum, onSeqNumChange, seqFilterCond, onSeqFilterCondChange }) => (
    <Radio.Group value={seqFilterCond} onChange={(ev) => onSeqFilterCondChange(ev.target.value)}>
      <Radio value="equalTo" className={styles.block}>
        as the principal diagnosis
      </Radio>
      <Radio value="lessThanOrEqualTo" className={styles.vCenter}>
        <Row align="middle">
          <Col>in their top</Col>
          <Col className={styles.vCenter + " " + styles.gap05}>
            <InputNumber
              min={2}
              max={5}
              defaultValue={seqNum}
              onChange={onSeqNumChange}
            />
          </Col>
          <Col>diagnoses</Col>
        </Row>
      </Radio>
    </Radio.Group>
  ),
  (prevProps, nextProps) =>
    prevProps.seqNum === nextProps.seqNum && prevProps.seqFilterCond === nextProps.seqFilterCond,
);

export const QuestionComp = ({ onQuestionChange, className }) => {
  // search text -> icd9Code
  const [diagnosis, setDiagnosis] = useState(() => ({
    label: "Atrial fibrillation",
    value: "42731",
  }));
  const [seqFilterCond, setSeqFilterCond] = useState("equalTo");
  const [seqNum, setSeqNum] = useState(3);

  const refSubmit = useRef();
  // submit button onClick handler
  useEventListener(
    "click",
    () => {
      const q = {
        icd9Code: diagnosis.value,
        seqNum: seqFilterCond === "equalTo" ? 1 : seqNum,
        seqFilterCond,
      };
      onQuestionChange({
        question: q,
        questionKey: `${q.icd9Code}_${q.seqNum}_${q.seqFilterCond}`,
      });
    },
    { target: refSubmit },
  );

  return (
    <Row className={className}>
      <Col>Patients that have</Col>
      <Col>
        <ICD9Lookup
          initial={[diagnosis]}
          defaultValue={diagnosis.value}
          onChange={(icd9Code, { label, value }) => setDiagnosis({ label, value })}
        />
      </Col>
      <Col>
        <FilterCond
          seqNum={seqNum}
          onSeqNumChange={setSeqNum}
          seqFilterCond={seqFilterCond}
          onSeqFilterCondChange={setSeqFilterCond}
        />
      </Col>
      <Col>
        <Button type="primary" ghost shape="round" ref={refSubmit}>
          Submit
        </Button>
      </Col>
    </Row>
  );
};

export const AnswerComp = ({ tabKey, tabsState, question: q }) => {
  const {
    data: { results = [], query } = {},
    error,
    loading,
    run,
    cancel,
  } = useRequest(() => getPatientsDiagnosedWith(q.icd9Code, q.seqNum, q.seqFilterCond), {
    manual: false,
    staleTime: -1,
    throwOnError: false,
  });
  if (error) return <LoadError msg={error?.message || error} />;
  if (loading) return <LoadInProgress tip="Calculating..." />;
  return (
    <Suspense fallback={<LoadInProgress tip="Loading Dashboard Modules..." />}>
      <DCDashboard data={results} renderKey={tabKey} />
    </Suspense>
  );
};

export default {
  AnswerComp,
  QuestionComp,
};
