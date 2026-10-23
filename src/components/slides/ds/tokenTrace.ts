import type { ITokenEntry } from "@/design-system/tokens";

const REFERENCE = /^\{([^{}]+)\}$/;

/**
 * Follows a token's `{reference}` chain to the value it ends on, e.g.
 * button.primary.bg → color.accent → palette.blue.400.
 * Returns [] for an unknown name.
 */
export function traceToken(tokens: readonly ITokenEntry[], name: string): ITokenEntry[] {
  const chain: ITokenEntry[] = [];
  let next: string | undefined = name;
  while (next !== undefined) {
    const current: string = next;
    const entry = tokens.find((token) => token.name === current);
    if (!entry) break;
    chain.push(entry);
    next = REFERENCE.exec(entry.value)?.[1];
  }
  return chain;
}
