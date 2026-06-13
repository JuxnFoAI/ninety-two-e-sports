import n2Logo from "@assets/marca/ninety-two.png";
import { LOGO_WIDTH_PX } from "./constants";
import { useLoadingScreen } from "./hooks";
import styles from "./LoadingScreen.module.css";
import type { LoadingScreenProps } from "./LoadingScreen.types";

export const LoadingScreen = ({
  duration,
  onComplete,
}: LoadingScreenProps): JSX.Element => {
  const { canvasRef, logoRef, isFading, announceLoaded, progress } =
    useLoadingScreen({
      duration,
      onComplete,
    });

  const progressPercent = Math.round(progress * 100);

  return (
    <div
      className={`${styles.overlay} ${isFading ? styles.overlayFading : ""}`}
      aria-hidden={isFading}
    >
      <div
        className={`${styles.loader} ${isFading ? styles.loaderFading : ""}`}
        role="status"
        aria-label="Cargando"
      >
        <div className={styles.stage}>
          <canvas
            ref={canvasRef}
            className={styles.canvas}
            aria-hidden="true"
          />
          <img
            ref={logoRef}
            className={styles.logo}
            src={n2Logo}
            alt="Ninety Two"
            width={LOGO_WIDTH_PX}
            height={LOGO_WIDTH_PX}
            draggable={false}
          />
        </div>
        <div
          className={styles.progress}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progressPercent}
          aria-label="Progreso de carga"
        >
          <div
            className={styles.progressFill}
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </div>
      <div className={styles.srOnly} role="status" aria-live="polite">
        {announceLoaded ? "Contenido cargado" : ""}
      </div>
    </div>
  );
};
