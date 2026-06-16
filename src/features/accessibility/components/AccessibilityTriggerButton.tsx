import { useAccessibility } from "../accessibilityContext";
import { AccessibilityIcon } from "./AccessibilityIcon";

const TRIGGER_CLASS =
  "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/[0.07] text-white transition-all duration-200 hover:scale-[1.06] hover:border-white/35 hover:bg-white/10 focus-visible:scale-[1.06] focus-visible:border-white/35 focus-visible:bg-white/10 motion-reduce:hover:scale-100 motion-reduce:focus-visible:scale-100 sm:h-9 sm:w-9";

interface AccessibilityTriggerButtonProps {
  className?: string;
  expanded?: boolean;
  controls?: string;
  onClick: () => void;
}

export const AccessibilityTriggerButton = ({
  className = "",
  expanded,
  controls,
  onClick,
}: AccessibilityTriggerButtonProps): JSX.Element => {
  const { panelLabel } = useAccessibility();

  return (
    <button
      type="button"
      className={`${TRIGGER_CLASS} ${className}`.trim()}
      aria-expanded={expanded}
      aria-controls={controls}
      aria-haspopup="dialog"
      aria-label={panelLabel}
      onClick={onClick}
    >
      <AccessibilityIcon />
    </button>
  );
};
