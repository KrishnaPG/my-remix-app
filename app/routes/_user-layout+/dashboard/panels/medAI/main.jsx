import React, { useCallback, useState } from "react";
import { Tabs } from "antd";
import LoadInProgress from "../../../../../components/load-in-progress";

import styles from "./style.module.css";

const PatientList = React.lazy(() => import("./patients/list"));
const MedICD11Explorer = React.lazy(() => import("./icd11/explorer"));
const Cohorts = React.lazy(() => import("./cohorts/patientsDiagnosedWith/main"));
const Insights = React.lazy(() => import("./metrics/insights"));
const PatientMetrics = React.lazy(() => import("./metrics/patient-level"));
const PopMetrics = React.lazy(() => import("./metrics/population-level"));
const ICUAnalytics = React.lazy(() => import("./metrics/severity"));

const TabChild = ({ Comp }) => {
  return (
    <React.Suspense fallback={<LoadInProgress tip="Preparing the UI" />}>
      <Comp />
    </React.Suspense>
  );
};

export default React.memo(
  (props) => {
    const [selectedOrgId, setSelectedOrgId] = useState();
    const onSelectFn = useCallback((value, option) => setSelectedOrgId(option.id), []);

    return (
      <Tabs
        tabPosition="bottom"
        className={styles.medAIPage}
        defaultActiveKey="patientList"
        type="card"
        items={[
          {
            label: "Patient List",
            key: "patientList",
            children: <TabChild Comp={PatientList} />,
          },
          {
            label: "ICD-11",
            key: "icd11",
            children: <TabChild Comp={MedICD11Explorer} />,
          },
          {
            label: "Cohorts",
            key: "cohorts",
            children: <TabChild Comp={Insights} />,
          },
          {
            label: "CDSS [Patient]",
            key: "patient-cdss",
            children: <TabChild Comp={PatientMetrics} />,
          },
          {
            label: "CDSS [Population]",
            key: "population-cdss",
            children: <TabChild Comp={PopMetrics} />,
          },
          {
            label: "ICU Analytics",
            key: "icu-analytics",
            children: <TabChild Comp={ICUAnalytics} />,
          },
        ]}
      />
    );
  },
  () => true,
);
