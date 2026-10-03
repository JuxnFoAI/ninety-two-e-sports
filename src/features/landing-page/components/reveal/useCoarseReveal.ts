import { useCallback, useEffect, useRef, useState } from "react";

import { COARSE_LAYOUT_QUERY, useMediaQuery } from "@/shared/hooks";

const REVEAL_MS = 850;
const SCROLL_IN_DELAY_MS = 70;

type NearWatcher = {
  element: Element;
  notify: () => void;
};

const nearWatchers = new Set<NearWatcher>();
let nearObserver: IntersectionObserver | null = null;

const ensureNearObserver = (): IntersectionObserver => {
  if (nearObserver) {
    return nearObserver;
  }

  nearObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue;
        }

        for (const watcher of nearWatchers) {
          if (watcher.element === entry.target) {
            watcher.notify();
          }
        }
      }
    },
    { rootMargin: "10% 0px 10% 0px", threshold: 0 },
  );

  return nearObserver;
};

/** Shared observer so a roster of cards does not add one scroll listener each. */
const watchNearViewport = (
  element: HTMLElement,
  notify: () => void,
): (() => void) => {
  const watcher = { element, notify };
  nearWatchers.add(watcher);
  ensureNearObserver().observe(element);

  return () => {
    nearWatchers.delete(watcher);
    nearObserver?.unobserve(element);

    if (nearWatchers.size === 0 && nearObserver) {
      nearObserver.disconnect();
      nearObserver = null;
    }
  };
};

const isNearViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  if (rect.width <= 0 || rect.height <= 0 || viewportHeight <= 0) {
    return false;
  }

  return (
    rect.bottom > viewportHeight * -0.08 && rect.top < viewportHeight * 1.1
  );
};

interface CoarseRevealState {
  ref: (node: HTMLElement | null) => void;
  revealed: boolean;
  settled: boolean;
  delayMs: number;
}

/**
 * On touch layouts, start each item only when it is about to enter the screen.
 * Mobile Safari drops CSS animations that begin off-screen and can leave
 * `animation-fill-mode: both` stuck at opacity 0 — the equipos cards.
 */
export const useCoarseReveal = (
  sectionVisible: boolean,
  prefersReducedMotion: boolean,
  choreographedDelayMs: number,
): CoarseRevealState => {
  const coarseLayout = useMediaQuery(COARSE_LAYOUT_QUERY);
  const nodeRef = useRef<HTMLElement | null>(null);
  const [phase, setPhase] = useState<"wait" | "play" | "settled">("wait");
  const [delayMs, setDelayMs] = useState(choreographedDelayMs);
  const gateOnScreen = coarseLayout && !prefersReducedMotion;

  const ref = useCallback((node: HTMLElement | null) => {
    nodeRef.current = node;
  }, []);

  useEffect(() => {
    if (!gateOnScreen) {
      return undefined;
    }

    if (!sectionVisible) {
      setPhase("wait");
      return undefined;
    }

    const element = nodeRef.current;
    if (!element) {
      return undefined;
    }

    let played = false;
    let disposed = false;
    let settleTimer = 0;
    let stopWatching = (): void => {};

    const play = (delay: number): void => {
      if (played || disposed) {
        return;
      }

      played = true;
      stopWatching();
      setDelayMs(delay);
      setPhase("play");
      settleTimer = window.setTimeout(
        () => {
          if (!disposed) {
            setPhase("settled");
          }
        },
        delay + REVEAL_MS + 90,
      );
    };

    stopWatching = watchNearViewport(element, () => {
      play(SCROLL_IN_DELAY_MS);
    });

    if (isNearViewport(element)) {
      play(choreographedDelayMs);
    }

    return () => {
      disposed = true;
      stopWatching();
      window.clearTimeout(settleTimer);
    };
  }, [choreographedDelayMs, gateOnScreen, sectionVisible]);

  return {
    ref,
    revealed: gateOnScreen ? phase !== "wait" : sectionVisible,
    settled: gateOnScreen && phase === "settled",
    delayMs: gateOnScreen ? delayMs : choreographedDelayMs,
  };
};
