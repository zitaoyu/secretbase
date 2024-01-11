import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { SiteLogo } from "./Logo";

export const PrimaryNavBar = () => {
  return (
    <Navbar maxWidth="2xl" isBordered>
      <NavbarBrand>
        <SiteLogo width={48} height={48} className="fill-porygon-blue mr-2" />
        <h1 className=" text-lg text-porygon-pink font-sans font-extrabold italic">
          Porygon Dex
        </h1>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
