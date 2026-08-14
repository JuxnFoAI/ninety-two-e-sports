import { Menu, X } from "lucide";
import { MorphIcon } from "morphicons/react";

import { useEffectiveReducedMotion } from "@/features/accessibility";

type NavbarMenuToggleProps = {
  menuOpen: boolean;
  onToggle: () => void;
};

export const NavbarMenuToggle = ({
  menuOpen,
  onToggle,
}: NavbarMenuToggleProps): JSX.Element => {
  const prefersReducedMotion = useEffectiveReducedMotion();

  return (
    <button
      type="button"
      className="relative z-10 inline-flex h-8 w-8 shrink-0 items-center justify-center border-0 bg-transparent p-0 text-white/80 transition-colors duration-200 hover:text-white focus-visible:text-white sm:h-9 sm:w-9 lg:hidden"
      aria-expanded={menuOpen}
      aria-controls="mobile-nav"
      aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
      onClick={onToggle}
    >
      <MorphIcon
        icon={menuOpen ? X : Menu}
        size={20}
        strokeWidth={1.75}
        spring="snappy"
        reducedMotion={prefersReducedMotion ? "always" : "never"}
        className="block"
      />
    </button>
  );
};
