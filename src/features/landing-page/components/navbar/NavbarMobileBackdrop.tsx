import { useEffect, useState } from "react";

import { useEffectiveReducedMotion } from "@/features/accessibility";

type NavbarMobileBackdropProps = {
  open: boolean;
  onClose: () => void;
};

/** Dims and blurs page content behind the mobile navigation drawer. */
export const NavbarMobileBackdrop = ({
  open,
  onClose,
}: NavbarMobileBackdropProps): JSX.Element | null => {
  const prefersReducedMotion = useEffectiveReducedMotion();
  const [present, setPresent] = useState(open);
  const [visible, setVisible] = useState(false);
  const transitionClass = prefersReducedMotion
    ? ""
    : "transition-opacity duration-300 ease-out";

  useEffect(() => {
    if (open) {
      setPresent(true);
      if (prefersReducedMotion) {
        setVisible(true);
        return undefined;
      }

      const frame = window.requestAnimationFrame(() => setVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }

    setVisible(false);
    if (prefersReducedMotion) {
      setPresent(false);
      return undefined;
    }

    const timeout = window.setTimeout(() => setPresent(false), 300);
    return () => window.clearTimeout(timeout);
  }, [open, prefersReducedMotion]);

  if (!present) {
    return null;
  }

  return (
    <button
      type="button"
      tabIndex={open ? 0 : -1}
      aria-hidden={!open}
      aria-label="Cerrar menú"
      className={`fixed inset-0 z-0 bg-black/55 lg:hidden motion-reduce:backdrop-blur-none ${transitionClass} ${
        prefersReducedMotion ? "" : "backdrop-blur-md"
      } ${visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      onClick={onClose}
    />
  );
};
