import type { ReactNode } from "react";

export type TArtifactProps = {
  /** True while this artifact's chapter is in focus; its contents animate in. */
  active: boolean;
  className?: string;
};

export type TArtifactFrameProps = TArtifactProps & {
  /** Text in the window's title bar, e.g. "monitoring.portal". */
  title: string;
  children: ReactNode;
};
