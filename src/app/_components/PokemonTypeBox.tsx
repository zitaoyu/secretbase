"use client";

import { useEffect, useState } from "react";
import { PokemonType } from "../_types/p-type";
import { getPokemonTypeColor } from "../_utils/type-colors";

interface PokemonTypeBoxProps {
  type: string;
}

export const PokemonTypeBox = ({ type }: PokemonTypeBoxProps) => {
  return (
    <div
      className="rounded-md px-2 text-white"
      style={{ backgroundColor: getPokemonTypeColor(type) }}
    >
      {type}
    </div>
  );
};

interface PokemonTypeBoxesProps {
  types: string[];
  className?: string;
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
