import type { Metadata } from "next";

import { photos } from "@/content/home";
import { Frame, RollLink } from "@/components/home/primitives";
import { PageHero } from "@/components/pages/PageHero";
import { PageShell } from "@/components/pages/PageShell";
import { Reveal } from "@/components/pages/Reveal";

export const metadata: Metadata = {
  title: "About · The Patio Bella",
  description: "Patio Bella is a restaurant, café and cocktail bar with two branches in Kampala: Arena Mall, Nsambya, and the new Lugogo Mall.",
};

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        title={["Where we all", "come together."]}
        lede="A restaurant, café and cocktail bar with two branches in Kampala."
        photo={photos.arenaSunsetDinner}
      />

      <Reveal className="bg-butter px-[6vw] py-[clamp(7rem,20vh,12rem)] text-center text-canopy">
        <p data-split className="display mx-auto max-w-[22em] text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[1.15]">
          Patio Bella is for long breakfasts, lunch meetings, coffee to go, and evenings that turn into
          cocktails. Two branches, one table: Arena Mall in Nsambya, and our newest at Lugogo Mall.
        </p>
      </Reveal>

      {/* Arena Mall */}
      <Reveal className="on-canopy bg-canopy px-[4vw] py-[clamp(6rem,16vh,10rem)] text-light">
        <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-[3vw]">
          <div className="lg:col-span-5">
            <h2 data-split className="display text-[clamp(3rem,6vw,5.5rem)] leading-[0.95]">
              <span className="block">Arena Mall,</span>
              <span className="block">Nsambya.</span>
            </h2>
            <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-light/85">
              Our Nsambya branch sits under a ceiling of hanging leaves and woven rattan lanterns, with
              green velvet chairs, a copper-arched bar, and the city beyond the glass.
            </p>
          </div>
        </div>
        <div data-scrub className="mt-14 overflow-hidden rounded-(--radius-frame)">
          <Frame photo={photos.arenaHero} sizes="92vw" className="aspect-[16/10] md:aspect-[21/10]" />
        </div>
        <div className="mt-[3vw] grid gap-[3vw] md:grid-cols-12">
          <div data-clip className="md:col-span-7">
            <Frame photo={photos.arenaBar} sizes="(min-width: 768px) 56vw, 92vw" className="aspect-[7/4] rounded-(--radius-frame)" />
          </div>
          <div data-drift="14" className="md:col-span-5 md:mt-[12vh]">
            <div data-clip>
              <Frame photo={photos.arenaSunsetDinner} sizes="(min-width: 768px) 38vw, 92vw" className="aspect-[3/2] rounded-(--radius-frame)" />
            </div>
            <p className="mt-4 text-[15px] text-light/75">Sunset dinners by the windows.</p>
          </div>
        </div>
      </Reveal>

      {/* Lugogo Mall */}
      <Reveal className="bg-butter px-[4vw] py-[clamp(6rem,16vh,10rem)] text-canopy">
        <div className="grid items-end gap-y-10 lg:grid-cols-12 lg:gap-x-[3vw]">
          <div className="lg:col-span-6">
            <h2 data-split className="display text-[clamp(3rem,6vw,5.5rem)] leading-[0.95]">
              <span className="block">Lugogo Mall,</span>
              <span className="block">our newest.</span>
            </h2>
          </div>
          <p className="max-w-[40ch] text-lg leading-relaxed lg:col-span-5 lg:col-start-8">
            Our newest branch, near Kyadondo Rugby Grounds: butter-yellow walls, painted leaves, and
            glass walls looking out onto the palms.
          </p>
        </div>
        <div className="mt-14 grid gap-[3vw] md:grid-cols-12">
          <div data-clip className="md:col-span-7">
            <Frame photo={photos.lugogoDaylight} sizes="(min-width: 768px) 56vw, 92vw" className="aspect-[4/5] rounded-(--radius-frame) md:aspect-[5/6]" />
          </div>
          <div className="grid content-start gap-[3vw] md:col-span-5">
            <div data-drift="10" data-clip>
              <Frame photo={photos.lugogoEntrance} sizes="(min-width: 768px) 38vw, 92vw" className="aspect-[4/5] rounded-(--radius-frame)" />
            </div>
            <div data-clip className="w-[70%]">
              <Frame photo={photos.lugogoStaircase} sizes="(min-width: 768px) 26vw, 64vw" className="aspect-[3/4] rounded-(--radius-frame)" />
            </div>
          </div>
        </div>
      </Reveal>

      {/* Kitchen and art */}
      <Reveal className="on-canopy bg-canopy px-[4vw] py-[clamp(6rem,16vh,10rem)] text-light">
        <div className="grid items-center gap-y-12 md:grid-cols-12 md:gap-x-[3vw]">
          <div data-clip className="md:col-span-5">
            <Frame photo={photos.chefPizza} sizes="(min-width: 768px) 38vw, 92vw" className="aspect-[4/5] rounded-(--radius-frame)" />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <h2 data-split className="display text-[clamp(2.5rem,4.8vw,4.5rem)] leading-[1]">
              From scratch to your table.
            </h2>
            <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-light/85">
              Every bite is worth the wait: freshly prepared, full of flavour, and cooked to order in our
              kitchens.
            </p>
            <div className="mt-8">
              <RollLink href="/menu" label="View the menu" className="border-b border-light/40 pb-1 text-[15px] font-semibold" />
            </div>
          </div>
        </div>

        <div className="mt-[clamp(6rem,16vh,10rem)] grid items-center gap-y-12 md:grid-cols-12 md:gap-x-[3vw]">
          <figure className="md:col-span-6 md:col-start-2">
            <blockquote>
              <p data-split className="display text-[clamp(2.25rem,4.2vw,4rem)] leading-[1.05]">
                More than décor, every piece tells a story.
              </p>
            </blockquote>
            <figcaption className="mt-5 text-light/75">The Art at Patio Bella</figcaption>
          </figure>
          <div data-clip className="md:col-span-4 md:col-start-9">
            <Frame photo={photos.artWall} sizes="(min-width: 768px) 30vw, 80vw" className="aspect-square rounded-(--radius-frame)" />
          </div>
        </div>
      </Reveal>
    </PageShell>
  );
}
