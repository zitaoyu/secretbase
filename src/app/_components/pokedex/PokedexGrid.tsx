"use client";

import React, { useEffect, useState } from "react";
import { PokemonCard } from "./PokemonCard";
import { Input } from "@nextui-org/react";
import { PrimarySpinner } from "../PrimarySpinner";
import { PokemonSimpleData } from "@/app/_lib/api/pokeapi.i";
import myPokedex from "@/app/_lib/api/pokeapi";
import { FaSearch } from "react-icons/fa";
import { PrimaryIconButton } from "../PrimaryIconButton";
import { BsFillGridFill, BsGrid3X3GapFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { IconType } from "react-icons";

type GridType = "regular" | "mini" | "table";

interface SearchBarProps {
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
  gridType: GridType;
  setGridType: React.Dispatch<React.SetStateAction<GridType>>;
}

const SearchBar = ({
  setSearchString,
  gridType,
  setGridType,
}: SearchBarProps) => {
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
      <Input
        onChange={(event) => setSearchString(event.target.value)}
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
      />
      <PrimaryIconButton
        className="h-full w-12 shadow-md"
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
  const [gridType, setGridType] = useState<GridType>("regular");

  useEffect(() => {
    const data = myPokedex.getBasicPokemonData();
    setPokemonDataList(data);
    setFilterList(data);
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
  }, [searchString]);

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
    if (searchString !== "") {
      const filteredData = pokemonDataList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchString.toLowerCase()),
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
        gridType={gridType}
        setGridType={setGridType}
      />
      <div
        className={`
                grid w-full grid-cols-2 justify-center gap-4
                py-4
                sm:grid-cols-3 
                md:grid-cols-4
                lg:grid-cols-5 
                xl:grid-cols-6
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
