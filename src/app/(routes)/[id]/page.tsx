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
import { EvolutionTable } from "@/app/_components/PokemonPage/EvolutionTable";
import { extractIdFromUrl } from "@/app/_utils/format";
import { ResistanceTable } from "@/app/_components/PokemonPage/ResistanceTable";
import { PokemonType } from "@/app/_types/pokemon.type";

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
      .then((pokemonData: Pokemon) => {
        setPokemonData(pokemonData);
        const speciesId = extractIdFromUrl(pokemonData.species.url);
        myPokedex
          .getSpeciesByName(speciesId)
          .then((speciesData: PokemonSpecies) => {
            setSpeciesData(speciesData);
          })
          .catch(() => {
            throw Error(
              "Unable to fetch pokemon species data, try again later...",
            );
          });
        myPokedex
          .getFormByName(pokemonData.forms[0].name)
          .then((formData: PokemonForm) => {
            setFormData(formData);
            setIsLoading(false);
          })
          .catch(() => {
            throw Error(
              "Unable to fetch pokemon species data, try again later...",
            );
          });
      })
      .catch(() => {
        throw Error("Unable to fetch pokemon details, try again later...");
      });
  }, []);

  return (
    <Card className="h-full min-h-screen w-full min-w-80 rounded-none p-4">
      <ScrollToTop />
      {/* Nav Menu */}
      <NavMenu id={pokemonIdInt} dexId={speciesData?.id} />
      {/* Display info after data is fully loaded */}
      {isLoading || !pokemonData || !speciesData || !formData ? (
        <PrimarySpinner className="m-auto" />
      ) : (
        <div className="flex flex-col items-center gap-10">
          {/* Pokemon Info */}
          <div className="mt-6 flex w-full flex-col items-center">
            {/* Pokemon Image */}
            <SpriteGallery
              imageUrl={
                pokemonData?.sprites.versions["generation-v"]["black-white"]
                  .animated.front_default ||
                pokemonData?.sprites.front_default ||
                UnknownPokemonSprite.src
              }
              size="lg"
            />
            {/* Pokemon Basic Info Box */}
            <BasicInfoBox
              pokemonData={pokemonData}
              speciesData={speciesData}
              formData={formData}
            />
          </div>
          <ResistanceTable
            types={pokemonData.types.map(
              (type) => type.type.name as PokemonType,
            )}
          />
          <StatsTable statsData={pokemonData.stats || []} />
          <EvolutionTable speciesData={speciesData} />
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
        </div>
      )}
    </Card>
  );
}
