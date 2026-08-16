export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  image?: string;
  imageAlt?: string;
  /** Minitítulo de agradecimiento bajo el texto (p. ej. "GRACIAS"). */
  creditsTitle?: string;
  /** Pilotos o personas a reconocer debajo del minitítulo. */
  credits?: readonly string[];
  href?: string;
}
