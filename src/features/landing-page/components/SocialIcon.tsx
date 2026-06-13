import type { SocialIconName } from "../types/social";

type SocialIconProps = {
  name: SocialIconName;
};

const STROKE = {
  width: 1.85,
  linecap: "round" as const,
  linejoin: "round" as const,
};

const ICONS: Record<SocialIconName, JSX.Element> = {
  instagram: (
    <>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeWidth={STROKE.width}
        strokeLinecap={STROKE.linecap}
        strokeLinejoin={STROKE.linejoin}
      />
      <circle
        cx="12"
        cy="12"
        r="4.25"
        fill="none"
        stroke="currentColor"
        strokeWidth={STROKE.width}
      />
      <circle cx="17.15" cy="6.85" r="1.15" fill="currentColor" />
    </>
  ),
  youtube: (
    <>
      <path
        d="M21.2 8.1a2.4 2.4 0 0 0-1.7-1.68C17.4 6.1 12 6.1 12 6.1s-5.4 0-7.5.32A2.4 2.4 0 0 0 2.8 8.1 24.5 24.5 0 0 0 2.5 12a24.5 24.5 0 0 0 .3 3.9 2.4 2.4 0 0 0 1.7 1.68c2.1.32 7.5.32 7.5.32s5.4 0 7.5-.32a2.4 2.4 0 0 0 1.7-1.68 24.5 24.5 0 0 0 .3-3.9 24.5 24.5 0 0 0-.3-3.9z"
        fill="none"
        stroke="currentColor"
        strokeWidth={STROKE.width}
        strokeLinecap={STROKE.linecap}
        strokeLinejoin={STROKE.linejoin}
      />
      <path d="M10.25 15.35V8.65L15.75 12l-5.5 3.35z" fill="currentColor" />
    </>
  ),
  x: (
    <path
      fill="currentColor"
      d="M13.42 10.24 19.28 4h-1.38l-5.1 5.43L8.55 4H4.5l6.12 7.96L4.5 20h1.38l5.4-5.74 4.32 5.74h4.05l-6.23-8.26zm-1.14 1.22 5.52 7.34h-1.52l-5.52-7.34h1.52z"
    />
  ),
};

export const SocialIcon = ({ name }: SocialIconProps): JSX.Element => (
  <svg
    className="block h-5 w-5 shrink-0"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    {ICONS[name]}
  </svg>
);
