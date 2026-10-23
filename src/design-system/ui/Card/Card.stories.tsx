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
    children: (
      <>
        <p className={story.eyebrow}>Case study</p>
        <h3 className={story.title}>Design system, built from zero</h3>
        <p className={story.body}>One source of truth that design and development share.</p>
        <ul className={story.footer} aria-label="Technologies">
          {["React", "Storybook"].map((name) => (
            <li key={name}>
              <Tag>{name}</Tag>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  argTypes: {
    as: { control: "inline-radio", options: ["div", "article", "li"] },
    children: { control: false },
  },
  decorators: [
    // Layout stays outside the component's args, so Controls only lists real props.
    (Story) => (
      <div className={story.narrow}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {};

export const Interactive: TStory = {
  args: {
    interactive: true,
    children: (
      <>
        <h3 className={story.title}>PixelHB</h3>
        <p className={story.body}>A pixel-art editor built for one artist.</p>
        <div className={story.footer}>
          <Button href="https://pixelhb.vercel.app" external variant="secondary">
            Try it live
          </Button>
        </div>
      </>
    ),
  },
};

/** Cards in a list: `as="li"` inside a `ul`, so assistive tech announces "list, 2 items". */
export const ListItem: TStory = {
  render: () => (
    <ul className={story.cards} aria-label="Case studies">
      {["Design system, built from zero", "AI-driven development"].map((title) => (
        <Card key={title} as="li">
          <h3 className={story.title}>{title}</h3>
          <p className={story.body}>One source of truth that design and development share.</p>
        </Card>
      ))}
    </ul>
  ),
};
