import { act, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import {
  centreLineObserver,
  installFakeIntersectionObserver,
} from "@/test/fakeIntersectionObserver";
import { DecisionSlide } from "./DecisionSlide";
import { TRACE_SEGMENT_MS } from "./tokenTrace";

const chainNames = () =>
  within(screen.getByRole("list", { name: /chain/i }))
    .getAllByRole("listitem")
    .map((item) => item.querySelector("code")?.textContent);

beforeEach(() => {
  installFakeIntersectionObserver();
  vi.useFakeTimers();
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

test("has no controls: the visitor only watches", () => {
  render(<DecisionSlide />);
  expect(screen.queryAllByRole("radio")).toEqual([]);
  expect(screen.queryAllByRole("button", { name: /pause|play|replay/i })).toEqual([]);
});

test("before the slide is reached, it waits on the primary fill", () => {
  render(<DecisionSlide />);
  expect(chainNames()).toEqual(["palette.blue.400", "color.accent", "button.primary.bg"]);
  act(() => vi.advanceTimersByTime(5000));
  expect(chainNames()).toEqual(["palette.blue.400", "color.accent", "button.primary.bg"]);
});

test("once active, it starts on the primary fill and moves on to the next token", () => {
  render(<DecisionSlide />);
  centreLineObserver().report("[data-playback]", true);
  expect(chainNames()).toEqual(["palette.blue.400", "color.accent", "button.primary.bg"]);
  act(() => vi.advanceTimersByTime(TRACE_SEGMENT_MS));
  expect(chainNames().at(-1)).toBe("button.primary.fg");
});
