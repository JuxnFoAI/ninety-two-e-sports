import { useCallback } from "react";
import { motion, useTransform } from "motion/react";

import { useEffectiveReducedMotion } from "@/features/accessibility";
import { COARSE_LAYOUT_QUERY, useMediaQuery } from "@/shared/hooks";

import { useOneWayScrollReveal } from "../../lib/useOneWayScrollReveal";
import { useCoarseReveal } from "../reveal/useCoarseReveal";
import { useRevealSection } from "../reveal/useRevealSection";

import styles from "./AboutNewBeginningMark.module.css";

const MARK_TEXT = "Un nuevo comienzo";

/**
 * “UN NUEVO COMIENZO” — hidden until scroll, then scrubs in at scroll speed.
 * Already-shown text stays visible when scrolling up.
 * Touch layouts fade opacity once: blur and letter-spacing would repaint every frame.
 */
export const AboutNewBeginningMark = (): JSX.Element => {
  const coarseLayout = useMediaQuery(COARSE_LAYOUT_QUERY);
  const prefersReducedMotion = useEffectiveReducedMotion();

  if (prefersReducedMotion) {
    return (
      <p className={`${styles.root} ${styles.visible}`.trim()}>{MARK_TEXT}</p>
    );
  }

  if (coarseLayout) {
    return <CoarseMark />;
  }

  return <ScrubMark />;
};

/** One opacity fade when the line is about to enter. No per-frame styles. */
const CoarseMark = (): JSX.Element => {
  const sectionVisible = useRevealSection();
  const coarse = useCoarseReveal(sectionVisible, false, 0);
  const playing = coarse.revealed && !coarse.settled;

  return (
    <p
      ref={coarse.ref}
      className={
        coarse.settled
          ? `${styles.root} ${styles.visible}`
          : playing
            ? `${styles.root} ${styles.fadePlay}`
            : styles.root
      }
      style={playing ? { animationDelay: `${coarse.delayMs}ms` } : undefined}
    >
      {MARK_TEXT}
    </p>
  );
};

/** Desktop scrub: opacity, rise, blur, and tracking follow the scroll. */
const ScrubMark = (): JSX.Element => {
  const { ref, progress, settled } = useOneWayScrollReveal({ yFrom: 22 });
  const setRef = useCallback(
    (node: HTMLParagraphElement | null) => {
      ref.current = node;
    },
    [ref],
  );

  const opacity = useTransform(progress, [0, 0.4, 1], [0, 0.9, 1]);
  const y = useTransform(progress, [0, 1], [22, 0]);
  const scale = useTransform(progress, [0, 1], [0.94, 1]);
  const blur = useTransform(progress, [0, 0.55, 1], [5, 1.2, 0]);
  const letterSpacing = useTransform(progress, [0, 1], ["0.32em", "0.14em"]);
  const filter = useTransform(blur, (value) => `blur(${value}px)`);

  return (
    <motion.p
      ref={setRef}
      className={`${styles.scrollRoot} ${settled ? styles.settled : ""}`.trim()}
      style={settled ? undefined : { opacity, y, scale, filter, letterSpacing }}
    >
      {MARK_TEXT}
    </motion.p>
  );
};
