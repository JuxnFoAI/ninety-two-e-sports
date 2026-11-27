import { lazy, Suspense, useRef, useState, type ComponentType } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AccessibilityProvider } from "@/features/accessibility";
import { LoadingScreen } from "@/features/loading-screen";
import { LandingPage } from "@/features/landing-page/LandingPage";
import { useInert } from "@/shared/lib/inert";

import { IntroReadyProvider } from "./introReady";
import { MobileBottomBlur } from "./MobileBottomBlur";
import { ScrollManager } from "./ScrollManager";

/** `React.lazy` for a module that uses a named export instead of `default`. */
const lazyNamed = <K extends string, M extends Record<K, ComponentType>>(
  load: () => Promise<M>,
  name: K,
) => lazy(async () => ({ default: (await load())[name] }));

const EquiposPage = lazyNamed(
  () => import("@/features/landing-page/EquiposPage"),
  "EquiposPage",
);
const FotosPage = lazyNamed(
  () => import("@/features/landing-page/FotosPage"),
  "FotosPage",
);
const NoticiasPage = lazyNamed(
  () => import("@/features/landing-page/NoticiasPage"),
  "NoticiasPage",
);
const TorneosPage = lazyNamed(
  () => import("@/features/landing-page/TorneosPage"),
  "TorneosPage",
);
const NotFoundPage = lazyNamed(
  () => import("@/features/landing-page/NotFoundPage"),
  "NotFoundPage",
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
          <MobileBottomBlur />
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
