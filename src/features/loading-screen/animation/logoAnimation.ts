import { easeOut } from "@/shared/lib/easings";
import {
  LOGO_FADE_END_T,
  LOGO_FADE_START_T,
  LOGO_SCALE_END,
  LOGO_SCALE_START,
} from "../canvas/stageLayout";

interface LogoAnimationValues {
  opacity: number;
  scale: number;
}

/** Maps normalized timeline to logo opacity and scale. */
const getLogoAnimationValues = (t: number): LogoAnimationValues => {
  if (t < LOGO_FADE_START_T) {
    return { opacity: 0, scale: LOGO_SCALE_START };
  }

  const windowDuration = LOGO_FADE_END_T - LOGO_FADE_START_T;
  const localT = Math.min((t - LOGO_FADE_START_T) / windowDuration, 1);
  const eased = easeOut(localT);

  return {
    opacity: eased,
    scale: LOGO_SCALE_START + (LOGO_SCALE_END - LOGO_SCALE_START) * eased,
  };
};

/** Applies logo opacity and scale directly on the image element. */
export const applyLogoAnimation = (logo: HTMLImageElement, t: number): void => {
  const { opacity, scale } = getLogoAnimationValues(t);
  logo.style.opacity = String(opacity);
  logo.style.transform = `translate(-50%, -50%) scale(${scale})`;
};
