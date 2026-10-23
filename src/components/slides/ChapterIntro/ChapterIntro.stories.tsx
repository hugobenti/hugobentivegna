import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { story } from "@/design-system/ui/story.style";
import { ChapterIntro } from "./ChapterIntro";

const meta = {
  title: "Site/ChapterIntro",
  component: ChapterIntro,
  args: {
    kicker: "01 · Find the gaps",
    title: "The agent reads before it writes.",
    body: "Before any work starts, it compares the product docs, the tech spec and the code.",
  },
  argTypes: {
    kicker: { description: "Chapter number and name, in mono caps." },
    title: { description: "The headline. Rendered as an `h2`." },
    body: { description: "One or two sentences." },
  },
  decorators: [
    (Story) => (
      <div className={story.column}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChapterIntro>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {};

export const LongTitle: TStory = {
  args: { title: "A long headline wraps and stays balanced across the lines it needs." },
};
