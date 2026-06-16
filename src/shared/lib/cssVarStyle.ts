import type { CSSProperties } from "react";

/** Builds inline styles from CSS custom properties. */
export const createCssVarStyle = (
  vars: Record<string, string | number>,
): CSSProperties => vars as CSSProperties;
