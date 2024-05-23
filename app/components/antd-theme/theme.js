import theme from "antd/es/theme";

// Customize AntD to use the below theme
//
// Ref: https://ant.design/docs/react/customize-theme#theme
// Theme Editor: https://ant.design/theme-editor
//
export default {
  token: {
    colorPrimary: "hsl(196 40% 60%)",
    colorInfo: "hsl(196 40% 60%)",
    colorSuccess: "hsl(106 40% 60%)",
    colorError: "hsl(6 100% 70%)",
    colorWarning: "hsl(50 82% 44%)",
  },
  components: {
    Descriptions: {
      colorText: "hsl(30 72% 54% / 1)",
    },
    Form: {
      colorError: "hsl(0 84% 80%)",
    },
    Input: {
      // colorText: "rgb(255, 139, 25)",
      colorText: "hsl(30 72% 54% / 1)",
    },
  },
  // 1. Use dark algorithm
  algorithm: theme.darkAlgorithm,
};
