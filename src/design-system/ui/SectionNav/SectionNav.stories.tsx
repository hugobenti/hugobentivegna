import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { story } from "../story.style";
import { SectionNav } from "./SectionNav";

const items = [
  { id: "timeline", label: "Experience", href: "#timeline" },
  { id: "design-systems", label: "Case 01 · Design systems", href: "#design-systems" },
  { id: "ai-plan", label: "Case 02 · AI-driven development", href: "#ai-plan" },
  { id: "pixelhb", label: "Projects", href: "#pixelhb" },
  { id: "contact", label: "Contact", href: "#contact" },
];

const meta = {
  title: "Components/SectionNav",
  component: SectionNav,
  args: { items, activeId: "design-systems", label: "Primary" },
  argTypes: {
    items: { control: "object", description: "One `{ id, label, href }` per section, in order." },
    activeId: {
      control: "select",
      options: [null, ...items.map((item) => item.id)],
      description: "id of the section the visitor is in, or `null` when they're in none.",
    },
    label: {
      control: "text",
      description: "Name of the navigation landmark.",
      table: { defaultValue: { summary: "Sections" } },
    },
  },
} satisfies Meta<typeof SectionNav>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {};

/** Before the first section (the intro): nothing is current. */
export const NoneActive: TStory = { args: { activeId: null } };

/** Click a link: it becomes the active section, as it does while the visitor scrolls. */
export const Interactive: TStory = {
  render: function Render(args) {
    const [activeId, setActiveId] = useState(args.activeId);
    return (
      <div
        onClick={(event) => {
          const link = (event.target as HTMLElement).closest("a");
          if (!link) return;
          event.preventDefault();
          setActiveId(link.getAttribute("href")?.slice(1) ?? null);
        }}
      >
        <SectionNav {...args} activeId={activeId} />
      </div>
    );
  },
};

/**
 * On a phone-width screen the row scrolls sideways and keeps the active link in view. Media
 * queries follow the window, so the story loads the nav in a phone-width frame with the last
 * section active.
 */
export const Narrow: TStory = {
  // The framed story is tested on its own; its page-level rules don't apply inside this frame.
  parameters: { a11y: { context: { exclude: ["iframe"] } } },
  render: () => (
    <iframe
      title="Section navigation at phone width"
      src="iframe.html?id=components-sectionnav--default&viewMode=story&args=activeId:contact"
      className={story.phoneShort}
    />
  ),
};
