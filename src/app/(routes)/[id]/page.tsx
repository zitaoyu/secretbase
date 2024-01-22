"use client";

import { Card } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Pokemon, PokemonType } from "pokedex-promise-v2";
import { capitalizeFirstLetter } from "@/app/_utils/format";
import { PokemonTypeBoxes } from "@/app/_components/PokemonTypeBox";
import { PrimarySpinner } from "@/app/_components/PrimarySpinner";
import { NavMenu } from "@/app/_components/PokemonPage/NavMenu";
import { BasicInfoBox } from "@/app/_components/PokemonPage/BasicInfoBox";
import { SpriteGallery } from "@/app/_components/PokemonPage/SpriteGallery";
import UnknownPokemonSprite from "../../_assets/unknown_pokemon.png";
import { MovesTable } from "@/app/_components/PokemonPage/MovesTable";
import myPokedex from "@/app/_lib/api/pokeapi";
import { StatsTable } from "@/app/_components/PokemonPage/StatsTable";
import { ScrollToTop } from "@/app/_components/ScrollToTop";

export default function PokemonPage() {
  const { id } = useParams();
  const pokemonId: string = Array.isArray(id) ? id[0] : id;
  const pokemonIdInt: number = parseInt(pokemonId, 10);
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState<Pokemon>();
  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    myPokedex
      .getPokemonByName(pokemonId)
      .then((response) => {
        setPokemonData(response);
        const types: string[] = [];
        response.types.map((value: PokemonType) => {
          types.push(value.type.name);
        });
        setTypes(types);
        setIsLoading(false);
      })
      .catch((error) => {
        throw Error("Unable to fetch pokemon details, try again later...");
      });
  }, []);

  if (isLoading) {
    return (
      <Card className="h-screen w-full rounded-none p-4">
        <PrimarySpinner className="m-auto" />
      </Card>
    );
  }

  return (
    <Card className="flex h-full w-full min-w-80 flex-col items-center gap-10 rounded-none p-4">
      <ScrollToTop />
      {/* Nav Menu */}
      <NavMenu id={pokemonIdInt} />
      {/* Pokemon Info */}
      <div className="flex w-full flex-col items-center">
        {/* Pokemon Image */}
        <SpriteGallery
          imageUrl={
            pokemonData?.sprites.versions["generation-v"]["black-white"]
              .animated.front_default ||
            pokemonData?.sprites.front_default ||
            UnknownPokemonSprite.src
          }
        />

        <div className="mb-4 flex w-full flex-col items-center gap-4">
          {/* Pokmeon Name */}
          <p className="-mb-2 text-2xl font-semibold">
            {capitalizeFirstLetter(pokemonData?.name || "")}
          </p>
          {/* Pokemon types */}
          <PokemonTypeBoxes types={types} size="lg" />
          {/* Pokemon Basic Info Box */}
          <BasicInfoBox pokemonData={pokemonData} />
        </div>
      </div>
      <StatsTable statsData={pokemonData?.stats || []} />
      {/* Moves Table */}
      <MovesTable
        title="Level Up Moves"
        movesData={pokemonData?.moves}
        method="level-up"
      />
      <MovesTable
        title="TM Moves"
        movesData={pokemonData?.moves}
        method="machine"
      />
    </Card>
  );
}
