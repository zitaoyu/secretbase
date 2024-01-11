"use client";

import React from "react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";
import SunIcon from "../_assets/solrock_icon.png";
import MoonIcon from "../_assets/lunatone_icon.png";
import Image from "next/image";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsSelected(theme === "dark");
    setMounted(true);
  }, []);

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setIsSelected(newTheme === "dark");
  }

  if (!mounted) return null;

  return (
    <Switch isSelected={isSelected} onValueChange={toggleTheme} color="default">
      <Image
        height={28}
        src={isSelected ? MoonIcon : SunIcon}
        alt="mode icon"
      />
    </Switch>
  );
};
