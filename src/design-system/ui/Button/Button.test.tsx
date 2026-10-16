import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Button } from "./Button";

test("renders a native button that doesn't submit forms by default", () => {
  render(<Button>Go</Button>);
  expect(screen.getByRole("button", { name: "Go" })).toHaveAttribute("type", "button");
});

test("renders a link when href is given", () => {
  render(<Button href="/system">Go</Button>);
  const link = screen.getByRole("link", { name: "Go" });
  expect(link).toHaveAttribute("href", "/system");
  expect(link).not.toHaveAttribute("target");
});

test("external links open safely in a new tab and say so", () => {
  render(
    <Button href="https://github.com/hugobenti" external>
      Code
    </Button>,
  );
  const link = screen.getByRole("link", { name: /Code.*opens in a new tab/ });
  expect(link).toHaveAttribute("target", "_blank");
  expect(link.getAttribute("rel")).toMatch(/noopener/);
  expect(link.getAttribute("rel")).toMatch(/noreferrer/);
});

test("download links keep the download attribute", () => {
  render(
    <Button href="/cv.pdf" download>
      Download CV
    </Button>,
  );
  expect(screen.getByRole("link", { name: "Download CV" })).toHaveAttribute("download");
});
