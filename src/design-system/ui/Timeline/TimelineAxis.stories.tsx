import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TimelineAxis } from "./TimelineAxis";
import { entries, ouribank } from "./Timeline.story.data";

const meta = {
  title: "Components/TimelineAxis",
  component: TimelineAxis,
  args: { entries, activeIndex: 1 },
  argTypes: {
    entries: { control: "object" },
    activeIndex: { control: { type: "range", min: 0, max: entries.length - 1, step: 1 } },
    className: { description: "Layout only: margins, width." },
  },
} satisfies Meta<typeof TimelineAxis>;

export default meta;
type TStory = StoryObj<typeof meta>;

/** Move `activeIndex`: the line fills to that company and its dots light up. */
export const Default: TStory = {};

/** The first company is current: nothing is past yet. */
export const FirstActive: TStory = { args: { activeIndex: 0 } };

/** The last company is current: the line is full and every earlier span is past. */
export const LastActive: TStory = { args: { activeIndex: entries.length - 1 } };

/** Without `activeIndex`, the axis is static and fully filled. */
export const Static: TStory = { args: { activeIndex: undefined } };

/** One company: a single span and one dot per role. */
export const SingleEntry: TStory = { args: { entries: [ouribank], activeIndex: 0 } };
