import { createContext, useContext } from "react";

import type {
  AccessibilityBooleanKey,
  AccessibilitySettings,
  ColorBlindMode,
} from "./types";

interface AccessibilityContextValue {
  settings: AccessibilitySettings;
  panelLabel: string;
  setBoolean: (key: AccessibilityBooleanKey, value: boolean) => void;
  setColorBlindMode: (value: ColorBlindMode) => void;
  resetSettings: () => void;
}

export const AccessibilityContext =
  createContext<AccessibilityContextValue | null>(null);

export const useAccessibility = (): AccessibilityContextValue => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      "useAccessibility must be used within AccessibilityProvider",
    );
  }

  return context;
};
