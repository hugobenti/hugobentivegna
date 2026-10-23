import { act, render, screen, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { aiCase } from "@/content/cases";
import { site } from "@/content/site";
import {
  centreLineObserver,
  installFakeIntersectionObserver,
} from "@/test/fakeIntersectionObserver";
import { stubReducedMotion } from "@/test/reducedMotion";
import { GapsSlide } from "./GapsSlide";
import { GAPS_DELAY_MS, GAPS_REVEAL_MS, GAPS_SOURCE_MS, gapsDuration } from "./gapsTimeline";

const { gaps } = aiCase;
const controls = site.playback;
const duration = gapsDuration(gaps.sources.length, gaps.checks.length);

const advance = (ms: number) => act(() => vi.advanceTimersByTime(ms));
const start = () => centreLineObserver().reportAll(true);
const checks = () =>
  within(screen.getByRole("list", { name: gaps.checksLabel })).getAllByRole("listitem");
const states = () => checks().map((check) => check.getAttribute("data-state"));
const litSources = (container: HTMLElement) =>
  container.querySelectorAll('[data-source][data-on="true"]').length;

beforeEach(() => {
  installFakeIntersectionObserver();
  stubReducedMotion(false);
  vi.useFakeTimers();
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

test("every check's expectation, result and reason is in the page before it plays", () => {
  render(<GapsSlide />);
  expect(checks()).toHaveLength(gaps.checks.length);
  gaps.checks.forEach((check, index) => {
    const item = checks()[index] as HTMLElement;
    expect(item).toHaveTextContent(check.expectation);
    expect(item).toHaveTextContent(check.badge);
    expect(item).toHaveTextContent(check.reason);
  });
  expect(screen.getByText(gaps.illustration)).toBeInTheDocument();
});

test("before the slide is reached, nothing has been checked", () => {
  const { container } = render(<GapsSlide />);
  advance(duration);
  expect(states()).toEqual(gaps.checks.map(() => "idle"));
  expect(litSources(container)).toBe(0);
});

test("once active, the agent reads each source, then each check lands its result", () => {
  const { container } = render(<GapsSlide />);
  start();
  advance(GAPS_DELAY_MS);
  expect(litSources(container)).toBe(1);
  advance(gaps.sources.length * GAPS_SOURCE_MS);
  expect(litSources(container)).toBe(gaps.sources.length);
  expect(states()[0]).toBe("checking");
  advance(GAPS_REVEAL_MS);
  expect(states()[0]).toBe(gaps.checks[0].result);
  advance(duration);
  expect(states()).toEqual(gaps.checks.map((check) => check.result));
  expect(screen.getByRole("button", { name: controls.replay })).toBeInTheDocument();
});

test("the control pauses the check and resumes it", () => {
  render(<GapsSlide />);
  start();
  advance(GAPS_DELAY_MS + gaps.sources.length * GAPS_SOURCE_MS);
  act(() => screen.getByRole("button", { name: controls.pause }).click());
  advance(duration);
  expect(states()[1]).toBe("idle");
  act(() => screen.getByRole("button", { name: controls.play }).click());
  advance(duration);
  expect(states()).toEqual(gaps.checks.map((check) => check.result));
});

test("with reduced motion every result shows at once and there is nothing to control", () => {
  stubReducedMotion(true);
  render(<GapsSlide />);
  expect(states()).toEqual(gaps.checks.map((check) => check.result));
  expect(screen.queryAllByRole("button")).toEqual([]);
});

test("without JavaScript the page shows the results and no control that couldn't work", () => {
  const html = renderToString(<GapsSlide />);
  for (const label of Object.values(controls)) {
    expect(html).not.toMatch(new RegExp(`<button[^>]*>${label}</button>`));
  }
  expect(html).toContain(gaps.checks[0].badge);
});
