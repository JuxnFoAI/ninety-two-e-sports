import { useCallback, type ReactNode } from "react";
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
  const setRef = useCallback(
    (node: HTMLElement | null) => {
      ref.current = node;
    },
    [ref],
  );
  const shared = {
    ref: setRef,
    id,
    className,
    "aria-label": ariaLabel,
    style,
  };

  if (as === "p") {
    return <motion.p {...shared}>{children}</motion.p>;
  }

  if (as === "h2") {
    return <motion.h2 {...shared}>{children}</motion.h2>;
  }

  return <motion.div {...shared}>{children}</motion.div>;
};
