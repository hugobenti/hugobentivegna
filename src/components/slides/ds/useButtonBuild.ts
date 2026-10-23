import { designSystemCase } from "@/content/cases";
import type { IBuildStep } from "@/content/content.type";
import { tokens } from "@/design-system/tokens";
import { usePlayback } from "../../deck/usePlayback";
import { buildDuration, buildFrame } from "./buttonBuild";
import { traceToken } from "./tokenTrace";
import type { IBuildToken } from "./useButtonBuild.type";

const { decision } = designSystemCase;
const { steps } = decision;
const duration = buildDuration(steps.length);

/**
 * Button build view model: plays the decision's steps once the slide is active, each applying
 * its tokens to the preview, then holds the finished button.
 */
export function useButtonBuild() {
  const { ref, elapsed, finished } = usePlayback<HTMLDivElement>(duration);
  const applied = buildFrame(elapsed, steps.length);
  const stateOf = (name: string): IBuildToken["state"] => {
    const index = steps.findIndex((step) => step.tokens.includes(name));
    if (index >= applied) return "idle";
    return index === applied - 1 && !finished ? "current" : "applied";
  };

  const groups = decision.groups.map((group) => ({
    label: group.label,
    tokens: group.tokens.map(({ token, display }): IBuildToken => {
      const [entry] = traceToken(tokens, token);
      return {
        name: token,
        value: display ?? entry?.resolved ?? "",
        swatch: entry?.type === "color" ? { backgroundColor: `var(${entry.cssVar})` } : undefined,
        state: stateOf(token),
      };
    }),
  }));

  const current: IBuildStep | undefined = steps[applied - 1];
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
    ) as Record<`data-${IBuildStep["part"]}`, boolean>,
    progress: steps.map((step, index) => ({ part: step.part, on: index < applied })),
    caption: finished ? decision.done : current ? `${current.caption}: ${detail}` : "",
  };
}
