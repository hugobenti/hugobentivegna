import type { CSSProperties } from "react";
import { designSystemCase } from "@/content/cases";
import { tokens } from "@/design-system/tokens";
import { usePlayback } from "../../deck/usePlayback";
import { traceDuration, traceFrame, traceToken } from "./tokenTrace";

const { options, layers } = designSystemCase.decision;

export interface TraceStep {
  name: string;
  cssVar: string;
  resolved: string;
  /** The layer's name on the slide. */
  layer: string;
  /** Paints the swatch with the variable itself, so it shows what the page really uses. */
  swatch: CSSProperties;
  /** Whether the trace has reached this step yet. */
  shown: boolean;
}

/**
 * Token trace view model: plays through the case's tokens by itself, revealing each chain from
 * palette to component and then the Button that uses it.
 */
export function useTokenTrace() {
  const { ref, elapsed } = usePlayback<HTMLDivElement>(traceDuration(options.length));
  const frame = traceFrame(elapsed, options.length);
  const option = options[frame.option] ?? options[0];

  // traceToken returns a fresh array, so reversing it in place is safe (and works in every
  // browser Next.js supports, unlike toReversed()).
  const steps: TraceStep[] = traceToken(tokens, option.token)
    .reverse()
    .map((entry, index) => ({
      name: entry.name,
      cssVar: entry.cssVar,
      resolved: entry.resolved,
      layer: layers[entry.layer],
      swatch: { backgroundColor: `var(${entry.cssVar})` },
      shown: index < frame.revealed,
    }));

  return {
    ref,
    option,
    steps,
    /** The live Button appears after the last step, in the variant the token styles. */
    button: { shown: frame.revealed > steps.length, variant: option.variant },
  };
}
