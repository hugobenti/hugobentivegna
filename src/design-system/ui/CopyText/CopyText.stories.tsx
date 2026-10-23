import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { story } from "../story.style";
import { CopyText } from "./CopyText";

const meta = {
  title: "Components/CopyText",
  component: CopyText,
  args: { text: "hugobenti@gmail.com" },
  argTypes: {
    text: { control: "text", description: "The text shown and copied, e.g. an email address." },
    hint: {
      control: "text",
      description: "Shown on hover and focus; also the control's accessible description.",
      table: { defaultValue: { summary: "Click to copy" } },
    },
    copiedHint: {
      control: "text",
      description: "Shown and announced after a successful copy.",
      table: { defaultValue: { summary: "Copied" } },
    },
    failedHint: {
      control: "text",
      description:
        "Shown and announced when copying isn't possible; the text is selected for manual copying.",
      table: { defaultValue: { summary: "Selected — press Ctrl+C (⌘C on Mac)" } },
    },
  },
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
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {};

/** Replaces the Clipboard API for one story; the returned cleanup restores the original. */
function stubClipboard(value: Pick<Clipboard, "writeText"> | undefined) {
  Object.defineProperty(navigator, "clipboard", { value, configurable: true });
  return () => {
    Reflect.deleteProperty(navigator, "clipboard");
  };
}

const writeText = fn().mockResolvedValue(undefined);

/** The hint is hidden until hover or keyboard focus; this story tabs to the text to show it. */
export const HintVisible: TStory = {
  play: async ({ canvasElement }) => {
    await userEvent.tab();
    await expect(within(canvasElement).getByRole("button")).toHaveFocus();
  },
};

/** Click it: the text is copied and the hint reports "Copied". */
export const Copied: TStory = {
  beforeEach: () => stubClipboard({ writeText }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
    await waitFor(() => expect(canvas.getByRole("status")).toHaveTextContent("Copied"));
    await expect(writeText).toHaveBeenCalledWith("hugobenti@gmail.com");
  },
};

/** Click it: the clipboard is unavailable here, so the text gets selected with a shortcut hint. */
export const ClipboardBlocked: TStory = {
  beforeEach: () => stubClipboard(undefined),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
    await waitFor(() => expect(canvas.getByRole("status")).toHaveTextContent("Selected"));
  },
};

/** All three messages can be replaced, e.g. for another language. */
export const CustomHints: TStory = {
  args: {
    text: "npx create-next-app",
    hint: "Copiar comando",
    copiedHint: "Comando copiado",
    failedHint: "Selecionado: pressione Ctrl+C",
  },
  beforeEach: () => stubClipboard({ writeText }),
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("button"));
  },
};

/** The hint is as wide as its content up to 20 rem, then wraps. */
export const LongText: TStory = {
  args: {
    text: "git clone https://github.com/hugobenti/portfolio-pixelhb.git",
    hint: "Click to copy the whole command, including the repository address and the file name",
  },
  play: async () => {
    await userEvent.tab();
  },
};
