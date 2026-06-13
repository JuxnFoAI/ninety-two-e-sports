import type { CSSProperties } from "react";

import { usePrefersReducedMotion } from "@/shared/hooks";

import {
  getHeroTitleAccentDelayMs,
  getHeroTitleWordDelayMs,
  HERO_TITLE_ANIMATION,
  HERO_TITLE_WORDS,
} from "./heroTitleAnimation";
import styles from "./HeroTitle.module.css";

const titleStyle = {
  "--hero-word-duration": `${HERO_TITLE_ANIMATION.wordDurationMs}ms`,
  "--hero-accent-duration": `${HERO_TITLE_ANIMATION.accentDurationMs}ms`,
} as CSSProperties;

/** Animated “NINETY TWO” hero heading with staggered word reveal. */
export const HeroTitle = (): JSX.Element => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <h1 id="hero-title" className={styles.root} style={titleStyle}>
      {HERO_TITLE_WORDS.map((word, index) => (
        <span
          key={word}
          className={`${styles.word} ${prefersReducedMotion ? styles.wordVisible : styles.wordAnimated}`}
          style={
            prefersReducedMotion
              ? undefined
              : { animationDelay: `${getHeroTitleWordDelayMs(index)}ms` }
          }
        >
          {word}
        </span>
      ))}

      <span
        aria-hidden
        className={`${styles.accent} ${prefersReducedMotion ? styles.accentVisible : styles.accentAnimated}`}
        style={
          prefersReducedMotion
            ? undefined
            : { animationDelay: `${getHeroTitleAccentDelayMs()}ms` }
        }
      />
    </h1>
  );
};
