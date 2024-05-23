import React from 'react';
import styles from './styles.module.css';

const Spin = React.lazy(() => import("antd/lib/spin/index.js").then(m => m.default));

/** 
 * @example 
    import LoadInProgress, { LoadError } from "components/LoadInProgress/";
    if (isError) return <LoadError msg={error?.message} />;
    if (isLoading) return <LoadInProgress tip="Calculating..." />;
 * 
 * @example
    import LoadInProgress from "components/LoadInProgress/";
    import { useTranslation } from "react-i18next";

    const Compare = React.lazy(() => import("./compare"  ));

    const Comp = () => {
      const { t } = useTranslation();
          <React.Suspense fallback={<LoadInProgress tip={t("messages.loading")} />} >
            <Compare x={10} y={20} />
          </React.Suspense>
      }
 **/
export default function LoadInProgress ({ className = '', children, ...rest } = {}) {
  return (
    <div className={styles.centerInParent + ' ' + className}>
      <Spin {...rest}><div className="content" /></Spin>{children}
    </div>
  );
};

export { default as LoadError } from './error';
export { Spin };