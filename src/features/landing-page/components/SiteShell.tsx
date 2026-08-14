import type { ReactNode } from "react";

import {
  A11Y_COLOR_FILTER_LAYER_CLASS,
  SkipToMainLink,
  useEffectiveReducedMotion,
} from "@/features/accessibility";

import { BackgroundVideo } from "./BackgroundVideo";
import { Navbar } from "./navbar";

type SiteShellProps = {
  children: ReactNode;
  /** Fixed layers between the background media and page chrome (e.g. scroll veils). */
  behindContent?: ReactNode;
  /** Home-only: skip shell fade-in and defer navbar until the title sequence ends. */
  sequencedHomeEntrance?: boolean;
  navbarEntranceDelayMs?: number;
  navbarInteractive?: boolean;
  footerEntranceDelayMs?: number;
  /** Merge main + footer into one night surface (e.g. `/fotos`). */
  connectFooterToContent?: boolean;
};

export const SiteShell = ({
  children,
  behindContent,
  sequencedHomeEntrance = false,
  navbarEntranceDelayMs = 120,
  navbarInteractive = true,
  footerEntranceDelayMs,
  connectFooterToContent = false,
}: SiteShellProps): JSX.Element => {
  const prefersReducedMotion = useEffectiveReducedMotion();

  const shellEntranceClass =
    prefersReducedMotion || sequencedHomeEntrance
      ? ""
      : "motion-safe:animate-[fadeIn_1s_ease_both] motion-safe:[animation-delay:60ms]";

  const footerEntranceClass =
    sequencedHomeEntrance &&
    !prefersReducedMotion &&
    footerEntranceDelayMs != null
      ? `motion-safe:animate-[fadeIn_0.7s_ease_both] motion-safe:[animation-delay:${footerEntranceDelayMs}ms] opacity-0`
      : "";

  return (
    <div className="relative min-h-dvh text-white">
      <SkipToMainLink />
      <BackgroundVideo />
      {behindContent}

      {/*
        Navbar stays outside overflow-x-clip so backdrop-filter can sample
        page content scrolling underneath the floating pill.
      */}
      <div className={A11Y_COLOR_FILTER_LAYER_CLASS}>
        <Navbar
          entranceDelayMs={
            prefersReducedMotion && sequencedHomeEntrance
              ? 0
              : navbarEntranceDelayMs
          }
          interactive={navbarInteractive}
          blendWithScrollNight={behindContent != null}
        />
      </div>

      <div
        className={`${A11Y_COLOR_FILTER_LAYER_CLASS} relative z-10 flex min-h-dvh flex-col overflow-x-clip ${shellEntranceClass}`.trim()}
      >
        <main
          id="contenido-principal"
          className={`flex-1 ${connectFooterToContent ? "flex flex-col" : ""}`.trim()}
          tabIndex={-1}
        >
          {children}
        </main>

        <footer
          role="contentinfo"
          className={`bg-black/90 px-[clamp(1rem,4vw,4rem)] py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:py-7 ${
            connectFooterToContent ? "relative z-[1]" : ""
          } ${footerEntranceClass}`.trim()}
        >
          <p className="m-0 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-white/40">
            © {new Date().getFullYear()} Ninety Two E-Sports
          </p>
        </footer>
      </div>
    </div>
  );
};
