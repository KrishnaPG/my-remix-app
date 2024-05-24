import React, { Suspense, useCallback, useMemo, useState } from "react";
import { Tabs } from "antd";
import { ProCard } from "@ant-design/pro-card";
import { createForm, onFormValuesChange } from "@formily/core";
import { FormButtonGroup, Reset, Submit } from "@formily/antd-v5";

import ScreeningResults from "./results";
import LoadInProgress from "../../../../../components/load-in-progress";

import styles from "./style.module.css";

const DynamicForm = React.lazy(() => import("../../../../../components/dynamic-form"));

const hsClassifySchema = {
  type: "object",
  properties: {
    regrxaseq54: {
      type: "void",
      "x-component": "FormGrid",
      "x-validator": [],
      "x-component-props": {
        maxColumns: 3,
      },
      "x-designable-id": "regrxaseq54",
      "x-index": 0,
      properties: {
        productTitle: {
          type: "string",
          title: "Product Title",
          "x-decorator": "FormItem",
          "x-component": "Input",
          "x-validator": [],
          "x-component-props": {},
          "x-decorator-props": {},
          "x-designable-id": "x94fkf04tbu",
          "x-index": 0,
          name: "productTitle",
          description:
            "A brief and descriptive name or label assigned to a particular product to distinguish it from others in the market, generally mentioned on commercial invoices. [For example- Mens cotton polo shirt]",
          required: true,
        },
        countryOfClassification: {
          type: "string",
          title: "Country Of Classification",
          "x-decorator": "FormItem",
          "x-component": "Input",
          "x-validator": [],
          "x-component-props": {},
          "x-decorator-props": {},
          name: "countryOfClassification",
          description:
            "Refers to the country for which you need the HS codes. It can be two- or three-character ISO country code, [For example- US, GB, IN OR USA, GBR, IND etc] Note: If you need HS-6 codes, then this field is not required.",
          "x-designable-id": "7432cq9zr8j",
          "x-index": 1,
        },
        tradeDirection: {
          type: "string | number",
          title: "Trade Direction",
          "x-decorator": "FormItem",
          "x-component": "Radio.Group",
          enum: [
            {
              label: "Import",
              value: "import",
            },
            {
              label: "Export",
              value: "export",
            },
          ],
          "x-validator": [],
          "x-component-props": {
            optionType: "default",
            buttonStyle: "outline",
          },
          "x-decorator-props": {},
          name: "tradeDirection",
          description: "Refers to the import or export trade direction. Default value is IMPORT.",
          default: "import",
          required: true,
          "x-designable-id": "6qk3vqe6yic",
          "x-index": 2,
        },
        confidenceThreshold: {
          type: "number",
          title: "Confidence Threshold",
          "x-decorator": "FormItem",
          "x-component": "Slider",
          "x-validator": "number",
          "x-component-props": {
            min: 10,
            max: 90,
            tooltip: { open: false },
          },
          "x-decorator-props": {},
          default: 25,
          "x-designable-id": "ffnwoqp1jij",
          "x-index": 3,
          description:
            "If you need the predictions only greater than equal to certain confidence number, then you can specify the value.",
          name: "confidenceThreshold",
        },
        numberOfPredictions: {
          type: "number",
          title: "No. of Results",
          "x-decorator": "FormItem",
          "x-component": "NumberPicker",
          "x-validator": "number",
          "x-component-props": {
            min: 1,
            max: 3,
            step: 1,
          },
          "x-decorator-props": {},
          name: "numberOfPredictions",
          description:
            "If you need multiple predictions for one classification, then you can add it here (less than 3 predictions are allowed)",
          required: true,
          default: 3,
          "x-designable-id": "yr3emhkhbq8",
          "x-index": 4,
        },
      },
    },
  },
  "x-designable-id": "sln6c22umw0",
};

