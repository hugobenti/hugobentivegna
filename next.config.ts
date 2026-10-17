import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Isolated production builds (e.g. an agent verifying a change while `next dev` or another
  // build uses .next): `NEXT_DIST_DIR=.next-verify pnpm build && NEXT_DIST_DIR=.next-verify pnpm start`.
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
};

export default nextConfig;
