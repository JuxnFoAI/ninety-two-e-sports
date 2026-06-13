import type { CSSProperties } from "react";

/** Variables CSS del encuadre del retrato (`object-position`, escala). */
export const createPilotFrameStyle = (
  focus: string,
  scale?: number,
): CSSProperties =>
  ({
    "--pilot-focus": focus,
    "--pilot-origin": focus,
    ...(scale != null ? { "--pilot-scale": scale } : {}),
  }) as CSSProperties;
