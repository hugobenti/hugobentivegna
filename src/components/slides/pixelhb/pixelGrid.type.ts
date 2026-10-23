export type TPixelKey =
  | "y"
  | "Y"
  | "o"
  | "w"
  | "W"
  | "G"
  | "q"
  | "s"
  | "m"
  | "M"
  | "e"
  | "f"
  | "E"
  | "d"
  | "i"
  | "h"
  | "k"
  | "r"
  | "l";

/** One string per row, one character per pixel; `.` is empty. */
export type TPixelGrid = readonly string[];

export interface IPixelCell {
  x: number;
  y: number;
  key: TPixelKey;
  /** `y * width + x`. */
  index: number;
}

export interface IPixelRun {
  x: number;
  y: number;
  width: number;
  key: TPixelKey;
}
