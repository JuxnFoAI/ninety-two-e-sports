import { useId } from "react";

import { AccessibilityPanelContent } from "./AccessibilityPanelContent";
import { AccessibilityResetButton } from "./AccessibilityResetButton";
import { AccessibilityTriggerButton } from "./AccessibilityTriggerButton";

interface MobileAccessibilityPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MobileAccessibilityPanel = ({
  open,
  onOpenChange,
}: MobileAccessibilityPanelProps): JSX.Element => {
  const panelId = useId();

  return (
    <div className="border-t border-white/10 pt-3 lg:hidden">
      <div className="flex items-center justify-between gap-3 px-2 pb-2">
        <p className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-white/75">
          Accesibilidad
        </p>
        <AccessibilityTriggerButton
          expanded={open}
          controls={open ? panelId : undefined}
          onClick={() => onOpenChange(!open)}
        />
      </div>

      <div
        id={panelId}
        role="region"
        aria-label="Opciones de accesibilidad"
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          open
            ? "grid-rows-[1fr] opacity-100"
            : "pointer-events-none grid-rows-[0fr] opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="flex max-h-[min(52vh,22rem)] flex-col">
            <div
              className="a11y-panel min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 pt-1"
              data-scroll-lock-scrollable=""
            >
              <AccessibilityPanelContent
                viewport="mobile"
                showResetButton={false}
              />
            </div>

            <div className="shrink-0 border-t border-white/15 bg-black/85 px-2 py-3">
              <AccessibilityResetButton fullWidth />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
