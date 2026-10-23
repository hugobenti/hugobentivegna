import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { story } from "../story.style";
import { TimelineAxis } from "./TimelineAxis";
import { TimelineChapter } from "./TimelineChapter";
import { entries, itau, longEntry, oneGlobal, ouribank } from "./Timeline.story.data";

const meta = {
  title: "Components/TimelineChapter",
  component: TimelineChapter,
  args: { entry: ouribank, headingLevel: 3 },
  argTypes: {
    entry: { control: "object" },
    headingLevel: {
      control: "inline-radio",
      options: [2, 3, 4],
      description: "Heading level of the company name, so the chapter fits the page outline.",
      table: { defaultValue: { summary: "3" } },
    },
    className: { description: "Layout only: margins, width." },
  },
} satisfies Meta<typeof TimelineChapter>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {};

/** A single role: the arrow between roles disappears. */
export const SingleRole: TStory = { args: { entry: oneGlobal } };

/** Two roles. */
export const TwoRoles: TStory = { args: { entry: itau } };

/** Long company, chapter, role and summary text wrap instead of overflowing. */
export const LongContent: TStory = { args: { entry: longEntry } };

/**
 * Below `md` the axis is hidden and the chapter shows a side rule with a marker. Media queries
 * follow the window, so the story loads the chapter in a phone-width frame.
 */
export const Mobile: TStory = {
  // The framed story is tested on its own; its page-level rules don't apply inside this frame.
  parameters: { a11y: { context: { exclude: ["iframe"] } } },
  render: () => (
    <iframe
      title="Chapter at phone width"
      src="iframe.html?id=components-timelinechapter--default&viewMode=story"
      className={story.phone}
    />
  ),
};

/** Axis above, one chapter per company below: what the site scrolls through step by step. */
export const Composed: TStory = {
  render: (args) => (
    <div className={story.stack}>
      <TimelineAxis entries={entries} activeIndex={1} />
      {entries.map((entry) => (
        <TimelineChapter key={entry.company} {...args} entry={entry} />
      ))}
    </div>
  ),
};
