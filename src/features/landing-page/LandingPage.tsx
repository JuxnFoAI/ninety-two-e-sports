import {
  A11Y_COLOR_FILTER_LAYER_CLASS,
  SkipToMainLink,
  useEffectiveReducedMotion,
} from "@/features/accessibility";

import { BackgroundVideo, ContentSections, Hero, Navbar } from "./components";

export const LandingPage = (): JSX.Element => {
  const prefersReducedMotion = useEffectiveReducedMotion();

  return (
    <div className="relative min-h-app-screen overflow-x-clip text-white">
      <SkipToMainLink />
      <BackgroundVideo />

      <div
        className={`${A11Y_COLOR_FILTER_LAYER_CLASS} relative z-10 flex min-h-app-screen flex-col ${
          prefersReducedMotion
            ? ""
            : "motion-safe:animate-[fadeIn_1s_ease_both] motion-safe:[animation-delay:60ms]"
        }`}
      >
        <Navbar />

        <main id="contenido-principal" tabIndex={-1}>
          <Hero />
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
    </div>
  );
};
