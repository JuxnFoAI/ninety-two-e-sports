import { createContext, useContext } from "react";

/** True once the loader starts fading and entrance animations may play. */
export const IntroReadyContext = createContext(true);

export const useIntroReady = (): boolean => useContext(IntroReadyContext);
