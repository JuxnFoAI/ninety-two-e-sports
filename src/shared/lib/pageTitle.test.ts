import { describe, expect, it } from "vitest";

import { formatPageTitle, SITE_NAME } from "./pageTitle";

describe("formatPageTitle", () => {
  it("uses the brand alone on the home page", () => {
    expect(formatPageTitle()).toBe(SITE_NAME);
  });

  it("prefixes a section with the brand", () => {
    expect(formatPageTitle("Equipos")).toBe(`Equipos — ${SITE_NAME}`);
  });
});
