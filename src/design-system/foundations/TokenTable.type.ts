import type { ITokenEntry } from "../tokens";

export type TTokenTableProps = {
  /** What the rows are, shown above the table and used as its accessible name. */
  caption: string;
  rows: readonly ITokenEntry[];
};
