import { useState } from "react";
import { Space, Spin } from "antd";
import { useMount } from "ahooks";
import { useICD11 } from "./useICD11";
import { getExternalUrl } from "../../../../../../globals/settings.client";
import LoadInProgress, { LoadError } from "../../../../../../components/load-in-progress";

import styles from "./styles.module.css";

const ICD11E = (props) => {
  const [bindId] = useState(() => props.bindId || "1" || Math.random() * Date.now());
  const [isSearching, setIsSearching] = useState(false);

  useMount(() => {
    const mySettings = {
      apiServerUrl: "https://icd11restapi-developer-test.azurewebsites.net", // TODO: only use this URL for dev/testing
      apiSecured: false,
      autoBind: false,
      icdMinorVersion: "",
      icdLinearization: "mms",
      language: "en",
      sourceApp: "Test App",
      popupMode: false,
      wordsAvailable: true,
      chaptersAvailable: true,
      flexisearchAvailable: true,
      enableKeyboard: true,
    };
    const myCallbacks = {
      searchStartedFunction: () => {        
        //this callback is called when searching is started.
        setIsSearching(true);
        console.log("Search started!");
      },
      searchEndedFunction: () => {
        //this callback is called when search ends.
        setIsSearching(false);
        console.log("Search ended!");
      },
      selectedEntityFunction: (selectedEntity) => {
        //This callback is called when the user makes a selection
        //This is the best way to get what the user has chosen and use it in
        //your application
        console.log("selected uri: " + selectedEntity.uri);
        console.log("selected code: " + selectedEntity.code);
        console.log("selected bestMatchText: " + selectedEntity.bestMatchText);
      },
      getNewTokenFunction: async () => {
        // if the embedded coding tool is working with the cloud hosted ICD-API, you need to set apiSecured=true
        // In this case embedded coding tool calls this function when it needs a new token.
        // In this case you backend web application should provide updated tokens

        const url = "https://icdaccessmanagement.who.int/connect/token"; // we assume this backend script returns a JSON {'token': '...'}
        try {
          const response = await fetch(url, {
            mode: "no-cors", // 'cors' by default
            method: "POST",
            headers: {
              Accept: "application/json",
              //'Content-Type': 'application/json',
              // Authorization:
              //   'Basic ' +
              //   btoa(
              //     '71049fda-b59b-42c2-9dd6-d3b26c1e22bf_36e7f07e-0e3b-4c87-9a1b-728b7cecae0f:0gWzS0oSGlIEqBTJfa6/akILyitQ1wjJ9wSEpXKr7dc=',
              //   ),
            },
            body: JSON.stringify({
              grant_type: "client_credentials",
              scope: "icdapi_access",
              client_id: "",
              client_secret: "",
            }),
          });
          const result = await response.json();
          const token = result.token;
          return token; // the function return is required
        } catch (e) {
          console.log("Error during the request");
        }
      },
    };

    // on component mount, bind the DOM nodes
    ECT.Handler.configure(mySettings, myCallbacks);
    ECT.Handler.bind(bindId);
  });

  return (
    <div className={styles.ICD11Container}>
      <div className={styles.searchBar} data-augmented-ui="br-clip border">
        Search for <span className={styles.highlight}>Disease</span>: <Space />
        <input
          autoFocus
          autoComplete="off"
          className={`ctw-input ${styles.searchBox} mx-auto p-2`}
          data-augmented-ui="br-clip border"
          data-ctw-ino={bindId}
          placeholder="Enter search phrase"
          size="large"
        />
      </div>
      <Spin spinning={isSearching}><div className={`ctw-window ${styles.results}`} data-ctw-ino={bindId}>
        
      </div></Spin>
    </div>
  );
};

export default (props) => {
  const { state, error } = useICD11(getExternalUrl("icd11Script"), getExternalUrl("icd11CSS"));
  if (state === "error") return <LoadError msg={error} />;
  if (state !== "ready") return <LoadInProgress tip="Loading Scripts..." />;
  return <ICD11E {...props}></ICD11E>;
};
