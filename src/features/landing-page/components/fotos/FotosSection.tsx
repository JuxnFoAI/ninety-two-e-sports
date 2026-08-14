import { FOTOS_PANEL_REVEAL_DELAY_MS } from "../../lib/fotosTitleTiming";
import { NightPanelSection } from "../NightPanelSection";
import { FotosGallery } from "./FotosGallery";
import { FotosTitle } from "./FotosTitle";

export const FotosSection = (): JSX.Element => (
  <NightPanelSection
    id="fotos"
    titleId="fotos-title"
    title={<FotosTitle id="fotos-title" />}
    panelDelayMs={FOTOS_PANEL_REVEAL_DELAY_MS}
  >
    <FotosGallery />
  </NightPanelSection>
);
