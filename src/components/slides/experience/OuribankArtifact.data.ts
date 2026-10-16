import type { CSSProperties } from "react";
import { cssVars } from "@/design-system/ui";
import type { ouribankArtifact } from "./OuribankArtifact.style";

/** Where a piece starts before it snaps into the library: stagger order, offset x / y, rotation. */
function scatter(i: number, x: number, y: number, r: number): CSSProperties {
  return cssVars({ i, x: `${x}px`, y: `${y}px`, r: `${r}deg` });
}

export const swatches: { tone: keyof typeof ouribankArtifact.swatchTone; style: CSSProperties }[] =
  [
    { tone: "accent", style: scatter(0, -28, -18, -11) },
    { tone: "fg", style: scatter(1, -14, -11, 14) },
    { tone: "muted", style: scatter(2, 0, -4, -11) },
    { tone: "raised", style: scatter(3, 14, 3, 14) },
    { tone: "line", style: scatter(4, 28, 10, -11) },
  ];

export const pieces: {
  kind: keyof typeof ouribankArtifact.piece;
  label: string;
  style: CSSProperties;
}[] = [
  { kind: "primary", label: "Primary", style: scatter(5, 26, 18, -8) },
  { kind: "secondary", label: "Secondary", style: scatter(6, -20, 24, 9) },
  { kind: "tag", label: "Tag", style: scatter(7, 34, -12, 12) },
];

export const cards: { key: string; style: CSSProperties }[] = [
  { key: "card-1", style: scatter(8, -24, 22, -6) },
  { key: "card-2", style: scatter(9, 6, 12, 1.5) },
  { key: "card-3", style: scatter(10, 30, 2, 7.5) },
];
