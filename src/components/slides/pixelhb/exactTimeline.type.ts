export interface IExactFrame {
  /** The card being lit, or `null` before the first and once all are lit. */
  current: number | null;
  /** How far through the current card's time it is (0..1); 0 outside a card. */
  progress: number;
  /** Every card has had its turn. */
  all: boolean;
}

/** A card waits (`idle`), plays (`current`) or has played (`done`). */
export type TExactCardState = "idle" | "current" | "done";
