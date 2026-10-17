# Motion conventions

GSAP 3.15 (`gsap`) + `@gsap/react` 2.1. ScrollTrigger, Flip and SplitText ship
with `gsap` and are registered once in `src/lib/motion/gsap.ts`.

## Rules

1. **Import from `@/lib/motion` only.** Never `import … from "gsap/…"` in
   components; the barrel guarantees plugins are registered with project
   defaults. Server components import nothing from it except
   `@/lib/motion/intro` (the layout does this).
2. **Animate in `useGSAP()` with a `scope` ref.** Everything created in the
   callback (tweens, timelines, ScrollTriggers, SplitTexts, matchMedia) is
   reverted on unmount. Selector strings are scoped to the ref, so class names
   like `.hero-title` cannot leak across components.
3. **Wrap behaviour in `responsive()`** (gsap.matchMedia). Branch on
   `isMobile` / `isTablet` / `isDesktop` / `reduceMotion` / `canHover`. A
   change in any condition reverts and rebuilds that branch. For one-shot
   intros pass `["reduceMotion"]` so crossing a breakpoint does not replay
   them.
4. **Event handlers that animate go through `contextSafe`** (second argument
   of the useGSAP callback, or its return value) so their tweens are cleaned
   up too. Remove listeners in the returned cleanup.
5. **Transforms, opacity and clip-path only.** Never animate width, height,
   top/left or margins. Layout changes go through Flip.
6. **Content is visible by default.** CSS never hides content on its own.
   Hidden start states are applied by GSAP (`from`/`fromTo`/`set`) after JS
   runs. The one exception is the intro gate below.
7. **Reduced motion:** in the `reduceMotion` branch, skip the animation (or
   use a short opacity fade). Do not pin, scrub, split or parallax.

## Building blocks (`src/lib/motion`)

| Need | API |
| --- | --- |
| Hero sequence | `gsap.timeline()` + `clipReveal()` + `splitReveal({ timeline, position })`, then `releaseIntro()` |
| SplitText headline | `splitReveal(target, { by: "lines" \| "words" \| "chars", scrollTrigger })` (autoSplit, masked, aria-safe) |
| Image reveal | `clipReveal(frame, { from, media })` |
| Scroll-scrubbed scale / clip / parallax | `scrubMedia(frame, media, { scale, drift, clipInset })` |
| Pinned storytelling | `pinnedScene(section, { end })` then add steps to the returned timeline |
| Staggered entrances (below the fold) | `batchReveal(targets)` |
| Hover | `gsap.quickTo` per single property (`scaleX`/`scaleY`, not `scale`) inside a `canHover` branch, handlers via `contextSafe` |
| Layout transitions | `useFlip(scopeRef, "[data-flip-id]", [state])`; call the returned `capture()` before `setState` |
| Tokens | `EASE`, `DURATION`, `STAGGER` in `tokens.ts` (placeholder values until art direction) |

`src/app/motion-lab` demonstrates every pattern and is the regression page
for the foundation (noindex; remove or keep private once real pages exist).

## Intro gate (hero only)

`<head>` runs an inline script that sets `data-motion-intro` on `<html>` when
JS is on and reduced motion is off. CSS hides `[data-intro]` elements while it
is present. The hero applies its from-states and calls `releaseIntro()`; a
2.5 s failsafe removes the attribute regardless. Only put `data-intro` on
elements whose component calls `releaseIntro()`.

## Next.js specifics

- `cacheComponents` is on, so routes are hidden with React `<Activity>`
  instead of unmounting. Hiding runs effect cleanups (animations revert),
  showing again re-runs them, so entrances replay on back/forward. Make
  every useGSAP callback safe to run more than once, and keep animation state
  in GSAP, not module variables.
- `MotionRuntime` (root layout) refreshes ScrollTrigger after client
  navigation and after web fonts load. Pages should not call
  `ScrollTrigger.refresh()` themselves except after their own async layout
  changes (e.g. images without dimensions).
- Give media explicit dimensions or aspect ratios so trigger positions and
  layout stay stable.
- SplitText line masks get the class `split-line-mask`; `globals.css`
  extends them slightly so descenders are not clipped.
