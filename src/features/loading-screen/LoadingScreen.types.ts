export interface LoadingScreenProps {
  /** Animation duration in milliseconds. Default: 2000. */
  duration?: number;
  /** Called once when the overlay begins fading and the site underneath can enter. */
  onFadeStart?: () => void;
  /** Called once after the fade-out transition finishes and the site is shown. */
  onComplete?: () => void;
}
