"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { instagram, nav, stops } from "@/content/home";
import {
  EASE,
  gsap,
  insetTo,
  prefersReducedMotion,
  ScrollTrigger,
  setInset,
  useFlip,
  useGSAP,
} from "@/lib/motion";

import { RollLink } from "./primitives";

/**
 * Fixed header. Solid canopy by default (so it reads over every section
 * without JavaScript); while the hero is in view it turns transparent over
 * the photograph. Reserve opens a two-room chooser; on phones, Menu opens a
 * full-screen index.
 */
export function Header() {
  const root = useRef<HTMLElement>(null);
  const [reserveOpen, setReserveOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const capture = useFlip(root, "[data-flip-id]", [reserveOpen], {
    duration: 0.6,
    ease: EASE.outStrong,
    absolute: false,
    nested: false,
  });

  const toggleReserve = (next: boolean) => {
    capture();
    setReserveOpen(next);
  };

  useGSAP(
    () => {
      const header = root.current!;
      const hero = document.getElementById("top");
      if (!hero) return;
      const st = ScrollTrigger.create({
        trigger: hero,
        start: "top bottom",
        end: () => `bottom top+=${header.offsetHeight}`,
        onToggle: (self) => header.toggleAttribute("data-over-hero", self.isActive),
      });
      header.toggleAttribute("data-over-hero", st.isActive || window.scrollY < hero.offsetHeight - header.offsetHeight);
    },
    { scope: root },
  );

  // Reserve chooser: Escape and outside clicks close it.
  useEffect(() => {
    if (!reserveOpen) return;
    const panel = root.current?.querySelector<HTMLElement>("[data-reserve-panel]");
    panel?.querySelector<HTMLElement>("a")?.focus();
    const close = () => {
      capture();
      setReserveOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        requestAnimationFrame(() =>
          root.current?.querySelector<HTMLElement>("[data-reserve-toggle]")?.focus(),
        );
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!panel?.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
    // capture is a fresh closure each render with the same behaviour.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reserveOpen]);

  return (
    <header
      ref={root}
      data-site-header
      className="group/header fixed inset-x-0 top-0 z-50 h-(--header-h) text-light"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-canopy transition-opacity duration-700 group-data-[over-hero]/header:opacity-0"
      />
      <div data-intro className="header-inner relative flex h-full items-center gap-10 px-[4vw]">
        <a href="#top" className="shrink-0 rounded-full" aria-label="The Patio Bella, back to top">
          <Image
            src="/images/patio-bella/brand/logo-on-black.jpg"
            alt=""
            width={44}
            height={44}
            loading="eager"
            className="size-11 rounded-full"
          />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex gap-9 text-[15px] font-medium">
            {nav.map((item) => (
              <li key={item.href}>
                <RollLink href={item.href} label={item.label} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <div className="relative">
            {reserveOpen ? (
              <div
                data-flip-id="reserve"
                data-reserve-panel
                role="dialog"
                aria-label="Call to reserve"
                className="absolute top-[-16px] right-0 w-[min(92vw,400px)] bg-butter p-2 text-canopy shadow-[0_24px_48px_-16px_rgb(16_35_12/0.5)]"
              >
                <div className="flex items-baseline justify-between px-4 pt-3 pb-2">
                  <p className="display text-2xl">Call to reserve</p>
                  <button
                    type="button"
                    onClick={() => toggleReserve(false)}
                    className="px-2 py-1 text-sm font-medium underline-offset-4 hover:underline"
                  >
                    Close
                  </button>
                </div>
                <ul>
                  {stops.map((stop) => (
                    <li key={stop.id} className="border-t border-canopy/15">
                      <a
                        href={`tel:${stop.tel}`}
                        aria-label={`Call Patio Bella ${stop.name} to reserve, ${stop.phone}`}
                        className="group flex items-center justify-between gap-4 px-4 py-4 transition-colors hover:bg-canopy hover:text-butter"
                      >
                        <span>
                          <span className="display block text-[28px] leading-none">
                            {stop.name}
                            {stop.isNew && (
                              <span className="ml-2 align-middle font-sans text-[11px] font-semibold tracking-[0.14em] uppercase">
                                New
                              </span>
                            )}
                          </span>
                          <span className="mt-1.5 block text-[15px] tabular-nums opacity-80">{stop.phone}</span>
                        </span>
                        <span className="text-sm font-semibold transition-transform duration-500 group-hover:translate-x-1">
                          Call
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <button
                type="button"
                data-flip-id="reserve"
                data-reserve-toggle
                aria-expanded={reserveOpen}
                onClick={() => toggleReserve(true)}
                className="fill-btn min-h-11 bg-butter px-5 text-[15px] font-semibold text-canopy [--fill:var(--color-light)]"
              >
                Reserve
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            className="min-h-11 px-2 text-[15px] font-medium lg:hidden"
          >
            Menu
          </button>
        </div>
      </div>

      {menuOpen && <MenuOverlay onClose={() => setMenuOpen(false)} />}
    </header>
  );
}

/** Phones and tablets: the site index, full screen. */
function MenuOverlay({ onClose }: { onClose: () => void }) {
  const root = useRef<HTMLDivElement>(null);

  const closeRef = useRef<() => void>(onClose);

  useGSAP(
    (_, contextSafe) => {
      closeRef.current = contextSafe!(() => {
        if (prefersReducedMotion()) return onClose();
        insetTo(root.current!, [0, 0, 100, 0], { duration: 0.55, ease: EASE.inOut, onComplete: onClose });
      });
      if (prefersReducedMotion()) return;
      setInset(root.current!, [0, 0, 100, 0]);
      gsap
        .timeline({ defaults: { ease: EASE.outStrong } })
        .add(insetTo(root.current!, [0, 0, 0, 0], { duration: 0.7, ease: EASE.cinematic }))
        .from(".menu-link", { yPercent: 110, duration: 0.9, stagger: 0.06 }, 0.3)
        .from(".menu-foot", { autoAlpha: 0, y: 12, duration: 0.6 }, 0.6);
    },
    { scope: root },
  );

  const close = () => closeRef.current();

  // On open: focus the first link and stop the page scrolling behind.
  useEffect(() => {
    root.current?.querySelector<HTMLElement>("a")?.focus();
    const overflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = overflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeRef.current();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      ref={root}
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="on-canopy fixed inset-0 z-[60] flex flex-col bg-canopy px-[6vw] pt-6 pb-[calc(2rem+env(safe-area-inset-bottom))] text-light"
    >
      <div className="flex justify-end">
        <button type="button" onClick={close} className="min-h-11 px-2 text-[15px] font-medium">
          Close
        </button>
      </div>
      <nav aria-label="Menu" className="mt-[8vh]">
        <ul className="flex flex-col gap-2">
          {nav.map((item) => (
            <li key={item.href} className="overflow-hidden">
              <a href={item.href} onClick={close} className="menu-link display block text-[clamp(2.75rem,11vw,4.5rem)] leading-[1.05]">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="menu-foot mt-auto grid gap-5 border-t border-light/20 pt-6 text-[15px]">
        {stops.map((stop) => (
          <a key={stop.id} href={`tel:${stop.tel}`} className="flex justify-between gap-4">
            <span>{stop.name}</span>
            <span className="tabular-nums text-gold">{stop.phone}</span>
          </a>
        ))}
        <a href={instagram.url} target="_blank" rel="noreferrer" className="text-light/75">
          Instagram {instagram.handle}
        </a>
      </div>
    </div>
  );
}
