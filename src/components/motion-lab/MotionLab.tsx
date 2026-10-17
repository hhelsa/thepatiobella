"use client";

import { useRef, useState } from "react";

import {
  batchReveal,
  clipReveal,
  DURATION,
  EASE,
  gsap,
  pinnedScene,
  releaseIntro,
  responsive,
  scrubMedia,
  splitReveal,
  useFlip,
  useGSAP,
} from "@/lib/motion";

/** Placeholder "photography" until real imagery arrives. */
const SWATCHES = [
  "from-amber-200 to-rose-400",
  "from-lime-200 to-emerald-500",
  "from-orange-200 to-red-500",
  "from-stone-200 to-stone-500",
  "from-yellow-100 to-amber-500",
  "from-rose-100 to-fuchsia-400",
];

function Placeholder({ i, className = "" }: { i: number; className?: string }) {
  return (
    <div
      aria-hidden
      className={`size-full bg-linear-to-br ${SWATCHES[i % SWATCHES.length]} ${className}`}
    />
  );
}

function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      responsive(
        ({ reduceMotion }) => {
          if (!reduceMotion) {
            const tl = gsap.timeline({ delay: 0.15 });
            tl.add(clipReveal(".hero-frame", { media: ".hero-media" }), 0);
            splitReveal(".hero-title", { by: "chars", timeline: tl, position: 0.35 });
            tl.from(
              ".hero-meta",
              { autoAlpha: 0, y: 16, duration: DURATION.base, stagger: 0.1 },
              0.9,
            );
          }
          // From-states are now applied (or skipped); safe to un-gate.
          releaseIntro();
        },
        ["reduceMotion"],
      );
    },
    { scope: root },
  );

  return (
    <header ref={root} className="grid min-h-svh items-end gap-8 p-6 md:grid-cols-2 md:p-12">
      <div className="space-y-6">
        <p data-intro className="hero-meta text-sm tracking-[0.3em] uppercase">
          1 · Cinematic entrance
        </p>
        <h1 data-intro className="hero-title text-6xl leading-[0.95] font-semibold md:text-8xl">
          Long lunches, golden hours
        </h1>
        <p data-intro className="hero-meta max-w-md text-lg opacity-80">
          Clip-path image reveal, SplitText character reveal and staggered
          meta copy sequenced on one timeline, gated against first-paint flash.
        </p>
      </div>
      <div data-intro className="hero-frame aspect-4/5 overflow-hidden rounded-sm">
        <Placeholder i={0} className="hero-media" />
      </div>
    </header>
  );
}

function SplitHeadline() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      responsive(
        ({ reduceMotion }) => {
          if (reduceMotion) return;
          splitReveal(".split-title", {
            by: "lines",
            scrollTrigger: { trigger: ".split-title", start: "top 80%" },
          });
          splitReveal(".split-words", {
            by: "words",
            scrollTrigger: { trigger: ".split-words", start: "top 85%" },
          });
        },
        ["reduceMotion"],
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="mx-auto max-w-5xl space-y-10 px-6 py-32">
      <p className="text-sm tracking-[0.3em] uppercase">5 · SplitText reveals</p>
      <h2 className="split-title text-4xl leading-tight font-semibold md:text-6xl">
        Lines rise out of their own masks and re-split when the column
        resizes or fonts finish loading.
      </h2>
      <p className="split-words max-w-2xl text-xl leading-relaxed opacity-80">
        Word-level variant for supporting copy. Screen readers get the
        original sentence through aria-label, not fragments.
      </p>
    </section>
  );
}

