import { useId } from "react";
import styles from "./styles.module.css";

export default function TitledFolderBox({
  className = "",
  contentBarOptions = {},
  title = "Title",
  titleClass = "",
  children = "Sample Content",
  ...rest
}) {
  const id = useId();
  return (
    <div className={`${styles["titled-folder-box"]} ${className}`} {...rest}>
      <label className={`${styles.title} ${titleClass}`} htmlFor={`titledFolderBox-${id}`}>
        {title}
      </label>
      <div {...contentBarOptions} id={`titledFolderBox-${id}`}>
        {children}
      </div>
    </div>
  );
}
