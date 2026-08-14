import { DESIGNS_GALLERY_REVEAL_DELAY_MS } from "../../lib/sectionDisplayTitleTiming";
import { RevealSection } from "../reveal";
import { SectionDisplayTitle } from "../SectionDisplayTitle";
import { DesignsGallery } from "./DesignsGallery";
import { DesignsViewAllButton } from "./DesignsViewAllButton";

export const DesignsSection = (): JSX.Element => (
  <RevealSection id="disenos" aria-labelledby="disenos-title" surface="flush">
    <div className="flex flex-col items-center gap-12 sm:flex-row sm:items-center sm:justify-between sm:gap-6 lg:gap-8">
      <SectionDisplayTitle
        id="disenos-title"
        label="Diseños del Equipo"
        ariaLabel="Diseños del Equipo"
        reveal="slideLeft"
      />
      <DesignsViewAllButton />
    </div>

    <div
      id="disenos-galeria"
      className="mt-16 -mx-[clamp(1rem,4vw,4rem)] sm:mt-20"
    >
      <DesignsGallery revealDelayMs={DESIGNS_GALLERY_REVEAL_DELAY_MS} />
    </div>
  </RevealSection>
);
