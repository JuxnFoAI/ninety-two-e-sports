import { FULL_CIRCLE_RAD, pointOnCircle } from "@/shared/lib/geometry";
import {
  OUTER_ARC_DASH,
  OUTER_GHOST_ALPHA_MIN,
  OUTER_GHOST_ALPHA_RANGE,
  TICK_ACTIVE_ALPHA,
  TICK_COUNT,
  TICK_INACTIVE_ALPHA,
  TICK_MAJOR_INTERVAL,
  TICK_MAJOR_LENGTH_PX,
  TICK_MAJOR_WIDTH_PX,
  TICK_MINOR_LENGTH_PX,
  TICK_MINOR_WIDTH_PX,
} from "../constants";
import { RADIUS_OUTER, SWEEP_START_ANGLE_RAD } from "../stageLayout";
import { getOuterSweepRadians, isAngleWithinSweep } from "../sweep";
import type { OuterGhostParams, TimelineParams } from "../types";

export const drawOuterGhost = (
  ctx: CanvasRenderingContext2D,
  { cx, cy, easedProgress }: OuterGhostParams,
): void => {
  const alpha = OUTER_GHOST_ALPHA_MIN + OUTER_GHOST_ALPHA_RANGE * easedProgress;

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, RADIUS_OUTER, 0, FULL_CIRCLE_RAD);
  ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
  ctx.lineWidth = 0.5;
  ctx.stroke();
  ctx.restore();
};

export const drawOuterArc = (
  ctx: CanvasRenderingContext2D,
  { cx, cy, t }: TimelineParams,
): void => {
  const sweepRadians = getOuterSweepRadians(t);
  if (sweepRadians <= 0) {
    return;
  }

  const circumference = FULL_CIRCLE_RAD * RADIUS_OUTER;
  const dashOffset = circumference * (1 - sweepRadians / FULL_CIRCLE_RAD);

  ctx.save();
  ctx.setLineDash(OUTER_ARC_DASH);
  ctx.lineDashOffset = dashOffset;
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
  ctx.beginPath();
  ctx.arc(
    cx,
    cy,
    RADIUS_OUTER,
    SWEEP_START_ANGLE_RAD,
    SWEEP_START_ANGLE_RAD + sweepRadians,
  );
  ctx.stroke();
  ctx.restore();
};

export const drawTicks = (
  ctx: CanvasRenderingContext2D,
  { cx, cy, t }: TimelineParams,
): void => {
  const sweepRadians = getOuterSweepRadians(t);

  for (let index = 0; index < TICK_COUNT; index += 1) {
    const angle =
      SWEEP_START_ANGLE_RAD +
      (index / TICK_COUNT) * FULL_CIRCLE_RAD +
      FULL_CIRCLE_RAD / TICK_COUNT;
    const isMajor = index % TICK_MAJOR_INTERVAL === 0;
    const tickLength = isMajor ? TICK_MAJOR_LENGTH_PX : TICK_MINOR_LENGTH_PX;
    const lineWidth = isMajor ? TICK_MAJOR_WIDTH_PX : TICK_MINOR_WIDTH_PX;
    const isActive = isAngleWithinSweep(angle, sweepRadians);
    const alpha = isActive ? TICK_ACTIVE_ALPHA : TICK_INACTIVE_ALPHA;

    const outer = pointOnCircle(cx, cy, RADIUS_OUTER, angle);
    const inner = pointOnCircle(cx, cy, RADIUS_OUTER - tickLength, angle);

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(outer.x, outer.y);
    ctx.lineTo(inner.x, inner.y);
    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.restore();
  }
};
