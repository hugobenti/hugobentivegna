import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { story } from "../story.style";
import { TimelineAxis } from "./TimelineAxis";
import { TimelineChapter } from "./TimelineChapter";
import type { ITimelineEntry } from "./TimelineChapter.type";

// Story data mirrors the site's experience content; the design system can't import src/content.
const entries: ITimelineEntry[] = [
  {
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
    company: "1global",
    start: "2025-11",
    end: "2026-10",
    chapter: "Systems for people and AI agents",
    roles: [{ title: "Senior Software Engineer", start: "2025-11" }],
    summary: "IoT portal, AI-driven development.",
    stack: ["Next.js", "Playwright", "Claude Code", "MCP"],
  },
];

const meta = {
  title: "Components/Timeline",
  component: TimelineAxis,
  args: { entries, activeIndex: 1 },
  argTypes: {
    entries: { control: false },
    activeIndex: { control: { type: "range", min: 0, max: entries.length - 1, step: 1 } },
  },
} satisfies Meta<typeof TimelineAxis>;

export default meta;
type TStory = StoryObj<typeof meta>;

/** Move `activeIndex`: the line fills to that company and its dots light up. */
export const Axis: TStory = {};

/** Without `activeIndex`, the axis is static and fully filled. */
export const StaticAxis: TStory = {
  args: { activeIndex: undefined },
};

export const Chapter: TStory = {
  render: () => <TimelineChapter entry={entries[1] as ITimelineEntry} />,
};

/** Axis above, one chapter per company below: what the site scrolls through step by step. */
export const Composed: TStory = {
  render: (args) => (
    <div className={story.stack}>
      <TimelineAxis {...args} />
      {entries.map((entry) => (
        <TimelineChapter key={entry.company} entry={entry} />
      ))}
    </div>
  ),
};
