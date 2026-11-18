import type { CSSProperties } from "react";

import n2Logo from "@assets/marca/ninety-two.png";

import { useScrollLock } from "@/shared/hooks";

import { FADE_OUT_TRANSITION_MS, LOGO_WIDTH_PX } from "./constants";
import { useLoadingScreen } from "./hooks";
import { LoadingBar } from "./LoadingBar";
import styles from "./LoadingScreen.module.css";
import type { LoadingScreenProps } from "./LoadingScreen.types";

export const LoadingScreen = ({
  duration,
  onComplete,
  onFadeStart,
}: LoadingScreenProps): JSX.Element => {
  const {
    scopeRef,
    logoRef,
    barRef,
    isFading,
    announceLoaded,
    notifyFadeTransitionEnd,
  } = useLoadingScreen({
    duration,
    onComplete,
    onFadeStart,
  });

  useScrollLock(true);

  return (
    <div
      ref={scopeRef}
      className={`${styles.overlay} ${isFading ? styles.overlayFading : ""}`}
      style={
        {
          "--fade-duration": `${FADE_OUT_TRANSITION_MS}ms`,
        } as CSSProperties
      }
      role="dialog"
      aria-modal="true"
      aria-label="Cargando"
      onTransitionEnd={(event) => {
        if (event.target !== event.currentTarget) {
          return;
        }
        if (event.propertyName !== "opacity") {
          return;
        }
        notifyFadeTransitionEnd();
      }}
    >
      <div className={styles.loader}>
        <img
          ref={logoRef}
          className={styles.logo}
          src={n2Logo}
          alt="Ninety Two"
          width={LOGO_WIDTH_PX}
          height={LOGO_WIDTH_PX}
          draggable={false}
        />
        <LoadingBar barRef={barRef} />
      </div>
      <div className={styles.srOnly} role="status" aria-live="polite">
        {announceLoaded ? "Contenido cargado" : ""}
      </div>
    </div>
  );
};
