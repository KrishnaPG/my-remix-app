import React, { useState, useRef } from "react";
import { Button, Spin, Row, Col, Divider, Descriptions, Switch } from "antd";
import { AlignCenterOutlined, ContainerOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { getPatientData, offsetDate } from "../mimic3";
import { useToggle } from "ahooks";
import LoadInProgress, { LoadError } from "../../../../../../components/load-in-progress";

import styles from "./styles.patient-admissions.module.css";

const Annotator = React.lazy(
  () =>
    import(
      /* webpackChunkName: "ann", webpackPreload: true */ "../../../../../../components/Annotator"
    ),
);
const ProCard = React.lazy(
  () => import(/* webpackChunkName: "antPCard", webpackPreload: true */ "@ant-design/pro-card"),
);
const Field = React.lazy(
  () => import(/* webpackChunkName: "antPField", webpackPreload: true */ "@ant-design/pro-field"),
);

const safeDateTimeFormat = (str) => {
  const d = offsetDate(str);
  return d ? d.format("ddd, DD-MMM-YYYY, HH:mm:ss") : "-";
};

const getAdmissionTitle = (adm) => (
  <span>
    [{adm.admissionType} / {adm.diagnosis}] {" @ "}
    {safeDateTimeFormat(adm.admittime)} {" - "}
    {safeDateTimeFormat(adm.dischtime)}
  </span>
);

const NoteView = ({ note }) => {
  const [showMarkedView, { toggle }] = useToggle(false);
  return (
    <ProCard
      title={`${note.category}: ${note.description}`}
      extra={
        <>
          <span className={styles.timestamp}>
            {safeDateTimeFormat(note.charttime || note.chartdate)}
          </span>
          <Switch
            onChange={toggle}
            defaultChecked={showMarkedView}
            unCheckedChildren={<AlignCenterOutlined />}
            checkedChildren={<ContainerOutlined />}
            title="Swith on/off Notes Markup"
          ></Switch>
        </>
      }
      split="vertical"
      type="inner"
      bordered
      headerBordered
      className={styles.note}
    >
      <Annotator text={note.text} showMarkedView={showMarkedView} cacheKey={note.id}></Annotator>
    </ProCard>
  );
};

const _Admissions = ({ subjectId }) => {
  const {
    data: { patient = {} } = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ["patientData", subjectId],
    queryFn: () => getPatientData(subjectId),
    enabled: !!subjectId,
    retry: false,
    retryOnMount: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity, // cache should never expire, as this is read-only data
  });
  if (error) return <LoadError msg="Failed to Load Admissions Data" />;
  if (isLoading) return <LoadInProgress tip="Retrieving Admissions Data..." />;
  return (
    <React.Suspense fallback={<LoadInProgress tip="Rendering Admissions Data..." />}>
      <Descriptions
        bordered
        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        layout="horizontal"
        className={styles.patientData}
      >
        <Descriptions.Item label="Id">
          <Field text={patient.subjectId} valueType="text" />
        </Descriptions.Item>
        <Descriptions.Item label="Sex">
          <Field text={patient.gender} valueType="text" />
        </Descriptions.Item>
        <Descriptions.Item label="Date of Birth">
          <Field text={offsetDate(patient.dob)} valueType="date" />
        </Descriptions.Item>
        <Descriptions.Item label="Date of Death">
          <Field text={offsetDate(patient.dod)} valueType="date" />
        </Descriptions.Item>
      </Descriptions>
      {patient.admissions.map((adm, index) => (
        <ProCard
          title={getAdmissionTitle(adm)}
          collapsible
          defaultCollapsed={index ? true : false}
          extra=""
          headerBordered
          key={adm.hadmId}
          split="horizontal"
          className={styles.admission}
        >
          {adm.notes.map((note, index) => (
            <NoteView note={note} key={note.id} />
          ))}
        </ProCard>
      ))}
    </React.Suspense>
  );
};

export default React.memo(
  _Admissions,
  (prevProps, nextProps) => prevProps.subjectId == nextProps.subjectId,
);
