import { act, renderHook } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { useThemeTransition } from "./useThemeTransition";

type Theme = "midnight" | "solar" | "forest";

function mockReducedMotion(reduce: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => ({ matches: reduce && query.includes("reduce"), media: query })),
  );
}

/** jsdom has no View Transitions API: install a fake that runs the update like a browser. */
function mockViewTransitions() {
  const start = vi.fn((update: () => void) => {
    update();
    return { finished: Promise.resolve(), ready: Promise.resolve() };
  });
  Object.defineProperty(document, "startViewTransition", { value: start, configurable: true });
  return start;
}

afterEach(() => {
  vi.unstubAllGlobals();
  Reflect.deleteProperty(document, "startViewTransition");
});

test("switches theme in browsers without the View Transitions API", () => {
  mockReducedMotion(false);
  const { result } = renderHook(() => useThemeTransition<Theme>("midnight"));
  act(() => result.current[1]("solar"));
  expect(result.current[0]).toBe("solar");
});

test("animates the switch with a view transition when the browser has one", () => {
  mockReducedMotion(false);
  const start = mockViewTransitions();
  const { result } = renderHook(() => useThemeTransition<Theme>("midnight"));
  act(() => result.current[1]("forest"));
  expect(start).toHaveBeenCalledOnce();
  expect(result.current[0]).toBe("forest");
});

test("switches instantly when the visitor prefers reduced motion", () => {
  mockReducedMotion(true);
  const start = mockViewTransitions();
  const { result } = renderHook(() => useThemeTransition<Theme>("midnight"));
  act(() => result.current[1]("solar"));
  expect(start).not.toHaveBeenCalled();
  expect(result.current[0]).toBe("solar");
});
