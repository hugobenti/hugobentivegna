import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { story } from "../story.style";
import { Tag } from "./Tag";

const meta = {
  title: "Components/Tag",
  component: Tag,
  args: { children: "React" },
} satisfies Meta<typeof Tag>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {};

export const Group: TStory = {
  render: () => (
    <ul className={story.list} aria-label="Technologies">
      {["React", "Next.js", "TypeScript", "Storybook", "Accessibility"].map((name) => (
        <li key={name}>
          <Tag>{name}</Tag>
        </li>
      ))}
    </ul>
  ),
};
