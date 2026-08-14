export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  image?: string;
  imageAlt?: string;
  /** Punto de encuadre CSS (`object-position`) para centrar al piloto en el retrato. */
  portraitFocus?: string;
  /** Zoom del retrato para compensar espacio transparente en PNGs anchos (p. ej. 1.7). */
  portraitScale?: number;
  /** Minitítulo de agradecimiento bajo el texto (p. ej. "GRACIAS"). */
  creditsTitle?: string;
  /** Pilotos o personas a reconocer debajo del minitítulo. */
  credits?: readonly string[];
  href?: string;
}
