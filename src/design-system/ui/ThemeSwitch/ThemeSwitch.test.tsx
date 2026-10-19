import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { expect, test, vi } from "vitest";
import { ThemeSwitch } from "./ThemeSwitch";

const options = [
  { value: "midnight", label: "Midnight" },
  { value: "pixel", label: "Pixel" },
  { value: "system", label: "System" },
];

function Controlled({ onChange }: { onChange?: (value: string) => void }) {
  const [value, setValue] = useState("midnight");
  return (
    <ThemeSwitch
      label="Brand"
      options={options}
      value={value}
      onChange={(next) => {
        setValue(next);
        onChange?.(next);
      }}
    />
  );
}

test("is a labelled group of radios with the current value checked", () => {
  render(<ThemeSwitch label="Brand" options={options} value="pixel" onChange={() => {}} />);
  expect(screen.getByRole("group", { name: "Brand" })).toBeInTheDocument();
  expect(screen.getByRole("radio", { name: "Pixel" })).toBeChecked();
  expect(screen.getByRole("radio", { name: "Midnight" })).not.toBeChecked();
});

test("clicking an option reports its value", async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();
  render(<Controlled onChange={onChange} />);
  await user.click(screen.getByText("System"));
  expect(onChange).toHaveBeenLastCalledWith("system");
  expect(screen.getByRole("radio", { name: "System" })).toBeChecked();
});

test("one tab stop, landing on the checked option", async () => {
  const user = userEvent.setup();
  render(
    <>
      <button type="button">before</button>
      <ThemeSwitch label="Brand" options={options} value="pixel" onChange={() => {}} />
      <button type="button">after</button>
    </>,
  );
  screen.getByRole("button", { name: "before" }).focus();
  await user.tab();
  expect(screen.getByRole("radio", { name: "Pixel" })).toHaveFocus();
  await user.tab();
  expect(screen.getByRole("button", { name: "after" })).toHaveFocus();
});

test("arrow keys move the selection", async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();
  render(<Controlled onChange={onChange} />);
  screen.getByRole("radio", { name: "Midnight" }).focus();
  await user.keyboard("{ArrowRight}");
  expect(onChange).toHaveBeenLastCalledWith("pixel");
  await user.keyboard("{ArrowLeft}");
  expect(onChange).toHaveBeenLastCalledWith("midnight");
});

test("two switches on one page don't share a radio group", () => {
  render(
    <>
      <ThemeSwitch label="A" options={options} value="pixel" onChange={() => {}} />
      <ThemeSwitch label="B" options={options} value="system" onChange={() => {}} />
    </>,
  );
  const [a, b] = screen.getAllByRole("radio", { name: "Pixel" });
  expect(a?.getAttribute("name")).not.toBe(b?.getAttribute("name"));
});
