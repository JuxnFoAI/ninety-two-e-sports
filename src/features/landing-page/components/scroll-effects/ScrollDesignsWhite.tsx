import { useEffect } from "react";

import { useEffectiveReducedMotion } from "@/features/accessibility";
import { easeInOutCubic } from "@/shared/lib/easings";

/** Gallery band inside `#disenos` — white veil begins as photos reach mid-viewport. */
const TARGET_ID = "disenos-galeria";
/** CSS var consumed by the home content stack background (0–1). */
export const SCROLL_DESIGNS_WHITE_VAR = "--scroll-designs-white";
/** Full strength reaches pure white on the home stack. */
const MAX_STRENGTH = 1;
/** Distance above mid-viewport over which the veil eases in. */
const FADE_IN_RANGE_VH = 0.62;

/**
 * Option 1 — soft white veil.
 * Eases in as Diseños photos reach mid-viewport, then holds through
 * Patrocinadores / page end. Fades out only when scrolling back up.
 */
export const ScrollDesignsWhite = (): null => {
  const prefersReducedMotion = useEffectiveReducedMotion();

  useEffect(() => {
    const root = document.documentElement;

    if (prefersReducedMotion) {
      root.style.removeProperty(SCROLL_DESIGNS_WHITE_VAR);
      return undefined;
    }

    let frame = 0;

    const update = (): void => {
      const gallery = document.getElementById(TARGET_ID);

      if (!gallery) {
        root.style.setProperty(SCROLL_DESIGNS_WHITE_VAR, "0");
        return;
      }

      const rect = gallery.getBoundingClientRect();
      const galleryCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;

      let raw = 0;

      if (galleryCenter <= viewportCenter) {
        raw = 1;
      } else {
        const distance = galleryCenter - viewportCenter;
        const fadeRange = Math.max(1, window.innerHeight * FADE_IN_RANGE_VH);
        raw = Math.min(1, Math.max(0, 1 - distance / fadeRange));
      }

      root.style.setProperty(
        SCROLL_DESIGNS_WHITE_VAR,
        String(easeInOutCubic(raw) * MAX_STRENGTH),
      );
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
      root.style.removeProperty(SCROLL_DESIGNS_WHITE_VAR);
    };
  }, [prefersReducedMotion]);

  return null;
};
