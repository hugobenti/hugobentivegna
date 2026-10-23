import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { story } from "../story.style";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  args: { children: "Get in touch", variant: "primary", size: "md" },
  argTypes: {
    children: { description: "Visible label and accessible name. Keep it short and verb-first." },
    variant: {
      control: "inline-radio",
      options: ["primary", "secondary", "ghost"],
      description: "Visual weight. One `primary` per view.",
      table: {
        type: { summary: '"primary" | "secondary" | "ghost"' },
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      description: "`sm` for compact controls such as pause and replay.",
      table: { type: { summary: '"sm" | "md" | "lg"' }, defaultValue: { summary: "md" } },
    },
    href: {
      control: "text",
      description: "Renders an `<a>`. Use it whenever the action navigates or downloads.",
      table: { type: { summary: "string" } },
    },
    external: {
      control: "boolean",
      description:
        'With `href`: opens a new tab with `rel="noopener noreferrer"` and announces it.',
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    download: {
      control: "boolean",
      description: "With `href`: downloads the file instead of opening it.",
      table: { type: { summary: "boolean | string" } },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {};

export const Variants: TStory = {
  render: (args) => (
    <div className={story.row}>
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
    </div>
  ),
};

export const Sizes: TStory = {
  render: (args) => (
    <div className={story.row}>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};

export const ExternalLink: TStory = {
  args: {
    href: "https://github.com/hugobenti/pixelHB",
    external: true,
    variant: "secondary",
    children: "View code",
  },
};

export const Download: TStory = {
  args: { href: "/Hugo-Bentivegna-CV-10_2026.pdf", download: true, children: "Download CV" },
};

export const Disabled: TStory = {
  args: { disabled: true, children: "Not available" },
};
