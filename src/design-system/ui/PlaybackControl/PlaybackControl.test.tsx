import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { PlaybackControl } from "./PlaybackControl";

test("shows its label as the button name and calls onToggle when pressed", () => {
  const onToggle = vi.fn();
  render(<PlaybackControl label="Pause" onToggle={onToggle} />);
  screen.getByRole("button", { name: "Pause" }).click();
  expect(onToggle).toHaveBeenCalledTimes(1);
});

test("renders nothing while it is not shown", () => {
  render(<PlaybackControl shown={false} label="Pause" onToggle={() => {}} />);
  expect(screen.queryByRole("button")).toBeNull();
});
