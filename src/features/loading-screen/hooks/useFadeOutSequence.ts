import { useCallback, useEffect, useRef, useState } from "react";
import { FADE_OUT_DELAY_MS, FADE_OUT_TRANSITION_MS } from "../constants";

interface UseFadeOutSequenceOptions {
  onComplete?: () => void;
}

interface UseFadeOutSequenceResult {
  isFading: boolean;
  announceLoaded: boolean;
  startFadeOut: () => void;
  complete: () => void;
}

/** Manages the post-animation fade-out and fires onComplete exactly once. */
export const useFadeOutSequence = ({
  onComplete,
}: UseFadeOutSequenceOptions): UseFadeOutSequenceResult => {
  const onCompleteRef = useRef(onComplete);
  const hasCompletedRef = useRef(false);
  const fadeStartedRef = useRef(false);
  const fadeDelayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeCompleteTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const [isFading, setIsFading] = useState(false);
  const [announceLoaded, setAnnounceLoaded] = useState(false);

  onCompleteRef.current = onComplete;

  const clearFadeTimers = useCallback(() => {
    if (fadeDelayTimerRef.current !== null) {
      clearTimeout(fadeDelayTimerRef.current);
      fadeDelayTimerRef.current = null;
    }
    if (fadeCompleteTimerRef.current !== null) {
      clearTimeout(fadeCompleteTimerRef.current);
      fadeCompleteTimerRef.current = null;
    }
  }, []);

  const fireCompleteOnce = useCallback(() => {
    if (hasCompletedRef.current) {
      return;
    }
    hasCompletedRef.current = true;
    setAnnounceLoaded(true);
    onCompleteRef.current?.();
  }, []);

  const startFadeOut = useCallback(() => {
    if (fadeStartedRef.current || hasCompletedRef.current) {
      return;
    }

    fadeStartedRef.current = true;

    fadeDelayTimerRef.current = setTimeout(() => {
      setIsFading(true);

      fadeCompleteTimerRef.current = setTimeout(() => {
        fireCompleteOnce();
      }, FADE_OUT_TRANSITION_MS);
    }, FADE_OUT_DELAY_MS);
  }, [fireCompleteOnce]);

  useEffect(
    () => () => {
      clearFadeTimers();
    },
    [clearFadeTimers],
  );

  return {
    isFading,
    announceLoaded,
    startFadeOut,
    complete: fireCompleteOnce,
  };
};
