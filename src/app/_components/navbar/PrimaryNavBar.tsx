import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Logo } from "./Logo";
import Link from "next/link";

export const PrimaryNavBar = () => {
  return (
    <Navbar maxWidth="2xl" isBordered>
      <NavbarBrand>
        <Link href={"/"}>
          <Logo />
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
