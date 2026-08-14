import { forwardRef, useImperativeHandle } from "react";
import { motion, useAnimate } from "motion/react";

import { useEffectiveReducedMotion } from "@/features/accessibility";
import type { AnimatedIconHandle, AnimatedIconProps } from "@/shared/icons";

type TwitterXIconProps = AnimatedIconProps & {
  /** When false, hover is driven by the parent link/button. */
  animateOnHover?: boolean;
};

/**
 * Animated X (Twitter) mark from itshover — scale/tilt pulse on hover.
 * Respects the site’s effective reduced-motion setting.
 */
export const TwitterXIcon = forwardRef<AnimatedIconHandle, TwitterXIconProps>(
  (
    {
      size = 20,
      color = "currentColor",
      strokeWidth = 1.85,
      className = "block shrink-0",
      animateOnHover = true,
    },
    ref,
  ) => {
    const prefersReducedMotion = useEffectiveReducedMotion();
    const [scope, animate] = useAnimate();

    const start = async (): Promise<void> => {
      if (prefersReducedMotion) {
        return;
      }

      await animate(
        ".x-icon",
        { scale: [1, 1.1, 1], rotate: [0, -10, 10, 0] },
        { duration: 0.5, ease: "easeInOut" },
      );
    };

    const stop = (): void => {
      if (prefersReducedMotion) {
        return;
      }

      animate(
        ".x-icon",
        { scale: 1, rotate: 0 },
        { duration: 0.2, ease: "easeOut" },
      );
    };

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.svg
        ref={scope}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
        onHoverStart={animateOnHover ? start : undefined}
        onHoverEnd={animateOnHover ? stop : undefined}
      >
        <motion.g className="x-icon" style={{ transformOrigin: "center" }}>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
        </motion.g>
      </motion.svg>
    );
  },
);

TwitterXIcon.displayName = "TwitterXIcon";
