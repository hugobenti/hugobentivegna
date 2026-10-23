import { expect, test } from "vitest";
import {
  DRAWING_DELAY_MS,
  DRAWING_MS,
  drawingDuration,
  drawingOrder,
  drawnCount,
} from "./drawingTimeline";
import { COMPUTER } from "./pixelArt.data";
import { gridCells } from "./pixelGrid";

test("the drawing ends before 5 s, so it needs no pause control (WCAG 2.2.2)", () => {
  expect(drawingDuration).toBeLessThanOrEqual(5000);
});

test("the order draws every pixel once, outline before fill, row by row within a color", () => {
  const order = drawingOrder(COMPUTER, ["M", "m"]);
  const cells = gridCells(COMPUTER);
  expect([...order].sort((a, b) => a - b)).toEqual(cells.map((cell) => cell.index));
  const keyAt = new Map(cells.map((cell) => [cell.index, cell.key]));
  const keys = order.map((index) => keyAt.get(index));
  const lastOutline = keys.lastIndexOf("M");
  const firstFill = keys.indexOf("m");
  expect(lastOutline).toBeLessThan(firstFill);
  expect(keys.slice(firstFill).every((key) => key !== "M")).toBe(true);
  const outline = order.slice(0, lastOutline + 1);
  expect(outline).toEqual([...outline].sort((a, b) => a - b));
});

test("pixels appear only after the delay, never go away, and are all drawn at the end", () => {
  const total = 140;
  expect(drawnCount(0, total)).toBe(0);
  expect(drawnCount(DRAWING_DELAY_MS, total)).toBe(0);
  expect(drawnCount(DRAWING_DELAY_MS + 100, total)).toBeGreaterThan(0);
  let previous = 0;
  for (let elapsed = 0; elapsed <= drawingDuration; elapsed += 100) {
    const drawn = drawnCount(elapsed, total);
    expect(drawn).toBeGreaterThanOrEqual(previous);
    previous = drawn;
  }
  expect(drawnCount(DRAWING_DELAY_MS + DRAWING_MS, total)).toBe(total);
  expect(drawnCount(drawingDuration + 1000, total)).toBe(total);
});
