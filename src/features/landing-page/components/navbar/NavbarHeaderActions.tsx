import { AccessibilityPopover } from "@/features/accessibility";

import { NavbarSocialLinks } from "./NavbarSocialLinks";

type NavbarHeaderActionsProps = {
  desktopAccessibilityOpen: boolean;
  onDesktopAccessibilityOpenChange: (open: boolean) => void;
};

export const NavbarHeaderActions = ({
  desktopAccessibilityOpen,
  onDesktopAccessibilityOpenChange,
}: NavbarHeaderActionsProps): JSX.Element => (
  <div className="pointer-events-none absolute inset-x-0 flex items-center justify-center gap-2 desktop-ui:pointer-events-auto desktop-ui:static desktop-ui:inset-auto">
    <AccessibilityPopover
      open={desktopAccessibilityOpen}
      onOpenChange={onDesktopAccessibilityOpenChange}
    />
    <NavbarSocialLinks />
  </div>
);
