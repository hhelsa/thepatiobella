"use client";

import { useRef, useState } from "react";

import { photos, stops, type Stop } from "@/content/home";
import {
  clipReveal,
  EASE,
  gsap,
  insetTo,
  prefersReducedMotion,
  responsive,
  seamReveal,
  setInset,
  splitReveal,
  useGSAP,
} from "@/lib/motion";

import { Frame, RollLink } from "./primitives";

const ROOM_PHOTO = {
  lugogo: photos.lugogoCounter,
  arena: photos.arenaSunsetDinner,
} as const;

/**
 * Finding us. Two branches, each with its number and a call action. On wide
 * screens the photograph beside them changes to whichever branch the visitor
 * points at or tabs into; on phones each branch carries its own photograph.
 */
export function Visit() {
  const root = useRef<HTMLElement>(null);
  const [shown, setShown] = useState<Stop["id"]>("lugogo");
  // Set inside useGSAP so its tweens belong to the component's context.
  const swap = useRef<(id: Stop["id"]) => void>(() => {});

  useGSAP(
    (_, contextSafe) => {
      const arenaPhoto = root.current?.querySelector(".visit-photo-arena");
      if (arenaPhoto) setInset(arenaPhoto, [100, 0, 0, 0]);
      swap.current = contextSafe!((id: Stop["id"]) => {
        const arena =
          root.current?.querySelector<HTMLElement>(".visit-photo-arena");
        if (!arena) return;
        const clip: [number, number, number, number] =
          id === "arena" ? [0, 0, 0, 0] : [100, 0, 0, 0];
        if (prefersReducedMotion()) {
          setInset(arena, clip);
          return;
        }
        insetTo(arena, clip, { duration: 0.9, ease: EASE.inOut });
        gsap.fromTo(
          arena.querySelector(".frame-media"),
          { scale: id === "arena" ? 1.15 : 1 },
          { scale: 1, duration: 1.1, ease: EASE.out, overwrite: true },
        );
      });

      responsive(({ reduceMotion }) => {
        if (reduceMotion) return;
        seamReveal(root.current!);
        splitReveal(".visit-title", {
          scrollTrigger: { trigger: ".visit-title", start: "top 85%" },
        });
        gsap.from(".visit-lede", {
          autoAlpha: 0,
          y: 14,
          duration: 0.9,
          scrollTrigger: { trigger: ".visit-title", start: "top 85%" },
        });
        gsap.utils.toArray<HTMLElement>(".visit-stop").forEach((stop) => {
          gsap.from(stop.querySelector(".visit-rule"), {
            scaleX: 0,
            transformOrigin: "0% 50%",
            duration: 1.2,
            ease: EASE.inOut,
            scrollTrigger: { trigger: stop, start: "top 85%" },
          });
          gsap.from(stop.querySelectorAll(".visit-reveal"), {
            autoAlpha: 0,
            y: 24,
            duration: 0.9,
            stagger: 0.08,
            scrollTrigger: { trigger: stop, start: "top 85%" },
          });
        });
        clipReveal(".visit-photo", {
          from: "bottom",
          media: ".visit-photo .frame-media",
          scrollTrigger: { trigger: ".visit-photo", start: "top 80%" },
        });
      });
    },
    { scope: root },
  );

  const showRoom = (id: Stop["id"]) => {
    if (id === shown) return;
    setShown(id);
    swap.current(id);
  };

  return (
    // The wrapper paints the previous section's ground for the seam.
    <div className="bg-canopy">
      <section
        ref={root}
        id="visit"
        aria-labelledby="visit-title"
        className="visit-panel relative bg-butter px-[4vw] py-[clamp(7rem,18vh,12rem)] text-canopy"
      >
        <div className="grid gap-y-14 md:grid-cols-12 md:gap-x-[3vw]">
          <div className="md:col-span-7 lg:col-span-6">
            <h2
              id="visit-title"
              className="visit-title display text-[clamp(3rem,6.4vw,6rem)] leading-[0.95]"
            >
              <span className="block">Find us.</span>
            </h2>
            <p className="visit-lede mt-6 max-w-[34ch] text-lg leading-relaxed md:text-xl">
              Two branches across Kampala. Tables are booked by phone, at
              either branch.
            </p>

            <div className="mt-14 grid gap-14">
              {stops.map((stop) => (
                <article
                  key={stop.id}
                  className="visit-stop relative pt-8"
                  aria-labelledby={`visit-${stop.id}`}
                  onPointerEnter={() => showRoom(stop.id)}
                  onFocus={() => showRoom(stop.id)}
                >
                  <span
                    aria-hidden
                    className="visit-rule absolute inset-x-0 top-0 h-px bg-canopy/30"
                  />
                  <Frame
                    photo={ROOM_PHOTO[stop.id]}
                    sizes="92vw"
                    className="visit-reveal mb-7 aspect-[16/10] w-full rounded-(--radius-frame) md:hidden"
                  />
                  <h3
                    id={`visit-${stop.id}`}
                    className="visit-reveal display text-[clamp(2.5rem,4.6vw,4.25rem)] leading-none"
                  >
                    {stop.name}
                  </h3>
                  <p className="visit-reveal mt-3 text-lg">
                    {stop.isNew
                      ? `Newly opened, ${stop.area.charAt(0).toLowerCase()}${stop.area.slice(1)}`
                      : stop.area}
                  </p>
                  <div className="visit-reveal mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
                    <a
                      href={stop.directions}
                      target="_blank"
                      rel="noreferrer"
                      className="fill-btn inline-flex min-h-12 items-center bg-canopy px-6 text-[15px] font-semibold text-butter transition-colors duration-500 [--fill:var(--color-light)] hover:text-canopy"
                    >
                      Get directions
                    </a>
                    <RollLink
                      href={`tel:${stop.tel}`}
                      label={`Call ${stop.phone}`}
                      className="text-[15px] font-semibold tabular-nums"
                    />
                    {stop.note && (
                      <span className="text-[15px] text-canopy/75">
                        {stop.note}
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div
            aria-hidden
            className="hidden md:col-span-5 md:block lg:col-span-5 lg:col-start-8"
          >
            <div className="sticky top-[calc(var(--header-h)+6svh)]">
              <div className="visit-photo relative aspect-[4/5] overflow-hidden rounded-(--radius-frame)">
                <Frame
                  photo={{ ...ROOM_PHOTO.lugogo, alt: "" }}
                  sizes="(min-width: 1024px) 38vw, 40vw"
                  className="absolute inset-0"
                />
                <Frame
                  photo={{ ...ROOM_PHOTO.arena, alt: "" }}
                  sizes="(min-width: 1024px) 38vw, 40vw"
                  className="visit-photo-arena absolute inset-0 [clip-path:inset(100%_0%_0%_0%)]"
                />
              </div>
              <p className="mt-4 text-[15px] font-medium">
                {stops.find((s) => s.id === shown)!.name}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
