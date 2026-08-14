/** Clases del grid de noticia según índice (espejo). */
export const getNewsStoryGridClassName = (index: number): string =>
  index % 2 === 1
    ? "news-story-grid news-story-grid--mirror"
    : "news-story-grid";
