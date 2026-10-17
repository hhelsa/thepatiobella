/**
 * Motion tokens. Placeholder values until the art direction stage; change
 * them here rather than hard-coding eases/durations in components.
 */
export const EASE = {
  out: "power3.out",
  outStrong: "expo.out",
  inOut: "power2.inOut",
  cinematic: "expo.inOut",
  linear: "none",
} as const;

export const DURATION = {
  fast: 0.35,
  base: 0.8,
  slow: 1.2,
  cinematic: 1.6,
} as const;

export const STAGGER = {
  tight: 0.035,
  base: 0.08,
  loose: 0.14,
} as const;
