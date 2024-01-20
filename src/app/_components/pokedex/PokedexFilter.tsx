"use client";

import React, { useState } from "react";
import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import { PrimaryIconButton } from "../PrimaryIconButton";
import { BsFillGridFill, BsGrid3X3GapFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import { IconType } from "react-icons";
import { Gen } from "@/app/_utils/gen";
import { PokemonType } from "@/app/_types/pokemon.type";
import {
  GenIndex,
  GridType,
  defaultIndexFilter,
  genIndexMap,
} from "./Pokedex.type";

interface PokedexFilterProps {
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
  setIndexFilter: React.Dispatch<React.SetStateAction<GenIndex>>;
  setType1Filter: React.Dispatch<React.SetStateAction<PokemonType | undefined>>;
  setType2Filter: React.Dispatch<React.SetStateAction<PokemonType | undefined>>;
  gridType: GridType;
  setGridType: React.Dispatch<React.SetStateAction<GridType>>;
}

export const PokedexFilter = ({
  setSearchString,
  setIndexFilter,
  setType1Filter,
  setType2Filter,
  gridType,
  setGridType,
}: PokedexFilterProps) => {
  const [isShowFilters, setIsShowFilters] = useState(false);

  const genSelectorItems: { label: string; value: Gen }[] = [
    {
      label: "Gen I",
      value: "red-blue",
    },
    {
      label: "Gen II",
      value: "crystal",
    },
    {
      label: "Gen III",
      value: "firered-leafgreen",
    },
    {
      label: "Gen IV",
      value: "platinum",
    },
    {
      label: "Gen V",
      value: "black-2-white-2",
    },
    {
      label: "Gen VI",
      value: "omega-ruby-alpha-sapphire",
    },
    {
      label: "Gen VII",
      value: "ultra-sun-ultra-moon",
    },
    {
      label: "Sword & Shield",
      value: "sword-shield",
    },
    {
      label: "Scarlet & Violet",
      value: "scarlet-violet",
    },
  ];

  const iconMap: Record<GridType, IconType> = {
    regular: BsGrid3X3GapFill,
    mini: FaListUl,
    table: BsFillGridFill,
  };

  function toggleGrid() {
    if (gridType === "regular") {
      setGridType("mini");
    } else if (gridType === "mini") {
      setGridType("table");
    } else {
      setGridType("regular");
    }
  }

  return (
    <div className="flex w-full flex-col items-center gap-2 sm:h-12 sm:flex-row sm:gap-1">
      <div className="flex w-full flex-grow items-center gap-1">
        {/* Search Bar */}
        <Input
          className="w-full"
          classNames={{
            input: "bg-content1", // input
            inputWrapper: ["bg-content1", "shadow-md"], //outer wrapper
            innerWrapper: "bg-content1",
          }}
          type="search"
          variant="faded"
          placeholder="Search by name or dex number..."
          size="md"
          disableAnimation
          radius="lg"
          startContent={<FaSearch size={20} />}
          onChange={(event) => setSearchString(event.target.value)}
        />
        <PrimaryIconButton
          className="block aspect-square h-full bg-content1 shadow-md sm:hidden"
          size="lg"
          icon={isShowFilters ? MdFilterAltOff : MdFilterAlt}
          onClick={() => setIsShowFilters((prev) => !prev)}
          disableAnimation
        />
      </div>
      <div
        className={`flex h-full w-full items-center gap-1 sm:flex sm:w-auto ${!isShowFilters && "hidden"}`}
      >
        <div className="w-full min-w-40">
          {/* Gen Filter */}
          <Autocomplete
            aria-label="Gen filter"
            defaultItems={genSelectorItems}
            placeholder="Generation"
            className="w-full rounded-xl shadow-md"
            inputProps={{
              classNames: {
                input: "bg-content1",
                inputWrapper: "bg-content1",
              },
            }}
            variant="faded"
            size="sm"
            radius="lg"
            disableAnimation
            onSelectionChange={(key) => {
              if (key === null) {
                setIndexFilter(defaultIndexFilter);
              } else {
                setIndexFilter(genIndexMap[key as Gen]);
              }
            }}
          >
            {(generation) => (
              <AutocompleteItem
                key={generation.value}
                aria-label={generation.label}
              >
                {generation.label}
              </AutocompleteItem>
            )}
          </Autocomplete>
        </div>
        {/* Grid Layout Toggle */}
        <PrimaryIconButton
          className="bg-content1 shadow-md"
          size="lg"
          icon={iconMap[gridType]}
          onClick={toggleGrid}
          disableAnimation
        />
      </div>
    </div>
  );
};
