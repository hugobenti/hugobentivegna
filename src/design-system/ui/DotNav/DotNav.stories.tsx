import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import { DotNav } from "./DotNav";

const items = [
  { id: "hero", label: "Intro" },
  { id: "timeline", label: "Experience" },
  { id: "ds-thesis", label: "Design systems" },
  { id: "ai-plan", label: "AI-driven development" },
  { id: "pixelhb", label: "PixelHB" },
  { id: "contact", label: "Contact" },
];

const manyItems = Array.from({ length: 12 }, (_, index) => ({
  id: `slide-${index + 1}`,
  label: `Section ${index + 1}`,
}));

const meta = {
  title: "Components/DotNav",
  component: DotNav,
  args: { items, activeId: "timeline", onSelect: fn(), label: "Slides" },
  argTypes: {
    items: { control: "object", description: "One `{ id, label }` per slide, in order." },
    activeId: {
      control: "select",
      options: items.map((item) => item.id),
      description: "id of the slide currently in view.",
    },
    onSelect: {
      description:
        "Called with the id of the dot the visitor picked. Scrolling is the caller's job.",
    },
    label: {
      control: "text",
      description: "Name of the navigation landmark.",
      table: { defaultValue: { summary: "Slides" } },
    },
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

/** The first slide is current. */
export const FirstActive: TStory = { args: { activeId: "hero" } };

/** The last slide is current. */
export const LastActive: TStory = { args: { activeId: "contact" } };

/** Twelve slides: past about ten, dots stop being readable and a labelled menu fits better. */
export const Many: TStory = { args: { items: manyItems, activeId: "slide-6" } };
