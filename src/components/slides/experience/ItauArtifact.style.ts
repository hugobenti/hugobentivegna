import { artifact } from "./artifact.style";
import { cx } from "@/design-system/ui";

export const itauArtifact = {
  rows: cx(
    "flex flex-col gap-3",
    "lg:gap-[clamp(--spacing(3),calc(--spacing(3)+var(--artifact-grow)*0.05),--spacing(8))]",
  ),
  row: cx(
    "grid grid-cols-[minmax(0,1fr)_auto_6rem] items-center gap-4",
    "lg:[@media(min-height:50rem)]:grid-cols-[minmax(0,1fr)_auto_9rem] lg:[@media(min-height:50rem)]:gap-5",
    artifact.appear,
    artifact.rise,
  ),
  service: "truncate font-mono text-small text-fg lg:[@media(min-height:50rem)]:text-body",
  status: cx(
    "flex items-center gap-2 font-mono text-label text-muted uppercase",
    "lg:[@media(min-height:50rem)]:text-small",
  ),
  statusDot: cx(
    "relative size-2 rounded-pill data-[state=ok]:bg-accent data-[state=warn]:bg-fg",
    "lg:[@media(min-height:50rem)]:size-2.5",
  ),
  /** Soft ring that pulses around a warning, only while the window is active. */
  statusPing:
    "absolute inset-0 rounded-pill bg-fg opacity-0 group-data-[active=true]:animate-ping motion-reduce:animate-none",
  loadTrack: "h-1.5 overflow-hidden rounded-pill bg-raised lg:[@media(min-height:50rem)]:h-2",
  loadFill: cx(
    "block h-full w-0 rounded-pill bg-muted group-data-[active=true]:w-(--load)",
    artifact.appear,
  ),
  /** The traffic chart takes most of the window's growth on taller screens. */
  chart: cx(
    "h-16 w-full overflow-visible lg:[@media(min-height:50rem)]:mt-3",
    "lg:h-[clamp(--spacing(16),calc(--spacing(16)+var(--artifact-grow)*0.4),--spacing(56))]",
  ),
  /** The line draws itself: dash offset runs from full length to zero (pathLength is 100). */
  chartLine: cx(
    "fill-none stroke-accent [stroke-width:2] [stroke-dasharray:100] [stroke-dashoffset:100] [stroke-linecap:round] [stroke-linejoin:round]",
    "group-data-[active=true]:[stroke-dashoffset:0]",
    artifact.appear,
    "duration-[1.4s]",
  ),
  chartGrid: "stroke-line [stroke-width:1]",
};
