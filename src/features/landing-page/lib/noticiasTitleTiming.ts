import { SECTION_DISPLAY_TITLE_SWEEP_DELAY_MS } from "./sectionDisplayTitleTiming";

/** Clip-up duration in `SectionDisplayTitle.module.css`. */
const NOTICIAS_TITLE_CLIP_RISE_MS = 800;

/** Panel lead-in starts as the title rise is settling. */
export const NOTICIAS_PANEL_REVEAL_DELAY_MS =
  SECTION_DISPLAY_TITLE_SWEEP_DELAY_MS + 140;

/** First spiral card starts after the NOTICIAS title has landed. */
export const NEWS_SPIRAL_CARD_REVEAL_DELAY_MS = NOTICIAS_TITLE_CLIP_RISE_MS + 140;

/** Stagger between consecutive helix cards. */
export const NEWS_SPIRAL_CARD_STAGGER_MS = 95;
