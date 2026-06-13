/** Canvas stage width and height in pixels. */
export const STAGE_SIZE_PX = 420;

/** Horizontal center of the ring system. */
export const CENTER_X = 210;

/** Vertical center of the ring system. */
export const CENTER_Y = 210;

/** Starting angle for clockwise sweeps (−90°, top of circle). */
export const SWEEP_START_ANGLE_RAD = -Math.PI / 2;

/** Outer ghost / outer arc / tick marks radius. */
export const RADIUS_OUTER = 185;

/** Middle dashed ring radius. */
export const RADIUS_MIDDLE = 170;

/** Inner sweeping arc radius. */
export const RADIUS_INNER_ARC = 155;

/** Innermost dotted ring radius. */
export const RADIUS_INNERMOST = 140;

/** Cardinal diamonds orbital radius. */
export const RADIUS_DIAMONDS = 199;

/** Energy rays inner radius. */
export const RADIUS_RAYS_INNER = 28;

/** Energy rays outer radius. */
export const RADIUS_RAYS_OUTER = 132;

/** Outer arc sweep completes at this normalized time. */
export const OUTER_ARC_END_T = 0.8;

/** Inner arc sweep completes at this normalized time. */
export const INNER_ARC_END_T = 0.625;

/** Logo fade-in window start (normalized time). */
export const LOGO_FADE_START_T = 0.12;

/** Logo fade-in window end (normalized time). */
export const LOGO_FADE_END_T = 0.57;

/** Logo scale at fade-in start. */
export const LOGO_SCALE_START = 0.72;

/** Logo scale at fade-in end. */
export const LOGO_SCALE_END = 1;

/** Bright dot hides after this normalized time. */
export const BRIGHT_DOT_HIDE_T = 0.94;
