import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Alert, AutoComplete, Button, Form, Input, Space } from "antd";

import * as lei from "../../../../../services/lei/index.client";
import { db } from "../../../../../utils/db.server";

import "./style.css";

export async function action({ request }) {
  db.org.create();
  console.log("request: ", request);
}

const { Search } = Input;

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function useLEI(id) {
  return useQuery({
    queryKey: ["lei", id],
    queryFn: () => lei.getRecord(id),
    enabled: !!id,
    retry: false,
    retryOnMount: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
}

function useLEI2(queryText) {
  return useQuery({
    queryKey: ["lei-auto-complete", queryText, "fulltext"],
    queryFn: () => lei.getAutoCompletions(queryText),
    enabled: !!queryText,
    retry: false,
    retryOnMount: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
}

const AutoCompleteResults = ({ data }) => {
  return data?.map((d, index) => <div dangerouslySetInnerHTML={{ __html: d.attributes.highlighting }} key={index} />);
};

export default React.memo(
  (props) => {
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState();
    const { data, isFetching, error } = useLEI2(searchText);

    const options = data?.map((d, index) => ({
      value: d.attributes.value,
      label: <div dangerouslySetInnerHTML={{ __html: d.attributes.highlighting }} key={index} />,
    }));

    return (
      <>
        <AutoComplete
          options={options}
          style={{ width: 200 }}
          onSelect={(d) => console.log("selected: ", d)}
          onSearch={(text) => {
            if (text.length >= 3) setSearchText(text);
          }}
          placeholder="input here"
        />
        <AutoCompleteResults data={data} />

        <Form
          id="org-add-new"
          form={form}
          className="mx-auto p-4"
          // labelCol={{ span: 4, }}
          // wrapperCol={{ span: 14, }}
          style={{ maxWidth: "40rem" }}
          initialValues={{}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="GLEIF ID" name="lei">
            <Search
              data-augmented-ui="tr-clip"
              disabled={isFetching}
              enterButton="Lookup"
              loading={isFetching}
              onSearch={(value, _e, info) => setSearchText(value)}
              placeholder="Enter the Org's LEI"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
            <Button type="primary" data-augmented-ui="tl-clip br-clip">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div>
          {error && (
            <Space direction="vertical">
              <Alert
                message={searchText}
                description={error.response?.status == "404" ? "No Records Found" : error.message}
                type="warning"
              />
            </Space>
          )}
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      </>
    );
  },
  () => true
);
