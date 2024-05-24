import React, { Suspense } from "react";
import { Divider } from "antd";

import LoadInProgress, {LoadError} from "../../../../../../components/load-in-progress";

const Admissions = React.lazy(() => import("./patient_admissions"));

import styles from "./styles.patients.module.css";

export default ({ record }) => {
  const subjectId = record.id; 
  return (
    <div className={styles.patientPage}>
        <Divider orientation="left">Patient {subjectId} [Admission History]</Divider>
        <Suspense fallback={<LoadInProgress />}>
          <Admissions subjectId={subjectId} />
        </Suspense>
    </div>
  );
};
