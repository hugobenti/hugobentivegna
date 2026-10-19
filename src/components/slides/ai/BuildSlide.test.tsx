import { readFileSync } from "node:fs";
import { act, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { aiCase } from "@/content/cases";
import {
  centreLineObserver,
  installFakeIntersectionObserver,
} from "@/test/fakeIntersectionObserver";
import { BuildSlide } from "./BuildSlide";
import { REVIEW_FIXED_MS, REVIEW_MS, REVIEW_STAGE_MS } from "./reviewTimeline";

const { build, controls } = aiCase;
const { review } = build;

function stubReducedMotion(reduce: boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: reduce && query.includes("reduce"),
    media: query,
    addEventListener() {},
    removeEventListener() {},
  }));
}

const advance = (ms: number) => act(() => vi.advanceTimersByTime(ms));
const start = () => centreLineObserver().report("[data-playback]", true);
const panel = (container: HTMLElement) => container.querySelector("[data-playback]") as HTMLElement;

beforeEach(() => {
  installFakeIntersectionObserver();
  stubReducedMotion(false);
  vi.useFakeTimers();
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

test("the whole change is in the page before it plays: old lines, new line, comment, rule, checks", () => {
  const { container } = render(<BuildSlide />);
  const text = panel(container).textContent;
  for (const line of [...review.before, review.after, review.comment.body, review.rule.message]) {
    expect(text).toContain(line);
  }
  for (const check of review.checks) expect(text).toContain(check);
  expect(screen.getAllByText(review.removedLabel)).toHaveLength(review.before.length);
  expect(screen.getByText(review.addedLabel)).toBeInTheDocument();
});

test("quotes Hugo's review in the wording he approved, and the rule as eslint.config.mjs has it", () => {
  expect(review.comment.body).toBe(
    "Components should only render. Move this logic into a hook and keep it out of the .tsx.",
  );
  expect(readFileSync("eslint.config.mjs", "utf8")).toContain(review.rule.message);
});

test("links to the repository in a new tab", () => {
  render(<BuildSlide />);
  const link = screen.getByRole("link", { name: new RegExp(build.repo.label) });
  expect(link).toHaveAttribute("href", build.repo.href);
  expect(link).toHaveAttribute("target", "_blank");
});

test("once active, the change goes from draft to merged", () => {
  const { container } = render(<BuildSlide />);
  const state = () => panel(container).dataset;
  start();
  advance(REVIEW_STAGE_MS[1]);
  expect(state()).toMatchObject({ stage: "1", removed: "false", fixed: "false" });
  advance(REVIEW_STAGE_MS[2] - REVIEW_STAGE_MS[1] + REVIEW_FIXED_MS);
  expect(state()).toMatchObject({ stage: "2", removed: "true", fixed: "true" });
  advance(REVIEW_MS);
  expect(state()).toMatchObject({ stage: "5" });
  expect(container.querySelectorAll('[data-check][data-passed="true"]')).toHaveLength(
    review.checks.length,
  );
  expect(screen.getByRole("button", { name: controls.replay })).toBeInTheDocument();
});

test("a check shows its tick only once it has passed, not just a color change", () => {
  const { container } = render(<BuildSlide />);
  const ticks = () =>
    [...container.querySelectorAll("[data-check]")].filter((check) =>
      check.textContent?.includes("✓"),
    ).length;
  start();
  advance(REVIEW_STAGE_MS[4] - 100);
  expect(ticks()).toBe(0);
  advance(REVIEW_MS);
  expect(ticks()).toBe(review.checks.length);
});

test("with reduced motion it shows the merged change, with nothing to control", () => {
  stubReducedMotion(true);
  const { container } = render(<BuildSlide />);
  expect(panel(container).dataset).toMatchObject({ stage: "5", removed: "true", fixed: "true" });
  expect(screen.queryAllByRole("button")).toEqual([]);
});

test("without JavaScript there is no control that couldn't work", () => {
  const html = renderToString(<BuildSlide />);
  for (const label of Object.values(controls)) {
    expect(html).not.toMatch(new RegExp(`<button[^>]*>${label}</button>`));
  }
});
