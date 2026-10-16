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
      options: ["md", "lg"],
      table: { type: { summary: '"md" | "lg"' }, defaultValue: { summary: "md" } },
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
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
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

export const Sizes: Story = {
  render: (args) => (
    <div className={story.row}>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};

export const ExternalLink: Story = {
  args: {
    href: "https://github.com/hugobenti/pixel-art",
    external: true,
    variant: "secondary",
    children: "View code",
  },
};

export const Download: Story = {
  args: { href: "/Hugo-Bentivegna-CV-10_2026.pdf", download: true, children: "Download CV" },
};

export const Disabled: Story = {
  args: { disabled: true, children: "Not available" },
};
