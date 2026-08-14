import { useLayoutEffect, useRef, useState } from "react";
import { useMotionValue, useScroll, useTransform } from "motion/react";

import { useEffectiveReducedMotion } from "@/features/accessibility";

type OneWayScrollRevealOptions = {
  yFrom?: number;
  xFrom?: number;
  scaleFrom?: number;
};

/**
 * Scroll-scrubbed reveal that only advances downward.
 * Fast scroll completes it just as fast; already-shown pieces stay visible.
 */
export const useOneWayScrollReveal = ({
  yFrom,
  xFrom,
  scaleFrom,
}: OneWayScrollRevealOptions = {}) => {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useEffectiveReducedMotion();
  const [settled, setSettled] = useState(false);
  const progress = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.4"],
  });

  useLayoutEffect(() => {
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
  }, [progress, scrollYProgress]);

  const opacity = useTransform(progress, [0, 1], [0, 1]);
  const y = useTransform(progress, [0, 1], [yFrom ?? 0, 0]);
  const x = useTransform(progress, [0, 1], [xFrom ?? 0, 0]);
  const scale = useTransform(progress, [0, 1], [scaleFrom ?? 1, 1]);

  if (prefersReducedMotion || settled) {
    return { ref, progress, settled, prefersReducedMotion };
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
