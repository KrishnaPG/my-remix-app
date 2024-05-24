import React, { useEffect, useState } from "react";
import { Descriptions, List, Popover, Space, Statistic } from "antd";
import { addDays, format } from "date-fns";

import CountryFlag from "../../../../../components/country-flag";

import styles from "./style.module.css";
import fieldsetStyles from "../payment-applications/style-show.module.css";

const DefResponse = {
  status: "success",
  totalEntityNameMatchResults: 2,
  totalAddressMatchResults: 1,
  entityMatchResults: [
    {
      matchScore: 100.0,
      listName: "U.S. General Services Administration (GSA) Parties Excluded",
      matchedEntityName: "RUSSKOYE VREMYA LLC",
      details: {
        entityAliases: [
          "AQUANIKA LLC",
          "RUSSKOYE VREMYA LLC",
          "LLC RUSSKOYE VREMYA",
          "RUSSKOE VREMYA OOO",
          "OBSHCHESTVO S OGRANICHENNOI OTVETSTVENNOSTYU RUSSKOE VREMYA",
        ],
        effectiveDate: "2014-05-02",
        expiryDate: "NA",
        citationLink:
          "https://storage.googleapis.com/trademo-rps-bucket/US-GSA-PROGRAMS/US-GSA-PROGRAMS.pdf",
        notes: [
          "Notes : PII data has been masked from view",
          "Excluding Agency : TREAS-OFAC",
          "Exclusion Type : Prohibition/Restriction",
          "Exclusion Program : Reciprocal",
          "",
        ],
        addressDetails: {
          country: "Russian Federation",
          state: "",
          city: "MOSCOW",
          zipcode: "117186",
          street: "",
          address: "47A, SEVASTOPOLSKIY AVE., OF. 304",
        },
        nationality: [],
        citizenship: [],
        idDetails: [
          {
            idType: "SAM Number",
            idNumber: "S4MR4DYLN",
            idIssueDate: "",
            idIssuingCountry: "",
            idNotes: "",
          },
        ],
        vesselInfo: {
          imoNumber: "",
          vesselCall: "",
          vesselOwner: "",
          vesselGrossTonnage: "",
          vesselFlag: "",
          vesselType: "",
          grossRegisteredTonnage: "",
        },
      },
    },
    {
      matchScore: 100.0,
      listName: "Specially Designated Nationals List",
      matchedEntityName: " AQUANIKA",
      details: {
        entityAliases: [
          "AQUANIKA LLC",
          "RUSSKOYE VREMYA LLC",
          "LLC RUSSKOYE VREMYA",
          "RUSSKOE VREMYA OOO",
          "OBSHCHESTVO S OGRANICHENNOI OTVETSTVENNOSTYU RUSSKOE VREMYA",
        ],
        effectiveDate: "2024-02-24",
        expiryDate: "NA",
        citationLink:
          "https://storage.googleapis.com/trademo-rps-bucket/US-OFAC-SDN/US-OFAC-SDN-16809_AQUANIKA.pdf",
        notes: ["Program List : UKRAINE-EO13661", ""],
        addressDetails: {
          country: ["Russia", "Russia"],
          state: "Nizhegorodskaya oblast",
          city: "Moscow",
          zipcode: "",
          street: [
            "47A, Sevastopolskiy Ave., of. 304",
            "1/2 Rodnikovaya ul., Savasleika s., Kulebakski raion",
          ],
          zip_code: ["117186", "607007"],
          address: [
            "47A, Sevastopolskiy Ave., of. 304 Moscow  Russia 117186",
            "1/2 Rodnikovaya ul., Savasleika s., Kulebakski raion  Nizhegorodskaya oblast Russia 607007",
          ],
        },
        nationality: [],
        citizenship: [],
        idDetails: [
          {
            idType: "Registration ID",
            idNumber: "1075247000036",
            idIssueDate: "",
            idIssuingCountry: "",
            idNotes: "",
            idCountry: "",
          },
          {
            idType: "Email Address",
            idNumber: "office@aquanika.com",
            idIssueDate: "",
            idIssuingCountry: "",
            idNotes: "",
            idCountry: "",
          },
          {
            idType: "Website",
            idNumber: "http://www.aquanika.com",
            idIssueDate: "",
            idIssuingCountry: "",
            idNotes: "",
            idCountry: "",
          },
          {
            idType: "Website",
            idNumber: "http://aquanikacompany.ru",
            idIssueDate: "",
            idIssuingCountry: "",
            idNotes: "",
            idCountry: "",
          },
          {
            idType: "Secondary sanctions risk:",
            idNumber:
              "Ukraine-/Russia-Related Sanctions Regulations, 31 CFR 589.201 and/or 589.209",
            idIssueDate: "",
            idIssuingCountry: "",
            idNotes: "",
            idCountry: "",
          },
        ],
        vesselInfo: {
          imoNumber: "",
          vesselCall: "",
          vesselOwner: "",
          vesselGrossTonnage: "",
          vesselFlag: "",
          vesselType: "",
          grossRegisteredTonnage: "",
        },
      },
    },
  ],
  addressMatchResults: [
    {
      addressMatchScore: 95,
      listName: "U.S. General Services Administration (GSA) Parties Excluded",
      matchedEntityName: "AQUANIKA",
      details: {
        entityAliases: [
          "AQUANIKA LLC",
          "RUSSKOYE VREMYA LLC",
          "LLC RUSSKOYE VREMYA",
          "RUSSKOE VREMYA OOO",
          "OBSHCHESTVO S OGRANICHENNOI OTVETSTVENNOSTYU RUSSKOE VREMYA",
        ],
        effectiveDate: "2014-05-02",
        expiryDate: "NA",
        citationLink:
          "https://storage.googleapis.com/trademo-rps-bucket/US-GSA-PROGRAMS/US-GSA-PROGRAMS.pdf",
        notes: [
          "Notes : PII data has been masked from view",
          "Excluding Agency : TREAS-OFAC",
          "List Name : U.S. General Services Administration (GSA) Parties Excluded",
          "Entity Type : Special Entity Designation",
          "Exclusion Type : Prohibition/Restriction",
          "Authority : U.S. General Services",
          "Exclusion Program : Reciprocal",
          "",
        ],
        addressDetails: {
          country: "Russian Federation",
          state: "",
          city: "MOSCOW",
          zipcode: "117186",
          street: "",
          address: "47A, SEVASTOPOLSKIY AVE., OF. 304",
        },
        nationality: [],
        citizenship: [],
        idDetails: [
          {
            idType: "SAM Number",
            idNumber: "S4MR4DYLN",
            idIssueDate: "",
            idIssuingCountry: "",
            idNotes: "",
          },
        ],
        vesselInfo: {
          imoNumber: "",
          vesselCall: "",
          vesselOwner: "",
          vesselGrossTonnage: "",
          vesselFlag: "",
          vesselType: "",
          grossRegisteredTonnage: "",
        },
      },
    },
  ],
};

