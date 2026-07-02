import { CloseIcon, MenuIcon } from "./NavbarIcons";

type NavbarMenuToggleProps = {
  menuOpen: boolean;
  onToggle: () => void;
};

export const NavbarMenuToggle = ({
  menuOpen,
  onToggle,
}: NavbarMenuToggleProps): JSX.Element => (
  <button
    type="button"
    className="relative z-10 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/[0.07] text-white transition-colors duration-200 hover:border-white/35 hover:bg-white/10 focus-visible:border-white/35 focus-visible:bg-white/10 desktop-ui:hidden"
    data-mobile-only="true"
    aria-expanded={menuOpen}
    aria-controls="mobile-nav"
    aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
    onClick={onToggle}
  >
    {menuOpen ? <CloseIcon /> : <MenuIcon />}
  </button>
);
