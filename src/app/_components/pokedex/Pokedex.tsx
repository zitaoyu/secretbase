"use client";

import React, { useEffect, useState } from "react";
import { PrimarySpinner } from "../PrimarySpinner";
import { PokemonSimpleData } from "@/app/_lib/api/pokeapi.interface";
import myPokedex from "@/app/_lib/api/pokeapi";
import { PokemonType } from "@/app/_types/pokemon.type";
import { isNumber, stringToInt } from "@/app/_utils/format";
import { GridType, defaultGenIndexFilter, genIndexMap } from "./Pokedex.type";
import { PokedexFilter } from "./PokedexFilter";
import { PokedexGrid } from "./PokedexGrid";
import { PokedexTableGrid } from "./PokedexTableGrid";
import { Gen } from "@/app/_utils/gen";

export const Pokedex = () => {
  const [pokemonDataList, setPokemonDataList] = useState<PokemonSimpleData[]>(
    [],
  );
  const [filteredList, setFilterList] = useState<PokemonSimpleData[]>([]);
  const [showPokemons, setShowPokemons] = useState<number>(100);
  const [isloading, setIsLoading] = useState<boolean>(true);
  const [searchString, setSearchString] = useState<string>("");
  const [genFilter, setGenFilter] = useState<Gen | null>(null);
  const [type1filter, setType1Filter] = useState<PokemonType | null>(null);
  const [type2filter, setType2Filter] = useState<PokemonType | null>(null);
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
  }, [searchString, genFilter, type1filter, type2filter]);

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

      if (type2filter) {
        filteredData = filteredData.filter((pokemon) =>
          pokemon.types.includes(type2filter),
        );
      }

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
      let indexFilter = defaultGenIndexFilter;
      if (genFilter) {
        indexFilter = genIndexMap[genFilter];
      }
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
    <div className="flex flex-col items-center gap-4 p-2 sm:p-4 lg:p-6">
      <PokedexFilter
        setSearchString={setSearchString}
        setGenFilter={setGenFilter}
        setType1Filter={setType1Filter}
        setType2Filter={setType2Filter}
        gridType={gridType}
        setGridType={setGridType}
      />
      {gridType === "table" ? (
        <PokedexTableGrid
          pokemonData={filteredList}
          showPokemons={showPokemons}
        />
      ) : (
        <PokedexGrid
          pokemonData={filteredList}
          showPokemons={showPokemons}
          isMini={gridType === "mini"}
        />
      )}
    </div>
  );
};
