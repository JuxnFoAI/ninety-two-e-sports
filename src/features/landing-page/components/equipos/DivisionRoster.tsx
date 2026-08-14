import type { DivisionRoster as DivisionRosterData } from "../../types/pilot";
import { RevealItem } from "../reveal";
import styles from "./DivisionRoster.module.css";
import { PilotCard } from "./PilotCard";

interface DivisionRosterProps {
  division: DivisionRosterData;
  /** Absolute delay before the first pilot card starts revealing. */
  revealDelayMs: number;
  /** Stagger between consecutive pilot cards. */
  revealStaggerMs?: number;
  animatedKey: string;
}

export const DivisionRoster = ({
  division,
  revealDelayMs,
  revealStaggerMs = 70,
  animatedKey,
}: DivisionRosterProps): JSX.Element => {
  const { leader, pilots } = division;
  const roster = [leader, ...pilots];

  return (
    <div
      key={animatedKey}
      className="mt-[clamp(3.75rem,9vw,5.5rem)] [animation:teamFadeUp_360ms_ease-out]"
    >
      <div className="px-0 py-2 sm:px-0">
        <ul className={styles.grid} role="list">
          <RevealItem as="li" delayMs={revealDelayMs}>
            <PilotCard pilot={leader} />
          </RevealItem>

          {roster.slice(1).map((pilot, pilotIndex) => (
            <RevealItem
              as="li"
              key={pilot.id}
              delayMs={revealDelayMs + (pilotIndex + 1) * revealStaggerMs}
            >
              <PilotCard pilot={pilot} />
            </RevealItem>
          ))}
        </ul>
      </div>
    </div>
  );
};
