import React, { useState, useCallback, Suspense, useEffect } from "react";
import { Alert,Button, Col, Descriptions, Flex, Form, Input, Modal, Result,  Row, Space, Tag } from "antd";
import { useToggle } from "ahooks";
import {
  CheckOutlined,
  DownOutlined,
  ThunderboltOutlined,
  LoadingOutlined,
  QuestionCircleFilled,
  WarningOutlined,
} from "@ant-design/icons";
import { Icon } from "@iconify-icon/react";

import CDSSSim from "./cdss-sim";
import LoadInProgress, { LoadError } from "../../../../../../components/load-in-progress";

const Tree = React.lazy(() => import("antd/es/tree"));
const PatientPhoto = React.lazy(() => import("./patient_photo"));
const RxTerms = React.lazy(() => import("./rxterms"));
const Annotator = React.lazy(
  () =>
    import(
      /* webpackChunkName: "ann", webpackPreload: true */ "../../../../../../components/Annotator"
    ),
);
const ProCard = React.lazy(
  () => import(/* webpackChunkName: "antPCard", webpackPreload: true */ "@ant-design/pro-card"),
);
const ProTable = React.lazy(
  () => import(/* webpackChunkName: "antPTable", webpackPreload: true */ "@ant-design/pro-table"),
);

import styles from "./styles.new-diagnosis.module.css";
import stylesStatus from "../../payment-applications/style-show.module.css";
import stylesTbl from "../../payment-applications/style-list.module.css";

const Tags = ({
  items = [],
  flexProps = { gap: "small", wrap: "wrap" },
  none = "-",
  ...otherProps
} = {}) => {
  return (
    <Flex {...flexProps}>
      {items.length ? (
        items.map((item) => (
          <Tag {...otherProps} key={item}>
            {item}
          </Tag>
        ))
      ) : (
        <>{none}</>
      )}
    </Flex>
  );
};

const formatLabTests = (labTests) =>
  Object.keys(labTests).map((testShortName) => ({
    key: testShortName,
    label: labTests[testShortName].name,
    children: (
      <>
        <span className={styles.result}>{labTests[testShortName].result}</span>
      </>
    ),
  }));

const TestResults = React.memo(
  ({ scenario }) => {
    const [labTests] = useState(() => formatLabTests(scenario.lab_tests));
    return (
      <div className={styles.labTests}>
        <span className={styles.label}>Test results:</span>
        <Descriptions bordered layout="vertical" items={labTests} className={styles.testResults} />
      </div>
    );
  },
  () => true,
);

const SummaryCaseNotes = React.memo(
  ({ scenario }) => {
    return (
      <>
        <Annotator
          text={scenario.problem_description}
          showMarkedView={false}
          cacheKey={`cdss-sim-${scenario.patient_id}`}
          className={styles.problem_description}
        ></Annotator>
        <div className={styles.symptoms}>
          <span className={styles.label}>Symptoms:</span>
          <Tags items={scenario.symptoms} className={styles.symptom} color="orange" />
        </div>
        {scenario.lab_tests && <TestResults scenario={scenario} />}
      </>
    );
  },
  () => true,
);

const History = React.memo(
  ({ scenario }) => {
    return (
      <>
        <div className={styles.allergies}>
          <span className={styles.label}>Allergies:</span>
          <Tags items={scenario.allergies} className={styles.allergy} color="lime" />
        </div>
        <div className={styles.existing_conditions}>
          <span className={styles.label}>Pre-existing Conditions:</span>
          <Tags
            items={scenario["pre-existing_conditions"]}
            className={styles.existing_condition}
            color="warning"
          />
        </div>
        <div className={styles.previous_medications}>
          <span className={styles.label}>Current Medication:</span>
          <Tags items={scenario.previous_medications} className={styles.medication} color="green" />
        </div>
      </>
    );
  },
  () => true,
);

