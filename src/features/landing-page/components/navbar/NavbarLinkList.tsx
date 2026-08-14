import { Link } from "react-router-dom";

import { useEffectiveReducedMotion } from "@/features/accessibility";

import { NAV_LINKS } from "../../constants";

import styles from "./NavbarLinkList.module.css";

type NavbarLinkListProps = {
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
};

const MOBILE_LINK_CLASS =
  "block rounded-lg px-2 py-3 text-[0.78rem] font-medium uppercase tracking-[0.14em] text-white/75 no-underline transition-colors duration-200 hover:bg-white/5 hover:text-white focus-visible:bg-white/5 focus-visible:text-white";

const DesktopNavLink = ({
  href,
  label,
  reducedMotion,
  onNavigate,
}: {
  href: string;
  label: string;
  reducedMotion: boolean;
  onNavigate?: () => void;
}): JSX.Element => (
  <Link
    className={`${styles.link} ${reducedMotion ? styles.reduced : ""}`.trim()}
    to={href}
    onClick={onNavigate}
  >
    <span className={styles.clip}>
      <span className={styles.stack}>
        <span className={styles.line}>{label}</span>
        <span className={`${styles.line} ${styles.lineAccent}`} aria-hidden>
          {label}
        </span>
      </span>
    </span>
    <span className={styles.underline} aria-hidden />
  </Link>
);

export const NavbarLinkList = ({
  variant,
  onNavigate,
}: NavbarLinkListProps): JSX.Element => {
  const prefersReducedMotion = useEffectiveReducedMotion();

  if (variant === "desktop") {
    return (
      <ul className={styles.list}>
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <DesktopNavLink
              href={href}
              label={label}
              reducedMotion={prefersReducedMotion}
              onNavigate={onNavigate}
            />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="m-0 flex list-none flex-col gap-1 p-0 pb-3 pt-3">
      {NAV_LINKS.map(({ href, label }) => (
        <li key={href}>
          <Link className={MOBILE_LINK_CLASS} to={href} onClick={onNavigate}>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

type NavbarDesktopNavProps = {
  className?: string;
};

export const NavbarDesktopNav = ({
  className = "",
}: NavbarDesktopNavProps): JSX.Element => (
  <nav className={className} aria-label="Principal">
    <NavbarLinkList variant="desktop" />
  </nav>
);
