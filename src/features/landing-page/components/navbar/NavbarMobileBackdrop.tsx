import { usePrefersReducedMotion } from "@/shared/hooks";

type NavbarMobileBackdropProps = {
  open: boolean;
  onClose: () => void;
};

/** Dims and blurs page content behind the mobile navigation drawer. */
export const NavbarMobileBackdrop = ({
  open,
  onClose,
}: NavbarMobileBackdropProps): JSX.Element => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const transitionClass = prefersReducedMotion
    ? ""
    : "transition-opacity duration-300 ease-out";

  return (
    <button
      type="button"
      tabIndex={open ? 0 : -1}
      aria-hidden={!open}
      aria-label="Cerrar menú"
      className={`fixed inset-0 z-0 bg-black/55 desktop-ui:hidden motion-reduce:backdrop-blur-none ${transitionClass} ${
        prefersReducedMotion ? "" : "backdrop-blur-md"
      } ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      onClick={onClose}
    />
  );
};
