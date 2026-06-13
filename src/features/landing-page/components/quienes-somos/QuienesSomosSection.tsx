import { ABOUT_BODY } from "../../data/about";
import { SECTION_COMPACT_HEADER_REVEAL_COUNT } from "../../lib/revealOffsets";
import { SectionHeader } from "../SectionHeader";
import { RevealSection } from "../reveal";
import { AboutBody } from "./AboutBody";
import { AboutGallery } from "./AboutGallery";

const TEXT_REVEAL_START = SECTION_COMPACT_HEADER_REVEAL_COUNT;
const GALLERY_REVEAL_START = TEXT_REVEAL_START + ABOUT_BODY.length;

export const QuienesSomosSection = (): JSX.Element => (
  <RevealSection id="quienes-somos" aria-labelledby="quienes-somos-title">
    <SectionHeader titleId="quienes-somos-title" title="Quiénes somos" />

    <div className="mt-7 grid grid-cols-1 items-start gap-8 lg:mt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] xl:gap-14">
      <AboutBody revealStartIndex={TEXT_REVEAL_START} />
      <AboutGallery revealStartIndex={GALLERY_REVEAL_START} />
    </div>
  </RevealSection>
);
