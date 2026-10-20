import type { TThemeName, ITokenEntry } from "@/design-system/tokens/tokens.type";

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
  tokens: readonly ITokenEntry[],
  name: string,
  theme: TThemeName = "midnight",
): ITokenEntry[] {
  const chain: ITokenEntry[] = [];
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
