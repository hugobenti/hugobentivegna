import { expect, test } from "vitest";
import { hashForSlide, slidePositions } from "./slideState";

const ids = ["hero", "timeline", "ai-loop", "contact"] as const;

test("positions are relative to the active slide", () => {
  expect(slidePositions(ids, "ai-loop")).toEqual({
    hero: "before",
    timeline: "before",
    "ai-loop": "active",
    contact: "after",
  });
});

test("the first slide is active with everything after it", () => {
  expect(slidePositions(ids, "hero")).toEqual({
    hero: "active",
    timeline: "after",
    "ai-loop": "after",
    contact: "after",
  });
});

test("the first slide keeps a clean URL; every other slide gets its hash", () => {
  expect(hashForSlide("hero", ids)).toBe("");
  expect(hashForSlide("timeline", ids)).toBe("#timeline");
  expect(hashForSlide("contact", ids)).toBe("#contact");
});
