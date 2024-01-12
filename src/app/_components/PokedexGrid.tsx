"use client";

import React, { useEffect, useRef, useState } from "react";
import myPokedex from "../_apis/pokeapi";
import { PokemonCard } from "./PokemonCard";
import { NamedAPIResource } from "pokedex-promise-v2";
import { Input } from "@nextui-org/react";

interface PokemonSimpleData {
  id: number;
  name: string;
  url: string;
}

interface PokedexGridProps {}

export const PokedexGrid: React.FC<PokedexGridProps> = ({}) => {
  const [pokemonDataList, setPokemonDataList] = useState<PokemonSimpleData[]>(
    []
  );
  const [filteredList, setFilterList] = useState<PokemonSimpleData[]>([]);
  const [showPokemons, setShowPokemons] = useState<number>(50);

  useEffect(() => {
    myPokedex
      .getPokemonList()
      .then((response) => {
        const pokemonDatas: PokemonSimpleData[] = [];
        response.results.map((value: NamedAPIResource, index: number) => {
          const data: PokemonSimpleData = {
            id: index + 1,
            name: value.name,
            url: value.url,
          };
          pokemonDatas.push(data);
        });
        setPokemonDataList(pokemonDatas);
        setFilterList(pokemonDatas);
      })
      .catch((error: any) => {
        throw Error("Unable to fetch pokemon data, please try again...");
      });
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
      pokemon.name.toLowerCase().includes(searchStr.toLowerCase())
    );
    setFilterList(filteredData);
  }

  return (
    <section className="px-4 my-4 max-w-7xl mx-auto">
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
                grid w-full gap-4
                grid-cols-2 
                sm:grid-cols-3 
                md:grid-cols-4 
                lg:grid-cols-5
                xl:grid-cols-6
                `}
      >
        {filteredList?.slice(0, showPokemons).map((pokemon) => (
          <PokemonCard key={pokemon.id} id={pokemon.id} name={pokemon.name} />
        ))}
      </div>
    </section>
  );
};
