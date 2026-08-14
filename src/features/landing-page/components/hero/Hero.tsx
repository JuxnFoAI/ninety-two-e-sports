import type { CSSProperties } from "react";

import { useEffectiveReducedMotion } from "@/features/accessibility";

import {
  getHomeChromeItemDelayMs,
  HOME_CHROME_ENTRANCE,
} from "../../lib/homeEntrance";
import { HeroTitle } from "./HeroTitle";
import styles from "./Hero.module.css";

export const Hero = (): JSX.Element => {
  const prefersReducedMotion = useEffectiveReducedMotion();

  const chromeStyle = {
    "--home-chrome-duration": `${HOME_CHROME_ENTRANCE.durationMs}ms`,
  } as CSSProperties;

  const deferredClass = prefersReducedMotion
    ? `${styles.deferred} ${styles.deferredVisible}`
    : `${styles.deferred} ${styles.deferredAnimated}`;

  return (
    <section
      id="inicio"
      className="relative flex min-h-dvh flex-col items-center justify-center px-[clamp(1rem,4vw,4rem)] pb-[clamp(2.5rem,8vh,4rem)] pt-[calc(var(--header-height)+clamp(2rem,8vh,4rem))] text-center"
      style={chromeStyle}
      aria-labelledby="hero-title"
    >
      <div className="w-full max-w-5xl">
        <p
          className={`m-0 mb-3 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-white/70 sm:mb-4 sm:text-[0.78rem] sm:tracking-[0.32em] ${deferredClass}`}
          style={
            prefersReducedMotion
              ? undefined
              : {
                  animationDelay: `${getHomeChromeItemDelayMs(HOME_CHROME_ENTRANCE.eyebrowOffsetMs)}ms`,
                }
          }
        >
          E-Sports
        </p>

        <HeroTitle />
      </div>
    </section>
  );
};
