import { useEffectiveReducedMotion } from "@/features/accessibility";

import { useRevealSection } from "./reveal/useRevealSection";
import styles from "./SectionDisplayTitle.module.css";

type SectionDisplayReveal = "clipUp" | "slideLeft";
type SectionDisplaySweep = "left" | "dual";
type SectionDisplaySize = "md" | "lg";

interface SectionDisplayTitleProps {
  id: string;
  label: string;
  /** Defaults to `label` when omitted. */
  ariaLabel?: string;
  /** Entrance motion. Defaults to clip-up. */
  reveal?: SectionDisplayReveal;
  /** Color sweep direction. Defaults to left-to-right. */
  sweep?: SectionDisplaySweep;
  /** Display size. Defaults to medium section title. */
  size?: SectionDisplaySize;
}

/** Orbitron section heading with brand-blue color sweep. */
export const SectionDisplayTitle = ({
  id,
  label,
  ariaLabel = label,
  reveal = "clipUp",
  sweep = "left",
  size = "md",
}: SectionDisplayTitleProps): JSX.Element => {
  const isVisible = useRevealSection();
  const prefersReducedMotion = useEffectiveReducedMotion();
  const isDualSweep = sweep === "dual";

  const labelMotionClass =
    reveal === "slideLeft" ? styles.labelSlide : styles.labelClipUp;

  const labelAnimatedClass =
    reveal === "slideLeft"
      ? isDualSweep
        ? styles.labelSlideDualAnimated
        : styles.labelSlideAnimated
      : isDualSweep
        ? styles.labelClipUpDualAnimated
        : styles.labelClipUpAnimated;

  return (
    <h2
      id={id}
      className={`${styles.root} ${size === "lg" ? styles.sizeLg : ""}`.trim()}
      aria-label={ariaLabel}
    >
      <span className={styles.mask}>
        <span
          className={`${styles.label} ${
            isDualSweep ? styles.labelDualSweep : ""
          } ${labelMotionClass} ${
            isVisible
              ? prefersReducedMotion
                ? `${styles.labelVisible} ${
                    isDualSweep ? styles.labelVisibleDual : ""
                  }`
                : labelAnimatedClass
              : ""
          }`.trim()}
          aria-hidden
        >
          {label}
        </span>
      </span>
    </h2>
  );
};
