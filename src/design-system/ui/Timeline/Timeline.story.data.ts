import type { ITimelineEntry } from "./TimelineChapter.type";

// Story data mirrors the site's experience content; the design system can't import src/content.
export const itau: ITimelineEntry = {
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
};

export const ouribank: ITimelineEntry = {
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
};

export const oneGlobal: ITimelineEntry = {
  company: "1global",
  start: "2025-11",
  end: "2026-10",
  chapter: "Systems for people and AI agents",
  roles: [{ title: "Senior Software Engineer", start: "2025-11" }],
  summary: "IoT portal, AI-driven development.",
  stack: ["Next.js", "Playwright", "Claude Code", "MCP"],
};

export const entries: ITimelineEntry[] = [itau, ouribank, oneGlobal];

/** Names and copy far longer than any real entry, to check wrapping. */
export const longEntry: ITimelineEntry = {
  company: "International Business Machines Corporation Brasil Serviços de Tecnologia Ltda.",
  start: "2022-05",
  end: "2025-10",
  chapter: "Rebuilding the whole customer-facing platform while keeping every legacy screen alive",
  roles: [
    { title: "Senior Front-End Software Engineer and Design System Lead", start: "2022-05" },
    { title: "Principal Front-End Architect, Platform Experience", start: "2024-03" },
  ],
  summary:
    "A long summary that keeps going so the reading width and the wrapping of the paragraph can be checked: it covers the platform, the design system, the migration plan and the training of the teams.",
  stack: ["TypeScript", "React", "Next.js", "Storybook", "Tailwind CSS", "Playwright", "Vitest"],
};
