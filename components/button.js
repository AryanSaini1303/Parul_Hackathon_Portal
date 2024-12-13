import styles from "./button.module.css";
export default function Button({
  text,
  onClick,
  width,
  position,
  top,
  right,
  margin,
  fontSize,
}) {
  return (
    <button
      onClick={onClick}
      className={styles.btn}
      style={{
        width: width,
        position: position,
        top: top,
        right: right,
        margin: margin,
        fontSize: fontSize,
      }}
    >
      {text}
    </button>
  );
}
