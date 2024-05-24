import React, { useState, useEffect, useCallback } from 'react';
import { Empty } from 'antd';
import { useUnmount } from 'ahooks';
import SizeMe from 'react-sizeme';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import DCChart, { resizeAllCharts } from "../../../../../../../components/DCChart";
import { useDC, LoadError, LoadInProgress } from "../../../../../../../components/DCChart/useDC";
import CFPerspective from './CFPerspective';
import { getExternalUrl } from '../../../../../../../globals/settings.client';
import debounce from "lodash/debounce";

import styles from '../styles.module.css';
import './grid-layout.css';

const DynamicBubbleChart = React.lazy(
  () =>
    import(
      /* webpackChunkName: "g2c-bubble", webpackPrefetch: true */ "../../../../../../../components/g2Charts/DynamicBubbleChart"
    ),
);

// Reactive Grid Layout component
const WidthProvider = (ComposedComponent) => (props) => {
  props.resizeAllCharts(); // a debounced function that triggers a resize for all charts (in its group)
  return <ComposedComponent {...props} width={props.size.width} />;
};
const ResponsiveReactGridLayout = SizeMe({
  monitorWidth: true,
  refreshRate: 500,
  refreshMode: 'debounce',
})(WidthProvider(ResponsiveGridLayout));


const genderColors = ['#3182bdbf', '#cb2b83bf'];
const expiryColors = ['#4daf4a', '#e41a1c']; // use https://colorbrewer2.org/;
const seqNumColors = ['#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f']; // use https://colorbrewer2.org/;
const ethnicColors = [
'#a65628'
];

const recordCount = (el, ndx, chartGroup) => {
  const chart = window.dc.numberDisplay(el, chartGroup);
  const grp = ndx.groupAll();
  window.ndx = ndx;
  chart
    .formatNumber(d3.format('.' + d3.precisionFixed(1) + 'f'))
    .valueAccessor((d) => d)
    .group(grp);
  return chart;
};

const countBySeqNum = (el, ndx, chartGroup) => {
  const chart = window.dc.rowChart(el, chartGroup);
  const dim = ndx.dimension((x) => x.seqNum);
  const grp = dim.group();
  const maxX = grp.size() + 1;
  chart
    .dimension(dim)
    .group(grp)
    .elasticX(true)
    .renderLabel(true)
    .label((p) => p.key)
    .renderTitle(true)
    .title((p) => `Position: ${p.key}\nNo. of Patients: ${p.value}`)
    .ordinalColors(seqNumColors) // use https://colorbrewer2.org/
    .margins({ top: (7 - maxX) * 5, right: 30, bottom: (7 - maxX) * 20, left: 30 }); // 7 = max.possibilities(5) + 2

  return chart;
};

const ethnicBars = (el, ndx, chartGroup) => {
  const chart = window.dc.barChart(el, chartGroup);
  const dim = ndx.dimension((x) => x.ethnicityGrouped);
  const grp = dim.group();
  const maxX = grp.size() + 1;
  chart
    .dimension(dim)
    .group(grp)
    .x(d3.scaleBand())
    .xUnits(dc.units.ordinal)
    .xAxisPadding('10%')
    .brushOn(true)
    .yAxisLabel('No. of Patients', 32)
    .controlsUseVisibility(false)
    .addFilterHandler((filters, filter) => [filter])
    .elasticY(true)
    .renderHorizontalGridLines(true)
    .renderTitle(true)
    .title((p) => `Ethnicity: ${p.key}\nNo. of Patients: ${p.value}`)
    .linearColors(ethnicColors)
    .margins({ top: 10, right: 50, bottom: 20, left: 70 });
  chart.xAxis().tickPadding(-40); // bring up the x-axis labels. for some reason they go down all the way
  chart.yAxis().ticks(5);
  return chart;
};

