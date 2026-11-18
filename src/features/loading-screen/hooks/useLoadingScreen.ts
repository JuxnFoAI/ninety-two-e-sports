import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import { useEffectiveReducedMotion } from "@/features/accessibility";
import { MOBILE_MEDIA_QUERY } from "@/shared/constants/breakpoints";

import {
  applyLoaderEndState,
  createLoaderTimeline,
} from "../animation/createLoaderTimeline";
import {
  DEFAULT_LOADING_DURATION_MS,
  FADE_OUT_DELAY_MS,
  FADE_OUT_TRANSITION_MS,
  MOBILE_LOADING_DURATION_MS,
} from "../constants";
import type { LoadingScreenProps } from "../LoadingScreen.types";
import { useFadeOutSequence } from "./useFadeOutSequence";

const resolveInitialDuration = (overrideMs?: number): number => {
  if (overrideMs != null) {
    return overrideMs;
  }

  const isMobile = window.matchMedia(MOBILE_MEDIA_QUERY).matches;

  return isMobile ? MOBILE_LOADING_DURATION_MS : DEFAULT_LOADING_DURATION_MS;
};

export const useLoadingScreen = ({
  duration,
  onComplete,
  onFadeStart,
}: LoadingScreenProps) => {
  const resolvedDurationRef = useRef(resolveInitialDuration(duration));
  const resolvedDuration = duration ?? resolvedDurationRef.current;
  const scopeRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useEffectiveReducedMotion();

  const { isFading, announceLoaded, startFadeOut, notifyFadeTransitionEnd } =
    useFadeOutSequence({
      onComplete,
      onFadeStart,
    });

  useLayoutEffect(() => {
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

    const seconds = Math.max(resolvedDuration, 1) / 1000;
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
  }, [prefersReducedMotion, resolvedDuration, startFadeOut]);

  useEffect(() => {
    const failsafeMs =
      resolvedDuration + FADE_OUT_DELAY_MS + FADE_OUT_TRANSITION_MS + 2500;

    const timer = window.setTimeout(() => {
      startFadeOut();
    }, failsafeMs);

    return () => {
      window.clearTimeout(timer);
    };
  }, [resolvedDuration, startFadeOut]);

  return {
    scopeRef,
    logoRef,
    barRef,
    isFading,
    announceLoaded,
    notifyFadeTransitionEnd,
  };
};
