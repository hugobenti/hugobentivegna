import { cx } from "@/design-system/ui";
import { artifact } from "./artifact.style";
import type { TArtifactFrameProps } from "./ArtifactFrame.type";

/** Decorative app window around an Experience artifact. Hidden from assistive technology. */
export function ArtifactFrame({ title, active, className, children }: TArtifactFrameProps) {
  return (
    <div
      data-artifact=""
      data-active={active}
      aria-hidden="true"
      className={cx(artifact.frame, className)}
    >
      <div className={artifact.chrome}>
        <span className={artifact.dots}>
          <span className={artifact.dot} />
          <span className={artifact.dot} />
          <span className={artifact.dot} />
        </span>
        <span className={artifact.title}>{title}</span>
      </div>
      <div className={artifact.body}>{children}</div>
    </div>
  );
}
