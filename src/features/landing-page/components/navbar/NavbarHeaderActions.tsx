import { AccessibilityPopover } from "@/features/accessibility";

import { NavbarSocialLinks } from "./NavbarSocialLinks";

type NavbarHeaderActionsProps = {
  desktopAccessibilityOpen: boolean;
  onDesktopAccessibilityOpenChange: (open: boolean) => void;
  /** Inline name reveal on hover; off while the navbar is in pill mode. */
  revealLabels?: boolean;
  socialsClassName?: string;
};

export const NavbarHeaderActions = ({
  desktopAccessibilityOpen,
  onDesktopAccessibilityOpenChange,
  revealLabels = true,
  socialsClassName,
}: NavbarHeaderActionsProps): JSX.Element => (
  <div className="flex min-w-min items-center gap-1 overflow-visible sm:gap-1.5">
    <AccessibilityPopover
      open={desktopAccessibilityOpen}
      onOpenChange={onDesktopAccessibilityOpenChange}
      revealLabel={revealLabels ? "Accesibilidad" : undefined}
    />
    <NavbarSocialLinks
      className={socialsClassName}
      revealLabels={revealLabels}
    />
  </div>
);
