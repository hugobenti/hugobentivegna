import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { PixelField } from "./PixelField";

test("is decoration only: hidden from assistive tech and never focusable", () => {
  const { container } = render(<PixelField placement="top-right" />);
  expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  expect(screen.queryByRole("img")).toBeNull();
});
