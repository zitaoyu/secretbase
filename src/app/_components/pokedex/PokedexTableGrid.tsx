import { PokemonSimpleData } from "@/app/_lib/api/pokeapi.interface";
import { formatName } from "@/app/_utils/format";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tab,
  Tabs,
} from "@nextui-org/react";
import Link from "next/link";
import { PokemonTypeBoxes } from "../PokemonTypeBox";
import { PokemonSprite } from "../PokemonSprite";

interface PokedexTableGridProps {
  pokemonData: PokemonSimpleData[];
  showPokemons: number;
}

export const PokedexTableGrid = ({
  pokemonData,
  showPokemons,
}: PokedexTableGridProps) => {
  const columns = [
    {
      key: "id",
      label: "National #",
    },
    {
      key: "pokemon",
      label: "Pokemon",
    },
    {
      key: "types",
      label: "Types",
    },
    {
      key: "hp",
      label: "HP",
    },
    {
      key: "attack",
      label: "Atk",
    },
    {
      key: "defense",
      label: "Defense",
    },
    {
      key: "special-attack",
      label: "Sp.Atk",
    },
    {
      key: "special-defense",
      label: "Sp.Def",
    },
    {
      key: "spped",
      label: "Speed",
    },
  ];

  return (
    <Table
      className="my-4 max-w-5xl overflow-scroll rounded-xl p-1 outline outline-default sm:p-4"
      removeWrapper
      selectionMode="single"
      aria-label="Moves Table"
      isHeaderSticky
    >
      <TableHeader>
        {columns.map((column) => (
          <TableColumn className="bg-default text-foreground" key={column.key}>
            {column.label}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {pokemonData.slice(0, showPokemons).map((pokemon) => (
          <TableRow key={pokemon.id}>
            <TableCell>#{pokemon.id}</TableCell>
            <TableCell>
              <Link href={`/${pokemon.id}`}>
                <div className="flex w-full flex-col items-center font-bold sm:flex-row">
                  <PokemonSprite imageUrl={pokemon.spriteUrl || ""} />
                  {formatName(pokemon.name)}
                </div>
              </Link>
            </TableCell>
            <TableCell>
              <PokemonTypeBoxes types={pokemon.types} size="md" />
            </TableCell>
            <TableCell>{pokemon.stats.hp}</TableCell>
            <TableCell>{pokemon.stats.attack}</TableCell>
            <TableCell>{pokemon.stats.defense}</TableCell>
            <TableCell>{pokemon.stats["special-attack"]}</TableCell>
            <TableCell>{pokemon.stats["special-defense"]}</TableCell>
            <TableCell>{pokemon.stats.speed}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
