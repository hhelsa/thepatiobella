"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { dayparts, stops } from "@/content/home";
import { EASE, useFlip } from "@/lib/motion";

import { StopLink } from "./StopLink";

const NAV = [
  { href: "#lugogo", label: "Lugogo" },
  { href: "#arena", label: "Arena Mall" },
  { href: "#day", label: "The day" },
  { href: "#rituals", label: "Rituals" },
];

/**
 * Sticky header. Its ground and ink follow the page's time of day through
 * the --ground-now / --ink-now variables GroundBackdrop maintains; without
 * JavaScript it stays butter and canopy, which reads on every section.
 */
export function Header() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const capture = useFlip(root, "[data-flip-id]", [open], {
    duration: 0.55,
    ease: EASE.outStrong,
    absolute: false,
    nested: false,
  });

  const toggle = (next: boolean) => {
    capture();
    setOpen(next);
  };

  // Close on Escape or an outside click; move focus into the panel on open.
  useEffect(() => {
    if (!open) return;
    const panel = root.current?.querySelector<HTMLElement>("[data-reserve-panel]");
    panel?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        capture();
        setOpen(false);
        root.current?.querySelector<HTMLElement>("[data-reserve-toggle]")?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!panel?.contains(e.target as Node)) {
        capture();
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
    // capture is stable in behaviour; re-binding on each render is unnecessary.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <header
      ref={root}
      className="sticky top-0 z-50 h-(--header-h) bg-(--ground-now) text-(--ink-now)"
    >
      <div className="mx-auto flex h-full items-center gap-8 px-[4vw]">
        <a href="#top" className="shrink-0 rounded-full" aria-label="The Patio Bella, back to top">
          <Image
            src="/images/patio-bella/brand/logo-on-black.jpg"
            alt=""
            width={48}
            height={48}
            loading="eager"
            className="size-12 rounded-full"
          />
        </a>

        <nav aria-label="Sections" className="hidden md:block">
          <ul className="flex gap-7 text-[15px] font-semibold tracking-[0.04em]">
            {NAV.map((item) => (
              <li key={item.href}>
                <a className="link-draw" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <DayIndicator />

        <div className="relative ml-auto flex justify-end">
          {open ? (
            <div
              data-flip-id="reserve"
              data-reserve-panel
              className="absolute top-[-14px] right-0 w-[min(92vw,420px)] overflow-hidden rounded-[22px] bg-canopy p-3 text-light shadow-[0_18px_40px_-12px_rgb(16_35_12/0.45)]"
            >
              <div className="flex items-center justify-between px-4 pt-2 pb-3">
                <p className="font-display text-2xl">Call to reserve</p>
                <button
                  type="button"
                  onClick={() => toggle(false)}
                  className="rounded-full px-3 py-1.5 text-sm font-semibold text-light/80 hover:text-light"
                >
                  Close
                </button>
              </div>
              <ul className="flex flex-col gap-1">
                {stops.map((stop) => (
                  <li key={stop.id}>
                    <StopLink stop={stop} variant="panel" />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <button
              type="button"
              data-flip-id="reserve"
              data-reserve-toggle
              aria-expanded={open}
              onClick={() => toggle(true)}
              className="rounded-full bg-(--ink-now) px-6 py-3 text-[15px] font-semibold text-(--ground-now) transition-colors duration-700"
            >
              Reserve
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

/** Where the visitor is in the page's day. Driven by html[data-daypart]. */
function DayIndicator() {
  return (
    <ol
      aria-hidden
      className="day-indicator relative hidden items-center gap-5 text-xs font-semibold tracking-[0.12em] uppercase xl:flex"
    >
      {dayparts.map((part) => (
        <li key={part} data-part={part} className="opacity-45 transition-opacity duration-500">
          {part}
        </li>
      ))}
    </ol>
  );
}