const FollowUpQuestions = React.memo(
  ({ questions }) => {
    const [questionsTreeData] = useState(() =>
      questions.map((q) => ({
        title: (
          <div>
            <span className={styles.label}>Q</span>:{" "}
            <span className={styles.question}>{q.question}</span>
          </div>
        ),
        key: q.question,
        children: Object.keys(q.answers).map((ansKey) => ({
          title: (
            <div>
              <span className={styles.answer}>{ansKey}</span>:{" "}
              <span className={styles.inference}>{q.answers[ansKey]}</span>
            </div>
          ),
          key: `${ansKey}-${q.question}`,
        })),
      })),
    );
    return (
      <Tree
        className={styles.follow_up_questions}
        showIcon={false}
        showLine={true}
        switcherIcon={<DownOutlined />}
        defaultExpandedKeys={[]}
        selectable={false}
        treeData={questionsTreeData}
      />
    );
  },
  () => true,
);

const SuggestedLabTests = ({ labTests }) => {
  const [labTestsTreeData] = useState(() =>
    labTests.map((t) => ({
      title: (
        <div>
          <span className={styles.label}>Test</span>: <span className={styles.test}>{t.name}</span>
        </div>
      ),
      key: t.name,
      children: Object.keys(t.expected_results).map((r) => ({
        title: (
          <div>
            <span className={styles.inference}>{r}</span>:{" "}
            <span className={styles.observation}>{t.expected_results[r]}</span>
          </div>
        ),
        key: `${r}-${t.name}`,
      })),
    })),
  );
  return (
    <Tree
      className={styles.suggested_lab_tests}
      showIcon={false}
      showLine={true}
      switcherIcon={<DownOutlined />}
      defaultExpandedKeys={[]}
      selectable={false}
      treeData={labTestsTreeData}
    />
  );
};

const SuggestNextActions = ({ scenario }) => {
  if (scenario.prescription)
    return (
      <Result
        icon={<Icon icon="bi:prescription2" width="4.5rem" height="4.5rem" className="anticon" />}
        status="info"
        title={scenario.CDSS_suggestions.diagnosis}
        subTitle="Please start the prescription. AI will review your entries to make suggestions, if any, based on the case notes and the patient history."
      />
    );
  if (scenario.CDSS_suggestions.follow_up_questions)
    return (
      <>
        <Result
          icon={<QuestionCircleFilled />}
          status="info"
          title="Follow-up Questions"
          subTitle="Case notes does not have enough information to reach a conclusion. Few follow-up questions are suggested to reach a diagnosis."
        />
        <FollowUpQuestions questions={scenario.CDSS_suggestions.follow_up_questions} />
      </>
    );
  return (
    <>
      <Result
        icon={<Icon icon="noto:microscope" width="4.5rem" height="4.5rem" />}
        status="info"
        title="Lab Tests Needed"
        subTitle="Case notes does not have enough information to reach a conclusion. Few Medical Tests are needed to arrive at the diagnosis."
      />
      <SuggestedLabTests labTests={scenario.CDSS_suggestions.lab_tests} />
    </>
  );
};

const CDSSSuggest = React.memo(
  ({ title, busyMsg, children }) => {
    const [showSuggestions, { setRight: setShowSuggestions }] = useToggle(false);
    const [isThinking, { setRight: setIsThinking }] = useToggle(false);

    useEffect(() => {
      if (isThinking) {
        setTimeout(setShowSuggestions, 2000);
      }
    }, [isThinking]);

    if (showSuggestions) return <>{children}</>;
    if (isThinking)
      return (
        <Space>
          <LoadingOutlined /> <span>{busyMsg}</span>
        </Space>
      );
    return (
      <div className={`${stylesStatus.field} ${stylesStatus.h1} flex justify-start`}>
        <Button
          icon={<ThunderboltOutlined />}
          type="link"
          onClick={setIsThinking}
          className={styles.cdssTip}
        >
          {title}
        </Button>
      </div>
    );
  },
  () => true,
);

const CDSSBar = React.memo(
  ({ actionTitle = "Analyze with AI", busyMsg = "Analyzing the case notes...", children }) => {
    return (
      <form className={stylesStatus.fieldSetContainer}>
        <fieldset>
          <legend data-augmented-ui="tr-clip border">CDSS</legend>
          <CDSSSuggest title={actionTitle} busyMsg={busyMsg}>
            {children}
          </CDSSSuggest>
        </fieldset>
      </form>
    );
  },
  () => true,
);

