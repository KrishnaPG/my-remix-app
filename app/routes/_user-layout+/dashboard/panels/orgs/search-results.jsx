import React, { useEffect } from "react";
import { Tabs } from "antd";
import { useSnapshot } from "valtio";

import CompanyProfile from "./company-profile";
import tabsState from "./search-results-tabState";

import styles from "./style-search.module.css";

const setActiveKey = (targetKey) => tabsState.setActiveKey(targetKey);
const onAddRemoveTab = (targetKey, action) => action !== "add" && tabsState.removeTab(targetKey);

export default React.memo(
  ({ orgId }) => {
    const tabItemsSnap = useSnapshot(tabsState);

    useEffect(() => {
      if (!orgId) return;
      tabsState.addTab(orgId, CompanyProfile);
    }, [orgId]);

    if (!orgId) return;
    return (
      <div className={styles.searchResults}>
        <Tabs
          type="editable-card"
          items={tabItemsSnap.array}
          hideAdd={true}
          activeKey={tabItemsSnap.activeKey}
          onChange={setActiveKey}
          onEdit={onAddRemoveTab}
        />
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.orgId == nextProps.orgId
);
