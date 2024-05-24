import React, { useEffect, useState } from "react";
import { useDebounce } from "ahooks";
import { useQuery } from "@tanstack/react-query";
import { Alert, AutoComplete, Form, Input, Space } from "antd";

import * as lei from "../../../../../services/lei/index.client";

import styles from "./style-search.module.css";

const isValidLEIRecord = (r) => r.relationships?.["lei-records"]?.data?.id;

const filterACQueryResults = (acQuery, fuzzyQuery) => {
  const filteredACQueryData = acQuery.data.filter(isValidLEIRecord).slice(0, 5);
  const filteredACNames = filteredACQueryData.map((r) => r.attributes.value);
  const filteredFuzzyQueryData = fuzzyQuery.data
    .filter((r) => isValidLEIRecord(r) && !filteredACNames.includes(r.attributes.value))
    .slice(0, 5);

  return { autoCompletions: filteredACQueryData, fuzzyCompletions: filteredFuzzyQueryData };
};

function useLEIAutoComplete(queryText, searchType = "fulltext") {
  const acQuery = useQuery({
    queryKey: ["lei-auto-complete", queryText, searchType],
    queryFn: () => lei.getAutoCompletions(queryText),
    enabled: !!queryText,
    retry: false,
    retryOnMount: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: 12 * 60 * 60 * 1000, // 12hours
  });
  const fuzzyQuery = useQuery({
    queryKey: ["lei-fuzzy-complete", queryText, searchType],
    queryFn: () => lei.getFuzzyCompletions(queryText),
    enabled: !!queryText,
    retry: false,
    retryOnMount: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: 12 * 60 * 60 * 1000, // 12hours
  });
  const isFetching = acQuery.isFetching || fuzzyQuery.isFetching;
  const error = acQuery.error || fuzzyQuery.error;
  return {
    data: !queryText || queryText.length <= 0 || isFetching || error ? null : filterACQueryResults(acQuery, fuzzyQuery),
    error,
    isFetching,
  };
}

export default React.memo(
  ({ onSelect }) => {
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState();
    const debouncedSearchText = useDebounce(searchText, { wait: 300 });
    const { data, isFetching, error } = useLEIAutoComplete(debouncedSearchText);
    const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);

    useEffect(() => {
      if (isFetching) return;
      if (error || !data) {
        setAutoCompleteOptions([]);
        return;
      }
      setAutoCompleteOptions([
        {
          label: `Suggestions (${data.autoCompletions.length} results)`,
          options: data.autoCompletions.map((d, index) => ({
            id: isValidLEIRecord(d),
            value: d.attributes.value,
            label: <div dangerouslySetInnerHTML={{ __html: d.attributes.highlighting }} />,
            key: d.attributes.value + Math.random(),
          })),
        },
        {
          label: `Or Did you Mean... (${data.fuzzyCompletions.length} results)`,
          options: data.fuzzyCompletions.map((d, index) => ({
            id: isValidLEIRecord(d),
            value: d.attributes.value,
            label: d.attributes.value,
            key: d.attributes.value + Math.random(),
          })),
        },
      ]);
    }, [isFetching, debouncedSearchText]);

    return (
      <div className={styles.searchBar} data-augmented-ui="br-clip border">
        Search <span className={styles.highlight}>LEI Records</span>
        <Form form={form} className="mx-auto p-4" initialValues={{}} autoComplete="off">
          <Form.Item name="lei">
            <AutoComplete
              options={autoCompleteOptions}
              onSelect={onSelect}
              onSearch={setSearchText}
              placeholder="Start typing a name here..."
            >
              <Input.Search disabled={isFetching} enterButton="Lookup" loading={isFetching} />
            </AutoComplete>
          </Form.Item>
          {error && (
            <Space direction="vertical">
              <Alert
                description={error.response?.status == "404" ? "No Records Found" : error.message}
                type="error"
                showIcon
              />
            </Space>
          )}
        </Form>
      </div>
    );
  },
  () => true
);
