import arieFichajePhoto from "@assets/noticias/Arie-fichaje.jpg";
import campeonesPhoto from "@assets/noticias/campeones.jpg";
import ignasiLligadasFichajePhoto from "@assets/noticias/Ignasi Lligadas-fichaje.jpg";

import type { NewsArticle } from "../types/news";

export const NEWS_ARTICLES: readonly NewsArticle[] = [
  {
    id: "arie-haydar-fichaje",
    title: "Bienvenido Arie Haydar",
    excerpt:
      "Con múltiples récords mundiales de Gran Turismo, entra al equipo un talento internacional que busca elevar al equipo al siguiente nivel, siempre arriba en las tablas de tiempos.",
    image: arieFichajePhoto,
    imageAlt: "Arie Haydar",
    portraitFocus: "center 38%",
    portraitScale: 1.08,
  },
  {
    id: "ignasi-lligadas-fichaje",
    title: "Bienvenido Ignasi Lligadas",
    excerpt:
      "Tenemos el honor de anunciar la entrada al equipo de uno de los pilotos españoles con mayor proyección y velocidad de la actualidad, gran piloto de karting y sin duda un contendiente a futuro en la GT World Series",
    image: ignasiLligadasFichajePhoto,
    imageAlt: "Ignasi Lligadas",
    portraitFocus: "center 38%",
    portraitScale: 1.08,
  },
  {
    id: "campeones-infinity-g-series",
    title: "Campeones del evento INFINITY G SERIES",
    excerpt:
      "Tras años compitiendo mano a mano contra los mejores del mundo, terminamos siendo campeones en una temporada histórica donde logramos llevarnos el título incluso con una carrera de antelación ante los mejores equipos de Europa.",
    image: campeonesPhoto,
    imageAlt: "Ninety Two campeones INFINITY G SERIES",
    creditsTitle: "GRACIAS",
    credits: [
      "Joao Pessoa",
      "Federico Cervi",
      "Nicholas Fontana",
      "Samuel Moreno",
      "Mateo Estevez",
      "Antonio Santos",
      "Bryant Marconi",
      "Mario Soler",
    ],
  },
] as const;
