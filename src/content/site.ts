import { slides } from "./slides";
import type { ISiteContent } from "./content.type";

export const site: ISiteContent = {
  siteUrl: "https://hugobentivegna.vercel.app",
  domain: "hugobentivegna.vercel.app",
  storybookUrl: "https://hugobentivegna-storybook.vercel.app",
  name: "Hugo Bentivegna",
  role: "Senior Software Engineer",
  location: "São Paulo",
  kicker: "Hugo Bentivegna · Senior Software Engineer · São Paulo",
  headline: {
    lead: "High-quality UI,",
    accent: "built for the people",
    tail: "who use it.",
  },
  supportLine: "Design systems · Front-end architecture · AI agents",
  intro: "I'm Hugo Bentivegna, a senior software engineer in São Paulo.",
  heroCases: [
    {
      number: "01",
      label: "Design systems",
      outcome: "A rebrand across 5+ products, shipped as one version bump.",
      slideId: slides.dsCover.id,
    },
    {
      number: "02",
      label: "AI-assisted development",
      outcome: "Repository rules and lint that let AI agents build on the same patterns.",
      slideId: slides.aiCover.id,
    },
    {
      number: "03",
      label: "PixelHB",
      outcome: "A pixel-art editor, from brand to browser, built on my own.",
      slideId: slides.pixelCover.id,
    },
  ],
  monogram: "HB",
  homeLabel: "HB, Hugo Bentivegna: back to the start",
  navLabel: "Primary",
  dotsLabel: "Sections",
  playback: { pause: "Pause", play: "Play", replay: "Replay" },
  nav: [
    { label: "Experience", slideId: slides.timeline.id },
    {
      label: "Case 01 · Design systems",
      shortLabel: "01 · Design systems",
      slideId: slides.dsCover.id,
      section: [slides.dsCover.id, slides.dsProblem.id, slides.dsDecision.id, slides.dsRebrand.id],
    },
    {
      label: "Case 02 · AI-assisted development",
      shortLabel: "02 · AI",
      slideId: slides.aiCover.id,
      section: [slides.aiCover.id, slides.aiGaps.id, slides.aiFoundation.id, slides.aiBuild.id],
    },
    {
      label: "Case 03 · PixelHB",
      shortLabel: "03 · PixelHB",
      slideId: slides.pixelCover.id,
      section: [slides.pixelCover.id, slides.pixelExact.id],
    },
    { label: "Contact", slideId: slides.contact.id },
  ],
};
