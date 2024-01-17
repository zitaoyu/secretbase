import React, { Fragment, useEffect, useState } from "react";
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
import { PrimaryButton } from "../PrimaryButton";
import { SectionTitle } from "./SectionTitle";

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
  title: string;
  movesData: MoveElement[] | undefined;
  method: "level-up" | "machine" | "breeding" | "tutor";
}

export const MovesTable = ({ title, movesData, method }: MovesTableProps) => {
  const [rows, setRows] = useState<MoveRowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(0);
  const placeholder = "-";

  const columns = [
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
      label: "Cat.",
    },
    {
      key: "power",
      label: "Power",
    },
    {
      key: "accuracy",
      label: "Acc.",
    },
  ];

  // if (method === "machine") {
  //   columns.unshift({
  //     key: "tm",
  //     label: "TM",
  //   });
  // } else
  if (method === "level-up") {
    columns.unshift({
      key: "level",
      label: "Lv.",
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      if (movesData) {
        const newRows: MoveRowData[] = [];

        for (const move of movesData) {
          // filter gen 9 moves only
          const moveVersionDetail = move.version_group_details.filter(
            (version) => version.version_group.name === "red-blue",
          );
          const moveDetail = moveVersionDetail.filter(
            (version) => version.move_learn_method.name === method,
          );

          if (moveDetail.length > 0) {
            const moveData = {
              level: moveDetail[0].level_learned_at,
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
                // row.TMId = extractIdFromUrl(response.machines[0].machine.url);
              }
            } catch (error) {
              throw new Error(error + ", try again later...");
            }
          }),
        );

        setRows(newRows);
        setShow(method === "level-up" ? newRows.length : 20);
        setLoading(false);
      }
    };
    fetchData();
  }, [movesData]);

  if (!movesData || loading) {
    return <PrimarySpinner />;
  }

  return (
    <div className="flex w-full max-w-2xl flex-col gap-2">
      <SectionTitle title={title} />
      <Table
        className="overflow-scroll rounded-xl p-1 outline outline-default sm:p-4"
        removeWrapper
        selectionMode="single"
        aria-label="Moves Table"
        bottomContent={
          show < rows.length && (
            <PrimaryButton
              className="mb-2"
              onClick={() => setShow(rows.length)}
            >
              Show All Moves
            </PrimaryButton>
          )
        }
      >
        <TableHeader>
          {columns.map((column) => (
            <TableColumn
              className="min-w-10 bg-default text-foreground"
              key={column.key}
            >
              {column.label}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {rows.slice(0, show).map((row) =>
            method === "level-up" ? (
              <TableRow key={row.move}>
                <TableCell>{row.level === 0 ? "Evo." : row.level}</TableCell>
                <TableCell>
                  <span className="text-nowrap font-medium">
                    {formatName(row.move) || placeholder}
                  </span>
                </TableCell>
                <TableCell>
                  {row.type ? <PokemonTypeBox type={row.type} /> : placeholder}
                </TableCell>
                <TableCell>
                  {row.category ? (
                    <div className="w-10">
                      <img
                        className="sprite w-full object-cover"
                        src={moveTypeSpriteMap[row.category].src}
                      />
                    </div>
                  ) : (
                    placeholder
                  )}
                </TableCell>
                <TableCell>{row.power || placeholder}</TableCell>
                <TableCell>{row.accuracy || placeholder}</TableCell>
              </TableRow>
            ) : (
              <TableRow key={row.move}>
                <TableCell>
                  <span className="text-nowrap font-medium">
                    {formatName(row.move) || placeholder}
                  </span>
                </TableCell>
                <TableCell>
                  {row.type ? <PokemonTypeBox type={row.type} /> : placeholder}
                </TableCell>
                <TableCell>
                  {row.category ? (
                    <div className="w-10">
                      <img
                        className="sprite w-full object-cover"
                        src={moveTypeSpriteMap[row.category].src}
                      />
                    </div>
                  ) : (
                    placeholder
                  )}
                </TableCell>
                <TableCell>{row.power || placeholder}</TableCell>
                <TableCell>{row.accuracy || placeholder}</TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </div>
  );
};
