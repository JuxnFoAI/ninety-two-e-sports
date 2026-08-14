/**
 * Fotos title intro — opciones 1 + 2 combinadas.
 * Keep CSS durations in sync with FotosTitle.
 */
export const FOTOS_TITLE_WIPE_DURATION_MS = 1200;
export const FOTOS_LETTER_STAGGER_MS = 70;
export const FOTOS_LETTER_RISE_DURATION_MS = 750;
/** Panel lead-in starts when the wipe reaches ~70%. */
export const FOTOS_PANEL_REVEAL_AT_WIPE = 0.7;

export const FOTOS_PANEL_REVEAL_DELAY_MS = Math.round(
  FOTOS_TITLE_WIPE_DURATION_MS * FOTOS_PANEL_REVEAL_AT_WIPE,
);

/** Color sweep starts after the wipe + letter rises have mostly settled. */
export const FOTOS_TITLE_SWEEP_DELAY_MS = 1000;
