import { useRef, type RefObject } from "react";

import { Flip, useGSAP } from "./gsap";
import { prefersReducedMotion } from "./media";
import { DURATION, EASE } from "./tokens";

/**
 * Animates elements between two React-rendered layouts with Flip.
 *
 *   const capture = useFlip(rootRef, "[data-flip-id]", [layout]);
 *   const toggle = () => { capture(); setLayout(next); };
 *
 * `capture()` records positions before the state change; after React
 * commits the new layout (and before paint) Flip animates from the recorded
 * state. Elements are matched by `data-flip-id`, so give each a stable one.
 * Interrupted flips continue smoothly from their current position.
 */
export function useFlip(
  scope: RefObject<HTMLElement | null>,
  selector: string,
  dependencies: unknown[],
  vars: Flip.FromToVars = {},
): () => void {
  const state = useRef<Flip.FlipState | null>(null);

  useGSAP(
    () => {
      const recorded = state.current;
      state.current = null;
      if (!recorded || prefersReducedMotion()) return;
      Flip.from(recorded, {
        duration: DURATION.slow,
        ease: EASE.cinematic,
        absolute: true,
        nested: true,
        ...vars,
      });
    },
    { scope, dependencies },
  );

  return () => {
    const root = scope.current;
    if (root) state.current = Flip.getState(root.querySelectorAll(selector));
  };
}
