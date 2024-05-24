import theme from "antd/es/theme";

// Customize AntD to use the below theme
//
// Ref: https://ant.design/docs/react/customize-theme#theme
// Theme Editor: https://ant.design/theme-editor
//
export default {
  token: {
    colorPrimary: "#5e92a6",
    colorInfo: "#5e92a6",
    colorSuccess: "#52e075cc", //"#6bb324",
    colorError: "#e05252cc", //"#cc3d3d",
    colorWarning: "#ccad14",
  },
  components: {
    Form: {
      colorError: "rgba(255, 163, 163, 0.8)",
    },
  },
  // 1. Use dark algorithm
  algorithm: theme.darkAlgorithm,
};
