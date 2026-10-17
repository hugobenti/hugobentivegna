import { useId } from "react";
import { cx } from "../cx";
import { themeSwitch } from "./ThemeSwitch.style";

export type ThemeSwitchOption<T extends string = string> = { value: T; label: string };

export type ThemeSwitchProps<T extends string = string> = {
  options: readonly ThemeSwitchOption<T>[];
  /** Value of the selected option. */
  value: T;
  /** Receives the picked option's value, typed as the options' values. */
  onChange: (value: T) => void;
  /** Name of the group, announced before the options. */
  label: string;
  className?: string;
};

/**
 * Segmented control for picking one option, e.g. a theme. Built on native radio inputs,
 * so arrow keys, the single tab stop and screen-reader announcements come from the browser.
 */
export function ThemeSwitch<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
}: ThemeSwitchProps<T>) {
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
