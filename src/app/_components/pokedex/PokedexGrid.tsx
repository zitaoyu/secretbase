"use client";

import React, { useEffect, useState } from "react";
import { PokemonCard } from "./PokemonCard";
import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import { PrimarySpinner } from "../PrimarySpinner";
import { PokemonSimpleData } from "@/app/_lib/api/pokeapi.i";
import myPokedex from "@/app/_lib/api/pokeapi";
import { FaSearch } from "react-icons/fa";
import { PrimaryIconButton } from "../PrimaryIconButton";
import { BsFillGridFill, BsGrid3X3GapFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import { IconType } from "react-icons";
import { Gen } from "@/app/_utils/gen";
import { PokemonType } from "@/app/_types/p-type";
import { isNumber, stringToInt } from "@/app/_utils/format";

type GridType = "regular" | "mini" | "table";
type GenIndex =
  | [0, 1025]
  | [0, 151]
  | [152, 251]
  | [251, 386]
  | [387, 493]
  | [494, 649]
  | [650, 721]
  | [722, 809]
  | [810, 905]
  | [906, 1025];

const defaultIndexFilter: GenIndex = [0, 1025];

interface SearchBarProps {
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
  setIndexFilter: React.Dispatch<React.SetStateAction<GenIndex>>;
  setType1Filter: React.Dispatch<React.SetStateAction<PokemonType | undefined>>;
  setType2Filter: React.Dispatch<React.SetStateAction<PokemonType | undefined>>;
  gridType: GridType;
  setGridType: React.Dispatch<React.SetStateAction<GridType>>;
}

const SearchBar = ({
  setSearchString,
  setIndexFilter,
  setType1Filter,
  setType2Filter,
  gridType,
  setGridType,
}: SearchBarProps) => {
  const [isShowFilters, setIsShowFilters] = useState(false);

  const genSelectorItems: { label: string; value: Gen }[] = [
    {
      label: "Gen I",
      value: "red-blue",
    },
    {
      label: "Gen II",
      value: "crystal",
    },
    {
      label: "Gen III",
      value: "firered-leafgreen",
    },
    {
      label: "Gen IV",
      value: "platinum",
    },
    {
      label: "Gen V",
      value: "black-2-white-2",
    },
    {
      label: "Gen VI",
      value: "omega-ruby-alpha-sapphire",
    },
    {
      label: "Gen VII",
      value: "ultra-sun-ultra-moon",
    },
    {
      label: "Sword & Shield",
      value: "sword-shield",
    },
    {
      label: "Scarlet & Violet",
      value: "scarlet-violet",
    },
  ];

  const genIndexMap: Record<Gen, GenIndex> = {
    "red-blue": [0, 151],
    crystal: [152, 251],
    "firered-leafgreen": [251, 386],
    platinum: [387, 493],
    "black-2-white-2": [494, 649],
    "omega-ruby-alpha-sapphire": [650, 721],
    "ultra-sun-ultra-moon": [722, 809],
    "sword-shield": [810, 905],
    "scarlet-violet": [906, 1025],
  };

  const iconMap: Record<GridType, IconType> = {
    regular: BsGrid3X3GapFill,
    mini: FaListUl,
    table: BsFillGridFill,
  };

  function toggleGrid() {
    if (gridType === "regular") {
      setGridType("mini");
    } else if (gridType === "mini") {
      setGridType("table");
    } else {
      setGridType("regular");
    }
  }

  return (
    <div className="flex w-full flex-col items-center gap-2 sm:h-12 sm:flex-row sm:gap-1">
      <div className="flex w-full flex-grow items-center gap-1">
        {/* Search Bar */}
        <Input
          className="w-full"
          classNames={{
            input: "bg-content1", // input
            inputWrapper: ["bg-content1", "shadow-md"], //outer wrapper
            innerWrapper: "bg-content1",
          }}
          type="search"
          variant="faded"
          placeholder="Search by name or dex number..."
          size="md"
          disableAnimation
          radius="lg"
          startContent={<FaSearch size={20} />}
          onChange={(event) => setSearchString(event.target.value)}
        />
        <PrimaryIconButton
          className="block aspect-square h-full bg-content1 shadow-md sm:hidden"
          size="lg"
          icon={isShowFilters ? MdFilterAltOff : MdFilterAlt}
          onClick={() => setIsShowFilters((prev) => !prev)}
          disableAnimation
        />
      </div>
      <div
        className={`flex h-full w-full items-center gap-1 sm:flex sm:w-auto ${!isShowFilters && "hidden"}`}
      >
        <div className="w-full min-w-40">
          {/* Gen Filter */}
          <Autocomplete
            aria-label="Gen filter"
            defaultItems={genSelectorItems}
            placeholder="Generation"
            className="w-full rounded-xl shadow-md"
            inputProps={{
              classNames: {
                input: "bg-content1",
                inputWrapper: "bg-content1",
              },
            }}
            variant="faded"
            size="sm"
            radius="lg"
            disableAnimation
            onSelectionChange={(key) => {
              if (key === null) {
                setIndexFilter(defaultIndexFilter);
              } else {
                setIndexFilter(genIndexMap[key as Gen]);
              }
            }}
          >
            {(generation) => (
              <AutocompleteItem
                key={generation.value}
                aria-label={generation.label}
              >
                {generation.label}
              </AutocompleteItem>
            )}
          </Autocomplete>
        </div>
        {/* Grid Layout Toggle */}
        <PrimaryIconButton
          className="bg-content1 shadow-md"
          size="lg"
          icon={iconMap[gridType]}
          onClick={toggleGrid}
          disableAnimation
        />
      </div>
    </div>
  );
};

export const PokedexGrid = () => {
  const [pokemonDataList, setPokemonDataList] = useState<PokemonSimpleData[]>(
    [],
  );
  const [filteredList, setFilterList] = useState<PokemonSimpleData[]>([]);
  const [showPokemons, setShowPokemons] = useState<number>(100);
  const [isloading, setIsLoading] = useState<boolean>(true);
  const [searchString, setSearchString] = useState<string>("");
  const [indexFilter, setIndexFilter] = useState<GenIndex>(defaultIndexFilter);
  const [type1filter, setType1Filter] = useState<PokemonType>();
  const [type2filter, setType2Filter] = useState<PokemonType>();
  const [gridType, setGridType] = useState<GridType>("regular");

  const miniGridStyles = `grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12`;
  const regularGridStyles = `grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6`;

  useEffect(() => {
    const data = myPokedex.getBasicPokemonData();
    setPokemonDataList(data);
    setFilterList(data);
    setIndexFilter(defaultIndexFilter);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (showPokemons < 1015) {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [loadMorePokemonCards]);

  useEffect(() => {
    handleFilterList();
  }, [searchString, indexFilter]);

  function loadMorePokemonCards() {
    setShowPokemons((prev) => prev + 50);
  }

  function handleScroll() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (windowHeight + scrollTop >= documentHeight - 200) {
      loadMorePokemonCards();
    }
  }

  function handleFilterList() {
    if (!isloading) {
      let filteredData = pokemonDataList;

      // Type Filtering
      if (type1filter) {
        filteredData = filteredData.filter((pokemon) =>
          pokemon.types.includes(type1filter),
        );
      }
      console.log(filteredData);
      if (type2filter) {
        filteredData = filteredData.filter((pokemon) =>
          pokemon.types.includes(type2filter),
        );
      }
      console.log(filteredData);
      // Name filtering
      if (searchString !== "") {
        if (isNumber(searchString)) {
          filteredData = filteredData.filter(
            (pokemon) => pokemon.id === stringToInt(searchString),
          );
        } else {
          filteredData = filteredData.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchString.toLowerCase()),
          );
        }
      }

      // Generation filtering
      filteredData = filteredData.filter(
        (pokemon) =>
          indexFilter[0] <= pokemon.id && pokemon.id <= indexFilter[1],
      );

      setFilterList(filteredData);
    }
  }

  if (isloading) {
    return (
      <div className="flex h-[70vh] w-full">
        <PrimarySpinner className="m-auto" />
      </div>
    );
  }

  return (
    <div className="p-2 py-4 sm:px-4">
      <SearchBar
        setSearchString={setSearchString}
        setIndexFilter={setIndexFilter}
        setType1Filter={setType1Filter}
        setType2Filter={setType2Filter}
        gridType={gridType}
        setGridType={setGridType}
      />
      <div
        className={`
                grid w-full justify-center gap-4 py-4
                ${gridType === "mini" ? miniGridStyles : regularGridStyles}
                `}
      >
        {filteredList
          ?.slice(0, showPokemons)
          .map((pokemonData) => (
            <PokemonCard
              key={pokemonData.id}
              data={pokemonData}
              isMini={gridType === "mini"}
            />
          ))}
      </div>
    </div>
  );
};
