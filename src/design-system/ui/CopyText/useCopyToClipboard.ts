"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { TCopyStatus } from "./useCopyToClipboard.type";

/** How long each result stays before the status returns to idle. */
const RESET_AFTER_MS: Record<Exclude<TCopyStatus, "idle">, number> = { copied: 2000, failed: 6000 };

/**
 * Copies `text` to the clipboard and reports the result. When copying isn't possible, the
 * element behind `textRef` is selected so a single shortcut finishes the job.
 */
export function useCopyToClipboard<T extends HTMLElement>(text: string) {
  const [status, setStatus] = useState<TCopyStatus>("idle");
  const textRef = useRef<T>(null);

  useEffect(() => {
    if (status === "idle") return;
    const timer = setTimeout(() => setStatus("idle"), RESET_AFTER_MS[status]);
    return () => clearTimeout(timer);
  }, [status]);

  const copy = useCallback(async () => {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      if (textRef.current) window.getSelection()?.selectAllChildren(textRef.current);
      setStatus("failed");
    }
  }, [text]);

  return { status, copy, textRef };
}
