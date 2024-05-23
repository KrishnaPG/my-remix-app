import styles from "./styles.module.css";

export default function TitledBox({
  containerClass = "",
  titleClass = "",
  contentClass = "",
  title = "Title",
  children = "Sample Content",
}) {
  return (
    <div className={`${styles["titled-box"]} ${containerClass}`}>
      <div className={`${styles.title} ${titleClass}`}>{title}</div>
      <div className={`${styles.content} ${contentClass}`}>{children}</div>
    </div>
  );
}
