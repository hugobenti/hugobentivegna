import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "../cx";
import { button } from "./Button.style";

type ButtonBase = {
  /** Visual weight. One `primary` per view; `secondary` beside it; `ghost` for low emphasis. */
  variant?: keyof typeof button.variant;
  size?: keyof typeof button.size;
  children: ReactNode;
  className?: string;
};

type NativeButtonProps = ButtonBase & {
  href?: undefined;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">;

type LinkButtonProps = ButtonBase & {
  /** Renders an `<a>`: use whenever the action navigates or downloads. */
  href: string;
  /** Opens in a new tab with `rel="noopener noreferrer"` and announces it to screen readers. */
  external?: boolean;
  download?: boolean | string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className" | "href" | "download">;

export type ButtonProps = NativeButtonProps | LinkButtonProps;

export function Button(props: ButtonProps) {
  const className = cx(
    button.base,
    button.variant[props.variant ?? "primary"],
    button.size[props.size ?? "md"],
    props.className,
  );

  if (props.href !== undefined) {
    const { variant, size, className: _, children, external, ...anchor } = props;
    return (
      <a
        {...anchor}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={className}
      >
        {children}
        {external && (
          <>
            <span aria-hidden="true">↗</span>
            <span className={button.newTabHint}> (opens in a new tab)</span>
          </>
        )}
      </a>
    );
  }

  const { variant, size, className: _, children, href, type = "button", ...native } = props;
  return (
    <button {...native} type={type} className={className}>
      {children}
    </button>
  );
}
