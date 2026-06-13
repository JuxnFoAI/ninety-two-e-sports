export interface SponsorWebsiteLink {
  label: string;
  href: string;
}

export interface SponsorDetail {
  paragraphs: readonly string[];
  links: readonly SponsorWebsiteLink[];
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  detail?: SponsorDetail;
}
