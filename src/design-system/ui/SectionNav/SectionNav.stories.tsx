import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SectionNav } from "./SectionNav";

const items = [
  { id: "timeline", label: "Experience", href: "#timeline" },
  { id: "design-systems", label: "Case 01 · Design systems", href: "#design-systems" },
  { id: "ai-plan", label: "Case 02 · AI-driven development", href: "#ai-plan" },
  { id: "pixelcraft", label: "Projects", href: "#pixelcraft" },
  { id: "contact", label: "Contact", href: "#contact" },
];

const meta = {
  title: "Components/SectionNav",
  component: SectionNav,
  args: { items, activeId: "design-systems", label: "Primary" },
  argTypes: {
    activeId: { control: "select", options: [null, ...items.map((item) => item.id)] },
    items: { control: false },
  },
} satisfies Meta<typeof SectionNav>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {};

/** Before the first section (the intro): nothing is current. */
export const NoneActive: TStory = { args: { activeId: null } };
