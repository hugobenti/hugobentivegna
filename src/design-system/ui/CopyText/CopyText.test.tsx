import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test, vi } from "vitest";
import { CopyText } from "./CopyText";

const email = "hugobenti@gmail.com";

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

test("shows the text itself as the control, with the hint as its description", () => {
  render(<CopyText text={email} />);
  const control = screen.getByRole("button", { name: email });
  expect(control).toHaveAccessibleDescription("Click to copy");
});

// The status changes after the clipboard promise settles, so every assertion on it waits for it.

test("clicking copies the text and announces it", async () => {
  const user = userEvent.setup();
  render(<CopyText text={email} />);
  await user.click(screen.getByRole("button", { name: email }));
  await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Copied"));
  expect(await navigator.clipboard.readText()).toBe(email);
});

test("works from the keyboard", async () => {
  const user = userEvent.setup();
  render(<CopyText text={email} />);
  await user.tab();
  expect(screen.getByRole("button", { name: email })).toHaveFocus();
  await user.keyboard("{Enter}");
  await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Copied"));
  expect(await navigator.clipboard.readText()).toBe(email);
});

test("the confirmation goes back to the hint after exactly two seconds", async () => {
  // fireEvent, not user-event: Testing Library's async wrapper waits on setTimeout(0) and only
  // auto-advances Jest's fake timers, so user-event would hang under Vitest's.
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
  vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
  try {
    render(<CopyText text={email} />);
    fireEvent.click(screen.getByRole("button", { name: email }));
    await act(async () => {}); // let the clipboard promise settle
    const status = screen.getByRole("status");
    expect(writeText).toHaveBeenCalledWith(email);
    expect(status).toHaveTextContent("Copied");
    act(() => vi.advanceTimersByTime(1999));
    expect(status).toHaveTextContent("Copied");
    act(() => vi.advanceTimersByTime(1));
    expect(status).toHaveTextContent("Click to copy");
  } finally {
    Reflect.deleteProperty(navigator, "clipboard");
  }
});

test("when the clipboard rejects, selects the text and explains how to copy it", async () => {
  const user = userEvent.setup();
  vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(new Error("denied"));
  render(<CopyText text={email} />);
  await user.click(screen.getByRole("button", { name: email }));
  await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent(/Ctrl\+C/));
  expect(window.getSelection()?.toString()).toBe(email);
});

test("when the clipboard API is missing, fails the same way", async () => {
  const user = userEvent.setup();
  Object.defineProperty(navigator, "clipboard", { value: undefined, configurable: true });
  render(<CopyText text={email} />);
  await user.click(screen.getByRole("button", { name: email }));
  await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent(/Ctrl\+C/));
  expect(window.getSelection()?.toString()).toBe(email);
});

test("hints can be customised", async () => {
  const user = userEvent.setup();
  render(<CopyText text={email} hint="Clique para copiar" copiedHint="Copiado" />);
  const control = screen.getByRole("button", { name: email });
  expect(control).toHaveAccessibleDescription("Clique para copiar");
  await user.click(control);
  await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Copiado"));
});
