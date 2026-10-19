"use client";

import type { ReactNode } from "react";
import type { AvailableNavLink } from "@/content/navigation";
import type { SlideMeta } from "@/content/types";
import { DotNav } from "@/design-system/ui";
import { deck } from "./Deck.style";
import { SiteHeader } from "./SiteHeader";
import { useDeck } from "./useDeck";
import "./deck.css";

type DeckProps = {
  slides: readonly SlideMeta[];
  /** The header's section links; the one owning the slide in view is marked. */
  nav: readonly AvailableNavLink[];
  children: ReactNode;
};

/**
 * The slide deck: the sticky header (the page banner), the slides as the page's main content,
 * and their position dots. Behavior lives in useDeck.
 */
export function Deck({ slides, nav, children }: DeckProps) {
  const { rootRef, activeId, activeSection, homeHref, goTo } = useDeck(slides, nav);
  return (
    <div ref={rootRef} className={deck.root}>
      <SiteHeader homeHref={homeHref} sections={nav} activeSection={activeSection} />
      <main>{children}</main>
      <DotNav items={slides} activeId={activeId} onSelect={goTo} className={deck.dots} />
    </div>
  );
}
