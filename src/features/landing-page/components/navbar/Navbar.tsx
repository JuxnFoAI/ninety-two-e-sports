import { useEffect, useState } from "react";

import { useEffectiveReducedMotion } from "@/features/accessibility";
import { useScrolledPast, useScrollLock } from "@/shared/hooks";

import { getNavbarEntranceClass } from "../../styles/navbarAnimation";
import { NavbarBrand } from "./NavbarBrand";
import { NavbarDesktopNav } from "./NavbarLinkList";
import { NavbarHeaderActions } from "./NavbarHeaderActions";
import styles from "./NavbarIsland.module.css";
import { NavbarMenuToggle } from "./NavbarMenuToggle";
import { NavbarMobileBackdrop } from "./NavbarMobileBackdrop";
import { NavbarMobileNav } from "./NavbarMobileNav";

type NavbarProps = {
  entranceDelayMs?: number;
  interactive?: boolean;
  /** Home: surface tracks the soft-black night settle instead of a hard scrolled band. */
  blendWithScrollNight?: boolean;
};

export const Navbar = ({
  entranceDelayMs = 120,
  interactive = true,
  blendWithScrollNight = false,
}: NavbarProps): JSX.Element => {
  const isScrolled = useScrolledPast();
  const prefersReducedMotion = useEffectiveReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopAccessibilityOpen, setDesktopAccessibilityOpen] =
    useState(false);
  const [mobileAccessibilityOpen, setMobileAccessibilityOpen] = useState(false);
  /** Drop entrance animation after it finishes so leftover transform doesn’t kill backdrop-filter. */
  const [entranceClass, setEntranceClass] = useState(() =>
    prefersReducedMotion ? "" : getNavbarEntranceClass(entranceDelayMs),
  );

  useScrollLock(menuOpen);

  useEffect(() => {
    if (prefersReducedMotion) {
      setEntranceClass("");
      return;
    }

    setEntranceClass(getNavbarEntranceClass(entranceDelayMs));
  }, [entranceDelayMs, prefersReducedMotion]);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setMobileAccessibilityOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  const closeMenu = (): void => {
    setMenuOpen(false);
    setMobileAccessibilityOpen(false);
  };

  const isIsland = isScrolled || menuOpen;
  const useNightBlend =
    blendWithScrollNight && !prefersReducedMotion && !menuOpen;

  const islandClassName = [
    styles.island,
    isIsland ? styles.islandActive : styles.islandTop,
    menuOpen ? styles.islandMenu : "",
    useNightBlend ? styles.islandNight : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header
      className={`${styles.shell} ${entranceClass} ${
        interactive ? "" : styles.shellInactive
      }`}
      aria-hidden={interactive ? undefined : true}
      onAnimationEnd={(event) => {
        if (event.target !== event.currentTarget) {
          return;
        }
        setEntranceClass("");
      }}
    >
      <NavbarMobileBackdrop open={menuOpen} onClose={closeMenu} />

      <div className={islandClassName}>
        <div className={styles.frost} aria-hidden="true" />
        <div className={styles.row}>
          <div className={styles.start}>
            <NavbarBrand onNavigate={closeMenu} />
          </div>
          <NavbarDesktopNav className={styles.middle} />
          <div className={styles.end}>
            <NavbarHeaderActions
              desktopAccessibilityOpen={desktopAccessibilityOpen}
              onDesktopAccessibilityOpenChange={setDesktopAccessibilityOpen}
              revealLabels={!isIsland}
              socialsClassName={styles.socials}
            />
            <NavbarMenuToggle
              menuOpen={menuOpen}
              onToggle={() => setMenuOpen((open) => !open)}
            />
          </div>
        </div>

        <div className={styles.panel}>
          <NavbarMobileNav
            menuOpen={menuOpen}
            mobileAccessibilityOpen={mobileAccessibilityOpen}
            onNavigate={closeMenu}
            onMobileAccessibilityOpenChange={setMobileAccessibilityOpen}
          />
        </div>
      </div>
    </header>
  );
};
