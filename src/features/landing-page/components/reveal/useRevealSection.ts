import { useContext } from "react";

import { RevealSectionContext } from "./revealSectionContext";

/** Whether the enclosing `RevealSection` has entered the viewport. */
export const useRevealSection = (): boolean => useContext(RevealSectionContext);
