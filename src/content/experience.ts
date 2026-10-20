import type { IExperienceContent } from "./content.type";

export const experience: IExperienceContent = {
  title: "Experience",
  entries: [
    {
      id: "itau",
      company: "Itaú Unibanco",
      start: "2020-01",
      end: "2022-05",
      chapter: "Shipping UI at bank scale",
      roles: [
        { title: "IT Analyst", start: "2020-01" },
        { title: "IT Engineer", start: "2021-02" },
      ],
      summary: "Monitoring portals and internal tools; micro-frontends.",
      stack: ["Angular", "RxJS", "TypeScript", "Java"],
    },
    {
      id: "ouribank",
      company: "Ouribank",
      start: "2022-05",
      end: "2025-10",
      chapter: "Building the system others build on",
      roles: [
        { title: "Front-End Developer", start: "2022-05" },
        { title: "Senior", start: "2023-07" },
        { title: "Front-End Architect", start: "2024-03" },
      ],
      summary: "From the first design system to front-end architecture.",
      stack: ["React", "Storybook", "Tailwind CSS", "Vite"],
    },
    {
      id: "oneglobal",
      company: "1global",
      start: "2025-11",
      // Hugo left in 2026; month to confirm.
      end: "2026-10",
      chapter: "Systems for people and AI agents",
      roles: [{ title: "Senior Software Engineer", start: "2025-11" }],
      summary: "IoT portal, AI-driven development.",
      stack: ["Next.js", "Playwright", "Claude Code", "MCP"],
    },
  ],
};