const PatientProfile = React.memo(
  ({ scenario }) => {
    return (
      <Row>
        <Col
          xs={{ span: 24, order: 1 }}
          lg={{ span: 6, order: 1 }}
          xl={{ span: 5, order: 1 }}
          xxl={{ span: 4, order: 1 }}
        >
          <Suspense fallback={<LoadInProgress />}>
            <PatientPhoto scenario={scenario} />
          </Suspense>
        </Col>
        <Col
          lg={{ span: 18, order: 2 }}
          xs={{ span: 24, order: 2 }}
          xl={{ span: 19, order: 2 }}
          xxl={{ span: 20, order: 2 }}
          className={styles.scenario}
        >
          <Row>
            <Descriptions
              bordered
              column={{ xxl: 24, xl: 24, lg: 1, md: 1, sm: 1, xs: 1 }}
              layout="vertical"
              size="small"
              items={[
                {
                  key: "caseNotes",
                  label: "Summary",
                  children: (
                    <Suspense fallback={<LoadInProgress />}>
                      <SummaryCaseNotes scenario={scenario} />
                    </Suspense>
                  ),
                  span: { xl: 16, xxl: 16 },
                },
                {
                  key: "history",
                  label: "History",
                  children: <History scenario={scenario} />,
                  span: { xl: 8, xxl: 8 },
                },
              ]}
            />
          </Row>
          <Row>
            <Col span={24} offset={0}>
              <CDSSBar
                actionTitle="Analyze and Suggest Next Steps"
                busyMsg="Analyzing the case notes..."
              >
                <SuggestNextActions scenario={scenario} />
              </CDSSBar>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  },
  () => true,
);

const prescriptionColumns = [
  {
    title: "RxCUI",
    dataIndex: "rxCUI",
  },
  {
    title: "Drug",
    dataIndex: "drug",
  },
  {
    title: "Strength",
    dataIndex: "dosage",
  },
];
const PrescriptionTable = ({ prescriptionData }) => {
  if (!prescriptionData.length) return null;
  return (
    <div>
      <React.Suspense fallback={<LoadInProgress tip="Preparing Table UI..." />}>
        <ProTable
          className={stylesTbl.dataTable}
          columns={prescriptionColumns}
          dataSource={prescriptionData}
          pagination={false}
          rowKey="rxCUI"
          search={false}
        />
      </React.Suspense>
      <Flex gap="small" justify="flex-end" align="center" className="mr-8">
        <Button type="primary">Submit</Button>
      </Flex>
    </div>
  );
};

const IgnoreAlert = React.memo(({ onOk = () => { } }) => {
  const [shouldShowModal, { setLeft: hideModal, setRight: showModal}] = useToggle(false);

  return (
    <>
      <Button type="link" onClick={showModal}>
        Ignore
      </Button>
      <Modal
        destroyOnClose
        maskClosable={false}
        onCancel={hideModal}
        onOk={onOk}
        open={shouldShowModal}
        title={
          <>
            <WarningOutlined className="text-amber-500 mr-1" /> Ignore the Alert
          </>
        }
      >
        <Form layout="vertical">
          <Form.Item name="description" label="Reason">
            <Input.TextArea rows={4} />
          </Form.Item>
          {/* <Form.Item>An entry will be added to the Audit Log.</Form.Item> */}
        </Form>
      </Modal>
    </>
  );
}, () => true);

const DrugAlert = ({ notify, scenario, onIgnore = () => { } }) => {
  if (!notify) return null;
  const { alert, alternative_drug, additional_drug } = notify;
  return (
    <ProCard
      title="Drug Alert"
      type="inner"
      bordered
      className={styles.drugAlert}
      extra={<IgnoreAlert onOk={onIgnore} />}
    >
      <Space size="large" direction="vertical" style={{ display: "flex" }}>
        {alternative_drug ? (
          <>
            <Alert
              message={
                <span className={styles.unsuitable_drug}>
                  Unsuitable Drug: {alert.unsuitable_drugs}.
                </span>
              }
              description={
                <span className={styles.adverse_reactions}>{alert.adverse_reactions}</span>
              }
              type="warning"
              showIcon
              closable={false}
              icon={<WarningOutlined />}
            />
            <CDSSBar actionTitle="Suggest Alternative" busyMsg="Analyzing the patient history...">
              <Alert
                message={
                  <span className={styles.alternative}>
                    Alternative: Instead of{" "}
                    <span className={styles.current_drug}>{alternative_drug.current_drug}</span>, it
                    is advisable to use{" "}
                    <span className={styles.alternative_drug}>
                      {alternative_drug.alternative_drug}
                    </span>{" "}
                    in this scenario.
                  </span>
                }
                description={
                  <span className={styles.reason}>Reason: {alternative_drug.reason}.</span>
                }
                type="info"
                showIcon
                closable={false}
                icon={<CheckOutlined />}
              />
            </CDSSBar>
          </>
        ) : (
          <Alert
            message={
              <span className={styles.additional}>
                Additional Drug
                <Tags
                  items={[`${additional_drug.name}, ${additional_drug.dosage}`]}
                  className={styles.medication}
                  color="green"
                />
                is also suggested.
              </span>
            }
            description={
              <span className={styles.reason}>
                {alert.additional_drugs}
                <div className={styles.reference}>
                  <span className={styles.label}> Source:</span>
                  <span className={styles.source}>{additional_drug.source},</span>
                  <span className={styles.label}> doi:</span>
                  <a
                    href={`https://doi.org/${additional_drug.doi}`}
                    target="_blank"
                    className={styles.doi}
                  >
                    {additional_drug.doi}
                  </a>
                </div>
              </span>
            }
            type="info"
            showIcon
            closable={false}
          />
        )}
      </Space>
    </ProCard>
  );
};

const isDrugUnsuitable = (drugEntry, scenario) => {
  for (let i = 0; i < scenario.prescription.length; ++i)
    if (drugEntry.drug.toLowerCase().startsWith(scenario.prescription[i].drug.toLowerCase())) {
      if (scenario.CDSS_suggestions.alternative_drug_suggestions) {
        return {
          alert: scenario.CDSS_suggestions.alerts,
          alternative_drug: scenario.CDSS_suggestions.alternative_drug_suggestions,
        };
      } else if (scenario.CDSS_suggestions.additional_drug_suggestions)
        return {
          alert: scenario.CDSS_suggestions.alerts,
          additional_drug: scenario.CDSS_suggestions.additional_drug_suggestions,
        };
    }
  return null;
};

const PrescriptionCard = React.memo(
  ({ scenario }) => {
    const [prescriptionData, setPrescriptionData] = useState([]);
    const [newEntry, setNewEntry] = useState();
    const [notify, setNotify] = useState();

    const clearAlertCB = useCallback(() => {
      setNewEntry(null); // whenever the RxTerms search bar is cleared, clear the alerts indirectly
    }, []);

    useEffect(() => {
      if (newEntry) {
        // Check if the newEntry into the prescription is valid (i.e. no contra-indications, no adverse reactions etc.)
        const notify = isDrugUnsuitable(newEntry, scenario);
        setNotify(notify); // sets or clears the alert
        if (!notify || !notify.alternative_drug)
          // if everything is fine, add it to the prescription list
          setPrescriptionData((oldEntries) => [...oldEntries, newEntry]);
      } else setNotify(null); // clear the alert
    }, [newEntry]);

    const ignoreAlertCB = useCallback(() => {
      if (!newEntry) return;
      // clear the alert
      setNotify(null); 
      // add the entry to the prescription list
      setPrescriptionData((oldEntries) => [...oldEntries, newEntry]);
     }, [newEntry]);

    return (
      <div>
        <Suspense fallback={<LoadInProgress />}>
          <ProCard
            wrap
            title={
              <span className={`${styles.prescriptionCard} ${styles.title}`}>Prescription</span>
            }
            headerBordered
          >
            <RxTerms onSubmit={setNewEntry} onClear={clearAlertCB} />
            <DrugAlert notify={notify} scenario={scenario} onIgnore={ignoreAlertCB} />
            <PrescriptionTable prescriptionData={prescriptionData} />
          </ProCard>
        </Suspense>
      </div>
    );
  },
  () => true,
);

export default React.memo(
  ({ record }) => {
    const subjectId = record.id;
    const [scenario] = useState(() => CDSSSim.getScenario(subjectId));
    return (
      <div className={styles.patientPage}>
        <PatientProfile scenario={scenario} />
        {scenario.prescription && <PrescriptionCard scenario={scenario} />}
      </div>
    );
  },
  () => true,
);
