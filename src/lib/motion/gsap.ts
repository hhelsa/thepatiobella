/**
 * Single entry point for GSAP. Import everything animation-related from
 * "@/lib/motion" (never directly from "gsap/*") so plugins are always
 * registered exactly once, before first use, with the project defaults.
 */
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

import { DURATION, EASE } from "./tokens";

gsap.registerPlugin(useGSAP, ScrollTrigger, Flip, SplitText);

gsap.defaults({ ease: EASE.out, duration: DURATION.base });

if (typeof window !== "undefined") {
  // Mobile browsers resize the viewport when the address bar shows/hides;
  // recalculating every trigger on that is janky and unnecessary.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, Flip, ScrollTrigger, SplitText, useGSAP };
