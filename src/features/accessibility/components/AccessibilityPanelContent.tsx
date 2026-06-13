import { getAccessibilitySectionsForViewport } from "../lib/getSectionsForViewport";
import type {
  AccessibilityBooleanKey,
  AccessibilityOption,
  AccessibilityViewport,
  ColorBlindMode,
} from "../types";
import { useAccessibility } from "../useAccessibility";
import { AccessibilityResetButton } from "./AccessibilityResetButton";

const OPTION_ROW_CLASS =
  "flex items-start justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3";

const OPTION_LABEL_CLASS =
  "m-0 text-[0.78rem] font-medium leading-snug text-white/92";
const OPTION_DESC_CLASS =
  "m-0 mt-1 text-[0.68rem] leading-relaxed text-white/55";

interface BooleanOptionRowProps {
  optionId: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const BooleanOptionRow = ({
  optionId,
  label,
  description,
  checked,
  onChange,
}: BooleanOptionRowProps): JSX.Element => (
  <div className={OPTION_ROW_CLASS}>
    <div className="min-w-0 flex-1">
      <p id={`${optionId}-label`} className={OPTION_LABEL_CLASS}>
        {label}
      </p>
      <p id={`${optionId}-desc`} className={OPTION_DESC_CLASS}>
        {description}
      </p>
    </div>
    <button
      type="button"
      role="switch"
      className="a11y-toggle"
      data-checked={checked}
      aria-checked={checked}
      aria-labelledby={`${optionId}-label`}
      aria-describedby={`${optionId}-desc`}
      onClick={() => onChange(!checked)}
    >
      <span className="a11y-toggle-thumb" />
    </button>
  </div>
);

interface SelectOptionRowProps {
  optionId: string;
  label: string;
  description: string;
  value: ColorBlindMode;
  choices: ReadonlyArray<{ value: ColorBlindMode; label: string }>;
  onChange: (value: ColorBlindMode) => void;
}

const SelectOptionRow = ({
  optionId,
  label,
  description,
  value,
  choices,
  onChange,
}: SelectOptionRowProps): JSX.Element => (
  <div className={`${OPTION_ROW_CLASS} flex-col items-stretch`}>
    <div>
      <label
        id={`${optionId}-label`}
        htmlFor={optionId}
        className={OPTION_LABEL_CLASS}
      >
        {label}
      </label>
      <p id={`${optionId}-desc`} className={OPTION_DESC_CLASS}>
        {description}
      </p>
    </div>
    <select
      id={optionId}
      className="a11y-select"
      value={value}
      aria-labelledby={`${optionId}-label`}
      aria-describedby={`${optionId}-desc`}
      onChange={(event) => onChange(event.target.value as ColorBlindMode)}
    >
      {choices.map((choice) => (
        <option key={choice.value} value={choice.value}>
          {choice.label}
        </option>
      ))}
    </select>
  </div>
);

const renderOption = (
  sectionId: string,
  option: AccessibilityOption,
  settings: ReturnType<typeof useAccessibility>["settings"],
  setBoolean: (key: AccessibilityBooleanKey, value: boolean) => void,
  setColorBlindMode: (value: ColorBlindMode) => void,
): JSX.Element => {
  const optionId = `a11y-${sectionId}-${option.key}`;

  if (option.kind === "boolean") {
    return (
      <BooleanOptionRow
        key={option.key}
        optionId={optionId}
        label={option.label}
        description={option.description}
        checked={settings[option.key]}
        onChange={(checked) => setBoolean(option.key, checked)}
      />
    );
  }

  return (
    <SelectOptionRow
      key={option.key}
      optionId={optionId}
      label={option.label}
      description={option.description}
      value={settings.colorBlindMode}
      choices={option.choices}
      onChange={setColorBlindMode}
    />
  );
};

interface AccessibilityPanelContentProps {
  className?: string;
  viewport?: AccessibilityViewport;
  /** When false, omit inline reset control (e.g. mobile footer handles it). */
  showResetButton?: boolean;
}

export const AccessibilityPanelContent = ({
  className = "",
  viewport = "desktop",
  showResetButton = true,
}: AccessibilityPanelContentProps): JSX.Element => {
  const { settings, setBoolean, setColorBlindMode } = useAccessibility();
  const sections = getAccessibilitySectionsForViewport(viewport);

  return (
    <div className={`a11y-panel flex flex-col gap-5 ${className}`.trim()}>
      {sections.map((section) => (
        <section
          key={section.id}
          aria-labelledby={`a11y-section-${section.id}`}
        >
          <h3
            id={`a11y-section-${section.id}`}
            className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#1591dc]"
          >
            {section.title}
          </h3>
          <p className="m-0 mt-1 text-[0.68rem] leading-relaxed text-white/55">
            {section.description}
          </p>
          <div className="mt-3 flex flex-col gap-2">
            {section.options.map((option) =>
              renderOption(
                section.id,
                option,
                settings,
                setBoolean,
                setColorBlindMode,
              ),
            )}
          </div>
        </section>
      ))}

      {showResetButton ? <AccessibilityResetButton /> : null}
    </div>
  );
};
