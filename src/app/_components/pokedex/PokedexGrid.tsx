"use client";

import React, { useEffect, useState } from "react";
import { PokemonCard } from "./PokemonCard";
import { PokemonSimpleData } from "@/app/_services/models/PokemonSimpleData";
import { Game } from "@/app/_services/pokedex-mapping";

interface PokedexGridProps {
  pokemonData: PokemonSimpleData[];
  showPokemons: number;
  isMini: boolean;
  showShiny: boolean;
  game: Game;
}

export const PokedexGrid = ({
  pokemonData,
  showPokemons,
  isMini,
  showShiny,
  game = "main",
}: PokedexGridProps) => {
  const miniGridStyles = `grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12`;
  const regularGridStyles = `grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6`;

  return (
    <div
      className={`grid w-full justify-center gap-4 ${isMini ? miniGridStyles : regularGridStyles}`}
    >
      {pokemonData
        ?.slice(0, showPokemons)
        .map((pokemon) => (
          <PokemonCard
            key={pokemon.pokeapiId}
            data={pokemon}
            isMini={isMini}
            showShiny={showShiny}
            game={game}
          />
        ))}
    </div>
  );
};
