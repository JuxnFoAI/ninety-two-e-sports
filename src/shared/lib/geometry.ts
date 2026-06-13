/** Full circle in radians. */
export const FULL_CIRCLE_RAD = Math.PI * 2;

/** Returns a point on a circle for the given center, radius, and angle. */
export const pointOnCircle = (
  cx: number,
  cy: number,
  radius: number,
  angleRad: number,
): { x: number; y: number } => ({
  x: cx + radius * Math.cos(angleRad),
  y: cy + radius * Math.sin(angleRad),
});

/** Normalizes any angle to the range [0, 2π). */
export const normalizeAngle = (angle: number): number => {
  return ((angle % FULL_CIRCLE_RAD) + FULL_CIRCLE_RAD) % FULL_CIRCLE_RAD;
};
