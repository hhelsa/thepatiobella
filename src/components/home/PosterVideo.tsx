"use client";

import { useRef } from "react";

import { photos, sunsetsVideo } from "@/content/home";
import { prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/motion";

/**
 * The Catching Sunsets poster, as the restaurant posted it (a short muted
 * loop). It plays only while on screen and never with reduced motion; the
 * poster frame stands in otherwise.
 */
export function PosterVideo({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const video = root.current?.querySelector("video");
      if (!video || prefersReducedMotion()) return;
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          if (self.isActive) void video.play().catch(() => {});
          else video.pause();
        },
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={`relative aspect-[9/16] overflow-hidden bg-canopy ${className}`}>
      <video
        className="absolute inset-0 size-full object-cover"
        src={sunsetsVideo}
        poster={photos.sunsetsPoster.src}
        muted
        loop
        playsInline
        preload="none"
        aria-label={photos.sunsetsPoster.alt}
      />
    </div>
  );
}
