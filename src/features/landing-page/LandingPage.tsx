import { useState } from "react";

import {
  A11Y_COLOR_FILTER_LAYER_CLASS,
  SkipToMainLink,
  useEffectiveReducedMotion,
} from "@/features/accessibility";
import { useScrollLock } from "@/shared/hooks";

import {
  BackgroundVideo,
  ContentSections,
  DesignsPushNav,
  Hero,
  Navbar,
} from "./components";

export const LandingPage = (): JSX.Element => {
  const prefersReducedMotion = useEffectiveReducedMotion();
  const [designsOpen, setDesignsOpen] = useState(false);

  useScrollLock(designsOpen);

  const pushTransition = prefersReducedMotion
    ? ""
    : "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";

  return (
    <div className="relative min-h-app-screen overflow-x-clip text-white">
      <SkipToMainLink />
      <BackgroundVideo />

      <div
        className={`${A11Y_COLOR_FILTER_LAYER_CLASS} relative z-10 flex min-h-app-screen flex-col ${
          prefersReducedMotion
            ? ""
            : "motion-safe:animate-[fadeIn_1s_ease_both] motion-safe:[animation-delay:60ms]"
        } ${pushTransition}`}
        style={{
          transform: designsOpen ? "translateX(-100%)" : "translateX(0)",
        }}
        aria-hidden={designsOpen || undefined}
      >
        <Navbar />

        <main id="contenido-principal" tabIndex={-1}>
          <Hero onOpenDesigns={() => setDesignsOpen(true)} />
          <ContentSections />
        </main>

        <footer
          role="contentinfo"
          className="bg-black/90 px-[clamp(1rem,4vw,4rem)] py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:py-7"
        >
          <p className="m-0 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-white/40">
            © {new Date().getFullYear()} Ninety Two E-Sports
          </p>
        </footer>
      </div>

      <DesignsPushNav
        open={designsOpen}
        onClose={() => setDesignsOpen(false)}
      />
    </div>
  );
};
