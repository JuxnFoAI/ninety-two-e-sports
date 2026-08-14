import { getHeroTitleSequenceEndMs } from "../components/hero/heroTitleAnimation";

/** Stagger for UI that appears after the hero title sequence. */
export const HOME_CHROME_ENTRANCE = {
  durationMs: 720,
  navbarOffsetMs: 0,
  eyebrowOffsetMs: 40,
  footerOffsetMs: 130,
} as const;

/** Moment when navbar / hero chrome may begin entering. */
export const getHomeChromeStartMs = (): number => getHeroTitleSequenceEndMs();

export const getHomeChromeItemDelayMs = (offsetMs: number): number =>
  getHomeChromeStartMs() + offsetMs;
