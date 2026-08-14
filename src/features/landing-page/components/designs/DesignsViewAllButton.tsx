import { useEffect, useState, type AnimationEvent } from "react";
import { useNavigate } from "react-router-dom";

import { useEffectiveReducedMotion } from "@/features/accessibility";

import { StretchInkButton } from "../StretchInkButton";
import { useRevealSection } from "../reveal/useRevealSection";
import styles from "./DesignsViewAllButton.module.css";

/** CTA beside the Diseños section title; opens the full `/fotos` gallery. */
export const DesignsViewAllButton = (): JSX.Element => {
  const navigate = useNavigate();
  const isVisible = useRevealSection();
  const prefersReducedMotion = useEffectiveReducedMotion();
  const [entranceDone, setEntranceDone] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setEntranceDone(false);
      return;
    }

    if (prefersReducedMotion) {
      setEntranceDone(true);
    }
  }, [isVisible, prefersReducedMotion]);

  const handleEntranceAnimationEnd = (
    event: AnimationEvent<HTMLSpanElement>,
  ): void => {
    if (event.target !== event.currentTarget) {
      return;
    }
    setEntranceDone(true);
  };

  return (
    <span
      className={`${styles.entranceMask} ${
        entranceDone ? styles.entranceMaskOpen : ""
      }`.trim()}
    >
      <span
        className={`${styles.entrance} ${
          isVisible
            ? prefersReducedMotion
              ? styles.entranceVisible
              : styles.entranceAnimated
            : ""
        }`}
        onAnimationEnd={handleEntranceAnimationEnd}
      >
        <StretchInkButton followDesignsWhite onClick={() => navigate("/fotos")}>
          Todas las fotos
        </StretchInkButton>
      </span>
    </span>
  );
};
