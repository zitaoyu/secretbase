import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tab,
  Tabs,
} from "@heroui/react";
import { MoveElement } from "pokedex-promise-v2";
import { extractIdFromUrl, formatName } from "@/app/_utils/format";
import myPokedex from "@/app/_services/pokeapi";
import { PrimarySpinner } from "../PrimarySpinner";
import { PokemonTypeBox } from "../PokemonTypeBox";
import movePhysicalSprite from "../../_assets/move-physical.png";
import moveSpecialSprite from "../../_assets/move-special.png";
import moveStatusSprite from "../../_assets/move-status.png";
import { StaticImageData } from "next/image";
import { PrimaryButton } from "../PrimaryButton";
import { SectionTitle } from "./SectionTitle";
import { Gen } from "@/app/_types/gen.type";
import { useDetailPanelContext } from "./DetailPanelContext";

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

interface GenTabsProps {
  gen: Gen;
  genMovesMap: Record<Gen, MoveRowData[]>;
  loading: boolean;
  reloadMoves: (gen: Gen) => void;
}

const GenTabs = ({ gen, genMovesMap, loading, reloadMoves }: GenTabsProps) => {
  const tabs: { id: Gen; label: string }[] = [
    {
      id: "red-blue",
      label: "Gen I",
    },
    {
      id: "crystal",
      label: "II",
    },
    {
      id: "firered-leafgreen",
      label: "III",
    },
    {
      id: "platinum",
      label: "IV",
    },
    {
      id: "black-2-white-2",
      label: "V",
    },
    {
      id: "omega-ruby-alpha-sapphire",
      label: "VI",
    },
    {
      id: "ultra-sun-ultra-moon",
      label: "VII",
    },
    {
      id: "sword-shield",
      label: "VIII",
    },
    {
      id: "scarlet-violet",
      label: "IX",
    },
  ];

  return (
    <Tabs
      className="w-full"
      aria-label="Dynamic tabs"
      items={tabs}
      classNames={{
        tabList: "bg-default-200",
        base: "justify-center",
      }}
      selectedKey={gen}
      onSelectionChange={(key) => {
        if (key !== gen) {
          reloadMoves(key as Gen);
        }
      }}
      isDisabled={loading}
    >
      {(item) => (
        <Tab
          key={item.id}
          title={item.label}
          isDisabled={genMovesMap[item.id].length === 0}
        ></Tab>
      )}
    </Tabs>
  );
};

interface MovesTableProps {
  title: string;
  movesData: MoveElement[] | undefined;
  method: "level-up" | "machine" | "breeding" | "tutor";
}

