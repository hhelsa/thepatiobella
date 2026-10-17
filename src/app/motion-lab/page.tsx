import type { Metadata } from "next";

import { MotionLab } from "@/components/motion-lab/MotionLab";

export const metadata: Metadata = {
  title: "Motion lab · The Patio Bella",
  robots: { index: false, follow: false },
};

/**
 * Internal test bench for the GSAP foundation. Not part of the site; remove
 * or keep behind noindex once the real pages exist.
 */
export default function MotionLabPage() {
  return <MotionLab />;
}
