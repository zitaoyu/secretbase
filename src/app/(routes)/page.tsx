import { Pokedex } from "../_components/pokedex/Pokedex";
import { ScrollToTopButton } from "../_components/pokedex/ScrollToTopButton";
import nationalDex from "../_services/national-pokedex-service";

export default function Home() {
  return (
    <section className="mx-auto max-w-7xl">
      <Pokedex game={"main"} />
      <ScrollToTopButton />
    </section>
  );
}
