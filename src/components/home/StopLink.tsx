import type { Stop } from "@/content/home";

type Variant = "bar" | "compact" | "panel" | "large";

/**
 * One location's reservation action: the whole block is a single tel: link.
 * Lugogo carries a NEW tag as the newly opened branch.
 */
export function StopLink({ stop, variant }: { stop: Stop; variant: Variant }) {
  const label = `Call Patio Bella ${stop.place} to reserve, ${stop.phone}`;

  if (variant === "compact") {
    return (
      <a
        href={`tel:${stop.tel}`}
        aria-label={label}
        className="flex min-h-12 flex-col justify-center px-5 py-2 text-light active:bg-white/10"
      >
        <span className="font-display text-xl leading-none">{stop.name}</span>
        <span className="mt-1 text-[13px] font-semibold text-gold">Call to reserve</span>
      </a>
    );
  }

  if (variant === "large") {
    return (
      <div className="flex flex-col gap-6 border-t border-light/20 pt-8">
        <div className="flex items-baseline gap-4">
          <h3 className="font-display text-5xl leading-none md:text-6xl">{stop.name}</h3>
          {stop.isNew && <NewTag />}
        </div>
        <p className="text-sm font-semibold tracking-[0.08em] text-light/75 uppercase">
          {stop.id === "arena" ? `Arena Mall, ${stop.place}` : stop.place}
        </p>
        <a
          href={`tel:${stop.tel}`}
          aria-label={label}
          className="group inline-flex w-fit items-center gap-5 rounded-full bg-gold py-3 pr-3 pl-7 text-canopy transition-colors hover:bg-light"
        >
          <span className="text-2xl font-semibold tabular-nums md:text-3xl">{stop.phone}</span>
          <span className="rounded-full bg-canopy px-4 py-2 text-sm font-semibold text-light transition-transform duration-300 group-hover:translate-x-0.5">
            Call to reserve
          </span>
        </a>
        <p className="flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
          <a className="link-draw font-semibold" href={stop.directions} target="_blank" rel="noreferrer">
            Get directions
          </a>
          {stop.note && <span className="text-light/75">{stop.note}</span>}
        </p>
      </div>
    );
  }

  if (variant === "panel") {
    return (
      <a
        href={`tel:${stop.tel}`}
        aria-label={label}
        className="group grid grid-cols-[1fr_auto] items-center gap-x-4 rounded-plate px-4 py-3.5 text-light transition-colors hover:bg-white/5"
      >
        <span className="flex items-center gap-3">
          <span className="font-display text-[28px] leading-none">{stop.name}</span>
          {stop.isNew && <NewTag />}
        </span>
        <span className="row-span-2 rounded-full bg-gold px-4 py-2.5 text-sm font-bold whitespace-nowrap text-canopy transition-transform duration-300 group-hover:translate-x-0.5">
          Call
        </span>
        <span className="mt-1.5 text-[15px] text-light/75">
          {stop.place} · <span className="font-semibold text-light tabular-nums">{stop.phone}</span>
        </span>
      </a>
    );
  }

  // "bar" sits on canopy along the bottom of the hero.
  return (
    <a
      href={`tel:${stop.tel}`}
      aria-label={label}
      className="group flex h-full items-center gap-4 px-[4vw] text-light transition-colors hover:bg-white/5"
    >
      <span className="font-display text-[28px] leading-none whitespace-nowrap">{stop.name}</span>
      {stop.isNew && <NewTag />}
      <span className="hidden text-sm font-semibold tracking-[0.06em] text-light/75 lg:inline">
        {stop.place}
      </span>
      <span className="ml-auto text-lg font-semibold whitespace-nowrap tabular-nums xl:text-xl">{stop.phone}</span>
      <span className="rounded-full bg-gold px-4 py-2.5 text-sm font-bold whitespace-nowrap text-canopy transition-transform duration-300 group-hover:translate-x-0.5">
        Call<span className="hidden lg:inline"> to reserve</span>
      </span>
    </a>
  );
}

function NewTag() {
  return (
    <span className="rounded-full bg-amber px-2.5 py-1 text-xs font-bold tracking-[0.08em] text-canopy uppercase">
      New
    </span>
  );
}
