import { Pokedex } from "../_components/pokedex/Pokedex";
import { ScrollToTopButton } from "../_components/pokedex/ScrollToTopButton";

export default function Home() {
  return (
    <div className="h-full w-full">
      <Pokedex />
      <ScrollToTopButton />
    </div>
  );
}
