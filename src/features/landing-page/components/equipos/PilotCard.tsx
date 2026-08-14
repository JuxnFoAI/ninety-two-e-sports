import { useEffectiveReducedMotion } from "@/features/accessibility";

import type { Pilot } from "../../types/pilot";
import { TwitchIcon } from "../icons/TwitchIcon";
import { CountryFlag } from "./CountryFlag";
import { MarqueeText } from "./MarqueeText";
import { PilotAvatar } from "./PilotAvatar";
import styles from "./PilotCard.module.css";

interface PilotCardProps {
  pilot: Pilot;
}

const twitchHandleFromUrl = (url: string): string => {
  try {
    const path = new URL(url).pathname.replace(/\/+$/, "");
    return path.split("/").filter(Boolean).at(-1) ?? url;
  } catch {
    return url;
  }
};

/**
 * Photo-first card: alias sits under the photo at rest; the info panel
 * wipes open on hover / focus and keeps the alias inside.
 */
export const PilotCard = ({
  pilot,
}: PilotCardProps): JSX.Element => {
  const prefersReducedMotion = useEffectiveReducedMotion();
  const { caption, twitchUrl } = pilot;
  const twitchHandle = twitchUrl ? twitchHandleFromUrl(twitchUrl) : null;
  const ariaBits = [pilot.alias, caption, twitchHandle, pilot.country].filter(
    Boolean,
  );

  return (
    <article
      className={`${styles.root} ${
        twitchUrl ? styles.rootWithTwitch : ""
      } font-[var(--font-rajdhani)]`}
      aria-label={ariaBits.join(", ")}
    >
      <div className={styles.media} tabIndex={0} data-pilot-photo="">
        <PilotAvatar pilot={pilot} />
      </div>

      <p className={styles.namePlate} aria-hidden="true">
        <span className={`${styles.namePlateText} font-[var(--font-orbitron)]`}>
          {pilot.alias}
        </span>
      </p>

      <div
        className={`${styles.details} ${
          prefersReducedMotion ? styles.detailsOpen : ""
        }`}
        data-pilot-panel=""
      >
        <div className={styles.detailsInner}>
          <div className={styles.detailsContent}>
            <h3 className={`${styles.alias} font-[var(--font-orbitron)]`}>
              <MarqueeText text={pilot.alias} />
            </h3>
            {caption ? (
              <p className={`${styles.caption} font-[var(--font-rajdhani)]`}>
                <MarqueeText text={caption} />
              </p>
            ) : null}
            {twitchUrl && twitchHandle ? (
              <a
                className={styles.twitchLink}
                href={twitchUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Canal de Twitch: ${twitchHandle}`}
                onClick={(event) => event.stopPropagation()}
              >
                <TwitchIcon size={15} />
                <MarqueeText text={twitchHandle} />
              </a>
            ) : null}
            <p className={`${styles.country} font-[var(--font-rajdhani)]`}>
              <CountryFlag country={pilot.country} />
              <MarqueeText
                text={pilot.country}
                className={styles.countryLabel}
              />
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};
