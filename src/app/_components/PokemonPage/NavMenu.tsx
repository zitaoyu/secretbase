import { PrimaryButton } from "@/app/_components/PrimaryButton";
import Link from "next/link";

type NavMenuProps = {
  id: number;
};

export const NavMenu = ({ id }: NavMenuProps) => {
  return (
    <nav className="flex w-full justify-center">
      <div className="flex flex-1">
        <Link href={"/"}>
          <PrimaryButton>{"Pokedex"}</PrimaryButton>
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-between gap-4">
        <Link href={`/${id - 1}`}>
          <PrimaryButton>{"Prev"}</PrimaryButton>
        </Link>
        <span className="font-semibold">#{id}</span>
        <Link href={`/${id + 1}`}>
          <PrimaryButton>{"Next"}</PrimaryButton>
        </Link>
      </div>
      <div className="flex flex-1 justify-end">
        {/* <PrimaryButton>{"N"}</PrimaryButton> */}
      </div>
    </nav>
  );
};
