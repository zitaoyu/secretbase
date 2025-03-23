"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { SecretBaseLogo } from "./Logo";
import Link from "next/link";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { IoMenu } from "react-icons/io5";
import { PrimaryIconButton } from "../PrimaryIconButton";

type MenuItem = {
  label: string;
  href: string;
  newtab?: boolean;
  isDropdown?: boolean;
  dropdownMenuItems?: MenuItem[];
};

// Reusable Dropdown Component
const DropdownMenuComponent = ({ menuItem }: { menuItem: MenuItem }) => (
  <NavbarItem className="hidden sm:block" key={menuItem.label}>
    <Dropdown>
      <DropdownTrigger>
        <NavbarMenuItem className="group block cursor-pointer text-base transition hover:text-sb-primary md:text-lg">
          <span>{menuItem.label}</span>
          <div className="h-[2px] rounded-full transition group-hover:bg-sb-primary" />
        </NavbarMenuItem>
      </DropdownTrigger>
      <DropdownMenu aria-label={menuItem.label}>
        {(menuItem.dropdownMenuItems ?? []).map((dropdownItem) => (
          <DropdownItem key={dropdownItem.label}>
            <Link
              className="text-base md:text-lg"
              href={dropdownItem.href}
              target={dropdownItem.newtab ? "_blank" : ""}
            >
              {dropdownItem.label}
            </Link>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  </NavbarItem>
);

// Reusable Menu Item Component
const MenuItemComponent = ({ menuItem }: { menuItem: MenuItem }) => (
  <NavbarMenuItem
    className="group hidden text-base transition hover:text-sb-primary sm:block md:text-lg "
    key={menuItem.label}
  >
    <Link
      href={menuItem.href}
      color="foreground"
      target={menuItem.newtab ? "_blank" : ""}
    >
      <span>{menuItem.label}</span>
      <div className="h-[2px] rounded-full transition group-hover:bg-sb-primary" />
    </Link>
  </NavbarMenuItem>
);

export const PrimaryNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let menuItems: MenuItem[] = [
    { label: "National Dex", href: "/main", newtab: false },
    {
      label: "Pokémon Seaglass",
      href: "",
      newtab: false,
      isDropdown: true,
      dropdownMenuItems: [
        { label: "Seaglass Pokedex", href: "/seaglass/" },
        {
          label: "Download Seaglass",
          href: "https://ko-fi.com/s/4a1535f351",
          newtab: true,
        },
      ],
    },
    {
      label: "Pokémon Lazarus",
      href: "",
      newtab: false,
      isDropdown: true,
      dropdownMenuItems: [
        { label: "Coming soon...", href: "" },
        {
          label: "Download Lazarus",
          href: "https://ko-fi.com/s/590de096dc",
          newtab: true,
        },
      ],
    },
    { label: "About", href: "/about", newtab: false },
  ];

  return (
    <Navbar
      className="border-0 sm:border-b sm:border-default"
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

      <NavbarContent className="md:gap-6" justify="center">
        {menuItems.map((menuItem) =>
          menuItem.isDropdown ? (
            <DropdownMenuComponent menuItem={menuItem} key={menuItem.label} />
          ) : (
            <MenuItemComponent menuItem={menuItem} key={menuItem.label} />
          ),
        )}

        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem className="block sm:hidden">
          <PrimaryIconButton
            icon={isMenuOpen ? CgClose : IoMenu}
            onPress={() => setIsMenuOpen((prev) => !prev)}
          />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="gap-8 py-8">
        {menuItems.map((menuItem) =>
          menuItem.isDropdown && menuItem.dropdownMenuItems ? (
            menuItem.dropdownMenuItems.map((dropdownItem) => (
              <NavbarMenuItem
                className="text-right"
                onClick={() => setIsMenuOpen(false)}
                key={dropdownItem.label}
              >
                <Link
                  href={dropdownItem.href}
                  target={dropdownItem.newtab ? "_blank" : ""}
                >
                  {dropdownItem.label}
                </Link>
              </NavbarMenuItem>
            ))
          ) : (
            <NavbarMenuItem
              className="text-right"
              onClick={() => setIsMenuOpen(false)}
              key={menuItem.label}
            >
              <Link href={menuItem.href}>{menuItem.label}</Link>
            </NavbarMenuItem>
          ),
        )}
      </NavbarMenu>
    </Navbar>
  );
};
