import { easeOut } from "@/shared/lib/easings";
import { FULL_CIRCLE_RAD, normalizeAngle } from "@/shared/lib/geometry";
import {
  INNER_ARC_END_T,
  OUTER_ARC_END_T,
  SWEEP_START_ANGLE_RAD,
} from "./stageLayout";

export const getOuterSweepRadians = (t: number): number => {
  const sweepT = easeOut(Math.min(t / OUTER_ARC_END_T, 1));
  return sweepT * FULL_CIRCLE_RAD;
};

export const getInnerSweepRadians = (t: number): number => {
  const sweepT = easeOut(Math.min(t / INNER_ARC_END_T, 1));
  return sweepT * FULL_CIRCLE_RAD;
};

export const isAngleWithinSweep = (
  angle: number,
  sweepRadians: number,
): boolean => {
  const start = normalizeAngle(SWEEP_START_ANGLE_RAD);
  const end = normalizeAngle(SWEEP_START_ANGLE_RAD + sweepRadians);
  const current = normalizeAngle(angle);

  if (end >= start) {
    return current >= start && current <= end;
  }

  return current >= start || current <= end;
};
