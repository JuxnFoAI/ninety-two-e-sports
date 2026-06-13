import { useEffect, useRef } from "react";

type AnimationFrameCallback = (elapsed: number, t: number) => void;

interface UseAnimationLoopOptions {
  duration: number;
  enabled: boolean;
  onFrame: AnimationFrameCallback;
  onTimelineEnd?: () => void;
}

/**
 * Drives a single requestAnimationFrame loop from 0 → duration.
 * Cleans up the frame on unmount or when disabled.
 */
export const useAnimationLoop = ({
  duration,
  enabled,
  onFrame,
  onTimelineEnd,
}: UseAnimationLoopOptions): void => {
  const onFrameRef = useRef(onFrame);
  const onTimelineEndRef = useRef(onTimelineEnd);

  onFrameRef.current = onFrame;
  onTimelineEndRef.current = onTimelineEnd;

  useEffect(() => {
    if (!enabled || duration <= 0) {
      return undefined;
    }

    const startTime = performance.now();
    let frameId = 0;
    let timelineEnded = false;

    const tick = (now: number): void => {
      const elapsed = now - startTime;
      const t = Math.min(Math.max(elapsed / duration, 0), 1);

      onFrameRef.current(elapsed, t);

      if (t < 1) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      if (!timelineEnded) {
        timelineEnded = true;
        onTimelineEndRef.current?.();
      }
    };

    tick(performance.now());

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [duration, enabled]);
};
