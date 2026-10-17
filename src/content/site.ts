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
  nav: [
    { label: "Work", slideId: "timeline" },
    { label: "Projects", slideId: "pixelcraft" },
    { label: "Contact", slideId: "contact" },
  ],
};
