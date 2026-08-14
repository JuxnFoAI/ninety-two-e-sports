import type { CSSProperties } from "react";

import { useEffectiveReducedMotion } from "@/features/accessibility";

import {
  getHeroTitleLetterDelayMs,
  HERO_TITLE_ANIMATION,
  HERO_TITLE_WORDS,
} from "./heroTitleAnimation";
import styles from "./HeroTitle.module.css";

const titleStyle = {
  "--hero-letter-duration": `${HERO_TITLE_ANIMATION.letterDurationMs}ms`,
} as CSSProperties;

/** Animated “NINETY TWO” hero heading with staged letter reveal. */
export const HeroTitle = (): JSX.Element => {
  const prefersReducedMotion = useEffectiveReducedMotion();

  return (
    <h1
      id="hero-title"
      className={styles.root}
      style={titleStyle}
      aria-label="Ninety Two"
    >
      {HERO_TITLE_WORDS.map((word, wordIndex) => (
        <span key={word} className={styles.word} aria-hidden>
          {word.split("").map((letter, letterIndex) => (
            <span key={`${word}-${letterIndex}`} className={styles.letterMask}>
              <span
                className={`${styles.letter} ${
                  prefersReducedMotion
                    ? styles.letterVisible
                    : styles.letterAnimated
                }`}
                style={
                  prefersReducedMotion
                    ? undefined
                    : {
                        animationDelay: `${getHeroTitleLetterDelayMs(wordIndex, letterIndex)}ms`,
                      }
                }
              >
                {letter}
              </span>
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
};
