import { forwardRef, useImperativeHandle } from "react";
import { motion, useAnimate } from "motion/react";

import { useEffectiveReducedMotion } from "@/features/accessibility";
import type {
  AnimatedIconHandle,
  AnimatedIconProps,
} from "@/shared/icons";

type InstagramIconProps = AnimatedIconProps & {
  /** When false, hover is driven by the parent link/button. */
  animateOnHover?: boolean;
};

/**
 * Animated Instagram mark from itshover — body/lens pulse on hover.
 * Respects the site’s effective reduced-motion setting.
 */
export const InstagramIcon = forwardRef<AnimatedIconHandle, InstagramIconProps>(
  (
    {
      size = 20,
      color = "currentColor",
      strokeWidth = 1.85,
      className = "inline-flex",
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

      animate(
        ".ig-body",
        { scale: [1, 1.05, 1] },
        { duration: 0.3, ease: "easeOut" },
      );
      await animate(
        ".ig-lens",
        { scale: [1, 1.2, 1] },
        { duration: 0.25, ease: "easeOut" },
      );
      animate(
        ".ig-dot",
        { opacity: [1, 0, 1] },
        { duration: 0.2, ease: "easeInOut" },
      );
    };

    const stop = (): void => {
      if (prefersReducedMotion) {
        return;
      }

      animate(
        ".ig-body, .ig-lens, .ig-dot",
        { scale: 1, opacity: 1 },
        { duration: 0.2, ease: "easeInOut" },
      );
    };

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.div
        ref={scope}
        className={className}
        onHoverStart={animateOnHover ? start : undefined}
        onHoverEnd={animateOnHover ? stop : undefined}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="block shrink-0"
        >
          <motion.path
            className="ig-body"
            style={{ transformOrigin: "50% 50%" }}
            d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z"
          />
          <motion.path
            className="ig-lens"
            style={{ transformOrigin: "50% 50%" }}
            d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"
          />
          <motion.path className="ig-dot" d="M16.5 7.5v.01" />
        </svg>
      </motion.div>
    );
  },
);

InstagramIcon.displayName = "InstagramIcon";
