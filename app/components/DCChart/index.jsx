import React, { useRef, useState } from 'react';
import { Button } from 'antd';
import { useMount, useUnmount } from 'ahooks';

function Reset({ DC, chart }) {
  return (
    <>
      <Button
        type="link"
        className="reset"
        style={{ display: 'none' }}
        onClick={() => {
          chart?.filterAll();
          DC.redrawAll(chart.chartGroup());
        }}
      >
        Reset
      </Button>
      <span className="reset" style={{ display: 'none' }}>
        Filter: <span className="filter"></span>
      </span>
    </>
  );
}

function DCChart({ DC, chartFn, title = '', className = '', isTable = false }) {
  const [chart, setChart] = useState(null);
  const refChart = useRef(null);
  const refTable = useRef(null);

  useMount(() => {
    const chart = chartFn(isTable ? refTable.current : refChart.current);
    chart.render();
    setChart(chart);
  });
  useUnmount(() => {
    if (chart) {
      DC.chartRegistry.deregister(chart, chart.chartGroup());
      const dim = chart.dimension();
      if (dim) dim.dispose(); // removes the dimension and all its groups from ndx
    }
  });

  return (
    <div ref={refChart} className={className}>
      <span className="topBar">
        <h3 className="title">{title}</h3>
        <Reset chart={chart} DC={DC} />
      </span>
      {isTable ? (
        <div className="tableContainer">
          <table className="table table-hover dc-data-table" ref={refTable}></table>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default React.memo(DCChart, (prevProps, nextProps) => true);

export function resizeAllCharts(chartGroup) {
  // issue resize request for all charts of this group
  const charts = window.dc.chartRegistry.list(chartGroup);
  charts.forEach((c) => {
    const elParent = c.root().node();

    const elTitleBar = elParent.childNodes[0]; // we hope this is titleBar, not sure if it is or not
    const elTitleBarStyle = window.getComputedStyle(elTitleBar);
    const elTitleBarHeight =
      elTitleBar.offsetHeight +
      parseFloat(elTitleBarStyle.getPropertyValue('margin-top')) +
      parseFloat(elTitleBarStyle.getPropertyValue('margin-bottom'));

    c.width(elParent.clientWidth - (c.widthMargin || 0)).height(
      elParent.clientHeight - elTitleBarHeight - (c.heightMargin || 0),
    );

    c.redraw();
  });
}
