import type { AiCase, DesignSystemCase } from "./types";

/** Design-system case: the real story, told without naming the company (spec 2026-10-17). */
export const designSystemCase: DesignSystemCase = {
  cover: {
    kicker: "Case study · Design systems",
    title: "The design system behind a digital bank's 5+ products.",
    body: "How design and code became one system, and what happened when the brand changed.",
    meta: [
      { label: "When", value: "2022 – 2025" },
      { label: "My role", value: "Built it, then scaled it as front-end architect" },
      { label: "With", value: "The design team and product squads" },
    ],
    chapters: [
      { number: "01", label: "The problem" },
      { number: "02", label: "One system" },
      { number: "03", label: "The rebrand" },
    ],
  },
  problem: {
    kicker: "01 · The problem",
    title: "Figma had the screens. Code had copies.",
    body: "At a digital bank with 5+ products, the design team kept every screen in Figma. In code, each project rebuilt the same components, so every change had to be made once per product.",
  },
  decision: {
    kicker: "02 · One system, built together",
    title:
      "A well-documented design system is the source of truth that connects design and development.",
    body: "As the components matured in code, the Figma library matured with them. Colors and type kept the same names on both sides, and I was the engineering voice in design discussions.",
    tokensLabel: "Tokens the button is built from",
    groups: [
      { label: "Shape", tokens: [{ token: "button.radius" }] },
      { label: "Color", tokens: [{ token: "button.primary.bg" }, { token: "button.primary.fg" }] },
      {
        label: "Typography",
        tokens: [
          { token: "font.body", display: "Inter Tight" },
          { token: "font.size.small" },
          { token: "font.weight.medium" },
        ],
      },
    ],
    steps: [
      { part: "shape", caption: "Shape", tokens: ["button.radius"] },
      { part: "fill", caption: "Fill", tokens: ["button.primary.bg"] },
      { part: "label", caption: "Label", tokens: ["button.primary.fg"] },
      {
        part: "type",
        caption: "Type",
        tokens: ["font.body", "font.size.small", "font.weight.medium"],
      },
    ],
    buttonLabel: "Continue",
    done: "Every value is a named token, shared with Figma.",
  },
  rebrand: {
    kicker: "03 · The rebrand",
    title: "Then the brand changed, across 5+ products.",
    lead: "A dark theme had already tested the names. The rebrand was the real one.",
    closing: "The squads updated a version and fixed a few details in their page CSS.",
    acts: {
      without: {
        label: "Without a design system",
        title: "The same rebrand, done six times.",
        summary:
          "Without a design system, a developer on each product makes the same rebrand by hand.",
      },
      with: {
        label: "With the design system",
        title: "Done once. Every product follows.",
        summary:
          "With the design system, one developer changes it once, releases a new version, and every product updates.",
      },
    },
    developers: { without: "6 developers", with: "1 developer" },
    rebrandedLabel: "products rebranded",
    controls: { pause: "Pause", play: "Play", replay: "Replay" },
    system: {
      name: "design-system",
      released: "v2.0 released",
      missing: "No shared component library",
    },
    versions: { before: "v1.8", after: "v2.0" },
    products: ["Accounts", "Payments", "Cards", "Invest", "Exchange", "Loans"],
    product: { balanceLabel: "Balance", balance: "$ 12,480.00", action: "Continue" },
  },
};

/** AI case: how the IoT portal's front-end was set up for AI agents, company not named (spec 2026-10-19). */
export const aiCase: AiCase = {
  cover: {
    kicker: "Case study · AI-assisted development",
    title: "A front-end built for two readers: engineers and AI agents.",
    body: "How I set up a new IoT portal so AI could help build it, fast and on-pattern.",
    meta: [
      { label: "When", value: "2025 – 2026" },
      { label: "My role", value: "Built the UI Kit foundation and the portal's pages" },
      { label: "With", value: "Product, backend teams and AI agents" },
    ],
    chapters: [
      { number: "01", label: "Find the gaps" },
      { number: "02", label: "Lay the foundation" },
      { number: "03", label: "Build on it" },
    ],
  },
  controls: { pause: "Pause", play: "Play", replay: "Replay" },
  gaps: {
    kicker: "01 · Find the gaps",
    title: "Before writing code, I asked what was missing.",
    body: "Through MCP, an AI agent read the product docs, the tech spec and the company's Git repositories. Checking the real code, not just the docs, showed exactly what each screen needed, what the API already did, and what was missing: endpoints, data, filters.",
    feature: "Feature · Devices",
    illustration: "Illustration",
    sources: [
      { label: "Product docs", reading: "Reading what product expects…" },
      { label: "Tech spec", reading: "Reading what the tech spec planned…" },
      {
        label: "Git repositories",
        badge: "MCP",
        reading: "Checking the code in the Git repositories…",
      },
    ],
    checksLabel: "What product expects for the Devices feature",
    checks: [
      {
        expectation: "A list of every device",
        result: "ready",
        badge: "Ready",
        reason: "Planned in the spec and served by the API.",
      },
      {
        expectation: "Filter by several statuses at once",
        result: "gap",
        badge: "Filter limit",
        reason: "The API accepts one status per request.",
      },
      {
        expectation: "Data used this month, per device",
        result: "gap",
        badge: "Data not planned",
        reason: "Product expects it; the tech spec never planned it.",
      },
      {
        expectation: "A history page for each device",
        result: "gap",
        badge: "Missing endpoint",
        reason: "The spec describes it; the code has no route for it yet.",
      },
    ],
    done: "Three gaps found before any code was written.",
  },
};
