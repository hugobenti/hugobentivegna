import type { DesignSystemCase } from "./types";

/** Design-system case: this site's own system is the exhibit. No metrics (spec §4.3). */
export const designSystemCase: DesignSystemCase = {
  thesis: {
    kicker: "Case · Design systems",
    statement:
      "A well-documented design system is the source of truth that connects design and development.",
    pillars: [
      {
        title: "Centralized",
        body: "One set of tokens and components, so every team ships the same decisions.",
      },
      {
        title: "Standardized",
        body: "Documented usage, so a pattern means the same thing on every screen.",
      },
      {
        title: "Built for the end user",
        body: "Polish and accessibility live in the parts, not in each screen.",
      },
    ],
    context:
      "I've built design systems like this at Ouribank and 1global. This site runs on one, and the next slides take it apart.",
  },
  trace: {
    kicker: "Tokens you can follow",
    title: "From palette to button, every color has a name.",
    body: "Components never use raw colors. They point to a semantic role, and the role points to a palette value. Pick a token and follow it through the layers.",
    pickerLabel: "Token to trace",
    options: [
      { token: "button.primary.bg", label: "Primary fill", variant: "primary" },
      { token: "button.primary.fg", label: "Primary label", variant: "primary" },
      { token: "button.secondary.bg", label: "Secondary fill", variant: "secondary" },
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
