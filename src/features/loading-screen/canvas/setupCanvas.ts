import { STAGE_SIZE_PX } from "./stageLayout";

/** Configures canvas backing store and 2D transform for HiDPI rendering. */
export const setupCanvas = (
  canvas: HTMLCanvasElement,
): CanvasRenderingContext2D | null => {
  const dpr = window.devicePixelRatio || 1;
  const pixelSize = STAGE_SIZE_PX * dpr;

  if (canvas.width !== pixelSize || canvas.height !== pixelSize) {
    canvas.width = pixelSize;
    canvas.height = pixelSize;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return null;
  }

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return ctx;
};
