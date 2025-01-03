import styles from "./alert.module.css";
export default function Alert({ message, bgColor, textColor }) {
  return (
    <div className={styles.alert} style={{ backgroundColor: bgColor }}>
      <svg viewBox="0 0 512 512" fill="white" height="1.8rem" width="1.8rem">
        <path
          fill="none"
          stroke="white"
          strokeMiterlimit={10}
          strokeWidth={32}
          d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
        />
        <path
          fill="none"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={32}
          d="M250.26 166.05L256 288l5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 6z"
        />
        <path d="M256 367.91a20 20 0 1120-20 20 20 0 01-20 20z" />
      </svg>
      <p style={{ color: textColor }}>{message}</p>
    </div>
  );
}
