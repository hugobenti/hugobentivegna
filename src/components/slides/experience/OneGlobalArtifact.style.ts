import { artifact } from "./artifact.style";

export const oneGlobalArtifact = {
  devices: "grid grid-cols-3 gap-2",
  device: `flex flex-col gap-2 rounded-md border border-line bg-raised p-2.5 ${artifact.appear} ${artifact.rise}`,
  deviceTop: "flex items-center justify-between",
  deviceName: "font-mono text-label text-muted",
  deviceDot: "size-1.5 rounded-pill data-[state=online]:bg-accent data-[state=offline]:bg-subtle",
  /** Signal strength: three bars, lit up to the device's level. */
  signal: "flex h-3 items-end gap-0.5",
  bar: "h-[calc(var(--h)*33.4%)] w-1 rounded-pill bg-line data-[lit=true]:bg-fg",
  terminal: "flex flex-col gap-1.5 rounded-md border border-line bg-bg p-3 font-mono text-label",
  line: `flex gap-2 text-muted ${artifact.appear} -translate-x-1 opacity-0 group-data-[active=true]:translate-x-0 group-data-[active=true]:opacity-100`,
  prompt: "text-subtle",
  /** Emphasis inside a line: what the step produced. */
  result: "text-fg",
  ok: "text-accent",
};
