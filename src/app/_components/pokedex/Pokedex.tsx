"use client";

import React, { useEffect, useState } from "react";
import { PrimarySpinner } from "../PrimarySpinner";
import { PokemonSimpleData } from "@/app/_services/models/PokemonSimpleData";
import { PokemonType } from "@/app/_types/pokemon.type";
import { isNumber, stringToInt } from "@/app/_utils/format";
import { GridType, defaultGenIndexFilter, genIndexMap } from "./Pokedex.type";
import { PokedexFilter } from "./PokedexFilter";
import { PokedexGrid } from "./PokedexGrid";
import { PokedexTableGrid } from "./PokedexTableGrid";
import { Gen } from "@/app/_types/gen.type";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Game } from "@/app/_types/game.type";
import { pokedexMap } from "@/app/_utils/pokedex-mapping";

interface PokedexProps {
  game: Game;
}

export const Pokedex = ({ game }: PokedexProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
  const [showShiny, setShowShiny] = useState<boolean>(false);

  useEffect(() => {
    loadQueryParams();
    const data = pokedexMap[game].getAllPokemonSimpleData();
    setPokemonDataList(data);
    setFilterList(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (showPokemons < pokemonDataList.length) {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [loadMorePokemonCards]);

  useEffect(() => {
    handleFilterList();
  }, [searchString, genFilter, type1filter, type2filter, gridType, showShiny]);

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
      updateQueryParams();
    }
  }

  function loadQueryParams() {
    const search = searchParams.get("search") as PokemonType;
    if (search) {
      setSearchString(search);
    }
    const type1 = searchParams.get("type1") as PokemonType;
    if (type1) {
      setType1Filter(type1);
    }
    const type2 = searchParams.get("type2") as PokemonType;
    if (type2) {
      setType1Filter(type2);
    }
    const gen = searchParams.get("gen") as Gen;
    if (gen) {
      setGenFilter(gen);
    }
    const grid = searchParams.get("grid") as GridType;
    if (grid) {
      setGridType(grid);
    }
    const shiny = searchParams.get("shiny");
    if (shiny) {
      setShowShiny(true);
    }
  }

  function updateQueryParams() {
    const params = new URLSearchParams();
    if (searchString !== "") {
      params.set("search", searchString);
    }
    if (type1filter) {
      params.set("type1", type1filter);
    }
    if (type2filter) {
      params.set("type2", type2filter);
    }
    if (genFilter) {
      params.set("gen", genFilter);
    }
    if (gridType !== "regular") {
      params.set("grid", gridType);
    }
    if (showShiny) {
      params.set("shiny", "1");
    }
    router.push(pathname + "?" + params.toString());
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
        searchString={searchString}
        setSearchString={setSearchString}
        genFilter={genFilter}
        setGenFilter={setGenFilter}
        type1Filter={type1filter}
        setType1Filter={setType1Filter}
        type2Filter={type2filter}
        setType2Filter={setType2Filter}
        gridType={gridType}
        setGridType={setGridType}
        showShiny={showShiny}
        setShowShiny={setShowShiny}
      />
      {gridType === "table" ? (
        <PokedexTableGrid
          pokemonData={filteredList}
          showPokemons={showPokemons}
          showShiny={showShiny}
          game={game}
        />
      ) : (
        <PokedexGrid
          pokemonData={filteredList}
          showPokemons={showPokemons}
          isMini={gridType === "mini"}
          showShiny={showShiny}
        />
      )}
    </div>
  );
};