const hsValidateSchema = {
  type: "object",
  properties: {
    regrxaseq54: {
      type: "void",
      "x-component": "FormGrid",
      "x-validator": [],
      "x-component-props": {
        maxColumns: 3,
      },
      "x-designable-id": "regrxaseq54",
      "x-index": 0,
      properties: {
        countryIsoCode: {
          type: "string",
          title: "Country",
          "x-decorator": "FormItem",
          "x-component": "Input",
          "x-validator": [],
          "x-component-props": {},
          "x-decorator-props": {},
          name: "countryIsoCode",
          description:
            "Refers to the two- or three-digit ISO country code. For example: US, USA, IN, IND etc.",
          "x-designable-id": "7432cq9zr8j",
          "x-index": 0,
          required: true,
        },
        hscode: {
          type: "string",
          title: "HS Code",
          "x-decorator": "FormItem",
          "x-component": "Input",
          "x-validator": [],
          "x-component-props": {},
          "x-decorator-props": {},
          name: "hscode",
          description:
            "Any HS code length greater than equal to 6 or specific full HS code. Note: Country specific full HS code is recommended.",
          required: true,
          "x-designable-id": "48lwe9cowln",
          "x-index": 1,
        },
        tradeDirection: {
          type: "string | number",
          title: "Trade Direction",
          "x-decorator": "FormItem",
          "x-component": "Radio.Group",
          enum: [
            {
              label: "Import",
              value: "import",
            },
            {
              label: "Export",
              value: "export",
            },
          ],
          "x-validator": [],
          "x-component-props": {
            optionType: "default",
            buttonStyle: "outline",
          },
          "x-decorator-props": {},
          name: "tradeDirection",
          description: "Refers to the import or export trade direction. Default value is IMPORT.",
          default: "import",
          required: false,
          "x-designable-id": "6qk3vqe6yic",
          "x-index": 2,
        },
        hsSuggestions: {
          type: "boolean",
          title: "HS Suggestions",
          "x-decorator": "FormItem",
          "x-component": "Switch",
          "x-validator": [],
          "x-component-props": {},
          "x-decorator-props": {},
          name: "hsSuggestions",
          default: true,
          description:
            "Choose 'true' or 'false' for this field. We assist with HS-6 and longer codes, correcting invalid ones by trimming the last digits. Receive the accurate HS code, Duty, and VAT/GST rates. Note: The default value is 'false,' unless defined by the user.",
          "x-designable-id": "3b508lobqk4",
          "x-index": 3,
        },
      },
    },
  },
  "x-designable-id": "sln6c22umw1",
};

