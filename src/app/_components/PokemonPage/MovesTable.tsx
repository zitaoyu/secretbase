import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { MoveElement } from "pokedex-promise-v2";
import { formatName } from "@/app/_utils/format";

interface MoveRowData {
  level: number;
  move: string;
  url: string;
  type?: string;
  category?: "Physicle" | "Special" | "Statue";
  power?: number;
  accuracy?: number;
}

interface MovesTableProps {
  movesData?: MoveElement[];
}

const columns = [
  {
    key: "level",
    label: "Level",
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

export const MovesTable = ({ movesData }: MovesTableProps) => {
  if (!movesData) {
    return;
  }

  const rows: MoveRowData[] = [];

  movesData.forEach((move) => {
    // Check if the last element in version_group_details.move_learn_method is "level-up"
    const lastDetail =
      move.version_group_details[move.version_group_details.length - 1];
    if (lastDetail.move_learn_method.name === "level-up") {
      const moveData = {
        level: lastDetail.level_learned_at,
        move: formatName(move.move.name),
        url: move.move.url,
      };
      rows.push(moveData);
    }
  });
  rows.sort((a, b) => a.level - b.level);

  return (
    <Table
      className="overflow-scroll rounded-2xl p-4 outline outline-default"
      removeWrapper
      selectionMode="single"
      aria-label="Moves Table"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn className="bg-default text-foreground" key={column.key}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.move}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey) || "-"}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
