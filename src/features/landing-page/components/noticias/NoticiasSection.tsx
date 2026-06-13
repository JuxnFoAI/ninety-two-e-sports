import { NEWS_ARTICLES } from "../../data/news";
import { SECTION_HEADER_REVEAL_COUNT } from "../../lib/revealOffsets";
import { SECTION_FOOTER_CLASS } from "../../styles/sectionClasses";
import { SectionHeader } from "../SectionHeader";
import { RevealItem, RevealSection } from "../reveal";
import { NewsGrid } from "./NewsGrid";

export const NoticiasSection = (): JSX.Element => {
  const footerRevealIndex = SECTION_HEADER_REVEAL_COUNT + NEWS_ARTICLES.length;

  return (
    <RevealSection id="noticias" aria-labelledby="noticias-title">
      <SectionHeader
        titleId="noticias-title"
        title="Noticias"
        description="Cobertura de fichajes, representación de marca y calendario competitivo del club."
        descriptionClassName="max-w-xl"
      />

      <NewsGrid revealStartIndex={SECTION_HEADER_REVEAL_COUNT} />

      <RevealItem
        as="p"
        index={footerRevealIndex}
        className={SECTION_FOOTER_CLASS}
      >
        Más actualizaciones en nuestras redes sociales.
      </RevealItem>
    </RevealSection>
  );
};
