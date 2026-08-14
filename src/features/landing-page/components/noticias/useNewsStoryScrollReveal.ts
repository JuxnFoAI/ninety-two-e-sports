import { useLayoutEffect, useRef, useState } from "react";
import { useMotionValue, useScroll, useTransform } from "motion/react";

import { useEffectiveReducedMotion } from "@/features/accessibility";

const PHOTO_RANGE = [0, 0.4];
const TITLE_RANGE = [0.34, 0.7];
const BODY_RANGE = [0.55, 1];

const PHOTO_Y_FROM = 32;
const COPY_Y_FROM = 18;

/**
 * Scroll-scrubbed reveal for one news story.
 * Fast scroll completes the sequence just as fast; progress only advances
 * downward so already-shown pieces stay visible when scrolling up.
 */
export const useNewsStoryScrollReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useEffectiveReducedMotion();
  const [settled, setSettled] = useState(false);
  const revealProgress = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.92", "start 0.4"],
  });

  useLayoutEffect(() => {
    const apply = (value: number): void => {
      if (value > revealProgress.get()) {
        revealProgress.set(value);
      }
      if (value >= 0.999) {
        setSettled(true);
      }
    };

    apply(scrollYProgress.get());
    return scrollYProgress.on("change", apply);
  }, [revealProgress, scrollYProgress]);

  const photoOpacity = useTransform(revealProgress, PHOTO_RANGE, [0, 1]);
  const photoY = useTransform(revealProgress, PHOTO_RANGE, [PHOTO_Y_FROM, 0]);
  const titleOpacity = useTransform(revealProgress, TITLE_RANGE, [0, 1]);
  const titleY = useTransform(revealProgress, TITLE_RANGE, [COPY_Y_FROM, 0]);
  const bodyOpacity = useTransform(revealProgress, BODY_RANGE, [0, 1]);
  const bodyY = useTransform(revealProgress, BODY_RANGE, [COPY_Y_FROM, 0]);

  if (prefersReducedMotion || settled) {
    return { containerRef };
  }

  return {
    containerRef,
    photoStyle: { opacity: photoOpacity, y: photoY },
    titleStyle: { opacity: titleOpacity, y: titleY },
    bodyStyle: { opacity: bodyOpacity, y: bodyY },
  };
};
