import { proxy } from "valtio";

// Allows Tabs management for a Tabs control (to add, delete, rename etc.)
class TabsState {
  itemsObj = {};
  activeKey = null;

  get array() {
    return Object.values(this.itemsObj);
  }

  addTab({ tabKey, TabComponent, label, ...otherProps }) {
    if (!this.itemsObj[tabKey]) {
      this.itemsObj[tabKey] = {
        label: label || tabKey,
        children: <TabComponent tabKey={tabKey} tabsState={this} {...otherProps} />,
        key: tabKey,
      };
    }
    this.activeKey = tabKey; // bring it into focus
  }

  removeTab(targetKey) {
    const itemsArray = Object.values(this.itemsObj);
    const arrayIndex = itemsArray.findIndex((t) => t.key == targetKey);
    if (targetKey === this.activeKey) {
      if (arrayIndex == itemsArray.length - 1) {
        if (arrayIndex == 0) this.activeKey = null;
        else this.activeKey = itemsArray[arrayIndex - 1].key;
      } else this.activeKey = itemsArray[arrayIndex + 1].key;
    }
    delete this.itemsObj[targetKey];
  }

  setLabel(tabKey, label) {
    if (!this.itemsObj[tabKey]) return;
    this.itemsObj[tabKey].label = label;
  }

  setActiveKey(key) {
    this.activeKey = key;
  }
};

const instances = {};

export function deleteState(tabsRefId) {
  delete instances[tabsRefId];
}

// returns the state associated with a Tabs control. Creates new if non-existent.
// @param tabsRefId any string that uniquely represents the Tabs control
export default (tabsRefId) => {
  const stateInstance = instances[tabsRefId];
  if (stateInstance) return stateInstance;
  return instances[tabsRefId] = proxy(new TabsState());
}