"use client";

import { useRef } from "react";

import { instagram, nav, stops } from "@/content/home";
import { EASE, gsap, responsive, SplitText, useGSAP } from "@/lib/motion";

import { RollLink } from "./primitives";

/** Shared footer, on canopy. The wordmark rises letter by letter. */
export function SiteFooter() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      responsive(({ reduceMotion }) => {
        if (reduceMotion) return;
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
    <footer ref={root} role="contentinfo" className="overflow-hidden px-[4vw] pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
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
  );
}
