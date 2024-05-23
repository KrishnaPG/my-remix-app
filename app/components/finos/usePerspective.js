import { useMount, useUnmount, useSetState } from 'ahooks';
import { useState } from 'react';
import { loadScript, loadExternals } from "../../components/loadExternal";

export function usePerspective(perspScriptURL, viewerScriptURL, pluginsURLs=[]) {
  const [loadStatus, setLoadStatus] = useState({
    state: 'loading',
    sharedWorker: null,
    error: null,
  });

  const [{ loadFinos, unloadFnPer, unloadFnPerV, unloadFnPlugins }, setUnloadFns] = useSetState(
    () => {
      const { loadP: loadFinos, unloadFn: unloadFnPer } = loadScript(perspScriptURL);
      return { loadFinos, unloadFnPer };
    },
  );

  useMount(() => {
    loadFinos
      .then(() => {
        const { loadP: loadPerV, unloadFn: unloadFnPerV } = loadScript(viewerScriptURL);
        setUnloadFns({ unloadFnPerV });
        return loadPerV;
      })
      .then(() => {
        const { loadPs: loadPlugins, unloadFns: unloadFnPlugins } = loadExternals(pluginsURLs);
        setUnloadFns({ unloadFnPlugins });
        return Promise.all(loadPlugins);
      })
      .then(() =>
        setLoadStatus({
          state: 'ready',
          sharedWorker: window.perspective.shared_worker(),
          error: null,
        }),
      )
      .catch((ex) =>
        setLoadStatus({ state: 'error', error: `Finos Script load failed: ${ex.message}` }),
      );
  });
  useUnmount(() => {
    unloadFnPlugins && unloadFnPlugins.map((unloadFn) => unloadFn());
    unloadFnPerV && unloadFnPerV();
    unloadFnPer && unloadFnPer(() => {
      delete window.perspective;
      loadStatus.sharedWorker && loadStatus.sharedWorker.terminate();
    });
  });

  return loadStatus;
}

export default usePerspective;
export { default as LoadInProgress, LoadError } from '../../components/load-in-progress';
