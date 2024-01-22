import { PrimaryButton } from "@/app/_components/PrimaryButton";
import Link from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type NavMenuProps = {
  id: number;
};

export const NavMenu = ({ id }: NavMenuProps) => {
  const prevId = id - 1;
  const nextId = id + 1;

  return (
    <nav className="flex w-full justify-center">
      <div className="hidden flex-1 sm:flex">
        <Link href={"/"}>
          <PrimaryButton>{"Pokedex"}</PrimaryButton>
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-between gap-4">
        <Link href={`/${prevId}`}>
          <PrimaryButton className="text-2xl">
            <IoIosArrowBack />
          </PrimaryButton>
        </Link>
        <span className="font-semibold">No. {id}</span>
        <Link href={`/${nextId}`}>
          <PrimaryButton className="text-2xl">
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
