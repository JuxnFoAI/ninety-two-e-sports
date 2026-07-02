import type { NewsArticle } from "../../types/news";

interface NewsStoryContentProps {
  article: Pick<
    NewsArticle,
    "id" | "title" | "excerpt" | "href" | "creditsTitle" | "credits"
  >;
}

export const NewsStoryContent = ({
  article,
}: NewsStoryContentProps): JSX.Element => {
  const { id, title, excerpt, href, creditsTitle, credits } = article;
  const pilotCredits = credits?.length ? credits : null;

  return (
    <div className="news-story-copy">
      <h3 id={`${id}-title`} className="news-story-copy__title">
        {title}
      </h3>

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
    </div>
  );
};
