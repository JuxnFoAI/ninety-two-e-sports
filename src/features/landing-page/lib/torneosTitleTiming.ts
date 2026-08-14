/**
 * Torneos title intro — letters launch from the center (grid / pole),
 * cream finish-line draws, then brand-blue sweep.
 * Keep CSS durations in sync with TorneosTitle.
 */
export const TORNEOS_LETTER_STAGGER_MS = 70;
export const TORNEOS_LETTER_LAUNCH_DURATION_MS = 820;
/** Finish line starts as the center letter is landing. */
export const TORNEOS_LINE_DELAY_MS = 380;
export const TORNEOS_LINE_DURATION_MS = 640;
/** Color sweep after the word has assembled. */
export const TORNEOS_TITLE_SWEEP_DELAY_MS = 920;
export const TORNEOS_TITLE_SWEEP_DURATION_MS = 1200;

/**
 * Night panel rises while the outer letters are still arriving —
 * broadcast (image) follows the title, calendar a beat later.
 */
export const TORNEOS_PANEL_REVEAL_AT_LAUNCH = 0.78;

export const TORNEOS_PANEL_REVEAL_DELAY_MS = Math.round(
  TORNEOS_LETTER_LAUNCH_DURATION_MS * TORNEOS_PANEL_REVEAL_AT_LAUNCH,
);

export const TORNEOS_CALENDAR_REVEAL_DELAY_MS =
  TORNEOS_PANEL_REVEAL_DELAY_MS + 280;
