import { SPONSORS } from "../../data/sponsors";
import { RevealSection } from "../reveal";
import { ScrollAppearText } from "../scroll-effects";
import { SponsorGrid } from "./SponsorGrid";

export const PatrocinadoresSection = (): JSX.Element => {
  return (
    <RevealSection
      id="patrocinadores"
      aria-labelledby="patrocinadores-title"
      surface="flush"
    >
      <div className="text-center">
        <ScrollAppearText id="patrocinadores-title" text="Patrocinadores" />
      </div>

      <SponsorGrid revealStartIndex={0} sponsors={SPONSORS} />
    </RevealSection>
  );
};
