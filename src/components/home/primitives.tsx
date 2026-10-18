import Image from "next/image";
import type { ReactNode } from "react";

import type { Photo, Stop } from "@/content/home";

type FrameProps = {
  photo: Photo;
  /** `sizes` for next/image: match the frame's rendered width. */
  sizes: string;
  className?: string;
  preload?: boolean;
  /** Load immediately even if hidden or off-screen (the opening stack). */
  eager?: boolean;
  /** Extra classes on the inner media layer (e.g. a static crop zoom). */
  mediaClassName?: string;
};

/**
 * A photograph in a rectangular frame. The outer element is what motion
 * clips; the inner `.frame-media` layer is what it scales or drifts, so the
 * frame never leaves its layout box.
 */
export function Frame({
  photo,
  sizes,
  className = "",
  preload = false,
  eager = false,
  mediaClassName = "",
}: FrameProps) {
  return (
    <div
      className={`frame isolate overflow-hidden bg-canopy/30 ${/\babsolute\b/.test(className) ? "" : "relative"} ${className}`}
    >
      <div className={`frame-media absolute inset-0 ${mediaClassName}`}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          preload={preload}
          {...(eager && !preload ? { loading: "eager" as const } : {})}
          className="object-cover"
          style={{ objectPosition: photo.position ?? "50% 50%", scale: photo.zoom }}
        />
      </div>
    </div>
  );
}

/** Text link whose label rolls up on hover. */
export function RollLink({
  href,
  label,
  className = "",
  external = false,
}: {
  href: string;
  label: string;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className={`roll ${className}`}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <span data-label={label}>{label}</span>
    </a>
  );
}

/**
 * Primary action: call a location. `tone` picks the ground it sits on.
 * The fill sweeps in on hover; the label stays legible in both states.
 */
export function CallButton({
  stop,
  tone,
  children,
  className = "",
}: {
  stop: Stop;
  tone: "light" | "dark";
  children?: ReactNode;
  className?: string;
}) {
  const styles =
    tone === "dark"
      ? "bg-butter text-canopy [--fill:var(--color-light)]"
      : "bg-canopy text-butter [--fill:var(--color-lantern)] hover:text-light";
  return (
    <a
      href={`tel:${stop.tel}`}
      aria-label={`Call Patio Bella ${stop.name} to reserve, ${stop.phone}`}
      className={`fill-btn inline-flex min-h-12 items-center gap-3 px-6 text-[15px] font-semibold tracking-[0.01em] transition-colors duration-500 ${styles} ${className}`}
    >
      {children ?? (
        <>
          Call {stop.name} <span className="tabular-nums opacity-80">{stop.phone}</span>
        </>
      )}
    </a>
  );
}
