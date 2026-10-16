import type { TimelineEntry } from "@/design-system/ui";

export interface NavLink {
  label: string;
  /** Id of the slide the link jumps to; links to slides that don't exist yet aren't rendered. */
  slideId: string;
}

export interface SiteContent {
  siteUrl: string;
  storybookUrl: string;
  name: string;
  role: string;
  location: string;
  /** Small line above the headline. */
  kicker: string;
  /** Hero headline, split so the accent phrase can be styled. */
  headline: { lead: string; accent: string; tail: string };
  supportLine: string;
  nav: NavLink[];
}

/** Stable id per company, used to pair a chapter with its visual artifact. */
export type ExperienceId = "itau" | "ouribank" | "oneglobal";

export interface ExperienceEntry extends TimelineEntry {
  id: ExperienceId;
}

export interface ExperienceContent {
  title: string;
  entries: ExperienceEntry[];
}

/** A slide's anchor id (also its URL hash) and its name in the dot navigation. */
export interface SlideMeta {
  id: string;
  label: string;
}
