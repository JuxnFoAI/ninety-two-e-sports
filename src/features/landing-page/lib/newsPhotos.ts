import type { NewsArticle } from "../types/news";

export type NewsPhoto = {
  id: string;
  image: string;
  imageAlt: string;
};

export const getNewsPhotos = (
  articles: readonly NewsArticle[],
): readonly NewsPhoto[] =>
  articles.flatMap((article) =>
    article.image
      ? [
          {
            id: article.id,
            image: article.image,
            imageAlt: article.imageAlt ?? article.title,
          },
        ]
      : [],
  );
