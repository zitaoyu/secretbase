import { SectionContainer } from "./SectionContainer";
import { PokemonTypeBox } from "../PokemonTypeBox";
import { useEffect, useState } from "react";
import { PokemonType } from "@/app/_types/pokemon.type";
import {
  getDefaultDamageRelation,
  getDamageRelation,
} from "@/app/_utils/type-charts";

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
    setDamageRelations(getDamageRelation(types));
    setLoading(false);
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
