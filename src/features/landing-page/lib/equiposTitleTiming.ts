/**
 * Equipos title intro — halves collide from the sides (two divisions),
 * impact settle, then brand-blue color sweep top-to-bottom.
 * Keep CSS durations in sync with EquiposTitle.
 */
export const EQUIPOS_HALF_IN_DURATION_MS = 820;
export const EQUIPOS_IMPACT_DELAY_MS = 620;
export const EQUIPOS_IMPACT_DURATION_MS = 480;
/** Color sweep starts once the halves have mostly locked together. */
export const EQUIPOS_TITLE_SWEEP_DELAY_MS = 900;
export const EQUIPOS_TITLE_SWEEP_DURATION_MS = 1200;

/** Title structure landed (collide + impact) — unlock the rest of the section. */
export const EQUIPOS_TITLE_STRUCTURE_MS =
  EQUIPOS_IMPACT_DELAY_MS + EQUIPOS_IMPACT_DURATION_MS;

/**
 * Sequence after the title:
 * 1) panel + division buttons
 * 2) roster photos
 */
export const EQUIPOS_BUTTONS_REVEAL_DELAY_MS = EQUIPOS_TITLE_STRUCTURE_MS;
export const EQUIPOS_ROSTER_REVEAL_DELAY_MS =
  EQUIPOS_BUTTONS_REVEAL_DELAY_MS + 480;
export const EQUIPOS_ROSTER_STAGGER_MS = 70;
