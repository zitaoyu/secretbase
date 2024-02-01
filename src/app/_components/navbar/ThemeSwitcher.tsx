"use client";

import React from "react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { IoEllipsisHorizontal } from "react-icons/io5";

import { PrimaryIconButton } from "../PrimaryIconButton";

export const ThemeSwitcher = () => {
  const [loading, setLoading] = useState(true);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setLoading(false);
  }, []);

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }

  return (
    <div className="flex">
      <PrimaryIconButton
        isDisabled={loading}
        icon={
          loading
            ? IoEllipsisHorizontal
            : theme === "light"
              ? MdOutlineLightMode
              : MdOutlineDarkMode
        }
        onClick={toggleTheme}
      />
    </div>
  );
};
