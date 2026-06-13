import type { SocialIconName } from "./types/social";

export const NAV_LINKS = [
  { href: "#quienes-somos", label: "Quiénes somos" },
  { href: "#equipos", label: "Equipos" },
  { href: "#noticias", label: "Noticias" },
  { href: "#torneos", label: "Torneos" },
  { href: "#patrocinadores", label: "Patrocinadores" },
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

export const SOCIAL_LINK_STYLES: Record<SocialIconName, string> = {
  instagram:
    "text-white/90 hover:border-[#E4405F]/45 hover:bg-[#E4405F]/12 hover:text-[#F77777] focus-visible:border-[#E4405F]/45 focus-visible:bg-[#E4405F]/12 focus-visible:text-[#F77777]",
  youtube:
    "text-white/90 hover:border-[#FF0033]/45 hover:bg-[#FF0033]/12 hover:text-[#FF4D6D] focus-visible:border-[#FF0033]/45 focus-visible:bg-[#FF0033]/12 focus-visible:text-[#FF4D6D]",
  x: "text-white/90 hover:border-white/45 hover:bg-white/12 hover:text-white focus-visible:border-white/45 focus-visible:bg-white/12 focus-visible:text-white",
};
