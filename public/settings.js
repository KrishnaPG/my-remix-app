// Global settings Object
window.gSettings = {
  server: {
    // the API server
    URLs: {
      base: "http://localhost:3000",
      runAnalysis: "/api/runAnalysis",
    },
  },
  casdoor: {
    serverUrl: "http://ulysses2.ddns.net:8081",
    clientId: "0726cb33d34eeefe1ee8",
    organizationName: "Mizuho",
    appName: "DCRA",
    redirectPath: "/callback",
  },
  fup: {
    // the upload / companion server
    uploadListingURL: "http://10.7.0.4:10001/api/uploads",
    companionEndpoint: "http://10.7.0.4:10001/uppyCompanion",
    xhrUploadEndpoint: "http://10.7.0.4:10001/upload",
  },
  external: {
    URLs: {
      aqScript: "https://cdn.jsdelivr.net/npm/arquero@2.1.1/dist/arquero.min.js",
      crossFilterScript: "https://cdn.jsdelivr.net/npm/crossfilter2@1.5.4/crossfilter.min.js",
      d3Script: "https://unpkg.com/d3@7.9.0/dist/d3.min.js",
      dcCSS: "https://unpkg.com/dc@4.2.7/dist/style/dc.min.css",
      dcScript: "https://unpkg.com/dc@4.2.7/dist/dc.min.js",
      gleif: "https://api.gleif.org/api/v1/",
      fileGator: "http://10.7.0.4:8989",
      finosPerspScript: "https://unpkg.com/@finos/perspective@0.6.2/dist/umd/perspective.js",
      finosViewerScript: "https://unpkg.com/@finos/perspective-viewer@0.6.2/dist/umd/perspective-viewer.js",
      finsoPlugins: [
        "https://unpkg.com/@finos/perspective-viewer-datagrid@0.6.2/dist/umd/perspective-viewer-datagrid.js",
        "https://unpkg.com/@finos/perspective-viewer-d3fc@0.6.2/dist/umd/perspective-viewer-d3fc.js",
      ],
      g2Script: "https://gw.alipayobjects.com/os/lib/antv/g2/4.1.9/dist/g2.min.js",
      grafana: "http://10.7.0.4:33090",
      medCatProcess: "http://10.7.0.4:8080/medcat-umls/process",
      mimic3: "http://10.7.0.4:8080/mimic3/graphql",
      icd11CSS: "https://icdcdn.who.int/embeddedct/icd11ect-1.6.1.css",
      icd11Script: "https://icdcdn.who.int/embeddedct/icd11ect-1.6.1.js",
      jupyterLab: "http://10.7.0.4:33510/lab",
      mlWorkspace: "http://10.7.0.4:33510/",
      openRefine: "http://10.7.0.4:19030",
      redash: "http://10.7.0.4:33080",
      vsCode: "http://10.7.0.4:33510/tools/vscode/",
    },
  },
  Notifications: {
    maxQLength: {
      value: 100,
      help: "Maximum No. of items to display in the Notification Log. Old items will be discarded once this limit is reached.",
    },
  },
  storageKeys: {
    jwt: "authToken",
    tokenSet: "authTokenSet",
  },
  ui: {
    background: {
      images: [
        "/exploration-dark-galaxy-requires-advanced-technology-engineering-generated-by-ai.jpg",
        "/alien-spacecraft-appeared-ancient-cities-science-fiction-illustration.jpg",
        "/exploration-majestic-galaxy-through-space-shuttle-technology-generated-by-ai.jpg",
      ],
      default: "/281.jpg",
    },
    options: {
      noBGImage: true,
      animDisabled: true,
      bleepsDisabled: true,
    },
  },
};
