import ardaetzPhoto from "@assets/integrantes/americanos/Ardaetz.jpg";
import bernalValverdePhoto from "@assets/integrantes/americanos/bernal-valverde.jpg";
import carlosAguilarPhoto from "@assets/integrantes/americanos/Carlos-aguilar.jpg";
import danielAvilaPhoto from "@assets/integrantes/americanos/Daniel-avila.jpg";
import franciscoJavierPhoto from "@assets/integrantes/americanos/francisco-javier.jpg";
import joaoPessoaPhoto from "@assets/integrantes/americanos/Joao-pessoa.jpg";
import joshuaRodriguezPhoto from "@assets/integrantes/americanos/joshua-rodriguez.jpg";
import mateoEstevezPhoto from "@assets/integrantes/americanos/Mateo-estevez.jpg";
import nicolasSaavedraPhoto from "@assets/integrantes/americanos/nicolas-saavedra.jpg";
import orestesFilomenoPhoto from "@assets/integrantes/americanos/Orestes-filomeno.jpg";
import ericFructuosoPhoto from "@assets/integrantes/europeos/eric-fructuoso.jpg";
import federicoCerviPhoto from "@assets/integrantes/europeos/federico-cervi.jpg";
import giorgioCorolloPhoto from "@assets/integrantes/europeos/giorgio-corollo.jpg";
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
    leader: {
      id: "eu-leader",
      alias: "MARIO SOLER",
      realName: "Mario Soler",
      country: "ESPAÑA",
      countryFlag: "🇪🇸",
      role: "LÍDER DIVISIÓN EUROPEA",
      photo: marioSolerPhoto,
    },
    pilots: [
      {
        id: "eu-1",
        alias: "NICHOLAS FONTANA",
        realName: "Nicholas Fontana",
        country: "ITALIA",
        countryFlag: "🇮🇹",
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
        realName: "Giorgio Corollo",
        country: "ITALIA",
        countryFlag: "🇮🇹",
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
        realName: "Miroslaw Kravchenko",
        country: "ALEMANIA",
        countryFlag: "🇩🇪",
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
        realName: "Federico Cervi",
        country: "ITALIA",
        countryFlag: "🇮🇹",
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
        realName: "Samuel Moreno",
        country: "ESPAÑA",
        countryFlag: "🇪🇸",
        role: "FLEX",
        photo: samuelMorenoPhoto,
      },
      {
        id: "eu-6",
        alias: "ERIC FRUCTUOSO",
        realName: "Eric Fructuoso",
        country: "ESPAÑA",
        countryFlag: "🇪🇸",
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
        realName: "Kevin Fernandez",
        country: "ESPAÑA",
        countryFlag: "🇪🇸",
        role: "FLEX",
        photo: kevinFernandezPhoto,
      },
    ],
  },
  {
    id: "america",
    title: "Pilotos americanos",
    leaderLabel: "Líder División Americana",
    leader: {
      id: "am-leader",
      alias: "NILTON GRAJALES",
      realName: "Nilton Grajales",
      country: "COLOMBIA",
      countryFlag: "🇨🇴",
      role: "LIDER DIVISIÓN AMERICANA",
      photo: niltonGrajalesPhoto,
    },
    pilots: [
      {
        id: "am-1",
        alias: "DANIEL AVILA",
        realName: "Daniel Avila",
        country: "COLOMBIA",
        countryFlag: "🇨🇴",
        role: "ENTRY",
        photo: danielAvilaPhoto,
      },
      {
        id: "am-2",
        alias: "MATEO ESTEVEZ",
        realName: "Mateo Estevez",
        country: "ARGENTINA",
        countryFlag: "🇦🇷",
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
        realName: "Carlos Aguilar",
        country: "GUATEMALA",
        countryFlag: "🇬🇹",
        role: "SUPPORT",
        photo: carlosAguilarPhoto,
      },
      {
        id: "am-4",
        alias: "JOAO PESSOA",
        realName: "Joao Pessoa",
        country: "BRASIL",
        countryFlag: "🇧🇷",
        role: "AWPER",
        photo: joaoPessoaPhoto,
      },
      {
        id: "am-5",
        alias: "ORESTES FILOMENO",
        realName: "Orestes Filomeno",
        country: "COLOMBIA",
        countryFlag: "🇨🇴",
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
        realName: "Arnoldo Daetz",
        country: "GUATEMALA",
        countryFlag: "🇬🇹",
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
        realName: "Francisco Campos",
        country: "MÉXICO",
        countryFlag: "🇲🇽",
        role: "FLEX",
        photo: franciscoJavierPhoto,
      },
      {
        id: "am-8",
        alias: "BERNAL VALVERDE",
        realName: "Bernal Valverde",
        country: "COSTA RICA",
        countryFlag: "🇨🇷",
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
        realName: "Joshua Rodriguez",
        country: "VENEZUELA",
        countryFlag: "🇻🇪",
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
        realName: "Nicolas Saavedra",
        country: "ARGENTINA",
        countryFlag: "🇦🇷",
        role: "FLEX",
        photo: nicolasSaavedraPhoto,
        photoFit: {
          position: "center 33%",
          scale: 1.1,
        },
      },
    ],
  },
] as const;
