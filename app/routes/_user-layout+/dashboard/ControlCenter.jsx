import React, { useState } from 'react';

import { AppWindow, Building, WalletCards, } from "lucide-react";
// import { GoOrganization } from "react-icons/go";

import { useResizeDetector } from 'react-resize-detector';
import compute_transform from "./perspective_transform"

import { triggerPanelCreateLC, triggerPanelCreateOrg, triggerPanelCreatePaymentApp } from "./panels";

import styles from "./style-control-center.module.css";

const DivLeft = React.memo(({ iconSize }) => {
  return (
    <div className="flex mt-4">
      <div className={`grow ${styles.logo}`}>Logo</div>
      <div className={`grid grid-cols-3 ${styles.toolBox}`}>
        <div className={styles.enabled} title="Organizations" onClick={triggerPanelCreateOrg}>
          <Building size={iconSize} absoluteStrokeWidth={true} />
        </div>
        <div className={styles.enabled} title="Letter of Credits" onClick={triggerPanelCreateLC}>
          <WalletCards size={iconSize} absoluteStrokeWidth={true} />
        </div>
        <div className={styles.enabled} title="Payment Applications" onClick={triggerPanelCreatePaymentApp}>
          <AppWindow size={iconSize} absoluteStrokeWidth={true} />
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => prevProps?.iconSize == nextProps?.iconSize);

const DivMid = React.memo(() => {
  return <div className="h-full">
    <div className={styles.name}>Société Générale Effekten GmbH</div>
    <div className={styles.industry}>Property developers</div>
  </div>;
}, () => true);

const DivRight = React.memo(() => {
  return <div className="h-full flex">
    <div className={`grow-0 self-center ${styles.reticle} ${styles.danger}`} data-augmented-ui="all-hexangle-up border">
      <div className={styles.text}>2</div><div className={styles.subText}>MAS Grade</div>
    </div>
    <div className='grow'>
      <div className='grid grid-cols-3 place-items-center'>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
        <div>9</div>
      </div>
    </div>
  </div>;
}, () => true);

export default React.memo(() => {
  const [transforms, setTransforms] = useState({ left: 'none', mid: 'none', right: 'none' });
  const [prevState, setPrevState] = useState({ width: undefined, height: undefined, iconSize: 48 });
  const { ref } = useResizeDetector({
    handleHeight: false,
    refreshMode: 'debounce',
    refreshRate: 500,
    onResize: (width, height) => {
      if (!width || !height) return;
      if (width == prevState.width && height == prevState.height) return; // nothing changed, no need to recalculate; happens when tab is closed and restored

      const colWidth = width / 5, wL = colWidth, wR = colWidth, wM = 3 * colWidth, h = height, hElevation = 32, wSkew = 24;

      const fromPointsLeft = [[0, 0], [wL, 0], [wL, h], [0, h]];
      const toPointsLeft = [[0, 0 - hElevation], [wL, 0], [wL + wSkew, h], [0, h + hElevation]];
      const lTransform = compute_transform(fromPointsLeft, toPointsLeft);

      const fromPointsRight = [[0, 0], [wR, 0], [wR, h], [0, h]];
      const toPointsRight = [[0, 0], [wR, 0 - hElevation], [wR, h + hElevation], [0 - wSkew, h]];
      const rTransform = compute_transform(fromPointsRight, toPointsRight);

      const fromPointsMid = [[0, 0], [wM, 0], [wM, h], [0, h]];
      const toPointsMid = [[0, 0 - hElevation], [wM, 0 - hElevation], [wM - wSkew, h], [0 + wSkew, h]];
      const mTransform = compute_transform(fromPointsMid, toPointsMid);

      setPrevState({ width, height, iconSize: width > 1536 ? 48 : (width > 1280 ? 40 : (width > 1024 ? 32 : (width > 768 ? 24 : 20))) });
      setTransforms({ left: lTransform, mid: mTransform, right: rTransform });
    }
  });

  return <footer ref={ref} className="sticky bottom-0 z-[95] grid grid-cols-5 h-full">
    <div id={styles.footerLeft} style={{ transform: transforms.left }} data-augmented-ui="tr-clip-x"><DivLeft iconSize={prevState.iconSize} /></div>
    <div id={styles.footerMid} style={{ transform: transforms.mid }}  className="col-span-3">
      <DivMid /> {/* data-augmented-ui="tl-2-clip-x tr-clip-x" */}
    </div>
    <div id={styles.footerRight} style={{ transform: transforms.right }} data-augmented-ui="tl-clip-x"><DivRight /></div>
  </footer>
}, () => true);

export const handle = {
  scripts: [
    { // for perspective view calculations
      src: "https://cdnjs.cloudflare.com/ajax/libs/numeric/1.2.6/numeric.min.js",
      crossOrigin: "anonymous",
      preload: true, // use it to render a <link rel="preload"> for this script
    }
  ],
};