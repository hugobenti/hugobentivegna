import { act, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { pixelhbCase } from "@/content/cases";
import { stubReducedMotion } from "@/test/reducedMotion";
import {
  centreLineObserver,
  installFakeIntersectionObserver,
} from "@/test/fakeIntersectionObserver";
import { DrawingDemo } from "./DrawingDemo";
import { DRAWING_DELAY_MS, DRAWING_MS, drawingDuration } from "./drawingTimeline";

const drawn = (container: HTMLElement) =>
  container.querySelectorAll('rect[data-state="on"]').length;
const pixels = (container: HTMLElement) => container.querySelectorAll("rect").length;

beforeEach(() => {
  installFakeIntersectionObserver();
  stubReducedMotion(false);
  vi.useFakeTimers();
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

test("the canvas starts empty, fills in as it plays, and ends with every pixel drawn", () => {
  const { container } = render(<DrawingDemo />);
  expect(screen.getByRole("img", { name: pixelhbCase.drawing })).toBeInTheDocument();
  expect(drawn(container)).toBe(0);
  centreLineObserver().reportAll(true);
  act(() => vi.advanceTimersByTime(DRAWING_DELAY_MS + DRAWING_MS / 2));
  const half = drawn(container);
  expect(half).toBeGreaterThan(0);
  expect(half).toBeLessThan(pixels(container));
  act(() => vi.advanceTimersByTime(drawingDuration));
  expect(drawn(container)).toBe(pixels(container));
});

test("reduced motion and the server render show the finished drawing", () => {
  const html = renderToString(<DrawingDemo />);
  expect(html).not.toContain('data-state="off"');
  stubReducedMotion(true);
  const { container } = render(<DrawingDemo />);
  expect(drawn(container)).toBe(pixels(container));
});
