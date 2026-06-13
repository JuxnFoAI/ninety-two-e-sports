import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useAnimationLoop, usePrefersReducedMotion } from "@/shared/hooks";
import { easeOut } from "@/shared/lib/easings";
import { applyLogoAnimation } from "../animation/logoAnimation";
import { paintStage } from "../canvas/paintStage";
import { setupCanvas } from "../canvas/setupCanvas";
import {
  DEFAULT_LOADING_DURATION_MS,
  REDUCED_MOTION_TIMEOUT_MS,
} from "../constants";
import type { LoadingScreenProps } from "../LoadingScreen.types";
import { useFadeOutSequence } from "./useFadeOutSequence";

export const useLoadingScreen = ({
  duration = DEFAULT_LOADING_DURATION_MS,
  onComplete,
}: LoadingScreenProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    setupCanvas(canvas);
    return undefined;
  }, []);
  const logoRef = useRef<HTMLImageElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [animationEnabled, setAnimationEnabled] = useState(true);
  const [progress, setProgress] = useState(0);

  const { isFading, announceLoaded, startFadeOut, complete } =
    useFadeOutSequence({
      onComplete,
    });

  useEffect(() => {
    if (!prefersReducedMotion) {
      return undefined;
    }

    setAnimationEnabled(false);

    const canvas = canvasRef.current;
    const ctx = canvas ? setupCanvas(canvas) : null;
    if (ctx) {
      paintStage({ ctx, elapsed: duration, t: 1 });
    }

    const logo = logoRef.current;
    if (logo) {
      applyLogoAnimation(logo, 1);
    }

    setProgress(1);

    const timer = setTimeout(complete, REDUCED_MOTION_TIMEOUT_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [complete, duration, prefersReducedMotion]);

  useLayoutEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    const logo = logoRef.current;
    if (logo) {
      applyLogoAnimation(logo, 0);
    }

    return undefined;
  }, [prefersReducedMotion]);

  const paintFrame = useCallback((elapsed: number, t: number) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = setupCanvas(canvas);
    if (!ctx) {
      return;
    }

    paintStage({ ctx, elapsed, t });
    setProgress(easeOut(t));

    const logo = logoRef.current;
    if (logo) {
      applyLogoAnimation(logo, t);
    }
  }, []);

  useAnimationLoop({
    duration,
    enabled: animationEnabled && !prefersReducedMotion,
    onFrame: paintFrame,
    onTimelineEnd: () => {
      setAnimationEnabled(false);
      startFadeOut();
    },
  });

  return {
    canvasRef,
    logoRef,
    isFading,
    announceLoaded,
    progress,
  };
};
