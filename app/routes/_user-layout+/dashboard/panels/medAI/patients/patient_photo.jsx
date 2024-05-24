import React, { useState } from "react";
import { Card, Tooltip } from "antd";

import DataSim from "./personal-data-simulator";

import styles from "./styles.patient-photo.module.css";

export default React.memo(({scenario}) => {
  const [patient] = useState(() => DataSim.getPersonForScenario(scenario));
  return (
    <Card
      bordered={false}
      className={styles.patient_photo}
      cover={<img className={styles.photo} alt={patient.name} src={patient.avatar} />}
      actions={[
        <Tooltip title={`Sex: ${scenario.demographics.sex}`}>
          <span className={styles.demographics}>
            <span className={`${styles.icon} icon-gender`} />
            {scenario.demographics.sex}
          </span>
        </Tooltip>,
        <Tooltip title={`Age: ${scenario.demographics.age} years`}>
          <span className={styles.demographics}>{scenario.demographics.age} Yrs</span>
        </Tooltip>,
        <Tooltip title={`Bloodgroup: ${patient.bloodgroup}`}>
          <span className={styles.demographics}>{patient.bloodgroup}</span>
        </Tooltip>,
      ]}
      size="small"
    >
      <Card.Meta title={patient.name} description={patient.occupation} />
    </Card>
  );
}, () => true);