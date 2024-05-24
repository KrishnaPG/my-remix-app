import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useEventSource, useSubscribe } from "remix-sse/dist/client/index.js";

import { Button } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";

import LoadInProgress, { LoadError } from "../../../../../components/load-in-progress";
import { loadSampleData } from "./load-sample-data";
import { triggerPanelShowPaymentApp } from "..";
import { PassFailWarn } from "../../../../../components/pass-fail-warn";
import { getApplicationStatusText } from "./show";

import styles from "./style-list.module.css";

import sampleFlagged from "./sample-data-flagged";
import flagDefinitions from "../flag-results/flag-definitions";

const ProTable = React.lazy(() => import("@ant-design/pro-table"));

const columns = [
  {
    title: "ApplicationNo",
    dataIndex: "ApplicationNo",
    key: "ApplicationNo",
    render: (val, r) => (
      <Button type="link" className={styles.idLink} onClick={() => {}}>
        {val}
      </Button>
    ),
  },
  {
    title: "LCNo",
    dataIndex: "LCNo",
    key: "LCNo",
    render: (val, r) => (
      <Button type="link" className={styles.idLink} onClick={() => {}}>
        {val}
      </Button>
    ),
  },
  {
    title: "InvoiceNo",
    dataIndex: "InvoiceNo",
    key: "InvoiceNo",
    render: (val, r) => (
      <Button type="link" className={styles.idLink} onClick={() => {}}>
        {val}
      </Button>
    ),
  },
  {
    title: "Applicant",
    className: styles.orgName,

    dataIndex: "Drawer",
    key: "Drawer",
  },
  {
    title: "Beneficiary",
    className: styles.orgName,

    dataIndex: "Drawee",
    key: "Drawee",
  },
  {
    title: "Amount",
    className: styles.amount,
    dataIndex: "Amount",
    key: "Amount",
    valueType: "money",
  },
  {
    title: "Status",
    dataIndex: "Status",
    key: "Status",
    render: (val, record) => {
      if (!record.Status) return null;
      switch (record.Status) {
        case "Processing":
          return <LoadInProgress />;
        default:
          return (
            <Button type="link" className={styles.status} onClick={() => triggerPanelShowPaymentApp(record)}>
              <PassFailWarn result={record.Status}>{getApplicationStatusText(record.Status)}</PassFailWarn>
            </Button>
          );
      }
    },
  },
];

const runAnalysis = (setActiveProcessingId, setAnalysisTimer) => {
  const timer = setInterval(() => {
    setActiveProcessingId((d) => d + 1);
  }, 1500);
  setAnalysisTimer(timer);
};

const FailThresholdMax = 40;
const FailThresholdMin = 20;
const WarnThresholdMin = 45;
const PassThresholdMin = 70;
const simulatePass = (obj) => {
  const result = "Pass";
  const match = PassThresholdMin + Math.ceil(Math.random() * 25);
  return { ...obj, match, result };
}
const simulateWarn = (obj) => {
  const result = "Warn";
  const match = WarnThresholdMin + Math.ceil(Math.random() * 20);
  return { ...obj, match, result };
}
const simulateFail = obj => {
  const result = "Fail";
  const match = FailThresholdMin + Math.ceil(Math.random() * (FailThresholdMax - FailThresholdMin));
  return { ...obj, match, result };
}
const simulatePassFailWarn = obj => {
  const match = Math.ceil(Math.random() * 100);
  const result = match >= PassThresholdMin ? "Pass" : match < FailThresholdMax ? "Fail" : "Warn";
  return { ...obj, match, result };
}

const defInferred = [
  { hsCode:"320420", result: "Warn", match: 43, dualUseCheck: { result: "Warn", match: 52, uses: ["Plastic Production", "Explosives"] } },
  { hsCode:"900720", result: "Fail", match: 28, dualUseCheck: { result: "Fail", match: 24, uses: ["Cosmetics", "Explosives"] } },
];

