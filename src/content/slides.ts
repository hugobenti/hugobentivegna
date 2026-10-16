import type { SlideMeta } from "./types";

/**
 * Every slide, in page order. The single source for slide ids (URL hashes) and dot labels:
 * the page renders slides in this order and each slide component reads its own entry.
 */
export const slides = {
  hero: { id: "hero", label: "Intro" },
  timeline: { id: "timeline", label: "Experience" },
} as const satisfies Record<string, SlideMeta>;

/** The slides as a list, in page order (for the deck and its dots). */
export const slideList: readonly SlideMeta[] = Object.values(slides);
