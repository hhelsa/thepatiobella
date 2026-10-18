import Image from "next/image";

import type { Photo } from "@/content/home";

export type ApertureShape = "ring" | "arch" | "plate";

const SHAPES: Record<ApertureShape, string> = {
  ring: "aspect-square rounded-full",
  // Round-topped frame taken from Lugogo's arched doorways.
  arch: "aspect-[3/4] rounded-t-[999px] rounded-b-plate",
  plate: "rounded-plate",
};

type ApertureProps = {
  photo: Photo;
  shape: ApertureShape;
  /** `sizes` for next/image: match the frame's rendered width. */
  sizes: string;
  className?: string;
  /** Aspect ratio for plates, e.g. "aspect-[4/5]". Rings and arches fix their own. */
  aspect?: string;
  preload?: boolean;
};

/**
 * A shaped frame for photography. Photos never run full-bleed: the source
 * images are Instagram-sized, and framed they stay sharp. The inner
 * `.aperture-media` layer is what motion scales or drifts, so the frame
 * itself never moves out of its layout box.
 */
export function Aperture({
  photo,
  shape,
  sizes,
  className = "",
  aspect = "",
  preload = false,
}: ApertureProps) {
  return (
    <div
      className={`relative isolate overflow-hidden bg-canopy/20 ${SHAPES[shape]} ${aspect} ${className}`}
    >
      <div className="aperture-media absolute inset-0">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          preload={preload}
          className="object-cover"
          style={{ objectPosition: photo.position ?? "50% 50%" }}
        />
      </div>
    </div>
  );
}
