import { Pokedex } from "@/app/_components/pokedex/Pokedex";
import { ScrollToTopButton } from "@/app/_components/pokedex/ScrollToTopButton";
import SeaglassPokedex from "@/app/_services/seaglass-pokedex-service";

export default function SeaglassPokedexPage() {
  return (
    <section className="mx-auto max-w-7xl">
      <Pokedex game={"seaglass"} />
      <ScrollToTopButton />
    </section>
  );
}
