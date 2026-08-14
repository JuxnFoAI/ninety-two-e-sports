import type { CSSProperties } from "react";

import { useEffectiveReducedMotion } from "@/features/accessibility";

import {
  FOTOS_LETTER_STAGGER_MS,
  FOTOS_TITLE_SWEEP_DELAY_MS,
} from "../../lib/fotosTitleTiming";
import { useRevealSection } from "../reveal/useRevealSection";
import styles from "./FotosTitle.module.css";

interface FotosTitleProps {
  id: string;
  label?: string;
}

/**
 * Intro opciones 1 + 2:
 * wipe horizontal + letras en rise escalonado + barrido azul.
 */
export const FotosTitle = ({
  id,
  label = "Fotos",
}: FotosTitleProps): JSX.Element => {
  const isVisible = useRevealSection();
  const prefersReducedMotion = useEffectiveReducedMotion();
  const letters = Array.from(label.toUpperCase());

  return (
    <h2 id={id} className={styles.root} aria-label={label}>
      <span
        className={`${styles.wipe} ${
          isVisible
            ? prefersReducedMotion
              ? styles.wipeVisible
              : styles.wipeAnimated
            : ""
        }`}
      >
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
                    "--letter-delay": `${index * FOTOS_LETTER_STAGGER_MS}ms`,
                    "--sweep-delay": `${FOTOS_TITLE_SWEEP_DELAY_MS}ms`,
                  } as CSSProperties
                }
              >
                {letter}
              </span>
            </span>
          ))}
        </span>
      </span>
    </h2>
  );
};
