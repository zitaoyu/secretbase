"use client";

import { Card } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Pokemon, PokemonForm, PokemonSpecies } from "pokedex-promise-v2";
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
  const [speciesData, setSpeciesData] = useState<PokemonSpecies>();
  const [formData, setFormData] = useState<PokemonForm>();

  useEffect(() => {
    myPokedex
      .getPokemonByName(pokemonId)
      .then((response) => {
        setPokemonData(response);
      })
      .catch(() => {
        throw Error("Unable to fetch pokemon details, try again later...");
      });
    myPokedex
      .getSpeciesByName(pokemonId)
      .then((response: PokemonSpecies) => {
        setSpeciesData(response);
      })
      .catch(() => {
        throw Error("Unable to fetch pokemon species data, try again later...");
      });
    myPokedex
      .getFormByName(pokemonId)
      .then((response: PokemonForm) => {
        setFormData(response);
        setIsLoading(false);
      })
      .catch(() => {
        throw Error("Unable to fetch pokemon species data, try again later...");
      });
  }, []);

  if (isLoading || !pokemonData || !speciesData || !formData) {
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
        {/* Pokemon Basic Info Box */}
        <BasicInfoBox
          pokemonData={pokemonData}
          speciesData={speciesData}
          formData={formData}
        />
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
