import React, { Suspense } from "react";
import { useMount, useToggle } from "ahooks";

import {
  BuyerSellerRelation,
  CheckForDualUseGoods,
  CheckPriceRange,
  IsBuyerValid,
  IsBuyerSanctioned,
  IsSellerValid,
  IsSellerSanctioned,
  IsSellerLocationSanctioned,
  IsShipRouteSanctioned,
  VerifyPortOfLoading,
  VerifyBuyerProfile,
  VerifySellerProfile,
  Empty,
} from "./result-details";
import { PassFailWarn, StatusText } from "../../../../../components/pass-fail-warn";
import LoadInProgress from "../../../../../components/load-in-progress";

const Anchor = React.lazy(() => import("lucide-react/dist/esm/icons/anchor/"));
const Building = React.lazy(() => import("lucide-react/dist/esm/icons/building"));
const Invoice = React.lazy(() => import("lucide-react/dist/esm/icons/receipt"));
const Ship = React.lazy(() => import("lucide-react/dist/esm/icons/ship"));
const ShipWheel = React.lazy(() => import("lucide-react/dist/esm/icons/ship-wheel"));
const Store = React.lazy(() => import("lucide-react/dist/esm/icons/store"));

const TitledFolderBox = React.lazy(() => import("../../../../../components/titled-folder-box"));

const categoryIcons = {
  BL: <Ship absoluteStrokeWidth={true} />,
  Buyer: <Building absoluteStrokeWidth={true} />,
  Transaction: <Invoice absoluteStrokeWidth={true} />,
  Port: <Anchor absoluteStrokeWidth={true} />,
  Seller: <Store absoluteStrokeWidth={true} />,
  ShipRoute: <ShipWheel absoluteStrokeWidth={true} />,
};

const resultDetailsComp = {
  "B1.1": React.memo(IsBuyerValid, () => true),
  "B1.2": React.memo(IsBuyerSanctioned, () => true),
  "B1.3": React.memo(IsBuyerSanctioned, () => true),
  "BL2.1": React.memo(VerifyPortOfLoading, () => true),
  R1: React.memo(IsShipRouteSanctioned, () => true),
  "S1.1": React.memo(IsSellerValid, () => true),
  "S1.2": React.memo(IsSellerSanctioned, () => true),
  "S1.3": React.memo(IsSellerLocationSanctioned, () => true),
  "T1.1": React.memo(VerifyBuyerProfile, () => true),
  "T1.2": React.memo(VerifySellerProfile, () => true),
  T2: React.memo(CheckForDualUseGoods, () => true),
  T3: React.memo(CheckPriceRange, () => true),
  T4: React.memo(BuyerSellerRelation, () => true),
};
const ResultDetails = React.memo(
  ({ fr, record }) => {
    const Comp = resultDetailsComp[fr.ruleName] || Empty;
    return (
      <Suspense fallback={<LoadInProgress />}>
        <Comp fr={fr} record={record} />
      </Suspense>
    );
  },
  () => true
);

const LazyLoadDoneSignaler = ({ onLazyLoadDone = () => {} }) => {
  useMount(onLazyLoadDone);
  return <></>;
};

const _ResultCard = ({ fr, record, styles, onLazyLoadDone }) => {
  const [isExpanded, { toggle }] = useToggle(false);
  return (
    <Suspense fallback={<LoadInProgress />}>
      <TitledFolderBox
        className={`${styles.resultCard} ${styles[fr.result]}`}
        contentBarOptions={{
          className: `grid grid-cols-12 ${styles.container} ${isExpanded ? styles.expanded : ""}`,
          "data-augmented-ui": "br-clip border",
        }}
        title={
          <>
            <StatusText
              className="mr-4"
              iconClass={styles.glowIcon}
              icon={<Suspense fallback={<LoadInProgress />}>{categoryIcons[fr.category]}</Suspense>}
            />
            {fr.ruleName}
            <div className={styles.match}>{fr.match}% Conf.</div>
          </>
        }
        titleClass={styles.rule}
      >
        <div className={`col-span-12 flex p-4 ${styles.header}`} onClick={toggle}>
          <div className={`flex-grow w-full ${styles.notes}`}>{fr.notes}</div>
          <div className={`flex-none justify-center ${styles.result}`}>
            <PassFailWarn result={fr.result} />
          </div>
        </div>
        <div className={"col-span-12 " + styles.details}>
          <div>
            <div className="px-4">
              <ResultDetails fr={fr} record={record} />
            </div>
          </div>
        </div>
        <LazyLoadDoneSignaler onLazyLoadDone={onLazyLoadDone} />
      </TitledFolderBox>
    </Suspense>
  );
};

export default React.memo(_ResultCard, () => true);
