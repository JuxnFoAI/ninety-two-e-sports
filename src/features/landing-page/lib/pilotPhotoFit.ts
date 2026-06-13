import type { CSSProperties } from "react";
import type { PilotPhotoFit } from "../types/pilot";

const DEFAULT_OBJECT_POSITION = "top";

/** Estilos inline para recortar y escalar la foto del piloto dentro del avatar cuadrado. */
export function getPilotPhotoStyles(photoFit?: PilotPhotoFit): CSSProperties {
  return {
    objectPosition: photoFit?.position ?? DEFAULT_OBJECT_POSITION,
    ...(photoFit?.scale != null && photoFit.scale !== 1
      ? {
          transform: `scale(${photoFit.scale})`,
          transformOrigin: photoFit.origin ?? "center center",
        }
      : {}),
  };
}

/** Clase base de `object-position` cuando no hay ajuste fino por piloto. */
export function getPilotPhotoObjectClass(photoFit?: PilotPhotoFit): string {
  return photoFit ? "" : "object-top";
}
