import React, { useEffect, useState } from "react";
import { Descriptions, List, Table, Tree, Popover, Space, Statistic } from "antd";
import { DownOutlined } from "@ant-design/icons";

import CountryFlag from "../../../../../components/country-flag";

import styles from "./style.module.css";

const DefResponse = {
  status: "success",
  total_compliances: 16,
  data: [
    {
      controllingAuthority: "HM Revenue & Customs (HMRC)",
      notes: "",
      countryOfExport: "AD",
      rates: "",
      countryOfImport: "GB",
      exceptions: "",
      reference: "United Kingdom Customs Tariff",
      countryOfOrigin: "AD",
      scopeOfControl: "Invasive Alien Species",
      applicableCodes: [
        {
          code: "C065",
          description:
            "Permit for invasive alien species in accordance with Art. 8 of Regulation (EU) 1143/2014",
        },
      ],
      nonApplicableCodes: [
        {
          code: "Y942",
          description:
            "The declared goods are not concerned by Commission Implementing Regulation (EU) 2016/1141",
        },
      ],
      footnotes: [
        {
          code: "CD679",
          description:
            'If the declared goods refer to one of the species described in the "IS" footnote linked to the measure or derive from an alien invasive species described in the latter footnote, a permit must be presented by virtue of Article 8 of Regulation (UE) No 1143/2014.',
        },
        {
          code: "IS002",
          description: "Trachemys scripta",
        },
      ],
      controlType: "Import Certificate",
      hscode: "01",
    },
    {
      controllingAuthority: "HM Revenue & Customs (HMRC)",
      notes: "",
      countryOfExport: "AD",
      rates: "",
      countryOfImport: "GB",
      exceptions: "",
      reference: "United Kingdom Customs Tariff",
      countryOfOrigin: "AD",
      scopeOfControl: "Invasive Alien Species",
      applicableCodes: [
        {
          code: "C065",
          description:
            "Permit for invasive alien species in accordance with Art. 8 of Regulation (EU) 1143/2014",
        },
      ],
      nonApplicableCodes: [
        {
          code: "Y942",
          description:
            "The declared goods are not concerned by Commission Implementing Regulation (EU) 2016/1141",
        },
      ],
      footnotes: [
        {
          code: "CD679",
          description:
            'If the declared goods refer to one of the species described in the "IS" footnote linked to the measure or derive from an alien invasive species described in the latter footnote, a permit must be presented by virtue of Article 8 of Regulation (UE) No 1143/2014.',
        },
        {
          code: "IS001",
          description:
            "Callosciurus erythraeus, Herpetes javanicus, Muntiacus reevesii, Myocastor coypus, Nasua nasua, Nyctereutes procyonoides, Ondatra zibethicus, Procyon lotor, Sciurus carolinensis, Sciurus niger, Tamias sibiricus",
        },
      ],
      controlType: "Import Certificate",
      hscode: "01",
    },
    {
      controllingAuthority: "HM Revenue & Customs (HMRC)",
      notes: "",
      countryOfExport: "AD",
      rates: "",
      countryOfImport: "GB",
      exceptions: "",
      reference: "United Kingdom Customs Tariff",
      countryOfOrigin: "AD",
      scopeOfControl: "Invasive Alien Species",
      applicableCodes: [
        {
          code: "C065",
          description:
            "Permit for invasive alien species in accordance with Art. 8 of Regulation (EU) 1143/2014",
        },
      ],
      nonApplicableCodes: [
        {
          code: "Y942",
          description:
            "The declared goods are not concerned by Commission Implementing Regulation (EU) 2016/1141",
        },
      ],
      footnotes: [
        {
          code: "CD679",
          description:
            'If the declared goods refer to one of the species described in the "IS" footnote linked to the measure or derive from an alien invasive species described in the latter footnote, a permit must be presented by virtue of Article 8 of Regulation (UE) No 1143/2014.',
        },
        {
          code: "IS003",
          description:
            "Acridotheres tristis, Alopochen aegyptiacus, Corvus splendens, Oxyura jamaicensis, Threskiornis aethiopicus",
        },
      ],
      controlType: "Import Certificate",
      hscode: "01",
    },
    {
      controllingAuthority: "Department for Environment, Food & Rural Affairs (DEFRA)",
      notes: "",
      countryOfExport: "AD",
      rates: "",
      countryOfImport: "GB",
      exceptions: "",
      reference: "United Kingdom Customs Tariff",
      countryOfOrigin: "AD",
      scopeOfControl: "Live swine",
      applicableCodes: [
        {
          code: "9120",
          description:
            "Importation of animal pathogens Licence under the Importation of Animal pathogens Order 1980 (IAPO)",
        },
      ],
      nonApplicableCodes: [],
      footnotes: [
        {
          code: "PR003",
          description:
            "We are implementing changes to imports from the EU in a phased approach. For more information, see:  the guidance on GOV.UK",
        },
      ],
      controlType: "Import Certificate",
      hscode: "01",
    },
    {
      controllingAuthority: "Department for Environment, Food & Rural Affairs (DEFRA)",
      notes: "",
      countryOfExport: "AD",
      rates: "",
      countryOfImport: "GB",
      exceptions: "",
      reference: "United Kingdom Customs Tariff",
      countryOfOrigin: "AD",
      scopeOfControl: "Live horses, asses, mules and hinnies",
      applicableCodes: [
        {
          code: "9120",
          description:
            "Importation of animal pathogens Licence under the Importation of Animal pathogens Order 1980 (IAPO)",
        },
      ],
      nonApplicableCodes: [],
      footnotes: [
        {
          code: "PR003",
          description:
            "We are implementing changes to imports from the EU in a phased approach. For more information, see:  the guidance on GOV.UK",
        },
      ],
      controlType: "Import Certificate",
      hscode: "01",
    },
    {
      controllingAuthority: "Department for Environment, Food & Rural Affairs (DEFRA)",
      notes: "",
      countryOfExport: "AD",
      rates: "",
      countryOfImport: "GB",
      exceptions: "",
      reference: "United Kingdom Customs Tariff",
      countryOfOrigin: "AD",
      scopeOfControl: "Live sheep and goats",
      applicableCodes: [
        {
          code: "9120",
          description:
            "Importation of animal pathogens Licence under the Importation of Animal pathogens Order 1980 (IAPO)",
        },
      ],
      nonApplicableCodes: [],
      footnotes: [
        {
          code: "PR003",
          description:
            "We are implementing changes to imports from the EU in a phased approach. For more information, see:  the guidance on GOV.UK",
        },
      ],
      controlType: "Import Certificate",
      hscode: "01",
    },
    {
      controllingAuthority: "Department for Environment, Food & Rural Affairs (DEFRA)",
      notes: "",
      countryOfExport: "AD",
      rates: "",
      countryOfImport: "GB",
      exceptions: "",
      reference: "United Kingdom Customs Tariff",
      countryOfOrigin: "AD",
      scopeOfControl: "Animal products",
      applicableCodes: [
        {
          code: "C640",
          description:
            "Common Health Entry Document for Animals (CHED-A) (as set out in Part 2, Section A of Annex II to Commission Implementing Regulation (EU) 2019/1715 (OJ L 261))",
        },
        {
          code: "C084",
          description:
            "Exemption by virtue of Articles 3 and 4 of regulation 2019/2122 (animals intended for scientific purposes, research and diagnostic samples)",
        },
      ],
      nonApplicableCodes: [],
      footnotes: [
        {
          code: "CD625",
          description:
            "The entry into free circulation of live animals is subject to the presentation of a Common Health Entry Document for live animals (CHED-A) in accordance with the conditions laid down in article 40 of the Commission Implementing Regulation (EU) 2019/1715 of 30 September 2019 laying down rules for the functioning of the information management system for official controls and its system components ('the IMSOC Regulation').",
        },
        {
          code: "CD737",
          description:
            "Articles 3 and 4 of the Commission Delegated Regulation (EU) 2019/2122 establishes that some animals intended for scientific purposes and all the research and diagnostic samples, if authorised by the competent authority of the Member State of destination, shall be exempted from official controls at border control posts.",
        },
      ],
      controlType: "Import Certificate",
      hscode: "01",
    },
    {
      controllingAuthority: "HM Revenue & Customs (HMRC)",
      notes: "",
      countryOfExport: "AD",
      rates: "",
      countryOfImport: "GB",
      exceptions: "",
      reference: "United Kingdom Customs Tariff",
      countryOfOrigin: "AD",
      scopeOfControl: "Invasive Alien Species",
      applicableCodes: [
        {
          code: "C065",
          description:
            "Permit for invasive alien species in accordance with Art. 8 of Regulation (EU) 1143/2014",
        },
      ],
      nonApplicableCodes: [
        {
          code: "Y942",
          description:
            "The declared goods are not concerned by Commission Implementing Regulation (EU) 2016/1141",
        },
      ],
      footnotes: [
        {
          code: "CD679",
          description:
            'If the declared goods refer to one of the species described in the "IS" footnote linked to the measure or derive from an alien invasive species described in the latter footnote, a permit must be presented by virtue of Article 8 of Regulation (UE) No 1143/2014.',
        },
        {
          code: "IS004",
          description: "Vespa velutina nigrithorax",
        },
      ],
      controlType: "Import Certificate",
      hscode: "01",
    },
  ],
};

