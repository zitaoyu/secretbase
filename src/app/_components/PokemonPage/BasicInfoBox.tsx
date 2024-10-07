import { Pokemon, PokemonForm, PokemonSpecies } from "pokedex-promise-v2";
import Link from "next/link";
import { getPokemonTypeColor } from "@/app/_utils/type-colors";
import { formatName } from "@/app/_utils/format";
import { statNameMap } from "@/app/_utils/stats";
import { useEffect, useState } from "react";
import { PrimarySpinner } from "../PrimarySpinner";
import { PokemonTypeBoxes } from "../PokemonTypeBox";

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
  return (
    <div className={`w-full items-center p-1`}>
      <div className={`font-medium ${isVerticle && "text-center"}`}>
        {title}
      </div>
      <div
        className={`flex w-full rounded-2xl bg-white px-3 py-1 dark:bg-zinc-600 
                    ${items.length > 1 ? "justify-evenly" : "justify-center"}
                    `}
      >
        {items.map((item) =>
          item.url === null ? (
            <span key={item.value}>{item.value}</span>
          ) : (
            <Link key={item.value} className="hover:underline" href={item.url}>
              {item.value}
            </Link>
          ),
        )}
      </div>
    </div>
  );
};

type BasicInfoBoxProps = {
  pokemonData: Pokemon;
  speciesData: PokemonSpecies;
  formData: PokemonForm;
};

export const BasicInfoBox = ({
  pokemonData,
  speciesData,
  formData,
}: BasicInfoBoxProps) => {
  const [loading, setLoading] = useState(true);
  const [formatedName, setFormatedName] = useState<string>(pokemonData.name);
  const [types, setTypes] = useState<string[]>([]);
  const [abilities, setAbilities] = useState<BoxItemData[]>([]);
  const [heldItems, setHeldItems] = useState<BoxItemData[]>([]);
  const [evYield, setEvYield] = useState<BoxItemData[]>([]);
  const [weight, setWeight] = useState<BoxItemData[]>([]);
  const [height, setHeight] = useState<BoxItemData[]>([]);
  const [baseExp, setBaseExp] = useState<BoxItemData[]>([]);
  const [entry, setEntry] = useState<BoxItemData[]>([]);

  useEffect(() => {
    // types
    setTypes(pokemonData.types.map((value) => value.type.name));
    // abilities
    const newAbilities: BoxItemData[] = pokemonData.abilities.map((ability) => {
      // TODO: add ability detail
      // return {
      //   value: formatName(ability.ability.name),
      //   url: ability.ability.url,
      // };
      return {
        value: formatName(ability.ability.name),
        url: null,
      };
    });
    setAbilities(newAbilities);
    // held items
    const newHeldItems: BoxItemData[] =
      pokemonData.held_items.length > 0
        ? pokemonData.held_items.map((item) => {
            return {
              value: formatName(item.item.name),
              url: item.item.url,
            };
          })
        : [{ value: "None", url: null }];
    setHeldItems(newHeldItems);

    const newEvYield: BoxItemData[] = pokemonData.stats
      .filter((stat) => stat.effort > 0)
      .map((stat) => {
        return {
          value: stat.effort + " " + statNameMap[stat.stat.name],
          url: null,
        };
      });
    setEvYield(newEvYield);

    setWeight([{ value: pokemonData.weight / 10 + "kg", url: null }]);
    setHeight([{ value: pokemonData.height / 10 + "m", url: null }]);
    setBaseExp([{ value: pokemonData?.base_experience || "?", url: null }]);

    const nameObj = speciesData.names.find(
      (nameObj) => nameObj.language.name === "en",
    );
    const formName = formData.names.find((item) => item.language.name === "en");
    setFormatedName(formName?.name || nameObj?.name || "Unknown");

    const latestPokedexEntry: string =
      speciesData?.flavor_text_entries
        .slice()
        .reverse()
        .find((entry) => entry.language && entry.language.name === "en")
        ?.flavor_text || "";

    setEntry([{ value: latestPokedexEntry, url: null }]);
    setLoading(false);
  }, []);

  if (!pokemonData || loading) {
    return (
      <div className="flex h-[400px] w-full items-center">
        <PrimarySpinner className="m-auto" />
      </div>
    );
  }

  return (
    <div className="mb-4 flex w-full flex-col items-center gap-4">
      {/* Pokmeon Name */}
      <p className="-mb-2 text-2xl font-semibold">{formatedName}</p>
      {/* Pokemon types */}
      <PokemonTypeBoxes types={types} size="lg" />
      <div
        className="flex w-full max-w-lg flex-col rounded-2xl p-[2px]"
        style={{
          backgroundColor: getPokemonTypeColor(pokemonData.types[0].type.name),
        }}
      >
        <div className="rounded-2xl bg-default-200 p-2">
          <BasicInfoBoxItem title="Abilities:" items={abilities} isVerticle />
          <div className="grid grid-cols-2">
            <BasicInfoBoxItem title="Weight:" items={weight} />
            <BasicInfoBoxItem title="Height:" items={height} />
          </div>
          <BasicInfoBoxItem title="Base Experience:" items={baseExp} />
          <BasicInfoBoxItem title="Held Items:" items={heldItems} />
          <BasicInfoBoxItem title="EV yield:" items={evYield} />
          <BasicInfoBoxItem title="Pokedex Entry:" items={entry} />
        </div>
      </div>
    </div>
  );
};
