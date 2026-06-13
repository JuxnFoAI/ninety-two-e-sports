import { FULL_CIRCLE_RAD } from "@/shared/lib/geometry";
import {
  INNERMOST_RING_DASH,
  MIDDLE_RING_DASH,
  MIDDLE_RING_ROTATION_SPEED,
} from "../constants";
import {
  RADIUS_INNER_ARC,
  RADIUS_INNERMOST,
  RADIUS_MIDDLE,
  SWEEP_START_ANGLE_RAD,
} from "../stageLayout";
import { getInnerSweepRadians } from "../sweep";
import type { ElapsedParams, TimelineParams } from "../types";

export const drawMiddleRing = (
  ctx: CanvasRenderingContext2D,
  { cx, cy, elapsed }: ElapsedParams,
): void => {
  ctx.save();
  ctx.setLineDash(MIDDLE_RING_DASH);
  ctx.lineDashOffset = -elapsed * MIDDLE_RING_ROTATION_SPEED;
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
  ctx.beginPath();
  ctx.arc(cx, cy, RADIUS_MIDDLE, 0, FULL_CIRCLE_RAD);
  ctx.stroke();
  ctx.restore();
};

export const drawInnerArc = (
  ctx: CanvasRenderingContext2D,
  { cx, cy, t }: TimelineParams,
): void => {
  const sweepRadians = getInnerSweepRadians(t);
  if (sweepRadians <= 0) {
    return;
  }

  ctx.save();
  ctx.lineWidth = 2.5;
  ctx.lineCap = "round";
  ctx.strokeStyle = "rgba(255, 255, 255, 0.95)";
  ctx.beginPath();
  ctx.arc(
    cx,
    cy,
    RADIUS_INNER_ARC,
    SWEEP_START_ANGLE_RAD,
    SWEEP_START_ANGLE_RAD + sweepRadians,
  );
  ctx.stroke();
  ctx.restore();
};

export const drawInnermostRing = (
  ctx: CanvasRenderingContext2D,
  { cx, cy, elapsed }: ElapsedParams,
): void => {
  const pulse = 0.25 + 0.2 * Math.sin(elapsed * 0.005);

  ctx.save();
  ctx.setLineDash(INNERMOST_RING_DASH);
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = `rgba(255, 255, 255, ${pulse})`;
  ctx.beginPath();
  ctx.arc(cx, cy, RADIUS_INNERMOST, 0, FULL_CIRCLE_RAD);
  ctx.stroke();
  ctx.restore();
};
