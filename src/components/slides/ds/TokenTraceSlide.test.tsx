import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { TokenTraceSlide } from "./TokenTraceSlide";

const chainNames = () =>
  within(screen.getByRole("list", { name: /chain/i }))
    .getAllByRole("listitem")
    .map((item) => item.querySelector("code")?.textContent);

test("starts on the primary fill, read from palette to component", () => {
  render(<TokenTraceSlide />);
  expect(screen.getByRole("radio", { name: "Primary fill" })).toBeChecked();
  expect(chainNames()).toEqual(["palette.blue.400", "color.accent", "button.primary.bg"]);
});

test("each step shows its CSS variable and the value it resolves to", () => {
  render(<TokenTraceSlide />);
  const semantic = within(screen.getByRole("list", { name: /chain/i })).getAllByRole("listitem")[1];
  expect(semantic).toHaveTextContent("Semantic");
  expect(semantic).toHaveTextContent("--hb-color-accent");
  expect(semantic).toHaveTextContent("#5aa2ff");
});

test("picking another token traces it and keeps a live Button at the end", async () => {
  render(<TokenTraceSlide />);
  await userEvent.click(screen.getByRole("radio", { name: "Secondary outline" }));
  expect(chainNames()).toEqual(["palette.ink.700", "color.line", "button.secondary.border"]);
  expect(screen.getByRole("button", { name: "A real Button" })).toBeInTheDocument();
});
