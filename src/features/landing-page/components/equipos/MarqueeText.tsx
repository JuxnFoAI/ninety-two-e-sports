import { useCallback, useLayoutEffect, useRef, useState, type CSSProperties } from "react";

import { useEffectiveReducedMotion } from "@/features/accessibility";

import styles from "./MarqueeText.module.css";

interface MarqueeTextProps {
  text: string;
  className?: string;
}

const HOLD_AND_FADE_MS = 3800;
const MS_PER_OVERFLOW_PX = 28;

/**
 * If the line does not fit, scroll it left on hover; at the end, wipe out
 * with a clip mask and wipe the start back in.
 */
export const MarqueeText = ({
  text,
  className = "",
}: MarqueeTextProps): JSX.Element => {
  const prefersReducedMotion = useEffectiveReducedMotion();
  const viewportRef = useRef<HTMLSpanElement>(null);
  const trackRef = useRef<HTMLSpanElement>(null);
  const [overflowPx, setOverflowPx] = useState(0);

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) {
      return;
    }

    if (viewport.clientWidth <= 0) {
      return;
    }

    const next = Math.max(0, Math.ceil(track.scrollWidth - viewport.clientWidth));
    setOverflowPx((current) => (current === next ? current : next));
  }, []);

  useLayoutEffect(() => {
    measure();

    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport) {
      return;
    }

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    if (track) {
      observer.observe(track);
    }
    void document.fonts?.ready.then(measure);

    return () => observer.disconnect();
  }, [measure, text]);

  const shouldMarquee = overflowPx > 0 && !prefersReducedMotion;

  return (
    <span
      ref={viewportRef}
      className={`${styles.viewport} ${
        overflowPx > 0 ? styles.overflow : ""
      } ${className}`.trim()}
      style={
        shouldMarquee
          ? ({
              "--marquee-shift": `-${overflowPx}px`,
              "--marquee-duration": `${HOLD_AND_FADE_MS + overflowPx * MS_PER_OVERFLOW_PX}ms`,
            } as CSSProperties)
          : undefined
      }
    >
      <span ref={trackRef} className={styles.track}>
        {text}
      </span>
    </span>
  );
};
