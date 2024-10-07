import { Pokedex } from "../_components/Pokedex/Pokedex";
import { ScrollToTopButton } from "../_components/Pokedex/ScrollToTopButton";

export default function Home() {
  return (
    <section className="mx-auto max-w-7xl">
      <Pokedex />
      <ScrollToTopButton />
    </section>
  );
}
