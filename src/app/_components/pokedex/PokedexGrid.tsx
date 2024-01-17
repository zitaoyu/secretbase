"use client";

import React, { useEffect, useState } from "react";
import { PokemonCard } from "./PokemonCard";
import { Input } from "@nextui-org/react";
import { PrimarySpinner } from "../PrimarySpinner";
import { PokemonSimpleData } from "@/app/_lib/api/pokeapi.i";
import myPokedex from "@/app/_lib/api/pokeapi";

export const PokedexGrid = () => {
  const [pokemonDataList, setPokemonDataList] = useState<PokemonSimpleData[]>(
    [],
  );
  const [filteredList, setFilterList] = useState<PokemonSimpleData[]>([]);
  const [showPokemons, setShowPokemons] = useState<number>(50);
  const [isloading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const data = myPokedex.getBasicPokemonData();
    setPokemonDataList(data);
    setFilterList(data);
    setIsLoading(false);
  }, []);

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

  useEffect(() => {
    if (showPokemons < 1015) {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [loadMorePokemonCards]);

  function handleFilterList(searchStr: string) {
    const filteredData = pokemonDataList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchStr.toLowerCase()),
    );
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
    <div className="p-1">
      <Input
        onChange={(event) => handleFilterList(event.target.value)}
        className="my-4"
        classNames={{
          input: "bg-content1",
          inputWrapper: ["bg-content1", "shadow-md"],
          innerWrapper: "bg-content1",
        }}
        type="search"
        variant="faded"
        placeholder="Search by pokemon name..."
        size="lg"
        disableAnimation
      />
      <div
        className={`
                grid w-full grid-cols-2
                justify-center 
                gap-4 
                sm:grid-cols-3 
                md:grid-cols-4
                lg:grid-cols-5 xl:grid-cols-6
                `}
      >
        {filteredList
          ?.slice(0, showPokemons)
          .map((pokemonData) => (
            <PokemonCard key={pokemonData.id} data={pokemonData} />
          ))}
      </div>
    </div>
  );
};
