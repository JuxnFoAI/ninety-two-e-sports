import { SPONSORS } from "../../data/sponsors";
import { SECTION_DISPLAY_TITLE_SEQUENCE_MS } from "../../lib/sectionDisplayTitleTiming";
import { RevealSection } from "../reveal";
import { SectionDisplayTitle } from "../SectionDisplayTitle";
import { SponsorGrid } from "./SponsorGrid";

export const PatrocinadoresSection = (): JSX.Element => {
  return (
    <RevealSection
      id="patrocinadores"
      aria-labelledby="patrocinadores-title"
      surface="flush"
    >
      <div className="text-center">
        <SectionDisplayTitle
          id="patrocinadores-title"
          label="Patrocinadores"
          sweep="dual"
        />
      </div>

      <SponsorGrid
        revealStartIndex={0}
        baseDelayMs={SECTION_DISPLAY_TITLE_SEQUENCE_MS}
        sponsors={SPONSORS}
      />
    </RevealSection>
  );
};
