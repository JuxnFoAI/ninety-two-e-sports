export type AccessibilityViewport = "mobile" | "desktop";

export type ColorBlindMode =
  | "off"
  | "protanopia"
  | "deuteranopia"
  | "tritanopia";

export interface AccessibilitySettings {
  /** Visual — larger base typography across the site. */
  increaseTextSize: boolean;
  /** Color vision — simulated correction filter for color-blind users. */
  colorBlindMode: ColorBlindMode;
  /** Color vision — high-contrast palette and stronger borders. */
  enhancedContrast: boolean;
  /** Hearing — pauses decorative background media. */
  muteBackgroundMedia: boolean;
  /** Hearing — enables YouTube captions and shows guidance near embeds. */
  emphasizeCaptions: boolean;
  /** Motor — minimum 44×44 px interactive targets. */
  largeTargets: boolean;
  /** Motor — highly visible keyboard focus rings. */
  enhancedFocus: boolean;
  /** Cognitive — disables non-essential motion beyond system preference. */
  reduceMotion: boolean;
  /** Cognitive — simplified layout, fewer decorative layers. */
  readingMode: boolean;
  /** Cognitive — dyslexia-friendly typography (Lexend). */
  dyslexiaFriendlyFont: boolean;
  /** Cognitive — underlines inline links for quicker scanning. */
  underlineLinks: boolean;
}

export type AccessibilityBooleanKey = {
  [Key in keyof AccessibilitySettings]: AccessibilitySettings[Key] extends boolean
    ? Key
    : never;
}[keyof AccessibilitySettings];

interface AccessibilitySection {
  id: string;
  title: string;
  description: string;
}

export interface AccessibilityBooleanOption {
  kind: "boolean";
  key: AccessibilityBooleanKey;
  label: string;
  description: string;
  /** Viewports where this option must not be shown. */
  hideOn?: readonly AccessibilityViewport[];
}

export interface AccessibilitySelectOption {
  kind: "select";
  key: "colorBlindMode";
  label: string;
  description: string;
  choices: ReadonlyArray<{ value: ColorBlindMode; label: string }>;
  hideOn?: readonly AccessibilityViewport[];
}

export type AccessibilityOption =
  | AccessibilityBooleanOption
  | AccessibilitySelectOption;

export interface AccessibilitySectionConfig extends AccessibilitySection {
  options: readonly AccessibilityOption[];
}
