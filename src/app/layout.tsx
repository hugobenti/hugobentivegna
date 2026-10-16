import type { Metadata } from "next";
import type { ReactNode } from "react";
import { site } from "@/content/site";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: `${site.name} — ${site.role}`,
  description: `${site.headline.lead} ${site.headline.accent} ${site.headline.tail} ${site.supportLine.replaceAll(" · ", ", ")}.`,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="midnight" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
