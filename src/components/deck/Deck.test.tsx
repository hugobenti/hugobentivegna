import { act, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import {
  FakeIntersectionObserver,
  centreLineObserver,
  installFakeIntersectionObserver,
} from "@/test/fakeIntersectionObserver";
import { site } from "@/content/site";
import { Deck } from "./Deck";
import { Slide } from "./Slide";

const slides = [
  { id: "hero", label: "Intro" },
  { id: "timeline", label: "Experience" },
  { id: "case-cover", label: "Case cover" },
  { id: "case-chapter", label: "Case chapter" },
  { id: "contact", label: "Contact" },
];

const nav = [
  { label: "Story", slideId: "timeline", id: "timeline", href: "#timeline" as const },
  {
    label: "Case",
    slideId: "case-cover",
    section: ["case-cover", "case-chapter"],
    id: "case-cover",
    href: "#case-cover" as const,
  },
  { label: "Contact", slideId: "contact", id: "contact", href: "#contact" as const },
];

function renderDeck() {
  render(
    <Deck slides={slides} nav={nav}>
      {slides.map((slide) => (
        <Slide key={slide.id} slide={slide}>
          {slide.label}
        </Slide>
      ))}
    </Deck>,
  );
  const seenObserver = FakeIntersectionObserver.instances.find(
    (instance) => instance !== centreLineObserver(),
  );
  if (!seenObserver) throw new Error("no 'seen' IntersectionObserver was created");
  return { centre: centreLineObserver(), seen: seenObserver };
}

beforeEach(() => {
  installFakeIntersectionObserver();
  history.replaceState(null, "", "/");
});

afterEach(() => {
  vi.unstubAllGlobals();
});

test("watches every slide against the viewport's centre line", () => {
  const { centre } = renderDeck();
  expect(centre.observed.map((element) => element.id)).toEqual(slides.map((slide) => slide.id));
});

test("leaves the URL alone until a slide is actually seen", () => {
  history.replaceState(null, "", "/#contact");
  renderDeck();
  expect(location.hash).toBe("#contact");
});

test("the slide crossing the centre line becomes active, however tall it is", () => {
  const { centre } = renderDeck();
  centre.report("#timeline", true);
  expect(screen.getByRole("button", { name: "Story" })).toHaveAttribute("aria-current", "true");
  expect(location.hash).toBe("#timeline");
  expect(document.getElementById("hero")?.dataset.position).toBe("before");
  expect(document.getElementById("timeline")?.dataset.position).toBe("active");
  expect(document.getElementById("contact")?.dataset.position).toBe("after");
});

test("a slide leaving the centre line doesn't change the active one", () => {
  const { centre } = renderDeck();
  centre.report("#timeline", true);
  centre.report("#timeline", false);
  expect(location.hash).toBe("#timeline");
});

test("a slide entering the viewport is marked seen without becoming active", () => {
  const { centre, seen } = renderDeck();
  centre.report("#hero", true);
  seen.report("#contact", true);
  expect(document.getElementById("contact")).toHaveAttribute("data-seen");
  expect(screen.getByRole("button", { name: "Intro" })).toHaveAttribute("aria-current", "true");
  expect(location.hash).toBe("");
});

test("returning to the first slide clears the hash", () => {
  const { centre } = renderDeck();
  centre.report("#contact", true);
  expect(location.hash).toBe("#contact");
  centre.report("#hero", true);
  expect(location.hash).toBe("");
});

test("choosing a dot scrolls that slide into view", () => {
  vi.stubGlobal("matchMedia", (query: string) => ({ matches: false, media: query }));
  renderDeck();
  const scrollIntoView = vi.fn();
  const contact = document.getElementById("contact");
  if (!contact) throw new Error("missing slide");
  contact.scrollIntoView = scrollIntoView;
  act(() => screen.getByRole("button", { name: "Contact" }).click());
  expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
});

test("the header marks the section of the slide in view, and nothing on the intro", () => {
  const { centre } = renderDeck();
  const current = () =>
    nav
      .map((link) => link.label)
      .filter(
        (name) => screen.getByRole("link", { name }).getAttribute("aria-current") === "location",
      );
  centre.report("#hero", true);
  expect(current()).toEqual([]);
  centre.report("#timeline", true);
  expect(current()).toEqual(["Story"]);
  centre.report("#contact", true);
  expect(current()).toEqual(["Contact"]);
});

test("one dot per section: the intro, then each header link, marking the section in view", () => {
  const { centre } = renderDeck();
  const dots = within(screen.getByRole("navigation", { name: site.dotsLabel }));
  const current = () =>
    dots
      .getAllByRole("button")
      .filter((dot) => dot.getAttribute("aria-current") === "true")
      .map((dot) => dot.textContent);
  expect(dots.getAllByRole("button").map((dot) => dot.textContent)).toEqual([
    "Intro",
    "Story",
    "Case",
    "Contact",
  ]);
  centre.report("#hero", true);
  expect(current()).toEqual(["Intro"]);
  centre.report("#case-chapter", true);
  expect(current()).toEqual(["Case"]);
  centre.report("#contact", true);
  expect(current()).toEqual(["Contact"]);
});
