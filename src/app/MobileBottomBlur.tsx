import styles from "./MobileBottomBlur.module.css";

/** Frosted system band along the bottom edge of the phone screen. */
export const MobileBottomBlur = (): JSX.Element => (
  <div className={styles.bar} aria-hidden="true" />
);
