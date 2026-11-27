import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

import { useEffectiveReducedMotion } from "@/features/accessibility";
import { detectDeviceTier } from "@/shared/lib/deviceTier";

import {
  applyLoaderEndState,
  createLoaderTimeline,
} from "../animation/createLoaderTimeline";
import {
  FADE_OUT_DELAY_MS,
  FADE_OUT_TRANSITION_MS,
  FAILSAFE_MARGIN_MS,
  LOADING_DURATION_MS,
  SCULPT_DURATION_MS,
  SCULPT_MAX_PIXEL_RATIO,
} from "../constants";
import type { LoaderVariant, LoadingScreenProps } from "../LoadingScreen.types";
import { playSculptIntro } from "../sculpt/playSculptIntro";
import { useFadeOutSequence } from "./useFadeOutSequence";

export const useLoadingScreen = ({
  duration = LOADING_DURATION_MS,
  onComplete,
  onFadeStart,
}: LoadingScreenProps) => {
  const scopeRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useEffectiveReducedMotion();
  const [deviceTier] = useState(detectDeviceTier);
  const [sculptFailed, setSculptFailed] = useState(false);

  const variant: LoaderVariant =
    deviceTier === "low" || prefersReducedMotion || sculptFailed
      ? "classic"
      : "sculpt";

  const { isFading, announceLoaded, startFadeOut, notifyFadeTransitionEnd } =
    useFadeOutSequence({
      onComplete,
      onFadeStart,
    });

  useLayoutEffect(() => {
    if (variant !== "classic") {
      return undefined;
    }
    const logo = logoRef.current;
    const bar = barRef.current;
    if (!logo || !bar) {
      return undefined;
    }

    if (prefersReducedMotion) {
      applyLoaderEndState(logo, bar);
      bar.setAttribute("aria-valuenow", "100");
      startFadeOut();
      return undefined;
    }

    bar.setAttribute("aria-valuenow", "0");

    const seconds = Math.max(duration, 1) / 1000;
    let timeline: gsap.core.Timeline | null = null;

    const context = gsap.context(() => {
      timeline = createLoaderTimeline({
        logo,
        bar,
        onProgress: (progress) => {
          bar.setAttribute("aria-valuenow", String(Math.round(progress * 100)));
        },
        onComplete: () => {
          startFadeOut();
        },
      });
      timeline.timeScale(1 / seconds);
      timeline.play();
    }, scopeRef);

    return () => {
      timeline?.kill();
      context.revert();
    };
  }, [variant, prefersReducedMotion, duration, startFadeOut]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (variant !== "sculpt" || !canvas) {
      return undefined;
    }

    const sculptTier = deviceTier === "high" ? "high" : "mid";

    return playSculptIntro({
      canvas,
      maxPixelRatio: SCULPT_MAX_PIXEL_RATIO[sculptTier],
      onComplete: startFadeOut,
      onError: () => {
        setSculptFailed(true);
      },
    });
  }, [variant, deviceTier, startFadeOut]);

  useEffect(() => {
    const animationMs = variant === "sculpt" ? SCULPT_DURATION_MS : duration;
    const failsafeMs =
      animationMs +
      FADE_OUT_DELAY_MS +
      FADE_OUT_TRANSITION_MS +
      FAILSAFE_MARGIN_MS;

    const timer = window.setTimeout(() => {
      startFadeOut();
    }, failsafeMs);

    return () => {
      window.clearTimeout(timer);
    };
  }, [variant, duration, startFadeOut]);

  return {
    variant,
    scopeRef,
    logoRef,
    barRef,
    canvasRef,
    isFading,
    announceLoaded,
    notifyFadeTransitionEnd,
  };
};
