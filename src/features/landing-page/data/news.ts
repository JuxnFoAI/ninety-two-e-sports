import arieFichajePhoto from "@assets/noticias/Arie-fichaje.jpg";
import bmwPhoto from "@assets/noticias/bmw.jpg";
import campeonesPhoto from "@assets/noticias/campeones.jpg";
import espanaPhoto from "@assets/noticias/espana.jpg";
import ignasiLligadasFichajePhoto from "@assets/noticias/Ignasi Lligadas-fichaje.jpg";
import joaoPessoaPhoto from "@assets/noticias/JoaoPessoa.png";
import lamborghiniPhoto from "@assets/noticias/lamborghini.jpg";
import mateoEstevezPhoto from "@assets/noticias/MateoEstevez.png";
import lexusPhoto from "@assets/noticias/lexus.jpg";
import miroslawKravchenkoPhoto from "@assets/noticias/Miroslaw-Kravchenko.png";
import samuMorenoPhoto from "@assets/noticias/SamuMoreno.png";
import volkswagenPhoto from "@assets/noticias/Wolksvagen.jpg";

import type { NewsArticle } from "../types/news";

export const NEWS_ARTICLES: readonly NewsArticle[] = [
  {
    id: "arie-haydar-fichaje",
    title: "Bienvenido Arie Haydar",
    excerpt:
      "Con múltiples récords mundiales de Gran Turismo, entra al equipo un talento internacional que busca elevar al equipo al siguiente nivel, siempre arriba en las tablas de tiempos.",
    image: arieFichajePhoto,
    imageAlt: "Arie Haydar",
    layout: "feature",
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
    layout: "feature",
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
    layout: "feature",
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
  {
    id: "joao-pessoa-volkswagen-singapur",
    title: "Joao Pessoa debuta con Volkswagen en Singapur",
    excerpt:
      "Joao Pessoa debutará en Singapur en la MANUFACTURERS CUP junto a Mateo Estevez, pasará de debutar con Honda a poner en lo más alto a la marca Volkswagen.",
    image: joaoPessoaPhoto,
    imageAlt: "Joao Pessoa",
    portraitFocus: "50% 28%",
    portraitScale: 1.2,
    companionImages: [{ src: volkswagenPhoto, alt: "Volkswagen" }],
  },
  {
    id: "miroslaw-kravchenko-lamborghini-manufacturers-cup",
    title: "Miroslaw Kravchenko debuta con Lamborghini en Manufacturers Cup",
    excerpt:
      "Miroslaw Kravchenko debutará con Lamborghini en la primera ronda de la MANUFACTURERS CUP, volveremos a ver al toro dorado en las manos de uno de nuestros pilotos.",
    image: miroslawKravchenkoPhoto,
    imageAlt: "Miroslaw Kravchenko",
    portraitFocus: "50% 28%",
    portraitScale: 1.2,
    companionImages: [{ src: lamborghiniPhoto, alt: "Lamborghini" }],
  },
  {
    id: "mate-estevez-lexus-singapur",
    title: "Mateo Estevez representa a LEXUS en Singapur",
    excerpt:
      "Mateo Estevez representará en la MANUFACTURERS CUP a LEXUS en la ronda 2 de Singapur, un piloto super fuerte que es capaz de crear estrategias en las carreras más caóticas.",
    image: mateoEstevezPhoto,
    imageAlt: "Mateo Estevez",
    portraitFocus: "42% 38%",
    portraitScale: 1.3,
    companionImages: [{ src: lexusPhoto, alt: "LEXUS" }],
  },
  {
    id: "samuel-moreno-espana-bmw-milan",
    title: "Samuel Moreno con España y BMW en Milán",
    excerpt:
      "Samuel Moreno seguirá con el legado de victorias de España en la NATIONS CUP, y además de eso también representará a BMW en la ronda 1 en Milán, se ha consolidado como un piloto supremamente rápido y inteligente, un novato que viene a quedarse con los más grandes.",
    image: samuMorenoPhoto,
    imageAlt: "Samuel Moreno",
    portraitFocus: "50% 22%",
    portraitScale: 1.18,
    companionImages: [
      { src: espanaPhoto, alt: "España" },
      { src: bmwPhoto, alt: "BMW" },
    ],
  },
] as const;
