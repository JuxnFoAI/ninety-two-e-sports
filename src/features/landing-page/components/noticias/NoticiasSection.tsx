import { useCallback, useState } from "react";

import { useEffectiveReducedMotion } from "@/features/accessibility";

import { NEWS_ARTICLES } from "../../data/news";
import { NOTICIAS_PANEL_REVEAL_DELAY_MS } from "../../lib/noticiasTitleTiming";
import { getNewsSpiralPhotos } from "../../lib/newsSpiral";
import { NightPanelSection } from "../NightPanelSection";
import { RevealSection } from "../reveal";
import { SectionFooterReveal } from "../SectionFooterReveal";
import { SectionHashtag } from "../SectionHashtag";
import { NewsArticleOverlay } from "./NewsArticleOverlay";
import { NewsPhotoFallback } from "./NewsPhotoFallback";
import { NewsPhotoSpiral } from "./NewsPhotoSpiral";
import { NoticiasTitle } from "./NoticiasTitle";
import styles from "./NoticiasSection.module.css";

const spiralPhotos = getNewsSpiralPhotos(NEWS_ARTICLES);

const UpdatesNote = (): JSX.Element => (
  <div className={styles.updatesNote}>
    <SectionFooterReveal index={spiralPhotos.length}>
      Más actualizaciones en nuestras redes sociales.
    </SectionFooterReveal>
    <SectionHashtag className={styles.hashtag} />
  </div>
);

export const NoticiasSection = (): JSX.Element => {
  const prefersReducedMotion = useEffectiveReducedMotion();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const title = <NoticiasTitle id="noticias-title" />;
  const selectedArticle =
    NEWS_ARTICLES.find((article) => article.id === selectedId) ?? null;

  const openArticle = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const closeArticle = useCallback(() => {
    setSelectedId(null);
  }, []);

  const overlay = selectedArticle ? (
    <NewsArticleOverlay article={selectedArticle} onClose={closeArticle} />
  ) : null;

  if (prefersReducedMotion) {
    return (
      <>
        <NightPanelSection
          id="noticias"
          titleId="noticias-title"
          title={title}
          panelDelayMs={NOTICIAS_PANEL_REVEAL_DELAY_MS}
          panelPadding="deep"
        >
          <NewsPhotoFallback photos={spiralPhotos} onSelect={openArticle} />
          <UpdatesNote />
        </NightPanelSection>
        {overlay}
      </>
    );
  }

  return (
    <>
      <RevealSection
        id="noticias"
        aria-labelledby="noticias-title"
        surface="flush"
        className={styles.section}
      >
        <div className={styles.title}>{title}</div>
        <div className={styles.nightSurface}>
          <NewsPhotoSpiral photos={spiralPhotos} onSelect={openArticle} />
          <div className={styles.afterSpiral}>
            <UpdatesNote />
          </div>
        </div>
      </RevealSection>
      {overlay}
    </>
  );
};
