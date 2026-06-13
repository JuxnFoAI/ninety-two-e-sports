import type { SponsorWebsiteLink } from "../../types/sponsor";

const LINK_CLASS =
  "text-[0.78rem] font-medium tracking-wide text-section-title underline-offset-[0.2em] transition-[color,text-decoration] duration-200 hover:underline focus-visible:underline sm:text-[0.82rem]";

const DIVIDER_CLASS = "h-3.5 w-px shrink-0 bg-white/25";

interface SponsorDetailLinksProps {
  links: readonly SponsorWebsiteLink[];
}

export const SponsorDetailLinks = ({
  links,
}: SponsorDetailLinksProps): JSX.Element => {
  return (
    <nav
      className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 pt-1"
      aria-label="Enlaces del patrocinador"
    >
      {links.map((link, index) => (
        <span key={link.href} className="inline-flex items-center gap-3">
          {index > 0 ? <span className={DIVIDER_CLASS} aria-hidden /> : null}
          <a
            className={LINK_CLASS}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
          </a>
        </span>
      ))}
    </nav>
  );
};
