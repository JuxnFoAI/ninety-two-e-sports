import type { HTMLAttributes } from "react";

import { useEffectiveReducedMotion } from "@/features/accessibility";
import {
  getRevealClassName,
  getRevealDelayMs,
} from "@/shared/lib/revealAnimation";

import styles from "./RevealItem.module.css";
import { useCoarseReveal } from "./useCoarseReveal";
import { useRevealSection } from "./useRevealSection";

type RevealElement = "div" | "h2" | "h3" | "li" | "p";

interface RevealItemProps extends Omit<HTMLAttributes<HTMLElement>, "style"> {
  as?: RevealElement;
  delayMs?: number;
  index?: number;
}

/** Staggered child reveal driven by the parent `RevealSection` visibility. */
export const RevealItem = ({
  as: Tag = "div",
  children,
  className = "",
  delayMs,
  index = 0,
  ...rest
}: RevealItemProps): JSX.Element => {
  const sectionVisible = useRevealSection();
  const prefersReducedMotion = useEffectiveReducedMotion();
  const choreographedDelay = prefersReducedMotion
    ? 0
    : (delayMs ?? getRevealDelayMs(index));
  const coarse = useCoarseReveal(
    sectionVisible,
    prefersReducedMotion,
    choreographedDelay,
  );
  const showStatic =
    coarse.settled || (coarse.revealed && prefersReducedMotion);
  const shared = {
    ...rest,
    ref: coarse.ref,
    className: `${
      showStatic ? styles.visible : getRevealClassName(coarse.revealed)
    } ${className}`.trim(),
    style:
      coarse.revealed && !showStatic
        ? { animationDelay: `${coarse.delayMs}ms` }
        : undefined,
  };

  switch (Tag) {
    case "h2":
      return <h2 {...shared}>{children}</h2>;
    case "h3":
      return <h3 {...shared}>{children}</h3>;
    case "li":
      return <li {...shared}>{children}</li>;
    case "p":
      return <p {...shared}>{children}</p>;
    default:
      return <div {...shared}>{children}</div>;
  }
};
