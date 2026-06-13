export interface NewsCompanionImage {
  src: string;
  alt?: string;
  /** Punto de encuadre CSS (`object-position`) para mostrar el vehículo o marca completo. */
  objectPosition?: string;
}

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
  href?: string;
}
