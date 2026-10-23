import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { story } from "../story.style";
import { button } from "./Button.style";
import { Button } from "./Button";

const onClick = fn();
const onSubmit = fn();
const variants = Object.keys(button.variant);
const sizes = Object.keys(button.size);

const meta = {
  title: "Components/Button",
  component: Button,
  args: { children: "Get in touch", variant: "primary", size: "md", onClick },
  argTypes: {
    children: { description: "Visible label and accessible name. Keep it short and verb-first." },
    variant: {
      control: "inline-radio",
      options: variants,
      table: { defaultValue: { summary: "primary" } },
    },
    size: {
      control: "inline-radio",
      options: sizes,
      description: "`sm` (32 px) for compact controls such as pause and replay.",
      table: { defaultValue: { summary: "md" } },
    },
    href: {
      control: "text",
      description: "Renders an `<a>`. Use it whenever the action navigates or downloads.",
    },
    external: {
      control: "boolean",
      description:
        'With `href`: opens a new tab with `rel="noopener noreferrer"` and announces it.',
      table: { defaultValue: { summary: "false" } },
    },
    download: {
      control: "boolean",
      description: "With `href`: downloads the file instead of opening it.",
    },
    disabled: {
      control: "boolean",
      description: "Buttons only. A link can't be disabled: render a `<button>` or omit it.",
      table: { defaultValue: { summary: "false" } },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {};

export const Variants: TStory = {
  render: (args) => (
    <div className={story.row}>
      {variants.map((variant) => (
        <Button key={variant} {...args} variant={variant as typeof args.variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

export const Sizes: TStory = {
  render: (args) => (
    <div className={story.row}>
      {sizes.map((size) => (
        <Button key={size} {...args} size={size as typeof args.size}>
          {size}
        </Button>
      ))}
    </div>
  ),
};

/** Every variant at every size, enabled and disabled. */
export const Matrix: TStory = {
  render: () => (
    <div className={story.matrix}>
      {[false, true].map((disabled) => (
        <section key={String(disabled)}>
          <h3 className={story.caption}>{disabled ? "Disabled" : "Enabled"}</h3>
          <div className={story.matrix}>
            {variants.map((variant) => (
              <div key={variant} className={story.row}>
                {sizes.map((size) => (
                  <Button
                    key={size}
                    onClick={onClick}
                    disabled={disabled}
                    variant={variant as keyof typeof button.variant}
                    size={size as keyof typeof button.size}
                  >
                    {variant} {size}
                  </Button>
                ))}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};

/** Tab to the button: the focus ring from the `focus-ring` tokens (2 px, 3 px offset). */
export const Focus: TStory = {
  render: (args) => (
    <div className={story.row}>
      {variants.map((variant) => (
        <Button key={variant} {...args} variant={variant as typeof args.variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.tab();
    await expect(within(canvasElement).getAllByRole("button")[0]).toHaveFocus();
  },
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
  args: { href: "#", download: "example.pdf", children: "Download file" },
};

/** Disabled is a native `<button>` state. A link has no disabled state: see the usage guide. */
export const Disabled: TStory = {
  args: { disabled: true, children: "Not available" },
};

/** Inside a form it must say so: `type="submit"` (the default is `type="button"`). */
export const Submit: TStory = {
  args: { type: "submit", children: "Send message" },
  decorators: [
    (Story) => (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <Story />
      </form>
    ),
  ],
};
