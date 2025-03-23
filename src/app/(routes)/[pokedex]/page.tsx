"use client";
import { useParams } from "next/navigation";
import { Pokedex } from "../../_components/pokedex/Pokedex";
import { ScrollToTopButton } from "../../_components/pokedex/ScrollToTopButton";
import { Game } from "@/app/_types/game.type";

const validGames: Game[] = ["main", "seaglass"];

export default function Home() {
  const { pokedex } = useParams();
  const game = pokedex as Game;
  const isValidGame = validGames.includes(game);

  if (!isValidGame) {
    return <div className="w-full text-center">Invalid Game</div>;
  }

  return (
    <section className="mx-auto max-w-7xl">
      <Pokedex game={game} />
      <ScrollToTopButton />
    </section>
  );
}
