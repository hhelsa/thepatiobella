import { stops } from "@/content/home";

import { StopLink } from "./StopLink";

/**
 * Phones only: the two stops as a sticky bottom bar. It sits in the flow just
 * before the closing section, so with position: sticky it stays pinned to the
 * bottom of the screen from the first frame until the closing section's
 * large stop links take over. No JavaScript involved.
 */
export function CallBar() {
  return (
    <nav
      aria-label="Call to reserve"
      className="sticky bottom-0 z-40 bg-canopy pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_30px_-12px_rgb(16_35_12/0.35)] md:hidden"
    >
      <ul className="grid h-(--callbar-h) grid-cols-2 divide-x divide-light/15">
        {stops.map((stop) => (
          <li key={stop.id}>
            <StopLink stop={stop} variant="compact" />
          </li>
        ))}
      </ul>
    </nav>
  );
}
