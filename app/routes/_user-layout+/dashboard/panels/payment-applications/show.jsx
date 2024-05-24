import React, { Fragment, Suspense, useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { addDays, format } from "date-fns";

// import TitledFolderBox from "../../../../../components/titled-folder-box";
// import RequestInfoModal from "./request-info-modal";
import { triggerPanelFlagResults } from "..";
import LoadInProgress from "../../../../../components/load-in-progress";

import styles from "./style-show.module.css";
import CountryFlag from "../../../../../components/country-flag";
import HSCodeDescription from "../../../../../components/hscode";
import * as OrgService from "../../../../../services/org/index.client";

const TitledBox = React.lazy(() => import("../../../../../components/titled-box"));
const Tree = React.lazy(() => import("antd/es/tree"));
const RequestInfoModal = React.lazy(() => import("./request-info-modal"));

const getBackDate = (minusDays, startDate = Date.now()) => addDays(startDate, -minusDays);

const approvalData = (pfwStatus) => [
  {
    title: <div className={styles.header}>Approval Sequence</div>,
    key: "0-0-0",
    children: [
      {
        title: (
          <div>
            <span className={styles.action}>Reviewed</span> by <span className={styles.approver}>Analyst1</span>
            {" @ "}
            <span className={styles.timestamp}>{getBackDate(4).toLocaleString()}</span>
          </div>
        ),
        key: "0-0-0-0",
      },
      {
        title: (
          <div>
            <span className={styles.action}>Approved</span> by <span className={styles.approver}>SectionHead2</span>
            {" @ "}
            <span className={styles.timestamp}>{getBackDate(3).toLocaleString()}</span>
          </div>
        ),
        key: "0-0-0-1",
      },
      {
        title: (
          <div title={`Application marked as "${getApplicationStatusText(pfwStatus)}" by DeptHead1`}>
            <span className={styles.action}>{getApplicationStatusText(pfwStatus)}</span> by{" "}
            <span className={styles.approver}>DeptHead1</span>
            {" @ "}
            <span className={styles.timestamp}>{getBackDate(2).toLocaleString()}</span>
          </div>
        ),
        key: "0-0-0-2",
      },
    ],
  },
];

const blList = [
  {
    id: "B13231IK98",
    date: format(getBackDate(100), "dd-MMM-yy"),
    item: "Cap Body Pofb Fty Plts",
    weight: 232,
    result: "Pass",
    match: 82,
  },
  {
    id: "Z13231IO25",
    date: format(getBackDate(80), "dd-MMM-yy"),
    item: "Cosmetics",
    weight: 56,
    result: "Warn",
    match: 42,
  },
  {
    id: "D13231IQ42",
    date: format(getBackDate(60), "dd-MMM-yy"),
    item: "Fty Vial Fenty Eau Parfum Rollerbal Plts",
    weight: 85,
    result: "Fail",
    match: 28,
  },
  {
    id: "H13231IZ56",
    date: format(getBackDate(40), "dd-MMM-yy"),
    item: "Fty Cap Body Plts",
    weight: 48,
    result: "Pass",
    match: 82,
  },
];

const ApplicationDetails = ({ r }) => {
  return (
    <div className={styles["application-details"]}>
      <form className={styles.fieldSetContainer}>
        <fieldset>
          <legend data-augmented-ui="tr-clip border">Application</legend>
          <div className="grid grid-cols-4">
            <div className={`col-span-4 xl:col-span-2 grid grid-cols-3 ${styles.field} ${styles.h1}`}>
              <div className={`col-span-1 ${styles.title}`}>Application No:</div>
              <div className={`col-span-2 ${styles.value}`}>{r.ApplicationNo}</div>
            </div>
            <div className={`col-span-4 xl:col-span-2 grid grid-cols-3 ${styles.field} ${styles.h2}`}>
              <div className={`col-span-1 ${styles.title}`}>Application Date:</div>
              <div className={`col-span-2 ${styles.value}`}>
                {format(addDays(new Date(r.InvoiceDate), Math.ceil(Math.random() * 10)), "dd-MMM-yy")}
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend data-augmented-ui="tr-clip border">LC</legend>
          <div className="grid grid-cols-7">
            <div className={`col-span-7 xl:col-span-3 grid grid-cols-3 ${styles.field} ${styles.h2}`}>
              <div className={`col-span-1 ${styles.title}`}>LC No:</div>
              <div className={`col-span-2 ${styles.value}`}>6030nE0207481</div>
            </div>
            <div className={`col-span-7 xl:col-span-2 grid grid-cols-3 ${styles.field} ${styles.h3}`}>
              <div className={`col-span-1 ${styles.title}`}>LC Issue Date:</div>
              <div className={`col-span-2 ${styles.value}`}>
                {format(addDays(new Date(r.InvoiceDate), -180), "dd-MMM-yy")}
              </div>
            </div>
            <div className={`col-span-7 xl:col-span-2 grid grid-cols-3 ${styles.field} ${styles.h3}`}>
              <div className={`col-span-1 ${styles.title}`}>LC Expiry Date:</div>
              <div className={`col-span-2 ${styles.value}`}>
                {format(addDays(new Date(r.InvoiceDate), 336), "dd-MMM-yy")}
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend data-augmented-ui="tr-clip border">Invoice</legend>
          <div className="grid grid-cols-4">
            <div className={`col-span-4 xl:col-span-2 grid grid-cols-3 ${styles.field} ${styles.h2}`}>
              <div className={`col-span-1 ${styles.title}`}>Invoice No:</div>
              <div className={`col-span-2 ${styles.value}`}>7438042374</div>
            </div>
            <div className={`col-span-4 xl:col-span-2 grid grid-cols-3 ${styles.field} ${styles.h3}`}>
              <div className={`col-span-1 ${styles.title}`}>Invoice Date:</div>
              <div className={`col-span-2 ${styles.value}`}>{format(new Date(r.InvoiceDate), "dd-MMM-yy")}</div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

const ApplicationStatus = ({ r }) => {
  return (
    <div className={styles["application-status"]}>
      <Suspense fallback={<LoadInProgress />}>
        <TitledBox title="Application Status" titleClass={styles.title} contentClass={`${styles.content} ${r.Status}`}>
          <div onClick={() => triggerPanelFlagResults(r)}>{getApplicationStatusText(r.Status)}</div>
        </TitledBox>
        <Tree
          className={styles.approvalSeq}
          showLine
          switcherIcon={<DownOutlined />}
          defaultExpandedKeys={["0-0-0"]}
          selectable={false}
          treeData={approvalData(r.Status)}
        />
        {r.Status === "Warn" && (
          <Suspense fallback={<LoadInProgress />}>
            <RequestInfoModal />
          </Suspense>
        )}
      </Suspense>
    </div>
  );
}

const useCases = (uses) => [
  {
    title: <div className={styles.header}>Dual-Use</div>,
    key: "rootNode",
    children: uses?.map((usage, index) => ({
      title: (
        <div>
          <span className={styles.action}>Used</span>
          {" in "}
          <span className={styles.usage}>{usage}</span>
        </div>
      ),
      key: `usage-${index}`,
    })),
  },
];

const _DualGoodsCheck = ({r, hsCodeInferred }) => {
  const { dualUseCheck } = hsCodeInferred;
  return (
    <div className={styles["dual-use-goods-status"]}>
      <form className={styles.fieldSetContainer}>
        <fieldset>
          <legend data-augmented-ui="tl-clip border" className={styles.rtl}>
            Dual-Use-Goods Check
          </legend>
          <div className={styles.dualUseResult}>
            <div className={styles.summary}>
              <div>
                HSCode: <span className={styles.hsCode}>{hsCodeInferred.hsCode}</span>
              </div>
              <span className={styles.matchPercent}>{dualUseCheck.match}% Match</span>
              <span
                className={`${styles.matchResult} ${styles[dualUseCheck.result]}`}
                onClick={() => triggerPanelFlagResults(r, "T2")}
              >
                {dualUseCheck.result}
              </span>
            </div>
            <div className={`${styles.useCases} ${styles[dualUseCheck.result]}`}>
              <Tree
                className={styles.dualUseCases}
                showLine
                switcherIcon={<DownOutlined />}
                defaultExpandedKeys={["rootNode"]}
                selectable={false}
                treeData={useCases(dualUseCheck.uses)}
              />
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};
const DualGoodsCheck = React.memo(_DualGoodsCheck, (prevProps, nextProps) => prevProps.hsCodeInferred.hsCode == nextProps.hsCodeInferred.hsCode);

const _HSCodeDetails = ({ hsCodeInferred }) => {
  return (
    <div className={styles.fieldSetContainer}>
      <fieldset>
        <legend data-augmented-ui="tr-clip border">
          HSCode: <span className={styles.hsCode}>{hsCodeInferred.hsCode}</span>
          <span className={`${styles.matchResult} ${styles[hsCodeInferred.result]}`}>
            {hsCodeInferred.match}% Match
          </span>
        </legend>
        <div className="grid grid-cols-4" style={{ minHeight: "3rem" }}>
          <div className={`col-span-4 flex self-center ${styles.field}`}>
            <div className={`${styles.value} ${styles.hsCodeDesc}`}>
              <HSCodeDescription hsCode={hsCodeInferred.hsCode} className={styles["text-truncate"]} />
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  );
};
const HSCodeDetails = React.memo(_HSCodeDetails, (prevProps, nextProps) => prevProps.hsCodeInferred.hsCode == nextProps.hsCodeInferred.hsCode);

const _HSCodesInferred = ({ r, setActiveIndex }) => {
  return (
    <div className={`col-span-4 grid grid-cols-7 ${styles.field} ${styles.h2} ${styles.inferred}`}>
      <div className={`col-span-2 ${styles.title}`}>HSCodes inferred:</div>
      <div className={`col-span-5 ${styles.value}`}>
        {r.hsCodesInferred.map((inferred, index) => (
          <span className={styles.hsCode} onMouseOver={() => setActiveIndex(index)} key={inferred.hsCode}>
            {inferred.hsCode}
          </span>
        ))}
      </div>
    </div>
  );
};
const HSCodesInferred = React.memo(_HSCodesInferred, () => true);

const GoodsDescription = ({ r }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <div className={styles["goods-desc"]}>
        <form className={styles.fieldSetContainer}>
          <fieldset>
            <legend data-augmented-ui="tr-clip border">Goods Description</legend>
            <div className="grid grid-cols-4">
              <div className={`col-span-4 ${styles.field} ${styles.h2}`}>
                <div className={`${styles.value} ${styles.name}`}>{r.GoodsDesc}</div>
              </div>
              <HSCodesInferred r={r} setActiveIndex={setActiveIndex} />
            </div>
            <HSCodeDetails hsCodeInferred={r.hsCodesInferred[activeIndex]} />
          </fieldset>
        </form>
      </div>
      <DualGoodsCheck r={r} hsCodeInferred={r.hsCodesInferred[activeIndex]} />
    </>
  );
};

const BuyerDetails = ({ r }) => {
  const buyerProfile = r.flagResults["T1.1"];
  return (
    <div className={styles["buyer-details"]}>
      <form className={styles.fieldSetContainer}>
        <fieldset id="buyer">
          <legend data-augmented-ui="tr-clip border">Applicant</legend>
          <div className="grid grid-cols-7">
            <div className={`col-span-7 ${styles.field} ${styles.h1}`}>
              <div className={`${styles.value} ${styles.name}`}>{r.Drawer}</div>
            </div>
            <div className={`col-span-6 grid grid-cols-7 ${styles.field} ${styles.h3}`}>
              <div className={`col-span-1 ${styles.title}`}>LEI:</div>
              <div className={`col-span-6 ${styles.value}`}>335800ISA7YO1S2TNB29</div>
            </div>
            <CountryFlag className={`col-span-1 ${styles.field} ${styles.h3}`} code="gr" title="Applicant's country" />
          </div>
        </fieldset>
        <fieldset>
          <legend data-augmented-ui="tr-clip border">
            <div>
              Applicant Profile:
              <span
                className={`${styles.matchResult} ${styles[buyerProfile.result]}`}
                onClick={() => triggerPanelFlagResults(r, "T1.1")}
              >
                {buyerProfile.match}% Match
              </span>
            </div>
          </legend>

          <div className={`${styles["frequent-buys"]}`}>
            <div className={styles.heading} title="Goods frequently bought by this Applicant">
              Item
            </div>
            <div className={styles.heading} title="Weight (in Kgs) of Goods">
              Weight
            </div>
            <div className={styles.heading} title="Source country from where the Goods are bought">
              Country
            </div>
            {OrgService.getFrequentBuys(r).map((i) => (
              <Fragment key={i.item}>
                <div className={styles.item}>{i.item}</div>
                <div className={styles.weight}>{i.weight}</div>
                <CountryFlag code={i.country} className={styles.country} />
              </Fragment>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend data-augmented-ui="tr-clip border">
            <div>
              Frequent Suppliers:{" "}
              <span
                className={`${styles.matchResult} ${styles.Warn}`}
                onClick={() => triggerPanelFlagResults(r, "T1.1")}
              >
                46% Match
              </span>
            </div>
          </legend>
          <div className={`${styles["frequent-suppliers"]}`}>
            <div className={styles.heading} title="Frequent provider of Goods">
              Supplier
            </div>
            <div className={styles.heading} title="No. of Shipments">
              Count
            </div>
            <div className={styles.heading} title="Country from where the Goods are sourced">
              Country
            </div>
            {OrgService.getFrequentSuppliers(r).map((i) => (
              <Fragment key={i.supplier}>
                <div className={styles.item}>{i.supplier}</div>
                <div className={styles.weight}>{i.count}</div>
                <CountryFlag code={i.country} className={styles.country} />
              </Fragment>
            ))}
          </div>
        </fieldset>
      </form>
    </div>
  );
};

const SellerDetails = ({ r }) => {
  const sellerProfile = r.flagResults["T1.2"];
  return (
    <div className={styles["seller-details"]}>
      <form className={styles.fieldSetContainer}>
        <fieldset id="seller">
          <legend data-augmented-ui="tl-clip border" className={styles.rtl}>
            Beneficiary
          </legend>
          <div className="grid grid-cols-7">
            <div className={`col-span-7 ${styles.field} ${styles.h1}`}>
              <div className={`${styles.value} ${styles.name} ${styles.rtl}`}>{r.Drawee}</div>
            </div>
            <CountryFlag
              code="kr"
              className={`col-span-1 ${styles.field} ${styles.h3} ${styles.rtl}`}
              title="Beneficiary's country"
            />
            <div className={`col-span-6 grid grid-cols-7 ${styles.field} ${styles.h3}`}>
              <div className={`col-span-1 ${styles.title}`}>LEI:</div>
              <div className={`col-span-6 ${styles.value}`}>254900C0KJWUBQ07OB69</div>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend data-augmented-ui="tl-clip border" className={styles.rtl}>
            <div>
              <span
                className={`${styles.matchResult} ${styles[sellerProfile.result]}`}
                onClick={() => triggerPanelFlagResults(r, "T1.2")}
              >
                {sellerProfile.match}% Match
              </span>
              : Beneficiary Profile
            </div>
          </legend>

          <div className={`${styles["frequent-sells"]}`}>
            <div className={styles.heading} title="Destination country to where the Goods are sold">
              Country
            </div>
            <div className={styles.heading} title="Goods frequently sold by this Beneficiary">
              Item
            </div>
            <div className={styles.heading} title="Weight (in Kgs) of Goods">
              Weight
            </div>
            {OrgService.getFrequentSells(r).map((i) => (
              <Fragment key={i.item}>
                <CountryFlag code={i.country} className={styles.country} />
                <div className={styles.item}>{i.item}</div>
                <div className={styles.weight}>{i.weight}</div>
              </Fragment>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend data-augmented-ui="tl-clip border" className={styles.rtl}>
            <span className={`${styles.matchResult} ${styles.Warn}`} onClick={() => triggerPanelFlagResults(r, "T1.2")}>
              48% Match
            </span>
            : Frequent Buyers
          </legend>
          <div className={`${styles["frequent-buyers"]}`}>
            <div className={styles.heading} title="Country to where the Goods are sold">
              Country
            </div>
            <div className={styles.heading} title="Frequent buyer of Goods">
              Buyer
            </div>
            <div className={styles.heading} title="No. of Shipments">
              Count
            </div>
            {OrgService.getFrequentBuyers(r).map((i) => (
              <Fragment key={i.buyer}>
                <CountryFlag code={i.country} className={styles.country} />
                <div className={styles.item}>{i.buyer}</div>
                <div className={styles.weight}>{i.count}</div>
              </Fragment>
            ))}
          </div>
        </fieldset>
      </form>
    </div>
  );
};

const TransactionDetails = ({r}) => {
  return (
    <div className={styles["transaction-details"]}>
      <form className={styles.fieldSetContainer}>
        <fieldset>
          <legend data-augmented-ui="tr-clip tl-clip border" className={styles.center}>
            Transaction
          </legend>

          <div className={`col-span-6 grid grid-cols-7 ${styles.field} ${styles.h1}`}>
            <div className={`col-span-1 ${styles.title}`}>Buyer Pays:</div>
            <div className={`col-span-6 ${styles.value}`}>USD {r.Amount}</div>
          </div>
          <BLList />
        </fieldset>
      </form>
    </div>
  );
};

const BLList = ({ hsCode }) => {
  return (
    <div className={`${styles.fieldSetContainer} ${styles.blList}`}>
      <fieldset>
        <legend data-augmented-ui="tl-clip border" className={styles.rtl}>
          B/L issued by Supplier
        </legend>
        <div className="grid grid-cols-4 mt-4 mb-4" style={{ minHeight: "6rem" }}>
          {blList.map((bl) => (
            <div className={`col-span-4 flex self-center ${styles.field} ${styles.h2} ${styles.blRecord}`} key={bl.id}>
              <span className={`${styles.title} ${styles.blField} cursor-pointer`}>{bl.id}</span>
              <span className={`${styles.title} ${styles.blField}`}>{bl.date}</span>
              <span className={`${styles.title} ${styles.blField}`}>{bl.item}</span>
              <span className={`${styles.title} ${styles.blField}`}>{bl.weight}</span>
              <span className={`${styles.matchResult} ${styles[bl.result]}`}>{bl.match}% Match</span>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default ({ record }) => {
  return (
    <div className={`${styles["app-show-container"]} h-full`}>
      <div className={styles["invoice-image"]}></div>
      <ApplicationDetails r={record} />
      <ApplicationStatus r={record} />
      <GoodsDescription r={record} />
      <BuyerDetails r={record} />
      <TransactionDetails r={record} />
      <SellerDetails r={record} />
    </div>
  );
};

// returns a human readable text from the Pass/Fail/Warn text
export function getApplicationStatusText(pfwStatus) {
  return { Pass: "Approved", Fail: "Rejected", Warn: "Needs Review" }[pfwStatus];
}
