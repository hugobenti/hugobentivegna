import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { RebrandSlide } from "./RebrandSlide";

test("starts in the site's own theme", () => {
  render(<RebrandSlide />);
  expect(screen.getByRole("region", { name: "Rebrand" })).toHaveAttribute("data-theme", "midnight");
  expect(screen.getByRole("radio", { name: "Midnight" })).toBeChecked();
});

test("picking a theme re-skins only this slide, through its data-theme", async () => {
  const { container } = render(
    <div data-theme="midnight">
      <RebrandSlide />
    </div>,
  );
  await userEvent.click(screen.getByRole("radio", { name: "Solar" }));
  expect(screen.getByRole("region", { name: "Rebrand" })).toHaveAttribute("data-theme", "solar");
  expect(container.firstElementChild).toHaveAttribute("data-theme", "midnight");
});

test("the picked option is checked at once, while the slide waits for its view transition", async () => {
  let runUpdate = () => {};
  Object.defineProperty(document, "startViewTransition", {
    configurable: true,
    value: (update: () => void) => {
      runUpdate = update;
      return { finished: Promise.resolve(), ready: Promise.resolve() };
    },
  });
  try {
    render(<RebrandSlide />);
    await userEvent.click(screen.getByRole("radio", { name: "Solar" }));
    expect(screen.getByRole("radio", { name: "Solar" })).toBeChecked();
    expect(screen.getByRole("region", { name: "Rebrand" })).toHaveAttribute(
      "data-theme",
      "midnight",
    );
    act(() => runUpdate());
    expect(screen.getByRole("region", { name: "Rebrand" })).toHaveAttribute("data-theme", "solar");
  } finally {
    Reflect.deleteProperty(document, "startViewTransition");
  }
});
