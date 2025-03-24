"use client";
import { useParams } from "next/navigation";
import { Pokedex } from "../../_components/pokedex/Pokedex";
import { ScrollToTopButton } from "../../_components/pokedex/ScrollToTopButton";
import { Game } from "@/app/_types/game.type";
import { Alert } from "@heroui/react";
import { useState } from "react";
import { MdCatchingPokemon } from "react-icons/md";

const validGames: Game[] = ["main", "seaglass", "lazarus"];

export default function Home() {
  const [isVisible, setIsVisible] = useState(true);
  const { pokedex } = useParams();
  const game = pokedex as Game;
  const isValidGame = validGames.includes(game);

  if (!isValidGame) {
    return <div className="w-full text-center">Invalid Game</div>;
  }

  return (
    <section className="mx-auto max-w-7xl">
      {pokedex === "lazarus" && (
        <div className="mx-2 sm:mx-6 sm:mt-4">
          <Alert
            icon={<MdCatchingPokemon size={36} />}
            color="primary"
            title={"From Machamp Contruction Inc."}
            description={
              "Lazarus Pokedex is under construction, new pokemon will be added soon..."
            }
            variant="faded"
            isVisible={isVisible}
            onClose={() => {
              setIsVisible(false);
            }}
          />
        </div>
      )}
      <Pokedex game={game} />
      <ScrollToTopButton />
    </section>
  );
}
