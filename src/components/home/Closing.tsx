"use client";

import { useRef } from "react";

import { brandLine, photos, stops } from "@/content/home";
import { responsive, splitReveal, useGSAP } from "@/lib/motion";

import { Aperture } from "./Aperture";
import { StopLink } from "./StopLink";

/** The art and the closing invitation to reserve. */
export function Closing() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      responsive(({ reduceMotion }) => {
        if (reduceMotion) return;
        splitReveal(".art-quote", {
          by: "words",
          scrollTrigger: { trigger: ".art-quote", start: "top 82%" },
        });
        splitReveal(".close-title", {
          scrollTrigger: { trigger: ".close-title", start: "top 85%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section
        data-ground="canopy"
        data-daypart="Night"
        aria-labelledby="art-title"
        className="grid grid-cols-1 items-center gap-y-10 px-[4vw] py-[clamp(5rem,12vh,9rem)] md:grid-cols-12 md:gap-x-[3vw]"
      >
        <div className="w-[64%] max-w-[420px] md:col-span-4 md:col-start-2 md:w-full">
          <Aperture photo={photos.artWall} shape="arch" sizes="(min-width: 768px) 420px, 64vw" />
        </div>
        <figure className="md:col-span-6 md:col-start-7">
          <blockquote>
            <p
              id="art-title"
              className="art-quote font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.015em]"
            >
              More than décor, every piece tells a story.
            </p>
          </blockquote>
          <figcaption className="mt-5 text-light/75">The Art at Patio Bella</figcaption>
        </figure>
      </section>

      <section
        id="reserve"
        data-ground="canopy"
        data-daypart="Night"
        aria-labelledby="close-title"
        className="px-[4vw] pt-[clamp(5rem,12vh,9rem)] pb-[clamp(5rem,12vh,9rem)]"
      >
        <h2
          id="close-title"
          className="close-title max-w-[13ch] font-display text-[clamp(3rem,8vw,6rem)] leading-[0.92] tracking-[-0.03em]"
        >
          {brandLine}.
        </h2>
        <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-light/85">
          Two rooms, one table. Call ahead to reserve at either.
        </p>
        <div className="mt-14 grid grid-cols-1 gap-x-[4vw] gap-y-14 md:grid-cols-2">
          {stops.map((stop) => (
            <StopLink key={stop.id} stop={stop} variant="large" />
          ))}
        </div>
      </section>

    </div>
  );
}
