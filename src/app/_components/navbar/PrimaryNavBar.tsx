"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Logo } from "./Logo";
import Link from "next/link";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { IoMenu } from "react-icons/io5";
import { PrimaryIconButton } from "../PrimaryIconButton";

export const PrimaryNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems: { label: string; href: string }[] = [
    { label: "Pokedex", href: "/" },
    { label: "About", href: "#" },
  ];

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="2xl"
      isBordered
    >
      <NavbarContent>
        <NavbarBrand>
          <Link href={"/"}>
            <Logo />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        {menuItems.map((menuItem) => (
          <NavbarMenuItem
            className="hidden hover:text-porygon-blue sm:block"
            onClick={() => setIsMenuOpen(false)}
            key={menuItem.label}
          >
            <Link href={menuItem.href}>{menuItem.label}</Link>
          </NavbarMenuItem>
        ))}
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          <PrimaryIconButton
            className="block sm:hidden"
            icon={isMenuOpen ? CgClose : IoMenu}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="gap-8 py-8">
        {menuItems.map((menuItem) => (
          <NavbarMenuItem
            className="text-right"
            onClick={() => setIsMenuOpen(false)}
            key={menuItem.label}
          >
            <Link href={menuItem.href}>{menuItem.label}</Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
