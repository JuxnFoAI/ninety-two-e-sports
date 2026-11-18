import type { ReactNode } from "react";

import { IntroReadyContext } from "./useIntroReady";

export const IntroReadyProvider = ({
  ready,
  children,
}: {
  ready: boolean;
  children: ReactNode;
}): JSX.Element => (
  <IntroReadyContext.Provider value={ready}>
    {children}
  </IntroReadyContext.Provider>
);
