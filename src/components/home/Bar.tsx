"use client";

import Link from "next/link";
import { useRef } from "react";

import { barShots, photos } from "@/content/home";
import { EASE, gsap, responsive, scrubMedia, splitReveal, useGSAP } from "@/lib/motion";

import { Frame } from "./primitives";

const POURS = ["Nojitos", "Fresh juices", "Smoothies", "Milkshakes", "Cocktail of the day"];

/**
 * Behind the bar. The mixologist's pour leads at full height and settles as
 * it scrolls; the glasses arrive one by one beside it, each from its own
 * edge, with the drinks named from the menu.
 */
export function Bar() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      responsive(({ reduceMotion, isMobile }) => {
        if (reduceMotion) return;
        const lead = root.current!.querySelector<HTMLElement>(".bar-lead")!;
        scrubMedia(lead, lead.querySelector(".frame-media")!, { scale: isMobile ? [1.1, 1] : [1.25, 1], drift: 4 });
        splitReveal(".bar-title", { scrollTrigger: { trigger: ".bar-title", start: "top 85%" } });

        const edges = ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 100%)", "inset(100% 0% 0% 0%)", "inset(0% 0% 100% 0%)"];
        gsap.utils.toArray<HTMLElement>(".bar-glass").forEach((glass, i) => {
          gsap.fromTo(
            glass,
            { clipPath: edges[i % edges.length] },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.2,
              ease: EASE.cinematic,
              scrollTrigger: { trigger: glass, start: "top 88%" },
            },
          );
          gsap.fromTo(
            glass.querySelector(".frame-media"),
            { scale: 1.25 },
            { scale: 1, duration: 1.6, ease: EASE.outStrong, scrollTrigger: { trigger: glass, start: "top 88%" } },
          );
        });
        gsap.from(".bar-pour", {
          autoAlpha: 0,
          x: -24,
          stagger: 0.08,
          duration: 0.8,
          scrollTrigger: { trigger: ".bar-pours", start: "top 88%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="bar-title" className="relative bg-butter px-[4vw] py-[clamp(7rem,18vh,12rem)] text-canopy">
      <div className="grid gap-y-12 md:grid-cols-12 md:gap-x-[3vw]">
        <div className="md:col-span-6">
          <div className="md:sticky md:top-[calc(var(--header-h)+4svh)]">
            <div className="bar-lead overflow-hidden rounded-(--radius-frame)">
              <Frame photo={photos.mixologist} sizes="(min-width: 768px) 48vw, 92vw" className="aspect-square md:aspect-[4/5] md:max-h-[84svh]" />
            </div>
          </div>
        </div>

        <div className="md:col-span-5 md:col-start-8">
          <h2 id="bar-title" className="bar-title display text-[clamp(2.75rem,6vw,5.75rem)] leading-[0.95]">
            <span className="block">Behind</span>
            <span className="block">the bar.</span>
          </h2>
          <p className="mt-6 max-w-[36ch] text-lg leading-relaxed">
            Poured, layered and garnished to order, from the first coffee to the last cocktail.
          </p>
          <ul className="bar-pours mt-8 border-t border-canopy/25">
            {POURS.map((pour) => (
              <li key={pour} className="bar-pour display border-b border-canopy/25 py-3 text-[clamp(1.5rem,2.2vw,2rem)] leading-tight">
                {pour}
              </li>
            ))}
          </ul>
          <Link
            href="/menu#drinks"
            className="fill-btn mt-10 inline-flex min-h-12 items-center bg-canopy px-6 text-[15px] font-semibold text-butter transition-colors duration-500 [--fill:var(--color-light)] hover:text-canopy"
          >
            Drinks menu
          </Link>

          <div className="mt-14 grid grid-cols-2 gap-4 md:gap-[2vw]">
            {barShots.map((shot, i) => (
              <Frame
                key={shot.src}
                photo={shot}
                sizes="(min-width: 768px) 20vw, 44vw"
                className={`bar-glass aspect-[4/5] rounded-(--radius-frame) ${i % 2 ? "mt-[18%]" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
