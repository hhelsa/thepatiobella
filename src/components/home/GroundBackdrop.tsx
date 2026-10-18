"use client";

import { useRef } from "react";

import { dayparts } from "@/content/home";
import { gsap, responsive, ScrollTrigger, useGSAP } from "@/lib/motion";

const DAYPARTS: readonly string[] = dayparts;

const GROUNDS = ["butter", "amber", "lantern", "canopy"] as const;
type Ground = (typeof GROUNDS)[number];

const RGB: Record<Ground, [number, number, number]> = {
  butter: [232, 197, 133],
  amber: [218, 147, 59],
  lantern: [176, 102, 30],
  canopy: [16, 35, 12],
};
const INK: Record<Ground, string> = {
  butter: "var(--color-canopy)",
  amber: "var(--color-canopy)",
  lantern: "var(--color-light)",
  canopy: "var(--color-light)",
};

/**
 * The page's day. Every section declares `data-ground` and `data-daypart`.
 *
 * - Always: html[data-daypart] follows the section at mid-viewport.
 * - With motion: sections turn transparent and a fixed backdrop of stacked
 *   colour layers crossfades (opacity only) as the visitor scrolls. A
 *   section marked `data-ground-fade="self"` runs its own fade (the pinned
 *   sunset). The header's --ground-now / --ink-now are computed each frame
 *   from the layers' actual opacities, so it always matches what is visible.
 * - Without JavaScript or with reduced motion, each section paints its own
 *   ground and the header switches per section.
 *
 * Rendered after the sections so its triggers are created after the sunset
 * pin and measure the pin's spacing correctly.
 */
export function GroundBackdrop() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const html = document.documentElement;
      // The sections live outside this component's scope: query the document.
      const sections = Array.from(document.querySelectorAll<HTMLElement>("main [data-daypart]"));
      let motion = false;

      const setGround = (ground: Ground) => {
        html.style.setProperty("--ground-now", `var(--color-${ground})`);
        html.style.setProperty("--ink-now", INK[ground]);
      };
      const setNow = (section: HTMLElement) => {
        html.dataset.daypart = section.dataset.daypart;
        html.style.setProperty("--day-i", String(DAYPARTS.indexOf(section.dataset.daypart ?? "")));
        if (!motion) setGround((section.dataset.ground ?? "butter") as Ground);
      };

      sections.forEach((section) =>
        ScrollTrigger.create({
          trigger: section,
          start: "top 50%",
          end: "bottom 50%",
          onToggle: (self) => self.isActive && setNow(section),
        }),
      );
      if (sections[0]) setNow(sections[0]);

      // The header's travelling day line appears once the hero's own has gone.
      ScrollTrigger.create({
        trigger: document.getElementById("top"),
        start: "bottom 35%",
        onEnter: () => html.setAttribute("data-past-hero", ""),
        onLeaveBack: () => html.removeAttribute("data-past-hero"),
      });

      responsive(
        ({ reduceMotion }) => {
          if (reduceMotion) return;
          motion = true;
          html.setAttribute("data-ground-js", "");

          const layer = (g: Ground) => root.current!.querySelector<HTMLElement>(`[data-ground-layer="${g}"]`)!;

          let previous: string | undefined;
          for (const section of sections) {
            const ground = section.dataset.ground as Ground | undefined;
            if (ground && previous && ground !== previous && section.dataset.groundFade !== "self") {
              gsap.fromTo(
                layer(ground),
                { opacity: 0 },
                {
                  opacity: 1,
                  ease: "none",
                  scrollTrigger: { trigger: section, start: "top 85%", end: "top 35%", scrub: true },
                },
              );
            }
            previous = ground;
          }

          // Header ground = the visible blend of the layers.
          const stack = (["amber", "lantern", "canopy"] as const).map((g) => [g, layer(g)] as const);
          let last = "";
          const sync = () => {
            let rgb = [...RGB.butter];
            let darkness = 0;
            for (const [g, el] of stack) {
              const o = Number(el.style.opacity || 0);
              rgb = rgb.map((v, i) => v + (RGB[g][i] - v) * o);
              if (g !== "amber") darkness = Math.max(darkness, o);
            }
            const key = rgb.map(Math.round).join(",");
            if (key === last) return;
            last = key;
            html.style.setProperty("--ground-now", `rgb(${key})`);
            // Light ink once lantern or canopy dominates.
            html.style.setProperty("--ink-now", darkness > 0.6 ? INK.canopy : INK.butter);
          };
          gsap.ticker.add(sync);
          sync();

          return () => {
            gsap.ticker.remove(sync);
            motion = false;
            html.removeAttribute("data-ground-js");
          };
        },
        ["reduceMotion"],
      );

      return () => {
        html.style.removeProperty("--ground-now");
        html.style.removeProperty("--ink-now");
        html.style.removeProperty("--day-i");
        html.removeAttribute("data-past-hero");
        delete html.dataset.daypart;
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {GROUNDS.map((ground, i) => (
        <div
          key={ground}
          data-ground-layer={ground}
          className="absolute inset-0"
          style={{ backgroundColor: `var(--color-${ground})`, opacity: i === 0 ? 1 : 0 }}
        />
      ))}
    </div>
  );
}
