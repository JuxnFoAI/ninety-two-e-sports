import { forwardRef, useCallback, useImperativeHandle } from "react";
import { motion, useAnimate } from "motion/react";

import { useEffectiveReducedMotion } from "@/features/accessibility";
import type { AnimatedIconHandle, AnimatedIconProps } from "@/shared/icons";

type CloseIconProps = AnimatedIconProps & {
  /** When false, hover is driven by the parent link/button. */
  animateOnHover?: boolean;
};

/**
 * Animated close mark from itshover — the two strokes tilt on hover.
 * Respects the site’s effective reduced-motion setting.
 */
export const CloseIcon = forwardRef<AnimatedIconHandle, CloseIconProps>(
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

    const start = useCallback((): void => {
      if (prefersReducedMotion) {
        return;
      }

      animate(
        ".x-line-1",
        { rotate: 15, scale: 1.1 },
        { duration: 0.2, ease: "easeOut" },
      );
      animate(
        ".x-line-2",
        { rotate: -15, scale: 1.1 },
        { duration: 0.2, ease: "easeOut" },
      );
    }, [animate, prefersReducedMotion]);

    const stop = useCallback((): void => {
      if (prefersReducedMotion) {
        return;
      }

      animate(
        ".x-line-1",
        { rotate: 0, scale: 1 },
        { duration: 0.2, ease: "easeInOut" },
      );
      animate(
        ".x-line-2",
        { rotate: 0, scale: 1 },
        { duration: 0.2, ease: "easeInOut" },
      );
    }, [animate, prefersReducedMotion]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.svg
        ref={scope}
        onHoverStart={animateOnHover ? start : undefined}
        onHoverEnd={animateOnHover ? stop : undefined}
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
      >
        <motion.path
          d="M18 6l-12 12"
          className="x-line-1"
          style={{ transformOrigin: "50% 50%" }}
        />
        <motion.path
          d="M6 6l12 12"
          className="x-line-2"
          style={{ transformOrigin: "50% 50%" }}
        />
      </motion.svg>
    );
  },
);

CloseIcon.displayName = "CloseIcon";
