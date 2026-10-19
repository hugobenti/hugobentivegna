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
  supportLine: "Design systems · Accessibility · AI-assisted development",
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
    // Shows up on its own once these slides exist (planned ids, spec §4.4).
    {
      label: "Case 02 · AI-driven development",
      slideId: "ai-plan",
      section: ["ai-plan", "ai-loop", "ai-proof"],
    },
    { label: "Projects", slideId: "pixelcraft" },
    { label: "Contact", slideId: slides.contact.id },
  ],
};
