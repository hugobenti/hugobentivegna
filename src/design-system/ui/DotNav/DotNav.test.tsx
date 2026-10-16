import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { DotNav } from "./DotNav";

const items = [
  { id: "hero", label: "Intro" },
  { id: "timeline", label: "Experience" },
  { id: "contact", label: "Contact" },
];

test("is a labelled navigation landmark with a named button per slide", () => {
  render(<DotNav items={items} activeId="hero" onSelect={() => {}} />);
  const nav = screen.getByRole("navigation", { name: "Slides" });
  expect(nav).toBeInTheDocument();
  expect(screen.getAllByRole("button").map((b) => b.textContent)).toEqual([
    "Intro",
    "Experience",
    "Contact",
  ]);
});

test("marks only the active slide as current", () => {
  render(<DotNav items={items} activeId="timeline" onSelect={() => {}} />);
  expect(screen.getByRole("button", { name: "Experience" })).toHaveAttribute(
    "aria-current",
    "true",
  );
  expect(screen.getByRole("button", { name: "Intro" })).not.toHaveAttribute("aria-current");
  expect(screen.getByRole("button", { name: "Contact" })).not.toHaveAttribute("aria-current");
});

test("selecting a dot reports its slide id, by click or keyboard", async () => {
  const user = userEvent.setup();
  const onSelect = vi.fn();
  render(<DotNav items={items} activeId="hero" onSelect={onSelect} />);

  await user.click(screen.getByRole("button", { name: "Contact" }));
  expect(onSelect).toHaveBeenLastCalledWith("contact");

  screen.getByRole("button", { name: "Experience" }).focus();
  await user.keyboard("{Enter}");
  expect(onSelect).toHaveBeenLastCalledWith("timeline");
});

test("the landmark label can be changed", () => {
  render(<DotNav items={items} activeId="hero" onSelect={() => {}} label="Sections" />);
  expect(screen.getByRole("navigation", { name: "Sections" })).toBeInTheDocument();
});
