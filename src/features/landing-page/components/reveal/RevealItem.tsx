import type { HTMLAttributes } from "react";

import { usePrefersReducedMotion } from "@/shared/hooks";
import {
  getRevealClassName,
  getRevealDelayMs,
} from "@/shared/lib/revealAnimation";

import { useRevealSection } from "./useRevealSection";

type RevealElement = "div" | "h2" | "h3" | "li" | "p";

interface RevealItemProps extends Omit<HTMLAttributes<HTMLElement>, "style"> {
  as?: RevealElement;
  delayMs?: number;
  index?: number;
}

/** Staggered child reveal driven by the parent `RevealSection` visibility. */
export const RevealItem = ({
  as: Component = "div",
  children,
  className = "",
  delayMs,
  index = 0,
  ...rest
}: RevealItemProps): JSX.Element => {
  const isVisible = useRevealSection();
  const prefersReducedMotion = usePrefersReducedMotion();
  const resolvedDelay = prefersReducedMotion
    ? 0
    : (delayMs ?? getRevealDelayMs(index));

  return (
    <Component
      {...rest}
      className={`${getRevealClassName(isVisible)} ${className}`.trim()}
      style={
        isVisible && !prefersReducedMotion
          ? { animationDelay: `${resolvedDelay}ms` }
          : undefined
      }
    >
      {children}
    </Component>
  );
};
