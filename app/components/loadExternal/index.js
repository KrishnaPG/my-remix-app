const dummyFn = (el) => el;

// loadScript() can be safely called many times, but only once
// the script tag gets added and removed based on reference count.
//   onLoad: gets executed only once when the DOM node is added.
//   unloadFn: accepts a cleanupFn that gets called only once on final node removal.
// Caller should explicitly call the `unloadFn` to unload the
// script tag and do any cleanup. It will NOT be called automatically.
export function loadScript(src, onLoad = dummyFn) {
  let scriptNode = document.querySelector(`script[src="${src}"]`);
  if (!scriptNode) {
    scriptNode = document.createElement('script');
    scriptNode.src = src;
    scriptNode.async = true;
    const p = new Promise((resolve, reject) => {
      scriptNode.addEventListener('load', resolve, { once: true });
      scriptNode.addEventListener('error', reject, { once: true });
    });
    scriptNode.loadCount = 1;
    scriptNode.loadPromise = p.then(onLoad);
    document.body.appendChild(scriptNode);
  } else {
    scriptNode.loadCount++;
  }
  return {
    loadP: scriptNode.loadPromise,
    unloadFn: (cleanupFn = dummyFn) =>
      --scriptNode.loadCount || cleanupFn(document.body.removeChild(scriptNode)),
  };
}

// Caller should explicitly call the `unloadFn` to unload the
// css and do any cleanup. It will NOT be called automatically.
export function loadStylesheet(src, onLoad = dummyFn) {
  let cssNode = document.querySelector(`link[href="${src}"]`);
  if (!cssNode) {
    cssNode = document.createElement('link');
    cssNode.rel = 'stylesheet';
    cssNode.href = src;
    const p = new Promise((resolve, reject) => {
      cssNode.addEventListener('load', resolve, { once: true });
      cssNode.addEventListener('error', reject, { once: true });
    });
    cssNode.loadCount = 1;
    cssNode.loadPromise = p.then(onLoad);
    document.head.appendChild(cssNode);
  } else {
    cssNode.loadCount++;
  }
  return {
    loadP: cssNode.loadPromise,
    unloadFn: (cleanupFn = dummyFn) =>
      --cssNode.loadCount || cleanupFn(document.head.removeChild(cssNode)),
  };
}

// Returns array of [{loadP, unloadFn},{...}]
// Caller should explicitly call each of the `unloadFn` in the array
// to unload the respective tags and do specific cleanup for each;
// Without calling one of these, the tags will not be removed from the DOM.
export function loadExternals(srcArray, onLoad = dummyFn) {
  const loadPs = [];
  const unloadFns = [];
  // array of {loadP, unloadFn} objects, one for each loaded src
  srcArray.map((src) => {
    const retVal = src.endsWith('.js') ? loadScript(src) : loadStylesheet(src);
    loadPs.push(retVal.loadP);
    unloadFns.unshift(retVal.unloadFn); // add at the beginning, so that we can call them in reverse
    return retVal;
  });
  return {
    loadPs, unloadFns
  };
}

export { default as LoadInProgress, LoadError } from "../load-in-progress";
