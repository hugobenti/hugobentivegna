import { cssVars, cx } from "@/design-system/ui";
import { artifact } from "./artifact.style";
import { ArtifactFrame, type ArtifactProps } from "./ArtifactFrame";
import { ouribankArtifact as s } from "./OuribankArtifact.style";

/** Where each piece starts before it snaps into the library: offset x / y and rotation. */
function scatter(i: number, x: number, y: number, r: number) {
  return cssVars({ i, x: `${x}px`, y: `${y}px`, r: `${r}deg` });
}

const swatches = [s.swatchAccent, s.swatchFg, s.swatchMuted, s.swatchRaised, s.swatchLine];

/** Ouribank: loose tokens, components and patterns snapping into one organized library. */
export function OuribankArtifact({ active, className }: ArtifactProps) {
  return (
    <ArtifactFrame title="design-system / library" active={active} className={className}>
      <div className={s.layer}>
        <p className={artifact.caption}>Tokens</p>
        <div className={s.row}>
          {swatches.map((color, index) => (
            <span
              key={color}
              className={cx(s.swatch, color)}
              style={scatter(index, (index - 2) * 14, -18 + index * 7, index % 2 ? 14 : -11)}
            />
          ))}
        </div>
      </div>
      <div className={s.layer}>
        <p className={artifact.caption}>Components</p>
        <div className={s.row}>
          <span className={s.primary} style={scatter(5, 26, 18, -8)}>
            Primary
          </span>
          <span className={s.secondary} style={scatter(6, -20, 24, 9)}>
            Secondary
          </span>
          <span className={s.tag} style={scatter(7, 34, -12, 12)}>
            Tag
          </span>
        </div>
      </div>
      <div className={s.layer}>
        <p className={artifact.caption}>Patterns</p>
        <div className={s.cards}>
          {[-24, 6, 30].map((x, index) => (
            <span key={x} className={s.card} style={scatter(8 + index, x, 22 - index * 10, x / 4)}>
              <span className={s.cardTitle} />
              <span className={s.cardLine} />
              <span className={s.cardLine} />
            </span>
          ))}
        </div>
      </div>
    </ArtifactFrame>
  );
}