const calculateFlags = (r) => {
  const forcedInference = { hsCode: r.HSCode, result: "Pass", match: 100, dualUseCheck: { result: "Pass", match: 94, uses: null } };
  r.hsCodesInferred = [forcedInference, ...defInferred];

  const forcedFlags = sampleFlagged[r.ApplicationNo];
  if (forcedFlags) {
    const status = Object.keys(forcedFlags).length <= 2 ? "Warn" : "Fail";
    const simulateFn = status === "Warn" ? simulateWarn : simulateFail;
    r.flagResults = flagDefinitions.reduce((obj, f) => { obj[f.ruleName] = (forcedFlags[f.ruleName] ? simulateFn(f) : simulatePass(f)); return obj; }, {});
    r.forcedFlags = forcedFlags;
    if (forcedFlags["T2"]) { // dual-use goods
      r.hsCodesInferred[0].dualUseCheck = { result: "Fail", match: 78, uses: ["Industrial Solvents, Dyes", "Bio-Chemical Weapons (Schedule 1 of 1993 Chemical Weapons Convention"] };
    }
    return status;
  } else {
    const status = simulatePassFailWarn({}).result;
    r.flagResults = flagDefinitions.reduce((obj, f) => { obj[f.ruleName] = (status === "Pass" ? simulatePass(f) : simulatePassFailWarn(f)); return obj; }, {});
    r.hsCodesInferred[0].match = simulatePass({}).match; // randomize the score
    return status;
  }
}

export default React.memo(
  () => {
    useEventSource("/api/sse"); // TODO: move this line to somewhere top level
    const msg = useSubscribe("/api/sse", "analysis.update", { returnLatestOnly: true });

    const actionRef = useRef();
    const formRef = useRef();

    const [tblDataSource, setTblDataSource] = useState([]);
    const [analysisTimer, setAnalysisTimer] = useState(null);
    const [activeProcessingId, setActiveProcessingId] = useState(0);

    const { data, isFetching, error } = useQuery({
      queryKey: ["sample-data"],
      queryFn: loadSampleData,
      staleTime: Number.POSITIVE_INFINITY, // TODO: in the production, make this 0 as we do NOT want to cache the list (since it can change)
    });
    useEffect(() => {
      if (isFetching || error) return;
      // when data is fetched from backend, update the table with that new data
      setTblDataSource(data);
      // cleanup the timer, if any
      return () => {
        if (analysisTimer) {
          clearInterval(analysisTimer);
          setAnalysisTimer(null);
        }
      };
    }, [isFetching]);

    useEffect(() => {
      if (activeProcessingId == 0) return;
      data[activeProcessingId - 1]["Status"] = calculateFlags(data[activeProcessingId - 1]);
      if (activeProcessingId >= data.length) {
        clearInterval(analysisTimer);
        setAnalysisTimer(null);
        setActiveProcessingId(0);
      } else data[activeProcessingId]["Status"] = "Processing";
      setTblDataSource(data);
    }, [activeProcessingId]);

    if (error) return <LoadError msg={error?.message} />;

    return (
      <div className="m-4">
        <ProTable
          actionRef={actionRef}
          cardBordered
          className={styles.dataTable}
          columns={columns}
          columnsState={{
            persistenceKey: "paymentAppsList",
            persistenceType: "localStorage",
            defaultValue: {
              option: { fixed: "right", disable: true },
            },
          }}
          dataSource={tblDataSource}
          dateFormatter="string"
          editable={{
            type: "multiple",
          }}
          form={{
            disabled: !!analysisTimer || isFetching,
            syncToUrl: (values, type) => {
              if (type === "get") {
                return {
                  ...values,
                  created_at: [values.startTime, values.endTime],
                };
              }
              return values;
            },
          }}
          formRef={formRef}
          headerTitle={
            <div data-augmented-ui=" br-clip border">
              Applications: <span className={styles.status}>Pending Review</span>
            </div>
          }
          loading={isFetching}
          options={{
            setting: {
              listsHeight: 400,
            },
          }}
          onSubmit={(x) => console.log("on submit: ", x)}
          rowKey="BillOfLadingNo"
          revalidateOnFocus={false}
          search={{
            labelWidth: "auto",
          }}
          toolBarRender={() => [
            <Button
              key="button"
              icon={<PlayCircleOutlined />}
              onClick={() => {
                runAnalysis(setActiveProcessingId, setAnalysisTimer);
              }}
              loading={!!analysisTimer || isFetching}
            >
              Run Analysis
            </Button>,
          ]}
        />
      </div>
    );
  },
  () => true
);
