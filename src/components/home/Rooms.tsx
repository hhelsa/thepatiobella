"use client";

import { useRef } from "react";

import { photos, type Photo } from "@/content/home";
import { EASE, pinnedScene, responsive, useGSAP } from "@/lib/motion";

import { Frame, RollLink } from "./primitives";

const ROOMS: { id: string; photo: Photo; label: string; name: string; text: string }[] = [
  {
    id: "lugogo",
    photo: photos.lugogoDaylight,
    label: "New · By day",
    name: "Lugogo Mall",
    text: "Butter-yellow walls, painted leaves and glass walls onto the palms, near Kyadondo Rugby Grounds.",
  },
  {
    id: "arena",
    photo: { ...photos.arenaCanopy, position: "62% 45%" },
    label: "Nsambya · By night",
    name: "Arena Mall",
    text: "Rattan lanterns under a ceiling of hanging leaves, with the city beyond the glass.",
  },
];

/**
 * The two rooms, one scene. Pinned: a framed view of Lugogo opens until it
 * fills the screen, then Arena Mall rises over it from below, each with its
 * own caption. Static (no JS, reduced motion): two full-height rooms in turn.
 */
export function Rooms() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      responsive(({ reduceMotion, isMobile }) => {
        if (reduceMotion) return;
        const section = root.current!;
        section.setAttribute("data-scene", "");

        const tl = pinnedScene(section.querySelector(".rooms-stage")!, { end: "+=260%", scrub: 1 });
        const closed = isMobile ? "inset(38% 5% 7% 5%)" : "inset(34% 25% 9% 25%)";

        tl.fromTo(".room-lugogo .frame", { clipPath: closed }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: EASE.inOut }, 0)
          .fromTo(".room-lugogo .frame-media", { scale: 1.3 }, { scale: 1, duration: 1.1, ease: EASE.inOut }, 0)
          .fromTo(".room-lugogo .room-shade", { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "none" }, 0.5)
          .to(".rooms-title", { autoAlpha: 0, yPercent: -40, duration: 0.5, ease: "power2.in" }, 0.15)
          .fromTo(".room-lugogo .room-copy > *", { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08, ease: EASE.out }, 0.85)
          // Night falls over the day.
          .to(".room-lugogo .room-copy > *", { autoAlpha: 0, y: -30, duration: 0.35, stagger: 0.04, ease: "power2.in" }, 1.75)
          .fromTo(".room-arena .frame", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: EASE.inOut }, 1.85)
          .fromTo(".room-arena .frame-media", { scale: 1.25, yPercent: 8 }, { scale: 1, yPercent: 0, duration: 1.1, ease: EASE.inOut }, 1.85)
          .to(".room-lugogo .frame-media", { yPercent: -10, duration: 1, ease: EASE.inOut }, 1.85)
          .fromTo(".room-arena .room-copy > *", { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08, ease: EASE.out }, 2.6)
          .to({}, { duration: 0.5 });

        return () => section.removeAttribute("data-scene");
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="rooms"
      aria-labelledby="rooms-title"
      className="group/rooms on-canopy relative bg-canopy text-light"
    >
      <div className="rooms-stage relative group-data-[scene]/rooms:h-svh group-data-[scene]/rooms:overflow-hidden">
        <div className="rooms-title relative z-10 px-[6vw] pt-[clamp(6rem,18vh,11rem)] pb-[clamp(3rem,8vh,5rem)] text-center group-data-[scene]/rooms:absolute group-data-[scene]/rooms:inset-x-0 group-data-[scene]/rooms:top-[calc(var(--header-h)+5svh)] group-data-[scene]/rooms:p-0">
          <h2 id="rooms-title" className="display text-[clamp(2.75rem,5.4vw,5rem)] leading-[0.98]">
            <span className="block">Two rooms,</span>
            <span className="block">two moods.</span>
          </h2>
        </div>

        {ROOMS.map((room) => (
          <article
            key={room.id}
            className={`room room-${room.id} relative h-[88svh] min-h-[520px] group-data-[scene]/rooms:absolute group-data-[scene]/rooms:inset-0 group-data-[scene]/rooms:h-auto group-data-[scene]/rooms:min-h-0`}
            aria-labelledby={`room-${room.id}`}
          >
            <Frame photo={room.photo} sizes="100vw" className="absolute inset-0" />
            <div className="room-shade pointer-events-none absolute inset-0 bg-linear-to-t from-canopy/85 via-canopy/25 to-transparent" />
            <div className="room-copy absolute inset-x-[4vw] bottom-[max(2.5rem,7svh)] grid gap-4 md:max-w-[44rem]">
              <p className="text-[13px] font-semibold tracking-[0.14em] text-gold uppercase">{room.label}</p>
              <h3 id={`room-${room.id}`} className="display text-[clamp(3.25rem,8vw,6rem)] leading-[0.92]">
                {room.name}
              </h3>
              <p className="max-w-[40ch] text-[17px] leading-relaxed text-light/90 md:text-lg">{room.text}</p>
              <div>
                <RollLink href="#visit" label="Plan a visit" className="border-b border-light/40 pb-1 text-[15px] font-semibold" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
