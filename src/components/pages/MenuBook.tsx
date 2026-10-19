"use client";

import { useRef, useState } from "react";

import { photos, type Photo } from "@/content/home";
import { drinks, food, menuNote, type MenuGroup, type MenuItem } from "@/content/menu";
import { batchReveal, clipReveal, EASE, gsap, responsive, ScrollTrigger, splitReveal, useFlip, useGSAP } from "@/lib/motion";

import { Frame } from "../home/primitives";

const SECTION_PHOTOS: Record<string, Photo> = {
  breakfast: photos.guestBreakfast,
  pizza: photos.pizzaPull,
  pasta: photos.penne,
  desserts: photos.cheesecake,
  coffee: photos.cappuccino,
};

const GROUPS = [food, drinks];

/**
 * The full menu, as posted by the restaurant. A sticky switcher shows which
 * half of the menu is being read (its marker moves with Flip) and lists that
 * half's sections; every section title, photo and item enters as it scrolls in.
 */
export function MenuBook() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<MenuGroup["id"]>("food");
  const activeRef = useRef<MenuGroup["id"]>("food");
  const capture = useFlip(root, "[data-flip-id='menu-marker']", [active], { duration: 0.6, ease: EASE.outStrong });

  useGSAP(
    () => {
      GROUPS.forEach((group) =>
        ScrollTrigger.create({
          trigger: `#${group.id}`,
          start: "top 45%",
          end: "bottom 45%",
          onToggle: (self) => {
            if (!self.isActive || activeRef.current === group.id) return;
            activeRef.current = group.id;
            capture();
            setActive(group.id);
          },
        }),
      );

      responsive(({ reduceMotion }) => {
        if (reduceMotion) return;
        gsap.utils.toArray<HTMLElement>(".menu-group-title").forEach((el) =>
          splitReveal(el, { scrollTrigger: { trigger: el, start: "top 85%" }, duration: 1.3 }),
        );
        gsap.utils.toArray<HTMLElement>(".menu-section").forEach((section) => {
          const title = section.querySelector<HTMLElement>(".menu-section-title")!;
          splitReveal(title, { scrollTrigger: { trigger: section, start: "top 80%" } });
          gsap.from(section.querySelector(".menu-section-rule"), {
            scaleX: 0,
            transformOrigin: "0% 50%",
            duration: 1.2,
            ease: EASE.inOut,
            scrollTrigger: { trigger: section, start: "top 82%" },
          });
          const photo = section.querySelector<HTMLElement>(".menu-section-photo");
          if (photo) {
            clipReveal(photo, {
              from: "bottom",
              media: photo.querySelector(".frame-media") ?? undefined,
              scrollTrigger: { trigger: section, start: "top 75%" },
            });
          }
        });
        batchReveal(".menu-item", { y: 22, stagger: 0.05, start: "top 92%" });
      });
    },
    { scope: root },
  );

  const current = GROUPS.find((g) => g.id === active)!;

  return (
    <div ref={root} className="relative bg-butter text-canopy">
      {/* Sticky switcher under the header. */}
      <nav
        aria-label="Menu sections"
        className="sticky top-(--header-h) z-30 border-b border-canopy/15 bg-butter/95 backdrop-blur-[2px]"
      >
        <div className="flex items-center gap-6 px-[4vw]">
          <ul className="flex shrink-0 gap-6">
            {GROUPS.map((group) => (
              <li key={group.id} className="relative">
                <a href={`#${group.id}`} className="display block py-4 text-2xl leading-none" aria-current={active === group.id ? "true" : undefined}>
                  {group.title}
                </a>
                {active === group.id && (
                  <span data-flip-id="menu-marker" className="absolute inset-x-0 bottom-0 block h-[3px] bg-canopy" />
                )}
              </li>
            ))}
          </ul>
          <span aria-hidden className="h-6 w-px shrink-0 bg-canopy/25" />
          <ul className="flex gap-5 overflow-x-auto py-4 text-[14px] font-medium whitespace-nowrap [scrollbar-width:none]">
            {current.sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="text-canopy/75 transition-colors hover:text-canopy">
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {GROUPS.map((group) => (
        <section
          key={group.id}
          id={group.id}
          aria-labelledby={`${group.id}-title`}
          className={`scroll-mt-[calc(var(--header-h)+3.5rem)] px-[4vw] pt-[clamp(5rem,12vh,8rem)] pb-[clamp(3rem,8vh,5rem)] ${group.id === "drinks" ? "border-t border-canopy/15" : ""}`}
        >
          <h2 id={`${group.id}-title`} className="menu-group-title display text-[clamp(4rem,14vw,12rem)] leading-[0.85]">
            {group.title}
          </h2>

          {group.sections.map((section) => {
            const photo = SECTION_PHOTOS[section.id];
            return (
              <div key={section.id} id={section.id} className="menu-section relative mt-[clamp(4rem,10vh,7rem)] scroll-mt-[calc(var(--header-h)+6rem)] grid gap-y-8 lg:grid-cols-12 lg:gap-x-[3vw]">
                <span aria-hidden className="menu-section-rule absolute inset-x-0 -top-8 h-px bg-canopy/25" />
                <div className="lg:col-span-4">
                  <div className="lg:sticky lg:top-[calc(var(--header-h)+5.5rem)]">
                    <h3 className="menu-section-title display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1]">{section.title}</h3>
                    {section.note && <p className="mt-3 max-w-[30ch] text-[15px] text-canopy/75">{section.note}</p>}
                    {photo && (
                      <Frame
                        photo={photo}
                        sizes="(min-width: 1024px) 28vw, 60vw"
                        className="menu-section-photo mt-8 aspect-[4/5] w-[60%] rounded-(--radius-frame) lg:w-[78%]"
                      />
                    )}
                  </div>
                </div>
                <ul className="grid content-start gap-x-[3vw] gap-y-9 md:grid-cols-2 lg:col-span-8">
                  {section.items.map((item) => (
                    <Item key={item.name} item={item} />
                  ))}
                </ul>
              </div>
            );
          })}
        </section>
      ))}

      <p className="px-[4vw] pb-[clamp(5rem,12vh,8rem)] text-center text-[15px] text-canopy/75">{menuNote}</p>
    </div>
  );
}

function Item({ item }: { item: MenuItem }) {
  return (
    <li className="menu-item">
      <div className="flex items-baseline gap-3">
        <h4 className="display text-[clamp(1.375rem,1.7vw,1.625rem)] leading-tight">
          {item.name}
          {item.vegetarian && <span className="ml-2 align-middle font-sans text-[12px] font-semibold text-canopy/70">(V)</span>}
        </h4>
        {item.price && (
          <>
            <span aria-hidden className="min-w-6 flex-1 translate-y-[-0.3em] border-b border-dotted border-canopy/45" />
            <span className="shrink-0 text-[15px] font-semibold tabular-nums">{item.price}</span>
          </>
        )}
      </div>
      {item.prices && (
        <p className="mt-1.5 flex gap-5 text-[15px] tabular-nums">
          {item.prices.map((p) => (
            <span key={p.label}>
              <span className="text-canopy/70">{p.label}</span> <span className="font-semibold">{p.price}</span>
            </span>
          ))}
        </p>
      )}
      {item.description && <p className="mt-1.5 max-w-[46ch] text-[15px] leading-relaxed text-canopy/75">{item.description}</p>}
    </li>
  );
}
