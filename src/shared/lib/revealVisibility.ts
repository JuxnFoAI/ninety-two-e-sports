export interface RevealRect {
  top: number;
  right: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
}

/** Share of the viewport a too-tall target must cover before it counts as shown. */
const TALL_TARGET_VIEWPORT_COVERAGE = 0.2;

/**
 * A section is ready to reveal when enough of it is on screen.
 * Ratio-of-target thresholds (for example 12%) never fire when the section
 * is taller than the viewport divided by that ratio — the mobile equipos
 * roster is one column of cards and easily exceeds that.
 */
export const isRevealTargetVisible = (
  rect: RevealRect,
  viewportWidth: number,
  viewportHeight: number,
  threshold: number,
): boolean => {
  if (viewportWidth <= 0 || viewportHeight <= 0) {
    return false;
  }

  const visibleHeight =
    Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
  const visibleWidth =
    Math.min(rect.right, viewportWidth) - Math.max(rect.left, 0);

  if (visibleHeight <= 0 || visibleWidth <= 0) {
    return false;
  }

  const visibleArea = visibleHeight * visibleWidth;
  const totalArea = rect.height * rect.width;

  if (totalArea > 0 && visibleArea / totalArea >= threshold) {
    return true;
  }

  const tallerThanViewport = rect.height > viewportHeight;
  const viewportArea = viewportWidth * viewportHeight;

  return (
    tallerThanViewport &&
    visibleArea / viewportArea >= TALL_TARGET_VIEWPORT_COVERAGE
  );
};
