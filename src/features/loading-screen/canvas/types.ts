export interface RingBaseParams {
  cx: number;
  cy: number;
}

export interface OuterGhostParams extends RingBaseParams {
  easedProgress: number;
}

export interface TimelineParams extends RingBaseParams {
  t: number;
}

export interface ElapsedParams extends RingBaseParams {
  elapsed: number;
}
