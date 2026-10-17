import { type CSSProperties, useState } from "react";
import { designSystemCase } from "@/content/cases";
import type { TraceOption } from "@/content/types";
import { tokens } from "@/design-system/tokens";
import { traceToken } from "./tokenTrace";

const { options, layers } = designSystemCase.trace;

export interface TraceStep {
  name: string;
  cssVar: string;
  resolved: string;
  /** The layer's name on the slide. */
  layer: string;
  /** Paints the swatch with the variable itself, so it shows what the page really uses. */
  swatch: CSSProperties;
}

/** Token trace view model: the picked token and its chain, read palette → component. */
export function useTokenTrace() {
  const [selected, setSelected] = useState<TraceOption>(options[0]);

  const steps: TraceStep[] = traceToken(tokens, selected.token)
    .toReversed()
    .map((entry) => ({
      name: entry.name,
      cssVar: entry.cssVar,
      resolved: entry.resolved,
      layer: layers[entry.layer],
      swatch: { backgroundColor: `var(${entry.cssVar})` },
    }));

  return {
    picker: {
      options: options.map((option) => ({ value: option.token, label: option.label })),
      value: selected.token,
      onChange: (token: string) =>
        setSelected(options.find((option) => option.token === token) ?? selected),
    },
    steps,
    /** The kit Button variant the token styles, for the live preview. */
    variant: selected.variant,
  };
}
