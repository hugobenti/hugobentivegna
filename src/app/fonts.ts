import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import { cx } from "@/design-system/ui";

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

/** Class names that define the --font-* variables the font tokens reference. */
export const fontVariables = cx(interTight.variable, jetbrainsMono.variable);
