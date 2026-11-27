import { Menu, X } from "lucide";
import { MorphIcon } from "morphicons/react";

import { useEffectiveReducedMotion } from "@/features/accessibility";

import styles from "./NavbarMenuToggle.module.css";

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
      className={styles.root}
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
