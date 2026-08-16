import { TORNEOS_PANEL_REVEAL_DELAY_MS } from "../../lib/torneosTitleTiming";
import { NightPanelSection } from "../NightPanelSection";
import { SectionHashtag } from "../SectionHashtag";
import { TournamentVideoGallery } from "./TournamentVideoGallery";
import { TorneosTitle } from "./TorneosTitle";
import styles from "./TorneosSection.module.css";

export const TorneosSection = (): JSX.Element => (
  <NightPanelSection
    id="torneos"
    titleId="torneos-title"
    title={<TorneosTitle id="torneos-title" />}
    panelDelayMs={TORNEOS_PANEL_REVEAL_DELAY_MS}
    panelPadding="deep"
  >
    <TournamentVideoGallery />
    <div className={styles.closing}>
      <SectionHashtag />
    </div>
  </NightPanelSection>
);
