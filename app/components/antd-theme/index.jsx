import ConfigProvider from 'antd/es/config-provider';
import en_US from "antd/locale/en_US";

import customTheme from "./theme";

/**
 * Use this at the top-level to provide the theme to all components below
 * @example
      const AntDTheme = React.lazy(() => import("../antd-theme"));
      const Component = ()=> <AntDTheme><LayoutComp layoutModel={data.layoutModel} /></AntDTheme>  
 */
export default function AntDTheme({children}) {  
  return (
    <ConfigProvider theme={customTheme} locale={en_US}>
      {children}
    </ConfigProvider>
  );
}