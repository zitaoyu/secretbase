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
import myPokedex from "@/app/_services/pokeapi";
import { StatsTable } from "@/app/_components/PokemonPage/StatsTable";
import { ScrollToTop } from "@/app/_components/ScrollToTop";
import { EvolutionTable } from "@/app/_components/PokemonPage/EvolutionTable";
import { extractIdFromUrl } from "@/app/_utils/format";
import { ResistanceTable } from "@/app/_components/PokemonPage/ResistanceTable";
import { PokemonType } from "@/app/_types/pokemon.type";
import { PokemonSimpleData } from "@/app/_services/models/PokemonSimpleData";
import { PokemonCard } from "@/app/_components/pokedex/PokemonCard";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import WrapperProps from "@/app/_components/Wrapper";
import useScrollPosition from "@/app/_hooks/useScrollPosition";
import useScreenSize from "@/app/_hooks/useScreenSize";

interface SidePanelProps extends WrapperProps {
  isLeft?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

const SidePanel = ({
  children,
  isLeft = true,
  onOpen = () => {},
  onClose = () => {},
}: SidePanelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  function openPanel() {
    setIsOpen((prev) => !prev);
    onOpen();
  }

  function closePanel() {
    setIsOpen(false);
    onClose();
  }

  return (
    <div
      className={`fixed top-0 z-50 flex h-screen w-10/12 max-w-lg transition duration-700 ease-in-out md:w-1/2
                  ${isOpen ? "translate-x-0" : "-translate-x-full"}
                  ${isLeft ? "left-0" : "left-full"}
                  `}
    >
      {/* Overlay */}
      <div
        className={`fixed left-0 top-0 h-screen w-screen ${isOpen ? "block" : "hidden"}`}
        onClick={closePanel}
      />
      {/* Toggle Button */}
      <button
        className={`${isOpen ? "opacity-100" : "opacity-60 sm:opacity-100"} absolute left-full top-[20%] z-40 h-20 -translate-y-1/2 rounded-r-xl border-b-2 border-r-2 border-t-2 border-default-400 bg-content1 sm:top-1/2 `}
        onClick={() => (isOpen ? closePanel() : openPanel())}
      >
        <div className="flex flex-col items-center px-1">
          {!isOpen && <div className="hidden sm:block">Pokedex</div>}
          <div>
            {isOpen ? (
              <MdKeyboardDoubleArrowLeft size={32} />
            ) : (
              <MdKeyboardDoubleArrowRight size={32} />
            )}
          </div>
        </div>
      </button>
      <div className="z-50 h-screen w-full border-r-2 border-default-400 bg-content1">
        {children}
      </div>
    </div>
  );
};

const PokedexSidePanel = () => {
  const [pokemonData, setPokemonData] = useState<PokemonSimpleData[]>();
  const [isShowOverlay, setIsShowOverlay] = useState(false);

  function onOpen() {
    const data = myPokedex.getBasicPokemonData();
    setPokemonData(data);
    setIsShowOverlay(true);
  }

  function onClose() {
    setPokemonData([]);
    setIsShowOverlay(false);
  }

  return (
    <div>
      <div
        className={`fixed left-0 top-0 z-40 h-screen bg-black opacity-20
                    ${isShowOverlay ? " w-screen" : "w-0"}
                    `}
      />
      <SidePanel onOpen={onOpen} onClose={onClose}>
        {pokemonData ? (
          <div className="grid h-full w-full grid-cols-4 gap-2 overflow-y-scroll p-4 lg:grid-cols-5">
            {pokemonData.map((pokemon) => (
              <PokemonCard key={pokemon.id} data={pokemon} isMini />
            ))}
          </div>
        ) : (
          <PrimarySpinner />
        )}
      </SidePanel>
    </div>
  );
};

export default function PokemonPage() {
  const { id } = useParams();
  const { scrollY } = useScrollPosition();
  const { size } = useScreenSize();

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
    <div className="relative min-h-screen w-full">
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
