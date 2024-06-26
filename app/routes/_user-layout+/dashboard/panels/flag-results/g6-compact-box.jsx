import React, { useId, useEffect } from "react";
import G6 from "@antv/g6";

const loadGraph = (id) => {
fetch("https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json")
  .then((res) => res.json())
  .then((data) => {
    const width = 600;
    const height = document.getElementById(id).scrollHeight || 480;
    const graph = new G6.TreeGraph({
      container: id,
      width,
      height,
      pixelRatio: 2,
      modes: {
        default: [
          {
            type: "collapse-expand",
            onChange: function onChange(item, collapsed) {
              const data = item.get("model").data;
              data.collapsed = collapsed;
              return true;
            },
          },
          "drag-canvas",
          "zoom-canvas",
        ],
      },
      defaultNode: {
        size: 26,
        anchorPoints: [
          [0, 0.5],
          [1, 0.5],
        ],
        style: {
          fill: "#C6E5FF",
          stroke: "#5B8FF9",
        },
      },
      defaultEdge: {
        shape: "cubic-horizontal",
        style: {
          stroke: "#A3B1BF",
        },
      },
      layout: {
        type: "compactBox",
        direction: "LR",
        getId: function getId(d) {
          return d.id;
        },
        getHeight: function getHeight() {
          return 16;
        },
        getWidth: function getWidth() {
          return 16;
        },
        getVGap: function getVGap() {
          return 10;
        },
        getHGap: function getHGap() {
          return 100;
        },
      },
    });

    graph.node(function (node) {
      return {
        label: node.id,
        labelCfg: {
          offset: 10,
          position: node.children && node.children.length > 0 ? "left" : "right",
        },
      };
    });

    graph.data(data);
    graph.render();
    graph.fitView();
  });
}



export default () => {
  const id = useId();
  useEffect(() => { loadGraph(id); }, []);
  return <div id={id} />
}