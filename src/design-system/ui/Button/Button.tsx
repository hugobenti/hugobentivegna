import { cx } from "../cx";
import { button } from "./Button.style";
import type { TButtonProps } from "./Button.type";

export function Button(props: TButtonProps) {
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
