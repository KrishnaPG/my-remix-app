import React from "react";
import { useRequest } from "ahooks";

import LoadInProgress from "../../../components/load-in-progress";
import { lastSession } from "../../../globals";

const p = () =>
  Promise.all([
    import("./FlexLayout"),
    lastSession,
    import("../../../components/query-client"),
    import("../../../components/antd-theme"),
  ]).then(async ([flModule, session, qcModule, antDTmodule]) => {
    // try loading the layoutJSON from previous session, if any; else use the default;
    let layoutModel = null;
    const layoutJson = session?.layout || (await import("./default-layout")).default;
    try {
      layoutModel = flModule.Model.fromJson(layoutJson);
    } catch (ex) {
      console.warn("FlexLayoutModel.fromJson failed. Defaulting to built-in layout.", ex);
      layoutModel = flModule.Model.fromJson((await import("./default-layout")).default);
    }
    return { flModule, layoutModel, qcModule, antDTmodule };
  });

const LayoutComp = React.lazy(() => p().then(({ flModule }) => flModule));
const QCProvider = React.lazy(() => p().then(({ qcModule }) => qcModule));
const AntDTheme = React.lazy(() => p().then(({ antDTmodule }) => antDTmodule));

export default () => {
  const { data, loading } = useRequest(p);
  if (loading) return <LoadInProgress fullscreen={true} />;
  return (
    <QCProvider>
      <AntDTheme>
        <LayoutComp layoutModel={data.layoutModel} />
      </AntDTheme>
    </QCProvider>
  );
};

export const links = () => {
  return [
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/flexlayout-react@0.7.15/style/dark.css",
    },
    { rel: "stylesheet", href: "https://unpkg.com/augmented-ui@2/augmented-ui.min.css" },
  ];
};
