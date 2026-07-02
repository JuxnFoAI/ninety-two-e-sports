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
    buttonLabel: "EUROPEA",
    badgeLabel: "DIVISION EUROPEA",
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
    leader: {
      id: "eu-leader",
      alias: "MARIO SOLER",
      country: "ESPAÑA",
      role: "LÍDER DIVISIÓN EUROPEA",
      photo: marioSolerPhoto,
    },
    pilots: [
      {
        id: "eu-1",
        alias: "NICHOLAS FONTANA",
        country: "ITALIA",
        role: "SNIPER",
        photo: nicholasFontanaPhoto,
        photoFit: {
          position: "center 34%",
          scale: 1,
        },
      },

      {
        id: "eu-2",
        alias: "GIORGIO COROLLO",
        country: "ITALIA",
        role: "ENTRY",
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
        role: "SUPPORT",
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
        role: "FLEX",
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
        role: "FLEX",
        photo: samuelMorenoPhoto,
      },
      {
        id: "eu-6",
        alias: "ERIC FRUCTUOSO",
        country: "ESPAÑA",
        role: "FLEX",
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
        role: "FLEX",
        photo: kevinFernandezPhoto,
      },
      {
        id: "eu-8",
        alias: "IGNASI LLIGADAS",
        country: "ESPAÑA",
        role: "FLEX",
        photo: ignasiLligadasPhoto,
        photoFit: {
          position: "center 50%",
          scale: 1,
        },
      },
    ],
  },
  {
    id: "america",
    title: "Pilotos americanos",
    leaderLabel: "Líder División Americana",
    buttonLabel: "AMERICANA",
    badgeLabel: "DIVISIÓN AMERICANA",
    gradient: "linear-gradient(135deg, #65a30d 0%, #bef264 100%)",
    leader: {
      id: "am-leader",
      alias: "NILTON GRAJALES",
      country: "COLOMBIA",
      role: "LIDER DIVISIÓN AMERICANA",
      photo: niltonGrajalesPhoto,
    },
    pilots: [
      {
        id: "am-1",
        alias: "DANIEL AVILA",
        country: "COLOMBIA",
        role: "ENTRY",
        photo: danielAvilaPhoto,
      },
      {
        id: "am-2",
        alias: "MATEO ESTEVEZ",
        country: "ARGENTINA",
        role: "SNIPER",
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
        role: "SUPPORT",
        photo: carlosAguilarPhoto,
      },
      {
        id: "am-4",
        alias: "JOAO PESSOA",
        country: "BRASIL",
        role: "AWPER",
        photo: joaoPessoaPhoto,
      },
      {
        id: "am-5",
        alias: "ORESTES FILOMENO",
        country: "COLOMBIA",
        role: "FLEX",
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
        role: "FLEX",
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
        role: "FLEX",
        photo: franciscoJavierPhoto,
      },
      {
        id: "am-8",
        alias: "BERNAL VALVERDE",
        country: "COSTA RICA",
        role: "FLEX",
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
        role: "FLEX",
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
        role: "FLEX",
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
        role: "FLEX",
        photo: juanJosePhoto,
        photoFit: {
          position: "center 33%",
          scale: 1.3,
        },
      },
    ],
  },
] as const;
