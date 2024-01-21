import { PokemonSimpleData } from "@/app/_lib/api/pokeapi.interface";
import { formatName } from "@/app/_utils/format";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import Link from "next/link";
import { PokemonTypeBoxes } from "../PokemonTypeBox";
import { PokemonSprite } from "../PokemonSprite";
import useScreenSize from "@/app/_hooks/useScreenSize";

interface PokedexTableGridProps {
  pokemonData: PokemonSimpleData[];
  showPokemons: number;
}

export const PokedexTableGrid = ({
  pokemonData,
  showPokemons,
}: PokedexTableGridProps) => {
  const screenSize = useScreenSize();
  const isMobile = screenSize.size === "xs";
  const cellStyles = "border-l-2 border-default p-0 sm:p-1 text-center";
  const columns = [
    {
      key: "id",
      label: "No.",
      shortLabel: "No.",
    },
    {
      key: "pokemon",
      label: "Pokemon",
      shortLabel: "Pokemon",
    },
    {
      key: "types",
      label: "Types",
      shortLabel: "Types",
    },
    {
      key: "hp",
      label: "HP",
      shortLabel: "HP",
    },
    {
      key: "attack",
      label: "Atk",
      shortLabel: "Atk",
    },
    {
      key: "defense",
      label: "Def",
      shortLabel: "Def",
    },
    {
      key: "special-attack",
      label: "Sp.Atk",
      shortLabel: "S.A",
    },
    {
      key: "special-defense",
      label: "Sp.Def",
      shortLabel: "S.D",
    },
    {
      key: "spped",
      label: "Speed",
      shortLabel: "Spd",
    },
  ];

  return (
    <Table
      className="max-w-5xl overflow-scroll rounded-xl p-1 outline outline-default sm:p-4"
      removeWrapper
      selectionMode="none"
      aria-label="Moves Table"
      isHeaderSticky
    >
      <TableHeader>
        {columns.map((column) => {
          return (
            <TableColumn
              className={`min-w-[40px] bg-default p-0 text-center text-foreground
                        ${isMobile && column.key === "id" && "hidden"}
                        ${isMobile && column.key === "pokemon" && "rounded-l-lg"}
                        `}
              key={column.key}
            >
              {isMobile ? column.shortLabel : column.label}
            </TableColumn>
          );
        })}
      </TableHeader>
      <TableBody>
        {pokemonData.slice(0, showPokemons).map((pokemon) => (
          <TableRow key={pokemon.id} className="border-b-2 border-default">
            <TableCell
              className={
                cellStyles + " border-l-0 " + `${isMobile && " hidden"}`
              }
            >
              #{pokemon.id}
            </TableCell>
            <TableCell className={cellStyles + `${isMobile && " border-l-0"}`}>
              <Link
                className="flex flex-col items-center font-bold"
                href={`/${pokemon.id}`}
              >
                <div className="">
                  <PokemonSprite
                    className="transition"
                    imageUrl={pokemon.spriteUrl || ""}
                  />
                </div>

                {formatName(pokemon.name)}
              </Link>
            </TableCell>
            <TableCell className={cellStyles + " px-[1px]"}>
              <PokemonTypeBoxes
                types={pokemon.types}
                size={isMobile ? "sm" : "md"}
                isVertical
              />
            </TableCell>
            <TableCell className={cellStyles + " bg-red-50"}>
              {pokemon.stats.hp}
            </TableCell>
            <TableCell className={cellStyles + " bg-yellow-100"}>
              {pokemon.stats.attack}
            </TableCell>
            <TableCell className={cellStyles + " bg-yellow-50"}>
              {pokemon.stats.defense}
            </TableCell>
            <TableCell className={cellStyles + " bg-blue-50"}>
              {pokemon.stats["special-attack"]}
            </TableCell>
            <TableCell className={cellStyles + " bg-green-50"}>
              {pokemon.stats["special-defense"]}
            </TableCell>
            <TableCell className={cellStyles + " bg-purple-50"}>
              {pokemon.stats.speed}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
