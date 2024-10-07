import { SectionContainer } from "./SectionContainer";
import { PokemonTypeBox } from "../PokemonTypeBox";
import { useEffect, useState } from "react";
import myPokedex from "@/app/_services/pokeapi";
import { PokemonType } from "@/app/_types/pokemon.type";

const defaultDamageRelation: Record<PokemonType, number> = {
  normal: 1,
  fire: 1,
  water: 1,
  electric: 1,
  grass: 1,
  ice: 1,
  fighting: 1,
  poison: 1,
  ground: 1,
  flying: 1,
  psychic: 1,
  bug: 1,
  rock: 1,
  ghost: 1,
  dragon: 1,
  dark: 1,
  steel: 1,
  fairy: 1,
};

function getDefaultDamageRelation(): Record<PokemonType, number> {
  return JSON.parse(JSON.stringify(defaultDamageRelation));
}

const damageRelationLabels: Record<number, string> = {
  0: "0",
  0.25: "1/4",
  0.5: "1/2",
  1: "1",
  2: "2",
  4: "4",
};

const damageRelationStyles: Record<number, string> = {
  0: "border-default-700",
  0.25: "border-red-600",
  0.5: " border-red-600",
  1: "",
  2: "border-green-500",
  4: "border-green-500",
};

interface ResistanceTableProps {
  types: PokemonType[];
}

export const ResistanceTable = ({ types }: ResistanceTableProps) => {
  const allPokemonTypes = Object.values(PokemonType);
  const [damageRelations, setDamageRelations] = useState(
    getDefaultDamageRelation(),
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    myPokedex
      .getTypeByNameArray(types)
      .then((typesData) => {
        // deep copy
        const newDamageRelations = getDefaultDamageRelation();

        for (const data of typesData) {
          const relation = data.damage_relations;

          // Handling double damage
          for (const { name } of relation.double_damage_from) {
            const type = name as PokemonType;
            newDamageRelations[type] *= 2;
          }

          // Handling half damage
          for (const { name } of relation.half_damage_from) {
            const type = name as PokemonType;
            newDamageRelations[type] /= 2;
          }

          // Handling no damage
          for (const { name } of relation.no_damage_from) {
            newDamageRelations[name as PokemonType] = 0;
          }
        }
        setDamageRelations(newDamageRelations);
        setLoading(false);
      })
      .catch(() => {
        throw Error("Cannot fetch type data, try again...");
      });
  }, []);

  return (
    <SectionContainer
      className="grid grid-cols-3 gap-[2px] overflow-hidden sm:grid-cols-6"
      title="Type Resistance"
    >
      {allPokemonTypes.map((type) => (
        <div
          key={type}
          className="flex flex-col items-center gap-[2px] p-1 text-center"
        >
          <PokemonTypeBox type={type} />
          <div
            className={`w-full rounded-2xl border-2 border-default bg-default text-center text-sm ${damageRelationStyles[damageRelations[type]]}`}
          >
            {!loading && damageRelationLabels[damageRelations[type]]}
          </div>
        </div>
      ))}
    </SectionContainer>
  );
};
