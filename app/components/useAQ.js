import { useState, useEffect } from "react";
import { loadScript } from "./loadExternal";
import { useUnmount } from "ahooks";
import { useQuery } from "@tanstack/react-query";
import { getExternalUrl } from "../globals/settings.client";

export function useAQ(dataReq, aqScriptSrc = getExternalUrl("aqScript")) {
  const [loadStatus, setLoadStatus] = useState({ state: "loading", error: null });
  const [{ loadP: aqLoaderP, unloadFn: aqUnloadFn }] = useState(() => loadScript(aqScriptSrc));
  const { data, error: dataReqError, isLoading: dataReqInProgress } = useQuery(dataReq);
  useUnmount(aqUnloadFn);

  const [x] = useState(() =>
    aqLoaderP.catch((ex) =>
      setLoadStatus({ state: "error", error: `AQScript load failed: ${ex.message}` }),
    ),
  );

  useEffect(() => {
    if (dataReqError) {
      setLoadStatus({ state: "error", error: `AQData Request failed: ${dataReqError.message}` });
    } else if (dataReqInProgress === false) {
      // data for AQ is ready. Lets mark it as available whenever script is ready to process them
      aqLoaderP
        .then(() => {
          setLoadStatus({ state: "ready", data, error: null });
        })
        .catch((ex) => ex); // to avoid unhandled rejection complaint
    }
  }, [dataReqInProgress]);

  return loadStatus;
}

export default useAQ;
export { default as LoadError } from "./load-in-progress";
