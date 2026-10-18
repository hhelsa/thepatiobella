"use client";

import { useRef } from "react";

import { brandLine, instagram, nav, photos, stops } from "@/content/home";
import { EASE, gsap, responsive, splitReveal, SplitText, useGSAP } from "@/lib/motion";

import { CallButton, Frame, RollLink } from "./primitives";

/**
 * The close: one dark photograph under the last invitation and the footer,
 * so the page ends in a single place. The table settles as it scrolls in;
 * the wordmark rises letter by letter at the very end.
 */
export function Finale() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      responsive(({ reduceMotion }) => {
        if (reduceMotion) return;
        const wrap = root.current!;

        gsap.fromTo(
          ".finale-media",
          { scale: 1.25, yPercent: -6 },
          {
            scale: 1,
            yPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom bottom", scrub: true },
          },
        );
        splitReveal(".finale-title", { scrollTrigger: { trigger: ".finale-title", start: "top 80%" }, duration: 1.4 });
        gsap.from(".finale-reveal", {
          autoAlpha: 0,
          y: 18,
          duration: 0.9,
          stagger: 0.1,
          delay: 0.35,
          scrollTrigger: { trigger: ".finale-title", start: "top 80%" },
        });

        SplitText.create(".wordmark", {
          type: "chars",
          mask: "chars",
          autoSplit: true,
          aria: "auto",
          onSplit: (self) =>
            gsap.from(self.chars, {
              yPercent: 105,
              duration: 1.2,
              stagger: 0.045,
              ease: EASE.outStrong,
              scrollTrigger: { trigger: ".wordmark", start: "top 95%" },
            }),
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="on-canopy relative isolate overflow-hidden bg-canopy text-light">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Frame photo={photos.finale} sizes="100vw" mediaClassName="finale-media" className="absolute inset-0" />
        <div className="absolute inset-0 bg-canopy/72" />
      </div>

      <section
        id="reserve"
        aria-labelledby="finale-title"
        className="flex min-h-svh flex-col items-center justify-center px-[6vw] py-[16vh] text-center"
      >
        <h2 id="finale-title" className="finale-title display text-[clamp(3.25rem,8vw,6rem)] leading-[0.95]">
          <span className="block">Pull up</span>
          <span className="block">a chair.</span>
        </h2>
        <p className="finale-reveal mt-7 max-w-[34ch] text-[17px] leading-relaxed text-light/90 md:text-lg">
          {brandLine}, at the new Lugogo Mall and at Arena Mall, Nsambya.
        </p>
        <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          {stops.map((stop) => (
            <CallButton key={stop.id} stop={stop} tone="dark" className="finale-reveal justify-center" />
          ))}
        </div>
      </section>

      <footer role="contentinfo" className="px-[4vw] pt-10 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <div className="grid gap-10 border-t border-light/20 pt-10 text-[15px] sm:grid-cols-2 lg:grid-cols-12">
          {stops.map((stop) => (
            <div key={stop.id} className="lg:col-span-3">
              <p className="display text-2xl">{stop.name}</p>
              <p className="mt-1 text-light/75">{stop.area}</p>
              <a href={`tel:${stop.tel}`} className="mt-3 block w-fit tabular-nums text-gold">
                {stop.phone}
              </a>
              <RollLink href={stop.directions} label="Directions" external className="mt-1 text-light/90" />
            </div>
          ))}
          <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-8">
            <ul className="grid gap-1.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <RollLink href={item.href} label={item.label} />
                </li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-3">
            <RollLink href={instagram.url} label={`Instagram ${instagram.handle}`} external className="text-gold" />
            <p className="mt-4 max-w-[34ch] text-[13px] leading-relaxed text-light/60">
              A website concept. Details come from Patio Bella&rsquo;s own posts and are to be
              confirmed with the restaurant.
            </p>
          </div>
        </div>
        <p className="wordmark display mt-[clamp(2.5rem,6vw,5rem)] text-center text-[clamp(4.5rem,19vw,19rem)] leading-[0.82] tracking-[-0.035em] whitespace-nowrap">
          Patio Bella
        </p>
      </footer>
    </div>
  );
}
