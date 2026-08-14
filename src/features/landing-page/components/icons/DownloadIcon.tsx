import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";
import { motion, useAnimate } from "motion/react";

import { useEffectiveReducedMotion } from "@/features/accessibility";
import type {
  AnimatedIconHandle,
  AnimatedIconProps,
} from "@/shared/icons";

type DownloadIconProps = AnimatedIconProps & {
  /** When false, hover is driven by the parent link/button. */
  animateOnHover?: boolean;
};

/**
 * Animated download mark from itshover — arrow drops into the tray on hover.
 * Respects the site’s effective reduced-motion setting.
 */
export const DownloadIcon = forwardRef<AnimatedIconHandle, DownloadIconProps>(
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
    const isAnimatingRef = useRef(false);

    const start = useCallback(async (): Promise<void> => {
      if (prefersReducedMotion || isAnimatingRef.current) {
        return;
      }

      isAnimatingRef.current = true;

      while (isAnimatingRef.current) {
        animate(
          ".arrow-head",
          { y: [0, 8, 8, -8, 0], opacity: [1, 0, 0, 0, 1] },
          {
            duration: 1,
            times: [0, 0.4, 0.5, 0.6, 1],
            ease: "easeInOut",
          },
        );

        await animate(
          ".arrow-stem",
          { y: [0, 8, 8, -8, 0], opacity: [1, 0, 0, 0, 1] },
          {
            duration: 1,
            times: [0, 0.3, 0.4, 0.5, 1],
            ease: "easeInOut",
          },
        );

        if (!isAnimatingRef.current) {
          break;
        }

        await animate(
          ".tray",
          { y: [0, 2, 0], scale: [1, 1.05, 1] },
          { duration: 0.3, ease: "easeOut" },
        );

        if (!isAnimatingRef.current) {
          break;
        }

        await new Promise((resolve) => {
          window.setTimeout(resolve, 200);
        });
      }
    }, [animate, prefersReducedMotion]);

    const stop = useCallback((): void => {
      isAnimatingRef.current = false;

      if (prefersReducedMotion) {
        return;
      }

      animate(
        ".arrow-head, .arrow-stem, .tray",
        { y: 0, opacity: 1, scale: 1 },
        { duration: 0.3 },
      );
    }, [animate, prefersReducedMotion]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    useEffect(() => {
      return () => {
        isAnimatingRef.current = false;
      };
    }, []);

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
        style={{ overflow: "visible" }}
      >
        <motion.path
          className="tray"
          d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
          style={{ transformOrigin: "center bottom" }}
        />
        <motion.path
          className="arrow-stem"
          d="M12 15V3"
          style={{ transformOrigin: "center" }}
        />
        <motion.path
          className="arrow-head"
          d="m7 10 5 5 5-5"
          style={{ transformOrigin: "center" }}
        />
      </motion.svg>
    );
  },
);

DownloadIcon.displayName = "DownloadIcon";
