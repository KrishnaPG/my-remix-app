import { CheckSquare, ShieldX, AlertTriangle } from "lucide-react";
import { StatusText } from "../status-text";
import styles from "./styles.module.css";

export const resultIcons = {
  Pass: <CheckSquare absoluteStrokeWidth={true} />,
  Fail: <ShieldX absoluteStrokeWidth={true} />,
  Warn: <AlertTriangle absoluteStrokeWidth={true} />,
};

/**
 * Renders the Result Icon
 * @param {string} param0 can be one of ["Pass", "Fail", "Warn"]
 */
export function PassFailWarn({ className = "", result = "Pass", children = result, ...rest }) {
  return (
    <StatusText className={`${styles[result]} ${className}`} icon={resultIcons[result]} iconClass="mr-1" {...rest}>
      {children}
    </StatusText>
  );
}

export { StatusText };
