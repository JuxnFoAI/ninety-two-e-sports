import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

import { useEffectiveReducedMotion } from "@/features/accessibility";
import { COARSE_LAYOUT_QUERY, useMediaQuery } from "@/shared/hooks";

import { TEAM_DESIGNS } from "../../data/designs";
import type { TeamDesign } from "../../types/design";
import { useRevealSection } from "../reveal/useRevealSection";

import styles from "./DesignsGallery.module.css";

const MARQUEE_DURATION_S = 180;
const DRAG_THRESHOLD_PX = 8;

type MarqueeDrag = {
  pointerId: number;
  startX: number;
  lastX: number;
  moved: boolean;
};

/** One full set of cards. The track renders two copies so the loop is seamless. */
const marqueeLoopWidth = (track: HTMLElement): number => track.scrollWidth / 2;

/** `progress` is a fraction of one loop, so a later layout change does not jump. */
const applyMarqueeProgress = (track: HTMLElement, progress: number): number => {
  const width = marqueeLoopWidth(track);
  const wrapped = ((progress % 1) + 1) % 1;

  if (width > 0) {
    track.style.transform = `translate3d(${-wrapped * width}px, 0, 0)`;
  }

  return wrapped;
};

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
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<MarqueeDrag | null>(null);
  const progressRef = useRef(0);
  const directionRef = useRef<1 | -1>(1);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || coarseLayout) {
      return undefined;
    }

    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) {
      return undefined;
    }

    let frame = 0;
    let last = performance.now();
    let active = true;
    let onScreen = true;

    const stop = (): void => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const tick = (now: number): void => {
      frame = 0;
      if (!active || !onScreen || document.hidden) {
        return;
      }

      const dt = Math.min(now - last, 64);
      last = now;

      if (!dragRef.current && marqueeLoopWidth(track) > 0) {
        progressRef.current = applyMarqueeProgress(
          track,
          progressRef.current +
            (directionRef.current * dt) / (MARQUEE_DURATION_S * 1000),
        );
      }

      frame = requestAnimationFrame(tick);
    };

    const start = (): void => {
      if (!active || frame !== 0 || !onScreen || document.hidden) {
        return;
      }

      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) {
        start();
        return;
      }

      stop();
    });
    const onVisibility = (): void => {
      if (document.hidden) {
        stop();
        return;
      }

      start();
    };

    observer.observe(viewport);
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      active = false;
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      track.style.transform = "";
    };
  }, [coarseLayout, prefersReducedMotion]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>): void => {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();
    viewportRef.current?.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      lastX: event.clientX,
      moved: false,
    };
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>): void => {
    const drag = dragRef.current;
    const track = trackRef.current;
    if (!drag || !track || event.pointerId !== drag.pointerId) {
      return;
    }

    const dx = event.clientX - drag.lastX;
    drag.lastX = event.clientX;
    if (Math.abs(event.clientX - drag.startX) < DRAG_THRESHOLD_PX) {
      return;
    }

    if (!drag.moved) {
      drag.moved = true;
      setDragging(true);
    }

    const width = marqueeLoopWidth(track);
    if (width <= 0) {
      return;
    }

    progressRef.current = applyMarqueeProgress(
      track,
      progressRef.current - dx / width,
    );
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }

    event.preventDefault();
    directionRef.current = event.key === "ArrowRight" ? -1 : 1;
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>): void => {
    const drag = dragRef.current;
    if (!drag || event.pointerId !== drag.pointerId) {
      return;
    }

    if (drag.moved) {
      directionRef.current = event.clientX - drag.startX > 0 ? -1 : 1;
    }

    if (viewportRef.current?.hasPointerCapture(event.pointerId)) {
      viewportRef.current.releasePointerCapture(event.pointerId);
    }

    dragRef.current = null;
    setDragging(false);
  };

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

  const cards = TEAM_DESIGNS.map((design) => (
    <DesignCard key={design.id} design={design} loading="lazy" />
  ));

  return (
    <div className={styles.entranceMask}>
      <div className={riseClassName} style={riseStyle}>
        <div
          ref={viewportRef}
          className={`${styles.viewport} ${styles.viewportMarquee} ${
            dragging ? styles.viewportDragging : ""
          }`.trim()}
          role="region"
          aria-label="Diseños del equipo en desplazamiento continuo. Arrastra, o usa las flechas del teclado, para moverlos a la izquierda o a la derecha."
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onDragStart={(event) => event.preventDefault()}
        >
          <div ref={trackRef} className={styles.track}>
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
