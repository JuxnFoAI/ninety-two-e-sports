import { useAccessibility } from "../accessibilityContext";

const RESET_BUTTON_CLASS =
  "rounded-lg border border-white bg-white px-3 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.12em] text-black transition-colors hover:bg-white/90 focus-visible:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

interface AccessibilityResetButtonProps {
  className?: string;
  fullWidth?: boolean;
}

export const AccessibilityResetButton = ({
  className = "",
  fullWidth = false,
}: AccessibilityResetButtonProps): JSX.Element => {
  const { resetSettings } = useAccessibility();

  return (
    <button
      type="button"
      className={`${RESET_BUTTON_CLASS} ${fullWidth ? "w-full text-center" : "self-start"} ${className}`.trim()}
      onClick={resetSettings}
    >
      Restablecer ajustes
    </button>
  );
};
