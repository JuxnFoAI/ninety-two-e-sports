import { MobileAccessibilityPanel } from "@/features/accessibility";

import { NavbarLinkList } from "./NavbarLinkList";

type NavbarMobileNavProps = {
  className?: string;
  menuOpen: boolean;
  mobileAccessibilityOpen: boolean;
  onNavigate: () => void;
  onMobileAccessibilityOpenChange: (open: boolean) => void;
};

export const NavbarMobileNav = ({
  className = "",
  menuOpen,
  mobileAccessibilityOpen,
  onNavigate,
  onMobileAccessibilityOpenChange,
}: NavbarMobileNavProps): JSX.Element => (
  <nav
    id="mobile-nav"
    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden ${className} ${
      menuOpen
        ? "grid-rows-[1fr] opacity-100"
        : "pointer-events-none grid-rows-[0fr] opacity-0"
    } ${menuOpen ? "border-t border-white/10" : "border-t border-transparent"}`}
    aria-label="Principal móvil"
    aria-hidden={!menuOpen}
  >
    <div
      className="min-h-0 max-h-[calc(100dvh-var(--header-height)-env(safe-area-inset-top)-1.25rem)] overflow-y-auto overscroll-contain px-1 pb-2"
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
