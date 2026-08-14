/** Cubic ease-out: decelerates toward the end of the interval. */
export const easeOut = (t: number): number => 1 - Math.pow(1 - t, 3);

/** Slow start, push through the middle, soft settle at the end. */
export const easeInOutCubic = (value: number): number =>
  value < 0.5
    ? 4 * value * value * value
    : 1 - (-2 * value + 2) ** 3 / 2;

