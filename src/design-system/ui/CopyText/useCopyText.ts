"use client";

import { useId } from "react";
import { useCopyToClipboard } from "./useCopyToClipboard";

type Hints = { hint: string; copiedHint: string; failedHint: string };

/** View model for CopyText: the copy action, its status and the hint to show for that status. */
export function useCopyText(text: string, { hint, copiedHint, failedHint }: Hints) {
  const { status, copy, textRef } = useCopyToClipboard<HTMLSpanElement>(text);
  const message = { idle: hint, copied: copiedHint, failed: failedHint }[status];
  return { status, message, copy, textRef, hintId: useId() };
}