const _pie = (dimName, label, title, el, ndx, chartGroup) => {
  const chart = window.dc.pieChart(el, chartGroup);
  const dim = ndx.dimension((x) => x[dimName]);
  const grp = dim.group();
  chart
    .dimension(dim)
    .group(grp)
    .renderLabel(true)
    .label(label)
    .renderTitle(true)
    .title(title)
    .externalRadiusPadding(8);
  return chart;
};

const genderPie = (el, ndx, chartGroup) => {
  return _pie(
    'gender',
    (p) => p.key,
    (p) => `No. of ${p.key === 'M' ? 'Male' : 'Female'} Patients: ${p.value}`,
    el,
    ndx,
    chartGroup,
  ).ordinalColors(genderColors);
};

const expiredPie = (el, ndx, chartGroup) => {
  return _pie(
    'hospitalExpireFlag',
    (p) => (p.key ? 'Yes' : 'No'),
    (p) => `${p.key ? 'Expired in Hospital' : ''}\nNo. of Patients: ${p.value}`,
    el,
    ndx,
    chartGroup,
  )
    .innerRadius(40)
    .ordinalColors(expiryColors);
};

const firstVisitPie = (el, ndx, chartGroup) => {
  return _pie(
    'firstHospStay',
    (p) => (p.key ? 'Yes' : 'No'),
    (p) => `${p.key ? 'First-time Admission' : 'ReAdmission'}\nNo. of Patients: ${p.value}`,
    el,
    ndx,
    chartGroup,
  );
};

const boxPlotReduceFn = dimension => [
    (p, v) => {
      // Retrieve the data value, if not Infinity or null add it.
      const dv = v[dimension];
      if (dv != Infinity && dv != null) p.splice(d3.bisectLeft(p, dv), 0, dv);
      return p;
    },
    (p, v) => {
      // Retrieve the data value, if not Infinity or null remove it.
      const dv = v[dimension];
      if (dv != Infinity && dv != null) p.splice(d3.bisectLeft(p, dv), 1);
      return p;
    },
    () => [],
];

const _boxPlot = (x, y, yAxisLabel, el, ndx, chartGroup) => {
  const dimX = ndx.dimension((d) => d[x]);
  const reduceByY = boxPlotReduceFn(y);
  const xyGroup = dimX.group().reduce(...reduceByY);
  const chart = window.dc.boxPlot(el, chartGroup);
  chart
    .dimension(dimX)
    .group(xyGroup)
    .yAxisLabel(yAxisLabel, 16) // padding 16px from left
    .elasticX(true)
    .elasticY(true)
    .renderTitle(true)
    .margins({ top: 10, right: 20, bottom: 30, left: 50 });
  return chart;
};

const ageByGenderBox = (el, ndx, chartGroup) => {
  return _boxPlot('gender', 'admissionAge', 'Age at Admission (years)', el, ndx, chartGroup).colors(
    (x) => genderColors[x == 'F' ? 1 : 0],
  );
};

const losByGenderBox = (el, ndx, chartGroup) => {
  return _boxPlot('gender', 'losHospital', 'Length of Stay (days)', el, ndx, chartGroup).colors(
    (x) => genderColors[x == 'F' ? 1 : 0],
  );
};

const losByInsuranceBox = (el, ndx, chartGroup) => {
  return _boxPlot('insurance', 'losHospital', 'Length of Stay (days)', el, ndx, chartGroup);
};

