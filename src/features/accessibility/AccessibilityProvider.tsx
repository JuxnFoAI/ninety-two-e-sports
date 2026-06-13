import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { AccessibilityContext } from "./accessibilityContext";
import { ColorBlindnessFilters } from "./components/ColorBlindnessFilters";
import { applyAccessibilitySettings } from "./lib/applySettings";
import { formatSettingAnnouncement } from "./lib/formatSettingAnnouncement";
import {
  loadAccessibilitySettings,
  saveAccessibilitySettings,
} from "./lib/storage";
import { DEFAULT_ACCESSIBILITY_SETTINGS } from "./settings";
import type {
  AccessibilityBooleanKey,
  AccessibilitySettings,
  ColorBlindMode,
} from "./types";

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider = ({
  children,
}: AccessibilityProviderProps): JSX.Element => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() =>
    loadAccessibilitySettings(),
  );
  const liveRegionRef = useRef<HTMLDivElement>(null);

  const announce = useCallback((message: string): void => {
    const region = liveRegionRef.current;
    if (!region) {
      return;
    }

    region.textContent = "";
    window.requestAnimationFrame(() => {
      region.textContent = message;
    });
  }, []);

  const updateSettings = useCallback(
    (
      updater: (current: AccessibilitySettings) => AccessibilitySettings,
      changedKey?: keyof AccessibilitySettings,
    ): void => {
      setSettings((current) => {
        const next = updater(current);
        saveAccessibilitySettings(next);

        if (changedKey) {
          announce(formatSettingAnnouncement(changedKey, next[changedKey]));
        }

        return next;
      });
    },
    [announce],
  );

  const setBoolean = useCallback(
    (key: AccessibilityBooleanKey, value: boolean): void => {
      updateSettings((current) => ({ ...current, [key]: value }), key);
    },
    [updateSettings],
  );

  const setColorBlindMode = useCallback(
    (value: ColorBlindMode): void => {
      updateSettings(
        (current) => ({ ...current, colorBlindMode: value }),
        "colorBlindMode",
      );
    },
    [updateSettings],
  );

  const resetSettings = useCallback((): void => {
    setSettings(DEFAULT_ACCESSIBILITY_SETTINGS);
    saveAccessibilitySettings(DEFAULT_ACCESSIBILITY_SETTINGS);
    announce("Ajustes de accesibilidad restablecidos");
  }, [announce]);

  useEffect(() => {
    applyAccessibilitySettings(settings);
  }, [settings]);

  const value = useMemo(
    () => ({
      settings,
      panelLabel: "Opciones de accesibilidad",
      setBoolean,
      setColorBlindMode,
      resetSettings,
    }),
    [resetSettings, setBoolean, setColorBlindMode, settings],
  );

  return (
    <AccessibilityContext.Provider value={value}>
      <ColorBlindnessFilters />
      <div
        ref={liveRegionRef}
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      />
      {children}
    </AccessibilityContext.Provider>
  );
};
