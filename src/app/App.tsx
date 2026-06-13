import { useState } from "react";

import { AccessibilityProvider } from "@/features/accessibility";
import { LandingPage } from "@/features/landing-page";
import { LoadingScreen } from "@/features/loading-screen";

export const App = (): JSX.Element => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <AccessibilityProvider>
      {!isLoaded ? (
        <LoadingScreen onComplete={() => setIsLoaded(true)} />
      ) : (
        <LandingPage />
      )}
    </AccessibilityProvider>
  );
};
