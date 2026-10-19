import { act, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import {
  FakeIntersectionObserver,
  centreLineObserver,
  installFakeIntersectionObserver,
} from "@/test/fakeIntersectionObserver";
import { usePlayback } from "./usePlayback";

const DURATION = 5000;

function Probe() {
  const { ref, elapsed, still, paused, finished, toggle } = usePlayback<HTMLDivElement>(DURATION);
  return (
    <div ref={ref} data-probe="">
      <p>
        elapsed={elapsed} still={String(still)} paused={String(paused)} finished=
        {String(finished)}
      </p>
      <button type="button" onClick={toggle}>
        toggle
      </button>
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
/** The element leaving (or entering) the screen altogether, not just the centre line. */
function reportOnScreen(visible: boolean) {
  const observer = FakeIntersectionObserver.instances.find(
    (instance) =>
      !instance.options.rootMargin?.startsWith("-50%") &&
      instance.observed.some((element) => element.matches("[data-probe]")),
  );
  if (!observer) throw new Error("no on-screen IntersectionObserver for the probe");
  observer.report("[data-probe]", visible);
}

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

test("leaving the screen resets to 0 and coming back replays from the start", () => {
  render(<Probe />);
  report(true);
  advance(1500);
  report(false);
  reportOnScreen(false);
  expect(shown()).toContain("elapsed=0 ");
  advance(1000);
  expect(shown()).toContain("elapsed=0 ");
  reportOnScreen(true);
  report(true);
  advance(300);
  expect(shown()).toContain("elapsed=300 ");
});

test("leaving only the centre line keeps the end state while it is still on screen", () => {
  render(<Probe />);
  report(true);
  advance(DURATION + 1000);
  report(false);
  advance(1000);
  expect(shown()).toContain(`elapsed=${DURATION} `);
  report(true);
  advance(300);
  expect(shown()).toContain(`elapsed=${DURATION} `);
});

test("leaving the centre line mid-play pauses, and coming back resumes", () => {
  render(<Probe />);
  report(true);
  advance(1500);
  report(false);
  advance(1000);
  expect(shown()).toContain("elapsed=1500 ");
  report(true);
  advance(300);
  expect(shown()).toContain("elapsed=1800 ");
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

test("pausing stops time where it is, and playing resumes from there", () => {
  render(<Probe />);
  report(true);
  advance(1000);
  act(() => screen.getByRole("button", { name: "toggle" }).click());
  expect(shown()).toContain("paused=true");
  advance(2000);
  expect(shown()).toContain("elapsed=1000 ");
  act(() => screen.getByRole("button", { name: "toggle" }).click());
  advance(500);
  expect(shown()).toContain("elapsed=1500 ");
});

test("once it has finished, the control replays it from the start", () => {
  render(<Probe />);
  report(true);
  advance(DURATION);
  expect(shown()).toContain("finished=true");
  act(() => screen.getByRole("button", { name: "toggle" }).click());
  advance(300);
  expect(shown()).toContain("elapsed=300 ");
  expect(shown()).toContain("finished=false");
});
