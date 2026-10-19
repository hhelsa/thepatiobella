"use client";

import { useRef } from "react";

import { programmes } from "@/content/home";
import { clipReveal, EASE, gsap, responsive, splitReveal, useGSAP } from "@/lib/motion";

import { PosterVideo } from "./PosterVideo";
import { Frame, RollLink } from "./primitives";

/**
 * The weekly programmes. Each day's name runs huge across the section and
 * slides with the scroll; the photograph (or the Sunday poster) opens beside
 * the details and the offer.
 */
export function WhatsOn() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      responsive(({ reduceMotion }) => {
        if (reduceMotion) return;

        splitReveal(".whats-title", { scrollTrigger: { trigger: ".whats-title", start: "top 85%" } });
        gsap.utils.toArray<HTMLElement>(".programme").forEach((row, i) => {
          const dir = i % 2 === 0 ? 1 : -1;
          gsap.fromTo(
            row.querySelector(".programme-day"),
            { xPercent: 12 * dir },
            {
              xPercent: -12 * dir,
              ease: "none",
              scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
          clipReveal(row.querySelector(".programme-media")!, {
            from: "bottom",
            media: row.querySelector(".frame-media") ?? undefined,
            scrollTrigger: { trigger: row, start: "top 75%" },
          });
          gsap.from(row.querySelectorAll(".programme-reveal"), {
            autoAlpha: 0,
            y: 24,
            duration: 0.9,
            stagger: 0.09,
            ease: EASE.out,
            scrollTrigger: { trigger: row, start: "top 70%" },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="whats-on"
      aria-labelledby="whats-title"
      className="on-canopy relative overflow-hidden bg-canopy py-[clamp(7rem,18vh,12rem)] text-light"
    >
      <h2 id="whats-title" className="whats-title display px-[4vw] text-center text-[clamp(2.75rem,5.6vw,5.25rem)] leading-[0.98]">
        <span className="block">Every week</span>
        <span className="block">at Patio Bella.</span>
      </h2>

      <div className="mt-[clamp(4rem,10vh,7rem)] grid gap-[clamp(6rem,16vh,11rem)]">
        {programmes.map((p, i) => (
          <article key={p.id} className="programme relative" aria-labelledby={`programme-${p.id}`}>
            <p
              aria-hidden
              className="programme-day display pointer-events-none text-center text-[clamp(5rem,20vw,19rem)] leading-[0.8] whitespace-nowrap text-light/[0.08]"
            >
              {p.day}
            </p>
            <div
              className={`relative mt-[-0.32em] grid items-center gap-10 px-[4vw] text-[clamp(5rem,20vw,19rem)] md:grid-cols-12 md:gap-x-[3vw] ${
                i % 2 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className={`programme-media w-[78%] text-base md:col-span-5 md:w-full ${i % 2 ? "md:col-start-8" : "md:col-start-2"} ${i % 2 ? "ml-auto" : ""}`}>
                {p.id === "sunsets" ? (
                  <PosterVideo className="mx-auto w-full max-w-[420px] rounded-(--radius-frame)" />
                ) : (
                  <Frame photo={p.photo} sizes="(min-width: 768px) 38vw, 78vw" className="aspect-[4/5] rounded-(--radius-frame)" />
                )}
              </div>
              <div className={`text-base md:col-span-5 ${i % 2 ? "md:col-start-2" : "md:col-start-8"}`}>
                <h3 id={`programme-${p.id}`} className="programme-reveal display text-[clamp(2.5rem,4.4vw,4rem)] leading-[1]">
                  {p.title}
                </h3>
                <p className="programme-reveal mt-6 max-w-[40ch] text-lg leading-relaxed text-light/85">{p.text}</p>
                <p className="programme-reveal mt-8 border-y border-light/20 py-5 display text-[clamp(1.5rem,2.2vw,2rem)] leading-tight text-gold">
                  {p.offer}
                </p>
                <p className="programme-reveal mt-5 text-[15px] text-light/75">{p.where}</p>
                <div className="programme-reveal mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                  {p.rsvp && (
                    <a
                      href={`tel:${p.rsvp.tel}`}
                      className="fill-btn inline-flex min-h-12 items-center bg-gold px-6 text-[15px] font-semibold text-canopy [--fill:var(--color-light)]"
                    >
                      RSVP {p.rsvp.phone}
                    </a>
                  )}
                  <RollLink href="/whats-on" label="More on what’s on" className="border-b border-light/40 pb-1 text-[15px] font-semibold" />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
