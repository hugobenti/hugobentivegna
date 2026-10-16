import type { CSSProperties } from "react";
import { cssVars } from "@/design-system/ui";

// Illustrative only: an abstract IoT fleet and an agent-assisted workflow, not real data.

const rawDevices: { name: string; online: boolean; signal: 0 | 1 | 2 | 3 }[] = [
  { name: "node-01", online: true, signal: 3 },
  { name: "node-02", online: true, signal: 2 },
  { name: "node-03", online: false, signal: 0 },
  { name: "node-04", online: true, signal: 3 },
  { name: "node-05", online: true, signal: 1 },
  { name: "node-06", online: true, signal: 2 },
];

export const devices = rawDevices.map((device, index) => ({
  name: device.name,
  state: device.online ? "online" : "offline",
  style: cssVars({ i: index }),
  /** Three signal bars of rising height, lit up to the device's level. */
  bars: [1, 2, 3].map((level) => ({
    level,
    lit: level <= device.signal,
    style: cssVars({ h: level }),
  })),
}));

const rawWorkflow: { step: string; result: string; ok: boolean }[] = [
  { step: "plan", result: "4 small tasks", ok: false },
  { step: "agent", result: "draft: device filter", ok: false },
  { step: "review", result: "approved by Hugo", ok: true },
  { step: "test", result: "e2e passed", ok: true },
];

/** Terminal lines; they type in after the devices. */
export const workflow: {
  step: string;
  text: string;
  tone: "ok" | "result";
  style: CSSProperties;
}[] = rawWorkflow.map((line, index) => ({
  step: `$ ${line.step}`,
  text: `${line.ok ? "✓" : "→"} ${line.result}`,
  tone: line.ok ? "ok" : "result",
  style: cssVars({ i: rawDevices.length + index }),
}));
