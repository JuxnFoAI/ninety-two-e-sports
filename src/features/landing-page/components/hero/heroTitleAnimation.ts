export const HERO_TITLE_WORDS = ["NINETY", "TWO"] as const;

export const HERO_TITLE_ANIMATION = {
  baseDelayMs: 140,
  letterStaggerMs: 36,
  wordGapMs: 110,
  letterDurationMs: 900,
} as const;

const letterCountBeforeWord = (wordIndex: number): number =>
  HERO_TITLE_WORDS.slice(0, wordIndex).reduce(
    (total, word) => total + word.length,
    0,
  );

/** Stagger delay for each hero title letter on mount. */
export const getHeroTitleLetterDelayMs = (
  wordIndex: number,
  letterIndex: number,
): number => {
  const wordGap =
    wordIndex > 0 ? wordIndex * HERO_TITLE_ANIMATION.wordGapMs : 0;

  return (
    HERO_TITLE_ANIMATION.baseDelayMs +
    wordGap +
    (letterCountBeforeWord(wordIndex) + letterIndex) *
      HERO_TITLE_ANIMATION.letterStaggerMs
  );
};

/** Total time until the hero title letter sequence has finished. */
export const getHeroTitleSequenceEndMs = (): number => {
  const lastWordIndex = HERO_TITLE_WORDS.length - 1;
  const lastLetterIndex = HERO_TITLE_WORDS[lastWordIndex].length - 1;

  return (
    getHeroTitleLetterDelayMs(lastWordIndex, lastLetterIndex) +
    HERO_TITLE_ANIMATION.letterDurationMs
  );
};
