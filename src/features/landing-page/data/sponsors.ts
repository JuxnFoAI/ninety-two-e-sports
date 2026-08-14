import cammusLogo from "@assets/patrocinadores/Cammus-Logo.png";
import cmEliteMotorLogo from "@assets/patrocinadores/CM-Elite-Motor-Logo.png";
import emixLogo from "@assets/patrocinadores/Emix-Logo.png";
import vayaJamonesLogo from "@assets/patrocinadores/Vaya-Jamones-Logo.png";
import type { Sponsor } from "../types/sponsor";

export const SPONSORS: readonly Sponsor[] = [
  {
    id: "cammus",
    name: "Cammus",
    logo: cammusLogo,
    href: "https://cammusracing.com/",
  },
  {
    id: "vaya-jamones",
    name: "Vaya Jamones",
    logo: vayaJamonesLogo,
    href: "https://www.vayajamones.es/",
  },
  {
    id: "emix",
    name: "Emix",
    logo: emixLogo,
    href: "https://emixgaming.es/producto/camiseta-oficial-ninety-two-esports/",
  },
  {
    id: "cm-elite-motor",
    name: "CM Elite Motor",
    logo: cmEliteMotorLogo,
    href: "https://cmelitemotor.es/",
  },
] as const;
