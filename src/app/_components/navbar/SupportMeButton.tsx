"use client";

import React from "react";

import { Button } from "@heroui/react";
import { FaHeart } from "react-icons/fa";

export const SupportMeButton = () => {
  return (
    <a
      href="https://www.instagram.com/tommytca"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button isIconOnly variant="bordered" className="border-porygon-pink">
        <FaHeart className="h-full w-full fill-porygon-pink p-[6px]" />
      </Button>
    </a>
  );
};
