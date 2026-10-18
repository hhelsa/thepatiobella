"use client";

import { useRef } from "react";

import { mains, photos } from "@/content/home";
import { batchReveal, clipReveal, responsive, scrubMedia, splitReveal, useGSAP } from "@/lib/motion";

import { Aperture } from "./Aperture";

export function Midday() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      responsive(({ reduceMotion, isMobile }) => {
        if (reduceMotion) return;

        splitReveal(".midday-title", {
          scrollTrigger: { trigger: ".midday-title", start: "top 85%" },
        });

        // The table's centrepiece: the cheese-pull settles as it scrolls through.
        const pizza = root.current?.querySelector<HTMLElement>(".pizza-frame");
        if (pizza) {
          scrubMedia(pizza, pizza.querySelector(".aperture-media")!, {
            scale: isMobile ? [1.15, 1] : [1.3, 1],
            drift: isMobile ? 3 : 5,
          });
        }

        clipReveal(".chef-frame", {
          from: "bottom",
          media: ".chef-frame .aperture-media",
          scrollTrigger: { trigger: ".chef-frame", start: "top 85%" },
        });
        clipReveal(".sweet-frame", {
          from: "circle",
          media: ".sweet-frame .aperture-media",
          scrollTrigger: { trigger: ".sweet-frame", start: "top 85%" },
        });
        batchReveal(".mains-item", { y: 28 });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="day"
      data-ground="amber"
      data-daypart="Midday"
      aria-labelledby="midday-title"
      className="px-[4vw] pt-[clamp(6rem,14vh,10rem)] pb-[clamp(6rem,16vh,12rem)]"
    >
      <h2
        id="midday-title"
        className="midday-title max-w-[14ch] font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] tracking-[-0.025em]"
      >
        Midday, at the table.
      </h2>

      <div className="mt-[clamp(3rem,8vh,6rem)] grid grid-cols-1 gap-y-12 md:grid-cols-12 md:gap-x-[3vw]">
        <div className="md:col-span-7">
          <div className="pizza-frame overflow-hidden rounded-plate">
            <Aperture
              photo={photos.pizzaPull}
              shape="plate"
              aspect="aspect-[4/5] md:aspect-[5/6]"
              sizes="(min-width: 768px) 56vw, 92vw"
            />
          </div>
          <div className="mt-12 flex items-end gap-6 md:mt-16 md:ml-[18%]">
            <div className="sweet-frame w-[42%] shrink-0">
              <Aperture photo={photos.cheesecake} shape="ring" sizes="(min-width: 768px) 14vw, 40vw" />
            </div>
            <p className="pb-4 font-display text-2xl leading-tight">And something sweet to finish.</p>
          </div>
        </div>

        <div className="flex flex-col md:col-span-5 md:pt-[16vh]">
          <div className="chef-frame w-[70%] self-end md:w-[78%]">
            <Aperture
              photo={photos.chefPizza}
              shape="plate"
              aspect="aspect-[3/4]"
              sizes="(min-width: 768px) 30vw, 70vw"
            />
          </div>

          <p className="mt-12 max-w-[34ch] text-lg leading-relaxed">
            Burgers stacked high, pizza straight from the oven, and plates worth slowing down for.
            A few you&rsquo;ll find on the table:
          </p>
          <ul className="mt-6 border-t border-canopy/30">
            {mains.map((item) => (
              <li
                key={item}
                className="mains-item border-b border-canopy/30 py-3.5 font-display text-[clamp(1.5rem,2.4vw,2.125rem)] leading-tight"
              >
                {item}
              </li>
            ))}
          </ul>

        </div>
      </div>
    </section>
  );
}
