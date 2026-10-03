import { useEffect, useRef, useState, type RefObject } from "react";

import { isRevealTargetVisible } from "@/shared/lib/revealVisibility";
import { subscribeViewportActivity } from "@/shared/lib/viewportActivity";

import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

interface UseIntersectionRevealOptions {
  rootMargin?: string;
  threshold?: number;
  triggerOnce?: boolean;
  /** Skip observation and show immediately (accessibility reduced motion). */
  disabled?: boolean;
}

interface IntersectionRevealResult<T extends HTMLElement> {
  isVisible: boolean;
  ref: RefObject<T>;
}

const DEFAULT_THRESHOLD = 0.12;
const DEFAULT_ROOT_MARGIN = "0px 0px -5% 0px";

/**
 * Observes an element and flips `isVisible` when it enters the viewport.
 * Respects `prefers-reduced-motion` by revealing immediately.
 * Tall targets (mobile rosters) reveal from a slice of the screen, because a
 * ratio of their own height can be larger than the viewport.
 */
export const useIntersectionReveal = <T extends HTMLElement = HTMLElement>({
  rootMargin = DEFAULT_ROOT_MARGIN,
  threshold = DEFAULT_THRESHOLD,
  triggerOnce = true,
  disabled = false,
}: UseIntersectionRevealOptions = {}): IntersectionRevealResult<T> => {
  const ref = useRef<T>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const revealImmediately = disabled || prefersReducedMotion;
  const [isVisible, setIsVisible] = useState(revealImmediately);

  useEffect(() => {
    if (revealImmediately) {
      setIsVisible(true);
      return undefined;
    }

    const element = ref.current;
    if (!element) {
      return undefined;
    }

    let revealed = false;

    const meetsThreshold = (): boolean =>
      isRevealTargetVisible(
        element.getBoundingClientRect(),
        window.innerWidth,
        window.innerHeight,
        threshold,
      );

    const stop = (): void => {
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("hashchange", scheduleSync);
      unsubscribeViewport();
    };

    const reveal = (): void => {
      if (revealed) {
        return;
      }

      revealed = true;
      setIsVisible(true);

      if (triggerOnce) {
        stop();
      }
    };

    const syncIfAlreadyVisible = (): void => {
      if (meetsThreshold()) {
        reveal();
      }
    };

    const observer = new IntersectionObserver(
      () => {
        if (meetsThreshold()) {
          reveal();
          return;
        }

        if (!triggerOnce && !meetsThreshold()) {
          setIsVisible(false);
        }
      },
      // Any pixel schedules a check. The ratio test above decides visibility,
      // so a roster taller than the screen can still reveal.
      { rootMargin, threshold: 0 },
    );

    const resizeObserver = new ResizeObserver(() => {
      syncIfAlreadyVisible();
    });

    const scheduleSync = (): void => {
      requestAnimationFrame(syncIfAlreadyVisible);
    };

    const unsubscribeViewport = subscribeViewportActivity(syncIfAlreadyVisible);

    observer.observe(element);
    resizeObserver.observe(element);
    requestAnimationFrame(syncIfAlreadyVisible);

    window.addEventListener("hashchange", scheduleSync);

    return () => {
      stop();
    };
  }, [revealImmediately, rootMargin, threshold, triggerOnce]);

  return { isVisible, ref };
};
