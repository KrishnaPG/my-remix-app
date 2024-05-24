import React, { Suspense, useCallback, useRef, useEffect, useState } from "react";
import { useAsyncEffect, useMount, useSafeState } from "ahooks";
import { Button, Space, Table } from "antd";
import { useDebouncedCallback } from "use-debounce";
import { proxy, subscribe, useSnapshot } from "valtio";

import { triggerPanelShowPaymentApp } from "../index.client";
import LoadInProgress from "../../../../../components/load-in-progress";

import styles from "./style-result-list.module.css";

const ProTable = React.lazy(() => import("@ant-design/pro-table"));

// to achieve scrollTo we need to know when the lazy-load components are fully loaded in the layout
const pRCLazyLoad = () => Promise.all([import("./result-card")]).then(([rcModule]) => ({ rcModule }));
const ResultCard = React.lazy(() => pRCLazyLoad().then(({ rcModule }) => rcModule));

const TableAlertRender = ({ selectedRowKeys, selectedRows, onCleanSelected }) => {
  return (
    <div className={styles.selectionAlert}>
      Selected: <span className={styles.count}>{selectedRowKeys.length}</span> Flag(s)
    </div>
  );
};
const TableAlertOptionRender = ({ selectedRowKeys, selectedRows, onCleanSelected }) => {
  return (
    <Space>
      <Button type="link" onClick={onCleanSelected} disabled={!selectedRowKeys.length} title="Clear Selection">
        Clear
      </Button>
    </Space>
  );
};

const resultValueEnums = {
  Pass: { text: "Pass", status: "Success" },
  Fail: { text: "Fail", status: "Fail" },
  Warn: { text: "Warn", status: "Error" },
};
const categoryValueEnums = {
  Buyer: { text: "Buyer", status: "Buyer" },
  Seller: { text: "Seller", status: "Seller" },
  Transaction: { text: "Transaction", status: "Transaction" },
  Port: { text: "Port", status: "Port" },
  BL: { text: "Bill of Lading", status: "BL" },
  ShipRoute: { text: "Ship Route", status: "ShipRoute" },
};

const _ResultList = ({ record, scrollTo }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const rowSelection = {
    alwaysShowAlert: true,
    preserveSelectedRowKeys: true,
    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
    selectedRowKeys,
    onChange: (keys) => setSelectedRowKeys(keys),
  };

  const [filterObj, setFilterObj] = useState({});
  const [filteredFR, setFilteredFR] = useState([]);
  useEffect(() => {
    setFilteredFR(
      Object.values(record.flagResults).filter((fr, index) => {
        if (filterObj.category && fr.category !== filterObj.category) return false;
        if (filterObj.result?.length) return filterObj.result.includes(fr.result);
        return true;
      })
    );
  }, [filterObj]);
  const resetFilterObj = useCallback(() => setFilterObj({}), []);

  const [flagsColumnState] = useState(
    proxy({
      hasLazyChildrenLoaded: false,
      lazyLoadDoneFn: undefined,
      renderFn: () => <div>RenderFn Not Yet Initialized</div>,
      setChildLoaded() {
        this.hasLazyChildrenLoaded = true;
      },
    })
  );

  const actionRef = useRef();
  const formRef = useRef();
  const containerRef = useRef();

  const scrollToFn = useCallback(() => {
    // mark the children as loaded (so that lazyLoadDoneFn can be adjusted in useEffect hook below,
    // which prevents the scrollTo being called again when filters are applied and the child nodes
    // are mounted back)
    flagsColumnState.setChildLoaded();
    //scroll to the required row
    const el = containerRef.current.querySelector(`[data-row-key="${scrollTo}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }, []);
  const debouncedScrollToFn = useDebouncedCallback(scrollToFn, 350);

  useEffect(() => {
    // if nothing to scrollTo then no need to set the lazyLoadDoneFn below
    if (!scrollTo) return;
    flagsColumnState.lazyLoadDoneFn = flagsColumnState.hasLazyChildrenLoaded ? undefined : debouncedScrollToFn;
  }, [flagsColumnState.hasLazyChildrenLoaded]);

  const [columns, setColumns] = useState([]);
  useMount(() => {
    setColumns([
      {
        hideInSearch: true,
        title: "Flags",
        key: "ruleName",
        render: (val, fr) => (
          <Suspense fallback={<LoadInProgress />}>
            <ResultCard
              fr={fr}
              key={fr.ruleName}
              record={record}
              styles={styles}
              onLazyLoadDone={flagsColumnState.lazyLoadDoneFn}
            />
          </Suspense>
        ),
      },
      {
        title: "Result",
        dataIndex: "result",
        filters: true,
        filterMultiple: true,
        filterSearch: true,
        hideInTable: true,
        ellipsis: false,
        valueType: "checkbox",
        valueEnum: resultValueEnums,
      },
      {
        title: "Category",
        dataIndex: "category",
        filters: true,
        filterMultiple: true,
        filterSearch: true,
        hideInTable: true,
        ellipsis: false,
        valueType: "select",
        valueEnum: categoryValueEnums,
      },
    ]);
  });

  return (
    <div className={`m-4 ${styles.flagResults}`} ref={containerRef}>
      <ProTable
        actionRef={actionRef}
        cardBordered
        className={styles.flagResultsTable}
        columns={columns}
        dataSource={filteredFR}
        dateFormatter="string"
        editable={{
          type: "multiple",
        }}
        formRef={formRef}
        headerTitle={
          <div data-augmented-ui=" br-clip border">
            <a href="#" className={styles.idLink} onClick={() => triggerPanelShowPaymentApp(record)}>
              {record.ApplicationNo}
            </a>
            : <span className={styles.status}>Flag Results</span>
          </div>
        }
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        onSubmit={setFilterObj}
        onReset={resetFilterObj}
        pagination={false}
        rowKey="ruleName"
        rowSelection={rowSelection}
        revalidateOnFocus={false}
        search={{
          filterType: "query",
          labelWidth: "auto",
          searchText: "Filter",
        }}
        tableAlertRender={TableAlertRender}
        tableAlertOptionRender={TableAlertOptionRender}
        // toolBarRender={() => [
        //   <Suspense fallback={<LoadInProgress />}>
        //     <ResultCard fr={fr} key={fr.ruleName} record={record} styles={styles} />
        //   </Suspense>,
        // ]}
      />
    </div>
  );
};

export default React.memo(_ResultList, () => true);
