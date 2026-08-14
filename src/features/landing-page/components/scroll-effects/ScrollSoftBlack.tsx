import { useEffect, useRef } from "react";

import { useEffectiveReducedMotion } from "@/features/accessibility";
import { easeInOutCubic } from "@/shared/lib/easings";

const TARGET_SECTION_ID = "quienes-somos";
/** Shared 0–1 progress for the night settle (veil, navbar, etc.). */
export const SCROLL_SOFT_BLACK_VAR = "--scroll-soft-black";
/** Full night once Quiénes somos has clearly entered the viewport. */
const MAX_OPACITY = 0.9;

/**
 * Soft black settle timed to the start of `#quienes-somos`.
 * Stays clear through the hero; fades in as that section is about to begin.
 */
export const ScrollSoftBlack = (): JSX.Element | null => {
  const veilRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useEffectiveReducedMotion();

  useEffect(() => {
    const veil = veilRef.current;
    const root = document.documentElement;

    if (prefersReducedMotion) {
      root.style.removeProperty(SCROLL_SOFT_BLACK_VAR);
      if (veil) {
        veil.style.opacity = "0";
      }
      return undefined;
    }

    if (!veil) {
      return undefined;
    }

    let frame = 0;

    const update = (): void => {
      const section = document.getElementById(TARGET_SECTION_ID);
      if (!section) {
        root.style.setProperty(SCROLL_SOFT_BLACK_VAR, "0");
        veil.style.opacity = "0";
        return;
      }

      const sectionTop = section.getBoundingClientRect().top;
      // Begin only when the section is about to enter; finish soon after it has.
      const start = window.innerHeight * 0.98;
      const end = window.innerHeight * 0.42;
      const range = Math.max(1, start - end);
      const raw = Math.min(1, Math.max(0, (start - sectionTop) / range));
      const progress = easeInOutCubic(raw);
      root.style.setProperty(SCROLL_SOFT_BLACK_VAR, String(progress));
      veil.style.opacity = String(progress * MAX_OPACITY);
    };

    const scheduleUpdate = (): void => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      root.style.removeProperty(SCROLL_SOFT_BLACK_VAR);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      ref={veilRef}
      className="pointer-events-none fixed inset-0 z-[1] bg-black opacity-0 will-change-[opacity]"
      aria-hidden="true"
    />
  );
};
