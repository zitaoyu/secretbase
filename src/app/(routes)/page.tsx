import { PrimaryNavBar } from "../_components/PrimaryNavBar";
import { PokedexGrid } from "../_components/PokedexGrid";

export default function Home() {
  return (
    <main className="min-h-screen">
      <PrimaryNavBar />
      <PokedexGrid />
    </main>
  );
}
