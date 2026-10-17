import type { DesignSystemCase } from "./types";

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
    tracing: "Tracing",
    options: [
      { token: "button.primary.bg", label: "Primary fill", variant: "primary" },
      { token: "button.primary.fg", label: "Primary label", variant: "primary" },
      { token: "button.secondary.border", label: "Secondary outline", variant: "secondary" },
    ],
    chainLabel: "Token chain, from palette to component",
    layers: { primitive: "Primitive", semantic: "Semantic", component: "Component" },
    inUse: "In use",
    buttonLabel: "A real Button",
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
    system: { name: "design-system", released: "v2.0 released" },
    versions: { before: "v1.8", after: "v2.0" },
    products: ["Accounts", "Payments", "Cards", "Invest", "Exchange", "Loans"],
    product: { balanceLabel: "Balance", balance: "$ 12,480.00", action: "Continue" },
  },
};
