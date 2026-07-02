import type { AccessibilitySettings } from "../types";

const BOOLEAN_ATTRIBUTES: ReadonlyArray<{
  setting: keyof AccessibilitySettings;
  attribute: string;
}> = [
  { setting: "increaseTextSize", attribute: "data-a11y-text-size" },
  { setting: "enhancedContrast", attribute: "data-a11y-contrast" },
  { setting: "largeTargets", attribute: "data-a11y-large-targets" },
  { setting: "enhancedFocus", attribute: "data-a11y-focus" },
  { setting: "reduceMotion", attribute: "data-a11y-reduce-motion" },
  { setting: "readingMode", attribute: "data-a11y-reading" },
  { setting: "dyslexiaFriendlyFont", attribute: "data-a11y-dyslexia-font" },
  { setting: "underlineLinks", attribute: "data-a11y-underline-links" },
];

/** Applies accessibility settings as `data-a11y-*` attributes on `<html>`. */
export const applyAccessibilitySettings = (
  settings: AccessibilitySettings,
): void => {
  const root = document.documentElement;

  for (const { setting, attribute } of BOOLEAN_ATTRIBUTES) {
    if (settings[setting]) {
      root.setAttribute(attribute, "true");
    } else {
      root.removeAttribute(attribute);
    }
  }

  if (settings.colorBlindMode === "off") {
    root.removeAttribute("data-a11y-color-blind");
  } else {
    root.setAttribute("data-a11y-color-blind", settings.colorBlindMode);
  }
};
