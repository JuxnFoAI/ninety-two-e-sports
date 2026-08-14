import { motion, type MotionStyle } from "motion/react";

import type { NewsArticle } from "../../types/news";

interface NewsStoryContentProps {
  article: Pick<
    NewsArticle,
    "id" | "title" | "excerpt" | "href" | "creditsTitle" | "credits"
  >;
  titleRevealStyle?: MotionStyle;
  bodyRevealStyle?: MotionStyle;
}

export const NewsStoryContent = ({
  article,
  titleRevealStyle,
  bodyRevealStyle,
}: NewsStoryContentProps): JSX.Element => {
  const { id, title, excerpt, href, creditsTitle, credits } = article;
  const pilotCredits = credits?.length ? credits : null;

  return (
    <div className="news-story-copy">
      <motion.h3
        id={`${id}-title`}
        className="news-story-copy__title"
        style={titleRevealStyle}
      >
        {title}
      </motion.h3>

      <motion.div style={bodyRevealStyle}>
        <p className="news-story-copy__excerpt">{excerpt}</p>

        {creditsTitle && pilotCredits ? (
          <div className="news-story-copy__credits">
            <p className="news-story-copy__credits-title">{creditsTitle}</p>
            <p className="news-story-copy__credits-names">
              {pilotCredits.join(" - ")}
            </p>
          </div>
        ) : null}

        {href ? (
          <span className="news-story-copy__cta">
            Leer más
            <span className="news-story-copy__cta-arrow" aria-hidden>
              →
            </span>
          </span>
        ) : null}
      </motion.div>
    </div>
  );
};
