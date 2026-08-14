import type { CSSProperties } from "react";

import { useEffectiveReducedMotion } from "@/features/accessibility";

import {
  EQUIPOS_IMPACT_DELAY_MS,
  EQUIPOS_TITLE_SWEEP_DELAY_MS,
} from "../../lib/equiposTitleTiming";
import { useRevealSection } from "../reveal/useRevealSection";
import styles from "./EquiposTitle.module.css";

interface EquiposTitleProps {
  id: string;
  label?: string;
}

const splitLabelHalves = (
  label: string,
): { left: string[]; right: string[] } => {
  const letters = Array.from(label.toUpperCase());
  const mid = Math.ceil(letters.length / 2);
  return {
    left: letters.slice(0, mid),
    right: letters.slice(mid),
  };
};

/**
 * Equipos title boom: left/right halves collide (two divisions meeting),
 * impact settle, then brand-blue sweep top-to-bottom.
 */
export const EquiposTitle = ({
  id,
  label = "Equipos",
}: EquiposTitleProps): JSX.Element => {
  const isVisible = useRevealSection();
  const prefersReducedMotion = useEffectiveReducedMotion();
  const { left, right } = splitLabelHalves(label);

  const renderLetter = (letter: string, index: number): JSX.Element => (
    <span
      key={`${letter}-${index}`}
      className={`${styles.letter} ${
        isVisible
          ? prefersReducedMotion
            ? styles.letterVisible
            : styles.letterAnimated
          : ""
      }`}
      style={
        {
          "--sweep-delay": `${EQUIPOS_TITLE_SWEEP_DELAY_MS}ms`,
        } as CSSProperties
      }
    >
      {letter}
    </span>
  );

  return (
    <h2 id={id} className={styles.root} aria-label={label}>
      <span
        className={`${styles.assemble} ${
          isVisible
            ? prefersReducedMotion
              ? styles.assembleVisible
              : styles.assembleAnimated
            : ""
        }`}
        style={
          {
            "--impact-delay": `${EQUIPOS_IMPACT_DELAY_MS}ms`,
          } as CSSProperties
        }
        aria-hidden
      >
        <span
          className={`${styles.half} ${styles.halfLeft} ${
            isVisible
              ? prefersReducedMotion
                ? styles.halfVisible
                : styles.halfLeftAnimated
              : ""
          }`}
        >
          {left.map((letter, index) => renderLetter(letter, index))}
        </span>
        <span
          className={`${styles.half} ${styles.halfRight} ${
            isVisible
              ? prefersReducedMotion
                ? styles.halfVisible
                : styles.halfRightAnimated
              : ""
          }`}
        >
          {right.map((letter, index) =>
            renderLetter(letter, left.length + index),
          )}
        </span>
      </span>
    </h2>
  );
};
