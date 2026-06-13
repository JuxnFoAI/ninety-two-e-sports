import type { CSSProperties } from "react";

import { usePrefersReducedMotion } from "@/shared/hooks";

import styles from "./HeroCtaButton.module.css";

const CTA_DURATION_MS = 450;

interface HeroCtaButtonProps {
  href: string;
  children?: string;
}

/** Hero CTA with a top-to-bottom curtain fill on hover and focus. */
export const HeroCtaButton = ({
  href,
  children = "Conoce al equipo",
}: HeroCtaButtonProps): JSX.Element => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <a
      className={styles.link}
      href={href}
      style={{ "--hero-cta-duration": `${CTA_DURATION_MS}ms` } as CSSProperties}
    >
      <span
        aria-hidden
        className={`${styles.curtain} ${prefersReducedMotion ? styles.curtainInstant : ""}`}
      />
      <span
        className={`${styles.label} ${prefersReducedMotion ? styles.labelInstant : ""}`}
      >
        {children}
      </span>
    </a>
  );
};
