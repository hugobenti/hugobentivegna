const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

/** The panel's focusable elements in DOM (Tab) order, skipping anything inside an `inert` subtree. */
export function focusables(panel: Element): Element[] {
  return [...panel.querySelectorAll(FOCUSABLE)].filter((element) => !element.closest("[inert]"));
}
