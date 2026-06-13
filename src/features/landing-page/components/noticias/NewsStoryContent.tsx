import type { NewsArticle } from "../../types/news";

interface NewsStoryContentProps {
  article: Pick<NewsArticle, "id" | "title" | "excerpt" | "href">;
}

export const NewsStoryContent = ({
  article,
}: NewsStoryContentProps): JSX.Element => {
  const { id, title, excerpt, href } = article;

  return (
    <div className="news-story-copy">
      <h3 id={`${id}-title`} className="news-story-copy__title">
        {title}
      </h3>

      <p className="news-story-copy__excerpt">{excerpt}</p>

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
