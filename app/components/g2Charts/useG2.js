import React, { useState, useEffect } from "react";
import { loadScript } from "../../components/loadExternal";
import { useUnmount } from "ahooks";
import { getExternalUrl } from "../../globals/settings.client";

function registerAnimations(g2) {
  g2.registerAnimation("label-appear", (element, animateCfg, cfg) => {
    const label = element.getChildren()[0];
    const coordinate = cfg.coordinate;
    const startX = coordinate.start.x;
    const finalX = label.attr("x");
    const labelContent = label.attr("text");

    label.attr("x", startX);
    label.attr("text", 0);

    const distance = finalX - startX;
    label.animate((ratio) => {
      const position = startX + distance * ratio;
      const text = (labelContent * ratio).toFixed(0);

      return {
        x: position,
        text,
      };
    }, animateCfg);
  });
  g2.registerAnimation("label-update", (element, animateCfg, cfg) => {
    const startX = element.attr("x");
    const startY = element.attr("y");
    // @ts-ignore
    const finalX = cfg.toAttrs.x;
    // @ts-ignore
    const finalY = cfg.toAttrs.y;
    const labelContent = element.attr("text");
    // @ts-ignore
    const finalContent = cfg.toAttrs.text;

    const distanceX = finalX - startX;
    const distanceY = finalY - startY;
    const numberDiff = +finalContent - +labelContent;

    element.animate((ratio) => {
      const positionX = startX + distanceX * ratio;
      const positionY = startY + distanceY * ratio;
      const text = (+labelContent + numberDiff * ratio).toFixed(0);

      return {
        x: positionX,
        y: positionY,
        text,
      };
    }, animateCfg);
  });
}

export function useG2(
  extLoadStatus = { state: "ready" },
  g2ScriptSrc = getExternalUrl("g2Script"),
) {
  const [loadStatus, setLoadStatus] = useState({ state: "loading", error: null });
  const [{ loadP, unloadFn }] = useState(
    loadScript(g2ScriptSrc, () => registerAnimations(window.G2)),
  );
  useUnmount(() => unloadFn(() => delete window.G2));

  const [x] = useState(() =>
    loadP.catch((ex) => setLoadStatus({ state: "error", error: "Failed to load chart module" })),
  );

  useEffect(() => {
    if (extLoadStatus.state === "error") {
      setLoadStatus(extLoadStatus);
    } else if (extLoadStatus.state === "ready") {
      // external dependencies are ready. Whenever G2 script is ready, we are good to go
      loadP.then(() => setLoadStatus({ state: "ready", error: null })).catch((ex) => ex); // to avoid unhandled rejection complaint
    }
  }, [extLoadStatus.state]);

  return loadStatus;
}

export default useG2;
export { default as LoadInProgress, LoadError } from "../load-in-progress";
