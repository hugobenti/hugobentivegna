import type { TimelineEntry } from "@/design-system/ui";

export interface NavLink {
  label: string;
  /** Id of the slide the link jumps to; links to slides that don't exist yet aren't rendered. */
  slideId: string;
  /** Every slide in this link's section (e.g. a case); defaults to `slideId` alone. */
  section?: readonly string[];
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
  /** The site header: its monogram (a link back to the start) and its section links. */
  monogram: string;
  homeLabel: string;
  navLabel: string;
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

/** Opens a case study: what it is, when, my role, and the chapters ahead. */
export interface CaseCover {
  kicker: string;
  title: string;
  body: string;
  meta: { label: string; value: string }[];
  chapters: { number: string; label: string }[];
}

export interface DesignSystemCase {
  cover: CaseCover;
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

/** What one check in the gap analysis found: the API already does it, or a gap. */
export type GapResult = "ready" | "gap";

/** One thing product expects, checked against the spec and the code. */
export interface GapCheck {
  expectation: string;
  result: GapResult;
  /** Names the kind of result, e.g. "Missing endpoint". */
  badge: string;
  reason: string;
}

/**
 * One line of a repository excerpt. Its text appears verbatim in the excerpt's source file
 * (markdown emphasis and backticks aside), unless `output` marks it as a tool's output.
 */
export interface ExcerptLine {
  text: string;
  tone?: "strong" | "label" | "error";
  output?: true;
}

/** A short excerpt of a file in this site's repository, shown as it is. */
export interface Excerpt {
  /** What the card is headed with, e.g. "AGENTS.md" or "pnpm lint". */
  file: string;
  kind: string;
  /** Who acts on it, e.g. "read by the agent". */
  reader: string;
  /** Repository path the lines are quoted from. */
  source: string;
  lines: ExcerptLine[];
}

export interface AiCase {
  cover: CaseCover;
  /** Each scene runs longer than 5 s, so it can be paused (WCAG 2.2.2). */
  controls: { pause: string; play: string; replay: string };
  /** Chapter 01: an agent compares product docs, the tech spec and the code before any work. */
  gaps: {
    kicker: string;
    title: string;
    body: string;
    /** Heads the panel: the feature being checked. */
    feature: string;
    /** Marks the panel as an example, not the real portal. */
    illustration: string;
    /** Read in this order; `reading` captions the source while the agent reads it. */
    sources: { label: string; badge?: string; reading: string }[];
    /** Names the checks list for screen readers. */
    checksLabel: string;
    checks: [GapCheck, ...GapCheck[]];
    /** Replaces the caption once every check has its result. */
    done: string;
  };
  /** Chapter 02: the rules agents read, and the lint rules they can't break. */
  foundation: {
    kicker: string;
    title: string;
    body: string;
    /** Says where the excerpts come from. */
    note: string;
    /** Names the excerpts list for screen readers. */
    excerptsLabel: string;
    excerpts: [Excerpt, ...Excerpt[]];
  };
  /** Chapter 03: a real reviewed change from this repository, from draft to merged. */
  build: {
    kicker: string;
    title: string;
    body: string;
    /** Shown under the body: the proof is public. */
    closing: string;
    /** Opens this site's repository in a new tab. */
    repo: LinkContent;
    review: {
      /** Heads the panel: which pull request and file. */
      label: string;
      /** Draft, Review, Fix, Rule, Checks, Merged (one per timeline stage). */
      stages: [string, string, string, string, string, string];
      /** The draft's lines as committed; they end marked removed. */
      before: string[];
      /** The line that replaced them. */
      after: string;
      /** Read by screen readers before each line, since color marks it on screen. */
      removedLabel: string;
      addedLabel: string;
      comment: { author: string; body: string; resolved: string };
      /** The lint rule the review turned into. */
      rule: { file: string; message: string };
      checks: string[];
      checkMarks: { pending: string; passed: string };
      status: { open: string; merged: string };
    };
  };
}
