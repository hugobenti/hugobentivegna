import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { experience } from "@/content/experience";
import {
  centreLineObserver,
  installFakeIntersectionObserver,
} from "@/test/fakeIntersectionObserver";
import { TimelineSlide } from "./TimelineSlide";

beforeEach(installFakeIntersectionObserver);
afterEach(() => vi.unstubAllGlobals());

/** data-state of each company span on the axis, oldest first. */
function spanStates(container: HTMLElement) {
  return [...container.querySelectorAll("[data-state]")]
    .filter((element) => element.parentElement?.childElementCount === experience.entries.length)
    .map((element) => element.getAttribute("data-state"));
}

test("every chapter is in the page without any interaction", () => {
  render(<TimelineSlide />);
  for (const entry of experience.entries) {
    expect(screen.getByRole("heading", { name: entry.company })).toBeInTheDocument();
  }
});

test("before scrolling, the axis focuses on the first company", () => {
  const { container } = render(<TimelineSlide />);
  expect(spanStates(container)).toEqual(["current", "future", "future"]);
});

test("the chapter crossing the centre of the screen drives the axis", () => {
  const { container } = render(<TimelineSlide />);
  centreLineObserver().report('[data-step="1"]', true);
  expect(spanStates(container)).toEqual(["past", "current", "future"]);
  centreLineObserver().report('[data-step="2"]', true);
  expect(spanStates(container)).toEqual(["past", "past", "current"]);
});

/** data-active of each step's artifact, oldest first. */
function artifactStates(container: HTMLElement) {
  return [...container.querySelectorAll("[data-step]")].map((step) =>
    step.querySelector("[data-artifact]")?.getAttribute("data-active"),
  );
}

test("every chapter has a decorative artifact that adds nothing to the accessibility tree", () => {
  const { container } = render(<TimelineSlide />);
  for (const step of container.querySelectorAll("[data-step]")) {
    const artifact = step.querySelector("[data-artifact]");
    expect(artifact).toHaveAttribute("aria-hidden", "true");
    expect(artifact?.querySelector("a, button, input, select, textarea, [tabindex]")).toBeNull();
  }
});

test("only the artifact of the chapter in focus plays", () => {
  const { container } = render(<TimelineSlide />);
  expect(artifactStates(container)).toEqual(["true", "false", "false"]);
  centreLineObserver().report('[data-step="2"]', true);
  expect(artifactStates(container)).toEqual(["false", "false", "true"]);
});
