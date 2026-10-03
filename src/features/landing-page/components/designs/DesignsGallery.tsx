import { useEffect, useRef, useState, type CSSProperties } from "react";

import { useEffectiveReducedMotion } from "@/features/accessibility";
import { COARSE_LAYOUT_QUERY, useMediaQuery } from "@/shared/hooks";

import { TEAM_DESIGNS } from "../../data/designs";
import type { TeamDesign } from "../../types/design";
import { useRevealSection } from "../reveal/useRevealSection";

import styles from "./DesignsGallery.module.css";

const MARQUEE_DURATION_S = 180;

const nearCardListeners = new Map<Element, () => void>();
let nearCardObserver: IntersectionObserver | null = null;

const ensureNearCardObserver = (): IntersectionObserver => {
  if (nearCardObserver) {
    return nearCardObserver;
  }

  nearCardObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          nearCardListeners.get(entry.target)?.();
        }
      }
    },
    { rootMargin: "480px 280px" },
  );

  return nearCardObserver;
};

interface DesignsGalleryProps {
  /** Wait before the rise-in starts (e.g. near the end of the section header). */
  revealDelayMs?: number;
}

/** Empty frame until the card is close, so a phone does not decode every livery. */
const DeferredDesignCard = ({
  design,
}: {
  design: TeamDesign;
}): JSX.Element => {
  const frameRef = useRef<HTMLElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || near) {
      return undefined;
    }

    const observer = ensureNearCardObserver();
    nearCardListeners.set(frame, () => setNear(true));
    observer.observe(frame);

    return () => {
      nearCardListeners.delete(frame);
      observer.unobserve(frame);
    };
  }, [near]);

  return (
    <figure ref={frameRef} className={styles.card}>
      {near ? (
        <div className={styles.media}>
          <img
            src={design.src}
            alt={design.alt}
            className={styles.image}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            draggable={false}
          />
          <div className={styles.overlay} aria-hidden />
        </div>
      ) : (
        <div className={styles.media} />
      )}
    </figure>
  );
};

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
        fetchPriority={loading === "eager" ? "high" : "low"}
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
  const coarseLayout = useMediaQuery(COARSE_LAYOUT_QUERY);

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

  const cards = TEAM_DESIGNS.map((design) => (
    <DesignCard key={design.id} design={design} loading="lazy" />
  ));

  if (prefersReducedMotion || coarseLayout) {
    return (
      <div className={styles.entranceMask}>
        <div
          className={
            prefersReducedMotion
              ? `${styles.rise} ${styles.riseVisible}`
              : riseClassName
          }
          style={prefersReducedMotion ? undefined : riseStyle}
        >
          <div
            className={styles.viewport}
            role="region"
            aria-label="Diseños del equipo"
          >
            <div className={`${styles.track} ${styles.trackStatic}`}>
              {TEAM_DESIGNS.map((design) => (
                <DeferredDesignCard key={design.id} design={design} />
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
            {cards}
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
