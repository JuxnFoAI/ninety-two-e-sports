import { usePrefersReducedMotion } from "@/shared/hooks";

import { useAccessibility } from "../useAccessibility";

/** System preference OR user-enabled reduced motion from accessibility settings. */
export const useEffectiveReducedMotion = (): boolean => {
  const systemPrefersReducedMotion = usePrefersReducedMotion();
  const { settings } = useAccessibility();

  return systemPrefersReducedMotion || settings.reduceMotion;
};

/** Whether decorative background media should be shown. */
export const useBackgroundMediaEnabled = (): boolean => {
  const { settings } = useAccessibility();

  return !settings.muteBackgroundMedia && !settings.readingMode;
};

/** Whether YouTube embeds should request captions. */
export const useCaptionsPreferred = (): boolean => {
  const { settings } = useAccessibility();

  return settings.emphasizeCaptions;
};
