import { useEffectiveReducedMotion } from "@/features/accessibility";

import styles from "./TwitchIcon.module.css";

type TwitchIconProps = {
  size?: number;
  className?: string;
};

/**
 * Official Twitch Glitch mark with a looping blink / glitch.
 * Respects the site’s effective reduced-motion setting.
 */
export const TwitchIcon = ({
  size = 16,
  className = "",
}: TwitchIconProps): JSX.Element => {
  const prefersReducedMotion = useEffectiveReducedMotion();

  return (
    <svg
      className={`${styles.mark} ${
        prefersReducedMotion ? "" : styles.animated
      } ${className}`.trim()}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        className={styles.body}
        fillRule="evenodd"
        d="M2.15 0 .79 4.12v16.84h5.73V24l3.45-3.05h4.49L22.29 12V0H2.15zm19.16 13.61-3.58 3.58h-5.73l-3.05 3.05v-3.05H4.79V1.5h16.52v12.11z"
      />
      <rect
        className={styles.eye}
        x="10.66"
        y="6.72"
        width="1.79"
        height="5.73"
        rx="0.2"
      />
      <rect
        className={styles.eye}
        x="15.43"
        y="6.72"
        width="1.79"
        height="5.73"
        rx="0.2"
      />
    </svg>
  );
};
