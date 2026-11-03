import { render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";
import { designSystemCase } from "@/content/cases";
import { slides } from "@/content/slides";
import { CaseCoverSlide } from "./CaseCoverSlide";

test("chapters are links to their slides", () => {
  render(<CaseCoverSlide slide={slides.dsCover} cover={designSystemCase.cover} />);
  const links = within(screen.getByRole("list")).getAllByRole("link");
  expect(links.map((link) => link.getAttribute("href"))).toEqual([
    "#problem",
    "#one-system",
    "#rebrand",
  ]);
});
