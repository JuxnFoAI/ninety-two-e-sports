import { describe, expect, it } from "vitest";

import { DEFAULT_ACCESSIBILITY_SETTINGS } from "../settings";
import { parseAccessibilitySettings } from "./storage";

describe("parseAccessibilitySettings", () => {
  it("returns defaults for non-objects", () => {
    expect(parseAccessibilitySettings(null)).toEqual(
      DEFAULT_ACCESSIBILITY_SETTINGS,
    );
    expect(parseAccessibilitySettings("nope")).toEqual(
      DEFAULT_ACCESSIBILITY_SETTINGS,
    );
  });

  it("keeps valid stored flags and color modes", () => {
    expect(
      parseAccessibilitySettings({
        reduceMotion: true,
        colorBlindMode: "protanopia",
      }),
    ).toEqual({
      ...DEFAULT_ACCESSIBILITY_SETTINGS,
      reduceMotion: true,
      colorBlindMode: "protanopia",
    });
  });

  it("ignores unknown keys and invalid values", () => {
    expect(
      parseAccessibilitySettings({
        reduceMotion: "yes",
        colorBlindMode: "infrared",
        extra: true,
      }),
    ).toEqual(DEFAULT_ACCESSIBILITY_SETTINGS);
  });
});
