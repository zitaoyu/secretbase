"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { SecretBaseLogo } from "./Logo";
import Link from "next/link";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { IoMenu } from "react-icons/io5";
import { PrimaryIconButton } from "../PrimaryIconButton";

export const PrimaryNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems: { label: string; href: string }[] = [
    { label: "Home", href: "/" },
    { label: "Pokedex", href: "/" },
    { label: "About", href: "#" },
  ];

  return (
    <Navbar
      className="border-0 sm:border sm:border-default"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="2xl"
    >
      <NavbarContent>
        <NavbarBrand>
          <Link href={"/"}>
            <SecretBaseLogo />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="md:gap-6" justify="end">
        {menuItems.map((menuItem) => (
          <NavbarMenuItem
            className="hidden sm:block"
            onClick={() => setIsMenuOpen(false)}
            key={menuItem.label}
          >
            <Link
              className="hover:text-sb-green group block transition"
              href={menuItem.href}
            >
              <span>{menuItem.label}</span>
              <div className="group-hover:bg-sb-green h-[2px] rounded-full transition"></div>
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem className="block sm:hidden">
          <PrimaryIconButton
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
