import React, { Fragment, Suspense } from "react";
import LoadInProgress from "../../../../../components/load-in-progress";
import CountryFlag from "../../../../../components/country-flag";
import * as OrgService from "../../../../../services/org/index.client";
  
import styles from "../payment-applications/style-show.module.css";
import "./style-result-details.css";

const L7Map = React.lazy(() => import("./l7-map"));
const G6CompactBox = React.lazy(() => import("./g6-compact-box"));

const getEntityStatus = (fr) => (fr.result == "Pass" ? "Active" : "Unknown");
const getSanctionStatus = (fr) =>
  fr.result == "Pass" ? "Not part of any Sanction List" : "Sanctioned as per EU-01/AZ-1 List";

export function BuyerSellerRelation({ fr, record }) {
  return (
    <Suspense fallback={<LoadInProgress />}>
      <G6CompactBox />
    </Suspense>
  );
}

export function IsBuyerValid({ fr, record }) {
  return (
    <div className={styles["buyer-details"]}>
      <form className={styles.fieldSetContainer}>
        <fieldset>
          <legend data-augmented-ui="tr-clip border">Buyer</legend>
          <div className="grid grid-cols-7">
            <div className={`col-span-7 grid grid-cols-12 ${styles.field} ${styles.h1}`}>
              <div className={`col-span-1 ${styles.title}`}>Name:</div>
              <div className={`col-span-11 ${styles.value} ${styles.name}`}>{record.Drawer}</div>
            </div>
            <div className={`col-span-7 grid grid-cols-12 ${styles.field} ${styles.h2}`}>
              <div className={`col-span-1 ${styles.title}`}>LEI:</div>
              <div className={`col-span-11 ${styles.value}`}>335800ISA7YO1S2TNB29</div>
            </div>
            <div className={`col-span-7 grid grid-cols-12 ${styles.field} ${styles.h2}`}>
              <div className={`col-span-1 ${styles.title}`}>Status:</div>
              <div className={`col-span-11 ${styles.value} ${styles.matchResult} ${styles[fr.result]} pt-1 pb-1`}>
                {getEntityStatus(fr)}
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export function IsSellerValid({ fr, record }) {
  return (
    <div className={styles["seller-details"]}>
      <form className={styles.fieldSetContainer}>
        <fieldset>
          <legend data-augmented-ui="tr-clip border">Seller</legend>
          <div className="grid grid-cols-7">
            <div className={`col-span-7 grid grid-cols-12 ${styles.field} ${styles.h1}`}>
              <div className={`col-span-1 ${styles.title}`}>Name:</div>
              <div className={`col-span-11 ${styles.value} ${styles.name}`}>{record.Drawee}</div>
            </div>
            <div className={`col-span-7 grid grid-cols-12 ${styles.field} ${styles.h2}`}>
              <div className={`col-span-1 ${styles.title}`}>LEI:</div>
              <div className={`col-span-11 ${styles.value}`}>6030NE0207481</div>
            </div>
            <div className={`col-span-7 grid grid-cols-12 ${styles.field} ${styles.h2}`}>
              <div className={`col-span-1 ${styles.title}`}>Status:</div>
              <div className={`col-span-11 ${styles.value} ${styles.matchResult} ${styles[fr.result]} pt-1 pb-1`}>
                {getEntityStatus(fr)}
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export function IsBuyerSanctioned({ fr, record }) {
  return (
    <div className={styles["buyer-details"]}>
      <form className={styles.fieldSetContainer}>
        <fieldset>
          <legend data-augmented-ui="tr-clip border">Buyer</legend>
          <div className="grid grid-cols-7">
            <div className={`col-span-7 grid grid-cols-12 ${styles.field} ${styles.h2}`}>
              <div className={`col-span-1 ${styles.title}`}>LEI:</div>
              <div className={`col-span-11 ${styles.value}`}>335800ISA7YO1S2TNB29</div>
            </div>
            <div className={`col-span-7 grid grid-cols-12 ${styles.field} ${styles.h2}`}>
              <div className={`col-span-1 ${styles.title}`}>Status:</div>
              <div className={`col-span-11 ${styles.value} ${styles.matchResult} ${styles[fr.result]} pt-1 pb-1`}>
                {getSanctionStatus(fr)}
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export function IsSellerSanctioned({ fr, record }) {
  const flagCategory = "S1.2";
  return (
    <div className={styles["seller-details"]}>
      {record.forcedFlags?.[flagCategory] && (
        <div className="forcedFlagNotes">{record.forcedFlags[flagCategory].RedFlagDetail}</div>
      )}
      <form className={styles.fieldSetContainer}>
        <fieldset>
          <legend data-augmented-ui="tr-clip border">Seller</legend>
          <div className="grid grid-cols-7">
            <div className={`col-span-7 grid grid-cols-12 ${styles.field} ${styles.h2}`}>
              <div className={`col-span-1 ${styles.title}`}>LEI:</div>
              <div className={`col-span-11 ${styles.value}`}>6030NE0207481</div>
            </div>
            <div className={`col-span-7 grid grid-cols-12 ${styles.field} ${styles.h2}`}>
              <div className={`col-span-1 ${styles.title}`}>Status:</div>
              <div className={`col-span-11 ${styles.value} ${styles.matchResult} ${styles[fr.result]} pt-1 pb-1`}>
                {getSanctionStatus(fr)}
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export function IsSellerLocationSanctioned({ fr, record }) {
  const flagCategory = "S1.3";
  return (
    <div className={styles["seller-details"]}>
      {record.forcedFlags?.[flagCategory] && (
        <div className="forcedFlagNotes">{record.forcedFlags[flagCategory].RedFlagDetail}</div>
      )}
      <form className={styles.fieldSetContainer}>
        <fieldset>
          <legend data-augmented-ui="tr-clip border">Seller</legend>
          <div className="grid grid-cols-7">
            <div className={`col-span-7 grid grid-cols-12 ${styles.field} ${styles.h2}`}>
              <div className={`col-span-1 ${styles.title}`}>LEI:</div>
              <div className={`col-span-11 ${styles.value}`}>6030NE0207481</div>
            </div>
            <div className={`col-span-7 grid grid-cols-12 ${styles.field} ${styles.h2}`}>
              <div className={`col-span-1 ${styles.title}`}>Status:</div>
              <div className={`col-span-11 ${styles.value} ${styles.matchResult} ${styles[fr.result]} pt-1 pb-1`}>
                {getSanctionStatus(fr)}
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export function VerifyBuyerProfile({ fr, record }) {
  const flagCategory = "T1.1";
  return (
    <div className={styles["buyer-details"]}>
      {record.forcedFlags?.[flagCategory] && (
        <div className="forcedFlagNotes">{record.forcedFlags[flagCategory].RedFlagDetail}</div>
      )}
      <form className={styles.fieldSetContainer}>
        <fieldset id="buyer">
          <legend data-augmented-ui="tr-clip border">Buyer</legend>
          <div className="grid grid-cols-7">
            <div className={`col-span-7 ${styles.field} ${styles.h1}`}>
              <div className={`${styles.value} ${styles.name}`}>{record.Drawer}</div>
            </div>
            <div className={`col-span-6 grid grid-cols-7 ${styles.field} ${styles.h3}`}>
              <div className={`col-span-1 ${styles.title}`}>LEI:</div>
              <div className={`col-span-6 ${styles.value}`}>335800ISA7YO1S2TNB29</div>
            </div>
            <CountryFlag className={`col-span-1 ${styles.field} ${styles.h3}`} code="gr" title="Buyer's country" />
          </div>
        </fieldset>
        <fieldset>
          <legend data-augmented-ui="tr-clip border">
            <div>
              Buyer Profile:
              <span className={`${styles.matchResult} ${styles[fr.result]}`}>{fr.match}% Match</span>
            </div>
          </legend>

          <div className={`${styles["frequent-buys"]}`}>
            <div className={styles.heading} title="Goods frequently bought by this buyer">
              Item
            </div>
            <div className={styles.heading} title="Weight (in Kgs) of Goods">
              Weight
            </div>
            <div className={styles.heading} title="Source country from where the Goods are bought">
              Country
            </div>
            {OrgService.getFrequentBuys(record).map((i) => (
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
              Frequent Suppliers: <span className={`${styles.matchResult} ${styles.Warn}`}>46% Match</span>
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
            {OrgService.getFrequentSuppliers(record).map((i) => (
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
}

export function VerifySellerProfile({ fr, record }) {
  const flagCategory = "T1.2";
  return (
    <div className={styles["seller-details"]}>
      {record.forcedFlags?.[flagCategory] && (
        <div className="forcedFlagNotes">{record.forcedFlags[flagCategory].RedFlagDetail}</div>
      )}
      <form className={styles.fieldSetContainer}>
        <fieldset id="seller">
          <legend data-augmented-ui="tl-clip border" className={styles.rtl}>
            Seller
          </legend>
          <div className="grid grid-cols-7">
            <div className={`col-span-7 ${styles.field} ${styles.h1}`}>
              <div className={`${styles.value} ${styles.name} ${styles.rtl}`}>{record.Drawee}</div>
            </div>
            <CountryFlag
              code="kr"
              className={`col-span-1 ${styles.field} ${styles.h3} ${styles.rtl}`}
              title="Seller's country"
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
              <span className={`${styles.matchResult} ${styles[fr.result]}`}>{fr.match}% Match</span>: Seller Profile
            </div>
          </legend>

          <div className={`${styles["frequent-sells"]}`}>
            <div className={styles.heading} title="Destination country to where the Goods are sold">
              Country
            </div>
            <div className={styles.heading} title="Goods frequently sold by this supplier">
              Item
            </div>
            <div className={styles.heading} title="Weight (in Kgs) of Goods">
              Weight
            </div>
            {OrgService.getFrequentSells(record).map((i) => (
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
            <span className={`${styles.matchResult} ${styles.Warn}`}>48% Match</span>: Frequent Buyers
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
            {OrgService.getFrequentBuyers(record).map((i) => (
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
}

export function IsShipRouteSanctioned({ fr, record }) {
  const flagCategory = "R1";
  return (
    <div className="grid grid-cols-2">
      {record.forcedFlags?.[flagCategory] && (
        <div className="col-span-2 forcedFlagNotes">{record.forcedFlags[flagCategory].RedFlagDetail}</div>
      )}
      <div className="col-span-1">
        <img src="/ship-FSO_ASIA.jfif" alt="Ship FSO_ASIA" />
      </div>
      <div className="col-span-1">
        <table className="table-auto ship">
          <tbody>
            <tr>
              <td className="key">IMO number</td>
              <td>9224752</td>
            </tr>
            <tr>
              <td className="key">Vessel Name</td>
              <td>{record.VesselName}</td>
            </tr>
            <tr>
              <td className="key">Flag</td>
              <td>Marshall Islands</td>
            </tr>
            <tr>
              <td className="key">Gross Tonnage</td>
              <td>236638</td>
            </tr>
            <tr>
              <td className="key">Summer Deadweight (t)</td>
              <td>432023</td>
            </tr>
            <tr>
              <td className="key">Length Overall (m)</td>
              <td>380</td>
            </tr>
            <tr>
              <td className="key">Beam (m)</td>
              <td>68</td>
            </tr>
            <tr>
              <td className="key">Year of Build</td>
              <td>2002</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function VerifyPortOfLoading({ fr, record }) {
  const flagCategory = "BL2.1";
  return (
    <>
      {record.forcedFlags?.[flagCategory] && (
        <div className="forcedFlagNotes">{record.forcedFlags[flagCategory].RedFlagDetail}</div>
      )}{" "}
    </>
  );
  // <Suspense fallback={<LoadInProgress />}>
  //   <L7Map />
  // </Suspense>
}

export function CheckForDualUseGoods({ fr, record }) {
  const flagCategory = "T2";
  return (
    <div className={styles["dual-use-goods-status"]}>
      {record.forcedFlags?.[flagCategory] ? (
        <div className="forcedFlagNotes">{record.forcedFlags[flagCategory].RedFlagDetail}</div>
      ) : (
        <div className="m-4 p-4 justify-center">Coming Soon...</div>
      )}
    </div>
  );  
}

export function CheckPriceRange({ fr, record }) {
  const flagCategory = "T3";
  return (
    <div className={styles["transaction-price-range"]}>
      {record.forcedFlags?.[flagCategory] ? (
        <div className="forcedFlagNotes">{record.forcedFlags[flagCategory].RedFlagDetail}</div>
      ) : (
        <div className="m-4 p-4 justify-center">Coming Soon...</div>
      )}
    </div>
  );
}

export function Empty() {
  return <div className="m-4 p-4 justify-center">Coming Soon...</div>;
}

export default () => {};
