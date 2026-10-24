import { Analytics } from "@vercel/analytics/next";
import type { ReactNode } from "react";
import { siteMetadata } from "@/content/metadata";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata = siteMetadata;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
