import { useEffect, useState } from "react";

import { useIntroReady } from "@/app/useIntroReady";
import { useEffectiveReducedMotion } from "@/features/accessibility";
import { usePageTitle } from "@/shared/hooks";

import { ContentSections, Hero, SiteShell } from "./components";
import { ScrollSoftBlack } from "./components/scroll-effects";
import {
  getHomeChromeItemDelayMs,
  getHomeChromeStartMs,
  HOME_CHROME_ENTRANCE,
} from "./lib/homeEntrance";

export const LandingPage = (): JSX.Element => {
  usePageTitle();
  const introReady = useIntroReady();
  const prefersReducedMotion = useEffectiveReducedMotion();
  const [navbarInteractive, setNavbarInteractive] =
    useState(prefersReducedMotion);

  useEffect(() => {
    if (!introReady) {
      return undefined;
    }

    if (prefersReducedMotion) {
      setNavbarInteractive(true);
      return undefined;
    }

    setNavbarInteractive(false);
    const timer = window.setTimeout(() => {
      setNavbarInteractive(true);
    }, getHomeChromeStartMs());

    return () => {
      window.clearTimeout(timer);
    };
  }, [introReady, prefersReducedMotion]);

  return (
    <SiteShell
      behindContent={<ScrollSoftBlack />}
      sequencedHomeEntrance
      navbarEntranceDelayMs={getHomeChromeItemDelayMs(
        HOME_CHROME_ENTRANCE.navbarOffsetMs,
      )}
      navbarInteractive={navbarInteractive}
      footerEntranceDelayMs={getHomeChromeItemDelayMs(
        HOME_CHROME_ENTRANCE.footerOffsetMs,
      )}
    >
      <Hero />
      <ContentSections />
    </SiteShell>
  );
};
