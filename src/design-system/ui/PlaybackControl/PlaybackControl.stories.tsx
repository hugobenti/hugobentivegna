import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import { story } from "../story.style";
import { PlaybackControl } from "./PlaybackControl";

const labels = ["Pause", "Play", "Replay"];

const meta = {
  title: "Components/PlaybackControl",
  component: PlaybackControl,
  args: { label: "Pause", onToggle: fn() },
  argTypes: {
    label: {
      control: "inline-radio",
      options: labels,
      description: "What the next press does. It is also the accessible name.",
    },
    shown: {
      control: "boolean",
      description: "`false` renders nothing, e.g. before scripts run or when motion is reduced.",
      table: { defaultValue: { summary: "true" } },
    },
    className: { description: "Layout only: margins, width, shrink." },
  },
} satisfies Meta<typeof PlaybackControl>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {};

export const States: TStory = {
  render: (args) => (
    <div className={story.row}>
      {labels.map((label) => (
        <PlaybackControl key={label} label={label} onToggle={args.onToggle} />
      ))}
    </div>
  ),
};

/** With `shown={false}` nothing renders: the canvas below is empty on purpose. */
export const Hidden: TStory = { args: { shown: false } };

/** Press it: the label steps through Pause, Play and Replay, as it does on a scene. */
export const Interactive: TStory = {
  render: function Render(args) {
    const [step, setStep] = useState(0);
    return (
      <PlaybackControl
        {...args}
        label={labels[step] ?? "Pause"}
        onToggle={() => {
          args.onToggle();
          setStep((current) => (current + 1) % labels.length);
        }}
      />
    );
  },
};
