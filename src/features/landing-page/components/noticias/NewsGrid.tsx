import { NEWS_ARTICLES } from "../../data/news";
import { NEWS_LIST_CLASS } from "./constants";
import { NewsCard } from "./NewsCard";

export const NewsGrid = (): JSX.Element => (
  <ul className={NEWS_LIST_CLASS} role="list" aria-label="Últimas noticias">
    {NEWS_ARTICLES.map((article, articleIndex) => (
      <li key={article.id}>
        <NewsCard article={article} index={articleIndex} />
      </li>
    ))}
  </ul>
);
