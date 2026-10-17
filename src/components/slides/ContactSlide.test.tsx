import { existsSync } from "node:fs";
import path from "node:path";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { ContactSlide } from "./ContactSlide";

const email = "hugobenti@gmail.com";

test("the email is shown and copies itself on click", () => {
  render(<ContactSlide />);
  expect(screen.getByRole("button", { name: email })).toHaveAccessibleDescription("Click to copy");
});

test("the email can also be opened in the visitor's mail app", () => {
  render(<ContactSlide />);
  expect(screen.getByRole("link", { name: "Send an email" })).toHaveAttribute(
    "href",
    `mailto:${email}`,
  );
});

test("profiles open safely in a new tab", () => {
  render(<ContactSlide />);
  const linkedin = screen.getByRole("link", { name: /LinkedIn.*opens in a new tab/ });
  const github = screen.getByRole("link", { name: /GitHub.*opens in a new tab/ });
  expect(linkedin).toHaveAttribute("href", "https://linkedin.com/in/hugo-bentivegna");
  expect(github).toHaveAttribute("href", "https://github.com/hugobenti");
  for (const link of [linkedin, github]) expect(link).toHaveAttribute("rel", "noopener noreferrer");
});

test("the CV downloads a file that is actually published", () => {
  render(<ContactSlide />);
  const cv = screen.getByRole("link", { name: "Download CV" });
  expect(cv).toHaveAttribute("download");
  const href = cv.getAttribute("href") ?? "";
  expect(existsSync(path.join(process.cwd(), "public", href))).toBe(true);
});

test("no phone number appears on the page", () => {
  const { container } = render(<ContactSlide />);
  expect(container.textContent).not.toMatch(/\+?55|\d{4,5}-\d{4}|99374/);
  expect(container.innerHTML).not.toMatch(/tel:/);
});
