import { useMount, useUnmount } from 'ahooks';
import { useState } from 'react';
import { loadScript, loadStylesheet } from '../../components/loadExternal';

export function useDC(d3ScriptURL, crossFilterScriptURL, dcScriptURL, dcCSSURL) {
  const [loadStatus, setLoadStatus] = useState({ state: 'loading', error: null });

  const [{ loadP, unloadFnD3, unloadFnCF, unloadFnDCS }] = useState(() => {
    const { loadP: loadPD3, unloadFn: unloadFnD3 } = loadScript(d3ScriptURL);
    const { loadP: loadPCF, unloadFn: unloadFnCF } = loadScript(crossFilterScriptURL);
    const { loadP: loadPDCS, unloadFn: unloadFnDCS } = loadStylesheet(dcCSSURL);
    return {
      loadP: Promise.all([loadPD3, loadPCF, loadPDCS]).then(() => loadScript(dcScriptURL)),
      unloadFnD3,
      unloadFnCF,
      unloadFnDCS,
    };
  });
  const [{ unloadFnDC }, setUnloadFnDC] = useState({});
  useMount(() => {
    loadP
      .then(({ loadP, unloadFn: unloadFnDC }) => {
        setUnloadFnDC({ unloadFnDC });
        return loadP;
      })
      .then(() => setLoadStatus({ state: 'ready', error: null }))
      .catch((ex) =>
        setLoadStatus({ state: 'error', error: `DC Script load failed: ${ex.message}` }),
      );
  });
  useUnmount(() => {
    unloadFnDC && unloadFnDC(() => delete window.dc);
    unloadFnCF && unloadFnCF(() => delete window.crossfilter);
    unloadFnD3 && unloadFnD3(() => delete window.d3);
    unloadFnDCS && unloadFnDCS();
  });

  return loadStatus;
}

export default useDC;
export { default as LoadInProgress, LoadError } from "../load-in-progress";