export const MovesTable = ({ title, movesData, method }: MovesTableProps) => {
  const [rows, setRows] = useState<MoveRowData[]>([]);
  const [mount, setMount] = useState(false);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(0);
  const [gen, setGen] = useState<Gen>("scarlet-violet");
  const createDefaultGenMovesMap = (): Record<Gen, MoveRowData[]> => ({
    "red-blue": [],
    crystal: [],
    "firered-leafgreen": [],
    platinum: [],
    "black-2-white-2": [],
    "omega-ruby-alpha-sapphire": [],
    "ultra-sun-ultra-moon": [],
    "sword-shield": [],
    "scarlet-violet": [],
  });
  const [genMovesMap, setGenMovesMap] = useState<Record<Gen, MoveRowData[]>>(
    createDefaultGenMovesMap(),
  );

  const { setDetailPanelUrl, counter, setCounter } = useDetailPanelContext();

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

  if (method === "level-up") {
    columns.unshift({
      key: "level",
      label: "Lv.",
    });
  }

  // Load genMovesMap when first mounted
  useEffect(() => {
    if (movesData && !mount) {
      const newGenMovesMap: Record<Gen, MoveRowData[]> =
        createDefaultGenMovesMap();
      let latestGen: Gen = "scarlet-violet";
      for (const gen of Object.keys(newGenMovesMap) as Gen[]) {
        for (const move of movesData) {
          const moveVersionDetails = move.version_group_details.filter(
            (version) => version.version_group.name === gen,
          );
          const moveDetails = moveVersionDetails.filter(
            (version) => version.move_learn_method.name === method,
          );
          if (moveDetails.length > 0) {
            for (const detail of moveDetails) {
              const moveData = {
                level: detail.level_learned_at,
                move: move.move.name,
                url: move.move.url,
              };
              newGenMovesMap[gen].push(moveData);
            }
          }
        }
        if (newGenMovesMap[gen].length > 0) {
          latestGen = gen;
          newGenMovesMap[gen].sort((a, b) => a.level - b.level);
        }
      }
      setGenMovesMap(newGenMovesMap);
      setGen(latestGen);
      fetchMovesData();
      setMount(true);
    }
  }, []);

  // get list from genMovesMap then fetch data
  useEffect(() => {
    if (mount) {
      fetchMovesData();
    }
  }, [mount, gen]);

  async function fetchMovesData() {
    const newRows = genMovesMap[gen];

    await Promise.all(
      newRows.map(async (row) => {
        try {
          // TODO: some url is invalid
          const moveId = extractIdFromUrl(row.url);
          const response = await myPokedex.getMoveByName(moveId);
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
          // console.log(`method: ${method}`);
          // console.log("newrow:", newRows);
          // console.log(row);
          // throw new Error(error + ", try again later...");
        }
      }),
    );
    setRows(newRows);
    setShow(method === "level-up" ? newRows.length : 20);
    setLoading(false);
  }

  function reloadMoves(gen: Gen) {
    setLoading(true);
    setGen(gen);
  }

  async function showMoveInDetailPanel(url: string) {
    setDetailPanelUrl(url);
    setCounter(counter + 1);
  }

  if (!movesData) {
    return;
  }

  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-2">
      <SectionTitle title={title} />
      <GenTabs
        gen={gen}
        genMovesMap={genMovesMap}
        loading={loading}
        reloadMoves={reloadMoves}
      />
      <Table
        className="overflow-auto rounded-xl p-1 outline outline-default sm:p-4"
        removeWrapper
        selectionMode="single"
        aria-label="Moves Table"
        bottomContent={
          show < rows.length && (
            <PrimaryButton
              className="mb-1 sm:mb-0"
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

        <TableBody isLoading={loading} loadingContent={<PrimarySpinner />}>
          {rows.slice(0, show).map((row) =>
            method === "level-up" ? (
              <TableRow
                key={row.TMId}
                onClick={() => showMoveInDetailPanel(row.url)}
              >
                <TableCell>
                  {row.level !== null && row.level === 0 ? "Evo." : row.level}
                </TableCell>
                <TableCell>
                  <span className="text-nowrap font-medium">
                    {formatName(row.move) || placeholder}
                  </span>
                </TableCell>
                <TableCell>
                  {row.type ? (
                    <PokemonTypeBox type={row.type} size="sm" />
                  ) : (
                    placeholder
                  )}
                </TableCell>
                <TableCell>
                  {row.category ? (
                    <div className="w-10">
                      <img
                        className="sprite w-full object-cover"
                        src={moveTypeSpriteMap[row.category].src}
                        alt={row.move}
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
              <TableRow
                key={row.move}
                onClick={() => showMoveInDetailPanel(row.url)}
              >
                <TableCell>
                  <span className="text-nowrap font-medium">
                    {formatName(row.move) || placeholder}
                  </span>
                </TableCell>
                <TableCell>
                  {row.type ? (
                    <PokemonTypeBox type={row.type} size="sm" />
                  ) : (
                    placeholder
                  )}
                </TableCell>
                <TableCell>
                  {row.category ? (
                    <div className="w-10">
                      <img
                        className="sprite w-full object-cover"
                        src={moveTypeSpriteMap[row.category].src}
                        alt={row.move + " category"}
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
