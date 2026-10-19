"use client";

import { useRef, type ReactNode } from "react";

import { batchReveal, clipReveal, gsap, responsive, scrubMedia, splitReveal, useGSAP } from "@/lib/motion";

/**
 * Declarative scroll motion for the inner pages, using the homepage's
 * vocabulary. Inside the wrapper, mark elements with:
 *
 * - `data-split`: masked line reveal for headings
 * - `data-clip`: photo frame opens from below (its `.frame-media` settles)
 * - `data-scrub`: photo scales and drifts with the scroll
 * - `data-batch`: staggered entrance for list items
 * - `data-drift="<n>"`: element travels n% of its height against the scroll
 *
 * Everything is visible without JavaScript and with reduced motion.
 */
export function Reveal({ children, className = "", as: Tag = "div" }: { children: ReactNode; className?: string; as?: "div" | "section" }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      responsive(({ reduceMotion, isMobile }) => {
        if (reduceMotion) return;
        const q = gsap.utils.selector(root);

        q("[data-split]").forEach((el: Element) =>
          splitReveal(el, { scrollTrigger: { trigger: el, start: "top 86%" } }),
        );
        q("[data-clip]").forEach((el: Element) =>
          clipReveal(el, {
            from: "bottom",
            media: el.querySelector(".frame-media") ?? undefined,
            scrollTrigger: { trigger: el, start: "top 82%" },
          }),
        );
        q("[data-scrub]").forEach((el: Element) =>
          scrubMedia(el, el.querySelector(".frame-media")!, { scale: isMobile ? [1.12, 1] : [1.25, 1], drift: 5 }),
        );
        const batch = q("[data-batch]");
        if (batch.length) batchReveal(batch, { y: 26 });
        if (!isMobile) {
          q("[data-drift]").forEach((el: Element) =>
            gsap.to(el, {
              yPercent: -Number((el as HTMLElement).dataset.drift || 10),
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            }),
          );
        }
      });
    },
    { scope: root },
  );

  return (
    <Tag ref={root} className={className}>
      {children}
    </Tag>
  );
}
