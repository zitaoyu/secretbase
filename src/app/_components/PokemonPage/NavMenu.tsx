import { PrimaryButton } from "@/app/_components/PrimaryButton";
import {
  POKEDEX_START_INDEX,
  POKEDEX_END_INDEX,
} from "@/app/_lib/api/pokeapi.interface";
import Link from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type NavMenuProps = {
  id: number;
  dexId?: number | undefined;
};

export const NavMenu = ({ id, dexId = undefined }: NavMenuProps) => {
  const prevId = id - 1;
  const isPrevIndex =
    POKEDEX_START_INDEX <= prevId && prevId <= POKEDEX_END_INDEX;
  const nextId = id + 1;
  const isNextIndex =
    POKEDEX_START_INDEX <= nextId && nextId <= POKEDEX_END_INDEX;

  return (
    <nav className="flex w-full justify-center">
      <div className="hidden flex-1 sm:flex">
        <Link href={"/"}>
          <PrimaryButton>{"Pokedex"}</PrimaryButton>
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-between gap-4">
        <Link
          className={!isPrevIndex ? "pointer-events-none" : ""}
          href={`/${prevId}`}
        >
          <PrimaryButton isDisabled={!isPrevIndex} className="text-2xl">
            <IoIosArrowBack />
          </PrimaryButton>
        </Link>
        <span className="font-semibold">No. {dexId}</span>
        <Link
          className={!isNextIndex ? "pointer-events-none" : ""}
          href={`/${nextId}`}
        >
          <PrimaryButton isDisabled={!isNextIndex} className="text-2xl">
            <IoIosArrowForward />
          </PrimaryButton>
        </Link>
      </div>
      <div className="hidden flex-1 justify-end sm:flex">
        {/* <PrimaryButton>{"N"}</PrimaryButton> */}
      </div>
    </nav>
  );
};
