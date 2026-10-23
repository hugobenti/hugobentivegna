import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { story } from "../story.style";
import { PlaybackControl } from "./PlaybackControl";

const meta = {
  title: "Components/PlaybackControl",
  component: PlaybackControl,
  args: { label: "Pause", onToggle: () => {} },
  argTypes: {
    label: {
      description: "What the next press does. It is also the accessible name.",
      table: { type: { summary: "string" } },
    },
    onToggle: { table: { type: { summary: "() => void" } } },
    shown: {
      control: "boolean",
      description: "`false` renders nothing, e.g. before scripts run or when motion is reduced.",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "true" } },
    },
    className: { description: "Layout only: margins, width, shrink." },
  },
} satisfies Meta<typeof PlaybackControl>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {};

export const States: TStory = {
  render: () => (
    <div className={story.row}>
      <PlaybackControl label="Pause" onToggle={() => {}} />
      <PlaybackControl label="Play" onToggle={() => {}} />
      <PlaybackControl label="Replay" onToggle={() => {}} />
    </div>
  ),
};

function Cycle() {
  const labels = ["Pause", "Play", "Replay"];
  const [step, setStep] = useState(0);
  return (
    <PlaybackControl
      label={labels[step] ?? "Pause"}
      onToggle={() => setStep((current) => (current + 1) % labels.length)}
    />
  );
}

export const Interactive: TStory = { render: () => <Cycle /> };
