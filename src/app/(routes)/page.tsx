"use client";

import { useEffect, useState } from "react";
import { PrimaryNavBar } from "../_components/PrimaryNavBar";
import myPokedex from "../_apis/pokeapi";
import PokeAPI from "pokedex-promise-v2";
import { PokemonCard } from "../_components/PokemonCard";

export default function Home() {
  const [namedAPIResourceList, setNamedAPIResourceList] =
    useState<PokeAPI.NamedAPIResource[]>();
  const [showPokemons, setShowPokemons] = useState(1014);

  useEffect(() => {
    myPokedex
      .getPokemonList()
      .then((response) => {
        console.log(response);
        console.log("REMOVE THIS IN PRODUCTION!!!");
        setNamedAPIResourceList(response.results);
      })
      .catch((error: any) => {
        console.log(error);
        console.log("REMOVE THIS IN PRODUCTION!!!");
      });
  }, []);

  return (
    <main className="min-h-screen">
      <PrimaryNavBar />
      <section
        className={`grid max-w-7xl mx-auto px-4 gap-4 my-4 
                    grid-cols-2 
                    sm:grid-cols-3 
                    md:grid-cols-4 
                    lg:grid-cols-5
                    xl:grid-cols-6`}
      >
        {namedAPIResourceList?.slice(0, showPokemons).map((resource, index) => (
          <PokemonCard key={index} id={index + 1} name={resource.name} />
        ))}
      </section>
    </main>
  );
}
