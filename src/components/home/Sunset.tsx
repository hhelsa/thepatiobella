"use client";

import Image from "next/image";
import { useRef } from "react";

import { photos, stops } from "@/content/home";
import { clipReveal, EASE, gsap, pinnedScene, responsive, useGSAP } from "@/lib/motion";

import { Aperture } from "./Aperture";

const arena = stops[1];

/**
 * The signature: the sun ring sets at Arena Mall. The ring holds still while
 * the saxophone (sunset) sinks out of it and the Arena canopy comes down into
 * it, and the page ground darkens from amber to canopy. Without motion the
 * ring simply shows the Arena canopy on a canopy ground.
 */
export function Sunset() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      responsive(({ reduceMotion, isMobile }) => {
        if (reduceMotion) return;
        const stage = root.current?.querySelector<HTMLElement>(".sunset-stage");
        if (!stage) return;

        const tl = isMobile
          ? gsap.timeline({
              defaults: { ease: EASE.inOut },
              scrollTrigger: { trigger: stage, start: "top 70%", end: "bottom 45%", scrub: 1 },
            })
          : pinnedScene(stage, { start: "top top+=72", end: "+=120%" });

        // The backdrop lives outside this component, so pass the element:
        // selector strings here are scoped to the section.
        const canopyLayer = document.querySelector('[data-ground-layer="canopy"]');

        // No ink reads on the midway blend of amber and canopy, so the steep
        // in-out ease spends little scroll there, and the text steps aside:
        // it fades out, changes ink at the midpoint, and returns.
        tl.fromTo(
          canopyLayer,
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: "power3.inOut" },
          0.1,
        )
          .fromTo(".sun-text", { opacity: 1 }, { opacity: 0, duration: 0.08, ease: "none" }, 0.47)
          .fromTo(root.current, { color: "#10230c" }, { color: "#f6ebd6", duration: 0.01 }, 0.56)
          .fromTo(
            ".sun-text",
            { opacity: 0 },
            { opacity: 1, duration: 0.1, ease: "none", immediateRender: false },
            0.6,
          )
          .fromTo(".sun-sax", { yPercent: 0 }, { yPercent: 100, duration: 1 }, 0)
          .fromTo(".sun-canopy", { yPercent: -100, scale: 1.18 }, { yPercent: 0, scale: 1, duration: 1 }, 0)
          .fromTo(".sun-caption", { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.08 }, 0.47)
          .fromTo(".sun-arrive", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 0.7);

        gsap.utils.toArray<HTMLElement>(".arena-frame").forEach((frame, i) => {
          clipReveal(frame, {
            from: "bottom",
            media: frame.querySelector(".aperture-media") ?? undefined,
            delay: i * 0.1,
            scrollTrigger: { trigger: ".arena-rooms", start: "top 78%" },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="arena"
      data-ground="canopy"
      data-ground-fade="self"
      data-daypart="Sunset"
      aria-labelledby="arena-title"
    >
      <div className="sunset-stage grid min-h-[calc(100svh-var(--header-h))] grid-cols-1 content-center items-center gap-y-12 px-[4vw] py-[8vh] md:grid-cols-12 md:gap-x-[3vw]">
        <div className="relative order-2 md:order-1 md:col-span-5">
          <h2
            id="arena-title"
            className="sun-text font-display text-[clamp(2.75rem,6vw,5.75rem)] leading-[0.95] tracking-[-0.025em]"
          >
            Sunset at Arena Mall.
          </h2>
          <p className="sun-text mt-6 max-w-[34ch] text-lg leading-relaxed">
            In Nsambya, the lanterns come on under a ceiling of hanging leaves, with the city out
            beyond the glass.
          </p>
          <p className="sun-arrive mt-8 max-w-[34ch] font-display text-2xl leading-snug">
            Saxophone at sunset, cocktails after dark.
          </p>
        </div>

        <div className="order-1 md:order-2 md:col-span-6 md:col-start-7">
          <div className="relative mx-auto aspect-square w-[min(84vw,62svh)] rounded-full outline-[9px] outline-offset-[12px] outline-lantern outline-solid md:w-[min(42vw,66svh)]">
            <div className="absolute inset-0 isolate overflow-hidden rounded-full">
              <div className="sun-sax absolute inset-0">
                <Image
                  src={photos.saxophone.src}
                  alt={photos.saxophone.alt}
                  fill
                  sizes="(min-width: 768px) 42vw, 84vw"
                  className="object-cover"
                  style={{ objectPosition: photos.saxophone.position }}
                />
              </div>
              <div className="sun-canopy absolute inset-0">
                <Image
                  src={photos.arenaCanopy.src}
                  alt={photos.arenaCanopy.alt}
                  fill
                  sizes="(min-width: 768px) 42vw, 84vw"
                  className="scale-[1.25] object-cover"
                  style={{ objectPosition: photos.arenaCanopy.position, transformOrigin: "70% 0%" }}
                />
              </div>
            </div>
          </div>
          <p className="sun-caption mt-9 text-center font-display text-xl">
            &ldquo;Catching sunsets at Bella&rdquo;
          </p>
        </div>
      </div>

      <div className="arena-rooms px-[4vw] pt-[clamp(4rem,10vh,8rem)] pb-[clamp(6rem,14vh,10rem)]">
        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-12 md:gap-x-[3vw]">
          <div className="arena-frame md:col-span-7">
            <Aperture
              photo={photos.arenaTable}
              shape="plate"
              aspect="aspect-[3/2]"
              sizes="(min-width: 768px) 56vw, 92vw"
            />
          </div>
          <div className="flex flex-col gap-8 md:col-span-5">
            <div className="arena-frame w-[86%] max-w-[360px]">
              <Aperture
                photo={photos.arenaDining}
                shape="plate"
                aspect="aspect-[3/2]"
                sizes="(min-width: 768px) 360px, 86vw"
              />
            </div>
            <div className="arena-frame ml-auto w-[70%] max-w-[300px]">
              <Aperture
                photo={photos.arenaBar}
                shape="plate"
                aspect="aspect-[3/2]"
                sizes="(min-width: 768px) 300px, 70vw"
              />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-7 gap-y-4">
          <a
            href={`tel:${arena.tel}`}
            aria-label={`Call Patio Bella Arena Mall, Nsambya to reserve, ${arena.phone}`}
            className="inline-flex items-center gap-3 rounded-full bg-gold px-6 py-3.5 font-semibold text-canopy transition-colors hover:bg-light"
          >
            Call Arena Mall <span className="tabular-nums">{arena.phone}</span>
          </a>
          <a className="link-draw font-semibold" href={arena.directions} target="_blank" rel="noreferrer">
            Get directions
          </a>
          <span className="text-light/75">{arena.note}</span>
        </div>
      </div>
    </section>
  );
}
