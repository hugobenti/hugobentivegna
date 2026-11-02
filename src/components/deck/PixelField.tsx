import { cx } from "@/design-system/ui";
import { PixelArt } from "../slides/pixelhb/PixelArt";
import { FIELD } from "./pixelField.data";
import { pixelField } from "./PixelField.style";
import type { TPixelFieldProps } from "./PixelField.type";

/** The amber pixel spill behind a slide's edge: decoration only, hidden from assistive tech. */
export function PixelField({ placement, className }: TPixelFieldProps) {
  return (
    <div
      aria-hidden="true"
      className={cx(pixelField.base, pixelField.placement[placement], className)}
    >
      <PixelArt grid={FIELD} label="" size="field" />
    </div>
  );
}
