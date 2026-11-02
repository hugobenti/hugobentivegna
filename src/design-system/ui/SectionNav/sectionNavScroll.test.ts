import { expect, test } from "vitest";
import { centredScrollLeft, overflowEdges } from "./sectionNavScroll";

const list = { listLeft: 62, listWidth: 311, scrollLeft: 0, scrollWidth: 857 };

test("centres the link when the list does not start at the page edge", () => {
  expect(centredScrollLeft({ ...list, linkLeft: 62 + 300, linkWidth: 260 })).toBe(
    300 - (311 - 260) / 2,
  );
});

test("never scrolls past either end", () => {
  expect(centredScrollLeft({ ...list, linkLeft: 62 + 800, linkWidth: 57 })).toBe(857 - 311);
  expect(centredScrollLeft({ ...list, linkLeft: 62, linkWidth: 80 })).toBe(0);
});

test("reports which edges hide links", () => {
  expect(overflowEdges(0, 857, 311)).toEqual({ start: false, end: true });
  expect(overflowEdges(546, 857, 311)).toEqual({ start: true, end: false });
  expect(overflowEdges(0, 300, 311)).toEqual({ start: false, end: false });
});
