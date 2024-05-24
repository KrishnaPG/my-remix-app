import axios from "axios";
import React, { Suspense, useRef, useState } from "react";
import { useEventListener, useRequest, useUnmount } from "ahooks";
import { Button, Card, InputNumber, Row, Col, Tooltip } from "antd";
import { Base, Box, Scatter, DualAxes } from "@ant-design/plots";

import ICD9Lookup from "../cohorts/patientsDiagnosedWith/icd9-lookup";
import LoadInProgress, { LoadError } from "../../../../../../components/load-in-progress";
import DataSim from "./personal-data-simulator";
import CDSSSim from "./cdss-sim";

import styles from "./styles.prediction.module.css";
import stylesTbl from "../../payment-applications/style-list.module.css";
import stylesStatus from "../../payment-applications/style-show.module.css";
import "./healthcare-icons/healthcare-icons.css";

const ProTable = React.lazy(
  () => import(/* webpackChunkName: "antPTable", webpackPreload: true */ "@ant-design/pro-table"),
);
const TitledBox = React.lazy(() => import("../../../../../../components/titled-box"));

const PatientPhoto = React.lazy(() => import("./patient_photo"));

const ModelDetails = () => {
  const [m] = useState(() => ({
    thereshold: DataSim.getNextValue(0.0923, { mean: 0.125, variance: 0.1 }).toFixed(4),
    incidence: DataSim.getNextValue(13.814, { mean: 15, variance: 5 }).toFixed(2),
    ppv: DataSim.getNextValue(21.6, { mean: 25, variance: 5 }).toFixed(2),
    specificity: DataSim.getNextValue(53.6, { mean: 60, variance: 10 }).toFixed(2),
    sensitivity: DataSim.getNextValue(79.8, { mean: 75, variance: 10 }).toFixed(2),
    npv: DataSim.getNextValue(94.3, { mean: 90, variance: 10 }).toFixed(2),
  }));
  return (
    <div className={styles.model_details}>
      <form className={stylesStatus.fieldSetContainer}>
        <fieldset>
          <legend data-augmented-ui="tr-clip border">Prediction Model</legend>
          <div className="grid grid-cols-6">
            <div
              className={`col-span-3 xl:col-span-2 grid grid-cols-3 ${stylesStatus.field} ${stylesStatus.h1}`}
            >
              <div className={`col-span-1 ${stylesStatus.title}`}>Threshold:</div>
              <div className={`col-span-2 ${stylesStatus.value}`}>{m.thereshold}</div>
            </div>
            <div
              className={`col-span-3 xl:col-span-2 grid grid-cols-3 ${stylesStatus.field} ${stylesStatus.h1}`}
            >
              <div className={`col-span-1 ${stylesStatus.title}`}>Incidence:</div>
              <div className={`col-span-2 ${stylesStatus.value}`}>{m.incidence}%</div>
            </div>
            <div
              className={`col-span-3 xl:col-span-2 grid grid-cols-3 ${stylesStatus.field} ${stylesStatus.h1}`}
            >
              <div className={`col-span-1 ${stylesStatus.title}`}>PPV:</div>
              <div className={`col-span-2 ${stylesStatus.value}`}>{m.ppv}%</div>
            </div>
            <div
              className={`col-span-3 xl:col-span-2 grid grid-cols-3 ${stylesStatus.field} ${stylesStatus.h1}`}
            >
              <div className={`col-span-1 ${stylesStatus.title}`}>Specificity:</div>
              <div className={`col-span-2 ${stylesStatus.value}`}>{m.specificity}%</div>
            </div>
            <div
              className={`col-span-3 xl:col-span-2 grid grid-cols-3 ${stylesStatus.field} ${stylesStatus.h1}`}
            >
              <div className={`col-span-1 ${stylesStatus.title}`}>Sensitivity:</div>
              <div className={`col-span-2 ${stylesStatus.value}`}>{m.sensitivity}%</div>
            </div>
            <div
              className={`col-span-3 xl:col-span-2 grid grid-cols-3 ${stylesStatus.field} ${stylesStatus.h1}`}
            >
              <div className={`col-span-1 ${stylesStatus.title}`}>NPV:</div>
              <div className={`col-span-2 ${stylesStatus.value}`}>{m.npv}%</div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

const PredictionResult = () => {
  const [risk] = useState(() => Math.floor(Math.random() * 100));
  const [pfStatus] = useState(() => (risk < 40 ? "Pass" : "Fail"));

  return (
    <div className={`${styles.prediction_result} ${stylesStatus["application-status"]}`}>
      <Suspense fallback={<LoadInProgress />}>
        <TitledBox
          title="Prediction"
          titleClass={stylesStatus.title}
          contentClass={`${stylesStatus.content} ${pfStatus}`}
        >
          <div>{risk}% Risk</div>
        </TitledBox>
      </Suspense>
    </div>
  );
};

const modelTableColumns = [
  {
    title: "Covariate Name",
    dataIndex: "covName",
  },
  {
    title: "Covariate Value",
    dataIndex: "covVal",
  },
  {
    title: "Outcome Mean",
    dataIndex: "covMeanWO",
  },
  {
    title: "Non-Outcome Mean",
    dataIndex: "covMeanWNO",
  },
];
const ModelWeightsTable = () => {
  return (
    <React.Suspense fallback={<LoadInProgress tip="Loading Table..." />}>
      <ProTable
        className={stylesTbl.dataTable}
        columns={modelTableColumns}
        defaultSize="small"
        headerTitle={
          <div data-augmented-ui=" br-clip border">
            Model <span className={stylesTbl.status}>Weights</span>
          </div>
        }
        onRequestError={console.error}
        pagination={{ defaultPageSize: 10 }}
        request={(params, sorter, filter) =>
          axios
            .get("/data/prediction_model_table_data.json")
            .then((response) => ({ data: response.data, success: true }))
        }
        rowKey="covName"
        search={false}
      />
    </React.Suspense>
  );
};

const DemoScatter = () => {
  const config = {
    paddingLeft: 60,
    data: {
      type: "fetch",
      value:
        "https://render.alipay.com/p/yuyan/180020010001215413/antd-charts/scatter-point-sequential.json",
    },
    xField: (d) => new Date(d.date),
    yField: "value",
    colorField: "value",
    legend: false,
    shapeField: "point",
    style: {
      stroke: "#000",
      strokeOpacity: 0.2,
    },
    scale: {
      color: {
        palette: "rdBu",
        offset: (t) => 1 - t,
      },
    },
    theme: "classicDark",
    tooltip: [
      { channel: "x", name: "year", valueFormatter: (d) => d.getFullYear() },
      { channel: "y" },
    ],
    annotations: [{ type: "lineY", data: [0], style: { stroke: "#000", strokeOpacity: 0.2 } }],
  };
  return <Scatter {...config} />;
};

const DemoFacetBase = () => {
  const config = {
    type: "facetRect",
    //  height: 640,
    autoFit: true,
    //  paddingLeft: 60,
    //  paddingBottom: 60,
    data: {
      type: "fetch",
      value: "https://assets.antv.antgroup.com/g2/penguins.json",
      transform: [
        {
          type: "map",
          callback: ({ culmen_depth_mm: depth, culmen_length_mm: length, ...d }) => ({
            ...d,
            culmen_depth_mm: depth === "NaN" ? NaN : depth,
            culmen_length_mm: length === "NaN" ? NaN : length,
          }),
        },
      ],
    },
    encode: { x: "sex", y: "species" },
    children: [
      {
        type: "point",
        frame: false,
        encode: { x: "culmen_depth_mm", y: "culmen_length_mm" },
        style: { fill: "#ddd", strokeWidth: 0 },
        facet: false,
      },
      {
        type: "point",
        encode: { x: "culmen_depth_mm", y: "culmen_length_mm", color: "island" },
      },
    ],
    legend: false,
    theme: "classicDark",
  };
  return <Base {...config} />;
};

const uvBillData = [
  { time: "2019-03", value: 350, type: "uv" },
  { time: "2019-04", value: 900, type: "uv" },
  { time: "2019-05", value: 300, type: "uv" },
  { time: "2019-06", value: 450, type: "uv" },
  { time: "2019-07", value: 470, type: "uv" },
  { time: "2019-03", value: 220, type: "bill" },
  { time: "2019-04", value: 300, type: "bill" },
  { time: "2019-05", value: 250, type: "bill" },
  { time: "2019-06", value: 220, type: "bill" },
  { time: "2019-07", value: 362, type: "bill" },
];
const transformData = [
  { time: "2019-03", count: 800, name: "a" },
  { time: "2019-04", count: 600, name: "a" },
  { time: "2019-05", count: 400, name: "a" },
  { time: "2019-06", count: 380, name: "a" },
  { time: "2019-07", count: 220, name: "a" },
  { time: "2019-03", count: 750, name: "b" },
  { time: "2019-04", count: 650, name: "b" },
  { time: "2019-05", count: 450, name: "b" },
  { time: "2019-06", count: 400, name: "b" },
  { time: "2019-07", count: 320, name: "b" },
  { time: "2019-03", count: 900, name: "c" },
  { time: "2019-04", count: 600, name: "c" },
  { time: "2019-05", count: 450, name: "c" },
  { time: "2019-06", count: 300, name: "c" },
  { time: "2019-07", count: 200, name: "c" },
];
const DemoDualAxes = () => {
  const config = {
    xField: "time",
    scale: { color: { range: ["#5B8FF9", "#5AD8A6", "#5D7092", "#F6BD16", "#6F5EF9"] } },
    children: [
      {
        data: uvBillData,
        type: "line",
        yField: "value",
        colorField: "type",
        shapeField: "smooth",
        style: { lineWidth: 3, lineDash: [5, 5] },
      },
      {
        data: transformData,
        type: "line",
        yField: "count",
        colorField: "name",
        axis: { y: false },
        style: { lineWidth: 3 },
      },
      {
        data: transformData,
        type: "point",
        yField: "count",
        colorField: "name",
        sizeField: 3,
        shapeField: "point",
        axis: { y: false },
        tooltip: false,
      },
    ],
    theme: "classicDark",
  };
  return <DualAxes {...config} />;
};

export const AnswerComp = ({ tabKey, tabsState, question: q }) => {
  const [scenario] = useState(() => CDSSSim.getScenario(q.patientId));
  return (
    <>
      <Row gutter={[8, 8]}>
        <Col
          md={{ span: 6, order: 1 }}
          xs={{ span: 24, order: 1 }}
          xl={{ span: 5, order: 1 }}
          xxl={{ span: 4, order: 1 }}
        >
          <Suspense fallback={<LoadInProgress />}><PatientPhoto scenario={scenario} /></Suspense>
        </Col>
        <Col
          md={{ span: 18, order: 2 }}
          xs={{ span: 24, order: 2 }}
          xl={{ span: 19, order: 2 }}
          xxl={{ span: 20, order: 2 }}
        >
          <Row gutter={[8, 8]}>
            <Col
              md={{ span: 18, order: 1 }}
              xs={{ span: 24, order: 2 }}
              xl={{ span: 19, order: 1 }}
              xxl={{ span: 20, order: 1 }}
            >
              <ModelDetails />
            </Col>
            <Col
              md={{ span: 6, order: 2 }}
              xs={{ span: 24, order: 1 }}
              xl={{ span: 5, order: 1 }}
              xxl={{ span: 4, order: 1 }}
            >
              <PredictionResult />
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 8 }} style={{ height: "256px" }}>
              <DemoScatter />
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 8 }} style={{ height: "256px" }}>
              <DemoDualAxes />
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 8 }} style={{ height: "256px" }}>
              <DemoFacetBase />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className={styles.model_weights}>
        <Col flex="auto">
          <ModelWeightsTable />
        </Col>
      </Row>
      {/* <div className={styles.prediction_container}>
        <PatientPhoto />
        <ModelDetails />

        <PredictionResult />

        <div className={styles.model_performance_charts}></div>
        <div className={styles.model_performance_kpis}></div>
        <div className={styles.model_details}>
          <pre>{JSON.stringify(q, null, 2)}</pre>
        </div>
        <div className={styles.model_weights}>
          <ModelWeightsTable />
        </div>
      </div> */}
    </>
  );
};

