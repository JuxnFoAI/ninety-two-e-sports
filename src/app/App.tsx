import { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AccessibilityProvider } from "@/features/accessibility";
import { LoadingScreen } from "@/features/loading-screen";

import { ScrollManager } from "./ScrollManager";

const LandingPage = lazy(() =>
  import("@/features/landing-page/LandingPage").then((module) => ({
    default: module.LandingPage,
  })),
);
const EquiposPage = lazy(() =>
  import("@/features/landing-page/EquiposPage").then((module) => ({
    default: module.EquiposPage,
  })),
);
const FotosPage = lazy(() =>
  import("@/features/landing-page/FotosPage").then((module) => ({
    default: module.FotosPage,
  })),
);
const NoticiasPage = lazy(() =>
  import("@/features/landing-page/NoticiasPage").then((module) => ({
    default: module.NoticiasPage,
  })),
);
const TorneosPage = lazy(() =>
  import("@/features/landing-page/TorneosPage").then((module) => ({
    default: module.TorneosPage,
  })),
);
const NotFoundPage = lazy(() =>
  import("@/features/landing-page/NotFoundPage").then((module) => ({
    default: module.NotFoundPage,
  })),
);

export const App = (): JSX.Element => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <AccessibilityProvider>
      {!isLoaded ? (
        <LoadingScreen onComplete={() => setIsLoaded(true)} />
      ) : (
        <BrowserRouter>
          <ScrollManager />
          <Suspense fallback={<div className="min-h-dvh bg-black" />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/equipos" element={<EquiposPage />} />
              <Route path="/fotos" element={<FotosPage />} />
              <Route path="/noticias" element={<NoticiasPage />} />
              <Route path="/torneos" element={<TorneosPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      )}
    </AccessibilityProvider>
  );
};
