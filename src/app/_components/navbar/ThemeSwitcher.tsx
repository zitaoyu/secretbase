"use client";

import React from "react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button, Switch } from "@nextui-org/react";
import SunIcon from "../../_assets/solrock.png";
import MoonIcon from "../../_assets/lunatone.png";
import Image from "next/image";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { PrimaryIconButton } from "../PrimaryIconButton";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }

  if (!mounted) return null;

  return (
    <div className="flex">
      <PrimaryIconButton
        icon={theme === "light" ? MdOutlineLightMode : MdOutlineDarkMode}
        onClick={toggleTheme}
      />
      <div className="h-10 w-10 overflow-hidden">
        <Image
          className="-translate-y-[36%] scale-[1.75]"
          src={theme === "light" ? SunIcon : MoonIcon}
          alt="mode icon"
        />
      </div>
    </div>
  );
};
