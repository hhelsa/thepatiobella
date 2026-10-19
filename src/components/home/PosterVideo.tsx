"use client";

import { useRef } from "react";

import { photos, sunsetsVideo, type Clip } from "@/content/home";
import { prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/motion";

/**
 * A muted loop from the restaurant's posts. It plays only while on screen and
 * never with reduced motion; the poster frame stands in otherwise.
 */
export function ClipVideo({ clip, className = "", sizing = "aspect-[9/16]" }: { clip: Clip; className?: string; sizing?: string }) {
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
    <div ref={root} className={`frame relative overflow-hidden bg-canopy ${sizing} ${className}`}>
      <video
        className="frame-media absolute inset-0 size-full object-cover"
        src={clip.src}
        poster={clip.poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={clip.label}
      />
    </div>
  );
}

/** The Catching Sunsets poster, as the restaurant posted it. */
export function PosterVideo({ className = "" }: { className?: string }) {
  return (
    <ClipVideo
      clip={{ src: sunsetsVideo, poster: photos.sunsetsPoster.src, label: photos.sunsetsPoster.alt }}
      className={className}
    />
  );
}
