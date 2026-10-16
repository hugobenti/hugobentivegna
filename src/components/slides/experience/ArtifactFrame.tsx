import type { ReactNode } from "react";
import { cx } from "@/design-system/ui";
import { artifact } from "./artifact.style";

export type ArtifactProps = {
  /** True while this artifact's chapter is in focus; its contents animate in. */
  active: boolean;
  className?: string;
};

type ArtifactFrameProps = ArtifactProps & {
  /** Text in the window's title bar, e.g. "monitoring.portal". */
  title: string;
  children: ReactNode;
};

/** Decorative app window around an Experience artifact. Hidden from assistive technology. */
export function ArtifactFrame({ title, active, className, children }: ArtifactFrameProps) {
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
