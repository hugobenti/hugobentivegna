import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Timeline, type TimelineEntry } from "./Timeline";

// Story data mirrors the site's experience content; the design system can't import src/content.
const entries: TimelineEntry[] = [
  {
    period: "2020–2022",
    company: "Itaú Unibanco",
    roles: ["IT Analyst", "IT Engineer"],
    summary: "Monitoring portals, Angular, micro-frontends.",
  },
  {
    period: "2022–2025",
    company: "Ouribank",
    roles: ["Front-End Developer", "Senior", "Front-End Architect"],
    summary: "From the first design system to front-end architecture.",
  },
  {
    period: "2025–now",
    company: "1global",
    roles: ["Senior Software Engineer"],
    summary: "IoT portal, AI-driven development.",
  },
];

const meta = {
  title: "Components/Timeline",
  component: Timeline,
  args: { entries, headingLevel: 3 },
  argTypes: {
    entries: { control: false },
    headingLevel: { control: "inline-radio", options: [2, 3, 4] },
  },
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleRole: Story = {
  args: { entries: entries.slice(2) },
};
