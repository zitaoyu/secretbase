"use client";

import myPokedex from "@/app/_apis/pokeapi";
import { Card } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Pokemon, PokemonType } from "pokedex-promise-v2";
import { capitalizeFirstLetter } from "@/app/_utils/capitalize";
import { PrimaryButton } from "@/app/_components/PrimaryButton";
import Link from "next/link";
import { PokemonTypeBoxes } from "@/app/_components/PokemonTypeBox";
import { PrimarySpinner } from "@/app/_components/PrimarySpinner";

export default function PokemonPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState<Pokemon>();
  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    myPokedex
      .getPokemonByName(id as string)
      .then((response) => {
        setPokemonData(response);
        const types: string[] = [];
        response.types.map((value: PokemonType) => {
          types.push(value.type.name);
        });
        setTypes(types);
        setIsLoading(false);
      })
      .catch((error: any) => {
        throw Error("Unable to fetch pokemon details, try again later...");
      });
  }, []);

  return (
    <Card className="h-full w-full p-4">
      <div>
        <Link href={"/"}>
          <PrimaryButton>{"<- Pokedex"}</PrimaryButton>
        </Link>
      </div>

      <div className="flex flex-col items-center">
        {isLoading ? (
          <PrimarySpinner />
        ) : (
          <img
            className="sprite h-40 w-40"
            src={pokemonData?.sprites.front_default || ""}
          />
        )}

        <div className="flex flex-col items-center gap-2">
          <PokemonTypeBoxes types={types} />
          <p className="text-lg font-semibold">
            {capitalizeFirstLetter(pokemonData?.name || "")}
          </p>
        </div>
      </div>
    </Card>
  );
}
