import React, { useState, useRef } from "react";
import { Button } from "antd";
import { queryPatients } from "../mimic3";
import {triggerPanelNewDiagnosis, triggerPanelShowPatientRecord } from "../..";
import LoadInProgress from "../../../../../../components/load-in-progress";

import styles from "./styles.patients.module.css";

import stylesTbl from "../../payment-applications/style-list.module.css";

const ProTable = React.lazy(
  () => import(/* webpackChunkName: "antPTable", webpackPreload: true */ "@ant-design/pro-table"),
);

const _DRGCodes = ({ r }) => {
  // some of these DRGCodes will be duplicates, so we
  // eliminate the duplicates by indexing the codes as object keys
  const [drgCodes] = useState(() =>
    r.drgCodes.reduce((obj, node) => {
      obj[node.drgCode] = node.description;
      return obj;
    }, {}),
  );
  return (
    <span className={styles.drgCodes}>
      {Object.entries(drgCodes).map(([code, description]) => (
        <span key={code}>
          <span className={styles.drgCode}>{code}</span>: {description}
        </span>
      ))}
    </span>
  );
};
const DRGCodes = React.memo(_DRGCodes, () => true);

const patientTableColumns = [
  {
    title: "id",
    dataIndex: "id",
    render: (val, record) => (
      <Button
        type="link"
        className={styles.idLink}
        onClick={() => triggerPanelNewDiagnosis(record)}
      >
        {val}
      </Button>
    ),
  },
  {
    title: "Sex",
    dataIndex: "gender",
    filters: true,
    valueEnum: {
      F: { text: "Female" },
      M: { text: "Male" },
    },
    hideInTable: true,
  },
  {
    title: "Birth Date",
    className: styles.dateCol,
    dataIndex: "dob",
    valueType: "date",
  },
  {
    title: "Admissions",
    dataIndex: "admCount",
    search: false,
    render: (val, record) => (
      <Button
        type="link"
        className={styles.idLink}
        onClick={() => triggerPanelShowPatientRecord(record)}
      >
        {val}
      </Button>
    ),
  },
  {
    title: "ICU Stays",
    dataIndex: "icuStays",
    // renderText: (nodes) => nodes.length,
    render: (val, record) => (
      <Button
        type="link"
        className={styles.idLink}
        onClick={() => triggerPanelShowPatientRecord(record)}
      >
        {val.length}
      </Button>
    ),
    search: false,
  },
  {
    title: "Diagnosis Related Groups",
    dataIndex: "drgCodes",
    render: (_, record, index) => <DRGCodes r={record} />,
    ellipsis: false,
    copyable: true,
  },
  {
    title: "Date of Death",
    className: styles.dateCol,
    dataIndex: "dod",
    valueType: "date",
  },
];

export default () => {
  const actionRef = useRef();
  const columns = patientTableColumns;
  return (
    <React.Suspense fallback={<LoadInProgress tip="Loading Table..." />}>
      <ProTable
        actionRef={actionRef}
        className={stylesTbl.dataTable}
        columns={columns}
        headerTitle={
          <div data-augmented-ui=" br-clip border">
            Patients: <span className={stylesTbl.status}>ICU Stays</span>
          </div>
        }
        onRequestError={console.error}
        request={(params, sorter, filter) => queryPatients({ ...params, sorter, filter })}
        rowKey="id"
      />
    </React.Suspense>
  );
};
