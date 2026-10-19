"use client";

import Link from "next/link";
import { useRef } from "react";

import { clips } from "@/content/home";
import { gsap, responsive, splitReveal, useGSAP } from "@/lib/motion";

import { ClipVideo } from "./PosterVideo";

const REEL = [
  { clip: clips.combos, title: "Patio Combos", offset: "md:mt-[14vh]", speed: 18 },
  { clip: clips.pizza, title: "Straight from the oven", offset: "md:mt-0", speed: 6 },
  { clip: clips.waffles, title: "Golden mornings", offset: "md:mt-[22vh]", speed: 26 },
];

/**
 * The kitchen in motion: three clips from the restaurant's own posts, each
 * travelling at its own speed as the visitor scrolls. On phones they become
 * a swipeable strip.
 */
export function Reel() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      responsive(({ reduceMotion, isMobile }) => {
        if (reduceMotion) return;
        splitReveal(".reel-title", { scrollTrigger: { trigger: ".reel-title", start: "top 85%" } });
        gsap.utils.toArray<HTMLElement>(".reel-item").forEach((item, i) => {
          gsap.fromTo(
            item.querySelector(".frame"),
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.3,
              delay: i * 0.12,
              ease: "expo.inOut",
              scrollTrigger: { trigger: ".reel-track", start: "top 80%" },
            },
          );
          if (!isMobile) {
            gsap.to(item, {
              yPercent: -REEL[i].speed,
              ease: "none",
              scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
            });
          }
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="reel-title"
      className="on-canopy relative overflow-hidden bg-canopy pt-[clamp(7rem,18vh,12rem)] pb-[clamp(5rem,10vh,8rem)] text-light"
    >
      <div className="grid gap-6 px-[4vw] md:grid-cols-12 md:items-end">
        <h2 id="reel-title" className="reel-title display text-[clamp(2.75rem,6vw,5.75rem)] leading-[0.95] md:col-span-7">
          <span className="block">Fresh off</span>
          <span className="block">the pass.</span>
        </h2>
        <div className="md:col-span-4 md:col-start-9 md:pb-3">
          <p className="max-w-[34ch] text-lg leading-relaxed text-light/85">
            Grilled, glazed, drizzled and dusted, a few moments from our kitchens.
          </p>
          <Link href="/menu#food" className="roll mt-6 text-[15px] font-semibold text-gold">
            <span data-label="See the food menu">See the food menu</span>
          </Link>
        </div>
      </div>

      <ul className="reel-track mt-[clamp(3rem,8vh,5rem)] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[4vw] [scrollbar-width:none] md:grid md:grid-cols-3 md:gap-[3vw] md:overflow-visible">
        {REEL.map(({ clip, title, offset }) => (
          <li key={clip.src} className={`reel-item w-[68vw] flex-none snap-start md:w-auto ${offset}`}>
            <ClipVideo clip={clip} className="rounded-(--radius-frame)" />
            <p className="display mt-4 text-[clamp(1.375rem,1.9vw,1.75rem)]">{title}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
