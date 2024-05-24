import React, { useEffect } from "react";
import axios from "axios";
import { useSetState } from "ahooks";
import { useAQ } from "../../../../../../components/useAQ";
import { Row, Col } from "antd";
import LoadInProgress from "../../../../../../components/load-in-progress";

const ProCard = React.lazy(
  () => import(/* webpackChunkName: "antPCard", webpackPreload: true */ "@ant-design/pro-card"),
);
const DynamicBarChart = React.lazy(
  () =>
    import(
      /* webpackChunkName: "g2c-bar", webpackPreload: true */ "../../../../../../components/g2Charts/DynamicBarChart"
    ),
);
const DynamicBubbleChart = React.lazy(
  () =>
    import(
      /* webpackChunkName: "g2c-bubble", webpackPreload: true */ "../../../../../../components/g2Charts/DynamicBubbleChart"
    ),
);

const oasisColorsMap = {
  1: "#5be56b",
  2: "#35d1d1",
  3: "#4e7af0",
  4: "#f49d37",
  5: "#f03838",
  6: "#ebcc21",
};

const deriveBarChartData = (csvData) => {
  const dt = window.aq.fromCSV(csvData, { header: true });
  return dt
    .groupby("y")
    .rollup({ o: (d) => aq.op.values({ oasis: `${d.b}`, count: d.c }) })
    .pivot("y", "o")
    .objects()[0];
};
const deriveBubbleChartData = (csvData) => {
  const dt = window.aq.fromCSV(csvData, { header: true });
  return dt
    .groupby("y")
    .rollup({
      o: (d) => aq.op.values({ oasis: d.b, count: d.c, los: Math.ceil(d.l), disease: d.d }),
    })
    .pivot("y", "o")
    .objects()[0];
};

const AxisConfig = {
  oasis: {
    title: {
      style: {
        fill: "#8C8C8C",
        fontSize: 14,
      },
    },
    line: {
      style: {
        stroke: "#D9D9D9",
      },
    },
  },
  count: {
    title: {
      style: {
        fill: "#8C8C8C",
        fontSize: 14,
      },
    },
    grid: {
      line: {
        style: {
          stroke: "#D9D9D9",
        },
      },
    },
  },
};

export default (props) => {
  const [oasisYearWiseData, setBarDataState] = useSetState({});
  const barDataLoadStatus = useAQ({
    queryKey: ["oasis_yearwise"],
    queryFn: () => axios.get("/data/oasis_yearwise.csv").then((response) => response.data),
    enabled: true,
    retry: false,
    retryOnMount: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity, // cache should never expire, as this is read-only data
  });

  useEffect(() => {
    if (barDataLoadStatus.state === "ready") {
      setBarDataState(deriveBarChartData(barDataLoadStatus.data));
    }
  }, [barDataLoadStatus]);

  const [oasisDiseaseYearWiseData, setBubbleDataState] = useSetState({});
  const bubbleDataLoadStatus = useAQ({
    queryKey: ["oasis_disease_yearwise"],
    queryFn: () => axios.get("/data/oasis_disease_yearwise.csv").then((response) => response.data),
    enabled: true,
    retry: false,
    retryOnMount: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity, // cache should never expire, as this is read-only data
  });
  useEffect(() => {
    if (bubbleDataLoadStatus.state === "ready") {
      setBubbleDataState(deriveBubbleChartData(bubbleDataLoadStatus.data));
    }
  }, [bubbleDataLoadStatus]);

  return (
    <React.Suspense fallback={<LoadInProgress tip="Loading Metrics ..." />}>
      <Row>
        <Col flex="auto">
          <ProCard title="Severity of illness for Patients in ICU">
            <DynamicBarChart
              loadStatus={barDataLoadStatus}
              data={oasisYearWiseData}
              axes={AxisConfig}
              animOptions={{
                interval: 1000,
              }}
              height={500}
              initOptions={{}}
              interval={{
                position: "oasis*count",
                color: {
                  key: "oasis",
                  value: (val) => oasisColorsMap[val],
                },
                label: "count",
                tooltip: "count*oasis",
              }}
              legends={{
                los: false,
                count: false,
                oasis: {
                  flipPage: false,
                  position: "bottom-left",
                },
              }}
              scale={{
                oasis: {
                  key: true,
                  alias: "Oxford Acute Severity Illness Score",
                },
                count: {
                  type: "pow",
                  base: 2,
                  alias: "No. of Patients in ICU",
                },
              }}
              tooltip={{
                showMarkers: false,
                showTitle: false,
              }}
            />
          </ProCard>
        </Col>
      </Row>
      <Row>
        <Col flex="auto">
          <ProCard title="Severity of illness for Patients in ICU by Disease">
            <DynamicBubbleChart
              loadStatus={bubbleDataLoadStatus}
              data={oasisDiseaseYearWiseData}
              animOptions={{
                interval: 1000,
              }}
              axes={AxisConfig}
              legends={{
                los: false,
                count: false,
                disease: {
                  flipPage: false,
                  position: "bottom-left",
                },
              }}
              point={{
                color: "disease",
                position: "count*oasis",
                tooltip: "los*count*oasis",
                size: { key: "los", value: [10, 30] },
                shape: "circle",
                style: {
                  stroke: "#000",
                },
              }}
              scale={{
                oasis: {
                  min: 1,
                  max: 5,
                  tickInterval: 1,
                  alias: "Oxford Acute Severity Illness Score",
                },
                los: {
                  // type: 'pow',
                  // base: 2,
                  alias: "Length of stay in ICU",
                },
                count: {
                  alias: "No. of Patients in ICU",
                },
                disease: {
                  key: true,
                },
              }}
              tooltip={{
                showMarkers: false,
                title: "disease",
              }}
            />
          </ProCard>
        </Col>
      </Row>{" "}
    </React.Suspense>
  );
};
