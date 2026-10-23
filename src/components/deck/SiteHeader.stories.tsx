import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { story } from "../story.style";
import { SiteHeader } from "./SiteHeader";

const sections = [
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "cases", label: "Cases", href: "#cases" },
  { id: "contact", label: "Contact", href: "#contact" },
];

const meta = {
  title: "Site/SiteHeader",
  component: SiteHeader,
  args: { homeHref: "#intro", sections, activeSection: "cases" },
  argTypes: {
    homeHref: { description: "Where the monogram leads: the first slide." },
    sections: { description: "The header links; each has an `id`, a `label` and an `href`." },
    activeSection: {
      description: "`id` of the section in view, or `null` on slides outside every section.",
    },
  },
  decorators: [
    (Story) => (
      <div className={story.headerStage}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SiteHeader>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {};

export const NoneActive: TStory = { args: { activeSection: null } };

export const Narrow: TStory = {
  decorators: [
    (Story) => (
      <div className={story.narrow}>
        <Story />
      </div>
    ),
  ],
};
