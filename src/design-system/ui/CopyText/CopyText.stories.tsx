import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { story } from "../story.style";
import { CopyText } from "./CopyText";

const meta = {
  title: "Components/CopyText",
  component: CopyText,
  args: { text: "hugobenti@gmail.com" },
  decorators: [
    // Room above the text so the hint has space to appear.
    (Story) => (
      <div className={story.hintRoom}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CopyText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Click it: the clipboard is unavailable here, so the text gets selected with a shortcut hint. */
export const ClipboardBlocked: Story = {
  beforeEach: () => {
    // Shadow the Clipboard API for this story only; deleting the own property restores it.
    Object.defineProperty(navigator, "clipboard", { value: undefined, configurable: true });
    return () => {
      Reflect.deleteProperty(navigator, "clipboard");
    };
  },
};