const tradeControlsSchema = {
  type: "object",
  properties: {
    regrxaseq54: {
      type: "void",
      "x-component": "FormGrid",
      "x-validator": [],
      "x-component-props": {
        maxColumns: 3,
      },
      "x-designable-id": "regrxaseq54",
      "x-index": 0,
      properties: {
        countryOfImport: {
          type: "string",
          title: "Country Of Import",
          "x-decorator": "FormItem",
          "x-component": "Input",
          "x-validator": [],
          "x-component-props": {},
          "x-decorator-props": {},
          name: "countryOfImport",
          description: "Two-digit ISO country code to where the goods are being imported.",
          "x-designable-id": "7432cq9zr8j",
          "x-index": 0,
          required: true,
        },
        countryOfExport: {
          type: "string",
          title: "Country Of Export",
          "x-decorator": "FormItem",
          "x-component": "Input",
          "x-validator": [],
          "x-component-props": {},
          "x-decorator-props": {},
          name: "countryOfExport",
          description: "Two-digit ISO country code from where the goods are being exported.",
          "x-designable-id": "08cqcrpk1eu",
          "x-index": 1,
          required: true,
        },
        tradeDirection: {
          type: "string | number",
          title: "Trade Direction",
          "x-decorator": "FormItem",
          "x-component": "Radio.Group",
          enum: [
            {
              label: "Import",
              value: "import",
            },
            {
              label: "Export",
              value: "export",
            },
          ],
          "x-validator": [],
          "x-component-props": {
            optionType: "default",
            buttonStyle: "outline",
          },
          "x-decorator-props": {},
          name: "tradeDirection",
          description: "Refers to the import or export trade direction. Default value is IMPORT.",
          default: "import",
          required: true,
          "x-designable-id": "6qk3vqe6yic",
          "x-index": 2,
        },
        hscode: {
          type: "string",
          title: "HS Code",
          "x-decorator": "FormItem",
          "x-component": "Input",
          "x-validator": [],
          "x-component-props": {},
          "x-decorator-props": {},
          name: "hscode",
          description: "Partial or Full-length HS Code",
          required: true,
          "x-designable-id": "48lwe9cowln",
          "x-index": 3,
        },
        hsCodeType: {
          type: "boolean",
          title: "Partial HS Code?",
          "x-decorator": "FormItem",
          "x-component": "Switch",
          "x-validator": [],
          "x-component-props": {},
          "x-decorator-props": {},
          name: "hsCodeType",
          default: false,
          description:
            "Choose 'true' if the HS Code input is Partial. Leave it as 'false' if the HS Code input is Full-length.",
          "x-designable-id": "3b508lobqk4",
          "x-index": 4,
          required: false,
        },
        countryOfOrigin: {
          type: "string",
          title: "Country Of Origin",
          "x-decorator": "FormItem",
          "x-component": "Input",
          "x-validator": [],
          "x-component-props": {},
          "x-decorator-props": {},
          name: "countryOfOrigin",
          description:
            "Two-digit ISO country code from where the goods are being originated. If none specified, countryOfExport will be used as the origin.",
          "x-designable-id": "g7nhhyejgch",
          "x-index": 5,
          required: false,
        },
      },
    },
  },
  "x-designable-id": "fm7jswewb8y",
};

const sanctionsSchema = {
  type: "object",
  properties: {
    regrxaseq54: {
      type: "void",
      "x-component": "FormGrid",
      "x-validator": [],
      "x-component-props": {
        maxColumns: 3,
      },
      "x-designable-id": "regrxaseq54",
      "x-index": 0,
      properties: {
        entityName: {
          type: "string",
          title: "Entity Name",
          "x-decorator": "FormItem",
          "x-component": "Input",
          "x-validator": [],
          "x-component-props": {},
          "x-decorator-props": {},
          name: "entityName",
          description:
            "Name of a person/company/vessel. This Field is required when searchWithAddress = FALSE",
          "x-designable-id": "7432cq9zr8j",
          "x-index": 0,
          required: false,
        },
        uid: {
          type: "string",
          title: "Uniqu Identification Number",
          "x-decorator": "FormItem",
          "x-component": "Input",
          "x-validator": [],
          "x-component-props": {},
          "x-decorator-props": {},
          name: "uid",
          description:
            "Unique ID of the person/company/vessel. This could be a passport number, company registration number, vessel IMO number, etc.",
          "x-designable-id": "08cqcrpk1eu",
          "x-index": 1,
          required: false,
        },
        country: {
          type: "string",
          title: "Country",
          "x-decorator": "FormItem",
          "x-component": "Input",
          "x-validator": [],
          "x-component-props": {},
          "x-decorator-props": {},
          name: "country",
          description: "Country of the entity.",
          required: false,
          "x-designable-id": "48lwe9cowln",
          "x-index": 2,
        },
        address: {
          type: "string",
          title: "Address",
          "x-decorator": "FormItem",
          "x-component": "Input",
          "x-validator": [],
          "x-component-props": {},
          "x-decorator-props": {},
          name: "address",
          description: "Address, City or State of the entity.",
          "x-designable-id": "g7nhhyejgch",
          "x-index": 3,
          required: false,
        },
        searchWithAddress: {
          type: "boolean",
          title: "Search with Address?",
          "x-decorator": "FormItem",
          "x-component": "Switch",
          "x-validator": [],
          "x-component-props": {},
          "x-decorator-props": {},
          name: "searchWithAddress",
          default: false,
          description:
            "When turned OFF, and the screening will be performed on the entity name, and when turned ON the screening will be performed in entity name or address.",
          "x-designable-id": "3b508lobqk4",
          "x-index": 4,
          required: false,
        },
        matchScore: {
          type: "number",
          title: "Match Score",
          "x-decorator": "FormItem",
          "x-component": "NumberPicker",
          "x-validator": [],
          "x-component-props": {
            max: 99,
            min: 10,
            step: 1,
          },
          "x-decorator-props": {},
          name: "matchScore",
          description:
            "A lower match score would increase the number of matches, and a higher match score would decrease the number of matches.",
          default: 75,
          "x-designable-id": "4fj4r06knxy",
          "x-index": 5,
        },
      },
    },
  },
  "x-designable-id": "fm7jswewb8z",
};

