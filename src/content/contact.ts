import { site } from "./site";
import type { IContactContent, INotFoundContent } from "./content.type";

const email = "hugobenti@gmail.com";

export const contact: IContactContent = {
  kicker: "Contact",
  title: "Let's build something people enjoy using.",
  intro:
    "Based in São Paulo, working in English and Portuguese. Email is the fastest way to reach me.",
  email,
  emailAction: { label: "Send an email", href: `mailto:${email}` },
  profiles: [
    { label: "LinkedIn", href: "https://linkedin.com/in/hugo-bentivegna" },
    { label: "GitHub", href: "https://github.com/hugobenti" },
  ],
  cv: { label: "Download CV", href: "/Hugo-Bentivegna-CV-10_2026.pdf" },
  credit: `Designed and built by ${site.name} on its own design system.`,
  storybook: { label: "Explore the design system", href: site.storybookUrl },
};

export const notFound: INotFoundContent = {
  code: "404",
  title: "This slide doesn't exist.",
  body: "The link may be old, or the page moved. Everything lives on the home deck.",
  back: { label: "Back to the start", href: "/" },
};
