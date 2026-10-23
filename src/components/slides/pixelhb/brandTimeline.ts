import type { IBrandFrame } from "./brandTimeline.type";

/** Pause before the first column is drawn. */
export const BRAND_DELAY_MS = 600;
/** Time each pencil column takes to appear. */
export const BRAND_COLUMN_MS = 60;
/** Beat after the last column before the drawn pixel lands. */
export const BRAND_DOT_MS = 400;
/** Time each asset holds the stage before the next one appears. */
export const BRAND_ASSET_MS = 450;

/** How long the pencil draws itself, then shows `assets` assets, for a pencil `columns` wide. */
export function brandDuration(columns: number, assets: number): number {
  return BRAND_DELAY_MS + columns * BRAND_COLUMN_MS + BRAND_DOT_MS + assets * BRAND_ASSET_MS;
}

/** The slide `elapsed` ms in: pencil columns left to right, the drawn pixel, then the assets. */
export function brandFrame(elapsed: number, columns: number, assets: number): IBrandFrame {
  if (elapsed >= brandDuration(columns, assets)) {
    return { columns, dot: true, assets, done: true };
  }
  if (elapsed < BRAND_DELAY_MS) return { columns: 0, dot: false, assets: 0, done: false };
  const columnsEnd = BRAND_DELAY_MS + columns * BRAND_COLUMN_MS;
  if (elapsed < columnsEnd) {
    const drawn = Math.floor((elapsed - BRAND_DELAY_MS) / BRAND_COLUMN_MS) + 1;
    return { columns: drawn, dot: false, assets: 0, done: false };
  }
  const dotEnd = columnsEnd + BRAND_DOT_MS;
  if (elapsed < dotEnd) return { columns, dot: false, assets: 0, done: false };
  const shown = Math.floor((elapsed - dotEnd) / BRAND_ASSET_MS) + 1;
  return { columns, dot: true, assets: Math.min(shown, assets), done: false };
}
