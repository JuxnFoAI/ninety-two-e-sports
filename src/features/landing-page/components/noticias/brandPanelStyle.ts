import { createCssVarStyle } from "@/shared/lib/cssVarStyle";

/** Variables CSS del encuadre de imagen de marca / vehículo. */
export const createBrandPanelStyle = (objectPosition = "center") =>
  createCssVarStyle({
    "--brand-object-position": objectPosition,
  });
