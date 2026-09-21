import astonMartinDetalleFrontal from "@assets/Designs/aston-martin-detalle-frontal.jpeg";
import astonMartinPerfil from "@assets/Designs/aston-martin-perfil.jpeg";
import astonMartinTrasera from "@assets/Designs/aston-martin-trasera.jpeg";
import astonMartinVelocidad from "@assets/Designs/aston-martin-velocidad.jpeg";
import audiR8CuartoTrasero from "@assets/Designs/audi-r8-cuarto-trasero.png";
import audiR8Frontal from "@assets/Designs/audi-r8-frontal.png";
import audiR8Perfil from "@assets/Designs/audi-r8-perfil.png";
import audiR8Pista from "@assets/Designs/audi-r8-pista.png";
import audiR8Techo from "@assets/Designs/audi-r8-techo.png";
import bmwCiudad from "@assets/Designs/bmw-ciudad.jpeg";
import bmwTecho from "@assets/Designs/bmw-techo.jpeg";
import bmwFrontal from "@assets/Designs/bmw-frontal.jpeg";
import bmwV8Costa from "@assets/Designs/bmw-v8-costa.jpeg";
import bmwV8Curva from "@assets/Designs/bmw-v8-curva.jpeg";
import bmwV8Velocidad from "@assets/Designs/bmw-v8-velocidad.jpeg";
import hondaFrontal from "@assets/Designs/honda-frontal.jpeg";
import hondaTrasera from "@assets/Designs/honda-trasera.jpeg";
import hondaVelocidad from "@assets/Designs/honda-velocidad.jpeg";
import jaguarDetalleFrontal from "@assets/Designs/jaguar-detalle-frontal.png";
import jaguarDetalleTrasero from "@assets/Designs/jaguar-detalle-trasero.png";
import jaguarEstudio from "@assets/Designs/jaguar-estudio.png";
import lamborghiniCuartoTrasero from "@assets/Designs/lamborghini-cuarto-trasero.png";
import lamborghiniCurvaAerea from "@assets/Designs/lamborghini-curva-aerea.png";
import lamborghiniFrontalNiebla from "@assets/Designs/lamborghini-frontal-niebla.png";
import mazdaCurva from "@assets/Designs/mazda-curva.png";
import mazdaDetalleFrontal from "@assets/Designs/mazda-detalle-frontal.png";
import mazdaPerfil from "@assets/Designs/mazda-perfil.png";
import mazdaTrasera from "@assets/Designs/mazda-trasera.png";
import mclarenFrontal from "@assets/Designs/mclaren-frontal.png";
import mclarenNocturno from "@assets/Designs/mclaren-nocturno.png";
import mclarenTrasera from "@assets/Designs/mclaren-trasera.png";
import nissanFrenos from "@assets/Designs/nissan-frenos.png";
import nissanFrontal from "@assets/Designs/nissan-frontal.png";
import nissanTrasera from "@assets/Designs/nissan-trasera.png";
import porscheAleron from "@assets/Designs/porsche-aleron.png";
import porschePerfil from "@assets/Designs/porsche-perfil.png";
import porscheTecho from "@assets/Designs/porsche-techo.png";
import porscheVelocidad from "@assets/Designs/porsche-velocidad.png";
import superFormulaAleron from "@assets/Designs/super-formula-aleron.jpeg";
import superFormulaCurva from "@assets/Designs/super-formula-curva.jpeg";
import superFormulaNoche from "@assets/Designs/super-formula-noche.jpeg";
import superFormulaPista from "@assets/Designs/super-formula-pista.jpeg";
import toyotaBmwLago from "@assets/Designs/toyota-bmw-lago.jpeg";
import toyotaBmwMuelle from "@assets/Designs/toyota-bmw-muelle.jpeg";
import type { TeamDesign } from "../types/design";

