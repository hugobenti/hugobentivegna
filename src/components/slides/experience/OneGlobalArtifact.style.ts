import { artifact } from "./artifact.style";
import { cx } from "@/design-system/ui";

export const oneGlobalArtifact = {
  devices: "grid grid-cols-3 gap-2 lg:[@media(min-height:50rem)]:gap-3",
  /** A device tile: name on top, signal at the bottom; tiles grow on taller screens. */
  device: cx(
    "flex flex-col gap-2 rounded-md border border-line bg-raised p-2.5",
    "lg:min-h-[clamp(--spacing(0),calc(--spacing(14)+var(--artifact-grow)*0.11),--spacing(28))] lg:justify-between",
    "lg:[@media(min-height:50rem)]:p-3",
    artifact.appear,
    artifact.rise,
  ),
  deviceTop: "flex items-center justify-between",
  deviceName: "font-mono text-label text-muted lg:[@media(min-height:50rem)]:text-small",
  deviceDot: cx(
    "size-1.5 rounded-pill data-[state=online]:bg-accent data-[state=offline]:bg-subtle",
    "lg:[@media(min-height:50rem)]:size-2",
  ),
  /** Signal strength: three bars, lit up to the device's level. */
  signal: "flex h-3 items-end gap-0.5 lg:[@media(min-height:50rem)]:h-4",
  bar: "h-[calc(var(--h)*33.4%)] w-1 rounded-pill bg-line data-[lit=true]:bg-fg",
  terminal: cx(
    "flex flex-col gap-1.5 rounded-md border border-line bg-bg p-3 font-mono text-label",
    "lg:gap-[clamp(--spacing(1.5),calc(--spacing(1.5)+var(--artifact-grow)*0.04),--spacing(5))]",
    "lg:[@media(min-height:50rem)]:p-4 lg:[@media(min-height:50rem)]:text-small",
  ),
  line: cx(
    "flex gap-2 text-muted",
    artifact.appear,
    "-translate-x-1 opacity-0 group-data-[active=true]:translate-x-0 group-data-[active=true]:opacity-100",
  ),
  prompt: "text-subtle",
  /** What the step produced: plain result, or a passed check. */
  tone: { result: "text-fg", ok: "text-accent" },
};
