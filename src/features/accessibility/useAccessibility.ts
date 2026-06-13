import { useAccessibilityContext } from "./accessibilityContext";

export const useAccessibility = (): ReturnType<
  typeof useAccessibilityContext
> => useAccessibilityContext();
