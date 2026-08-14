/**
 * Timing for `SectionDisplayTitle` color sweep.
 * Keep in sync with `SectionDisplayTitle.module.css`.
 */
export const SECTION_DISPLAY_TITLE_SWEEP_DELAY_MS = 420;
export const SECTION_DISPLAY_TITLE_SLIDE_SWEEP_DELAY_MS = 350;
export const SECTION_DISPLAY_TITLE_SWEEP_DURATION_MS = 1250;

/** When the clip-up title sequence (rise + sweep) finishes. */
export const SECTION_DISPLAY_TITLE_SEQUENCE_MS =
  SECTION_DISPLAY_TITLE_SWEEP_DELAY_MS +
  SECTION_DISPLAY_TITLE_SWEEP_DURATION_MS;

/** When the slide-left title sequence (slide + sweep) finishes. */
export const SECTION_DISPLAY_TITLE_SLIDE_SEQUENCE_MS =
  SECTION_DISPLAY_TITLE_SLIDE_SWEEP_DELAY_MS +
  SECTION_DISPLAY_TITLE_SWEEP_DURATION_MS;

/** Start the Diseños carousel slightly before the header finishes. */
export const DESIGNS_GALLERY_REVEAL_LEAD_MS = 400;

export const DESIGNS_GALLERY_REVEAL_DELAY_MS =
  SECTION_DISPLAY_TITLE_SLIDE_SEQUENCE_MS - DESIGNS_GALLERY_REVEAL_LEAD_MS;
