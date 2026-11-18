import { lazy, Suspense, useRef, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AccessibilityProvider } from "@/features/accessibility";
import { LoadingScreen } from "@/features/loading-screen";
import { LandingPage } from "@/features/landing-page/LandingPage";
import { useInert } from "@/shared/lib/inert";

import { IntroReadyProvider } from "./introReady";
import { ScrollManager } from "./ScrollManager";
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
  const [introReady, setIntroReady] = useState(false);
  const appRef = useRef<HTMLDivElement>(null);

  useInert(appRef, !isLoaded);

  return (
    <AccessibilityProvider>
      <IntroReadyProvider ready={introReady}>
        <div ref={appRef} className={introReady ? undefined : "intro-hold"}>
          <BrowserRouter>
            <ScrollManager />
            <Suspense
              fallback={<div className="min-h-dvh bg-black" aria-hidden />}
            >
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
        </div>
      </IntroReadyProvider>
      {!isLoaded ? (
        <LoadingScreen
          onFadeStart={() => setIntroReady(true)}
          onComplete={() => setIsLoaded(true)}
        />
      ) : null}
    </AccessibilityProvider>
  );
};
