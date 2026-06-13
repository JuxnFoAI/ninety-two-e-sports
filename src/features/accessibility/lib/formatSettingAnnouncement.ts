import { ACCESSIBILITY_SETTING_LABELS } from "../settings";
import type { AccessibilitySettings } from "../types";

export const formatSettingAnnouncement = (
  key: keyof AccessibilitySettings,
  value: AccessibilitySettings[keyof AccessibilitySettings],
): string => {
  const label = ACCESSIBILITY_SETTING_LABELS[key];

  if (typeof value === "boolean") {
    return `${label} ${value ? "activado" : "desactivado"}`;
  }

  if (key === "colorBlindMode") {
    if (value === "off") {
      return `${label}: sin filtro`;
    }

    return `${label} actualizado`;
  }

  return `${label} actualizado`;
};
