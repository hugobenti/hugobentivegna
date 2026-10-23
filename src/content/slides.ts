import type { ISlideMeta } from "./content.type";

/**
 * Every slide, in page order. The single source for slide ids (URL hashes) and dot labels:
 * the page renders slides in this order and each slide component reads its own entry.
 */
export const slides = {
  hero: { id: "hero", label: "Intro" },
  timeline: { id: "timeline", label: "Experience" },
  dsCover: { id: "design-systems", label: "Design systems" },
  dsProblem: { id: "problem", label: "The problem" },
  dsDecision: { id: "one-system", label: "One system" },
  dsRebrand: { id: "rebrand", label: "The rebrand" },
  aiCover: { id: "ai-development", label: "AI development" },
  aiGaps: { id: "find-the-gaps", label: "Find the gaps" },
  aiFoundation: { id: "foundation", label: "The foundation" },
  aiBuild: { id: "build-on-it", label: "Build on it" },
  pixelCover: { id: "pixelhb", label: "PixelHB" },
  pixelExact: { id: "pixel-exact", label: "The editor" },
  contact: { id: "contact", label: "Contact" },
} as const satisfies Record<string, ISlideMeta>;

/** The slides as a list, in page order (for the deck and its dots). */
export const slideList: readonly ISlideMeta[] = Object.values(slides);
