import type { Metadata } from "next";

import { photos } from "@/content/home";
import { MenuBook } from "@/components/pages/MenuBook";
import { PageHero } from "@/components/pages/PageHero";
import { PageShell } from "@/components/pages/PageShell";

export const metadata: Metadata = {
  title: "Menu · The Patio Bella",
  description: "The Patio Bella menu: breakfast, starters, mains, pizza, pasta, burgers, desserts, coffee, nojitos, juices, smoothies and milkshakes.",
};

export default function MenuPage() {
  return (
    <PageShell>
      <PageHero
        title={["The menu"]}
        lede="Breakfast to dinner, coffee to nojitos, served at both of our Kampala branches."
        photo={photos.arenaTable}
      >
        <div className="flex flex-wrap gap-3">
          <a href="#food" className="fill-btn inline-flex min-h-12 items-center bg-gold px-6 text-[15px] font-semibold text-canopy [--fill:var(--color-light)]">
            Food
          </a>
          <a href="#drinks" className="fill-btn inline-flex min-h-12 items-center border border-light/60 px-6 text-[15px] font-semibold text-light [--fill:var(--color-light)] hover:text-canopy">
            Drinks
          </a>
        </div>
      </PageHero>
      <MenuBook />
    </PageShell>
  );
}
