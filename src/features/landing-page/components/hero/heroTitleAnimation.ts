export const HERO_TITLE_WORDS = ["NINETY", "TWO"] as const;

export const HERO_TITLE_ANIMATION = {
  baseDelayMs: 120,
  staggerMs: 150,
  wordDurationMs: 950,
  accentDurationMs: 850,
} as const;

/** Stagger delay for each hero title word on mount. */
export const getHeroTitleWordDelayMs = (index: number): number =>
  HERO_TITLE_ANIMATION.baseDelayMs + index * HERO_TITLE_ANIMATION.staggerMs;

/** Delay for the accent line after the last word. */
export const getHeroTitleAccentDelayMs = (): number =>
  getHeroTitleWordDelayMs(HERO_TITLE_WORDS.length) + 60;
