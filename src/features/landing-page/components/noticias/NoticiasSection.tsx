import { NEWS_ARTICLES } from "../../data/news";
import { NOTICIAS_PANEL_REVEAL_DELAY_MS } from "../../lib/noticiasTitleTiming";
import { NightPanelSection } from "../NightPanelSection";
import { SectionFooterReveal } from "../SectionFooterReveal";
import { SectionHashtag } from "../SectionHashtag";
import { NewsGrid } from "./NewsGrid";
import { NoticiasTitle } from "./NoticiasTitle";
import styles from "./NoticiasSection.module.css";

export const NoticiasSection = (): JSX.Element => (
  <NightPanelSection
    id="noticias"
    titleId="noticias-title"
    title={<NoticiasTitle id="noticias-title" />}
    panelDelayMs={NOTICIAS_PANEL_REVEAL_DELAY_MS}
    panelPadding="deep"
  >
    <NewsGrid />
    <div className={styles.updatesNote}>
      <SectionFooterReveal index={NEWS_ARTICLES.length}>
        Más actualizaciones en nuestras redes sociales.
      </SectionFooterReveal>
      <SectionHashtag className={styles.hashtag} />
    </div>
  </NightPanelSection>
);
