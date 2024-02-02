import { SectionContainer } from "./SectionContainer";
import { PokemonTypeBox } from "../PokemonTypeBox";
import { useEffect } from "react";
import myPokedex from "@/app/_lib/api/pokeapi";
import { PokemonType } from "@/app/_types/pokemon.type";

interface ResistanceTableProps {
  types: PokemonType[];
}

export const ResistanceTable = ({ types }: ResistanceTableProps) => {
  const allPokemonTypes = Object.values(PokemonType);

  useEffect(() => {
    myPokedex
      .getTypeByNameArray(types)
      .then((typesData) => {
        console.log(typesData);
      })
      .catch();
  }, []);

  return (
    <SectionContainer title="Type Resistance">
      <div className="grid grid-cols-3 gap-[2px] bg-default md:grid-cols-6">
        {allPokemonTypes.map((type) => (
          <div
            key={type}
            className="flex flex-col items-center gap-[2px] bg-content1 p-1 text-center"
          >
            <PokemonTypeBox type={type} />
            <div className="w-full rounded-lg bg-zinc-200 text-center">x1</div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};
