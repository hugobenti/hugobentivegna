import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { story } from "../story.style";
import { OgCard } from "./OgCard";

const meta = {
  title: "Site/OgCard",
  component: OgCard,
  parameters: { controls: { disable: true } },
  decorators: [
    (Story) => (
      <div className={story.ogViewport}>
        <div className={story.ogScaled}>
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof OgCard>;

export default meta;
type TStory = StoryObj<typeof meta>;

/** The card at half size: it is rendered at 1200 × 630, the size `opengraph-image` gives next/og. */
export const Default: TStory = {};
