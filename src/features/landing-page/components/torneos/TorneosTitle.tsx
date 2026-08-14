import type { CSSProperties } from "react";

import { useEffectiveReducedMotion } from "@/features/accessibility";

import {
  TORNEOS_LETTER_STAGGER_MS,
  TORNEOS_LINE_DELAY_MS,
  TORNEOS_TITLE_SWEEP_DELAY_MS,
} from "../../lib/torneosTitleTiming";
import { useRevealSection } from "../reveal/useRevealSection";
import styles from "./TorneosTitle.module.css";

interface TorneosTitleProps {
  id: string;
  label?: string;
}

/**
 * Torneos title: letters launch from the center (grid), cream finish-line,
 * then brand-blue sweep.
 */
export const TorneosTitle = ({
  id,
  label = "Torneos",
}: TorneosTitleProps): JSX.Element => {
  const isVisible = useRevealSection();
  const prefersReducedMotion = useEffectiveReducedMotion();
  const letters = Array.from(label.toUpperCase());
  const mid = (letters.length - 1) / 2;

  return (
    <h2 id={id} className={styles.root} aria-label={label}>
      <span className={styles.stage}>
        <span className={styles.row} aria-hidden>
          {letters.map((letter, index) => (
            <span key={`${letter}-${index}`} className={styles.letterMask}>
              <span
                className={`${styles.letter} ${
                  isVisible
                    ? prefersReducedMotion
                      ? styles.letterVisible
                      : styles.letterAnimated
                    : ""
                }`}
                style={
                  {
                    "--letter-delay": `${Math.abs(index - mid) * TORNEOS_LETTER_STAGGER_MS}ms`,
                    "--sweep-delay": `${TORNEOS_TITLE_SWEEP_DELAY_MS}ms`,
                  } as CSSProperties
                }
              >
                {letter}
              </span>
            </span>
          ))}
        </span>
        <span
          className={`${styles.line} ${
            isVisible
              ? prefersReducedMotion
                ? styles.lineVisible
                : styles.lineAnimated
              : ""
          }`}
          style={
            {
              "--line-delay": `${TORNEOS_LINE_DELAY_MS}ms`,
            } as CSSProperties
          }
          aria-hidden
        />
      </span>
    </h2>
  );
};
