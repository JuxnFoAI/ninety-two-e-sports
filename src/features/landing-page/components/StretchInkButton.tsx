import {
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react";
import { motion } from "motion/react";

import { useEffectiveReducedMotion } from "@/features/accessibility";

import styles from "./StretchInkButton.module.css";

const STRETCH_REST = { scaleX: 1, scaleY: 1 };
const STRETCH_HOVER = { scaleX: 1.1, scaleY: 0.9 };

/** Diameter that covers the button from any origin, including hover stretch. */
const coverDiameterPx = (width: number, height: number): number =>
  Math.ceil(
    Math.hypot(width * STRETCH_HOVER.scaleX, height * STRETCH_HOVER.scaleY) *
      2.6,
  );

const STRETCH_SPRING = {
  type: "spring" as const,
  stiffness: 320,
  damping: 24,
  mass: 0.45,
};

type StretchInkButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
  /**
   * Keep label letter-spacing fixed on hover so siblings in a row
   * are not nudged when the group re-centers.
   */
  isolateLayout?: boolean;
  /** White+black letters on dark veil; black+white letters as the home stack goes white. */
  followDesignsWhite?: boolean;
  "aria-label"?: string;
  "aria-pressed"?: boolean;
};

/** Pill CTA with spring stretch + cream ink fill on hover/focus. */
export const StretchInkButton = ({
  children,
  onClick,
  className = "",
  style,
  isolateLayout = false,
  followDesignsWhite = false,
  "aria-label": ariaLabel,
  "aria-pressed": ariaPressed,
}: StretchInkButtonProps): JSX.Element => {
  const prefersReducedMotion = useEffectiveReducedMotion();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);
  const [ink, setInk] = useState({ x: 0, y: 0, size: 0 });

  const placeInk = (clientX: number, clientY: number): void => {
    const button = buttonRef.current;
    if (!button) {
      return;
    }

    const rect = button.getBoundingClientRect();
    setInk({
      x: clientX - rect.left,
      y: clientY - rect.top,
      size: coverDiameterPx(rect.width, rect.height),
    });
  };

  const placeInkAtCenter = (): void => {
    const button = buttonRef.current;
    if (!button) {
      return;
    }

    const rect = button.getBoundingClientRect();
    setInk({
      x: rect.width / 2,
      y: rect.height / 2,
      size: coverDiameterPx(rect.width, rect.height),
    });
  };

  const handlePointerEnter = (event: PointerEvent<HTMLButtonElement>): void => {
    if (prefersReducedMotion) {
      return;
    }
    placeInk(event.clientX, event.clientY);
    setHovered(true);
  };

  const handlePointerLeave = (): void => {
    setHovered(false);
  };

  const handleFocus = (): void => {
    if (prefersReducedMotion) {
      return;
    }
    if (buttonRef.current?.matches(":hover")) {
      return;
    }
    placeInkAtCenter();
    setHovered(true);
  };

  const handleBlur = (): void => {
    setHovered(false);
  };

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      className={`${styles.root} ${hovered ? styles.hovered : ""} ${
        prefersReducedMotion ? styles.reduced : ""
      } ${isolateLayout ? styles.isolateLayout : ""} ${
        followDesignsWhite ? styles.followDesignsWhite : ""
      } ${className}`.trim()}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      animate={
        prefersReducedMotion
          ? STRETCH_REST
          : hovered
            ? STRETCH_HOVER
            : STRETCH_REST
      }
      transition={prefersReducedMotion ? { duration: 0 } : STRETCH_SPRING}
      onClick={onClick}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <span className={styles.surface} style={style} aria-hidden />
      {!prefersReducedMotion ? (
        <span
          className={styles.ink}
          style={{
            left: ink.x,
            top: ink.y,
            width: ink.size,
            height: ink.size,
          }}
          aria-hidden
        />
      ) : null}
      <span className={styles.label}>{children}</span>
    </motion.button>
  );
};
