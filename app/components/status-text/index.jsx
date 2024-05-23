import styles from "./styles.module.css";

export function StatusText({ className = "", icon = "", iconClass = "", textClass = "", children, ...rest }) {
  return (
    <div className={`${styles.statusHolder} ${className}`} {...rest}>
      <div className={`${styles.statusIcon} ${iconClass}`}>{icon}</div>
      <div className={`${styles.statusText} ${textClass}`}>{children}</div>
    </div>
  );
}
