import {
  ACCESSIBILITY_STORAGE_KEY,
  DEFAULT_ACCESSIBILITY_SETTINGS,
} from "../settings";
import type { AccessibilitySettings } from "../types";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

export const loadAccessibilitySettings = (): AccessibilitySettings => {
  if (typeof window === "undefined") {
    return DEFAULT_ACCESSIBILITY_SETTINGS;
  }

  try {
    const raw = window.localStorage.getItem(ACCESSIBILITY_STORAGE_KEY);
    if (!raw) {
      return DEFAULT_ACCESSIBILITY_SETTINGS;
    }

    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) {
      return DEFAULT_ACCESSIBILITY_SETTINGS;
    }

    return {
      ...DEFAULT_ACCESSIBILITY_SETTINGS,
      ...parsed,
    } as AccessibilitySettings;
  } catch {
    return DEFAULT_ACCESSIBILITY_SETTINGS;
  }
};

export const saveAccessibilitySettings = (
  settings: AccessibilitySettings,
): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    ACCESSIBILITY_STORAGE_KEY,
    JSON.stringify(settings),
  );
};
