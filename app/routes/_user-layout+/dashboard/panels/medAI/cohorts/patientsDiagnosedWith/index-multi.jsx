import React, { useCallback, useEffect, useRef, useState, Suspense } from "react";
import { Button, InputNumber, Row, Col, Collapse, Spin } from "antd";
import { useMap, useEventListener, useRequest, useUnmount } from "ahooks";
import { getPatientsMultiDiagnosedWith } from "../../mimic3";
import LoadInProgress, {LoadError} from "../../../../../../../components/load-in-progress";
import ICD9Lookup from "./icd9-lookup";

import styles from "../styles.module.css";
const ProCard = React.lazy(
  () => import(/* webpackChunkName: "antPCard", webpackPreload: true */ "@ant-design/pro-card"),
);
const DCDashboard = React.lazy(
  () => import(/* webpackChunkName: "dcDash", webpackPreload: true */ "./DCDashboard"),
);

export const QuestionComp = ({ onQuestionChange, className }) => {
  const [diagnosis, setDiagnosis] = useState(() => ({
    label: "Atrial fibrillation",
    value: "42731",
  }));
  const [seqFilterCond, setSeqFilterCond] = useState("lessThanOrEqualTo");
  const [seqNum, setSeqNum] = useState(3);

  const [diagnosis2, setDiagnosis2] = useState(() => ({
    label: "Chronic ischemic heart disease",
    value: "4149",
  }));

  const refSubmit = useRef();
  useEventListener(
    "click",
    () => {
      const q = {
        icd9Code1: diagnosis.value,
        icd9Code2: diagnosis2.value,
        seqNum,
      };
      onQuestionChange({
        question: q,
        questionKey: `${q.icd9Code1}_${q.icd9Code2}_${q.seqNum}`,
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

      <Col>that also have</Col>
      <Col>
        <ICD9Lookup
          initial={[diagnosis2]}
          defaultValue={diagnosis2.value}
          onChange={(icd9Code, { label, value }) => setDiagnosis2({ label, value })}
        />
      </Col>
      <Col>
        <Row align="middle">
          <Col>in their top</Col>
          <Col className={styles.vCenter + " " + styles.gap05}>
            <InputNumber
              min={2}
              max={5}
              defaultValue={seqNum}
              onChange={setSeqNum}
            />
          </Col>
          <Col>diagnoses</Col>
        </Row>
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
  } = useRequest(() => getPatientsMultiDiagnosedWith(q.icd9Code1, q.icd9Code2, q.seqNum), {
    // TODO: fix this getPatientsMultiDiagnosedWith()
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
