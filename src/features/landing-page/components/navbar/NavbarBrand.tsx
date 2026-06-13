import n2Logo from "@assets/marca/ninety-two.png";

type NavbarBrandProps = {
  onNavigate?: () => void;
};

export const NavbarBrand = ({ onNavigate }: NavbarBrandProps): JSX.Element => (
  <a
    className="relative z-10 inline-flex min-w-0 shrink items-center gap-2 text-white no-underline sm:gap-2.5"
    href="#inicio"
    aria-label="Ninety Two E-Sports, inicio"
    onClick={onNavigate}
  >
    <img
      className="block h-8 w-8 shrink-0 opacity-95 sm:h-9 sm:w-9"
      src={n2Logo}
      alt=""
      width={36}
      height={36}
      draggable={false}
    />
    <span className="hidden truncate text-[0.72rem] font-medium uppercase tracking-[0.18em] lg:inline sm:text-[0.8rem] sm:tracking-[0.2em]">
      Ninety Two
    </span>
  </a>
);
