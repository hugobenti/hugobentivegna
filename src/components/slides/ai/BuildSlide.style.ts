import { cx } from "@/design-system/ui";
import { chapterLayout } from "../ChapterIntro/ChapterIntro.style";

/**
 * The review panel is one group: its data attributes (commented, removed, fixed, ruled) drive
 * every part below. Parts that arrive later keep their space from the start and only fade in,
 * so the panel's height never changes while it plays.
 */
const reveal = "transition-opacity duration-(--hb-duration-slow)";

export const buildSlide = {
  content: chapterLayout.columns,
  closing: "mt-6 max-w-xl text-body text-fg",
  repo: "mt-6",

  panel: "group/review flex flex-col rounded-lg border border-line bg-surface",
  header:
    "flex items-center justify-between gap-4 border-b border-line px-4 py-3 font-mono text-label text-muted",
  /**
   * Open while the loop plays; Merged at the end. Both labels share one grid cell, so the
   * badge is as wide as the longer one throughout and nothing around it rewraps.
   */
  status: cx(
    "grid rounded-pill border border-line px-2.5 py-0.5 font-mono text-label text-subtle",
    "transition-colors duration-(--hb-duration-base) data-[merged=true]:border-accent data-[merged=true]:text-accent",
  ),
  statusLabel: "[grid-area:1/1] text-center data-[shown=false]:invisible",
  stages: "flex gap-1.5 px-4 pt-3",
  stage: cx(
    "flex-1 border-t-2 border-line pt-1.5 font-mono text-label text-subtle uppercase",
    "transition-colors duration-(--hb-duration-base) data-[on=true]:border-accent data-[on=true]:text-fg",
  ),

  diff: "flex flex-col gap-3 px-4 py-3",
  lines: "flex flex-col font-mono text-label",
  /** A draft line: plain at first, marked removed once the fix starts. */
  removed: cx(
    "flex gap-2 rounded-sm px-2 py-0.5 text-muted transition-colors duration-(--hb-duration-slow)",
    "group-data-[removed=true]/review:bg-danger/10 group-data-[removed=true]/review:text-danger",
  ),
  /** The sign is transparent until the line is marked; its space is always there. */
  removedSign: "text-transparent group-data-[removed=true]/review:text-danger",
  added: cx(
    "flex gap-2 rounded-sm bg-success/10 px-2 py-0.5 text-success opacity-0",
    reveal,
    "group-data-[fixed=true]/review:opacity-100",
  ),
  sign: "shrink-0",
  code: "min-w-0 whitespace-pre-wrap [overflow-wrap:anywhere]",
  srLabel: "sr-only",

  comment: cx(
    "rounded-r-md border-l-2 border-accent bg-raised px-3 py-2 opacity-0",
    reveal,
    "group-data-[commented=true]/review:opacity-100",
  ),
  commentHeader: "flex gap-2 font-mono text-label text-subtle",
  resolved: cx("text-success opacity-0", reveal, "group-data-[fixed=true]/review:opacity-100"),
  commentBody: "mt-1 text-small text-fg",

  rule: cx(
    "rounded-md border border-line bg-bg px-3 py-2 font-mono text-label opacity-0",
    reveal,
    "group-data-[ruled=true]/review:opacity-100",
  ),
  ruleFile: "text-success",
  ruleMessage: "mt-1 text-muted",

  footer: "flex min-h-14 items-center justify-between gap-4 border-t border-line px-4 py-3",
  checks: "flex flex-wrap gap-x-4 gap-y-1 font-mono text-label",
  check:
    "text-subtle transition-colors duration-(--hb-duration-base) data-[passed=true]:text-success",
  /** Wide enough for its longest label, so Pause → Replay never rewraps the checks. */
  control: "min-w-24 shrink-0",
};
