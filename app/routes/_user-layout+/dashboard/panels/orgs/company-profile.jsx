import React, { useState, useEffect } from "react";
import { Descriptions, Skeleton, Tabs } from "antd";
import { ProCard } from "@ant-design/pro-card/es/";
import { useQuery } from "@tanstack/react-query";

import * as lei from "../../../../../services/lei/index.client";

import LoadInProgress, { LoadError } from "../../../../../components/load-in-progress";
import CountryFlag from "../../../../../components/country-flag";

import DemoStock from "./demo-stock";

import styles from "./style-profile.module.css";

function useLEI(id, relation = "self") {
  return useQuery({
    queryKey: ["lei", id, relation],
    queryFn: () => lei.getRecord(id, relation),
    enabled: !!id,
    retry: false,
    retryOnMount: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: 12 * 60 * 60 * 1000, // 12hours
  });
}

const CompanyCard = ({ entity }) => {
  return (
    <div>
      <h1>{entity.legalName.name}</h1>
      <p>{entity.legalAddress.addressLines.join(", ")}</p>
      <p>{entity.legalAddress.city}, </p>
      <p>{entity.legalAddress.country}</p>
    </div>
  );
};

const RelatedCompany = React.memo(
  ({ orgId, relation }) => {
    const { data, isLoading, error } = useLEI(orgId, relation);
    console.log("inside related: ", orgId, relation, data, error, isLoading);

    if (error) return <LoadError msg={error?.message} />;
    if (isLoading) return <LoadInProgress />;

    const entity = data?.attributes?.entity;
    if (!entity) return null;

    return <CompanyCard entity={entity} />;
  },
  () => true
);

const EntityDetails = ({ entity, orgId }) => {
  const [entityDetails] = useState(() => {
    return [
      { label: "Name", children: entity.legalName.name },
      { label: "Address", children: entity.legalAddress.addressLines.join(", ") },
      { label: "City", children: entity.legalAddress.city },
      { label: "Country", children: entity.legalAddress.country },
      { label: "Postal Code", children: entity.legalAddress.postalCode },
    ];
  });
  return (
    <div className={styles.entityDetails}>
      <Descriptions
        title="Entity Details"
        bordered
        column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
        items={entityDetails}
      />
      <ProCard style={{ marginBlockStart: 8 }} gutter={8} ghost={true} wrap>
        <ProCard
          colSpan={{ xs: 24, sm: 12, md: 8, lg: 6, xl: 6 }}
          layout="center"
          type="inner"
          bordered
          title="Direct Parent"
        >
          <RelatedCompany orgId={orgId} relation="parent" />
        </ProCard>
        <ProCard
          colSpan={{ xs: 24, sm: 12, md: 8, lg: 6, xl: 6 }}
          layout="center"
          type="inner"
          bordered
          title="Ultimate Parent"
        >
          <RelatedCompany orgId={orgId} relation="ultimate-parent" />
        </ProCard>
        <ProCard
          colSpan={{ xs: 24, sm: 12, md: 8, lg: 6, xl: 6 }}
          layout="center"
          type="inner"
          bordered
          title="Direct Child(ren)"
        >
          <RelatedCompany orgId={orgId} relation="children" />
        </ProCard>
        <ProCard
          colSpan={{ xs: 24, sm: 12, md: 24, lg: 6, xl: 6 }}
          layout="center"
          type="inner"
          bordered
          title="Ultimate Child(ren)"
        >
          <RelatedCompany orgId={orgId} relation="ultimate-children" />
        </ProCard>
      </ProCard>
    </div>
  );
};

const _CorporateProfile = ({ entity, orgId }) => {
  return <EntityDetails entity={entity} orgId={orgId} />;
};
const CorporateProfile = React.memo(_CorporateProfile, (prevProps, nextProps) => true);

const BusinessProfile = () => {
  return (
    <div className={styles.entityDetails}>
      <Descriptions title="Business Profile" bordered column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }} items={[]} />
    </div>
  );
};
const FinancialProfile = () => {
  return (
    <div className={styles.entityDetails}>
      <Descriptions
        title="Financial Profile"
        bordered
        column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
        items={[]}
      />
      <DemoStock />
    </div>
  );
};
const NewsProfile = () => {
  return (
    <div className={styles.entityDetails}>
      <Descriptions title="News" bordered column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }} items={[]} />
    </div>
  );
};

const _CompanyProfile = ({ tabKey: orgId, tabsState }) => {
  const { data, isFetching, error } = useLEI(orgId);

  useEffect(() => {
    if (!data) return;
    const entity = data.attributes.entity;
    // set the tab title
    tabsState.setLabel(orgId, entity.legalName.name);
  }, [data]);

  if (error) return <LoadError msg={error?.message} />;
  if (isFetching) return <LoadInProgress />;

  const { attributes, relationships } = data;
  return (
    <Tabs
      className={styles.vertTabText}
      tabPosition="right"
      type="card"
      items={[
        {
          label: "Corporate",
          key: "corporate",
          children: <CorporateProfile entity={attributes.entity} orgId={orgId} />,
        },
        { label: "Business", key: "business", children: <BusinessProfile entity={attributes.entity} orgId={orgId} /> },
        {
          label: "Financial",
          key: "financial",
          children: <FinancialProfile entity={attributes.entity} orgId={orgId} />,
        },
        { label: "News", key: "news", children: <NewsProfile entity={attributes.entity} orgId={orgId} /> },
      ]}
    />
  );
};

export default React.memo(_CompanyProfile, (prevProps, nextProps) => true);
