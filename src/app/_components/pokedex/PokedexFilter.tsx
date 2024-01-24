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
import { GridType } from "./Pokedex.type";

type selectorItem<T> = {
  label: string;
  value: T;
};

const genSelectorItems: selectorItem<Gen>[] = [
  {
    label: "Gen 1",
    value: "red-blue",
  },
  {
    label: "Gen 2",
    value: "crystal",
  },
  {
    label: "Gen 3",
    value: "firered-leafgreen",
  },
  {
    label: "Gen 4",
    value: "platinum",
  },
  {
    label: "Gen 5",
    value: "black-2-white-2",
  },
  {
    label: "Gen 6",
    value: "omega-ruby-alpha-sapphire",
  },
  {
    label: "Gen 7",
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

const typeSelectorItems: selectorItem<PokemonType>[] = [
  { label: "Normal", value: PokemonType.Normal },
  { label: "Fire", value: PokemonType.Fire },
  { label: "Water", value: PokemonType.Water },
  { label: "Electric", value: PokemonType.Electric },
  { label: "Grass", value: PokemonType.Grass },
  { label: "Ice", value: PokemonType.Ice },
  { label: "Fighting", value: PokemonType.Fighting },
  { label: "Poison", value: PokemonType.Poison },
  { label: "Ground", value: PokemonType.Ground },
  { label: "Flying", value: PokemonType.Flying },
  { label: "Psychic", value: PokemonType.Psychic },
  { label: "Bug", value: PokemonType.Bug },
  { label: "Rock", value: PokemonType.Rock },
  { label: "Ghost", value: PokemonType.Ghost },
  { label: "Dragon", value: PokemonType.Dragon },
  { label: "Dark", value: PokemonType.Dark },
  { label: "Steel", value: PokemonType.Steel },
];

interface ListBoxFilterProps {
  placeholder: string;
  listItems: { label: string; value: any }[];
  setter: React.Dispatch<any>;
}

const ListBoxFilter = ({
  placeholder,
  listItems,
  setter,
}: ListBoxFilterProps) => {
  return (
    <Autocomplete
      aria-label="Gen filter"
      defaultItems={listItems}
      placeholder={placeholder}
      className="w-full rounded-xl shadow-sm"
      classNames={{}}
      inputProps={{
        classNames: {
          input: "bg-content1 text-base",
          inputWrapper: "bg-content1",
        },
      }}
      listboxProps={{
        itemClasses: {
          title: "text-base",
        },
      }}
      variant="faded"
      size="md"
      radius="lg"
      disableAnimation
      onSelectionChange={(key) => {
        setter(key);
      }}
    >
      {(item) => (
        <AutocompleteItem key={item.value} aria-label={item.label}>
          {item.label}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

interface PokedexFilterProps {
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
  setGenFilter: React.Dispatch<React.SetStateAction<Gen | null>>;
  setType1Filter: React.Dispatch<React.SetStateAction<PokemonType | null>>;
  setType2Filter: React.Dispatch<React.SetStateAction<PokemonType | null>>;
  gridType: GridType;
  setGridType: React.Dispatch<React.SetStateAction<GridType>>;
}

export const PokedexFilter = ({
  setSearchString,
  setGenFilter,
  setType1Filter,
  setType2Filter,
  gridType,
  setGridType,
}: PokedexFilterProps) => {
  const [isShowFilters, setIsShowFilters] = useState(false);
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
    <div className="flex w-full flex-col items-center gap-2 sm:gap-1 md:h-12 md:flex-row">
      <div className="flex w-full flex-grow items-center gap-1 md:max-w-2xl">
        {/* Search Bar */}
        <Input
          className="w-full"
          classNames={{
            input: "bg-content1 text-base", // input
            inputWrapper: "bg-content1 shadow-md", //outer wrapper
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
          className="block aspect-square h-14 w-14 bg-content1 shadow-md md:hidden"
          size="lg"
          icon={isShowFilters ? MdFilterAltOff : MdFilterAlt}
          onClick={() => setIsShowFilters((prev) => !prev)}
          disableAnimation
        />
      </div>
      <div
        className={`flex h-full w-full items-center gap-1 md:flex md:w-auto ${!isShowFilters && "hidden"}`}
      >
        {/* Types Filter */}
        <div className="min-w-36">
          <ListBoxFilter
            placeholder="Type 1"
            listItems={typeSelectorItems}
            setter={setType1Filter}
          />
        </div>
        <div className="min-w-36">
          <ListBoxFilter
            placeholder="Type 2"
            listItems={typeSelectorItems}
            setter={setType2Filter}
          />
        </div>
        {/* Gen Filter */}
        <div className="w-full min-w-40">
          <ListBoxFilter
            placeholder="Generation"
            listItems={genSelectorItems}
            setter={setGenFilter}
          />
        </div>
        {/* Grid Layout Toggle */}
        <div className="h-14 w-14">
          <PrimaryIconButton
            className="h-14 w-14 bg-content1 p-1 shadow-sm"
            size="lg"
            fullWidth
            icon={iconMap[gridType]}
            onClick={toggleGrid}
            disableAnimation
          />
        </div>
      </div>
    </div>
  );
};
