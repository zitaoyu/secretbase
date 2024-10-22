import { PrimaryButton } from "@/app/_components/PrimaryButton";
import { Game } from "@/app/_services/pokedex-mapping";
import Link from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type NavMenuProps = {
  prevPokeapiId: number;
  nextPokeapiId: number;
  dexId?: number | undefined;
  game: Game;
};

export const NavMenu = ({
  prevPokeapiId,
  nextPokeapiId,
  dexId = undefined,
  game = "main",
}: NavMenuProps) => {
  return (
    <nav className="flex w-full items-center justify-between sm:justify-center sm:gap-20">
      <Link
        href={`${game === "seaglass" ? "/seaglass/" : ""}/${prevPokeapiId}`}
      >
        <PrimaryButton className="text-2xl">
          <IoIosArrowBack />
        </PrimaryButton>
      </Link>
      <span className="text-nowrap font-semibold">No. {dexId}</span>
      <Link
        href={`${game === "seaglass" ? "/seaglass/" : ""}/${nextPokeapiId}`}
      >
        <PrimaryButton className="text-2xl">
          <IoIosArrowForward />
        </PrimaryButton>
      </Link>
    </nav>
  );
};
