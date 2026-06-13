import { easeOut } from "@/shared/lib/easings";
import {
  drawBrightDot,
  drawCardinalDiamonds,
  drawEnergyRays,
  drawInnerArc,
  drawInnermostRing,
  drawMiddleRing,
  drawOuterArc,
  drawOuterGhost,
  drawTicks,
} from "./draw";
import {
  CENTER_X,
  CENTER_Y,
  OUTER_ARC_END_T,
  STAGE_SIZE_PX,
} from "./stageLayout";
import type { RingBaseParams } from "./types";

interface PaintStageParams {
  ctx: CanvasRenderingContext2D;
  elapsed: number;
  t: number;
}

const createRingBase = (): RingBaseParams => ({
  cx: CENTER_X,
  cy: CENTER_Y,
});

export const paintStage = ({ ctx, elapsed, t }: PaintStageParams): void => {
  const ringBase = createRingBase();
  const outerProgress = easeOut(Math.min(t / OUTER_ARC_END_T, 1));

  ctx.clearRect(0, 0, STAGE_SIZE_PX, STAGE_SIZE_PX);
  drawEnergyRays(ctx, { ...ringBase, elapsed });
  drawOuterGhost(ctx, { ...ringBase, easedProgress: outerProgress });
  drawOuterArc(ctx, { ...ringBase, t });
  drawTicks(ctx, { ...ringBase, t });
  drawMiddleRing(ctx, { ...ringBase, elapsed });
  drawInnerArc(ctx, { ...ringBase, t });
  drawInnermostRing(ctx, { ...ringBase, elapsed });
  drawBrightDot(ctx, { ...ringBase, t });
  drawCardinalDiamonds(ctx, { ...ringBase, elapsed });
};
