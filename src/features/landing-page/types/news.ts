export interface NewsCompanionImage {
  src: string;
  alt?: string;
  /** Punto de encuadre CSS (`object-position`) para mostrar el vehículo o marca completo. */
  objectPosition?: string;
}

/** `feature`: sin retrato de piloto ni marcas; imagen hero y texto a ancho completo. */
export type NewsLayout = "default" | "feature";

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
  /** Imágenes de acompañamiento (marca, nación, etc.) junto a la principal. */
  companionImages?: readonly NewsCompanionImage[];
  /** Variante de maquetación cuando la noticia no incluye corredor ni marcas. */
  layout?: NewsLayout;
  /** Minitítulo de agradecimiento bajo el texto (p. ej. "GRACIAS"). */
  creditsTitle?: string;
  /** Pilotos o personas a reconocer debajo del minitítulo. */
  credits?: readonly string[];
  href?: string;
}
