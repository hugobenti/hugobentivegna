import { cx } from "@/design-system/ui";
import { pixelArt, pixelArtSize } from "./PixelArt.style";
import type { TPixelArtProps } from "./PixelArt.type";
import { usePixelArt } from "./usePixelArt";

/** Draws a text pixel grid as crisp svg rects, colored by classes (never a fill attribute). */
export function PixelArt({
  grid,
  label,
  size,
  className,
  cells = false,
  cellState,
}: TPixelArtProps) {
  const { viewBox, rects } = usePixelArt(grid, cells, cellState);
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={viewBox}
      shapeRendering="crispEdges"
      className={cx(pixelArt.base, pixelArtSize[size], className)}
    >
      {rects.map((rect) => (
        <rect
          key={rect.id}
          data-key={rect.key}
          data-index={rect.index}
          data-state={rect.state}
          x={rect.x}
          y={rect.y}
          width={rect.width}
          height={1}
          className={rect.className}
        />
      ))}
    </svg>
  );
}
