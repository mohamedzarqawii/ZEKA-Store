import type { IconHandle } from "@animateicons/react";

// One helper for every icon, thanks to the shared IconHandle type.
export function handleHover(
  e: React.MouseEvent,
  ref: React.RefObject<IconHandle | null>,
) {
  if (e.type === "mouseenter") ref.current?.startAnimation();
  if (e.type === "mouseleave") ref.current?.stopAnimation();
}
