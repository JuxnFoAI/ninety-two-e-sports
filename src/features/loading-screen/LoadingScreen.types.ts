export interface LoadingScreenProps {
  /** Animation duration in milliseconds. Default: 4000 desktop / 2200 mobile. */
  duration?: number;
  /** Called once after the fade-out transition finishes. */
  onComplete?: () => void;
}
