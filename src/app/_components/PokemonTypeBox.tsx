"use client";

import { getPokemonTypeColor } from "../_utils/type-colors";
import WrapperProps from "./Wrapper.i";

interface PokemonTypeBoxProps {
  type: string;
}

export const PokemonTypeBox = ({ type }: PokemonTypeBoxProps) => {
  return (
    <div
      className="w-16 rounded-md text-center text-white"
      style={{ backgroundColor: getPokemonTypeColor(type) }}
    >
      {type}
    </div>
  );
};

interface PokemonTypeBoxesProps extends WrapperProps {
  types: string[];
}

export const PokemonTypeBoxes = ({
  types,
  className,
}: PokemonTypeBoxesProps) => {
  return (
    <div className={`flex gap-1 ${className}`}>
      {types.map((type) => (
        <PokemonTypeBox type={type} key={type} />
      ))}
    </div>
  );
};
