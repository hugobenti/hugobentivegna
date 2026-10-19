import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { ThemeSwitch } from "./ThemeSwitch";

const options = [
  { value: "midnight", label: "Midnight" },
  { value: "pixel", label: "Pixel" },
  { value: "system", label: "System" },
];

const meta = {
  title: "Components/ThemeSwitch",
  component: ThemeSwitch,
  args: { label: "Brand", options, value: "midnight", onChange: () => {} },
  argTypes: {
    value: { control: "inline-radio", options: options.map((option) => option.value) },
    options: { control: false },
  },
} satisfies Meta<typeof ThemeSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Tab into the group, then use the arrow keys: the selection follows. */
export const Interactive: Story = {
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    return <ThemeSwitch {...args} value={value} onChange={setValue} />;
  },
};
