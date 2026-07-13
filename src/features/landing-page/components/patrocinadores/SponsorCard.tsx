import { useState } from "react";

import type { Sponsor } from "../../types/sponsor";

import { SponsorDetailContent } from "./SponsorDetailContent";

interface SponsorCardProps {
  sponsor: Sponsor;
}

const CARD_CLASS =
  "group relative flex h-full flex-col overflow-hidden border border-white/12 bg-gradient-to-b from-white/[0.07] to-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-[border-color,box-shadow,transform] duration-300 hover:border-white/28 hover:shadow-[0_0_48px_rgba(255,255,255,0.07)] motion-safe:hover:-translate-y-0.5 motion-reduce:hover:translate-y-0";

const LOGO_AREA_CLASS =
  "relative flex min-h-[clamp(10.5rem,28vw,16rem)] flex-1 items-center justify-center px-[clamp(1.25rem,4vw,2.25rem)] py-[clamp(1.5rem,5vw,2.5rem)] transition-opacity duration-300";

const FOOTER_CLASS =
  "relative border-t border-white/10 bg-black/25 px-4 py-3.5 sm:px-5";

const TOGGLE_CLASS =
  "mt-2 w-full rounded-md border border-white/12 bg-white/[0.04] px-3 py-2 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-white/70 transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.08] hover:text-white focus-visible:border-white/25 focus-visible:bg-white/[0.08] focus-visible:text-white";

const DESKTOP_OVERLAY_CLASS =
  "pointer-events-none absolute inset-0 z-10 hidden flex-col overflow-y-auto bg-gradient-to-b from-black/94 via-black/97 to-black p-4 opacity-0 backdrop-blur-sm transition-[opacity,visibility] duration-300 invisible sm:p-5 lg:flex lg:group-hover:pointer-events-auto lg:group-hover:opacity-100 lg:group-hover:visible lg:group-focus-within:pointer-events-auto lg:group-focus-within:opacity-100 lg:group-focus-within:visible";

const MOBILE_DETAIL_CLASS =
  "border-t border-white/10 bg-black/40 px-4 py-4 sm:px-5 sm:py-5";

export const SponsorCard = ({ sponsor }: SponsorCardProps): JSX.Element => {
  const { id, name, logo, detail } = sponsor;
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

  const showLogo = !detail || !mobileDetailOpen;

  return (
    <article
      className={CARD_CLASS}
      aria-label={name}
      tabIndex={detail ? 0 : undefined}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      >
        <div className="absolute -left-1/4 top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      {showLogo ? (
        <div
          className={`${LOGO_AREA_CLASS} ${
            detail
              ? "lg:group-hover:opacity-0 lg:group-focus-within:opacity-0"
              : ""
          }`.trim()}
        >
          <img
            src={logo}
            alt=""
            className="max-h-[clamp(5.5rem,18vw,9.5rem)] w-full max-w-full object-contain object-center transition-transform duration-300 motion-safe:group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : null}

      {detail && mobileDetailOpen ? (
        <div id={`${id}-detail`} className={`${MOBILE_DETAIL_CLASS} lg:hidden`}>
          <SponsorDetailContent detail={detail} />
        </div>
      ) : null}

      {detail ? (
        <div className={DESKTOP_OVERLAY_CLASS}>
          <SponsorDetailContent detail={detail} />
        </div>
      ) : null}

      <footer className={FOOTER_CLASS}>
        <p
          id={`${id}-name`}
          className="m-0 text-center text-[0.68rem] font-medium uppercase tracking-[0.2em] text-white/72 transition-colors duration-300 group-hover:text-white"
        >
          {name}
        </p>

        {detail ? (
          <button
            type="button"
            className={`${TOGGLE_CLASS} lg:hidden`}
            aria-expanded={mobileDetailOpen}
            aria-controls={`${id}-detail`}
            onClick={() => setMobileDetailOpen((open) => !open)}
          >
            {mobileDetailOpen ? "Ocultar información" : "Ver información"}
          </button>
        ) : null}
      </footer>
    </article>
  );
};
