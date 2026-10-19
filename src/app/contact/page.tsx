import type { Metadata } from "next";

import { instagram, photos, stops } from "@/content/home";
import { CallButton, Frame, RollLink } from "@/components/home/primitives";
import { PageHero } from "@/components/pages/PageHero";
import { PageShell } from "@/components/pages/PageShell";
import { Reveal } from "@/components/pages/Reveal";

export const metadata: Metadata = {
  title: "Contact · The Patio Bella",
  description: "Reserve a table at Patio Bella Arena Mall, Nsambya (0775 852 656) or Patio Bella Lugogo Mall (0794 299 074).",
};

const BRANCH = {
  arena: {
    photo: photos.arenaBar,
    about: "Our Nsambya branch, inside Arena Mall. Call for reservations and deliveries.",
    map: "https://maps.google.com/maps?q=Arena%20Mall%20Nsambya%20Kampala&z=15&output=embed",
  },
  lugogo: {
    photo: photos.lugogoEntrance,
    about: "Our newest branch, inside Lugogo Mall near Kyadondo Rugby Grounds (plus code 8JG4+JR).",
    map: "https://maps.google.com/maps?q=Lugogo%20Mall%20Kampala&z=16&output=embed",
  },
} as const;

export default function ContactPage() {
  // Arena Mall first here: it takes deliveries as well as reservations.
  const ordered = [...stops].sort((a) => (a.id === "arena" ? -1 : 1));
  return (
    <PageShell>
      <PageHero
        title={["Find us,", "book a table."]}
        lede="Reservations are by phone, at either branch."
        photo={photos.arenaHero}
      />

      {ordered.map((stop, i) => {
        const branch = BRANCH[stop.id];
        const dark = i % 2 === 0;
        return (
          <Reveal
            key={stop.id}
            className={`px-[4vw] py-[clamp(6rem,14vh,9rem)] ${dark ? "on-canopy bg-canopy text-light" : "bg-butter text-canopy"}`}
          >
            <article aria-labelledby={`branch-${stop.id}`} className="grid gap-y-12 md:grid-cols-12 md:gap-x-[3vw]">
              <div className={`md:col-span-6 ${i % 2 ? "md:order-2 md:col-start-7" : ""}`}>
                <h2 id={`branch-${stop.id}`} data-split className="display text-[clamp(3rem,6vw,5.5rem)] leading-[0.95]">
                  {stop.name}
                </h2>
                <p className={`mt-3 text-lg ${dark ? "text-light/80" : "text-canopy/80"}`}>
                  {stop.isNew ? "New branch · " : ""}
                  {stop.area}
                </p>
                <p className="mt-6 max-w-[40ch] text-lg leading-relaxed">{branch.about}</p>

                <a href={`tel:${stop.tel}`} className="display mt-10 block w-fit text-[clamp(2.25rem,4vw,3.5rem)] leading-none tabular-nums">
                  {stop.phone}
                </a>
                <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <CallButton stop={stop} tone={dark ? "dark" : "light"}>
                    Call to reserve
                  </CallButton>
                  <RollLink href={stop.directions} label="Get directions" external className="border-b border-current/40 pb-1 text-[15px] font-semibold" />
                </div>
                {stop.note && <p className={`mt-5 text-[15px] ${dark ? "text-light/75" : "text-canopy/75"}`}>{stop.note}</p>}
              </div>

              <div className={`grid gap-[3vw] md:col-span-5 ${i % 2 ? "md:order-1" : "md:col-start-8"}`}>
                <div data-clip>
                  <Frame photo={branch.photo} sizes="(min-width: 768px) 38vw, 92vw" className="aspect-[4/3] rounded-(--radius-frame)" />
                </div>
                <iframe
                  title={`Map showing Patio Bella ${stop.name}`}
                  src={branch.map}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="aspect-[4/3] w-full rounded-(--radius-frame) border-0 grayscale-[0.4]"
                />
              </div>
            </article>
          </Reveal>
        );
      })}

      <Reveal className="bg-butter px-[6vw] py-[clamp(5rem,12vh,8rem)] text-center text-canopy">
        <p data-split className="display mx-auto max-w-[18em] text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.1]">
          For what&rsquo;s cooking, what&rsquo;s on and what&rsquo;s new, follow us on Instagram.
        </p>
        <a
          href={instagram.url}
          target="_blank"
          rel="noreferrer"
          className="fill-btn mt-10 inline-flex min-h-12 items-center bg-canopy px-7 text-[15px] font-semibold text-butter [--fill:var(--color-light)] hover:text-canopy"
        >
          {instagram.handle}
        </a>
      </Reveal>
    </PageShell>
  );
}
