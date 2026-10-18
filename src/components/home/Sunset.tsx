"use client";

import Image from "next/image";
import { useRef } from "react";

import { photos, stops } from "@/content/home";
import type { Photo } from "@/content/home";
import { clipReveal, gsap, pinnedScene, responsive, useGSAP } from "@/lib/motion";

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

        // The backdrop lives outside this component, so pass elements:
        // selector strings here are scoped to the section.
        const lanternLayer = document.querySelector('[data-ground-layer="lantern"]');
        const canopyLayer = document.querySelector('[data-ground-layer="canopy"]');

        const tl = isMobile
          ? gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: { trigger: stage, start: "top 65%", end: "bottom 40%", scrub: 1 },
            })
          : pinnedScene(stage, { start: "top top+=72", end: "+=140%" });

        tl.set([".sun-ring", ".sun-caption"], { visibility: "visible" }, 0)
          // The sun sinks below the horizon, and the sky goes lantern.
          .fromTo(".sun-ring", { yPercent: 0 }, { yPercent: 112, duration: 0.5, ease: "power2.in" }, 0.05)
          .fromTo(lanternLayer, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: "none" }, 0.05)
          .fromTo(".sun-caption", { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.15 }, 0.3)
          // Body copy steps aside around the lantern peak, where no ink
          // reaches 4.5:1; the headline stays (large text stays above 3:1).
          .fromTo(".sun-body", { opacity: 1 }, { opacity: 0, duration: 0.08, ease: "none" }, 0.38)
          .fromTo(root.current, { color: "#10230c" }, { color: "#f6ebd6", duration: 0.04, ease: "none" }, 0.48)
          .fromTo(
            ".sun-body",
            { opacity: 0 },
            { opacity: 1, duration: 0.1, ease: "none", immediateRender: false },
            0.64,
          )
          // The lanterns come on: Arena Mall rises from the horizon.
          .fromTo(
            ".arena-ring",
            { clipPath: "circle(0% at 50% 100%)" },
            { clipPath: "circle(75% at 50% 50%)", duration: 0.45, ease: "power2.out" },
            0.55,
          )
          .fromTo(".arena-ring .ring-media", { scale: 1.18 }, { scale: 1, duration: 0.5, ease: "power2.out" }, 0.55)
          .fromTo(canopyLayer, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "none" }, 0.52)
          .fromTo(".sun-arrive", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.15 }, 0.68)
          // Hold the finished night for the last part of the pin.
          .to({}, { duration: 0.2 });

        clipReveal(".arena-table", {
          from: "bottom",
          media: ".arena-table .aperture-media",
          scrollTrigger: { trigger: ".arena-rooms", start: "top 78%" },
        });
        clipReveal(".arena-dining", {
          from: "circle",
          media: ".arena-dining .aperture-media",
          delay: 0.25,
          scrollTrigger: { trigger: ".arena-rooms", start: "top 78%" },
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
            className="font-display text-[clamp(2.75rem,6vw,5.75rem)] leading-[0.95] tracking-[-0.025em]"
          >
            Sunset at Arena Mall.
          </h2>
          <p className="sun-body mt-6 max-w-[34ch] text-lg leading-relaxed">
            In Nsambya, the lanterns come on under a ceiling of hanging leaves, with the city out
            beyond the glass.
          </p>
          <p className="sun-arrive mt-8 max-w-[34ch] font-display text-2xl leading-snug">
            Saxophone at sunset, cocktails after dark.
          </p>
        </div>

        <div className="order-1 md:order-2 md:col-span-6 md:col-start-7">
          <div className="mx-auto w-[min(80vw,56svh)] md:w-[min(38vw,62svh)]">
            {/* The clip box's bottom edge is the horizon the sun sinks behind. */}
            <div className="relative overflow-hidden px-[3%] pt-[3%]">
              <div className="relative aspect-square">
                <Ring className="arena-ring" photo={photos.arenaCanopy} />
                {/* Without JavaScript only the Arena canopy shows. */}
                <Ring className="sun-ring invisible" photo={photos.saxophone} zoom="scale-[1.4] origin-[30%_75%]" />
              </div>
            </div>
            <div aria-hidden className="h-0.5 bg-current opacity-40 md:mx-[-14%]" />
            <p className="sun-caption invisible mt-6 text-center font-display text-xl">
              &ldquo;Catching sunsets at Bella&rdquo;
            </p>
          </div>
        </div>
      </div>

      <div className="arena-rooms px-[4vw] pt-[clamp(4rem,10vh,8rem)] pb-[clamp(6rem,14vh,10rem)]">
        <div className="grid grid-cols-1 items-start md:grid-cols-12 md:gap-x-[3vw]">
          <div className="arena-table md:col-span-8">
            <Aperture
              photo={photos.arenaTable}
              shape="plate"
              aspect="aspect-[3/2]"
              sizes="(min-width: 768px) 64vw, 92vw"
            />
          </div>
          {/* Overlaps the table's corner: one room, seen twice. */}
          <div className="relative z-10 -mt-[18%] ml-auto w-[62%] md:col-span-4 md:mt-[22vh] md:-ml-[9vw] md:w-auto">
            <div className="arena-dining rounded-plate border-[6px] border-canopy">
              <Aperture
                photo={photos.arenaDining}
                shape="plate"
                aspect="aspect-[3/2]"
                sizes="(min-width: 768px) 360px, 62vw"
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

/** A ringed photo: lantern band, a gap, then the image. `zoom` crops out baked-in logos. */
function Ring({ photo, className, zoom = "" }: { photo: Photo; className: string; zoom?: string }) {
  return (
    <div className={`absolute inset-0 rounded-full border-[9px] border-lantern p-[3%] ${className}`}>
      <div className="relative size-full overflow-hidden rounded-full">
        <div className="ring-media absolute inset-0">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 768px) 38vw, 80vw"
            className={`object-cover ${zoom}`}
            style={{ objectPosition: photo.position }}
          />
        </div>
      </div>
    </div>
  );
}
