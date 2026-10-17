import { useId } from "react";
import { cx } from "../cx";
import { themeSwitch } from "./ThemeSwitch.style";

export type ThemeSwitchOption = { value: string; label: string };

export type ThemeSwitchProps = {
  options: ThemeSwitchOption[];
  /** Value of the selected option. */
  value: string;
  onChange: (value: string) => void;
  /** Name of the group, announced before the options. */
  label: string;
  className?: string;
};

/**
 * Segmented control for picking one option, e.g. a theme. Built on native radio inputs,
 * so arrow keys, the single tab stop and screen-reader announcements come from the browser.
 */
export function ThemeSwitch({ options, value, onChange, label, className }: ThemeSwitchProps) {
  const name = useId();
  return (
    <fieldset className={cx(themeSwitch.base, className)}>
      <legend className={themeSwitch.legend}>{label}</legend>
      {options.map((option) => (
        <label key={option.value} className={themeSwitch.option}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={option.value === value}
            onChange={() => onChange(option.value)}
            className={themeSwitch.input}
          />
          {option.label}
        </label>
      ))}
    </fieldset>
  );
}