function StaggerGrid() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (_, contextSafe) => {
      responsive(({ reduceMotion, canHover }) => {
        if (!reduceMotion) batchReveal(".grid-card");
        if (!canHover || reduceMotion || !contextSafe) return;

        // Hover: quickTo reuses one tween per property instead of
        // creating a new tween on every pointer event. It only accepts
        // single properties, so use scaleX/scaleY rather than "scale".
        const cleanups = gsap.utils.toArray<HTMLElement>(".grid-card").map((card) => {
          const media = card.querySelector(".card-media");
          const quick = { duration: 0.6, ease: EASE.out };
          const scaleX = gsap.quickTo(media, "scaleX", quick);
          const scaleY = gsap.quickTo(media, "scaleY", quick);
          const scale = (v: number) => {
            scaleX(v);
            scaleY(v);
          };
          const lift = gsap.quickTo(card, "y", quick);
          const enter = contextSafe(() => {
            scale(1.06);
            lift(-6);
          });
          const leave = contextSafe(() => {
            scale(1);
            lift(0);
          });
          card.addEventListener("pointerenter", enter);
          card.addEventListener("pointerleave", leave);
          return () => {
            card.removeEventListener("pointerenter", enter);
            card.removeEventListener("pointerleave", leave);
          };
        });
        return () => cleanups.forEach((fn) => fn());
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="mx-auto max-w-6xl px-6 py-24">
      <p className="mb-10 text-sm tracking-[0.3em] uppercase">
        6 · Staggered entrances & hover
      </p>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {SWATCHES.map((_, i) => (
          <li key={i} className="grid-card">
            <a href="#flip" className="block focus-visible:outline-2 focus-visible:outline-offset-4">
              <div className="aspect-square overflow-hidden rounded-sm">
                <Placeholder i={i} className="card-media" />
              </div>
              <span className="mt-3 block text-sm">Dish {i + 1}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

const STORY = ["Morning light", "Long table", "Last pour"];

function PinnedStory() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      responsive(({ isMobile, reduceMotion }) => {
        // Mobile and reduced motion get the stacked, unpinned layout.
        if (isMobile || reduceMotion) return;

        const panels = gsap.utils.toArray<HTMLElement>(".story-panel");
        const captions = gsap.utils.toArray<HTMLElement>(".story-caption");
        const tl = pinnedScene(root.current!, { end: `+=${panels.length * 100}%` });

        panels.slice(1).forEach((panel, i) => {
          tl.fromTo(
            panel,
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)" },
            i,
          )
            .fromTo(panel.firstElementChild, { scale: 1.25 }, { scale: 1 }, i)
            .to(captions[i], { autoAlpha: 0, y: -30 }, i)
            .fromTo(captions[i + 1], { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0 }, i + 0.3);
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative md:h-svh md:overflow-hidden">
      <p className="px-6 pt-24 text-sm tracking-[0.3em] uppercase md:absolute md:top-8 md:left-12 md:z-10 md:p-0">
        3 · Pinned storytelling
      </p>
      <div className="grid gap-6 p-6 md:block md:h-full md:p-0">
        {STORY.map((title, i) => (
          <div key={title} className="grid gap-4 md:contents">
            <div className="story-panel aspect-4/3 overflow-hidden md:absolute md:inset-0 md:aspect-auto">
              <Placeholder i={i + 2} />
            </div>
            <h3 className="story-caption text-3xl font-semibold md:absolute md:bottom-16 md:left-12 md:z-10 md:text-7xl">
              {title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}

function ScrubMedia() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      responsive(({ reduceMotion, isMobile }) => {
        if (reduceMotion) return;
        scrubMedia(root.current!.querySelector(".scrub-frame")!, ".scrub-media", {
          scale: isMobile ? [1.15, 1] : [1.35, 1],
          clipInset: isMobile ? 4 : 12,
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="px-6 py-32 md:px-12">
      <p className="mb-10 text-sm tracking-[0.3em] uppercase">
        2 & 4 · Scroll-scrubbed scale, clip and parallax
      </p>
      <div className="scrub-frame aspect-video overflow-hidden rounded-sm">
        <Placeholder i={4} className="scrub-media" />
      </div>
    </section>
  );
}

function FlipLayouts() {
  const root = useRef<HTMLElement>(null);
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const capture = useFlip(root, "[data-flip-id]", [layout], {
    stagger: 0.03,
  });

  const toggle = () => {
    capture();
    setLayout((l) => (l === "grid" ? "list" : "grid"));
  };

  return (
    <section id="flip" ref={root} className="mx-auto max-w-6xl px-6 py-32">
      <div className="mb-10 flex items-center justify-between gap-4">
        <p className="text-sm tracking-[0.3em] uppercase">7 · Flip layout states</p>
        <button
          type="button"
          onClick={toggle}
          aria-pressed={layout === "list"}
          className="rounded-full border px-5 py-2 text-sm"
        >
          Show as {layout === "grid" ? "list" : "grid"}
        </button>
      </div>
      <ul className={layout === "grid" ? "grid grid-cols-3 gap-4" : "grid gap-3"}>
        {SWATCHES.map((_, i) => (
          <li
            key={i}
            data-flip-id={`dish-${i}`}
            className={layout === "grid" ? "" : "flex items-center gap-4"}
          >
            <div className={layout === "grid" ? "aspect-square" : "size-16 shrink-0"}>
              <Placeholder i={i} className="rounded-sm" />
            </div>
            <span className="text-sm">Dish {i + 1}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function MotionLab() {
  return (
    <main className="flex-1">
      <Hero />
      <SplitHeadline />
      <PinnedStory />
      <ScrubMedia />
      <StaggerGrid />
      <FlipLayouts />
      <footer className="px-6 py-24 text-sm opacity-60 md:px-12">
        8 · Responsive: resize across 768px / 1024px or toggle reduced motion
        in DevTools; matchMedia rebuilds every section without duplicates.
      </footer>
    </main>
  );
}
