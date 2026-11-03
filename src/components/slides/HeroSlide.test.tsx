import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { site } from "@/content/site";
import { HeroSlide } from "./HeroSlide";

test("the hero links to each case cover", () => {
  render(<HeroSlide />);
  const links = screen.getAllByRole("link");
  expect(links.map((link) => link.getAttribute("href"))).toEqual([
    "#design-systems",
    "#ai-development",
    "#pixelhb",
  ]);
  site.heroCases.forEach(({ label }, index) => {
    expect(links[index]).toHaveAccessibleName(expect.stringContaining(label));
  });
});

test("the hero states availability", () => {
  render(<HeroSlide />);
  expect(screen.getByText(site.availability)).toBeInTheDocument();
});