const _searchBar = ({ title, formSchema, onSubmit }) => {
  const formRef = useMemo(() => createForm());
  return (
    <ProCard className={styles.searchBar} title={title} headerBordered>
      <Suspense fallback={<LoadInProgress />}>
        <DynamicForm
          form={formRef}
          formProps={{
            labelCol: 0,
            wrapperCol: 0,
            layout: "vertical",
          }}
          schema={formSchema}
          extraItems={
            <FormButtonGroup align="center">
              <FormButtonGroup.FormItem>
                <Reset>Reset</Reset>
                <Submit onSubmit={onSubmit} onSubmitSuccess={() => {}} onSubmitFailed={() => {}}>
                  Submit
                </Submit>
              </FormButtonGroup.FormItem>
            </FormButtonGroup>
          }
        />
      </Suspense>
    </ProCard>
  );
};
const SearchBar = React.memo(_searchBar, () => true);

const _ScreeningTabPane = ({ title, formSchema, tabType }) => {
  const [screeningQuery, setScreeningQuery] = useState();
  return (
    <>
      <SearchBar title={title} formSchema={formSchema} onSubmit={setScreeningQuery} />
      {screeningQuery && <ScreeningResults queryType={tabType} screeningQuery={screeningQuery} />}
    </>
  );
};
const ScreeningTabPane = React.memo(_ScreeningTabPane, () => true);

const HSClassification = () => {
  return (
    <ScreeningTabPane
      title={
        <>
          HS <span className={styles.highlight}>Classification</span>
        </>
      }
      formSchema={hsClassifySchema}
      tabType="hsClassification"
    />
  );
};
const HSValidation = () => {
  return (
    <ScreeningTabPane
      title={
        <>
          HS <span className={styles.highlight}>Validation</span>
        </>
      }
      formSchema={hsValidateSchema}
      tabType="hsValidation"
    />
  );
};
const TradeControls = () => {
  return (
    <ScreeningTabPane
      title={
        <>
          Trade <span className={styles.highlight}>Controls</span>
        </>
      }
      formSchema={tradeControlsSchema}
      tabType="tradeControls"
    />
  );
};
const Sanctions = () => {
  return (
    <ScreeningTabPane
      title={
        <>
          Global <span className={styles.highlight}>Sanctions</span>
        </>
      }
      formSchema={sanctionsSchema}
      tabType="sanctions"
    />
  );
};

export default React.memo(
  (props) => {
    const [selectedOrgId, setSelectedOrgId] = useState();
    const onSelectFn = useCallback((value, option) => setSelectedOrgId(option.id), []);

    return (
      <Tabs
        tabPosition="bottom"
        className={styles.screeningPage}
        defaultActiveKey="sanctions"
        type="card"
        items={[
          {
            label: "HS Classification",
            key: "hsClassify",
            children: <HSClassification />,
          },
          {
            label: "HS Validation",
            key: "hsValidate",
            children: <HSValidation />,
          },
          {
            label: "Trade Controls",
            key: "tradeControl",
            children: <TradeControls />,
          },
          { label: "Sanctions", key: "sanctions", children: <Sanctions /> },
        ]}
      />
    );
  },
  () => true,
);
