import React, { useEffect } from "react";
import axios from "axios";
import sortBy from "lodash/sortBy";
import { Collapse, Row, Col, List } from "antd";
import { HighlightOutlined } from "@ant-design/icons";
import { useSetState } from "ahooks";
import { useAQ, LoadError } from "../useAQ";
import { getExternalUrl } from "../../globals/settings.client";
import LoadInProgress from "../load-in-progress";
import RawView from "./rawView";

import "./annotate.css";

const { Panel } = Collapse;

function classNamesForAnnotation(annotation) {
  return `mark cui-${annotation.cui} tui-${annotation.tui}`;
}
function toolTipForAnnotation(annotation) {
  return `${annotation.type}: ${annotation.pretty_name}`;
}

const splitAtOffsets = (text, annotations) => {
  let lastEnd = 0;
  const splits = [];
  const sortedAnn = sortBy(Object.values(annotations[0]), (o) => o.start);
  sortedAnn.forEach((annotation) => {
    const { start, end } = annotation;
    annotation.tui = annotation.tui || annotation.type_ids[0];
    annotation.type = annotation.type || annotation.types[0];
    if (lastEnd < start) {
      // the empty span between the last mark and the next mark
      splits.push({
        start: lastEnd,
        end: start,
        content: text.slice(lastEnd, start),
      });
    }
    // the mark
    splits.push({
      ...annotation,
      content: text.slice(start, end),
      ann: {
        cls: classNamesForAnnotation(annotation),
        tip: toolTipForAnnotation(annotation),
      },
      sid: splits.length,
    });
    lastEnd = end;
  });
  // any empty space remaining after the last mark up to the end
  if (lastEnd < text.length) {
    splits.push({
      start: lastEnd,
      end: text.length,
      content: text.slice(lastEnd, text.length),
    });
  }
  return splits;
};

function deriveStateFromProps({ text, annotations }) {
  const splits = splitAtOffsets(text, annotations);
  const dt = window.aq.from(splits, ["tui", "cui", "sid"]);
  // group tuis and sort them by their frequency
  const tuiGroups = dt
    .groupby("tui")
    .rollup({
      cui_sids: (d) => window.aq.op.values({ cui: d.cui, sid: d.sid }), // [{cui: 'xxx', sid: 12 }] array of cui,sid pairs
      n: (d) => window.aq.op.values(d.cui).length,
    })
    .orderby(window.aq.desc("n")) // sort the tui groups by the number of splits in them
    .reify()
    .objects();
  // In each of the TUI groups, sort the cuis based on the number of sids
  tuiGroups.forEach((grp) => {
    if (grp.tui) {
      // accumulate all sids for a cui into one key-value pair
      const cuiSids = grp.cui_sids.reduce((acc, { cui, sid }) => {
        if (acc[cui]) acc[cui].push(sid);
        else acc[cui] = [sid];
        return acc;
      }, {});
      // sort the cuis based on the sid count; ucui_sids == [[cui,[sids]], [cui,[sids]] ..., [cui,[sids]] ]
      grp.ucui_sids = Object.entries(cuiSids).sort(([, a], [, b]) => b.length - a.length);
    }
    delete grp.cui_sids; // save some memory by deleting unnecessary arrays
  });
  return { splits, tuiGroups };
}

const rtViewPanelIcons = (tui) => {
  return (
    <HighlightOutlined
      onClick={(event) => {
        console.log("someone clicked me: ", tui);
        event.stopPropagation();
      }}
    />
  );
};

const LeftView = ({ loadStatus, splits, text, className = "" }) => {
  return loadStatus.state === "ready" ? (
    <div className={"ann-text " + className}>
      {splits.map((split, index) => (
        <pre className={split.ann?.cls} key={index} title={split.ann?.tip}>
          {split.content}
        </pre>
      ))}
    </div>
  ) : (
    <RawView text={text} className={className}></RawView>
  );
};

const RightView = ({ loadStatus, splits, tuiGroups, className = "" }) => {
  if (loadStatus.state === "error") return <LoadError msg={loadStatus.error} />;
  if (loadStatus.state !== "ready")
    return <LoadInProgress tip="Calculating ..." className="calculating" />;
  return (
    <div className={`ann-sidebar ${className}`}>
      {tuiGroups.map(({ tui, ucui_sids, n }) => {
        if (!tui) return;
        const someSplitId = ucui_sids[0][1][0]; // ucui_sids == [[cui,[sids]], [cui,[sids]] ..., [cui,[sids]] ]
        const split = splits[someSplitId];
        const header = (
          <span>
            {tui}: {split.type} ({n})
          </span>
        );
        return (
          <Collapse
            accordion
            expandIconPosition="end"
            defaultActiveKey={1}
            key={tui}
            items={[
              {
                key: tui,
                label: header,
                className: `tui-${tui} ${className}`,
                children: (
                  <List
                    itemLayout="horizontal"
                    dataSource={ucui_sids}
                    renderItem={([cui, sids]) => (
                      <List.Item>
                        <List.Item.Meta
                          title={<a href="#">{cui}</a>}
                          description={splits[sids[0]].pretty_name}
                        />
                        <div>{JSON.stringify(sids)}</div>
                      </List.Item>
                    )}
                  />
                ),
                extra: rtViewPanelIcons(tui),
              },
            ]}
          />
        );
      })}
    </div>
  );
};

export default ({ text, cacheKey, className = "" }) => {
  const [{ splits, tuiGroups }, setState] = useSetState({ splits: [], tuiGroups: [] });
  const loadStatus = useAQ({
    queryKey: [cacheKey],
    queryFn: () =>
      axios
        .post(getExternalUrl("medCatProcess"), { content: { text } })
        .then((response) => response.data.result),
    enabled: true,
    retry: false,
    retryOnMount: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity, // cache should never expire, as this is read-only data
  });
  useEffect(() => {
    if (loadStatus.state === "ready")
      setState(deriveStateFromProps({ text, annotations: loadStatus.data.annotations }));
  }, [loadStatus]);

  const props = { loadStatus, text, splits, tuiGroups, className };
  return (
    <Row className={`ann-container ${className}`}>
      <Col xs={24} md={18}>
        <LeftView {...props} />
      </Col>
      <Col xs={24} md={6}>
        <RightView {...props} />
      </Col>
    </Row>
  );
};
