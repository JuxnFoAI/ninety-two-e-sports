export interface LoadingScreenProps {
  /** Animation duration in milliseconds. Default: 4000 */
  duration?: number;
  /** Called once after the fade-out transition finishes. */
  onComplete?: () => void;
}
