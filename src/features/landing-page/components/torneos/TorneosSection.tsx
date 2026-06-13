import { TOURNAMENT_VIDEOS } from "../../data/tournaments";
import { SECTION_HEADER_REVEAL_COUNT } from "../../lib/revealOffsets";
import { SECTION_FOOTER_CLASS } from "../../styles/sectionClasses";
import { SectionHeader } from "../SectionHeader";
import { RevealItem, RevealSection } from "../reveal";
import { TournamentVideoGallery } from "./TournamentVideoGallery";

const GALLERY_REVEAL_SLOTS = TOURNAMENT_VIDEOS.length > 1 ? 2 : 1;

export const TorneosSection = (): JSX.Element => {
  const footerRevealIndex = SECTION_HEADER_REVEAL_COUNT + GALLERY_REVEAL_SLOTS;

  return (
    <RevealSection id="torneos" aria-labelledby="torneos-title">
      <SectionHeader
        titleId="torneos-title"
        title="Torneos"
        description="Revive las jornadas competitivas del club. Los vídeos más recientes aparecen primero."
        descriptionClassName="max-w-xl"
      />

      <TournamentVideoGallery revealStartIndex={SECTION_HEADER_REVEAL_COUNT} />

      <RevealItem
        as="p"
        index={footerRevealIndex}
        className={SECTION_FOOTER_CLASS}
      >
        ¿Buscas el calendario en directo? Síguenos en redes para horarios y
        clasificaciones.
      </RevealItem>
    </RevealSection>
  );
};
