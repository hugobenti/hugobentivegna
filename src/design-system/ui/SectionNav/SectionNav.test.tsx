import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { SectionNav } from "./SectionNav";

const items = [
  { id: "timeline", label: "Experience", href: "#timeline" },
  { id: "design-systems", label: "Case 01 · Design systems", href: "#design-systems" },
  { id: "contact", label: "Contact", href: "#contact" },
] as const;

test("is a labelled navigation landmark with a link per section", () => {
  render(<SectionNav items={items} activeId={null} label="Primary" />);
  expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
  expect(screen.getAllByRole("link").map((link) => link.getAttribute("href"))).toEqual([
    "#timeline",
    "#design-systems",
    "#contact",
  ]);
});

test("marks only the active section as the current location", () => {
  render(<SectionNav items={items} activeId="design-systems" />);
  expect(screen.getByRole("link", { name: "Case 01 · Design systems" })).toHaveAttribute(
    "aria-current",
    "location",
  );
  expect(screen.getByRole("link", { name: "Experience" })).not.toHaveAttribute("aria-current");
  expect(screen.getByRole("link", { name: "Contact" })).not.toHaveAttribute("aria-current");
});

test("the decorative brackets are not part of a link's name", () => {
  render(<SectionNav items={items} activeId="contact" />);
  expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
});

test("with no active section, nothing is current", () => {
  render(<SectionNav items={items} activeId={null} />);
  for (const link of screen.getAllByRole("link")) {
    expect(link).not.toHaveAttribute("aria-current");
  }
});
