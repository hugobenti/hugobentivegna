import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { story } from "../story.style";
import { PixelField } from "./PixelField";

const meta = {
  title: "Site/PixelField",
  component: PixelField,
  args: { placement: "top-right" },
  argTypes: {
    placement: {
      control: "select",
      options: ["top-right", "bottom-left", "centre-right"],
      description:
        "Where the spill sits: below the header on the right, the opposite corner mirrored, or halfway down the right edge.",
    },
    className: { control: false },
  },
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className={story.fieldStage}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PixelField>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const TopRight: TStory = {};

export const BottomLeft: TStory = { args: { placement: "bottom-left" } };

export const CentreRight: TStory = { args: { placement: "centre-right" } };
