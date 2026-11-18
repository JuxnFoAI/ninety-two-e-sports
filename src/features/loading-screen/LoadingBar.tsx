import type { RefObject } from "react";

import styles from "./LoadingScreen.module.css";

interface LoadingBarProps {
  barRef: RefObject<HTMLDivElement>;
}

export const LoadingBar = ({ barRef }: LoadingBarProps): JSX.Element => {
  return (
    <div
      ref={barRef}
      className={styles.bar}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progreso de carga"
    >
      <div className={styles.track} data-track>
        <div className={styles.fill} data-fill />
        <div className={styles.core} data-core>
          <span className={styles.coreDiamond} />
        </div>
      </div>
    </div>
  );
};
