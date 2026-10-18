import Image from "next/image";

import { instagram } from "@/content/home";

export function SiteFooter() {
  return (
    <footer
      data-ground="canopy"
      className="flex flex-col gap-8 border-t border-light/15 px-[4vw] pt-12 pb-[calc(3rem+env(safe-area-inset-bottom))] text-light md:flex-row md:items-center md:justify-between"
    >
      <div className="flex items-center gap-4">
        <Image
          src="/images/patio-bella/brand/logo-on-black.jpg"
          alt="The Patio Bella"
          width={56}
          height={56}
          className="size-14 rounded-full"
        />
        <p className="text-light/80">#WhereWeAllComeTogether</p>
      </div>
      <a className="link-draw w-fit font-semibold text-gold" href={instagram.url} target="_blank" rel="noreferrer">
        Instagram {instagram.handle}
      </a>
      <p className="max-w-[44ch] text-sm text-light/60">
        A website concept. Details are taken from Patio Bella&rsquo;s own posts and are to be
        confirmed with the restaurant.
      </p>
    </footer>
  );
}
