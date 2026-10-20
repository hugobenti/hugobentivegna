import type { CSSProperties } from "react";
import { cssVars } from "@/design-system/ui";
import type { TServiceState } from "./ItauArtifact.type";

// Illustrative only: an abstract monitoring portal, not real systems or data.
const rawServices: { name: string; state: TServiceState; load: number }[] = [
  { name: "payments-api", state: "ok", load: 72 },
  { name: "ledger", state: "ok", load: 48 },
  { name: "auth", state: "warn", load: 91 },
  { name: "statements", state: "ok", load: 35 },
];

export const services: {
  name: string;
  state: TServiceState;
  warn: boolean;
  /** Stagger order of the row. */
  rowStyle: CSSProperties;
  /** Load as a width, staggered one step after its row. */
  loadStyle: CSSProperties;
}[] = rawServices.map((service, index) => ({
  name: service.name,
  state: service.state,
  warn: service.state === "warn",
  rowStyle: cssVars({ i: index + 1 }),
  loadStyle: cssVars({ load: `${service.load}%`, i: index + 2 }),
}));

/** Traffic line on a 120 × 56 canvas. */
export const chartPoints = "0,48 12,40 24,44 36,28 48,34 60,18 72,26 84,12 96,20 108,8 120,14";
