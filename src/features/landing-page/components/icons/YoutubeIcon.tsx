import { forwardRef, useImperativeHandle } from "react";
import { motion, useAnimate } from "motion/react";

import { useEffectiveReducedMotion } from "@/features/accessibility";
import type { AnimatedIconHandle, AnimatedIconProps } from "@/shared/icons";

type YoutubeIconProps = AnimatedIconProps & {
  /** When false, hover is driven by the parent link/button. */
  animateOnHover?: boolean;
};

/**
 * Animated YouTube mark from itshover — play glyph draws in on hover.
 * Respects the site’s effective reduced-motion setting.
 */
export const YoutubeIcon = forwardRef<AnimatedIconHandle, YoutubeIconProps>(
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
        ".youtube-play",
        { pathLength: [0, 1] },
        { duration: 0.3, ease: "easeInOut" },
      );
      animate(
        ".youtube-play",
        { scale: [1, 0.8, 1] },
        { duration: 0.3, ease: "easeInOut" },
      );
    };

    const stop = (): void => {
      if (prefersReducedMotion) {
        return;
      }

      animate(
        ".youtube-play",
        { scale: 1, x: 0 },
        { duration: 0.3, ease: "easeInOut" },
      );
      animate(
        ".youtube-frame",
        { scale: 1 },
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
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <motion.path
          d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z"
          className="youtube-frame"
          style={{ transformOrigin: "50% 50%" }}
        />
        <motion.path
          d="M10 9l5 3l-5 3z"
          className="youtube-play"
          style={{ transformOrigin: "50% 50%" }}
        />
      </motion.svg>
    );
  },
);

YoutubeIcon.displayName = "YoutubeIcon";
