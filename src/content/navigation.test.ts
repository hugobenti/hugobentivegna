import { expect, test } from "vitest";
import { activeNavLink, availableNavLinks } from "./navigation";

const nav = [
  { label: "Work", slideId: "timeline" },
  { label: "Projects", slideId: "pixelcraft" },
  { label: "Contact", slideId: "contact" },
];

test("only links whose slide exists are offered, in nav order, with their hash", () => {
  const slides = [{ id: "hero" }, { id: "contact" }, { id: "timeline" }];
  expect(availableNavLinks(nav, slides)).toEqual([
    { label: "Work", slideId: "timeline", id: "timeline", href: "#timeline" },
    { label: "Contact", slideId: "contact", id: "contact", href: "#contact" },
  ]);
});

test("no slides, no links", () => {
  expect(availableNavLinks(nav, [])).toEqual([]);
});

const sections = [
  { label: "Experience", slideId: "timeline" },
  { label: "Case 01", slideId: "cover", section: ["cover", "problem", "rebrand"] },
  { label: "Contact", slideId: "contact" },
];

test("every slide of a case keeps the case's link active", () => {
  for (const slide of ["cover", "problem", "rebrand"]) {
    expect(activeNavLink(sections, slide)).toBe("cover");
  }
});

test("a link without a section is active on its own slide only", () => {
  expect(activeNavLink(sections, "timeline")).toBe("timeline");
  expect(activeNavLink(sections, "contact")).toBe("contact");
});

test("slides outside every section (the hero) leave nothing active", () => {
  expect(activeNavLink(sections, "hero")).toBeNull();
});
