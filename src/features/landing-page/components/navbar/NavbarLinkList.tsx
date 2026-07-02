import { NAV_LINKS } from "../../constants";

type NavbarLinkListProps = {
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
};

const LINK_CLASS: Record<NavbarLinkListProps["variant"], string> = {
  desktop:
    "text-[0.72rem] font-medium uppercase tracking-[0.14em] text-white/70 no-underline transition-colors duration-200 hover:text-white focus-visible:text-white",
  mobile:
    "block rounded-lg px-2 py-3 text-[0.78rem] font-medium uppercase tracking-[0.14em] text-white/75 no-underline transition-colors duration-200 hover:bg-white/5 hover:text-white focus-visible:bg-white/5 focus-visible:text-white",
};

export const NavbarLinkList = ({
  variant,
  onNavigate,
}: NavbarLinkListProps): JSX.Element => (
  <ul
    className={
      variant === "desktop"
        ? "m-0 flex list-none items-center gap-x-6 p-0 xl:gap-x-8"
        : "m-0 flex list-none flex-col gap-1 p-0 pb-3 pt-3"
    }
  >
    {NAV_LINKS.map(({ href, label }) => (
      <li key={href}>
        <a className={LINK_CLASS[variant]} href={href} onClick={onNavigate}>
          {label}
        </a>
      </li>
    ))}
  </ul>
);

export const NavbarDesktopNav = (): JSX.Element => (
  <nav
    className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 desktop-ui:block"
    data-desktop-only="true"
    aria-label="Principal"
  >
    <NavbarLinkList variant="desktop" />
  </nav>
);
