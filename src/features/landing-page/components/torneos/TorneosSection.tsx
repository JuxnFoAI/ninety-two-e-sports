import { TORNEOS_PANEL_REVEAL_DELAY_MS } from "../../lib/torneosTitleTiming";
import { NightPanelSection } from "../NightPanelSection";
import { SectionHashtag } from "../SectionHashtag";
import { TournamentVideoGallery } from "./TournamentVideoGallery";
import { TorneosTitle } from "./TorneosTitle";

export const TorneosSection = (): JSX.Element => (
  <NightPanelSection
    id="torneos"
    titleId="torneos-title"
    title={<TorneosTitle id="torneos-title" />}
    panelDelayMs={TORNEOS_PANEL_REVEAL_DELAY_MS}
    panelPadding="deep"
  >
    <TournamentVideoGallery />
    <SectionHashtag className="mt-[clamp(5.5rem,12vw,8.5rem)]" />
  </NightPanelSection>
);
