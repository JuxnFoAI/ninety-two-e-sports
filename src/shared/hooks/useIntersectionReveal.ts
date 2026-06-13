import { useEffect, useRef, useState, type RefObject } from "react";

import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

interface UseIntersectionRevealOptions {
  rootMargin?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

interface IntersectionRevealResult<T extends HTMLElement> {
  isVisible: boolean;
  ref: RefObject<T>;
}

const DEFAULT_THRESHOLD = 0.12;
const DEFAULT_ROOT_MARGIN = "0px 0px -5% 0px";

const meetsVisibilityThreshold = (
  element: HTMLElement,
  threshold: number,
): boolean => {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;
  const visibleHeight =
    Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
  const visibleWidth =
    Math.min(rect.right, viewportWidth) - Math.max(rect.left, 0);

  if (visibleHeight <= 0 || visibleWidth <= 0) {
    return false;
  }

  const visibleArea = visibleHeight * visibleWidth;
  const totalArea = rect.height * rect.width;

  return totalArea > 0 && visibleArea / totalArea >= threshold;
};

/**
 * Observes an element and flips `isVisible` when it enters the viewport.
 * Respects `prefers-reduced-motion` by revealing immediately.
 */
export const useIntersectionReveal = <T extends HTMLElement = HTMLElement>({
  rootMargin = DEFAULT_ROOT_MARGIN,
  threshold = DEFAULT_THRESHOLD,
  triggerOnce = true,
}: UseIntersectionRevealOptions = {}): IntersectionRevealResult<T> => {
  const ref = useRef<T>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isVisible, setIsVisible] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return undefined;
    }

    const element = ref.current;
    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          return;
        }

        if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { rootMargin, threshold },
    );

    const reveal = (): void => {
      setIsVisible(true);

      if (triggerOnce) {
        observer.disconnect();
      }
    };

    const syncIfAlreadyVisible = (): void => {
      if (meetsVisibilityThreshold(element, threshold)) {
        reveal();
      }
    };

    observer.observe(element);

    // Hash links / restored scroll: section may already be in view before IO fires.
    requestAnimationFrame(syncIfAlreadyVisible);
    const syncAfterScroll = (): void => {
      requestAnimationFrame(syncIfAlreadyVisible);
    };

    window.addEventListener("hashchange", syncAfterScroll);
    window.addEventListener("load", syncAfterScroll, { once: true });

    let scrollTimer = 0;
    const onScroll = (): void => {
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(syncIfAlreadyVisible, 120);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", syncAfterScroll);
      window.removeEventListener("load", syncAfterScroll);
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(scrollTimer);
    };
  }, [prefersReducedMotion, rootMargin, threshold, triggerOnce]);

  return { isVisible, ref };
};
