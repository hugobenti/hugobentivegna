export interface IMemoryFrame {
  /** Index of the canvas size on show, or -1 before the first one. */
  size: number;
  /** The storage bars are lit (they stay lit). */
  bars: boolean;
  /** How many history entries have landed. */
  entries: number;
  done: boolean;
}
