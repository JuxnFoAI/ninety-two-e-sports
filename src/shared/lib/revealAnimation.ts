const REVEAL_ANIMATION_VISIBLE =
  "motion-safe:animate-[fadeInUp_0.85s_ease_both] motion-reduce:animate-none";

const REVEAL_ANIMATION_HIDDEN = "opacity-0 motion-reduce:opacity-100";

const REVEAL_STAGGER_MS = 80;

/** Tailwind classes toggled when a scroll-reveal target enters the viewport. */
export const getRevealClassName = (isVisible: boolean): string =>
  isVisible ? REVEAL_ANIMATION_VISIBLE : REVEAL_ANIMATION_HIDDEN;

/** Converts a stagger index into a millisecond animation delay. */
export const getRevealDelayMs = (index: number): number =>
  index * REVEAL_STAGGER_MS;
