import { Inter_Tight, JetBrains_Mono, Silkscreen } from "next/font/google";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-silkscreen",
  display: "swap",
});

/** Class names that define the --font-* variables the font tokens reference. */
export const fontVariables = [
  interTight.variable,
  jetbrainsMono.variable,
  silkscreen.variable,
].join(" ");
