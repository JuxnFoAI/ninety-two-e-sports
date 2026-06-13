import { useState } from "react";
import { DIVISION_ROSTERS } from "../../data/pilots";
import { SECTION_COMPACT_HEADER_WITH_CONTROLS_REVEAL_START } from "../../lib/revealOffsets";
import type { DivisionId } from "../../types/pilot";
import { SectionHeader } from "../SectionHeader";
import { RevealItem, RevealSection } from "../reveal";
import { DivisionRoster } from "./DivisionRoster";

const DIVISION_UI: Record<
  DivisionId,
  {
    buttonLabel: string;
    badgeLabel: string;
    gradient: string;
  }
> = {
  america: {
    buttonLabel: "AMERICANA",
    badgeLabel: "DIVISIÓN AMERICANA",
    gradient: "linear-gradient(135deg, #65a30d 0%, #bef264 100%)",
  },
  europe: {
    buttonLabel: "EUROPEA",
    badgeLabel: "DIVISION EUROPEA",
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
  },
};

export const EquiposSection = (): JSX.Element => {
  const [activeDivisionId, setActiveDivisionId] =
    useState<DivisionId>("america");
  const activeDivision =
    DIVISION_ROSTERS.find((division) => division.id === activeDivisionId) ??
    DIVISION_ROSTERS[0];
  const activeDivisionUi = DIVISION_UI[activeDivision.id];

  return (
    <RevealSection
      id="equipos"
      aria-labelledby="equipos-title"
      className="font-[var(--font-rajdhani)]"
    >
      <SectionHeader titleId="equipos-title" title="Equipo" />

      <RevealItem
        as="div"
        index={1}
        className="relative mt-7 flex flex-wrap gap-3"
      >
        {DIVISION_ROSTERS.map((division) => {
          const isActive = division.id === activeDivision.id;
          const divisionUi = DIVISION_UI[division.id];

          return (
            <button
              key={division.id}
              type="button"
              onClick={() => setActiveDivisionId(division.id)}
              className={`rounded-full border px-4 py-2 font-[var(--font-orbitron)] text-[0.74rem] font-semibold uppercase tracking-[0.16em] transition ${
                isActive
                  ? "border-transparent text-white shadow-[0_0_1.2rem_rgba(255,255,255,0.18)]"
                  : "border-white/20 bg-black/35 text-white/80 hover:border-white/40"
              }`}
              style={
                isActive ? { backgroundImage: divisionUi.gradient } : undefined
              }
              aria-pressed={isActive}
            >
              {divisionUi.buttonLabel}
            </button>
          );
        })}
      </RevealItem>

      <DivisionRoster
        key={activeDivision.id}
        animatedKey={activeDivision.id}
        division={{ ...activeDivision, title: activeDivisionUi.badgeLabel }}
        revealStartIndex={SECTION_COMPACT_HEADER_WITH_CONTROLS_REVEAL_START}
        divisionGradient={activeDivisionUi.gradient}
      />
    </RevealSection>
  );
};
