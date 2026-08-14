import type { Sponsor } from "../../types/sponsor";

interface SponsorCardProps {
  sponsor: Sponsor;
}

const CARD_CLASS =
  "group relative flex h-full flex-col overflow-hidden border border-white/12 bg-gradient-to-b from-white/[0.07] to-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-[border-color,box-shadow,transform] duration-300 hover:border-white/28 hover:shadow-[0_0_48px_rgba(255,255,255,0.07)] motion-safe:hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 focus-visible:border-white/28 focus-visible:shadow-[0_0_48px_rgba(255,255,255,0.07)] focus-visible:outline-none";

const LOGO_AREA_CLASS =
  "relative flex min-h-[clamp(10.5rem,28vw,16rem)] flex-1 items-center justify-center px-[clamp(1.25rem,4vw,2.25rem)] py-[clamp(1.5rem,5vw,2.5rem)]";

const NAME_TOOLTIP_CLASS =
  "pointer-events-none absolute inset-x-3 bottom-4 z-10 mx-auto w-max max-w-[calc(100%-1.5rem)] truncate rounded-md border border-white/14 bg-black/72 px-3.5 py-2 text-center text-[0.68rem] font-medium uppercase tracking-[0.18em] text-white/92 opacity-0 shadow-[0_10px_28px_rgba(0,0,0,0.28)] backdrop-blur-md transition-[opacity,transform] duration-300 ease-out motion-safe:translate-y-1.5 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-opacity";

export const SponsorCard = ({ sponsor }: SponsorCardProps): JSX.Element => {
  const { name, logo, href } = sponsor;

  return (
    <a
      className={CARD_CLASS}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} (abre en una pestaña nueva)`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        aria-hidden
      >
        <div className="absolute -left-1/4 top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <div className={LOGO_AREA_CLASS}>
        <img
          src={logo}
          alt=""
          className="max-h-[clamp(5.5rem,18vw,9.5rem)] w-full max-w-full object-contain object-center transition-transform duration-300 motion-safe:group-hover:scale-[1.04] motion-safe:group-focus-visible:scale-[1.04] motion-reduce:group-hover:scale-100 motion-reduce:group-focus-visible:scale-100"
          loading="lazy"
          decoding="async"
        />
      </div>

      <span className={NAME_TOOLTIP_CLASS} aria-hidden>
        {name}
      </span>
    </a>
  );
};
