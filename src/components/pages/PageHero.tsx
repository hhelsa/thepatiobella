"use client";

import { useRef } from "react";

import type { Photo } from "@/content/home";
import {
  DURATION,
  EASE,
  gsap,
  insetTo,
  releaseIntro,
  responsive,
  setInset,
  splitReveal,
  useGSAP,
} from "@/lib/motion";

import { Frame } from "../home/primitives";

/**
 * Opening for the inner pages, in the homepage's grammar: on canopy, the
 * photograph opens from a centred frame to full bleed, then the header and
 * the title arrive. As the visitor scrolls on, the photo sinks and the words
 * lift away.
 */
export function PageHero({
  title,
  lede,
  photo,
  children,
}: {
  title: string[];
  lede: string;
  photo: Photo;
  children?: React.ReactNode;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      responsive(
        ({ reduceMotion, isMobile }) => {
          if (!reduceMotion) {
            const section = root.current!;
            const frame = section.querySelector<HTMLElement>(".page-hero-frame")!;
            const header = document.querySelector<HTMLElement>("[data-site-header] .header-inner");
            setInset(frame, isMobile ? [30, 14, 30, 14] : [26, 32, 26, 32]);

            const tl = gsap.timeline({ delay: 0.1, defaults: { ease: EASE.outStrong } });
            tl.add(insetTo(frame, [0, 0, 0, 0], { duration: 1.5, ease: EASE.cinematic }), 0)
              .fromTo(".page-hero-media", { scale: 1.35 }, { scale: 1, duration: 2, ease: EASE.cinematic }, 0);
            if (header) tl.from(header, { yPercent: -110, duration: DURATION.slow }, 0.9);
            splitReveal(".page-hero-title", { by: "lines", timeline: tl, position: 0.95, duration: 1.3 });
            tl.from(".page-hero-reveal", { autoAlpha: 0, y: 18, duration: DURATION.slow, stagger: 0.1 }, 1.35);
            releaseIntro();

            const leave = { trigger: section, start: "top top", end: "bottom top", scrub: true };
            gsap.to(".page-hero-drift", { yPercent: 14, ease: "none", scrollTrigger: leave });
            gsap.to(".page-hero-content", { yPercent: -24, autoAlpha: 0, ease: "none", scrollTrigger: { ...leave, end: "75% top" } });
          } else {
            releaseIntro();
          }
        },
        ["reduceMotion", "isMobile"],
      );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      aria-labelledby="page-title"
      className="on-canopy relative h-[86svh] min-h-[560px] overflow-hidden bg-canopy text-light"
    >
      <div data-intro className="page-hero-frame absolute inset-0">
        <div className="page-hero-drift absolute inset-0">
          <Frame photo={photo} sizes="100vw" preload mediaClassName="page-hero-media" className="absolute inset-0" />
        </div>
        <div aria-hidden className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-canopy/70 to-transparent" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-canopy/90 via-canopy/45 to-transparent" />
      </div>

      <div className="page-hero-content relative flex h-full flex-col justify-end px-[4vw] pb-[max(3rem,8svh)]">
        <h1 id="page-title" data-intro className="page-hero-title display text-[clamp(3.25rem,9vw,8rem)] leading-[0.92]">
          {title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p data-intro className="page-hero-reveal mt-6 max-w-[44ch] text-lg leading-relaxed text-light/90 md:text-xl">
          {lede}
        </p>
        {children && (
          <div data-intro className="page-hero-reveal mt-8">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
