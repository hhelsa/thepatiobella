/**
 * Reusable animation factories. Call them inside useGSAP() (usually inside a
 * responsive() branch) so every tween, ScrollTrigger and SplitText they
 * create is owned by the component's context and reverted on unmount.
 *
 * Presets only use transforms, opacity and clip-path. None of them change
 * layout, so they cannot cause layout shift.
 */
import { gsap, ScrollTrigger, SplitText } from "./gsap";
import { DURATION, EASE, STAGGER } from "./tokens";

type SplitUnit = "lines" | "words" | "chars";

export interface SplitRevealOptions {
  /** Unit that animates. Lines are always split so they can act as masks. */
  by?: SplitUnit;
  duration?: number;
  stagger?: number;
  ease?: string;
  delay?: number;
  /** Play when scrolled into view. Ignored if `timeline` is given. */
  scrollTrigger?: ScrollTrigger.Vars;
  /** Sequence inside a parent timeline (e.g. a hero intro). */
  timeline?: gsap.core.Timeline;
  position?: gsap.Position;
}

const SPLIT_TYPES: Record<SplitUnit, string> = {
  lines: "lines",
  words: "lines,words",
  chars: "lines,words,chars",
};

/**
 * Masked headline reveal. Uses SplitText's autoSplit so lines are re-split
 * (and the animation rebuilt at the same progress) after fonts load or the
 * element resizes. aria: "auto" keeps the heading readable as one string
 * for assistive technology.
 */
export function splitReveal(
  target: gsap.DOMTarget,
  {
    by = "lines",
    duration = DURATION.slow,
    stagger = by === "chars" ? STAGGER.tight : STAGGER.base,
    ease = EASE.outStrong,
    delay,
    scrollTrigger,
    timeline,
    position,
  }: SplitRevealOptions = {},
): SplitText {
  return SplitText.create(target, {
    type: SPLIT_TYPES[by],
    mask: "lines",
    linesClass: "split-line", // masks get "split-line-mask" (see globals.css)
    autoSplit: true,
    aria: "auto",
    onSplit(self) {
      const tween = gsap.from(self[by], {
        yPercent: 115,
        duration,
        stagger,
        ease,
        delay,
        scrollTrigger: timeline ? undefined : scrollTrigger,
      });
      timeline?.add(tween, position);
      // Returning the tween lets SplitText kill it and carry its progress
      // over to the rebuilt one on re-split.
      return tween;
    },
  });
}

const CLIP_FROM = {
  top: "inset(0% 0% 100% 0%)",
  bottom: "inset(100% 0% 0% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
  center: "inset(50% 50% 50% 50%)",
} as const;
const CLIP_OPEN = "inset(0% 0% 0% 0%)";

export interface ClipRevealOptions {
  /** Edge the reveal grows from. */
  from?: keyof typeof CLIP_FROM;
  /** Inner media that settles from a slight zoom while the frame opens. */
  media?: gsap.DOMTarget;
  duration?: number;
  ease?: string;
  delay?: number;
  scrollTrigger?: ScrollTrigger.Vars;
}

/** Image/frame reveal via clip-path, with optional counter-scaled media. */
export function clipReveal(
  frame: gsap.DOMTarget,
  {
    from = "bottom",
    media,
    duration = DURATION.cinematic,
    ease = EASE.cinematic,
    delay,
    scrollTrigger,
  }: ClipRevealOptions = {},
): gsap.core.Timeline {
  const tl = gsap.timeline({ delay, scrollTrigger, defaults: { duration, ease } });
  tl.fromTo(frame, { clipPath: CLIP_FROM[from] }, { clipPath: CLIP_OPEN });
  if (media) tl.fromTo(media, { scale: 1.3 }, { scale: 1 }, 0);
  return tl;
}

export interface ScrubMediaOptions {
  /** [from, to] scale of the media across the scroll range. */
  scale?: [number, number];
  /** Parallax travel in percent of the media's own height (± value). */
  drift?: number;
  /** Frame opens from this inset (percent per side) to 0 as it scrolls in. */
  clipInset?: number;
  start?: string;
  end?: string;
  scrub?: boolean | number;
}

/**
 * Scroll-scrubbed media: scale + parallax drift on the media, optional
 * clip-path opening on the frame. The media should be oversized (or the
 * frame overflow: hidden) so drift never exposes edges.
 */
export function scrubMedia(
  frame: Element,
  media: gsap.DOMTarget,
  {
    scale = [1.2, 1],
    drift = 8,
    clipInset,
    start = "top bottom",
    end = "bottom top",
    scrub = true,
  }: ScrubMediaOptions = {},
): gsap.core.Timeline {
  const tl = gsap.timeline({
    defaults: { ease: EASE.linear, duration: 1 },
    scrollTrigger: { trigger: frame, start, end, scrub },
  });
  tl.fromTo(
    media,
    { scale: scale[0], yPercent: -drift },
    { scale: scale[1], yPercent: drift },
    0,
  );
  if (clipInset !== undefined) {
    const i = `${clipInset}%`;
    tl.fromTo(
      frame,
      { clipPath: `inset(${i} ${i} ${i} ${i})` },
      { clipPath: CLIP_OPEN, duration: 0.5 },
      0,
    );
  }
  return tl;
}

export interface BatchRevealOptions {
  y?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  start?: string;
}

/**
 * Staggered entrance for groups (cards, grid items, list rows) as they enter
 * the viewport, batched so items arriving together stagger together.
 * Intended for content below the fold: items are hidden on mount.
 */
export function batchReveal(
  targets: gsap.DOMTarget,
  {
    y = 40,
    duration = DURATION.base,
    stagger = STAGGER.base,
    ease = EASE.out,
    start = "top 88%",
  }: BatchRevealOptions = {},
): ScrollTrigger[] {
  // Batch callbacks fire later, outside the creating context, so run their
  // tweens through it explicitly to keep them in the cleanup.
  const ctx = gsap.context() as gsap.Context | undefined;
  const play = (batch: Element[]) => {
    const run = () =>
      gsap.to(batch, { autoAlpha: 1, y: 0, duration, stagger, ease, overwrite: true });
    if (ctx) ctx.add(run);
    else run();
  };

  gsap.set(targets, { autoAlpha: 0, y });
  return ScrollTrigger.batch(targets, { start, once: true, onEnter: play });
}

export interface PinnedSceneOptions {
  /** Scroll distance of the scene, e.g. "+=200%". */
  end?: string;
  scrub?: boolean | number;
  snap?: ScrollTrigger.Vars["snap"];
  pinSpacing?: boolean;
}

/**
 * Pinned, scroll-scrubbed timeline for coordinated storytelling. Add steps
 * to the returned timeline; the timeline's duration maps onto `end`.
 */
export function pinnedScene(
  trigger: Element,
  { end = "+=200%", scrub = 1, snap, pinSpacing = true }: PinnedSceneOptions = {},
): gsap.core.Timeline {
  return gsap.timeline({
    defaults: { ease: EASE.inOut },
    scrollTrigger: {
      trigger,
      start: "top top",
      end,
      scrub,
      snap,
      pin: true,
      pinSpacing,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });
}
