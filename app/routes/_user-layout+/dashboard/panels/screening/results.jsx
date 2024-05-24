import React, { Suspense, useState } from "react";
import LoadInProgress from "../../../../../components/load-in-progress";

import styles from "./style.module.css";

const QueryTypeMap = {
  hsClassification: React.lazy(() => import("./results-hsClassify")),
  hsValidation: React.lazy(() => import("./results-hsValidate")),
  tradeControls: React.lazy(() => import("./results-tradeControls")),
  sanctions: React.lazy(() => import("./results-sanctions")),
};

export default ({ queryType, screeningQuery }) => {
  const [ResultsScreen] = useState(() => QueryTypeMap[queryType]);
  return (
    <div className={styles.screeningResults}>
      <Suspense fallback={<LoadInProgress />}>
        <ResultsScreen query={screeningQuery} />
      </Suspense>
    </div>
  );
};
