import type { Pilot } from "../../types/pilot";
import { PilotAvatar } from "./PilotAvatar";

interface PilotCardProps {
  pilot: Pilot;
  leaderLabel?: string;
}

export const PilotCard = ({
  pilot,
  leaderLabel,
}: PilotCardProps): JSX.Element => {
  const isLeader = Boolean(leaderLabel);

  return (
    <article
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-[10px] border border-[#222] bg-[#111] font-[var(--font-rajdhani)] transition-all duration-300 hover:-translate-y-[6px] hover:border-[#444]"
      aria-label={isLeader ? `${pilot.alias}, ${leaderLabel}` : pilot.alias}
    >
      <PilotAvatar pilot={pilot} />

      <div className="border-t border-[#1c1c1c] px-[14px] py-[12px]">
        <div className="min-w-0">
          <h3 className="m-0 truncate font-[var(--font-orbitron)] text-[10px] font-semibold uppercase tracking-[0.08em] text-[#e0e0e0]">
            {pilot.alias}
          </h3>
          {isLeader ? (
            <>
              <p className="mt-1 m-0 truncate text-[10px] font-semibold uppercase tracking-[0.08em] text-[#bdbdbd]">
                {pilot.role}
              </p>
              <p className="mt-1 m-0 truncate text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8f8f8f]">
                {pilot.country}
              </p>
            </>
          ) : (
            <p className="mt-1 m-0 truncate text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8f8f8f]">
              {pilot.country}
            </p>
          )}
        </div>
      </div>
    </article>
  );
};
