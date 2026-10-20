import { artifact } from "./artifact.style";
import { cx } from "@/design-system/ui";

export const itauArtifact = {
  rows: "flex flex-col gap-3",
  row: cx(
    "grid grid-cols-[minmax(0,1fr)_auto_6rem] items-center gap-4",
    artifact.appear,
    artifact.rise,
  ),
  service: "truncate font-mono text-small text-fg",
  status: "flex items-center gap-2 font-mono text-label text-muted uppercase",
  statusDot: "relative size-2 rounded-pill data-[state=ok]:bg-accent data-[state=warn]:bg-fg",
  /** Soft ring that pulses around a warning, only while the window is active. */
  statusPing:
    "absolute inset-0 rounded-pill bg-fg opacity-0 group-data-[active=true]:animate-ping motion-reduce:animate-none",
  loadTrack: "h-1.5 overflow-hidden rounded-pill bg-raised",
  loadFill: cx(
    "block h-full w-0 rounded-pill bg-muted group-data-[active=true]:w-(--load)",
    artifact.appear,
  ),
  chart: "h-16 w-full overflow-visible",
  /** The line draws itself: dash offset runs from full length to zero (pathLength is 100). */
  chartLine: cx(
    "fill-none stroke-accent [stroke-dasharray:100] [stroke-dashoffset:100] [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2]",
    "group-data-[active=true]:[stroke-dashoffset:0]",
    artifact.appear,
    "duration-[1.4s]",
  ),
  chartGrid: "stroke-line [stroke-width:1]",
};
