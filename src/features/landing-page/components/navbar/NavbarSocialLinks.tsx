import { SOCIAL_LINKS, SOCIAL_LINK_STYLES } from "../../constants";
import { SocialIcon } from "../SocialIcon";

export const NavbarSocialLinks = (): JSX.Element => (
  <ul
    className="m-0 flex list-none items-center gap-2 p-0 sm:gap-3"
    aria-label="Redes sociales"
  >
    {SOCIAL_LINKS.map(({ href, label, icon }) => (
      <li key={icon}>
        <a
          className={`group relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/[0.07] transition-all duration-200 hover:scale-[1.06] focus-visible:scale-[1.06] motion-reduce:hover:scale-100 motion-reduce:focus-visible:scale-100 sm:h-9 sm:w-9 ${SOCIAL_LINK_STYLES[icon]}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
        >
          <SocialIcon name={icon} />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[calc(100%+0.55rem)] z-30 hidden -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-full border border-white/15 bg-black/75 px-3 py-1.5 text-[0.58rem] font-medium uppercase tracking-[0.2em] text-white/90 opacity-0 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md transition-[opacity,transform] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none desktop-ui:block"
          >
            {label}
          </span>
        </a>
      </li>
    ))}
  </ul>
);
