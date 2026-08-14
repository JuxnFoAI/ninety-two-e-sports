import type { CSSProperties } from "react";

import { useEffectiveReducedMotion } from "@/features/accessibility";
import { getRevealDelayMs } from "@/shared/lib/revealAnimation";

import type { Sponsor } from "../../types/sponsor";
import { useRevealSection } from "../reveal/useRevealSection";
import { SponsorCard } from "./SponsorCard";
import styles from "./SponsorGrid.module.css";

interface SponsorGridProps {
  revealStartIndex: number;
  sponsors: readonly Sponsor[];
  /** Extra wait before the first card rises (e.g. after the section title). */
  baseDelayMs?: number;
}

export const SponsorGrid = ({
  revealStartIndex,
  sponsors,
  baseDelayMs = 0,
}: SponsorGridProps): JSX.Element => {
  const isVisible = useRevealSection();
  const prefersReducedMotion = useEffectiveReducedMotion();

  return (
    <ul
      className={styles.grid}
      role="list"
      aria-label="Marcas patrocinadoras"
    >
      {sponsors.map((sponsor, sponsorIndex) => {
        const delayMs = prefersReducedMotion
          ? 0
          : baseDelayMs + getRevealDelayMs(revealStartIndex + sponsorIndex);

        return (
          <li key={sponsor.id} className={styles.item}>
            <div
              className={`${styles.rise} ${
                isVisible
                  ? prefersReducedMotion
                    ? styles.riseVisible
                    : styles.riseAnimated
                  : ""
              }`}
              style={
                isVisible && !prefersReducedMotion
                  ? ({ animationDelay: `${delayMs}ms` } as CSSProperties)
                  : undefined
              }
            >
              <SponsorCard sponsor={sponsor} />
            </div>
          </li>
        );
      })}
    </ul>
  );
};
