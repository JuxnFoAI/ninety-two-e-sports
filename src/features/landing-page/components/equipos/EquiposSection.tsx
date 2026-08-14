import { useState } from "react";

import { useEffectiveReducedMotion } from "@/features/accessibility";

import { DIVISION_ROSTERS } from "../../data/pilots";
import {
  EQUIPOS_BUTTONS_REVEAL_DELAY_MS,
  EQUIPOS_ROSTER_REVEAL_DELAY_MS,
  EQUIPOS_ROSTER_STAGGER_MS,
} from "../../lib/equiposTitleTiming";
import type { DivisionId } from "../../types/pilot";
import { NightPanelSection } from "../NightPanelSection";
import { StretchInkButton } from "../StretchInkButton";
import { RevealItem } from "../reveal";
import { DivisionRoster } from "./DivisionRoster";
import { EquiposTitle } from "./EquiposTitle";
import styles from "./EquiposSection.module.css";

const EquiposSectionBody = (): JSX.Element => {
  const prefersReducedMotion = useEffectiveReducedMotion();
  const [activeDivisionId, setActiveDivisionId] =
    useState<DivisionId>("europe");
  const [hasUserSelectedDivision, setHasUserSelectedDivision] = useState(false);
  const activeDivision =
    DIVISION_ROSTERS.find((division) => division.id === activeDivisionId) ??
    DIVISION_ROSTERS[0];

  const buttonsRevealDelayMs = prefersReducedMotion
    ? 0
    : EQUIPOS_BUTTONS_REVEAL_DELAY_MS;
  const rosterRevealDelayMs =
    prefersReducedMotion || hasUserSelectedDivision
      ? 0
      : EQUIPOS_ROSTER_REVEAL_DELAY_MS;

  return (
    <>
      <div className={styles.divisionControls}>
        <RevealItem
          as="div"
          delayMs={buttonsRevealDelayMs}
          className={styles.divisionControlsInner}
        >
          {DIVISION_ROSTERS.map((division) => {
            const isActive = division.id === activeDivision.id;

            return (
              <span key={division.id} className={styles.divisionSlot}>
                <StretchInkButton
                  isolateLayout
                  className={`${styles.divisionButton} ${
                    isActive ? styles.divisionButtonActive : ""
                  }`}
                  style={
                    isActive
                      ? { backgroundImage: division.gradient }
                      : undefined
                  }
                  aria-pressed={isActive}
                  onClick={() => {
                    setHasUserSelectedDivision(true);
                    setActiveDivisionId(division.id);
                  }}
                >
                  {division.buttonLabel}
                </StretchInkButton>
              </span>
            );
          })}
        </RevealItem>
      </div>

      <DivisionRoster
        key={activeDivision.id}
        animatedKey={activeDivision.id}
        division={activeDivision}
        revealDelayMs={rosterRevealDelayMs}
        revealStaggerMs={EQUIPOS_ROSTER_STAGGER_MS}
      />
    </>
  );
};

export const EquiposSection = (): JSX.Element => (
  <NightPanelSection
    id="equipos"
    titleId="equipos-title"
    title={<EquiposTitle id="equipos-title" />}
    panelDelayMs={EQUIPOS_BUTTONS_REVEAL_DELAY_MS}
    className="font-[var(--font-rajdhani)]"
  >
    <EquiposSectionBody />
  </NightPanelSection>
);
