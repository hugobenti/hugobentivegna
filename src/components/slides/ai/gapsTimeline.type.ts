export interface IGapsFrame {
  /** How many sources are lit (they stay lit once read). */
  sourcesLit: number;
  /** The source being read right now, or null outside the reading phase. */
  reading: number | null;
  /** How many checks have appeared. */
  shown: number;
  /** How many checks show their result. */
  resolved: number;
  done: boolean;
}
