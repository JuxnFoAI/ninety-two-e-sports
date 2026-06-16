import type { DivisionRoster as DivisionRosterData } from "../../types/pilot";
import { RevealItem } from "../reveal";
import { PilotCard } from "./PilotCard";

interface DivisionRosterProps {
  division: DivisionRosterData;
  revealStartIndex: number;
  animatedKey: string;
}

export const DivisionRoster = ({
  division,
  revealStartIndex,
  animatedKey,
}: DivisionRosterProps): JSX.Element => {
  const { badgeLabel, leaderLabel, leader, pilots, gradient } = division;
  const roster = [leader, ...pilots];

  return (
    <div
      key={animatedKey}
      className="mt-8 [animation:teamFadeUp_360ms_ease-out]"
    >
      <RevealItem
        as="div"
        index={revealStartIndex}
        className="flex items-center gap-3"
      >
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/35" />
        <span
          className="inline-flex rounded-full border border-white/20 px-3 py-1 font-[var(--font-orbitron)] text-[0.68rem] font-semibold uppercase tracking-[0.17em] text-white"
          style={{ backgroundImage: gradient }}
        >
          {badgeLabel}
        </span>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/35" />
      </RevealItem>

      <div className="mt-5 bg-[#0c0c0c] px-6 py-8 sm:px-6">
        <ul
          className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 p-0 lg:grid-cols-[repeat(auto-fit,minmax(190px,1fr))] lg:gap-5 xl:grid-cols-[repeat(auto-fit,minmax(205px,1fr))]"
          role="list"
        >
          <RevealItem as="li" index={revealStartIndex + 1}>
            <PilotCard pilot={leader} leaderLabel={leaderLabel} />
          </RevealItem>

          {roster.slice(1).map((pilot, pilotIndex) => (
            <RevealItem
              as="li"
              key={pilot.id}
              index={revealStartIndex + 2 + pilotIndex}
            >
              <PilotCard pilot={pilot} />
            </RevealItem>
          ))}
        </ul>
      </div>
    </div>
  );
};
