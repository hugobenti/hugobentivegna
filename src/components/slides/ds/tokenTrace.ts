import type { ThemeName, TokenEntry } from "@/design-system/tokens";

const REFERENCE = /^\{([^{}]+)\}$/;

/**
 * Follows a token's `{reference}` chain to the value it ends on, e.g.
 * button.primary.bg → color.accent → palette.blue.400. Semantic tokens are read from `theme`;
 * a theme that doesn't override one inherits midnight's, as it does in the generated CSS.
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
  return chain;
}
