import { gsap } from "./gsap";

/** Mirrors Tailwind's `md` and `lg` breakpoints. */
export const BREAKPOINTS = { tablet: 768, desktop: 1024 } as const;

export const MOTION_QUERIES = {
  isMobile: `(max-width: ${BREAKPOINTS.tablet - 0.02}px)`,
  isTablet: `(min-width: ${BREAKPOINTS.tablet}px) and (max-width: ${BREAKPOINTS.desktop - 0.02}px)`,
  isDesktop: `(min-width: ${BREAKPOINTS.desktop}px)`,
  reduceMotion: "(prefers-reduced-motion: reduce)",
  canHover: "(hover: hover) and (pointer: fine)",
} as const;

export type MotionQuery = keyof typeof MOTION_QUERIES;
export type MotionConditions<K extends MotionQuery = MotionQuery> = Record<
  K,
  boolean
>;

type ResponsiveSetup<K extends MotionQuery> = (
  conditions: MotionConditions<K>,
  context: gsap.Context,
) => void | (() => void);

/**
 * Builds animations per device class / motion preference with
 * gsap.matchMedia(). Everything created inside `setup` is reverted and
 * rebuilt automatically whenever a watched condition changes (resize across
 * a breakpoint, OS reduced-motion toggle), so there are never duplicate
 * ScrollTriggers or stale pins.
 *
 * `watch` limits which queries trigger a rebuild. Pass e.g.
 * ["reduceMotion"] for one-shot intros that must not replay when the window
 * crosses a breakpoint. `setup` always runs at least once.
 *
 * Call it inside useGSAP(): the MatchMedia is then owned by that context,
 * inherits its `scope` for selector text, and is reverted on unmount.
 */
export function responsive<K extends MotionQuery = MotionQuery>(
  setup: ResponsiveSetup<K>,
  watch?: readonly K[],
): gsap.MatchMedia {
  const keys = (watch ?? Object.keys(MOTION_QUERIES)) as K[];
  const queries: Record<string, string> = { all: "all" };
  for (const key of keys) queries[key] = MOTION_QUERIES[key];

  const mm = gsap.matchMedia();
  mm.add(queries, (context) =>
    setup(context.conditions as MotionConditions<K>, context),
  );
  return mm;
}

/** One-off check for code paths outside matchMedia (e.g. event handlers). */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia(MOTION_QUERIES.reduceMotion).matches
  );
}
