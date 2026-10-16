import type { Metadata } from "next";
import type { ReactNode } from "react";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hugo Bentivegna — Senior Software Engineer",
  description:
    "High-quality UI, built for the people who use it. Design systems, accessibility and AI-assisted development.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="midnight" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
