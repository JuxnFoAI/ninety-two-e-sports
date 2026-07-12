import type { CSSProperties, MouseEventHandler } from "react";

import { usePrefersReducedMotion } from "@/shared/hooks";

import styles from "./HeroCtaButton.module.css";

const CTA_DURATION_MS = 450;

interface HeroCtaButtonBaseProps {
  children?: string;
}

interface HeroCtaLinkProps extends HeroCtaButtonBaseProps {
  href: string;
  onClick?: never;
}

interface HeroCtaActionProps extends HeroCtaButtonBaseProps {
  href?: never;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

type HeroCtaButtonProps = HeroCtaLinkProps | HeroCtaActionProps;

/** Hero CTA with a top-to-bottom curtain fill on hover and focus. */
export const HeroCtaButton = ({
  href,
  onClick,
  children = "Conoce al equipo",
}: HeroCtaButtonProps): JSX.Element => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const curtainClass = `${styles.curtain} ${prefersReducedMotion ? styles.curtainInstant : ""}`;
  const labelClass = `${styles.label} ${prefersReducedMotion ? styles.labelInstant : ""}`;
  const style = {
    "--hero-cta-duration": `${CTA_DURATION_MS}ms`,
  } as CSSProperties;

  const content = (
    <>
      <span aria-hidden className={curtainClass} />
      <span className={labelClass}>{children}</span>
    </>
  );

  if (href) {
    return (
      <a className={styles.link} href={href} style={style}>
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={styles.link}
      style={style}
      onClick={onClick}
    >
      {content}
    </button>
  );
};
