"use client";

import { useRef } from "react";

import { happenings, instagram } from "@/content/home";
import { EASE, gsap, insetTo, responsive, setInset, splitReveal, useGSAP } from "@/lib/motion";

import { Frame, RollLink } from "./primitives";

/**
 * What happens at Patio Bella, as a typographic list. With a mouse, each
 * line's photograph opens beside the cursor as it is pointed at; everywhere
 * else the photographs sit inline with their lines. No dates or schedules:
 * the posts show these happening, not how often.
 */
export function WhatsOn() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (_, contextSafe) => {
      responsive(({ reduceMotion, canHover }) => {
        if (reduceMotion) return;
        const section = root.current!;

        splitReveal(".whats-title", { scrollTrigger: { trigger: ".whats-title", start: "top 85%" } });
        gsap.utils.toArray<HTMLElement>(".happening").forEach((row) => {
          const trigger = { trigger: row, start: "top 88%" };
          gsap.from(row.querySelector(".happening-rule"), { scaleX: 0, transformOrigin: "0% 50%", duration: 1.2, ease: EASE.inOut, scrollTrigger: trigger });
          splitReveal(row.querySelector(".happening-title")!, { scrollTrigger: trigger, duration: 1.1 });
          gsap.from(row.querySelector(".happening-text"), { autoAlpha: 0, y: 12, duration: 0.8, delay: 0.25, scrollTrigger: trigger });
        });

        if (!canHover || !contextSafe) return;

        // Pointer follower: one frame per line, opened on hover.
        section.setAttribute("data-hover-reveal", "");
        const follower = section.querySelector<HTMLElement>(".follower")!;
        const shots = gsap.utils.toArray<HTMLElement>(".follower .frame");
        shots.forEach((shot) => setInset(shot, [100, 0, 0, 0]));
        const moveX = gsap.quickTo(follower, "x", { duration: 0.7, ease: EASE.out });
        const moveY = gsap.quickTo(follower, "y", { duration: 0.7, ease: EASE.out });

        const onMove = contextSafe((e: PointerEvent) => {
          const r = section.getBoundingClientRect();
          moveX(e.clientX - r.left);
          moveY(e.clientY - r.top);
        });
        const show = contextSafe((i: number) => {
          shots.forEach((shot, j) => {
            if (j === i) {
              // Enter from below; leave upwards.
              setInset(shot, [100, 0, 0, 0]);
              insetTo(shot, [0, 0, 0, 0], { duration: 0.7, ease: EASE.outStrong });
            } else {
              insetTo(shot, [0, 0, 100, 0], { duration: 0.6, ease: EASE.inOut });
            }
          });
          gsap.to(".happening", { opacity: (j: number) => (j === i ? 1 : 0.35), duration: 0.5, overwrite: "auto" });
        });
        const hide = contextSafe(() => {
          shots.forEach((shot) => insetTo(shot, [0, 0, 100, 0], { duration: 0.5, ease: EASE.inOut }));
          gsap.to(".happening", { opacity: 1, duration: 0.5, overwrite: "auto" });
        });

        const list = section.querySelector<HTMLElement>(".happenings")!;
        const rows = gsap.utils.toArray<HTMLElement>(".happening");
        const enters = rows.map((row, i) => {
          const fn = () => show(i);
          row.addEventListener("pointerenter", fn);
          return () => row.removeEventListener("pointerenter", fn);
        });
        section.addEventListener("pointermove", onMove);
        list.addEventListener("pointerleave", hide);

        return () => {
          enters.forEach((off) => off());
          section.removeEventListener("pointermove", onMove);
          list.removeEventListener("pointerleave", hide);
          section.removeAttribute("data-hover-reveal");
        };
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="whats-on"
      aria-labelledby="whats-title"
      className="group/whats on-canopy relative overflow-hidden bg-canopy px-[4vw] py-[clamp(7rem,18vh,12rem)] text-light"
    >
      <div className="grid gap-y-14 lg:grid-cols-12 lg:gap-x-[3vw]">
        <div className="lg:col-span-4">
          <h2 id="whats-title" className="whats-title display text-[clamp(2.75rem,5vw,4.75rem)] leading-[0.98] lg:sticky lg:top-[calc(var(--header-h)+6svh)]">
            <span className="block">Seen at</span>
            <span className="block">Patio Bella.</span>
          </h2>
        </div>

        <div className="lg:col-span-8">
          <ul className="happenings">
            {happenings.map((item) => (
              <li key={item.title} className="happening relative grid grid-cols-[minmax(0,1fr)] gap-5 py-8 md:grid-cols-[9rem_minmax(0,1fr)] md:items-center md:gap-8 group-data-[hover-reveal]/whats:md:grid-cols-[minmax(0,1fr)]">
                <span aria-hidden className="happening-rule absolute inset-x-0 top-0 h-px bg-light/25" />
                <Frame
                  photo={item.photo}
                  sizes="(min-width: 768px) 144px, 92vw"
                  className="aspect-[4/3] w-full rounded-(--radius-frame) md:aspect-[4/5] group-data-[hover-reveal]/whats:hidden"
                />
                <div className="flex flex-col gap-3">
                  <h3 className="happening-title display text-[clamp(2.25rem,4.4vw,4.25rem)] leading-[1]">{item.title}</h3>
                  <p className="happening-text max-w-[42ch] text-[17px] leading-relaxed text-light/80">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-12 max-w-[46ch] text-[17px] leading-relaxed text-light/80">
            On Patio Fun Days there is face painting for the kids. For what&rsquo;s coming up, follow{" "}
            <RollLink href={instagram.url} label={instagram.handle} external className="align-bottom font-semibold text-gold" />.
          </p>
        </div>
      </div>

      {/* Pointer follower (fine pointers only). */}
      <div
        aria-hidden
        className="follower pointer-events-none absolute top-0 left-0 hidden w-[min(22vw,320px)] -translate-x-1/2 -translate-y-1/2 group-data-[hover-reveal]/whats:block"
      >
        <div className="relative aspect-[4/5]">
          {happenings.map((item) => (
            <Frame key={item.title} photo={{ ...item.photo, alt: "" }} sizes="320px" className="absolute inset-0 rounded-(--radius-frame)" />
          ))}
        </div>
      </div>
    </section>
  );
}
