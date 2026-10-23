import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { designSystemCase } from "@/content/cases";
import {
  centreLineObserver,
  installFakeIntersectionObserver,
} from "@/test/fakeIntersectionObserver";
import { BUILD_DELAY_MS, buildDuration } from "./buttonBuild";
import { DecisionSlide } from "./DecisionSlide";

const { decision } = designSystemCase;
const preview = (container: HTMLElement) =>
  container.querySelector("[data-preview]") as HTMLElement;

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
  expect(screen.queryAllByRole("button")).toEqual([]);
});

test("lists the real token values the button is built from", () => {
  render(<DecisionSlide />);
  const list = screen.getByRole("list", { name: decision.tokensLabel });
  expect(list).toHaveTextContent("button.primary.bg");
  expect(list).toHaveTextContent("#5aa2ff");
  expect(list).toHaveTextContent("999px");
});

test("before the slide is reached, the button is still empty", () => {
  const { container } = render(<DecisionSlide />);
  act(() => vi.advanceTimersByTime(5000));
  expect(preview(container)).toHaveAttribute("data-shape", "false");
});

test("once active, the tokens build the button step by step, then it holds", () => {
  const { container } = render(<DecisionSlide />);
  centreLineObserver().reportAll(true);
  expect(preview(container)).toHaveAttribute("data-shape", "false");
  act(() => vi.advanceTimersByTime(BUILD_DELAY_MS));
  expect(preview(container)).toHaveAttribute("data-shape", "true");
  expect(preview(container)).toHaveAttribute("data-fill", "false");
  act(() => vi.advanceTimersByTime(buildDuration(decision.steps.length)));
  expect(preview(container)).toHaveAttribute("data-type", "true");
  expect(screen.getByText(decision.done)).toBeInTheDocument();
});
