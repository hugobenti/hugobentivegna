import type { ThemeName, TokenLayer } from "@/design-system/tokens";
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

/** The themes the rebrand slide offers: the made-up rebrands plus the site's own. */
export type RebrandTheme = Extract<ThemeName, "midnight" | "solar" | "forest">;

/** A made-up product screen, built from kit components to show a rebrand. */
export interface ProductMock {
  brand: string;
  status: string;
  title: string;
  body: string;
  tags: string[];
  primaryAction: string;
  secondaryAction: string;
  /** Tells screen-reader users what the (non-interactive) mock shows. */
  caption: string;
}

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
  rebrand: TitledText & {
    kicker: string;
    /** Says the themes are made up. */
    note: string;
    switchLabel: string;
    options: { value: RebrandTheme; label: string }[];
    product: ProductMock;
  };
}
