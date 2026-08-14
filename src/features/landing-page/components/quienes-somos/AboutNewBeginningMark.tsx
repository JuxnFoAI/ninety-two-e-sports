import { motion, useTransform } from "motion/react";

import { useOneWayScrollReveal } from "../../lib/useOneWayScrollReveal";

import styles from "./AboutNewBeginningMark.module.css";

/**
 * “UN NUEVO COMIENZO” — hidden until scroll, then scrubs in at scroll speed.
 * Already-shown text stays visible when scrolling up.
 */
export const AboutNewBeginningMark = (): JSX.Element => {
  const { ref, progress, settled, prefersReducedMotion } =
    useOneWayScrollReveal({ yFrom: 22 });

  const opacity = useTransform(progress, [0, 0.4, 1], [0, 0.9, 1]);
  const y = useTransform(progress, [0, 1], [22, 0]);
  const scale = useTransform(progress, [0, 1], [0.94, 1]);
  const blur = useTransform(progress, [0, 0.55, 1], [5, 1.2, 0]);
  const letterSpacing = useTransform(
    progress,
    [0, 1],
    ["0.32em", "0.14em"],
  );
  const filter = useTransform(blur, (value) => `blur(${value}px)`);

  if (prefersReducedMotion) {
    return (
      <p className={`${styles.root} ${styles.visible}`.trim()}>
        Un nuevo comienzo
      </p>
    );
  }

  return (
    <motion.p
      ref={ref as never}
      className={`${styles.scrollRoot} ${settled ? styles.settled : ""}`.trim()}
      style={
        settled
          ? undefined
          : { opacity, y, scale, filter, letterSpacing }
      }
    >
      Un nuevo comienzo
    </motion.p>
  );
};
