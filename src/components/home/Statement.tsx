"use client";

import Image from "next/image";
import { useRef } from "react";

import { photos, type Photo } from "@/content/home";
import { gsap, responsive, SplitText, useGSAP } from "@/lib/motion";

import { RollLink } from "./primitives";

/** A photograph set into the sentence like a word. */
function InlinePhoto({ photo }: { photo: Photo }) {
  return (
    <span
      aria-hidden
      className="inline-photo relative mx-[0.14em] inline-block h-[0.9em] w-[1.75em] -translate-y-[0.04em] overflow-hidden rounded-[3px] align-baseline"
    >
      <span className="inline-photo-media absolute inset-0 block">
        <Image
          src={photo.src}
          alt=""
          fill
          sizes="120px"
          className="object-cover"
          style={{ objectPosition: photo.position }}
        />
      </span>
    </span>
  );
}

/**
 * The two rooms in one sentence. As the visitor scrolls, the words fill in
 * from faint to full ink, and the photographs in the line open as they are
 * reached. Static, the sentence is simply there.
 */
export function Statement() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      responsive(
        ({ reduceMotion }) => {
          if (reduceMotion) return;
          const text = root.current!.querySelector<HTMLElement>(".statement-text")!;
          const range = { trigger: text, start: "top 78%", end: "bottom 42%", scrub: true };

          SplitText.create(text, {
            type: "words",
            aria: "auto",
            autoSplit: true,
            onSplit: (self) =>
              gsap.fromTo(
                self.words,
                { opacity: 0.16 },
                { opacity: 1, stagger: 0.12, ease: "none", scrollTrigger: range },
              ),
          });

          gsap.utils.toArray<HTMLElement>(".inline-photo").forEach((el) => {
            gsap.fromTo(
              el,
              { clipPath: "inset(0% 50% 0% 50%)" },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                ease: "power2.out",
                scrollTrigger: { trigger: el, start: "top 72%", end: "top 52%", scrub: true },
              },
            );
            gsap.fromTo(
              el.querySelector(".inline-photo-media"),
              { scale: 1.6 },
              {
                scale: 1,
                ease: "power2.out",
                scrollTrigger: { trigger: el, start: "top 72%", end: "top 45%", scrub: true },
              },
            );
          });
        },
        ["reduceMotion"],
      );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-label="About Patio Bella"
      className="relative bg-butter px-[6vw] py-[clamp(8rem,26vh,15rem)] text-canopy"
    >
      <p className="statement-text display mx-auto max-w-[21em] text-center text-[clamp(1.9rem,3.7vw,3.6rem)] leading-[1.14]">
        Two rooms, one table. At Lugogo Mall <InlinePhoto photo={photos.lugogoDaylight} />, butter-yellow
        walls and glass onto the palms. At Arena Mall <InlinePhoto photo={photos.arenaCanopy} />, lanterns
        under a ceiling of leaves. From the first coffee <InlinePhoto photo={photos.cappuccino} /> to the
        last cocktail <InlinePhoto photo={photos.highball} />, this is where we all come together.
      </p>
      <div className="mt-14 flex justify-center">
        <RollLink href="#visit" label="Find both rooms" className="border-b border-canopy/40 pb-1 text-[15px] font-semibold" />
      </div>
    </section>
  );
}