const ArrayOrString = ({ val }) => <>{Array.isArray(val) ? JSON.stringify(val) : val}</>;
const PickFirst = ({ val }) => <>{Array.isArray(val) ? val[0] : val}</>;

const AddressDetails = React.memo(({ details }) => {
  return (
    <Descriptions bordered size="small" column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 3 }}>
      <Descriptions.Item label="Address">
        <pre>{Array.isArray(details.address) ? details.address.join("\n") : details.address}</pre>
      </Descriptions.Item>
      <Descriptions.Item label="Street">
        <pre>{Array.isArray(details.street) ? details.street.join("\n") : details.street}</pre>
      </Descriptions.Item>
      <Descriptions.Item label="ZipCode">
        <PickFirst val={details.zipcode} />
      </Descriptions.Item>
      <Descriptions.Item label="City">
        <ArrayOrString val={details.city} />
      </Descriptions.Item>
      <Descriptions.Item label="State">
        <ArrayOrString val={details.state} />
      </Descriptions.Item>
      <Descriptions.Item label="Country">
        <PickFirst val={details.country} />
      </Descriptions.Item>
    </Descriptions>
  );
}, () => true);

const SanctionReport = React.memo(({ item }) => {
  return <form className={fieldsetStyles.fieldSetContainer}>
    <fieldset>
      <legend data-augmented-ui="tr-clip border">Sanction Report</legend>
      <div className="grid grid-cols-6">
        <div
          className={`col-span-6 grid grid-cols-6 ${fieldsetStyles.field} ${fieldsetStyles.h1}`}
        >
          <div className={`col-span-1 ${fieldsetStyles.title}`}>
            <Popover content={<div>Name of the sanction list.</div>} title="List">
              List:
            </Popover>
          </div>
          <div className={`col-span-5 ${fieldsetStyles.value}`}>{item.listName}</div>
        </div>
        <div
          className={`col-span-6 2xl:col-span-3 grid grid-cols-3 ${fieldsetStyles.field} ${fieldsetStyles.h2}`}
        >
          <div className={`col-span-1 ${fieldsetStyles.title}`}>
            <Popover
              content={<div>Date from which the sanctions came into effect.</div>}
              title="Effective Date"
            >
              Effective Date:
            </Popover>
          </div>
          <div className={`col-span-2 ${fieldsetStyles.value}`}>
            {format(new Date(item.details.effectiveDate), "dd-MMM-yy")}
          </div>
        </div>
        <div
          className={`col-span-6 2xl:col-span-3 grid grid-cols-3 ${fieldsetStyles.field} ${fieldsetStyles.h2}`}
        >
          <div className={`col-span-1 ${fieldsetStyles.title}`}>
            <Popover
              content={<div>Date of expiry, if any, for the sanctions on this entity.</div>}
              title="Expiry Date"
            >
              Expiry Date:
            </Popover>
          </div>
          <div className={`col-span-2 ${fieldsetStyles.value}`}>
            {format(addDays(new Date(), Math.ceil(Math.random() * 100)), "dd-MMM-yy")}
          </div>
        </div>
        <div
          className={`col-span-6 grid grid-cols-3  2xl:grid-cols-6 ${fieldsetStyles.field} ${fieldsetStyles.h2}`}
        >
          <div className={`col-span-1  2xl:col-span-1 ${fieldsetStyles.title}`}>
            <Popover
              content={
                <div>
                  Clicking on the link takes you to the source document for this sanction.
                </div>
              }
              title="Citation"
            >
              Citation:
            </Popover>
          </div>
          <div className={`col-span-2  2xl:col-span-5 ${fieldsetStyles.value}`}>
            <a href={item.details.citationLink} target="_blank">
              link
            </a>
          </div>
        </div>
      </div>
    </fieldset>
  </form>
}, () => true);

