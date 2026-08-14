import { useRef } from "react";

import { useAccessibility } from "../accessibilityContext";
import { useEffectiveReducedMotion } from "../hooks/useAccessibilityMedia";
import type { AnimatedIconHandle } from "@/shared/icons";
import { AccessibilityIcon } from "./AccessibilityIcon";

import styles from "./AccessibilityTriggerButton.module.css";

interface AccessibilityTriggerButtonProps {
  className?: string;
  expanded?: boolean;
  controls?: string;
  /** Short label revealed inline on hover/focus (desktop navbar). */
  revealLabel?: string;
  /** Always-visible label beside the icon (mobile menu). */
  inlineLabel?: string;
  onClick: () => void;
}

export const AccessibilityTriggerButton = ({
  className = "",
  expanded,
  controls,
  revealLabel,
  inlineLabel,
  onClick,
}: AccessibilityTriggerButtonProps): JSX.Element => {
  const { panelLabel } = useAccessibility();
  const prefersReducedMotion = useEffectiveReducedMotion();
  const iconRef = useRef<AnimatedIconHandle>(null);

  const startIcon = (): void => {
    if (prefersReducedMotion) {
      return;
    }
    iconRef.current?.startAnimation();
  };

  const stopIcon = (): void => {
    iconRef.current?.stopAnimation();
  };

  return (
    <button
      type="button"
      className={`${styles.root} ${inlineLabel ? styles.inline : ""} ${className}`.trim()}
      aria-expanded={expanded}
      aria-controls={controls}
      aria-haspopup="dialog"
      aria-label={panelLabel}
      onClick={onClick}
      onPointerDown={startIcon}
      onMouseEnter={startIcon}
      onMouseLeave={stopIcon}
      onFocus={startIcon}
      onBlur={stopIcon}
    >
      <span className={styles.icon}>
        <AccessibilityIcon ref={iconRef} animateOnHover={false} />
      </span>
      {inlineLabel ? (
        <span className={styles.inlineLabel} aria-hidden="true">
          {inlineLabel}
        </span>
      ) : null}
      {revealLabel ? (
        <span className={styles.labelClip} aria-hidden="true">
          <span className={styles.labelInner}>
            <span className={styles.label}>{revealLabel}</span>
          </span>
        </span>
      ) : null}
    </button>
  );
};
