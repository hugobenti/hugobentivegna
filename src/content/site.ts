import { slides } from "./slides";
import type { SiteContent } from "./types";

export const site: SiteContent = {
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
  monogram: "HB",
  homeLabel: "Hugo Bentivegna, back to the start",
  navLabel: "Primary",
  nav: [
    { label: "Experience", slideId: slides.timeline.id },
    {
      label: "Case 01 · Design systems",
      slideId: slides.dsCover.id,
      section: [slides.dsCover.id, slides.dsProblem.id, slides.dsDecision.id, slides.dsRebrand.id],
    },
    {
      label: "Case 02 · AI-assisted development",
      slideId: slides.aiCover.id,
      section: [slides.aiCover.id, slides.aiGaps.id, slides.aiFoundation.id, slides.aiBuild.id],
    },
    { label: "Projects", slideId: "pixelcraft" },
    { label: "Contact", slideId: slides.contact.id },
  ],
};
