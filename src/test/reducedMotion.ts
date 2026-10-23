import { vi } from "vitest";

/** Stubs `matchMedia` so `prefers-reduced-motion: reduce` matches (or not). Undo with `vi.unstubAllGlobals()`. */
export function stubReducedMotion(reduce: boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: reduce && query.includes("reduce"),
    media: query,
    addEventListener() {},
    removeEventListener() {},
  }));
}
