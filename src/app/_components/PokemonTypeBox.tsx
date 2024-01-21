"use client";

import { formatName } from "../_utils/format";
import { getPokemonTypeColor } from "../_utils/type-colors";
import WrapperProps from "./Wrapper";

interface PokemonTypeBoxSizeProps {
  size?: "sm" | "md" | "lg";
}

interface PokemonTypeBoxProps extends PokemonTypeBoxSizeProps {
  type: string;
}

export const PokemonTypeBox = ({ type, size = "md" }: PokemonTypeBoxProps) => {
  const styleMap: Record<string, string> = {
    sm: "text-xs w-[52px]",
    md: "text-sm w-16",
    lg: "text-base w-[72px]",
  };

  return (
    <div
      className={`rounded-md py-[1px] text-center text-white ${styleMap[size]}`}
      style={{ backgroundColor: getPokemonTypeColor(type) }}
    >
      {formatName(type)}
    </div>
  );
};

interface PokemonTypeBoxesProps extends PokemonTypeBoxSizeProps, WrapperProps {
  types: string[];
  isVertical?: boolean;
}

export const PokemonTypeBoxes = ({
  types,
  size = "md",
  isVertical = false,
  className,
}: PokemonTypeBoxesProps) => {
  return (
    <div
      className={`${className} flex items-center gap-1 ${isVertical && "flex-col"}`}
    >
      {types.map((type) => (
        <PokemonTypeBox type={type} key={type} size={size} />
      ))}
    </div>
  );
};
