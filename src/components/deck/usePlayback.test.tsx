import { act, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import {
  centreLineObserver,
  installFakeIntersectionObserver,
} from "@/test/fakeIntersectionObserver";
import { usePlayback } from "./usePlayback";

const DURATION = 5000;

function Probe() {
  const { ref, elapsed, still } = usePlayback<HTMLDivElement>(DURATION);
  return (
    <div ref={ref} data-probe="">
      elapsed={elapsed} still={String(still)}
    </div>
  );
}

function stubReducedMotion(reduce: boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: reduce && query.includes("reduce"),
    media: query,
    addEventListener() {},
    removeEventListener() {},
  }));
}

const shown = () => screen.getByText(/elapsed=/).textContent;
const advance = (ms: number) => act(() => vi.advanceTimersByTime(ms));
const report = (visible: boolean) => centreLineObserver().report("[data-probe]", visible);

beforeEach(() => {
  installFakeIntersectionObserver();
  stubReducedMotion(false);
  vi.useFakeTimers();
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

test("renders the end state before hydration effects run", () => {
  expect(renderToString(<Probe />)).toContain(`elapsed=<!-- -->${DURATION}`);
});

test("waits at 0 until the slide crosses the centre line, then plays to the end and holds", () => {
  render(<Probe />);
  expect(shown()).toContain("elapsed=0 ");
  advance(1000);
  expect(shown()).toContain("elapsed=0 ");
  report(true);
  advance(2000);
  expect(shown()).toContain("elapsed=2000 ");
  advance(10_000);
  expect(shown()).toContain(`elapsed=${DURATION} `);
});

test("leaving resets to 0 and coming back replays from the start", () => {
  render(<Probe />);
  report(true);
  advance(1500);
  report(false);
  expect(shown()).toContain("elapsed=0 ");
  advance(1000);
  expect(shown()).toContain("elapsed=0 ");
  report(true);
  advance(300);
  expect(shown()).toContain("elapsed=300 ");
});

test("already active on mount (deep link) plays", () => {
  render(<Probe />);
  report(true);
  advance(500);
  expect(shown()).toContain("elapsed=500 ");
});

test("reduced motion shows the end state at once and never plays", () => {
  stubReducedMotion(true);
  render(<Probe />);
  expect(shown()).toContain(`elapsed=${DURATION} still=true`);
  advance(1000);
  expect(shown()).toContain(`elapsed=${DURATION} still=true`);
});
