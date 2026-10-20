export type TThemeSwitchOption = { value: string; label: string };

export type TThemeSwitchProps = {
  options: TThemeSwitchOption[];
  /** Value of the selected option. */
  value: string;
  onChange: (value: string) => void;
  /** Name of the group, announced before the options. */
  label: string;
  className?: string;
};
