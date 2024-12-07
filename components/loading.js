import BackgroundVideo from "./BackgroundVideo";
import styles from "./loading.module.css";
export default function Loader() {
  return (
    <>
      <BackgroundVideo />
      <div className={styles.loadingContainer}>
        <div className={styles.loader}>
          <svg viewBox="0 0 80 80">
            <circle r="32" cy="40" cx="40" id="test"></circle>
          </svg>
        </div>
        <div className={`${styles.loader} ${styles.triangle}`}>
          <svg viewBox="0 0 86 80">
            <polygon points="43 8 79 72 7 72"></polygon>
          </svg>
        </div>
        <div className={styles.loader}>
          <svg viewBox="0 0 80 80">
            <rect height="64" width="64" y="8" x="8"></rect>
          </svg>
        </div>
      </div>
    </>
  );
}
