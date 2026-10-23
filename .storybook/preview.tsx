import type { Decorator, Preview } from "@storybook/nextjs-vite";
import { themes as storybookThemes } from "storybook/theming";
import { fontVariables } from "../src/app/fonts";
import "../src/app/globals.css";
import { storyCanvas } from "./preview.style";

// Font tokens (--hb-font-family-*) are declared on :root and reference the next/font variables,
// so those variables must live on <html> too, exactly as in src/app/layout.tsx.
document.documentElement.classList.add(...fontVariables.split(" "));

/** Renders every story on the Storybook canvas. */
const withCanvas: Decorator = (Story) => (
  <div className={storyCanvas}>
    <Story />
  </div>
);

const preview: Preview = {
  decorators: [withCanvas],
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
    docs: { theme: storybookThemes.dark },
    a11y: { test: "error" },
    controls: { expanded: true },
  },
};

export default preview;
