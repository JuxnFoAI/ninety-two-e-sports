import { useMediaQuery } from "./useMediaQuery";

/** Matches desktop UI: wide viewport with a precise pointer (mouse/trackpad). */
export const DESKTOP_UI_MEDIA_QUERY =
  "(min-width: 1024px) and (hover: hover) and (pointer: fine)";

/** Tracks whether desktop navigation and interactions should be shown. */
export const useDesktopUi = (): boolean =>
  useMediaQuery(DESKTOP_UI_MEDIA_QUERY);
