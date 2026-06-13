/** Modificador de grid para alternar piloto izquierda / derecha en escritorio. */
export const getNewsStoryGridModifier = (index: number): string =>
  index % 2 === 1 ? "news-story-grid--mirror" : "";
