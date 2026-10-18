"use client";

import { useRef } from "react";

import { drinks, instagram, moments, photos } from "@/content/home";
import { batchReveal, clipReveal, gsap, responsive, splitReveal, useGSAP } from "@/lib/motion";

import { Aperture } from "./Aperture";

// Phones: one glass full width, two below. Wider: three at staggered heights.
const GLASSES = [
  { photo: photos.hurricane, layout: "col-span-2 md:col-span-1 md:mt-0", drift: -6 },
  { photo: photos.highball, layout: "md:mt-[18vh]", drift: -16 },
  { photo: photos.martini, layout: "mt-[12vw] md:mt-[7vh]", drift: -10 },
];

export function Night() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      responsive(({ reduceMotion, isMobile }) => {
        if (reduceMotion) return;

        splitReveal(".night-title", {
          scrollTrigger: { trigger: ".night-title", start: "top 85%" },
        });

        // Glasses rise out of the dark at three different speeds.
        gsap.utils.toArray<HTMLElement>(".glass").forEach((glass, i) => {
          clipReveal(glass, {
            from: "bottom",
            media: glass.querySelector(".aperture-media") ?? undefined,
            delay: i * 0.14,
            scrollTrigger: { trigger: ".glasses", start: "top 80%" },
          });
          if (!isMobile) {
            gsap.to(glass.parentElement, {
              yPercent: GLASSES[i].drift,
              ease: "none",
              scrollTrigger: { trigger: ".glasses", start: "top bottom", end: "bottom top", scrub: true },
            });
          }
        });

        clipReveal(".henna-frame", {
          from: "bottom",
          media: ".henna-frame .aperture-media",
          scrollTrigger: { trigger: ".henna-frame", start: "top 80%" },
        });
        batchReveal(".moment", { y: 32 });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      data-ground="canopy"
      data-daypart="Night"
      aria-labelledby="night-title"
      className="px-[4vw] pt-[clamp(4rem,10vh,8rem)] pb-[clamp(6rem,14vh,10rem)]"
    >
      <div className="grid grid-cols-1 gap-y-6 md:grid-cols-12 md:gap-x-[3vw]">
        <h2
          id="night-title"
          className="night-title font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] tracking-[-0.025em] md:col-span-7"
        >
          After dark.
        </h2>
        <p className="max-w-[36ch] self-end text-lg leading-relaxed text-light/85 md:col-span-4 md:col-start-9">
          The bar takes over: sangria, nojitos, and a cocktail of the day poured for the table.
        </p>
      </div>

      <div className="glasses mt-[clamp(3rem,8vh,6rem)] grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-[3vw]">
        {GLASSES.map(({ photo, layout }) => (
          <div key={photo.src} className={layout}>
            <div className="glass">
              <Aperture
                photo={photo}
                shape="plate"
                aspect="aspect-[3/4]"
                sizes="(min-width: 768px) 30vw, 92vw"
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-14 font-display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-snug text-gold">
        {drinks.join(" · ")}
      </p>

      <div
        id="rituals"
        className="mt-[clamp(6rem,16vh,12rem)] grid grid-cols-1 items-start gap-y-12 md:grid-cols-12 md:gap-x-[3vw]"
      >
        <div className="henna-frame w-[80%] md:col-span-5 md:w-full">
          <Aperture photo={photos.henna} shape="arch" sizes="(min-width: 768px) 38vw, 80vw" />
        </div>
        <div className="md:col-span-6 md:col-start-7 md:pt-[6vh]">
          <h3 className="font-display text-[clamp(2.25rem,4.4vw,4rem)] leading-[0.98] tracking-[-0.02em]">
            Seen at Patio Bella.
          </h3>
          <ul className="mt-10 border-t border-light/20">
            {moments.map((moment) => (
              <li key={moment.title} className="moment border-b border-light/20 py-6">
                <p className="font-display text-[clamp(1.5rem,2.4vw,2rem)] leading-tight">{moment.title}</p>
                <p className="mt-2 max-w-[44ch] text-light/80">{moment.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-lg">
            Follow{" "}
            <a className="link-draw font-semibold text-gold" href={instagram.url} target="_blank" rel="noreferrer">
              {instagram.handle}
            </a>{" "}
            for what&rsquo;s on next.
          </p>
        </div>
      </div>
    </section>
  );
}
