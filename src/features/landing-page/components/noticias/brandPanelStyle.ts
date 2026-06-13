import type { CSSProperties } from "react";

/** Variables CSS del encuadre de imagen de marca / vehículo. */
export const createBrandPanelStyle = (
  objectPosition = "center",
): CSSProperties =>
  ({
    "--brand-object-position": objectPosition,
  }) as CSSProperties;
