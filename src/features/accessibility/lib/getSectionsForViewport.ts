import { ACCESSIBILITY_SECTIONS } from "../settings";
import type {
  AccessibilitySectionConfig,
  AccessibilityViewport,
} from "../types";

const isOptionVisible = (
  hideOn: AccessibilitySectionConfig["options"][number]["hideOn"],
  viewport: AccessibilityViewport,
): boolean => !hideOn?.includes(viewport);

/** Returns accessibility sections with options filtered for the given viewport. */
export const getAccessibilitySectionsForViewport = (
  viewport: AccessibilityViewport,
): AccessibilitySectionConfig[] =>
  ACCESSIBILITY_SECTIONS.map((section) => ({
    ...section,
    options: section.options.filter((option) =>
      isOptionVisible(option.hideOn, viewport),
    ),
  })).filter((section) => section.options.length > 0);
