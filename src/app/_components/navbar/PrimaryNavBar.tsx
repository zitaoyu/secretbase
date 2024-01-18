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
import { RxHamburgerMenu } from "react-icons/rx";
import { CgClose } from "react-icons/cg";

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
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="h-full w-full sm:hidden"
          icon={
            isMenuOpen ? <CgClose size={32} /> : <RxHamburgerMenu size={32} />
          }
        />

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
      </NavbarContent>

      <NavbarMenu className="gap-6 pl-8">
        {menuItems.map((menuItem) => (
          <NavbarMenuItem
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
