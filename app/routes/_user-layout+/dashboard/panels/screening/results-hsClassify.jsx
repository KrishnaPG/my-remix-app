import React, { useEffect, useState } from "react";
import { Descriptions, List, Popover, Space, Statistic } from "antd";
import { addDays, format } from "date-fns";

import CountryFlag from "../../../../../components/country-flag";

import styles from "./style.module.css";

const DefResponse = {
  data: [
    {
      sku: "ABC123",
      productTitle: "cna test",
      productDescription: "Black mens summer cotton shirt",
      countryOfClassification: "",
      tradeDirection: "",
      hscode: "400811",
      hscodeDescription:
        "Rubber and articles thereof Plates, sheets, strip, rods and profile shapes, of vulcanised rubber other than hard rubber.  -- Plates, sheets and strip",
      confidence: "97.47%",
      dutyRate: "NIL",
      "VAT/GSTRate": "NIL",
    },
    {
      sku: "ABC123",
      productTitle: "cna test",
      productDescription: "Black mens summer cotton shirt",
      countryOfClassification: "",
      tradeDirection: "",
      hscode: "847350",
      hscodeDescription:
        "Nuclear reactors, boilers, machinery and mechanical appliances; parts thereof Parts and accessories (other than covers, carrying cases and the like) suitable for use solely or principally with machines of headings 84.70 to 84.72.  - Parts and accessories equally suitable for use with the machines of two or more of the headings 84.70 to 84.72",
      confidence: "79.54%",
      dutyRate: "NIL",
      "VAT/GSTRate": "NIL",
    },
    {
      sku: "ABC123",
      productTitle: "cna test",
      productDescription: "Black mens summer cotton shirt",
      countryOfClassification: "",
      tradeDirection: "",
      hscode: "848340",
      hscodeDescription:
        "Nuclear reactors, boilers, machinery and mechanical appliances; parts thereof Transmission shafts (including cam shafts and crank shafts) and cranks; bearing housings and plain shaft bearings; gears and gearing; ball or roller screws; gear boxes and other speed changers, including torque converters; flywheels and pulleys, including pulley blocks; clutches and shaft couplings (including universal joints).  - Gears and gearing, other than toothed wheels, chain sprockets and other transmission elements presented separately; ball or roller screws; gear boxes and other speed changers, including torque converters",
      confidence: "79.48%",
      dutyRate: "NIL",
      "VAT/GSTRate": "NIL",
    },
    {
      sku: "ABC123",
      productTitle: "cotton polo shirt",
      productDescription: "Black mens summer cotton shirt",
      countryOfClassification: "United States of America",
      tradeDirection: "import",
      hscode: "6105100030",
      confidence: "90.67%",
      dutyRate: "19.7%",
      "VAT/GSTRate": "NIL",
    },
    {
      sku: "ABC123",
      productTitle: "cotton polo shirt",
      productDescription: "Black mens summer cotton shirt",
      countryOfClassification: "United States of America",
      tradeDirection: "import",
      hscode: "6109901060",
      confidence: "85.94%",
      dutyRate: "32%",
      "VAT/GSTRate": "NIL",
    },
  ],
  status: "success",
};

const ClassificationDetails = React.memo(
  ({ item }) => {
    return (
      <Descriptions bordered size="small" column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 3 }}>
        <Descriptions.Item label="Product Title">{item.productTitle}</Descriptions.Item>
        <Descriptions.Item label="Product Description">{item.productDescription}</Descriptions.Item>
        <Descriptions.Item label="Country of Classification">
          {item.countryOfClassification}
        </Descriptions.Item>
        <Descriptions.Item label="Trade Direction">{item.tradeDirection}</Descriptions.Item>
        <Descriptions.Item label="Duty Rate">{item.dutyRate}</Descriptions.Item>
        <Descriptions.Item label="VAT/GSTRate">{item["VAT/GSTRate"]}</Descriptions.Item>
      </Descriptions>
    );
  },
  () => true,
);

const renderHSClassificationItem = (item, index) => {
  return (
    <List.Item key={index}>
      <List.Item.Meta
        avatar={
          <Statistic className={styles.match} title="Conf." value={item.confidence} suffix="" />
        }
        title={<>{item.hscode}</>}
        description={<>{item.hscodeDescription}</>}
      />
      <ClassificationDetails item={item} />
    </List.Item>
  );
};

export default ({ query }) => {
  const [hsClassifyResponse, setHSClassifyResponse] = useState(); // TODO: replace it with useQuery to make the API call and get the response

  useEffect(() => {
    if (!query) return;
    setHSClassifyResponse(DefResponse);
  }, [query]);

  if (!hsClassifyResponse) return null;

  return (
    <List
      className={styles.resultList}
      itemLayout="vertical"
      size="large"
      dataSource={hsClassifyResponse.data}
      header={<div>HS Classification Results</div>}
      footer={
        <div>
          <b>{hsClassifyResponse.data?.length}</b> classification results found.
        </div>
      }
      renderItem={renderHSClassificationItem}
    />
  );
};
