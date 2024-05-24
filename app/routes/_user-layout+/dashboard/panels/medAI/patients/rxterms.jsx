import React, {Suspense, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { AutoComplete, Button, Col, Input, Row, Select, Space, Tooltip } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useDebounce, useMount, useUnmount } from "ahooks";
import LoadInProgress from "../../../../../../components/load-in-progress";

import styles from "./styles.rxterms.module.css";

const ProCard = React.lazy(
  () => import(/* webpackChunkName: "antPCard", webpackPreload: true */ "@ant-design/pro-card"),
);

function useRxTermsAutoComplete(queryText) {
  const queryResult = useQuery({
    queryKey: ["rxTerms-auto-complete", queryText],
    queryFn: () =>
      axios
        .get(
          `https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?ef=STRENGTHS_AND_FORMS,RXCUIS&authenticity_token=&terms=${encodeURIComponent(
            queryText,
          )}`,
        )
        .then((response) => response.data),
    enabled: !!queryText,
    retry: false,
    retryOnMount: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: 12 * 60 * 60 * 1000, // 12hours
  });
  if (!queryText || !queryText.length) return { data: null, isFetching: false, error: null };
  return queryResult;
}

const transformRxACData = (data) => {
  const RxCUIs = data[2].RXCUIS;
  const Strengths = data[2].STRENGTHS_AND_FORMS;
  return data[1].map((rxTerm, index) => ({
    rxCUI: RxCUIs[index][0],
    value: rxTerm,
    label: rxTerm,
    key: RxCUIs[index][0],
    strengths: Strengths[index].map((s) => ({ label: s, value: s })),
  }));
};

/**
 * Ref: https://ant.design/components/auto-complete#api
 */
export const AutoCompleteField = React.memo(
  ({
    inputText,
    onSelect,
    debounceOptions = { wait: 300 },
    acCtrlOptions = { placeholder: "Start typing a name here..." },
    inputCtrlOptions = {},
    transformDataFn = (x) => x,
    useAutoCompleteFn = (queryText) => ({ data: null, isFetching: false, error: null }),
    ErrorComponent = null,
    clearEv /** JS Event to trigger clear events from parent  */,
  }) => {
    const [searchText, setSearchText] = useState(inputText);
    const debouncedSearchText = useDebounce(searchText, debounceOptions);
    const { data, isFetching, error } = useAutoCompleteFn(debouncedSearchText);
    const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);

    useEffect(() => {
      if (isFetching) return;
      if (error || !data) {
        setAutoCompleteOptions([]);
        return;
      }
      setAutoCompleteOptions(transformDataFn(data));
    }, [isFetching, debouncedSearchText]);

    /** acText is what is shown in the control (useful for clearing the control).
     * Not same as searchText, which is what the user entered for search;
     * E.g: searchText: "dop", acText: "dopamine"
     * */
    const [acText, setACText] = useState(inputText);
    /** acTextChangedCB: triggered whenever user changes the text in the auto-complete control */
    const acTextChangedCB = useCallback((text) => {
      setACText(text);
      onSelect(null, null); // tell the parent that the last selected item is no more valid (and being edited)
    }, []);
    /** clearCB: triggered whenever the "clear" event is raised */
    const clearCB = useCallback(() => {
      acTextChangedCB(null);
      setSearchText(null);
    }, []);

    useMount(() => clearEv && clearEv.addEventListener("clear", clearCB));
    useUnmount(() => clearEv && clearEv.removeEventListener("clear", clearCB));

    return (
      <>
        <AutoComplete
          value={acText}
          onChange={acTextChangedCB}
          allowClear={false}
          onSelect={onSelect}
          onSearch={setSearchText}
          options={autoCompleteOptions}
          popupMatchSelectWidth={true}
          {...acCtrlOptions}
        >
          <Input.Search {...inputCtrlOptions} disabled={isFetching} loading={isFetching} />
        </AutoComplete>
        {error && ErrorComponent}
      </>
    );
  },
  () => true,
);

