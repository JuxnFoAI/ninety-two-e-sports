export const SITE_NAME = "Ninety Two E-Sports";

/** Browser tab title. The home page is the brand; every other route names its section. */
export const formatPageTitle = (section?: string): string =>
  section ? `${section} — ${SITE_NAME}` : SITE_NAME;
