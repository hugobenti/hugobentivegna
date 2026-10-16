import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import {
  FakeIntersectionObserver,
  centreLineObserver,
  installFakeIntersectionObserver,
} from "@/test/fakeIntersectionObserver";
import { Deck } from "./Deck";
import { Slide } from "./Slide";

const slides = [
  { id: "hero", label: "Intro" },
  { id: "timeline", label: "Experience" },
  { id: "contact", label: "Contact" },
];

function renderDeck() {
  render(
    <Deck slides={slides}>
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
  expect(centre.observed.map((element) => element.id)).toEqual(["hero", "timeline", "contact"]);
});

test("leaves the URL alone until a slide is actually seen", () => {
  history.replaceState(null, "", "/#contact");
  renderDeck();
  expect(location.hash).toBe("#contact");
});

test("the slide crossing the centre line becomes active, however tall it is", () => {
  const { centre } = renderDeck();
  centre.report("#timeline", true);
  expect(screen.getByRole("button", { name: "Experience" })).toHaveAttribute(
    "aria-current",
    "true",
  );
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
