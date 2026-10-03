import { useEffect, useState, type CSSProperties } from "react";

import { useEffectiveReducedMotion } from "@/features/accessibility";

import {
  EQUIPOS_IMPACT_DELAY_MS,
  EQUIPOS_TITLE_SWEEP_DELAY_MS,
  EQUIPOS_TITLE_SWEEP_DURATION_MS,
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
  const [introSettled, setIntroSettled] = useState(false);
  const { left, right } = splitLabelHalves(label);
  const playIntro = isVisible && !prefersReducedMotion && !introSettled;
  const showSettled = isVisible && (prefersReducedMotion || introSettled);

  useEffect(() => {
    if (!isVisible || prefersReducedMotion) {
      return undefined;
    }

    const timer = window.setTimeout(
      () => setIntroSettled(true),
      EQUIPOS_TITLE_SWEEP_DELAY_MS + EQUIPOS_TITLE_SWEEP_DURATION_MS + 50,
    );

    return () => window.clearTimeout(timer);
  }, [isVisible, prefersReducedMotion]);

  const renderLetter = (letter: string, index: number): JSX.Element => (
    <span
      key={`${letter}-${index}`}
      className={`${styles.letter} ${
        playIntro
          ? styles.letterAnimated
          : showSettled
            ? styles.letterVisible
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
          playIntro
            ? styles.assembleAnimated
            : showSettled
              ? styles.assembleVisible
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
            playIntro
              ? styles.halfLeftAnimated
              : showSettled
                ? styles.halfVisible
                : ""
          }`}
        >
          {left.map((letter, index) => renderLetter(letter, index))}
        </span>
        <span
          className={`${styles.half} ${styles.halfRight} ${
            playIntro
              ? styles.halfRightAnimated
              : showSettled
                ? styles.halfVisible
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
