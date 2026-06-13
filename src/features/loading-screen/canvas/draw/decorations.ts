import { easeOut } from "@/shared/lib/easings";
import { FULL_CIRCLE_RAD, pointOnCircle } from "@/shared/lib/geometry";
import {
  BRIGHT_DOT_RADIUS_PX,
  BRIGHT_DOT_TRAIL_ANGLE_STEP,
  BRIGHT_DOT_TRAIL_STEPS,
  DIAMOND_COUNT,
  DIAMOND_FADE_IN_MS,
  DIAMOND_ORBIT_SPEED,
  DIAMOND_SIZE_PX,
  DIAMOND_STAGGER_MS,
  ENERGY_RAY_COUNT,
  ENERGY_RAY_ROTATION_SPEED,
} from "../constants";
import {
  BRIGHT_DOT_HIDE_T,
  RADIUS_DIAMONDS,
  RADIUS_INNER_ARC,
  RADIUS_RAYS_INNER,
  RADIUS_RAYS_OUTER,
  SWEEP_START_ANGLE_RAD,
} from "../stageLayout";
import { getInnerSweepRadians } from "../sweep";
import type { ElapsedParams, TimelineParams } from "../types";

export const drawBrightDot = (
  ctx: CanvasRenderingContext2D,
  { cx, cy, t }: TimelineParams,
): void => {
  if (t > BRIGHT_DOT_HIDE_T) {
    return;
  }

  const sweepRadians = getInnerSweepRadians(t);
  const tipAngle = SWEEP_START_ANGLE_RAD + sweepRadians;

  for (let step = BRIGHT_DOT_TRAIL_STEPS; step >= 0; step -= 1) {
    const trailAngle = tipAngle - step * BRIGHT_DOT_TRAIL_ANGLE_STEP;
    const trailPoint = pointOnCircle(cx, cy, RADIUS_INNER_ARC, trailAngle);
    const alpha =
      step === 0 ? 1 : 0.15 * (1 - step / (BRIGHT_DOT_TRAIL_STEPS + 1));
    const radius =
      step === 0 ? BRIGHT_DOT_RADIUS_PX : BRIGHT_DOT_RADIUS_PX * 0.65;

    ctx.save();
    ctx.beginPath();
    ctx.arc(trailPoint.x, trailPoint.y, radius, 0, FULL_CIRCLE_RAD);
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fill();
    ctx.restore();
  }
};

export const drawCardinalDiamonds = (
  ctx: CanvasRenderingContext2D,
  { cx, cy, elapsed }: ElapsedParams,
): void => {
  const orbitAngle = elapsed * DIAMOND_ORBIT_SPEED;

  for (let index = 0; index < DIAMOND_COUNT; index += 1) {
    const appearAt = index * DIAMOND_STAGGER_MS;
    if (elapsed < appearAt) {
      continue;
    }

    const localElapsed = elapsed - appearAt;
    const fadeIn = easeOut(Math.min(localElapsed / DIAMOND_FADE_IN_MS, 1));
    const baseAngle =
      (index / DIAMOND_COUNT) * FULL_CIRCLE_RAD + orbitAngle - Math.PI / 2;
    const { x, y } = pointOnCircle(cx, cy, RADIUS_DIAMONDS, baseAngle);
    const half = DIAMOND_SIZE_PX / 2;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.PI / 4 + orbitAngle * 0.5);
    ctx.fillStyle = `rgba(255, 255, 255, ${0.85 * fadeIn})`;
    ctx.fillRect(-half, -half, DIAMOND_SIZE_PX, DIAMOND_SIZE_PX);
    ctx.restore();
  }
};

export const drawEnergyRays = (
  ctx: CanvasRenderingContext2D,
  { cx, cy, elapsed }: ElapsedParams,
): void => {
  const rotation = -elapsed * ENERGY_RAY_ROTATION_SPEED;

  for (let index = 0; index < ENERGY_RAY_COUNT; index += 1) {
    const angle = rotation + (index / ENERGY_RAY_COUNT) * FULL_CIRCLE_RAD;
    const alpha = index % 2 === 0 ? 0.35 : 0.15;
    const inner = pointOnCircle(cx, cy, RADIUS_RAYS_INNER, angle);
    const outer = pointOnCircle(cx, cy, RADIUS_RAYS_OUTER, angle);

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(inner.x, inner.y);
    ctx.lineTo(outer.x, outer.y);
    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.lineWidth = 1;
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.restore();
  }
};
