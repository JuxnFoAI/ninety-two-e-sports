import { SPONSORS } from "../../data/sponsors";
import { SECTION_HEADER_REVEAL_COUNT } from "../../lib/revealOffsets";
import { SectionHeader } from "../SectionHeader";
import { RevealSection } from "../reveal";
import { SponsorGrid } from "./SponsorGrid";

export const PatrocinadoresSection = (): JSX.Element => {
  return (
    <RevealSection id="patrocinadores" aria-labelledby="patrocinadores-title">
      <SectionHeader
        titleId="patrocinadores-title"
        title="Patrocinadores"
        description="Marcas que impulsan a Ninety Two en competición. Su apoyo nos permite seguir evolucionando en cada escenario."
      />

      <SponsorGrid
        revealStartIndex={SECTION_HEADER_REVEAL_COUNT}
        sponsors={SPONSORS}
      />
    </RevealSection>
  );
};
