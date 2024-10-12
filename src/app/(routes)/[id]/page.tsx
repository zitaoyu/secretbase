"use client";

import { Card } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PrimarySpinner } from "@/app/_components/PrimarySpinner";
import { NavMenu } from "@/app/_components/PokemonPage/NavMenu";
import { BasicInfoBox } from "@/app/_components/PokemonPage/BasicInfoBox";
import { SpriteGallery } from "@/app/_components/PokemonPage/SpriteGallery";

import { MovesTable } from "@/app/_components/PokemonPage/MovesTable";
import myPokedex from "@/app/_services/pokeapi";
import { StatsTable } from "@/app/_components/PokemonPage/StatsTable";
import { ScrollToTop } from "@/app/_components/ScrollToTop";
import { EvolutionTable } from "@/app/_components/PokemonPage/EvolutionTable";
import { ResistanceTable } from "@/app/_components/PokemonPage/ResistanceTable";
import { PokedexSidePanel } from "@/app/_components/PokemonPage/PokedexSidePanel";
import { PokemonType } from "@/app/_types/pokemon.type";
import { PokemonFullData } from "@/app/_services/models/PokemonFullData";
import useScrollPosition from "@/app/_hooks/useScrollPosition";
import useScreenSize from "@/app/_hooks/useScreenSize";
import UnknownPokemonSprite from "../../_assets/unknown_pokemon.png";

export default function PokemonPage() {
  const { id } = useParams();
  const { scrollY } = useScrollPosition();
  const { size } = useScreenSize();

  const pokemonId: string = Array.isArray(id) ? id[0] : id;
  const pokemonIdInt: number = parseInt(pokemonId, 10);
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonFullData, setPokemonFullData] = useState<PokemonFullData>();

  useEffect(() => {
    setIsLoading(true);

    myPokedex
      .getPokemonData(pokemonId)
      .then((fullData) => {
        setPokemonFullData(fullData);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        throw Error("Unable to fetch pokemon details, try again later...");
      });
  }, [pokemonId]);

  return (
    <div className="relative min-h-screen w-full">
      <PokedexSidePanel />
      <Card className="mx-auto h-full min-h-screen w-full min-w-80 max-w-7xl rounded-none p-4">
        <ScrollToTop />
        {/* Display info after data is fully loaded */}
        {isLoading || !pokemonFullData ? (
          <PrimarySpinner className="m-auto" />
        ) : (
          <div className="flex flex-col items-center gap-10">
            {/* Nav Menu */}
            <NavMenu
              prevPokeapiId={pokemonFullData.pageData.prevPokeapiId}
              nextPokeapiId={pokemonFullData.pageData.nextPokeapiId}
              dexId={pokemonFullData.simpleData.id}
            />
            {/* Pokemon Info */}
            <div className="mt-6 flex w-full flex-col items-center">
              {/* Pokemon Image */}
              <SpriteGallery
                imageUrl={
                  pokemonFullData.simpleData?.animatedSpriteUrl ||
                  pokemonFullData.simpleData.spriteUrl ||
                  UnknownPokemonSprite.src
                }
                size="lg"
              />
              {/* Pokemon Basic Info Box */}
              <BasicInfoBox
                pokemonData={pokemonFullData.pokemon}
                speciesData={pokemonFullData.species}
                formData={pokemonFullData.form}
              />
            </div>
            <ResistanceTable
              types={pokemonFullData.pokemon.types.map(
                (type) => type.type.name as PokemonType,
              )}
            />
            <StatsTable statsData={pokemonFullData.pokemon.stats || []} />
            <EvolutionTable speciesData={pokemonFullData.species} />
            {/* Moves Table */}
            <MovesTable
              title="Level Up Moves"
              movesData={pokemonFullData.pokemon?.moves}
              method="level-up"
            />
            <MovesTable
              title="TM Moves"
              movesData={pokemonFullData.pokemon?.moves}
              method="machine"
            />
          </div>
        )}
      </Card>
    </div>
  );
}
