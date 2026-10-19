import type { Metadata } from "next";

import { instagram, photos, programmes } from "@/content/home";
import { PosterVideo } from "@/components/home/PosterVideo";
import { Frame, RollLink } from "@/components/home/primitives";
import { PageHero } from "@/components/pages/PageHero";
import { PageShell } from "@/components/pages/PageShell";
import { Reveal } from "@/components/pages/Reveal";

export const metadata: Metadata = {
  title: "What’s on · The Patio Bella",
  description:
    "Henna Fridays: buy a meal, get your henna free. Catching Sunsets at Bella every Sunday at Arena Mall with AHundred and Fifi: buy a cocktail, get one free.",
};

const [henna, sunsets] = programmes;

export default function WhatsOnPage() {
  return (
    <PageShell>
      <PageHero
        title={["What’s on"]}
        lede="Fridays with henna, Sundays with the band. Every week at Patio Bella."
        photo={photos.arenaBar}
      />

      {/* Henna Fridays */}
      <Reveal className="bg-butter px-[4vw] py-[clamp(6rem,16vh,10rem)] text-canopy">
        <p aria-hidden className="display text-[clamp(5rem,18vw,16rem)] leading-[0.8] text-canopy/10">
          Fridays
        </p>
        <div className="mt-[-0.6em] grid items-start gap-y-12 md:grid-cols-12 md:gap-x-[3vw]">
          <div className="md:col-span-6">
            <h2 data-split className="display text-[clamp(3rem,6vw,5.5rem)] leading-[0.95]">
              {henna.title}
            </h2>
            <p className="mt-6 max-w-[40ch] text-lg leading-relaxed">{henna.text}</p>
            <p className="display mt-10 border-y border-canopy/25 py-6 text-[clamp(1.75rem,2.8vw,2.5rem)] leading-tight">
              {henna.offer}
            </p>
            <p className="mt-5 text-[15px] text-canopy/75">{henna.where}, every Friday.</p>
          </div>
          <div data-clip className="md:col-span-5 md:col-start-8">
            <Frame photo={photos.henna} sizes="(min-width: 768px) 38vw, 92vw" className="aspect-[4/5] rounded-(--radius-frame)" />
          </div>
        </div>
      </Reveal>

      {/* Catching Sunsets */}
      <Reveal className="on-canopy bg-canopy px-[4vw] py-[clamp(6rem,16vh,10rem)] text-light">
        <p aria-hidden className="display text-right text-[clamp(5rem,18vw,16rem)] leading-[0.8] text-light/10">
          Sundays
        </p>
        <div className="mt-[-0.6em] grid items-start gap-y-12 md:grid-cols-12 md:gap-x-[3vw]">
          <div className="md:col-span-4 md:col-start-2">
            <PosterVideo className="w-full rounded-(--radius-frame)" />
            <p className="mt-4 text-[15px] text-light/70">The poster, as posted by Patio Bella.</p>
          </div>
          <div className="md:col-span-6 md:col-start-7 md:pt-[8vh]">
            <h2 data-split className="display text-[clamp(3rem,6vw,5.5rem)] leading-[0.95]">
              {sunsets.title}
            </h2>
            <p className="mt-6 text-lg font-medium text-gold">Featuring AHundred and Fifi, every Sunday</p>
            <p className="mt-4 max-w-[40ch] text-lg leading-relaxed text-light/85">{sunsets.text}</p>
            <p className="display mt-10 border-y border-light/20 py-6 text-[clamp(1.75rem,2.8vw,2.5rem)] leading-tight text-gold">
              {sunsets.offer}
            </p>
            <p className="mt-5 text-[15px] text-light/75">Arena Mall, Nsambya</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href={`tel:${sunsets.rsvp!.tel}`}
                className="fill-btn inline-flex min-h-12 items-center bg-gold px-6 text-[15px] font-semibold text-canopy [--fill:var(--color-light)]"
              >
                RSVP {sunsets.rsvp!.phone}
              </a>
            </div>
          </div>
        </div>
        <div data-scrub className="mt-[clamp(5rem,12vh,8rem)] overflow-hidden rounded-(--radius-frame)">
          <Frame photo={photos.arenaSunsetDinner} sizes="92vw" className="aspect-[16/10] md:aspect-[21/9]" />
        </div>
        <p className="mt-10 text-center text-lg">
          For what&rsquo;s coming up, follow{" "}
          <RollLink href={instagram.url} label={instagram.handle} external className="align-bottom font-semibold text-gold" />
        </p>
      </Reveal>
    </PageShell>
  );
}
