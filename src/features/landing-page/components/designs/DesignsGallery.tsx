import type { CSSProperties } from "react";

import { useEffectiveReducedMotion } from "@/features/accessibility";

import { TEAM_DESIGNS } from "../../data/designs";
import type { TeamDesign } from "../../types/design";
import { useRevealSection } from "../reveal/useRevealSection";

import styles from "./DesignsGallery.module.css";

const MARQUEE_DURATION_S = 180;

interface DesignsGalleryProps {
  /** Wait before the rise-in starts (e.g. near the end of the section header). */
  revealDelayMs?: number;
}

const DesignCard = ({
  design,
  loading,
  inertForAssistiveTech = false,
}: {
  design: TeamDesign;
  loading: "lazy" | "eager";
  inertForAssistiveTech?: boolean;
}): JSX.Element => (
  <figure
    className={styles.card}
    aria-hidden={inertForAssistiveTech || undefined}
  >
    <div className={styles.media}>
      <img
        src={design.src}
        alt={inertForAssistiveTech ? "" : design.alt}
        className={styles.image}
        loading={loading}
        decoding="async"
        draggable={false}
      />
      <div className={styles.overlay} aria-hidden />
    </div>
  </figure>
);

export const DesignsGallery = ({
  revealDelayMs = 0,
}: DesignsGalleryProps): JSX.Element => {
  const isVisible = useRevealSection();
  const prefersReducedMotion = useEffectiveReducedMotion();

  const riseClassName = `${styles.rise} ${
    isVisible
      ? prefersReducedMotion
        ? styles.riseVisible
        : styles.riseAnimated
      : ""
  }`;

  const riseStyle =
    isVisible && !prefersReducedMotion && revealDelayMs > 0
      ? ({ animationDelay: `${revealDelayMs}ms` } as CSSProperties)
      : undefined;

  if (prefersReducedMotion) {
    return (
      <div className={styles.entranceMask}>
        <div className={`${styles.rise} ${styles.riseVisible}`}>
          <div
            className={styles.viewport}
            role="region"
            aria-label="Diseños del equipo"
          >
            <div className={`${styles.track} ${styles.trackStatic}`}>
              {TEAM_DESIGNS.map((design) => (
                <DesignCard key={design.id} design={design} loading="lazy" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.entranceMask}>
      <div className={riseClassName} style={riseStyle}>
        <div
          className={styles.viewport}
          role="region"
          aria-label="Diseños del equipo en desplazamiento continuo"
          style={
            {
              "--designs-marquee-duration": `${MARQUEE_DURATION_S}s`,
            } as CSSProperties
          }
        >
          <div className={`${styles.track} ${styles.trackAnimated}`}>
            {TEAM_DESIGNS.map((design) => (
              <DesignCard key={design.id} design={design} loading="eager" />
            ))}
            {TEAM_DESIGNS.map((design) => (
              <DesignCard
                key={`${design.id}-loop`}
                design={design}
                loading="lazy"
                inertForAssistiveTech
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
