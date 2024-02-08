import { Pokedex } from "../_components/pokedex/Pokedex";
import { ScrollToTopButton } from "../_components/pokedex/ScrollToTopButton";

export default function Home() {
  return (
    <section className="mx-auto max-w-7xl">
      <Pokedex />
      <ScrollToTopButton />
    </section>
  );
}
