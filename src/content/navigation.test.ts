import { expect, test } from "vitest";
import { availableNavLinks } from "./navigation";

const nav = [
  { label: "Work", slideId: "timeline" },
  { label: "Projects", slideId: "pixelcraft" },
  { label: "Contact", slideId: "contact" },
];

test("only links whose slide exists are offered, in nav order, with their hash", () => {
  const slides = [{ id: "hero" }, { id: "contact" }, { id: "timeline" }];
  expect(availableNavLinks(nav, slides)).toEqual([
    { label: "Work", slideId: "timeline", href: "#timeline" },
    { label: "Contact", slideId: "contact", href: "#contact" },
  ]);
});

test("no slides, no links", () => {
  expect(availableNavLinks(nav, [])).toEqual([]);
});
