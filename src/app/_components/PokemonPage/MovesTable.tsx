import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { MoveElement } from "pokedex-promise-v2";
import { extractIdFromUrl, formatName } from "@/app/_utils/format";
import myPokedex from "@/app/_lib/api/pokeapi";
import { PrimarySpinner } from "../PrimarySpinner";
import { PokemonTypeBox } from "../PokemonTypeBox";
import movePhysicalSprite from "../../_assets/move-physical.png";
import moveSpecialSprite from "../../_assets/move-special.png";
import moveStatusSprite from "../../_assets/move-status.png";
import { StaticImageData } from "next/image";

const columns = [
  {
    key: "level",
    label: "Lv.",
  },
  {
    key: "move",
    label: "Move",
  },
  {
    key: "type",
    label: "Type",
  },
  {
    key: "category",
    label: "Category",
  },
  {
    key: "power",
    label: "Power",
  },
  {
    key: "accuracy",
    label: "Accuracy",
  },
];

const moveTypeSpriteMap: Record<string, StaticImageData> = {
  physical: movePhysicalSprite,
  special: moveSpecialSprite,
  status: moveStatusSprite,
};

interface MoveRowData {
  level: number;
  move: string;
  url: string;
  type?: string;
  category?: string;
  power?: number;
  accuracy?: number;
  TMId?: number;
}

interface MovesTableProps {
  movesData: MoveElement[] | undefined;
  method: "level-up" | "machine";
}

export const MovesTable = ({ movesData, method }: MovesTableProps) => {
  const [rows, setRows] = useState<MoveRowData[]>([]);
  const [loading, setLoading] = useState(true);
  const placeholder = "-";

  useEffect(() => {
    if (method === "machine") {
      columns[0] = {
        key: "tm",
        label: "TM",
      };
    }
    const fetchData = async () => {
      if (movesData) {
        const newRows: MoveRowData[] = [];

        for (const move of movesData) {
          const lastDetail =
            move.version_group_details[move.version_group_details.length - 1];

          if (
            (method === "level-up" &&
              lastDetail.move_learn_method.name === method) ||
            (method === "machine" &&
              lastDetail.version_group.name === "scarlet-violet")
          ) {
            const moveData = {
              level: lastDetail.level_learned_at,
              move: move.move.name,
              url: move.move.url,
            };
            newRows.push(moveData);
          }
        }

        newRows.sort((a, b) => a.level - b.level);

        await Promise.all(
          newRows.map(async (row) => {
            try {
              const response = await myPokedex.getMoveByName(row.move);
              if (response.power) {
                row.power = response.power;
              }
              if (response.accuracy) {
                row.accuracy = response.accuracy;
              }
              row.type = response.type.name;
              row.category = response.damage_class.name;
              if (response.machines.length > 0) {
                // TODO: TM id is not correct from PokeApi
                row.TMId = extractIdFromUrl(response.machines[0].machine.url);
              }
            } catch (error) {
              throw new Error(error + ", try again later...");
            }
          }),
        );

        setRows(newRows);
        setLoading(false);
      }
    };

    fetchData();
  }, [movesData]);

  if (!movesData || loading) {
    return <PrimarySpinner />;
  }

  return (
    <Table
      className="overflow-scroll rounded-xl p-1 outline outline-default sm:p-4"
      removeWrapper
      selectionMode="single"
      aria-label="Moves Table"
    >
      <TableHeader>
        {columns.map((column) => (
          <TableColumn className="bg-default text-foreground" key={column.key}>
            {column.label}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.move}>
            <TableCell>
              {method === "machine"
                ? row.TMId || placeholder
                : row.level || placeholder}
            </TableCell>

            <TableCell>{formatName(row.move) || placeholder}</TableCell>
            <TableCell>
              {row.type ? <PokemonTypeBox type={row.type} /> : placeholder}
            </TableCell>
            <TableCell>
              {row.category ? (
                <img
                  className="sprite"
                  src={moveTypeSpriteMap[row.category].src}
                />
              ) : (
                placeholder
              )}
            </TableCell>

            <TableCell>{row.power || placeholder}</TableCell>
            <TableCell>{row.accuracy || placeholder}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
