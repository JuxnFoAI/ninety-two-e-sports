import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AccessibilityProvider } from "@/features/accessibility";
import {
  EquiposPage,
  FotosPage,
  LandingPage,
  NoticiasPage,
  TorneosPage,
} from "@/features/landing-page";
import { LoadingScreen } from "@/features/loading-screen";

import { ScrollManager } from "./ScrollManager";

export const App = (): JSX.Element => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <AccessibilityProvider>
      {!isLoaded ? (
        <LoadingScreen onComplete={() => setIsLoaded(true)} />
      ) : (
        <BrowserRouter>
          <ScrollManager />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/equipos" element={<EquiposPage />} />
            <Route path="/fotos" element={<FotosPage />} />
            <Route path="/noticias" element={<NoticiasPage />} />
            <Route path="/torneos" element={<TorneosPage />} />
          </Routes>
        </BrowserRouter>
      )}
    </AccessibilityProvider>
  );
};
