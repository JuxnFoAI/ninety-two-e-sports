import type { NewsArticle } from "../../types/news";
import styles from "./NewsStoryContent.module.css";

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
    <div className={styles.copy}>
      <h3 id={`${id}-title`} className={styles.title}>
        {title}
      </h3>

      {excerpt.split(/\n\n+/).map((paragraph, index) => (
        <p key={`${id}-${index}`} className={styles.excerpt}>
          {paragraph}
        </p>
      ))}

      {creditsTitle && pilotCredits ? (
        <div className={styles.credits}>
          <p className={styles.creditsTitle}>{creditsTitle}</p>
          <p className={styles.creditsNames}>{pilotCredits.join(" - ")}</p>
        </div>
      ) : null}

      {href ? (
        <a className={styles.cta} href={href}>
          Leer más
          <span className={styles.ctaArrow} aria-hidden>
            →
          </span>
        </a>
      ) : null}
    </div>
  );
};
