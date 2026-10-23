import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { story } from "../../story.style";
import { COMPUTER, HEART, LOCKUP } from "./pixelArt.data";
import { PixelArt } from "./PixelArt";
import { pixelArtSize } from "./PixelArt.style";
import { cellStates } from "./pixelGrid";

/** Every brand key once, in the order the table in the guide lists them. */
const PALETTE = ["yYowW", "GqsmM", "efEdi", "khrb."];

/** A 5 × 5 sample for the cells mode. */
const SAMPLE = ["..Y..", ".YYY.", "YYYYY", ".YYY.", "..Y.."];

const meta = {
  title: "Site/PixelArt",
  component: PixelArt,
  args: { grid: HEART, label: "A pixel heart", size: "heart4x" },
  argTypes: {
    grid: {
      control: false,
      description: "One string per row, one character per pixel; `.` is empty.",
    },
    label: { description: "The accessible name of the drawing." },
    size: { control: "select", options: Object.keys(pixelArtSize) },
    cells: { description: "One rect per pixel (with `data-index`) instead of one per run." },
    cellState: {
      control: false,
      description:
        "Cells mode only: `on` or `off` per cell, indexed `y * width + x`, shown as `data-state`.",
    },
    className: { control: false },
  },
} satisfies Meta<typeof PixelArt>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {};

export const Sizes: TStory = {
  render: () => (
    <div className={story.row}>
      <div className={story.item}>
        <PixelArt grid={LOCKUP} label="Logo lockup" size="lockup" />
        <span className={story.caption}>lockup</span>
      </div>
      <div className={story.item}>
        <PixelArt grid={COMPUTER} label="A pixel computer" size="drawing" />
        <span className={story.caption}>drawing</span>
      </div>
      {(["heart1x", "heart2x", "heart4x", "heart6x", "loupe"] as const).map((size) => (
        <div key={size} className={story.item}>
          <PixelArt grid={HEART} label={`A pixel heart, ${size}`} size={size} />
          <span className={story.caption}>{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const Palette: TStory = {
  args: { grid: PALETTE, label: "Every brand color, one pixel each", size: "heart6x" },
};

export const Cells: TStory = {
  args: {
    grid: SAMPLE,
    label: "A diamond, half drawn",
    size: "heart6x",
    cells: true,
    cellState: cellStates(25, [2, 6, 7, 8, 10, 11, 12]),
  },
};
