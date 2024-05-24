import { useState } from 'react';
import { useMount, useUnmount } from 'ahooks';
import { loadScript, loadStylesheet } from  "../../../../../../components/loadExternal";

export function useICD11(scriptURL, cssURL) {
  const [loadStatus, setLoadStatus] = useState({ state: 'loading', error: null });
  const [{ loadP: loadScriptP, unloadFn: unloadScriptFn }] = useState(() => loadScript(scriptURL));
  const [{ loadP: loadCSSP, unloadFn: unloadCSSFn }] = useState(() => loadStylesheet(cssURL));
  useMount(() => {
    Promise.all([loadScriptP, loadCSSP])
      .then(() => setLoadStatus({ state: 'ready', error: null }))
      .catch((ex) =>
        setLoadStatus({ state: 'error', error: `ICD11 Script load failed: ${ex.message}` }),
      );
  });
  useUnmount(() => {
    unloadCSSFn();
    unloadScriptFn(() => delete window.ECT);
  });

  return loadStatus;
}

export default useICD11;
