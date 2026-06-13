import { MobileAccessibilityPanel } from "@/features/accessibility";

import { NavbarLinkList } from "./NavbarLinkList";

type NavbarMobileNavProps = {
  menuOpen: boolean;
  mobileAccessibilityOpen: boolean;
  onNavigate: () => void;
  onMobileAccessibilityOpenChange: (open: boolean) => void;
};

export const NavbarMobileNav = ({
  menuOpen,
  mobileAccessibilityOpen,
  onNavigate,
  onMobileAccessibilityOpenChange,
}: NavbarMobileNavProps): JSX.Element => (
  <nav
    id="mobile-nav"
    className={`grid border-t border-white/10 transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden ${
      menuOpen
        ? "grid-rows-[1fr] opacity-100"
        : "pointer-events-none grid-rows-[0fr] opacity-0"
    }`}
    aria-label="Principal móvil"
    aria-hidden={!menuOpen}
  >
    <div
      className="min-h-0 max-h-[calc(100dvh-var(--header-height)-env(safe-area-inset-top)-0.5rem)] overflow-y-auto overscroll-contain"
      data-scroll-lock-scrollable=""
    >
      <NavbarLinkList variant="mobile" onNavigate={onNavigate} />
      <MobileAccessibilityPanel
        open={mobileAccessibilityOpen}
        onOpenChange={onMobileAccessibilityOpenChange}
      />
    </div>
  </nav>
);
