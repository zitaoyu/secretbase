import { ScrollToTopButton } from "../_components/Pokedex/ScrollToTopButton";
import { Pokedex } from "../_components/pokedex/Pokedex";

export default function Home() {
  return (
    <div className="h-full w-full">
      <Pokedex />
      <ScrollToTopButton />
    </div>
  );
}
