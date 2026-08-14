import { useRef } from "react";

import { useEffectiveReducedMotion } from "@/features/accessibility";
import type { AnimatedIconHandle } from "@/shared/icons";

import { SOCIAL_LINKS } from "../../constants";
import type { SocialIconName } from "../../types/social";
import { InstagramIcon } from "../icons/InstagramIcon";
import { TwitterXIcon } from "../icons/TwitterXIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";

import styles from "./NavbarSocialLinks.module.css";

type NavbarSocialLinksProps = {
  className?: string;
  revealLabels?: boolean;
};

const LINK_TONE: Record<SocialIconName, string> = {
  instagram: styles.linkInstagram,
  youtube: styles.linkYoutube,
  x: styles.linkX,
};

type SocialLinkProps = {
  href: string;
  label: string;
  icon: SocialIconName;
  revealLabels: boolean;
};

const SocialLink = ({
  href,
  label,
  icon,
  revealLabels,
}: SocialLinkProps): JSX.Element => {
  const prefersReducedMotion = useEffectiveReducedMotion();
  const animatedRef = useRef<AnimatedIconHandle>(null);

  const startIcon = (): void => {
    if (prefersReducedMotion) {
      return;
    }
    animatedRef.current?.startAnimation();
  };

  const stopIcon = (): void => {
    animatedRef.current?.stopAnimation();
  };

  return (
    <a
      className={`${styles.link} ${LINK_TONE[icon]}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={startIcon}
      onMouseLeave={stopIcon}
      onFocus={startIcon}
      onBlur={stopIcon}
    >
      <span className={styles.icon}>
        {icon === "instagram" ? (
          <InstagramIcon ref={animatedRef} animateOnHover={false} />
        ) : icon === "youtube" ? (
          <YoutubeIcon ref={animatedRef} animateOnHover={false} />
        ) : (
          <TwitterXIcon ref={animatedRef} animateOnHover={false} />
        )}
      </span>
      {revealLabels ? (
        <span className={styles.labelClip} aria-hidden="true">
          <span className={styles.labelInner}>
            <span className={styles.label}>{label}</span>
          </span>
        </span>
      ) : null}
    </a>
  );
};

export const NavbarSocialLinks = ({
  className = "",
  revealLabels = true,
}: NavbarSocialLinksProps): JSX.Element => (
  <ul
    className={`${styles.list} ${className}`.trim()}
    aria-label="Redes sociales"
  >
    {SOCIAL_LINKS.map(({ href, label, icon }) => (
      <li key={icon}>
        <SocialLink
          href={href}
          label={label}
          icon={icon}
          revealLabels={revealLabels}
        />
      </li>
    ))}
  </ul>
);
