/** Cubic ease-out: decelerates toward the end of the interval. */
export const easeOut = (t: number): number => 1 - Math.pow(1 - t, 3);
