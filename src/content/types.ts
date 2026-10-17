import type { TimelineEntry } from "@/design-system/ui";

export interface NavLink {
  label: string;
  /** Id of the slide the link jumps to; links to slides that don't exist yet aren't rendered. */
  slideId: string;
}

export interface SiteContent {
  siteUrl: string;
  /** The site's address as people read it, e.g. on the share card. */
  domain: string;
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

export interface LinkContent {
  label: string;
  href: string;
}

export interface ContactContent {
  kicker: string;
  /** Closing statement. */
  title: string;
  intro: string;
  email: string;
  /** Opens the visitor's mail app. */
  emailAction: LinkContent;
  /** Profiles that open in a new tab. */
  profiles: LinkContent[];
  /** The CV as published (unchanged PDF in public/). */
  cv: LinkContent;
  credit: string;
  storybook: LinkContent;
}

export interface NotFoundContent {
  code: string;
  title: string;
  body: string;
  back: LinkContent;
}

export interface TitledText {
  title: string;
  body: string;
}

/** One step of building a button from tokens: which part it styles and the tokens it applies. */
export interface BuildStep {
  part: "shape" | "fill" | "label" | "type";
  /** Leads the step's caption; the hook adds the tokens it applies. */
  caption: string;
  /** Token names in tokens.json, e.g. "button.primary.bg". */
  tokens: string[];
}

/** The rebrand scene's two acts: the same rebrand without, then with, a design system. */
export type SceneAct = "without" | "with";

export interface DesignSystemCase {
  /** Cover: frames what follows as a case study, with when, my role and the chapters. */
  cover: {
    kicker: string;
    title: string;
    body: string;
    meta: { label: string; value: string }[];
    chapters: { number: string; label: string }[];
  };
  /** Slide 1: the problem the system solved. */
  problem: {
    kicker: string;
    title: string;
    body: string;
  };
  /** Slide 2: the decision, shown by tokens building a button. */
  decision: TitledText & {
    kicker: string;
    /** Names the token list for screen readers. */
    tokensLabel: string;
    /** The tokens on show, grouped; `display` replaces a value that reads badly (a font stack). */
    groups: { label: string; tokens: { token: string; display?: string }[] }[];
    /** Build order. */
    steps: [BuildStep, ...BuildStep[]];
    buttonLabel: string;
    /** Replaces the step caption once the button is built. */
    done: string;
  };
  /** Slide 3: the test. The copy carries the outcome; the scene replays it. */
  rebrand: {
    kicker: string;
    title: string;
    lead: string;
    /** Shown under the scene from the start, so the payoff never depends on watching. */
    closing: string;
    /** Per act: its label, its line in the scene, and a text summary for screen readers. */
    acts: Record<SceneAct, { label: string; title: string; summary: string }>;
    /** Counter naming who does the work in each act, e.g. "6 developers". */
    developers: Record<SceneAct, string>;
    /** Follows the "3/6" count of rebranded products. */
    rebrandedLabel: string;
    /** The scene's one control: it runs longer than 5 s, so it can be paused (WCAG 2.2.2). */
    controls: { pause: string; play: string; replay: string };
    /** `missing` fills the system's place in act 1, where there is no shared library yet. */
    system: { name: string; released: string; missing: string };
    versions: { before: string; after: string };
    /** Made-up product names, one per developer in act 1. */
    products: readonly string[];
    /** What every mock product screen shows. */
    product: { balanceLabel: string; balance: string; action: string };
  };
}
