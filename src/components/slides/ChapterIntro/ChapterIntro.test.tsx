import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { ChapterIntro } from "./ChapterIntro";

test("renders the kicker, a level-2 heading and the body in reading order", () => {
  const { container } = render(<ChapterIntro kicker="01 · Topic" title="A headline" body="Why." />);
  expect(screen.getByRole("heading", { level: 2, name: "A headline" })).toBeInTheDocument();
  expect(container.textContent).toBe("01 · TopicA headlineWhy.");
});

test("staggers the three lines in order so they enter one after another", () => {
  const { container } = render(<ChapterIntro kicker="k" title="t" body="b" />);
  const order = [...container.children].map((element) =>
    (element as HTMLElement).style.getPropertyValue("--i"),
  );
  expect(order).toEqual(["0", "1", "2"]);
});
