import React, { Suspense, useCallback, useEffect, useState } from "react";

import { db } from "../../../../../utils/db.server";
import LoadInProgress from "../../../../../components/load-in-progress";

import styles from "./style-search.module.css";

const SearchBar = React.lazy(() => import("./search-bar"));
const SearchResults = React.lazy(() => import("./search-results"));

export async function action({ request }) {
  db.org.create();
  console.log("request: ", request);
}

const searchModeOptions = {
  FindLEIs: {
    label: "Find LEIs",
    tip: "Search in LEI, Names, BIC, Addresses...",
  },
  FindChildren: {
    label: "Who is Owned by",
    tip: "Find children of this legal entity",
  },
  FindParent: {
    label: "Who Owns",
    tip: "Find parent entities of this legal entity",
  },
};

const SearchMode = ({ onSelect }) => (
  <Select defaultValue="FindLEIs" popupMatchSelectWidth={false} onSelect={onSelect}>
    {Object.keys(searchModeOptions).map((key) => (
      <Option value={key} key={key}>
        {searchModeOptions[key].label}
      </Option>
    ))}
  </Select>
);

export default React.memo(
  (props) => {
    const [selectedOrgId, setSelectedOrgId] = useState();
    const onSelectFn = useCallback((value, option) => setSelectedOrgId(option.id), []);

    return (
      <div className={styles.searchPage}>
        <SearchBar onSelect={onSelectFn} />
        <SearchResults orgId={selectedOrgId} />
      </div>
    );
  },
  () => true
);