const DosageSelector = ({ value, onSelect, strengthOptions }) => {
  /** this is what is shown in the control (useful for clearing the control) */
  const [selectedValue, setSelectedValue] = useState(value);
  /** whenever the input value is changed from prop, update our local content */
  useEffect(() => setSelectedValue(value), [value]);

  return (
    <Select
      value={selectedValue}
      options={strengthOptions}
      popupMatchSelectWidth={false}
      onChange={onSelect}
    />
  );
};

const DrugSearchBar = ({ onSubmit = ({ drug, dosage }) => { }, onClear = () => { } }) => {
  const [selectedDrug, setSelectedDrug] = useState();
  const [selectedRxCUI, setSelectedRxCUI] = useState();
  const [strengthOptions, setStregthOptions] = useState([]);
  const [selectedDosage, setSelectedDosage] = useState();
  const populateStrengthsCB = useCallback((value, option) => {
    setSelectedDrug(value);
    setSelectedRxCUI(option?.rxCUI);
    setStregthOptions(option?.strengths || []);
    setSelectedDosage(null);
  }, []);
  const onSubmitCB = useCallback(
    () => onSubmit({ drug: selectedDrug, dosage: selectedDosage, rxCUI: selectedRxCUI }),
    [selectedDrug, selectedDosage],
  );
  const [clearEv] = useState(() => new EventTarget());
  const clearCB = useCallback(() => { clearEv.dispatchEvent(new Event("clear")); onClear(); }, []);
  return (
    <ProCard className={styles.drugSearchBar} layout="center">
      <Row gutter={[8, 8]} className="w-full">
        <Col
          lg={{ span: 10, order: 1 }}
          xs={{ span: 24, order: 1 }}
          className={`${styles.drugName} px-16 lg:px-8`}
        >
          <span className={styles.label}>Drug Name:</span>
          <AutoCompleteField
            onSelect={
              populateStrengthsCB /** when auto-complete drug is entered, populate the dosages select box */
            }
            useAutoCompleteFn={useRxTermsAutoComplete}
            transformDataFn={transformRxACData}
            ErrorComponent={null}
            clearEv={clearEv}
          />
        </Col>
        <Col
          lg={{ span: 10, order: 2 }}
          xs={{ span: 24, order: 2 }}
          className={`${styles.drugStrength} px-16 lg:px-8`}
        >
          <span className={styles.label}>Strength: </span>
          <DosageSelector
            value={selectedDosage}
            onSelect={setSelectedDosage}
            strengthOptions={strengthOptions}
            clearEv={clearEv}
          />
        </Col>
        <Col
          lg={{ span: 4, order: 3 }}
          xs={{ span: 24, order: 3 }}
          className={`${styles.actions} px-16 lg:px-8`}
        >
          <Tooltip title="Submit">
            <Button
              disabled={!selectedDrug || !selectedDosage}
              type="link"
              shape="circle"
              icon={<CheckOutlined />}
              size="large"
              onClick={onSubmitCB}
            />
          </Tooltip>
          <Tooltip title="Clear">
            <Button
              disabled={!selectedDrug && !selectedDosage}
              type="link"
              icon={<CloseOutlined />}
              size="large"
              onClick={clearCB}
            />
          </Tooltip>
        </Col>
      </Row>
    </ProCard>
  );
};

/**
 * RxTerms controls to enter the Prescription Medicines
 * The API is available at: https://clinicaltables.nlm.nih.gov/
 * Example: https://embed.plnkr.co/ribBnsyc3senibgXrRlg?show=index.html,preview&sidebar=false
 */
export default ({ onSubmit = ({ drug, dosage, rxCUI }) => { }, onClear = () => { } }) => {
  return <Suspense fallback={<LoadInProgress />}><DrugSearchBar onSubmit={onSubmit} onClear={onClear}/></Suspense>;
};
