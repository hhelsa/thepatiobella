"use client";

import { Fragment, useRef } from "react";

import { namedDishes, plates, type Plate } from "@/content/home";
import { clipReveal, gsap, responsive, splitReveal, useGSAP } from "@/lib/motion";

import { Frame } from "./primitives";

// Height-led on wider screens so the gallery always fits one viewport;
// width-led on phones for a comfortable swipe.
const SIZES: Record<Plate["size"], string> = {
  tall: "w-[72vw] aspect-[3/4] md:w-full group-data-[pinned]/food:md:w-[calc(min(54svh,44vw)*0.75)]",
  mid: "w-[64vw] aspect-[4/5] md:mt-[10svh] md:w-full group-data-[pinned]/food:md:w-[calc(min(42svh,34vw)*0.8)]",
  short: "w-[58vw] aspect-square md:mt-[18svh] md:w-full group-data-[pinned]/food:md:w-[min(32svh,26vw)]",
};

/**
 * Food and drink, morning to night. On tablet and desktop the section pins
 * and the plates travel sideways past the visitor, each photograph drifting
 * inside its frame. On phones, and without motion, it is a swipeable strip.
 * Below it, names from the menu run with the scroll.
 */
export function FoodDrink() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      responsive(({ reduceMotion, isMobile }) => {
        if (reduceMotion) return;
        const section = root.current!;

        splitReveal(".food-title", { scrollTrigger: { trigger: ".food-title", start: "top 85%" } });
        gsap.from(".food-intro", {
          autoAlpha: 0,
          y: 16,
          duration: 0.9,
          scrollTrigger: { trigger: ".food-title", start: "top 85%" },
        });

        const first = gsap.utils.toArray<HTMLElement>(".plate").slice(0, isMobile ? 2 : 3);
        first.forEach((plate, i) =>
          clipReveal(plate.querySelector(".frame")!, {
            from: "bottom",
            media: plate.querySelector(".frame-media") ?? undefined,
            delay: i * 0.12,
            duration: 1.3,
            scrollTrigger: { trigger: ".food-track", start: "top 82%" },
          }),
        );

        // The names from the menu run sideways with the scroll.
        const line = section.querySelector<HTMLElement>(".dish-line")!;
        section.setAttribute("data-moving", "");
        gsap.fromTo(
          line,
          { x: () => window.innerWidth * 0.15 },
          {
            x: () => -(line.scrollWidth - window.innerWidth * 0.85),
            ease: "none",
            scrollTrigger: {
              trigger: ".dish-wrap",
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          },
        );

        if (isMobile) return () => section.removeAttribute("data-moving");

        // Tablet and desktop: pin and travel.
        section.setAttribute("data-pinned", "");
        const stage = section.querySelector<HTMLElement>(".food-stage")!;
        const track = section.querySelector<HTMLElement>(".food-track")!;
        const distance = () => track.scrollWidth - window.innerWidth;

        const travel = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        gsap.fromTo(".food-progress", { scaleX: 0 }, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: stage, start: "top top", end: () => `+=${distance()}`, scrub: true },
        });

        gsap.utils.toArray<HTMLElement>(".plate .frame-media").forEach((media) => {
          gsap.fromTo(
            media,
            { xPercent: -7, scale: 1.16 },
            {
              xPercent: 7,
              ease: "none",
              scrollTrigger: {
                trigger: media.closest(".plate"),
                containerAnimation: travel,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });

        return () => {
          section.removeAttribute("data-pinned");
          section.removeAttribute("data-moving");
        };
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="food" aria-labelledby="food-title" className="group/food relative overflow-x-clip bg-butter text-canopy">
      <div className="food-stage flex flex-col pt-[clamp(5rem,12vh,8rem)] pb-12 group-data-[pinned]/food:md:h-svh md:pt-[calc(var(--header-h)+5svh)] md:pb-[5svh]">
        <div className="flex flex-col gap-6 px-[4vw] md:flex-row md:items-end md:justify-between">
          <h2
            id="food-title"
            className="food-title display text-[clamp(2.75rem,6vw,5.75rem)] leading-[0.96]"
          >
            <span className="block">From the kitchen</span>
            <span className="block">and the bar.</span>
          </h2>
          <p className="food-intro max-w-[30ch] text-lg leading-relaxed md:pb-3 md:text-right md:text-xl">
            Morning to night: a few of the plates and glasses that reach our tables.
          </p>
        </div>

        <div className="food-viewport mt-[clamp(2.5rem,6svh,4rem)] md:flex-1">
          <ul className="food-track flex w-max items-start gap-5 px-[4vw] md:grid md:w-auto md:grid-cols-4 md:gap-x-[2.6vw] md:gap-y-14 group-data-[pinned]/food:md:flex group-data-[pinned]/food:md:w-max">
            {plates.map((plate) => (
              <li key={plate.photo.src} className="plate flex-none snap-start">
                <figure>
                  <Frame
                    photo={plate.photo}
                    sizes="(min-width: 768px) 30vw, 72vw"
                    className={`rounded-(--radius-frame) ${SIZES[plate.size]}`}
                  />
                  <figcaption className="mt-4 w-0 min-w-full">
                    <span className="display block text-[clamp(1.375rem,1.9vw,1.75rem)] leading-tight">
                      {plate.title}
                    </span>
                    <span className="mt-1 block text-base text-canopy/75">{plate.note}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>

        <div aria-hidden className="mx-[4vw] mt-6 hidden h-px bg-canopy/20 md:block">
          <div className="food-progress h-full origin-left bg-canopy" />
        </div>
      </div>

      <div className="dish-wrap overflow-hidden border-t border-canopy/15 py-[clamp(4rem,12vh,8rem)]">
        <p className="dish-line display px-[4vw] text-center text-[clamp(1.75rem,8.4vw,7.5rem)] leading-[1.08] [[data-moving]_&]:text-left">
          {namedDishes.map((dish, i) => (
            <Fragment key={dish}>
              {i > 0 && (
                <>
                  {" "}
                  <span aria-hidden className="hidden text-lantern group-data-[moving]/food:inline sm:inline">
                    ·
                  </span>
                  <span className="sr-only">,</span>{" "}
                </>
              )}
              <span className="block whitespace-nowrap group-data-[moving]/food:inline sm:inline">{dish}</span>
            </Fragment>
          ))}
        </p>
        <p className="mt-8 px-[4vw] text-center text-[15px] text-canopy/75">
          A few names from the menu and the bar.
        </p>
      </div>
    </section>
  );
}
