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
import { IconType } from "react-icons";
import { Gen } from "@/app/_utils/gen";

const defaultIndexFilter: [number, number] = [0, 1025];

type GridType = "regular" | "mini" | "table";

interface SearchBarProps {
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
  setIndexFilter: React.Dispatch<React.SetStateAction<[number, number]>>;
  gridType: GridType;
  setGridType: React.Dispatch<React.SetStateAction<GridType>>;
}

const SearchBar = ({
  setSearchString,
  setIndexFilter,
  gridType,
  setGridType,
}: SearchBarProps) => {
  const generations: { label: string; value: Gen }[] = [
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

  const genIndexMap: Record<Gen, [number, number]> = {
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
    <div className="flex h-12 items-center gap-1">
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
        placeholder="Search by pokemon name..."
        size="sm"
        disableAnimation
        radius="lg"
        startContent={<FaSearch size={20} />}
        onChange={(event) => setSearchString(event.target.value)}
      />
      {/* Gen Filter */}
      <Autocomplete
        aria-label="Gen filter"
        defaultItems={generations}
        placeholder="Generation"
        className="max-w-36 rounded-xl shadow-md sm:max-w-48"
        // classNames={{ clearButton: "hidden" }}
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
      {/* Grid Layout Toggle */}
      <PrimaryIconButton
        className="aspect-square h-full w-12 bg-content1 shadow-md"
        icon={iconMap[gridType]}
        onClick={toggleGrid}
      />
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
  const [indexFilter, setIndexFilter] =
    useState<[number, number]>(defaultIndexFilter);
  const [gridType, setGridType] = useState<GridType>("regular");

  useEffect(() => {
    const data = myPokedex.getBasicPokemonData();
    setPokemonDataList(data);
    setFilterList(data);
    setIndexFilter([0, data.length]);
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
    let filteredData = pokemonDataList;

    filteredData = filteredData.filter(
      (pokemon) => indexFilter[0] <= pokemon.id && pokemon.id <= indexFilter[1],
    );

    if (searchString !== "") {
      filteredData = filteredData.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchString.toLowerCase()),
      );
    }
    setFilterList(filteredData);
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
        gridType={gridType}
        setGridType={setGridType}
      />
      <div
        className={`
                grid w-full justify-center gap-4 py-4
                ${
                  gridType === "mini"
                    ? `                    
                    grid-cols-4
                    sm:grid-cols-6 
                    md:grid-cols-8
                    lg:grid-cols-10 
                    xl:grid-cols-12
                    `
                    : `                
                    grid-cols-2
                    sm:grid-cols-3 
                    md:grid-cols-4
                    lg:grid-cols-5 
                    xl:grid-cols-6
                    `
                }
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
