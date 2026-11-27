/**
 * `sculpt`: WebGL intro — ink inside the N2 silhouette, then a sweep to solid
 * white (high and mid-range devices).
 * `classic`: GSAP logo + bar, for low-end devices, reduced motion or when
 * WebGL fails.
 */
export type LoaderVariant = "sculpt" | "classic";

export interface LoadingScreenProps {
  /** Classic animation duration in milliseconds. Default: 2000. */
  duration?: number;
  /** Called once when the overlay begins fading and the site underneath can enter. */
  onFadeStart?: () => void;
  /** Called once after the fade-out transition finishes and the site is shown. */
  onComplete?: () => void;
}