/** Galería de liveries / diseños del equipo. */
export const TEAM_DESIGNS: readonly TeamDesign[] = [
  {
    id: "jaguar-detalle-frontal",
    src: jaguarDetalleFrontal,
    alt: "Detalle frontal del Jaguar del equipo Ninety Two, con disco de freno al rojo",
  },
  {
    id: "lamborghini-frontal-niebla",
    src: lamborghiniFrontalNiebla,
    alt: "Lamborghini Huracán GT3 del equipo Ninety Two de frente, entre niebla",
  },
  {
    id: "audi-r8-perfil",
    src: audiR8Perfil,
    alt: "Perfil lateral del Audi R8 LMS del equipo Ninety Two",
  },
  {
    id: "mazda-detalle-frontal",
    src: mazdaDetalleFrontal,
    alt: "Detalle frontal del Mazda del equipo Ninety Two, con faro encendido",
  },
  {
    id: "porsche-velocidad",
    src: porscheVelocidad,
    alt: "Porsche 911 GT3 R del equipo Ninety Two en plena velocidad",
  },
  {
    id: "mclaren-nocturno",
    src: mclarenNocturno,
    alt: "McLaren del equipo Ninety Two de noche, entre neones urbanos",
  },
  {
    id: "audi-r8-frontal",
    src: audiR8Frontal,
    alt: "Audi R8 LMS del equipo Ninety Two, vista frontal con faros encendidos",
  },
  {
    id: "nissan-frontal",
    src: nissanFrontal,
    alt: "Nissan GT-R del equipo Ninety Two, vista frontal en movimiento",
  },
  {
    id: "jaguar-estudio",
    src: jaguarEstudio,
    alt: "Jaguar del equipo Ninety Two en estudio, vista aérea",
  },
  {
    id: "porsche-perfil",
    src: porschePerfil,
    alt: "Perfil del Porsche 911 GT3 R del equipo Ninety Two, con disco de freno al rojo",
  },
  {
    id: "mclaren-frontal",
    src: mclarenFrontal,
    alt: "McLaren del equipo Ninety Two, vista frontal en pista",
  },
  {
    id: "porsche-aleron",
    src: porscheAleron,
    alt: "Porsche 911 GT3 R del equipo Ninety Two, vista trasera en pista",
  },
  {
    id: "lamborghini-cuarto-trasero",
    src: lamborghiniCuartoTrasero,
    alt: "Cuarto trasero del Lamborghini Huracán GT3 del equipo Ninety Two",
  },
  {
    id: "mazda-curva",
    src: mazdaCurva,
    alt: "Mazda del equipo Ninety Two trazando una curva en pista",
  },
  {
    id: "audi-r8-pista",
    src: audiR8Pista,
    alt: "Audi R8 LMS del equipo Ninety Two en pista, vista aérea",
  },
  {
    id: "nissan-frenos",
    src: nissanFrenos,
    alt: "Nissan GT-R del equipo Ninety Two en frenada, con disco al rojo",
  },
  {
    id: "jaguar-detalle-trasero",
    src: jaguarDetalleTrasero,
    alt: "Detalle trasero del Jaguar del equipo Ninety Two",
  },
  {
    id: "porsche-techo",
    src: porscheTecho,
    alt: "Vista aérea del Porsche 911 GT3 R del equipo Ninety Two",
  },
  {
    id: "audi-r8-cuarto-trasero",
    src: audiR8CuartoTrasero,
    alt: "Cuarto trasero del Audi R8 LMS del equipo Ninety Two",
  },
  {
    id: "mazda-trasera",
    src: mazdaTrasera,
    alt: "Vista trasera del Mazda del equipo Ninety Two en movimiento",
  },
  {
    id: "mclaren-trasera",
    src: mclarenTrasera,
    alt: "Vista trasera del McLaren del equipo Ninety Two en carretera",
  },
  {
    id: "lamborghini-curva-aerea",
    src: lamborghiniCurvaAerea,
    alt: "Lamborghini Huracán GT3 del equipo Ninety Two en curva, vista aérea",
  },
  {
    id: "audi-r8-techo",
    src: audiR8Techo,
    alt: "Vista aérea trasera del Audi R8 LMS del equipo Ninety Two",
  },
  {
    id: "nissan-trasera",
    src: nissanTrasera,
    alt: "Vista trasera del Nissan GT-R del equipo Ninety Two en boxes",
  },
  {
    id: "mazda-perfil",
    src: mazdaPerfil,
    alt: "Perfil del Mazda del equipo Ninety Two en el circuito",
  },
  {
    id: "aston-martin-velocidad",
    src: astonMartinVelocidad,
    alt: "Aston Martin Vantage GT3 del equipo Ninety Two en plena velocidad, de noche",
  },
  {
    id: "aston-martin-trasera",
    src: astonMartinTrasera,
    alt: "Vista trasera del Aston Martin Vantage GT3 del equipo Ninety Two en curva nocturna",
  },
  {
    id: "aston-martin-detalle-frontal",
    src: astonMartinDetalleFrontal,
    alt: "Detalle frontal del Aston Martin Vantage GT3 del equipo Ninety Two",
  },
  {
    id: "aston-martin-perfil",
    src: astonMartinPerfil,
    alt: "Perfil del Aston Martin Vantage GT3 del equipo Ninety Two, con disco de freno al rojo",
  },
  {
    id: "honda-frontal",
    src: hondaFrontal,
    alt: "Honda NSX GT3 del equipo Ninety Two adelantando en pista, de noche",
  },
  {
    id: "honda-velocidad",
    src: hondaVelocidad,
    alt: "Honda NSX GT3 del equipo Ninety Two en plena velocidad",
  },
  {
    id: "honda-trasera",
    src: hondaTrasera,
    alt: "Vista trasera del Honda NSX GT3 del equipo Ninety Two de noche",
  },
  {
    id: "bmw-ciudad",
    src: bmwCiudad,
    alt: "BMW M6 GT3 del equipo Ninety Two en ciudad, al atardecer",
  },
  {
    id: "bmw-techo",
    src: bmwTecho,
    alt: "Vista aérea del BMW M6 GT3 del equipo Ninety Two",
  },
  {
    id: "bmw-frontal",
    src: bmwFrontal,
    alt: "BMW M6 GT3 del equipo Ninety Two en pista, vista frontal",
  },
  {
    id: "bmw-v8-velocidad",
    src: bmwV8Velocidad,
    alt: "BMW Hypercar del equipo Ninety Two en plena velocidad, al atardecer",
  },
  {
    id: "bmw-v8-costa",
    src: bmwV8Costa,
    alt: "Vista trasera del BMW Hypercar del equipo Ninety Two junto al mar",
  },
  {
    id: "bmw-v8-curva",
    src: bmwV8Curva,
    alt: "BMW Hypercar del equipo Ninety Two trazando una curva, de noche",
  },
  {
    id: "super-formula-noche",
    src: superFormulaNoche,
    alt: "Super Formula del equipo Ninety Two de noche, entre luces urbanas",
  },
  {
    id: "super-formula-pista",
    src: superFormulaPista,
    alt: "Super Formula del equipo Ninety Two en pista mojada, vista aérea",
  },
  {
    id: "super-formula-curva",
    src: superFormulaCurva,
    alt: "Super Formula del equipo Ninety Two trazando una curva",
  },
  {
    id: "super-formula-aleron",
    src: superFormulaAleron,
    alt: "Alerón trasero de la Super Formula del equipo Ninety Two",
  },
  {
    id: "toyota-bmw-lago",
    src: toyotaBmwLago,
    alt: "Toyota GR010 y BMW Hypercar del equipo Ninety Two junto al lago, al atardecer",
  },
  {
    id: "toyota-bmw-muelle",
    src: toyotaBmwMuelle,
    alt: "Toyota GR010 y BMW Hypercar del equipo Ninety Two en el muelle, vista aérea",
  },
];
