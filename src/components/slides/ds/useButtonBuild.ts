import type { CSSProperties } from "react";
import { designSystemCase } from "@/content/cases";
import type { BuildStep } from "@/content/types";
import { tokens } from "@/design-system/tokens";
import { usePlayback } from "../../deck/usePlayback";
import { buildDuration, buildFrame } from "./buttonBuild";
import { traceToken } from "./tokenTrace";

const { decision } = designSystemCase;
const { steps } = decision;
const duration = buildDuration(steps.length);

export interface BuildToken {
  name: string;
  value: string;
  /** Paints color tokens with their own variable; undefined for other types. */
  swatch?: CSSProperties;
  /** `current` while its step is landing, `applied` once it has. */
  state: "idle" | "current" | "applied";
}

/**
 * Button build view model: plays the decision's steps once the slide is active, each applying
 * its tokens to the preview, then holds the finished button.
 */
export function useButtonBuild() {
  const { ref, elapsed } = usePlayback<HTMLDivElement>(duration);
  const applied = buildFrame(elapsed, steps.length);
  const finished = elapsed >= duration;
  const stateOf = (name: string): BuildToken["state"] => {
    const index = steps.findIndex((step) => step.tokens.includes(name));
    if (index >= applied) return "idle";
    return index === applied - 1 && !finished ? "current" : "applied";
  };

  const groups = decision.groups.map((group) => ({
    label: group.label,
    tokens: group.tokens.map(({ token, display }): BuildToken => {
      const [entry] = traceToken(tokens, token);
      return {
        name: token,
        value: display ?? entry?.resolved ?? "",
        swatch: entry?.type === "color" ? { backgroundColor: `var(${entry.cssVar})` } : undefined,
        state: stateOf(token),
      };
    }),
  }));

  const current: BuildStep | undefined = steps[applied - 1];
  const chain = current?.tokens.length === 1 ? traceToken(tokens, current.tokens[0] ?? "") : [];
  const detail =
    chain.length > 0
      ? chain.map((entry) => entry.name).join(" → ")
      : (current?.tokens.join(", ") ?? "");

  return {
    ref,
    groups,
    /** Which parts of the preview are styled so far, as data attributes. */
    parts: Object.fromEntries(
      steps.map((step, index) => [`data-${step.part}`, index < applied]),
    ) as Record<`data-${BuildStep["part"]}`, boolean>,
    progress: steps.map((step, index) => ({ part: step.part, on: index < applied })),
    caption: finished ? decision.done : current ? `${current.caption}: ${detail}` : "",
  };
}
