import { useCallback, useState } from "react";

import { useEffectiveReducedMotion } from "@/features/accessibility";

import { NEWS_ARTICLES } from "../../data/news";
import { NOTICIAS_PANEL_REVEAL_DELAY_MS } from "../../lib/noticiasTitleTiming";
import { getNewsPhotos } from "../../lib/newsPhotos";
import { NightPanelSection } from "../NightPanelSection";
import { SectionFooterReveal } from "../SectionFooterReveal";
import { SectionHashtag } from "../SectionHashtag";
import { NewsArticleOverlay } from "./NewsArticleOverlay";
import { NewsPhotoGrid } from "./NewsPhotoGrid";
import { NewsPhotoSlider } from "./NewsPhotoSlider";
import { NoticiasTitle } from "./NoticiasTitle";
import styles from "./NoticiasSection.module.css";

const newsPhotos = getNewsPhotos(NEWS_ARTICLES);

const UpdatesNote = (): JSX.Element => (
  <div className={styles.updatesNote}>
    <SectionFooterReveal index={newsPhotos.length}>
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

  return (
    <>
      <NightPanelSection
        id="noticias"
        titleId="noticias-title"
        title={title}
        panelDelayMs={NOTICIAS_PANEL_REVEAL_DELAY_MS}
        panelPadding="deep"
      >
        {prefersReducedMotion ? (
          <NewsPhotoGrid photos={newsPhotos} onSelect={openArticle} />
        ) : (
          <NewsPhotoSlider photos={newsPhotos} onSelect={openArticle} />
        )}
        <UpdatesNote />
      </NightPanelSection>
      {selectedArticle ? (
        <NewsArticleOverlay article={selectedArticle} onClose={closeArticle} />
      ) : null}
    </>
  );
};
