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

/**
 * jsdom has no View Transitions API: install a fake that, like a browser, runs the update and
 * then takes the "new" snapshot. `inspect` runs at that moment.
 */
function mockViewTransitions(inspect: () => void = () => {}) {
  const start = vi.fn((update: () => void) => {
    update();
    inspect();
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
  act(() => result.current.select("solar"));
  expect(result.current.theme).toBe("solar");
  expect(result.current.selected).toBe("solar");
});

test("commits the new theme inside the view transition, before the new snapshot", () => {
  mockReducedMotion(false);
  let painted: Theme | undefined;
  const { result } = renderHook(() => useThemeTransition<Theme>("midnight"));
  const start = mockViewTransitions(() => {
    painted = result.current.theme;
  });
  act(() => result.current.select("forest"));
  expect(start).toHaveBeenCalledOnce();
  expect(painted).toBe("forest");
});

test("switches instantly when the visitor prefers reduced motion", () => {
  mockReducedMotion(true);
  const start = mockViewTransitions();
  const { result } = renderHook(() => useThemeTransition<Theme>("midnight"));
  act(() => result.current.select("solar"));
  expect(start).not.toHaveBeenCalled();
  expect(result.current.theme).toBe("solar");
});