const renderSanctionMatchItem = (item, index) => {
  return (
    <List.Item
      key={index}
      extra={<SanctionReport item={item} />}
    >
      <List.Item.Meta
        avatar={
          <Statistic
            className={styles.match}
            title="Conf."
            value={item.matchScore || item.addressMatchScore}
            suffix="%"
          />
        }
        title={
          <>
            <CountryFlag
              className={`col-span-1 ${fieldsetStyles.field} ${fieldsetStyles.h3}`}
              code="gr"
              title="Applicant's country"
            />
            {item.matchedEntityName}
          </>
        }
        description={
          <>
            <AddressDetails details={item.details.addressDetails} />
            <div className={styles.entityAliases}>
              <Popover content={<div>Other known names of this entity.</div>} title="Aliases">
                <span className={styles.label}>Aliases:</span>
              </Popover>
              <pre className={styles.aliases}>{item.details.entityAliases.join("\n")}</pre>
            </div>
            <div className={styles.citationLink}>
              <Popover
                content={<div>The document source for this sanction entry.</div>}
                title="Citation"
              >
                <span className={styles.label}>Citation:</span>
              </Popover>
              <a className={styles.link} href={item.details.citationLink} target="_blank">
                {item.details.citationLink}
              </a>
            </div>
            <pre className={styles.sanctionNotes}>{item.details.notes.join("\n")}</pre>
          </>
        }
      />
    </List.Item>
  );
};

export default ({ query }) => {
  const [sanctionScreeningResponse, setSanctionScreeningResponse] = useState(); // TODO: replace it with useQuery to make the API call and get the response
  useEffect(() => { if (!query) return; setSanctionScreeningResponse(DefResponse); }, [query]);
  if (!sanctionScreeningResponse) return null;
  return (
    <>
      <List
        className={styles.resultList}
        itemLayout="vertical"
        size="large"
        dataSource={sanctionScreeningResponse.entityMatchResults}
        header={<div>Entity Match Results</div>}
        footer={
          <div>
            <b>{sanctionScreeningResponse.totalEntityNameMatchResults}</b> entity match results
            found.
          </div>
        }
        renderItem={renderSanctionMatchItem}
      />
      <List
        className={styles.resultList}
        itemLayout="vertical"
        size="large"
        dataSource={sanctionScreeningResponse.addressMatchResults}
        header={<div>Address Match Results</div>}
        footer={
          <div>
            <b>{sanctionScreeningResponse.totalAddressMatchResults}</b> address match results found.
          </div>
        }
        renderItem={renderSanctionMatchItem}
      />
    </>
  );
};
