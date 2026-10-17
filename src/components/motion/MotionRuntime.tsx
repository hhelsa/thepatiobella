"use client";

import { Suspense, useEffect } from "react";
import { usePathname } from "next/navigation";

import { ScrollTrigger } from "@/lib/motion";

/**
 * Recalculates ScrollTrigger positions after client-side navigation, once
 * the new page has painted. Page components own their own triggers; this
 * only keeps start/end values correct when document height changes.
 */
function RouteRefresh() {
  const pathname = usePathname();

  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}

/** Global motion housekeeping. Rendered once in the root layout. */
export function MotionRuntime() {
  useEffect(() => {
    let active = true;
    // Web fonts change text metrics, and therefore trigger positions.
    document.fonts?.ready.then(() => {
      if (active) ScrollTrigger.refresh();
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <Suspense fallback={null}>
      <RouteRefresh />
    </Suspense>
  );
}
