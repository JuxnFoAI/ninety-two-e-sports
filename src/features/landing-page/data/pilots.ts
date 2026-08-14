import ardaetzPhoto from "@assets/integrantes/americanos/Ardaetz.jpg";
import bernalValverdePhoto from "@assets/integrantes/americanos/bernal-valverde.jpg";
import carlosAguilarPhoto from "@assets/integrantes/americanos/Carlos-aguilar.jpg";
import danielAvilaPhoto from "@assets/integrantes/americanos/Daniel-avila.jpg";
import franciscoJavierPhoto from "@assets/integrantes/americanos/francisco-javier.jpg";
import joaoPessoaPhoto from "@assets/integrantes/americanos/Joao-pessoa.jpg";
import joshuaRodriguezPhoto from "@assets/integrantes/americanos/joshua-rodriguez.jpg";
import juanJosePhoto from "@assets/integrantes/americanos/juan-jose.jpg";
import mateoEstevezPhoto from "@assets/integrantes/americanos/Mateo-estevez.jpg";
import nicolasSaavedraPhoto from "@assets/integrantes/americanos/nicolas-saavedra.jpg";
import orestesFilomenoPhoto from "@assets/integrantes/americanos/Orestes-filomeno.jpg";
import arieHaydarPhoto from "@assets/integrantes/europeos/Arie-Haydar.jpg";
import davidCeladaPhoto from "@assets/integrantes/europeos/David-Celada.jpg";
import ericFructuosoPhoto from "@assets/integrantes/europeos/eric-fructuoso.jpg";
import federicoCerviPhoto from "@assets/integrantes/europeos/federico-cervi.jpg";
import giorgioCorolloPhoto from "@assets/integrantes/europeos/giorgio-corollo.jpg";
import ignasiLligadasPhoto from "@assets/integrantes/europeos/Ignasi Lligadas.jpg";
import miroslawKravchenkoPhoto from "@assets/integrantes/europeos/miroslaw.jpg";
import nicholasFontanaPhoto from "@assets/integrantes/europeos/nicholas-fontana.jpg";
import kevinFernandezPhoto from "@assets/integrantes/europeos/kevin-fernandez.jpg";
import samuelMorenoPhoto from "@assets/integrantes/europeos/samuel-moreno.jpg";
import marioSolerPhoto from "@assets/lideres/mario-soler.jpg";
import niltonGrajalesPhoto from "@assets/lideres/nilton-grajales.jpg";
import type { DivisionRoster } from "../types/pilot";

/**
 * Roster de pilotos por división.
 * El líder debe figurar solo en `leader`; los demás en `pilots`.
 * Fotos: importar desde `@assets/integrantes` o `@assets/lideres`.
 */
