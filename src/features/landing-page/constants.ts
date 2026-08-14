import type { SocialIconName } from "./types/social";

export const NAV_LINKS = [
  { href: "/#quienes-somos", label: "Quiénes somos" },
  { href: "/equipos", label: "Equipos" },
  { href: "/noticias", label: "Noticias" },
  { href: "/torneos", label: "Torneos" },
] as const;

export const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/ninetytwoesports/",
    label: "Instagram",
    icon: "instagram",
  },
  {
    href: "https://www.youtube.com/@MSoler",
    label: "YouTube",
    icon: "youtube",
  },
  {
    href: "https://x.com/N2_eSports",
    label: "X",
    icon: "x",
  },
] as const satisfies ReadonlyArray<{
  href: string;
  label: string;
  icon: SocialIconName;
}>;