const lg = [
  { w: 4, h: 2, x: 0, y: 0, i: 'recordCount' },
  { w: 8, h: 2, x: 4, y: 0, i: 'countBySeqNum' },
  { w: 7, h: 2, x: 12, y: 0, i: 'ethnicBars' },
  { w: 5, h: 2, x: 20, y: 0, i: 'firstVisitPie' },

  { w: 6, h: 2, x: 0, y: 2, i: 'genderPie' },
  { w: 6, h: 4, x: 6, y: 2, i: 'ageByGenderBox' },
  { w: 6, h: 4, x: 12, y: 2, i: 'losByGenderBox' },
  { w: 6, h: 4, x: 18, y: 2, i: 'losByInsuranceBox' },
  { w: 6, h: 2, x: 0, y: 4, i: 'expiredPie' },

  { w: 24, h: 6, x: 0, y: 6, i: 'Explore' },
];
const md = [
  { w: 4, h: 2, x: 0, y: 0, i: 'recordCount' },
  { w: 8, h: 2, x: 4, y: 0, i: 'countBySeqNum' },
  { w: 6, h: 2, x: 12, y: 0, i: 'ethnicBars' },

  { w: 6, h: 2, x: 0, y: 2, i: 'genderPie' },
  { w: 6, h: 2, x: 6, y: 2, i: 'expiredPie' },
  { w: 6, h: 2, x: 12, y: 2, i: 'firstVisitPie' },

  { w: 6, h: 4, x: 0, y: 4, i: 'ageByGenderBox' },
  { w: 6, h: 4, x: 6, y: 4, i: 'losByGenderBox' },
  { w: 6, h: 4, x: 12, y: 4, i: 'losByInsuranceBox' },

  { w: 18, h: 6, x: 0, y: 8, i: 'Explore' },
];
const sm = [
  { w: 4, h: 2, x: 0, y: 0, i: "recordCount" },
  { w: 4, h: 2, x: 4, y: 0, i: "countBySeqNum" },
  { w: 4, h: 2, x: 8, y: 0, i: "ethnicBars" },

  { w: 4, h: 2, x: 0, y: 2, i: "genderPie" },
  { w: 4, h: 2, x: 4, y: 2, i: "expiredPie" },
  { w: 4, h: 2, x: 8, y: 2, i: "firstVisitPie" },

  { w: 3, h: 4, x: 0, y: 4, i: "ageByGenderBox" },
  { w: 3, h: 4, x: 3, y: 4, i: "losByGenderBox" },
  { w: 6, h: 4, x: 6, y: 4, i: "losByInsuranceBox" },

  { w: 12, h: 6, x: 0, y: 8, i: "Explore" },
];
const xs = [
  { w: 8, h: 2, x: 0, y: 0, i: "recordCount" },
  { w: 8, h: 2, x: 0, y: 2, i: "countBySeqNum" },
  { w: 8, h: 2, x: 0, y: 4, i: "ethnicBars" },
  { w: 8, h: 2, x: 0, y: 6, i: "genderPie" },
  { w: 8, h: 2, x: 0, y: 8, i: "expiredPie" },
  { w: 8, h: 2, x: 0, y: 10, i: "firstVisitPie" },
  { w: 8, h: 4, x: 0, y: 12, i: "ageByGenderBox" },
  { w: 8, h: 4, x: 0, y: 16, i: 'losByGenderBox' },
  { w: 8, h: 4, x: 0, y: 20, i: 'losByInsuranceBox' },
  { w: 8, h: 6, x: 0, y: 24, i: 'Explore' },
];
const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
const l = {};
const cols = { lg: 24, md: 18, sm: 12, xs: 8, xxs: 4 };

