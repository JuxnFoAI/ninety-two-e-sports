import { DEFAULT_ACCESSIBILITY_SETTINGS } from "../settings";
import type { AccessibilitySettings, ColorBlindMode } from "../types";

const ACCESSIBILITY_STORAGE_KEY = "n2-a11y-settings";

const COLOR_BLIND_MODES: ReadonlySet<ColorBlindMode> = new Set([
  "off",
  "protanopia",
  "deuteranopia",
  "tritanopia",
]);

const BOOLEAN_SETTING_KEYS = (
  Object.keys(DEFAULT_ACCESSIBILITY_SETTINGS) as Array<
    keyof AccessibilitySettings
  >
).filter((key) => key !== "colorBlindMode");

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isColorBlindMode = (value: unknown): value is ColorBlindMode =>
  typeof value === "string" && COLOR_BLIND_MODES.has(value as ColorBlindMode);

/** Keeps only known keys and valid values; anything else falls back to defaults. */
export const parseAccessibilitySettings = (
  value: unknown,
): AccessibilitySettings => {
  if (!isRecord(value)) {
    return { ...DEFAULT_ACCESSIBILITY_SETTINGS };
  }

  const next: AccessibilitySettings = { ...DEFAULT_ACCESSIBILITY_SETTINGS };

  for (const key of BOOLEAN_SETTING_KEYS) {
    if (typeof value[key] === "boolean") {
      next[key] = value[key];
    }
  }

  if (isColorBlindMode(value.colorBlindMode)) {
    next.colorBlindMode = value.colorBlindMode;
  }

  return next;
};

export const loadAccessibilitySettings = (): AccessibilitySettings => {
  if (typeof window === "undefined") {
    return { ...DEFAULT_ACCESSIBILITY_SETTINGS };
  }

  try {
    const raw = window.localStorage.getItem(ACCESSIBILITY_STORAGE_KEY);
    if (!raw) {
      return { ...DEFAULT_ACCESSIBILITY_SETTINGS };
    }

    return parseAccessibilitySettings(JSON.parse(raw));
  } catch {
    return { ...DEFAULT_ACCESSIBILITY_SETTINGS };
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
