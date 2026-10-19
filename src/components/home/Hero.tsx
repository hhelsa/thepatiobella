"use client";

import { useRef } from "react";

import { introStack, photos, stops } from "@/content/home";
import {
  claimIntro,
  DURATION,
  EASE,
  gsap,
  insetTo,
  introPending,
  releaseIntro,
  responsive,
  setInset,
  splitReveal,
  useGSAP,
} from "@/lib/motion";

import { Frame, RollLink } from "./primitives";

/**
 * The opening. On canopy, four photographs from both rooms stack in a small
 * frame; the Arena canopy arrives last and opens to fill the screen; then the
 * header, the headline and the actions arrive. Any key, tap or scroll speeds
 * it up. Without JavaScript, or with reduced motion, the hero is simply there.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      responsive(
        ({ reduceMotion }) => {
          if (reduceMotion) return;
          const section = root.current!;

          if (introPending()) {
            claimIntro();
            const stack = section.querySelector<HTMLElement>(".intro-stack")!;
            const box = section.querySelector<HTMLElement>(".stack-box")!;
            const header = document.querySelector<HTMLElement>("[data-site-header] .header-inner");
            gsap.set(stack, { display: "block" });

            const s = section.getBoundingClientRect();
            const b = box.getBoundingClientRect();
            const t = b.top - s.top;
            const r = s.right - b.right;
            const btm = s.bottom - b.bottom;
            const l = b.left - s.left;
            const frame = section.querySelector<HTMLElement>(".hero-frame")!;
            setInset(frame, [s.height - btm, r, btm, l], "px");

            const tl = gsap.timeline({ defaults: { ease: EASE.out } });

            // 1. Morning to night, stacked: each photo slides up over the last.
            gsap.utils.toArray<HTMLElement>(".stack-item").forEach((item, i) => {
              tl.fromTo(
                item,
                { clipPath: "inset(100% 0% 0% 0%)" },
                { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: EASE.inOut },
                0.15 + i * 0.3,
              ).fromTo(
                item.querySelector(".frame-media"),
                { scale: 1.3 },
                { scale: 1, duration: 0.9 },
                0.15 + i * 0.3,
              );
            });

            // 2. The Arena canopy arrives in the same frame, then opens out.
            const at = 0.15 + introStack.length * 0.3;
            tl.add(insetTo(frame, [t, r, btm, l], { duration: 0.6, ease: EASE.inOut }, "px"), at)
              .fromTo(".hero-media", { scale: 1.45 }, { scale: 1, duration: 2.1, ease: EASE.cinematic }, at)
              .add(insetTo(frame, [0, 0, 0, 0], { duration: 1.3, ease: EASE.cinematic }, "px"), at + 0.75)
              .set(stack, { display: "none" }, at + 2.1);

            // 3. Then the page: header, headline, actions, the two rooms.
            const text = at + 1.55;
            if (header) tl.from(header, { yPercent: -110, duration: DURATION.slow, ease: EASE.outStrong }, text);
            splitReveal(".hero-title", { by: "lines", timeline: tl, position: text + 0.05, duration: 1.3 });
            tl.from(".hero-sub", { autoAlpha: 0, y: 18, duration: DURATION.slow }, text + 0.45)
              .from(".hero-action", { autoAlpha: 0, y: 18, duration: DURATION.slow, stagger: 0.1 }, text + 0.55)
              .from(".hero-room", { autoAlpha: 0, y: 12, duration: DURATION.base, stagger: 0.12 }, text + 0.75);

            // From-states are applied; content no longer needs the CSS gate.
            releaseIntro();

            const hurry = () => tl.progress() < 1 && tl.timeScale(4);
            const events = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
            events.forEach((e) => window.addEventListener(e, hurry, { passive: true }));
            tl.eventCallback("onComplete", () => events.forEach((e) => window.removeEventListener(e, hurry)));
          }

          // Leaving: the room sinks slowly, the words lift away faster.
          const leave = { trigger: section, start: "top top", end: "bottom top", scrub: true };
          gsap.to(".hero-media-drift", { yPercent: 16, ease: "none", scrollTrigger: leave });
          gsap.to(".hero-content", { yPercent: -28, autoAlpha: 0, ease: "none", scrollTrigger: { ...leave, end: "70% top" } });
        },
        ["reduceMotion"],
      );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      aria-labelledby="hero-title"
      className="on-canopy relative h-svh min-h-[600px] overflow-hidden bg-canopy text-light"
    >
      {/* Opening stack (JS only; see globals.css). */}
      <div aria-hidden className="intro-stack absolute inset-0">
        <div className="flex h-full items-center justify-center">
          <div className="stack-box relative aspect-[4/5] w-[min(54vw,40svh)] md:w-[min(24vw,42svh)]">
            {introStack.map((photo) => (
              <Frame
                key={photo.src}
                photo={{ ...photo, alt: "" }}
                sizes="(min-width: 768px) 24vw, 54vw"
                eager
                className="stack-item absolute inset-0"
              />
            ))}
          </div>
        </div>
      </div>

      <div data-intro className="hero-frame absolute inset-0">
        <div className="hero-media-drift absolute inset-0">
          <Frame photo={photos.arenaHero} sizes="100vw" preload mediaClassName="hero-media" className="absolute inset-0" />
        </div>
        {/* Shade only where type sits: under the header, behind the headline
            block, and along the foot for the room labels. */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-canopy/70 to-transparent" />
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_75%_70%_at_12%_88%,rgb(16_35_12/0.82),transparent_70%)]" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-canopy/75 to-transparent" />
      </div>

      <div className="hero-content relative flex h-full flex-col items-start justify-end px-[4vw] pt-(--header-h) pb-[max(5.5rem,13svh)]">
        <h1
          id="hero-title"
          data-intro
          className="hero-title display text-[clamp(3rem,7.6vw,7rem)] leading-[0.94]"
        >
          <span className="block">Where we all</span>
          <span className="block">come together.</span>
        </h1>
        <p data-intro className="hero-sub mt-7 max-w-[36ch] text-[17px] leading-relaxed text-light/90 md:text-lg">
          Breakfast to the last cocktail at our two Kampala branches: Arena Mall, Nsambya, and the
          new Lugogo Mall.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            data-intro
            href="#visit"
            className="hero-action fill-btn inline-flex min-h-12 items-center bg-butter px-7 text-[15px] font-semibold text-canopy [--fill:var(--color-light)]"
          >
            Reserve a table
          </a>
          <span data-intro className="hero-action">
            <RollLink href="/menu" label="View the menu" className="text-[15px] font-medium" />
          </span>
        </div>
      </div>

      <ul className="pointer-events-none absolute inset-x-[4vw] bottom-[max(1.5rem,env(safe-area-inset-bottom))] flex justify-between text-[13px] font-medium tracking-[0.08em] uppercase">
        {stops.map((stop) => (
          <li key={stop.id} data-intro className="hero-room">
            {stop.name}
            {stop.isNew ? " · New" : `, ${stop.area}`}
          </li>
        ))}
      </ul>
    </section>
  );
}
