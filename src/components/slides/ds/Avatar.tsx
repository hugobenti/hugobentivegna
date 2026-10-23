import { avatarShapes } from "./Avatar.data";
import { avatar } from "./Avatar.style";
import type { TAvatarProps } from "./Avatar.type";

/** A developer at a laptop: decorative, so it carries no label. */
export function Avatar({ className }: TAvatarProps) {
  return (
    <svg viewBox={avatarShapes.viewBox} className={className}>
      <circle {...avatarShapes.head} className={avatar.head} />
      <path {...avatarShapes.shoulders} className={avatar.head} />
      <rect {...avatarShapes.laptop} className={avatar.laptop} />
    </svg>
  );
}
