import { Bar } from "@/components/home/Bar";
import { Finale } from "@/components/home/Finale";
import { FoodDrink } from "@/components/home/FoodDrink";
import { Header } from "@/components/home/Header";
import { Hero } from "@/components/home/Hero";
import { Reel } from "@/components/home/Reel";
import { Rooms } from "@/components/home/Rooms";
import { Statement } from "@/components/home/Statement";
import { Visit } from "@/components/home/Visit";
import { WhatsOn } from "@/components/home/WhatsOn";

/**
 * The Patio Bella homepage: an opening that opens onto the Arena canopy,
 * the two rooms in a sentence, food and drink travelling past, the two rooms
 * in one pinned scene, what happens there, how to book, and a single close.
 */
export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <Statement />
        <FoodDrink />
        <Reel />
        <Rooms />
        <Bar />
        <WhatsOn />
        <Visit />
        <Finale />
      </main>
    </>
  );
}
