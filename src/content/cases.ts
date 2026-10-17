import type { DesignSystemCase } from "./types";

/** Design-system case: the real story, told without naming the company (spec 2026-10-17). */
export const designSystemCase: DesignSystemCase = {
  problem: {
    kicker: "Case · Design systems",
    title: "Figma had the screens. Code had copies.",
    body: "At a digital bank with 5+ products, the design team kept every screen in Figma. In code, each project rebuilt the same components, so every change had to be made once per product.",
  },
  decision: {
    kicker: "One system, built together",
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
    kicker: "Live rebrand",
    title: "Rebrand the slide without touching a component.",
    body: "The switch changes one attribute. The semantic layer takes new values and every component here follows. It mirrors how a company-wide rebrand ships through a design system.",
    note: "Solar and Forest are made-up brands for this demo.",
    switchLabel: "Theme for this slide",
    options: [
      { value: "midnight", label: "Midnight" },
      { value: "solar", label: "Solar" },
      { value: "forest", label: "Forest" },
    ],
    product: {
      brand: "Northwind",
      status: "Ready",
      title: "Your release is ready to publish",
      body: "Review the changes, then ship them to every team at once.",
      tags: ["Tokens", "Components", "Docs"],
      primaryAction: "Publish",
      secondaryAction: "Preview",
      caption:
        "A made-up product screen built from the kit's Card, Tag and Button, shown in the selected theme.",
    },
  },
};
