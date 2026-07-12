import batteryPark from "@assets/Designs/Battery-Park.png";
import calleDeBoxes from "@assets/Designs/Calle-de-boxes.png";
import calleDeBoxes1 from "@assets/Designs/Calle-de-boxes-1.png";
import estacionamientoMiami from "@assets/Designs/Estacionamiento-Miami.png";
import granvilleIsland from "@assets/Designs/Granville-Island-Vancouver.png";
import museoAomori from "@assets/Designs/Museo-de-Arte-de-Aomori.png";
import museoIwate from "@assets/Designs/Museo-de-Arte-de-Iwate.png";
import osanbashi from "@assets/Designs/Osanbashi-Yokohama.png";
import osanbashi1 from "@assets/Designs/Osanbashi-Yokohama-1.png";
import pikesPeak from "@assets/Designs/Pikes-Peak-Highway.png";
import pikesPeak1 from "@assets/Designs/Pikes-Peak-Highway-1.png";
import rectaPrincipal from "@assets/Designs/Recta-principal.png";
import type { TeamDesign } from "../types/design";

/** Galería de liveries / diseños del equipo. */
export const TEAM_DESIGNS: readonly TeamDesign[] = [
  {
    id: "battery-park",
    src: batteryPark,
    alt: "Audi R8 LMS del equipo Ninety Two en Battery Park",
  },
  {
    id: "calle-de-boxes",
    src: calleDeBoxes,
    alt: "Audi R8 LMS del equipo Ninety Two en calle de boxes",
  },
  {
    id: "calle-de-boxes-1",
    src: calleDeBoxes1,
    alt: "Detalle frontal del Audi R8 LMS del equipo Ninety Two",
  },
  {
    id: "estacionamiento-miami",
    src: estacionamientoMiami,
    alt: "Audi R8 LMS del equipo Ninety Two en estacionamiento de Miami",
  },
  {
    id: "granville-island",
    src: granvilleIsland,
    alt: "Perfil lateral del Audi R8 LMS del equipo Ninety Two en Granville Island",
  },
  {
    id: "museo-aomori",
    src: museoAomori,
    alt: "Detalle trasero del diseño Ninety Two en Museo de Arte de Aomori",
  },
  {
    id: "museo-iwate",
    src: museoIwate,
    alt: "Audi R8 LMS del equipo Ninety Two en Museo de Arte de Iwate",
  },
  {
    id: "recta-principal",
    src: rectaPrincipal,
    alt: "Jaguar del equipo Ninety Two en recta principal",
  },
  {
    id: "pikes-peak",
    src: pikesPeak,
    alt: "Jaguar del equipo Ninety Two en Pikes Peak Highway",
  },
  {
    id: "pikes-peak-1",
    src: pikesPeak1,
    alt: "Detalle trasero del Jaguar Ninety Two en Pikes Peak Highway",
  },
  {
    id: "osanbashi",
    src: osanbashi,
    alt: "Detalle frontal del Audi R8 LMS del equipo Ninety Two en Osanbashi Yokohama",
  },
  {
    id: "osanbashi-1",
    src: osanbashi1,
    alt: "Jaguar del equipo Ninety Two en Terminal Osanbashi Yokohama",
  },
];
