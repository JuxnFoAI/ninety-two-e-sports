import { createCssVarStyle } from "@/shared/lib/cssVarStyle";

/** Variables CSS del encuadre del retrato (`object-position`, escala). */
export const createPilotFrameStyle = (focus: string, scale?: number) =>
  createCssVarStyle({
    "--pilot-focus": focus,
    "--pilot-origin": focus,
    ...(scale != null ? { "--pilot-scale": scale } : {}),
  });
