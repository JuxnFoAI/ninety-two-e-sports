import { useEffect, useState } from "react";

import { useEffectiveReducedMotion } from "@/features/accessibility";

import { ContentSections, Hero, SiteShell } from "./components";
import {
  ScrollDesignsWhite,
  ScrollSoftBlack,
} from "./components/scroll-effects";
import {
  getHomeChromeItemDelayMs,
  getHomeChromeStartMs,
  HOME_CHROME_ENTRANCE,
} from "./lib/homeEntrance";

export const LandingPage = (): JSX.Element => {
  const prefersReducedMotion = useEffectiveReducedMotion();
  const [navbarInteractive, setNavbarInteractive] =
    useState(prefersReducedMotion);

  useEffect(() => {
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
  }, [prefersReducedMotion]);

  return (
    <SiteShell
      behindContent={
        <>
          <ScrollSoftBlack />
          <ScrollDesignsWhite />
        </>
      }
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
