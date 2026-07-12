import { useEffect, useState } from "react";

import { useScrolledPast, useScrollLock } from "@/shared/hooks";

import { NAVBAR_ENTRANCE_CLASS } from "../../styles/navbarAnimation";
import { NavbarBrand } from "./NavbarBrand";
import { NavbarDesktopNav } from "./NavbarLinkList";
import { NavbarHeaderActions } from "./NavbarHeaderActions";
import { NavbarMenuToggle } from "./NavbarMenuToggle";
import { NavbarMobileBackdrop } from "./NavbarMobileBackdrop";
import { NavbarMobileNav } from "./NavbarMobileNav";

export const Navbar = (): JSX.Element => {
  const isScrolled = useScrolledPast();
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopAccessibilityOpen, setDesktopAccessibilityOpen] =
    useState(false);
  const [mobileAccessibilityOpen, setMobileAccessibilityOpen] = useState(false);

  useScrollLock(menuOpen);

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

  const headerSurfaceClass =
    isScrolled || menuOpen
      ? "border-b border-white/10 bg-black/70 backdrop-blur-md"
      : "border-b border-transparent bg-transparent";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-20 px-[clamp(1rem,4vw,4rem)] pt-[max(1.25rem,env(safe-area-inset-top))] transition-[background-color,backdrop-filter,border-color] duration-500 ease-out ${NAVBAR_ENTRANCE_CLASS} ${headerSurfaceClass}`}
    >
      <NavbarMobileBackdrop open={menuOpen} onClose={closeMenu} />

      <div className="relative z-10 flex items-center justify-between gap-3 pb-4 lg:pb-6">
        <NavbarBrand onNavigate={closeMenu} />
        <NavbarDesktopNav />
        <NavbarHeaderActions
          desktopAccessibilityOpen={desktopAccessibilityOpen}
          onDesktopAccessibilityOpenChange={setDesktopAccessibilityOpen}
        />
        <NavbarMenuToggle
          menuOpen={menuOpen}
          onToggle={() => setMenuOpen((open) => !open)}
        />
      </div>

      <NavbarMobileNav
        className="relative z-10"
        menuOpen={menuOpen}
        mobileAccessibilityOpen={mobileAccessibilityOpen}
        onNavigate={closeMenu}
        onMobileAccessibilityOpenChange={setMobileAccessibilityOpen}
      />
    </header>
  );
};
