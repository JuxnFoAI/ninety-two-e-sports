import type { ReactNode } from "react";
import { motion } from "motion/react";

import { useOneWayScrollReveal } from "../../lib/useOneWayScrollReveal";

type AboutScrollRevealProps = {
  as?: "div" | "p" | "h2";
  id?: string;
  className?: string;
  children: ReactNode;
  yFrom?: number;
  xFrom?: number;
  scaleFrom?: number;
  "aria-label"?: string;
};

/** Horizontal slide distance for body copy (px). */
export const ABOUT_TEXT_SLIDE_PX = 36;

/** Semantic wrapper: hidden until scroll, then scrubs in at scroll speed. */
export const AboutScrollReveal = ({
  as = "div",
  id,
  className = "",
  children,
  yFrom,
  xFrom,
  scaleFrom,
  "aria-label": ariaLabel,
}: AboutScrollRevealProps): JSX.Element => {
  const { ref, style } = useOneWayScrollReveal({ yFrom, xFrom, scaleFrom });
  const Component = as === "p" ? motion.p : as === "h2" ? motion.h2 : motion.div;

  return (
    <Component
      ref={ref as never}
      id={id}
      className={className}
      aria-label={ariaLabel}
      style={style}
    >
      {children}
    </Component>
  );
};
