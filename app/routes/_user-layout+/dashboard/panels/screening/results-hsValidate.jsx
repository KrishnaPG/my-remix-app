import React, { useEffect, useState } from "react";
import { Descriptions, List, Popover, Space, Statistic } from "antd";
import { addDays, format } from "date-fns";

import CountryFlag from "../../../../../components/country-flag";

import styles from "./style.module.css";

const DefResponse = [
  {
    status: "success",
    isValid: false,
    suggestions: [
      {
        hscode: "2204100065",
        defaultDuty: "19.8¢/liter",
        vatRates: "",
        exciseDuty: "3.4 $/gallon",
        otherTax: "",
      },
      {
        hscode: "2204100030",
        defaultDuty: "19.8¢/liter",
        vatRates: "",
        exciseDuty: "3.4 $/gallon",
        otherTax: "",
      },
      {
        hscode: "2204100075",
        defaultDuty: "19.8¢/liter",
        vatRates: "",
        exciseDuty: "3.4 $/gallon",
        otherTax: "",
      },
    ],
    hscode: "2204109999",
    countryIsoCode: "US",
    tradeDirection: "import",
  },
];

const SuggestionItem = React.memo(
  ({ item }) => {
    return (
      <Descriptions bordered size="small" column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 4 }}>
        <Descriptions.Item label="Default Duty">{item.defaultDuty}</Descriptions.Item>
        <Descriptions.Item label="VAT Rates">{item.vatRates}</Descriptions.Item>
        <Descriptions.Item label="Excise Duty">{item.exciseDuty}</Descriptions.Item>
        <Descriptions.Item label="Other Tax">{item.otherTax}</Descriptions.Item>
      </Descriptions>
    );
  },
  () => true,
);

const renderHSValidationItem = (item, index) => {
  return (
    <List.Item key={index}>
      <List.Item.Meta
        title={<>{item.hscode}</>}
      />
      <SuggestionItem item={item} />
    </List.Item>
  );
};

export default ({ query }) => {
  const [hsValidateReponse, setHSValidateReponse] = useState(); // TODO: replace it with useQuery to make the API call and get the response

  useEffect(() => {
    if (!query) return;
    setHSValidateReponse(DefResponse);
  }, [query]);

  if (!hsValidateReponse) return null;

  return (
    <List
      className={styles.resultList}
      itemLayout="vertical"
      size="large"
      dataSource={hsValidateReponse[0]?.suggestions}
      header={<div>HSCode Suggestions for [{hsValidateReponse[0]?.hscode}] {hsValidateReponse[0]?.countryIsoCode} [{ hsValidateReponse[0]?.tradeDirection}]</div>}
      footer={
        <div>
          <b>{hsValidateReponse[0]?.suggestions?.length}</b> suggestions found.
        </div>
      }
      renderItem={renderHSValidationItem}
    />
  );
};
