import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { DotNav } from "./DotNav";

const items = [
  { id: "hero", label: "Intro" },
  { id: "timeline", label: "Experience" },
  { id: "ds-thesis", label: "Design systems" },
  { id: "ai-plan", label: "AI-driven development" },
  { id: "pixelhb", label: "PixelHB" },
  { id: "contact", label: "Contact" },
];

const meta = {
  title: "Components/DotNav",
  component: DotNav,
  args: { items, activeId: "timeline", onSelect: () => {}, label: "Slides" },
  argTypes: {
    activeId: { control: "select", options: items.map((item) => item.id) },
    items: { control: false },
  },
} satisfies Meta<typeof DotNav>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {};

/** Click or tab to a dot and press Enter: the active slide follows. */
export const Interactive: TStory = {
  render: function Render(args) {
    const [activeId, setActiveId] = useState(args.activeId);
    return <DotNav {...args} activeId={activeId} onSelect={setActiveId} />;
  },
};
