import { NEWS_ARTICLES } from "../../data/news";
import { RevealItem } from "../reveal";
import { NEWS_LIST_CLASS } from "./constants";
import { NewsCard } from "./NewsCard";

interface NewsGridProps {
  revealStartIndex: number;
}

export const NewsGrid = ({ revealStartIndex }: NewsGridProps): JSX.Element => (
  <ul className={NEWS_LIST_CLASS} role="list" aria-label="Últimas noticias">
    {NEWS_ARTICLES.map((article, articleIndex) => (
      <RevealItem
        as="li"
        key={article.id}
        index={revealStartIndex + articleIndex}
      >
        <NewsCard article={article} index={articleIndex} />
      </RevealItem>
    ))}
  </ul>
);
