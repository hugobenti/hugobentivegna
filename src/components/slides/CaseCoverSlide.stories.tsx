import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ICaseCover } from "@/content/content.type";
import { story } from "../story.style";
import { CaseCoverSlide } from "./CaseCoverSlide";
import { COMPUTER, LOCKUP } from "./pixelhb/pixelArt.data";
import { PixelArt } from "./pixelhb/PixelArt";

const cover: ICaseCover = {
  kicker: "Case study · Sample",
  title: "A sample product, rebuilt around the people who use it.",
  body: "Two sentences of context: what the product was, and what changed once the interface stopped getting in the way.",
  meta: [
    { label: "When", value: "2024" },
    { label: "Role", value: "Lead front-end engineer" },
    { label: "Stack", value: "React, TypeScript, Storybook" },
  ],
  chapters: [
    { number: "01", label: "Find the problem" },
    { number: "02", label: "Build the system" },
    { number: "03", label: "Ship it" },
  ],
};

const meta = {
  title: "Site/CaseCoverSlide",
  component: CaseCoverSlide,
  args: { slide: { id: "sample-case", label: "Sample case" }, cover },
  argTypes: {
    slide: { description: "The slide's anchor id (its URL hash) and its name in the navigation." },
    cover: { description: "Kicker, title, body, three meta items and the chapters ahead." },
    mark: { control: false, description: "Optional logo shown above the kicker." },
    aside: {
      control: false,
      description: "Optional picture beside the copy from `lg` up, below it on smaller screens.",
    },
  },
  decorators: [
    (Story) => (
      <div className={story.slideStage}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CaseCoverSlide>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {};

export const WithMark: TStory = {
  args: { mark: <PixelArt grid={LOCKUP} label="Sample logo" size="lockup" /> },
};

export const WithMarkAndAside: TStory = {
  args: {
    mark: <PixelArt grid={LOCKUP} label="Sample logo" size="lockup" />,
    aside: <PixelArt grid={COMPUTER} label="A pixel drawing of a computer" size="drawing" />,
  },
};
