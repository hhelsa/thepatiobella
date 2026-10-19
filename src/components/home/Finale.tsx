"use client";

import { useRef } from "react";

import { brandLine, photos, stops } from "@/content/home";
import { gsap, responsive, seamReveal, splitReveal, useGSAP } from "@/lib/motion";

import { CallButton, Frame } from "./primitives";
import { SiteFooter } from "./SiteFooter";

/**
 * The close. Canopy opens out of the butter page; a glass on black marble
 * melts into the ground beside the last invitation, which carries the two
 * calls. The footer sits on solid canopy below, ending in the wordmark,
 * which rises letter by letter.
 */
export function Finale() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      responsive(({ reduceMotion }) => {
        if (reduceMotion) return;
        const panel = root.current!.querySelector(".finale-panel")!;
        seamReveal(panel);

        gsap.fromTo(
          ".finale-media",
          { scale: 1.2, yPercent: -5 },
          {
            scale: 1,
            yPercent: 5,
            ease: "none",
            scrollTrigger: { trigger: "#reserve", start: "top bottom", end: "bottom top", scrub: true },
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

      });
    },
    { scope: root },
  );

  return (
    // The wrapper paints the previous section's ground for the seam.
    <div ref={root} className="bg-butter">
      <div className="finale-panel on-canopy relative bg-canopy text-light">
        <section
          id="reserve"
          aria-labelledby="finale-title"
          className="relative grid min-h-svh items-center overflow-hidden md:grid-cols-12"
        >
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-[58svh] [mask-image:linear-gradient(to_bottom,black_55%,transparent)] md:inset-y-0 md:right-0 md:left-auto md:h-auto md:w-[60%] md:[mask-image:linear-gradient(to_right,transparent,black_40%)]"
          >
            <Frame photo={photos.highball} sizes="(min-width: 768px) 60vw, 100vw" mediaClassName="finale-media" className="absolute inset-0" />
          </div>

          <div className="relative px-[4vw] pt-[50svh] pb-[12vh] md:col-span-7 md:py-[16vh] lg:col-span-6">
            <h2 id="finale-title" className="finale-title display text-[clamp(3.25rem,8vw,6rem)] leading-[0.95]">
              <span className="block">Pull up</span>
              <span className="block">a chair.</span>
            </h2>
            <p className="finale-reveal mt-7 max-w-[32ch] text-lg leading-relaxed text-light/90 md:text-xl">
              {brandLine}. Call either branch to book a table.
            </p>
            <div className="mt-10 flex flex-col items-start gap-3">
              {stops.map((stop) => (
                <CallButton key={stop.id} stop={stop} tone="dark" className="finale-reveal" />
              ))}
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </div>
  );
}
