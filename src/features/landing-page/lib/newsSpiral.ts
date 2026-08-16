import type { NewsArticle } from "../types/news";

export type NewsSpiralPhoto = {
  id: string;
  image: string;
  imageAlt: string;
};

/** Degrees between consecutive photos on the helix. */
export const NEWS_SPIRAL_ANGLE_STEP_DEG = 64;

/** Viewport-heights of scroll travel allotted to each photo. */
export const NEWS_SPIRAL_SCROLL_VH_PER_PHOTO = 0.72;

export const getNewsSpiralPhotos = (
  articles: readonly NewsArticle[],
): readonly NewsSpiralPhoto[] =>
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
