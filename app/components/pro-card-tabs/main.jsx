import React, { Suspense, useCallback, useEffect, useId, useState } from "react";
import { useUnmount } from "ahooks";
import { useSnapshot } from "valtio";
import getTabsState, { deleteState as deleteTabsState } from "./tabsState.client";
import LoadInProgress from "../load-in-progress";

const ProCard = React.lazy(
  () => import(/* webpackChunkName: "antPCard", webpackPreload: true */ "@ant-design/pro-card"),
);

const Tabs = ({ className, tabsState, setActiveKey, size, onAddRemoveTab }) => {
  const tabItemsSnap = useSnapshot(tabsState);
  const [itemslength] = useState(tabItemsSnap.array.length); // needed to track the array and re-render when tabs are removed, since we are not using tabItemsSnap.array below
  return (
    <Suspense fallback={<LoadInProgress tip="Preparing Tabs..." />}>
      <ProCard
        className={className}
        size={size}
        tabs={{
          hideAdd: true,
          type: "editable-card",
          activeKey: tabItemsSnap.activeKey,
          onChange: setActiveKey,
          onEdit: onAddRemoveTab,
          items: tabsState.array, // do NOT use tabItemsSnap here, AntD has some bug with items[]
        }}
      />
    </Suspense>
  );
};

/**
 * @param newTabKey a unique string. Changing this will add a new Tab (or bring existing Tab to focus).
 * @param TabComponent the React Component that the new tab should display in its body
 */
export default React.memo(
  ({
    newTabKey,
    className,
    TabComponent,
    onTabsEdited = () => {}, // tabs added, removed or activated
    size = "default",
    ...otherProps
  }) => {
    const tabsStateUniqueId = useId();
    const [tabsState] = useState(() => getTabsState(tabsStateUniqueId)); // acquire a new proxy state

    const setActiveKey = useCallback((targetKey) => {
      tabsState.setActiveKey(targetKey);
      onTabsEdited(targetKey, "activated");
    }, []);
    const onAddRemoveTab = useCallback((targetKey, action) => {
      if (action !== "add") tabsState.removeTab(targetKey);
      onTabsEdited(targetKey, action);
    }, []);

    useEffect(() => {
      // add a new Tab whenever the key changes
      if (!newTabKey) return;
      tabsState.addTab({ tabKey: newTabKey, TabComponent, ...otherProps });
    }, [newTabKey]);

    useUnmount(() => {
      // cleanup the state when unmounting
      deleteTabsState(tabsStateUniqueId);
    });

    return (
      <Tabs
        className={className}
        onAddRemoveTab={onAddRemoveTab}
        setActiveKey={setActiveKey}
        size={size}
        tabsState={tabsState}
      />
    );
  },
  (prevProps, nextProps) => prevProps.newTabKey == nextProps.newTabKey,
);