export const DIVISION_ROSTERS: readonly DivisionRoster[] = [
  {
    id: "europe",
    title: "Pilotos europeos",
    leaderLabel: "Líder División Europea",
    buttonLabel: "EQUIPO EUROPEO",
    badgeLabel: "DIVISION EUROPEA",
    gradient: "linear-gradient(135deg, #0b6fa8 0%, #1591dc 100%)",
    leader: {
      id: "eu-leader",
      alias: "MARIO SOLER",
      country: "ESPAÑA",
      role: "TEAM MANAGER | CREADOR DE CONTENIDO",
      caption: "TEAM MANAGER | CREADOR DE CONTENIDO",
      photo: marioSolerPhoto,
    },
    pilots: [
      {
        id: "eu-10",
        alias: "DAVID CELADA",
        country: "ESPAÑA",
        role: "TEAM MANAGER IRACING",
        caption: "TEAM MANAGER IRACING",
        photo: davidCeladaPhoto,
        photoFit: {
          position: "center 10%",
          scale: 1.1,
        },
      },

      {
        id: "eu-2",
        alias: "GIORGIO COROLLO",
        country: "ITALIA",
        role: "DISEÑADOR | FOTOGRAFO",
        caption: "DISEÑADOR | FOTOGRAFO",
        photo: giorgioCorolloPhoto,
        photoFit: {
          position: "center 50%",
          scale: 1,
        },
      },
      {
        id: "eu-3",
        alias: "MIROSLAW KRAVCHENKO",
        country: "ALEMANIA",
        role: "CORREDOR DE EVENTOS PROFESIONALES | PILOTO WORLD TOUR",
        caption: "CORREDOR DE EVENTOS PROFESIONALES | PILOTO WORLD TOUR",
        photo: miroslawKravchenkoPhoto,
        photoFit: {
          position: "center 25%",
          scale: 1,
        },
      },
      {
        id: "eu-4",
        alias: "FEDERICO CERVI",
        country: "ITALIA",
        role: "CORREDOR DE EVENTOS PROFESIONALES",
        caption: "CORREDOR DE EVENTOS PROFESIONALES",
        photo: federicoCerviPhoto,
        photoFit: {
          position: "center 40%",
          scale: 1,
        },
      },
      {
        id: "eu-5",
        alias: "SAMUEL MORENO",
        country: "ESPAÑA",
        role: "CORREDOR DE EVENTOS PROFESIONALES | PILOTO WORLD TOUR",
        caption: "CORREDOR DE EVENTOS PROFESIONALES | PILOTO WORLD TOUR",
        photo: samuelMorenoPhoto,
      },
      {
        id: "eu-6",
        alias: "ERIC FRUCTUOSO",
        country: "ESPAÑA",
        role: "CORREDOR DE EVENTOS PROFESIONALES",
        caption: "CORREDOR DE EVENTOS PROFESIONALES",
        photo: ericFructuosoPhoto,
        photoFit: {
          position: "center 10%",
          scale: 1.2,
        },
      },
      {
        id: "eu-7",
        alias: "KEVIN FERNANDEZ",
        country: "ESPAÑA",
        role: "CORREDOR DE EVENTOS PROFESIONALES",
        caption: "CORREDOR DE EVENTOS PROFESIONALES",
        photo: kevinFernandezPhoto,
      },
      {
        id: "eu-8",
        alias: "IGNASI LLIGADAS",
        country: "ESPAÑA",
        role: "CORREDOR DE EVENTOS PROFESIONALES",
        caption: "CORREDOR DE EVENTOS PROFESIONALES",
        photo: ignasiLligadasPhoto,
        photoFit: {
          position: "center 50%",
          scale: 1,
        },
      },
      {
        id: "eu-9",
        alias: "ARIE HAYDAR",
        country: "HOLANDA",
        role: "CORREDOR DE EVENTOS PROFESIONALES | PILOTO WORLD TOUR",
        caption: "CORREDOR DE EVENTOS PROFESIONALES | PILOTO WORLD TOUR",
        photo: arieHaydarPhoto,
        photoFit: {
          position: "center 10%",
          scale: 1,
        },
      },
      {
        id: "eu-1",
        alias: "NICHOLAS FONTANA",
        country: "ITALIA",
        role: "CORREDOR DE EVENTOS PROFESIONALES",
        caption: "CORREDOR DE EVENTOS PROFESIONALES",
        photo: nicholasFontanaPhoto,
        photoFit: {
          position: "center 34%",
          scale: 1,
        },
      },
    ],
  },
  {
    id: "america",
    title: "Pilotos americanos",
    leaderLabel: "Líder División Americana",
    buttonLabel: "EQUIPO AMERICANO",
    badgeLabel: "DIVISIÓN AMERICANA",
    gradient: "linear-gradient(135deg, #2f8f35 0%, #45c24d 100%)",
    leader: {
      id: "am-leader",
      alias: "NILTON GRAJALES",
      country: "COLOMBIA",
      role: "TEAM MANAGER AMERICA",
      caption: "TEAM MANAGER AMERICA",
      photo: niltonGrajalesPhoto,
    },
    pilots: [
      {
        id: "am-1",
        alias: "DANIEL AVILA",
        country: "COLOMBIA",
        role: "CORREDOR DE EVENTOS LATAM",
        caption: "CORREDOR DE EVENTOS LATAM",
        photo: danielAvilaPhoto,
      },
      {
        id: "am-2",
        alias: "MATEO ESTEVEZ",
        country: "ARGENTINA",
        role: "CORREDOR DE EVENTOS PROFESIONALES | PILOTO WORLD TOUR",
        caption: "CORREDOR DE EVENTOS PROFESIONALES | PILOTO WORLD TOUR",
        photo: mateoEstevezPhoto,
        photoFit: {
          position: "center 50%",
          scale: 1,
        },
      },
      {
        id: "am-3",
        alias: "CARLOS AGUILAR",
        country: "GUATEMALA",
        role: "CORREDOR DE EVENTOS PROFESIONALES",
        caption: "CORREDOR DE EVENTOS PROFESIONALES",
        photo: carlosAguilarPhoto,
      },
      {
        id: "am-4",
        alias: "JOAO PESSOA",
        country: "BRASIL",
        role: "CORREDOR DE EVENTOS PROFESIONALES | PILOTO WORLD TOUR",
        caption: "CORREDOR DE EVENTOS PROFESIONALES | PILOTO WORLD TOUR",
        photo: joaoPessoaPhoto,
      },
      {
        id: "am-5",
        alias: "ORESTES FILOMENO",
        country: "COLOMBIA",
        role: "CREADOR DE CONTENIDO | CORREDOR DE EVENTOS LATAM",
        caption: "CREADOR DE CONTENIDO | CORREDOR DE EVENTOS LATAM",
        photo: orestesFilomenoPhoto,
        photoFit: {
          position: "center 26%",
          scale: 1,
        },
      },
      {
        id: "am-6",
        alias: "ARNOLDO DAETZ",
        country: "GUATEMALA",
        role: "CORREDOR DE EVENTOS LATAM",
        caption: "CORREDOR DE EVENTOS LATAM",
        photo: ardaetzPhoto,
        photoFit: {
          position: "center 10%",
          scale: 1,
        },
      },
      {
        id: "am-7",
        alias: "FRANCISCO CAMPOS",
        country: "MÉXICO",
        role: "CORREDOR DE EVENTOS LATAM",
        caption: "CORREDOR DE EVENTOS LATAM",
        photo: franciscoJavierPhoto,
      },
      {
        id: "am-8",
        alias: "BERNAL VALVERDE",
        country: "COSTA RICA",
        role: "CORREDOR PROFESIONAL | PILOTO WORLD TOUR",
        caption: "CORREDOR PROFESIONAL | PILOTO WORLD TOUR",
        photo: bernalValverdePhoto,
        photoFit: {
          position: "center 10%",
          scale: 1.1,
        },
      },
      {
        id: "am-9",
        alias: "JOSHUA RODRIGUEZ",
        country: "VENEZUELA",
        role: "CORREDOR DE EVENTOS LATAM",
        caption: "CORREDOR DE EVENTOS LATAM",
        photo: joshuaRodriguezPhoto,
        photoFit: {
          position: "center 33%",
          scale: 1,
        },
      },
      {
        id: "am-10",
        alias: "NICOLAS SAAVEDRA",
        country: "ARGENTINA",
        role: "CORREDOR DE EVENTOS LATAM",
        caption: "CORREDOR DE EVENTOS LATAM",
        photo: nicolasSaavedraPhoto,
        photoFit: {
          position: "center 33%",
          scale: 1.1,
        },
      },
      {
        id: "am-11",
        alias: "JUAN JOSÉ",
        country: "COLOMBIA",
        role: "DISEÑADOR | FOTOGRAFO",
        caption: "DISEÑADOR | FOTOGRAFO",
        photo: juanJosePhoto,
        photoFit: {
          position: "center 33%",
          scale: 1.3,
        },
      },
    ],
  },
] as const;
