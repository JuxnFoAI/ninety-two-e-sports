import type { MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import n2Logo from "@assets/marca/ninety-two.png";

import { useEffectiveReducedMotion } from "@/features/accessibility";
import { scrollToPageTop } from "@/shared/lib/scrollToPageTop";

import styles from "./NavbarBrand.module.css";

type NavbarBrandProps = {
  onNavigate?: () => void;
};

export const NavbarBrand = ({ onNavigate }: NavbarBrandProps): JSX.Element => {
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();
  const prefersReducedMotion = useEffectiveReducedMotion();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>): void => {
    onNavigate?.();

    // Already on home: Link alone won’t remount or scroll — force top.
    if (pathname === "/") {
      event.preventDefault();

      if (hash) {
        navigate("/", { replace: true });
      }

      scrollToPageTop(prefersReducedMotion);
    }
  };

  return (
    <Link
      className={styles.root}
      to="/"
      aria-label="Ninety Two E-Sports, inicio"
      onClick={handleClick}
      style={{ ["--logo-mask" as string]: `url(${n2Logo})` }}
    >
      <span className={styles.logo} aria-hidden="true" />
      <span className={styles.labelClip} aria-hidden="true">
        <span className={styles.labelInner}>
          <span className={styles.label}>Ninety Two</span>
        </span>
      </span>
    </Link>
  );
};
