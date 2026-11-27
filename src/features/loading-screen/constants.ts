/** Loading animation duration, in milliseconds. */
export const LOADING_DURATION_MS = 2000;

/** Delay before the reveal begins after the loading animation ends (ms). */
export const FADE_OUT_DELAY_MS = 0;

/** Crossfade from the loader into the site (ms). */
export const FADE_OUT_TRANSITION_MS = 1000;

/** Extra wait past the expected end before forcing the fade-out (ms). */
export const FAILSAFE_MARGIN_MS = 2500;

/** Logo image width inside the loader (px). */
export const LOGO_WIDTH_PX = 248;

/**
 * Sculpt intro phases, in seconds: the ink flows inside the logo (`hold`,
 * which includes `fadeIn`), the sweep sets it solid (`transform`) and the
 * mark lands (`rest`).
 */
export const SCULPT_PHASES_S = {
  fadeIn: 0.3,
  hold: 1.1,
  transform: 1.0,
  rest: 0.7,
} as const;

/** Sculpt intro duration, before the crossfade into the site (ms). */
export const SCULPT_DURATION_MS = Math.round(
  (SCULPT_PHASES_S.hold + SCULPT_PHASES_S.transform + SCULPT_PHASES_S.rest) *
    1000,
);

/** Pixel ratio cap for the sculpt canvas on each device tier. */
export const SCULPT_MAX_PIXEL_RATIO = { high: 2, mid: 1.5 } as const;
