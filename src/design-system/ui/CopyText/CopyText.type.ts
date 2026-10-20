export type TCopyTextProps = {
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
