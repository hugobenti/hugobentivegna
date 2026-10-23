import type { CSSProperties } from "react";

/** Which fill a storage bar takes: the costly format is muted, the chosen one is the accent. */
export type TBarTone = "muted" | "accent";

export interface IMemorySceneBar {
  label: string;
  value: string;
  tone: TBarTone;
  on: boolean;
  /** `--share`: how much of the track the bar fills (0 until it lights). */
  style: CSSProperties;
}

export interface IMemorySceneCell {
  index: number;
  painted: boolean;
}

export interface IMemorySceneEntry {
  text: string;
  on: boolean;
}
