import { CallBar } from "@/components/home/CallBar";
import { Closing } from "@/components/home/Closing";
import { GroundBackdrop } from "@/components/home/GroundBackdrop";
import { Header } from "@/components/home/Header";
import { Hero } from "@/components/home/Hero";
import { Midday } from "@/components/home/Midday";
import { Morning } from "@/components/home/Morning";
import { Night } from "@/components/home/Night";
import { SiteFooter } from "@/components/home/SiteFooter";
import { Sunset } from "@/components/home/Sunset";

/**
 * One day at Patio Bella, in the light of its two rooms:
 * Lugogo morning → midday → sunset at Arena Mall → night.
 * Direction: docs/PATIO-BELLA-ART-DIRECTION.md, section 4.
 */
export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <Morning />
        <Midday />
        <Sunset />
        <Night />
        <CallBar />
        <Closing />
      </main>
      <SiteFooter />
      {/* Last, so its triggers measure the sunset pin (see component). */}
      <GroundBackdrop />
    </>
  );
}
