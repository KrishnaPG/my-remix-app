// import { proxy } from "valtio";

// const tabsState = proxy({
//   itemsObj: {},
//   activeKey: null,
//   get array() {
//     return Object.values(this.itemsObj);
//   },
//   addTab(tabKey, TabComponent, label) {
//     if (!this.itemsObj[tabKey]) {
//       this.itemsObj[tabKey] = {
//         label: label || tabKey,
//         children: <TabComponent tabKey={tabKey} tabsState={this} />,
//         key: tabKey,
//       };
//     }
//     this.activeKey = tabKey; // bring it into focus
//   },
//   removeTab(targetKey) {
//     const itemsArray = Object.values(this.itemsObj);
//     const arrayIndex = itemsArray.findIndex((t) => t.key == targetKey);
//     if (targetKey === this.activeKey) {
//       if (arrayIndex == itemsArray.length - 1) {
//         if (arrayIndex == 0) this.activeKey = null;
//         else this.activeKey = itemsArray[arrayIndex - 1].key;
//       } else this.activeKey = itemsArray[arrayIndex + 1].key;
//     }
//     delete this.itemsObj[targetKey];
//   },
//   setLabel(tabKey, label) {
//     if (!this.itemsObj[tabKey]) return;
//     this.itemsObj[tabKey].label = label;
//   },
//   setActiveKey(key) {
//     this.activeKey = key;
//   },
// });
import getTabsState from "../../../../../components/pro-card-tabs/tabsState.client";

const tabsState = getTabsState("orgs-search-results-tabs");
export default tabsState;