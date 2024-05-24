/**
 * Copyright © 2020 Cenacle Research India Private Limited.
 * All Rights Reserved.
 */

export default {
  global: {
    splitterSize: 6,
    tabEnableFloat: true,
  },
  layout: {
    type: "row",
    children: [
      {
        type: "tabset",
        weight: 12.5,
        active: true,
        selected: 2,
        children: [
          {
            type: "tab",
            name: "Loader",
            component: "Loader",
          },
          {
            type: "tab",
            id: "Screening",
            name: "Screening",
            component: "Screening",
          },
          {
            type: "tab",
            id: "MedAI",
            name: "MedAI",
            component: "MedAI",
          },
          // {
          //   type: "tab",
          //   id: "Org.Search",
          //   name: "Organizations",
          //   component: "Org.Search",
          // },
        ],
      },
    ],
  },
  // borders: [
  //   {
  //     type: "border",
  //     location: "bottom",
  //     enableAutoHide: true,
  //     selected: -1,
  //     children: [
  //       {
  //         type: "tab",
  //         enableClose: false,
  //         name: "Notifications",
  //         component: "Notifications",
  //       },
  //       {
  //         type: "tab",
  //         enableClose: false,
  //         enableDrag: false,
  //         name: "Control Center",
  //         component: "ControlCenter",
  //       },
  //       {
  //         type: "tab",
  //         enableClose: false,
  //         name: "Execution Blotter",
  //         component: "grid",
  //       },
  //     ],
  //   },
  //   {
  //     type: "border",
  //     location: "left",
  //     enableAutoHide: true,
  //     selected: -1,
  //     size: 280,
  //     children: [
  //       {
  //         type: "tab",
  //         enableClose: false,
  //         enableFloat: false,
  //         name: "Home",
  //         component: "Home",
  //       },
  //       {
  //         type: "tab",
  //         enableClose: false,
  //         enableFloat: false,
  //         name: "Xplore",
  //         component: "Xplore",
  //       },
  //     ],
  //   },
  //   {
  //     type: "border",
  //     location: "right",
  //     enableAutoHide: true,
  //     selected: -1,
  //     size: 300,
  //     children: [
  //       {
  //         type: "tab",
  //         enableClose: false,
  //         name: "Settings",
  //         component: "Settings",
  //       },
  //       {
  //         type: "tab",
  //         enableClose: false,
  //         name: "Properties",
  //         component: "Properties",
  //       },
  //     ],
  //   },
  // ],
};