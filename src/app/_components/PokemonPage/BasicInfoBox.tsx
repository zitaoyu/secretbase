import { Pokemon } from "pokedex-promise-v2";
import { PrimaryButton } from "@/app/_components/PrimaryButton";
import Link from "next/link";
import { getPokemonTypeColor } from "@/app/_utils/type-colors";
import { formatName } from "@/app/_utils/format";

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
    <div className={`w-full items-center bg-default p-1`}>
      <div className={`font-medium ${isVerticle && "text-center"}`}>
        {title}
      </div>
      <div
        className={`flex w-full rounded-2xl bg-white p-1 dark:bg-zinc-600 
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
  pokemonData: Pokemon | undefined;
};

export const BasicInfoBox = ({ pokemonData }: BasicInfoBoxProps) => {
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
      className="flex w-full max-w-lg flex-col rounded-2xl p-[2px]"
      style={{
        backgroundColor: getPokemonTypeColor(pokemonData.types[0].type.name),
      }}
    >
      <div className="rounded-2xl bg-default p-2">
        <BasicInfoBoxItem title="Abilities:" items={abilities} isVerticle />
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
