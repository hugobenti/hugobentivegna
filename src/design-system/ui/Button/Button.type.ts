import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import type { button } from "./Button.style";

export type TButtonBase = {
  /** Visual weight. One `primary` per view; `secondary` beside it; `ghost` for low emphasis. */
  variant?: keyof typeof button.variant;
  size?: keyof typeof button.size;
  children: ReactNode;
  className?: string;
};

export type TNativeButtonProps = TButtonBase & {
  href?: undefined;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">;

export type TLinkButtonProps = TButtonBase & {
  /** Renders an `<a>`: use whenever the action navigates or downloads. */
  href: string;
  /** Opens in a new tab with `rel="noopener noreferrer"` and announces it to screen readers. */
  external?: boolean;
  download?: boolean | string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className" | "href" | "download">;

export type TButtonProps = TNativeButtonProps | TLinkButtonProps;