const ControlDetails = React.memo(
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

const renderTradeControlItem = (item, index) => {
  return (
    <List.Item key={index}>
      <List.Item.Meta
        title={<>{item.controllingAuthority}</>}
        description={<>{item.scopeOfControl}</>}
      />
      <ControlDetails item={item} />
    </List.Item>
  );
};

const CodeArray = ({ item, arrayName }) => {
  return item[arrayName].map((c) => {
    return (
      <Descriptions bordered size="small" column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }}>
        <Descriptions.Item label="code">{c.code}</Descriptions.Item>
        <Descriptions.Item label="description">{c.description}</Descriptions.Item>
      </Descriptions>
    );
  });
};

const expandedRowRender = (r, index, indent) => {
  return (
    <Table className={styles.controlCodes}
      columns={[
        { title: "code", dataIndex: "code", key: "code", className: styles.controlCode },
        { title: "description", dataIndex: "description", key: "description", className: styles.controlDesc },
      ]}
      dataSource={r.array}
      pagination={false}
      rowKey="code"
      size="small"
    />
  );
};

const ControlItem = React.memo(
  ({ item, index }) => {
    const [data] = useState(() => [
      {
        arrayName: "Applicable Codes",
        array: item.applicableCodes,
      },
      {
        arrayName: "NonApplicable Codes",
        array: item.nonApplicableCodes,
      },
      { arrayName: "Footnotes", array: item.footnotes },
    ]);
    return (
      <Table className={styles.controlSections}
        columns={[
          {
            title: "Column",
            className: styles.sectionHeader,
            dataIndex: "arrayName",
            key: "arrayName",
          },
        ]}
        dataSource={data}
        expandable={{
          expandedRowRender,
          expandRowByClick: true,
          rowExpandable: (r) => r.array?.length > 0,
        }}
        pagination={false}
        rowKey="arrayName"
        showHeader={false}
        size="small"
      />
    );
  },
  () => true,
);

export default ({ query }) => {
  const [tradeControlsResponse, setTradeControlsResponse] = useState(); // TODO: replace it with useQuery to make the API call and get the response

  useEffect(() => {
    if (!query) return;
    const treeData = [
      {
        title: "Trade Control Compliances",
        key: "[root]",
        children: [],
        className: styles.header
      },
    ];
    treeData[0].children = DefResponse.data.map((r, index) => ({
      title: r.controllingAuthority,
      key: `[${index}]`,
      children: [{ title: <ControlItem item={r} index={index} />, key: `[${index}]-child-0` }],
      className: styles.controllingAuthority
    }));
    setTradeControlsResponse(treeData);
  }, [query]);

  if (!tradeControlsResponse) return null;

  return (
    <Tree className={styles.tradeControls}
      showLine
      switcherIcon={<DownOutlined />}
      defaultExpandedKeys={["[root]", "[0]"]}
      treeData={tradeControlsResponse}
    />
  );
};
