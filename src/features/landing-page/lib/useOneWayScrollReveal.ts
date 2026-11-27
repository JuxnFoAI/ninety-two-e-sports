import { useLayoutEffect, useRef, useState } from "react";
import {
  useMotionValue,
  useScroll,
  useTransform,
  type UseScrollOptions,
} from "motion/react";

import { useEffectiveReducedMotion } from "@/features/accessibility";

/** About copy: the element top travels from 92% to 40% of the viewport. */
const DEFAULT_OFFSET: UseScrollOptions["offset"] = ["start 0.92", "start 0.4"];

type OneWayScrollRevealOptions = {
  yFrom?: number;
  xFrom?: number;
  scaleFrom?: number;
  /** Scroll span that maps to progress 0 → 1. Defaults to the about-copy range. */
  offset?: UseScrollOptions["offset"];
};

/**
 * Scroll-scrubbed reveal that only advances downward.
 * Fast scroll completes it just as fast; already-shown pieces stay visible.
 */
export const useOneWayScrollReveal = ({
  yFrom,
  xFrom,
  scaleFrom,
  offset = DEFAULT_OFFSET,
}: OneWayScrollRevealOptions = {}) => {
  // `| null` in the generic keeps `.current` writable. `useRef<HTMLElement>(null)` is read-only.
  const ref = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useEffectiveReducedMotion();
  const [settled, setSettled] = useState(false);
  const progress = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  useLayoutEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    const apply = (value: number): void => {
      if (value > progress.get()) {
        progress.set(value);
      }
      if (value >= 0.999) {
        setSettled(true);
      }
    };

    apply(scrollYProgress.get());
    return scrollYProgress.on("change", apply);
  }, [prefersReducedMotion, progress, scrollYProgress]);

  const opacity = useTransform(progress, [0, 1], [0, 1]);
  const y = useTransform(progress, [0, 1], [yFrom ?? 0, 0]);
  const x = useTransform(progress, [0, 1], [xFrom ?? 0, 0]);
  const scale = useTransform(progress, [0, 1], [scaleFrom ?? 1, 1]);

  if (prefersReducedMotion) {
    return { ref, progress, settled: true, prefersReducedMotion };
  }

  if (settled) {
    return {
      ref,
      progress,
      settled,
      prefersReducedMotion,
      style: { opacity: 1 },
    };
  }

  return {
    ref,
    progress,
    settled,
    prefersReducedMotion,
    style: {
      opacity,
      ...(yFrom != null ? { y } : {}),
      ...(xFrom != null ? { x } : {}),
      ...(scaleFrom != null ? { scale } : {}),
    },
  };
};
