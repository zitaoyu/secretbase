import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

// NextUI theme modification: https://nextui.org/docs/customization/create-theme

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "porygon-blue": "#69b6d8",
      "porygon-pink": "#e15e74",
      // normal: "#A8A77A",
      // fire: "#EE8130",
      // water: "#6390F0",
      // electric: "#F7D02C",
      // grass: "#7AC74C",
      // ice: "#96D9D6",
      // fighting: "#C22E28",
      // ground: "#E2BF65",
      // flying: "#A98FF3",
      // psychic: "#F95587",
      // bug: "#A6B91A",
      // rock: "#B6A136",
      // ghost: "#735797",
      // dragon: "#6F35FC",
      // dark: "#705746",
      // steel: "#B7B7CE",
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      addCommonColors: true,
      themes: {
        dark: {
          colors: {
            background: "#333333",
          },
        },
        light: {
          colors: {
            background: "#f6f6f6",
          },
        },
      },
    }),
  ],
};
export default config;
