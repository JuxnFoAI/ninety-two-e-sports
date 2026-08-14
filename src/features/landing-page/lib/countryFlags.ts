/**
 * Country display labels (as stored on pilots) → ISO 3166-1 alpha-2 for flag assets.
 */
const COUNTRY_FLAG_CODES: Record<string, string> = {
  ESPAÑA: "es",
  ITALIA: "it",
  ALEMANIA: "de",
  HOLANDA: "nl",
  COLOMBIA: "co",
  ARGENTINA: "ar",
  GUATEMALA: "gt",
  BRASIL: "br",
  MÉXICO: "mx",
  "COSTA RICA": "cr",
  VENEZUELA: "ve",
};

/** ISO code for a pilot country label, or `null` when unknown. */
export const getCountryFlagCode = (country: string): string | null =>
  COUNTRY_FLAG_CODES[country] ?? null;
