import type { NewsLayout } from "../../types/news";

/** Clases del grid de noticia según índice (espejo) y layout. */
export const getNewsStoryGridClassName = (
  index: number,
  layout: NewsLayout = "default",
): string => {
  const mirrorModifier = index % 2 === 1 ? "news-story-grid--mirror" : "";
  const layoutModifier = layout === "feature" ? "news-story-grid--feature" : "";

  return ["news-story-grid", mirrorModifier, layoutModifier]
    .filter(Boolean)
    .join(" ");
};