export const QuestionComp = ({ onQuestionChange, className }) => {
  // search text -> icd9Code
  const [diagnosis, setDiagnosis] = useState(() => ({
    label: "Major depressive disorder",
    value: "42731",
  }));
  const [patientId, setPatientId] = useState(3);

  const refSubmit = useRef();
  // submit button onClick handler
  useEventListener(
    "click",
    () => {
      const q = {
        icd9Code: diagnosis.value,
        patientId,
      };
      onQuestionChange({
        question: q,
        questionKey: `${q.icd9Code}_${q.patientId}`,
      });
    },
    { target: refSubmit },
  );

  return (
    <Row className={className}>
      <Col>After diagnosed with</Col>
      <Col>
        <ICD9Lookup
          initial={[diagnosis]}
          defaultValue={diagnosis.value}
          onChange={(icd9Code, { label, value }) => setDiagnosis({ label, value })}
        />
      </Col>
      <Col>
        <Row align="middle">
          <Col>how likely patient</Col>
          <Col className="flex m-2 items-center">
            <InputNumber defaultValue={patientId} onChange={setPatientId} />
          </Col>
        </Row>
      </Col>
      <Col>will attempt Suicide in the first year?</Col>
      <Col>
        <Button type="primary" ghost shape="round" ref={refSubmit}>
          Submit
        </Button>
      </Col>
    </Row>
  );
};

export default {
  AnswerComp,
  QuestionComp,
};
