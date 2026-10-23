export interface IBrandFrame {
  /** How many pencil columns are drawn. */
  columns: number;
  /** The drawn pixel ahead of the tip has landed. */
  dot: boolean;
  /** How many assets are shown. */
  assets: number;
  done: boolean;
}
