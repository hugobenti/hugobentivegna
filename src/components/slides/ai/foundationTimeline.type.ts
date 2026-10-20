export interface IFoundationFrame {
  /** The excerpt in focus, or null before the first one and once all are lit. */
  current: number | null;
  /** Every excerpt lit: the end state. */
  all: boolean;
}
