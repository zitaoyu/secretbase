"use client";

import myPokedex from "@/app/_apis/pokeapi";
import { Card } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Pokemon, PokemonType } from "pokedex-promise-v2";
import { capitalizeFirstLetter, formatName } from "@/app/_utils/format";
import { PrimaryButton } from "@/app/_components/PrimaryButton";
import Link from "next/link";
import { PokemonTypeBoxes } from "@/app/_components/PokemonTypeBox";
import { PrimarySpinner } from "@/app/_components/PrimarySpinner";
import UnknownPokemonSprite from "../../_assets/unknown_pokemon.png";
import { PokeballSVG } from "@/app/_components/navbar/Logo";
import { getPokemonTypeColor } from "@/app/_utils/type-colors";

type NavMenuProps = {
  id: number;
};

const NavMenu = ({ id }: NavMenuProps) => {
  return (
    <nav className="flex w-full justify-center">
      <div className="flex flex-1">
        <Link href={"/"}>
          <PrimaryButton>{"Pokedex"}</PrimaryButton>
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-between gap-4">
        <Link href={`/${id - 1}`}>
          <PrimaryButton>{"Prev"}</PrimaryButton>
        </Link>
        <span className="font-semibold">#{id}</span>
        <Link href={`/${id + 1}`}>
          <PrimaryButton>{"Next"}</PrimaryButton>
        </Link>
      </div>
      <div className="flex flex-1 justify-end">
        {/* <PrimaryButton>{"N"}</PrimaryButton> */}
      </div>
    </nav>
  );
};

type BoxItemData = {
  value: string | number;
  url: string | null;
};

type BasicInfoBoxItemProps = {
  title: string;
  items: BoxItemData[];
  isVerticle?: boolean;
};

const BasicInfoBoxItem = ({
  title,
  items,
  isVerticle = false,
}: BasicInfoBoxItemProps) => {
  const flexDirection = isVerticle ? "flex-col pt-0" : "flex-row gap-1";

  return (
    <div className={`flex w-full items-center bg-default p-1 ${flexDirection}`}>
      <span className="text-nowrap font-medium"> {title}</span>
      <div
        className={`flex w-full rounded-lg bg-white p-1 dark:bg-zinc-600 
                    ${items.length > 1 ? "justify-evenly" : "justify-center"}
                    `}
      >
        {items.map((item) =>
          item.url === null ? (
            <span>{item.value}</span>
          ) : (
            <Link className="hover:underline" href={item.url}>
              {item.value}
            </Link>
          ),
        )}
      </div>
    </div>
  );
};

type BasicInfoBoxProps = {
  pokemonData: Pokemon | undefined;
};

const BasicInfoBox = ({ pokemonData }: BasicInfoBoxProps) => {
  if (!pokemonData) {
    return;
  }

  const abilities: BoxItemData[] = pokemonData.abilities.map((ability) => {
    return {
      value: formatName(ability.ability.name),
      url: ability.ability.url,
    };
  });

  const heldItems: BoxItemData[] =
    pokemonData.held_items.length > 0
      ? pokemonData.held_items.map((item) => {
          return {
            value: formatName(item.item.name),
            url: item.item.url,
          };
        })
      : [{ value: "None", url: null }];

  const weight: BoxItemData[] = [
    { value: pokemonData.weight / 10 + "kg", url: null },
  ];

  const height: BoxItemData[] = [
    { value: pokemonData.height / 10 + "m", url: null },
  ];

  const baseExp: BoxItemData[] = [
    { value: pokemonData?.base_experience || "", url: null },
  ];

  return (
    <div
      className="flex w-full max-w-lg flex-col rounded-xl p-[2px]"
      style={{
        backgroundColor: getPokemonTypeColor(pokemonData.types[0].type.name),
      }}
    >
      <div className="rounded-xl bg-default p-2">
        <BasicInfoBoxItem title="Abilities" items={abilities} isVerticle />
        <div className="grid grid-cols-2">
          <BasicInfoBoxItem title="Weight:" items={weight} />
          <BasicInfoBoxItem title="Height:" items={height} />
        </div>
        <BasicInfoBoxItem title="Base Experience:" items={baseExp} />
        <BasicInfoBoxItem title="Held Items:" items={heldItems} />
      </div>
    </div>
  );
};

const MovesInfoBox = () => {
  return
}

export default function PokemonPage() {
  const { id } = useParams();
  const pokemonId: string = Array.isArray(id) ? id[0] : id;
  const pokemonIdInt: number = parseInt(pokemonId, 10);
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState<Pokemon>();
  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    myPokedex
      .getPokemonByName(pokemonId)
      .then((response) => {
        setPokemonData(response);
        const types: string[] = [];
        response.types.map((value: PokemonType) => {
          types.push(value.type.name);
        });
        setTypes(types);
        setIsLoading(false);
      })
      .catch((error) => {
        throw Error("Unable to fetch pokemon details, try again later...");
      });
  }, []);

  if (isLoading) {
    return (
      <Card className="h-[80vh] w-full p-4">
        <PrimarySpinner className="m-auto" />
      </Card>
    );
  }

  return (
    <Card className="h-full w-full p-4">
      {/* Nav Menu */}
      <NavMenu id={pokemonIdInt} />

      {/* Pokemon Info */}
      <div className="flex flex-col items-center gap-2">
        {/* Pokemon Image */}
        <div className="relative my-4 h-full max-h-40 w-full max-w-40">
          <PokeballSVG className="h-full w-full fill-zinc-200 dark:fill-zinc-700" />
          <img
            className="sprite absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-[2] object-cover"
            src={
              pokemonData?.sprites.versions["generation-v"]["black-white"]
                .animated.front_default ||
              pokemonData?.sprites.front_default ||
              UnknownPokemonSprite.src
            }
          />
        </div>
        {/* Pokemon Basic Info Box */}
        <p className="text-2xl font-semibold">
          {capitalizeFirstLetter(pokemonData?.name || "")}
        </p>
        <PokemonTypeBoxes types={types} />
        <BasicInfoBox pokemonData={pokemonData} />
      </div>
    </Card>
  );
}