// Tip: using the renderKey as chartGroup here means there is a possibility
// of sharing the brush filters across different dashboards if we use the same
// renderKey. The primary use of renderKey, however, is just to avoid re-rendering
// for react.memo comparison
const DCDashboard = ({ data, renderKey: chartGroup }) => {
  // this useUnmount() should come *before* useDC below to ensure the order of invocation
  useUnmount(() => {
    if (window.dc) window.dc.chartRegistry.clear(chartGroup);
  });
  const dcLoadStatus = useDC(
    getExternalUrl("d3Script"),
    getExternalUrl("crossFilterScript"),
    getExternalUrl("dcScript"),
    getExternalUrl("dcCSS"),
  );
  const [ndx, setNDX] = useState(null);

  useEffect(() => {
    if (window.crossfilter && data?.length > 0) {
      setNDX(window.crossfilter(data));
    } else setNDX(null);
  }, [dcLoadStatus, data]);

  const _dResizeAllCharts = useCallback(
    debounce(() => resizeAllCharts(chartGroup), 100),
    [],
  );

  if (dcLoadStatus.state === 'error')
    return <LoadError msg={loadStatus.error} className={styles.dcLoading} />;
  if (dcLoadStatus.state !== 'ready')
    return <LoadInProgress tip="Loading Chart Modules..." className={styles.dcLoading} />;
  if (!ndx) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;

  return (
    <ResponsiveReactGridLayout
      className={styles.dcDashboard}
      breakpoints={breakpoints}
      cols={cols}
      isDraggable={false}
      isResizable={false}
      rowHeight={100}
      layout={l}
      layouts={{ lg, md, sm, xs }}
      onLayoutChange={(layout, layouts) => {
        _dResizeAllCharts(); // TODO: save the layout
      }}
      onResize={(layout, oldItem, newItem, placeholder, ev, el) => {}}
      resizeAllCharts={_dResizeAllCharts} // we use this prop to force chart resize on 1. window resize through WidthProvider above, 2. onLayoutChange()
    >
      <div key="recordCount" className={styles.dcDashboardItem}>
        <DCChart
          DC={window.dc}
          chartFn={(el) => recordCount(el, ndx, chartGroup)}
          title="No. of Records"
          className={styles.dcChart}
        ></DCChart>
      </div>
      <div key="countBySeqNum" className={styles.dcDashboardItem}>
        <DCChart
          DC={window.dc}
          chartFn={(el) => countBySeqNum(el, ndx, chartGroup)}
          title="By Sequence Number"
          className={styles.dcChart}
        ></DCChart>
      </div>
      <div key="ethnicBars" className={styles.dcDashboardItem}>
        <DCChart
          DC={window.dc}
          chartFn={(el) => ethnicBars(el, ndx, chartGroup)}
          title="Ethnic"
          className={styles.dcChart}
        ></DCChart>
      </div>
      <div key="firstVisitPie" className={styles.dcDashboardItem}>
        <DCChart
          DC={window.dc}
          chartFn={(el) => firstVisitPie(el, ndx, chartGroup)}
          title="First visit"
          className={styles.dcChart}
        ></DCChart>
      </div>
      <div key="genderPie" className={styles.dcDashboardItem}>
        <DCChart
          DC={window.dc}
          chartFn={(el) => genderPie(el, ndx, chartGroup)}
          title="Gender"
          className={styles.dcChart}
        ></DCChart>
      </div>
      <div key="ageByGenderBox" className={styles.dcDashboardItem}>
        <DCChart
          DC={window.dc}
          chartFn={(el) => ageByGenderBox(el, ndx, chartGroup)}
          title="Age / Gender"
          className={styles.dcChart}
        ></DCChart>
      </div>
      <div key="losByGenderBox" className={styles.dcDashboardItem}>
        <DCChart
          DC={window.dc}
          chartFn={(el) => losByGenderBox(el, ndx, chartGroup)}
          title="LoS / Gender"
          className={styles.dcChart}
        ></DCChart>
      </div>
      <div key="losByInsuranceBox" className={styles.dcDashboardItem}>
        <DCChart
          DC={window.dc}
          chartFn={(el) => losByInsuranceBox(el, ndx, chartGroup)}
          title="LoS / Insurance"
          className={styles.dcChart}
        ></DCChart>
      </div>
      <div key="expiredPie" className={styles.dcDashboardItem}>
        <DCChart
          DC={window.dc}
          chartFn={(el) => expiredPie(el, ndx, chartGroup)}
          title="Expired in Hospital"
          className={styles.dcChart}
        ></DCChart>
      </div>
      <div key="Explore" className={styles.dcDashboardItem}>
        <CFPerspective ndx={ndx} className={styles.dcChart} />
      </div>
    </ResponsiveReactGridLayout>
  );
};

export default React.memo(
  DCDashboard,
  (prevProps, nextProps) => prevProps.renderKey === nextProps.renderKey,
);
