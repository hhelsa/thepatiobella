"use client";

import { useRef } from "react";

import { breakfast, photos, stops } from "@/content/home";
import { clipReveal, gsap, responsive, splitReveal, useGSAP } from "@/lib/motion";

import { Aperture } from "./Aperture";

const lugogo = stops[0];

export function Morning() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      responsive(({ reduceMotion, isMobile }) => {
        if (reduceMotion) return;

        splitReveal(".morning-title", {
          scrollTrigger: { trigger: ".morning-title", start: "top 82%" },
        });

        // The Lugogo rooms open one after another like doors along a hall.
        gsap.utils.toArray<HTMLElement>(".lugogo-frame").forEach((frame, i) => {
          clipReveal(frame, {
            from: "bottom",
            media: frame.querySelector(".aperture-media") ?? undefined,
            delay: i * 0.12,
            scrollTrigger: { trigger: ".lugogo-rooms", start: "top 75%" },
          });
        });

        if (!isMobile) {
          gsap.to(".lugogo-stair", {
            yPercent: -16,
            ease: "none",
            scrollTrigger: { trigger: ".lugogo-rooms", start: "top bottom", end: "bottom top", scrub: true },
          });
        }

        clipReveal(".breakfast-ring", {
          from: "circle",
          media: ".breakfast-ring .aperture-media",
          scrollTrigger: { trigger: ".breakfast", start: "top 72%" },
        });
        gsap.from(".breakfast-item", {
          autoAlpha: 0,
          x: -18,
          stagger: 0.06,
          duration: 0.7,
          scrollTrigger: { trigger: ".breakfast-list", start: "top 85%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="lugogo"
      data-ground="butter"
      data-daypart="Morning"
      aria-labelledby="lugogo-title"
      className="px-[4vw] pt-[clamp(6rem,14vh,10rem)] pb-[clamp(5rem,12vh,9rem)]"
    >
      <div className="grid grid-cols-1 gap-y-14 md:grid-cols-12 md:gap-x-[3vw]">
        <div className="md:col-span-5 md:pt-[8vh]">
          <h2
            id="lugogo-title"
            className="morning-title font-display text-[clamp(2.5rem,5vw,4.75rem)] leading-[0.98] tracking-[-0.02em]"
          >
            New at Lugogo Mall.
          </h2>
          <p className="mt-6 max-w-[36ch] text-lg leading-relaxed">
            Our newest room is all daylight: butter-yellow walls, painted leaves, and glass walls
            looking out onto the palms, near Kyadondo Rugby Grounds.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a
              href={`tel:${lugogo.tel}`}
              aria-label={`Call Patio Bella Lugogo Mall to reserve, ${lugogo.phone}`}
              className="inline-flex items-center gap-3 rounded-full bg-canopy px-6 py-3.5 font-semibold text-butter transition-colors hover:bg-canopy/85"
            >
              Call Lugogo <span className="tabular-nums">{lugogo.phone}</span>
            </a>
            <a className="link-draw font-semibold" href={lugogo.directions} target="_blank" rel="noreferrer">
              Get directions
            </a>
          </div>
        </div>

        <div className="lugogo-rooms relative md:col-span-7 md:h-[min(86svh,58rem)]">
          <div className="lugogo-frame w-[62%] md:absolute md:top-0 md:left-0 md:w-[50%]">
            <Aperture photo={photos.lugogoEntrance} shape="arch" sizes="(min-width: 768px) 30vw, 62vw" />
          </div>
          <div className="lugogo-frame mt-[-38%] ml-auto w-[52%] md:absolute md:top-[14%] md:right-0 md:mt-0 md:w-[44%]">
            <Aperture
              photo={photos.lugogoCounter}
              shape="plate"
              aspect="aspect-[4/5]"
              sizes="(min-width: 768px) 26vw, 52vw"
            />
          </div>
          <div className="lugogo-stair mt-[-12%] ml-[22%] w-[34%] md:absolute md:bottom-0 md:left-[40%] md:mt-0 md:ml-0 md:w-[26%]">
            <div className="lugogo-frame rounded-t-[999px] rounded-b-plate border-[6px] border-butter">
              <Aperture photo={photos.lugogoStaircase} shape="arch" sizes="(min-width: 768px) 16vw, 34vw" />
            </div>
          </div>
        </div>
      </div>

      <div className="breakfast mt-[clamp(6rem,16vh,12rem)] grid grid-cols-1 items-center gap-y-12 md:grid-cols-12 md:gap-x-[3vw]">
        <div className="relative md:col-span-6">
          <div className="breakfast-ring w-[78%] md:w-[72%]">
            <Aperture photo={photos.guestBreakfast} shape="ring" sizes="(min-width: 768px) 32vw, 78vw" />
          </div>
          <div className="absolute right-0 bottom-[-8%] w-[40%] md:right-[4%] md:w-[36%]">
            <Aperture
              photo={photos.takeawayCoffee}
              shape="plate"
              aspect="aspect-[3/4]"
              sizes="(min-width: 768px) 16vw, 40vw"
            />
          </div>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <h3 className="font-display text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.02] tracking-[-0.015em]">
            Mornings start with coffee, and rarely stop there.
          </h3>
          <p className="mt-5 max-w-[38ch] text-lg leading-relaxed">
            From the breakfast menu, as served across our #12DaysOfBreakfast:
          </p>
          <ul className="breakfast-list mt-7 border-t border-canopy/25">
            {breakfast.map((item) => (
              <li
                key={item}
                className="breakfast-item border-b border-canopy/25 py-3.5 font-display text-[clamp(1.375rem,2vw,1.75rem)] leading-tight"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
