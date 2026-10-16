"use client";

import type { ReactNode } from "react";
import type { SlideMeta } from "@/content/types";
import { DotNav } from "@/design-system/ui";
import { deck } from "./Deck.style";
import { useDeck } from "./useDeck";
import "./deck.css";

type DeckProps = {
  slides: readonly SlideMeta[];
  children: ReactNode;
};

/** The slide deck: the slides plus their position dots. Behavior lives in useDeck. */
export function Deck({ slides, children }: DeckProps) {
  const { rootRef, activeId, goTo } = useDeck(slides);
  return (
    <div ref={rootRef} className={deck.root}>
      {children}
      <DotNav items={slides} activeId={activeId} onSelect={goTo} className={deck.dots} />
    </div>
  );
}
