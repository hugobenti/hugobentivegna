import { readFileSync } from "node:fs";
import { act, render, screen, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { aiCase } from "@/content/cases";
import { site } from "@/content/site";
import {
  centreLineObserver,
  installFakeIntersectionObserver,
} from "@/test/fakeIntersectionObserver";
import { stubReducedMotion } from "@/test/reducedMotion";
import { FoundationSlide } from "./FoundationSlide";
import { FOUNDATION_DELAY_MS, FOUNDATION_STEP_MS, foundationDuration } from "./foundationTimeline";

const { foundation } = aiCase;
const controls = site.playback;
const duration = foundationDuration(foundation.excerpts.length);

const advance = (ms: number) => act(() => vi.advanceTimersByTime(ms));
const start = () => centreLineObserver().reportAll(true);
const cards = () =>
  within(screen.getByRole("list", { name: foundation.excerptsLabel })).getAllByRole("listitem");
const lit = () => cards().map((card) => card.getAttribute("data-on"));

/** A source file as prose: markdown emphasis and code ticks removed, whitespace collapsed. */
const plain = (path: string) =>
  readFileSync(path, "utf8").replaceAll("**", "").replaceAll("`", "").replace(/\s+/g, " ");

describe("every excerpt is still what its file says", () => {
  test.each(foundation.excerpts.map((excerpt) => [excerpt.file, excerpt] as const))(
    "%s",
    (_, excerpt) => {
      const source = plain(excerpt.source);
      for (const line of excerpt.lines.filter((entry) => !entry.output)) {
        expect(source).toContain(line.text);
      }
    },
  );
});

beforeEach(() => {
  installFakeIntersectionObserver();
  stubReducedMotion(false);
  vi.useFakeTimers();
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

test("every excerpt's text is in the page before it plays", () => {
  render(<FoundationSlide />);
  expect(cards()).toHaveLength(foundation.excerpts.length);
  foundation.excerpts.forEach((excerpt, index) => {
    for (const line of excerpt.lines) expect(cards()[index]).toHaveTextContent(line.text);
  });
});

test("once active, each excerpt is lit in turn, then all of them stay lit", () => {
  render(<FoundationSlide />);
  expect(lit()).toEqual(["false", "false", "false"]);
  start();
  advance(FOUNDATION_DELAY_MS);
  expect(lit()).toEqual(["true", "false", "false"]);
  advance(FOUNDATION_STEP_MS);
  expect(lit()).toEqual(["false", "true", "false"]);
  advance(duration);
  expect(lit()).toEqual(["true", "true", "true"]);
  expect(screen.getByRole("button", { name: controls.replay })).toBeInTheDocument();
});

test("with reduced motion every excerpt is lit and there is nothing to control", () => {
  stubReducedMotion(true);
  render(<FoundationSlide />);
  expect(lit()).toEqual(["true", "true", "true"]);
  expect(screen.queryAllByRole("button")).toEqual([]);
});

test("without JavaScript there is no control that couldn't work", () => {
  const html = renderToString(<FoundationSlide />);
  for (const label of Object.values(controls)) {
    expect(html).not.toMatch(new RegExp(`<button[^>]*>${label}</button>`));
  }
});
