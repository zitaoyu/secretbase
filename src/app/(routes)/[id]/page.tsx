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
import { PokemonSimpleData } from "@/app/_lib/api/pokeapi.interface";
import { PokemonCard } from "@/app/_components/pokedex/PokemonCard";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

const PokedexSidePanel = () => {
  const [pokemonDataList, setPokemonDataList] = useState<PokemonSimpleData[]>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const data = myPokedex.getBasicPokemonData();
    setPokemonDataList(data);
  }, []);

  return (
    <div
      className={`fixed left-0 top-0 z-50 h-screen w-9/12 transition duration-400 ease-in-out lg:w-1/3 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div
        className={`h-screen w-full overflow-y-scroll rounded-r-xl bg-content1 p-2`}
      >
        <button
          className="absolute left-full top-1/2 h-20 w-10 rounded-r-xl border-b-2 border-r-2 border-t-2 border-default bg-content1"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? (
            <MdKeyboardDoubleArrowLeft size={32} />
          ) : (
            <MdKeyboardDoubleArrowRight size={32} />
          )}
        </button>
        <h1 className="pb-4 text-center text-xl">Pokedex</h1>
        {pokemonDataList ? (
          <div className="grid grid-cols-5 gap-2">
            {pokemonDataList.map((pokemon) => (
              <PokemonCard key={pokemon.id} data={pokemon} isMini />
            ))}
          </div>
        ) : (
          <PrimarySpinner />
        )}
      </div>
    </div>
  );
};

export default function PokemonPage() {
  const { id } = useParams();
  const pokemonId: string = Array.isArray(id) ? id[0] : id;
  const pokemonIdInt: number = parseInt(pokemonId, 10);
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState<Pokemon>();
  const [speciesData, setSpeciesData] = useState<PokemonSpecies>();
  const [formData, setFormData] = useState<PokemonForm>();
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(false);

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
    <div className="relative min-h-screen w-full">
      {/* overlay */}
      {/* <div className="fixed left-0 top-0 z-50 h-screen w-screen" /> */}
      <PokedexSidePanel />

      <Card className="mx-auto h-full min-h-screen w-full min-w-80 max-w-7xl rounded-none p-4">
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
    </div>
  );
}
