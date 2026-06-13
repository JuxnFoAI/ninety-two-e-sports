import cammusLogo from "@assets/patrocinadores/cammus.jpg";
import cmEliteMotorLogo from "@assets/patrocinadores/cm-elite-motor.jpg";
import emixLogo from "@assets/patrocinadores/emix.jpg";
import vayaJamonesLogo from "@assets/patrocinadores/vaya-jamones.jpg";
import type { Sponsor } from "../types/sponsor";

export const SPONSORS: readonly Sponsor[] = [
  {
    id: "cammus",
    name: "Cammus",
    logo: cammusLogo,
    detail: {
      paragraphs: [
        "CAMMUS es una empresa tecnológica china fundada en 2008, conocida en el mundo del simracing por fabricar volantes direct drive, pedales, cockpits y otros periféricos para simuladores de conducción. Desde 2021 ha impulsado con fuerza su división de simracing y ha ganado presencia internacional.",
        "CAMMUS nos acompaña como patrocinador desde el año 2025, aportando con sus equipos para una mayor precisión en el mundo del SimRacing.",
      ],
      links: [
        {
          label: "Visita su página",
          href: "https://cammusracing.com/",
        },
      ],
    },
  },
  {
    id: "vaya-jamones",
    name: "Vaya Jamones",
    logo: vayaJamonesLogo,
    detail: {
      paragraphs: [
        "Vaya Jamones es una marca española dedicada a la venta y comercialización de productos ibéricos y gourmet. Su catálogo incluye jamón ibérico, embutidos, quesos, aceite de oliva y otros productos tradicionales de España. Funciona principalmente como una tienda online especializada en gastronomía ibérica.",
        "Vaya Jamones es nuestro patrocinador desde el año 2022, fue uno de nuestros primeros patrocinadores.",
      ],
      links: [
        {
          label: "Visita su página",
          href: "https://www.vayajamones.es/",
        },
      ],
    },
  },
  {
    id: "emix",
    name: "Emix",
    logo: emixLogo,
    detail: {
      paragraphs: [
        "EMIX Time to Play, conocida actualmente como EMIX Gaming Sportswear, es una marca española fundada en 2008 y especializada en la fabricación de ropa deportiva y equipaciones personalizadas para clubes, equipos de eSports y creadores de contenido.",
        "EMIX Gaming Sportswear empezó su colaboración en el año 2024, brindándonos una ayuda con nuestra equipación.",
      ],
      links: [
        {
          label: "Visita su página",
          href: "https://emixgaming.es/",
        },
        {
          label: "Nuestra Equipación",
          href: "https://emixgaming.es/producto/camiseta-oficial-gtspain92/",
        },
      ],
    },
  },
  {
    id: "cm-elite-motor",
    name: "CM Elite Motor",
    logo: cmEliteMotorLogo,
    detail: {
      paragraphs: [
        "CM Elite Motor es una empresa española relacionada con el sector del automóvil, dedicada principalmente a la compraventa y servicios asociados a vehículos.",
        "CM Elite Motor empezó a colaborar con nuestro equipo en el año 2025, brindándonos una ayuda muy grande para nuestro equipo.",
      ],
      links: [
        {
          label: "Visita su página",
          href: "https://cmelitemotor.es/",
        },
      ],
    },
  },
] as const;
