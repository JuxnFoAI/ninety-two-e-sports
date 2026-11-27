import { useEffect, useRef } from "react";

import { useEffectiveReducedMotion } from "@/features/accessibility";
import { easeInOutCubic } from "@/shared/lib/easings";

import {
  clearDesignsWhiteStrength,
  computeDesignsWhiteProgress,
  writeDesignsWhiteStrength,
} from "../../lib/designsWhiteScroll";

import styles from "./DesignsWhiteScroll.module.css";

/**
 * Transición noche ↔ blanco en el stack (sin morph ni GSAP).
 * Un marcador invisible entre Quiénes somos y Diseños guía el scroll.
 */
export const DesignsWhiteScroll = (): JSX.Element => {
  const prefersReducedMotion = useEffectiveReducedMotion();
  const markerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker) {
      return undefined;
    }

    let frame = 0;

    const update = (): void => {
      const raw = computeDesignsWhiteProgress(marker, window.innerHeight);

      if (prefersReducedMotion) {
        writeDesignsWhiteStrength(raw >= 0.55 ? 1 : 0);
        return;
      }

      writeDesignsWhiteStrength(easeInOutCubic(raw));
    };

    const schedule = (): void => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      clearDesignsWhiteStrength();
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={markerRef}
      className={styles.marker}
      data-designs-white-bridge
      aria-hidden="true"
    />
  );
};
