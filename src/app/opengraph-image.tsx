import { ImageResponse } from "next/og";
import { OgCard } from "@/components/og/OgCard";
import { ogFonts, size } from "@/components/og/ogImage";

export { alt, contentType, size } from "@/components/og/ogImage";

export default async function Image() {
  return new ImageResponse(<OgCard />, { ...size, fonts: await ogFonts() });
}
