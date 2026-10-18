"use client";

import { useRef } from "react";

import { brandLine, instagram, nav, photos, stops } from "@/content/home";
import { EASE, gsap, responsive, seamReveal, splitReveal, SplitText, useGSAP } from "@/lib/motion";

import { CallButton, Frame, RollLink } from "./primitives";

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
              {brandLine}. Call either room to book a table.
            </p>
            <div className="mt-10 flex flex-col items-start gap-3">
              {stops.map((stop) => (
                <CallButton key={stop.id} stop={stop} tone="dark" className="finale-reveal" />
              ))}
            </div>
          </div>
        </section>

        <footer role="contentinfo" className="overflow-hidden px-[4vw] pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <div className="grid gap-10 border-t border-light/20 pt-10 text-[15px] sm:grid-cols-2 lg:grid-cols-12">
            {stops.map((stop) => (
              <div key={stop.id} className="lg:col-span-3">
                <p className="display text-2xl">{stop.name}</p>
                <p className="mt-1 text-light/75">{stop.area}</p>
                <RollLink href={stop.directions} label="Directions" external className="mt-3 text-gold" />
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
              <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-light/65">
                A website concept. Details come from Patio Bella&rsquo;s own posts and are to be confirmed
                with the restaurant.
              </p>
            </div>
          </div>
          <p className="wordmark display mt-[clamp(2.5rem,6vw,5rem)] text-center text-[clamp(4.5rem,19vw,19rem)] leading-[0.82] tracking-[-0.035em] whitespace-nowrap">
            Patio Bella
          </p>
        </footer>
      </div>
    </div>
  );
}
