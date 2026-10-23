import { act } from "@testing-library/react";
import { vi } from "vitest";

/** IntersectionObserver stand-in whose callbacks a test drives by hand. */
export class FakeIntersectionObserver {
  static instances: FakeIntersectionObserver[] = [];
  observed: Element[] = [];

  constructor(
    private callback: IntersectionObserverCallback,
    readonly options: IntersectionObserverInit = {},
  ) {
    FakeIntersectionObserver.instances.push(this);
  }

  observe(element: Element) {
    this.observed.push(element);
  }
  disconnect() {
    this.observed = [];
  }
  unobserve() {}
  takeRecords() {
    return [];
  }

  /** Reports every element this observer watches, so a test needs no marker in the markup. */
  reportAll(isIntersecting: boolean) {
    if (this.observed.length === 0) throw new Error("this observer watches nothing");
    act(() =>
      this.callback(
        this.observed.map((target) => ({ target, isIntersecting }) as IntersectionObserverEntry),
        this as unknown as IntersectionObserver,
      ),
    );
  }

  /** Reports whether the observed element matching `selector` intersects this observer's root. */
  report(selector: string, isIntersecting: boolean) {
    const target = this.observed.find((element) => element.matches(selector));
    if (!target) throw new Error(`nothing observed matches ${selector}`);
    act(() =>
      this.callback(
        [{ target, isIntersecting } as IntersectionObserverEntry],
        this as unknown as IntersectionObserver,
      ),
    );
  }
}

/** Installs the fake for one test file; call in beforeEach. */
export function installFakeIntersectionObserver() {
  FakeIntersectionObserver.instances = [];
  vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);
}

/** The observer whose root is the viewport's centre line (rootMargin -50% top and bottom). */
export function centreLineObserver(): FakeIntersectionObserver {
  const observer = FakeIntersectionObserver.instances.find((instance) =>
    instance.options.rootMargin?.startsWith("-50%"),
  );
  if (!observer) throw new Error("no centre-line IntersectionObserver was created");
  return observer;
}
