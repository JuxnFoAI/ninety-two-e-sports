import gts92Photo from "@assets/quienes-somos/gts92.png";
import equipoGts92Photo from "@assets/quienes-somos/equipo-gts92.jpg";

interface AboutParagraph {
  id: string;
  text: string;
}

export interface AboutImage {
  id: string;
  alt: string;
  src: string;
  /** Si es true, la imagen se muestra completa en desktop (sin recorte). */
  showFullImage?: boolean;
}

/** Párrafos de la sección Quiénes somos (orden de aparición). */
export const ABOUT_BODY: readonly AboutParagraph[] = [
  {
    id: "origins",
    text: "Anteriormente llamados GTSPAIN 92, somos un equipo de simracing creado en España con dos divisiones: la división Europea y la Americana. Competimos con rigor, usamos técnicas impredecibles, trabajamos en equipo y seguimos con la misión de ser uno de los equipos más importantes en el mundo del simracing.",
  },
  {
    id: "rebrand",
    text: "Actualmente pasamos a llamarnos Ninety Two, o N2, ya que sentíamos que era hora de dar un salto y evolucionar como equipo. De la mano de nuestro manager Mario Soler seguimos luchando en cada carrera; cada victoria y cada derrota solo nos muestran la perseverancia que tenemos.",
  },
  {
    id: "family",
    text: "Más que un equipo, nos consideramos una familia. Este club también ha sido hogar de grandes corredores de Gran Turismo.",
  },
  {
    id: "expansion",
    text: "Seguimos ampliando nuestras divisiones: estamos presentes en Le Mans Ultimate e iRacing, y seguiremos buscando divisiones en diferentes juegos que representen al género de las carreras.",
  },
] as const;

/** Imágenes de la sección Quiénes somos (orden de aparición). */
export const ABOUT_IMAGES: readonly AboutImage[] = [
  {
    id: "gts92-brand",
    src: gts92Photo,
    alt: "Logotipo GTSPAIN 92, antecesor de Ninety Two E-Sports",
  },
  {
    id: "gts92-team",
    src: equipoGts92Photo,
    alt: "Equipo GTSPAIN 92 en competición",
    showFullImage: true,
  },
] as const;
