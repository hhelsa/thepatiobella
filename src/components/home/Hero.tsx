"use client";

import { useRef } from "react";

import { dayparts, photos, stops } from "@/content/home";
import {
  clipReveal,
  DURATION,
  EASE,
  gsap,
  releaseIntro,
  responsive,
  splitReveal,
  useGSAP,
} from "@/lib/motion";

import { Aperture } from "./Aperture";
import { StopLink } from "./StopLink";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      responsive(
        ({ reduceMotion }) => {
          if (!reduceMotion) {
            const tl = gsap.timeline({ delay: 0.1, defaults: { ease: EASE.outStrong } });

            // The logo's ring, drawn as the morning sun.
            // Dashing exists only for the draw; cleared after so the
            // finished ring has no seam.
            tl.fromTo(
              ".hero-ring-stroke",
              { strokeDasharray: 1, strokeDashoffset: 1 },
              {
                strokeDashoffset: 0,
                duration: 1.5,
                ease: EASE.inOut,
                clearProps: "strokeDasharray,strokeDashoffset",
              },
              0,
            );
            tl.add(
              clipReveal(".hero-ring", {
                from: "circle",
                media: ".hero-ring .aperture-media",
                duration: DURATION.cinematic,
              }),
              0.15,
            );
            splitReveal(".hero-title", { by: "lines", timeline: tl, position: 0.25 });
            tl.from(".hero-sub", { autoAlpha: 0, y: 14, duration: DURATION.base }, 0.75);
            tl.from(".hero-arch", { autoAlpha: 0, yPercent: 14, duration: DURATION.slow }, 0.8);
            tl.from(
              ".hero-dayline-rule",
              { scaleX: 0, transformOrigin: "0% 50%", duration: DURATION.slow, ease: EASE.inOut },
              0.9,
            );
            tl.from(".hero-dayline-label", { autoAlpha: 0, y: 8, stagger: 0.07, duration: 0.6 }, 1.05);
            tl.from(".hero-dayline-marker", { scale: 0, duration: 0.5, ease: "back.out(2)" }, 1.4);
            tl.from(".hero-callbar-inner", { yPercent: 100, duration: DURATION.slow }, 1.0);

            // Leaving the morning: the ring's view drifts up, the arch lags.
            const leave = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
            gsap.to(".hero-ring-drift", { yPercent: -7, ease: "none", scrollTrigger: leave });
            gsap.to(".hero-arch-drift", { yPercent: -22, ease: "none", scrollTrigger: leave });
          }
          // From-states are applied (or skipped): safe to un-gate.
          releaseIntro();
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
      data-ground="butter"
      data-daypart="Morning"
      aria-labelledby="hero-title"
      className="relative flex min-h-[calc(100svh-var(--header-h))] flex-col overflow-hidden"
    >
      <div className="grid flex-1 grid-cols-1 items-center gap-y-10 px-[4vw] pt-8 pb-12 lg:grid-cols-12 lg:gap-x-[3vw] lg:pt-[6vh]">
        <div className="lg:col-span-7">
          <h1
            id="hero-title"
            data-intro
            className="hero-title font-display text-[clamp(2.75rem,6vw,6rem)] leading-[0.95] tracking-[-0.02em]"
          >
            Breakfast to the last cocktail, in two Kampala rooms.
          </h1>
          <p data-intro className="hero-sub mt-7 max-w-[34ch] text-lg leading-relaxed md:text-xl">
            Where we all come together, at the new Lugogo Mall and at Arena Mall, Nsambya.
          </p>
          <DayLine />
        </div>

        <div className="relative lg:col-span-5">
          <div className="hero-ring-drift relative mr-[-14vw] ml-auto w-[88%] md:mr-[4vw] md:w-[62%] lg:mr-0 lg:w-full lg:max-w-[min(36vw,60svh)]">
            <svg
              aria-hidden
              viewBox="0 0 100 100"
              className="pointer-events-none absolute -inset-[5.5%] size-[111%] -rotate-90 overflow-visible"
            >
              <circle
                data-intro
                className="hero-ring-stroke"
                cx="50"
                cy="50"
                r="49.5"
                fill="none"
                stroke="var(--color-lantern)"
                strokeWidth="1.4"
                pathLength={1}
              />
            </svg>
            <div data-intro className="hero-ring">
              <Aperture
                photo={photos.lugogoDaylight}
                shape="ring"
                sizes="(min-width: 1024px) 36vw, (min-width: 768px) 62vw, 90vw"
                preload
              />
            </div>
          </div>
          <div className="hero-arch-drift absolute bottom-[-6%] left-0 w-[34%] md:left-[8%] md:w-[24%] lg:right-[-2%] lg:left-auto lg:w-[34%]">
            <div data-intro className="hero-arch rounded-t-[999px] rounded-b-plate border-[6px] border-butter">
              <Aperture photo={photos.cappuccino} shape="arch" sizes="(min-width: 768px) 15vw, 34vw" />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop and tablet: the two stops anchor the first viewport. On
          phones the sticky CallBar carries them instead. */}
      <div className="hidden h-[84px] overflow-hidden md:block">
        <ul data-intro className="hero-callbar-inner grid h-full grid-cols-2 bg-canopy">
          {stops.map((stop, i) => (
            <li key={stop.id} className={i === 0 ? "border-r border-light/15" : ""}>
              <StopLink stop={stop} variant="bar" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function DayLine() {
  return (
    <div aria-hidden className="mt-12 hidden max-w-[44rem] md:block">
      <div className="relative">
        <div data-intro className="hero-dayline-rule h-0.5 bg-canopy" />
        <span
          data-intro
          className="hero-dayline-marker absolute top-1/2 left-0 size-4 -translate-y-1/2 rounded-full bg-lantern"
        />
      </div>
      <ol className="mt-3 grid grid-cols-4 text-sm font-semibold tracking-[0.12em] uppercase">
        {dayparts.map((part) => (
          <li key={part} data-intro className="hero-dayline-label">
            {part}
          </li>
        ))}
      </ol>
    </div>
  );
}
