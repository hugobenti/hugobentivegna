import type { TokenLayer } from "@/design-system/tokens";
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

/** A component token the trace plays through, and the kit Button variant it styles. */
export interface TraceOption {
  /** Token name in tokens.json, e.g. "button.primary.bg". */
  token: string;
  label: string;
  variant: "primary" | "secondary";
}

/** The rebrand scene's two acts: the same rebrand without, then with, a design system. */
export type SceneAct = "without" | "with";

export interface DesignSystemCase {
  /** Slide 1: the problem the system solved. */
  problem: {
    kicker: string;
    title: string;
    body: string;
  };
  /** Slide 2: the decision, shown by a token trace that plays by itself. */
  decision: TitledText & {
    kicker: string;
    /** Labels the token being traced right now. */
    tracing: string;
    /** Traced in this order; the trace ends on the last one. */
    options: [TraceOption, ...TraceOption[]];
    /** How each layer is named on the slide. */
    layers: Record<TokenLayer, string>;
    /** Names the list of steps for screen readers. */
    chainLabel: string;
    /** Heading of the last step: the token in use. */
    inUse: string;
    buttonLabel: string;
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
    system: { name: string; released: string };
    versions: { before: string; after: string };
    /** Made-up product names, one per developer in act 1. */
    products: readonly string[];
    /** What every mock product screen shows. */
    product: { balanceLabel: string; balance: string; action: string };
  };
}
