import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "../Button/Button";
import { story } from "../story.style";
import { Tag } from "../Tag/Tag";
import { Card } from "./Card";

const meta = {
  title: "Components/Card",
  component: Card,
  args: {
    as: "article",
    interactive: false,
    className: story.narrow,
    children: (
      <>
        <p className={story.eyebrow}>Case study</p>
        <h3 className={story.title}>Design system, built from zero</h3>
        <p className={story.body}>One source of truth that design and development share.</p>
        <div className={story.footer}>
          <Tag>React</Tag>
          <Tag>Storybook</Tag>
        </div>
      </>
    ),
  },
  argTypes: {
    as: { control: "inline-radio", options: ["div", "article", "li"] },
    children: { control: false },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Interactive: Story = {
  args: {
    interactive: true,
    children: (
      <>
        <h3 className={story.title}>PixelCraft</h3>
        <p className={story.body}>A pixel-art editor built for one artist.</p>
        <div className={story.footer}>
          <Button href="https://pixel-art-pi-livid.vercel.app" external variant="secondary">
            Try it live
          </Button>
        </div>
      </>
    ),
  },
};
