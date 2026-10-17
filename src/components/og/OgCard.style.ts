import type { CSSProperties } from "react";
import { ogPalette as c } from "./ogImage";

/**
 * The share card is rendered by next/og (Satori), which only understands inline styles, so this
 * style file exports style objects instead of Tailwind classes. Values mirror the hero.
 */
export const ogCard: Record<string, CSSProperties> = {
  root: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    padding: "64px 80px",
    backgroundColor: c.bg,
    // The hero's glow, painted on the card itself so no gradient box edge can show.
    backgroundImage: `radial-gradient(circle at 88% 8%, ${c.glow} 0%, transparent 42%)`,
    color: c.fg,
    fontFamily: "Inter Tight",
  },
  top: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26 },
  monogram: { fontWeight: 800 },
  url: { color: c.subtle },
  body: { display: "flex", flexDirection: "column" },
  kicker: { fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: c.subtle },
  headline: {
    display: "flex",
    flexDirection: "column",
    marginTop: 28,
    fontSize: 84,
    fontWeight: 800,
    lineHeight: 1,
    letterSpacing: -3.5,
  },
  accent: { color: c.accent },
  support: { marginTop: 32, fontSize: 28, color: c.muted },
};
