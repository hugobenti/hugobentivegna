import type { ThemeName, TokenEntry } from "@/design-system/tokens";

const REFERENCE = /^\{([^{}]+)\}$/;

/**
 * Follows a token's `{reference}` chain to the value it ends on, e.g.
 * button.primary.bg → color.accent → palette.blue.400. Semantic tokens are read from `theme`;
 * a theme that doesn't override one inherits midnight's, as it does in the generated CSS.
 * Every step's `resolved` is the chain's end value in that theme: component tokens are stored
 * once, resolved against midnight, but in the page they follow the theme like everything else.
 * Returns [] for an unknown name.
 */
export function traceToken(
  tokens: readonly TokenEntry[],
  name: string,
  theme: ThemeName = "midnight",
): TokenEntry[] {
  const chain: TokenEntry[] = [];
  let next: string | undefined = name;
  while (next !== undefined) {
    const current: string = next;
    const candidates = tokens.filter((token) => token.name === current);
    const entry =
      candidates.find((token) => token.theme === theme || token.theme === null) ??
      candidates.find((token) => token.theme === "midnight");
    if (!entry) break;
    chain.push(entry);
    next = REFERENCE.exec(entry.value)?.[1];
  }
  const end = chain.at(-1);
  return end ? chain.map((entry) => ({ ...entry, resolved: end.resolved })) : chain;
}

/** Time between two steps of a chain appearing. */
export const TRACE_STEP_MS = 350;
/** Time each token is on screen before the trace moves to the next one. */
export const TRACE_SEGMENT_MS = 1600;
/** Items revealed per token: the three chain steps, then the Button using it. */
const TRACE_ITEMS = 4;

/** How long the trace plays through `optionCount` tokens. */
export function traceDuration(optionCount: number): number {
  return optionCount * TRACE_SEGMENT_MS;
}

/**
 * What the auto-playing trace shows `elapsed` ms in: which token (`option`) and how many of its
 * items are visible, palette first. Ends on the last token, fully revealed.
 */
export function traceFrame(
  elapsed: number,
  optionCount: number,
): { option: number; revealed: number } {
  if (elapsed >= traceDuration(optionCount)) {
    return { option: optionCount - 1, revealed: TRACE_ITEMS };
  }
  const option = Math.floor(elapsed / TRACE_SEGMENT_MS);
  const local = elapsed - option * TRACE_SEGMENT_MS;
  return { option, revealed: Math.min(TRACE_ITEMS, 1 + Math.floor(local / TRACE_STEP_MS)) };
}
