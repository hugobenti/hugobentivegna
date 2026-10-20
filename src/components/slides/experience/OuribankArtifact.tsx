import { cx } from "@/design-system/ui";
import { artifact } from "./artifact.style";
import { ArtifactFrame } from "./ArtifactFrame";
import type { TArtifactProps } from "./ArtifactFrame.type";
import { cards, pieces, swatches } from "./OuribankArtifact.data";
import { ouribankArtifact as s } from "./OuribankArtifact.style";

/** Ouribank: loose tokens, components and patterns snapping into one organized library. */
export function OuribankArtifact({ active, className }: TArtifactProps) {
  return (
    <ArtifactFrame title="design-system / library" active={active} className={className}>
      <div className={s.layer}>
        <p className={artifact.caption}>Tokens</p>
        <div className={s.row}>
          {swatches.map((swatch) => (
            <span
              key={swatch.tone}
              className={cx(s.swatch, s.swatchTone[swatch.tone])}
              style={swatch.style}
            />
          ))}
        </div>
      </div>
      <div className={s.layer}>
        <p className={artifact.caption}>Components</p>
        <div className={s.row}>
          {pieces.map((piece) => (
            <span key={piece.kind} className={s.piece[piece.kind]} style={piece.style}>
              {piece.label}
            </span>
          ))}
        </div>
      </div>
      <div className={s.layer}>
        <p className={artifact.caption}>Patterns</p>
        <div className={s.cards}>
          {cards.map((card) => (
            <span key={card.key} className={s.card} style={card.style}>
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
