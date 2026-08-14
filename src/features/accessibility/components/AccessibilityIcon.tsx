import { forwardRef, useImperativeHandle, useRef } from "react";
import { motion, useAnimate } from "motion/react";

import { useEffectiveReducedMotion } from "../hooks/useAccessibilityMedia";
import type {
  AnimatedIconHandle,
  AnimatedIconProps,
  IconEasing,
} from "@/shared/icons";

type CustomAnimation = {
  rotateFrom?: number;
  rotateTo?: number;
  duration?: number;
  ease?: IconEasing;
  personDuration?: number;
  personEase?: IconEasing;
  exitDuration?: number;
  /** When false, hover is driven by the parent (e.g. the trigger button). */
  animateOnHover?: boolean;
};

/**
 * Animated accessibility mark from itshover — wheel spins / person bobs on hover.
 * Respects the site’s effective reduced-motion setting.
 */
export const AccessibilityIcon = forwardRef<
  AnimatedIconHandle,
  AnimatedIconProps & CustomAnimation
>(
  (
    {
      size = 18,
      color = "currentColor",
      strokeWidth = 1.6,
      className = "block",
      rotateFrom = 0,
      rotateTo = 360,
      duration = 1,
      ease = "easeInOut",
      personDuration = 0.6,
      personEase = "easeInOut",
      exitDuration = 0.3,
      animateOnHover = true,
    },
    ref,
  ) => {
    const prefersReducedMotion = useEffectiveReducedMotion();
    const [scope, animate] = useAnimate();
    const animationControls = useRef<Array<ReturnType<typeof animate>>>([]);

    const start = async (): Promise<void> => {
      if (prefersReducedMotion) {
        return;
      }

      animationControls.current.forEach((control) => control.stop());
      animationControls.current = [];

      animationControls.current.push(
        animate(
          ".wheel",
          { rotate: [rotateFrom, rotateTo] },
          { duration, ease, repeat: Infinity },
        ),
      );
      animate(
        ".person",
        { y: [0, -2, 0] },
        { duration: personDuration, ease: personEase },
      );
    };

    const stop = (): void => {
      animationControls.current.forEach((control) => control.stop());
      animationControls.current = [];

      if (prefersReducedMotion) {
        return;
      }

      animate(".wheel", { rotate: 0 }, { duration: exitDuration });
      animate(".person", { y: 0 }, { duration: exitDuration });
    };

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
        <motion.circle className="person" cx="16" cy="4" r="1" />
        <motion.path className="person" d="m18 19 1-7-6 1" />
        <motion.path className="person" d="m5 8 3-3 5.5 3-2.36 3.5" />
        <motion.g className="wheel" style={{ transformOrigin: "8.5px 17.5px" }}>
          <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />
          <path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
        </motion.g>
      </motion.svg>
    );
  },
);

AccessibilityIcon.displayName = "AccessibilityIcon";
