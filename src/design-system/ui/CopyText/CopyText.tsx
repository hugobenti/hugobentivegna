"use client";

import { cx } from "../cx";
import { copyText } from "./CopyText.style";
import { useCopyText } from "./useCopyText";

export type CopyTextProps = {
  /** The text shown and copied, e.g. an email address. */
  text: string;
  /** Shown on hover and focus; also the control's accessible description. */
  hint?: string;
  /** Shown and announced after a successful copy. */
  copiedHint?: string;
  /** Shown and announced when copying isn't possible; the text is selected for manual copying. */
  failedHint?: string;
  className?: string;
};

/** Shows a piece of text that copies itself when clicked. Behavior lives in useCopyText. */
export function CopyText({
  text,
  hint = "Click to copy",
  copiedHint = "Copied",
  failedHint = "Selected — press Ctrl+C (⌘C on Mac)",
  className,
}: CopyTextProps) {
  const { status, message, copy, textRef, hintId } = useCopyText(text, {
    hint,
    copiedHint,
    failedHint,
  });

  return (
    <span className={cx(copyText.base, className)}>
      <button type="button" className={copyText.trigger} aria-describedby={hintId} onClick={copy}>
        <span ref={textRef}>{text}</span>
        <svg className={copyText.icon} viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </button>
      <span id={hintId} role="status" data-state={status} className={copyText.hint}>
        {message}
      </span>
    </span>
  );
}
