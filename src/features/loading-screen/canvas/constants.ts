/** Ghost ring minimum opacity. */
export const OUTER_GHOST_ALPHA_MIN = 0.05;

/** Ghost ring maximum opacity multiplier. */
export const OUTER_GHOST_ALPHA_RANGE = 0.07;

/** Outer arc dash pattern [dash, gap]. */
export const OUTER_ARC_DASH: [number, number] = [5, 9];

/** Middle ring dash pattern [dash, gap]. */
export const MIDDLE_RING_DASH: [number, number] = [14, 7];

/** Innermost ring dash pattern [dash, gap]. */
export const INNERMOST_RING_DASH: [number, number] = [2, 12];

/** Total tick marks around the outer ring. */
export const TICK_COUNT = 48;

/** Every Nth tick is rendered as a major mark. */
export const TICK_MAJOR_INTERVAL = 4;

/** Major tick length in pixels. */
export const TICK_MAJOR_LENGTH_PX = 11;

/** Major tick stroke width in pixels. */
export const TICK_MAJOR_WIDTH_PX = 1.5;

/** Minor tick length in pixels. */
export const TICK_MINOR_LENGTH_PX = 5;

/** Minor tick stroke width in pixels. */
export const TICK_MINOR_WIDTH_PX = 0.7;

/** Inactive tick opacity. */
export const TICK_INACTIVE_ALPHA = 0.2;

/** Active tick opacity. */
export const TICK_ACTIVE_ALPHA = 0.95;

/** Middle ring counter-rotation speed (px per ms). */
export const MIDDLE_RING_ROTATION_SPEED = 0.04;

/** Energy ray count. */
export const ENERGY_RAY_COUNT = 12;

/** Energy ray counter-rotation speed (rad per ms). */
export const ENERGY_RAY_ROTATION_SPEED = 0.00012;

/** Cardinal diamond count. */
export const DIAMOND_COUNT = 4;

/** Diamond side length before rotation (px). */
export const DIAMOND_SIZE_PX = 6;

/** Stagger between each diamond appearance (ms). */
export const DIAMOND_STAGGER_MS = 60;

/** Diamond orbit rotation speed (rad per ms). */
export const DIAMOND_ORBIT_SPEED = 0.00035;

/** Diamond fade-in duration (ms). */
export const DIAMOND_FADE_IN_MS = 400;

/** Bright dot radius at arc tip (px). */
export const BRIGHT_DOT_RADIUS_PX = 4;

/** Trail steps behind the bright dot. */
export const BRIGHT_DOT_TRAIL_STEPS = 4;

/** Trail step angle offset (rad). */
export const BRIGHT_DOT_TRAIL_ANGLE_STEP = 0.018;
